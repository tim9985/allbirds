import styled from "styled-components";
import { useState } from "react";

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: normal;
  list-style: none;
  width: 100%;
  padding: 1rem;
  pointer-events: none;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    height: 68px;
    width: auto;
    padding: 0;
    pointer-events: auto;
  }
`;

const MenuItem = styled.li`
  position: relative;
  list-style-type: none;
  opacity: 0;
  left: -5px;
  pointer-events: none;

  @media (min-width: 768px) {
    position: static;
    display: flex;
    opacity: 1;
    left: auto;
    pointer-events: auto;
  }
`;

const MenuLink = styled.a`
  font-weight: 500;
  align-items: normal;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  height: auto;
  justify-content: space-between;
  letter-spacing: 1.7px;
  line-height: 21px;
  min-height: 0;
  min-width: 0;
  pointer-events: none;
  padding: 0.625rem;

  @media (min-width: 768px) {
    align-items: center;
    height: 100%;
    line-height: 1.25rem;
    min-height: auto;
    min-width: auto;
    pointer-events: auto;
    padding: 18px 1.5rem;
  }

  &:hover {
    opacity: 0.7;
    transition: opacity 0.3s;
  }
`;

const MenuButton = styled.button`
  font-weight: 500;
  align-items: normal;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 0.5rem;
  display: flex;
  height: auto;
  justify-content: space-between;
  letter-spacing: 1.7px;
  line-height: 21px;
  list-style-position: inside;
  pointer-events: none;
  row-gap: 0.5rem;
  padding: 0.625rem;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    align-items: center;
    height: 100%;
    line-height: 1.25rem;
    pointer-events: auto;
    padding: 18px 1.5rem;
  }

  &:hover {
    opacity: 0.7;
    transition: opacity 0.3s;
  }
`;

const MenuSpan = styled.span`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  line-height: 21px;
  pointer-events: none;

  @media (min-width: 768px) {
    line-height: 1.25rem;
    pointer-events: auto;
  }
`;

const NotificationDot = styled.div`
  position: absolute;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 21px;
  pointer-events: none;
  right: 15px;
  top: -1.75rem;

  @media (min-width: 768px) {
    line-height: 1.25rem;
    pointer-events: auto;
  }
`;

const RedDot = styled.div`
  position: absolute;
  background-color: rgb(239 68 68);
  box-sizing: border-box;
  caret-color: transparent;
  height: 9px;
  line-height: 21px;
  pointer-events: none;
  width: 9px;
  border-radius: 50%;
  left: 23px;
  top: 23px;

  @media (min-width: 768px) {
    line-height: 1.25rem;
    pointer-events: auto;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  width: 100vw;
  height: 340px;
  opacity: ${ (props) => props.$isActive ? '1' : '0'};
  visibility: ${(props) => props.$isActive ? 'visible' : 'hidden'};
  pointer-events: ${(props) => props.$isActive ? 'auto' : 'none'};
  display: none;
  z-index: 1000;
  overflow: hidden;

  @media (min-width: 768px) {
    display: block;
  }
`;

const DropdownContent = styled.div`
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 3rem 80px;
  background-color: white;
  display: flex;
  gap: 5rem;
  box-sizing: border-box;
  overflow: hidden;
  justify-content: flex-start;
`;

const TabSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0 0 auto;
  min-width: 0;
  overflow: hidden;
`;

const TabTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 400;
  line-height: normal;
  text-transform: none;
  letter-spacing: 0;
  margin-bottom: 0.5rem;
  padding-bottom: 0;
  cursor: pointer;
  white-space: nowrap;
  
  &::before {
    content: '';
    display: inline-block;
    width: 0;
    height: 1px;
    background-color: #000;
    transition: all 0.3s;
    margin-right: 0;
  }

  &:hover::before {
    width: 32px;
    margin-right: 1rem;
  }
`;

const ColumnContent = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0;
  list-style: none;
  margin: 0;
  width: 100%;
`;

const LinkItem = styled.li`
  border-left: 0.9px solid #000;
  opacity: 1;
  transform: translateX(0);
  animation-duration: 0.2s;
  animation-delay: 0s;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  margin: 0;
`;

const ColumnLink = styled.a`
  display: flex;
  padding: 0.25rem 0 0.25rem 1.25rem;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0;
  color: #000;
  position: relative;
  transition: all 0.2s ease;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 100%;
    top: 0;
    z-index: -1;
    transition: all 0.2s ease;
  }

  &:hover {
    text-decoration: underline;
  }

  &:hover::before {
    right: 0;
  }
`;

const SectionDivider = styled.div`
  width: 0;
  display: none;
`;

export const NavMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const sections = {
    "올버즈": [
      { text: "브랜드 스토리", href: "/pages/our-story" },
      { text: "지속 가능성", href: "/pages/sustainability" },
      { text: "소재", href: "/pages/materials" },
      { text: "수선", href: "/pages/repair" },
    ],
    "스토리": [
      { text: "올멤버스", href: "/pages/allmembers" },
      { text: "올버즈 앰배서더", href: "/pages/allbirds-ambassador" },
      { text: "ReRun", href: "/pages/rerun-project" },
      { text: "신발 관리 방법", href: "/pages/shoe-care" },
    ],
    "소식": [
      { text: "캠페인", href: "/blogs/campaign" },
      { text: "뉴스", href: "/blogs/news" },
    ],
  };

  return (
    <MenuList>
      <MenuItem>
        <MenuLink href="/collections/womens-off">
          <MenuSpan>
            슈퍼 블랙 프라이데이
            <NotificationDot>
              <RedDot />
            </NotificationDot>
          </MenuSpan>
        </MenuLink>
      </MenuItem>
      <MenuItem>
        <MenuLink href="/pages/our-stores">
          <MenuSpan>매장 위치</MenuSpan>
        </MenuLink>
      </MenuItem>
      <MenuItem 
        onMouseEnter={() => handleMouseEnter("sustainability")}
        onMouseLeave={handleMouseLeave}
      >
        <MenuButton>
          <MenuSpan>지속 가능성</MenuSpan>
        </MenuButton>
        
        <DropdownMenu 
          $isActive={activeDropdown === "sustainability"}
          onMouseEnter={() => handleMouseEnter("sustainability")}
          onMouseLeave={handleMouseLeave}
        >
          <DropdownContent>
            {Object.entries(sections).map(([title, links], idx) => (
              <TabSection key={title}>
                <TabTitle>{title}</TabTitle>
                <ColumnContent>
                  {links.map((link, linkIdx) => (
                    <LinkItem key={linkIdx}>
                      <ColumnLink href={link.href}>
                        {link.text}
                      </ColumnLink>
                    </LinkItem>
                  ))}
                </ColumnContent>
              </TabSection>
            ))}
          </DropdownContent>
        </DropdownMenu>
      </MenuItem>
    </MenuList>
  );
};
