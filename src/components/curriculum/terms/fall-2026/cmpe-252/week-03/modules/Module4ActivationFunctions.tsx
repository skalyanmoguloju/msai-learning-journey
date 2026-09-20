import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Sliders,
  BookOpen,
  ArrowRight,
  TrendingDown,
  Layers,
  Scale,
  RotateCcw
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module4ActivationFunctions: React.FC = () => {
  // Interactive Playground State
  const [scoreZ, setScoreZ] = useState<number>(0.0);

  // Compute Activations
  const sigmoidVal = 1 / (1 + Math.exp(-scoreZ));
  const sigmoidDeriv = sigmoidVal * (1 - sigmoidVal);

  const tanhVal = Math.tanh(scoreZ);
  const tanhDeriv = 1 - tanhVal * tanhVal;

  const reluVal = Math.max(0, scoreZ);
  const reluDeriv = scoreZ > 0 ? 1 : scoreZ < 0 ? 0 : 0.5; // subgradient at 0

  const leakyAlpha = 0.01;
  const leakyVal = scoreZ >= 0 ? scoreZ : leakyAlpha * scoreZ;
  const leakyDeriv = scoreZ >= 0 ? 1 : leakyAlpha;

  // Numerically stable softplus: log(1 + exp(-|z|)) + max(z, 0)
  const softplusVal = Math.log1p(Math.exp(-Math.abs(scoreZ))) + Math.max(scoreZ, 0);
  const softplusDeriv = sigmoidVal;

  const eluAlpha = 1.0;
  const eluVal = scoreZ >= 0 ? scoreZ : eluAlpha * (Math.exp(scoreZ) - 1);
  const eluDeriv = scoreZ >= 0 ? 1 : eluVal + eluAlpha;

  // Jump presets
  const jumpPreset = (val: number) => {
    setScoreZ(val);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Header / Learning Goal */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Machine Learning · Lecture 3 · Module 4
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Non-Linearity & Gradient Dynamics
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2.5">
          <Activity className="w-6 h-6 text-indigo-400 shrink-0" />
          <span>Activation Functions</span>
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          Discover how activation functions introduce essential non-linear transformations into artificial neurons.
          Master the mathematical properties, derivative dynamics, saturation risks, and gradient propagation
          characteristics of Sigmoid, Tanh, ReLU, Leaky ReLU, Softplus, and ELU.
        </p>
      </div>

      {/* Why Activation Functions Are Needed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Foundational Role
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Why Activation Functions Are Needed</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Every artificial neuron operates as a sequential two-stage processing engine:
        </p>

        {/* 2-Stage Pipeline Box */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-slate-200 space-y-2">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              Stage 1: <MathText text="z = \mathbf{w}^T \mathbf{x} + b" />
            </span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
              Stage 2: <MathText text="a = g(z)" />
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans pt-1">
            Affine linear combination followed by scalar non-linear squashing or gating.
          </p>
        </div>

        {/* Notation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2 w-1/4">Symbol</th>
                <th className="pb-2 w-1/3">Technical Name</th>
                <th className="pb-2 w-5/12">Role & Domain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-mono text-indigo-300 font-bold">z</td>
                <td className="py-2.5 font-semibold text-slate-200">Pre-activation / Score</td>
                <td className="py-2.5 text-slate-400">The raw weighted sum of inputs plus bias (<MathText text="z \in (-\infty, +\infty)" />).</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-emerald-300 font-bold">g(·)</td>
                <td className="py-2.5 font-semibold text-slate-200">Activation Function</td>
                <td className="py-2.5 text-slate-400">Non-linear mapping applied elementwise to the pre-activation vector.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-purple-300 font-bold">a</td>
                <td className="py-2.5 font-semibold text-slate-200">Post-activation / Output</td>
                <td className="py-2.5 text-slate-400">The transformed signal forwarded as input to the subsequent layer.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300">Crucial Distinction:</strong> Never confuse the pre-activation score <MathText text="z" /> with
            the final activation output <MathText text="a" />. For instance, in a ReLU neuron with score <MathText text="z = -4.0" />,
            the neuron output is strictly <MathText text="a = \text{ReLU}(-4.0) = 0.0" />.
          </p>
        </div>
      </div>

      {/* Sigmoid Activation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Classic Probabilistic Unit
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Sigmoid (Logistic Function)</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The sigmoid function smoothly maps any real-valued number from <MathText text="(-\infty, +\infty)" /> into
          a strictly bounded range of <MathText text="(0, 1)" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\sigma(z) = \frac{1}{1 + e^{-z}} = \frac{e^z}{1 + e^z}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Characteristic Values
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-1.5 font-mono">z</th>
                    <th className="pb-1.5 font-mono">σ(z)</th>
                    <th className="pb-1.5">Probabilistic Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-1.5 font-mono">-2.0</td>
                    <td className="py-1.5 font-mono text-rose-400">≈ 0.119</td>
                    <td className="py-1.5 text-slate-400">Low confidence for Class 1</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-mono">0.0</td>
                    <td className="py-1.5 font-mono text-amber-400">0.500</td>
                    <td className="py-1.5 text-slate-400">Neutral decision threshold</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-mono">+2.0</td>
                    <td className="py-1.5 font-mono text-emerald-400">≈ 0.881</td>
                    <td className="py-1.5 text-slate-400">High confidence for Class 1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Primary Use: Binary Classification Outputs</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Because its outputs are constrained to <MathText text="(0, 1)" />, sigmoid naturally models the posterior class probability:
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 text-center">
              <MathText text="P(y=1 \mid \mathbf{x}) = \sigma(\mathbf{w}^T \mathbf{x} + b)" />
            </div>
            <p className="text-[11px] text-slate-400">
              Applying a standard threshold at <MathText text="\sigma(z) \ge 0.5" /> corresponds to the linear decision boundary <MathText text="z \ge 0" />.
            </p>
          </div>
        </div>
      </div>

      {/* Sigmoid Saturation and Vanishing Gradients */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
            Training Bottleneck
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Sigmoid Saturation & Vanishing Gradients</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          While mathematically elegant, sigmoid poses severe difficulties when used inside the hidden layers of deep networks.
          At large positive or negative values of <MathText text="z" />, the sigmoid curve becomes almost horizontal (saturated):
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs text-rose-300">
          <MathText text="\sigma(-10) \approx 0.000045 \approx 0, \qquad \sigma(+10) \approx 0.999955 \approx 1" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The first derivative of the sigmoid function possesses an analytical form expressed purely in terms of its output:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-purple-300">
          <MathText text="\sigma'(z) = \frac{d\sigma}{dz} = \sigma(z)\bigl(1 - \sigma(z)\bigr)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Maximum Derivative Bound
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The derivative reaches its absolute global maximum at <MathText text="z = 0" /> (where <MathText text="\sigma(0) = 0.5" />):
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 text-center">
              <MathText text="\sigma'(0) = 0.5 \times (1 - 0.5) = 0.25" />
            </div>
            <p className="text-xs text-slate-400">
              For all other values of <MathText text="z" />, <MathText text="\sigma'(z) < 0.25" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <span>The Vanishing Gradient Catastrophe</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              During backpropagation through an <MathText text="L" />-layer network, the error gradient is computed by repeated multiplications
              via the chain rule:
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-rose-300 text-center">
              <MathText text="\frac{\partial \mathcal{L}}{\partial \mathbf{w}^{(1)}} \propto \prod_{l=1}^L \sigma'\left(z^{(l)}\right) \le (0.25)^L" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In a network of only 6 hidden layers, <MathText text="(0.25)^6 \approx 0.00024" />! Gradients shrink exponentially toward zero,
              leaving early layer weights virtually frozen and unable to learn.
            </p>
          </div>
        </div>
      </div>

      {/* Rectified Linear Unit (ReLU) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Modern Deep Learning Standard
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Rectified Linear Unit (ReLU)</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong className="text-emerald-400">Rectified Linear Unit (ReLU)</strong> is the default activation function for hidden
          layers in modern deep neural networks. It acts as a one-sided linear diode:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="\text{ReLU}(z) = \max(0, z) = \begin{cases} z & \text{if } z \ge 0 \\ 0 & \text{if } z < 0 \end{cases}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 block">1. Non-Saturating Gradient</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              For any positive score <MathText text="z > 0" />, the derivative is strictly <MathText text="\frac{d}{dz}\text{ReLU}(z) = 1.0" />.
              Gradients flow back through arbitrarily deep stacks without exponential attenuation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-indigo-400 block">2. Computational Efficiency</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Requires no expensive transcendentals (no <MathText text="e^z" />, logarithms, or divisions). It compiles into a single
              hardware branch or conditional move instruction: <code className="text-indigo-300 font-mono text-[11px]">z &gt; 0 ? z : 0</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-purple-400 block">3. Induces Sparse Activations</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Only a fraction of neurons fire (<MathText text="a > 0" />) for any given input, generating compact, sparse internal
              representations akin to biological cortical networks.
            </p>
          </div>
        </div>
      </div>

      {/* The Dying ReLU Problem & Leaky ReLU */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Pathology & Solution
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">The Dying ReLU Problem & Leaky ReLU</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          While ReLU avoids positive saturation, its zero response on negative scores creates a specific failure mode:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs text-amber-300">
          <MathText text="\text{For } z < 0: \quad \text{ReLU}(z) = 0 \quad \text{and} \quad \frac{d}{dz}\text{ReLU}(z) = 0" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          If a large gradient update knocks a neuron’s weights into a regime where its pre-activation <MathText text="z" /> is negative
          across the entire training dataset, the neuron will permanently output zero and receive zero gradient forever.
          It effectively <strong className="text-rose-400">“dies”</strong> and can never recover.
        </p>

        {/* Leaky ReLU Solution */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              The Remedy: Leaky ReLU
            </h4>
            <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
              α ≈ 0.01
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Leaky ReLU replaces the zero-slope floor with a slight negative slope <MathText text="\alpha" /> (typically 0.01):
          </p>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-indigo-300">
            <MathText text="\text{LeakyReLU}(z) = \max(\alpha z, z) = \begin{cases} z & \text{if } z \ge 0 \\ \alpha z & \text{if } z < 0 \end{cases}" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Because its negative derivative is <MathText text="\alpha > 0" />, a small error signal always trickles back, allowing
            silenced neurons to eventually adjust their weights and wake up.
          </p>
        </div>
      </div>

      {/* Hyperbolic Tangent (Tanh) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Zero-Centered Architecture
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Hyperbolic Tangent (Tanh)</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong className="text-indigo-300">Tanh</strong> function is a rescaled, shifted version of the logistic sigmoid, mapping
          scores to the interval <MathText text="(-1, +1)" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\sigma(2z) - 1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Zero-Centered Advantage
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike sigmoid (whose outputs are strictly positive <MathText text="\in (0, 1)" />), tanh outputs both negative and positive
              activations centered symmetrically at 0.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              This prevents the “zig-zagging” dynamics during gradient descent where all incoming weight updates share the same sign.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              Derivative & Saturation
            </h4>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-purple-300 text-center">
              <MathText text="\tanh'(z) = 1 - \tanh^2(z)" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Peak derivative occurs at <MathText text="z = 0" /> with value <MathText text="\tanh'(0) = 1.0" /> (4× higher than sigmoid’s peak 0.25).
              However, tanh still saturates as <MathText text="|z| \to \infty" />, producing vanishing gradients in deep layers.
            </p>
          </div>
        </div>
      </div>

      {/* Smooth Variations: Softplus and ELU */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Smooth Rectifiers
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Softplus & Exponential Linear Unit (ELU)</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          To combine the non-saturating benefits of ReLU with smooth differentiability, researchers developed two prominent alternatives:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Softplus */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Softplus</h4>
              <span className="text-[10px] text-slate-400 font-mono">Smooth ReLU</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 text-center">
              <MathText text="\text{Softplus}(z) = \ln(1 + e^z)" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A smooth, everywhere-differentiable approximation of <MathText text="\max(0, z)" />. Its derivative is precisely the logistic sigmoid:
            </p>
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 font-mono text-xs text-emerald-300 text-center">
              <MathText text="\frac{d}{dz}\text{Softplus}(z) = \frac{e^z}{1 + e^z} = \sigma(z)" />
            </div>
          </div>

          {/* ELU */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">ELU</h4>
              <span className="text-[10px] text-slate-400 font-mono">Exponential Linear</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 text-center">
              <MathText text="\text{ELU}(z) = \begin{cases} z & \text{if } z > 0 \\ \alpha(e^z - 1) & \text{if } z \le 0 \end{cases}" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Behaves linearly for <MathText text="z > 0" />, but features smooth exponential saturation to <MathText text="-\alpha" /> for negative inputs.
              Brings the mean unit activation closer to zero, accelerating learning.
            </p>
          </div>
        </div>

        {/* Comparison Summary Table */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2">Function</th>
                <th className="pb-2">Negative Regime (<MathText text="z < 0" />)</th>
                <th className="pb-2">Positive Regime (<MathText text="z > 0" />)</th>
                <th className="pb-2">Primary Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold font-mono text-emerald-400">ReLU</td>
                <td className="py-2.5 font-mono text-rose-400">0</td>
                <td className="py-2.5 font-mono text-emerald-400">z</td>
                <td className="py-2.5 text-slate-400">Fast, constant unit gradient on positive side</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-indigo-400">Leaky ReLU</td>
                <td className="py-2.5 font-mono text-amber-400">αz (e.g. 0.01z)</td>
                <td className="py-2.5 font-mono text-emerald-400">z</td>
                <td className="py-2.5 text-slate-400">Completely immunizes neurons against dying</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-purple-400">Softplus</td>
                <td className="py-2.5 font-mono text-indigo-300">Smooth asymptote to 0</td>
                <td className="py-2.5 font-mono text-indigo-300">Smoothly follows z</td>
                <td className="py-2.5 text-slate-400">Smooth everywhere; derivative is sigmoid</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-cyan-400">ELU</td>
                <td className="py-2.5 font-mono text-cyan-300">α(e^z - 1)</td>
                <td className="py-2.5 font-mono text-emerald-400">z</td>
                <td className="py-2.5 text-slate-400">Zero-centered mean activation + noise robustness</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Clarification (Softmax vs. Softplus):</strong> Softplus operates on a single scalar
            score <MathText text="z" /> to produce a rectified smooth scalar activation. In contrast, <strong className="text-indigo-300">Softmax</strong> takes
            an entire vector of logits <MathText text="\mathbf{z} \in \mathbb{R}^K" /> and computes a normalized probability distribution where <MathText text="\sum_{k=1}^K p_k = 1" />.
          </p>
        </div>
      </div>

      {/* Choosing Activation Functions: Architectural Guidelines */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Design Playbook
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Choosing Activation Functions in Practice</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Selecting the appropriate activation function depends directly on the location of the layer within the network hierarchy:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Network Tier</th>
                <th className="pb-2.5 w-1/4">Recommended Choice</th>
                <th className="pb-2.5 w-1/2">Engineering Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 font-semibold text-slate-200">Hidden Layers</td>
                <td className="py-3 font-mono font-bold text-emerald-400">ReLU (or Leaky/ELU/GELU)</td>
                <td className="py-3 text-slate-400 leading-relaxed">
                  Fastest convergence, lowest computational overhead, resistant to vanishing gradients on deep backpropagation.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-200">Binary Output</td>
                <td className="py-3 font-mono font-bold text-indigo-400">Sigmoid (σ)</td>
                <td className="py-3 text-slate-400 leading-relaxed">
                  Produces a single calibrated probability score <MathText text="\hat{y} \in [0, 1]" /> for Bernoulli binary classification.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-200">Multiclass Output</td>
                <td className="py-3 font-mono font-bold text-purple-400">Softmax</td>
                <td className="py-3 text-slate-400 leading-relaxed">
                  Converts a vector of <MathText text="K" /> class logits into a normalized probability distribution summing to 1.
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-slate-200">Regression Output</td>
                <td className="py-3 font-mono font-bold text-cyan-400">Linear / Identity</td>
                <td className="py-3 text-slate-400 leading-relaxed">
                  No activation function (<MathText text="a = z" />), allowing the network to forecast unconstrained real numbers <MathText text="\in (-\infty, +\infty)" />.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO: Activation Playground */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive Activation & Derivative Playground</h3>
          </div>
          <span className="text-xs text-slate-400">
            Real-Time Mathematical Comparison
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Move the pre-activation score <MathText text="z" /> across the range <MathText text="[-8.0, +8.0]" /> to observe how each function
          behaves in saturated, linear, and negative regimes. Watch how the corresponding local derivatives <MathText text="g'(z)" /> respond:
        </p>

        {/* Score Slider & Presets */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Pre-activation Score <MathText text="z" />:</span>
            <span className="font-mono text-base font-bold text-indigo-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              {scoreZ.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min="-8"
            max="8"
            step="0.1"
            value={scoreZ}
            onChange={(e) => setScoreZ(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>-8.0 (Deep Negative)</span>
            <span>0.0 (Origin)</span>
            <span>+8.0 (Deep Positive)</span>
          </div>

          {/* Preset Buttons */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Test Presets:</span>
            <button
              type="button"
              onClick={() => jumpPreset(-6.0)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
            >
              z = -6.0 (Saturation/Dead)
            </button>
            <button
              type="button"
              onClick={() => jumpPreset(0.0)}
              className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-mono transition-colors"
            >
              z = 0.0 (Center/Max Gradient)
            </button>
            <button
              type="button"
              onClick={() => jumpPreset(6.0)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
            >
              z = +6.0 (Positive Flow)
            </button>
            <button
              type="button"
              onClick={() => jumpPreset(-0.5)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
            >
              z = -0.5 (Near-Zero Negative)
            </button>
          </div>
        </div>

        {/* 6 Activation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {/* Sigmoid Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300">Sigmoid σ(z)</span>
              <span className="font-mono text-[10px] text-slate-400">1 / (1 + e^-z)</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Activation a:</span>
                <span className="font-mono text-lg font-bold text-indigo-300">{sigmoidVal.toFixed(4)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Derivative σ':</span>
                <span className="font-mono text-sm font-semibold text-purple-300">{sigmoidDeriv.toFixed(4)}</span>
              </div>
            </div>
            <div className="pt-1">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                sigmoidDeriv < 0.01 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {sigmoidDeriv < 0.01 ? 'Vanishing Gradient (< 0.01)' : 'Active Learning Zone'}
              </span>
            </div>
          </div>

          {/* Tanh Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300">Tanh(z)</span>
              <span className="font-mono text-[10px] text-slate-400">(e^z - e^-z)/(e^z + e^-z)</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Activation a:</span>
                <span className="font-mono text-lg font-bold text-purple-300">{tanhVal.toFixed(4)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Derivative tanh':</span>
                <span className="font-mono text-sm font-semibold text-purple-200">{tanhDeriv.toFixed(4)}</span>
              </div>
            </div>
            <div className="pt-1">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                tanhDeriv < 0.01 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {tanhDeriv < 0.01 ? 'Saturated Tails' : 'Zero-Centered Dynamic'}
              </span>
            </div>
          </div>

          {/* ReLU Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">ReLU(z)</span>
              <span className="font-mono text-[10px] text-slate-400">max(0, z)</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Activation a:</span>
                <span className="font-mono text-lg font-bold text-emerald-300">{reluVal.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Derivative ReLU':</span>
                <span className="font-mono text-sm font-semibold text-emerald-200">{reluDeriv.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-1">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                scoreZ < 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {scoreZ < 0 ? 'Dead Zone (Zero Gradient)' : 'Unit Gradient Flow (1.0)'}
              </span>
            </div>
          </div>

          {/* Leaky ReLU Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300">Leaky ReLU(z)</span>
              <span className="font-mono text-[10px] text-slate-400">max(0.01z, z)</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Activation a:</span>
                <span className="font-mono text-lg font-bold text-cyan-300">{leakyVal.toFixed(4)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Derivative:</span>
                <span className="font-mono text-sm font-semibold text-cyan-200">{leakyDeriv.toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {scoreZ < 0 ? 'Small Gradient Trickle (0.01)' : 'Full Gradient (1.0)'}
              </span>
            </div>
          </div>

          {/* Softplus Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">Softplus(z)</span>
              <span className="font-mono text-[10px] text-slate-400">ln(1 + e^z)</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Activation a:</span>
                <span className="font-mono text-lg font-bold text-amber-300">{softplusVal.toFixed(4)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Derivative:</span>
                <span className="font-mono text-sm font-semibold text-amber-200">{softplusDeriv.toFixed(4)}</span>
              </div>
            </div>
            <div className="pt-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Smooth Derivative = σ(z)
              </span>
            </div>
          </div>

          {/* ELU Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-teal-300">ELU(z) (α=1)</span>
              <span className="font-mono text-[10px] text-slate-400">z if z&gt;0; e^z - 1</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">Activation a:</span>
                <span className="font-mono text-lg font-bold text-teal-300">{eluVal.toFixed(4)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Derivative:</span>
                <span className="font-mono text-sm font-semibold text-teal-200">{eluDeriv.toFixed(4)}</span>
              </div>
            </div>
            <div className="pt-1">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                Smooth Exponential Asymptote
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Architectural Glossary */}
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
                <td className="py-2.5 font-bold text-indigo-300">Activation Function</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A scalar mathematical transformation applied to the pre-activation score <MathText text="z" /> that confers non-linear modeling capacity.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Saturation</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A state in bounded activation functions (like sigmoid or tanh) where large inputs drive the output into nearly flat asymptotic regions.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Vanishing Gradient</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  The exponential attenuation of backpropagated error gradients toward zero caused by compounding tiny local activation derivatives across many layers.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Zero-Centered</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Activation functions (e.g. Tanh) whose outputs have an expected mean of approximately 0, preventing directional gradient oscillation.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Dying ReLU</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A failure mode where a neuron outputs zero across all training examples, receiving zero gradient and permanently freezing its weights.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Softmax</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A multi-dimensional vector normalization operator that converts arbitrary class logits into a mutually exclusive probability distribution summing to 1.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Module Navigation Footer */}
      <div className="pt-2 text-center text-xs text-slate-500">
        Module 4 complete · Next: <strong className="text-slate-400">Module 5: Training a Multilayer Neural Network</strong>
      </div>
    </div>
  );
};
