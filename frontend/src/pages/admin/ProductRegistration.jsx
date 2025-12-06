import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #212121;
`;

const Form = styled.form`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #212121;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #212121;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  min-height: 100px;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #212121;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #212121;
  }
`;

const ImageUpload = styled.div`
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #212121;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 20px;
  border-radius: 4px;
`;

const SizeSection = styled.div`
  margin-top: 12px;
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`;

const SizeCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 180px;

  &:hover {
    background-color: #f5f5f5;
  }

  input[type="checkbox"] {
    cursor: pointer;
    flex-shrink: 0;
  }
  
  span {
    flex-shrink: 0;
    min-width: 50px;
  }
`;

const StockInput = styled.input`
  width: 70px;
  padding: 6px 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-left: auto;
  flex-shrink: 0;
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #212121;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background-color: white;
  color: #212121;
  border: 1px solid #212121;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AVAILABLE_SIZES = ['250', '255', '260', '265', '270', '275', '280', '285', '290', '295', '300', '305', '310', '315', '320'];

const PRODUCT_TYPES = [
  { value: 'slipon', label: '슬립온' },
  { value: 'lifestyle', label: '라이프스타일' }
];

export const ProductRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'mens',
    material: 'wool',
    types: [],
    discountRate: 0,
    image: null
  });
  const [selectedSizes, setSelectedSizes] = useState(
    AVAILABLE_SIZES.reduce((acc, size) => ({ ...acc, [size]: { available: false, stock: 0 } }), {})
  );
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [size]: {
        ...prev[size],
        available: !prev[size].available,
        stock: !prev[size].available ? 0 : prev[size].stock
      }
    }));
  };

  const handleStockChange = (size, value) => {
    const stockValue = parseInt(value) || 0;
    setSelectedSizes(prev => ({
      ...prev,
      [size]: {
        ...prev[size],
        stock: stockValue
      }
    }));
  };

  const handleTypeToggle = (typeValue) => {
    setFormData(prev => ({
      ...prev,
      types: prev.types.includes(typeValue)
        ? prev.types.filter(t => t !== typeValue)
        : [...prev.types, typeValue]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      alert('상품 이미지를 업로드해주세요.');
      return;
    }

    if (formData.types.length === 0) {
      alert('최소 하나의 타입을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('material', formData.material);
      formDataToSend.append('types', JSON.stringify(formData.types));
      formDataToSend.append('discountRate', formData.discountRate);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('sizes', JSON.stringify(selectedSizes));

      await axios.post('http://localhost:4000/api/admin/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      alert('상품이 성공적으로 등록되었습니다.');
      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to register product:', error);
      alert(error.response?.data?.message || '상품 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>상품 등록</Title>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">상품명 *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">가격 (원) *</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">상품 설명</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">카테고리 *</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="mens">남성</option>
            <option value="womens">여성</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="material">소재 *</Label>
          <Select
            id="material"
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            required
          >
            <option value="wool">울 (Wool)</option>
            <option value="tree">트리 (Tree)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">타입 * (중복 선택 가능)</Label>
          <SizeSection>
            <SizeGrid>
              {PRODUCT_TYPES.map(type => (
                <SizeCheckbox key={type.value}>
                  <input
                    type="checkbox"
                    checked={formData.types.includes(type.value)}
                    onChange={() => handleTypeToggle(type.value)}
                  />
                  {type.label}
                </SizeCheckbox>
              ))}
            </SizeGrid>
          </SizeSection>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="discountRate">할인율 (%)</Label>
          <Input
            type="number"
            id="discountRate"
            name="discountRate"
            value={formData.discountRate}
            onChange={handleInputChange}
            min="0"
            max="100"
          />
        </FormGroup>

        <FormGroup>
          <Label>가용 사이즈 및 재고 선택 *</Label>
          <SizeSection>
            <SizeGrid>
              {AVAILABLE_SIZES.map(size => (
                <SizeCheckbox key={size}>
                  <input
                    type="checkbox"
                    checked={selectedSizes[size].available}
                    onChange={() => handleSizeToggle(size)}
                  />
                  <span>{size}mm</span>
                  <StockInput
                    type="number"
                    min="0"
                    value={selectedSizes[size].stock}
                    onChange={(e) => handleStockChange(size, e.target.value)}
                    disabled={!selectedSizes[size].available}
                    placeholder="수량"
                  />
                </SizeCheckbox>
              ))}
            </SizeGrid>
          </SizeSection>
        </FormGroup>

        <FormGroup>
          <Label>상품 이미지 *</Label>
          <ImageUpload onClick={() => document.getElementById('imageInput').click()}>
            {imagePreview ? (
              <ImagePreview src={imagePreview} alt="Preview" />
            ) : (
              <div>
                <p style={{ marginBottom: '8px', color: '#666' }}>클릭하여 이미지 업로드</p>
                <p style={{ fontSize: '0.875rem', color: '#999' }}>JPG, PNG 파일만 가능합니다</p>
              </div>
            )}
          </ImageUpload>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </FormGroup>

        <ButtonGroup>
          <CancelButton type="button" onClick={() => navigate('/admin/products')}>
            취소
          </CancelButton>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '상품 등록'}
          </SubmitButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};
