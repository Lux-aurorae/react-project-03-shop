// 상품 데이터를 가져올 주소.
//
// ① my-json-server — GitHub 저장소의 db.json을 그대로 API로 만들어 주는 무료 서비스.
//    ⚠️ 저장소 "최상단"에 db.json이 있어야 하고 push되어 있어야 합니다.
// ② public/db.json — ①이 실패했을 때 쓰는 예비 경로.
export const PRIMARY_API =
  "https://my-json-server.typicode.com/Lux-aurorae/react-project-03-shop/products";

export const FALLBACK_API = "/db.json";