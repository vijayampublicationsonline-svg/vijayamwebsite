"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChevronDown,
  CircleDot,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Microscope,
  Orbit,
  Sparkles,
  Stethoscope,
  Users,
  Wrench,
} from "lucide-react";

type Course = {
  title: string;
  subtitle: string;
  addOns: string[];
  color: string;
  icon: typeof BookOpen;
};

type CourseGroup = {
  title: string;
  chapter: string;
  description: string;
  color: string;
  courses: Course[];
};

const groups: CourseGroup[] = [
  {
    title: "Nursing",
    chapter: "Chapter 01 / The Foundation",
    description: "A complete academic universe for the people who care for humanity.",
    color: "#f43f5e",
    courses: [
      { title: "B.Sc Nursing", subtitle: "The complete professional pathway", addOns: ["Semester Books", "Question Banks", "Practical Guides"], color: "#fb7185", icon: Stethoscope },
      { title: "Allied Health Sciences", subtitle: "Precision behind every diagnosis", addOns: ["Lab Manuals", "Clinical Notes", "Exam Prep"], color: "#e879f9", icon: Microscope },
      { title: "ANM", subtitle: "The first step into nursing", addOns: ["Field Guides", "Community Health", "Quick Revision"], color: "#c084fc", icon: HeartPulse },
      { title: "GNM", subtitle: "Diploma-aligned nursing mastery", addOns: ["Midwifery", "Medical-Surgical", "Solved Papers"], color: "#a78bfa", icon: GraduationCap },
      { title: "Post B.Sc Nursing", subtitle: "Level up your professional edge", addOns: ["Advanced Practice", "Research", "Leadership"], color: "#818cf8", icon: Brain },
      { title: "M.Sc Nursing", subtitle: "For the next generation of leaders", addOns: ["Speciality Texts", "Research Methods", "Thesis Support"], color: "#60a5fa", icon: Orbit },
      { title: "MPHW(F)", subtitle: "Community health in action", addOns: ["Public Health", "Field Work", "State Exams"], color: "#38bdf8", icon: Users },
      { title: "GFC", subtitle: "A practical launchpad", addOns: ["Foundation Texts", "Skill Modules", "Assessments"], color: "#22d3ee", icon: CircleDot },
      { title: "Vocational Intermediate", subtitle: "Skills that move with you", addOns: ["Trade Manuals", "Visual Learning", "Practice Sets"], color: "#2dd4bf", icon: Wrench },
      { title: "Bridge Course", subtitle: "Cross the gap with confidence", addOns: ["Transition Guides", "Core Concepts", "Rapid Revision"], color: "#34d399", icon: ArrowUpRight },
      { title: "Competitive Books", subtitle: "Prepare for your defining moment", addOns: ["Mock Tests", "Previous Papers", "Current Affairs"], color: "#fbbf24", icon: BriefcaseBusiness },
      { title: "Common Books", subtitle: "The dictionary of your journey", addOns: ["Dictionaries", "Reference Books", "Value Education"], color: "#f59e0b", icon: BookOpen },
    ],
  },
  {
    title: "Allied Health Sciences",
    chapter: "Chapter 02 / Precision & Practice",
    description: "Specialist knowledge for the professionals working beyond the ward.",
    color: "#06b6d4",
    courses: [
      { title: "MLS (4V)", subtitle: "Medical laboratory science", addOns: ["Four-Volume Set", "Lab Protocols", "Practical Records"], color: "#22d3ee", icon: FlaskConical },
      { title: "BPT / Physiotherapy", subtitle: "Movement, recovery, transformation", addOns: ["Anatomy", "Exercise Therapy", "Clinical Cases"], color: "#14b8a6", icon: HeartPulse },
      { title: "Optimetry", subtitle: "A clearer world begins here", addOns: ["Optics", "Clinical Practice", "Visual Charts"], color: "#10b981", icon: CircleDot },
      { title: "Anesthesia & OT", subtitle: "Calm precision under pressure", addOns: ["OT Techniques", "Anesthesia", "Surgical Procedures"], color: "#0ea5e9", icon: Microscope },
    ],
  },
  {
    title: "Degree",
    chapter: "Chapter 03 / Build Your Future",
    description: "University-level knowledge for ambitious minds and modern careers.",
    color: "#f59e0b",
    courses: [
      { title: "BCOM", subtitle: "Commerce for the real world", addOns: ["Accounting", "Business Law", "Exam Guides"], color: "#f59e0b", icon: BriefcaseBusiness },
      { title: "BA", subtitle: "Ideas that shape society", addOns: ["Humanities", "Social Science", "Reference Texts"], color: "#fb923c", icon: BookOpen },
      { title: "BSC", subtitle: "Discover how the world works", addOns: ["Core Science", "Practical Books", "Lab Support"], color: "#f97316", icon: FlaskConical },
      { title: "BBA", subtitle: "Lead the next big idea", addOns: ["Management", "Marketing", "Entrepreneurship"], color: "#ef4444", icon: BriefcaseBusiness },
      { title: "BCA", subtitle: "Code the future", addOns: ["Programming", "Database", "Project Guides"], color: "#ec4899", icon: Orbit },
      { title: "Common Value Added Courses", subtitle: "Knowledge beyond the syllabus", addOns: ["Communication", "Life Skills", "Career Readiness"], color: "#d946ef", icon: Sparkles },
    ],
  },
];

