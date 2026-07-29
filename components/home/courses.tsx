"use client";

/**
 * CoursesSection — "Pick Your Shelf"
 * ----------------------------------------------------------------
 * Three grouped, color-coded course clusters instead of one flat
 * grid — each group gets its own vivid gradient identity so the
 * page reads as organized *and* vibrant, never dark or flat.
 *
 *   Nursing Programs     → rose/pink → violet family
 *   Degree & Competitive → amber → orange family
 *   Vocational Training  → emerald → teal family
 *
 * Cards stay on a bright white surface (no black/navy panels) so
 * the color always comes from the icon badge, ribbon, and glow —
 * never from a dark background.
 * ----------------------------------------------------------------
 */

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  HeartPulse,
  Microscope,
  Stethoscope,
  Landmark,
  ArrowRight,
  Flame,
  Star,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* ------------------------------------------------------------------ */

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=JetBrains+Mono:wght@400;500;600&display=swap');
      .crs-root {
        --bg: #FCFAF5;
        --muted: #6B7080;
        --navy: #1B2A4A;
        font-family: 'Source Serif 4', Georgia, serif;
      }
      .crs-display { font-family: 'Fraunces', Georgia, serif; }
      .crs-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface Course {
  title: string;
  icon: LucideIcon;
  books: string;
  students: string;
  from: string;
  to: string;
  tag?: "Bestseller" | "Most Popular";
  blurb: string;
}

interface Group {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  glow: string;
  courses: Course[];
}

