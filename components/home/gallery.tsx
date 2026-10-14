"use client";

import React, { useEffect, useMemo, useState } from "react";

type Category = "OUR BOOKS" | "OUR PEOPLE" | "BEHIND THE PAGES" | "OUR JOURNEY";

type GalleryItem = {
  id: number;
  title: string;
  caption: string;
  category: Category;
  image: string;
  layout: "hero" | "tall" | "wide" | "standard";
};

const galleryItems: GalleryItem[] = [
  {
    id: 13,
    title: "Our MD — Chairperson & CEO",
    caption: "A guiding pillar of Vijayam Publications.",
    category: "OUR PEOPLE",
    image: "/images/mdsir.jpeg",
    layout: "hero",
  },
  {
    id: 11,
    title: "VC Sir",
    caption: "Vice Chancellor, Dr. NTR University of Health Sciences.",
    category: "OUR PEOPLE",
    image: "/images/vcsir.jpeg",
    layout: "hero",
  },
  {
    id: 14,
    title: "Special Moments — I",
    caption: "",
    category: "OUR JOURNEY",
    image: "/images/fel.jpeg",
    layout: "standard",
  },
  {
    id: 15,
    title: "Special Moments — II",
    caption: "",
    category: "OUR JOURNEY",
    image: "/images/fel2.jpeg",
    layout: "standard",
  },
  {
    id: 12,
    title: "Our Workspace",
    caption: "The space behind every page.",
    category: "BEHIND THE PAGES",
    image: "/images/ofc.jpeg",
    layout: "tall",
  },
  {
    id: 1,
    title: "Annual Highlights",
    caption: "Moments from our annual celebrations.",
    category: "OUR JOURNEY",
    image: "/images/annual.jpeg",
    layout: "wide",
  },
  {
    id: 2,
    title: "Presentation Highlights",
    caption: "Ideas shared with our team.",
    category: "OUR JOURNEY",
    image: "/images/ppt.jpeg",
    layout: "standard",
  },
  {
    id: 3,
    title: "Annual Day Moments",
    caption: "Celebrating together.",
    category: "OUR JOURNEY",
    image: "/images/annualday.jpeg",
    layout: "standard",
  },
  {
    id: 4,
    title: "Anniversary Celebration",
    caption: "Another milestone in our journey.",
    category: "OUR JOURNEY",
    image: "/images/anniversary.jpeg",
    layout: "standard",
  },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hasLightbox = activeIndex !== null;
  const activeItem = useMemo(
    () => (activeIndex === null ? null : galleryItems[activeIndex]),
    [activeIndex]
  );

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const goPrev = () =>
    setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + galleryItems.length) % galleryItems.length));
  const goNext = () =>
    setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % galleryItems.length));

  useEffect(() => {
    if (!hasLightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasLightbox]);

  return (
    <section id="gallery" className="vijayam-gallery" aria-label="Inside Vijayam">
      <style>{`
        .vijayam-gallery{
          --ivory:#f8f4ea;
          --cream:#fffaf1;
          --burgundy:#5a1f2f;
          --wine:#7a3a4a;
          --gold:#b08b57;
          --charcoal:#2a2523;
          --muted:#6b625e;
          --border:rgba(90,31,47,.16);
          --shadow:0 12px 32px rgba(42,37,35,.09);
          --overlay:linear-gradient(180deg, transparent 38%, rgba(22,18,17,.22) 62%, rgba(22,18,17,.82) 100%);

          box-sizing:border-box;
          width:100%;
          padding:clamp(64px,8vw,120px) clamp(20px,5vw,80px);
          background:
            radial-gradient(1200px 360px at 12% -10%, rgba(176,139,87,.08), transparent 55%),
            radial-gradient(900px 340px at 90% 0%, rgba(122,58,74,.08), transparent 52%),
            linear-gradient(180deg, var(--ivory), var(--cream));
          color:var(--charcoal);
          flex:0 0 auto;
        }

        .vijayam-gallery *,.vijayam-gallery *::before,.vijayam-gallery *::after{box-sizing:border-box}

        .vg-shell{
          max-width:1260px;
          margin:0 auto;
        }

        .vg-head{
          text-align:center;
          max-width:800px;
          margin:0 auto 28px;
          opacity:0;
          transform:translateY(18px);
          animation:vgReveal .65s ease forwards;
        }

        .vg-kicker{
          display:inline-block;
          font-size:12px;
          letter-spacing:.22em;
          color:var(--wine);
          border:1px solid var(--border);
          padding:7px 12px;
          border-radius:999px;
          margin-bottom:14px;
          background:#fff8f0;
          box-shadow:0 6px 18px rgba(90,31,47,.08);
        }

        .vg-head h2{
          margin:0;
          font-size:clamp(30px,4.2vw,52px);
          letter-spacing:.02em;
          color:var(--burgundy);
          font-weight:700;
        }

        .vg-head .sub{
          margin:10px 0 0;
          font-size:16px;
          color:var(--muted);
        }

        .vg-grid{
          display:grid;
          grid-template-columns:repeat(12,minmax(0,1fr));
          gap:20px;
          perspective:1800px;
        }

        .vg-item{
          --rx:0deg;
          --ry:0deg;
          --mx:50%;
          --my:50%;
          position:relative;
          overflow:hidden;
          border-radius:14px;
          border:1px solid var(--border);
          box-shadow:var(--shadow);
          background:#efe7dd;
          cursor:pointer;
          min-height:260px;
          opacity:0;
          transform:translateY(24px) translateZ(0);
          animation:vgReveal .7s ease forwards;
          transform-style:preserve-3d;
          transition:
            transform .45s cubic-bezier(.22,.61,.36,1),
            box-shadow .45s ease,
            border-color .35s ease,
            filter .35s ease;
          will-change:transform;
          isolation:isolate;
        }

        .vg-item::before{
          content:"";
          position:absolute;
          inset:-1px;
          border-radius:14px;
          background:
            radial-gradient(circle at var(--mx) var(--my), rgba(255,245,224,.32), transparent 42%),
            linear-gradient(120deg, rgba(255,242,220,.22), rgba(176,139,87,.14), rgba(90,31,47,.18));
          opacity:0;
          transition:opacity .4s ease;
          pointer-events:none;
          z-index:1;
        }

        .vg-item::after{
          content:"";
          position:absolute;
          top:-120%;
          left:-35%;
          width:40%;
          height:320%;
          background:linear-gradient(90deg, transparent, rgba(255,248,235,.34), transparent);
          transform:rotate(20deg) translateX(0);
          transition:transform .9s ease, opacity .5s ease;
          opacity:0;
          pointer-events:none;
          z-index:2;
        }

        .vg-depth{
          position:absolute;
          inset:0;
          background:
            radial-gradient(60% 50% at 50% 100%, rgba(176,139,87,.24), transparent 70%),
            radial-gradient(48% 42% at var(--mx) var(--my), rgba(255,241,219,.14), transparent 68%),
            linear-gradient(180deg, transparent 35%, rgba(22,18,17,.14) 100%);
          opacity:0;
          transition:opacity .35s ease;
          z-index:1;
          pointer-events:none;
        }

        .vg-item:nth-child(1){animation-delay:.05s}
        .vg-item:nth-child(2){animation-delay:.12s}
        .vg-item:nth-child(3){animation-delay:.18s}
        .vg-item:nth-child(4){animation-delay:.24s}
        .vg-item:nth-child(5){animation-delay:.30s}
        .vg-item:nth-child(6){animation-delay:.36s}
        .vg-item:nth-child(7){animation-delay:.42s}
        .vg-item:nth-child(8){animation-delay:.48s}
        .vg-item:nth-child(9){animation-delay:.54s}
        .vg-item:nth-child(10){animation-delay:.60s}
        .vg-item:nth-child(11){animation-delay:.66s}
        .vg-item:nth-child(12){animation-delay:.72s}

        .vg-item.hero{grid-column:span 8; grid-row:span 2; min-height:620px;}
        .vg-item.standard{grid-column:span 4; min-height:300px;}
        .vg-item.tall{grid-column:span 4; grid-row:span 2; min-height:620px;}
        .vg-item.wide{grid-column:span 8; min-height:300px;}

        .vg-item img{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:transform .75s cubic-bezier(.22,.61,.36,1), filter .45s ease;
          transform:translateZ(0) scale(1.02);
          animation:vgKenBurns 12s ease-in-out infinite alternate;
        }

        .vg-overlay{
          position:absolute;
          inset:0;
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
          padding:18px;
          background:var(--overlay);
          opacity:0;
          transition:opacity .35s ease;
          z-index:3;
          transform:translateZ(24px);
        }

        .vg-cat{
          align-self:flex-start;
          font-size:11px;
          letter-spacing:.14em;
          color:#f5ede4;
          background:rgba(90,31,47,.72);
          border:1px solid rgba(255,245,233,.35);
          border-radius:999px;
          padding:6px 10px;
          margin-bottom:10px;
        }

        .vg-title{
          margin:0;
          color:#fff7ec;
          font-size:21px;
          font-weight:600;
        }

        .vg-caption{
          margin:6px 0 0;
          color:#f5e6d4;
          font-size:14px;
        }

        .vg-item:hover{
          transform:
            translateY(-12px)
            rotateX(var(--rx))
            rotateY(var(--ry))
            scale(1.013);
          box-shadow:
            0 30px 58px rgba(42,37,35,.26),
            0 12px 26px rgba(90,31,47,.13),
            0 2px 0 rgba(176,139,87,.24),
            0 0 0 1px rgba(176,139,87,.1) inset;
          border-color:rgba(176,139,87,.44);
          filter:saturate(1.05);
        }
        .vg-item:hover img{
          transform:scale(1.08) translateZ(30px);
          filter:saturate(1.12) contrast(1.08);
        }
        .vg-item:hover .vg-overlay{opacity:1}
        .vg-item:hover::before{opacity:1}
        .vg-item:hover::after{
          opacity:1;
          transform:rotate(20deg) translateX(320%);
        }
        .vg-item:hover .vg-depth{opacity:1}

        .vg-lightbox{
          position:fixed;
          inset:0;
          z-index:9999;
          background:rgba(22,18,17,.88);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
          animation:vgFade .28s ease;
          backdrop-filter:blur(3px);
        }

        .vg-panel{
          width:min(1060px,94vw);
          max-height:92vh;
          border-radius:14px;
          overflow:hidden;
          background:#1f1a19;
          border:1px solid rgba(255,232,204,.18);
          box-shadow:0 22px 50px rgba(0,0,0,.38);
          transform:scale(.96) translateY(10px);
          animation:vgScale .3s cubic-bezier(.22,.61,.36,1) forwards;
        }

        .vg-figure{
          position:relative;
          background:#181413;
        }

        .vg-figure img{
          width:100%;
          max-height:76vh;
          object-fit:contain;
          display:block;
          background:#181413;
          animation:vgLightboxIn .35s ease;
        }

        .vg-meta{
          padding:14px 16px 16px;
          color:#f2e7da;
          background:#241f1d;
        }

        .vg-meta strong{
          display:inline-block;
          color:#ffe6bf;
          font-size:11px;
          letter-spacing:.14em;
          margin-bottom:8px;
        }

        .vg-meta h4{
          margin:0;
          font-size:20px;
          color:#fff4e3;
        }

        .vg-meta p{
          margin:6px 0 0;
          color:#dfcdb8;
          font-size:14px;
        }

        .vg-close,.vg-nav{
          position:absolute;
          border:1px solid rgba(255,230,191,.35);
          background:rgba(45,35,32,.72);
          color:#fff6e9;
          width:42px;height:42px;
          border-radius:999px;
          cursor:pointer;
          font-size:18px;
          transition:transform .2s ease, background .2s ease;
        }
        .vg-close:hover,.vg-nav:hover{
          transform:scale(1.05);
          background:rgba(72,56,49,.88);
        }

        .vg-close{top:14px;right:14px}
        .vg-nav.left{left:14px;top:50%;transform:translateY(-50%)}
        .vg-nav.right{right:14px;top:50%;transform:translateY(-50%)}
        .vg-nav.left:hover,.vg-nav.right:hover{transform:translateY(-50%) scale(1.05)}

        /* Editorial details and a deliberately placed, gap-free collage. */
        .vg-shell{max-width:1320px}
        .vg-head{
          max-width:900px;
          margin-bottom:clamp(32px,4vw,60px);
          transform:none;
          translate:0 18px;
        }
        .vg-kicker{
          background:transparent;
          border:0;
          box-shadow:none;
          padding:0;
          font-weight:600;
          font-size:10px;
          letter-spacing:.3em;
          margin-bottom:20px;
        }
        .vg-head h2{
          font-family:Georgia,"Times New Roman",serif;
          font-size:clamp(40px,5.8vw,76px);
          font-weight:400;
          line-height:1.08;
          letter-spacing:-.045em;
        }
        .vg-head .sub{line-height:1.7;margin-top:18px}
        .vg-collection{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          margin-bottom:24px;
          padding:18px 0;
          border-top:1px solid var(--border);
          border-bottom:1px solid var(--border);
          color:var(--wine);
          font-size:10px;
          letter-spacing:.2em;
          text-transform:uppercase;
        }
        .vg-collection span:last-child{color:var(--muted);letter-spacing:.1em}
        .vg-grid{grid-auto-rows:240px;gap:24px}
        .vg-grid .vg-item{min-height:0;padding:0;border-radius:20px;translate:0 24px;transform:none}
        .vg-item::before{border-radius:inherit}
        .vg-item img{animation:none;transform:scale(1.01)}
        .vg-overlay{padding:26px;opacity:1;transform:none}
        .vg-title{font-family:Georgia,"Times New Roman",serif;font-size:25px;font-weight:400;line-height:1.15}
        .vg-cat{font-size:9px;letter-spacing:.18em;background:rgba(255,255,255,.12);backdrop-filter:blur(8px)}
        .vg-caption{line-height:1.5;font-size:12px;opacity:.85}
        .vg-index{
          position:absolute;top:20px;left:20px;z-index:4;
          display:grid;place-items:center;width:36px;height:36px;
          border:1px solid rgba(255,255,255,.35);border-radius:50%;
          background:rgba(22,18,17,.25);backdrop-filter:blur(10px);
          color:#fffaf1;font-size:10px;letter-spacing:.08em;
        }
        .vg-item.hero .vg-title{font-size:clamp(28px,3vw,42px)}
        .vg-item:focus-visible{outline:3px solid var(--gold);outline-offset:5px}
        .vg-item:hover{transform:translateY(-6px) rotateX(var(--rx)) rotateY(var(--ry));z-index:5}
        .vg-item:focus-visible img{transform:scale(1.06)}
        .vg-panel{overflow-y:auto}

        @keyframes vgReveal{to{opacity:1;translate:0 0}}
        @keyframes vgFade{from{opacity:0}to{opacity:1}}
        @keyframes vgScale{to{transform:scale(1) translateY(0)}}
        @keyframes vgLightboxIn{from{opacity:.7;transform:scale(.985)}to{opacity:1;transform:scale(1)}}
        @keyframes vgKenBurns{from{transform:scale(1.02)}to{transform:scale(1.08)}}

        .vg-grid{
          grid-template-columns:repeat(12,minmax(0,1fr));
          grid-template-rows:220px 220px 300px 300px 320px;
          grid-template-areas:
            "md md md md md md vc vc vc vc vc vc"
            "md md md md md md vc vc vc vc vc vc"
            "fel fel fel fel fel2 fel2 fel2 fel2 office office office office"
            "annual annual annual annual annual annual annual annual office office office office"
            "ppt ppt ppt ppt day day day day anniversary anniversary anniversary anniversary";
          gap:clamp(18px,2vw,28px);
          align-items:stretch;
        }
        .vg-grid .vg-item{grid-column:auto;grid-row:auto;border-radius:12px;background:var(--cream)}
        .vg-grid .vg-item:nth-child(1){grid-area:md}
        .vg-grid .vg-item:nth-child(2){grid-area:vc}
        .vg-grid .vg-item:nth-child(3){grid-area:fel}
        .vg-grid .vg-item:nth-child(4){grid-area:fel2}
        .vg-grid .vg-item:nth-child(5){grid-area:office}
        .vg-grid .vg-item:nth-child(6){grid-area:annual}
        .vg-grid .vg-item:nth-child(7){grid-area:ppt}
        .vg-grid .vg-item:nth-child(8){grid-area:day}
        .vg-grid .vg-item:nth-child(9){grid-area:anniversary}
        .vg-item img{
          inset:0 0 auto;
          height:calc(100% - 124px);
          transform:none;
          object-position:center;
        }
        .vg-item.hero img{object-position:center 25%}
        .vg-overlay{
          inset:auto 0 0;
          height:124px;
          padding:18px 22px;
          justify-content:center;
          background:var(--cream);
          border-top:1px solid var(--border);
          opacity:1;
        }
        .vg-cat{
          color:var(--wine);background:none;border:0;border-radius:0;
          padding:0;margin-bottom:8px;font-weight:600;font-size:10px;
          backdrop-filter:none;letter-spacing:.16em;
        }
        .vg-title{color:var(--burgundy);font-size:23px;line-height:1.2}
        .vg-item.hero .vg-title{font-size:clamp(24px,2.3vw,32px)}
        .vg-item.hero .vg-overlay{height:160px}
        .vg-item.hero img{height:calc(100% - 160px)}
        .vg-caption{color:var(--muted);opacity:1;font-size:13px;line-height:1.5}
        .vg-index{background:rgba(22,18,17,.65);width:32px;height:32px;top:16px;left:16px}
        .vg-item::after,.vg-depth{display:none}
        .vg-item::before{
          display:block;
          background:radial-gradient(circle at var(--mx) var(--my), rgba(255,245,224,.22), transparent 55%);
          z-index:2;
        }
        .vg-grid .vg-item{
          transform-style:flat;
          transition:transform .3s ease-out, box-shadow .35s ease, border-color .35s ease;
        }
        .vg-grid .vg-item:focus-visible{
          box-shadow:0 20px 40px rgba(90,31,47,.14);
        }
        .vg-item:focus-visible img{transform:scale(1.025);filter:none}
        @media (hover:hover) and (pointer:fine){
          .vg-grid .vg-item:hover{
            transform:translateY(-5px) rotateX(var(--rx)) rotateY(var(--ry));
            filter:none;
            border-color:rgba(176,139,87,.5);
            box-shadow:0 20px 40px rgba(90,31,47,.14);
            z-index:5;
          }
          .vg-item:hover img{transform:scale(1.025);filter:none}
        }
        @media (hover:none){
          .vg-grid .vg-item:hover{transform:none;filter:none}
          .vg-item:hover img{transform:none;filter:none}
          .vg-item:hover::before{opacity:0}
        }
        .vg-collection{font-size:11px;line-height:1.6}
        .vg-head::after{
          content:"";display:block;width:60px;height:2px;
          background:var(--gold);margin:26px auto 0;
        }
        .vg-note{
          display:flex;justify-content:space-between;gap:16px;
          margin-top:24px;padding-top:18px;border-top:1px solid var(--border);
          font-size:12px;line-height:1.6;color:var(--muted);
        }
        .vg-note span:first-child{color:var(--wine)}
        .vg-close,.vg-nav{z-index:2}
        .vg-close:focus-visible,.vg-nav:focus-visible{outline:3px solid var(--gold);outline-offset:3px}

        @media (max-width:1024px){
          .vg-grid{gap:18px;grid-template-rows:190px 190px 300px 300px 320px}
          .vg-overlay{padding:16px}
          .vg-title{font-size:21px}
        }
        @media (max-width:820px){
          .vijayam-gallery{padding:64px 24px}
          .vg-grid{
            grid-template-columns:repeat(2,minmax(0,1fr));
            grid-template-rows:440px 320px 400px 320px 320px;
            grid-template-areas:"md vc" "fel fel2" "office annual" "ppt day" "anniversary anniversary";
          }
          .vg-item.hero .vg-title{font-size:25px}
        }
        @media (max-width:620px){
          .vijayam-gallery{padding:56px 18px}
          .vg-head{margin-bottom:30px}
          .vg-head .sub{font-size:15px}
          .vg-grid{
            grid-template-columns:minmax(0,1fr);
            grid-template-rows:460px 460px repeat(7,360px);
            grid-template-areas:"md" "vc" "fel" "fel2" "office" "annual" "ppt" "day" "anniversary";
            gap:20px;
          }
          .vg-overlay{padding:18px 20px}
          .vg-collection,.vg-note{flex-direction:column;align-items:flex-start;gap:6px}
          .vg-collection{font-size:10px;letter-spacing:.12em}
          .vg-panel{width:96vw}
          .vg-nav{width:38px;height:38px}
        }

        @media (prefers-reduced-motion: reduce){
          .vg-head,.vg-item{opacity:1;translate:none !important}
          .vg-item,.vg-item img,.vg-item::after,.vg-item::before,.vg-depth{transition:none !important}
          .vg-head,.vg-item,.vg-panel,.vg-lightbox,.vg-item img,.vg-figure img{
            animation:none !important;
            transition:none !important;
            transform:none !important;
          }
          .vg-item:hover img{transform:none}
          .vg-overlay{transition:none}
          .vg-item::after,.vg-item::before{display:none}
        }
      `}</style>

      <div className="vg-shell">
        <header className="vg-head">
          <span className="vg-kicker">THE VIJAYAM CHRONICLES</span>
          <h2>Inside Vijayam</h2>
          <p className="sub">The people, celebrations and little moments behind every page.</p>
        </header>

        <div className="vg-collection">
          <span>Our journey, in frames</span>
          <span>{String(galleryItems.length).padStart(2, "0")} moments · Explore the collection</span>
        </div>

        <div className="vg-grid">
          {galleryItems.map((item, index) => (
            <article
              key={item.id}
              className={`vg-item ${item.layout}`}
              role="button"
              tabIndex={0}
              onClick={() => openLightbox(index)}
              onPointerMove={(event) => {
                if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                const card = event.currentTarget;
                const bounds = card.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
                const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
                card.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
                card.style.setProperty("--ry", `${(x - 0.5) * 6}deg`);
                card.style.setProperty("--mx", `${x * 100}%`);
                card.style.setProperty("--my", `${y * 100}%`);
              }}
              onPointerLeave={(event) => {
                const card = event.currentTarget;
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
                card.style.setProperty("--mx", "50%");
                card.style.setProperty("--my", "50%");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-haspopup="dialog"
              aria-label={`View ${item.title} - ${item.category}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="vg-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="vg-depth" />
              <div className="vg-overlay">
                <span className="vg-cat">{item.category}</span>
                <h3 className="vg-title">{item.title}</h3>
                {item.caption && <p className="vg-caption">{item.caption}</p>}
              </div>
            </article>
          ))}
        </div>
        <div className="vg-note">
          <span>People. Places. Moments that matter.</span>
          <span>Select a photograph to view it in full · Use arrow keys to explore</span>
        </div>
      </div>

      {hasLightbox && activeItem && (
        <div className="vg-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label={activeItem.title}>
          <div className="vg-panel" onClick={(e) => e.stopPropagation()}>
            <div className="vg-figure">
              <button className="vg-close" onClick={closeLightbox} aria-label="Close lightbox">
                ×
              </button>
              <button className="vg-nav left" onClick={goPrev} aria-label="Previous image">
                ‹
              </button>
              <button className="vg-nav right" onClick={goNext} aria-label="Next image">
                ›
              </button>
              <img src={activeItem.image} alt={activeItem.title} />
            </div>
            <div className="vg-meta">
              <strong>{activeItem.category}</strong>
              <h4>{activeItem.title}</h4>
              <p>{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
