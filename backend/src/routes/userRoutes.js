import { Router } from "express";
import { register, login, logout, getMe,updateUserRole } from "../controllers/userController.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = Router();

// 회원가입
router.post("/register", register);

// 로그인
router.post("/login", login);

// 내 정보
router.get("/me", requireLogin, getMe);

// 로그아웃
router.post("/logout", requireLogin, logout);

// role 변경
router.patch("/:id/role", updateUserRole);

export default router;
