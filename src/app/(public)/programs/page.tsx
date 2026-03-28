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

const gradients = [
  "from-blue-500 to-purple-600",
  "from-orange-500 to-red-600",
  "from-green-500 to-teal-600",
  "from-indigo-500 to-blue-600",
];

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
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Academic Programs</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              AICTE &amp; UGC approved programs affiliated to University of Mysore.
              Choose the path that leads to your future.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="OUR PROGRAMS"
            title="Undergraduate & Postgraduate Courses"
            subtitle="Each program is designed to provide strong academic foundations and industry-ready skills"
          />

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <ScrollReveal key={program.slug} delay={i * 0.1}>
                <div className="group relative bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30 h-full flex flex-col">
                  <div className={`h-2 bg-gradient-to-r ${gradients[i % gradients.length]}`} />
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-primary mb-1">
                          {program.title
                            .replace(/Bachelor of /, "B.")
                            .replace(/Master of /, "M.")
                            .replace(/Computer Applications/, "CA")
                            .replace(/Business Administration/, "BA")
                            .replace(/Commerce/, "COM")}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {program.department.name}
                        </span>
                      </div>
                      <div className="text-right text-sm text-foreground/60">
                        <div className="font-semibold">{program.duration}</div>
                        <div>{program.intake} Seats</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                      {program.description}
                    </p>

                    {program.eligibility && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <span className="text-xs font-semibold text-foreground/60 uppercase">
                          Eligibility
                        </span>
                        <p className="text-sm text-foreground mt-1">
                          {program.eligibility}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
                      <Link
                        href={`/programs/${program.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                      >
                        Learn More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link
                        href="/admission"
                        className="ml-auto px-4 py-2 bg-primary text-white text-sm rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Not sure which program is right for you?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our counselors can help you choose the best program based on your interests and career goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Talk to a Counselor
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
