import React, { useState } from 'react';
import {
  Network,
  Sparkles,
  Layers,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Binary,
  Activity,
  Sliders,
  HelpCircle,
  Eye
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3PerceptronsToNN: React.FC = () => {
  // Widget A: XOR Network Simulator State
  const [xorX1, setXorX1] = useState<0 | 1>(1);
  const [xorX2, setXorX2] = useState<0 | 1>(0);

  // Hidden neuron 1 (OR gate): w = [1, 1], b = -0.5
  const z1 = 1 * xorX1 + 1 * xorX2 - 0.5;
  const h1 = z1 > 0 ? 1 : 0;

  // Hidden neuron 2 (AND gate): w = [1, 1], b = -1.5
  const z2 = 1 * xorX1 + 1 * xorX2 - 1.5;
  const h2 = z2 > 0 ? 1 : 0;

  // Output neuron: w = [1, -2], b = -0.5 -> XOR = h1 - 2*h2 - 0.5
  const zOut = 1 * h1 - 2 * h2 - 0.5;
  const yPred = zOut > 0 ? 1 : 0;
  const yExpected = xorX1 ^ xorX2; // Bitwise XOR

  // Widget B: Activation Playground State
  const [actZ, setActZ] = useState<number>(0.0);
  const linearVal = actZ;
  const reluVal = Math.max(0, actZ);
  const sigmoidVal = 1 / (1 + Math.exp(-actZ));

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Understand why a single perceptron is fundamentally limited to linear separation, how multiple neurons collaborate to construct intermediate feature representations, why deep linear stacks collapse into trivial single layers, and how non-linear activations empower neural networks.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The core intuition:</strong> A single perceptron draws a single flat hyperplane. Multiple neurons with non-linear activations warp and fold the feature space, converting non-linearly separable problems like XOR into linearly separable representations.
        </div>
      </div>

      {/* Why One Perceptron Is Not Enough: The XOR Problem */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Foundational Limitation
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Why One Perceptron Is Not Enough</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A single Rosenblatt perceptron partitions the input space with exactly one flat, affine decision hyperplane:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\mathbf{w}^T \mathbf{x} + b = 0 \iff w_1 x_1 + w_2 x_2 + b = 0" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In a two-dimensional feature space, this boundary is a simple straight line. While a straight line can
          effortlessly solve linearly separable Boolean logic functions such as <strong className="text-slate-200">AND</strong> or <strong className="text-slate-200">OR</strong>,
          it completely fails when presented with the <strong className="text-amber-400">Exclusive-OR (XOR)</strong> problem.
        </p>

        {/* XOR Truth Table & Geometric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Truth Table */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Binary className="w-3.5 h-3.5 text-indigo-400" />
              <span>XOR Truth Table</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="pb-2">Input <MathText text="x_1" /></th>
                    <th className="pb-2">Input <MathText text="x_2" /></th>
                    <th className="pb-2">XOR Target <MathText text="y" /></th>
                    <th className="pb-2">Point Geometry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2 font-mono">0</td>
                    <td className="py-2 font-mono">0</td>
                    <td className="py-2"><span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono font-bold">0</span></td>
                    <td className="py-2 text-slate-400">Bottom-Left</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">0</td>
                    <td className="py-2 font-mono">1</td>
                    <td className="py-2"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">1</span></td>
                    <td className="py-2 text-slate-400">Top-Left</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">1</td>
                    <td className="py-2 font-mono">0</td>
                    <td className="py-2"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">1</span></td>
                    <td className="py-2 text-slate-400">Bottom-Right</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">1</td>
                    <td className="py-2 font-mono">1</td>
                    <td className="py-2"><span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono font-bold">0</span></td>
                    <td className="py-2 text-slate-400">Top-Right</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Geometric Diagnostic Box */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>The Geometric Impasse (Minsky & Papert, 1969)</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The positive examples <span className="text-emerald-400 font-semibold">(0, 1)</span> and <span className="text-emerald-400 font-semibold">(1, 0)</span> lie
              on opposite corners of the unit square, while negative examples <span className="text-rose-400 font-semibold">(0, 0)</span> and <span className="text-rose-400 font-semibold">(1, 1)</span> lie
              on the other diagonal.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              No single straight line in <MathText text="\mathbb{R}^2" /> can separate these two diagonal pairs simultaneously.
              Tuning the learning rate <MathText text="\alpha" /> or running more training epochs cannot overcome this fundamental
              geometric barrier. The architecture itself must be expanded.
            </p>
          </div>
        </div>
      </div>

      {/* Combining Multiple Perceptrons: Decomposing the Problem */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Architectural Solution
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Combining Multiple Perceptrons</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Instead of attempting to separate the non-linear XOR pattern with a single line, we can decompose XOR
          into two sub-problems that are each linearly separable:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300">Hidden Neuron 1 (<MathText text="h_1" />)</span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">OR Gate</span>
            </div>
            <p className="text-xs text-slate-300">
              Answers: <em>“Is at least one input equal to 1?”</em>
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300">
              <MathText text="z_1 = 1x_1 + 1x_2 - 0.5 \implies h_1 = \mathbb{I}(z_1 > 0)" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">Hidden Neuron 2 (<MathText text="h_2" />)</span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">AND Gate</span>
            </div>
            <p className="text-xs text-slate-300">
              Answers: <em>“Are both inputs equal to 1?”</em>
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
              <MathText text="z_2 = 1x_1 + 1x_2 - 1.5 \implies h_2 = \mathbb{I}(z_2 > 0)" />
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The final output neuron then evaluates the intermediate representations generated by the hidden neurons:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="\text{XOR}(x_1, x_2) = (x_1 \lor x_2) \land \neg(x_1 \land x_2) = h_1 \text{ AND NOT } h_2" />
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300">Key Paradigm Shift:</strong> The multilayer network does not solve the
            difficult classification problem directly in raw input space. Instead, the hidden layer transforms the
            input into a <strong className="text-white">new intermediate feature representation space</strong> where the problem becomes linearly separable!
          </p>
        </div>
      </div>

      {/* Structure of a Multilayer Neural Network */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Network Anatomy
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Structure of a Multilayer Neural Network</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A standard feedforward artificial neural network (Multilayer Perceptron, or MLP) is organized into
          distinct sequential tiers called <strong className="text-slate-100">layers</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <Layers className="w-4 h-4" />
              <span>Input Layer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Holds raw observational features <MathText text="\mathbf{x} = [x_1, \dots, x_d]^T" />. It does not perform computations; it merely distributes numerical values forward.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
              <Activity className="w-4 h-4" />
              <span>Hidden Layer(s)</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intermediate neurons that extract abstract internal representations. Hidden from direct external observation; their values serve as inputs for subsequent layers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4" />
              <span>Output Layer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizes processed hidden features into the final model prediction <MathText text="\hat{\mathbf{y}}" /> (class probabilities, binary labels, or continuous targets).
            </p>
          </div>
        </div>

        {/* Vectorized Matrix Equations */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Vectorized Layer Formulations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">Single Neuron:</span>
              <div className="font-mono text-indigo-300">
                <MathText text="z = \mathbf{w}^T \mathbf{x} + b, \quad a = g(z)" />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">Full Layer Vectorization:</span>
              <div className="font-mono text-emerald-300">
                <MathText text="\mathbf{z} = \mathbf{W}\mathbf{x} + \mathbf{b}, \quad \mathbf{a} = g(\mathbf{z})" />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Where <MathText text="\mathbf{W} \in \mathbb{R}^{m \times n}" /> contains weight vectors for each of the <MathText text="m" /> neurons as rows,
            and <MathText text="\mathbf{b} \in \mathbb{R}^m" /> provides individual biases. All neurons in a layer share the same input vector but learn different patterns due to distinct weights.
          </p>
        </div>
      </div>

      {/* Forward Propagation: Numerical Trace */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Computational Mechanics
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Forward Propagation</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-slate-200">Forward propagation</strong> is the sequential transmission of signals from the input
          nodes through each successive hidden layer to yield final predictions at the output layer:
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs font-mono text-slate-300">
          Input <MathText text="\mathbf{x}" /> &nbsp; <ArrowRight className="inline w-3.5 h-3.5 text-indigo-400" /> &nbsp;
          Linear Comb. <MathText text="\mathbf{z}^{(1)}" /> &nbsp; <ArrowRight className="inline w-3.5 h-3.5 text-indigo-400" /> &nbsp;
          Activation <MathText text="\mathbf{h} = g(\mathbf{z}^{(1)})" /> &nbsp; <ArrowRight className="inline w-3.5 h-3.5 text-indigo-400" /> &nbsp;
          Output Score <MathText text="z_{\text{out}}" /> &nbsp; <ArrowRight className="inline w-3.5 h-3.5 text-indigo-400" /> &nbsp;
          Prediction <MathText text="\hat{y}" />
        </div>

        {/* Step by step worked trace for (1, 0) */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Worked Numerical Trace for Input <MathText text="\mathbf{x} = [1, 0]^T" /> (Boolean 0/1 Convention)
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">1</span>
              <span>Hidden OR Neuron:</span>
            </div>
            <p className="text-slate-300 pl-7 font-mono">
              <MathText text="z_1 = (1)(1) + (1)(0) - 0.5 = 0.5 \implies h_1 = \mathbb{I}(0.5 > 0) = 1" />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">2</span>
              <span>Hidden AND Neuron:</span>
            </div>
            <p className="text-slate-300 pl-7 font-mono">
              <MathText text="z_2 = (1)(1) + (1)(0) - 1.5 = -0.5 \implies h_2 = \mathbb{I}(-0.5 > 0) = 0" />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[10px]">3</span>
              <span>Output XOR Neuron:</span>
            </div>
            <p className="text-slate-300 pl-7 font-mono">
              <MathText text="z_{\text{out}} = (1)(h_1) - (2)(h_2) - 0.5 = (1)(1) - 2(0) - 0.5 = 0.5 \implies \hat{y} = 1" />
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300">Notation Watch:</strong> This classic Boolean demonstration uses binary
            thresholds <MathText text="\{0, 1\}" />. The standard Rosenblatt perceptron uses bipolar labels <MathText text="\{-1, +1\}" />.
            Never mix the two conventions within the same mathematical derivation.
          </p>
        </div>
      </div>

      {/* Why Linear Layers Alone Are Not Enough: The Collapse Proof */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Critical Theorem
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Why Linear Layers Alone Are Not Enough</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A natural question arises: <em>“Can we simply stack dozens of linear perceptrons without activation functions to solve non-linear problems?”</em>
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          The answer is an emphatic <strong className="text-rose-400">NO</strong>. Stacking purely linear transformations causes the entire network to mathematically collapse into a single trivial linear layer.
        </p>

        {/* Proof Walkthrough */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Mathematical Proof of Linear Collapse
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Layer 1 Computation:</span>
              <MathText text="\mathbf{h} = \mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}" />
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Layer 2 Computation (No Non-Linearity):</span>
              <MathText text="\mathbf{y} = \mathbf{W}^{(2)}\mathbf{h} + \mathbf{b}^{(2)}" />
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Direct Algebraic Substitution:</span>
              <MathText text="\mathbf{y} = \mathbf{W}^{(2)}\left(\mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}\right) + \mathbf{b}^{(2)} = \left(\mathbf{W}^{(2)}\mathbf{W}^{(1)}\right)\mathbf{x} + \left(\mathbf{W}^{(2)}\mathbf{b}^{(1)} + \mathbf{b}^{(2)}\right)" />
            </div>
            <div className="p-2.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              <span className="text-indigo-400 block mb-1 font-sans font-bold">Collapsed Effective Parameterization:</span>
              <MathText text="\mathbf{y} = \mathbf{W}'\mathbf{x} + \mathbf{b}', \quad \text{where } \mathbf{W}' = \mathbf{W}^{(2)}\mathbf{W}^{(1)}, \; \mathbf{b}' = \mathbf{W}^{(2)}\mathbf{b}^{(1)} + \mathbf{b}^{(2)}" />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-rose-300">Takeaway:</strong> Depth alone without non-linear activations adds zero representational power.
            A 1,000-layer neural network composed entirely of linear operations can only compute a flat linear hyperplane—no better than a single-layer perceptron.
          </p>
        </div>
      </div>

      {/* Adding Non-Linearity: Activation Functions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Representational Power
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Adding Non-Linearity</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          To prevent linear collapse, every modern artificial neuron performs two distinct consecutive stages:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="z = \mathbf{w}^T \mathbf{x} + b \quad \longrightarrow \quad a = g(z)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Rectified Linear Unit (ReLU)
            </h4>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300">
              <MathText text="\text{ReLU}(z) = \max(0, z) = \begin{cases} z & \text{if } z \ge 0 \\ 0 & \text{if } z < 0 \end{cases}" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sets negative scores to zero while allowing positive values to flow unimpeded. Computationally cheap and mitigates vanishing gradients.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Sigmoid (Logistic Function)
            </h4>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300">
              <MathText text="\sigma(z) = \frac{1}{1 + e^{-z}}" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smoothly squashes the entire real line <MathText text="(-\infty, +\infty)" /> into bounded probability scores in <MathText text="(0, 1)" />.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Because <MathText text="g(\cdot)" /> is non-linear, <MathText text="g(\mathbf{W}^{(2)} g(\mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}) + \mathbf{b}^{(2)})" /> cannot
          be factored into a single matrix product. This non-linear folding allows networks to model complex, curved decision boundaries.
        </p>
      </div>

      {/* Hierarchical Feature Representations */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Deep Learning Paradigm
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">How Deep Layers Create Complex Decisions</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Each successive layer in a deep network builds higher-level abstractions upon the lower-level features computed by preceding layers:
        </p>

        {/* Feature Pyramid Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Layer 0 (Input)</span>
            <div className="font-semibold text-slate-200">Raw Pixels</div>
            <p className="text-[11px] text-slate-400">Individual RGB intensity values</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Layer 1 (Early)</span>
            <div className="font-semibold text-indigo-300">Edges & Gradients</div>
            <p className="text-[11px] text-slate-400">Oriented lines, corners, color contrasts</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Layer 2 (Middle)</span>
            <div className="font-semibold text-purple-300">Textures & Motifs</div>
            <p className="text-[11px] text-slate-400">Combinations of edges forming shapes</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Layer 3 (Deep)</span>
            <div className="font-semibold text-emerald-300">Object Parts & Classes</div>
            <p className="text-[11px] text-slate-400">Eyes, wheels, faces, semantic labels</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs text-indigo-300">
          <MathText text="\mathbf{a}^{(l)} = g\left(\mathbf{W}^{(l)}\mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}\right)" />
        </div>
        <p className="text-xs text-slate-400 text-center">
          Where <MathText text="l" /> denotes the layer index (superscript is a label, not an exponent), and <MathText text="\mathbf{a}^{(0)} \equiv \mathbf{x}" />.
        </p>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO 1: XOR Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive XOR Network Explorer</h3>
          </div>
          <span className="text-xs text-slate-400">
            Real-Time Forward Pass Simulation
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Toggle the two binary inputs <MathText text="x_1" /> and <MathText text="x_2" /> to inspect how the hidden OR and AND neurons
          process the inputs and combine to produce the correct non-linear XOR prediction:
        </p>

        {/* Input Selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Input <MathText text="x_1" /></span>
              <span className="font-mono text-indigo-400">{xorX1}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setXorX1(0)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  xorX1 === 0 ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setXorX1(1)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  xorX1 === 1 ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                1
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Input <MathText text="x_2" /></span>
              <span className="font-mono text-indigo-400">{xorX2}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setXorX2(0)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  xorX2 === 0 ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setXorX2(1)}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  xorX2 === 1 ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                1
              </button>
            </div>
          </div>
        </div>

        {/* Live Network Architecture Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-b border-slate-800 pb-2">
            <span>Input Layer (<MathText text="\mathbf{x}" />)</span>
            <span>Hidden Layer (<MathText text="\mathbf{h}" />)</span>
            <span>Output Layer (<MathText text="\hat{y}" />)</span>
          </div>

          <div className="grid grid-cols-3 gap-3 items-center text-center">
            {/* Input Nodes */}
            <div className="space-y-3">
              <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                xorX1 === 1 ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="text-[10px] uppercase text-slate-400">Node x₁</div>
                <div className="text-lg font-bold">{xorX1}</div>
              </div>
              <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                xorX2 === 1 ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="text-[10px] uppercase text-slate-400">Node x₂</div>
                <div className="text-lg font-bold">{xorX2}</div>
              </div>
            </div>

            {/* Hidden Nodes */}
            <div className="space-y-3">
              <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                h1 === 1 ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="text-[10px] uppercase text-slate-400">OR Neuron (h₁)</div>
                <div className="text-sm font-bold">z₁ = {z1.toFixed(1)}</div>
                <div className="text-xs font-semibold">h₁ = {h1}</div>
              </div>
              <div className={`p-3 rounded-xl border font-mono text-xs transition-all ${
                h2 === 1 ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                <div className="text-[10px] uppercase text-slate-400">AND Neuron (h₂)</div>
                <div className="text-sm font-bold">z₂ = {z2.toFixed(1)}</div>
                <div className="text-xs font-semibold">h₂ = {h2}</div>
              </div>
            </div>

            {/* Output Node */}
            <div className="space-y-3">
              <div className={`p-4 rounded-xl border font-mono text-xs transition-all ${
                yPred === 1 ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md' : 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-md'
              }`}>
                <div className="text-[10px] uppercase text-slate-400">Output XOR (ŷ)</div>
                <div className="text-sm font-bold">z_out = {zOut.toFixed(1)}</div>
                <div className="text-2xl font-bold mt-1">ŷ = {yPred}</div>
                <div className="text-[11px] mt-1 text-slate-400">
                  Target = <span className="font-bold text-white">{yExpected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Step Calculation Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
          <div>
            <span className="text-indigo-400 font-bold">1. Hidden OR: </span>
            <span>z₁ = ({xorX1}) + ({xorX2}) - 0.5 = <strong>{z1.toFixed(1)}</strong> &rarr; h₁ = <strong>{h1}</strong></span>
          </div>
          <div>
            <span className="text-purple-400 font-bold">2. Hidden AND: </span>
            <span>z₂ = ({xorX1}) + ({xorX2}) - 1.5 = <strong>{z2.toFixed(1)}</strong> &rarr; h₂ = <strong>{h2}</strong></span>
          </div>
          <div>
            <span className="text-emerald-400 font-bold">3. Output XOR: </span>
            <span>z_out = ({h1}) - 2({h2}) - 0.5 = <strong>{zOut.toFixed(1)}</strong> &rarr; </span>
            <span className={yPred === 1 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              XOR({xorX1}, {xorX2}) = {yPred}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-sans">
            <span className="text-slate-400">Classification Status:</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Perfect match with Boolean Truth Table</span>
            </span>
          </div>
        </div>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO 2: Activation Function Explorer */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Activation Function Playground</h3>
          </div>
          <span className="text-xs text-slate-400">
            Comparing Linear, ReLU, and Sigmoid Transformations
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Slide the raw linear score <MathText text="z" /> across negative and positive regimes to examine how each
          activation function warps, truncates, or squashes the incoming signal:
        </p>

        {/* Slider */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Incoming Pre-activation Score <MathText text="z" />:</span>
            <span className="font-mono text-sm text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {actZ.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.1"
            value={actZ}
            onChange={(e) => setActZ(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>-6.0 (Strongly Negative)</span>
            <span>0.0 (Origin)</span>
            <span>+6.0 (Strongly Positive)</span>
          </div>
        </div>

        {/* 3 Function Output Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Identity / Linear */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300">Linear / Identity</span>
              <span className="font-mono text-slate-400 text-[10px]">g(z) = z</span>
            </div>
            <div className="font-mono text-xl font-bold text-slate-200">
              {linearVal.toFixed(2)}
            </div>
            <p className="text-slate-400 text-[11px]">
              No saturation or thresholding. Stacking purely linear units collapses to a single matrix multiplication.
            </p>
          </div>

          {/* ReLU */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300">ReLU</span>
              <span className="font-mono text-indigo-400 text-[10px]">max(0, z)</span>
            </div>
            <div className="font-mono text-xl font-bold text-indigo-300">
              {reluVal.toFixed(2)}
            </div>
            <p className="text-slate-400 text-[11px]">
              {actZ <= 0
                ? 'Dead/Deactivated: Output clipped to exactly 0.00 for all negative scores.'
                : 'Active: Passes positive linear score through with constant gradient = 1.'}
            </p>
          </div>

          {/* Sigmoid */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">Sigmoid</span>
              <span className="font-mono text-emerald-400 text-[10px]">1 / (1 + e^-z)</span>
            </div>
            <div className="font-mono text-xl font-bold text-emerald-300">
              {sigmoidVal.toFixed(4)}
            </div>
            <p className="text-slate-400 text-[11px]">
              {actZ > 3
                ? 'Saturates near +1.0: Gradient vanishes, leading to slow gradient descent learning.'
                : actZ < -3
                ? 'Saturates near 0.0: Gradient approaches zero.'
                : 'Steep transition region: High sensitivity to input variations.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
