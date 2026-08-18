import { Routes, Route } from "react-router";
import "./App.css";
import NavBar from "./components/Navbar";
import ProductAllPage from "./pages/ProductAllPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      {/* NavBar는 <Routes> 바깥에 있으므로 페이지가 바뀌어도 그대로 남습니다.
          각 페이지마다 NavBar를 넣으면 중복이 생기고, 페이지 전환 때마다
          네비게이션이 다시 그려져 깜빡입니다. */}
      <NavBar />

      <main className="page">
        <Routes>
          <Route path="/" element={<ProductAllPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* :id 는 URL 파라미터. /product/1, /product/2 모두 이 페이지로 옵니다 */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;