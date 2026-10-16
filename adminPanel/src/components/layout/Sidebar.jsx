import React from 'react';
import {
  Calendar,
  Stethoscope,
  BookOpen,
  TrendingUp,
  Palette,
  Database,
  ExternalLink,
} from 'lucide-react';
import { FRONTEND_URL } from '../../constants/theme';

export default function Sidebar({
  activeTab,
  setActiveTab,
  appointmentsCount,
  doctorsCount,
  blogsCount,
  currentTheme,
  backendConnected,
}) {
  const navItems = [
    {
      id: 'appointments',
      label: `All Appointments (${appointmentsCount})`,
      icon: Calendar,
    },
    {
      id: 'doctors',
      label: `Consultant Doctors (${doctorsCount})`,
      icon: Stethoscope,
    },
    {
      id: 'blogs',
      label: `Health Guides (${blogsCount})`,
      icon: BookOpen,
    },
    {
      id: 'analytics',
      label: 'Department Analytics',
      icon: TrendingUp,
    },
    {
      id: 'theme',
      label: 'Theme & Appearance',
      icon: Palette,
      badge: currentTheme,
    },
  ];

  return (
    <aside className="w-72 min-w-[288px] max-w-[288px] h-screen bg-[#0a1e34] text-white flex flex-col justify-between shrink-0 border-r border-white/10 z-30 select-none">
      {/* Top Section: Brand + Navigation */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white text-lg shadow-md shadow-teal-900/50 shrink-0">
            P
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-sm tracking-wide text-white truncate">PRALASH Clinic</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Management Console</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-900/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-white shrink-0' : 'text-slate-400 shrink-0'} />
                <span className="truncate text-left flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-sky-300 shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Section (Pinned at Bottom) */}
      <div className="p-4 border-t border-white/10 space-y-2.5 shrink-0 bg-[#091a2d]">
        <div
          className={`px-3 py-2 rounded-xl text-[11px] flex items-center gap-2 border font-medium ${
            backendConnected
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
          }`}
        >
          <Database size={13} className="shrink-0" />
          <span className="truncate">
            {backendConnected ? 'MongoDB Live • Connected' : 'Backend Offline (Port 5000)'}
          </span>
        </div>

        <a
          href={FRONTEND_URL}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-white/20 hover:border-white/40 text-slate-200 hover:text-white text-xs font-medium transition-colors"
        >
          <span>Open Public Website</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </aside>
  );
}
