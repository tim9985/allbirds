import styled from 'styled-components';
import { Logo } from "@/sections/Header/components/Logo";
import { DesktopNav } from "@/sections/Header/components/DesktopNav";
import { MobileNavToggle } from "@/sections/Header/components/MobileNavToggle";
import { HeaderActions } from "@/sections/Header/components/HeaderActions";

const HeaderElement = styled.header`
  position: fixed;
  top: 36px;
  left: 0;
  right: 0;
  background-color: white;
  width: 100%;
  z-index: 1049;
  height: 68px;
  
  @media (max-width: 767px) {
    top: 28px;
  }
`;

const HeaderInner = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background-color: white;
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 0 80px;
  
  @media (max-width: 767px) {
    display: flex;
    padding: 0;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
  background-color: transparent;
  padding: 0;
`;

const LeftSection = styled.div`
  display: none;
  justify-content: flex-start;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const CenterSection = styled.div`
  display: none;
  justify-content: center;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const RightSection = styled.div`
  display: none;
  justify-content: flex-end;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const Header = () => {
  return (
    <HeaderElement>
      <HeaderInner>
        <HiddenCheckbox type="checkbox" />
        <LeftSection>
          <Logo />
        </LeftSection>
        <CenterSection>
          <DesktopNav />
        </CenterSection>
        <RightSection>
          <HeaderActions />
        </RightSection>
        <MobileNavToggle />
      </HeaderInner>
    </HeaderElement>
  );
};
