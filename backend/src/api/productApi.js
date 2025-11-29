import api from "./axiosInstance";

// DB에서 상품 목록 가져오기
export async function fetchProducts() {
  const res = await api.get("/api/products");
  return res.data;  // 배열
}

// 프론트에서 만든 상품 목록을 서버로 보내서 DB에 동기화
export async function syncProductsFromClient(products) {
  const res = await api.post("/api/products/sync-from-client", products);
  return res.data;
}
