// apps/web/lib/db-fallback.ts
import { Article } from '@prisma/client';

// Fallback data for when database connection fails
export const fallbackArticles: Article[] = [
  {
    id: 'fallback-1',
    title: 'Welcome to Our News Website',
    content: 'This is a fallback article displayed when the database connection is not available. Our regular content will be displayed once the database connection is restored.',
    category: 'Announcement',
    imageUrl: 'https://placehold.co/600x400?text=Database+Connection+Issue',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'STANDARD',
    status: 'PUBLISHED',
    isHotNews: true,
    isSlider: true,
    isRecommendation: true,
    authorId: null
  },
  {
    id: 'fallback-2',
    title: 'How to Get Started with Our Platform',
    content: 'Learn how to navigate our website and discover all the available features.',
    category: 'Guide',
    imageUrl: 'https://placehold.co/600x400?text=Getting+Started',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'STANDARD',
    status: 'PUBLISHED',
    isHotNews: false,
    isSlider: false,
    isRecommendation: true,
    authorId: null
  },
  {
    id: 'fallback-3',
    title: 'Top Features You Should Know About',
    content: 'Explore the most popular features of our news platform.',
    category: 'Features',
    imageUrl: 'https://placehold.co/600x400?text=Top+Features',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'LIFESTYLE',
    status: 'PUBLISHED',
    isHotNews: false,
    isSlider: true,
    isRecommendation: false,
    authorId: null
  },
  {
    id: 'fallback-4',
    title: 'Latest Updates in Technology',
    content: 'Stay informed about the newest developments in the tech world.',
    category: 'Technology',
    imageUrl: 'https://placehold.co/600x400?text=Technology+News',
    createdAt: new Date(),
    updatedAt: new Date(),
    type: 'NETWORK',
    status: 'PUBLISHED',
    isHotNews: true,
    isSlider: false,
    isRecommendation: true,
    authorId: null
  }
];

// Function to generate dummy video articles
export function generateVideoArticles(): Article[] {
  return [
    {
      id: 'video-fallback-1',
      title: 'Introduction to Our Platform',
      content: 'Watch this video guide to understand how to use our platform effectively.',
      category: 'Video Guide',
      imageUrl: 'https://placehold.co/600x400?text=Video+Guide',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'VIDEO',
      status: 'PUBLISHED',
      isHotNews: false,
      isSlider: false,
      isRecommendation: true,
      authorId: null
    },
    {
      id: 'video-fallback-2',
      title: 'Weekly News Roundup',
      content: 'A summary of the most important news from this week.',
      category: 'News Digest',
      imageUrl: 'https://placehold.co/600x400?text=News+Roundup',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'VIDEO',
      status: 'PUBLISHED',
      isHotNews: true,
      isSlider: false,
      isRecommendation: false,
      authorId: null
    }
  ];
}
