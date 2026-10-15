import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-brand-primary text-white border-t border-brand-border/20 mt-auto transition-colors">
      {/* Accreditation strip */}
      <div className="border-b border-white/10 bg-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {CLINIC_INFO.accreditations.slice(0, 4).map((acc, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
                <CheckCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>{acc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Clinic Brand Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-serif block">
                  ARQUETTE
                </span>
                <span className="text-[10px] tracking-widest text-brand-badge-bg uppercase font-bold block">
                  Multi-Speciality Clinic
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              {CLINIC_INFO.description} Operating at the forefront of digital healthcare, surgical safety, and tailored aesthetic care in Bengaluru.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>{CLINIC_INFO.address.street}, {CLINIC_INFO.address.city} {CLINIC_INFO.address.postcode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>Appointments: {CLINIC_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-red-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
                <span>24/7 Emergency Triage: {CLINIC_INFO.emergencyPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>{CLINIC_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              The Clinic
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  01 Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  02 About the Clinic
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-white transition-colors">
                  03 Our Doctors & Consultants
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-white transition-colors text-brand-badge-bg font-semibold">
                  08 Appointment Booking
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  09 Blog & Patient Education
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  10 Contact & Emergency Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Medical Specialties Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Clinical Suites
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/services" className="hover:text-white transition-colors font-medium">
                  04 All Services Hub
                </Link>
              </li>
              <li>
                <Link href="/services/dental" className="hover:text-white transition-colors">
                  05 Dental Treatments & Implants
                </Link>
              </li>
              <li>
                <Link href="/services/skin" className="hover:text-white transition-colors">
                  06 Skin Treatments & Laser
                </Link>
              </li>
              <li>
                <Link href="/services/hair" className="hover:text-white transition-colors">
                  07 Hair Treatments & FUE
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Diagnostic Pathology Lab
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Preventative Cardiology MOT
                </Link>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Safety */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Clinic Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-semibold text-white">
                <Clock className="w-3.5 h-3.5 text-brand-secondary" />
                <span>Outpatient Department</span>
              </div>
              <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p className="text-slate-400">Sunday: Urgent On-Call Only</p>

              <div className="pt-4">
                <div className="flex items-center gap-1.5 font-semibold text-brand-badge-bg">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Private Insurance Accepted</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Bupa, AXA Health, Aviva, Vitality, and direct international settlement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {CLINIC_INFO.legalName}. All rights reserved. Registered in England & Wales.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 cursor-pointer">Privacy & GDPR Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Clinical Governance</span>
            <span className="hover:text-slate-200 cursor-pointer">Cookie Settings</span>
            <span className="hover:text-slate-200 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
