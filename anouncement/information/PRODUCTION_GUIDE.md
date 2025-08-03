# Panduan Persiapan Produksi Jaladri News

## File yang Harus Diubah untuk Produksi

Berikut adalah daftar file yang harus diubah saat melakukan deployment ke lingkungan produksi:

### 1. File `.env`

File `.env` berisi variabel lingkungan yang digunakan oleh aplikasi. Untuk produksi, Anda perlu mengubah beberapa nilai:

```bash
# Database Configuration
DATABASE_URL="postgresql://jaladri_user:password_yang_kuat@localhost:5432/jaladri_news"
DIRECT_URL="postgresql://jaladri_user:password_yang_kuat@localhost:5432/jaladri_news"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-secret-key-yang-kuat-minimal-32-karakter"
NEXTAUTH_URL="https://yourdomain.com"

# CMS Configuration
CMS_URL="https://cms.yourdomain.com"

# Web Configuration
WEB_URL="https://yourdomain.com"

# Production
NODE_ENV="production"
```

### 2. File `apps/web/next.config.js`

Untuk produksi, Anda perlu mengubah beberapa konfigurasi di file `next.config.js` aplikasi web:

```javascript
images: {
  // Set ke false untuk mengoptimalkan gambar di produksi
  unoptimized: false,
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  remotePatterns: [
    // Tambahkan domain CDN atau storage Anda sendiri
    { protocol: 'https', hostname: 'cdn.yourdomain.com' },
    // Hapus domain yang tidak digunakan
  ],
},
```

### 3. File `apps/cms/next.config.js`

Untuk produksi, Anda perlu mengubah beberapa konfigurasi di file `next.config.js` aplikasi CMS:

```javascript
images: {
  // Set ke false untuk mengoptimalkan gambar di produksi
  unoptimized: false,
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  remotePatterns: [
    // Batasi domain yang diizinkan untuk keamanan
    { protocol: 'https', hostname: 'cdn.yourdomain.com' },
    { protocol: 'https', hostname: 'yourdomain.com' },
    // Hapus wildcard hostname untuk keamanan
  ],
},
```

### 4. File `nginx.conf`

Untuk produksi, Anda perlu mengubah konfigurasi Nginx:

```nginx
# Web App (Main Site)
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Ganti dengan domain Anda
    # ...
}

# CMS App
server {
    listen 80;
    server_name cms.yourdomain.com;
    
    # Ganti dengan subdomain CMS Anda
    # ...
}
```

### 5. File `ecosystem.config.js` (jika menggunakan PM2)

Untuk produksi, Anda perlu mengubah konfigurasi PM2:

```javascript
module.exports = {
  apps: [
    {
      name: 'jaladri-web',
      script: 'pnpm',
      args: 'web',
      cwd: '/path/to/jaladri-news', // Ganti dengan path sebenarnya
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'jaladri-cms',
      script: 'pnpm',
      args: 'cms', 
      cwd: '/path/to/jaladri-news', // Ganti dengan path sebenarnya
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    }
  ]
};
```

## Langkah-langkah Persiapan Produksi

### 1. Persiapan Database

1. Buat database PostgreSQL baru di server produksi
2. Buat user database dengan password yang kuat
3. Berikan hak akses yang sesuai ke user database
4. Update file `.env` dengan kredensial database produksi

### 2. Persiapan Domain

1. Daftarkan domain utama (misalnya `yourdomain.com`)
2. Daftarkan subdomain untuk CMS (misalnya `cms.yourdomain.com`)
3. Arahkan domain dan subdomain ke IP server produksi
4. Update file `.env` dengan domain produksi

### 3. Persiapan SSL/TLS

1. Install Certbot untuk Let's Encrypt
2. Generate sertifikat SSL untuk domain utama dan subdomain
3. Konfigurasi Nginx untuk menggunakan HTTPS
4. Redirect semua traffic HTTP ke HTTPS

### 4. Persiapan Deployment

1. Clone repository ke server produksi
2. Install dependencies dengan `pnpm install`
3. Generate Prisma client dengan `pnpm prisma:generate`
4. Jalankan migrasi database dengan `pnpm prisma:migrate`
5. Build aplikasi dengan `pnpm build`
6. Setup PM2 atau Docker untuk menjalankan aplikasi

## Checklist Produksi

- [ ] Database PostgreSQL sudah disiapkan
- [ ] Domain dan subdomain sudah diarahkan ke server
- [ ] Sertifikat SSL sudah di-generate
- [ ] File `.env` sudah diupdate dengan nilai produksi
- [ ] File konfigurasi sudah diupdate untuk produksi
- [ ] Dependencies sudah diinstall
- [ ] Prisma client sudah di-generate
- [ ] Migrasi database sudah dijalankan
- [ ] Aplikasi sudah di-build
- [ ] PM2 atau Docker sudah dikonfigurasi
- [ ] Nginx sudah dikonfigurasi sebagai reverse proxy
- [ ] Firewall sudah dikonfigurasi
- [ ] Backup database sudah dikonfigurasi

## Troubleshooting

Jika Anda mengalami masalah saat deployment, silakan merujuk ke file `TROUBLESHOOTING.md` untuk panduan pemecahan masalah.

## Kontak

Jika Anda memerlukan bantuan lebih lanjut, silakan hubungi tim pengembang.