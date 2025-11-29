import { Schema, model } from "mongoose";

const CounterSchema = new Schema({
  _id: { type: String, required: true }, // "productId", "userId", "orderId" -> PK
  seq: { type: Number, default: 0 },
});

// 세 번째 인자로 컬렉션 이름을 명시적으로 지정해서
// MongoDB의 counters 컬렉션과 정확히 매칭
const Counter = model("Counter", CounterSchema, "counters");

export default Counter;