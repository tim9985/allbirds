import styled from "styled-components";
import { NavMenu } from "@/sections/Header/components/NavMenu";

const Nav = styled.nav`
  position: fixed;
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-basis: 0%;
  flex-direction: column;
  flex-grow: 1;
  height: auto;
  min-height: 0;
  min-width: 0;
  opacity: 0;
  overflow-x: auto;
  overflow-y: scroll;
  pointer-events: none;
  width: 100vw;
  top: 108px;
  bottom: 0;
  left: 0;
  right: 0;

  @media (min-width: 768px) {
    position: static;
    flex-direction: row;
    height: 100%;
    min-height: auto;
    min-width: auto;
    opacity: 1;
    overflow-x: visible;
    overflow-y: visible;
    pointer-events: auto;
    width: auto;
    top: 0;
    transform: none;
  }
`;

const MobileActions = styled.div`
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 1rem;
  display: flex;
  justify-content: space-between;
  min-height: auto;
  min-width: auto;
  pointer-events: none;
  row-gap: 1rem;
  z-index: 50;
  margin-top: auto;
  padding: 1rem;

  @media (min-width: 768px) {
    display: none;
    min-height: 0;
    min-width: 0;
    pointer-events: auto;
  }
`;

const ActionButton = styled.a`
  font-size: 0.875rem;
  font-weight: 700;
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  height: 3rem;
  justify-content: center;
  letter-spacing: 2px;
  line-height: 14px;
  min-height: auto;
  min-width: auto;
  pointer-events: none;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 50%;
  border: 1px solid rgb(38 38 38);
  margin: 0;
  padding: 1rem 1.5rem;
  border-radius: 0.125rem;

  @media (min-width: 768px) {
    min-height: 0;
    min-width: 0;
    pointer-events: auto;
    margin: 1.5rem;
    padding: 1rem 2rem;
  }
`;

export const DesktopNav = () => {
  return (
    <Nav>
      <NavMenu />
      <MobileActions>
        <ActionButton href="/pages/consent">가입</ActionButton>
        <ActionButton href="/account/login">로그인</ActionButton>
      </MobileActions>
    </Nav>
  );
};
