import React from 'react';
import { X, CloudUpload } from 'lucide-react';

export default function NewDoctorModal({
  isOpen,
  onClose,
  onSubmit,
  newDoctor,
  setNewDoctor,
  uploadingDoctorPhoto,
  photoUploadSuccess,
  onDoctorPhotoFileSelect,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Add New Specialist Doctor
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Save to MongoDB and dynamically render to website
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
        <form onSubmit={onSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Doctor Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Khanna"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department *</label>
              <select
                value={newDoctor.department}
                onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              >
                <option value="Dental">🦷 Dental Care</option>
                <option value="Skin">✨ Dermatology & Skin</option>
                <option value="Hair">💇 Hair & Trichology</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Professional Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Senior Consultant Periodontist & Implant Surgeon"
              value={newDoctor.title}
              onChange={(e) => setNewDoctor({ ...newDoctor, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Qualifications *</label>
              <input
                type="text"
                required
                placeholder="BDS, MDS, FDS RCS"
                value={newDoctor.qualifications}
                onChange={(e) => setNewDoctor({ ...newDoctor, qualifications: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Experience (Years) *</label>
              <input
                type="number"
                required
                min="1"
                max="50"
                value={newDoctor.experienceYears}
                onChange={(e) => setNewDoctor({ ...newDoctor, experienceYears: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (INR ₹) *</label>
              <input
                type="number"
                required
                min="500"
                step="50"
                value={newDoctor.fee}
                onChange={(e) => setNewDoctor({ ...newDoctor, fee: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Availability Schedule</label>
              <input
                type="text"
                placeholder="Mon, Wed, Fri (9:00 AM - 4:00 PM)"
                value={newDoctor.availability}
                onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Doctor Photo Upload */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CloudUpload size={15} className="text-teal-700" />
                Doctor Photo (Cloudinary) *
              </span>
              {uploadingDoctorPhoto && (
                <span className="text-[11px] font-bold text-sky-600 animate-pulse">
                  Uploading to Cloudinary...
                </span>
              )}
              {photoUploadSuccess && (
                <span className="text-[11px] font-bold text-emerald-600">
                  ✓ Stored on Cloudinary
                </span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={onDoctorPhotoFileSelect}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
            />

            <div className="flex items-center gap-3 pt-1">
              {newDoctor.image && (
                <img
                  src={newDoctor.image}
                  alt="Doctor Preview"
                  className="w-10 h-10 rounded-xl object-cover border-2 border-teal-700 shrink-0"
                />
              )}
              <input
                type="text"
                placeholder="Direct Cloudinary URL or image source..."
                value={newDoctor.image}
                onChange={(e) => setNewDoctor({ ...newDoctor, image: e.target.value })}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Specializations (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Dental Implants, Smile Design, Bone Grafting"
              value={newDoctor.specializations}
              onChange={(e) => setNewDoctor({ ...newDoctor, specializations: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Clinical Biography *</label>
            <textarea
              rows={2}
              required
              placeholder="Brief doctor bio highlighting medical credentials..."
              value={newDoctor.bio}
              onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
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
              Save Doctor to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
