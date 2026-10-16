import React from 'react';
import Link from 'next/link';
import { Calendar, Phone, HeartHandshake, MessageSquare } from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Department } from '@/types';
import { Button } from '@/components/ui/Button';

export interface ConsultationCtaBannerProps {
  title?: string;
  description?: string;
  badgeText?: string;
  department?: Department;
  primaryAction?: {
    label: string;
    href: string;
  };
  showPhone?: boolean;
  showWhatsApp?: boolean;
  phone?: string;
  addressNote?: string;
}

export const ConsultationCtaBanner: React.FC<ConsultationCtaBannerProps> = ({
  title = 'Schedule Your Clinical Consultation in Bengaluru',
  description = 'Experience world-class multi-specialty care, certified specialists, and evidence-based medicine at PRALASH in HRBR Layout, Kalyan Nagar.',
  badgeText = 'Open All 7 Days • 9:30 AM – 8:00 PM',
  department,
  primaryAction,
  showPhone = true,
  showWhatsApp = true,
  phone = CLINIC_INFO.phone,
  addressNote = 'Block 1, 708, 3rd Cross Rd, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru • Free valet patient parking available',
}) => {
  const defaultPrimaryHref = department ? `/booking?dept=${department}` : '/booking';
  const defaultPrimaryLabel = department ? `Book ${department} Consultation` : 'Book In-Clinic Appointment';

  const finalPrimaryHref = primaryAction?.href || defaultPrimaryHref;
  const finalPrimaryLabel = primaryAction?.label || defaultPrimaryLabel;

  const whatsappMessage = department
    ? `Hello PRALASH Clinic, I would like to schedule an in-clinic consultation for ${department} services.`
    : 'Hello PRALASH Clinic, I would like to schedule an in-clinic consultation.';

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-brand-primary via-brand-primary to-brand-secondary text-white py-16 sm:py-20">
      {/* Subtle ambient lighting circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-secondary/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {badgeText && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold backdrop-blur-xs shadow-xs">
            <HeartHandshake className="w-4 h-4 text-brand-badge-bg shrink-0" />
            <span>{badgeText}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] max-w-3xl mx-auto">
          {title}
        </h2>

        {description && (
          <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          {finalPrimaryHref.startsWith('/') ? (
            <Link href={finalPrimaryHref}>
              <Button
                variant="white"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5 text-brand-secondary" />}
              >
                {finalPrimaryLabel}
              </Button>
            </Link>
          ) : (
            <a href={finalPrimaryHref}>
              <Button
                variant="white"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5 text-brand-secondary" />}
              >
                {finalPrimaryLabel}
              </Button>
            </a>
          )}

          {showPhone && (
            <a href={`tel:${phone}`}>
              <Button
                variant="outline-white"
                size="lg"
                leftIcon={<Phone className="w-4 h-4 text-brand-badge-bg" />}
              >
                Call: {phone}
              </Button>
            </a>
          )}

          {showWhatsApp && (
            <a
              href={`https://wa.me/919900517699?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline-white"
                size="lg"
                leftIcon={<MessageSquare className="w-4 h-4 text-brand-badge-bg" />}
              >
                Chat on WhatsApp
              </Button>
            </a>
          )}
        </div>

        {addressNote && (
          <p className="text-xs text-white/70 pt-3 max-w-xl mx-auto">
            {addressNote}
          </p>
        )}
      </div>
    </section>
  );
};
