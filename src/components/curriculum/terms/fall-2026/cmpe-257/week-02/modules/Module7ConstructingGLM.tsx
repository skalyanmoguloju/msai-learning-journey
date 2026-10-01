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
  Wrench,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Binary,
  GitBranch,
  ShieldCheck
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module7ConstructingGLM: React.FC = () => {
  // ── Part 2 Interactive State: η, sigmoid probability, odds ───────────
  const [eta, setEta] = useState<number>(2.0);
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const prob = useMemo(() => sigmoid(eta), [eta]);
  const odds = useMemo(() => Math.exp(eta), [eta]);
  const isClass1 = prob > 0.5;

  // ── Part 3 & 4 Pipeline Active Step Selector ─────────────────────────
  const [activePipelineTab, setActivePipelineTab] = useState<'linear' | 'logistic'>('logistic');

  // ── Interactive Quick Review Accordion State ─────────────────────────
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});
  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // SVG Sigmoid curve coordinate points for mini-display
  const sigmoidCurvePoints = useMemo(() => {
    const pts: string[] = [];
    for (let x = -6; x <= 6; x += 0.2) {
      const px = ((x + 6) / 12) * 260 + 20;
      const y = sigmoid(x);
      const py = 120 - y * 100;
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
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-blue-950/70 border border-amber-800/40 rounded-2xl p-6 space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Wrench className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">Session 2 · Module 7</span>
              <h2 className="text-xl font-bold text-slate-100">
                Constructing Generalized Linear Models
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Beginner-Friendly: Intuition First
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Learn how to engineer machine learning models systematically from ground up: choose an exponential family distribution
          for the target, compute the shared linear score <MathText text="$\eta = \theta^T x + b$" />, and employ an inverse link function
          to produce mathematically sound predictions.
        </p>

        {/* Roadmap Steps */}
        <div className="pt-2">
          <div className="text-[11px] uppercase font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Module Roadmap
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
            {[
              { num: '1', title: 'The 3 Ingredients' },
              { num: '2', title: 'Link vs Inverse Link' },
              { num: '3', title: 'Linear Regression GLM' },
              { num: '4', title: 'Logistic Regression GLM' },
              { num: '5', title: 'Complete Comparison' }
            ].map((step) => (
              <div key={step.num} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-amber-400 font-bold block">Step {step.num}</span>
                <span className="text-slate-300 text-[11px] font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Main Idea:</strong> A GLM chooses a distribution for the target, calculates a linear score <MathText text="$\eta$" />, and uses a suitable link function to turn that score into the correct kind of prediction.
          </div>
        </div>
      </div>

      {/* ── The Three Ingredients ──────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Three Ingredients of a GLM</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Ingredient 1 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold">1</span>
                Ingredient 1
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800">Target</span>
            </div>
            <h4 className="font-semibold text-slate-200">Choose a Distribution</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              First ask: <em>what kind of values can the target output <MathText text="$y$" /> take?</em>
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                <strong className="text-indigo-400">Continuous:</strong> <MathText text="$y \sim \mathcal{N}(\mu, \sigma^2)$" />
                <p className="text-slate-500 mt-0.5">e.g. house price, temperature, test score</p>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                <strong className="text-emerald-400">Binary 0/1:</strong> <MathText text="$y \sim \text{Bernoulli}(p)$" />
                <p className="text-slate-500 mt-0.5">e.g. spam / not spam, pass / fail</p>
              </div>
            </div>
          </div>

          {/* Ingredient 2 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-bold">2</span>
                Ingredient 2
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800">Score</span>
            </div>
            <h4 className="font-semibold text-slate-200">Calculate Linear Predictor</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Both models combine input features in the exact same weighted linear fashion:
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-center text-xs text-amber-300">
              <MathText text="$$\eta = \theta^T x + b = \sum_{j=1}^d \theta_j x_j + b$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              This is the <strong>raw linear score</strong>. It is unbounded (<MathText text="$\eta \in \mathbb{R}$" />) and not automatically a probability.
            </p>
          </div>

          {/* Ingredient 3 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold">3</span>
                Ingredient 3
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800">Connection</span>
            </div>
            <h4 className="font-semibold text-slate-200">Choose the Link Function</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Connects the expected response <MathText text="$\mu = \mathbb{E}[y \mid x]$" /> to the raw linear score <MathText text="$\eta$" />:
            </p>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-[11px] space-y-1">
              <div className="text-slate-300 font-mono text-center">
                <MathText text="$g(\text{expected output}) = \eta$" />
              </div>
              <div className="text-emerald-300 font-mono text-center pt-1 border-t border-slate-800">
                <MathText text="$\text{expected output} = g^{-1}(\eta)$" />
              </div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              The inverse link <MathText text="$g^{-1}(\eta)$" /> is what converts raw scores into predictions at runtime.
            </p>
          </div>
        </div>
      </div>

      {/* ── Link Functions and Inverse Links ────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Link Functions and Inverse Links</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The raw score <MathText text="$\eta$" /> can take any value from <MathText text="$-\infty$" /> to <MathText text="$+\infty$" />. The link function bridges the gap between this unconstrained linear score and the target domain constraints.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Identity Link */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">Identity Link: Linear Regression</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">Unrestricted</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              A Gaussian mean <MathText text="$\mu$" /> can be any real number (<MathText text="$\mu \in \mathbb{R}$" />). Therefore, no conversion or squashing is required:
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-indigo-300 border border-slate-800">
              <MathText text="$$g(\mu) = \mu \implies \eta = \mu \quad \text{and} \quad \mu = g^{-1}(\eta) = \eta$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              The identity link simply does nothing because the raw score domain directly matches the target mean range.
            </p>
          </div>

          {/* Logit Link */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">Logit Link: Logistic Regression</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px]"><MathText text="$p \in (0,1)$" /></span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              A Bernoulli probability must strictly satisfy <MathText text="$0 < p < 1$" />. The logit function converts this bounded range into the unbounded score:
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-cyan-300 border border-slate-800">
              <MathText text="$$\text{logit}(p) = \log\left(\frac{p}{1-p}\right) = \eta$$" displayMode={true} />
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              The inverse logit is the famous <strong>Sigmoid function</strong>:
            </p>
            <div className="p-2 bg-slate-900 rounded-lg text-center font-mono text-emerald-300 border border-slate-800">
              <MathText text="$$p = g^{-1}(\eta) = \sigma(\eta) = \frac{1}{1 + e^{-\eta}}$$" displayMode={true} />
            </div>
          </div>
        </div>

        {/* Direction Matters Callout */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Direction Matters:</strong> The link function <MathText text="$g(\cdot)$" /> goes from expected output to score (<MathText text="$p \to \eta$" />).
            During model prediction and inference, we use the <em>inverse link function</em> <MathText text="$g^{-1}(\cdot)$" /> to go from score to prediction (<MathText text="$\eta \to p$" />).
          </div>
        </div>

        {/* Interactive Controls & Live Cards */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <span>Interactive Linear Score (<MathText text="$\eta$" />):</span>
              <span className="font-mono text-sm text-cyan-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {eta.toFixed(1)}
              </span>
            </label>
            <div className="flex items-center gap-3">
              <input
                id="eta-slider-m7"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Sigmoid Probability</span>
              <div className="p-2 bg-slate-950 rounded font-mono text-base text-emerald-300 text-center border border-slate-800">
                <MathText text={`$p = ${prob.toFixed(3)}$`} />
              </div>
              <p className="text-[11px] text-slate-400">
                <MathText text={`$p = \\frac{1}{1 + e^{-(${eta.toFixed(1)})}}$`} />
              </p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Odds (<MathText text="$\frac{p}{1-p}$" />)</span>
              <div className="p-2 bg-slate-950 rounded font-mono text-base text-amber-300 text-center border border-slate-800">
                <MathText text={`$\\text{odds} = ${odds > 1000 ? odds.toExponential(2) : odds.toFixed(3)}$`} />
              </div>
              <p className="text-[11px] text-slate-400">
                Ratio of positive to negative likelihood.
              </p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Classification Decision</span>
              <div className={`p-2 rounded font-semibold text-xs text-center border ${
                isClass1
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}>
                {isClass1 ? 'Predict Class 1 (p > 0.5)' : 'Predict Class 0 (p ≤ 0.5)'}
              </div>
              <p className="text-[11px] text-slate-400">
                {isClass1 ? 'Class 1 is more likely than class 0.' : 'Class 0 is more likely than class 1.'}
              </p>
            </div>
          </div>

          {/* SVG Sigmoid Curve Visualizer */}
          <div className="pt-2">
            <div className="w-full flex justify-center overflow-x-auto">
              <svg viewBox="0 0 300 135" className="w-full max-w-md h-32 bg-slate-900/90 rounded-xl border border-slate-800">
                <line x1="20" y1="20" x2="280" y2="20" stroke="#334155" strokeDasharray="3 3" />
                <line x1="20" y1="70" x2="280" y2="70" stroke="#334155" strokeDasharray="3 3" />
                <line x1="20" y1="120" x2="280" y2="120" stroke="#475569" />
                <line x1="150" y1="20" x2="150" y2="120" stroke="#475569" />

                <text x="8" y="24" fill="#94a3b8" fontSize="8" textAnchor="end">p=1.0</text>
                <text x="8" y="74" fill="#94a3b8" fontSize="8" textAnchor="end">p=0.5</text>
                <text x="8" y="124" fill="#94a3b8" fontSize="8" textAnchor="end">p=0.0</text>
                <text x="20" y="132" fill="#64748b" fontSize="8" textAnchor="middle">-6</text>
                <text x="150" y="132" fill="#64748b" fontSize="8" textAnchor="middle">0</text>
                <text x="280" y="132" fill="#64748b" fontSize="8" textAnchor="middle">+6</text>

                <polyline fill="none" stroke="#06b6d4" strokeWidth="2.5" points={sigmoidCurvePoints} />

                <line x1={currentEtaDot.cx} y1="120" x2={currentEtaDot.cx} y2={currentEtaDot.cy} stroke="#38bdf8" strokeDasharray="2 2" />
                <line x1="20" y1={currentEtaDot.cy} x2={currentEtaDot.cx} y2={currentEtaDot.cy} stroke="#38bdf8" strokeDasharray="2 2" />
                <circle cx={currentEtaDot.cx} cy={currentEtaDot.cy} r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive 5-Step Pipeline Tabbed Explorer ────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Calculator className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Parts 3 & 4 — Constructing Models as GLMs (5 Steps)</h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActivePipelineTab('linear')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activePipelineTab === 'linear'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Linear Regression GLM
            </button>
            <button
              onClick={() => setActivePipelineTab('logistic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activePipelineTab === 'logistic'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Logistic Regression GLM
            </button>
          </div>
        </div>

        {/* Linear Regression 5-Step Pipeline */}
        {activePipelineTab === 'linear' && (
          <div className="space-y-3 animate-fade-in text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Step 1 — Target & Distribution</span>
              <p className="text-slate-300">
                A continuous target assumes normal variability around predicted center <MathText text="$\mu$" />:
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-indigo-300 text-center">
                <MathText text="$$y \sim \mathcal{N}(\mu, \sigma^2)$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Step 2 — Linear Predictor</span>
              <p className="text-slate-300">Combine weighted features with bias:</p>
              <div className="p-2 bg-slate-900 rounded font-mono text-cyan-300 text-center">
                <MathText text="$$\eta = \theta^T x + b$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Step 3 — Link Function</span>
              <p className="text-slate-300">Use the identity link because <MathText text="$\mu \in \mathbb{R}$" /> is unbounded:</p>
              <div className="p-2 bg-slate-900 rounded font-mono text-indigo-300 text-center">
                <MathText text="$$g(\mu) = \mu \implies \mu = \eta = \theta^T x + b$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Step 4 — Concrete Prediction Example</span>
              <p className="text-slate-300">
                If the linear score calculates to <MathText text="$\eta = 400,000$" /> (e.g. house valuation):
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 text-center">
                <MathText text="$$\mu = \eta = \$400,000, \quad \text{modeling actual output as } y \sim \mathcal{N}(400,000, \sigma^2)$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Step 5 — Training Objective</span>
              <p className="text-slate-300">
                The Gaussian likelihood exponent contains the squared distance from the mean <MathText text="$(y - \mu)^2$" />. Maximizing log-likelihood across the dataset is mathematically identical to minimizing:
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-amber-300 text-center">
                <MathText text="$$\min_{\theta, b} \sum_{i=1}^m \left[ y_i - (\theta^T x_i + b) \right]^2$$" displayMode={true} />
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-center">
                Gaussian Distribution <ArrowRight className="w-3 h-3 inline mx-1" /> Identity Link <ArrowRight className="w-3 h-3 inline mx-1" /> Predicted Mean <ArrowRight className="w-3 h-3 inline mx-1" /> Squared Error Loss
              </div>
            </div>
          </div>
        )}

        {/* Logistic Regression 5-Step Pipeline */}
        {activePipelineTab === 'logistic' && (
          <div className="space-y-3 animate-fade-in text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Step 1 — Target & Distribution</span>
              <p className="text-slate-300">
                A binary target uses the Bernoulli distribution where <MathText text="$p = P(y=1 \mid x)$" />:
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-cyan-300 text-center">
                <MathText text="$$y \sim \text{Bernoulli}(p)$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Step 2 — Linear Predictor</span>
              <p className="text-slate-300">Features are combined into raw linear score:</p>
              <div className="p-2 bg-slate-900 rounded font-mono text-cyan-300 text-center">
                <MathText text="$$\eta = \theta^T x + b$$" displayMode={true} />
              </div>
              <p className="text-slate-400 text-[11px]">
                For instance, <MathText text="$\eta = 2.5$" /> is a real number, not yet constrained to <MathText text="$[0, 1]$" />.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Step 3 — Link Function</span>
              <p className="text-slate-300">Define the logit link mapping probability to unbounded score:</p>
              <div className="p-2 bg-slate-900 rounded font-mono text-indigo-300 text-center">
                <MathText text="$$\text{logit}(p) = \log\left(\frac{p}{1-p}\right) = \eta$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Step 4 — Inverse Link & Concrete Probability</span>
              <p className="text-slate-300">Invert to get the sigmoid hypothesis function:</p>
              <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 text-center">
                <MathText text="$$p = \sigma(\eta) = \frac{1}{1 + e^{-\eta}}$$" displayMode={true} />
              </div>
              <p className="text-slate-300 pt-1">
                If <MathText text="$\eta = 2.5$" />:
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 text-center">
                <MathText text="$$p = \frac{1}{1 + e^{-2.5}} \approx 0.924 = 92.4\% \quad (\text{Predict class 1 since } 0.924 > 0.5)$$" displayMode={true} />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Step 5 — Training Objective</span>
              <p className="text-slate-300">
                The Bernoulli likelihood is <MathText text="$P(y \mid p) = p^y(1-p)^{1-y}$" />. Taking the negative log-likelihood across the dataset produces Binary Cross-Entropy / Log Loss:
              </p>
              <div className="p-2 bg-slate-900 rounded font-mono text-amber-300 text-center">
                <MathText text="$$\min_{\theta, b} -\sum_{i=1}^m \left[ y_i \log(p_i) + (1 - y_i)\log(1 - p_i) \right]$$" displayMode={true} />
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold text-center">
                Bernoulli Distribution <ArrowRight className="w-3 h-3 inline mx-1" /> Logit Link <ArrowRight className="w-3 h-3 inline mx-1" /> Sigmoid Probability <ArrowRight className="w-3 h-3 inline mx-1" /> Log Loss
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Complete Comparison Table ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Table className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete Comparative Architecture</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-purple-300">GLM Step</th>
                <th className="py-2.5 px-3 font-semibold text-indigo-300">Linear Regression</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Logistic Regression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Target Type</td>
                <td className="py-2.5 px-3 text-slate-200">Continuous number (<MathText text="$y \in \mathbb{R}$" />)</td>
                <td className="py-2.5 px-3 text-slate-200">Binary category (<MathText text="$y \in \{0, 1\}$" />)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Distribution</td>
                <td className="py-2.5 px-3 font-medium text-indigo-300">Gaussian <MathText text="$\mathcal{N}(\mu, \sigma^2)$" /></td>
                <td className="py-2.5 px-3 font-medium text-cyan-300">Bernoulli <MathText text="$\text{Bernoulli}(p)$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Linear Predictor</td>
                <td className="py-2.5 px-3 font-mono text-cyan-300"><MathText text="$\eta = \theta^T x + b$" /></td>
                <td className="py-2.5 px-3 font-mono text-cyan-300"><MathText text="$\eta = \theta^T x + b$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Link Function</td>
                <td className="py-2.5 px-3 font-mono text-indigo-300">Identity: <MathText text="$g(\mu) = \mu$" /></td>
                <td className="py-2.5 px-3 font-mono text-cyan-300">Logit: <MathText text="$g(p) = \log\left(\frac{p}{1-p}\right)$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Inverse Link (Prediction)</td>
                <td className="py-2.5 px-3 font-mono text-indigo-300"><MathText text="$\mu = \eta$" /></td>
                <td className="py-2.5 px-3 font-mono text-emerald-300">Sigmoid: <MathText text="$p = \sigma(\eta) = \frac{1}{1 + e^{-\eta}}$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Likelihood Function</td>
                <td className="py-2.5 px-3 text-slate-300">Gaussian product density</td>
                <td className="py-2.5 px-3 text-slate-300">Bernoulli compact product</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Derived Loss Objective</td>
                <td className="py-2.5 px-3 text-amber-300 font-semibold">Squared Error Loss (MSE)</td>
                <td className="py-2.5 px-3 text-cyan-300 font-semibold">Binary Cross-Entropy (Log Loss)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Synthesis Pipeline Banner */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-xs text-purple-300">
          Target Type <ArrowRight className="w-3 h-3 inline mx-1" /> Distribution <ArrowRight className="w-3 h-3 inline mx-1" /> Link Function <ArrowRight className="w-3 h-3 inline mx-1" /> Likelihood <ArrowRight className="w-3 h-3 inline mx-1" /> Loss Objective
        </div>

        {/* Side by side summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-1.5">
            <span className="font-bold text-indigo-300 uppercase tracking-wider block">Linear Regression Pipeline</span>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-slate-200">
              <MathText text="$$x \longrightarrow \eta = \theta^T x + b \longrightarrow \mu = \eta$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Direct pass-through of the linear score to the Gaussian mean.</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-1.5">
            <span className="font-bold text-cyan-300 uppercase tracking-wider block">Logistic Regression Pipeline</span>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-slate-200">
              <MathText text="$$x \longrightarrow \eta = \theta^T x + b \longrightarrow p = \sigma(\eta)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Squashes the linear score through the sigmoid inverse link.</p>
          </div>
        </div>

        {/* Multi-Class Softmax Extension */}
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-purple-300">
            <GitBranch className="w-4 h-4" />
            Natural Extension: Softmax Regression (Multinomial GLM)
          </div>
          <p className="leading-relaxed">
            When target <MathText text="$y$" /> can take one of <MathText text="$K > 2$" /> discrete classes, we model the output using a <strong>Multinomial distribution</strong>.
            Applying the exact same GLM construction recipe naturally forces the <strong>Softmax function</strong>:
          </p>
          <div className="p-2 bg-slate-950 rounded font-mono text-purple-300 text-center">
            <MathText text="$$P(y = k \mid x; \theta) = \frac{e^{\theta_k^T x}}{\sum_{j=1}^K e^{\theta_j^T x}}$$" displayMode={true} />
          </div>
        </div>
      </div>

      {/* ── Quick Review Interactive Accordion ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-amber-400">
            <HelpCircle className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Quick Review: Check Your Intuition</h3>
          </div>
          <span className="text-[11px] text-slate-400">Click to reveal explanations</span>
        </div>

        <div className="space-y-3">
          {/* Question 1 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q1')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold mt-0.5">Q1</span>
                <span>Is <MathText text="$\eta$" /> automatically a probability?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shrink-0 transition-colors flex items-center gap-1"
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
                  <strong>No.</strong> <MathText text="$\eta$" /> is strictly the raw weighted linear score <MathText text="$\eta = \theta^T x + b$" />.
                  It can be any positive or negative real number (<MathText text="$\eta \in \mathbb{R}$" />).
                  The non-linear sigmoid inverse link is required to map it into a valid probability in <MathText text="$(0, 1)$" />.
                </p>
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q2')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold mt-0.5">Q2</span>
                <span>Why does linear regression use the identity link function?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shrink-0 transition-colors flex items-center gap-1"
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
                  A Gaussian conditional mean <MathText text="$\mu$" /> can take any real value from <MathText text="$-\infty$" /> to <MathText text="$+\infty$" />.
                  Because the domain of <MathText text="$\mu$" /> is already identical to the range of the raw linear predictor <MathText text="$\eta$" />,
                  the identity link <MathText text="$g(\mu) = \mu$" /> does not need to compress, clip, or transform the values.
                </p>
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q3')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold mt-0.5">Q3</span>
                <span>Why does logistic regression use the sigmoid inverse link?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shrink-0 transition-colors flex items-center gap-1"
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
                  Probabilities are strictly bounded between 0 and 1.
                  The logit link is <MathText text="$\eta = \log(p / (1-p))$" />.
                  Solving this equation for <MathText text="$p$" /> algebraically yields the sigmoid function <MathText text="$p = \frac{1}{1 + e^{-\eta}}$" />,
                  which smoothly maps any real-valued score <MathText text="$\eta \in (-\infty, +\infty)$" /> directly into the open probability interval <MathText text="$(0, 1)$" />.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
