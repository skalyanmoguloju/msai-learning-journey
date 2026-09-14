import React from 'react';
import { Check, TrendingUp, GitCommit } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module4GradientAscent: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm4')!;

  return (
    <div className="space-y-6">
      {/* ── Derivation Highlights ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <TrendingUp className="w-4 h-4" />
          <h4 className="text-sm font-bold text-slate-100">The 3-Step Chain Rule Cancellation</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-400">Step 1: Log Derivative</span>
            <div className="font-mono text-slate-300">
              <MathText text="$\frac{\partial \ell}{\partial h} = \frac{y}{h} - \frac{1-y}{1-h} = \frac{y - h}{h(1-h)}$" />
            </div>
            <p className="text-[11px] text-slate-500">Derivative of log-likelihood w.r.t hypothesis probability.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-400">Step 2: Sigmoid Derivative</span>
            <div className="font-mono text-slate-300">
              <MathText text="$\frac{\partial h}{\partial z} = \sigma(z)(1 - \sigma(z)) = h(1-h)$" />
            </div>
            <p className="text-[11px] text-slate-500">Denominator of Step 1 cancels out cleanly with this term!</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-400">Step 3: Linear Derivative</span>
            <div className="font-mono text-slate-300">
              <MathText text="$\frac{\partial z}{\partial \theta_j} = \frac{\partial (\theta^T x)}{\partial \theta_j} = x_j$" />
            </div>
            <p className="text-[11px] text-slate-500">Leaving final elegant gradient: <MathText text="$(y - h_\theta(x)) x_j$" />.</p>
          </div>
        </div>
      </div>

      {/* ── Concepts Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded shrink-0">
                    {concept.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathText text={concept.summary} />
              </div>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                {concept.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <MathText text={b} />
                    </div>
                  </li>
                ))}
              </ul>

              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Key Formulation:</div>
                  <MathText text={concept.formula} displayMode={true} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
