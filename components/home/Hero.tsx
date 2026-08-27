"use client";

import {
  JSX,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const coverImage = "/images/book-pbbsc.jpg";
const appliedAnatomyImage = "/images/appliedanatomy.jpg";
const TAU = Math.PI * 2;

type Book = {
  id: number;
  image: string;
  title: string;
  accent: string;
  tint: string;
};

type SocialLink = {
  name: string;
  href: string;
  label: string;
};

const books: Book[] = [
  { id: 1, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 2, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 3, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 4, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 5, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 6, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 7, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 8, image: appliedAnatomyImage, title: "Applied Anatomy", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
];

const socialLinks: SocialLink[] = [
  { name: "instagram", href: "https://www.instagram.com/vijayampublications", label: "Instagram" },
  { name: "facebook", href: "https://www.facebook.com/profile.php?id=100087234593363", label: "Facebook" },
  { name: "twitter", href: "https://twitter.com/Vijayambooks", label: "Twitter" },
  { name: "medium", href: "https://medium.com/@vijayampublicationsonline", label: "Medium" },
  { name: "youtube", href: "https://www.youtube.com/@vijayampublications", label: "YouTube" },
];

const easeOutCubic = (value: number) => {
  const clamped = Math.max(0, Math.min(1, value));
  return 1 - Math.pow(1 - clamped, 3);
};

const easeOutExpo = (value: number) => {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped === 1 ? 1 : 1 - Math.pow(2, -10 * clamped);
};

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    instagram: <><path d="M7.8 2.7h8.4a5.1 5.1 0 0 1 5.1 5.1v8.4a5.1 5.1 0 0 1-5.1 5.1H7.8a5.1 5.1 0 0 1-5.1-5.1V7.8a5.1 5.1 0 0 1 5.1-5.1Zm0 1.9a3.2 3.2 0 0 0-3.2 3.2v8.4a3.2 3.2 0 0 0 3.2 3.2h8.4a3.2 3.2 0 0 0 3.2-3.2V7.8a3.2 3.2 0 0 0-3.2-3.2H7.8Z" /><path d="M12 7.45A4.55 4.55 0 1 1 12 16.55 4.55 4.55 0 0 1 12 7.45Zm0 1.9A2.65 2.65 0 1 0 12 14.65 2.65 2.65 0 0 0 12 9.35Z" /><path d="M16.78 6.55a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16Z" /></>,
    facebook: <path d="M14.2 22v-8.1h2.72l.41-3.15H14.2V8.74c0-.91.25-1.53 1.56-1.53h1.67V4.39A22.4 22.4 0 0 0 15 4.27c-2.41 0-4.06 1.47-4.06 4.17v2.31H8.2v3.15h2.74V22h3.26Z" />,
    twitter: <path d="M18.9 3.8h3.05l-6.66 7.61 7.83 10.79h-6.13l-4.8-6.53-5.5 6.53H3.64l7.12-8.15L3.25 3.8h6.29l4.34 5.95 5.02-5.95Zm-1.07 16.5h1.69L8.61 5.6H6.79l11.04 14.7Z" />,
    medium: <path d="M13.72 12c0 3.12-2.5 5.65-5.58 5.65S2.56 15.12 2.56 12s2.5-5.65 5.58-5.65 5.58 2.53 5.58 5.65Zm6.12 0c0 2.93-1.25 5.3-2.8 5.3s-2.8-2.37-2.8-5.3 1.25-5.3 2.8-5.3 2.8 2.37 2.8 5.3Zm2.52 0c0 2.62-.44 4.75-.99 4.75s-.99-2.13-.99-4.75.44-4.75.99-4.75.99 2.13.99 4.75Z" />,
    youtube: <path d="M21.6 7.2a2.75 2.75 0 0 0-1.94-1.95C17.95 4.8 12 4.8 12 4.8s-5.95 0-7.66.45A2.75 2.75 0 0 0 2.4 7.2A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .4 4.8 2.75 2.75 0 0 0 1.94 1.95c1.71.45 7.66.45 7.66.45s5.95 0 7.66-.45a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

function HeroFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let t = 0;
    let dark = document.documentElement.classList.contains("dark");
    let mouseX = 0.5;
    let mouseY = 0.5;
    let visible = true;

    const particles = Array.from({ length: 64 }).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: 0.4 + Math.random() * 2.2,
      s: 0.00012 + Math.random() * 0.0011,
      p: i * 0.18,
      life: 0.4 + Math.random() * 0.6,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width;
      mouseY = (e.clientY - r.top) / r.height;
    };

    const onTheme = (e: Event) => {
      const ce = e as CustomEvent<{ dark?: boolean }>;
      dark = !!ce.detail?.dark;
    };

    const onVis = () => { visible = document.visibilityState === "visible"; };

    const draw = () => {
      if (!visible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      t += 1;
      ctx.clearRect(0, 0, w, h);

      const centerGrad = ctx.createRadialGradient(
        w * 0.5, h * 0.5, Math.max(w, h) * 0.08,
        w * 0.5, h * 0.5, Math.max(w, h) * 0.7
      );

      if (dark) {
        centerGrad.addColorStop(0, "rgba(98,74,209,.18)");
        centerGrad.addColorStop(0.35, "rgba(47,161,214,.1)");
        centerGrad.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        centerGrad.addColorStop(0, "rgba(255,219,153,.15)");
        centerGrad.addColorStop(0.35, "rgba(255,237,179,.08)");
        centerGrad.addColorStop(1, "rgba(0,0,0,0)");
      }
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.s * (0.65 + p.z * 0.4);
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
          p.life = 0.4 + Math.random() * 0.6;
        }
        const x = (p.x + Math.sin(t * 0.0028 + p.p) * 0.012 + (mouseX - 0.5) * 0.018) * w;
        const y = p.y * h + Math.cos(t * 0.002 + p.p) * 5 + (mouseY - 0.5) * 5;
        const rr = p.r * (0.6 + p.z * 0.9);
        const alpha = p.z * (dark ? 0.2 : 0.14);
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, TAU);
        ctx.fillStyle = dark ? `rgba(169,214,255,${alpha})` : `rgba(180,112,36,${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("vp:theme-change", onTheme);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("vp:theme-change", onTheme);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return <canvas ref={canvasRef} className="hero-fx-canvas" aria-hidden="true" />;
}

function PremiumCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    x: -100, y: -100,
    tx: -100, ty: -100,
    visible: false,
    hovering: false,
    clicking: false,
    clickTime: 0,
    scale: 1,
    targetScale: 1,
    label: "",
    labelOpacity: 0,
    targetLabelOpacity: 0,
  });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (coarsePointer.matches) return;

    let raf = 0;
    document.documentElement.classList.add("gc-enabled");

    let lastMoveTime = 0;

    const animate = () => {
      const cs = state.current;
      const now = performance.now();

      cs.x += (cs.tx - cs.x) * 0.07;
      cs.y += (cs.ty - cs.y) * 0.07;
      cs.scale += (cs.targetScale - cs.scale) * 0.16;
      cs.labelOpacity += (cs.targetLabelOpacity - cs.labelOpacity) * 0.18;

      if (cs.clicking && now - cs.clickTime > 300) {
        cs.clicking = false;
        cs.targetScale = cs.hovering ? 1.65 : 1;
      }

      cursor.style.transform = `translate3d(${cs.x - 28}px, ${cs.y - 28}px, 0) scale(${cs.scale})`;
      cursor.classList.toggle("gc-visible", cs.visible);
      cursor.classList.toggle("gc-hovering", cs.hovering);
      cursor.classList.toggle("gc-clicking", cs.clicking);
      cursor.classList.toggle("gc-idle", now - lastMoveTime > 1000);

      if (labelRef.current) {
        labelRef.current.style.opacity = String(cs.labelOpacity);
        labelRef.current.textContent = cs.label;
        labelRef.current.style.transform = `translate3d(${cs.x + 30}px, ${cs.y + 30}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    const move = (e: PointerEvent) => {
      const now = performance.now();
      lastMoveTime = now;

      state.current.tx = e.clientX;
      state.current.ty = e.clientY;
      state.current.visible = true;

      const el = e.target as HTMLElement | null;
      const closest = el?.closest("a,button,input,[role='button'],.social-link,.hero-btn,.orbit-item") as HTMLElement | null;
      state.current.hovering = !!closest;

      if (!state.current.clicking) {
        state.current.targetScale = closest ? 1.65 : 1;
      }

      const socialEl = el?.closest(".social-link") as HTMLElement | null;
      if (socialEl) {
        const labelAttr = socialEl.getAttribute("data-cursor-label");
        state.current.label = labelAttr || "";
        state.current.targetLabelOpacity = 1;
      } else {
        state.current.targetLabelOpacity = 0;
      }
    };

    const down = () => {
      state.current.clicking = true;
      state.current.clickTime = performance.now();
      state.current.targetScale = 0.85;
    };

    const up = () => {
      setTimeout(() => {
        if (!state.current.clicking) {
          state.current.targetScale = state.current.hovering ? 1.65 : 1;
        }
      }, 80);
    };

    const leave = () => {
      state.current.visible = false;
      state.current.hovering = false;
      state.current.targetLabelOpacity = 0;
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
    <>
      <div ref={cursorRef} className="gc-cursor" aria-hidden="true">
        <div className="gc-outer-glow" />
        <svg className="gc-main-ring" viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--gc-ring-color)" strokeWidth="1.6" />
          <circle cx="28" cy="28" r="22" fill="none" stroke="var(--gc-ring-color)" strokeWidth="0.5" strokeDasharray="8 16" opacity="0.6" />
        </svg>
        <svg className="gc-accent-ring" viewBox="0 0 56 56" width="56" height="56">
          <circle cx="28" cy="28" r="14" fill="none" stroke="var(--gc-ring-color)" strokeWidth="0.7" strokeDasharray="3 6" />
        </svg>
        <div className="gc-orbiting-dots-container">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="gc-micro-dot"
              style={{
                transform: `rotate(${i * 120}deg) translateY(-18px)`,
              }}
            />
          ))}
        </div>
        <div className="gc-center-dot" />
        <div className="gc-center-pulse" />
        <div className="gc-click-ripple" />
        <div className="gc-click-ripple-secondary" />
        <div className="gc-click-burst" />
      </div>
      <div ref={labelRef} className="gc-cursor-label" aria-hidden="true" />
    </>
  );
}

function Book3D({ book, index, onTogglePause }: { book: Book; index: number; onTogglePause: () => void }) {
  return (
    <div
      className="orbit-item"
      data-book-index={index}
      style={{ "--accent": book.accent, "--cover-tint": book.tint } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={book.title}
      onClick={(event) => { event.stopPropagation(); onTogglePause(); }}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onTogglePause(); } }}
    >
      <div className="book-3d">
        <div className="book-face book-front"><img src={book.image} alt={book.title} draggable={false} /><span className="cover-tint" /><span className="chromatic-sheen" /><span className="cover-edge" /><span className="cover-gloss" /></div>
        <div className="book-face book-back"><img src={book.image} alt="" draggable={false} /><span className="cover-tint" /></div>
        <div className="book-face book-spine"><span>VIJAYAM</span></div>
        <div className="book-face book-pages" />
        <div className="book-face book-top" />
        <div className="book-face book-bottom" />
      </div>
    </div>
  );
}

