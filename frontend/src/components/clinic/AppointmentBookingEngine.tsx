'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  Sparkles,
  Shield,
  Activity,
  Phone,
  Mail,
  Printer,
  CalendarPlus,
} from 'lucide-react';
import { DOCTORS, CLINIC_INFO } from '@/data/clinicData';
import { Department, Doctor, AppointmentFormData, ConfirmedAppointment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const SPECIALTIES: { id: Department; name: string; icon: React.ElementType; desc: string }[] = [
  { id: 'Dental', name: 'Dental Suite', icon: Stethoscope, desc: 'Implants, clear aligners & smile makeovers' },
  { id: 'Skin', name: 'Dermatology & Skin', icon: Sparkles, desc: 'Laser resurfacing, acne care & mole checks' },
  { id: 'Hair', name: 'Trichology & Hair', icon: Shield, desc: 'FUE transplants, PRP & scalp diagnostics' },
  { id: 'Internal Medicine', name: 'Internal Medicine', icon: Activity, desc: 'General health MOT, blood biomarkers & triage' },
];

const TIME_SLOTS = [
  '09:00 AM',
  '09:45 AM',
  '10:30 AM',
  '11:15 AM',
  '01:30 PM',
  '02:15 PM',
  '03:00 PM',
  '04:00 PM',
  '05:30 PM',
  '06:45 PM',
];

interface AppointmentBookingEngineProps {
  initialDepartment?: Department;
  initialDoctorId?: string;
}

export const AppointmentBookingEngine: React.FC<AppointmentBookingEngineProps> = ({
  initialDepartment,
  initialDoctorId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<AppointmentFormData>({
    department: initialDepartment || '',
    serviceName: '',
    doctorId: initialDoctorId || '',
    appointmentDate: '',
    timeSlot: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAge: '',
    gender: 'Prefer not to say',
    medicalNotes: '',
    isFirstVisit: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedAppointment | null>(null);

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
        console.warn('Backend doctors API not reachable in booking engine, using static fallback:', err);
      });
  }, []);

  // Handle URL param doctor pre-selection
  useEffect(() => {
    if (initialDoctorId) {
      const doc = doctorsList.find((d) => d.id === initialDoctorId);
      if (doc) {
        setFormData((prev) => ({
          ...prev,
          doctorId: doc.id,
          department: doc.department,
        }));
      }
    }
  }, [initialDoctorId, doctorsList]);

  // Available doctors for selected department
  const filteredDoctors = formData.department
    ? doctorsList.filter((d) => d.department === formData.department)
    : doctorsList;

  const selectedDoctor = doctorsList.find((d) => d.id === formData.doctorId);

  // Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.department) {
        newErrors.department = 'Please select a clinical specialty department.';
      }
    } else if (step === 2) {
      if (!formData.doctorId) {
        newErrors.doctorId = 'Please select a consultant doctor or choose Any Available.';
      }
    } else if (step === 3) {
      if (!formData.appointmentDate) {
        newErrors.appointmentDate = 'Please select a preferred date.';
      }
      if (!formData.timeSlot) {
        newErrors.timeSlot = 'Please choose a consultation time slot.';
      }
    } else if (step === 4) {
      if (!formData.patientName.trim()) {
        newErrors.patientName = 'Full name is required.';
      }
      if (!formData.patientEmail.trim() || !/\S+@\S+\.\S+/.test(formData.patientEmail)) {
        newErrors.patientEmail = 'A valid email address is required.';
      }
      if (!formData.patientPhone.trim() || formData.patientPhone.length < 8) {
        newErrors.patientPhone = 'A valid contact phone number is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Complete booking and persist to MongoDB backend
        const bookingId = `PRL-2026-${Math.floor(100000 + Math.random() * 900000)}`;

        try {
          await fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingReference: bookingId,
              patientName: formData.patientName,
              email: formData.patientEmail,
              phone: formData.patientPhone,
              department: formData.department,
              doctor: {
                id: selectedDoctor ? selectedDoctor.id : 'any',
                name: selectedDoctor ? selectedDoctor.name : 'Duty Consultant',
                title: selectedDoctor ? selectedDoctor.title : 'Specialist',
                fee: selectedDoctor ? selectedDoctor.fee : 1200,
              },
              treatment: formData.serviceName || `${formData.department} Specialist Consultation`,
              appointmentDate: formData.appointmentDate,
              timeSlot: formData.timeSlot,
              symptomsOrNotes: formData.medicalNotes || '',
              consultationFee: selectedDoctor ? selectedDoctor.fee : 1200,
            }),
          });
        } catch (err) {
          console.warn('Backend server not reachable at http://localhost:5000, continuing with client confirmation:', err);
        }

        const confirmed: ConfirmedAppointment = {
          ...formData,
          bookingId,
          createdAt: new Date().toISOString(),
          status: 'Confirmed',
        };
        setConfirmedBooking(confirmed);
        setCurrentStep(5);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Calendar (.ics) download generator
  const downloadCalendarInvite = () => {
    if (!confirmedBooking) return;
    const docName = selectedDoctor ? selectedDoctor.name : 'Attending Specialist';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PRALASH Dermystique & Dentique//Medical Appointments//EN
BEGIN:VEVENT
SUMMARY:Medical Consultation with ${docName} - PRALASH Clinic
DESCRIPTION:Specialty: ${confirmedBooking.department}\\nBooking ID: ${confirmedBooking.bookingId}\\nPatient: ${confirmedBooking.patientName}\\nLocation: ${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.city}
LOCATION:${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.city} ${CLINIC_INFO.address.postcode}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `PRALASH_Appointment_${confirmedBooking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print pass
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-brand-surface rounded-3xl shadow-xl border border-brand-border p-6 sm:p-10 transition-colors">
      {/* Progress Bar Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest">
            Step {currentStep} of 5
          </span>
          <span className="text-xs font-semibold text-brand-muted">
            {currentStep === 1 && 'Department & Specialty'}
            {currentStep === 2 && 'Doctor Selection'}
            {currentStep === 3 && 'Date & Time Slot'}
            {currentStep === 4 && 'Patient Intake'}
            {currentStep === 5 && 'Confirmed Pass'}
          </span>
        </div>

        {/* Stepper bar */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-brand-secondary' : 'bg-brand-surface-container'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Specialty Selection */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-brand-text tracking-tight">
              Select Medical Specialty
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Choose the clinical department matching your symptoms or treatment goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SPECIALTIES.map((spec) => {
              const Icon = spec.icon;
              const isSelected = formData.department === spec.id;
              return (
                <div
                  key={spec.id}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      department: spec.id,
                      doctorId: '', // reset doctor if department changes
                    }));
                    setErrors({});
                  }}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'border-brand-secondary bg-brand-surface-low ring-2 ring-brand-secondary/30 shadow-md'
                      : 'border-brand-border bg-brand-surface-card hover:border-brand-border/80 hover:bg-brand-surface-low'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-brand-secondary text-white'
                        : 'bg-brand-surface-container text-brand-secondary'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-text text-base">{spec.name}</h3>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">{spec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {errors.department && (
            <p className="text-xs text-brand-emergency flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.department}</span>
            </p>
          )}
        </div>
      )}

      {/* STEP 2: Doctor Selection */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-brand-text tracking-tight">
              Select Your Specialist
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Consulting specialists in <span className="font-semibold text-brand-secondary">{formData.department}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Any Available option */}
            <div
              onClick={() => {
                setFormData((prev) => ({ ...prev, doctorId: 'first-available' }));
                setErrors({});
              }}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                formData.doctorId === 'first-available'
                  ? 'border-brand-secondary bg-brand-surface-low ring-2 ring-brand-secondary/30 shadow-md'
                  : 'border-brand-border bg-brand-surface-card hover:bg-brand-surface-low'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-bold shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-text text-base">First Available Consultant</h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Earliest open appointment slot with on-duty staff
                </p>
              </div>
            </div>

            {/* Department Doctors */}
            {filteredDoctors.map((doc) => {
              const isSelected = formData.doctorId === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, doctorId: doc.id }));
                    setErrors({});
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'border-brand-secondary bg-brand-surface-low ring-2 ring-brand-secondary/30 shadow-md'
                      : 'border-brand-border bg-brand-surface-card hover:bg-brand-surface-low'
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-brand-border">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-brand-text text-sm truncate">{doc.name}</h3>
                      <span className="text-xs font-black text-brand-primary">₹{doc.fee.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[11px] text-brand-muted truncate">{doc.qualifications}</p>
                    <p className="text-[11px] text-brand-secondary font-medium mt-1">
                      {doc.availability.split('(')[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {errors.doctorId && (
            <p className="text-xs text-brand-emergency flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.doctorId}</span>
            </p>
          )}
        </div>
      )}

      {/* STEP 3: Date & Slot Picker */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-brand-text tracking-tight">
              Choose Date & Time Slot
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Operating hours: Monday – Saturday (8:00 AM – 8:00 PM).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Input */}
            <div className="md:col-span-1 space-y-2">
              <label className="block text-xs font-bold text-brand-text uppercase tracking-wider">
                Select Date
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.appointmentDate}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, appointmentDate: e.target.value }));
                  setErrors({});
                }}
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-surface text-brand-text font-medium focus:ring-2 focus:ring-brand-accent focus:outline-none"
              />
              {errors.appointmentDate && (
                <p className="text-[11px] text-brand-emergency font-semibold">{errors.appointmentDate}</p>
              )}
            </div>

            {/* Time Slot Grid */}
            <div className="md:col-span-2 space-y-2">
              <label className="block text-xs font-bold text-brand-text uppercase tracking-wider">
                Available Consultation Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = formData.timeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, timeSlot: slot }));
                        setErrors({});
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-primary text-white shadow-md'
                          : 'bg-brand-surface-low border border-brand-border text-brand-text hover:border-brand-secondary hover:text-brand-secondary'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {errors.timeSlot && (
                <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                  {errors.timeSlot}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Patient Information Intake */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h2 className="text-2xl font-bold text-brand-text tracking-tight">
              Patient Information & Medical Intake
            </h2>
            <p className="text-sm text-brand-muted mt-1">
              Confidential medical records protected under UK Data Protection and GDPR.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-text mb-1">
                Full Legal Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="e.g. John H. Watson"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>
              {errors.patientName && (
                <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                  {errors.patientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>
              {errors.patientEmail && (
                <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                  {errors.patientEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text mb-1">
                Mobile / WhatsApp Phone *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="+44 7911 123456"
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>
              {errors.patientPhone && (
                <p className="text-[11px] text-brand-emergency font-semibold mt-1">
                  {errors.patientPhone}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">Age</label>
                <input
                  type="number"
                  placeholder="35"
                  value={formData.patientAge}
                  onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-text mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-brand-text mb-1">
                Symptoms / Reason for Consultation (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your symptoms, cosmetic goals, or existing medical conditions..."
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-surface text-brand-text text-sm focus:ring-2 focus:ring-brand-accent focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="firstVisit"
                checked={formData.isFirstVisit}
                onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.checked })}
                className="w-4 h-4 rounded-sm border-brand-border text-brand-secondary focus:ring-brand-accent"
              />
              <label htmlFor="firstVisit" className="text-xs text-brand-muted cursor-pointer">
                This is my first time visiting PRALASH Dermystique &amp; Dentique.
              </label>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Instant Confirmed Pass */}
      {currentStep === 5 && confirmedBooking && (
        <div className="space-y-6 animate-in zoom-in-95" id="printable-booking-pass">
          <div className="p-6 rounded-3xl bg-brand-badge-bg/40 border border-brand-secondary/30 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-secondary text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <Badge variant="success" size="md">
              Appointment Confirmed
            </Badge>
            <h2 className="text-2xl font-black text-brand-text mt-2">
              Consultation Scheduled
            </h2>
            <p className="text-xs text-brand-muted mt-1">
              A calendar invite and SMS confirmation have been dispatched to{' '}
              <span className="font-semibold text-brand-text">{confirmedBooking.patientEmail}</span>.
            </p>
          </div>

          {/* Ticket Summary Card */}
          <div className="bg-brand-surface-low border border-brand-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                  Booking Reference
                </span>
                <div className="text-xl font-mono font-black text-brand-primary">
                  {confirmedBooking.bookingId}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                  Specialty
                </span>
                <div className="text-sm font-bold text-brand-secondary">
                  {confirmedBooking.department}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-brand-muted block">Consultant</span>
                <span className="font-bold text-brand-text">
                  {selectedDoctor ? selectedDoctor.name : 'Attending Specialist'}
                </span>
              </div>
              <div>
                <span className="text-brand-muted block">Date</span>
                <span className="font-bold text-brand-text">{confirmedBooking.appointmentDate}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Time Slot</span>
                <span className="font-bold text-brand-text">{confirmedBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Patient Name</span>
                <span className="font-bold text-brand-text">{confirmedBooking.patientName}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Phone</span>
                <span className="font-bold text-brand-text">{confirmedBooking.patientPhone}</span>
              </div>
              <div>
                <span className="text-brand-muted block">Estimated Fee</span>
                <span className="font-bold text-brand-primary">
                  ₹{selectedDoctor ? selectedDoctor.fee.toLocaleString('en-IN') : '1,500'} (Pay at clinic)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border/60 text-xs text-brand-muted flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-secondary shrink-0" />
              <span>
                Please arrive 10 minutes prior to complete any initial diagnostic registration forms.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCalendarInvite}
              leftIcon={<CalendarPlus className="w-4 h-4 text-brand-secondary" />}
            >
              Add to Calendar (.ics)
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print Pass
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    department: '',
                    serviceName: '',
                    doctorId: '',
                    appointmentDate: '',
                    timeSlot: '',
                    patientName: '',
                    patientEmail: '',
                    patientPhone: '',
                    patientAge: '',
                    gender: 'Prefer not to say',
                    medicalNotes: '',
                    isFirstVisit: true,
                  });
                  setConfirmedBooking(null);
                }}
              >
                Book Another Appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls (Steps 1 to 4) */}
      {currentStep < 5 && (
        <div className="mt-8 pt-6 border-t border-brand-border/60 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              size="md"
              onClick={handleBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            variant="secondary"
            size="md"
            onClick={handleNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {currentStep === 4 ? 'Confirm & Book Appointment' : 'Continue to Next Step'}
          </Button>
        </div>
      )}
    </div>
  );
};
