import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface ModuleHeaderProps {
  moduleId: number | string;
  moduleIndex?: number;
  totalModules?: number;
  badge?: string;
  title: string;
  subtitle?: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onPrevModule?: () => void;
  onNextModule?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  extraActions?: React.ReactNode;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  moduleId,
  moduleIndex,
  totalModules,
  badge,
  title,
  subtitle,
  isCompleted,
  onToggleComplete,
  onPrevModule,
  onNextModule,
  hasPrev = true,
  hasNext = true,
  extraActions
}) => {
  const resolvedIndex = moduleIndex ?? (typeof moduleId === 'number' ? moduleId : 1);
  const resolvedTotal = totalModules ?? 6;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
            Module {moduleId}
          </span>
          {badge && <span className="text-xs text-slate-400">{badge}</span>}
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 flex-wrap">
        {extraActions}

        {onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition active:scale-95 ${
              isCompleted
                ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed ✅' : 'Mark Complete'}</span>
          </button>
        )}

        {(onPrevModule || onNextModule) && (
          <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
            <button
              onClick={onPrevModule}
              disabled={!hasPrev}
              className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Previous Module"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-400 border-x border-slate-800">
              {resolvedIndex}/{resolvedTotal}
            </span>
            <button
              onClick={onNextModule}
              disabled={!hasNext}
              className="p-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Next Module"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export interface ModuleFooterProps {
  moduleId: number | string;
  moduleIndex?: number;
  totalModules?: number;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onPrevModule?: () => void;
  onNextModule?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
}

export const ModuleFooter: React.FC<ModuleFooterProps> = ({
  moduleId,
  moduleIndex,
  totalModules,
  isCompleted,
  onToggleComplete,
  onPrevModule,
  onNextModule,
  hasPrev = true,
  hasNext = true,
  prevLabel = 'Previous Module',
  nextLabel = 'Next Module'
}) => {
  const resolvedIndex = moduleIndex ?? (typeof moduleId === 'number' ? moduleId : 1);
  const resolvedTotal = totalModules ?? 6;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
      <button
        onClick={onPrevModule}
        disabled={!hasPrev}
        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-semibold flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{prevLabel}</span>
      </button>

      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400">
          Module <strong className="text-white">{resolvedIndex}</strong> of {resolvedTotal}
        </span>
        {onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isCompleted
                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
        )}
      </div>

      <button
        onClick={onNextModule}
        disabled={!hasNext}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/20"
      >
        <span>{nextLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export interface ModuleTemplateProps extends ModuleHeaderProps {
  children: React.ReactNode;
  prevLabel?: string;
  nextLabel?: string;
  showFooter?: boolean;
}

export const ModuleTemplate: React.FC<ModuleTemplateProps> = ({
  moduleId,
  moduleIndex,
  totalModules,
  badge,
  title,
  subtitle,
  isCompleted,
  onToggleComplete,
  onPrevModule,
  onNextModule,
  hasPrev = true,
  hasNext = true,
  extraActions,
  children,
  prevLabel = 'Previous Module',
  nextLabel = 'Next Module',
  showFooter = true
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header */}
      <ModuleHeader
        moduleId={moduleId}
        moduleIndex={moduleIndex}
        totalModules={totalModules}
        badge={badge}
        title={title}
        subtitle={subtitle}
        isCompleted={isCompleted}
        onToggleComplete={onToggleComplete}
        onPrevModule={onPrevModule}
        onNextModule={onNextModule}
        hasPrev={hasPrev}
        hasNext={hasNext}
        extraActions={extraActions}
      />

      {/* Dynamic Module Body */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Reusable Footer */}
      {showFooter && (
        <ModuleFooter
          moduleId={moduleId}
          moduleIndex={moduleIndex}
          totalModules={totalModules}
          isCompleted={isCompleted}
          onToggleComplete={onToggleComplete}
          onPrevModule={onPrevModule}
          onNextModule={onNextModule}
          hasPrev={hasPrev}
          hasNext={hasNext}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      )}
    </div>
  );
};
