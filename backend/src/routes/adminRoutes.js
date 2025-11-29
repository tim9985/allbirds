import { Router } from "express";
import {
  createProduct,
  updateProduct,
  updateDiscount,
  getSalesSummary,
} from "../controllers/adminController.js";

const router = Router();

// 상품 등록(관리자)
router.post("/products", createProduct);

// 상품 수정(관리자)
router.patch("/products/:id", updateProduct);

// 할인 정책 변경(관리자)
router.patch("/products/:id/discount", updateDiscount);

// 판매 현황(관리자)
router.get("/sales", getSalesSummary);

export default router;