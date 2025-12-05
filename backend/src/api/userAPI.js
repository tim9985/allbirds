// src/api/userAPI.js
import api from "./axiosInstance";

// 회원가입
export async function registerUser(userData) {
  // userData: { loginName, password, displayName }
  const res = await api.post("/api/users/register", userData);
  return res.data;
}

// 로그인
export async function loginUser(loginName, password) {
  const res = await api.post("/api/users/login", { loginName, password });
  return res.data;
}

// 내 정보 조회 (새로고침 시 로그인 유지 확인)
export async function getMe() {
  const res = await api.get("/api/users/me");
  return res.data;
}

// 내 주문 내역 조회 (마이페이지용)
export async function fetchMyOrders() {
  const res = await api.get("/api/orders/my");
  return res.data;
}