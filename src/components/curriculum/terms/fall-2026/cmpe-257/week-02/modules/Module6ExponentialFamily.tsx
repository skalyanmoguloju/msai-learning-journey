import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Sliders,
  Calculator,
  Activity,
  Check,
  CheckCircle2,
  HelpCircle,
  BarChart2,
  Table,
  Scale,
  Sigma,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module6ExponentialFamily: React.FC = () => {
  // ── Section 4 Interactive State: η, sigmoid, probability ──────────────
  const [eta, setEta] = useState<number>(2.0);
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const prob = useMemo(() => sigmoid(eta), [eta]);
  const odds = useMemo(() => Math.exp(eta), [eta]);

  // ── Gaussian Interactive State: μ, y, and σ ───────────────────────────
  const [mu, setMu] = useState<number>(1.0);
  const [yVal, setYVal] = useState<number>(2.5);
  const [sigma, setSigma] = useState<number>(1.0);

  const sigmaSq = sigma * sigma;
  const sqError = Math.pow(yVal - mu, 2);
  const gaussianDensity = useMemo(() => {
    const coef = 1 / Math.sqrt(2 * Math.PI * sigmaSq);
    const exponent = -sqError / (2 * sigmaSq);
    return coef * Math.exp(exponent);
  }, [sqError, sigmaSq]);

  const etaGaussian = mu / sigmaSq;
  const aEtaGaussian = (sigmaSq * Math.pow(etaGaussian, 2)) / 2;

  // ── Interactive Quick Check Accordions ────────────────────────────────
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});
  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ── Derivation Tab Switcher ───────────────────────────────────────────
  const [activeDerivationTab, setActiveDerivationTab] = useState<'bernoulli' | 'gaussian'>('bernoulli');

  // SVG Sigmoid curve coordinate points
  const sigmoidCurvePoints = useMemo(() => {
    const pts: string[] = [];
    for (let x = -6; x <= 6; x += 0.2) {
      const px = ((x + 6) / 12) * 260 + 20; // 20 to 280
      const y = sigmoid(x);
      const py = 120 - y * 100; // 20 to 120
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return pts.join(' ');
  }, []);

  const currentEtaDot = useMemo(() => {
    const px = ((eta + 6) / 12) * 260 + 20;
    const py = 120 - prob * 100;
    return { cx: px, cy: py };
  }, [eta, prob]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Header Banner Card ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/70 border border-blue-800/40 rounded-2xl p-6 space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sigma className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">Session 2 · Module 6</span>
              <h2 className="text-xl font-bold text-slate-100">
                Exponential Family, Gaussian Regression, and Bernoulli Logistic Regression
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Intuition First · Formulas Second
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          A beginner-friendly architectural walkthrough of the <strong>Exponential Family</strong>: discovering why Linear Regression
          fundamentally arises from a <em>Gaussian distribution</em> with squared-error loss, while Logistic Regression naturally emerges from
          a <em>Bernoulli distribution</em> with log loss.
        </p>

        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong>Module Goal:</strong> Understand why linear regression uses Gaussian likelihood and squared error, while logistic regression uses Bernoulli likelihood and log loss.
          </div>
        </div>
      </div>

      {/* ── Section 1: Why Do We Need the Exponential Family? ──────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">1. Why Do We Need the Exponential Family?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Linear regression and logistic regression look completely different at first glance because their targets belong to totally different mathematical spaces:
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-semibold text-cyan-300">Model</th>
                <th className="py-2.5 px-4 font-semibold text-cyan-300">Target Type</th>
                <th className="py-2.5 px-4 font-semibold text-cyan-300">Target Range</th>
                <th className="py-2.5 px-4 font-semibold text-cyan-300">Governing Distribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-slate-200">Linear Regression</td>
                <td className="py-2.5 px-4 text-slate-300">Continuous number (real-valued)</td>
                <td className="py-2.5 px-4 font-mono text-indigo-300"><MathText text="$y \in (-\infty, +\infty)$" /></td>
                <td className="py-2.5 px-4 text-emerald-400 font-medium">Gaussian (Normal)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-slate-200">Logistic Regression</td>
                <td className="py-2.5 px-4 text-slate-300">Binary category / boolean label</td>
                <td className="py-2.5 px-4 font-mono text-amber-300"><MathText text="$y \in \{0, 1\}$" /></td>
                <td className="py-2.5 px-4 text-cyan-400 font-medium">Bernoulli</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Although the output distributions are very different, <strong>both models calculate the exact same first step</strong>—a raw linear score combining weights, features, and bias:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300 shadow-inner">
          <MathText text="$$\eta = \theta^T x + b$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="text-cyan-400 font-bold">Key Insight:</span> The exponential family is <strong>not a new prediction algorithm</strong>. It is a shared <em>“mathematical grammar”</em> that unifies diverse probability distributions (Gaussian, Bernoulli, Poisson, Gamma) under one single canonical structure.
        </div>
      </div>

      {/* ── Section 2: The Common Exponential-Family Form ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sigma className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">2. The Common Exponential-Family Form</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Any probability distribution that belongs to the single-parameter canonical exponential family can be rewritten in the standardized form:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-base text-cyan-300 shadow-inner">
          <MathText text="$$p(y \mid \eta) = h(y) \exp\left( \eta T(y) - A(\eta) \right)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Read it in words:</strong> The probability or density of observing target <MathText text="$y$" />, given parameter <MathText text="$\eta$" />, is constructed from four fundamental modular components:
        </p>

        {/* Modular Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Natural Parameter
            </div>
            <div className="font-mono text-sm text-slate-100"><MathText text="$\eta$" /></div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Connects directly to the linear score <MathText text="$\theta^T x + b$" />. In logistic regression, this is the raw logit <MathText text="$z$" />.
            </p>
          </div>

          <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Sufficient Statistic
            </div>
            <div className="font-mono text-sm text-slate-100"><MathText text="$T(y)$" /></div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The function of observed target <MathText text="$y$" /> that encapsulates all information needed for parameter estimation. Often simply <MathText text="$T(y) = y$" />.
            </p>
          </div>

          <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Log-Partition Function
            </div>
            <div className="font-mono text-sm text-slate-100"><MathText text="$A(\eta)$" /></div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              The log-normalizer that ensures total probability integrates or sums to 1. Crucially: its derivative <MathText text="$\nabla A(\eta) = \mathbb{E}[y]$" />!
            </p>
          </div>

          <div className="bg-slate-950/90 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Base Measure
            </div>
            <div className="font-mono text-sm text-slate-100"><MathText text="$h(y)$" /></div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              A scaling term or baseline density that depends only on <MathText text="$y$" />, completely independent of parameter <MathText text="$\eta$" />.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Do Not Confuse:</strong> In exponential family notation, <MathText text="$\eta$" /> (or <MathText text="$z$" />) is a <em>raw linear score</em>. It is not automatically a standardized Gaussian z-score from introductory statistics.
          </div>
        </div>
      </div>

      {/* ── Section 3: Bernoulli Distribution → Logistic Regression ───── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">3. Bernoulli Distribution → Logistic Regression</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For any binary classification problem, target label <MathText text="$y \in \{0, 1\}$" />. If <MathText text="$p$" /> is the probability that <MathText text="$y=1$" />, the Bernoulli probability mass function is expressed compactly as:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$P(y) = p^y (1 - p)^{1 - y}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-emerald-400">When <MathText text="$y = 1$" />:</span>
            <p className="font-mono text-slate-300"><MathText text="$P(1) = p^1 (1-p)^{1-1} = p^1 (1-p)^0 = p$" /></p>
            <p className="text-slate-400 text-[11px]">The second term evaluates to 1, returning positive class probability.</p>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-amber-400">When <MathText text="$y = 0$" />:</span>
            <p className="font-mono text-slate-300"><MathText text="$P(0) = p^0 (1-p)^{1-0} = 1 \cdot (1-p)^1 = 1 - p$" /></p>
            <p className="text-slate-400 text-[11px]">The first term evaluates to 1, returning negative class probability.</p>
          </div>
        </div>

        {/* Step-by-Step Derivation */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            Algebraic Derivation: Rewriting via Log-Odds
          </h4>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-cyan-400">Step 1 — Take natural logarithm:</span>
              <p className="text-slate-400 text-[11px]">Using logarithm rule <MathText text="$\ln(ab) = \ln(a) + \ln(b)$" />:</p>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 mt-1">
                <MathText text="$$\log P(y) = y \log(p) + (1 - y) \log(1 - p)$$" displayMode={true} />
              </div>
            </div>

            <div>
              <span className="font-semibold text-cyan-400">Step 2 — Distribute and group terms by <MathText text="$y$" />:</span>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 mt-1">
                <MathText text="$$\log P(y) = y \left[\log(p) - \log(1 - p)\right] + \log(1 - p) = y \log\left(\frac{p}{1 - p}\right) + \log(1 - p)$$" displayMode={true} />
              </div>
            </div>

            <div>
              <span className="font-semibold text-cyan-400">Step 3 — Identify natural parameter <MathText text="$\eta$" /> (Logit / Log-Odds):</span>
              <p className="text-slate-400 text-[11px]">Define the logit function as the log-odds:</p>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 mt-1">
                <MathText text="$$\eta = \text{logit}(p) = \log\left(\frac{p}{1 - p}\right)$$" displayMode={true} />
              </div>
            </div>

            <div>
              <span className="font-semibold text-cyan-400">Step 4 — Invert for probability <MathText text="$p$" /> to get the Sigmoid:</span>
              <p className="text-slate-400 text-[11px]">Solving <MathText text="$\eta = \log(p / (1-p))$" /> for <MathText text="$p$" /> yields:</p>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 mt-1">
                <MathText text="$$p = \frac{e^\eta}{1 + e^\eta} = \frac{1}{1 + e^{-\eta}} = \sigma(\eta)$$" displayMode={true} />
              </div>
              <p className="text-slate-400 text-[11px] mt-1">Notice that: <MathText text="$1 - p = 1 - \frac{e^\eta}{1 + e^\eta} = \frac{1}{1 + e^\eta} = (1 + e^\eta)^{-1}$" />.</p>
            </div>

            <div>
              <span className="font-semibold text-cyan-400">Step 5 — Substitute back and exponentiate:</span>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 mt-1">
                <MathText text="$$\log P(y) = y\eta + \log\left((1 + e^\eta)^{-1}\right) = y\eta - \log(1 + e^\eta)$$" displayMode={true} />
              </div>
              <p className="text-slate-400 text-[11px] mt-1">Exponentiating both sides matches the canonical formula perfectly:</p>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 mt-1">
                <MathText text="$$P(y \mid \eta) = 1 \cdot \exp\left( \eta y - \log(1 + e^\eta) \right)$$" displayMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Bernoulli Components Summary */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3 font-semibold text-cyan-300">Exponential Piece</th>
                <th className="py-2 px-3 font-semibold text-cyan-300">Bernoulli Value</th>
                <th className="py-2 px-3 font-semibold text-cyan-300">Role in Logistic Regression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-mono text-purple-300"><MathText text="$h(y)$" /></td>
                <td className="py-2 px-3 font-mono text-slate-100">1</td>
                <td className="py-2 px-3 text-slate-400">No data scaling needed for binary counts</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-amber-300"><MathText text="$T(y)$" /></td>
                <td className="py-2 px-3 font-mono text-slate-100"><MathText text="$y$" /></td>
                <td className="py-2 px-3 text-slate-400">The binary outcome indicator itself</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-cyan-300"><MathText text="$\eta$" /></td>
                <td className="py-2 px-3 font-mono text-slate-100"><MathText text="$\log\left(\frac{p}{1-p}\right) = \theta^T x + b$" /></td>
                <td className="py-2 px-3 text-slate-400">Log-odds score produced by linear features</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-emerald-300"><MathText text="$A(\eta)$" /></td>
                <td className="py-2 px-3 font-mono text-slate-100"><MathText text="$\log(1 + e^\eta)$" /></td>
                <td className="py-2 px-3 text-slate-400">Log-partition (derivative yields <MathText text="$\frac{e^\eta}{1+e^\eta} = p$" />!)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Section 4: Interactive: η, Sigmoid, and Probability ───────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">4. Interactive: <MathText text="$\eta$" />, Sigmoid, Probability & Odds</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Live Parameter Explorer
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Move the slider to see how adjusting the raw linear score <MathText text="$\eta$" /> transforms directly into predicted probability <MathText text="$p = \sigma(\eta)$" /> and class odds <MathText text="$\frac{p}{1-p}$" />.
        </p>

        {/* Controls */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span>Linear Score <MathText text="$\eta = \theta^T x + b$" />:</span>
              <span className="font-mono text-sm text-cyan-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {eta.toFixed(1)}
              </span>
            </label>
            <div className="flex items-center gap-3">
              <input
                id="eta-slider"
                type="range"
                min="-6"
                max="6"
                step="0.1"
                value={eta}
                onChange={(e) => setEta(parseFloat(e.target.value))}
                className="w-48 sm:w-64 accent-cyan-500 cursor-pointer"
              />
              <button
                onClick={() => setEta(2.0)}
                className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                Reset (2.0)
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-slate-400">Presets:</span>
            {[
              { label: 'Strong Negative (η = -3.0)', val: -3.0 },
              { label: 'Decision Boundary (η = 0.0)', val: 0.0 },
              { label: 'Moderate Positive (η = 2.0)', val: 2.0 },
              { label: 'High Confidence (η = 4.5)', val: 4.5 }
            ].map(p => (
              <button
                key={p.label}
                onClick={() => setEta(p.val)}
                className={`px-2 py-0.5 text-[11px] rounded transition-all ${
                  Math.abs(eta - p.val) < 0.05
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Metric Cards + SVG Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Raw Linear Score</span>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-base text-cyan-300 border border-slate-800">
              <MathText text={`$\\eta = ${eta.toFixed(1)}$`} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Unbounded real value <MathText text="$\eta \in (-\infty, +\infty)$" /> from the linear feature combination.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Probability <MathText text="$p = P(y=1)$" /></span>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-base text-emerald-300 border border-slate-800">
              <MathText text={`$p = \\sigma(${eta.toFixed(1)}) = ${prob.toFixed(3)}$`} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sigmoid squashes the real score into a valid probability strictly in <MathText text="$(0, 1)$" />.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Odds of Class 1</span>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-base text-amber-300 border border-slate-800">
              <MathText text={`$\\text{odds} = \\frac{p}{1-p} = ${odds > 1000 ? odds.toExponential(2) : odds.toFixed(3)}$`} />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ratio of success to failure. When <MathText text="$\eta > 0$" />, odds exceed 1.0 (success is more likely).
            </p>
          </div>
        </div>

        {/* Live SVG Sigmoid Visualizer */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold text-slate-200">Sigmoid Transfer Curve with Live Point</span>
            <span className="font-mono text-cyan-300">Coordinate: ({eta.toFixed(1)}, {prob.toFixed(3)})</span>
          </div>

          <div className="w-full flex justify-center py-2 overflow-x-auto">
            <svg viewBox="0 0 300 140" className="w-full max-w-md h-36 bg-slate-900/80 rounded-xl border border-slate-800">
              {/* Grid Lines */}
              <line x1="20" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="3 3" />
              <line x1="20" y1="70" x2="280" y2="70" stroke="#334155" strokeDasharray="3 3" />
              <line x1="20" y1="120" x2="280" y2="120" stroke="#475569" />
              <line x1="150" y1="20" x2="150" y2="120" stroke="#475569" />

              {/* Labels */}
              <text x="8" y="24" fill="#94a3b8" fontSize="9" textAnchor="end">p=1</text>
              <text x="8" y="74" fill="#94a3b8" fontSize="9" textAnchor="end">p=0.5</text>
              <text x="8" y="124" fill="#94a3b8" fontSize="9" textAnchor="end">p=0</text>
              <text x="20" y="134" fill="#64748b" fontSize="8" textAnchor="middle">-6</text>
              <text x="150" y="134" fill="#64748b" fontSize="8" textAnchor="middle">0 (boundary)</text>
              <text x="280" y="134" fill="#64748b" fontSize="8" textAnchor="middle">+6</text>

              {/* Sigmoid Polyline */}
              <polyline
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
                points={sigmoidCurvePoints}
              />

              {/* Live Point */}
              <line
                x1={currentEtaDot.cx}
                y1="120"
                x2={currentEtaDot.cx}
                y2={currentEtaDot.cy}
                stroke="#38bdf8"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1={currentEtaDot.cy}
                x2={currentEtaDot.cx}
                y2={currentEtaDot.cy}
                stroke="#38bdf8"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={currentEtaDot.cx}
                cy={currentEtaDot.cy}
                r="5"
                fill="#38bdf8"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            <strong>The End-to-End Prediction Path:</strong>{' '}
            <span className="font-mono text-cyan-300">x</span> <ArrowRight className="w-3 h-3 inline mx-1" />{' '}
            <span className="font-mono text-cyan-300">η = z = θᵀx + b</span> <ArrowRight className="w-3 h-3 inline mx-1" />{' '}
            <span className="font-mono text-cyan-300">sigmoid σ(η)</span> <ArrowRight className="w-3 h-3 inline mx-1" />{' '}
            <span className="font-mono text-cyan-300">p = P(y=1)</span>
          </div>
        </div>
      </div>

      {/* ── Section 5: Gaussian Distribution → Linear Regression ──────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">5. Gaussian Distribution → Linear Regression</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For continuous numerical targets, linear regression assumes that the target outcome <MathText text="$y$" /> is normally distributed around the predicted center <MathText text="$\mu$" /> with variance <MathText text="$\sigma^2$" />:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-sm text-indigo-300 shadow-inner">
          <MathText text="$$y \sim \mathcal{N}(\mu, \sigma^2) \implies p(y \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(y - \mu)^2}{2\sigma^2} \right)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The exponent contains the exact quadratic penalty <MathText text="$(y - \mu)^2$" /> (the <strong>squared prediction error</strong>). Observed values further from the center receive exponentially lower probability density.
        </p>

        {/* Step-by-Step Expansion */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
            Algebraic Derivation: Factoring into Canonical Exponential Family Form
          </h4>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-indigo-400">Step 1 — Expand the quadratic error:</span>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-indigo-300 mt-1">
                <MathText text="$$(y - \mu)^2 = y^2 - 2y\mu + \mu^2$$" displayMode={true} />
              </div>
            </div>

            <div>
              <span className="font-semibold text-indigo-400">Step 2 — Distribute inside the exponential:</span>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-indigo-300 mt-1">
                <MathText text="$$p(y \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{y^2}{2\sigma^2} + \frac{y\mu}{\sigma^2} - \frac{\mu^2}{2\sigma^2} \right)$$" displayMode={true} />
              </div>
            </div>

            <div>
              <span className="font-semibold text-indigo-400">Step 3 — Separate into modular Exponential Family factors:</span>
              <p className="text-slate-400 text-[11px]">For fixed variance <MathText text="$\sigma^2$" />, define natural parameter <MathText text="$\eta = \frac{\mu}{\sigma^2}$" /> and <MathText text="$T(y) = y$" />:</p>
              <div className="p-2 bg-slate-900 rounded-lg font-mono text-indigo-300 mt-1">
                <MathText text="$$p(y \mid \eta) = \underbrace{\frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{y^2}{2\sigma^2}\right)}_{h(y)} \cdot \exp\left( \eta y - \underbrace{\frac{\sigma^2 \eta^2}{2}}_{A(\eta)} \right)$$" displayMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Special Case Callout */}
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200">
          <strong>Important Standard Special Case (<MathText text="$\sigma^2 = 1$" />):</strong> When variance is unit variance, <MathText text="$\eta = \mu$" /> and the log-partition simplifies to <MathText text="$$A(\eta) = \frac{\eta^2}{2} = \frac{\mu^2}{2}$$" />. Differentiating yields <MathText text="$\nabla A(\eta) = \eta = \mu = \mathbb{E}[y]$" />!
        </div>

        {/* Live Interactive Gaussian Widget */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Interactive Gaussian Error & Natural Parameter Calculator
            </span>
            <span className="text-[11px] font-mono text-indigo-300">
              Density p(y) = {gaussianDensity.toFixed(4)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 flex justify-between">
                <span>Predicted Mean (<MathText text="$\mu$" />):</span>
                <span className="font-mono text-cyan-300">{mu.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={mu}
                onChange={(e) => setMu(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 flex justify-between">
                <span>Observed Target (<MathText text="$y$" />):</span>
                <span className="font-mono text-indigo-300">{yVal.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.5"
                value={yVal}
                onChange={(e) => setYVal(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 flex justify-between">
                <span>Standard Dev (<MathText text="$\sigma$" />):</span>
                <span className="font-mono text-emerald-300">{sigma.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={sigma}
                onChange={(e) => setSigma(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Error <MathText text="$(y - \mu)$" /></div>
              <div className="font-mono text-cyan-300 mt-1">{(yVal - mu).toFixed(1)}</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Squared Error <MathText text="$(y - \mu)^2$" /></div>
              <div className="font-mono text-amber-300 mt-1">{sqError.toFixed(2)}</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Natural <MathText text="$\eta = \frac{\mu}{\sigma^2}$" /></div>
              <div className="font-mono text-indigo-300 mt-1">{etaGaussian.toFixed(2)}</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Log-Partition <MathText text="$A(\eta)$" /></div>
              <div className="font-mono text-emerald-300 mt-1">{aEtaGaussian.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 6: Why Gaussian Likelihood Gives Squared Error ────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">6. Why Gaussian Likelihood Gives Squared Error</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For each training example <MathText text="$i$" />, linear regression predicts the mean conditional center:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$\mu_i = \theta^T x_i + b$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Assuming training examples are <strong>independent and identically distributed (IID)</strong>, the overall dataset likelihood is the product of Gaussian densities:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 text-center space-y-2">
          <MathText text="$$L(\theta, b) = \prod_{i=1}^m p(y_i \mid x_i; \theta, b) = \prod_{i=1}^m \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(y_i - (\theta^T x_i + b))^2}{2\sigma^2} \right)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Taking the natural logarithm transforms the product of exponential terms into a clean mathematical summation:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="$$\ell(\theta, b) = \text{constant} - \frac{1}{2\sigma^2} \sum_{i=1}^m \left[ y_i - (\theta^T x_i + b) \right]^2$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <Check className="w-4 h-4" />
            The Unavoidable Conclusion:
          </div>
          <p>
            When variance <MathText text="$\sigma^2$" /> is fixed, the constant prefix and positive factor <MathText text="$\frac{1}{2\sigma^2}$" /> do not alter the location of the argmax.
            Maximizing the Gaussian log-likelihood <MathText text="$\max \ell(\theta, b)$" /> is mathematically <strong>100% equivalent to minimizing the Sum of Squared Errors (SSE)</strong>:
          </p>
          <div className="p-2 bg-slate-950 rounded font-mono text-center text-emerald-300">
            <MathText text="$$\min_{\theta, b} \sum_{i=1}^m \left( y_i - (\theta^T x_i + b) \right)^2$$" displayMode={true} />
          </div>
          <p className="text-[11px] text-emerald-300/80 font-medium">
            Gaussian Assumption <ArrowRight className="w-3 h-3 inline mx-0.5" /> Gaussian Likelihood <ArrowRight className="w-3 h-3 inline mx-0.5" /> Squared-Error Loss Training.
          </p>
        </div>
      </div>

      {/* ── Section 7: GLM Construction Recipe ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">7. The GLM Construction Recipe</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Every Generalized Linear Model is specified completely by making <strong>three foundational architectural choices</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-[10px]">1</span>
              Choose Target Distribution
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Select an Exponential Family member matching target data constraints (continuous Gaussian, binary Bernoulli, integer Poisson).
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-indigo-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-[10px]">2</span>
              Compute Linear Predictor
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Calculate the weighted linear combination score <MathText text="$\eta = \theta^T x + b$" /> across input features.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-[10px]">3</span>
              Select Link Function
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Define the function <MathText text="$g(\mu) = \eta$" /> mapping the expected mean <MathText text="$\mu$" /> to the unbounded score <MathText text="$\eta$" />.
            </p>
          </div>
        </div>

        {/* Master Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-purple-300">Component</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Linear Regression</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-300">Logistic Regression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Target Distribution</td>
                <td className="py-2.5 px-3 font-medium text-slate-200">Gaussian <MathText text="$\mathcal{N}(\mu, \sigma^2)$" /></td>
                <td className="py-2.5 px-3 font-medium text-slate-200">Bernoulli <MathText text="$\text{Bernoulli}(p)$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Linear Predictor</td>
                <td className="py-2.5 px-3 font-mono text-cyan-300"><MathText text="$\eta = \theta^T x + b$" /></td>
                <td className="py-2.5 px-3 font-mono text-cyan-300"><MathText text="$\eta = \theta^T x + b$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Canonical Link Function</td>
                <td className="py-2.5 px-3 font-mono text-indigo-300">Identity: <MathText text="$g(\mu) = \mu$" /></td>
                <td className="py-2.5 px-3 font-mono text-emerald-300">Logit: <MathText text="$g(p) = \log\left(\frac{p}{1-p}\right)$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Inverse Link (Prediction)</td>
                <td className="py-2.5 px-3 font-mono text-indigo-300"><MathText text="$\mu = \eta$" /></td>
                <td className="py-2.5 px-3 font-mono text-emerald-300">Sigmoid: <MathText text="$p = \sigma(\eta) = \frac{1}{1 + e^{-\eta}}$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Optimization Loss Function</td>
                <td className="py-2.5 px-3 text-amber-300 font-semibold">Squared Error Loss (MSE)</td>
                <td className="py-2.5 px-3 text-cyan-300 font-semibold">Negative Log-Likelihood / Log Loss</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-xs text-purple-300">
          Distribution Assumption <ArrowRight className="w-3 h-3 inline mx-1.5" /> Likelihood Formulation <ArrowRight className="w-3 h-3 inline mx-1.5" /> Natural Loss Function
        </div>
      </div>

      {/* ── Section 8: Quick Check Interactive Accordions ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <HelpCircle className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">8. Quick Check: Self-Test Questions</h3>
          </div>
          <span className="text-[11px] text-slate-400">Click to reveal answers & test your intuition</span>
        </div>

        <div className="space-y-3">
          {/* Question 1 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q1')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold mt-0.5">Q1</span>
                <span>What does <MathText text="$\eta$" /> represent before passing through the sigmoid function?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q1');
                }}
              >
                {revealedAnswers['q1'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q1'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q1'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  <MathText text="$\eta$" /> is the <strong>raw unbounded linear score</strong>: <MathText text="$\eta = \theta^T x + b$" />.
                  It represents the log-odds (logit) of the positive class and can range from <MathText text="$-\infty$" /> to <MathText text="$+\infty$" />. It is <em>not</em> yet a probability until passed through the non-linear sigmoid link function.
                </p>
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q2')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold mt-0.5">Q2</span>
                <span>Why does logistic regression use log loss instead of squared error?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q2');
                }}
              >
                {revealedAnswers['q2'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q2'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q2'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  Its binary target <MathText text="$y \in \{0, 1\}$" /> is governed by a <strong>Bernoulli distribution</strong>.
                  Taking the negative log of the Bernoulli likelihood yields binary cross-entropy (log loss).
                  Applying squared error to sigmoid outputs produces non-convex loss surfaces with severe vanishing gradients.
                </p>
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q3')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold mt-0.5">Q3</span>
                <span>Why does linear regression naturally use squared error?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q3');
                }}
              >
                {revealedAnswers['q3'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q3'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q3'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  Its continuous target is modeled with a <strong>Gaussian distribution</strong>.
                  The Gaussian probability density function contains <MathText text="$\exp\left(-\frac{(y-\mu)^2}{2\sigma^2}\right)$" />.
                  Taking the log turns this exponential into <MathText text="$-\frac{1}{2\sigma^2}(y-\mu)^2$" />, which directly turns Maximum Likelihood Estimation into Ordinary Least Squares!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 9: Final Memory Map ───────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-blue-800/40 rounded-2xl p-6 space-y-4 shadow-lg">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Final Memory Map</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          Keep these two parallel architectural pipelines firmly in memory:
        </p>

        <div className="space-y-3">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-indigo-500/30 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold font-sans">Linear Regression:</span>
            <span className="text-slate-300">x</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-cyan-300">η = θᵀx + b</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-indigo-300">μ = η (Identity)</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-300">Gaussian Dist</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-amber-300 font-bold">Squared Error Loss</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-500/30 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold font-sans">Logistic Regression:</span>
            <span className="text-slate-300">x</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-cyan-300">η = θᵀx + b</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-indigo-300">p = σ(η) (Sigmoid)</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-emerald-300">Bernoulli Dist</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
            <span className="text-amber-300 font-bold">Log Loss (Cross-Entropy)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 leading-relaxed">
          <strong>The Golden Synthesis:</strong> The linear predictor <MathText text="$\eta = \theta^T x + b$" /> is completely shared across models.
          The choice of target distribution and link function determines what that raw score represents, how predictions are generated, and which loss function is mathematically required.
        </div>
      </div>
    </div>
  );
};
