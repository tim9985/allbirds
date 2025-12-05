import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoWrapper = styled.div`
  position: absolute;
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-wrap: wrap;
  left: calc(50% - 22px);
  min-height: 0;
  min-width: 0;
  transform: translateX(-29.94px);
  z-index: 99;
  padding-left: 0;

  @media (min-width: 768px) {
    position: static;
    width: auto;
    height: 68px;
    min-height: auto;
    min-width: auto;
    transform: none;
    z-index: auto;
    padding: 0;
    margin-left: 0;
  }
`;

const LogoHeading = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  line-height: 62px;
  margin: 0;
  
  @media (min-width: 768px) {
    height: 68px;
    align-items: center;
  }
`;

const LogoLink = styled(Link)`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  text-decoration: none;
`;

const LogoImage = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 2.5rem;
  width: 98px;

  @media (min-width: 768px) {
    width: 120px;
    height: 40px;
  }
`;

export const Logo = () => {
  return (
    <LogoWrapper>
      <LogoHeading>
        <LogoLink to="/">
          <LogoImage src="/img/icon-1.svg" alt="Allbirds" />
        </LogoLink>
      </LogoHeading>
    </LogoWrapper>
  );
};
