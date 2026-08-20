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
  const [finish, setFinish] = useState(""); // 선택한 마감 (추가 기능)
  const [added, setAdded] = useState(false); // 담기 완료 표시

  const getProductDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${PRIMARY_API}/${id}`);
      if (!response.ok) throw new Error("primary failed");
      const data = await response.json();
      setProduct(data);
      setFinish(data.sizes?.[0] ?? "");
    } catch {
      try {
        const res = await fetch(FALLBACK_API);
        const data = await res.json();
        const found = data.products?.find((p) => String(p.id) === String(id)) ?? null;
        setProduct(found);
        setFinish(found?.sizes?.[0] ?? "");
      } catch {
        setProduct(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // id가 바뀌면 다시 불러옵니다.
  useEffect(() => {
    setAdded(false);
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
          <PianoArt src={product.image} alt={product.title} finish={product.finish} />
        </div>

        <div className="detail__info">
          <div className="detail__badges">
            {product.choice && (
              <span className="badge badge--choice">
                <span className="badge__dot" />
                Conscious Choice
              </span>
            )}
            {product.new && <span className="badge badge--new">신제품</span>}
          </div>

          <p className="detail__brand">{product.brand}</p>
          <h2 className="detail__title">{product.title}</h2>
          <p className="detail__origin">
            {product.categoryLabel} · {product.country} · fondée en {product.founded}
          </p>

          <p className="detail__price">{formatPrice(product.price)}</p>
          <p className="detail__text">{product.detail}</p>

          {/* 마감 선택 (강의 자율 과제 + 추가 기능) */}
          <div className="detail__block">
            <p className="field__label">마감 선택</p>
            <div className="chips">
              {product.sizes?.map((s) => (
                <button
                  key={s}
                  className={`chip ${finish === s ? "chip--on" : ""}`}
                  onClick={() => setFinish(s)}
                  aria-pressed={finish === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="detail__actions">
            <button
              className="btn btn--fill"
              onClick={() => setAdded(true)}
              disabled={added}
            >
              {added ? "상담 요청됨" : "상담 예약하기"}
            </button>
            <button className="btn" onClick={() => navigate("/")}>
              다른 악기 보기
            </button>
          </div>

          {added && (
            <p className="detail__note">
              {finish} 마감으로 상담이 접수되었습니다. 담당 컨설턴트가 연락드립니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;