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

    // Emil: strong custom ease-out, keep stagger 30-80ms
    gsap.from(targets, {
      y,
      x,
      opacity: 0,
      duration,
      stagger: stagger ? staggerAmount : 0,
      delay,
      ease: "cubic-bezier(0.23, 1, 0.32, 1)",
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

    // Emil: specify exact props, 200ms max, strong ease-out, hover only on pointer devices
    const isPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isPointer) return;

    const onEnter = () => {
      gsap.to(el, { y: -8, boxShadow: "0 20px 40px rgba(13,148,136,0.12)", duration: 0.2, ease: "cubic-bezier(0.23, 1, 0.32, 1)" });
      if (icon) gsap.to(icon, { scale: 1.1, rotate: 5, duration: 0.2, ease: "cubic-bezier(0.23, 1, 0.32, 1)" });
    };
    const onLeave = () => {
      gsap.to(el, { y: 0, boxShadow: "0 4px 20px rgba(13,148,136,0.06)", duration: 0.2, ease: "cubic-bezier(0.23, 1, 0.32, 1)" });
      if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.2 });
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
