import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * 관리자 전용 컨트롤러
 * 권한 체크는 app.js에서
 *   app.use("/api/admin", requireLogin, requireAdmin, adminRoutes);
 * 로 처리하므로 여기서는 별도 체크를 하지 않는다.
 */

// 관리자 상품 목록: GET /api/admin/products
export async function getAdminProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    const result = products.map((p) => {
      // 썸네일 이미지
      const thumb =
        p.images?.find((img) => img.isThumbnail)?.url ||
        p.images?.[0]?.url ||
        null;

      // sizes: [240,245,250] + stock: Map → [{ size: 240, available: true }, ...]
      const sizeObjects = (p.sizes || []).map((sizeNum) => {
        const stockMap = p.stock || new Map();
        let stockValue;
        if (typeof stockMap.get === "function") {
          stockValue = stockMap.get(String(sizeNum));
        } else {
          stockValue = stockMap[String(sizeNum)];
        }
        const available = (stockValue ?? 0) > 0;
        return { size: sizeNum, available };
      });

      return {
        _id: p._id,
        name: p.name,
        price: p.originalPrice,
        discountRate: Math.round((p.discountRate || 0) * 100),
        sizes: sizeObjects,
        image: thumb,
      };
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// 관리자 상품 등록: POST /api/admin/products
export async function createProduct(req, res, next) {
  try {
    const {
      name,
      description,
      price,
      category,
      material,
      types,
      discountRate,
      sizes,
    } = req.body;

    // 필수 필드 검증
    if (!name || !description || !price) {
      return res.status(400).json({ 
        message: "name, description, price는 필수입니다." 
      });
    }

    // 이미지 파일 확인 (multer로 업로드됨)
    if (!req.file) {
      return res.status(400).json({ 
        message: "상품 이미지를 업로드해주세요." 
      });
    }

    // 이미지 URL 생성 (/img/newProduct/filename.jpg)
    const imageUrl = `/img/newProduct/${req.file.filename}`;

    // sizes JSON 파싱
    let parsedSizes = {};
    let sizeArray = [];
    let stockMap = {};

    try {
      parsedSizes = JSON.parse(sizes);
      
      // selectedSizes 객체에서 사이즈 배열과 재고 맵 생성
      Object.entries(parsedSizes).forEach(([size, data]) => {
        if (data.available) {
          sizeArray.push(Number(size));
          stockMap[size] = Number(data.stock) || 0;
        }
      });
    } catch (e) {
      return res.status(400).json({ 
        message: "사이즈 데이터 형식이 올바르지 않습니다." 
      });
    }

    if (sizeArray.length === 0) {
      return res.status(400).json({ 
        message: "최소 1개 이상의 사이즈를 선택해주세요." 
      });
    }

    // types JSON 파싱
    let typesArray = [];
    try {
      typesArray = JSON.parse(types);
    } catch (e) {
      typesArray = [types]; // 단일 값인 경우
    }

    if (!Array.isArray(typesArray) || typesArray.length === 0) {
      return res.status(400).json({ 
        message: "최소 1개 이상의 타입을 선택해주세요." 
      });
    }

    // 카테고리 매핑 (슬립온, 라이프스타일)
    const categoryMap = {
      'slipon': '슬립온',
      'lifestyle': '라이프스타일'
    };
    const categories = typesArray.map(t => categoryMap[t] || t);

    // 소재 매핑
    const materialMap = {
      'wool': '부드럽고 따뜻한 wool',
      'tree': '가볍고 시원한 tree'
    };
    const materialText = materialMap[material] || material;

    const product = new Product({
      name,
      description,
      originalPrice: Number(price),
      discountRate: Number(discountRate) / 100 || 0, // % → 0~1 변환
      images: [{ url: imageUrl, isThumbnail: true }],
      sizes: sizeArray.sort((a, b) => a - b),
      stock: stockMap,
      materials: [materialText],
      categories,
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

// 가용 사이즈 변경: PUT /api/admin/products/:id/sizes
export async function updateProductSizes(req, res, next) {
  try {
    const id = req.params.id;
    const { sizes } = req.body;
    
    if (!sizes || typeof sizes !== "object") {
      return res.status(400).json({ message: "sizes 데이터가 올바르지 않습니다." });
    }

    // true 인 사이즈만 Number 배열로 추출
    const enabledSizes = Object.entries(sizes)
      .filter(([, available]) => available)
      .map(([size]) => Number(size))
      .filter((n) => !Number.isNaN(n));

    const product = await Product.findByIdAndUpdate(
      id,
      { sizes: enabledSizes },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    res.json({
      message: "사이즈가 업데이트되었습니다.",
      product,
    });
  } catch (err) {
    next(err);
  }
}

// 관리자 상품 수정: PATCH /api/admin/products/:id
export async function updateProduct(req, res, next) {
  try {

    const id = req.params.id; // AutoIncrement Number 기반이면 Number로 변환

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

// 관리자 할인 정책 변경: PATCH /api/admin/products/:id/discount
export async function updateDiscount(req, res, next) {
  try {

    const id = req.params.id;
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

// 관리자 재고 관리: PATCH /api/admin/products/:id/stock
export async function updateStock(req, res, next) {
  try {

    const id = req.params.id;
    const { size, quantity, action } = req.body; // action: 'add', 'set', 'remove'

    if (!size) {
      return res.status(400).json({ message: "사이즈는 필수입니다." });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    const sizeStr = size.toString();

    if (action === 'remove') {
      // 사이즈 완전 삭제
      product.sizes = product.sizes.filter(s => s.toString() !== sizeStr);
      if (product.stock.has(sizeStr)) {
        product.stock.delete(sizeStr);
      }
    } else if (action === 'add') {
      // 수량 추가
      const currentStock = product.stock.get(sizeStr) || 0;
      const newStock = currentStock + Number(quantity || 0);
      product.stock.set(sizeStr, Math.max(0, newStock));
      
      // 사이즈가 없으면 추가
      if (!product.sizes.includes(Number(size))) {
        product.sizes.push(Number(size));
        product.sizes.sort((a, b) => a - b);
      }
    } else if (action === 'set') {
      // 수량 설정
      product.stock.set(sizeStr, Number(quantity || 0));
      
      // 사이즈가 없으면 추가
      if (!product.sizes.includes(Number(size))) {
        product.sizes.push(Number(size));
        product.sizes.sort((a, b) => a - b);
      }
    } else {
      return res.status(400).json({ 
        message: "action은 'add', 'set', 'remove' 중 하나여야 합니다." 
      });
    }

    await product.save();

    res.json({
      message: "재고가 업데이트되었습니다.",
      product,
    });
  } catch (err) {
    next(err);
  }
}

// 판매 현황: GET /api/admin/sales?from=YYYY-MM-DD&to=YYYY-MM-DD
export async function getSalesSummary(req, res, next) {
  try {
    const { from, to } = req.query;

    // 시작일: 00:00:00 (UTC)
    const fromDate = from ? new Date(from + 'T00:00:00.000Z') : new Date("1970-01-01T00:00:00.000Z");
    
    // 종료일: 23:59:59 (UTC)
    const toDate = to ? new Date(to + 'T23:59:59.999Z') : new Date();
    if (!to) {
      toDate.setUTCHours(23, 59, 59, 999);
    }

    const summary = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: fromDate, $lte: toDate },
        },
      },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$items.productId",
          productName: { $first: "$items.productName" },
          originalPrice: { $first: "$productDetails.originalPrice" },
          discountRate: { $first: "$productDetails.discountRate" },
          image: { $first: { $arrayElemAt: ["$productDetails.images.url", 0] } },
          totalQuantity: { $sum: "$items.quantity" },
          totalSales: {
            $sum: {
              $multiply: ["$items.priceAtPurchase", "$items.quantity"],
            },
          },
          avgPrice: { $avg: "$items.priceAtPurchase" }
        },
      },
      { $sort: { totalSales: -1 } },
    ]);

    const totalAllSales = summary.reduce(
      (acc, cur) => acc + cur.totalSales,
      0
    );
    
    const totalQuantity = summary.reduce(
      (acc, cur) => acc + cur.totalQuantity,
      0
    );

    const products = summary.map(item => ({
      productId: item._id,
      name: item.productName,
      image: item.image,
      originalPrice: item.originalPrice || 0,
      discountRate: item.discountRate || 0,
      discountedPrice: Math.round(item.avgPrice || 0),
      quantitySold: item.totalQuantity,
      revenue: item.totalSales
    }));

    res.json({
      from: fromDate,
      to: toDate,
      totalRevenue: totalAllSales,
      totalSales: totalQuantity,
      products
    });
  } catch (err) {
    next(err);
  }
}