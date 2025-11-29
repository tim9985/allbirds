// 외부 웹사이트에서 상품 정보를 가져오는 모듈

import axios from "axios";

// 예시: 외부 API 주소 (실제 사용하는 URL로 바꿔줘야 함)
const EXTERNAL_PRODUCT_API = "https://example.com/api/products"; 

// 외부 사이트에서 상품 목록 받아오기
export async function fetchExternalProducts() {
  // GET 요청으로 상품 리스트 받아오기
  const res = await axios.get(EXTERNAL_PRODUCT_API);
  // 여기서는 응답이 [{ id, name, description, price, ...}, ...] 같은 형태라고 가정
  return res.data;
}
