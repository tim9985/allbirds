import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/api/productApi";
import { getProductReviews } from "@/api/reviewAPI";
import { useCart } from "@/context/CartContext";

const PageWrapper = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 5rem;
  font-size: 0.875rem;
  color: #666;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`;

const BreadcrumbLink = styled.a`
  color: #666;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  
  @media (min-width: 990px) {
    flex-direction: row;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const LeftSection = styled.div`
  flex: 0 0 738px;
  max-width: 738px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 990px) {
    flex: 1;
    max-width: 100%;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  order: 0;
  
  @media (max-width: 990px) {
    margin: 0 -1.25rem 1rem;
    order: 0;
  }
`;

const MainImage = styled.img`
  width: 100%;
  object-fit: cover;
  background: #f5f5f5;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
  background: #F5F5F5;
  padding: 2.5rem 3rem;
  
  @media (max-width: 990px) {
    padding: 1.5rem 1.25rem;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ProductTitle = styled.h1`
  font-size: 3rem;
  font-weight: 400;
  line-height: normal;
  color: #212121;
  
  @media (max-width: 990px) {
    font-size: 1.25rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DiscountBadge = styled.span`
  font-size: 1.375rem;
  font-weight: 700;
  color: #ad1f00;
`;

const Price = styled.span`
  font-size: 1.375rem;
  font-weight: 700;
  color: #212121;
`;

const OriginalPrice = styled.span`
  font-size: 1.375rem;
  font-weight: 400;
  color: #666;
  text-decoration: line-through;
`;

const ProductDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #212121;
  margin-top: -1rem;
`;

const ColorSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 0.75rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.$active ? '#000' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#000'};
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#000' : 'transparent'};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$active ? '#000' : '#f5f5f5'};
  }
`;

const SelectorLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: #212121;
  text-transform: uppercase;
`;

const ColorName = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.4375rem;
  flex-wrap: wrap;
`;

const ColorOption = styled.button`
  width: 78px;
  height: 78px;
  border: 2px solid ${props => props.$selected ? '#212121' : 'transparent'};
  background: transparent;
  cursor: pointer;
  transition: border 0.2s;
  padding: 0;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    border-color: #212121;
  }
`;

const SizeSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SizeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 62px);
  gap: 0.25rem;
  
  @media (max-width: 767px) {
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
  }
`;

const SizeOption = styled.button`
  width: 62px;
  height: 36px;
  border: 1px solid ${props => props.$selected ? '#212121' : '#212121'};
  background: ${props => props.$selected ? '#212121' : 'white'};
  color: ${props => props.$selected ? 'white' : '#212121'};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 400;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$selected ? '#212121' : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const AddToCartButton = styled.button`
  width: 100%;
  background: #212121;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 48px;
  
  &:hover {
    background: #000;
  }
  
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const NaverPayButton = styled.button`
  width: 100%;
  height: 48px;
  background: #03c75a;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #02b350;
  }
  
  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
`;

const DetailsSection = styled.div`
  width: 100%;
  padding: 0;
  background: #ffffff;
  margin-top: 3rem;
  order: 2;
  
  @media (max-width: 990px) {
    padding: 0 1.25rem;
    margin-top: 2rem;
    order: 2;
  }
`;

const DetailsAccordion = styled.details`
  border-top: 2px solid #d1d5db;
  padding: 1.5rem 0;
  
  &:first-child {
    border-top: none;
  }
  
  &[open] summary svg:first-child {
    display: none;
  }
  
  &:not([open]) summary svg:last-child {
    display: none;
  }
`;

const AccordionTitle = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  list-style: none;
  font-size: 0.75rem;
  font-weight: 700;
  color: #000;
  
  &::-webkit-details-marker {
    display: none;
  }
  
  span {
    display: flex;
  }
`;

const AccordionContent = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #000;
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
`;

const ReviewsSection = styled.div`
  max-width: 1440px;
  margin: 4rem auto;
  padding: 0 5rem;
  
  @media (max-width: 990px) {
    padding: 0 1.25rem;
    margin: 2rem auto;
  }
`;

const ReviewsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(24, 24, 24, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const RatingSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const RatingScore = styled.div`
  font-size: 3rem;
  font-weight: 400;
  color: rgb(24, 24, 24);
  line-height: 1;
`;

const RatingDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
  font-size: 1.2rem;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ReviewCount = styled.div`
  font-size: 0.875rem;
  color: rgb(24, 24, 24);
  font-family: 'Pretendard';
  font-weight: 400;
`;

const ReviewCard = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(24, 24, 24, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ReviewerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ReviewerName = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  color: rgb(24, 24, 24);
  font-family: 'Pretendard';
`;

const ReviewDate = styled.span`
  font-size: 0.75rem;
  color: rgb(24, 24, 24);
  opacity: 0.6;
`;

const ReviewRatingTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 2px;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const ReviewTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(24, 24, 24);
  margin: 0;
`;

const ReviewText = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgb(24, 24, 24);
  margin: 0;
  white-space: pre-wrap;
`;

const EmptyReviews = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-size: 0.875rem;
`;

const StarIcon = ({ filled }) => (
  <svg 
    width="18" 
    height="18" 
    viewBox="0 0 33 33" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'scale(1.2, 1.2)' }}
  >
    <defs>
      <linearGradient id={`star_gradient_${Math.random()}`}>
        <stop offset={filled ? "100%" : "0%"} stopColor="rgba(252,192,7,1)" />
        <stop offset={filled ? "100%" : "0%"} stopColor="#FFFFFF" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path 
      d="M17.0919 25.4549L16.8335 25.299L16.5751 25.4549L7.39263 30.9971L9.82942 20.5516L9.89798 20.2577L9.66988 20.0601L1.55658 13.0315L12.2393 12.1252L12.5397 12.0997L12.6574 11.8221L16.8335 1.9688L21.0096 11.8221L21.1273 12.0997L21.4277 12.1252L32.1104 13.0315L23.9971 20.0601L23.769 20.2577L23.8376 20.5516L26.2744 30.9971L17.0919 25.4549Z" 
      stroke="rgba(252,192,7,1)" 
      fill={filled ? "rgba(252,192,7,1)" : "#FFFFFF"}
    />
  </svg>
);

