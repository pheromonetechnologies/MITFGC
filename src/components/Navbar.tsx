"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-primary-dark to-primary backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-bold text-lg backdrop-blur-sm border border-white/20">
              MIT
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-tight">MIT FGC</div>
              <div className="text-xs text-white/80">First Grade College</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              Home
            </Link>
            <Link href="#programs" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              Programs
            </Link>
            <Link href="#about" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              About
            </Link>
            <Link href="#contact" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
              Contact
            </Link>
            <Link 
              href="#apply" 
              className="ml-2 px-6 py-2 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-2 bg-primary-dark/50 backdrop-blur-md">
          <Link
            href="/"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#programs"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Programs
          </Link>
          <Link
            href="#about"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="block px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="#apply"
            className="block px-4 py-3 bg-white text-primary rounded-lg font-semibold text-center hover:bg-white/90 transition-all duration-300 mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
