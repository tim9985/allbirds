// Review.js - 리뷰 모델
import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import { getNextSequence } from "../utils/AutoIncrement.js";
import { getKSTNow } from "../utils/dateHelper.js";

const ReviewSchema = new Schema({
  _id: {
    type: Number,
  },
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Number,
    ref: 'Product',
    required: true,
  },
  orderId: {
    type: Number,
    ref: 'Order',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  displayName: {
    // 작성자 이름 (스냅샷)
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: getKSTNow,
  },
});

// Auto-increment _id
ReviewSchema.pre("save", async function (next) {
  if (this.isNew) {
    this._id = await getNextSequence("reviewId");
  }
  next();
});

const Review = model("Review", ReviewSchema);
export default Review;
