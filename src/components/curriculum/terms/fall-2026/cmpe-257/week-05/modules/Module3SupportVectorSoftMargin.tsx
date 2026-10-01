import React, { useState } from 'react';
import {
  ShieldAlert,
  Scale,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Activity,
  Layers,
  Zap,
  TrendingDown,
  Gauge
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3SupportVectorSoftMargin: React.FC = () => {
  // ── Interactive 1: Slack Variable & Violation Visualizer ──
  const [signedMargin, setSignedMargin] = useState<number>(0.5);
  const computedSlack = Math.max(0, 1 - signedMargin);

  // Status mapping based on Section 3 of HTML
  const getViolationStatus = (m: number, xi: number) => {
    if (m > 1) {
      return {
        label: 'Correct & Outside Margin',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/30 border-emerald-800/50',
        badge: 'Zero Penalty (ξ = 0)'
      };
    }
    if (Math.abs(m - 1) < 0.001) {
      return {
        label: 'Exactly on Margin Boundary',
        color: 'text-cyan-400',
        bg: 'bg-cyan-950/30 border-cyan-800/50',
        badge: 'Support Vector (ξ = 0)'
      };
    }
    if (m > 0 && m < 1) {
      return {
        label: 'Correctly Classified, Inside Margin',
        color: 'text-amber-400',
        bg: 'bg-amber-950/30 border-amber-800/50',
        badge: `Margin Violation (${xi.toFixed(2)})`
      };
    }
    if (Math.abs(m) < 0.001) {
      return {
        label: 'On Central Decision Boundary',
        color: 'text-orange-400',
        bg: 'bg-orange-950/30 border-orange-800/50',
        badge: 'Maximum Uncertainty (ξ = 1)'
      };
    }
    return {
      label: 'Misclassified (Wrong Side)',
      color: 'text-rose-400',
      bg: 'bg-rose-950/30 border-rose-800/50',
      badge: `Severe Violation (ξ = ${xi.toFixed(2)})`
    };
  };

  const currentStatus = getViolationStatus(signedMargin, computedSlack);

  // ── Interactive 2: Candidate A vs. Candidate B C-Trade-off ──
  const [cParam, setCParam] = useState<number>(0.1);

  // Candidate A: fA(x) = 0.5x - 2, w = 0.5, ||w||^2/2 = 0.125, sum_xi = 2.25
  const costA = 0.125 + 2.25 * cParam;

  // Candidate B: fB(x) = 0.25x - 0.75, w = 0.25, ||w||^2/2 = 0.03125, sum_xi = 3.125
  const costB = 0.03125 + 3.125 * cParam;

  const winner = costA < costB ? 'Candidate A' : 'Candidate B';

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Learning Goal & Core Intuition */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Learning Goal &amp; Core Intuition</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Understand how Support Vector Machines handle overlapping data distributions, outliers, and label noise by allowing controlled margin violations via slack variables.
        </p>
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-200 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Key Intuition:</strong> A slack variable belongs to an individual observation. The total penalty is obtained by summing the slack values across all observations, which the hyperparameter <MathText text="$C$" /> balances against the width of the margin.
          </span>
        </div>
      </div>

      {/* Section 1: Why Hard-Margin Classification Fails */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">Why Hard-Margin Classification Fails</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The hard-margin SVM formulation enforces an inflexible, strict inequality constraint on every single observation:
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-rose-300">
          <MathText text="$$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1, \quad \forall i = 1, \dots, n$$" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          This strict formulation works exclusively when a straight boundary can perfectly separate every training point with 100% precision. In real-world machine learning:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400 uppercase tracking-wider block">Class Overlap &amp; Noise</span>
            <p className="text-slate-400 leading-relaxed">
              Real-world distributions frequently overlap in feature space. In the presence of noise or mislabeled instances, no linear boundary can satisfy every single constraint, rendering the optimization mathematically infeasible.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400 uppercase tracking-wider block">Outlier Vulnerability</span>
            <p className="text-slate-400 leading-relaxed">
              Even when a dataset is technically linearly separable, a single anomalous outlier near the boundary will force the hard margin to dramatically constrict, sacrificing generalizability to appease one noisy point.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Slack Variables */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Slack Variables</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          To soften the margin boundaries, we assign a non-negative <strong>slack variable</strong> <MathText text="$\xi_i$" /> to each individual training observation <MathText text="$i$" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-sm sm:text-base text-cyan-300 text-center space-y-2">
          <div><MathText text="$$\xi_i \ge 0$$" /></div>
          <div className="text-indigo-300"><MathText text="$$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1 - \xi_i$$" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider block">Signed Margin Definition</span>
            <div className="font-mono text-sm text-cyan-300">
              <MathText text="$$m_i = y_i(\mathbf{w}^T\mathbf{x}_i + b)$$" />
            </div>
            <p className="text-slate-400">
              The scalar product of the true label <MathText text="$y_i$" /> and the linear prediction score <MathText text="$f(\mathbf{x}_i)$" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider block">Minimum Required Slack (Hinge Loss)</span>
            <div className="font-mono text-sm text-purple-300">
              <MathText text="$$\xi_i = \max(0, 1 - m_i)$$" />
            </div>
            <p className="text-slate-400">
              Each point receives its own <MathText text="$\xi_i$" />. If <MathText text="$m_i \ge 1$" />, no slack is required (<MathText text="$\xi_i = 0$" />).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Dataset Violation</span>
          <div className="font-mono text-base text-amber-300 font-bold">
            <MathText text="$$\sum_{i=1}^n \xi_i = \xi_1 + \xi_2 + \dots + \xi_n$$" />
          </div>
        </div>
      </section>

      {/* Section 3: Meaning of Different Violations */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Meaning of Different Violations</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The geometric location of an observation relative to the decision boundary and the margin band determines its signed margin <MathText text="$m_i$" /> and corresponding slack value <MathText text="$\xi_i$" />:
        </p>

        {/* Reference Table from HTML */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4">Signed Margin <MathText text="$m_i$" /></th>
                <th className="py-2.5 px-4">Slack <MathText text="$\xi_i$" /></th>
                <th className="py-2.5 px-4">Classification State</th>
                <th className="py-2.5 px-4">Geometric Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-emerald-400">m_i &gt; 1</td>
                <td className="py-2.5 px-4 text-emerald-300 font-bold">0</td>
                <td className="py-2.5 px-4 font-sans text-emerald-300">Correctly Classified</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Strictly outside the margin band (No penalty)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-cyan-400">m_i = 1</td>
                <td className="py-2.5 px-4 text-cyan-300 font-bold">0</td>
                <td className="py-2.5 px-4 font-sans text-cyan-300">Correctly Classified</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Exactly on the margin boundary (Support vector)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-amber-400">0 &lt; m_i &lt; 1</td>
                <td className="py-2.5 px-4 text-amber-300 font-bold">0 &lt; ξ_i &lt; 1</td>
                <td className="py-2.5 px-4 font-sans text-amber-300">Correctly Classified</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Inside the margin band (Margin violation)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-orange-400">m_i = 0</td>
                <td className="py-2.5 px-4 text-orange-300 font-bold">1</td>
                <td className="py-2.5 px-4 font-sans text-orange-300">Boundary Point</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Sits directly on the central decision line</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-rose-400">m_i &lt; 0</td>
                <td className="py-2.5 px-4 text-rose-300 font-bold">ξ_i &gt; 1</td>
                <td className="py-2.5 px-4 font-sans text-rose-300 font-bold">Misclassified</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">On the wrong side of the decision boundary</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong>Core Conceptual Insight:</strong> The classification boundary threshold is <MathText text="$0$" />, while the margin boundary threshold is <MathText text="$1$" />. Consequently, an observation can be <em>correctly classified</em> while simultaneously violating the margin!
          </div>
        </div>

        {/* Live Interactive Violation Explorer */}
        <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Interactive Signed Margin &amp; Slack Explorer
            </span>
            <span className="text-xs font-mono text-cyan-300 font-bold">
              Signed Margin mᵢ = {signedMargin.toFixed(2)}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>mᵢ = -1.5 (Severe Error)</span>
              <span>mᵢ = 0 (Boundary)</span>
              <span>mᵢ = 1 (Margin)</span>
              <span>mᵢ = 2.5 (Deep Margin)</span>
            </div>
            <input
              type="range"
              min={-1.5}
              max={2.5}
              step={0.05}
              value={signedMargin}
              onChange={(e) => setSignedMargin(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Formula: ξᵢ = max(0, 1 - mᵢ)</span>
              <span className="text-base text-cyan-300 font-bold">
                ξᵢ = {computedSlack.toFixed(2)}
              </span>
            </div>

            <div className={`p-3 rounded-lg border col-span-2 flex flex-col justify-center ${currentStatus.bg}`}>
              <span className="text-[10px] text-slate-400 block font-sans">Observation Status</span>
              <span className={`text-sm font-bold font-sans ${currentStatus.color}`}>
                {currentStatus.label} &bull; {currentStatus.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Soft-Margin Objective */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Soft-Margin Objective</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The soft-margin SVM optimizes a composite objective that balances margin maximization against training error penalties:
        </p>

        <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="font-mono text-sm text-center text-white space-y-2">
            <div>
              <span className="text-slate-400 font-sans">Objective:</span> &nbsp;
              <MathText text="$$\min_{\mathbf{w}, b, \boldsymbol{\xi}} \frac{1}{2}\|\mathbf{w}\|^2 + C\sum_{i=1}^n \xi_i$$" />
            </div>
            <div>
              <span className="text-slate-400 font-sans">Subject to:</span> &nbsp;
              <MathText text="$$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0, \quad \forall i$$" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="font-bold text-indigo-300 uppercase tracking-wider block">First Term: <MathText text="$\frac{1}{2}\|\mathbf{w}\|^2$" /></span>
            <p className="text-slate-400 leading-relaxed">
              Maximizes the width of the collision-free margin band (<MathText text="$\text{Width} = 2/\|\mathbf{w}\|$" />). Smaller <MathText text="$\|\mathbf{w}\|$" /> yields wider margins and stronger generalization capacity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 uppercase tracking-wider block">Second Term: <MathText text="$C\sum \xi_i$" /></span>
            <p className="text-slate-400 leading-relaxed">
              Penalizes points that penetrate the margin band or lie on the incorrect side of the decision boundary, weighted by user-tuned penalty <MathText text="$C$" />.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: The Role of C */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">The Role of Hyperparameter C</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The violation penalty is governed by <MathText text="$C\sum_{i=1}^n \xi_i$" />. Consider a dataset where the cumulative violation is fixed at <MathText text="$\sum \xi_i = 1.6$" />:
        </p>

        {/* Penalty Scaling Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4">Hyperparameter <MathText text="$C$" /></th>
                <th className="py-2.5 px-4">Calculation</th>
                <th className="py-2.5 px-4">Total Violation Penalty</th>
                <th className="py-2.5 px-4">Model Behavior &amp; Trade-off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-cyan-300">C = 0.1</td>
                <td className="py-2.5 px-4 text-slate-300">0.1 &times; 1.6</td>
                <td className="py-2.5 px-4 text-cyan-400 font-bold">0.16</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Violations are cheap &rarr; Wider margin, tolerates errors</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-indigo-300">C = 1.0</td>
                <td className="py-2.5 px-4 text-slate-300">1.0 &times; 1.6</td>
                <td className="py-2.5 px-4 text-indigo-400 font-bold">1.60</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Balanced trade-off between margin width and violations</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-purple-300">C = 10.0</td>
                <td className="py-2.5 px-4 text-slate-300">10.0 &times; 1.6</td>
                <td className="py-2.5 px-4 text-purple-400 font-bold">16.00</td>
                <td className="py-2.5 px-4 font-sans text-slate-300">Violations are costly &rarr; Narrower margin, fits data tightly</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 uppercase tracking-wider block">Small C (High Regularization)</span>
            <p className="text-slate-400 leading-relaxed">
              Allows more margin violations in exchange for a wider margin band. Yields higher bias, lower variance, and robustness against outliers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="font-bold text-purple-300 uppercase tracking-wider block">Large C (Low Regularization)</span>
            <p className="text-slate-400 leading-relaxed">
              Imposes severe penalties for violations, forcing a narrower margin that aggressively classifies training points correctly. Risk of overfitting.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Hyperparameter Selection:</strong> <MathText text="$C$" /> is an empirical hyperparameter tuned globally via cross-validation; it is never computed analytically from a single observation.
          </span>
        </div>
      </section>

      {/* Section 6: Complete Numerical Comparison & Interactive Trade-off */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <TrendingDown className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Complete Numerical Comparison &amp; Candidate Selection</h2>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-300 leading-relaxed">
            Consider the 1D dataset containing overlapping classes between points <MathText text="$x = 4.5$" /> and <MathText text="$x = 5$" />:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2 px-3">Observation</th>
                  <th className="py-2 px-3">Feature <MathText text="$x_i$" /></th>
                  <th className="py-2 px-3">True Label <MathText text="$y_i$" /></th>
                  <th className="py-2 px-3">Role / Property</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                <tr>
                  <td className="py-2 px-3 text-white font-bold">1</td>
                  <td className="py-2 px-3 text-cyan-300">2.0</td>
                  <td className="py-2 px-3 text-rose-400">-1</td>
                  <td className="py-2 px-3 font-sans text-slate-400">Negative Anchor</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-white font-bold">2</td>
                  <td className="py-2 px-3 text-cyan-300">6.0</td>
                  <td className="py-2 px-3 text-emerald-400">+1</td>
                  <td className="py-2 px-3 font-sans text-slate-400">Positive Anchor</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-white font-bold">3</td>
                  <td className="py-2 px-3 text-cyan-300">4.5</td>
                  <td className="py-2 px-3 text-emerald-400">+1</td>
                  <td className="py-2 px-3 font-sans text-amber-300">Class Overlap Point</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-white font-bold">4</td>
                  <td className="py-2 px-3 text-cyan-300">5.0</td>
                  <td className="py-2 px-3 text-rose-400">-1</td>
                  <td className="py-2 px-3 font-sans text-rose-300">Class Overlap Inversion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Breakdown of Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Candidate A */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Candidate A</span>
              <span className="text-xs font-mono text-slate-400">f_A(x) = 0.5x - 2</span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-300">
              <div>w = 0.5 &implies; &frac12;w&sup2; = &frac12;(0.25) = <strong className="text-white">0.125</strong></div>
              <div>x=2.0: m = 1.0 &implies; ξ = 0.0</div>
              <div>x=6.0: m = 1.0 &implies; ξ = 0.0</div>
              <div>x=4.5: m = 0.25 &implies; ξ = 0.75</div>
              <div>x=5.0: m = -0.5 &implies; ξ = 1.50</div>
              <div className="pt-1 text-amber-300 font-bold border-t border-slate-800">
                &sum;ξᵢ = 0 + 0 + 0.75 + 1.5 = 2.25
              </div>
              <div className="text-cyan-300 font-bold">
                J_A(C) = 0.125 + 2.25 C
              </div>
            </div>
          </div>

          {/* Candidate B */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Candidate B (Wider Margin)</span>
              <span className="text-xs font-mono text-slate-400">f_B(x) = 0.25x - 0.75</span>
            </div>
            <div className="text-xs font-mono space-y-1 text-slate-300">
              <div>w = 0.25 &implies; &frac12;w&sup2; = &frac12;(0.0625) = <strong className="text-white">0.03125</strong></div>
              <div>x=2.0: m = 0.25 &implies; ξ = 0.75</div>
              <div>x=6.0: m = 0.75 &implies; ξ = 0.25</div>
              <div>x=4.5: m = 0.375 &implies; ξ = 0.625</div>
              <div>x=5.0: m = -0.5 &implies; ξ = 1.50</div>
              <div className="pt-1 text-amber-300 font-bold border-t border-slate-800">
                &sum;ξᵢ = 0.75 + 0.25 + 0.625 + 1.5 = 3.125
              </div>
              <div className="text-indigo-300 font-bold">
                J_B(C) = 0.03125 + 3.125 C
              </div>
            </div>
          </div>
        </div>

        {/* Interactive C Slider & Dynamic Decision Engine */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Dynamic Model Selection Simulator
              </h4>
              <p className="text-xs text-slate-400">Slide <MathText text="$C$" /> to observe how hyperparameter tuning swaps the optimal classifier.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Lecture Presets:</span>
              <button
                onClick={() => setCParam(0.1)}
                className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                  Math.abs(cParam - 0.1) < 0.01
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                C = 0.1 (Prefers B)
              </button>
              <button
                onClick={() => setCParam(1.0)}
                className={`px-2.5 py-1 text-xs rounded-lg border transition ${
                  Math.abs(cParam - 1.0) < 0.01
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                C = 1.0 (Prefers A)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Hyperparameter C</span>
              <span className="text-white font-bold">{cParam.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min={0.01}
              max={2.0}
              step={0.01}
              value={cParam}
              onChange={(e) => setCParam(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.01 (Wide Margin Dominates)</span>
              <span className="text-amber-400">Crossover C* &asymp; 0.107</span>
              <span>2.00 (Violation Minimization Dominates)</span>
            </div>
          </div>

          {/* Real-time Objective Cost Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center text-xs">
            <div className={`p-3.5 rounded-xl border ${
              winner === 'Candidate A'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <span className="text-[10px] text-slate-400 font-sans block">Candidate A Cost J_A</span>
              <span className="text-base font-bold">{costA.toFixed(5)}</span>
              {winner === 'Candidate A' && <span className="text-[10px] font-sans font-bold text-emerald-400 block pt-0.5">★ OPTIMAL</span>}
            </div>

            <div className={`p-3.5 rounded-xl border ${
              winner === 'Candidate B'
                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <span className="text-[10px] text-slate-400 font-sans block">Candidate B Cost J_B</span>
              <span className="text-base font-bold">{costB.toFixed(5)}</span>
              {winner === 'Candidate B' && <span className="text-[10px] font-sans font-bold text-emerald-400 block pt-0.5">★ OPTIMAL</span>}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-center">
              <span className="text-[10px] text-slate-400 font-sans block">Selected Model</span>
              <span className="text-sm font-sans font-bold text-cyan-300">
                {winner}
              </span>
              <span className="text-[10px] font-sans text-slate-400">
                {cParam < 0.107 ? 'Prioritizes wider margin' : 'Prioritizes fewer violations'}
              </span>
            </div>
          </div>
        </div>

        {/* Final Takeaway Answer Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Module Summary:</strong> Soft-margin SVM assigns every observation its own slack variable <MathText text="$\xi_i$" />, sums the violations, weights them by penalty parameter <MathText text="$C$" />, and balances the total violation cost against the margin width objective <MathText text="$\frac{1}{2}\|\mathbf{w}\|^2$" />.
          </p>
        </div>
      </section>
    </div>
  );
};
