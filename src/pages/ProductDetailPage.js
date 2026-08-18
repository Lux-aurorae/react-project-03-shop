import { useParams } from "react-router";

// 상품 상세 페이지 (주소: /product/:id )
function ProductDetailPage() {
  // useParams()는 URL 파라미터를 객체로 돌려줍니다. { id: "1" } 형태입니다.
  const { id } = useParams();

  return (
    <div style={{ padding: 40 }}>
      <h1>상품 상세 페이지</h1>
      <p>주소: /product/{id}</p>
      <p>
        읽어온 id 값: <b>{id}</b>
      </p>
    </div>
  );
}

export default ProductDetailPage;