import React, { useState } from 'react';
import { BookOpen, RotateCcw } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';
import { Toast } from './Toast';

export interface WeeklyHeaderBannerProps {
  week: string; // e.g. 'Week 01', 'Week 02'
  courseCode: string; // e.g. 'CMPE-252'
  courseName: string; // e.g. 'Artificial Intelligence and Data Engineering'
  title: string; // e.g. 'Foundations of AI & ML Systems'
  description: string;
  reading?: string;
  status?: 'completed' | 'in-progress' | 'upcoming';
  progressPct: number; // 0 to 100
  onResetProgress?: () => void;
  topics?: string[];
  extraActions?: React.ReactNode;
}

export const WeeklyHeaderBanner: React.FC<WeeklyHeaderBannerProps> = ({
  week,
  courseCode,
  courseName,
  title,
  description,
  reading,
  progressPct,
  onResetProgress,
  topics = [],
  extraActions
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Strip any accidental "Week XX: " prefix from title to match user preference
  const cleanTitle = title.replace(/^Week\s+\d+:\s*/i, '');

  return (
    <div className="rounded-2xl p-5 lg:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl space-y-4 animate-fade-in">
      {/* Top row: Meta, Titles & Status Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono uppercase tracking-wider">
              {week} Syllabus
            </span>
            <span className="text-xs text-slate-400">
              {courseCode}: {courseName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {cleanTitle}
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2 flex-wrap sm:justify-end">
            {extraActions}

            {/* Progress pill & Reset button */}
            <div className="flex items-center space-x-2 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">Progress:</span>
              <div className="w-20 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
                />
              </div>
              <span className="text-xs font-bold text-indigo-400">{progressPct}%</span>
              {onResetProgress && (
                <button
                  onClick={() => setIsConfirmOpen(true)}
                  title="Reset Weekly Progress"
                  className="text-slate-400 hover:text-red-400 transition ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {reading && (
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800">
              <BookOpen className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>
                Reading: <strong className="text-slate-200">{reading}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Curriculum Topics & Competencies Bottom Row */}
      {topics && topics.length > 0 && (
        <div className="space-y-2">
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

      {/* Reusable Confirm Reset Modal */}
      {onResetProgress && (
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            onResetProgress();
            setToastMessage(`Progress and quiz answers for ${week} have been reset.`);
          }}
          title={`Reset ${week} Progress?`}
          message={`Are you sure you want to reset all completion progress, quiz answers, and study benchmarks for "${cleanTitle}"? This action cannot be undone.`}
          confirmText="Reset Progress"
          cancelText="Cancel"
          variant="danger"
        />
      )}

      {/* Reusable Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        type="success"
      />
    </div>
  );
};
