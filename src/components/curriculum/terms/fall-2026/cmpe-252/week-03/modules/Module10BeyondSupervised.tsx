import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Database,
  Tag,
  Eye,
  Shuffle,
  Compass,
  GitBranch,
  Repeat,
  Share2,
  Cpu,
  MousePointer,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Maximize2,
  RotateCcw,
  Zap,
  Globe,
  Radio,
  Clock
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module10BeyondSupervised: React.FC = () => {
  // --- Playground 1: Shots Slider & Adaptation Regime State ---
  const [shots, setShots] = useState<number>(5);

  // --- Playground 2: Active Learning Uncertainty Allocator State ---
  const [uncertaintyPct, setUncertaintyPct] = useState<number>(78);
  const [labelBudget, setLabelBudget] = useState<number>(20);

  const priorityPicks = Math.max(1, Math.round(labelBudget * (uncertaintyPct / 100)));
  const explorationPicks = labelBudget - priorityPicks;

  // --- Playground 3: Real-World Paradigm Matcher State ---
  const [selectedSituation, setSelectedSituation] = useState<string>('few');

  const situationRecommendations: Record<
    string,
    { title: string; badge: string; recommendation: string; formula: string; color: string }
  > = {
    labels: {
      title: 'Standard Supervised Learning',
      badge: 'High Label Density',
      recommendation:
        'Train end-to-end minimizing empirical task loss over paired (x, y) observations. Leverage standard backpropagation and gradient descent.',
      formula: '\\min_\\theta \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}\\left(y_i, f_\\theta(\\mathbf{x}_i)\\right)',
      color: 'text-indigo-400'
    },
    few: {
      title: 'Semi-Supervised Learning & Pseudo-Labeling',
      badge: 'Scattered Labels + Abundant Data',
      recommendation:
        'Combine supervised ground truth on the small labeled set with consistency regularization or confidence-thresholded pseudo-labels on the unlabeled set.',
      formula: '\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{labeled}} + \\lambda \\mathcal{L}_{\\text{unlabeled}}',
      color: 'text-cyan-400'
    },
    raw: {
      title: 'Self-Supervised Pretraining (SSL)',
      badge: 'Zero Human Annotations',
      recommendation:
        'Design a pretext task (e.g. masked token modeling or contrastive feature attraction) where targets are synthesized autonomously from the raw unannotated data.',
      formula: '\\mathcal{L} = \\mathcal{L}\\left(y_{\\text{pseudo}}, f_\\theta(\\tilde{\\mathbf{x}})\\right)',
      color: 'text-purple-400'
    },
    shift: {
      title: 'Domain Adaptation & Invariant Learning',
      badge: 'Distribution / Covariate Shift',
      recommendation:
        'Align latent feature manifolds across source and target domains using adversarial domain discriminators or Maximum Mean Discrepancy (MMD).',
      formula: 'P_S(\\mathbf{x}, y) \\neq P_T(\\mathbf{x}, y) \\implies \\min_\\theta \\mathcal{L}_{\\text{task}} + \\gamma \\mathcal{L}_{\\text{domain}}',
      color: 'text-amber-400'
    },
    new: {
      title: 'Transfer & Few-Shot Learning',
      badge: 'Novel Downstream Task (1-5 Samples)',
      recommendation:
        'Initialize from a large pretrained foundation backbone and adapt a lightweight task head using Prototypical Metric Networks or parameter-efficient fine-tuning (PEFT).',
      formula: '\\mathbf{c}_k = \\frac{1}{|\\mathcal{S}_k|} \\sum_{(\\mathbf{x}_i, y_i) \\in \\mathcal{S}_k} f_\\theta(\\mathbf{x}_i)',
      color: 'text-emerald-400'
    },
    time: {
      title: 'Continual / Lifelong Learning',
      badge: 'Non-Stationary Streaming Tasks',
      recommendation:
        'Employ memory rehearsal buffers or Elastic Weight Consolidation (EWC) to protect previous task parameters from catastrophic forgetting.',
      formula: '\\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{new}} + \\lambda \\sum_j F_j (\\theta_j - \\theta_{j,\\text{old}})^2',
      color: 'text-rose-400'
    },
    modal: {
      title: 'Multimodal Fusion Architecture',
      badge: 'Heterogeneous Sensor Feeds',
      recommendation:
        'Project distinct sensory modalities (e.g. vision, text, audio) into a unified shared embedding space using cross-attention or multimodal contrastive projection.',
      formula: '\\mathbf{h}_{\\text{joint}} = \\text{CrossAttention}(\\mathbf{h}_{\\text{image}}, \\mathbf{h}_{\\text{text}})',
      color: 'text-teal-400'
    },
    cost: {
      title: 'Active Learning & Uncertainty Sampling',
      badge: 'High Annotation Cost / Expert Bottleneck',
      recommendation:
        'Train an initial baseline and query human annotators only for observations situated nearest the model decision boundary (maximum Shannon entropy).',
      formula: 'x^* = \\arg\\max_{x \\in \\mathcal{U}} \\mathcal{H}(P(y \\mid x; \\theta))',
      color: 'text-orange-400'
    }
  };

  const activeRec = situationRecommendations[selectedSituation];

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ORDINARY SUPERVISED LEARNING & THE LABEL BOTTLENECK */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Ordinary Supervised Learning &amp; The Label Bottleneck</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            The Classical Benchmark
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Standard supervised learning assumes an external oracle provides explicit, verified labels <MathText text="y" /> for
          every input observation <MathText text="\mathbf{x}" />. The network learns by backpropagating prediction errors:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="(\mathbf{x}, y) \longrightarrow \hat{y} = f_\theta(\mathbf{x}) \longrightarrow \mathcal{L}(y, \hat{y}) \longrightarrow \theta \leftarrow \theta - \eta \nabla_\theta \mathcal{L}" />
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
            <strong className="text-amber-300 block">The Fundamental Real-World Bottleneck:</strong>
            <p>
              While conceptually straightforward, high-quality human annotation is extraordinarily expensive, slow,
              unscalable, and error-prone (e.g. specialized radiologists segmenting tumors, legal teams parsing contracts).
              Modern machine learning has developed diverse paradigms to extract intelligence when labels are scarce,
              dynamic, or completely missing.
            </p>
          </div>
        </div>
      </div>

      {/* SEMI-SUPERVISED LEARNING & PSEUDO-LABELING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Semi-Supervised Learning &amp; Pseudo-Labeling</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
            Hybrid Supervision
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Semi-supervised learning operates when an organization possesses a tiny pool of expensive labeled samples{' '}
          <MathText text="\mathcal{D}_L = \{(\mathbf{x}_i, y_i)\}_{i=1}^{N_L}" /> accompanied by a massive ocean of unannotated
          samples <MathText text="\mathcal{D}_U = \{\mathbf{x}_j\}_{j=1}^{N_U}" /> (where <MathText text="N_U \gg N_L" />).
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="\mathcal{L}_{\\text{total}} = \\mathcal{L}_{\\text{labeled}}(\\mathcal{D}_L; \\theta) + \\lambda \\mathcal{L}_{\\text{unlabeled}}(\\mathcal{D}_U; \\theta)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Consistency Regularization</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enforces that applying minor realistic perturbations (e.g. data augmentations, noise) to an unlabeled image{' '}
              <MathText text="\tilde{\mathbf{x}}" /> should yield identical model predictions: <MathText text="f_\theta(\mathbf{x}) \approx f_\theta(\tilde{\mathbf{x}})" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Confidence Pseudo-Labeling</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              When the model predicts class probability exceeding a high confidence threshold (e.g. <MathText text="\max P(y \mid \mathbf{x}) > 0.95" />),
              the prediction is converted into a synthetic target for retraining.
            </p>
          </div>
        </div>
      </div>

      {/* UNSUPERVISED & SELF-SUPERVISED LEARNING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Unsupervised vs. Self-Supervised Learning</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
            Autonomous Discovery
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Both paradigms consume entirely unannotated data <MathText text="\mathcal{D} = \{\mathbf{x}_i\}" />, but their
          mathematical formulation and training objectives diverge fundamentally:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Classical Unsupervised */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wider">Classical Unsupervised Learning</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Clustering / Density</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discovers geometric clusters, low-dimensional manifolds, or anomalous outliers without explicit predictive targets.
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-300">
              <MathText text="\text{K-Means: } \quad \min_{\boldsymbol{\mu}} \sum_{i=1}^N \left\| \mathbf{x}_i - \boldsymbol{\mu}_{c_i} \right\|^2" />
            </div>
          </div>

          {/* Self-Supervised */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-300 uppercase tracking-wider">Self-Supervised Learning (SSL)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Pretext Tasks</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomously synthesizes supervisory prediction targets from the input structure itself (e.g. masking words, predicting missing image patches).
            </p>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center font-mono text-xs text-purple-200">
              <MathText text="\text{Masked Modeling: } \quad \mathcal{L} = \mathcal{L}\left(y_{\text{masked}}, f_\theta(\tilde{\mathbf{x}})\right)" />
            </div>
          </div>
        </div>
      </div>

      {/* POSITIVE-UNLABELED (PU) & PNU LEARNING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Positive-Unlabeled (PU) &amp; PNU Learning</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
            One-Class Labeling
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In countless mission-critical settings (e.g. financial fraud, cybersecurity intrusions, medical diagnoses),
          investigators only verify confirmed positive incidents <MathText text="\mathcal{D}_P" />. The rest of the database
          remains uninspected <MathText text="\mathcal{D}_U" />.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-rose-400">
          <MathText text="\text{Fundamental Axiom: } \quad \text{Unlabeled} \neq \text{Negative!}" />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          An unflagged financial transaction may be genuinely legitimate, or it may be an undetected criminal heist.
          Treating all unlabeled data as negative severely corrupts empirical risk minimization.
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Paradigm</th>
                <th className="pb-2.5 w-1/4">Confirmed Positives (P)</th>
                <th className="pb-2.5 w-1/4">Confirmed Negatives (N)</th>
                <th className="pb-2.5 w-1/4">Unlabeled Pool (U)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Positive-Unlabeled (PU)</td>
                <td className="py-2.5 text-emerald-400 font-semibold">Available</td>
                <td className="py-2.5 text-rose-400 font-semibold">None (Absent)</td>
                <td className="py-2.5 text-amber-400 font-semibold">Mixture of P &amp; N</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300">Positive-Negative-Unlabeled (PNU)</td>
                <td className="py-2.5 text-emerald-400 font-semibold">Available</td>
                <td className="py-2.5 text-emerald-400 font-semibold">Available</td>
                <td className="py-2.5 text-amber-400 font-semibold">Unresolved Ambiguity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* DOMAIN ADAPTATION & DOMAIN GENERALIZATION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Domain Adaptation vs. Domain Generalization</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
            Handling Covariate Shift
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          When the joint probability distribution of the training source domain <MathText text="P_S(\mathbf{x}, y)" /> differs
          from the target deployment domain <MathText text="P_T(\mathbf{x}, y)" />, standard deep learning models suffer catastrophic
          performance drops:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">Domain Adaptation</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">Target Seen in Training</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlabeled target-domain data is available during training. The objective aligns source and target latent representations
              (e.g., adapting an autonomous vehicle perception model from sunny California highways to rainy Seattle roads).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-300 uppercase tracking-wider">Domain Generalization</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Target Completely Unseen</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero target data is accessible during development. The model is trained across diverse source domains to discover
              robust, domain-invariant causal features that generalize to entirely unseen future environments.
            </p>
          </div>
        </div>
      </div>

      {/* TRANSFER, FEW-SHOT, AND ZERO-SHOT LEARNING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Transfer, Few-Shot, and Zero-Shot Regimes</h2>
          </div>
          <span className="text-xs text-slate-400">
            Interactive Low-Shot Simulator
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the number of labeled examples per class (shots) below to observe how the modeling paradigm transitions:
        </p>

        {/* Shots Slider */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Labeled Examples per Class (<MathText text="k\text{-shot}" />):</span>
            <span className="font-mono text-sm text-indigo-400 font-bold">{shots} shots</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={shots}
            onChange={(e) => setShots(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>0 shots (Zero-Shot)</span>
            <span>1 shot (One-Shot)</span>
            <span>5 shots (Few-Shot)</span>
            <span>20 shots (Supervised Adaptation)</span>
          </div>
        </div>

        {/* Dynamic Paradigm Output */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-bold text-sm text-slate-100">
              {shots === 0 && 'Zero-Shot Learning Regime'}
              {shots === 1 && 'One-Shot Learning Regime'}
              {shots > 1 && shots <= 10 && `Few-Shot Learning Regime (${shots}-shot)`}
              {shots > 10 && `Supervised Adaptation Regime (${shots}-shot)`}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {shots === 0 &&
              'Zero labeled examples available for the novel target class. Predictions are synthesized purely via cross-modal alignment (e.g. CLIP matching image embeddings with text prompt descriptions).'
            }
            {shots === 1 &&
              'Exactly one support instance per class. Requires metric embedding architectures (e.g. Siamese neural networks) comparing distance in latent feature space.'
            }
            {shots > 1 && shots <= 10 &&
              'Small support set per class. Classical techniques compute prototypical class centroids or perform meta-learning updates (e.g. MAML, Prototypical Networks).'
            }
            {shots > 10 &&
              'Approaching sample densities where standard gradient-based parameter fine-tuning (e.g. LoRA or linear probe) is effective and stable.'
            }
          </p>
        </div>
      </div>

      {/* META-LEARNING, CONTINUAL LEARNING, MULTI-TASK & MULTIMODAL */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Advanced Learning Architectures</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Architectural Paradigms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Meta-Learning */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Repeat className="w-4 h-4" />
              Meta-Learning (&ldquo;Learning to Learn&rdquo;)
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trained across thousands of auxiliary tasks split into support sets (for adaptation) and query sets (for meta-evaluation).
              Optimizes the initial parameters <MathText text="\theta" /> so that taking only 1–5 gradient steps on a new task yields high accuracy.
            </p>
            <div className="p-2 rounded bg-slate-900 text-center font-mono text-[11px] text-indigo-300">
              <MathText text="\theta'_t = \theta - \alpha \nabla_\theta \mathcal{L}_{\text{support}, t}" />
            </div>
          </div>

          {/* Continual Learning */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Continual Learning &amp; Forgetting
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learns a sequence of tasks over time without catastrophic forgetting. Balances plasticity (absorbing new concepts)
              with stability (retaining past knowledge) via memory replay or parameter freezing.
            </p>
            <div className="p-2 rounded bg-slate-900 text-center font-mono text-[11px] text-rose-300">
              <MathText text="\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{new}} + \lambda \|\theta - \theta_{\text{old}}\|^2" />
            </div>
          </div>

          {/* Multi-Task Learning */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Share2 className="w-4 h-4" />
              Multi-Task Learning
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              A single backbone architecture concurrently solves multiple related objectives (e.g., simultaneous object detection,
              semantic segmentation, and depth estimation), leveraging shared representations.
            </p>
            <div className="p-2 rounded bg-slate-900 text-center font-mono text-[11px] text-cyan-300">
              <MathText text="\mathcal{L}_{\text{total}} = \lambda_1 \mathcal{L}_1 + \lambda_2 \mathcal{L}_2 + \lambda_3 \mathcal{L}_3" />
            </div>
          </div>

          {/* Multimodal Learning */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Multimodal Learning
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Processes and fuses heterogeneous data formats (e.g. video pixels, text tokens, audio waveforms) into a unified
              semantic vector space using cross-attention mechanisms.
            </p>
            <div className="p-2 rounded bg-slate-900 text-center font-mono text-[11px] text-emerald-300">
              <MathText text="\mathbf{h} = \text{Combine}(\mathbf{h}_{\text{vision}}, \mathbf{h}_{\text{language}})" />
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE LEARNING & UNCERTAINTY SAMPLING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Active Learning &amp; Uncertainty Sampling</h2>
          </div>
          <span className="text-xs text-slate-400">
            Interactive Budget Allocator
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          When labeling budgets are strictly constrained, the model queries human experts only for observations located
          closest to its ambiguous decision boundary:
        </p>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Model Prediction Uncertainty:</span>
              <span className="font-mono text-sm text-indigo-400 font-bold">{uncertaintyPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={uncertaintyPct}
              onChange={(e) => setUncertaintyPct(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">Average entropy near decision boundary</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Available Human Labeling Budget:</span>
              <span className="font-mono text-sm text-amber-400 font-bold">{labelBudget} samples</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={labelBudget}
              onChange={(e) => setLabelBudget(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] text-slate-500 block">Maximum human annotations permitted</span>
          </div>
        </div>

        {/* Allocation Result */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <div className="font-semibold text-slate-200">
              Active Sampling Allocation:
            </div>
            <p className="text-slate-400">
              Direct <strong className="text-cyan-300 font-mono">{priorityPicks} labels</strong> to high-uncertainty boundary examples,
              and allocate <strong className="text-amber-300 font-mono">{explorationPicks} labels</strong> to diverse exploratory coverage.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Efficiency Gain: ~3-5&times; fewer labels required
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE PARADIGM DECISION MATRIX */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Interactive Paradigm Decision Matrix</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Architecture Selection
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Select a real-world scenario to discover the optimal learning configuration:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Select Real-World Production Constraint:</label>
          <select
            value={selectedSituation}
            onChange={(e) => setSelectedSituation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="labels">Abundant labeled input-target pairs available (Big Data Supervised)</option>
            <option value="few">Small labeled seed set + massive pool of unlabeled observations (Semi-Supervised)</option>
            <option value="raw">Completely unannotated raw corpus, need generic feature backbone (Self-Supervised)</option>
            <option value="shift">Operational environment differs from training environment (Domain Shift)</option>
            <option value="new">Brand new classification category with only 1 to 5 samples (Few-Shot)</option>
            <option value="time">Continuous stream of new tasks arriving over time (Continual Learning)</option>
            <option value="modal">Inputs combine video, audio, text, or multi-sensor feeds (Multimodal)</option>
            <option value="cost">Human expert annotations are prohibitively expensive (Active Learning)</option>
          </select>
        </div>

        {/* Selected Paradigm Card */}
        <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            <span className={`text-base font-bold ${activeRec.color}`}>
              {activeRec.title}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {activeRec.badge}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeRec.recommendation}
          </p>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-center text-indigo-200">
            <MathText text={activeRec.formula} />
          </div>
        </div>
      </div>
    </div>
  );
};