const GROUPS: Group[] = [
  {
    id: "nursing",
    label: "Nursing Programs",
    eyebrow: "Core Nursing",
    description: "The full nursing ladder — from ANM to B.Sc — in one shelf.",
    glow: "rgba(236,72,153,0.14)",
    courses: [
      {
        title: "B.Sc Nursing",
        icon: Stethoscope,
        books: "250+ Books",
        students: "18,200+ students",
        from: "#FB7185",
        to: "#E11D48",
        tag: "Bestseller",
        blurb: "Full 4-year curriculum, semester-wise.",
      },
      {
        title: "GNM",
        icon: HeartPulse,
        books: "150+ Books",
        students: "9,600+ students",
        from: "#F472B6",
        to: "#DB2777",
        blurb: "Diploma-aligned nursing & midwifery set.",
      },
      {
        title: "ANM",
        icon: GraduationCap,
        books: "120+ Books",
        students: "7,100+ students",
        from: "#C084FC",
        to: "#9333EA",
        blurb: "Foundational auxiliary nursing texts.",
      },
      {
        title: "Allied Healthcare",
        icon: Microscope,
        books: "180+ Books",
        students: "6,300+ students",
        from: "#A78BFA",
        to: "#7C3AED",
        blurb: "Lab tech, radiology & paramedical titles.",
      },
    ],
  },
  {
    id: "degree-competitive",
    label: "Degree & Competitive",
    eyebrow: "Beyond the Ward",
    description: "University-level texts and exam-ready prep, side by side.",
    glow: "rgba(249,115,22,0.14)",
    courses: [
      {
        title: "Degree",
        icon: Landmark,
        books: "100+ Books",
        students: "4,800+ students",
        from: "#FBBF24",
        to: "#D97706",
        blurb: "University degree-level allied texts.",
      },
      {
        title: "Competitive Exams",
        icon: BookOpen,
        books: "300+ Books",
        students: "21,400+ students",
        from: "#FB923C",
        to: "#EA580C",
        tag: "Most Popular",
        blurb: "Entrance & recruitment prep, solved papers.",
      },
    ],
  },
  {
    id: "vocational",
    label: "Vocational Training",
    eyebrow: "Hands-On Skills",
    description: "Practical, job-ready training programs and manuals.",
    glow: "rgba(16,185,129,0.14)",
    courses: [
      {
        title: "Vocational Training",
        icon: Wrench,
        books: "80+ Books",
        students: "3,200+ students",
        from: "#34D399",
        to: "#0D9488",
        blurb: "Skill-based, job-ready practical training guides.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Magnetic CTA                                                        */
/* ------------------------------------------------------------------ */

interface MagneticCTAProps {
  children: ReactNode;
  from: string;
  to: string;
}

function MagneticCTA({ children, from, to }: MagneticCTAProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy, background: `linear-gradient(120deg, ${from}, ${to})` }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
      className="group relative mt-6 w-full overflow-hidden rounded-xl py-3 font-medium text-white crs-mono text-[12px] tracking-wide uppercase flex items-center justify-center gap-2"
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="pointer-events-none absolute inset-0 bg-white/0 group-active:bg-white/20 transition-colors duration-150" />
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Course card — 3D tilt + cursor spotlight + ribbon + social proof    */
/* ------------------------------------------------------------------ */

interface CourseCardProps {
  course: Course;
  index: number;
}

function CourseCard({ course, index }: CourseCardProps) {
  const Icon = course.icon;
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="group relative rounded-3xl p-6 cursor-pointer bg-white"
      >
        <div
          className="absolute inset-0 rounded-3xl transition-shadow duration-300"
          style={{
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: hovered
              ? `0 26px 55px -20px ${course.to}66`
              : "0 8px 24px -16px rgba(0,0,0,0.12)",
          }}
        />

        {/* top accent bar */}
        <div
          className="absolute top-0 left-6 right-6 h-1 rounded-full"
          style={{ background: `linear-gradient(90deg, ${course.from}, ${course.to})` }}
        />

        {/* cursor spotlight */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(220px circle at ${gx}% ${gy}%, ${course.to}22, transparent 70%)`
            ),
          }}
        />

        {/* ribbon */}
        {course.tag && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 rounded-full px-3 py-1 crs-mono text-[9px] tracking-[0.12em] uppercase text-white shadow-md"
            style={{ background: `linear-gradient(120deg, ${course.from}, ${course.to})` }}
          >
            {course.tag === "Bestseller" ? <Star size={10} fill="white" /> : <Flame size={10} />}
            {course.tag}
          </div>
        )}

        <div className="relative z-10 pt-2" style={{ transform: "translateZ(20px)" }}>
          <motion.div
            animate={{ rotate: hovered ? [0, -6, 6, 0] : 0, scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 mx-auto"
            style={{
              background: `linear-gradient(150deg, ${course.from}, ${course.to})`,
              boxShadow: `0 10px 22px -8px ${course.to}99`,
            }}
          >
            <Icon size={28} strokeWidth={1.75} />
          </motion.div>

          <h3 className="crs-display text-lg font-semibold text-center text-[var(--navy)]">
            {course.title}
          </h3>

          <p className="text-center text-[13px] text-[var(--muted)] mt-1.5 leading-relaxed">
            {course.blurb}
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span
              className="crs-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full"
              style={{ background: `${course.to}18`, color: course.to }}
            >
              {course.books}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-[var(--muted)]">
            <Users size={12} style={{ color: course.to }} />
            <span className="crs-mono">{course.students}</span>
          </div>

          <MagneticCTA from={course.from} to={course.to}>
            Explore
          </MagneticCTA>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Group section — its own header + colored ambient glow + grid        */
/* ------------------------------------------------------------------ */

interface GroupSectionProps {
  group: Group;
}

function GroupSection({ group }: GroupSectionProps) {
  const firstAccent = group.courses[0];
  return (
    <div className="relative">
      {/* ambient color wash behind this group only */}
      <div
        className="absolute -inset-x-10 -inset-y-10 pointer-events-none rounded-[3rem]"
        style={{ background: `radial-gradient(60% 100% at 50% 0%, ${group.glow}, transparent 70%)` }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative flex items-end justify-between flex-wrap gap-4 mb-8"
      >
        <div>
          <span
            className="crs-mono inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold"
            style={{ color: firstAccent.to }}
          >
            {group.eyebrow}
          </span>
          <h3 className="crs-display text-3xl md:text-[34px] font-semibold text-[var(--navy)] mt-2">
            {group.label}
          </h3>
          <p className="text-[var(--muted)] mt-1.5 text-[15px]">{group.description}</p>
        </div>
        <span
          className="crs-mono text-[11px] tracking-wide px-3 py-1.5 rounded-full text-white shrink-0"
          style={{ background: `linear-gradient(120deg, ${firstAccent.from}, ${firstAccent.to})` }}
        >
          {group.courses.length} {group.courses.length === 1 ? "Program" : "Programs"}
        </span>
      </motion.div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {group.courses.map((course, i) => (
          <CourseCard key={course.title} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

function TrustStrip() {
  const items = ["23+ Years Publishing", "600+ Titles", "1M+ Students Reached"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10"
    >
      {items.map((item, i) => (
        <span key={i} className="crs-mono text-[11px] tracking-wide text-[var(--muted)] flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: ["#E11D48", "#EA580C", "#0D9488"][i] }}
          />
          {item}
        </span>
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export default function CoursesSection() {
  return (
    <section className="crs-root relative py-24 overflow-hidden" style={{ background: "var(--bg)" }}>
      <FontLoader />

      <div className="relative container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span
            className="crs-mono inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold px-4 py-1.5 rounded-full text-white"
            style={{ background: "linear-gradient(120deg, #FB7185, #9333EA, #0D9488)" }}
          >
            Explore
          </span>

          <h2 className="crs-display text-4xl md:text-5xl font-semibold mt-5 text-[var(--navy)]">
            Browse by Courses
          </h2>

          <p className="text-[var(--muted)] mt-4 max-w-2xl mx-auto text-[16px] leading-7">
            Discover premium academic books carefully organized for every
            healthcare course — trusted by students and faculty across India.
          </p>

          <TrustStrip />
        </motion.div>

        <div className="flex flex-col gap-20">
          {GROUPS.map((group) => (
            <GroupSection key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}