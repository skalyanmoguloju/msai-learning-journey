import React, { useState } from 'react';
import {
  HelpCircle,
  Activity,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1InstanceBasedKNN: React.FC = () => {
  const [kValue, setKValue] = useState<number>(3);
  const sampleSize = 100;

  // Approximate bias-variance tradeoff values for demonstration
  const variance = Math.max(2, Math.round(45 / Math.sqrt(kValue)));
  const bias = Math.min(48, Math.round(5 + 1.2 * kValue));
  const totalError = variance + bias;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Topic Overview ────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <HelpCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Instance-Based Learning & KNN Foundations</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Unlike eager learning algorithms (such as Linear Regression, Support Vector Machines, or Decision Trees) that fit a global parametric function during training, <strong>instance-based learning</strong> (or <em>lazy learning</em>) defers model fitting until a specific query point is presented.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-emerald-400">Eager Learners</span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Commit to a global hypothesis class <MathText text="$f(x; \theta)$" /> during training.</li>
              <li>Training time: High (<MathText text="$\mathcal{O}(N d)$" /> to <MathText text="$\mathcal{O}(N d^2)$" />).</li>
              <li>Query evaluation time: Instantaneous (<MathText text="$\mathcal{O}(d)$" /> forward pass).</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-xs font-semibold text-cyan-400">Lazy / Instance-Based Learners</span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Zero explicit model training; stores raw training samples in memory.</li>
              <li>Training time: Trivial (<MathText text="$\mathcal{O}(1)$" /> storage).</li>
              <li>Query evaluation time: High (<MathText text="$\mathcal{O}(N d)$" /> pairwise distance computation).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Mathematical Formulation & Decision Rules ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">KNN Decision Rules</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Given a training dataset <MathText text="$\mathcal{D} = \{(x^{(1)}, y^{(1)}), \dots, (x^{(N)}, y^{(N)})\}$" /> and a test query <MathText text="$x$" />, let <MathText text="$\mathcal{N}_K(x)$" /> represent the set of the <MathText text="$K$" /> closest training points under distance metric <MathText text="$d(x, x^{(i)})$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-indigo-300">Classification (Majority Vote)</span>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300">
              <MathText text="$$\hat{y} = \arg\max_{c \in \mathcal{C}} \sum_{i \in \mathcal{N}_K(x)} \mathbb{I}(y^{(i)} = c)$$" displayMode={true} />
            </div>
            <p className="text-slate-400">
              Classifies query <MathText text="$x$" /> by mode vote among its <MathText text="$K$" /> closest neighbors.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-teal-300">Regression (Local Mean)</span>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-emerald-300">
              <MathText text="$$\hat{y} = \frac{1}{K} \sum_{i \in \mathcal{N}_K(x)} y^{(i)}$$" displayMode={true} />
            </div>
            <p className="text-slate-400">
              Estimates continuous conditional expectation <MathText text="$\mathbb{E}[Y \mid X=x]$" /> as the arithmetic average of neighbor targets.
            </p>
          </div>
        </div>
      </div>

      {/* ── Voronoi Tessellation & 1-NN Geometry ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Voronoi Tessellations & Geometric Boundaries</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For <MathText text="$K=1$" />, the feature space is partitioned into a <strong>Voronoi diagram</strong> consisting of convex polygonal cells <MathText text="$V(x^{(i)})$" />:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-amber-300 text-xs">
          <MathText text="$$V(x^{(i)}) = \{ x \in \mathbb{R}^d \mid d(x, x^{(i)}) \le d(x, x^{(j)}) \quad \forall j \ne i \}$$" displayMode={true} />
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Theoretical Milestone: The Cover-Hart Bound (1967)</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Thomas Cover and Peter Hart proved that as sample size <MathText text="$N \to \infty$" />, the asymptotic error rate of the simple 1-nearest neighbor classifier <MathText text="$R_{1\text{-NN}}$" /> is bounded tightly by the Bayes optimal error rate <MathText text="$P^*$" />:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg text-center font-mono text-emerald-400">
            <MathText text="$$P^* \le R_{1\text{-NN}} \le 2 P^* (1 - P^*) \le 2 P^*$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            This remarkable result guarantees that even without any parametric model or assumptions about underlying distributions, half of the available information in an infinite sample is captured by looking at just the single nearest neighbor!
          </p>
        </div>
      </div>

      {/* ── Interactive: Bias-Variance & Hyperparameter K Explorer ──────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <Activity className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive Bias-Variance Tradeoff in KNN</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            K = {kValue}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the neighborhood size <MathText text="$K$" /> to see how it balances model complexity, overfitting risk, and structural bias:
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Neighborhood Size (<MathText text="$K$" />):</span>
            <span className="font-mono text-cyan-300 font-bold">{kValue}</span>
          </div>
          <input
            type="range"
            min="1"
            max="35"
            step="2"
            value={kValue}
            onChange={(e) => setKValue(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>K = 1 (Overfitting / High Variance)</span>
            <span>K = 15 (Balanced)</span>
            <span>K = 35 (Underfitting / High Bias)</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Variance</span>
            <span className="text-base font-bold font-mono text-rose-400">{variance}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {kValue <= 3 ? 'Excessive (jagged islands)' : 'Controlled'}
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Bias</span>
            <span className="text-base font-bold font-mono text-amber-400">{bias}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {kValue >= 25 ? 'High (over-smoothed)' : 'Low'}
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Composite Error</span>
            <span className="text-base font-bold font-mono text-cyan-400">{totalError}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {kValue >= 7 && kValue <= 17 ? 'Near Optimal' : 'Sub-optimal'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <strong>Key Rule of Thumb:</strong> Choose <MathText text="$K$" /> to be an odd number (e.g. <MathText text="$K \in \{3, 5, 7, 9\}$" />) for binary classification problems to completely avoid tie-breaking ambiguities during majority voting.
        </div>
      </div>
    </div>
  );
};
