import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us - MIT First Grade College",
  description:
    "Get in touch with MIT First Grade College, Mysuru. Address: 169/1, Mananthavadi Rd, Vidyaranyapura, Mysuru 570008.",
};

const contactDetails = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    content: (
      <p className="text-sm text-white/70 leading-relaxed">
        169/1, Mananthavadi Rd,<br />
        Vidyaranyapura, Mysuru,<br />
        Karnataka 570008
      </p>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    content: (
      <a href="tel:08212331722" className="text-sm text-white/70 hover:text-[#E67E22] transition-colors">
        0821 233 1722
      </a>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    content: (
      <a href="mailto:info@mitfgc.in" className="text-sm text-white/70 hover:text-[#E67E22] transition-colors">
        info@mitfgc.in
      </a>
    ),
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Office Hours",
    content: (
      <div className="text-sm text-white/70 space-y-0.5">
        <p>Mon – Sat: 9:00 AM – 5:00 PM</p>
        <p>Sunday: Closed</p>
      </div>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003B7C] via-[#004fa3] to-[#003B7C] text-white py-24 px-6">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#E67E22]/10 blur-3xl" />

        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E67E22]" />
              We&apos;d love to hear from you
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Get in{" "}
              <span className="text-[#E67E22]">Touch</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Reach out for admissions inquiries, campus visits, or any questions.
              Our team is here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Left: contact info + map placeholder */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info card (navy background) */}
              <ScrollReveal>
                <div className="rounded-2xl bg-[#003B7C] text-white p-8 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold mb-1">Contact Information</h2>
                    <p className="text-sm text-white/60">Fill out the form or reach us directly</p>
                  </div>

                  <div className="space-y-5">
                    {contactDetails.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-[#E67E22]">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social links */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="https://www.facebook.com/mitfgcmysore/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E67E22] flex items-center justify-center transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/mitfgcmysore"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E67E22] flex items-center justify-center transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Map placeholder */}
              <ScrollReveal delay={0.1}>
                <div className="rounded-2xl overflow-hidden border border-border">
                  <div className="bg-[#003B7C]/90 h-10 flex items-center px-4 gap-2">
                    <svg className="w-4 h-4 text-[#E67E22]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span className="text-xs font-semibold text-white/80">MIT First Grade College — Mysuru</span>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.123!2d76.639346!3d12.273329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMIT+First+Grade+College!5e0!3m2!1sen!2sin!4v1600000000000"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MIT First Grade College Location"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                <div className="premium-card p-8 md:p-10">
                  <div className="mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24–48 hours on working days.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
