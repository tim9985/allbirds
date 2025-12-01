// 장바구니 관련 API
import apiClient from './client';

/**
 * 장바구니 조회
 * @returns {Promise} 장바구니 정보
 */
export const getCart = async () => {
  try {
    const response = await apiClient.get('/cart');
    return response.data;
  } catch (error) {
    console.error('장바구니 조회 실패:', error);
    throw error;
  }
};

/**
 * 장바구니에 상품 추가
 * @param {Object} item - { productId, size, quantity }
 * @returns {Promise} 업데이트된 장바구니
 */
export const addToCart = async (item) => {
  try {
    const response = await apiClient.post('/cart', item);
    return response.data;
  } catch (error) {
    console.error('장바구니 추가 실패:', error);
    throw error;
  }
};

/**
 * 장바구니 상품 수량 변경
 * @param {Object} item - { productId, size, quantity }
 * @returns {Promise} 업데이트된 장바구니
 */
export const updateCartItem = async (item) => {
  try {
    const response = await apiClient.patch('/cart', item);
    return response.data;
  } catch (error) {
    console.error('장바구니 수정 실패:', error);
    throw error;
  }
};

/**
 * 장바구니에서 상품 제거
 * @param {Object} item - { productId, size }
 * @returns {Promise} 업데이트된 장바구니
 */
export const removeCartItem = async (item) => {
  try {
    const response = await apiClient.delete('/cart/item', { data: item });
    return response.data;
  } catch (error) {
    console.error('장바구니 삭제 실패:', error);
    throw error;
  }
};

/**
 * 장바구니 비우기
 * @returns {Promise} 결과
 */
export const clearCart = async () => {
  try {
    const response = await apiClient.delete('/cart');
    return response.data;
  } catch (error) {
    console.error('장바구니 비우기 실패:', error);
    throw error;
  }
};
