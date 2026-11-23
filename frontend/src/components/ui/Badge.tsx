import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'indigo' | 'amber' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  size = 'md',
  className,
  dot = false,
}) => {
  const variants = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    blue: 'bg-sky-50 text-sky-700 border-sky-200/60',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/60',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/60',
  };

  const dotColors = {
    green: 'bg-emerald-500',
    blue: 'bg-sky-500',
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    slate: 'bg-slate-500',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
