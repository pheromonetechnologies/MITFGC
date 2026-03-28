import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Badge } from "@/components/ui/badge";

const staticPrograms: Record<
  string,
  {
    title: string;
    duration: string;
    intake: number;
    description: string;
    eligibility: string;
    fees: string | null;
    department: { name: string };
    faculty: { name: string; designation: string; slug: string }[];
  }
> = {
  bca: {
    title: "Bachelor of Computer Applications",
    duration: "3 Years",
    intake: 60,
    description:
      "The BCA program at MIT First Grade College is a comprehensive three-year undergraduate course designed to provide students with a strong foundation in computer science and its applications. The curriculum covers programming languages (C, C++, Java, Python), web technologies (HTML, CSS, JavaScript, PHP), database management systems, data structures, operating systems, software engineering, computer networks, and emerging technologies.\n\nStudents gain practical experience through lab sessions, mini-projects, and a final-year project. The program also includes soft skills training, aptitude development, and industry visits to ensure students are job-ready upon graduation.",
    eligibility:
      "+2/PUC with Mathematics, Computer Science, Business Mathematics, or Accountancy",
    fees: "Contact admissions office for fee details",
    department: { name: "Computer Science" },
    faculty: [],
  },
  bba: {
    title: "Bachelor of Business Administration",
    duration: "3 Years",
    intake: 60,
    description:
      "The BBA program provides a well-rounded business management education covering all functional areas of management. Students learn principles of management, marketing management, financial management, human resource management, business law, organizational behavior, strategic management, and entrepreneurship development.\n\nThe curriculum integrates theoretical knowledge with practical application through case studies, industrial visits, business plan competitions, and internships. Students develop leadership, communication, and analytical skills essential for managerial roles.",
    eligibility: "10+2 in any discipline",
    fees: "Contact admissions office for fee details",
    department: { name: "Management" },
    faculty: [],
  },
  bcom: {
    title: "Bachelor of Commerce",
    duration: "3 Years",
    intake: 60,
    description:
      "The B.COM program offers a thorough grounding in commerce, accounting, and business studies. Core subjects include financial accounting, cost accounting, corporate accounting, income tax, GST, business law, auditing, banking, economics, and business communication.\n\nStudents are prepared for careers in banking, insurance, accounting, taxation, and corporate finance. The program also lays a strong foundation for higher studies such as M.COM, MBA, CA, ICWA, and CS.",
    eligibility: "10+2 in any discipline",
    fees: "Contact admissions office for fee details",
    department: { name: "Commerce" },
    faculty: [],
  },
  mcom: {
    title: "Master of Commerce",
    duration: "2 Years",
    intake: 40,
    description:
      "The M.COM program is an advanced postgraduate course that provides in-depth knowledge of commerce, accounting, and research methodology. Students study advanced accounting, financial management, research methods, international business, strategic management, and taxation.\n\nThe program is ideal for those aspiring to careers in academia, research, senior management positions, or professional qualifications like CA, ICWA, and NET/SET examinations.",
    eligibility:
      "Bachelor's degree in Commerce or BBA with minimum 45% aggregate marks (5% relaxation for SC/ST candidates)",
    fees: "Contact admissions office for fee details",
    department: { name: "Commerce" },
    faculty: [],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCourse(slug: string) {
  try {
    const course = await db.course.findUnique({
      where: { slug },
      include: {
        department: true,
        faculty: {
          include: {
            faculty: true,
          },
        },
      },
    });
    return course;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  const staticCourse = staticPrograms[slug];
  const title = course?.title ?? staticCourse?.title;

  if (!title) return { title: "Program Not Found" };

  return {
    title: `${title} - MIT First Grade College`,
    description: `${title} program at MIT First Grade College, Mysuru. Duration: ${course?.duration ?? staticCourse?.duration}. Affiliated to University of Mysore.`,
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dbCourse = await getCourse(slug);
  const staticCourse = staticPrograms[slug];

  if (!dbCourse && !staticCourse) {
    notFound();
  }

  const course = dbCourse
    ? {
        title: dbCourse.title,
        duration: dbCourse.duration,
        intake: dbCourse.intake,
        description: dbCourse.description,
        eligibility: dbCourse.eligibility,
        fees: dbCourse.fees,
        department: dbCourse.department,
        faculty: dbCourse.faculty.map((cf) => ({
          name: cf.faculty.name,
          designation: cf.faculty.designation,
          slug: cf.faculty.slug,
        })),
      }
    : staticCourse!;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl relative">
          <ScrollReveal>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Programs
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Badge className="bg-white/20 text-white border-0">
                {course.duration}
              </Badge>
              {course.intake && (
                <Badge className="bg-white/20 text-white border-0">
                  {course.intake} Seats
                </Badge>
              )}
              <Badge className="bg-white/20 text-white border-0">
                {course.department.name}
              </Badge>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6 text-foreground">About this Program</h2>
                <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-4">
                  {course.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </ScrollReveal>

              {/* Faculty */}
              {course.faculty.length > 0 && (
                <ScrollReveal className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">Faculty</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.faculty.map((f) => (
                      <Link
                        key={f.slug}
                        href={`/faculty/${f.slug}`}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{f.name}</div>
                          <div className="text-sm text-muted-foreground">{f.designation}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold mb-4 text-foreground">Program Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">Duration</dt>
                      <dd className="text-foreground font-medium mt-1">{course.duration}</dd>
                    </div>
                    {course.intake && (
                      <div>
                        <dt className="text-xs font-semibold text-muted-foreground uppercase">Intake</dt>
                        <dd className="text-foreground font-medium mt-1">{course.intake} Students</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">Department</dt>
                      <dd className="text-foreground font-medium mt-1">{course.department.name}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-muted-foreground uppercase">Affiliation</dt>
                      <dd className="text-foreground font-medium mt-1">University of Mysore</dd>
                    </div>
                  </dl>
                </div>
              </ScrollReveal>

              {course.eligibility && (
                <ScrollReveal delay={0.1}>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-lg font-bold mb-3 text-foreground">Eligibility</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.eligibility}
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {course.fees && (
                <ScrollReveal delay={0.2}>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h3 className="text-lg font-bold mb-3 text-foreground">Fees</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course.fees}
                    </p>
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal delay={0.3}>
                <div className="rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white p-6 text-center">
                  <h3 className="text-lg font-bold mb-3">Interested?</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Apply now for the 2026-27 academic year
                  </p>
                  <Link
                    href="/admission"
                    className="inline-block w-full px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
