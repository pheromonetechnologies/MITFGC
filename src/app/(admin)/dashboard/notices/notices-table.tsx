"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNotice } from "@/lib/actions/notices";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

const priorityVariant: Record<string, "default" | "success" | "warning" | "destructive"> = {
  LOW: "default",
  NORMAL: "success",
  HIGH: "warning",
  URGENT: "destructive",
};

interface Notice {
  id: string;
  title: string;
  priority: string;
  published: boolean;
  createdAt: string | Date;
}

interface Props {
  notices: Notice[];
  pagination: { page: number; totalPages: number; total: number };
}

export function NoticesTable({ notices, pagination }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this notice?")) return;
    setLoading(id);
    await deleteNotice(id);
    setLoading(null);
    router.refresh();
  }

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "priority",
      label: "Priority",
      render: (n: Notice) => (
        <Badge variant={priorityVariant[n.priority] || "default"}>
          {n.priority}
        </Badge>
      ),
    },
    {
      key: "published",
      label: "Status",
      render: (n: Notice) => (
        <Badge variant={n.published ? "success" : "warning"}>
          {n.published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (n: Notice) => formatDate(n.createdAt),
    },
    {
      key: "actions",
      label: "Actions",
      render: (n: Notice) => (
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/notices/${n.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(n.id)}
            disabled={loading === n.id}
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
      data={notices}
      page={pagination.page}
      totalPages={pagination.totalPages}
      onPageChange={(p) => router.push(`/dashboard/notices?page=${p}`)}
      emptyMessage="No notices found."
    />
  );
}
