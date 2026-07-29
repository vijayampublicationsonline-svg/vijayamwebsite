"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Award,
  Sparkles,
  Star,
  ChevronDown,
} from "lucide-react";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

/* ----------------------------------------------------------------- */
/*  Data                                                              */
/* ----------------------------------------------------------------- */

interface Book {
  id: number;
  title: string;
  image: string;
  aspect?: number; // width / height, defaults to 0.7 (portrait book cover)
}

const books: Book[] = [
  { id: 1, title: "Medical Surgical Nursing", image:""},
  { id: 2, title: "Child Health Nursing", image: "" },
  { id: 3, title: "Mental Health Nursing", image: "" },
  { id: 4, title: "Community Health Nursing", image: "" },
  { id: 5, title: "Nutrition", image: "" },
  { id: 6, title: "Anatomy", image: "" },
  { id: 7, title: "Microbiology", image: "" },
  { id: 8, title: "Pharmacology", image: ""},
];

/* ----------------------------------------------------------------- */
/*  Premium custom cursor                                             */
/* ----------------------------------------------------------------- */

function PremiumCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 300, damping: 30, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 30, mass: 0.6 });

  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      setEnlarged(Boolean(target.closest("[data-cursor-lg]")));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      {/* Inner glowing dot */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: enlarged ? 0.6 : 1 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F3D27A] shadow-[0_0_12px_4px_rgba(212,175,55,0.55)]"
      />
      {/* Outer trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: enlarged ? 2.4 : 1,
          opacity: enlarged ? 0.9 : 0.55,
        }}
        transition={{ scale: { type: "spring", stiffness: 200, damping: 18 } }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#C9A227]"
      />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Elegant statistic (typography, not a card)                        */
/* ----------------------------------------------------------------- */

interface StatProps {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function ElegantStat({ end, suffix = "", label, delay = 0 }: StatProps) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start border-l border-[#C9A227]/30 pl-5 first:border-l-0 first:pl-0"
    >
      <h2 className="whitespace-nowrap text-3xl md:text-4xl font-bold tracking-tight text-[#8C6D1F] leading-none">
        {inView && <CountUp start={0} end={end} duration={2.4} separator="," />}
        {suffix}
      </h2>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#5C5346]/80 font-medium">
        {label}
      </p>
    </motion.div>
  );
}

/* ----------------------------------------------------------------- */
/*  Floating golden glow particles (replaces colorful icons)          */
/* ----------------------------------------------------------------- */

function GoldParticle({ className, duration = 8, delay = 0, size = 6 }: {
  className: string;
  duration?: number;
  delay?: number;
  size?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -22, 0],
        opacity: [0.15, 0.75, 0.15],
      }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
      className={`absolute rounded-full bg-[#E8C874] blur-[2px] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 14px 4px rgba(212,175,55,0.45)",
      }}
    />
  );
}

/* ----------------------------------------------------------------- */
/*  Book Wheel — larger, with depth, shadow, and reflection            */
/* ----------------------------------------------------------------- */

function BookWheel() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((r) => r + 0.5);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[640px] h-[640px] max-w-[90vw] max-h-[90vw] mx-auto" style={{ perspective: 1400 }}>
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-0 rounded-full bg-[#D4AF37] blur-3xl"
      />

      {books.map((book, index) => {
        const angle = ((360 / books.length) * index + rotation) * (Math.PI / 180);
        const radius = 230;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle);
        const scale = 0.6 + ((z + 1) / 2) * 0.75;
        const opacity = 0.3 + ((z + 1) / 2) * 0.7;
        const aspect = book.aspect ?? 0.7;
        const cardWidth = 150;
        const cardHeight = Math.round(cardWidth / aspect);

        return (
          <motion.div
            key={book.id}
            animate={{
              x,
              scale,
              opacity,
              zIndex: Math.round(scale * 100),
              rotateY: Math.sin(angle) * 18,
            }}
            transition={{ duration: 0.25, ease: "linear" }}
            className="absolute left-1/2 top-1/2"
            style={{
              marginLeft: -cardWidth / 2,
              marginTop: -cardHeight / 2,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              data-cursor-lg
              whileHover={{ scale: 1.12, rotate: -2, y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(76,58,18,0.45)] ring-1 ring-[#E8C874]/40"
            >
              <div
                className="relative bg-[#FFF8E7]"
                style={{ width: cardWidth, height: cardHeight }}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                {/* subtle top sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Reflection */}
            <div
              className="relative mt-1 overflow-hidden rounded-b-2xl opacity-30"
              style={{
                width: cardWidth,
                height: cardHeight * 0.35,
                transform: "scaleY(-1)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
              }}
            >
              <Image
                src={book.image}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Magnetic button wrapper                                           */
/* ----------------------------------------------------------------- */

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        data-cursor-lg
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
      >
        {children}
      </Link>
    </motion.div>
  );
}

/* ----------------------------------------------------------------- */
/*  Hero Section                                                      */
/* ----------------------------------------------------------------- */

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [6, -6]), {
    stiffness: 100,
    damping: 24,
  });

  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-6, 6]), {
    stiffness: 100,
    damping: 24,
  });

  const wheelParallaxX = useSpring(useTransform(mouseX, [-400, 400], [-18, 18]), {
    stiffness: 80,
    damping: 20,
  });
  const wheelParallaxY = useSpring(useTransform(mouseY, [-400, 400], [-14, 14]), {
    stiffness: 80,
    damping: 20,
  });

  const bgParallaxX = useSpring(useTransform(mouseX, [-400, 400], [12, -12]), {
    stiffness: 60,
    damping: 20,
  });
  const bgParallaxY = useSpring(useTransform(mouseY, [-400, 400], [10, -10]), {
    stiffness: 60,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <>
      <PremiumCursor />

      <motion.section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{ rotateX, rotateY, transformPerspective: 1600 }}
        className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#FFFDF5_0%,_#FFF3D6_45%,_#F3DFA0_100%)] lg:cursor-none"
      >
        {/* Fine grain / noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Ambient background: soft light beams + gold glow */}
        <motion.div
          style={{ x: bgParallaxX, y: bgParallaxY }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            animate={{ x: [-60, 60, -60], y: [-40, 40, -40], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[750px] h-[750px] rounded-full blur-3xl bg-[#E8C874]/25 -top-60 -left-60"
          />
          <motion.div
            animate={{ x: [80, -80, 80], y: [50, -50, 50], scale: [1.1, 1.3, 1.1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[650px] h-[650px] rounded-full blur-3xl bg-[#C9A227]/20 bottom-0 right-0"
          />

          {/* Moving light beams */}
          <motion.div
            animate={{ opacity: [0.05, 0.15, 0.05], x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-transparent via-[#F3D27A] to-transparent rotate-12 blur-sm"
          />
          <motion.div
            animate={{ opacity: [0.04, 0.12, 0.04], x: ["10%", "-10%", "10%"] }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-1/3 w-[2px] h-full bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent -rotate-12 blur-sm"
          />

          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04]" />
        </motion.div>

        {/* Floating golden glow particles */}
        <GoldParticle className="left-10 top-28" duration={7} size={5} />
        <GoldParticle className="left-1/3 top-14" duration={9} delay={1} size={4} />
        <GoldParticle className="right-24 top-32" duration={8} delay={2} size={6} />
        <GoldParticle className="right-16 bottom-40" duration={6.5} delay={0.5} size={5} />
        <GoldParticle className="left-1/4 bottom-24" duration={10} delay={1.5} size={4} />

        <div className="relative max-w-[1700px] mx-auto px-6 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                data-cursor-lg
                className="inline-flex items-center gap-3 rounded-full bg-[#FBF0D0]/80 border border-[#D4AF37]/30 px-5 py-3 mb-10 backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5 text-[#B08D57]" />
                <span className="font-semibold tracking-wide text-[#8C6D1F]">
                  India&apos;s Trusted Academic Publisher
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[52px] sm:text-6xl md:text-7xl xl:text-[88px] font-extrabold leading-[1.02] tracking-[-0.01em] text-[#2B2620]"
              >
                Learn Better
                <span className="block text-[#8C6D1F]">With</span>
                <span className="block bg-gradient-to-r from-[#B08D57] via-[#D4AF37] to-[#8C6D1F] bg-clip-text text-transparent">
                  Vijayam Publications
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 text-lg leading-9 text-[#5C5346] max-w-xl"
              >
                India&apos;s premium destination for
                <span className="font-semibold text-[#8C6D1F]"> B.Sc Nursing</span>,
                <span className="font-semibold text-[#8C6D1F]"> GNM</span>,
                <span className="font-semibold text-[#8C6D1F]"> ANM</span>,
                Allied Health Sciences, Competitive Exams and Degree Books.
                <br />
                <br />
                Discover expertly curated textbooks, university previous papers,
                faculty reference books and exam preparation material trusted by
                more than one million students.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-5 mt-10"
              >
                <MagneticLink
                  href="/books"
                  className="group inline-flex items-center rounded-2xl bg-gradient-to-b from-[#E8C874] via-[#D4AF37] to-[#B08D57] px-8 py-5 text-[#2B2620] font-semibold shadow-[0_18px_40px_-10px_rgba(180,140,50,0.55)] hover:shadow-[0_22px_50px_-8px_rgba(180,140,50,0.65)] transition-shadow"
                >
                  Browse Books
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </MagneticLink>

                <MagneticLink
                  href="/categories"
                  className="rounded-2xl border border-[#D4AF37]/50 bg-white/30 backdrop-blur-xl px-8 py-5 font-semibold text-[#5C4A20] hover:bg-white/45 transition-colors"
                >
                  Explore Categories
                </MagneticLink>
              </motion.div>

              {/* Feature Chips */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-3 mt-12"
              >
                {[
                  "INC Syllabus",
                  "Latest Editions",
                  "Previous Year Papers",
                  "Faculty Recommended",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                    className="rounded-full bg-white/40 backdrop-blur-md border border-[#D4AF37]/25 px-4 py-2 shadow-sm"
                  >
                    <span className="text-[#8C6D1F] font-medium text-xs tracking-wide">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Statistics — elegant typography, not cards */}
              <div className="flex flex-wrap gap-x-10 gap-y-6 mt-16">
                <ElegantStat end={600} suffix="+" label="Books" delay={0} />
                <ElegantStat end={1000000} suffix="+" label="Students" delay={0.1} />
                <ElegantStat end={23} suffix="+" label="Years" delay={0.2} />
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              style={{
                x: wheelParallaxX,
                y: wheelParallaxY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Glass Circle */}
              <div className="absolute w-[700px] h-[700px] max-w-[95vw] max-h-[95vw] rounded-full bg-[#FFF8E7]/40 backdrop-blur-2xl border border-[#F3D27A]/40 shadow-[0_20px_90px_rgba(180,140,50,0.18)]" />

              {/* Book Wheel */}
              <BookWheel />

              {/* Badge 1 */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                data-cursor-lg
                className="absolute top-6 right-0 rounded-3xl bg-[#FFFBF0]/85 backdrop-blur-xl border border-[#F0D48A]/50 shadow-[0_20px_45px_-15px_rgba(140,109,31,0.35)] px-6 py-5"
              >
                <div className="flex items-center gap-2">
                  <Star className="text-[#C9A227]" size={18} fill="currentColor" />
                  <span className="font-semibold text-[#5C5346] text-sm">Trusted Brand</span>
                </div>
                <h2 className="mt-3 text-3xl font-bold text-[#8C6D1F]">600+</h2>
                <p className="text-[#7A7062] text-sm">Premium Nursing Titles</p>
              </motion.div>

              {/* Badge 2 */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                data-cursor-lg
                className="absolute bottom-10 left-0 rounded-3xl bg-[#FFFBF0]/85 backdrop-blur-xl border border-[#F0D48A]/50 shadow-[0_20px_45px_-15px_rgba(140,109,31,0.35)] px-6 py-5"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="text-[#B08D57]" size={20} />
                  <span className="font-semibold text-[#5C5346] text-sm">Students</span>
                </div>
                <h2 className="mt-3 text-3xl font-bold whitespace-nowrap text-[#8C6D1F]">
                  1,000,000+
                </h2>
                <p className="text-[#7A7062] text-sm">Learning with Vijayam</p>
              </motion.div>

              {/* Badge 3 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                data-cursor-lg
                className="absolute bottom-28 right-8 rounded-2xl bg-gradient-to-b from-[#8C6D1F] to-[#5C4A20] text-[#FBF0D0] px-5 py-4 shadow-[0_20px_45px_-15px_rgba(92,74,32,0.55)]"
              >
                <div className="flex items-center gap-2">
                  <Award size={18} />
                  <span className="font-semibold text-sm">23+ Years</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className="relative z-10 border-t border-[#F0D48A]/30 bg-[#FFFBF0]/50 backdrop-blur-xl">
          <div className="max-w-[1700px] mx-auto px-6 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF0D0] flex items-center justify-center">
                  <BookOpen className="text-[#8C6D1F]" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2620]">600+</h3>
                  <p className="text-[#7A7062] text-sm">Academic Titles</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF0D0] flex items-center justify-center">
                  <GraduationCap className="text-[#8C6D1F]" size={28} />
                </div>
                <div>
                  <h3 className="font-bold whitespace-nowrap text-[#2B2620]">1,000,000+</h3>
                  <p className="text-[#7A7062] text-sm">Happy Students</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF0D0] flex items-center justify-center">
                  <Award className="text-[#8C6D1F]" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2620]">23+</h3>
                  <p className="text-[#7A7062] text-sm">Years Experience</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FBF0D0] flex items-center justify-center">
                  <HeartPulse className="text-[#8C6D1F]" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-[#2B2620]">INC</h3>
                  <p className="text-[#7A7062] text-sm">Syllabus Based</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Premium Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[#8C6D1F]"
        >
          <span className="text-xs uppercase tracking-[0.25em] font-medium">Scroll</span>
          <div className="relative w-6 h-10 rounded-full border border-[#D4AF37]/50 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
            />
          </div>
          <ChevronDown size={14} className="opacity-60" />
        </motion.div>
      </motion.section>
    </>
  );
}