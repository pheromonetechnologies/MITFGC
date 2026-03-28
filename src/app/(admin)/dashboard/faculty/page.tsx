import Link from "next/link";
import { getFaculty } from "@/lib/actions/faculty";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { FacultyTable } from "./faculty-table";

export default async function FacultyPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const result = await getFaculty(page, search);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Faculty</h1>
        <Link href="/dashboard/faculty/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          {result.success && result.data ? (
            <FacultyTable
              faculty={result.data}
              pagination={result.pagination!}
            />
          ) : (
            <p className="text-sm text-gray-500">Failed to load faculty.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
