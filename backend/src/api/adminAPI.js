// src/api/adminAPI.js
import api from "./axiosInstance";

// 1. 상품 등록
export async function addProduct(productData) {
  // productData 예시: { name, description, originalPrice, discountRate, sizes, materials, categories, ... }
  const res = await api.post("/api/admin/products", productData);
  return res.data;
}

// 2. 상품 정보 수정 (이름, 가격 등)
export async function updateProduct(id, updateData) {
  const res = await api.patch(`/api/admin/products/${id}`, updateData);
  return res.data;
}

// 3. 할인 정책 및 가용 사이즈 변경
export async function updateDiscountPolicy(id, policyData) {
  // policyData: { discountRate: 0.2, saleStartDate: "...", saleEndDate: "..." }
  const res = await api.patch(`/api/admin/products/${id}/discount`, policyData);
  return res.data;
}

// 4. 판매 현황 조회 (매출, 판매량)
export async function fetchSalesStats(from, to) {
  // from, to: 'YYYY-MM-DD' 형식 문자열
  const res = await api.get("/api/admin/sales", {
    params: { from, to }
  });
  return res.data;
}