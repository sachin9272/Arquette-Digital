import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emergency' | 'white' | 'outline-white';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8 font-semibold',
      md: 'text-sm px-4.5 py-2.5 gap-2 h-11 font-semibold',
      lg: 'text-base px-6 py-3.5 gap-2.5 h-12 font-bold shadow-sm',
    }[size];

    const variantStyles = {
      primary:
        'bg-brand-primary text-white hover:bg-brand-primary-hover focus:ring-brand-accent shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
      secondary:
        'bg-brand-secondary text-white hover:bg-brand-secondary-hover focus:ring-brand-secondary shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
      outline:
        'bg-brand-surface border border-brand-border text-brand-text hover:bg-brand-surface-low hover:border-brand-secondary/40 focus:ring-brand-accent shadow-2xs',
      ghost:
        'bg-transparent text-brand-text hover:bg-brand-surface-low hover:text-brand-primary focus:ring-brand-accent',
      emergency:
        'bg-brand-emergency text-white hover:opacity-90 focus:ring-red-400 font-bold tracking-wide shadow-md',
      white:
        'bg-white text-brand-primary hover:bg-white/95 focus:ring-white font-black shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      'outline-white':
        'bg-white/10 text-white border border-white/40 hover:bg-white/20 hover:border-white focus:ring-white font-bold backdrop-blur-xs hover:-translate-y-0.5 active:translate-y-0',
    }[variant];

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
