import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Programs - MIT First Grade College",
  description:
    "Explore BCA, BBA, B.COM, and M.COM programs at MIT First Grade College, Mysuru. AICTE approved, affiliated to University of Mysore.",
};

const staticPrograms = [
  {
    title: "Bachelor of Computer Applications",
    slug: "bca",
    duration: "3 Years",
    intake: 60,
    description:
      "A comprehensive undergraduate program designed to develop strong foundations in computer science, programming, software engineering, and IT management. Students gain hands-on experience in web development, database management, networking, and emerging technologies.",
    department: { name: "Computer Science" },
    eligibility: "+2/PUC with Mathematics, Computer Science, Business Mathematics, or Accountancy",
    fees: null,
  },
  {
    title: "Bachelor of Business Administration",
    slug: "bba",
    duration: "3 Years",
    intake: 60,
    description:
      "An industry-oriented program focusing on business management fundamentals including marketing, finance, human resources, and entrepreneurship. Students develop managerial skills through case studies, projects, and industry interactions.",
    department: { name: "Management" },
    eligibility: "10+2 in any discipline",
    fees: null,
  },
  {
    title: "Bachelor of Commerce",
    slug: "bcom",
    duration: "3 Years",
    intake: 60,
    description:
      "A versatile commerce program covering accounting, taxation, business law, economics, and financial management. Prepares students for careers in banking, accounting, taxation, and corporate finance.",
    department: { name: "Commerce" },
    eligibility: "10+2 in any discipline",
    fees: null,
  },
  {
    title: "Master of Commerce",
    slug: "mcom",
    duration: "2 Years",
    intake: 40,
    description:
      "An advanced postgraduate program offering deep specialization in accounting, finance, and business research. Ideal for students pursuing academic careers, CA/ICWA qualifications, or senior positions in commerce and industry.",
    department: { name: "Commerce" },
    eligibility:
      "Bachelor's degree in Commerce or BBA with minimum 45% aggregate (5% relaxation for SC/ST candidates)",
    fees: null,
  },
];

const programMeta: Record<
  string,
  { borderColor: string; iconBg: string; iconColor: string; icon: string; level: string }
> = {
  bca: {
    borderColor: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    level: "Undergraduate",
  },
  bba: {
    borderColor: "border-l-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    level: "Undergraduate",
  },
  bcom: {
    borderColor: "border-l-emerald-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    level: "Undergraduate",
  },
  mcom: {
    borderColor: "border-l-indigo-500",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    level: "Postgraduate",
  },
};

const defaultMeta = {
  borderColor: "border-l-primary",
  iconBg: "bg-primary/10",
  iconColor: "text-primary",
  icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  level: "Program",
};

async function getPrograms() {
  try {
    const courses = await db.course.findMany({
      where: { published: true },
      include: { department: true },
      orderBy: { sortOrder: "asc" },
    });
    return courses.length > 0 ? courses : null;
  } catch {
    return null;
  }
}

export default async function ProgramsPage() {
  const dbPrograms = await getPrograms();
  const programs = dbPrograms
    ? dbPrograms.map((c) => ({
        title: c.title,
        slug: c.slug,
        duration: c.duration,
        intake: c.intake,
        description: c.description,
        department: c.department,
        eligibility: c.eligibility,
        fees: c.fees,
      }))
    : staticPrograms;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#003B7C] via-[#00306a] to-[#001f4a] text-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E67E22]/10 blur-3xl" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 bg-[#E67E22]/80 text-white text-sm font-bold rounded-full mb-6">
              AICTE &amp; UGC Approved
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Academic <span className="text-[#E67E22]">Programs</span>
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              Affiliated to University of Mysore. Choose the path that leads to
              your future with industry-aligned curriculum.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="OUR PROGRAMS"
            title="Undergraduate &amp; Postgraduate Courses"
            subtitle="Each program is designed to provide strong academic foundations and industry-ready skills"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => {
              const meta = programMeta[program.slug] ?? defaultMeta;
              return (
                <ScrollReveal key={program.slug} delay={i * 0.1}>
                  <div
                    className={`group premium-card hover-lift bg-white rounded-2xl overflow-hidden border border-border border-l-4 ${meta.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
                  >
                    <div className="p-8 flex-1 flex flex-col">
                      {/* Header row */}
                      <div className="flex items-start gap-5 mb-5">
                        <div className={`w-14 h-14 ${meta.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                          <svg className={`w-7 h-7 ${meta.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={meta.icon} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${meta.iconBg} ${meta.iconColor}`}>
                              {meta.level}
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {program.duration}
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                              {program.intake} Seats
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                            {program.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {program.department.name}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">
                        {program.description}
                      </p>

                      {program.eligibility && (
                        <div className="mb-5 p-4 bg-muted/60 rounded-xl border border-border">
                          <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider">
                            Eligibility
                          </span>
                          <p className="text-sm text-foreground mt-1.5 leading-relaxed">
                            {program.eligibility}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
                        <Link
                          href={`/programs/${program.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
                        >
                          View Program
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        <Link
                          href="/admission"
                          className="ml-auto px-5 py-2 bg-primary text-white text-sm rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us strip */}
      <section className="py-16 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                  title: "NAAC A Grade",
                  desc: "Accredited institution ensuring quality standards",
                },
                {
                  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  title: "Experienced Faculty",
                  desc: "Dedicated professors with industry expertise",
                },
                {
                  icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Placement Support",
                  desc: "Industry connections and career guidance",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#003B7C] to-[#001f4a] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-5">
              Not sure which program is right for you?
            </h2>
            <p className="text-xl text-white/85 mb-10 max-w-xl mx-auto">
              Our counselors can help you choose the best program based on your
              interests and career goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#cf6d17] shadow-lg transition-all duration-300"
            >
              Talk to a Counselor
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
