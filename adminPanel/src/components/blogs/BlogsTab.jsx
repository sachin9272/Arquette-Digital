import React from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Clock,
} from 'lucide-react';
import { FRONTEND_URL } from '../../constants/theme';

export default function BlogsTab({
  blogs,
  filteredBlogs,
  blogSearchQuery,
  setBlogSearchQuery,
  blogDeptFilter,
  setBlogDeptFilter,
  blogStatusFilter,
  setBlogStatusFilter,
  onToggleBlogStatus,
  onDeleteBlog,
}) {
  const activeCount = blogs.filter((b) => b.isActive !== false).length;
  const inactiveCount = blogs.length - activeCount;

  return (
    <div className="p-8 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              TOTAL HEALTH GUIDES
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 my-2.5 tracking-tight">{blogs.length}</div>
          <div className="text-xs text-slate-400 font-medium">MongoDB article repository</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600">
              LIVE & VISIBLE
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700 my-2.5 tracking-tight">{activeCount}</div>
          <div className="text-xs text-emerald-600/80 font-medium">Showing on public clinic site</div>
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
          <div className="text-xs text-slate-400 font-medium">Hidden from patient readers</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex-1 min-w-[260px] relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search health guides by title, keywords, or doctor author..."
            value={blogSearchQuery}
            onChange={(e) => setBlogSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={blogDeptFilter}
            onChange={(e) => setBlogDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          >
            <option value="all">All Departments</option>
            <option value="Dental">🦷 Dental Suite</option>
            <option value="Skin">✨ Dermatology & Skin</option>
            <option value="Hair">💇 Hair & Trichology</option>
            <option value="Cardiology">❤️ Cardiology</option>
            <option value="Pediatrics">👶 Pediatrics</option>
            <option value="Ophthalmology">👁️ Ophthalmology</option>
            <option value="Orthopedics">🦴 Orthopedics</option>
          </select>

          <select
            value={blogStatusFilter}
            onChange={(e) => setBlogStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Deactivated Only</option>
          </select>
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-16 text-center text-slate-400">
          <BookOpen size={40} className="mx-auto mb-3 text-slate-300" />
          <div className="font-semibold text-slate-600">No health guides found matching your filters</div>
          <div className="text-xs text-slate-400 mt-1">Try searching for other terms or resetting filters</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => {
            const isBlogActive = blog.isActive !== false;
            return (
              <div
                key={blog._id || blog.blogId || blog.slug}
                className={`bg-white rounded-2xl border p-4 shadow-sm transition-all flex flex-col justify-between ${
                  isBlogActive ? 'border-slate-200' : 'border-dashed border-slate-300 bg-slate-50/70'
                }`}
              >
                <div>
                  {/* Cover & Badges */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-100">
                    <img
                      src={blog.coverImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'}
                      alt={blog.title}
                      className={`w-full h-full object-cover transition-transform duration-300 ${
                        isBlogActive ? 'hover:scale-105' : 'grayscale opacity-70'
                      }`}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/95 text-teal-800 shadow-sm backdrop-blur-sm">
                        {blog.department}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      {/* Active/Deactive Toggle on Image */}
                      <button
                        type="button"
                        onClick={() => onToggleBlogStatus(blog)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-sm transition-all ${
                          isBlogActive
                            ? 'bg-emerald-500/90 text-white hover:bg-emerald-600'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                        }`}
                        title={isBlogActive ? 'Click to deactivate on website' : 'Click to activate on website'}
                      >
                        <div
                          className={`w-5 h-3 rounded-full p-0.5 transition-colors ${
                            isBlogActive ? 'bg-emerald-700' : 'bg-slate-600'
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full bg-white transition-transform ${
                              isBlogActive ? 'translate-x-2' : 'translate-x-0'
                            }`}
                          />
                        </div>
                        <span>{isBlogActive ? 'Active' : 'Deactive'}</span>
                      </button>
                    </div>

                    {blog.readTime && (
                      <div className="absolute bottom-2 left-2.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
                        <Clock size={10} /> {blog.readTime}
                      </div>
                    )}
                  </div>

                  {/* Title & Excerpt */}
                  <div className="mt-3.5 space-y-1.5">
                    <h3 className="font-extrabold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {blog.excerpt || 'Clinical guide for patient health awareness.'}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
                    <img
                      src={blog.authorImage || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'}
                      alt={blog.authorName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">{blog.authorName}</div>
                      <div className="text-[10px] text-slate-400 truncate">{blog.authorRole || 'Consultant Specialist'}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`${FRONTEND_URL}/blog/${blog.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <span>Read Article</span>
                    <ExternalLink size={12} className="text-slate-400" />
                  </a>

                  <button
                    onClick={() => onDeleteBlog(blog._id || blog.blogId || blog.slug, blog.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete health guide"
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
