import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Monogram from "./Monogram.jsx";
import { MENU_LIST } from "../constants/menu.js";

// 모든 페이지에 공통으로 보이는 네비게이션 바.
// App.jsx의 <Routes> "바깥"에 두었기 때문에, 페이지가 바뀌어도 이 부분은 남아 있습니다.
function NavBar() {
  const navigate = useNavigate();

  return (
    <header className="nav">
      {/* 1행 — 계정 영역 (우측 정렬) */}
      <div className="nav__top">
        <button className="nav__account" onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faUser} />
          <span>로그인</span>
        </button>
      </div>

      {/* 2행 — 메종 로고 (중앙) */}
      <div className="nav__brand">
        <Link to="/" className="nav__logo" aria-label="메종 피아노 홈으로">
          <Monogram size={38} />
          <span className="nav__wordmark">MAISON PIANO</span>
          <span className="nav__tagline">Depuis 1853 · Grands Pianos du Monde</span>
        </Link>
      </div>

      {/* 3행 — 메뉴(좌) + 검색(우) */}
      <div className="nav__bottom">
        <nav aria-label="주요 메뉴">
          <ul className="menu">
            {MENU_LIST.map((menu) => (
              <li key={menu} className="menu__item">
                {menu}
              </li>
            ))}
          </ul>
        </nav>

        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search__icon" />
          <input
            className="search__input"
            type="text"
            placeholder="브랜드 또는 모델 검색"
            aria-label="상품 검색"
          />
        </div>
      </div>
    </header>
  );
}

export default NavBar;