'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Phone,
  Clock,
  CreditCard,
  FileCheck2,
  Calendar,
  Sparkles,
  HelpCircle,
  Building,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Department } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { AppointmentBookingEngine } from '@/components/clinic/AppointmentBookingEngine';
import { ConsultationCtaBanner } from '@/components/clinic/ConsultationCtaBanner';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

function BookingContent() {
  const searchParams = useSearchParams();
  const initialDoctorId = searchParams.get('doctor') || undefined;
  const initialDept = (searchParams.get('dept') as Department) || undefined;

  const BOOKING_FAQS = [
    {
      id: 'b-faq-1',
      title: 'Do I need to make an upfront payment to book an appointment?',
      content:
        'No. There is zero advance payment required to book your consultation online. You pay conveniently at the clinic reception following your consultation via UPI, credit/debit card, cash, or cashless health insurance claims.',
    },
    {
      id: 'b-faq-2',
      title: 'What should I bring with me for my initial consultation?',
      content:
        'Please bring a government-issued photo ID (Aadhaar or Driving License), details of your current medications, and any relevant past radiographs, blood reports, or skin biopsy histories if applicable.',
    },
    {
      id: 'b-faq-3',
      title: 'Can I book a same-day emergency appointment?',
      content:
        'Yes. We reserve daily emergency priority slots for acute toothaches, chipped teeth, trauma, and acute dermatological flare-ups. Call our triage desk directly at +91 99005 17699 for immediate scheduling.',
    },
    {
      id: 'b-faq-4',
      title: 'Is parking available at the PRALASH Kalyan Nagar clinic?',
      content:
        'Yes, we provide complimentary reserved patient parking with on-site valet assistance right outside our clinic at Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru.',
    },
    {
      id: 'b-faq-5',
      title: 'Can I consult multiple specialists across dental, skin, and hair on the same day?',
      content:
        'Yes. Our integrated 3-in-1 multi-specialty model allows coordinated cross-departmental appointments on the same day, saving you multiple visits. Mention your cross-specialty needs in the booking notes or speak with our care coordinator upon arrival.',
    },
  ];

  const FIRST_VISIT_STEPS = [
    {
      num: '01',
      title: 'Digital Check-In',
      desc: 'Arrive 10 minutes early for quick contactless registration and medical history intake.',
    },
    {
      num: '02',
      title: '1-on-1 Specialist Exam',
      desc: 'Private consultation in our HEPA-filtered, acoustically isolated operatory suite.',
    },
    {
      num: '03',
      title: '3D Diagnostics & Scans',
      desc: 'Low-radiation 3D CBCT, RVG, or polarized dermoscopy performed on-site immediately.',
    },
    {
      num: '04',
      title: 'Itemized Rupee Plan',
      desc: 'Transparent procedural quotation with 0% interest EMI options before any care begins.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* Hero Header Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-12 lg:py-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-brand-secondary" />
              <span>Direct Specialist Access · Instant Confirmation · Bengaluru</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-primary tracking-tight leading-[1.15]">
              Reserve Your Private In-Clinic{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Consultation
              </span>
            </h1>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-2xl mx-auto">
              Schedule your consultation with Co-Founders Dr. Premalatha V. &amp; Dr. Shubha C. N., Prof. Dr. Lalith V. Anand, Dr. Priya Patel, or our senior faculty. Select your department, specialist, and convenient time slot below.
            </p>

            {/* 4 Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
              <div className="p-3.5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                <div className="text-base sm:text-lg font-black text-brand-primary">Instant</div>
                <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Real-Time Confirmation</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                <div className="text-base sm:text-lg font-black text-brand-secondary">₹0 Upfront</div>
                <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Pay at Clinic Counter</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                <div className="text-base sm:text-lg font-black text-brand-primary">Flexible</div>
                <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Zero Penalty Reschedule</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                <div className="text-base sm:text-lg font-black text-brand-primary">DPDP Law</div>
                <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Confidential Records</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Booking Engine Area */}
      <section className="w-full py-12 lg:py-16 bg-brand-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppointmentBookingEngine
            initialDepartment={initialDept}
            initialDoctorId={initialDoctorId}
          />
        </div>
      </section>

      {/* What to Expect On Your First Visit */}
      <section className="w-full py-16 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Patient Experience
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              What to Expect on Your Consultation Day
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              We respect your time. Every appointment is organized for minimal waiting and thorough diagnostic care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIRST_VISIT_STEPS.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-brand-surface-card border border-brand-border/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-brand-secondary text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {s.num}
                  </div>
                  <h3 className="text-base font-black text-brand-primary leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Guarantees & Clinical Assurances */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Booking Assurances
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Patient Care Standards &amp; Guarantees
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Your appointment booking is protected by hospital-grade protocols, clinical data security, and flexible policies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-badge-bg text-brand-secondary flex items-center justify-center border border-brand-secondary/20">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-brand-primary">Confidential &amp; Encrypted</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Protected under India's Digital Personal Data Protection (DPDP) Act and NABH clinical data encryption standards.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-badge-bg text-brand-secondary flex items-center justify-center border border-brand-secondary/20">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-brand-primary">Flexible Rescheduling</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Modify or reschedule your appointment with up to 24 hours notice at zero penalty through your confirmation email.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-badge-bg text-brand-secondary flex items-center justify-center border border-brand-secondary/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-brand-primary">Zero Advance Payment</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Pay after your consultation via UPI, credit/debit card, cash, or cashless health insurance claims assistance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-badge-bg text-brand-secondary flex items-center justify-center border border-brand-secondary/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-brand-primary">Private Sterile Suites</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Consultations take place in private, acoustically isolated operatories with strict Class-B hospital autoclave sterilization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking FAQs */}
      <section className="w-full py-16 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Need Help?
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Frequently Asked Booking Questions
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
              Everything you need to know about appointment scheduling, parking, payments, and clinic visiting hours.
            </p>
          </div>

          <Accordion items={BOOKING_FAQS} />
        </div>
      </section>

      {/* Direct Call & Assistance Banner */}
      <ConsultationCtaBanner
        title="Prefer to Schedule by Phone or WhatsApp?"
        description="Our Patient Care Coordinators in Kalyan Nagar are ready to assist you with choosing the right specialist, answering questions, or booking family appointments."
        badgeText="Open All 7 Days • 9:30 AM – 8:00 PM"
        primaryAction={{
          label: `Call: ${CLINIC_INFO.phone}`,
          href: `tel:${CLINIC_INFO.phone}`,
        }}
        showPhone={false}
        showWhatsApp={true}
      />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-brand-primary">Loading secure booking portal...</p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
