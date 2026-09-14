import React from 'react';
import { Check, Database, Zap } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module4DatasetLikelihood: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm4')!;

  return (
    <div className="space-y-6">
      {/* ── Callout Box ───────────────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
          <Zap className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <h4 className="text-sm font-bold text-cyan-300">Why Log-Likelihood Replaces Raw Likelihood</h4>
          <p className="leading-relaxed text-slate-300">
            For <MathText text="$m=10,000$" /> observations, multiplying probabilities in <MathText text="$(0, 1)$" /> leads to floating point underflow to exactly zero (<MathText text="$0.0$" />). By taking <MathText text="$\ln L(\theta)$" />, the product turns into a numerically stable summation, derivatives become additive, and the parameter maximizing the log also maximizes the raw likelihood because logarithm is strictly monotonic.
          </p>
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
