'use client';

import React, { useState } from 'react';
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
    department: 'General Inquiry',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'A valid email address is required.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.message.trim()) errs.message = 'Please provide details of your inquiry.';
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

      {/* Header Banner */}
      <section className="w-full bg-brand-surface-low border-b border-brand-border/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" size="md">
              10 Contact Us & Emergency
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight">
              Connect With Arquette Multi-Speciality Clinic
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              We welcome patient inquiries, international medical referrals, and appointment scheduling. Our clinical coordinators respond within two business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 sm:p-10 shadow-xs">
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <Badge variant="success" size="md">
                      Message Dispatched
                    </Badge>
                    <h3 className="text-2xl font-bold text-brand-text">Thank You, {formData.name}</h3>
                    <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                      Your confidential clinical inquiry has been received by our Bengaluru patient care coordinator. We will contact you at{' '}
                      <span className="font-semibold text-brand-text">{formData.email}</span> shortly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          department: 'General Inquiry',
                          subject: '',
                          message: '',
                        });
                      }}
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-brand-primary tracking-tight">
                        Send a Confidential Medical Message
                      </h2>
                      <p className="text-xs text-brand-muted mt-1">
                        All patient health communications are protected under strict patient privacy & medical confidentiality standards.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Your legal name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-1">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          placeholder="+44 7911 123456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-1">
                          Medical Department
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        >
                          <option>General Inquiry</option>
                          <option>Dental & Orthodontics</option>
                          <option>Dermatology & Skin</option>
                          <option>Trichology & Hair Restoration</option>
                          <option>Internal Medicine & MOT</option>
                          <option>International Concierge</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-brand-text mb-1">
                          Subject / Reason for Contact
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Consultation inquiry, second opinion, or pricing question"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-brand-text mb-1">
                          Message / Clinical Details *
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Please provide any relevant background or questions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        />
                        {errors.message && (
                          <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isLoading}
                      rightIcon={<Send className="w-4 h-4" />}
                      className="w-full sm:w-auto"
                    >
                      Transmit Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Clinic Info, Hours & Transit Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Urgent Emergency Alert Card */}
              <div className="p-6 rounded-3xl bg-red-50 border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                  <span>24/7 Acute Medical Emergency</span>
                </div>
                <p className="text-xs text-red-900 leading-relaxed">
                  For sudden dental hemorrhages, acute facial trauma, or urgent medical symptoms, call our emergency triage physician immediately:
                </p>
                <a
                  href={`tel:${CLINIC_INFO.emergencyPhone}`}
                  className="inline-block text-lg font-black text-red-700 hover:underline"
                >
                  {CLINIC_INFO.emergencyPhone}
                </a>
              </div>

              {/* Clinic Location & Directory Card */}
              <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
                <h3 className="text-lg font-bold text-brand-text">Clinic Address & Contact</h3>
                <div className="space-y-3 text-xs text-brand-muted">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-brand-text">{CLINIC_INFO.name}</div>
                      <div>{CLINIC_INFO.address.street}</div>
                      <div>{CLINIC_INFO.address.city}, {CLINIC_INFO.address.postcode}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-secondary shrink-0" />
                    <span>Direct Appointments: {CLINIC_INFO.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-secondary shrink-0" />
                    <span>General: {CLINIC_INFO.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-secondary shrink-0" />
                    <span>{CLINIC_INFO.operatingHours}</span>
                  </div>
                </div>

                {/* Transit & Parking Details */}
                <div className="pt-4 border-t border-brand-border/60 space-y-2 text-xs">
                  <h4 className="font-bold text-brand-text flex items-center gap-1.5">
                    <Train className="w-4 h-4 text-brand-secondary" />
                    <span>Nearest Metro & Transit Hubs</span>
                  </h4>
                  <p className="text-brand-muted">
                    Baiyappanahalli & Swami Vivekananda Road Metro Stations (Purple Line) &bull; Kalyan Nagar Bus Depot & HRBR Layout 1st Block (2 min walk) &bull; Rapid access via Outer Ring Road (Kammanahalli, Hennur & Hebbal).
                  </p>

                  <h4 className="font-bold text-brand-text flex items-center gap-1.5 pt-2">
                    <Car className="w-4 h-4 text-brand-secondary" />
                    <span>Patient Valet & On-Site Parking</span>
                  </h4>
                  <p className="text-brand-muted">
                    Dedicated patient drop-off bay directly outside our clinic entrance with secure on-site parking at Block 1, HRBR Layout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
