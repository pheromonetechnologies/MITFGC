"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createPage } from "@/lib/actions/pages";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewPagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await createPage(fd);
    if (result?.error) { setError(result.error); setLoading(false); }
    else router.push("/dashboard/pages");
  }

  return (
    <div>
      <Link href="/dashboard/pages" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Pages
      </Link>
      <Card>
        <CardHeader><h1 className="text-xl font-bold">Create New Page</h1></CardHeader>
        <CardContent>
          {error && <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="title" name="title" label="Title" required />
            <Input id="slug" name="slug" label="Slug" placeholder="e.g. about-us" required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Content (HTML)</label>
              <textarea name="content" rows={12} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
            </div>
            <Input id="description" name="description" label="Meta Description" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="published" value="true" className="rounded" /> Published
            </label>
            <Button type="submit" loading={loading}><Save className="w-4 h-4" /> Create Page</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
