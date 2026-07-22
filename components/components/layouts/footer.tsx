import Link from "next/link";

import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "Publishers", href: "/publishers" },
  { name: "Contact", href: "/contact" },
];

const supportLinks = [
  { name: "Shipping Policy", href: "/shipping-policy" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-400" size={28} />

              <h2 className="text-2xl font-bold text-white">
                Vijayam Publications
              </h2>
            </div>

            <p className="leading-7 text-slate-400">
              India's trusted online bookstore for Medical, Nursing,
              Pharmacy, Engineering, Competitive Exam, and Academic books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact U
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 text-blue-400"
                  size={18}
                />

                <span>
                  Vijayawada, Andhra Pradesh
                  <br />
                  India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-400" size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-blue-400" size={18} />
                <span>support@vijayampublications.com</span>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-2 transition hover:bg-blue-600"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={18} />
                </Link>

                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-2 transition hover:bg-pink-600"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </Link>

                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-2 transition hover:bg-sky-700"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </Link>

                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-800 p-2 transition hover:bg-red-600"
                  aria-label="YouTube"
                >
                  <FaYoutube size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Vijayam Publications. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}