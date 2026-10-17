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
  ChevronRight,
  Building,
} from 'lucide-react';
import { CLINIC_INFO, DOCTORS, TESTIMONIALS, BLOG_POSTS, ALL_SERVICES_CATALOG } from '@/data/clinicData';
import { Doctor, BlogPost } from '@/types';
import { HOMEPAGE_FAQS } from '@/data/seoData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DoctorCard } from '@/components/clinic/DoctorCard';
import { TestimonialCard } from '@/components/clinic/TestimonialCard';
import { BeforeAfterSlider } from '@/components/clinic/BeforeAfterSlider';
import { FAQAccordion } from '@/components/clinic/FAQAccordion';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export const metadata = {
  title: 'Home | Premier Dental, Hair & Skin Clinic Bangalore',
  description:
    'PRALASH Dermystique & Dentique multi-speciality clinic in HRBR Layout, Kalyan Nagar, Bengaluru. Specialized in Dental Implants, Clear Aligners, Laser Dermatology, and FUE Hair Restoration.',
  alternates: {
    canonical: 'https://pralash.com',
  },
};

async function getFeaturedDoctors(): Promise<Doctor[]> {
  try {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${apiBase}/api/doctors`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data
          .filter((d: any) => d.isActive !== false)
          .slice(0, 4)
          .map((d: any) => ({
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
            isActive: d.isActive ?? true,
          }));
      }
    }
  } catch {
    // fallback
  }
  return DOCTORS.filter((d) => d.isActive !== false).slice(0, 4);
}

async function getFeaturedBlogs(): Promise<BlogPost[]> {
  try {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    const res = await fetch(`${apiBase}/api/blogs`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data
          .filter((p: any) => p.isActive !== false)
          .slice(0, 3)
          .map((p: any) => ({
            id: p.blogId || p.id || p._id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            content: p.content || [],
            department: p.department,
            authorName: p.authorName,
            authorRole: p.authorRole,
            authorImage: p.authorImage,
            readTime: p.readTime || '5 min read',
            publishedDate: p.publishedDate,
            coverImage: p.coverImage,
            tags: p.tags || [],
            isActive: p.isActive ?? true,
          }));
      }
    }
  } catch {
    // fallback
  }
  return BLOG_POSTS.filter((p) => p.isActive !== false).slice(0, 3);
}

export default async function HomePage() {
  const featuredDoctors = await getFeaturedDoctors();
  const featuredArticles = await getFeaturedBlogs();

  return (
    <div className="w-full flex flex-col">
      {/* Search Engine Microdata Schemas */}
      <SEOJsonLd type="Clinic" />
      <SEOJsonLd type="FAQPage" data={{ faqs: HOMEPAGE_FAQS }} />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-16 lg:py-24">
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 w-fit shadow-xs">
                <ShieldCheck className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs uppercase tracking-wider font-extrabold">
                  Bangalore&apos;s Leading Multi-Speciality Center
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-primary tracking-tight leading-[1.15]">
                World-Class Multi-Speciality Care Grounded in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                  Clinical Excellence
                </span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
                Providing pioneering diagnostic accuracy and specialized surgical treatments across
                Cosmetic Dentistry, Medical Dermatology, Trichology, and Aesthetics in Kalyan Nagar, Bengaluru.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link href="/booking" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    leftIcon={<Calendar className="w-5 h-5 opacity-80" />}
                  >
                    Schedule a Consultation
                  </Button>
                </Link>

                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center"
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
                  <span>NABH Accredited Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>25,000+ Treated Patients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
                  <span>Certified Lead Specialists</span>
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
                    <div className="w-11 h-11 rounded-xl bg-brand-badge-bg flex items-center justify-center text-brand-secondary">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-brand-text">Same-Day</div>
                      <div className="text-[11px] uppercase tracking-wider text-brand-muted font-bold">
                        Diagnostic Care
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/20">
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-brand-surface shadow-xl border border-brand-border/80">
          {CLINIC_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center px-4 py-2 ${
                idx !== 0 ? 'lg:border-l lg:border-brand-border/60' : ''
              }`}
            >
              <div className="text-3xl sm:text-4xl font-black text-brand-primary leading-none mb-1.5 tracking-tight">
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
              const tags = [
                'Dental & Oral Surgery',
                'Clinical Dermatology',
                'Trichology & Hair',
                'Diagnostic Medicine',
              ];

              return (
                <Link
                  key={dept.slug}
                  href={dept.link}
                  className="relative bg-brand-surface border border-brand-border/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-secondary/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* High-Resolution Clinical Photography Header */}
                    <div className="relative w-full aspect-[16/10] bg-brand-surface-low overflow-hidden">
                      <Image
                        src={dept.image}
                        alt={dept.category}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                      {/* Floating Department Tag Pill */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-surface/95 backdrop-blur-md text-brand-primary shadow-xs border border-brand-border/60">
                          {tags[index]}
                        </span>
                      </div>

                      {/* Floating Monochromatic Brand Icon Emblem */}
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center shadow-md shadow-brand-secondary/30">
                          {index === 0 && <Stethoscope className="w-4 h-4" />}
                          {index === 1 && <Sparkles className="w-4 h-4" />}
                          {index === 2 && <Shield className="w-4 h-4" />}
                          {index === 3 && <Building className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      {/* Department Title (fixed height for strict row alignment) */}
                      <div className="h-12 flex items-center">
                        <h3 className="text-base sm:text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors leading-snug">
                          {dept.category}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-brand-muted leading-relaxed min-h-[2.5rem] line-clamp-2">
                        {dept.description}
                      </p>

                      {/* Treatment Highlights */}
                      <div className="pt-1 space-y-1.5">
                        {dept.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-brand-text font-medium group-hover:text-brand-primary transition-colors"
                          >
                            <div className="w-4 h-4 rounded-full bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0 border border-brand-secondary/20 shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="p-5 sm:p-6 pt-0 mt-2">
                    <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-text group-hover:text-brand-secondary transition-colors">
                        Explore Department
                      </span>
                      <div className="w-8 h-8 rounded-full bg-brand-surface-low text-brand-muted flex items-center justify-center transition-all duration-300 group-hover:bg-brand-secondary group-hover:text-white group-hover:translate-x-1 shadow-2xs">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
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
                Consult With Renowned Specialists &amp; Surgeons
              </h2>
              <p className="text-sm text-brand-muted">
                Consultant dermatologists, trichologists, and implant surgeons maintaining evidence-based clinical protocols and personalized care.
              </p>
            </div>
            <Link href="/doctors">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Specialists
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredDoctors.map((doc: Doctor) => (
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
              Verified Clinical Before &amp; After Case Studies
            </h2>
            <p className="text-sm text-brand-muted">
              Interactive comparisons demonstrating our restorative dental smile redesigns and dermatological laser scar resurfacing protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-4 sm:p-6 rounded-3xl bg-brand-surface border border-brand-border shadow-xs">
              <BeforeAfterSlider
                beforeImage="/images/dental-veneers-before.jpg"
                afterImage="/images/dental-veneers-after.jpg"
                beforeAlt="Patient smile before treatment showing teeth misalignment and discoloration"
                afterAlt="Patient smile after treatment showing aligned porcelain veneers and laser whitening"
                treatmentName="Invisalign® + 8 Porcelain Veneers Full Smile Makeover"
                timeframe="Treatment completed in 7 months by Dr. Shubha C. N."
              />
            </div>

            <div className="p-4 sm:p-6 rounded-3xl bg-brand-surface border border-brand-border shadow-xs">
              <BeforeAfterSlider
                beforeImage="/images/skin-scar-before.jpg"
                afterImage="/images/skin-scar-after.jpg"
                beforeAlt="Patient facial skin before treatment showing acne scarring"
                afterAlt="Patient facial skin after 3 clinical Fractional CO2 laser sessions showing smoothed skin texture"
                treatmentName="Fractional CO2 Laser Resurfacing for Severe Acne Scarring"
                timeframe="3 clinical sessions by Dr. Premalatha V."
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
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-brand-muted">
              <span className="flex items-center gap-1.5 font-bold text-brand-text bg-brand-surface-low px-3 py-1 rounded-full border border-brand-border/60">
                <span className="text-amber-400">★★★★★</span>
                <span>4.9 / 5.0 Rating</span>
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Verified Clinical Cases</span>
              </span>
            </div>
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
                Clinical Health &amp; Wellness Insights
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
            {featuredArticles.map((post: BlogPost) => (
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
      <section className="w-full py-20 bg-gradient-to-b from-brand-background to-brand-surface-low border-b border-brand-border/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary/95 p-10 sm:p-14 text-white shadow-2xl border border-brand-secondary/30 overflow-hidden text-center space-y-6">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-brand-secondary-light border border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Consultant Access · Open 7 Days</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Ready to Experience World-Class Medical Care in Bengaluru?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
                Schedule your consultation online in under 2 minutes or connect directly with our patient care coordinators in Kalyan Nagar.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link href="/booking">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Calendar className="w-5 h-5" />}
                  >
                    Reserve Consultation Online
                  </Button>
                </Link>
                <a href={`tel:${CLINIC_INFO.phone}`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white/20 bg-white/5 hover:bg-white/15 hover:border-white/40"
                  >
                    Call Clinic: {CLINIC_INFO.phone}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT FREQUENTLY ASKED QUESTIONS (FAQ SCHEMA ACCORDION - BEFORE FOOTER) */}
      <FAQAccordion />
    </div>
  );
}
