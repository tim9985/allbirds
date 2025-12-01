import styled from "styled-components";
import { Hero } from "@/sections/Hero";
import { TrendingSection } from "@/sections/TrendingSection";
import { MaterialsSection } from "@/sections/MaterialsSection";
import { NewsLetterSection } from "@/sections/NewsLetterSection";

const MainContent = styled.main`
  position: relative;
`;

const Spacer = styled.div`
  height: 0;
`;

export const HomePage = () => {
  return (
    <MainContent>
      <Hero />
      <Spacer />
      <TrendingSection />
      <Spacer />
      <MaterialsSection />
      <NewsLetterSection />
    </MainContent>
  );
};
