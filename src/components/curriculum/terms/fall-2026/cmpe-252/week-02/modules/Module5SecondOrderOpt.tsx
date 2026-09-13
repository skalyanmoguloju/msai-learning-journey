import React from 'react';
import { Microscope, Sparkles, Clock, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { MathText } from '../../../../../common';

interface ModuleProps {
  onGoToQuiz?: () => void;
  onOpenFlashcards?: () => void;
}

export const Module5SecondOrderOpt: React.FC<ModuleProps> = ({ onGoToQuiz, onOpenFlashcards }) => {
  const plannedTopics = [
    'Second-Order Taylor Approximation & Curvature Quadratic Forms',
    'The Hessian Matrix (H ∈ ℝⁿˣⁿ): Eigenvalues, Condition Number & Saddle Points',
    'Definiteness Tests: Positive Definite (Local Min), Negative Definite (Local Max), Indefinite (Saddle Point)',
    "Newton-Raphson Optimization Step: θₜ₊₁ = θₜ - H⁻¹∇f(θₜ) & Quadratic Convergence",
    'Computational Bottlenecks: Inversion O(n³) & Memory O(n²) in Deep Learning',
    'Quasi-Newton Approximations: DFP, BFGS and Low-Memory BFGS (L-BFGS)',
    'Natural Gradient Descent & Fisher Information Matrix: Invariance to Coordinate Parametrizations'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Overview Card */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                Module 5 Core Overview
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Second-Order Optimization 🔬
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
            Hessian &amp; Curvature
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Advanced optimization using curvature: Newton's Method, the Hessian Matrix, BFGS/L-BFGS, and Natural Gradient Descent.
        </p>

        {/* Quick Core Formula Peek */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-xs text-rose-400 font-bold block">Newton's Optimization Step:</span>
            <div className="font-mono text-xs text-slate-200">
              <MathText text="$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \mathbf{H}^{-1} \nabla f(\boldsymbol{\theta}_t)$" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-xs text-orange-400 font-bold block">Hessian Matrix Formulation:</span>
            <div className="font-mono text-xs text-slate-200">
              <MathText text="$\mathbf{H}_{ij} = \frac{\partial^2 f}{\partial \theta_i \partial \theta_j}, \quad \mathbf{H} = \mathbf{H}^T \succ 0$" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder / Content In Preparation Notice */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-1">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <h4 className="text-base font-bold text-white flex items-center justify-center gap-2">
            <span>Module Body Content Yet to Add</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Curvature ellipsoids, Hessian eigenspectrum visualizers, and step-by-step L-BFGS two-loop recursion simulations are currently being prepared.
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
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
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
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice Module 5 Quiz</span>
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
export default Module5SecondOrderOpt;
