// 제품 데이터 스키마
// 이미지 경로는 /img/{productId}/{filename} 형태로 구성됨

export const products = {
  'tree-runners': {
    id: 'tree-runners',
    name: '남성 트리 러너',
    category: 'lifestyle',
    material: 'tree',
    price: 78000,
    originalPrice: 150000,
    colors: [
      {
        id: 'natural-white',
        name: 'Natural White (Natural Sole)',
        filename: 'tree-runners-natural-white.avif'
      },
      {
        id: 'blizzard',
        name: 'Blizzard (White Sole)',
        filename: 'tree-runners-blizzard.avif'
      },
      {
        id: 'true-black',
        name: 'True Black (Black Sole)',
        filename: 'tree-runners-true-black.avif'
      }
    ],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315],
    availableSizes: [235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295]
  },
  'wool-runners': {
    id: 'wool-runners',
    name: '남성 울 러너',
    category: 'lifestyle',
    material: 'wool',
    price: 78000,
    originalPrice: 150000,
    colors: [
      {
        id: 'true-black',
        name: '트루 블랙 (크림)',
        filename: 'wool-runners-true-black.webp'
      }
    ],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315],
    availableSizes: [260, 270]
  },
  'wool-dasher-mizzle': {
    id: 'wool-dasher-mizzle',
    name: '남성 울 대셔 미즐',
    category: 'lifestyle',
    material: 'wool',
    price: 98000,
    originalPrice: 200000,
    colors: [
      {
        id: 'stony-cream',
        name: '스토니 크림 (내추럴 화이트)',
        filename: 'wool-dasher-mizzle-stony-cream.png'
      }
    ],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315],
    availableSizes: [260, 265, 270, 275, 280]
  },
  'wool-runner-nz': {
    id: 'wool-runner-nz',
    name: '남성 울 러너 NZ',
    category: 'lifestyle',
    material: 'wool',
    price: 119000,
    originalPrice: 170000,
    colors: [
      {
        id: 'natural-black',
        name: '내추럴 블랙 (내추럴 블랙)',
        filename: 'wool-runner-nz-natural-black.png'
      }
    ],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315],
    availableSizes: [260, 265, 270, 275, 280]
  },
  'wool-runner-go': {
    id: 'wool-runner-go',
    name: '남성 울 러너 고',
    category: 'lifestyle',
    material: 'wool',
    price: 98000,
    originalPrice: 170000,
    colors: [
      {
        id: 'dark-grey',
        name: '다크 그레이 (라이트 그레이)',
        filename: 'wool-runner-go-dark-grey.webp'
      }
    ],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315],
    availableSizes: [250, 260, 270, 280, 290]
  },
  'canvas-piper': {
    id: 'canvas-piper',
    name: '남성 캔버스 파이퍼',
    category: 'slipon',
    material: 'canvas',
    price: 78000,
    originalPrice: 150000,
    colors: [
      {
        id: 'natural-black',
        name: '뉴 내추럴 블랙 (내추럴 블랙)',
        filename: 'canvas-piper-natural-black.png'
      }
    ],
    sizes: [230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315],
    availableSizes: [265, 270, 275, 285]
  }
};

// 이미지 경로 생성 헬퍼 함수
export const getImagePath = (productId, filename) => {
  return `/img/${productId}/${filename}`;
};

// 제품 ID로 제품 데이터 가져오기
export const getProduct = (productId) => {
  return products[productId];
};

// 카테고리별 제품 필터링
export const getProductsByCategory = (category) => {
  return Object.values(products).filter(product => product.category === category);
};

// 소재별 제품 필터링
export const getProductsByMaterial = (material) => {
  return Object.values(products).filter(product => product.material === material);
};

// 모든 제품 목록 가져오기
export const getAllProducts = () => {
  return Object.values(products);
};
