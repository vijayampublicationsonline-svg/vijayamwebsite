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
    color: "text-cyan-300",
    bg: "bg-cyan-400/10",
    glow: "group-hover:shadow-cyan-400/20",
  },
  {
    title: "Student Success",
    description: "Resources designed to support confident learning.",
    icon: GraduationCap,
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    glow: "group-hover:shadow-amber-400/20",
  },
  {
    title: "Faculty Resources",
    description: "Practical tools for effective teaching and mentoring.",
    icon: Users,
    color: "text-emerald-300",
    bg: "bg-emerald-400/10",
    glow: "group-hover:shadow-emerald-400/20",
  },
  {
    title: "Institutional Support",
    description: "Reliable academic solutions for growing institutions.",
    icon: Building2,
    color: "text-violet-300",
    bg: "bg-violet-400/10",
    glow: "group-hover:shadow-violet-400/20",
  },
];

export default function AboutUsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 py-16 text-white sm:py-20 lg:py-28">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(14,165,233,0.16),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(245,158,11,0.14),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 animate-[drift_12s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-96 w-96 animate-[drift_15s_ease-in-out_infinite_reverse] rounded-full bg-amber-500/15 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* 3D feature panel */}
          <div className="relative mx-auto w-full max-w-xl [perspective:1600px]">
            <div className="absolute -left-5 top-10 h-24 w-24 animate-[float_6s_ease-in-out_infinite] rounded-3xl bg-amber-400/80 shadow-2xl shadow-amber-400/30 blur-[1px] sm:-left-8 sm:h-32 sm:w-32" />
            <div className="absolute -bottom-8 -right-5 h-28 w-28 animate-[float_7s_ease-in-out_infinite_reverse] rounded-full border-[18px] border-cyan-300/70 sm:-right-8 sm:h-36 sm:w-36" />

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-[0_35px_100px_-25px_rgba(14,165,233,0.45)] backdrop-blur-2xl transition duration-700 [transform-style:preserve-3d] hover:-translate-y-3 hover:rotate-x-2 hover:rotate-y-2 hover:shadow-cyan-400/20 sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl transition duration-700 group-hover:scale-150" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-blue-500/10" />
              <div className="pointer-events-none absolute -inset-full rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-1000 group-hover:translate-x-full" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-100 backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 animate-pulse text-amber-300" />
                  Trusted Publisher
                </span>

                <div className="animate-[float_5s_ease-in-out_infinite] rounded-2xl bg-amber-400 p-3 text-slate-950 shadow-lg shadow-amber-900/30">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>

              <div className="relative z-10 mt-12">
                <p className="mb-3 text-sm font-medium text-cyan-200">
                  Shaping the future of healthcare education
                </p>

                <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                  Empowering
                  <span className="block bg-gradient-to-r from-amber-200 via-amber-300 to-orange-400 bg-clip-text text-transparent">
                    Nursing Education
                  </span>
                  <span className="block">Across India</span>
                </h2>

                <p className="mt-7 max-w-lg text-sm leading-7 text-blue-100 sm:text-base">
                  Vijayam Publications delivers high-quality academic books,
                  faculty resources, and innovative learning solutions for
                  Nursing, GNM, ANM, Allied Healthcare, Degree, and Competitive
                  Examination students.
                </p>
              </div>

              <div className="relative z-10 mt-10 grid grid-cols-2 gap-3 sm:gap-5">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group/stat rounded-2xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-300/30 hover:bg-white/[0.15] sm:p-5"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <p className="text-2xl font-black text-amber-300 transition group-hover/stat:scale-105 sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-blue-100 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-3 text-xs font-medium text-cyan-100">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                Building brighter academic futures
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-bold text-blue-200 backdrop-blur-xl">
              About Vijayam Publications
            </span>

            <h2 className="mt-6 max-w-2xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trusted by Students,
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Educators & Institutions
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Our mission is to simplify healthcare education by creating
              curriculum-focused books and teaching resources that help
              students, faculty, and institutions achieve academic excellence.
            </p>

            <div className="mt-8 space-y-4">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight}
                  className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition duration-300 hover:translate-x-2 hover:border-cyan-300/20 hover:bg-white/[0.08]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-400 transition group-hover:scale-110 group-hover:text-amber-300" />
                  <span className="text-sm font-medium text-slate-200 sm:text-base">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.title}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:rotate-1 hover:border-white/25 hover:bg-white/[0.13] hover:shadow-2xl sm:p-6 ${service.glow}`}
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/10 transition duration-700 group-hover:scale-[3]" />

                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 ${service.bg} transition duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <Icon className={`h-6 w-6 ${service.color}`} />
                    </div>

                    <h3 className="relative mt-5 text-sm font-bold text-white sm:text-base">
                      {service.title}
                    </h3>
                    <p className="relative mt-2 text-xs leading-5 text-slate-400">
                      {service.description}
                    </p>

                    <MoveUpRight className="absolute bottom-5 right-5 h-4 w-4 text-slate-500 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-400/40"
              >
                Learn More
                <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-cyan-300/40 bg-white/[0.04] px-7 py-4 text-center font-bold text-cyan-200 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-400/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(4deg);
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(35px, -25px, 0) scale(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}