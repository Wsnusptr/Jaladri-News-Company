// apps/web/components/articles/RelatedNews.tsx

import { Article } from "@/lib/article-data";
import { ArticleCard } from "./ArticleCard";

interface RelatedNewsProps {
  articles: Article[];
}

export function RelatedNews({ articles }: RelatedNewsProps) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Berita Terkait
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="animate-fadeIn">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
}
