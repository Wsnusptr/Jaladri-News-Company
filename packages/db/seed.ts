// Import instance prisma dan ENUM yang kita butuhkan dari file index.ts
import { PrismaClient, PostType, ArticleStatus } from '@prisma/client'; // Impor enum secara langsung
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // Hapus data lama untuk memastikan kebersihan data
    await prisma.article.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany(); // Hapus user juga untuk seeding yang bersih

    // Buat categories terlebih dahulu
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: 'Berita',
                slug: 'berita'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Teknologi',
                slug: 'teknologi'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Olahraga',
                slug: 'olahraga'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Politik',
                slug: 'politik'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Ekonomi',
                slug: 'ekonomi'
            }
        }),
        prisma.category.create({
            data: {
                name: 'Video',
                slug: 'video'
            }
        })
    ]);

    // Buat user Admin dengan password yang di-hash
    const hashedPassword = await bcrypt.hash('adminpassword', 12);
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@jaladri.com',
            name: 'Admin Jala',
            role: 'ADMIN',
            password: hashedPassword
        }
    });

    // Buat artikel-artikel baru dengan tipe dan status yang berbeda
    const articles = [
        {
            title: 'Prabowo Bertolak ke Jateng Hadiri Kongres PSI',
            content: 'Presiden terpilih Prabowo Subianto telah tiba di Solo untuk menghadiri Kongres Partai Solidaritas Indonesia. Dalam kunjungannya, beliau akan memberikan arahan strategis untuk masa depan partai.',
            imageUrl: 'https://picsum.photos/seed/std1/400/225',
            type: PostType.STANDARD,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'prabowo-bertolak-ke-jateng-hadiri-kongres-psi',
            categoryId: categories[3].id // Politik
        },
        {
            title: 'Tom Lembong Divonis 4,5 Tahun Penjara',
            content: 'Mantan Menteri Perdagangan, Tom Lembong, divonis 4,5 tahun penjara dalam kasus korupsi impor gula. Pengadilan menyatakan terbukti melakukan tindak pidana korupsi.',
            imageUrl: 'https://picsum.photos/seed/std2/400/225',
            type: PostType.STANDARD,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'tom-lembong-divonis-4-5-tahun-penjara',
            categoryId: categories[0].id // Berita
        },
        {
            title: 'Wacana Pembangunan Tol Bawah Laut Bali',
            content: 'Pemerintah sedang mengkaji kemungkinan pembangunan tol bawah laut yang menghubungkan Bali dengan Jawa. Proyek ambisius ini diharapkan dapat meningkatkan konektivitas antar pulau.',
            imageUrl: 'https://picsum.photos/seed/draft1/400/225',
            type: PostType.STANDARD,
            status: ArticleStatus.DRAFT,
            authorId: adminUser.id,
            slug: 'wacana-pembangunan-tol-bawah-laut-bali',
            categoryId: categories[4].id // Ekonomi
        },
        {
            title: 'VIDEO: Duka Ibu Kehilangan 2 Anak Akibat Kebakaran',
            content: 'Tangis histeris seorang ibu pecah saat mengetahui kedua anaknya meninggal dalam kebakaran rumah di Jakarta Utara. Tragedi ini mengingatkan pentingnya sistem keamanan kebakaran.',
            imageUrl: 'https://picsum.photos/seed/vid1/400/225',
            type: PostType.VIDEO,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'video-duka-ibu-kehilangan-2-anak-akibat-kebakaran',
            categoryId: categories[5].id // Video
        },
        {
            title: 'Lifestyle: Tips Hidup Sehat di Era Modern',
            content: 'Dalam era modern ini, menjaga kesehatan menjadi tantangan tersendiri. Berbagai polusi udara, makanan cepat saji, dan gaya hidup sedentari membuat kita harus lebih bijak dalam memilih pola hidup.',
            imageUrl: 'https://picsum.photos/seed/lifestyle1/400/225',
            type: PostType.LIFESTYLE,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'lifestyle-tips-hidup-sehat-di-era-modern',
            categoryId: categories[0].id // Berita
        },
        {
            title: 'Network: Kolaborasi Antar Media Massa',
            content: 'Jaringan media massa semakin berkembang dengan kolaborasi antar platform. Sinergi antara media tradisional dan digital menciptakan ekosistem informasi yang lebih kuat.',
            imageUrl: 'https://picsum.photos/seed/network1/400/225',
            type: PostType.NETWORK,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'network-kolaborasi-antar-media-massa',
            categoryId: categories[1].id // Teknologi
        },
        {
            title: 'Jaladri Network: Inovasi Media Digital Terdepan',
            content: 'Jaladri Network menghadirkan inovasi terbaru dalam dunia media digital. Dengan teknologi AI dan machine learning, kami memberikan pengalaman berita yang lebih personal dan akurat.',
            imageUrl: 'https://picsum.photos/seed/jaladri1/400/225',
            type: PostType.JALADRI_NETWORK,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'jaladri-network-inovasi-media-digital-terdepan',
            categoryId: categories[1].id // Teknologi
        },
        {
            title: 'Featured: Berita Utama Hari Ini',
            content: 'Berita utama yang menjadi sorotan publik hari ini mencakup berbagai aspek kehidupan masyarakat. Dari politik hingga ekonomi, semua terangkum dalam laporan komprehensif ini.',
            imageUrl: 'https://picsum.photos/seed/featured1/400/225',
            type: PostType.FEATURED_STRIP,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'featured-berita-utama-hari-ini',
            categoryId: categories[0].id, // Berita
            isSlider: true
        },
        {
            title: 'Hot News: Perkembangan Terkini Dunia Teknologi',
            content: 'Dunia teknologi terus berkembang pesat dengan berbagai inovasi terbaru. Dari kecerdasan buatan hingga teknologi blockchain, semua memberikan dampak signifikan bagi kehidupan manusia.',
            imageUrl: 'https://picsum.photos/seed/hot1/400/225',
            type: PostType.STANDARD,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'hot-news-perkembangan-terkini-dunia-teknologi',
            categoryId: categories[1].id, // Teknologi
            isHotNews: true
        },
        {
            title: 'Rekomendasi: Destinasi Wisata Terbaik 2024',
            content: 'Tahun 2024 menawarkan berbagai destinasi wisata menarik yang wajib dikunjungi. Dari keindahan alam hingga wisata budaya, Indonesia memiliki segala yang Anda butuhkan untuk liburan berkesan.',
            imageUrl: 'https://picsum.photos/seed/travel1/400/225',
            type: PostType.LIFESTYLE,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'rekomendasi-destinasi-wisata-terbaik-2024',
            categoryId: categories[0].id, // Berita
            isRecommendation: true
        },
        {
            title: 'Olahraga: Timnas Indonesia Raih Prestasi Gemilang',
            content: 'Timnas Indonesia berhasil meraih prestasi gemilang di ajang internasional. Pencapaian ini menjadi kebanggaan seluruh rakyat Indonesia dan motivasi untuk terus berprestasi.',
            imageUrl: 'https://picsum.photos/seed/sport1/400/225',
            type: PostType.STANDARD,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'olahraga-timnas-indonesia-raih-prestasi-gemilang',
            categoryId: categories[2].id // Olahraga
        },
        {
            title: 'Ekonomi: Pertumbuhan UMKM di Era Digital',
            content: 'Usaha Mikro, Kecil, dan Menengah (UMKM) mengalami pertumbuhan signifikan di era digital. Platform e-commerce dan teknologi finansial menjadi kunci kesuksesan para pelaku UMKM.',
            imageUrl: 'https://picsum.photos/seed/economy1/400/225',
            type: PostType.STANDARD,
            status: ArticleStatus.PUBLISHED,
            authorId: adminUser.id,
            slug: 'ekonomi-pertumbuhan-umkm-di-era-digital',
            categoryId: categories[4].id // Ekonomi
        }
    ];

    // Create articles with category relationships
    for (const articleData of articles) {
        const { categoryId, ...articleWithoutCategoryId } = articleData;
        await prisma.article.create({
            data: {
                ...articleWithoutCategoryId,
                categories: {
                    connect: [{ id: categoryId }]
                }
            }
        });
    }

    console.log('Seeding finished.');
    console.log('Admin user created with email: admin@jaladri.com');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
