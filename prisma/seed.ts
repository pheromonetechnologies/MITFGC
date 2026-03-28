import { PrismaClient, Role, Priority } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  departments as deptData,
  courses as courseData,
  faculty as facultyData,
  courseFacultyLinks,
  siteSettings,
  events as eventData,
  notices as noticeData,
  pages as pageData,
  galleryImages as galleryData,
} from "../src/lib/seed-data";

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@mitfgc.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "arvind";

async function main() {
  console.log("Starting database seed...");

  // ── Admin User ──
  console.log("Creating admin user...");
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { passwordHash, role: Role.SUPER_ADMIN },
    create: {
      email: ADMIN_EMAIL,
      name: "Admin",
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`  Admin: ${ADMIN_EMAIL}`);

  // ── Departments ──
  console.log("Creating departments...");
  const deptMap = new Map<string, string>(); // slug -> id
  for (const dept of deptData) {
    const record = await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {
        name: dept.name,
        description: dept.description,
        hod: dept.hod,
        email: dept.email,
        phone: dept.phone,
        sortOrder: dept.sortOrder,
        published: true,
      },
      create: {
        name: dept.name,
        slug: dept.slug,
        description: dept.description,
        hod: dept.hod,
        email: dept.email,
        phone: dept.phone,
        sortOrder: dept.sortOrder,
        published: true,
      },
    });
    deptMap.set(dept.slug, record.id);
  }
  console.log(`  ${deptMap.size} departments created`);

  // ── Courses ──
  console.log("Creating courses...");
  const courseMap = new Map<string, string>(); // slug -> id
  for (const course of courseData) {
    const departmentId = deptMap.get(course.departmentSlug);
    if (!departmentId) {
      console.error(`  Department not found: ${course.departmentSlug}`);
      continue;
    }
    const record = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        duration: course.duration,
        intake: course.intake,
        description: course.description,
        eligibility: course.eligibility,
        fees: "As per University norms",
        departmentId,
        published: true,
        featured: course.featured,
        sortOrder: course.sortOrder,
      },
      create: {
        title: course.title,
        slug: course.slug,
        duration: course.duration,
        intake: course.intake,
        description: course.description,
        eligibility: course.eligibility,
        fees: "As per University norms",
        departmentId,
        published: true,
        featured: course.featured,
        sortOrder: course.sortOrder,
      },
    });
    courseMap.set(course.slug, record.id);
  }
  console.log(`  ${courseMap.size} courses created`);

  // ── Faculty ──
  console.log("Creating faculty...");
  const facultyMap = new Map<string, string>(); // slug -> id
  for (const f of facultyData) {
    const departmentId = deptMap.get(f.departmentSlug);
    if (!departmentId) {
      console.error(`  Department not found for faculty: ${f.name}`);
      continue;
    }
    const record = await prisma.faculty.upsert({
      where: { slug: f.slug },
      update: {
        name: f.name,
        designation: f.designation,
        qualifications: f.qualifications,
        specialization: f.specialization,
        experience: f.experience,
        departmentId,
        published: true,
        sortOrder: f.sortOrder,
      },
      create: {
        name: f.name,
        slug: f.slug,
        designation: f.designation,
        qualifications: f.qualifications,
        specialization: f.specialization,
        experience: f.experience,
        departmentId,
        published: true,
        sortOrder: f.sortOrder,
      },
    });
    facultyMap.set(f.slug, record.id);
  }
  console.log(`  ${facultyMap.size} faculty created`);

  // ── CourseFaculty Links ──
  console.log("Linking faculty to courses...");
  let linkCount = 0;
  for (const link of courseFacultyLinks) {
    const facultyId = facultyMap.get(link.facultySlug);
    if (!facultyId) continue;
    for (const courseSlug of link.courseSlugs) {
      const courseId = courseMap.get(courseSlug);
      if (!courseId) continue;
      try {
        await prisma.courseFaculty.upsert({
          where: {
            courseId_facultyId: { courseId, facultyId },
          },
          update: {},
          create: { courseId, facultyId },
        });
        linkCount++;
      } catch (err) {
        // ignore duplicate constraint errors
      }
    }
  }
  console.log(`  ${linkCount} course-faculty links created`);

  // ── Events ──
  console.log("Creating events...");
  for (const ev of eventData) {
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {
        title: ev.title,
        description: ev.description,
        venue: ev.venue,
        eventDate: new Date(ev.eventDate),
        endDate: ev.endDate ? new Date(ev.endDate) : null,
        published: true,
        featured: ev.featured,
        authorId: admin.id,
      },
      create: {
        title: ev.title,
        slug: ev.slug,
        description: ev.description,
        venue: ev.venue,
        eventDate: new Date(ev.eventDate),
        endDate: ev.endDate ? new Date(ev.endDate) : null,
        published: true,
        featured: ev.featured,
        authorId: admin.id,
      },
    });
  }
  console.log(`  ${eventData.length} events created`);

  // ── Notices ──
  console.log("Creating notices...");
  const priorityMap: Record<string, Priority> = {
    URGENT: Priority.URGENT,
    HIGH: Priority.HIGH,
    NORMAL: Priority.NORMAL,
    LOW: Priority.LOW,
  };
  for (const notice of noticeData) {
    await prisma.notice.create({
      data: {
        title: notice.title,
        content: notice.content,
        priority: priorityMap[notice.priority],
        published: true,
        expiresAt: notice.expiresAt ? new Date(notice.expiresAt) : null,
        authorId: admin.id,
      },
    });
  }
  console.log(`  ${noticeData.length} notices created`);

  // ── Pages ──
  console.log("Creating pages...");
  for (const page of pageData) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        content: page.content,
        description: page.description,
        published: true,
        authorId: admin.id,
      },
      create: {
        title: page.title,
        slug: page.slug,
        content: page.content,
        description: page.description,
        published: true,
        authorId: admin.id,
      },
    });
  }
  console.log(`  ${pageData.length} pages created`);

  // ── Gallery Images ──
  console.log("Creating gallery images...");
  for (const img of galleryData) {
    await prisma.galleryImage.create({
      data: {
        title: img.title,
        description: img.description,
        imageUrl: img.imageUrl,
        category: img.category,
        tags: [...img.tags],
        published: true,
        sortOrder: img.sortOrder,
      },
    });
  }
  console.log(`  ${galleryData.length} gallery images created`);

  // ── Site Settings ──
  console.log("Creating site settings...");
  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, type: setting.type },
      create: { key: setting.key, value: setting.value, type: setting.type },
    });
  }
  console.log(`  ${siteSettings.length} settings created`);

  console.log("\nDatabase seeded successfully!");
  console.log(`Admin login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
