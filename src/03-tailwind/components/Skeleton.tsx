import React from 'react';

export default function Skeleton() {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-square bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-shimmer"></div>
      
      <div className="flex flex-col p-6 gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
          <div className="h-4 w-3/4 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
        </div>
        
        <div className="h-6 w-2/5 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
        
        <div className="h-4 w-3/5 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded animate-shimmer"></div>
        
        <div className="h-10 bg-gradient-to-r from-slate-50 via-slate-200 to-slate-50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] rounded-lg animate-shimmer"></div>
      </div>
    </div>
  );
}