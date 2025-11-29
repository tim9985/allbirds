import styled from 'styled-components';

const BannerWrapper = styled.div`
  width: 100%;
`;

const BannerContent = styled.div`
  background-color: #dc2626;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;

  @media (min-width: 768px) {
    padding: 10px 20px;
  }
`;

const BannerInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  width: 100%;
  line-height: 1.6;

  @media (min-width: 768px) {
    gap: 12px;
  }
`;

const BannerText = styled.p`
  font-size: 0.75rem;
  line-height: 1.4;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const BannerLink = styled.a`
  text-decoration: underline;
  color: white;
  cursor: pointer;
  margin-left: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

export const AnnouncementBanner = () => {
  return (
    <BannerWrapper>
      <BannerContent>
        <BannerInner>
          <BannerText>
            연중 최대 혜택 · 올버즈 슈퍼 블랙 프라이데이 |{" "}
            <BannerLink href="/collections/mens-off" title="남성 세일 제품">
              남성
            </BannerLink>
            <BannerLink href="/collections/womens-off" title="여성 세일 제품">
              여성
            </BannerLink>
          </BannerText>
        </BannerInner>
      </BannerContent>
    </BannerWrapper>
  );
};
