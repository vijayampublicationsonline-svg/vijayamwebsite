"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export default function PromoSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-24">

      {/* Decorative Blurs */}

      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur">

              <Sparkles className="mr-2 h-4 w-4" />

              Faculty Resource Centre

            </div>

            <h2 className="mt-8 text-5xl font-extrabold leading-tight text-white">

              Everything a Nursing
              <br />
              Educator Needs
              <br />
              <span className="text-cyan-300">
                In One Place.
              </span>

            </h2>

            <p className="mt-8 text-lg leading-8 text-blue-100">

              Save hours of preparation with professionally
              designed lecture notes, PowerPoint presentations,
              lesson plans, question banks, practical manuals,
              previous papers and teaching guides.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/faculty-resources"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:scale-105"
              >
                Explore Resources
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-700"
              >
                Join Free
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

                <BookOpen className="mb-4 h-10 w-10 text-cyan-300" />

                <h3 className="text-xl font-bold text-white">
                  Lecture Notes
                </h3>

                <p className="mt-3 text-blue-100">
                  Structured notes prepared according to the latest syllabus.
                </p>

              </div>

              <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

                <GraduationCap className="mb-4 h-10 w-10 text-cyan-300" />

                <h3 className="text-xl font-bold text-white">
                  Teaching PPTs
                </h3>

                <p className="mt-3 text-blue-100">
                  Ready-to-use classroom presentations.
                </p>

              </div>

              <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

                <FileText className="mb-4 h-10 w-10 text-cyan-300" />

                <h3 className="text-xl font-bold text-white">
                  Question Banks
                </h3>

                <p className="mt-3 text-blue-100">
                  Unit-wise and university-wise practice questions.
                </p>

              </div>

              <div className="rounded-3xl bg-white/10 p-7 backdrop-blur">

                <Download className="mb-4 h-10 w-10 text-cyan-300" />

                <h3 className="text-xl font-bold text-white">
                  Instant Access
                </h3>

                <p className="mt-3 text-blue-100">
                  Download free resources or unlock premium materials.
                </p>

              </div>

            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 shadow-2xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Trusted by Educators
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    Faculty Resource Centre
                  </h3>

                </div>

                <ArrowRight className="h-8 w-8 text-blue-600" />

              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">

                <div>

                  <h4 className="text-2xl font-bold text-blue-700">
                    1000+
                  </h4>

                  <p className="text-sm text-gray-500">
                    Resources
                  </p>

                </div>

                <div>

                  <h4 className="text-2xl font-bold text-blue-700">
                    Free
                  </h4>

                  <p className="text-sm text-gray-500">
                    Downloads
                  </p>

                </div>

                <div>

                  <h4 className="text-2xl font-bold text-blue-700">
                    Premium
                  </h4>

                  <p className="text-sm text-gray-500">
                    Collection
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}