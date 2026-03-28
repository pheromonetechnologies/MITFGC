import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Admissions - MIT First Grade College",
  description:
    "Admissions open for BCA, BBA, B.COM, and M.COM programs at MIT First Grade College, Mysuru. Learn about eligibility, process, and important dates.",
};

const programs = [
  {
    name: "BCA - Bachelor of Computer Applications",
    duration: "3 Years",
    intake: "60 Students",
    eligibility:
      "+2/PUC with Mathematics, Computer Science, Business Mathematics, or Accountancy",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "BBA - Bachelor of Business Administration",
    duration: "3 Years",
    intake: "60 Students",
    eligibility: "10+2 in any discipline",
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "B.COM - Bachelor of Commerce",
    duration: "3 Years",
    intake: "60 Students",
    eligibility: "10+2 in any discipline",
    gradient: "from-green-500 to-teal-600",
  },
  {
    name: "M.COM - Master of Commerce",
    duration: "2 Years",
    intake: "40 Students",
    eligibility:
      "Bachelor's degree in Commerce or BBA with minimum 45% aggregate marks (5% relaxation for SC/ST candidates)",
    gradient: "from-indigo-500 to-blue-600",
  },
];

const admissionSteps = [
  {
    step: 1,
    title: "Enquiry & Counseling",
    description:
      "Visit the campus or contact us for program counseling. Our team will guide you through available programs and help you choose the right one.",
  },
  {
    step: 2,
    title: "Application",
    description:
      "Collect the application form from the college office or download it from the website. Fill in the required details and attach supporting documents.",
  },
  {
    step: 3,
    title: "Document Verification",
    description:
      "Submit your application along with original and photocopies of mark sheets, transfer certificate, migration certificate, and other required documents.",
  },
  {
    step: 4,
    title: "Fee Payment",
    description:
      "Upon verification and acceptance, pay the prescribed fees at the college accounts section. Fee payment can be made via DD, NEFT, or at the counter.",
  },
  {
    step: 5,
    title: "Admission Confirmation",
    description:
      "Receive your admission letter and ID card. You are now officially a student of MIT First Grade College!",
  },
];

const importantDates = [
  { event: "Application Form Available", date: "January 2026" },
  { event: "Admission Process Begins", date: "March 2026" },
  { event: "Last Date for Application (Round 1)", date: "May 31, 2026" },
  { event: "Classes Commence", date: "July 2026" },
  { event: "Late Admission (Subject to Availability)", date: "August 2026" },
];

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/80 rounded-full mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-bold text-white">Admissions Open 2026-27</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Admissions</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Begin your journey towards a successful career. Limited seats available for the
              upcoming academic year.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader
            badge="HOW TO APPLY"
            title="Admission Process"
            subtitle="Follow these simple steps to secure your admission"
          />

          <div className="space-y-0">
            {admissionSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.08}>
                <div className="flex gap-6 pb-10 relative">
                  {/* Vertical line */}
                  {i < admissionSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-primary/20" />
                  )}
                  {/* Step number */}
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 relative z-10">
                    {step.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility by Program */}
      <section className="py-20 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="ELIGIBILITY"
            title="Program-wise Eligibility"
            subtitle="Check the eligibility criteria for each program"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <ScrollReveal key={program.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-border overflow-hidden h-full">
                  <div className={`h-1.5 bg-gradient-to-r ${program.gradient}`} />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {program.name}
                    </h3>
                    <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
                      <span>{program.duration}</span>
                      <span>{program.intake}</span>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-xs font-semibold text-foreground/60 uppercase">
                        Eligibility
                      </span>
                      <p className="text-sm text-foreground mt-1">
                        {program.eligibility}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader
            badge="IMPORTANT DATES"
            title="Admission Timeline"
            subtitle="Key dates for the 2026-27 academic year"
          />

          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Event</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {importantDates.map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-6 py-4 text-sm text-foreground">{item.event}</td>
                      <td className="px-6 py-4 text-sm font-medium text-primary">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Apply?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Take the first step towards your future. Contact us for counseling or
              visit our campus today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 shadow-lg transition-all duration-300"
              >
                Apply Now
              </Link>
              <a
                href="tel:08212331722"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Call: 0821 233 1722
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
