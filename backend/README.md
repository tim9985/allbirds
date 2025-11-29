<!-- 로그인 테스트 시 필요한 조치 -->
https://www.postman.com/downloads/
에서 설치


<!-- 필요한 npm 설치목록(backend 터미널에서) -->

npm install express cors
npm install mongoose
<!-- 쿠키 및 세션 -->
npm install express-session cookie-parser bcryptjs
<!-- 쿠키를 몽고DB에 저장 -->
npm install connect-mongo

<!-- 웹사이트 데이터 받아오기 -->
npm install axios

<!-- 주소 -->

백엔드: http://localhost:4000

회원가입: POST /api/users/register
로그인: POST /api/users/login
내 정보: GET /api/users/me

상품 목록: GET /api/products
상품 목록(정렬/검색/필터): GET /api/products?sort={}&category={카테고리}&size={사이즈}&minPrice={최소가격}&maxPrice={최대가격}&q={검색어}
실사용:
  GET /api/products?sort={recommend|latest|priceAsc|priceDesc|review}&category={카테고리}&size={사이즈}&minPrice={최소가격}&maxPrice={최대가격}&q={검색어}

상품 리뷰 목록: GET /api/products/:id/reviews
상품 리뷰 등록: POST /api/products/:id/reviews

상품 동기화(프론트 -> 백엔드): POST /api/products/sync-from-client

장바구니 조회: GET /api/cart
장바구니 추가: POST /api/cart
장바구니 수정: PATCH /api/cart
장바구니 상품 제거: DELETE /api/cart/item
장바구니 비우기: DELETE /api/cart

주문 생성: POST /api/orders
내 주문 내역: GET /api/orders/my

상품 등록(관리자): POST /api/admin/products
상품 수정(관리자): PATCH /api/admin/products/:id
할인 정책 변경(관리자): PATCH /api/admin/products/:id/discount
판매 현황 조회(관리자): GET /api/admin/sales?from=YYYY-MM-DD&to=YYYY-MM-DD

<!-- 각종 사전 정보 -->

사이즈:
220, 230, 240, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320

소재:
가볍고 시원한 tree, 면, 부드럽고 따뜻한 wool, 캔버스, 플라스틱 제로 식물성 가죽

카테고리(중복 가능):
라이프스타일, 슬립온

<!-- 사용 X -->
기능:
비즈니스, 캐주얼, 가벼운 산책, 러닝, 발수, 슬립온, 트레이닝, 슬리퍼, 클래식 스니커즈, 라이프스타일, 강한 접지력, 초경량, 트레일러닝, 등산, 애슬레저

모델:
대셔, 라운저, 러너, 스키퍼, 쿠리어, 크루저, 트레일, 파이퍼, 플라이어