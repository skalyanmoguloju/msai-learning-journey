import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { ConfirmModal } from '../../common/ConfirmModal';
import { Toast } from '../../common/Toast';

export interface RootHeaderProgress {
  label?: string; // e.g. "Progress:" or "Mastery:"
  pct: number; // 0 - 100
  extraInfo?: string; // e.g. "12/24 Qs"
  colorGradient?: string; // e.g. "from-blue-500 to-indigo-500"
  textColor?: string; // e.g. "text-indigo-400"
}

export interface RootHeaderBannerProps {
  // Headings
  title: string;
  subtitle?: string;
  description?: string;

  // Icon / Graphic
  icon?: React.ReactNode;
  iconGradient?: string; // e.g. "from-indigo-600 via-blue-600 to-cyan-400"

  // Interactive controls
  progress?: RootHeaderProgress;
  onResetProgress?: () => void;
  resetTitle?: string;
  confirmTitle?: string;
  confirmMessage?: string;

  // Curriculum Topics & Competencies
  topics?: string[];

  // Extensibility
  extraActions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const RootHeaderBanner: React.FC<RootHeaderBannerProps> = ({
  title,
  subtitle,
  description,
  icon,
  iconGradient = 'from-indigo-600 via-blue-600 to-cyan-400',
  progress,
  onResetProgress,
  resetTitle = 'Reset All Progress',
  confirmTitle = 'Reset Progress?',
  confirmMessage = 'Are you sure you want to reset all completion status and quiz answers? This action cannot be undone.',
  topics = [],
  extraActions,
  children,
  className = '',
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-6 lg:p-7 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl space-y-4 animate-fade-in ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Side: Icon & Titles */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          {icon && (
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${iconGradient} flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg ring-1 ring-white/10 shrink-0`}
            >
              {icon}
            </div>
          )}

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {title}
            </h2>

            {subtitle && (
              <p className="text-xs sm:text-sm font-medium text-slate-300">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Progress Meter, Reset Button & Extra Actions */}
        {(progress || onResetProgress || extraActions) && (
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto flex-wrap">
            {extraActions}

            {/* Progress Meter */}
            {progress && (
              <div className="flex items-center space-x-3 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700 shadow-sm">
                <span className="text-xs font-semibold text-slate-300">
                  {progress.label || 'Progress:'}
                </span>
                <div className="w-24 sm:w-28 bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${
                      progress.colorGradient || 'from-blue-500 to-indigo-500'
                    } h-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, Math.max(0, progress.pct))}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-bold ${
                    progress.textColor || 'text-indigo-400'
                  }`}
                >
                  {progress.pct}%
                </span>
                {progress.extraInfo && (
                  <span className="text-[10px] font-mono text-slate-400 pl-1.5 border-l border-slate-700">
                    {progress.extraInfo}
                  </span>
                )}
              </div>
            )}

            {/* Reset Progress Button */}
            {onResetProgress && (
              <button
                onClick={() => setIsConfirmOpen(true)}
                title={resetTitle}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 border border-slate-800 transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Curriculum Topics & Competencies Bottom Row */}
      {topics && topics.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Curriculum Topics &amp; Competencies
          </span>
          <div className="flex flex-wrap gap-2">
            {topics.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 font-medium flex items-center gap-1.5 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {children}

      {/* Reset Confirmation Modal */}
      {onResetProgress && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            onResetProgress();
            setToastMessage('Progress has been successfully reset.');
          }}
          title={confirmTitle}
          message={confirmMessage}
          confirmText="Reset Progress"
          cancelText="Cancel"
          variant="danger"
        />
      )}

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        type="success"
      />
    </div>
  );
};
