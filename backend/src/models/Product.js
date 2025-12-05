// Product.js

import mongoose from "mongoose";
import { getNextSequence } from "../utils/AutoIncrement.js";
import { getKSTNow } from "../utils/dateHelper.js";
const { Schema } = mongoose;

// 리뷰에 대한 서브 스키마
const ReviewSchema = new Schema(
  {
    //  별도의 리뷰 PK는 두지 않고, 부모 Product의 _id로 "어느 상품의 리뷰인지"를 구분하고
    //  아래 userId로 "누가 작성한 리뷰인지"를 구분해서 사용

    userId: {
      type: Number,              // Schema.Types.id 대신 Number (int)
      // ref: 'User',  // User.js 참조 (정규화 대신 userId + displayName 스냅샷)
      required: true,
    },
    displayName: { // 'User'의 displayName을 복사해서 저장 (비정규화)
      type: String,
      required: true,
    },
    rating: { // 평점 (1~5, 소수점 허용 가능하면 Number)
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { // 리뷰 내용(텍스트)
      type: String,
    },
    createdAt: { // 리뷰 작성일(등록일)
      type: Date,
      default: getKSTNow,
    },
  },
  { _id: false } // 별도 id 생성X
);

// 상품 이미지에 대한 서브 스키마
const ImageSchema = new Schema(
  {
    url: { // 이미지 URL (필수)
      type: String,
      required: true,
    },
    isThumbnail: { // 썸네일(대표 이미지) 여부
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// 상품에 대한 메인 스키마
const ProductSchema = new Schema({
  _id: {
    // PK: Not Null, Unique
    // default: AUTO_INCREMENT   // 자동 증가 역할은 pre('save') 훅에서 처리
    type: Number,
  },
  name: {
    // 상품명
    type: String,
    required: true, // Not Null
    trim: true,     // 앞뒤 공백 제거(검색 편의 위해)
  },
  description: {
    // 상품 설명
    type: String,
    required: true,
  },
  originalPrice: {
    // 원가(정가)
    type: Number,
    required: true,
  },
  discountRate: {
    // 할인율 (0~1.0)
    type: Number,
    default: 0,
    min: 0,
    max: 1,
  },
  createdAt: {
    // 상품 등록일(생성일)
    type: Date,
    default: getKSTNow,
  },
    soldCount: {
    // 총 판매량 (주문 시 증가)
    type: Number,
    default: 0,
  },

  // 할인 기간(있으면 사용)
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },

  // 리뷰 통계(평균 평점 계산용)
  reviewCount: {
    type: Number,
    default: 0,
  },
  totalRatingSum: {
    type: Number,
    default: 0,
  },

  // 이미지 목록
  images: [ImageSchema],

  // 사이즈
  sizes: [Number],  // 예: [240, 245, 250]

  // 사이즈별 재고 (예: { "240": 10, "245": 5, "250": 0 })
  stock: {
    type: Map,
    of: Number,
    default: {},
  },

  // 소재
  materials: [String],  // 예: ["가볍고 시원한 tree", "면"]
  
  // 카테고리 (중복 선택 가능)
  // 예: ["라이프스타일"], ["슬립온"], ["라이프스타일", "슬립온"]
  categories: [String],
  
  // 리뷰 목록
  reviews: [ReviewSchema],
});

// INDEX: name  (상품명으로 검색 빠르게 하기 위함)
ProductSchema.index({ name: 1 });

// 저장 전에 _id 자동 증가 (기존 AUTO_INCREMENT 역할)
// default: AUTO_INCREMENT   // 자동 증가
ProductSchema.pre("save", async function (next) {
  if (this.isNew && (this._id == null)) {
    this._id = await getNextSequence("productId");
  }
  next();
});


const Product = mongoose.model("Product", ProductSchema);
export default Product;
