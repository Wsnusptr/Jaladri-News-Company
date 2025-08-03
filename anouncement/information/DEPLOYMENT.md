

# Panduan Deployment Jaladri News

## Persiapan Deployment

### 1. File yang Perlu Diperhatikan

Sebelum melakukan deployment ke lingkungan produksi, pastikan file-file berikut sudah dikonfigurasi dengan benar:

#### File Konfigurasi Utama
- `.env` - Variabel lingkungan (jangan di-push ke Git)
- `.env.example` - Template variabel lingkungan (aman untuk di-push)
- `docker-compose.yml` - Konfigurasi Docker untuk development
- `docker/docker-compose.yml` - Konfigurasi Docker untuk produksi
- `docker/Dockerfile.web` - Dockerfile untuk aplikasi web
- `docker/Dockerfile.cms` - Dockerfile untuk aplikasi CMS
- `nginx.conf.template` - Template konfigurasi Nginx

### 2. Variabel Lingkungan untuk Produksi

Berikut adalah variabel lingkungan yang perlu dikonfigurasi untuk lingkungan produksi:

```bash
# Database Configuration
DATABASE_URL="postgresql://jaladri_user:password_anda@localhost:5432/jaladri_news"
DIRECT_URL="postgresql://jaladri_user:password_anda@localhost:5432/jaladri_news"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-32-characters-min"
NEXTAUTH_URL="https://yourdomain.com"

# CMS Configuration
CMS_URL="https://cms.yourdomain.com"

# Web Configuration
WEB_URL="https://yourdomain.com"

# Production
NODE_ENV="production"
```

## Opsi Deployment

### Opsi 1: Deployment dengan Docker (Direkomendasikan)

Docker menyediakan cara yang konsisten dan terisolasi untuk men-deploy aplikasi.

#### Langkah-langkah:

1. **Persiapkan Server**
   ```bash
   # Update sistem
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker dan Docker Compose
   sudo apt install docker.io docker-compose -y
   
   # Tambahkan user ke grup docker
   sudo usermod -aG docker $USER
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/jaladri-news.git
   cd jaladri-news
   ```

3. **Konfigurasi Environment**
   ```bash
   cp .env.example .env
   # Edit file .env dengan konfigurasi produksi
   nano .env
   ```

4. **Build dan Jalankan dengan Docker Compose**
   ```bash
   cd docker
   docker-compose up -d
   ```

5. **Setup Nginx sebagai Reverse Proxy**
   ```bash
   # Install Nginx
   sudo apt install nginx -y
   
   # Konfigurasi Nginx
   sudo cp nginx.conf.template /etc/nginx/sites-available/jaladri-news
   # Edit file dengan domain yang sesuai
   sudo nano /etc/nginx/sites-available/jaladri-news
   
   # Aktifkan konfigurasi
   sudo ln -s /etc/nginx/sites-available/jaladri-news /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL dengan Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d cms.yourdomain.com
   ```

### Opsi 2: Deployment Langsung (Tanpa Docker)

Jika Anda lebih suka men-deploy aplikasi langsung tanpa Docker:

#### Langkah-langkah:

1. **Persiapkan Server**
   ```bash
   # Update sistem
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Enable pnpm
   corepack enable pnpm
   ```

2. **Install PostgreSQL**
   ```bash
   sudo apt install postgresql postgresql-contrib -y
   
   # Setup database
   sudo -u postgres psql
   # Di dalam PostgreSQL shell:
   CREATE USER jaladri_user WITH PASSWORD 'password_anda';
   CREATE DATABASE jaladri_news;
   GRANT ALL PRIVILEGES ON DATABASE jaladri_news TO jaladri_user;
   \q
   ```

3. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/jaladri-news.git
   cd jaladri-news
   ```

4. **Konfigurasi Environment**
   ```bash
   cp .env.example .env
   # Edit file .env dengan konfigurasi produksi
   nano .env
   ```

5. **Install Dependencies dan Build**
   ```bash
   pnpm install
   pnpm prisma:generate
   pnpm prisma:migrate
   pnpm build
   ```

6. **Setup PM2 untuk Process Management**
   ```bash
   npm install -g pm2
   
   # Buat file ecosystem.config.js
   cat > ecosystem.config.js << EOL
   module.exports = {
     apps: [
       {
         name: 'jaladri-web',
         script: 'pnpm',
         args: 'web',
         cwd: '/path/to/jaladri-news',
         env: {
           NODE_ENV: 'production',
           PORT: 3000
         }
       },
       {
         name: 'jaladri-cms',
         script: 'pnpm',
         args: 'cms', 
         cwd: '/path/to/jaladri-news',
         env: {
           NODE_ENV: 'production',
           PORT: 3001
         }
       }
     ]
   };
   EOL
   
   # Start aplikasi
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx dan SSL** (sama seperti Opsi 1)

