"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

interface Book {
  id: number;
  title: string;
  image: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Medical Surgical Nursing",
    image: "/images/s2.jpeg",
  },
  {
    id: 2,
    title: "Child Health Nursing",
    image: "/images/g7.jpeg",
  },
  {
    id: 3,
    title: "Mental Health Nursing",
    image: "/images/d5.jpeg",
  },
  {
    id: 4,
    title: "Community Health Nursing",
    image: "/images/s2.jpeg",
  },
  {
    id: 5,
    title: "Nutrition",
    image: "/images/s2.jpeg",
  },
  {
    id: 6,
    title: "Anatomy",
    image: "/images/s2.jpeg",
  },
  {
    id: 7,
    title: "Microbiology",
    image: "/images/s4.jpeg",
  },
  {
    id: 8,
    title: "Pharmacology",
    image: "/images/s2.jpeg",
  },
];

function PremiumCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, {
    stiffness: 220,
    damping: 22,
    mass: 0.5,
  });

  const ringY = useSpring(cursorY, {
    stiffness: 220,
    damping: 22,
    mass: 0.5,
  });

  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);

      const target = event.target as HTMLElement;
      setEnlarged(Boolean(target.closest("[data-cursor-lg]")));
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: enlarged ? 0.4 : 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F3D27A] shadow-[0_0_18px_6px_rgba(212,175,55,0.45)]"
      />

      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: enlarged ? 2.7 : 1,
          opacity: enlarged ? 0.95 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 16,
        }}
        className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/80 bg-black/5 backdrop-blur-sm dark:bg-white/5"
      />
    </div>
  );
}

interface StatProps {
  end: number;
  suffix?: string;
  label: string;
  delay?: number;
}

function ElegantStat({
  end,
  suffix = "",
  label,
  delay = 0,
}: StatProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-start border-l border-[#C9A227]/30 pl-5 first:border-l-0 first:pl-0 dark:border-[#D4AF37]/30"
    >
      <h2 className="whitespace-nowrap text-3xl font-bold leading-none tracking-tight text-[#8C6D1F] dark:text-[#F3D27A] md:text-4xl">
        {inView && (
          <CountUp
            start={0}
            end={end}
            duration={2.4}
            separator=","
          />
        )}
        {suffix}
      </h2>

      <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#5C5346]/80 dark:text-[#E5E7EB]/75">
        {label}
      </p>
    </motion.div>
  );
}

function GoldParticle({
  className,
  duration = 8,
  delay = 0,
  size = 6,
}: {
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
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full bg-[#E8C874] blur-[2px] dark:bg-[#F3D27A] ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: "0 0 14px 4px rgba(136, 112, 35, 0.35)",
      }}
    />
  );
}

