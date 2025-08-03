// apps/web/components/widgets/PopularTagsWidget.tsx
import Link from 'next/link';

const popularTags = [];

export function PopularTagsWidget() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">Tag Terpopuler</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {popularTags.length === 0 ? (
          <p className="text-gray-500 text-sm">No popular tags available.</p>
        ) : (
          popularTags.map((tag) => (
            <Link
              key={tag.name}
              href={tag.url}
              className="block bg-gray-100 text-gray-700 font-semibold text-sm px-3 py-1 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              {tag.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
