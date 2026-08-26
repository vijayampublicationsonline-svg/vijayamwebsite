"use client";

import {
  JSX,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

const coverImage = "/images/book-pbbsc.jpg";
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
  { id: 1, image: coverImage, title: "P.B.B.Sc Nursing Book 1", accent: "#d9a928", tint: "rgba(255, 220, 116, .12)" },
  { id: 2, image: coverImage, title: "P.B.B.Sc Nursing Book 2", accent: "#bd8351", tint: "rgba(226, 151, 112, .13)" },
  { id: 3, image: coverImage, title: "P.B.B.Sc Nursing Book 3", accent: "#78999b", tint: "rgba(114, 183, 177, .13)" },
  { id: 4, image: coverImage, title: "P.B.B.Sc Nursing Book 4", accent: "#8b75a1", tint: "rgba(164, 132, 197, .12)" },
  { id: 5, image: coverImage, title: "P.B.B.Sc Nursing Book 5", accent: "#a96c73", tint: "rgba(213, 111, 127, .12)" },
  { id: 6, image: coverImage, title: "P.B.B.Sc Nursing Book 6", accent: "#789260", tint: "rgba(136, 178, 105, .13)" },
  { id: 7, image: coverImage, title: "P.B.B.Sc Nursing Book 7", accent: "#bd914e", tint: "rgba(225, 179, 92, .13)" },
  { id: 8, image: coverImage, title: "P.B.B.Sc Nursing Book 8", accent: "#5f829f", tint: "rgba(94, 151, 194, .13)" },
   { id: 9, image: coverImage, title: "P.B.B.Sc Nursing Book 9", accent: "#5f829f", tint: "rgba(33, 141, 223, 0.13)" },
];

const socialLinks: SocialLink[] = [
  { name: "instagram", href: "https://www.instagram.com/vijayampublications", label: "Instagram" },
  { name: "facebook", href: "https://www.facebook.com/profile.php?id=100087234593363", label: "Facebook" },
  { name: "twitter", href: "https://twitter.com/Vijayambooks", label: "Twitter" },
  { name: "medium", href: "https://medium.com/@vijayampublicationsonline", label: "Medium" },
  { name: "youtube", href: "https://medium.com/@vijayampublicationsonline", label: "YouTube" },
];

