// apps/web/app/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Impor Image

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah.");
        return;
      }

      router.refresh(); // Refresh untuk memastikan header update
      router.push("/"); // Arahkan ke halaman utama setelah sukses
    } catch (error) {
      setError("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 space-y-6">
        <div className="p-10 border border-gray-300 rounded-lg bg-white">
          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              id="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-xs text-center text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? "Memproses..." : "Login"}
            </button>
          </form>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg text-center text-sm bg-white">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-blue-500">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}