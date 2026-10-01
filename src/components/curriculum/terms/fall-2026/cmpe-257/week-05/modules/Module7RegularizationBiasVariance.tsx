import React, { useState } from 'react';
import {
  Sliders,
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Layers,
  ShieldAlert,
  Dices,
  RefreshCw,
  Clock,
  Compass,
  Zap,
  BarChart2
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module7RegularizationBiasVariance: React.FC = () => {
  // ── Interactive 1: Regularization & Elastic Net Calculator ──
  const [w1, setW1] = useState<number>(4.0);
  const [w2, setW2] = useState<number>(-1.0);
  const [w3, setW3] = useState<number>(0.5);
  const [lambdaVal, setLambdaVal] = useState<number>(0.2);
  const [rhoVal, setRhoVal] = useState<number>(0.5);

  const l1Norm = Math.abs(w1) + Math.abs(w2) + Math.abs(w3);
  const l2Norm = w1 * w1 + w2 * w2 + w3 * w3;
  const l1Penalty = lambdaVal * l1Norm;
  const l2Penalty = lambdaVal * l2Norm;
  const elasticCombinedBeforeLambda = rhoVal * l1Norm + (1 - rhoVal) * l2Norm;
  const elasticTotalContribution = lambdaVal * elasticCombinedBeforeLambda;

  // Model A vs Model B comparison with dynamic lambda
  const [compLambda, setCompLambda] = useState<number>(0.1);
  const modelADataLoss = 10.0;
  const modelAL2 = 4 * 4 + 1 * 1; // 17
  const modelATotal = modelADataLoss + compLambda * modelAL2;

  const modelBDataLoss = 10.5;
  const modelBL2 = 2 * 2 + 2 * 2; // 8
  const modelBTotal = modelBDataLoss + compLambda * modelBL2;

  // ── Interactive 2: Dropout Neuron Mask Simulator ──
  const [neuronVals] = useState<number[]>([2, 5, 1, 4]);
  const [mask, setMask] = useState<number[]>([1, 0, 1, 0]);
  const [dropoutRate, setDropoutRate] = useState<number>(0.5);

  const toggleMaskBit = (idx: number) => {
    const nextMask = [...mask];
    nextMask[idx] = nextMask[idx] === 1 ? 0 : 1;
    setMask(nextMask);
  };

  const randomizeMask = () => {
    const nextMask = neuronVals.map(() => (Math.random() >= dropoutRate ? 1 : 0));
    setMask(nextMask);
  };

  const keepProb = 1 - dropoutRate;
  const invertedScale = keepProb > 0 ? 1 / keepProb : 1;

  // ── Interactive 3: Early Stopping & Epoch Inspector ──
  const epochData = [
    { epoch: 1, train: 0.90, val: 0.95 },
    { epoch: 2, train: 0.70, val: 0.75 },
    { epoch: 3, train: 0.50, val: 0.58 },
    { epoch: 4, train: 0.35, val: 0.45 },
    { epoch: 5, train: 0.25, val: 0.38 },
    { epoch: 6, train: 0.18, val: 0.36, isBest: true },
    { epoch: 7, train: 0.12, val: 0.40 },
    { epoch: 8, train: 0.08, val: 0.48 },
  ];
  const [selectedEpoch, setSelectedEpoch] = useState<number>(6);

  // Lambda hyperparameter choices table
  const lambdaOptions = [
    { lambda: 0, train: 0.10, val: 0.70 },
    { lambda: 0.01, train: 0.15, val: 0.45 },
    { lambda: 0.1, train: 0.25, val: 0.32, isBest: true },
    { lambda: 1, train: 0.55, val: 0.40 },
    { lambda: 10, train: 1.20, val: 1.10 },
  ];
  const [selectedLambdaIdx, setSelectedLambdaIdx] = useState<number>(2);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Learning Goals & Core Principle */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Learning Goals
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Understand underfitting and overfitting.</li>
              <li>Understand bias and variance.</li>
              <li>Calculate L2, L1, and Elastic Net penalties.</li>
              <li>Understand why L1 can make weights exactly zero.</li>
              <li>Understand dropout and data augmentation.</li>
              <li>Use validation error and early stopping to select a model.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2 text-blue-300 font-semibold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-blue-400" />
              Core Principle
            </div>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              The goal is not to memorize training examples. The goal is to learn a pattern that works accurately on new, unseen observations.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Why Regularization is Needed */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Why Regularization is Needed</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The goal of machine learning is never to memorize training examples. The real goal is to learn a underlying pattern that generalizes reliably to new observations.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Problem</th>
                <th className="py-2.5 px-4 font-sans">Model Behavior</th>
                <th className="py-2.5 px-4 font-sans">Typical Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-amber-300 font-bold">Underfitting</td>
                <td className="py-2.5 px-4 text-slate-300">Too simple; misses important patterns</td>
                <td className="py-2.5 px-4 text-rose-300 font-medium">Training and test error both high</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-rose-400 font-bold">Overfitting</td>
                <td className="py-2.5 px-4 text-slate-300">Too flexible; memorizes details and noise</td>
                <td className="py-2.5 px-4 text-rose-300 font-medium">Training error low, test error high</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-indigo-300">Regularization</strong> adds an explicit mathematical preference for simpler or less extreme models. It balances prediction accuracy on training data with model complexity.
        </div>
      </section>

      {/* Section 2: Bias–Variance Tradeoff */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Bias–Variance Tradeoff</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/50 space-y-2">
            <h3 className="text-sm font-bold text-amber-300">Bias (Systematic Error)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Bias</strong> is systematic error. A high-bias model repeatedly makes the same kind of mistake because it is too simple to capture the underlying structure.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/50 space-y-2">
            <h3 className="text-sm font-bold text-cyan-300">Variance (Sample Sensitivity)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Variance</strong> is sensitivity to the particular training sample. A high-variance model changes dramatically when trained on a slightly different sample of training data.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Property</th>
                <th className="py-2.5 px-4 font-sans text-amber-300">High Bias</th>
                <th className="py-2.5 px-4 font-sans text-cyan-300">High Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-semibold text-white">Complexity</td>
                <td className="py-2.5 px-4 text-amber-300">Too low</td>
                <td className="py-2.5 px-4 text-cyan-300">Too high</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-semibold text-white">Training error</td>
                <td className="py-2.5 px-4 text-amber-300">Usually high</td>
                <td className="py-2.5 px-4 text-cyan-300">Usually very low</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-semibold text-white">Common problem</td>
                <td className="py-2.5 px-4 text-amber-300 font-medium">Underfitting</td>
                <td className="py-2.5 px-4 text-cyan-300 font-medium">Overfitting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Increasing complexity usually lowers bias but increases variance. The most effective, useful model is often balanced right in the middle.
        </p>

        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-200 leading-relaxed">
            <strong>Irreducible Noise:</strong> Some error is irreducible noise — pure randomness or unmeasured missing information that no model, no matter how complex or regularized, can completely remove.
          </div>
        </div>
      </section>

      {/* Section 3: L2 Regularization — Ridge */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">L2 Regularization — Ridge</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          L2 regularization discourages very large weights. A model with extreme weights can react too strongly to small input changes, leading to brittle predictions.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-blue-300 overflow-x-auto">
          <MathText text="J(\theta) = \text{data loss} + \lambda (\theta_1^2 + \theta_2^2 + \dots + \theta_p^2)" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Here, <MathText text="\lambda" /> controls the penalty strength, <MathText text="p" /> is the number of feature weights, and the intercept <MathText text="\theta_0" /> is usually <strong>not</strong> penalized.
        </p>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white">Calculation Example</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            For weights <MathText text="(4, 1)" />:
          </p>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-blue-200">
            <MathText text="\text{L2 penalty} = 4^2 + 1^2 = 16 + 1 = 17" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            If <MathText text="\lambda = 0.1" />:
          </p>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-blue-200">
            <MathText text="\text{regularization contribution} = 0.1(17) = 1.7" />
          </div>
        </div>

        {/* Model Comparison Table */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Model Comparison (Model A vs. Model B)</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono"><MathText text="\lambda" />:</span>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={compLambda}
                onChange={(e) => setCompLambda(parseFloat(e.target.value))}
                className="w-24 accent-blue-500"
              />
              <span className="text-xs font-mono text-blue-400 font-bold">{compLambda.toFixed(2)}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Model</th>
                  <th className="py-2.5 px-4 font-sans">Data Loss</th>
                  <th className="py-2.5 px-4 font-sans">Weights</th>
                  <th className="py-2.5 px-4 font-sans">L2 Penalty</th>
                  <th className="py-2.5 px-4 font-sans">Total Objective</th>
                  <th className="py-2.5 px-4 font-sans">Selection</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                <tr className={modelATotal < modelBTotal ? 'bg-emerald-950/20' : 'hover:bg-slate-800/30'}>
                  <td className="py-2.5 px-4 text-white font-bold font-sans">A</td>
                  <td className="py-2.5 px-4">{modelADataLoss}</td>
                  <td className="py-2.5 px-4">(4, 1)</td>
                  <td className="py-2.5 px-4">17</td>
                  <td className="py-2.5 px-4 text-blue-300">{modelATotal.toFixed(2)}</td>
                  <td className="py-2.5 px-4 font-sans">
                    {modelATotal < modelBTotal ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Preferred
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
                <tr className={modelBTotal <= modelATotal ? 'bg-emerald-950/20' : 'hover:bg-slate-800/30'}>
                  <td className="py-2.5 px-4 text-white font-bold font-sans">B</td>
                  <td className="py-2.5 px-4">{modelBDataLoss}</td>
                  <td className="py-2.5 px-4">(2, 2)</td>
                  <td className="py-2.5 px-4">8</td>
                  <td className="py-2.5 px-4 text-blue-300">{modelBTotal.toFixed(2)}</td>
                  <td className="py-2.5 px-4 font-sans">
                    {modelBTotal <= modelATotal ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Preferred (Lower Cost)
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            When <MathText text="\lambda = 0.1" />, Model A total is <MathText text="10 + 0.1(17) = 11.7" /> whereas Model B total is <MathText text="10.5 + 0.1(8) = 11.3" />. L2 prefers Model B because its total objective is lower, even though its raw data loss is slightly worse.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Key Characteristic:</strong> L2 regularization shrinks weights smoothly toward zero, but it usually does <strong>not</strong> make them exactly zero.
          </div>
        </div>
      </section>

      {/* Section 4: L1 Regularization — Lasso */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">L1 Regularization — Lasso</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          L1 regularization uses absolute values rather than squared magnitudes. It can make some weights <strong>exactly zero</strong>, which effectively performs automatic feature selection.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-amber-300 overflow-x-auto">
          <MathText text="J(\theta) = \text{data loss} + \lambda (|\theta_1| + |\theta_2| + \dots + |\theta_p|)" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white">Calculation Example</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            For weights <MathText text="(4, -1, 0.5)" />:
          </p>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-amber-200">
            <MathText text="\text{L1 penalty} = |4| + |-1| + |0.5| = 4 + 1 + 0.5 = 5.5" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            If <MathText text="\lambda = 0.2" />:
          </p>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-amber-200">
            <MathText text="\text{regularization contribution} = 0.2(5.5) = 1.1" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-white">Why Can L1 Produce Zero Weights?</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The absolute-value function <MathText text="|x|" /> has a sharp non-differentiable corner at zero. Optimization trajectories frequently stop precisely at that corner, setting the weight to exactly 0.
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            If the model predicts:
          </p>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300">
            <MathText text="\hat{y} = \theta_0 + 2x_1 + 0x_2 - x_3" />
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            then <MathText text="x_2" /> no longer affects the prediction whatsoever. L1 has effectively removed that feature from the model entirely.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Method</th>
                <th className="py-2.5 px-4 font-sans">Typical Weight Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-amber-300 font-mono">L1 (Lasso)</td>
                <td className="py-2.5 px-4 text-emerald-300 font-medium">Some weights can become exactly zero (feature selection)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-blue-300 font-mono">L2 (Ridge)</td>
                <td className="py-2.5 px-4 text-slate-300">Weights become smaller but usually remain nonzero</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 5: Elastic Net */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Elastic Net</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Elastic Net combines L1 and L2 regularization. It is useful when we want feature selection but also want more stable behavior in the presence of correlated features.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-purple-300 overflow-x-auto">
          <MathText text="J(\theta) = \text{data loss} + \lambda \left[ \rho \sum_{j=1}^p |\theta_j| + (1 - \rho) \sum_{j=1}^p \theta_j^2 \right]" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <MathText text="\lambda" /> controls the total regularization strength, while <MathText text="\rho" /> controls the balance between L1 and L2 penalties:
        </p>

        <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
          <li><MathText text="\rho = 1" />: pure L1 (Lasso)</li>
          <li><MathText text="\rho = 0" />: pure L2 (Ridge)</li>
          <li><MathText text="0 < \rho < 1" />: mixture of L1 and L2</li>
        </ul>

        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200 leading-relaxed">
            <strong>Notation Note:</strong> Some textbooks and packages use <MathText text="\alpha" /> for this mixing parameter. It is completely different from the <MathText text="\alpha_i" /> Lagrange multipliers used in the SVM dual formulation.
          </div>
        </div>

        {/* Interactive Elastic Net Calculator */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-purple-800/40 space-y-4">
          <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Interactive Penalty Workbench (Weights, <MathText text="\lambda" />, and <MathText text="\rho" />)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Weight <MathText text="\theta_1" />:</label>
              <input
                type="number"
                step="0.5"
                value={w1}
                onChange={(e) => setW1(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Weight <MathText text="\theta_2" />:</label>
              <input
                type="number"
                step="0.5"
                value={w2}
                onChange={(e) => setW2(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Weight <MathText text="\theta_3" />:</label>
              <input
                type="number"
                step="0.5"
                value={w3}
                onChange={(e) => setW3(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Regularization Strength (<MathText text="\lambda" />):</span>
                <span className="font-mono text-purple-300 font-bold">{lambdaVal.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lambdaVal}
                onChange={(e) => setLambdaVal(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Mixing Ratio (<MathText text="\rho" />: 0=L2, 1=L1):</span>
                <span className="font-mono text-purple-300 font-bold">{rhoVal.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={rhoVal}
                onChange={(e) => setRhoVal(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-amber-400 font-medium">Pure L1 Penalty</span>
              <p className="font-mono text-xs text-slate-300"><MathText text="\sum |\theta_j|" /> = {l1Norm.toFixed(2)}</p>
              <p className="font-mono text-xs text-amber-300 font-bold"><MathText text="\lambda \times \text{L1}" /> = {l1Penalty.toFixed(3)}</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs text-blue-400 font-medium">Pure L2 Penalty</span>
              <p className="font-mono text-xs text-slate-300"><MathText text="\sum \theta_j^2" /> = {l2Norm.toFixed(2)}</p>
              <p className="font-mono text-xs text-blue-300 font-bold"><MathText text="\lambda \times \text{L2}" /> = {l2Penalty.toFixed(3)}</p>
            </div>

            <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/80 space-y-1">
              <span className="text-xs text-purple-300 font-medium">Elastic Net Penalty</span>
              <p className="font-mono text-xs text-slate-300">Combined = {elasticCombinedBeforeLambda.toFixed(3)}</p>
              <p className="font-mono text-xs text-purple-300 font-bold">Contribution = {elasticTotalContribution.toFixed(3)}</p>
            </div>
          </div>

          <div className="text-xs text-slate-400 border-t border-slate-800/60 pt-2">
            <strong>Worked Example (default):</strong> For weights <MathText text="(4, -1, 0.5)" />, <MathText text="\text{L1} = 5.5" /> and <MathText text="\text{L2} = 17.25" />.
            With <MathText text="\rho = 0.5" /> and <MathText text="\lambda = 0.2" />:
            <div className="font-mono text-purple-200 mt-1">
              <MathText text="\text{combined} = 0.5(5.5) + 0.5(17.25) = 2.75 + 8.625 = 11.375" />
            </div>
            <div className="font-mono text-purple-200 mt-1">
              <MathText text="\text{regularization contribution} = 0.2(11.375) = 2.275" />
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Elastic Net can shrink weights and may set some to zero while treating correlated features much more smoothly than pure L1.
        </p>
      </section>

      {/* Section 6: Neural-Network Regularization */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Dices className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Neural-Network Regularization</h2>
        </div>

        {/* Dropout Sub-section */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Dropout</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-normal">Internal Neurons</span>
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            During training, <strong>dropout</strong> randomly turns off some neuron outputs for one training step. A dropped neuron is temporarily set to zero; it is <strong>not</strong> permanently deleted.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            If a layer outputs <span className="font-mono text-emerald-300">[2, 5, 1, 4]</span> and the binary mask is <span className="font-mono text-cyan-300">[1, 0, 1, 0]</span>, the output becomes:
          </p>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-emerald-200">
            <MathText text="[2(1), 5(0), 1(1), 4(0)] = [2, 0, 1, 0]" />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A new random mask is sampled in each training step. This prevents the network from co-adapting and depending too strongly on any single exact pathway.
          </p>

          {/* Interactive Dropout Simulation */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-800/40 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5" />
                Interactive Dropout Step Simulator
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={randomizeMask}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Dices className="w-3.5 h-3.5" /> Sample New Random Mask
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
              {neuronVals.map((val, idx) => {
                const isKept = mask[idx] === 1;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleMaskBit(idx)}
                    className={`cursor-pointer p-3 rounded-lg border transition-all ${
                      isKept
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 block font-mono">Neuron {idx + 1}</span>
                    <span className="text-lg font-bold font-mono">{val}</span>
                    <div className="mt-1 text-[11px] font-mono">
                      Mask: <span className={isKept ? 'text-emerald-400 font-bold' : 'text-rose-400'}>{mask[idx]}</span>
                    </div>
                    <div className="mt-1 text-xs font-mono font-bold text-cyan-300">
                      Output: {isKept ? val : 0}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Click individual neuron cards above to toggle their mask state, or click &quot;Sample New Random Mask&quot;.
            </p>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <p>
                <strong>Inverted Dropout:</strong> With a 50% dropout rate (<MathText text="p_{\text{drop}} = 0.5" />), the keep probability is <MathText text="p_{\text{keep}} = 0.5" />. Inverted dropout scales kept values during training by:
              </p>
              <div className="font-mono text-cyan-300">
                <MathText text="1 / 0.5 = 2" />
              </div>
              <p className="text-slate-400">
                During prediction (testing), the full network is used with all neurons active and dropout is turned <strong>off</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Data Augmentation Sub-section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Data Augmentation</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-normal">Input Examples</span>
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            Data augmentation creates realistic variations of training examples while preserving the true ground-truth label. For instance, for a cat image, valid label-preserving transformations include small rotations, random crops, slight spatial shifts, subtle brightness changes, and horizontal flips.
          </p>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-200 leading-relaxed">
              <strong>Label Invariance Condition:</strong> An augmentation is only valid if it strictly preserves the correct label. A transformation that vertically flips a digit &quot;6&quot; produces something resembling a &quot;9&quot;, making it completely inappropriate for digit recognition.
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Method</th>
                  <th className="py-2.5 px-4 font-sans">What Changes?</th>
                  <th className="py-2.5 px-4 font-sans">Primary Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-emerald-300 font-mono">Dropout</td>
                  <td className="py-2.5 px-4">Internal neurons (zeroed temporarily)</td>
                  <td className="py-2.5 px-4">Prevent dependence on any single pathway</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-cyan-300 font-mono">Augmentation</td>
                  <td className="py-2.5 px-4">Input examples (label-preserving variations)</td>
                  <td className="py-2.5 px-4">Teach robustness to realistic environmental variations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Early Stopping and Model Selection */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Clock className="w-5 h-5 text-rose-400" />
          <h2 className="text-lg font-bold text-white">Early Stopping and Model Selection</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Training error can continuously decrease even after the model begins severely overfitting. <strong>Early stopping</strong> monitors validation error during training and restores the model weights from the epoch with the lowest validation error.
        </p>

        {/* Epoch Error Table & Interactive Inspector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Validation Error by Epoch</h3>
            <span className="text-xs text-slate-400">Click a row to inspect</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Epoch</th>
                  <th className="py-2.5 px-4 font-sans">Training Error</th>
                  <th className="py-2.5 px-4 font-sans">Validation Error</th>
                  <th className="py-2.5 px-4 font-sans">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                {epochData.map((row) => {
                  const isSelected = selectedEpoch === row.epoch;
                  return (
                    <tr
                      key={row.epoch}
                      onClick={() => setSelectedEpoch(row.epoch)}
                      className={`cursor-pointer transition-colors ${
                        row.isBest
                          ? 'bg-emerald-950/40 text-emerald-200 font-bold'
                          : isSelected
                          ? 'bg-slate-800/60'
                          : 'hover:bg-slate-800/30'
                      }`}
                    >
                      <td className="py-2.5 px-4 font-sans flex items-center gap-2">
                        <span>Epoch {row.epoch}</span>
                        {row.isBest && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                            BEST
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">{row.train.toFixed(2)}</td>
                      <td className={`py-2.5 px-4 ${row.isBest ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                        {row.val.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-4 font-sans text-xs">
                        {row.epoch < 6 && <span className="text-blue-400">Learning underfitted features</span>}
                        {row.epoch === 6 && <span className="text-emerald-400 font-bold">Selected Model (Minimum Val Error)</span>}
                        {row.epoch > 6 && <span className="text-rose-400">Overfitting (Val error rises)</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
            <p>
              <strong>Selection Rationale:</strong> <strong>Epoch 6</strong> is selected because it achieves the lowest validation error (<strong className="text-emerald-400">0.36</strong>), even though Epoch 8 reaches a lower training error (<span className="text-slate-400">0.08</span>).
            </p>
            <p className="text-slate-400">
              <strong>Patience:</strong> Patience allows a predefined number of non-improving epochs before stopping, because validation error can fluctuate slightly. After stopping, restore the exact weights saved from the best validation epoch.
            </p>
          </div>
        </div>

        {/* Hyperparameter Lambda Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white">Choosing Regularization Strength (<MathText text="\lambda" />)</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-mono"><MathText text="\lambda" /></th>
                  <th className="py-2.5 px-4 font-sans">Training Error</th>
                  <th className="py-2.5 px-4 font-sans">Validation Error</th>
                  <th className="py-2.5 px-4 font-sans">Diagnosis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                {lambdaOptions.map((opt, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedLambdaIdx(idx)}
                    className={`cursor-pointer transition-colors ${
                      opt.isBest
                        ? 'bg-emerald-950/40 text-emerald-200 font-bold'
                        : selectedLambdaIdx === idx
                        ? 'bg-slate-800/60'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-bold text-white">{opt.lambda}</td>
                    <td className="py-2.5 px-4 text-slate-300">{opt.train.toFixed(2)}</td>
                    <td className={`py-2.5 px-4 ${opt.isBest ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                      {opt.val.toFixed(2)}
                    </td>
                    <td className="py-2.5 px-4 font-sans text-xs">
                      {opt.lambda === 0 && <span className="text-rose-400">No penalty — Overfitting</span>}
                      {opt.lambda === 0.01 && <span className="text-amber-400">Mild penalty — Slight overfit</span>}
                      {opt.lambda === 0.1 && <span className="text-emerald-400 font-bold">Optimal choice (Lowest Val Error)</span>}
                      {opt.lambda === 1 && <span className="text-amber-400">High penalty — Underfitting begins</span>}
                      {opt.lambda === 10 && <span className="text-rose-400">Excessive penalty — Severe underfitting</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Among these hyperparameter candidates, <MathText text="\lambda = 0.1" /> achieves the lowest validation error (<strong className="text-emerald-400">0.32</strong>).
          </p>
        </div>

        {/* Dataset Roles */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-bold text-white">Dataset Roles in Machine Learning</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Dataset Partition</th>
                  <th className="py-2.5 px-4 font-sans">Specific Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-blue-300">Training Set</td>
                  <td className="py-2.5 px-4 text-slate-300">Fit and learn model parameters (weights <MathText text="\theta" /> and biases <MathText text="b" />).</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-purple-300">Validation Set</td>
                  <td className="py-2.5 px-4 text-slate-300">Tune hyperparameters (e.g. <MathText text="\lambda, \rho" />) and determine the early stopping epoch.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-emerald-300">Test Set</td>
                  <td className="py-2.5 px-4 text-slate-300">Final unbiased evaluation of generalization error after all model choices are fixed.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final Module Recap */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Final Module Recap</h2>
        </div>

        <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>Underfitting:</strong> Model too simple; high bias; misses patterns.</li>
          <li><strong>Overfitting:</strong> Model too flexible; high variance; memorizes details and noise.</li>
          <li><strong>L2 Regularization (Ridge):</strong> Shrinks large weights smoothly toward zero (<MathText text="\lambda \sum \theta_j^2" />).</li>
          <li><strong>L1 Regularization (Lasso):</strong> Sharp corner at zero drives irrelevant weights to exactly zero (<MathText text="\lambda \sum |\theta_j|" />), performing feature selection.</li>
          <li><strong>Elastic Net:</strong> Combines L1 and L2 via mixing parameter <MathText text="\rho" /> to balance sparsity and stability on correlated features.</li>
          <li><strong>Dropout:</strong> Temporarily turns off internal neurons during training to prevent co-adaptation.</li>
          <li><strong>Data Augmentation:</strong> Synthesizes realistic label-preserving input variations to instill robustness.</li>
          <li><strong>Early Stopping:</strong> Monitors validation error and preserves the weights from the epoch with lowest validation error.</li>
          <li><strong>Validation vs. Test:</strong> Validation data selects hyperparameters and stopping points; test data is reserved strictly for final reporting.</li>
        </ul>
      </section>
    </div>
  );
};
