import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // 백엔드 주소
  withCredentials: true,            // 세션/쿠키 같이 쓸 거면 true (이미 세션 로그인 있으니까)
});

export default api;
