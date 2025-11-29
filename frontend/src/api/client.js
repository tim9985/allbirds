// API 기본 설정
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키 포함
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
