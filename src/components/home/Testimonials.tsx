"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const easing = [0.23, 1, 0.32, 1] as const;

const testimonials = [
  {
    name: "Priya Sharma",
    program: "B.Com",
    quote:
      "The supportive faculty and practical learning approach helped me secure a position at a top accounting firm.",
  },
  {
    name: "Rahul Gowda",
    program: "BCA",
    quote:
      "The computer labs and project-based learning gave me real-world skills that employers value.",
  },
  {
    name: "Ananya Reddy",
    program: "BBA",
    quote:
      "MIT FGC's focus on entrepreneurship inspired me to start my own business during final year.",
  },
];

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 28C12 24.6863 14.6863 22 18 22H20V18C20 14.6863 17.3137 12 14 12H13C12.4477 12 12 11.5523 12 11V9C12 8.44772 12.4477 8 13 8H14C19.5228 8 24 12.4772 24 18V32C24 34.2091 22.2091 36 20 36H16C13.7909 36 12 34.2091 12 32V28Z"
        fill="currentColor"
      />
      <path
        d="M28 28C28 24.6863 30.6863 22 34 22H36V18C36 14.6863 33.3137 12 30 12H29C28.4477 12 28 11.5523 28 11V9C28 8.44772 28.4477 8 29 8H30C35.5228 8 40 12.4772 40 18V32C40 34.2091 38.2091 36 36 36H32C29.7909 36 28 34.2091 28 32V28Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1L12.39 6.84L18.66 7.27L13.83 11.46L15.39 17.64L10 14.4L4.61 17.64L6.17 11.46L1.34 7.27L7.61 6.84L10 1Z"
        fill="#F59E0B"
        stroke="#F59E0B"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 sm:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#0F172A]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#F59E0B]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easing }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[#0D9488]/10 px-4 py-1.5 text-sm font-medium text-[#0D9488]">
            Voices of MIT FGC
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Inspiring Words &{" "}
            <span className="text-[#0D9488]">Testimonials</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Principal's Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easing }}
            className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 sm:p-10"
          >
            {/* Gradient accent bar */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#0D9488] via-[#F59E0B] to-[#4F46E5]" />

            <QuoteIcon className="mb-6 text-[#0D9488]/15" />

            <blockquote className="mb-8 text-lg leading-relaxed text-gray-700 sm:text-xl">
              &ldquo;At MIT First Grade College, we are committed to nurturing
              well-rounded individuals who can lead with integrity and
              innovation. Our vision is to empower every student with the
              knowledge, skills, and values to shape a better tomorrow.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#0D9488] to-[#0D9488]/70 text-lg font-bold text-white">
                AK
              </div>
              <div>
                <p className="font-serif text-lg font-semibold text-gray-900">
                  Dr. Arvind Kumar
                </p>
                <p className="text-sm text-[#0D9488]">Principal, MIT FGC</p>
              </div>
            </div>

            {/* Hover accent — guarded */}
            <style jsx>{`
              @media (hover: hover) {
                .group:hover {
                  box-shadow: 0 20px 40px -12px rgba(13, 148, 136, 0.12);
                }
              }
            `}</style>
          </motion.div>

          {/* Student Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easing, delay: 0.06 }}
            className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 sm:p-10"
          >
            {/* Gradient accent bar */}
            <div className="absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#4F46E5] via-[#F59E0B] to-[#0D9488]" />

            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium uppercase tracking-wider text-[#14B8A6]">
                Student Testimonials
              </span>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-8 bg-[#0D9488]"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4, ease: easing }}
                >
                  <QuoteIcon className="mb-4 text-[#F59E0B]/15" />

                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>

                  <blockquote className="mb-8 text-lg leading-relaxed text-gray-700">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#14B8A6] to-[#14B8A6]/70 text-sm font-bold text-white">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-serif text-base font-semibold text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-sm text-gray-500">{t.program}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
