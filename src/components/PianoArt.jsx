// 그랜드피아노 실루엣. 상품 사진 대신 직접 그린 SVG를 씁니다.
//
// 실제 제품 사진은 저작권이 있고, 무료 이미지는 브랜드 톤과 맞지 않습니다.
// 직접 그리면 8개 상품의 톤이 완전히 통일되고, finish 색만 바꿔 변화를 줄 수 있습니다.
function PianoArt({ finish = "#141110", accent = "#b8964f" }) {
  return (
    <svg viewBox="0 0 320 200" className="art" aria-hidden="true">
      {/* 바닥 그림자 */}
      <ellipse cx="160" cy="176" rx="120" ry="7" fill={finish} opacity="0.12" />

      {/* 열린 뚜껑 */}
      <path
        d="M62 108 C 74 52, 132 30, 196 36 L262 44 L214 82 C 168 74, 108 82, 78 110 Z"
        fill={finish}
        opacity="0.9"
      />
      <path
        d="M62 108 C 74 52, 132 30, 196 36 L262 44"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.55"
      />

      {/* 본체 */}
      <path
        d="M60 110 C 72 62, 130 44, 194 50 C 236 54, 254 74, 246 96 C 238 120, 190 132, 132 130 L74 128 Z"
        fill={finish}
      />

      {/* 건반 */}
      <rect x="58" y="126" width="106" height="15" rx="2" fill="#f6f2e9" />
      <g fill={finish}>
        <rect x="66" y="126" width="4" height="9" />
        <rect x="78" y="126" width="4" height="9" />
        <rect x="96" y="126" width="4" height="9" />
        <rect x="108" y="126" width="4" height="9" />
        <rect x="120" y="126" width="4" height="9" />
        <rect x="138" y="126" width="4" height="9" />
        <rect x="150" y="126" width="4" height="9" />
      </g>

      {/* 다리 */}
      <rect x="72" y="141" width="6" height="32" rx="2" fill={finish} />
      <rect x="214" y="118" width="6" height="52" rx="2" fill={finish} />

      {/* 페달 */}
      <path d="M75 168 L75 174 M69 176 h12" stroke={finish} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default PianoArt;