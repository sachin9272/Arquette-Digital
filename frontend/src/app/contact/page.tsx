'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  Car,
  Train,
  MessageCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  Navigation,
  Check,
  HelpCircle,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Dental & Oral Surgery',
    consultationType: 'In-Clinic (HRBR Layout)',
    timeSlot: 'Morning (9:30 AM – 1:00 PM)',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    'Dental & Oral Surgery',
    'Clinical Dermatology',
    'Trichology & Hair Restoration',
    'General Inquiry / Multiple',
  ];

  const timeSlots = [
    'Morning (9:30 AM – 1:00 PM)',
    'Afternoon (1:00 PM – 5:00 PM)',
    'Evening (5:00 PM – 8:00 PM)',
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'A valid email address is required.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Valid phone number is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details of your inquiry or symptoms.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 700);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* HERO SECTION WITH QUICK CONTACT STRIP */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-14 lg:py-18">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-brand-secondary" />
              <span>Dedicated Patient Concierge · Kalyan Nagar, Bengaluru</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
              Connect With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                PRALASH
              </span>{' '}
              Medical Desk
            </h1>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
              Have questions about dental implants, laser skin rejuvenation, or hair restoration? Our clinical coordinators respond within 30 minutes during clinic hours to assist with scheduling, second opinions, and pricing.
            </p>
          </div>

          {/* 4 FAST CONNECT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phone */}
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs hover:shadow-md hover:border-brand-secondary/50 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                  <Phone className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary px-2 py-0.5 rounded-md bg-brand-badge-bg">
                  Call Now
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-brand-muted font-semibold block">Direct Appointments</span>
                <span className="text-sm font-black text-brand-primary group-hover:text-brand-secondary transition-colors">
                  {CLINIC_INFO.phone}
                </span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/919900517699?text=${encodeURIComponent(
                'Hello PRALASH team, I would like to inquire about booking a consultation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs hover:shadow-md hover:border-brand-secondary/50 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                  <MessageCircle className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary px-2 py-0.5 rounded-md bg-brand-badge-bg">
                  Instant Chat
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-brand-muted font-semibold block">WhatsApp Care Desk</span>
                <span className="text-sm font-black text-brand-primary group-hover:text-brand-secondary transition-colors">
                  +91 99005 17699
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CLINIC_INFO.email}`}
              className="p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs hover:shadow-md hover:border-brand-secondary/50 hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                  <Mail className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary px-2 py-0.5 rounded-md bg-brand-badge-bg">
                  Write Us
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-brand-muted font-semibold block">General Clinical Desk</span>
                <span className="text-sm font-black text-brand-primary group-hover:text-brand-secondary transition-colors truncate block">
                  {CLINIC_INFO.email}
                </span>
              </div>
            </a>

            {/* Hours */}
            <div className="p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                  <Clock className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-secondary px-2 py-0.5 rounded-md bg-brand-badge-bg">
                  Open Today
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xs text-brand-muted font-semibold block">Consultation Timings</span>
                <span className="text-sm font-black text-brand-primary">
                  9:30 AM – 8:00 PM (All 7 Days)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN CONTENT GRID */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: CONFIDENTIAL CLINICAL FORM */}
            <div className="lg:col-span-7">
              <div className="bg-brand-surface border border-brand-border/90 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-2xl pointer-events-none" />

                {isSubmitted ? (
                  <div className="text-center py-12 space-y-5 animate-in fade-in duration-300">
                    <div className="w-18 h-18 rounded-3xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center mx-auto border border-brand-secondary/30 shadow-md">
                      <CheckCircle2 className="w-10 h-10 text-brand-secondary" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold">
                      <Check className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>Message Received By Care Desk</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-brand-primary">
                        Thank You, {formData.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                        Your confidential inquiry regarding{' '}
                        <span className="font-bold text-brand-text">{formData.department}</span> has been assigned to our lead clinical coordinator in Kalyan Nagar.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-brand-surface-low border border-brand-border/80 max-w-md mx-auto text-left text-xs space-y-1.5">
                      <div className="flex justify-between text-brand-muted">
                        <span>Contact Number:</span>
                        <span className="font-bold text-brand-text">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between text-brand-muted">
                        <span>Preferred Slot:</span>
                        <span className="font-bold text-brand-text">{formData.timeSlot}</span>
                      </div>
                      <div className="flex justify-between text-brand-muted">
                        <span>Expected Response:</span>
                        <span className="font-bold text-brand-secondary">Within 30 Minutes</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            department: 'Dental & Oral Surgery',
                            consultationType: 'In-Clinic (HRBR Layout)',
                            timeSlot: 'Morning (9:30 AM – 1:00 PM)',
                            subject: '',
                            message: '',
                          });
                        }}
                      >
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-brand-border/60 pb-5">
                      <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
                        Send a Medical Inquiry
                      </h2>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        Fill out this brief form and our clinical coordinator will reach out to schedule your preferred time slot or answer treatment inquiries.
                      </p>
                    </div>

                    {/* Department Selector Pills */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-primary">
                        Select Clinical Department
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {departments.map((dept) => {
                          const isSelected = formData.department === dept;
                          return (
                            <button
                              key={dept}
                              type="button"
                              onClick={() => setFormData({ ...formData, department: dept })}
                              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                                isSelected
                                  ? 'bg-brand-secondary text-white border-brand-secondary shadow-xs'
                                  : 'bg-brand-surface-low border-brand-border/80 text-brand-text hover:border-brand-secondary/40'
                              }`}
                            >
                              <span>{dept}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Consultation Mode */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-brand-primary">
                        Preferred Consultation Mode
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {['In-Clinic (HRBR Layout)', 'Online Video Consultation'].map((mode) => {
                          const isSelected = formData.consultationType === mode;
                          return (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setFormData({ ...formData, consultationType: mode })}
                              className={`p-3 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                                isSelected
                                  ? 'bg-brand-badge-bg text-brand-badge-text border-brand-secondary/40 shadow-xs'
                                  : 'bg-brand-surface-low border-brand-border/80 text-brand-muted hover:text-brand-text'
                              }`}
                            >
                              {mode}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-primary mb-1.5">
                          Full Name <span className="text-brand-secondary">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text text-xs focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-primary mb-1.5">
                          Mobile Phone <span className="text-brand-secondary">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 99005 17699"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text text-xs focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all"
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Preferred Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-primary mb-1.5">
                          Email Address <span className="text-brand-secondary">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="rahul.sharma@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text text-xs focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-500 font-semibold mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-primary mb-1.5">
                          Preferred Time Window
                        </label>
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text text-xs focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message / Symptoms */}
                    <div>
                      <label className="block text-xs font-bold text-brand-primary mb-1.5">
                        Inquiry Details / Symptoms <span className="text-brand-secondary">*</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Please briefly describe what treatment or consultation you are looking for (e.g. Tooth implant pricing, acne scar revision, PRP hair sessions)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text text-xs focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all resize-none"
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-500 font-semibold mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-[11px] text-brand-muted">
                        <ShieldCheck className="w-4 h-4 text-brand-secondary shrink-0" />
                        <span>100% Medical Confidentiality Guaranteed</span>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={isLoading}
                        rightIcon={<Send className="w-4 h-4" />}
                      >
                        Submit Medical Inquiry
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CLINIC EXTERIOR PHOTO, GOOGLE MAP & TRANSIT */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* CLINIC EXTERIOR PHOTO SHOWCASE */}
              <div className="rounded-3xl border border-brand-border/90 bg-brand-surface overflow-hidden shadow-sm group">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="/exterior-view.png"
                    alt="PRALASH Dermystique & Dentique Clinic Exterior in HRBR Layout Kalyan Nagar Bangalore"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Status Chip */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 backdrop-blur-md shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                      Open Today · 9:30 AM – 8:00 PM
                    </span>
                  </div>

                  {/* Bottom Image Details */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <div className="text-sm font-black tracking-wide">
                      PRALASH Multi-Specialty Clinic
                    </div>
                    <div className="text-xs text-white/80 mt-0.5">
                      HRBR Layout 1st Block, Kalyan Nagar, Bengaluru
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-brand-surface border-t border-brand-border/60 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-brand-muted">
                    <MapPin className="w-4 h-4 text-brand-secondary shrink-0" />
                    <span>Block 1, 708, 3rd Cross Rd, Bengaluru 560043</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=PRALASH+Dermystique+%26+Dentique+HRBR+Layout+Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-secondary hover:underline shrink-0"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* INTERACTIVE GOOGLE MAPS CARD */}
              <div className="rounded-3xl border border-brand-border/90 bg-brand-surface p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-brand-primary flex items-center gap-1.5">
                      <Navigation className="w-4 h-4 text-brand-secondary" />
                      <span>Live Clinic Location Map</span>
                    </h3>
                    <p className="text-[11px] text-brand-muted mt-0.5">
                      Located conveniently off Outer Ring Road, Kalyan Nagar
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=PRALASH+Dermystique+%26+Dentique+HRBR+Layout+Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-brand-surface-low border border-brand-border text-xs font-bold text-brand-primary hover:text-brand-secondary hover:border-brand-secondary/40 transition-colors inline-flex items-center gap-1 shadow-2xs"
                  >
                    <span>Open Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Maps iFrame Embed */}
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-brand-border/80 bg-brand-surface-low relative">
                  <iframe
                    title="PRALASH Clinic Location Map"
                    src="https://maps.google.com/maps?q=13.0175162,77.6417083&hl=en&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* TRANSIT & PARKING INFORMATION */}
              <div className="p-5 sm:p-6 rounded-3xl bg-brand-surface border border-brand-border/90 space-y-4 shadow-sm text-xs">
                <h4 className="font-bold text-brand-primary text-sm flex items-center gap-2">
                  <Building className="w-4 h-4 text-brand-secondary" />
                  <span>How to Reach PRALASH Clinic</span>
                </h4>

                <div className="space-y-3 text-brand-muted">
                  <div className="flex items-start gap-3">
                    <Train className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-brand-text">Metro Stations</div>
                      <p className="text-[11px] mt-0.5 leading-relaxed">
                        Baiyappanahalli &amp; Swami Vivekananda Road (Purple Line) &bull; Quick 10-min cab connection via Outer Ring Road.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-brand-text">Valet Drop-off &amp; Parking</div>
                      <p className="text-[11px] mt-0.5 leading-relaxed">
                        Dedicated patient drop-off bay directly at our clinic entrance with secure roadside parking along 3rd Cross Rd.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACUTE & SAME-DAY TRIAGE CARD */}
              <div className="p-5 rounded-2xl bg-brand-surface-low border border-brand-border/80 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-brand-primary flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-secondary" />
                    <span>Need Same-Day Priority Attention?</span>
                  </div>
                  <p className="text-[11px] text-brand-muted">
                    Call our triage desk for immediate same-day appointment slot availability.
                  </p>
                </div>
                <a href={`tel:${CLINIC_INFO.phone}`} className="shrink-0">
                  <Button variant="outline" size="sm" leftIcon={<Phone className="w-3.5 h-3.5 text-brand-secondary" />}>
                    Call Now
                  </Button>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS ABOUT VISITING */}
      <section className="w-full py-16 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              Visiting Guidelines
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Frequently Asked Questions About Appointments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2">
              <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>Do I need to book in advance or can I walk in?</span>
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed pl-6">
                While we accommodate walk-in patients during clinic hours, we strongly recommend scheduling in advance to guarantee zero wait times with your designated senior specialist.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2">
              <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>Is parking easily accessible at the clinic?</span>
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed pl-6">
                Yes. Our facility at HRBR Layout 1st Block features a wide frontage with a dedicated patient drop-off bay and ample parking on 3rd Cross Road.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2">
              <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>How quickly will your care coordinators respond?</span>
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed pl-6">
                Inquiries sent through our form or WhatsApp during operating hours (9:30 AM – 8:00 PM) receive a direct coordinator response within 30 minutes.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2">
              <h3 className="text-sm font-bold text-brand-primary flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span>Can I get an online consultation before visiting in person?</span>
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed pl-6">
                Yes! We offer tele-consultations for dermatology skin concerns, hair assessments, and preliminary dental second opinions for outstation or busy patients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

