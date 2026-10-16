import React from 'react';
import { X, CloudUpload } from 'lucide-react';

export default function NewBlogModal({
  isOpen,
  onClose,
  onSubmit,
  newBlog,
  setNewBlog,
  uploadingBlogCover,
  blogCoverSuccess,
  onBlogCoverFileSelect,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Publish Clinical Health Guide
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Save article to MongoDB and dynamically publish to public clinic website
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
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Article Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. 3D Guided CBCT Surgery: What Happens During Modern Implant Placement"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department *</label>
              <select
                value={newBlog.department}
                onChange={(e) => setNewBlog({ ...newBlog, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              >
                <option value="Dental">🦷 Dental Suite</option>
                <option value="Skin">✨ Dermatology & Skin</option>
                <option value="Hair">💇 Hair & Trichology</option>
                <option value="Cardiology">❤️ Cardiology</option>
                <option value="Pediatrics">👶 Pediatrics</option>
                <option value="Ophthalmology">👁️ Ophthalmology</option>
                <option value="Orthopedics">🦴 Orthopedics</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estimated Read Time</label>
              <input
                type="text"
                placeholder="e.g. 5 min read"
                value={newBlog.readTime}
                onChange={(e) => setNewBlog({ ...newBlog, readTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Author Doctor Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Marcus Thornton"
                value={newBlog.authorName}
                onChange={(e) => setNewBlog({ ...newBlog, authorName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Author Professional Role</label>
              <input
                type="text"
                placeholder="e.g. Senior Consultant Orthodontist"
                value={newBlog.authorRole}
                onChange={(e) => setNewBlog({ ...newBlog, authorRole: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <CloudUpload size={15} className="text-teal-700" />
                Cover Image (Cloudinary) *
              </span>
              {uploadingBlogCover && (
                <span className="text-[11px] font-bold text-sky-600 animate-pulse">
                  Uploading to Cloudinary...
                </span>
              )}
              {blogCoverSuccess && (
                <span className="text-[11px] font-bold text-emerald-600">
                  ✓ Stored on Cloudinary
                </span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={onBlogCoverFileSelect}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
            />

            <div className="flex items-center gap-3 pt-1">
              {newBlog.coverImage && (
                <img
                  src={newBlog.coverImage}
                  alt="Cover Preview"
                  className="w-14 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                />
              )}
              <input
                type="text"
                placeholder="Direct Cloudinary URL or image URL..."
                value={newBlog.coverImage}
                onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Excerpt / Summary Preview *</label>
            <textarea
              rows={2}
              required
              placeholder="A concise 1-2 sentence overview shown in article previews and cards..."
              value={newBlog.excerpt}
              onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Article Content *</label>
            <textarea
              rows={5}
              required
              placeholder="Write full article body paragraphs here. Separate each distinct paragraph with a blank line..."
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Orthodontics, Invisalign, Smile Design"
              value={newBlog.tags}
              onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
            />
          </div>

          {/* Active Switch in Modal */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-bold text-slate-800">Active on Public Website</div>
              <div className="text-[11px] text-slate-400">
                Show this guide immediately on the public website and blog page
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNewBlog((prev) => ({ ...prev, isActive: !prev.isActive }))}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                newBlog.isActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              <div
                className={`w-6 h-3.5 rounded-full p-0.5 transition-colors ${
                  newBlog.isActive ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${
                    newBlog.isActive ? 'translate-x-2.5' : 'translate-x-0'
                  }`}
                />
              </div>
              <span>{newBlog.isActive ? 'Active' : 'Deactive'}</span>
            </button>
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
              Publish Article to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
