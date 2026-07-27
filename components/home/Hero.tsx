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
  ChevronRight,
} from "lucide-react";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import {
  useState,
  useEffect,
  useRef,
  ReactNode,
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
    image: "/images/books/book1.png",
  },
  {
    id: 2,
    title: "Child Health Nursing",
    image: "/images/books/book2.png",
  },
  {
    id: 3,
    title: "Mental Health Nursing",
    image: "/images/books/book3.png",
  },
  {
    id: 4,
    title: "Community Health Nursing",
    image: "/images/books/book4.png",
  },
  {
    id: 5,
    title: "Nutrition",
    image: "/images/books/book5.png",
  },
  {
    id: 6,
    title: "Anatomy",
    image: "/images/books/book6.png",
  },
  {
    id: 7,
    title: "Microbiology",
    image: "/images/books/book7.png",
  },
  {
    id: 8,
    title: "Pharmacology",
    image: "/images/books/book8.png",
  },
];

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

function AnimatedCounter({
  end,
  suffix = "",
  label,
}: CounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      whileHover={{
        y: -8,
        scale: 1.05,
      }}
      className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-xl p-6"
    >
      <h2 className="text-5xl font-black text-blue-700">
        {inView && (
          <CountUp
            start={0}
            end={end}
            duration={2.5}
            separator=","
          />
        )}
        {suffix}
      </h2>

      <p className="mt-2 text-gray-600 font-medium">
        {label}
      </p>
    </motion.div>
  );
}

