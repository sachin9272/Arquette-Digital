import React from 'react';
import { X, CheckCircle2, Clock3, Mail, Check } from 'lucide-react';

export default function AppointmentDetailModal({
  appointment,
  onClose,
  onUpdateStatus,
  onResendEmail,
  sendingEmailId,
}) {
  if (!appointment) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 space-y-5 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="font-mono font-bold text-teal-700 text-xs">
              {appointment.bookingReference}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {appointment.patientName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">PHONE</div>
            <div className="font-semibold text-slate-800 mt-0.5">{appointment.phone}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">EMAIL</div>
            <div className="font-semibold text-slate-800 mt-0.5">{appointment.email}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">DEPARTMENT</div>
            <div className="font-semibold text-slate-800 mt-0.5">{appointment.department} Suite</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">ATTENDING DOCTOR</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {appointment.doctor?.name || 'Duty Specialist'}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">DATE & TIME</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {appointment.appointmentDate} at {appointment.timeSlot}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase text-slate-400">CONSULTATION FEE</div>
            <div className="font-bold text-teal-700 text-sm mt-0.5">
              ₹{(appointment.consultationFee || 1200).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-[10px] font-bold uppercase text-slate-400">
              CONFIRMATION EMAIL STATUS
            </div>
            <div className="flex items-center gap-2 mt-1">
              {appointment.confirmationEmailSent ? (
                <span className="text-emerald-700 font-bold inline-flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Sent to {appointment.email}
                  {appointment.confirmationEmailSentAt && (
                    <span className="text-slate-400 font-normal">
                      ({new Date(appointment.confirmationEmailSentAt).toLocaleTimeString()})
                    </span>
                  )}
                </span>
              ) : (
                <span className="text-amber-700 font-semibold inline-flex items-center gap-1.5">
                  <Clock3 size={14} className="text-amber-600" />
                  Not Dispatched / Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Symptoms / Notes */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
            PATIENT CLINICAL NOTES / PRIMARY COMPLAINT
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {appointment.symptomsOrNotes || 'No specific clinical symptoms or advance notes provided.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => onResendEmail(appointment._id)}
            disabled={sendingEmailId === appointment._id}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <Mail size={14} />
            <span>
              {sendingEmailId === appointment._id
                ? 'Dispatching Mail...'
                : appointment.confirmationEmailSent
                ? 'Resend Email'
                : 'Send Confirmation Email'}
            </span>
          </button>

          {appointment.status === 'pending' && (
            <button
              onClick={() => {
                onUpdateStatus(appointment._id, 'confirmed');
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-md shadow-teal-700/20 transition-all"
            >
              <Check size={14} />
              <span>Confirm Appointment</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
