import User from "../models/User.js";
import Product from "../models/Product.js";

// 장바구니 조회: GET /api/cart
export async function getCart(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    // cart.productId 를 실제 Product 문서로 채워서 반환
    const user = await User.findById(userId).populate("cart.productId").lean();
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // cart가 없으면 빈 배열
    const cart = user.cart || [];

    res.json({ cart });
  } catch (err) {
    next(err);
  }
}

// 장바구니에 상품 추가: POST /api/cart
// body: { productId, size, quantity }
export async function addToCart(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { productId, size, quantity = 1 } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "productId와 size는 필수입니다." });
    }

    // 상품 존재 여부 확인 (옵션이지만 안전하게)
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 이미 같은 상품 + 같은 사이즈가 장바구니에 있으면 수량 증가
    const qty = Number(quantity) || 1;
    const existingItem = user.cart.find(
      (item) =>
        item.productId === productId &&
        String(item.size) === String(size)
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      user.cart.push({
        productId,
        size,
        quantity: qty,
      });
    }

    await user.save();

    res.status(201).json({ message: "장바구니에 담았습니다.", cart: user.cart });
  } catch (err) {
    next(err);
  }
}

// 장바구니 수량 변경: PATCH /api/cart
// body: { productId, size, quantity }
export async function updateCartItem(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { productId, size, quantity } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "productId와 size는 필수입니다." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const item = user.cart.find(
      (ci) =>
        ci.productId === productId &&
        String(ci.size) === String(size)
    );

    if (!item) {
      return res.status(404).json({ message: "장바구니에 해당 상품이 없습니다." });
    }

    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      // 수량 0 이하면 삭제
      user.cart = user.cart.filter(
        (ci) =>
          !(ci.productId === productId &&
            String(ci.size) === String(size))
      );
    } else {
      item.quantity = qty;
    }

    await user.save();

    res.json({ message: "장바구니가 업데이트되었습니다.", cart: user.cart });
  } catch (err) {
    next(err);
  }
}

// 장바구니에서 상품 제거: DELETE /api/cart/item
// body: { productId, size }
export async function removeCartItem(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "productId와 size는 필수입니다." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const beforeLen = user.cart.length;

    user.cart = user.cart.filter(
      (ci) =>
        !(ci.productId === productId &&
          String(ci.size) === String(size))
    );

    if (user.cart.length === beforeLen) {
      return res.status(404).json({ message: "장바구니에 해당 상품이 없습니다." });
    }

    await user.save();

    res.json({ message: "장바구니에서 제거되었습니다.", cart: user.cart });
  } catch (err) {
    next(err);
  }
}

// 장바구니 비우기: DELETE /api/cart
export async function clearCart(req, res, next) {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    user.cart = [];
    await user.save();

    res.json({ message: "장바구니를 비웠습니다." });
  } catch (err) {
    next(err);
  }
}