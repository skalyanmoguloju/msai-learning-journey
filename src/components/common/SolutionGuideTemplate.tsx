import React, { useState, useEffect, useRef } from 'react';

import {
  ListChecks,
  CheckCircle2
} from 'lucide-react';
import { MathText } from '../curriculum/common/MathText';
import { QuizModuleItem } from './QuizTemplate';

export interface SolutionGuideTemplateProps {
  modules: QuizModuleItem[];
  initialModuleId?: string | number;
  onSelectModule?: (moduleId: string) => void;
  onBackToQuiz?: () => void;
  onBackToStudy?: (moduleId: string | number) => void;
  showExplanation?: boolean;
}

export const SolutionGuideTemplate: React.FC<SolutionGuideTemplateProps> = ({
  modules,
  initialModuleId,
  onSelectModule,
  onBackToQuiz,
  onBackToStudy,
  showExplanation = false
}) => {
  // Resolve initial selected module
  const resolveInitialId = (): string => {
    if (initialModuleId !== undefined) {
      const match = modules.find(
        (m) =>
          m.id === String(initialModuleId) ||
          m.stepNumber === Number(initialModuleId) ||
          `m${m.stepNumber}` === String(initialModuleId) ||
          `s${m.stepNumber}` === String(initialModuleId)
      );
      if (match) return match.id;
    }
    return modules[0]?.id || '';
  };

  const [selectedModuleKey, setSelectedModuleKey] = useState<string>(resolveInitialId);
  const lastInitialIdRef = useRef<string | number | undefined>(initialModuleId);

  useEffect(() => {
    if (initialModuleId !== undefined && initialModuleId !== lastInitialIdRef.current) {
      lastInitialIdRef.current = initialModuleId;
      const match = modules.find(
        (m) =>
          m.id === String(initialModuleId) ||
          m.stepNumber === Number(initialModuleId) ||
          `m${m.stepNumber}` === String(initialModuleId) ||
          `s${m.stepNumber}` === String(initialModuleId)
      );
      if (match && match.id !== selectedModuleKey) {
        setSelectedModuleKey(match.id);
      }
    }
  }, [initialModuleId, modules, selectedModuleKey]);

  const handleModuleClick = (modId: string) => {
    setSelectedModuleKey(modId);
    lastInitialIdRef.current = modId;
    onSelectModule?.(modId);
  };

  const currentMod = modules.find((m) => m.id === selectedModuleKey) || modules[0] || {
    id: '',
    stepNumber: 1,
    title: 'Module',
    questions: []
  };

  // Dynamic grid column class based on module count
  const getGridColsClass = (count: number) => {
    if (count <= 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    if (count === 5) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5';
    if (count === 6) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
    if (count === 7) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Module Selector Grid */}
      <div className={`grid ${getGridColsClass(modules.length)} gap-3`}>
        {modules.map((mod) => {
          const isSelected = selectedModuleKey === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => handleModuleClick(mod.id)}
              className={`border-2 p-3.5 rounded-xl text-left transition relative overflow-hidden group shadow-md ${
                isSelected
                  ? 'border-indigo-500 bg-slate-900/90 shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                Module {mod.stepNumber}
              </span>
              <h4 className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">
                {mod.badge || mod.title}
              </h4>
              {mod.sub && (
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{mod.sub}</p>
              )}
              <div className="mt-2 text-[10px] font-mono text-slate-400">
                {mod.questions.length} Solutions
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Module Solutions Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              Module {currentMod.stepNumber}: {currentMod.title} Solutions
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            {currentMod.questions.length} Questions
          </span>
        </div>

        {/* List of Questions with Answers (Explanation omitted by default) */}
        <div className="space-y-3">
          {currentMod.questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2.5 transition hover:border-slate-700/80"
            >
              <div className="font-semibold text-slate-200 text-sm leading-relaxed">
                <span className="text-indigo-400 mr-2 font-bold font-mono">Q{idx + 1}:</span>
                <MathText text={q.question} />
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs sm:text-sm bg-emerald-950/30 border border-emerald-500/30 rounded-lg px-3 py-2 w-fit">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300/80 font-mono text-xs">Answer:</span>
                <MathText text={q.options[q.correct]} />
              </div>
              {showExplanation && q.explanation && (
                <div className="text-slate-400 bg-slate-900/80 p-3 rounded-lg leading-relaxed border border-slate-800/60 text-xs">
                  <MathText text={q.explanation} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
