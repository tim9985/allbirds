import styled from "styled-components";
import { Hero } from "@/sections/Hero";
import { TrendingSection } from "@/sections/TrendingSection";
import { MaterialsSection } from "@/sections/MaterialsSection";
import { NewsletterSection } from "@/sections/NewsletterSection";

const PageWrapper = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const MainContent = styled.main`
  position: relative;
`;

const Spacer = styled.div`
  height: 0;
`;

export const HomePage = () => {
  return (
    <PageWrapper>
      <MainContent>
        <Hero />
        <Spacer />
        <TrendingSection />
        <Spacer />
        <MaterialsSection />
        <NewsletterSection />
      </MainContent>
    </PageWrapper>
  );
};
