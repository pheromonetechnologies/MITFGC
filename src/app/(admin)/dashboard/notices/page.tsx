import Link from "next/link";
import { getNotices } from "@/lib/actions/notices";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { NoticesTable } from "./notices-table";

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const result = await getNotices(page);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notices</h1>
        <Link href="/dashboard/notices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Notice
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          {result.success && result.data ? (
            <NoticesTable notices={result.data} pagination={result.pagination!} />
          ) : (
            <p className="text-sm text-gray-500">Failed to load notices.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
