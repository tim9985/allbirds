// 사용자 관련 API
import apiClient from './client';

/**
 * 로그인
 * @param {string} loginName - 로그인 아이디
 * @param {string} password - 비밀번호
 * @returns {Promise} 로그인 결과
 */
export const loginUser = async (loginName, password) => {
  const response = await apiClient.post('/users/login', { loginName, password });
  return response.data;
};

/**
 * 내 정보 조회 (로그인 상태 확인용)
 * @returns {Promise} 사용자 정보
 */
export const getMe = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

/**
 * 내 주문 내역 조회
 * @returns {Promise} 주문 내역 목록
 */
export const getMyOrders = async () => {
  const response = await apiClient.get('/orders/my');
  return response.data;
};

/**
 * 로그아웃
 * @returns {Promise} 로그아웃 결과
 */
export const logoutUser = async () => {
  const response = await apiClient.post('/users/logout');
  return response.data;
};

/**
 * 회원가입
 * @param {Object} userData - 회원가입 정보
 * @returns {Promise} 회원가입 결과
 */
export const registerUser = async (userData) => {
  const response = await apiClient.post('/users/register', userData);
  return response.data;
};

/**
 * 장바구니 → 주문 생성
 * @param {Array} cartItems - 장바구니 아이템 배열
 * @returns {Promise} 주문 결과
 */
export const createOrder = async (cartItems) => {
  const response = await apiClient.post('/orders', { cartItems });
  return response.data;
};
