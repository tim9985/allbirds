import styled from "styled-components";
import { HeroSlider } from "@/sections/Hero/components/HeroSlider";

const Container = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

export const Hero = () => {
  return (
    <Container>
      <HeroSlider />
    </Container>
  );
};
