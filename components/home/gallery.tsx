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
    id: 1,
    title: "The Vijayam Collection",
    caption: "Building knowledge, one page at a time.",
    category: "OUR BOOKS",
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1600&q=80",
    layout: "hero",
  },
  {
    id: 2,
    title: "Editorial Precision",
    caption: "Every line refined with care and clarity.",
    category: "BEHIND THE PAGES",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    layout: "standard",
  },
  {
    id: 3,
    title: "Author Conversations",
    caption: "Ideas shaped through dialogue and trust.",
    category: "OUR PEOPLE",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    layout: "standard",
  },
  {
    id: 4,
    title: "Print Journey",
    caption: "From manuscript to finished masterpiece.",
    category: "BEHIND THE PAGES",
    image:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=1400&q=80",
    layout: "tall",
  },
  {
    id: 5,
    title: "Learning Events",
    caption: "Knowledge shared in classrooms and communities.",
    category: "OUR JOURNEY",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
    layout: "wide",
  },
  {
    id: 6,
    title: "Inside the Workspace",
    caption: "Where stories become books that endure.",
    category: "OUR JOURNEY",
    image:
      "https://images.unsplash.com/photo-1455885666463-9f1d8b5ecf0b?auto=format&fit=crop&w=1200&q=80",
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

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * 7;
    const rotateX = (0.5 - py) * 7;
    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    card.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    card.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
  };

  const resetCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  };

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
    <section className="vijayam-gallery" aria-label="Inside Vijayam">
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
          --shadow:0 10px 30px rgba(42,37,35,.08);
          --overlay:linear-gradient(180deg, rgba(0,0,0,.04) 34%, rgba(42,37,35,.72) 100%);

          width:100%;
          padding:86px 24px 94px;
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

        .vg-item.hero{grid-column:span 8; grid-row:span 2; min-height:620px;}
        .vg-item.standard{grid-column:span 4; min-height:300px;}
        .vg-item.tall{grid-column:span 4; grid-row:span 2; min-height:620px;}
        .vg-item.wide{grid-column:span 8; min-height:300px;}

        .vg-item img{
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

        @keyframes vgReveal{to{opacity:1;transform:translateY(0)}}
        @keyframes vgFade{from{opacity:0}to{opacity:1}}
        @keyframes vgScale{to{transform:scale(1) translateY(0)}}
        @keyframes vgLightboxIn{from{opacity:.7;transform:scale(.985)}to{opacity:1;transform:scale(1)}}
        @keyframes vgKenBurns{from{transform:scale(1.02)}to{transform:scale(1.08)}}

        @media (max-width:1024px){
          .vg-item.hero{grid-column:span 7; min-height:520px}
          .vg-item.standard,.vg-item.tall{grid-column:span 5}
          .vg-item.tall{min-height:520px}
          .vg-item.wide{grid-column:span 7}
        }

        @media (max-width:820px){
          .vijayam-gallery{padding:74px 18px 82px}
          .vg-grid{grid-template-columns:repeat(6,minmax(0,1fr)); gap:14px}
          .vg-item.hero,.vg-item.wide,.vg-item.tall{grid-column:span 6; min-height:360px}
          .vg-item.standard{grid-column:span 3; min-height:230px}
        }

        @media (max-width:620px){
          .vg-head{margin-bottom:22px}
          .vg-head .sub{font-size:15px}
          .vg-grid{grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px}
          .vg-item.hero,.vg-item.wide,.vg-item.tall,.vg-item.standard{grid-column:span 2; min-height:245px}
          .vg-panel{width:96vw}
          .vg-nav{width:38px;height:38px}
        }

        @media (prefers-reduced-motion: reduce){
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
          <span className="vg-kicker">INSIDE VIJAYAM</span>
          <h2>INSIDE VIJAYAM</h2>
          <p className="sub">A glimpse into the work behind every page.</p>
        </header>

        <div className="vg-grid">
          {galleryItems.map((item, index) => (
            <article
              key={item.id}
              className={`vg-item ${item.layout}`}
              onClick={() => openLightbox(index)}
              onMouseMove={handleCardMove}
              onMouseLeave={resetCardMove}
              aria-label={`${item.title} - ${item.category}`}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="vg-depth" />
              <div className="vg-overlay">
                <span className="vg-cat">{item.category}</span>
                <h3 className="vg-title">{item.title}</h3>
                <p className="vg-caption">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {hasLightbox && activeItem && (
        <div className="vg-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
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
