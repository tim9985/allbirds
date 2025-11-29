// productController.js

import Product from "../models/Product.js";
import { calculateScore } from "../utils/rankingCalculator.js";
import { getKSTNow } from "../utils/dateHelper.js";

// 모든 상품 조회 (GET /api/products?sort=recommend)
export async function getAllProducts(req, res, next) {
  try {
    // sort, 필터용 쿼리 파라미터
    const {
      sort,          // recommend, latest, priceAsc, priceDesc, review 등
      category,      // 카테고리 필터 (categories 배열)
      size,          // 사이즈 필터 (sizes 배열)
      minPrice,      // 최소 가격
      maxPrice,      // 최대 가격
      q,             // 검색어 (상품명/설명)
    } = req.query;

    const filter = {};

    // 카테고리 필터 (categories 안에 값이 포함되면 매칭)
    if (category) {
      // 여러 개면 "라이프스타일,슬립온" 이런 식으로 쉼표로 구분
      const categories = category.split(',').map(c => c.trim());
      filter.categories = { $in: categories };
    }

    // 사이즈 필터 : sizes 배열에 포함되는지 체크
    if (size) {
      filter.sizes = Number(size); // sizes: [Number] 기준
    }

    // 가격 필터
    if (minPrice || maxPrice) {
      filter.originalPrice = {};
      if (minPrice) filter.originalPrice.$gte = Number(minPrice);
      if (maxPrice) filter.originalPrice.$lte = Number(maxPrice);
    }

    // 검색어(q) : name + description 에 대해 부분 일치 검색
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    // =====================
    //  추천순 정렬
    // =====================
    if (sort === "recommend") {
      // .lean()으로 JS 객체로 가져옴
      const products = await Product.find(filter).lean();

      // JS 메모리 상에서 점수 계산 후 정렬
      products.sort((a, b) => calculateScore(b) - calculateScore(a));

      // 페이지네이션 필요 없으므로 전체 반환
      return res.json(products);
    }

    // =====================
    //  그 외 정렬
    // =====================

    // sort 쿼리가 없거나 다른 값이면 id 순 정렬
    let sortOption = { _id: 1 }; // 기본값

    switch (sort) {
      case "latest":      // 최신 등록순
        sortOption = { createdAt: -1 };
        break;
      case "priceAsc":    // 가격 낮은순
        sortOption = { originalPrice: 1 };
        break;
      case "priceDesc":   // 가격 높은순
        sortOption = { originalPrice: -1 };
        break;
      case "review":      // 리뷰 많은 순
        sortOption = { reviewCount: -1 };
        break;
      default:
        // 그대로 _id: 1 사용
        break;
    }

    // 페이지네이션 없이 조건 + 정렬만 적용해서 전부 반환
    const products = await Product.find(filter).sort(sortOption);

    res.json(products);
  } catch (err) {
    next(err);
  }
}

// 단일 상품 조회 (GET /api/products/:id)
export async function getProductById(req, res, next) {
  try {
    const productId = req.params.id;
    
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    return res.json(product);
  } catch (err) {
    next(err);
  }
}


// 프론트에서 보낸 상품 배열로 products 컬렉션 동기화
// POST /api/products/sync-from-client
export async function syncProductsFromClient(req, res, next) {
  try {
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "상품 배열이 필요합니다." });
    }

    const savedList = [];

    // 하나씩 처리 (과제 규모에서는 성능 문제 거의 없음)
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      const {
        _id, // 있으면 해당 id 기준으로 update, 없으면 새로 생성
        name,
        description,
        originalPrice,
        discountRate,
        sizes,
        materials,
        categories,
      } = item;

      if (!name) {
        return res
          .status(400)
          .json({ message: `${i}번째 상품에 name이 없습니다.` });
      }
      if (originalPrice == null) {
        return res
          .status(400)
          .json({ message: `${i}번째 상품에 originalPrice가 없습니다.` });
      }

      // description은 required라서 없으면 빈 문자열이라도 넣어주기
      const safeDescription = description ?? "";

      // 할인율 정규화 (0~1 범위로 보정)
      let safeDiscount = discountRate ?? 0;
      if (safeDiscount > 1) {
        // 혹시 10, 30처럼 퍼센트로 들어오면 100으로 나눔
        safeDiscount = safeDiscount / 100;
      }
      if (safeDiscount < 0) safeDiscount = 0;
      if (safeDiscount > 1) safeDiscount = 1;

      if (_id != null) {
        // 이미 있는 상품이라면: findByIdAndUpdate
        const updated = await Product.findByIdAndUpdate(
          _id,
          {
            $set: {
              name,
              description: safeDescription,
              originalPrice,
              discountRate: safeDiscount,
              sizes: sizes ?? [],
              materials: materials ?? [],
              categories: categories ?? [],
            },
          },
          { new: true, runValidators: true } // 수정된 문서 반환 + 스키마 검증
        );

        if (!updated) {
          // id가 있는데 실제로는 없으면 새로 만들어줌
          const created = new Product({
            _id,
            name,
            description: safeDescription,
            originalPrice,
            discountRate: safeDiscount,
            sizes: sizes ?? [],
            materials: materials ?? [],
            categories: categories ?? [],
          });
          const saved = await created.save();
          savedList.push(saved);
        } else {
          savedList.push(updated);
        }
      } else {
        // 새 상품: pre('save') 훅으로 productId 자동 증가
        const created = new Product({
          name,
          description: safeDescription,
          originalPrice,
          discountRate: safeDiscount,
          sizes: sizes ?? [],
          materials: materials ?? [],
          categories: categories ?? [],
        });
        const saved = await created.save();
        savedList.push(saved);
      }
    }

    return res.json({
      message: "클라이언트 기준 상품 동기화 완료",
      products: savedList,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "서버 오류",
      error: err.message,
    });
  }
}


// =========================
//  상품 리뷰 입력 / 조회
// =========================

// 특정 상품에 리뷰 추가 (POST /api/products/:id/reviews)
export async function addReview(req, res, next) {
  try {
    const productId = Number(req.params.id);

    // 세션에서 사용자 정보 가져오기 (로그인 전제)
    const userId = req.session.userId;
    const displayName = req.session.loginName; // 또는 req.session.displayName

    const { rating, comment } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (!rating) {
      return res.status(400).json({ message: "별점은 필수입니다." });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }
    
    if ((product.reviews?.length || 0) >= 3) {
      return res.status(400).json({ message: "리뷰는 상품당 최대 3개까지만 등록할 수 있습니다." });
    }


    // 리뷰 push (Product.js의 ReviewSchema 구조에 맞춰서)
    product.reviews.push({
      userId,
      displayName,
      rating,
      comment,
      createdAt: getKSTNow(),
    });

    // 리뷰 통계(평균 평점 계산용) 갱신
    product.reviewCount = (product.reviewCount || 0) + 1;
    product.totalRatingSum = (product.totalRatingSum || 0) + Number(rating);

    await product.save();

    return res.status(201).json({
      message: "리뷰가 등록되었습니다.",
      reviews: product.reviews,
    });
  } catch (err) {
    next(err);
  }
}

// 특정 상품의 리뷰 목록 조회 (GET /api/products/:id/reviews)
export async function getReviews(req, res, next) {
  try {
    const productId = Number(req.params.id);

    // reviews만 가져오도록 projection
    const product = await Product.findById(productId, { reviews: 1 }).lean();
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    return res.json(product.reviews || []);
  } catch (err) {
    next(err);
  }
}
