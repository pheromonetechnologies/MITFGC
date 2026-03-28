"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { eventSchema } from "@/lib/validations";

const ITEMS_PER_PAGE = 10;

export async function getEvents(page = 1, search = "") {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const where = search
    ? { title: { contains: search, mode: "insensitive" as const } }
    : {};

  const [events, total] = await Promise.all([
    db.event.findMany({
      where,
      orderBy: { eventDate: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.event.count({ where }),
  ]);

  return {
    success: true,
    data: events,
    pagination: { page, totalPages: Math.ceil(total / ITEMS_PER_PAGE), total },
  };
}

export async function getEvent(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const event = await db.event.findUnique({ where: { id } });
  if (!event) return { success: false, error: "Event not found" };

  return { success: true, data: event };
}

export async function createEvent(data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = eventSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.event.create({
      data: { ...parsed.data, authorId: session.user.id },
    });
    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create event";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function updateEvent(id: string, data: unknown) {
  const session = await auth();
  if (!session || session.user.role === "VIEWER")
    return { success: false, error: "Unauthorized" };

  const parsed = eventSchema.safeParse(data);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };

  try {
    await db.event.update({ where: { id }, data: parsed.data });
    revalidatePath("/dashboard/events");
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update event";
    if (msg.includes("Unique")) return { success: false, error: "Slug already exists" };
    return { success: false, error: msg };
  }
}

export async function deleteEvent(id: string) {
  const session = await auth();
  if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role))
    return { success: false, error: "Unauthorized" };

  try {
    await db.event.delete({ where: { id } });
    revalidatePath("/dashboard/events");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete event" };
  }
}
