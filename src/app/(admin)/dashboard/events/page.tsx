import Link from "next/link";
import { getEvents } from "@/lib/actions/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { EventsTable } from "./events-table";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const result = await getEvents(page, params.search || "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/dashboard/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          {result.success && result.data ? (
            <EventsTable events={result.data} pagination={result.pagination!} />
          ) : (
            <p className="text-sm text-gray-500">Failed to load events.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
