import React, { useState } from 'react';
import {
  Maximize2,
  Scale,
  Shield,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sliders,
  Sparkles,
  Layers,
  Activity,
  Zap
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2MaximalMargin: React.FC = () => {
  // ── Interactive 1: Perpendicular Distance & Margin Calculator ──
  const [w1, setW1] = useState<number>(2);
  const [w2, setW2] = useState<number>(1);
  const [bias, setBias] = useState<number>(-7);
  const [x01, setX01] = useState<number>(4);
  const [x02, setX02] = useState<number>(2);

  // Computed values
  const scoreVal = w1 * x01 + w2 * x02 + bias;
  const absScore = Math.abs(scoreVal);
  const wNormSq = w1 * w1 + w2 * w2;
  const wNorm = Math.sqrt(wNormSq);
  const perpDistance = wNorm > 0 ? absScore / wNorm : 0;
  const marginHalf = wNorm > 0 ? 1 / wNorm : 0;
  const marginFull = wNorm > 0 ? 2 / wNorm : 0;

  // Preset loader
  const loadPreset = (pw1: number, pw2: number, pb: number, px1: number, px2: number) => {
    setW1(pw1);
    setW2(pw2);
    setBias(pb);
    setX01(px1);
    setX02(px2);
  };

  // ── Interactive 2: 1D Boundary Margin Visualizer ──
  const [boundary1D, setBoundary1D] = useState<number>(4);
  // Negative points at x = 1, 2; Positive points at x = 6, 7
  const negPoints = [1, 2];
  const posPoints = [6, 7];
  const closestNegDist = Math.max(0, boundary1D - Math.max(...negPoints));
  const closestPosDist = Math.max(0, Math.min(...posPoints) - boundary1D);
  const margin1D = Math.min(closestNegDist, closestPosDist);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Learning Goal & Core Intuition */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Learning Goal &amp; Core Intuition</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Understand why SVM does not settle for arbitrary separating hyperplanes, how geometric margins are measured perpendicularly, why support vectors uniquely dictate the boundary, and how the canonical hard-margin quadratic program is formulated.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-start gap-2.5 text-xs text-indigo-200 leading-relaxed">
          <Shield className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            <strong>Key Intuition:</strong> The maximal-margin classifier selects the unique separating hyperplane that maintains the largest safety cushion (geometric margin) from the closest training observations of either class.
          </span>
        </div>
      </div>

      {/* Section 1: Why One Separating Hyperplane is Not Enough */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">Why One Separating Hyperplane is Not Enough</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          When a dataset is linearly separable, infinitely many valid hyperplanes can classify all training instances with 100% training accuracy. However, a boundary that passes dangerously close to training observations has virtually zero <strong>safety cushion</strong>: small measurement errors or test-time noise will cause misclassifications.
        </p>

        {/* 1D Illustrative Example Table */}
        <div className="space-y-3 pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            1D Example: Negative Points <MathText text="$\{1, 2\}$" /> vs. Positive Points <MathText text="$\{6, 7\}$" />
          </span>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4">Candidate Boundary</th>
                  <th className="py-2.5 px-4">Closest Negative Distance</th>
                  <th className="py-2.5 px-4">Closest Positive Distance</th>
                  <th className="py-2.5 px-4">Effective Margin <MathText text="$\min(d_-, d_+)$" /></th>
                  <th className="py-2.5 px-4">Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono text-xs">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-white">x = 3</td>
                  <td className="py-2.5 px-4 text-slate-300">3 - 2 = 1</td>
                  <td className="py-2.5 px-4 text-slate-300">6 - 3 = 3</td>
                  <td className="py-2.5 px-4 text-amber-400 font-bold">1</td>
                  <td className="py-2.5 px-4 font-sans text-slate-400">Suboptimal (too close to negative points)</td>
                </tr>
                <tr className="hover:bg-emerald-950/20 bg-emerald-950/10">
                  <td className="py-2.5 px-4 font-bold text-emerald-300">x = 4</td>
                  <td className="py-2.5 px-4 text-emerald-300">4 - 2 = 2</td>
                  <td className="py-2.5 px-4 text-emerald-300">6 - 4 = 2</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold text-sm">2 (Optimal)</td>
                  <td className="py-2.5 px-4 font-sans text-emerald-300 font-semibold">Maximal safety gap (equidistant)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-white">x = 5</td>
                  <td className="py-2.5 px-4 text-slate-300">5 - 2 = 3</td>
                  <td className="py-2.5 px-4 text-slate-300">6 - 5 = 1</td>
                  <td className="py-2.5 px-4 text-amber-400 font-bold">1</td>
                  <td className="py-2.5 px-4 font-sans text-slate-400">Suboptimal (too close to positive points)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive 1D Margin Visualizer */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Interactive 1D Boundary Slider
            </span>
            <span className="font-mono text-cyan-300 font-bold">Boundary x = {boundary1D.toFixed(1)}</span>
          </div>

          <input
            type="range"
            min={2.1}
            max={5.9}
            step={0.1}
            value={boundary1D}
            onChange={(e) => setBoundary1D(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />

          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Distance to Neg (x=2)</span>
              <span className="text-rose-400 font-bold">{closestNegDist.toFixed(2)}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Distance to Pos (x=6)</span>
              <span className="text-emerald-400 font-bold">{closestPosDist.toFixed(2)}</span>
            </div>
            <div className={`p-2.5 rounded-lg border ${
              Math.abs(boundary1D - 4.0) < 0.05
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-800 text-amber-300'
            }`}>
              <span className="text-[10px] text-slate-400 block font-sans">Safety Margin</span>
              <span className="font-bold">{margin1D.toFixed(2)} {Math.abs(boundary1D - 4.0) < 0.05 ? '★ MAX' : ''}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: What the Margin Means */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Maximize2 className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">What the Margin Means</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>margin</strong> is the minimum perpendicular distance from the decision boundary to the closest training observation. The full margin band represents the total collision-free corridor spanning between the closest observations of both classes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">One-Sided Margin (M)</span>
            <div className="font-mono text-sm text-white">
              <MathText text="$$M = \text{dist}(\text{Boundary}, \text{Closest Observation}) = 2$$" />
            </div>
            <p className="text-xs text-slate-400">
              Distance from the separating center line to either class boundary.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Full Margin Band Width</span>
            <div className="font-mono text-sm text-white">
              <MathText text="$$\text{Full Band} = 6 - 2 = 4 = 2M$$" />
            </div>
            <p className="text-xs text-slate-400">
              Total width between the positive margin line and negative margin line.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Geometric Principle:</strong> In two or higher dimensions, distance is strictly measured <strong>perpendicularly</strong> (orthogonally) to the hyperplane. Far-away data points have zero impact on the margin width.
          </span>
        </div>
      </section>

      {/* Section 3: Distance from a Point to a Hyperplane */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Distance from a Point to a Hyperplane</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          For any arbitrary hyperplane <MathText text="$\mathbf{w}^T\mathbf{x} + b = 0$" />, the perpendicular geometric distance to a point <MathText text="$\mathbf{x}_0$" /> is given by:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-purple-300">
          <MathText text="$$\text{distance}(\mathbf{x}_0, \mathcal{H}) = \frac{|\mathbf{w}^T\mathbf{x}_0 + b|}{\|\mathbf{w}\|}$$" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-purple-300 block font-mono">Numerator: <MathText text="$|\mathbf{w}^T\mathbf{x}_0 + b|$" /></span>
            <p className="text-slate-400">The absolute value of the linear score evaluated at point <MathText text="$\mathbf{x}_0$" />.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-300 block font-mono">Denominator: <MathText text="$\|\mathbf{w}\| = \sqrt{\sum_{j=1}^p w_j^2}$" /></span>
            <p className="text-slate-400">The Euclidean <MathText text="$L_2$" />-norm (length) of the weight vector.</p>
          </div>
        </div>

        {/* Step-by-Step Numerical Example from HTML */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Lecture Calculation: Line <MathText text="$2x_1 + x_2 - 7 = 0$" />, Weight <MathText text="$\mathbf{w} = (2, 1)$" />, Point <MathText text="$\mathbf{x}_0 = (4, 2)$" />
          </span>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans block text-[11px]">Step 1: Compute Linear Score</span>
              <span className="text-cyan-300 font-bold">2(4) + 1(2) - 7 = 8 + 2 - 7 = 3</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans block text-[11px]">Step 2: Compute Weight Length ||w||</span>
              <span className="text-indigo-300 font-bold">||w|| = √(2² + 1²) = √(4 + 1) = √5 ≈ 2.236</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans block text-[11px]">Step 3: Calculate Geometric Distance</span>
              <span className="text-emerald-400 font-bold">distance = |3| / √5 = 3 / 2.236 ≈ 1.342</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong>Why divide by <MathText text="$\|\mathbf{w}\|$" />?</strong> Multiplying both sides of <MathText text="$2x_1 + x_2 - 7 = 0$" /> by 2 yields <MathText text="$4x_1 + 2x_2 - 14 = 0$" />. The score doubles from 3 to 6, but the geometric line is identical! Dividing by <MathText text="$\|\mathbf{w}\| = \sqrt{4^2 + 2^2} = \sqrt{20} = 2\sqrt{5}$" /> yields <MathText text="$6 / 2\sqrt{5} = 3 / \sqrt{5} \approx 1.342$" />, completely removing arbitrary parameter scaling.
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Maximal-Margin Hyperplane and Support Vectors */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Maximal-Margin Hyperplane &amp; Support Vectors</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The central decision boundary is <MathText text="$\mathbf{w}^T\mathbf{x} + b = 0$" />. By choosing canonical scaling, the two parallel bounding sheets (margin boundaries) are defined as:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-center text-sm">
          <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-emerald-300 font-bold">
            <MathText text="$$\mathbf{w}^T\mathbf{x} + b = +1 \quad (\text{Positive Margin})$$" />
          </div>
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/50 text-rose-300 font-bold">
            <MathText text="$$\mathbf{w}^T\mathbf{x} + b = -1 \quad (\text{Negative Margin})$$" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Support Vectors Defined</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The observations that sit <strong>directly on these margin boundaries</strong> are called the <strong>Support Vectors</strong>. They physically support the margin slab. If any training point not on the margin boundary is moved or deleted, the maximal-margin hyperplane remains <em>completely unchanged</em>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Distance from Center to Margin</span>
              <div className="font-mono text-base text-white font-bold">
                <MathText text="$$M = \frac{1}{\|\mathbf{w}\|}$$" />
              </div>
              <p className="text-[11px] text-slate-400">Perpendicular distance from <MathText text="$\mathbf{w}^T\mathbf{x} + b = 0$" /> to either <MathText text="$\pm 1$" /> boundary.</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Full Margin Slab Width</span>
              <div className="font-mono text-base text-white font-bold">
                <MathText text="$$\text{Total Margin} = \frac{2}{\|\mathbf{w}\|}$$" />
              </div>
              <p className="text-[11px] text-slate-400">Total perpendicular distance between positive and negative margin boundaries.</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/50 text-xs text-amber-300 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Crucial Equivalence:</strong> Maximizing the margin <MathText text="$\frac{2}{\|\mathbf{w}\|}$" /> is mathematically equivalent to <strong>minimizing <MathText text="$\|\mathbf{w}\|$" /></strong>.
            </span>
          </div>
        </div>
      </section>

      {/* Section 5: Optimization Formulation */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Optimization Formulation</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          For labels <MathText text="$y_i \in \{-1, +1\}$" />, the separate classification requirements (<MathText text="$\mathbf{w}^T\mathbf{x}_i + b \ge +1$" /> for <MathText text="$y_i = +1$" /> and <MathText text="$\mathbf{w}^T\mathbf{x}_i + b \le -1$" /> for <MathText text="$y_i = -1$" />) compress neatly into one unified condition:
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-cyan-300">
          <MathText text="$$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1, \quad \forall i = 1, \dots, n$$" />
        </div>

        {/* The Convex Quadratic Program */}
        <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Canonical Hard-Margin Quadratic Program
          </span>
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-sm text-center text-white space-y-2">
            <div>
              <span className="text-slate-400 font-sans">Objective:</span> &nbsp;
              <MathText text="$$\min_{\mathbf{w}, b} \frac{1}{2}\|\mathbf{w}\|^2$$" />
            </div>
            <div>
              <span className="text-slate-400 font-sans">Subject to:</span> &nbsp;
              <MathText text="$$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1, \quad \forall i = 1, \dots, n$$" />
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The objective minimizes weight magnitude squared (which maximizes margin width and ensures smooth differentiability), while the linear inequality constraints force every training sample to lie strictly on or outside the correct margin boundary.
          </p>
        </div>

        {/* 1D Numerical Verification from HTML */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider">
            1D Worked Example: Negative Point <MathText text="$x = 2$" />, Positive Point <MathText text="$x = 6$" />
          </span>
          <p className="text-slate-300">
            Let candidate score function be <MathText text="$f(x) = 0.5x - 2$" /> with boundary at <MathText text="$x = 4$" />:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono pt-1">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <span className="text-rose-400 font-bold block">At x = 2, y = -1:</span>
              y &middot; f(x) = (-1)(0.5(2) - 2) = (-1)(-1) = 1 ✓
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <span className="text-emerald-400 font-bold block">At x = 6, y = +1:</span>
              y &middot; f(x) = (+1)(0.5(6) - 2) = (+1)(1) = 1 ✓
            </div>
          </div>
          <p className="text-emerald-400 text-xs font-semibold pt-1">
            &rarr; Both points satisfy <MathText text="$y_i f(x_i) = 1$" /> exactly, proving both are true support vectors!
          </p>
        </div>
      </section>

      {/* Interactive 3: Live 2D Perpendicular Distance & Margin Workbench */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Interactive Distance &amp; Margin Sandbox
            </h3>
            <p className="text-xs text-slate-400">Compute perpendicular distance <MathText text="$d = \frac{|\mathbf{w}^T\mathbf{x}_0 + b|}{\|\mathbf{w}\|}$" /> and margin width <MathText text="$\frac{2}{\|\mathbf{w}\|}$" />.</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400">Presets:</span>
            <button
              onClick={() => loadPreset(2, 1, -7, 4, 2)}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Lecture (4, 2)
            </button>
            <button
              onClick={() => loadPreset(2, 1, -7, 2, 3)}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Boundary (2, 3)
            </button>
            <button
              onClick={() => loadPreset(1, 1, -4, 5, 3)}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              Module 1 Line
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-mono">w₁</span>
              <span className="text-white font-mono font-bold">{w1}</span>
            </div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.5}
              value={w1}
              onChange={(e) => setW1(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-mono">w₂</span>
              <span className="text-white font-mono font-bold">{w2}</span>
            </div>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.5}
              value={w2}
              onChange={(e) => setW2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-mono">b</span>
              <span className="text-white font-mono font-bold">{bias}</span>
            </div>
            <input
              type="range"
              min={-15}
              max={15}
              step={0.5}
              value={bias}
              onChange={(e) => setBias(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-mono">x₀₁</span>
              <span className="text-white font-mono font-bold">{x01}</span>
            </div>
            <input
              type="range"
              min={-5}
              max={10}
              step={0.5}
              value={x01}
              onChange={(e) => setX01(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-mono">x₀₂</span>
              <span className="text-white font-mono font-bold">{x02}</span>
            </div>
            <input
              type="range"
              min={-5}
              max={10}
              step={0.5}
              value={x02}
              onChange={(e) => setX02(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>

        {/* Live Calculation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Algebraic Score</span>
            <span className="text-sm font-bold text-purple-300">
              wᵀx₀ + b = {scoreVal.toFixed(2)}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Weight Norm ||w||</span>
            <span className="text-sm font-bold text-cyan-300">
              √({wNormSq.toFixed(2)}) ≈ {wNorm.toFixed(3)}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Perpendicular Distance</span>
            <span className="text-sm font-bold text-emerald-400">
              d = {perpDistance.toFixed(3)}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-sans block uppercase">Margin Band 2/||w||</span>
            <span className="text-sm font-bold text-indigo-300">
              Width = {marginFull.toFixed(3)}
            </span>
          </div>
        </div>
      </section>

      {/* Section 6: Limitations and Soft Margins */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Limitations &amp; Introduction to Soft Margins</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The hard-margin classifier requires <strong>flawless linear separation</strong>. Every single data point must strictly satisfy <MathText text="$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1$" />.
        </p>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200 space-y-2">
          <span className="font-bold uppercase tracking-wider flex items-center gap-1.5 text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400" /> Why Hard-Margin Fails in Practice:
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li><strong>Class Overlap:</strong> If real-world distributions overlap, no hyperplane can satisfy all constraints (optimization becomes infeasible).</li>
            <li><strong>Label Noise / Errors:</strong> A single mislabeled sample prevents any valid solution.</li>
            <li><strong>Sensitivity to Outliers:</strong> A single extreme point can force the boundary to dramatically pivot, drastically reducing test generalization.</li>
          </ul>
        </div>

        {/* Slack Variables Intro */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Relaxation via Slack Variables (<MathText text="$\xi_i$" />)
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            To tolerate violations and noisy data, we introduce non-negative <strong>slack variables</strong> <MathText text="$\xi_i \ge 0$" />:
          </p>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-sm text-amber-300">
            <MathText text="$$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0$$" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/50 space-y-1">
              <span className="font-bold text-emerald-400 font-mono"><MathText text="$\xi_i = 0$" /></span>
              <p className="text-slate-300">Correctly classified and strictly on or outside the margin boundary.</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/50 space-y-1">
              <span className="font-bold text-amber-400 font-mono"><MathText text="$0 < \xi_i < 1$" /></span>
              <p className="text-slate-300">Correctly classified, but violates the margin cushion (inside margin band).</p>
            </div>
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/50 space-y-1">
              <span className="font-bold text-rose-400 font-mono"><MathText text="$\xi_i \ge 1$" /></span>
              <p className="text-slate-300">On the wrong side of the decision boundary (misclassified observation).</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic pt-1">
            *Full soft-margin optimization and the regularization trade-off parameter <MathText text="$C$" /> will be explored in Module 3.
          </p>
        </div>

        {/* Final Takeaway Answer Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Module Summary:</strong> The maximal-margin classifier chooses the boundary with the largest possible perpendicular margin, which is mathematically equivalent to minimizing <MathText text="$\frac{1}{2}\|\mathbf{w}\|^2$" /> subject to keeping all training observations outside the margin band (<MathText text="$y_i(\mathbf{w}^T\mathbf{x}_i + b) \ge 1$" />).
          </p>
        </div>
      </section>
    </div>
  );
};
