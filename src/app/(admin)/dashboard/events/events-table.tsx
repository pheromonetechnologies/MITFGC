"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteEvent } from "@/lib/actions/events";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

interface Event {
  id: string;
  title: string;
  eventDate: string | Date;
  venue: string | null;
  published: boolean;
  featured: boolean;
}

interface Props {
  events: Event[];
  pagination: { page: number; totalPages: number; total: number };
}

export function EventsTable({ events, pagination }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    setLoading(id);
    await deleteEvent(id);
    setLoading(null);
    router.refresh();
  }

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "eventDate",
      label: "Date",
      render: (e: Event) => formatDate(e.eventDate),
    },
    { key: "venue", label: "Venue", render: (e: Event) => e.venue || "-" },
    {
      key: "published",
      label: "Status",
      render: (e: Event) => (
        <Badge variant={e.published ? "success" : "warning"}>
          {e.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (e: Event) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/events/${e.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(e.id)}
            disabled={loading === e.id}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={events}
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={(p) => router.push(`/dashboard/events?page=${p}`)}
      emptyMessage="No events found."
    />
  );
}
