import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/ui/layouts/navbar";
import Footer from "@/components/ui/layouts/footer";
import AnnouncementBar from "@/components/ui/layouts/AnnouncementBar";
import Container from "@/components/ui/layouts/container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vijayam Publications",
    template: "%s | Vijayam Publications",
  },
  description:
    "India's trusted online bookstore for Medical, Nursing, Pharmacy, Engineering, Competitive Exam, and Academic books.",
  keywords: [
    "Medical Books",
    "Nursing Books",
    "Pharmacy Books",
    "Engineering Books",
    "Academic Books",
    "Online Bookstore",
    "Vijayam Publications",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}