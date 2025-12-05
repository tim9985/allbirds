// src/pages/MyPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, getMyOrders } from "@/api/userAPI";

export const MyPage = () => {
  const [user, setUser] = useState(null);        // 내 정보
  const [orders, setOrders] = useState([]);      // 내 주문 내역
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await getMe();        // /users/me
        setUser(me);

        const myOrders = await getMyOrders(); // /orders/my
        setOrders(myOrders);
      } catch (e) {
        console.error(e);
        // 401이면 비로그인 상태로 보고 로그인 페이지로 보냄
        setError("로그인이 필요합니다.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    // 로그아웃용 API가 따로 있다면 여기서 호출
    // 예: await logoutUser();
    // 지금은 단순히 페이지 이동만 예시로
    navigate("/login");
  };

  if (loading) return <div style={{ padding: "40px" }}>불러오는 중...</div>;
  if (!user) return null; // navigate로 나갔거나 에러 상황

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 16px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "24px" }}>마이페이지</h1>

      {/* 내 정보 섹션 */}
      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>내 정보</h2>
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <p>
            <strong>아이디</strong> : {user.loginName}
          </p>
          <p>
            <strong>이름</strong> : {user.displayName}
          </p>
          {user.email && (
            <p>
              <strong>이메일</strong> : {user.email}
            </p>
          )}
        </div>
      </section>

      {/* 주문 내역 섹션 */}
      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>주문 내역</h2>
        {orders.length === 0 ? (
          <p>주문 내역이 없습니다.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {orders.map((order) => (
              <li
                key={order._id || order.id}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "12px",
                }}
              >
                <p>
                  <strong>주문번호</strong> : {order.orderNumber || order._id}
                </p>
                <p>
                  <strong>주문일자</strong> :{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </p>
                <p>
                  <strong>총 금액</strong> :{" "}
                  {order.totalPrice != null ? `${order.totalPrice}원` : "-"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 로그아웃 버튼 */}
      <section>
        <button
          onClick={handleLogout}
          style={{
            border: "1px solid #000",
            borderRadius: "999px",
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </section>
    </main>
  );
};
