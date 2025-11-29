// MongoDB 초기 데이터 삽입 스크립트
// 실행 방법: MongoDB Compass 또는 VS Code MongoDB Extension 사용

use("allbirdsDB");

// =====================================================================
// 1) 기존 데이터 삭제 (초기화)
// =====================================================================
db.products.deleteMany({});
db.users.deleteMany({});
db.orders.deleteMany({});
db.counters.deleteMany({});

// =====================================================================
// 2) counters 초기화 (AUTO_INCREMENT)
// =====================================================================
db.counters.insertMany([
  { _id: "productId", seq: 0 },
  { _id: "userId", seq: 0 },
  { _id: "orderId", seq: 0 }
]);

// =====================================================================
// 3) 상품 데이터 삽입
// =====================================================================

// 사이즈 풀 (모든 상품에서 랜덤하게 선택)
const allSizes = [220, 230, 240, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320];

// 랜덤 사이즈 선택 함수 (5~10개 사이)
function getRandomSizes() {
  const count = Math.floor(Math.random() * 6) + 5; // 5~10개
  const shuffled = [...allSizes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).sort((a, b) => a - b);
}

// 상품 목록 (이미지 경로 기반)
const products = [
  // Tree + Lifestyle
  {
    name: "트리 대셔 2",
    description: "가벼운 유칼립투스 소재로 제작된 프리미엄 러닝화. 통기성이 뛰어나며 일상에서도 편안하게 착용 가능합니다.",
    originalPrice: 149000,
    discountRate: 0.15,
    materials: ["가볍고 시원한 tree"],
    categories: ["라이프스타일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/tree/lifestyle/shoe_tree_dasher2/shoe_tree_dasher2_black.png", isThumbnail: true },
      { url: "/img/products/tree/lifestyle/shoe_tree_dasher2/shoe_tree_dasher2_blizzard.png", isThumbnail: false }
    ]
  },
  {
    name: "트리 글라이더",
    description: "미니멀한 디자인의 트리 소재 스니커즈. 가볍고 시원한 착용감으로 여름철에 최적화된 제품입니다.",
    originalPrice: 139000,
    discountRate: 0.20,
    materials: ["가볍고 시원한 tree"],
    categories: ["라이프스타일", "신제품"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/tree/lifestyle/shoe_tree_glider/shoe_tree_glider_deep_blizzard.png", isThumbnail: true },
      { url: "/img/products/tree/lifestyle/shoe_tree_glider/shoe_tree_glider_deep_navy.png", isThumbnail: false }
    ]
  },
  {
    name: "트리 스트라이더",
    description: "러닝과 일상 모두에 완벽한 올라운드 스니커즈. 뛰어난 지지력과 편안함을 동시에 제공합니다.",
    originalPrice: 159000,
    discountRate: 0.10,
    materials: ["가볍고 시원한 tree"],
    categories: ["라이프스타일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/tree/lifestyle/shoe_tree_strider/shoe_tree_strider_natural_black.png", isThumbnail: true },
      { url: "/img/products/tree/lifestyle/shoe_tree_strider/shoe_tree_strider_rugged_beige.png", isThumbnail: false }
    ]
  },

  // Tree + Slipon
  {
    name: "트리 라운저",
    description: "손쉽게 신고 벗을 수 있는 슬립온 스타일. 집 안팎에서 편안하게 착용할 수 있는 제품입니다.",
    originalPrice: 119000,
    discountRate: 0.25,
    materials: ["가볍고 시원한 tree"],
    categories: ["슬립온", "세일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/tree/slipon/shoe_tree_lounger/shoe_tree_lounger_kaikora_white.png", isThumbnail: true },
      { url: "/img/products/tree/slipon/shoe_tree_lounger/shoe_tree_lounger_lilac.png", isThumbnail: false }
    ]
  },

  // Tree + Slipon & Lifestyle
  {
    name: "트리 대셔 릴레이",
    description: "활동적인 라이프스타일을 위한 경량 슬립온. 러닝과 일상 모두에서 뛰어난 퍼포먼스를 발휘합니다.",
    originalPrice: 145000,
    discountRate: 0.18,
    materials: ["가볍고 시원한 tree"],
    categories: ["슬립온", "라이프스타일", "신제품"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/tree/slipon&lifestyle/shoe_tree_dasher_relay/shoe_tree_dasher_relay_buoyant_orange.png", isThumbnail: true },
      { url: "/img/products/tree/slipon&lifestyle/shoe_tree_dasher_relay/shoe_tree_dasher_relay_hazy_beige.png", isThumbnail: false }
    ]
  },

  // Wool + Lifestyle
  {
    name: "울 스트라이더",
    description: "부드러운 메리노 울 소재의 프리미엄 러닝화. 보온성과 통기성을 동시에 갖춘 사계절용 제품입니다.",
    originalPrice: 169000,
    discountRate: 0.12,
    materials: ["부드럽고 따뜻한 wool"],
    categories: ["라이프스타일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/wool/lifestyle/shoe_wool_strider/shoe_wool_strider_dark_grey.png", isThumbnail: true },
      { url: "/img/products/wool/lifestyle/shoe_wool_strider/shoe_wool_strider_rugged_beige.png", isThumbnail: false }
    ]
  },

  // Wool + Slipon
  {
    name: "울 크루저",
    description: "편안한 슬립온 스타일의 울 스니커즈. 따뜻하고 부드러운 착용감이 특징입니다.",
    originalPrice: 129000,
    discountRate: 0.22,
    materials: ["부드럽고 따뜻한 wool"],
    categories: ["슬립온", "세일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/wool/slipon/shoe_wool_crusier/shoe_wool_crusier_natural_black.png", isThumbnail: true },
      { url: "/img/products/wool/slipon/shoe_wool_crusier/shoe_wool_crusier_rugged_beige.png", isThumbnail: false }
    ]
  },
  {
    name: "울 라운저",
    description: "집에서도 밖에서도 편안한 울 슬립온. 포근한 메리노 울이 발을 감싸줍니다.",
    originalPrice: 125000,
    discountRate: 0.30,
    materials: ["부드럽고 따뜻한 wool"],
    categories: ["슬립온", "세일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/wool/slipon/shoe_wool_lounger/shoe_wool_lounger_lux_beige.png", isThumbnail: true },
      { url: "/img/products/wool/slipon/shoe_wool_lounger/shoe_wool_lounger_pitaya.png", isThumbnail: false }
    ]
  },

  // Wool + Slipon & Lifestyle
  {
    name: "울 코듀로이",
    description: "세련된 코듀로이 디자인의 울 스니커즈. 클래식한 감성과 현대적인 편안함의 조화입니다.",
    originalPrice: 155000,
    discountRate: 0.15,
    materials: ["부드럽고 따뜻한 wool", "면"],
    categories: ["슬립온", "라이프스타일", "신제품"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/wool/slipon&lifestyle/shoe_wool_corduroy/shoe_wool_corduroy_darktan.png", isThumbnail: true },
      { url: "/img/products/wool/slipon&lifestyle/shoe_wool_corduroy/shoe_wool_corduroy_rugged_darknavy.png", isThumbnail: false }
    ]
  },
  {
    name: "울 라운저 우븐",
    description: "직조 기법으로 제작된 프리미엄 울 라운저. 독특한 텍스처와 뛰어난 내구성을 자랑합니다.",
    originalPrice: 135000,
    discountRate: 0.20,
    materials: ["부드럽고 따뜻한 wool"],
    categories: ["슬립온", "라이프스타일"],
    sizes: getRandomSizes(),
    images: [
      { url: "/img/products/wool/slipon&lifestyle/shoe_wool_lounger_woven/shoe_wool_lounger_woven_natural_black.png", isThumbnail: true },
      { url: "/img/products/wool/slipon&lifestyle/shoe_wool_lounger_woven/shoe_wool_lounger_woven_natural_white.png", isThumbnail: false }
    ]
  }
];

