// 메종의 모노그램. 피아노 건반(흑건 3개)과 그랜드피아노 곡선을 겹쳐 만든 도형입니다.
// 실제 명품 브랜드의 로고를 쓰면 상표권 문제가 되므로 직접 그렸습니다.
function Monogram({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="monogram"
    >
      {/* 바깥 테두리 */}
      <rect x="1.5" y="1.5" width="45" height="45" rx="3" stroke="currentColor" strokeWidth="1.2" />
      {/* 그랜드피아노 뚜껑 곡선 */}
      <path
        d="M11 34c0-11 6-19 15-19 5 0 9 2 11 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* 건반 */}
      <path d="M11 34h26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="16" y="27" width="2.6" height="7" fill="currentColor" />
      <rect x="23" y="27" width="2.6" height="7" fill="currentColor" />
      <rect x="30" y="27" width="2.6" height="7" fill="currentColor" />
    </svg>
  );
}

export default Monogram;