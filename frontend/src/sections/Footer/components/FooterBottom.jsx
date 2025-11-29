import styled from "styled-components";

const BottomContainer = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  max-width: 1440px;
  margin: 0 auto;
  padding: 55px 0 0;

  @media (min-width: 768px) {
    padding: 46px 77px 99px;
  }
`;

const GridWrapper = styled.div`
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

const LinksColumn = styled.div`
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

const InfoColumn = styled.div`
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

export const FooterBottom = () => {
  return (
    <BottomContainer>
      <GridWrapper>
        <LinksColumn>
          <Copyright>© 2025 EFG.COAll Rights Reserved.</Copyright>
          <LinksWrapper>
            <Link href="/pages/terms-of-use_240920">이용 약관</Link>, 
            <Link href="/pages/privacy-policy-24-07">개인정보 처리방침</Link>, 
          </LinksWrapper>
        </LinksColumn>
        <InfoColumn>
          <InfoText>
            (주)이에프쥐 대표 박제우 ㅣ 서울특별시 강남구 강남대로 160길 45
            <LineBreak />
            통신판매업신고번호 2023-서울강남-04461 ㅣ 등록번호 146-81-03205
            <LineBreak />
            전화번호 070-4138-0128(수신자 부담)ㅣ E-mail{" "}
            <EmailLink href="mailto://help@efg.earth">help@efg.earth</EmailLink>
          </InfoText>
        </InfoColumn>
      </GridWrapper>
    </BottomContainer>
  );
};