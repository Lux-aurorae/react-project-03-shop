import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PianoArt from "../components/PianoArt.jsx";
import { PRIMARY_API, FALLBACK_API } from "../constants/api.js";

function formatPrice(price) {
  if (typeof price !== "number" || Number.isNaN(price)) return "가격 문의";
  return `₩ ${price.toLocaleString("ko-KR")}`;
}

function ProductDetailPage() {
  // useParams()는 URL 파라미터를 객체로 돌려줍니다. { id: "3" } 형태입니다.
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductDetail = async () => {
    try {
      const response = await fetch(`${PRIMARY_API}/${id}`);
      if (!response.ok) throw new Error("primary failed");
      setProduct(await response.json());
    } catch {
      try {
        const res = await fetch(FALLBACK_API);
        const data = await res.json();
        setProduct(data.products?.find((p) => String(p.id) === String(id)) ?? null);
      } catch {
        setProduct(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // id가 바뀌면 다시 불러옵니다.
  useEffect(() => {
    getProductDetail();
  }, [id]);

  if (loading) return <div className="skeleton skeleton--wide" />;

  if (!product) {
    return (
      <section className="detail">
        <p className="empty">상품을 찾을 수 없습니다.</p>
        <button className="btn" onClick={() => navigate("/")}>
          컬렉션으로 돌아가기
        </button>
      </section>
    );
  }

  return (
    <section className="detail">
      <button className="crumb" onClick={() => navigate("/")}>
        ← 컬렉션
      </button>

      <div className="detail__grid">
        <div className="detail__art">
          <PianoArt finish={product.finish} />
        </div>

        <div className="detail__info">
          {product.choice && (
            <span className="badge badge--choice">
              <span className="badge__dot" />
              Conscious Choice
            </span>
          )}

          <p className="detail__brand">{product.brand}</p>
          <h2 className="detail__title">{product.title}</h2>
          <p className="detail__origin">
            {product.country} · Maison fondée en {product.founded}
          </p>

          <p className="detail__price">{formatPrice(product.price)}</p>
          <p className="detail__text">{product.detail}</p>

          <div className="detail__finish">
            <p className="field__label">마감 선택</p>
            <div className="chips">
              {product.sizes?.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <button className="btn btn--fill">상담 예약하기</button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;