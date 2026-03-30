import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Admissions", href: "/admission" },
  { label: "Faculty", href: "/faculty" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const otherLinks = [
  { label: "Notices", href: "/notices" },
  { label: "IQAC / NAAC", href: "/iqac" },
  { label: "Library", href: "/library" },
  { label: "RTI", href: "/rti" },
  { label: "Contact", href: "/contact" },
  { label: "Training & Placement", href: "/placement" },
];

export function Footer() {
  return (
    <footer className="relative">
      {/* Wave SVG Divider */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 60L48 55C96 50 192 40 288 42C384 44 480 58 576 65C672 72 768 72 864 65C960 58 1056 44 1152 40C1248 36 1344 42 1392 45L1440 48V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="#0F172A"/>
        </svg>
      </div>

      <div className="bg-gradient-to-b from-[#0F172A] to-[#0a1020] text-white pt-12 pb-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* About */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                  <Image src="/images/logo.jpeg" alt="MIT FGC Logo" width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold font-serif">MIT First Grade College</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Established in 2009 by Maharaja Education Trust, Mysuru.
                Affiliated to University of Mysore. NAAC &apos;A&apos; Grade Accredited.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-[#1877F2]/15 hover:bg-[#1877F2] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#E4405F]/15 hover:bg-[#E4405F] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#FF0000]/15 hover:bg-[#FF0000] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4 text-[#14B8A6]">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Links */}
            <div>
              <h4 className="font-bold mb-4 text-[#14B8A6]">Resources</h4>
              <ul className="space-y-2.5 text-sm">
                {otherLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4 text-[#14B8A6]">Contact Us</h4>
              <ul className="space-y-3.5 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#14B8A6]/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" />
                  </div>
                  <span>169/1, Mananthavadi Rd, Vidyaranyapura, Mysuru, Karnataka 570008</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14B8A6]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#14B8A6]" />
                  </div>
                  <a href="tel:08212331722" className="hover:text-white transition-colors">
                    0821 233 1722
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#14B8A6]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#14B8A6]" />
                  </div>
                  <a href="mailto:info@mitfgc.in" className="hover:text-white transition-colors">
                    info@mitfgc.in
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Gradient divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#14B8A6]/40 to-transparent mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} MIT First Grade College, Mysuru. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              Affiliated to University of Mysore | UGC &amp; AICTE Approved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
