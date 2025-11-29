import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { getNextSequence } from "../utils/AutoIncrement.js";
import { getKSTNow } from "../utils/dateHelper.js";

// required: true === Not Null

// 장바구니 항목에 대한 서브 스키마
const CartItemSchema = new Schema(
  {
    //  별도 id없이 Product의 id + 배열 index로 구분

    productId: {
      type: Number,
      ref: "Product",     // Product.js 참조
      required: true,     // Not Null
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      // 수량
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    // INDEX: productId  // 검색을 위한 인덱스
    // 밑에 따로 구현
  },
  { _id: false }
);

// 서브 스키마 인덱스 추가
CartItemSchema.index({ productId: 1 });

// 사용자 스키마
const UserSchema = new Schema({
  _id: {
    type: Number,
  },

  loginName: {
    // 로그인 할 때 사용하는 이름
    type: String,
    required: true,
    unique: true, // 로그인 이름(유저ID)은 고유해야 함 
    trim: true,
    lowercase: true,
  },

    password: {
    // 보안조치(해싱 등) 필요
    type: String,
    required: true,
  },

  displayName: {
    // 실제로 표시될 이름
    type: String,
    required: true,
  },

  role: {
    // 권한 설정(관리자 페이지 접근권한)
    type: String,
    enum: ["customer", "admin"], // 사용자 및 관리자
    default: "customer",
  },

  cart: [CartItemSchema], // 장바구니 배열

  createdAt: {
    type: Date,
    default: getKSTNow,
  },

  // INDEX: loginName
  // 아래 Schema.index()로 구현
});

// 인덱스 실제 적용(loginName이 이미 unique라 필요없음)
// UserSchema.index({ loginName: 1 }, { unique: true });

// 저장 전에 _id 자동 증가 (기존 AUTO_INCREMENT 역할)
UserSchema.pre("save", async function (next) {
  if (this.isNew && this._id == null) {
    this._id = await getNextSequence("userId");
  }
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;