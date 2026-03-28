import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Admissions - MIT First Grade College",
  description:
    "Admissions open for BCA, BBA, B.COM, and M.COM programs at MIT First Grade College, Mysuru. Learn about eligibility, fee structure, and application process.",
};

const programs = [
  {
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    duration: "3 Years",
    intake: "60 Students",
    level: "Undergraduate",
    eligibility: "+2/PUC with Mathematics, Computer Science, Business Mathematics, or Accountancy",
    subjects: ["Mathematics / Business Mathematics", "Computer Science / Accountancy", "Any other subject"],
    borderColor: "border-l-blue-500",
    badgeBg: "bg-blue-50 text-blue-700",
  },
  {
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    duration: "3 Years",
    intake: "60 Students",
    level: "Undergraduate",
    eligibility: "10+2 in any discipline from a recognized board",
    subjects: ["Any three elective subjects", "English (mandatory)", "Pass with aggregate marks"],
    borderColor: "border-l-orange-500",
    badgeBg: "bg-orange-50 text-orange-700",
  },
  {
    name: "B.COM",
    fullName: "Bachelor of Commerce",
    duration: "3 Years",
    intake: "60 Students",
    level: "Undergraduate",
    eligibility: "10+2 in any discipline from a recognized board",
    subjects: ["Commerce / Accountancy (preferred)", "Any other subjects accepted", "Pass with aggregate marks"],
    borderColor: "border-l-emerald-500",
    badgeBg: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "M.COM",
    fullName: "Master of Commerce",
    duration: "2 Years",
    intake: "40 Students",
    level: "Postgraduate",
    eligibility: "Bachelor's degree in Commerce or BBA with minimum 45% aggregate marks",
    subjects: ["B.COM / BBA degree required", "Minimum 45% aggregate marks", "5% relaxation for SC/ST candidates"],
    borderColor: "border-l-indigo-500",
    badgeBg: "bg-indigo-50 text-indigo-700",
  },
];

const feeStructure = [
  { program: "BCA", annualFee: "As per University norms", hostelFee: "N/A", examFee: "As applicable" },
  { program: "BBA", annualFee: "As per University norms", hostelFee: "N/A", examFee: "As applicable" },
  { program: "B.COM", annualFee: "As per University norms", hostelFee: "N/A", examFee: "As applicable" },
  { program: "M.COM", annualFee: "As per University norms", hostelFee: "N/A", examFee: "As applicable" },
];

