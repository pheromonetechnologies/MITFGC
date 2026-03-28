"use client";

import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { submitContactForm } from "./actions";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClass =
  "w-full px-4 py-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#003B7C]/40 focus:border-[#003B7C] transition-colors placeholder:text-muted-foreground/50";
const inputErrorClass =
  "border-red-400 focus:ring-red-300/40 focus:border-red-400";
const inputNormalClass = "border-border";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("email", data.email);
    if (data.phone) fd.append("phone", data.phone);
    fd.append("subject", data.subject);
    fd.append("message", data.message);

    await (formAction as (fd: FormData) => Promise<void>)(fd);
    if (state.success) reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your full name"
            {...register("name")}
            className={`${inputClass} ${errors.name ? inputErrorClass : inputNormalClass}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className={`${inputClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone + Subject */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-1.5">
            Phone{" "}
            <span className="text-muted-foreground font-normal text-xs">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className={`${inputClass} ${errors.phone ? inputErrorClass : inputNormalClass}`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            placeholder="What is this about?"
            {...register("subject")}
            className={`${inputClass} ${errors.subject ? inputErrorClass : inputNormalClass}`}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Write your message here..."
          {...register("message")}
          className={`${inputClass} resize-none ${errors.message ? inputErrorClass : inputNormalClass}`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Server response */}
      <AnimatePresence>
        {state.message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`flex items-start gap-3 p-4 rounded-lg text-sm border ${
              state.success
                ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {state.success ? (
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{state.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-muted-foreground">
          Fields marked <span className="text-red-500">*</span> are required
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#E67E22] hover:bg-[#d4701e] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isPending ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              Send Message
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
