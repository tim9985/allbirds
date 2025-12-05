import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "@/api/userAPI";

const PageContainer = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  min-height: calc(100vh - 200px);
`;

const RegisterWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (min-width: 768px) {
    padding: 80px 40px;
  }
`;

const RegisterSection = styled.div`
  background-color: transparent;
  padding: 40px 30px;
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    padding: 50px 40px;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #212121;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #212121;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  background-color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #212121;
  }

  &::placeholder {
    color: #999;
  }
`;

const HelperText = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #212121;
  color: white;
  padding: 14px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
  margin-bottom: 16px;

  &:hover {
    background-color: #000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #ffebee;
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: #2e7d32;
  font-size: 0.875rem;
  margin-bottom: 16px;
  padding: 12px;
  background-color: #e8f5e9;
  border-radius: 4px;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 0.875rem;
  color: #666;

  a {
    color: #212121;
    text-decoration: underline;
    font-weight: 500;

    &:hover {
      color: #000;
    }
  }
`;

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginName: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // 유효성 검사
    if (!formData.loginName || !formData.password || !formData.displayName) {
      setError("모든 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({
        loginName: formData.loginName,
        password: formData.password,
        displayName: formData.displayName,
      });
      
      setSuccess("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      
      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/account/login");
      }, 2000);
    } catch (err) {
      const serverMsg = err.response?.data?.message || "회원가입에 실패했습니다.";
      setError(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <RegisterWrapper>
        <RegisterSection>
          <Title>회원가입</Title>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="loginName">아이디</Label>
              <Input
                type="text"
                id="loginName"
                name="loginName"
                value={formData.loginName}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="displayName">이름 (닉네임)</Label>
              <Input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="표시될 이름을 입력하세요"
                required
              />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                required
              />
              <HelperText>비밀번호는 8자 이상이어야 합니다.</HelperText>
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "가입 중..." : "회원가입"}
            </SubmitButton>
          </Form>

          <LoginLink>
            이미 계정이 있으신가요? <Link to="/account/login">로그인</Link>
          </LoginLink>
        </RegisterSection>
      </RegisterWrapper>
    </PageContainer>
  );
};
