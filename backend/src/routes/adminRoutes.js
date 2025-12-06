import { Router } from "express";
import {
  createProduct,
  getAdminProducts,
  updateProduct,
  updateProductSizes,
  updateDiscount,
  updateStock,
  getSalesSummary,
} from "../controllers/adminController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

// 상품 등록(관리자) - 이미지 업로드 포함
router.post("/products", upload.single("image"), createProduct);

// 관리자 상품 목록
router.get("/products", getAdminProducts);

// 상품 수정(관리자)
router.patch("/products/:id", updateProduct);

// 가용 사이즈 변경
router.put("/products/:id/sizes", updateProductSizes);

// 할인 정책 변경(관리자)
router.patch("/products/:id/discount", updateDiscount);

// 재고 관리(관리자)
router.patch("/products/:id/stock", updateStock);

// 판매 현황(관리자)
router.get("/sales", getSalesSummary);

export default router;