"use client";

import { useEffect, useRef, useState } from "react";

const books = [
  { title: "Medical Surgical Nursing", subject: "B.Sc Nursing", color: "#c99124" },
  { title: "Child Health Nursing", subject: "Pediatric Care", color: "#b65b62" },
  { title: "Mental Health Nursing", subject: "Psychiatric Care", color: "#6956a6" },
  { title: "Community Health Nursing", subject: "Public Health", color: "#3d897f" },
  { title: "Nutrition", subject: "Health Sciences", color: "#d27332" },
  { title: "Anatomy", subject: "Foundation Series", color: "#386fa4" },
];

export default function HeroSection() {
  const [nightMode, setNightMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateAnimation = () => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const total = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const current = Math.min(Math.max(-rect.top / total, 0), 1);

      setProgress(current);
    };

    updateAnimation();
    window.addEventListener("scroll", updateAnimation, { passive: true });
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("scroll", updateAnimation);
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={`hero-page ${nightMode ? "hero-night" : "hero-day"}`}
    >
      <style>{`
        * { box-sizing: border-box; }

        .hero-page {
          --text: #28231d;
          --muted: #655d52;
          --accent: #9a711d;
          --surface: rgba(255, 251, 239, .72);
          --border: rgba(161, 121, 35, .28);
          min-height: 185vh;
          position: relative;
          overflow: clip;
          transition: background .7s ease, color .7s ease;
          background:
            radial-gradient(circle at 10% 12%, rgba(241, 202, 102, .42), transparent 27%),
            radial-gradient(circle at 90% 80%, rgba(213, 168, 53, .25), transparent 30%),
            #fff8e8;
          color: var(--text);
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        .hero-night {
          --text: #f7f4ef;
          --muted: #cac7d2;
          --accent: #f2c75b;
          --surface: rgba(21, 25, 42, .66);
          --border: rgba(128, 204, 235, .25);
          background:
            radial-gradient(circle at 12% 16%, rgba(109, 60, 180, .30), transparent 29%),
            radial-gradient(circle at 88% 72%, rgba(0, 185, 215, .20), transparent 32%),
            linear-gradient(140deg, #06070b, #111326 55%, #080c16);
        }

        .hero-sticky {
          min-height: 100vh;
          position: sticky;
          top: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          max-width: 1500px;
          margin: auto;
          padding: 2rem 6vw;
        }

        .theme-toggle {
          position: absolute;
          top: 1.75rem;
          right: 6vw;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: .65rem;
          padding: .55rem .8rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--surface);
          color: var(--text);
          cursor: pointer;
          backdrop-filter: blur(14px);
          font-weight: 700;
        }

        .toggle-track {
          width: 2.7rem;
          height: 1.45rem;
          padding: .16rem;
          border-radius: 999px;
          background: ${nightMode ? "#7052c7" : "#d6ae4c"};
          transition: background .3s ease;
        }

        .toggle-dot {
          display: block;
          width: 1.13rem;
          height: 1.13rem;
          border-radius: 50%;
          background: white;
          transform: translateX(${nightMode ? "1.23rem" : "0"});
          transition: transform .3s ease;
        }

        .hero-copy { position: relative; z-index: 2; }

        .eyebrow {
          display: inline-flex;
          padding: .65rem 1rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--surface);
          color: var(--accent);
          font-size: .83rem;
          font-weight: 800;
        }

        .hero-copy h1 {
          max-width: 700px;
          margin: 1.35rem 0;
          font-size: clamp(3.2rem, 6.4vw, 6.5rem);
          line-height: .95;
          letter-spacing: -.075em;
        }

        .hero-copy h1 span { display: block; color: var(--accent); }

        .hero-copy p {
          max-width: 580px;
          color: var(--muted);
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .9rem;
          margin-top: 2rem;
        }

        .hero-actions a {
          padding: 1rem 1.35rem;
          border-radius: .9rem;
          text-decoration: none;
          font-weight: 800;
        }

        .primary-action {
          background: linear-gradient(110deg, #f0ce68, #a57316);
          color: #292116;
        }

        .secondary-action {
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
        }

        .stats { display: flex; gap: 2.2rem; margin-top: 3.5rem; }
        .stat + .stat { border-left: 1px solid var(--border); padding-left: 2.2rem; }
        .stat strong { display: block; color: var(--accent); font-size: 1.8rem; }
        .stat small { color: var(--muted); font-size: .72rem; font-weight: 800; text-transform: uppercase; }

        .book-stage {
          position: relative;
          height: min(62vw, 650px);
          min-height: 480px;
          perspective: 1600px;
        }

        .stage-glow {
          position: absolute;
          inset: 18%;
          border-radius: 50%;
          background: ${nightMode
            ? "radial-gradient(circle, rgba(118,82,224,.48), rgba(34,211,238,.12) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(222,169,45,.38), rgba(255,230,153,.10) 45%, transparent 70%)"};
          filter: blur(20px);
          transform: scale(${0.8 + progress * 0.25});
          transition: background .7s ease;
        }

        .book {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(112px, 13vw, 172px);
          aspect-ratio: .64;
          padding: 1rem;
          border: 1px solid rgba(255,255,255,.4);
          border-radius: .7rem 1rem 1rem .7rem;
          color: white;
          box-shadow: -11px 12px 0 rgba(0,0,0,.15), 0 30px 50px rgba(0,0,0,.24);
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .book::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0,0,0,.25), transparent 13%), linear-gradient(145deg, rgba(255,255,255,.28), transparent 34%);
        }

        .book-number, .book-subject, .book-title { position: relative; z-index: 1; }
        .book-number { display: block; font-size: .68rem; font-weight: 900; }

        .book-subject {
          position: absolute;
          bottom: 3.8rem;
          left: 1rem;
          right: 1rem;
          font-size: .58rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .book-title {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: .7rem;
          font-size: clamp(.75rem, 1.15vw, 1rem);
          line-height: 1.08;
        }

        .scroll-note {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          color: var(--muted);
          font-size: .72rem;
          font-weight: 800;
          text-transform: uppercase;
          transform: translateX(-50%);
        }

        @media (max-width: 900px) {
          .hero-page { min-height: 150vh; }
          .hero-sticky { grid-template-columns: 1fr; gap: 1rem; padding-top: 5.5rem; }
          .book-stage { height: 50vh; min-height: 390px; }
          .theme-toggle { right: 1.25rem; top: 1rem; }
        }
      `}</style>

      <div className="hero-sticky">
        <button
          className="theme-toggle"
          onClick={() => setNightMode((current) => !current)}
          aria-label="Toggle color theme"
        >
          {nightMode ? "Dark" : "Light"}
          <span className="toggle-track"><span className="toggle-dot" /></span>
        </button>

        <div className="hero-copy">
          <div className="eyebrow">✦ India&apos;s trusted academic publisher</div>
          <h1>Learn better <span>with Vijayam Publications.</span></h1>
          <p>Premium books for B.Sc Nursing, GNM, ANM, Allied Health Sciences, competitive examinations, and degree courses.</p>

          <div className="hero-actions">
            <a className="primary-action" href="/books">Browse Books →</a>
            <a className="secondary-action" href="/categories">Explore Categories</a>
          </div>

          <div className="stats">
            <div className="stat"><strong>600+</strong><small>Books</small></div>
            <div className="stat"><strong>1M+</strong><small>Students</small></div>
            <div className="stat"><strong>23+</strong><small>Years</small></div>
          </div>
        </div>

        <div className="book-stage" aria-label="Vijayam book collection">
          <div className="stage-glow" />
          {books.map((book, index) => {
            const angle = (index - 2.5) * 15;
            const spreadX = (index - 2.5) * 20 * progress;
            const spreadY = Math.abs(index - 2.5) * 8 * progress;
            const rotation = angle * progress;
            const depth = (2.5 - Math.abs(index - 2.5)) * 40;
            const scale = 0.72 + progress * 0.28;

            return (
              <article
                className="book"
                key={book.title}
                style={{
                  zIndex: 10 - Math.abs(index - 2.5),
                  background: `linear-gradient(145deg, ${book.color}, #161616)`,
                  transform: `translate(-50%, -50%) translateX(${spreadX}%) translateY(${spreadY}%) translateZ(${depth}px) rotateY(${-rotation}deg) rotateZ(${rotation}deg) scale(${scale})`,
                }}
              >
                <span className="book-number">VIJAYAM · 0{index + 1}</span>
                <span className="book-subject">{book.subject}</span>
                <strong className="book-title">{book.title}</strong>
              </article>
            );
          })}
        </div>
      </div>

      <div className="scroll-note">Scroll to reveal the collection ↓</div>
    </section>
  );
}