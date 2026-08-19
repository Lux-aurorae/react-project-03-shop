import { Navigate } from "react-router";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";

// 로그인한 사람만 통과시키는 문지기 컴포넌트.
//
// useNavigate(함수)가 아니라 <Navigate>(컴포넌트)를 쓰는 이유:
// 여기서는 "렌더링하는 순간" 판단해서 보내야 하는데,
// useNavigate는 이벤트 안에서 호출하는 용도라 렌더링 중에 쓰면 경고가 납니다.
function PrivateRoute({ authenticate }) {
  return authenticate ? <ProductDetailPage /> : <Navigate to="/login" />;
}

export default PrivateRoute;