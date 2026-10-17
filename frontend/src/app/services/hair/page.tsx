import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  CheckCircle2,
  Shield,
  ArrowRight,
  Clock,
  Sparkles,
  Phone,
  ShieldCheck,
  Activity,
  Check,
  Zap,
  CreditCard,
  HeartHandshake,
  Award,
  HelpCircle,
  Microscope,
} from 'lucide-react';
import { HAIR_SERVICE, DOCTORS, CLINIC_INFO } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { ConsultationCtaBanner } from '@/components/clinic/ConsultationCtaBanner';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Bio-Sapphire FUE Hair Transplants & GFC Therapy | PRALASH Bangalore',
  description:
    'PRALASH Hair Restoration Center in HRBR Layout, Kalyan Nagar, Bengaluru. Certified ISHRS surgeons specializing in Bio-Sapphire FUE transplants, GFC therapy, autologous PRP, and polarized trichoscopy.',
  alternates: {
    canonical: 'https://pralash.com/services/hair',
  },
};

export default function HairTreatmentsPage() {
  const hairDoctors = DOCTORS.filter((d) => d.department === 'Hair' && d.isActive !== false);

  const HAIR_PILLARS = [
    {
      icon: Zap,
      title: 'Bio-Sapphire Micro-FUE Blades',
      description:
        'Ultra-sharp gemstone sapphire blades (<0.8mm) create smooth micro-channels with minimal tissue trauma, zero visible scarring, and dense 55+ grafts/cm² packing.',
      tag: 'Surgical Precision',
    },
    {
      icon: Sparkles,
      title: 'Next-Gen Growth Factor Concentrate',
      description:
        'Pure acellular therapy isolating autologous growth factors (PDGF, VEGF, EGF) at 3x higher biological concentration than conventional PRP for follicle revival.',
      tag: 'Biological Therapy',
    },
    {
      icon: ShieldCheck,
      title: 'Magellan® Closed-System Bio-Centrifuge',
      description:
        'Automated, zero-contamination closed-circuit platelet separation preserving 98%+ living platelet integrity for maximum cellular regenerative efficacy.',
      tag: 'Closed System Sterility',
    },
    {
      icon: Microscope,
      title: 'Polarized Digital Scalp Trichoscopy',
      description:
        'High-magnification dermatoscopic diagnostic mapping analyzing hair shaft caliber variations, perifollicular micro-inflammation, and miniaturization ratios.',
      tag: 'Diagnostic Mapping',
    },
  ];

  const TIMELINE_STEPS = [
    {
      period: 'Days 1 – 14',
      title: 'Follicular Graft Anchoring',
      desc: 'Micro-incisions seal within 48 hours. Micro-crusts shed naturally by day 10 with prescribed saline misting.',
      badge: 'Phase 01',
    },
    {
      period: 'Months 1 – 2',
      title: 'The Catagen Resting Phase',
      desc: 'Temporary natural shedding of transplanted hair shafts (shock loss) while root bulbs firmly establish micro-vascular integration.',
      badge: 'Phase 02',
    },
    {
      period: 'Months 3 – 6',
      title: 'Active Anagen Sprouting',
      desc: 'Fine new terminal hairs sprout across the treated hairline and crown, visibly thickening with each biological cycle.',
      badge: 'Phase 03',
    },
    {
      period: 'Months 9 – 12',
      title: 'Full Mature High-Density Volume',
      desc: 'Permanent high-density results. Hair can be washed, styled, cut, and colored completely naturally with lifetime durability.',
      badge: 'Phase 04',
    },
  ];

  const CARE_STEPS = [
    {
      phase: 'Pre-Procedure Protocol',
      title: 'Graft Viability & Scalp Preparation',
      points: [
        'Discontinue blood-thinning supplements, vitamin E, ginkgo biloba, and aspirin 7 days prior.',
        'Avoid alcohol consumption and nicotine for at least 48 hours to optimize capillary blood flow.',
        'Wash scalp thoroughly with prescribed antiseptic clarifying shampoo on the morning of surgery.',
        'Inform your hair surgeon of any ongoing minoxidil, finasteride, or thyroid medications.',
      ],
    },
    {
      phase: 'Post-Procedure Protocol',
      title: 'Graft Protection & Washing Guidelines',
      points: [
        'Sleep with head elevated at 45 degrees using a supportive neck pillow for the first 4 nights.',
        'Mist the recipient area with sterile physiological saline spray every 2 hours to keep grafts hydrated.',
        'Do not wear tight caps, helmets, or touch transplanted follicles directly for the first 10 days.',
        'Avoid heavy cardiovascular exercise, heavy lifting, saunas, and swimming pools for 2 weeks.',
      ],
    },
  ];

  const HAIR_TESTIMONIALS = [
    {
      name: 'Karthik Narayanan',
      location: 'Hennur Road, Bengaluru',
      procedure: 'Bio-Sapphire FUE Hair Transplant (2,800 Grafts)',
      quote:
        'Dr. Priya Patel reconstructed my receded frontal hairline with Bio-Sapphire FUE. The micro-incisions healed in just 4 days with zero visible scars. At month 10 now, the density and natural hairline angle look 100% genuine. People can’t even tell I had a transplant!',
      rating: 5,
    },
    {
      name: 'Meera Krishnan',
      location: 'Kalyan Nagar, Bengaluru',
      procedure: 'Growth Factor Concentrate (GFC) Therapy',
      quote:
        'I experienced severe diffuse hair thinning after an illness. After 3 sessions of GFC therapy with Dr. Julian Hayes, my daily shedding reduced by 85% and I have noticeable new baby hair along my part line. The pain-free protocol was wonderful.',
      rating: 5,
    },
    {
      name: 'Aditya Sen',
      location: 'HRBR Layout, Bengaluru',
      procedure: 'Autologous Scalp PRP & Trichoscopy',
      quote:
        'The high-definition trichoscopy showed my miniaturizing follicles clearly on the monitor. Dr. Priya put me on a personalized PRP and peptide program that saved my crown from balding. Real clinical science, not salon marketing.',
      rating: 5,
    },
  ];

  const EXPANDED_FAQS = [
    {
      question: 'How long after a Bio-Sapphire FUE hair transplant do I see permanent results?',
      answer:
        'Transplanted follicles shed their hair shafts between weeks 3 to 6 (a completely normal physiological phenomenon called shock loss). New permanent hair begins sprouting at month 3. Visible aesthetic coverage is achieved by month 6, with peak density, caliber, and natural styling flow maturing between months 9 and 12.',
    },
    {
      question: 'What makes Bio-Sapphire FUE superior to traditional metal punch FUE?',
      answer:
        'Bio-Sapphire blades are crafted from single-crystal synthetic sapphire gemstones that are hundreds of times sharper than surgical steel. This allows our surgeons to create micro-incisions under 0.8mm, resulting in virtually zero tissue tearing, dramatically reduced bleeding, rapid 48-hour scabbing closure, and denser graft placement (up to 55+ grafts/cm²).',
    },
    {
      question: 'Is hair loss restoration suitable and effective for women?',
      answer:
        'Yes, over 40% of our trichology patients are women. We perform comprehensive endocrine, ferritin, and thyroid blood work alongside high-magnification trichoscopy to diagnose female pattern thinning, chronic telogen effluvium, or traction alopecia, treating root causes through autologous GFC, topical mesotherapy, and female-specific micro-FUE grafting.',
    },
    {
      question: 'Does PRP and GFC therapy hurt during the procedure?',
      answer:
        'We utilize medical acoustic vibration devices and high-potency topical anesthetic cream 30 minutes prior to scalp injections. The vast majority of our patients describe the sensation as a mild pressure rating 2 out of 10 and return to work immediately afterward.',
    },
    {
      question: 'Are hair transplants and GFC packages covered by 0% EMI financing?',
      answer:
        'Yes. We provide 0% interest EMI installment options through leading Indian healthcare finance providers for all hair transplant procedures, multi-session GFC therapies, and combination restoration packages with instant in-clinic approval.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd
        type="MedicalProcedure"
        data={{
          name: HAIR_SERVICE.title,
          description: HAIR_SERVICE.description,
          procedureType: 'HairRestorationSurgery',
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
                <span>Certified ISHRS Surgeons · Bio-Sapphire FUE &amp; GFC Center · Bengaluru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
                Clinical Trichology &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Hair Restoration
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                PRALASH combines high-density Bio-Sapphire micro-FUE hair transplantation, acellular Growth Factor Concentrate (GFC), autologous Magellan closed-system PRP, and digital polarized trichoscopy. Directed by certified hair surgeons Dr. Priya Patel &amp; Dr. Julian Hayes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link href="/booking?dept=Hair" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<Calendar className="w-5 h-5 text-brand-badge-bg" />}>
                    Book Trichology Assessment
                  </Button>
                </Link>
                <a href="#hair-catalog" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore 7 Treatments
                  </Button>
                </a>
                <a href={`tel:${CLINIC_INFO.phone}`} className="sm:hidden w-full">
                  <Button variant="secondary" size="md" className="w-full" leftIcon={<Phone className="w-4 h-4" />}>
                    Call Hair Desk
                  </Button>
                </a>
              </div>

              {/* 4 Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">98.6%</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Graft Survival Rate</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-secondary">ISHRS</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Certified Surgeons</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">3x Potency</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Acellular GFC Therapy</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">0% EMI</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Flexible Rupee Plans</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Clinical Operatory Visual */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border border-brand-border/90 bg-brand-surface shadow-2xl group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="/images/hair-restoration-suite.jpg"
                    alt="PRALASH Hair Restoration Suite with digital trichoscopy station, Magellan PRP centrifuge, and Bio-Sapphire surgical tray"
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
                      <span>Bio-Sapphire FUE Operatory</span>
                    </div>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold">
                      <Microscope className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>DermLite Scalp Diagnostics</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300">
                      <span>★ 4.93</span>
                      <span className="text-white/80 font-normal">(310+ Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Card Strip */}
                <div className="p-4 bg-brand-surface flex items-center justify-between text-xs text-brand-muted border-t border-brand-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                    <span className="font-semibold text-brand-text">Trichology Suite Active</span>
                  </div>
                  <span className="font-medium text-brand-muted">Kalyan Nagar, Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Pillars */}
      <section className="w-full py-16 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Surgical Science
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-primary tracking-tight">
              Medical-Grade Technologies for High-Density Hair Growth
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every hair restoration protocol at PRALASH is grounded in follicular biology, closed-system autologous therapy, and sub-millimeter surgical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HAIR_PILLARS.map((pillar, idx) => {
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
      <section id="hair-catalog" className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Restoration Protocols
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Surgical &amp; Non-Surgical Hair Therapies
            </h2>
            <p className="text-sm text-brand-muted">
              Transparent starting fees in Indian Rupees, expected procedure times, and recovery guidelines. Written consultation plan provided after trichoscopy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {HAIR_SERVICE.treatments.map((treatment, idx) => {
              const categoryTags = [
                'Surgical Restoration',
                'Biological Follicle Therapy',
                'Autologous Platelet Therapy',
                'Diagnostic Triage',
                'Cellular Nutrient Therapy',
                'Aesthetic Density',
                'Microscopic Grafting',
              ];
              const tag = categoryTags[idx] || 'Trichology Care';

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
                    <Link href={`/booking?dept=Hair&treatment=${encodeURIComponent(treatment.name)}`}>
                      <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Book This Procedure
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
                  100% Transparent Rupee Pricing &amp; 0% Interest EMI Available
                </h4>
                <p className="text-xs text-brand-muted">
                  No hidden graft counts or surprise post-op kit fees. Written fixed quote given after your trichoscopic analysis.
                </p>
              </div>
            </div>
            <Link href="/contact" className="shrink-0 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full">
                Inquire About Hair EMI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Before / After Case Study (NEW USER REQUEST) */}
      <section className="w-full py-20 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Evidence &amp; Case Study
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Interactive Hairline Restoration Case Study
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto">
              Slide horizontally to examine the frontal temple reconstruction and high-density hairline achieved with Bio-Sapphire micro-FUE.
            </p>
          </div>

          <div className="bg-brand-surface-card border border-brand-border/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <BeforeAfterSlider
              beforeImage="/images/hair-transplant-before.jpg"
              afterImage="/images/hair-transplant-after.jpg"
              beforeAlt="Before Bio-Sapphire FUE hair transplant showing receding hairline and temple recession"
              afterAlt="After Bio-Sapphire FUE hair transplant showing dense natural hairline restoration"
              treatmentName="Bio-Sapphire Micro-FUE Hairline Reconstruction (2,600 Grafts)"
              timeframe="Results at 9 months post-procedure · Performed by Dr. Priya Patel & Dr. Julian Hayes at PRALASH"
              disclaimer="Unretouched clinical case photograph taken under standardized medical clinic lighting at PRALASH. Individual results depend on donor hair density, follicle caliber, scalp vascularity, and compliance with prescribed post-procedure protocols."
            />

            {/* Case Study Details Strip */}
            <div className="mt-8 pt-6 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-primary">2,600 FUE Grafts</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">0.75mm Bio-Sapphire Punch</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-secondary">98.6% Survival Rate</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Bio-Cellular Holding Solution</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-primary">Natural Angulation</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Single-Hair Soft Frontal Zone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Transplant Growth Timeline */}
      <section className="w-full py-20 bg-brand-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Growth Milestone Guide
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              FUE Hair Transplant Maturation Timeline
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
              What to expect month-by-month as transplanted hair follicles establish permanent capillary blood flow and mature into full density.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-brand-surface border border-brand-border/80 rounded-3xl p-6 shadow-2xs space-y-3 relative flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-black text-brand-secondary block mb-1">
                    {step.badge}
                  </span>
                  <div className="text-xl font-black text-brand-primary mb-2">{step.period}</div>
                  <h3 className="text-sm font-black text-brand-text mb-2">{step.title}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{step.desc}</p>
                </div>
                <div className="w-full h-1.5 bg-brand-secondary/20 rounded-full mt-4 overflow-hidden">
                  <div
                    className="h-full bg-brand-secondary rounded-full"
                    style={{ width: `${((i + 1) / 4) * 100}%` }}
                  />
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
              Clinical Safety &amp; Care
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Pre &amp; Post-Transplant Care Directives
            </h2>
            <p className="text-sm text-brand-muted max-w-xl mx-auto">
              Strict adherence to our surgeon-directed protocols ensures optimal follicular anchor strength and expedited healing.
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

      {/* Senior Trichology Faculty */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Surgical Faculty
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Our Certified Hair Surgeons &amp; Trichologists
            </h2>
            <p className="text-sm text-brand-muted">
              All hairline designs, graft harvestings, and biological GFC therapies are performed exclusively by senior ISHRS-affiliated specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {hairDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                featured={doc.id === 'dr-priya-patel'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Real Patient Hair Testimonials */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Patient Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Verified Hair Restoration Experiences
            </h2>
            <p className="text-sm text-brand-muted">
              Discover how our Bio-Sapphire FUE precision and evidence-based GFC therapies have restored hairline confidence across Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {HAIR_TESTIMONIALS.map((t, idx) => (
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

      {/* Hair FAQs */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Trichology Q&amp;A
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Hair Restoration FAQs
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
              Everything you need to know about FUE graft survival, procedural comfort, shock loss recovery, and female hair restoration.
            </p>
          </div>

          <Accordion
            items={EXPANDED_FAQS.map((f, i) => ({
              id: `hair-faq-${i}`,
              title: f.question,
              content: f.answer,
            }))}
          />
        </div>
      </section>

      {/* Final Booking & Consultation Banner */}
      <ConsultationCtaBanner
        department="Hair"
        title="Schedule Your Trichology Consultation in Bengaluru"
        description="Experience high-density Bio-Sapphire FUE hair restoration, autologous GFC, and personalized trichology care at PRALASH in HRBR Layout, Kalyan Nagar."
      />
    </div>
  );
}
