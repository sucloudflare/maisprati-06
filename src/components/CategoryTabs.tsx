import React from 'react';
import { categories } from '../data/products';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export default function CategoryTabs({ selectedCategory, onCategoryChange, className = '' }: CategoryTabsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          <span className="text-base">{category.icon}</span>
          <span>{category.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            selectedCategory === category.id
              ? 'bg-white/20 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }`}>
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}