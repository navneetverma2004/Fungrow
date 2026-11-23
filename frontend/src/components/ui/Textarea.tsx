import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2',
            error
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-rose-500 font-medium">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
