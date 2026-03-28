"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { settingSchema } from "@/lib/validations";

export async function getSettings() {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const settings = await db.siteSetting.findMany({ orderBy: { key: "asc" } });
  return { success: true, data: settings };
}

export async function updateSetting(id: string, data: unknown) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  const parsed = settingSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.siteSetting.update({ where: { id }, data: parsed.data });
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: e instanceof Error ? e.message : "Failed to update setting" };
  }
}
