// 리뷰 관련 API
import apiClient from './client';

/**
 * 리뷰 작성
 * @param {Object} reviewData - { productId, orderId, rating, content }
 * @returns {Promise} 리뷰 작성 결과
 */
export const createReview = async (reviewData) => {
  const response = await apiClient.post('/reviews', reviewData);
  return response.data;
};

/**
 * 특정 상품의 리뷰 조회
 * @param {number} productId - 상품 ID
 * @returns {Promise} 리뷰 목록
 */
export const getProductReviews = async (productId) => {
  const response = await apiClient.get(`/reviews/product/${productId}`);
  return response.data;
};

/**
 * 내가 작성한 리뷰 조회
 * @returns {Promise} 내 리뷰 목록
 */
export const getMyReviews = async () => {
  const response = await apiClient.get('/reviews/my');
  return response.data;
};

/**
 * 리뷰 존재 여부 확인
 * @param {number} productId - 상품 ID
 * @param {number} orderId - 주문 ID
 * @returns {Promise} 리뷰 존재 여부
 */
export const checkReviewExists = async (productId, orderId) => {
  const response = await apiClient.get('/reviews/check', {
    params: { productId, orderId }
  });
  return response.data;
};
