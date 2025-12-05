import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartEmpty } from "@/components/CartDrawer/components/CartEmpty";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/api/userAPI";

const DrawerContainer = styled.div`
  position: fixed;
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  height: 100vh;
  max-width: 430px;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  width: 100%;
  z-index: 11111111;
  right: 0;
  top: 0;
`;

const DrawerInner = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  z-index: 1050;
  padding: 1.5rem 1.25rem 1.25rem;
`;

const HeaderSection = styled.div`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;
  padding-bottom: 0;

  @media (min-width: 768px) {
    padding-bottom: 1.25rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  background-color: transparent;
  caret-color: transparent;
  display: block;
  height: 2rem;
  text-align: center;
  width: 2rem;
  padding: 0;
  left: 1.25rem;
  top: 0.875rem;
  border: none;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 100%;
  width: 100%;
`;

const CartIconWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
`;

const CartCount = styled.span`
  position: absolute;
  color: black;
  font-size: 0.75rem;
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  line-height: 1rem;
  left: 1rem;
  top: 0.375rem;
`;

const CartIcon = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 31px;
  width: 34px;
`;

const MessageWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
`;

const Message = styled.p`
  font-size: 0.875rem;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const MessageBreak = styled.br`
  font-size: 0.875rem;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 1.25rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const PlaceholderDiv = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  margin-left: 1rem;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-direction: column;
  height: 910px;
  max-height: 800px;
  overflow-x: auto;
  overflow-y: scroll;

  @media (min-width: 768px) {
    max-height: 700px;
  }
`;

const ContentInner = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-height: 800px;
`;

const EmptyWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const CheckoutSection = styled.div`
  position: fixed;
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  display: none;
  padding: 12.8px 1.5rem;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CheckoutInner = styled.div`
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  z-index: 10;
  padding: 0.625rem 0;
  border-top: 1px solid;

  @media (min-width: 768px) {
    padding: 1.25rem 0;
  }
`;

const TotalRow = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  justify-content: space-between;
  line-height: 1.25rem;
`;

const TotalText = styled.p`
  box-sizing: border-box;
  caret-color: transparent;
`;

const ButtonWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const CheckoutButton = styled.a`
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  align-items: center;
  background-color: rgb(38 38 38);
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  height: 3rem;
  justify-content: center;
  letter-spacing: 2px;
  line-height: 21px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 100%;
  border: 1px solid rgb(38 38 38);
  margin-top: 0.625rem;
  padding: 1rem 2rem;
  border-radius: 0.125rem;

  &:hover {
    color: rgb(38 38 38);
    background-color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  background-color: rgba(212, 212, 216, 0.6);
  box-sizing: border-box;
  caret-color: transparent;
  display: none;
  height: 100%;
  width: 100%;
  z-index: 1100;
  left: 0;
  top: 0;
`;

const SaleModal = styled.div`
  position: fixed;
  color: white;
  background-color: black;
  box-sizing: border-box;
  caret-color: transparent;
  transform: translateY(120%);
  z-index: 1150;
  padding: 2.25rem 31px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CloseModalIcon = styled.img`
  position: absolute;
  box-sizing: border-box;
  caret-color: transparent;
  height: 1.25rem;
  width: 1.25rem;
  z-index: 9;
  right: 1.5rem;
  top: 1.5rem;
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  text-align: center;
`;

const ModalTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 1.25rem;
`;

const ModalTextDesktop = styled.p`
  font-size: 0.875rem;
  box-sizing: border-box;
  caret-color: transparent;
  display: none;
  line-height: 1.25rem;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    display: block;
  }
`;

const ModalTextMobile = styled.p`
  font-size: 0.875rem;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  line-height: 1.25rem;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ModalBreak = styled.br`
  box-sizing: border-box;
  caret-color: transparent;
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  justify-content: center;
`;

const ImageInner = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  width: 69px;
`;

const ModalImage = styled.img`
  aspect-ratio: auto 1027 / 1100;
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 100%;
  width: 1027px;
`;

const ModalButtonWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  color: black;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: white;
  caret-color: transparent;
  height: 50px;
  width: 198px;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 254px;
  }
`;

const CartItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  background: #f5f5f5;
`;

const CartItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CartItemName = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
`;

const CartItemSize = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0;
`;

const CartItemPrice = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #212121;
  background: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const QuantityDisplay = styled.span`
  min-width: 30px;
  text-align: center;
  font-size: 0.875rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }
`;

