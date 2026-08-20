import { useEffect, useState } from "react"

const categories = [
  { title: "B.Sc Nursing", text: "Semester-wise books", color: "#2563eb" },
  { title: "P.B.B.Sc", text: "Advanced nursing titles", color: "#0891b2" },
  { title: "Medical", text: "Reference collection", color: "#7c3aed" },
]

export default function CatalogueHero() {
  const [activeCategory, setActiveCategory] = useState(0)
  const active = categories[activeCategory]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCategory((current) => (current + 1) % categories.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="catalogue">
      <style>{`
        * { box-sizing: border-box; }
        .catalogue {
          min-height: 100vh;
          padding: 72px 24px;
          color: #0f172a;
          background: linear-gradient(135deg, #eff6ff, #ffffff 55%, #ecfeff);
          font-family: Arial, sans-serif;
        }
        .catalogue-wrap {
          max-width: 1120px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          align-items: center;
          gap: 64px;
        }
        .badge {
          display: inline-block;
          padding: 9px 14px;
          border-radius: 999px;
          color: #1d4ed8;
          background: #dbeafe;
          font-size: 14px;
          font-weight: 700;
        }
        h1 {
          margin: 18px 0;
          max-width: 650px;
          font-size: clamp(42px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: -2px;
        }
        h1 span { color: #2563eb; }
        .description {
          max-width: 590px;
          color: #475569;
          font-size: 18px;
          line-height: 1.7;
        }
        .category-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 24px 0;
          font-size: 20px;
          font-weight: 700;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 28px 0;
        }
        .tabs button {
          border: 1px solid #dbe3ef;
          border-radius: 12px;
          padding: 12px 16px;
          color: #334155;
          background: white;
          font-weight: 700;
          cursor: pointer;
        }
        .tabs button.active {
          color: white;
          border-color: #2563eb;
          background: #2563eb;
        }
        .actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .actions a {
          padding: 14px 20px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
        }
        .primary { color: white; background: #2563eb; }
        .secondary { color: #1e40af; background: white; border: 1px solid #bfdbfe; }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 36px;
        }
        .stat {
          padding: 18px 12px;
          border-radius: 16px;
          text-align: center;
          background: rgba(255,255,255,.8);
          border: 1px solid #e2e8f0;
        }
        .stat strong { display: block; color: #2563eb; font-size: 24px; }
        .stat span { color: #64748b; font-size: 13px; }
        .showcase {
          position: relative;
          display: flex;
          justify-content: center;
          padding: 32px;
        }
        .glow {
          position: absolute;
          width: 330px;
          height: 330px;
          border-radius: 50%;
          background: #bae6fd;
          filter: blur(70px);
        }
        .book {
          position: relative;
          z-index: 1;
          width: min(100%, 335px);
          min-height: 460px;
          padding: 34px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 24px;
          color: white;
          background: linear-gradient(145deg, #1d4ed8, #0891b2, #3730a3);
          box-shadow: 18px 22px 0 #0f172a22, 0 25px 55px #2563eb55;
        }
        .book::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 16px;
          border-radius: 24px 0 0 24px;
          background: #172554;
        }
        .book-content { margin-left: 12px; }
        .edition {
          display: inline-block;
          padding: 8px 10px;
          border-radius: 999px;
          background: #ffffff2b;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        .book h2 { margin: 28px 0 12px; font-size: 46px; line-height: 1; }
        .book p { color: #dbeafe; line-height: 1.6; }
        .publisher { font-size: 13px; font-weight: bold; letter-spacing: 1px; }
        @media (max-width: 800px) {
          .catalogue { padding: 52px 20px; }
          .catalogue-wrap { grid-template-columns: 1fr; gap: 36px; }
          .showcase { order: -1; padding: 10px; }
          .book { min-height: 400px; }
        }
      `}</style>

      <div className="catalogue-wrap">
        <div>
          <span className="badge">Premium Nursing Book Collection</span>
          <h1>
            India&apos;s trusted <span>Nursing Library</span>
          </h1>
          <p className="description">
            Updated nursing textbooks, previous university papers, and practical
            resources designed for students and faculty across India.
          </p>

          <div className="category-title">
            <span className="dot" style={{ background: active.color }} />
            {active.title} — {active.text}
          </div>

          <div className="tabs">
            {categories.map((category, index) => (
              <button
                key={category.title}
                className={index === activeCategory ? "active" : ""}
                onClick={() => setActiveCategory(index)}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="actions">
            <a className="primary" href="#catalogue">Download Catalogue →</a>
            <a className="secondary" href="#samples">View Sample Books</a>
          </div>

          <div className="stats">
            <div className="stat"><strong>650+</strong><span>Books</span></div>
            <div className="stat"><strong>5000+</strong><span>Colleges</span></div>
            <div className="stat"><strong>23+</strong><span>Years Publishing</span></div>
          </div>
        </div>

        <div className="showcase">
          <div className="glow" />
          <div className="book">
            <div className="book-content">
              <span className="edition">PREMIUM EDITION</span>
              <h2>Nursing<br />Master<br />Series</h2>
              <p>
                Complete INC syllabus with clinical concepts, illustrations,
                and previous university papers.
              </p>
            </div>
            <div className="book-content publisher">VIJAYAM PUBLICATIONS</div>
          </div>
        </div>
      </div>
    </section>
  )
}