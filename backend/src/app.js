// backend/src/app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

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

// 환경변수에서 설정 가져오기
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/allbirdsDB";
const SESSION_SECRET = process.env.SESSION_SECRET || "very-secret-key";
const SESSION_TTL = Number(process.env.SESSION_TTL_MINUTES) || 30;
const CORS_ORIGINS = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:5173"];

// 미들웨어
app.use(
  cors({
    origin: CORS_ORIGINS,
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
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      // 세션을 MongoDB에 저장
      mongoUrl: MONGO_URL,
      collectionName: "sessions",
      ttl: SESSION_TTL * MIN,
    }),
    cookie: {
      httpOnly: true, // JS로 접근 불가 (보안)
      maxAge: CKTIME * SESSION_TTL * MIN,
    },
  })
);

// 라우터 연결
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// 에러 핸들러 (간단 버전)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "서버 오류", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
