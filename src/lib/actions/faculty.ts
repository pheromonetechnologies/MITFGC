"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { facultySchema } from "@/lib/validations";

const ITEMS_PER_PAGE = 10;

export async function getFaculty(page = 1, search = "") {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {};

  const [faculty, total] = await Promise.all([
    db.faculty.findMany({
      where,
      include: { department: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.faculty.count({ where }),
  ]);

  return {
    success: true,
    data: faculty,
    pagination: { page, totalPages: Math.ceil(total / ITEMS_PER_PAGE), total },
  };
}

export async function getFacultyMember(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const member = await db.faculty.findUnique({ where: { id } });
  if (!member) return { success: false, error: "Faculty member not found" };

  return { success: true, data: member };
}

export async function createFaculty(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = facultySchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    const { email, ...rest } = parsed.data;
    await db.faculty.create({ data: { ...rest, email: email || null } });
    revalidatePath("/dashboard/faculty");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create faculty";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function updateFaculty(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = facultySchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    const { email, ...rest } = parsed.data;
    await db.faculty.update({ where: { id }, data: { ...rest, email: email || null } });
    revalidatePath("/dashboard/faculty");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update faculty";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function deleteFaculty(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.faculty.delete({ where: { id } });
    revalidatePath("/dashboard/faculty");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete faculty member" };
  }
}
