// reviewRoutes.js - 리뷰 라우트
import { Router } from "express";
import {
  createReview,
  getProductReviews,
  getMyReviews,
  checkReviewExists,
} from "../controllers/reviewController.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = Router();

// 리뷰 작성
router.post("/", requireLogin, createReview);

// 특정 상품의 리뷰 조회
router.get("/product/:productId", getProductReviews);

// 내가 작성한 리뷰 조회
router.get("/my", requireLogin, getMyReviews);

// 리뷰 존재 여부 확인
router.get("/check", requireLogin, checkReviewExists);

export default router;
