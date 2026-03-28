// seed-data.ts — All real content for MIT First Grade College website
// This file exports structured data used by prisma/seed.ts

export const departments = [
  {
    name: "Computer Applications",
    slug: "computer-applications",
    description:
      "Department of Computer Applications offers BCA program that provides students with opportunities to pursue careers in IT field. Graduates are equipped with practical skills, problem-solving, communication and interpersonal skills that provides foundations for lifelong learning.",
    hod: "Arvind G",
    email: "bca@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 1,
  },
  {
    name: "Commerce",
    slug: "commerce",
    description:
      "Department of Commerce offers undergraduate and postgraduate programs in commerce, accounting, finance, taxation and business studies.",
    hod: "Harshitha R",
    email: "commerce@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 2,
  },
  {
    name: "Management Studies",
    slug: "management-studies",
    description:
      "Department of Management Studies offers BBA program focusing on business administration, entrepreneurship, marketing, finance and leadership.",
    hod: "Harshitha R",
    email: "bba@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 3,
  },
  {
    name: "English",
    slug: "english",
    description:
      "Department of English provides language and communication skills training to students across all programs.",
    hod: "Reena Satish",
    email: "english@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 4,
  },
  {
    name: "Kannada",
    slug: "kannada",
    description:
      "Department of Kannada provides language education and promotes Kannada literature and culture.",
    hod: "Dr. Nanda T N",
    email: "kannada@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 5,
  },
  {
    name: "Sanskrit",
    slug: "sanskrit",
    description:
      "Department of Sanskrit provides language education and promotes classical Sanskrit literature and philosophy.",
    hod: "Dr. Guruprasad",
    email: "sanskrit@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 6,
  },
  {
    name: "Hindi",
    slug: "hindi",
    description:
      "Department of Hindi provides language education and promotes Hindi literature.",
    hod: "Dr. Gopal",
    email: "hindi@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 7,
  },
  {
    name: "Physical Education",
    slug: "physical-education",
    description:
      "Department of Physical Education promotes sports, fitness and overall physical well-being of students.",
    hod: "Prathap S A",
    email: "sports@mitfgc.in",
    phone: "0821 233 1722",
    sortOrder: 8,
  },
] as const;

export const courses = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    slug: "bca",
    duration: "3 Years",
    intake: 60,
    description:
      "BCA is an undergraduate degree in Computer Application. It provides comprehensive IT education for careers in programming, web development, software engineering, and emerging technologies. Graduates are equipped with practical skills, problem-solving, communication and interpersonal skills.",
    eligibility:
      "Candidate who has successfully completed +2 or PUC or equivalent with Mathematics/Computer Science/Business Mathematics/Accountancy or 3 Years Diploma after SSLC with Computer Science Engineering/Information Science Engineering or equivalent.",
    departmentSlug: "computer-applications",
    featured: true,
    sortOrder: 1,
    aicteApproved: true,
  },
  {
    title: "Bachelor of Commerce (B.COM)",
    slug: "bcom",
    duration: "3 Years",
    intake: 60,
    description:
      "B.COM program offers comprehensive education in finance, accounting, taxation and management. Students gain strong foundations in commerce and are prepared for careers in accounting, banking, finance and business.",
    eligibility:
      "Candidate who has successfully completed 10+2 or PUC or equivalent from a recognized board in any discipline.",
    departmentSlug: "commerce",
    featured: true,
    sortOrder: 2,
    aicteApproved: false,
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    slug: "bba",
    duration: "3 Years",
    intake: 60,
    description:
      "BBA program provides comprehensive business management education with emphasis on entrepreneurship, marketing, finance, and leadership. Students develop managerial competence and practical business skills.",
    eligibility:
      "Candidate who has successfully completed 10+2 or PUC or equivalent from a recognized board in any discipline.",
    departmentSlug: "management-studies",
    featured: true,
    sortOrder: 3,
    aicteApproved: true,
  },
  {
    title: "Master of Commerce (M.COM)",
    slug: "mcom",
    duration: "2 Years",
    intake: 40,
    description:
      "M.COM program provides advanced education in accounting, economics, and banking. Students develop expertise in research methodology, financial analysis and strategic management.",
    eligibility:
      "Candidate who has successfully completed Bachelor's degree in Commerce or BBA from a recognized university with minimum 45% aggregate marks (5% relaxation for SC/ST candidates).",
    departmentSlug: "commerce",
    featured: false,
    sortOrder: 4,
    aicteApproved: false,
  },
] as const;

