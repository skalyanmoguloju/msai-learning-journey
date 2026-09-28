import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Activity,
  Sliders,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Maximize2,
  TrendingUp,
  Cpu,
  Zap,
  Grid
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module4FeatureExpansionNonlinear: React.FC = () => {
  // ── Interactive 1: Circular / Polynomial Boundary Evaluator ──
  const [x1, setX1] = useState<number>(1);
  const [x2, setX2] = useState<number>(1);

  // Computations
  const x1Sq = x1 * x1;
  const x2Sq = x2 * x2;
  const x1x2 = x1 * x2;
  const circleScore = x1Sq + x2Sq - 4;
  const radius = Math.sqrt(x1Sq + x2Sq);

  // Transformed coordinates: z1 = x1^2, z2 = x2^2
  const z1 = x1Sq;
  const z2 = x2Sq;
  const linearZScore = z1 + z2 - 4;

  const loadPreset = (px1: number, px2: number) => {
    setX1(px1);
    setX2(px2);
  };

  // ── Interactive 2: Combinatorial Dimension Explosion Calculator ──
  const [pDim, setPDim] = useState<number>(100);
  const [degree, setDegree] = useState<number>(2);

  // nCr calculation for (p + d) choose d
  const computeCombinations = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    let result = 1;
    for (let i = 1; i <= r; i++) {
      result = (result * (n - i + 1)) / i;
    }
    return Math.round(result);
  };

  const totalExpandedTerms = computeCombinations(pDim + degree, degree);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Goal & Core Intuition Banner */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono uppercase tracking-wider">
              Module 4 Overview
            </span>
            <span className="text-xs text-slate-400">Nonlinear Decision Boundaries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Feature Expansion and Nonlinear Boundaries
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            <strong>Goal:</strong> Understand how a linear classifier operating in an algebraically expanded feature space can produce intricate, curved nonlinear decision boundaries in the original feature space.
          </p>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-start gap-3 mt-4">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-cyan-200 leading-relaxed">
              <strong>Core Intuition:</strong> The model remains strictly linear in the derived features it receives. We alter the geometric representation so that a straight hyperplane in the expanded space curves naturally when projected back onto original coordinates.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Why a Linear Boundary May Fail */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">1. Why a Linear Boundary May Fail</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Certain dataset distributions are fundamentally incapable of being separated by any single straight line. Consider the classic <strong>XOR / diagonal configuration</strong>:
        </p>

        {/* XOR Dataset Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-mono">Feature x₁</th>
                <th className="py-2.5 px-4 font-mono">Feature x₂</th>
                <th className="py-2.5 px-4">Class Target (y)</th>
                <th className="py-2.5 px-4">Geometric Placement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2 px-4 text-white">0</td>
                <td className="py-2 px-4 text-white">0</td>
                <td className="py-2 px-4"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-sans font-bold">-1</span></td>
                <td className="py-2 px-4 font-sans text-slate-400">Bottom-Left Corner (Diagonal 1)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2 px-4 text-white">0</td>
                <td className="py-2 px-4 text-white">1</td>
                <td className="py-2 px-4"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-sans font-bold">+1</span></td>
                <td className="py-2 px-4 font-sans text-slate-400">Top-Left Corner (Diagonal 2)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2 px-4 text-white">1</td>
                <td className="py-2 px-4 text-white">0</td>
                <td className="py-2 px-4"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-sans font-bold">+1</span></td>
                <td className="py-2 px-4 font-sans text-slate-400">Bottom-Right Corner (Diagonal 2)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2 px-4 text-white">1</td>
                <td className="py-2 px-4 text-white">1</td>
                <td className="py-2 px-4"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-sans font-bold">-1</span></td>
                <td className="py-2 px-4 font-sans text-slate-400">Top-Right Corner (Diagonal 1)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-300">
          <p className="leading-relaxed">
            The positive instances lie across one diagonal, while the negative instances occupy the opposing diagonal. A linear classifier evaluates <MathText text="$f(\mathbf{x}) = w_1 x_1 + w_2 x_2 + b$" />, restricting its boundary to a rigid, straight line.
          </p>
          <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/50 text-rose-300 font-mono text-center">
            No single straight line can place both positive points on one side while placing both negative points on the other.
          </div>
          <p className="text-slate-400 italic">
            To capture such complex relationships, we must synthesize nonlinear derived features.
          </p>
        </div>
      </section>

      {/* Section 2: Expand the Feature Space */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">2. Expand the Feature Space</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Starting from original 2D coordinates <MathText text="$\mathbf{x} = [x_1, x_2]^T$" />, we introduce quadratic polynomials and interaction cross-terms:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-cyan-300">
          <MathText text="$$\phi(\mathbf{x}) = [x_1, \; x_2, \; x_1^2, \; x_2^2, \; x_1 x_2]^T \in \mathbb{R}^5$$" />
        </div>

        {/* Concrete Worked Transformation Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-cyan-300 font-sans block uppercase">Example 1: Point x = (2, 3)</span>
            <div className="text-slate-300 space-y-1">
              <div>x₁² = 2² = 4</div>
              <div>x₂² = 3² = 9</div>
              <div>x₁x₂ = (2)(3) = 6</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-bold">
              &phi;(2, 3) = [2, 3, 4, 9, 6]ᵀ
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-indigo-300 font-sans block uppercase">Example 2: Point x = (1, 4)</span>
            <div className="text-slate-300 space-y-1">
              <div>x₁² = 1² = 1</div>
              <div>x₂² = 4² = 16</div>
              <div>x₁x₂ = (1)(4) = 4</div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-bold">
              &phi;(1, 4) = [1, 4, 1, 16, 4]ᵀ
            </div>
          </div>
        </div>

        {/* Dataset Transformation Table */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Lecture 4-Point Dataset Expansion Matrix
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold font-mono">
                  <th className="py-2.5 px-4 font-sans">Original (x₁, x₂)</th>
                  <th className="py-2.5 px-4">x₁²</th>
                  <th className="py-2.5 px-4">x₂²</th>
                  <th className="py-2.5 px-4">x₁x₂</th>
                  <th className="py-2.5 px-4 font-sans">Expanded Vector &phi;(x) &isin; &reals;&sup5;</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 text-white font-bold">(1, 2)</td>
                  <td className="py-2.5 px-4 text-cyan-300">1</td>
                  <td className="py-2.5 px-4 text-indigo-300">4</td>
                  <td className="py-2.5 px-4 text-purple-300">2</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">[1, 2, 1, 4, 2]ᵀ</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 text-white font-bold">(2, 1)</td>
                  <td className="py-2.5 px-4 text-cyan-300">4</td>
                  <td className="py-2.5 px-4 text-indigo-300">1</td>
                  <td className="py-2.5 px-4 text-purple-300">2</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">[2, 1, 4, 1, 2]ᵀ</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 text-white font-bold">(2, 3)</td>
                  <td className="py-2.5 px-4 text-cyan-300">4</td>
                  <td className="py-2.5 px-4 text-indigo-300">9</td>
                  <td className="py-2.5 px-4 text-purple-300">6</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">[2, 3, 4, 9, 6]ᵀ</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 text-white font-bold">(3, 2)</td>
                  <td className="py-2.5 px-4 text-cyan-300">9</td>
                  <td className="py-2.5 px-4 text-indigo-300">4</td>
                  <td className="py-2.5 px-4 text-purple-300">6</td>
                  <td className="py-2.5 px-4 text-emerald-400 font-bold">[3, 2, 9, 4, 6]ᵀ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Polynomial Boundary Example */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">3. Polynomial Boundary Example (Circular Separator)</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consider a classifier parameterized by quadratic features with zero linear weights:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-purple-300">
          <MathText text="$$f(\mathbf{x}) = x_1^2 + x_2^2 - 4$$" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The decision boundary is defined where the score evaluates to exactly zero:
        </p>

        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/50 text-center font-mono text-sm text-purple-200">
          <MathText text="$$x_1^2 + x_2^2 - 4 = 0 \implies x_1^2 + x_2^2 = 4$$" />
          <p className="text-xs font-sans text-purple-300 mt-1">
            Geometrically, this represents a <strong>circle centered at (0, 0) with radius r = 2</strong>.
          </p>
        </div>

        {/* Step-by-Step Numerical Verification Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-rose-400 font-bold block font-sans">Point (1, 1): Inside Circle</span>
            <div>f(1, 1) = 1² + 1² - 4 = 1 + 1 - 4 = <strong className="text-rose-400">-2 &lt; 0</strong></div>
            <p className="font-sans text-slate-400 text-[11px]">Classified as Negative (-1)</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block font-sans">Point (2, 0): On Boundary</span>
            <div>f(2, 0) = 2² + 0² - 4 = 4 - 4 = <strong className="text-amber-400">0</strong></div>
            <p className="font-sans text-slate-400 text-[11px]">Lies directly on circular boundary</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block font-sans">Point (3, 1): Outside Circle</span>
            <div>f(3, 1) = 3² + 1² - 4 = 9 + 1 - 4 = <strong className="text-emerald-400">6 &gt; 0</strong></div>
            <p className="font-sans text-slate-400 text-[11px]">Classified as Positive (+1)</p>
          </div>
        </div>
      </section>

      {/* Section 4: Linear in Transformed Space, Nonlinear in Original Space */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Grid className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">4. Linear in Transformed Space, Nonlinear in Original Space</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Define transformed coordinates <MathText text="$z_1 = x_1^2$" /> and <MathText text="$z_2 = x_2^2$" />. In terms of <MathText text="$\mathbf{z} = [z_1, z_2]^T$" />, the decision boundary becomes:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-emerald-300">
          <MathText text="$$z_1 + z_2 - 4 = 0$$" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In <MathText text="$\mathbf{z}$" />-space, this is an ordinary <strong>straight line</strong> with normal vector <MathText text="$\mathbf{w} = [1, 1]^T$" /> and bias <MathText text="$b = -4$" />! Substituting back <MathText text="$z_1 = x_1^2, z_2 = x_2^2$" /> restores <MathText text="$x_1^2 + x_2^2 - 4 = 0$" />, yielding the curved circle in <MathText text="$\mathbf{x}$" />-space.
        </p>

        {/* Dual Space Mapping Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold font-mono">
                <th className="py-2.5 px-4 font-sans">Original Point (x₁, x₂)</th>
                <th className="py-2.5 px-4">z₁ = x₁²</th>
                <th className="py-2.5 px-4">z₂ = x₂²</th>
                <th className="py-2.5 px-4 font-sans">Transformed Point (z₁, z₂)</th>
                <th className="py-2.5 px-4 font-sans">Geometry in z-Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">(2, 0)</td>
                <td className="py-2.5 px-4 text-cyan-300">4</td>
                <td className="py-2.5 px-4 text-indigo-300">0</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">(4, 0)</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">On straight line: 4 + 0 - 4 = 0</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">(0, 2)</td>
                <td className="py-2.5 px-4 text-cyan-300">0</td>
                <td className="py-2.5 px-4 text-indigo-300">4</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">(0, 4)</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">On straight line: 0 + 4 - 4 = 0</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">(1, 1)</td>
                <td className="py-2.5 px-4 text-cyan-300">1</td>
                <td className="py-2.5 px-4 text-indigo-300">1</td>
                <td className="py-2.5 px-4 text-rose-400 font-bold">(1, 1)</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Negative side: 1 + 1 - 4 = -2 &lt; 0</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Key Realization:</strong> The classifier is completely linear in the coordinates it receives (<MathText text="$\mathbf{z}$" />). The coordinate transformation mapping <MathText text="$\phi$" /> is what makes the decision boundary appear curved and nonlinear when observed using original features (<MathText text="$\mathbf{x}$" />).
          </p>
        </div>

        {/* Live Coordinate & Score Evaluator */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Interactive Dual-Space Point Evaluator
              </span>
              <p className="text-xs text-slate-400">Evaluate <MathText text="$f(\mathbf{x}) = x_1^2 + x_2^2 - 4$" /> across original and transformed spaces.</p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-400">Presets:</span>
              <button
                onClick={() => loadPreset(1, 1)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (1, 1) Inside Circle
              </button>
              <button
                onClick={() => loadPreset(2, 0)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (2, 0) Boundary
              </button>
              <button
                onClick={() => loadPreset(3, 1)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (3, 1) Outside Circle
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Feature x₁</span>
                <span className="text-white font-bold">{x1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-4}
                max={4}
                step={0.1}
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Feature x₂</span>
                <span className="text-white font-bold">{x2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-4}
                max={4}
                step={0.1}
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-center text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Original x-Space</span>
              <div className="text-cyan-300 font-bold">x = ({x1.toFixed(1)}, {x2.toFixed(1)})</div>
              <div className="text-[11px] text-slate-400">Radius = {radius.toFixed(2)} (Boundary = 2.0)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans block uppercase">Transformed z-Space</span>
              <div className="text-indigo-300 font-bold">z = ({z1.toFixed(2)}, {z2.toFixed(2)})</div>
              <div className="text-[11px] text-slate-400">Linear line: z₁ + z₂ = 4.0</div>
            </div>

            <div className={`p-3.5 rounded-xl border flex flex-col justify-center ${
              circleScore > 0
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : circleScore < 0
                ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                : 'bg-amber-950/40 border-amber-800 text-amber-300'
            }`}>
              <span className="text-[10px] font-sans block uppercase text-slate-400">Classification</span>
              <span className="text-sm font-bold font-sans">
                {circleScore > 0 ? '+1 (Outside Circle)' : circleScore < 0 ? '-1 (Inside Circle)' : 'On Boundary (0)'}
              </span>
              <span className="text-[10px]">Score = {circleScore.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Explicit Expansion Becomes Expensive */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">5. Why Explicit Expansion Becomes Prohibitive</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          For two features with degree <MathText text="$d = 2$" />, the expansion is modest (5 features). However, for an arbitrary input dimension <MathText text="$p$" /> and polynomial degree <MathText text="$d$" />, the combinatorial number of expanded feature dimensions scales as:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-amber-300">
          <MathText text="$$\binom{p + d}{d} = \frac{(p + d)!}{p! \, d!}$$" />
        </div>

        {/* Combinatorial Table from HTML */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block font-mono">
              p = 100, Degree d = 2
            </span>
            <div className="font-mono text-sm text-white">
              <MathText text="$$\binom{102}{2} = \frac{102 \times 101}{2} = 5,151 \text{ features}$$" />
            </div>
            <p className="text-xs text-slate-400">
              Expands a 100-dimensional vector into over 5,000 distinct terms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block font-mono">
              p = 100, Degree d = 3
            </span>
            <div className="font-mono text-sm text-white">
              <MathText text="$$\binom{103}{3} = \frac{103 \times 102 \times 101}{6} = 176,851 \text{ features}$$" />
            </div>
            <p className="text-xs text-slate-400">
              Explodes to over 176,000 features, leading to acute memory bloat and risk of overfitting.
            </p>
          </div>
        </div>

        {/* Interactive Combinatorics Calculator */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-cyan-400" /> Interactive Feature Dimension Explosion Simulator
            </h4>
            <p className="text-xs text-slate-400">Compute <MathText text="$\binom{p + d}{d}$" /> dynamically across custom dimensions and polynomial degrees.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Dimension p</span>
                <span className="text-white font-bold">{pDim} features</span>
              </div>
              <input
                type="range"
                min={2}
                max={150}
                step={1}
                value={pDim}
                onChange={(e) => setPDim(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Polynomial Degree d</span>
                <span className="text-white font-bold">Degree {degree}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={degree}
                onChange={(e) => setDegree(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="text-center sm:text-left">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Formula Evaluated</span>
              <span className="text-xs text-slate-200">
                C({pDim} + {degree}, {degree}) = C({pDim + degree}, {degree})
              </span>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Total Expanded Dimensions</span>
              <span className="text-xl font-bold text-amber-300">
                {totalExpandedTerms.toLocaleString()} terms
              </span>
            </div>
          </div>
        </div>

        {/* Bridge to Kernel Trick */}
        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <span>Motivation for the Kernel Trick (Module 5 Preview)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Because SVM training algorithms depend <em>strictly</em> on inner dot products between sample pairs <MathText text="$\phi(\mathbf{x}_i)^T \phi(\mathbf{x}_j)$" />, we can compute this value implicitly using a <strong>Kernel Function</strong> <MathText text="$K(\mathbf{x}_i, \mathbf{x}_j) = \phi(\mathbf{x}_i)^T \phi(\mathbf{x}_j)$" /> in low-dimensional space without ever having to explicitly construct the high-dimensional feature vectors!
          </p>
        </div>

        {/* Final Takeaway Answer Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Module Summary:</strong> Feature expansion maps input features into higher-dimensional coordinates so that a linear hyperplane in the expanded space produces curved, nonlinear boundaries in the original space. Because explicit expansion suffers from combinatorial explosion (<MathText text="$\binom{p+d}{d}$" />), kernel methods are introduced to calculate inner products implicitly.
          </p>
        </div>
      </section>
    </div>
  );
};
