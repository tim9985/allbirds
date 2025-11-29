// 1부터 시작해서 정수형으로 증가
// id 지정에 사용

import Counter from "../models/Counter.js";

export async function getNextSequence(name) {
  const ret = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return ret.seq;
}


export default { getNextSequence };
