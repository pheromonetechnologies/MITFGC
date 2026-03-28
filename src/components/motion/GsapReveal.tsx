"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  stagger?: boolean;
  staggerSelector?: string;
  staggerAmount?: number;
}

export function GsapReveal({
  children,
  className,
  y = 40,
  x = 0,
  delay = 0,
  duration = 0.7,
  stagger = false,
  staggerSelector = "> *",
  staggerAmount = 0.1,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const targets = stagger
      ? gsap.utils.toArray(ref.current.querySelectorAll(staggerSelector))
      : [ref.current];

    gsap.from(targets, {
      y,
      x,
      opacity: 0,
      duration,
      stagger: stagger ? staggerAmount : 0,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 82%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// GSAP card hover wrapper
export function GsapCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const icon = el.querySelector(".card-icon");

    const onEnter = () => {
      gsap.to(el, { y: -8, boxShadow: "0 20px 40px rgba(0,59,124,0.12)", duration: 0.3, ease: "power2.out" });
      if (icon) gsap.to(icon, { scale: 1.12, rotate: 6, duration: 0.3, ease: "back.out(2)" });
    };
    const onLeave = () => {
      gsap.to(el, { y: 0, boxShadow: "0 4px 20px rgba(0,59,124,0.06)", duration: 0.3, ease: "power2.out" });
      if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3 });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
