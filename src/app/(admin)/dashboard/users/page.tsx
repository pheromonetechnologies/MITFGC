import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createUser, deleteUser } from "@/lib/actions/users";
import { Trash2, UserPlus, Shield } from "lucide-react";

const roleBadgeVariant = {
  SUPER_ADMIN: "destructive" as const,
  ADMIN: "default" as const,
  EDITOR: "secondary" as const,
  VIEWER: "outline" as const,
};

export default async function UsersPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") redirect("/dashboard");

  let users: { id: string; email: string; name: string | null; role: string; createdAt: Date }[] = [];
  try {
    users = await db.user.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, email: true, name: true, role: true, createdAt: true } });
  } catch {}

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <Card className="mb-6">
        <CardHeader><h2 className="text-lg font-semibold">Add New User</h2></CardHeader>
        <CardContent>
          <form action={async (fd: FormData) => { "use server"; await createUser({ name: fd.get("name"), email: fd.get("email"), password: fd.get("password"), role: fd.get("role") }); }} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <Input id="name" name="name" label="Name" placeholder="Full name" required />
            <Input id="email" name="email" label="Email" type="email" placeholder="user@mitfgc.in" required />
            <Input id="password" name="password" label="Password" type="password" required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium">Role</label>
              <select name="role" className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm">
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
            <Button type="submit"><UserPlus className="w-4 h-4" /> Add</Button>
          </form>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold">Name</th>
            <th className="text-left px-4 py-3 font-semibold">Email</th>
            <th className="text-left px-4 py-3 font-semibold">Role</th>
            <th className="text-left px-4 py-3 font-semibold">Actions</th>
          </tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium">{user.name || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={roleBadgeVariant[user.role as keyof typeof roleBadgeVariant] || "outline"}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {user.role !== "SUPER_ADMIN" && (
                    <form action={async () => { "use server"; await deleteUser(user.id); }}>
                      <Button variant="ghost" size="icon" type="submit"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