function TiltCard({ course, index }: { course: Course; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 });
  const Icon = course.icon;

  const move = (event: React.MouseEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.045, duration: 0.65 }}
      onMouseMove={move}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setActive(false);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative min-h-[310px] cursor-pointer rounded-[28px] border border-white/10 bg-white/[.075] p-6 backdrop-blur-xl transition-colors hover:bg-white/[.13]"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, ${course.color}38, transparent 65%)` }}
      />

      <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(35px)" }}>
        <div className="flex items-start justify-between">
          <motion.div
            animate={{ rotate: active ? [0, -8, 8, 0] : 0, scale: active ? 1.1 : 1 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
            style={{ background: `linear-gradient(135deg, ${course.color}, #ffffff22)`, boxShadow: `0 14px 35px ${course.color}55` }}
          >
            <Icon size={26} />
          </motion.div>
          <ArrowUpRight size={19} className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        <h3 className="mt-7 text-xl font-semibold tracking-tight">{course.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{course.subtitle}</p>

        <div className="mt-auto border-t border-white/10 pt-5">
          <span className="font-mono text-[9px] uppercase tracking-[.2em]" style={{ color: course.color }}>
            Add ons for this course
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {course.addOns.map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Group({ group, index }: { group: CourseGroup; index: number }) {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute -inset-x-20 top-0 h-96 opacity-20" style={{ background: `radial-gradient(ellipse at 50% 0%, ${group.color}55, transparent 68%)` }} />

      <motion.div
        initial={{ opacity: 0, x: -25 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[.3em]" style={{ color: group.color }}>
            {group.chapter}
          </span>
          <h2 className="mt-3 font-serif text-5xl font-semibold tracking-tight md:text-7xl">{group.title}</h2>
          <p className="mt-4 max-w-xl text-slate-400">{group.description}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="h-px w-12 bg-white/20" />
          {String(index + 1).padStart(2, "0")} / 03
        </div>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {group.courses.map((course, courseIndex) => (
          <TiltCard key={course.title} course={course} index={courseIndex} />
        ))}
      </div>
    </section>
  );
}

export default function FullCoursesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070914] text-white">
      <style>{`
        .full-courses-page {
          font-family: 'DM Sans', sans-serif;
          background:
            radial-gradient(circle at 50% -10%, rgba(124,58,237,.25), transparent 32%),
rgb(1, 1, 2);
        }
        .full-serif { font-family: 'Fraunces', Georgia, serif; }
      `}</style>

      <div className="full-courses-page relative min-h-screen">
        <div className="pointer-events-none fixed inset-0 opacity-[.035]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
          <a href="/" className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white">
            <ArrowLeft size={16} />
            Back to trailer
          </a>
          <span className="font-mono text-[10px] uppercase tracking-[.3em] text-slate-500">
            The complete catalogue
          </span>
        </header>

        <div className="relative mx-auto max-w-7xl px-6">
          <section className="flex min-h-[650px] flex-col justify-center py-24">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.35em] text-violet-300">
                <Sparkles size={15} />
                Courses hierarchy / Full feature
              </div>
              <h1 className="full-serif max-w-5xl text-6xl font-semibold leading-[.95] md:text-[110px]">
                Choose your
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  next chapter.
                </span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg leading-8 text-slate-400">
                An immersive 3D course experience where every subject feels alive
                through cinematic depth, floating motion, parallax, dynamic lighting,
                physics-inspired interactions, and scroll-driven animation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-20 flex items-center gap-3 text-xs text-slate-500"
            >
              <ChevronDown className="animate-bounce" size={18} />
              Scroll to explore the universe
            </motion.div>
          </section>

          {groups.map((group, index) => (
            <Group key={group.title} group={group} index={index} />
          ))}

          <footer className="border-t border-white/10 py-16 text-center">
            <p className="font-serif text-3xl">Your next chapter starts here.</p>
            <p className="mt-3 text-sm text-slate-500">Pick a course. Open a world.</p>
          </footer>
        </div>
      </div>
    </main>
  );
}