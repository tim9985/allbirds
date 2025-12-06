import User from "../models/User.js";

export async function requireLogin(req, res, next) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // DB에서 유저 정보 가져오기
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "유저 정보를 찾을 수 없습니다." });
    }

    req.user = user;  // 이후 미들웨어에서 사용 가능
    next();

  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ message: "서버 오류" });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    // requireLogin을 안 거친 경우
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "관리자만 접근 가능합니다." });
  }

  next();
}
