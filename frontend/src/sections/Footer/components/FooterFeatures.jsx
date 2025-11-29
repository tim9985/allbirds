import styled from "styled-components";
import { FeatureCard } from "@/sections/Footer/components/FeatureCard";

const SectionContainer = styled.section`
  box-sizing: border-box;
  caret-color: transparent;
`;

const OuterWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const InnerWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.25rem;

  @media (min-width: 768px) {
    padding: 0 5rem;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
`;

const CardsGrid = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 1rem;
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1rem;
  overflow: auto;

  @media (min-width: 768px) {
    column-gap: 3rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 3rem;
    scroll-snap-type: none;
    overflow: visible;
  }
`;

const DotsContainer = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 0.5rem;
  display: flex;
  justify-content: center;
  row-gap: 0.5rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DotButton = styled.button`
  background-color: ${props => props.$active ? 'transparent' : 'rgb(214 211 209)'};
  caret-color: transparent;
  display: block;
  height: 0.5rem;
  min-height: auto;
  min-width: auto;
  text-align: center;
  width: 0.5rem;
  padding: 0;
  border-radius: 50%;
  opacity: ${props => props.$active ? '1' : '0.5'};
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: inline-block;
    min-height: 0;
    min-width: 0;
  }
`;

export const FooterFeatures = () => {
  return (
    <SectionContainer>
      <OuterWrapper>
        <InnerWrapper>
          <ContentWrapper>
            <CardsGrid>
              <FeatureCard
                imageUrl="/img/5.webp"
                imageClassName="aspect-[auto_960_/_800]"
                title="매일 경험하는 편안함"
                description="올버는 마치 구름 위를 걷는 듯한 가벼움과, 바람처럼 자유로운 탄력을 선사합니다. 놀라운 편안함은 긴 여정도 짧은 산책처럼 느껴집니다."
              />
              <FeatureCard
                imageUrl="/img/4.webp"
                imageClassName="aspect-[auto_600_/_501]"
                title="지속 가능한 발걸음"
                description="소재를 고르는 순간부터 신발이 당신에게 닿는 그 순간까지 지구에 남기는 흔적을 헤아립니다. 탄소 발자국을 제로에 가깝게 줄이려는 노력에 동참해주세요."
              />
              <FeatureCard
                imageUrl="/img/6.webp"
                imageClassName="aspect-[auto_960_/_1200]"
                title="지구에서 온 소재"
                description="올버즈는 가능한 모든 곳에서 석유 기반 합성소재를 천연 대안으로 대체합니다. 울, 나무, 사탕수수 같은 자연 소재는 부드럽고 통기성이 좋습니다."
              />
            </CardsGrid>
            <DotsContainer>
              <DotButton aria-label="slide 1" $active={true} />
              <DotButton aria-label="slide 2" $active={false} />
              <DotButton aria-label="slide 3" $active={false} />
            </DotsContainer>
          </ContentWrapper>
        </InnerWrapper>
      </OuterWrapper>
    </SectionContainer>
  );
};
