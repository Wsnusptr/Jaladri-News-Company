# Panduan Variabel Lingkungan (Environment Variables)

Dokumen ini menjelaskan semua variabel lingkungan yang digunakan dalam proyek Jaladri News.

## Variabel Lingkungan Wajib

### Database

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `DATABASE_URL` | URL koneksi utama ke database PostgreSQL | `postgresql://jaladri_user:password@localhost:5432/jaladri_news` |
| `DIRECT_URL` | URL koneksi langsung ke database (untuk Prisma) | `postgresql://jaladri_user:password@localhost:5432/jaladri_news` |

### NextAuth

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `NEXTAUTH_SECRET` | Secret key untuk NextAuth (min. 32 karakter) | `your-super-secret-key-32-characters-min` |
| `NEXTAUTH_URL` | URL lengkap aplikasi web | `https://yourdomain.com` |

### URL Aplikasi

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `CMS_URL` | URL lengkap aplikasi CMS | `https://cms.yourdomain.com` |
| `WEB_URL` | URL lengkap aplikasi web | `https://yourdomain.com` |

### Environment

| Variabel | Deskripsi | Nilai |
|----------|-----------|-------|
| `NODE_ENV` | Environment aplikasi | `development`, `production`, atau `test` |

## Variabel Lingkungan Opsional

### OAuth Providers

| Variabel | Deskripsi |
|----------|-----------|
| `GOOGLE_CLIENT_ID` | Client ID untuk Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Client Secret untuk Google OAuth |
| `GITHUB_CLIENT_ID` | Client ID untuk GitHub OAuth |
| `GITHUB_CLIENT_SECRET` | Client Secret untuk GitHub OAuth |

### File Upload

| Variabel | Deskripsi |
|----------|-----------|
| `CLOUDINARY_CLOUD_NAME` | Nama cloud Cloudinary |
| `CLOUDINARY_API_KEY` | API Key Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret Cloudinary |

## Cara Menggunakan

### Development

1. Buat file `.env` di root proyek
2. Salin isi dari `.env.example` ke `.env`
3. Isi nilai-nilai yang sesuai

### Production

1. Buat file `.env` di root proyek
2. Isi dengan nilai-nilai produksi
3. Pastikan `NODE_ENV` diset ke `production`

## Contoh File .env untuk Development

```
# Database Configuration
DATABASE_URL="postgresql://jaladri_user:password@localhost:5432/jaladri_news"
DIRECT_URL="postgresql://jaladri_user:password@localhost:5432/jaladri_news"

# NextAuth Configuration
NEXTAUTH_SECRET="your-development-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# URL Configuration
CMS_URL="http://localhost:3001"
WEB_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

## Contoh File .env untuk Production

```
# Database Configuration
DATABASE_URL="postgresql://jaladri_user:strong-password@localhost:5432/jaladri_news"
DIRECT_URL="postgresql://jaladri_user:strong-password@localhost:5432/jaladri_news"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secure-production-secret-key-32-chars-min"
NEXTAUTH_URL="https://jaladrinews.com"

# URL Configuration
CMS_URL="https://cms-jaladri.com"
WEB_URL="https://jaladrinews.com"

# Environment
NODE_ENV="production"
```

## Cara Generate NEXTAUTH_SECRET

Untuk menghasilkan NEXTAUTH_SECRET yang aman, gunakan perintah berikut:

```bash
openssl rand -base64 32
```

## Catatan Penting

- **JANGAN** commit file `.env` ke repository Git
- **JANGAN** share kredensial produksi dengan siapapun
- Selalu gunakan password yang kuat untuk database produksi
- Perbarui NEXTAUTH_SECRET secara berkala untuk keamanan
- Pastikan URL menggunakan HTTPS di produksi