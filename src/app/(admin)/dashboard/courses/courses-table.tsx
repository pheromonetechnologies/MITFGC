"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCourse, togglePublish } from "@/lib/actions/courses";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  duration: string;
  published: boolean;
  department: { name: string };
}

interface Props {
  courses: Course[];
  pagination: { page: number; totalPages: number; total: number };
}

export function CoursesTable({ courses, pagination }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this course?")) return;
    setLoading(id);
    await deleteCourse(id);
    setLoading(null);
    router.refresh();
  }

  async function handleToggle(id: string) {
    setLoading(id);
    await togglePublish(id);
    setLoading(null);
    router.refresh();
  }

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "department",
      label: "Department",
      render: (c: Course) => c.department.name,
    },
    { key: "duration", label: "Duration" },
    {
      key: "published",
      label: "Status",
      render: (c: Course) => (
        <Badge variant={c.published ? "success" : "warning"}>
          {c.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (c: Course) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggle(c.id)}
            disabled={loading === c.id}
          >
            {c.published ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Link href={`/dashboard/courses/${c.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(c.id)}
            disabled={loading === c.id}
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
      data={courses}
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={(p) => router.push(`/dashboard/courses?page=${p}`)}
      emptyMessage="No courses found."
    />
  );
}
