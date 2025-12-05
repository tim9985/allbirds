// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // 백엔드 서버 주소
  withCredentials: true,            // 세션(로그인 정보) 유지 필수
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
