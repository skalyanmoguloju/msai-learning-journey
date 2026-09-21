import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Layers,
  Sliders,
  ArrowRight,
  TrendingDown,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Database,
  Network,
  Eye,
  Workflow,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1DeepLearningFeatureLearning: React.FC = () => {
  // ── Interactive Demo 1: Traditional Handcrafted Classifier State ──
  const [tradEdge, setTradEdge] = useState<number>(0.8);
  const [tradTexture, setTradTexture] = useState<number>(0.3);
  const [tradShape, setTradShape] = useState<number>(0.9);
  const [tradW1, setTradW1] = useState<number>(2.0);
  const [tradW2, setTradW2] = useState<number>(-1.0);
  const [tradW3, setTradW3] = useState<number>(1.5);
  const [tradBias, setTradBias] = useState<number>(-1.1);

  const tradScoreZ = tradW1 * tradEdge + tradW2 * tradTexture + tradW3 * tradShape + tradBias;
  const tradProb = 1 / (1 + Math.exp(-tradScoreZ));
  const tradClassPredicted = tradProb >= 0.5 ? 'Cat (Class 1)' : 'Non-Cat (Class 0)';

  // ── Interactive Demo 2: Forward Propagation Worked Example State ──
  const [x1, setX1] = useState<number>(0.8);
  const [x2, setX2] = useState<number>(0.3);

  // Hidden Layer 1 parameters (2 neurons)
  const w11_1 = 1.0;
  const w12_1 = -1.0;
  const b1_1 = 0.0;

  const w21_1 = 0.5;
  const w22_1 = 0.5;
  const b2_1 = -0.2;

  // Pre-activations
  const a1 = w11_1 * x1 + w12_1 * x2 + b1_1;
  const a2 = w21_1 * x1 + w22_1 * x2 + b2_1;

  // ReLU Activations
  const h1 = Math.max(0, a1);
  const h2 = Math.max(0, a2);

  // Output Layer parameters (1 output neuron)
  const wOut1 = 2.0;
  const wOut2 = -1.0;
  const bOut = -0.2;

  const zOut = wOut1 * h1 + wOut2 * h2 + bOut;
  const probOut = 1 / (1 + Math.exp(-zOut));

  // ── Interactive Demo 3: Training Step & Parameter Gradient State ──
  const [predP, setPredP] = useState<number>(0.61);
  const [trueY, setTrueY] = useState<number>(1);
  const [oldW, setOldW] = useState<number>(2.0);
  const [lrEta, setLrEta] = useState<number>(0.1);
  const [hiddenActH, setHiddenActH] = useState<number>(0.5);

  const safeP = Math.min(Math.max(predP, 0.001), 0.999);
  const lossBCE = -(trueY * Math.log(safeP) + (1 - trueY) * Math.log(1 - safeP));
  const outputError = safeP - trueY;
  const weightGrad = outputError * hiddenActH;
  const newW = oldW - lrEta * weightGrad;

  // ── Interactive Visual Hierarchy Tab State ──
  const [selectedHierarchyLevel, setSelectedHierarchyLevel] = useState<'early' | 'middle' | 'deep'>('early');

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── Executive Overview & Goal ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Foundational Concept & Learning Goal</span>
          </h3>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            End-to-End Representation Learning
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          The defining leap of modern deep learning is <strong>automated representation learning</strong>. Rather than forcing human engineers to manually craft feature extractors from domain intuition, deep networks directly transform high-dimensional raw data into rich, hierarchical features optimized end-to-end to minimize prediction error.
        </p>
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 leading-relaxed flex items-start gap-3">
          <Workflow className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong>Core Trajectory:</strong> Trace the complete mathematical journey from a high-dimensional raw pixel tensor <MathText text="$x \in \mathbb{R}^{H \times W \times C}$" />, through composite hidden representations <MathText text="$h^{(l)} = g(W^{(l)}h^{(l-1)} + b^{(l)})$" />, to a logit score <MathText text="$z$" />, normalized prediction <MathText text="$\hat{y}$" />, cross-entropy loss <MathText text="$L$" />, and backpropagated gradient updates <MathText text="$\Delta W$" />.
          </div>
        </div>
      </div>

      {/* ── What Problem Does Deep Learning Solve? ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">The Problem: High-Dimensional Perceptual Gap</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A computer never directly observes high-level concepts like "fur," "whiskers," or "wheels." It only receives a massive grid of scalar pixel intensities. For a standard RGB image, the input tensor is structured as:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Raw Visual Tensor Form</span>
            <div className="text-base font-mono text-cyan-300">
              <MathText text="$$x \in \mathbb{R}^{H \times W \times C}$$" />
            </div>
            <p className="text-xs text-slate-400">
              Where <MathText text="$H$" /> = Height, <MathText text="$W$" /> = Width, and <MathText text="$C = 3$" /> (Red, Green, Blue channels).
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-900 px-4 py-3 rounded-lg border border-slate-700/60">
            <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Example: A 224×224 RGB image contains <strong>150,528 continuous numerical inputs</strong>.</span>
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">The Transformation Pathway</span>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center text-center">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-slate-400 block">Raw Input</span>
              <span className="text-xs font-mono text-cyan-300 block">Pixels <MathText text="$x$" /></span>
              <span className="text-[11px] text-slate-500">[0.12, 0.84, 0.39, ...]</span>
            </div>
            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-5 h-5 hidden md:block text-cyan-400" />
              <span className="md:hidden text-cyan-400 font-bold">↓</span>
            </div>
            <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-indigo-300 block">Learned Representation</span>
              <span className="text-xs font-mono text-indigo-200 block">Feature Vector <MathText text="$h$" /></span>
              <span className="text-[11px] text-indigo-400/80">Invariants, Semantics</span>
            </div>
            <div className="flex justify-center text-slate-500">
              <ArrowRight className="w-5 h-5 hidden md:block text-cyan-400" />
              <span className="md:hidden text-cyan-400 font-bold">↓</span>
            </div>
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-1">
              <span className="text-xs font-semibold text-emerald-300 block">Task Prediction</span>
              <span className="text-xs font-mono text-emerald-200 block"><MathText text="$\hat{y} = \sigma(w^T h + b)$" /></span>
              <span className="text-[11px] text-emerald-400/80">Cat vs. Dog Probability</span>
            </div>
          </div>
        </div>

        {/* Invariance Callout */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2 text-xs text-amber-200">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="w-4 h-4" />
            <span>The Challenge of High Intra-Class Variability</span>
          </div>
          <p className="leading-relaxed">
            A single cat can produce drastically different pixel matrices under subtle variations: 3D rotation, shifting sunlight, shadows, occlusion by furniture, or scale changes. A naive pixel comparison fails completely because the Euclidean distance between two pictures of the <em>same cat</em> in different lighting is often greater than the distance between a cat and a white wall. The system must discover <strong>nuanced invariant features</strong>.
          </p>
        </div>
      </div>

      {/* ── Traditional ML vs Deep Learning ──────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">The Traditional Machine Learning Paradigm</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In classical pattern recognition, feature extraction was decoupled from classification. A human domain expert spent months or years designing a fixed mathematical function <MathText text="$\phi(x)$" /> (such as SIFT, HOG, or Haralick textures).
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-cyan-300 space-y-2">
          <div>
            <MathText text="$$x \xrightarrow{\text{Handcrafted } \phi} r = \phi(x) = [r_1, r_2, r_3]^T \xrightarrow{\text{Linear Classifier}} z = \mathbf{w}^T \mathbf{r} + b \xrightarrow{\sigma(z)} \hat{p}$$" />
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Where <MathText text="$r_1 = \text{edge strength}$" />, <MathText text="$r_2 = \text{texture density}$" />, and <MathText text="$r_3 = \text{aspect ratio or shape}$" />.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/30 text-xs text-rose-300 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>The Critical Information Bottleneck</span>
          </div>
          <p className="leading-relaxed">
            The downstream classifier (e.g. Logistic Regression or SVM) can learn the weights <MathText text="$\mathbf{w}$" /> and bias <MathText text="$b$" />, but the feature extractor <MathText text="$\phi$" /> is <strong>frozen</strong>. If <MathText text="$\phi$" /> discarded subtle ear shape or paw contours, the classifier cannot recover that information.
          </p>
        </div>

        {/* ── Interactive Demo 1: Traditional Classifier Calculator ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Interactive Classifier Simulator: Fixed Handcrafted Features
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Formula: <MathText text="$z = w_1 r_1 + w_2 r_2 + w_3 r_3 + b$" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Edge Feature (<MathText text="$r_1$" />)</span>
                <span className="font-mono text-cyan-300">{tradEdge.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={tradEdge}
                onChange={(e) => setTradEdge(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Weight: <MathText text="$w_1 = 2.0$" /></span>
            </div>

            <div className="space-y-1 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Texture Feature (<MathText text="$r_2$" />)</span>
                <span className="font-mono text-cyan-300">{tradTexture.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={tradTexture}
                onChange={(e) => setTradTexture(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Weight: <MathText text="$w_2 = -1.0$" /></span>
            </div>

            <div className="space-y-1 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Shape Feature (<MathText text="$r_3$" />)</span>
                <span className="font-mono text-cyan-300">{tradShape.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={tradShape}
                onChange={(e) => setTradShape(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Weight: <MathText text="$w_3 = 1.5$" /></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 items-center">
            <div className="space-y-2 text-xs">
              <div className="text-slate-400">
                Affine Calculation:
              </div>
              <div className="font-mono text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <MathText
                  text={`$z = (2.0)(${tradEdge.toFixed(2)}) + (-1.0)(${tradTexture.toFixed(2)}) + (1.5)(${tradShape.toFixed(2)}) - 1.1 = ${tradScoreZ.toFixed(3)}$`}
                />
              </div>
            </div>

            <div className="space-y-2 text-center md:text-right">
              <div className="text-xs text-slate-400">Classification Outcome</div>
              <div className="flex items-center justify-center md:justify-end gap-3">
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  <MathText text={`$p = \\sigma(z) = ${(tradProb * 100).toFixed(1)}\\%$`} />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tradProb >= 0.5
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {tradClassPredicted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Deep Learning Pipeline & Worked Example ──────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-slate-100">The Deep Learning Pipeline: End-to-End Representation</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Deep learning replaces the human-designed feature extractor with trainable parameterized layers. Every layer computes an affine mapping followed by an elementwise non-linear activation:
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="$$h^{(l)} = g^{(l)}\left(W^{(l)}h^{(l-1)} + b^{(l)}\right), \quad \text{with } h^{(0)} = x$$" />
        </div>

        {/* ── Interactive Demo 2: Two-Neuron Forward Pass Simulator ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Worked 2-Neuron Numerical Forward Pass
            </span>
            <span className="text-[11px] text-slate-400">Activation Function: <MathText text="$\text{ReLU}(a) = \max(0, a)$" /></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Input <MathText text="$x_1$" /></span>
                <span className="font-mono text-cyan-300">{x1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1"
                max="2"
                step="0.05"
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Input <MathText text="$x_2$" /></span>
                <span className="font-mono text-cyan-300">{x2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1"
                max="2"
                step="0.05"
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Step-by-Step Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">1. Inputs</span>
              <div className="font-mono text-xs text-cyan-300 bg-slate-950 p-2 rounded">
                <MathText text={`$x = [${x1.toFixed(2)}, ${x2.toFixed(2)}]^T$`} />
              </div>
              <span className="text-[10px] text-slate-500 block">Raw scalar values</span>
            </div>

            <div className="p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-indigo-300 block">2. Pre-Activations</span>
              <div className="font-mono text-[11px] text-indigo-200 bg-slate-950 p-2 rounded space-y-1">
                <div><MathText text={`$a_1 = (1)x_1 - (1)x_2 = ${a1.toFixed(2)}$`} /></div>
                <div><MathText text={`$a_2 = 0.5x_1 + 0.5x_2 - 0.2 = ${a2.toFixed(2)}$`} /></div>
              </div>
              <span className="text-[10px] text-slate-500 block">Affine projections <MathText text="$W^{(1)}x + b^{(1)}$" /></span>
            </div>

            <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-cyan-300 block">3. ReLU Hidden Features</span>
              <div className="font-mono text-xs text-cyan-200 bg-slate-950 p-2 rounded space-y-1">
                <div><MathText text={`$h_1 = \\max(0, ${a1.toFixed(2)}) = ${h1.toFixed(2)}$`} /></div>
                <div><MathText text={`$h_2 = \\max(0, ${a2.toFixed(2)}) = ${h2.toFixed(2)}$`} /></div>
              </div>
              <span className="text-[10px] text-cyan-400/80 block">Learned internal representation <MathText text="$h^{(1)}$" /></span>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-emerald-300 block">4. Output Logit & Prob</span>
              <div className="font-mono text-[11px] text-emerald-200 bg-slate-950 p-2 rounded space-y-1">
                <div><MathText text={`$z = 2h_1 - h_2 - 0.2 = ${zOut.toFixed(2)}$`} /></div>
                <div className="font-bold text-emerald-400"><MathText text={`$p = \\sigma(z) = ${(probOut * 100).toFixed(1)}\\%$`} /></div>
              </div>
              <span className="text-[10px] text-emerald-400/80 block">Final classification decision</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature Definition & Hierarchical Composition ────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-slate-100">What Is a Feature & The Layered Hierarchy</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Inside a neural network, a <strong>feature</strong> is a numerical activation: a continuous value produced by a neuron in response to a specific structural pattern in its receptive field.
        </p>

        {/* Feature Hierarchy Explorer */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setSelectedHierarchyLevel('early')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedHierarchyLevel === 'early'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900'
              }`}
            >
              Early Layers (Low-Level)
            </button>
            <button
              onClick={() => setSelectedHierarchyLevel('middle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedHierarchyLevel === 'middle'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900'
              }`}
            >
              Middle Layers (Mid-Level)
            </button>
            <button
              onClick={() => setSelectedHierarchyLevel('deep')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedHierarchyLevel === 'deep'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900'
              }`}
            >
              Deep Layers (High-Level Semantics)
            </button>
          </div>

          {selectedHierarchyLevel === 'early' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Early Layers (Layers 1 – 2)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Respond to localized, low-level spatial gradients: oriented edges (horizontal, vertical, diagonal), Gabor-like filters, uniform color patches, and simple light-dark contrasts.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-cyan-300">45° Diagonal Edges</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-cyan-300">Color Opponency (Red/Green)</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-cyan-300">High-Contrast Borders</div>
              </div>
            </div>
          )}

          {selectedHierarchyLevel === 'middle' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Middle Layers (Layers 3 – 5)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Synthesize combinations of earlier edges into geometric motifs: junctions, corners, concentric rings, textures (mesh, stripes, fur), and localized shapes.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-indigo-300">Curved Contours</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-indigo-300">Repetitive Fur Textures</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-indigo-300">T-Junctions & Corners</div>
              </div>
            </div>
          )}

          {selectedHierarchyLevel === 'deep' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Deep Layers (Penultimate Embedding)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Form semantic, object-level representations: cat snouts, wheels, eyes, or full body postures. The penultimate layer output <MathText text="$z = h^{(L-1)}$" /> represents the image embedding vector.
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-emerald-300">Part Detectors (Ears/Nose)</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-emerald-300">Pose & Orientation Clusters</div>
                <div className="p-2 bg-slate-900 border border-slate-800 rounded text-emerald-300">Dense Embedding Vector <MathText text="$z \in \mathbb{R}^d$" /></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Depth and Non-Linearity: Matrix Collapse ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-slate-100">Why Depth & Non-Linearity Matter: The Matrix Collapse Proof</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Why can't we simply stack 100 linear layers to make an ultra-powerful model? Because a composition of linear transformations mathematically collapses into a <strong>single shallow linear map</strong>:
        </p>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="text-cyan-300 text-center text-sm">
            <MathText text="$$W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2) = W'x + b'$$" />
          </div>
          <p className="text-slate-400 font-sans text-xs text-center leading-relaxed">
            Where <MathText text="$W' = W_2 W_1$" /> and <MathText text="$b' = W_2 b_1 + b_2$" />. No matter how deep you build a purely linear network, it can only draw a flat hyperplane decision boundary!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Linear Layers Only</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Restricted to straight hyperplanes. Incapable of solving non-linearly separable problems like XOR, circular clusters, or nested manifolds.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Nonlinear Activations Inserted</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Activation functions (ReLU, GELU, Sigmoid) "bend" and fold the coordinate space, allowing deep networks to partition complex, non-convex, and disjoint decision volumes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Training & Gradient Updates: Interactive Simulator ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-100">End-to-End Optimization: Loss & Gradient Updates</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The network learns its features through the cyclical loop: <strong>Forward Pass <MathText text="$\to$" /> Loss Evaluation <MathText text="$\to$" /> Backpropagation <MathText text="$\to$" /> Parameter Update</strong>. For binary classification with sigmoid output and cross-entropy loss:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center font-mono text-xs">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-sans block">Cross-Entropy Loss</span>
            <div className="text-cyan-300"><MathText text="$L = -[y\ln\hat{p} + (1-y)\ln(1-\hat{p})]$" /></div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-sans block">Logit Error Residual</span>
            <div className="text-indigo-300"><MathText text="$\frac{\partial L}{\partial z} = \hat{p} - y$" /></div>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[11px] text-slate-400 font-sans block">Weight Gradient (Chain Rule)</span>
            <div className="text-emerald-300"><MathText text="$\frac{\partial L}{\partial w_j} = (\hat{p} - y) h_j$" /></div>
          </div>
        </div>

        {/* ── Interactive Demo 3: Backpropagation & Weight Update Simulator ── */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Live Gradient Descent Update Simulator
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              <MathText text="$w_{\text{new}} = w_{\text{old}} - \eta \frac{\partial L}{\partial w}$" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Predicted <MathText text="$\hat{p}$" /></span>
                <span className="font-mono text-cyan-300">{predP.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value={predP}
                onChange={(e) => setPredP(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>True Label (<MathText text="$y$" />)</span>
                <span className="font-mono text-indigo-300">{trueY}</span>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setTrueY(1)}
                  className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                    trueY === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  y = 1
                </button>
                <button
                  type="button"
                  onClick={() => setTrueY(0)}
                  className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                    trueY === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  y = 0
                </button>
              </div>
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Hidden <MathText text="$h_j$" /></span>
                <span className="font-mono text-amber-300">{hiddenActH.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.5"
                step="0.05"
                value={hiddenActH}
                onChange={(e) => setHiddenActH(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Learning Rate <MathText text="$\eta$" /></span>
                <span className="font-mono text-emerald-300">{lrEta.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={lrEta}
                onChange={(e) => setLrEta(parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Binary Loss <MathText text="$L$" /></span>
              <div className="text-base font-mono font-bold text-rose-400">
                {lossBCE.toFixed(4)}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Output Error <MathText text="$\hat{p} - y$" /></span>
              <div className="text-base font-mono font-bold text-amber-400">
                {outputError >= 0 ? `+${outputError.toFixed(4)}` : outputError.toFixed(4)}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Gradient <MathText text="$\frac{\partial L}{\partial w}$" /></span>
              <div className="text-base font-mono font-bold text-cyan-400">
                {weightGrad >= 0 ? `+${weightGrad.toFixed(4)}` : weightGrad.toFixed(4)}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Updated Weight <MathText text="$w_{\text{new}}$" /></span>
              <div className="text-base font-mono font-bold text-emerald-400">
                {newW.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Limitations, Practical Challenges & Expressivity vs Learnability ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <h3 className="text-base font-bold text-slate-100">Limitations & The Expressivity vs. Learnability Gap</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          While deep learning eliminates manual feature engineering, it introduces serious computational and theoretical challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Database className="w-4 h-4" />
              <span>Data Hunger</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Without inductive biases or manual features, deep models require tens of thousands of labeled samples to avoid catastrophic memorization/overfitting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>Computational Cost</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-dimensional matrix multiplications across millions of parameters demand dedicated accelerators (GPUs, TPUs) and massive VRAM.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <Activity className="w-4 h-4" />
              <span>Vanishing / Exploding Gradients</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Repeatedly multiplying Jacobian matrices across dozens of layers causes gradients to either shrink exponentially to zero or blow up to infinity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Non-Convex Optimization</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Loss surfaces are filled with saddle points, ill-conditioned curvature, and local minima sensitive to learning rate and weight initialization.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
              <HelpCircle className="w-4 h-4" />
              <span>Interpretability & Black Box</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because internal features are entangled and distributed over high-dimensional vectors, diagnosing why an edge-case failure occurred is non-trivial.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>Distribution Shift</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep networks heavily exploit statistical correlations that may dissolve when testing data shifts slightly out-of-distribution (OOD).
            </p>
          </div>
        </div>

        {/* Theoretical Axiom Callout */}
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/40 space-y-2 text-xs text-indigo-200">
          <span className="font-bold text-indigo-300 uppercase tracking-wider block">
            The Fundamental Theoretical Distinction
          </span>
          <div className="font-mono text-sm text-cyan-300 text-center py-1">
            <MathText text="$$\text{Expressive Capacity (Function Representation)} \neq \text{Learnability (Optimization Trajectory)}$$" />
          </div>
          <p className="leading-relaxed">
            The <strong>Universal Approximation Theorem</strong> guarantees that a neural network with non-linear activations can represent any continuous function on a compact domain given sufficient width or depth. However, <em>can represent</em> does not equal <em>can learn</em>: gradient descent might diverge, get trapped in pathological terrain, or overfit noisy samples.
          </p>
        </div>
      </div>
    </div>
  );
};
