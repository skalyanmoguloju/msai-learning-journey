import React from 'react';
import { Check, Wrench, ShieldCheck } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module8ConstructingGLM: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm8')!;

  return (
    <div className="space-y-6">
      {/* ── 3 Postulates Banner ───────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Wrench className="w-4 h-4" />
          <h4 className="text-sm font-bold text-slate-100">The 3 Canonical GLM Construction Postulates</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400">Postulate 1: Distribution</span>
            <div className="font-mono text-cyan-300">
              <MathText text="$y \mid x; \theta \sim \text{ExpFamily}(\eta)$" />
            </div>
            <p className="text-[11px] text-slate-400">The target variable follows an exponential family parameterized by <MathText text="$\eta$" />.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400">Postulate 2: Expected Value</span>
            <div className="font-mono text-cyan-300">
              <MathText text="$h(x) = \mathbb{E}[y \mid x]$" />
            </div>
            <p className="text-[11px] text-slate-400">Given input <MathText text="$x$" />, the learning goal is to predict the expected response.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400">Postulate 3: Linearity</span>
            <div className="font-mono text-cyan-300">
              <MathText text="$\eta = \theta^T x$" />
            </div>
            <p className="text-[11px] text-slate-400">The natural parameter is linearly related to the feature vector.</p>
          </div>
        </div>
      </div>

      {/* ── Concepts Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded shrink-0">
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
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <MathText text={b} />
                    </div>
                  </li>
                ))}
              </ul>

              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
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
