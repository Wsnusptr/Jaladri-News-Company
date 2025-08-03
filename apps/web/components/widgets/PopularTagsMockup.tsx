import React from 'react';
import { Tag } from 'lucide-react';

const exampleTags = [
  { id: 1, name: '#Technology', color: 'blue' },
  { id: 2, name: '#Sports', color: 'green' },
  { id: 3, name: '#Politics', color: 'red' },
  { id: 4, name: '#Health', color: 'purple' },
  { id: 5, name: '#Entertainment', color: 'orange' },
];

export default function PopularTagsMockup() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-700 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Popular Tags
      </h2>
      <div className="flex flex-wrap gap-3">
        {exampleTags.map(tag => (
          <div
            key={tag.id}
            className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-200 border border-blue-200 dark:border-blue-700"
            title={`Click to filter by ${tag.name}`}
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">{tag.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
