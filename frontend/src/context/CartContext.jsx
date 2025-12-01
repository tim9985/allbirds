import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as cartApi from '@/api/cartApi';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// 백엔드 장바구니 데이터를 프론트엔드 형식으로 변환
const transformBackendCartData = (backendCart) => {
  return backendCart.map(item => ({
    _id: item.productId?._id || item.productId,
    name: item.productId?.name || '',
    originalPrice: item.productId?.originalPrice || 0,
    discountRate: item.productId?.discountRate || 0,
    selectedSize: item.size,
    quantity: item.quantity,
    imageUrl: item.productId?.images?.[0]?.url || '/img/default-product.png',
  }));
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // 장바구니 동기화 (로그인 상태일 때 백엔드에서 가져오기)
  const syncCart = useCallback(async () => {
    try {
      const result = await cartApi.getCart();
      if (result.cart) {
        const items = transformBackendCartData(result.cart);
        setCartItems(items);
        setIsLoggedIn(true);
      }
    } catch {
      // 로그인되지 않은 경우 로컬 상태 유지
      setIsLoggedIn(false);
    }
  }, []);

  // 컴포넌트 마운트 시 장바구니 동기화 시도
  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const addToCart = async (product) => {
    // 로컬 상태 먼저 업데이트 (빠른 UI 응답)
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item._id === product._id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
    openCart();

    // 백엔드에 동기화 시도 (로그인 상태일 경우)
    try {
      await cartApi.addToCart({
        productId: product._id,
        size: product.selectedSize,
        quantity: 1,
      });
      setIsLoggedIn(true);
    } catch {
      // 로그인되지 않은 경우 로컬 상태만 유지
    }
  };

  const removeFromCart = async (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item._id === productId && item.selectedSize === size))
    );

    // 백엔드에 동기화 시도
    try {
      await cartApi.removeCartItem({
        productId,
        size,
      });
    } catch {
      // 로그인되지 않은 경우 무시
    }
  };

  const updateQuantity = async (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );

    // 백엔드에 동기화 시도
    try {
      await cartApi.updateCartItem({
        productId,
        size,
        quantity,
      });
    } catch {
      // 로그인되지 않은 경우 무시
    }
  };

  const clearCartItems = async () => {
    setCartItems([]);
    
    try {
      await cartApi.clearCart();
    } catch {
      // 로그인되지 않은 경우 무시
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice = item.originalPrice * (1 - item.discountRate);
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    isCartOpen,
    cartItems,
    isLoggedIn,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: clearCartItems,
    getTotalPrice,
    getTotalItems,
    syncCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