## File yang Perlu Diubah untuk Produksi

Saat melakukan deployment ke produksi, pastikan untuk mengubah file-file berikut:

1. **File `.env`**
   - Ganti semua URL localhost dengan domain produksi
   - Gunakan password database yang kuat
   - Generate NEXTAUTH_SECRET baru yang aman

2. **File `nginx.conf`**
   - Ganti `yourdomain.com` dengan domain aktual Anda
   - Sesuaikan path jika diperlukan

3. **File `ecosystem.config.js` (jika menggunakan PM2)**
   - Sesuaikan path ke direktori aplikasi

## Troubleshooting

### Masalah Database
- **Koneksi Gagal**: Periksa apakah PostgreSQL berjalan (`sudo systemctl status postgresql`)
- **Migrasi Gagal**: Coba jalankan `pnpm prisma:migrate` secara manual
- **Prisma Client Error**: Regenerate client dengan `pnpm prisma:generate`

### Masalah Aplikasi
- **Aplikasi Tidak Berjalan**: Periksa log dengan `pm2 logs` atau `docker logs`
- **Error 502 Bad Gateway**: Periksa apakah aplikasi berjalan di port yang benar
- **CORS Error**: Pastikan CMS_URL dan WEB_URL dikonfigurasi dengan benar

### Masalah SSL
- **Certificate Invalid**: Jalankan `sudo certbot renew --dry-run` untuk memeriksa pembaruan
- **Mixed Content Warning**: Pastikan semua URL menggunakan HTTPS

## Backup dan Pemeliharaan

### Backup Database
```bash
# Buat script backup
cat > backup-database.sh << EOL
#!/bin/bash
BACKUP_DIR="/var/backups/jaladri-news"
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="\$BACKUP_DIR/jaladri_news_\$DATE.sql"

mkdir -p \$BACKUP_DIR

pg_dump -h localhost -U jaladri_user -d jaladri_news > \$BACKUP_FILE

# Compress backup
gzip \$BACKUP_FILE

# Keep only 7 days of backups
find \$BACKUP_DIR -name "*.gz" -mtime +7 -delete

echo "Backup completed: \$BACKUP_FILE.gz"
EOL

chmod +x backup-database.sh

# Tambahkan ke crontab untuk backup harian
crontab -e
# Tambahkan baris: 0 2 * * * /path/to/jaladri-news/backup-database.sh
```

### Pembaruan Aplikasi
```bash
# Pull perubahan terbaru
git pull

# Install dependencies baru
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Jalankan migrasi database (jika ada)
pnpm prisma:migrate

# Build ulang aplikasi
pnpm build

# Restart aplikasi
pm2 restart all
```

## Monitoring

### Monitoring dengan PM2
```bash
pm2 status        # Lihat status aplikasi
pm2 monit         # Monitor aplikasi secara real-time
pm2 logs          # Lihat log aplikasi
```

### Monitoring dengan Docker
```bash
docker ps                     # Lihat container yang berjalan
docker logs jaladri-web       # Lihat log container web
docker logs jaladri-cms       # Lihat log container cms
docker-compose logs -f        # Lihat semua log secara real-time
```

## Kesimpulan

Deployment Jaladri News dapat dilakukan dengan Docker (lebih mudah dan konsisten) atau langsung tanpa Docker. Pastikan untuk mengkonfigurasi variabel lingkungan dengan benar, terutama URL dan kredensial database.

Untuk keamanan tambahan, pertimbangkan untuk:
- Menggunakan firewall (UFW)
- Mengaktifkan fail2ban untuk mencegah brute force
- Melakukan backup database secara teratur
- Memonitor penggunaan sumber daya server

Jika ada pertanyaan atau masalah, silakan hubungi tim pengembang.