function FloatingIcon({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 6,
      }}
      className={`absolute ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-white/70 backdrop-blur-xl shadow-2xl flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
}

function BookWheel() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((r) => r + 0.7);
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[520px] h-[520px] mx-auto">

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute inset-0 rounded-full bg-blue-500 blur-3xl"
      />

      {books.map((book, index) => {

        const angle =
          ((360 / books.length) * index + rotation) *
          (Math.PI / 180);

        const radius = 180;

        const x = Math.sin(angle) * radius;

        const z = Math.cos(angle);

        const scale =
          0.65 + ((z + 1) / 2) * 0.6;

        const opacity =
          0.35 + ((z + 1) / 2) * 0.65;

        return (
          <motion.div
            key={book.id}
            animate={{
              x,
              scale,
              opacity,
              zIndex: Math.round(scale * 100),
            }}
            transition={{
              duration: 0.25,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2"
            style={{
              marginLeft: -70,
              marginTop: -100,
            }}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: -2,
              }}
              className="rounded-2xl overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={book.image}
                alt={book.title}
                width={140}
                height={200}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        );

      })}
    </div>
  );
}
export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-400, 400], [10, -10]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-400, 400], [-10, 10]),
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!heroRef.current) return;

    const rect =
      heroRef.current.getBoundingClientRect();

    mouseX.set(
      e.clientX - rect.left - rect.width / 2
    );

    mouseY.set(
      e.clientY - rect.top - rect.height / 2
    );
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF5] via-[#FFF6D8] to-[#F6E4A8]"
    >
      {/* Animated Background */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [-60, 60, -60],
            y: [-40, 40, -40],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl bg-blue-400/20 -top-60 -left-60"
        />

        <motion.div
          animate={{
            x: [80, -80, 80],
            y: [50, -50, 50],
            scale: [1.1, 1.3, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl bg-cyan-400/20 bottom-0 right-0"
        />

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      </div>

      {/* Floating Icons */}

      <FloatingIcon className="left-8 top-24">
        <BookOpen className="w-7 h-7 text-blue-600" />
      </FloatingIcon>

      <FloatingIcon className="left-1/3 top-16">
        <GraduationCap className="w-7 h-7 text-indigo-600" />
      </FloatingIcon>

      <FloatingIcon className="right-20 top-28">
        <HeartPulse className="w-7 h-7 text-red-500" />
      </FloatingIcon>

      <FloatingIcon className="right-12 bottom-32">
        <Award className="w-7 h-7 text-yellow-500" />
      </FloatingIcon>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="inline-flex items-center gap-3 rounded-full bg-blue-100 px-5 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />

              <span className="font-semibold text-blue-700">

                India's Trusted Academic Publisher

              </span>

            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="text-6xl xl:text-7xl font-black leading-tight"
            >

              Learn Better

              <span className="block text-blue-600">

                With

              </span>

              <span className="block bg-gradient-to-r from-blue-700 via-cyan-500 to-indigo-700 bg-clip-text text-transparent">

                Vijayam Publications

              </span>

            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="mt-8 text-lg leading-9 text-gray-600"
            >
              India's premium destination for
              <span className="font-semibold text-blue-700">
                {" "}B.Sc Nursing
              </span>,
              <span className="font-semibold text-blue-700">
                {" "}GNM
              </span>,
              <span className="font-semibold text-blue-700">
                {" "}ANM
              </span>,
              Allied Health Sciences,
              Competitive Exams and Degree Books.

              <br />
              <br />

              Discover expertly curated textbooks,
              university previous papers,
              faculty reference books and
              exam preparation material trusted
              by more than one million students.
            </motion.p>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
              }}
              className="flex flex-wrap gap-5 mt-10"
            >

              <Link
                href="/books"
                className="group inline-flex items-center rounded-2xl bg-blue-600 px-8 py-5 text-white font-semibold shadow-xl hover:bg-blue-700 transition-all"
              >

                Browse Books

                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-all" />

              </Link>

              <Link
                href="/categories"
                className="rounded-2xl border border-blue-200 bg-white/70 backdrop-blur-xl px-8 py-5 font-semibold hover:bg-white transition-all"
              >

                Explore Categories

              </Link>
              </motion.div>

{/* Feature Tags */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8 }}
  className="flex flex-wrap gap-4 mt-10"
>
  {[
    "INC Syllabus",
    "Latest Editions",
    "Previous Year Papers",
    "Faculty Recommended",
  ].map((item) => (
    <div
      key={item}
      className="rounded-full bg-white/70 backdrop-blur-xl border border-blue-100 px-5 py-3 shadow-lg"
    >
      <span className="text-blue-700 font-semibold text-sm">
        {item}
      </span>
    </div>
  ))}
</motion.div>

{/* Statistics */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

  <AnimatedCounter
    end={600}
    suffix="+"
    label="Books Published"
  />

  <AnimatedCounter
    end={1000000}
    suffix="+"
    label="Students"
  />

  <AnimatedCounter
    end={23}
    suffix="+"
    label="Years of Publishing"
  />

</div>

</motion.div>

{/* RIGHT SIDE */}

<motion.div
style={{
  rotateX,
  rotateY,
  transformStyle: "preserve-3d",
}}
initial={{
  opacity: 0,
  scale: 0.9,
}}
animate={{
  opacity: 1,
  scale: 1,
}}
transition={{
  duration: 1,
}}
className="relative flex items-center justify-center"
>

{/* Glass Circle */}

<div
  className="
  absolute
  w-[620px]
  h-[620px]
  rounded-full
  bg-white/40
  backdrop-blur-3xl
  border
  border-white/50
  shadow-[0_20px_80px_rgba(37,99,235,0.15)]
  "
/>

{/* Book Wheel */}

<BookWheel />

{/* Badge 1 */}

<motion.div
  animate={{
    y: [0, -12, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 4,
  }}
  className="
    absolute
    top-10
    right-0
    rounded-3xl
    bg-white
    shadow-2xl
    px-6
    py-5
  "
>

  <div className="flex items-center gap-2">

    <Star
      className="text-yellow-500"
      size={18}
      fill="currentColor"
    />

    <span className="font-bold text-gray-700">

      Trusted Brand

    </span>

  </div>

  <h2 className="mt-3 text-3xl font-black text-blue-600">

    600+

  </h2>

  <p className="text-gray-500">

    Premium Nursing Titles

  </p>

</motion.div>

{/* Badge 2 */}

<motion.div
  animate={{
    y: [0, 15, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 5,
  }}
  className="
    absolute
    bottom-14
    left-0
    rounded-3xl
    bg-white
    shadow-2xl
    px-6
    py-5
  "
>

  <div className="flex items-center gap-2">

    <GraduationCap
      className="text-green-600"
      size={20}
    />

    <span className="font-bold text-gray-700">

      Students

    </span>

  </div>

  <h2 className="mt-3 text-3xl font-black text-green-600">

    1,000,000+

  </h2>

  <p className="text-gray-500">

    Learning with Vijayam

  </p>

</motion.div>

{/* Badge 3 */}

<motion.div
  animate={{
    y: [0, -8, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 3,
  }}
  className="
    absolute
    bottom-32
    right-12
    rounded-2xl
    bg-blue-600
    text-white
    px-5
    py-4
    shadow-2xl
  "
>

  <div className="flex items-center gap-2">

    <Award size={18} />

    <span className="font-semibold">

      23+ Years

    </span>

  </div>

</motion.div>

</motion.div>

</div>

</div>
      {/* Bottom Trust Section */}

      <div className="relative z-10 border-t border-white/30 bg-white/40 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <BookOpen
                  className="text-blue-600"
                  size={28}
                />

              </div>

              <div>

                <h3 className="font-bold text-gray-800">

                  600+

                </h3>

                <p className="text-gray-500 text-sm">

                  Academic Titles

                </p>

              </div>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <GraduationCap
                  className="text-green-600"
                  size={28}
                />

              </div>

              <div>

                <h3 className="font-bold text-gray-800">

                  1,000,000+

                </h3>

                <p className="text-gray-500 text-sm">

                  Happy Students

                </p>

              </div>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">

                <Award
                  className="text-yellow-600"
                  size={28}
                />

              </div>

              <div>

                <h3 className="font-bold text-gray-800">

                  23+

                </h3>

                <p className="text-gray-500 text-sm">

                  Years Experience

                </p>

              </div>

            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

                <HeartPulse
                  className="text-red-500"
                  size={28}
                />

              </div>

              <div>

                <h3 className="font-bold text-gray-800">

                  INC

                </h3>

                <p className="text-gray-500 text-sm">

                  Syllabus Based

                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          hidden
          lg:flex
          flex-col
          items-center
          text-gray-500
        "
      >

        <span className="text-sm font-medium">

          Scroll Down

        </span>

        <ChevronRight
          size={20}
          className="rotate-90 mt-2"
        />

      </motion.div>

    </section>
  );
}
