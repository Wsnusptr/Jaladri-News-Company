// packages/db/test-articles.ts
import { prisma } from './index';

async function main() {
    console.log('Testing database connection and article query...');

    try {
        // Test koneksi database
        console.log('Testing database connection...');
        await prisma.$queryRaw`SELECT 1 as result`;
        console.log('✅ Database connection successful');

        // Test query artikel
        console.log('\nTesting article query...');
        const articles = await prisma.article.findMany({
            where: { status: 'PUBLISHED' },
            include: { author: true },
            take: 5
        });

        console.log(`✅ Successfully retrieved ${articles.length} articles`);

        if (articles.length > 0) {
            console.log('\nSample article:');
            console.log({
                id: articles[0].id,
                title: articles[0].title,
                status: articles[0].status,
                author: articles[0].author ? articles[0].author.name : 'No author'
            });
        } else {
            console.log('No articles found. You may need to seed the database.');
        }
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();