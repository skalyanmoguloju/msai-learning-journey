import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Layers,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Scale,
  BookOpen,
  Play,
  Calculator,
  Activity,
  Target
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module5TrainingMultilayerNN: React.FC = () => {
  // Playground 1: 1D Gradient Descent Simulator State
  // Loss function: E(theta) = (theta - 3)^2, dE/dtheta = 2*(theta - 3)
  const [theta, setTheta] = useState<number>(0.0);
  const [alpha, setAlpha] = useState<number>(0.15);
  const [stepHistory, setStepHistory] = useState<number[]>([0.0]);

  const currentLoss = Math.pow(theta - 3, 2);
  const currentGrad = 2 * (theta - 3);
  const stepDelta = -alpha * currentGrad;
  const nextTheta = theta + stepDelta;
  const nextLoss = Math.pow(nextTheta - 3, 2);

  const applySingleStep = () => {
    const clampedNext = Math.max(-2, Math.min(8, nextTheta));
    setTheta(clampedNext);
    setStepHistory((prev) => [...prev.slice(-9), clampedNext]);
  };

  const resetSimulation = () => {
    setTheta(0.0);
    setStepHistory([0.0]);
  };

  // Playground 2: Squared Loss & Batch Calculator State
  const [sampleY, setSampleY] = useState<number>(8);
  const [samplePred, setSamplePred] = useState<number>(5);

  const errorResidual = sampleY - samplePred;
  const squaredLossVal = Math.pow(errorResidual, 2);

  // Batch sample dataset
  const batchExamples = [
    { id: 1, y: 5, pred: 4 },
    { id: 2, y: 10, pred: 12 },
    { id: 3, y: 3, pred: 3 },
    { id: 4, y: 8, pred: 6 }
  ];
  const batchTotalError = batchExamples.reduce((acc, ex) => acc + Math.pow(ex.y - ex.pred, 2), 0);
  const batchMSE = batchTotalError / batchExamples.length;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Understand how multilayer neural networks quantify prediction error through loss functions, aggregate empirical risk across training datasets, track high-dimensional parameter spaces, and iteratively navigate loss surfaces via gradient descent.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The core intuition:</strong> Training is an optimization process. The loss function creates a landscape; the gradient vector tells you which way is steepest uphill; and gradient descent repeatedly steps downhill to find weights and biases that minimize error.
        </div>
      </div>

      {/* What Does Training Mean? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Core Philosophy
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">What Does Training Mean?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          At its essence, <strong className="text-slate-100">training</strong> is the mathematical search for a set
          of weights and biases that minimizes the discrepancy between network predictions and true ground-truth targets:
        </p>

        {/* 4-Step Pipeline Flow */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs font-mono text-slate-300 space-y-2">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300">
              Input <MathText text="\mathbf{x}" />
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-indigo-300">
              Prediction <MathText text="\hat{y} = f_\theta(\mathbf{x})" />
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300">
              Compare with Truth <MathText text="y" />
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
              Update Parameters <MathText text="\theta" />
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          All learnable weights and biases across every layer of the network are collectively denoted by the parameter vector <MathText text="\theta" />:
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center font-mono text-xs text-indigo-300">
          <MathText text="\theta = \left\{ \mathbf{W}^{(1)}, \mathbf{b}^{(1)}, \mathbf{W}^{(2)}, \mathbf{b}^{(2)}, \dots, \mathbf{W}^{(L)}, \mathbf{b}^{(L)} \right\}" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The network output is parameterized as <MathText text="\hat{y} = f_\theta(\mathbf{x})" />. The subscript <MathText text="\theta" /> emphasizes
          that predictions are completely determined by current weights and biases. Adjusting <MathText text="\theta" /> reshapes
          the input-output mapping function.
        </p>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
          <Target className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300">Fundamental Optimization Objective:</strong> Find the optimal parameter
            configuration <MathText text="\theta^*" /> that minimizes the cumulative loss function across the entire training dataset:
            <span className="font-mono block text-center mt-1 text-white text-xs">
              <MathText text="\theta^* = \arg\min_\theta \mathcal{L}(\theta)" />
            </span>
          </p>
        </div>
      </div>

      {/* What is a Loss Function? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Error Metric
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">What is a Loss Function?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A <strong className="text-slate-100">loss function</strong> converts the qualitative mistake made by the network
          on an observation into a single scalar real number:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-amber-300">
          <MathText text="\text{Loss} = \mathcal{L}(y, \hat{y}) \quad \longrightarrow \quad \text{Quantitative measure of prediction penalty}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Numerical Example (Mistake)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose the true ground truth is <MathText text="y = 10" /> and the model predicts <MathText text="\hat{y} = 7" />:
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-rose-400 text-center">
              <MathText text="L = (y - \hat{y})^2 = (10 - 7)^2 = 3^2 = 9" />
            </div>
            <p className="text-[11px] text-slate-400">
              The model pays a penalty of 9 units for its residual deviation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Numerical Example (Zero Loss)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              When the prediction perfectly matches reality (<MathText text="y = 10" /> and <MathText text="\hat{y} = 10" />):
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400 text-center">
              <MathText text="L = (y - \hat{y})^2 = (10 - 10)^2 = 0^2 = 0" />
            </div>
            <p className="text-[11px] text-slate-400">
              Zero prediction error yields zero loss penalty.
            </p>
          </div>
        </div>
      </div>

      {/* Squared-Error Loss */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Formulation & Notation
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Squared-Error Loss & Cumulative Dataset Error</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          For an individual training instance <MathText text="i" />, the squared-error loss is:
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="L_i = (y_i - \hat{y}_i)^2 = \left(y_i - f_\mathbf{w}(\mathbf{x}_i)\right)^2" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Aggregated across the full training dataset of <MathText text="N" /> observations, the total empirical error is defined as:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-emerald-300">
          <MathText text="E(\mathbf{w}) = \sum_{j=1}^N \left(y_j - f_\mathbf{w}(\mathbf{x}_j)\right)^2" />
        </div>

        {/* Notation Guide Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2 w-1/4">Symbol</th>
                <th className="pb-2 w-1/3">Mathematical Role</th>
                <th className="pb-2 w-5/12">Conceptual Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-mono text-indigo-300 font-bold">N</td>
                <td className="py-2.5 text-slate-300">Dataset Cardinality</td>
                <td className="py-2.5 text-slate-400">Total number of training examples available for learning.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-indigo-300 font-bold">y_j</td>
                <td className="py-2.5 text-slate-300">Ground-Truth Target</td>
                <td className="py-2.5 text-slate-400">The true supervisory label or target value for observation <MathText text="j" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-indigo-300 font-bold"><MathText text="f_\mathbf{w}(\mathbf{x}_j)" /></td>
                <td className="py-2.5 text-slate-300">Model Hypothesis</td>
                <td className="py-2.5 text-slate-400">Prediction computed by the network parameterized by weights <MathText text="\mathbf{w}" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-indigo-300 font-bold"><MathText text="\sum_{j=1}^N" /></td>
                <td className="py-2.5 text-slate-300">Summation Operator</td>
                <td className="py-2.5 text-slate-400">Accumulates the non-negative squared penalties across all samples.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-indigo-300">Why Square the Residuals?</strong> Squaring guarantees two critical mathematical properties:
            (1) It eliminates directional cancellation between positive (<MathText text="y > \hat{y}" />) and negative (<MathText text="y < \hat{y}" />) residuals; and
            (2) It quadratically penalizes severe outliers, forcing optimization to prioritize large mistakes over minor noise.
          </p>
        </div>
      </div>

      {/* From One-Example Loss to Total Error */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Batch Aggregation
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">From Single-Example Loss to Total & Mean Squared Error</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Consider a concrete toy dataset of <MathText text="N = 4" /> training samples evaluated on current network weights:
        </p>

        {/* 4-Sample Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2">Sample ID</th>
                <th className="pb-2">True Target <MathText text="y" /></th>
                <th className="pb-2">Prediction <MathText text="\hat{y}" /></th>
                <th className="pb-2">Residual <MathText text="e = y - \hat{y}" /></th>
                <th className="pb-2">Squared Loss <MathText text="e^2" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {batchExamples.map((ex) => {
                const diff = ex.y - ex.pred;
                const sq = diff * diff;
                return (
                  <tr key={ex.id}>
                    <td className="py-2 font-mono text-slate-400">Sample {ex.id}</td>
                    <td className="py-2 font-mono">{ex.y}</td>
                    <td className="py-2 font-mono">{ex.pred}</td>
                    <td className="py-2 font-mono">{diff > 0 ? `+${diff}` : diff}</td>
                    <td className="py-2 font-mono font-bold text-indigo-300">{sq}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sum vs MSE Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">Total Sum of Squared Errors:</span>
            <div className="font-mono text-lg font-bold text-indigo-300">
              <MathText text="E = 1 + 4 + 0 + 4 = 9.0" />
            </div>
            <p className="text-slate-400 text-[11px]">
              Scales linearly with dataset size <MathText text="N" />.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 font-bold uppercase tracking-wider block">Mean Squared Error (MSE):</span>
            <div className="font-mono text-lg font-bold text-emerald-300">
              <MathText text="\text{MSE} = \frac{1}{N}\sum (y_i - \hat{y}_i)^2 = \frac{9}{4} = 2.25" />
            </div>
            <p className="text-slate-400 text-[11px]">
              Invariance to sample count; shares identical optimal parameters <MathText text="\theta^*" />.
            </p>
          </div>
        </div>
      </div>

      {/* Network Parameters Accounting */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Dimensionality
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Accounting for Network Parameters</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Every synapse connecting two neurons has an associated scalar weight <MathText text="w_{ij}" />, and each receiving
          neuron possesses a scalar bias <MathText text="b_j" />.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Consider an architecture with <strong className="text-indigo-300">3 input features</strong>, a hidden layer of <strong className="text-indigo-300">4 neurons</strong>,
          and a single <strong className="text-indigo-300">1 output neuron</strong>:
        </p>

        {/* Parameter Tally Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2">Inter-Layer Synapse</th>
                <th className="pb-2">Weight Dimensions</th>
                <th className="pb-2">Bias Dimensions</th>
                <th className="pb-2">Subtotal Parameters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-semibold text-slate-200">Input Layer &rarr; Hidden Layer</td>
                <td className="py-2.5 font-mono">3 × 4 = 12 weights</td>
                <td className="py-2.5 font-mono">4 biases</td>
                <td className="py-2.5 font-mono text-indigo-300 font-bold">16</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-200">Hidden Layer &rarr; Output Layer</td>
                <td className="py-2.5 font-mono">4 × 1 = 4 weights</td>
                <td className="py-2.5 font-mono">1 bias</td>
                <td className="py-2.5 font-mono text-indigo-300 font-bold">5</td>
              </tr>
              <tr className="bg-slate-950/40">
                <td className="py-2.5 font-bold text-emerald-400">Total Network Parameter Space</td>
                <td className="py-2.5 font-mono text-emerald-400 font-bold">16 weights</td>
                <td className="py-2.5 font-mono text-emerald-400 font-bold">5 biases</td>
                <td className="py-2.5 font-mono text-emerald-400 font-bold text-sm">21 parameters</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          The loss function <MathText text="E(\theta)" /> defines a 21-dimensional non-convex optimization surface.
          Gradient descent navigates this high-dimensional landscape simultaneously across all 21 dimensions.
        </p>
      </div>

      {/* Gradient Descent */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Optimization Engine
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Gradient Descent</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-emerald-400">Gradient descent</strong> is the core optimization algorithm in deep learning.
          It iteratively adjusts parameters in the direction of steepest loss reduction:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-emerald-300">
          <MathText text="\theta \longleftarrow \theta - \alpha \nabla_\theta E(\theta)" />
        </div>

        {/* Vector breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-indigo-400 font-bold font-mono text-sm block">\theta</span>
            <span className="text-slate-300 font-semibold block">Current Parameters</span>
            <p className="text-slate-400 text-[11px]">The prevailing coordinates in parameter space.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-rose-400 font-bold font-mono text-sm block">\nabla_\theta E</span>
            <span className="text-slate-300 font-semibold block">Gradient Vector</span>
            <p className="text-slate-400 text-[11px]">Points in the direction of steepest loss increase (uphill).</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold font-mono text-sm block">\alpha</span>
            <span className="text-slate-300 font-semibold block">Learning Rate</span>
            <p className="text-slate-400 text-[11px]">Positive scalar controlling the physical step size.</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold font-mono text-sm block">-</span>
            <span className="text-slate-300 font-semibold block">Negative Sign</span>
            <p className="text-slate-400 text-[11px]">Reverses direction to descend downhill toward lower loss.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300">Geometric Compass Analogy:</strong> The multi-variable gradient <MathText text="\nabla_\theta E" /> acts
            as a physical compass pointing directly uphill on the loss terrain. Subtracting the gradient steps down
            the slope into valleys of reduced error.
          </p>
        </div>
      </div>

      {/* The Complete Training Loop */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            End-to-End Workflow
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">The Complete Training Loop</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Training an artificial neural network consists of repeating a five-stage iterative cycle across multiple epochs:
        </p>

        {/* 5 Stage Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="w-6 h-6 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">1</span>
            <div className="font-bold text-slate-200">Initialize</div>
            <p className="text-[11px] text-slate-400">Small random weights & zero biases</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="w-6 h-6 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">2</span>
            <div className="font-bold text-slate-200">Forward Pass</div>
            <p className="text-[11px] text-slate-400">Compute layer activations & prediction <MathText text="\hat{y}" /></p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="w-6 h-6 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">3</span>
            <div className="font-bold text-slate-200">Compute Loss</div>
            <p className="text-[11px] text-slate-400">Measure error penalty <MathText text="E(\theta)" /></p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="w-6 h-6 mx-auto rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">4</span>
            <div className="font-bold text-slate-200">Gradients</div>
            <p className="text-[11px] text-slate-400">Backpropagation calculates <MathText text="\nabla_\theta E" /></p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="w-6 h-6 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">5</span>
            <div className="font-bold text-emerald-300">Update</div>
            <p className="text-[11px] text-slate-400">Step parameters: <MathText text="\theta \leftarrow \theta - \alpha\nabla E" /></p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Learning Rate Sensitivity Diagnostics</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
            <div>
              <strong className="text-amber-400 block mb-0.5">Too Small (<MathText text="\alpha \ll 1" />):</strong>
              Optimization creeps at an agonizingly slow pace, wasting computing cycles and getting trapped on flat saddle points or local plateaus.
            </div>
            <div>
              <strong className="text-rose-400 block mb-0.5">Too Large (<MathText text="\alpha \gg 1" />):</strong>
              Steps overshoot the valley floor, causing erratic oscillations or exponential numerical divergence (<code className="text-rose-300">NaN</code> loss).
            </div>
          </div>
        </div>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO 1: Gradient Descent Step Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive 1D Gradient Descent Simulator</h3>
          </div>
          <span className="text-xs text-slate-400">
            Parabolic Objective: <MathText text="E(\theta) = (\theta - 3)^2" />
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Observe how gradient descent iteratively shifts parameter <MathText text="\theta" /> toward the analytical minimum at <MathText text="\theta^* = 3.0" />.
          Adjust <MathText text="\theta" /> and learning rate <MathText text="\alpha" />, or click <strong>Apply Step</strong> to descend the bowl step-by-step:
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Current Parameter <MathText text="\theta" />:</span>
              <span className="font-mono text-sm text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {theta.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="-2"
              max="8"
              step="0.1"
              value={theta}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setTheta(val);
                setStepHistory([val]);
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>-2.0</span>
              <span>Optimal: 3.0</span>
              <span>+8.0</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Learning Rate <MathText text="\alpha" />:</span>
              <span className="font-mono text-sm text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {alpha.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.80"
              step="0.01"
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>0.01 (Cautious)</span>
              <span>0.15 (Balanced)</span>
              <span>0.80 (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Real-time Math Output Card */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2 border-b border-slate-800">
            <div>
              <span className="text-slate-400 block text-[11px]">1. Current Loss:</span>
              <span className="text-base font-bold text-indigo-300">
                E({theta.toFixed(2)}) = ({theta.toFixed(2)} - 3)² = <strong>{currentLoss.toFixed(4)}</strong>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">2. Derivative / Gradient:</span>
              <span className={`text-base font-bold ${currentGrad >= 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
                dE/dθ = 2({theta.toFixed(2)} - 3) = <strong>{currentGrad.toFixed(4)}</strong>
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="text-slate-200">
              <span className="text-emerald-400 font-bold">3. Gradient Descent Step: </span>
              <span>
                θ_new = {theta.toFixed(2)} - ({alpha.toFixed(2)})({currentGrad.toFixed(4)}) ={' '}
                <strong className="text-emerald-300 text-sm">{nextTheta.toFixed(4)}</strong>
              </span>
            </div>
            <div className="text-slate-400">
              <span>4. Projected New Loss: </span>
              <span className="font-bold text-slate-200">E({nextTheta.toFixed(3)}) = {nextLoss.toFixed(4)}</span>{' '}
              <span className="text-emerald-400">
                ({nextLoss < currentLoss ? `Δ = -${(currentLoss - nextLoss).toFixed(4)} reduction` : 'Loss increased!'})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2 font-sans">
            <button
              type="button"
              onClick={applySingleStep}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 text-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Apply Step (θ &larr; {nextTheta.toFixed(3)})</span>
            </button>
            <button
              type="button"
              onClick={resetSimulation}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to θ = 0.0</span>
            </button>
            <span className="text-[11px] text-slate-400 ml-auto">
              Trajectory: {stepHistory.map((h) => h.toFixed(2)).join(' → ')}
            </span>
          </div>
        </div>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO 2: Squared Loss Calculator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Calculator className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-100">Live Squared Loss Calculator</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Test different combinations of true values <MathText text="y" /> and model predictions <MathText text="\hat{y}" /> to
          observe how errors scale quadratically:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Ground Truth Target <MathText text="y" />:</span>
              <span className="font-mono text-sm text-indigo-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                {sampleY}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={sampleY}
              onChange={(e) => setSampleY(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>-10</span>
              <span>0</span>
              <span>+10</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Model Prediction <MathText text="\hat{y}" />:</span>
              <span className="font-mono text-sm text-purple-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                {samplePred}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="1"
              value={samplePred}
              onChange={(e) => setSamplePred(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>-10</span>
              <span>0</span>
              <span>+10</span>
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-slate-400">
              Linear Residual Error: <MathText text="e = y - \hat{y}" /> = {sampleY} - ({samplePred}) ={' '}
              <strong className="text-amber-300">{errorResidual}</strong>
            </div>
            <div className="text-slate-400">
              Squared Error Penalty: <MathText text="L = (y - \hat{y})^2" /> = ({errorResidual})² ={' '}
              <strong className="text-indigo-300 text-sm">{squaredLossVal}</strong>
            </div>
          </div>

          <div className="font-sans text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              squaredLossVal === 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300'
            }`}>
              {squaredLossVal === 0 ? 'Zero Loss (Optimal)' : `Penalty = ${squaredLossVal} units`}
            </span>
          </div>
        </div>
      </div>

      {/* Key Technical Glossary */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-100">Key Technical Glossary</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Term</th>
                <th className="pb-2.5 w-3/4">Architectural Definition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Parameter (θ)</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Any learnable internal scalar quantity (weight or bias) whose numerical value is directly modified by gradient descent updates.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Loss Function (L)</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A mathematical criterion that evaluates the discrepancy between a single model prediction <MathText text="\hat{y}" /> and ground truth <MathText text="y" />.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Gradient (∇)</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  The multi-variable vector of partial derivatives pointing in the direction of maximum instantaneous rate of loss increase.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Learning Rate (α)</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  The scalar hyperparameter regulating the step size taken along the negative gradient vector during each parameter update.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Epoch</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  One complete chronological traversal through every individual training observation in the dataset.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Gradient Descent</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  An iterative first-order optimization algorithm that adjusts parameters in the negative gradient direction to reach local/global error minima.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
