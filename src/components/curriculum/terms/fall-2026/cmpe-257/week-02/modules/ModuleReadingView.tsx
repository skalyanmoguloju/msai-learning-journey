import React from 'react';
import {
  Clock,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Calculator,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { MLWeek2Module } from '../types';

interface ModuleReadingViewProps {
  module: MLWeek2Module;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenFlashcards: () => void;
}

export const ModuleReadingView: React.FC<ModuleReadingViewProps> = ({
  module,
  isCompleted,
  onToggleComplete,
  onOpenFlashcards
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Status Banner (Yet to complete reading) ────────────────────────── */}
      <div
        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isCompleted
            ? 'bg-emerald-950/25 border-emerald-500/30'
            : 'bg-amber-950/20 border-amber-500/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}
          >
            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Reading Status
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                }`}
              >
                {isCompleted ? 'Completed' : 'Yet to complete reading'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {isCompleted
                ? 'You have finished reading this module. You can review or mark as incomplete anytime.'
                : 'Reading material for this topic is pending completion. Review the core questions and formulas below.'}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
            isCompleted
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-lg shadow-amber-600/20'
          }`}
        >
          {isCompleted ? (
            <>
              <Clock className="w-3.5 h-3.5" />
              <span>Mark as Yet to Read</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Reading as Completed</span>
            </>
          )}
        </button>
      </div>

      {/* ── Key Reading Questions Checklist ──────────────────────────────── */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <HelpCircle className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-100">Key Questions to Answer During Reading</h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {module.keyQuestions.length} Essential Inquiries
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 pt-1">
          {module.keyQuestions.map((q, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-slate-700/60 transition"
            >
              <div className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Core Mathematical Theorems & Formulations ────────────────────── */}
      {module.coreTheorems && module.coreTheorems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Calculator className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-100">Mathematical Backbone & Formulations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.coreTheorems.map((thm, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-4.5 space-y-2.5 shadow-sm hover:border-cyan-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 tracking-wide">
                    {thm.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                    Formula
                  </span>
                </div>
                <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl p-3 font-mono text-xs text-amber-300 overflow-x-auto select-all">
                  <code>{thm.formula}</code>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{thm.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Deep Dive Concepts ────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-violet-400">
          <BookOpen className="w-4 h-4" />
          <h3 className="text-sm font-bold text-slate-100">Core Concepts & Derivations</h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {module.concepts.map((concept, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
                    {concept.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{concept.summary}</p>

              {concept.formula && (
                <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>{concept.formula}</code>
                </div>
              )}

              {concept.bullets && concept.bullets.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {concept.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Flashcard CTA ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-indigo-950/30 via-slate-900 to-purple-950/30 border border-indigo-500/20 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100">Review Week 2 Flashcards &amp; Formulas</h4>
            <p className="text-xs text-slate-400">
              Reinforce logistic regression derivations, exponential families, and MLE vs MAP.
            </p>
          </div>
        </div>
        <button
          onClick={onOpenFlashcards}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition shrink-0"
        >
          <span>Open Flashcards</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
