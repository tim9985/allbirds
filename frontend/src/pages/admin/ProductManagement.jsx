import { useState, useEffect } from "react";
import styled from "styled-components";
import { getProducts } from "@/api/productApi";
import axios from "axios";

const PageWrapper = styled.div`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #212121;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductCard = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 20px;
  align-items: start;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #212121;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 12px;
`;

const SizesSection = styled.div`
  margin-top: 12px;
`;

const SizesTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #212121;
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
`;

const SizeButton = styled.div`
  padding: 8px;
  border: 1px solid #4caf50;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 4px;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
`;

const SizeLabel = styled.div`
  font-weight: 600;
`;

const StockLabel = styled.div`
  font-size: 0.75rem;
  color: #666;
`;

const DeleteSizeButton = styled.button`
  padding: 4px 8px;
  font-size: 0.7rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
  background-color: #f44336;
  color: white;
  transition: opacity 0.2s;
  margin-top: 6px;

  &:hover {
    opacity: 0.8;
  }
`;

const EditSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #212121;
`;

const DiscountInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SizeStockInput = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const SmallInput = styled.input`
  width: 70px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 80px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #388e3c;
  }
`;

const SaveButton = styled.button`
  padding: 10px 16px;
  background-color: #212121;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000;
  }
`;

const NoData = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #666;
`;

export const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [discountValues, setDiscountValues] = useState({});
  const [newSizeInputs, setNewSizeInputs] = useState({});
  const [newStockInputs, setNewStockInputs] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      
      // Initialize discount values
      const discounts = {};
      data.forEach(product => {
        discounts[product._id] = (product.discountRate * 100) || 0;
      });
      setDiscountValues(discounts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDiscountChange = (productId, value) => {
    setDiscountValues(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleNewSizeChange = (productId, value) => {
    setNewSizeInputs(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleNewStockChange = (productId, value) => {
    setNewStockInputs(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const saveDiscount = async (productId) => {
    try {
      await axios.patch(`http://localhost:4000/api/admin/products/${productId}/discount`, {
        discountRate: parseFloat(discountValues[productId]) / 100
      }, {
        withCredentials: true
      });
      alert('할인율이 업데이트되었습니다.');
      fetchProducts();
    } catch (error) {
      console.error('Failed to update discount:', error);
      console.error('Error response:', error.response?.data);
      alert(error.response?.data?.message || '할인율 업데이트에 실패했습니다.');
    }
  };

  const addSizeStock = async (productId) => {
    const size = newSizeInputs[productId];
    const stock = newStockInputs[productId];

    if (!size || !stock) {
      alert('사이즈와 수량을 모두 입력해주세요.');
      return;
    }

    if (isNaN(size) || isNaN(stock)) {
      alert('사이즈와 수량은 숫자여야 합니다.');
      return;
    }

    try {
      await axios.patch(`http://localhost:4000/api/admin/products/${productId}/stock`, {
        size: Number(size),
        quantity: Number(stock),
        action: 'add'
      }, {
        withCredentials: true
      });
      alert('사이즈와 재고가 추가되었습니다.');
      setNewSizeInputs(prev => ({ ...prev, [productId]: '' }));
      setNewStockInputs(prev => ({ ...prev, [productId]: '' }));
      fetchProducts();
    } catch (error) {
      console.error('Failed to add size/stock:', error);
      console.error('Error response:', error.response?.data);
      console.error('Request URL:', `http://localhost:4000/api/admin/products/${productId}/stock`);
      alert(error.response?.data?.message || '사이즈/재고 추가에 실패했습니다.');
    }
  };

  const deleteSize = async (productId, size) => {
    if (!confirm(`사이즈 ${size}mm를 완전히 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await axios.patch(`http://localhost:4000/api/admin/products/${productId}/stock`, {
        size,
        action: 'remove'
      }, {
        withCredentials: true
      });
      alert('사이즈가 삭제되었습니다.');
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete size:', error);
      console.error('Error response:', error.response?.data);
      console.error('Request URL:', `http://localhost:4000/api/admin/products/${productId}/stock`);
      alert(error.response?.data?.message || '사이즈 삭제에 실패했습니다.');
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Title>상품 관리</Title>

        {products.length === 0 ? (
          <NoData>등록된 상품이 없습니다.</NoData>
        ) : (
          <ProductList>
            {products.map(product => {
              const mainImage = product.images?.find(img => img.isThumbnail) || product.images?.[0];
              
              return (
                <ProductCard key={product._id}>
                  <ProductImage src={mainImage?.url || '/img/placeholder.jpg'} alt={product.name} />
                  
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>
                      ₩{product.originalPrice?.toLocaleString()} 
                      {product.discountRate > 0 && (
                        <span style={{ marginLeft: '8px', color: '#f44336' }}>
                          ({Math.round(product.discountRate * 100)}% 할인)
                        </span>
                      )}
                    </ProductPrice>

                    <SizesSection>
                      <SizesTitle>가용 사이즈 및 재고</SizesTitle>
                      <SizeGrid>
                        {product.sizes?.map(size => {
                          const stockCount = product.stock?.[size] || 0;
                          return (
                            <SizeButton key={size}>
                              <SizeLabel>{size}mm</SizeLabel>
                              <StockLabel>재고: {stockCount}개</StockLabel>
                              <DeleteSizeButton 
                                onClick={() => deleteSize(product._id, size)}
                                title="사이즈 삭제"
                              >
                                삭제
                              </DeleteSizeButton>
                            </SizeButton>
                          );
                        })}
                      </SizeGrid>
                    </SizesSection>
                  </ProductInfo>

                  <EditSection>
                    <InputGroup>
                      <Label>할인율 수정</Label>
                      <DiscountInput>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={discountValues[product._id] || 0}
                          onChange={(e) => handleDiscountChange(product._id, e.target.value)}
                          placeholder="할인율"
                        />
                        <span>%</span>
                      </DiscountInput>
                      <SaveButton onClick={() => saveDiscount(product._id)}>
                        할인율 저장
                      </SaveButton>
                    </InputGroup>

                    <InputGroup>
                      <Label>사이즈/재고 추가</Label>
                      <SizeStockInput>
                        <SmallInput
                          type="number"
                          placeholder="사이즈"
                          value={newSizeInputs[product._id] || ''}
                          onChange={(e) => handleNewSizeChange(product._id, e.target.value)}
                        />
                        <SmallInput
                          type="number"
                          placeholder="수량"
                          value={newStockInputs[product._id] || ''}
                          onChange={(e) => handleNewStockChange(product._id, e.target.value)}
                        />
                        <AddButton onClick={() => addSizeStock(product._id)}>
                          추가
                        </AddButton>
                      </SizeStockInput>
                    </InputGroup>
                  </EditSection>
                </ProductCard>
              );
            })}
          </ProductList>
        )}
      </Container>
    </PageWrapper>
  );
};
