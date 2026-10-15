'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sliders, RotateCcw } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, themeOptions, customColors, setCustomColors, resetToThemeDefault } =
    useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Temporary state for the custom color picker modal
  const [tempPrimary, setTempPrimary] = useState('#0A1E34');
  const [tempSecondary, setTempSecondary] = useState('#006A61');
  const [tempAccent, setTempAccent] = useState('#0284C7');

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleApplyCustom = () => {
    setCustomColors({
      primary: tempPrimary,
      secondary: tempSecondary,
      accent: tempAccent,
    });
    setIsCustomModalOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 1-Click Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-brand-border bg-brand-surface text-brand-text hover:bg-brand-surface-low transition-all duration-200 shadow-sm cursor-pointer"
        title="1-Click Theme & Color Selector"
        aria-label="Change theme colors"
      >
        <Palette className="w-3.5 h-3.5 text-brand-secondary" />
        <span className="hidden sm:inline capitalize">{theme} Theme</span>
        <span className="flex items-center gap-1">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block border border-white shadow-xs"
            style={{ backgroundColor: 'var(--brand-primary)' }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full inline-block border border-white shadow-xs"
            style={{ backgroundColor: 'var(--brand-secondary)' }}
          />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-brand-surface shadow-2xl border border-brand-border p-3 z-50 animate-in fade-in zoom-in-95">
          <div className="px-2 py-1.5 text-xs font-bold text-brand-muted uppercase tracking-wider border-b border-brand-border/60 mb-2 flex items-center justify-between">
            <span>1-Click Color Themes</span>
            <span className="text-[10px] text-brand-accent">Live Switching</span>
          </div>

          <div className="space-y-1">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id && Object.keys(customColors).length === 0;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-brand-surface-container font-bold text-brand-text'
                      : 'hover:bg-brand-surface-low text-brand-text'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: opt.primaryColor }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: opt.secondaryColor }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: opt.accentColor }}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{opt.name}</div>
                      <div className="text-[11px] text-brand-muted line-clamp-1">
                        {opt.description}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-brand-secondary shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-brand-border/60 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCustomModalOpen(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-surface-container text-brand-text hover:bg-brand-surface-low transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-brand-secondary" />
              <span>Custom Color Pickers...</span>
            </button>
          </div>
        </div>
      )}

      {/* Custom Color Tuning Modal */}
      <Modal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="Custom Color Palette Generator"
      >
        <p className="text-xs text-brand-muted mb-4">
          Choose custom hex colors for the clinical brand tokens. All buttons, borders, and accents
          instantly recalculate across all 10 pages.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-text mb-1.5">
              Primary Authority Color (Navbars, dominant titles, primary buttons)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempPrimary}
                onChange={(e) => setTempPrimary(e.target.value)}
                className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={tempPrimary}
                onChange={(e) => setTempPrimary(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-brand-border bg-brand-surface text-brand-text font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text mb-1.5">
              Secondary Clinical Action Color (Booking CTA, badges, checkmarks)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempSecondary}
                onChange={(e) => setTempSecondary(e.target.value)}
                className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={tempSecondary}
                onChange={(e) => setTempSecondary(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-brand-border bg-brand-surface text-brand-text font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-text mb-1.5">
              Tertiary Diagnostic Accent (Focus rings, sub-highlights, chips)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempAccent}
                onChange={(e) => setTempAccent(e.target.value)}
                className="w-10 h-10 rounded-lg border border-brand-border cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={tempAccent}
                onChange={(e) => setTempAccent(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-brand-border bg-brand-surface text-brand-text font-mono"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-brand-border/60">
          <button
            type="button"
            onClick={() => {
              resetToThemeDefault();
              setIsCustomModalOpen(false);
            }}
            className="flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-text cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Theme Default</span>
          </button>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCustomModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary" size="sm" onClick={handleApplyCustom}>
              Apply Custom Palette
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
