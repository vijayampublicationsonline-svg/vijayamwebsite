"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
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

const languages = [
  "English", "Telugu", "Hindi", "Tamil", "Marathi", "Gujarati",
  "Odia", "Bengali", "Malayalam", "Kashmiri", "Rajasthani",
] as const;

type Language = (typeof languages)[number];

type Translation = {
  categories: string[];
  search: string;
  login: string;
  cart: string;
  dayMode: string;
  nightMode: string;
  language: string;
};

const translations: Record<Language, Translation> = {
  English: { categories: ["Home", "Shop Now", "Gallery", "Bulk Order", "Join as an Author", "About Us"], search: "Search ISBN / Book Name", login: "Login", cart: "Cart", dayMode: "Day Mode", nightMode: "Night Mode", language: "Language" },
  Telugu: { categories: ["హోమ్", "షాప్", "గ్యాలరీ", "బల్క్ ఆర్డర్", "రచయితగా చేరండి", "మా గురించి"], search: "ISBN / పుస్తక పేరు వెతకండి", login: "లాగిన్", cart: "కార్ట్", dayMode: "డే మోడ్", nightMode: "నైట్ మోడ్", language: "భాష" },
  Hindi: { categories: ["होम", "अभी खरीदें", "गैलरी", "बल्क ऑर्डर", "लेखक बनें", "हमारे बारे में"], search: "ISBN / पुस्तक का नाम खोजें", login: "लॉगिन", cart: "कार्ट", dayMode: "डे मोड", nightMode: "नाइट मोड", language: "भाषा" },
  Tamil: { categories: ["முகப்பு", "இப்போது வாங்க", "கேலரி", "மொத்த ஆர்டர்", "ஆசிரியராக சேரவும்", "எங்களை பற்றி"], search: "ISBN / புத்தகப் பெயரைத் தேடுங்கள்", login: "உள்நுழைய", cart: "வண்டி", dayMode: "பகல் முறை", nightMode: "இரவு முறை", language: "மொழி" },
  Marathi: { categories: ["मुख्यपृष्ठ", "आता खरेदी करा", "गॅलरी", "बल्क ऑर्डर", "लेखक बना", "आमच्याबद्दल"], search: "ISBN / पुस्तकाचे नाव शोधा", login: "लॉगिन", cart: "कार्ट", dayMode: "डे मोड", nightMode: "नाईट मोड", language: "भाषा" },
  Gujarati: { categories: ["હોમ", "હમણાં ખરીદો", "ગેલેરી", "બલ્ક ઓર્ડર", "લેખક બનો", "અમારા વિશે"], search: "ISBN / પુસ્તકનું નામ શોધો", login: "લૉગિન", cart: "કાર્ટ", dayMode: "ડે મોડ", nightMode: "નાઇટ મોડ", language: "ભાષા" },
  Odia: { categories: ["ମୁଖ୍ୟପୃଷ୍ଠା", "ଏବେ କିଣନ୍ତୁ", "ଗ୍ୟାଲେରୀ", "ବଲ୍କ ଅର୍ଡର", "ଲେଖକ ହୁଅନ୍ତୁ", "ଆମ ବିଷୟରେ"], search: "ISBN / ପୁସ୍ତକ ନାମ ଖୋଜନ୍ତୁ", login: "ଲଗଇନ", cart: "କାର୍ଟ", dayMode: "ଦିନ ମୋଡ୍", nightMode: "ରାତି ମୋଡ୍", language: "ଭାଷା" },
  Bengali: { categories: ["হোম", "এখনই কিনুন", "গ্যালারি", "বাল্ক অর্ডার", "লেখক হন", "আমাদের সম্পর্কে"], search: "ISBN / বইয়ের নাম খুঁজুন", login: "লগইন", cart: "কার্ট", dayMode: "ডে মোড", nightMode: "নাইট মোড", language: "ভাষা" },
  Malayalam: { categories: ["ഹോം", "ഇപ്പോൾ വാങ്ങുക", "ഗാലറി", "ബൾക്ക് ഓർഡർ", "രചയിതാവാകുക", "ഞങ്ങളെക്കുറിച്ച്"], search: "ISBN / പുസ്തകത്തിന്റെ പേര് തിരയുക", login: "ലോഗിൻ", cart: "കാർട്ട്", dayMode: "ഡേ മോഡ്", nightMode: "നൈറ്റ് മോഡ്", language: "ഭാഷ" },
  Kashmiri: { categories: ["گھر", "ہَس کِنِو", "گیلری", "بلک آرڈر", "مصنف بنو", "اسان متعلق"], search: "ISBN / کتابُک ناو تلاش کرو", login: "لاگ اِن", cart: "کارٹ", dayMode: "دن موڈ", nightMode: "رات موڈ", language: "زبان" },
  Rajasthani: { categories: ["घर", "अभी खरीदो", "गैलरी", "बल्क ऑर्डर", "लेखक बणो", "म्हारे बारे में"], search: "ISBN / किताब रो नांव खोजो", login: "लॉगिन", cart: "कार्ट", dayMode: "दिन मोड", nightMode: "रात मोड", language: "भाषा" },
};

