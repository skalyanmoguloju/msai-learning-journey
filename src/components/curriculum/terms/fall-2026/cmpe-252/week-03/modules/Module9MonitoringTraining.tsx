import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Activity,
  Layers,
  Scale,
  TrendingDown,
  TrendingUp,
  LineChart,
  Clock,
  ShieldAlert,
  HelpCircle,
  Award
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module9MonitoringTraining: React.FC = () => {
  // --- Playground 1: Learning Curve Scenario Simulator State ---
  const [scenario, setScenario] = useState<'healthy' | 'underfit' | 'overfit' | 'unstable'>('healthy');

  // Curve generation for 20 epochs
  const { trainCurvePoints, valCurvePoints, svgTrainPath, svgValPath, latestTrain, latestVal, genGap, scenarioInfo } =
    useMemo(() => {
      const epochs = 20;
      const trainLosses: number[] = [];
      const valLosses: number[] = [];

      for (let i = 0; i < epochs; i++) {
        const t = i / (epochs - 1);
        let tr = 0;
        let va = 0;

        if (scenario === 'healthy') {
          tr = 2.4 - 1.9 * t;
          va = 2.6 - 1.95 * t + 0.04 * Math.sin(i);
        } else if (scenario === 'underfit') {
          tr = 2.6 - 0.35 * t;
          va = 2.8 - 0.3 * t;
        } else if (scenario === 'overfit') {
          tr = 2.4 - 2.25 * t;
          va = 2.7 - 1.9 * Math.min(t, 0.58) + 2.7 * Math.pow(Math.max(0, t - 0.58), 1.3);
        } else {
          // Unstable / large learning rate
          tr = 2.4 - 1.4 * t + 0.45 * Math.sin(i * 1.7);
          va = 2.6 - 1.2 * t + 0.6 * Math.sin(i * 1.7 + 0.5);
        }

        trainLosses.push(Math.max(0.1, tr));
        valLosses.push(Math.max(0.1, va));
      }

      const svgWidth = 800;
      const svgHeight = 240;
      const maxLoss = 3.2;

      const toX = (idx: number) => (idx / (epochs - 1)) * svgWidth;
      const toY = (val: number) => svgHeight - (val / maxLoss) * svgHeight;

      const tPoints = trainLosses.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');
      const vPoints = valLosses.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

      const endTrain = trainLosses[epochs - 1];
      const endVal = valLosses[epochs - 1];
      const gap = endVal - endTrain;

      const descriptions = {
        healthy: {
          title: 'Healthy Learning Trajectory',
          color: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
          explanation:
            'Both training loss and validation loss descend in harmony. The generalization gap remains narrow and stable, demonstrating true inductive generalization to unseen data.'
        },
        underfit: {
          title: 'High Bias (Underfitting)',
          color: 'text-amber-400',
          badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
          explanation:
            'Both training and validation losses plateau at an unacceptably high error. The model lacks architectural expressive capacity, the learning rate is too sluggish, or features lack predictive signal.'
        },
        overfit: {
          title: 'High Variance (Overfitting)',
          color: 'text-rose-400',
          badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
          explanation:
            'Training loss falls toward zero while validation loss reverses direction and surges upward. The model has memorized sample noise rather than general statistical patterns.'
        },
        unstable: {
          title: 'Learning Rate Overshoot / Numerical Instability',
          color: 'text-purple-400',
          badgeBg: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
          explanation:
            'Loss curves oscillate violently with sharp spikes. The parameter update step is too large, overshooting error valleys and bouncing across the loss landscape.'
        }
      };

      return {
        trainCurvePoints: trainLosses,
        valCurvePoints: valLosses,
        svgTrainPath: tPoints,
        svgValPath: vPoints,
        latestTrain: endTrain,
        latestVal: endVal,
        genGap: gap,
        scenarioInfo: descriptions[scenario]
      };
    }, [scenario]);

  // --- Playground 2: Learning Rate Step Simulator State ---
  const [lrEta, setLrEta] = useState<number>(0.2);
  const [gradVal, setGradVal] = useState<number>(0.3);
  const [currentW, setCurrentW] = useState<number>(1.0);

  const deltaW = lrEta * gradVal;
  const newW = currentW - deltaW;

  // --- Playground 3: Early Stopping & Patience Calculator State ---
  const [bestEpoch, setBestEpoch] = useState<number>(8);
  const [patience, setPatience] = useState<number>(2);

  const stopEpoch = Math.min(20, bestEpoch + patience);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* CONCEPTUAL FOUNDATION: What Does Training Loss Mean? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">What Does Training Loss Mean?</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Empirical Fit
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-slate-100">Training loss</strong> quantifies the aggregate discrepancy between model
          predictions <MathText text="\hat{y}" /> and ground-truth targets <MathText text="y" /> on the exact subset of observations
          actively presented to the optimization algorithm:
        </p>

        {/* Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-semibold py-1">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            1. Input Batch <MathText text="\mathbf{X}_B" />
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-300">
            2. Forward Pass <MathText text="\hat{y} = f_\theta(\mathbf{x})" />
          </div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300">
            3. Loss Evaluation <MathText text="\mathcal{L}_{\text{train}}" />
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
            4. Gradient Update <MathText text="\theta \leftarrow \theta - \eta \nabla \mathcal{L}" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Single-Sample Squared Loss</span>
            <div className="font-mono text-sm text-slate-100">
              <MathText text="\mathcal{L}(y, \hat{y}) = (y - \hat{y})^2" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If ground truth is <MathText text="y = 10" /> and prediction is <MathText text="\hat{y} = 8" />, then{' '}
              <MathText text="\mathcal{L} = (10 - 8)^2 = 4.0" />. If the model adjusts to <MathText text="\hat{y} = 9.5" />, the
              penalty plummets to <MathText text="(10 - 9.5)^2 = 0.25" />.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Batch &amp; Epoch Aggregation</span>
            <div className="font-mono text-sm text-slate-100">
              <MathText text="\mathcal{L}_{\text{train}} = \frac{1}{M} \sum_{i=1}^M \mathcal{L}\left(y_i, f_\theta(\mathbf{x}_i)\right)" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A <em>batch</em> is a mini-group of examples processed in parallel. An <em>epoch</em> constitutes one complete
              traversal through every single training instance in the dataset.
            </p>
          </div>
        </div>
      </div>

      {/* WHAT DOES VALIDATION LOSS MEAN? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">What Does Validation Loss Mean?</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
            Unbiased Generalization Check
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Validation data is strictly sequestered from the optimization loop. The network never computes gradients or
          updates weights on validation samples. Its sole purpose is to evaluate whether learned representations transfer
          effectively to previously unseen distributions:
        </p>

        {/* Dataset Partition Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Dataset Split</th>
                <th className="pb-2.5 w-1/2">Primary Architectural Role</th>
                <th className="pb-2.5 w-1/4">Updates Parameters?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Training Set</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Computes forward predictions, errors, and backpropagated gradients to update weights and biases.
                </td>
                <td className="py-2.5 text-emerald-400 font-semibold">Yes (via Gradient Descent)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300">Validation Set</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Monitors generalization, tunes hyperparameters (learning rate, weight decay), and triggers early stopping.
                </td>
                <td className="py-2.5 text-rose-400 font-semibold">No (Pure Evaluation)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300">Test Set</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Provides the final, uncorrupted, real-world benchmark score after all model selection decisions are finalized.
                </td>
                <td className="py-2.5 text-rose-400 font-semibold">No (Strictly Locked)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Generalization Gap Formula */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
          <div className="text-slate-300">
            <span className="text-slate-400">Generalization Gap Formula: </span>
            <MathText text="\mathcal{G} = \mathcal{L}_{\text{validation}} - \mathcal{L}_{\text{training}}" />
          </div>
          <span className="text-xs font-sans text-slate-400">
            Measures the penalty incurred when deploying to new data
          </span>
        </div>
      </div>

      {/* INTERACTIVE LEARNING CURVES SIMULATOR */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive Learning Curve Simulator</h3>
          </div>
          <span className="text-xs text-slate-400">
            Diagnosing Training Dynamics
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Select a training scenario below to inspect its signature loss trajectories across 20 training epochs:
        </p>

        {/* Scenario Selection */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">Select Diagnostic Scenario:</label>
          <select
            value={scenario}
            onChange={(e) => setScenario(e.target.value as 'healthy' | 'underfit' | 'overfit' | 'unstable')}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="healthy">Healthy Learning (Optimal Generalization)</option>
            <option value="underfit">Underfitting (High Bias / Insufficient Capacity)</option>
            <option value="overfit">Overfitting (High Variance / Memorization)</option>
            <option value="unstable">Excessive Learning Rate (Oscillations &amp; Spikes)</option>
          </select>
        </div>

        {/* SVG Curve Plot */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-900">
            <svg viewBox="0 0 800 240" className="w-full h-auto block select-none">
              {/* Horizontal Grid */}
              <line x1="0" y1="48" x2="800" y2="48" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="96" x2="800" y2="96" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="144" x2="800" y2="144" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="192" x2="800" y2="192" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

              {/* Training Curve (Blue/Indigo) */}
              <path d={svgTrainPath} fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

              {/* Validation Curve (Amber/Orange) */}
              <path d={svgValPath} fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Legend and Real-time Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
                <span className="w-3 h-1 bg-indigo-500 rounded-full inline-block"></span>
                Training Loss: <strong className="font-mono text-slate-100">{latestTrain.toFixed(3)}</strong>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <span className="w-3 h-1 bg-amber-500 rounded-full inline-block"></span>
                Validation Loss: <strong className="font-mono text-slate-100">{latestVal.toFixed(3)}</strong>
              </span>
            </div>

            <div className="font-mono text-slate-300">
              Generalization Gap <MathText text="\mathcal{G}" />: <strong className="text-cyan-300 font-bold">{genGap.toFixed(3)}</strong>
            </div>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${scenarioInfo.badgeBg}`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>{scenarioInfo.title}</span>
          </div>
          <p>{scenarioInfo.explanation}</p>
        </div>
      </div>

      {/* DIAGNOSING UNDERFITTING & OVERFITTING */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Diagnosing Underfitting &amp; Overfitting</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Root Causes &amp; Solutions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Underfitting Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Underfitting (High Bias)
              </span>
              <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                L_train High &amp; L_val High
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              The model fails to capture the underlying pattern even on training examples.
            </p>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-slate-400 block text-[11px]">Primary Root Causes:</span>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                <li>Model capacity is too small (too few layers or neurons).</li>
                <li>Premature stopping or learning rate is too sluggish.</li>
                <li>Input features lack predictive information signal.</li>
                <li>Regularization penalty <MathText text="\lambda" /> is excessively strong.</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-amber-300">Remedies:</strong> Increase model depth/width, train for more epochs,
              engineer informative features, or reduce regularization.
            </div>
          </div>

          {/* Overfitting Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4" />
                Overfitting (High Variance)
              </span>
              <span className="font-mono text-[10px] text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                L_train Low &amp; L_val High
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              The model fits training data with near-zero error but fails catastrophically on test data.
            </p>

            <div className="space-y-1.5 text-xs">
              <span className="font-semibold text-slate-400 block text-[11px]">Primary Root Causes:</span>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                <li>Parameter count dwarfs available training dataset size.</li>
                <li>Training continued far past the optimal validation minimum.</li>
                <li>Dataset contains noisy, mislabeled observations.</li>
                <li>Zero regularization or weight decay applied.</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <strong className="text-rose-300">Remedies:</strong> Collect more data, apply L2 Weight Decay{' '}
              <MathText text="\lambda \sum w_j^2" />, add Dropout layers, use Data Augmentation, or trigger Early Stopping.
            </div>
          </div>
        </div>
      </div>

      {/* HOW TO TELL IF THE NETWORK IS LEARNING & BASELINE COMPARISON */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Evaluating Learning Signals &amp; Baselines</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
            Beyond Raw Accuracy
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Relying strictly on training loss or classification accuracy can produce dangerous illusions of competence.
          Always evaluate multiple complementary indicators against simple statistical baselines:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Observed Indicator</th>
                <th className="pb-2.5 w-3/4">Architectural Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Training Loss Decreases</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Confirms that backpropagation and gradient descent are operating correctly and minimizing empirical error.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Validation Loss Decreases</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Confirms that learned representations successfully generalize beyond the sample pool.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Generalization Gap Constrained</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Ensures capacity is well-regularized without pathological noise memorization.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Outperforms Majority Baseline</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  Proves model extract real semantic structure rather than exploiting class imbalance shortcuts.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed space-y-1">
            <strong className="text-amber-300 block">The Class Imbalance Trap:</strong>
            <p>
              If 95% of transactions in a fraud dataset are legitimate, a trivial dummy model that always predicts &ldquo;not fraud&rdquo;
              achieves <strong className="text-slate-100">95% accuracy</strong> without learning a single feature! Never assess a model in
              isolation; always benchmark against majority-class and random predictors.
            </p>
          </div>
        </div>
      </div>

      {/* RECOGNIZING AN OVERLY LARGE LEARNING RATE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Learning Rate Pathologies &amp; Overshoot</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
            Step Size Mechanics
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The learning rate <MathText text="\eta" /> scales the displacement vector along the negative gradient.
          When <MathText text="\eta" /> is overly large, updates jump completely past narrow error ravines, triggering
          chaotic loss oscillations or numerical explosion (<MathText text="\text{loss} \to \text{NaN}" />):
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-purple-300">
          <MathText text="W_{\text{new}} = W_{\text{old}} - \eta \cdot \frac{\partial \mathcal{L}}{\partial W}" />
        </div>

        {/* Interactive Step Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Learning Rate (<MathText text="\eta" />):</span>
              <span className="font-mono text-sm text-indigo-400">{lrEta.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="1.00"
              step="0.01"
              value={lrEta}
              onChange={(e) => setLrEta(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">Step size hyperparameter</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Local Gradient (<MathText text="\partial \mathcal{L}/\partial W" />):</span>
              <span className="font-mono text-sm text-cyan-400">{gradVal.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-0.50"
              max="0.50"
              step="0.01"
              value={gradVal}
              onChange={(e) => setGradVal(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <span className="text-[10px] text-slate-500 block">First-order surface slope</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Current Weight (<MathText text="W_{\text{old}}" />):</span>
              <span className="font-mono text-sm text-amber-400">{currentW.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="4.0"
              step="0.1"
              value={currentW}
              onChange={(e) => setCurrentW(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] text-slate-500 block">Coordinate before update</span>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 text-xs">
            <div className="font-mono text-sm text-slate-200">
              <span className="text-slate-400">Parameter Update: </span>
              <MathText text={`W_{\\text{new}} = ${currentW.toFixed(2)} - (${lrEta.toFixed(2)})(${gradVal.toFixed(2)}) = `} />
              <strong className="text-emerald-300 font-bold">{newW.toFixed(3)}</strong>
            </div>
            <div className="text-slate-400 font-sans">
              Total Displacement: <MathText text={`\\Delta W = -${deltaW.toFixed(3)}`} />
            </div>
          </div>

          <div>
            {lrEta > 0.5 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Aggressive Step (&eta; &gt; 0.5): High risk of overshoot
              </span>
            ) : lrEta < 0.05 ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <Clock className="w-4 h-4 text-amber-400" />
                Sluggish Step (&eta; &lt; 0.05): Slow convergence
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Well-Conditioned Learning Rate
              </span>
            )}
          </div>
        </div>
      </div>

      {/* EARLY STOPPING & OPTIMAL CHECKPOINT SELECTION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">Early Stopping &amp; Optimal Checkpoint Selection</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
            Automated Model Selection
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Never deploy the parameter weights from the final training epoch by default. Overfitting causes late-stage
          parameters to degrade on validation data. Instead, optimal model selection saves the parameter weights achieving
          the absolute global minimum validation loss:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="\theta^* = \arg\min_\theta \mathcal{L}_{\text{validation}}(\theta)" />
        </div>

        {/* Early stopping interactive controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Lowest Validation Loss Epoch (<MathText text="t^*" />):</span>
              <span className="font-mono text-sm text-indigo-400 font-bold">Epoch {bestEpoch}</span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              step="1"
              value={bestEpoch}
              onChange={(e) => setBestEpoch(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">Epoch where minimum validation loss occurred</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Patience Threshold (<MathText text="P" />):</span>
              <span className="font-mono text-sm text-amber-400 font-bold">{patience} epochs</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={patience}
              onChange={(e) => setPatience(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] text-slate-500 block">Consecutive non-improving epochs tolerated before halting</span>
          </div>
        </div>

        {/* Timeline visualization */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Early Stopping Execution Timeline
          </span>

          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {Array.from({ length: 20 }, (_, idx) => {
              const epochNum = idx + 1;
              const isBest = epochNum === bestEpoch;
              const isPatienceWindow = epochNum > bestEpoch && epochNum <= stopEpoch;
              const isHalted = epochNum === stopEpoch;
              const isIgnored = epochNum > stopEpoch;

              return (
                <div
                  key={epochNum}
                  className={`flex-1 min-w-[32px] h-14 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono transition-all ${
                    isBest
                      ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-300 font-bold'
                      : isHalted
                      ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-300 font-bold'
                      : isPatienceWindow
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                      : isIgnored
                      ? 'bg-slate-950/40 border border-slate-900 text-slate-600 opacity-40'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}
                >
                  <span>E{epochNum}</span>
                  <span className="text-[8px] mt-0.5">
                    {isBest ? 'Saved' : isHalted ? 'Halt' : isPatienceWindow ? `P+${epochNum - bestEpoch}` : ''}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            Training automatically terminates at <strong className="text-rose-400">Epoch {stopEpoch}</strong> (after{' '}
            {patience} non-improving epochs). The training loop then automatically restores and outputs the checkpoint
            from <strong className="text-emerald-400">Epoch {bestEpoch} (<MathText text="\theta^*" />)</strong>, ensuring
            maximum generalization performance.
          </div>
        </div>
      </div>
    </div>
  );
};
