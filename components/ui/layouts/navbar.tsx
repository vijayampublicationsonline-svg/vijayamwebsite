"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "Publishers", href: "/publishers" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Vijayam
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            className="rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            className="rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </button>

          <button
            className="relative rounded-full p-2 transition hover:bg-slate-100"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              0
            </span>
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="space-y-2 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-4 border-t pt-4">
              <button className="rounded-full p-2 hover:bg-slate-100">
                <Search size={20} />
              </button>

              <button className="rounded-full p-2 hover:bg-slate-100">
                <Heart size={20} />
              </button>

              <button className="rounded-full p-2 hover:bg-slate-100">
                <ShoppingCart size={20} />
              </button>

              <button className="rounded-full p-2 hover:bg-slate-100">
                <User size={20} />
              </button>
            </div>

            <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}