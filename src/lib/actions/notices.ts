"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { noticeSchema } from "@/lib/validations";

const ITEMS_PER_PAGE = 10;

export async function getNotices(page = 1, search = "") {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const where = search
    ? { title: { contains: search, mode: "insensitive" as const } }
    : {};

  const [notices, total] = await Promise.all([
    db.notice.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.notice.count({ where }),
  ]);

  return {
    success: true,
    data: notices,
    pagination: { page, totalPages: Math.ceil(total / ITEMS_PER_PAGE), total },
  };
}

export async function createNotice(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = noticeSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.notice.create({
      data: { ...parsed.data, authorId: session.user.id },
    });
    revalidatePath("/dashboard/notices");
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to create notice" };
  }
}

export async function updateNotice(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = noticeSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.notice.update({ where: { id }, data: parsed.data });
    revalidatePath("/dashboard/notices");
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to update notice" };
  }
}

export async function deleteNotice(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.notice.delete({ where: { id } });
    revalidatePath("/dashboard/notices");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete notice" };
  }
}
