"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, AlertCircle, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulasi API call untuk reset password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Jika berhasil, tampilkan pesan sukses
      setIsSubmitted(true);
    } catch (error: any) {
      setError(error.message || "Terjadi kesalahan saat memproses permintaan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Lupa Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Masukkan email Anda untuk menerima link reset password
          </p>
        </div>
        
        <div className="bg-white p-8 shadow-md rounded-lg border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
              <AlertCircle size={18} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Permintaan Terkirim</h3>
              <p className="mt-2 text-sm text-gray-500">
                Jika email {email} terdaftar di sistem kami, Anda akan menerima email dengan instruksi untuk reset password.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Kembali ke halaman login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <span>Kirim Link Reset Password</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Ingat password Anda?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}