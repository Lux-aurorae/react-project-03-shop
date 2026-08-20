import { useNavigate } from "react-router";
import PianoArt from "./PianoArt.jsx";

function formatPrice(price) {
  if (typeof price !== "number" || Number.isNaN(price)) return "가격 문의";
  return `₩ ${price.toLocaleString("ko-KR")}`;
}

function ProductCard({ item }) {
  const navigate = useNavigate();

  // 카드를 누르면 그 상품의 상세 페이지로 갑니다.
  const showDetail = () => navigate(`/product/${item.id}`);

  return (
    <article className="card" onClick={showDetail}>
      <div className="card__art">
        <PianoArt src={item.image} alt={item.title} finish={item.finish} />

        <div className="card__badges">
          {/* item.choice가 true일 때만 보입니다. false면 렌더링 자체가 안 됩니다. */}
          {item.choice && (
            <span className="badge badge--choice">
              <span className="badge__dot" />
              Conscious Choice
            </span>
          )}
          {item.new && <span className="badge badge--new">신제품</span>}
        </div>
      </div>

      <div className="card__body">
        <p className="card__brand">{item.brand}</p>
        <h3 className="card__title">{item.title}</h3>
        <p className="card__origin">
          {item.categoryLabel} · {item.country}
        </p>
        <p className="card__price">{formatPrice(item.price)}</p>
      </div>
    </article>
  );
}

export default ProductCard;