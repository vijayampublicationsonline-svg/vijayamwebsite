"use client";

import { useEffect, useRef, useState, type JSX } from "react";

const coverImage = "/images/book-pbbsc.jpg";
const appliedAnatomyImage = "/images/appliedanatomy.jpg";
const eagleLogo = "/images/eagle logo .jpg";

type Book = {
  title: string;
  subtitle: string;
  image: string;
};

const books: Book[] = [
  {
    title: "Applied Anatomy",
    subtitle: "Nursing Education",
    image: appliedAnatomyImage,
  },
  {
    title: "PBBSc Nursing",
    subtitle: "Professional Degree",
    image: coverImage,
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/vijayampublications",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100087234593363",
    icon: "facebook",
  },
  {
    name: "X",
    href: "https://twitter.com/Vijayambooks",
    icon: "twitter",
  },
  {
    name: "Medium",
    href: "https://medium.com/@vijayampublicationsonline",
    icon: "medium",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@vijayampublications",
    icon: "youtube",
  },
];

function SocialIcon({ type }: { type: string }): JSX.Element {
  switch (type) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3.2"
            y="3.2"
            width="17.6"
            height="17.6"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle
            cx="12"
            cy="12"
            r="4.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="17.55" cy="6.5" r="1.15" fill="currentColor" />
        </svg>
      );

    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M13.9 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.7V3.65c-.3-.04-1.35-.14-2.57-.14-2.55 0-4.3 1.55-4.3 4.4v1.99H7.4V13h2.88v8h3.62Z"
            fill="currentColor"
          />
        </svg>
      );

    case "twitter":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M18.8 3H22l-6.95 7.94L23.2 21h-6.25l-4.9-6.42L6.44 21H3.23l7.43-8.53L2.8 3h6.4l4.43 5.86L18.8 3Zm-1.1 16.05h1.72L8.28 4.84H6.44L17.7 19.05Z"
            fill="currentColor"
          />
        </svg>
      );

    case "medium":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 5.1v-.5h6.25l4.8 10.55L18.3 4.6H21v.5l-.8.75a.8.8 0 0 0-.2.6v10.98a.8.8 0 0 0 .2.6l.8.75v.5h-5.15v-.5l.82-.78c.08-.08.08-.12.08-.25V8.05l-4.95 12.23h-.68L5.7 8.08v9.55c-.04.23.04.47.2.64l1.17 1.46v.5H3v-.5l1.18-1.46a.8.8 0 0 0 .18-.64V6.1a.8.8 0 0 0-.18-.65L3 5.1Z"
            fill="currentColor"
          />
        </svg>
      );

    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M23.2 6.3a3.03 3.03 0 0 0-2.13-2.14C19.18 3.65 12 3.65 12 3.65s-7.18 0-9.07.51A3.03 3.03 0 0 0 .8 6.3C.3 8.19.3 12 .3 12s0 3.81.5 5.7a3.03 3.03 0 0 0 2.13 2.14c1.89.51 9.07.51 9.07.51s7.18 0 9.07-.51a3.03 3.03 0 0 0 2.13-2.14c.5-1.89.5-5.7.5-5.7s0-3.81-.5-5.7ZM9.7 15.68V8.32L16.1 12l-6.4 3.68Z"
            fill="currentColor"
          />
        </svg>
      );

    default:
      return <></>;
  }
}

/* =========================================================
   INTRO
========================================================= */

/*
  Module-level flag: it lives for exactly one page load.
  - Component remounts during the same load -> intro is skipped.
  - Browser refresh resets the module -> intro plays again as a fresh entry.
*/
let introHasPlayed = false;

