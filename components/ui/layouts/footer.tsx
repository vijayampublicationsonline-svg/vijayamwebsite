import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  BookOpen,
  Library,
  LucideIcon,
} from "lucide-react";

type PolicyLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "Publishers", href: "/publishers" },
  { name: "Contact", href: "/contact" },
];

const policyLinks: PolicyLink[] = [
  { name: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
  { name: "Return Policy", href: "/return-policy", icon: RotateCcw },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#030712] text-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.10),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  <span className="inline-flex items-center gap-3">
                    <BookOpen className="text-cyan-300" size={32} />
                    Vijayam Publications
                  </span>
                </h2>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {policyLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-200"
                    >
                      <Icon size={16} className="text-cyan-300 transition group-hover:scale-110" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-[#08111f]/80 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition duration-500 hover:scale-[1.01]">
              <div className="relative flex min-h-60 items-center justify-center overflow-hidden rounded-[1.2rem] border border-dashed border-cyan-400/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_55%)]" />
                <div className="absolute left-6 top-6 rotate-[-8deg] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md">
                  <Library className="text-cyan-300" size={24} />
                </div>
                <div className="absolute bottom-6 right-6 rotate-[10deg] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md">
                  <BookOpen className="text-cyan-300" size={24} />
                </div>
                <div className="relative text-center">
                  <MapPin size={26} className="mx-auto mb-3 text-cyan-300" />
                  <p className="text-sm text-slate-400">Map image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-slate-300 transition hover:text-cyan-300"
                  >
                    <ChevronRight size={16} className="transition group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="space-y-5 text-slate-300">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.22em] text-cyan-300">
                  Corporate Office
                </p>
                <div className="space-y-3 text-sm leading-7">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 text-cyan-300" size={18} />
                    <span>Vijayam Publications, Andhra Pradesh, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-cyan-300" size={18} />
                    <span>+91 8885414000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-cyan-300" size={18} />
                    <span>support@vijayampublications.com</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <p className="mb-2 text-sm uppercase tracking-[0.22em] text-cyan-300">
                  Head Office
                </p>
                <div className="space-y-3 text-sm leading-7">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 text-cyan-300" size={18} />
                    <span>Vijayam Publications, Andhra Pradesh, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-cyan-300" size={18} />
                    <span>+91 8885414666</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="space-y-3 text-sm leading-7 text-slate-300">
              <Link href="/privacy-policy" className="block transition hover:text-cyan-300">
                Privacy Policy
              </Link>
              <Link href="/return-policy" className="block transition hover:text-cyan-300">
                Return Policy
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="relative flex h-full min-h-[160px] items-center justify-center overflow-hidden rounded-[1rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_60%)]" />
              <div className="absolute left-5 top-5 rotate-[-10deg] rounded-2xl border border-white/10 bg-white/10 px-3 py-2 shadow-lg backdrop-blur-md">
                <BookOpen className="text-cyan-300" size={22} />
              </div>
              <div className="absolute right-5 bottom-5 rotate-[10deg] rounded-2xl border border-white/10 bg-white/10 px-3 py-2 shadow-lg backdrop-blur-md">
                <Library className="text-cyan-300" size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex md:items-center md:justify-between">
          <p>© {year} Vijayam Publications. All rights reserved.</p>
          <div className="mt-3 flex flex-wrap gap-4 md:mt-0">
            <Link href="/privacy-policy" className="transition hover:text-cyan-300">
              Privacy Policy
            </Link>
            <Link href="/return-policy" className="transition hover:text-cyan-300">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}