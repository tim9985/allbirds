import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

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

const ActionLink = styled(Link)`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;
  position: relative;
  text-decoration: none;
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

const LoginIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: #4CAF50;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: 0.75rem;
  color: #212121;
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const AdminButton = styled(Link)`
  padding: 6px 12px;
  background-color: #212121;
  color: white;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  margin-right: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000;
  }
`;

export const HeaderActions = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { openCart } = useCart();

  const handleAccountClick = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/account/login");
    }
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    openCart();
  };

  return (
    <ActionsWrapper>
      {isLoggedIn && user && (
        <UserName>{user.displayName || user.loginName}님</UserName>
      )}
      {isLoggedIn && user?.role === 'admin' && (
        <AdminButton to="/admin">관리자</AdminButton>
      )}
      <ActionLink to="/search">
        <ActionIcon src="/img/icon-6.svg" alt="검색" />
      </ActionLink>
      <ActionLink to="#" onClick={handleAccountClick} style={{ position: 'relative' }}>
        <ActionIcon src="/img/icon-7.svg" alt={isLoggedIn ? "마이페이지" : "로그인"} />
        {isLoggedIn && <LoginIndicator />}
      </ActionLink>
      <ActionLink to="#" onClick={handleCartClick}>
        <CartIcon src="/img/icon-8.svg" alt="장바구니" />
        <CartBadge />
      </ActionLink>
    </ActionsWrapper>
  );
};
