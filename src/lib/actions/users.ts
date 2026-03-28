"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userSchema, userUpdateSchema } from "@/lib/validations";
import { hash } from "bcryptjs";

export async function getUsers() {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN")
    return { success: false, error: "Unauthorized" };

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });

  return { success: true, data: users };
}

export async function createUser(data: unknown) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN")
    return { success: false, error: "Unauthorized" };

  const parsed = userSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    const passwordHash = await hash(parsed.data.password, 12);
    await db.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name,
        role: parsed.data.role,
        passwordHash,
      },
    });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create user";
    if (msg.includes("Unique")) return { success: false, error: "Email already exists" };
    return { success: false, error: msg };
  }
}

export async function updateUser(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN")
    return { success: false, error: "Unauthorized" };

  const parsed = userUpdateSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    const updateData: Record<string, unknown> = {
      email: parsed.data.email,
      name: parsed.data.name,
      role: parsed.data.role,
    };

    if (parsed.data.password && parsed.data.password.length > 0) {
      updateData.passwordHash = await hash(parsed.data.password, 12);
    }

    await db.user.update({ where: { id }, data: updateData });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update user";
    if (msg.includes("Unique")) return { success: false, error: "Email already exists" };
    return { success: false, error: msg };
  }
}

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN")
    return { success: false, error: "Unauthorized" };

  if (id === session.user.id)
    return { success: false, error: "Cannot delete your own account" };

  try {
    await db.user.delete({ where: { id } });
    revalidatePath("/dashboard/users");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete user" };
  }
}
