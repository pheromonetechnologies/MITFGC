import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  Bell,
  Mail,
  FileText,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return null;

  const [courses, faculty, events, notices, inquiries, pages] =
    await Promise.all([
      db.course.count(),
      db.faculty.count(),
      db.event.count(),
      db.notice.count(),
      db.contactSubmission.count({ where: { responded: false } }),
      db.page.count(),
    ]);

  const recentInquiries = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Total Courses", value: courses, icon: BookOpen, color: "text-blue-600 bg-blue-50" },
    { label: "Faculty Members", value: faculty, icon: Users, color: "text-green-600 bg-green-50" },
    { label: "Events", value: events, icon: Calendar, color: "text-purple-600 bg-purple-50" },
    { label: "Notices", value: notices, icon: Bell, color: "text-orange-600 bg-orange-50" },
    { label: "Pending Inquiries", value: inquiries, icon: Mail, color: "text-red-600 bg-red-50" },
    { label: "Pages", value: pages, icon: FileText, color: "text-teal-600 bg-teal-50" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent>
          <h2 className="mb-4 text-lg font-semibold">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-gray-500">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{inq.name}</p>
                    <p className="text-sm text-gray-500">{inq.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {formatDate(inq.createdAt)}
                    </p>
                    {!inq.responded && (
                      <span className="text-xs font-medium text-red-600">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
