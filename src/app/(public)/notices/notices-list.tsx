"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { NoticeItem } from "./page";

interface Props {
  notices: NoticeItem[];
}

type Priority = "ALL" | "URGENT" | "HIGH" | "NORMAL" | "LOW";

const PRIORITY_CONFIG: Record<
  string,
  {
    label: string;
    pillClass: string;
    activePillClass: string;
    badgeClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  URGENT: {
    label: "Urgent",
    pillClass: "border-red-200 text-red-600 hover:bg-red-50",
    activePillClass: "bg-red-600 border-red-600 text-white",
    badgeClass: "bg-red-100 text-red-700 border border-red-200",
    borderClass: "border-l-red-500",
    dotClass: "bg-red-500",
  },
  HIGH: {
    label: "High",
    pillClass: "border-orange-200 text-orange-600 hover:bg-orange-50",
    activePillClass: "bg-orange-500 border-orange-500 text-white",
    badgeClass: "bg-orange-100 text-orange-700 border border-orange-200",
    borderClass: "border-l-[#E67E22]",
    dotClass: "bg-orange-500",
  },
  NORMAL: {
    label: "Normal",
    pillClass: "border-blue-200 text-blue-600 hover:bg-blue-50",
    activePillClass: "bg-[#003B7C] border-[#003B7C] text-white",
    badgeClass: "bg-blue-100 text-blue-700 border border-blue-200",
    borderClass: "border-l-[#003B7C]",
    dotClass: "bg-blue-500",
  },
  LOW: {
    label: "Low",
    pillClass: "border-gray-200 text-gray-500 hover:bg-gray-50",
    activePillClass: "bg-gray-500 border-gray-500 text-white",
    badgeClass: "bg-gray-100 text-gray-600 border border-gray-200",
    borderClass: "border-l-gray-400",
    dotClass: "bg-gray-400",
  },
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function NoticesList({ notices }: Props) {
  const [filter, setFilter] = useState<Priority>("ALL");

  const filtered =
    filter === "ALL" ? notices : notices.filter((n) => n.priority === filter);

  const priorities: Priority[] = ["ALL", "URGENT", "HIGH", "NORMAL", "LOW"];
  const priorityCounts: Record<Priority, number> = {
    ALL: notices.length,
    URGENT: notices.filter((n) => n.priority === "URGENT").length,
    HIGH: notices.filter((n) => n.priority === "HIGH").length,
    NORMAL: notices.filter((n) => n.priority === "NORMAL").length,
    LOW: notices.filter((n) => n.priority === "LOW").length,
  };

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {priorities.map((p) => {
          const isActive = filter === p;
          const config = p !== "ALL" ? PRIORITY_CONFIG[p] : null;
          return (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                p === "ALL"
                  ? isActive
                    ? "bg-[#003B7C] border-[#003B7C] text-white"
                    : "border-border text-muted-foreground hover:bg-muted"
                  : isActive
                  ? config!.activePillClass
                  : config!.pillClass
              }`}
            >
              {config && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-white" : config.dotClass
                  }`}
                />
              )}
              {p === "ALL" ? "All Notices" : config!.label}
              <span
                className={`ml-0.5 text-xs font-bold ${
                  isActive ? "opacity-80" : "opacity-60"
                }`}
              >
                ({priorityCounts[p]})
              </span>
            </button>
          );
        })}
      </div>

      {/* Result count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "notice" : "notices"}
        {filter !== "ALL" && (
          <>
            {" "}with{" "}
            <span className="font-semibold text-foreground capitalize">
              {PRIORITY_CONFIG[filter].label}
            </span>{" "}
            priority
          </>
        )}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground font-medium">
                No notices found for this priority.
              </p>
            </div>
          ) : (
            filtered.map((notice, i) => {
              const config = PRIORITY_CONFIG[notice.priority];
              return (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className={`rounded-xl border-l-4 border border-border bg-card p-5 hover:shadow-md transition-shadow ${config.borderClass}`}
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${config.badgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(notice.createdAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground mb-1.5 leading-snug">
                    {notice.title}
                  </h3>

                  {/* Content */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {notice.content}
                  </p>

                  {/* Attachment */}
                  {notice.attachment && (
                    <a
                      href={notice.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 text-sm text-[#003B7C] font-semibold hover:text-[#E67E22] transition-colors"
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
                </motion.div>
              );
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
