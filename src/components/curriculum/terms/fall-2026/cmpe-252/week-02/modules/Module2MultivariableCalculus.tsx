import React from 'react';
import { TrendingUp, Sparkles, Clock, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { MathText } from '../../../../../common';

interface ModuleProps {
  onGoToQuiz?: () => void;
  onOpenFlashcards?: () => void;
}

export const Module2MultivariableCalculus: React.FC<ModuleProps> = ({ onGoToQuiz, onOpenFlashcards }) => {
  const plannedTopics = [
    'Scalar Fields & Partial Derivatives (∂f/∂xᵢ)',
    'The Gradient Vector (∇f): Direction of Maximum Rate of Increase',
    'Orthogonality of ∇f to Level Curves & Contour Hyperplanes',
    'Directional Derivatives & Dot Product Formulation (Dᵤf = ∇f · u)',
    'Multivariable Chain Rule for Computational Graphs & Feedforward Neural Networks',
    'Jacobian Matrices for Vector-Valued Transformations (f: ℝⁿ → ℝᵐ)',
    'Gradient Flow & Descent Dynamics in High-Dimensional Loss Landscapes'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Overview Card */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Module 2 Core Overview
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Multivariable Calculus &amp; Gradients 📈
              </h3>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            Gradients &amp; ∇f
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Partial derivatives, gradient vectors (<MathText text="$\nabla f$" />), and how rates of change guide neural network training.
        </p>

        {/* Quick Core Formula Peek */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-xs text-emerald-400 font-bold block">Gradient Vector Formulation:</span>
            <div className="font-mono text-xs text-slate-200">
              <MathText text="$\nabla f(\mathbf{x}) = \left[ \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \dots, \frac{\partial f}{\partial x_n} \right]^T$" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-xs text-teal-400 font-bold block">Multivariable Chain Rule:</span>
            <div className="font-mono text-xs text-slate-200">
              <MathText text="$\frac{\partial L}{\partial x} = \sum_{j} \frac{\partial L}{\partial z_j} \frac{\partial z_j}{\partial x}$" />
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder / Content In Preparation Notice */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-5 text-center relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1.5 max-w-lg mx-auto">
          <h4 className="text-base font-bold text-white flex items-center justify-center gap-2">
            <span>Module Body Content Yet to Add</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Detailed geometric contour visualizations, directional derivative derivations, and 3D gradient vector visualizers are currently being prepared.
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
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
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
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice Module 2 Quiz</span>
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
export default Module2MultivariableCalculus;