export const CartDrawerContent = () => {
  const navigate = useNavigate();
  const { isCartOpen, closeCart, cartItems, getTotalPrice, getTotalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    // 로그인 체크
    if (!isLoggedIn) {
      closeCart();
      navigate("/account/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    setIsProcessing(true);
    try {
      // 장바구니 데이터를 API로 전달
      const orderItems = cartItems.map(item => ({
        productId: item._id,
        size: item.selectedSize,
        quantity: item.quantity
      }));
      await createOrder(orderItems);
      clearCart();
      closeCart();
      // PRG 패턴: 결제 완료 후 마이페이지 주문 내역으로 리다이렉트
      navigate("/mypage/orders", { replace: true });
    } catch (err) {
      // 재고 부족 에러 처리
      if (err.response?.data?.errors) {
        const stockErrors = err.response.data.errors;
        const errorMessages = stockErrors.map(e => 
          `${e.productName} (${e.size}) - 요청: ${e.requested}개, 재고: ${e.available}개`
        ).join('\n');
        alert(`재고 부족:\n${errorMessages}`);
      } else {
        const message = err.response?.data?.message || "주문 처리 중 오류가 발생했습니다.";
        alert(message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DrawerContainer $isOpen={isCartOpen}>
      <DrawerInner>
        <HeaderSection>
          <CloseButton onClick={closeCart}>
            <CloseIcon src="/img/icon-9.svg" alt="Icon" />
          </CloseButton>
          <CartIconWrapper>
            <CartCount>{getTotalItems()}</CartCount>
            <CartIcon src="/img/icon-10.svg" alt="Icon" />
          </CartIconWrapper>
          <MessageWrapper>
            <Message>
              회원가입 시 1만원 할인 쿠폰 증정
              <MessageBreak />
              (마케팅 수신 동의 필수)
            </Message>
            <PlaceholderDiv />
          </MessageWrapper>
        </HeaderSection>
        <ContentWrapper>
          <ContentInner>
            {cartItems.length === 0 ? (
              <EmptyWrapper>
                <CartEmpty />
              </EmptyWrapper>
            ) : (
              <div>
                {cartItems.map((item) => {
                  const discountedPrice = item.originalPrice * (1 - item.discountRate);
                  return (
                    <CartItemWrapper key={`${item._id}-${item.selectedSize}`}>
                      <CartItemImage src={item.imageUrl} alt={item.name} />
                      <CartItemInfo>
                        <CartItemName>{item.name}</CartItemName>
                        <CartItemSize>사이즈: {item.selectedSize}</CartItemSize>
                        <CartItemPrice>₩{Math.round(discountedPrice).toLocaleString()}</CartItemPrice>
                        <QuantityControl>
                          <QuantityButton onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}>-</QuantityButton>
                          <QuantityDisplay>{item.quantity}</QuantityDisplay>
                          <QuantityButton onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}>+</QuantityButton>
                        </QuantityControl>
                      </CartItemInfo>
                      <RemoveButton onClick={() => removeFromCart(item._id, item.selectedSize)}>×</RemoveButton>
                    </CartItemWrapper>
                  );
                })}
              </div>
            )}
          </ContentInner>
          {cartItems.length > 0 && (
            <CheckoutSection style={{ display: 'block' }}>
              <CheckoutInner>
                <TotalRow>
                  <TotalText>총액</TotalText>
                  <TotalText>₩{Math.round(getTotalPrice()).toLocaleString()}</TotalText>
                </TotalRow>
                <ButtonWrapper>
                  <CheckoutButton 
                    as="button" 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "처리 중..." : "결제"}
                  </CheckoutButton>
                </ButtonWrapper>
              </CheckoutInner>
            </CheckoutSection>
          )}
        </ContentWrapper>
      </DrawerInner>
      <ModalOverlay />
      <SaleModal>
        <CloseModalIcon src="/img/icon-12.svg" alt="Icon" />
        <ModalContent>
          <ModalTitle>세일 제품을 고르셨군요!</ModalTitle>
          <ModalTextDesktop>
            7일 이내 미착용 제품에 한하여 교환/환불 가능합니다.
          </ModalTextDesktop>
          <ModalTextMobile>
            7일 이내 미착용 제품에 한하여
            <ModalBreak />
            교환/환불 가능합니다.
          </ModalTextMobile>
          <ImageWrapper>
            <ImageInner>
              <ModalImage
                src="/img/9.webp"
                sizes="(max-width: 900px) calc(100vw - 32px), (min-width: 932px) 868px, 868px"
              />
            </ImageInner>
          </ImageWrapper>
          <ModalButtonWrapper>
            <ModalButton>결제 계속하기</ModalButton>
          </ModalButtonWrapper>
        </ModalContent>
      </SaleModal>
    </DrawerContainer>
  );
};
