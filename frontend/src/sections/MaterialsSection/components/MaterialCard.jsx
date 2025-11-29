import styled from "styled-components";

const CardWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  caret-color: transparent;
  flex-shrink: 0;
  width: 261.719px;
  padding: 0 0.625rem 1.25rem 0;

  @media (min-width: 768px) {
    width: 413.333px;
    padding: 1.25rem 0.625rem 1.25rem 0.625rem;
  }
`;

const ImageLink = styled.a`
  position: relative;
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  overflow: hidden;
  border-radius: 5px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  box-sizing: border-box;
  caret-color: transparent;
  z-index: 10;
  inset: 0;
`;

const Image = styled.img`
  aspect-ratio: auto 1110 / 1110;
  box-sizing: border-box;
  caret-color: transparent;
  height: 100%;
  max-width: 100%;
  width: 100%;
  border-radius: 5px;

  @media (min-width: 768px) {
    height: auto;
    width: 1110px;
  }
`;

const ContentWrapper = styled.div`
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  padding: 1.5rem 1.25rem;
  border-radius: 0 0 5px 5px;

  @media (min-width: 768px) {
    height: 210px;
  }
`;

const TextLink = styled.a`
  position: relative;
  background-color: white;
  box-sizing: border-box;
  caret-color: transparent;
  display: block;
  overflow: hidden;
  border-radius: 5px;
`;

const TextContent = styled.div`
  box-sizing: border-box;
  caret-color: transparent;
  padding-left: 0;
  padding-top: 34px;
  padding-bottom: 1.75rem;

  @media (min-width: 768px) {
    padding-left: 0.625rem;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 14px;
  margin-bottom: 0.625rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

const Description = styled.div`
  font-size: 22px;
  font-weight: 300;
  box-sizing: border-box;
  caret-color: transparent;
  line-height: 25.3px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
`;

const CTAButton = styled.a`
  font-size: 0.75rem;
  align-items: center;
  box-sizing: border-box;
  caret-color: transparent;
  display: flex;
  height: 42px;
  justify-content: center;
  letter-spacing: 2px;
  line-height: 0.75rem;
  max-width: 229px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 100%;
  border: 1px solid rgb(38 38 38);
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 0.125rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    height: 52px;
    line-height: 1rem;
    max-width: 346px;
  }

  &:hover {
    color: white;
    background-color: rgb(38 38 38);
  }
`;

export const MaterialCard = (props) => {
  return (
    <CardWrapper>
      <ImageLink href={props.href}>
        <ImageOverlay />
        <Image src={props.imageUrl} sizes={props.imageSizes} />
      </ImageLink>
      <ContentWrapper>
        <TextLink href={props.href}>
          <TextContent>
            <Title>{props.title}</Title>
            <Description>{props.description}</Description>
          </TextContent>
        </TextLink>
        <CTAButton href={props.href}>{props.linkText}</CTAButton>
      </ContentWrapper>
    </CardWrapper>
  );
};
