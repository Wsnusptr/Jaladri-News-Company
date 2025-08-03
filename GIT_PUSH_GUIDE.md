# 📤 Git Push Guide - Jaladri News

Panduan untuk push perubahan ke GitHub repository.

## 🔧 Setup Git (Jika belum)

```bash
# Set global git config (jika belum)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 📋 Commands untuk Push ke GitHub

Jalankan perintah berikut di terminal/command prompt dari direktori `c:\jaladri-news-main`:

### 1. Initialize Git (jika belum)
```bash
git init
```

### 2. Add Remote Repository
```bash
git remote add origin https://github.com/Wsnusptr/Jaladri-News-Company.git
```

### 3. Check Current Status
```bash
git status
```

### 4. Add All Changes
```bash
git add .
```

### 5. Commit Changes
```bash
git commit -m "🚀 Production ready: Configure domains jaladrinews.com and cms-jaladri.com

- Update all environment files with production domains
- Configure nginx for production deployment
- Add PM2 ecosystem configuration
- Create deployment scripts and documentation
- Update all localhost references to production URLs
- Add SSL-ready nginx configuration
- Create comprehensive deployment guide"
```

### 6. Push to GitHub
```bash
git push -u origin main
```

## 🔍 Verification Commands

Setelah push, verifikasi dengan:

```bash
# Check remote URL
git remote -v

# Check branch
git branch -a

# Check last commit
git log --oneline -5
```

## 🚨 Troubleshooting

### Jika ada error "remote origin already exists":
```bash
git remote remove origin
git remote add origin https://github.com/Wsnusptr/Jaladri-News-Company.git
```

### Jika ada conflict atau error push:
```bash
# Pull first to merge any remote changes
git pull origin main --allow-unrelated-histories

# Then push
git push -u origin main
```

### Jika diminta authentication:
- Gunakan GitHub Personal Access Token sebagai password
- Atau setup SSH key untuk GitHub

## 📁 Files yang Akan Di-push

Perubahan yang akan di-push meliputi:
- ✅ `.env` files dengan domain produksi
- ✅ `nginx.conf` dan `nginx.conf.template` 
- ✅ `ecosystem.config.js` untuk PM2
- ✅ `deploy.sh` script
- ✅ `DEPLOYMENT.md` documentation
- ✅ Updated `package.json` dengan production scripts
- ✅ Updated `README.md`
- ✅ Updated documentation files
- ✅ `.env.production` template

## ✅ Success Indicators

Setelah berhasil push, Anda akan melihat:
- Repository terupdate di GitHub
- Semua file konfigurasi produksi tersedia
- Dokumentasi deployment lengkap
- Scripts siap untuk production deployment