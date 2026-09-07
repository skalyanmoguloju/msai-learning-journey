import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  durationMs?: number;
  type?: ToastType;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  durationMs = 2800,
  type = 'success'
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs, onClose]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-sky-400 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30';
      case 'warning':
        return 'border-amber-500/30';
      case 'error':
        return 'border-rose-500/30';
      case 'info':
      default:
        return 'border-sky-500/30';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in pointer-events-auto">
      <div className={`bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border ${getBorderColor()} max-w-md`}>
        {getIcon()}
        <span className="text-xs sm:text-sm font-medium text-slate-100 flex-1 leading-snug">
          {message}
        </span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 transition p-0.5 rounded-lg ml-1"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
