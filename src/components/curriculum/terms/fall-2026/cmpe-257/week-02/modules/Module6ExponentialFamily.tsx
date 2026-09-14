import React from 'react';
import { Check, Sigma, Sparkles } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module6ExponentialFamily: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm6')!;

  return (
    <div className="space-y-6">
      {/* ── Canonical Formulation Card ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sigma className="w-4 h-4" />
          <h4 className="text-sm font-bold text-slate-100">Standard Canonical Exponential Family Representation</h4>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$p(y; \eta) = b(y) \exp\left( \eta^T T(y) - a(\eta) \right)$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Natural Parameter</span>
            <div className="font-mono text-slate-200"><MathText text="$\eta$" /></div>
            <p className="text-[11px] text-slate-500 mt-1">Connects to linear features <MathText text="$\theta^T x$" />.</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Sufficient Statistic</span>
            <div className="font-mono text-slate-200"><MathText text="$T(y)$" /></div>
            <p className="text-[11px] text-slate-500 mt-1">Typically identity <MathText text="$T(y) = y$" />.</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Log-Partition</span>
            <div className="font-mono text-slate-200"><MathText text="$a(\eta)$" /></div>
            <p className="text-[11px] text-slate-500 mt-1">Normalizer: <MathText text="$\nabla_\eta a(\eta) = \mathbb{E}[y]$" />.</p>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">Base Measure</span>
            <div className="font-mono text-slate-200"><MathText text="$b(y)$" /></div>
            <p className="text-[11px] text-slate-500 mt-1">Scaling factor independent of <MathText text="$\eta$" />.</p>
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
