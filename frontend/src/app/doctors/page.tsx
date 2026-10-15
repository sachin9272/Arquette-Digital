'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Stethoscope, Sparkles, Shield, Activity, Users } from 'lucide-react';
import { DOCTORS } from '@/data/clinicData';
import { Department, Doctor } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export default function DoctorsPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [doctorsList, setDoctorsList] = useState<Doctor[]>(DOCTORS);

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
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
        console.warn('Backend doctors API not reachable, using static catalog:', err);
      });
  }, []);

  const filterTabs = [
    { id: 'All', label: `All Specialists (${doctorsList.length})`, icon: Users },
    { id: 'Dental', label: 'Dental & Orthodontics', icon: Stethoscope },
    { id: 'Skin', label: 'Dermatology & Skin', icon: Sparkles },
    { id: 'Hair', label: 'Trichology & Hair', icon: Shield },
    { id: 'Internal Medicine', label: 'Internal Medicine', icon: Activity },
  ];

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter((doc) => {
      const matchesDept = selectedDept === 'All' || doc.department === selectedDept;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        doc.name.toLowerCase().includes(query) ||
        doc.title.toLowerCase().includes(query) ||
        doc.specializations.some((s) => s.toLowerCase().includes(query)) ||
        doc.qualifications.toLowerCase().includes(query);
      return matchesDept && matchesQuery;
    });
  }, [selectedDept, searchQuery, doctorsList]);

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd
        type="Clinic"
        data={{
          department: selectedDept,
        }}
      />

      {/* Header Banner */}
      <section className="w-full bg-brand-surface-low border-b border-brand-border/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" size="md">
              03 Our Doctors
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight">
              Consult With Leading Medical Specialists & Surgeons
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every consultant at Arquette holds fellowship credentials from Royal Colleges or international medical boards, ensuring peer-reviewed clinical standard of care.
            </p>
          </div>

          {/* Interactive Filter & Search Bar */}
          <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {filterTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedDept === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedDept(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-brand-surface border border-brand-border text-brand-text hover:bg-brand-surface-container'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search doctor, procedure, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-text focus:ring-2 focus:ring-brand-accent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Showing {filteredDoctors.length} Verified Consultants
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs text-brand-secondary font-bold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8">
              <Users className="w-12 h-12 text-brand-muted mx-auto mb-3" />
              <h3 className="text-lg font-bold text-brand-text">No doctors found</h3>
              <p className="text-xs text-brand-muted mt-1 max-w-sm mx-auto">
                No specialists match your search term &ldquo;{searchQuery}&rdquo;. Try another specialty or clear the filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
