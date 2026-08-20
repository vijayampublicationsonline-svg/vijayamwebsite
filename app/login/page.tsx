"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Stars,
} from "lucide-react";

function FloatingBook({
  className,
  title,
  color,
}: {
  className: string;
  title: string;
  color: string;
}) {
  return (
    <div
      className={`absolute hidden w-32 rounded-xl border border-white/35 p-3 text-white shadow-2xl backdrop-blur-md lg:block ${className}`}
      style={{
        background: color,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="mb-7 h-1.5 w-10 rounded-full bg-white/70" />
      <BookOpen size={25} className="mb-3 text-[#FFF0A8]" />
      <p className="text-xs font-black leading-4">{title}</p>
      <div className="mt-4 h-1 w-full rounded-full bg-white/25" />
      <div className="mt-2 h-1 w-3/4 rounded-full bg-white/25" />
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Welcome back! Your secure login request has been submitted.");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff8e8] transition-colors duration-700 dark:bg-[#05070F]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(253,198,65,.42),transparent_25%),radial-gradient(circle_at_90%_85%,rgba(180,83,9,.30),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_15%,rgba(245,158,11,.25),transparent_27%),radial-gradient(circle_at_90%_85%,rgba(109,40,217,.28),transparent_30%),radial-gradient(circle_at_65%_30%,rgba(14,165,233,.14),transparent_25%)]" />
      <div className="absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-[#F3D27A]/35 blur-3xl dark:bg-[#F59E0B]/15" />
      <div className="absolute -bottom-48 -right-32 h-[38rem] w-[38rem] rounded-full bg-[#8C6D1F]/25 blur-3xl dark:bg-violet-700/20" />

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-screen overflow-hidden p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#221203_0%,#70400B_45%,#D49B20_100%)] dark:bg-[linear-gradient(135deg,#070B20_0%,#16123B_46%,#5B1C83_100%)]" />
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute -right-32 top-24 h-96 w-96 rounded-full border border-[#FFE79A]/45 bg-[#F3D27A]/15 shadow-[0_0_100px_rgba(255,206,80,.35)] dark:border-violet-300/30 dark:bg-violet-500/15" />
          <div className="absolute right-20 top-40 h-64 w-64 rounded-full border border-white/20 bg-white/5 backdrop-blur" />

          <FloatingBook
            title="Medical Surgical Nursing"
            color="linear-gradient(145deg, #7A3508, #E6A51D)"
            className="right-24 top-[26%] rotate-[14deg] animate-[bounce_6s_ease-in-out_infinite] dark:[background:linear-gradient(145deg,#1E3A8A,#7C3AED)]"
          />
          <FloatingBook
            title="Learn. Grow. Achieve."
            color="linear-gradient(145deg, #47300B, #B47716)"
            className="bottom-[18%] right-[36%] rotate-[-14deg] animate-[bounce_7s_ease-in-out_infinite] dark:[background:linear-gradient(145deg,#312E81,#BE185D)]"
          />

          <Link
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-[#FFF5CE] backdrop-blur transition hover:-translate-x-1 hover:bg-white/20"
          >
            <ArrowLeft size={17} /> Back to home
          </Link>

          <div className="relative z-10 max-w-xl" style={{ perspective: "1000px" }}>
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-white/35 bg-white/15 shadow-[12px_15px_0_rgba(47,24,3,.25)] backdrop-blur-xl transition-transform duration-500 hover:rotate-6 hover:scale-105 dark:shadow-[12px_15px_0_rgba(50,20,90,.35)]">
              <BookOpen size={38} className="text-[#FFF0A8]" />
            </div>
            <p className="mb-5 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-[#FFF0AB]">
              <Sparkles size={17} /> Vijayam Publications
            </p>
            <h1 className="text-6xl font-black leading-[1.05] tracking-tight">
              Your next chapter starts with confidence.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-white/80">
              A premium learning space for ambitious students, trusted books,
              and limitless academic progress.
            </p>

            <div className="mt-10 flex items-center gap-3 text-sm font-bold text-[#FFF3C6]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15">
                <ShieldCheck size={20} />
              </span>
              Secure access for every learner
            </div>
          </div>

          <p className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white/70">
            <Stars size={17} className="text-[#FFF0A8]" />
            Trusted by students across India
          </p>
        </section>

        <section className="relative flex items-center justify-center px-4 py-10 sm:px-8">
          <div className="relative w-full max-w-md" style={{ perspective: "1400px" }}>
            <div className="absolute -inset-5 rounded-[2.7rem] bg-gradient-to-br from-[#FDE68A]/55 via-transparent to-[#B7791F]/35 blur-2xl dark:from-amber-400/20 dark:to-violet-500/30" />
            <div className="relative rounded-[2.3rem] border border-white/70 bg-[#FFFDF5]/80 p-7 shadow-[0_30px_90px_rgba(104,75,12,.30),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-2xl transition duration-500 hover:[transform:rotateX(1deg)_rotateY(-1deg)_translateY(-4px)] sm:p-10 dark:border-white/15 dark:bg-[#101426]/80 dark:shadow-[0_35px_100px_rgba(0,0,0,.72),inset_0_1px_0_rgba(255,255,255,.1)]">
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FFF4CB]/70 px-4 py-2 text-sm font-bold text-[#8C6D1F] transition hover:-translate-x-1 lg:hidden dark:bg-white/5 dark:text-[#F3D27A]"
              >
                <ArrowLeft size={17} /> Back to home
              </Link>

              <div className="mb-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.3rem] bg-gradient-to-br from-[#FFF7BB] via-[#D4AF37] to-[#875610] text-[#2B2620] shadow-[8px_10px_20px_rgba(176,141,87,.34)] dark:from-[#FBBF24] dark:via-[#7C3AED] dark:to-[#1E3A8A] dark:text-white">
                  <ShieldCheck size={31} />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#B08D57] dark:text-amber-300">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#2B2620] dark:text-white">
                  Sign in to brilliance.
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#5C5346] dark:text-slate-300">
                  Continue your premium learning journey with Vijayam.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[#5C4A20] dark:text-amber-200">
                    Email address
                  </span>
                  <span className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/30 bg-white/75 px-4 shadow-sm transition focus-within:-translate-y-0.5 focus-within:border-[#B08D57] focus-within:ring-4 focus-within:ring-[#D4AF37]/15 dark:border-white/10 dark:bg-white/5 dark:focus-within:border-amber-300/60">
                    <Mail size={18} className="shrink-0 text-[#8C6D1F] dark:text-amber-300" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#2B2620] outline-none placeholder:text-[#5C5346]/55 dark:text-white"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[#5C4A20] dark:text-amber-200">
                    Password
                  </span>
                  <span className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/30 bg-white/75 px-4 shadow-sm transition focus-within:-translate-y-0.5 focus-within:border-[#B08D57] focus-within:ring-4 focus-within:ring-[#D4AF37]/15 dark:border-white/10 dark:bg-white/5 dark:focus-within:border-amber-300/60">
                    <LockKeyhole size={18} className="shrink-0 text-[#8C6D1F] dark:text-amber-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#2B2620] outline-none placeholder:text-[#5C5346]/55 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="rounded-lg p-1 text-[#8C6D1F] transition hover:bg-[#D4AF37]/15 dark:text-amber-300"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-[#5C5346] dark:text-slate-300">
                    <input type="checkbox" className="h-4 w-4 accent-[#8C6D1F]" />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="font-bold text-[#8C6D1F] hover:underline dark:text-amber-300">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#F8D76A] via-[#D4AF37] to-[#9B6010] px-5 py-4 font-extrabold text-[#2B2620] shadow-[0_18px_35px_rgba(176,141,87,.42)] transition hover:-translate-y-1 hover:shadow-[0_24px_42px_rgba(176,141,87,.52)] dark:bg-[linear-gradient(90deg,#F59E0B,#7C3AED,#2563EB)] dark:text-white"
                >
                  <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 transition duration-700 group-hover:left-[130%]" />
                  <span className="relative">Login securely</span>
                </button>
              </form>

              {message && (
                <p className="mt-5 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/15 px-4 py-3 text-center text-sm font-bold text-[#5C4A20] dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-200">
                  {message}
                </p>
              )}

              <p className="mt-7 text-center text-sm text-[#5C5346] dark:text-slate-300">
                New to Vijayam?{" "}
                <Link href="/register" className="font-bold text-[#8C6D1F] hover:underline dark:text-amber-300">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}