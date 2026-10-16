import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Microscope,
  HeartPulse,
  Users,
  Calendar,
  Sparkles,
  Stethoscope,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  Activity,
  UserCheck,
  Scan,
  Compass,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'About Us | PRALASH Dermystique & Dentique Bangalore',
  description:
    'Learn about PRALASH Dermystique & Dentique in HRBR Layout, Kalyan Nagar, Bengaluru. Founded by Dr. Premalatha V. and clinical directors to provide integrated dental, skin, and hair care under one roof.',
  alternates: {
    canonical: 'https://pralash.com/about-us',
  },
};

export default function AboutPage() {
  const FOUNDERS = [
    {
      name: 'Dr. Premalatha V.',
      role: 'Co-Founder & Chief Dermatologist',
      qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
      experience: '16+ Years Experience',
      council: 'IADVL & CDSI Registered',
      image: '/founders.png',
      imageCrop: 'object-[30%_15%]',
      bio: 'Dr. Premalatha is the visionary co-founder of PRALASH Dermystique. With over 16 years of dedicated clinical practice, she specializes in advanced medical dermatology, chronic acne scar remodeling, stubborn melasma depigmentation, vitiligo surgical management, autologous PRP/GFC therapies, and FDA-approved laser treatments.',
      specialties: [
        'Clinical & Aesthetic Dermatology',
        'Acne Scar Revision (CO2 & Subcision)',
        'Melasma & Pigmentation Protocols',
        'Vitiligo Surgery & Micro-Needling',
        'GFC & PRP Cellular Hair Therapy',
      ],
    },
    {
      name: 'Dr. Shubha C. N.',
      role: 'Co-Founder & Clinical Dental Director',
      qualifications: 'BDS, PGD (Aesthetic Dentistry), Certified Implantologist',
      experience: '15+ Years Experience',
      council: 'Dental Council of India (DCI)',
      image: '/founders.png',
      imageCrop: 'object-[70%_15%]',
      bio: 'Dr. Shubha leads the dental surgical department under PRALASH Dentique. Her clinical focus encompasses 3D computer-guided dental implants, digital smile designing (DSD), porcelain cosmetic veneers, invisible clear aligners, and painless single-visit microscopic root canal therapies.',
      specialties: [
        '3D Guided Computer Implants',
        'Digital Smile Designing & Veneers',
        'Invisible Clear Aligners',
        'Single-Visit Pain-Free RCT',
        'Full Mouth Rehabilitation',
      ],
    },
    {
      name: 'Prof. Dr. Lalith V. Anand',
      role: 'Senior Periodontist & Global Implantology Mentor',
      qualifications: 'BDS, MDS (Periodontology & Oral Implantology)',
      experience: '19+ Years Experience',
      council: 'Fellow of ICOI (USA)',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
      imageCrop: 'object-center',
      bio: 'A distinguished academician and senior periodontist with nearly two decades of surgical distinction. Prof. Dr. Lalith specializes in advanced bone augmentation, maxillary sinus floor elevations, peri-implantitis reconstructive therapy, and regenerative periodontal flap surgeries.',
      specialties: [
        'Advanced Bone Grafting & Sinus Lifts',
        'Regenerative Periodontal Surgery',
        'Full-Mouth Dental Implantology',
        'Mucogingival Aesthetic Surgery',
        'Peri-Implant Soft Tissue Management',
      ],
    },
  ];

  const CLINICAL_PILLARS = [
    {
      number: '01',
      title: 'Diagnosis First, Treatment Next',
      desc: 'We never jump into procedures blindly. We determine the root cause through digital imaging, trichoscopy, and clinical dermoscopy before formulating any treatment.',
      icon: Microscope,
    },
    {
      number: '02',
      title: 'Personalized Treatment Plans',
      desc: 'No two patients have identical physiology. Your care plan is custom-tailored to your skin phototype, hair follicle health, oral architecture, and lifestyle.',
      icon: Sparkles,
    },
    {
      number: '03',
      title: 'Focus on Long-Term Results',
      desc: 'We reject temporary cosmetic fixes. Every medical intervention is engineered for biological stability, lasting structural health, and patient confidence.',
      icon: HeartPulse,
    },
  ];

  const SERVICES_LIST = [
    {
      department: 'Dental Care (PRALASH Dentique)',
      badge: '50% Priority Care',
      icon: Stethoscope,
      description: 'Comprehensive dental surgery, restorative dentistry, and smile aesthetics using 3D digital scanners and micro-endodontics.',
      treatments: [
        'Single, Multiple & Full Mouth 3D Dental Implants',
        'Single-Visit Painless Microscopic Root Canal (RCT)',
        'Invisalign® Clear Aligners & Traditional Braces',
        'Digital Smile Design (DSD) & Porcelain Veneers',
        'Teeth Whitening, Bleaching & Cosmetic Polishing',
        'Periodontal Flap & Regenerative Gum Treatments',
        'Pediatric Dentistry (Fluoride, Space Maintainers)',
        'Wisdom Tooth Extraction & 24/7 Emergency Care',
      ],
      link: '/services/dental',
    },
    {
      department: 'Clinical Dermatology (PRALASH Dermystique)',
      badge: 'Dermatology-Backed',
      icon: Sparkles,
      description: 'Medical and aesthetic skin solutions led by MD dermatologists for active acne, scars, pigmentation, and cellular rejuvenation.',
      treatments: [
        'Acne Treatment & Severe Acne Scar Reduction',
        'Fractional CO2 Laser & Subcision Scar Remodeling',
        'Pigmentation, Melasma & Dark Spot Solutions',
        'Medical HydraFacial MD & Skin Brightening',
        'Glutathione IV Wellness & Glow Infusions',
        'Anti-Aging: Botox, Dermal Fillers & Thread Lift',
        'Vitiligo Surgical Management & Micro-Needling',
        'Laser Tattoo Removal & Semi-Permanent Makeup',
      ],
      link: '/services/skin',
    },
    {
      department: 'Hair Restoration & Trichology',
      badge: 'Bio-Sapphire Precision',
      icon: Shield,
      description: 'Scientific follicle restoration combining microscopic graft harvesting with autologous cellular growth factor concentrate.',
      treatments: [
        'Bio-Sapphire Micro-FUE Hair Restoration',
        'GFC (Growth Factor Concentrate) Therapy',
        'PRP (Platelet-Rich Plasma) Cellular Treatment',
        'Scalp Micropigmentation (SMP)',
        'Chronic Dandruff & Seborrheic Scalp Care',
        'Female Pattern Hair Thinning Protocols',
        'Alopecia Areata Specialized Medical Triage',
        'Non-Surgical Hair Replacement Integration',
      ],
      link: '/services/hair',
    },
  ];

  const PATIENT_STEPS = [
    {
      step: '01',
      title: 'In-Depth Consultation',
      desc: 'Comprehensive clinical evaluation with high-definition digital diagnostic imaging and candid dialogue.',
    },
    {
      step: '02',
      title: 'Evidence-Based Planning',
      desc: 'Itemized, transparent treatment schedule with zero hidden charges or pressured recommendations.',
    },
    {
      step: '03',
      title: 'Precision Procedure',
      desc: 'Safe execution in sterile operating suites supervised by certified senior medical consultants.',
    },
    {
      step: '04',
      title: 'Scheduled Follow-Up',
      desc: 'Structured reviews and maintenance protocols to guarantee sustainable, lasting medical outcomes.',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-16 lg:py-24 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 w-fit text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-secondary" />
                <span>Multi-Specialty Clinic · HRBR Layout, Kalyan Nagar, Bengaluru</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-primary tracking-tight leading-[1.15]">
                About PRALASH{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Dermystique &amp; Dentique
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
                PRALASH Dermystique &amp; Dentique is a premier multi-specialty dental, skin, and hair clinic located in HRBR Layout, Kalyan Nagar, Bengaluru. We unite advanced medical technology, renowned specialist doctors, and personalized care to deliver safe, long-lasting clinical results.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/booking">
                  <Button variant="primary" size="lg" leftIcon={<Calendar className="w-5 h-5 opacity-80" />}>
                    Schedule a Consultation
                  </Button>
                </Link>
                <a href={`tel:${CLINIC_INFO.phone}`}>
                  <Button variant="outline" size="lg" leftIcon={<Phone className="w-4 h-4 text-brand-secondary" />}>
                    Call: {CLINIC_INFO.phone}
                  </Button>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>Integrated 3-in-1 Specialty Care</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>25,000+ Treated Patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>NABH Accredited Safety</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-surface bg-brand-surface-low">
                <Image
                  src="/founders.png"
                  alt="Founders of PRALASH Dermystique & Dentique Clinic in Bengaluru"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-brand-surface/95 backdrop-blur-md border border-brand-border/60">
                  <div className="text-xs font-bold text-brand-primary">Dr. Premalatha V. &amp; Dr. Shubha C. N.</div>
                  <div className="text-[11px] text-brand-secondary font-semibold">Founders &amp; Clinical Directors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE STORY SECTION */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-brand-border bg-brand-surface-low">
                <Image
                  src="/exterior-view.png"
                  alt="PRALASH Clinic exterior in HRBR Layout Kalyan Nagar Bengaluru"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block w-48 aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-surface bg-brand-surface-low">
                <Image
                  src="/treatment-room.webp"
                  alt="PRALASH modern sterile diagnostic consultation room"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <Badge variant="secondary" size="md">
                Who We Are
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
                Complete Care for Dental, Skin, and Hair Under One Roof
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                PRALASH Dermystique &amp; Dentique was built with a clear purpose: to eliminate the frustration patients face when navigating disjointed healthcare. Many patients visit multiple disparate clinics, receive conflicting advice, and undergo therapies without an accurate root-cause diagnosis.
              </p>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                At our Bengaluru center, our senior dental surgeons, consultant dermatologists, and hair restoration specialists collaborate under one unified roof. We blend hospital-grade sterilization with personalized patient hospitality.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 mt-0.5 border border-brand-secondary/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-brand-primary">Integrated Specialty Synergy:</strong>
                    <span className="text-xs sm:text-sm text-brand-muted ml-1.5">Maxillofacial dental surgeons and clinical dermatologists consult collaboratively.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 mt-0.5 border border-brand-secondary/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-brand-primary">Evidence-Based Medicine:</strong>
                    <span className="text-xs sm:text-sm text-brand-muted ml-1.5">Every protocol is backed by peer-reviewed clinical research and proven medical outcomes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 mt-0.5 border border-brand-secondary/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-brand-primary">Sustainable Long-Term Health:</strong>
                    <span className="text-xs sm:text-sm text-brand-muted ml-1.5">We focus on permanent cures and root-cause resolution, never temporary commercial fixes.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDERS SECTION (PROMINENT LEADERSHIP SPOTLIGHT) */}
      <section className="w-full py-20 bg-brand-background border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              Clinical Leadership &amp; Founders
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Meet the Visionary Founders of PRALASH
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every procedure and diagnostic evaluation is directed by senior faculty who hold advanced post-graduate qualifications and decades of distinguished clinical experience in Bangalore.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {FOUNDERS.map((founder, idx) => (
              <div
                key={idx}
                className="group bg-brand-surface border border-brand-border/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-brand-secondary/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-5">
                  {/* Photo Container */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-brand-surface-low border border-brand-border/60">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className={`object-cover ${founder.imageCrop} group-hover:scale-105 transition-transform duration-500`}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-secondary border border-brand-border/60 shadow-xs">
                        {founder.experience}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-secondary block">
                      {founder.role}
                    </span>
                    <h3 className="text-xl font-bold text-brand-primary mt-1">
                      {founder.name}
                    </h3>
                    <div className="text-xs text-brand-muted font-semibold mt-1">
                      {founder.qualifications}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-badge-bg text-brand-badge-text text-[11px] font-bold mt-2">
                      <Award className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>{founder.council}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-[13px] text-brand-muted leading-relaxed">
                    {founder.bio}
                  </p>

                  {/* Key Specialties List */}
                  <div className="space-y-1.5 pt-3 border-t border-brand-border/50">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">
                      Core Specializations:
                    </div>
                    {founder.specialties.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-brand-text">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-brand-border/60">
                  <Link href="/booking" className="w-full">
                    <Button variant="outline" size="sm" className="w-full text-xs" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Book Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE CLINICAL SERVICES SECTION */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              Specialized Medical Centers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Clinical Services Offered at PRALASH
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Explore our full spectrum of specialized medical departments. Every treatment is delivered with medical-grade equipment and audited clinical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_LIST.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-background border border-brand-border/80 rounded-3xl p-7 flex flex-col justify-between hover:shadow-lg hover:border-brand-secondary/40 transition-all duration-300"
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20 shadow-2xs">
                        <Icon className="w-6 h-6 text-brand-secondary" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-surface-low text-brand-muted border border-brand-border">
                        {svc.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-brand-primary">
                        {svc.department}
                      </h3>
                      <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-brand-border/50">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-2">
                        Treatments Available:
                      </div>
                      {svc.treatments.map((t, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-xs text-brand-text">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
                          <span className="leading-snug">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-border/60">
                    <Link
                      href={svc.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors"
                    >
                      <span>Explore {svc.department.split(' ')[0]} Department</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR THREE PHILOSOPHY PILLARS */}
      <section className="w-full py-20 bg-brand-background border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              Our Core Philosophy
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Three Pillars Guiding Every Treatment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINICAL_PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-brand-surface border border-brand-border/80 rounded-2xl p-7 shadow-xs space-y-4 hover:border-brand-secondary/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                      <Icon className="w-6 h-6 text-brand-secondary" />
                    </div>
                    <span className="font-mono text-2xl font-black text-brand-secondary/40">
                      {p.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PATIENT JOURNEY (4 STEPS) */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              The Patient Experience
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Your Care Journey at PRALASH
            </h2>
            <p className="text-sm text-brand-muted">
              From the moment you walk through our doors, every step is designed for comfort, clarity, and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PATIENT_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-brand-background border border-brand-border/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="font-mono text-2xl font-black text-brand-secondary block mb-2">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-brand-primary">{step.title}</h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed">{step.desc}</p>
                </div>
                <div className="pt-3 border-t border-brand-border/50 text-[11px] font-bold text-brand-secondary flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Medical Protocol</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & FACILITY SANCTUARY */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <Badge variant="secondary" size="md">
                Our Bangalore Location
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
                Strategically Located in HRBR Layout, Kalyan Nagar
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                Easily accessible to residents across Kammanahalli, Hennur, Banaswadi, Hebbal, and Manyata Tech Park. We offer dedicated valet parking and open consultation 7 days a week.
              </p>

              <div className="space-y-2 pt-2 text-xs text-brand-text">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-secondary shrink-0" />
                  <span>{CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} - {CLINIC_INFO.address.postcode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-secondary shrink-0" />
                  <span>Mon – Sun: 9:30 AM – 8:00 PM (Open All 7 Days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                  <span>Direct Triage: {CLINIC_INFO.phone}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3 justify-center items-stretch sm:items-start lg:items-end">
              <Link href="/booking" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<Calendar className="w-5 h-5" />}>
                  Book Consultation Online
                </Button>
              </Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  'PRALASH Dermystique & Dentique HRBR Layout Kalyan Nagar Bengaluru'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<Compass className="w-4 h-4 text-brand-secondary" />}>
                  Get Google Maps Directions
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
