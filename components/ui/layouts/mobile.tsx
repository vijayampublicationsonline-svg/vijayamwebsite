"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  X,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Categories", href: "/categories" },
  { name: "Publishers", href: "/publishers" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-50 flex h-screen w-80 max-w-[85%] flex-col bg-white shadow-2xl lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold text-slate-900">
            Vijayam
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="block rounded-lg px-4 py-3 text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t" />

          {/* Icons */}
          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
              <Search size={20} />
              <span className="text-xs">Search</span>
            </button>

            <button className="flex flex-col items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
              <Heart size={20} />
              <span className="text-xs">Wishlist</span>
            </button>

            <button className="flex flex-col items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
              <ShoppingCart size={20} />
              <span className="text-xs">Cart</span>
            </button>

            <button className="flex flex-col items-center gap-2 rounded-lg border p-3 hover:bg-slate-50">
              <User size={20} />
              <span className="text-xs">Account</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t p-6">
          <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
            Login / Register
          </button>
        </div>
      </aside>
    </>
  );
}