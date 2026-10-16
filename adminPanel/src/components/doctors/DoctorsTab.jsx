import React from 'react';
import {
  Stethoscope,
  Search,
  CheckCircle2,
  Trash2,
  Calendar,
  Clock,
} from 'lucide-react';

export default function DoctorsTab({
  doctors,
  filteredDoctors,
  doctorSearchQuery,
  setDoctorSearchQuery,
  doctorDeptFilter,
  setDoctorDeptFilter,
  doctorStatusFilter,
  setDoctorStatusFilter,
  onToggleDoctorStatus,
  onDeleteDoctor,
  onQuickBookDoctor,
}) {
  const activeCount = doctors.filter((d) => d.isActive !== false).length;
  const inactiveCount = doctors.length - activeCount;

  return (
    <div className="p-8 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              TOTAL SPECIALISTS
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Stethoscope size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 my-2.5 tracking-tight">{doctors.length}</div>
          <div className="text-xs text-slate-400 font-medium">Clinic directory records</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">
              ACTIVE ON FRONTEND
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700 my-2.5 tracking-tight">{activeCount}</div>
          <div className="text-xs text-emerald-600/80 font-medium">Visible in public booking widget</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              DEACTIVATED
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-600 my-2.5 tracking-tight">{inactiveCount}</div>
          <div className="text-xs text-slate-400 font-medium">Hidden from patient selection</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[260px] relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctor by name, qualification, or clinical specialty..."
            value={doctorSearchQuery}
            onChange={(e) => setDoctorSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={doctorDeptFilter}
            onChange={(e) => setDoctorDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          >
            <option value="all">All Departments</option>
            <option value="Dental">🦷 Dental Suite</option>
            <option value="Skin">✨ Dermatology & Skin</option>
            <option value="Hair">💇 Hair & Trichology</option>
          </select>

          <select
            value={doctorStatusFilter}
            onChange={(e) => setDoctorStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Deactivated Only</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-16 text-center text-slate-400">
          <Stethoscope size={40} className="mx-auto mb-3 text-slate-300" />
          <div className="font-semibold text-slate-600">No specialist doctors found matching your criteria</div>
          <div className="text-xs text-slate-400 mt-1">Try resetting the department or status filter</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doc) => {
            const isDocActive = doc.isActive !== false;
            return (
              <div
                key={doc._id || doc.doctorId}
                className={`bg-white rounded-2xl border p-5 shadow-sm transition-all flex flex-col justify-between ${
                  isDocActive ? 'border-slate-200' : 'border-dashed border-slate-300 bg-slate-50/70'
                }`}
              >
                <div>
                  {/* Top Header: Image, Name, Active Toggle */}
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100">
                          {doc.department}
                        </span>
                        {/* Interactive Active / Deactive Toggle Button */}
                        <button
                          type="button"
                          onClick={() => onToggleDoctorStatus(doc)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all ${
                            isDocActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title={isDocActive ? 'Click to deactivate on website' : 'Click to activate on website'}
                        >
                          <div
                            className={`w-6 h-3.5 rounded-full p-0.5 transition-colors ${
                              isDocActive ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}
                          >
                            <div
                              className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${
                                isDocActive ? 'translate-x-2.5' : 'translate-x-0'
                              }`}
                            />
                          </div>
                          <span>{isDocActive ? 'Active' : 'Deactive'}</span>
                        </button>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-sm mt-1 truncate">{doc.name}</h3>
                      <p className="text-[11px] text-slate-500 truncate">{doc.title}</p>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Qualifications</span>
                      <span className="font-semibold text-slate-700">{doc.qualifications || 'MBBS / Specialist'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Experience & Fee</span>
                      <span className="font-semibold text-slate-700">
                        {doc.experienceYears || 10}+ Yrs &bull;{' '}
                        <strong className="text-teal-700">₹{doc.fee || 1500}</strong>
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Schedule</span>
                      <span className="font-medium text-slate-600 text-[11px] truncate max-w-[170px]">
                        {doc.availability || 'Mon - Fri (9:30 AM - 5:30 PM)'}
                      </span>
                    </div>

                    {doc.specializations && doc.specializations.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1">
                        {doc.specializations.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onQuickBookDoctor(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Calendar size={13} className="text-slate-400" />
                    <span>Book Patient</span>
                  </button>

                  <button
                    onClick={() => onDeleteDoctor(doc._id || doc.doctorId, doc.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove doctor"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
