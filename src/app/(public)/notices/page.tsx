import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { NoticesList } from "./notices-list";

export const metadata: Metadata = {
  title: "Notices - MIT First Grade College",
  description:
    "Important notices, circulars, and announcements from MIT First Grade College, Mysuru.",
};

export interface NoticeItem {
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

  const urgentCount = notices.filter((n) => n.priority === "URGENT").length;
  const highCount = notices.filter((n) => n.priority === "HIGH").length;
  const normalCount = notices.filter((n) => n.priority === "NORMAL").length;
  const lowCount = notices.filter((n) => n.priority === "LOW").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003B7C] via-[#004fa3] to-[#003B7C] text-white py-24 px-6">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#E67E22]/10 blur-3xl" />

        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
              Official Communications
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Notices &amp;{" "}
              <span className="text-[#E67E22]">Circulars</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Important announcements, circulars, and updates from the college administration
            </p>
          </ScrollReveal>

          {/* Priority counts */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {urgentCount > 0 && (
                <div className="flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-sm font-semibold text-red-200">{urgentCount} Urgent</span>
                </div>
              )}
              {highCount > 0 && (
                <div className="flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-sm font-semibold text-orange-200">{highCount} High</span>
                </div>
              )}
              {normalCount > 0 && (
                <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm font-semibold text-blue-200">{normalCount} Normal</span>
                </div>
              )}
              {lowCount > 0 && (
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/50" />
                  <span className="text-sm font-semibold text-white/70">{lowCount} Low</span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Notices list with filter */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <NoticesList notices={notices} />
        </div>
      </section>
    </div>
  );
}
