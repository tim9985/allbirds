// src/pages/mypage/MyOverview.jsx
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMe } from "@/api/userAPI";

export const MyOverview = () => {
  const [user, setUser] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false); 

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe();
        // 응답 구조에 따라 유연하게 user 추출
        const u = res?.user ?? res?.data?.user ?? res?.data ?? res;
        setUser(u);
      } catch (err) {
        console.error("getMe error:", err);
      }
    };
    fetchMe();
  }, []);

  const handleCheck = () => {
  setIsAgreed(!isAgreed);
  };

  const name =
    user?.displayName || user?.loginName || user?.name || "테스트유저";

  return (
    <Wrapper>
      {/* 레이아웃에서 이미 "마이페이지" 제목을 렌더링하므로 여기선 이름부터 시작 */}
      <TopBox>
        <Name>{name} 님</Name>
      </TopBox>

      {/* 트리 / 포인트 박스 */}
      <LevelPointRow>
        <LeftCol>트리 TREE</LeftCol>
        <RightCol>0 포인트</RightCol>
      </LevelPointRow>

      <NextLevelText><b>
        다음 레벨인 슈가 SUGAR 까지 남은 구매 금액은{" "}
        <Underline>300,000원</Underline> 입니다.</b>
      </NextLevelText>

      <GuideList>
        <GuideItem>
          <strong>
            포인트는 구매 체크아웃 단계에서 할인 쿠폰으로 변경하여 사용할 수
            있습니다.
          </strong>
        </GuideItem>
        <GuideItem>
          구매 금액은 각 거래에 대해 30일 이후 반영됩니다.
        </GuideItem>
        <GuideItem>
          레벨은 조건이 충족되면 자동으로 승격됩니다.
        </GuideItem>
        <GuideItem>
          레벨은 매년 1/15, 7/15에 최근 1년 구매 이력을 반영하여 재산정됩니다.
        </GuideItem>
      </GuideList>

      <ButtonWrapper>
        <MemberButton>올멤버스 레벨</MemberButton>
      </ButtonWrapper>

      <Divider />

      <EmailRow>
        <span>이메일 수신 동의</span>

        <CheckWrap>
          <CheckBox 
            type="checkbox" 
            checked={isAgreed} 
            onChange={handleCheck} 
          />
          <span>동의</span>
        </CheckWrap>

        <ApplyButton disabled={!isAgreed}>적용</ApplyButton>
      </EmailRow>

      <EmailNote>
        *동의자에 한해 일부 올멤버스 혜택 및 이벤트 알림이 제공됩니다.
      </EmailNote>
    </Wrapper>
  );
};

/* ------------------------------------------
   styles
------------------------------------------- */

const Wrapper = styled.div`
  width: 100%;
  font-family: "Pretendard", sans-serif;
  color: #111;
  font-size: 16px;
  padding-bottom: 60px;
`;

const TopBox = styled.div`
  margin-top: 4px;
  margin-bottom: 24px;
`;

const Name = styled.div`
  font-size: 18px;
  margin-bottom: 18px;
`;

/* 트리 / 포인트 박스 영역 */
const LevelPointRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #111;
  border-bottom: 1px solid #111;
  font-size: 18px;
  width: 50%;
  
`;

const LeftCol = styled.div`
  padding: 9px 12px;
  text-align: center;
`;

const RightCol = styled.div`
  padding: 9px 12px;
  text-align: center;
  border-left: 1px solid #111; /* 가운데 세로 구분선 */
`;

const NextLevelText = styled.p`
  margin: 24px 0 26px;
  font-size: 16px;
  text-decoration: underline;
`;

const Underline = styled.u``;

const GuideList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0 0 30px;
  font-size: 16px;
  line-height: 1.85;
`;

const GuideItem = styled.li`
  margin-bottom: 6px;
  position: relative;
  padding-left: 20px;

  &::before {
    content: "*";
    position: absolute;
    left: 0;
    top: -1px;
    font-size: 18px;
    font-weight: 700;
  }

  strong {
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  margin: 30px 0;
`;

const MemberButton = styled.button`
  border: 1px solid #111;
  padding: 12px 64px;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
`;

const Divider = styled.hr`
  margin: 40px 0 26px;
  border: none;
  border-top: 1px solid #ccc;
`;

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const CheckWrap = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckBox = styled.input`
  appearance: none; /* 기본 브라우저 체크박스 숨김 */
  width: 30px;
  height: 30px;
  border: 1px solid #111; /* 테두리 */
  margin-right: 4px; /* 글자와의 간격 */
  cursor: pointer;
  
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  /* 체크되었을 때 스타일 */
  &:checked::after {
    content: "V";       /* 가상 요소로 'V' 글자 삽입 */
    font-size: 14px;    /* V 크기 조절 */
    font-weight: 700;   /* 굵게 */
    color: #111;        /* V 색상 */
    line-height: 1;
  }
`;

const ApplyButton = styled.button`
  margin-left: auto;
  padding: 14px 96px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  
  /* disabled prop에 따라 색상 변경 */
  background: ${(props) => (props.disabled ? "#ddd" : "#fff")}; 
  color: ${(props) => (props.disabled ? "#777" : "#111")};
  border: ${(props) => (props.disabled ? "none" : "1px solid #111")};
`;

const EmailNote = styled.p`
  font-size: 13px;
  margin-top: 12px;
`;
