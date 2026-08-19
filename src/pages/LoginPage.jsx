import { useState } from "react";
import { useNavigate } from "react-router";
import Monogram from "../components/Monogram.jsx";

// setAuthenticate를 props로 받습니다. state 자체는 App이 소유하고,
// 이 페이지는 App이 준 함수를 호출할 뿐입니다. (상태 끌어올리기)
function LoginPage({ setAuthenticate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (event) => {
    // ⚠️ 이 줄이 없으면 form이 제출되며 페이지가 새로고침됩니다.
    // 새로고침되면 App의 state가 초기화되어 로그인이 풀립니다.
    event.preventDefault();

    setAuthenticate(true);
    navigate("/"); // 로그인 후 메인 페이지로
  };

  return (
    <section className="login">
      <div className="login__head">
        <Monogram size={30} />
        <h2 className="login__title">Espace Client</h2>
        <p className="login__lead">
          메종 회원 전용 공간입니다. 로그인하시면 각 악기의 상세 사양과 공방 이야기를
          열람하실 수 있습니다.
        </p>
      </div>

      <form className="login__form" onSubmit={loginUser}>
        <div className="field">
          <label className="field__label" htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="field__input"
            placeholder="nom@maison.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="field__input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <label className="check">
          <input type="checkbox" />
          <span>로그인 상태 유지</span>
        </label>

        <button type="submit" className="btn btn--fill">
          로그인
        </button>

        <p className="login__note">
          체험용 페이지입니다. 아무 값이나 입력하거나 비워둔 채 눌러도 로그인됩니다.
        </p>
      </form>
    </section>
  );
}

export default LoginPage;