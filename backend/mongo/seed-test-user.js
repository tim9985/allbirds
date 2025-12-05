// 테스트 유저 시드 스크립트
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGO_URI = "mongodb://127.0.0.1:27017/allbirdsDB";
const SALT_ROUNDS = 10;

// User 스키마 정의 (간단 버전)
const UserSchema = new mongoose.Schema({
  _id: Number,
  loginName: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  cart: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

async function seedTestUser() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB 연결 성공");

    // 기존 테스트 유저 확인
    const existing = await User.findOne({ loginName: "a123" });
    if (existing) {
      console.log("테스트 유저(a123)가 이미 존재합니다.");
      await mongoose.disconnect();
      return;
    }

    // 비밀번호 해시
    const hashedPassword = await bcrypt.hash("a123", SALT_ROUNDS);

    // 다음 _id 찾기
    const lastUser = await User.findOne().sort({ _id: -1 });
    const nextId = lastUser ? lastUser._id + 1 : 1;

    // 테스트 유저 생성
    const testUser = new User({
      _id: nextId,
      loginName: "a123",
      password: hashedPassword,
      displayName: "테스트유저",
      role: "customer",
      cart: [],
    });

    await testUser.save();
    console.log("테스트 유저 생성 완료!");
    console.log("  - ID: a123");
    console.log("  - Password: a123");
    console.log("  - displayName: 테스트유저");

    await mongoose.disconnect();
    console.log("MongoDB 연결 종료");
  } catch (error) {
    console.error("에러 발생:", error);
    process.exit(1);
  }
}

seedTestUser();
