"use client";

import Link from "next/link";
import {
  Feather,
  BookOpen,
  Award,
  Globe,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function JoinAuthorSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-pink-900 to-beige-900 py-24">

      {/* Background Glow */}
      <div className="absolute -top-24 left-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-white backdrop-blur">

              <Feather className="mr-2 h-5 w-5" />

              Join Our Author Community

            </div>

            <h2 className="mt-8 text-5xl font-extrabold leading-tight text-white">

              Share Your Knowledge.

              <br />

              Publish With

              <span className="text-cyan-300">

                {" "}Vijayam Publications

              </span>

            </h2>

            <p className="mt-8 text-lg leading-8 text-blue-100">

              Transform your expertise into trusted academic books that help
              nursing students, educators, and healthcare professionals across
              India. We support you from manuscript review to publication and
              nationwide distribution.

            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center text-white">
                <CheckCircle2 className="mr-3 text-cyan-300" />
                Professional Editorial Review
              </div>

              <div className="flex items-center text-white">
                <CheckCircle2 className="mr-3 text-cyan-300" />
                ISBN & Copyright Assistance
              </div>

              <div className="flex items-center text-white">
                <CheckCircle2 className="mr-3 text-cyan-300" />
                Premium Cover & Book Design
              </div>

              <div className="flex items-center text-white">
                <CheckCircle2 className="mr-3 text-cyan-300" />
                Print + Digital Publishing
              </div>

              <div className="flex items-center text-white">
                <CheckCircle2 className="mr-3 text-cyan-300" />
                Nationwide Academic Distribution
              </div>

            </div>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/authors/join"
                className="rounded-xl bg-cyan-400 px-8 py-4 font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                Become an Author
              </Link>

              <Link
                href="/authors/guidelines"
                className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Author Guidelines
              </Link>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="rounded-3xl bg-white p-10 shadow-2xl">

              <h3 className="text-3xl font-bold text-slate-900">

                Why Publish With Us?

              </h3>

              <div className="mt-8 grid grid-cols-2 gap-6">

                <div className="rounded-2xl bg-blue-50 p-6">

                  <Award className="h-10 w-10 text-blue-600" />

                  <h4 className="mt-4 font-bold">
                    Academic Excellence
                  </h4>

                  <p className="mt-2 text-sm text-gray-600">
                    Publish books aligned with the latest nursing curriculum.
                  </p>

                </div>

                <div className="rounded-2xl bg-green-50 p-6">

                  <BookOpen className="h-10 w-10 text-green-600" />

                  <h4 className="mt-4 font-bold">
                    Professional Publishing
                  </h4>

                  <p className="mt-2 text-sm text-gray-600">
                    Editing, layout, design, ISBN and production support.
                  </p>

                </div>

                <div className="rounded-2xl bg-orange-50 p-6">

                  <Users className="h-10 w-10 text-orange-600" />

                  <h4 className="mt-4 font-bold">
                    Reach Students
                  </h4>

                  <p className="mt-2 text-sm text-gray-600">
                    Connect with educators and learners across India.
                  </p>

                </div>

                <div className="rounded-2xl bg-purple-50 p-6">

                  <Globe className="h-10 w-10 text-purple-600" />

                  <h4 className="mt-4 font-bold">
                    Wider Distribution
                  </h4>

                  <p className="mt-2 text-sm text-gray-600">
                    Available through online platforms and academic networks.
                  </p>

                </div>

              </div>

              <div className="mt-10 rounded-2xl bg-slate-900 p-6 text-white">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      Ready to Publish?
                    </p>

                    <h4 className="mt-2 text-2xl font-bold">
                      Start Your Author Journey
                    </h4>

                  </div>

                  <ArrowRight className="h-8 w-8 text-cyan-300" />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}