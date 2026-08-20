"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const books = [
  { title: "Medical Surgical Nursing", image: "/images/s2.jpeg" },
  { title: "Child Health Nursing", image: "/images/g7.jpeg" },
  { title: "Mental Health Nursing", image: "/images/d5.jpeg" },
  { title: "Community Health Nursing", image: "/images/s4.jpeg" },
  { title: "Nutrition", image: "/images/s2.jpeg" },
  { title: "Anatomy", image: "/images/d5.jpeg" },
];

function Stat({ value, label, nightMode }: { value: string; label: string; nightMode: boolean }) {
  return (
    <div className={`border-l pl-5 first:border-l-0 first:pl-0 transition-colors duration-700 ${
      nightMode 
        ? 'border-cyan-300/30' 
        : 'border-[#C9A227]/35'
    }`}>
      <p className={`text-3xl font-black sm:text-4xl transition-all duration-700 ${
        nightMode 
          ? 'bg-gradient-to-r from-amber-200 via-violet-300 to-cyan-200 bg-clip-text text-transparent' 
          : 'text-[#8C6D1F]'
      }`}>
        {value}
      </p>
      <p className={`mt-2 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-700 ${
        nightMode ? 'text-slate-300' : 'text-[#5C5346]/80'
      }`}>
        {label}
      </p>
    </div>
  );
}

