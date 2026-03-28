import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { updatePage } from "@/lib/actions/pages";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default async function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await db.page.findUnique({ where: { id } });
  if (!page) notFound();

  async function handleUpdate(fd: FormData) {
    "use server";
    await updatePage(id, fd);
  }

  return (
    <div>
      <Link href="/dashboard/pages" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Pages
      </Link>
      <Card>
        <CardHeader><h1 className="text-xl font-bold">Edit: {page.title}</h1></CardHeader>
        <CardContent>
          <form action={handleUpdate} className="space-y-4">
            <Input id="title" name="title" label="Title" defaultValue={page.title} required />
            <Input id="slug" name="slug" label="Slug" defaultValue={page.slug} required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Content (HTML)</label>
              <textarea name="content" rows={12} defaultValue={page.content} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
            </div>
            <Input id="description" name="description" label="Meta Description" defaultValue={page.description || ""} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="true" defaultChecked={page.published} className="rounded" /> Published
            </label>
            <Button type="submit"><Save className="w-4 h-4" /> Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
