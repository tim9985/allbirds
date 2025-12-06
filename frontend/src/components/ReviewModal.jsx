// ReviewModal.jsx - 리뷰 작성 모달
import { useState } from "react";
import styled from "styled-components";
import { createReview } from "@/api/reviewAPI";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #212121;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ProductInfo = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ProductName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #212121;
`;

const RatingSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 10px;
  color: #212121;
`;

const StarRating = styled.div`
  display: flex;
  gap: 8px;
`;

const Star = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: ${props => props.$filled ? '#FFD700' : '#ddd'};
  transition: color 0.2s;
  
  &:hover {
    color: #FFD700;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #212121;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const SubmitButton = styled(Button)`
  background-color: #212121;
  color: white;
  
  &:hover {
    background-color: #000;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f5f5f5;
  color: #212121;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
`;

export const ReviewModal = ({ productId, productName, orderId, onClose, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError("");

    if (rating === 0) {
      setError("별점을 선택해주세요.");
      return;
    }

    if (!content.trim()) {
      setError("리뷰 내용을 입력해주세요.");
      return;
    }

    if (content.trim().length < 10) {
      setError("리뷰는 최소 10자 이상 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createReview({
        productId,
        orderId,
        rating,
        content: content.trim(),
      });

      alert("리뷰가 작성되었습니다!");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("리뷰 작성 에러:", err);
      console.error("에러 응답:", err.response?.data);
      const message = err.response?.data?.message || err.message || "리뷰 작성에 실패했습니다.";
      
      // 최대 리뷰 개수 초과시 alert 표시
      if (message.includes("최대 리뷰 개수")) {
        alert(message);
        onClose();
      } else {
        setError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>리뷰 작성</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ProductInfo>
          <ProductName>{productName}</ProductName>
        </ProductInfo>

        <RatingSection>
          <Label>별점</Label>
          <StarRating>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                type="button"
                $filled={star <= rating}
                onClick={() => setRating(star)}
              >
                ★
              </Star>
            ))}
          </StarRating>
        </RatingSection>

        <div>
          <Label>리뷰 내용</Label>
          <TextArea
            placeholder="상품에 대한 솔직한 후기를 남겨주세요. (최소 10자 이상)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <CancelButton type="button" onClick={onClose}>
            취소
          </CancelButton>
          <SubmitButton 
            type="button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "작성 중..." : "작성 완료"}
          </SubmitButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};
