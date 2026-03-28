import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
    } & DefaultSession["user"];
  }

  interface User {
    role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";
  }
}
