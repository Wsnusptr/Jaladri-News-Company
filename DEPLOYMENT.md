# 🚀 Deployment Guide - Jaladri News

Panduan lengkap untuk deploy Jaladri News ke production dengan domain:
- **Web App**: https://jaladrinews.com
- **CMS**: https://cms-jaladri.com

## 📋 Prerequisites

1. **Server Requirements**:
   - Ubuntu 20.04+ atau CentOS 8+
   - Node.js 18+
   - pnpm 9.5.0+
   - Nginx
   - PM2 (untuk process management)
   - SSL Certificate (Let's Encrypt)

2. **Domain Setup**:
   - `jaladrinews.com` dan `www.jaladrinews.com` → Server IP
   - `cms-jaladri.com` → Server IP

## 🔧 Server Setup

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm@9.5.0

# Install PM2
npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install Certbot for SSL
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Clone Repository

```bash
cd /var/www
sudo git clone https://github.com/Wsnusptr/Jaladri-News-Company.git jaladri-news
sudo chown -R $USER:$USER /var/www/jaladri-news
cd jaladri-news
```

### 3. Install Project Dependencies

```bash
# Install dependencies
pnpm install --frozen-lockfile

# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Build applications
pnpm build
```

## 🌐 Nginx Configuration

### 1. Copy Nginx Configuration

```bash
sudo cp nginx.conf /etc/nginx/sites-available/jaladri-news
sudo ln -s /etc/nginx/sites-available/jaladri-news /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

### 2. Test and Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 SSL Certificate Setup

```bash
sudo certbot --nginx -d jaladrinews.com -d www.jaladrinews.com -d cms-jaladri.com
```

## 🚀 Application Deployment

### Method 1: Using PM2 Ecosystem (Recommended)

```bash
# Start applications
pnpm pm2:start

# Check status
pm2 status

# Save PM2 configuration
pm2 save
pm2 startup
```

### Method 2: Manual Start

```bash
# Terminal 1 - Web App
cd apps/web
PORT=3000 npm start

# Terminal 2 - CMS App
cd apps/cms
PORT=3001 npm start
```

## 🔄 Environment Variables

Pastikan file `.env` sudah dikonfigurasi dengan benar:

```bash
# Production URLs
NEXT_PUBLIC_BASE_URL="https://jaladrinews.com"
NEXTAUTH_URL="https://jaladrinews.com"
CMS_URL="https://cms-jaladri.com"
WEB_URL="https://jaladrinews.com"

# Database (Supabase)
DATABASE_URL="your-supabase-connection-string"
DIRECT_URL="your-supabase-direct-connection-string"

# Auth Secret
AUTH_SECRET="your-secure-auth-secret"

# Environment
NODE_ENV="production"
```

## 📊 Monitoring & Logs

### PM2 Commands

```bash
# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart applications
pnpm pm2:restart

# Stop applications
pnpm pm2:stop
```

### Log Files Location

- Web App: `./logs/web-*.log`
- CMS App: `./logs/cms-*.log`

## 🔧 Maintenance

### Update Application

```bash
cd /var/www/jaladri-news

# Pull latest changes
git pull origin main

# Install new dependencies
pnpm install --frozen-lockfile

# Rebuild applications
pnpm build

# Restart services
pnpm pm2:restart
```

### Database Migrations

```bash
# Run new migrations
pnpm prisma:migrate

# Reset database (CAUTION!)
pnpm prisma:reset
```

## 🛡️ Security Checklist

- [ ] SSL certificates installed and auto-renewal configured
- [ ] Firewall configured (allow ports 80, 443, 22)
- [ ] Database credentials secured
- [ ] Auth secrets are strong and unique
- [ ] Regular backups configured
- [ ] Server updates automated

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   sudo lsof -i :3000
   sudo lsof -i :3001
   ```

2. **Permission denied**:
   ```bash
   sudo chown -R $USER:$USER /var/www/jaladri-news
   ```

3. **Database connection issues**:
   - Check Supabase connection strings
   - Verify network connectivity
   - Check environment variables

4. **SSL certificate issues**:
   ```bash
   sudo certbot renew --dry-run
   ```

### Health Checks

```bash
# Check web app
curl https://jaladrinews.com/api/health

# Check CMS
curl https://cms-jaladri.com/api/health

# Check Nginx status
sudo systemctl status nginx

# Check PM2 processes
pm2 status
```

## 📞 Support

Jika mengalami masalah deployment, periksa:
1. Log files di `./logs/`
2. PM2 status dengan `pm2 status`
3. Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
4. System logs: `sudo journalctl -u nginx -f`

---

**🎉 Selamat! Jaladri News sudah berhasil di-deploy ke production!**

- Web App: https://jaladrinews.com
- CMS: https://cms-jaladri.com