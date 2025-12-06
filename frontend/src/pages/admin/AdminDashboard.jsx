import { Link } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #212121;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const MenuCard = styled(Link)`
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #212121;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const MenuTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 10px;
`;

const MenuDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
`;

export const AdminDashboard = () => {
  return (
    <PageWrapper>
      <Container>
        <Title>관리자 대시보드</Title>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          관리자 페이지에 오신 것을 환영합니다. 아래 메뉴를 선택하세요.
        </p>

        <MenuGrid>
          <MenuCard to="/admin/products">
            <MenuTitle>상품 관리</MenuTitle>
            <MenuDescription>
              상품 목록 조회, 가용 사이즈 변경, 할인율 수정
            </MenuDescription>
          </MenuCard>

          <MenuCard to="/admin/products/new">
            <MenuTitle>상품 등록</MenuTitle>
            <MenuDescription>
              새로운 상품을 등록하고 이미지를 업로드
            </MenuDescription>
          </MenuCard>

          <MenuCard to="/admin/sales">
            <MenuTitle>판매 현황</MenuTitle>
            <MenuDescription>
              제품별 판매 수량 및 매출 조회, 기간별 필터링
            </MenuDescription>
          </MenuCard>
        </MenuGrid>
      </Container>
    </PageWrapper>
  );
};
