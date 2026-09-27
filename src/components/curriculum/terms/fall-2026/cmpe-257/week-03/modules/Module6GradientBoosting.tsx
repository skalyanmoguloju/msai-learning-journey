import React, { useState } from 'react';
import {
  Check,
  Table,
  TrendingDown,
  Zap,
  ArrowRight,
  Home,
  CheckCircle2,
  Compass,
  Scale,
  Activity,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { MathText } from '../../../../../common';
import { ML_WEEK3_MODULES } from '../types';

export const Module6GradientBoosting: React.FC = () => {
  const mod = ML_WEEK3_MODULES.find(m => m.id === 'm6')!;

  // ── Step-by-Step House Price Walkthrough State (Slides 85–89) ─────────
  const [activeStep, setActiveStep] = useState<number>(1);

  // ── Interactive 1: One Regression Boosting Update ─────────────────────
  const [actualY, setActualY] = useState<number>(100);
  const [currentF, setCurrentF] = useState<number>(70);
  const [treeCorrectionH, setTreeCorrectionH] = useState<number>(25);
  const [learningRateEta, setLearningRateEta] = useState<number>(0.5);

  const boostResidual = actualY - currentF;
  const boostNewPred = currentF + learningRateEta * treeCorrectionH;
  const boostRemainingError = actualY - boostNewPred;

  // ── Interactive 2: KNN Distance & Vote Simulator ──────────────────────
  const [newX1, setNewX1] = useState<number>(7);
  const [newX2, setNewX2] = useState<number>(88);
  const [trainX1, setTrainX1] = useState<number>(7);
  const [trainX2, setTrainX2] = useState<number>(90);

  const knnDistance = Math.sqrt(
    Math.pow(newX1 - trainX1, 2) + Math.pow(newX2 - trainX2, 2)
  );

  const [votesA, setVotesA] = useState<number>(2);
  const [votesB, setVotesB] = useState<number>(3);
  const [votesC, setVotesC] = useState<number>(1);

  const voteWinner = (() => {
    const arr = [
      { name: 'Class A', votes: votesA },
      { name: 'Class B', votes: votesB },
      { name: 'Class C', votes: votesC }
    ].sort((a, b) => b.votes - a.votes);
    return arr[0].votes > 0
      ? `${arr[0].name} wins with ${arr[0].votes} votes`
      : 'Enter positive votes';
  })();

  // ── Interactive 3: Dimension on Typical Distance Simulator ───────────
  const [dimensionsQ, setDimensionsQ] = useState<number>(10);
  const safeQ = Math.max(1, dimensionsQ);
  const typicalDist = Math.sqrt(safeQ / 6);

  // ── Interactive 4: Sequential Residual Fitting Simulator ──────────────
  const [stages, setStages] = useState<number>(4);
  const [learningRate, setLearningRate] = useState<number>(0.1);

  const target = 10.0;
  const initialPrediction = 5.0;

  const sequence = [];
  let currentPred = initialPrediction;
  for (let m = 1; m <= stages; m++) {
    const residual = target - currentPred;
    const treeContribution = residual * learningRate * 2.5; // toy step
    currentPred += treeContribution;
    sequence.push({
      stage: m,
      residual,
      treeFit: treeContribution,
      ensemblePrediction: currentPred
    });
  }

  const finalResidual = target - currentPred;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Module Roadmap ─────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Roadmap</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Master the paradigm of sequential boosting, contrast it with bagging, study distance-based learning via K-Nearest Neighbors, examine high-dimensional geometry, and review the master machine learning model-selection matrix:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
          {[
            'Why Bagging Is Not Always Enough',
            'Boosting Intuition',
            'Gradient Boosting for Regression',
            'Gradient Boosting for Classification',
            'Bagging versus Boosting',
            'K-Nearest Neighbors (KNN)',
            'Curse of Dimensionality',
            'Final Comparison of Methods'
          ].map((topic, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-slate-300 text-[11px] font-medium leading-tight">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Bagging Is Not Always Enough ───────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why Bagging Is Not Always Enough</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Bagging and random forests mainly reduce <strong>variance</strong>: they make predictions less dependent on one particular random training sample. However, <em>averaging cannot fix a mistake shared by every base tree</em>.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-amber-300">Worked Numerical Example: Systematic Under-Prediction</span>
          <p className="text-slate-300 leading-relaxed">
            Suppose the true continuous response is <strong className="text-white">300</strong>, and five independent bagged trees predict:
          </p>
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-center text-cyan-300 text-sm">
            <MathText text="$$\text{Ensemble Prediction} = \frac{240 + 250 + 260 + 245 + 255}{5} = \mathbf{250}$$" displayMode={true} />
          </div>
          <p className="text-slate-300 leading-relaxed">
            While the ensemble prediction is very stable across bootstrap resamples, it remains consistently <strong>50 units too low</strong>. This systematic discrepancy is known as <strong>bias</strong>. Averaging alone cannot eliminate structural bias.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-rose-300">Statistical Problem</th>
                <th className="py-2.5 px-3 text-slate-300">Practical Meaning</th>
                <th className="py-2.5 px-3 text-emerald-300">Algorithmic Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-rose-300">High Variance</td>
                <td className="py-2 px-3 text-slate-300">Model changes wildly when training data fluctuates</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Bagging & Random Forests (averaging independent models)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300">High Bias</td>
                <td className="py-2 px-3 text-slate-300">Model consistently misses underlying patterns</td>
                <td className="py-2 px-3 text-cyan-300 font-medium">Boosting (adds sequential error corrections)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200">
          <strong>Key Principle:</strong> Boosting builds models sequentially. Each new tree focuses directly on what the current ensemble is still getting wrong.
        </div>
      </div>

      {/* ── Boosting Intuition ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Boosting Intuition</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose the actual target value is <strong className="text-white">100</strong> and the initial base model predicts <strong className="text-white">70</strong>:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$\text{Residual} = \text{Actual} - \text{Prediction} = 100 - 70 = \mathbf{30}$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The next tree learns a correction. If it predicts a correction of <strong className="text-white">25</strong>, the combined prediction becomes:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-emerald-300 text-xs">
          <MathText text="$$70 + 25 = \mathbf{95} \implies \text{Remaining Error} = 100 - 95 = \mathbf{5}$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A third tree subsequently learns a fine correction of <strong className="text-white">4</strong>:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-purple-300 text-xs">
          <MathText text="$$95 + 4 = \mathbf{99} \implies \text{Error reduced to } 1!$$" displayMode={true} />
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-amber-300">
          Convergence Path: 70 <ArrowRight className="w-3.5 h-3.5 inline mx-1.5" /> 95 <ArrowRight className="w-3.5 h-3.5 inline mx-1.5" /> 99
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-cyan-300">
          <MathText text="$$F_m(x) = F_{m-1}(x) + \eta \cdot h_m(x)$$" displayMode={true} />
          <span className="text-[11px] text-slate-400 font-sans block pt-1">
            Where <MathText text="$\eta$" /> (or <MathText text="$\nu$" />) is the shrinkage learning rate. A small learning rate enforces cautious, stable contributions from each weak learner.
          </span>
        </div>
      </div>

      {/* ── Worked Example: House Price Prediction (Lecture Slides 85–89) ─ */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Home className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Worked Walkthrough: Predicting House Prices</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Lecture Slides Case Study
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Step through the 5-stage boosting progression presented in lecture to see how successive weak trees iteratively correct previous mistakes:
        </p>

        {/* Step Selector Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { num: 1, label: 'Step 1: Initial Weak Learner' },
            { num: 2, label: 'Step 2: Inspect Residuals' },
            { num: 3, label: 'Step 3: Fit Tree 2 to Residuals' },
            { num: 4, label: 'Step 4: Combine Predictions' },
            { num: 5, label: 'Step 5: Repeat with Tree 3+' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStep === s.num
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Step Content Card */}
        {activeStep === 1 && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 1: Start with a Weak Learner (Tree 1 — Decision Stump)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Target: Predict house price (<MathText text="$\$$" />). Available features: Size (sqft), Location, Age, Number of Rooms.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-cyan-300 border border-slate-800 space-y-1">
              <div><strong>Tree 1 Rule:</strong></div>
              <div>• If <MathText text="$\text{Size} > 2000 \text{ sqft} \implies \text{Predict } \$500\text{k}$" /></div>
              <div>• Else <MathText text="$\implies \text{Predict } \$300\text{k}$" /></div>
            </div>
            <p className="text-slate-400 text-[11px]">
              This single stump is very rough and makes huge errors on atypical houses!
            </p>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2 text-rose-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 2: Compare Actual House Prices vs. Tree 1 Predictions</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Calculate the leftover mistakes (residuals <MathText text="$r_i = y_i - \hat{y}_{1,i}$" />):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-300 font-bold block">House A (Luxury Villa):</span>
                <div className="text-slate-300">True Price: <strong className="text-emerald-400">$700k</strong></div>
                <div className="text-slate-300">Tree 1 Predicted: <strong className="text-cyan-400">$500k</strong></div>
                <div className="text-rose-400 font-bold">Residual Error: +$200k</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-amber-300 font-bold block">House B (Fixer-Upper):</span>
                <div className="text-slate-300">True Price: <strong className="text-emerald-400">$250k</strong></div>
                <div className="text-slate-300">Tree 1 Predicted: <strong className="text-cyan-400">$300k</strong></div>
                <div className="text-rose-400 font-bold">Residual Error: –$50k</div>
              </div>
            </div>
            <p className="text-slate-400 text-[11px]">
              These residuals represent the precise discrepancies that Tree 1 failed to capture.
            </p>
          </div>
        )}

        {activeStep === 3 && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2 text-indigo-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 3: Train Tree 2 Directly on the Residuals</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              We now train a second small tree, not on house price, but on the residual target <MathText text="$r$" />:
            </p>
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-indigo-300 border border-slate-800 space-y-1">
              <div><strong>Tree 2 Correction Rule:</strong></div>
              <div>• If <MathText text="$\text{Location} = \text{City Center} \implies \text{Add } +\$200\text{k}$" /></div>
              <div>• Else <MathText text="$\implies \text{Subtract } -\$50\text{k}$" /></div>
            </div>
            <p className="text-slate-400 text-[11px]">
              Tree 2 learns to specifically repair the under- and over-predictions made by Tree 1.
            </p>
          </div>
        )}

        {activeStep === 4 && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 4: Combine Predictions (Additive Update)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The updated ensemble prediction is <MathText text="$\hat{y}_{\text{combined}} = \text{Tree}_1(x) + \text{Tree}_2(x)$" />:
            </p>
            <div className="p-3 bg-slate-900 rounded-lg font-mono border border-slate-800 space-y-1 text-emerald-300">
              <div><strong>House A (2500 sqft in City Center):</strong></div>
              <div>• Tree 1 said: <strong className="text-slate-200">$500k</strong></div>
              <div>• Tree 2 said: <strong className="text-slate-200">+$200k correction</strong></div>
              <div className="font-bold text-emerald-400 pt-1">
                Combined Prediction: <MathText text="$\$500\text{k} + \$200\text{k} = \$700\text{k}$" /> (Exact match to true price!)
              </div>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center gap-2 text-purple-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 5: Repeat with Tree 3, 4, ... on Remaining Residuals</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If residual errors remain (e.g., due to age or room count variations), train Tree 3 on what's <em>still</em> wrong, then add it to the ensemble:
            </p>
            <div className="p-3 bg-slate-900 rounded-lg font-mono border border-slate-800 text-center text-purple-300">
              <MathText text="$$F_M(x) = \text{Tree}_1(x) + \nu \cdot \text{Tree}_2(x) + \nu \cdot \text{Tree}_3(x) + \dots + \nu \cdot \text{Tree}_M(x)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              The loop terminates when residuals become negligible or when a cross-validated early-stopping criterion is met.
            </p>
          </div>
        )}
      </div>

      {/* ── Gradient Boosting for Regression ───────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Gradient Boosting for Regression</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For squared-error loss <MathText text="$L(y, F) = \frac{1}{2}(y - F)^2$" />, the negative gradient is exactly the standard residual:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-xs">
          <MathText text="$$-\left[\frac{\partial L(y, F)}{\partial F}\right] = y - F(x) = \text{residual}$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Consider example target responses of <strong className="text-white">100, 200, and 300</strong>. The initial prediction is their arithmetic mean:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-amber-300 text-xs">
          <MathText text="$$F_0 = \frac{100 + 200 + 300}{3} = \mathbf{200}$$" displayMode={true} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Actual Target (y)</th>
                <th className="py-2.5 px-3 text-slate-300">Baseline Prediction (F₀)</th>
                <th className="py-2.5 px-3 text-rose-300">Residual (y − F₀)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3">100</td>
                <td className="py-2 px-3 text-slate-400">200</td>
                <td className="py-2 px-3 text-rose-400 font-bold">−100</td>
              </tr>
              <tr>
                <td className="py-2 px-3">200</td>
                <td className="py-2 px-3 text-slate-400">200</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">0</td>
              </tr>
              <tr>
                <td className="py-2 px-3">300</td>
                <td className="py-2 px-3 text-slate-400">200</td>
                <td className="py-2 px-3 text-cyan-400 font-bold">+100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The next tree is trained directly on target values <strong className="text-white">[−100, 0, 100]</strong>. Its prediction represents an incremental correction. After <MathText text="$M$" /> iterations:
        </p>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-purple-300">
          <MathText text="$$F_M(x) = F_0(x) + \eta h_1(x) + \eta h_2(x) + \dots + \eta h_M(x)$$" displayMode={true} />
        </div>
      </div>

      {/* ── Interactive: One Regression Boosting Update ────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <TrendingDown className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: One Regression Boosting Update</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Single Step Calculator
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Enter an actual value, current model prediction, tree correction, and learning rate <MathText text="$\eta$" /> to inspect the exact residual and updated prediction:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 block font-medium">Actual y:</label>
            <input
              type="number"
              value={actualY}
              onChange={(e) => setActualY(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 block font-medium">Current F(x):</label>
            <input
              type="number"
              value={currentF}
              onChange={(e) => setCurrentF(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 block font-medium">Tree Correction h(x):</label>
            <input
              type="number"
              value={treeCorrectionH}
              onChange={(e) => setTreeCorrectionH(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 block font-medium">Learning Rate (η):</label>
            <input
              type="number"
              step="0.05"
              min="0.01"
              max="1.0"
              value={learningRateEta}
              onChange={(e) => setLearningRateEta(parseFloat(e.target.value) || 0.1)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Incoming Residual</div>
            <div className="font-mono text-rose-400 font-bold text-lg">{boostResidual.toFixed(3)}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">y − F</div>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">New Prediction</div>
            <div className="font-mono text-emerald-400 font-bold text-lg">{boostNewPred.toFixed(3)}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">F + η·h</div>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <div className="text-[11px] uppercase font-bold text-slate-400 mb-1">Remaining Error</div>
            <div className="font-mono text-cyan-400 font-bold text-lg">{boostRemainingError.toFixed(3)}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">y − New F</div>
          </div>
        </div>
      </div>

      {/* ── Interactive Sequential Residual Fitting Simulator ─────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-amber-400">
            <TrendingDown className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive Sequential Residual Fitting Simulator</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Multi-Stage Convergence
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Watch how each new sequential tree chips away at the residual error left over by prior stages:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Number of Boosting Stages (<MathText text="$M$" />):</span>
              <span className="font-mono text-amber-300">{stages} trees</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={stages}
              onChange={(e) => setStages(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Shrinkage Learning Rate (<MathText text="$\nu$" />):</span>
              <span className="font-mono text-cyan-300">{learningRate.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.30"
              step="0.05"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Residual sequence visualization */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 font-semibold text-amber-300">Stage (m)</th>
                <th className="py-2 px-3 font-semibold text-rose-300">Incoming Residual (y − F_prev)</th>
                <th className="py-2 px-3 font-semibold text-cyan-300">Tree Fit Contribution (ν·h_m)</th>
                <th className="py-2 px-3 font-semibold text-emerald-300">Updated Prediction (F_m)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr className="text-slate-400">
                <td className="py-1.5 px-3">m = 0 (Init)</td>
                <td className="py-1.5 px-3 text-rose-300">{(target - initialPrediction).toFixed(2)}</td>
                <td className="py-1.5 px-3 text-slate-500">Base constant (5.00)</td>
                <td className="py-1.5 px-3 text-emerald-300">{initialPrediction.toFixed(2)}</td>
              </tr>
              {sequence.map((row) => (
                <tr key={row.stage}>
                  <td className="py-1.5 px-3 text-amber-300">Tree {row.stage}</td>
                  <td className="py-1.5 px-3 text-rose-300">{row.residual.toFixed(2)}</td>
                  <td className="py-1.5 px-3 text-cyan-300">+{row.treeFit.toFixed(2)}</td>
                  <td className="py-1.5 px-3 text-emerald-300">{row.ensemblePrediction.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center font-mono">
          <span className="text-slate-400">True Target: <strong className="text-slate-200">10.00</strong></span>
          <span className="text-emerald-400">Remaining Error: {finalResidual.toFixed(2)}</span>
        </div>
      </div>

      {/* ── Gradient Boosting for Classification ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Gradient Boosting for Classification</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For binary classification with labels <MathText text="$y \in \{0, 1\}$" />, the ensemble maintains an unrestricted real-valued raw score <MathText text="$F(x)$" /> (log-odds), which is mapped to a probability via sigmoid:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-xs">
          <MathText text="$$p = \sigma(F(x)) = \frac{1}{1 + e^{-F(x)}}$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The classification pseudo-residual is simply:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-purple-300 text-xs">
          <MathText text="$$r = y - p$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block font-sans">Positive Instance (y = 1):</span>
            <div className="text-slate-300">If current model says <MathText text="$p = 0.5$" />:</div>
            <div className="text-cyan-300 font-bold">Residual: r = 1 − 0.5 = +0.5</div>
            <div className="text-[11px] text-slate-400 font-sans">Directional push to raise raw score F!</div>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-rose-400 font-bold block font-sans">Negative Instance (y = 0):</span>
            <div className="text-slate-300">If current model says <MathText text="$p = 0.5$" />:</div>
            <div className="text-rose-300 font-bold">Residual: r = 0 − 0.5 = −0.5</div>
            <div className="text-[11px] text-slate-400 font-sans">Directional push to lower raw score F!</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          <strong>Crucial Implementation Rule:</strong> Never add corrections directly to probability values! Probabilities must strictly remain bounded between 0 and 1, whereas raw scores <MathText text="$F(x) \in \mathbb{R}$" /> can range freely across the real line. The model updates <MathText text="$F$" /> first, then reapplies sigmoid.
        </div>

        <div className="grid grid-cols-2 gap-3 text-center font-mono text-xs">
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-400 block font-sans text-[11px]">If F = −0.5:</span>
            <span className="text-amber-300 font-bold">σ(−0.5) ≈ 0.377</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-slate-400 block font-sans text-[11px]">If F = +0.5:</span>
            <span className="text-emerald-300 font-bold">σ(+0.5) ≈ 0.622</span>
          </div>
        </div>
      </div>

      {/* ── Bagging versus Boosting ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Table className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Bagging versus Boosting</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-sans">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 text-indigo-300">Dimension</th>
                <th className="py-2.5 px-3 text-purple-300">Bagging / Random Forest</th>
                <th className="py-2.5 px-3 text-amber-300">Boosting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Training Style</td>
                <td className="py-2 px-3 text-purple-300">Independent, parallel trees</td>
                <td className="py-2 px-3 text-amber-300">Sequential, iterative trees</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Role of Each Tree</td>
                <td className="py-2 px-3 text-slate-300">Complete standalone predictor</td>
                <td className="py-2 px-3 text-slate-300">Localized correction model (weak learner)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Regression Combination</td>
                <td className="py-2 px-3 text-slate-300">Average predictions: <MathText text="$\frac{1}{B}\sum T_b(x)$" /></td>
                <td className="py-2 px-3 text-slate-300">Add scaled corrections: <MathText text="$F_0 + \sum \eta h_m(x)$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Classification Combination</td>
                <td className="py-2 px-3 text-slate-300">Majority vote</td>
                <td className="py-2 px-3 text-slate-300">Add raw-score corrections, then apply sigmoid</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Main Strength</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">Reduces variance</td>
                <td className="py-2 px-3 text-cyan-400 font-bold">Corrects systematic errors / reduces bias</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Main Risk</td>
                <td className="py-2 px-3 text-slate-400">May retain high bias if base trees underfit</td>
                <td className="py-2 px-3 text-rose-400 font-bold">Can overfit if trained too long without early stopping</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-purple-400 font-bold font-sans block mb-1">Bagging Architecture</span>
            <span className="text-slate-300">Independent predictions → Average / Majority Vote</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-amber-400 font-bold font-sans block mb-1">Boosting Architecture</span>
            <span className="text-slate-300">Prediction → Error → Correction → New Error → Correction</span>
          </div>
        </div>
      </div>

      {/* ── K-Nearest Neighbors (KNN) ──────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">K-Nearest Neighbors (KNN)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          KNN predicts a query observation using the most similar training points in feature space. The hyperparameter <strong className="text-white">K</strong> specifies how many closest neighbors cast votes or contribute to the prediction.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-cyan-300 uppercase tracking-wider text-[11px]">Euclidean Distance Metric</span>
          <div className="bg-slate-900 p-3 rounded-lg font-mono text-center text-cyan-300 text-sm">
            <MathText text="$$d(x, z) = \sqrt{(x_1 - z_1)^2 + (x_2 - z_2)^2 + \dots + (x_p - z_p)^2}$$" displayMode={true} />
          </div>
          <p className="text-slate-300">
            <strong>Worked Numerical Example:</strong> A new query student has study hours and attendance <MathText text="$x = (7, 88)$" />, and training student C has coordinates <MathText text="$z = (7, 90)$" />:
          </p>
          <div className="bg-slate-900 p-2.5 rounded font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$d = \sqrt{(7 - 7)^2 + (88 - 90)^2} = \sqrt{0 + (-2)^2} = \sqrt{4} = \mathbf{2}$$" displayMode={true} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-sans">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Task Type</th>
                <th className="py-2 px-3 text-emerald-300">KNN Prediction Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Classification</td>
                <td className="py-2 px-3 text-slate-300">Most common class (mode) among the K nearest neighbors</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-300">Regression</td>
                <td className="py-2 px-3 text-slate-300">Arithmetic average (mean) of target values among the K nearest neighbors</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          <strong>Key Sensitivity:</strong> Feature scaling is vital for KNN! A feature measured in large units (e.g. salary in dollars) will completely overwhelm features measured in smaller units (e.g. age in years). Furthermore, small <MathText text="$K$" /> produces high variance (sensitive to individual noisy points), whereas large <MathText text="$K$" /> causes high bias (oversmoothing).
        </div>
      </div>

      {/* ── Interactive: KNN Distance and Prediction ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Compass className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: KNN Distance and Classification</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Distance & Voting Calculator
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <span className="font-bold text-slate-200 block mb-2">1. 2D Euclidean Distance Calculator</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">New x₁:</label>
                <input
                  type="number"
                  value={newX1}
                  onChange={(e) => setNewX1(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">New x₂:</label>
                <input
                  type="number"
                  value={newX2}
                  onChange={(e) => setNewX2(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">Train x₁:</label>
                <input
                  type="number"
                  value={trainX1}
                  onChange={(e) => setTrainX1(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">Train x₂:</label>
                <input
                  type="number"
                  value={trainX2}
                  onChange={(e) => setTrainX2(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
            </div>
            <div className="mt-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
              Calculated Distance: <strong className="text-emerald-400 text-sm">{knnDistance.toFixed(3)}</strong>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-200 block mb-2">2. KNN Majority Voting Simulator</span>
            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">Class A Votes:</label>
                <input
                  type="number"
                  min="0"
                  value={votesA}
                  onChange={(e) => setVotesA(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">Class B Votes:</label>
                <input
                  type="number"
                  min="0"
                  value={votesB}
                  onChange={(e) => setVotesB(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-400 block font-mono">Class C Votes:</label>
                <input
                  type="number"
                  min="0"
                  value={votesC}
                  onChange={(e) => setVotesC(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono"
                />
              </div>
            </div>
            <div className="mt-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
              Consensus Prediction: <strong className="text-cyan-400 text-sm">{voteWinner}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── KNN in Higher Dimensions and the Curse of Dimensionality ──── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <Maximize2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">KNN in Higher Dimensions and the Curse of Dimensionality</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Each feature is one dimension. With more features, Euclidean distance accumulates more squared differences:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-xs">
          <MathText text="$$d^2 = \sum_{j=1}^q (x_j - z_j)^2$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The same quantity of data becomes intensely sparse as dimensions grow. If each feature axis is divided into 10 intervals, the volume of the space explodes exponentially:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Feature Dimensions (q)</th>
                <th className="py-2 px-3 text-rose-300">Required Partition Regions (10^q)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-2 px-3">1</td><td className="py-2 px-3">10</td></tr>
              <tr><td className="py-2 px-3">2</td><td className="py-2 px-3">100</td></tr>
              <tr><td className="py-2 px-3">3</td><td className="py-2 px-3">1,000</td></tr>
              <tr><td className="py-2 px-3 text-amber-300 font-bold">10</td><td className="py-2 px-3 text-rose-400 font-bold">10,000,000,000 (10 Billion!)</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          From probability theory (Recitation 1), for two independent random points <MathText text="$X, Z \sim U[0, 1]^q$" /> uniformly sampled inside a <MathText text="$q$" />-dimensional unit hypercube:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-center text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-sans text-[11px] mb-1">Expected Squared Distance:</span>
            <span className="text-amber-300 font-bold text-sm">E[D²] = q / 6</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block font-sans text-[11px] mb-1">Typical Distance:</span>
            <span className="text-emerald-300 font-bold text-sm">Typical Distance ≈ √(q / 6)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Dimensions (q)</th>
                <th className="py-2 px-3 text-emerald-300">Typical Pairwise Distance √(q/6)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-1.5 px-3">1</td><td className="py-1.5 px-3">√(1/6) ≈ 0.408</td></tr>
              <tr><td className="py-1.5 px-3">10</td><td className="py-1.5 px-3">√(10/6) ≈ 1.291</td></tr>
              <tr><td className="py-1.5 px-3">100</td><td className="py-1.5 px-3">√(100/6) ≈ 4.082</td></tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
          <strong>Important Takeaway:</strong> As dimensions grow, even the nearest neighbor is far away, and all points become roughly equidistant. Irrelevant features dilute real signal with noise. In contrast, <em>decision trees are inherently immune</em> because they perform coordinate-aligned feature selection at every node.
        </div>
      </div>

      {/* ── Interactive: Effect of Dimension on Typical Distance ───────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Maximize2 className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Effect of Dimension on Typical Distance</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Hypercube Geometry
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the number of dimensions <MathText text="$q$" /> to observe how the typical distance between random points expands toward infinity:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="flex justify-between items-center font-mono">
            <span className="text-slate-300">Feature Dimensions (q):</span>
            <span className="text-amber-300 font-bold text-sm">{safeQ}</span>
          </div>
          <input
            type="range"
            min="1"
            max="150"
            value={dimensionsQ}
            onChange={(e) => setDimensionsQ(parseInt(e.target.value) || 1)}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono">
            Typical Pairwise Distance: <strong className="text-rose-400 text-base">√(q/6) ≈ {typicalDist.toFixed(3)}</strong>
          </div>
        </div>
      </div>

      {/* ── Final Comparison of All Supervised Methods ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Table className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Final Comparison of Supervised Methods</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-sans">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Method</th>
                <th className="py-2.5 px-3 text-amber-300">Output</th>
                <th className="py-2.5 px-3 text-slate-300">Main Idea</th>
                <th className="py-2.5 px-3 text-emerald-300">Main Strength</th>
                <th className="py-2.5 px-3 text-rose-300">Main Weakness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300">Linear Regression</td>
                <td className="py-2 px-3 text-slate-400">Continuous</td>
                <td className="py-2 px-3 text-slate-300">Weighted linear sum</td>
                <td className="py-2 px-3 text-emerald-400">Simple and highly interpretable</td>
                <td className="py-2 px-3 text-rose-400">Misses non-linear patterns</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300">Logistic Regression</td>
                <td className="py-2 px-3 text-slate-400">Probability / Class</td>
                <td className="py-2 px-3 text-slate-300">Sigmoid of linear score</td>
                <td className="py-2 px-3 text-emerald-400">Well-calibrated probabilities</td>
                <td className="py-2 px-3 text-rose-400">Linear decision boundary</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300">Classification Tree</td>
                <td className="py-2 px-3 text-slate-400">Class</td>
                <td className="py-2 px-3 text-slate-300">Axis-aligned threshold cuts</td>
                <td className="py-2 px-3 text-emerald-400">Non-linear and interpretable</td>
                <td className="py-2 px-3 text-rose-400">High variance and instability</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300">Regression Tree</td>
                <td className="py-2 px-3 text-slate-400">Continuous</td>
                <td className="py-2 px-3 text-slate-300">Regional arithmetic means</td>
                <td className="py-2 px-3 text-emerald-400">Automatic interaction detection</td>
                <td className="py-2 px-3 text-rose-400">Step-like flat approximations</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300">Bagging</td>
                <td className="py-2 px-3 text-slate-400">Class / Continuous</td>
                <td className="py-2 px-3 text-slate-300">Average independent bootstrap trees</td>
                <td className="py-2 px-3 text-emerald-400">Substantially reduces variance</td>
                <td className="py-2 px-3 text-rose-400">May retain bias of individual trees</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300">Random Forest</td>
                <td className="py-2 px-3 text-slate-400">Class / Continuous</td>
                <td className="py-2 px-3 text-slate-300">Bagging + random feature subsampling</td>
                <td className="py-2 px-3 text-emerald-400">Robust out-of-the-box baseline</td>
                <td className="py-2 px-3 text-rose-400">Loss of direct tree auditability</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300">Gradient Boosting</td>
                <td className="py-2 px-3 text-slate-400">Class / Continuous</td>
                <td className="py-2 px-3 text-slate-300">Sequential additive error correction</td>
                <td className="py-2 px-3 text-emerald-400">Top-tier benchmark accuracy</td>
                <td className="py-2 px-3 text-rose-400">Requires careful tuning (learning rate, depth)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300">KNN</td>
                <td className="py-2 px-3 text-slate-400">Class / Continuous</td>
                <td className="py-2 px-3 text-slate-300">Predict using nearby observations</td>
                <td className="py-2 px-3 text-emerald-400">Zero training time; simple local rules</td>
                <td className="py-2 px-3 text-rose-400">Scale sensitive; degrades in high dimensions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] block">Simple Model-Selection Guide</span>
          <ul className="space-y-1.5 text-slate-300">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Use <strong>Linear / Logistic Regression</strong> when a simple global relationship is plausible or when exact coefficient inference is required.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Use a <strong>Single Decision Tree</strong> when regulatory rule-based interpretability and flowchart explanation take priority.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Use <strong>Random Forests</strong> as a dependable, low-maintenance workhorse model that resists overfitting with minimal hyperparameter tuning.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Use <strong>Gradient Boosting (XGBoost, LightGBM, CatBoost)</strong> when peak predictive accuracy on complex tabular data is the primary objective and resources permit cross-validated tuning.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Use <strong>KNN</strong> when neighboring samples are genuinely similar, features are properly standardized, and the dimensional count is modest.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Final Synthesis & Recap ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Final Course Synthesis
        </h4>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-amber-300">
          Global Linear Model <ArrowRight className="w-3 h-3 inline mx-1.5" /> Local Tree Rules <ArrowRight className="w-3 h-3 inline mx-1.5" /> Many-Tree Ensembles <ArrowRight className="w-3 h-3 inline mx-1.5" /> Local Distance-Based Prediction
        </div>

        <ul className="space-y-1.5 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
            <span><strong>Bagging</strong> averages independent, parallel models to drive variance down to the correlation floor.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
            <span><strong>Boosting</strong> adds sequential, cautious corrections to eliminate systematic error and reduce model bias.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
            <span><strong>Gradient Boosting</strong> uses the loss function's negative gradient to define target pseudo-residuals for each stage.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
            <span><strong>KNN</strong> leverages Euclidean proximity rather than learned axis-aligned partition rules.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
            <span><strong>High Dimensions</strong> cause exponential space sparsity (<MathText text="$10^q$" />) and make pairwise distances expand toward <MathText text="$\sqrt{q/6} \to \infty$" />, motivating feature selection.</span>
          </li>
        </ul>
      </div>

      {/* ── Key Concepts ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div key={concept.title} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>{concept.title}</span>
              </h4>
              {concept.badge && (
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded shrink-0">
                  {concept.badge}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <MathText text={concept.summary} />
            </p>

            <ul className="space-y-1.5 text-xs text-slate-400">
              {concept.bullets.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div><MathText text={b} /></div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
