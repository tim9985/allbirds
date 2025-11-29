import styled from "styled-components";
import { FooterColumn } from "@/sections/Footer/components/FooterColumn";
import { FooterSocial } from "@/sections/Footer/components/FooterSocial";

const Container = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const InnerContainer = styled.div`
  color: white;
  font-size: 0.75rem;
  background-color: rgb(38 38 38);
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 1rem;
  padding: 63px 34px;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const TopSection = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 54px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  row-gap: 54px;
  margin: 0 auto;
  padding: 0;

  @media (min-width: 768px) {
    column-gap: 0;
    flex-wrap: nowrap;
    row-gap: 0;
    padding: 94px 77px 91px;
  }
`;

const LeftColumn = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const LinksList = styled.ul`
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
`;

const MainLink = styled.a`
  position: relative;
  font-size: 2.25rem;
  font-weight: 300;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  line-height: 54px;
  width: fit-content;

  @media (min-width: 768px) {
    font-size: 3rem;
    line-height: 72px;
  }

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 3px;
  }
`;

const RightColumn = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 54px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0px, 1fr));
  row-gap: 54px;
  text-align: center;
  width: 100%;

  @media (min-width: 768px) {
    column-gap: 0;
    display: flex;
    grid-template-columns: repeat(4, minmax(0px, 1fr));
    row-gap: 0;
    text-align: left;
    width: 50%;
  }
`;

const MiddleSection = styled.div`
  align-items: start;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 54px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0px, 1fr));
  max-width: 1440px;
  row-gap: 54px;
  margin: 0 auto;
  padding: 51px 0 0;

  @media (min-width: 768px) {
    column-gap: 0;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    row-gap: 0;
    padding: 0 77px;
  }
`;

const ImageWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  justify-content: normal;

  @media (min-width: 768px) {
    justify-content: start;
  }
`;

const Image = styled.img`
  aspect-ratio: auto 80 / 123;
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 100%;
  width: 5rem;
`;

const RegionLinksWrapper = styled.div`
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 0.25rem;
  display: none;
  grid-column-end: auto;
  grid-column-start: auto;
  justify-content: center;
  row-gap: 0.25rem;

  @media (min-width: 768px) {
    grid-column-end: span 2;
    grid-column-start: span 2;
    justify-content: space-between;
  }
`;

const RegionLink = styled.a`
  box-sizing: border-box;
  caret-color: transparent;
`;

const RegionIcon = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 22px;
  width: 37px;
`;

const BottomSection = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 1440px;
  margin: 0 auto;
  padding: 55px 0 0;

  @media (min-width: 768px) {
    padding: 46px 77px 99px;
  }
`;

const BottomGrid = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 17px;
  display: grid;
  grid-template-columns: none;
  row-gap: 17px;

  @media (min-width: 768px) {
    column-gap: 0;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    row-gap: 0;
  }
`;

const BottomLeft = styled.div`
  align-items: start;
  box-sizing: border-box;
  caret-color: transparent;
  column-gap: 5px;
  display: flex;
  flex-direction: column;
  line-height: 18px;
  row-gap: 5px;

  @media (min-width: 768px) {
    align-items: end;
    column-gap: 0.25rem;
    flex-direction: row;
    row-gap: 0.25rem;
  }
`;

const Copyright = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const LinksWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const Link = styled.a`
  box-sizing: border-box;
  caret-color: transparent;
  text-decoration: underline;
`;

const BottomRight = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 17px;
  max-width: 219px;

  @media (min-width: 768px) {
    max-width: none;
  }
`;

const InfoText = styled.p`
  box-sizing: border-box;
  caret-color: transparent;
`;

const LineBreak = styled.br`
  box-sizing: border-box;
  caret-color: transparent;
`;

const EmailLink = styled.a`
  box-sizing: border-box;
  caret-color: transparent;
  text-decoration: underline;
`;

export const FooterLinks = () => {
  return (
    <Container>
      <InnerContainer>
        <TopSection>
          <LeftColumn>
            <LinksList>
              <MainLink href="/pages/consent">올멤버스 가입하기</MainLink>
              <MainLink href="/pages/our-stores">오프라인 매장 찾기</MainLink>
              <MainLink href="http://pf.kakao.com/_xfxcxhVb">카카오 채널 추가하기</MainLink>
              <MainLink href="/pages/our-story">올버즈 브랜드 스토리</MainLink>
            </LinksList>
          </LeftColumn>
          <RightColumn>
            <FooterColumn />
          </RightColumn>
        </TopSection>
        <MiddleSection>
          <FooterSocial />
          <ImageWrapper>
            <Image
              src="/img/13.png"
              sizes="(max-width: 900px) calc(100vw - 32px), (min-width: 932px) 868px, 868px"
            />
          </ImageWrapper>
          <RegionLinksWrapper>
            <RegionLink href="https://www.allbirds.com/?_ga=2.85219225.1698319504.1694397111-290296150.1693902805">
              <RegionIcon src="/img/icon-18.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.co.kr/">
              <RegionIcon src="/img/icon-19.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.eu/">
              <RegionIcon src="/img/icon-20.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.co.uk/">
              <RegionIcon src="/img/icon-21.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.ca/">
              <RegionIcon src="/img/icon-22.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.com.au/?_ga=2.81220247.1698319504.1694397111-290296150.1693902805">
              <RegionIcon src="/img/icon-23.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.co.nz/?_ga=2.81220247.1698319504.1694397111-290296150.1693902805">
              <RegionIcon src="/img/icon-24.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.jp/?_ga=2.81220247.1698319504.1694397111-290296150.1693902805">
              <RegionIcon src="/img/icon-25.svg" alt="Icon" />
            </RegionLink>
            <RegionLink href="https://www.allbirds.cn/">
              <RegionIcon src="/img/icon-26.svg" alt="Icon" />
            </RegionLink>
          </RegionLinksWrapper>
        </MiddleSection>
        <BottomSection>
          <BottomGrid>
            <BottomLeft>
              <Copyright>© 2025 EFG.COAll Rights Reserved.</Copyright>
              <LinksWrapper>
                <Link href="/pages/terms-of-use_240920">이용 약관</Link>, 
                <Link href="/pages/privacy-policy-24-07">개인정보 처리방침</Link>, 
              </LinksWrapper>
            </BottomLeft>
            <BottomRight>
              <InfoText>
                (주)이에프쥐 대표 박제우 ㅣ 서울특별시 강남구 강남대로 160길 45
                <LineBreak />
                통신판매업신고번호 2023-서울강남-04461 ㅣ 등록번호 146-81-03205
                <LineBreak />
                전화번호 070-4138-0128(수신자 부담)ㅣ E-mail{" "}
                <EmailLink href="mailto://help@efg.earth">help@efg.earth</EmailLink>
              </InfoText>
            </BottomRight>
          </BottomGrid>
        </BottomSection>
      </InnerContainer>
    </Container>
  );
};