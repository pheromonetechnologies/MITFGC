"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const ITEMS_PER_PAGE = 10;

export async function getInquiries(page = 1) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const [inquiries, total] = await Promise.all([
    db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.contactSubmission.count(),
  ]);

  return {
    success: true,
    data: inquiries,
    pagination: { page, totalPages: Math.ceil(total / ITEMS_PER_PAGE), total },
  };
}

export async function markResponded(id: string) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  try {
    const inquiry = await db.contactSubmission.findUnique({ where: { id } });
    if (!inquiry) return { success: false, error: "Inquiry not found" };

    await db.contactSubmission.update({
      where: { id },
      data: { responded: !inquiry.responded },
    });
    revalidatePath("/dashboard/inquiries");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update inquiry" };
  }
}

export async function deleteInquiry(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.contactSubmission.delete({ where: { id } });
    revalidatePath("/dashboard/inquiries");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete inquiry" };
  }
}
