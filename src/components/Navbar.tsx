"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Faculty", href: "/faculty" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Stagger nav items entrance on mount
    gsap.from(".nav-item", {
      y: -16,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.from(".nav-logo", {
      x: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(".nav-apply-btn", {
      scale: 0.85,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.7,
    });

    // Scroll-based shrink
    ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => {
        const progress = self.progress;
        setScrolled(progress > 0);
      },
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-primary/96 backdrop-blur-md shadow-[0_4px_30px_rgba(0,59,124,0.2)]"
          : "bg-gradient-to-r from-primary via-primary-dark to-primary"
      } text-white`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[60px]" : "h-[68px]"}`}>
          <Link href="/" className="nav-logo flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
              <Image src="/images/logo.jpeg" alt="MIT FGC Logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight font-serif">MIT FGC</div>
              <div className="text-[10px] text-white/60 hidden sm:block tracking-wider uppercase">First Grade College, Mysuru</div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  pathname === link.href
                    ? "text-white font-semibold"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                  pathname === link.href ? "w-5" : "w-0 group-hover:w-4"
                }`} />
              </Link>
            ))}
            <Link
              href="/admission"
              className="nav-apply-btn ml-4 px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent-dark transition-all duration-300 shadow-[0_4px_15px_rgba(230,126,34,0.3)] hover:shadow-[0_6px_20px_rgba(230,126,34,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-4 py-3 space-y-1 bg-primary-dark/90 backdrop-blur-xl border-t border-white/10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admission"
            className="block px-4 py-3 bg-accent text-white rounded-lg text-sm font-bold text-center mt-3 shadow-lg"
            onClick={() => setOpen(false)}
          >
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
