# 🚀 Production Deployment Guide

This guide provides complete instructions for deploying Jaladri News to your Ubuntu VPS.

## 📋 Prerequisites

- Ubuntu 20.04 LTS or newer
- Domain name pointed to your VPS
- Minimum 2GB RAM, 2 CPU cores
- PostgreSQL database (local or remote)

## 🔧 Quick Deployment

### 1. Prepare Your VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Clone the repository
git clone https://github.com/your-username/jaladri-news.git
cd jaladri-news
```

### 2. Run Automated Deployment

```bash
# Make scripts executable
chmod +x production-deploy.sh ssl-setup.sh

# Run production deployment
./production-deploy.sh
```

### 3. Configure Environment

```bash
# Edit environment variables
nano .env

# Required variables:
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-very-secure-secret-here"
```

### 4. Setup SSL Certificates

```bash
# Setup SSL for your domains
./ssl-setup.sh yourdomain.com cms-yourdomain.com
```

## 📊 Manual Deployment Steps

If you prefer manual deployment:

### 1. Install Dependencies

```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# Install PM2
npm install -g pm2

# Install PostgreSQL client
sudo apt-get install -y postgresql-client

# Install Nginx
sudo apt-get install -y nginx
```

### 2. Setup Application

```bash
# Install project dependencies
pnpm install --frozen-lockfile

# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm prisma:migrate

# Build applications
pnpm build
```

### 3. Start Applications

```bash
# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Configure Nginx

```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/jaladri-news
sudo ln -s /etc/nginx/sites-available/jaladri-news /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Copy production environment
cp .env.production .env

# Edit environment variables
nano .env

# Start with Docker Compose
cd docker
docker-compose -f docker-compose.production.yml up -d
```

## 🔒 SSL Configuration

### Automatic SSL (Recommended)

```bash
./ssl-setup.sh yourdomain.com cms-yourdomain.com
```

### Manual SSL with Certbot

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificates
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d cms-yourdomain.com
```

## 🗄️ Database Setup

### Using Local PostgreSQL

```bash
# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE jaladri_news;
CREATE USER jaladri WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE jaladri_news TO jaladri;
\q
```

### Using Remote Database

Update your `.env` file with the remote database URL:

```env
DATABASE_URL="postgresql://user:password@remote-host:5432/database"
DIRECT_URL="postgresql://user:password@remote-host:5432/database"
```

## 📈 Monitoring & Maintenance

### PM2 Monitoring

```bash
# Monitor applications
pm2 monit

# Check logs
pm2 logs

# Restart applications
pm2 restart all

# Check status
pm2 status
```

### Health Checks

```bash
# Run health check
node healthcheck.js

# Check individual services
curl http://localhost:3000/api/health
curl http://localhost:3001/api/health
```

### Database Backup

```bash
# Backup database
./backup-database.sh

# Restore database
./restore-database.sh backup-file.sql
```

## 🛠️ Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules .next
pnpm install
pnpm prisma:generate
pnpm build
```

#### Prisma Connection Issues
```bash
# Check database connection
pnpm --filter @repo/db exec npx prisma db pull

# Reset database (caution!)
pnpm prisma:reset
```

#### Port Already in Use
```bash
# Find and kill process
sudo lsof -i :3000
sudo kill -9 <PID>

# Restart PM2
pm2 restart all
```

### Logs Location

- PM2 logs: `~/.pm2/logs/`
- Nginx logs: `/var/log/nginx/`
- System logs: `journalctl -u nginx`

## 🔒 Security Best Practices

1. **Firewall**: Only open necessary ports (22, 80, 443)
2. **SSL**: Always use HTTPS in production
3. **Environment**: Never commit `.env` files
4. **Updates**: Keep system and dependencies updated
5. **Backup**: Regular database and file backups
6. **Monitoring**: Set up uptime monitoring

## 📱 Multi-Environment Setup

### Staging Environment

```bash
# Create staging branch
git checkout -b staging

# Deploy to staging subdomain
./ssl-setup.sh staging-yourdomain.com cms-staging-yourdomain.com
```

### Environment Variables by Stage

| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| NODE_ENV | development | staging | production |
| DATABASE_URL | Local | Staging DB | Production DB |
| NEXTAUTH_URL | localhost:3000 | staging.domain.com | domain.com |

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review application logs: `pm2 logs`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
4. Verify environment variables: `cat .env`

For additional support, check the project repository or contact the development team.
