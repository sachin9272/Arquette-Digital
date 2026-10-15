import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  Shield,
  Clock,
  Award,
  ChevronRight,
  Building,
} from 'lucide-react';
import { CLINIC_INFO, DOCTORS, TESTIMONIALS, BLOG_POSTS, ALL_SERVICES_CATALOG } from '@/data/clinicData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { TestimonialCard } from '@/components/clinic/TestimonialCard';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Home | Premier Dental, Hair & Skin Clinic Bangalore',
  description:
    'PRALASH Dermystique & Dentique multi-speciality clinic in HRBR Layout, Kalyan Nagar, Bengaluru. Specialized in Dental Implants, Clear Aligners, Laser Dermatology, and FUE Hair Restoration.',
  alternates: {
    canonical: 'https://pralash.com',
  },
};

export default function HomePage() {
  const featuredDoctors = DOCTORS.slice(0, 4);
  const featuredArticles = BLOG_POSTS.slice(0, 3);

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-brand-surface-low border-b border-brand-border/60 py-16 lg:py-24">
        {/* Subtle radial texture */}
        <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(var(--brand-secondary)_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg/40 text-brand-badge-text border border-brand-badge-bg/60 w-fit shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs uppercase tracking-wider font-extrabold">
                  Bangalore&apos;s Leading Multi-Speciality Center
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-primary tracking-tight leading-[1.15]">
                World-Class Multi-Speciality Care Grounded in{' '}
                <span className="text-brand-secondary underline decoration-brand-badge-bg decoration-4 underline-offset-8">
                  Clinical Excellence
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
                Providing pioneering diagnostic accuracy and specialized surgical treatments across
                Cosmetic Dentistry, Medical Dermatology, Trichology, and Aesthetics in Kalyan Nagar, Bengaluru.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/booking">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5 text-brand-badge-bg" />}
                  >
                    Schedule a Consultation
                  </Button>
                </Link>

                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 text-brand-secondary" />}
                  >
                    Explore Medical Departments
                  </Button>
                </Link>
              </div>

              {/* Accreditations Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-muted">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>CQC Outstanding Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>ISO 15189 Certified Pathology</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>GMC & GDC Registered Consultants</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-surface bg-brand-surface-container">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern private diagnostic consultation room in Bengaluru clinic with sterile architectural lighting"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent" />

                {/* Floating Metric Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-brand-surface/95 backdrop-blur-md shadow-xl border border-brand-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-brand-badge-bg/40 flex items-center justify-center text-brand-secondary">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-brand-text">Same-Day</div>
                      <div className="text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                        Diagnostic Pathology
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    Active Triage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY TRUST STATS COUNTER BAR */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-brand-surface shadow-xl border border-brand-border">
          {CLINIC_INFO.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-brand-surface-low border border-brand-border/40">
              <div className="text-3xl sm:text-4xl font-black text-brand-primary leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-brand-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLINICAL SPECIALTIES OVERVIEW */}
      <section className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Specialized Care Centers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Pioneering Clinical Excellence Across Four Departments
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Every medical discipline operates with dedicated senior consultants, proprietary diagnostic suites, and audited clinical outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALL_SERVICES_CATALOG.map((dept, index) => {
              return (
                <div
                  key={dept.slug}
                  className="bg-brand-surface-card border border-brand-border rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-brand-secondary/50 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-surface-low flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                      {index === 0 && <Stethoscope className="w-6 h-6" />}
                      {index === 1 && <Sparkles className="w-6 h-6" />}
                      {index === 2 && <Shield className="w-6 h-6" />}
                      {index === 3 && <Building className="w-6 h-6" />}
                    </div>

                    <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-secondary transition-colors">
                      {dept.category}
                    </h3>

                    <p className="text-xs text-brand-muted leading-relaxed">
                      {dept.description}
                    </p>

                    <div className="pt-2 space-y-1.5">
                      {dept.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-brand-text">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-border/60">
                    <Link
                      href={dept.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-secondary-hover group-hover:translate-x-1 transition-all"
                    >
                      <span>Explore Department</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCTORS SPOTLIGHT */}
      <section className="w-full py-20 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <Badge variant="secondary" size="md">
                Senior Medical Faculty
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
                Consult With Renowned Harley & Mayfair Specialists
              </h2>
              <p className="text-sm text-brand-muted">
                Each of our lead clinicians is registered with the GMC or GDC, maintaining active surgical privileges and research chairmanships.
              </p>
            </div>
            <Link href="/doctors">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All 40+ Consultants
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER CLINICAL RESULTS PREVIEW */}
      <section className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Evidence-Based Transformations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Verified Clinical Before & After Case Studies
            </h2>
            <p className="text-sm text-brand-muted">
              Interactive comparisons demonstrating our restorative dental smile redesigns and dermatological laser scar resurfacing protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border shadow-xs">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
                afterImage="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                treatmentName="Invisalign® + 8 Porcelain Veneers Full Smile Makeover"
                timeframe="Treatment completed in 7 months by Dr. Alistair Vance"
              />
            </div>

            <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border shadow-xs">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1512290900672-1f55b9659f4d?auto=format&fit=crop&q=80&w=800"
                afterImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800"
                treatmentName="Fractional CO2 Laser Resurfacing for Severe Acne Scarring"
                timeframe="3 clinical sessions by Dr. Sarah Jenkins"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT REVIEWS & TESTIMONIALS */}
      <section className="w-full py-20 bg-brand-surface border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" size="md">
              Patient Trust
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
              Trusted by Over 25,000 Patients
            </h2>
            <p className="text-sm text-brand-muted">
              Read verified testimonials from patients treated at our Bengaluru clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* PATIENT EDUCATION / BLOG HIGHLIGHTS */}
      <section className="w-full py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-2xl">
              <Badge variant="secondary" size="md">
                Patient Education
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
                Clinical Health & Wellness Insights
              </h2>
              <p className="text-sm text-brand-muted">
                Evidence-based articles published directly by our consultant physicians and surgeons.
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Read All Articles
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((post) => (
              <article
                key={post.id}
                className="bg-brand-surface-card border border-brand-border rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[16/10] bg-brand-surface-low overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" size="sm">
                      {post.department}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-brand-muted mb-2">
                      <span>{post.publishedDate}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-secondary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-3 mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-brand-text">
                      By {post.authorName}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-brand-secondary inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPOINTMENT BOOKING CTA BANNER */}
      <section className="w-full py-16 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="secondary" size="md">
            Direct Private Access
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Experience World-Class Medical Care in Bengaluru?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Book an appointment online in under 2 minutes or connect directly with our clinic desk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/booking">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Calendar className="w-5 h-5" />}
              >
                Launch Appointment Booking Engine
              </Button>
            </Link>
            <a href={`tel:${CLINIC_INFO.phone}`}>
              <Button
                variant="outline"
                size="lg"
                className="text-white border-white/40 hover:bg-white/10"
              >
                Call Clinic: {CLINIC_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
