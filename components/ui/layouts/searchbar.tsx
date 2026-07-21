"use client";

import { useState, FormEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Search books, authors, ISBN...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Later we'll redirect to:
    // /search?q=...
    console.log("Searching:", query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
      />

      <button
        type="submit"
        className="flex h-12 w-12 items-center justify-center bg-blue-600 text-white transition hover:bg-blue-700"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </form>
  );
}