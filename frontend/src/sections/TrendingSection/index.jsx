import styled from 'styled-components';
import { TrendingSlider } from "@/sections/TrendingSection/components/TrendingSlider";

const TrendingSectionWrapper = styled.div`
  width: 100%;
  background-color: white;
  padding: 40px 0;
  
  @media (min-width: 768px) {
    padding: 60px 0;
  }
`;

export const TrendingSection = () => {
  return (
    <TrendingSectionWrapper>
      <TrendingSlider />
    </TrendingSectionWrapper>
  );
};
