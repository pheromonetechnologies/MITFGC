"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface FacultyMember {
  id: string;
  name: string;
  slug: string;
  designation: string;
  qualifications: string | null;
  specialization: string | null;
  image: string | null;
  department: { name: string; slug: string };
}

interface GroupedFaculty {
  department: string;
  departmentSlug: string;
  members: FacultyMember[];
}

export function FacultyGrid({ groups }: { groups: GroupedFaculty[] }) {
  const [active, setActive] = useState("all");

  const departments = [{ label: "All Departments", value: "all" }, ...groups.map((g) => ({ label: g.department, value: g.departmentSlug }))];
  const filtered = active === "all" ? groups : groups.filter((g) => g.departmentSlug === active);

  return (
    <>
      {/* Department Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {departments.map((dept) => (
          <button
            key={dept.value}
            onClick={() => setActive(dept.value)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              active === dept.value
                ? "bg-primary text-white shadow-[0_4px_15px_rgba(0,59,124,0.25)]"
                : "bg-white text-muted-foreground hover:bg-primary/5 hover:text-primary border border-border"
            }`}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Faculty Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((group) => (
            <div key={group.departmentSlug} className="mb-14 last:mb-0">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 bg-accent rounded-full" />
                  <h2 className="text-2xl font-bold text-foreground font-serif">
                    Department of {group.department}
                  </h2>
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {group.members.length} Faculty
                  </span>
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.members.map((member, mi) => (
                  <ScrollReveal key={member.id} delay={mi * 0.06}>
                    <Link
                      href={`/faculty/${member.slug}`}
                      className="group block premium-card overflow-hidden h-full"
                    >
                      {/* Avatar area */}
                      <div className="h-52 bg-gradient-to-br from-primary/8 via-accent/5 to-secondary/5 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-3xl font-bold text-primary/40 font-serif">
                              {member.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors font-serif">
                          {member.name}
                        </h3>
                        <p className="text-sm text-accent font-semibold mt-1">
                          {member.designation}
                        </p>
                        {member.qualifications && (
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            </svg>
                            {member.qualifications}
                          </p>
                        )}
                        {member.specialization && (
                          <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            {member.specialization}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold mt-4 group-hover:gap-2.5 transition-all duration-300">
                          View Profile
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
