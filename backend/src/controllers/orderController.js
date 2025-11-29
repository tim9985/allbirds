import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// 유틸: 현재 가격 계산 (할인 반영)
function calcCurrentPrice(product) {
  const basePrice = product.originalPrice;
  const rate = product.discountRate || 0;

  // 할인 기간 체크 (있으면)
  const now = new Date();
  if (product.saleStartDate && product.saleEndDate) {
    if (now < product.saleStartDate || now > product.saleEndDate) {
      // 기간 외에는 할인 미적용
      return basePrice;
    }
  }

  return Math.round(basePrice * (1 - rate));
}

// 주문 생성: POST /api/orders
// 장바구니 -> 주문 생성
export async function createOrder(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // 유저 + 장바구니 가져오기
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const cart = user.cart || [];
    if (cart.length === 0) {
      return res.status(400).json({ message: "장바구니가 비어 있습니다." });
    }

    const productIds = cart.map((ci) => ci.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // productId → product 매핑
    const productMap = new Map();
    for (const p of products) {
      productMap.set(p._id, p);
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of cart) {
      const p = productMap.get(item.productId);
      if (!p) {
        // 상품이 삭제되었거나 없으면 스킵하거나 에러 처리
        return res.status(400).json({
          message: `상품(ID: ${item.productId})을 찾을 수 없습니다.`,
        });
      }

      const unitPrice = calcCurrentPrice(p); // 현재 가격(할인 반영)
      const lineTotal = unitPrice * item.quantity;

      orderItems.push({
        productId: p._id,
        productName: p.name,
        size: item.size,
        quantity: item.quantity,
        priceAtPurchase: unitPrice,
      });

      totalPrice += lineTotal;
    }

    // 주문 문서 생성
    const order = new Order({
      userId,
      totalPrice,
      items: orderItems,
    });

    const saved = await order.save();

    // 상품 판매량(soldCount) 업데이트
    const bulkOps = cart.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { soldCount: item.quantity } },
      },
    }));
    if (bulkOps.length > 0) {
      await Product.bulkWrite(bulkOps);
    }

    // 장바구니 비우기
    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "주문이 완료되었습니다.",
      order: saved,
    });
  } catch (err) {
    next(err);
  }
}

// 내 주문 내역 조회: GET /api/orders/my
export async function getMyOrders(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

//  단일 상품 주문: POST /api/orders/my
//  Body: { productId, size, quantity }
export async function createMyOrder(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { productId, size, quantity } = req.body;

    if (!productId || !size || !quantity) {
      return res.status(400).json({
        message: "productId, size, quantity는 필수입니다.",
      });
    }

    const product = await Product.findById(Number(productId));
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    const qty = Number(quantity);
    const sizeNum = Number(size);
    if (qty <= 0) {
      return res
        .status(400)
        .json({ message: "quantity는 1 이상이어야 합니다." });
    }

    const unitPrice = calcCurrentPrice(product); // 현재 가격(할인 반영)
    const lineTotal = unitPrice * qty;

    const orderItem = {
      productId: product._id,
      productName: product.name,
      size: sizeNum,
      quantity: qty,
      priceAtPurchase: unitPrice,
    };

    const order = new Order({
      userId,              // 세션에서 자동
      totalPrice: lineTotal,
      items: [orderItem],  // 단일 상품 주문
    });

    const saved = await order.save();

    // 상품 판매량 증가
    product.soldCount = (product.soldCount || 0) + qty;
    await product.save();

    // 요구사항: 결제 후 장바구니 비우기
    const user = await User.findById(userId);
    if (user) {
      user.cart = [];
      await user.save();
    }

    return res.status(201).json({
      message: "주문이 생성되었습니다.",
      order: saved,
    });
  } catch (err) {
    next(err);
  }
}