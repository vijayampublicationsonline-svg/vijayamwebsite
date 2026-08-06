"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  Search,
  SunMedium,
  MoonStar,
  Mic,
  Languages,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

const categories = [
  { key: "home", href: "/" },
  { key: "courses", href: "/books" },
  { key: "shopNow", href: "/categories" },
  { key: "catalogues", href: "/publishers" },
  { key: "promoCopy", href: "/new-arrivals" },
  { key: "joinAuthor", href: "/best-sellers" },
  { key: "aboutUs", href: "/contact" },
];

const languages = ["English", "Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Gujarati"] as const;

const translations: Record<(typeof languages)[number], Record<string, string>> = {
  English: {
    home: "Home",
    courses: "Courses",
    shopNow: "Shop Now",
    catalogues: "Catalogues",
    promoCopy: "Promo Copy",
    joinAuthor: "Join as an Author",
    aboutUs: "About Us",
    search: "Search ISBN / Book Name",
    dayMode: "Day Mode",
    nightMode: "Night Mode",
    login: "Login",
  },
  Telugu: {
    home: "హోమ్",
    courses: "కోర్సులు",
    shopNow: "ఇప్పుడు కొనండి",
    catalogues: "క్యాటలాగ్స్",
    promoCopy: "ప్రోమో కాపీ",
    joinAuthor: "రచయితగా చేరండి",
    aboutUs: "మా గురించి",
    search: "ISBN / పుస్తక పేరు వెతకండి",
    dayMode: "పగటి మోడ్",
    nightMode: "రాత్రి మోడ్",
    login: "లాగిన్",
  },
  Hindi: {
    home: "होम",
    courses: "कोर्स",
    shopNow: "अभी खरीदें",
    catalogues: "कैटलॉग",
    promoCopy: "प्रोमो कॉपी",
    joinAuthor: "लेखक बनें",
    aboutUs: "हमारे बारे में",
    search: "ISBN / पुस्तक नाम खोजें",
    dayMode: "दिन मोड",
    nightMode: "रात मोड",
    login: "लॉगिन",
  },
  Tamil: {
    home: "முகப்பு",
    courses: "பாடநெறிகள்",
    shopNow: "இப்போது வாங்கவும்",
    catalogues: "கட்டலாக்கள்",
    promoCopy: "ப்ரோமோ நகல்",
    joinAuthor: "ஆசிரியராக சேரவும்",
    aboutUs: "எங்களை பற்றி",
    search: "ISBN / புத்தக பெயரை தேடு",
    dayMode: "பகல் முறை",
    nightMode: "இரவு முறை",
    login: "உள்நுழை",
  },
  Kannada: {
    home: "ಮುಖಪುಟ",
    courses: "ಕೋರ್ಸ್‌ಗಳು",
    shopNow: "ಈಗ ಖರೀದಿಸಿ",
    catalogues: "ಕ್ಯಾಟಲಾಗ್‌ಗಳು",
    promoCopy: "ಪ್ರೊಮೋ ಪ್ರತಿಯು",
    joinAuthor: "ಲೇಖಕರಾಗಿ ಸೇರಿ",
    aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
    search: "ISBN / ಪುಸ್ತಕದ ಹೆಸರನ್ನು ಹುಡುಕಿ",
    dayMode: "ದಿನ ಮೋಡ್",
    nightMode: "ರಾತ್ರಿ ಮೋಡ್",
    login: "ಲಾಗಿನ್",
  },
  Malayalam: {
    home: "ഹോം",
    courses: "കോഴ്‌സുകൾ",
    shopNow: "ഇപ്പോൾ വാങ്ങൂ",
    catalogues: "കാറ്റലോഗുകൾ",
    promoCopy: "പ്രോമോ കോപ്പി",
    joinAuthor: "ലേഖകനായി ചേരുക",
    aboutUs: "ഞങ്ങളെ കുറിച്ച്",
    search: "ISBN / പുസ്തകത്തിന്റെ പേര് തിരയുക",
    dayMode: "പകൽ മോഡ്",
    nightMode: "രാത്രി മോഡ്",
    login: "ലോഗിൻ",
  },
  Gujarati: {
    home: "હોમ",
    courses: "કોર્સીસ",
    shopNow: "હવે ખરીદો",
    catalogues: "કેટલોગ્સ",
    promoCopy: "પ્રોમો કૉપી",
    joinAuthor: "લેખક તરીકે જોડાઓ",
    aboutUs: "અમારા વિશે",
    search: "ISBN / પુસ્તકનું નામ શોધો",
    dayMode: "દિવસ મોડ",
    nightMode: "રાત મોડ",
    login: "લોગિન",
  },
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<(typeof languages)[number]>("English");

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-language-menu]")) setLanguageOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const t = translations[selectedLanguage];

  const pageBg = useMemo(
    () =>
      isDark
        ? "bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_25%),radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.10),_transparent_22%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)] text-white"
        : "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_25%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.10),_transparent_22%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_45%,#ffffff_100%)] text-slate-900",
    [isDark]
  );

  const premiumButton =
    "group relative overflow-hidden whitespace-nowrap rounded-2xl border px-5 py-3 text-sm font-semibold backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)] active:translate-y-[1px] active:scale-[0.98] before:absolute before:inset-0 before:bg-white/10 before:opacity-0 before:transition-opacity hover:before:opacity-100";

  const categoryButton =
    "group relative flex items-center justify-center overflow-hidden rounded-2xl border px-4 py-4 text-center text-sm font-semibold tracking-wide transition-all duration-500 hover:-translate-y-1 hover:scale-[1.05] hover:rotate-[-0.5deg] hover:shadow-[0_24px_60px_rgba(0,0,0,0.22)] active:translate-y-[1px] active:scale-[0.985]";

  return (
    <div className={`min-h-screen transition-all duration-700 ${pageBg}`}>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          isDark
            ? "border-white/10 bg-slate-950/70 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "border-blue-100/80 bg-white/70 shadow-[0_24px_80px_rgba(37,99,235,0.12)] backdrop-blur-2xl"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between gap-4 py-4">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-4 text-2xl font-black tracking-wide transition-all duration-500 hover:scale-[1.04]"
            >
              <span className="relative flex h-15 w-15 items-center justify-center overflow-hidden rounded-[1.25rem] bg-white/70 p-2 shadow-[0_16px_40px_rgba(37,99,235,0.18)] ring-1 ring-white/40 backdrop-blur-xl transition-all duration-500 group-hover:rotate-[-2deg] group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.28)] animate-[pulse_6s_ease-in-out_infinite]">
                <img
                  src="/images/vijayam.jpg"
                  alt="Vijayam Publications logo"
                  className="h-full w-full rounded-[1rem] object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                Vijayam Publications
              </span>
            </Link>

            <div className="flex flex-1 items-center justify-end gap-3">
              <div
                className={`hidden h-14 items-center gap-2 rounded-full border px-4 shadow-[0_18px_45px_rgba(15,23,42,0.10)] lg:flex ${
                  isDark ? "border-white/10 bg-white/5 text-slate-100" : "border-blue-100 bg-white/80 text-slate-700"
                }`}
              >
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition duration-300 ${
                    isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
                  }`}
                  aria-label="Voice agent"
                >
                  <Mic size={18} />
                </button>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.search}
                  className={`w-[320px] bg-transparent text-sm outline-none placeholder:text-current/60 ${
                    isDark ? "placeholder:text-slate-400" : "placeholder:text-slate-400"
                  }`}
                />
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition duration-300 ${
                    isDark ? "hover:bg-white/10" : "hover:bg-slate-100"
                  }`}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </div>

              <div className="relative" data-language-menu>
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className={`${premiumButton} flex items-center gap-2 ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-100 hover:border-amber-300/40"
                      : "border-blue-100 bg-white/80 text-slate-800 hover:border-blue-200"
                  }`}
                  aria-label="Language selector"
                >
                  <Languages size={18} />
                  <span>{selectedLanguage}</span>
                  <ChevronDown size={16} />
                </button>

                {languageOpen && (
                  <div
                    className={`absolute right-0 top-full z-[70] mt-4 w-64 overflow-hidden rounded-3xl border shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl animate-[fadeIn_0.2s_ease-out] ${
                      isDark ? "border-white/10 bg-slate-950/98" : "border-blue-100 bg-white/98"
                    }`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setLanguageOpen(false);
                        }}
                        className={`w-full px-5 py-3.5 text-left text-sm font-semibold transition ${
                          selectedLanguage === lang
                            ? isDark
                              ? "bg-white/10 text-amber-300"
                              : "bg-blue-50 text-blue-700"
                            : isDark
                              ? "text-slate-200 hover:bg-white/5"
                              : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`group relative flex h-14 items-center gap-2 overflow-hidden rounded-full border px-5 transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-[1px] active:scale-[0.985] ${
                  isDark
                    ? "border-amber-300/40 bg-gradient-to-r from-slate-900 to-slate-800 text-amber-200 shadow-[0_14px_35px_rgba(251,191,36,0.15)]"
                    : "border-blue-200 bg-gradient-to-r from-blue-50 to-white text-blue-700 shadow-[0_14px_35px_rgba(59,130,246,0.12)]"
                }`}
                aria-label="Toggle day night mode"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-2 text-sm font-semibold">
                  {isDark ? <MoonStar size={18} /> : <SunMedium size={18} />}
                  {isDark ? t.nightMode : t.dayMode}
                </span>
              </button>

              <button
                className={`hidden h-14 items-center rounded-2xl px-6 text-sm font-semibold transition-all duration-300 md:flex hover:-translate-y-1 hover:scale-[1.03] active:translate-y-[1px] active:scale-[0.98] ${
                  isDark
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-[0_14px_30px_rgba(251,191,36,0.25)]"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_14px_30px_rgba(37,99,235,0.25)]"
                }`}
              >
                {t.login}
              </button>

              <button
                className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:translate-y-[1px] active:scale-[0.98] ${
                  isDark
                    ? "border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white shadow-[0_14px_35px_rgba(0,0,0,0.28)] hover:border-white/20"
                    : "border-blue-100 bg-gradient-to-br from-white to-blue-50 text-slate-900 shadow-[0_14px_35px_rgba(37,99,235,0.14)] hover:border-blue-200"
                }`}
                aria-label="Cart"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <ShoppingBag size={20} className="relative z-10" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xs text-white shadow-lg">
                  0
                </span>
              </button>

              <button
                className={`xl:hidden flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 ${
                  isDark ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          <div
            className={`mb-5 rounded-[2rem] border px-4 py-5 shadow-[0_28px_90px_rgba(0,0,0,0.14)] backdrop-blur-xl ${
              isDark ? "border-white/10 bg-white/5" : "border-blue-100 bg-white/75"
            }`}
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-7">
              {categories.map((item, index) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`${categoryButton} ${
                    isDark
                      ? "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] text-slate-100 before:bg-white/10 hover:border-amber-300/40 hover:text-amber-300"
                      : "border-blue-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(239,246,255,0.85))] text-slate-800 before:bg-white/30 hover:border-blue-200 hover:text-blue-700"
                  } animate-[floatUp_5s_ease-in-out_infinite]`}
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  <span className="absolute inset-x-3 top-2 h-px rounded-full bg-white/50 opacity-80" />
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
                  <span className="relative z-10">{t[item.key]}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`border-t xl:hidden ${
              isDark ? "border-white/10 bg-slate-950/95" : "border-blue-100 bg-white/95"
            }`}
          >
            <div className="space-y-4 px-4 py-5">
              <div
                className={`flex items-center gap-2 rounded-2xl border px-4 py-3 backdrop-blur-xl ${
                  isDark ? "border-white/10 bg-white/5" : "border-blue-100 bg-white/80"
                }`}
              >
                <Mic size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.search}
                  className={`w-full bg-transparent text-sm outline-none ${
                    isDark ? "placeholder:text-slate-400 text-slate-100" : "placeholder:text-slate-400 text-slate-700"
                  }`}
                />
                <Search size={18} />
              </div>

              <div className="relative" data-language-menu>
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 font-semibold backdrop-blur-xl ${
                    isDark ? "border-white/10 bg-white/5 text-slate-100" : "border-blue-100 bg-white/80 text-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Languages size={18} />
                    {selectedLanguage}
                  </span>
                  <ChevronDown size={16} />
                </button>

                {languageOpen && (
                  <div
                    className={`mt-3 overflow-hidden rounded-2xl border backdrop-blur-xl ${
                      isDark ? "border-white/10 bg-slate-950" : "border-blue-100 bg-white"
                    }`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setLanguageOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm font-medium ${
                          isDark ? "text-slate-200 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-[1px] ${
                  isDark ? "bg-gradient-to-r from-slate-800 to-slate-700 text-amber-200" : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700"
                }`}
              >
                {isDark ? <MoonStar size={18} /> : <SunMedium size={18} />}
                {isDark ? t.nightMode : t.dayMode}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className={`rounded-2xl px-4 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-[1px] ${
                    isDark ? "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  }`}
                >
                  {t.login}
                </button>
                <button
                  className={`rounded-2xl px-4 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-[1px] ${
                    isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <ShoppingBag className="mx-auto" size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((item, index) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] active:translate-y-[1px] ${
                      isDark
                        ? "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-amber-300"
                        : "border-blue-100 bg-white/80 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    } animate-[floatUp_5s_ease-in-out_infinite]`}
                    style={{ animationDelay: `${index * 0.12}s` }}
                  >
                    {t[item.key]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}