function BrandIntro() {
  const [finished, setFinished] = useState(introHasPlayed);

  useEffect(() => {
    if (introHasPlayed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      introHasPlayed = true;
      setFinished(true);
      return;
    }

    const timer = window.setTimeout(() => {
      introHasPlayed = true;
      setFinished(true);
    }, 3150);

    return () => window.clearTimeout(timer);
  }, []);

  if (finished) return null;

  return (
    <div className="vp-intro">
      <div className="vp-intro-glow" />

      <div className="vp-intro-content">
        <div className="vp-intro-logo">
          <img
            src={eagleLogo}
            alt="Vijayam Publications"
            width={76}
            height={76}
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="vp-intro-vijayam">
          VIJAYAM
        </div>

        <div className="vp-intro-publications">
          PUBLICATIONS
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BOOK SHOWCASE
========================================================= */

function BookShowcase() {
  const [activeBook, setActiveBook] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const switchTimerRef = useRef<number | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const switchBook = (index: number) => {
    if (switchTimerRef.current !== null) {
      window.clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
    }

    if (index === activeBook) {
      setIsSwitching(false);
      return;
    }

    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : isOpen ? 1200 : 220;

    setIsOpen(false);
    setIsSwitching(true);

    switchTimerRef.current = window.setTimeout(() => {
      setActiveBook(index);
      setIsSwitching(false);
      switchTimerRef.current = null;
    }, delay);
  };

  useEffect(() => {
    if (isOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (switchTimerRef.current !== null) return;
      setActiveBook((current) => (current + 1) % books.length);
    }, 8000);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  useEffect(() => () => {
    if (switchTimerRef.current !== null) {
      window.clearTimeout(switchTimerRef.current);
    }
  }, []);

  const toggleBook = () => {
    if (!isSwitching) setIsOpen((value) => !value);
  };

  const book = books[activeBook];

  return (
    <div className="book-showcase">
      <div className="book-glow" />

      <div className="book-number">
        <span>
          {String(activeBook + 1).padStart(2, "0")}
        </span>
        <span className="book-number-slash">/</span>
        <span>
          {String(books.length).padStart(2, "0")}
        </span>
      </div>

      <div
        className={`book-display-stage ${
          isOpen ? "is-open" : ""
        }`}
        role="button"
        tabIndex={0}
        aria-label={`${isOpen ? "Close" : "Open"} ${book.title}`}
        aria-pressed={isOpen}
        aria-disabled={isSwitching}
        onClick={toggleBook}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleBook();
          }
        }}
        data-cursor="BOOK"
      >
        <div className="book-floor-shadow" />
        <div className="book-page-stack" aria-hidden="true" />
        <div className="book-interior" aria-hidden={!isOpen}>
          <span className="book-page-imprint">VIJAYAM PUBLICATIONS</span>
          <span className="book-page-rule" />
          <span className="book-page-series">NURSING COLLECTION</span>
          <h3>{book.title}</h3>
          <p className="book-page-subtitle">{book.subtitle}</p>
          <span className="book-page-ornament" aria-hidden="true">✦</span>
          <p className="book-page-copy">
            Clear concepts. Focused learning.<br />
            Knowledge for the next generation of nurses.
          </p>
          <span className="book-page-folio">VIJAYAM · 01</span>
        </div>

        <div className="book-cover-shell">
          <div className="book-cover-highlight" />

          <div className="book-cover-fallback" aria-hidden="true">
            <span>VIJAYAM PUBLICATIONS</span>
            <strong>{book.title}</strong>
            <small>{book.subtitle}</small>
          </div>

          <img
            key={book.image}
            src={book.image}
            alt={book.title}
            className="book-cover"
            width={310}
            height={455}
            loading={activeBook === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />

          <div className="book-edge" />
        </div>

        <div className="book-hover-aura" />
      </div>

      <p className="book-interaction-hint" aria-live="polite">
        {isSwitching ? "Preparing your next edition" : isOpen
          ? "A glimpse inside · select to close"
          : "Select the cover to discover inside"}
      </p>

      <div className="book-meta">
        <div className="book-meta-left">
          <span className="book-meta-label">
            FEATURED BOOK
          </span>

          <h2>{book.title}</h2>

          <p>{book.subtitle}</p>
        </div>

        <button
          type="button"
          className="book-view-button"
          disabled={isSwitching}
          aria-label={`${isOpen ? "Close" : "Open"} ${book.title}`}
          aria-pressed={isOpen}
          onClick={toggleBook}
          data-cursor="VIEW"
        >
          <span>{isOpen ? "Close" : "View"}</span>

          <span className="book-view-arrow">
            ↗
          </span>
        </button>
      </div>

      <div className="book-dots">
        {books.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={
              index === activeBook
                ? "book-dot active"
                : "book-dot"
            }
            aria-label={`View ${item.title}`}
            onClick={() => switchBook(index)}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   HERO
========================================================= */

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const [skipIntroDelays] = useState(() => introHasPlayed);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <BrandIntro />

      <div className={`hero-stage ${isDark ? "is-dark" : ""}`}>
      <main
        className={`hero-page ${isDark ? "hero-dark" : ""} ${
          skipIntroDelays ? "hero-no-intro" : ""
        }`}
      >
        <section className="hero-section">
          <div className="hero-inner">
            {/* =============================================
                LEFT
            ============================================= */}

            <div className="hero-copy">
              {/* BRAND */}
              <h1 className="hero-brand" aria-label="Vijayam Publications">
                <span className="hero-brand-vijayam">
                  VIJAYAM
                </span>
                <span className="hero-brand-publications" aria-hidden="true">
                  {"PUBLICATIONS".split("").map((letter, index) => (
                    <span key={index}>{letter}</span>
                  ))}
                </span>
              </h1>

              <h2 className="hero-headline">
                Academic knowledge.
                <span>
                  Beautifully published.
                </span>
              </h2>

              <p className="hero-description">
                Clear concepts, trusted nursing books and
                focused learning — created for students,
                educators and the future of healthcare.
              </p>

              {/* MODERN BUTTONS */}
              <div className="hero-actions">
                <a
                  href="#books"
                  className="hero-button hero-button-primary"
                  data-cursor="EXPLORE"
                >
                  <span>Explore Books</span>

                  <span className="button-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h13M13 6l6 6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>

                <a
                  href="#about"
                  className="hero-button hero-button-secondary"
                  data-cursor="DISCOVER"
                >
                  <span>Discover Vijayam</span>

                  <span className="button-mini-arrow">
                    ↗
                  </span>
                </a>
              </div>

              {/* SOCIAL */}
              <div className="hero-footer">
                <div className="social-wrapper">
                  <span className="social-label">
                    FOLLOW VIJAYAM
                  </span>

                  <div className="hero-socials">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        data-cursor={social.name}
                      >
                        <SocialIcon type={social.icon} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="hero-scroll-indicator">
                  <span className="scroll-mouse">
                    <span />
                  </span>

                  <span>SCROLL</span>
                </div>
              </div>
            </div>

            {/* =============================================
                RIGHT
            ============================================= */}

            <div
              className="hero-visual"
              id="books"
            >
              <span className="hero-visual-kicker">THE VIJAYAM EDITION · NURSING COLLECTION</span>
              <BookShowcase />
              <span className="hero-visual-note">Considered content. Lasting knowledge.</span>
            </div>
          </div>
        </section>
      </main>
      </div>

      <style>{`
        /* =====================================================
           ROOT
        ===================================================== */

        :root {
          --vp-black: #101522;
          --vp-black-soft: #222b3b;

          --vp-gold: #b98532;
          --vp-gold-light: #e6c274;
          --vp-gold-bright: #f4d994;
          --vp-gold-dark: #815719;

          --vp-text-soft: #667083;

          --vp-background: #fffdf8;
          --vp-background-warm: #f7eddd;
        }

        * {
          box-sizing: border-box;
        }

        .vp-bulge-svg {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-copy {
          will-change: transform, filter;
          transition: z-index 0.01s;
        }

        /*
          When the intro already played in this page load, the hero content
          should appear immediately instead of waiting for the intro timings.
        */
        .hero-no-intro .hero-eyebrow,
        .hero-no-intro .hero-brand,
        .hero-no-intro .hero-brand-publications,
        .hero-no-intro .hero-headline,
        .hero-no-intro .hero-description,
        .hero-no-intro .hero-actions,
        .hero-no-intro .hero-footer,
        .hero-no-intro .hero-visual {
          animation-delay: 0s !important;
        }

        /* =====================================================
           HERO BASE
        ===================================================== */

        .hero-stage {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          background: #f3eee5;
        }

        .hero-stage.is-dark {
          background: #151a22;
        }

        .hero-page {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          color: var(--vp-black);
          background:
            radial-gradient(circle at 79% 38%, rgba(201, 155, 74, 0.18), transparent 24%),
            linear-gradient(115deg, #fffdf9 0%, #f8f1e6 58%, #efe3d1 100%);
        }

        .hero-page::before {
          content: "";
          position: absolute;
          width: min(46vw, 680px);
          aspect-ratio: 1;
          right: -8%;
          top: 50%;
          border: 1px solid rgba(184, 131, 46, 0.14);
          border-radius: 50%;
          transform: translateY(-50%);
          box-shadow:
            0 0 0 80px rgba(184, 131, 46, 0.025),
            0 0 0 160px rgba(184, 131, 46, 0.018);
          pointer-events: none;
          z-index: -1;
        }

        .hero-page::after {
          content: "";
          position: absolute;
          left: clamp(28px, 6vw, 90px);
          top: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(transparent, rgba(184, 131, 46, 0.16), transparent);
          pointer-events: none;
          z-index: -1;
        }

        .hero-dark {
          color: #f8f2e6;
          background:
            radial-gradient(circle at 78% 38%, rgba(213, 165, 70, 0.13), transparent 25%),
            linear-gradient(120deg, #111722, #1a2230 58%, #121822);
        }

        .hero-dark::after {
          background: linear-gradient(transparent, rgba(230, 194, 116, 0.14), transparent);
        }

        /* =====================================================
           CURVED DISPLAY: GLASS + REFRACTION + SHADE
        ===================================================== */

        .vp-curve-wrap {
          position: absolute;
          inset: 0;

          z-index: 6;

          pointer-events: none;

          overflow: hidden;

          border-radius: inherit;
        }

        .vp-bulge-layer {
          position: absolute;
          inset: 0;

          pointer-events: none;
        }

        .vp-bulge-canvas {
          display: block;

          width: 100%;
          height: 100%;
        }

        /*
          Edge refraction: the panel content stays crisp in the middle and
          smears slightly towards the rim, the way a convex screen behaves.
        */

        .vp-curve-refract {
          position: absolute;
          inset: 0;

          pointer-events: none;

          backdrop-filter: blur(2.4px) saturate(112%) brightness(102%);
          -webkit-backdrop-filter: blur(2.4px) saturate(112%) brightness(102%);

          mask-image:
            radial-gradient(
              ellipse 74% 66% at 50% 44%,
              transparent 52%,
              rgba(0, 0, 0, 0.55) 78%,
              #000 100%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse 74% 66% at 50% 44%,
              transparent 52%,
              rgba(0, 0, 0, 0.55) 78%,
              #000 100%
            );
        }

        .vp-curve-shade {
          position: absolute;
          inset: 0;

          pointer-events: none;

          overflow: hidden;

          border-radius: inherit;

          background:
            radial-gradient(
              ellipse 76% 66% at 50% 42%,
              transparent 26%,
              rgba(16, 21, 34, 0.13) 100%
            ),
            linear-gradient(
              90deg,
              rgba(16, 21, 34, 0.09) 0%,
              transparent 16%,
              transparent 84%,
              rgba(16, 21, 34, 0.09) 100%
            ),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.28) 0%,
              transparent 24%,
              transparent 70%,
              rgba(16, 21, 34, 0.13) 100%
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.55),
            inset 0 -46px 90px rgba(16, 21, 34, 0.10),
            inset 0 46px 90px rgba(16, 21, 34, 0.05),
            inset 44px 0 80px rgba(16, 21, 34, 0.07),
            inset -44px 0 80px rgba(16, 21, 34, 0.07);
        }

        .hero-dark .vp-curve-shade {
          background:
            radial-gradient(
              ellipse 78% 68% at 50% 42%,
              transparent 30%,
              rgba(0, 0, 0, 0.22) 100%
            ),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.08) 0%,
              transparent 26%,
              transparent 72%,
              rgba(0, 0, 0, 0.2) 100%
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 -40px 80px rgba(0, 0, 0, 0.18);
        }

        /* =====================================================
           SHADER BLUR FIELD
        ===================================================== */

        .vp-shader-blur {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          z-index: 1;
          pointer-events: none;
          opacity: 0.9;
          filter: blur(42px) saturate(125%);
          mix-blend-mode: multiply;
          transform: scale(1.08);
        }

        .hero-dark .vp-shader-blur {
          opacity: 0.72;
          filter: blur(48px) saturate(145%);
          mix-blend-mode: screen;
        }

        /* =====================================================
           ATMOSPHERE
        ===================================================== */

        .vp-atmosphere {
          position: absolute;
          inset: 0;

          overflow: hidden;

          pointer-events: none;

          z-index: 2;
        }

        .vp-glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(60px);
        }

        .vp-glow-main {
          width: 390px;
          height: 390px;

          right: 14%;
          top: 15%;

          background:
            rgba(219,170,76,0.11);

          animation:
            ambient-glow 8s ease-in-out infinite;
        }

        .vp-glow-secondary {
          width: 260px;
          height: 260px;

          left: -100px;
          bottom: -70px;

          background:
            rgba(180,126,38,0.06);

          animation:
            ambient-glow 11s ease-in-out infinite reverse;
        }

        .vp-light-beam {
          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(184,131,46,0.32),
              transparent
            );

          transform: rotate(-32deg);

          opacity: 0.45;
        }

        .vp-light-beam-one {
          width: 430px;

          right: -90px;
          top: 25%;

          animation:
            beam-move 8s ease-in-out infinite;
        }

        .vp-light-beam-two {
          width: 280px;

          left: -100px;
          bottom: 22%;

          opacity: 0.2;

          animation:
            beam-move 10s ease-in-out infinite reverse;
        }

        .vp-particle-field {
          position: absolute;
          inset: 0;
        }

        .vp-particle-field span {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background:
            var(--vp-gold-light);

          opacity: 0.32;

          animation:
            particle-float 7s ease-in-out infinite;
        }

        .vp-particle-field span:nth-child(1) {
          left: 7%;
          top: 22%;
        }

        .vp-particle-field span:nth-child(2) {
          left: 20%;
          top: 74%;
          animation-delay: -2s;
        }

        .vp-particle-field span:nth-child(3) {
          left: 31%;
          top: 15%;
          animation-delay: -4s;
        }

        .vp-particle-field span:nth-child(4) {
          left: 44%;
          top: 84%;
          animation-delay: -1s;
        }

        .vp-particle-field span:nth-child(5) {
          left: 55%;
          top: 12%;
          animation-delay: -5s;
        }

        .vp-particle-field span:nth-child(6) {
          left: 68%;
          top: 77%;
          animation-delay: -3s;
        }

        .vp-particle-field span:nth-child(7) {
          left: 79%;
          top: 17%;
          animation-delay: -6s;
        }

        .vp-particle-field span:nth-child(8) {
          left: 89%;
          top: 59%;
          animation-delay: -2.5s;
        }

        .vp-particle-field span:nth-child(9) {
          left: 94%;
          top: 83%;
          animation-delay: -4.5s;
        }

        .vp-particle-field span:nth-child(10) {
          left: 4%;
          top: 52%;
          animation-delay: -6.5s;
        }

        .vp-particle-field span:nth-child(11) {
          left: 51%;
          top: 43%;
          animation-delay: -3.5s;
        }

        .vp-particle-field span:nth-child(12) {
          left: 73%;
          top: 44%;
          animation-delay: -1.5s;
        }

        .vp-background-shape {
          position: absolute;

          border: 1px solid
            rgba(184,131,46,0.08);

          border-radius: 50%;
        }

        .vp-shape-one {
          width: 570px;
          height: 570px;

          right: -270px;
          bottom: -300px;

          animation:
            shape-float 17s ease-in-out infinite;
        }

        .vp-shape-two {
          width: 260px;
          height: 260px;

          left: -160px;
          top: 12%;

          opacity: 0.4;

          animation:
            shape-float 12s ease-in-out infinite reverse;
        }

        /* =====================================================
           INTRO
        ===================================================== */

        .vp-intro {
          position: fixed;
          inset: 0;

          z-index: 99999;

          display: grid;
          place-items: center;

          background:
            radial-gradient(
              circle at 50% 45%,
              #282131,
              #111621 50%,
              #080c13 100%
            );

          animation:
            intro-exit 0.8s ease forwards;

          animation-delay: 2.35s;
        }

        .vp-intro-glow {
          position: absolute;

          width: 500px;
          height: 500px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(224,176,78,0.17),
              transparent 68%
            );

          filter: blur(20px);

          animation:
            intro-glow 2.8s ease-in-out infinite;
        }

        .vp-intro-content {
          position: relative;

          text-align: center;

          animation:
            intro-content 1.2s
            cubic-bezier(.16,1,.3,1);
        }

        .vp-intro-logo {
          width: 76px;
          height: 76px;

          margin: 0 auto 23px;

          overflow: hidden;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 34% 28%,
              #f7e0a6,
              #bd8631 58%,
              #6e4913 100%
            );

          box-shadow:
            0 0 0 1px
              rgba(229,189,105,0.4),
            0 0 60px
              rgba(210,162,70,0.2);
        }

        .vp-intro-logo img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .vp-intro-vijayam {
          color: #f4d487;

          font-family:
            "Kalam",
            "Caveat",
            "Segoe Print",
            cursive;

          font-size:
            clamp(3.8rem, 7vw, 6.5rem);

          font-weight: 700;

          line-height: 0.75;

          letter-spacing: -0.06em;
        }

        .vp-intro-publications {
          margin-top: 18px;

          color: rgba(255,255,255,0.78);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.78rem;

          font-weight: 800;

          letter-spacing: 0.33em;
        }

        /* =====================================================
           HERO LAYOUT
        ===================================================== */

        .hero-section {
          position: relative;

          flex: 1;

          width: 100%;
          min-height: 100%;

          display: flex;
          align-items: center;

          z-index: 12;
        }

        .hero-inner {
          width: min(1480px, 100%);

          margin: 0 auto;

          padding:
            clamp(95px, 10vh, 145px)
            clamp(28px, 6vw, 90px)
            clamp(55px, 7vh, 90px);

          display: grid;

          grid-template-columns:
            minmax(0, 0.98fr)
            minmax(500px, 0.88fr);

          gap:
            clamp(45px, 6vw, 105px);

          align-items: center;
        }

        /* =====================================================
           COPY
        ===================================================== */

        .hero-copy {
          position: relative;
          z-index: 5;
          max-width: 760px;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;

          gap: 11px;

          margin-bottom: 26px;

          color:
            var(--vp-gold-dark);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.66rem;

          font-weight: 850;

          letter-spacing: 0.18em;

          opacity: 0;

          animation:
            fade-up 0.9s ease forwards;

          animation-delay: 2.85s;
        }

        .hero-dark .hero-eyebrow {
          color: var(--vp-gold-light);
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--vp-gold);

          box-shadow:
            0 0 0 4px
              rgba(184,131,46,0.1),
            0 0 15px
              rgba(184,131,46,0.35);

          animation:
            dot-pulse 2s ease-in-out infinite;
        }

        /* =====================================================
           VIJAYAM BRAND
        ===================================================== */

        .hero-brand {
          position: relative;

          width: max-content;

          margin-bottom: 39px;

          opacity: 0;

          animation:
            brand-enter
            1.15s
            cubic-bezier(.16,1,.3,1)
            forwards;

          animation-delay: 3s;
        }

        .hero-brand-vijayam {
          position: relative;

          z-index: 2;

          color: var(--vp-black);

          font-family:
            "Kalam",
            "Caveat",
            "Segoe Print",
            cursive;

          font-size:
            clamp(5.5rem, 9.5vw, 9.4rem);

          font-weight: 700;

          line-height: 0.72;

          letter-spacing: -0.07em;

          white-space: nowrap;

          text-shadow:
            0 17px 38px
              rgba(128,86,25,0.12);

          animation:
            vijayam-float 6s ease-in-out infinite,
            vijayam-shadow 4s ease-in-out infinite;
        }

        .hero-dark .hero-brand-vijayam {
          color: #faf4e9;
        }

        /*
          IMPORTANT:
          PUBLICATIONS is intentionally:
          - bigger
          - directly beneath VIJAYAM
          - left aligned around V
          - width controlled to finish before M
        */

        .hero-brand-publications {
          position: relative;

          z-index: 4;

          width: 69%;

          margin-top: 22px;

          margin-left: 1.3%;

          color:
            var(--vp-gold-dark);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size:
            clamp(1rem, 1.65vw, 1.35rem);

          font-weight: 850;

          line-height: 0.9;

          letter-spacing:
            clamp(0.16em, 0.3vw, 0.25em);

          white-space: nowrap;

          text-align: center;

          opacity: 0;

          transform:
            translateY(18px)
            scaleX(0.96);

          animation:
            publications-enter
            1.1s
            cubic-bezier(.16,1,.3,1)
            forwards;

          animation-delay: 3.5s;
        }

        .hero-dark .hero-brand-publications {
          color: var(--vp-gold-light);
        }

        /* Keep the two-line wordmark aligned as one responsive unit. */
        .hero-page .hero-copy .hero-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: max-content;
          max-width: 100%;
          margin: 0 0 clamp(30px, 3vw, 42px);
          font-size: clamp(3rem, 5.8vw, 7rem);
        }

        .hero-page .hero-copy .hero-brand-vijayam {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1em;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: .025em;
          font-kerning: normal;
          animation: none;
          transform: none;
          text-shadow: none;
        }

        .hero-page .hero-copy .hero-brand-publications {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 76%;
          margin: clamp(14px, 1.4vw, 22px) 0 0 6%;
          padding: 0;
          font-family: "Arial Black", Arial, sans-serif;
          font-size: clamp(.9rem, 1.4vw, 1.4rem);
          font-weight: 900;
          line-height: 1.4;
          letter-spacing: 0;
          text-align: left;
        }

        .hero-page .hero-copy .hero-brand-publications > span {
          display: block;
          flex: 0 0 auto;
          margin: 0;
          padding: 0;
        }

        /* =====================================================
           HEADLINE
        ===================================================== */

        .hero-headline {
          margin: 0;

          max-width: 690px;

          color: var(--vp-black);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size:
            clamp(2.8rem, 5vw, 5.2rem);

          font-weight: 650;

          line-height: 0.98;

          letter-spacing: -0.065em;

          opacity: 0;

          animation:
            fade-up 1s
            cubic-bezier(.16,1,.3,1)
            forwards;

          animation-delay: 3.75s;
        }

        .hero-dark .hero-headline {
          color: #f8f2e7;
        }

        .hero-headline span {
          display: block;

          color: var(--vp-gold);

          font-weight: 720;
        }

        .hero-description {
          max-width: 545px;

          margin: 30px 0 0;

          color:
            var(--vp-text-soft);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size:
            clamp(0.94rem, 1.15vw, 1.08rem);

          line-height: 1.8;

          letter-spacing: -0.01em;

          opacity: 0;

          animation:
            fade-up 1s ease forwards;

          animation-delay: 3.95s;
        }

        .hero-dark .hero-description {
          color: #b9c0cb;
        }

        /* =====================================================
           MODERN BUTTONS
        ===================================================== */

        .hero-actions {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 12px;

          margin-top: 34px;

          opacity: 0;

          animation:
            fade-up 1s ease forwards;

          animation-delay: 4.1s;
        }

        .hero-button {
          position: relative;

          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-height: 56px;

          padding:
            0 8px 0 22px;

          border-radius: 18px;

          overflow: hidden;

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.76rem;

          font-weight: 800;

          letter-spacing: 0.01em;

          text-decoration: none;

          transition:
            transform 0.4s
              cubic-bezier(.16,1,.3,1),
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }

        .hero-button:hover {
          transform: translateY(-4px);
        }

        .hero-button-primary {
          gap: 20px;

          color: #fff;

          background:
            linear-gradient(
              135deg,
              #111827,
              #293449
            );

          box-shadow:
            0 16px 32px
              rgba(16,24,39,0.18),
            inset 0 1px 0
              rgba(255,255,255,0.12);
        }

        .hero-button-primary::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              115deg,
              transparent 15%,
              rgba(255,255,255,0.16) 45%,
              transparent 65%
            );

          transform:
            translateX(-120%);

          transition:
            transform 0.75s ease;
        }

        .hero-button-primary:hover::before {
          transform:
            translateX(120%);
        }

        .hero-button-primary:hover {
          box-shadow:
            0 22px 45px
              rgba(16,24,39,0.25),
            0 0 0 1px
              rgba(230,194,116,0.2)
              inset;
        }

        .button-arrow {
          position: relative;

          display: grid;

          place-items: center;

          width: 40px;
          height: 40px;

          border-radius: 13px;

          color: #171d29;

          background:
            linear-gradient(
              135deg,
              #f3d891,
              #c4933e
            );

          box-shadow:
            0 5px 15px
              rgba(184,131,46,0.2);

          transition:
            transform 0.4s ease;
        }

        .hero-button-primary:hover
        .button-arrow {
          transform:
            rotate(-8deg)
            translateX(2px);
        }

        .button-arrow svg {
          width: 17px;
          height: 17px;
        }

        .hero-button-secondary {
          gap: 17px;

          padding:
            0 18px 0 21px;

          color: var(--vp-black);

          border:
            1px solid
            rgba(17,24,39,0.12);

          background:
            rgba(255,255,255,0.32);

          backdrop-filter:
            blur(18px);

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.8);
        }

        .hero-dark .hero-button-secondary {
          color: #f8f2e7;

          border-color:
            rgba(255,255,255,0.13);

          background:
            rgba(255,255,255,0.045);

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.08);
        }

        .hero-button-secondary:hover {
          border-color:
            rgba(184,131,46,0.42);

          box-shadow:
            0 16px 35px
              rgba(184,131,46,0.1);
        }

        .button-mini-arrow {
          color: var(--vp-gold);

          font-size: 1.15rem;

          transition:
            transform 0.35s ease;
        }

        .hero-button-secondary:hover
        .button-mini-arrow {
          transform:
            translate(3px, -3px);
        }

        /* =====================================================
           FOOTER / SOCIALS
        ===================================================== */

        .hero-footer {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 25px;

          max-width: 600px;

          margin-top: 47px;

          opacity: 0;

          animation:
            fade-up 1s ease forwards;

          animation-delay: 4.3s;
        }

        .social-wrapper {
          display: flex;

          align-items: center;

          gap: 15px;
        }

        .social-label {
          color:
            var(--vp-text-soft);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.52rem;

          font-weight: 850;

          letter-spacing: 0.15em;

          white-space: nowrap;
        }

        .hero-socials {
          display: flex;

          align-items: center;

          gap: 7px;
        }

        .hero-socials a {
          position: relative;

          display: grid;

          place-items: center;

          width: 39px;
          height: 39px;

          color:
            var(--vp-text-soft);

          border:
            1px solid
            rgba(17,24,39,0.1);

          border-radius: 13px;

          background:
            rgba(255,255,255,0.3);

          backdrop-filter:
            blur(12px);

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.7);

          transition:
            transform 0.35s
              cubic-bezier(.16,1,.3,1),
            color 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .hero-dark .hero-socials a {
          border-color:
            rgba(255,255,255,0.1);

          background:
            rgba(255,255,255,0.04);

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.05);
        }

        .hero-socials a:hover {
          color:
            var(--vp-gold-dark);

          border-color:
            rgba(184,131,46,0.38);

          background:
            rgba(229,194,116,0.1);

          transform:
            translateY(-5px);

          box-shadow:
            0 10px 25px
              rgba(184,131,46,0.12);
        }

        .hero-socials svg {
          width: 16px;
          height: 16px;
        }

        .hero-scroll-indicator {
          display: flex;

          align-items: center;

          gap: 9px;

          color:
            var(--vp-text-soft);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.52rem;

          font-weight: 800;

          letter-spacing: 0.15em;
        }

        .scroll-mouse {
          position: relative;

          width: 19px;
          height: 29px;

          border:
            1px solid
            rgba(17,24,39,0.22);

          border-radius: 12px;
        }

        .hero-dark .scroll-mouse {
          border-color:
            rgba(255,255,255,0.22);
        }

        .scroll-mouse span {
          position: absolute;

          left: 50%;
          top: 6px;

          width: 3px;
          height: 6px;

          border-radius: 999px;

          background:
            var(--vp-gold);

          transform:
            translateX(-50%);

          animation:
            scroll-wheel 1.8s
            ease-in-out infinite;
        }

        /* =====================================================
           BOOK SHOWCASE
        ===================================================== */

        .hero-visual {
          position: relative;

          min-height: 650px;

          display: flex;

          align-items: center;
          justify-content: center;

          opacity: 0;

          animation:
            visual-enter
            1.25s
            cubic-bezier(.16,1,.3,1)
            forwards;

          animation-delay: 3.25s;
        }

        .book-showcase {
          position: relative;

          width: min(100%, 650px);

          min-height: 650px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

        }

        .book-glow {
          position: absolute;

          width: 430px;
          height: 430px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(218,171,79,0.25),
              rgba(218,171,79,0.08) 38%,
              transparent 72%
            );

          filter: blur(18px);

        }

        .book-number {
          position: absolute;

          top: 20px;
          right: 10%;

          display: flex;

          align-items: center;

          gap: 7px;

          color:
            var(--vp-gold-dark);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.58rem;

          font-weight: 850;

          letter-spacing: 0.08em;
        }

        .book-number-slash {
          opacity: 0.35;
        }

        .book-display-stage {
          position: relative;

          width: 310px;
          height: 455px;

          display: flex;

          align-items: center;
          justify-content: center;

          cursor: pointer;

          perspective: 1200px;

          transition:
            transform 0.8s
              cubic-bezier(.16,1,.3,1);
        }

        .book-display-stage:hover,
        .book-display-stage:focus-visible {
          transform:
            translateY(-14px)
            rotateY(-4deg)
            rotateX(2deg);
        }

        .book-display-stage:focus-visible {
          outline: 2px solid var(--vp-gold);
          outline-offset: 8px;
        }

        .book-display-stage.is-open {
          transform:
            translateY(-11px)
            rotateY(-8deg)
            rotateX(2deg)
            scale(1.025);
        }

        .book-floor-shadow {
          position: absolute;

          width: 245px;
          height: 38px;

          left: 50%;
          bottom: -22px;

          transform:
            translateX(-50%)
            rotateX(70deg);

          border-radius: 50%;

          background:
            rgba(17,24,39,0.2);

          filter: blur(20px);

          transition:
            transform 0.7s ease;
        }

        .book-display-stage:hover
        .book-floor-shadow {
          transform:
            translateX(-50%)
            rotateX(70deg)
            scale(1.12);
        }

        .book-cover-shell {
          position: relative;

          width: 100%;
          height: 100%;

          overflow: hidden;

          border-radius: 3px;

          background:
            linear-gradient(
              150deg,
              #1b2230 0%,
              #2c3546 48%,
              #12161f 100%
            );

          box-shadow:
            -17px 25px 45px
              rgba(24,29,40,0.23),
            0 8px 20px
              rgba(24,29,40,0.1),
            0 0 0 1px
              rgba(255,255,255,0.7);

        }

        .book-cover {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: cover;

          user-select: none;

          -webkit-user-drag: none;

          transition:
            transform 0.8s
              cubic-bezier(.16,1,.3,1);
        }

        .book-display-stage:hover
        .book-cover {
          transform: scale(1.025);
        }

        .book-cover-highlight {
          position: absolute;

          z-index: 3;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              110deg,
              transparent 15%,
              rgba(255,255,255,0.24) 45%,
              transparent 60%
            );

          transform:
            translateX(-130%);

          animation:
            book-shine 6s
            ease-in-out infinite;
        }

        .book-edge {
          position: absolute;

          right: -4px;

          top: 8px;
          bottom: 8px;

          width: 5px;

          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,0.18),
              rgba(255,255,255,0.4),
              rgba(0,0,0,0.12)
            );

          opacity: 0.45;
        }

        .book-hover-aura {
          position: absolute;

          inset: -35px;

          z-index: -1;

          border-radius: 40px;

          background:
            radial-gradient(
              circle,
              rgba(229,189,105,0.22),
              transparent 65%
            );

          filter: blur(25px);

          opacity: 0;

          transition:
            opacity 0.5s ease;
        }

        .book-display-stage:hover
        .book-hover-aura {
          opacity: 1;
        }

        .book-meta {
          position: relative;

          z-index: 5;

          width: min(100%, 470px);

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 25px;

          margin-top: 26px;
        }

        .book-meta-label {
          display: block;

          color:
            var(--vp-gold-dark);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.54rem;

          font-weight: 850;

          letter-spacing: 0.17em;
        }

        .book-meta h2 {
          margin:
            6px 0 2px;

          color:
            var(--vp-black);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 1.35rem;

          line-height: 1;

          letter-spacing: -0.04em;
        }

        .hero-dark .book-meta h2 {
          color: #f8f2e7;
        }

        .book-meta p {
          margin: 0;

          color:
            var(--vp-text-soft);

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.7rem;
        }

        .book-view-button {
          display: flex;

          align-items: center;

          gap: 10px;

          padding: 0;

          color:
            var(--vp-gold-dark);

          border: 0;

          background: transparent;

          font-family:
            "Manrope",
            Arial,
            sans-serif;

          font-size: 0.58rem;

          font-weight: 850;

          letter-spacing: 0.11em;

          cursor: pointer;
        }

        .book-view-arrow {
          display: grid;

          place-items: center;

          width: 29px;
          height: 29px;

          border:
            1px solid
            rgba(184,131,46,0.28);

          border-radius: 10px;

          background:
            rgba(229,194,116,0.08);

          font-size: 0.95rem;

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .book-view-button:hover
        .book-view-arrow {
          transform:
            translate(3px,-3px);

          background:
            rgba(229,194,116,0.17);
        }

        .book-dots {
          display: flex;

          align-items: center;

          gap: 7px;

          margin-top: 21px;
        }

        .book-dot {
          width: 6px;
          height: 6px;

          padding: 0;

          border: 0;

          border-radius: 999px;

          background:
            rgba(17,24,39,0.18);

          cursor: pointer;

          transition:
            width 0.35s ease,
            background 0.35s ease;
        }

        .book-dot.active {
          width: 27px;

          background:
            var(--vp-gold);
        }

        /* =====================================================
           PREMIUM CURSOR
        ===================================================== */

        .premium-cursor-outer,
        .premium-cursor-inner,
        .premium-cursor-dot {
          position: fixed;

          pointer-events: none;

          z-index: 100000;

          will-change: transform;
        }

        .premium-cursor-outer {
          left: -17px;
          top: -17px;

          width: 34px;
          height: 34px;

          border-radius: 50%;

          border: 1px solid rgba(184,131,46,0.55);

          background: rgba(229,189,105,0.06);

          box-shadow:
            0 0 0 1px rgba(255, 228, 168, 0.14) inset,
            0 4px 12px rgba(17, 24, 39, 0.12);

          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);

          transition:
            width 0.28s cubic-bezier(.16,1,.3,1),
            height 0.28s cubic-bezier(.16,1,.3,1),
            left 0.28s cubic-bezier(.16,1,.3,1),
            top 0.28s cubic-bezier(.16,1,.3,1),
            border-color 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease;
        }

        .cursor-ring,
        .cursor-cross {
          display: none;
        }

        .premium-cursor-inner {
          left: -6px;
          top: -6px;

          width: 12px;
          height: 12px;

          border-radius: 50%;

          background: #e2b766;

          box-shadow:
            0 0 0 1px rgba(255,255,255,0.65),
            0 0 10px rgba(184,131,46,0.22);

          transition:
            width 0.24s ease,
            height 0.24s ease,
            left 0.24s ease,
            top 0.24s ease,
            box-shadow 0.24s ease,
            background 0.24s ease;
        }

        .premium-cursor-inner span {
          display: none;
        }

        .premium-cursor-dot {
          left: -2px;
          top: -2px;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #1a2232;

          box-shadow: 0 0 0 1px rgba(255,255,255,0.55);

          transition:
            width 0.22s ease,
            height 0.22s ease,
            left 0.22s ease,
            top 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease;
        }

        .cursor-hover {
          left: -21px;
          top: -21px;

          width: 42px;
          height: 42px;

          border-color: rgba(184,131,46,0.7);

          background: rgba(229,189,105,0.1);

          box-shadow:
            0 0 0 1px rgba(255, 234, 185, 0.2) inset,
            0 8px 18px rgba(17,24,39,0.14);
        }

        .cursor-inner-hover {
          left: -7px;
          top: -7px;

          width: 14px;
          height: 14px;

          background: #e7bf74;

          box-shadow:
            0 0 0 1px rgba(255,255,255,0.72),
            0 0 14px rgba(184,131,46,0.26);
        }

        .cursor-dot-hover {
          left: -2.5px;
          top: -2.5px;

          width: 5px;
          height: 5px;

          background: #151d2b;

          box-shadow: 0 0 0 1px rgba(255,255,255,0.62);
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes hero-light-sweep {
          0%,
          65%,
          100% {
            transform: translateX(-130%);
          }

          80% {
            transform: translateX(130%);
          }
        }

        @keyframes background-circle {
          0%,
          100% {
            transform:
              translate(0,0)
              rotate(0deg);
          }

          50% {
            transform:
              translate(-20px,25px)
              rotate(12deg);
          }
        }

        @keyframes ambient-glow {
          0%,
          100% {
            transform:
              translate(0,0)
              scale(1);
          }

          50% {
            transform:
              translate(20px,-18px)
              scale(1.08);
          }
        }

        @keyframes beam-move {
          0%,
          100% {
            transform:
              translateX(-40px)
              rotate(-32deg);

            opacity: 0;
          }

          35% {
            opacity: 0.4;
          }

          65% {
            transform:
              translateX(50px)
              rotate(-32deg);

            opacity: 0.1;
          }
        }

        @keyframes particle-float {
          0%,
          100% {
            transform:
              translateY(0)
              scale(0.7);

            opacity: 0.15;
          }

          50% {
            transform:
              translateY(-24px)
              scale(1.35);

            opacity: 0.6;
          }
        }

        @keyframes shape-float {
          0%,
          100% {
            transform:
              translate(0,0)
              rotate(0deg);
          }

          50% {
            transform:
              translate(18px,-18px)
              rotate(8deg);
          }
        }

        @keyframes intro-content {
          from {
            opacity: 0;
            transform:
              translateY(24px)
              scale(0.94);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes intro-glow {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }

          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes intro-exit {
          to {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes brand-enter {
          from {
            opacity: 0;
            transform:
              translateY(35px)
              scale(0.94);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        @keyframes publications-enter {
          from {
            opacity: 0;
            transform:
              translateY(18px)
              scaleX(0.9);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scaleX(1);
          }
        }

        @keyframes vijayam-float {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(-0.3deg);
          }

          50% {
            transform:
              translateY(-5px)
              rotate(0.25deg);
          }
        }

        @keyframes vijayam-shadow {
          0%,
          100% {
            text-shadow:
              0 17px 38px
              rgba(128,86,25,0.1);
          }

          50% {
            text-shadow:
              0 21px 45px
              rgba(184,131,46,0.18);
          }
        }

        @keyframes dot-pulse {
          0%,
          100% {
            box-shadow:
              0 0 0 4px
              rgba(184,131,46,0.08),
              0 0 10px
              rgba(184,131,46,0.2);
          }

          50% {
            box-shadow:
              0 0 0 7px
              rgba(184,131,46,0.04),
              0 0 20px
              rgba(184,131,46,0.4);
          }
        }

        @keyframes visual-enter {
          from {
            opacity: 0;
            transform:
              translateX(45px)
              scale(0.94);
          }

          to {
            opacity: 1;
            transform:
              translateX(0)
              scale(1);
          }
        }

        @keyframes book-float {
          0%,
          100% {
            transform:
              translateY(0)
              rotateZ(0deg);
          }

          50% {
            transform:
              translateY(-10px)
              rotateZ(0.45deg);
          }
        }

        @keyframes book-glow {
          0%,
          100% {
            transform: scale(0.94);
            opacity: 0.65;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes book-shine {
          0%,
          64% {
            transform:
              translateX(-130%);
          }

          78% {
            transform:
              translateX(130%);
          }

          100% {
            transform:
              translateX(130%);
          }
        }

        @keyframes scroll-wheel {
          0%,
          100% {
            transform:
              translate(-50%,0);
            opacity: 0.45;
          }

          50% {
            transform:
              translate(-50%,7px);
            opacity: 1;
          }
        }

        @keyframes cursor-orbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1180px) {
          .hero-inner {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(400px, 0.82fr);

            gap: 35px;
          }

          .hero-brand-vijayam {
            font-size:
              clamp(5rem, 9vw, 7.5rem);
          }

          .hero-visual {
            min-height: 570px;
          }

          .book-showcase {
            min-height: 570px;
          }

          .book-display-stage {
            width: 270px;
            height: 395px;
          }
        }

        @media (max-width: 920px) {
          .hero-inner {
            grid-template-columns: 1fr;

            text-align: center;

            padding-top: 110px;
          }

          .hero-copy {
            margin: 0 auto;

            transform: none;
          }

          .hero-eyebrow {
            justify-content: center;
          }

          .hero-brand {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-brand-publications {
            margin-left: 1.3%;
          }

          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-footer {
            margin-left: auto;
            margin-right: auto;
          }

          .hero-visual {
            min-height: 590px;

            margin-top: -5px;
          }

          .book-showcase {
            transform: none;
          }
        }

        @media (max-width: 600px) {
          .hero-inner {
            padding:
              100px
              20px
              50px;
          }

          .hero-eyebrow {
            font-size: 0.54rem;

            letter-spacing: 0.12em;
          }

          .hero-brand-vijayam {
            font-size:
              clamp(4.3rem, 19vw, 6rem);
          }

          .hero-brand-publications {
            width: 68%;

            margin-top: 18px;

            font-size: 0.72rem;

            letter-spacing: 0.18em;
          }

          .hero-brand {
            margin-bottom: 30px;
          }

          .hero-headline {
            font-size:
              clamp(2.55rem, 12vw, 4rem);
          }

          .hero-description {
            margin-top: 25px;

            font-size: 0.87rem;

            line-height: 1.72;
          }

          .hero-actions {
            flex-direction: column;

            margin-top: 27px;
          }

          .hero-button {
            width: 100%;
            max-width: 285px;
          }

          .hero-footer {
            flex-direction: column;

            margin-top: 34px;

            gap: 23px;
          }

          .social-wrapper {
            flex-direction: column;

            gap: 11px;
          }

          .hero-scroll-indicator {
            display: none;
          }

          .hero-visual {
            min-height: 510px;
          }

          .book-showcase {
            min-height: 510px;

            transform: none;
          }

          .hero-copy {
            transform: none;
          }

          .vp-curve-refract {
            display: none;
          }

          .book-display-stage {
            width: 225px;
            height: 330px;
          }

          .book-glow {
            width: 320px;
            height: 320px;
          }

          .book-number {
            right: 5%;
            top: 10px;
          }

          .book-meta {
            width: min(100%, 335px);
          }

          .book-meta h2 {
            font-size: 1.05rem;
          }

          .book-meta-label {
            font-size: 0.47rem;
          }

          .book-meta p {
            font-size: 0.61rem;
          }

          .book-view-button {
            font-size: 0.5rem;
          }

          .vp-background-shape {
            opacity: 0.5;
          }

          .vp-shape-one {
            width: 350px;
            height: 350px;

            right: -220px;
          }

          .vp-shape-two {
            width: 190px;
            height: 190px;

            left: -130px;
          }

          .hero-stage {
            padding: 0;
            perspective: none;
          }

          .hero-page {
            min-height: 100svh;

            border-radius: 1.4rem / 1.8rem;

            transform: none;

            box-shadow: none;
          }
        }

        /* Editorial finish: generous spacing and a framed book collection. */
        .hero-page {
          background:
            radial-gradient(ellipse at 85% 20%, rgba(185,133,50,.09), transparent 45%),
            linear-gradient(120deg, #fffdf8, #f5eee2);
        }
        .hero-dark {
          background: linear-gradient(120deg, #111722, #1c2431);
        }
        .hero-page::before {
          right: -22%;
          border-color: rgba(184,131,46,.1);
        }
        .hero-page::after { display: none; }
        .hero-inner {
          width: min(1440px, 100%);
          padding: clamp(64px,8vw,120px) clamp(24px,6vw,88px);
          grid-template-columns: minmax(0,1.1fr) minmax(0,.9fr);
          gap: clamp(40px,6vw,88px);
        }
        .hero-copy { min-width: 0; }
        .hero-eyebrow {
          font-size: .59rem;
          line-height: 1.8;
          letter-spacing: .19em;
          margin-bottom: 36px;
        }
        .eyebrow-dot { flex-shrink: 0; animation: none; }
        .hero-brand { margin-bottom: 42px; max-width: 100%; }
        .hero-brand-vijayam {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.4rem,6.3vw,5.8rem);
          font-weight: 400;
          letter-spacing: -.065em;
          line-height: .95;
          animation: none;
          text-shadow: none;
        }
        .hero-brand-publications {
          width: 100%;
          margin: 14px 0 0;
          font-size: .66rem;
          font-weight: 600;
          letter-spacing: .48em;
          line-height: 1.4;
          text-align: left;
        }
        .hero-headline {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.4rem,3.8vw,3.8rem);
          font-weight: 400;
          letter-spacing: -.045em;
          line-height: 1.13;
        }
        .hero-headline span {
          margin-top: 6px;
          font-weight: 400;
          font-style: italic;
          color: #946522;
        }
        .hero-dark .hero-headline span { color: var(--vp-gold-light); }
        .hero-description {
          max-width: 440px;
          margin-top: 24px;
          font-size: .95rem;
          line-height: 1.85;
        }
        .hero-actions { margin-top: 32px; gap: 14px; }
        .hero-button {
          min-height: 54px;
          border-radius: 999px;
          font-weight: 600;
          font-size: .75rem;
        }
        .hero-button-primary { box-shadow: 0 8px 24px rgba(16,24,39,.12); }
        .button-arrow { border-radius: 50%; width: 38px; height: 38px; }
        .hero-button-secondary { background: transparent; box-shadow: none; }
        .hero-footer {
          max-width: none;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(129,87,25,.16);
          gap: 16px;
          flex-wrap: wrap;
        }
        .social-label { font-weight: 600; letter-spacing: .18em; }
        .hero-socials a {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: transparent;
          box-shadow: none;
        }
        .hero-visual {
          min-height: 680px;
          min-width: 0;
          padding: 32px 26px 24px;
          flex-direction: column;
          border: 1px solid rgba(129,87,25,.18);
          border-radius: 180px 180px 24px 24px;
          background:
            radial-gradient(ellipse at 50% 35%, rgba(255,255,255,.8), transparent 65%),
            linear-gradient(160deg, #f2e7d5, #e8d9bf);
          box-shadow: 0 24px 64px rgba(83,60,26,.07), inset 0 1px 0 rgba(255,255,255,.8);
        }
        .hero-dark .hero-visual {
          border-color: rgba(230,194,116,.2);
          background: radial-gradient(ellipse at 50% 35%, #313a46, #202733 70%);
          box-shadow: 0 24px 64px rgba(0,0,0,.15);
        }
        .hero-visual-kicker, .hero-visual-note {
          position: relative;
          z-index: 1;
          text-align: center;
          color: var(--vp-gold-dark);
        }
        .hero-visual-kicker {
          max-width: 240px;
          font: 600 .56rem/1.8 Arial, sans-serif;
          letter-spacing: .2em;
          margin: 18px 0 20px;
        }
        .hero-visual-note {
          font: italic .85rem/1.5 Georgia, serif;
          margin-top: 20px;
          opacity: .8;
        }
        .book-showcase { min-height: 0; width: 100%; padding-top: 24px; }
        .book-number { top: 0; right: 0; font-size: .55rem; }
        .book-display-stage { width: 260px; height: 382px; max-width: 100%; }
        .book-cover-shell {
          box-shadow: -12px 20px 32px rgba(44,34,21,.22), 0 0 0 1px rgba(255,255,255,.5);
        }
        .book-glow { width: 100%; max-width: 360px; height: 360px; pointer-events: none; }
        .book-meta {
          width: 100%;
          margin-top: 36px;
          padding-top: 22px;
          border-top: 1px solid rgba(129,87,25,.2);
          gap: 16px;
          text-align: left;
        }
        .book-meta-label { font-weight: 600; letter-spacing: .22em; }
        .book-meta h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          font-size: 1.55rem;
          margin: 10px 0 8px;
        }
        .book-meta p { line-height: 1.5; }
        .book-view-arrow { border-radius: 50%; }
        .book-dots { margin-top: 24px; gap: 10px; }
        .book-dot { width: 24px; height: 24px; background: transparent; position: relative; }
        .book-dot::after {
          content: "";
          position: absolute;
          inset: 9px;
          border-radius: 50%;
          background: rgba(17,24,39,.25);
        }
        .book-dot.active { width: 24px; background: transparent; border: 1px solid var(--vp-gold); }
        .book-dot.active::after { background: var(--vp-gold); inset: 8px; }
        .hero-dark .hero-visual-kicker,
        .hero-dark .hero-visual-note,
        .hero-dark .book-number,
        .hero-dark .book-meta-label,
        .hero-dark .book-view-button { color: var(--vp-gold-light); }
        .hero-dark .book-meta p,
        .hero-dark .social-label { color: #b9c0cb; }
        .hero-dark .book-dot::after { background: #b9c0cb; }
        .hero-dark .book-dot.active::after { background: var(--vp-gold-light); }
        .hero-button:focus-visible, .hero-socials a:focus-visible,
        .book-view-button:focus-visible, .book-dot:focus-visible {
          outline: 2px solid var(--vp-gold);
          outline-offset: 5px;
        }
        @media (max-width: 1100px) and (min-width: 921px) {
          .hero-inner { gap: 32px; padding-inline: 32px; }
          .hero-visual { padding-inline: 22px; }
          .book-display-stage { width: 235px; height: 345px; }
        }
        @media (max-width: 920px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; padding-block: 64px; }
          .hero-copy { width: 100%; max-width: 620px; }
          .hero-brand-publications { text-align: center; }
          .hero-description { margin-inline: auto; }
          .hero-footer { justify-content: center; }
          .hero-visual { width: 100%; max-width: 500px; margin: 0 auto; min-height: 650px; }
        }
        @media (max-width: 600px) {
          .hero-inner { padding: 48px 20px; gap: 40px; }
          .hero-eyebrow { font-size: .5rem; margin-bottom: 28px; }
          .hero-brand { margin-bottom: 30px; }
          .hero-brand-vijayam { font-size: clamp(2.8rem,13vw,4.4rem); }
          .hero-brand-publications { font-size: .55rem; letter-spacing: .4em; }
          .hero-headline { font-size: clamp(2rem,9vw,3rem); }
          .hero-description { font-size: .87rem; }
          .hero-actions { margin-top: 26px; }
          .hero-footer { margin-top: 30px; padding-top: 22px; }
          .social-wrapper { flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .hero-visual { min-height: 0; border-radius: 140px 140px 20px 20px; padding: 32px 20px 24px; }
          .hero-visual-kicker { font-size: .5rem; max-width: 200px; }
          .book-display-stage { width: 215px; height: auto; aspect-ratio: 310 / 455; }
          .book-meta { margin-top: 30px; }
          .book-meta h2 { font-size: 1.25rem; }
          .hero-page { border-radius: 0; }
        }

        /* Brand-led typography and a dimensional, hinged book. */
        .hero-stage { background: #f8f3e9; }
        .hero-page {
          background:
            radial-gradient(ellipse at 85% 24%, rgba(176,139,87,.12), transparent 48%),
            linear-gradient(115deg, #fffdf8, #f5eddf);
        }
        .hero-dark { background: linear-gradient(115deg, #111722, #202633); }
        .hero-inner {
          width: min(1500px,100%);
          grid-template-columns: minmax(0,1.15fr) minmax(0,.85fr);
          padding-block: clamp(72px,8vw,128px);
          gap: clamp(48px,6vw,96px);
        }
        .hero-eyebrow { letter-spacing: .22em; margin-bottom: 40px; }
        .hero-brand {
          width: max-content;
          margin: 0 0 40px;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(129,87,25,.23);
        }
        .hero-brand-vijayam {
          display: block;
          font-family: Georgia,"Times New Roman",serif;
          font-size: clamp(3.6rem,7.4vw,7rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -.055em;
          color: #442630;
        }
        .hero-brand-publications {
          display: block;
          width: 100%;
          margin-top: 18px;
          font-size: clamp(.75rem,1.2vw,1rem);
          letter-spacing: .46em;
          text-align: center;
          color: #95703d;
          font-weight: 600;
        }
        .hero-headline {
          font-size: clamp(1.8rem,2.8vw,2.8rem);
          line-height: 1.22;
          letter-spacing: -.035em;
        }
        .hero-headline span { color: #95703d; }
        .hero-description { max-width: 430px; line-height: 1.9; margin-top: 22px; }
        .hero-actions { margin-top: 32px; }
        .hero-button-primary { background: linear-gradient(120deg,#442630,#632e3e); }
        .hero-button { min-height: 56px; }
        .hero-footer { margin-top: 44px; }
        .hero-visual {
          border-radius: 220px 220px 20px 20px;
          padding: 40px 28px 28px;
          background:
            radial-gradient(ellipse at 50% 30%, #fffaf0, transparent 72%),
            linear-gradient(150deg,#f0e5d3,#e3d1b5);
          box-shadow: 0 30px 80px rgba(82,58,30,.09), inset 0 0 0 6px rgba(255,253,248,.28);
        }
        .hero-visual-kicker { margin-bottom: 28px; }
        .book-display-stage {
          isolation: isolate;
          transform-style: preserve-3d;
          perspective: 1600px;
        }
        .book-display-stage.is-open,
        .book-display-stage.is-open:hover,
        .book-display-stage.is-open:focus-visible {
          transform: translateX(32px) translateY(-6px) scale(.92);
        }
        .book-cover-shell {
          position: absolute;
          inset: 0;
          z-index: 3;
          overflow: visible;
          transform-origin: left center;
          transform-style: preserve-3d;
          transition: transform 1.35s cubic-bezier(.22,.68,.2,1), box-shadow 1s ease;
          transform: rotateY(-8deg);
          border-radius: 2px 6px 6px 2px;
        }
        .book-cover-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(90deg,rgba(112,78,37,.18),transparent 12%),
            repeating-linear-gradient(45deg,#ede0c8 0 2px,#f3e8d5 2px 6px);
          border: 1px solid #ccb995;
          transform: rotateY(180deg) translateZ(1px);
          backface-visibility: hidden;
        }
        .book-cover { border-radius: inherit; backface-visibility: hidden; }
        .book-cover-highlight { border-radius: inherit; backface-visibility: hidden; }
        .book-display-stage.is-open .book-cover-shell {
          transform: rotateY(-115deg);
          box-shadow: -8px 12px 22px rgba(44,34,21,.12);
        }
        .book-display-stage.is-open .book-cover { transform: none; }
        .book-display-stage.is-open .book-cover-highlight { animation: none; opacity: 0; }
        .book-page-stack {
          position: absolute;
          inset: 4px -7px 4px 3px;
          z-index: 0;
          border-radius: 2px 6px 6px 2px;
          background: repeating-linear-gradient(90deg,#d3c5aa 0 1px,#fff7e9 1px 3px);
          box-shadow: 6px 14px 24px rgba(44,34,21,.18);
        }
        .book-interior {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 22px;
          border: 1px solid #d8c6a5;
          border-radius: 2px 5px 5px 2px;
          background: linear-gradient(90deg,#d6c4a3 0%,#f6eddd 8%,#fffcf3 28%,#f7efdf 100%);
          color: #442630;
          text-align: center;
          box-shadow: inset 8px 0 18px rgba(84,58,23,.08);
        }
        .book-page-imprint { font: 600 8px/1.6 Arial,sans-serif; letter-spacing: .22em; }
        .book-page-rule { width: 36px; height: 1px; background: #b08b57; margin: 24px 0; }
        .book-page-series { font: 8px/1.5 Arial,sans-serif; letter-spacing: .2em; color: #95703d; }
        .book-interior h3 { font: 400 clamp(23px,2.2vw,32px)/1.15 Georgia,serif; margin: 16px 0 12px; }
        .book-page-subtitle { font: italic 12px/1.5 Georgia,serif; margin: 0; color: #78634b; }
        .book-page-ornament { color: #b08b57; margin: 22px 0; }
        .book-page-copy { font: 11px/1.9 Georgia,serif; margin: 0; color: #78634b; }
        .book-page-folio { position: absolute; bottom: 18px; font: 7px/1.5 Arial,sans-serif; letter-spacing: .22em; color: #95703d; }
        .hero-dark .hero-brand-vijayam { color: #fff6e8; }
        .hero-dark .hero-brand-publications { color: var(--vp-gold-light); }
        .hero-dark .hero-brand { border-color: rgba(230,194,116,.25); }
        @media (max-width: 1100px) and (min-width: 921px) {
          .hero-inner { gap: 40px; padding-inline: 32px; }
          .hero-brand-vijayam { font-size: 6.8vw; }
          .hero-visual { padding-inline: 22px; }
        }
        @media (max-width: 920px) {
          .hero-inner { grid-template-columns: 1fr; gap: 54px; padding-block: 64px; }
          .hero-brand { margin-inline: auto; }
          .hero-brand-vijayam { font-size: clamp(3.8rem,11vw,6.5rem); }
          .hero-headline { font-size: clamp(1.9rem,4.5vw,2.8rem); }
        }
        @media (max-width: 600px) {
          .hero-inner { padding: 48px 20px; gap: 40px; }
          .hero-eyebrow { margin-bottom: 30px; letter-spacing: .12em; }
          .hero-brand { margin-bottom: 28px; padding-bottom: 24px; }
          .hero-brand-vijayam { font-size: clamp(2.6rem,12.5vw,4.6rem); }
          .hero-brand-publications { font-size: .68rem; letter-spacing: .36em; margin-top: 14px; }
          .hero-headline { font-size: clamp(1.7rem,7.5vw,2.4rem); }
          .hero-visual { padding: 34px 20px 24px; border-radius: 150px 150px 20px 20px; }
          .book-display-stage.is-open,
          .book-display-stage.is-open:hover,
          .book-display-stage.is-open:focus-visible { transform: translateX(24px) scale(.82); }
          .book-interior { padding: 20px 16px; }
          .book-page-rule { margin-block: 18px; }
          .book-page-ornament { margin-block: 16px; }
        }

        /* Final art direction: a publisher's signature, not a generic banner. */
        .hero-inner {
          width: min(1480px, 100%);
          padding: clamp(64px, 7vw, 108px) clamp(24px, 6vw, 88px);
          grid-template-columns: minmax(0, 1.12fr) minmax(0, .88fr);
          gap: clamp(40px, 5vw, 80px);
        }
        .hero-page {
          background:
            radial-gradient(ellipse at 12% 0%, rgba(255,255,255,.95), transparent 60%),
            linear-gradient(120deg, #faf7f0, #eee3d1);
        }
        .hero-dark { background: linear-gradient(120deg, #121722, #252832); }
        .hero-eyebrow { font-size: .57rem; line-height: 1.9; margin-bottom: 34px; }
        .hero-brand { padding-bottom: 28px; margin-bottom: 32px; }
        .hero-brand-vijayam {
          font-size: clamp(3.6rem, 7.1vw, 6.7rem);
          letter-spacing: -.065em;
          line-height: 1.06;
        }
        .hero-brand-publications {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 80%;
          margin: 14px 0 0;
          padding: 0;
          font-size: clamp(.7rem, 1.05vw, .92rem);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.7;
          text-align: left;
          color: #96713d;
        }
        .hero-brand-publications > span {
          display: block;
          flex: 0 0 auto;
        }
        .hero-headline { font-size: clamp(1.8rem, 2.5vw, 2.55rem); line-height: 1.25; }
        .hero-description { font-size: .93rem; line-height: 1.95; max-width: 425px; }
        .hero-footer { margin-top: 36px; }
        .hero-button { transition: transform .3s ease, box-shadow .3s ease; }
        .hero-button-primary { box-shadow: 0 10px 26px rgba(68,38,48,.16); }
        .hero-visual {
          min-height: 690px;
          padding: 42px 32px 28px;
          border-radius: 240px 240px 24px 24px;
          border: 1px solid rgba(129,87,25,.24);
          background:
            radial-gradient(ellipse at 50% 28%, #fffcf5, transparent 68%),
            linear-gradient(145deg, #efe4d2, #dcc5a1);
          box-shadow: 0 32px 80px rgba(78,51,24,.1), inset 0 0 0 7px rgba(255,253,248,.38);
        }
        .hero-visual::before {
          content: "";
          position: absolute;
          inset: 15px;
          border: 1px solid rgba(129,87,25,.12);
          border-radius: 225px 225px 14px 14px;
          pointer-events: none;
        }
        .hero-dark .hero-visual {
          background: radial-gradient(ellipse at 50% 28%, #39404a, #232a35 75%);
          box-shadow: 0 32px 80px rgba(0,0,0,.2), inset 0 0 0 7px rgba(255,255,255,.025);
        }
        .hero-visual-kicker { margin: 14px 0 30px; font-size: .52rem; letter-spacing: .23em; }
        .hero-visual-note { margin-top: 18px; font-size: .8rem; }
        .book-showcase { padding-top: 30px; }
        .book-number { right: 5px; top: 0; }
        .book-display-stage {
          width: 250px;
          height: auto;
          aspect-ratio: 310 / 455;
          perspective: 1800px;
          transition: transform 1.2s cubic-bezier(.22,.68,.2,1);
        }
        .book-cover-shell {
          transition: transform 1.2s cubic-bezier(.22,.68,.2,1), box-shadow 1.2s ease;
          transform: rotateY(-10deg);
          box-shadow: -14px 22px 35px rgba(44,34,21,.24);
        }
        .book-display-stage.is-open,
        .book-display-stage.is-open:hover,
        .book-display-stage.is-open:focus-visible {
          transform: translateX(46px) translateY(-4px) scale(.87);
        }
        .book-display-stage.is-open .book-cover-shell { transform: rotateY(-145deg); }
        .book-cover-shell::after {
          display: grid;
          place-items: center;
          content: "V";
          color: rgba(129,87,25,.5);
          font: italic 64px Georgia,serif;
          box-shadow: inset 0 0 0 16px #f1e5cf, inset 0 0 0 17px rgba(129,87,25,.22);
        }
        .book-interior h3 { font-size: 28px; }
        .book-page-copy { font-size: 11px; line-height: 1.8; }
        .book-page-rule { margin-block: 18px; }
        .book-page-ornament { margin-block: 16px; }
        .book-interaction-hint {
          position: relative;
          margin: 28px 0 0;
          min-height: 16px;
          color: #78634b;
          text-align: center;
          font: 10px/1.7 Arial,sans-serif;
          letter-spacing: .03em;
        }
        .hero-dark .book-interaction-hint { color: #b9c0cb; }
        .book-meta { margin-top: 20px; padding-top: 20px; }
        .book-meta h2 { font-size: 1.45rem; line-height: 1.15; }
        .book-view-button:disabled { opacity: .45; cursor: wait; }
        .book-view-arrow { width: 34px; height: 34px; }
        .book-dots { margin-top: 20px; }
        .book-dot, .book-dot.active { width: 30px; height: 30px; }
        .book-dot::after { inset: 12px; }
        .book-dot.active::after { inset: 11px; }
        @media (max-width: 1100px) and (min-width: 921px) {
          .hero-inner { padding-inline: 32px; gap: 34px; }
          .hero-brand-vijayam { font-size: 6.7vw; }
          .hero-visual { padding-inline: 24px; }
          .book-display-stage { width: 225px; }
          .book-interior h3 { font-size: 25px; }
        }
        @media (max-width: 920px) {
          .hero-inner { grid-template-columns: 1fr; gap: 50px; padding-block: 64px; }
          .hero-brand { margin-inline: auto; }
          .hero-brand-vijayam { font-size: clamp(3.5rem, 11vw, 6.5rem); }
          .hero-headline { font-size: clamp(1.9rem, 4.5vw, 2.6rem); }
          .hero-visual { max-width: 500px; min-height: 0; }
        }
        @media (max-width: 600px) {
          .hero-inner { padding: 48px 20px; gap: 40px; }
          .hero-eyebrow { font-size: .48rem; margin-bottom: 28px; }
          .hero-brand { padding-bottom: 24px; margin-bottom: 28px; }
          .hero-brand-vijayam { font-size: clamp(2.5rem, 12vw, 4.5rem); }
          .hero-brand-publications {
            width: 80%;
            margin: 10px 0 0;
            padding: 0;
            font-size: .64rem;
            letter-spacing: 0;
            text-align: left;
          }
          .hero-headline { font-size: clamp(1.7rem, 7.2vw, 2.3rem); }
          .hero-description { font-size: .87rem; line-height: 1.8; }
          .hero-visual { padding: 34px 22px 24px; border-radius: 160px 160px 22px 22px; }
          .hero-visual::before { inset: 12px; border-radius: 148px 148px 12px 12px; }
          .book-display-stage { width: min(210px, 100%); }
          .book-display-stage.is-open,
          .book-display-stage.is-open:hover,
          .book-display-stage.is-open:focus-visible { transform: translateX(42px) scale(.78); }
          .book-interior h3 { font-size: 23px; margin-block: 12px; }
          .book-page-rule { margin-block: 12px; }
          .book-page-ornament { margin-block: 10px; }
          .book-page-copy { font-size: 10px; line-height: 1.7; }
          .book-page-imprint, .book-page-series { font-size: 6px; }
          .book-meta h2 { font-size: 1.25rem; }
          .book-interaction-hint { font-size: 9px; }
        }

        /* Publisher's atelier: quiet contrast, crisp type, tactile paper. */
        .hero-page {
          background:
            radial-gradient(ellipse at 90% 15%, rgba(176,139,87,.10), transparent 45%),
            linear-gradient(110deg, #fffdf9 0%, #f8f4ed 55%, #eee4d5 100%);
        }
        .hero-dark {
          background: linear-gradient(110deg, #131923, #202733);
        }
        .hero-inner {
          width: min(1480px, 100%);
          gap: clamp(42px, 6vw, 88px);
        }
        .hero-brand {
          position: relative;
          padding-bottom: 32px;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(129,87,25,.24);
        }
        .hero-brand::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 48px;
          height: 3px;
          background: #a47c43;
        }
        .hero-brand-vijayam {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3.6rem, 7.3vw, 6.9rem);
          font-weight: 400;
          letter-spacing: -.055em;
          line-height: 1.08;
          color: #442630;
          text-shadow: none;
        }
        .hero-brand-publications {
          display: flex;
          justify-content: space-between;
          width: 79%;
          margin: 14px 0 0 1%;
          font-family: Arial, sans-serif;
          font-size: clamp(.82rem, 1.2vw, 1.06rem);
          font-weight: 600;
          letter-spacing: 0;
          line-height: 1.6;
          color: #795724;
          text-align: left;
        }
        .hero-headline {
          font-size: clamp(1.95rem, 2.7vw, 2.8rem);
          line-height: 1.24;
        }
        .hero-headline span { color: #805c2c; }
        .hero-description {
          font-size: 1rem;
          line-height: 1.85;
          color: #575e69;
          max-width: 450px;
        }
        .hero-button {
          font-size: .85rem;
          min-height: 58px;
          font-weight: 700;
        }
        .hero-button-primary {
          background: linear-gradient(120deg, #442630, #60303e);
          box-shadow: 0 10px 24px rgba(68,38,48,.16);
        }
        .hero-button-secondary {
          border-color: rgba(68,38,48,.25);
          background: rgba(255,255,255,.45);
        }
        .social-label { font-size: .6rem; color: #575e69; }
        .hero-socials { gap: 8px; }
        .hero-socials a {
          width: 40px;
          height: 40px;
          color: #575e69;
          border-color: rgba(68,38,48,.2);
        }
        .hero-socials svg { width: 18px; height: 18px; }
        .hero-visual {
          padding: 44px 32px 30px;
          border-radius: 200px 200px 26px 26px;
          border-color: rgba(129,87,25,.25);
          background:
            radial-gradient(ellipse at 50% 25%, #fffdf7, transparent 75%),
            linear-gradient(155deg, #efe5d5, #e3d0b2);
          box-shadow: 0 28px 70px rgba(75,50,24,.10), inset 0 0 0 7px rgba(255,253,248,.45);
        }
        .hero-visual::before {
          inset: 14px;
          border-radius: 186px 186px 14px 14px;
          border-color: rgba(129,87,25,.18);
        }
        .hero-visual-kicker {
          max-width: 250px;
          font-size: .65rem;
          line-height: 1.8;
          letter-spacing: .16em;
          color: #795724;
        }
        .hero-visual-note { font-size: .94rem; color: #795724; opacity: 1; }
        .book-number { font-size: .72rem; color: #795724; }
        .book-cover-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 24px;
          background: linear-gradient(140deg, #442630, #251d29);
          color: #f3dfb9;
          text-align: center;
          border: 1px solid #c6a36e;
          border-radius: inherit;
          backface-visibility: hidden;
        }
        .book-cover-fallback span { font: 600 9px/1.8 Arial, sans-serif; letter-spacing: .16em; }
        .book-cover-fallback strong { font: 400 30px/1.2 Georgia, serif; }
        .book-cover-fallback small { font: italic 13px/1.6 Georgia, serif; }
        .book-cover { position: relative; }
        .book-interaction-hint {
          font-size: .72rem;
          line-height: 1.7;
          color: #5e5548;
          min-height: 20px;
        }
        .book-meta { align-items: center; padding-top: 24px; }
        .book-meta-label { font-size: .63rem; color: #795724; }
        .book-meta h2 { font-size: 1.65rem; line-height: 1.2; }
        .book-meta p { font-size: .82rem; color: #575e69; }
        .book-view-button { font-size: .72rem; color: #795724; min-height: 44px; }
        .book-view-arrow { width: 40px; height: 40px; font-size: 1.2rem; }
        .book-dot, .book-dot.active { width: 40px; height: 40px; }
        .book-dot::after { inset: 17px; }
        .book-dot.active::after { inset: 16px; }
        .hero-dark .hero-brand-vijayam { color: #fff5e8; }
        .hero-dark .hero-brand-publications,
        .hero-dark .hero-headline span { color: #e6c274; }
        .hero-dark .hero-description,
        .hero-dark .social-label,
        .hero-dark .hero-socials a,
        .hero-dark .book-meta p,
        .hero-dark .book-interaction-hint { color: #c4cad3; }
        .hero-dark .hero-button-secondary { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.2); }
        .hero-dark .hero-visual::before { border-color: rgba(230,194,116,.18); }
        @media (max-width: 1100px) and (min-width: 921px) {
          .hero-inner { gap: 32px; }
          .hero-brand-vijayam { font-size: 6.7vw; }
          .hero-visual { padding-inline: 24px; }
          .book-meta h2 { font-size: 1.4rem; }
        }
        @media (max-width: 920px) {
          .hero-inner { gap: 48px; }
          .hero-brand-vijayam { font-size: clamp(3.5rem, 11vw, 6.5rem); }
          .hero-headline { font-size: clamp(1.95rem, 4.5vw, 2.8rem); }
        }
        @media (max-width: 600px) {
          .hero-brand { padding-bottom: 26px; margin-bottom: 28px; }
          .hero-brand-vijayam { font-size: clamp(2.4rem, 12vw, 4.5rem); }
          .hero-brand-publications { width: 79%; margin: 11px 0 0 1%; font-size: .72rem; }
          .hero-headline { font-size: clamp(1.8rem, 7.4vw, 2.4rem); }
          .hero-description { font-size: .94rem; }
          .hero-visual { padding: 34px 22px 26px; border-radius: 150px 150px 22px 22px; }
          .hero-visual::before { inset: 12px; border-radius: 138px 138px 12px 12px; }
          .hero-visual-kicker { font-size: .6rem; max-width: 220px; }
          .book-meta h2 { font-size: 1.3rem; }
          .book-meta-label { font-size: .58rem; }
          .book-meta p { font-size: .75rem; }
          .book-view-button { font-size: .65rem; gap: 6px; }
          .book-view-arrow { width: 34px; height: 34px; }
          .book-interaction-hint { font-size: .67rem; }
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .vp-intro {
            display: none;
          }

          .hero-eyebrow, .hero-brand, .hero-brand-publications,
          .hero-headline, .hero-description, .hero-actions,
          .hero-footer, .hero-visual {
            animation-delay: 0s !important;
            opacity: 1;
            transform: none;
          }

          .hero-page {
            transform: none;
          }
        }

        @media (pointer: coarse) {
          .hero-stage {
            padding: 0;
            perspective: none;
          }

          .hero-page {
            min-height: 100svh;
            transform: none;
            box-shadow: none;
          }

          .premium-cursor-outer,
          .premium-cursor-inner,
          .premium-cursor-dot {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .premium-cursor-outer,
          .premium-cursor-inner,
          .premium-cursor-dot {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
