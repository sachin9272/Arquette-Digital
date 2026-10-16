'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react';
import { HOMEPAGE_FAQS, HomepageFAQ } from '@/data/seoData';
import { Badge } from '@/components/ui/Badge';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-location-hours');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Dental', 'Dermatology', 'Hair', 'General & Fees'];

  const filteredFaqs = HOMEPAGE_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-20 bg-brand-background border-b border-brand-border/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="secondary" size="md">
            Patient Questions &amp; Answers
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-primary tracking-tight">
            Frequently Asked Clinical &amp; Treatment Questions
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            Transparent answers regarding doctor appointments, procedure pricing, insurance coverage, and recovery protocols at our Bengaluru center.
          </p>
        </div>

        {/* Filter Controls (Category Pills & Search) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-brand-surface border border-brand-border/70 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-secondary text-white shadow-xs'
                    : 'text-brand-muted hover:text-brand-primary hover:bg-brand-surface-low'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments or fees..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-brand-surface border border-brand-border/80 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isOpen
                      ? 'bg-brand-surface border-brand-secondary/40 shadow-md ring-1 ring-brand-secondary/15'
                      : 'bg-brand-surface border-brand-border/70 hover:border-brand-border hover:shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-colors ${
                          isOpen
                            ? 'bg-brand-secondary text-white shadow-2xs'
                            : 'bg-brand-badge-bg text-brand-badge-text'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-brand-primary leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-muted shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-secondary' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 animate-in fade-in duration-200">
                      <div className="pl-10 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-border/50 pt-3.5">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-brand-muted bg-brand-surface rounded-2xl border border-brand-border">
              No matching clinical questions found for &ldquo;{searchQuery}&rdquo;. Try another term or contact our consultation desk.
            </div>
          )}
        </div>

        {/* Footer Support Prompt */}
        <div className="p-5 rounded-2xl bg-brand-surface border border-brand-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-brand-badge-bg text-brand-badge-text flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-primary">Have a specific medical concern or condition?</h4>
              <p className="text-[11px] text-brand-muted">Our senior consultants and care coordinators are on standby 7 days a week.</p>
            </div>
          </div>
          <a
            href="tel:+919900517699"
            className="px-4 py-2 rounded-xl bg-brand-secondary hover:bg-brand-secondary-hover text-white text-xs font-bold transition-all shrink-0 shadow-xs"
          >
            Call Desk: +91 99005 17699
          </a>
        </div>
      </div>
    </section>
  );
};
