import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 bg-card-light dark:bg-card-dark space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-28 h-4 rounded-md animate-shimmer" />
        <div className="w-10 h-10 rounded-xl animate-shimmer" />
      </div>
      <div className="w-36 h-8 rounded-lg animate-shimmer" />
      <div className="flex justify-between items-center pt-2">
        <div className="w-20 h-4 rounded animate-shimmer" />
        <div className="w-24 h-6 rounded animate-shimmer" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-card-light dark:bg-card-dark p-4 space-y-3">
      <div className="h-10 rounded-xl animate-shimmer w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 rounded-xl animate-shimmer w-full opacity-80" />
      ))}
    </div>
  );
};

export const SkeletonChart: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-card-light dark:bg-card-dark p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-48 h-5 rounded-md animate-shimmer" />
        <div className="w-28 h-8 rounded-lg animate-shimmer" />
      </div>
      <div className="w-full h-64 rounded-xl animate-shimmer" />
    </div>
  );
};
