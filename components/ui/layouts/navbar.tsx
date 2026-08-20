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
  English: { categories: ["Home", "Courses", "Shop Now", "Catalogues", "Promo Copy", "Join as an Author", "About Us"], search: "Search ISBN / Book Name", login: "Login", cart: "Cart", dayMode: "Day Mode", nightMode: "Night Mode", language: "Language" },
  Telugu: { categories: ["హోమ్", "కోర్సులు", "షాప్", "కేటలాగ్స్", "ప్రోమో కాపీ", "రచయితగా చేరండి", "మా గురించి"], search: "ISBN / పుస్తక పేరు వెతకండి", login: "లాగిన్", cart: "కార్ట్", dayMode: "డే మోడ్", nightMode: "నైట్ మోడ్", language: "భాష" },
  Hindi: { categories: ["होम", "कोर्स", "अभी खरीदें", "कैटलॉग", "प्रोमो कॉपी", "लेखक बनें", "हमारे बारे में"], search: "ISBN / पुस्तक का नाम खोजें", login: "लॉगिन", cart: "कार्ट", dayMode: "डे मोड", nightMode: "नाइट मोड", language: "भाषा" },
  Tamil: { categories: ["முகப்பு", "படிப்புகள்", "இப்போது வாங்க", "பட்டியல்கள்", "புரோமோ நகல்", "ஆசிரியராக சேரவும்", "எங்களை பற்றி"], search: "ISBN / புத்தகப் பெயரைத் தேடுங்கள்", login: "உள்நுழைய", cart: "வண்டி", dayMode: "பகல் முறை", nightMode: "இரவு முறை", language: "மொழி" },
  Marathi: { categories: ["मुख्यपृष्ठ", "अभ्यासक्रम", "आता खरेदी करा", "कॅटलॉग", "प्रोमो प्रत", "लेखक बना", "आमच्याबद्दल"], search: "ISBN / पुस्तकाचे नाव शोधा", login: "लॉगिन", cart: "कार्ट", dayMode: "डे मोड", nightMode: "नाईट मोड", language: "भाषा" },
  Gujarati: { categories: ["હોમ", "કોર્સ", "હમણાં ખરીદો", "કેટલોગ", "પ્રોમો કોપી", "લેખક બનો", "અમારા વિશે"], search: "ISBN / પુસ્તકનું નામ શોધો", login: "લૉગિન", cart: "કાર્ટ", dayMode: "ડે મોડ", nightMode: "નાઇટ મોડ", language: "ભાષા" },
  Odia: { categories: ["ମୁଖ୍ୟପୃଷ୍ଠା", "ପାଠ୍ୟକ୍ରମ", "ଏବେ କିଣନ୍ତୁ", "କାଟାଲଗ୍", "ପ୍ରୋମୋ କପି", "ଲେଖକ ହୁଅନ୍ତୁ", "ଆମ ବିଷୟରେ"], search: "ISBN / ପୁସ୍ତକ ନାମ ଖୋଜନ୍ତୁ", login: "ଲଗଇନ", cart: "କାର୍ଟ", dayMode: "ଦିନ ମୋଡ୍", nightMode: "ରାତି ମୋଡ୍", language: "ଭାଷା" },
  Bengali: { categories: ["হোম", "কোর্স", "এখনই কিনুন", "ক্যাটালগ", "প্রোমো কপি", "লেখক হন", "আমাদের সম্পর্কে"], search: "ISBN / বইয়ের নাম খুঁজুন", login: "লগইন", cart: "কার্ট", dayMode: "ডে মোড", nightMode: "নাইট মোড", language: "ভাষা" },
  Malayalam: { categories: ["ഹോം", "കോഴ്സുകൾ", "ഇപ്പോൾ വാങ്ങുക", "കാറ്റലോഗുകൾ", "പ്രൊമോ കോപ്പി", "രചയിതാവാകുക", "ഞങ്ങളെക്കുറിച്ച്"], search: "ISBN / പുസ്തകത്തിന്റെ പേര് തിരയുക", login: "ലോഗിൻ", cart: "കാർട്ട്", dayMode: "ഡേ മോഡ്", nightMode: "നൈറ്റ് മോഡ്", language: "ഭാഷ" },
  Kashmiri: { categories: ["گھر", "کورس", "ہَس کِنِو", "کیٹلاگ", "پرومو کاپی", "مصنف بنو", "اسان متعلق"], search: "ISBN / کتابُک ناو تلاش کرو", login: "لاگ اِن", cart: "کارٹ", dayMode: "دن موڈ", nightMode: "رات موڈ", language: "زبان" },
  Rajasthani: { categories: ["घर", "कोर्स", "अभी खरीदो", "कैटलॉग", "प्रोमो कॉपी", "लेखक बणो", "म्हारे बारे में"], search: "ISBN / किताब रो नांव खोजो", login: "लॉगिन", cart: "कार्ट", dayMode: "दिन मोड", nightMode: "रात मोड", language: "भाषा" },
};

