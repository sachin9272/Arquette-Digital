import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Smile,
  ArrowRight,
} from 'lucide-react';
import { DENTAL_SERVICE, DOCTORS } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Dental Treatments & Aligners | Precision Dentistry Bangalore',
  description:
    'PRALASH Dentique in HRBR Layout, Kalyan Nagar, Bengaluru. Specialized in 3D-guided dental implants, clear aligners, porcelain veneers, digital RVG, and painless single-sitting root canals.',
  alternates: {
    canonical: 'https://pralash.com/services/dental',
  },
};

export default function DentalTreatmentsPage() {
  const dentalDoctors = DOCTORS.filter((d) => d.department === 'Dental');

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd
        type="MedicalProcedure"
        data={{
          name: DENTAL_SERVICE.title,
          description: DENTAL_SERVICE.description,
          procedureType: 'DentalSurgery',
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-brand-surface-low border-b border-brand-border/60 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-badge-bg/40 text-brand-badge-text border border-brand-badge-bg/60 w-fit">
                <Stethoscope className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs uppercase tracking-wider font-extrabold">
                  05 Dental Suite &bull; Harley & Mayfair
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight leading-tight">
                {DENTAL_SERVICE.title}
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
                {DENTAL_SERVICE.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/booking?dept=Dental">
                  <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5 text-brand-badge-bg" />}>
                    Book Dental Consultation
                  </Button>
                </Link>
                <a href="#treatments-catalog">
                  <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Procedure Catalog
                  </Button>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>General Dental Council (GDC) Accredited</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>Computer-Guided Painless Wand Anesthesia</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-surface">
                <Image
                  src={DENTAL_SERVICE.heroImage}
                  alt="Modern private dental surgery suite in Bengaluru clinic"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Catalog */}
      <section id="treatments-catalog" className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Procedures & Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Specialized Dental Procedures
            </h2>
            <p className="text-sm text-brand-muted">
              Transparent procedural fees, expected treatment durations, and recovery guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DENTAL_SERVICE.treatments.map((treatment, idx) => (
              <div
                key={idx}
                className="bg-brand-surface-card border border-brand-border rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-brand-secondary/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                      Dental Procedure
                    </span>
                    <span className="text-base font-black text-brand-primary">
                      From ₹{treatment.priceFrom.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-text leading-snug">
                    {treatment.name}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {treatment.description}
                  </p>

                  <div className="space-y-2 pt-2 text-xs border-t border-brand-border/60">
                    <div className="flex items-start gap-1.5">
                      <span className="font-semibold text-brand-text shrink-0">Ideal For:</span>
                      <span className="text-brand-muted">{treatment.idealFor}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-brand-text">Duration:</span>
                      <span className="text-brand-muted">{treatment.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-brand-text">Recovery:</span>
                      <span className="text-brand-muted">{treatment.recovery}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border/60">
                  <Link href={`/booking?dept=Dental&treatment=${encodeURIComponent(treatment.name)}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Book This Procedure
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Slider Showcase */}
      <section className="w-full py-20 bg-brand-background border-y border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Evidence
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Interactive Smile Transformation Case Study
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Slide to examine the aesthetic and functional outcome of our porcelain veneer restorations.
            </p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
              afterImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
              treatmentName="Full Upper Arch Porcelain Veneers & Whitening"
              timeframe="Results after 3 appointments by Dr. Alistair Vance"
              disclaimer="Unretouched clinical case photograph. Individual dental outcomes depend on bone density, gingival architecture, and occlusion."
            />
          </div>
        </div>
      </section>

      {/* Dental Doctors */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Specialist Faculty
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Our Senior Dental Surgeons & Orthodontists
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Dental FAQs */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Questions & Answers
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Dental Treatment FAQs
            </h2>
          </div>

          <Accordion
            items={DENTAL_SERVICE.faqs.map((f, i) => ({
              id: `dental-faq-${i}`,
              title: f.question,
              content: f.answer,
            }))}
          />
        </div>
      </section>
    </div>
  );
}
