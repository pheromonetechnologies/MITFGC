import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { markResponded, deleteInquiry } from "@/lib/actions/inquiries";
import { formatDate } from "@/lib/utils";
import { Trash2, CheckCircle, MessageSquare, Mail } from "lucide-react";

export default async function InquiriesPage() {
  let submissions: { id: string; name: string; email: string; phone: string | null; subject: string; message: string; responded: boolean; createdAt: Date }[] = [];
  try {
    submissions = await db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  const pending = submissions.filter((s) => !s.responded).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Contact Inquiries</h1>
          {pending > 0 && <Badge variant="warning">{pending} pending</Badge>}
        </div>
      </div>

      <div className="space-y-3">
        {submissions.map((sub) => (
          <div key={sub.id} className={`rounded-lg border p-4 ${sub.responded ? "border-border bg-muted/30" : "border-accent/30 bg-accent/5"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{sub.name}</span>
                  <Badge variant={sub.responded ? "success" : "warning"}>
                    {sub.responded ? "Responded" : "Pending"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{sub.email}</span>
                  {sub.phone && <span>{sub.phone}</span>}
                  <span>{formatDate(sub.createdAt)}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{sub.subject}</p>
                <p className="text-sm text-muted-foreground">{sub.message}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {!sub.responded && (
                  <form action={async () => { "use server"; await markResponded(sub.id); }}>
                    <Button variant="ghost" size="icon" type="submit" title="Mark responded">
                      <CheckCircle className="w-4 h-4 text-secondary" />
                    </Button>
                  </form>
                )}
                <form action={async () => { "use server"; await deleteInquiry(sub.id); }}>
                  <Button variant="ghost" size="icon" type="submit" title="Delete">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {submissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No contact submissions yet.</div>
        )}
      </div>
    </div>
  );
}
