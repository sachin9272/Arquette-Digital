import React from 'react';
import { Download, Plus } from 'lucide-react';

export default function Header({
  activeTab,
  loading,
  onExportCSV,
  onOpenCreateAppointment,
  onOpenAddDoctor,
  onOpenAddBlog,
}) {
  const titles = {
    appointments: 'Appointments & Patient Triage',
    doctors: 'Consultant Specialists Directory',
    blogs: 'Clinical Health Guides & Articles',
    analytics: 'Clinical Department Analytics',
    theme: 'Website Theme & Aesthetic Configuration',
  };

  return (
    <header className="h-20 px-8 bg-white border-b border-slate-200 flex items-center justify-between shrink-0">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {titles[activeTab] || 'Clinic Management'}
          </h1>
          {loading && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 animate-pulse">
              Syncing...
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          HRBR Layout, Kalyan Nagar Clinic &bull; Mon–Sun 9:30 AM – 8:00 PM
        </p>
      </div>

      <div className="flex items-center gap-3">
        {activeTab === 'appointments' && (
          <>
            <button
              onClick={onExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              title="Export appointments to CSV spreadsheet"
            >
              <Download size={14} className="text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenCreateAppointment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-md shadow-teal-700/20 transition-all"
            >
              <Plus size={15} />
              <span>New Appointment</span>
            </button>
          </>
        )}

        {activeTab === 'doctors' && (
          <button
            onClick={onOpenAddDoctor}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-md shadow-teal-700/20 transition-all"
          >
            <Plus size={15} />
            <span>Add New Doctor</span>
          </button>
        )}

        {activeTab === 'blogs' && (
          <button
            onClick={onOpenAddBlog}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-md shadow-teal-700/20 transition-all"
          >
            <Plus size={15} />
            <span>New Health Guide</span>
          </button>
        )}
      </div>
    </header>
  );
}
