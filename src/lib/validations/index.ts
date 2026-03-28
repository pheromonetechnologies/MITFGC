import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  duration: z.string().min(1, "Duration is required"),
  intake: z.coerce.number().int().positive().optional().nullable(),
  description: z.string().min(1, "Description is required"),
  eligibility: z.string().optional().nullable(),
  fees: z.string().optional().nullable(),
  departmentId: z.string().min(1, "Department is required"),
  published: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
});

export const facultySchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email().optional().nullable().or(z.literal("")),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  qualifications: z.string().optional().nullable(),
  specialization: z.string().optional().nullable(),
  experience: z.string().optional().nullable(),
  departmentId: z.string().min(1, "Department is required"),
  published: z.boolean().default(true),
});

export const departmentSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().optional().nullable(),
  hod: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal("")),
  published: z.boolean().default(true),
});

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().min(1, "Description is required"),
  venue: z.string().optional().nullable(),
  eventDate: z.coerce.date({ error: "Event date is required" }),
  endDate: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  attachment: z.string().optional().nullable(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  published: z.boolean().default(false),
  expiresAt: z.coerce.date().optional().nullable(),
});

export const gallerySchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url("Valid image URL is required"),
  category: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export const pageSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  content: z.string().min(1, "Content is required"),
  description: z.string().optional().nullable(),
  published: z.boolean().default(false),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().nullable(),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export const settingSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string(),
  type: z.string().default("text"),
});

export const userSchema = z.object({
  email: z.string().email("Valid email is required"),
  name: z.string().min(1, "Name is required").max(100),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"]).default("VIEWER"),
});

export const userUpdateSchema = userSchema.omit({ password: true }).extend({
  password: z.string().min(8).optional().or(z.literal("")),
});

export type CourseInput = z.input<typeof courseSchema>;
export type FacultyInput = z.input<typeof facultySchema>;
export type DepartmentInput = z.input<typeof departmentSchema>;
export type EventInput = z.input<typeof eventSchema>;
export type NoticeInput = z.input<typeof noticeSchema>;
export type GalleryInput = z.input<typeof gallerySchema>;
export type PageInput = z.input<typeof pageSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type SettingInput = z.input<typeof settingSchema>;
export type UserInput = z.input<typeof userSchema>;
