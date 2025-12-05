// src/pages/mypage/MyInfo.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getMe } from "@/api/userAPI";

const Table = styled.div`
  border-top: 1px solid #111;
  border-bottom: 1px solid #111;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  padding: 14px 0;
  font-size: 14px;

  & + & {
    border-top: 1px solid #ddd;
  }
`;

const Th = styled.div`
  font-weight: 400;
`;

const Td = styled.div``;

export const MyInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe().then(setUser).catch(() => {});
  }, []);

  if (!user) return null;

  return (
    <Table>
      <Row>
        <Th>이름</Th>
        <Td>{user.displayName}</Td>
      </Row>
      <Row>
        <Th>아이디</Th>
        <Td>{user.loginName}</Td>
      </Row>
      <Row>
        <Th>이메일</Th>
        <Td>{user.email || "-"}</Td>
      </Row>
    </Table>
  );
};
