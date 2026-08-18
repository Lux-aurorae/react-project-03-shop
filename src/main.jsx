import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

// App을 <BrowserRouter>로 감싸야 앱 전체가 라우터 기능을 갖게 됩니다.
// 이 한 겹이 없으면 useNavigate, Link 등이 전부 에러를 냅니다.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);