import React from 'react';
import { Zap, Sparkles, Clock, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { MathText } from '../../../../../common';

interface ModuleProps {
  onGoToQuiz?: () => void;
  onOpenFlashcards?: () => void;
}

export const Module4FirstOrderOpt: React.FC<ModuleProps> = ({ onGoToQuiz, onOpenFlashcards }) => {
  const plannedTopics = [
    'Gradient Descent Foundations: Learning Rate (η), Convergence & Lipschitz Continuity',
    'Batch Gradient Descent (BGD) vs Stochastic Gradient Descent (SGD) Trade-offs',
    'Mini-Batch Gradient Descent: Vectorization, Variance Reduction & Hardware Efficiency',
    'Classical Momentum: Damping Oscillations in Ravines (vₜ = γvₜ₋₁ + η∇L)',
    'Nesterov Accelerated Gradient (NAG): Lookahead Momentum Updates',
    'Adaptive Learning Rate Methods: Adagrad (Historical Gradient Accumulation) & RMSProp',
    'Adam Optimizer (Adaptive Moment Estimation): Combining Momentum & Second-Moment Scaling'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Overview Card */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Module 4 Core Overview
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                First-Order Optimization ⚡
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            SGD, Momentum &amp; Adam
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Gradient Descent variants: Batch (BGD), Stochastic (SGD), Momentum, NAG, Adagrad, RMSProp, and Adam.
        </p>

        {/* Quick Core Formula Peek */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-xs text-amber-400 font-bold block">SGD with Momentum:</span>
            <div className="font-mono text-xs text-slate-200">
              <MathText text="$\mathbf{v}_t = \gamma \mathbf{v}_{t-1} + \eta \nabla L(\boldsymbol{\theta}_t), \quad \boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \mathbf{v}_t$" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-xs text-yellow-400 font-bold block">Adam Optimizer Formulation:</span>
            <div className="font-mono text-xs text-slate-200">
              <MathText text="$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder / Content In Preparation Notice */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <h4 className="text-base font-bold text-white flex items-center justify-center gap-2">
            <span>Module Body Content Yet to Add</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Interactive multi-optimizer race tracks (SGD vs Momentum vs RMSProp vs Adam on Rosenbrock and Beale loss surfaces) are currently in preparation.
          </p>
        </div>

        {/* Planned Topics Checklist */}
        <div className="max-w-xl mx-auto bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-left space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Upcoming Learning Outline &amp; Topics:
          </span>
          <div className="space-y-1.5">
            {plannedTopics.map((topic, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onGoToQuiz && (
            <button
              onClick={onGoToQuiz}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-600/30 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice Module 4 Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          {onOpenFlashcards && (
            <button
              onClick={onOpenFlashcards}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Review Flashcards</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Module4FirstOrderOpt;
