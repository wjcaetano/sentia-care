import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white shadow-lg shadow-primary-300/50 hover:shadow-xl hover:shadow-primary-400/50',
    secondary: 'bg-slate-700 hover:bg-slate-800 text-white',
    outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50',
    ghost: 'hover:bg-slate-100 text-slate-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={clsx(
        'rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transform hover:-translate-y-0.5 active:translate-y-0',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );
}
