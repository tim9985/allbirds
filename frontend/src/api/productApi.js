// 상품 관련 API
import apiClient from './client';

/**
 * 상품 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {string} params.sort - 정렬 (recommend, latest, priceAsc, priceDesc, review)
 * @param {string} params.category - 카테고리 필터
 * @param {string} params.size - 사이즈 필터
 * @param {string} params.minPrice - 최소 가격
 * @param {string} params.maxPrice - 최대 가격
 * @param {string} params.q - 검색어
 * @returns {Promise} 상품 목록
 */
export const getProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products', { params });
    return response.data;
  } catch (error) {
    console.error('상품 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 상품 상세 조회
 * @param {number} productId - 상품 ID
 * @returns {Promise} 상품 상세 정보
 */
export const getProduct = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('상품 상세 조회 실패:', error);
    throw error;
  }
};

// 별칭 export
export const getProductById = getProduct;

/**
 * 상품 리뷰 목록 조회
 * @param {number} productId - 상품 ID
 * @returns {Promise} 리뷰 목록
 */
export const getProductReviews = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error('리뷰 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 상품 리뷰 작성
 * @param {number} productId - 상품 ID
 * @param {Object} reviewData - 리뷰 데이터 { rating, comment }
 * @returns {Promise} 작성된 리뷰
 */
export const addProductReview = async (productId, reviewData) => {
  try {
    const response = await apiClient.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('리뷰 작성 실패:', error);
    throw error;
  }
};
