'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Clock,
  MapPin,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Shield,
  Activity,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    {
      label: 'Clinical Services',
      href: '/services',
      hasDropdown: true,
      children: [
        { label: 'All Services Directory', href: '/services', icon: Activity },
        { label: 'Dental Treatments & Aligners', href: '/services/dental', icon: Stethoscope },
        { label: 'Skin Treatments & Dermatology', href: '/services/skin', icon: Sparkles },
        { label: 'Hair Restoration & Trichology', href: '/services/hair', icon: Shield },
      ],
    },
    { label: 'Patient Education & Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-surface/95 backdrop-blur-md shadow-xs border-b border-brand-border/60 transition-colors">
      {/* Top Triage & Emergency Strip */}
      <div className="bg-brand-primary text-white text-xs border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${CLINIC_INFO.emergencyPhone}`}
              className="flex items-center gap-1.5 text-red-300 hover:text-white font-semibold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping inline-block" />
              <span>Emergency: {CLINIC_INFO.emergencyPhone}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon–Sun: 9:30 AM – 8:00 PM</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>HRBR Layout, Kalyan Nagar, Bengaluru</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] font-medium text-slate-300">
              NABH Accredited Multi-Speciality Center
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="font-bold text-xl tracking-tighter">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-brand-primary leading-tight font-serif">
              ARQUETTE
            </span>
            <span className="text-[10px] tracking-widest text-brand-secondary uppercase font-bold">
              Multi-Speciality Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      pathname.startsWith('/services')
                        ? 'text-brand-secondary bg-brand-surface-low'
                        : 'text-brand-text hover:text-brand-secondary hover:bg-brand-surface-low'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-4 h-4 text-brand-muted group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown Menu */}
                  {isServicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-72 rounded-2xl bg-brand-surface border border-brand-border shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                      {link.children?.map((child) => {
                        const Icon = child.icon;
                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                              pathname === child.href
                                ? 'bg-brand-surface-container text-brand-secondary'
                                : 'text-brand-text hover:bg-brand-surface-low hover:text-brand-secondary'
                            }`}
                          >
                            <span className="w-7 h-7 rounded-lg bg-brand-surface-low flex items-center justify-center text-brand-secondary">
                              <Icon className="w-4 h-4" />
                            </span>
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? 'text-brand-secondary bg-brand-surface-low font-bold'
                    : 'text-brand-text hover:text-brand-secondary hover:bg-brand-surface-low'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-lg border border-brand-border bg-brand-surface text-brand-text hover:bg-brand-surface-low transition-colors"
            title="Call Reception"
            aria-label="Call Reception"
          >
            <Phone className="w-4 h-4 text-brand-secondary" />
          </a>

          <Link href="/booking">
            <Button
              variant="secondary"
              size="md"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Appointment
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border border-brand-border bg-brand-surface text-brand-text hover:bg-brand-surface-low transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-brand-surface border-t border-brand-border p-4 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-text hover:bg-brand-surface-low"
            >
              01 Home
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-text hover:bg-brand-surface-low"
            >
              02 About the Clinic
            </Link>
            <Link
              href="/doctors"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-text hover:bg-brand-surface-low"
            >
              03 Our Doctors
            </Link>
            <div className="pt-2 pb-1 px-3 text-xs font-bold text-brand-muted uppercase">
              Clinical Specialties
            </div>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-text hover:bg-brand-surface-low pl-6"
            >
              04 All Services Directory
            </Link>
            <Link
              href="/services/dental"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-text hover:bg-brand-surface-low pl-6"
            >
              05 Dental Treatments & Aligners
            </Link>
            <Link
              href="/services/skin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-text hover:bg-brand-surface-low pl-6"
            >
              06 Skin Treatments & Dermatology
            </Link>
            <Link
              href="/services/hair"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-brand-text hover:bg-brand-surface-low pl-6"
            >
              07 Hair Treatments & Restoration
            </Link>
            <div className="pt-2 border-t border-brand-border/60">
              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-secondary bg-brand-surface-low"
              >
                08 Appointment Booking Engine
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-text hover:bg-brand-surface-low"
              >
                09 Blog & Patient Education
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-brand-text hover:bg-brand-surface-low"
              >
                10 Contact Us & Emergency
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
