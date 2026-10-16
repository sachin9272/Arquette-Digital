import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium ${
          toast.type === 'success'
            ? 'bg-slate-900 border-l-4 border-emerald-400'
            : toast.type === 'error'
            ? 'bg-slate-900 border-l-4 border-rose-500'
            : 'bg-slate-900 border-l-4 border-sky-400'
        }`}
      >
        {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
        {toast.type === 'error' && <AlertCircle size={18} className="text-rose-400 shrink-0" />}
        {toast.type === 'info' && <Info size={18} className="text-sky-400 shrink-0" />}
        <span className="flex-1">{toast.message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
