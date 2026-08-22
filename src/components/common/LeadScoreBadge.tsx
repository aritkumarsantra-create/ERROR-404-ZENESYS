import React from 'react';
import { Flame, Sun, Snowflake } from 'lucide-react';
import { LeadTier } from '../../types';

interface LeadScoreBadgeProps {
  score: number;
  tier?: LeadTier;
  showBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LeadScoreBadge: React.FC<LeadScoreBadgeProps> = ({
  score,
  tier,
  showBar = false,
  size = 'md'
}) => {
  const calculatedTier: LeadTier = tier || (score >= 80 ? 'Hot' : score >= 50 ? 'Warm' : 'Cold');

  const config = {
    Hot: {
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30',
      barColor: 'bg-emerald-500',
      icon: <Flame className="w-3.5 h-3.5 text-emerald-500 shrink-0" />,
      label: 'Hot Lead'
    },
    Warm: {
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30',
      barColor: 'bg-amber-500',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />,
      label: 'Warm Lead'
    },
    Cold: {
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/30',
      barColor: 'bg-rose-500',
      icon: <Snowflake className="w-3.5 h-3.5 text-rose-500 shrink-0" />,
      label: 'Cold Lead'
    }
  }[calculatedTier];

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-bold'
  }[size];

  return (
    <div className="inline-flex flex-col gap-1">
      <div className={`inline-flex items-center rounded-full font-semibold border ${config.bgColor} ${config.color} ${sizeClasses}`}>
        {config.icon}
        <span>{score}/100</span>
        <span className="opacity-80 font-normal">({calculatedTier})</span>
      </div>

      {showBar && (
        <div className="w-full bg-slate-200 dark:bg-slate-700/60 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
            style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
          />
        </div>
      )}
    </div>
  );
};
