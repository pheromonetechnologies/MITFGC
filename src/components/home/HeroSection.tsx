"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Emil: strong ease-out curve, clip-path from bottom (not scale(0))
    // Marketing animation so durations can be longer than 300ms UI rule
    const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";
    const tl = gsap.timeline({ defaults: { ease: easeOut } });

    tl.from(".hero-badge", { y: 16, opacity: 0, duration: 0.5 })
      .from(".hero-line1", { y: 50, opacity: 0, duration: 0.75, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, "-=0.25")
      .from(".hero-line2", { y: 50, opacity: 0, duration: 0.75, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }, "-=0.55")
      .from(".hero-sub", { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(".hero-meta", { y: 12, opacity: 0, duration: 0.4 }, "-=0.25")
      .from(".hero-btn", { y: 16, opacity: 0, duration: 0.45, stagger: 0.05 }, "-=0.25"); // Emil: 50ms stagger

    // Parallax on hero bg
    gsap.to(".hero-bg", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Floating blobs
    gsap.to(".hero-blob-1", { y: -20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-blob-2", { y: 20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="hero-bg absolute inset-0 bg-[url('/images/hero-clg.png')] bg-cover bg-center scale-110" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#003B7C]/93 via-[#002854]/89 to-[#001a3a]/96" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.12),transparent_60%)]" />

      {/* Floating blobs */}
      <div className="hero-blob-1 absolute top-16 right-8 w-72 h-72 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="hero-blob-2 absolute bottom-24 left-8 w-96 h-96 bg-secondary/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/15">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              NAAC A Grade | UGC &amp; AICTE Approved
            </span>
          </div>

          <h1 className="font-serif">
            <span className="hero-line1 block text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Shape Your Future at
            </span>
            <span className="hero-line2 block text-4xl md:text-6xl lg:text-7xl font-bold text-accent leading-tight mt-1">
              MIT First Grade College
            </span>
          </h1>

          <p className="hero-sub text-xl md:text-2xl text-white/80 mt-6 mb-3 font-light max-w-2xl leading-relaxed">
            Discover one of the finest education institutions in Mysuru
          </p>
          <p className="hero-meta text-sm text-white/55 mb-10 max-w-xl">
            Affiliated to University of Mysore · Established 2009 · Vidyaranyapura, Mysuru
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/programs"
              className="hero-btn group px-8 py-4 bg-accent text-white rounded-xl font-bold flex items-center gap-3 shadow-[0_8px_30px_rgba(230,126,34,0.3)] hover:bg-accent-dark hover:shadow-[0_12px_40px_rgba(230,126,34,0.45)] hover:-translate-y-1 transition-all duration-300"
            >
              Explore Programs
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="hero-btn px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Visit Campus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
