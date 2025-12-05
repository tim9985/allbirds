// src/pages/mypage/OrderInfoForm.jsx
import styled from "styled-components";

const Form = styled.form`
  max-width: 640px;
`;

const Row = styled.div`
  border-top: 1px solid #ddd;
  padding: 16px 0;
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  font-size: 14px;

  &:last-child {
    border-bottom: 1px solid #ddd;
  }
`;

const Label = styled.label`
  padding-top: 6px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #111;
  padding: 6px 4px;
  outline: none;
  background: transparent;
`;

const SubmitButton = styled.button`
  margin-top: 24px;
  padding: 10px 40px;
  border-radius: 0;
  border: 1px solid #ccc;
  background-color: #ddd;
  color: #555;
  cursor: pointer;
`;

export const OrderInfoForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 주문 정보 저장 API 호출
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Label>이름</Label>
        <Input type="text" />
      </Row>
      <Row>
        <Label>주소</Label>
        <Input type="text" />
      </Row>
      <Row>
        <Label>휴대폰번호</Label>
        <Input type="text" />
      </Row>

      <SubmitButton type="submit">적용</SubmitButton>
    </Form>
  );
};
