import Link from "next/link";
import { getCourses } from "@/lib/actions/courses";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { CoursesTable } from "./courses-table";

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search || "";

  const result = await getCourses(page, search);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link href="/dashboard/courses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent>
          {result.success && result.data ? (
            <CoursesTable
              courses={result.data}
              pagination={result.pagination!}
            />
          ) : (
            <p className="text-sm text-gray-500">Failed to load courses.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
