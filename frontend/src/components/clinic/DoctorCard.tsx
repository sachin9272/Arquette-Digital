'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, CheckCircle2, Clock, Award, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Doctor } from '@/types';
import { Button } from '@/components/ui/Button';
import { RatingStars } from '@/components/ui/RatingStars';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectDoctor?: (doctor: Doctor) => void;
  featured?: boolean;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelectDoctor, featured = false }) => {
  const [showBio, setShowBio] = useState(false);

  if (doctor.isActive === false) {
    return null;
  }

  return (
    <article
      className={`relative bg-brand-surface border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
        featured
          ? 'border-brand-secondary/40 ring-1 ring-brand-secondary/15'
          : 'border-brand-border/80 hover:border-brand-secondary/40'
      }`}
      aria-labelledby={`doctor-heading-${doctor.id}`}
    >
      <div>
        {/* Top Image Container */}
        <div className="relative w-full aspect-[4/3] bg-brand-surface-low overflow-hidden">
          <Image
            src={doctor.image}
            alt={`Portrait of ${doctor.name}, ${doctor.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          {/* Department Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-primary shadow-xs border border-brand-border/60">
              {doctor.department}
            </span>
            {featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-secondary text-white shadow-xs">
                Director
              </span>
            )}
          </div>

          {/* Availability Status Chip */}
          {doctor.isAvailableToday && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                Available Today
              </span>
            </div>
          )}

          {/* Quick Experience Badge Over Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="px-2.5 py-0.5 rounded-lg bg-black/50 backdrop-blur-md font-bold text-[11px]">
              {doctor.experienceYears}+ Yrs Experience
            </span>
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px] font-bold">
              <span className="text-amber-400">★</span>
              <span>{doctor.rating.toFixed(1)}</span>
              <span className="text-white/70">({doctor.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Name & Title */}
          <div>
            <h3
              id={`doctor-heading-${doctor.id}`}
              className="text-lg font-black text-brand-primary group-hover:text-brand-secondary transition-colors leading-tight"
            >
              {doctor.name}
            </h3>
            <p className="text-xs text-brand-secondary font-bold mt-1 line-clamp-1">
              {doctor.title}
            </p>
          </div>

          {/* Qualifications */}
          <div className="text-xs text-brand-text flex items-center gap-1.5 font-medium">
            <Award className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
            <span className="truncate">{doctor.qualifications}</span>
          </div>

          {/* Operating Hours / Availability */}
          <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <Clock className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
            <span className="truncate">{doctor.availability}</span>
          </div>

          {/* Specializations Tag Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {doctor.specializations.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-surface-low text-brand-text border border-brand-border/60"
              >
                {spec}
              </span>
            ))}
            {doctor.specializations.length > 3 && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-brand-surface-low text-brand-muted">
                +{doctor.specializations.length - 3} more
              </span>
            )}
          </div>

          {/* Expandable Bio Drawer */}
          <div>
            <button
              type="button"
              onClick={() => setShowBio(!showBio)}
              className="text-[11px] font-bold text-brand-secondary hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>{showBio ? 'Hide Profile' : 'Read Doctor Profile'}</span>
              {showBio ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            {showBio && (
              <div className="mt-2 p-3 rounded-xl bg-brand-surface-low border border-brand-border text-xs text-brand-muted leading-relaxed animate-in fade-in duration-200">
                <p>{doctor.bio}</p>
                <div className="mt-2 text-[11px] text-brand-text font-semibold">
                  Languages: {doctor.languages.join(', ')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing & Booking Footer */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block">
              Consultation
            </span>
            <span className="text-base font-black text-brand-primary">
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
