// backend/src/app.js
import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";   // ← 추가

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();
const CKTIME = 1000;  //cookie 설정 시 필요
const SEC = 1;  // 1초
const MIN = SEC * 60;
const HOUR = MIN * 60;

// MongoDB 연결 URL (세션 저장용) - DB 이름은 allbirdsDB 그대로 사용
const MONGO_URL = "mongodb://127.0.0.1:27017/allbirdsDB";

// 미들웨어
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"], // Vite 포트
    credentials: true, // 쿠키를 프론트로 보내려면 필요
  })
);
app.use(express.json());
app.use(cookieParser());

// DB 연결
connectDB();

// 세션 설정 (쿠키 기반 + MongoDB Store)
app.use(
  session({
    secret: "very-secret-key", // 나중에 .env로 빼면 더 좋음
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      // 세션을 MongoDB에 저장
      mongoUrl: MONGO_URL,           // 세션 저장용 MongoDB URL
      collectionName: "sessions",    // 세션이 저장될 컬렉션 이름
      ttl: 30 * MIN,            // 세션 TTL(초 단위) , DB에서 삭제되는데 걸리는 시간(maxAge와 동일하게)
    }),
    cookie: {
      httpOnly: true, // JS로 접근 불가 (보안)
      maxAge: CKTIME * 30 * MIN, // ms단위 (여기서는 1분), 사용자에게 보여질때 삭제되는데 걸리는 시간
    },
  })
);

// 라우터 연결
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);

// 에러 핸들러 (간단 버전)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류", error: err.message });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