function BookOrbit({ firstVisit }: { firstVisit: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const bookRefs = useRef<HTMLElement[]>([]);
  const frameRef = useRef<number | null>(null);

  const introRef = useRef(0);
  const heroRevealRef = useRef(0);
  const rotationRef = useRef(0);
  const previousTimeRef = useRef(0);
  const hoveredBookRef = useRef<number | null>(null);
  const hoveredCTARef = useRef<HTMLElement | null>(null);

  const pointerRef = useRef({
    targetX: 0, targetY: 0, x: 0, y: 0, px: 0, py: 0, rx: 0, ry: 0, active: false,
  });

  const scrollRef = useRef({ target: 0, value: 0 });
  const visibleRef = useRef(true);
  const reducedMotionRef = useRef(false);
  const pausedRef = useRef(false);
  const themeFlashRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    const orbit = orbitRef.current;
    if (!stage || !orbit) return;

    bookRefs.current = Array.from(stage.querySelectorAll<HTMLElement>(".orbit-item"));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (motionQuery.matches) {
        introRef.current = 1;
        heroRevealRef.current = 1;
      }
      stage.classList.toggle("reduced-motion", motionQuery.matches);
    };

    const updateScroll = () => {
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight;
      const center = rect.top + rect.height / 2;
      scrollRef.current.target = Math.max(-1, Math.min(1, (viewport / 2 - center) / viewport));
    };

    const updateVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      previousTimeRef.current = performance.now();
    };

    const onTheme = () => { themeFlashRef.current = 1; };

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting && document.visibilityState === "visible";
      previousTimeRef.current = performance.now();
    }, { threshold: 0.02 });

    const onBookEnter = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      hoveredBookRef.current = Number(t.dataset.bookIndex ?? -1);
    };
    const onBookLeave = () => { hoveredBookRef.current = null; };

    const circadianPhase = (time: number) => {
      const dayCycle = time * 0.0002;
      return 0.6 + Math.sin(dayCycle) * 0.2 + Math.sin(dayCycle * 2.3) * 0.08;
    };

    const render = (time: number) => {
      const rect = stage.getBoundingClientRect();
      const compact = rect.width < 520;
      const tablet = rect.width < 920;
      const safeSize = Math.min(rect.width, rect.height);

      const maximumRadius = compact ? Math.min(safeSize * 0.34, 132) : tablet ? Math.min(safeSize * 0.365, 204) : Math.min(safeSize * 0.385, 282);
      const depthRadius = compact ? 66 : tablet ? 95 : 130;

      const delta = Math.min(40, previousTimeRef.current ? time - previousTimeRef.current : 16.67);
      previousTimeRef.current = time;
      const ds = delta / 16.67;

      if (visibleRef.current && !reducedMotionRef.current) {
        introRef.current = Math.min(1, introRef.current + delta / 2600);
        heroRevealRef.current = Math.min(1, heroRevealRef.current + delta / 1500);
        if (introRef.current >= 0.5 && !pausedRef.current) {
          const baseSpeed = circadianPhase(time);
          const cinematicSpeed =
            0.00060 *
            baseSpeed *
            (1 + Math.sin(time * 0.00055) * 0.10);
          rotationRef.current =
            (rotationRef.current + delta * cinematicSpeed) % 1;
        }
      }

      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * (0.072 * ds);
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * (0.072 * ds);
      scrollRef.current.value += (scrollRef.current.target - scrollRef.current.value) * (0.048 * ds);
      pointerRef.current.rx += (pointerRef.current.px - pointerRef.current.rx) * 0.18;
      pointerRef.current.ry += (pointerRef.current.py - pointerRef.current.ry) * 0.18;

      themeFlashRef.current += (0 - themeFlashRef.current) * 0.04;
      stage.style.setProperty("--theme-flash", String(themeFlashRef.current.toFixed(3)));

      const reduced = reducedMotionRef.current;
      const pointerX = reduced ? 0 : pointerRef.current.x;
      const pointerY = reduced ? 0 : pointerRef.current.y;
      const scroll = reduced ? 0 : scrollRef.current.value;
      const intro = reduced ? 1 : introRef.current;
      const reveal = easeOutCubic(Math.max(0, Math.min(1, (intro - 0.38) / 0.62)));
      const centerReveal = easeOutExpo(Math.max(0, Math.min(1, intro / 0.2)));
      const contentReveal = easeOutExpo(Math.max(0, Math.min(1, (heroRevealRef.current - 0.4) / 0.6)));

      stage.style.setProperty("--hero-reveal", String(contentReveal.toFixed(3)));
      stage.style.setProperty("--center-focus", String((1 - reveal).toFixed(3)));

      const guide = stage.querySelector<HTMLElement>(".orbit-guide");
      stage.style.setProperty("--orbit-diameter", `${maximumRadius * 2}px`);

      if (guide) {
        guide.style.opacity = String(0.06 + reveal * 0.24);
        guide.style.transform = `translate(-50%, -50%) scale(${0.12 + reveal * 0.88}) rotate(${rotationRef.current * 360}deg)`;
      }

      const cinematicSettle = easeOutExpo(Math.max(0, Math.min(1, (intro - 0.65) / 0.35)));
      const ctaBias = hoveredCTARef.current ? 0.75 : 1;
      const floatPhase = time * 0.0015;
      orbit.style.transform = `
        rotateX(${(pointerY * -5 + scroll * 1.2 + Math.cos(floatPhase) * 1.5) * ctaBias + cinematicSettle * 2.5}deg)
        rotateY(${(pointerX * 7.5 + scroll * 1.1 + Math.sin(floatPhase * 1.2) * 1.6) * ctaBias}deg)
      `;

      bookRefs.current.forEach((element, index) => {
        const phase = (index / books.length) * TAU;
        const isCenter = false;

        const emergenceDelay = 0.20 + index * 0.045;
        const emergeProgress = easeOutCubic(
          Math.max(0, Math.min(1, (intro - emergenceDelay) / 0.28))
        );

        const baseAngle = phase - Math.PI / 2;

        const orbitAngle = baseAngle + rotationRef.current * TAU;
        const orbitalBreath = 1 + Math.sin(time * 0.0009 + phase) * 0.018;
        const targetX = Math.cos(orbitAngle) * maximumRadius * orbitalBreath;
        const targetY =
          Math.sin(orbitAngle) *
          maximumRadius *
          (0.86 + Math.cos(time * 0.00075 + phase) * 0.018);
        const targetZ =
          Math.sin(orbitAngle) * depthRadius +
          Math.cos(orbitAngle * 2 + time * 0.00045) * 7;

        const angleVariation = Math.sin(orbitAngle * 1.4) * 8;
        const curvedX = Math.cos(baseAngle + Math.PI * 0.45) * (maximumRadius * 0.28) + angleVariation;
        const curvedY = Math.sin(baseAngle + Math.PI * 0.65) * (maximumRadius * 0.3);

        let x = targetX;
        let y = targetY;
        let z = targetZ;
        let depthNorm = (Math.sin(orbitAngle) + 1) / 2;

        {
          const spawnX = curvedX * (1 - emergeProgress);
          const spawnY = curvedY * (1 - emergeProgress) - (1 - emergeProgress) * 65;
          const spawnZ = -580 - index * 35;
          x = spawnX + targetX * emergeProgress;
          y = spawnY + targetY * emergeProgress;
          z = spawnZ * (1 - emergeProgress) + targetZ * emergeProgress;
        }

        const micro = Math.sin(time * 0.0018 + phase * 1.6) * (isCenter ? 3.5 : 7);
        const microY = Math.cos(time * 0.002 + phase * 1.2) * (isCenter ? 3 : 6);

        const hover = hoveredBookRef.current === index;
        const crowdCalm = hoveredBookRef.current !== null && hoveredBookRef.current !== index ? 0.85 : 1;
        const sideDefocus = hoveredBookRef.current !== null && hoveredBookRef.current !== index ? -5 : 0;

        const pointerDepth = 0.55 + depthNorm * 0.7;
        x += micro + pointerX * 8 * pointerDepth + sideDefocus + Math.cos(time * 0.0012 + floatPhase) * 2;
        y += microY + pointerY * 6.5 * pointerDepth - (hover ? 22 : 0);
        z += hover ? 55 : 0;

        const scale =
          ((compact ? 0.58 : tablet ? 0.7 : 0.82) +
            depthNorm * 0.28 +
            (hover ? 0.16 : 0)) * crowdCalm;

        const opacity = Math.max(0, emergeProgress);
        const chromaBoost = hover ? 0.32 : 0;

        element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        element.style.zIndex = String(Math.round(depthNorm * 980) + (hover ? 1500 : 0));
        element.style.opacity = String(opacity);
        element.style.filter = `brightness(${0.78 + depthNorm * 0.4 + chromaBoost}) saturate(${0.9 + depthNorm * 0.35 + chromaBoost})`;

        const travelBank =
          Math.sin(orbitAngle) * 12 +
          Math.cos(orbitAngle) * -38;
        const cinematicSway =
          Math.sin(time * 0.00125 + phase * 1.7) * 4.5;
        const dynamicRotateSpeed =
          1 + (isCenter ? 0 : Math.sin(orbitAngle) * 0.35);

        element.style.setProperty(
          "--book-rotate-y",
          `${travelBank + pointerX * 6.5 + cinematicSway}deg`
        );
        element.style.setProperty(
          "--book-rotate-x",
          `${Math.sin(orbitAngle) * 6.5 + pointerY * -4.5 + Math.cos(time * 0.00105 + phase) * 3.2}deg`
        );
        element.style.setProperty(
          "--book-rotate-z",
          `${Math.cos(orbitAngle) * 4.5 * dynamicRotateSpeed + Math.sin(time * 0.0011 + phase) * 2.8}deg`
        );
        element.style.setProperty("--depth", depthNorm.toFixed(3));
        element.style.setProperty("--sheen-position", `${128 - depthNorm * 128 + Math.cos(orbitAngle) * 26 + rotationRef.current * 50}%`);
        element.style.setProperty("--hover-glow", hover ? "1" : "0");
      });

      frameRef.current = requestAnimationFrame(render);
    };

    const ctas = Array.from(document.querySelectorAll<HTMLElement>(".hero-btn"));
    const onCTAEnter = (e: Event) => { hoveredCTARef.current = e.currentTarget as HTMLElement; };
    const onCTALeave = () => { hoveredCTARef.current = null; };

    ctas.forEach((el) => {
      el.addEventListener("pointerenter", onCTAEnter);
      el.addEventListener("pointerleave", onCTALeave);
    });

    bookRefs.current.forEach((el) => {
      el.addEventListener("pointerenter", onBookEnter);
      el.addEventListener("pointerleave", onBookLeave);
    });

    updateMotionPreference();
    updateScroll();
    observer.observe(stage);
    motionQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("vp:theme-change", onTheme);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", updateVisibility);
      window.removeEventListener("vp:theme-change", onTheme);
      bookRefs.current.forEach((el) => {
        el.removeEventListener("pointerenter", onBookEnter);
        el.removeEventListener("pointerleave", onBookLeave);
      });
      ctas.forEach((el) => {
        el.removeEventListener("pointerenter", onCTAEnter);
        el.removeEventListener("pointerleave", onCTALeave);
      });
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const toggleOrbitPause = () => {
    if (reducedMotionRef.current) return;
    pausedRef.current = !pausedRef.current;
    stageRef.current?.classList.toggle("is-rotation-paused", pausedRef.current);
  };

  return (
    <div ref={stageRef} className="book-stage" aria-label="Animated 3D rotating book collection">
      <div className="paper-stage" aria-hidden="true">
        <span className="paper-edge paper-edge-top" />
        <span className="paper-edge paper-edge-right" />
        <span className="paper-edge paper-edge-bottom" />
        <span className="paper-edge paper-edge-left" />
        <span className="paper-corner paper-corner-one" />
        <span className="paper-corner paper-corner-two" />
        <span className="paper-fold paper-fold-one" />
        <span className="paper-fold paper-fold-two" />
        <span className="paper-light" />
      </div>
      <div className="energy-ring" aria-hidden="true" />
      <div className="hero-light-beam" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="orbit-guide" aria-hidden="true" />
      <div ref={orbitRef} className="book-orbit">
        {books.map((book, index) => <Book3D book={book} index={index} key={book.id} onTogglePause={toggleOrbitPause} />)}
      </div>
    </div>
  );
}

