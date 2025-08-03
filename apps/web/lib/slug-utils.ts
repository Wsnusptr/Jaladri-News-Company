import { prisma } from "@repo/db";

export async function generateUniqueSlug(baseTitle: string): Promise<string> {
  const baseSlug = baseTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);

  let slug = baseSlug;
  let counter = 1;

  // Check if slug exists and generate unique one
  while (true) {
    const existingArticle = await prisma.article.findFirst({
      where: { slug }
    });

    if (!existingArticle) {
      break; // Slug is unique
    }

    // If slug exists, add counter
    const suffix = `-${counter}`;
    const maxBaseLength = 100 - suffix.length;
    const truncatedBase = baseSlug.substring(0, maxBaseLength);
    slug = `${truncatedBase}${suffix}`;
    counter++;
  }

  return slug;
}

export async function generateUniqueSlugExcluding(baseTitle: string, excludeId?: string): Promise<string> {
  const baseSlug = baseTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);

  let slug = baseSlug;
  let counter = 1;

  // Check if slug exists and generate unique one (excluding current article when editing)
  while (true) {
    const existingArticle = await prisma.article.findFirst({
      where: { slug }
    });

    if (!existingArticle || (excludeId && existingArticle.id === excludeId)) {
      break; // Slug is unique or it's the same article being edited
    }

    // If slug exists, add counter
    const suffix = `-${counter}`;
    const maxBaseLength = 100 - suffix.length;
    const truncatedBase = baseSlug.substring(0, maxBaseLength);
    slug = `${truncatedBase}${suffix}`;
    counter++;
  }

  return slug;
}
