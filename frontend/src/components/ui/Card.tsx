import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200/80 shadow-card transition-all duration-300',
        hover && 'hover:shadow-card-hover hover:border-slate-300 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
