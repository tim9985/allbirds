import styled from "styled-components";

const ColumnDetails = styled.details`
  align-items: start;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  grid-template-columns: repeat(1, minmax(0px, 1fr));
  text-align: left;

  @media (min-width: 768px) {
    align-items: normal;
  }
`;

const ColumnSummary = styled.summary`
  font-size: 2.25rem;
  box-sizing: border-box;
  caret-color: transparent;
  list-style-position: inside;
  list-style-type: none;
  line-height: 35px;
  pointer-events: auto;
  padding-bottom: 45px;

  @media (min-width: 768px) {
    pointer-events: none;
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

const ListItem = styled.li`
  box-sizing: border-box;
  caret-color: transparent;
`;

const Link = styled.a`
  font-size: 1rem;
  box-sizing: border-box;
  caret-color: transparent;
  display: inline-block;
  line-height: 19px;
  padding-bottom: 22px;

  @media (min-width: 768px) {
    line-height: normal;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const LastLink = styled(Link)`
  padding-bottom: 22px;

  @media (min-width: 768px) {
    line-height: normal;
    padding-bottom: 0;
  }
`;

export const FooterColumn = () => {
  return (
    <ColumnDetails>
      <ColumnSummary>올버즈 지원</ColumnSummary>
      <LinksList>
        <ListItem>
          <Link href="/pages/returns-exchanges">교환 및 반품</Link>
        </ListItem>
        <ListItem>
          <Link href="/pages/repair-service">수선</Link>
        </ListItem>
        <ListItem>
          <Link>문의하기</Link>
        </ListItem>
        <ListItem>
          <Link href="/pages/help">FAQ</Link>
        </ListItem>
        <ListItem>
          <LastLink href="https://www.saramin.co.kr/zf_user/company-info/view-inner-recruit?csn=NW1YMzRoRzRWNklZSi9JTWRtblUrdz09">
            채용
          </LastLink>
        </ListItem>
      </LinksList>
    </ColumnDetails>
  );
};
