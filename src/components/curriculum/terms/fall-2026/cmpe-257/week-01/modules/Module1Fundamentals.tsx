import React from 'react';
import { Check } from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_MODULES } from '../types';

export const Module1Fundamentals: React.FC = () => {
  const mod = ML_MODULES.find(m => m.id === 'm1')!;

  return (
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
  );
};

