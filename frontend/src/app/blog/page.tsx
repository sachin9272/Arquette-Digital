'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Shield,
  Mail,
  Check,
  X,
  FileText,
  ChevronRight,
  Send,
} from 'lucide-react';
import { BLOG_POSTS, CLINIC_INFO } from '@/data/clinicData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export default function BlogListingPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const filterTabs = [
    { id: 'All', label: 'All Health Guides', icon: BookOpen, count: BLOG_POSTS.length },
    {
      id: 'Dental',
      label: 'Dental & Oral Surgery',
      icon: Stethoscope,
      count: BLOG_POSTS.filter((p) => p.department === 'Dental').length,
    },
    {
      id: 'Skin',
      label: 'Clinical Dermatology',
      icon: Sparkles,
      count: BLOG_POSTS.filter((p) => p.department === 'Skin').length,
    },
    {
      id: 'Hair',
      label: 'Trichology & Hair',
      icon: Shield,
      count: BLOG_POSTS.filter((p) => p.department === 'Hair').length,
    },
  ];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesDept = selectedDept === 'All' || post.department === selectedDept;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.authorName.toLowerCase().includes(query);
      return matchesDept && matchesQuery;
    });
  }, [selectedDept, searchQuery]);

  // The first post is featured in the top spotlight when no specific search is active
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      setIsSubscribed(true);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-surface-low via-brand-background to-brand-surface border-b border-brand-border/60 py-14 lg:py-18">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-brand-secondary" />
              <span>Verified Clinical Knowledge Base · Peer-Reviewed Medical Journal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-brand-primary tracking-tight leading-[1.12]">
              Evidence-Based Insights &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Patient Education
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
              Authored and medically reviewed directly by PRALASH clinical directors, dermatologists, implantologists, and trichologists to give you clear, scientifically validated answers.
            </p>
          </div>

          {/* 4 Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
              <div className="text-xl sm:text-2xl font-black text-brand-primary">100%</div>
              <div className="text-xs text-brand-muted font-semibold mt-0.5">Doctor-Authored Guides</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
              <div className="text-xl sm:text-2xl font-black text-brand-secondary">Peer-Reviewed</div>
              <div className="text-xs text-brand-muted font-semibold mt-0.5">IADVL &amp; DCI Standards</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
              <div className="text-xl sm:text-2xl font-black text-brand-primary">Practical</div>
              <div className="text-xs text-brand-muted font-semibold mt-0.5">Post-Op Recovery Plans</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-2xs">
              <div className="text-xl sm:text-2xl font-black text-brand-primary">Direct Access</div>
              <div className="text-xs text-brand-muted font-semibold mt-0.5">Consult the Author Doctor</div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN ARTICLES CONTAINER */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* SEARCH & FILTER CONTROLS BAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-3xl bg-brand-surface border border-brand-border/80 shadow-xs">
            {/* Filter Pills */}
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

            {/* Right Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles, treatments, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text placeholder-brand-muted focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
              Showing {filteredPosts.length} Medically Reviewed Clinical Guides
            </span>
            {(searchQuery || selectedDept !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchQuery('');
                }}
                className="text-xs text-brand-secondary font-bold hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-brand-muted mx-auto" />
              <h3 className="text-lg font-bold text-brand-primary">No articles found</h3>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                No patient education guides match &ldquo;{searchQuery}&rdquo;. Try another term or view all guides.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary-hover transition-colors shadow-xs cursor-pointer"
              >
                Show All Health Guides
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              
              {/* FEATURED ARTICLE SPOTLIGHT */}
              {featuredPost && (
                <article className="relative rounded-3xl border border-brand-border/90 bg-brand-surface overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    {/* Featured Image */}
                    <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-brand-surface-low">
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority
                        className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-secondary text-white shadow-xs">
                          Featured Clinical Spotlight
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-primary border border-brand-border/60 shadow-xs">
                          {featuredPost.department}
                        </span>
                      </div>

                      {/* Bottom Read Time Chip */}
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-white/80" />
                          <span>{featuredPost.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Featured Content Body */}
                    <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-brand-muted">
                          <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                          <span>{featuredPost.publishedDate}</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-primary group-hover:text-brand-secondary transition-colors leading-tight">
                          <Link href={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>

                        {/* Tag Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {featuredPost.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-surface-low text-brand-text border border-brand-border/60"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Author Bar & Action Link */}
                      <div className="pt-6 border-t border-brand-border/60 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-brand-secondary/30 shrink-0">
                            <Image
                              src={featuredPost.authorImage}
                              alt={featuredPost.authorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-brand-primary">
                              {featuredPost.authorName}
                            </div>
                            <div className="text-[11px] text-brand-muted">
                              {featuredPost.authorRole}
                            </div>
                          </div>
                        </div>

                        <Link href={`/blog/${featuredPost.slug}`} className="shrink-0">
                          <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                            Read Guide
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* REGULAR ARTICLES GRID */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-brand-surface border border-brand-border/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative w-full aspect-[16/10] bg-brand-surface-low overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-brand-surface/95 backdrop-blur-md text-brand-primary shadow-xs border border-brand-border/60">
                              {post.department}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                              <Clock className="w-3 h-3 text-white/80" />
                              <span>{post.readTime}</span>
                            </span>
                          </div>
                        </div>

                        {/* Body Details */}
                        <div className="p-6 space-y-3.5">
                          <div className="flex items-center gap-2 text-xs text-brand-muted">
                            <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                            <span>{post.publishedDate}</span>
                          </div>

                          <h3 className="text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors leading-snug">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>

                          <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border/60 text-brand-muted"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6 pt-0">
                        <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-border/80 shrink-0">
                              <Image
                                src={post.authorImage}
                                alt={post.authorName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-brand-primary leading-tight">
                                {post.authorName}
                              </div>
                              <div className="text-[10px] text-brand-muted truncate max-w-[130px]">
                                {post.authorRole}
                              </div>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-secondary hover:underline group-hover:translate-x-0.5 transition-transform shrink-0"
                          >
                            <span>Read</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CLINICAL ADVISORY NEWSLETTER STRIP */}
      <section className="w-full py-16 bg-brand-surface border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-brand-background border border-brand-border/80 p-8 sm:p-12 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
              <div className="lg:col-span-7 space-y-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-xs font-bold">
                  <Mail className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>Monthly Medical Advisory</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
                  Receive Doctor-Verified Health &amp; Aftercare Bulletins
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
                  Join over 5,000+ patients in Bengaluru who receive concise, science-backed guidance on post-procedure healing, skin barrier restoration, and tooth longevity.
                </p>
              </div>

              <div className="lg:col-span-5">
                {isSubscribed ? (
                  <div className="p-4 rounded-2xl bg-brand-badge-bg text-brand-badge-text border border-brand-secondary/30 text-center space-y-1.5">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-xs">
                      <Check className="w-4 h-4 text-brand-secondary" />
                      <span>Successfully Subscribed to Medical Advisory</span>
                    </div>
                    <p className="text-[11px] text-brand-muted">
                      You will receive our next monthly clinical digest directly at {newsletterEmail}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-brand-border/80 bg-brand-surface text-brand-text placeholder-brand-muted focus:ring-2 focus:ring-brand-secondary/30 focus:outline-none transition-all shadow-2xs"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      rightIcon={<Send className="w-3.5 h-3.5" />}
                      className="shrink-0"
                    >
                      Subscribe
                    </Button>
                  </form>
                )}
                <p className="text-[10px] text-brand-muted text-center lg:text-left mt-2">
                  Zero spam. Unsubscribe at any time with one click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL INTEGRITY & PUBLISHING PILLARS */}
      <section className="w-full py-16 bg-brand-background border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              Publishing Standards
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-primary tracking-tight">
              Our Medical Content Integrity Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <ShieldCheck className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">100% Doctor-Authored</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Zero ghostwriting or outsourced content. Every guide is written and verified by PRALASH’s licensed MD, MDS, and FRCP medical faculty.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <FileText className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Evidence-Based Medicine</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Treatment timelines, contraindications, and efficacy statistics are referenced directly from peer-reviewed clinical dermatological and dental journals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border/80 space-y-2.5 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center border border-brand-secondary/20">
                <CheckCircle2 className="w-5 h-5 text-brand-secondary" />
              </div>
              <h3 className="text-sm font-bold text-brand-primary">Zero Sponsored Biases</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                We do not accept commercial brand placement or pharma sponsorships. Our clinical guidance is focused 100% on patient safety and optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

