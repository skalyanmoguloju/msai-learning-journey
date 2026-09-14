import React from 'react';
import { Check, Scale, ShieldAlert } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module10MLEvsMAP: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm10')!;

  return (
    <div className="space-y-6">
      {/* ── Regularization Equivalence Callout ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scale className="w-4 h-4" />
          <h4 className="text-sm font-bold text-slate-100">MAP Prior &amp; Regularization Duality</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300">Gaussian Prior $\iff$ L2 Ridge Regularization</span>
            <p className="text-slate-400">
              Assuming zero-mean Gaussian prior <MathText text="$P(\theta) \sim \mathcal{N}(0, \sigma^2 I)$" />:
            </p>
            <div className="font-mono text-cyan-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 text-[11px]">
              <MathText text="$\ln P(\theta) = -\frac{1}{2\sigma^2} \|\theta\|_2^2 + \text{const} \implies \text{Ridge Penalty}$" />
            </div>
            <p className="text-[11px] text-slate-500">Shrinks weights toward zero continuously.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300">Laplace Prior $\iff$ L1 Lasso Regularization</span>
            <p className="text-slate-400">
              Assuming zero-mean Laplace prior <MathText text="$P(\theta) \sim \text{Laplace}(0, b)$" />:
            </p>
            <div className="font-mono text-amber-300 bg-slate-900/80 p-2.5 rounded border border-slate-800 text-[11px]">
              <MathText text="$\ln P(\theta) = -\frac{1}{b} \|\theta\|_1 + \text{const} \implies \text{Lasso Penalty}$" />
            </div>
            <p className="text-[11px] text-slate-500">Drives irrelevant feature coefficients exactly to zero (sparsity).</p>
          </div>
        </div>
      </div>

      {/* ── Concepts Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded shrink-0">
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
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <MathText text={b} />
                    </div>
                  </li>
                ))}
              </ul>

              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
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