function BookWheel({ nightMode }: { nightMode: boolean }) {
  return (
    <div className="relative mx-auto h-[420px] w-[420px] max-w-[90vw] sm:h-[560px] sm:w-[560px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-[9%] rounded-full border transition-colors duration-700 ${
          nightMode ? 'border-cyan-300/35' : 'border-[#D4AF37]/35'
        }`}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-[18%] rounded-full border border-dashed transition-colors duration-700 ${
          nightMode ? 'border-violet-300/35' : 'border-[#B08D57]/35'
        }`}
      />
      <motion.div
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.25, 0.7, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute inset-[22%] rounded-full blur-3xl transition-all duration-700 ${
          nightMode 
            ? 'bg-gradient-to-br from-violet-500/45 via-fuchsia-500/30 to-cyan-400/35' 
            : 'bg-[#D4AF37]/25'
        }`}
      />

      {books.map((book, index) => {
        const angle = (360 / books.length) * index;
        const radius = "42%";

        return (
          <motion.div
            key={book.title}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 3.5 + index * 0.3,
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}) rotate(-${angle}deg)`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.12, y: -8, rotate: index % 2 ? 4 : -4 }}
              className={`group relative h-36 w-24 overflow-hidden rounded-xl border bg-[#FFF8E7] shadow-[0_18px_35px_rgba(112,77,8,.35)] transition-all duration-700 sm:h-48 sm:w-32 ${
                nightMode 
                  ? 'border-cyan-200/40 bg-[#10152e] shadow-[0_20px_45px_rgba(79,70,229,.35)]' 
                  : 'border-[#F3D27A]/60'
              }`}
            >
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="128px"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10" />
              <p className="absolute bottom-2 px-2 text-[9px] font-bold leading-3 text-white sm:text-xs">
                {book.title}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function HeroSection() {
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setNightMode(root.classList.contains("night-mode"));

    syncTheme();

    // Listen for custom theme change event from navbar
    const handleThemeChange = (e: CustomEvent) => {
      setNightMode(e.detail.nightMode);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  return (
    <section
      className={`relative isolate overflow-hidden transition-all duration-700 ${
        nightMode
          ? "bg-black" // Full black background for night mode
          : "bg-[radial-gradient(ellipse_at_top,_#FFFDF5_0%,_#FFF3D6_46%,_#F3DFA0_100%)]"
      }`}
    >
      <motion.div
        key={nightMode ? "night" : "day"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`absolute inset-0 transition-all duration-700 ${
          nightMode
            ? "bg-[radial-gradient(circle_at_10%_18%,rgba(245,158,11,.12),transparent_25%),radial-gradient(circle_at_88%_15%,rgba(139,92,246,.18),transparent_30%),radial-gradient(circle_at_68%_88%,rgba(6,182,212,.16),transparent_31%),linear-gradient(135deg,#000000_0%,#0a0a0a_48%,#1a1a1a_100%)]" // Subtle dark gradients over black
            : "bg-[radial-gradient(circle_at_12%_20%,rgba(232,200,116,.34),transparent_29%),radial-gradient(circle_at_88%_76%,rgba(201,162,39,.22),transparent_32%)]"
        }`}
      />

      {nightMode && (
        <>
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:48px_48px]" />
          <motion.div
            animate={{ x: [-80, 80, -80], y: [-30, 50, -30] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-violet-600/25 blur-3xl"
          />
          <motion.div
            animate={{ x: [60, -70, 60], y: [30, -40, 30] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-cyan-400/20 blur-3xl"
          />
        </>
      )}

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-[1700px] items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className={`mb-8 inline-flex items-center gap-3 rounded-full border bg-[#FFF8E7]/75 px-5 py-3 shadow-lg backdrop-blur-xl transition-all duration-700 ${
              nightMode 
                ? 'border-violet-300/35 bg-[#161a3b]/65' 
                : 'border-[#D4AF37]/35'
            }`}
          >
            <Sparkles className={`h-5 w-5 transition-colors duration-700 ${
              nightMode ? 'text-cyan-200' : 'text-[#B08D57]'
            }`} />
            <span className={`font-bold transition-all duration-700 ${
              nightMode 
                ? 'bg-gradient-to-r from-amber-200 to-cyan-200 bg-clip-text text-transparent' 
                : 'text-[#8C6D1F]'
            }`}>
              India&apos;s Trusted Academic Publisher
            </span>
          </motion.div>

          <h1 className={`max-w-3xl text-5xl font-black leading-[1.02] tracking-tight transition-colors duration-700 sm:text-6xl md:text-7xl xl:text-[86px] ${
            nightMode ? 'text-white' : 'text-[#2B2620]'
          }`}>
            Learn Better
            <span className={`block transition-colors duration-700 ${
              nightMode ? 'text-amber-200' : 'text-[#8C6D1F]'
            }`}>With</span>
            <span className={`block bg-gradient-to-r bg-clip-text text-transparent transition-all duration-700 ${
              nightMode 
                ? 'from-amber-200 via-violet-300 to-cyan-200' 
                : 'from-[#B08D57] via-[#D4AF37] to-[#8C6D1F]'
            }`}>
              Vijayam Publications
            </span>
          </h1>

          <p className={`mt-8 max-w-xl text-lg leading-9 transition-colors duration-700 ${
            nightMode ? 'text-slate-200' : 'text-[#5C5346]'
          }`}>
            India&apos;s premium destination for{" "}
            <span className={`font-bold transition-colors duration-700 ${
              nightMode ? 'text-amber-200' : 'text-[#8C6D1F]'
            }`}>B.Sc Nursing, GNM, ANM</span>,
            Allied Health Sciences, Competitive Exams and Degree Books.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/books"
              className={`group inline-flex items-center rounded-2xl px-7 py-4 font-black shadow-[0_18px_38px_rgba(176,141,87,.4)] transition hover:-translate-y-1 ${
                nightMode 
                  ? 'bg-[linear-gradient(90deg,#F59E0B,#8B5CF6,#06B6D4)] text-white shadow-[0_18px_40px_rgba(124,58,237,.42)]' 
                  : 'bg-gradient-to-r from-[#F4D97D] via-[#D4AF37] to-[#9B6010] text-[#2B2620]'
              }`}
            >
              Browse Books
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Link>
            <Link
              href="/categories"
              className={`inline-flex items-center rounded-2xl border bg-white/45 px-7 py-4 font-bold backdrop-blur-xl transition hover:-translate-y-1 ${
                nightMode 
                  ? 'border-cyan-200/30 bg-white/10 text-cyan-100' 
                  : 'border-[#D4AF37]/45 text-[#5C4A20]'
              }`}
            >
              Explore Categories
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
            <Stat value="600+" label="Books" nightMode={nightMode} />
            <Stat value="1M+" label="Students" nightMode={nightMode} />
            <Stat value="23+" label="Years" nightMode={nightMode} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative flex justify-center"
        >
          <div className={`absolute h-[90%] w-[90%] rounded-full border bg-white/25 shadow-[0_20px_90px_rgba(176,141,87,.18)] backdrop-blur-xl transition-all duration-700 ${
            nightMode 
              ? 'border-violet-300/25 bg-[#12183e]/35 shadow-[0_20px_100px_rgba(79,70,229,.3)]' 
              : 'border-[#D4AF37]/25'
          }`} />
          <BookWheel nightMode={nightMode} />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className={`absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center transition-colors duration-700 lg:flex ${
          nightMode ? 'text-cyan-200' : 'text-[#8C6D1F]'
        }`}
      >
        <span className="text-xs font-bold uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="mt-1" size={18} />
      </motion.div>
    </section>
  );
}