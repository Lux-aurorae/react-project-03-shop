import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard.jsx";
import { PRIMARY_API, FALLBACK_API } from "../constants/api.js";
import { HERO_SRC } from "../constants/brand.js";

const CATEGORIES = [
  { key: "all", label: "전체" },
  { key: "grand", label: "그랜드 피아노" },
  { key: "upright", label: "업라이트" },
];

function ProductAllPage() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroFailed, setHeroFailed] = useState(false);

  // 주소의 ?q=검색어 와 ?category=grand 를 읽습니다.
  // useSearchParams는 useState처럼 [값, 바꾸는함수] 형태로 돌려줍니다.
  const [query, setQuery] = useSearchParams();
  const searchQuery = query.get("q") ?? "";
  const category = query.get("category") ?? "all";

  const getProducts = async () => {
    setLoading(true);
    try {
      // JSON 서버는 ?q= 를 붙이면 알아서 검색해 줍니다.
      const url = `${PRIMARY_API}?q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("primary failed");
      const data = await response.json();
      setProductList(Array.isArray(data) ? data : []);
    } catch {
      // 예비 경로는 검색 기능이 없으므로 직접 걸러냅니다.
      try {
        const res = await fetch(FALLBACK_API);
        const data = await res.json();
        const all = data.products ?? [];
        const k = searchQuery.toLowerCase();
        setProductList(
          k
            ? all.filter((p) =>
                `${p.title} ${p.brand} ${p.country} ${p.categoryLabel}`
                  .toLowerCase()
                  .includes(k)
              )
            : all
        );
      } catch {
        setProductList([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // ⚠️ 의존성 배열에 query를 넣어야 검색어가 바뀔 때마다 다시 불러옵니다.
  // 빈 배열 []이면 최초 한 번만 실행되어 검색이 동작하지 않습니다.
  useEffect(() => {
    getProducts();
  }, [query]);

  // 카테고리는 화면에서 걸러냅니다.
  const shown =
    category === "all"
      ? productList
      : productList.filter((p) => p.category === category);

  const pickCategory = (key) => {
    const next = {};
    if (searchQuery) next.q = searchQuery;
    if (key !== "all") next.category = key;
    setQuery(next);
  };

  return (
    <>
      {/* 배너는 검색·필터가 없을 때만 보여 화면이 산만해지지 않게 합니다. */}
      {!heroFailed && !searchQuery && category === "all" && (
        <div className="banner">
          <img src={HERO_SRC} alt="" onError={() => setHeroFailed(true)} />
        </div>
      )}

      <section className="hero">
        <p className="hero__eyebrow">Collection</p>
        <h2 className="hero__title">
          {searchQuery ? `“${searchQuery}” 검색 결과` : "세계의 콘서트 그랜드"}
        </h2>
        <p className="hero__lead">
          {searchQuery
            ? `${shown.length}점의 악기를 찾았습니다.`
            : "한 대의 피아노가 완성되기까지 평균 12개월. 메종이 선별한 악기를 만나보십시오."}
        </p>
      </section>

      {/* 카테고리 필터 (추가 기능) */}
      <nav className="filters" aria-label="카테고리">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            className={`filter ${category === c.key ? "filter--on" : ""}`}
            onClick={() => pickCategory(c.key)}
            aria-pressed={category === c.key}
          >
            {c.label}
          </button>
        ))}
      </nav>

      {loading ? (
        <div className="grid">
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="skeleton" />
          ))}
        </div>
      ) : shown.length > 0 ? (
        <div className="grid">
          {shown.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="empty">
          {searchQuery
            ? "검색 결과가 없습니다. 다른 이름으로 찾아보세요."
            : "상품을 불러오지 못했습니다."}
        </p>
      )}
    </>
  );
}

export default ProductAllPage;