function PaperTiltEffect({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const state = {
      tiltX: 0,
      tiltY: 0,
      targetX: 0,
      targetY: 0,
      lightX: 50,
      lightY: 50,
      targetLightX: 50,
      targetLightY: 50,
      isPressing: false,
      pressStartX: 0,
      pressStartY: 0,
      dragOffsetX: 0,
      dragOffsetY: 0,
      velocityX: 0,
      velocityY: 0,
      edgeIntensity: 0,
      targetEdgeIntensity: 0,
    };
    
    let raf = 0;
    
    const animate = () => {
      if (state.isPressing) {
        state.tiltX += (state.targetX - state.tiltX) * 0.18;
        state.tiltY += (state.targetY - state.tiltY) * 0.18;
        state.lightX += (state.targetLightX - state.lightX) * 0.15;
        state.lightY += (state.targetLightY - state.lightY) * 0.15;
      } else {
        const ease = 0.06;
        state.tiltX += (state.targetX - state.tiltX) * ease;
        state.tiltY += (state.targetY - state.tiltY) * ease;
        
        state.velocityX += (-state.velocityX) * 0.08;
        state.velocityY += (-state.velocityY) * 0.08;
        state.tiltX += state.velocityX * 0.5;
        state.tiltY += state.velocityY * 0.5;
        
        state.lightX += (state.targetLightX - state.lightX) * 0.08;
        state.lightY += (state.targetLightY - state.lightY) * 0.08;
      }
      
      state.edgeIntensity += (state.targetEdgeIntensity - state.edgeIntensity) * 0.14;
      
      section.style.setProperty("--paper-tilt-x", `${state.tiltX.toFixed(2)}deg`);
      section.style.setProperty("--paper-tilt-y", `${state.tiltY.toFixed(2)}deg`);
      section.style.setProperty("--paper-light-x", `${state.lightX.toFixed(1)}%`);
      section.style.setProperty("--paper-light-y", `${state.lightY.toFixed(1)}%`);
      section.style.setProperty("--edge-intensity", `${state.edgeIntensity.toFixed(2)}`);
      section.style.setProperty("--press-depth", state.isPressing ? "1" : "0");
      
      raf = requestAnimationFrame(animate);
    };
    
    const calculateTilt = (x: number, y: number, rect: DOMRect) => {
      const relX = (x - rect.left) / rect.width;
      const relY = (y - rect.top) / rect.height;
      
      const edgeDistX = Math.abs(relX - 0.5) * 2;
      const edgeDistY = Math.abs(relY - 0.5) * 2;
      const edgeProximity = Math.max(edgeDistX, edgeDistY);
      
      const edgeBoost = 1 + edgeProximity * 2.2;
      const tiltX = (relY - 0.5) * -8 * edgeBoost;
      const tiltY = (relX - 0.5) * 10 * edgeBoost;
      
      return { tiltX, tiltY, relX, relY, edgeProximity };
    };
    
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const { tiltX, tiltY, relX, relY, edgeProximity } = calculateTilt(e.clientX, e.clientY, rect);
      
      if (state.isPressing) {
        state.dragOffsetX = e.clientX - state.pressStartX;
        state.dragOffsetY = e.clientY - state.pressStartY;
        
        const dragAmpX = state.dragOffsetX * 0.06;
        const dragAmpY = state.dragOffsetY * 0.06;
        
        state.targetX = tiltX + dragAmpY;
        state.targetY = tiltY + dragAmpX;
        state.targetEdgeIntensity = Math.min(1, edgeProximity + Math.abs(state.dragOffsetX + state.dragOffsetY) * 0.003);
      } else {
        state.targetX = tiltX;
        state.targetY = tiltY;
        state.targetEdgeIntensity = edgeProximity * 0.55;
      }
      
      state.targetLightX = relX * 100;
      state.targetLightY = relY * 100;
    };
    
    const onDown = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      state.isPressing = true;
      state.pressStartX = e.clientX;
      state.pressStartY = e.clientY;
      state.dragOffsetX = 0;
      state.dragOffsetY = 0;
      
      const { tiltX, tiltY, relX, relY, edgeProximity } = calculateTilt(e.clientX, e.clientY, rect);
      
      const edgeBoost = 1 + edgeProximity * 3.8;
      state.targetX = tiltX * edgeBoost * 1.4;
      state.targetY = tiltY * edgeBoost * 1.4;
      state.targetEdgeIntensity = 1;
      state.targetLightX = relX * 100;
      state.targetLightY = relY * 100;
      
      section.classList.add("paper-pressed");
    };
    
    const onUp = () => {
      state.velocityX = (state.targetX - state.tiltX) * 3;
      state.velocityY = (state.targetY - state.tiltY) * 3;
      
      state.isPressing = false;
      state.dragOffsetX = 0;
      state.dragOffsetY = 0;
      section.classList.remove("paper-pressed");
      
      state.targetX = 0;
      state.targetY = 0;
      state.targetEdgeIntensity = 0;
    };
    
    const onLeave = () => {
      if (!state.isPressing) {
        state.velocityX = (state.targetX - state.tiltX) * 2;
        state.velocityY = (state.targetY - state.tiltY) * 2;
        state.targetX = 0;
        state.targetY = 0;
        state.targetLightX = 50;
        state.targetLightY = 50;
        state.targetEdgeIntensity = 0;
      }
    };
    
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerdown", onDown);
    section.addEventListener("pointerup", onUp);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointercancel", onUp);
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="paper-tilt-surface">
      {children}
    </div>
  );
}

