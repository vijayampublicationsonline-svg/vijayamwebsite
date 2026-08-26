"use client"

import { useEffect, useState } from "react"

const categories = [
  { title: "B.Sc Nursing", text: "Semester-wise books", color: "#67e8f9" },
  { title: "P.B.B.Sc", text: "Advanced nursing titles", color: "#c4b5fd" },
  { title: "Medical", text: "Reference collection", color: "#fbbf24" },
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
        .catalogue, .catalogue * { box-sizing: border-box; }

        .catalogue {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 100vh;
          padding: 72px 24px;
          color: #f8fafc;
          background:
            radial-gradient(circle at 12% 8%, rgba(34, 211, 238, .2), transparent 29rem),
            radial-gradient(circle at 88% 82%, rgba(139, 92, 246, .2), transparent 30rem),
            linear-gradient(135deg, #050816 0%, #0b1330 52%, #080b1b 100%);
          font-family: Arial, sans-serif;
        }

        .catalogue::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: .28;
          background-image:
            linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 86%);
        }

        .catalogue-wrap {
          position: relative;
          max-width: 1180px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          align-items: center;
          gap: 56px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid rgba(103, 232, 249, .28);
          border-radius: 999px;
          color: #a5f3fc;
          background: rgba(34, 211, 238, .09);
          box-shadow: inset 0 1px rgba(255,255,255,.1);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #67e8f9;
          box-shadow: 0 0 0 5px rgba(103, 232, 249, .13), 0 0 16px #67e8f9;
        }

        h1 {
          max-width: 680px;
          margin: 18px 0 16px;
          font-size: clamp(44px, 5.7vw, 76px);
          line-height: .99;
          letter-spacing: -3.6px;
        }

        h1 span {
          background: linear-gradient(100deg, #67e8f9, #a5b4fc 48%, #e9d5ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .description {
          max-width: 590px;
          margin: 0;
          color: #b8c4da;
          font-size: 17px;
          line-height: 1.7;
        }

        .category-status {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 26px 0 14px;
          color: #e2e8f0;
          font-size: 14px;
          font-weight: 700;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          box-shadow: 0 0 14px currentColor;
        }

        .category-status small {
          color: #8291ac;
          font-size: 13px;
          font-weight: 500;
        }

        .tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 25px;
        }

        .tabs button {
          border: 1px solid rgba(255,255,255,.11);
          border-radius: 10px;
          padding: 10px 13px;
          color: #9cabc3;
          background: rgba(255,255,255,.045);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: .25s ease;
        }

        .tabs button:hover {
          color: white;
          border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.1);
        }

        .tabs button.active {
          color: #06101d;
          border-color: transparent;
          background: linear-gradient(110deg, #a5f3fc, #a5b4fc);
          box-shadow: 0 8px 25px rgba(103,232,249,.2);
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .actions a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 47px;
          padding: 13px 18px;
          border-radius: 11px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        }

        .actions a:hover { transform: translateY(-3px); }

        .primary {
          color: #071426;
          background: linear-gradient(105deg, #67e8f9, #a5b4fc);
          box-shadow: 0 12px 30px rgba(103, 232, 249, .2);
        }

        .primary:hover { box-shadow: 0 18px 38px rgba(103, 232, 249, .34); }

        .secondary {
          color: #e4ebf7;
          border: 1px solid rgba(255,255,255,.16);
          background: rgba(255,255,255,.055);
        }

        .secondary:hover { background: rgba(255,255,255,.12); }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 30px;
        }

        .stat {
          padding: 15px 10px;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 14px;
          text-align: center;
          background: linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.035));
          backdrop-filter: blur(12px);
        }

        .stat strong {
          display: block;
          color: #f8fafc;
          font-size: 22px;
          letter-spacing: -.7px;
        }

        .stat span {
          display: block;
          margin-top: 4px;
          color: #93a4be;
          font-size: 11px;
          font-weight: 600;
        }

        .showcase {
          position: relative;
          display: flex;
          justify-content: center;
          min-height: 530px;
          padding: 35px 20px;
        }

        .orb {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 370px;
          height: 370px;
          border: 1px solid rgba(165, 180, 252, .19);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: inset 0 0 80px rgba(103,232,249,.09), 0 0 90px rgba(139,92,246,.17);
        }

        .orb::before, .orb::after {
          content: "";
          position: absolute;
          inset: 25px;
          border: 1px solid rgba(103,232,249,.12);
          border-radius: inherit;
        }

        .orb::after { inset: 55px; }

        .book-shadow {
          position: absolute;
          bottom: 32px;
          width: 300px;
          height: 42px;
          border-radius: 50%;
          background: rgba(0,0,0,.7);
          filter: blur(20px);
        }

        .book {
          position: relative;
          z-index: 2;
          width: min(100%, 335px);
          min-height: 455px;
          padding: 30px 29px 28px 42px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.35);
          border-radius: 18px 28px 28px 18px;
          color: white;
          background:
            radial-gradient(circle at 92% 10%, rgba(255,255,255,.22), transparent 25%),
            linear-gradient(145deg, #0891b2 0%, #1d4ed8 50%, #4c1d95 100%);
          box-shadow: -14px 18px 0 rgba(3,7,18,.48), 22px 30px 55px rgba(0,0,0,.45);
          transform: rotate(5deg);
          transition: transform .4s ease;
        }

        .book:hover { transform: rotate(1deg) translateY(-9px); }

        .book::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 19px;
          border-right: 1px solid rgba(255,255,255,.18);
          background: linear-gradient(90deg, #06194c, #12347c);
        }

        .book::after {
          content: "";
          position: absolute;
          top: -40%;
          right: -25%;
          width: 180px;
          height: 170%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,.13), transparent);
          transform: rotate(16deg);
        }

        .book-content { position: relative; z-index: 1; }

        .edition {
          display: inline-block;
          padding: 7px 9px;
          border: 1px solid rgba(255,255,255,.35);
          border-radius: 999px;
          background: rgba(255,255,255,.13);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.2px;
        }

        .book h2 {
          margin: 28px 0 13px;
          font-size: 46px;
          line-height: .94;
          letter-spacing: -2px;
        }

        .book p {
          max-width: 220px;
          margin: 0;
          color: #dbeafe;
          font-size: 14px;
          line-height: 1.55;
        }

        .publisher {
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,.27);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .floating-card {
          position: absolute;
          z-index: 3;
          right: -2px;
          bottom: 50px;
          padding: 12px 14px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 13px;
          color: #eafaff;
          background: rgba(9, 17, 45, .74);
          box-shadow: 0 16px 35px rgba(0,0,0,.28);
          backdrop-filter: blur(16px);
          font-size: 12px;
          font-weight: 800;
        }

        .floating-card span {
          display: block;
          margin-top: 3px;
          color: #9caeca;
          font-size: 10px;
          font-weight: 600;
        }

        @media (max-width: 850px) {
          .catalogue { min-height: auto; padding: 56px 20px; }
          .catalogue-wrap { grid-template-columns: 1fr; gap: 18px; }
          .showcase { order: -1; min-height: 445px; padding: 25px 10px; }
          .book { min-height: 390px; transform: rotate(3deg) scale(.88); }
          .book h2 { font-size: 40px; }
          .floating-card { right: 4%; bottom: 28px; }
        }

        @media (max-width: 440px) {
          h1 { letter-spacing: -2.5px; }
          .stats { gap: 7px; }
          .stat { padding: 12px 5px; }
          .stat strong { font-size: 18px; }
          .stat span { font-size: 10px; }
          .actions a { width: 100%; }
        }
      `}</style>

      <div className="catalogue-wrap">
        <div>
          <span className="eyebrow"><span className="pulse" /> Premium Nursing Book Collection</span>

          <h1>
            India&apos;s trusted <span>Nursing Library.</span>
          </h1>

          <p className="description">
            Updated nursing textbooks, previous university papers, and practical
            resources designed for students and faculty across India.
          </p>

          <div className="category-status">
            <span className="dot" style={{ background: active.color, color: active.color }} />
            <span>{active.title}</span>
            <small>— {active.text}</small>
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
            <a className="primary" href="#catalogue">Download Catalogue ↗</a>
            <a className="secondary" href="#samples">View Sample Books</a>
          </div>

          <div className="stats">
            <div className="stat"><strong>650+</strong><span>Books</span></div>
            <div className="stat"><strong>5000+</strong><span>Colleges</span></div>
            <div className="stat"><strong>23+</strong><span>Years Publishing</span></div>
          </div>
        </div>

        <div className="showcase">
          <div className="orb" />
          <div className="book-shadow" />
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
          <div className="floating-card">
            INC-aligned content
            <span>Made for ambitious learners</span>
          </div>
        </div>
      </div>
    </section>
  )
}