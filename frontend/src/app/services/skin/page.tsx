import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Phone,
  Shield,
  Activity,
  Check,
  Zap,
  CreditCard,
  HeartHandshake,
  Award,
  HelpCircle,
  SunMedium,
  Microscope,
} from 'lucide-react';
import { SKIN_SERVICE, DOCTORS, CLINIC_INFO } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { ConsultationCtaBanner } from '@/components/clinic/ConsultationCtaBanner';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Advanced Medical Dermatology & Laser Suite | PRALASH Dermystique Bangalore',
  description:
    'PRALASH Dermystique in HRBR Layout, Kalyan Nagar, Bengaluru. Led by Co-Founder Dr. Premalatha V. Specialized in Fractional CO2 lasers, medical acne scar revision, Cosmelan depigmentation, and HydraFacial MD.',
  alternates: {
    canonical: 'https://pralash.com/services/skin',
  },
};

export default function SkinTreatmentsPage() {
  const skinDoctors = DOCTORS.filter((d) => d.department === 'Skin' && d.isActive !== false);

  const SKIN_PILLARS = [
    {
      icon: Zap,
      title: 'Fractional CO2 & Erbium Resurfacing',
      description:
        'Ablative and sub-ablative micro-fractional laser columns penetrate deep into the reticular dermis to remodel stubborn boxcar and rolling acne scars.',
      tag: 'Scar Remodelling',
    },
    {
      icon: SunMedium,
      title: 'Cosmelan® Medical Depigmentation',
      description:
        'World-benchmark enzymatic protocol targeting deep melasma, stubborn sunspots, and post-inflammatory hyperpigmentation tailored for Indian skin tones.',
      tag: 'Melasma & Pigment',
    },
    {
      icon: Sparkles,
      title: 'HydraFacial Elite MD® Platform',
      description:
        'Patented 4-in-1 vortex-fusion system providing deep pore extractions, gentle salicylic exfoliation, and targeted antioxidant hyaluronic infusion.',
      tag: 'Pore Clarification',
    },
    {
      icon: Microscope,
      title: 'Digital Dermoscopy & Mole Mapping',
      description:
        'High-resolution polarized surface microscopy for computer-assisted lesion inspection, atypical nevus monitoring, and skin cancer surveillance.',
      tag: 'Diagnostic Dermoscopy',
    },
  ];

  const CARE_STEPS = [
    {
      phase: 'Pre-Procedure Protocol',
      title: 'Skin Preparation & Safety Guidelines',
      points: [
        'Discontinue topical retinoids, tretinoin, AHA/BHA exfoliants, and benzoyl peroxide 5 days prior to treatment.',
        'Avoid direct active sun exposure, tanning beds, and chemical tanning lotions for at least 2 weeks.',
        'Notify your dermatologist of any oral isotretinoin (Accutane) therapy undertaken within the last 6 months.',
        'Ensure skin is free from active bacterial infections, open abrasions, or cold sore outbreaks on the day of treatment.',
      ],
    },
    {
      phase: 'Post-Procedure Protocol',
      title: 'Barrier Recovery & Photo-Protection',
      points: [
        'Apply prescribed post-procedure soothing occlusive balms or ceramide recovery creams 3 times daily as instructed.',
        'Apply medical-grade broad-spectrum physical sunscreen (SPF 50+ PA++++) every 3 to 4 hours without fail.',
        'Avoid hot saunas, steam baths, intense cardiovascular workouts, and swimming pools for 72 hours.',
        'Do not pick, scratch, or physically exfoliate micro-crusts; allow natural epidermal renewal over 4 to 7 days.',
      ],
    },
  ];

  const PATIENT_JOURNEY = [
    {
      step: '01',
      title: 'Polarized Dermoscopic Assessment',
      description:
        'Our consultant dermatologist conducts high-magnification skin analysis under polarized light to assess sebum production, scar depth, and melanin distribution.',
      detail: 'In-depth diagnostic triage tailored to your Fitzpatrick phototype',
    },
    {
      step: '02',
      title: 'Customized Medical Formulation',
      description:
        'We formulate an evidence-based procedural plan with transparent Rupee pricing, combining energy-based lasers, medical peels, or autologous infusions.',
      detail: 'Itemized procedural cost with zero unexpected add-ons',
    },
    {
      step: '03',
      title: 'Precision Clinical Procedure',
      description:
        'Your treatment is performed inside our sterile dermatology suite utilizing US FDA-approved laser platforms with integrated dynamic epidermal cooling.',
      detail: 'Maximum comfort with medical topical numbing protocols',
    },
    {
      step: '04',
      title: 'Barrier Restoration & Follow-up',
      description:
        'Receive a medical post-care recovery kit with continuous barrier monitoring, follow-up photographic reviews, and long-term skincare maintenance.',
      detail: 'Dedicated clinical support throughout your recovery',
    },
  ];

  const SKIN_TESTIMONIALS = [
    {
      name: 'Pooja Hegde',
      location: 'Kalyan Nagar, Bengaluru',
      procedure: 'Fractional CO2 Laser for Acne Scars',
      quote:
        'I struggled with deep rolling acne scars on both cheeks for over 6 years. Dr. Premalatha designed a 3-session fractional laser plan combined with subcision. My skin texture has leveled out dramatically and I no longer need heavy foundation. The care here is exceptional.',
      rating: 5,
    },
    {
      name: 'Vikas Rao',
      location: 'HRBR Layout, Bengaluru',
      procedure: 'Targeted Medical Acne Protocol',
      quote:
        'After trying dozens of over-the-counter serums that only made my cystic acne worse, Dr. Premalatha’s clinical medical approach finally cleared my flare-ups in 8 weeks. The combination of gentle peels and prescription therapy worked wonders.',
      rating: 5,
    },
    {
      name: 'Sunita Sharma',
      location: 'Kammanahalli, Bengaluru',
      procedure: 'Cosmelan® Depigmentation Treatment',
      quote:
        'My hormonal melasma had darkened after my pregnancy. The Cosmelan protocol at PRALASH Dermystique was meticulously supervised. Within a month, the dark patches faded by more than 80%. Dr. Elena and Dr. Premalatha are truly gifted clinicians.',
      rating: 5,
    },
  ];

  const EXPANDED_FAQS = [
    {
      question: 'What is the difference between a salon aesthetic facial and medical dermatology?',
      answer:
        'Medical dermatology treatments at PRALASH Dermystique are designed and performed exclusively by certified MD dermatologists (IADVL & CDSI registered). We utilize US FDA-approved medical-class laser platforms and prescription formulations that penetrate deep into the dermis to alter cellular biology, unlike superficial salon facials that only polish the outer stratum corneum.',
    },
    {
      question: 'How many sessions are typically required for noticeable acne scar improvement?',
      answer:
        'Most moderate to deep acne scar cases (boxcar, rolling, and icepick scars) achieve 60% to 80% visible scar depth reduction over a protocol of 3 to 4 fractional laser sessions spaced 5 to 6 weeks apart. Collagen remodeling continues for up to 6 months following your final treatment.',
    },
    {
      question: 'Are chemical peels and lasers safe for deeper Indian skin tones (Fitzpatrick IV-VI)?',
      answer:
        'Yes, absolutely. We specialize in multicultural clinical dermatology. We utilize specific non-ablative pulse durations, sub-millisecond lasers, and gentle multi-acid formulations (such as mandelic, lactic, and azelaic acid blends) with aggressive epidermal chilling to eliminate the risk of post-inflammatory hyperpigmentation (PIH).',
    },
    {
      question: 'What is the recovery downtime for Fractional CO2 Laser resurfacing?',
      answer:
        'Following Fractional CO2 laser resurfacing, you can expect mild redness and a sensation similar to a sunburn for 24 to 48 hours. Microscopic epidermal crusted dots form over days 2 to 4 and gently slough off by day 5 to 7, revealing fresh, smoother skin underneath. Most patients resume work by day 3 or 4 with mineral sunscreen.',
    },
    {
      question: 'Does PRALASH offer 0% EMI financing for extensive aesthetic or scar packages?',
      answer:
        'Yes. For multi-session laser scar revision, full-face Cosmelan protocols, and combined aesthetic packages, we provide transparent 0% interest EMI installment options through leading Indian healthcare finance partners.',
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

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-12 lg:py-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, CTAs & Key Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-brand-secondary" />
                <span>CDSI &amp; IADVL Registered · US FDA-Approved Laser Suite · Bengaluru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
                Evidence-Based Clinical Dermatology &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Laser Aesthetics
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                PRALASH Dermystique integrates US FDA-approved Fractional CO2 &amp; Erbium lasers, Lutronic Ultra™, original HydraFacial MD®, and Cosmelan® depigmentation. Led by Co-Founder Dr. Premalatha V. for acne scar remodeling, stubborn melasma, and skin barrier longevity.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link href="/booking?dept=Skin" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<Calendar className="w-5 h-5 text-brand-badge-bg" />}>
                    Book Dermatology Consult
                  </Button>
                </Link>
                <a href="#skin-catalog" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore 6 Treatments
                  </Button>
                </a>
                <a href={`tel:${CLINIC_INFO.phone}`} className="sm:hidden w-full">
                  <Button variant="secondary" size="md" className="w-full" leftIcon={<Phone className="w-4 h-4" />}>
                    Call Skin Desk
                  </Button>
                </a>
              </div>

              {/* 4 Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">16+ Yrs</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Senior MD Dermatologist</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-secondary">US FDA</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Approved Laser Suite</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">Type IV-VI</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Indian Skin Calibration</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">0% EMI</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Flexible Rupee Plans</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Clinical Laser Suite Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border border-brand-border/90 bg-brand-surface shadow-2xl group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="/images/dermatology-laser-suite.jpg"
                    alt="PRALASH Dermystique luxury dermatology laser operatory with Lutronic laser, HydraFacial MD, and digital dermoscopy display"
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
                      <span>US FDA Laser Operatory</span>
                    </div>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>Lutronic &amp; Fotona Platforms</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300">
                      <span>★ 4.98</span>
                      <span className="text-white/80 font-normal">(380+ Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Card Strip */}
                <div className="p-4 bg-brand-surface flex items-center justify-between text-xs text-brand-muted border-t border-brand-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                    <span className="font-semibold text-brand-text">Sterile Dermatology Suite Active</span>
                  </div>
                  <span className="font-medium text-brand-muted">Kalyan Nagar, Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Infrastructure Pillars */}
      <section className="w-full py-16 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Dermatological Science
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-primary tracking-tight">
              Medical-Grade Platforms for Cellular Skin Transformation
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every skin protocol at PRALASH Dermystique is performed with certified medical-grade lasers and active compounds calibrated to your specific barrier threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKIN_PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-brand-surface-card border border-brand-border/80 hover:border-brand-secondary/40 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-brand-badge-bg text-brand-secondary flex items-center justify-center border border-brand-secondary/20 group-hover:scale-105 transition-transform">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand-surface text-brand-muted border border-brand-border/60">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-brand-primary leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-brand-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Treatments Catalog */}
      <section id="skin-catalog" className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Formulations &amp; Lasers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Evidence-Based Dermatological Protocols
            </h2>
            <p className="text-sm text-brand-muted">
              Transparent starting fees in Indian Rupees, expected procedural duration, and recovery guidelines. Written consultation plan provided after examination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SKIN_SERVICE.treatments.map((treatment, idx) => {
              const categoryTags = [
                'Acne Scar & Resurfacing',
                'Medical Acne Triage',
                'Pigmentation & Melasma',
                'Medical Facial Infusion',
                'Preventative Dermoscopy',
                'Bio-Remodelling',
              ];
              const tag = categoryTags[idx] || 'Dermatology Care';

              return (
                <div
                  key={idx}
                  className="bg-brand-surface border border-brand-border/80 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-xl hover:border-brand-secondary/40 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category Tag & Price */}
                    <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                      <span className="text-xs font-black text-brand-secondary uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-badge-bg border border-brand-secondary/20">
                        {tag}
                      </span>
                      <div className="text-right">
                        <div className="text-[10px] text-brand-muted font-bold uppercase tracking-wider">Starting From</div>
                        <div className="text-lg font-black text-brand-primary">
                          ₹{treatment.priceFrom.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Treatment Name & Description */}
                    <div>
                      <h3 className="text-lg font-black text-brand-primary group-hover:text-brand-secondary transition-colors leading-snug">
                        {treatment.name}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed mt-2">
                        {treatment.description}
                      </p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="space-y-2 pt-3 text-xs border-t border-brand-border/60 bg-brand-surface-low/50 p-3 rounded-2xl">
                      <div className="flex items-start gap-1.5">
                        <span className="font-bold text-brand-primary shrink-0">Ideal For:</span>
                        <span className="text-brand-muted leading-tight">{treatment.idealFor}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                        <span className="font-bold text-brand-primary">Duration:</span>
                        <span className="text-brand-muted">{treatment.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                        <span className="font-bold text-brand-primary">Recovery:</span>
                        <span className="text-brand-muted">{treatment.recovery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <div className="pt-6 mt-6 border-t border-brand-border/60">
                    <Link href={`/booking?dept=Skin&treatment=${encodeURIComponent(treatment.name)}`}>
                      <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Book This Treatment
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Guarantee Strip */}
          <div className="mt-12 p-6 rounded-3xl bg-brand-surface border border-brand-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-badge-bg text-brand-secondary flex items-center justify-center shrink-0 border border-brand-secondary/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-brand-primary">
                  100% Transparent Rupee Pricing &amp; 0% Interest EMI Plans
                </h4>
                <p className="text-xs text-brand-muted">
                  Fixed procedural quotations provided in writing. Zero hidden diagnostic fees or compulsory salon product upsells.
                </p>
              </div>
            </div>
            <Link href="/contact" className="shrink-0 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full">
                Inquire About Dermatology EMI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Before / After Case Study */}
      <section className="w-full py-20 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Evidence &amp; Case Study
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Fractional CO2 Laser Scar Resurfacing
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto">
              Slide horizontally to observe dermal collagen remodeling, scar depth elevation, and epidermal smoothing over 12 weeks.
            </p>
          </div>

          <div className="bg-brand-surface-card border border-brand-border/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <BeforeAfterSlider
              beforeImage="/images/skin-scar-before.jpg"
              afterImage="/images/skin-scar-after.jpg"
              beforeAlt="Before fractional CO2 laser acne scar resurfacing"
              afterAlt="After fractional CO2 laser acne scar resurfacing result"
              treatmentName="Multi-Pass Fractional Laser for Boxcar & Rolling Acne Scars"
              timeframe="Results 12 weeks post 3rd treatment · Performed by Dr. Premalatha V. at PRALASH Dermystique"
              disclaimer="Standardized clinical photography taken under cross-polarized clinic illumination at PRALASH Dermystique. Individual results depend on scar depth, age, Fitzpatrick phototype, and compliance with prescribed post-procedure barrier balms."
            />

            {/* Case Study Details Strip */}
            <div className="mt-8 pt-6 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-primary">70% - 80% Elevation</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Boxcar &amp; Rolling Scars</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-secondary">3 Clinical Sessions</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Spaced 6 Weeks Apart</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-primary">Zero PIH</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Calibrated Indian Skin Protocol</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Journey: The PRALASH 4-Step Protocol */}
      <section className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Protocol
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Your Dermatology Journey at PRALASH
            </h2>
            <p className="text-sm text-brand-muted">
              From polarized diagnostic mapping to post-laser barrier repair, every phase is medically supervised by certified consultant dermatologists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PATIENT_JOURNEY.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary text-white font-black text-base flex items-center justify-center shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="text-base font-black text-brand-primary leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-brand-border/60">
                  <span className="text-[11px] font-bold text-brand-secondary">
                    &bull; {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre & Post Care Directive Cards */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Safety &amp; Recovery
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Pre &amp; Post-Procedure Care Guidelines
            </h2>
            <p className="text-sm text-brand-muted max-w-xl mx-auto">
              Follow these dermatologist-prescribed guidelines to safeguard your skin barrier and ensure optimal collagen synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CARE_STEPS.map((care, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-brand-surface-card border border-brand-border/80 shadow-xs space-y-4"
              >
                <span className="text-xs font-black text-brand-secondary uppercase tracking-wider block">
                  {care.phase}
                </span>
                <h3 className="text-lg font-black text-brand-primary">{care.title}</h3>
                <ul className="space-y-3 text-xs text-brand-muted pt-2 border-t border-brand-border/60">
                  {care.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Dermatology Faculty */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Consultant Faculty
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Our Consultant Dermatologists
            </h2>
            <p className="text-sm text-brand-muted">
              All dermatological consultations and procedural sessions are directed exclusively by board-certified specialists with recognized postgraduate qualifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skinDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                featured={doc.id === 'dr-premalatha-v'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Real Patient Skin Testimonials */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Patient Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Verified Dermatology Patient Experiences
            </h2>
            <p className="text-sm text-brand-muted">
              Read how our personalized medical protocols and laser expertise have resolved chronic skin concerns across Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {SKIN_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-brand-surface-card border border-brand-border/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-text leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-brand-border/60">
                  <div className="font-bold text-brand-primary text-sm">{t.name}</div>
                  <div className="text-xs text-brand-secondary font-semibold">{t.procedure}</div>
                  <div className="text-[11px] text-brand-muted">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dermatology FAQs */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Dermatology Q&amp;A
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Skin Care FAQs
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
              Everything you need to know about laser safety, downtime, chemical peel protocols, and long-term barrier health.
            </p>
          </div>

          <Accordion
            items={EXPANDED_FAQS.map((f, i) => ({
              id: `skin-faq-${i}`,
              title: f.question,
              content: f.answer,
            }))}
          />
        </div>
      </section>

      {/* Final Booking & Consultation Banner */}
      <ConsultationCtaBanner
        department="Skin"
        title="Schedule Your Clinical Dermatology Consultation in Bengaluru"
        description="Experience evidence-based medical dermatology, US FDA-approved lasers, and personalized care at PRALASH Dermystique in HRBR Layout, Kalyan Nagar."
      />
    </div>
  );
}
