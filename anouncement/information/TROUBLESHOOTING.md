# Panduan Troubleshooting Jaladri News

## Masalah Umum dan Solusinya

### 1. Masalah Database

#### Koneksi Database Gagal

**Gejala**: Aplikasi tidak dapat terhubung ke database, error "Connection refused" atau "Cannot connect to PostgreSQL"

**Solusi**:
1. Periksa apakah PostgreSQL berjalan:
   ```bash
   sudo systemctl status postgresql
   ```

2. Periksa apakah kredensial database benar di file `.env`:
   ```
   DATABASE_URL="postgresql://jaladri_user:password@localhost:5432/jaladri_news"
   ```

3. Periksa apakah user database ada dan memiliki akses:
   ```bash
   sudo -u postgres psql -c "\du"
   ```

4. Periksa apakah database ada:
   ```bash
   sudo -u postgres psql -c "\l"
   ```

5. Coba koneksi manual:
   ```bash
   psql -h localhost -U jaladri_user -d jaladri_news
   ```

#### Migrasi Database Gagal

**Gejala**: Error saat menjalankan `pnpm prisma:migrate`

**Solusi**:
1. Periksa apakah ada perubahan schema yang konflik:
   ```bash
   pnpm prisma:generate
   ```

2. Reset database (hanya untuk development):
   ```bash
   pnpm prisma:reset
   ```

3. Periksa log error Prisma untuk detail lebih lanjut

### 2. Masalah Build

#### Build Gagal dengan Error Symlink

**Gejala**: Error "EPERM: operation not permitted, symlink" saat build di Windows

**Solusi**:
1. Ini adalah masalah Windows yang tidak akan terjadi di Linux
2. Jalankan terminal sebagai Administrator
3. Gunakan Docker untuk build
4. Aktifkan Developer Mode di Windows

#### Error "Module not found" saat Build

**Gejala**: Error "Cannot find module" atau "Module not found" saat build

**Solusi**:
1. Pastikan semua dependensi terinstall:
   ```bash
   pnpm install
   ```

2. Bersihkan cache:
   ```bash
   pnpm store prune
   ```

3. Hapus node_modules dan install ulang:
   ```bash
   rm -rf node_modules
   pnpm install
   ```

### 3. Masalah Runtime

#### Aplikasi Crash saat Startup

**Gejala**: Aplikasi crash segera setelah dijalankan

**Solusi**:
1. Periksa log error:
   ```bash
   # Jika menggunakan PM2
   pm2 logs
   
   # Jika menggunakan Docker
   docker logs jaladri-web
   docker logs jaladri-cms
   ```

2. Periksa apakah semua variabel lingkungan yang diperlukan ada:
   ```bash
   # Jika menggunakan PM2
   pm2 env 0  # Ganti 0 dengan ID proses
   ```

3. Periksa apakah port yang digunakan tersedia:
   ```bash
   sudo netstat -tulpn | grep :3000
   sudo netstat -tulpn | grep :3001
   ```

#### Error "Prisma Client not found"

**Gejala**: Error "PrismaClient is not defined" atau "Cannot find Prisma Client"

**Solusi**:
1. Generate Prisma Client:
   ```bash
   pnpm prisma:generate
   ```

2. Periksa apakah Prisma Client diimpor dengan benar dalam kode

3. Jika di Windows, jalankan script fix-prisma-engine.js:
   ```bash
   node fix-prisma-engine.js
   ```

### 4. Masalah API

#### Error CORS

**Gejala**: Error "Access-Control-Allow-Origin" di browser console

**Solusi**:
1. Pastikan CMS_URL dan WEB_URL dikonfigurasi dengan benar di file `.env`
2. Periksa apakah CORS dikonfigurasi dengan benar di Next.js API routes
3. Pastikan protokol (http/https) konsisten

#### API Mengembalikan 500 Internal Server Error

**Gejala**: API mengembalikan status 500

**Solusi**:
1. Periksa log server untuk error detail
2. Periksa apakah database terhubung dengan benar
3. Tambahkan try-catch di handler API untuk menangkap dan log error

### 5. Masalah Deployment

#### Nginx Mengembalikan 502 Bad Gateway

**Gejala**: Browser menampilkan "502 Bad Gateway" saat mengakses situs

**Solusi**:
1. Periksa apakah aplikasi berjalan:
   ```bash
   # Jika menggunakan PM2
   pm2 status
   
   # Jika menggunakan Docker
   docker ps
   ```

