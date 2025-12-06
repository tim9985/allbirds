import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { loginUser } from "@/api/userAPI";
import { useAuth } from "@/context/AuthContext";

const PageContainer = styled.div`
  width: 100%;
  background-color: #f7f7f7;
  min-height: calc(100vh - 200px);
`;

const LoginWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (min-width: 768px) {
    padding: 80px 40px;
  }
`;

const LoginSection = styled.div`
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

const ForgotPassword = styled(Link)`
  display: inline-block;
  font-size: 0.875rem;
  color: #666;
  text-decoration: underline;
  margin-top: 8px;
  margin-bottom: 20px;

  &:hover {
    color: #212121;
  }
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
  margin-bottom: 16px;

  &:hover {
    background-color: #000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const KakaoButton = styled.button`
  width: 100%;
  background-color: #fee500;
  color: #000000;
  padding: 14px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #fdd835;
  }

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #000;
    border-radius: 50%;
    position: relative;
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

const InfoSection = styled.div`
  background-color: transparent;
  padding: 30px 30px;
  margin-bottom: 20px;
  
  @media (min-width: 768px) {
    padding: 40px 40px;
  }
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #212121;
  text-align: center;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
  text-align: center;
`;

const HighlightText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
  text-align: center;
`;

const SignupButton = styled(Link)`
  display: block;
  width: 100%;
  background-color: white;
  color: #212121;
  padding: 12px 20px;
  border: 1px solid #212121;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
  box-sizing: border-box;

  &:hover {
    background-color: #212121;
    color: white;
  }
`;

const BenefitCard = styled.div`
  margin-bottom: 40px;
`;

const BenefitTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #212121;
`;

const BenefitDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
`;

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    loginName: "",
    password: "",
  });
  const [error, setError] = useState("");
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
    setIsLoading(true);

    if (!formData.loginName || !formData.password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData.loginName, formData.password);
      login(response);  // AuthContext 업데이트
      
      // 관리자 계정인 경우 관리자 페이지로, 아니면 메인페이지로 리다이렉트
      if (response.user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message || "로그인에 실패했습니다.";
      setError(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 연동
    console.log("Kakao login clicked");
  };

  return (
    <PageContainer>
      <LoginWrapper>
        {/* 로그인 폼 섹션 */}
        <LoginSection>
          <Title>로그인</Title>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="text"
                id="loginName"
                name="loginName"
                value={formData.loginName}
                onChange={handleChange}
                placeholder="아이디"
                required
              />
            </InputGroup>

            <InputGroup>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호"
                required
              />
            </InputGroup>

            <ForgotPassword to="/account/forgot-password">
              비밀번호를 잊으셨나요?
            </ForgotPassword>

            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </SubmitButton>

            <KakaoButton type="button">
              카카오 회원가입 및 로그인
            </KakaoButton>
          </Form>
        </LoginSection>

        {/* 회원가입 안내 섹션 */}
        <InfoSection>
          <InfoTitle>계정이 없으신가요?</InfoTitle>
          <InfoText>
            웰컴 1만원 할인 쿠폰을 포함한 특별한 멤버십 혜택을 누려보세요.
          </InfoText>
          <HighlightText>
            *이메일 마케팅 수신 동의 필수<br />
            *쿠폰은 발급 후 30일까지 유효
          </HighlightText>
          <SignupButton to="/account/register">회원가입 하기</SignupButton>
        </InfoSection>
      </LoginWrapper>
    </PageContainer>
  );
};
