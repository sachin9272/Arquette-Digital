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
    sm: 'text-[11px] px-2 py-0.5 tracking-wider uppercase font-bold',
    md: 'text-xs px-2.5 py-1 font-semibold',
  }[size];

  const variantStyles = {
    default: 'bg-brand-surface-container text-brand-text',
    secondary: 'bg-brand-badge-bg text-brand-badge-text',
    accent: 'bg-brand-accent-light text-brand-accent',
    emergency: 'bg-brand-emergency-bg text-brand-emergency border border-brand-emergency/20',
    outline: 'border border-brand-border text-brand-muted bg-transparent',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }[variant];

  return (
    <span className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </span>
  );
};
