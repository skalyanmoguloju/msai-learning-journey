import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Lock,
  Unlock,
  Sliders,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Database,
  Target,
  Zap,
  GitBranch,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module11FewShotTransfer: React.FC = () => {
  // ── Strategy Selector State (Freezing vs Fine-Tuning) ──
  type StrategyKey = 'head' | 'last' | 'all';
  const [strategy, setStrategy] = useState<StrategyKey>('head');

  // Layer status configurations: [H1, H2, H3, H4, H5, OT]
  const layerConfigs: Record<StrategyKey, {
    trainable: boolean[];
    title: string;
    description: string;
    recommendation: string;
    risk: string;
  }> = {
    head: {
      trainable: [false, false, false, false, false, true],
      title: 'Output Head Only (Linear Probe)',
      description: 'All 5 pretrained feature extraction layers (H1-H5) are locked. Only the new classification projection layer O_T receives gradient updates.',
      recommendation: 'Best for extremely small target datasets (e.g., 5 to 50 samples per class) where updating millions of backbone weights guarantees severe overfitting.',
      risk: 'Lower capacity: The target model cannot adapt intermediate feature representations to unique target domain textures.'
    },
    last: {
      trainable: [false, false, false, false, true, true],
      title: 'H5 + Output Head (Partial Fine-Tuning)',
      description: 'Layers H1-H4 remain frozen to preserve universal edge, corner, and texture primitives. Only layer H5 and the output head O_T receive gradients.',
      recommendation: 'Optimal balance for moderate target datasets (e.g., 50 to 500 samples per class) requiring target-specific semantic adjustments without corrupting low-level vision filters.',
      risk: 'Moderate compute: Backward pass must backpropagate through layer H5, requiring higher GPU memory.'
    },
    all: {
      trainable: [true, true, true, true, true, true],
      title: 'All Layers (Full End-to-End Fine-Tuning)',
      description: 'Every single weight across all 5 hidden layers and the output head is updated using target domain gradients.',
      recommendation: 'Best when substantial target labeled data is available and the target domain deviates significantly from the source domain.',
      risk: 'Catastrophic forgetting and overfitting risk: Overwrites pretrained prior knowledge if learning rate is too large or target samples are scarce.'
    }
  };

  // ── Output-Layer Update Playground State ──
  const [eta, setEta] = useState<number>(0.10);
  const h5 = [2, 1]; // Hidden activations
  const yTrue = 5; // Ground truth target
  const initialW = [1, 0];
  const initialB = 0;

  // Gradients for squared error loss L = 0.5 * (yHat - y)^2
  // dL/dyHat = yHat - y = 2 - 5 = -3
  // dL/dW = (yHat - y) * h5 = -3 * [2, 1] = [-6, -3]
  // dL/db = (yHat - y) = -3
  const gradW = [-6, -3];
  const gradB = -3;

  // Updated parameters
  const newW0 = initialW[0] - eta * gradW[0];
  const newW1 = initialW[1] - eta * gradW[1];
  const newB = initialB - eta * gradB;

  // New prediction and loss after 1 gradient step
  const yPredNew = newW0 * h5[0] + newW1 * h5[1] + newB;
  const lossNew = 0.5 * Math.pow(yPredNew - yTrue, 2);

  // ── Shots Slider State ──
  const [shots, setShots] = useState<number>(5);

  const getShotRegime = (s: number) => {
    if (s === 0) {
      return {
        badge: 'Zero-Shot Learning',
        color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
        heading: 'No labeled examples for the target classes',
        details: 'The model relies on auxiliary semantic relationships or multimodal embeddings (such as CLIP language prompts "a photo of a [class]") to classify inputs without observing a single training instance.',
        strategy: 'Multimodal metric matching or semantic knowledge graphs.'
      };
    }
    if (s === 1) {
      return {
        badge: 'One-Shot Learning',
        color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
        heading: 'Exactly one labeled example per class',
        details: 'The model must generalize an entire class boundary from a solitary prototype. Standard gradient updates fail due to high variance; metric-based Siamese or Prototypical architectures are standard.',
        strategy: 'Metric embedding comparison with nearest-neighbor lookup.'
      };
    }
    if (s <= 10) {
      return {
        badge: 'Few-Shot Learning',
        color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
        heading: 'Small support set (2 to 10 examples per class)',
        details: 'Classic few-shot regime. Pretrained feature extractors must be frozen or regularized heavily with early stopping to prevent memorizing image backgrounds or lighting idiosyncrasies.',
        strategy: 'Linear probing on frozen backbone or Prototypical Networks.'
      };
    }
    return {
      badge: 'Standard Adaptation Regime',
      color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      heading: 'Moderate to rich target supervision (> 10 examples per class)',
      details: 'Sufficient sample diversity exists to transition from few-shot metric methods to partial or full end-to-end backbone fine-tuning with weight decay.',
      strategy: 'Discriminative fine-tuning with layer-wise learning rate decay.'
    };
  };

  const shotInfo = getShotRegime(shots);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Master how deep representations transfer from data-rich source models to sample-starved target tasks. Understand how to reuse multi-layer backbones, calibrate layer freezing versus fine-tuning, evaluate exact output-head gradient steps, and navigate the frontiers of few-shot, one-shot, and zero-shot learning.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The Core Mechanism:</strong> Pretraining solves the sample complexity bottleneck. Rather than learning edges, textures, and visual composition from a handful of target images, the model imports universal geometric representations (<MathText text="\theta_S" />) and merely refits downstream classification heads (<MathText text="\theta_T" />).
        </div>
      </div>

      {/* ── Section: Why Few-Example Learning Is Difficult ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Foundational Challenge
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Why Few-Example Learning Is Difficult</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Modern deep neural networks contain millions—or billions—of continuous parameters. When presented with only a tiny support set of target examples, the hypothesis space contains an infinite number of parameter configurations that achieve zero training error:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\mathcal{L}_{\text{training}}(\theta) \approx 0 \quad \centernot\implies \quad \mathcal{L}_{\text{unseen}}(\theta) \text{ is small}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-semibold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Shortcut Learning & Spurious Noise</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              With only 3 or 5 training images, the network readily memorizes incidental background artifacts (e.g. green grass behind dogs, hospital bed shadows in X-rays, camera sensor noise) rather than genuine invariant class features.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Severe Intra-Class Variance Deficit</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              A handful of samples cannot capture the full distribution of rotations, lighting variations, occlusions, and sub-types present in real-world deployment, leading to brittle, over-confident predictions.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
          <strong className="font-semibold text-emerald-200">How Pretraining Solves This:</strong>
          <p className="leading-relaxed">
            A model pretrained on large-scale datasets (e.g., ImageNet with 14M images) already possesses rich, invariant feature extractors for edges, curves, textures, and 3D object parts. The few target examples only need to guide the final linear hyperplane toward the new target task.
          </p>
        </div>
      </div>

      {/* ── Section: Source Task versus Target Task ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Problem Formulation
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Source Task vs. Target Task</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Transfer learning formulates machine learning across two distinct domains and task distributions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Source Task (<MathText text="\mathcal{T}_S" />)
              </span>
              <Database className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Massive, publicly accessible or general-purpose dataset (e.g. ImageNet-1k, LAION, Wikipedia).
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-indigo-300 text-center">
              <MathText text="\theta_S = \{\mathbf{W}_S, \mathbf{b}_S\} = \arg\min_\theta \mathcal{L}_S(\mathcal{D}_S; \theta)" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Target Task (<MathText text="\mathcal{T}_T" />)
              </span>
              <Target className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Small, specialized, high-stakes downstream dataset (e.g. rare pathology histology, defect detection).
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 text-center">
              <MathText text="\theta_T^{(0)} \longleftarrow \theta_S \quad (\text{Warm Parameter Initialization})" />
            </div>
          </div>
        </div>

        {/* Privacy & Practical Pipeline */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Privacy & Decentralized Adaptation</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            The target model begins with a local copy of <MathText text="\theta_S" />. The target organization does <strong>not</strong> need to share confidential patient records or proprietary documents with the source provider. Adaptation occurs strictly within local compute infrastructure.
          </p>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 text-xs font-mono text-center">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 flex-1 min-w-[120px]">
              Raw Source Data <MathText text="\mathcal{D}_S" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="p-2.5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 flex-1 min-w-[120px]">
              Source Weights <MathText text="\theta_S" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex-1 min-w-[120px]">
              Local Adaptation <MathText text="\mathcal{D}_T" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex-1 min-w-[120px]">
              Target Model <MathText text="\theta_T" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: What Knowledge Is Transferred? ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Internal Representations
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">What Knowledge Is Transferred?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Deep networks do not transfer human-written rules, if-then logic, or stored training samples. They transfer <strong>continuous weight matrices</strong> that map raw sensory inputs into structured coordinate manifolds:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="\text{Raw Pixels} \xrightarrow{\mathbf{W}^{(1)}} \text{Edges} \xrightarrow{\mathbf{W}^{(2)}} \text{Textures} \xrightarrow{\mathbf{W}^{(3)}} \text{Parts} \xrightarrow{\mathbf{W}^{(4,5)}} \text{Semantics} \xrightarrow{\mathbf{W}_O} \text{Labels}" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-indigo-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3 border-b border-slate-800">Layer Depth</th>
                <th className="p-3 border-b border-slate-800">Extracted Features</th>
                <th className="p-3 border-b border-slate-800">Mathematical Form</th>
                <th className="p-3 border-b border-slate-800">Transfer Reusability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-emerald-400">Early (H1, H2)</td>
                <td className="p-3">Gabor-like edge filters, color contrasts, high-frequency spatial gradients</td>
                <td className="p-3 font-mono text-slate-400">
                  <MathText text="\mathbf{h}^{(1)} = g(\mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)})" />
                </td>
                <td className="p-3 text-emerald-300">Universally reusable across almost all vision tasks; almost always frozen.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-cyan-400">Middle (H3, H4)</td>
                <td className="p-3">Complex textures, curves, geometrical motifs, interconnected parts</td>
                <td className="p-3 font-mono text-slate-400">
                  <MathText text="\mathbf{h}^{(3)} = g(\mathbf{W}^{(3)}\mathbf{h}^{(2)} + \mathbf{b}^{(3)})" />
                </td>
                <td className="p-3 text-cyan-300">Highly reusable if source and target domains share visual motifs (e.g. natural images).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-400">Late (H5)</td>
                <td className="p-3">High-level task-specific class manifolds and semantic clustering</td>
                <td className="p-3 font-mono text-slate-400">
                  <MathText text="\mathbf{h}^{(5)} = g(\mathbf{W}^{(5)}\mathbf{h}^{(4)} + \mathbf{b}^{(5)})" />
                </td>
                <td className="p-3 text-amber-300">Domain-dependent; frequently fine-tuned with a low learning rate.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-rose-400">Output (O)</td>
                <td className="p-3">Source class logits (e.g. 1,000 ImageNet categories)</td>
                <td className="p-3 font-mono text-slate-400">
                  <MathText text="\hat{\mathbf{y}} = \mathbf{W}_O \mathbf{h}^{(5)} + \mathbf{b}_O" />
                </td>
                <td className="p-3 text-rose-300">Discarded and replaced by a brand-new target projection layer.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section: Building the Target Model: Five-Hidden-Layer Flow ─────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Network Surgery
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Building the Target Model: Five-Hidden-Layer Architecture</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Suppose our source backbone has five hidden layers (H1 through H5) followed by a source classification head <MathText text="O_S" /> projecting into 1,000 ImageNet classes:
        </p>

        {/* Source vs Target Architecture Diagram */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Source Network (1,000 Output Logits)</div>
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono py-1">
              <span className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 shrink-0"><MathText text="\mathbf{x}" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">H1</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">H2</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">H3</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">H4</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">H5</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                <MathText text="O_S \in \mathbb{R}^{1000}" />
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/40 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Adapted Target Network (3 Output Logits)</div>
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono py-1">
              <span className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 shrink-0"><MathText text="\mathbf{x}" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0"><MathText text="H_1^S" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0"><MathText text="H_2^S" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0"><MathText text="H_3^S" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0"><MathText text="H_4^S" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0"><MathText text="H_5^S" /></span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0 font-bold">
                <MathText text="O_T \in \mathbb{R}^{3}" />
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          For a downstream medical problem with only 3 diagnosis classes (e.g., <em>Normal</em>, <em>Benign</em>, <em>Malignant</em>), we discard the 1,000-way matrix <MathText text="\mathbf{W}_{O_S}" /> and replace it with a newly dimensioned linear transformation <MathText text="\mathbf{W}_{O_T}" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="\mathbf{W}_{O_S} \in \mathbb{R}^{1000 \times d} \quad \Longrightarrow \quad \mathbf{W}_{O_T} \in \mathbb{R}^{3 \times d}, \quad \hat{\mathbf{y}}_T = \mathbf{W}_{O_T} \mathbf{h}^{(5)} + \mathbf{b}_{O_T}" />
        </div>
      </div>

      {/* ── Section: Interactive Freezing vs. Fine-Tuning ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Lab
            </span>
            <h3 className="text-xl font-bold text-slate-100">Freezing vs. Fine-Tuning Strategy</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Layer Surgery Visualizer
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Select an adaptation regime below to inspect which layers are locked with zero gradient updates (<MathText text="\mathbf{W}_{\text{new}} = \mathbf{W}_{\text{old}}" />) versus which layers receive active gradient descent updates (<MathText text="\mathbf{W}_{\text{new}} = \mathbf{W}_{\text{old}} - \eta \nabla \mathcal{L}_T" />):
        </p>

        {/* Strategy Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['head', 'last', 'all'] as StrategyKey[]).map((key) => {
            const isSel = strategy === key;
            return (
              <button
                key={key}
                onClick={() => setStrategy(key)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSel
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-950/50'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{key === 'head' ? 'Option A' : key === 'last' ? 'Option B' : 'Option C'}</span>
                  {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="text-sm font-semibold text-slate-100">{layerConfigs[key].title}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic 6-Layer Architecture Display */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Computational Graph: Gradient Propagation Flow</span>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Lock className="w-3 h-3" /> Frozen Layer
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Zap className="w-3 h-3" /> Trainable Layer
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {['H1 (Low)', 'H2 (Low)', 'H3 (Mid)', 'H4 (Mid)', 'H5 (High)', 'O_T (Head)'].map((name, idx) => {
              const isTrainable = layerConfigs[strategy].trainable[idx];
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                    isTrainable
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 shadow-sm shadow-emerald-950/40'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800">
                    {isTrainable ? (
                      <Unlock className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="font-mono font-bold text-xs">{name}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/60">
                    {isTrainable ? 'Trainable' : 'Frozen'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {isTrainable ? 'η > 0' : 'η = 0'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strategy Details Card */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-indigo-300">{layerConfigs[strategy].title}: </strong>
              {layerConfigs[strategy].description}
            </p>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
              <div className="text-emerald-400 font-semibold">Recommended Use Case:</div>
              <p className="text-slate-300 leading-relaxed">{layerConfigs[strategy].recommendation}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Trade-off & Risk:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{layerConfigs[strategy].risk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Concrete Output-Layer Update Calculator ────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Interactive Mathematics
            </span>
            <h3 className="text-xl font-bold text-slate-100">Concrete Output-Layer Update</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Step-by-Step Gradient Step
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Walk through the exact numerical mechanics of a single gradient descent update on a newly attached target output neuron.
          Suppose the fifth hidden layer produces the 2D feature representation vector <MathText text="\mathbf{h}^{(5)} = [2, 1]^T" />.
          The output layer begins with initialized weights <MathText text="\mathbf{W}_T = [1, 0]" /> and bias <MathText text="b_T = 0" />, aiming to predict target label <MathText text="y = 5" />:
        </p>

        {/* Step-by-Step Initial Calculations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] font-semibold">1. Forward Pass at Initialization</span>
            <div className="text-indigo-300">
              <MathText text="\hat{y} = \mathbf{W}_T \mathbf{h}^{(5)} + b_T = [1, 0] \begin{bmatrix} 2 \\ 1 \end{bmatrix} + 0 = 2" />
            </div>
            <div className="text-rose-400 pt-1">
              <MathText text="\mathcal{L}_T = \frac{1}{2}(\hat{y} - y)^2 = \frac{1}{2}(2 - 5)^2 = 4.50" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <span className="text-slate-400 uppercase tracking-wider text-[11px] font-semibold">2. Output Gradients</span>
            <div className="text-cyan-300">
              <MathText text="\frac{\partial \mathcal{L}_T}{\partial \mathbf{W}_T} = (\hat{y} - y)\mathbf{h}^{(5)T} = (-3)[2, 1] = [-6, -3]" />
            </div>
            <div className="text-cyan-300 pt-1">
              <MathText text="\frac{\partial \mathcal{L}_T}{\partial b_T} = (\hat{y} - y) = -3" />
            </div>
          </div>
        </div>

        {/* Interactive Learning Rate Slider */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="learning-rate-slider" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Learning Rate (<MathText text="\eta" />)</span>
            </label>
            <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              η = {eta.toFixed(2)}
            </span>
          </div>

          <input
            id="learning-rate-slider"
            type="range"
            min="0.01"
            max="0.20"
            step="0.01"
            value={eta}
            onChange={(e) => setEta(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>0.01 (Conservative Step)</span>
            <span>0.10 (Standard Default)</span>
            <span>0.20 (Aggressive Step)</span>
          </div>

          {/* Dynamic Step Calculations */}
          <div className="p-4 rounded-xl bg-slate-900 border border-indigo-500/30 space-y-2.5 font-mono text-xs">
            <div className="text-slate-300 flex items-center justify-between flex-wrap gap-2">
              <span className="text-slate-400">Parameter Update:</span>
              <span className="text-indigo-300">
                <MathText text={`\\mathbf{W}_{T,\\text{new}} = [1, 0] - (${eta.toFixed(2)})[-6, -3] = [${newW0.toFixed(3)}, ${newW1.toFixed(3)}]`} />
              </span>
            </div>

            <div className="text-slate-300 flex items-center justify-between flex-wrap gap-2">
              <span className="text-slate-400">Bias Update:</span>
              <span className="text-indigo-300">
                <MathText text={`b_{T,\\text{new}} = 0 - (${eta.toFixed(2)})(-3) = ${newB.toFixed(3)}`} />
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-emerald-400 font-bold">New Prediction & Loss:</span>
              <span className="text-emerald-300">
                <MathText text={`\\hat{y}_{\\text{new}} = ${yPredNew.toFixed(2)}, \\quad \\mathcal{L}_{\\text{new}} = ${lossNew.toFixed(3)}`} />
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Key Insight:</strong> With a learning rate of <MathText text={`\\eta = ${eta.toFixed(2)}`} />, the prediction shifted from <MathText text="2.0" /> up to <MathText text={yPredNew.toFixed(2)} />, shrinking the loss from <MathText text="4.50" /> down to <strong className="text-emerald-400 font-mono">{lossNew.toFixed(3)}</strong>. The frozen hidden-layer weights (H1 through H5) experienced <strong>zero</strong> gradient updates and remained pristine!
          </p>
        </div>
      </div>

      {/* ── Section: Transfer Learning vs. Few-Shot Learning ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Conceptual Taxonomy
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Transfer Learning vs. Few-Shot Learning</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          While frequently combined in real-world pipelines, transfer learning and few-shot learning describe orthogonal dimensions of the learning problem:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-indigo-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-3 border-b border-slate-800">Dimension</th>
                <th className="p-3 border-b border-slate-800">Transfer Learning</th>
                <th className="p-3 border-b border-slate-800">Few-Shot Learning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-cyan-400">Core Focus</td>
                <td className="p-3"><strong>Where knowledge originates:</strong> Repurposing parameters learned on a source task.</td>
                <td className="p-3"><strong>Target sample constraint:</strong> Adapting to a target task using only a handful of examples per class.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-cyan-400">Dataset Size</td>
                <td className="p-3">Can use small, medium, or massive target datasets (e.g. ImageNet to 100k satellite images is transfer, but not few-shot).</td>
                <td className="p-3">Strictly characterized by tiny support sets (e.g. 1 to 10 samples per class).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-cyan-400">Combined Synergy</td>
                <td className="p-3 text-indigo-300 font-medium" colSpan={2}>
                  <MathText text="\text{Pretrained Foundation Backbone } (\theta_S) + 5 \text{ Target Examples per Class} = \mathbf{\text{Transfer + Few-Shot Learning}}" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section: Few-Shot, One-Shot, and Zero-Shot Regimes ──────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Sample Regimes
            </span>
            <h3 className="text-xl font-bold text-slate-100">Few-Shot, One-Shot, and Zero-Shot</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Shots Adaptation Explorer
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Adjust the target examples per class slider below to observe how the adaptation methodology shifts as sample availability evolves:
        </p>

        {/* Shots Slider Card */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="target-shots-slider" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Target Examples Per Class (K-Shots)</span>
            </label>
            <span className="font-mono text-sm font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">
              K = {shots} {shots === 1 ? 'Shot' : 'Shots'}
            </span>
          </div>

          <input
            id="target-shots-slider"
            type="range"
            min="0"
            max="20"
            step="1"
            value={shots}
            onChange={(e) => setShots(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>0 (Zero-Shot)</span>
            <span>1 (One-Shot)</span>
            <span>5 (Few-Shot)</span>
            <span>10 (Boundary)</span>
            <span>20 (Standard)</span>
          </div>

          {/* Dynamic Regime Callout */}
          <div className={`p-4 rounded-xl border space-y-2 ${shotInfo.color}`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">{shotInfo.badge}</span>
              <span className="text-xs font-mono font-semibold">{shots === 0 ? 'K = 0' : `K = ${shots} per class`}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">{shotInfo.heading}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{shotInfo.details}</p>
            <div className="text-xs font-medium pt-1">
              <strong>Dominant Adaptation Strategy:</strong> {shotInfo.strategy}
            </div>
          </div>
        </div>

        {/* Zero-Shot Multimodal Mechanism Card */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <GitBranch className="w-4 h-4" />
            <span>How Does Zero-Shot Classification Work Without Training Labels?</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            "Zero-shot" does not imply learning from nothing—it means zero examples for the <em>specific downstream class</em>. Multimodal architectures like CLIP embed both images and natural language into a shared metric latent space:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-purple-300">
            <MathText text="\hat{y} = \arg\max_c \cos\left(f_{\text{image}}(\mathbf{x}), \; f_{\text{text}}(\text{''a photo of a ''} + c)\right)" />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            By measuring cosine similarity between the image embedding <MathText text="\mathbf{z}_{\text{image}}" /> and text candidate embeddings <MathText text="\mathbf{z}_{\text{text}}" />, the model classifies inputs into novel classes it was never explicitly trained on.
          </p>
        </div>
      </div>

      {/* ── Section: Practical Limitations & Negative Transfer ──────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Real-World Pitfalls
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Practical Limitations & Negative Transfer</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Transfer learning is not an unconditional silver bullet. When source knowledge is misaligned with the target distribution, transfer can actually damage performance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Negative Transfer</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When source domain inductive biases conflict with target task physics or semantics, fine-tuning achieves <strong>worse performance</strong> than training a random model from scratch (<MathText text="\mathcal{R}_{\text{target}}(\theta_S) > \mathcal{R}_{\text{target}}(\theta_{\text{random}})" />).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Domain Shift & Covariate Drift</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              High accuracy on the source task (95% on ImageNet) provides zero formal guarantee of high accuracy on target distributions (e.g. microscopic cytology, radar, endoscopic video).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Best Practices to Prevent Negative Transfer:</span>
          </div>
          <ul className="list-disc list-inside text-slate-400 space-y-1 leading-relaxed pl-1">
            <li><strong>Gradual Unfreezing:</strong> Train the new output head first with a frozen backbone, then unfreeze layer H5, and only unfreeze earlier layers if validation loss steadily improves.</li>
            <li><strong>Discriminative Learning Rates:</strong> Apply smaller learning rates to earlier layers (<MathText text="\eta_{\text{early}} = 10^{-5}" />) and larger rates to the newly initialized target head (<MathText text="\eta_{\text{head}} = 10^{-3}" />).</li>
            <li><strong>Ablation Baseline:</strong> Always compare the transferred model against a baseline trained from scratch on the target domain to verify that transfer provided a net positive gain.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
