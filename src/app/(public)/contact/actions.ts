"use server";

import { db } from "@/lib/db";

interface FormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || null;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  try {
    await db.contactSubmission.create({
      data: { name, email, phone, subject, message },
    });

    return {
      success: true,
      message:
        "Thank you for your message! We will get back to you within 24-48 hours.",
    };
  } catch {
    return {
      success: false,
      message:
        "Something went wrong. Please try again later or contact us directly at info@mitfgc.in.",
    };
  }
}
