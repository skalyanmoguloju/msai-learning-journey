import React, { useState } from 'react';
import { Check, Binary, ToggleLeft, ToggleRight } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module3BernoulliLikelihood: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm3')!;
  const [labelY, setLabelY] = useState<0 | 1>(1);
  const [probH, setProbH] = useState<number>(0.8);

  const likelihood = Math.pow(probH, labelY) * Math.pow(1 - probH, 1 - labelY);

  return (
    <div className="space-y-6">
      {/* ── Interactive Switch Visualizer ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Binary className="w-4 h-4" />
            <h4 className="text-sm font-bold text-slate-100">Bernoulli Exponent Switch Simulator</h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">p(y | x; \theta) = (h)^y (1-h)^(1-y)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400">Target Label <MathText text="$y \in \{0, 1\}$" /></span>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setLabelY(1)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  labelY === 1
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                y = 1 (Positive)
              </button>
              <button
                onClick={() => setLabelY(0)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  labelY === 0
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                y = 0 (Negative)
              </button>
            </div>
            <p className="text-[11px] text-slate-500">Select observed ground truth.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Model Output <MathText text="$h_\theta(x)$" /></span>
              <span className="text-indigo-400 font-mono">{probH.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.99"
              step="0.01"
              value={probH}
              onChange={e => setProbH(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Estimated probability <MathText text="$P(y=1|x)$" />.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Single Sample Likelihood</span>
            <div className="text-xl font-mono font-bold text-emerald-400">
              {likelihood.toFixed(4)}
            </div>
            <p className="text-[11px] text-slate-500">
              {labelY === 1 ? `Evaluates to h: ${probH.toFixed(2)}` : `Evaluates to (1-h): ${(1 - probH).toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>

      {/* ── Concepts Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded shrink-0">
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
                    <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <MathText text={b} />
                    </div>
                  </li>
                ))}
              </ul>

              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
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
