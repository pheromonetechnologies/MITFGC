import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { EventsTabs } from "./events-tabs";

export const metadata: Metadata = {
  title: "Events - MIT First Grade College",
  description:
    "Stay updated with the latest events, seminars, workshops, and activities at MIT First Grade College, Mysuru.",
};

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  venue: string | null;
  eventDate: Date;
  image: string | null;
}

const staticEvents: EventItem[] = [
  {
    id: "1",
    title: "Annual Sports Day 2026",
    slug: "annual-sports-day-2026",
    description:
      "Inter-collegiate sports competition featuring athletics, cricket, basketball, and indoor games. Students from various colleges participate in this annual sporting event.",
    venue: "College Ground",
    eventDate: new Date("2026-04-15"),
    image: null,
  },
  {
    id: "2",
    title: "National Level Seminar on Digital India",
    slug: "national-seminar-digital-india",
    description:
      "A two-day national level seminar on emerging technologies and digital transformation in India. Eminent speakers from academia and industry will share insights.",
    venue: "Seminar Hall",
    eventDate: new Date("2026-04-20"),
    image: null,
  },
  {
    id: "3",
    title: "Cultural Fest - Utsav 2026",
    slug: "cultural-fest-utsav-2026",
    description:
      "Annual cultural extravaganza featuring dance, music, drama, art, and literary competitions. A celebration of talent, creativity, and cultural diversity.",
    venue: "College Auditorium",
    eventDate: new Date("2026-05-01"),
    image: null,
  },
  {
    id: "4",
    title: "Career Guidance Workshop",
    slug: "career-guidance-workshop",
    description:
      "Workshop on career opportunities, resume building, interview skills, and higher education options for final year students.",
    venue: "Seminar Hall",
    eventDate: new Date("2026-02-10"),
    image: null,
  },
];

async function getEvents(): Promise<EventItem[] | null> {
  try {
    const events = await db.event.findMany({
      where: { published: true },
      orderBy: { eventDate: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        venue: true,
        eventDate: true,
        image: true,
      },
    });
    return events.length > 0 ? events : null;
  } catch {
    return null;
  }
}

export default async function EventsPage() {
  const events = (await getEvents()) ?? staticEvents;
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
  const past = events
    .filter((e) => new Date(e.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003B7C] via-[#004fa3] to-[#003B7C] text-white py-24 px-6">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#E67E22]/10 blur-3xl" />

        <div className="container mx-auto max-w-4xl text-center relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
              Campus Life &amp; Activities
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Events &amp;{" "}
              <span className="text-[#E67E22]">Activities</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Explore our vibrant campus life through seminars, workshops,
              cultural fests, and sporting events
            </p>
          </ScrollReveal>

          {/* Quick stats */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E67E22]">{upcoming.length}</div>
                <div className="text-sm text-white/70 mt-0.5">Upcoming Events</div>
              </div>
              <div className="w-px bg-white/20 self-stretch hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E67E22]">{past.length}</div>
                <div className="text-sm text-white/70 mt-0.5">Past Events</div>
              </div>
              <div className="w-px bg-white/20 self-stretch hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#E67E22]">{events.length}</div>
                <div className="text-sm text-white/70 mt-0.5">Total Events</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <EventsTabs upcoming={upcoming} past={past} />
        </div>
      </section>
    </div>
  );
}
