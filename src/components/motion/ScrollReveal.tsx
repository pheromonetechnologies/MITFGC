"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
}

const directionMap = {
  up: "y",
  down: "y",
  left: "x",
  right: "x",
  none: null,
} as const;

const directionSign = { up: 1, down: -1, left: 1, right: -1, none: 0 };

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 30,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const axis = directionMap[direction];
  const offset = distance * directionSign[direction];

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, ...(axis ? { [axis]: offset } : {}) };

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration: prefersReduced ? 0.15 : duration,
        delay,
        ease: [0.23, 1, 0.32, 1], // Emil: cubic-bezier(0.23, 1, 0.32, 1) strong ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
