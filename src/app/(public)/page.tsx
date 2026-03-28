import Link from "next/link";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatsBar } from "@/components/shared/StatsBar";

const staticPrograms = [
  {
    title: "Bachelor of Computer Applications",
    slug: "bca",
    duration: "3 Years",
    intake: 60,
    description: "Comprehensive IT education with practical skills in programming, web development, and software engineering",
    department: { name: "Computer Science" },
    color: "border-l-[#003B7C]",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    title: "Bachelor of Business Administration",
    slug: "bba",
    duration: "3 Years",
    intake: 60,
    description: "Business management program focusing on entrepreneurship, marketing, finance, and leadership",
    department: { name: "Management" },
    color: "border-l-[#E67E22]",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Bachelor of Commerce",
    slug: "bcom",
    duration: "3 Years",
    intake: 60,
    description: "Comprehensive commerce education covering accounting, taxation, finance, and business law",
    department: { name: "Commerce" },
    color: "border-l-[#10B981]",
    icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z",
  },
  {
    title: "Master of Commerce",
    slug: "mcom",
    duration: "2 Years",
    intake: 40,
    description: "Advanced commerce studies with specialization in accounting, finance, and business research",
    department: { name: "Commerce" },
    color: "border-l-[#8B5CF6]",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
  },
];

const staticEvents = [
  { title: "Annual Sports Day 2026", slug: "annual-sports-day-2026", description: "Inter-collegiate sports competition featuring athletics, cricket, and indoor games.", eventDate: new Date("2026-04-15"), venue: "College Ground" },
  { title: "National Level Seminar on Digital India", slug: "national-seminar-digital-india", description: "Two-day seminar on emerging technologies and digital transformation in India.", eventDate: new Date("2026-04-20"), venue: "Seminar Hall" },
  { title: "Cultural Fest - Utsav 2026", slug: "cultural-fest-utsav-2026", description: "Annual cultural extravaganza with dance, music, drama, and art competitions.", eventDate: new Date("2026-05-01"), venue: "College Auditorium" },
];

const staticNotices = [
  { id: "1", title: "Admissions Open for 2026-27 Academic Year", priority: "URGENT" as const, createdAt: new Date("2026-03-01") },
  { id: "2", title: "Last date for fee payment: April 15, 2026", priority: "HIGH" as const, createdAt: new Date("2026-03-15") },
  { id: "3", title: "Internal Assessment Schedule Released", priority: "NORMAL" as const, createdAt: new Date("2026-03-20") },
];

async function getHomeData() {
  try {
    const [courses, events, notices] = await Promise.all([
      db.course.findMany({ where: { published: true, featured: true }, include: { department: true }, orderBy: { sortOrder: "asc" }, take: 4 }),
      db.event.findMany({ where: { published: true }, orderBy: { eventDate: "desc" }, take: 3 }),
      db.notice.findMany({ where: { published: true }, orderBy: [{ priority: "desc" }, { createdAt: "desc" }], take: 5 }),
    ]);
    return {
      courses: courses.length > 0 ? courses : null,
      events: events.length > 0 ? events : null,
      notices: notices.length > 0 ? notices : null,
    };
  } catch {
    return { courses: null, events: null, notices: null };
  }
}

const colors = ["border-l-[#003B7C]", "border-l-[#E67E22]", "border-l-[#10B981]", "border-l-[#8B5CF6]"];
const icons = [
  "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
  "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
];

