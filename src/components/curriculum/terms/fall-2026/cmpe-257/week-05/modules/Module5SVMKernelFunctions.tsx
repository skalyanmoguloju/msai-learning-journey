import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Scale,
  Target,
  Grid
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module5SVMKernelFunctions: React.FC = () => {
  // ── Interactive 1: Kernel Comparison Sandbox ──
  const [selectedKernel, setSelectedKernel] = useState<'linear' | 'poly' | 'rbf'>('poly');
  const [xi1, setXi1] = useState<number>(2);
  const [xi2, setXi2] = useState<number>(3);
  const [xj1, setXj1] = useState<number>(1);
  const [xj2, setXj2] = useState<number>(4);

  // Kernel specific parameters
  const [polyC, setPolyC] = useState<number>(1);
  const [polyD, setPolyD] = useState<number>(2);
  const [rbfGamma, setRbfGamma] = useState<number>(0.5);

  // Computations
  const dotProd = xi1 * xj1 + xi2 * xj2;
  const distSq = Math.pow(xi1 - xj1, 2) + Math.pow(xi2 - xj2, 2);

  const linearVal = dotProd;
  const polyVal = Math.pow(dotProd + polyC, polyD);
  const rbfVal = Math.exp(-rbfGamma * distSq);

  const loadKernelPreset = (kType: 'linear' | 'poly' | 'rbf', pxi1: number, pxi2: number, pxj1: number, pxj2: number, c = 1, d = 2, gamma = 0.5) => {
    setSelectedKernel(kType);
    setXi1(pxi1);
    setXi2(pxi2);
    setXj1(pxj1);
    setXj2(pxj2);
    setPolyC(c);
    setPolyD(d);
    setRbfGamma(gamma);
  };

  // ── Interactive 2: Kernel SVM Inference Engine (Section 6 from HTML) ──
  // x1 = 2, y1 = -1, alpha1 = 0.2
  // x2 = 5, y2 = +1, alpha2 = 0.3
  // Query point x, gamma = 0.5, b = 0.1
  const [queryX, setQueryX] = useState<number>(3.0);
  const [modelGamma, setModelGamma] = useState<number>(0.5);
  const [modelBias, setModelBias] = useState<number>(0.1);

  const k1 = Math.exp(-modelGamma * Math.pow(2 - queryX, 2));
  const k2 = Math.exp(-modelGamma * Math.pow(5 - queryX, 2));
  const contrib1 = 0.2 * (-1) * k1;
  const contrib2 = 0.3 * (+1) * k2;
  const totalScore = contrib1 + contrib2 + modelBias;
  const predictedClass = totalScore > 0 ? '+1' : totalScore < 0 ? '-1' : 'Boundary';

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Learning Goal & Core Intuition */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Learning Goal &amp; Core Intuition</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Understand how kernel functions provide nonlinear decision boundaries by computing inner products of high-dimensional feature spaces directly from low-dimensional inputs without explicit construction.
        </p>
        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-start gap-2.5 text-xs text-purple-200 leading-relaxed">
          <Cpu className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <span>
            <strong>Key Intuition:</strong> A kernel does not filter or mask individual features. It calculates the geometric pairwise similarity comparison that would have occurred in an expanded Hilbert space, bypassing explicit feature vector construction entirely.
          </span>
        </div>
      </div>

      {/* Section 1: Why the Kernel Trick? */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Why the Kernel Trick?</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Explicit feature expansion maps inputs into vast vectors <MathText text="$\phi(\mathbf{x})$" />. Crucially, the dual optimization and decision rules of Support Vector Machines do not require individual coordinates; they require only <strong>pairwise inner dot products</strong>:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-cyan-300">
          <MathText text="$$K(\mathbf{x}_i, \mathbf{x}_j) = \phi(\mathbf{x}_i)^T \phi(\mathbf{x}_j)$$" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="font-bold text-rose-400 uppercase tracking-wider block">Without a Kernel (Explicit Route)</span>
            <p className="text-slate-400 leading-relaxed">
              Explicitly synthesize high-dimensional vectors <MathText text="$\phi(\mathbf{x}_i)$" /> and <MathText text="$\phi(\mathbf{x}_j)$" />, store them in memory, and then calculate their long dot product. Suffers from <MathText text="$\binom{p+d}{d}$" /> combinatorial explosion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-400 uppercase tracking-wider block">With a Kernel (Implicit Shortcut)</span>
            <p className="text-slate-400 leading-relaxed">
              Calculate the equivalent dot product scalar value directly using a compact closed-form kernel function <MathText text="$K(\mathbf{x}_i, \mathbf{x}_j)$" /> evaluated strictly on the original low-dimensional inputs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Inner Products and Expanded Features */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Inner Products &amp; Expanded Features Walkthrough</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consider two simple 2D vectors <MathText text="$\mathbf{x}_i = (1, 2)$" /> and <MathText text="$\mathbf{x}_j = (2, 1)$" />:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-sans uppercase font-bold block">Original Dot Product</span>
            <div className="text-cyan-300 text-sm">
              <MathText text="$$\mathbf{x}_i^T \mathbf{x}_j = (1)(2) + (2)(1) = 2 + 2 = 4$$" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-sans uppercase font-bold block">Expanded Space Mapping &phi;(x)</span>
            <div className="text-indigo-300 text-sm">
              <MathText text="$$\phi(\mathbf{x}) = [x_1, x_2, x_1^2, x_2^2, x_1 x_2]^T$$" />
            </div>
          </div>
        </div>

        {/* Step-by-Step Dot Product Evaluation */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs font-mono">
          <span className="text-slate-400 font-sans uppercase font-bold block">Expanded Vectors and Inner Product</span>
          <div className="space-y-1 text-slate-300">
            <div>&phi;(xᵢ) = [1, 2, 1², 2², (1)(2)]ᵀ = <span className="text-white font-bold">[1, 2, 1, 4, 2]ᵀ</span></div>
            <div>&phi;(xⱼ) = [2, 1, 2², 1², (2)(1)]ᵀ = <span className="text-white font-bold">[2, 1, 4, 1, 2]ᵀ</span></div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 text-sm font-bold">
            &phi;(xᵢ)ᵀ &phi;(xⱼ) = (1)(2) + (2)(1) + (1)(4) + (4)(1) + (2)(2) = 2 + 2 + 4 + 4 + 4 = 16
          </div>
          <p className="text-slate-400 font-sans text-[11px] pt-1">
            The kernel function provides an algebraic shortcut that yields this exact result without explicitly computing or storing the 5 coordinates.
          </p>
        </div>
      </section>

      {/* Section 3: Linear Kernel */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Linear Kernel &amp; Gram Matrix</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>linear kernel</strong> evaluates the standard Euclidean inner product on original coordinates:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-blue-300">
          <MathText text="$$K(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i^T \mathbf{x}_j$$" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          It produces a flat linear hyperplane boundary. It is most effective when features are already high-dimensional (e.g., text document classification, microarrays) or linearly separable.
        </p>

        {/* 3x3 Gram Matrix Example */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Lecture 3-Point Linear Kernel Matrix (Gram Matrix)
          </span>
          <p className="text-xs text-slate-400">
            For training instances <MathText text="$\mathbf{x}_1 = (1, 2)$" />, <MathText text="$\mathbf{x}_2 = (2, 1)$" />, and <MathText text="$\mathbf{x}_3 = (3, 4)$" />:
          </p>

          <div className="overflow-x-auto flex justify-center py-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm text-center">
              <MathText text="$$K = \begin{bmatrix} \mathbf{x}_1^T\mathbf{x}_1 & \mathbf{x}_1^T\mathbf{x}_2 & \mathbf{x}_1^T\mathbf{x}_3 \\ \mathbf{x}_2^T\mathbf{x}_1 & \mathbf{x}_2^T\mathbf{x}_2 & \mathbf{x}_2^T\mathbf{x}_3 \\ \mathbf{x}_3^T\mathbf{x}_1 & \mathbf{x}_3^T\mathbf{x}_2 & \mathbf{x}_3^T\mathbf{x}_3 \end{bmatrix} = \begin{bmatrix} 5 & 4 & 11 \\ 4 & 5 & 10 \\ 11 & 10 & 25 \end{bmatrix}$$" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300 text-center">
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">K₁₁ = 1² + 2² = 5</div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">K₁₂ = 1(2) + 2(1) = 4</div>
            <div className="p-2 rounded bg-slate-900/60 border border-slate-800">K₁₃ = 1(3) + 2(4) = 11</div>
          </div>
        </div>
      </section>

      {/* Section 4: Polynomial Kernel */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Polynomial Kernel</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>polynomial kernel</strong> introduces a constant offset <MathText text="$c \ge 0$" /> and exponentiates to degree <MathText text="$d$" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-purple-300">
          <MathText text="$$K(\mathbf{x}_i, \mathbf{x}_j) = (\mathbf{x}_i^T \mathbf{x}_j + c)^d$$" />
        </div>

        {/* Step-by-Step Calculation from Lecture */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block">
            Lecture Calculation: <MathText text="$\mathbf{x}_i = (2, 3)$" />, <MathText text="$\mathbf{x}_j = (1, 4)$" />, <MathText text="$c = 1$" />, <MathText text="$d = 2$" />
          </span>

          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans block text-[11px]">Step 1: Compute Original Dot Product</span>
              <span className="text-cyan-300 font-bold">xᵢᵀ xⱼ = (2)(1) + (3)(4) = 2 + 12 = 14</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans block text-[11px]">Step 2: Add Constant Offset c</span>
              <span className="text-indigo-300 font-bold">xᵢᵀ xⱼ + c = 14 + 1 = 15</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 font-sans block text-[11px]">Step 3: Exponentiate to Degree d = 2</span>
              <span className="text-emerald-400 font-bold">K(xᵢ, xⱼ) = 15² = 225</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Degree <MathText text="$d=2$" /> implicitly incorporates linear, squared, and interaction features (<MathText text="$x_1^2, x_2^2, x_1 x_2$" />) without explicitly storing them.
          </p>
        </div>
      </section>

      {/* Section 5: RBF / Gaussian Kernel */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Radial Basis Function (RBF / Gaussian) Kernel</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>RBF kernel</strong> measures geometric proximity in an infinite-dimensional feature space, decaying exponentially with squared Euclidean distance:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-emerald-300">
          <MathText text="$$K(\mathbf{x}_i, \mathbf{x}_j) = \exp(-\gamma \|\mathbf{x}_i - \mathbf{x}_j\|^2)$$" />
        </div>

        {/* 1D Numerical Evaluations from Lecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold block font-sans">xᵢ = 2, xⱼ = 5, &gamma; = 0.5</span>
            <div>(2 - 5)² = 9</div>
            <div className="text-cyan-300 font-bold">K(2, 5) = e⁻⁰·⁵⁽⁹⁾ = e⁻⁴·⁵ &asymp; 0.0111</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-indigo-400 font-bold block font-sans">xᵢ = 2, xⱼ = 3, &gamma; = 0.5</span>
            <div>(2 - 3)² = 1</div>
            <div className="text-indigo-300 font-bold">K(2, 3) = e⁻⁰·⁵⁽¹⁾ = e⁻⁰·⁵ &asymp; 0.6065</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block font-sans">Same Point: xᵢ = 2, xⱼ = 2</span>
            <div>(2 - 2)² = 0</div>
            <div className="text-emerald-300 font-bold">K(2, 2) = e⁰ = 1.0000</div>
          </div>
        </div>

        {/* Gamma Scaling Sensitivity Table */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Impact of &gamma; on Squared Distance = 9
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold font-mono">
                  <th className="py-2.5 px-4 font-sans">Gamma (&gamma;)</th>
                  <th className="py-2.5 px-4">Exponent Formulation</th>
                  <th className="py-2.5 px-4">Kernel Value K</th>
                  <th className="py-2.5 px-4 font-sans">Influence &amp; Boundary Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-cyan-300">&gamma; = 0.1</td>
                  <td className="py-2.5 px-4">e^(-0.1 &times; 9) = e^(-0.9)</td>
                  <td className="py-2.5 px-4 font-bold text-cyan-400">0.4066</td>
                  <td className="py-2.5 px-4 font-sans text-slate-300">Broad influence, smoother boundary</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-indigo-300">&gamma; = 0.5</td>
                  <td className="py-2.5 px-4">e^(-0.5 &times; 9) = e^(-4.5)</td>
                  <td className="py-2.5 px-4 font-bold text-indigo-400">0.0111</td>
                  <td className="py-2.5 px-4 font-sans text-slate-300">Balanced local influence</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-purple-300">&gamma; = 2.0</td>
                  <td className="py-2.5 px-4">e^(-2.0 &times; 9) = e^(-18)</td>
                  <td className="py-2.5 px-4 font-bold text-purple-400">&asymp; 0.0000</td>
                  <td className="py-2.5 px-4 font-sans text-rose-300">Very local influence, risks island overfitting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Kernel SVM Score & Complete Calculation */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Kernel SVM Score &amp; Complete Calculation</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The master prediction score for any arbitrary query instance <MathText text="$\mathbf{x}$" /> in kernel form is:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-amber-300">
          <MathText text="$$f(\mathbf{x}) = \sum_{i=1}^n \alpha_i y_i K(\mathbf{x}_i, \mathbf{x}) + b$$" />
        </div>

        {/* Complete Step-by-Step Worked Demonstration from HTML */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Lecture Numerical Demonstration Model
            </span>
            <p className="text-xs text-slate-400">
              Support Vector 1: <span className="font-mono text-cyan-300">x₁ = 2, y₁ = -1, α₁ = 0.2</span> &bull;
              Support Vector 2: <span className="font-mono text-indigo-300">x₂ = 5, y₂ = +1, α₂ = 0.3</span> &bull;
              Settings: <span className="font-mono text-amber-300">&gamma; = 0.5, b = 0.1</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="font-bold text-cyan-400 block font-sans">Evaluation on SV 1 (x₁ = 2):</span>
              <div>K(2, 3) = e^(-0.5(2 - 3)²) = e^(-0.5) &asymp; 0.6065</div>
              <div className="text-cyan-300 font-bold">Contribution 1: (0.2)(-1)(0.6065) &asymp; -0.1213</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="font-bold text-indigo-400 block font-sans">Evaluation on SV 2 (x₂ = 5):</span>
              <div>K(5, 3) = e^(-0.5(5 - 3)²) = e^(-2.0) &asymp; 0.1353</div>
              <div className="text-indigo-300 font-bold">Contribution 2: (0.3)(+1)(0.1353) &asymp; +0.0406</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-center space-y-1">
            <div className="text-slate-300">
              f(3) = Contribution 1 + Contribution 2 + Bias = (-0.1213) + (0.0406) + 0.1 = <strong className="text-emerald-400 text-sm">0.0193</strong>
            </div>
            <div className="text-emerald-300 font-bold text-sm">
              Since f(3) &gt; 0, the predicted class is +1!
            </div>
          </div>
        </div>

        {/* Interactive Query Evaluator Workbench */}
        <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Interactive Kernel SVM Inference Engine
              </span>
              <p className="text-xs text-slate-400">Slide query point <MathText text="$x$" /> to observe how dual weights and distance kernels combine to yield predictions.</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Presets:</span>
              <button
                onClick={() => setQueryX(3.0)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Lecture x = 3.0
              </button>
              <button
                onClick={() => setQueryX(2.0)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                At SV₁ (x = 2.0)
              </button>
              <button
                onClick={() => setQueryX(5.0)}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                At SV₂ (x = 5.0)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Query Point x</span>
                <span className="text-white font-bold">{queryX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={7}
                step={0.1}
                value={queryX}
                onChange={(e) => setQueryX(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Gamma &gamma;</span>
                <span className="text-white font-bold">{modelGamma.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={2.0}
                step={0.1}
                value={modelGamma}
                onChange={(e) => setModelGamma(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Bias b</span>
                <span className="text-white font-bold">{modelBias.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={-1.0}
                max={1.0}
                step={0.05}
                value={modelBias}
                onChange={(e) => setModelBias(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Real-time Inference Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-center text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">SV₁ Contribution</span>
              <span className="text-cyan-300 font-bold">{contrib1.toFixed(4)}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">SV₂ Contribution</span>
              <span className="text-indigo-300 font-bold">{contrib2.toFixed(4)}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans block">Final Score f(x)</span>
              <span className={`text-base font-bold ${
                totalScore > 0 ? 'text-emerald-400' : totalScore < 0 ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {totalScore.toFixed(4)}
              </span>
            </div>

            <div className={`p-3 rounded-lg border flex flex-col justify-center ${
              predictedClass === '+1'
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : predictedClass === '-1'
                ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                : 'bg-amber-950/40 border-amber-800 text-amber-300'
            }`}>
              <span className="text-[10px] text-slate-400 font-sans block">Predicted Class</span>
              <span className="text-sm font-bold font-sans">Class {predictedClass}</span>
            </div>
          </div>
        </div>

        {/* Master Comparison Table from HTML */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Kernel Types &amp; Primary Tuning Parameters
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold font-mono">
                  <th className="py-2.5 px-4 font-sans">Kernel Family</th>
                  <th className="py-2.5 px-4">Boundary Behavior</th>
                  <th className="py-2.5 px-4">Governing Hyperparameters</th>
                  <th className="py-2.5 px-4 font-sans">Best Used When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-blue-300">Linear</td>
                  <td className="py-2.5 px-4 font-sans">Straight Hyperplane</td>
                  <td className="py-2.5 px-4 text-cyan-300">C</td>
                  <td className="py-2.5 px-4 font-sans text-slate-400">Text, genomics, high feature count (p &gt;&gt; n)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-purple-300">Polynomial</td>
                  <td className="py-2.5 px-4 font-sans">Polynomially Curved</td>
                  <td className="py-2.5 px-4 text-purple-300">C, c, d</td>
                  <td className="py-2.5 px-4 font-sans text-slate-400">Structured feature interactions</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-emerald-300">RBF / Gaussian</td>
                  <td className="py-2.5 px-4 font-sans">Highly Flexible / Locally Curved</td>
                  <td className="py-2.5 px-4 text-emerald-300">C, &gamma;</td>
                  <td className="py-2.5 px-4 font-sans text-slate-400">Complex general non-linear separations (infinite dimensions)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Takeaway Answer Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Module Summary:</strong> The kernel computes similarity in implicit feature space; <MathText text="$\alpha_i$" /> and <MathText text="$y_i$" /> weight each support vector's contribution; <MathText text="$b$" /> shifts the decision threshold; and the sign of the aggregate score yields the final classification prediction.
          </p>
        </div>
      </section>
    </div>
  );
};
