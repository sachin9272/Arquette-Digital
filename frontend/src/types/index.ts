export type Department = 'Dental' | 'Skin' | 'Hair' | 'Internal Medicine';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  department: Department;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  image: string;
  availability: string;
  fee: number;
  bio: string;
  languages: string[];
  specializations: string[];
  isAvailableToday?: boolean;
}

export interface TreatmentItem {
  name: string;
  description: string;
  idealFor: string;
  duration: string;
  recovery: string;
  priceFrom: number;
}

export interface ServiceDetail {
  id: string;
  slug: string;
  department: Department;
  title: string;
  headline: string;
  heroImage: string;
  description: string;
  treatments: TreatmentItem[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
}

export interface AppointmentFormData {
  department: Department | '';
  serviceName: string;
  doctorId: string;
  appointmentDate: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge: string;
  gender: string;
  medicalNotes: string;
  isFirstVisit: boolean;
}

export interface ConfirmedAppointment extends AppointmentFormData {
  bookingId: string;
  createdAt: string;
  status: 'Confirmed' | 'Pending';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  department: Department;
  authorName: string;
  authorRole: string;
  authorImage: string;
  readTime: string;
  publishedDate: string;
  coverImage: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  department: Department;
  rating: number;
  comment: string;
  date: string;
  doctorName: string;
  verified: boolean;
}

export type ThemeMode = 'clinical' | 'emerald' | 'sapphire' | 'rose' | 'dark';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}
