"use client"

import { useEffect, useMemo, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Library,
  Sparkles,
} from "lucide-react"

interface CatalogueCategory {
  id: number
  title: string
  description: string
  icon: typeof BookOpen
  color: string
}

interface Statistic {
  label: string
  value: string
}

interface FeatureChip {
  id: number
  label: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.25 },
  },
}

const bookFloat = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 1.5, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} satisfies Variants

const categories: CatalogueCategory[] = [
  {
    id: 1,
    title: "B.Sc Nursing",
    description: "Semester-wise books",
    icon: GraduationCap,
    color: "#2563eb",
  },
  {
    id: 2,
    title: "P.B.B.Sc",
    description: "Advanced nursing titles",
    icon: Library,
    color: "#0891b2",
  },
  {
    id: 3,
    title: "Medical",
    description: "Reference collection",
    icon: HeartPulse,
    color: "#7c3aed",
  },
]

const statistics: Statistic[] = [
  { label: "Books", value: "600+" },
  { label: "Students", value: "1000000L+" },
  { label: "Colleges", value: "800+" },
]

const featureChips: FeatureChip[] = [
  { id: 1, label: "Latest Editions" },
  { id: 2, label: "INC Syllabus" },
  { id: 3, label: "Previous Papers" },
]

export default function CatalogueHero() {
  const [activeCategory, setActiveCategory] = useState(0)

  const activeItem = useMemo(
    () => categories[activeCategory],
    [activeCategory]
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 })

  const glowX = useTransform(springX, (v) => `${v}px`)
  const glowY = useTransform(springY, (v) => `${v}px`)

  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(59,130,246,.22), transparent 45%)`

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % categories.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />

      <motion.div
        className="absolute left-1/2 top-32 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-400/20 blur-[140px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ background: spotlight }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          {/* ========================= */}
          {/* Left Column - Hero Content */}
          {/* ========================= */}
          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col justify-center"
          >
            {/* Premium Badge */}
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-5 py-2 backdrop-blur-xl shadow-lg"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold tracking-wide text-slate-700">
                Premium Nursing Book Collection
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-7xl"
            >
              India's Most
              <br />
              Trusted
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                Nursing Library
              </span>
            </motion.h1>

            {/* Animated Category Title */}
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="mt-6 flex items-center gap-3"
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: activeItem.color }}
              />
              <h2 className="text-2xl font-bold text-blue-700 lg:text-3xl">
                {activeItem.title}
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-xl font-semibold text-slate-700"
            >
              Designed for Future Healthcare Professionals.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
            >
              Discover premium nursing textbooks carefully prepared according to
              the latest INC syllabus. Every edition includes updated concepts,
              university examination papers, illustrations, clinical insights,
              and practical learning resources trusted by students and faculty
              across India.
            </motion.p>

            {/* Category Switcher */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-3"
            >
              {categories.map((category, index) => {
                const Icon = category.icon

                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCategory(index)}
                    className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition-all"
                  >
                    {/* Active Tab Animation */}
                    {activeCategory === index && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}

                    <span
                      className={`relative flex items-center gap-2 font-semibold ${
                        activeCategory === index
                          ? "text-white"
                          : "text-slate-700"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {category.title}
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Feature Chips */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              {featureChips.map((chip) => (
                <motion.div
                  key={chip.id}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                >
                  {chip.label}
                </motion.div>
              ))}
            </motion.div>

            {/* Statistics Cards */}
            <motion.div
              variants={staggerContainer}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <motion.div
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="rounded-3xl border border-slate-200 bg-white/80 p-5 backdrop-blur-xl"
              >
                <motion.div variants={cardHover}>
                  <h3 className="text-3xl font-black text-blue-600">650+</h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    Books
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="rounded-3xl border border-slate-200 bg-white/80 p-5 backdrop-blur-xl"
              >
                <motion.div variants={cardHover}>
                  <h3 className="text-3xl font-black text-cyan-600">5000+</h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    colleges
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="rounded-3xl border border-slate-200 bg-white/80 p-5 backdrop-blur-xl"
              >
                <motion.div variants={cardHover}>
                  <h3 className="text-3xl font-black text-indigo-600">23+</h3>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    years of publishing
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center gap-5"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-2xl shadow-blue-500/30"
              >
               Download Catalogue 
                <ArrowRight className="h-5 w-5" />
              </motion.button> 

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-lg"
              >
                <BookOpen className="h-5 w-5" />
                View Sample Books
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500"
            >
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                INC Syllabus Based
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Faculty Recommended
              </div>

              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                Latest University Papers
              </div>
            </motion.div>
          </motion.div>
                    {/* ========================= */}
          {/* Right Column - Premium Showcase */}
          {/* ========================= */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Soft Ambient Glow */}
            <motion.div
              className="absolute h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-[120px]"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Floating Medical Icons */}
            <motion.div
              className="absolute -left-10 top-8 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-xl"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <HeartPulse className="h-7 w-7 text-red-500" />
            </motion.div>

            <motion.div
              className="absolute right-0 top-20 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-xl"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
            >
              <GraduationCap className="h-7 w-7 text-blue-600" />
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-8 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-xl"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <Library className="h-7 w-7 text-cyan-600" />
            </motion.div>

            

            {/* Premium Book Wrapper */}
            <motion.div
              variants={bookFloat}
              animate="animate"
              whileHover={{
                rotateY: 12,
                rotateX: -6,
                scale: 1.03,
              }}
              style={{
                rotateY: useTransform(springX, [0, 900], [-8, 8]),
                rotateX: useTransform(springY, [0, 700], [8, -8]),
                transformStyle: "preserve-3d",
                perspective: 1600,
              }}
              className="relative h-[560px] w-[380px]"
            >
              {/* Book Shadow */}
              <motion.div
                className="absolute left-1/2 top-full h-12 w-72 -translate-x-1/2 rounded-full bg-slate-900/30 blur-3xl"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.28, 0.4, 0.28],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />

              {/* Layered Pages */}
              <div className="absolute left-[18px] top-[10px] h-[520px] w-[332px] rounded-[24px] bg-slate-100 shadow-inner" />

              <div className="absolute left-[14px] top-[8px] h-[522px] w-[336px] rounded-[24px] bg-white shadow-inner" />

              <div className="absolute left-[10px] top-[6px] h-[524px] w-[340px] rounded-[24px] bg-slate-50 shadow-inner" />

              {/* Spine */}
              <div className="absolute left-0 top-0 h-[530px] w-8 rounded-l-[30px] bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 shadow-2xl" />

              {/* Back Cover */}
              <div className="absolute left-3 top-2 h-[526px] w-[345px] rounded-[28px] bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl" />

              {/* Front Cover */}
              <motion.div
                whileHover={{
                  rotateY: -10,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/20 bg-gradient-to-br from-blue-700 via-cyan-600 to-indigo-700 shadow-[0_35px_80px_rgba(0,0,0,0.35)]"
              >
                {/* Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />

                <div className="absolute -left-10 top-0 h-full w-20 rotate-12 bg-white/10 blur-2xl" />

                {/* Decorative Glow */}
                <motion.div
                  className="absolute left-1/2 top-24 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-300/30 blur-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />

                {/* Bestseller Ribbon */}
                <div className="absolute right-[-48px] top-8 rotate-45 bg-amber-400 px-14 py-2 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-xl">
                  Bestseller
                </div>

                {/* Premium Edition Badge */}
                <div className="absolute left-6 top-6 rounded-full bg-white/20 px-4 py-2 backdrop-blur-xl">
                  <span className="text-xs font-bold tracking-wider text-white">
                    PREMIUM EDITION
                  </span>
                </div>

                {/* Book Content */}
                <div className="relative flex h-full flex-col justify-between p-10">
                  <div>
                    <div className="mb-5 inline-flex rounded-full bg-white/20 p-4 backdrop-blur-xl">
                      <BookOpen className="h-10 w-10 text-white" />
                    </div>

                    <h2 className="text-4xl font-black leading-tight text-white">
                      Nursing
                      <br />
                      Master
                      <br />
                      Series
                    </h2>

                    <p className="mt-5 text-base leading-7 text-blue-100">
                      Complete INC syllabus with university previous papers,
                      clinical concepts, illustrations and practical learning.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="h-1.5 rounded-full bg-white/30" />
                    <div className="h-1.5 w-4/5 rounded-full bg-white/30" />
                    <div className="h-1.5 w-3/5 rounded-full bg-white/30" />

                    <div className="pt-6">
                      <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-xl">
                        Vijayam Publications
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hover Border */}
              <motion.div
                className="absolute inset-0 rounded-[30px] border-2 border-cyan-300/30"
                whileHover={{
                  borderColor: "rgba(255,255,255,0.8)",
                }}
              />
            </motion.div>
          </motion.div>
          {/* ===== End Premium Book Showcase ===== */}
                    {/* ========================= */}
          {/* Premium Features Section */}
          {/* ========================= */}
          <motion.div
            variants={fadeUp}
            className="mt-20 space-y-8"
          >
            {/* Section Header */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3"
            >
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-900">
                Why Students Choose Vijayam Publications
              </h3>
            </motion.div>

            {/* 2×2 Feature Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-5 sm:grid-cols-2"
            >
              {/* INC Syllabus */}
              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-3xl border border-blue-200/30 bg-white/70 p-6 backdrop-blur-xl shadow-xl"
              >
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  animate={{
                    rotate: [0, 6, -6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="relative mb-5 inline-flex rounded-2xl bg-blue-100 p-4"
                >
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </motion.div>

                <h4 className="relative text-xl font-bold text-slate-900">
                  INC Syllabus
                </h4>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  Updated according to the latest Indian Nursing Council
                  curriculum with semester-wise structured learning.
                </p>
              </motion.div>

              {/* Previous Papers */}
              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-cyan-200/30 bg-white/70 p-6 backdrop-blur-xl shadow-xl"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="relative mb-5 inline-flex rounded-2xl bg-cyan-100 p-4"
                >
                  <BookOpen className="h-8 w-8 text-cyan-600" />
                </motion.div>

                <h4 className="relative text-xl font-bold text-slate-900">
                  Previous Papers
                </h4>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  Includes solved and previous examination papers from leading
                  nursing universities across India.
                </p>
              </motion.div>

              {/* Clinical Skills */}
              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-red-200/30 bg-white/70 p-6 backdrop-blur-xl shadow-xl"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/15 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="relative mb-5 inline-flex rounded-2xl bg-red-100 p-4"
                >
                  <HeartPulse className="h-8 w-8 text-red-500" />
                </motion.div>

                <h4 className="relative text-xl font-bold text-slate-900">
                  Clinical Skills
                </h4>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  Real clinical procedures, nursing care plans, illustrations,
                  and practical hospital-based concepts.
                </p>
              </motion.div>

              {/* Expert Authors */}
              <motion.div
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-violet-200/30 bg-white/70 p-6 backdrop-blur-xl shadow-xl"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/15 to-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <motion.div
                  animate={{
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                  }}
                  className="relative mb-5 inline-flex rounded-2xl bg-violet-100 p-4"
                >
                  <Sparkles className="h-8 w-8 text-violet-600" />
                </motion.div>

                <h4 className="relative text-xl font-bold text-slate-900">
                  Expert Authors
                </h4>

                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  Written and reviewed by experienced nursing educators,
                  professors, clinicians, and healthcare experts.
                </p>
              </motion.div>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 rounded-3xl border border-white/40 bg-white/70 p-6 backdrop-blur-xl shadow-lg"
            >
              <div className="text-center">
                <h5 className="text-3xl font-black text-blue-600">23+</h5>
                <p className="mt-2 text-sm text-slate-600">
                  Years Experience
                </p>
              </div>

              <div className="text-center">
                <h5 className="text-3xl font-black text-cyan-600">10L+</h5>
                <p className="mt-2 text-sm text-slate-600">
                  Happy Students
                </p>
              </div>

              <div className="text-center">
                <h5 className="text-3xl font-black text-indigo-600">600+</h5>
                <p className="mt-2 text-sm text-slate-600">
                  Premium Titles
                </p>
              </div>
            </motion.div>

            {/* Student Trust Badge */}
            <motion.div
              variants={fadeUp}
              whileHover={{
                scale: 1.03,
              }}
              className="flex flex-col items-center justify-center rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 text-center shadow-xl sm:flex-row sm:justify-between"
            >
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Trusted by Nursing Students Nationwide
                </h4>

                <p className="mt-2 text-slate-600">
                  Recommended by faculty members, institutions, and healthcare
                  professionals throughout India.
                </p>
              </div>

              <div className="mt-5 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white shadow-lg sm:mt-0">
                ★ 4.9 Student Rating
              </div>
            </motion.div>
          </motion.div>
          {/* ===== End Features Section ===== */}
                    {/* ========================= */}
          {/* Final CTA Section */}
          {/* ========================= */}
          <motion.div
            variants={fadeUp}
            className="relative mt-24 overflow-hidden rounded-[40px] border border-blue-200/30 bg-gradient-to-br from-blue-700 via-cyan-600 to-indigo-700 p-10 text-white shadow-[0_30px_80px_rgba(37,99,235,0.35)] lg:p-16"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative z-10 text-center">
              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className="mx-auto max-w-4xl text-4xl font-black leading-tight lg:text-6xl"
              >
                Start Your Nursing Success Journey Today
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100"
              >
                Discover India's trusted collection of premium nursing textbooks,
                previous university papers, clinical learning resources, and
                updated INC syllabus editions designed for every nursing student.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap justify-center gap-5"
              >
               <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Browse Catalogue"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-blue-700 shadow-2xl" 
                >
                  <BookOpen className="h-5 w-5" />
                  Browse Catalogue
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Download Catalogue PDF"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-xl"
                >
                  <ArrowRight className="h-5 w-5" />
                  Download Catalogue
                </motion.button>
              </motion.div>

              {/* Trust Statistics */}
              <motion.div
                variants={staggerContainer}
                className="mt-14 grid gap-6 sm:grid-cols-3"
              >
                <motion.div variants={fadeUp}>
                  <h3 className="text-4xl font-black">500+</h3>
                  <p className="mt-2 text-blue-100">
                    Books Published
                  </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <h3 className="text-4xl font-black">5000+</h3>
                  <p className="mt-2 text-blue-100">
                    Colleges Covered
                  </p>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <h3 className="text-4xl font-black">23+</h3>
                  <p className="mt-2 text-blue-100">
                    Years of Excellence
                  </p>
                </motion.div>
              </motion.div>

              {/* Subject Marquee */}
              <div className="relative mt-16 overflow-hidden rounded-full border border-white/20 bg-white/10 py-4 backdrop-blur-xl">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                  className="flex w-max gap-12 whitespace-nowrap font-semibold text-white"
                >
                  {[
                    "Medical Surgical Nursing",
                    "Community Health Nursing",
                    "Child Health Nursing",
                    "Mental Health Nursing",
                    "Midwifery",
                    "Nutrition & Dietetics",
                    "Pharmacology",
                    "Anatomy",
                    "Physiology",
                    "Microbiology",
                    "Pathology",
                    "Psychology",
                    "Sociology",
                    "Nursing Research",
                    "Nursing Education",
                    "Leadership & Management",
                    "Medical Surgical Nursing",
                    "Community Health Nursing",
                    "Child Health Nursing",
                    "Mental Health Nursing",
                  ].map((item, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      {item}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Decorative Footer Gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
          </motion.div>

          {/* ===== End CTA Section ===== */}
        </motion.div>
      </div>
    </section>
  )
}