"use client";

import {
  BookOpen,
  GraduationCap,
  HeartPulse,
  Microscope,
  Stethoscope,
  BriefcaseMedical,
} from "lucide-react";

const courses = [
  {
    title: "B.Sc Nursing",
    icon: Stethoscope,
    books: "250+ Books",
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "GNM",
    icon: HeartPulse,
    books: "150+ Books",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "ANM",
    icon: GraduationCap,
    books: "120+ Books",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Allied Healthcare",
    icon: Microscope,
    books: "180+ Books",
    color: "from-violet-500 to-indigo-600",
  },
  {
    title: "Competitive Exams",
    icon: BookOpen,
    books: "300+ Books",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Degree",
    icon: BriefcaseMedical,
    books: "100+ Books",
    color: "from-cyan-400 to-blue-700",
  },
];

export default function CoursesSection() {
  return (
    <section className="py-20 bg-white">

      <div className="container mx-auto px-4">

        <div className="text-center mb-14">

          <span className="text-blue-600 font-semibold uppercase tracking-wider">
            Explore
          </span>

          <h2 className="text-4xl font-bold mt-3 text-slate-900">
            Browse by Courses
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover premium academic books carefully organized for every
            healthcare course.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">

          {courses.map((course, index) => {
            const Icon = course.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 duration-300 cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${course.color} flex items-center justify-center text-white mb-5 mx-auto`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-lg font-bold text-center text-slate-900">
                  {course.title}
                </h3>

                <p className="text-center text-sm text-gray-500 mt-2">
                  {course.books}
                </p>

                <button
                  className="mt-6 w-full rounded-xl bg-slate-900 text-white py-2.5 font-medium hover:bg-blue-600 transition"
                >
                  Explore
                </button>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}