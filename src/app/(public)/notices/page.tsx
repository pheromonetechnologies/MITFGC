import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notices - MIT First Grade College",
  description:
    "Important notices, circulars, and announcements from MIT First Grade College, Mysuru.",
};

interface NoticeItem {
  id: string;
  title: string;
  content: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  attachment: string | null;
  createdAt: Date;
}

const staticNotices: NoticeItem[] = [
  {
    id: "1",
    title: "Admissions Open for 2026-27 Academic Year",
    content:
      "Applications are invited for BCA, BBA, B.COM, and M.COM programs for the academic year 2026-27. Limited seats available. Apply before the deadline to secure your admission.",
    priority: "URGENT",
    attachment: null,
    createdAt: new Date("2026-03-01"),
  },
  {
    id: "2",
    title: "Last Date for Fee Payment - April 15, 2026",
    content:
      "All students are reminded that the last date for paying semester fees is April 15, 2026. Late fee will be applicable after the deadline. Contact the accounts section for details.",
    priority: "HIGH",
    attachment: null,
    createdAt: new Date("2026-03-15"),
  },
  {
    id: "3",
    title: "Internal Assessment Schedule Released",
    content:
      "The internal assessment schedule for the current semester has been released. Students can collect their timetable from their respective departments. Examinations begin from April 1, 2026.",
    priority: "NORMAL",
    attachment: null,
    createdAt: new Date("2026-03-20"),
  },
  {
    id: "4",
    title: "Library Timings Extended During Exams",
    content:
      "The college library will remain open from 8:00 AM to 8:00 PM during the examination period. Students are encouraged to make use of the extended hours for preparation.",
    priority: "LOW",
    attachment: null,
    createdAt: new Date("2026-03-25"),
  },
];

const priorityConfig: Record<string, { label: string; className: string }> = {
  URGENT: { label: "Urgent", className: "bg-red-100 text-red-700" },
  HIGH: { label: "High", className: "bg-orange-100 text-orange-700" },
  NORMAL: { label: "Normal", className: "bg-blue-100 text-blue-700" },
  LOW: { label: "Low", className: "bg-gray-100 text-gray-600" },
};

async function getNotices(): Promise<NoticeItem[] | null> {
  try {
    const notices = await db.notice.findMany({
      where: { published: true },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        content: true,
        priority: true,
        attachment: true,
        createdAt: true,
      },
    });
    return notices.length > 0 ? notices : null;
  } catch {
    return null;
  }
}

export default async function NoticesPage() {
  const notices = (await getNotices()) ?? staticNotices;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Notices</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Important announcements, circulars, and updates from the college
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {notices.map((notice, i) => {
              const config = priorityConfig[notice.priority] ?? priorityConfig.NORMAL;
              return (
                <ScrollReveal key={notice.id} delay={i * 0.05}>
                  <div
                    className={`rounded-xl border bg-card p-6 transition-shadow hover:shadow-md ${
                      notice.priority === "URGENT"
                        ? "border-red-200 bg-red-50/30"
                        : "border-border"
                    }`}
                  >
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatDate(notice.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notice.content}
                    </p>
                    {notice.attachment && (
                      <a
                        href={notice.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-sm text-primary font-semibold hover:underline"
                      >
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
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                        Download Attachment
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {notices.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No notices available at this time.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
