"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/shared/SectionHeader";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  {
    title: "Sports & Athletics",
    description:
      "Compete in inter-college tournaments across cricket, football, basketball, and athletics. State-level facilities and expert coaching.",
    gradient: "from-primary to-primary/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20h10c0-.76-.85-1.25-2.03-1.79C14.47 17.98 14 17.55 14 17v-2.34" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    title: "Cultural Events",
    description:
      "Experience our annual fest Utsav featuring music, dance, drama, and art competitions that celebrate creativity and talent.",
    gradient: "from-accent to-accent/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: "Technical Workshops",
    description:
      "Hands-on tech sessions covering coding, robotics, IoT, and emerging technologies led by industry professionals.",
    gradient: "from-secondary to-secondary/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "NSS & Community",
    description:
      "Drive positive change through social service initiatives, blood donation camps, village adoption programs, and awareness drives.",
    gradient: "from-purple-500 to-purple-500/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    title: "Library & Research",
    description:
      "Access our well-stocked library with 3,000+ books, digital journals, and quiet study spaces for academic excellence.",
    gradient: "from-primary to-primary/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    title: "Clubs & Societies",
    description:
      "Join student-run clubs spanning tech, arts, debate, entrepreneurship, and social causes to grow beyond academics.",
    gradient: "from-accent to-accent/70",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export function CampusLife() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".campus-card", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
        stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Hover effects guarded by pointer capability
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const cards = sectionRef.current?.querySelectorAll(".campus-card");
        cards?.forEach((card) => {
          const icon = card.querySelector(".campus-icon");
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
              boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              duration: 0.35,
              ease: "cubic-bezier(0.23, 1, 0.32, 1)",
            });
            if (icon) {
              gsap.to(icon, {
                rotate: 8,
                scale: 1.1,
                duration: 0.35,
                ease: "cubic-bezier(0.23, 1, 0.32, 1)",
              });
            }
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              duration: 0.35,
              ease: "cubic-bezier(0.23, 1, 0.32, 1)",
            });
            if (icon) {
              gsap.to(icon, {
                rotate: 0,
                scale: 1,
                duration: 0.35,
                ease: "cubic-bezier(0.23, 1, 0.32, 1)",
              });
            }
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeader
          badge="CAMPUS LIFE"
          title="Beyond the Classroom"
          subtitle="Holistic development through sports, culture, technology, and community service — shaping well-rounded professionals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="campus-card premium-card bg-white rounded-2xl p-7 border border-border relative overflow-hidden"
            >
              {/* Gradient top border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient}`}
              />

              <div className="campus-icon text-foreground/80 mb-4">
                {cat.icon}
              </div>

              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                {cat.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
