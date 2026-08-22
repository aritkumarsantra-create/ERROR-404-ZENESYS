import React from 'react';
import { SearchX, FilterX, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  icon?: 'search' | 'filter' | 'folder';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'search',
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4">
        {icon === 'search' && <SearchX className="w-8 h-8" />}
        {icon === 'filter' && <FilterX className="w-8 h-8" />}
        {icon === 'folder' && <FolderOpen className="w-8 h-8" />}
      </div>
      <h4 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
        {title}
      </h4>
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
