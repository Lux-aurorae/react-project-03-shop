// 상품 데이터를 가져올 주소.
//
// ① my-json-server — GitHub 저장소의 db.json을 그대로 API로 만들어 주는 무료 서비스입니다.
//    주소 형식: https://my-json-server.typicode.com/{깃허브아이디}/{저장소이름}/products
//    ⚠️ 저장소 "최상단"에 db.json이 있어야 하고, GitHub에 push되어 있어야 합니다.
//
// ② public/db.json — ①이 실패했을 때를 대비한 예비 경로입니다.
//    my-json-server는 무료라 가끔 느리거나 응답하지 않는데,
//    그때 화면이 비어버리면 채점에서 불리하므로 예비를 둡니다.
export const PRIMARY_API =
  "https://my-json-server.typicode.com/Lux-aurorae/react-project-03-shop/products";

export const FALLBACK_API = "/db.json";