import Product from "../models/Product.js";
import Order from "../models/Order.js";

// 간단 관리자 체크 함수
function ensureAdmin(req, res) {
  if (!req.session.userId) {
    res.status(401).json({ message: "로그인이 필요합니다." });
    return false;
  }
  if (req.session.role !== "admin") {
    res.status(403).json({ message: "관리자 권한이 필요합니다." });
    return false;
  }
  return true;
}

// 관리자 상품 등록: POST /api/admin/products
export async function createProduct(req, res, next) {
  try {
    if (!ensureAdmin(req, res)) return;

    const {
      name,
      brand,
      description,
      originalPrice,
      discountRate,
      category,     // 단일 문자열
      sizes,
      materials,
      categories    // 배열
    } = req.body;

    if (!name || !originalPrice) {
      return res
        .status(400)
        .json({ message: "name과 originalPrice는 필수입니다." });
    }
    
    // categories/ category 둘 다 지원
    let cats = [];
    if (Array.isArray(categories)) {
      cats = categories;
    } else if (typeof category === "string" && category.trim()) {
      cats = [category.trim()];
    }

    const product = new Product({
      name,
      brand,
      description,
      originalPrice,
      discountRate: discountRate ?? 0,
      category,
      sizes: sizes ?? [],
      materials: materials ?? [],
      categories: cats,
    });

    const saved = await product.save();

    res.status(201).json({
      message: "상품이 등록되었습니다.",
      product: saved,
    });
  } catch (err) {
    next(err);
  }
}

// 관리자 상품 수정: PATCH /api/admin/products/:id
export async function updateProduct(req, res, next) {
  try {
    if (!ensureAdmin(req, res)) return;

    const id = Number(req.params.id); // AutoIncrement Number 기반이면 Number로 변환

    const {
      name,
      brand,
      description,
      originalPrice,
      discountRate,
      category,
      sizes,
      materials,
      categories
    } = req.body;

    const update = {};

    if (name !== undefined) update.name = name;
    if (brand !== undefined) update.brand = brand;
    if (description !== undefined) update.description = description;
    if (originalPrice !== undefined) update.originalPrice = originalPrice;
    if (discountRate !== undefined) update.discountRate = discountRate;
    if (category !== undefined) update.category = category;
    if (sizes !== undefined) update.sizes = sizes;
    if (materials !== undefined) update.materials = materials;
    
    // categories를 보냈을 때만 categories 필드를 건드림
    if (categories !== undefined || category !== undefined) {
      if (Array.isArray(categories)) {
        update.categories = categories;                // 예: ["슬립온"]
      } else if (typeof category === "string" && category.trim()) {
        update.categories = [category.trim()];         // 예: "슬립온"
      } else {
        // 명시적으로 비우고 싶을 때 null/[] 보낼 수 있도록
        update.categories = [];
      }
    }

    const updated = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    res.json({
      message: "상품이 수정되었습니다.",
      product: updated,
    });
  } catch (err) {
    next(err);
  }
}

// 할인 정책만 수정: PATCH /api/admin/products/:id/discount
export async function updateDiscount(req, res, next) {
  try {
    if (!ensureAdmin(req, res)) return;

    const id = Number(req.params.id);
    const { discountRate, saleStartDate, saleEndDate } = req.body;

    const update = {};
    if (discountRate !== undefined) update.discountRate = discountRate;
    if (saleStartDate !== undefined)
      update.saleStartDate = saleStartDate ? new Date(saleStartDate) : null;
    if (saleEndDate !== undefined)
      update.saleEndDate = saleEndDate ? new Date(saleEndDate) : null;

    const updated = await Product.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    res.json({
      message: "할인 정책이 수정되었습니다.",
      product: updated,
    });
  } catch (err) {
    next(err);
  }
}

// 판매 현황: GET /api/admin/sales?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function getSalesSummary(req, res, next) {
  try {
    if (!ensureAdmin(req, res)) return;

    const { from, to } = req.query;

    const fromDate = from ? new Date(from) : new Date("1970-01-01");
    const toDate = to ? new Date(to) : new Date();

    const summary = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          productName: { $first: "$items.productName" },
          totalQuantity: { $sum: "$items.quantity" },
          totalSales: {
            $sum: {
              $multiply: ["$items.priceAtPurchase", "$items.quantity"],
            },
          },
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    const totalAllSales = summary.reduce(
      (acc, cur) => acc + cur.totalSales,
      0
    );

    res.json({
      from: fromDate,
      to: toDate,
      totalAllSales,
      summary,
    });
  } catch (err) {
    next(err);
  }
}