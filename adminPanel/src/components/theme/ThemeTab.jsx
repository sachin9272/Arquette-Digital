import React from 'react';
import { Palette, CheckCircle2, Check, ExternalLink } from 'lucide-react';
import { CLINIC_THEMES, FRONTEND_URL } from '../../constants/theme';

export default function ThemeTab({
  currentTheme,
  updatingTheme,
  themeNotification,
  onSelectTheme,
}) {
  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Palette size={20} className="text-teal-700" />
              <h2 className="text-lg font-extrabold text-slate-900">
                Global Website Theme & Color Palette
              </h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-100">
                Admin-Only Control
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              The public website theme can only be updated from this administrator panel. When you apply a new theme below, it instantly saves to MongoDB and updates the entire live public website across all pages in real time.
            </p>
          </div>

          <a
            href={FRONTEND_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span>Preview Live Website</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {themeNotification && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span>{themeNotification}</span>
          </div>
        )}

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_THEMES.map((th) => {
            const isActive = currentTheme === th.id;
            return (
              <div
                key={th.id}
                className={`p-6 rounded-2xl bg-white border flex flex-col justify-between gap-4 relative transition-all ${
                  isActive
                    ? 'border-teal-700 shadow-lg shadow-teal-700/10 ring-2 ring-teal-600/20'
                    : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                {isActive && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                    <Check size={11} />
                    <span>ACTIVE LIVE THEME</span>
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {th.badge}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mt-1">
                    {th.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {th.tagline}
                  </p>

                  {/* Color Swatches */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-7 h-7 rounded-full border border-black/10 shadow-xs"
                        style={{ background: th.primaryColor }}
                      />
                      <span className="text-[10px] text-slate-400 font-medium">Primary</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-7 h-7 rounded-full border border-black/10 shadow-xs"
                        style={{ background: th.secondaryColor }}
                      />
                      <span className="text-[10px] text-slate-400 font-medium">Secondary</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-7 h-7 rounded-full border border-black/10 shadow-xs"
                        style={{ background: th.accentColor }}
                      />
                      <span className="text-[10px] text-slate-400 font-medium">Accent</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 ml-auto">
                      <div
                        className="w-14 h-7 rounded-md border border-black/10 flex items-center justify-center text-xs font-bold shadow-xs"
                        style={{ background: th.previewBg, color: th.textColor }}
                      >
                        Aa
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Canvas</span>
                    </div>
                  </div>

                  {/* Mini Preview Box */}
                  <div
                    className="mt-4 p-3 rounded-xl border border-black/5 flex items-center justify-between"
                    style={{ background: th.previewBg }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-black"
                        style={{ background: th.primaryColor }}
                      >
                        P
                      </div>
                      <span className="text-xs font-bold" style={{ color: th.textColor }}>
                        PRALASH
                      </span>
                    </div>
                    <div
                      className="px-2.5 py-1 rounded-md text-[10px] font-bold text-white"
                      style={{ background: th.secondaryColor }}
                    >
                      Book Visit
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {isActive ? (
                    <div className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-800 font-bold text-xs">
                      ✓ Currently Active on Public Site
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectTheme(th.id)}
                      disabled={updatingTheme}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md shadow-teal-700/20 transition-all disabled:opacity-50"
                    >
                      <Palette size={13} />
                      <span>{updatingTheme ? 'Switching Theme...' : `Apply "${th.name.split(' (')[0]}"`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
