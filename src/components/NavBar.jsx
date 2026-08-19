import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Monogram from "./Monogram.jsx";
import { MENU_LIST } from "../constants/menu.js";

// 모든 페이지에 공통으로 보이는 네비게이션 바.
// authenticate 값에 따라 버튼이 로그인 ↔ 로그아웃으로 바뀝니다.
function NavBar({ authenticate, setAuthenticate }) {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    setAuthenticate(false);
    navigate("/");
  };

  return (
    <header className="nav">
      {/* 1행 — 계정 영역 (우측 정렬) */}
      <div className="nav__top">
        {authenticate ? (
          <button className="nav__account" onClick={logout}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그아웃</span>
          </button>
        ) : (
          <button className="nav__account" onClick={goToLogin}>
            <FontAwesomeIcon icon={faUser} />
            <span>로그인</span>
          </button>
        )}
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