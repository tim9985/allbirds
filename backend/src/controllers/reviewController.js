// reviewController.js - 리뷰 관련 컨트롤러
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// 리뷰 작성: POST /api/reviews
export async function createReview(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    let { productId, orderId, rating, content } = req.body;

    // Number 타입으로 변환
    productId = Number(productId);
    orderId = Number(orderId);
    rating = Number(rating);

    // 유효성 검사
    if (!productId || !orderId || !rating || !content) {
      return res.status(400).json({ 
        message: "productId, orderId, rating, content는 필수입니다." 
      });
    }

    if (isNaN(productId) || isNaN(orderId) || isNaN(rating)) {
      return res.status(400).json({ 
        message: "productId, orderId, rating은 숫자여야 합니다." 
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "별점은 1~5점 사이여야 합니다." });
    }

    // 주문 확인
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "주문을 찾을 수 없습니다." });
    }

    // 본인의 주문인지 확인
    if (order.userId !== userId) {
      return res.status(403).json({ message: "본인의 주문만 리뷰를 작성할 수 있습니다." });
    }

    // 해당 상품이 주문에 포함되어 있는지 확인
    const orderItem = order.items.find(item => item.productId === productId);
    if (!orderItem) {
      return res.status(400).json({ message: "해당 주문에 포함되지 않은 상품입니다." });
    }

    // 이미 리뷰를 작성했는지 확인 (한 유저가 한 상품에 대해 한 번만 작성 가능)
    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
      return res.status(400).json({ message: "이미 해당 상품에 대한 리뷰를 작성하셨습니다." });
    }

    // 해당 상품의 리뷰 개수 확인 (최대 3개)
    const productReviewCount = await Review.countDocuments({ productId });
    if (productReviewCount >= 3) {
      return res.status(400).json({ message: "해당 상품은 최대 리뷰 개수(3개)에 도달했습니다." });
    }

    // 사용자 정보 가져오기
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 리뷰 생성
    const review = new Review({
      userId,
      productId,
      orderId,
      rating,
      content: content.trim(),
      displayName: user.displayName,
    });

    await review.save();

    res.status(201).json({
      message: "리뷰가 작성되었습니다.",
      review,
    });
  } catch (err) {
    next(err);
  }
}

// 특정 상품의 리뷰 조회: GET /api/reviews/product/:productId
export async function getProductReviews(req, res, next) {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .lean();

    // 평균 별점 계산
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({
      reviews,
      avgRating: Math.round(avgRating * 10) / 10, // 소수점 첫째자리
      totalCount: reviews.length,
    });
  } catch (err) {
    next(err);
  }
}

// 내가 작성한 리뷰 조회: GET /api/reviews/my
export async function getMyReviews(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ reviews });
  } catch (err) {
    next(err);
  }
}

// 특정 주문의 특정 상품에 대한 리뷰 존재 여부 확인: GET /api/reviews/check
export async function checkReviewExists(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { productId, orderId } = req.query;

    if (!productId || !orderId) {
      return res.status(400).json({ message: "productId와 orderId가 필요합니다." });
    }

    const review = await Review.findOne({ userId, productId, orderId });

    res.json({ exists: !!review, review });
  } catch (err) {
    next(err);
  }
}
