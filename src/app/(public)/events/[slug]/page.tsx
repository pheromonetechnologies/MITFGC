import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getEvent(slug: string) {
  try {
    return await db.event.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event Not Found" };

  return {
    title: `${event.title} - Events - MIT First Grade College`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.eventDate) < new Date();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />
        <div className="container mx-auto max-w-4xl relative">
          <ScrollReveal>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Events
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Badge className="bg-white/20 text-white border-0">
                {formatDate(event.eventDate)}
              </Badge>
              {event.endDate && (
                <Badge className="bg-white/20 text-white border-0">
                  to {formatDate(event.endDate)}
                </Badge>
              )}
              {event.venue && (
                <Badge className="bg-white/20 text-white border-0">
                  {event.venue}
                </Badge>
              )}
              {isPast && (
                <Badge className="bg-white/30 text-white border-0">
                  Past Event
                </Badge>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {event.image && (
            <ScrollReveal className="mb-10">
              <img
                src={event.image}
                alt={event.title}
                className="w-full rounded-xl object-cover max-h-96"
              />
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="prose max-w-none text-foreground/80 leading-relaxed">
              {event.description.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-12">
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Date</div>
                <div className="text-foreground font-medium">{formatDate(event.eventDate)}</div>
              </div>
              {event.venue && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Venue</div>
                  <div className="text-foreground font-medium">{event.venue}</div>
                </div>
              )}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">Status</div>
                <div className={`font-medium ${isPast ? "text-muted-foreground" : "text-secondary"}`}>
                  {isPast ? "Completed" : "Upcoming"}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
