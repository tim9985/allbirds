// src/pages/mypage/MyOrders.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMyOrders } from "@/api/userAPI";

const Wrapper = styled.div`
  background-color: #f2f2f2;
  padding: 20px 18px 28px;
`;

const TitleBar = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  padding: 16px 0;
  color: #555;
`;

// 주문 카드
const OrderCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 16px;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`;

const OrderDate = styled.span`
  font-size: 14px;
  color: #666;
`;

const OrderTotal = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #212121;
`;

// 회색 카드 하나 (주문 항목)
const ItemCard = styled.div`
  background-color: #f5f5f5;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const RightCol = styled.div`
  text-align: right;
  font-size: 13px;
  line-height: 1.7;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ProductInfo = styled.div`
  font-size: 13px;
  line-height: 1.7;

  a {
    color: #0044aa;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ReviewButton = styled.button`
  margin-top: 4px;
  padding: 6px 18px;
  border: none;
  background-color: #4a7fbf;
  color: #fff;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #3a6faf;
  }
`;

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        console.log("getMyOrders response:", res);

        // 백엔드 응답: { orders: [...] }
        const list = res.orders ?? res.data?.orders ?? [];
        setOrders(list);
      } catch (e) {
        console.error("getMyOrders error:", e);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewClick = (productId) => {
    if (!productId) {
      alert("상품 정보를 찾을 수 없어 후기 작성 페이지로 이동할 수 없습니다.");
      return;
    }
    // 상품 상세 페이지로 이동 → 거기서 리뷰 작성 가능하도록 연결
    navigate(`/products/${productId}#review`);
  };

  if (!orders.length) {
    return (
      <Wrapper>
        <TitleBar>지난 주문 내역</TitleBar>
        <EmptyText>지난 주문 내역이 없습니다.</EmptyText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <TitleBar>지난 주문 내역</TitleBar>
      <List>
        {orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <OrderDate>주문일: {formatDate(order.createdAt)}</OrderDate>
              <OrderTotal>총 {order.totalPrice?.toLocaleString()}원</OrderTotal>
            </OrderHeader>
            
            {order.items?.map((item, idx) => (
              <ItemCard key={`${order._id}-${item.productId}-${idx}`}>
                <LeftCol>
                  <ProductInfo>
                    <div>
                      제품명:{" "}
                      <a href={`/products/${item.productId}`}>
                        {item.productName || "알 수 없는 상품"}
                      </a>
                    </div>
                    <div>사이즈: {item.size}</div>
                    <div>
                      단가: {item.priceAtPurchase?.toLocaleString()}원
                    </div>
                  </ProductInfo>

                  <ReviewButton
                    type="button"
                    onClick={() => handleReviewClick(item.productId)}
                  >
                    후기작성
                  </ReviewButton>
                </LeftCol>

                <RightCol>
                  <div>수량: {item.quantity}개</div>
                  <div>소계: {(item.priceAtPurchase * item.quantity).toLocaleString()}원</div>
                </RightCol>
              </ItemCard>
            ))}
          </OrderCard>
        ))}
      </List>
    </Wrapper>
  );
};
