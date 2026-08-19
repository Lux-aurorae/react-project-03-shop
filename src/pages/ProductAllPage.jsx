import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { PRIMARY_API, FALLBACK_API } from "../constants/api.js";

function ProductAllPage() {
  const [productList, setProductList] = useState([]); // 초기값은 빈 배열
  const [loading, setLoading] = useState(true);

  // 상품 목록 불러오기.
  // my-json-server가 응답하지 않으면 public/db.json으로 넘어갑니다.
  const getProducts = async () => {
    try {
      const response = await fetch(PRIMARY_API);
      if (!response.ok) throw new Error("primary failed");
      const data = await response.json();
      setProductList(Array.isArray(data) ? data : []);
    } catch {
      try {
        const res = await fetch(FALLBACK_API);
        const data = await res.json();
        // public/db.json은 { "products": [...] } 형태라 안쪽 배열을 꺼냅니다.
        setProductList(data.products ?? []);
      } catch {
        setProductList([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // 빈 배열 [] = 처음 한 번만 실행 (componentDidMount 자리)
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <section className="hero">
        <p className="hero__eyebrow">Collection</p>
        <h2 className="hero__title">세계의 콘서트 그랜드</h2>
        <p className="hero__lead">
          한 대의 피아노가 완성되기까지 평균 12개월. 메종이 선별한 여덟 공방의 악기를
          만나보십시오.
        </p>
      </section>

      {loading ? (
        <div className="grid">
          {/* 불러오는 동안 자리를 잡아두는 뼈대. 화면이 덜컥거리지 않습니다. */}
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="skeleton" />
          ))}
        </div>
      ) : (
        <div className="grid">
          {productList.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {!loading && productList.length === 0 && (
        <p className="empty">상품을 불러오지 못했습니다.</p>
      )}
    </>
  );
}

export default ProductAllPage;