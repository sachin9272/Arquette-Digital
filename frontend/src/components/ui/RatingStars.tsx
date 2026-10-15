import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  compact?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  max = 5,
  size = 'md',
  showNumber = false,
  reviewCount,
  compact = false,
}) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <div className="inline-flex items-center gap-1.5 whitespace-nowrap" aria-label={`Rating: ${rating} out of ${max} stars`}>
      <div className="flex items-center text-amber-400 shrink-0">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const half = i === Math.floor(rating) && rating % 1 >= 0.4;
          return (
            <Star
              key={i}
              className={`${sizeMap} ${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-slate-300 fill-slate-100'
              }`}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-bold text-brand-text ml-0.5 shrink-0">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-brand-muted shrink-0">
          {compact ? `(${reviewCount})` : `(${reviewCount} reviews)`}
        </span>
      )}
    </div>
  );
};
