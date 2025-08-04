# 📰 Jaladri News Company

## 🎯 Project Status
**✅ PRODUCTION READY** - Build sukses, siap hosting!

## 🚀 Quick Start

### Development
```bash
pnpm install
pnpm dev
```

### Production Deployment
```bash
chmod +x production-deploy.sh ssl-setup.sh
./production-deploy.sh
./ssl-setup.sh yourdomain.com cms-yourdomain.com
```

## 📁 Project Structure

```
/
├── apps/
│   ├── web/          # Main website (port 3000)
│   └── cms/          # Admin CMS (port 3001)
├── packages/
│   └── db/           # Database & Prisma
├── anouncement/
│   ├── information/  # Documentation files
│   └── testing/      # Testing utilities
├── docker/           # Docker configurations
└── production files  # Deployment scripts
```

## 🔧 Main Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development |
| `pnpm build` | Build for production |
| `pnpm start` | Start production |
| `pnpm pm2:start` | Start with PM2 |

## 📖 Documentation

- **[Production Deployment](anouncement/information/DEPLOYMENT.md)** - Complete deployment guide
- **[Ready for Production](anouncement/information/READY-FOR-PRODUCTION.md)** - Production checklist
- **[Contributing](anouncement/information/CONTRIBUTING.md)** - Development guidelines

## 🛠️ Utilities

- **[Build Check](anouncement/testing/build-check.js)** - Pre-build validation
- **[Health Check](anouncement/testing/healthcheck.js)** - App monitoring

## 🌐 URLs After Deployment

- **Main Website**: `https://yourdomain.com`
- **CMS Admin**: `https://cms-yourdomain.com`

## 🔒 Environment Setup

Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_URL` - Your domain URL
- `NEXTAUTH_SECRET` - Random 32+ character secret

**Ready to deploy to your Ubuntu VPS!** 🚀
