import { ATELIER_IMAGES, STORY_IMAGE, BRAND_IMAGE, COLLECTION_IMAGE } from "../constants/brand.js";

// 아틀리에 / 메종 스토리 페이지. kind 값으로 내용을 바꿉니다. (추가 기능)
function StoryPage({ kind = "atelier" }) {
  const isAtelier = kind === "atelier";

  return (
    <section className="story">
      <header className="hero">
        <p className="hero__eyebrow">{isAtelier ? "Atelier" : "Maison"}</p>
        <h2 className="hero__title">{isAtelier ? "공방에서" : "메종 스토리"}</h2>
        <p className="hero__lead">
          {isAtelier
            ? "한 대의 피아노는 12개월에 걸쳐 만들어집니다. 향판을 고르는 일부터 마지막 조율까지, 모든 공정이 사람의 손을 거칩니다."
            : "1853년 작은 공방에서 시작해, 지금은 다섯 도시의 아틀리에가 하나의 이름으로 묶여 있습니다."}
        </p>
      </header>

      <div className="story__grid">
        {(isAtelier
          ? [...ATELIER_IMAGES, COLLECTION_IMAGE]
          : [STORY_IMAGE, BRAND_IMAGE]
        ).map((src) => (
          <figure key={src} className="story__fig">
            <img src={src} alt="" loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default StoryPage;