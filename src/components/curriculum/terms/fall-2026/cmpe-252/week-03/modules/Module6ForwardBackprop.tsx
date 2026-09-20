import React, { useState } from 'react';
import {
  GitBranch,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Sliders,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
  Calculator,
  Activity,
  Target
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module6ForwardBackprop: React.FC = () => {
  // Playground 1: Interactive Chain Rule Multiplier State
  const [dLda, setDLda] = useState<number>(4.0);
  const [dadz, setDadz] = useState<number>(0.5);
  const [dzdw, setDzdw] = useState<number>(3.0);

  const totalChainGrad = dLda * dadz * dzdw;
  const isZeroGradient = Math.abs(totalChainGrad) < 0.0001;

  // Playground 2: Full End-to-End Numerical Simulator State
  // Architecture: x -> [w_h, b_h] -> ReLU -> a_h -> [w_o, b_o] -> linear -> y_hat -> Loss = (y - y_hat)^2
  const [simX, setSimX] = useState<number>(2.0);
  const [simY, setSimY] = useState<number>(10.0);
  const [simWh, setSimWh] = useState<number>(2.0);
  const [simBh, setSimBh] = useState<number>(0.0);
  const [simWo, setSimWo] = useState<number>(2.0);
  const [simBo, setSimBo] = useState<number>(1.0);
  const [simAlpha, setSimAlpha] = useState<number>(0.005);

  // 1. Forward Pass
  const zh = simWh * simX + simBh;
  const ah = Math.max(0, zh);
  const reluDeriv = zh > 0 ? 1 : 0;
  const yPred = simWo * ah + simBo;
  const loss = Math.pow(simY - yPred, 2);

  // 2. Output Layer Gradients
  const dL_dYpred = 2 * (yPred - simY);
  const dL_dWo = dL_dYpred * ah;
  const dL_dBo = dL_dYpred * 1.0;

  // 3. Hidden Layer Gradients
  const dL_dAh = dL_dYpred * simWo;
  const deltaH = dL_dAh * reluDeriv;
  const dL_dWh = deltaH * simX;
  const dL_dBh = deltaH * 1.0;

  // 4. Projected Updates
  const nextWo = simWo - simAlpha * dL_dWo;
  const nextBo = simBo - simAlpha * dL_dBo;
  const nextWh = simWh - simAlpha * dL_dWh;
  const nextBh = simBh - simAlpha * dL_dBh;

  // 5. Projected Forward Pass
  const nextZh = nextWh * simX + nextBh;
  const nextAh = Math.max(0, nextZh);
  const nextYpred = nextWo * nextAh + nextBo;
  const nextLoss = Math.pow(simY - nextYpred, 2);

  const applyOneStep = () => {
    setSimWo(parseFloat(nextWo.toFixed(4)));
    setSimBo(parseFloat(nextBo.toFixed(4)));
    setSimWh(parseFloat(nextWh.toFixed(4)));
    setSimBh(parseFloat(nextBh.toFixed(4)));
  };

  const resetSimulation = () => {
    setSimX(2.0);
    setSimY(10.0);
    setSimWh(2.0);
    setSimBh(0.0);
    setSimWo(2.0);
    setSimBo(1.0);
    setSimAlpha(0.005);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Trace the exact mathematical mechanics of backpropagation: how error signals propagate backward
          from the scalar loss function through each successive layer using the multivariate chain rule of calculus,
          calculating analytical partial derivatives to update every weight and bias in the network.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The fundamental dual pass:</strong> Forward propagation computes intermediate activations and the final prediction;
          backpropagation transmits error sensitivities backward to compute exact parameter gradients for gradient descent.
        </div>
      </div>

      {/* Forward Propagation & Layer Dependency */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Forward Signal Flow
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Forward Propagation</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Forward propagation</strong> is the sequential, unidirectional execution
          of mathematical operations moving from the input features toward the scalar loss:
        </p>

        {/* Forward Chain Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center gap-2 flex-wrap text-xs font-mono text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
            <MathText text="\mathbf{a}^{(0)} = \mathbf{x}" />
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <MathText text="\mathbf{z}^{(1)}" />
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
            <MathText text="\mathbf{a}^{(1)}" />
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <MathText text="\mathbf{z}^{(2)}" />
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            <MathText text="\mathbf{a}^{(2)} = \hat{\mathbf{y}}" />
          </span>
          <ArrowRight className="w-4 h-4 text-slate-500" />
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
            <MathText text="\mathcal{L}(\hat{y}, y)" />
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          At each layer <MathText text="l \in \{1, \dots, L\}" />, two consecutive matrix operations occur:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-sans font-semibold block">1. Pre-activation Score:</span>
            <div className="text-indigo-300">
              <MathText text="\mathbf{z}^{(l)} = \mathbf{W}^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}" />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-sans font-semibold block">2. Post-activation Output:</span>
            <div className="text-emerald-300">
              <MathText text="\mathbf{a}^{(l)} = g^{(l)}\left(\mathbf{z}^{(l)}\right)" />
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300">Critical Dependency Ordering:</strong> Notice that the output activation <MathText text="\mathbf{a}^{(2)}" /> succeeds <MathText text="\mathbf{z}^{(2)}" />,
            and the scalar loss <MathText text="\mathcal{L}" /> is computed directly from <MathText text="\mathbf{a}^{(2)}" />.
            Backpropagation must untangle this exact sequence in reverse.
          </p>
        </div>
      </div>

      {/* Computation Graph & Backward Chain */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Computational Graph
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Computation Graph & The Backward Path</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A <strong className="text-slate-100">computation graph</strong> expresses the entire neural network as a directed
          acyclic graph (DAG) where nodes represent arithmetic operations and variables, and directed edges define information flow.
        </p>

        {/* Backward Chain Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
            The Reversed Error Propagation Flow
          </span>
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-mono text-slate-300">
            <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
              <MathText text="\mathcal{L}" />
            </span>
            <ArrowLeft className="w-4 h-4 text-rose-400" />
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <MathText text="\mathbf{a}^{(2)}" />
            </span>
            <ArrowLeft className="w-4 h-4 text-rose-400" />
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <MathText text="\mathbf{z}^{(2)}" />
            </span>
            <ArrowLeft className="w-4 h-4 text-rose-400" />
            <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
              <MathText text="\mathbf{a}^{(1)}" />
            </span>
            <ArrowLeft className="w-4 h-4 text-rose-400" />
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              <MathText text="\mathbf{z}^{(1)}" />
            </span>
            <ArrowLeft className="w-4 h-4 text-rose-400" />
            <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40">
              <MathText text="\mathbf{W}^{(1)}, \mathbf{b}^{(1)}" />
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Forward propagation evaluates numerical values along the graph from inputs to loss. Backpropagation traverses
          the graph in strict reverse, computing local gradients via the chain rule and accumulating them backward.
        </p>
      </div>

      {/* Why Backpropagation Is Needed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Computational Efficiency
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Why Backpropagation Is Needed</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Modern deep architectures contain millions or billions of parameters. To perform gradient descent, we must compute
          the partial derivative of the scalar loss with respect to <strong className="text-white">every single parameter</strong>:
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\text{For every parameter } \theta_j: \quad \frac{\partial \mathcal{L}}{\partial \theta_j}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Short Path (Output Weight)
            </span>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 text-center">
              <MathText text="w^{(2)} \longrightarrow z^{(2)} \longrightarrow a^{(2)} \longrightarrow \mathcal{L}" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Output parameters directly affect the final score and loss through only 2 intermediate links.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Long Path (Hidden Weight)
            </span>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300 text-center">
              <MathText text="w^{(1)} \longrightarrow z^{(1)} \longrightarrow a^{(1)} \longrightarrow z^{(2)} \longrightarrow a^{(2)} \longrightarrow \mathcal{L}" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Early hidden weights affect the loss through a cascade of intermediate variables across multiple layers.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-indigo-300">Dynamic Programming Principle:</strong> Instead of recomputing overlapping derivative paths
            independently for each parameter (which would scale exponentially with depth), backpropagation caches
            downstream derivative factors. Each node computes its error signal once and shares it with all upstream connections.
          </p>
        </div>
      </div>

      {/* The Chain Rule */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Calculus Foundation
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">The Chain Rule</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          If parameter <MathText text="w" /> influences the objective <MathText text="\mathcal{L}" /> through intermediate variables,
          the total rate of change equals the <strong className="text-white">product of local derivatives</strong> along that trajectory:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="\frac{\partial \mathcal{L}}{\partial w} = \frac{\partial \mathcal{L}}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial w}" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          For a two-layer network, expanding the chain rule from the loss back to a first-layer weight yields five multiplied factors:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs text-cyan-300 overflow-x-auto">
          <MathText text="\frac{\partial \mathcal{L}}{\partial w^{(1)}} = \left(\frac{\partial \mathcal{L}}{\partial a^{(2)}}\right) \cdot \left(\frac{\partial a^{(2)}}{\partial z^{(2)}}\right) \cdot \left(\frac{\partial z^{(2)}}{\partial a^{(1)}}\right) \cdot \left(\frac{\partial a^{(1)}}{\partial z^{(1)}}\right) \cdot \left(\frac{\partial z^{(1)}}{\partial w^{(1)}}\right)" />
        </div>

        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-rose-300">Why Multiplication Matters:</strong> Because total sensitivity is a mathematical product,
            if any single link in the chain has a zero derivative (for instance, a saturated sigmoid tail <MathText text="\sigma' \approx 0" /> or
            a deactivated ReLU <MathText text="z < 0 \implies \text{ReLU}'(z) = 0" />), the entire backpropagated gradient collapses to zero!
          </p>
        </div>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO 1: Chain Rule Multiplier */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive Chain Rule Decomposition</h3>
          </div>
          <span className="text-xs text-slate-400">
            Local Sensitivities Multiplier
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the three local derivatives along the path <MathText text="w \to z \to a \to \mathcal{L}" />. Observe how the final gradient
          is formed by sequential multiplication, and test what happens when any single derivative drops to zero:
        </p>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Loss Sensitivity <MathText text="\partial \mathcal{L}/\partial a" />:</span>
              <span className="font-mono text-sm text-indigo-400">{dLda.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={dLda}
              onChange={(e) => setDLda(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">External error gradient</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Activation Slope <MathText text="\partial a/\partial z" />:</span>
              <span className="font-mono text-sm text-purple-400">{dadz.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={dadz}
              onChange={(e) => setDadz(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-[10px] text-slate-500 block">Neuron activation derivative g'(z)</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Affine Sensitivity <MathText text="\partial z/\partial w" />:</span>
              <span className="font-mono text-sm text-emerald-400">{dzdw.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={dzdw}
              onChange={(e) => setDzdw(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-[10px] text-slate-500 block">Incoming input feature x or a^(l-1)</span>
          </div>
        </div>

        {/* Output Calculation Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-1">
            <div className="text-slate-400">
              Chain Rule Product:{' '}
              <span className="text-slate-200">
                ({dLda.toFixed(1)}) &times; ({dadz.toFixed(1)}) &times; ({dzdw.toFixed(1)}) =
              </span>{' '}
              <strong className="text-base text-cyan-300 font-bold">{totalChainGrad.toFixed(3)}</strong>
            </div>
            <div className="text-[11px] text-slate-500 font-sans">
              <MathText text="\frac{\partial \mathcal{L}}{\partial w} = \frac{\partial \mathcal{L}}{\partial a} \cdot g'(z) \cdot x" />
            </div>
          </div>

          <div className="font-sans">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              isZeroGradient
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isZeroGradient ? 'Blocked: Zero Gradient Flow' : 'Gradient Flowing Freely'}
            </span>
          </div>
        </div>
      </div>

      {/* Output-Layer & Hidden-Layer Formulas */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Vectorized Backpropagation
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Layer-by-Layer Gradient Formulas</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Backpropagation defines an <strong className="text-emerald-400">error vector <MathText text="\boldsymbol{\delta}^{(l)}" /></strong> for
          each layer, representing the sensitivity of the loss with respect to pre-activation score <MathText text="\mathbf{z}^{(l)}" />:
        </p>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="\boldsymbol{\delta}^{(l)} \equiv \frac{\partial \mathcal{L}}{\partial \mathbf{z}^{(l)}}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Output Layer */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans block">
              Output Layer (<MathText text="l = L" />)
            </span>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-sans block">Output Error Signal:</span>
              <MathText text="\boldsymbol{\delta}^{(L)} = \left(\frac{\partial \mathcal{L}}{\partial \mathbf{a}^{(L)}}\right) \odot g^{(L)\prime}\left(\mathbf{z}^{(L)}\right)" />
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              For squared error loss with linear output (<MathText text="g'(z) = 1" />):
              <span className="font-mono block mt-1 text-indigo-300">
                <MathText text="\boldsymbol{\delta}^{(L)} = 2\left(\hat{\mathbf{y}} - \mathbf{y}\right)" />
              </span>
            </p>
          </div>

          {/* Hidden Layers */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans block">
              Hidden Layers (<MathText text="l < L" />)
            </span>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 font-sans block">Backward Recurrence:</span>
              <MathText text="\boldsymbol{\delta}^{(l)} = \left(\mathbf{W}^{(l+1)}\right)^T \boldsymbol{\delta}^{(l+1)} \odot g^{(l)\prime}\left(\mathbf{z}^{(l)}\right)" />
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              The downstream error signal <MathText text="\boldsymbol{\delta}^{(l+1)}" /> is projected back through transposed weights <MathText text="(\mathbf{W}^{(l+1)})^T" /> and gated by local activation derivative.
            </p>
          </div>
        </div>

        {/* Parameter Updates */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans block">
            Parameter Gradients & Gradient Descent Update
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-sans block">Weight Matrix Gradient:</span>
              <MathText text="\frac{\partial \mathcal{L}}{\partial \mathbf{W}^{(l)}} = \boldsymbol{\delta}^{(l)} \left(\mathbf{a}^{(l-1)}\right)^T \implies \mathbf{W}^{(l)} \leftarrow \mathbf{W}^{(l)} - \alpha \frac{\partial \mathcal{L}}{\partial \mathbf{W}^{(l)}}" />
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-sans block">Bias Vector Gradient:</span>
              <MathText text="\frac{\partial \mathcal{L}}{\partial \mathbf{b}^{(l)}} = \boldsymbol{\delta}^{(l)} \implies \mathbf{b}^{(l)} \leftarrow \mathbf{b}^{(l)} - \alpha \frac{\partial \mathcal{L}}{\partial \mathbf{b}^{(l)}}" />
            </div>
          </div>
        </div>
      </div>

      {/* CONTEXTUAL INTERACTIVE DEMO 2: Complete Numerical Walkthrough */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Live End-to-End Forward & Backpropagation Simulator</h3>
          </div>
          <span className="text-xs text-slate-400">
            1 Input &rarr; 1 Hidden (ReLU) &rarr; 1 Linear Output
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Walk through the complete arithmetic cycle. Inspect the forward activation pass, the backward gradient
          calculations, and execute a gradient descent parameter update to see the loss decrease:
        </p>

        {/* Simulator Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Input <MathText text="x" />:</span>
              <span className="font-mono text-indigo-400 font-bold">{simX}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={simX}
              onChange={(e) => setSimX(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Target <MathText text="y" />:</span>
              <span className="font-mono text-amber-400 font-bold">{simY}</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="1"
              value={simY}
              onChange={(e) => setSimY(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Hidden <MathText text="w_h" />:</span>
              <span className="font-mono text-purple-400 font-bold">{simWh.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.1"
              value={simWh}
              onChange={(e) => setSimWh(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Output <MathText text="w_o" />:</span>
              <span className="font-mono text-emerald-400 font-bold">{simWo.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.1"
              value={simWo}
              onChange={(e) => setSimWo(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        {/* Computation Steps Breakdown */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
          <div className="pb-2 border-b border-slate-800 space-y-1">
            <span className="text-indigo-400 font-bold font-sans">1. Forward Pass:</span>
            <div className="pl-3 space-y-0.5 text-slate-400">
              <div>&bull; Hidden Pre-activation: <MathText text="z_h = w_h \cdot x + b_h" /> = ({simWh.toFixed(2)})({simX}) + ({simBh.toFixed(2)}) = <strong>{zh.toFixed(2)}</strong></div>
              <div>&bull; Hidden Activation: <MathText text="a_h = \text{ReLU}(z_h)" /> = <strong>{ah.toFixed(2)}</strong></div>
              <div>&bull; Output Prediction: <MathText text="\hat{y} = w_o \cdot a_h + b_o" /> = ({simWo.toFixed(2)})({ah.toFixed(2)}) + ({simBo.toFixed(2)}) = <strong>{yPred.toFixed(3)}</strong></div>
              <div>&bull; Current Loss: <MathText text="\mathcal{L} = (y - \hat{y})^2" /> = ({simY} - {yPred.toFixed(3)})² = <strong className="text-amber-300">{loss.toFixed(4)}</strong></div>
            </div>
          </div>

          <div className="pb-2 border-b border-slate-800 space-y-1">
            <span className="text-rose-400 font-bold font-sans">2. Backward Pass (Gradients):</span>
            <div className="pl-3 space-y-0.5 text-slate-400">
              <div>&bull; <MathText text="\partial \mathcal{L}/\partial \hat{y} = 2(\hat{y} - y)" /> = 2({yPred.toFixed(3)} - {simY}) = <strong>{dL_dYpred.toFixed(3)}</strong></div>
              <div>&bull; Output Gradients: <MathText text="\partial \mathcal{L}/\partial w_o = \delta_o \cdot a_h" /> = ({dL_dYpred.toFixed(3)})({ah.toFixed(2)}) = <strong>{dL_dWo.toFixed(3)}</strong>, &nbsp; <MathText text="\partial \mathcal{L}/\partial b_o" /> = <strong>{dL_dBo.toFixed(3)}</strong></div>
              <div>&bull; Hidden Error: <MathText text="\delta_h = (\delta_o \cdot w_o) \cdot \text{ReLU}'(z_h)" /> = (({dL_dYpred.toFixed(3)})({simWo.toFixed(2)}))({reluDeriv}) = <strong>{deltaH.toFixed(3)}</strong></div>
              <div>&bull; Hidden Gradients: <MathText text="\partial \mathcal{L}/\partial w_h = \delta_h \cdot x" /> = ({deltaH.toFixed(3)})({simX}) = <strong>{dL_dWh.toFixed(3)}</strong>, &nbsp; <MathText text="\partial \mathcal{L}/\partial b_h" /> = <strong>{dL_dBh.toFixed(3)}</strong></div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-emerald-400 font-bold font-sans">3. Parameter Update & Projected Improvement:</span>
            <div className="pl-3 space-y-0.5 text-slate-400">
              <div>&bull; <MathText text="w_o \leftarrow w_o - \alpha \frac{\partial \mathcal{L}}{\partial w_o}" /> = {simWo.toFixed(2)} - ({simAlpha})({dL_dWo.toFixed(3)}) = <strong className="text-emerald-300">{nextWo.toFixed(4)}</strong></div>
              <div>&bull; <MathText text="w_h \leftarrow w_h - \alpha \frac{\partial \mathcal{L}}{\partial w_h}" /> = {simWh.toFixed(2)} - ({simAlpha})({dL_dWh.toFixed(3)}) = <strong className="text-emerald-300">{nextWh.toFixed(4)}</strong></div>
              <div>&bull; Projected New Loss: <strong className="text-slate-100">{nextLoss.toFixed(4)}</strong>{' '}
                <span className="text-emerald-400 font-bold font-sans">
                  ({nextLoss < loss ? `↓ Reduced by ${(loss - nextLoss).toFixed(4)}` : 'No reduction'})
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2 font-sans">
            <button
              type="button"
              onClick={applyOneStep}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 text-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Apply Gradient Descent Step</span>
            </button>
            <button
              type="button"
              onClick={resetSimulation}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5 text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Parameters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
