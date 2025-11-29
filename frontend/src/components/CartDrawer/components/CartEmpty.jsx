import styled from "styled-components";

const EmptyContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-direction: column;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: none;
  flex-direction: column;
  justify-content: center;
  opacity: 0.7;
  z-index: 10;
  inset: 0;
`;

const LoadingIcon = styled.img`
  color: black;
  box-sizing: border-box;
  caret-color: transparent;
  height: 1.25rem;
  width: 1.25rem;
  margin-left: -0.25rem;
  margin-right: 0.75rem;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 100%;
`;

const EmptyText = styled.p`
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const ShopButton = styled.a`
  color: black;
  font-weight: 700;
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  text-align: center;
  text-transform: uppercase;
  width: 16rem;
  margin-bottom: 0.75rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.625rem 1.25rem;
  border: 2px solid;

  &:hover {
    color: white;
  }
`;

export const CartEmpty = () => {
  return (
    <EmptyContainer>
      <LoadingOverlay>
        <LoadingIcon src="/img/icon-11.svg" alt="Icon" />
      </LoadingOverlay>
      <ContentWrapper>
        <EmptyText>장바구니가 비어있습니다.</EmptyText>
        <ButtonWrapper>
          <ShopButton href="/collections/mens-off">남성 쇼핑</ShopButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <ShopButton href="/collections/womens-off">여성 쇼핑</ShopButton>
        </ButtonWrapper>
      </ContentWrapper>
    </EmptyContainer>
  );
};