const links = ["/", "/books", "/categories", "/publishers", "/new-arrivals", "/best-sellers", "/contact"];

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
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
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
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/25 bg-[#FFF8E7]/90 shadow-[0_12px_35px_rgba(140,109,31,0.12)] backdrop-blur-2xl transition-colors duration-500 dark:border-[#D4AF37]/20 dark:bg-[#111111]/90">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-24 items-center justify-between gap-3 py-4">
          <Link href="/" className="group flex shrink-0 items-center gap-3 text-lg font-black tracking-wide sm:text-xl">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_10px_25px_rgba(140,109,31,0.2)] ring-1 ring-[#D4AF37]/30">
              <img src="/images/vijayam.jpg" alt="Vijayam Publications logo" className="h-full w-full rounded-xl object-cover" />
            </span>
            <span className="hidden bg-gradient-to-r from-[#8C6D1F] via-[#D4AF37] to-[#8C6D1F] bg-clip-text text-transparent sm:block dark:from-[#F3D27A] dark:via-[#D4AF37] dark:to-[#F3D27A]">Vijayam Publications</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <form onSubmit={submitSearch} className="hidden h-12 min-w-[320px] items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/65 px-3 text-[#5C5346] lg:flex dark:bg-white/5 dark:text-slate-100">
              <button type="button" onClick={() => searchInputRef.current?.focus()} aria-label="Focus search"><Mic size={17} /></button>
              <input ref={searchInputRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.search} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#5C5346]/60 dark:placeholder:text-slate-400" />
              <button type="submit" aria-label="Search"><Search size={17} /></button>
            </form>

            <div className="relative hidden sm:block">
              <button onClick={() => setLanguageOpen((open) => !open)} className="flex h-12 items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white/65 px-4 text-sm font-semibold text-[#5C5346] dark:bg-white/5 dark:text-[#F3D27A]" aria-expanded={languageOpen}>
                <Languages size={17} /><span className="max-w-20 truncate">{selectedLanguage}</span><ChevronDown size={16} />
              </button>
              {languageOpen && (
                <div className="absolute right-0 top-full z-[100] mt-3 w-60 rounded-2xl border border-[#D4AF37]/35 bg-[#FFFDF5] p-2 shadow-[0_20px_45px_rgba(74,53,9,0.28)] dark:bg-[#171717]">
                  <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#8C6D1F] dark:text-[#F3D27A]">Choose language · 11</p>
                  {languages.map((language) => (
                    <button key={language} onClick={() => selectLanguage(language)} className={`w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition hover:bg-[#D4AF37]/15 dark:text-slate-200 ${selectedLanguage === language ? "bg-[#D4AF37]/20 text-[#8C6D1F] dark:text-[#F3D27A]" : "text-[#5C5346]"}`}>
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setIsDark((dark) => !dark)} className="flex h-12 items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#FFF3D6] px-4 text-sm font-semibold text-[#8C6D1F] dark:bg-white/5 dark:text-[#F3D27A]" aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}>
              {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}<span className="hidden md:inline">{isDark ? text.dayMode : text.nightMode}</span>
            </button>

            <Link href="/login" className="hidden h-12 items-center rounded-2xl bg-gradient-to-r from-[#E8C874] to-[#B08D57] px-5 text-sm font-bold text-[#2B2620] shadow-md transition hover:scale-[1.03] md:flex">{text.login}</Link>
            <Link href="/cart" className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white/65 text-[#5C5346] dark:bg-white/5 dark:text-[#F3D27A]" aria-label={text.cart}>
              <ShoppingBag size={19} /><span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8C6D1F] text-[10px] text-white">0</span>
            </Link>
            <button onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#5C5346] xl:hidden dark:text-white" aria-label="Toggle navigation">
              {mobileMenuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        <nav className="hidden pb-4 xl:block">
          <div className="grid grid-cols-7 gap-3 rounded-3xl border border-[#D4AF37]/20 bg-white/45 p-3 backdrop-blur-xl dark:bg-white/5">
            {categories.map((item) => <Link key={item.href} href={item.href} className="rounded-2xl border border-[#D4AF37]/15 bg-white/60 px-3 py-3 text-center text-sm font-semibold text-[#5C5346] transition hover:border-[#D4AF37]/60 hover:bg-[#FFF3D6] hover:text-[#8C6D1F] dark:bg-white/5 dark:text-slate-200">{item.label}</Link>)}
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
            <label className="flex items-center gap-3 rounded-2xl border border-[#D4AF37]/25 bg-white/60 px-4 py-3 text-sm font-semibold text-[#5C5346] dark:bg-white/5 dark:text-[#F3D27A]">
              <Languages size={18} /><span>{text.language}</span>
              <select value={selectedLanguage} onChange={(event) => selectLanguage(event.target.value as Language)} className="ml-auto bg-transparent text-right outline-none dark:bg-[#111111]">
                {languages.map((language) => <option key={language} value={language}>{language}</option>)}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="rounded-2xl border border-[#D4AF37]/20 bg-white/60 px-3 py-3 text-center text-sm font-semibold text-[#5C5346] dark:bg-white/5 dark:text-slate-200">{item.label}</Link>)}
            </div>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#E8C874] to-[#B08D57] px-5 text-sm font-bold text-[#2B2620]">{text.login}</Link>
          </div>
        </div>
      )}
    </header>
  );
}