const links = ["/", "/books", "/gallery", "/bulk-order", "/publishers", "/about-us"];

export default function Navbar() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("English");

  const text = translations[selectedLanguage];
  const categories = text.categories.map((label, index) => ({ label, href: links[index] }));

  const applyTheme = (darkMode: boolean) => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.style.colorScheme = darkMode ? "dark" : "light";
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    window.dispatchEvent(new CustomEvent("vp:theme-change", { detail: { dark: darkMode, at: performance.now() } }));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkMode = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && languages.includes(savedLanguage)) setSelectedLanguage(savedLanguage);
    setIsDark(darkMode);
    applyTheme(darkMode);
  }, []);

  useEffect(() => {
    applyTheme(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleThemeToggle = () => {
    const next = !isDark;
    if (typeof document.startViewTransition !== "function") {
      setIsDark(next);
      return;
    }
    const vt = document.startViewTransition(() => {
      setIsDark(next);
    });
    vt?.finished.finally(() => {
      window.dispatchEvent(new CustomEvent("vp:theme-change", { detail: { dark: next, at: performance.now() } }));
    });
  };

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setLanguageOpen(false);
    localStorage.setItem("language", language);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search.trim()) {
      router.push(`/books?search=${encodeURIComponent(search.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <style>{`
        @media (min-width: 1280px) and (max-width: 1450px) { .vijayam-navbar-search { width: 300px !important; min-width: 300px !important; } .vijayam-navbar-login { padding-left: 16px !important; padding-right: 16px !important; } }
        @media (min-width: 1451px) { .vijayam-navbar-search { width: 370px !important; } }
        @media (max-width: 1279px) { .vijayam-navbar-search { display:none !important; } }
        .vijayam-theme-toggle { position:relative; overflow:visible; animation:vijayamPulseGlow 3s ease-in-out infinite; }
        .vijayam-theme-toggle::before { content:""; position:absolute; inset:-5px; border-radius:50%; background:conic-gradient(from 0deg, rgba(212,175,55,0.5), rgba(140,109,31,0.2), rgba(212,175,55,0.5), rgba(255,243,189,0.1), rgba(212,175,55,0.5)); animation:vijayamToggleSpin 4s linear infinite; z-index:-1; }
        .vijayam-theme-toggle::after { content:""; position:absolute; inset:-2px; border-radius:50%; background:radial-gradient(circle, rgba(212,175,55,0.35), transparent 70%); animation:vijayamToggleBreathe 2s ease-in-out infinite; z-index:-1; }
        @keyframes vijayamPulseGlow { 0%,100% { box-shadow:0 0 18px rgba(212,175,55,0.35),0 0 28px rgba(212,175,55,0.22),0 0 36px rgba(212,175,55,0.1); } 50% { box-shadow:0 0 28px rgba(212,175,55,0.5),0 0 40px rgba(212,175,55,0.3),0 0 52px rgba(212,175,55,0.18); } }
        @keyframes vijayamToggleSpin { to { transform:rotate(360deg); } }
        @keyframes vijayamToggleBreathe { 0%,100% { opacity:0.5; transform:scale(0.92); } 50% { opacity:0.9; transform:scale(1.08); } }
        .dark .vijayam-theme-toggle::before { background:conic-gradient(from 0deg, rgba(147,197,255,0.4), rgba(96,165,255,0.2), rgba(212,175,55,0.3), rgba(255,243,189,0.1), rgba(147,197,255,0.4)); }
        .dark .vijayam-theme-toggle::after { background:radial-gradient(circle, rgba(147,197,255,0.25), transparent 70%); }
        .dark .vijayam-theme-toggle { animation:vijayamPulseGlowDark 3s ease-in-out infinite; }
        @keyframes vijayamPulseGlowDark { 0%,100% { box-shadow:0 0 18px rgba(147,197,255,0.3),0 0 28px rgba(96,165,255,0.2),0 0 36px rgba(147,197,255,0.08); } 50% { box-shadow:0 0 28px rgba(147,197,255,0.45),0 0 40px rgba(96,165,255,0.28),0 0 52px rgba(147,197,255,0.15); } }
      `}</style>
      <header className="sticky top-0 z-50 border-b border-[#D4AF37]/25 bg-[#FFF8E7]/92 shadow-[0_10px_32px_rgba(140,109,31,0.10)] backdrop-blur-2xl transition-colors duration-700 dark:border-[#D4AF37]/20 dark:bg-[#050505]/94">
        <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center justify-between gap-4 py-3">
            <Link href="/" className="group flex shrink-0 items-center gap-3 text-lg font-black tracking-wide sm:text-xl">
              <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#D4AF37]/35 bg-white p-1 shadow-[0_10px_25px_rgba(140,109,31,0.2)] ring-1 ring-[#D4AF37]/30 dark:bg-[#111]">
                <img
                  src="/images/eagle logo .jpg"
                  alt="Vijayam Publications eagle logo"
                  className="h-full w-full rounded-xl object-cover contrast-110 saturate-110"
                  draggable={false}
                />
              </span>
              <span className="hidden bg-gradient-to-r from-[#8C6D1F] via-[#D4AF37] to-[#8C6D1F] bg-clip-text text-transparent sm:block dark:from-[#F8E7A1] dark:via-[#D4AF37] dark:to-[#FFF3BD]">
                Vijayam Publications
              </span>
            </Link>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
              <form onSubmit={submitSearch} className="vijayam-navbar-search hidden h-11 w-[min(36vw,390px)] min-w-[290px] max-w-[390px] items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/70 px-3.5 text-[#5C5346] shadow-[0_6px_20px_rgba(140,109,31,0.06)] lg:flex dark:bg-white/5 dark:text-slate-100">
                <button type="button" onClick={() => searchInputRef.current?.focus()} aria-label="Focus search"><Mic size={17} /></button>
                <input ref={searchInputRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#5C5346]/60 dark:placeholder:text-slate-400" />
                <button type="submit" aria-label="Search"><Search size={17} /></button>
              </form>

              <div className="relative hidden sm:block">
                <button onClick={() => setLanguageOpen((open) => !open)} className="flex h-11 items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/65 px-3.5 text-sm font-semibold text-[#5C5346] shadow-[0_6px_20px_rgba(140,109,31,0.05)] dark:bg-white/5 dark:text-[#F3D27A]">
                  <Languages size={17} /><span className="max-w-20 truncate">{selectedLanguage}</span><ChevronDown size={16} />
                </button>
                {languageOpen && (
                  <div className="absolute right-0 top-full z-[100] mt-3 w-60 rounded-2xl border border-[#D4AF37]/35 bg-[#FFFDF5] p-2 shadow-[0_20px_45px_rgba(74,53,9,0.28)] dark:bg-[#171717]">
                    {languages.map((language) => (
                      <button key={language} onClick={() => selectLanguage(language)} className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition hover:bg-[#D4AF37]/15 dark:text-slate-200 ${selectedLanguage === language ? "bg-[#D4AF37]/20 text-[#8C6D1F] dark:text-[#F3D27A]" : "text-[#5C5346]"}`}>
                        {language}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={handleThemeToggle} className="vijayam-theme-toggle flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#D4AF37]/55 bg-gradient-to-br from-[#fff8dc] to-[#f0d68a] text-[#5a3903] shadow-[0_0_22px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_32px_rgba(212,175,55,0.5)] dark:from-[#1a1a3a] dark:to-[#0d0d20] dark:border-[#93c5ff]/40 dark:text-[#F3D27A] dark:shadow-[0_0_22px_rgba(147,197,255,0.3)]" aria-label={isDark ? text.dayMode : text.nightMode}>
                {isDark ? <SunMedium size={21} strokeWidth={2.5} /> : <MoonStar size={21} strokeWidth={2.5} />}
              </button>

              <Link href="/login" className="vijayam-navbar-login hidden h-11 shrink-0 items-center rounded-2xl bg-gradient-to-r from-[#E8C874] to-[#B08D57] px-6 text-sm font-bold text-[#2B2620] shadow-[0_8px_18px_rgba(140,109,31,0.16)] transition hover:-translate-y-0.5 md:flex">{text.login}</Link>

              <Link href="/cart" className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white/65 text-[#5C5346] shadow-[0_6px_18px_rgba(140,109,31,0.06)] dark:bg-white/5 dark:text-[#F3D27A]" aria-label={text.cart}>
                <ShoppingBag size={19} /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8C6D1F] text-[10px] text-white">0</span>
              </Link>

              <button onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-full text-[#5C5346] xl:hidden dark:text-white" aria-label="Toggle navigation">
                {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
              </button>
            </div>
          </div>

          <nav className="hidden pb-4 xl:block">
            <div className="grid grid-cols-6 gap-2.5 rounded-3xl border border-[#D4AF37]/20 bg-white/50 p-2.5 shadow-[0_8px_28px_rgba(140,109,31,0.05)] backdrop-blur-xl dark:bg-white/5">
              {categories.map((item) => (
                <Link key={item.href} href={item.href} className="flex min-h-10 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-white/60 px-2.5 py-2 text-center text-[13px] font-semibold text-[#5C5346] transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:bg-[#FFF3D6] hover:text-[#8C6D1F] dark:bg-white/5 dark:text-slate-200">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#D4AF37]/20 bg-[#FFF8E7]/95 px-4 py-5 backdrop-blur-2xl xl:hidden dark:bg-[#111111]/95">
            <div className="mx-auto max-w-[1700px] space-y-4">
              <form onSubmit={submitSearch} className="flex h-12 items-center gap-2 rounded-2xl border border-[#D4AF37]/25 bg-white/60 px-4 dark:bg-white/5">
                <button type="button" onClick={() => searchInputRef.current?.focus()} aria-label="Focus search"><Mic size={18} /></button>
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} className="min-w-0 flex-1 bg-transparent text-sm outline-none dark:text-white" />
                <button type="submit" aria-label="Search"><Search size={18} /></button>
              </form>

              <div className="grid grid-cols-2 gap-3">
                {categories.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-2xl border border-[#D4AF37]/20 bg-white/60 px-3 py-3 text-center text-sm font-semibold text-[#5C5346] dark:bg-white/5 dark:text-slate-200">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}