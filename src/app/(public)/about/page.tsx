import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Us - MIT First Grade College",
  description:
    "Learn about MIT First Grade College, Mysuru - Established in 2009, NAAC A Grade accredited, affiliated to University of Mysore.",
};

const coreValues = [
  {
    title: "Academic Excellence",
    description:
      "Commitment to the highest standards of teaching and learning through innovative pedagogy.",
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    title: "Integrity",
    description:
      "Upholding ethical values, transparency, and honesty in all academic and administrative activities.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Innovation",
    description:
      "Encouraging creative thinking, research aptitude, and technology-driven learning approaches.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Inclusivity",
    description:
      "Providing equal opportunities for all students regardless of background, gender, or economic status.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Social Responsibility",
    description:
      "Nurturing socially responsible citizens who contribute positively to community and nation building.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Discipline",
    description:
      "Instilling self-discipline, time management, and professional conduct in students and staff.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const institutionalCodes = [
  { label: "College Code", value: "1093" },
  { label: "UUCMS Code", value: "P26GCE0057" },
  { label: "AISHE Code", value: "C-17497" },
  { label: "AICTE PID", value: "1-44070786193" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <Badge className="bg-white/20 text-white border-0 mb-6 text-sm">
              Established 2009
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About MITFGC</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              A premier institution committed to nurturing future leaders through
              quality education and holistic development
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* NAAC Badge & Institutional Codes */}
      <section className="py-12 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-secondary/10 border-2 border-secondary rounded-full">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div>
                  <div className="text-lg font-bold text-secondary">NAAC A Grade</div>
                  <div className="text-xs text-muted-foreground">Accredited</div>
                </div>
              </div>

              {institutionalCodes.map((code) => (
                <div
                  key={code.label}
                  className="px-5 py-3 bg-white rounded-lg border border-border text-center"
                >
                  <div className="text-xs text-muted-foreground">{code.label}</div>
                  <div className="text-sm font-bold text-foreground">{code.value}</div>
                </div>
              ))}

              <div className="px-5 py-3 bg-primary/10 rounded-lg border border-primary/20 text-center">
                <div className="text-xs text-muted-foreground">Affiliation</div>
                <div className="text-sm font-bold text-primary">University of Mysore</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-10">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  To be a centre of excellence in higher education that empowers students with
                  knowledge, skills, and values to become responsible citizens and leaders who
                  contribute to the socio-economic development of the nation.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-gradient-to-br from-accent to-orange-600 text-white rounded-2xl p-10">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <ul className="text-white/90 leading-relaxed space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2.5 flex-shrink-0" />
                    To provide quality higher education accessible to all sections of society
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2.5 flex-shrink-0" />
                    To promote holistic development through curricular, co-curricular, and
                    extracurricular activities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2.5 flex-shrink-0" />
                    To foster research culture and innovation among students and faculty
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 mt-2.5 flex-shrink-0" />
                    To build industry partnerships for enhanced employability and placement support
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="OUR VALUES"
            title="Core Values That Guide Us"
            subtitle="The principles that shape our institution and define our commitment to students"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="LEADERSHIP"
            title="Messages from Our Leaders"
            subtitle="Words of wisdom and vision from the people who guide our institution"
          />

          <div className="space-y-16">
            {/* Chairman Message */}
            <ScrollReveal>
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="bg-gradient-to-b from-primary/10 to-transparent rounded-2xl p-8 text-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Chairman</h4>
                    <p className="text-sm text-muted-foreground">Maharaja Education Trust</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-4xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                    Education is the most powerful tool for transforming society. At MIT First Grade
                    College, we are committed to providing world-class education that is accessible,
                    affordable, and aligned with the needs of modern industry and society.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                    Our institution was founded with the vision of empowering young minds from all
                    walks of life. We believe that every student has unique potential, and it is our
                    responsibility to create an environment where that potential can flourish.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    I invite all aspiring students and their parents to visit our campus and experience
                    the MIT difference first-hand. Together, let us build a brighter future.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Principal Message */}
            <ScrollReveal>
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1 md:order-2">
                  <div className="bg-gradient-to-b from-accent/10 to-transparent rounded-2xl p-8 text-center">
                    <div className="w-32 h-32 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-16 h-16 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">Dr. Chandrajit Mohan</h4>
                    <p className="text-sm text-muted-foreground">Principal</p>
                  </div>
                </div>
                <div className="md:col-span-2 md:order-1">
                  <div className="text-4xl text-accent/20 font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                    As the Principal of MIT First Grade College, I take great pride in the academic
                    achievements and holistic growth of our students. Our institution has consistently
                    maintained high academic standards, reflected in our NAAC A Grade accreditation.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                    We believe in a student-centric approach that combines rigorous academics with
                    practical exposure, personality development, and moral values. Our dedicated
                    faculty members go beyond the classroom to mentor and guide students towards
                    achieving their career goals.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    With modern infrastructure, a well-stocked library, computer labs, and a vibrant
                    campus life, MIT First Grade College offers an enriching educational experience
                    that prepares students for the challenges of the 21st century.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="AT A GLANCE"
            title="MIT First Grade College in Numbers"
            light
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2009", label: "Year Established" },
              { number: "NAAC A", label: "Grade Accredited" },
              { number: "4", label: "Academic Programs" },
              { number: "3000+", label: "Library Books" },
              { number: "80+", label: "Computer Systems" },
              { number: "15+", label: "Years of Excellence" },
              { number: "UGC", label: "Recognized" },
              { number: "AICTE", label: "Approved" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
