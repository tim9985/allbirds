// src/api/productAPI.js
import api from "./axiosInstance";

// 상품 목록 조회 (필터/정렬 포함)
// params 예시: { sort: 'recommend', category: '슬립온', size: 270 }
export async function fetchProducts(params) {
  const res = await api.get("/api/products", { params });
  return res.data;
}

// 상품 상세 정보 조회
export async function fetchProductDetail(id) {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
}

// 상품 리뷰 목록 조회
export async function fetchReviews(id) {
  const res = await api.get(`/api/products/${id}/reviews`);
  return res.data;
}

// 상품 리뷰 등록 (로그인 필수)
export async function createReview(id, reviewData) {
  // reviewData: { rating: 5, comment: "내용" }
  const res = await api.post(`/api/products/${id}/reviews`, reviewData);
  return res.data;
}

// 프론트 데이터 동기화용
export async function syncProductsFromClient(products) {
  const res = await api.post("/api/products/sync-from-client", products);
  return res.data;
}