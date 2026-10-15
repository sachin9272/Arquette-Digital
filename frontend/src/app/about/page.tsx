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
  Building2,
  Calendar,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'About the Clinic | Clinical Heritage & Governance',
  description:
    'Learn about Arquette Multi-Speciality Clinic: our Harley & Mayfair heritage, medical advisory board, sterile theater safety standards, and advanced diagnostic technologies.',
  alternates: {
    canonical: 'https://arquetteclinic.com/about',
  },
};

export default function AboutPage() {
  const TIMELINE = [
    {
      year: '2016',
      title: 'Foundation in HRBR Layout, Kalyan Nagar',
      desc: 'Founded as a boutique clinic for advanced cosmetic dentistry, digital smile design, and clinical dermatology in North Bangalore.',
    },
    {
      year: '2019',
      title: 'Advanced Medical Dermatology & Laser Suite',
      desc: 'Equipped with medical-grade US FDA approved laser platforms for acne scar revision, pigmentation, and HydraFacial therapies.',
    },
    {
      year: '2021',
      title: 'Bio-Sapphire FUE & GFC Trichology Center',
      desc: 'Pioneered advanced Growth Factor Concentrate (GFC) therapy and micro-sapphire blade FUE hair restoration under certified specialists.',
    },
    {
      year: '2024',
      title: 'Top-Rated Healthcare Excellence Award',
      desc: 'Celebrated 25,000+ satisfied patient transformations with a 4.8★ verified clinical rating across Bangalore.',
    },
    {
      year: '2026',
      title: 'Comprehensive 3-in-1 Center of Excellence',
      desc: 'Full-spectrum Dental, Skin, and Hair medical sanctuary open 7 days a week with personalized care protocols.',
    },
  ];

  const VALUES = [
    {
      icon: Microscope,
      title: 'Diagnostic Precision',
      desc: 'We never treat blindly. High-resolution 3D CBCT, polarized digital trichoscopy, and dermoscopy precede every medical intervention.',
    },
    {
      icon: ShieldCheck,
      title: 'Surgical Sterility & Safety',
      desc: 'Hospital-grade HEPA filtration, class-B vacuum autoclaves, and ISO 15189 audited pathology assure flawless hygiene.',
    },
    {
      icon: HeartPulse,
      title: 'Patient-Centered Transparency',
      desc: 'Complete fee clarity, candid prognosis discussions, and zero pressurized treatment recommendations.',
    },
    {
      icon: Users,
      title: 'Multidisciplinary Collaboration',
      desc: 'Complex cases are reviewed jointly by our dentists, dermatologists, and physicians under one unified roof.',
    },
  ];

  const FACILITIES = [
    {
      name: 'Zeiss OPMI PROergo Operating Microscopes',
      desc: 'Up to 25x optical magnification for nerve-sparing root canals and micro-vascular grafting.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Carestream CS 9600 3D CBCT Imaging',
      desc: 'Ultra-low radiation volumetric CT scanning for computer-guided implants and maxillofacial planning.',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'FotoFinder ATBM Master Dermoscopy',
      desc: 'Automated artificial intelligence mole mapping for early-stage melanoma identification.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Magellan Autologous Bio-Centrifuge',
      desc: 'Closed-system platelet concentration delivering high-viability growth factors for scalp and skin rejuvenation.',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* Hero Header */}
      <section className="w-full bg-brand-surface-low border-b border-brand-border/60 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" size="md">
              02 About the Clinic
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight">
              A Legacy of Clinical Integrity, Precision Care, and Patient Dignity
            </h1>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Established in Bengaluru’s vibrant Kalyan Nagar district, PRALASH Dermystique &amp; Dentique was founded to unite hospital-grade clinical precision with the warm, personalized hospitality of private sanctuary care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Heritage Split */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-brand-border">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                alt="PRALASH Clinic reception lounge and consultation suites in Bengaluru"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <Badge variant="secondary" size="sm">
                Our Clinical Philosophy
              </Badge>
              <h2 className="text-3xl font-black text-brand-primary tracking-tight">
                Bridging Medical Science & Aesthetic Harmony
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Too often, healthcare is divided between sterile, rushed hospital wards and commercial cosmetic lounges lacking accredited medical oversight. At Arquette, we reject that dichotomy.
              </p>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                Whether diagnosing an atypical skin lesion, crafting an artisan ceramic smile makeover, or performing microscopic follicle transplantation, every treatment is directed by senior GMC/GDC certified consultants adhering to evidence-based protocols.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-brand-surface-low border border-brand-border/60">
                  <div className="text-2xl font-black text-brand-primary">100%</div>
                  <div className="text-xs text-brand-muted font-semibold">GMC/GDC Registered Specialists</div>
                </div>
                <div className="p-4 rounded-xl bg-brand-surface-low border border-brand-border/60">
                  <div className="text-2xl font-black text-brand-secondary">Zero Pressure</div>
                  <div className="text-xs text-brand-muted font-semibold">Informed Clinical Consent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full py-20 bg-brand-background border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Our Pillars
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Clinical Standards We Uphold Every Day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-brand-surface border border-brand-border rounded-2xl p-6 shadow-xs space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-surface-low flex items-center justify-center text-brand-secondary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-text">{v.title}</h3>
                  <p className="text-xs text-brand-muted leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Technology & Diagnostic Equipment */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Medical Technology
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Proprietary Diagnostic & Surgical Hardware
            </h2>
            <p className="text-sm text-brand-muted">
              We invest continually in gold-standard biomedical instrumentation to maximize patient comfort and procedural precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((f, i) => (
              <div
                key={i}
                className="bg-brand-surface-low border border-brand-border rounded-2xl overflow-hidden shadow-xs flex flex-col"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image src={f.image} alt={f.name} fill className="object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-brand-text mb-1">{f.name}</h3>
                    <p className="text-xs text-brand-muted leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-brand-border/40 text-[11px] font-bold text-brand-secondary flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>CE & FDA Medically Certified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="w-full py-20 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Nearly Two Decades of Medical Distinction
            </h2>
          </div>

          <div className="space-y-6">
            {TIMELINE.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-xs"
              >
                <div className="w-20 font-mono font-black text-2xl text-brand-secondary shrink-0">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-text">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-muted mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-16 bg-brand-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h2 className="text-3xl font-black tracking-tight">
            Consult With Our Senior Clinical Team
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Experience diagnostic transparency and bespoke healthcare at our Mayfair suites.
          </p>
          <div className="pt-2">
            <Link href="/booking">
              <Button variant="secondary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Book a Confidential Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