// departmentSlug is used to link faculty to their department during seeding
export const faculty = [
  // ── Administration ──
  {
    name: "Dr. Chandrajit Mohan",
    slug: "dr-chandrajit-mohan",
    designation: "Principal",
    qualifications: "MCA, KSET, Ph.D",
    specialization:
      "Computer Vision, Machine Learning, Management Information System, Programming Languages",
    experience: "18+ years",
    departmentSlug: "computer-applications",
    sortOrder: 0,
  },

  // ── Computer Applications ──
  {
    name: "Arvind G",
    slug: "arvind-g",
    designation: "HOD & Asst Professor",
    qualifications: "Ph.D., MCA, PGDSD",
    specialization:
      "Computer Networks, C, Data Structures, Python, AI/ML, Biometrics",
    experience: "18+ years",
    departmentSlug: "computer-applications",
    sortOrder: 1,
  },
  {
    name: "Abhilasha C",
    slug: "abhilasha-c",
    designation: "Asst Professor",
    qualifications: "M.Sc, KSET",
    specialization: "C, C++, C#, OS, Python",
    experience: "1+ years",
    departmentSlug: "computer-applications",
    sortOrder: 2,
  },
  {
    name: "Yashaswini B",
    slug: "yashaswini-b",
    designation: "Asst Professor",
    qualifications: "MCA",
    specialization: "C, C++, Python, Data Structures",
    experience: "2+ years",
    departmentSlug: "computer-applications",
    sortOrder: 3,
  },
  {
    name: "Shivaprasad D L",
    slug: "shivaprasad-d-l",
    designation: "Asst Professor",
    qualifications: "M.Sc CS, KSET",
    specialization: "AI, Pattern Recognition, Video Processing",
    experience: "3+ years",
    departmentSlug: "computer-applications",
    sortOrder: 4,
  },
  {
    name: "Yashaswini K",
    slug: "yashaswini-k",
    designation: "Asst Professor",
    qualifications: "MCA",
    specialization: "C, Java, OS, Android, DBMS",
    experience: "1+ years",
    departmentSlug: "computer-applications",
    sortOrder: 5,
  },
  {
    name: "Mattpati Renukadevi",
    slug: "mattpati-renukadevi",
    designation: "Asst Professor",
    qualifications: "BE CS, M.Tech CS",
    specialization: "OR, NAS, Networking",
    experience: "6+ years",
    departmentSlug: "computer-applications",
    sortOrder: 6,
  },
  {
    name: "Parvathi G",
    slug: "parvathi-g",
    designation: "Asst Professor",
    qualifications: "M.Sc CS",
    specialization: "Programming, Data Structures, ML, OS",
    experience: "1+ years",
    departmentSlug: "computer-applications",
    sortOrder: 7,
  },
  {
    name: "Minu B V",
    slug: "minu-b-v",
    designation: "Asst Professor",
    qualifications: "MCA",
    specialization: "Programming, Data Structures, OS, ML",
    experience: "1 year",
    departmentSlug: "computer-applications",
    sortOrder: 8,
  },
  {
    name: "Suchithra N",
    slug: "suchithra-n",
    designation: "Asst Professor",
    qualifications: "MSc CS",
    specialization: "Programming, ML, Data Structures, OS",
    experience: "1 year",
    departmentSlug: "computer-applications",
    sortOrder: 9,
  },
  {
    name: "Pavithra H S",
    slug: "pavithra-h-s",
    designation: "Asst Professor",
    qualifications: "MSc CS",
    specialization: "Programming, ML, Data Structures, OS",
    experience: "1 year",
    departmentSlug: "computer-applications",
    sortOrder: 10,
  },
  {
    name: "Bhoomika M M",
    slug: "bhoomika-m-m",
    designation: "Asst Professor",
    qualifications: "M.Sc CS",
    specialization: "C, Java, Networking, Data Analytics",
    experience: "1+ years",
    departmentSlug: "computer-applications",
    sortOrder: 11,
  },

  // ── Commerce ──
  {
    name: "Harshitha R",
    slug: "harshitha-r",
    designation: "HOD & Asst Professor",
    qualifications: "MBA, Adv Dip HR, PGDBA",
    specialization: "HRM, Company Law, Business Studies",
    experience: "12+ years",
    departmentSlug: "commerce",
    sortOrder: 1,
  },
  {
    name: "Supreetha S",
    slug: "supreetha-s",
    designation: "Asst Professor",
    qualifications: "MFAM, M.Com, PGDBA",
    specialization: "Financial Accounting, Business Law, Entrepreneurship",
    experience: "11+ years",
    departmentSlug: "commerce",
    sortOrder: 2,
  },
  {
    name: "Dr. Sunitha S P",
    slug: "dr-sunitha-s-p",
    designation: "Asst Professor",
    qualifications: "M.Com, MBA, PGDFM, NET, KSET, Ph.D",
    specialization: "Financial Management, HRM",
    experience: "14+ years",
    departmentSlug: "commerce",
    sortOrder: 3,
  },
  {
    name: "Deepa Prabu I",
    slug: "deepa-prabu-i",
    designation: "Asst Professor",
    qualifications: "M.Com, PGDBA, PGDT, KSET",
    specialization: "Accounting",
    experience: "10+ years",
    departmentSlug: "commerce",
    sortOrder: 4,
  },
  {
    name: "Manohar N",
    slug: "manohar-n",
    designation: "Asst Professor",
    qualifications: "M.Com, NET",
    specialization:
      "Financial Management, Cost Accounting, Taxation, Statistics",
    experience: "5+ years",
    departmentSlug: "commerce",
    sortOrder: 5,
  },
  {
    name: "Kavana S",
    slug: "kavana-s",
    designation: "Asst Professor",
    qualifications: "M.Com, KSET",
    specialization: "Statistics, Cost Accounting",
    experience: "8+ years",
    departmentSlug: "commerce",
    sortOrder: 6,
  },
  {
    name: "Varshini P",
    slug: "varshini-p",
    designation: "Asst Professor",
    qualifications: "M.Com",
    specialization: "Taxation, Quantitative Techniques, E-Commerce",
    experience: "8+ years",
    departmentSlug: "commerce",
    sortOrder: 7,
  },
  {
    name: "Sachin C A",
    slug: "sachin-c-a",
    designation: "Asst Professor",
    qualifications: "M.Com, NET, KSET",
    specialization: "Income Tax, Company Law, Auditing, Banking",
    experience: "8+ years",
    departmentSlug: "commerce",
    sortOrder: 8,
  },
  {
    name: "Akshatha A M",
    slug: "akshatha-a-m",
    designation: "Asst Professor",
    qualifications: "M.Com",
    specialization: "IFRS, Quantitative Techniques, HRM",
    experience: "7+ years",
    departmentSlug: "commerce",
    sortOrder: 9,
  },
  {
    name: "Pooja D",
    slug: "pooja-d",
    designation: "Asst Professor",
    qualifications: "M.Com, NET, KSET",
    specialization: "Taxation",
    experience: "4+ years",
    departmentSlug: "commerce",
    sortOrder: 10,
  },
  {
    name: "Rahul Dev S",
    slug: "rahul-dev-s",
    designation: "Asst Professor",
    qualifications: "MSc",
    specialization: "Environmental Science",
    experience: "10+ years",
    departmentSlug: "commerce",
    sortOrder: 11,
  },
  {
    name: "Kumar R",
    slug: "kumar-r",
    designation: "Asst Professor",
    qualifications: "MA Political Science",
    specialization: "Indian Constitution and Polity",
    experience: "20+ years",
    departmentSlug: "commerce",
    sortOrder: 12,
  },
  {
    name: "Arun Kumar K",
    slug: "arun-kumar-k",
    designation: "Asst Professor",
    qualifications: "M.Com, B.Ed, NET, KSET",
    specialization: "Financial Management, Business Statistics, Marketing",
    experience: "6+ years",
    departmentSlug: "commerce",
    sortOrder: 13,
  },
  {
    name: "Yamini R",
    slug: "yamini-r",
    designation: "Asst Professor",
    qualifications: "M.Com, NET",
    specialization: "Financial Management, Marketing",
    experience: "3+ years",
    departmentSlug: "commerce",
    sortOrder: 14,
  },
  {
    name: "Shubhada M R",
    slug: "shubhada-m-r",
    designation: "Asst Professor",
    qualifications: "M.Com, PGDBA, KSET",
    specialization: "Taxation, Quantitative Techniques",
    experience: "3+ years",
    departmentSlug: "commerce",
    sortOrder: 15,
  },
  {
    name: "Bhavya K",
    slug: "bhavya-k",
    designation: "Asst Professor",
    qualifications: "M.Com, KSET",
    specialization: "Accounting, HRM",
    experience: "3+ years",
    departmentSlug: "commerce",
    sortOrder: 16,
  },
  {
    name: "Madhu M",
    slug: "madhu-m",
    designation: "Asst Professor",
    qualifications: "M.Com, NET, KSET",
    specialization: "Taxation",
    experience: "4+ years",
    departmentSlug: "commerce",
    sortOrder: 17,
  },

  // ── English ──
  {
    name: "Reena Satish",
    slug: "reena-satish",
    designation: "HOD & Asst Professor",
    qualifications: "MA, M.Phil",
    specialization: "Literature in English",
    experience: "16+ years",
    departmentSlug: "english",
    sortOrder: 1,
  },
  {
    name: "Rakshith Kesari",
    slug: "rakshith-kesari",
    designation: "Asst Professor",
    qualifications: "MA, KSET, Ph.D candidate",
    specialization: "Literature",
    experience: "9+ years",
    departmentSlug: "english",
    sortOrder: 2,
  },
  {
    name: "Manasa S",
    slug: "manasa-s",
    designation: "Asst Professor",
    qualifications: "MA",
    specialization: "Literature",
    experience: "2+ years",
    departmentSlug: "english",
    sortOrder: 3,
  },

  // ── Kannada ──
  {
    name: "Dr. Nanda T N",
    slug: "dr-nanda-t-n",
    designation: "HOD & Asst Professor",
    qualifications: "MA, B.Ed, Ph.D, NSET, TET",
    specialization: "Janapada, Navodhaya Saahitya",
    experience: "12+ years",
    departmentSlug: "kannada",
    sortOrder: 1,
  },
  {
    name: "Latheshwari",
    slug: "latheshwari",
    designation: "Asst Professor",
    qualifications: "MA, B.Ed",
    specialization: "Janapada, Navodhaya Saahitya",
    experience: "13+ years",
    departmentSlug: "kannada",
    sortOrder: 2,
  },
  {
    name: "Abhinandan K M",
    slug: "abhinandan-k-m",
    designation: "Asst Professor",
    qualifications: "MA, KSET, NET",
    specialization: "Literature and Criticism",
    experience: "2 years",
    departmentSlug: "kannada",
    sortOrder: 3,
  },

  // ── Sanskrit ──
  {
    name: "Dr. Guruprasad",
    slug: "dr-guruprasad",
    designation: "Asst Professor",
    qualifications: "MA, Ph.D",
    specialization: "Nyaya, Navodhaya Saahitya",
    experience: "14+ years",
    departmentSlug: "sanskrit",
    sortOrder: 1,
  },

  // ── Hindi ──
  {
    name: "Dr. Gopal",
    slug: "dr-gopal",
    designation: "Asst Professor",
    qualifications: "MA, Ph.D",
    specialization: "Literature",
    experience: "22+ years",
    departmentSlug: "hindi",
    sortOrder: 1,
  },

  // ── Physical Education ──
  {
    name: "Prathap S A",
    slug: "prathap-s-a",
    designation: "Physical Education Director",
    qualifications: "M.Com, M.PEd",
    specialization: "Physical Education and Sports",
    experience: "8 years",
    departmentSlug: "physical-education",
    sortOrder: 1,
  },

  // ── Library ──
  // Library staff placed under commerce as a default; no dedicated dept
  {
    name: "Mahadevswamy",
    slug: "mahadevswamy",
    designation: "Librarian",
    qualifications: "M.LISc",
    specialization: "Library and Information Science",
    experience: "2 years",
    departmentSlug: "commerce",
    sortOrder: 99,
  },
] as const;

