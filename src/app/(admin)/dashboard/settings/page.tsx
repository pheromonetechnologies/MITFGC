import { db } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { updateSetting } from "@/lib/actions/settings";
import { Save, Settings } from "lucide-react";

export default async function SettingsPage() {
  let settings: { id: string; key: string; value: string; type: string }[] = [];
  try {
    settings = await db.siteSetting.findMany({ orderBy: { key: "asc" } });
  } catch {}

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Site Settings</h1>
      </div>
      <div className="space-y-3">
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardContent className="py-4">
              <form action={async (fd: FormData) => { "use server"; await updateSetting(setting.key, fd.get("value") as string); }} className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {setting.key.replace(/_/g, " ")}
                  </label>
                  {setting.value.length > 100 ? (
                    <textarea name="value" defaultValue={setting.value} rows={3} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  ) : (
                    <input name="value" defaultValue={setting.value} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  )}
                </div>
                <Button type="submit" size="sm"><Save className="w-3 h-3" /></Button>
              </form>
            </CardContent>
          </Card>
        ))}
        {settings.length === 0 && (
          <Card><CardContent className="py-8 text-center text-muted-foreground">No settings configured. Run the seed script first.</CardContent></Card>
        )}
      </div>
    </div>
  );
}
