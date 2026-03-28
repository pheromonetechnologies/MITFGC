import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import { deletePage } from "@/lib/actions/pages";

export default async function PagesAdmin() {
  let pages: { id: string; title: string; slug: string; published: boolean; updatedAt: Date }[] = [];
  try {
    pages = await db.page.findMany({ orderBy: { updatedAt: "desc" }, select: { id: true, title: true, slug: true, published: true, updatedAt: true } });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link href="/dashboard/pages/new">
          <Button><Plus className="w-4 h-4" /> New Page</Button>
        </Link>
      </div>
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold">Title</th>
            <th className="text-left px-4 py-3 font-semibold">Slug</th>
            <th className="text-left px-4 py-3 font-semibold">Status</th>
            <th className="text-left px-4 py-3 font-semibold">Actions</th>
          </tr></thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{page.title}</td>
                <td className="px-4 py-3 text-muted-foreground">/{page.slug}</td>
                <td className="px-4 py-3">
                  <Badge variant={page.published ? "success" : "outline"}>
                    {page.published ? "Published" : "Draft"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link href={`/${page.slug}`} target="_blank"><Button variant="ghost" size="icon"><Globe className="w-4 h-4" /></Button></Link>
                    <Link href={`/dashboard/pages/${page.id}/edit`}><Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button></Link>
                    <form action={async () => { "use server"; await deletePage(page.id); }}><Button variant="ghost" size="icon" type="submit"><Trash2 className="w-4 h-4 text-destructive" /></Button></form>
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">No pages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