// Maps faculty to courses they teach (by slug)
export const courseFacultyLinks: Array<{
  facultySlug: string;
  courseSlugs: string[];
}> = [
  // Principal teaches BCA
  { facultySlug: "dr-chandrajit-mohan", courseSlugs: ["bca"] },
  // Computer Applications faculty -> BCA
  { facultySlug: "arvind-g", courseSlugs: ["bca"] },
  { facultySlug: "abhilasha-c", courseSlugs: ["bca"] },
  { facultySlug: "yashaswini-b", courseSlugs: ["bca"] },
  { facultySlug: "shivaprasad-d-l", courseSlugs: ["bca"] },
  { facultySlug: "yashaswini-k", courseSlugs: ["bca"] },
  { facultySlug: "mattpati-renukadevi", courseSlugs: ["bca"] },
  { facultySlug: "parvathi-g", courseSlugs: ["bca"] },
  { facultySlug: "minu-b-v", courseSlugs: ["bca"] },
  { facultySlug: "suchithra-n", courseSlugs: ["bca"] },
  { facultySlug: "pavithra-h-s", courseSlugs: ["bca"] },
  { facultySlug: "bhoomika-m-m", courseSlugs: ["bca"] },
  // Commerce faculty -> BCOM, MCOM
  { facultySlug: "harshitha-r", courseSlugs: ["bcom", "mcom", "bba"] },
  { facultySlug: "supreetha-s", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "dr-sunitha-s-p", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "deepa-prabu-i", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "manohar-n", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "kavana-s", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "varshini-p", courseSlugs: ["bcom"] },
  { facultySlug: "sachin-c-a", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "akshatha-a-m", courseSlugs: ["bcom"] },
  { facultySlug: "pooja-d", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "rahul-dev-s", courseSlugs: ["bcom", "bca", "bba"] },
  { facultySlug: "kumar-r", courseSlugs: ["bcom", "bca", "bba"] },
  { facultySlug: "arun-kumar-k", courseSlugs: ["bcom", "mcom"] },
  { facultySlug: "yamini-r", courseSlugs: ["bcom"] },
  { facultySlug: "shubhada-m-r", courseSlugs: ["bcom"] },
  { facultySlug: "bhavya-k", courseSlugs: ["bcom"] },
  { facultySlug: "madhu-m", courseSlugs: ["bcom", "mcom"] },
  // Language faculty teach across all UG courses
  { facultySlug: "reena-satish", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "rakshith-kesari", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "manasa-s", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "dr-nanda-t-n", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "latheshwari", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "abhinandan-k-m", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "dr-guruprasad", courseSlugs: ["bca", "bcom", "bba"] },
  { facultySlug: "dr-gopal", courseSlugs: ["bca", "bcom", "bba"] },
];