function PaperEdgeAnimation() {
  return (
    <div className="paper-edges-container" aria-hidden="true">
      {/* Top edge - horizontal curl */}
      <div className="paper-curl-edge paper-curl-top">
        <div className="paper-curl-highlight" />
      </div>
      
      {/* Bottom edge - horizontal curl */}
      <div className="paper-curl-edge paper-curl-bottom">
        <div className="paper-curl-highlight" />
      </div>
      
      {/* Left edge - vertical curl */}
      <div className="paper-curl-edge paper-curl-left">
        <div className="paper-curl-highlight" />
      </div>
      
      {/* Right edge - vertical curl */}
      <div className="paper-curl-edge paper-curl-right">
        <div className="paper-curl-highlight" />
      </div>
      
      {/* Corner peeled curls */}
      <div className="paper-corner-peel paper-corner-tl" />
      <div className="paper-corner-peel paper-corner-tr" />
      <div className="paper-corner-peel paper-corner-bl" />
      <div className="paper-corner-peel paper-corner-br" />
    </div>
  );
}

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const showIntro = true;

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

      <PaperEdgeAnimation />

      {showIntro && (
        <div className="hero-intro atomic-intro" aria-hidden="true">
          <div className="atomic-space" />
          <div className="atomic-stars" />
          <div className="atomic-energy-cloud" />
          <div className="atomic-ripple ripple-one" />
          <div className="atomic-ripple ripple-two" />
          <div className="atomic-ripple ripple-three" />

          <div className="atomic-system">
            <div className="atomic-nucleus">
              <span className="nucleus-core" />
              <span className="nucleus-glow" />
            </div>

            <div className="atomic-orbit orbit-a">
              <span className="atomic-electron" />
            </div>
            <div className="atomic-orbit orbit-b">
              <span className="atomic-electron" />
            </div>
            <div className="atomic-orbit orbit-c">
              <span className="atomic-electron" />
            </div>

            <span className="atomic-particle particle-a" />
            <span className="atomic-particle particle-b" />
            <span className="atomic-particle particle-c" />
            <span className="atomic-particle particle-d" />
            <span className="atomic-particle particle-e" />
            <span className="atomic-particle particle-f" />
          </div>

          <div className="atomic-sweep" />

          <div className="hero-intro-content">
            <span className="hero-intro-kicker">VIJAYAM PUBLICATIONS</span>
            <strong className="hero-intro-title">
              Enter the Vijayam<br/>World
            </strong>
            <span className="hero-intro-line" />
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        .hero-page {
          --ink:#1a1004;
          --muted:#5a3a08;
          --hero-reveal:0;
          --center-focus:0;
          --gc-ring-color:#1a1a1e;
          --gc-dot-fill:#1a1a1e;
          --gc-center-bg:#1a1a1e;
          --gc-center-shadow:rgba(0,0,0,0.5);
          --gc-ripple-color:rgba(26,26,30,0.9);
          --gc-glow-color:rgba(26,26,30,0.1);
          --gc-label-bg:rgba(26,26,30,0.9);
          --gc-label-color:#f0f0f0;
          min-height:100vh;
          position:relative;
          overflow:hidden;
          color:var(--ink);
          font-family:Inter,ui-sans-serif,system-ui,sans-serif;
          transition:color 700ms ease,background 1000ms cubic-bezier(.2,.8,.2,1),filter 1000ms ease;
          background:radial-gradient(circle at 72% 35%, rgba(255,255,245,1), transparent 25%),radial-gradient(circle at 16% 22%, rgba(255,214,97,.3), transparent 28%),radial-gradient(circle at 22% 78%, rgba(244,178,68,.2), transparent 34%),linear-gradient(135deg,#f5df99 0%,#fff6cc 38%,#fffdf0 68%,#e9c35e 100%);
        }
        .hero-page.hero-night {
          --ink:#f6edd6;
          --muted:#d8c9a9;
          --gc-ring-color:#d4af37;
          --gc-dot-fill:#d4af37;
          --gc-center-bg:#d4af37;
          --gc-center-shadow:rgba(212,175,55,0.7);
          --gc-ripple-color:rgba(212,175,55,0.85);
          --gc-glow-color:rgba(212,175,55,0.2);
          --gc-label-bg:rgba(180,140,30,0.88);
          --gc-label-color:#1a1004;
          background:radial-gradient(circle at 75% 30%, rgba(98,74,209,.3), transparent 30%),radial-gradient(circle at 15% 22%, rgba(47,161,214,.2), transparent 34%),radial-gradient(circle at 22% 78%, rgba(123,84,189,.18), transparent 36%),linear-gradient(140deg,#06070e 0%,#0d1020 42%,#121427 72%,#1b1a2e 100%);
        }

        /* ===== PAPER EDGE ANIMATION - HIGHLIGHTS ONLY, NO SHADOWS ===== */
        .paper-edges-container {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          overflow: visible;
        }

        .paper-curl-edge {
          position: absolute;
          z-index: 6;
        }

        .paper-curl-top {
          top: 0;
          left: 0;
          right: 0;
          height: 48px;
        }
        .paper-curl-bottom {
          bottom: 0;
          left: 0;
          right: 0;
          height: 48px;
        }
        .paper-curl-left {
          left: 0;
          top: 0;
          bottom: 0;
          width: 36px;
        }
        .paper-curl-right {
          right: 0;
          top: 0;
          bottom: 0;
          width: 36px;
        }

        /* Bright paper edge highlights - no shadows */
        .paper-curl-highlight {
          position: absolute;
          inset: 4px;
          border-radius: 2px;
          opacity: 0;
          animation: paperEdgeHighlightPulse 3.5s ease-in-out infinite;
        }
        .paper-curl-top .paper-curl-highlight,
        .paper-curl-bottom .paper-curl-highlight {
          background: linear-gradient(
            90deg,
            transparent 8%,
            rgba(255,255,255,0.92) 22%,
            rgba(255,252,235,0.75) 38%,
            rgba(255,255,255,0.82) 55%,
            rgba(255,249,210,0.65) 72%,
            rgba(255,255,255,0.88) 85%,
            transparent 95%
          );
        }
        .paper-curl-top .paper-curl-highlight {
          animation-delay: 0s;
        }
        .paper-curl-bottom .paper-curl-highlight {
          animation-delay: -1.5s;
        }
        .paper-curl-left .paper-curl-highlight,
        .paper-curl-right .paper-curl-highlight {
          background: linear-gradient(
            180deg,
            transparent 8%,
            rgba(255,255,255,0.9) 22%,
            rgba(255,252,235,0.72) 38%,
            rgba(255,255,255,0.8) 55%,
            rgba(255,249,210,0.62) 72%,
            rgba(255,255,255,0.85) 85%,
            transparent 95%
          );
        }
        .paper-curl-left .paper-curl-highlight {
          animation-delay: -2.2s;
        }
        .paper-curl-right .paper-curl-highlight {
          animation-delay: -3s;
        }

        /* Corner peeled curls - clean highlights */
        .paper-corner-peel {
          position: absolute;
          z-index: 7;
          width: 64px;
          height: 64px;
          pointer-events: none;
          opacity: 0;
          animation: paperCornerLift 5s ease-in-out infinite;
        }
        .paper-corner-tl {
          top: -4px;
          left: -4px;
          background: 
            radial-gradient(
              ellipse at 15% 15%,
              rgba(255,255,255,0.7) 0%,
              rgba(255,250,225,0.4) 25%,
              transparent 45%
            );
          border-radius: 0 0 50px 0;
          animation-delay: 0s;
        }
        .paper-corner-tr {
          top: -4px;
          right: -4px;
          background: 
            radial-gradient(
              ellipse at 85% 15%,
              rgba(255,255,255,0.7) 0%,
              rgba(255,250,225,0.4) 25%,
              transparent 45%
            );
          border-radius: 0 0 0 50px;
          animation-delay: -1.4s;
        }
        .paper-corner-bl {
          bottom: -4px;
          left: -4px;
          background: 
            radial-gradient(
              ellipse at 15% 85%,
              rgba(255,255,255,0.65) 0%,
              rgba(255,250,225,0.35) 25%,
              transparent 45%
            );
          border-radius: 0 50px 0 0;
          animation-delay: -2.8s;
        }
        .paper-corner-br {
          bottom: -4px;
          right: -4px;
          background: 
            radial-gradient(
              ellipse at 85% 85%,
              rgba(255,255,255,0.65) 0%,
              rgba(255,250,225,0.35) 25%,
              transparent 45%
            );
          border-radius: 50px 0 0 0;
          animation-delay: -4.2s;
        }

        @keyframes paperEdgeHighlightPulse {
          0%, 100% { opacity: 0.22; }
          30% { opacity: 0.75; }
          55% { opacity: 0.35; }
          80% { opacity: 0.68; }
        }
        @keyframes paperCornerLift {
          0%, 100% { opacity: 0.18; transform: scale(0.96); }
          28% { opacity: 0.55; transform: scale(1.04); }
          55% { opacity: 0.28; transform: scale(0.98); }
          78% { opacity: 0.5; transform: scale(1.02); }
        }

        html.gc-enabled, html.gc-enabled body, html.gc-enabled * { cursor:none !important; }
        @media (pointer: coarse){ html.gc-enabled, html.gc-enabled body, html.gc-enabled * { cursor:auto !important; } }

        /* ===== ENHANCED PAPER TILT EFFECT WITH DRAG & MOMENTUM ===== */
        .paper-tilt-surface {
          --paper-tilt-x: 0deg;
          --paper-tilt-y: 0deg;
          --paper-light-x: 50%;
          --paper-light-y: 50%;
          --edge-intensity: 0;
          --press-depth: 0;
          position: relative;
          transform-style: preserve-3d;
          perspective: 1800px;
          cursor: grab;
          user-select: none;
          transition: cursor 0.2s ease;
        }
        
        .paper-tilt-surface:hover {
          cursor: grab;
        }
        
        .paper-tilt-surface:active {
          cursor: grabbing;
        }
        
        .paper-tilt-surface.paper-pressed {
          cursor: grabbing;
        }
        
        .paper-tilt-surface > .gold-paper {
          transform: 
            perspective(1800px) 
            rotateX(var(--paper-tilt-x)) 
            rotateY(var(--paper-tilt-y));
          transition: transform 0.45s cubic-bezier(0.16, 0.8, 0.2, 1), box-shadow 0.45s ease;
          position: relative;
          box-shadow: 
            0 2px 40px rgba(0,0,0,0.08),
            0 8px 60px rgba(0,0,0,0.06),
            0 20px 100px rgba(0,0,0,0.04);
        }
        
        .paper-tilt-surface.paper-pressed > .gold-paper {
          transition: transform 0.06s ease-out, box-shadow 0.08s ease-out;
          box-shadow: 
            0 6px 28px rgba(0,0,0,0.16),
            0 18px 56px rgba(0,0,0,0.22),
            0 44px 130px rgba(0,0,0,0.14),
            0 0 0 1px rgba(255,255,255,0.08);
        }
        
        .paper-tilt-surface::before {
          content: "";
          position: absolute;
          inset: -3px;
          z-index: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.22) 0%,
            rgba(255,255,255,0.06) 28%,
            transparent 48%,
            rgba(0,0,0,calc(0.015 + var(--edge-intensity) * 0.09)) 68%,
            rgba(0,0,0,calc(0.03 + var(--edge-intensity) * 0.14)) 100%
          );
          pointer-events: none;
          opacity: calc(0.85 + var(--edge-intensity) * 0.15 + var(--press-depth) * 0.25);
          transition: opacity 0.25s ease;
        }
        
        .paper-tilt-surface::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          border-radius: inherit;
          background: 
            radial-gradient(
              circle at var(--paper-light-x) var(--paper-light-y),
              rgba(255,255,255,calc(0.28 + var(--edge-intensity) * 0.18 + var(--press-depth) * 0.2)) 0%,
              rgba(255,255,255,calc(0.1 + var(--edge-intensity) * 0.08)) 28%,
              transparent calc(58% - var(--edge-intensity) * 8% - var(--press-depth) * 12%)
            );
          transition: opacity 0.25s ease;
        }
        
        .paper-tilt-surface.paper-pressed::before {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.3) 0%,
            rgba(255,255,255,0.1) 22%,
            transparent 48%,
            rgba(0,0,0,0.12) 70%,
            rgba(0,0,0,0.2) 100%
          );
        }
        
        .paper-tilt-surface.paper-pressed::after {
          background: 
            radial-gradient(
              circle at var(--paper-light-x) var(--paper-light-y),
              rgba(255,255,255,0.4) 0%,
              rgba(255,255,255,0.18) 22%,
              transparent 50%
            ),
            radial-gradient(
              circle at calc(100% - var(--paper-light-x)) calc(100% - var(--paper-light-y)),
              rgba(0,0,0,0.08) 0%,
              transparent 35%
            );
        }
        
        .paper-tilt-surface .hero-inner {
          position: relative;
          z-index: 2;
        }

        /* ===== PREMIUM CURSOR WITH DEPTH ===== */
        .gc-cursor {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 99999;
          width: 56px;
          height: 56px;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
          transition: opacity 0.25s ease;
        }
        .gc-cursor.gc-visible { opacity: 1; }
        
        .gc-outer-glow {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--gc-glow-color) 0%, transparent 70%);
          opacity: 0.25;
          transition: all 0.4s ease;
          z-index: 0;
        }
        .gc-cursor.gc-hovering .gc-outer-glow {
          opacity: 0.9;
          inset: -22px;
          background: radial-gradient(circle, var(--gc-glow-color) 0%, rgba(212,175,55,0.3) 45%, transparent 75%);
        }
        .gc-cursor.gc-clicking .gc-outer-glow {
          opacity: 1;
          inset: -26px;
          background: radial-gradient(circle, var(--gc-glow-color) 0%, rgba(212,175,55,0.4) 50%, transparent 80%);
        }

        .gc-main-ring {
          position: absolute;
          inset: 0;
          opacity: 0.9;
          transition: opacity 0.2s ease;
          filter: drop-shadow(0 0 6px var(--gc-center-shadow));
          z-index: 1;
        }
        .gc-cursor.gc-hovering .gc-main-ring { 
          filter: drop-shadow(0 0 18px var(--gc-center-shadow)); 
        }
        .gc-cursor.gc-hovering .gc-main-ring circle:first-of-type { 
          strokeWidth: 2.2; 
        }

        .gc-accent-ring {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          animation: gcAccentPulse 3s ease-in-out infinite;
          z-index: 2;
        }
        .gc-cursor.gc-hovering .gc-accent-ring { 
          opacity: 0.9; 
          animation-duration: 1.8s;
        }
        .gc-cursor.gc-hovering .gc-accent-ring circle { 
          strokeWidth: 0.85; 
          stroke-dasharray: 2 4; 
        }

        @keyframes gcAccentPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.15); opacity: 0.65; }
        }

        .gc-orbiting-dots-container {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: gcDotsRotate 4s linear infinite;
          z-index: 3;
        }
        .gc-cursor.gc-hovering .gc-orbiting-dots-container { 
          animation-duration: 2.4s; 
        }
        .gc-cursor.gc-clicking .gc-orbiting-dots-container { 
          animation-duration: 1.3s; 
        }

        .gc-micro-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          margin: -2.5px 0 0 -2.5px;
          border-radius: 50%;
          background: var(--gc-dot-fill);
          box-shadow: 
            0 0 8px var(--gc-center-shadow), 
            0 0 18px var(--gc-center-shadow);
          transition: all 0.25s ease;
        }
        .gc-cursor.gc-hovering .gc-micro-dot {
          width: 7px;
          height: 7px;
          margin: -3.5px 0 0 -3.5px;
          box-shadow: 
            0 0 16px var(--gc-center-shadow), 
            0 0 32px var(--gc-center-shadow);
        }
        .gc-cursor.gc-clicking .gc-micro-dot {
          width: 4px;
          height: 4px;
          margin: -2px 0 0 -2px;
          background: var(--gc-ripple-color);
          box-shadow: 
            0 0 18px var(--gc-ripple-color),
            0 0 36px var(--gc-ripple-color);
        }

        @keyframes gcDotsRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .gc-center-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 6px;
          height: 6px;
          margin: -3px 0 0 -3px;
          border-radius: 50%;
          background: var(--gc-center-bg);
          box-shadow: 
            0 0 10px var(--gc-center-shadow), 
            0 0 28px var(--gc-center-shadow);
          transition: all 0.25s ease;
          z-index: 4;
        }
        .gc-cursor.gc-hovering .gc-center-dot {
          width: 10px;
          height: 10px;
          margin: -5px 0 0 -5px;
          box-shadow: 
            0 0 20px var(--gc-center-shadow), 
            0 0 45px var(--gc-center-shadow);
        }
        .gc-cursor.gc-clicking .gc-center-dot {
          width: 4px;
          height: 4px;
          margin: -2px 0 0 -2px;
        }
        .gc-cursor.gc-idle .gc-center-dot {
          animation: gcIdlePulse 2.8s ease-in-out infinite;
        }

        .gc-center-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          margin: -2px 0 0 -2px;
          border-radius: 50%;
          background: var(--gc-center-bg);
          opacity: 0;
          z-index: 3;
          animation: gcCenterPulse 2.8s ease-out infinite;
        }

        @keyframes gcIdlePulse {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.8); opacity: 0.25; }
        }

        @keyframes gcCenterPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(10); opacity: 0; }
        }

        .gc-click-ripple,
        .gc-click-ripple-secondary {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          border: 1.8px solid var(--gc-ripple-color);
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
        }
        .gc-cursor.gc-clicking .gc-click-ripple {
          animation: gcRipple 0.55s ease-out forwards;
        }
        .gc-cursor.gc-clicking .gc-click-ripple-secondary {
          animation: gcRipple 0.55s 0.07s ease-out forwards;
        }

        .gc-click-burst {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gc-ripple-color);
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
          pointer-events: none;
        }
        .gc-cursor.gc-clicking .gc-click-burst {
          animation: gcBurst 0.4s ease-out forwards;
        }

        @keyframes gcRipple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.9; }
          100% { transform: translate(-50%, -50%) scale(14); opacity: 0; }
        }

        @keyframes gcBurst {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.9; }
          40% { transform: translate(-50%, -50%) scale(3.5); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(9); opacity: 0; }
        }

        .gc-cursor-label {
          position: fixed;
          z-index: 99998;
          pointer-events: none;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
          background: var(--gc-label-bg);
          color: var(--gc-label-color);
          white-space: nowrap;
          opacity: 0;
          will-change: transform, opacity;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        @media (pointer: coarse) { .gc-cursor, .gc-cursor-label { display: none !important; } }

        /* ===== ATOMIC BLAST ENTRY ANIMATION ===== */
        .atomic-intro .hero-intro-content{
          position:absolute;
          left:50%;
          bottom:5%;
          top:auto;
          transform:translateX(-50%);
          width:min(94vw,780px);
          text-align:center;
          z-index:10;
          pointer-events:none;
          opacity:0;
          animation:vijayamWorldBlast 2.2s cubic-bezier(.16,.8,.2,1) 1.8s forwards;
        }
        .atomic-intro .hero-intro-title{
          display:block;
          margin-top:.55rem;
          text-shadow:
            0 0 40px rgba(255,213,107,.75),
            0 0 80px rgba(255,180,40,.7),
            0 0 120px rgba(255,213,107,.55),
            0 0 200px rgba(255,180,40,.35),
            0 16px 48px rgba(0,0,0,.5);
        }
        .atomic-intro .hero-intro-line{
          display:block;
          margin:.9rem auto 0;
        }

        .hero-paper-card{
          position:relative;
          transform-style:preserve-3d;
          perspective:1500px;
          isolation:isolate;
        }
        .hero-paper-card::before{
          content:"";position:absolute;inset:-1px;pointer-events:none;z-index:50;
          border-radius:inherit;
          border:1px solid rgba(255,255,255,.18);
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),
                     inset 0 0 45px rgba(255,255,255,.04);
        }
        .hero-paper-card::after{
          content:"";position:absolute;inset:-10px;pointer-events:none;z-index:-1;
          border-radius:inherit;
          background:linear-gradient(135deg,rgba(255,255,255,.15),transparent 25%,transparent 72%,rgba(0,0,0,.12));
          filter:blur(9px);transform:translateZ(-16px) scale(.985);
        }

        .atomic-intro{
          background:
            radial-gradient(circle at 50% 50%, rgba(255,214,100,.18), transparent 20%),
            radial-gradient(circle at 50% 50%, #070912 0%, #02030a 48%, #000 100%);
          isolation:isolate;
        }
        .atomic-space{
          position:absolute;
          inset:0;
          background:
            radial-gradient(1.5px 1.5px at 12% 18%,rgba(255,255,255,.95),transparent 3px),
            radial-gradient(1px 1px at 28% 72%,rgba(255,220,150,.8),transparent 2px),
            radial-gradient(1.5px 1.5px at 76% 24%,rgba(255,255,255,.9),transparent 3px),
            radial-gradient(1px 1px at 88% 70%,rgba(255,220,150,.75),transparent 2px),
            radial-gradient(2px 2px at 60% 12%,rgba(255,255,255,.85),transparent 3px),
            radial-gradient(1px 1px at 42% 58%,rgba(255,255,255,.8),transparent 2px),
            radial-gradient(1.5px 1.5px at 18% 82%,rgba(255,220,150,.7),transparent 2px);
          animation:atomicSpaceBlast 5.5s ease-in-out both;
        }
        .atomic-stars{
          position:absolute;
          inset:-15%;
          opacity:.65;
          background-image:
            radial-gradient(circle,rgba(255,255,255,.9) 0 1px,transparent 1.5px);
          background-size:74px 74px;
          animation:atomicStarsDriftBlast 12s linear infinite;
        }
        .atomic-energy-cloud{
          position:absolute;
          width:min(65vw,780px);
          aspect-ratio:1;
          border-radius:50%;
          background:
            radial-gradient(circle,
              rgba(255,255,255,.2) 0 2%,
              rgba(255,210,100,.24) 4%,
              rgba(255,180,50,.15) 18%,
              transparent 55%);
          filter:blur(3px);
          animation:atomicCloudBlast 3.8s ease-in-out infinite;
        }
        .atomic-system{
          position:absolute;
          width:min(25vw,280px);
          aspect-ratio:1;
          display:grid;
          place-items:center;
          transform-style:preserve-3d;
          z-index:4;
          animation:atomicSystemBlast 3.2s cubic-bezier(.16,.8,.2,1) both;
        }
        .atomic-nucleus{
          position:absolute;
          width:38%;
          aspect-ratio:1;
          border-radius:50%;
          display:grid;
          place-items:center;
          background:radial-gradient(circle,#fff 0 8%,#ffe9a0 18%,rgba(255,193,63,.85) 38%,rgba(255,170,30,0) 72%);
          box-shadow:
            0 0 30px rgba(255,255,255,.98),
            0 0 60px rgba(255,207,90,.95),
            0 0 150px rgba(255,174,40,.6),
            0 0 220px rgba(255,174,40,.3);
          animation:atomicNucleusBlast 2.1s ease-in-out infinite;
        }
        .nucleus-core{
          width:28%;
          aspect-ratio:1;
          border-radius:50%;
          background:#fff;
          box-shadow:0 0 20px #fff,0 0 45px rgba(255,220,120,.98);
        }
        .nucleus-glow{
          position:absolute;
          inset:-45%;
          border-radius:50%;
          border:1px solid rgba(255,215,110,.7);
          box-shadow:inset 0 0 35px rgba(255,205,90,.5),0 0 45px rgba(255,205,90,.4);
          animation:atomicNucleusHaloBlast 2.4s ease-out infinite;
        }
        .atomic-orbit{
          position:absolute;
          width:100%;
          height:44%;
          left:0;
          top:28%;
          border:1.5px solid rgba(255,221,142,.7);
          border-radius:50%;
          transform-style:preserve-3d;
          box-shadow:0 0 25px rgba(255,194,72,.35);
        }
        .orbit-a{transform:rotateX(68deg) rotateZ(0deg);animation:atomicOrbitA 3.5s linear infinite;}
        .orbit-b{transform:rotateX(68deg) rotateZ(60deg);animation:atomicOrbitB 4.5s linear infinite;}
        .orbit-c{transform:rotateX(68deg) rotateZ(-60deg);animation:atomicOrbitC 5.4s linear infinite;}
        .atomic-electron{
          position:absolute;
          left:50%;
          top:-6px;
          width:13px;
          height:13px;
          margin-left:-6.5px;
          border-radius:50%;
          background:#fff;
          box-shadow:0 0 10px #fff,0 0 30px rgba(255,205,90,.98),0 0 55px rgba(255,180,40,.7);
          animation:atomicElectronPulse 1.15s ease-in-out infinite;
        }
        .atomic-particle{
          position:absolute;
          left:50%;
          top:50%;
          width:7px;
          height:7px;
          margin:-3.5px;
          border-radius:50%;
          background:#fff;
          box-shadow:0 0 15px rgba(255,220,140,.98);
          animation:atomicParticleBlast 2.2s cubic-bezier(.12,.72,.18,1) infinite;
        }
        .particle-a{--pa:15deg;--pd:185px;animation-delay:.05s;}
        .particle-b{--pa:76deg;--pd:145px;animation-delay:.32s;}
        .particle-c{--pa:142deg;--pd:210px;animation-delay:.18s;}
        .particle-d{--pa:208deg;--pd:160px;animation-delay:.46s;}
        .particle-e{--pa:264deg;--pd:195px;animation-delay:.22s;}
        .particle-f{--pa:325deg;--pd:165px;animation-delay:.6s;}

        .atomic-ripple{
          position:absolute;
          width:min(35vw,420px);
          aspect-ratio:1;
          border:1.5px solid rgba(255,214,112,.6);
          border-radius:50%;
          box-shadow:0 0 35px rgba(255,195,65,.2),inset 0 0 35px rgba(255,195,65,.15);
          animation:atomicRippleBlast 2.8s cubic-bezier(.12,.72,.2,1) infinite;
        }
        .ripple-two{animation-delay:.7s;}
        .ripple-three{animation-delay:1.4s;}

        .atomic-sweep{
          position:absolute;
          top:-25%;
          bottom:-25%;
          left:-30%;
          width:16%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),rgba(255,214,110,.28),transparent);
          filter:blur(8px);
          transform:skewX(-15deg);
          animation:atomicSweepBlast 4.2s cubic-bezier(.2,.7,.2,1) both;
          z-index:5;
        }

        @keyframes vijayamWorldBlast{
          0%{opacity:0;transform:translate3d(0,40px,0) scale(.7);filter:blur(20px);}
          25%{opacity:.3;transform:translate3d(0,20px,0) scale(.85);filter:blur(8px);}
          45%{opacity:.85;transform:translate3d(0,-4px,0) scale(1.04);filter:blur(0);}
          65%{opacity:1;transform:translate3d(0,0,0) scale(.98);}
          80%{opacity:1;transform:translate3d(0,0,0) scale(1);}
          100%{opacity:1;transform:translate3d(0,0,0) scale(1);}
        }
        @keyframes atomicSystemBlast{
          0%{opacity:0;transform:scale(.05) rotate(-30deg);filter:blur(18px);}
          18%{opacity:1;transform:scale(1.25) rotate(8deg);filter:blur(6px);}
          35%{transform:scale(.92) rotate(-3deg);filter:blur(1px);}
          52%{transform:scale(1.08) rotate(2deg);filter:blur(0);}
          68%{transform:scale(.98) rotate(-1deg);}
          85%{transform:scale(1.02) rotate(0.5deg);}
          100%{transform:scale(1) rotate(0);opacity:1;}
        }
        @keyframes atomicNucleusBlast{
          0%,100%{transform:scale(.75);filter:brightness(.85);}
          35%{transform:scale(1.3);filter:brightness(1.6);}
          65%{transform:scale(.9);filter:brightness(1.1);}
        }
        @keyframes atomicNucleusHaloBlast{
          0%{transform:scale(.35);opacity:.8;}
          65%{transform:scale(2.2);opacity:0;}
          100%{transform:scale(2.2);opacity:0;}
        }
        @keyframes atomicOrbitA{from{transform:rotateX(68deg) rotateZ(0deg) rotate(0deg);}to{transform:rotateX(68deg) rotateZ(0deg) rotate(360deg);}}
        @keyframes atomicOrbitB{from{transform:rotateX(68deg) rotateZ(60deg) rotate(360deg);}to{transform:rotateX(68deg) rotateZ(60deg) rotate(0deg);}}
        @keyframes atomicOrbitC{from{transform:rotateX(68deg) rotateZ(-60deg) rotate(0deg);}to{transform:rotateX(68deg) rotateZ(-60deg) rotate(360deg);}}
        @keyframes atomicElectronPulse{0%,100%{transform:scale(.7);opacity:.65;}50%{transform:scale(1.35);opacity:1;}}
        @keyframes atomicParticleBlast{
          0%{transform:rotate(var(--pa)) translateX(0) scale(.1);opacity:0;}
          15%{opacity:1;}
          100%{transform:rotate(var(--pa)) translateX(var(--pd)) scale(.03);opacity:0;}
        }
        @keyframes atomicRippleBlast{
          0%{transform:scale(.1);opacity:0;}
          12%{opacity:.9;}
          100%{transform:scale(3);opacity:0;}
        }
        @keyframes atomicSweepBlast{
          0%{transform:translateX(-130%) skewX(-15deg);opacity:0;}
          18%{opacity:.15;}
          40%{opacity:.6;}
          62%{opacity:.15;}
          100%{transform:translateX(155%) skewX(-15deg);opacity:0;}
        }
        @keyframes atomicSpaceBlast{0%{opacity:0;transform:scale(.5);}30%{opacity:1;transform:scale(1.2);}60%{opacity:.85;transform:scale(.95);}100%{opacity:.78;transform:scale(1);}}
        @keyframes atomicStarsDriftBlast{from{transform:translate3d(0,0,0) scale(.9);}to{transform:translate3d(3%,-3%,0) scale(1.06);}}
        @keyframes atomicCloudBlast{0%,100%{transform:scale(.7);opacity:.22;}50%{transform:scale(1.18);opacity:.85;}}

        .hero-intro{
          position:absolute;
          inset:0;
          z-index:100;
          display:grid;
          place-items:center;
          pointer-events:none;
          overflow:hidden;
          animation:heroIntroOutBlast 9s cubic-bezier(.76,0,.18,1) forwards;
        }

        .hero-intro-content{
          position:relative;
          z-index:6;
          display:grid;
          justify-items:center;
          gap:.85rem;
          text-align:center;
          transform:translateY(10px);
          animation:introContentBlast 4.8s .2s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .hero-intro-kicker{
          color:#e9cd95;
          font-size:.8rem;
          font-weight:900;
          letter-spacing:.45em;
          text-transform:uppercase;
          text-shadow:0 0 22px rgba(255,213,107,.5);
          animation:introKickerGlowBlast 3s .5s ease-in-out infinite;
        }
        .hero-intro-title{
          color:#fff8ea;
          font-size:clamp(2.4rem,6vw,6.5rem);
          font-weight:950;
          letter-spacing:-.07em;
          line-height:.88;
          text-transform:uppercase;
          text-shadow:0 20px 60px rgba(0,0,0,.7),0 0 140px rgba(255,213,107,.6);
          animation:introTitlePulseBlast 3.5s .6s ease-in-out infinite;
        }
        .hero-intro-line{
          width:200px;
          height:2px;
          background:linear-gradient(90deg,transparent,#9a690e,#ffeaa3,#fff0b2,transparent);
          transform:scaleX(0);
          animation:introLineBlast 3s .6s ease forwards,introLineGlowBlast 2s 2.8s ease-in-out infinite;
        }

        .hero-intro::before{
          content:"";
          position:absolute;
          width:55vmin;
          height:55vmin;
          border-radius:50%;
          border:2px solid rgba(255,255,255,.75);
          box-shadow:0 0 0 2px rgba(211,164,57,.3),0 0 150px rgba(255,213,107,.5),inset 0 0 110px rgba(255,255,255,.35),0 0 200px rgba(255,213,107,.3);
          animation:introPortalBlast 5.5s .3s cubic-bezier(.2,.75,.15,1) forwards;
          z-index:2;
        }
        .hero-intro::after{
          content:"";
          position:absolute;
          inset:-25%;
          background:linear-gradient(105deg, transparent 36%, rgba(255,255,255,.9) 48%, rgba(255,218,118,.65) 52%, transparent 64%);
          transform:translateX(-72%) skewX(-12deg);
          animation:introLightSweepBlast 4.5s .35s cubic-bezier(.2,.8,.2,1) forwards;
          z-index:3;
        }

        @keyframes heroIntroOutBlast{ 0%,78%{opacity:1;visibility:visible;}100%{opacity:0;visibility:hidden;} }
        @keyframes introContentBlast{
          0%{opacity:0;transform:translateY(55px) scale(.75);filter:blur(20px);}
          35%{opacity:.8;filter:blur(2px);}
          100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0);}
        }
        @keyframes introLineBlast{ to { transform:scaleX(1);} }
        @keyframes introLineGlowBlast{ 0%,100%{opacity:.6;box-shadow:0 0 20px rgba(255,213,107,.5);}50%{opacity:1;box-shadow:0 0 45px rgba(255,213,107,.85);} }
        @keyframes introKickerGlowBlast{ 0%,100%{text-shadow:0 0 18px rgba(255,213,107,.45);}50%{text-shadow:0 0 40px rgba(255,213,107,.75);} }
        @keyframes introTitlePulseBlast{ 0%,100%{text-shadow:0 20px 60px rgba(0,0,0,.65),0 0 140px rgba(255,213,107,.55);}50%{text-shadow:0 20px 60px rgba(0,0,0,.65),0 0 240px rgba(255,213,107,.85);} }
        @keyframes introPortalBlast{
          0%{transform:scale(.01);opacity:0;}
          10%{transform:scale(.15);opacity:1;}
          30%{transform:scale(.5);opacity:1;}
          55%{transform:scale(1.15);opacity:.85;}
          100%{transform:scale(5);opacity:0;}
        }
        @keyframes introLightSweepBlast{
          0%{transform:translateX(-85%) skewX(-12deg);opacity:0;}
          10%{opacity:1;}
          35%{opacity:1;}
          100%{transform:translateX(85%) skewX(-12deg);opacity:0;}
        }

        .hero-fx-canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0; opacity:.82; transition:opacity 700ms ease; }
        .hero-page::before,.hero-page::after { content:""; position:absolute; inset:0; pointer-events:none; transition:opacity 700ms ease,filter 700ms ease; }
        .hero-page::before { background:repeating-linear-gradient(90deg, rgba(91,59,5,.02) 0 1px, transparent 1px 34px),repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 1px, transparent 1px 32px); z-index:0; }
        .hero-page.hero-night::before { opacity:.34; }
        .hero-page::after { opacity:.58; background:radial-gradient(circle at 48% 0%, rgba(255,255,255,.62), transparent 22%),conic-gradient(from 180deg at 50% 0%, transparent, rgba(255,228,132,.28), transparent, rgba(255,255,255,.2), transparent); filter:blur(20px); animation:pageAurora 8s ease-in-out infinite alternate; z-index:0; }
        .hero-page.hero-night::after { opacity:.76; background:radial-gradient(circle at 48% 0%, rgba(171,200,255,.3), transparent 25%),conic-gradient(from 200deg at 50% 0%, transparent, rgba(141,104,255,.3), transparent, rgba(97,210,255,.16), transparent); filter:blur(24px) saturate(1.1); }

        /* ===== WHITER PAPER BACKGROUND FOR VISIBLE EDGE EFFECTS ===== */
        .gold-paper { position:relative; z-index:1; min-height:100vh; padding:clamp(3.2rem,5vw,5rem) 5vw 4rem; transform-style:preserve-3d; animation:sheetBreath 9s ease-in-out infinite; background:linear-gradient(90deg, rgba(255,255,255,.65), transparent 14%, transparent 88%, rgba(255,255,255,.4)),radial-gradient(circle at 50% 4%, rgba(255,255,255,.7), transparent 30%),repeating-linear-gradient(112deg, rgba(180,140,50,.02) 0 1px, transparent 1px 22px),linear-gradient(135deg, rgba(255,255,255,.95), rgba(250,245,235,.45) 52%, rgba(255,255,252,.85)); transition:background 900ms cubic-bezier(.2,.8,.2,1); }
        .hero-page.hero-night .gold-paper { background:linear-gradient(90deg, rgba(255,255,255,.03), transparent 14%, transparent 88%, rgba(255,255,255,.025)),radial-gradient(circle at 50% 4%, rgba(141,164,255,.14), transparent 32%),repeating-linear-gradient(112deg, rgba(124,132,255,.03) 0 1px, transparent 1px 24px),linear-gradient(135deg, rgba(13,16,31,.7), rgba(23,26,49,.42) 52%, rgba(15,18,35,.68)); }

        .hero-inner { width:min(1500px,100%); min-height:calc(100vh - 7rem); margin:0 auto; display:grid; grid-template-columns:minmax(0,.82fr) minmax(560px,1.18fr); align-items:center; gap:clamp(2.4rem,4.5vw,5.5rem); }
        .hero-copy { position:relative; z-index:20; max-width:610px; padding:clamp(2.2rem,3.8vw,3.85rem); border:1px solid rgba(183,134,34,.22); border-left:3px solid rgba(189,130,20,.5); border-radius:32px; transform-style:preserve-3d; backdrop-filter:blur(18px); animation:cardRise 6.5s ease-in-out infinite; opacity:calc(.92 + var(--hero-reveal) * .08); transform:translateY(calc((1 - var(--hero-reveal)) * 12px)); transition:opacity .7s ease,transform .7s ease,background 800ms ease,border-color 700ms ease,box-shadow 700ms ease; pointer-events:auto; background:radial-gradient(circle at 15% 5%, rgba(255,255,255,.95), transparent 28%),linear-gradient(135deg, rgba(255,255,250,.92), rgba(255,252,240,.5)),linear-gradient(90deg, rgba(255,255,248,.78), rgba(255,252,238,.3)); box-shadow:0 24px 60px rgba(104,68,6,.12),0 0 0 6px rgba(255,255,255,.2),inset 0 1px 0 rgba(255,255,255,.95); }
        .hero-page.hero-night .hero-copy { border-color:rgba(120,132,255,.36); border-left-color:rgba(112,190,255,.58); background:radial-gradient(circle at 15% 5%, rgba(199,214,255,.22), transparent 28%),linear-gradient(135deg, rgba(24,29,53,.75), rgba(24,36,67,.44)),linear-gradient(90deg, rgba(21,26,45,.62), rgba(19,24,43,.25)); box-shadow:0 26px 65px rgba(4,7,18,.52),0 0 0 1px rgba(154,171,255,.22),inset 0 1px 0 rgba(255,255,255,.12); }

        .publisher-lockup { display:block; margin-bottom:1.45rem; }
        .publisher-mark { display:block; color:transparent; font-size:clamp(1.95rem,2.75vw,3rem); font-weight:950; letter-spacing:.1em; line-height:1.1; text-transform:uppercase; white-space:normal; word-break:keep-all; overflow-wrap:normal; background:linear-gradient(92deg,#2e1a00 0%,#8c5403 32%,#d99b22 58%,#4f3102 100%); -webkit-background-clip:text; background-clip:text; text-shadow:0 10px 26px rgba(111,70,5,.18); animation:brandPresence 5s ease-in-out infinite; transition:background 700ms ease; }
        .hero-page.hero-night .publisher-mark { background:linear-gradient(92deg,#e8eaff 0%,#97b0ff 30%,#78d8ff 60%,#d7d7ff 100%); -webkit-background-clip:text; background-clip:text; }
        .publisher-tagline { max-width:520px; margin:1rem 0 0; color:rgba(70,40,2,.96); font-size:clamp(.94rem,1.08vw,1.08rem); font-weight:750; line-height:1.75; letter-spacing:.01em; transition:color 700ms ease; }
        .hero-page.hero-night .publisher-tagline { color:rgba(223,227,244,.96); }
        .eyebrow { display:inline-flex; margin-bottom:1.05rem; color:#5c3903; font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; transition:color 700ms ease; }
        .hero-page.hero-night .eyebrow { color:#bfd4ff; }
        .hero-copy h1 { margin:0; max-width:620px; font-size:clamp(2.65rem,4.35vw,5rem); line-height:.94; letter-spacing:-.065em; text-transform:uppercase; text-wrap:balance; }
        .hero-copy h1::after { content:""; display:block; width:92px; height:2px; margin-top:1.35rem; border-radius:999px; background:linear-gradient(90deg,#7d5307,#eac25d,transparent); opacity:.92; animation:linePulse 2.6s ease-in-out infinite; transition:background 700ms ease; }
        .hero-page.hero-night .hero-copy h1::after { background:linear-gradient(90deg,#8cb2ff,#7ce1ff,transparent); }
        .brand { display:block; margin-top:.2em; color:#4a2e03; transition:color 700ms ease; }
        .hero-page.hero-night .brand { color:#dbe4ff; }
        .hero-copy p.hero-description { max-width:470px; margin:1.35rem 0 0; color:var(--muted); font-size:clamp(.96rem,1.12vw,1.08rem); line-height:1.7; font-weight:650; }

        .hero-actions { display:flex; flex-wrap:wrap; gap:1rem; margin-top:1.9rem; perspective:850px; position:relative; z-index:25; pointer-events:auto; }
        .hero-btn { position:relative; display:inline-flex; align-items:center; justify-content:center; gap:.65rem; min-height:52px; padding:.86rem 1.35rem; border-radius:999px; text-decoration:none; font-size:.82rem; font-weight:950; letter-spacing:.05em; overflow:hidden; isolation:isolate; transform-style:preserve-3d; transition:transform 280ms cubic-bezier(.2,.8,.2,1),box-shadow 280ms ease,color 700ms ease,background 700ms ease,border-color 700ms ease; cursor:pointer; pointer-events:auto; }
        .hero-btn::before { content:""; position:absolute; inset:-2px; z-index:-1; background:linear-gradient(115deg, transparent 18%, rgba(255,255,255,.4) 48%, transparent 74%); transform:translateX(-135%) rotate(8deg); transition:transform 650ms cubic-bezier(.2,.8,.2,1); }
        .hero-btn::after { content:"↗"; display:grid; place-items:center; width:24px; height:24px; border-radius:50%; font-size:.72rem; transform:translateZ(18px); transition:transform 260ms ease; }
        .hero-btn:hover { transform:translateY(-6px) rotateX(8deg) rotateY(-7deg) translateZ(10px); }
        .hero-btn:hover::before { transform:translateX(135%) rotate(8deg); }
        .hero-btn:hover::after { transform:translate(3px,-3px) translateZ(20px); }
        .hero-btn.primary { color:#fff9df; background:linear-gradient(135deg,#2d1b02 0%,#76500b 52%,#b9811e 100%); border:1px solid rgba(255,224,133,.35); box-shadow:0 14px 32px rgba(71,43,2,.2),0 6px 0 rgba(74,45,4,.15),inset 0 1px 0 rgba(255,255,255,.18); }
        .hero-page.hero-night .hero-btn.primary { color:#ecf5ff; background:linear-gradient(135deg,#1c2345 0%,#243a7a 52%,#2f5c9d 100%); border-color:rgba(147,197,255,.35); box-shadow:0 16px 36px rgba(5,10,25,.4),0 6px 0 rgba(5,10,25,.3),inset 0 1px 0 rgba(255,255,255,.14); }
        .hero-btn.primary::after { background:rgba(255,244,193,.12); border:1px solid rgba(255,244,193,.2); }
        .hero-page.hero-night .hero-btn.primary::after { background:rgba(171,214,255,.16); border-color:rgba(171,214,255,.24); }
        .hero-btn.secondary { color:#563803; border:1px solid rgba(121,81,8,.24); background:rgba(255,255,250,.72); box-shadow:0 10px 22px rgba(99,65,5,.08),0 5px 0 rgba(153,108,25,.1),inset 0 1px 0 rgba(255,255,255,.7); backdrop-filter:blur(12px); }
        .hero-page.hero-night .hero-btn.secondary { color:#dce8ff; border-color:rgba(153,178,255,.28); background:rgba(25,31,58,.66); box-shadow:0 10px 22px rgba(7,10,25,.28),0 5px 0 rgba(7,10,25,.34),inset 0 1px 0 rgba(255,255,255,.08); }
        .hero-btn.secondary::after { content:"→"; background:rgba(181,135,36,.08); border:1px solid rgba(181,135,36,.16); }
        .hero-page.hero-night .hero-btn.secondary::after { background:rgba(146,196,255,.12); border-color:rgba(146,196,255,.2); }

        .social-links { display:flex; flex-wrap:wrap; gap:.78rem; margin-top:1.75rem; align-items:center; position:relative; z-index:30; pointer-events:auto; }
        .social-link {
          --social-a:#7a5007;
          --social-b:#d8a332;
          --social-glow:rgba(216,163,50,.2);
          position:relative;
          display:grid;
          place-items:center;
          width:46px;
          height:46px;
          border-radius:16px;
          color:#fff;
          border:1px solid rgba(255,255,255,.3);
          background:radial-gradient(circle at 28% 18%, rgba(255,255,255,.72), transparent 25%),linear-gradient(135deg,var(--social-a),var(--social-b));
          box-shadow:0 12px 24px var(--social-glow),0 8px 16px rgba(83,52,2,.1),inset 0 1px 0 rgba(255,255,255,.4),inset 0 -8px 14px rgba(0,0,0,.1);
          overflow:hidden;
          isolation:isolate;
          transition:transform 260ms cubic-bezier(.2,.8,.2,1),border-radius 260ms ease,box-shadow 260ms ease,filter 260ms ease;
          cursor:pointer;
          pointer-events:auto;
          z-index:35;
          text-decoration:none;
        }
        .social-link, .social-link:hover, .social-link:active, .social-link:visited { text-decoration:none; }
        .social-instagram { --social-a:#833ab4; --social-b:#fd1d1d; --social-glow:rgba(225,48,108,.26); }
        .social-facebook { --social-a:#1877f2; --social-b:#0a4fb7; --social-glow:rgba(24,119,242,.24); }
        .social-twitter { --social-a:#111827; --social-b:#38bdf8; --social-glow:rgba(56,189,248,.2); }
        .social-medium { --social-a:#111111; --social-b:#4b5563; --social-glow:rgba(17,17,17,.2); }
        .social-youtube { --social-a:#ff0033; --social-b:#b00020; --social-glow:rgba(255,0,51,.22); }
        .social-link::before { content:""; position:absolute; inset:-55%; z-index:-1; background:linear-gradient(115deg, transparent 26%, rgba(255,255,255,.62), transparent 68%); transform:translateX(-105%) rotate(12deg); transition:transform 620ms cubic-bezier(.2,.8,.2,1); }
        .social-link::after { content:""; position:absolute; inset:3px; border-radius:13px; border:1px solid rgba(255,255,255,.18); pointer-events:none; }
        .social-link:hover { transform:translateY(-6px) scale(1.07); border-radius:50%; filter:saturate(1.12) brightness(1.04); }
        .social-link:hover::before { transform:translateX(105%) rotate(12deg); }
        .social-link svg { position:relative; z-index:1; width:21px; height:21px; fill:currentColor; filter:drop-shadow(0 4px 6px rgba(0,0,0,.14)); }

        .book-stage { --book-width:112px; --book-height:164px; --book-depth:18px; --orbit-diameter:490px; --theme-flash:0; position:relative; min-width:0; min-height:700px; display:grid; place-items:center; perspective:1500px; perspective-origin:50% 50%; isolation:isolate; touch-action:pan-y; overflow:visible; }
        .cinematic-vignette { position:absolute; inset:0; z-index:1; pointer-events:none; background:radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,.35) 100%); opacity:calc((1 - var(--hero-reveal)) * .8); transition:opacity .8s ease; }
        .hero-light-beam { position:absolute; z-index:1; width:min(74%,580px); height:42%; top:28%; left:50%; transform:translateX(-50%) rotate(-8deg); pointer-events:none; background:linear-gradient(100deg, transparent 34%, rgba(255,255,255,.22) 47%, rgba(255,198,105,.16) 51%, transparent 64%); filter:blur(12px); opacity:calc(.12 + var(--theme-flash) * .35 + var(--center-focus) * .28); animation:beamSweep 7.2s ease-in-out infinite; }
        .hero-page.hero-night .hero-light-beam { background:linear-gradient(100deg, transparent 34%, rgba(171,214,255,.2) 47%, rgba(165,131,255,.18) 51%, transparent 64%); }
        .energy-ring { position:absolute; width:min(74%,560px); aspect-ratio:1; border-radius:50%; z-index:1; pointer-events:none; filter:blur(1px); background:conic-gradient(from 10deg, rgba(255,231,156,.04), rgba(255,178,63,.1), rgba(103,204,255,.1), rgba(221,143,255,.09), rgba(255,231,156,.04)); box-shadow:0 0 44px rgba(234,176,64,.16), inset 0 0 36px rgba(255,244,199,.1); opacity:calc(.35 + (1 - var(--center-focus)) * .55); animation:chromaticOrbitLight 13s linear infinite; }
        .hero-page.hero-night .energy-ring { background:conic-gradient(from 10deg, rgba(152,195,255,.06), rgba(114,146,255,.14), rgba(78,219,255,.13), rgba(173,117,255,.12), rgba(152,195,255,.06)); box-shadow:0 0 52px rgba(117,152,255,.2), inset 0 0 38px rgba(163,194,255,.08); }

        .paper-stage { position:absolute; z-index:0; width:min(88%,610px); aspect-ratio:1/1; overflow:hidden; border:1px solid rgba(255,250,222,.56); border-radius:50%; pointer-events:none; transform:perspective(1100px) rotateX(4deg) rotateY(-3deg) scale(.995); background:radial-gradient(circle at 30% 18%, rgba(255,255,255,.82), transparent 23%),radial-gradient(circle at 72% 72%, rgba(224,184,85,.08), transparent 32%),linear-gradient(115deg, rgba(255,255,255,.72), rgba(255,248,211,.26) 34%, rgba(236,209,136,.16) 64%, rgba(255,252,229,.44)); opacity:.74; box-shadow:inset 18px 0 36px rgba(255,255,239,.62),inset -20px 0 34px rgba(150,105,26,.04),0 30px 76px rgba(113,75,10,.1),0 0 0 1px rgba(255,246,190,.2); animation:paperModernFlow 8.5s ease-in-out infinite; transition:background 800ms ease,border-color 700ms ease; }
        .hero-page.hero-night .paper-stage { border-color:rgba(152,176,255,.28); background:radial-gradient(circle at 30% 18%, rgba(220,231,255,.2), transparent 24%),radial-gradient(circle at 72% 72%, rgba(76,176,255,.12), transparent 34%),linear-gradient(115deg, rgba(38,49,87,.62), rgba(39,46,79,.34) 34%, rgba(45,71,126,.2) 64%, rgba(28,39,67,.52)); }
        .paper-stage::before { content:""; position:absolute; inset:-18%; background:conic-gradient(from 120deg, transparent, rgba(255,255,255,.24), transparent, rgba(230,200,122,.08), transparent); filter:blur(18px); opacity:.62; animation:paperAurora 10s ease-in-out infinite; }
        .hero-page.hero-night .paper-stage::before { background:conic-gradient(from 120deg, transparent, rgba(171,216,255,.18), transparent, rgba(141,129,255,.16), transparent); }
        .paper-stage::after { content:""; position:absolute; inset:0; opacity:.06; background:repeating-linear-gradient(108deg, rgba(90,55,4,.03) 0 1px, transparent 1px 20px),radial-gradient(circle at 40% 35%, rgba(255,255,255,.2), transparent 36%); mix-blend-mode:multiply; }
        .paper-edge { position:absolute; z-index:2; pointer-events:none; opacity:.62; filter:blur(.3px); mix-blend-mode:screen; }
        .paper-edge-top,.paper-edge-bottom { left:11%; width:78%; height:20px; background:linear-gradient(90deg, transparent, rgba(255,255,255,.68), rgba(231,185,76,.14), transparent),repeating-linear-gradient(90deg, rgba(121,80,9,.12) 0 1px, transparent 1px 16px); mask-image:linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent); animation:paperEdgeSlide 5.8s ease-in-out infinite; }
        .paper-edge-top { top:8%; transform:rotate(-4deg); }
        .paper-edge-bottom { bottom:8%; transform:rotate(4deg); animation-delay:-2.2s; }
        .paper-edge-left,.paper-edge-right { top:12%; height:76%; width:20px; background:linear-gradient(180deg, transparent, rgba(255,255,255,.62), rgba(221,169,61,.14), transparent),repeating-linear-gradient(180deg, rgba(121,80,9,.1) 0 1px, transparent 1px 15px); mask-image:linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent); animation:paperEdgeBreathe 6.4s ease-in-out infinite; }
        .paper-edge-left { left:8.5%; transform:rotate(5deg); animation-delay:-1s; }
        .paper-edge-right { right:8.5%; transform:rotate(-5deg); animation-delay:-3.1s; }
        .paper-corner { position:absolute; z-index:3; width:82px; height:82px; border-radius:18px 70px 22px 70px; pointer-events:none; opacity:.42; background:radial-gradient(circle at 25% 25%, rgba(255,255,255,.76), transparent 36%),linear-gradient(135deg, rgba(255,255,255,.38), rgba(229,184,75,.1), transparent 72%); box-shadow:inset 8px 8px 14px rgba(255,255,255,.4),inset -10px -10px 18px rgba(137,91,12,.06),0 12px 24px rgba(107,69,8,.08); animation:paperCornerLiftInner 6.5s ease-in-out infinite; }
        .paper-corner-one { top:7%; right:12%; transform:rotate(13deg) skew(-5deg); }
        .paper-corner-two { left:13%; bottom:9%; transform:rotate(193deg) skew(-5deg); animation-delay:-2.7s; }
        .paper-fold { position:absolute; width:70%; height:150%; top:-25%; border-radius:50%; filter:blur(12px); }
        .paper-fold-one { left:-32%; background:linear-gradient(90deg, rgba(255,255,255,.3), transparent 68%); }
        .paper-fold-two { right:-36%; background:linear-gradient(-90deg, rgba(171,119,24,.03), transparent 72%); }
        .paper-light { position:absolute; inset:-30%; background:linear-gradient(108deg, transparent 39%, rgba(255,255,246,.38) 48%, rgba(242,217,138,.08) 53%, transparent 61%); transform:translateX(-42%); animation:paperLight 7.8s ease-in-out infinite; }
        .hero-page.hero-night .paper-light { background:linear-gradient(108deg, transparent 39%, rgba(171,214,255,.3) 48%, rgba(146,176,255,.1) 53%, transparent 61%); }

        .book-stage::before { content:""; position:absolute; left:50%; top:50%; width:min(66%,520px); aspect-ratio:1; border-radius:50%; transform:translate(-50%,-50%); background:radial-gradient(circle, rgba(255,255,255,.42) 0%, rgba(255,236,170,.14) 35%, rgba(255,211,99,.03) 58%, transparent 72%); filter:blur(18px); opacity:.62; pointer-events:none; z-index:1; animation:haloPulse 8s ease-in-out infinite; transition:background 700ms ease, opacity 500ms ease; }
        .hero-page.hero-night .book-stage::before { background:radial-gradient(circle, rgba(173,213,255,.34) 0%, rgba(113,143,255,.14) 35%, rgba(87,108,255,.05) 58%, transparent 72%); }

        .orbit-guide { position:absolute; left:50%; top:50%; z-index:1; width:var(--orbit-diameter); height:var(--orbit-diameter); border-radius:50%; border:1px solid rgba(108,69,6,.04); box-shadow:inset 0 0 56px rgba(255,255,255,.1),0 0 60px rgba(219,179,76,.06); pointer-events:none; transform:translate(-50%,-50%) scale(.08); transform-origin:center; transition:border-color 700ms ease,box-shadow 700ms ease; }
        .hero-page.hero-night .orbit-guide { border-color:rgba(140,157,255,.14); box-shadow:inset 0 0 56px rgba(156,198,255,.08),0 0 60px rgba(89,114,255,.12); }

        .book-orbit { position:absolute; z-index:2; left:50%; top:50%; width:0; height:0; transform-style:preserve-3d; transform-origin:center center; will-change:transform; }
        .book-orbit::after { content:""; position:absolute; left:calc(var(--orbit-diameter) / -2); top:calc(var(--orbit-diameter) / -2); width:var(--orbit-diameter); height:var(--orbit-diameter); border-radius:50%; pointer-events:none; background:conic-gradient(from 205deg, transparent 0deg, transparent 44deg, rgba(98,205,255,.06) 58deg, rgba(255,255,255,.09) 72deg, rgba(227,131,255,.08) 86deg, transparent 104deg, transparent 360deg); mix-blend-mode:screen; filter:blur(16px); animation:chromaticOrbitLight 12s linear infinite; }
        .hero-page.hero-night .book-orbit::after { background:conic-gradient(from 205deg, transparent 0deg, transparent 44deg, rgba(98,205,255,.14) 58deg, rgba(203,218,255,.14) 72deg, rgba(165,131,255,.16) 86deg, transparent 104deg, transparent 360deg); }
        .book-stage.is-rotation-paused .book-orbit::after,.book-stage.is-rotation-paused .chromatic-sheen { animation-play-state:paused; }

        .orbit-item { --depth:.5; --hover-lift:0px; --hover-glow:0; --book-rotate-y:0deg; --book-rotate-x:0deg; --book-rotate-z:0deg; --sheen-position:50%; position:absolute; left:calc(var(--book-width)/-2); top:calc(var(--book-height)/-2); width:var(--book-width); height:var(--book-height); transform-style:preserve-3d; transform-origin:center; will-change:transform,filter,opacity; transition:filter 120ms ease; outline:none; cursor:pointer; }
        .orbit-item:focus-visible { filter:brightness(1.1) saturate(1.2) !important; }
        .orbit-item:hover { --hover-lift:-12px; filter:brightness(1.15) saturate(1.22) !important; }
        .book-3d {
          position:relative;
          width:100%;
          height:100%;
          transform-style:preserve-3d;
          transform:
            translateY(var(--hover-lift))
            rotateX(var(--book-rotate-x))
            rotateY(var(--book-rotate-y))
            rotateZ(var(--book-rotate-z));
          transition:transform 90ms cubic-bezier(.2,.8,.2,1);
          will-change:transform;
        }

        .book-face { position:absolute; top:50%; left:50%; display:block; backface-visibility:hidden; }
        .book-front,.book-back {
          width:var(--book-width);
          height:var(--book-height);
          overflow:hidden;
          border:1px solid color-mix(in srgb, var(--accent), #fff 45%);
          border-radius:3px 9px 9px 3px;
          background:#fff8dc;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.3),
            inset 8px 0 18px rgba(255,255,255,.1),
            0 12px 22px rgba(0,0,0,calc(.05 + var(--hover-glow) * .18)),
            0 0 28px color-mix(in srgb, var(--accent), transparent 78%);
          transition:box-shadow 240ms ease,filter 240ms ease;
        }
        .book-front { transform:translate(-50%,-50%) translateZ(calc(var(--book-depth)/2)); }
        .book-back { transform:translate(-50%,-50%) rotateY(180deg) translateZ(calc(var(--book-depth)/2)); filter:brightness(.62) saturate(.75); }
        .book-front img,.book-back img { display:block; width:100%; height:100%; object-fit:cover; user-select:none; }

        .cover-tint,.chromatic-sheen,.cover-edge,.cover-gloss { position:absolute; inset:0; pointer-events:none; }
        .cover-tint { background:var(--cover-tint); mix-blend-mode:color; }
        .cover-edge { box-shadow:inset 3px 0 4px rgba(52,26,0,.25),inset -1px 0 2px rgba(255,255,255,.44); }
        .cover-gloss {
          background:
            linear-gradient(108deg, transparent 31%, rgba(255,255,255,.26) 44%, rgba(255,255,255,.06) 53%, transparent 68%),
            radial-gradient(circle at 18% 10%, rgba(255,255,255,.34), transparent 32%);
          opacity:calc(.22 + var(--hover-glow) * .22);
          transform:translateX(calc(var(--sheen-position) * .06));
          mix-blend-mode:screen;
          transition:opacity 220ms ease;
        }
        .chromatic-sheen { inset:-20%; opacity:calc(.08 + var(--depth) * .44 + var(--hover-glow) * .24); background:linear-gradient(108deg, transparent 24%, rgba(255,193,91,.1) 34%, rgba(104,218,255,.18) 41%, rgba(255,255,255,.72) 48%, rgba(220,147,255,.2) 56%, rgba(255,214,105,.14) 63%, transparent 74%); transform:translateX(var(--sheen-position)) skewX(-8deg); mix-blend-mode:screen; filter:saturate(1.2) blur(.2px); animation:chromaticSweep 5.5s ease-in-out infinite; }

        .book-spine,.book-pages { width:var(--book-depth); height:var(--book-height); }
        .book-spine { display:grid; place-items:center; overflow:hidden; transform:translate(-50%,-50%) rotateY(-90deg) translateZ(calc(var(--book-width)/2)); border:1px solid rgba(255,235,148,.45); background:linear-gradient(90deg,#3e2604,var(--accent) 45%,#452803); }
        .book-spine span { color:rgba(255,251,218,.76); font-size:5px; font-weight:900; letter-spacing:.12em; writing-mode:vertical-rl; }
        .book-pages { transform:translate(-50%,-50%) rotateY(90deg) translateZ(calc(var(--book-width)/2)); border:1px solid #b9923d; background:repeating-linear-gradient(90deg,#fffbea 0 2px,#dacb9b 2px 3px); }
        .book-top,.book-bottom { width:var(--book-width); height:var(--book-depth); border:1px solid #b9923d; background:repeating-linear-gradient(0deg,#fffbed 0 2px,#d8c793 2px 3px); }
        .book-top { transform:translate(-50%,-50%) rotateX(90deg) translateZ(calc(var(--book-height)/2)); }
        .book-bottom { transform:translate(-50%,-50%) rotateX(-90deg) translateZ(calc(var(--book-height)/2)); }

        @keyframes pageAurora { from { transform:translateY(-18px) scale(1); opacity:.4; } to { transform:translateY(10px) scale(1.06); opacity:.72; } }
        @keyframes cardRise { 0%,100% { transform:perspective(950px) rotateX(0deg) rotateY(0deg) translateY(0); } 50% { transform:perspective(950px) rotateX(1.2deg) rotateY(-1.2deg) translateY(-3px); } }
        @keyframes brandPresence { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-1px); } }
        @keyframes linePulse { 0%,100% { width:92px; opacity:.72; } 50% { width:124px; opacity:1; } }
        @keyframes sheetBreath { 0%,100% { transform:translateZ(0) } 50% { transform:translateZ(4px) } }
        @keyframes paperModernFlow { 0%,100% { transform:perspective(1100px) rotateX(4deg) rotateY(-3deg) scale(.995); border-radius:50%; } 35% { transform:perspective(1100px) rotateX(1deg) rotateY(3deg) scale(1.01); border-radius:48% 52% 51% 49% / 50% 47% 53% 50%; } 68% { transform:perspective(1100px) rotateX(5deg) rotateY(1deg) scale(1.002); border-radius:52% 48% 49% 51% / 48% 52% 48% 52%; } }
        @keyframes paperAurora { 0%,100% { transform:translate3d(-8%,-4%,0) rotate(0deg) scale(1); opacity:.48; } 50% { transform:translate3d(8%,5%,0) rotate(18deg) scale(1.06); opacity:.66; } }
        @keyframes paperEdgeSlide { 0%,100% { opacity:.3; background-position:-80px 0,0 0; filter:blur(.5px); } 50% { opacity:.72; background-position:120px 0,26px 0; filter:blur(0); } }
        @keyframes paperEdgeBreathe { 0%,100% { opacity:.3; background-position:0 -70px,0 0; transform:translateX(0) scaleY(.96); } 50% { opacity:.66; background-position:0 120px,0 24px; transform:translateX(2px) scaleY(1.04); } }
        @keyframes paperCornerLiftInner { 0%,100% { opacity:.38; filter:blur(.2px); } 50% { opacity:.6; filter:blur(0); } }
        @keyframes paperLight { 0%,18% { transform:translateX(-52%); } 70%,100% { transform:translateX(48%); } }
        @keyframes haloPulse { 0%,100% { transform:translate(-50%,-50%) scale(.96); opacity:.44; } 50% { transform:translate(-50%,-50%) scale(1.03); opacity:.62; } }
        @keyframes chromaticOrbitLight { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes chromaticSweep { 0%,18% { transform:translateX(-130%) skewX(-8deg); } 58%,100% { transform:translateX(150%) skewX(-8deg); } }
        @keyframes beamSweep { 0%,18% { transform:translateX(-50%) rotate(-8deg) translateY(-10px); opacity:.08; } 45% { opacity:.5; } 70%,100% { transform:translateX(-50%) rotate(-8deg) translateY(12px); opacity:.12; } }

        @media (max-width:1100px) { .hero-inner { grid-template-columns:1fr; } .hero-copy { max-width:720px; } .book-stage { min-height:650px; } }
        @media (max-width:700px) {
          .gold-paper { padding:2rem 1.1rem; }
          .hero-inner { gap:1rem; min-height:auto; }
          .hero-copy { padding:2rem 1.35rem; border-radius:22px; }
          .book-stage { --book-width:82px; --book-height:120px; --book-depth:14px; min-height:520px; }
          .paper-stage { width:min(94%,430px); }
          .paper-corner { width:60px; height:60px; }
          .publisher-mark { font-size:clamp(1.55rem,6vw,2rem); line-height:1.12; letter-spacing:.08em; }
          .hero-intro-title { font-size:clamp(2rem,9vw,3rem); }
          .paper-curl-edge.paper-curl-top,
          .paper-curl-edge.paper-curl-bottom { height: 32px; }
          .paper-curl-edge.paper-curl-left,
          .paper-curl-edge.paper-curl-right { width: 24px; }
          .paper-corner-peel { width: 44px; height: 44px; }
        }
        @media (max-width:440px) {
          .publisher-mark { font-size:clamp(1.25rem,7.1vw,1.5rem); letter-spacing:.06em; line-height:1.14; }
          .publisher-tagline { font-size:.88rem; line-height:1.65; }
          .hero-copy h1 { font-size:clamp(2.25rem,10.4vw,3.15rem); }
          .hero-btn { width:100%; }
          .social-links { gap:.58rem; }
          .social-link { width:41px; height:41px; border-radius:14px; }
          .social-link svg { width:19px; height:19px; }
          .book-stage { --book-width:64px; --book-height:94px; --book-depth:11px; min-height:410px; }
          .paper-stage { width:min(98%,340px); }
          .paper-corner { width:46px; height:46px; }
          .hero-intro-title { font-size:clamp(1.85rem,10vw,2.5rem); }
          .hero-intro-kicker { font-size:.7rem; letter-spacing:.3em; }
          .paper-curl-edge.paper-curl-top,
          .paper-curl-edge.paper-curl-bottom { height: 24px; }
          .paper-curl-edge.paper-curl-left,
          .paper-curl-edge.paper-curl-right { width: 18px; }
          .paper-corner-peel { width: 36px; height: 36px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .hero-intro { display:none; }
          .hero-page::after,.hero-copy,.publisher-mark,.paper-stage,.paper-stage::before,.paper-edge,.paper-corner,.paper-fold,.paper-light,.book-stage::before,.book-orbit::after,.hero-copy h1::after,.chromatic-sheen,.energy-ring,.hero-light-beam,.gold-paper,.cinematic-vignette,.paper-tilt-surface > .gold-paper,.paper-tilt-surface::before,.paper-tilt-surface::after,
          .paper-edges-container, .paper-curl-edge, .paper-curl-highlight, .paper-corner-peel { animation:none; }
          .book-3d { transition:none; }
        }
      `}</style>

      <HeroFX />

      <PaperTiltEffect>
        <div className="gold-paper">
          <div className="hero-inner hero-paper-card">
            <div className="hero-copy">
              <div className="publisher-lockup">
                <span className="publisher-mark">VIJAYAM PUBLICATIONS</span>
                <p className="publisher-tagline">
                  One of the Major Notable Publishers in India, which is Aiming to Publish Good Academic Books in Nursing &amp; Degree.
                </p>
              </div>

              <div className="eyebrow">Built for the next generation of nurses</div>

              <h1>
                Academic knowledge.
                <span className="brand">Beautifully published.</span>
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
                    className={`social-link social-${social.name}`} 
                    href={social.href} 
                    aria-label={social.label} 
                    title={social.label} 
                    data-cursor-label={social.label}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={social.name}
                  >
                    <SocialIcon name={social.name} />
                  </a>
                ))}
              </div>
            </div>

            <BookOrbit firstVisit={showIntro} />
          </div>
        </div>
      </PaperTiltEffect>
    </section>
  );
}