import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { getPolicy, policies, type Policy } from "./policy-content";

type PolicyPageProps = {
  /** Slug such as "privacypolicy", "shippingpolicy", "returnpolicy", ... */
  slug: string;
};

function PolicyBody({ policy }: { policy: Policy }) {
  return (
    <div className="space-y-8">
      {policy.sections.map((section) => (
        <section
          key={section.heading}
          className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
        >
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {section.heading}
          </h2>

          {section.body?.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-300">
              {paragraph}
            </p>
          ))}

          {section.bullets && (
            <ul className="mt-4 space-y-2">
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-sm leading-7 text-slate-300"
                >
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export default function PolicyPage({ slug }: PolicyPageProps) {
  const policy = getPolicy(slug);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#030712] text-slate-200">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.10),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {!policy ? (
          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/5 p-8">
            <h1 className="text-2xl font-semibold text-white">Policy not found</h1>
            <p className="mt-3 text-sm text-slate-400">
              Please choose one of the policies below.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {policies.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-cyan-400/30 hover:text-cyan-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <header className="mt-8">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {policy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                {policy.tagline}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                <Clock3 size={14} />
                Last updated {policy.updated}
              </p>
            </header>

            <div className="mt-10">
              <PolicyBody policy={policy} />
            </div>

            <div className="mt-12 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                Other policies
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {policies
                  .filter((item) => item.slug !== policy.slug)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${item.slug}`}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-200"
                    >
                      {item.title}
                    </Link>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
