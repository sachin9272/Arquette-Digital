import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, CheckCircle2, Clock, Globe } from 'lucide-react';
import { Doctor } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RatingStars } from '@/components/ui/RatingStars';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectDoctor?: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelectDoctor }) => {
  return (
    <article
      className="bg-brand-surface-card border border-brand-border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
      aria-labelledby={`doctor-heading-${doctor.id}`}
    >
      {/* Top Banner & Photo */}
      <div className="relative w-full aspect-[4/3] bg-brand-surface-low overflow-hidden">
        <Image
          src={doctor.image}
          alt={`Portrait of ${doctor.name}, ${doctor.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-80" />

        {/* Department Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" size="sm">
            {doctor.department}
          </Badge>
        </div>

        {/* Availability Chip */}
        {doctor.isAvailableToday && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/90 text-white backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Available Today
            </span>
          </div>
        )}

        {/* Doctor Name overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 id={`doctor-heading-${doctor.id}`} className="text-xl font-bold leading-tight drop-shadow-xs">
            {doctor.name}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">{doctor.title}</p>
        </div>
      </div>

      {/* Body details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Rating & Experience Bar */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-brand-border/60 gap-2">
            <RatingStars
              rating={doctor.rating}
              showNumber
              reviewCount={doctor.reviewCount}
              compact
              size="sm"
            />
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border/60 text-[11px] font-semibold text-brand-text whitespace-nowrap shrink-0">
              {doctor.experienceYears}+ Yrs Exp
            </span>
          </div>

          {/* Credentials */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-1">
              Qualifications & Credentials
            </div>
            <p className="text-xs font-semibold text-brand-text flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
              <span>{doctor.qualifications}</span>
            </p>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {doctor.bio}
          </p>

          {/* Specializations Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {doctor.specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-brand-surface-low text-brand-text border border-brand-border/40 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Schedule & Languages */}
          <div className="pt-2 border-t border-brand-border/40 space-y-1.5 text-xs text-brand-muted">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
              <span className="line-clamp-1">{doctor.availability}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
              <span>Languages: {doctor.languages.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Booking Action */}
        <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-brand-muted uppercase font-bold block">
              Consultation From
            </span>
            <span className="text-lg font-black text-brand-primary">
              ₹{doctor.fee.toLocaleString('en-IN')}
            </span>
          </div>

          {onSelectDoctor ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSelectDoctor(doctor)}
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
            >
              Select Doctor
            </Button>
          ) : (
            <Link href={`/booking?doctor=${doctor.id}`} className="shrink-0">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Calendar className="w-3.5 h-3.5" />}
              >
                Book Consult
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
