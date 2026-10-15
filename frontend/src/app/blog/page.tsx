'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, BookOpen, Clock, Calendar, ArrowRight, User } from 'lucide-react';
import { BLOG_POSTS } from '@/data/clinicData';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SEOJsonLd } from '@/components/common/SEOJsonLd';

export default function BlogListingPage() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesDept = selectedDept === 'All' || post.department === selectedDept;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      return matchesDept && matchesQuery;
    });
  }, [selectedDept, searchQuery]);

  return (
    <div className="w-full flex flex-col">
      <SEOJsonLd type="Clinic" />

      {/* Hero Header */}
      <section className="w-full bg-brand-surface-low border-b border-brand-border/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" size="md">
              09 Blog & Patient Education
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black text-brand-primary tracking-tight">
              Clinical Insights & Evidence-Based Patient Guides
            </h1>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Authored directly by our consultant dental surgeons, dermatologists, and hair restoration pathologists to empower informed healthcare decisions.
            </p>
          </div>

          {/* Filter Chips & Search Bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {['All', 'Dental', 'Skin', 'Hair'].map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-brand-primary text-white shadow-xs'
                      : 'bg-brand-surface border border-brand-border text-brand-text hover:bg-brand-surface-container'
                  }`}
                >
                  {dept === 'All' ? 'All Health Guides' : dept}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search medical articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-text focus:ring-2 focus:ring-brand-accent focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full py-16 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border p-8">
              <BookOpen className="w-12 h-12 text-brand-muted mx-auto mb-3" />
              <h3 className="text-lg font-bold text-brand-text">No articles found</h3>
              <p className="text-xs text-brand-muted mt-1">
                No patient education guides match &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-brand-surface-card border border-brand-border rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
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
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-brand-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.publishedDate}</span>
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-brand-text group-hover:text-brand-secondary transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {post.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-brand-surface-low border border-brand-border/60 text-brand-muted font-semibold"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-brand-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-border">
                          <Image
                            src={post.authorImage}
                            alt={post.authorName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-brand-text">{post.authorName}</div>
                          <div className="text-[10px] text-brand-muted">{post.authorRole}</div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-brand-secondary inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
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
      </section>
    </div>
  );
}
