"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook, Instagram, Youtube } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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

  // Scroll listener to toggle scrolled state at 50px
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // GSAP entrance animations
  useGSAP(
    () => {
      const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

      gsap.from(".nav-logo", {
        x: -16,
        opacity: 0,
        duration: 0.45,
        ease,
      });

      gsap.from(".nav-item", {
        y: -12,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.04,
        ease,
        delay: 0.15,
      });

      gsap.from(".nav-apply-btn", {
        scale: 0.9,
        opacity: 0,
        duration: 0.35,
        ease,
        delay: 0.55,
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-[#CCFBF1]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-[60px]" : "h-[72px]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="nav-logo flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 shadow-sm">
              <Image
                src="/images/logo.jpeg"
                alt="MIT FGC Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div
                className={`font-bold text-lg leading-tight font-serif transition-colors duration-500 ${
                  scrolled ? "text-[#0F172A]" : "text-white"
                }`}
              >
                MIT FGC
              </div>
              <div
                className={`text-[10px] hidden sm:block tracking-wider uppercase transition-colors duration-500 ${
                  scrolled ? "text-gray-500" : "text-white/60"
                }`}
              >
                First Grade College, Mysuru
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? pathname === link.href
                      ? "text-[#0D9488] font-semibold"
                      : "text-[#0F172A]/70 hover:text-[#0F172A]"
                    : pathname === link.href
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-[#0D9488] rounded-full" />
                )}
              </Link>
            ))}

            <Link
              href="/admission"
              className="nav-apply-btn ml-4 px-6 py-2.5 bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white rounded-2xl text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2.5 rounded-lg transition-colors ${
              scrolled
                ? "hover:bg-gray-100 text-[#0F172A]"
                : "hover:bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-gradient-to-b from-[#0F172A] to-[#1a2340] z-50 flex flex-col shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
              <Image
                src="/images/logo.jpeg"
                alt="MIT FGC Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight font-serif text-white">
                MIT FGC
              </div>
              <div className="text-[9px] text-white/50 tracking-wider uppercase">
                First Grade College
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-white/80" />
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-white/10 text-white border-l-[3px] border-[#0D9488]"
                  : "text-white/70 hover:bg-white/5 hover:text-white border-l-[3px] border-transparent"
              }`}
              style={{
                animationDelay: open ? `${i * 50}ms` : "0ms",
              }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Drawer footer */}
        <div className="px-5 pb-6 pt-3 border-t border-white/10 space-y-5">
          <Link
            href="/admission"
            className="block w-full py-3 bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white rounded-2xl text-sm font-bold text-center shadow-[0_4px_15px_rgba(13,148,136,0.3)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.45)] transition-shadow duration-200"
            onClick={() => setOpen(false)}
          >
            Apply Now
          </Link>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
