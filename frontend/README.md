# 웹프로그래밍(03) Frontend - Allbirds Clone 텀프로젝트

React + TypeScript + Vite 기반 프론트엔드

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example`을 참고하여 `.env` 파일을 생성:
```
VITE_API_URL=http://localhost:3001/api
```

### 3. 개발 서버 실행
```bash
npm run dev
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행.

### 4. 빌드
```bash
npm run build
```

## 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
├── sections/        # 페이지 섹션
├── App.tsx          # 메인 앱 컴포넌트
└── index.tsx        # 진입점
```

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Radix UI Components
- Lucide React Icons

## 주요 컴포넌트

- Header: 네비게이션 및 검색
- Hero: 메인 슬라이더
- TrendingSection: 인기 제품 슬라이더
- MaterialSection: 소재 정보
- NewsletterSection: 뉴스레터 구독
- Footer: 푸터 정보
- CartDrawer: 장바구니 드로어

## 스타일링

Tailwind CSS 사용. `tailwind.config.js`에서 설정 커스터마이징.
