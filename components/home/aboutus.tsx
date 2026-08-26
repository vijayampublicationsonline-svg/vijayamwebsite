"use client";

import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  MoveUpRight,
  Zap,
  Stars,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  "Latest Curriculum-Based Publications",
  "Experienced Academic Authors",
  "Faculty Teaching Resources",
  "Print & Digital Learning Solutions",
  "Dedicated Support for Colleges & Institutions",
];

const stats = [
  { value: "1000+", label: "Academic Resources" },
  { value: "500+", label: "Books Published" },
  { value: "100+", label: "Expert Authors" },
  { value: "Pan India", label: "Nationwide Reach" },
];

const services = [
  {
    title: "Academic Books",
    description: "Focused learning material for modern healthcare education.",
    icon: BookOpen,
    color: "text-cyan-200",
    bg: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Student Success",
    description: "Resources designed to support confident learning.",
    icon: GraduationCap,
    color: "text-amber-200",
    bg: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Faculty Resources",
    description: "Practical tools for effective teaching and mentoring.",
    icon: Users,
    color: "text-emerald-200",
    bg: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "Institutional Support",
    description: "Reliable academic solutions for growing institutions.",
    icon: Building2,
    color: "text-violet-200",
    bg: "from-violet-500/20 to-fuchsia-500/20",
  },
];

export default function AboutUsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050816] py-8 text-white sm:py-10 lg:py-12">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(1000px_circle_at_0%_0%,rgba(14,165,233,0.2),transparent_45%),radial-gradient(800px_circle_at_100%_0%,rgba(168,85,247,0.16),transparent_40%),radial-gradient(900px_circle_at_50%_100%,rgba(245,158,11,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="pointer-events-none absolute left-[-70px] top-10 -z-10 h-52 w-52 rounded-full bg-cyan-500/25 blur-3xl animate-[floatY_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[-60px] top-16 -z-10 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl animate-[floatY_12s_ease-in-out_infinite_reverse]" />
      <div className="pointer-events-none absolute bottom-[-90px] left-1/3 -z-10 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl animate-[pulseGlow_9s_ease-in-out_infinite]" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[1.03fr_0.97fr] lg:gap-8">
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-[1.6rem] bg-gradient-to-br from-cyan-400/45 via-blue-500/20 to-violet-500/40 opacity-80 blur-sm" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/[0.08] p-4 shadow-[0_35px_90px_-30px_rgba(34,211,238,0.45)] backdrop-blur-2xl sm:p-5">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.12)_8%,transparent_40%,rgba(255,255,255,0.08)_75%,transparent_100%)]" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100 sm:text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  Elite Academic Brand
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Trusted
                </span>
              </div>

              <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-200">
                  <Zap className="h-3 w-3" />
                  Future Ready
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-300/30 bg-violet-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-200">
                  <Stars className="h-3 w-3" />
                  Skill Focused
                </span>
              </div>

              <div className="relative z-10 mt-4">
                <p className="text-xs font-medium text-cyan-200 sm:text-sm">
                  Shaping the future of healthcare education
                </p>
                <h2 className="mt-1 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                  Empowering
                  <span className="block bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 bg-clip-text text-transparent">
                    Nursing Education
                  </span>
                  <span className="block">Across India</span>
                </h2>
                <p className="mt-3 max-w-lg text-xs leading-6 text-slate-200 sm:text-sm">
                  Vijayam Publications delivers high-quality academic books,
                  faculty resources, and innovative learning solutions for
                  Nursing, GNM, ANM, Allied Healthcare, Degree, and Competitive
                  Examination students.
                </p>
              </div>

              <div className="relative z-10 mt-4 grid grid-cols-2 gap-2.5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group rounded-xl border border-white/10 bg-white/[0.09] p-2.5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.15]"
                  >
                    <p className="text-lg font-black text-white sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-4 text-slate-200">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-4 flex items-center gap-2 text-[11px] font-medium text-cyan-100 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_5px_rgba(74,222,128,0.2)]" />
                Building brighter academic futures
              </div>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-100 backdrop-blur-xl sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              About Vijayam Publications
            </span>

            <h2 className="mt-3 max-w-2xl text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Trusted by Students,
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Educators & Institutions
              </span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Our mission is to simplify healthcare education by creating
              curriculum-focused books and teaching resources that help
              students, faculty, and institutions achieve academic excellence.
            </p>

            <div className="mt-4 grid gap-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-sm transition duration-300 hover:border-cyan-300/35 hover:bg-white/[0.12]"
                >
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-cyan-300 via-blue-400 to-violet-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cyan-300 transition group-hover:scale-110 group-hover:text-emerald-300" />
                  <span className="text-xs font-medium text-slate-200 sm:text-sm">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.14]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 [background:linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.14)_50%,transparent_85%)]" />
                    <div
                      className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-gradient-to-br ${service.bg}`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${service.color}`} />
                    </div>
                    <h3 className="relative mt-2.5 text-sm font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="relative mt-1 text-xs leading-5 text-slate-300">
                      {service.description}
                    </p>
                    <MoveUpRight className="absolute bottom-3.5 right-3.5 h-4 w-4 text-slate-400 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-400/45"
              >
                Learn More
                <ArrowUpRight className="h-4.5 w-4.5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-bold text-slate-100 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-400/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -14px, 0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.85;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}