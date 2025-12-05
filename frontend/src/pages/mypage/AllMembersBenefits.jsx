// src/pages/mypage/AllMembersBenefits.jsx
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background-color: #fff;
  box-shadow: 0 0 0 1px #eee;
`;

const Image = styled.div`
  background-color: #ffd84a; /* 임시 색 */
  padding-bottom: 70%;
`;

const Body = styled.div`
  padding: 16px 16px 20px;
  font-size: 14px;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Subtitle = styled.div`
  font-size: 13px;
  margin-bottom: 6px;
`;

const Note = styled.div`
  font-size: 12px;
  color: #555;
`;

const BENEFITS = [
  {
    title: "웰컴 1만원 할인 쿠폰",
    subtitle: "첫 구매 시 자동 적용",
    note: "*마케팅 수신 동의 필요",
  },
  {
    title: "무료 배송, 반품",
    subtitle: "주문 금액에 상관없이",
    note: "무료 배송, 반품",
  },
  {
    title: "구매 포인트 적립",
    subtitle: "상품 구매 시 포인트 적립",
    note: "(등급에 따라 적립률 상이)",
  },
  {
    title: "생일 쿠폰",
    subtitle: "당일 생일 쿠폰 지급",
    note: "*환불 시 쿠폰은 복구되지 않습니다.",
  },
];

export const AllMembersBenefits = () => {
  return (
    <Grid>
      {BENEFITS.map((b) => (
        <Card key={b.title}>
          <Image />
          <Body>
            <Title>{b.title}</Title>
            <Subtitle>{b.subtitle}</Subtitle>
            <Note>{b.note}</Note>
          </Body>
        </Card>
      ))}
    </Grid>
  );
};
