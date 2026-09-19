import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Scale,
  Calculator,
  Layers,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2PerceptronTraining: React.FC = () => {
  // Interactive Calculator State
  const [x1, setX1] = useState<number>(2.0);
  const [x2, setX2] = useState<number>(1.0);
  const [trueY, setTrueY] = useState<1 | -1>(1);
  const [w1, setW1] = useState<number>(-1.0);
  const [w2, setW2] = useState<number>(0.0);
  const [b, setB] = useState<number>(0.0);
  const [alpha, setAlpha] = useState<number>(0.5);

  // Computations
  const scoreZ = w1 * x1 + w2 * x2 + b;
  const predY = scoreZ >= 0 ? 1 : -1;
  const err = trueY - predY; // 0, 2, or -2
  const isCorrect = err === 0;

  const deltaW1 = alpha * err * x1;
  const deltaW2 = alpha * err * x2;
  const deltaB = alpha * err;

  const newW1 = w1 + deltaW1;
  const newW2 = w2 + deltaW2;
  const newB = b + deltaB;

  // Presets
  const applyPreset = (type: 'positive' | 'negative') => {
    setX1(2.0);
    setX2(1.0);
    setAlpha(0.5);
    if (type === 'positive') {
      setTrueY(1);
      setW1(-1.0);
      setW2(0.0);
      setB(0.0);
    } else {
      setTrueY(-1);
      setW1(1.0);
      setW2(0.0);
      setB(0.0);
    }
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
          Master the exact mathematical mechanics of how a perceptron learns from misclassifications by updating its weight vector and bias via the classical Rosenblatt perceptron learning rule.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The training loop in one sentence:</strong> If the perceptron predicts correctly, do nothing; if it makes a mistake, nudge the weight vector and bias in the exact direction of the true label to correct the decision boundary.
        </div>
      </div>

      {/* ── What Does Training Mean? ──────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>What Does Training Mean?</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Training is an iterative algorithmic procedure: the perceptron inspects a labeled training instance, computes its prediction, compares the prediction with the ground truth, and applies a parameter adjustment whenever an error occurs.
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-cyan-300 flex items-center justify-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Input <MathText text="$\mathbf{x}$" /></span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Prediction <MathText text="$\hat{y} = \text{sgn}(\mathbf{w}^T\mathbf{x}+b)$" /></span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">Compare with <MathText text="$y$" /></span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2.5 py-1 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800">Update if <MathText text="$\hat{y} \ne y$" /></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Correct Prediction (<MathText text="$\hat{y} = y$" />)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              When the predicted sign matches the true label, the error is zero (<MathText text="$y - \hat{y} = 0$" />). No parameter update is performed; the boundary remains unchanged for this example.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Mistaken Prediction (<MathText text="$\hat{y} \ne y$" />)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              When a misclassification occurs, the weights and bias shift by a step proportional to the input vector and learning rate, tilting and translating the boundary toward correctness.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed pt-1">
          One full cycle through every training example in the dataset is defined as an <strong>epoch</strong>. Because individual updates may displace previously classified points, training typically requires multiple epochs until global convergence is achieved.
        </p>
      </div>

      {/* ── The Perceptron Update Rule ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Scale className="w-4 h-4 text-cyan-400" />
          <span>The Perceptron Update Rule</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For any incoming example <MathText text="$(\mathbf{x}_i, y_i)$" />, the model computes the pre-activation score and predicted class:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-indigo-300">
          <MathText text="$$z = \mathbf{w}^T \mathbf{x} + b, \quad \hat{y} = \text{sgn}(z)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The parameter update rules are formulated as:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Weight Update:</div>
            <MathText text="$$\mathbf{w} \leftarrow \mathbf{w} + \alpha(y - \hat{y})\mathbf{x}$$" displayMode={true} />
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Bias Update:</div>
            <MathText text="$$b \leftarrow b + \alpha(y - \hat{y})$$" displayMode={true} />
          </div>
        </div>

        {/* Notation Table */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Symbol</th>
                <th className="pb-2 font-semibold">Definition</th>
                <th className="pb-2 font-semibold">Role in Training</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 font-bold font-mono text-cyan-300"><MathText text="$\mathbf{w}$" /></td>
                <td className="py-2">Weight vector</td>
                <td className="py-2 text-slate-400">Rotates the boundary orientation to separate classes</td>
              </tr>
              <tr>
                <td className="py-2 font-bold font-mono text-amber-300"><MathText text="$b$" /></td>
                <td className="py-2">Bias scalar</td>
                <td className="py-2 text-slate-400">Translates the boundary relative to the origin</td>
              </tr>
              <tr>
                <td className="py-2 font-bold font-mono text-indigo-300"><MathText text="$\mathbf{x}$" /></td>
                <td className="py-2">Input vector</td>
                <td className="py-2 text-slate-400">Direction along which weights are adjusted during an error</td>
              </tr>
              <tr>
                <td className="py-2 font-bold font-mono text-emerald-300"><MathText text="$y$" /></td>
                <td className="py-2">Ground-truth label</td>
                <td className="py-2 text-slate-400">Correct target sign: <MathText text="$y \in \{-1, +1\}$" /></td>
              </tr>
              <tr>
                <td className="py-2 font-bold font-mono text-purple-300"><MathText text="$\hat{y}$" /></td>
                <td className="py-2">Predicted label</td>
                <td className="py-2 text-slate-400">Current model output: <MathText text="$\hat{y} \in \{-1, +1\}$" /></td>
              </tr>
              <tr>
                <td className="py-2 font-bold font-mono text-rose-300"><MathText text="$\alpha$" /></td>
                <td className="py-2">Learning rate hyperparameter</td>
                <td className="py-2 text-slate-400">Scales the magnitude of each corrective step (<MathText text="$\alpha > 0$" />)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-slate-200">Why this update works:</span>
          <ul className="space-y-1 mt-1 text-slate-400">
            <li>• <strong>Wrongly Negative (<MathText text="$y=+1, \hat{y}=-1$" />):</strong> Error is <MathText text="$1 - (-1) = +2$" />. A positive vector is added, raising future score for this point.</li>
            <li>• <strong>Wrongly Positive (<MathText text="$y=-1, \hat{y}=+1$" />):</strong> Error is <MathText text="$-1 - 1 = -2$" />. A negative vector is subtracted, lowering future score for this point.</li>
            <li>• <strong>Correct (<MathText text="$y=\hat{y}$" />):</strong> Error is <MathText text="$y - \hat{y} = 0$" />. No parameter change occurs.</li>
          </ul>
        </div>
      </div>

      {/* ── Detailed Worked Cases: Positive & Negative Mistakes ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Positive Mistake */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h4 className="text-sm font-bold text-slate-100">Positive Example Predicted as Negative</h4>
          </div>
          <p className="text-xs text-slate-400">
            Suppose true label <MathText text="$y = +1$" />, predicted <MathText text="$\hat{y} = -1$" />, learning rate <MathText text="$\alpha = 0.5$" />, and input <MathText text="$\mathbf{x} = [2, 1]^T$" />:
          </p>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
              <span className="text-slate-500">1. Error: </span>
              <MathText text="$y - \hat{y} = 1 - (-1) = 2$" />
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-emerald-300">
              <span className="text-slate-500">2. Weight Step: </span>
              <MathText text="$\alpha(y - \hat{y})\mathbf{x} = 0.5(2)[2, 1]^T = [2, 1]^T$" />
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-indigo-300">
              <span className="text-slate-500">3. New Weights: </span>
              <MathText text="$\mathbf{w}_{\text{new}} = \mathbf{w}_{\text{old}} + [2, 1]^T$" />
            </div>
          </div>
          <p className="text-xs text-slate-400">
            The positive update raises the score <MathText text="$z$" />, pushing the decision boundary backward so the point moves toward the positive side.
          </p>
        </div>

        {/* Negative Mistake */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <h4 className="text-sm font-bold text-slate-100">Negative Example Predicted as Positive</h4>
          </div>
          <p className="text-xs text-slate-400">
            Suppose true label <MathText text="$y = -1$" />, predicted <MathText text="$\hat{y} = +1$" />, learning rate <MathText text="$\alpha = 0.5$" />, and input <MathText text="$\mathbf{x} = [2, 1]^T$" />:
          </p>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">
              <span className="text-slate-500">1. Error: </span>
              <MathText text="$y - \hat{y} = -1 - 1 = -2$" />
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-rose-300">
              <span className="text-slate-500">2. Weight Step: </span>
              <MathText text="$\alpha(y - \hat{y})\mathbf{x} = 0.5(-2)[2, 1]^T = [-2, -1]^T$" />
            </div>
            <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-indigo-300">
              <span className="text-slate-500">3. New Weights: </span>
              <MathText text="$\mathbf{w}_{\text{new}} = \mathbf{w}_{\text{old}} - [2, 1]^T$" />
            </div>
          </div>
          <p className="text-xs text-slate-400">
            The negative update lowers the score <MathText text="$z$" />, pushing the decision boundary forward so the point moves toward the negative side.
          </p>
        </div>
      </div>

      {/* ── Contextual Interactive Perceptron Update Calculator ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Interactive Calculator: Step-by-Step Perceptron Update</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live calculation of pre-activation score, prediction, error term, and resulting parameter update.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => applyPreset('positive')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
            >
              Positive Mistake Preset
            </button>
            <button
              onClick={() => applyPreset('negative')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
            >
              Negative Mistake Preset
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Feature <MathText text="$x_1$" />:</span>
              <span className="text-indigo-300 font-bold">{x1.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={x1}
              onChange={(e) => setX1(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Feature <MathText text="$x_2$" />:</span>
              <span className="text-indigo-300 font-bold">{x2.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={x2}
              onChange={(e) => setX2(Number(e.target.value))}
              className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Current Weight <MathText text="$w_1$" />:</span>
              <span className="text-cyan-300 font-bold">{w1.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={w1}
              onChange={(e) => setW1(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Current Weight <MathText text="$w_2$" />:</span>
              <span className="text-cyan-300 font-bold">{w2.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={w2}
              onChange={(e) => setW2(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Current Bias <MathText text="$b$" />:</span>
              <span className="text-amber-300 font-bold">{b.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-8"
              max="8"
              step="0.5"
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Learning Rate <MathText text="$\alpha$" />:</span>
              <span className="text-rose-300 font-bold">{alpha.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <div className="text-xs font-mono text-slate-400 mb-1">
              True Ground-Truth Target Label <MathText text="$y$" />:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTrueY(1)}
                className={`py-1.5 rounded-lg text-xs font-bold font-mono transition border ${
                  trueY === 1
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800'
                }`}
              >
                y = +1 (Positive)
              </button>
              <button
                onClick={() => setTrueY(-1)}
                className={`py-1.5 rounded-lg text-xs font-bold font-mono transition border ${
                  trueY === -1
                    ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-400 border-slate-800'
                }`}
              >
                y = −1 (Negative)
              </button>
            </div>
          </div>
        </div>

        {/* Real-Time Mathematical Computation Breakdown */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 uppercase tracking-wider font-bold">Computation Trace</span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                isCorrect
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              {isCorrect ? 'No Update: Prediction is Correct' : 'Update Triggered: Prediction is Wrong'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px]">1. Score &amp; Prediction:</div>
              <div>
                <MathText text={`$z = (${w1.toFixed(1)})(${x1.toFixed(1)}) + (${w2.toFixed(1)})(${x2.toFixed(1)}) + (${b.toFixed(1)}) = $`} />{' '}
                <strong className={scoreZ >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{scoreZ.toFixed(2)}</strong>
              </div>
              <div className="text-slate-400 text-[11px] pt-1">
                Predicted label <MathText text="$\hat{y} = \text{sgn}(z) = $" />{' '}
                <strong className={predY === 1 ? 'text-emerald-400' : 'text-rose-400'}>
                  {predY === 1 ? '+1' : '−1'}
                </strong>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px]">2. Error Evaluation:</div>
              <div>
                <MathText text={`$y - \\hat{y} = (${trueY > 0 ? '+1' : '-1'}) - (${predY > 0 ? '+1' : '-1'}) = $`} />{' '}
                <strong className={err === 0 ? 'text-emerald-400' : 'text-amber-400'}>{err}</strong>
              </div>
              <div className="text-slate-400 text-[11px] pt-1">
                Step multiplier <MathText text={`$\\alpha(y - \\hat{y}) = (${alpha.toFixed(1)})(${err}) = ${(alpha * err).toFixed(2)}$`} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 space-y-2">
            <div className="text-slate-400 text-[11px]">3. Parameter Transitions:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Weight <MathText text="$w_1$" /></span>
                <span className="text-slate-400">{w1.toFixed(2)}</span>
                <span className="text-cyan-400"> → </span>
                <strong className="text-cyan-300 font-bold">{newW1.toFixed(2)}</strong>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Weight <MathText text="$w_2$" /></span>
                <span className="text-slate-400">{w2.toFixed(2)}</span>
                <span className="text-cyan-400"> → </span>
                <strong className="text-cyan-300 font-bold">{newW2.toFixed(2)}</strong>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Bias <MathText text="$b$" /></span>
                <span className="text-slate-400">{b.toFixed(2)}</span>
                <span className="text-amber-400"> → </span>
                <strong className="text-amber-300 font-bold">{newB.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Epochs, Learning Rate & Decay Schedules ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Epochs and Learning Rate Schedules</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The hyperparameter <MathText text="$\alpha$" /> governs the magnitude of each corrective step. Selecting an appropriate learning rate impacts training velocity and stability:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-cyan-400">Small Learning Rate (<MathText text="$\alpha \ll 1$" />)</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Produces cautious, fine-grained adjustments. Convergence is stable and smooth, but training requires significantly more epochs.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400">Large Learning Rate (<MathText text="$\alpha \approx 1$" />)</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Produces bold, aggressive parameter jumps. Can converge rapidly in early stages, but risk overshooting thin separation margins.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          In practice, training often incorporates a <strong>time-decay schedule</strong> where the learning rate gradually cools down over consecutive update iterations <MathText text="$t$" />:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-emerald-300">
          <MathText text="$$\alpha_t = \frac{1000}{1000 + t}$$" displayMode={true} />
        </div>

        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Iteration <MathText text="$t$" /></th>
                <th className="pb-2 font-semibold">Effective Learning Rate <MathText text="$\alpha_t$" /></th>
                <th className="pb-2 font-semibold">Optimization Phase Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold font-mono text-slate-200">t = 0</td>
                <td className="py-2.5 font-mono text-emerald-400">1.00</td>
                <td className="py-2.5 text-slate-400">Exploratory phase: large early updates to quickly rotate boundary</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-slate-200">t = 1000</td>
                <td className="py-2.5 font-mono text-cyan-400">0.50</td>
                <td className="py-2.5 text-slate-400">Intermediate phase: balanced corrections with reduced oscillation</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-slate-200">t = 9000</td>
                <td className="py-2.5 font-mono text-amber-400">0.10</td>
                <td className="py-2.5 text-slate-400">Fine-tuning phase: microscopic updates to settle precisely into margin</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Convergence and Limitations ──────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Convergence and Theoretical Limitations</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The behavior of the perceptron algorithm strictly depends on the underlying geometry of the training dataset:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Linearly Separable Data
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              By the <strong>Perceptron Convergence Theorem (Novikoff, 1962)</strong>, if a dataset is linearly separable with geometric margin <MathText text="$\gamma > 0$" />, the perceptron is mathematically guaranteed to find a zero-error boundary in a finite number of updates, bounded by <MathText text="$(R / \gamma)^2$" /> (where <MathText text="$R$" /> is the maximum radius of the data points).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Non-Linearly Separable Data (e.g. XOR)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              If the classes cannot be separated by a single hyperplane, the perceptron will never converge. It enters an endless oscillation cycle, continually adjusting weights to fix one misclassification while inadvertently causing another.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 leading-relaxed">
          <strong>Practical Stopping Criteria:</strong> In production ML pipelines, training is halted when:
          <ul className="list-disc pl-4 mt-1 space-y-0.5 text-slate-300">
            <li>Zero errors occur across an entire epoch (<MathText text="$\text{mistakes} = 0$" />).</li>
            <li>A predefined maximum epoch threshold is reached (e.g., <MathText text="$\text{max\_epochs} = 100$" />).</li>
            <li>Classification accuracy on validation data plateaus or begins degrading (early stopping).</li>
          </ul>
        </div>
      </div>

      {/* ── Key Glossary ─────────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span>Perceptron Training Glossary</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Technical Term</th>
                <th className="pb-2 font-semibold">Formal Definition &amp; Conceptual Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300 font-mono">Training Example</td>
                <td className="py-2.5">A single paired observation consisting of feature vector <MathText text="$\mathbf{x}$" /> and ground-truth target label <MathText text="$y \in \{-1, +1\}$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300 font-mono">Parameter Update</td>
                <td className="py-2.5">The mathematical modification of weights (<MathText text="$\Delta \mathbf{w} = \alpha(y - \hat{y})\mathbf{x}$" />) and bias (<MathText text="$\Delta b = \alpha(y - \hat{y})$" />) following a misclassification.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-300 font-mono">Epoch</td>
                <td className="py-2.5">One complete single pass through the entire training dataset where every instance is evaluated and trained upon.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300 font-mono">Learning Rate <MathText text="$\alpha$" /></td>
                <td className="py-2.5">A hyperparameter scaling the size of parameter adjustments made during each corrective step.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-purple-300 font-mono">Convergence</td>
                <td className="py-2.5">The terminal state where the model achieves zero classification error across the entire training set, resulting in no further parameter updates.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
