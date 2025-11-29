import styled from "styled-components";

const SocialWrapper = styled.div`
  align-items: normal;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 1.25rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0px, 1fr));
  max-width: 269px;
  row-gap: 1.25rem;
  text-align: start;

  @media (min-width: 768px) {
    align-items: start;
    justify-items: start;
    text-align: left;
  }
`;

const Title = styled.p`
  font-size: 1rem;
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 19px;
  text-align: start;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Description = styled.p`
  font-size: 0.875rem;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 17px;
  text-align: start;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const NavContainer = styled.nav`
  box-sizing: border-box;
  caret-color: transparent;
  text-align: start;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const SocialList = styled.ul`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 2rem;
  display: flex;
  list-style: none;
  row-gap: 2rem;
  text-align: start;
  padding-left: 0;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const SocialItem = styled.li`
  box-sizing: border-box;
  caret-color: transparent;
  text-align: start;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const SocialLink = styled.a`
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  text-align: start;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const SocialIcon = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 1.25rem;
  text-align: start;
  width: ${props => props.$width || '1.25rem'};

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const FooterSocial = () => {
  return (
    <SocialWrapper>
      <Title>ALLBIRDS를 팔로우 하세요!</Title>
      <Description>
        최신 정보나 Allbirds 상품의 스냅샷 등을 보실 수 있습니다. 오! 물론
        귀여운 양도 보실 수 있죠. #weareallbirds #올버즈
      </Description>
      <NavContainer role="navigation" aria-label="Social links">
        <SocialList>
          <SocialItem>
            <SocialLink
              href="https://www.instagram.com/allbirdskorea"
              title="Instagram"
            >
              <SocialIcon src="/img/icon-16.svg" alt="Icon" />
            </SocialLink>
          </SocialItem>
          <SocialItem>
            <SocialLink
              href="https://www.facebook.com/weareallbirds"
              title="Facebook"
            >
              <SocialIcon src="/img/icon-17.svg" alt="Icon" $width="11px" />
            </SocialLink>
          </SocialItem>
          <SocialItem>
            <SocialLink
              href="https://www.youtube.com/@allbirdskorea"
              title="Youtube"
            />
          </SocialItem>
        </SocialList>
      </NavContainer>
    </SocialWrapper>
  );
};
