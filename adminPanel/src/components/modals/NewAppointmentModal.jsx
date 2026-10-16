import React from 'react';
import { X } from 'lucide-react';

export default function NewAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  newBooking,
  setNewBooking,
  doctors,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 space-y-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Create Walk-In Appointment
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Register patient appointment and save directly to MongoDB
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={newBooking.patientName}
                onChange={(e) => setNewBooking({ ...newBooking, patientName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={newBooking.phone}
                onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
            <input
              type="email"
              required
              placeholder="patient@example.com"
              value={newBooking.email}
              onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Specialty Department</label>
              <select
                value={newBooking.department}
                onChange={(e) => setNewBooking({ ...newBooking, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              >
                <option value="Dental">🦷 Dental Care</option>
                <option value="Skin">✨ Dermatology & Skin</option>
                <option value="Hair">💇 Hair & Trichology</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Attending Consultant</label>
              <select
                value={newBooking.doctorName}
                onChange={(e) => setNewBooking({ ...newBooking, doctorName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              >
                {doctors.length > 0 ? (
                  doctors.map((d) => (
                    <option key={d._id || d.doctorId} value={d.name}>
                      {d.name} ({d.department} - ₹{d.fee})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="Dr. Marcus Thornton">Dr. Marcus Thornton (Dental - ₹1,400)</option>
                    <option value="Dr. Priya Nair">Dr. Priya Nair (Hair - ₹1,500)</option>
                    <option value="Dr. Kavita Sharma">Dr. Kavita Sharma (Skin - ₹1,500)</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Appointment Date</label>
              <input
                type="date"
                required
                value={newBooking.appointmentDate}
                onChange={(e) => setNewBooking({ ...newBooking, appointmentDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
              <select
                value={newBooking.timeSlot}
                onChange={(e) => setNewBooking({ ...newBooking, timeSlot: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              >
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:30 PM">02:30 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:30 PM">05:30 PM</option>
                <option value="07:00 PM">07:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Procedure / Treatment</label>
            <input
              type="text"
              placeholder="e.g. Bio-Sapphire FUE Consultation or HydraFacial"
              value={newBooking.treatment}
              onChange={(e) => setNewBooking({ ...newBooking, treatment: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Medical Symptoms / Notes</label>
            <textarea
              rows={2}
              placeholder="Optional patient notes or prior history..."
              value={newBooking.symptomsOrNotes}
              onChange={(e) => setNewBooking({ ...newBooking, symptomsOrNotes: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold shadow-md shadow-teal-700/20 transition-all"
            >
              Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
