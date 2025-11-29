import styled from "styled-components";

const ContentWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 90%;
  text-align: center;
  transform: translateX(-50%);
  width: 90%;
  z-index: 2;
  padding: 1.25rem;
  left: 50%;
  top: auto;
  bottom: 2.5rem;

  @media (min-width: 768px) {
    max-width: 600px;
    text-align: left;
    transform: translateY(-50%);
    left: 5%;
    top: 50%;
    bottom: auto;
  }
`;

const Title = styled.h2`
  color: black;
  font-size: 1.125rem;
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 21.6px;
  text-align: center;
  margin-bottom: 0.75rem;
  font-family: Pretendard, sans-serif;

  @media (min-width: 768px) {
    font-size: 40px;
    line-height: 48px;
    text-align: left;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  color: black;
  font-size: 1rem;
  font-weight: 300;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 22.4px;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
    text-align: left;
    margin-bottom: 2rem;
  }
`;

const ButtonsWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;

  @media (min-width: 768px) {
    justify-content: normal;
    text-align: left;
  }
`;

const CTAButton = styled.a`
  color: rgb(12 10 9);
  font-size: 14.4px;
  font-weight: 600;
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  text-align: center;
  padding: 0.625rem 2.5rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    text-align: left;
    padding: 0.75rem 50px;
  }

  &:hover {
    color: black;
  }
`;

const CTAButtonSecondary = styled(CTAButton)`
  color: black;

  &:hover {
    color: white;
    background-color: black;
  }
`;

export const HeroContent = () => {
  return (
    <ContentWrapper>
      <Title>슈퍼 블랙 프라이데이</Title>
      <Description>연중 최대 혜택. UP TO 50% OFF.</Description>
      <ButtonsWrapper>
        <CTAButton href="/collections/mens-off">남성 세일</CTAButton>
        <CTAButtonSecondary href="/collections/womens-off">여성 세일</CTAButtonSecondary>
      </ButtonsWrapper>
    </ContentWrapper>
  );
};
