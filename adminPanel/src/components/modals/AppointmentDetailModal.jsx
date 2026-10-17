import React, { useState } from 'react';
import { X, CheckCircle2, Clock3, Mail, Check, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';

export default function AppointmentDetailModal({
  appointment,
  onClose,
  onUpdateStatus,
  onResendEmail,
  onResendRejectionEmail,
  sendingEmailId,
}) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState(
    appointment?.rejectionReason || 'Requested consultant or clinical operatory is unavailable for the selected slot.'
  );

  if (!appointment) return null;

  const isConfirmed = appointment.status === 'confirmed';
  const isCancelled = appointment.status === 'cancelled';
  const isPending = appointment.status === 'pending';

  const handleConfirmAction = () => {
    onUpdateStatus(appointment._id, 'confirmed');
    onClose();
  };

  const handleRejectAction = () => {
    onUpdateStatus(appointment._id, 'cancelled', rejectReason);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 space-y-5 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-teal-700 text-xs">
                {appointment.bookingReference}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isConfirmed
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : isCancelled
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {appointment.status}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
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
            <div className="text-[10px] font-bold uppercase text-slate-400">DATE &amp; TIME</div>
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

          {/* Email Notification Dispatch Status */}
          <div className="col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-between">
              <span>CUSTOMER EMAIL DISPATCH STATUS</span>
              <span className="text-slate-400 font-mono text-[9px]">{appointment.email}</span>
            </div>

            {appointment.confirmationEmailSent && (
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span>Confirmation Email Sent with Calendar (.ics) Attachment</span>
                {appointment.confirmationEmailSentAt && (
                  <span className="text-slate-400 text-[11px] font-normal">
                    ({new Date(appointment.confirmationEmailSentAt).toLocaleTimeString()})
                  </span>
                )}
              </div>
            )}

            {appointment.rejectionEmailSent && (
              <div className="flex items-center gap-2 text-rose-700 text-xs font-bold">
                <XCircle size={15} className="text-rose-600 shrink-0" />
                <span>Rejection Notice Email Sent to Customer</span>
                {appointment.rejectionEmailSentAt && (
                  <span className="text-slate-400 text-[11px] font-normal">
                    ({new Date(appointment.rejectionEmailSentAt).toLocaleTimeString()})
                  </span>
                )}
              </div>
            )}

            {!appointment.confirmationEmailSent && !appointment.rejectionEmailSent && (
              <div className="flex items-center gap-2 text-amber-700 text-xs font-medium">
                <Clock3 size={15} className="text-amber-600 shrink-0" />
                <span>No email dispatched yet. Update status to Confirm or Reject to fire email.</span>
              </div>
            )}

            {appointment.emailError && (
              <div className="flex items-start gap-1.5 text-amber-800 text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1">
                <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <span>Last Mail Warning: {appointment.emailError}</span>
              </div>
            )}
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

        {/* Rejection Form Input (when admin clicks reject or wants to specify reason) */}
        {showRejectForm && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-rose-900">
              <span className="flex items-center gap-1.5">
                <MessageSquare size={14} className="text-rose-600" />
                <span>Reason for Slot Rejection / Cancellation (Sent in Email):</span>
              </span>
              <button
                type="button"
                onClick={() => setShowRejectForm(false)}
                className="text-rose-500 hover:text-rose-700 text-[11px]"
              >
                Cancel
              </button>
            </div>
            <textarea
              rows={2}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g., Requested specialist is in emergency surgery / Slot fully booked. Please reschedule."
              className="w-full p-2.5 rounded-lg border border-rose-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setRejectReason('Requested consultant is fully committed for the selected time slot.')}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200 text-[10px] text-rose-700 hover:bg-rose-100"
                >
                  Slot Fully Booked
                </button>
                <button
                  type="button"
                  onClick={() => setRejectReason('Specialist is attending emergency clinical duty.')}
                  className="px-2 py-1 rounded-md bg-white border border-rose-200 text-[10px] text-rose-700 hover:bg-rose-100"
                >
                  Doctor on Duty
                </button>
              </div>
              <button
                type="button"
                onClick={handleRejectAction}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle size={14} />
                <span>Send Rejection Email</span>
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons Dock */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {/* Resend Confirmation button */}
            <button
              onClick={() => onResendEmail(appointment._id)}
              disabled={sendingEmailId === appointment._id}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
              title="Dispatches booking confirmation email with ICS calendar file"
            >
              <Mail size={14} />
              <span>
                {sendingEmailId === appointment._id
                  ? 'Sending...'
                  : appointment.confirmationEmailSent
                  ? 'Resend Confirmation Mail'
                  : 'Send Confirmation Mail'}
              </span>
            </button>

            {/* Resend Rejection button if cancelled */}
            {isCancelled && onResendRejectionEmail && (
              <button
                onClick={() => onResendRejectionEmail(appointment._id, rejectReason)}
                disabled={sendingEmailId === appointment._id}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-colors disabled:opacity-50"
                title="Dispatches rejection notice email to patient"
              >
                <XCircle size={14} />
                <span>
                  {sendingEmailId === appointment._id ? 'Sending...' : 'Resend Rejection Mail'}
                </span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Triage Confirm Button */}
            {!isConfirmed && (
              <button
                onClick={handleConfirmAction}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-700/20 transition-all cursor-pointer"
              >
                <Check size={14} />
                <span>Confirm &amp; Send Mail</span>
              </button>
            )}

            {/* Triage Reject Button */}
            {!isCancelled && !showRejectForm && (
              <button
                onClick={() => setShowRejectForm(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all cursor-pointer"
              >
                <XCircle size={14} />
                <span>Reject &amp; Notify</span>
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
    </div>
  );
}
