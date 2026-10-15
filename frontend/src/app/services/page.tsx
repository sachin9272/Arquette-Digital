import React from 'react';
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
} from 'lucide-react';
import { ALL_SERVICES_CATALOG, DENTAL_SERVICE, SKIN_SERVICE, HAIR_SERVICE } from '@/data/clinicData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'All Clinical Services | Medical Specialties & Rupee Pricing',
  description:
    'Explore PRALASH clinic services: Cosmetic Dentistry, Medical Dermatology, Bio-Sapphire Hair Restoration, and Laser Aesthetics in Kalyan Nagar, Bengaluru.',
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
        'No. As a private multi-specialty center, you can schedule an appointment directly with any of our consultant dentists, dermatologists, or trichologists without a referral letter.',
    },
    {
      id: 'faq-2',
      title: 'Are treatments covered by health insurance or EMI financing?',
      content:
        'Yes. We support cashless insurance claims for eligible surgical dental & dermatological procedures, as well as zero-interest 0% EMI financing plans for orthodontic aligners and hair restoration.',
    },
    {
      id: 'faq-3',
      title: 'How does treatment pricing and transparent fee structure work?',
      content:
        'We believe in absolute financial transparency. Initial consultation fees are fixed and clearly listed on every doctor profile. Following your diagnostic assessment, you will receive a comprehensive written treatment plan with fixed procedural fees before any treatment commences.',
    },
    {
      id: 'faq-4',
      title: 'Are consultations conducted in private suites?',
      content:
        'Every consultation and clinical procedure is conducted inside private, acoustically isolated, HEPA-filtered suites designed for patient discretion, comfort, and safety.',
    },
    {
      id: 'faq-5',
      title: 'What if I need multiple specialists across different departments?',
      content:
        'Our multidisciplinary clinic model allows seamless cross-referrals between our dental, skin, and trichology specialists, ensuring unified care without travelling between multiple offices.',
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

      {/* Header Banner */}
      <section className="w-full bg-brand-surface-low border-b border-brand-border/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" size="md">
              04 All Services
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight">
              Comprehensive Clinical Directory & Diagnostic Specialties
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Arquette provides four dedicated centers of clinical excellence, blending world-class medical specialists with cutting-edge surgical equipment and transparent fee guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Specialty Pillars Section */}
      <section className="w-full py-16 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dental Card */}
            <div className="bg-brand-surface-card border border-brand-border rounded-3xl p-8 shadow-xs flex flex-col justify-between hover:border-brand-secondary/40 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-surface-low flex items-center justify-center text-brand-secondary">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <Badge variant="secondary" size="sm">
                  Suite 01
                </Badge>
                <h3 className="text-2xl font-bold text-brand-primary">Dental Treatments</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Advanced 3D-guided implantology, Invisalign clear aligners, porcelain veneers, and Zeiss microscopic painless endodontics.
                </p>
                <div className="space-y-2 pt-2">
                  {DENTAL_SERVICE.treatments.slice(0, 4).map((t, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-brand-text">{t.name.split('(')[0]}</span>
                      <span className="text-brand-muted">From ₹{t.priceFrom.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <Link href="/services/dental">
                  <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Dental Suite (05)
                  </Button>
                </Link>
              </div>
            </div>

            {/* Skin Card */}
            <div className="bg-brand-surface-card border border-brand-border rounded-3xl p-8 shadow-xs flex flex-col justify-between hover:border-brand-secondary/40 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-surface-low flex items-center justify-center text-brand-secondary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <Badge variant="secondary" size="sm">
                  Suite 02
                </Badge>
                <h3 className="text-2xl font-bold text-brand-primary">Skin Treatments</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Consultant dermatology, CO2 fractional laser resurfacing, cystic acne protocols, Cosmelan melasma care, and FotoFinder mole checks.
                </p>
                <div className="space-y-2 pt-2">
                  {SKIN_SERVICE.treatments.slice(0, 4).map((t, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-brand-text">{t.name.split('(')[0]}</span>
                      <span className="text-brand-muted">From ₹{t.priceFrom.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <Link href="/services/skin">
                  <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Skin Suite (06)
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hair Card */}
            <div className="bg-brand-surface-card border border-brand-border rounded-3xl p-8 shadow-xs flex flex-col justify-between hover:border-brand-secondary/40 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-surface-low flex items-center justify-center text-brand-secondary">
                  <Shield className="w-6 h-6" />
                </div>
                <Badge variant="secondary" size="sm">
                  Suite 03
                </Badge>
                <h3 className="text-2xl font-bold text-brand-primary">Hair Treatments</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Certified ISHRS surgeons performing microscopic FUE transplants, closed-system autologous PRP, and digital trichoscopy.
                </p>
                <div className="space-y-2 pt-2">
                  {HAIR_SERVICE.treatments.slice(0, 4).map((t, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-brand-text">{t.name.split('(')[0]}</span>
                      <span className="text-brand-muted">From ₹{t.priceFrom.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-brand-border/60">
                <Link href="/services/hair">
                  <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    View Hair Suite (07)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Payment Transparency */}
      <section className="w-full py-16 bg-brand-background border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 sm:p-12 shadow-xs">
            <div className="max-w-3xl space-y-4">
              <Badge variant="secondary" size="sm">
                Insurance & Payment
              </Badge>
              <h2 className="text-3xl font-black text-brand-primary tracking-tight">
                Private Health Insurance & Flexible Payment Options
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                We work directly with major UK and international private health insurance networks, including Bupa, AXA Health, Aviva, Vitality, Cigna, and Allianz Worldwide Care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-brand-border/60">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-text">
                  <CreditCard className="w-4 h-4 text-brand-secondary" />
                  <span>Transparent Fixed Fees</span>
                </div>
                <p className="text-xs text-brand-muted">
                  No hidden clinic facility surcharges or surprise pathology fees.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-text">
                  <FileText className="w-4 h-4 text-brand-secondary" />
                  <span>Direct Insurance Settlement</span>
                </div>
                <p className="text-xs text-brand-muted">
                  We submit invoices directly to your insurer using your pre-authorization code.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-brand-text">
                  <Calendar className="w-4 h-4 text-brand-secondary" />
                  <span>0% Interest Payment Plans</span>
                </div>
                <p className="text-xs text-brand-muted">
                  Spread surgical cosmetic treatment costs over 6 to 12 months interest-free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical FAQ Accordion */}
      <section className="w-full py-20 bg-brand-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <Badge variant="secondary" size="md">
              Patient Guidance
            </Badge>
            <h2 className="text-3xl font-black text-brand-primary tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Everything you need to know about booking, medical consent, and clinic procedures.
            </p>
          </div>

          <Accordion items={MASTER_FAQS} />
        </div>
      </section>

      {/* Bottom Booking CTA */}
      <section className="w-full py-16 bg-brand-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-3xl font-black tracking-tight">Book an Appointment Online</h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Select your medical department, doctor, and convenient time slot in minutes.
          </p>
          <div className="pt-2">
            <Link href="/booking">
              <Button variant="secondary" size="lg" leftIcon={<Calendar className="w-5 h-5" />}>
                Launch Booking Engine
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