export const siteSettings: Array<{
  key: string;
  value: string;
  type: string;
}> = [
  { key: "college_name", value: "MIT First Grade College", type: "text" },
  { key: "college_code", value: "1093", type: "text" },
  { key: "uucms_code", value: "P26GCE0057", type: "text" },
  { key: "aishe_code", value: "C-17497", type: "text" },
  { key: "aicte_pid", value: "1-44070786193", type: "text" },
  { key: "naac_grade", value: "A", type: "text" },
  { key: "established_year", value: "2009", type: "number" },
  { key: "affiliation", value: "University of Mysore", type: "text" },
  {
    key: "address",
    value:
      "169/1, New No. F29, 1, Mananthavadi Rd, Vidyaranyapura, Mysuru, Karnataka 570008",
    type: "text",
  },
  { key: "phone", value: "0821 233 1722", type: "text" },
  { key: "email", value: "info@mitfgc.in", type: "text" },
  {
    key: "vision",
    value:
      "Empower the individuals and society at large through educational excellence; sensitize them for a life dedicated to the service of fellow human beings and mother land.",
    type: "text",
  },
  {
    key: "mission",
    value:
      "To impact holistic education that enables the students to become socially responsive and useful, with roots firm on traditional and cultural values; and to hone their skills to accept challenges and respond to opportunities in a global scenario.",
    type: "text",
  },
  {
    key: "core_values",
    value: JSON.stringify([
      "Academic Excellence",
      "Integrity and Ethics",
      "Inclusiveness and Diversity",
      "Innovation and Creativity",
      "Social Responsibility",
    ]),
    type: "json",
  },
  {
    key: "trust_name",
    value: "Maharaja Education Trust (R), Mysuru",
    type: "text",
  },
  { key: "map_lat", value: "12.273329", type: "number" },
  { key: "map_lng", value: "76.639346", type: "number" },
];