2. Periksa apakah Nginx dikonfigurasi dengan benar:
   ```bash
   sudo nginx -t
   ```

3. Periksa log Nginx:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

4. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

#### SSL Certificate Invalid

**Gejala**: Browser menampilkan warning tentang sertifikat tidak valid

**Solusi**:
1. Periksa apakah sertifikat Let's Encrypt masih valid:
   ```bash
   sudo certbot certificates
   ```

2. Perbarui sertifikat:
   ```bash
   sudo certbot renew
   ```

3. Periksa apakah domain dikonfigurasi dengan benar di sertifikat

### 6. Masalah Spesifik Aplikasi

#### Gagal Memuat Artikel

**Gejala**: Error "Gagal memuat artikel" atau "Failed to fetch articles"

**Solusi**:
1. Periksa apakah API `/api/articles` berfungsi:
   ```bash
   curl https://jaladrinews.com/api/articles
   ```

2. Periksa apakah database memiliki artikel:
   ```bash
   # Masuk ke PostgreSQL
   psql -h localhost -U jaladri_user -d jaladri_news
   
   # Query artikel
   SELECT COUNT(*) FROM "Article";
   ```

3. Periksa apakah proxy API di CMS berfungsi:
   ```bash
   curl https://cms-jaladri.com/api/proxy/articles
   ```

#### Gambar Tidak Muncul

**Gejala**: Gambar tidak muncul atau menampilkan icon broken image

**Solusi**:
1. Periksa apakah path gambar benar
2. Periksa apakah file gambar ada di direktori public
3. Periksa apakah URL gambar lengkap dan benar

#### Login Gagal

**Gejala**: Tidak dapat login ke CMS

**Solusi**:
1. Periksa apakah kredensial login benar
2. Periksa apakah NextAuth dikonfigurasi dengan benar
3. Periksa apakah database memiliki user:
   ```bash
   # Masuk ke PostgreSQL
   psql -h localhost -U jaladri_user -d jaladri_news
   
   # Query user
   SELECT * FROM "User";
   ```

4. Reset password user jika perlu (melalui database)

## Perintah Diagnostik Berguna

### Diagnostik Database
```bash
# Status PostgreSQL
sudo systemctl status postgresql

# List semua database
sudo -u postgres psql -c "\l"

# List semua user
sudo -u postgres psql -c "\du"

# Koneksi ke database
psql -h localhost -U jaladri_user -d jaladri_news

# Di dalam PostgreSQL shell:
\dt                     # List semua tabel
SELECT COUNT(*) FROM "Article";  # Hitung artikel
SELECT COUNT(*) FROM "User";     # Hitung user
```

### Diagnostik Aplikasi
```bash
# Status PM2
pm2 status
pm2 logs

# Status Docker
docker ps
docker logs jaladri-web
docker logs jaladri-cms

# Test API
curl http://localhost:3000/api/articles
curl http://localhost:3001/api/proxy/articles
```

### Diagnostik Jaringan
```bash
# Check port yang digunakan
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :3001

# Check koneksi ke database
nc -zv localhost 5432

# Check DNS
nslookup yourdomain.com
```

### Diagnostik Nginx
```bash
# Test konfigurasi
sudo nginx -t

# Status Nginx
sudo systemctl status nginx

# Log Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Prosedur Reset

### Reset Database (Development Only)
```bash
# Reset database dengan Prisma
pnpm prisma:reset

# Atau manual di PostgreSQL
psql -h localhost -U jaladri_user -d jaladri_news
# Di dalam PostgreSQL shell:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO jaladri_user;
\q

# Kemudian jalankan migrasi dan seed
pnpm prisma:migrate
pnpm prisma:seed
```

### Reset Aplikasi
```bash
# Jika menggunakan PM2
pm2 delete all
pm2 start ecosystem.config.js

# Jika menggunakan Docker
docker-compose down
docker-compose up -d
```

### Reset Nginx
```bash
sudo systemctl restart nginx
```

## Kontak Support

Jika masalah tidak dapat diselesaikan dengan panduan ini, silakan hubungi tim pengembang dengan informasi berikut:

1. Deskripsi masalah secara detail
2. Screenshot error jika ada
3. Log error dari aplikasi
4. Langkah-langkah yang sudah dicoba
5. Informasi lingkungan (OS, versi Node.js, dll)