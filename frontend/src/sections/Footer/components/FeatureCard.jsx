import styled from "styled-components";

const CardWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  flex-basis: 85%;
  flex-shrink: 0;
  scroll-snap-align: center;
  text-align: left;

  @media (min-width: 768px) {
    flex-basis: auto;
    flex-shrink: 1;
    scroll-snap-align: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background-color: rgb(245 245 244);
  box-sizing: border-box;
  caret-color: transparent;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  box-sizing: border-box;
  caret-color: transparent;
  height: 100%;
  max-width: 100%;
  object-fit: cover;
  width: 100%;
`;

const ContentWrapper = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  box-sizing: border-box;
  caret-color: transparent;
  letter-spacing: -0.18px;
  line-height: 23.4px;
  margin-bottom: 0.75rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: -0.24px;
    line-height: 31.2px;
  }
`;

const DescriptionWrapper = styled.div`
  color: rgb(120 113 108);
  font-size: 15px;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 25.6px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 25.6px;
  }
`;

export const FeatureCard = (props) => {
  return (
    <CardWrapper>
      <ImageWrapper>
        <Image
          src={props.imageUrl}
          alt=""
          sizes="(min-width: 990px) 33vw, (min-width: 750px) 50vw, 100vw"
          className={props.imageClassName}
        />
      </ImageWrapper>
      <ContentWrapper>
        <Title>{props.title}</Title>
        <DescriptionWrapper>
          <Description>{props.description}</Description>
        </DescriptionWrapper>
      </ContentWrapper>
    </CardWrapper>
  );
};
