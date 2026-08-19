import { useNavigate } from "react-router";
import PianoArt from "./PianoArt.jsx";

// 가격을 "218,000,000" 형태로. 값이 없으면 "가격 문의"를 보여줘 NaN을 막습니다.
function formatPrice(price) {
  if (typeof price !== "number" || Number.isNaN(price)) return "가격 문의";
  return `₩ ${price.toLocaleString("ko-KR")}`;
}

function ProductCard({ item }) {
  const navigate = useNavigate();

  // 카드를 누르면 그 상품의 상세 페이지로 갑니다.
  // 템플릿 리터럴(백틱)로 id를 주소에 끼워 넣습니다.
  const showDetail = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <article className="card" onClick={showDetail}>
      <div className="card__art">
        <PianoArt finish={item.finish} />

        <div className="card__badges">
          {/* item.choice가 true일 때만 보입니다. false면 아예 렌더링되지 않습니다. */}
          {item.choice && (
            <span className="badge badge--choice">
              <span className="badge__dot" />
              Conscious Choice
            </span>
          )}
          {/* item.new도 같은 방식의 조건부 렌더링입니다. */}
          {item.new && <span className="badge badge--new">신제품</span>}
        </div>
      </div>

      <div className="card__body">
        <p className="card__brand">{item.brand}</p>
        <h3 className="card__title">{item.title}</h3>
        <p className="card__origin">
          {item.country} · est. {item.founded}
        </p>
        <p className="card__price">{formatPrice(item.price)}</p>
      </div>
    </article>
  );
}

export default ProductCard;