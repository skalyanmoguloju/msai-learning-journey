import React, { useState, useEffect } from 'react';
import {
  ListChecks,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ChevronRight
} from 'lucide-react';
import { MathText } from '../../../../../common';
import { AI_WEEK1_QUIZ } from '../quizData';

interface Week1QuizViewProps {
  initialStepKey?: string;
  onBackToStudy: (stepId: number) => void;
}

const STORAGE_KEY_QUIZ_ANSWERS = 'ml_week1_quiz_answers';

export const Week1QuizView: React.FC<Week1QuizViewProps> = ({
  initialStepKey = 's1',
  onBackToStudy
}) => {
  const [quizStepKey, setQuizStepKey] = useState<string>(initialStepKey);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [showSolutionsGuide, setShowSolutionsGuide] = useState(false);

  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_QUIZ_ANSWERS) || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUIZ_ANSWERS, JSON.stringify(quizUserAnswers));
    } catch {
      // ignore
    }
  }, [quizUserAnswers]);

  const currentQuizMod = AI_WEEK1_QUIZ[quizStepKey] || AI_WEEK1_QUIZ.s1;
  const currentQ = currentQuizMod.questions[currentQuestionIdx];
  const currentAnswerKey = `${quizStepKey}_${currentQuestionIdx}`;
  const selectedOption = quizUserAnswers[currentAnswerKey];

  const handleSelectQuizOption = (idx: number) => {
    setQuizUserAnswers(prev => ({
      ...prev,
      [currentAnswerKey]: idx
    }));
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx < currentQuizMod.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleResetCurrentQuiz = () => {
    setQuizUserAnswers(prev => {
      const next = { ...prev };
      currentQuizMod.questions.forEach((_, idx) => {
        delete next[`${quizStepKey}_${idx}`];
      });
      return next;
    });
    setCurrentQuestionIdx(0);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quiz Navigation & Return Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
              Practice Quizzes
            </span>
            <span className="text-xs text-slate-400">Modules 1–6 Comprehensive Assessment</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>AI &amp; ML Concept Practice Quizzes</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              Module {currentQuizMod.stepNumber} Active
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Interactive multi-choice evaluation with detailed LaTeX step-by-step solutions and derivations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto flex-wrap">
          <button
            onClick={() => setShowSolutionsGuide(prev => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <ListChecks className="w-3.5 h-3.5 text-amber-400" />
            <span>{showSolutionsGuide ? 'Hide Solutions' : 'Solution Guide'}</span>
          </button>
          <button
            onClick={() => onBackToStudy(currentQuizMod.stepNumber)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Study Guide</span>
          </button>
        </div>
      </div>

      {/* Step Selector Header Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {Object.keys(AI_WEEK1_QUIZ).map((sKey) => {
          const mod = AI_WEEK1_QUIZ[sKey];
          const isSelected = quizStepKey === sKey;
          const answeredCount = mod.questions.filter((_, idx) => quizUserAnswers[`${sKey}_${idx}`] !== undefined).length;
          const isComplete = answeredCount === mod.questions.length;
          return (
            <button
              key={sKey}
              onClick={() => {
                setQuizStepKey(sKey);
                setCurrentQuestionIdx(0);
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
                {isComplete && (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <h4 className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">{mod.badge}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{mod.sub}</p>
              <div className="mt-2 text-[10px] font-mono text-slate-500">
                {answeredCount}/{mod.questions.length} Answered
              </div>
            </button>
          );
        })}
      </div>

      {/* Quiz Card Area */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md relative space-y-6">
        {/* Progress Bar & Header */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Question <strong className="text-white">{currentQuestionIdx + 1}</strong> of {currentQuizMod.questions.length}</span>
            <span className="text-indigo-400 font-semibold">{currentQuizMod.title}</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIdx + 1) / currentQuizMod.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Statement */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 shadow-inner">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Problem Statement</span>
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

            let btnStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50";
            if (hasAnswered) {
              if (isCorrect) {
                btnStyle = "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-medium";
              } else if (isSelected) {
                btnStyle = "bg-rose-950/60 border-rose-500/80 text-rose-200";
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

        {/* Explanation Box */}
        {selectedOption !== undefined && (
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl text-sm space-y-2">
            <div className={`flex items-center gap-2 font-bold ${selectedOption === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
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

        {/* Action Buttons */}
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
              disabled={currentQuestionIdx === currentQuizMod.questions.length - 1}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white transition text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Solution Guide & Derivations */}
      {showSolutionsGuide && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-100 mb-1 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-amber-400" /> Comprehensive Solution Guide &amp; Derivations
            </h3>
            <p className="text-xs text-slate-400">
              Complete step-by-step mathematical solutions for all 12 questions across Modules 1 through 6.
            </p>
          </div>

          <div className="space-y-4">
            {Object.keys(AI_WEEK1_QUIZ).map((stepKey) => {
              const mod = AI_WEEK1_QUIZ[stepKey];
              return (
                <div key={stepKey} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-indigo-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-indigo-500" /> {mod.title}
                  </h4>
                  <div className="space-y-3">
                    {mod.questions.map((q, idx) => (
                      <div key={q.id} className="space-y-2 text-xs border-b border-slate-900 pb-3 last:border-0">
                        <div className="font-semibold text-slate-200">
                          <span className="text-indigo-400 mr-1.5 font-bold">Q{idx + 1}:</span>
                          <MathText text={q.question} />
                        </div>
                        <div className="text-emerald-400 font-mono flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Answer:</span> <MathText text={q.options[q.correct]} />
                        </div>
                        <div className="text-slate-400 bg-slate-900/80 p-3 rounded-lg leading-relaxed border border-slate-800/60">
                          <MathText text={q.explanation} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Week1QuizView;
