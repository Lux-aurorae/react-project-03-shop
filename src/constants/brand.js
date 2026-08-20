// 브랜드 이미지 경로.
//
// ⚠️ GitHub 이미지 주소는 반드시 아래 형태여야 합니다.
//    ✅ https://github.com/user-attachments/assets/{ID}      → 영구 주소
//    ❌ https://private-user-images.githubusercontent.com/...?jwt=...
//       → README 화면에서 우클릭·복사하면 나오는 임시 주소. 몇 분 뒤 만료됩니다.
//    영구 주소는 README를 "편집 모드"로 열면 볼 수 있습니다.

const A = "https://github.com/user-attachments/assets/";

// 네비게이션 로고 (public/images/logo.png — 없으면 Monogram SVG로 대체)
export const LOGO_SRC = "/images/logo.png";

// 랜딩 상단 배너 — 아틀리에 작업 장면
export const HERO_SRC = A + "3d161dbd-5236-40fc-a638-0b35a4b9edce";

// 아틀리에 페이지 (Atl1, Atl2)
export const ATELIER_IMAGES = [
  A + "3d161dbd-5236-40fc-a638-0b35a4b9edce",
  A + "ca8361c2-a611-48b0-83b0-f0a044d003f4",
];

// 메종 스토리 페이지 (maison, 브랜드 스토리)
export const STORY_IMAGE = A + "1f6ec246-c09c-4f86-830a-f6b9ef55fc72";
export const BRAND_IMAGE = A + "f178e918-c74a-4404-b52d-6ff5f4b2cde2";

// 컬렉션 (Reproducing Piano)
export const COLLECTION_IMAGE = A + "8d25757c-0be2-4977-8746-3700ef926bd6";