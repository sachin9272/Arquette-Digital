import React from 'react';
import {
  Calendar,
  Clock,
  Search,
  CheckCircle2,
  Clock3,
  XCircle,
  RefreshCw,
  Phone,
  Mail,
  Trash2,
  Eye,
  Check,
  TrendingUp,
} from 'lucide-react';
import { formatTableDate, getInitials } from '../../constants/theme';

export default function AppointmentsTab({
  appointments,
  filteredAppointments,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  departmentFilter,
  setDepartmentFilter,
  onRefresh,
  onViewAppointment,
  onUpdateStatus,
  onDeleteAppointment,
  onResendEmail,
  sendingEmailId,
}) {
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const totalRevenue = appointments
    .filter((a) => a.status === 'confirmed' || a.status === 'completed')
    .reduce((sum, a) => sum + (a.consultationFee || 1200), 0);

  return (
    <div className="p-8 space-y-6 max-w-7xl w-full">
      {/* KPI Stats Cards - Standardized Clinical Vertical Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Bookings */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              TOTAL BOOKINGS
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 my-2.5 tracking-tight">{totalCount}</div>
          <div className="text-xs text-slate-400 font-medium">Recorded in MongoDB</div>
        </div>

        {/* Card 2: Pending Triage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600">
              PENDING TRIAGE
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock3 size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-700 my-2.5 tracking-tight">{pendingCount}</div>
          <div className="text-xs text-amber-600/80 font-medium">Awaiting staff confirmation</div>
        </div>

        {/* Card 3: Confirmed Active */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">
              CONFIRMED ACTIVE
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700 my-2.5 tracking-tight">{confirmedCount}</div>
          <div className="text-xs text-emerald-600/80 font-medium">Scheduled with doctor</div>
        </div>

        {/* Card 4: Consultation Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-700">
              CONSULTATION VALUE
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-teal-800 my-2.5 tracking-tight">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="text-xs text-teal-600/80 font-medium">Confirmed & completed</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[280px] max-w-lg relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, phone, email, or reference number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="Dental">🦷 Dental Suite</option>
            <option value="Skin">✨ Dermatology & Skin</option>
            <option value="Hair">💇 Hair & Trichology</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">⏳ Pending Triage</option>
            <option value="confirmed">✓ Confirmed</option>
            <option value="completed">★ Completed</option>
            <option value="cancelled">✕ Cancelled</option>
          </select>

          <button
            onClick={onRefresh}
            className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            title="Refresh from MongoDB"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Calendar size={40} className="mx-auto mb-3 text-slate-300" />
            <div className="font-semibold text-slate-600">No appointments found matching your filters</div>
            <div className="text-xs text-slate-400 mt-1">Try adjusting your search criteria or resetting filters</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Patient Details</th>
                  <th className="py-3.5 px-6">Date & Slot</th>
                  <th className="py-3.5 px-6">Clinical Department</th>
                  <th className="py-3.5 px-6">Specialist</th>
                  <th className="py-3.5 px-6">Fee</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAppointments.map((apt) => {
                  const statusColors = {
                    pending: 'bg-amber-50 text-amber-700 border-amber-200',
                    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    completed: 'bg-sky-50 text-sky-700 border-sky-200',
                    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
                  };

                  return (
                    <tr key={apt._id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs shrink-0">
                            {getInitials(apt.patientName)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{apt.patientName}</div>
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                              <span>{apt.bookingReference}</span>
                              <span>&bull;</span>
                              <span className="flex items-center gap-1"><Phone size={10} /> {apt.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-700">{formatTableDate(apt.appointmentDate)}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                          <Clock size={11} /> {apt.timeSlot}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800">{apt.department}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px] mt-0.5">
                          {apt.treatment}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-700">{apt.doctor?.name || 'Attending Specialist'}</div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-teal-700 text-sm">₹{(apt.consultationFee || 1200).toLocaleString('en-IN')}</div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${statusColors[apt.status] || 'bg-slate-100 text-slate-700'}`}>
                            {apt.status === 'pending' && <Clock3 size={11} />}
                            {apt.status === 'confirmed' && <CheckCircle2 size={11} />}
                            {apt.status === 'completed' && <Check size={11} />}
                            {apt.status === 'cancelled' && <XCircle size={11} />}
                            <span className="capitalize">{apt.status}</span>
                          </span>

                          {/* Email Dispatch Indicator */}
                          {apt.confirmationEmailSent && (
                            <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                              <CheckCircle2 size={10} className="text-emerald-600" />
                              <span>Confirmation Mailed</span>
                            </div>
                          )}
                          {apt.rejectionEmailSent && (
                            <div className="text-[10px] text-rose-700 flex items-center gap-1 font-bold">
                              <XCircle size={10} className="text-rose-600" />
                              <span>Rejection Mailed</span>
                            </div>
                          )}
                          {!apt.confirmationEmailSent && !apt.rejectionEmailSent && apt.emailError && (
                            <div className="text-[10px] text-amber-700 flex items-center gap-1 font-medium" title={apt.emailError}>
                              <span>⚠️ Mail Failed</span>
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewAppointment(apt)}
                            className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                            title="View full record & manage"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Triage Action 1: Confirm */}
                          {apt.status !== 'confirmed' && (
                            <button
                              onClick={() => onUpdateStatus(apt._id, 'confirmed')}
                              className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Confirm appointment & send customer email"
                            >
                              <Check size={15} />
                            </button>
                          )}

                          {/* Triage Action 2: Reject / Cancel */}
                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateStatus(apt._id, 'cancelled')}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Reject / Cancel appointment & notify customer"
                            >
                              <XCircle size={15} />
                            </button>
                          )}

                          <button
                            onClick={() => onResendEmail(apt._id)}
                            disabled={sendingEmailId === apt._id}
                            className="p-1.5 text-slate-400 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
                            title="Resend email to patient"
                          >
                            <Mail size={15} className={sendingEmailId === apt._id ? 'animate-pulse text-sky-600' : ''} />
                          </button>

                          <button
                            onClick={() => onDeleteAppointment(apt)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete record"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
