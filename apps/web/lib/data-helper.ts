// apps/web/lib/data-helper.ts
import { Article, Prisma } from '@prisma/client';
import { fallbackArticles, generateVideoArticles } from './db-fallback';

// Helper functions to provide fallback data

export function getFallbackArticles(type?: Prisma.PostType): Article[] {
  if (type === 'VIDEO') {
    return generateVideoArticles();
  }
  return type ? fallbackArticles.filter(a => a.type === type) : fallbackArticles;
}

export function getFallbackHotNews(): Article[] {
  return fallbackArticles.filter(a => a.isHotNews);
}

export function getFallbackSliderArticles(): Article[] {
  return fallbackArticles.filter(a => a.isSlider);
}

export function getFallbackRecommendations(): Article[] {
  return fallbackArticles.filter(a => a.isRecommendation);
}

export function handleDatabaseError(error: any, fallbackData: Article[]): Article[] {
  console.error("Database Error:", error);
  return fallbackData;
}

// Add mock API response helpers
export function mockApiResponse(data: any, delay = 500): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data });
    }, delay);
  });
}
