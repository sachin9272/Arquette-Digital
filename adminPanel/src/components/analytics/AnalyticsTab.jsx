import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

export default function AnalyticsTab({ appointments, doctors, blogs }) {
  const dentalCount = appointments.filter((a) => a.department === 'Dental').length;
  const skinCount = appointments.filter((a) => a.department === 'Skin').length;
  const hairCount = appointments.filter((a) => a.department === 'Hair').length;

  const total = appointments.length || 1;
  const dentalPct = Math.round((dentalCount / total) * 100);
  const skinPct = Math.round((skinCount / total) * 100);
  const hairPct = Math.round((hairCount / total) * 100);

  return (
    <div className="p-8 space-y-6">
      {/* Top Department Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">
            Department Distribution & Clinical Load
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time appointment workload across specialty consultation suites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sky-900 text-sm">🦷 Dental Treatments</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/80 text-sky-700 shadow-xs">
                  {dentalPct}%
                </span>
              </div>
              <p className="text-xs text-sky-700 mt-1">
                Implants, Clear Aligners, Laser RCT & Veneers
              </p>
            </div>
            <div className="mt-5">
              <div className="text-3xl font-black text-sky-950">{dentalCount}</div>
              <div className="text-[11px] text-sky-600 font-medium mt-0.5">Total booked procedures</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-amber-900 text-sm">✨ Dermatology & Skin</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/80 text-amber-700 shadow-xs">
                  {skinPct}%
                </span>
              </div>
              <p className="text-xs text-amber-700 mt-1">
                HydraFacial, Acne Scar Revision, Melasma Peels
              </p>
            </div>
            <div className="mt-5">
              <div className="text-3xl font-black text-amber-950">{skinCount}</div>
              <div className="text-[11px] text-amber-600 font-medium mt-0.5">Total booked procedures</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-purple-900 text-sm">💇 Hair & Trichology</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/80 text-purple-700 shadow-xs">
                  {hairPct}%
                </span>
              </div>
              <p className="text-xs text-purple-700 mt-1">
                Bio-Sapphire FUE, GFC & PRP Scalp Therapies
              </p>
            </div>
            <div className="mt-5">
              <div className="text-3xl font-black text-purple-950">{hairCount}</div>
              <div className="text-[11px] text-purple-600 font-medium mt-0.5">Total booked procedures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Users size={16} className="text-teal-600" />
            Specialist Resource Capacity
          </h3>
          <p className="text-xs text-slate-500">
            Total of {doctors.length} verified clinical consultants registered in the system.
          </p>
          <div className="space-y-2 pt-2 text-xs">
            {['Dental', 'Skin', 'Hair'].map((dept) => {
              const deptDocs = doctors.filter((d) => d.department === dept);
              return (
                <div key={dept} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-700">{dept} Specialists</span>
                  <span className="font-bold text-teal-700">{deptDocs.length} Doctors</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp size={16} className="text-teal-600" />
            Patient Awareness & Content
          </h3>
          <p className="text-xs text-slate-500">
            {blogs.length} clinical guides published to educate patients prior to consultation.
          </p>
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Active Published Articles</span>
              <span className="font-bold text-emerald-600">
                {blogs.filter((b) => b.isActive !== false).length} Guides
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-semibold text-slate-700">Deactivated / Drafts</span>
              <span className="font-bold text-slate-500">
                {blogs.filter((b) => b.isActive === false).length} Guides
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
