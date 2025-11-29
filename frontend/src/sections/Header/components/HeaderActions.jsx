import styled from "styled-components";

const ActionsWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 1rem;
  display: none;
  justify-content: end;
  row-gap: 1rem;
  padding-right: 0;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ActionLink = styled.a`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;
  position: relative;
`;

const ActionIcon = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 26px;
  width: 26px;
`;

const CartIcon = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 23px;
  width: 22px;
`;

const CartBadge = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  
  &::after {
    accent-color: auto;
    align-items: center;
    background-color: black;
    box-sizing: border-box;
    caret-color: transparent;
    color: white;
    display: flex;
    font-size: 8px;
    font-style: normal;
    font-variant-numeric: normal;
    font-weight: 500;
    height: 15px;
    justify-content: center;
    letter-spacing: normal;
    line-height: 1.75rem;
    list-style-position: outside;
    list-style-type: disc;
    pointer-events: auto;
    position: absolute;
    text-align: start;
    text-indent: 0;
    text-transform: none;
    transform: translate(7.5px, -7.5px);
    visibility: visible;
    width: 15px;
    z-index: 10;
    border-radius: 50%;
    border-collapse: separate;
    right: 3px;
    top: 18px;
    font-family: Pretendard, sans-serif;
  }
`;

export const HeaderActions = () => {
  return (
    <ActionsWrapper>
      <ActionLink href="/search">
        <ActionIcon src="/img/icon-6.svg" alt="Icon" />
      </ActionLink>
      <ActionLink href="/account/login">
        <ActionIcon src="/img/icon-7.svg" alt="Icon" />
      </ActionLink>
      <ActionLink>
        <CartIcon src="/img/icon-8.svg" alt="Icon" />
        <CartBadge />
      </ActionLink>
    </ActionsWrapper>
  );
};
