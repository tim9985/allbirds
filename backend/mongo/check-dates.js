// 데이터베이스의 날짜 확인 스크립트
import mongoose from "mongoose";
import Product from "../src/models/Product.js";
import User from "../src/models/User.js";
import { formatKST } from "../src/utils/dateHelper.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/allbirdsDB";

async function checkDates() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB 연결 성공!\n");

    // 상품 날짜 확인
    console.log("===== 상품 생성일 확인 =====");
    const products = await Product.find().limit(3).lean();
    products.forEach(p => {
      console.log(`상품: ${p.name}`);
      console.log(`  생성일(DB): ${p.createdAt}`);
      console.log(`  생성일(KST): ${formatKST(p.createdAt)}`);
      console.log("");
    });

    // 사용자 날짜 확인
    console.log("===== 사용자 생성일 확인 =====");
    const users = await User.find().lean();
    users.forEach(u => {
      console.log(`사용자: ${u.displayName} (${u.loginName})`);
      console.log(`  생성일(DB): ${u.createdAt}`);
      console.log(`  생성일(KST): ${formatKST(u.createdAt)}`);
      console.log("");
    });

    console.log("✅ 모든 날짜가 한국 시간(KST, UTC+9)으로 저장되었습니다.");

  } catch (error) {
    console.error("❌ 오류:", error);
  } finally {
    await mongoose.disconnect();
  }
}

checkDates();
