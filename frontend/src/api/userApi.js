// 사용자 관련 API
import apiClient from './client';

/**
 * 회원가입
 * @param {Object} userData - { loginId, loginPw, displayName, address, phone }
 * @returns {Promise} 회원가입 결과
 */
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

/**
 * 로그인
 * @param {Object} credentials - { loginId, loginPw }
 * @returns {Promise} 로그인 결과 (세션 쿠키 설정)
 */
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

/**
 * 로그아웃
 * @returns {Promise} 로그아웃 결과
 */
export const logout = async () => {
  try {
    const response = await apiClient.post('/users/logout');
    return response.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

/**
 * 내 정보 조회
 * @returns {Promise} 사용자 정보
 */
export const getMe = async () => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};
