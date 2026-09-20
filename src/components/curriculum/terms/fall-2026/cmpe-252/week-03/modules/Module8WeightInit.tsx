import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Layers,
  Calculator,
  Activity,
  Maximize2,
  TrendingDown,
  Scale,
  GitBranch,
  Split
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module8WeightInit: React.FC = () => {
  // --- Playground 1: Initialization Method Simulator State ---
  const [initMethod, setInitMethod] = useState<'zero' | 'random' | 'he'>('he');
  const [nInputs, setNInputs] = useState<number>(4);

  // Deterministic pseudorandom sequence for repeatable, visual clarity
  const pseudoRandomPool = useMemo(() => [0.42, -1.08, 0.23, 0.76, -0.31, 0.61, -0.88, 0.14, 0.97, -0.55], []);

  const { neuron1Weights, neuron2Weights, isSymmetric } = useMemo(() => {
    let scale = 0;
    if (initMethod === 'he') {
      scale = Math.sqrt(2 / nInputs);
    } else if (initMethod === 'random') {
      scale = 0.15;
    } else {
      scale = 0.0;
    }

    const n1 = Array.from({ length: nInputs }, (_, i) => {
      if (initMethod === 'zero') return 0;
      return pseudoRandomPool[i % pseudoRandomPool.length] * scale;
    });

    const n2 = Array.from({ length: nInputs }, (_, i) => {
      if (initMethod === 'zero') return 0;
      // Shift offset to simulate distinct random draws
      return pseudoRandomPool[(i + 3) % pseudoRandomPool.length] * scale;
    });

    const symmetric = n1.every((val, idx) => Math.abs(val - n2[idx]) < 1e-6);

    return {
      neuron1Weights: n1,
      neuron2Weights: n2,
      isSymmetric: symmetric
    };
  }, [initMethod, nInputs, pseudoRandomPool]);

  // --- Playground 2: He (Kaiming) Scale & Sampling Calculator ---
  const [heFanIn, setHeFanIn] = useState<number>(8);
  const [sampleRandn, setSampleRandn] = useState<number>(1.2);

  const heStdDev = Math.sqrt(2 / heFanIn);
  const sampleWeight = sampleRandn * heStdDev;

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* CONCEPTUAL FOUNDATION: What Does Initialization Mean? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">What Does Initialization Mean?</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Starting Coordinates
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Before training commences, every artificial neuron must possess numerical values for its incoming synaptic
          weights <MathText text="\mathbf{W}" /> and bias <MathText text="b" />. Choosing these initial values is called{' '}
          <strong className="text-slate-100">parameter initialization</strong>.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="z = \sum_{i=1}^n w_i x_i + b = \mathbf{w}^T \mathbf{x} + b, \qquad a = g(z)" />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          A network cannot execute its very first forward pass or compute its initial prediction loss without initial parameters.
          Initialization establishes the starting position in the high-dimensional loss landscape; subsequent gradient descent
          steps iteratively steer parameters toward local error minima:
        </p>

        {/* Execution Flow Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-semibold py-1">
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-300">
            1. Initial <MathText text="\mathbf{W}_0, \mathbf{b}_0" />
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            2. Forward Pass <MathText text="\hat{y} = f_\theta(\mathbf{x})" />
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            3. Loss <MathText text="\mathcal{L}(y, \hat{y})" />
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
            4. Update <MathText text="\mathbf{W} \leftarrow \mathbf{W} - \alpha \nabla_\mathbf{W} \mathcal{L}" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Synaptic Weights (W)</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Must be initialized to <strong className="text-slate-200">carefully scaled random values</strong>.
              Randomness is indispensable to break mathematical symmetry among parallel neurons within the same tier.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Neuron Biases (b)</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Typically initialized safely to <strong className="text-slate-200">zeros (<MathText text="b = 0" />)</strong> or
              small constants (e.g. <MathText text="0.01" /> for ReLUs). The catastrophic symmetry collapse stems entirely from
              identical hidden weights, not biases.
            </p>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE SIMULATOR: Compare Initialization Methods */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive Initialization Simulator</h3>
          </div>
          <span className="text-xs text-slate-400">
            Visualizing Symmetry Breaking Across Hidden Units
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Compare how different strategies assign initial weights across two parallel hidden neurons.
          Observe whether the neurons begin as identical clones (symmetry collapse) or distinct detectors:
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Initialization Strategy:</label>
            <select
              value={initMethod}
              onChange={(e) => setInitMethod(e.target.value as 'zero' | 'random' | 'he')}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="zero">All Zeros (W = 0) — Symmetry Trap</option>
              <option value="random">Small Fixed Random (W ~ U(-0.15, 0.15))</option>
              <option value="he">He (Kaiming) Normal (W ~ N(0, 2/n_in)) — Recommended for ReLU</option>
            </select>
            <span className="text-[10px] text-slate-500 block">
              {initMethod === 'zero' && 'Sets all weights identically to 0.0.'}
              {initMethod === 'random' && 'Small random variance unadjusted for fan-in.'}
              {initMethod === 'he' && 'Variance automatically calibrated to fan-in √(2/n).'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Inputs per Neuron (<MathText text="n_{\text{in}}" />):</span>
              <span className="font-mono text-sm text-indigo-400">{nInputs} inputs</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={nInputs}
              onChange={(e) => setNInputs(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">Number of incoming synaptic connections (fan-in)</span>
          </div>
        </div>

        {/* Visual Bar Comparison for Neuron 1 vs Neuron 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Neuron 1 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Neuron 1 Synaptic Weights
              </span>
              <span className="font-mono text-[11px] text-slate-400">Layer 1</span>
            </div>
            <div className="h-32 flex items-end gap-1.5 px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-800/80">
              {neuron1Weights.map((w, idx) => {
                const heightPct = Math.min(100, Math.max(12, Math.abs(w) * 110));
                const isPositive = w >= 0;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    <span className="text-[9px] font-mono text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {w.toFixed(2)}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        isPositive ? 'bg-indigo-500' : 'bg-rose-500'
                      }`}
                    ></div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1">w{idx + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Neuron 2 */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                Neuron 2 Synaptic Weights
              </span>
              <span className="font-mono text-[11px] text-slate-400">Layer 1</span>
            </div>
            <div className="h-32 flex items-end gap-1.5 px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-800/80">
              {neuron2Weights.map((w, idx) => {
                const heightPct = Math.min(100, Math.max(12, Math.abs(w) * 110));
                const isPositive = w >= 0;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    <span className="text-[9px] font-mono text-slate-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {w.toFixed(2)}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        isPositive ? 'bg-cyan-500' : 'bg-rose-500'
                      }`}
                    ></div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1">w{idx + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Diagnosis Status Banner */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-bold">
              {isSymmetric ? (
                <span className="text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Symmetry Trap Detected: Neuron 1 == Neuron 2
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Symmetry Successfully Broken: Neuron 1 &ne; Neuron 2
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {isSymmetric
                ? 'Both neurons will compute identical forward activations and receive identical backprop gradients. They will stay clones forever.'
                : 'Each neuron projects inputs onto different hyperplanes, enabling independent specialized feature extraction during training.'}
            </p>
          </div>

          <button
            onClick={() => {
              setInitMethod('he');
              setNInputs(4);
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset to recommended"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WHY ALL-ZERO HIDDEN WEIGHTS FAIL */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h2 className="text-xl font-bold text-slate-100">Why All-Zero Hidden Weights Fail</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
            Mathematical Symmetry Trap
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Suppose all hidden layer neurons are initialized with weights <MathText text="\mathbf{w}_1 = \mathbf{w}_2 = \mathbf{0}" /> and
          biases <MathText text="b_1 = b_2 = 0" />. When presented with any input vector <MathText text="\mathbf{x}" />, both neurons
          compute identical pre-activations:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-rose-300">
          <MathText text="z_1 = \mathbf{w}_1^T \mathbf{x} + b_1 = 0 \quad \text{and} \quad z_2 = \mathbf{w}_2^T \mathbf{x} + b_2 = 0 \implies h_1 = g(0) = h_2" />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Because their activation outputs are identical, both neurons contribute identically to the downstream output layer.
          During backpropagation, the chain rule yields exactly identical error sensitivities:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="\frac{\partial \mathcal{L}}{\partial \mathbf{w}_1} = \frac{\partial \mathcal{L}}{\partial \mathbf{w}_2} \qquad \text{and} \qquad \frac{\partial \mathcal{L}}{\partial b_1} = \frac{\partial \mathcal{L}}{\partial b_2}" />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Gradient descent then updates both sets of parameters by the exact same amount:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\mathbf{w}_1^{(t+1)} = \mathbf{w}_1^{(t)} - \alpha \nabla_{\mathbf{w}_1} \mathcal{L} = \mathbf{w}_2^{(t)} - \alpha \nabla_{\mathbf{w}_2} \mathcal{L} = \mathbf{w}_2^{(t+1)}" />
        </div>

        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
            <strong className="text-rose-300 block">The Architectural Consequence:</strong>
            <p>
              Even if a hidden layer contains 1,000 neurons, if they all start with identical weights, they will remain
              mathematically identical copies across every training epoch. The entire layer collapses to the computational
              capacity of a <strong className="text-slate-100">single neuron</strong>, rendering it completely incapable of solving
              multi-feature problems such as XOR!
            </p>
          </div>
        </div>
      </div>

      {/* WHY RANDOM SCALE MATTERS: THE GOLDILOCKS ZONE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Why the Random Scale Matters</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            The Variance Balance
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Breaking symmetry requires random values, but arbitrary randomness is not enough. The numerical variance
          (scale) of the random distribution determines whether signals successfully propagate through deep layers:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <TrendingDown className="w-4 h-4" />
              Overly Large Initial Weights
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When weights are too large, pre-activations <MathText text="z = \mathbf{w}^T \mathbf{x}" /> blow up to extreme values
              (e.g., <MathText text="|z| > 5" />). For Sigmoid and Tanh activations, this pushes outputs into flat saturating
              plateaus where local derivatives vanish (<MathText text="\sigma'(z) \approx 0" />), completely freezing gradient descent.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <TrendingDown className="w-4 h-4" />
              Overly Small Initial Weights
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When weights are too small (e.g. <MathText text="\sigma = 0.001" />), forward signals attenuate exponentially
              layer after layer, shrinking toward zero in deeper tiers. During backpropagation, error gradients also shrink
              to zero, preventing early layers from learning.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-amber-300">
          <MathText text="\text{Variance of Affine Sum: } \quad \operatorname{Var}(z) = \sum_{i=1}^{n_{\text{in}}} \operatorname{Var}(w_i x_i) = n_{\text{in}} \cdot \operatorname{Var}(w) \cdot \operatorname{Var}(x)" />
        </div>

        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">The Fan-In Rule:</strong> Notice that <MathText text="\operatorname{Var}(z)" /> scales
          directly with <MathText text="n_{\text{in}}" /> (the number of incoming connections). A neuron receiving 1,000 inputs
          requires much smaller weight variance than a neuron receiving only 4 inputs!
        </div>
      </div>

      {/* HE & XAVIER INITIALIZATION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">He (Kaiming) &amp; Xavier (Glorot) Methods</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
            Principled Variance Scaling
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Modern deep learning relies on mathematically derived scaling formulas that adapt directly to layer width and
          activation function dynamics:
        </p>

        {/* Side-by-Side Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Method</th>
                <th className="pb-2.5 w-1/4">Formula (Normal)</th>
                <th className="pb-2.5 w-1/4">Target Activation</th>
                <th className="pb-2.5 w-1/4">Key Intuition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">He (Kaiming) Normal</td>
                <td className="py-2.5 font-mono text-cyan-300"><MathText text="w \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}}}\right)" /></td>
                <td className="py-2.5 text-slate-200">ReLU, Leaky ReLU, GELU</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Factor of 2 compensates for ReLU extinguishing half of the activations (<MathText text="z < 0" />).
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Xavier (Glorot) Normal</td>
                <td className="py-2.5 font-mono text-cyan-300"><MathText text="w \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}} + n_{\text{out}}}\right)" /></td>
                <td className="py-2.5 text-slate-200">Tanh, Sigmoid, Linear</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Balances forward variance (<MathText text="n_{\text{in}}" />) and backward error variance (<MathText text="n_{\text{out}}" />).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* INTERACTIVE HE CALCULATOR */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            Interactive He Normal Scale &amp; Sampling Calculator
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Layer Fan-In (<MathText text="n_{\text{in}}" />):</span>
                <span className="font-mono text-sm text-indigo-400 font-bold">{heFanIn}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={heFanIn}
                onChange={(e) => setHeFanIn(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[10px] text-slate-500 block">Number of inputs entering each neuron</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Standard Normal Draw (<MathText text="r \sim \mathcal{N}(0, 1)" />):</span>
                <span className="font-mono text-sm text-cyan-400 font-bold">{sampleRandn.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.01"
                value={sampleRandn}
                onChange={(e) => setSampleRandn(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-[10px] text-slate-500 block">Simulated unit-normal pseudo-random value</span>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div>
              <span className="text-slate-400">He Standard Deviation: </span>
              <MathText text={`\\sigma = \\sqrt{\\frac{2}{${heFanIn}}} = `} />
              <strong className="text-amber-300 font-bold">{heStdDev.toFixed(4)}</strong>
            </div>
            <div>
              <span className="text-slate-400">Synthesized Synaptic Weight: </span>
              <MathText text={`w = r \\times \\sigma = (${sampleRandn.toFixed(2)}) \\times (${heStdDev.toFixed(4)}) = `} />
              <strong className="text-emerald-300 font-bold">{sampleWeight.toFixed(4)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* PRETRAINING AND TRANSFER LEARNING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Pretraining &amp; Transfer Learning</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
            Learned Initializations
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Neural network initialization does not always begin from random distributions. In modern deep learning,
          models frequently begin from weights already learned on vast upstream datasets (such as ImageNet or web-scale text corpora).
          This paradigm is known as <strong className="text-slate-100">pretraining and transfer learning</strong>:
        </p>

        {/* Transfer learning pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-semibold py-1">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            1. Pretrained Checkpoint <MathText text="\theta^*_{\text{upstream}}" />
          </div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300">
            2. Attach Task Head <MathText text="\mathbf{W}_{\text{new}}" />
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
            3. Fine-Tune on Target Data
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Approach</th>
                <th className="pb-2.5 w-1/4">Starting Coordinates</th>
                <th className="pb-2.5 w-1/2">Training Dynamics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Random Init from Scratch</td>
                <td className="py-2.5 text-slate-200">He / Xavier random weights</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Requires large labeled datasets and extensive compute to discover low-level feature detectors.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Full Fine-Tuning</td>
                <td className="py-2.5 text-slate-200">Pretrained backbone weights</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  All layers updated with a small learning rate (<MathText text="\alpha \ll \alpha_{\text{scratch}}" />), adapting upstream features to downstream tasks.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Layer Freezing (Linear Probe)</td>
                <td className="py-2.5 text-slate-200">Pretrained backbone frozen</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Early/middle layers are fixed (<MathText text="\nabla \mathcal{L} = 0" />). Only the new output classification head is trained, drastically reducing compute.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
          <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300">Key Conceptual Contrast:</strong> He initialization provides a
            <em> carefully calibrated random starting point</em> designed to break symmetry without exploding variance.
            Pretraining provides an <em>informative semantic starting point</em> that transfers structured geometric representations.
          </p>
        </div>
      </div>
    </div>
  );
};
