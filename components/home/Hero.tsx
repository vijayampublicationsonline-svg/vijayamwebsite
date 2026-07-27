import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-yellow-500 via-amber to-yellow-250">

      <div className="absolute inset-0">
        <Image
          src="/images"
          alt="Hero"
          fill
          priority
          className="object-cover opacity-10"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-2 font-semibold mb-6">

              📚 India's Trusted Academic Book Store

            </span>

            <h1 className="text-6xl font-black leading-tight">

              Learn Better with

              <span className="text-blue-600 block">

                Vijayam Publications

              </span>

            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8">

            | Bsc Nursing  | GNM | ANM | Allied & Healthcare professions | Competitive Books | Degree |
<br></br>
Discover expertly curated textbooks, exam resources, and academic learning materials designed to help students learn smarter, prepare better, and achieve success.

            </p>

            <div className="flex gap-5 mt-10">

              <Link
                href="/books"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Browse Books
              </Link>

              <Link
                href="/categories"
                className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100 transition"
              >
                Categories
              </Link>

            </div>

            <div className="grid grid-cols-3 gap-8 mt-16">

              <div>

                <h2 className="text-4xl font-bold text-blue-600">600+</h2>

                <p className="text-gray-500">

                  Books

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-blue-600">1M+</h2>

                <p className="text-gray-500">

                  Students

                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-blue-600">23+</h2>

                <p className="text-gray-500">

                  years of publishing 

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <Image
              src="/images/hero-book.png"
              width={600}
              height={600}
              alt="Books"
              priority
              className="mx-auto animate-float"
            />

          </div>

        </div>

      </div>

    </section>
  );
}