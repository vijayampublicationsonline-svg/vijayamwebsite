import Link from "next/link";
import { BookOpen } from "lucide-react";

interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      {/* Logo Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
        <BookOpen className="h-6 w-6" />
      </div>

      {/* Logo Text */}
      {showText && (
        <div className="leading-tight">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Vijayam
          </h1>

          <p className="text-xs text-slate-500">
            Medical & Academic Bookstore
          </p>
        </div>
      )}
    </Link>
  );
}