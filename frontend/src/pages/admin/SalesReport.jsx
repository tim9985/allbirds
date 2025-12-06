import { useState, useEffect } from "react";
import styled from "styled-components";
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

const FilterSection = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #212121;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #212121;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #212121;
  }
`;

const FilterButton = styled.button`
  padding: 10px 24px;
  background-color: #212121;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000;
  }
`;

const SummarySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SummaryCard = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
`;

const SummaryLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
`;

const SummaryValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: #212121;
`;

const TableContainer = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f5f5f5;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 600;
  color: #212121;
  border-bottom: 2px solid #e0e0e0;
`;

const Td = styled.td`
  padding: 16px;
  font-size: 0.95rem;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NoData = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;
  font-size: 0.95rem;
`;

export const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalProducts: 0
  });
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    // Set default date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    setFilters({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    });
  }, []);

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      fetchSalesData();
    }
  }, [filters.startDate, filters.endDate]);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/sales', {
        params: {
          from: filters.startDate,
          to: filters.endDate
        },
        withCredentials: true
      });

      console.log('Sales data response:', response.data);

      setSalesData(response.data.products || []);
      setSummary({
        totalSales: response.data.totalSales || 0,
        totalRevenue: response.data.totalRevenue || 0,
        totalProducts: response.data.products?.length || 0
      });
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
      console.error('Error details:', error.response?.data);
      alert('판매 현황 조회에 실패했습니다.');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilter = () => {
    fetchSalesData();
  };

  return (
    <PageWrapper>
      <Container>
        <Title>판매 현황</Title>

        <FilterSection>
          <FilterTitle>조회 기간 설정</FilterTitle>
          <FilterRow>
            <FilterGroup>
              <Label htmlFor="startDate">시작일</Label>
              <Input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </FilterGroup>

            <FilterGroup>
              <Label htmlFor="endDate">종료일</Label>
              <Input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </FilterGroup>

            <FilterButton onClick={handleApplyFilter}>
              조회
            </FilterButton>
          </FilterRow>
        </FilterSection>

        <SummarySection>
          <SummaryCard>
            <SummaryLabel>총 판매 수량</SummaryLabel>
            <SummaryValue>{summary.totalSales.toLocaleString()}개</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>총 매출</SummaryLabel>
            <SummaryValue>₩{summary.totalRevenue.toLocaleString()}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>판매 상품 수</SummaryLabel>
            <SummaryValue>{summary.totalProducts}개</SummaryValue>
          </SummaryCard>
        </SummarySection>

        <TableContainer>
          <Table>
            <Thead>
              <tr>
                <Th>상품</Th>
                <Th>원가</Th>
                <Th>할인율</Th>
                <Th>판매가</Th>
                <Th>판매 수량</Th>
                <Th>매출</Th>
              </tr>
            </Thead>
            <tbody>
              {salesData.length > 0 ? (
                salesData.map((item) => (
                  <tr key={item.productId}>
                    <Td>
                      <ProductInfo>
                        <ProductImage 
                          src={item.image || '/img/placeholder.jpg'} 
                          alt={item.name} 
                        />
                        <div>
                          <div style={{ fontWeight: '600' }}>{item.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#666' }}>
                            ID: {item.productId}
                          </div>
                        </div>
                      </ProductInfo>
                    </Td>
                    <Td>₩{item.originalPrice?.toLocaleString()}</Td>
                    <Td>{Math.round((item.discountRate || 0) * 100)}%</Td>
                    <Td>
                      <strong>₩{item.discountedPrice?.toLocaleString()}</strong>
                    </Td>
                    <Td>{item.quantitySold?.toLocaleString()}개</Td>
                    <Td>
                      <strong style={{ color: '#4caf50' }}>
                        ₩{item.revenue?.toLocaleString()}
                      </strong>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="6">
                    <NoData>선택한 기간에 판매 데이터가 없습니다.</NoData>
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Container>
    </PageWrapper>
  );
};
