// API 응답에서 날짜를 한국 시간으로 변환하는 미들웨어
import { formatKST } from "../utils/dateHelper.js";

/**
 * API 응답 데이터의 Date 필드를 KST 문자열로 변환
 * @param {Object} data - 변환할 데이터 객체
 * @returns {Object} 변환된 데이터
 */
export function formatDatesInResponse(data) {
  if (!data) return data;
  
  // 배열인 경우
  if (Array.isArray(data)) {
    return data.map(item => formatDatesInResponse(item));
  }
  
  // 객체인 경우
  if (typeof data === 'object' && data !== null) {
    const formatted = { ...data };
    
    // createdAt 필드가 있으면 포맷팅
    if (formatted.createdAt instanceof Date) {
      formatted.createdAtKST = formatKST(formatted.createdAt);
    }
    
    // reviews 배열이 있으면 각 리뷰의 날짜도 포맷팅
    if (Array.isArray(formatted.reviews)) {
      formatted.reviews = formatted.reviews.map(review => ({
        ...review,
        createdAtKST: review.createdAt ? formatKST(review.createdAt) : null
      }));
    }
    
    return formatted;
  }
  
  return data;
}