const easeOutCubic = (value: number) => {
  const clamped = Math.max(0, Math.min(1, value));
  return 1 - Math.pow(1 - clamped, 3);
};

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    instagram: <><path d="M7.8 2.7h8.4a5.1 5.1 0 0 1 5.1 5.1v8.4a5.1 5.1 0 0 1-5.1 5.1H7.8a5.1 5.1 0 0 1-5.1-5.1V7.8a5.1 5.1 0 0 1 5.1-5.1Zm0 1.9a3.2 3.2 0 0 0-3.2 3.2v8.4a3.2 3.2 0 0 0 3.2 3.2h8.4a3.2 3.2 0 0 0 3.2-3.2V7.8a3.2 3.2 0 0 0-3.2-3.2H7.8Z" /><path d="M12 7.45A4.55 4.55 0 1 1 12 16.55 4.55 4.55 0 0 1 12 7.45Zm0 1.9A2.65 2.65 0 1 0 12 14.65 2.65 2.65 0 0 0 12 9.35Z" /><path d="M16.78 6.55a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16Z" /></>,
    facebook: <path d="M14.2 22v-8.1h2.72l.41-3.15H14.2V8.74c0-.91.25-1.53 1.56-1.53h1.67V4.39A22.4 22.4 0 0 0 15 4.27c-2.41 0-4.06 1.47-4.06 4.17v2.31H8.2v3.15h2.74V22h3.26Z" />,
    twitter: <path d="M18.9 3.8h3.05l-6.66 7.61 7.83 10.79h-6.13l-4.8-6.53-5.5 6.53H3.64l7.12-8.15L3.25 3.8h6.29l4.34 5.95 5.02-5.95Zm-1.07 16.5h1.69L8.61 5.6H6.79l11.04 14.7Z" />,
    medium: <path d="M13.72 12c0 3.12-2.5 5.65-5.58 5.65S2.56 15.12 2.56 12s2.5-5.65 5.58-5.65 5.58 2.53 5.58 5.65Zm6.12 0c0 2.93-1.25 5.3-2.8 5.3s-2.8-2.37-2.8-5.3 1.25-5.3 2.8-5.3 2.8 2.37 2.8 5.3Zm2.52 0c0 2.62-.44 4.75-.99 4.75s-.99-2.13-.99-4.75.44-4.75.99-4.75.99 2.13.99 4.75Z" />,
    youtube: <path d="M21.6 7.2a2.75 2.75 0 0 0-1.94-1.95C17.95 4.8 12 4.8 12 4.8s-5.95 0-7.66.45A2.75 2.75 0 0 0 2.4 7.2 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .4 4.8 2.75 2.75 0 0 0 1.94 1.95c1.71.45 7.66.45 7.66.45s5.95 0 7.66-.45a2.75 2.75 0 0 0 1.94-1.95A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" />,
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

    const particles = Array.from({ length: 52 }).map((_, i) => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: 0.5 + Math.random() * 1.9,
      s: 0.00018 + Math.random() * 0.00095,
      p: i * 0.21,
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

      const grad = ctx.createRadialGradient(
        w * (0.34 + mouseX * 0.16),
        h * (0.22 + mouseY * 0.1),
        30,
        w * 0.56,
        h * 0.58,
        Math.max(w, h) * 0.76
      );

      if (dark) {
        grad.addColorStop(0, "rgba(130,108,255,.2)");
        grad.addColorStop(0.42, "rgba(84,199,255,.12)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      } else {
        grad.addColorStop(0, "rgba(255,219,153,.2)");
        grad.addColorStop(0.44, "rgba(255,237,179,.11)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.s * (0.74 + p.z);
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }
        const x = (p.x + Math.sin(t * 0.0022 + p.p) * 0.009 + (mouseX - 0.5) * 0.02) * w;
        const y = p.y * h + Math.cos(t * 0.0016 + p.p) * 4 + (mouseY - 0.5) * 6;
        const rr = p.r * (0.72 + p.z * 0.92);
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, TAU);
        ctx.fillStyle = dark ? `rgba(169,214,255,${0.08 + p.z * 0.24})` : `rgba(180,112,36,${0.06 + p.z * 0.18})`;
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

function Book3D({ book, index, onTogglePause }: { book: Book; index: number; onTogglePause: () => void }) {
  return (
    <div
      className="orbit-item"
      data-book-index={index}
      style={{ "--accent": book.accent, "--cover-tint": book.tint } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={`${book.title}. Click to pause or resume book rotation.`}
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

function BookOrbit() {
  const stageRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const bookRefs = useRef<HTMLElement[]>([]);
  const frameRef = useRef<number | null>(null);
  const cursorCoreRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorSubRingRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLCanvasElement>(null);

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
    const trail = cursorTrailRef.current;
    if (!stage || !orbit || !trail) return;
    const tctx = trail.getContext("2d", { alpha: true });
    if (!tctx) return;

    let tw = 0;
    let th = 0;
    let tdpr = Math.min(window.devicePixelRatio || 1, 2);
    const trailDots = Array.from({ length: 8 }).map(() => ({ x: 0, y: 0, a: 0 }));

    bookRefs.current = Array.from(stage.querySelectorAll<HTMLElement>(".orbit-item"));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resizeTrail = () => {
      tw = trail.clientWidth;
      th = trail.clientHeight;
      tdpr = Math.min(window.devicePixelRatio || 1, 2);
      trail.width = Math.max(1, Math.floor(tw * tdpr));
      trail.height = Math.max(1, Math.floor(th * tdpr));
      tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
    };

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

    const render = (time: number) => {
      const rect = stage.getBoundingClientRect();
      const compact = rect.width < 520;
      const tablet = rect.width < 920;
      const safeSize = Math.min(rect.width, rect.height);

      const maximumRadius = compact ? Math.min(safeSize * 0.36, 126) : tablet ? Math.min(safeSize * 0.38, 196) : Math.min(safeSize * 0.39, 276);
      const depthRadius = compact ? 64 : tablet ? 92 : 126;

      const delta = Math.min(40, previousTimeRef.current ? time - previousTimeRef.current : 16.67);
      previousTimeRef.current = time;
      const ds = delta / 16.67;

      if (visibleRef.current && !reducedMotionRef.current) {
        introRef.current = Math.min(1, introRef.current + delta / 2300);
        heroRevealRef.current = Math.min(1, heroRevealRef.current + delta / 1500);
        if (introRef.current >= 0.7 && !pausedRef.current) {
          rotationRef.current = (rotationRef.current + delta * 0.000036) % 1;
        }
      }

      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * (0.055 * ds);
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * (0.055 * ds);
      scrollRef.current.value += (scrollRef.current.target - scrollRef.current.value) * (0.04 * ds);
      pointerRef.current.rx += (pointerRef.current.px - pointerRef.current.rx) * 0.18;
      pointerRef.current.ry += (pointerRef.current.py - pointerRef.current.ry) * 0.18;

      themeFlashRef.current += (0 - themeFlashRef.current) * 0.045;
      stage.style.setProperty("--theme-flash", String(themeFlashRef.current.toFixed(3)));

      const reduced = reducedMotionRef.current;
      const pointerX = reduced ? 0 : pointerRef.current.x;
      const pointerY = reduced ? 0 : pointerRef.current.y;
      const scroll = reduced ? 0 : scrollRef.current.value;
      const intro = reduced ? 1 : introRef.current;
      const reveal = easeOutCubic(Math.max(0, Math.min(1, (intro - 0.62) / 0.38)));
      const centerReveal = easeOutCubic(Math.max(0, Math.min(1, intro / 0.32)));
      const contentReveal = easeOutCubic(Math.max(0, Math.min(1, (heroRevealRef.current - 0.74) / 0.26)));

      stage.style.setProperty("--hero-reveal", String(contentReveal.toFixed(3)));
      stage.style.setProperty("--center-focus", String((1 - reveal).toFixed(3)));

      const guide = stage.querySelector<HTMLElement>(".orbit-guide");
      stage.style.setProperty("--orbit-diameter", `${maximumRadius * 2}px`);

      if (guide) {
        guide.style.opacity = String(0.03 + reveal * 0.2);
        guide.style.transform = `translate(-50%, -50%) scale(${0.2 + reveal * 0.8}) rotate(${rotationRef.current * 360}deg)`;
      }

      const ctaBias = hoveredCTARef.current ? 0.74 : 1;
      orbit.style.transform = `
        rotateX(${(pointerY * -3.4 + scroll * 1.1 + Math.cos(time * 0.00018) * 0.36) * ctaBias}deg)
        rotateY(${(pointerX * 5.2 + scroll * 0.9 + Math.sin(time * 0.00016) * 0.44) * ctaBias}deg)
      `;

      if (!reduced && pointerRef.current.active && cursorCoreRef.current && cursorRingRef.current && cursorSubRingRef.current) {
        const tx = pointerRef.current.rx;
        const ty = pointerRef.current.ry;
        const hoverBook = hoveredBookRef.current !== null;
        const hoverCTA = hoveredCTARef.current !== null;
        const ringSize = hoverBook ? 30 : hoverCTA ? 24 : 18;
        const baseScale = hoverBook ? 1.06 : hoverCTA ? 1.02 : 0.96;

        cursorCoreRef.current.style.transform = `translate3d(${tx - 2.5}px, ${ty - 2.5}px, 0) scale(${baseScale})`;
        cursorRingRef.current.style.width = `${ringSize}px`;
        cursorRingRef.current.style.height = `${ringSize}px`;
        cursorRingRef.current.style.transform = `translate3d(${tx - ringSize / 2}px, ${ty - ringSize / 2}px, 0) scale(${hoverBook ? 1.03 : 1})`;
        cursorSubRingRef.current.style.transform = `translate3d(${tx - 7}px, ${ty - 7}px, 0) scale(${hoverBook || hoverCTA ? 1.06 : 1})`;

        cursorCoreRef.current.style.opacity = "1";
        cursorRingRef.current.style.opacity = hoverBook || hoverCTA ? ".72" : ".25";
        cursorSubRingRef.current.style.opacity = hoverBook || hoverCTA ? ".48" : ".16";
        stage.classList.toggle("cursor-book-hover", hoverBook);

        for (let i = trailDots.length - 1; i > 0; i--) {
          trailDots[i].x += (trailDots[i - 1].x - trailDots[i].x) * 0.22;
          trailDots[i].y += (trailDots[i - 1].y - trailDots[i].y) * 0.22;
          trailDots[i].a = Math.max(0, trailDots[i - 1].a - 0.09);
        }
        trailDots[0].x = tx;
        trailDots[0].y = ty;
        trailDots[0].a = hoverBook || hoverCTA ? 0.11 : 0.05;

        tctx.clearRect(0, 0, tw, th);
        for (let i = trailDots.length - 1; i >= 0; i--) {
          const d = trailDots[i];
          if (d.a <= 0.004) continue;
          tctx.beginPath();
          tctx.arc(d.x, d.y, 1 + (trailDots.length - i) * 0.1, 0, TAU);
          tctx.fillStyle = document.documentElement.classList.contains("dark")
            ? `rgba(154,206,255,${d.a})`
            : `rgba(199,140,48,${d.a})`;
          tctx.fill();
        }
      } else {
        if (cursorCoreRef.current) cursorCoreRef.current.style.opacity = "0";
        if (cursorRingRef.current) cursorRingRef.current.style.opacity = "0";
        if (cursorSubRingRef.current) cursorSubRingRef.current.style.opacity = "0";
        tctx.clearRect(0, 0, tw, th);
        stage.classList.remove("cursor-book-hover");
      }

      const centerIdx = 0;
      const centerZ = (1 - centerReveal) * -580;
      const centerScale = 0.62 + centerReveal * 0.5;

      bookRefs.current.forEach((element, index) => {
        const phase = (index / books.length) * TAU;
        const isCenter = index === centerIdx;

        const emergenceDelay = isCenter ? 0 : 0.38 + (index - 1) * 0.07;
        const emergeProgress = isCenter
          ? centerReveal
          : easeOutCubic(Math.max(0, Math.min(1, (intro - emergenceDelay) / 0.27)));

        const baseAngle = phase - Math.PI / 2;
        const orbitAngle = baseAngle + rotationRef.current * TAU;
        const targetX = Math.cos(orbitAngle) * maximumRadius;
        const targetY = Math.sin(orbitAngle) * maximumRadius * 0.82;
        const targetZ = Math.sin(orbitAngle) * depthRadius;

        const curvedX = Math.cos(baseAngle + Math.PI * 0.45) * (maximumRadius * 0.24);
        const curvedY = Math.sin(baseAngle + Math.PI * 0.7) * (maximumRadius * 0.3);

        let x = 0;
        let y = -8;
        let z = centerZ;
        let depthNorm = 1;

        if (!isCenter) {
          const spawnX = curvedX * (1 - emergeProgress);
          const spawnY = curvedY * (1 - emergeProgress) - (1 - emergeProgress) * 46;
          const spawnZ = -460 - index * 36;
          x = spawnX + targetX * emergeProgress;
          y = spawnY + targetY * emergeProgress;
          z = spawnZ * (1 - emergeProgress) + targetZ * emergeProgress;
          depthNorm = (Math.sin(orbitAngle) + 1) / 2;
        }

        const micro = Math.sin(time * 0.00065 + phase * 1.7) * (isCenter ? 3.2 : 4.4);
        const microY = Math.cos(time * 0.00078 + phase * 1.3) * (isCenter ? 2.4 : 3.8);

        const hover = hoveredBookRef.current === index;
        const crowdCalm = hoveredBookRef.current !== null && hoveredBookRef.current !== index ? 0.92 : 1;
        const sideDefocus = hoveredBookRef.current !== null && hoveredBookRef.current !== index ? -4 : 0;

        const pointerDepth = isCenter ? 0.8 : (0.65 + depthNorm * 0.55);
        x += micro + pointerX * 5.2 * pointerDepth + sideDefocus;
        y += microY + pointerY * 3.9 * pointerDepth - (hover ? 14 : 0);
        z += hover ? 36 : 0;

        const scale = isCenter
          ? centerScale + (hover ? 0.08 : 0)
          : ((compact ? 0.62 : tablet ? 0.74 : 0.86) + depthNorm * 0.22 + (hover ? 0.11 : 0)) * crowdCalm;

        const opacity = isCenter ? Math.max(0.1, centerReveal) : Math.max(0, emergeProgress);
        const chromaBoost = hover ? 0.22 : 0;

        element.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        element.style.zIndex = String(isCenter ? 3000 : Math.round(depthNorm * 900) + (hover ? 1200 : 0));
        element.style.opacity = String(opacity);
        element.style.filter = `brightness(${0.82 + depthNorm * 0.34 + chromaBoost}) saturate(${0.94 + depthNorm * 0.26 + chromaBoost})`;

        element.style.setProperty("--book-rotate-y", `${Math.cos(orbitAngle) * -18 + pointerX * 4.2 + Math.sin(time * 0.00062 + phase) * 1.6}deg`);
        element.style.setProperty("--book-rotate-x", `${Math.sin(orbitAngle) * 2.6 + pointerY * -2.3 + Math.cos(time * 0.00058 + phase) * 1.2}deg`);
        element.style.setProperty("--book-rotate-z", `${Math.cos(orbitAngle) * 1.4 + Math.sin(time * 0.00052 + phase) * 0.8}deg`);
        element.style.setProperty("--depth", depthNorm.toFixed(3));
        element.style.setProperty("--sheen-position", `${132 - depthNorm * 122 + Math.cos(orbitAngle) * 16 + rotationRef.current * 42}%`);
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

    resizeTrail();
    updateMotionPreference();
    updateScroll();
    observer.observe(stage);
    motionQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("resize", resizeTrail);
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    window.addEventListener("vp:theme-change", onTheme);
    frameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("resize", resizeTrail);
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

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    pointerRef.current.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerRef.current.px = event.clientX - rect.left;
    pointerRef.current.py = event.clientY - rect.top;
    pointerRef.current.active = true;
  };

  const handlePointerLeave = () => {
    pointerRef.current.targetX = 0;
    pointerRef.current.targetY = 0;
    pointerRef.current.active = false;
    hoveredBookRef.current = null;
    hoveredCTARef.current = null;
  };

  return (
    <div ref={stageRef} className="book-stage" aria-label="Animated 3D rotating book collection" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <canvas ref={cursorTrailRef} className="orbit-cursor-trail" aria-hidden="true" />
      <div ref={cursorCoreRef} className="orbit-cursor-core" aria-hidden="true" />
      <div ref={cursorRingRef} className="orbit-cursor-ring" aria-hidden="true"><span>EXPLORE</span></div>
      <div ref={cursorSubRingRef} className="orbit-cursor-sub-ring" aria-hidden="true" />
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
      <div className="orbit-guide" aria-hidden="true" />
      <div ref={orbitRef} className="book-orbit">
        {books.map((book, index) => <Book3D book={book} index={index} key={book.id} onTogglePause={toggleOrbitPause} />)}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [isDark, setIsDark] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTarget = useRef({ x: -100, y: -100, tx: -100, ty: -100, visible: false });

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
    const page = pageRef.current;
    const cursor = cursorRef.current;
    if (!page || !cursor) return;

    let raf = 0;
    let pressed = false;

    const animateCursor = () => {
      const c = cursorTarget.current;
      c.x += (c.tx - c.x) * 0.16;
      c.y += (c.ty - c.y) * 0.16;
      cursor.style.transform = `translate3d(${c.x - 27}px, ${c.y - 27}px, 0)`;
      cursor.classList.toggle("is-visible", c.visible);
      raf = requestAnimationFrame(animateCursor);
    };

    const move = (event: PointerEvent) => {
      const rect = page.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      cursorTarget.current.tx = event.clientX;
      cursorTarget.current.ty = event.clientY;
      cursorTarget.current.visible = inside && event.pointerType !== "touch";
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const edgeX = x < .18 || x > .82;
      const edgeY = y < .16 || y > .84;
      if (pressed && (edgeX || edgeY)) {
        const tiltY = (x - .5) * -9;
        const tiltX = (y - .5) * 7;
        page.style.setProperty("--page-tilt-x", `${tiltX.toFixed(2)}deg`);
        page.style.setProperty("--page-tilt-y", `${tiltY.toFixed(2)}deg`);
      }
      const target = event.target as HTMLElement | null;
      cursor.classList.toggle("is-interactive", !!target?.closest("a,button,input,[role='button']"));
    };

    const down = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = page.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (x < .18 || x > .82 || y < .16 || y > .84) {
        pressed = true;
        page.classList.add("edge-tilting");
        page.setPointerCapture?.(event.pointerId);
      }
    };

    const up = () => {
      pressed = false;
      page.classList.remove("edge-tilting");
      page.style.setProperty("--page-tilt-x", "0deg");
      page.style.setProperty("--page-tilt-y", "0deg");
    };

    window.addEventListener("pointermove", move, { passive: true });
    page.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    raf = requestAnimationFrame(animateCursor);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      page.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section ref={pageRef} className={`hero-page ${isDark ? "hero-night" : "hero-light"}`}>
      <div ref={cursorRef} className="hero-premium-cursor" aria-hidden="true"><span className="hero-cursor-core" /><span className="hero-cursor-label">MOVE • EXPLORE</span></div>
      <div className="hero-intro" aria-hidden="true"><div className="hero-intro-content"><span className="hero-intro-kicker">Vijayam Publications</span><strong className="hero-intro-title">Enter the world<br/>of knowledge</strong><span className="hero-intro-line" /></div></div>
      <style>{`
        * { box-sizing: border-box; }
        .hero-page { --ink:#261b08; --muted:#6f4d12; --hero-reveal:0; --center-focus:0; min-height:100vh; position:relative; overflow:hidden; color:var(--ink); font-family:Inter,ui-sans-serif,system-ui,sans-serif; transition:color 700ms ease,background 1000ms cubic-bezier(.2,.8,.2,1),filter 1000ms ease; background:radial-gradient(circle at 72% 35%, rgba(255,255,245,1), transparent 25%),radial-gradient(circle at 16% 22%, rgba(255,214,97,.3), transparent 28%),radial-gradient(circle at 22% 78%, rgba(244,178,68,.2), transparent 34%),linear-gradient(135deg,#f5df99 0%,#fff6cc 38%,#fffdf0 68%,#e9c35e 100%); }
        .hero-page.hero-night { --ink:#f6edd6; --muted:#d8c9a9; background:radial-gradient(circle at 75% 30%, rgba(98,74,209,.3), transparent 30%),radial-gradient(circle at 15% 22%, rgba(47,161,214,.2), transparent 34%),radial-gradient(circle at 22% 78%, rgba(123,84,189,.18), transparent 36%),linear-gradient(140deg,#06070e 0%,#0d1020 42%,#121427 72%,#1b1a2e 100%); }

        .hero-intro { position:absolute; inset:0; z-index:100; display:grid; place-items:center; pointer-events:none; overflow:hidden; background:radial-gradient(circle at 50% 50%, rgba(255,255,245,.98) 0%, rgba(255,241,188,.94) 32%, rgba(255,222,119,.72) 58%, rgba(31,18,2,.98) 100%); animation:heroIntroOut 2.15s cubic-bezier(.76,0,.18,1) forwards; }
        .hero-intro::before { content:""; position:absolute; width:42vmin; height:42vmin; border-radius:50%; border:1px solid rgba(255,255,255,.72); box-shadow:0 0 0 1px rgba(211,164,57,.22),0 0 90px rgba(255,213,107,.46),inset 0 0 80px rgba(255,255,255,.32); animation:introPortal 1.8s cubic-bezier(.2,.75,.15,1) forwards; }
        .hero-intro::after { content:""; position:absolute; inset:-20%; background:linear-gradient(105deg, transparent 38%, rgba(255,255,255,.92) 49%, rgba(255,218,118,.55) 52%, transparent 62%); transform:translateX(-70%) skewX(-12deg); animation:introLightSweep 1.45s .22s cubic-bezier(.2,.8,.2,1) forwards; }
        .hero-intro-content { position:relative; z-index:2; display:grid; justify-items:center; gap:.7rem; text-align:center; transform:translateY(12px); animation:introContent 1.45s .12s cubic-bezier(.2,.8,.2,1) forwards; }
        .hero-intro-kicker { color:#6c4705; font-size:.68rem; font-weight:900; letter-spacing:.34em; text-transform:uppercase; }
        .hero-intro-title { color:#251703; font-size:clamp(2rem,5vw,5.5rem); font-weight:950; letter-spacing:-.07em; line-height:.9; text-transform:uppercase; text-shadow:0 12px 40px rgba(85,53,2,.16); }
        .hero-intro-line { width:110px; height:1px; background:linear-gradient(90deg,transparent,#9a690e,#fff0b2,transparent); transform:scaleX(0); animation:introLine 1.1s .35s ease forwards; }
        .hero-page.hero-night .hero-intro { background:radial-gradient(circle at 50% 50%, rgba(29,35,66,.98), rgba(8,10,20,.96) 52%, #03040a 100%); }
        .hero-page.hero-night .hero-intro-kicker { color:#a9c8ff; }
        .hero-page.hero-night .hero-intro-title { color:#eff5ff; }
        .hero-page { cursor:none; }
        .hero-page a,.hero-page button,.hero-page input { cursor:none; }
        .hero-premium-cursor { position:fixed; left:0; top:0; z-index:9999; width:54px; height:54px; pointer-events:none; opacity:0; transform:translate3d(-100px,-100px,0); transition:opacity .25s ease; mix-blend-mode:normal; }
        .hero-premium-cursor.is-visible { opacity:1; }
        .hero-premium-cursor::before { content:""; position:absolute; inset:8px; border-radius:50%; background:radial-gradient(circle at 34% 28%, rgba(255,255,255,.96) 0 5%, rgba(255,228,150,.72) 18%, rgba(188,126,22,.32) 42%, rgba(58,31,1,.08) 68%, transparent 72%); border:1px solid rgba(255,240,187,.82); box-shadow:0 0 0 1px rgba(153,100,11,.28),0 8px 28px rgba(91,55,4,.2),inset 0 0 18px rgba(255,255,255,.5); transform:translateZ(20px) rotateX(58deg) rotateZ(-8deg); }
        .hero-premium-cursor::after { content:""; position:absolute; inset:0; border:1px solid rgba(126,81,4,.28); border-radius:50%; transform:rotateX(58deg) rotateZ(45deg); box-shadow:inset 0 0 0 6px rgba(255,255,255,.06); animation:cursorOrbit 2.8s linear infinite; }
        .hero-cursor-core { position:absolute; left:50%; top:50%; width:5px; height:5px; border-radius:50%; background:#fffdf0; box-shadow:0 0 12px 3px rgba(255,220,119,.9); transform:translate(-50%,-50%); }
        .hero-cursor-label { position:absolute; left:50%; top:calc(100% + 8px); transform:translateX(-50%); white-space:nowrap; padding:.28rem .55rem; border:1px solid rgba(145,95,7,.2); border-radius:999px; background:rgba(255,251,232,.78); backdrop-filter:blur(10px); color:#6b4705; font-size:8px; font-weight:900; letter-spacing:.16em; opacity:0; transition:opacity .2s ease; }
        .hero-premium-cursor.is-interactive .hero-cursor-label { opacity:1; }
        .hero-page.hero-night .hero-premium-cursor::before { background:radial-gradient(circle at 34% 28%, rgba(255,255,255,.96), rgba(159,208,255,.62) 22%, rgba(96,119,255,.26) 46%, transparent 72%); border-color:rgba(195,223,255,.8); box-shadow:0 0 0 1px rgba(111,147,255,.3),0 8px 30px rgba(48,76,165,.28),inset 0 0 18px rgba(255,255,255,.28); }
        .hero-page.hero-night .hero-premium-cursor::after { border-color:rgba(160,198,255,.32); }
        .hero-page.hero-night .hero-cursor-label { background:rgba(15,22,44,.78); color:#bcd7ff; border-color:rgba(145,177,255,.24); }
        .hero-page.edge-tilting .gold-paper { transform:perspective(1800px) rotateX(var(--page-tilt-x,0deg)) rotateY(var(--page-tilt-y,0deg)) translateZ(6px) scale(.997); animation:none; }
        .hero-page.edge-tilting::after { opacity:.85; }
        @keyframes heroIntroOut { 0%,68% { opacity:1; visibility:visible; } 100% { opacity:0; visibility:hidden; } }
        @keyframes introPortal { 0% { transform:scale(.12); opacity:0; } 35% { opacity:1; } 100% { transform:scale(2.7); opacity:0; } }
        @keyframes introLightSweep { 0% { transform:translateX(-75%) skewX(-12deg); opacity:0; } 22% { opacity:1; } 100% { transform:translateX(75%) skewX(-12deg); opacity:0; } }
        @keyframes introContent { 0% { opacity:0; transform:translateY(24px) scale(.94); filter:blur(12px); } 100% { opacity:1; transform:translateY(0) scale(1); filter:blur(0); } }
        @keyframes introLine { to { transform:scaleX(1); } }
        @keyframes cursorOrbit { to { transform:rotateX(58deg) rotateZ(405deg); } }

        .hero-fx-canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:0; opacity:.86; transition:opacity 700ms ease; }
        .hero-page::before,.hero-page::after { content:""; position:absolute; inset:0; pointer-events:none; transition:opacity 700ms ease,filter 700ms ease; }
        .hero-page::before { background:repeating-linear-gradient(90deg, rgba(91,59,5,.02) 0 1px, transparent 1px 34px),repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 1px, transparent 1px 32px); z-index:0; }
        .hero-page.hero-night::before { opacity:.34; }
        .hero-page::after { opacity:.58; background:radial-gradient(circle at 48% 0%, rgba(255,255,255,.62), transparent 22%),conic-gradient(from 180deg at 50% 0%, transparent, rgba(255,228,132,.28), transparent, rgba(255,255,255,.2), transparent); filter:blur(20px); animation:pageAurora 8s ease-in-out infinite alternate; z-index:0; }
        .hero-page.hero-night::after { opacity:.76; background:radial-gradient(circle at 48% 0%, rgba(171,200,255,.3), transparent 25%),conic-gradient(from 200deg at 50% 0%, transparent, rgba(141,104,255,.3), transparent, rgba(97,210,255,.16), transparent); filter:blur(24px) saturate(1.1); }

        .gold-paper { position:relative; z-index:1; min-height:100vh; padding:clamp(3.2rem,5vw,5rem) 5vw 4rem; transform-style:preserve-3d; animation:sheetBreath 9s ease-in-out infinite; background:linear-gradient(90deg, rgba(255,255,255,.45), transparent 14%, transparent 88%, rgba(255,255,255,.28)),radial-gradient(circle at 50% 4%, rgba(255,255,255,.52), transparent 30%),repeating-linear-gradient(112deg, rgba(183,134,34,.028) 0 1px, transparent 1px 22px),linear-gradient(135deg, rgba(255,252,231,.92), rgba(252,235,183,.28) 52%, rgba(255,251,231,.75)); transition:background 900ms cubic-bezier(.2,.8,.2,1); }
        .hero-page.hero-night .gold-paper { background:linear-gradient(90deg, rgba(255,255,255,.03), transparent 14%, transparent 88%, rgba(255,255,255,.025)),radial-gradient(circle at 50% 4%, rgba(141,164,255,.14), transparent 32%),repeating-linear-gradient(112deg, rgba(124,132,255,.03) 0 1px, transparent 1px 24px),linear-gradient(135deg, rgba(13,16,31,.7), rgba(23,26,49,.42) 52%, rgba(15,18,35,.68)); }

        .hero-inner { width:min(1500px,100%); min-height:calc(100vh - 7rem); margin:0 auto; display:grid; grid-template-columns:minmax(0,.82fr) minmax(560px,1.18fr); align-items:center; gap:clamp(2.4rem,4.5vw,5.5rem); }
        .hero-copy { position:relative; z-index:20; max-width:610px; padding:clamp(2.2rem,3.8vw,3.85rem); border:1px solid rgba(183,134,34,.18); border-left:3px solid rgba(189,130,20,.5); border-radius:32px; transform-style:preserve-3d; backdrop-filter:blur(16px); animation:cardRise 6.5s ease-in-out infinite; opacity:calc(.72 + var(--hero-reveal) * .28); transform:translateY(calc((1 - var(--hero-reveal)) * 18px)); transition:opacity .7s ease,transform .7s ease,background 800ms ease,border-color 700ms ease,box-shadow 700ms ease; background:radial-gradient(circle at 15% 5%, rgba(255,255,255,.8), transparent 28%),linear-gradient(135deg, rgba(255,253,239,.78), rgba(255,248,216,.26)),linear-gradient(90deg, rgba(255,250,226,.58), rgba(255,248,216,.05)); box-shadow:0 24px 60px rgba(104,68,6,.1),0 0 0 6px rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.7); }
        .hero-page.hero-night .hero-copy { border-color:rgba(120,132,255,.24); border-left-color:rgba(112,190,255,.48); background:radial-gradient(circle at 15% 5%, rgba(199,214,255,.14), transparent 28%),linear-gradient(135deg, rgba(24,29,53,.65), rgba(24,36,67,.34)),linear-gradient(90deg, rgba(21,26,45,.52), rgba(19,24,43,.15)); box-shadow:0 26px 65px rgba(4,7,18,.44),0 0 0 1px rgba(154,171,255,.14),inset 0 1px 0 rgba(255,255,255,.06); }

        .publisher-lockup { display:block; margin-bottom:1.45rem; }
        .publisher-mark { display:block; color:transparent; font-size:clamp(1.95rem,2.75vw,3rem); font-weight:950; letter-spacing:.1em; line-height:1.1; text-transform:uppercase; white-space:normal; word-break:keep-all; overflow-wrap:normal; background:linear-gradient(92deg,#3b2301 0%,#9b6405 32%,#d99b22 58%,#4f3102 100%); -webkit-background-clip:text; background-clip:text; text-shadow:0 10px 26px rgba(111,70,5,.12); animation:brandPresence 5s ease-in-out infinite; transition:background 700ms ease; }
        .hero-page.hero-night .publisher-mark { background:linear-gradient(92deg,#e8eaff 0%,#97b0ff 30%,#78d8ff 60%,#d7d7ff 100%); -webkit-background-clip:text; background-clip:text; }
        .publisher-tagline { max-width:520px; margin:1rem 0 0; color:rgba(91,58,4,.78); font-size:clamp(.94rem,1.08vw,1.08rem); font-weight:750; line-height:1.75; letter-spacing:.01em; transition:color 700ms ease; }
        .hero-page.hero-night .publisher-tagline { color:rgba(223,227,244,.82); }
        .eyebrow { display:inline-flex; margin-bottom:1.05rem; color:#7b5105; font-size:.72rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; transition:color 700ms ease; }
        .hero-page.hero-night .eyebrow { color:#bfd4ff; }
        .hero-copy h1 { margin:0; max-width:620px; font-size:clamp(2.65rem,4.35vw,5rem); line-height:.94; letter-spacing:-.065em; text-transform:uppercase; text-wrap:balance; }
        .hero-copy h1::after { content:""; display:block; width:92px; height:2px; margin-top:1.35rem; border-radius:999px; background:linear-gradient(90deg,#7d5307,#eac25d,transparent); opacity:.86; animation:linePulse 2.6s ease-in-out infinite; transition:background 700ms ease; }
        .hero-page.hero-night .hero-copy h1::after { background:linear-gradient(90deg,#8cb2ff,#7ce1ff,transparent); }
        .brand { display:block; margin-top:.2em; color:#684505; transition:color 700ms ease; }
        .hero-page.hero-night .brand { color:#dbe4ff; }
        .hero-copy p.hero-description { max-width:470px; margin:1.35rem 0 0; color:var(--muted); font-size:clamp(.96rem,1.12vw,1.08rem); line-height:1.7; font-weight:650; }

        .hero-actions { display:flex; flex-wrap:wrap; gap:1rem; margin-top:1.9rem; perspective:850px; }
        .hero-btn { position:relative; display:inline-flex; align-items:center; justify-content:center; gap:.65rem; min-height:52px; padding:.86rem 1.35rem; border-radius:999px; text-decoration:none; font-size:.82rem; font-weight:950; letter-spacing:.05em; overflow:hidden; isolation:isolate; transform-style:preserve-3d; transition:transform 280ms cubic-bezier(.2,.8,.2,1),box-shadow 280ms ease,color 700ms ease,background 700ms ease,border-color 700ms ease; }
        .hero-btn::before { content:""; position:absolute; inset:-2px; z-index:-1; background:linear-gradient(115deg, transparent 18%, rgba(255,255,255,.4) 48%, transparent 74%); transform:translateX(-135%) rotate(8deg); transition:transform 650ms cubic-bezier(.2,.8,.2,1); }
        .hero-btn::after { content:"↗"; display:grid; place-items:center; width:24px; height:24px; border-radius:50%; font-size:.72rem; transform:translateZ(18px); transition:transform 260ms ease; }
        .hero-btn:hover { transform:translateY(-6px) rotateX(8deg) rotateY(-7deg) translateZ(10px); }
        .hero-btn:hover::before { transform:translateX(135%) rotate(8deg); }
        .hero-btn:hover::after { transform:translate(3px,-3px) translateZ(20px); }
        .hero-btn.primary { color:#fff9df; background:linear-gradient(135deg,#2d1b02 0%,#76500b 52%,#b9811e 100%); border:1px solid rgba(255,224,133,.35); box-shadow:0 14px 32px rgba(71,43,2,.2),0 6px 0 rgba(74,45,4,.15),inset 0 1px 0 rgba(255,255,255,.18); }
        .hero-page.hero-night .hero-btn.primary { color:#ecf5ff; background:linear-gradient(135deg,#1c2345 0%,#243a7a 52%,#2f5c9d 100%); border-color:rgba(147,197,255,.35); box-shadow:0 16px 36px rgba(5,10,25,.4),0 6px 0 rgba(5,10,25,.3),inset 0 1px 0 rgba(255,255,255,.14); }
        .hero-btn.primary::after { background:rgba(255,244,193,.12); border:1px solid rgba(255,244,193,.2); }
        .hero-page.hero-night .hero-btn.primary::after { background:rgba(171,214,255,.16); border-color:rgba(171,214,255,.24); }
        .hero-btn.secondary { color:#563803; border:1px solid rgba(121,81,8,.24); background:rgba(255,252,232,.62); box-shadow:0 10px 22px rgba(99,65,5,.08),0 5px 0 rgba(153,108,25,.1),inset 0 1px 0 rgba(255,255,255,.62); backdrop-filter:blur(12px); }
        .hero-page.hero-night .hero-btn.secondary { color:#dce8ff; border-color:rgba(153,178,255,.28); background:rgba(25,31,58,.66); box-shadow:0 10px 22px rgba(7,10,25,.28),0 5px 0 rgba(7,10,25,.34),inset 0 1px 0 rgba(255,255,255,.08); }
        .hero-btn.secondary::after { content:"→"; background:rgba(181,135,36,.08); border:1px solid rgba(181,135,36,.16); }
        .hero-page.hero-night .hero-btn.secondary::after { background:rgba(146,196,255,.12); border-color:rgba(146,196,255,.2); }

        .social-links { display:flex; flex-wrap:wrap; gap:.78rem; margin-top:1.75rem; align-items:center; }
        .social-link { --social-a:#7a5007; --social-b:#d8a332; --social-glow:rgba(216,163,50,.2); position:relative; display:grid; place-items:center; width:46px; height:46px; border-radius:16px; color:#fff; border:1px solid rgba(255,255,255,.3); background:radial-gradient(circle at 28% 18%, rgba(255,255,255,.72), transparent 25%),linear-gradient(135deg,var(--social-a),var(--social-b)); box-shadow:0 12px 24px var(--social-glow),0 8px 16px rgba(83,52,2,.1),inset 0 1px 0 rgba(255,255,255,.4),inset 0 -8px 14px rgba(0,0,0,.1); overflow:hidden; isolation:isolate; transition:transform 260ms cubic-bezier(.2,.8,.2,1),border-radius 260ms ease,box-shadow 260ms ease,filter 260ms ease; }
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
        .hero-light-beam { position:absolute; z-index:1; width:min(74%,580px); height:42%; top:28%; left:50%; transform:translateX(-50%) rotate(-8deg); pointer-events:none; background:linear-gradient(100deg, transparent 34%, rgba(255,255,255,.22) 47%, rgba(255,198,105,.16) 51%, transparent 64%); filter:blur(12px); opacity:calc(.12 + var(--theme-flash) * .35 + var(--center-focus) * .28); animation:beamSweep 7.2s ease-in-out infinite; }
        .hero-page.hero-night .hero-light-beam { background:linear-gradient(100deg, transparent 34%, rgba(171,214,255,.2) 47%, rgba(165,131,255,.18) 51%, transparent 64%); }
        .energy-ring { position:absolute; width:min(74%,560px); aspect-ratio:1; border-radius:50%; z-index:1; pointer-events:none; filter:blur(1px); background:conic-gradient(from 10deg, rgba(255,231,156,.04), rgba(255,178,63,.1), rgba(103,204,255,.1), rgba(221,143,255,.09), rgba(255,231,156,.04)); box-shadow:0 0 44px rgba(234,176,64,.16), inset 0 0 36px rgba(255,244,199,.1); opacity:calc(.35 + (1 - var(--center-focus)) * .55); animation:chromaticOrbitLight 13s linear infinite; }
        .hero-page.hero-night .energy-ring { background:conic-gradient(from 10deg, rgba(152,195,255,.06), rgba(114,146,255,.14), rgba(78,219,255,.13), rgba(173,117,255,.12), rgba(152,195,255,.06)); box-shadow:0 0 52px rgba(117,152,255,.2), inset 0 0 38px rgba(163,194,255,.08); }

        .orbit-cursor-trail { position:absolute; inset:0; pointer-events:none; z-index:3; }
        .orbit-cursor-core,.orbit-cursor-ring,.orbit-cursor-sub-ring { position:absolute; left:0; top:0; pointer-events:none; opacity:0; z-index:4; will-change:transform,opacity; transition:opacity .2s ease; }
        .orbit-cursor-core { width:5px; height:5px; border-radius:999px; background:radial-gradient(circle at 35% 35%, rgba(255,255,255,.95), rgba(255,215,136,.7)); box-shadow:0 0 8px rgba(255,214,126,.24); }
        .hero-page.hero-night .orbit-cursor-core { background:radial-gradient(circle at 35% 35%, rgba(235,245,255,.92), rgba(144,198,255,.7)); box-shadow:0 0 9px rgba(137,196,255,.26); }
        .orbit-cursor-ring { width:18px; height:18px; border-radius:999px; border:1px solid rgba(184,124,24,.28); box-shadow:inset 0 0 10px rgba(255,214,122,.06),0 0 10px rgba(235,170,69,.08); backdrop-filter:blur(3px); display:grid; place-items:center; }
        .orbit-cursor-ring span { font-size:7px; letter-spacing:.12em; font-weight:700; opacity:0; transform:scale(.92); transition:opacity .2s ease,transform .2s ease; color:rgba(82,54,5,.92); }
        .book-stage.cursor-book-hover .orbit-cursor-ring span { opacity:.88; transform:scale(1); }
        .hero-page.hero-night .orbit-cursor-ring { border-color:rgba(156,210,255,.34); box-shadow:inset 0 0 10px rgba(183,220,255,.06),0 0 10px rgba(137,146,255,.1); }
        .hero-page.hero-night .orbit-cursor-ring span { color:rgba(221,236,255,.92); }
        .orbit-cursor-sub-ring { width:14px; height:14px; border-radius:999px; border:1px solid rgba(220,173,86,.18); }
        .hero-page.hero-night .orbit-cursor-sub-ring { border-color:rgba(166,208,255,.18); }

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
        .paper-corner { position:absolute; z-index:3; width:82px; height:82px; border-radius:18px 70px 22px 70px; pointer-events:none; opacity:.42; background:radial-gradient(circle at 25% 25%, rgba(255,255,255,.76), transparent 36%),linear-gradient(135deg, rgba(255,255,255,.38), rgba(229,184,75,.1), transparent 72%); box-shadow:inset 8px 8px 14px rgba(255,255,255,.4),inset -10px -10px 18px rgba(137,91,12,.06),0 12px 24px rgba(107,69,8,.08); animation:paperCornerLift 6.5s ease-in-out infinite; }
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

        .orbit-item { --depth:.5; --hover-lift:0px; --hover-glow:0; --book-rotate-y:0deg; --book-rotate-x:0deg; --book-rotate-z:0deg; --sheen-position:50%; position:absolute; left:calc(var(--book-width)/-2); top:calc(var(--book-height)/-2); width:var(--book-width); height:var(--book-height); transform-style:preserve-3d; transform-origin:center; will-change:transform,filter,opacity; transition:filter 180ms ease; outline:none; }
        .orbit-item:focus-visible { filter:brightness(1.08) saturate(1.15) !important; }
        .orbit-item:hover { --hover-lift:-10px; filter:brightness(1.1) saturate(1.16) !important; }
        .book-3d { position:relative; width:100%; height:100%; transform-style:preserve-3d; transform:translateY(var(--hover-lift)) rotateX(var(--book-rotate-x)) rotateY(var(--book-rotate-y)) rotateZ(var(--book-rotate-z)); transition:transform 80ms linear; }

        .book-face { position:absolute; top:50%; left:50%; display:block; backface-visibility:hidden; }
        .book-front,.book-back { width:var(--book-width); height:var(--book-height); overflow:hidden; border:1px solid color-mix(in srgb, var(--accent), #fff 45%); border-radius:2px 7px 7px 2px; background:#fff8dc; box-shadow:inset 0 0 0 1px rgba(255,255,255,.3),inset 8px 0 18px rgba(255,255,255,.1),0 12px 22px rgba(0,0,0,calc(.05 + var(--hover-glow) * .18)); }
        .book-front { transform:translate(-50%,-50%) translateZ(calc(var(--book-depth)/2)); }
        .book-back { transform:translate(-50%,-50%) rotateY(180deg) translateZ(calc(var(--book-depth)/2)); filter:brightness(.62) saturate(.75); }
        .book-front img,.book-back img { display:block; width:100%; height:100%; object-fit:cover; user-select:none; }

        .cover-tint,.chromatic-sheen,.cover-edge,.cover-gloss { position:absolute; inset:0; pointer-events:none; }
        .cover-tint { background:var(--cover-tint); mix-blend-mode:color; }
        .cover-edge { box-shadow:inset 3px 0 4px rgba(52,26,0,.25),inset -1px 0 2px rgba(255,255,255,.44); }
        .cover-gloss { background:linear-gradient(108deg, transparent 34%, rgba(255,255,255,.18) 44%, rgba(255,255,255,.04) 54%, transparent 66%); opacity:calc(.22 + var(--hover-glow) * .22); transform:translateX(calc(var(--sheen-position) * .06)); }
        .chromatic-sheen { inset:-20%; opacity:calc(.08 + var(--depth) * .44 + var(--hover-glow) * .24); background:linear-gradient(108deg, transparent 24%, rgba(255,193,91,.1) 34%, rgba(104,218,255,.18) 41%, rgba(255,255,255,.72) 48%, rgba(220,147,255,.2) 56%, rgba(255,214,105,.14) 63%, transparent 74%); transform:translateX(var(--sheen-position)) skewX(-8deg); mix-blend-mode:screen; filter:saturate(1.2) blur(.2px); animation:chromaticSweep 6.8s ease-in-out infinite; }

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
        @keyframes paperCornerLift { 0%,100% { opacity:.38; filter:blur(.2px); } 50% { opacity:.6; filter:blur(0); } }
        @keyframes paperLight { 0%,18% { transform:translateX(-52%); } 70%,100% { transform:translateX(48%); } }
        @keyframes haloPulse { 0%,100% { transform:translate(-50%,-50%) scale(.96); opacity:.44; } 50% { transform:translate(-50%,-50%) scale(1.03); opacity:.62; } }
        @keyframes chromaticOrbitLight { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes chromaticSweep { 0%,20% { transform:translateX(-120%) skewX(-8deg); } 60%,100% { transform:translateX(140%) skewX(-8deg); } }
        @keyframes beamSweep { 0%,18% { transform:translateX(-50%) rotate(-8deg) translateY(-10px); opacity:.08; } 45% { opacity:.5; } 70%,100% { transform:translateX(-50%) rotate(-8deg) translateY(12px); opacity:.12; } }

        @media (max-width:1100px) { .hero-inner { grid-template-columns:1fr; } .hero-copy { max-width:720px; } .book-stage { min-height:650px; } }
        @media (max-width:700px) {
          .hero-page { cursor:auto; }
          .hero-page a,.hero-page button,.hero-page input { cursor:auto; }
          .hero-premium-cursor { display:none; }
          .gold-paper { padding:2rem 1.1rem; }
          .hero-inner { gap:1rem; min-height:auto; }
          .hero-copy { padding:2rem 1.35rem; border-radius:22px; }
          .book-stage { --book-width:82px; --book-height:120px; --book-depth:14px; min-height:520px; }
          .paper-stage { width:min(94%,430px); }
          .paper-corner { width:60px; height:60px; }
          .orbit-cursor-core,.orbit-cursor-ring,.orbit-cursor-sub-ring,.orbit-cursor-trail { display:none; }
          .publisher-mark { font-size:clamp(1.55rem,6vw,2rem); line-height:1.12; letter-spacing:.08em; }
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
        }
        @media (prefers-reduced-motion:reduce) {
          .hero-intro { display:none; }
          .hero-page { cursor:auto; }
          .hero-page a,.hero-page button,.hero-page input { cursor:auto; }
          .hero-premium-cursor { display:none; }
          .hero-page::after,.hero-copy,.publisher-mark,.paper-stage,.paper-stage::before,.paper-edge,.paper-corner,.paper-light,.book-stage::before,.book-orbit::after,.hero-copy h1::after,.chromatic-sheen,.energy-ring,.hero-light-beam,.gold-paper { animation:none; }
          .book-3d { transition:none; }
          .orbit-cursor-core,.orbit-cursor-ring,.orbit-cursor-sub-ring,.orbit-cursor-trail { display:none; }
        }
      `}</style>

      <HeroFX />

      <div className="gold-paper">
        <div className="hero-inner">
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
              Sharp concepts. Beautiful books. Smarter preparation for nursing students, educators and tomorrow’s healthcare professionals.
            </p>

            <div className="hero-actions" aria-label="Hero actions">
              <a className="hero-btn primary" href="#shop">Shop</a>
              <a className="hero-btn secondary" href="#categories">Browse Categories</a>
            </div>

            <div className="social-links" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a className={`social-link social-${social.name}`} href={social.href} aria-label={social.label} title={social.label} target="_blank" rel="noopener noreferrer" key={social.name}>
                  <SocialIcon name={social.name} />
                </a>
              ))}
            </div>
          </div>

          <BookOrbit />
        </div>
      </div>
    </section>
  );
}