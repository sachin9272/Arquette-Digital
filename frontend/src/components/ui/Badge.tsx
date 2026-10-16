import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'emergency' | 'outline' | 'success';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider uppercase font-bold',
    md: 'text-xs px-3 py-1 font-semibold tracking-wide',
  }[size];

  const variantStyles = {
    default: 'bg-brand-surface-container text-brand-text border border-brand-border/60',
    secondary: 'bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/20 shadow-2xs',
    accent: 'bg-brand-accent-light text-brand-accent border border-brand-accent/20',
    emergency: 'bg-brand-emergency-bg text-brand-emergency border border-brand-emergency/20',
    outline: 'border border-brand-border text-brand-muted bg-transparent',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
  }[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
};
