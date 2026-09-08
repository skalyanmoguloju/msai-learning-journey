import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ChevronRight
} from 'lucide-react';
import { MathText } from '../curriculum/common/MathText';
import { SolutionGuideTemplate } from './SolutionGuideTemplate';
import { curriculumNavStore } from '../curriculum/navigationStore';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModuleItem {
  id: string; // e.g. 's1', 'm1', 'mod1'
  stepNumber: number; // 1, 2, 3...
  title: string;
  badge?: string;
  sub?: string;
  questions: QuizQuestion[];
}

export interface QuizTemplateProps {
  title?: string;
  subtitle?: string;
  description?: string;
  modules: QuizModuleItem[];
  initialModuleId?: string | number;
  onSelectModule?: (moduleId: string) => void;
  onBackToStudy?: (moduleId: string | number) => void;
  showSolutions?: boolean;
  onToggleSolutions?: (show: boolean) => void;
  storageKey: string;
  badgeText?: string;
  onAnswersChange?: (answers: Record<string, number>) => void;
  showSolutionsExplanation?: boolean;
}

export const QuizTemplate: React.FC<QuizTemplateProps> = ({
  title = 'Concept Practice Quizzes',
  subtitle = 'Test your conceptual and technical understanding',
  description = 'Interactive assessment with step-by-step solutions, mathematical proofs, and derivations.',
  modules,
  initialModuleId,
  onSelectModule,
  onBackToStudy,
  showSolutions,
  onToggleSolutions,
  storageKey = 'msai_quiz_answers',
  badgeText = 'Practice Quizzes',
  onAnswersChange,
  showSolutionsExplanation = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to resolve a valid module ID from initialModuleId or first module
  const resolveInitialId = (): string => {
    if (storageKey) {
      const stored = curriculumNavStore.getQuizModule(storageKey);
      if (stored) {
        const matchStored = modules.find(
          (m) =>
            m.id === String(stored) ||
            m.stepNumber === Number(stored) ||
            `m${m.stepNumber}` === String(stored) ||
            `s${m.stepNumber}` === String(stored)
        );
        if (matchStored) return matchStored.id;
      }
    }
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

  const [activeModuleKey, setActiveModuleKey] = useState<string>(resolveInitialId);
  const [moduleQuestionIndices, setModuleQuestionIndices] = useState<Record<string, number>>(() => {
    if (storageKey) {
      return curriculumNavStore.getQuizQuestionIndices(storageKey);
    }
    return {};
  });
  const [showSolutionsGuide, setShowSolutionsGuide] = useState<boolean>(showSolutions ?? false);
  const lastInitialIdRef = useRef<string | number | undefined>(initialModuleId);

  // Sync with prop changes only when initialModuleId changes to a different value from outside
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
      if (match && match.id !== activeModuleKey) {
        setActiveModuleKey(match.id);
      }
    }
  }, [initialModuleId, modules, activeModuleKey]);

  useEffect(() => {
    if (showSolutions !== undefined) {
      setShowSolutionsGuide(showSolutions);
    }
  }, [showSolutions]);

  const handleModuleSelect = (modId: string) => {
    setActiveModuleKey(modId);
    lastInitialIdRef.current = modId;
    if (storageKey) {
      curriculumNavStore.setQuizModule(storageKey, modId);
    }
    onSelectModule?.(modId);
  };

  // Answer persistence
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(quizUserAnswers));
    } catch {
      // ignore
    }
    onAnswersChange?.(quizUserAnswers);
  }, [quizUserAnswers, storageKey, onAnswersChange]);

  const currentMod = modules.find((m) => m.id === activeModuleKey) || modules[0] || {
    id: '',
    stepNumber: 1,
    title: 'Quiz',
    questions: []
  };

  const currentQuestionIdx = moduleQuestionIndices[activeModuleKey] ?? 0;
  const setCurrentQuestionIdx = (idxOrFn: number | ((prev: number) => number)) => {
    setModuleQuestionIndices((prev) => {
      const current = prev[activeModuleKey] ?? 0;
      const next = typeof idxOrFn === 'function' ? idxOrFn(current) : idxOrFn;
      if (storageKey) {
        curriculumNavStore.setQuizQuestionIndex(storageKey, activeModuleKey, next);
      }
      return {
        ...prev,
        [activeModuleKey]: next
      };
    });
  };

  const currentQ = currentMod.questions[currentQuestionIdx] || currentMod.questions[0];
  const currentAnswerKey = `${currentMod.id}_${currentQuestionIdx}`;
  const selectedOption = currentQ ? quizUserAnswers[currentAnswerKey] : undefined;

  const handleSelectQuizOption = (idx: number) => {
    setQuizUserAnswers((prev) => {
      const updated = {
        ...prev,
        [currentAnswerKey]: idx
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx < currentMod.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleResetCurrentQuiz = () => {
    setQuizUserAnswers((prev) => {
      const next = { ...prev };
      currentMod.questions.forEach((_, idx) => {
        delete next[`${currentMod.id}_${idx}`];
      });
      return next;
    });
    setCurrentQuestionIdx(0);
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
    <div ref={containerRef} className="space-y-4 animate-fade-in scroll-mt-6 sm:scroll-mt-8">
      {showSolutionsGuide ? (
        <SolutionGuideTemplate
          modules={modules}
          initialModuleId={activeModuleKey}
          onSelectModule={(id) => {
            handleModuleSelect(id);
          }}
          onBackToQuiz={() => {
            setShowSolutionsGuide(false);
            onToggleSolutions?.(false);
          }}
          onBackToStudy={onBackToStudy}
          showExplanation={false}
        />
      ) : (
        <>
          {/* Module Selector Header Grid */}
          <div className={`grid ${getGridColsClass(modules.length)} gap-3`}>
        {modules.map((mod) => {
          const isSelected = activeModuleKey === mod.id;
          const answeredCount = mod.questions.filter(
            (_, idx) => quizUserAnswers[`${mod.id}_${idx}`] !== undefined
          ).length;
          const isComplete = mod.questions.length > 0 && answeredCount === mod.questions.length;

          return (
            <button
              key={mod.id}
              onClick={() => {
                handleModuleSelect(mod.id);
              }}
              className={`border-2 p-3.5 rounded-xl text-left transition relative overflow-hidden group shadow-md ${
                isSelected
                  ? 'border-indigo-500 bg-slate-900/90 shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                  Module {mod.stepNumber}
                </span>
                {isComplete && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <h4 className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">
                {mod.badge || mod.title}
              </h4>
              {mod.sub && (
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{mod.sub}</p>
              )}
              <div className="mt-2 text-[10px] font-mono text-slate-500">
                {answeredCount}/{mod.questions.length} Answered
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Question Card Area */}
      {currentQ && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md relative space-y-6">
          {/* Progress Bar & Header */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
              <span>
                Question <strong className="text-white">{currentQuestionIdx + 1}</strong> of{' '}
                {currentMod.questions.length}
              </span>
              <span className="text-indigo-400 font-semibold">{currentMod.title}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIdx + 1) / Math.max(1, currentMod.questions.length)) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Problem Statement */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 shadow-inner">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Problem Statement
            </span>
            <div className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
              <MathText text={currentQ.question} />
            </div>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((optText, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct;
              const hasAnswered = selectedOption !== undefined;

              let btnStyle =
                'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-medium';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectQuizOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between group ${btnStyle}`}
                >
                  <div className="pr-4 leading-relaxed">
                    <MathText text={optText} />
                  </div>
                  <div className="shrink-0 ml-2">
                    {hasAnswered ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      ) : (
                        <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )
                    ) : (
                      <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400 group-hover:border-slate-500">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step-by-Step Explanation Box */}
          {selectedOption !== undefined && (
            <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl text-sm space-y-2">
              <div
                className={`flex items-center gap-2 font-bold ${
                  selectedOption === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {selectedOption === currentQ.correct ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Correct Solution!
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" /> Incorrect Solution
                  </>
                )}
              </div>
              <div className="text-slate-300 leading-relaxed">
                <MathText text={currentQ.explanation} />
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handlePrevQuizQuestion}
              disabled={currentQuestionIdx === 0}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white transition text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 border border-slate-700/60"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleResetCurrentQuiz}
                className="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition text-xs font-medium flex items-center gap-1.5 border border-slate-700/60"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Module Quiz
              </button>
              <button
                onClick={handleNextQuizQuestion}
                disabled={currentQuestionIdx === currentMod.questions.length - 1}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white transition text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
