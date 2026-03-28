"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { EventItem } from "./page";

interface Props {
  upcoming: EventItem[];
  past: EventItem[];
}

function EventCard({ event, isPast }: { event: EventItem; isPast?: boolean }) {
  const date = new Date(event.eventDate);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
  const year = date.getFullYear();

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block hover-lift premium-card overflow-hidden h-full"
    >
      <div className="flex h-full">
        {/* Date column */}
        <div
          className={`flex-shrink-0 w-20 flex flex-col items-center justify-center py-6 ${
            isPast
              ? "bg-gray-500 text-white"
              : "bg-[#003B7C] text-white"
          }`}
        >
          <span className="text-3xl font-bold leading-none">{day}</span>
          <span className="text-xs font-semibold tracking-widest mt-1 opacity-80">{month}</span>
          <span className="text-xs opacity-60 mt-0.5">{year}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <h3
            className={`font-serif text-base font-bold mb-2 leading-snug group-hover:text-[#003B7C] transition-colors ${
              isPast ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
            {event.description}
          </p>
          {event.venue && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <svg
                className="w-3.5 h-3.5 text-[#E67E22] flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{event.venue}</span>
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 flex items-center pr-4">
          <svg
            className="w-4 h-4 text-muted-foreground/40 group-hover:text-[#E67E22] group-hover:translate-x-1 transition-all"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="col-span-full py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

const TABS = [
  { key: "upcoming", label: "Upcoming Events" },
  { key: "past", label: "Past Events" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function EventsTabs({ upcoming, past }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const events = activeTab === "upcoming" ? upcoming : past;

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-muted rounded-xl w-fit mb-10">
        {TABS.map((tab) => {
          const count = tab.key === "upcoming" ? upcoming.length : past.length;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 bg-[#003B7C] rounded-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {tab.label}
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-border text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Section label */}
      <div className="mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
          {activeTab === "upcoming" ? "Upcoming Events" : "Past Events"}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {activeTab === "upcoming"
            ? "Events and activities coming up soon — mark your calendar"
            : "A look back at our events and campus activities"}
        </p>
      </div>

      {/* Animated event list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="grid md:grid-cols-2 gap-4"
        >
          {events.length === 0 ? (
            <EmptyState
              label={
                activeTab === "upcoming"
                  ? "No upcoming events at this time. Check back soon!"
                  : "No past events recorded yet."
              }
            />
          ) : (
            events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <EventCard event={event} isPast={activeTab === "past"} />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
