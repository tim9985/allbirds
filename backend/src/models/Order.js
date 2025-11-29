// Order.js

import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { getNextSequence } from "../utils/AutoIncrement.js";
import { getKSTNow } from "../utils/dateHelper.js";

// 주문 항목(스냅샷)에 대한 서브 스키마
const OrderItemSchema = new Schema(
  {
    productId: {
      // 주문 당시 상품 ID (FK)
      type: Number,
      ref: 'Product',     // Product.js 참조
      required: true,
    },
    productName: {
      // 주문 당시 상품명(비정규화 스냅샷)
      type: String,
      required: true,
    },
    size: {
      // 주문한 사이즈(옵션)
      type: Number,
      required: true,
    },
    quantity: {
      // 주문 수량
      type: Number,
      required: true,
    },
    priceAtPurchase: {
      // 주문 당시 1개당 가격(할인 포함)
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// 주문(헤더)에 대한 메인 스키마
const OrderSchema = new Schema({
  _id: {
    type: Number,
  },
  userId: {
    // 주문한 사용자 ID(FK)
    type: Number,
    ref: 'User',
    required: true,
  },
  totalPrice: {
    // 주문 총액 (할인 적용된)
    type: Number,
    required: true,
  },
  createdAt: {
    // 주문(결제)일(날짜 및 시간)
    type: Date,
    default: getKSTNow,
  },

  items: [
    // 주문한 상품 목록 (스냅샷) - 나중에 상품정보가 바껴도 주문 내역은 주문 당시의 정보로 표시
    OrderItemSchema,
  ],
});

// userId에 대한 INDEX (사용자별 주문 조회용)
OrderSchema.index({ userId: 1 });

// 저장 전에 _id 자동 증가 (기존 AUTO_INCREMENT 역할)
OrderSchema.pre("save", async function (next) {
  if (this.isNew && (this._id == null)) {
    this._id = await getNextSequence("orderId");
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
