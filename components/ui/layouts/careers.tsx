import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

type Opening = {
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

const openings: Opening[] = [
  {
    title: "Content Editor — Nursing",
    team: "Editorial",
    location: "Vijayawada, Andhra Pradesh",
    type: "Full time",
    summary:
      "Edit and structure nursing manuscripts so that every chapter reads clearly for first-year students and exam aspirants alike.",
    responsibilities: [
      "Review manuscripts for accuracy, flow and syllabus coverage.",
      "Work with authors on chapter outlines and revisions.",
      "Prepare question banks, summaries and glossary entries.",
    ],
    requirements: [
      "B.Sc / M.Sc Nursing or a life-sciences degree.",
      "Strong written English and attention to detail.",
      "0–3 years of editorial or teaching experience.",
    ],
  },
  {
    title: "Graphic Designer — Book Covers",
    team: "Design",
    location: "Vijayawada / Hybrid",
    type: "Full time",
    summary:
      "Design covers, interior layouts and marketing creatives that make academic books feel premium.",
    responsibilities: [
      "Create cover concepts and typesetting templates.",
      "Prepare print-ready artwork with correct bleed and colour profiles.",
      "Design social media creatives for new releases.",
    ],
    requirements: [
      "Portfolio showing print or editorial design work.",
      "Proficiency in Illustrator, InDesign or equivalent tools.",
      "Understanding of print production basics.",
    ],
  },
  {
    title: "Sales Executive — Institutions",
    team: "Sales",
    location: "Andhra Pradesh & Telangana",
    type: "Field role",
    summary:
      "Build relationships with nursing colleges, libraries and distributors across the two Telugu states.",
    responsibilities: [
      "Visit colleges and present our catalogue to faculty.",
      "Handle bulk quotations and follow up on orders.",
      "Collect feedback from students and educators.",
    ],
    requirements: [
      "Any graduate with good spoken Telugu and English.",
      "Willingness to travel within the assigned region.",
      "Prior book or education sales experience is a plus.",
    ],
  },
  {
    title: "Digital Marketing Intern",
    team: "Marketing",
    location: "Remote",
    type: "Internship — 6 months",
    summary:
      "Help our titles reach students through social media, campus communities and email campaigns.",
    responsibilities: [
      "Plan and schedule posts across our social channels.",
      "Write short captions and study-tip content.",
      "Track engagement and report what works.",
    ],
    requirements: [
      "Final-year student or fresh graduate.",
      "Comfortable with Canva and basic analytics.",
      "Clear, friendly writing style.",
    ],
  },
];

const perks = [
  {
    icon: GraduationCap,
    title: "Learn every day",
    text: "You work alongside authors, educators and clinicians on books that students actually study from.",
  },
  {
    icon: Sparkles,
    title: "Ownership from day one",
    text: "Small teams, real responsibility and your name on work that reaches thousands of readers.",
  },
  {
    icon: Clock3,
    title: "Balanced schedule",
    text: "Predictable working hours, Sunday off and flexibility during production crunches.",
  },
];

export default function CareersPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#030712] text-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.10),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
            <Briefcase size={14} />
            Careers at Vijayam Publications
          </p>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Build books that shape the next generation of nurses.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            We are a publishing house from Andhra Pradesh working on clear,
            syllabus-aligned academic titles. If you enjoy careful editing, honest
            design and work that stays on a student&apos;s desk for years, we would
            like to hear from you.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
              >
                <Icon className="text-cyan-300" size={24} />
                <h3 className="mt-4 text-base font-semibold text-white">
                  {perk.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{perk.text}</p>
              </div>
            );
          })}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Open positions
          </h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {openings.map((job) => (
              <article
                key={job.title}
                className="flex flex-col rounded-[1.6rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-cyan-200">
                    {job.team}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-cyan-300" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={13} className="text-cyan-300" />
                    {job.type}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {job.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {job.summary}
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                      What you will do
                    </p>
                    <ul className="mt-2 space-y-2">
                      {job.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-6 text-slate-300"
                        >
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                      What we look for
                    </p>
                    <ul className="mt-2 space-y-2">
                      {job.requirements.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm leading-6 text-slate-300"
                        >
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={`mailto:vijayampublicationsvja@gmail.com?subject=Application - ${job.title}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-200 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-500/20"
                >
                  <Mail size={15} />
                  Apply for this role
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            How to apply
          </h2>
          <ol className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
            <li>
              1. Email your resume with the role name in the subject line to{" "}
              <span className="text-cyan-200">
                vijayampublicationsvja@gmail.com
              </span>
              .
            </li>
            <li>
              2. Add a short note about why this role suits you — designers may
              attach a portfolio link.
            </li>
            <li>
              3. Shortlisted candidates are contacted within 7 working days for a
              short task and an interview.
            </li>
          </ol>

          <p className="mt-6 text-sm text-slate-400">
            Do not see a matching role? Send us a general application and we will
            keep it on file for upcoming openings.
          </p>
        </section>
      </div>
    </main>
  );
}
