"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/shared/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------- SVG Icons ---------- */
const ShieldIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20">
    <path
      d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4Z"
      fill="white"
      opacity={0.15}
    />
    <path
      d="M32 4L8 16v16c0 14.4 10.24 27.84 24 32 13.76-4.16 24-17.6 24-32V16L32 4Z"
      stroke="white"
      strokeWidth={2}
      fill="none"
    />
    <path d="M22 32l7 7 13-14" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <path d="M8 7h6" />
    <path d="M8 11h4" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const GraduationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
);

const HeartHandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

/* ---------- Component ---------- */
export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cardEls = gsap.utils.toArray<HTMLElement>(".bento-card");
      gsap.from(cardEls, {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
        stagger: 0.07,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* Hover glow — only for pointer devices */
      const mm = gsap.matchMedia();
      mm.add("(hover: hover)", () => {
        cardEls.forEach((card) => {
          const glow = card.querySelector<HTMLElement>(".card-glow");
          if (!glow) return;

          card.addEventListener("mouseenter", () => {
            gsap.to(glow, { opacity: 1, duration: 0.35, ease: "power2.out" });
            gsap.to(card, { y: -4, duration: 0.35, ease: "cubic-bezier(0.23, 1, 0.32, 1)" });
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(glow, { opacity: 0, duration: 0.35, ease: "power2.out" });
            gsap.to(card, { y: 0, duration: 0.35, ease: "cubic-bezier(0.23, 1, 0.32, 1)" });
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="WHY MIT FGC"
          title="Excellence in Education Since 2009"
          subtitle="Maharaja Institute of Technology, First Grade College offers NAAC 'A' Grade accredited education with NEP-based programs, modern infrastructure, and unwavering support for every student."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
          {/* ── Card 1: NAAC A Grade (large, 2x2) ── */}
          <div
            className="bento-card premium-card group relative rounded-2xl p-8 md:p-10 flex flex-col justify-between md:col-span-2 md:row-span-2 text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)", willChange: "transform" }}
          >
            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none" style={{ boxShadow: "0 0 40px rgba(13,148,136,0.4)" }} />
            <div className="relative z-10">
              <ShieldIcon />
              <h3 className="text-2xl md:text-3xl font-bold mt-6 mb-3">NAAC &apos;A&apos; Grade</h3>
              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-md">
                Recognized for academic excellence by National Assessment and Accreditation Council
              </p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
          </div>

          {/* ── Card 2: 4 NEP Programs ── */}
          <div
            className="bento-card premium-card group relative rounded-2xl p-6 md:p-8 flex flex-col border-l-4 overflow-hidden"
            style={{ borderLeftColor: "#0D9488", willChange: "transform" }}
          >
            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none" style={{ boxShadow: "0 0 30px rgba(13,148,136,0.15)" }} />
            <div className="relative z-10">
              <div className="text-[#0D9488] mb-4"><GraduationIcon /></div>
              <h3 className="text-lg md:text-xl font-bold mb-1">4 NEP Programs</h3>
              <p className="text-sm font-medium text-muted-foreground mb-2">BCA, B.Com, BBA, M.Com</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                NEP-based curriculum affiliated to University of Mysore
              </p>
            </div>
          </div>

          {/* ── Card 3: 110+ Computers ── */}
          <div
            className="bento-card premium-card group relative rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none" style={{ boxShadow: "0 0 30px rgba(79,70,229,0.15)" }} />
            <div className="relative z-10">
              <div className="text-[#4F46E5] mb-4"><MonitorIcon /></div>
              <h3 className="text-lg md:text-xl font-bold mb-2">110+ Computers</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                State-of-the-art computer labs with LAN &amp; WiFi, microprocessor trainer kits
              </p>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#4F46E5]/5 rounded-bl-[40px]" />
          </div>

          {/* ── Card 4: 3000+ Books ── */}
          <div
            className="bento-card premium-card group relative rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none" style={{ boxShadow: "0 0 30px rgba(0,0,0,0.08)" }} />
            <div className="relative z-10">
              <div className="text-foreground/70 mb-4"><BookIcon /></div>
              <h3 className="text-lg md:text-xl font-bold mb-2">3000+ Books</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Library with reading room, periodicals, and reference material
              </p>
            </div>
          </div>

          {/* ── Card 5: Est. 2009 ── */}
          <div
            className="bento-card premium-card group relative rounded-2xl p-6 md:p-8 flex flex-col overflow-hidden"
            style={{ willChange: "transform" }}
          >
            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none" style={{ boxShadow: "0 0 30px rgba(0,0,0,0.08)" }} />
            <div className="relative z-10">
              <div className="text-foreground/70 mb-4"><BuildingIcon /></div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Est. 2009</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Maharaja Education Trust, Mysuru
              </p>
            </div>
          </div>

          {/* ── Card 6: Arivu-Neravu (wide, 2 cols) ── */}
          <div
            className="bento-card premium-card group relative rounded-2xl p-6 md:p-8 flex flex-col md:col-span-2 text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)", willChange: "transform" }}
          >
            <div className="card-glow absolute inset-0 rounded-2xl opacity-0 pointer-events-none" style={{ boxShadow: "0 0 40px rgba(245,158,11,0.3)" }} />
            <div className="relative z-10">
              <div className="text-white mb-4"><HeartHandIcon /></div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Arivu-Neravu Financial Aid</h3>
              <p className="text-sm md:text-base leading-relaxed text-white/85">
                Free bus for 60+ students, fee concessions, installment plans for economically disadvantaged
              </p>
            </div>
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
