"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { courseSchema } from "@/lib/validations";

const ITEMS_PER_PAGE = 10;

export async function getCourses(page = 1, search = "") {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const where = search
    ? { title: { contains: search, mode: "insensitive" as const } }
    : {};

  const [courses, total] = await Promise.all([
    db.course.findMany({
      where,
      include: { department: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.course.count({ where }),
  ]);

  return {
    success: true,
    data: courses,
    pagination: { page, totalPages: Math.ceil(total / ITEMS_PER_PAGE), total },
  };
}

export async function getCourse(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const course = await db.course.findUnique({ where: { id } });
  if (!course) return { success: false, error: "Course not found" };

  return { success: true, data: course };
}

export async function createCourse(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = courseSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.course.create({ data: parsed.data });
    revalidatePath("/dashboard/courses");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create course";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function updateCourse(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = courseSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.course.update({ where: { id }, data: parsed.data });
    revalidatePath("/dashboard/courses");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update course";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function deleteCourse(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.course.delete({ where: { id } });
    revalidatePath("/dashboard/courses");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete course" };
  }
}

export async function togglePublish(id: string) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  try {
    const course = await db.course.findUnique({ where: { id } });
    if (!course) return { success: false, error: "Course not found" };

    await db.course.update({
      where: { id },
      data: { published: !course.published },
    });
    revalidatePath("/dashboard/courses");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to toggle publish" };
  }
}
