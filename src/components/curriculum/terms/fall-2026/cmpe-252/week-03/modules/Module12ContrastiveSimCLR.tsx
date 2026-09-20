import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Eye,
  Sliders,
  Maximize2,
  RefreshCw,
  Compass,
  Cpu,
  Database,
  GitBranch,
  Target
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module12ContrastiveSimCLR: React.FC = () => {
  // ── Widget 1: 2D Latent Vector Explorer State ──
  const [z1X, setZ1X] = useState<number>(1.0);
  const [z1Y, setZ1Y] = useState<number>(2.0);
  const [z2X, setZ2X] = useState<number>(1.5);
  const [z2Y, setZ2Y] = useState<number>(2.2);

  // Vector calculations
  const dotProd = z1X * z2X + z1Y * z2Y;
  const norm1 = Math.hypot(z1X, z1Y);
  const norm2 = Math.hypot(z2X, z2Y);
  const euclideanDist = Math.hypot(z1X - z2X, z1Y - z2Y);
  const cosineSim = (norm1 > 0 && norm2 > 0) ? dotProd / (norm1 * norm2) : 0;

  // ── Widget 2: Interactive Contrastive Loss Calculator State ──
  const [posSim, setPosSim] = useState<number>(0.90);
  const [negSim1, setNegSim1] = useState<number>(0.20);
  const [negSim2, setNegSim2] = useState<number>(0.10);
  const [temp, setTemp] = useState<number>(0.50);

  // Scaled logits
  const sPosScaled = posSim / temp;
  const sNeg1Scaled = negSim1 / temp;
  const sNeg2Scaled = negSim2 / temp;

  // Exponentials
  const expPos = Math.exp(sPosScaled);
  const expNeg1 = Math.exp(sNeg1Scaled);
  const expNeg2 = Math.exp(sNeg2Scaled);
  const denom = expPos + expNeg1 + expNeg2;

  // Probability and loss
  const pPositive = expPos / denom;
  const contrastiveLoss = -Math.log(Math.max(1e-9, pPositive));

  // ── Widget 3: SimCLR In-Batch Negatives State ──
  const [batchN, setBatchN] = useState<number>(4);
  const totalViews = 2 * batchN;
  const negativesPerAnchor = totalViews - 2;

  // ── Pair Type Interactive Quiz ──
  const [selectedPairRole, setSelectedPairRole] = useState<'same' | 'different'>('same');

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Master the foundational mechanics of Self-Supervised Contrastive Representation Learning and the SimCLR framework. Trace an image through stochastic data augmentations, dual encoder-projector forward passes, cosine similarity metrics on the unit hypersphere, and Normalized Temperature-Scaled Cross-Entropy (NT-Xent) optimization.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The Core Intuition:</strong> Instead of predicting human-annotated class labels, contrastive learning pulls together transformed views of the same scene (positive attraction) while repelling views from distinct scenes (negative repulsion). This forces the network to organize its latent space around semantic invariants.
        </div>
      </div>

      {/* ── Section: Why Learn Representations? ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Unsupervised Feature Extraction
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Why Learn Representations?</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          A raw sensory observation, such as an RGB image of resolution <MathText text="224 \times 224 \times 3" />, contains over 150,000 uncompressed pixel coordinates. Individual pixels are notoriously noisy, sensitive to minute lighting shifts, and devoid of explicit semantics.
          A deep neural network encoder <MathText text="f_\theta(\cdot)" /> maps these high-dimensional pixels into a compact coordinate vector <MathText text="\mathbf{z} \in \mathbb{R}^d" />:
        </p>

        {/* Pipeline Diagram */}
        <div className="flex items-center justify-between flex-wrap gap-2 py-2 text-xs font-mono text-center">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex-1 min-w-[130px]">
            <div className="text-[11px] text-slate-400 uppercase">Input Sample</div>
            <div className="text-indigo-400 font-bold mt-1"><MathText text="\mathbf{x} \in \mathbb{R}^D" /></div>
            <div className="text-[10px] text-slate-400 mt-0.5">Raw Pixels</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
          <div className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 flex-1 min-w-[130px]">
            <div className="text-[11px] text-indigo-300 uppercase">Deep Encoder</div>
            <div className="text-indigo-300 font-bold mt-1"><MathText text="f_\theta(\mathbf{x})" /></div>
            <div className="text-[10px] text-indigo-300/80 mt-0.5">ResNet / ViT</div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
          <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 flex-1 min-w-[130px]">
            <div className="text-[11px] text-cyan-300 uppercase">Latent Embedding</div>
            <div className="text-cyan-300 font-bold mt-1"><MathText text="\mathbf{z} \in \mathbb{R}^d" /></div>
            <div className="text-[10px] text-cyan-300/80 mt-0.5">Feature Vector</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
          <strong className="text-indigo-300 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Embeddings vs. Class Labels:</span>
          </strong>
          <p className="text-slate-400 leading-relaxed">
            The embedding <MathText text="\mathbf{z}" /> is not an explicit categorical label (like "golden retriever" or "cat"). It is a continuous representation of semantic properties (fur texture, ear geometry, scale). Once trained, a simple linear probe classifier attached to <MathText text="\mathbf{z}" /> can learn downstream tasks using very few labeled samples.
          </p>
        </div>
      </div>

      {/* ── Section: Latent Space and Embeddings (Interactive 2D Vector Tool) ─ */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Geometric Metric Space
            </span>
            <h3 className="text-xl font-bold text-slate-100">Latent Space Geometry: Distance vs. Cosine Similarity</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Interactive Vector Metric Lab
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The <strong>latent space</strong> is the continuous manifold where learned embeddings reside. In high-dimensional spaces, proximity reflects semantic agreement.
          Compare two 2D vectors below to examine the critical mathematical difference between <strong className="text-amber-400">Euclidean Distance</strong> (coordinate separation) and <strong className="text-emerald-400">Cosine Similarity</strong> (angular alignment):
        </p>

        {/* Vector Inputs & Calculations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Vector 1: <MathText text="\mathbf{z}_1 = (x_1, y_1)" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">x₁ Coordinate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={z1X}
                    onChange={(e) => setZ1X(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">y₁ Coordinate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={z1Y}
                    onChange={(e) => setZ1Y(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Vector 2: <MathText text="\mathbf{z}_2 = (x_2, y_2)" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">x₂ Coordinate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={z2X}
                    onChange={(e) => setZ2X(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">y₂ Coordinate</label>
                  <input
                    type="number"
                    step="0.1"
                    value={z2Y}
                    onChange={(e) => setZ2Y(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Metric Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
                <span className="text-[11px] font-semibold text-amber-400 uppercase">Euclidean Distance</span>
                <div className="text-lg font-mono font-bold text-amber-300">{euclideanDist.toFixed(3)}</div>
                <div className="text-[10px] text-slate-400"><MathText text="\|\mathbf{z}_1 - \mathbf{z}_2\|" /></div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase">Cosine Similarity</span>
                <div className="text-lg font-mono font-bold text-emerald-300">{cosineSim.toFixed(3)}</div>
                <div className="text-[10px] text-slate-400"><MathText text="\frac{\mathbf{z}_1 \cdot \mathbf{z}_2}{\|\mathbf{z}_1\| \|\mathbf{z}_2\|}" /></div>
              </div>
            </div>
          </div>

          {/* Dynamic 2D SVG Coordinate Plot */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
            <div className="w-full max-w-[340px] aspect-square relative flex items-center justify-center">
              <svg viewBox="-40 -40 80 80" className="w-full h-full overflow-visible">
                {/* Axes */}
                <line x1="-36" y1="0" x2="36" y2="0" stroke="#334155" strokeWidth="0.8" />
                <line x1="0" y1="-36" x2="0" y2="36" stroke="#334155" strokeWidth="0.8" />

                {/* Grid ticks */}
                {[-30, -20, -10, 10, 20, 30].map((t) => (
                  <g key={t}>
                    <line x1={t} y1="-1.5" x2={t} y2="1.5" stroke="#475569" strokeWidth="0.6" />
                    <line x1="-1.5" y1={t} x2="1.5" y2={t} stroke="#475569" strokeWidth="0.6" />
                  </g>
                ))}

                {/* Dashed connector line for Euclidean Distance */}
                <line
                  x1={z1X * 8}
                  y1={-z1Y * 8}
                  x2={z2X * 8}
                  y2={-z2Y * 8}
                  stroke="#f59e0b"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                  opacity="0.8"
                />

                {/* Vector z1 Arrow */}
                <line
                  x1="0"
                  y1="0"
                  x2={z1X * 8}
                  y2={-z1Y * 8}
                  stroke="#818cf8"
                  strokeWidth="2"
                  markerEnd="url(#arrow1)"
                />
                <circle cx={z1X * 8} cy={-z1Y * 8} r="2.5" fill="#818cf8" />
                <text
                  x={z1X * 8 + 3}
                  y={-z1Y * 8 - 3}
                  fill="#c7d2fe"
                  fontSize="4.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  z₁ ({z1X.toFixed(1)}, {z1Y.toFixed(1)})
                </text>

                {/* Vector z2 Arrow */}
                <line
                  x1="0"
                  y1="0"
                  x2={z2X * 8}
                  y2={-z2Y * 8}
                  stroke="#22d3ee"
                  strokeWidth="2"
                />
                <circle cx={z2X * 8} cy={-z2Y * 8} r="2.5" fill="#22d3ee" />
                <text
                  x={z2X * 8 + 3}
                  y={-z2Y * 8 + 5}
                  fill="#a5f3fc"
                  fontSize="4.5"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  z₂ ({z2X.toFixed(1)}, {z2Y.toFixed(1)})
                </text>

                {/* Origin */}
                <circle cx="0" cy="0" r="1.5" fill="#94a3b8" />
              </svg>
            </div>

            <div className="w-full text-center pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
              <strong className="text-slate-300">Geometric Takeaway:</strong> If <MathText text="\mathbf{z}_2 = 2\mathbf{z}_1" />, their Euclidean distance expands, but their Cosine Similarity remains perfectly <strong className="text-emerald-400">1.0</strong> because they point along the exact same ray.
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Making Two Transformed Views of One Example ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Data Augmentation Policy
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Generating Two Views of One Example</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Contrastive learning begins without any external human annotations. Instead, it creates artificial supervision by applying two independent stochastic data augmentation operators <MathText text="t_1, t_2 \sim \mathcal{T}" /> to the same original image <MathText text="\mathbf{x}" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\mathbf{x}_1 = t_1(\mathbf{x}), \quad \mathbf{x}_2 = t_2(\mathbf{x}) \quad \text{where } t_1, t_2 \sim \mathcal{T}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Identity-Preserving Transformation</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Random resized cropping, horizontal flipping, Gaussian blur, and color jittering alter superficial pixel statistics while preserving the semantic object identity (a cropped dog is still recognizable as a dog).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Pathological Transformations</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an augmentation removes crucial semantic features (e.g. cropping only a patch of grass, or aggressive solarization that destroys digits 6 vs 9), the model is erroneously forced to treat distinct concepts as identical.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section: Positive Pairs ────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Attraction Dynamics
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Positive Pairs</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          In contrastive learning, a <strong>positive pair</strong> is not an individual image labeled with a "+1" class. It is an equivalence relationship between two views originating from the same source:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="\text{Originating from same } \mathbf{x} \implies (\mathbf{x}_1, \mathbf{x}_2) \text{ forms a positive pair} \implies \text{Maximize } \text{sim}(f_\theta(\mathbf{x}_1), f_\theta(\mathbf{x}_2))" />
        </div>

        {/* Interactive Check Role */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pair Relationship Classifier</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedPairRole('same')}
              className={`p-3 rounded-xl text-left border text-xs transition-all ${
                selectedPairRole === 'same'
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-slate-200 mb-1">Shared Original Image</div>
              Two augmented views generated from the exact same source image x.
            </button>
            <button
              onClick={() => setSelectedPairRole('different')}
              className={`p-3 rounded-xl text-left border text-xs transition-all ${
                selectedPairRole === 'different'
                  ? 'bg-rose-500/15 border-rose-500/50 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-semibold text-slate-200 mb-1">Disparate Original Images</div>
              Views sampled from two completely independent source images.
            </button>
          </div>

          <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
            selectedPairRole === 'same'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}>
            {selectedPairRole === 'same' ? (
              <div>
                <strong>Positive Pair Confirmed:</strong> Because both views share a common underlying source, the loss function penalizes any angular disparity and pulls their embeddings together on the unit sphere.
              </div>
            ) : (
              <div>
                <strong>In-Batch Negative Pair:</strong> Because these views originate from different sources, contrastive optimization exerts repulsive pressure, pushing their embeddings apart to prevent representation collapse.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Section: Negative Examples and Collapse ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Repulsive Pressure
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Negative Examples and Representation Collapse</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Why can't we simply train the network using only positive pairs? If the objective only pulled positive pairs together, gradient descent would discover an effortless degenerate shortcut known as <strong>representation collapse</strong>:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-rose-400">
          <MathText text="\forall \mathbf{x}, \; f_\theta(\mathbf{x}) = \mathbf{c} \implies \text{sim}(f_\theta(\mathbf{x}_1), f_\theta(\mathbf{x}_2)) = 1.0 \quad (\text{Trivial Zero-Loss Collapse})" />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          By collapsing every single image in the universe to the exact same static coordinate vector <MathText text="\mathbf{c}" />, the distance between all pairs is trivially zero. The network achieves perfect "positive similarity" while learning zero discriminatory features!
        </p>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/30 space-y-2 text-xs">
          <h4 className="font-semibold text-indigo-300 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span>The Push-Pull Electrostatic Analogy:</span>
          </h4>
          <p className="text-slate-300 leading-relaxed">
            In-batch negatives supply the essential repulsive force. Positive pairs act like springs pulling two views together (<strong>Alignment</strong>), while negatives act like electrostatic repulsion pushing unrelated examples uniformly across the spherical surface (<strong>Uniformity</strong>).
          </p>
        </div>
      </div>

      {/* ── Section: Contrastive Loss (NT-Xent): Step-by-Step Calculator ───── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Objective Function
            </span>
            <h3 className="text-xl font-bold text-slate-100">Contrastive Loss: The InfoNCE / NT-Xent Formulation</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Interactive Probability & Loss Engine
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Normalized Temperature-Scaled Cross-Entropy (NT-Xent) treats the contrastive choice as a multi-class softmax classification problem. For anchor view <MathText text="i" /> and its positive partner <MathText text="j" />:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="\mathcal{L}_i = -\log \frac{\exp(\text{sim}(\mathbf{z}_i, \mathbf{z}_j) / \tau)}{\sum_{k \neq i} \exp(\text{sim}(\mathbf{z}_i, \mathbf{z}_k) / \tau)} = -\log(p_{\text{positive}})" />
        </div>

        {/* Interactive Sliders */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Positive Similarity */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-emerald-400">Pos Sim (s_pos)</span>
                <span className="font-mono text-emerald-300">{posSim.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.0"
                max="1.0"
                step="0.05"
                value={posSim}
                onChange={(e) => setPosSim(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Negative 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-rose-400">Neg 1 Sim (s_neg1)</span>
                <span className="font-mono text-rose-300">{negSim1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.0"
                max="1.0"
                step="0.05"
                value={negSim1}
                onChange={(e) => setNegSim1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            {/* Negative 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-rose-400">Neg 2 Sim (s_neg2)</span>
                <span className="font-mono text-rose-300">{negSim2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-1.0"
                max="1.0"
                step="0.05"
                value={negSim2}
                onChange={(e) => setNegSim2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-amber-400">Temperature (τ)</span>
                <span className="font-mono text-amber-300">{temp.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1.0"
                step="0.05"
                value={temp}
                onChange={(e) => setTemp(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Mathematical Step Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">1. Temperature Scaling & Exponents</span>
              <div className="text-slate-300">
                <MathText text={`s_{\\text{pos}} / \\tau = ${posSim.toFixed(2)} / ${temp.toFixed(2)} = ${sPosScaled.toFixed(3)} \\implies e^{${sPosScaled.toFixed(3)}} = ${expPos.toFixed(3)}`} />
              </div>
              <div className="text-slate-400 text-[11px]">
                Negatives: <MathText text={`e^{${sNeg1Scaled.toFixed(2)}} = ${expNeg1.toFixed(3)}, \\; e^{${sNeg2Scaled.toFixed(2)}} = ${expNeg2.toFixed(3)}`} />
              </div>
              <div className="text-slate-300 pt-1">
                Denominator: <MathText text={`\\sum e^{s/\\tau} = ${denom.toFixed(3)}`} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">2. Softmax Probability & Negative Log Loss</span>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">p_positive:</span>
                <span className="text-emerald-400 font-bold font-mono">{(pPositive * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, pPositive * 100))}%` }}
                />
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-cyan-300 font-bold">InfoNCE Loss:</span>
                <span className="text-lg font-bold text-cyan-300 font-mono">
                  <MathText text={`\\mathcal{L} = -\\log(${pPositive.toFixed(3)}) = ${contrastiveLoss.toFixed(3)}`} />
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed">
            <strong>Role of Temperature $\tau$:</strong> When $\tau$ is small (e.g. $0.1$), the exponential function sharply amplifies differences, severely penalizing any negative with high similarity ("hard negative mining"). When $\tau$ is large, the loss treats all negatives more uniformly.
          </div>
        </div>
      </div>

      {/* ── Section: SimCLR Framework: How a Batch Is Processed ────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Batch Scale & Architecture
            </span>
            <h3 className="text-xl font-bold text-slate-100">SimCLR: In-Batch Negatives and the Projection Head</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Batch Graph Explorer
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          SimCLR avoids external memory banks by creating <strong>two views for every image in a mini-batch</strong>. If the mini-batch contains <MathText text="N" /> original images, the network processes <MathText text="2N" /> views through a shared backbone and projection head:
        </p>

        {/* Projection Head Architectural Callout */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/40 space-y-2">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4" />
            <span>The SimCLR Breakthrough: The Non-Linear Projection Head $g(\cdot)$</span>
          </div>
          <div className="text-xs font-mono text-center py-1 text-indigo-300">
            <MathText text="\mathbf{x} \xrightarrow{\text{Aug}} \tilde{\mathbf{x}} \xrightarrow{\text{Backbone } f(\cdot)} \mathbf{h} \in \mathbb{R}^{2048} \xrightarrow{\text{MLP } g(\cdot)} \mathbf{z} \in \mathbb{R}^{128} \xrightarrow{\text{NT-Xent}} \mathcal{L}" />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The contrastive loss forces <MathText text="\mathbf{z}" /> to discard color and spatial orientation details to achieve transformation invariance. By inserting the non-linear projection head <MathText text="g(\mathbf{h}) = \mathbf{W}^{(2)}\sigma(\mathbf{W}^{(1)}\mathbf{h})" />, the downstream representation <MathText text="\mathbf{h}" /> preserves rich object coordinates and textures, yielding <strong className="text-emerald-400">+10% higher linear probe accuracy</strong> than applying loss directly to <MathText text="\mathbf{h}" />!
          </p>
        </div>

        {/* Batch Size Slider */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="batch-size-slider" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Original Images in Mini-Batch ($N$)</span>
            </label>
            <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              N = {batchN} Originals
            </span>
          </div>

          <input
            id="batch-size-slider"
            type="range"
            min="2"
            max="8"
            step="1"
            value={batchN}
            onChange={(e) => setBatchN(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[11px]">Transformed Views</div>
              <div className="text-lg font-bold text-indigo-300 mt-0.5">{totalViews}</div>
              <div className="text-[10px] text-slate-400"><MathText text="2N" /></div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-emerald-400 text-[11px]">Positives Per Anchor</div>
              <div className="text-lg font-bold text-emerald-300 mt-0.5">1</div>
              <div className="text-[10px] text-emerald-400">Sibling View</div>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
              <div className="text-rose-400 text-[11px]">Negatives Per Anchor</div>
              <div className="text-lg font-bold text-rose-300 mt-0.5">{negativesPerAnchor}</div>
              <div className="text-[10px] text-rose-400"><MathText text="2N - 2" /></div>
            </div>
          </div>

          {/* View Graph Render */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Anchor View Evaluation Graph (Assuming Anchor is View 1):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {Array.from({ length: totalViews }, (_, i) => {
                const viewId = i + 1;
                const isAnchor = viewId === 1;
                const isPositive = viewId === 2;
                return (
                  <div
                    key={viewId}
                    className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                      isAnchor
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-md shadow-cyan-950/40'
                        : isPositive
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-[10px] uppercase">
                      {isAnchor ? 'Anchor' : isPositive ? 'Positive' : 'Negative'}
                    </div>
                    <div className="text-sm mt-0.5">v{viewId}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">
                      img_{Math.ceil(viewId / 2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs text-indigo-300">
            <MathText text="\mathcal{L}_{\text{batch}} = \frac{1}{2N} \sum_{i=1}^{2N} \mathcal{L}_i \quad (\text{Both } v_1 \to v_2 \text{ and } v_2 \to v_1 \text{ are computed})" />
          </div>
        </div>
      </div>

      {/* ── Section: Practical Limitations ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Diagnostics & Considerations
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100">Practical Limitations & Nuances</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          While self-supervised contrastive learning eliminates human annotation overhead, it introduces distinct engineering tradeoffs:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>False Negative Problem</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If two distinct original images in the batch happen to be two different golden retrievers, the algorithm erroneously treats them as negatives, forcing the encoder to push similar concepts apart.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <h4 className="text-sm font-semibold text-rose-300 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-rose-400" />
              <span>Extreme Batch Size Requirements</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              SimCLR relies heavily on large batch sizes (e.g. <MathText text="N = 4096 \implies 8190" /> in-batch negatives) to provide sufficiently informative hard negatives, necessitating high-memory TPU/GPU clusters.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
          <strong className="text-indigo-300 font-semibold flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>Downstream Evaluation: The Linear Probe Protocol</span>
          </strong>
          <p className="text-slate-400 leading-relaxed">
            After pretraining SimCLR on millions of unlabeled images, the projection head <MathText text="g(\cdot)" /> is discarded. The backbone encoder weights <MathText text="f_\theta(\cdot)" /> are frozen, and a single linear classification head is trained on representations <MathText text="\mathbf{h}" /> using target class labels.
          </p>
        </div>
      </div>
    </div>
  );
};
