import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Monogram from "./Monogram.jsx";
import { MENU_LIST } from "../constants/menu.js";
import { LOGO_SRC } from "../constants/brand.js";

function NavBar({ authenticate, setAuthenticate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoFailed, setLogoFailed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // 모바일 사이드 메뉴

  // 페이지가 바뀌면 사이드 메뉴를 자동으로 닫습니다.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  // 사이드 메뉴가 열려 있는 동안 뒤쪽 화면이 스크롤되지 않게 막습니다.
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const goToLogin = () => navigate("/login");

  const logout = () => {
    setAuthenticate(false);
    navigate("/");
  };

  // 검색: 엔터를 눌렀을 때만 주소를 바꿉니다.
  // 입력값은 document.getElementById가 아니라 event.target.value로 읽습니다.
  const search = (event) => {
    if (event.key !== "Enter") return;
    const keyword = event.target.value.trim();
    navigate(keyword ? `/?q=${encodeURIComponent(keyword)}` : "/");
    event.target.blur(); // 모바일에서 키보드 내리기
  };

  return (
    <header className="nav">
      {/* 1행 — 햄버거(모바일) + 계정 */}
      <div className="nav__top">
        <button
          className="nav__burger"
          onClick={() => setDrawerOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={drawerOpen}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <button className="nav__account" onClick={authenticate ? logout : goToLogin}>
          <FontAwesomeIcon icon={faUser} />
          <span>{authenticate ? "로그아웃" : "로그인"}</span>
        </button>
      </div>

      {/* 2행 — 로고. 클릭하면 상품 전체 페이지로 돌아갑니다. */}
      <div className="nav__brand">
        <Link to="/" className="nav__logo" aria-label="메종 피아노 홈으로">
          {!logoFailed ? (
            <img
              className="nav__logoimg"
              src={LOGO_SRC}
              alt="MAISON PIANO"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <>
              <Monogram size={38} />
              <span className="nav__wordmark">MAISON PIANO</span>
            </>
          )}
          <span className="nav__tagline">Depuis 1853 · Grands Pianos du Monde</span>
        </Link>
      </div>

      {/* 3행 — 메뉴(데스크톱) + 검색 */}
      <div className="nav__bottom">
        <nav className="nav__menu" aria-label="주요 메뉴">
          <ul className="menu">
            {MENU_LIST.map((item) => (
              <li key={item.label}>
                <Link to={item.path} className="menu__item">
                  {item.label}
                </Link>
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
            onKeyDown={search}
          />
        </div>
      </div>

      {/* ── 모바일 사이드 메뉴 ────────────────────────── */}
      <div
        className={`scrim ${drawerOpen ? "scrim--on" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside className={`drawer ${drawerOpen ? "drawer--on" : ""}`} aria-label="사이드 메뉴">
        <div className="drawer__head">
          <span className="drawer__title">MENU</span>
          <button
            className="drawer__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="메뉴 닫기"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <ul className="drawer__list">
          {MENU_LIST.map((item) => (
            <li key={item.label}>
              <Link to={item.path} className="drawer__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="drawer__foot">
          <button
            className="btn btn--fill"
            onClick={authenticate ? logout : goToLogin}
          >
            {authenticate ? "로그아웃" : "로그인"}
          </button>
        </div>
      </aside>
    </header>
  );
}

export default NavBar;