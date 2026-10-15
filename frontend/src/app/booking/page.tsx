'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Phone, Clock, CreditCard, FileCheck2 } from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Department } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { AppointmentBookingEngine } from '@/components/clinic/AppointmentBookingEngine';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

function BookingContent() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams.get('doctor') || undefined;
  const initialDept = (searchParams.get('dept') as Department) || undefined;

  return (
    <div className="w-full flex flex-col py-12 lg:py-16">
      <SEOJsonLd type="Clinic" />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-10">
        <Badge variant="secondary" size="md">
          08 Appointment Booking
        </Badge>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary tracking-tight">
          Reserve Your Private Clinical Consultation
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Book online with our senior dental surgeons, consultant dermatologists, and trichologists.
          Receive instantaneous confirmation and calendar synchronization.
        </p>

        {/* Urgent Emergency Call Strip */}
        <div className="inline-flex items-center gap-2 p-2.5 px-4 rounded-full bg-red-50 border border-red-200 text-xs text-red-800 font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>Need same-day emergency dental or trauma care? Call directly: </span>
          <a href={`tel:${CLINIC_INFO.emergencyPhone}`} className="underline font-bold text-red-900">
            {CLINIC_INFO.emergencyPhone}
          </a>
        </div>
      </div>

      {/* Interactive Booking Engine Component */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AppointmentBookingEngine
          initialDepartment={initialDept}
          initialDoctorId={initialDoctorId}
        />
      </div>

      {/* Booking Assurance Highlights */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-brand-border/60">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60 space-y-2">
            <ShieldCheck className="w-6 h-6 text-brand-secondary mx-auto" />
            <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">
              Confidential & Secure
            </h4>
            <p className="text-[11px] text-brand-muted">
              UK Data Protection Act 2018 & GDPR compliant medical record encryption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60 space-y-2">
            <Clock className="w-6 h-6 text-brand-secondary mx-auto" />
            <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">
              Flexible Rescheduling
            </h4>
            <p className="text-[11px] text-brand-muted">
              Modify or reschedule your appointment with up to 24 hours notice at zero penalty.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border/60 space-y-2">
            <CreditCard className="w-6 h-6 text-brand-secondary mx-auto" />
            <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider">
              Zero Upfront Payment
            </h4>
            <p className="text-[11px] text-brand-muted">
              Pay following your consultation via card, cash, or direct private insurance settlement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-semibold">Loading booking portal...</div>}>
      <BookingContent />
    </Suspense>
  );
}
