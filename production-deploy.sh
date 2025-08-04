#!/bin/bash

# Production Deployment Script for Ubuntu VPS
set -e

echo "🚀 Starting production deployment..."

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo "❌ This script should not be run as root"
   exit 1
fi

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js 20 (LTS)
echo "📦 Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
echo "📦 Installing pnpm..."
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc
export PATH="$HOME/.local/share/pnpm:$PATH"

# Install PM2 globally
echo "📦 Installing PM2..."
npm install -g pm2

# Install PostgreSQL client (for database operations)
echo "📦 Installing PostgreSQL client..."
sudo apt-get install -y postgresql-client

# Install SSL certificates dependencies
echo "📦 Installing SSL dependencies..."
sudo apt-get install -y certbot python3-certbot-nginx

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt-get install -y nginx

# Install additional libraries for Prisma binary compatibility
echo "📦 Installing Prisma binary dependencies..."
sudo apt-get install -y libc6 libssl3 libssl-dev openssl

# Create app directory
echo "📁 Creating app directory..."
sudo mkdir -p /var/www/jaladri-news
sudo chown -R $USER:$USER /var/www/jaladri-news

# Clone or update repository (assuming this script is run from project directory)
echo "📥 Setting up project files..."
cp -r . /var/www/jaladri-news/
cd /var/www/jaladri-news

# Install dependencies
echo "📦 Installing project dependencies..."
pnpm install --frozen-lockfile

# Copy environment file
echo "⚙️  Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please edit .env file with your production values"
    read -p "Press enter to continue after editing .env file..."
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm prisma:generate

# Run database migrations
echo "🗄️  Running database migrations..."
pnpm prisma:migrate

# Build the applications
echo "🔨 Building applications..."
pnpm build

# Start applications with PM2
echo "🚀 Starting applications with PM2..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Production deployment completed!"
echo "📝 Next steps:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Run: sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "3. Configure firewall: sudo ufw allow 80,443,22/tcp"
echo "4. Monitor with: pm2 monit"
