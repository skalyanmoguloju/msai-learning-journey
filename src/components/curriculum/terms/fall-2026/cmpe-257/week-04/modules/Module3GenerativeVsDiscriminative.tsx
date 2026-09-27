import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3GenerativeVsDiscriminative: React.FC = () => {
  const [dataSize, setDataSize] = useState<number>(50);

  // Model Ng & Jordan (2002) convergence curves
  // Generative: converges fast (O(log d)), but higher asymptotic error (bias if model is wrong)
  const genError = Math.round(15 + 40 / Math.pow(dataSize, 0.45));
  // Discriminative: converges slower (O(d)), but reaches lower asymptotic error
  const discError = Math.round(8 + 70 / Math.pow(dataSize, 0.55));

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Fundamental Definitions ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Generative vs. Discriminative Paradigms</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Supervised classification methods split fundamentally into two philosophical and mathematical schools based on what probability distribution they attempt to estimate from the training sample:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-400 text-sm">Generative Models</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Model P(X, Y)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Model the <strong>joint probability</strong> distribution <MathText text="$P(X, Y) = P(X \mid Y) P(Y)$" /> by modeling how data was physically generated for each class.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300">
              <MathText text="$$P(Y=k \mid X=x) = \frac{P(X=x \mid Y=k) P(Y=k)}{\sum_c P(X=x \mid Y=c) P(Y=c)}$$" displayMode={true} />
            </div>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Can generate synthetic samples <MathText text="$x \sim P(X \mid Y=k)$" />.</li>
              <li>Naturally handles missing input features by marginalizing over <MathText text="$X_{\text{miss}}$" />.</li>
              <li>Examples: Gaussian Discriminant Analysis (GDA/LDA/QDA), Naive Bayes, GMMs.</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-indigo-400 text-sm">Discriminative Models</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">Model P(Y | X)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Directly model the <strong>posterior conditional distribution</strong> <MathText text="$P(Y \mid X)$" /> or directly learn a hard decision boundary <MathText text="$f(X)$" /> without caring how <MathText text="$X$" /> was generated.
            </p>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-indigo-300">
              <MathText text="$$P(Y=1 \mid X=x) = \sigma(w^T x + b) = \frac{1}{1 + e^{-(w^T x + b)}}$$" displayMode={true} />
            </div>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Focuses all model capacity solely on the boundary separating classes.</li>
              <li>Does not waste model parameters attempting to describe the density of inputs <MathText text="$P(X)$" />.</li>
              <li>Examples: Logistic Regression, Support Vector Machines, Neural Networks, Decision Trees.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Theoretical Milestone: Ng & Jordan (2002) ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Theoretical Comparison: Ng & Jordan (NeurIPS 2001)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In their foundational paper <em>"On Discriminative vs. Generative Classifiers: A comparison of logistic regression and naive Bayes"</em>, Andrew Ng and Michael I. Jordan proved two critical regime behaviors:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-400">1. Sample Complexity Regime (Small N)</span>
            <p className="text-slate-300">
              Generative models approach their asymptotic error rate rapidly, requiring only <MathText text="$\mathcal{O}(\log d)$" /> samples. When training data is scarce, generative models often beat discriminative models because their strong distributional assumptions act as powerful regularizers.
            </p>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-indigo-400">2. Asymptotic Regime (Large N)</span>
            <p className="text-slate-300">
              Discriminative models require more training data (<MathText text="$\mathcal{O}(d)$" /> samples) to converge. However, because they directly minimize prediction error rather than joint density, their asymptotic error is strictly lower whenever the generative model's distributional assumptions are violated.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive: Sample Size vs Error Explorer ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <TrendingDown className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Training Sample Size vs. Error Rate</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            N = {dataSize} samples
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Slide the sample size <MathText text="$N$" /> to observe the crossover phenomenon between Generative (Naive Bayes / GDA) and Discriminative (Logistic Regression):
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Training Samples (<MathText text="$N$" />):</span>
            <span className="font-mono text-cyan-300 font-bold">{dataSize}</span>
          </div>
          <input
            type="range"
            min="5"
            max="300"
            step="5"
            value={dataSize}
            onChange={(e) => setDataSize(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>N = 5 (Small Data)</span>
            <span>N = 75 (Crossover Point)</span>
            <span>N = 300 (Large Data)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Generative Error Rate</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{genError}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {dataSize < 70 ? 'Superior on small data' : 'Asymptotic ceiling hit'}
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Discriminative Error Rate</span>
            <span className="text-lg font-bold font-mono text-indigo-400">{discError}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {dataSize >= 70 ? 'Superior on large data' : 'Needs more data to fit'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <strong>Takeaway:</strong> If you have limited data and reasonable prior assumptions, use a generative model. If you have abundant data and complex boundary shapes, choose a discriminative model.
        </div>
      </div>
    </div>
  );
};
