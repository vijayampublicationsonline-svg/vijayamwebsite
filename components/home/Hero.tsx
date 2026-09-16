"use client";

import {
  JSX,
  useEffect,
  useRef,
  useState,
} from "react";

const coverImage = "/images/book-pbbsc.jpg";
const appliedAnatomyImage = "/images/appliedanatomy.jpg";
const eagleLogo = "/images/eagle logo .jpg";
const wingsImage = "/images/wings.jpg";

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

function FloatingAccents() {
  return (
    <div className="floating-accents" aria-hidden="true">
      <div className="accent-orb accent-orb-1" />
      <div className="accent-orb accent-orb-2" />
      <div className="accent-orb accent-orb-3" />
      <div className="accent-line accent-line-1" />
      <div className="accent-line accent-line-2" />
      <div className="accent-diamond accent-diamond-1" />
      <div className="accent-diamond accent-diamond-2" />
      <div className="accent-circle-ring" />
      <div className="accent-dots-grid" />
      <div className="grain-overlay" />
    </div>
  );
}

function BookShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pausedRef = useRef(false);
  const visibleRef = useRef(true);
  const timerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const currentBook = books[activeIndex];

  const advanceBook = () => {
    if (pausedRef.current || !visibleRef.current || reducedMotionRef.current || isOpen) return;

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
    const onMotionChange = () => { reducedMotionRef.current = motionQuery.matches; };
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisChange);
      motionQuery.removeEventListener("change", onMotionChange);
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [activeIndex, isOpen]);

  const handleBookClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setIsAnimating(false), 1000);
    } else {
      setIsOpen(false);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <div
      ref={stageRef}
      className={`book-display-stage ${isOpen ? "book-is-open" : ""}`}
      onClick={handleBookClick}
      role="button"
      tabIndex={0}
      aria-label={`Featured book: ${currentBook.title}. Click to ${isOpen ? "close" : "open"} the book.`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleBookClick(); } }}
    >
      <div className="book-floating-badge badge-top-right" aria-hidden="true">
        <span className="badge-star">★</span>
        <span className="badge-text">BESTSELLER</span>
      </div>
      <div className="book-floating-badge badge-bottom-left" aria-hidden="true">
        <span className="badge-text">NEW EDITION</span>
      </div>

      <div className="book-display-frame">
        <div className="book-ambient-light" aria-hidden="true" />
        <div className="book-ambient-light-secondary" aria-hidden="true" />

        <div className="book-cover-container">
          <div className={`book-scene ${isOpen ? "scene-open" : "scene-closed"}`}>
            <div className="book-3d">
              <div className="book-back-cover" aria-hidden="true">
                <div className="back-cover-surface" />
              </div>

              <div className="book-pages-stack" aria-hidden="true">
                <div className="page-edge page-edge-1" />
                <div className="page-edge page-edge-2" />
                <div className="page-edge page-edge-3" />
                <div className="page-edge page-edge-4" />
                <div className="page-edge page-edge-5" />
              </div>

              <div className="book-front-cover">
                <div className={`book-cover-wrapper ${isTransitioning ? "is-dissolving" : "is-active"}`}>
                  <div className="book-cover-image">
                    <img src={currentBook.image} alt={currentBook.title} draggable={false} />
                  </div>
                  <div className="book-light-pass" aria-hidden="true" />
                </div>
              </div>

              <div className="book-spine-edge" aria-hidden="true" />
            </div>
          </div>

          <div className={`book-shadow ${isOpen ? "shadow-deep" : "shadow-normal"}`} aria-hidden="true" />
        </div>

        <div className="book-meta" aria-hidden="true">
          <span className="book-meta-label">FEATURED PUBLICATION</span>
          <span className="book-meta-divider" />
          <span className="book-meta-title">{currentBook.title}</span>
          <span className="book-meta-subtitle">{currentBook.subtitle}</span>
          <span className="book-meta-edition">VIJAYAM EDITION</span>
          <span className="book-meta-hint">{isOpen ? "Click to close" : "Click to open"}</span>
        </div>

        <div className="book-ground-line" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={`hero-page ${isDark ? "hero-night" : "hero-light"}`}>
      <PremiumCursor />
      <FloatingAccents />

      <style>{`
        * { box-sizing: border-box; }

        :root {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .hero-page {
          --ink: #0d0b08;
          --ink-soft: #1f1b12;
          --muted: #4a4030;
          --gold: #a76f00;
          --gold-bright: #f1b500;
          --gold-soft: #d89000;
          --gold-gradient: linear-gradient(135deg, #f1b500 0%, #ffd24a 35%, #d89000 70%, #a76f00 100%);
          --parchment: #fff6dd;
          --ivory: #fffdf7;
          --shadow-soft: rgba(50, 32, 6, 0.14);
          --shadow-deep: rgba(50, 32, 6, 0.25);
          --accent-orb-1: rgba(241, 181, 0, 0.2);
          --accent-orb-2: rgba(216, 144, 0, 0.16);
          --accent-orb-3: rgba(167, 111, 0, 0.12);
          font-family: 'Inter', 'Georgia', ui-serif, serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: var(--ivory);
          color: var(--ink);
          transition: background 800ms ease, color 800ms ease;
        }

        .hero-page.hero-night {
          --ink: #fff4cf;
          --ink-soft: #f4e3a8;
          --muted: #dec88c;
          --gold: #e6a800;
          --gold-bright: #ffd34d;
          --gold-soft: #f1b500;
          --gold-gradient: linear-gradient(135deg, #ffd34d 0%, #ffe183 35%, #f1b500 70%, #e6a800 100%);
          --parchment: #1d2027;
          --ivory: #111318;
          --shadow-soft: rgba(0, 0, 0, 0.35);
          --shadow-deep: rgba(0, 0, 0, 0.58);
          --accent-orb-1: rgba(255, 211, 77, 0.2);
          --accent-orb-2: rgba(241, 181, 0, 0.16);
          --accent-orb-3: rgba(230, 168, 0, 0.12);
          background: var(--ivory);
        }

        .floating-accents {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .grain-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: soft-light;
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.25) 0 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(0,0,0,0.2) 0 1px, transparent 1px);
          background-size: 3px 3px, 4px 4px;
        }

        .accent-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orbFloat 20s ease-in-out infinite;
        }

        .accent-orb-1 {
          width: 500px;
          height: 500px;
          background: var(--accent-orb-1);
          top: -15%;
          right: -10%;
          animation-delay: 0s;
        }

        .accent-orb-2 {
          width: 350px;
          height: 350px;
          background: var(--accent-orb-2);
          bottom: -10%;
          left: -5%;
          animation-delay: -7s;
        }

        .accent-orb-3 {
          width: 250px;
          height: 250px;
          background: var(--accent-orb-3);
          top: 40%;
          left: 50%;
          animation-delay: -14s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-15px, 25px) scale(0.95); }
          75% { transform: translate(-25px, -15px) scale(1.05); }
        }

        .accent-line {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, var(--gold-soft), transparent);
          opacity: 0.45;
          transform: rotate(-12deg);
        }

        .accent-line-1 {
          width: 300px;
          top: 18%;
          right: 5%;
        }

        .accent-line-2 {
          width: 200px;
          bottom: 25%;
          left: 3%;
          transform: rotate(8deg);
        }

        .accent-diamond {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 1px solid var(--gold-soft);
          opacity: 0.48;
          transform: rotate(45deg);
          animation: diamondPulse 4s ease-in-out infinite;
        }

        .accent-diamond-1 {
          top: 22%;
          left: 8%;
          animation-delay: 0s;
        }

        .accent-diamond-2 {
          bottom: 30%;
          right: 12%;
          animation-delay: -2s;
        }

        @keyframes diamondPulse {
          0%, 100% { opacity: 0.4; transform: rotate(45deg) scale(1); }
          50% { opacity: 0.75; transform: rotate(45deg) scale(1.3); }
        }

        .accent-circle-ring {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1px solid var(--gold-soft);
          opacity: 0.2;
          top: 55%;
          left: 15%;
          animation: ringRotate 30s linear infinite;
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .accent-dots-grid {
          position: absolute;
          width: 120px;
          height: 120px;
          top: 12%;
          right: 20%;
          opacity: 0.22;
          background-image: radial-gradient(circle, var(--gold-soft) 1.2px, transparent 1.2px);
          background-size: 16px 16px;
        }

        .hero-intro {
          position: fixed;
          inset: 0;
          z-index: 100000;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at center, rgba(255, 200, 40, 0.48), transparent 55%),
            linear-gradient(180deg, #fff6d1, #f8df92 60%, #efc35b);
          animation: introFadeOut 0.6s ease 2s forwards;
        }

        .hero-page.hero-night .hero-intro {
          background:
            radial-gradient(circle at center, rgba(255, 211, 77, 0.32), transparent 55%),
            linear-gradient(180deg, #191d25, #1f2430 60%, #272e3d);
        }

        .intro-wrap {
          position: relative;
          width: min(96vw, 820px);
          height: min(62vw, 420px);
          display: grid;
          place-items: center;
          animation: eagleFloat 2.1s ease-in-out both;
        }

        .wing {
          position: absolute;
          top: 50%;
          width: 325px;
          height: 208px;
          opacity: 0;
          transform-origin: 100% 52%;
          filter: drop-shadow(0 16px 30px rgba(86, 55, 8, 0.58));
          animation:
            wingReveal 0.45s ease 0.18s forwards,
            wingFlap 0.72s cubic-bezier(.42,0,.2,1) 0.35s 3,
            wingGlide 0.95s ease-out 1.75s forwards;
        }

        .wing img { width: 100%; height: 100%; display: block; object-fit: contain; }

        .wing.left {
          left: 50%;
          transform: translate(-99%, -50%) rotate(26deg) scale(0.67);
        }

        .wing.right {
          right: 50%;
          transform: translate(99%, -50%) rotate(-26deg) scale(0.67) scaleX(-1);
        }

        .hero-page.hero-night .wing {
          filter: drop-shadow(0 12px 28px rgba(0, 0, 0, 0.6));
        }

        .intro-logo {
          position: relative;
          z-index: 2;
          width: 162px;
          height: 162px;
          border-radius: 30px;
          overflow: hidden;
          border: 2px solid rgba(241, 181, 0, 0.85);
          box-shadow:
            0 20px 50px rgba(157, 97, 0, 0.45),
            0 0 38px rgba(241, 181, 0, 0.6);
          animation: logoPop 0.9s ease forwards;
          background: #fff;
        }

        .intro-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
        }

        @keyframes logoPop {
          0% { opacity: 0; transform: scale(0.65); }
          65% { opacity: 1; transform: scale(1.11); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes wingReveal {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes wingFlap {
          0% { transform: translate(-99%, -50%) rotate(26deg) scale(0.67); }
          50% { transform: translate(-101%, -52%) rotate(8deg) scale(0.73); }
          100% { transform: translate(-99%, -50%) rotate(26deg) scale(0.67); }
        }
        .wing.right {
          animation-name: wingReveal, wingFlapRight, wingGlideRight;
        }
        @keyframes wingFlapRight {
          0% { transform: translate(99%, -50%) rotate(-26deg) scale(0.67) scaleX(-1); }
          50% { transform: translate(101%, -52%) rotate(-8deg) scale(0.73) scaleX(-1); }
          100% { transform: translate(99%, -50%) rotate(-26deg) scale(0.67) scaleX(-1); }
        }

        @keyframes wingGlide {
          from { transform: translate(-99%, -50%) rotate(24deg) scale(0.68); opacity: 1; }
          to { transform: translate(-116%, -58%) rotate(40deg) scale(0.74); opacity: 0.2; }
        }
        @keyframes wingGlideRight {
          from { transform: translate(99%, -50%) rotate(-24deg) scale(0.68) scaleX(-1); opacity: 1; }
          to { transform: translate(116%, -58%) rotate(-40deg) scale(0.74) scaleX(-1); opacity: 0.2; }
        }

        @keyframes eagleFloat {
          0% { transform: translateY(10px) scale(0.985); }
          35% { transform: translateY(-4px) scale(1); }
          100% { transform: translateY(0) scale(1); }
        }

        @keyframes introFadeOut {
          to { opacity: 0; visibility: hidden; pointer-events: none; }
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
          --gc-ring-color: #f1b500;
        }
        .hero-page.hero-night .gc-cursor {
          --gc-ring-color: #ffd34d;
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
        .gc-cursor.gc-hovering .gc-center-dot { transform: scale(0.7); box-shadow: 0 0 14px rgba(241, 181, 0, 0.55); }
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
            radial-gradient(ellipse at 70% 40%, rgba(241, 181, 0, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 60%, rgba(167, 111, 0, 0.08) 0%, transparent 50%);
        }
        .hero-page.hero-night::before {
          background:
            radial-gradient(ellipse at 70% 40%, rgba(255, 211, 77, 0.14) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 60%, rgba(241, 181, 0, 0.1) 0%, transparent 50%);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: clamp(2rem, 5vw, 6rem);
          padding: clamp(2rem, 5vw, 5rem) clamp(2rem, 6vw, 7rem);
          max-width: 1500px;
          margin: 0 auto;
          animation: heroIn 1.2s var(--ease-out-expo);
        }

        @keyframes heroIn {
          from { opacity: 0; transform: translateY(18px) scale(0.995); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-copy {
          position: relative;
          z-index: 10;
          max-width: 620px;
          padding-left: clamp(0rem, 3vw, 3rem);
        }

        .hero-copy > * {
          opacity: 0;
          transform: translateY(14px);
          animation: copyReveal 0.9s var(--ease-out-expo) forwards;
        }
        .hero-copy > *:nth-child(1) { animation-delay: 0.15s; }
        .hero-copy > *:nth-child(2) { animation-delay: 0.28s; }
        .hero-copy > *:nth-child(3) { animation-delay: 0.42s; }
        .hero-copy > *:nth-child(4) { animation-delay: 0.56s; }
        .hero-copy > *:nth-child(5) { animation-delay: 0.7s; }
        .hero-copy > *:nth-child(6) { animation-delay: 0.84s; }
        .hero-copy > *:nth-child(7) { animation-delay: 0.95s; }

        @keyframes copyReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-copy::before {
          content: "";
          position: absolute;
          left: -2px;
          top: -10px;
          width: 3px;
          height: 60px;
          background: var(--gold-gradient);
          border-radius: 2px;
          opacity: 0.9;
          box-shadow: 0 0 16px rgba(241, 181, 0, 0.35);
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-bright);
          margin-bottom: 2rem;
          padding: 0.5rem 1rem;
          border: 1px solid rgba(241, 181, 0, 0.45);
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(241, 181, 0, 0.18), rgba(241, 181, 0, 0.08));
          box-shadow: 0 8px 24px rgba(167, 111, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.35);
          backdrop-filter: blur(8px);
        }

        .hero-eyebrow::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-bright);
          animation: dotPulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(241, 181, 0, 0.6);
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .hero-brand {
          display: block;
          font-size: clamp(1.6rem, 2vw, 2rem);
          font-weight: 300;
          letter-spacing: 0.12em;
          line-height: 1.2;
          color: var(--ink-soft);
          margin-bottom: 1rem;
          transition: color 800ms ease;
          opacity: 0.95;
        }

        .hero-tagline {
          font-size: clamp(1.05rem, 1.4vw, 1.3rem);
          font-weight: 300;
          line-height: 1.7;
          color: var(--muted);
          max-width: 520px;
          margin-bottom: 2.5rem;
          transition: color 800ms ease;
          padding-left: 1.5rem;
          border-left: 2px solid rgba(241, 181, 0, 0.5);
          font-style: italic;
        }

        .hero-headline {
          font-size: clamp(3.2rem, 5.5vw, 5.5rem);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          color: var(--ink);
          margin: 0 0 1.8rem;
          transition: color 800ms ease;
          position: relative;
        }

        .hero-headline-line {
          display: block;
          position: relative;
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        .hero-headline-line:first-child {
          font-weight: 700;
          font-size: 0.85em;
          opacity: 0.8;
        }

        .hero-headline-line:nth-child(2) {
          font-weight: 900;
          margin-top: -0.05em;
        }

        .hero-headline-line:nth-child(3) {
          font-weight: 300;
          font-style: italic;
          font-size: 1.05em;
        }

        .hero-headline-accent {
          background: var(--gold-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 900;
          font-style: normal;
          display: inline;
          filter: drop-shadow(0 0 10px rgba(241, 181, 0, 0.28));
        }

        .hero-headline-accent::after {
          content: "";
          display: inline-block;
          width: 0.6em;
          height: 0.6em;
          border-radius: 50%;
          background: var(--gold-bright);
          margin-left: 0.15em;
          vertical-align: super;
          font-size: 0.3em;
          animation: dotPulse 2s ease-in-out infinite;
          -webkit-text-fill-color: initial;
          box-shadow: 0 0 14px rgba(241, 181, 0, 0.58);
        }

        .hero-description {
          font-size: 0.95rem;
          font-weight: 400;
          line-height: 1.8;
          color: var(--muted);
          max-width: 480px;
          margin-bottom: 2.5rem;
          transition: color 800ms ease;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 54px;
          padding: 0 2rem;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 650;
          letter-spacing: 0.05em;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.4s var(--ease-out-expo);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(6px);
        }

        .hero-btn.primary {
          background: var(--ink);
          color: var(--parchment);
          border: 1px solid var(--ink);
          box-shadow: 0 6px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .hero-btn.primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--gold-gradient);
          opacity: 0;
          transition: opacity 0.4s var(--ease-out-expo);
          z-index: 0;
        }
        .hero-btn.primary:hover {
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 16px 42px rgba(241, 181, 0, 0.38), 0 4px 12px rgba(0,0,0,0.16);
        }
        .hero-btn.primary:hover::before {
          opacity: 1;
        }
        .hero-btn.primary span {
          position: relative;
          z-index: 1;
        }
        .hero-btn.primary:active {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(241, 181, 0, 0.26);
        }

        .hero-btn.secondary {
          background: rgba(255,255,255,0.45);
          color: var(--ink);
          border: 1px solid rgba(241, 181, 0, 0.5);
          position: relative;
        }
        .hero-page.hero-night .hero-btn.secondary {
          background: rgba(255,255,255,0.06);
        }
        .hero-btn.secondary::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: rgba(241, 181, 0, 0.1);
          opacity: 0;
          transition: opacity 0.4s var(--ease-out-expo);
        }
        .hero-btn.secondary:hover {
          border-color: var(--gold-bright);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(241, 181, 0, 0.2), 0 0 0 1px rgba(241, 181, 0, 0.3);
        }
        .hero-btn.secondary:hover::before {
          opacity: 1;
        }
        .hero-btn.secondary:active {
          transform: translateY(-1px);
        }

        .hero-btn::after {
          content: "→";
          display: inline-block;
          margin-left: 0.2em;
          transition: transform 0.4s var(--ease-out-expo);
          position: relative;
          z-index: 1;
        }
        .hero-btn:hover::after {
          transform: translateX(6px);
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
          position: relative;
          z-index: 20;
        }

        .social-link {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          color: var(--muted);
          border: 1px solid rgba(241, 181, 0, 0.28);
          background: rgba(241, 181, 0, 0.07);
          text-decoration: none;
          transition: all 0.35s var(--ease-out-back);
          cursor: pointer;
          position: relative;
          backdrop-filter: blur(6px);
        }

        .social-link::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 12px;
          opacity: 0;
          background: radial-gradient(circle at center, rgba(241, 181, 0, 0.2) 0%, transparent 70%);
          transition: opacity 0.35s ease;
        }

        .social-link:hover {
          color: var(--gold-bright);
          border-color: var(--gold-soft);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 28px var(--shadow-soft), 0 0 0 1px rgba(241, 181, 0, 0.3);
          background: rgba(241, 181, 0, 0.14);
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link:active {
          transform: translateY(-2px) scale(0.97);
        }

        .social-link, .social-link:hover, .social-link:active, .social-link:visited { text-decoration: none; }

        .social-link svg {
          width: 19px;
          height: 19px;
          fill: none;
          stroke: currentColor;
          transition: transform 0.35s var(--ease-out-back);
        }

        .social-link:hover svg {
          transform: scale(1.12);
        }

        .book-display-stage {
          position: relative;
          min-height: 620px;
          display: grid;
          place-items: center;
          cursor: pointer;
          outline: none;
          z-index: 5;
          animation: stageReveal 1.1s var(--ease-out-expo) 0.35s both;
        }

        @keyframes stageReveal {
          from { opacity: 0; transform: translateY(24px) rotateX(4deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }

        .book-floating-badge {
          position: absolute;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 1rem;
          border-radius: 20px;
          background: rgba(255, 250, 234, 0.94);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(241, 181, 0, 0.5);
          box-shadow: 0 6px 20px rgba(50, 32, 6, 0.2), 0 0 0 1px rgba(241, 181, 0, 0.2);
          white-space: nowrap;
          pointer-events: none;
          animation: badgeFloat 6s ease-in-out infinite;
        }

        .hero-page.hero-night .book-floating-badge {
          background: rgba(29, 32, 39, 0.92);
          border-color: rgba(255, 211, 77, 0.45);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.34), 0 0 0 1px rgba(255, 211, 77, 0.18);
        }

        .badge-top-right {
          top: 8%;
          right: -5%;
          animation-delay: 0s;
        }

        .badge-bottom-left {
          bottom: 18%;
          left: -8%;
          animation-delay: -3s;
        }

        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .badge-star {
          color: var(--gold-bright);
          font-size: 0.8rem;
          animation: starSpin 3s ease-in-out infinite;
          text-shadow: 0 0 8px rgba(241, 181, 0, 0.5);
        }

        @keyframes starSpin {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(15deg) scale(1.2); }
        }

        .badge-text {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink);
        }

        .book-display-stage:focus-visible {
          outline: 2px solid var(--gold-soft);
          outline-offset: 16px;
          border-radius: 12px;
        }

        .book-display-frame {
          position: relative;
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.2rem;
        }

        .book-ambient-light {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 380px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(241, 181, 0, 0.22) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ambientPulse 8s ease-in-out infinite;
        }

        .book-ambient-light-secondary {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(216, 144, 0, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          animation: ambientPulse 8s ease-in-out infinite;
          animation-delay: -4s;
        }

        @keyframes ambientPulse {
          0%, 100% { opacity: 0.65; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        .hero-page.hero-night .book-ambient-light {
          background: radial-gradient(ellipse, rgba(255, 211, 77, 0.2) 0%, transparent 70%);
        }
        .hero-page.hero-night .book-ambient-light-secondary {
          background: radial-gradient(ellipse, rgba(241, 181, 0, 0.14) 0%, transparent 70%);
        }

        .book-cover-container {
          position: relative;
          z-index: 1;
          perspective: 1200px;
        }

        .book-scene {
          width: 290px;
          height: 420px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s var(--ease-out-expo);
          animation: cinematicIdle 8s ease-in-out infinite;
        }

        @keyframes cinematicIdle {
          0%, 100% { transform: rotateY(-2deg) translateY(0); }
          50% { transform: rotateY(2deg) translateY(-4px); }
        }

        .book-3d {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }

        .book-back-cover {
          position: absolute;
          inset: 0;
          z-index: 0;
          transform: translateZ(-7px);
          border-radius: 4px 10px 10px 4px;
          background: linear-gradient(135deg, #2c2416, #3d3220);
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.35);
        }
        .hero-page.hero-night .book-back-cover {
          background: linear-gradient(135deg, #1a1a1a, #252525);
        }

        .back-cover-surface {
          position: absolute;
          inset: 5px;
          border-radius: 2px 8px 8px 2px;
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.35));
        }

        .book-pages-stack {
          position: absolute;
          inset: 3px;
          z-index: 1;
          transition: transform 1.2s var(--ease-out-expo);
        }

        .scene-open .book-pages-stack {
          transform: translateX(-8px) rotateY(-18deg);
        }

        .page-edge {
          position: absolute;
          inset: 0;
          border-radius: 2px 9px 9px 2px;
          background: linear-gradient(90deg,
            rgba(255, 252, 242, 0.94) 0%,
            rgba(248, 242, 226, 0.9) 30%,
            rgba(238, 228, 206, 0.86) 100%);
          box-shadow: inset 0 0 2px rgba(0,0,0,0.08);
          transition: transform 1s var(--ease-out-expo), opacity 1s var(--ease-out-expo);
        }

        .hero-page.hero-night .page-edge {
          background: linear-gradient(90deg,
            rgba(70, 66, 58, 0.94) 0%,
            rgba(60, 56, 48, 0.9) 30%,
            rgba(50, 46, 38, 0.86) 100%);
        }

        .page-edge-1 { transform: translateZ(1px); }
        .page-edge-2 { transform: translateZ(2px); }
        .page-edge-3 { transform: translateZ(3px); }
        .page-edge-4 { transform: translateZ(4px); }
        .page-edge-5 { transform: translateZ(5px); }

        .scene-open .page-edge-1 { transform: translateZ(1px) translateX(-3px) rotateY(-10deg); }
        .scene-open .page-edge-2 { transform: translateZ(2px) translateX(-4px) rotateY(-12deg); }
        .scene-open .page-edge-3 { transform: translateZ(3px) translateX(-5px) rotateY(-14deg); }
        .scene-open .page-edge-4 { transform: translateZ(4px) translateX(-6px) rotateY(-16deg); }
        .scene-open .page-edge-5 { transform: translateZ(5px) translateX(-7px) rotateY(-18deg); }

        .book-front-cover {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: 4px 10px 10px 4px;
          transform-origin: left center;
          transition: transform 1.2s var(--ease-out-expo);
          box-shadow: 6px 0 18px rgba(0,0,0,0.18);
        }

        .scene-open .book-front-cover {
          transform: rotateY(-35deg);
        }

        .book-cover-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          transition: opacity 1.2s var(--ease-out-expo), transform 1.2s var(--ease-out-expo);
        }

        .book-cover-wrapper.is-active {
          opacity: 1;
          transform: scale(1);
        }

        .book-cover-wrapper.is-dissolving {
          opacity: 0;
          transform: scale(0.96) translateY(-6px);
        }

        .book-cover-image {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          border-radius: 4px 10px 10px 4px;
          overflow: hidden;
          box-shadow:
            0 40px 80px rgba(50, 32, 6, 0.28),
            0 16px 32px rgba(50, 32, 6, 0.18),
            0 0 0 1px rgba(0, 0, 0, 0.06);
          transition: all 0.5s var(--ease-out-expo);
        }

        .hero-page.hero-night .book-cover-image {
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.5),
            0 16px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .book-display-stage:not(.book-is-open):hover .book-cover-image {
          transform: translateY(-8px) rotateY(3deg);
          box-shadow:
            0 50px 100px rgba(50, 32, 6, 0.34),
            0 24px 48px rgba(50, 32, 6, 0.24),
            0 0 0 1px rgba(241, 181, 0, 0.3);
        }

        .hero-page.hero-night .book-display-stage:not(.book-is-open):hover .book-cover-image {
          box-shadow:
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 24px 48px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(255, 211, 77, 0.3);
        }

        .book-cover-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
        }

        .book-spine-edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 9px;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.06));
          border-radius: 4px 0 0 4px;
          z-index: 3;
          pointer-events: none;
          transform: translateX(-9px);
        }

        .book-light-pass {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            110deg,
            transparent 0%,
            transparent 42%,
            rgba(255, 244, 201, 0.15) 47%,
            rgba(255, 214, 84, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 53%,
            transparent 58%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 4px 10px 10px 4px;
        }

        .book-cover-wrapper.is-active .book-light-pass {
          animation: subtleLightPass 10s ease-in-out infinite;
        }

        .book-shadow {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 30px;
          background: radial-gradient(ellipse, rgba(50, 32, 6, 0.34) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: -1;
          transition: all 1.2s var(--ease-out-expo);
        }

        .hero-page.hero-night .book-shadow {
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, transparent 70%);
        }

        .book-shadow.shadow-normal {
          opacity: 1;
        }

        .book-shadow.shadow-deep {
          width: 110%;
          height: 40px;
          background: radial-gradient(ellipse, rgba(50, 32, 6, 0.46) 0%, rgba(50, 32, 6, 0.2) 40%, transparent 70%);
          transform: translateX(-50%);
        }

        .hero-page.hero-night .book-shadow.shadow-deep {
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.35) 40%, transparent 70%);
        }

        @keyframes subtleLightPass {
          0%, 78%, 100% { opacity: 0; }
          84% { opacity: 1; }
          92% { opacity: 0; }
        }

        .book-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          text-align: center;
          z-index: 2;
        }

        .book-meta-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-bright);
          padding: 0.25rem 0.8rem;
          border: 1px solid rgba(241, 181, 0, 0.45);
          border-radius: 999px;
          background: rgba(241, 181, 0, 0.1);
        }

        .book-meta-divider {
          width: 50px;
          height: 1.5px;
          background: var(--gold-gradient);
          opacity: 0.8;
          border-radius: 1px;
        }

        .book-meta-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.03em;
        }

        .book-meta-subtitle {
          font-size: 0.7rem;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.05em;
        }

        .book-meta-edition {
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-soft);
        }

        .book-meta-hint {
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--muted);
          opacity: 0.7;
          transition: opacity 0.5s ease;
          margin-top: 0.2rem;
        }

        .book-ground-line {
          width: 70px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold-soft), transparent);
          opacity: 0.5;
          border-radius: 1px;
        }

        @media (max-width: 1200px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            padding: 3rem 2.5rem;
            min-height: auto;
          }
          .hero-copy {
            max-width: 100%;
            text-align: center;
            margin: 0 auto;
            padding-left: 0;
          }
          .hero-copy::before {
            left: 50%;
            top: -20px;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
          }
          .hero-tagline {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            border-left: none;
            padding-left: 0;
            border-bottom: 2px solid rgba(241, 181, 0, 0.3);
            padding-bottom: 1.5rem;
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
          .hero-eyebrow {
            margin-left: auto;
            margin-right: auto;
          }
          .book-display-stage {
            min-height: 520px;
          }
          .book-scene {
            width: 250px;
            height: 360px;
          }
          .book-ambient-light {
            width: 300px;
            height: 400px;
          }
          .book-floating-badge.badge-top-right {
            right: 0;
          }
          .book-floating-badge.badge-bottom-left {
            left: 0;
          }
          .wing {
            width: 258px;
            height: 164px;
          }
          .intro-logo {
            width: 140px;
            height: 140px;
          }
          .accent-circle-ring,
          .accent-dots-grid {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .hero-inner {
            padding: 2rem 1.2rem;
            gap: 2.5rem;
          }
          .hero-headline {
            font-size: clamp(2.2rem, 9vw, 3rem);
          }
          .hero-brand {
            font-size: 1.3rem;
          }
          .hero-btn {
            width: 100%;
            justify-content: center;
            min-height: 50px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .book-display-stage {
            min-height: 420px;
          }
          .book-scene {
            width: 200px;
            height: 290px;
          }
          .book-ambient-light {
            width: 250px;
            height: 320px;
          }
          .book-meta-title {
            font-size: 0.85rem;
          }
          .scene-open .book-front-cover {
            transform: rotateY(-28deg);
          }
          .scene-open .book-pages-stack {
            transform: translateX(-5px) rotateY(-12deg);
          }
          .scene-open .page-edge-1 { transform: translateZ(1px) translateX(-2px) rotateY(-6deg); }
          .scene-open .page-edge-2 { transform: translateZ(2px) translateX(-3px) rotateY(-8deg); }
          .scene-open .page-edge-3 { transform: translateZ(3px) translateX(-4px) rotateY(-10deg); }
          .scene-open .page-edge-4 { transform: translateZ(4px) translateX(-5px) rotateY(-12deg); }
          .scene-open .page-edge-5 { transform: translateZ(5px) translateX(-6px) rotateY(-14deg); }
          .intro-logo {
            width: 116px;
            height: 116px;
            border-radius: 24px;
          }
          .wing {
            width: 176px;
            height: 112px;
          }
          .book-floating-badge {
            padding: 0.35rem 0.7rem;
          }
          .badge-text {
            font-size: 0.5rem;
          }
          .badge-top-right {
            right: -2%;
            top: 4%;
          }
          .badge-bottom-left {
            left: -2%;
            bottom: 22%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-intro,
          .wing,
          .intro-logo,
          .intro-wrap,
          .hero-inner,
          .hero-copy > *,
          .book-display-stage,
          .book-scene { animation: none !important; }
          .book-cover-wrapper { transition: opacity 0.3s ease; }
          .book-cover-wrapper.is-dissolving { transform: none; }
          .book-light-pass { animation: none; opacity: 0; }
          .hero-btn { transition: none; }
          .hero-btn:hover { transform: none; box-shadow: none; }
          .social-link:hover { transform: none; }
          .book-display-stage:hover .book-cover-image { transform: none; box-shadow: 0 40px 80px rgba(50, 32, 6, 0.28), 0 16px 32px rgba(50, 32, 6, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.06); }
          .book-front-cover,
          .book-pages-stack,
          .book-shadow,
          .page-edge { transition: none; }
          .scene-open .book-front-cover { transform: rotateY(-22deg); }
          .scene-open .book-pages-stack { transform: translateX(-4px) rotateY(-10deg); }
          .scene-open .page-edge-1 { transform: translateZ(1px) translateX(-1px) rotateY(-5deg); }
          .scene-open .page-edge-2 { transform: translateZ(2px) translateX(-2px) rotateY(-6deg); }
          .scene-open .page-edge-3 { transform: translateZ(3px) translateX(-3px) rotateY(-7deg); }
          .scene-open .page-edge-4 { transform: translateZ(4px) translateX(-4px) rotateY(-8deg); }
          .scene-open .page-edge-5 { transform: translateZ(5px) translateX(-5px) rotateY(-9deg); }
          .floating-accents,
          .accent-orb,
          .accent-diamond,
          .accent-circle-ring,
          .book-floating-badge { animation: none !important; }
          .ambientPulse { animation: none !important; }
        }
      `}</style>

      {showIntro && (
        <div className="hero-intro" aria-hidden="true">
          <div className="intro-wrap">
            <div className="wing left">
              <img src={wingsImage} alt="" draggable={false} />
            </div>
            <div className="wing right">
              <img src={wingsImage} alt="" draggable={false} />
            </div>
            <div className="intro-logo">
              <img src={eagleLogo} alt="Eagle logo intro" draggable={false} />
            </div>
          </div>
        </div>
      )}

      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">Built for the next generation of nurses</span>

          <span className="hero-brand">VIJAYAM PUBLICATIONS</span>

          <p className="hero-tagline">
            One of the Major Notable Publishers in India, aiming to publish good academic books in Nursing &amp; Degree.
          </p>

          <h1 className="hero-headline">
            <span className="hero-headline-line">Academic</span>
            <span className="hero-headline-line">knowledge.</span>
            <span className="hero-headline-line">
              <span className="hero-headline-accent">Beautifully</span>
            </span>
            <span className="hero-headline-line">published.</span>
          </h1>

          <p className="hero-description">
            Sharp concepts. Beautiful books. Smarter preparation for nursing students, educators and tomorrow's healthcare professionals.
          </p>

          <div className="hero-actions" aria-label="Hero actions">
            <a className="hero-btn primary" href="#shop"><span>Shop Collection</span></a>
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