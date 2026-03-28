"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { gallerySchema } from "@/lib/validations";

const ITEMS_PER_PAGE = 12;

export async function getGalleryImages(page = 1, category = "") {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const where = category ? { category } : {};

  const [images, total] = await Promise.all([
    db.galleryImage.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.galleryImage.count({ where }),
  ]);

  return {
    success: true,
    data: images,
    pagination: { page, totalPages: Math.ceil(total / ITEMS_PER_PAGE), total },
  };
}

export async function createGalleryImage(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = gallerySchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.galleryImage.create({ data: parsed.data });
    revalidatePath("/dashboard/gallery");
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to add image" };
  }
}

export async function updateGalleryImage(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = gallerySchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.galleryImage.update({ where: { id }, data: parsed.data });
    revalidatePath("/dashboard/gallery");
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to update image" };
  }
}

export async function deleteGalleryImage(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.galleryImage.delete({ where: { id } });
    revalidatePath("/dashboard/gallery");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete image" };
  }
}
