"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface TopbarProps {
  user: { name?: string | null; email?: string | null; role: string };
}

export function AdminTopbar({ user }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 pl-16 lg:pl-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user.name || user.email}
          <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
            {user.role}
          </span>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
