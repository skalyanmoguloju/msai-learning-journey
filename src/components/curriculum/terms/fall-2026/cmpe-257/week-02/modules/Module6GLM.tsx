import React from 'react';
import { Check, Layers } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module6GLM: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm6')!;

  return (
    <div className="space-y-6">
      {/* ── Unifying Table ────────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Layers className="w-4 h-4" />
          <h4 className="text-sm font-bold text-slate-100">The GLM Unification Matrix</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Model Name</th>
                <th className="pb-2 font-semibold">Target <MathText text="$y$" /> Domain</th>
                <th className="pb-2 font-semibold">Distribution</th>
                <th className="pb-2 font-semibold">Canonical Link <MathText text="$g(\mu)$" /></th>
                <th className="pb-2 font-semibold">Response <MathText text="$h_\theta(x)$" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Linear Regression</td>
                <td className="py-2.5">Continuous <MathText text="$\mathbb{R}$" /></td>
                <td className="py-2.5 font-mono">Gaussian <MathText text="$\mathcal{N}(\mu, \sigma^2)$" /></td>
                <td className="py-2.5 font-mono">Identity: <MathText text="$\mu$" /></td>
                <td className="py-2.5 font-mono text-cyan-300"><MathText text="$\theta^T x$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300">Logistic Regression</td>
                <td className="py-2.5">Binary <MathText text="$\{0, 1\}$" /></td>
                <td className="py-2.5 font-mono">Bernoulli <MathText text="$\text{Bern}(\phi)$" /></td>
                <td className="py-2.5 font-mono">Logit: <MathText text="$\ln\left(\frac{\mu}{1-\mu}\right)$" /></td>
                <td className="py-2.5 font-mono text-cyan-300"><MathText text="$\frac{1}{1 + e^{-\theta^T x}}$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300">Poisson Regression</td>
                <td className="py-2.5">Counts <MathText text="$\{0, 1, 2, \dots\}$" /></td>
                <td className="py-2.5 font-mono">Poisson <MathText text="$\text{Pois}(\lambda)$" /></td>
                <td className="py-2.5 font-mono">Log: <MathText text="$\ln(\mu)$" /></td>
                <td className="py-2.5 font-mono text-cyan-300"><MathText text="$e^{\theta^T x}$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-300">Softmax Regression</td>
                <td className="py-2.5">Discrete <MathText text="$\{1, \dots, K\}$" /></td>
                <td className="py-2.5 font-mono">Multinomial</td>
                <td className="py-2.5 font-mono">Multinomial Logit</td>
                <td className="py-2.5 font-mono text-cyan-300"><MathText text="$\frac{e^{\theta_k^T x}}{\sum_j e^{\theta_j^T x}}$" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Concepts Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded shrink-0">
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
                    <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <MathText text={b} />
                    </div>
                  </li>
                ))}
              </ul>

              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
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
