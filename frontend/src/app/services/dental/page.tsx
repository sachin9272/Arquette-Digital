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
  Phone,
  Shield,
  Activity,
  Check,
  Zap,
  Microscope,
  CreditCard,
  HeartHandshake,
  Award,
  HelpCircle,
} from 'lucide-react';
import { DENTAL_SERVICE, DOCTORS, CLINIC_INFO } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Accordion } from '@/components/ui/Accordion';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { ConsultationCtaBanner } from '@/components/clinic/ConsultationCtaBanner';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Advanced Dental Treatments & Implantology | PRALASH Dentique Bangalore',
  description:
    'PRALASH Dentique in HRBR Layout, Kalyan Nagar, Bengaluru. Specialized in 3D-guided dental implants, Invisalign clear aligners, handcrafted porcelain veneers, and painless single-visit microscopic root canals.',
  alternates: {
    canonical: 'https://pralash.com/services/dental',
  },
};

export default function DentalTreatmentsPage() {
  const dentalDoctors = DOCTORS.filter((d) => d.department === 'Dental' && d.isActive !== false);

  const DENTAL_PILLARS = [
    {
      icon: Microscope,
      title: 'Carl Zeiss Microscopic Precision',
      description:
        'Surgical operating microscopes offering up to 25x optical magnification for meticulous root canal debridement and 99.2% tooth preservation.',
      tag: 'Optics & Endodontics',
    },
    {
      icon: Activity,
      title: '3D-Guided CBCT Bone Mapping',
      description:
        'Ultra low-dose 3D volumetric scanning generates sub-millimeter surgical guides for computer-navigated dental implants with zero nerve proximity risk.',
      tag: 'Computerized Surgery',
    },
    {
      icon: Smile,
      title: 'iTero Lumina 3D Digital Scans',
      description:
        'Advanced intraoral optical wand capturing 6,000 frames/sec for immediate 3D smile simulations—completely eliminating sticky, gag-inducing impression pastes.',
      tag: 'Zero Impression Gunk',
    },
    {
      icon: Zap,
      title: 'The Wand® Painless Anesthesia',
      description:
        'Microprocessor-regulated flow delivery administers local anesthetic below patient pain perception thresholds for completely stress-free treatment.',
      tag: '100% Gentle & Painless',
    },
  ];

  const PATIENT_JOURNEY = [
    {
      step: '01',
      title: '3D Digital Assessment & Diagnostic Scan',
      description:
        'Low-radiation digital RVG x-rays and iTero 3D intraoral scans map your bite, bone structure, and tooth topography in high definition.',
      detail: 'Comprehensive initial evaluation with no uncomfortable trays',
    },
    {
      step: '02',
      title: 'Virtual Smile Simulation & Rupee Plan',
      description:
        'Your senior specialist presents digital before-and-after simulations with an itemized, all-inclusive Rupee quotation and 0% EMI financing options.',
      detail: 'Transparent fees before any procedure begins',
    },
    {
      step: '03',
      title: 'Microscopic Gentle Treatment',
      description:
        'Your procedure is performed under Carl Zeiss surgical magnification with computerized painless Wand anesthesia inside our sterile operatory.',
      detail: 'Strict hospital-grade Class-B autoclave sterility',
    },
    {
      step: '04',
      title: 'Digital Bite Calibration & Care Warranty',
      description:
        'We fine-tune your occlusion, provide a customized home oral maintenance kit, and schedule complimentary follow-up checkups.',
      detail: 'Documented clinical support and restoration warranty',
    },
  ];

  const DENTAL_TESTIMONIALS = [
    {
      name: 'Rajesh K.',
      location: 'Kalyan Nagar, Bengaluru',
      procedure: 'Single-Visit Microscopic Root Canal',
      quote:
        'I had severe throbbing pain and was terrified of root canals. Dr. Kavita Sharma performed the entire treatment under a Zeiss microscope in one gentle 70-minute sitting. I felt zero pain during or after the procedure. Remarkable!',
      rating: 5,
    },
    {
      name: 'Sangeetha M.',
      location: 'HRBR Layout, Bengaluru',
      procedure: '3D Guided Dental Implants (Two Units)',
      quote:
        'Prof. Dr. Lalith and Dr. Shubha planned my implants using 3D CBCT scans. They showed me the surgical simulation on the monitor before touching my mouth. The healing was seamless and I am chewing normally again after years.',
      rating: 5,
    },
    {
      name: 'Ananya R.',
      location: 'Hennur Road, Bengaluru',
      procedure: 'Invisalign Diamond Elite Aligners',
      quote:
        'Dr. Marcus Thornton handled my alignment with Invisalign. The iTero digital scans took barely 5 minutes without any messy paste. After 7 months, my crowding is fully resolved. The entire dental team is world-class.',
      rating: 5,
    },
  ];

  const EXPANDED_FAQS = [
    {
      question: 'Are dental implants painful?',
      answer:
        'No. With our computer-guided micro-incisions and computerized Wand anesthesia, the implant site is completely numbed. Most patients report less discomfort than a routine extraction and comfortably resume normal desk work the very next morning with mild over-the-counter medication.',
    },
    {
      question: 'How long does Invisalign clear aligner treatment take compared to traditional braces?',
      answer:
        'Invisalign treatment at PRALASH typically ranges between 4 to 12 months, which is frequently 30% to 40% faster than traditional bracket orthodontics due to SmartTrack material and computerized tooth trajectory planning. You receive 3D visual tracking at every visit.',
    },
    {
      question: 'What is the advantage of microscopic root canal therapy over standard root canals?',
      answer:
        'Conventional root canals rely on naked-eye or simple loupes, which can miss tiny hidden canals, micro-fractures, or complex root curves. Our Carl Zeiss surgical operating microscope magnifies the internal tooth anatomy up to 25x, allowing Dr. Kavita Sharma to thoroughly disinfect every micro-canal, yielding a 99.2% tooth preservation rate.',
    },
    {
      question: 'How long do handcrafted porcelain veneers last and do they stain?',
      answer:
        'Our handcrafted porcelain veneers are fabricated from high-density lithium disilicate (E-max) ceramics. They are completely non-porous, highly resistant to coffee, tea, and wine staining, and clinically proven to maintain their natural luminosity and bond strength for 15 to 20+ years with standard oral hygiene.',
    },
    {
      question: 'Do you offer emergency dental appointments for severe toothache or trauma?',
      answer:
        'Yes. We reserve priority emergency clinical slots daily for acute toothache, fractured teeth, dislodged crowns, and sports dental trauma. Call our Bengaluru emergency triage desk immediately at +91 99005 17699 for immediate care.',
    },
    {
      question: 'Are dental procedures covered by insurance or 0% EMI installment plans?',
      answer:
        'Yes. We provide cashless insurance documentation support for eligible dental trauma, cysts, and maxillofacial treatments. Additionally, for elective smile makeovers, dental implants, and Invisalign, we provide 0% interest EMI financing through leading Indian healthcare credit providers.',
    },
  ];

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
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-12 lg:py-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, CTAs & Key Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
                <Sparkles className="w-4 h-4 text-brand-secondary" />
                <span>DCI &amp; KSDC Registered · Zeiss Surgical Operatory · Bengaluru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
                Precision Cosmetic, Implant &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Restorative Dentistry
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                PRALASH Dentique integrates Carl Zeiss surgical operating microscopes, 3D low-radiation CBCT imaging, iTero digital optical impressions (zero gooey molds), and computer-assisted painless anesthesia. Led by Co-Founder Dr. Shubha C. N. &amp; Prof. Dr. Lalith V. Anand.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <Link href="/booking?dept=Dental" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<Calendar className="w-5 h-5 text-brand-badge-bg" />}>
                    Book Dental Consultation
                  </Button>
                </Link>
                <a href="#treatments-catalog" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Explore 6 Procedures
                  </Button>
                </a>
                <a href={`tel:${CLINIC_INFO.phone}`} className="sm:hidden w-full">
                  <Button variant="secondary" size="md" className="w-full" leftIcon={<Phone className="w-4 h-4" />}>
                    Call Dental Desk
                  </Button>
                </a>
              </div>

              {/* 4 Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">15+ Yrs</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Specialist Directors</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-secondary">3D Guided</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">CBCT Implant Surgery</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">100% Painless</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">The Wand® Anesthesia</div>
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
                    src="/images/dental-operatory-suite.jpg"
                    alt="PRALASH Dentique luxury surgical dental operatory with Zeiss microscope, iTero scanner and panoramic displays"
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
                      <span>Zeiss Surgical Operatory</span>
                    </div>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold">
                      <Smile className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>iTero 3D Scans · Zero Molds</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-amber-300">
                      <span>★ 4.96</span>
                      <span className="text-white/80 font-normal">(420+ Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Card Strip */}
                <div className="p-4 bg-brand-surface flex items-center justify-between text-xs text-brand-muted border-t border-brand-border/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                    <span className="font-semibold text-brand-text">Sterile Operatory Active</span>
                  </div>
                  <span className="font-medium text-brand-muted">Kalyan Nagar, Bangalore</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operatory & Technology Pillars */}
      <section className="w-full py-16 bg-brand-surface border-b border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Infrastructure
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-brand-primary tracking-tight">
              Advanced Operatory Technology for Gentle, Flawless Dentistry
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every procedure at PRALASH Dentique is backed by certified medical-grade instrumentation that maximizes comfort and eliminates procedural guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DENTAL_PILLARS.map((pillar, idx) => {
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
      <section id="treatments-catalog" className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Procedures &amp; Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Specialized Dental &amp; Implant Procedures
            </h2>
            <p className="text-sm text-brand-muted">
              Transparent starting fees in Indian Rupees, expected appointment durations, and recovery guidance. Itemized quotation provided following 3D scans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DENTAL_SERVICE.treatments.map((treatment, idx) => {
              const categoryTags = [
                'Implantology',
                'Orthodontics',
                'Aesthetic Dentistry',
                'Endodontics',
                'Cosmetic Whitening',
                'Periodontics',
              ];
              const tag = categoryTags[idx] || 'Dental Care';

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
                    <Link href={`/booking?dept=Dental&treatment=${encodeURIComponent(treatment.name)}`}>
                      <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Book This Procedure
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before / After Slider Showcase */}
      <section className="w-full py-20 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Evidence &amp; Case Study
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Interactive Smile Transformation Case Study
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto">
              Slide horizontally to examine the aesthetic and functional restoration achieved with handcrafted porcelain veneers and laser whitening.
            </p>
          </div>

          <div className="bg-brand-surface-card border border-brand-border/90 rounded-3xl p-6 sm:p-8 shadow-sm">
            <BeforeAfterSlider
              beforeImage="/images/dental-veneers-before.jpg"
              afterImage="/images/dental-veneers-after.jpg"
              beforeAlt="Before porcelain veneer smile makeover"
              afterAlt="After porcelain veneer smile makeover result"
              treatmentName="Full Upper Arch Porcelain Veneers & Laser Whitening"
              timeframe="Results after 2 visits · Performed by Dr. Shubha C. N. & Prof. Dr. Lalith V. Anand"
              disclaimer="Unretouched clinical case photograph taken under standardized medical clinic lighting at PRALASH Dentique. Individual dental outcomes depend on bone density, gingival architecture, and occlusion."
            />

            {/* Case Study Details Strip */}
            <div className="mt-8 pt-6 border-t border-brand-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-primary">8 E-max Veneers</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Lithium Disilicate Ceramic</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-secondary">Shade BL2 Lift</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Natural Translucency Restored</div>
              </div>
              <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border/60">
                <div className="text-lg font-black text-brand-primary">2 Clinical Visits</div>
                <div className="text-xs text-brand-muted font-medium mt-0.5">Zero Downtime Transformation</div>
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
              Your Dental Journey at PRALASH Dentique
            </h2>
            <p className="text-sm text-brand-muted">
              From high-resolution 3D diagnostics to lifelong restoration care, every step is designed for maximum precision and absolute patient comfort.
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

      {/* Senior Dental Faculty */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Specialist Faculty
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Our Senior Dental Surgeons &amp; Orthodontists
            </h2>
            <p className="text-sm text-brand-muted">
              All dental consultations and surgical procedures are performed exclusively by senior consultants with over a decade of dedicated clinical practice.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dentalDoctors.map((doc) => (
              <DoctorCard
                key={doc.id}
                doctor={doc}
                featured={doc.id === 'dr-shubha-cn' || doc.id === 'prof-dr-lalith-anand'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Real Patient Dental Testimonials */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Patient Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Verified Dental Patient Experiences
            </h2>
            <p className="text-sm text-brand-muted">
              Read how our painless protocols, 3D guidance, and microscopic accuracy have transformed smiles across Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {DENTAL_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-2xs flex flex-col justify-between hover:shadow-md transition-shadow"
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

      {/* Dental FAQs */}
      <section className="w-full py-20 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Questions &amp; Answers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Dental Treatment FAQs
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto">
              Everything you need to know about procedural safety, recovery, anesthesia comfort, and appointment scheduling.
            </p>
          </div>

          <Accordion
            items={EXPANDED_FAQS.map((f, i) => ({
              id: `dental-faq-${i}`,
              title: f.question,
              content: f.answer,
            }))}
          />
        </div>
      </section>

      {/* Final Booking & Consultation Banner */}
      <ConsultationCtaBanner
        department="Dental"
        title="Schedule Your Dental Consultation in Bengaluru Today"
        description="Experience gentle, microscopic dental care and advanced 3D implantology at PRALASH Dentique in HRBR Layout, Kalyan Nagar."
      />
    </div>
  );
}
