import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { ProductCard } from "@/components/ProductCard";

const SliderWrapper = styled.div`
  background-color: white;
`;

const SliderContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: 768px) {
    max-width: 1400px;
    padding: 0 80px;
  }
`;

const SliderHeader = styled.div`
  margin-bottom: 20px;
  text-align: left;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`;

const SliderTitle = styled.h2`
  font-size: 28px;
  font-weight: 300;
  line-height: 1.2;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 48px;
    line-height: 1.2;
  }
`;

const SliderTrack = styled.div`
  position: relative;
`;

const SliderButton = styled.button`
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 40px;
  width: 40px;
  border: none;
  padding: 0;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s ease;

  @media (min-width: 768px) {
    display: flex;
  }

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(SliderButton)`
  left: -20px;
  opacity: 0.9;

  @media (min-width: 768px) {
    opacity: 0.3;
  }
`;

const NextButton = styled(SliderButton)`
  right: -20px;
  opacity: 0.3;

  @media (min-width: 768px) {
    opacity: 0.9;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow: auto;
  scroll-behavior: smooth;
`;

const SliderIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const TrendingSlider = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const container = scrollContainerRef.current;
    
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const handlePrevClick = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('a').offsetWidth;
      const gap = 20;
      const scrollAmount = cardWidth + gap;
      
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleNextClick = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector('a').offsetWidth;
      const gap = 20;
      const scrollAmount = cardWidth + gap;
      
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <SliderWrapper>
      <SliderContainer>
        <SliderHeader>
          <SliderTitle>실시간 인기</SliderTitle>
        </SliderHeader>
        <SliderTrack>
          <PrevButton aria-label="Previous" onClick={handlePrevClick} disabled={!canScrollLeft}>
            <SliderIcon src="/img/icon-13.svg" alt="Icon" />
          </PrevButton>
          <ProductsContainer ref={scrollContainerRef}>
            <ProductCard
              href="/products/mens-tree-runners"
              imageUrl="/img/17.png"
              imageAlt="남성 트리 러너 - 제트 블랙 (블랙)"
              rank="1"
              productName="남성 트리 러너"
              productColor="제트 블랙 (블랙)"
              currentPrice="₩78,000"
              originalPrice="₩150,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["260", "270", "280"]}
              hiddenSizes={["290", "300"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/mens-wool-dasher-2-mizzle-stony-cream-ntrl-white"
              imageUrl="/img/21.png"
              imageAlt="남성 울 대셔 미즐 - 스토니 크림 (내추럴 화이트)"
              rank="2"
              productName="남성 울 대셔 미즐"
              productColor="스토니 크림 (내추럴 화이트)"
              currentPrice="₩98,000"
              originalPrice="₩200,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["260", "265", "270"]}
              hiddenSizes={["275", "280"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/womens-wool-dasher-2-mizzle-stony-cream-ntrl-white"
              imageUrl="/img/20.png"
              imageAlt="여성 울 대셔 미즐 - 스토니 크림 (내추럴 화이트)"
              rank="3"
              productName="여성 울 대셔 미즐"
              productColor="스토니 크림 (내추럴 화이트)"
              currentPrice="₩98,000"
              originalPrice="₩200,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["245"]}
              hiddenSizes={[]}
              showMoreIndicator={false}
            />
            <ProductCard
              href="/products/womens-wool-runner-go-fluff"
              imageUrl="/img/19.png"
              imageAlt="여성 울 러너 고 플러프 - 내추럴 화이트(내추럴 화이트)"
              rank="4"
              productName="여성 울 러너 고 플러프"
              productColor="내추럴 화이트(내추럴 화이트)"
              currentPrice="₩78,000"
              originalPrice="₩180,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["235", "240", "245"]}
              hiddenSizes={["250", "255"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/mens-canvas-piper-new-natural-black"
              imageUrl="/img/29.png"
              imageAlt="남성 캔버스 파이퍼 - 뉴 내추럴 블랙 (내추럴 블랙)"
              rank="5"
              productName="남성 캔버스 파이퍼"
              productColor="뉴 내추럴 블랙 (내추럴 블랙)"
              currentPrice="₩78,000"
              originalPrice="₩150,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["265", "270", "275"]}
              hiddenSizes={["285"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/mens-wool-runner-nz-natural-black"
              imageUrl="/img/18.png"
              imageAlt="남성 울 러너 NZ - 내추럴 블랙 (내추럴 블랙)"
              rank="6"
              productName="남성 울 러너 NZ"
              productColor="내추럴 블랙 (내추럴 블랙)"
              currentPrice="₩119,000"
              originalPrice="₩170,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["260", "265", "270"]}
              hiddenSizes={["275", "280"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/womens-wool-runners-natural-white"
              imageUrl="/img/1.webp"
              imageAlt="여성 울 러너 - 내추럴 화이트 (크림)"
              rank="7"
              productName="여성 울 러너"
              productColor="내추럴 화이트 (크림)"
              currentPrice="₩78,000"
              originalPrice="₩150,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["230", "240", "250"]}
              hiddenSizes={["260"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/mens-wool-runners-true-black"
              imageUrl="/img/2.webp"
              imageAlt="남성 울 러너 - 트루 블랙 (크림)"
              rank="8"
              productName="남성 울 러너"
              productColor="트루 블랙 (크림)"
              currentPrice="₩78,000"
              originalPrice="₩150,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["260", "270"]}
              hiddenSizes={[]}
              showMoreIndicator={false}
            />
            <ProductCard
              href="/products/womens-tree-runners-jet-black-black"
              imageUrl="/img/7.webp"
              imageAlt="여성 트리 러너 - 제트 블랙 (블랙)"
              rank="9"
              productName="여성 트리 러너"
              productColor="제트 블랙 (블랙)"
              currentPrice="₩78,000"
              originalPrice="₩150,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["230", "240", "250"]}
              hiddenSizes={["260"]}
              showMoreIndicator={true}
            />
            <ProductCard
              href="/products/mens-wool-runner-2"
              imageUrl="/img/8.webp"
              imageAlt="남성 울 러너 고 - 다크 그레이 (라이트 그레이)"
              rank="10"
              productName="남성 울 러너 고"
              productColor="다크 그레이 (라이트 그레이)"
              currentPrice="₩98,000"
              originalPrice="₩170,000"
              iconUrl="/img/icon-14.svg"
              availableSizesLabel="주문 가능 사이즈"
              sizes={["250", "260", "270"]}
              hiddenSizes={["280", "290"]}
              showMoreIndicator={true}
            />
          </ProductsContainer>
          <NextButton aria-label="Next" onClick={handleNextClick} disabled={!canScrollRight}>
            <SliderIcon src="/img/icon-15.svg" alt="Icon" />
          </NextButton>
        </SliderTrack>
      </SliderContainer>
    </SliderWrapper>
  );
};
