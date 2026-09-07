import React, { useState, useMemo } from 'react';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { ML_QUIZ_QUESTIONS } from '../quizData';
import { ML_MODULES } from '../types';

const STORAGE_KEY = 'cmpe257_week01_quiz_answers';

interface Props {
  initialModuleId?: string;
  onBackToStudy?: (moduleId: string) => void;
}

export const Week1QuizView: React.FC<Props> = ({ initialModuleId, onBackToStudy }) => {
  const [filterModuleId, setFilterModuleId] = useState<string>(initialModuleId || 'all');
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  const filteredQuestions = useMemo(() => {
    if (filterModuleId === 'all') return ML_QUIZ_QUESTIONS;
    return ML_QUIZ_QUESTIONS.filter(q => q.moduleId === filterModuleId);
  }, [filterModuleId]);

  const currentQ = filteredQuestions[quizIdx];

  const handleSelectOption = (optIdx: number) => {
    if (quizAnswered) return;
    setQuizSelected(optIdx);
    setQuizAnswered(true);
    if (optIdx === currentQ.correct) setQuizScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (quizIdx < filteredQuestions.length - 1) {
      setQuizIdx(prev => prev + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setQuizIdx(0);
    setQuizScore(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setFinished(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const moduleName = (id: string) => ML_MODULES.find(m => m.id === id)?.shortTitle || id;

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-100 font-bold">
          <GraduationCap className="w-5 h-5 text-cyan-400" />
          <span>Week 01 Self-Assessment Quiz</span>
        </div>
        {onBackToStudy && (
          <button
            onClick={() => onBackToStudy(filterModuleId !== 'all' ? filterModuleId : 'm1')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 underline transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Study
          </button>
        )}
      </div>

      {/* Module filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setFilterModuleId('all'); handleReset(); }}
          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${filterModuleId === 'all' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
        >
          All Modules
        </button>
        {ML_MODULES.map(m => (
          <button
            key={m.id}
            onClick={() => { setFilterModuleId(m.id); handleReset(); }}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${filterModuleId === m.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
          >
            {m.shortTitle}
          </button>
        ))}
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm">
          No quiz questions available for this module yet.
        </div>
      ) : finished ? (
        /* Results screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <div className="text-4xl font-black text-cyan-400">{quizScore} / {filteredQuestions.length}</div>
          <div className="text-slate-300 text-sm">
            {quizScore === filteredQuestions.length
              ? '🎉 Perfect score! Excellent mastery of the material.'
              : quizScore >= filteredQuestions.length * 0.75
              ? '✅ Great work! Review any missed concepts.'
              : '📚 Keep studying — try again after reviewing the material.'}
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition">
              <RotateCcw className="w-3.5 h-3.5" /> Retry Quiz
            </button>
            {onBackToStudy && (
              <button onClick={() => onBackToStudy('m1')}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-indigo-600/30">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Study
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Question screen */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400 font-semibold">
              Question {quizIdx + 1} of {filteredQuestions.length}
              {filterModuleId !== 'all' && <span className="ml-2 text-indigo-400">— {moduleName(filterModuleId)}</span>}
            </span>
            <span className="text-xs text-cyan-400 font-bold">Score: {quizScore} / {filteredQuestions.length}</span>
          </div>

          <div className="p-6 space-y-4 text-xs">
            <div className="text-sm font-semibold text-white leading-snug">{currentQ.question}</div>

            <div className="space-y-2 pt-1">
              {currentQ.options.map((opt, optIdx) => {
                let optStyle = 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-200';
                if (quizAnswered) {
                  if (optIdx === currentQ.correct) optStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                  else if (quizSelected === optIdx) optStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-300';
                  else optStyle = 'bg-slate-950/40 border-slate-800 text-slate-500';
                }
                return (
                  <button key={optIdx} onClick={() => handleSelectOption(optIdx)} disabled={quizAnswered}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${optStyle}`}>
                    <span>{opt}</span>
                    {quizAnswered && optIdx === currentQ.correct && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                    {quizAnswered && quizSelected === optIdx && optIdx !== currentQ.correct && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="font-bold text-cyan-400">Explanation:</div>
                <div className="text-slate-300 leading-relaxed">{currentQ.explanation}</div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <button onClick={handleReset} className="text-slate-400 hover:text-slate-200 underline transition text-xs">
                Reset Quiz
              </button>
              {quizAnswered && (
                <button onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-4 py-2 rounded-xl transition shadow-md shadow-indigo-600/30 text-xs">
                  {quizIdx + 1 === filteredQuestions.length ? 'Finish Quiz' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
