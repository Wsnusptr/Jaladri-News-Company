#!/bin/bash

# Jaladri News Deployment Script
# This script helps deploy the application to production

echo "🚀 Starting Jaladri News Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing dependencies..."
pnpm install --frozen-lockfile

# Step 2: Generate Prisma client
print_status "Generating Prisma client..."
pnpm prisma:generate

# Step 3: Run database migrations
print_status "Running database migrations..."
pnpm prisma:migrate

# Step 4: Build applications
print_status "Building web application..."
pnpm --filter web build

print_status "Building CMS application..."
pnpm --filter cms build

# Step 5: Copy production environment file
if [ -f ".env.production" ]; then
    print_status "Using production environment configuration..."
    cp .env.production .env
else
    print_warning "No .env.production file found. Make sure .env is configured for production."
fi

# Step 6: Start applications with PM2 (if available)
if command -v pm2 &> /dev/null; then
    print_status "Starting applications with PM2..."
    
    # Stop existing processes
    pm2 stop jaladri-web jaladri-cms 2>/dev/null || true
    pm2 delete jaladri-web jaladri-cms 2>/dev/null || true
    
    # Start web application
    cd apps/web
    pm2 start npm --name "jaladri-web" -- start
    cd ../..
    
    # Start CMS application
    cd apps/cms
    pm2 start npm --name "jaladri-cms" -- start
    cd ../..
    
    # Save PM2 configuration
    pm2 save
    pm2 startup
    
    print_status "Applications started with PM2"
    pm2 status
else
    print_warning "PM2 not found. You'll need to start the applications manually:"
    echo "  - Web: cd apps/web && npm start"
    echo "  - CMS: cd apps/cms && npm start"
fi

print_status "Deployment completed!"
print_status "Web App: https://jaladrinews.com"
print_status "CMS: https://cms-jaladri.com"

echo ""
print_warning "Don't forget to:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Set up SSL certificates with: sudo certbot --nginx -d jaladrinews.com -d www.jaladrinews.com -d cms-jaladri.com"
echo "3. Configure Nginx with the provided nginx.conf file"
echo "4. Set up firewall rules to allow HTTP (80) and HTTPS (443)"