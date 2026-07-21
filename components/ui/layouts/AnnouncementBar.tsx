"use client";

import Link from "next/link";
import { Truck, BadgePercent, MessageCircle } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="hidden border-b bg-blue-600 text-white md:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4">
        {/* Left Side */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Free Shipping on Orders Above ₹999</span>
          </div>

          <div className="flex items-center gap-2">
            <BadgePercent size={16} />
            <span>Student Discounts Available</span>
          </div>
        </div>

        {/* Right Side */}
        <Link
          href="/contact"
          className="flex items-center gap-2 text-sm font-medium transition hover:text-blue-100"
        >
          <MessageCircle size={16} />
          <span>Need Help? Contact Us</span>
        </Link>
      </div>
    </div>
  );
}