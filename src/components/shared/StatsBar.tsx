"use client";

import { AnimatedCounter } from "@/components/motion/AnimatedCounter";

export function StatsBar() {
  return (
    <section className="relative -mt-1 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,126,34,0.08),transparent_70%)]" />
      <div className="container mx-auto px-6 py-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <AnimatedCounter end={15} suffix="+" label="Years of Excellence" />
          <AnimatedCounter end={50} suffix="+" label="Expert Faculty" />
          <AnimatedCounter end={4} label="UG/PG Programs" />
          <AnimatedCounter end={3000} suffix="+" label="Library Books" />
        </div>
      </div>
    </section>
  );
}
