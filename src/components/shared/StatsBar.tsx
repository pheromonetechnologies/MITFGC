"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { end: 15, suffix: "+", label: "Years of Excellence", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { end: 50, suffix: "+", label: "Expert Faculty", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { end: 4, suffix: "", label: "UG/PG Programs", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  { end: 3000, suffix: "+", label: "Library Books", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
];

export function StatsBar() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Icons bounce in — Emil: never from scale(0), start from 0.85
    gsap.from(".stat-icon", {
      scale: 0.85,
      opacity: 0,
      duration: 0.45,
      stagger: 0.06, // Emil: 30-80ms between items
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true },
    });

    // Numbers count up
    const numberEls = gsap.utils.toArray<HTMLElement>(".stat-number");
    numberEls.forEach((el) => {
      const target = parseInt(el.dataset.target ?? "0");
      const suffix = el.dataset.suffix ?? "";

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.val) + suffix;
            },
          });
        },
      });
    });

    // Label fade up
    gsap.from(".stat-label", {
      y: 10,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true },
      delay: 0.3,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-gradient-to-r from-[#0F172A] via-[#0D9488]/10 to-[#0F172A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08),transparent_70%)]" />
      <div className="container mx-auto px-6 py-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="stat-icon w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-[#14B8A6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                </svg>
              </div>
              <div
                className="stat-number text-4xl md:text-5xl font-bold font-serif mb-1 tabular-nums"
                data-target={stat.end}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="stat-label text-sm text-white/70 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
