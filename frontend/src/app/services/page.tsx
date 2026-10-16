import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Stethoscope,
  Sparkles,
  Shield,
  Activity,
  ArrowRight,
  CheckCircle2,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Phone,
  ShieldCheck,
  Check,
  Zap,
  Microscope,
  Building,
} from 'lucide-react';
import { ALL_SERVICES_CATALOG, DENTAL_SERVICE, SKIN_SERVICE, HAIR_SERVICE, CLINIC_INFO } from '@/data/clinicData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'All Clinical Services | PRALASH Multi-Specialty Clinic Bangalore',
  description:
    'Explore PRALASH clinic services: 3D Guided Dental Implants, Clinical Dermatology, Bio-Sapphire Hair Restoration, and Laser Aesthetics in Kalyan Nagar, Bengaluru.',
  alternates: {
    canonical: 'https://pralash.com/services',
  },
};

export default function ServicesPage() {
  const MASTER_FAQS = [
    {
      id: 'faq-1',
      title: 'Do I need a doctor referral letter to book a consultation?',
      content:
        'No referral letter is needed. As a private multi-specialty center in Bengaluru, you can schedule an appointment directly with any of our consultant dental surgeons, dermatologists, or trichologists.',
    },
    {
      id: 'faq-2',
      title: 'Are treatments covered by health insurance or 0% EMI financing?',
      content:
        'Yes. We provide cashless insurance claims assistance for eligible maxillofacial surgeries, trauma care, and medical dermatology, alongside 0% interest EMI installment plans through leading Indian healthcare finance partners.',
    },
    {
      id: 'faq-3',
      title: 'How does treatment pricing and transparent fee structure work?',
      content:
        'We maintain strict financial transparency. Initial consultation fees are fixed and clearly stated upfront. Following your diagnostic scan, you will receive a comprehensive written plan with fixed procedural fees before any treatment commences.',
    },
    {
      id: 'faq-4',
      title: 'Are consultations conducted in private sterile suites?',
      content:
        'Every consultation and clinical procedure is conducted inside private, acoustically isolated, HEPA-filtered treatment suites designed for patient comfort, discretion, and absolute clinical sterility.',
    },
    {
      id: 'faq-5',
      title: 'What if I need multiple specialists across different departments?',
      content:
        'Our integrated 3-in-1 clinic model allows seamless cross-departmental coordination between our dental, skin, and trichology specialists under one roof, saving you from travelling between multiple separate clinics.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd
        type="FAQPage"
        data={{
          faqs: MASTER_FAQS.map((f) => ({ question: f.title, answer: f.content })),
        }}
      />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-12 lg:py-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtitle, CTAs & Key Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-secondary" />
                <span>NABH Accredited Multi-Specialty Clinical Center · Bengaluru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
                Advanced Clinical Specialties &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Diagnostic Suites
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                PRALASH unites three clinical disciplines under one roof: 3D Guided Dentistry, Evidence-Based Dermatology, and Bio-Sapphire Hair Restoration. Every procedure is performed exclusively by senior consultants with transparent rupee pricing.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/booking">
                  <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                    Book In-Clinic Consultation
                  </Button>
                </Link>
                <a href={`tel:${CLINIC_INFO.phone}`}>
                  <Button variant="outline" size="md" leftIcon={<Phone className="w-4 h-4 text-brand-secondary" />}>
                    Call: {CLINIC_INFO.phone}
                  </Button>
                </a>
              </div>

              {/* 4 Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">3-in-1 Center</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Dental, Skin &amp; Hair</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-secondary">15+ Yrs</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Senior Experience</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">Class-B</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Hospital Sterility</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">0% EMI</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Zero-Interest Plans</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Clinical Suite Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border border-brand-border/90 bg-brand-surface shadow-xl group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="/treatment-room.webp"
                    alt="PRALASH Multi-Specialty Clinical Operatory and Treatment Suite"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Top Left Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface/95 backdrop-blur-md border border-brand-border/60 shadow-md text-xs font-bold text-brand-primary">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>Hospital Grade Suites</span>
                    </div>
                  </div>

                  {/* Top Right Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-black/85 backdrop-blur-md border border-brand-border/60 shadow-md text-xs font-bold text-brand-primary">
                      <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>HEPA Filtered</span>
                    </div>
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-extrabold tracking-wide text-white">
                        PRALASH Clinical Suites
                      </div>
                      <div className="text-[11px] text-white/80">
                        Acoustically Isolated Operatories
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-brand-secondary text-white shadow-xs">
                      HRBR Layout
                    </span>
                  </div>
                </div>

                {/* Sub-card assurance footer */}
                <div className="p-3.5 sm:p-4 bg-brand-surface border-t border-brand-border/60 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 border border-brand-secondary/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-primary text-[11px]">Direct Doctor Care</div>
                      <div className="text-[10px] text-brand-muted">No intern handoffs</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 border border-brand-secondary/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-primary text-[11px]">Class-B Autoclave</div>
                      <div className="text-[10px] text-brand-muted">Vacuum sterilized</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE PRIMARY CLINICAL CENTERS OF EXCELLENCE */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              Centers of Excellence
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Integrated Multi-Specialty Clinical Suites
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Select your required department to view specialized procedural capabilities, senior consultant profiles, and transparent fee guides.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* DENTAL SUITE */}
            <article className="rounded-3xl border border-brand-border/90 bg-brand-surface overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                    alt="Dental and Oral Surgery Center at PRALASH"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-primary shadow-xs border border-brand-border/60">
                      Suite 01 · Dental
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <div className="text-base font-black tracking-wide">
                      Dental &amp; Oral Implantology Suite
                    </div>
                    <div className="text-xs text-white/80 mt-0.5">
                      Lead: Dr. Shubha C. N. &amp; Prof. Dr. Lalith V. Anand
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Advanced 3D computer-guided implantology, Invisalign clear aligners, porcelain cosmetic veneers, and single-visit microscopic painless root canal therapy.
                  </p>

                  <div className="space-y-2 pt-1 border-t border-brand-border/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary block">
                      Core Treatments &amp; Starting Fees
                    </span>
                    {DENTAL_SERVICE.treatments.slice(0, 4).map((t, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-0.5">
                        <span className="font-semibold text-brand-text truncate pr-2">
                          {t.name.split('(')[0]}
                        </span>
                        <span className="text-brand-secondary font-bold shrink-0">
                          From ₹{t.priceFrom.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {['3D CBCT Guided', 'Zeiss Microscope', 'Single-Visit RCT'].map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-surface-low text-brand-text border border-brand-border/60"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-brand-border/60">
                  <Link href="/services/dental" className="block">
                    <Button variant="secondary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Dental Suite ({DENTAL_SERVICE.treatments.length})
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* SKIN SUITE */}
            <article className="rounded-3xl border border-brand-border/90 bg-brand-surface overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000"
                    alt="Clinical Dermatology and Laser Aesthetics Suite at PRALASH"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-primary shadow-xs border border-brand-border/60">
                      Suite 02 · Skin
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <div className="text-base font-black tracking-wide">
                      Clinical Dermatology &amp; Laser Suite
                    </div>
                    <div className="text-xs text-white/80 mt-0.5">
                      Lead: Dr. Premalatha V. (MD Dermatology)
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Consultant medical dermatology, fractional CO2 laser scar remodeling, stubborn melasma depigmentation, medical-grade chemical peels, and vitiligo surgeries.
                  </p>

                  <div className="space-y-2 pt-1 border-t border-brand-border/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary block">
                      Core Treatments &amp; Starting Fees
                    </span>
                    {SKIN_SERVICE.treatments.slice(0, 4).map((t, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-0.5">
                        <span className="font-semibold text-brand-text truncate pr-2">
                          {t.name.split('(')[0]}
                        </span>
                        <span className="text-brand-secondary font-bold shrink-0">
                          From ₹{t.priceFrom.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {['Q-Switched Laser', 'Fractional CO2', 'Dermoscopy'].map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-surface-low text-brand-text border border-brand-border/60"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-brand-border/60">
                  <Link href="/services/skin" className="block">
                    <Button variant="secondary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Skin Suite ({SKIN_SERVICE.treatments.length})
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* HAIR SUITE */}
            <article className="rounded-3xl border border-brand-border/90 bg-brand-surface overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000"
                    alt="Trichology and Hair Restoration Suite at PRALASH"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-primary shadow-xs border border-brand-border/60">
                      Suite 03 · Hair
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <div className="text-base font-black tracking-wide">
                      Bio-Sapphire Trichology &amp; Hair Suite
                    </div>
                    <div className="text-xs text-white/80 mt-0.5">
                      Lead: Dr. Priya Patel (Certified ISHRS)
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Certified hair restoration surgeons performing microscopic Bio-Sapphire FUE transplants, closed-system autologous GFC &amp; PRP therapies, and FotoFinder scalp analysis.
                  </p>

                  <div className="space-y-2 pt-1 border-t border-brand-border/60">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary block">
                      Core Treatments &amp; Starting Fees
                    </span>
                    {HAIR_SERVICE.treatments.slice(0, 4).map((t, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-0.5">
                        <span className="font-semibold text-brand-text truncate pr-2">
                          {t.name.split('(')[0]}
                        </span>
                        <span className="text-brand-secondary font-bold shrink-0">
                          From ₹{t.priceFrom.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {['Sapphire Micro-Punch', 'GFC Closed Centrifuge', 'Trichoscopy'].map((badge, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-surface-low text-brand-text border border-brand-border/60"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-brand-border/60">
                  <Link href="/services/hair" className="block">
                    <Button variant="secondary" size="md" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Hair Suite ({HAIR_SERVICE.treatments.length})
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* CLINICAL STERILIZATION & FACILITY TECHNOLOGY */}
      <section className="w-full py-16 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              Hospital Grade Standards
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Clinical Technology &amp; Surgical Safety
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              We invest in hospital-grade instrumentation so every patient benefits from maximum safety and rapid healing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <ShieldCheck className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Class-B Vacuum Autoclaves</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Hospital-grade fractional vacuum sterilization cycles and color-coded sterile pouches verified before every surgery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <Microscope className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Low-Dose 3D CBCT Imaging</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                High-resolution diagnostic volumetric scans with 80% lower radiation than standard medical CT scanners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <Zap className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">US-FDA Cleared Lasers</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Precision Q-switched and fractional ablative wavelengths calibrated safely for Indian skin types (Fitzpatrick IV–VI).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <Building className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Private Acoustically Sealed Suites</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                HEPA-filtered treatment operatories ensuring total medical discretion, noise cancellation, and sterile air circulation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTHCARE FINANCING & 0% EMI STRIP */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-surface border border-brand-border/90 rounded-3xl p-8 sm:p-12 shadow-xs">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="sm">
                Financial Assistance
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
                Transparent Rupee Pricing &amp; 0% Healthcare EMI Plans
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                PRALASH partners with leading Indian healthcare financing networks to ensure advanced treatments remain accessible through zero-interest monthly installments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-brand-border/60">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-primary">
                  <CreditCard className="w-4 h-4 text-brand-secondary" />
                  <span>Fixed Procedure Fees</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Every treatment has an itemized cost estimate. No hidden facility fees or surprise charges.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-primary">
                  <FileText className="w-4 h-4 text-brand-secondary" />
                  <span>Cashless Insurance Assistance</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Support desk for eligible maxillofacial surgeries, trauma repairs, and medical dermatology claims.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-primary">
                  <Calendar className="w-4 h-4 text-brand-secondary" />
                  <span>0% Interest EMI Installments</span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Flexible 3, 6, and 12-month zero-interest payment plans with instant digital approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL FAQ ACCORDION */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <Badge variant="secondary" size="md">
              Patient Guidance
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Frequently Asked Questions About Treatments
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Everything you need to know about booking, treatment suitability, and clinical guarantees.
            </p>
          </div>

          <Accordion items={MASTER_FAQS} />
        </div>
      </section>

      {/* BOTTOM BOOKING CTA */}
      <section className="w-full py-16 bg-brand-surface-low border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Ready to Consult With Our Senior Specialists?
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-lg mx-auto">
              Schedule your in-clinic consultation at HRBR Layout, Kalyan Nagar with direct access to our clinical directors.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/booking">
              <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Book In-Clinic Consultation
              </Button>
            </Link>
            <a href={`tel:${CLINIC_INFO.phone}`}>
              <Button variant="outline" size="lg" leftIcon={<Phone className="w-5 h-5 text-brand-secondary" />}>
                Call Desk: {CLINIC_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

