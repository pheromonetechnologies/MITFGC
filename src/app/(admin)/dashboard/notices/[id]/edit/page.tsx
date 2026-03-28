import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { NoticeForm } from "../../notice-form";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await db.notice.findUnique({ where: { id } });
  if (!notice) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Notice</h1>
      <NoticeForm
        initialData={{
          id: notice.id,
          title: notice.title,
          content: notice.content,
          attachment: notice.attachment,
          priority: notice.priority,
          published: notice.published,
          expiresAt: notice.expiresAt,
        }}
      />
    </div>
  );
}