const admissionSteps = [
  {
    step: 1,
    title: "Enquiry & Counseling",
    description:
      "Visit the campus or contact us for program counseling. Our team will guide you through available programs and help you choose the right one for your goals.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    step: 2,
    title: "Application",
    description:
      "Collect the application form from the college office or download it. Fill in the required details and attach supporting documents before submission.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    step: 3,
    title: "Document Verification",
    description:
      "Submit your application along with original and photocopies of mark sheets, transfer certificate, migration certificate, and other required documents.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    step: 4,
    title: "Fee Payment",
    description:
      "Upon verification and acceptance, pay the prescribed fees at the college accounts section. Fee payment can be made via DD, NEFT, or at the counter.",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  },
  {
    step: 5,
    title: "Admission Confirmation",
    description:
      "Receive your admission letter and student ID card. You are now officially a student of MIT First Grade College — welcome to the family!",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const documents = [
  "10th Standard (SSLC) Mark Sheet & Certificate",
  "12th Standard (PUC/+2) Mark Sheet & Certificate",
  "Transfer Certificate (TC) from previous institution",
  "Migration Certificate (if applicable)",
  "Caste / Category Certificate (SC/ST/OBC — if applicable)",
  "Income Certificate (for scholarship consideration)",
  "Aadhar Card (original & photocopy)",
  "Passport-size photographs (6 copies)",
  "Character Certificate from previous institution",
  "Degree Mark Sheets (for M.COM applicants)",
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
      <section className="relative bg-gradient-to-br from-[#003B7C] via-[#00306a] to-[#001f4a] text-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#E67E22]/10 blur-3xl" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E67E22]/80 rounded-full mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-bold text-white">Admissions Open 2026-27</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Admissions <span className="text-[#E67E22]">2026</span>
            </h1>
            <p className="text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
              Begin your journey towards a successful career. Limited seats
              available for the upcoming academic year.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Steps */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <SectionHeader
            badge="HOW TO APPLY"
            title="Admission Process"
            subtitle="Follow these simple steps to secure your admission at MIT First Grade College"
          />

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent hidden sm:block" />

            <div className="space-y-0">
              {admissionSteps.map((step, i) => (
                <ScrollReveal key={step.step} delay={i * 0.08}>
                  <div className="flex gap-6 pb-10 relative">
                    {/* Step circle */}
                    <div className="w-16 h-16 bg-primary text-white rounded-2xl flex flex-col items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                      </svg>
                      <span className="text-xs font-bold opacity-80">{step.step}</span>
                    </div>
                    <div className="premium-card bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow flex-1">
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
        </div>
      </section>

      {/* Eligibility Table per program */}
      <section className="py-24 px-6 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="ELIGIBILITY"
            title="Program-wise Eligibility"
            subtitle="Check the eligibility criteria and required subjects for each program"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <ScrollReveal key={program.name} delay={i * 0.08}>
                <div className={`bg-white rounded-2xl border border-border border-l-4 ${program.borderColor} overflow-hidden h-full shadow-sm hover:shadow-lg transition-shadow`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-foreground">{program.name}</span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${program.badgeBg}`}>
                            {program.level}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{program.fullName}</p>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-semibold text-foreground">{program.duration}</div>
                        <div className="text-muted-foreground">{program.intake}</div>
                      </div>
                    </div>

                    {/* Eligibility statement */}
                    <div className="p-4 bg-muted/60 rounded-xl border border-border mb-4">
                      <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider block mb-1.5">
                        Minimum Eligibility
                      </span>
                      <p className="text-sm text-foreground leading-relaxed">
                        {program.eligibility}
                      </p>
                    </div>

                    {/* Subject requirements */}
                    <div>
                      <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider block mb-2">
                        Required Subjects (10+2 Level)
                      </span>
                      <ul className="space-y-1.5">
                        {program.subjects.map((sub) => (
                          <li key={sub} className="flex items-start gap-2 text-sm text-foreground/80">
                            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader
            badge="FEE STRUCTURE"
            title="Academic Fees 2026-27"
            subtitle="Transparent fee information for all programs"
          />

          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#003B7C] to-[#00306a] text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Program</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Annual Fee</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Hostel</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Exam Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((row, i) => (
                    <tr key={row.program} className={`border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-muted/30"}`}>
                      <td className="px-6 py-4 text-sm font-bold text-primary">{row.program}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{row.annualFee}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{row.hostelFee}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{row.examFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              * Fees are subject to University of Mysore and government regulations. Contact the college office for exact fee details.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-24 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader
            badge="DOCUMENTS"
            title="Documents Required"
            subtitle="Please ensure you have all the following documents ready before applying"
          />

          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                {documents.map((doc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">{doc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Note:</strong> Bring both originals and self-attested photocopies of all documents.
                  Original documents will be returned after verification.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader
            badge="IMPORTANT DATES"
            title="Admission Timeline"
            subtitle="Key dates for the 2026-27 academic year"
          />

          <ScrollReveal>
            <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#003B7C] to-[#00306a] text-white">
                    <th className="text-left px-6 py-4 text-sm font-semibold">Event</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {importantDates.map((item, i) => (
                    <tr key={i} className={`border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-muted/30"}`}>
                      <td className="px-6 py-4 text-sm text-foreground">{item.event}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-primary">
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
      <section className="py-24 px-6 bg-gradient-to-br from-[#003B7C] to-[#001f4a] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to Apply?
            </h2>
            <p className="text-xl text-white/85 mb-10 max-w-2xl mx-auto">
              Take the first step towards your future. Contact us for counseling
              or visit our campus today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E67E22] text-white rounded-xl font-semibold hover:bg-[#cf6d17] shadow-lg transition-all duration-300"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:08212331722"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: 0821 233 1722
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
