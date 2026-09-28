import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Activity,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash,
  Scale,
  Sliders,
  Sparkles
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1HyperplanesLinear: React.FC = () => {
  // ── Interactive 1: Live Hyperplane & Linear Classifier Sandbox ──
  const [w1, setW1] = useState<number>(2);
  const [w2, setW2] = useState<number>(1);
  const [bias, setBias] = useState<number>(-7);
  const [x1, setX1] = useState<number>(4);
  const [x2, setX2] = useState<number>(2);

  // Computations
  const dotProduct = w1 * x1 + w2 * x2;
  const score = dotProduct + bias;
  const prediction = score > 0 ? '+1' : score < 0 ? '-1' : 'Boundary';

  // Preset scenarios from the HTML lecture
  const loadPreset = (presetW1: number, presetW2: number, presetB: number, presetX1: number, presetX2: number) => {
    setW1(presetW1);
    setW2(presetW2);
    setBias(presetB);
    setX1(presetX1);
    setX2(presetX2);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* Goal & Core Intuition Banner */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono uppercase tracking-wider">
              Module 1 Overview
            </span>
            <span className="text-xs text-slate-400">Foundations of Support Vector Machines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hyperplanes and Linear Classification
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            <strong>Goal:</strong> Understand how a linear classifier leverages feature vectors, weight parameters, and an algebraic bias to cleanly separate two classes across an ambient feature space.
          </p>

          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-3 mt-4">
            <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              <strong>Core Intuition:</strong> A hyperplane forms the separating boundary. The linear score <MathText text="$f(\mathbf{x}) = \mathbf{w}^T\mathbf{x} + b$" /> tells us which side of the boundary an observation lies on, while its magnitude reflects geometric confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Binary Classification */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">1. Binary Classification</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Classification means assigning an observed object to a discrete categorical bucket. In <strong>binary classification</strong>, there are exactly two mutually exclusive classes, such as <span className="text-emerald-400 font-medium">spam vs. not spam</span> or <span className="text-rose-400 font-medium">disease vs. no disease</span>.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          In SVMs and margin-based classifiers, we conventionally encode target labels as:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-cyan-300">
          <MathText text="$$y \in \{-1, +1\}$$" />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Labeling Convention:</strong> Choosing which category maps to <MathText text="$+1$" /> versus <MathText text="$-1$" /> is arbitrary, but once selected, it must be applied consistently across the entire mathematical formulation and loss optimization.
          </span>
        </div>
      </section>

      {/* Section 2: Feature Vectors */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">2. Feature Vectors</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A feature is a quantitative, measurable property of an instance. For an email filter, feature <MathText text="$x_1$" /> might record the count of suspicious keywords, and <MathText text="$x_2$" /> might count embedded hyperlinks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">2D Feature Vector</span>
            <div className="font-mono text-cyan-300 text-sm">
              <MathText text="$$\mathbf{x} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = [x_1, x_2]^T$$" />
            </div>
            <p className="text-xs text-slate-400">
              An email instance with 5 suspicious words and 3 links is expressed as <MathText text="$\mathbf{x} = [5, 3]^T$" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">General p-Dimensional Vector</span>
            <div className="font-mono text-indigo-300 text-sm">
              <MathText text="$$\mathbf{x} = [x_1, x_2, \dots, x_p]^T \in \mathbb{R}^p$$" />
            </div>
            <p className="text-xs text-slate-400">
              In two dimensions, each feature vector represents a geometric point <MathText text="$(x_1, x_2)$" /> on a 2D Cartesian plane.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: What is a Hyperplane? */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">3. What is a Hyperplane?</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A <strong>hyperplane</strong> is an affine subspace of dimension <MathText text="$p - 1$" /> that partitions a <MathText text="$p$" />-dimensional ambient feature space into two separate disconnected half-spaces.
        </p>

        {/* Dimensionality Mapping Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4">Feature Dimensions (<MathText text="$p$" />)</th>
                <th className="py-2.5 px-4">Hyperplane Geometry</th>
                <th className="py-2.5 px-4">Subspace Dimension (<MathText text="$p-1$" />)</th>
                <th className="py-2.5 px-4">Geometric Intuition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-2.5 px-4 font-mono font-bold text-white">1D (<MathText text="$\mathbb{R}^1$" />)</td>
                <td className="py-2.5 px-4 font-semibold text-cyan-300">Point</td>
                <td className="py-2.5 px-4 font-mono">0D</td>
                <td className="py-2.5 px-4 text-slate-400">A threshold point on a 1D real number line</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-2.5 px-4 font-mono font-bold text-white">2D (<MathText text="$\mathbb{R}^2$" />)</td>
                <td className="py-2.5 px-4 font-semibold text-emerald-300">Line</td>
                <td className="py-2.5 px-4 font-mono">1D</td>
                <td className="py-2.5 px-4 text-slate-400">A line dividing the 2D coordinate plane</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-2.5 px-4 font-mono font-bold text-white">3D (<MathText text="$\mathbb{R}^3$" />)</td>
                <td className="py-2.5 px-4 font-semibold text-purple-300">Plane</td>
                <td className="py-2.5 px-4 font-mono">2D</td>
                <td className="py-2.5 px-4 text-slate-400">A flat 2D sheet dividing 3D space</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="py-2.5 px-4 font-mono font-bold text-white"><MathText text="$p$" /> dimensions (<MathText text="$\mathbb{R}^p$" />)</td>
                <td className="py-2.5 px-4 font-semibold text-indigo-300">Hyperplane</td>
                <td className="py-2.5 px-4 font-mono"><MathText text="$p - 1$" /></td>
                <td className="py-2.5 px-4 text-slate-400">A flat <MathText text="$(p-1)$" />-dimensional manifold dividing <MathText text="$\mathbb{R}^p$" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Concrete 2D Example</span>
          <div className="font-mono text-cyan-300 text-sm">
            <MathText text="$$x_1 + x_2 - 4 = 0$$" />
          </div>
          <p className="text-xs text-slate-300">
            Points such as <span className="font-mono text-white">(0, 4)</span>, <span className="font-mono text-white">(1, 3)</span>, and <span className="font-mono text-white">(2, 2)</span> lie strictly on this line because their coordinates make the expression evaluate to zero:
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono pt-1 text-slate-300">
            <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60">0 + 4 - 4 = 0 ✓</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60">1 + 3 - 4 = 0 ✓</span>
            <span className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60">2 + 2 - 4 = 0 ✓</span>
          </div>
        </div>
      </section>

      {/* Section 4: The Hyperplane Equation */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Hash className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">4. The Hyperplane Equation</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The general algebraic equation defining any hyperplane in <MathText text="$\mathbb{R}^p$" /> is:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-purple-300">
          <MathText text="$$\mathbf{w}^T\mathbf{x} + b = 0$$" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-purple-300 block"><MathText text="$\mathbf{x}$" />: Feature Vector</span>
            <p className="text-xs text-slate-400">The coordinate inputs representing an observation in feature space.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-cyan-300 block"><MathText text="$\mathbf{w}$" />: Weight Vector</span>
            <p className="text-xs text-slate-400">Normal vector controlling the orientation and relative influence of each feature.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-300 block"><MathText text="$b$" />: Bias Parameter</span>
            <p className="text-xs text-slate-400">The intercept shifting the boundary away from or through the coordinate origin.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-xs font-mono font-bold text-amber-300 block"><MathText text="$\mathbf{w}^T\mathbf{x}$" />: Dot Product</span>
            <p className="text-xs text-slate-400">Sum of element-wise products: <MathText text="$\sum_{j=1}^p w_j x_j$" />.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Dot Product Expansion</h4>
          <div className="font-mono text-xs text-slate-300">
            <MathText text="$$\mathbf{w}^T\mathbf{x} = w_1 x_1 + w_2 x_2 + \dots + w_p x_p$$" />
          </div>
          <p className="text-xs text-slate-400">
            For <MathText text="$\mathbf{w} = (1, 1)$" /> and <MathText text="$b = -4$" />, the equation expands directly to <MathText text="$x_1 + x_2 - 4 = 0$" />. Testing point <MathText text="$\mathbf{x} = (1, 3)$" />:
          </p>
          <div className="font-mono text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
            (1)(1) + (1)(3) - 4 = 1 + 3 - 4 = 0 &nbsp;&implies;&nbsp; Point (1, 3) lies directly on the boundary.
          </div>
        </div>
      </section>

      {/* Section 5: Which Side of the Boundary? */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Activity className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">5. Which Side of the Boundary?</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Given an observation <MathText text="$\mathbf{x}$" />, we define the <strong>linear score</strong> <MathText text="$f(\mathbf{x})$" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-blue-300">
          <MathText text="$$f(\mathbf{x}) = \mathbf{w}^T\mathbf{x} + b$$" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The algebraic sign of the linear score governs the spatial relationship relative to the hyperplane:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span><MathText text="$f(\mathbf{x}) > 0$" />: Positive Half-Space</span>
            </div>
            <p className="text-xs text-slate-300">
              The observation lies on the positive side of the hyperplane. Predict class <MathText text="$\hat{y} = +1$" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
              <AlertCircle className="w-4 h-4" />
              <span><MathText text="$f(\mathbf{x}) < 0$" />: Negative Half-Space</span>
            </div>
            <p className="text-xs text-slate-300">
              The observation lies on the negative side of the hyperplane. Predict class <MathText text="$\hat{y} = -1$" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
              <Scale className="w-4 h-4" />
              <span><MathText text="$f(\mathbf{x}) = 0$" />: Decision Boundary</span>
            </div>
            <p className="text-xs text-slate-300">
              The observation sits exactly on the dividing boundary. Maximum classifier ambiguity.
            </p>
          </div>
        </div>

        {/* Concrete Numerical Comparison */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Evaluating Test Points for <MathText text="$x_1 + x_2 - 4 = 0$" /></span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
              <span className="text-emerald-400 font-bold">Point x = (5, 3):</span>
              <p>f(5, 3) = 5 + 3 - 4 = 4 &gt; 0</p>
              <span className="text-[11px] text-emerald-300 block">Classified as Positive (+1)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
              <span className="text-rose-400 font-bold">Point x = (1, 0):</span>
              <p>f(1, 0) = 1 + 0 - 4 = -3 &lt; 0</p>
              <span className="text-[11px] text-rose-300 block">Classified as Negative (-1)</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/50 text-xs text-blue-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-blue-400" />
            <span>
              <strong>Crucial Distinction:</strong> The linear score <MathText text="$f(\mathbf{x})$" /> is <em>not</em> a probability bounded in <MathText text="$[0, 1]$" />; it can take any real value in <MathText text="$(-\infty, +\infty)$" />.
            </span>
          </div>
        </div>
      </section>

      {/* Section 6: Complete Numerical Classifier & Interactive Sandbox */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">6. Complete Numerical Classifier &amp; Interactive Simulator</h2>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-300 leading-relaxed">
            Let weight vector <MathText text="$\mathbf{w} = [2, 1]^T$" /> and bias <MathText text="$b = -7$" />.
          </p>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 text-center">
            <MathText text="$$f(\mathbf{x}) = 2x_1 + x_2 - 7 = 0 \implies x_2 = -2x_1 + 7$$" />
          </div>
        </div>

        {/* Reference Verification Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2 px-3">Point <MathText text="$(x_1, x_2)$" /></th>
                <th className="py-2 px-3">Step-by-Step Calculation</th>
                <th className="py-2 px-3">Score <MathText text="$f(\mathbf{x})$" /></th>
                <th className="py-2 px-3">Predicted Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 text-white font-bold">(4, 2)</td>
                <td className="py-2.5 px-3 text-slate-400">2(4) + 1(2) - 7 = 8 + 2 - 7</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">+3</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-sans font-bold">+1</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 text-white font-bold">(1, 2)</td>
                <td className="py-2.5 px-3 text-slate-400">2(1) + 1(2) - 7 = 2 + 2 - 7</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold">-3</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-sans font-bold">-1</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 text-white font-bold">(2, 3)</td>
                <td className="py-2.5 px-3 text-slate-400">2(2) + 1(3) - 7 = 4 + 3 - 7</td>
                <td className="py-2.5 px-3 text-amber-400 font-bold">0</td>
                <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-sans font-bold">Boundary</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live Simulator Workbench */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Live Hyperplane Score Evaluator
              </h4>
              <p className="text-xs text-slate-400">Adjust parameters or pick lecture presets to compute <MathText text="$f(\mathbf{x}) = w_1 x_1 + w_2 x_2 + b$" />.</p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-400">Presets:</span>
              <button
                onClick={() => loadPreset(2, 1, -7, 4, 2)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (4, 2) &rarr; +1
              </button>
              <button
                onClick={() => loadPreset(2, 1, -7, 1, 2)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (1, 2) &rarr; -1
              </button>
              <button
                onClick={() => loadPreset(2, 1, -7, 2, 3)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (2, 3) &rarr; 0
              </button>
              <button
                onClick={() => loadPreset(1, 1, -4, 5, 3)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                (1, 1, -4)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* w1 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">w₁ (Weight 1)</span>
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

            {/* w2 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">w₂ (Weight 2)</span>
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

            {/* bias */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">b (Bias)</span>
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

            {/* x1 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">x₁ (Feature 1)</span>
                <span className="text-white font-mono font-bold">{x1}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={10}
                step={0.5}
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* x2 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-mono">x₂ (Feature 2)</span>
                <span className="text-white font-mono font-bold">{x2}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={10}
                step={0.5}
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          {/* Real-time Calculation Panel */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Evaluation Step</span>
              <div className="font-mono text-xs sm:text-sm text-slate-200">
                f({x1}, {x2}) = ({w1})({x1}) + ({w2})({x2}) + ({bias}) = {dotProduct} + ({bias}) = <strong className="text-white">{score}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Sign &amp; Decision</span>
                <span className={`text-base font-bold font-mono ${
                  score > 0 ? 'text-emerald-400' : score < 0 ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  Score = {score}
                </span>
              </div>
              <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                prediction === '+1'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                  : prediction === '-1'
                  ? 'bg-rose-950 text-rose-300 border-rose-800'
                  : 'bg-amber-950 text-amber-300 border-amber-800'
              }`}>
                {prediction === 'Boundary' ? 'On Boundary (0)' : `Class ${prediction}`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Recap and Practice Pipeline */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">7. Recap and Practice Pipeline</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The complete end-to-end inference pipeline for a linear classifier consists of five sequential steps:
        </p>

        {/* Pipeline Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-800 text-blue-300 font-bold">
            Features x
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
          <div className="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800 text-indigo-300 font-bold">
            Dot Product wᵀx
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
          <div className="px-3 py-1.5 rounded-lg bg-purple-950/60 border border-purple-800 text-purple-300 font-bold">
            Add Bias + b
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
          <div className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 font-bold">
            Score Sign sgn(f)
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-bold">
            Class ŷ &isin; &#123;-1, +1&#125;
          </div>
        </div>

        {/* Practice Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Problem 1</span>
            <p className="text-xs text-slate-300">
              For <MathText text="$\mathbf{w} = (3, 2)$" />, <MathText text="$b = -10$" />, and <MathText text="$\mathbf{x} = (2, 1)$" />:
            </p>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              f(x) = 3(2) + 2(1) - 10 = 6 + 2 - 10 = -2 &lt; 0
            </div>
            <p className="text-xs text-rose-400 font-semibold">
              &rarr; Prediction is class -1.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Practice Problem 2</span>
            <p className="text-xs text-slate-300">
              For <MathText text="$f(\mathbf{x}) = x_1 + 2x_2 - 6$" /> and point <MathText text="$\mathbf{x} = (2, 2)$" />:
            </p>
            <div className="font-mono text-xs text-amber-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
              f(2, 2) = 2 + 2(2) - 6 = 2 + 4 - 6 = 0
            </div>
            <p className="text-xs text-amber-400 font-semibold">
              &rarr; Point (2, 2) lies exactly on the separating hyperplane.
            </p>
          </div>
        </div>

        {/* Final Takeaway Answer Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Main Idea:</strong> A linear classifier uses <MathText text="$f(\mathbf{x}) = \mathbf{w}^T\mathbf{x} + b$" />. The sign of <MathText text="$f(\mathbf{x})$" /> identifies which side of the hyperplane the query belongs to, while a score of exactly zero designates the decision boundary.
          </p>
        </div>
      </section>
    </div>
  );
};