function BookWheel() {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setRotation((currentRotation) => currentRotation + 0.5);
    }, 30);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative mx-auto h-[640px] w-[640px] max-h-[90vw] max-w-[90vw]"
      style={{ perspective: 1400 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-[#D4AF37] blur-3xl dark:bg-[#8C6D1F]"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          rotate: {
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute left-1/2 top-1/2 h-[510px] w-[510px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/20"
      />

      <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D4AF37]/20" />

      {books.map((book, index) => {
        const angle =
          ((360 / books.length) * index + rotation) *
          (Math.PI / 180);

        const radius = 230;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle);

        const depth = (z + 1) / 2;
        const scale = 0.6 + depth * 0.75;
        const opacity = 0.3 + depth * 0.7;
        const cardWidth = 150;
        const cardHeight = 214;

        return (
          <motion.div
            key={book.id}
            animate={{
              x,
              scale,
              opacity,
              rotateY: Math.sin(angle) * 18,
              zIndex: Math.round(scale * 100),
            }}
            transition={{
              duration: 0.25,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2"
            style={{
              marginLeft: -cardWidth / 2,
              marginTop: -cardHeight / 2,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              data-cursor-lg
              whileHover={{
                scale: 1.1,
                rotate: -1.5,
                y: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="relative overflow-hidden rounded-2xl shadow-[0_28px_55px_-16px_rgba(76,58,18,0.42)] ring-1 ring-[#E8C874]/40 dark:shadow-[0_28px_55px_-16px_rgba(0,0,0,0.8)]"
            >
              <div
                className="relative overflow-hidden bg-[#FFF8E7] dark:bg-[#171717]"
                style={{
                  width: cardWidth,
                  height: cardHeight,
                }}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="150px"
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20 dark:from-white/10 dark:to-black/40" />

                <motion.div
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
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

  const springX = useSpring(x, {
    stiffness: 200,
    damping: 15,
  });

  const springY = useSpring(y, {
    stiffness: 200,
    damping: 15,
  });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set((event.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.4);
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

  const rotateX = useSpring(
    useTransform(mouseY, [-400, 400], [6, -6]),
    {
      stiffness: 100,
      damping: 24,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-400, 400], [-6, 6]),
    {
      stiffness: 100,
      damping: 24,
    }
  );

  const wheelParallaxX = useSpring(
    useTransform(mouseX, [-400, 400], [-18, 18]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const wheelParallaxY = useSpring(
    useTransform(mouseY, [-400, 400], [-14, 14]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const bgParallaxX = useSpring(
    useTransform(mouseX, [-400, 400], [12, -12]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const bgParallaxY = useSpring(
    useTransform(mouseY, [-400, 400], [10, -10]),
    {
      stiffness: 60,
      damping: 20,
    }
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <>
      <PremiumCursor />

      <motion.section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1600,
        }}
        className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_#FFFDF5_0%,_#FFF3D6_45%,_#F3DFA0_100%)] transition-colors duration-500 dark:bg-[radial-gradient(ellipse_at_top,_#242424_0%,_#111111_50%,_#000000_100%)] lg:cursor-none"
      >
        <motion.div
          style={{
            x: bgParallaxX,
            y: bgParallaxY,
          }}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div
            animate={{
              x: [-60, 60, -60],
              y: [-40, 40, -40],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-60 -top-60 h-[750px] w-[750px] rounded-full bg-[#E8C874]/25 blur-3xl dark:bg-[#D4AF37]/10"
          />

          <motion.div
            animate={{
              x: [80, -80, 80],
              y: [50, -50, 50],
              scale: [1.1, 1.3, 1.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 right-0 h-[650px] w-[650px] rounded-full bg-[#C9A227]/20 blur-3xl dark:bg-[#8C6D1F]/10"
          />
        </motion.div>

        <GoldParticle className="left-10 top-28" duration={7} size={5} />

        <GoldParticle
          className="left-1/3 top-14"
          duration={9}
          delay={1}
          size={4}
        />

        <GoldParticle
          className="right-24 top-32"
          duration={8}
          delay={2}
          size={6}
        />

        <GoldParticle
          className="bottom-40 right-16"
          duration={6.5}
          delay={0.5}
          size={5}
        />

        <GoldParticle
          className="bottom-24 left-1/4"
          duration={10}
          delay={1.5}
          size={4}
        />

        <div className="relative mx-auto max-w-[1700px] px-6 py-32 lg:py-40">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                data-cursor-lg
                className="mb-10 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#FBF0D0]/80 px-5 py-3 backdrop-blur-sm dark:bg-[#292929]/80"
              >
                <Sparkles className="h-5 w-5 text-[#B08D57] dark:text-[#F3D27A]" />

                <span className="font-semibold tracking-wide text-[#8C6D1F] dark:text-[#F3D27A]">
                  India&apos;s Trusted Academic Publisher
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[52px] font-extrabold leading-[1.02] tracking-[-0.01em] text-[#2B2620] dark:text-white sm:text-6xl md:text-7xl xl:text-[88px]"
              >
                Learn Better

                <span className="block text-[#8C6D1F] dark:text-[#F3D27A]">
                  With
                </span>

                <span className="block bg-gradient-to-r from-[#B08D57] via-[#D4AF37] to-[#8C6D1F] bg-clip-text text-transparent">
                  Vijayam Publications
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 max-w-xl text-lg leading-9 text-[#5C5346] dark:text-gray-300"
              >
                India&apos;s premium destination for
                <span className="font-semibold text-[#8C6D1F] dark:text-[#F3D27A]">
                  {" "}B.Sc Nursing
                </span>
                ,
                <span className="font-semibold text-[#8C6D1F] dark:text-[#F3D27A]">
                  {" "}GNM
                </span>
                ,
                <span className="font-semibold text-[#8C6D1F] dark:text-[#F3D27A]">
                  {" "}ANM
                </span>
                , Allied Health Sciences, Competitive Exams and Degree Books.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10 flex flex-wrap gap-5"
              >
                <MagneticLink
                  href="/books"
                  className="group inline-flex items-center rounded-2xl bg-gradient-to-b from-[#E8C874] via-[#D4AF37] to-[#B08D57] px-8 py-5 font-semibold text-[#2B2620] shadow-[0_18px_40px_-10px_rgba(180,140,50,0.55)] transition-shadow"
                >
                  Browse Books

                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </MagneticLink>

                <MagneticLink
                  href="/categories"
                  className="rounded-2xl border border-[#D4AF37]/50 bg-white/30 px-8 py-5 font-semibold text-[#5C4A20] backdrop-blur-xl transition-colors dark:bg-black/30 dark:text-[#F3D27A]"
                >
                  Explore Categories
                </MagneticLink>
              </motion.div>

              <div className="mt-16 flex flex-wrap gap-x-10 gap-y-6">
                <ElegantStat
                  end={600}
                  suffix="+"
                  label="Books"
                />

                <ElegantStat
                  end={1000000}
                  suffix="+"
                  label="Students"
                  delay={0.1}
                />

                <ElegantStat
                  end={23}
                  suffix="+"
                  label="Years"
                  delay={0.2}
                />
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
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  opacity: [0.65, 0.85, 0.65],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-[700px] w-[700px] max-h-[95vw] max-w-[95vw] rounded-full border border-[#F3D27A]/40 bg-[#FFF8E7]/40 shadow-[0_20px_90px_rgba(180,140,50,0.18)] backdrop-blur-2xl dark:bg-black/50 dark:shadow-[0_20px_90px_rgba(0,0,0,0.8)]"
              />

              <div className="absolute h-[560px] w-[560px] max-h-[82vw] max-w-[82vw] rounded-full border border-[#D4AF37]/20" />

              <BookWheel />
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[#8C6D1F] dark:text-[#F3D27A] lg:flex"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em]">
            Scroll
          </span>

          <div className="relative flex h-10 w-6 justify-center rounded-full border border-[#D4AF37]/50 pt-2">
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]"
            />
          </div>

          <ChevronDown size={14} className="opacity-60" />
        </motion.div>
      </motion.section>
    </>
  );
}