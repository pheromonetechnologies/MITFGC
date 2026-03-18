export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Clean & Professional */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-6 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">NAAC A Grade | UGC & AICTE Approved</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              MIT First Grade College
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
              Discover One of the Best Education Institutions in Mysuru
            </p>
            
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Affiliated to University of Mysore | Established 2009
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#programs" className="group px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 flex items-center gap-2 shadow-lg">
                Explore Programs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                Visit Campus
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="container mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { number: "15+", label: "Years of Excellence" },
                { number: "NAAC A", label: "Accredited" },
                { number: "4", label: "UG/PG Programs" },
                { number: "3000+", label: "Books in Library" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admission Banner */}
      <section className="bg-accent text-white py-4">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-lg font-semibold">
              Admissions Open for 2026-27 | Limited Seats Available | Apply Before March 31, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Excellence in Education Since 2009
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Join a community committed to academic excellence and holistic development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: "NAAC A Grade Accredited",
                description: "Recognized for academic excellence by National Assessment and Accreditation Council"
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "Modern Infrastructure",
                description: "80+ computers, well-equipped labs, library with 3000+ books and digital resources"
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "Holistic Development",
                description: "Focus on overall personality development, moral values, and practical skills"
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass-card hover-lift group cursor-pointer"
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-6 bg-gradient-to-b from-muted to-background relative">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              ACADEMIC PROGRAMS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Choose Your Path to Success
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              AICTE & UGC approved programs affiliated to University of Mysore
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Bachelor of Computer Applications",
                abbr: "BCA",
                duration: "3 Years",
                intake: "60 Students",
                badge: "AICTE Approved",
                gradient: "from-blue-500 to-purple-600",
                description: "Comprehensive IT education with practical skills in programming, web development, and software engineering"
              },
              {
                title: "Bachelor of Business Administration",
                abbr: "BBA",
                duration: "3 Years",
                intake: "60 Students",
                badge: "AICTE Approved",
                gradient: "from-orange-500 to-red-600",
                description: "Business management program focusing on entrepreneurship, marketing, finance, and leadership"
              },
              {
                title: "Bachelor of Commerce",
                abbr: "B.COM",
                duration: "3 Years",
                intake: "60 Students",
                badge: "",
                gradient: "from-green-500 to-teal-600",
                description: "Comprehensive commerce education covering accounting, taxation, finance, and business law"
              },
              {
                title: "Master of Commerce",
                abbr: "M.COM",
                duration: "2 Years",
                intake: "40 Students",
                badge: "",
                gradient: "from-indigo-500 to-blue-600",
                description: "Advanced commerce studies with specialization in accounting, finance, and business research"
              },
            ].map((program, i) => (
              <div
                key={i}glass-card hover-lift card-shine overflow-hidden
                className="group relative bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30"
              >
                <div className={`h-1.5 bg-gradient-to-r ${program.gradient}`}></div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-2">{program.abbr}</div>
                      {program.badge && (
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                          {program.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-right text-sm text-foreground/60">
                      <div>{program.duration}</div>
                      <div>{program.intake}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  
                  <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10"></div>
        <div className="container mx-auto max-w-4xl">
          <div className="glass-container bg-gradient-to-br from-primary to-primary-dark text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10"></div>
            <div className="relative">
              <h2 className="text-display mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-body-large text-white/90 mb-10 max-w-2xl mx-auto">
                Join MIT First Grade College and be part of a community dedicated to excellence in education
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="btn-touch bg-white text-primary hover:bg-white/90 shadow-lg hover-lift">
                  Apply Now
                </a>
                <a href="#programs" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-white/30 hover:bg-white/20 transition-all duration-300">
                  Download Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-white pt-16 pb-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">MIT First Grade College</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Established in 2009, Maharaja Education Trust, Mysuru. Affiliated to University of Mysore. 
                NAAC A Grade Accredited. UGC & AICTE Approved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#programs" className="text-white/70 hover:text-white transition-colors">Programs</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Faculty</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Placements</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>169/1, Mananthavadi Rd, Vidyaranyapura, Mysuru, Karnataka 570008</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:08212331722" className="hover:text-white transition-colors">
                    0821 233 1722
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@mitfgc.in" className="hover:text-white transition-colors">
                    info@mitfgc.in
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white/60">
              &copy; 2026 MIT First Grade College, Mysuru. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
