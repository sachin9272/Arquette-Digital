import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  SunMedium,
  Check,
} from 'lucide-react';
import { SKIN_SERVICE, DOCTORS } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Skin Treatments & Dermatology | Laser & Medical Aesthetics Bangalore',
  description:
    'PRALASH Dermystique in HRBR Layout, Kalyan Nagar, Bengaluru. Fractional CO2 laser resurfacing, HydraFacial, medical acne scar revision, Cosmelan depigmentation, and laser hair reduction.',
  alternates: {
    canonical: 'https://pralash.com/services/skin',
  },
};

export default function SkinTreatmentsPage() {
  const skinDoctors = DOCTORS.filter((d) => d.department === 'Skin');

  const CARE_STEPS = [
    {
      phase: 'Pre-Procedure',
      title: 'Skin Preparation Protocol',
      points: [
        'Discontinue topical retinoids, AHA/BHA acids, and scrubs 5 days prior.',
        'Avoid active direct UV exposure, tanning beds, or spray tans for 2 weeks.',
        'Inform your consultant of any oral isotretinoin (Accutane) usage in the last 6 months.',
      ],
    },
    {
      phase: 'Post-Procedure',
      title: 'Barrier Recovery & Protection',
      points: [
        'Apply prescribed post-laser occlusive healing balms as directed.',
        'Wear broad-spectrum SPF 50+ containing zinc oxide and iron oxides daily.',
        'Avoid saunas, steam rooms, rigorous workouts, and heavy makeup for 72 hours.',
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd
        type="MedicalProcedure"
        data={{
          name: SKIN_SERVICE.title,
          description: SKIN_SERVICE.description,
          procedureType: 'DermatologicalTreatment',
        }}
      />

      {/* Hero Header */}
      <section className="relative w-full overflow-hidden bg-brand-surface-low border-b border-brand-border/60 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-badge-bg/40 text-brand-badge-text border border-brand-badge-bg/60 w-fit">
                <Sparkles className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs uppercase tracking-wider font-extrabold">
                  06 Skin Suite &bull; Medical Dermatology
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight leading-tight">
                {SKIN_SERVICE.title}
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
                {SKIN_SERVICE.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/booking?dept=Skin">
                  <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5 text-brand-badge-bg" />}>
                    Book Dermatology Consult
                  </Button>
                </Link>
                <a href="#skin-catalog">
                  <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Skin Treatments
                  </Button>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>British Association of Dermatologists Registered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>FotoFinder Digital Full-Body Dermoscopy</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-surface">
                <Image
                  src={SKIN_SERVICE.heroImage}
                  alt="Dermatology laser consultation suite at Arquette Clinic"
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
      <section id="skin-catalog" className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Formulations & Lasers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Evidence-Based Dermatological Protocols
            </h2>
            <p className="text-sm text-brand-muted">
              Prescription-grade treatments formulated for inflammatory acne, chronic melasma, and collagen regeneration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKIN_SERVICE.treatments.map((treatment, idx) => (
              <div
                key={idx}
                className="bg-brand-surface-card border border-brand-border rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-brand-secondary/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                      Dermatology Care
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
                  <Link href={`/booking?dept=Skin&treatment=${encodeURIComponent(treatment.name)}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Book This Treatment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Acne Scar Slider */}
      <section className="w-full py-20 bg-brand-background border-y border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Case Study
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Fractional CO2 Laser Scar Resurfacing
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Slide to observe epidermal smoothing and dermal collagen remodelling.
            </p>
          </div>

          <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1512290900672-1f55b9659f4d?auto=format&fit=crop&q=80&w=800"
              afterImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
              treatmentName="Multi-Pass Fractional Laser for Boxcar & Rolling Acne Scars"
              timeframe="Results 12 weeks post 3rd treatment by Dr. Sarah Jenkins"
              disclaimer="Standardized photographic protocol. Results vary based on scar depth, Fitzpatrick phototype, and patient compliance."
            />
          </div>
        </div>
      </section>

      {/* Pre & Post Care Directive Cards */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Safety
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Pre & Post-Procedure Care Guidelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARE_STEPS.map((care, i) => (
              <div key={i} className="p-6 rounded-2xl bg-brand-surface-low border border-brand-border shadow-xs space-y-4">
                <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider block">
                  {care.phase}
                </span>
                <h3 className="text-lg font-bold text-brand-text">{care.title}</h3>
                <ul className="space-y-2 text-xs text-brand-muted">
                  {care.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dermatology Doctors */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Consultant Faculty
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Senior Consultant Dermatologists
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skinDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Dermatology FAQs */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Dermatology Q&A
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Skin Care FAQs
            </h2>
          </div>

          <Accordion
            items={SKIN_SERVICE.faqs.map((f, i) => ({
              id: `skin-faq-${i}`,
              title: f.question,
              content: f.answer,
            }))}
          />
        </div>
      </section>
    </div>
  );
}
