import React from 'react';
import { BadgeCheck, Stethoscope, Sparkles, Quote } from 'lucide-react';
import { Testimonial } from '@/types';
import { RatingStars } from '@/components/ui/RatingStars';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  // Extract initials cleanly, ignoring common honorifics
  const getInitials = (name: string) => {
    return name
      .replace(/^(Dr\.|Lady|Lord|Sir|Mr\.|Mrs\.|Ms\.)\s+/i, '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const initials = getInitials(testimonial.patientName);

  // Department-specific aesthetic badge configuration
  const departmentConfig: Record<string, { label: string; icon: string; badgeClass: string; avatarGradient: string }> = {
    Dental: {
      label: 'Dental Suite',
      icon: '🦷',
      badgeClass: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20',
      avatarGradient: 'from-teal-600 to-cyan-700',
    },
    Hair: {
      label: 'Hair Restoration',
      icon: '💇',
      badgeClass: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
      avatarGradient: 'from-sky-600 to-indigo-700',
    },
    Skin: {
      label: 'Skin & Aesthetics',
      icon: '✨',
      badgeClass: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
      avatarGradient: 'from-rose-600 to-amber-700',
    },
  };

  const dept = departmentConfig[testimonial.department] || {
    label: testimonial.department,
    icon: '✦',
    badgeClass: 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20',
    avatarGradient: 'from-brand-primary to-brand-secondary',
  };

  return (
    <div className="relative bg-brand-surface rounded-3xl border border-brand-border/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
      {/* Top ambient hover accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="space-y-4">
        {/* Top Header: Star Rating + Department Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <RatingStars rating={testimonial.rating} size="sm" showNumber={true} />
          </div>

          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${dept.badgeClass}`}
          >
            <span>{dept.icon}</span>
            <span>{dept.label}</span>
          </span>
        </div>

        {/* Treatment / Clinical Procedure Tag */}
        {testimonial.treatment && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-surface-low border border-brand-border/70 text-[11px] font-semibold text-brand-secondary tracking-tight">
            <Sparkles className="w-3 h-3 text-brand-secondary/80 shrink-0" />
            <span className="truncate">{testimonial.treatment}</span>
          </div>
        )}

        {/* Testimonial Quote */}
        <div className="relative pt-1">
          <Quote className="w-6 h-6 text-brand-secondary/20 mb-2" />
          <p className="text-[13.5px] sm:text-[14px] text-brand-text/90 leading-relaxed font-normal">
            &ldquo;{testimonial.comment}&rdquo;
          </p>
        </div>
      </div>

      {/* Patient & Doctor Verification Footer */}
      <div className="pt-5 mt-6 border-t border-brand-border/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Patient Monogram Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-tr ${dept.avatarGradient} text-white font-bold text-xs flex items-center justify-center shadow-xs border border-white/20`}
            >
              {initials}
            </div>
            {testimonial.verified && (
              <span
                title="Verified Patient Review"
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-brand-surface"
              >
                <BadgeCheck className="w-3 h-3 text-white" />
              </span>
            )}
          </div>

          {/* Patient Name & Specialist Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-brand-text truncate">
                {testimonial.patientName}
              </span>
              {testimonial.verified && (
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full hidden sm:inline-block">
                  Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-xs text-brand-muted mt-0.5 truncate">
              <Stethoscope className="w-3 h-3 text-brand-secondary shrink-0" />
              <span className="truncate">
                Treated by <strong className="font-semibold text-brand-primary">{testimonial.doctorName}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Date / Timestamp */}
        <span className="text-[11px] text-brand-muted font-medium bg-brand-surface-low px-2 py-0.5 rounded-md border border-brand-border/50 shrink-0">
          {testimonial.date}
        </span>
      </div>
    </div>
  );
};
