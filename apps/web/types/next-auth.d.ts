import { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "@repo/db";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}