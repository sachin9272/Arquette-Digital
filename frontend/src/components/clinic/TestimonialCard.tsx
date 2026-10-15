import React from 'react';
import { BadgeCheck, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import { RatingStars } from '@/components/ui/RatingStars';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-brand-surface-card border border-brand-border rounded-2xl p-6 shadow-xs flex flex-col justify-between relative group hover:border-brand-secondary/40 transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <RatingStars rating={testimonial.rating} size="sm" />
          <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-surface-low">
            {testimonial.department}
          </span>
        </div>

        <div className="relative">
          <Quote className="w-8 h-8 text-brand-secondary/15 absolute -top-3 -left-2 -z-0" />
          <p className="text-sm text-brand-text leading-relaxed italic relative z-10">
            &ldquo;{testimonial.comment}&rdquo;
          </p>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-brand-text flex items-center gap-1">
            <span>{testimonial.patientName}</span>
            {testimonial.verified && (
              <span title="Verified Patient Review" className="inline-flex">
                <BadgeCheck className="w-4 h-4 text-brand-secondary inline" />
              </span>
            )}
          </div>
          <p className="text-xs text-brand-muted">
            Treated by <span className="font-semibold text-brand-primary">{testimonial.doctorName}</span>
          </p>
        </div>
        <span className="text-[11px] text-brand-muted">{testimonial.date}</span>
      </div>
    </div>
  );
};
