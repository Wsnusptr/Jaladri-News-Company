# Panduan Kontribusi untuk Jaladri News

Terima kasih atas minat Anda untuk berkontribusi pada proyek Jaladri News! Panduan ini akan membantu Anda memahami proses kontribusi dan standar yang kami harapkan.

## 🌟 Cara Berkontribusi

Ada beberapa cara untuk berkontribusi pada proyek ini:

1. **Melaporkan Bug**: Buat issue baru dengan label "bug"
2. **Menyarankan Fitur**: Buat issue baru dengan label "enhancement"
3. **Memperbaiki Bug**: Fork repository, perbaiki bug, dan buat pull request
4. **Menambahkan Fitur**: Fork repository, tambahkan fitur, dan buat pull request
5. **Memperbaiki Dokumentasi**: Perbaiki atau tambahkan dokumentasi

## 🚀 Proses Pengembangan

1. **Fork Repository**: Fork repository ini ke akun GitHub Anda
2. **Clone Repository**: Clone fork Anda ke komputer lokal
3. **Buat Branch**: Buat branch baru untuk perubahan Anda
4. **Buat Perubahan**: Lakukan perubahan yang diperlukan
5. **Commit Perubahan**: Commit perubahan Anda dengan pesan yang jelas
6. **Push ke GitHub**: Push branch Anda ke GitHub
7. **Buat Pull Request**: Buat pull request dari branch Anda ke branch main repository utama

## 📋 Standar Kode

### Gaya Kode

- Gunakan TypeScript untuk semua file JavaScript
- Ikuti ESLint dan Prettier yang sudah dikonfigurasi
- Gunakan camelCase untuk variabel dan fungsi
- Gunakan PascalCase untuk komponen React
- Gunakan kebab-case untuk nama file

### Commit Messages

Gunakan format berikut untuk pesan commit:

```
<type>(<scope>): <subject>

<body>
```

Contoh:
```
feat(auth): tambahkan fitur login dengan Google

Menambahkan fitur login dengan Google menggunakan NextAuth.js
```

Types:
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Perubahan dokumentasi
- `style`: Perubahan yang tidak mempengaruhi arti kode (spasi, format, dll)
- `refactor`: Perubahan kode yang tidak memperbaiki bug atau menambahkan fitur
- `perf`: Perubahan kode yang meningkatkan performa
- `test`: Menambahkan atau memperbaiki test
- `chore`: Perubahan pada build process atau tools

## 🧪 Testing

Sebelum membuat pull request, pastikan:

1. Semua test lulus: `pnpm test`
2. Kode Anda tidak memiliki error linting: `pnpm lint`
3. Aplikasi berjalan dengan baik di lingkungan development: `pnpm dev`

## 📝 Dokumentasi

Jika Anda menambahkan fitur baru atau mengubah fitur yang ada, pastikan untuk memperbarui dokumentasi yang relevan.

## 🔐 Keamanan

- Jangan pernah commit file `.env` atau file yang berisi kredensial
- Jangan pernah commit kode yang berisi hardcoded password atau API key
- Laporkan masalah keamanan langsung ke maintainer, jangan buat issue publik

## 📄 Lisensi

Dengan berkontribusi pada proyek ini, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah lisensi MIT yang sama dengan proyek ini.

## 🙏 Terima Kasih

Terima kasih telah meluangkan waktu untuk berkontribusi pada proyek Jaladri News! Kami sangat menghargai bantuan Anda.