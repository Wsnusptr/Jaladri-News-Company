"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">
          Halo, {session.user.name}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
      Login
    </Link>
  );
}