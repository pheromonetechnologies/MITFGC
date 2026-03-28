import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { EventForm } from "../../event-form";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await db.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Event</h1>
      <EventForm
        initialData={{
          id: event.id,
          title: event.title,
          slug: event.slug,
          description: event.description,
          venue: event.venue,
          eventDate: event.eventDate,
          endDate: event.endDate,
          image: event.image,
          published: event.published,
          featured: event.featured,
        }}
      />
    </div>
  );
}
