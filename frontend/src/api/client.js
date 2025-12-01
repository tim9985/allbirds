// API 기본 설정
import axios from 'axios';

// Vite 프록시를 사용하여 상대 경로로 API 호출
// 프록시 설정: /api -> http://localhost:4000
const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키 포함 (세션 인증용)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
