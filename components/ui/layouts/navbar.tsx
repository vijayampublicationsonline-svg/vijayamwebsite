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
  HeartPulse,
  BriefcaseBusiness,
  Route,
  GraduationCap,
} from "lucide-react";

const languages = [
  "English", "Telugu", "Kannada", "Hindi", "Tamil", "Marathi", "Gujarati",
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
  Kannada: { categories: ["ಮುಖಪುಟ", "ಈಗ ಖರೀದಿಸಿ", "ಗ್ಯಾಲರಿ", "ಬೃಹತ್ ಆರ್ಡರ್", "ಲೇಖಕರಾಗಿ ಸೇರಿ", "ನಮ್ಮ ಬಗ್ಗೆ"], search: "ISBN / ಪುಸ್ತಕದ ಹೆಸರನ್ನು ಹುಡುಕಿ", login: "ಲಾಗಿನ್", cart: "ಕಾರ್ಟ್", dayMode: "ಹಗಲು ಮೋಡ್", nightMode: "ರಾತ್ರಿ ಮೋಡ್", language: "ಭಾಷೆ" },
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

const links = ["/", "/books", "/#gallery", "/bulk-order", "/join-author", "/about-us"];

const shopSubLinks = [
  { label: "Nursing", href: "/nursing", tone: "emerald", icon: HeartPulse, accent: "from-emerald-100/90 via-white/85 to-teal-100/90", darkAccent: "dark:from-emerald-950/75 dark:via-white/5 dark:to-teal-900/45", glow: "shadow-emerald-900/14" },
  { label: "Vocational", href: "/vocational", tone: "amber", icon: BriefcaseBusiness, accent: "from-amber-100/90 via-white/85 to-orange-100/90", darkAccent: "dark:from-amber-950/75 dark:via-white/5 dark:to-orange-900/45", glow: "shadow-amber-900/14" },
  { label: "Bridge Courses", href: "/bridge-courses", tone: "sky", icon: Route, accent: "from-sky-100/90 via-white/85 to-indigo-100/90", darkAccent: "dark:from-sky-950/75 dark:via-white/5 dark:to-indigo-900/45", glow: "shadow-sky-900/14" },
  { label: "Degree", href: "/degree", tone: "violet", icon: GraduationCap, accent: "from-violet-100/90 via-white/85 to-fuchsia-100/90", darkAccent: "dark:from-violet-950/75 dark:via-white/5 dark:to-fuchsia-900/45", glow: "shadow-violet-900/14" },
];

export default function Navbar() {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [search, setSearch] = useState("");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  useEffect(() => {
    return () => {
      if (shopCloseTimer.current) clearTimeout(shopCloseTimer.current);
    };
  }, []);

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

  const openShopMenu = () => {
    if (shopCloseTimer.current) {
      clearTimeout(shopCloseTimer.current);
      shopCloseTimer.current = null;
    }
    setShopOpen(true);
  };

  const closeShopMenuSoon = () => {
    if (shopCloseTimer.current) clearTimeout(shopCloseTimer.current);
    shopCloseTimer.current = setTimeout(() => {
      setShopOpen(false);
      shopCloseTimer.current = null;
    }, 420);
  };

  const closeShopMenuNow = () => {
    if (shopCloseTimer.current) {
      clearTimeout(shopCloseTimer.current);
      shopCloseTimer.current = null;
    }
    setShopOpen(false);
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
        @media (min-width: 1280px) and (max-width: 1450px) { .vijayam-navbar-search { width: 360px !important; min-width: 340px !important; } .vijayam-navbar-login { padding-left: 15px !important; padding-right: 15px !important; } }
        @media (min-width: 1451px) { .vijayam-navbar-search { width: 470px !important; max-width: 470px !important; } }
        @media (max-width: 1279px) { .vijayam-navbar-search { display:none !important; } }
        .vijayam-theme-toggle {
          position: relative;
          display: inline-flex;
          align-items: center;
          width: 78px;
          height: 40px;
          overflow: hidden;
          border-radius: 999px;
          isolation: isolate;
          cursor: pointer;
          background:
            radial-gradient(circle at 24% 50%, rgba(255,255,255,.85) 0 15%, transparent 24%),
            radial-gradient(circle at 78% 30%, rgba(255,246,202,.48), transparent 22%),
            linear-gradient(135deg, #fff4b7 0%, #f6bd28 48%, #b87309 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.95),
            inset 0 -10px 18px rgba(143,87,6,.18),
            0 12px 28px rgba(180,119,12,.25),
            0 0 0 1px rgba(212,175,55,.34);
          transition: background .45s ease, border-color .45s ease, box-shadow .45s ease, transform .25s ease;
        }
        .vijayam-theme-toggle:hover {
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.96),
            inset 0 -10px 18px rgba(143,87,6,.18),
            0 16px 34px rgba(180,119,12,.32),
            0 0 0 1px rgba(212,175,55,.48);
        }
        .vijayam-theme-toggle::before {
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(255,255,255,.5), rgba(255,255,255,.12));
          pointer-events: none;
        }
        .vijayam-theme-toggle::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 18%, rgba(255,255,255,.46) 42%, transparent 64%);
          transform: translateX(-120%);
          transition: transform .75s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .vijayam-theme-toggle:hover::after { transform: translateX(120%); }
        .vijayam-theme-toggle .vijayam-theme-track-icon {
          position: absolute;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
          opacity: 1;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,.22));
          transition: opacity .35s ease, transform .35s ease, color .35s ease;
        }
        .vijayam-theme-toggle .vijayam-sun-icon { left: 8px; color: #8b5200; opacity: 1; transform: scale(1.08); }
        .vijayam-theme-toggle .vijayam-moon-icon { right: 8px; color: #17315f; opacity: .82; transform: scale(1.02); }
        .vijayam-theme-toggle .vijayam-theme-thumb {
          position: relative;
          z-index: 2;
          display: grid;
          width: 32px;
          height: 32px;
          margin-left: 4px;
          place-items: center;
          border-radius: 999px;
          color: #8b5200;
          background:
            radial-gradient(circle at 36% 24%, #ffffff 0 15%, #fff4b8 38%, #ffc933 70%, #c77908 100%);
          box-shadow:
            0 9px 18px rgba(107,66,4,.35),
            inset 0 1px 0 rgba(255,255,255,1),
            inset 0 -5px 9px rgba(151,82,6,.18);
          transition: transform .48s cubic-bezier(.16,1,.3,1), background .48s ease, color .48s ease, box-shadow .48s ease;
        }
        .vijayam-theme-toggle .vijayam-theme-thumb svg { width: 19px; height: 19px; stroke-width: 3; }
        .vijayam-theme-toggle:active .vijayam-theme-thumb { transform: scale(.92); }
        .dark .vijayam-theme-toggle {
          background:
            radial-gradient(circle at 23% 28%, rgba(191,219,254,.55) 0 2px, transparent 3px),
            radial-gradient(circle at 42% 72%, rgba(255,255,255,.52) 0 1px, transparent 2px),
            radial-gradient(circle at 76% 36%, rgba(147,197,253,.42), transparent 28%),
            linear-gradient(135deg, #1d4ed8 0%, #111827 48%, #020617 100%);
          box-shadow:
            inset 0 1px 0 rgba(191,219,254,.42),
            inset 0 -12px 20px rgba(0,0,0,.34),
            0 14px 32px rgba(2,6,23,.48),
            0 0 0 1px rgba(147,197,253,.28);
        }
        .dark .vijayam-theme-toggle:hover {
          box-shadow:
            inset 0 1px 0 rgba(191,219,254,.46),
            inset 0 -12px 20px rgba(0,0,0,.34),
            0 18px 38px rgba(2,6,23,.58),
            0 0 0 1px rgba(147,197,253,.42);
        }
        .dark .vijayam-theme-toggle .vijayam-theme-thumb {
          transform: translateX(38px);
          color: #eef6ff;
          background:
            radial-gradient(circle at 34% 24%, #f8fbff 0 10%, #9fb3d1 30%, #334155 66%, #020617 100%);
          box-shadow:
            0 9px 20px rgba(0,0,0,.52),
            inset 0 1px 0 rgba(255,255,255,.45),
            inset 0 -5px 10px rgba(0,0,0,.35);
        }
        .dark .vijayam-theme-toggle:active .vijayam-theme-thumb { transform: translateX(38px) scale(.92); }
        .dark .vijayam-theme-toggle .vijayam-sun-icon { opacity: .82; color: #ffd76a; transform: scale(1.02); }
        .dark .vijayam-theme-toggle .vijayam-moon-icon { opacity: 1; color: #f8fbff; transform: scale(1.1); }
        .vijayam-shop-panel {
          opacity: 0;
          transform: translate(-50%, 14px) scale(.97);
          pointer-events: none;
          transition: opacity .22s ease, transform .3s cubic-bezier(.16,1,.3,1);
        }
        .vijayam-shop-panel-open { opacity:1; transform:translate(-50%, 0) scale(1); pointer-events:auto; }
        .vijayam-shop-panel::before {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: -1;
          border-radius: 1.65rem;
          background:
            radial-gradient(circle at 18% 10%, rgba(255,255,255,.96), transparent 28%),
            linear-gradient(135deg, rgba(212,175,55,.34), rgba(255,255,255,.72), rgba(14,165,233,.16));
          filter: drop-shadow(0 24px 42px rgba(15,23,42,.16));
        }
        .vijayam-shop-panel::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -9px;
          width: 18px;
          height: 18px;
          transform: translateX(-50%) rotate(45deg);
          border-left: 1px solid rgba(212,175,55,.32);
          border-top: 1px solid rgba(212,175,55,.32);
          background: linear-gradient(135deg, rgba(255,255,255,.98), rgba(247,250,252,.96));
          box-shadow: -8px -8px 18px rgba(15,23,42,.08);
        }
        .dark .vijayam-shop-panel::after { background: linear-gradient(135deg, rgba(17,17,17,.98), rgba(31,28,21,.96)); border-color: rgba(212,175,55,.28); }
        .vijayam-shop-panel-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            radial-gradient(circle at 10% 10%, rgba(255,255,255,.92), transparent 28%),
            radial-gradient(circle at 88% 16%, rgba(14,165,233,.12), transparent 26%),
            linear-gradient(135deg, rgba(255,255,255,.86), rgba(248,250,252,.76));
          pointer-events: none;
        }
        .dark .vijayam-shop-panel-shell::before {
          background:
            radial-gradient(circle at 10% 10%, rgba(248,231,161,.12), transparent 28%),
            radial-gradient(circle at 88% 16%, rgba(147,197,253,.1), transparent 26%),
            linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
        }
        .vijayam-shop-panel-shell > * { position: relative; z-index: 1; }
        .vijayam-shop-card {
          min-height: 124px;
          isolation: isolate;
          transform-style: preserve-3d;
          background-image:
            linear-gradient(135deg, rgba(255,255,255,.94), rgba(255,255,255,.72) 44%, rgba(255,255,255,.24)),
            var(--shop-base);
        }
        .vijayam-shop-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 1.35rem;
          background:
            linear-gradient(90deg, rgba(212,175,55,.2), transparent 18%, transparent 82%, rgba(212,175,55,.16)),
            radial-gradient(circle at 28% 16%, rgba(255,255,255,.98), transparent 25%),
            linear-gradient(135deg, rgba(255,255,255,.78), rgba(255,255,255,.18) 52%, var(--shop-card-tint));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.78), inset 0 -1px 0 rgba(15,23,42,.08);
          opacity: .98;
          pointer-events: none;
        }
        .dark .vijayam-shop-card::before {
          background:
            linear-gradient(90deg, rgba(212,175,55,.24), transparent 18%, transparent 82%, rgba(212,175,55,.18)),
            radial-gradient(circle at 28% 16%, rgba(255,255,255,.17), transparent 25%),
            linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.035) 52%, rgba(212,175,55,.12));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), inset 0 -1px 0 rgba(212,175,55,.14);
        }
        .vijayam-shop-card::after {
          content: "";
          position: absolute;
          inset: -38%;
          border-radius: inherit;
          background:
            radial-gradient(circle at 34% 18%, var(--shop-orb), transparent 18%),
            radial-gradient(circle at 72% 78%, var(--shop-soft), transparent 23%),
            linear-gradient(115deg, transparent 27%, rgba(255,255,255,.58) 42%, transparent 55%);
          opacity: .7;
          transform: rotate(-10deg) translateX(-16%);
          transition: transform .72s cubic-bezier(.16,1,.3,1), opacity .3s ease;
          pointer-events: none;
        }
        .vijayam-shop-card[data-tone="emerald"] { --shop-orb: rgba(16,185,129,.42); --shop-soft:rgba(45,212,191,.2); --shop-icon:#059669; --shop-icon-deep:#065f46; --shop-card-tint:rgba(16,185,129,.13); --shop-base:linear-gradient(135deg,#ecfdf5,#ffffff 58%,#ccfbf1); }
        .vijayam-shop-card[data-tone="amber"] { --shop-orb: rgba(245,158,11,.45); --shop-soft:rgba(251,191,36,.22); --shop-icon:#d97706; --shop-icon-deep:#92400e; --shop-card-tint:rgba(245,158,11,.14); --shop-base:linear-gradient(135deg,#fff7ed,#ffffff 58%,#fed7aa); }
        .vijayam-shop-card[data-tone="sky"] { --shop-orb: rgba(14,165,233,.44); --shop-soft:rgba(99,102,241,.18); --shop-icon:#0284c7; --shop-icon-deep:#075985; --shop-card-tint:rgba(14,165,233,.13); --shop-base:linear-gradient(135deg,#f0f9ff,#ffffff 58%,#dbeafe); }
        .vijayam-shop-card[data-tone="violet"] { --shop-orb: rgba(168,85,247,.42); --shop-soft:rgba(236,72,153,.16); --shop-icon:#8b5cf6; --shop-icon-deep:#6d28d9; --shop-card-tint:rgba(168,85,247,.13); --shop-base:linear-gradient(135deg,#faf5ff,#ffffff 58%,#f5d0fe); }
        .vijayam-shop-card > * { position: relative; z-index: 1; }
        .vijayam-shop-card:hover::after { opacity: .98; transform: rotate(7deg) translateX(12%); }
        .vijayam-shop-card:hover .vijayam-shop-icon { transform: translateY(-6px) scale(1.08); box-shadow: 0 22px 42px rgba(15,23,42,.2), 0 0 0 8px rgba(255,255,255,.56), 0 0 0 1px rgba(212,175,55,.38), 0 0 28px var(--shop-orb), inset 0 1px 0 rgba(255,255,255,.88); }
        .vijayam-shop-card:hover .vijayam-shop-name { transform: translateY(-2px); }
        .vijayam-shop-icon {
          position: relative;
          display: grid;
          width: 48px;
          height: 48px;
          place-items: center;
          border-radius: 16px;
          color: #ffffff;
          background:
            linear-gradient(135deg, rgba(255,255,255,.34), transparent 31%),
            radial-gradient(circle at 76% 82%, rgba(255,255,255,.22), transparent 27%),
            linear-gradient(135deg, var(--shop-icon) 0%, var(--shop-icon-deep) 58%, #0f172a 100%);
          box-shadow:
            0 16px 30px rgba(15,23,42,.16),
            0 0 0 1px rgba(212,175,55,.28),
            0 0 0 6px rgba(255,255,255,.62),
            0 0 26px var(--shop-orb),
            inset 0 1px 0 rgba(255,255,255,.8),
            inset 0 -7px 14px rgba(2,6,23,.18);
          transition: transform .36s cubic-bezier(.16,1,.3,1), box-shadow .36s ease, color .36s ease;
        }
        .vijayam-shop-icon::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,.3);
          background: linear-gradient(135deg, rgba(255,255,255,.42), transparent 48%, var(--shop-card-tint));
          pointer-events: none;
        }
        .vijayam-shop-icon::after {
          content: "";
          position: absolute;
          inset: 7px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,.3);
          background: linear-gradient(135deg, rgba(255,255,255,.18), transparent 58%);
          pointer-events: none;
        }
        .vijayam-shop-icon svg { width: 22px; height: 22px; stroke-width: 2.65; filter: drop-shadow(0 2px 5px rgba(0,0,0,.3)); }
        .vijayam-shop-name { transition: transform .36s cubic-bezier(.16,1,.3,1); }
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
              <form onSubmit={submitSearch} className="vijayam-navbar-search hidden h-12 w-[min(40vw,470px)] min-w-[340px] max-w-[470px] items-center gap-2.5 rounded-full border border-[#D4AF37]/35 bg-white/72 px-4 text-[#5C5346] shadow-[0_8px_24px_rgba(140,109,31,0.08)] lg:flex dark:bg-white/5 dark:text-slate-100">
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

              <button onClick={handleThemeToggle} className="vijayam-theme-toggle shrink-0 border border-[#D4AF37]/45 dark:border-[#93c5ff]/35" aria-label={isDark ? text.dayMode : text.nightMode} title={isDark ? text.dayMode : text.nightMode}>
                <span className="vijayam-theme-track-icon vijayam-sun-icon" aria-hidden="true">
                  <SunMedium size={15} strokeWidth={2.6} />
                </span>
                <span className="vijayam-theme-track-icon vijayam-moon-icon" aria-hidden="true">
                  <MoonStar size={14} strokeWidth={2.7} />
                </span>
                <span className="vijayam-theme-thumb" aria-hidden="true">
                  {isDark ? <MoonStar size={15} strokeWidth={2.7} /> : <SunMedium size={15} strokeWidth={2.7} />}
                </span>
              </button>

              <Link href="/login" className="vijayam-navbar-login hidden h-11 shrink-0 items-center rounded-2xl bg-gradient-to-r from-[#E8C874] to-[#B08D57] px-6 text-sm font-bold text-[#2B2620] shadow-[0_8px_18px_rgba(140,109,31,0.16)] transition hover:-translate-y-0.5 md:flex">{text.login}</Link>

              <button onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-full text-[#5C5346] xl:hidden dark:text-white" aria-label="Toggle navigation">
                {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
              </button>
            </div>
          </div>

          <nav className="hidden pb-4 xl:block">
            <div className="grid grid-cols-6 gap-2.5 rounded-3xl border border-[#D4AF37]/20 bg-white/50 p-2.5 shadow-[0_8px_28px_rgba(140,109,31,0.05)] backdrop-blur-xl dark:bg-white/5">
              {categories.map((item, index) => (
                index === 1 ? (
                  <div key={item.href} className="relative" onMouseEnter={openShopMenu} onMouseLeave={closeShopMenuSoon}>
                    <button
                      type="button"
                      onClick={() => (shopOpen ? closeShopMenuNow() : openShopMenu())}
                      className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-2xl border border-[#D4AF37]/15 bg-white/60 px-2.5 py-2 text-center text-[13px] font-semibold text-[#5C5346] transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:bg-[#FFF3D6] hover:text-[#8C6D1F] dark:bg-white/5 dark:text-slate-200"
                      aria-expanded={shopOpen}
                    >
                      {item.label}
                      <ChevronDown size={15} className={`transition-transform duration-300 ${shopOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div
                      className={`vijayam-shop-panel absolute left-1/2 top-full z-[100] mt-3 w-[31rem] rounded-[1.65rem] bg-[#FFFDF5]/80 p-[1px] shadow-[0_26px_70px_rgba(74,53,9,0.24)] backdrop-blur-2xl dark:bg-[#111111]/82 ${shopOpen ? "vijayam-shop-panel-open" : ""}`}
                      onMouseEnter={openShopMenu}
                      onMouseLeave={closeShopMenuSoon}
                    >
                      <div className="vijayam-shop-panel-shell relative overflow-hidden rounded-[1.6rem] border border-white/80 p-3 dark:border-white/10">
                        <div className="grid grid-cols-2 gap-2.5">
                          {shopSubLinks.map((subItem) => {
                            const Icon = subItem.icon;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={closeShopMenuNow}
                                data-tone={subItem.tone}
                                className={`vijayam-shop-card group relative grid place-items-center overflow-hidden rounded-[1.35rem] border border-white/75 p-4 shadow-2xl ${subItem.glow} ring-1 ring-[#D4AF37]/25 transition duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#D4AF37]/70 hover:shadow-[0_24px_52px_rgba(140,109,31,0.24)] dark:border-white/10 dark:ring-[#D4AF37]/15`}
                              >
                                <span className="vijayam-shop-icon" aria-hidden="true"><Icon /></span>
                                <span className="vijayam-shop-name mt-3 text-center text-[15px] font-black tracking-tight text-[#34291f] group-hover:text-[#8C6D1F] dark:text-slate-100 dark:group-hover:text-[#F3D27A]">
                                  {subItem.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} className="flex min-h-10 items-center justify-center rounded-2xl border border-[#D4AF37]/15 bg-white/60 px-2.5 py-2 text-center text-[13px] font-semibold text-[#5C5346] transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:bg-[#FFF3D6] hover:text-[#8C6D1F] dark:bg-white/5 dark:text-slate-200">
                    {item.label}
                  </Link>
                )
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
                {categories.map((item, index) => (
                  index === 1 ? (
                    <div key={item.href} className="col-span-2 rounded-3xl border border-[#D4AF37]/25 bg-white/75 p-3 shadow-[0_16px_36px_rgba(140,109,31,0.12)] backdrop-blur-xl dark:bg-white/5">
                      <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#D4AF37]/20 bg-[#FFF3D6]/80 px-4 py-2.5 dark:bg-white/10">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8C6D1F] dark:text-[#F3D27A]">Browse books</p>
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#B08D57] dark:text-[#F3D27A]">4 sections</span>
                      </div>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {shopSubLinks.map((subItem) => {
                          const Icon = subItem.icon;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              data-tone={subItem.tone}
                              className={`vijayam-shop-card relative grid min-h-[112px] place-items-center overflow-hidden rounded-2xl border border-white/70 p-3.5 shadow-lg ring-1 ring-[#D4AF37]/20 transition hover:-translate-y-1 hover:border-[#D4AF37]/60 dark:border-white/10`}
                            >
                              <span className="vijayam-shop-icon" aria-hidden="true"><Icon /></span>
                              <span className="vijayam-shop-name mt-2.5 text-center text-sm font-black tracking-tight text-[#34291f] dark:text-slate-100">{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-2xl border border-[#D4AF37]/20 bg-white/60 px-3 py-3 text-center text-sm font-semibold text-[#5C5346] dark:bg-white/5 dark:text-slate-200">
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
