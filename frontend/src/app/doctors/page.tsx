'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  Stethoscope,
  Sparkles,
  Shield,
  Activity,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Phone,
  Clock,
  Award,
  ArrowRight,
  BadgePercent,
  FileText,
} from 'lucide-react';
import { DOCTORS, CLINIC_INFO } from '@/data/clinicData';
import { Department, Doctor } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export default function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState<boolean>(false);
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(DOCTORS);

  useEffect(() => {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    fetch(`${apiBase}/api/doctors`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: Doctor[] = json.data.map((d: any) => ({
            id: d.doctorId || d.id || d._id,
            name: d.name,
            title: d.title,
            department: d.department,
            qualifications: d.qualifications,
            experienceYears: d.experienceYears,
            rating: d.rating || 4.9,
            reviewCount: d.reviewCount || 100,
            image: d.image,
            availability: d.availability,
            fee: d.fee,
            bio: d.bio,
            languages: d.languages || ['English'],
            specializations: d.specializations || [],
            isAvailableToday: d.isAvailableToday ?? true,
          }));
          setDoctorsList(mapped);
        }
      })
      .catch((err) => {
        // Fallback to static data
      });
  }, []);

  const filterTabs = [
    { id: 'All', label: 'All Specialists', count: doctorsList.length, icon: Users },
    {
      id: 'Dental',
      label: 'Dental & Oral Surgery',
      count: doctorsList.filter((d) => d.department === 'Dental').length,
      icon: Stethoscope,
    },
    {
      id: 'Skin',
      label: 'Clinical Dermatology',
      count: doctorsList.filter((d) => d.department === 'Skin').length,
      icon: Sparkles,
    },
    {
      id: 'Hair',
      label: 'Trichology & Hair',
      count: doctorsList.filter((d) => d.department === 'Hair').length,
      icon: Shield,
    },
    {
      id: 'Internal Medicine',
      label: 'Internal Medicine',
      count: doctorsList.filter((d) => d.department === 'Internal Medicine').length,
      icon: Activity,
    },
  ];

  const isFounder = (id: string) =>
    id === 'dr-premalatha-v' || id === 'dr-shubha-cn' || id === 'prof-dr-lalith-anand';

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter((doc) => {
      const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
      const matchesAvailable = !onlyAvailableToday || doc.isAvailableToday;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        doc.name.toLowerCase().includes(query) ||
        doc.title.toLowerCase().includes(query) ||
        doc.specializations.some((s) => s.toLowerCase().includes(query)) ||
        doc.qualifications.toLowerCase().includes(query);
      return matchesDept && matchesAvailable && matchesQuery;
    });
  }, [selectedDept, searchQuery, onlyAvailableToday, doctorsList]);

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd
        type="Clinic"
        data={{
          department: selectedDept,
        }}
      />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-12 lg:py-16">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Bio, CTAs & Key Stats */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-secondary" />
                <span>NABH Accredited Standards · Senior Medical Faculty</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
                Consult With Renowned Specialists &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Clinical Directors
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                Every consultant physician, implant surgeon, and clinical dermatologist at PRALASH brings advanced post-graduate qualifications (MD, MDS, FRCP, FICOI) and decades of distinguished patient care in Bengaluru.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link href="/booking">
                  <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                    Book In-Clinic Consultation
                  </Button>
                </Link>
                <a href={`tel:${CLINIC_INFO.phone}`}>
                  <Button variant="outline" size="md" leftIcon={<Phone className="w-4 h-4 text-brand-secondary" />}>
                    Call Care Desk
                  </Button>
                </a>
              </div>

              {/* Key Trust Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">15+ Yrs</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Avg Experience</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-secondary">100%</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Board-Certified</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">25,000+</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Treatments</div>
                </div>
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary">7 Days</div>
                  <div className="text-[11px] text-brand-muted font-semibold mt-0.5">Open All Week</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Medical Team Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 rounded-full bg-brand-secondary/15 blur-3xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border border-brand-border/90 bg-brand-surface shadow-xl group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-surface-low">
                  <Image
                    src="/images/medical-team-hero.jpg"
                    alt="PRALASH Multi-Specialty Clinical Leadership and Senior Medical Faculty"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Bottom Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Left Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface/95 backdrop-blur-md border border-brand-border/60 shadow-md text-xs font-bold text-brand-primary">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
                      <span>Accredited Faculty</span>
                    </div>
                  </div>

                  {/* Top Right Rating Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-black/85 backdrop-blur-md border border-brand-border/60 shadow-md text-xs font-bold text-brand-primary">
                      <span className="text-amber-500 text-sm">★</span>
                      <span>4.98</span>
                      <span className="text-brand-muted font-semibold text-[11px]">(1.2k+ Reviews)</span>
                    </div>
                  </div>

                  {/* Bottom Image Overlay Strip */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-extrabold tracking-wide text-white">
                        PRALASH Medical Board
                      </div>
                      <div className="text-[11px] text-white/80">
                        Dermatology · Implantology · Trichology
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-brand-secondary text-white shadow-xs">
                      HRBR Layout
                    </span>
                  </div>
                </div>

                {/* Sub-card assurance footer */}
                <div className="p-3.5 sm:p-4 bg-brand-surface border-t border-brand-border/60 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 border border-brand-secondary/20">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-primary text-[11px]">Direct Doctor Care</div>
                      <div className="text-[10px] text-brand-muted">No intern handoffs</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 border border-brand-secondary/20">
                      <Sparkles className="w-3.5 h-3.5 text-brand-secondary" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-primary text-[11px]">Hospital Protocol</div>
                      <div className="text-[10px] text-brand-muted">Class-B autoclave</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER CONTROLS & ALL SPECIALISTS DIRECTORY */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-xs">
            {/* Department Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedDept === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedDept(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-secondary text-white shadow-xs'
                        : 'bg-brand-surface-low border border-brand-border/70 text-brand-text hover:bg-brand-surface hover:text-brand-secondary'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-brand-surface text-brand-muted border border-brand-border'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Search & Available Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Today Toggle */}
              <button
                type="button"
                onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  onlyAvailableToday
                    ? 'bg-brand-badge-bg text-brand-badge-text border-brand-secondary/40 shadow-xs'
                    : 'bg-brand-surface-low text-brand-muted border-brand-border hover:text-brand-primary'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    onlyAvailableToday ? 'bg-brand-secondary animate-pulse' : 'bg-brand-muted'
                  }`}
                />
                <span>Available Today</span>
              </button>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search doctor, procedure..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text placeholder-brand-muted focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all shadow-2xs"
                />
              </div>
            </div>
          </div>

          {/* Results Summary Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Showing {filteredDoctors.length} Accredited Medical Specialists
            </span>
            {(searchQuery || selectedDept !== 'All' || onlyAvailableToday) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchQuery('');
                  setOnlyAvailableToday(false);
                }}
                className="text-xs text-brand-secondary font-bold hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8 space-y-3">
              <Users className="w-12 h-12 text-brand-muted mx-auto" />
              <h3 className="text-lg font-bold text-brand-primary">No specialists found</h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                No specialists match your search criteria. Try clearing filters or search for another condition.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchQuery('');
                  setOnlyAvailableToday(false);
                }}
                className="px-4 py-2 rounded-xl bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary-hover transition-colors shadow-xs cursor-pointer"
              >
                Show All Specialists
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} featured={isFounder(doc.id)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY CONSULT AT PRALASH (CLINICAL ASSURANCE STRIP) */}
      <section className="w-full py-16 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              Patient Care Assurance
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Why Patients Choose PRALASH Doctors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <Users className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Direct Senior Consultant Care</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Zero intern or assistant handoffs. Every procedure is performed exclusively by your lead consultant.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <ShieldCheck className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Hospital Sterilization Protocols</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Class-B vacuum autoclaves, sealed dental surgical suites, and sterile clinical instrumentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <BadgePercent className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">0% Interest Healthcare EMI</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Flexible 3, 6, and 12-month zero-interest payment installments with instant digital clearance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-background border border-brand-border/80 space-y-2 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <FileText className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Cashless Insurance Desk</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Hassle-free paperwork assistance for eligible maxillofacial surgeries and medical dermatology.
              </p>
            </div>
          </div>

          {/* Quick Booking CTA Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-background border border-brand-border/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-brand-primary">
                Need Help Choosing the Right Specialist?
              </h3>
              <p className="text-xs text-brand-muted">
                Our care coordinators can match you with the appropriate doctor based on your specific condition.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a href={`tel:${CLINIC_INFO.phone}`}>
                <Button variant="outline" size="md" leftIcon={<Phone className="w-4 h-4 text-brand-secondary" />}>
                  Call: {CLINIC_INFO.phone}
                </Button>
              </a>
              <Link href="/booking">
                <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                  Book Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
