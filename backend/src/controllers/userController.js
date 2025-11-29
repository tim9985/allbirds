import bcrypt from "bcryptjs";
import User from "../models/User.js";

const SALT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 10;
const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8G7HKNPX6YsJhBKt3vnDnN/SfXlHiW";
// 타이밍 공격 방지를 위한 더미 해시 (실제로는 절대 매칭되지 않음), "dummy"를 해싱한 것, SALT_ROUNDS에 따라 $10을 변경할 것

// 회원가입 POST /api/users/register
export async function register(req, res, next) {
  try {
    const loginName = req.body.loginName?.trim();
    const password = req.body.password;
    const displayName = req.body.displayName?.trim();

    // 필수값 체크
    if (!loginName || !password || !displayName) {
      return res.status(400).json({
        success: false,
        message: "loginName, password, displayName은 필수입니다.",
      });
    }

    // 비밀번호 간단 검증
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "비밀번호는 8자 이상이어야 합니다.",
      });
    }

    // 중복 체크 (선 체크)
    const existing = await User.findOne({ loginName });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "이미 사용 중인 아이디입니다.",
      });
    }

    // 비밀번호 해시
    const hashed = await bcrypt.hash(password, SALT_ROUNDS); // 해시 생성

    // 새 유저 생성
    const user = new User({
      loginName,
      password: hashed,
      displayName,
      // role은 User 스키마 default('customer') 사용
    });

    const saved = await user.save(); // DB에 저장

    // 비밀번호는 응답에서 제거
    const { password: _, ...userWithoutPassword } = saved.toObject();

    return res.status(201).json({
      success: true,
      message: "회원가입 성공",
      data: { user: userWithoutPassword },
    });
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB unique 에러 처리 (Race Condition 방어)
      return res.status(409).json({
        success: false,
        message: "이미 사용 중인 아이디입니다.",
      });
    }
    next(err);
  }
}

// 로그인 POST /api/users/login
export async function login(req, res, next) {
  try {
    const loginName = req.body.loginName?.trim();
    const password = req.body.password;

    if (!loginName || !password) {
      return res.status(400).json({
        success: false,
        message: "loginName과 password는 필수입니다.",
      });
    }

    const user = await User.findOne({ loginName });
    
    // 유저가 없어도 비밀번호 검증 로직을 태움 (Timing Attack 방어)
    if (!user) {
      await bcrypt.compare(password, DUMMY_HASH);
      return res.status(401).json({
        success: false,
        message: "로그인 정보가 올바르지 않습니다.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "로그인 정보가 올바르지 않습니다.",
      });
    }

    // 세션 재생성 (Session Fixation 방지)
    req.session.regenerate((err) => {
      if (err) return next(err);

      // 세션에 사용자 정보 저장
      req.session.userId = user._id;
      req.session.loginName = user.loginName;
      req.session.role = user.role;

      // 비밀번호 제거하고 내려주기
      const { password: _, ...userWithoutPassword } = user.toObject();

      return res.json({
        success: true,
        message: "로그인 성공",
        data: { user: userWithoutPassword },
      });
    });
  } catch (err) {
    next(err);
  }
}

// 로그아웃 POST /api/users/logout
export function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("connect.sid"); // express-session 기본 쿠키 이름
    res.json({ success: true, message: "로그아웃 완료" });
  });
}

// 내 정보 GET /api/users/me
export async function getMe(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "로그인이 필요합니다.",
      });
    }

    // select로 password 제외, lean으로 POJO 변환 (성능 최적화)
    const user = await User.findById(req.session.userId)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    return res.json({
      success: true,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
  
}

// 사용자 role 변경 (관리자 전용 + 최초 1명 예외)
// PATCH /api/users/:id/role
export async function updateUserRole(req, res, next) {
  try {
    const targetId = Number(req.params.id);
    const { role } = req.body; // "admin" 또는 "customer"

    if (!role) {
      return res.status(400).json({ message: "role 값이 필요합니다." });
    }
    if (!["admin", "customer"].includes(role)) {
      return res.status(400).json({ message: "role은 admin 또는 customer만 가능합니다." });
    }

    // 이미 admin이 있는지 확인
    const adminExists = await User.exists({ role: "admin" });

    // 첫 번째 admin 생성 전에는 누구나 호출 가능
    // 한 번이라도 admin이 생기면 이후부터는 admin만 변경 가능
    if (adminExists) {
      if (!req.session.userId || req.session.role !== "admin") {
        return res.status(403).json({ message: "관리자만 role을 변경할 수 있습니다." });
      }
    }

    const updated = await User.findByIdAndUpdate(
      targetId,
      { role },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({
      message: "role이 변경되었습니다.",
      user: {
        _id: updated._id,
        loginName: updated.loginName,
        displayName: updated.displayName,
        role: updated.role,
      },
    });
  } catch (err) {
    next(err);
  }
}
