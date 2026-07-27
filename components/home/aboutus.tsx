"use client";

import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Award,
  Globe,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="py-24 bg-white">

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div className="relative">

            <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-700 p-10 text-white shadow-2xl">

              <div className="inline-flex rounded-full bg-white/20 px-4 py-2">

                Trusted Academic Publisher

              </div>

              <h2 className="mt-8 text-5xl font-bold leading-tight">

                Empowering Nursing Education

                <br />

                Across India

              </h2>

              <p className="mt-8 text-blue-100 leading-8">

                Vijayam Publications is committed to delivering
                high-quality academic books, faculty resources,
                and innovative learning solutions for Nursing,
                GNM, ANM, Allied Healthcare, Degree and
                Competitive Examination students.

              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">

                <div>

                  <h3 className="text-4xl font-bold">
                    1000+
                  </h3>

                  <p className="text-blue-100">
                    Academic Resources
                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-bold">
                    500+
                  </h3>

                  <p className="text-blue-100">
                    Books Published
                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-bold">
                    100+
                  </h3>

                  <p className="text-blue-100">
                    Expert Authors
                  </p>

                </div>

                <div>

                  <h3 className="text-4xl font-bold">
                    India
                  </h3>

                  <p className="text-blue-100">
                    Nationwide Reach
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-semibold">

              About Vijayam Publications

            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900">

              Trusted by Students,

              <br />

              Educators & Institutions

            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-8">

              Our mission is to simplify healthcare education by
              creating curriculum-focused books and teaching
              resources that support students, faculty, and
              institutions in achieving academic excellence.

            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center">

                <CheckCircle2 className="mr-4 text-blue-600"/>

                Latest Curriculum-Based Publications

              </div>

              <div className="flex items-center">

                <CheckCircle2 className="mr-4 text-blue-600"/>

                Experienced Academic Authors

              </div>

              <div className="flex items-center">

                <CheckCircle2 className="mr-4 text-blue-600"/>

                Faculty Teaching Resources

              </div>

              <div className="flex items-center">

                <CheckCircle2 className="mr-4 text-blue-600"/>

                Print & Digital Learning Solutions

              </div>

              <div className="flex items-center">

                <CheckCircle2 className="mr-4 text-blue-600"/>

                Dedicated Support for Colleges & Institutions

              </div>

            </div>

            <div className="mt-12 grid grid-cols-2 gap-5">

              <div className="rounded-2xl border p-6">

                <BookOpen className="text-blue-600 h-10 w-10"/>

                <h4 className="mt-4 font-bold">
                  Academic Books
                </h4>

              </div>

              <div className="rounded-2xl border p-6">

                <GraduationCap className="text-green-600 h-10 w-10"/>

                <h4 className="mt-4 font-bold">
                  Student Success
                </h4>

              </div>

              <div className="rounded-2xl border p-6">

                <Users className="text-orange-600 h-10 w-10"/>

                <h4 className="mt-4 font-bold">
                  Faculty Resources
                </h4>

              </div>

              <div className="rounded-2xl border p-6">

                <Building2 className="text-purple-600 h-10 w-10"/>

                <h4 className="mt-4 font-bold">
                  Institutional Support
                </h4>

              </div>

            </div>

            <div className="mt-12 flex gap-4">

              <Link
                href="/about"
                className="rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition"
              >
                Learn More
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-blue-600 px-8 py-4 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
