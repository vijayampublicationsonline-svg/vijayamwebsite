"use client";

import Image from "next/image";
import Link from "next/link";

import {
  motion,
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
  aspect?: number;
}

const books: Book[] = [
  { id: 1, title: "Medical Surgical Nursing", image: "/images/s2.jpeg" },
  { id: 2, title: "Child Health Nursing", image: "/images/g7.jpeg" },
  { id: 3, title: "Mental Health Nursing", image: "/images/d5.jpeg" },
  { id: 4, title: "Community Health Nursing", image: "/images/s2.jpeg" },
  { id: 5, title: "Nutrition", image: "/images/s2.jpeg" },
  { id: 6, title: "Anatomy", image: "/images/s2.jpeg" },
  { id: 7, title: "Microbiology", image: "/images/s4.jpeg" },
  { id: 8, title: "Pharmacology", image: "/images/s2.jpeg" },
];

/* ----------------------------------------------------------------- */
/*  Premium custom cursor                                             */
/* ----------------------------------------------------------------- */

function PremiumCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 220, damping: 22, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 220, damping: 22, mass: 0.5 });

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
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: enlarged ? 0.45 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#F3D27A] shadow-[0_0_18px_6px_rgba(212,175,55,0.45)]"
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: enlarged ? 2.7 : 1,
          opacity: enlarged ? 0.95 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-[#D4AF37]/80 bg-black/5 backdrop-blur-sm"
      />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Elegant statistic                                                 */
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
        opacity: [0.12, 0.65, 0.12],
      }}
      transition={{ repeat: Infinity, duration, delay, ease: "easeInOut" }}
      className={`absolute rounded-full bg-[#E8C874] blur-[2px] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 14px 4px rgba(212,175,55,0.35)",
      }}
    />
  );
}

function BookWheel() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRotation((r) => r + 0.5), 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[640px] h-[640px] max-w-[90vw] max-h-[90vw] mx-auto" style={{ perspective: 1400 }}>
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.28, 0.15] }}
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
        const cardWidth = 150;
        const cardHeight = 214;

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
              whileHover={{ scale: 1.1, rotate: -1.5, y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative rounded-2xl overflow-hidden shadow-[0_28px_55px_-16px_rgba(76,58,18,0.42)] ring-1 ring-[#E8C874]/35"
            >
              <div className="relative bg-[#FFF8E7]" style={{ width: cardWidth, height: cardHeight }}>
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

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
        </motion.div>

        <GoldParticle className="left-10 top-28" duration={7} size={5} />
        <GoldParticle className="left-1/3 top-14" duration={9} delay={1} size={4} />
        <GoldParticle className="right-24 top-32" duration={8} delay={2} size={6} />
        <GoldParticle className="right-16 bottom-40" duration={6.5} delay={0.5} size={5} />
        <GoldParticle className="left-1/4 bottom-24" duration={10} delay={1.5} size={4} />

        <div className="relative max-w-[1700px] mx-auto px-6 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
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
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-5 mt-10"
              >
                <MagneticLink
                  href="/books"
                  className="group inline-flex items-center rounded-2xl bg-gradient-to-b from-[#E8C874] via-[#D4AF37] to-[#B08D57] px-8 py-5 text-[#2B2620] font-semibold shadow-[0_18px_40px_-10px_rgba(180,140,50,0.55)] transition-shadow"
                >
                  Browse Books
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </MagneticLink>

                <MagneticLink
                  href="/categories"
                  className="rounded-2xl border border-[#D4AF37]/50 bg-white/30 backdrop-blur-xl px-8 py-5 font-semibold text-[#5C4A20] transition-colors"
                >
                  Explore Categories
                </MagneticLink>
              </motion.div>

              <div className="flex flex-wrap gap-x-10 gap-y-6 mt-16">
                <ElegantStat end={600} suffix="+" label="Books" delay={0} />
                <ElegantStat end={1000000} suffix="+" label="Students" delay={0.1} />
                <ElegantStat end={23} suffix="+" label="Years" delay={0.2} />
              </div>
            </motion.div>

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
              <div className="absolute w-[700px] h-[700px] max-w-[95vw] max-h-[95vw] rounded-full bg-[#FFF8E7]/40 backdrop-blur-2xl border border-[#F3D27A]/40 shadow-[0_20px_90px_rgba(180,140,50,0.18)]" />
              <BookWheel />
            </motion.div>
          </div>
        </div>

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