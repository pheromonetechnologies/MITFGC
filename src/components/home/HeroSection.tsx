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
    const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";
    const tl = gsap.timeline({ defaults: { ease: easeOut } });

    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
      .from(".hero-line1", {
        y: 60, opacity: 0, duration: 0.8,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      }, "-=0.3")
      .from(".hero-line2", {
        y: 60, opacity: 0, duration: 0.8,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      }, "-=0.55")
      .from(".hero-sub", { y: 20, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(".hero-meta", { y: 14, opacity: 0, duration: 0.4 }, "-=0.25")
      .from(".hero-btn", { y: 20, opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.2")
      .from(".hero-scroll", { y: -10, opacity: 0, duration: 0.4 }, "-=0.1");

    // Floating mesh blobs
    gsap.to(".hero-blob-1", { y: -30, x: 10, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-blob-2", { y: 25, x: -15, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
    gsap.to(".hero-blob-3", { y: -15, x: 20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

    // Parallax content on scroll
    gsap.to(".hero-content", {
      y: -60,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Scroll indicator bounce
    gsap.to(".hero-scroll", {
      y: 8, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Floating particles
    document.querySelectorAll(".hero-particle").forEach((p) => {
      gsap.to(p, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        opacity: `random(0.3, 0.8)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: `random(0, 3)`,
      });
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0F172A]">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0">
        <div className="hero-blob-1 absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-[#0D9488]/20 blur-[120px]" />
        <div className="hero-blob-2 absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#4F46E5]/20 blur-[120px]" />
        <div className="hero-blob-3 absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#F59E0B]/10 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating particles — fixed positions to avoid hydration mismatch */}
      {[
        { top: "18%", left: "12%" }, { top: "32%", left: "45%" },
        { top: "55%", left: "78%" }, { top: "72%", left: "25%" },
        { top: "25%", left: "88%" }, { top: "65%", left: "55%" },
        { top: "42%", left: "15%" }, { top: "80%", left: "68%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="hero-particle absolute w-1 h-1 rounded-full bg-white/30"
          style={pos}
        />
      ))}

      {/* Content */}
      <div className="hero-content container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.06] backdrop-blur-sm rounded-full mb-8 border border-white/10">
            <div className="w-2 h-2 bg-[#0D9488] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/80 tracking-wide">
              NAAC &lsquo;A&rsquo; Grade · Est. 2009 · College Code: 1093
            </span>
          </div>

          <h1 className="font-serif">
            <span className="hero-line1 block text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight">
              Master the Skills to
            </span>
            <span className="hero-line2 block text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mt-2">
              <span className="bg-gradient-to-r from-[#14B8A6] via-[#6366F1] to-[#FBBF24] bg-clip-text text-transparent">
                Drive Your Career
              </span>
            </span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-white/60 mt-8 mb-3 max-w-2xl leading-relaxed">
            Empowering individuals through educational excellence at one of Mysuru&apos;s finest institutions
          </p>
          <p className="hero-meta text-sm text-white/35 mb-10 max-w-xl flex items-center gap-2 flex-wrap">
            <span>Affiliated to University of Mysore</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Maharaja Education Trust</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Vidyaranyapura, Mysuru</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/programs"
              className="hero-btn group px-8 py-4 bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white rounded-2xl font-bold flex items-center gap-3 shadow-[0_8px_30px_rgba(13,148,136,0.3)] hover:shadow-[0_12px_40px_rgba(13,148,136,0.45)] hover:-translate-y-1 transition-transform duration-200"
            >
              Explore Programs
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="hero-btn px-8 py-4 bg-white/[0.06] backdrop-blur-md text-white rounded-2xl font-semibold border border-white/10 hover:bg-white/[0.1] hover:border-white/20 transition-colors duration-200"
            >
              Visit Campus
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
