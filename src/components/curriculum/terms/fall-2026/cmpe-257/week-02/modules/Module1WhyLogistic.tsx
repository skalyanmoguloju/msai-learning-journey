import React, { useState } from 'react';
import { Check, Calculator, AlertTriangle, ArrowRight } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module1WhyLogistic: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm1')!;
  const [prob, setProb] = useState<number>(0.75);

  const odds = prob / (1 - prob);
  const logit = Math.log(odds);

  return (
    <div className="space-y-6">
      {/* ── Why Linear Fails Alert ────────────────────────────────────────── */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="text-xs text-slate-300 space-y-1">
          <h4 className="text-sm font-bold text-amber-300">The Problem with Ordinary Least Squares for Classification</h4>
          <p className="leading-relaxed text-slate-300">
            Applying standard linear regression <MathText text="$h_\theta(x) = \theta^T x$" /> to binary outputs <MathText text="$y \in \{0, 1\}$" /> produces unbounded predictions outside <MathText text="$[0, 1]$" />. Outliers pull the decision line drastically, and error variance <MathText text="$\text{Var}(y|x) = p(x)(1 - p(x))$" /> violates OLS homoscedasticity.
          </p>
        </div>
      </div>

      {/* ── Interactive Odds & Logit Sandbox ──────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Calculator className="w-4 h-4" />
            <h4 className="text-sm font-bold text-slate-100">Interactive Odds &amp; Log-Odds (Logit) Visualizer</h4>
          </div>
          <span className="text-[11px] text-slate-400">Probability to Logit mapping</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Probability <MathText text="$p$" /></span>
              <span className="text-cyan-400 font-mono">{prob.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.01"
              max="0.99"
              step="0.01"
              value={prob}
              onChange={e => setProb(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Constrained strictly to <MathText text="$(0, 1)$" />.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Odds <MathText text="$\frac{p}{1-p}$" /></span>
            <div className="text-lg font-mono font-bold text-amber-400">
              {odds.toFixed(3)} : 1
            </div>
            <p className="text-[11px] text-slate-500">Unbounded above: <MathText text="$[0, \infty)$" />.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Log-Odds / Logit <MathText text="$\ln\left(\frac{p}{1-p}\right)$" /></span>
            <div className="text-lg font-mono font-bold text-indigo-400">
              {logit >= 0 ? `+${logit.toFixed(3)}` : logit.toFixed(3)}
            </div>
            <p className="text-[11px] text-slate-500">Unbounded both ways: <MathText text="$(-\infty, +\infty)$" />.</p>
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
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
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
