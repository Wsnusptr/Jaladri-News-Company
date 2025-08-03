// apps/web/app/settings/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Settings, Bell, Shield, Key, Loader2, Save, User, Mail } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account");
  const [isSaving, setIsSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Redirect to login page if no session
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Get the name value from the input field
      const nameInput = document.getElementById('user-name') as HTMLInputElement;
      const name = nameInput?.value;
      
      if (!name || name.trim() === '') {
        alert('Nama tidak boleh kosong');
        setIsSaving(false);
        return;
      }
      
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Gagal memperbarui pengaturan');
      }
      
      // Update session data
      await update({ name });
      
      alert('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Gagal menyimpan pengaturan. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setIsSaving(true);
    setPasswordError("");
    
    try {
      const currentPasswordInput = document.getElementById('current-password') as HTMLInputElement;
      const newPasswordInput = document.getElementById('new-password') as HTMLInputElement;
      const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement;
      
      const currentPassword = currentPasswordInput?.value;
      const newPassword = newPasswordInput?.value;
      const confirmPassword = confirmPasswordInput?.value;
      
      // Validate inputs
      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordError("Semua field password harus diisi");
        return;
      }
      
      if (newPassword !== confirmPassword) {
        setPasswordError("Password baru dan konfirmasi password tidak cocok");
        return;
      }
      
      if (newPassword.length < 6) {
        setPasswordError("Password baru minimal 6 karakter");
        return;
      }
      
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          currentPassword,
          newPassword
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setPasswordError(data.error || 'Gagal mengubah password');
        return;
      }
      
      // Clear password fields
      currentPasswordInput.value = '';
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      
      alert('Password berhasil diubah');
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('Terjadi kesalahan saat mengubah password');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Memuat pengaturan...</h2>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <h1 className="text-2xl font-bold flex items-center">
                <Settings className="mr-2" />
                Pengaturan Akun
              </h1>
              <p className="text-blue-100 mt-1">Kelola preferensi dan keamanan akun Anda</p>
            </div>
            
            {/* Tabs & Content */}
            <div className="flex flex-col md:flex-row">
              {/* Sidebar Tabs */}
              <div className="md:w-1/4 border-r border-gray-200">
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setActiveTab("account")}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                          activeTab === "account"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <User size={18} className="mr-2" />
                        Akun
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("notifications")}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                          activeTab === "notifications"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Bell size={18} className="mr-2" />
                        Notifikasi
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveTab("security")}
                        className={`w-full flex items-center px-3 py-2 text-sm rounded-md ${
                          activeTab === "security"
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Shield size={18} className="mr-2" />
                        Keamanan
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Content */}
              <div className="md:w-3/4 p-6">
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Pengaturan Akun</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                        <div className="flex items-center">
                          <User size={18} className="text-gray-400 mr-2" />
                          <input
                            id="user-name"
                            type="text"
                            defaultValue={session.user.name || ""}
                            placeholder="Nama Lengkap"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="flex items-center">
                          <Mail size={18} className="text-gray-400 mr-2" />
                          <input
                            type="email"
                            defaultValue={session.user.email || ""}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            disabled
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Email tidak dapat diubah</p>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          onClick={handleSaveSettings}
                          disabled={isSaving}
                          className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 size={16} className="animate-spin mr-2" />
                              <span>Menyimpan...</span>
                            </>
                          ) : (
                            <>
                              <Save size={16} className="mr-2" />
                              <span>Simpan Perubahan</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Pengaturan Notifikasi</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email_notifications"
                            name="email_notifications"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email_notifications" className="font-medium text-gray-700">Notifikasi Email</label>
                          <p className="text-gray-500">Terima notifikasi berita terbaru melalui email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newsletter"
                            name="newsletter"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter Mingguan</label>
                          <p className="text-gray-500">Terima ringkasan berita mingguan</p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          onClick={handleSaveSettings}
                          disabled={isSaving}
                          className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 size={16} className="animate-spin mr-2" />
                              <span>Menyimpan...</span>
                            </>
                          ) : (
                            <>
                              <Save size={16} className="mr-2" />
                              <span>Simpan Perubahan</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">Keamanan Akun</h2>
                    
                    {passwordError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                        {passwordError}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
                        <div className="flex items-center">
                          <Key size={18} className="text-gray-400 mr-2" />
                          <input
                            id="current-password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                        <div className="flex items-center">
                          <Key size={18} className="text-gray-400 mr-2" />
                          <input
                            id="new-password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                        <div className="flex items-center">
                          <Key size={18} className="text-gray-400 mr-2" />
                          <input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button
                          onClick={handleChangePassword}
                          disabled={isSaving}
                          className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 size={16} className="animate-spin mr-2" />
                              <span>Menyimpan...</span>
                            </>
                          ) : (
                            <>
                              <Save size={16} className="mr-2" />
                              <span>Ubah Password</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/profile" className="text-sm text-blue-600 hover:text-blue-800">
              &larr; Kembali ke Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
