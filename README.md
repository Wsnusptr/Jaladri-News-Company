# 📰 Jaladri News

Jaladri News adalah platform berita modern yang dibangun dengan Next.js, menampilkan animasi yang halus, mode gelap/terang, dan desain responsif yang terinspirasi dari portal berita premium.

## ⚠️ Disclaimer

Semua berita yang dipublikasikan dan melanggar aturan, hoax, atau berita lain yang tidak sesuai bukanlah tanggung jawab pengembang. Konten berita sepenuhnya menjadi tanggung jawab penulis dan editor.

## ✨ Fitur Utama

- 🌓 **Mode Gelap/Terang** - Transisi mulus antar tema
- 🔄 **Background Animasi** - Sistem partikel interaktif
- 📱 **Responsif Penuh** - Dioptimalkan untuk semua ukuran perangkat
- 🎭 **Komponen UI Modern** - Layout berita profesional dengan beberapa bagian
- 📊 **Elemen Berita Interaktif** - Carousel, slider, dan konten dinamis
- 🚀 **Performa Optimal** - Loading cepat dan layout shift minimal

## 🛠️ Teknologi

- **Frontend**: Next.js 15.4 dengan TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animasi**: Framer Motion + Custom CSS animations
- **Sistem Tema**: next-themes dengan implementasi yang ditingkatkan
- **Ikon**: Lucide React
- **State Management**: React Context API
- **Database**: Prisma dengan PostgreSQL

## 📂 Struktur Proyek

```
jaladri-news/
├── apps/
│   ├── cms/               # Admin CMS untuk manajemen konten
│   └── web/               # Frontend website berita utama
│       ├── app/           # Next.js App Router
│       ├── components/    # Komponen UI yang dapat digunakan kembali
│       ├── hooks/         # Custom React hooks
│       ├── public/        # Aset statis
│       └── styles/        # Gaya global dan animasi
└── packages/
    ├── db/                # Skema database dan akses
    └── ui/                # Library komponen UI bersama
```

## 🚀 Memulai Pengembangan

1. **Clone repository**

```bash
git clone https://github.com/Wsnusptr/Jaladri-News-Company.git
cd jaladri-news
```

2. **Salin file environment**

```bash
cp .env.example .env
```

3. **Install dependencies**

```bash
pnpm install --recursive
pnpm install
```

4. **Setup database**

```bash
docker-compose up -d
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

5. **Jalankan server development**

```bash
pnpm dev
```

6. **Buka browser**
   - Aplikasi web: [https://jaladrinews.com](https://jaladrinews.com)
   - CMS: [https://cms-jaladri.com](https://cms-jaladri.com)
   
   **Untuk development lokal:**
   - Aplikasi web: [http://localhost:3000](http://localhost:3000)
   - CMS: [http://localhost:3001](http://localhost:3001)

## 📱 Breakpoints Responsif

- **Mobile**: < 640px
- **Tablet**: 768px
- **Desktop**: 1024px
- **Large Desktop**: 1280px

## 🔐 Autentikasi

- Registrasi dan login pengguna
- Opsi autentikasi sosial
- Rute terproteksi untuk subscriber
- Akses CMS khusus admin

## 🧪 Testing

Untuk menguji koneksi database:

```bash
node test-supabase-connection.js
```

## 🐳 Docker Support

Proyek ini mendukung deployment dengan Docker:

```bash
# Jalankan database dan Redis
docker-compose up -d

# Build dan jalankan aplikasi
docker build -f docker/Dockerfile.web -t jaladri-web .
docker build -f docker/Dockerfile.cms -t jaladri-cms .
```

## 🔮 Rencana Pengembangan

- Fitur personalisasi yang ditingkatkan
- Sistem komentar dengan moderasi
- Notifikasi real-time
- Fungsionalitas pencarian lanjutan
- Dashboard analitik performa

## 📄 Lisensi

MIT

## 📞 Kontak

Untuk pertanyaan atau dukungan, hubungi tim pengembang di support@jaladri.com
