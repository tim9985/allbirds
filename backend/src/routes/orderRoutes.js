import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  createMyOrder,
} from "../controllers/orderController.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = Router();

// 장바구니 -> 주문 생성
// POST /api/orders
router.post("/", requireLogin, createOrder);

// 단일 상품 주문: POST /api/orders/my
router.post("/my", requireLogin, createMyOrder);

// 내 주문 내역 조회
// GET /api/orders/my
router.get("/my", requireLogin, getMyOrders);

export default router;
