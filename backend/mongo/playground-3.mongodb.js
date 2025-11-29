use("allbirdsDB");

// =====================================================================
// 0) 기존 컬렉션 삭제
// =====================================================================
for (const { name } of db.getCollectionInfos()) {
  db.getCollection(name).drop();
}

// =====================================================================
// 1) counters 생성 (AUTO_INCREMENT)
// =====================================================================
db.counters.insertMany([
  { _id: "productId", seq: 0 },
  { _id: "userId", seq: 0 },
  { _id: "orderId", seq: 0 }
]);

function getNextSequence(name) {
  return db.counters.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { returnDocument: "after" }
  ).seq;
}

// =====================================================================
// 2) products 컬렉션 (id = int)
// =====================================================================
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "name", "description", "originalPrice"],
      properties: {
        _id: { bsonType: "int" }, // ★ 정수형 ID
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        originalPrice: { bsonType: ["int","long","double"] },
        discountRate: { bsonType: ["double","int"] },
        createdAt: { bsonType: "date" },

        images: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["url"],
            properties: {
              url: { bsonType: "string" },
              isThumbnail: { bsonType: "bool" }
            }
          }
        },
        categories: { bsonType: "array", items: { bsonType: "string" } },
        availableSizes: { bsonType: "array", items: { bsonType: "string" } },

        reviews: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["userId", "displayName", "rating"],
            properties: {
              userId: { bsonType: "int" },
              displayName: { bsonType: "string" },
              rating: { bsonType: ["int","double"] },
              comment: { bsonType: "string" },
              createdAt: { bsonType: "date" }
            }
          }
        }
      }
    }
  }
});

// =====================================================================
// 3) users 컬렉션 (id = int)
// =====================================================================
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "loginName", "password", "displayName"],
      properties: {
        _id: { bsonType: "int" }, // ★ 정수형 ID
        loginName: { bsonType: "string" },
        password: { bsonType: "string" },
        displayName: { bsonType: "string" },
        role: { enum: ["customer", "admin"] },
        createdAt: { bsonType: "date" },
        cart: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["productId", "size", "quantity"],
            properties: {
              productId: { bsonType: "int" },
              size: { bsonType: "string" },
              quantity: { bsonType: "int", minimum: 1 }
            }
          }
        }
      }
    }
  }
});

// loginName unique
db.users.createIndex({ loginName: 1 }, { unique: true });


// =====================================================================
// 4) orders 컬렉션 (id = int)
// =====================================================================
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "userId", "items", "totalPrice"],
      properties: {
        _id: { bsonType: "int" },    // ★ 정수형 ID
        userId: { bsonType: "int" },
        totalPrice: { bsonType: ["int","double","long"] },
        createdAt: { bsonType: "date" },
        items: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["productId", "productName", "size", "quantity", "priceAtPurchase"],
            properties: {
              productId: { bsonType: "int" },
              productName: { bsonType: "string" },
              size: { bsonType: "string" },
              quantity: { bsonType: "int" },
              priceAtPurchase: { bsonType: ["int","double","long"] }
            }
          }
        }
      }
    }
  }
});

db.orders.createIndex({ userId: 1 });

// =====================================================================
// 5) 샘플 데이터 (AUTO_INCREMENT 적용)
// =====================================================================

// product
const pId = getNextSequence("productId");
db.products.insertOne({
  _id: pId,
  name: "예시 운동화",
  description: "가벼운 러닝화",
  originalPrice: 89000,
  discountRate: 0.2,
  createdAt: new Date(),
  categories: ["라이프스타일", "러닝"],
  availableSizes: ["260","270"],
  images: [
    { url: "https://sfycdn.speedsize.com/4aadaad8-50d5-458f-88dd-2f364bf4d82e/https://allbirds.co.kr/cdn/shop/files/A12012_25Q3_Wool_Runner_NZ_Dark_Grey_Light_Grey_Sole_PDP_LEFT.png?v=1754551796", isThumbnail: true }
  ]
});

// user
const uId = getNextSequence("userId");
db.users.insertOne({
  _id: uId,
  loginName: "user01",
  password: "hashed_pw",
  displayName: "홍길동",
  role: "customer",
  createdAt: new Date(),
  cart: [
    { productId: pId, size: "270", quantity: 1 }
  ]
});

// order
const oId = getNextSequence("orderId");
db.orders.insertOne({
  _id: oId,
  userId: uId,
  totalPrice: 71200,
  createdAt: new Date(),
  items: [
    {
      productId: pId,
      productName: "예시 운동화",
      size: "270",
      quantity: 1,
      priceAtPurchase: 71200
    }
  ]
});

// =====================================================================
db.getCollectionInfos();
