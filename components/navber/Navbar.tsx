"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Materia Medica", href: "/materia-medica" },
  { label: "Symptoms", href: "/symptoms" },
  { label: "Study Notes", href: "/study-notes" },
  { label: "Exam Focus", href: "/exam-focus" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ivory-50/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="group"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-gold-500 bg-forest-950 text-lg font-semibold text-gold-400">
              M
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight text-forest-950">
                Materia Medica
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-text-secondary">
                Study & Reference
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-forest-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/search"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-forest-950"
          >
            Search
          </Link>

          <Link
            href="/my-study"
            className="border border-forest-950 bg-forest-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-900"
          >
            My Study
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-border text-forest-950 transition hover:border-forest-800 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="text-xl">
            {menuOpen ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-ivory-50 lg:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-border py-4 text-sm font-medium text-text-secondary transition-colors hover:text-forest-950"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/search"
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-4 text-sm font-medium text-text-secondary"
              >
                Search
              </Link>

              <Link
                href="/my-study"
                onClick={() => setMenuOpen(false)}
                className="mt-5 bg-forest-950 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-forest-900"
              >
                My Study
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}