export default async function HomePage() {
  const { courses, events, notices } = await getHomeData();

  const displayPrograms = courses
    ? courses.map((c, i) => ({
        title: c.title, slug: c.slug, duration: c.duration, intake: c.intake,
        description: c.description, department: c.department,
        color: colors[i % colors.length], icon: icons[i % icons.length],
      }))
    : staticPrograms;

  const displayEvents = events ?? staticEvents;
  const displayNotices = notices ?? staticNotices;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section — Campus Photo Overlay */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background: campus image with navy gradient overlay */}
        <div className="absolute inset-0 bg-[url('/images/hero-clg.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#003B7C]/92 via-[#002854]/88 to-[#001a3a]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,126,34,0.12),transparent_60%)]" />

        {/* Floating decorative shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_1s]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/15">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white/90 tracking-wide">
                  NAAC A Grade | UGC &amp; AICTE Approved
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-display text-white mb-6">
                Shape Your Future at
                <span className="block text-accent mt-2">MIT First Grade College</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl md:text-2xl text-white/80 mb-4 font-light max-w-2xl leading-relaxed">
                Discover one of the finest education institutions in Mysuru
              </p>
              <p className="text-base text-white/60 mb-10 max-w-xl">
                Affiliated to University of Mysore | Established 2009 | Vidyaranyapura, Mysuru
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/programs"
                  className="group px-8 py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent-dark transition-all duration-300 flex items-center gap-3 shadow-[0_8px_30px_rgba(230,126,34,0.3)] hover:shadow-[0_12px_40px_rgba(230,126,34,0.4)] hover:-translate-y-1"
                >
                  Explore Programs
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Visit Campus
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Bar — Animated Counters */}
      <StatsBar />

      {/* Notice Ticker */}
      <section className="bg-gradient-to-r from-accent to-accent-dark text-white py-3 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4">
            <span className="flex-shrink-0 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-wider">
              Notices
            </span>
            <div className="overflow-hidden flex-1">
              <div className="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
                {displayNotices.map((notice, i) => (
                  <Link key={notice.id ?? i} href="/notices" className="inline-flex items-center gap-2 hover:underline">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      notice.priority === "URGENT" ? "bg-red-300 animate-pulse" : notice.priority === "HIGH" ? "bg-yellow-300" : "bg-white/60"
                    }`} />
                    {notice.title}
                  </Link>
                ))}
                {/* Duplicate for seamless scroll */}
                {displayNotices.map((notice, i) => (
                  <Link key={`dup-${notice.id ?? i}`} href="/notices" className="inline-flex items-center gap-2 hover:underline">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      notice.priority === "URGENT" ? "bg-red-300 animate-pulse" : notice.priority === "HIGH" ? "bg-yellow-300" : "bg-white/60"
                    }`} />
                    {notice.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="WHY CHOOSE US"
            title="Excellence in Education Since 2009"
            subtitle="Join a community committed to academic excellence and holistic development"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                title: "NAAC A Grade Accredited",
                description: "Recognized for academic excellence by National Assessment and Accreditation Council",
                accent: "bg-primary/10 text-primary",
              },
              {
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
                title: "Modern Infrastructure",
                description: "80+ computers, well-equipped labs, library with 3000+ books and digital resources",
                accent: "bg-accent/10 text-accent",
              },
              {
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                title: "Holistic Development",
                description: "Focus on overall personality development, moral values, and practical skills",
                accent: "bg-secondary/10 text-secondary",
              },
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="premium-card p-8 h-full group cursor-pointer">
                  <div className={`w-16 h-16 ${feature.accent} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground font-serif">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-muted/50 to-background relative">
        <div className="container mx-auto max-w-6xl relative">
          <SectionHeader
            badge="ACADEMIC PROGRAMS"
            title="Choose Your Path to Success"
            subtitle="AICTE & UGC approved programs affiliated to University of Mysore"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {displayPrograms.map((program, i) => (
              <ScrollReveal key={program.slug} delay={i * 0.1}>
                <div className={`group premium-card overflow-hidden border-l-4 ${program.color} h-full`}>
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={program.icon} />
                        </svg>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="font-semibold">{program.duration}</div>
                        <div>{program.intake} Seats</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors font-serif">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                      {program.description}
                    </p>
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              View All Programs
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Events */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="LATEST EVENTS"
            title="What's Happening at MITFGC"
            subtitle="Stay updated with our latest events and activities"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {displayEvents.map((event, i) => (
              <ScrollReveal key={event.slug} delay={i * 0.1}>
                <div className="premium-card overflow-hidden h-full flex flex-col">
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 text-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,126,34,0.15),transparent_60%)]" />
                    <div className="relative">
                      <div className="text-3xl font-bold font-serif">
                        {new Date(event.eventDate).getDate()}
                      </div>
                      <div className="text-sm text-white/70 uppercase tracking-wider">
                        {new Date(event.eventDate).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-2 text-foreground font-serif">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                      {event.description}
                    </p>
                    {event.venue && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {event.venue}
                      </p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              View All Events
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="relative bg-gradient-to-br from-primary via-primary-dark to-[#001a3a] text-white text-center rounded-3xl p-12 md:p-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(230,126,34,0.15),transparent_50%)]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-display mb-6">
                  Ready to Begin<br />Your Journey?
                </h2>
                <p className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl mx-auto">
                  Join MIT First Grade College and be part of a community dedicated to excellence in education
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/admission"
                    className="px-10 py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent-dark shadow-[0_8px_30px_rgba(230,126,34,0.3)] hover:shadow-[0_12px_40px_rgba(230,126,34,0.4)] transition-all duration-300 hover:-translate-y-1"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/contact"
                    className="px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