// 상품 삽입
const insertedProducts = [];
for (const product of products) {
  const result = db.counters.findOneAndUpdate(
    { _id: "productId" },
    { $inc: { seq: 1 } },
    { returnDocument: "after" }
  );
  
  const newProduct = {
    _id: result.seq,
    name: product.name,
    description: product.description,
    originalPrice: product.originalPrice,
    discountRate: product.discountRate,
    createdAt: new Date(),
    soldCount: Math.floor(Math.random() * 500), // 랜덤 판매량 (0~499)
    saleStartDate: null,
    saleEndDate: null,
    reviewCount: 0,
    totalRatingSum: 0,
    images: product.images,
    sizes: product.sizes,
    materials: product.materials,
    categories: product.categories,
    reviews: []
  };
  
  db.products.insertOne(newProduct);
  insertedProducts.push(newProduct);
}

// =====================================================================
// 4) 테스트 사용자 생성 (비밀번호: test1234)
// =====================================================================
const result = db.counters.findOneAndUpdate(
  { _id: "userId" },
  { $inc: { seq: 1 } },
  { returnDocument: "after" }
);

// bcrypt 해시값 (test1234를 해싱한 값)
const hashedPassword = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

db.users.insertOne({
  _id: result.seq,
  loginName: "test",
  password: hashedPassword,
  displayName: "테스트 유저",
  role: "customer",
  cart: [],
  createdAt: new Date()
});

// =====================================================================
// 5) 관리자 계정 생성 (비밀번호: admin1234)
// =====================================================================
const adminResult = db.counters.findOneAndUpdate(
  { _id: "userId" },
  { $inc: { seq: 1 } },
  { returnDocument: "after" }
);

// bcrypt 해시값 (admin1234를 해싱한 값)
const adminHashedPassword = "$2a$10$8K1p/a0dL3yNzJ7NXh3HHuu.R5.9sUcB7LQxqPHZC3fO/7Y3LNEgW";

db.users.insertOne({
  _id: adminResult.seq,
  loginName: "admin",
  password: adminHashedPassword,
  displayName: "관리자",
  role: "admin",
  cart: [],
  createdAt: new Date()
});

// =====================================================================
// 결과 확인
// =====================================================================
print("\n===== 데이터 삽입 완료 =====");
print(`상품 개수: ${db.products.countDocuments()}`);
print(`사용자 개수: ${db.users.countDocuments()}`);
print("\n===== 삽입된 상품 목록 =====");
db.products.find({}, { name: 1, originalPrice: 1, categories: 1, materials: 1 }).forEach(printjson);
print("\n===== 생성된 사용자 =====");
db.users.find({}, { loginName: 1, displayName: 1, role: 1 }).forEach(printjson);
