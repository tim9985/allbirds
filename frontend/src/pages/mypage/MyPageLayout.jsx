// src/pages/mypage/MyPageLayout.jsx
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { MyOverview } from "./MyOverview";
import { MyInfo } from "./MyInfo";
import { MyOrders } from "./MyOrders.jsx";
import { OrderInfoForm } from "./OrderInfoForm";
import { AllMembersBenefits } from "./AllMembersBenefits";

const PageWrapper = styled.div`
  background-color: #f5f5f5;
`;

const Hero = styled.div`
  width: 100%;
  height: 220px;
  background-image: url("/img/mypage-hero.jpg"); /* 임시 이미지 경로 */
  background-size: cover;
  background-position: center;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 16px 80px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  column-gap: 80px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }
`;

const SideNav = styled.nav`
  font-family: "Pretendard", sans-serif;
  font-size: 25px;
`;

const SideTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const SideLink = styled(NavLink)`
  display: block;
  margin-bottom: 12px;
  color: #111;
  text-decoration: none;

  &.active {
    text-decoration: underline;
    font-weight: 600;
  }
`;

const LogoutLink = styled.button`
  margin-top: 24px;
  padding: 0;
  border: none;
  background: none;
  color: #111;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

const MainArea = styled.section``;

const MainTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
`;

export const MyPageLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading, logout } = useAuth();

  // 마이페이지 진입 시 로그인 체크
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/account/login");
    }
  }, [isLoggedIn, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // 로딩 중이면 아무것도 표시하지 않음
  if (loading) {
    return null;
  }

  return (
    <PageWrapper>
      <Hero />

      <ContentWrapper>
        <SideNav>
          <SideLink end to="">
            마이페이지
          </SideLink>
          <SideLink to="info">회원 정보</SideLink>
          <SideLink to="orders">지난 주문 내역</SideLink>
          <SideLink to="order-form">주문 정보 등록</SideLink>
          <SideLink to="benefits">올멤버스 혜택</SideLink>

          <LogoutLink onClick={handleLogout}>로그아웃</LogoutLink>
        </SideNav>

        <MainArea>
          <Routes>
            <Route
              index
              element={
                <>
                  <MainTitle>마이페이지</MainTitle>
                  <MyOverview />
                </>
              }
            />
            <Route
              path="info"
              element={
                <>
                  <MainTitle>회원 정보</MainTitle>
                  <MyInfo />
                </>
              }
            />
            <Route
              path="orders"
              element={
                <>
                  <MainTitle>지난 주문 내역</MainTitle>
                  <MyOrders />
                </>
              }
            />
            <Route
              path="order-form"
              element={
                <>
                  <MainTitle>주문 정보 등록</MainTitle>
                  <OrderInfoForm />
                </>
              }
            />
            <Route
              path="benefits"
              element={
                <>
                  <MainTitle>올멤버스 혜택</MainTitle>
                  <AllMembersBenefits />
                </>
              }
            />
          </Routes>
        </MainArea>
      </ContentWrapper>
    </PageWrapper>
  );
};
