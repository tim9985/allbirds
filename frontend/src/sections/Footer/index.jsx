import styled from "styled-components";
import { FooterFeatures } from "@/sections/Footer/components/FooterFeatures";
import { FooterLinks } from "@/sections/Footer/components/FooterLinks";

const FooterContainer = styled.footer`
  box-sizing: border-box;
  caret-color: transparent;
`;

const Spacer = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const SpacerSection = styled.section`
  box-sizing: border-box;
  caret-color: transparent;
  height: 1.75rem;

  @media (min-width: 768px) {
    height: 2.5rem;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterFeatures />
      <Spacer>
        <SpacerSection />
      </Spacer>
      <FooterLinks />
    </FooterContainer>
  );
};
