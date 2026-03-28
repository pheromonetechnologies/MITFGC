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

const collegeStats = [
  { value: "2009", label: "Established", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { value: "NAAC A", label: "Grade Accredited", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { value: "4", label: "Programs Offered", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { value: "UoM", label: "University of Mysore", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

const accreditations = [
  {
    name: "NAAC",
    grade: "A Grade",
    desc: "National Assessment and Accreditation Council",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    name: "UGC",
    grade: "Recognized",
    desc: "University Grants Commission",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    name: "AICTE",
    grade: "Approved",
    desc: "All India Council for Technical Education",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    name: "University of Mysore",
    grade: "Affiliated",
    desc: "Established 1916 — Premier state university",
    color: "text-orange-600",
    bg: "bg-orange-50 border-orange-200",
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner — navy gradient with serif heading */}
      <section className="relative bg-gradient-to-br from-[#003B7C] via-[#00306a] to-[#001f4a] text-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        {/* decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E67E22]/10 blur-3xl" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <Badge className="bg-[#E67E22]/80 text-white border-0 mb-6 text-sm px-4 py-1.5">
              Established 2009 · NAAC A Grade
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              About{" "}
              <span className="text-[#E67E22]">MITFGC</span>
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              A premier institution committed to nurturing future leaders through
              quality education and holistic development since 2009.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* College Info Stats */}
      <section className="py-14 px-6 bg-white border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {collegeStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/60 hover:bg-primary/5 transition-colors border border-border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision & Mission — premium cards side by side */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest mb-4">
                Our Purpose
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Vision &amp; Mission
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <ScrollReveal direction="left">
              <div className="premium-card h-full rounded-2xl overflow-hidden shadow-xl hover-lift">
                <div className="h-2 bg-gradient-to-r from-[#003B7C] to-[#0056b3]" />
                <div className="p-10 bg-gradient-to-br from-[#003B7C] to-[#001f4a] text-white h-full">
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-5">Our Vision</h3>
                  <p className="text-white/90 leading-relaxed text-lg">
                    To be a centre of excellence in higher education that empowers students with
                    knowledge, skills, and values to become responsible citizens and leaders who
                    contribute to the socio-economic development of the nation.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal direction="right">
              <div className="premium-card h-full rounded-2xl overflow-hidden shadow-xl hover-lift">
                <div className="h-2 bg-gradient-to-r from-[#E67E22] to-[#f39c12]" />
                <div className="p-10 bg-gradient-to-br from-[#E67E22] to-[#c0392b] text-white h-full">
                  <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-5">Our Mission</h3>
                  <ul className="text-white/90 leading-relaxed space-y-4">
                    {[
                      "Provide quality higher education accessible to all sections of society",
                      "Promote holistic development through curricular, co-curricular, and extracurricular activities",
                      "Foster research culture and innovation among students and faculty",
                      "Build industry partnerships for enhanced employability and placement support",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Accreditation Badges */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="RECOGNITION"
            title="Accreditations &amp; Affiliations"
            subtitle="Recognized by top national bodies ensuring quality and credibility"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accreditations.map((item, i) => (
              <ScrollReveal key={item.name} delay={i * 0.08}>
                <div className={`premium-card hover-lift rounded-2xl p-6 border-2 ${item.bg} text-center h-full`}>
                  <div className={`w-14 h-14 rounded-xl ${item.bg} border ${item.color.replace("text-", "border-").replace("600", "300")} flex items-center justify-center mx-auto mb-4`}>
                    <svg className={`w-7 h-7 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${item.color}`}>{item.name}</div>
                  <div className={`text-sm font-semibold mb-2 ${item.color}`}>{item.grade}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Institutional codes strip */}
          <ScrollReveal>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {institutionalCodes.map((code) => (
                <div
                  key={code.label}
                  className="px-5 py-3 bg-white rounded-xl border border-border text-center shadow-sm"
                >
                  <div className="text-xs text-muted-foreground mb-0.5">{code.label}</div>
                  <div className="text-sm font-bold text-foreground">{code.value}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="OUR VALUES"
            title="Core Values That Guide Us"
            subtitle="The principles that shape our institution and define our commitment to students"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="premium-card hover-lift bg-white rounded-2xl p-7 border border-border h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
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

      {/* Leadership Messages */}
      <section className="py-24 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="LEADERSHIP"
            title="Messages from Our Leaders"
            subtitle="Words of wisdom and vision from the people who guide our institution"
          />

          <div className="space-y-16">
            {/* Chairman */}
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
                <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-border shadow-sm">
                  <div className="text-5xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                    Education is the most powerful tool for transforming society. At MIT First Grade
                    College, we are committed to providing world-class education that is accessible,
                    affordable, and aligned with the needs of modern industry and society.
                  </p>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    I invite all aspiring students to visit our campus and experience the MIT
                    difference first-hand. Together, let us build a brighter future.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Principal */}
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
                <div className="md:col-span-2 md:order-1 bg-white rounded-2xl p-8 border border-border shadow-sm">
                  <div className="text-5xl text-accent/20 font-serif leading-none mb-4">&ldquo;</div>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                    As the Principal of MIT First Grade College, I take great pride in the academic
                    achievements and holistic growth of our students. Our NAAC A Grade accreditation
                    reflects the consistent high standards we maintain.
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
      <section className="py-24 px-6 bg-gradient-to-br from-[#003B7C] to-[#001f4a] text-white">
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
                  <div className="text-3xl md:text-4xl font-bold mb-2 text-[#E67E22]">
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
