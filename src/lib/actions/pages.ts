"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pageSchema } from "@/lib/validations";

export async function getPages() {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const pages = await db.page.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return { success: true, data: pages };
}

export async function getPage(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const page = await db.page.findUnique({ where: { id } });
  if (!page) return { success: false, error: "Page not found" };

  return { success: true, data: page };
}

export async function createPage(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = pageSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.page.create({
      data: { ...parsed.data, authorId: session.user.id },
    });
    revalidatePath("/dashboard/pages");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create page";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function updatePage(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = pageSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.page.update({ where: { id }, data: parsed.data });
    revalidatePath("/dashboard/pages");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update page";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function deletePage(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.page.delete({ where: { id } });
    revalidatePath("/dashboard/pages");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete page" };
  }
}