export const events = [
  {
    title: "AICTE ATAL FDP 2025 - AI Innovation",
    slug: "aicte-atal-fdp-2025",
    description:
      "One Week Faculty Development Program under AICTE-ATAL FDP scheme on AI Innovation: Advanced Techniques and Practical from 18th to 23rd August, 2025.",
    venue: "MIT First Grade College",
    eventDate: "2025-08-18T09:00:00",
    endDate: "2025-08-23T17:00:00",
    featured: true,
  },
  {
    title: "Annual Conference 2025-26",
    slug: "annual-conference-2025-26",
    description:
      "Annual academic conference featuring research presentations and workshops by faculty and students.",
    venue: "MIT First Grade College Auditorium",
    eventDate: "2026-02-25T09:00:00",
    endDate: null,
    featured: false,
  },
  {
    title: "Swadeshi Vidyarthi Brigade",
    slug: "swadeshi-vidyarthi-brigade",
    description:
      "A nationalistic movement promoting self-reliance, local businesses, and entrepreneurial initiatives among students.",
    venue: "College Seminar Hall",
    eventDate: "2026-03-15T10:00:00",
    endDate: null,
    featured: false,
  },
] as const;

export type NoticePriority = "URGENT" | "HIGH" | "NORMAL" | "LOW";

