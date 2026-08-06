import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "Publishers", href: "/publishers" },
  { name: "Contact", href: "/contact" },
];

const supportLinks = [
  { name: "Shipping Policy", href: "/shipping-policy" }, // Fixed .tsx extension
  { name: "Return Policy", href: "/return-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "FAQ", href: "/faq" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="text-blue-500" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Vijayam Publications
              </h2>
            </div>
            <p className="max-w-xs leading-relaxed text-slate-400 text-sm">
              India's trusted online bookstore for Medical, Nursing, 
              Pharmacy, Engineering, Competitive Exam, and Academic books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Support</h3>
            <ul className="flex flex-col gap-4">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-500 mt-1 shrink-0" size={18} />
                <span>Vijayawada, Andhra Pradesh<br />India</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-500 shrink-0" size={18} />
                <span>+91 88854 14000, +91 88854 14666</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-blue-500 shrink-0" size={18} />
                <span>vijayampublicationsvja@gmail.com</span>
              </div>

              {/* Social Icons Grid */}
              <div className="flex gap-3 pt-6">
                {[
                  { icon: <FaFacebookF />, href: "https://facebook.com", color: "hover:bg-blue-600" },
                  { icon: <FaInstagram />, href: "https://www.instagram.com/vijayampublications", color: "hover:bg-pink-600" },
                  { icon: <FaLinkedinIn />, href: "https://linkedin.com", color: "hover:bg-sky-700" },
                  { icon: <FaYoutube />, href: "https://www.youtube.com/@vijayam", color: "hover:bg-red-600" },
                ].map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-lg bg-slate-800 p-3 transition-all duration-200 ${social.color}`}
                    aria-label={social.icon.toString()}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-800 pt-8">
          <p className="text-center text-xs text-slate-500">
            © {currentYear} Vijayam Publications. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