export const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('features');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('제품 ID로 데이터 요청:', productId);
        const data = await getProductById(productId);
        console.log('받은 제품 데이터:', data);
        setProduct(data);
      } catch (err) {
        console.error('제품 로딩 실패:', err);
        console.error('에러 상세:', err.response?.data || err.message);
        if (err.response?.status === 404) {
          setError(`제품을 찾을 수 없습니다. (ID: ${productId})`);
        } else if (err.code === 'ERR_NETWORK') {
          setError('백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
        } else {
          setError(`제품을 불러오는데 실패했습니다: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getProductReviews(productId);
        setReviews(data.reviews || []);
        setAvgRating(data.avgRating || 0);
        setReviewCount(data.totalCount || 0);
      } catch (err) {
        console.error('리뷰 로딩 실패:', err);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>로딩 중...</div>
      </PageContainer>
    );
  }

  if (error || !product) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ color: 'red', fontSize: '1.2rem', marginBottom: '1rem' }}>
            {error || '제품을 찾을 수 없습니다.'}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            요청한 제품 ID: {productId}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <a href="/collections/mens-off" style={{ color: '#007bff', textDecoration: 'underline' }}>
              상품 목록으로 돌아가기
            </a>
          </div>
        </div>
      </PageContainer>
    );
  }

  // 이미지 데이터
  const productImages = product.images || [];
  const thumbnailImage = productImages.find(img => img.isThumbnail);
  const mainImage = productImages[selectedColor] || thumbnailImage || productImages[0];

  // 가격 계산
  const discountedPrice = product.originalPrice * (1 - product.discountRate);

  // 사이즈 데이터
  const allSizes = [250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320];
  const availableSizes = product.sizes || [];
  
  // 재고 데이터 (사이즈별 재고)
  const stockMap = product.stock || {};
  
  // 사이즈별 재고 확인 함수
  const getStock = (size) => {
    return stockMap[String(size)] ?? 0;
  };
  
  // 사이즈가 구매 가능한지 (재고 > 0)
  const isSizeAvailable = (size) => {
    return availableSizes.includes(size) && getStock(size) > 0;
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    // 선택한 사이즈의 재고 확인
    const currentStock = getStock(selectedSize);
    if (currentStock <= 0) {
      alert('선택하신 사이즈는 품절입니다.');
      return;
    }

    const productImages = product.images || [];
    const mainImage = productImages[selectedColor] || productImages[0];

    addToCart({
      _id: product._id,
      name: product.name,
      originalPrice: product.originalPrice,
      discountRate: product.discountRate,
      selectedSize: selectedSize,
      imageUrl: mainImage?.url || '/img/default-product.png',
      stock: currentStock, // 현재 재고 정보 전달
    });
  };

  return (
    <PageWrapper>
      <PageContainer>
        <Breadcrumb>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbLink href="/collections/mens-off">남성</BreadcrumbLink>
          <span>/</span>
          <span>{product.name}</span>
        </Breadcrumb>

      <ProductContainer>
        <LeftSection>
          <ImageSection>
            <MainImage src={mainImage?.url || '/img/default-product.png'} alt={product.name} />
          </ImageSection>

          <DetailsSection>
            <DetailsAccordion>
              <AccordionTitle>
                상세 정보
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </AccordionTitle>
              <AccordionContent>
                    <ul>
                      <li>Piper 라인 중에 더 내구성이 뛰어난 Wool Piper Woven은 올버즈만의 부드러움과 포근함을 선사하면서 어떤 스타일에도 어울립니다.</li>
                      <li><strong>용도:</strong> 데일리, 사계절</li>
                      <li><strong>내구성이 뛰어난 울 소재:</strong> 시간이 지나도 보풀과 늘어남에 강한 우븐 ZQ 메리노 울 혼방 소재</li>
                      <li><strong>다용도 디자인:</strong> 어디에나 어울리는 클래식 스타일, 여행에도 맞춤 디자인</li>
                      <li><strong>제조국:</strong> 베트남.</li>
                      <li><strong>소재</strong></li>
                      <li><strong>어퍼:</strong> 51% ZQ 인증 메리노 울, 49% 재활용 폴리에스터</li>
                      <li><strong>미드솔:</strong> SweetFoam®</li>
                      <li><strong>아웃솔:</strong> 천연고무</li>
                  <li><strong>레이스:</strong> 재활용 폴리에스터</li>
                </ul>
              </AccordionContent>
            </DetailsAccordion>

            <DetailsAccordion>
              <AccordionTitle>
                지속 가능성
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </AccordionTitle>
              <AccordionContent>
                    <ul>
                      <li>Wool Piper Woven의 탄소 발자국은 10.46 kg CO2e입니다.</li>
                      <li>이러한 노력을 통해 올버즈는 Climate Neutral에서 탄소 중립 기업 인증을 획득했으며, 탄소 저감 프로젝트 펀딩을 비롯한 지속 가능한 활동을 통해 탄소 중립을 실현합니다.</li>
                      <li><strong>지속 가능한 소재:</strong></li>
                      <li>ZQ 인증 메리노 울 어퍼</li>
                      <li>사탕수수 기반의 그린 EVA를 사용한 SweetFoam® 미드솔</li>
                      <li>천연고무로 만든 사이드월과 아웃솔</li>
                      <li>플라스틱 페트병을 재활용한 신발 끈</li>
                  <li>캐스터 빈 인솔</li>
                </ul>
              </AccordionContent>
            </DetailsAccordion>

            <DetailsAccordion>
              <AccordionTitle>
                세탁 방법 및 취급시 주의사항
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </AccordionTitle>
              <AccordionContent>
                    <ul>
                      <li>신발 끈을 신발에서 분리해주세요.</li>
                      <li>깔창을 신발에서 분리하여 신발과 같이 세탁망(베개 커버도 가능)에 넣어주세요.</li>
                      <li>세탁기 사용 시 찬물/울 코스로 중성세제를 적당량 첨가하여 세탁해 주시기 바랍니다.</li>
                      <li>세탁 후에 남은 물기는 털어주시고 자연 건조해 주세요.</li>
                      <li>1-2회 착용 후 원래 모양으로 곧 돌아오니 걱정하지 않으셔도 됩니다.</li>
                      <li>더 새로운 경험을 원하시면 새로운 인솔과 신발 끈으로 교체하세요.</li>
                  <li><strong>팁: 건조기 사용은 피해주세요. 세탁 후에 원래 모양으로 곧 돌아오니 걱정 마세요. 신발 끈과 인솔은 손세탁 하셔도 됩니다.</strong></li>
                </ul>
              </AccordionContent>
            </DetailsAccordion>

            <DetailsAccordion>
              <AccordionTitle>
                배송 & 반품
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </AccordionTitle>
              <AccordionContent>
                    <p>전제품 5만원 이상 구입 시 무료 배송</p>
                    <ul>
                      <li>올멤버스: 조건 없는 무료 배송 & 30일 내 무료 교환/환불 (단, 세일 제품은 7일 내 미착용 시 교환/환불)</li>
                      <li>비회원: 7일 내 미착용 시 교환/환불</li>
                      <li>반품: 물류센터에 반송품이 도착한 뒤 5 영업일 내 검수 후 환불</li>
                  <li>교환: 동일 가격의 상품으로만 교환 가능, 맞교환 불가, 물류센터에 반송품이 도착한 뒤 새로운 교환 상품 발송 (교환 일정 7~10 영업일 소요)</li>
                </ul>
              </AccordionContent>
            </DetailsAccordion>
          </DetailsSection>
        </LeftSection>

        <InfoSection>
          <ProductHeader>
            <ProductTitle>{product.name}</ProductTitle>
            <PriceContainer>
              {product.discountRate > 0 && (
                <DiscountBadge>{Math.round(product.discountRate * 100)}%</DiscountBadge>
              )}
              <Price>₩{Math.round(discountedPrice).toLocaleString()}</Price>
              {product.discountRate > 0 && (
                <OriginalPrice>₩{product.originalPrice.toLocaleString()}</OriginalPrice>
              )}
            </PriceContainer>
          </ProductHeader>

          <ProductDescription>
            {product.description || '편안하고 스타일리시한 올버즈 제품을 경험해보세요.'}
          </ProductDescription>

          <ColorSelector>
            <TabsContainer>
              <TabButton $active={activeTab === 'all'} onClick={() => setActiveTab('all')}>전체</TabButton>
              <TabButton $active={activeTab === 'sale'} onClick={() => setActiveTab('sale')}>세일</TabButton>
            </TabsContainer>
            {productImages.length > 1 && (
              <>
                <SelectorLabel>
                  <span>색상</span>
                  <ColorName>{productImages[selectedColor]?.alt || '색상'}</ColorName>
                </SelectorLabel>
                <ColorOptions>
                  {productImages.slice(0, 3).map((image, index) => (
                    <ColorOption
                      key={index}
                      $selected={selectedColor === index}
                      onClick={() => setSelectedColor(index)}
                      title={image.alt}
                    >
                      <img src={image.url} alt={image.alt} />
                    </ColorOption>
                  ))}
                </ColorOptions>
              </>
            )}
          </ColorSelector>

          <SizeSelector>
            <SelectorLabel>
              <span>사이즈</span>
            </SelectorLabel>
            <SizeOptions>
              {allSizes.map((size) => {
                const stock = getStock(size);
                const isAvailable = isSizeAvailable(size);
                return (
                  <SizeOption
                    key={size}
                    $selected={selectedSize === size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    title={isAvailable ? `재고: ${stock}개` : '품절'}
                  >
                    {size}
                  </SizeOption>
                );
              })}
            </SizeOptions>
          </SizeSelector>

          <ButtonContainer>
            <AddToCartButton disabled={!selectedSize} onClick={handleAddToCart}>
              {selectedSize ? (
                <>
                  장바구니 담기 • ₩{Math.round(discountedPrice).toLocaleString()} {product.discountRate > 0 && `${Math.round(product.discountRate * 100)}% OFF`}
                </>
              ) : (
                '사이즈 선택'
              )}
            </AddToCartButton>
            <NaverPayButton disabled={!selectedSize}>
              {selectedSize ? '네이버페이로 구매' : '사이즈 선택'}
            </NaverPayButton>
          </ButtonContainer>

          <ProductDescription style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
            <strong>오프라인 매장 재고 확인</strong><br />
            주변 매장 재고 여부를 확인해 보세요<br />
            <a href="#" style={{ textDecoration: 'underline' }}>매장 찾기</a>
          </ProductDescription>
        </InfoSection>
      </ProductContainer>

      <ReviewsSection>
        <ReviewsHeader>
          <RatingSection>
            <RatingScore>{avgRating > 0 ? avgRating.toFixed(1) : '0.0'}</RatingScore>
            <RatingDetails>
              <Stars>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= Math.round(avgRating)} />
                ))}
              </Stars>
              <ReviewCount>{reviewCount}건의 리뷰 분석 결과입니다.</ReviewCount>
            </RatingDetails>
          </RatingSection>
        </ReviewsHeader>

        {reviews.length === 0 ? (
          <EmptyReviews>
            아직 작성된 리뷰가 없습니다.
          </EmptyReviews>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id}>
              <ReviewHeader>
                <ReviewerInfo>
                  <ReviewerName>{review.displayName}</ReviewerName>
                </ReviewerInfo>
                <ReviewDate>게시일 {new Date(review.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '-').replace('.', '')}</ReviewDate>
              </ReviewHeader>
              <ReviewRatingTitle>
                <ReviewRating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} filled={star <= review.rating} />
                  ))}
                </ReviewRating>
                <ReviewTitle>리뷰</ReviewTitle>
              </ReviewRatingTitle>
              <ReviewText>{review.content}</ReviewText>
            </ReviewCard>
          ))
        )}
      </ReviewsSection>
      </PageContainer>
    </PageWrapper>
  );
};