export const notices: Array<{
  title: string;
  content: string;
  priority: NoticePriority;
  expiresAt: string | null;
}> = [
  {
    title: "Admissions Open 2026-27",
    content:
      "Applications are now open for BCA, BBA, B.COM, and M.COM programs for the academic year 2026-27. Limited seats available. Apply now!",
    priority: "URGENT",
    expiresAt: "2026-06-30T23:59:59",
  },
  {
    title: "AICTE ATAL FDP Registration",
    content:
      "Registration is open for the One Week Faculty Development Program on AI Innovation: Advanced Techniques and Practical (18-23 August 2025). Register on the ATAL Academy portal.",
    priority: "HIGH",
    expiresAt: "2025-08-17T23:59:59",
  },
  {
    title: "Arivu-Neravu Student Support Program",
    content:
      "MIT FGC offers fee concessions, free bus facility, and financial assistance for meritorious and needy students under the Arivu-Neravu program. Contact the office for details.",
    priority: "NORMAL",
    expiresAt: null,
  },
];

export const pages = [
  {
    title: "About MIT First Grade College",
    slug: "about",
    description: "Learn about MIT FGC's history, vision, and mission",
    content: `<h2>About the Institution</h2>
<p>MIT First Grade College (Previously, Gopalaswamy College of Professional Studies) was established in the year 2009 by Maharaja Education Trust(R), Mysuru. The Institution is affiliated to University of Mysore and aims at imparting good education with an emphasis on developing the overall personality of its students in addition to instilling moral values.</p>
<p>Accredited by NAAC with Grade A. Approved by UGC and AICTE.</p>
<h3>Vision</h3>
<p>Empower the individuals and society at large through educational excellence; sensitize them for a life dedicated to the service of fellow human beings and mother land.</p>
<h3>Mission</h3>
<p>To impact holistic education that enables the students to become socially responsive and useful, with roots firm on traditional and cultural values; and to hone their skills to accept challenges and respond to opportunities in a global scenario.</p>`,
  },
  {
    title: "Admissions",
    slug: "admissions",
    description: "Information about admission process and requirements",
    content: `<h2>Admission Process</h2>
<p>MIT First Grade College welcomes students from diverse backgrounds. We offer programs in BCA, BBA, B.COM, and M.COM. Applications are accepted as per University of Mysore schedule.</p>
<h3>Programs Offered</h3>
<ul>
<li>BCA - Bachelor of Computer Applications (AICTE Approved)</li>
<li>B.COM - Bachelor of Commerce</li>
<li>BBA - Bachelor of Business Administration (AICTE Approved)</li>
<li>M.COM - Master of Commerce</li>
</ul>
<h3>Financial Support</h3>
<p>We offer fee concessions for meritorious students, free bus facility, and payment of fees in installments for deserving students.</p>`,
  },
  {
    title: "IQAC",
    slug: "iqac",
    description:
      "Internal Quality Assurance Cell - ensuring quality education",
    content: `<h2>Internal Quality Assurance Cell (IQAC)</h2>
<p>IQAC at MIT First Grade College is committed to ensuring quality education and continuous improvement in academic and administrative processes.</p>
<p>The IQAC works towards promoting measures for institutional functioning towards quality enhancement, channelizing all efforts and measures of the institution towards promoting holistic academic excellence.</p>`,
  },
  {
    title: "RTI",
    slug: "rti",
    description: "Right to Information - transparency and accountability",
    content: `<h2>Right to Information (RTI)</h2>
<p>In compliance with the Right to Information Act, MIT First Grade College provides information to citizens as mandated. For RTI queries, please contact the office.</p>`,
  },
  {
    title: "Library",
    slug: "library",
    description: "College library resources and facilities",
    content: `<h2>Library</h2>
<p>MIT First Grade College library houses over 3000 books, journals, and periodicals. The library provides a conducive environment for reading and research with a spacious reading room.</p>
<h3>Facilities</h3>
<ul>
<li>Over 3000 books and reference materials</li>
<li>National and international journals</li>
<li>Digital library access</li>
<li>Spacious reading room</li>
<li>Book bank facility</li>
</ul>`,
  },
  {
    title: "Anti-Ragging",
    slug: "anti-ragging",
    description: "Anti-ragging policy and committee details",
    content: `<h2>Anti-Ragging Policy</h2>
<p>MIT First Grade College maintains a strict anti-ragging policy in accordance with UGC regulations. Ragging in any form is strictly prohibited and punishable.</p>
<p>An Anti-Ragging Committee and Anti-Ragging Squad have been constituted as per the directives of the Hon'ble Supreme Court and UGC.</p>
<p>For complaints, contact the Anti-Ragging Helpline: 1800-180-5522 or email: helpline@antiragging.in</p>`,
  },
] as const;

export const galleryImages = [
  {
    title: "College Campus",
    description:
      "MIT First Grade College campus at Vidyaranyapura, Mysuru",
    imageUrl: "/images/gallery/campus-1.jpg",
    category: "Campus",
    tags: ["campus", "building", "mysuru"],
    sortOrder: 1,
  },
  {
    title: "Computer Lab",
    description: "Well-equipped computer lab with 80+ systems",
    imageUrl: "/images/gallery/lab-1.jpg",
    category: "Infrastructure",
    tags: ["lab", "computers", "facilities"],
    sortOrder: 2,
  },
  {
    title: "Library",
    description:
      "College library with over 3000 books and reading room",
    imageUrl: "/images/gallery/library-1.jpg",
    category: "Infrastructure",
    tags: ["library", "books", "reading"],
    sortOrder: 3,
  },
] as const;
