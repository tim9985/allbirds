import styled from "styled-components";
import { HeroContent } from "@/sections/Hero/components/HeroContent";

const SlideWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
  height: 100%;
  min-width: 100%;
`;

const DesktopImage = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  display: none;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  width: 100%;

  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileImage = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const HeroSlide = () => {
  return (
    <SlideWrapper>
      <DesktopImage
        src="/img/23.jpg"
        sizes="100vw"
        alt="슈퍼 블랙 프라이데이"
      />
      <MobileImage
        src="/img/16.jpg"
        sizes="100vw"
        alt="슈퍼 블랙 프라이데이"
      />
      <HeroContent />
    </SlideWrapper>
  );
};
