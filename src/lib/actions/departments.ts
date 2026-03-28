"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { departmentSchema } from "@/lib/validations";

export async function getDepartments() {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const departments = await db.department.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { courses: true, faculty: true } } },
  });

  return { success: true, data: departments };
}

export async function createDepartment(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = departmentSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    const { email, ...rest } = parsed.data;
    await db.department.create({ data: { ...rest, email: email || null } });
    revalidatePath("/dashboard/departments");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create department";
    if (msg.includes("Unique")) return { success: false, error: "Name or slug already exists" };
    return { success: false, error: msg };
  }
}

export async function updateDepartment(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = departmentSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    const { email, ...rest } = parsed.data;
    await db.department.update({ where: { id }, data: { ...rest, email: email || null } });
    revalidatePath("/dashboard/departments");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update department";
    if (msg.includes("Unique")) return { success: false, error: "Name or slug already exists" };
    return { success: false, error: msg };
  }
}

export async function deleteDepartment(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.department.delete({ where: { id } });
    revalidatePath("/dashboard/departments");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete department. It may have linked courses or faculty." };
  }
}
