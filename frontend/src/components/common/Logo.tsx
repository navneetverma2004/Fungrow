import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-indigo-600 shadow-md shadow-emerald-500/20 ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <span className="text-white font-extrabold tracking-tighter text-sm">F</span>
        <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute -top-1 -right-1" />
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight leading-none ${sizes[size]} ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}>
          Funngro<span className="text-emerald-500">.</span>
        </span>
        <span className="text-[9px] font-semibold tracking-wider uppercase text-emerald-600">Smart Teens</span>
      </div>
    </Link>
  );
};
