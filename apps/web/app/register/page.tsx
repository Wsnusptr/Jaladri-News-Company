// apps/web/app/register/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registrasi berhasil! Silakan login.');
        router.push('/login');
      } else {
        const data = await response.text();
        setError(data || 'Registrasi gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
       <div className="w-full max-w-sm p-8 space-y-6">
        <div className="p-10 border border-gray-300 rounded-lg bg-white">
          <div className="flex flex-col items-center mb-8 text-center">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
            <p className="mt-4 text-gray-500 font-semibold">Daftar untuk melihat berita dan konten dari kami.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input id="name" name="name" type="text" required onChange={handleChange} placeholder="Nama Lengkap" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm" />
            <input id="email" name="email" type="email" required onChange={handleChange} placeholder="Alamat Email" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm" />
            <input id="password" name="password" type="password" required onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm" />
            
            {error && <p className="text-xs text-center text-red-600">{error}</p>}

            <button type="submit" disabled={isLoading} className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300">
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>
        </div>
        <div className="p-6 border border-gray-300 rounded-lg text-center text-sm bg-white">
          Punya akun?{" "}
          <Link href="/login" className="font-semibold text-blue-500">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}