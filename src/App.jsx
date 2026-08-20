import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import ProductAllPage from "./pages/ProductAllPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StoryPage from "./pages/StoryPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

function App() {
  // 로그인 상태. false = 미로그인, true = 로그인 완료.
  // App이 소유하고 필요한 곳에 props로 내려보냅니다. (상태 끌어올리기)
  const [authenticate, setAuthenticate] = useState(false);

  return (
    <>
      {/* NavBar는 <Routes> 바깥이라 페이지가 바뀌어도 그대로 남습니다. */}
      <NavBar authenticate={authenticate} setAuthenticate={setAuthenticate} />

      <main className="page">
        <Routes>
          <Route path="/" element={<ProductAllPage />} />
          <Route path="/login" element={<LoginPage setAuthenticate={setAuthenticate} />} />
          <Route path="/atelier" element={<StoryPage kind="atelier" />} />
          <Route path="/story" element={<StoryPage kind="story" />} />
          {/* 상세 페이지는 PrivateRoute가 감쌉니다.
              로그인 안 했으면 안쪽 페이지 대신 /login으로 보내집니다. */}
          <Route path="/product/:id" element={<PrivateRoute authenticate={authenticate} />} />
        </Routes>
      </main>

      <footer className="foot">
        <span>MAISON PIANO</span>
        <span>Grands Pianos du Monde · Séoul</span>
      </footer>
    </>
  );
}

export default App;