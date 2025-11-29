// 추천순 가산점 계산(총점 100점)

// 로그 스케일 기준점
// 판매량: 100개 팔면 만점
const MAX_SALES_LOG = Math.log10(100);

// 리뷰 수: 상품당 최대 3개만 허용하므로 log10(3)을 기준으로 삼음
const MAX_REVIEW_LOG = Math.log10(3);

const NEW_WINDOW = 30;      // 최신순(일수) 기준점
const MAX_DISCOUNT = 0.99;   // 최대 99% 할인 (0.99 = 99%)

export function calculateScore(product) {
  // 안전하게 기본값 처리
  const soldCount = product.soldCount || 0;
  const reviewCount = product.reviewCount || 0;
  const totalRatingSum = product.totalRatingSum || 0;
  const createdAt = product.createdAt || new Date();
  const discountRate = product.discountRate || 0; // 0 ~ 1.0 (0% ~ 100%)

  // 평균 평점 (리뷰가 없으면 0)
  const rating =
    reviewCount > 0 ? totalRatingSum / reviewCount : 0;

  // 1. 판매량 (40점) - 로그 스케일 적용
  let salesScore = 0;
  if (soldCount > 0) {
    salesScore = (Math.log10(soldCount) / MAX_SALES_LOG) * 40;
  }
  salesScore = Math.min(salesScore, 40);

  // 2. 평점 (25점)
  // 5점 만점을 25점으로 환산 ( 평점 * 5 )
  const ratingScore = rating * 5;

  // 3. 리뷰 수 (15점) - 로그 스케일 적용
  // 리뷰 수는 0~3개 사이이므로, 1개/2개/3개만으로도 점수 차이가 나도록 설정
  let reviewScore = 0;
  const clampedReviewCount = Math.min(reviewCount, 3); // 안전하게 3으로 clamp

  if (clampedReviewCount > 0) {
    reviewScore =
      (Math.log10(clampedReviewCount) / MAX_REVIEW_LOG) * 15;
  }
  reviewScore = Math.min(reviewScore, 15);

  // 4. 최신성 (10점)
  const now = new Date();
  const daysDiff =
    (now - new Date(createdAt)) / (1000 * 60 * 60 * 24); // 지난 일수
  const newnessScore = Math.max(
    0,
    ((NEW_WINDOW - daysDiff) / NEW_WINDOW) * 10
  );

  // 5. 할인율 (10점)
  const discountScore = Math.min(
    (discountRate / MAX_DISCOUNT) * 10,
    10
  );

  return (
    salesScore +
    ratingScore +
    reviewScore +
    newnessScore +
    discountScore
  );
}
