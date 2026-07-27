"use client";

import {
  BookOpen,
  Download,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

export default function CatalogueSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-yellow-600 via-orange-600 to-sky-700">

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div>

            <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-white font-semibold backdrop-blur">

              <BookOpen size={18} className="mr-2" />

              2026 Academic Catalogue

            </span>

            <h2 className="mt-8 text-5xl font-bold text-white leading-tight">

              Discover Every Book

              <br />

              in One Catalogue

            </h2>

            <p className="mt-8 text-blue-100 text-lg leading-8">

              Browse the complete collection of Vijayam Publications
              covering Nursing, GNM, ANM, Allied Healthcare,
              Degree and Competitive Examination books.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="/catalogue"
                className="rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 hover:scale-105 transition"
              >
                Browse Catalogue
              </Link>

              <Link
                href="/catalogue/vijayam-publications-2026.pdf"
                className="rounded-xl border border-white px-7 py-4 text-white hover:bg-white hover:text-blue-700 transition flex items-center"
              >
                <Download size={18} className="mr-2"/>

                Download PDF
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex justify-center">

            <div className="relative">

              <div className="w-[330px] h-[470px] rounded-3xl bg-white shadow-2xl rotate-[-6deg] absolute"></div>

              <div className="relative w-[330px] h-[470px] rounded-3xl bg-gradient-to-b from-blue-50 to-white shadow-2xl p-8">

                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white">

                  <BookOpen size={30} />

                </div>

                <h3 className="mt-8 text-3xl font-bold">

                  VIJAYAM

                </h3>

                <p className="text-gray-500 mt-2">

                  Publications

                </p>

                <div className="mt-12 space-y-4">

                  <div className="rounded-xl bg-blue-100 p-4 font-semibold">
                    B.Sc Nursing
                  </div>

                  <div className="rounded-xl bg-pink-100 p-4 font-semibold">
                    GNM
                  </div>

                  <div className="rounded-xl bg-green-100 p-4 font-semibold">
                    ANM
                  </div>

                  <div className="rounded-xl bg-violet-100 p-4 font-semibold">
                    Allied Healthcare
                  </div>

                  <div className="rounded-xl bg-orange-100 p-4 font-semibold">
                    Competitive Books
                  </div>

                  <div className="rounded-xl bg-cyan-100 p-4 font-semibold">
                    Degree
                  </div>

                </div>

                <div className="mt-8 flex items-center text-blue-600 font-semibold">

                  View Complete Collection

                  <ArrowRight size={12} className="ml-2"/>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}