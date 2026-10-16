'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Star,
  Award,
  Calendar,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#08121e] text-slate-300 mt-auto overflow-hidden">
      {/* Top Subtle Radiant Line & Soft Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-32 bg-brand-secondary/10 blur-3xl pointer-events-none" />

      {/* Trust & Quality Assurance Highlights (Borderless & Open) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-brand-secondary shrink-0">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">4.8★ Patient Rating</div>
              <div className="text-[11px] sm:text-xs text-slate-400">1,200+ Verified Reviews</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-brand-secondary shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">Sterile Protocols</div>
              <div className="text-[11px] sm:text-xs text-slate-400">Hospital-Grade Safety</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-brand-secondary shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">Certified Specialists</div>
              <div className="text-[11px] sm:text-xs text-slate-400">Surgeons &amp; Dermatologists</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-brand-secondary shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">Open All 7 Days</div>
              <div className="text-[11px] sm:text-xs text-brand-secondary font-medium">9:30 AM – 8:00 PM Daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Overview Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <div className="bg-white rounded-xl p-2 px-3.5 inline-flex items-center shadow-md transition-transform group-hover:scale-105">
                <Image
                  src="/pralash-logo.jpg"
                  alt="PRALASH Dermystique &amp; Dentique"
                  width={180}
                  height={55}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Premier multi-specialty clinical center combining modern dental surgery, evidence-based medical dermatology, and advanced hair restoration in Bengaluru.
            </p>

            <div className="space-y-3 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                <span className="leading-snug text-slate-300">
                  Block 1, 708, 3rd Cross Rd, HRBR Layout, Kalyan Nagar, Bengaluru 560043
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="hover:text-white transition-colors font-medium text-brand-secondary"
                >
                  Direct Helpline: {CLINIC_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                <a
                  href={`mailto:${CLINIC_INFO.email}`}
                  className="hover:text-white transition-colors text-slate-300"
                >
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Cashless Mediclaim &amp; 0% EMI Assistance Available</span>
            </div>
          </div>

          {/* Clinical Specialties Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Clinical Specialties
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: '3D Dental Implants & Surgery', href: '/services/dental' },
                { label: 'Invisalign® Clear Aligners', href: '/services/dental' },
                { label: 'Porcelain Smile Makeovers', href: '/services/dental' },
                { label: 'Medical Dermatology & Laser', href: '/services/skin' },
                { label: 'Severe Acne Scar Revision', href: '/services/skin' },
                { label: 'Bio-Sapphire FUE Hair Transplants', href: '/services/hair' },
                { label: 'GFC & Scalp PRP Therapy', href: '/services/hair' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-brand-secondary transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Patient Care & Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Patient Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'About Our Clinic', href: '/about' },
                { label: 'Consultant Doctors', href: '/doctors' },
                { label: 'Book Appointment', href: '/booking' },
                { label: 'Treatment Directory', href: '/services' },
                { label: 'Clinical Health Blog', href: '/blog' },
                { label: 'Contact & Directions', href: '/contact' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-brand-secondary transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Visit & Hours (Seamless Soft Card) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Consultation Desk
            </h4>

            <div className="p-5 rounded-2xl bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Clock className="w-4 h-4 text-brand-secondary" />
                  <span>Outpatient Hours</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-secondary/20 text-brand-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                  Open Today
                </span>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Monday – Sunday</span>
                  <span className="font-semibold text-white">9:30 AM – 8:00 PM</span>
                </div>
                <div className="text-[11px] text-slate-400">Open all 7 days for consultations</div>
              </div>

              <div className="pt-1">
                <Link
                  href="/booking"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-secondary hover:bg-brand-secondary-hover text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory, Legal & Copyright Strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; 2026 {CLINIC_INFO.legalName}. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-[11px] text-slate-400">
              NABH Quality Assured Medical Center
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-[11px]">
            <Link href="/about" className="hover:text-slate-200 transition-colors">
              Clinical Governance
            </Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">
              Patient Care Charter
            </Link>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Terms of Treatment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
