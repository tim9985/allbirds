import styled from "styled-components";
import { useState, useEffect } from "react";
import { CollectionProductCard } from "@/components/CollectionProductCard";
import { getProducts } from "@/api/productApi";

const PageWrapper = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (min-width: 768px) {
    padding: 0 80px;
  }
`;

const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 0;
  font-size: 0.875rem;
  color: #666;
`;

const BreadcrumbLink = styled.a`
  color: #666;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbCurrent = styled.span`
  color: #333;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e5e5;
`;

const FilterButton = styled.button`
  background: ${props => props.$active ? '#000' : 'transparent'};
  color: ${props => props.$active ? '#fff' : '#000'};
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  border-bottom: 2px solid ${props => props.$active ? '#000' : 'transparent'};
  
  &:hover {
    background: ${props => props.$active ? '#000' : '#f5f5f5'};
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  max-width: 800px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 990px) {
    /* Show left filter column by default on desktop */
    grid-template-columns: 240px 1fr;
    transition: all 0.3s;
  }

  &.filter-open {
    @media (min-width: 990px) {
      grid-template-columns: 240px 1fr;
    }
  }
`;

const FilterToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #212121;
  background: #fcc006;
  color: #212121;
  padding: 0.782rem 1rem;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;

  &:hover {
    background: #e0ab00;
  }

  svg {
    width: 18px;
    height: 14px;
  }

  @media (min-width: 990px) {
    display: none;
  }
`;

const FilterSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  z-index: 1048;
  transform: translateY(${props => props.$isOpen ? '0' : '120vh'});
  transition: transform 0.3s;
  overflow-y: scroll;

  @media (min-width: 990px) {
    /* Desktop: make sidebar part of layout and always visible */
    position: static;
    transform: none;
    height: auto;
    overflow-y: visible;
    opacity: 1;
    transition: none;
    margin-top: 65px;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: #000;
  color: #fff;

  @media (min-width: 990px) {
    display: none;
  }
`;

const FilterTitle = styled.div`
  font-size: 0.875rem;
  letter-spacing: 0.03125rem;
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 50%;
  background: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 300;
  padding-bottom: 4px;
`;

const FilterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0 !important;
  padding: 1.5rem 1.25rem;

  @media (min-width: 990px) {
    padding: 0;
  }

  & > :not(:first-child) {
    margin-top: 2rem;
    border-top: 1px solid #e5e5e5;
    padding-top: 2rem;
  }
`;

const FilterGroup = styled.details`
  margin-right: 1.5rem;

  &[open] summary svg:first-child {
    display: none;
  }

  &[open] summary svg:last-child {
    display: block;
  }

  summary svg:last-child {
    display: none;
  }

  @media (min-width: 990px) {
    margin-right: 0;
    
    summary svg {
      display: none !important;
    }
  }
`;

const FilterGroupTitle = styled.summary`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  list-style: none;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  gap: 0.5rem;

  &::-webkit-details-marker {
    display: none;
  }

  @media (min-width: 990px) {
    pointer-events: none;
    cursor: default;
  }

  span:first-child {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.25rem;
    
    @media (min-width: 1024px) {
      gap: 1rem;
    }
  }
`;

const FilterOptions = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FilterOption = styled.li`
  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  label {
    display: block;
    cursor: pointer;
    border: 1px solid #212121;
    border-radius: 0.125rem;
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    text-align: center;
    min-width: 3.125rem;
    letter-spacing: 0.03125rem;
    transition: all 0.2s;

    @media (min-width: 990px) {
      padding: 1rem;
      
      &:hover {
        background: #f5f5f5;
      }
    }
  }

  input:checked + label {
    background: #212121;
    color: #fff;
  }

  input:focus-visible + label {
    outline: 1px solid #fcc006;
    outline-offset: 1px;
  }
`;

const FilterMaterialOptions = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem !important;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const FilterMaterialOption = styled.li`
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem 0;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin: 0;
  }

  input:checked + div {
    font-weight: 700;
  }
`;

const FilterActions = styled.div`
  position: sticky;
  bottom: 2.25rem;
  background: white;
  border: 0 solid #e5e5e5;
  border-top-width: 1px;
  padding: 1.5rem;
  margin: 0 -1.25rem -1.5rem;

  @media (min-width: 990px) {
    display: none;
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  background: #212121;
  color: #fff;
  border: none;
  padding: 0.688rem 2rem;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s;
  font-family: var(--font-body-family, 'Pretendard', sans-serif);

  &:hover {
    background: #000;
  }
`;

const MainContent = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const FilterTopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;

  @media (min-width: 990px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CollectionPath = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 990px) {
    padding-bottom: 0;
  }
`;

const PathItemActive = styled.a`
  font-size: 0.875rem;
  color: #212121;
  font-weight: 400;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #212121;
  border-radius: 4px;
  padding: 8px 16px;
  white-space: nowrap;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    width: 11px;
    height: 11px;
  }
