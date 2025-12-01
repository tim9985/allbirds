import styled from "styled-components";
import { NewsletterForm } from "@/sections/NewsLetterSection/components/NewsletterForm";

const Container = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const InnerWrapper = styled.div`
  position: relative;
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  overflow: hidden;
  padding: 60px 0;
  
  @media (min-width: 768px) {
    padding: 80px 0;
  }
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (min-width: 768px) {
    max-width: 1400px;
  }
`;

const CenterContent = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 300;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 43.2px;
  margin-bottom: 7.5px;

  @media (min-width: 768px) {
    font-size: 3rem;
    line-height: 57.6px;
    margin-bottom: 0.625rem;
  }
`;

const Description = styled.p`
  font-size: 14.4px;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 23.04px;
  opacity: 0.8;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 25.6px;
    margin-bottom: 2.5rem;
  }
`;

const FormWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  margin-bottom: 1.25rem;
`;

const DisclaimerWrapper = styled.div`
  color: rgb(120 113 108);
  font-size: 10.8px;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 16.2px;
  opacity: 0.7;

  @media (min-width: 768px) {
    font-size: 0.75rem;
    line-height: 18px;
  }
`;

const DisclaimerText = styled.p`
  font-size: 10.8px;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 16.2px;
  opacity: 0.7;

  @media (min-width: 768px) {
    font-size: 0.75rem;
    line-height: 18px;
  }
`;

const DisclaimerLink = styled.a`
  color: rgb(38 38 38);
  font-size: 10.8px;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 16.2px;
  text-decoration: underline;

  @media (min-width: 768px) {
    font-size: 0.75rem;
    line-height: 18px;
  }
`;

export const NewsLetterSection = () => {
  return (
    <Container>
      <InnerWrapper>
        <ContentWrapper>
          <CenterContent>
            <Title>올버즈 뉴스레터 구독</Title>
            <Description>최신 신제품 소식과 혜택을 가장 먼저 받아보세요.</Description>
            <FormWrapper>
              <NewsletterForm />
            </FormWrapper>
            <DisclaimerWrapper>
              <DisclaimerText>
                구독 시 마케팅 이메일 수신에 동의하게 됩니다. 자세한 내용은{" "}
                <DisclaimerLink
                  href="https://allbirds.co.kr/pages/privacy-policy-24-07"
                  title="https://allbirds.co.kr/pages/privacy-policy-24-07"
                >
                  개인정보 처리방침
                </DisclaimerLink>
                및{" "}
                <DisclaimerLink
                  href="https://allbirds.co.kr/pages/terms-of-use_240920"
                  title="https://allbirds.co.kr/pages/terms-of-use_240920"
                >
                  이용약관
                </DisclaimerLink>
                을 확인해 주세요.
              </DisclaimerText>
            </DisclaimerWrapper>
          </CenterContent>
        </ContentWrapper>
      </InnerWrapper>
    </Container>
  );
};
