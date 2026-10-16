import React from 'react';
import { Trash2, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function ConfirmModal({ modal, onClose }) {
  if (!modal || !modal.isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 flex flex-col items-center text-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
            modal.type === 'danger'
              ? 'bg-rose-50 text-rose-600'
              : modal.type === 'warning'
              ? 'bg-amber-50 text-amber-600'
              : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          {modal.type === 'danger' ? (
            <Trash2 size={26} />
          ) : modal.type === 'warning' ? (
            <AlertTriangle size={26} />
          ) : (
            <CheckCircle2 size={26} />
          )}
        </div>

        <div className="max-w-xs mb-4">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{modal.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{modal.message}</p>
        </div>

        {modal.itemDetails && (
          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-5 text-xs text-left space-y-1.5">
            {modal.itemDetails.name && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">TARGET</span>
                <span className="font-semibold text-slate-800">{modal.itemDetails.name}</span>
              </div>
            )}
            {modal.itemDetails.ref && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">REF ID</span>
                <span className="font-mono font-bold text-teal-700">{modal.itemDetails.ref}</span>
              </div>
            )}
            {modal.itemDetails.dept && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">DEPARTMENT</span>
                <span className="font-medium text-slate-700">{modal.itemDetails.dept}</span>
              </div>
            )}
            {modal.itemDetails.date && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider">SCHEDULED</span>
                <span className="font-medium text-slate-700">{modal.itemDetails.date}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-colors"
          >
            {modal.cancelLabel || 'Cancel'}
          </button>
          <button
            type="button"
            onClick={modal.onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl text-white text-sm font-semibold shadow-md transition-colors ${
              modal.type === 'danger'
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'
                : 'bg-teal-700 hover:bg-teal-800 shadow-teal-200'
            }`}
          >
            {modal.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
