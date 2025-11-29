import styled from 'styled-components';

const CardLink = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-basis: calc(50% - 10px);
  min-width: calc(50% - 10px);
  scroll-snap-align: start;

  @media (min-width: 768px) {
    flex-basis: calc(20% - 16px);
    min-width: calc(20% - 16px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  background-color: #e5e7eb;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
`;

const ProductImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  left: 0;
  top: 0;
`;

const RankBadge = styled.div`
  position: absolute;
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #262626;
  box-sizing: border-box;
  height: 40px;
  min-width: 40px;
  z-index: 2;
  padding: 8px;
  border-radius: 4px;
  left: 10px;
  top: 10px;
`;

const ProductInfo = styled.div`
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
`;

const ProductTitle = styled.h3`
  font-size: 26px;
  font-weight: bold;
  box-sizing: border-box;
  line-height: 33.8px;
`;

const ProductName = styled.span`
  font-size: 14px;
  font-weight: 500;
  box-sizing: border-box;
  display: block;
  line-height: 18.2px;
`;

const ProductColor = styled.span`
  color: #78716c;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  display: block;
  line-height: 15.6px;
  margin-top: 2px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
`;

const CurrentPrice = styled.span`
  font-size: 12px;
  box-sizing: border-box;
  display: block;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const OriginalPrice = styled.span`
  color: #78716c;
  font-size: 12px;
  box-sizing: border-box;
  display: block;
  opacity: 0.7;
  text-decoration: line-through;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const SizesContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 4px;
  margin-top: 4px;
`;

const SizesLabel = styled.div`
  color: #78716c;
  font-size: 11px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 4px;
  margin-bottom: 4px;
`;

const SizeIcon = styled.img`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 11px;
  width: 11px;
`;

const SizesLabelText = styled.span`
  box-sizing: border-box;
  display: block;
`;

const SizesList = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 4px;
  flex-wrap: wrap;
`;

const SizeBadge = styled.span`
  font-size: 11px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  display: block;
  white-space: nowrap;
  padding: 2px 6px;
  border-radius: 2px;
`;

const HiddenSizeBadge = styled.span`
  font-size: 11px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  display: none;
  min-height: 0;
  min-width: 0;
  white-space: nowrap;
  padding: 2px 6px;
  border-radius: 2px;

  @media (min-width: 768px) {
    display: block;
    min-height: auto;
    min-width: auto;
  }
`;

export const ProductCard = (props) => {
  return (
    <CardLink href={props.href}>
      <ImageContainer>
        <ProductImage
          src={props.imageUrl}
          alt={props.productName}
          loading="lazy"
        />
        <RankBadge>
          {props.rank}
        </RankBadge>
      </ImageContainer>
      <ProductInfo>
        <ProductTitle>
          <ProductName>
            {props.productName}
          </ProductName>
          <ProductColor>
            {props.productColor}
          </ProductColor>
        </ProductTitle>
        <PriceContainer>
          <CurrentPrice>
            {props.currentPrice}
          </CurrentPrice>
          <OriginalPrice>
            {props.originalPrice}
          </OriginalPrice>
        </PriceContainer>
        <SizesContainer>
          <SizesLabel>
            <SizeIcon
              src={props.iconUrl}
              alt="Icon"
            />
            <SizesLabelText>
              {props.availableSizesLabel}
            </SizesLabelText>
          </SizesLabel>
          <SizesList>
            {props.sizes.map((size, index) => (
              <SizeBadge key={index}>
                {size}
              </SizeBadge>
            ))}
            {props.hiddenSizes &&
              props.hiddenSizes.map((size, index) => (
                <HiddenSizeBadge key={`hidden-${index}`}>
                  {size}
                </HiddenSizeBadge>
              ))}
          </SizesList>
        </SizesContainer>
      </ProductInfo>
    </CardLink>
  );
};