`;

const PathChildren = styled.span`
  display: inline-flex;
  gap: 2.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const AppliedFiltersSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e5e5;
`;

const AppliedFiltersTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppliedFiltersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #666;
  font-size: 1.2rem;
  line-height: 1;
  
  &:hover {
    color: #000;
  }
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  color: #212121;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
  margin-left: 1rem;
  
  &:hover {
    text-decoration: none;
  }
`;

const PathChildLink = styled.a`
  font-size: 0.875rem;
  color: #212121;
  text-decoration: none;
  font-weight: 400;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

const FilterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ProductCount = styled.div`
  font-size: 0.875rem;
  color: #212121;
`;

const SortDropdown = styled.details`
  position: relative;

  &[open] summary svg {
    transform: rotate(180deg);
  }
`;

const SortButton = styled.summary`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  list-style: none;
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }

  svg {
    width: 44px;
    height: 44px;
    transition: transform 0.2s;
  }
`;

const SortMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.75rem;
  background: white;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 10;
`;

const SortOption = styled.label`
  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  input:checked + span {
    font-weight: 700;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
  position: relative;
  padding: 2rem 0;
  min-height: 60vh;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const ProductGridHeader = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const MensCollection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('recommend');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sizes = ['250', '255', '260', '265', '270', '275', '280', '285', '290', '295', '300', '305', '310', '315', '320'];
  const materials = [
    { id: 'tree', label: '가볍고 시원한 tree' },
    { id: 'wool', label: '부드럽고 따뜻한 wool' },
    { id: '면', label: '면' },
    { id: '캔버스', label: '캔버스' },
    { id: '플라스틱 제로 식물성 가죽', label: '플라스틱 제로 식물성 가죽' }
  ];
  const categories = [
    { id: '라이프스타일', label: '라이프스타일' },
    { id: '슬립온', label: '슬립온' },
    { id: '신제품', label: '신제품' },
    { id: '세일', label: '세일' }
  ];

  // 상품 목록 불러오기
  useEffect(() => {
    fetchProducts();
  }, [sortBy, selectedSizes, selectedMaterials, selectedCategories]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        sort: sortBy,
      };

      // 카테고리 필터 (다중 선택 가능)
      if (selectedCategories.length > 0) {
        params.category = selectedCategories.join(',');
      }

      // 사이즈 필터 (첫 번째 선택된 사이즈만) - 숫자로 변환
      if (selectedSizes.length > 0) {
        params.size = Number(selectedSizes[0]);
      }

      const data = await getProducts(params);
      
      // 소재 필터링 (프론트엔드에서 처리)
      let filteredData = data;
      if (selectedMaterials.length > 0) {
        filteredData = data.filter(product => 
          product.materials && product.materials.some(material => 
            selectedMaterials.some(selected => material.includes(selected))
          )
        );
      }

      setProducts(filteredData);
    } catch (err) {
      console.error('상품 목록 불러오기 실패:', err);
      setError('상품을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleMaterialToggle = (materialId) => {
    setSelectedMaterials(prev =>
      prev.includes(materialId) ? prev.filter(m => m !== materialId) : [...prev, materialId]
    );
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    );
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    fetchProducts();
  };

  return (
    <PageWrapper>
      <PageContainer>
      <Breadcrumb>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <span>›</span>
        <BreadcrumbCurrent>남성 신발 세일</BreadcrumbCurrent>
      </Breadcrumb>
      
      <FilterSection>
        <FilterButton $active={true}>남성</FilterButton>
        <FilterButton $active={false}>여성</FilterButton>
      </FilterSection>
      
      <PageHeader>
        <PageTitle>남성 신발</PageTitle>
        <PageDescription>
          Wool, Tree, Sugar 등 자연 소재로 만들어 놀랍도록 편안한 올버즈 제품을 만나보세요. 우리는 편안한 신발의 기준을 만들어가고 있습니다.
        </PageDescription>
      </PageHeader>

      <FilterTopBar style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e5e5' }}>
        <CollectionPath>
          <PathItemActive 
            onClick={(e) => { e.preventDefault(); setSelectedCategories([]); }}
            style={{ cursor: 'pointer', background: selectedCategories.length === 0 ? '#f5f5f5' : 'transparent' }}
          >
            남성 할인 전체
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <line x1="9.95323" y1="0.191508" x2="0.191143" y2="9.95359" stroke="#212121" strokeWidth="0.541667"></line>
              <line y1="-0.270833" x2="13.8057" y2="-0.270833" transform="matrix(0.707107 0.707107 0.707107 -0.707107 0.488281 0)" stroke="#212121" strokeWidth="0.541667"></line>
            </svg>
          </PathItemActive>
          <PathChildren>
            <PathChildLink 
              onClick={(e) => { e.preventDefault(); handleCategoryToggle('신제품'); }}
              style={{ 
                cursor: 'pointer', 
                fontWeight: selectedCategories.includes('신제품') ? '700' : '400',
                textDecoration: selectedCategories.includes('신제품') ? 'underline' : 'none'
              }}
            >
              신제품
            </PathChildLink>
            <PathChildLink 
              onClick={(e) => { e.preventDefault(); handleCategoryToggle('라이프스타일'); }}
              style={{ 
                cursor: 'pointer', 
                fontWeight: selectedCategories.includes('라이프스타일') ? '700' : '400',
                textDecoration: selectedCategories.includes('라이프스타일') ? 'underline' : 'none'
              }}
            >
              라이프스타일
            </PathChildLink>
            <PathChildLink 
              onClick={(e) => { e.preventDefault(); handleCategoryToggle('세일'); }}
              style={{ 
                cursor: 'pointer', 
                fontWeight: selectedCategories.includes('세일') ? '700' : '400',
                textDecoration: selectedCategories.includes('세일') ? 'underline' : 'none'
              }}
            >
              세일
            </PathChildLink>
            <PathChildLink 
              onClick={(e) => { e.preventDefault(); handleCategoryToggle('슬립온'); }}
              style={{ 
                cursor: 'pointer', 
                fontWeight: selectedCategories.includes('슬립온') ? '700' : '400',
                textDecoration: selectedCategories.includes('슬립온') ? 'underline' : 'none'
              }}
            >
              슬립온
            </PathChildLink>
          </PathChildren>
        </CollectionPath>
      </FilterTopBar>

      <ContentWrapper className={isFilterOpen ? 'filter-open' : ''}>
        <FilterSidebar $isOpen={isFilterOpen}>
          <FilterHeader>
            <FilterTitle>필터</FilterTitle>
            <CloseButton onClick={() => setIsFilterOpen(false)}>×</CloseButton>
          </FilterHeader>

          <FilterContent>
            {/* 적용된 필터 */}
            {(selectedSizes.length > 0 || selectedMaterials.length > 0) && (
              <AppliedFiltersSection style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                <AppliedFiltersTitle>
                  <span>적용된 필터</span>
                  <ClearAllButton onClick={() => { setSelectedSizes([]); setSelectedMaterials([]); }}>
                    초기화
                  </ClearAllButton>
                </AppliedFiltersTitle>
                <AppliedFiltersList>
                  {selectedMaterials.map(materialId => {
                    const material = materials.find(m => m.id === materialId);
                    return (
                      <FilterTag key={materialId}>
                        {material?.label}
                        <RemoveFilterButton 
                          onClick={() => handleMaterialToggle(materialId)}
                          aria-label="필터 제거"
                        >
                          ×
                        </RemoveFilterButton>
                      </FilterTag>
                    );
                  })}
                  {selectedSizes.map(size => (
                    <FilterTag key={`size-${size}`}>
                      {size}
                      <RemoveFilterButton 
                        onClick={() => handleSizeToggle(size)}
                        aria-label="필터 제거"
                      >
                        ×
                      </RemoveFilterButton>
                    </FilterTag>
                  ))}
                </AppliedFiltersList>
              </AppliedFiltersSection>
            )}

            {/* 사이즈 필터 */}
            <FilterGroup open>
              <FilterGroupTitle>
                <span>사이즈</span>
                <span>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </FilterGroupTitle>
              <FilterOptions>
                {sizes.map(size => (
                  <FilterOption key={size}>
                    <input
                      type="checkbox"
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeToggle(size)}
                    />
                    <label htmlFor={`size-${size}`}>{size}</label>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterGroup>

            {/* 소재 필터 */}
            <FilterGroup open>
              <FilterGroupTitle>
                <span>소재</span>
                <span>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </FilterGroupTitle>
              <FilterMaterialOptions>
                {materials.map(material => (
                  <FilterMaterialOption key={material.id}>
                    <label htmlFor={`material-${material.id}`}>
                      <input
                        type="checkbox"
                        id={`material-${material.id}`}
                        checked={selectedMaterials.includes(material.id)}
                        onChange={() => handleMaterialToggle(material.id)}
                      />
                      <div>{material.label}</div>
                    </label>
                  </FilterMaterialOption>
                ))}
              </FilterMaterialOptions>
            </FilterGroup>
          </FilterContent>

          <FilterActions>
            <ApplyButton onClick={handleApplyFilters}>적용</ApplyButton>
          </FilterActions>
        </FilterSidebar>

        <MainContent>
          {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>로딩 중...</div>}
          {error && <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>}
          
          {!loading && !error && (
            <>
              <ProductGrid>
                <ProductGridHeader>
                  <ProductCount>{products.length}개 제품</ProductCount>
                  
                  <SortDropdown>
                    <SortButton>
                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="45" viewBox="0 0 44 45" fill="none">
                        <rect x="0.5" y="0.689941" width="43" height="43" rx="2.5" fill="white"/>
                        <rect x="0.5" y="0.689941" width="43" height="43" rx="2.5" stroke="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M28.4584 22.1899C28.4584 22.5351 28.1785 22.8149 27.8334 22.8149H16.1667C15.8215 22.8149 15.5417 22.5351 15.5417 22.1899C15.5417 21.8448 15.8215 21.5649 16.1667 21.5649H27.8334C28.1785 21.5649 28.4584 21.8448 28.4584 22.1899Z" fill="black"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M30.9584 18.0233C30.9584 18.3685 30.6785 18.6483 30.3334 18.6483H13.6667C13.3215 18.6483 13.0417 18.3685 13.0417 18.0233C13.0417 17.6781 13.3215 17.3983 13.6667 17.3983H30.3334C30.6785 17.3983 30.9584 17.6781 30.9584 18.0233ZM25.9584 26.3566C25.9584 26.7018 25.6785 26.9816 25.3334 26.9816H18.6667C18.3215 26.9816 18.0417 26.7018 18.0417 26.3566C18.0417 26.0115 18.3215 25.7316 18.6667 25.7316H25.3334C25.6785 25.7316 25.9584 26.0115 25.9584 26.3566Z" fill="black"/>
                      </svg>
                    </SortButton>
                    <SortMenu>
                      <SortOption>
                        <input type="radio" name="sort" id="sort-recommend" checked={sortBy === 'recommend'} onChange={() => setSortBy('recommend')} />
                        <span>추천순</span>
                      </SortOption>
                      <SortOption>
                        <input type="radio" name="sort" id="sort-latest" checked={sortBy === 'latest'} onChange={() => setSortBy('latest')} />
                        <span>최신순</span>
                      </SortOption>
                      <SortOption>
                        <input type="radio" name="sort" id="sort-priceAsc" checked={sortBy === 'priceAsc'} onChange={() => setSortBy('priceAsc')} />
                        <span>가격 낮은 순</span>
                      </SortOption>
                      <SortOption>
                        <input type="radio" name="sort" id="sort-priceDesc" checked={sortBy === 'priceDesc'} onChange={() => setSortBy('priceDesc')} />
                        <span>가격 높은 순</span>
                      </SortOption>
                      <SortOption>
                        <input type="radio" name="sort" id="sort-review" checked={sortBy === 'review'} onChange={() => setSortBy('review')} />
                        <span>리뷰 많은 순</span>
                      </SortOption>
                    </SortMenu>
                  </SortDropdown>
                </ProductGridHeader>

                {products.map((product) => {
                // 첫 번째 이미지 선택 (썸네일 우선)
                const thumbnailImage = product.images?.find(img => img.isThumbnail);
                const firstImage = thumbnailImage || product.images?.[0];
                const imageUrl = firstImage?.url || '/img/default-product.png';
                
                // 할인가 계산
                const discountedPrice = product.originalPrice * (1 - product.discountRate);
                
                // 카테고리 표시
                const categoryText = product.categories?.join(', ') || '';
                
                return (
                  <CollectionProductCard
                    key={product._id}
                    href={`/products/${product._id}`}
                    imageUrl={imageUrl}
                    productName={product.name}
                    productCategory={categoryText}
                    currentPrice={`₩${Math.round(discountedPrice).toLocaleString()}`}
                    originalPrice={`₩${product.originalPrice.toLocaleString()}`}
                    discountRate={product.discountRate}
                    sizes={product.sizes || []}
                  />
                );
              })}
            </ProductGrid>
            </>
          )}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
    </PageWrapper>
  );
};
