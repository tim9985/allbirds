import styled from 'styled-components';

const CardWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    z-index: 10;

    .sizes-container {
      display: grid;
    }
  }
`;

const CardLink = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  position: relative;
  border: 1px solid transparent;
  transition: border-color 0.3s ease;

  ${CardWrapper}:hover & {
    border-color: white;
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

const DiscountBadge = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: white;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #dc2626;
  border-radius: 2px;
  z-index: 2;
`;

const ProductInfo = styled.div`
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
`;

const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  box-sizing: border-box;
  line-height: 1.4;
  margin: 0;
  color: #212121;
`;

const ProductCategory = styled.p`
  color: #78716c;
  font-size: 12px;
  font-weight: 400;
  box-sizing: border-box;
  line-height: 1.4;
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  gap: 8px;
  margin-top: 4px;
`;

const DiscountRate = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #dc2626;
  box-sizing: border-box;
`;

const CurrentPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
  color: #212121;
`;

const OriginalPrice = styled.span`
  color: #78716c;
  font-size: 12px;
  box-sizing: border-box;
  text-decoration: line-through;
`;

const SizesContainer = styled.div`
  display: none;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-top: 12px;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e5e5e5;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  z-index: 5;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const SizeButton = styled.button`
  border: 1px solid ${props => props.$available ? '#212121' : '#e5e5e5'};
  background-color: ${props => props.$available ? 'white' : '#f5f5f5'};
  color: ${props => props.$available ? '#212121' : '#ccc'};
  padding: 8px 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: ${props => props.$available ? 'pointer' : 'not-allowed'};
  border-radius: 2px;
  text-align: center;
  transition: all 0.2s;
  font-family: var(--font-body-family, 'Pretendard', sans-serif);

  &:hover {
    ${props => props.$available && `
      background-color: #212121;
      color: white;
    `}
  }
`;

export const CollectionProductCard = (props) => {
  const allSizes = [250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320];
  
  return (
    <CardWrapper>
      <CardLink href={props.href}>
        <ImageContainer>
          <ProductImage
            src={props.imageUrl}
            alt={props.productName}
            loading="lazy"
          />
          {props.discountRate > 0 && (
            <DiscountBadge>-{Math.round(props.discountRate * 100)}%</DiscountBadge>
          )}
        </ImageContainer>
        <ProductInfo>
          <ProductName>{props.productName}</ProductName>
          <ProductCategory>{props.productCategory}</ProductCategory>
          <PriceContainer>
            {props.discountRate > 0 && (
              <DiscountRate>{Math.round(props.discountRate * 100)}%</DiscountRate>
            )}
            <CurrentPrice>{props.currentPrice}</CurrentPrice>
            {props.originalPrice && props.discountRate > 0 && (
              <OriginalPrice>{props.originalPrice}</OriginalPrice>
            )}
          </PriceContainer>
        </ProductInfo>
      </CardLink>
      <SizesContainer className="sizes-container">
        {allSizes.map((size) => {
          const isAvailable = props.sizes && props.sizes.includes(size);
          return (
            <SizeButton
              key={size}
              $available={isAvailable}
              disabled={!isAvailable}
              type="button"
            >
              {size}
            </SizeButton>
          );
        })}
      </SizesContainer>
    </CardWrapper>
  );
};
