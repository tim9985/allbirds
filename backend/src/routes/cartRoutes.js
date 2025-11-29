import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = Router();

// 장바구니 조회
// GET /api/cart
router.get("/", getCart);

// 장바구니에 상품 추가
// POST /api/cart
router.post("/", addToCart);

// 장바구니 수량 변경
// PATCH /api/cart
router.patch("/", updateCartItem);

// 장바구니에서 특정 상품 제거
// DELETE /api/cart/item
router.delete("/item", removeCartItem);

// 장바구니 전체 비우기
// DELETE /api/cart
router.delete("/", clearCart);

export default router;