"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteFaculty } from "@/lib/actions/faculty";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  email: string | null;
  published: boolean;
  department: { name: string };
}

interface Props {
  faculty: FacultyMember[];
  pagination: { page: number; totalPages: number; total: number };
}

export function FacultyTable({ faculty, pagination }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this faculty member?")) return;
    setLoading(id);
    await deleteFaculty(id);
    setLoading(null);
    router.refresh();
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    {
      key: "department",
      label: "Department",
      render: (f: FacultyMember) => f.department.name,
    },
    {
      key: "published",
      label: "Status",
      render: (f: FacultyMember) => (
        <Badge variant={f.published ? "success" : "warning"}>
          {f.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (f: FacultyMember) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/faculty/${f.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(f.id)}
            disabled={loading === f.id}
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
      data={faculty}
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={(p) => router.push(`/dashboard/faculty?page=${p}`)}
      emptyMessage="No faculty members found."
    />
  );
}
