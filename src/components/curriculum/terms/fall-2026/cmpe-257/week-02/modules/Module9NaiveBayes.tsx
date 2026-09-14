import React from 'react';
import { Check, GitBranch, Split } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module9NaiveBayes: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm9')!;

  return (
    <div className="space-y-6">
      {/* ── Generative vs Discriminative Comparison ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Split className="w-4 h-4" />
          <h4 className="text-sm font-bold text-slate-100">Generative vs. Discriminative Architecture</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300">Discriminative (Logistic Regression)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Direct Boundary</span>
            </div>
            <p className="text-slate-400">
              Directly models posterior <MathText text="$P(y \mid x)$" />. It does not model feature distributions; it only focuses on placing the decision boundary to separate classes.
            </p>
            <div className="font-mono text-cyan-300 bg-slate-900/80 p-2 rounded border border-slate-800">
              <MathText text="$$P(y=1 \mid x) = \sigma(\theta^T x)$$" displayMode={true} />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">Generative (Naive Bayes)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Data Model</span>
            </div>
            <p className="text-slate-400">
              Models class prior <MathText text="$P(y)$" /> and class-conditional feature distribution <MathText text="$P(x \mid y)$" />. Computes posterior using Bayes theorem. Can generate synthetic data.
            </p>
            <div className="font-mono text-cyan-300 bg-slate-900/80 p-2 rounded border border-slate-800">
              <MathText text="$$P(y \mid x) \propto P(x \mid y) P(y)$$" displayMode={true} />
            </div>
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
