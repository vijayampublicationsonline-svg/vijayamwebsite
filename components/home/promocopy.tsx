"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  Sparkles,
  Layers3,
  BadgeInfo,
  Library,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Lecture Notes",
    text: "Structured notes prepared according to the latest syllabus.",
  },
  {
    icon: GraduationCap,
    title: "Teaching PPTs",
    text: "Ready-to-use classroom presentations.",
  },
  {
    icon: FileText,
    title: "Question Banks",
    text: "Unit-wise and university-wise practice questions.",
  },
  {
    icon: Download,
    title: "Instant Access",
    text: "Download free resources or unlock premium materials.",
  },
];

export default function PromoSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff7e6,transparent_22%),radial-gradient(circle_at_top_right,#e0f2fe,transparent_24%),radial-gradient(circle_at_bottom,#efe7ff,transparent_26%),linear-gradient(135deg,#f7f3ea,#eef4ff_48%,#f8f0ff)] py-24 text-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent_45%)]" />

      <div className="pointer-events-none absolute left-[-90px] top-12 h-80 w-80 rounded-full bg-amber-200/35 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-[-100px] top-24 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-[-110px] left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-fuchsia-200/22 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute left-[10%] top-[14%] flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/70 bg-white/45 shadow-2xl backdrop-blur-xl animate-[float_7s_ease-in-out_infinite]">
        <BookOpen className="h-8 w-8 text-cyan-700" />
      </div>
      <div className="pointer-events-none absolute right-[11%] top-[18%] flex h-24 w-24 items-center justify-center rounded-[2rem] border border-cyan-200/70 bg-cyan-100/55 shadow-2xl backdrop-blur-xl animate-[orbit_14s_linear_infinite]">
        <Library className="h-9 w-9 text-cyan-800" />
      </div>
      <div className="pointer-events-none absolute bottom-[16%] left-[12%] flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-fuchsia-200/70 bg-fuchsia-100/55 shadow-2xl backdrop-blur-xl animate-[float_6s_ease-in-out_infinite]">
        <Sparkles className="h-7 w-7 text-fuchsia-700" />
      </div>
      <div className="pointer-events-none absolute right-[16%] bottom-[20%] flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-emerald-200/70 bg-emerald-100/55 shadow-2xl backdrop-blur-xl animate-[spin_18s_linear_infinite]">
        <Layers3 className="h-6 w-6 text-emerald-700" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-5 py-2 text-sm font-medium text-slate-700 backdrop-blur-xl shadow-sm">
              <BadgeInfo className="h-4 w-4 text-cyan-700" />
              Faculty Resource Centre
            </div>

            <h2 className="mt-8 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Everything a Nursing
              <br />
              Educator Needs
              <br />
              <span className="bg-gradient-to-r from-cyan-700 via-slate-900 to-fuchsia-700 bg-clip-text text-transparent">
                In One Place.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
              Save hours of preparation with professionally designed lecture notes, PowerPoint presentations,
              lesson plans, question banks, practical manuals, previous papers and teaching guides.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/faculty-resources"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_24px_60px_rgba(15,23,42,0.28)]"
              >
                Explore Resources
                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:rotate-[-12deg]" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center rounded-full border border-slate-900/10 bg-white/75 px-7 py-4 font-semibold text-slate-900 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-cyan-400/40 hover:bg-white"
              >
                Join Free
              </Link>
            </div>

</div>
          <div className="relative perspective-[1400px]">
            <div className="absolute -left-8 top-8 h-24 w-24 rotate-[-18deg] rounded-3xl border border-slate-900/10 bg-white/75 shadow-2xl backdrop-blur-xl animate-[float_6s_ease-in-out_infinite]" />
            <div className="absolute right-4 top-0 h-20 w-20 rotate-[24deg] rounded-3xl border border-cyan-300/30 bg-cyan-200/70 shadow-2xl backdrop-blur-xl animate-[float_7s_ease-in-out_infinite]" />
            <div className="absolute bottom-6 left-10 h-16 w-16 rotate-[12deg] rounded-2xl border border-fuchsia-300/30 bg-fuchsia-200/70 shadow-2xl backdrop-blur-xl animate-[float_5.5s_ease-in-out_infinite]" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:rotate-[-1deg]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.75),transparent_25%,transparent_75%,rgba(255,255,255,0.35))]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_34%)]" />

              <div className="grid grid-cols-2 gap-4">
                {features.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-3xl border border-slate-900/10 bg-white/80 p-6 shadow-lg transition duration-500 hover:-translate-y-3 hover:rotate-[-1.5deg] hover:border-cyan-400/30 hover:bg-white"
                      style={{
                        animation: `float 6s ease-in-out infinite`,
                        animationDelay: `${index * 180}ms`,
                      }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_45%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                      <div className="relative">
                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-950/5 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition duration-500 group-hover:rotate-[12deg] group-hover:scale-110">
                          <Icon className="h-6 w-6 text-cyan-700" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-3xl border border-slate-900/10 bg-white/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Trusted by Educators</p>
                    <h3 className="mt-1 text-2xl font-semibold text-slate-900">Faculty Resource Centre</h3>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/30 bg-cyan-100/90 p-3 shadow-lg animate-[spin_18s_linear_infinite]">
                    <Layers3 className="h-6 w-6 text-cyan-700" />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="text-2xl font-bold text-cyan-700">1000+</h4>
                    <p className="mt-1 text-xs text-slate-500">Resources</p>
                  </div>
                  <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="text-2xl font-bold text-slate-900">Free</h4>
                    <p className="mt-1 text-xs text-slate-500">Downloads</p>
                  </div>
                  <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <h4 className="text-2xl font-bold text-emerald-700">Premium</h4>
                    <p className="mt-1 text-xs text-slate-500">Collection</p>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/60 bg-white/30 blur-2xl animate-[pulse_6s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(2deg);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(16px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(16px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}