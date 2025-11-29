import styled from "styled-components";
import { MaterialCard } from "@/sections/MaterialsSection/components/MaterialCard";

const SectionContainer = styled.div`
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  padding: 40px 0;
  
  @media (min-width: 768px) {
    padding: 60px 0;
  }
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 100%;
  width: 100%;
  margin-top: 1.25rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1.25rem;

  @media (min-width: 768px) {
    max-width: 1400px;
    margin-top: 2.5rem;
  }
`;

const InnerWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const Title = styled.div`
  font-size: 2.25rem;
  font-weight: 300;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 2.25rem;
  padding-bottom: 1.25rem;

  @media (min-width: 768px) {
    font-size: 3rem;
    line-height: 48px;
    padding-bottom: 2.5rem;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
  list-style: none;
  z-index: 1;
  overflow: clip;
  margin: 0 auto;
`;

const SliderInner = styled.div`
  position: relative;
  caret-color: transparent;
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const ProgressBar = styled.div`
  background-color: rgb(214 211 209);
  box-sizing: border-box;
  caret-color: transparent;
  display: none;
  height: 0.125rem;
  width: 200px;
  margin: 1.75rem auto;
`;

const ProgressFill = styled.div`
  background-color: black;
  box-sizing: border-box;
  caret-color: transparent;
  height: 0.125rem;
  width: 0;
`;

export const MaterialsSection = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
        <InnerWrapper>
          <Title>우리가 사용하는 소재</Title>
          <SliderContainer>
            <SliderInner>
              <MaterialCard
                href="/pages/our-materials-wool"
                imageUrl="/img/10.avif"
                imageSizes="(max-width: 900px) calc(100vw - 32px), (min-width: 932px) 868px, 868px"
                title="ZQ 메리노 울"
                description="최상급 울 소재"
                linkText="더 알아보기"
              />
              <MaterialCard
                href="/pages/our-materials-tree"
                imageUrl="/img/11.avif"
                imageSizes="(max-width: 900px) calc(100vw - 32px), (min-width: 932px) 868px, 868px"
                title="유칼립투스 나무"
                description="실크처럼 매끄러운 촉감"
                linkText="더 알아보기"
              />
              <MaterialCard
                href="/pages/our-materials-sugar"
                imageUrl="/img/12.avif"
                imageSizes="(max-width: 900px) calc(100vw - 32px), (min-width: 932px) 868px, 868px"
                title="사탕수수"
                description="부드러운 SweetFoam®의 주 소재"
                linkText="더 알아보기"
              />
            </SliderInner>
          </SliderContainer>
          <ProgressBar>
            <ProgressFill />
          </ProgressBar>
        </InnerWrapper>
      </ContentWrapper>
    </SectionContainer>
  );
};
