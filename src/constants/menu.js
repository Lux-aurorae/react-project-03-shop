// 네비게이션 메뉴. 하드코딩 대신 배열로 관리하고 map()으로 렌더링합니다.
// path가 있으면 그 주소로, 없으면 아직 준비 중인 메뉴입니다.
export const MENU_LIST = [
  { label: "그랜드 피아노", path: "/?category=grand" },
  { label: "업라이트", path: "/?category=upright" },
  { label: "컬렉션", path: "/?category=all" },
  { label: "아틀리에", path: "/atelier" },
  { label: "메종 스토리", path: "/story" },
];