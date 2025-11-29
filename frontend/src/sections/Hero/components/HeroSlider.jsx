import styled from "styled-components";
import { HeroSlide } from "@/sections/Hero/components/HeroSlide";

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  font-family: Pretendard, sans-serif;
`;

const SliderInner = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  @media (min-width: 768px) {
    height: 800px;
  }
`;

const SlideWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const HeroSlider = () => {
  return (
    <SliderContainer>
      <SliderInner>
        <SlideWrapper>
          <HeroSlide />
        </SlideWrapper>
      </SliderInner>
    </SliderContainer>
  );
};
