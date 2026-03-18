import { PrismaClient, Role, Priority } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data (in development only)
  if (process.env.NODE_ENV === "development") {
    console.log("🗑️  Cleaning existing data...");
    await prisma.contactSubmission.deleteMany();
    await prisma.courseFaculty.deleteMany();
    await prisma.page.deleteMany();
    await prisma.galleryImage.deleteMany();
    await prisma.notice.deleteMany();
    await prisma.event.deleteMany();
    await prisma.faculty.deleteMany();
    await prisma.course.deleteMany();
    await prisma.department.deleteMany();
    await prisma.user.deleteMany();
  }

  // Create admin user (Principal)
  console.log("👤 Creating users...");
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      email: "chandrajithmmca@mitmysore.in",
      name: "Dr. Chandrajit Mohan",
      passwordHash: adminPassword,
      role: Role.SUPER_ADMIN,
    },
  });

  // Create editor user
  const editorPassword = await bcrypt.hash("editor123", 10);
  const editor = await prisma.user.create({
    data: {
      email: "editor@mitfgc.in",
      name: "Content Editor",
      passwordHash: editorPassword,
      role: Role.EDITOR,
    },
  });

  console.log("✅ Users created");

  // Create Departments
  console.log("🏛️  Creating departments...");
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: "Computer Applications",
        slug: "computer-applications",
        description:
          "Department of Computer Applications offers BCA program that provides students with opportunities to pursue careers in IT field. Graduates are equipped with practical skills, problem-solving, communication and interpersonal skills.",
        hod: "Arvind G",
        email: "arvind@mitfgc.in",
        phone: "0821 233 1722",
        published: true,
        sortOrder: 1,
      },
    }),
    prisma.department.create({
      data: {
        name: "English",
        slug: "english",
        description:
          "Department of English provides language and communication skills training to students across all programs.",
        hod: "Reena Sateesh",
        email: "english@mitfgc.in",
        phone: "0821 233 1722",
        published: true,
        sortOrder: 2,
      },
    }),
    prisma.department.create({
      data: {
        name: "Commerce",
        slug: "commerce",
        description:
          "Department of Commerce offers undergraduate and postgraduate programs in commerce and accounting.",
        hod: "Madhu M",
        email: "commerce@mitfgc.in",
        phone: "0821 233 1722",
        published: true,
        sortOrder: 3,
      },
    }),
    prisma.department.create({
      data: {
        name: "Management Studies",
        slug: "management-studies",
        description:
          "Department of Management Studies offers BBA program focusing on business administration and entrepreneurship.",
        hod: "Management Head",
        email: "management@mitfgc.in",
        phone: "0821 233 1722",
        published: true,
        sortOrder: 4,
      },
    }),
  ]);

  console.log("✅ Departments created");

  // Create Courses
  console.log("📚 Creating courses...");
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "Bachelor of Computer Applications (BCA)",
        slug: "bca",
        duration: "3 Years",
        intake: 60,
        description:
          "BCA is an undergraduate degree in Computer Application. It provides students with the opportunities to pursue career in IT field. Graduates are equipped with practical skills, problem-solving, communication and interpersonal skills that provides foundations for lifelong learning.",
        eligibility:
          "Candidate who has successfully completed +2 or PUC or equivalent with Mathematics/Computer Science/Business Mathematics/Accountancy or 3 Years Diploma after SSLC with Computer Science Engineering/Information Science Engineering or equivalent.",
        fees: "As per University norms",
        departmentId: departments[0].id,
        published: true,
        featured: true,
        sortOrder: 1,
      },
    }),
    prisma.course.create({
      data: {
        title: "Bachelor of Business Administration (BBA)",
        slug: "bba",
        duration: "3 Years",
        intake: 60,
        description:
          "BBA program provides comprehensive business education with emphasis on management principles, entrepreneurship, and practical business skills.",
        eligibility:
          "Candidate who has successfully completed +2 or PUC or equivalent from a recognized board.",
        fees: "As per University norms",
        departmentId: departments[3].id,
        published: true,
        featured: true,
        sortOrder: 2,
      },
    }),
    prisma.course.create({
      data: {
        title: "Bachelor of Commerce (B.COM)",
        slug: "bcom",
        duration: "3 Years",
        intake: 60,
        description:
          "B.COM program offers comprehensive education in commerce, accounting, finance, and business studies.",
        eligibility:
          "Candidate who has successfully completed +2 or PUC or equivalent from a recognized board.",
        fees: "As per University norms",
        departmentId: departments[2].id,
        published: true,
        featured: false,
        sortOrder: 3,
      },
    }),
    prisma.course.create({
      data: {
        title: "Master of Commerce (M.COM)",
        slug: "mcom",
        duration: "2 Years",
        intake: 40,
        description:
          "M.COM program provides advanced education in commerce, accounting, finance, and business research.",
        eligibility:
          "Candidate who has successfully completed B.COM or equivalent degree from a recognized university.",
        fees: "As per University norms",
        departmentId: departments[2].id,
        published: true,
        featured: false,
        sortOrder: 4,
      },
    }),
  ]);

  console.log("✅ Courses created");

  // Create Faculty
  console.log("👨‍🏫 Creating faculty...");
  const faculty = await Promise.all([
    prisma.faculty.create({
      data: {
        name: "Dr. Chandrajit Mohan",
        slug: "dr-chandrajit-mohan",
        designation: "Principal",
        email: "chandrajithmmca@mitmysore.in",
        phone: "0821 233 1722",
        bio: "Dr. Chandrajit Mohan is the Principal of MIT First Grade College with extensive experience in Computer Vision, Machine Learning, and Management Information Systems. He has 25+ research publications, 3 textbooks, 2 patents, and is currently guiding 5 research scholars.",
        qualifications: "MCA, Ph.D., KSET",
        specialization: "Computer Vision, Machine Learning, Management Information System, Programming Languages",
        experience: "15 Years Teaching, 3 Years Industry, 12 Years Research",
        departmentId: departments[0].id,
        published: true,
        sortOrder: 1,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Arvind G",
        slug: "arvind-g",
        designation: "Head & Asst. Professor",
        email: "arvind@mitfgc.in",
        phone: "8722882266",
        bio: "Arvind G is the Head of Department of Computer Applications with expertise in Computer Networks, AI, and Biometrics.",
        qualifications: "MCA, PGDSD, (Ph.D.)",
        specialization: "Computer Networks, C language, Data Structures, Python, Artificial Intelligence and Machine Learning, Biometrics",
        experience: "15 Years",
        departmentId: departments[0].id,
        published: true,
        sortOrder: 2,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Shivaprasad D L",
        slug: "shivaprasad-dl",
        designation: "Asst. Professor",
        email: "shivaprasad@mitfgc.in",
        phone: "0821 233 1722",
        bio: "Shivaprasad D L specializes in Artificial Intelligence, Pattern Recognition, and Video Processing.",
        qualifications: "MCA, NET, (Ph.D.)",
        specialization: "Artificial Intelligence, Pattern Recognition, Video Processing, Biometrics",
        experience: "3 Years",
        departmentId: departments[0].id,
        published: true,
        sortOrder: 3,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Suhas B. Raj",
        slug: "suhas-b-raj",
        designation: "Asst. Professor",
        email: "suhas@mitfgc.in",
        phone: "8050950963",
        bio: "Suhas B. Raj is an Assistant Professor in the Department of Computer Applications.",
        qualifications: "MCA",
        specialization: "Computer Applications",
        experience: "3 Years",
        departmentId: departments[0].id,
        published: true,
        sortOrder: 4,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Yashaswini K",
        slug: "yashaswini-k",
        designation: "Asst. Professor",
        email: "yashaswini@mitfgc.in",
        phone: "0821 233 1722",
        bio: "Yashaswini K teaches programming languages and database management systems.",
        qualifications: "MCA",
        specialization: "C, JAVA, OS, Android, DBMS",
        experience: "1 Year",
        departmentId: departments[0].id,
        published: true,
        sortOrder: 5,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Reena Sateesh",
        slug: "reena-sateesh",
        designation: "Asst. Professor",
        email: "reena@mitfgc.in",
        phone: "0821 233 1722",
        bio: "Reena Sateesh is an experienced English faculty member with 19 years of teaching experience.",
        qualifications: "MA, M.Phil.",
        specialization: "English Language and Literature",
        experience: "19 Years",
        departmentId: departments[1].id,
        published: true,
        sortOrder: 1,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Rakshith Kesari",
        slug: "rakshith-kesari",
        designation: "Asst. Professor",
        email: "rakshith@mitfgc.in",
        phone: "0821 233 1722",
        bio: "Rakshith Kesari is a published author and English faculty member.",
        qualifications: "MA, KSET",
        specialization: "English Language and Literature",
        experience: "9 Years",
        departmentId: departments[1].id,
        published: true,
        sortOrder: 2,
      },
    }),
    prisma.faculty.create({
      data: {
        name: "Madhu M",
        slug: "madhu-m",
        designation: "Asst. Professor",
        email: "madhu@mitfgc.in",
        phone: "0821 233 1722",
        bio: "Madhu M specializes in Taxation and Commerce.",
        qualifications: "M.Com, NET, KSET",
        specialization: "Taxation",
        experience: "4 Years",
        departmentId: departments[2].id,
        published: true,
        sortOrder: 1,
      },
    }),
  ]);

  console.log("✅ Faculty created");

  // Link Faculty to Courses
  console.log("🔗 Linking faculty to courses...");
  await Promise.all([
    prisma.courseFaculty.create({
      data: { courseId: courses[0].id, facultyId: faculty[0].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[0].id, facultyId: faculty[1].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[0].id, facultyId: faculty[2].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[0].id, facultyId: faculty[3].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[0].id, facultyId: faculty[4].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[1].id, facultyId: faculty[7].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[2].id, facultyId: faculty[7].id },
    }),
    prisma.courseFaculty.create({
      data: { courseId: courses[3].id, facultyId: faculty[7].id },
    }),
  ]);

  console.log("✅ Faculty-course relationships created");

  // Create Events
  console.log("📅 Creating events...");
  await Promise.all([
    prisma.event.create({
      data: {
        title: "AICTE ATAL FDP 2025 - AI Innovation",
        slug: "atal-fdp-2025",
        description:
          "One Week Faculty Development Program under AICTE-ATAL FDP scheme on AI Innovation: Advanced Techniques and Practical from 18th to 23rd August, 2025.",
        venue: "MIT First Grade College",
        eventDate: new Date("2025-08-18T09:00:00"),
        endDate: new Date("2025-08-23T17:00:00"),
        published: true,
        featured: true,
        authorId: admin.id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Conference 2025-26",
        slug: "conference-2025-26",
        description:
          "Annual academic conference featuring research presentations and workshops by faculty and students.",
        venue: "MIT First Grade College Auditorium",
        eventDate: new Date("2026-02-25T09:00:00"),
        published: true,
        authorId: editor.id,
      },
    }),
    prisma.event.create({
      data: {
        title: "Swadeshi Vidyarthi Brigade Event",
        slug: "swadeshi-vidyarthi-brigade-2026",
        description:
          "A nationalistic movement promoting self-reliance, local businesses, and entrepreneurial initiatives among students.",
        venue: "College Seminar Hall",
        eventDate: new Date("2026-03-15T10:00:00"),
        published: true,
        authorId: admin.id,
      },
    }),
  ]);

  console.log("✅ Events created");

  // Create Notices
  console.log("📢 Creating notices...");
  await Promise.all([
    prisma.notice.create({
      data: {
        title: "Admission Open for 2026-27 Academic Year",
        content:
          "Applications are now open for BCA, BBA, B.COM, and M.COM programs for the academic year 2026-27. Deadline: March 31, 2026. Limited seats available.",
        priority: Priority.HIGH,
        published: true,
        expiresAt: new Date("2026-03-31T23:59:59"),
        authorId: admin.id,
      },
    }),
    prisma.notice.create({
      data: {
        title: "AICTE ATAL FDP 2025 - Registration Open",
        content:
          "One Week Faculty Development Program on AI Innovation: Advanced Techniques and Practical from 18th to 23rd August, 2025. Register now at ATAL Academy portal.",
        priority: Priority.URGENT,
        published: true,
        authorId: admin.id,
      },
    }),
    prisma.notice.create({
      data: {
        title: "Arivu-Neravu: Financial Support for Students",
        content:
          "MIT FGC offers fee concessions, free bus facility, and financial assistance for meritorious and needy students. Contact office for details.",
        priority: Priority.NORMAL,
        published: true,
        authorId: editor.id,
      },
    }),
  ]);

  console.log("✅ Notices created");

  // Create Gallery Images
  console.log("🖼️  Creating gallery images...");
  await Promise.all([
    prisma.galleryImage.create({
      data: {
        title: "College Campus",
        description: "MIT First Grade College campus at Vidyaranyapura, Mysuru",
        imageUrl: "/images/gallery/campus-1.jpg",
        category: "Campus",
        tags: ["campus", "building", "mysuru"],
        published: true,
        sortOrder: 1,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: "Computer Lab",
        description: "Well-equipped computer lab with 80+ systems",
        imageUrl: "/images/gallery/lab-1.jpg",
        category: "Infrastructure",
        tags: ["lab", "computers", "facilities"],
        published: true,
        sortOrder: 2,
      },
    }),
    prisma.galleryImage.create({
      data: {
        title: "Library",
        description: "College library with over 3000 books and reading room",
        imageUrl: "/images/gallery/library-1.jpg",
        category: "Infrastructure",
        tags: ["library", "books", "reading"],
        published: true,
        sortOrder: 3,
      },
    }),
  ]);

  console.log("✅ Gallery images created");

  // Create Pages
  console.log("📄 Creating pages...");
  await Promise.all([
    prisma.page.create({
      data: {
        title: "About MIT First Grade College",
        slug: "about",
        content:
          "<h2>About the Institution</h2><p>MIT First Grade College (Previously, Gopalaswamy College of Professional Studies) was established in the year 2009 by Maharaja Education Trust(R), Mysuru. The Institution is affiliated to University of Mysore and aims at imparting good education with an emphasis on developing the overall personality of its students in addition to instilling moral values.</p><p>Accredited by NAAC with Grade A. Approved by UGC and AICTE.</p>",
        description:
          "Learn about MIT FGC's history, vision, and mission",
        published: true,
        authorId: admin.id,
      },
    }),
    prisma.page.create({
      data: {
        title: "Admissions",
        slug: "admissions",
        content:
          "<h2>Admission Process</h2><p>MIT First Grade College welcomes students from diverse backgrounds. We offer programs in BCA, BBA, B.COM, and M.COM. Applications are accepted as per University of Mysore schedule.</p><h3>Financial Support</h3><p>We offer fee concessions for meritorious students, free bus facility, and payment of fees in installments for deserving students.</p>",
        description: "Information about admission process and requirements",
        published: true,
        authorId: admin.id,
      },
    }),
  ]);

  console.log("✅ Pages created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Login Credentials:");
  console.log("   Admin: chandrajithmmca@mitmysore.in / admin123");
  console.log("   Editor: editor@mitfgc.in / editor123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
