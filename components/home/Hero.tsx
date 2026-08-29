"use client";

import {
  JSX,
  useEffect,
  useRef,
  useState,
} from "react";

const coverImage = "/images/book-pbbsc.jpg";
const appliedAnatomyImage = "/images/appliedanatomy.jpg";

type Book = {
 id: number;
 image: string;
 title: string;
subtitle: string;
};

type SocialLink = {
name: string;
 href: string;
 label: string;
};

const books: Book[] = [
  { id: 1, image: appliedAnatomyImage, title: "Applied Anatomy", subtitle: "Nursing Education" },
  { id: 2, image: coverImage, title: "PBBSc Nursing", subtitle: "Professional Degree" },
];

const socialLinks: SocialLink[] = [
  { name: "instagram", href: "https://www.instagram.com/vijayampublications", label: "Instagram" },
  { name: "facebook", href: "https://www.facebook.com/profile.php?id=100087234593363", label: "Facebook" },
  { name: "twitter", href: "https://twitter.com/Vijayambooks", label: "Twitter" },
  { name: "medium", href: "https://medium.com/@vijayampublicationsonline", label: "Medium" },
  { name: "youtube", href: "https://www.youtube.com/@vijayampublications", label: "YouTube" },
];

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
      </>
    ),
    facebook: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    twitter: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    medium: (
      <>
        <ellipse cx="8" cy="12" rx="5" ry="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="17.5" cy="12" rx="2.5" ry="5.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="22" cy="12" rx="1" ry="4.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
    youtube: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29.94 29.94 0 0 0 1 11.75a29.94 29.94 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29.94 29.94 0 0 0 .46-5.25 29.94 29.94 0 0 0-.46-5.33z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="9.75 8.68 9.75 15.32 16.5 12 9.75 8.68" fill="currentColor" stroke="none" />
      </>
    ),
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">{icons[name]}</svg>;
}

function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (coarsePointer.matches) return;

    const state = {
      x: -100, y: -100,
      tx: -100, ty: -100,
      visible: false,
      hovering: false,
      clicking: false,
    };

    document.documentElement.classList.add("gc-enabled");

    let raf = 0;

    const animate = () => {
      state.x += (state.tx - state.x) * 0.1;
      state.y += (state.ty - state.y) * 0.1;

      cursor.style.transform = `translate3d(${state.x - 20}px, ${state.y - 20}px, 0)`;
      cursor.classList.toggle("gc-visible", state.visible);
      cursor.classList.toggle("gc-hovering", state.hovering);
      cursor.classList.toggle("gc-clicking", state.clicking);

      raf = requestAnimationFrame(animate);
    };

    const move = (e: PointerEvent) => {
      state.tx = e.clientX;
      state.ty = e.clientY;
      state.visible = true;

      const el = e.target as HTMLElement | null;
      const closest = el?.closest("a,button,input,[role='button'],.social-link,.hero-btn,.book-display-stage") as HTMLElement | null;
      state.hovering = !!closest;
    };

    const down = () => { state.clicking = true; };
    const up = () => {
      setTimeout(() => { state.clicking = false; }, 100);
    };
    const leave = () => {
      state.visible = false;
      state.hovering = false;
      state.clicking = false;
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("gc-enabled");
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={cursorRef} className="gc-cursor" aria-hidden="true">
      <svg className="gc-ring" viewBox="0 0 40 40" width="40" height="40">
        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--gc-ring-color)" strokeWidth="1.2" opacity="0.7" />
      </svg>
      <div className="gc-center-dot" />
    </div>
  );
}

function BookShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const timerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const currentBook = books[activeIndex];

  const advanceBook = () => {
    if (pausedRef.current || !visibleRef.current || reducedMotionRef.current) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % books.length);
      setIsTransitioning(false);
    }, 1200);
  };

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && document.visibilityState === "visible";
    }, { threshold: 0.05 });

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    const startCycle = () => {
      timerRef.current = window.setInterval(advanceBook, 5500);
    };

    startCycle();

    const onVisChange = () => {
      visibleRef.current = document.visibilityState === "visible" && !!stageRef.current && (() => {
        const rect = stageRef.current!.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      })();
    };

    document.addEventListener("visibilitychange", onVisChange);
    motionQuery.addEventListener("change", () => {
      reducedMotionRef.current = motionQuery.matches;
    });

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
      motionQuery.removeEventListener("change", () => {});
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    stageRef.current?.classList.toggle("is-paused", pausedRef.current);
  };

  return (
    <div ref={stageRef} className="book-display-stage" onClick={togglePause} role="button" tabIndex={0} aria-label={`Featured book: ${currentBook.title}. Click to pause or resume.`} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePause(); } }}>
      <div className="book-display-frame">
        <div className="book-ambient-light" aria-hidden="true" />
        
        <div className="book-cover-container">
          <div className={`book-cover-wrapper ${isTransitioning ? 'is-dissolving' : 'is-active'}`}>
            <div className="book-cover-image">
              <img src={currentBook.image} alt={currentBook.title} draggable={false} />
            </div>
            <div className="book-spine" aria-hidden="true" />
            <div className="book-pages" aria-hidden="true" />
            <div className="book-shadow-base" aria-hidden="true" />
            <div className="book-light-pass" aria-hidden="true" />
          </div>
        </div>

        <div className="book-meta" aria-hidden="true">
          <span className="book-meta-label">FEATURED PUBLICATION</span>
          <span className="book-meta-divider" />
          <span className="book-meta-title">{currentBook.title}</span>
          <span className="book-meta-subtitle">{currentBook.subtitle}</span>
          <span className="book-meta-edition">VIJAYAM EDITION</span>
        </div>

        <div className="book-ground-line" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const onTheme = () => update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    window.addEventListener("vp:theme-change", onTheme);

    return () => {
      mo.disconnect();
      window.removeEventListener("vp:theme-change", onTheme);
    };
  }, []);

  return (
    <section className={`hero-page ${isDark ? "hero-night" : "hero-light"}`}>
      <PremiumCursor />

      <style>{`
        * { box-sizing: border-box; }

        .hero-page {
          --ink: #1a1814;
          --muted: #5c5548;
          --gold: #8b6914;
          --gold-soft: #b9975b;
          --parchment: #f7f3eb;
          --ivory: #fcfaf6;
          --shadow-soft: rgba(40, 30, 10, 0.06);
          --shadow-deep: rgba(40, 30, 10, 0.12);
          font-family: 'Inter', 'Georgia', ui-serif, serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: var(--ivory);
          color: var(--ink);
          transition: background 800ms ease, color 800ms ease;
        }

        .hero-page.hero-night {
          --ink: #f0ede5;
          --muted: #b0a89a;
          --gold: #c9a84c;
          --gold-soft: #a68b4a;
          --parchment: #1c1e24;
          --ivory: #16181d;
          --shadow-soft: rgba(0, 0, 0, 0.2);
          --shadow-deep: rgba(0, 0, 0, 0.35);
          background: var(--ivory);
        }

        html.gc-enabled, html.gc-enabled body, html.gc-enabled * { cursor: none !important; }
        @media (pointer: coarse) { html.gc-enabled, html.gc-enabled body, html.gc-enabled * { cursor: auto !important; } }

        .gc-cursor {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 99999;
          width: 40px;
          height: 40px;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.2s ease;
          --gc-ring-color: #8b6914;
        }
        .hero-page.hero-night .gc-cursor {
          --gc-ring-color: #c9a84c;
        }
        .gc-cursor.gc-visible { opacity: 1; }
        .gc-ring { position: absolute; inset: 0; transition: transform 0.25s ease, opacity 0.25s ease; }
        .gc-center-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          margin: -2.5px 0 0 -2.5px;
          border-radius: 50%;
          background: var(--gc-ring-color);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .gc-cursor.gc-hovering .gc-ring { transform: scale(1.25); opacity: 0.9; }
        .gc-cursor.gc-hovering .gc-center-dot { transform: scale(0.7); box-shadow: 0 0 12px rgba(139, 105, 20, 0.3); }
        .gc-cursor.gc-clicking .gc-ring { transform: scale(0.9); opacity: 0.6; }
        .gc-cursor.gc-clicking .gc-center-dot { transform: scale(1.3); }
        @media (pointer: coarse) { .gc-cursor { display: none !important; } }

        .hero-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: 
            radial-gradient(ellipse at 65% 45%, rgba(139, 105, 20, 0.03) 0%, transparent 55%),
            radial-gradient(ellipse at 35% 40%, rgba(0, 0, 0, 0.02) 0%, transparent 60%);
          transition: opacity 800ms ease;
        }
        .hero-page.hero-night::before {
          background: 
            radial-gradient(ellipse at 65% 45%, rgba(201, 168, 76, 0.04) 0%, transparent 55%),
            radial-gradient(ellipse at 35% 40%, rgba(0, 0, 0, 0.08) 0%, transparent 60%);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: clamp(3rem, 6vw, 7rem);
          padding: clamp(2rem, 5vw, 5rem) clamp(2rem, 6vw, 7rem);
          max-width: 1500px;
          margin: 0 auto;
        }

        .hero-copy {
          position: relative;
          z-index: 10;
          max-width: 580px;
        }

        .hero-eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .hero-brand {
          display: block;
          font-size: clamp(1.8rem, 2.2vw, 2.4rem);
          font-weight: 350;
          letter-spacing: 0.08em;
          line-height: 1.15;
          color: var(--ink);
          margin-bottom: 0.4rem;
          transition: color 800ms ease;
        }

        .hero-tagline {
          font-size: 0.88rem;
          font-weight: 400;
          line-height: 1.6;
          color: var(--muted);
          max-width: 440px;
          margin-bottom: 2.2rem;
          transition: color 800ms ease;
        }

        .hero-headline {
          font-size: clamp(2.6rem, 4vw, 4.2rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0 0 1.2rem;
          transition: color 800ms ease;
        }

        .hero-headline-accent {
          color: var(--gold);
          transition: color 800ms ease;
        }

        .hero-description {
          font-size: 0.92rem;
          font-weight: 400;
          line-height: 1.7;
          color: var(--muted);
          max-width: 480px;
          margin-bottom: 2rem;
          transition: color 800ms ease;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 50px;
          padding: 0 1.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 650;
          letter-spacing: 0.04em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .hero-btn.primary {
          background: var(--ink);
          color: var(--parchment);
          border: 1px solid var(--ink);
        }
        .hero-btn.primary:hover {
          background: var(--gold-soft);
          border-color: var(--gold-soft);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--shadow-deep);
        }
        .hero-btn.primary:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .hero-btn.secondary {
          background: transparent;
          color: var(--ink);
          border: 1px solid rgba(139, 105, 20, 0.3);
        }
        .hero-btn.secondary:hover {
          border-color: var(--gold-soft);
          background: rgba(139, 105, 20, 0.04);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--shadow-soft);
        }
        .hero-btn.secondary:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .hero-btn::after {
          content: "→";
          display: inline-block;
          margin-left: 0.2em;
          transition: transform 0.3s ease;
        }
        .hero-btn:hover::after {
          transform: translateX(4px);
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
          position: relative;
          z-index: 20;
        }

        .social-link {
          display: grid;
          place-items: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          color: var(--muted);
          border: 1px solid rgba(139, 105, 20, 0.18);
          background: transparent;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
          cursor: pointer;
          position: relative;
        }

        .social-link::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 10px;
          opacity: 0;
          background: radial-gradient(circle at center, rgba(139, 105, 20, 0.08) 0%, transparent 70%);
          transition: opacity 0.25s ease;
        }

        .social-link:hover {
          color: var(--gold);
          border-color: var(--gold-soft);
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 24px var(--shadow-soft), 0 0 0 1px var(--gold-soft);
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link:active {
          transform: translateY(-1px) scale(0.98);
          box-shadow: 0 4px 12px var(--shadow-soft);
        }

        .social-link, .social-link:hover, .social-link:active, .social-link:visited { text-decoration: none; }

        .social-link svg {
          width: 20px;
          height: 20px;
          fill: none;
          stroke: currentColor;
          transition: transform 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .social-link:hover svg {
          transform: scale(1.08);
        }

        .book-display-stage {
          position: relative;
          min-height: 600px;
          display: grid;
          place-items: center;
          cursor: pointer;
          outline: none;
          z-index: 5;
        }

        .book-display-stage:focus-visible {
          outline: 2px solid var(--gold-soft);
          outline-offset: 12px;
          border-radius: 8px;
        }

        .book-display-frame {
          position: relative;
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .book-ambient-light {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 450px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(139, 105, 20, 0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .hero-page.hero-night .book-ambient-light {
          background: radial-gradient(ellipse, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
        }

        .book-cover-container {
          position: relative;
          z-index: 1;
          perspective: 1000px;
        }

        .book-cover-wrapper {
          position: relative;
          width: 280px;
          height: 400px;
          transition: opacity 1.2s cubic-bezier(.22, .61, .36, 1), transform 1.2s cubic-bezier(.22, .61, .36, 1);
        }

        .book-cover-wrapper.is-active {
          opacity: 1;
          transform: scale(1);
        }

        .book-cover-wrapper.is-dissolving {
          opacity: 0;
          transform: scale(0.98) translateY(-4px);
        }

        .book-cover-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 3px 8px 8px 3px;
          overflow: hidden;
          box-shadow: 
            0 30px 60px rgba(40, 30, 10, 0.15),
            0 12px 24px rgba(40, 30, 10, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.5s ease, transform 0.5s ease;
        }

        .hero-page.hero-night .book-cover-image {
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.35),
            0 12px 24px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .book-display-stage:hover .book-cover-image {
          transform: translateY(-6px);
          box-shadow: 
            0 40px 80px rgba(40, 30, 10, 0.2),
            0 18px 36px rgba(40, 30, 10, 0.14),
            0 0 0 1px rgba(139, 105, 20, 0.12);
        }
        .hero-page.hero-night .book-display-stage:hover .book-cover-image {
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.45),
            0 18px 36px rgba(0, 0, 0, 0.32),
            0 0 0 1px rgba(201, 168, 76, 0.12);
        }

        .book-cover-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
        }

        .book-spine {
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15), rgba(0,0,0,0.04));
          border-radius: 3px 0 0 3px;
          z-index: 1;
          pointer-events: none;
        }

        .book-pages {
          position: absolute;
          top: 2px;
          right: -3px;
          width: 4px;
          height: calc(100% - 4px);
          background: linear-gradient(90deg, rgba(255,255,255,0.4), rgba(200,180,140,0.3));
          border-radius: 0 5px 5px 0;
          z-index: 0;
          pointer-events: none;
        }
        .hero-page.hero-night .book-pages {
          background: linear-gradient(90deg, rgba(255,255,255,0.08), rgba(180,160,120,0.15));
        }

        .book-shadow-base {
          position: absolute;
          bottom: -16px;
          left: 50%;
          transform: translateX(-50%);
          width: 85%;
          height: 20px;
          background: radial-gradient(ellipse, rgba(40, 30, 10, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .hero-page.hero-night .book-shadow-base {
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.5) 0%, transparent 70%);
        }
        .book-display-stage:hover .book-shadow-base {
          transform: translateX(-50%) scale(0.9);
          opacity: 0.7;
        }

        .book-light-pass {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 0%,
            transparent 40%,
            rgba(255, 255, 255, 0.06) 45%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.04) 55%,
            transparent 60%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 3px 8px 8px 3px;
        }

        .book-cover-wrapper.is-active .book-light-pass {
          animation: subtleLightPass 12s ease-in-out infinite;
        }

        @keyframes subtleLightPass {
          0%, 85%, 100% { opacity: 0; }
          90% { opacity: 1; }
          95% { opacity: 0; }
        }

        .book-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          text-align: center;
          z-index: 2;
        }

        .book-meta-label {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .book-meta-divider {
          width: 40px;
          height: 1px;
          background: var(--gold-soft);
          opacity: 0.4;
        }

        .book-meta-title {
          font-size: 0.95rem;
          font-weight: 650;
          color: var(--ink);
          letter-spacing: 0.02em;
        }

        .book-meta-subtitle {
          font-size: 0.72rem;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        .book-meta-edition {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
        }

        .book-ground-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold-soft), transparent);
          opacity: 0.3;
          border-radius: 1px;
        }

        @media (max-width: 1100px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3rem 2rem;
            min-height: auto;
          }
          .hero-copy {
            max-width: 100%;
            text-align: center;
            margin: 0 auto;
          }
          .hero-tagline {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-description {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-actions {
            justify-content: center;
          }
          .social-links {
            justify-content: center;
          }
          .book-display-stage {
            min-height: 500px;
          }
          .book-cover-wrapper {
            width: 240px;
            height: 340px;
          }
          .book-ambient-light {
            width: 280px;
            height: 360px;
          }
        }

        @media (max-width: 600px) {
          .hero-inner {
            padding: 2rem 1.2rem;
            gap: 2rem;
          }
          .hero-headline {
            font-size: clamp(2rem, 8vw, 2.8rem);
          }
          .hero-brand {
            font-size: 1.4rem;
          }
          .hero-btn {
            width: 100%;
            justify-content: center;
          }
          .hero-actions {
            flex-direction: column;
          }
          .book-display-stage {
            min-height: 400px;
          }
          .book-cover-wrapper {
            width: 200px;
            height: 280px;
          }
          .book-ambient-light {
            width: 240px;
            height: 300px;
          }
          .book-meta-title {
            font-size: 0.85rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .book-cover-wrapper { transition: opacity 0.3s ease; }
          .book-cover-wrapper.is-dissolving { transform: none; }
          .book-light-pass { animation: none; opacity: 0; }
          .hero-btn { transition: none; }
          .hero-btn:hover { transform: none; box-shadow: none; }
          .social-link:hover { transform: none; }
          .book-display-stage:hover .book-cover-image { transform: none; box-shadow: 0 30px 60px rgba(40, 30, 10, 0.15), 0 12px 24px rgba(40, 30, 10, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05); }
          .book-display-stage:hover .book-shadow-base { transform: translateX(-50%); opacity: 1; }
        }
      `}</style>

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">Built for the next generation of nurses</span>
          
          <span className="hero-brand">VIJAYAM PUBLICATIONS</span>
          
          <p className="hero-tagline">
            One of the Major Notable Publishers in India,<br />
            Aiming to Publish Good Academic Books in Nursing &amp; Degree.
          </p>

          <h1 className="hero-headline">
            Academic<br />
            knowledge.<br />
            <span className="hero-headline-accent">Beautifully</span><br />
            published.
          </h1>

          <p className="hero-description">
            Sharp concepts. Beautiful books. Smarter preparation for nursing students, educators and tomorrow's healthcare professionals.
          </p>

          <div className="hero-actions" aria-label="Hero actions">
            <a className="hero-btn primary" href="#shop">Shop</a>
            <a className="hero-btn secondary" href="#categories">Browse Categories</a>
          </div>

          <div className="social-links" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a 
                className="social-link" 
                href={social.href} 
                aria-label={social.label} 
                title={social.label} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={social.name}
              >
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>
        </div>

        <BookShowcase />
      </div>
    </section>
  );
}