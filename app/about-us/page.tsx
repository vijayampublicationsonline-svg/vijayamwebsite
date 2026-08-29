"use client";

import { useState } from "react";

type DistState = {
  id: string;
  code: string;
  name: string;
  number: number;
};

const STATES: DistState[] = [
  { id: "andhra-pradesh", code: "AP", name: "ANDHRA PRADESH", number: 1 },
  { id: "telangana", code: "TS", name: "TELANGANA", number: 2 },
  { id: "tamil-nadu", code: "TN", name: "TAMIL NADU", number: 3 },
  { id: "karnataka", code: "KA", name: "KARNATAKA", number: 4 },
  { id: "kerala", code: "KL", name: "KERALA", number: 5 },
  { id: "odisha", code: "OD", name: "ODISHA", number: 6 },
  { id: "west-bengal", code: "WB", name: "WEST BENGAL", number: 7 },
  { id: "maharashtra", code: "MH", name: "MAHARASHTRA", number: 8 },
  { id: "gujarat", code: "GJ", name: "GUJARAT", number: 9 },
  { id: "rajasthan", code: "RJ", name: "RAJASTHAN", number: 10 },
  { id: "jammu-kashmir", code: "JK", name: "JAMMU & KASHMIR", number: 11 },
];

export default function AboutUsPage() {
  const [activeId, setActiveId] = useState<string>("andhra-pradesh");
  const active = STATES.find((s) => s.id === activeId) || STATES[0];

  return (
    <>
      <style>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
          background: #f6f7f9;
          color: #1f2937;
        }

        .about-container {
          position: relative;
          overflow: hidden;
          min-height: 170vh;
          padding: 42px 24px 62px;
          background:
            linear-gradient(180deg, #fff8f1 0%, #fff4ea 34%, #fdf0e5 72%, #f8efe8 100%);
          background-size: 100% 140%;
          animation: none;
        }

        .top-bar, .wrap, .story { position: relative; z-index: 1; }

        .top-bar {
          max-width: 1240px;
          margin: 0 auto 28px;
          padding-bottom: 14px;
          border-bottom: 1px solid #eadaca;
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
        }

        .title-wrap { display: grid; gap: 6px; }

        .eyebrow {
          margin: 0;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #7c3f23;
          font-weight: 700;
        }

        .title {
          margin: 0;
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.08;
          font-weight: 700;
          color: #4a1f12;
        }

        .subtitle {
          margin: 0;
          font-size: 13px;
          color: #8b4f32;
        }

        .counter {
          font-size: 12px;
          letter-spacing: .08em;
          color: #6f2e18;
          white-space: nowrap;
          font-weight: 600;
          animation: none;
        }

        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 30px;
          align-items: start;
        }

        .map-area {
          min-height: 92vh;
          display: grid;
          place-items: center;
          padding: 14px;
        }

        .map-shell {
          position: relative;
          width: min(100%, 960px);
          border: 1px solid #ecd7c3;
          border-radius: 16px;
          background: #ffffff;
          padding: 12px;
          box-shadow: 0 12px 30px rgba(94, 42, 21, .12);
          transition: transform .4s ease, box-shadow .4s ease;
          animation: none;
        }

        .map-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(255,255,255,.32), transparent 34%, transparent 72%, rgba(176,116,58,.045));
          pointer-events: none;
        }

        .map-shell:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px rgba(94, 42, 21, .14);
        }

        .map-shell:focus-within {
          border-color: #d8b294;
          box-shadow:
            0 18px 40px rgba(94, 42, 21, .14),
            0 0 0 4px rgba(181, 112, 67, .08);
        }

        .india-img {
          width: 100%;
          max-height: 82vh;
          object-fit: contain;
          user-select: none;
          display: block;
          animation: none;
        }

        .side {
          min-height: 92vh;
          padding-left: 18px;
          border-left: 1px solid #eadaca;
          display: flex;
          flex-direction: column;
        }

        .side-title {
          margin: 0 0 12px;
          font-size: 11px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #7c3f23;
          font-weight: 800;
        }

        .list {
          display: grid;
          gap: 9px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .btn {
          width: 100%;
          border: 1px solid #edd8c6;
          border-radius: 12px;
          background: linear-gradient(180deg, #fffdfa 0%, #fff8f2 100%);
          color: #6b2f1d;
          padding: 11px 11px;
          display: flex;
          align-items: center;
          gap: 9px;
          text-align: left;
          cursor: pointer;
          opacity: 1;
          transition: color .24s ease, transform .24s ease, border-color .24s ease, background .24s ease, box-shadow .24s ease;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }

        .btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 0%, rgba(255,255,255,.12) 50%, transparent 100%);
          transform: translateX(-140%);
          transition: transform .9s ease;
          pointer-events: none;
          opacity: .45;
        }

        .btn:hover::after { transform: translateX(130%); }


        .btn:hover {
          color: #4f1e11;
          border-color: #d8b294;
          transform: translateY(-1px);
          background: linear-gradient(180deg, #fffdfa 0%, #fff6ee 100%);
          box-shadow: 0 8px 20px rgba(92, 47, 24, .09);
        }

        .btn:focus-visible {
          outline: 2px solid #c56b42;
          outline-offset: 2px;
        }

        .btn.active {
          color: #3a180d;
          border-color: #c9936e;
          background:
            linear-gradient(90deg, rgba(255, 240, 229, .98), rgba(255, 248, 241, .96));
          box-shadow:
            0 10px 24px rgba(108, 52, 24, .11),
            inset 0 1px 0 rgba(255, 255, 255, .95),
            inset 3px 0 0 #a85c36;
          transform: translateY(-1px);
        }
        .btn.active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 9px;
          bottom: 9px;
          width: 3px;
          border-radius: 999px;
          background: linear-gradient(180deg, #8a4426, #cf9369);
          pointer-events: none;
        }

        .btn:active {
          transform: translateY(0) scale(0.995);
          filter: saturate(1.08);
        }

        .btn-number {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f4d4bf;
          color: #6a2c17;
          font-size: 11px;
          font-weight: 800;
          flex-shrink: 0;
          transition: transform .24s ease, background .24s ease, color .24s ease, box-shadow .24s ease;
        }

        .btn-code {
          font-size: 11px;
          font-weight: 800;
          color: #7a341c;
          letter-spacing: .07em;
          min-width: 28px;
          transition: color .24s ease;
        }

        .btn-name {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .02em;
        }

        .btn.active .btn-number { 
          background: #a94822; 
          color: #fffaf6; 
          transform: scale(1.04);
          box-shadow: 0 0 0 2px rgba(169, 72, 34, .12);
        }

        .btn.active .btn-code { color: #8f3718; }

        .meta {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid #eadaca;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #8a4f34;
        }

        .meta-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #b94b1b;
          animation: none;
        }

        .meta b { color: #4a1f12; font-weight: 800; }

        .story {
          max-width: 1240px;
          margin: 48px auto 0;
          padding-top: 32px;
          border-top: 1px solid #eadaca;
          display: grid;
          gap: 16px;
          perspective: 1200px;
        }

        .story-head {
          margin: 0;
          font-size: 12px;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #7c3f23;
          font-weight: 800;
        }

        .story-title {
          margin: 0;
          font-size: clamp(26px, 3.6vw, 38px);
          line-height: 1.2;
          color: #4a1f12;
          animation: none;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;
          max-width: 1240px;
        }

        .story-item {
          position: relative;
          border-radius: 18px;
          padding: clamp(26px, 3.4vw, 42px) clamp(22px, 3.6vw, 42px);
          background:
            radial-gradient(120% 90% at 8% 0%, rgba(255, 244, 230, .9) 0%, rgba(255, 255, 255, 0) 45%),
            linear-gradient(180deg, #fffefd 0%, #fff8f3 100%);
          border: 1px solid #e7cdb8;
          box-shadow:
            0 18px 34px rgba(94, 42, 21, .10),
            0 2px 0 rgba(255, 255, 255, .75) inset,
            0 -2px 0 rgba(225, 187, 156, .16) inset;
          transform-style: preserve-3d;
          transition: transform .38s ease, box-shadow .38s ease, border-color .3s ease;
          overflow: hidden;
          opacity: 0;
          animation: cardRise .7s cubic-bezier(.2,.75,.25,1) forwards;
        }

        .story-item::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(120deg, rgba(255,255,255,.52), rgba(255,255,255,0) 40%);
          pointer-events: none;
        }

        .story-item::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.6) 42%, transparent 72%);
          transform: translateX(-120%);
          transition: transform 1s ease;
          pointer-events: none;
        }

        .story-item:hover::after { transform: translateX(120%); }

        .story-item:nth-child(1) { animation-delay: .08s; }
        .story-item:nth-child(2) { animation-delay: .18s; }
        .story-item:nth-child(3) { animation-delay: .28s; }

        .story-item:hover {
          transform: translateY(-8px) rotateX(2deg) rotateY(-2deg) scale(1.006);
          box-shadow:
            0 30px 54px rgba(94, 42, 21, .18),
            0 2px 0 rgba(255, 255, 255, .75) inset,
            0 -2px 0 rgba(225, 187, 156, .2) inset;
          border-color: #dcb08f;
        }

        .story-item h3 {
          margin: 0 0 12px;
          font-size: clamp(16px, 1.5vw, 20px);
          letter-spacing: .05em;
          text-transform: uppercase;
          color: #5a2412;
          transform: translateZ(22px);
        }

        .story-item p {
          margin: 0;
          color: #74452d;
          font-size: clamp(15px, 1.25vw, 19px);
          line-height: 1.8;
          max-width: 1100px;
          transform: translateZ(14px);
        }

        @keyframes blink {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }


        @keyframes cardRise {
          from { opacity: 0; transform: translateY(18px) rotateX(3deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }








        @media (max-width: 1000px) {
          .about-container { min-height: 148vh; }
          .wrap { grid-template-columns: 1fr; gap: 18px; }
          .map-area { min-height: 60vh; }
          .india-img { max-height: 56vh; }
          .side {
            min-height: auto;
            max-height: 48vh;
            border-left: 0;
            border-top: 1px solid #eadaca;
            padding-left: 0;
            padding-top: 12px;
          }
          .story-item p {
            font-size: 15px;
            line-height: 1.72;
          }
        }

        @media (max-width: 640px) {
          .about-container { padding: 22px 14px 34px; min-height: 136vh; }
          .top-bar { margin-bottom: 16px; }
          .counter { font-size: 11px; }
          .map-area { min-height: 46vh; }
          .india-img { max-height: 42vh; }
          .title { font-size: clamp(24px, 7vw, 32px); }
          .story-title { font-size: clamp(22px, 7vw, 30px); }
          .story-item { border-radius: 14px; padding: 20px 16px; }
          .story-item:hover { transform: translateY(-4px) scale(1.003); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div className="about-container">
        <div className="top-bar">
          <div className="title-wrap">
            <p className="eyebrow">Vijayam Publications</p>
            <h1 className="title">Distribution Network</h1>
            <p className="subtitle">A clear view of our active state presence across India.</p>
          </div>
          <div className="counter">
            STATE · {String(active.number).padStart(2, "0")} · {active.code}
          </div>
        </div>

        <div className="wrap">
          <div className="map-area">
            <div className="map-shell">
              <img src="/images/india.jpg" alt="India map" className="india-img" />
            </div>
          </div>

          <aside className="side">
            <p className="side-title">11 Distribution States</p>
            <div className="list">
              {STATES.map((s) => (
                <button
                  key={s.id}
                  className={`btn ${activeId === s.id ? "active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                  aria-pressed={activeId === s.id}
                >
                  <span className="btn-number">{String(s.number).padStart(2, "0")}</span>
                  <span className="btn-code">{s.code}</span>
                  <span className="btn-name">{s.name}</span>
                </button>
              ))}
            </div>

            <div className="meta">
              <span className="meta-dot" />
              Active: <b>{active.name}</b>
            </div>
          </aside>
        </div>

        <section className="story">
          <p className="story-head">About Us</p>
          <h2 className="story-title">Why we started, and how we continue to grow with purpose.</h2>
          <div className="story-grid">
            <article className="story-item">
              <h3>Why we started</h3>
              <p>
                Vijayam Publications was started to make quality educational and meaningful reading content
                accessible across regions where consistent distribution was difficult.
              </p>
            </article>
            <article className="story-item">
              <h3>Our mission</h3>
              <p>
                We focus on dependable delivery, long-term partnerships, and reader-first curation so institutions,
                stores, and learners can trust what reaches them.
              </p>
            </article>
            <article className="story-item">
              <h3>How we work</h3>
              <p>
                With a state-wise distribution model, responsive planning, and localized support, we build a
                scalable network that stays reliable as demand evolves.
              </p>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}