import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getFaculty(slug: string) {
  try {
    const faculty = await db.faculty.findUnique({
      where: { slug },
      include: {
        department: true,
        courses: {
          include: {
            course: true,
          },
        },
      },
    });
    return faculty;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const faculty = await getFaculty(slug);

  if (!faculty) return { title: "Faculty Not Found" };

  return {
    title: `${faculty.name} - Faculty - MIT First Grade College`,
    description: `${faculty.name}, ${faculty.designation} at MIT First Grade College, Mysuru. Department of ${faculty.department.name}.`,
  };
}

export default async function FacultyProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const faculty = await getFaculty(slug);

  if (!faculty) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl relative">
          <ScrollReveal>
            <Link
              href="/faculty"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Faculty
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div>
              <ScrollReveal>
                <div className="rounded-xl border border-border bg-card overflow-hidden sticky top-24">
                  <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {faculty.image ? (
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-24 h-24 text-primary/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <h1 className="text-xl font-bold text-foreground">{faculty.name}</h1>
                    <p className="text-primary font-medium mt-1">{faculty.designation}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Department of {faculty.department.name}
                    </p>

                    <div className="mt-6 space-y-3">
                      {faculty.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href={`mailto:${faculty.email}`} className="hover:text-primary transition-colors">
                            {faculty.email}
                          </a>
                        </div>
                      )}
                      {faculty.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${faculty.phone}`} className="hover:text-primary transition-colors">
                            {faculty.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {faculty.qualifications && (
                <ScrollReveal>
                  <h2 className="text-xl font-bold mb-3 text-foreground">Qualifications</h2>
                  <p className="text-foreground/80 leading-relaxed">{faculty.qualifications}</p>
                </ScrollReveal>
              )}

              {faculty.specialization && (
                <ScrollReveal delay={0.1}>
                  <h2 className="text-xl font-bold mb-3 text-foreground">Specialization</h2>
                  <p className="text-foreground/80 leading-relaxed">{faculty.specialization}</p>
                </ScrollReveal>
              )}

              {faculty.experience && (
                <ScrollReveal delay={0.15}>
                  <h2 className="text-xl font-bold mb-3 text-foreground">Experience</h2>
                  <p className="text-foreground/80 leading-relaxed">{faculty.experience}</p>
                </ScrollReveal>
              )}

              {faculty.bio && (
                <ScrollReveal delay={0.2}>
                  <h2 className="text-xl font-bold mb-3 text-foreground">Biography</h2>
                  <div className="text-foreground/80 leading-relaxed space-y-4">
                    {faculty.bio.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {faculty.courses.length > 0 && (
                <ScrollReveal delay={0.25}>
                  <h2 className="text-xl font-bold mb-4 text-foreground">Courses</h2>
                  <div className="flex flex-wrap gap-3">
                    {faculty.courses.map((cf) => (
                      <Link
                        key={cf.course.slug}
                        href={`/programs/${cf.course.slug}`}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20 transition-colors"
                      >
                        {cf.course.title}
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
