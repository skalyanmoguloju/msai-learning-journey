import React, { useState, useMemo } from 'react';
import {
  Dices,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Activity,
  BarChart3,
  GitCommit,
  Layers,
  Scale,
  Percent,
  ScatterChart,
  ShieldAlert
} from 'lucide-react';
import { MathText } from '../../../../../common';

interface ModuleProps {
  onGoToQuiz?: () => void;
  onOpenFlashcards?: () => void;
}

// Error function approximation for Gaussian CDF
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1 / (1 + p * absX);
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function normalPDF(x: number, mu = 0, sigma = 1): number {
  if (sigma <= 0) return 0;
  return Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2)) / (sigma * Math.sqrt(2 * Math.PI));
}

export const Module3Probability: React.FC<ModuleProps> = ({ onGoToQuiz, onOpenFlashcards }) => {
  // --- Section 1: Variable Type ---
  const [variableType, setVariableType] = useState<'discrete' | 'continuous'>('discrete');

  // --- Section 2: Bernoulli Distribution ---
  const [bernoulliP, setBernoulliP] = useState<number>(0.5);

  const bernoulliStats = useMemo(() => {
    const p = Math.max(0, Math.min(1, bernoulliP));
    const q = 1 - p;
    const expected = p;
    const variance = p * q;
    return { p, q, expected, variance };
  }, [bernoulliP]);

  // --- Section 3: Expected Value & Variance ---
  const [outcome1, setOutcome1] = useState<number>(1);
  const [prob1, setProb1] = useState<number>(0.2);
  const [outcome2, setOutcome2] = useState<number>(4);
  const [prob2, setProb2] = useState<number>(0.5);
  const [outcome3, setOutcome3] = useState<number>(8);

  const distStats = useMemo(() => {
    const p3 = Math.max(0, 1 - prob1 - prob2);
    const valid = prob1 >= 0 && prob2 >= 0 && prob1 + prob2 <= 1.0001;
    const mean = outcome1 * prob1 + outcome2 * prob2 + outcome3 * p3;
    const variance =
      prob1 * Math.pow(outcome1 - mean, 2) +
      prob2 * Math.pow(outcome2 - mean, 2) +
      p3 * Math.pow(outcome3 - mean, 2);
    const stdDev = Math.sqrt(variance);
    return { p3, valid, mean, variance, stdDev };
  }, [outcome1, prob1, outcome2, prob2, outcome3]);

  // --- Section 4: Gaussian / Normal Distribution ---
  const [gaussMu, setGaussMu] = useState<number>(0);
  const [gaussSigma, setGaussSigma] = useState<number>(1);
  const [gaussEvalX, setGaussEvalX] = useState<number>(0);

  const gaussStats = useMemo(() => {
    const sigma = Math.max(0.1, gaussSigma);
    const variance = sigma * sigma;
    const density = normalPDF(gaussEvalX, gaussMu, sigma);
    const z = (gaussEvalX - gaussMu) / sigma;
    return { sigma, variance, density, z };
  }, [gaussMu, gaussSigma, gaussEvalX]);

  // --- Section 5: Z-Score & Standard Normal ---
  const [zX, setZX] = useState<number>(80);
  const [zMu, setZMu] = useState<number>(70);
  const [zSigma, setZSigma] = useState<number>(10);

  const zStats = useMemo(() => {
    const sigma = Math.max(0.01, zSigma);
    const z = (zX - zMu) / sigma;
    const probBelow = normalCDF(z);
    return { sigma, z, probBelow };
  }, [zX, zMu, zSigma]);

  // --- Section 6: Covariance & Correlation ---
  const [xDataStr, setXDataStr] = useState<string>('1, 2, 3, 4, 5');
  const [yDataStr, setYDataStr] = useState<string>('2, 4, 5, 8, 10');

  const covStats = useMemo(() => {
    const xs = xDataStr.split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n));
    const ys = yDataStr.split(',').map(s => Number(s.trim())).filter(n => Number.isFinite(n));

    if (xs.length !== ys.length || xs.length < 2) {
      return { valid: false, error: 'Enter two lists with the same number of numerical values (at least 2).' };
    }

    const n = xs.length;
    const meanX = xs.reduce((a, b) => a + b, 0) / n;
    const meanY = ys.reduce((a, b) => a + b, 0) / n;

    const cov = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0) / n;
    const varX = xs.reduce((sum, x) => sum + Math.pow(x - meanX, 2), 0) / n;
    const varY = ys.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0) / n;

    const denom = Math.sqrt(varX * varY);
    const corr = denom > 0.00001 ? Math.max(-1, Math.min(1, cov / denom)) : 0;

    let interp = 'No clear linear relationship.';
    if (corr > 0.7) interp = 'Strong positive linear correlation.';
    else if (corr > 0.2) interp = 'Moderate positive linear correlation.';
    else if (corr < -0.7) interp = 'Strong negative linear correlation.';
    else if (corr < -0.2) interp = 'Moderate negative linear correlation.';

    return { valid: true, xs, ys, meanX, meanY, cov, corr, interp };
  }, [xDataStr, yDataStr]);

  // --- Section 7: Bayes' Theorem ---
  const [baseRate, setBaseRate] = useState<number>(0.01); // 1%
  const [sensitivity, setSensitivity] = useState<number>(0.95); // 95%
  const [specificity, setSpecificity] = useState<number>(0.90); // 90%

  const bayesStats = useMemo(() => {
    const pD = baseRate;
    const pNotD = 1 - baseRate;
    const pPosGivenD = sensitivity;
    const pPosGivenNotD = 1 - specificity; // false positive rate

    const pPos = pPosGivenD * pD + pPosGivenNotD * pNotD;
    const pDAndPos = pPosGivenD * pD;
    const posterior = pPos > 0 ? pDAndPos / pPos : 0;

    return { pD, pNotD, pPosGivenD, pPosGivenNotD, pPos, pDAndPos, posterior };
  }, [baseRate, sensitivity, specificity]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Overview Banner */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Probability provides the mathematical framework for modeling uncertainty in machine learning, while statistics allows models to infer patterns and parameters from noisy observed data.
        </p>

        <div className="p-3.5 bg-blue-950/40 border border-blue-800/40 rounded-xl text-xs text-blue-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Core Intuition:</strong> Probability describes what might happen before data is observed, while statistics estimates underlying data-generating distributions from collected datasets.
          </div>
        </div>

        {/* High-Level Concept Table */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-blue-300">
                <th className="py-2 px-3 font-semibold">Concept</th>
                <th className="py-2 px-3 font-semibold">Simple Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 px-3 font-bold text-white">Random Variable</td>
                <td className="py-2 px-3">A mathematical symbol whose observed value depends on chance.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-white">Probability Distribution</td>
                <td className="py-2 px-3">A function specifying how likely different outcomes or intervals are.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-white">Expected Value</td>
                <td className="py-2 px-3">The long-run probability-weighted average outcome (<MathText text="$\mathbb{E}[X]$" />).</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-white">Variance &amp; Covariance</td>
                <td className="py-2 px-3">Spread around the mean (<MathText text="$\text{Var}(X)$" />) and directional co-movement between two variables.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-white">Bayes' Theorem</td>
                <td className="py-2 px-3">A principled formula to invert conditional probabilities and update beliefs given evidence.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. RANDOM VARIABLES AND DISTRIBUTIONS */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Dices className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Random Variables and Distributions</h4>
          </div>
          <span className="text-xs text-slate-400">Discrete vs. Continuous</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          A <strong>random variable</strong> <MathText text="$X$" /> assigns numerical values to outcomes of a random process. For instance, tossing a coin can be mapped to <MathText text="$X = 1$" /> (heads) and <MathText text="$X = 0$" /> (tails).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Discrete Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              Discrete Random Variables
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Takes countable, separated values (e.g. dice outcomes, customer counts, token IDs).
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-blue-300">
              <MathText text="$P(X = x) = p(x), \quad \sum_x P(X = x) = 1$" />
            </div>
            <span className="text-[11px] text-slate-400 block">
              Characterized by a <strong>Probability Mass Function (PMF)</strong>.
            </span>
          </div>

          {/* Continuous Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
              Continuous Random Variables
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Takes any real value within an interval (e.g. height, weights, embeddings, audio waves).
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-teal-300">
              <MathText text="$P(a \le X \le b) = \int_a^b f(x) dx, \quad P(X = x) = 0$" />
            </div>
            <span className="text-[11px] text-slate-400 block">
              Characterized by a <strong>Probability Density Function (PDF)</strong>.
            </span>
          </div>
        </div>

        {/* PMF vs PDF vs CDF Comparison Table */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-white block">PMF, PDF, and Cumulative Distribution Function (CDF):</span>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3">Function Name</th>
                  <th className="py-2 px-3">Variable Domain</th>
                  <th className="py-2 px-3">Mathematical Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2 px-3 font-bold text-blue-400">PMF (Probability Mass Function)</td>
                  <td className="py-2 px-3">Discrete</td>
                  <td className="py-2 px-3">Probability of each exact outcome: <MathText text="$P(X = x)$" /></td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-teal-400">PDF (Probability Density Function)</td>
                  <td className="py-2 px-3">Continuous</td>
                  <td className="py-2 px-3">Relative likelihood; area under curve over <MathText text="$[a, b]$" /> yields probability.</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-purple-400">CDF (Cumulative Distribution Function)</td>
                  <td className="py-2 px-3">Both Types</td>
                  <td className="py-2 px-3">Accumulated probability: <MathText text="$F(x) = P(X \le x)$" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Interactive Variable Type Toggle */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-300">Select Variable Type Example:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setVariableType('discrete')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  variableType === 'discrete'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Discrete: Dice Result
              </button>
              <button
                onClick={() => setVariableType('continuous')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  variableType === 'continuous'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                Continuous: Person's Height
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
            {variableType === 'discrete' ? (
              <span>
                <strong>Discrete Example (Dice Toss):</strong> Outcomes are exclusively in <MathText text="$\{1, 2, 3, 4, 5, 6\}$" />. We query exact point probabilities such as <MathText text="$P(X = 4) = \frac{1}{6}$" />.
              </span>
            ) : (
              <span>
                <strong>Continuous Example (Height):</strong> Measurements take uncountably infinite values inside a real interval. The exact probability of being exactly 175.000000... cm is zero; instead we integrate density across an interval: <MathText text="$P(170 \le X \le 180) = \int_{170}^{180} f(x) dx$" />.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BERNOULLI DISTRIBUTION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Bernoulli Distribution</h4>
          </div>
          <span className="text-xs text-slate-400">Binary Trial Foundation</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          A Bernoulli random variable models a single experiment with exactly two mutually exclusive outcomes: Success (<MathText text="$X = 1$" />) with probability <MathText text="$p$" />, and Failure (<MathText text="$X = 0$" />) with probability <MathText text="$1 - p$" />.
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1 text-slate-200">
          <div><MathText text="$X \sim \text{Bernoulli}(p)$" /></div>
          <div><MathText text="$P(X = 1) = p, \quad P(X = 0) = 1 - p$" /></div>
          <div className="text-indigo-300 font-bold pt-1 border-t border-slate-800">
            <MathText text="$\mathbb{E}[X] = p, \quad \text{Var}(X) = p(1 - p)$" />
          </div>
        </div>

        {/* Interactive Bernoulli Slider & SVG Bar Chart */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" /> Interactive Bernoulli Trial
            </h5>
            <span className="text-xs font-mono text-indigo-300">
              p = {bernoulliStats.p.toFixed(2)}, 1 - p = {bernoulliStats.q.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Slider & Math Readout */}
            <div className="md:col-span-6 space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-300">Success Probability (p):</span>
                  <span className="font-mono text-indigo-400 font-bold">{bernoulliStats.p.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={bernoulliP}
                  onChange={e => setBernoulliP(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
                <div><MathText text={`$P(X = 1) = p = ${bernoulliStats.p.toFixed(2)}$`} /></div>
                <div><MathText text={`$P(X = 0) = 1 - p = ${bernoulliStats.q.toFixed(2)}$`} /></div>
                <div className="text-indigo-400 font-bold pt-1 border-t border-slate-800">
                  <MathText text={`$\\mathbb{E}[X] = p = ${bernoulliStats.expected.toFixed(2)}$`} />
                </div>
                <div className="text-emerald-400 font-bold">
                  <MathText text={`$\\text{Var}(X) = p(1 - p) = (${bernoulliStats.p.toFixed(2)})(${bernoulliStats.q.toFixed(2)}) = ${bernoulliStats.variance.toFixed(4)}$`} />
                </div>
              </div>
            </div>

            {/* SVG Bar Chart */}
            <div className="md:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full max-w-[280px] h-[160px] bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-end justify-around gap-4 relative">
                {/* Bar 0: Failure */}
                <div className="flex flex-col items-center gap-1 w-20">
                  <span className="text-[11px] font-mono text-amber-400 font-bold">
                    {(bernoulliStats.q * 100).toFixed(0)}%
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-200"
                    style={{ height: `${Math.max(4, bernoulliStats.q * 100)}px` }}
                  />
                  <span className="text-xs font-semibold text-slate-300">Failure (0)</span>
                </div>

                {/* Bar 1: Success */}
                <div className="flex flex-col items-center gap-1 w-20">
                  <span className="text-[11px] font-mono text-indigo-400 font-bold">
                    {(bernoulliStats.p * 100).toFixed(0)}%
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-200"
                    style={{ height: `${Math.max(4, bernoulliStats.p * 100)}px` }}
                  />
                  <span className="text-xs font-semibold text-slate-300">Success (1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. EXPECTED VALUE AND VARIANCE */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Expected Value and Variance</h4>
          </div>
          <span className="text-xs text-slate-400">Mean &amp; Dispersion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Expected Value (Center of Mass)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              The theoretical long-run average result if the experiment were repeated indefinitely:
            </p>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-white">
              <MathText text="$\mathbb{E}[X] = \mu = \sum_{x} x \cdot P(X = x)$" />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
              Variance (Squared Spread)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              The expected squared deviation from the mean, measuring distribution dispersion:
            </p>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-white">
              <MathText text="$\text{Var}(X) = \sigma^2 = \mathbb{E}[(X - \mu)^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2$" />
            </div>
          </div>
        </div>

        {/* Interactive 3-Outcome Distribution */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            Interactive Weighted Distribution Calculator
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Inputs */}
            <div className="md:col-span-6 p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Outcomes and Probabilities:</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-blue-400 block mb-1">Value x₁:</label>
                  <input
                    type="number"
                    value={outcome1}
                    onChange={e => setOutcome1(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 w-full"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-blue-400 block mb-1">Probability p₁:</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={prob1}
                    onChange={e => setProb1(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-teal-400 block mb-1">Value x₂:</label>
                  <input
                    type="number"
                    value={outcome2}
                    onChange={e => setOutcome2(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 w-full"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-teal-400 block mb-1">Probability p₂:</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={prob2}
                    onChange={e => setProb2(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-purple-400 block mb-1">Value x₃:</label>
                  <input
                    type="number"
                    value={outcome3}
                    onChange={e => setOutcome3(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 w-full"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-purple-400 block mb-1">Auto p₃ = 1 - p₁ - p₂:</label>
                  <div className="p-2 bg-slate-950 text-center font-mono text-sm text-purple-300 rounded border border-slate-800">
                    {distStats.p3.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Readout */}
            <div className="md:col-span-6 p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5">
              {!distStats.valid ? (
                <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 rounded-lg text-xs font-sans">
                  Probabilities p₁ + p₂ exceed 1.0. Adjust probabilities so sum ≤ 1.
                </div>
              ) : (
                <>
                  <div className="text-slate-300">
                    <MathText text={`$\\mathbb{E}[X] = (${outcome1})(${prob1}) + (${outcome2})(${prob2}) + (${outcome3})(${distStats.p3.toFixed(2)}) = $`} />
                    <strong className="text-emerald-400 text-sm ml-1">{distStats.mean.toFixed(4)}</strong>
                  </div>
                  <div className="text-slate-300 pt-1 border-t border-slate-800">
                    <MathText text={`$\\text{Var}(X) = \\sum p_i (x_i - \\mu)^2 = $`} />
                    <strong className="text-teal-400 text-sm ml-1">{distStats.variance.toFixed(4)}</strong>
                  </div>
                  <div className="text-slate-400">
                    Standard Deviation: <MathText text={`$\\sigma = \\sqrt{\\text{Var}(X)} = ${distStats.stdDev.toFixed(4)}$`} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. GAUSSIAN (NORMAL) DISTRIBUTION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Gaussian (Normal) Distribution</h4>
          </div>
          <span className="text-xs text-slate-400">Continuous Bell Curve</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The continuous Gaussian distribution <MathText text="$\mathcal{N}(\mu, \sigma^2)$" /> represents symmetric clustering around mean <MathText text="$\mu$" />, governed by dispersion <MathText text="$\sigma$" />:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)$" />
        </div>

        {/* 68-95-99.7 Empirical Rule */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-blue-400 block">68.27% within 1σ</span>
            <p className="text-[11px] text-slate-400"><MathText text="$[\mu - \sigma, \mu + \sigma]$" /> captures ~68% of mass.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-teal-400 block">95.45% within 2σ</span>
            <p className="text-[11px] text-slate-400"><MathText text="$[\mu - 2\sigma, \mu + 2\sigma]$" /> captures ~95% of mass.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-purple-400 block">99.73% within 3σ</span>
            <p className="text-[11px] text-slate-400"><MathText text="$[\mu - 3\sigma, \mu + 3\sigma]$" /> captures ~99.7% of mass.</p>
          </div>
        </div>

        {/* Interactive Gaussian Simulator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Interactive Gaussian Density Lab
          </h5>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Mean (μ):</span>
                  <span className="font-mono text-blue-400 font-bold">{gaussMu.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={gaussMu}
                  onChange={e => setGaussMu(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Standard Deviation (σ):</span>
                  <span className="font-mono text-teal-400 font-bold">{gaussSigma.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={gaussSigma}
                  onChange={e => setGaussSigma(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Evaluate Density at x:</label>
                <input
                  type="number"
                  step="0.1"
                  value={gaussEvalX}
                  onChange={e => setGaussEvalX(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 w-full"
                />
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                <div>Density <MathText text={`$f(${gaussEvalX}) = ${gaussStats.density.toFixed(5)}$`} /></div>
                <div>Standardized <MathText text={`$z = \\frac{${gaussEvalX} - ${gaussMu}}{${gaussStats.sigma}} = ${gaussStats.z.toFixed(3)}$`} /></div>
              </div>
            </div>

            {/* SVG Bell Curve Plot */}
            <div className="lg:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 self-start">
                PDF Curve N({gaussMu.toFixed(1)}, {gaussStats.variance.toFixed(2)})
              </span>
              <div className="w-full max-w-[320px] aspect-[16/10] bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="-8 0 16 0.8" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                  {/* Axis */}
                  <line x1="-8" y1="0.75" x2="8" y2="0.75" stroke="#475569" strokeWidth="0.01" />

                  {/* Bell curve line */}
                  <path
                    d={Array.from({ length: 160 }, (_, i) => {
                      const x = -8 + (i / 159) * 16;
                      const y = 0.75 - normalPDF(x, gaussMu, gaussStats.sigma);
                      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(4)}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="0.03"
                  />

                  {/* Vertical line at evaluation point x */}
                  <line
                    x1={gaussEvalX}
                    y1="0.75"
                    x2={gaussEvalX}
                    y2={0.75 - gaussStats.density}
                    stroke="#f59e0b"
                    strokeWidth="0.04"
                    strokeDasharray="0.03,0.03"
                  />
                  <circle cx={gaussEvalX} cy={0.75 - gaussStats.density} r="0.05" fill="#f59e0b" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. Z-SCORES & STANDARD NORMAL DISTRIBUTION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Percent className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Z-Scores &amp; Standardization</h4>
          </div>
          <span className="text-xs text-slate-400">Scale-Free Standardization Z ~ N(0, 1)</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          A <strong>z-score</strong> measures how many standard deviations an observation <MathText text="$x$" /> lies above or below the mean <MathText text="$\mu$" />, standardizing diverse features onto a uniform scale <MathText text="$Z \sim \mathcal{N}(0, 1)$" />:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$z = \frac{x - \mu}{\sigma}, \quad P(Z \le z) = \Phi(z) = \int_{-\infty}^z \frac{1}{\sqrt{2\pi}} e^{-t^2/2} dt$" />
        </div>

        {/* Interactive Z-Score Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Percent className="w-4 h-4 text-teal-400" /> Interactive Z-Score Lab
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Observed Value x:</label>
              <input
                type="number"
                value={zX}
                onChange={e => setZX(Number(e.target.value))}
                className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
              />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Mean μ:</label>
              <input
                type="number"
                value={zMu}
                onChange={e => setZMu(Number(e.target.value))}
                className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
              />
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <label className="text-xs font-bold text-slate-300 block">Std Dev σ:</label>
              <input
                type="number"
                min="0.01"
                value={zSigma}
                onChange={e => setZSigma(Number(e.target.value))}
                className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-300">
              <MathText text={`$z = \\frac{${zX} - ${zMu}}{${zStats.sigma}} = $`} />
              <strong className="text-teal-400 text-base ml-1">{zStats.z.toFixed(4)}</strong>
            </div>
            <div className="text-slate-300">
              Cumulative Probability <MathText text={`$P(Z \\le ${zStats.z.toFixed(2)}) = \\Phi(${zStats.z.toFixed(2)}) \\approx $`} />
              <strong className="text-white text-base ml-1">{(zStats.probBelow * 100).toFixed(2)}%</strong>
            </div>
            <p className="font-sans text-[11px] text-slate-400">
              Approximately <strong>{(zStats.probBelow * 100).toFixed(1)}%</strong> of observations in this normal population fall below <MathText text={`$x = ${zX}$`} />.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. COVARIANCE AND CORRELATION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <ScatterChart className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Covariance and Correlation</h4>
          </div>
          <span className="text-xs text-slate-400">Bivariate Linear Dependency</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>Covariance</strong> measures whether two random variables move in the same direction, while Pearson <strong>correlation</strong> normalizes covariance to lie strictly between <MathText text="$-1$" /> and <MathText text="$+1$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-orange-400 block">Covariance Formula:</span>
            <div className="font-mono text-xs text-white">
              <MathText text="$\text{Cov}(X, Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)]$" />
            </div>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 block">Pearson Correlation:</span>
            <div className="font-mono text-xs text-white">
              <MathText text="$\text{Corr}(X, Y) = \rho_{XY} = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y} \in [-1, 1]$" />
            </div>
          </div>
        </div>

        {/* Interactive Covariance Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ScatterChart className="w-4 h-4 text-orange-400" /> Interactive Dataset Relationship Lab
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">X Values (comma-separated):</label>
                <input
                  type="text"
                  value={xDataStr}
                  onChange={e => setXDataStr(e.target.value)}
                  className="w-full p-2 bg-slate-950 font-mono text-xs text-white rounded border border-slate-700"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Y Values (comma-separated):</label>
                <input
                  type="text"
                  value={yDataStr}
                  onChange={e => setYDataStr(e.target.value)}
                  className="w-full p-2 bg-slate-950 font-mono text-xs text-white rounded border border-slate-700"
                />
              </div>
            </div>

            {/* Calculated Metrics */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              {!covStats.valid ? (
                <div className="p-2 bg-rose-950/50 border border-rose-800 text-rose-300 rounded text-xs font-sans">
                  {covStats.error}
                </div>
              ) : (
                <>
                  <div className="text-slate-300">
                    Means: <MathText text={`$\\mu_X = ${covStats.meanX?.toFixed(2)}, \\quad \\mu_Y = ${covStats.meanY?.toFixed(2)}$`} />
                  </div>
                  <div className="text-orange-300 font-bold pt-1 border-t border-slate-800">
                    <MathText text={`$\\text{Cov}(X, Y) = ${covStats.cov?.toFixed(4)}$`} />
                  </div>
                  <div className="text-amber-400 font-bold text-sm">
                    <MathText text={`$\\text{Corr}(X, Y) = ${covStats.corr?.toFixed(4)}$`} />
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] font-sans text-slate-300">
                    {covStats.interp}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. CONDITIONAL PROBABILITY & BAYES' THEOREM */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <GitCommit className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Conditional Probability and Bayes' Theorem</h4>
          </div>
          <span className="text-xs text-slate-400">Belief Updating Given Evidence</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Conditional probability defines the likelihood of event <MathText text="$A$" /> given that event <MathText text="$B$" /> has occurred. <strong>Bayes' Theorem</strong> inverts this relationship to compute posterior probability:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B)} = \frac{P(B \mid A) P(A)}{P(B \mid A)P(A) + P(B \mid \neg A)P(\neg A)}$" />
        </div>

        {/* Interactive Medical Diagnostic Test Lab */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-pink-400" />
              Medical Screening &amp; The Base Rate Fallacy
            </h5>
            <span className="text-xs font-mono text-pink-300">
              P(D|+) = {(bayesStats.posterior * 100).toFixed(1)}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Sliders */}
            <div className="md:col-span-6 space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Disease Base Rate P(D):</span>
                  <span className="font-mono text-pink-400 font-bold">{(baseRate * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.2"
                  step="0.001"
                  value={baseRate}
                  onChange={e => setBaseRate(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Test Sensitivity P(+|D):</span>
                  <span className="font-mono text-teal-400 font-bold">{(sensitivity * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.01"
                  value={sensitivity}
                  onChange={e => setSensitivity(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Test Specificity P(-|¬D):</span>
                  <span className="font-mono text-blue-400 font-bold">{(specificity * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.01"
                  value={specificity}
                  onChange={e => setSpecificity(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Step-by-Step Readout */}
            <div className="md:col-span-6 p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400">
                1. Total Positive Rate:
                <div className="text-slate-200">
                  <MathText text={`$P(+) = (${bayesStats.pPosGivenD.toFixed(2)})(${bayesStats.pD.toFixed(3)}) + (${bayesStats.pPosGivenNotD.toFixed(2)})(${bayesStats.pNotD.toFixed(3)}) = $`} />
                  <strong className="text-white ml-1">{(bayesStats.pPos * 100).toFixed(2)}%</strong>
                </div>
              </div>

              <div className="text-slate-400 pt-1 border-t border-slate-800">
                2. Joint Probability (True Positive):
                <div className="text-slate-200">
                  <MathText text={`$P(D \\cap +) = (${bayesStats.pPosGivenD.toFixed(2)})(${bayesStats.pD.toFixed(3)}) = ${bayesStats.pDAndPos.toFixed(4)}$`} />
                </div>
              </div>

              <div className="text-pink-400 font-bold pt-1 border-t border-slate-800 text-sm">
                <MathText text={`$P(D \\mid +) = \\frac{${bayesStats.pDAndPos.toFixed(4)}}{${bayesStats.pPos.toFixed(4)}} = $`} />
                <span className="text-base text-pink-300 ml-1">{(bayesStats.posterior * 100).toFixed(2)}%</span>
              </div>

              <p className="font-sans text-[11px] text-slate-400 leading-relaxed pt-1">
                Even with a 95% sensitive test, if a condition is rare (base rate ~1%), a positive test yields only ~{(bayesStats.posterior * 100).toFixed(1)}% posterior probability because false positives among healthy individuals outnumber true positives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer Navigation */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-white">Ready to test what you've learned?</div>
          <div className="text-[11px] text-slate-400">
            Reinforce your probability and statistics mastery with the week-wide interactive practice quiz or formula flashcards.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenFlashcards && (
            <button
              onClick={onOpenFlashcards}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Review Flashcards</span>
            </button>
          )}

          {onGoToQuiz && (
            <button
              onClick={onGoToQuiz}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Practice Week 2 Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module3Probability;
