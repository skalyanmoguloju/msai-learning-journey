import React, { useState, useMemo } from 'react';
import {
  Sliders,
  Check,
  CheckCircle2,
  Calculator,
  Scissors,
  Split,
  Layers,
  ArrowRight,
  Table,
  Apple,
  Home,
  Maximize2,
  BarChart3,
  Scale
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module4RegressionCART: React.FC = () => {
  // ── Interactive Leaf Mean & SSE Calculator State ─────────────────────
  const [val1, setVal1] = useState<number>(50);
  const [val2, setVal2] = useState<number>(60);
  const [val3, setVal3] = useState<number>(70);
  const [val4, setVal4] = useState<number>(0);
  const [useVal4, setUseVal4] = useState<boolean>(false);

  const { leafValues, mean, sse, residuals } = useMemo(() => {
    const list = [val1, val2, val3];
    if (useVal4) list.push(val4);

    const n = list.length;
    const avg = list.reduce((acc, curr) => acc + curr, 0) / n;
    const res = list.map(v => ({
      val: v,
      diff: v - avg,
      sq: (v - avg) * (v - avg)
    }));
    const totalSse = res.reduce((acc, curr) => acc + curr.sq, 0);

    return {
      leafValues: list,
      mean: avg,
      sse: totalSse,
      residuals: res
    };
  }, [val1, val2, val3, val4, useVal4]);

  // ── Interactive Cost-Complexity Pruning Alpha Slider ─────────────────
  const [alpha, setAlpha] = useState<number>(2.5);

  let leafCount = 12;
  let trainMse = 1.2;
  let testMse = 4.8;
  let statusText = 'Overfit Large Tree';
  let badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';

  if (alpha >= 1 && alpha < 3) {
    leafCount = 8;
    trainMse = 1.8;
    testMse = 3.2;
    statusText = 'Pruned Subtree (Optimal Bias-Variance Balance)';
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  } else if (alpha >= 3 && alpha < 6) {
    leafCount = 4;
    trainMse = 2.6;
    testMse = 3.6;
    statusText = 'Heavily Pruned Subtree';
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  } else if (alpha >= 6) {
    leafCount = 1;
    trainMse = 5.2;
    testMse = 5.4;
    statusText = 'Decision Stump / Root Only (Underfitting)';
    badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  }

  const costComplexityScore = trainMse + alpha * (leafCount / 2);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Why Classification Trees Are Not Enough ────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why Classification Trees Are Not Enough</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A classification tree predicts categorical labels such as <em>Pass vs. Fail</em> or <em>Spam vs. Ham</em>. A regression tree predicts continuous real-valued quantities
          such as student exam scores, real estate market prices, or agricultural apple weights.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-cyan-300">Problem Type</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-indigo-300">Target Response (<MathText text="$y$" />)</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Leaf Prediction (<MathText text="$\hat{y}$" />)</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-amber-300">Splitting Loss Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 text-slate-200 font-sans font-semibold">Classification</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">Discrete category / class label</td>
                <td className="py-2.5 px-3 text-emerald-300 font-sans font-medium">Majority class vote / proportions <MathText text="$\hat{p}_k$" /></td>
                <td className="py-2.5 px-3 text-slate-400 font-sans">Impurity drop (Gini or Shannon Entropy)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-200 font-sans font-semibold">Regression</td>
                <td className="py-2.5 px-3 text-cyan-300 font-sans">Continuous real number (<MathText text="$y \in \mathbb{R}$" />)</td>
                <td className="py-2.5 px-3 text-emerald-300 font-sans font-medium">Arithmetic sample mean (<MathText text="$\bar{y}_R$" />)</td>
                <td className="py-2.5 px-3 text-amber-300 font-sans">Sum of Squared Errors (SSE) reduction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Because continuous numbers have infinite gradations, class proportion metrics like Gini or Entropy cannot be directly computed across unique real numbers.
          Instead, regression trees quantify prediction error by measuring how far actual target values deviate from regional predictions:
        </p>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between flex-wrap gap-2">
          <span>If a leaf contains numerical observations <MathText text="$y = [50, 60, 70]$" />:</span>
          <span className="font-mono text-cyan-300 bg-slate-900 px-3 py-1 rounded border border-slate-800">
            <MathText text="$\bar{y} = \frac{50 + 60 + 70}{3} = \frac{180}{3} = 60.0$" />
          </span>
        </div>
      </div>

      {/* ── Part 2: How a Regression Tree Makes Predictions ────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Home className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">How a Regression Tree Makes Predictions (House Price Example)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Consider predicting house prices (in thousands of dollars) based on living area size (in sq ft):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Table */}
          <div className="space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Training Dataset (N = 6 Homes)</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
                <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3 text-cyan-300">Size (sq ft, x)</th>
                    <th className="py-2 px-3 text-emerald-300">Price ($1k, y)</th>
                    <th className="py-2 px-3 text-slate-400">Assigned Branch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
                  <tr><td className="py-1.5 px-3">800</td><td className="py-1.5 px-3 text-emerald-300">180</td><td className="py-1.5 px-3 text-cyan-400 font-sans">Left (Size &lt; 1500)</td></tr>
                  <tr><td className="py-1.5 px-3">1000</td><td className="py-1.5 px-3 text-emerald-300">200</td><td className="py-1.5 px-3 text-cyan-400 font-sans">Left (Size &lt; 1500)</td></tr>
                  <tr><td className="py-1.5 px-3">1200</td><td className="py-1.5 px-3 text-emerald-300">220</td><td className="py-1.5 px-3 text-cyan-400 font-sans">Left (Size &lt; 1500)</td></tr>
                  <tr><td className="py-1.5 px-3">1800</td><td className="py-1.5 px-3 text-emerald-300">310</td><td className="py-1.5 px-3 text-indigo-400 font-sans">Right (Size ≥ 1500)</td></tr>
                  <tr><td className="py-1.5 px-3">2000</td><td className="py-1.5 px-3 text-emerald-300">330</td><td className="py-1.5 px-3 text-indigo-400 font-sans">Right (Size ≥ 1500)</td></tr>
                  <tr><td className="py-1.5 px-3">2200</td><td className="py-1.5 px-3 text-emerald-300">350</td><td className="py-1.5 px-3 text-indigo-400 font-sans">Right (Size ≥ 1500)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Regional Means */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">Split Decision Gate: Size &lt; 1500 sq ft</span>
            <div className="space-y-2 text-slate-300">
              <div className="p-2.5 bg-slate-900 rounded font-mono border border-slate-800">
                <span className="text-[10px] text-cyan-400 font-sans font-bold block">Left Region (Size &lt; 1500):</span>
                <MathText text="$$\bar{y}_{\text{left}} = \frac{180 + 200 + 220}{3} = \frac{600}{3} = 200.0$$" />
              </div>
              <div className="p-2.5 bg-slate-900 rounded font-mono border border-slate-800">
                <span className="text-[10px] text-indigo-400 font-sans font-bold block">Right Region (Size ≥ 1500):</span>
                <MathText text="$$\bar{y}_{\text{right}} = \frac{310 + 330 + 350}{3} = \frac{990}{3} = 330.0$$" />
              </div>
            </div>

            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-[11px] text-emerald-200">
              <strong>Prediction Rule:</strong> If <MathText text="$\text{Size} < 1500$" />, predict <strong>$200k</strong>; otherwise predict <strong>$330k</strong>.
              A test house with 1,100 sq ft routes to the left branch and receives <MathText text="$\hat{y} = \$200\text{k}$" />.
            </div>
          </div>
        </div>

        {/* Piecewise-Constant Step Function SVG */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            Piecewise-Constant Step Function Visualization
          </span>
          <p className="text-[11px] text-slate-400">
            Unlike linear regression which fits an oblique slope <MathText text="$y = \beta_0 + \beta_1 x$" />, a regression tree outputs flat horizontal steps:
          </p>

          <div className="flex justify-center py-2 overflow-x-auto">
            <svg viewBox="0 0 420 160" className="w-full max-w-lg h-44 bg-slate-900 rounded-xl border border-slate-800">
              {/* Axes */}
              <line x1="40" y1="130" x2="390" y2="130" stroke="#475569" strokeWidth="1.5" />
              <line x1="40" y1="130" x2="40" y2="20" stroke="#475569" strokeWidth="1.5" />

              {/* Ticks and Labels */}
              <text x="35" y="100" fill="#94a3b8" fontSize="8" textAnchor="end">$200k</text>
              <line x1="37" y1="95" x2="43" y2="95" stroke="#94a3b8" />
              <text x="35" y="45" fill="#94a3b8" fontSize="8" textAnchor="end">$330k</text>
              <line x1="37" y1="40" x2="43" y2="40" stroke="#94a3b8" />

              <text x="110" y="142" fill="#94a3b8" fontSize="8" textAnchor="middle">1000</text>
              <text x="210" y="142" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">Split: 1500</text>
              <text x="310" y="142" fill="#94a3b8" fontSize="8" textAnchor="middle">2000</text>

              {/* Split Line */}
              <line x1="210" y1="20" x2="210" y2="130" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Data points */}
              {/* Left group */}
              <circle cx="80" cy="103" r="3.5" fill="#38bdf8" />
              <circle cx="110" cy="95" r="3.5" fill="#38bdf8" />
              <circle cx="140" cy="87" r="3.5" fill="#38bdf8" />

              {/* Right group */}
              <circle cx="270" cy="48" r="3.5" fill="#818cf8" />
              <circle cx="310" cy="40" r="3.5" fill="#818cf8" />
              <circle cx="350" cy="32" r="3.5" fill="#818cf8" />

              {/* Step Function Prediction Lines */}
              <line x1="40" y1="95" x2="210" y2="95" stroke="#10b981" strokeWidth="3" />
              <line x1="210" y1="40" x2="390" y2="40" stroke="#10b981" strokeWidth="3" />
              <line x1="210" y1="95" x2="210" y2="40" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />

              <text x="125" y="85" fill="#34d399" fontSize="9" fontWeight="bold">ŷ = $200k (Flat Step)</text>
              <text x="300" y="28" fill="#34d399" fontSize="9" fontWeight="bold">ŷ = $330k (Flat Step)</text>
            </svg>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
          <strong>Key Architectural Takeaway:</strong> A regression tree does not fit smooth slopes. It approximates continuous response surfaces as a set of flat, discontinuous, piecewise-constant horizontal steps!
        </div>
      </div>

      {/* ── Part 3 & 4: Adaptive Binning & Candidate Midpoints ─────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Adaptive Binning and Candidate Split Points</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Standard binning cuts numerical features into rigid, arbitrarily fixed intervals (e.g. 0-10, 10-20). In contrast, CART performs <strong>adaptive binning</strong>:
          it dynamically chooses split boundaries directly from the training distribution to isolate clustered target clusters.
        </p>

        {/* 2D Multi-Feature Regions Table */}
        <div className="space-y-2 text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Multi-Feature 2D Partition Example (Size & Bedrooms)</span>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3 text-cyan-300">Terminal Region</th>
                  <th className="py-2 px-3 text-slate-300">Conjunctive Boundary Conditions</th>
                  <th className="py-2 px-3 text-emerald-300">Leaf Prediction (<MathText text="$\bar{y}$" />)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-200 font-sans">Region 1</td>
                  <td className="py-2 px-3 text-slate-300">Size &lt; 1500 sq ft <span className="text-cyan-400 font-bold">AND</span> Bedrooms &lt; 3</td>
                  <td className="py-2 px-3 text-emerald-300 font-bold">$185k</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-200 font-sans">Region 2</td>
                  <td className="py-2 px-3 text-slate-300">Size &lt; 1500 sq ft <span className="text-cyan-400 font-bold">AND</span> Bedrooms ≥ 3</td>
                  <td className="py-2 px-3 text-emerald-300 font-bold">$215k</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-semibold text-slate-200 font-sans">Region 3</td>
                  <td className="py-2 px-3 text-slate-300">Size ≥ 1500 sq ft</td>
                  <td className="py-2 px-3 text-emerald-300 font-bold">$330k</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Candidate Midpoints */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Candidate Split Point Selection</span>
            <span className="text-[10px] text-slate-400">Continuous Midpoint Rule</span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            For sorted feature values <MathText text="$x_{(1)} < x_{(2)} < \dots < x_{(N)}$" />, there are infinitely many real thresholds. However, any threshold falling strictly between
            the same two adjacent values produces the exact same split of training samples! Hence, CART evaluates only the <strong>midpoints</strong> of consecutive values:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-center">
            {[
              { gap: '800 & 1000', cand: '(800+1000)/2 = 900' },
              { gap: '1000 & 1200', cand: '(1000+1200)/2 = 1100' },
              { gap: '1200 & 1800', cand: '(1200+1800)/2 = 1500' },
              { gap: '1800 & 2000', cand: '(1800+2000)/2 = 1900' },
              { gap: '2000 & 2200', cand: '(2000+2200)/2 = 2100' }
            ].map(m => (
              <div key={m.gap} className="p-2 bg-slate-900 rounded border border-slate-800">
                <span className="text-[10px] text-slate-400 font-sans block">{m.gap}</span>
                <span className="text-cyan-300 text-[11px] font-bold mt-0.5 block">{m.cand}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400">
            <strong>Duplicate Value Rule:</strong> If duplicate feature values exist (e.g. two houses of 1200 sq ft), no midpoint is placed between identical numbers because it would fail to separate observations.
          </p>
        </div>
      </div>

      {/* ── Part 5: Sum of Squared Errors (SSE) ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Calculator className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Sum of Squared Errors (SSE)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For an individual observation <MathText text="$i$" />, the residual error is <MathText text="$e_i = y_i - \hat{y}$" />.
          To prevent positive and negative deviations from canceling out and to heavily penalize large outliers, residuals are squared:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-xs">
          <MathText text="$$\text{SSE}(R) = \sum_{i \in R} (y_i - \bar{y}_R)^2$$" displayMode={true} />
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200">Mathematical Justification: Why the Sample Mean Minimizes SSE</span>
          <p className="text-slate-300 leading-relaxed">
            Consider choosing a constant prediction <MathText text="$c$" /> that minimizes the regional squared loss function <MathText text="$f(c) = \sum_{i=1}^N (y_i - c)^2$" />.
            Setting the first derivative with respect to <MathText text="$c$" /> to zero:
          </p>
          <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$\frac{d}{dc} \sum_{i=1}^N (y_i - c)^2 = -2 \sum_{i=1}^N (y_i - c) = 0 \implies \sum_{i=1}^N y_i - N c = 0 \implies c = \frac{1}{N} \sum_{i=1}^N y_i = \bar{y}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            Thus, the sample mean is the unique mathematical constant that provably minimizes the Sum of Squared Errors in any region!
          </p>
        </div>

        {/* House Example Parent SSE Calculation */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            Worked Calculation: House Dataset Parent SSE vs. Children SSE
          </span>

          <div className="space-y-1.5 text-slate-300">
            <p><strong>1. Parent Node (All 6 houses):</strong> Mean <MathText text="$\bar{y} = \frac{180+200+220+310+330+350}{6} = 265.0$" /></p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-rose-300">
              <MathText text="$$\text{SSE}_{\text{parent}} = (-85)^2 + (-65)^2 + (-45)^2 + (45)^2 + (65)^2 + (85)^2 = 7225 + 4225 + 2025 + 2025 + 4225 + 7225 = 26,950$$" displayMode={true} />
            </div>
          </div>

          <div className="space-y-1.5 text-slate-300 pt-2 border-t border-slate-800">
            <p><strong>2. After Splitting at <MathText text="$\text{Size} < 1500$" />:</strong></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              <div className="p-2 bg-slate-900 rounded text-center">
                <span className="text-[10px] text-cyan-400 font-sans block font-bold">Left Child ([180, 200, 220], Mean=200)</span>
                <MathText text="$$\text{SSE}_{\text{left}} = (-20)^2 + 0^2 + (20)^2 = 800$$" />
              </div>
              <div className="p-2 bg-slate-900 rounded text-center">
                <span className="text-[10px] text-indigo-400 font-sans block font-bold">Right Child ([310, 330, 350], Mean=330)</span>
                <MathText text="$$\text{SSE}_{\text{right}} = (-20)^2 + 0^2 + (20)^2 = 800$$" />
              </div>
            </div>

            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded font-mono text-center text-emerald-300 space-y-1">
              <div><MathText text="$$\text{SSE}_{\text{children}} = 800 + 800 = 1,600$$" /></div>
              <div className="text-xs font-bold font-sans text-emerald-200">
                SSE Reduction: <MathText text="$\Delta = 26,950 - 1,600 = 25,350$ (Massive 94.1% Error Drop!)" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive: Calculate a Leaf's Mean and SSE ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Calculate a Leaf's Mean & SSE</h3>
          </div>
          <span className="text-[11px] text-slate-400">Live Residual Tracker</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Input numerical observations inside a proposed leaf node to see how the regional sample mean minimizes Sum of Squared Errors:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="space-y-1">
            <span className="text-slate-300 font-medium">Value <MathText text="$y_1$" />:</span>
            <input
              type="number"
              value={val1}
              onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
            />
          </label>
          <label className="space-y-1">
            <span className="text-slate-300 font-medium">Value <MathText text="$y_2$" />:</span>
            <input
              type="number"
              value={val2}
              onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
            />
          </label>
          <label className="space-y-1">
            <span className="text-slate-300 font-medium">Value <MathText text="$y_3$" />:</span>
            <input
              type="number"
              value={val3}
              onChange={(e) => setVal3(parseFloat(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
            />
          </label>
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-slate-300 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={useVal4}
                onChange={(e) => setUseVal4(e.target.checked)}
                className="accent-cyan-500 rounded"
              />
              <span>Include <MathText text="$y_4$" /></span>
            </label>
            <input
              type="number"
              disabled={!useVal4}
              value={val4}
              onChange={(e) => setVal4(parseFloat(e.target.value) || 0)}
              className={`w-full px-2.5 py-1.5 rounded font-mono border ${useVal4 ? 'bg-slate-900 border-slate-800 text-cyan-300' : 'bg-slate-950 border-slate-900 text-slate-600'}`}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Leaf Prediction (Mean ȳ)</span>
            <div className="text-xl font-bold text-emerald-300 mt-1">{mean.toFixed(3)}</div>
            <p className="text-[10px] font-sans text-slate-500 mt-1">Calculated over {leafValues.length} observations</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Sum of Squared Errors (SSE)</span>
            <div className="text-xl font-bold text-amber-300 mt-1">{sse.toFixed(3)}</div>
            <p className="text-[10px] font-sans text-slate-500 mt-1">Total variance around local mean</p>
          </div>
        </div>

        {/* Breakdown of residual terms */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
          <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Individual Residual Squared Breakdown:</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {residuals.map((r, idx) => (
              <span key={idx} className="bg-slate-900 px-2 py-1 rounded border border-slate-800 text-[11px] text-slate-300">
                ({r.val} - {mean.toFixed(1)})² = <span className="text-cyan-300">{r.sq.toFixed(2)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 6: Choosing the Best Split ─────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <BarChart3 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Choosing the Best Split</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          For every candidate threshold <MathText text="$t$" />, the CART algorithm computes the combined child error:
          <MathText text="$\; \text{SSE}_{\text{children}} = \text{SSE}_{\text{left}} + \text{SSE}_{\text{right}}$" />.
          The split with the <strong>smallest total child SSE</strong> (or equivalently, maximum error drop <MathText text="$\Delta = \text{SSE}_{\text{parent}} - \text{SSE}_{\text{children}}$" />) is chosen.
        </p>

        {/* Candidate Evaluation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-cyan-300">Candidate Threshold</th>
                <th className="py-2.5 px-3 font-semibold text-slate-300">Left Partition</th>
                <th className="py-2.5 px-3 font-semibold text-slate-300">Right Partition</th>
                <th className="py-2.5 px-3 font-semibold text-amber-300">Total Child SSE</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Decision Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 text-cyan-300">Size &lt; 900</td>
                <td className="py-2 px-3 text-slate-400">[180] (SSE=0)</td>
                <td className="py-2 px-3 text-slate-400">[200, 220, 310, 330, 350] (SSE=18,280)</td>
                <td className="py-2 px-3 text-amber-400 font-bold">18,280</td>
                <td className="py-2 px-3 text-slate-400 font-sans">Sub-optimal</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-cyan-300">Size &lt; 1100</td>
                <td className="py-2 px-3 text-slate-400">[180, 200] (SSE=200)</td>
                <td className="py-2 px-3 text-slate-400">[220, 310, 330, 350] (SSE=9,875)</td>
                <td className="py-2 px-3 text-amber-400 font-bold">10,075</td>
                <td className="py-2 px-3 text-slate-400 font-sans">Sub-optimal</td>
              </tr>
              <tr className="bg-emerald-500/10 border-l-4 border-l-emerald-500">
                <td className="py-2 px-3 text-emerald-300 font-bold">Size &lt; 1500 (Winner)</td>
                <td className="py-2 px-3 text-slate-200">[180, 200, 220] (SSE=800)</td>
                <td className="py-2 px-3 text-slate-200">[310, 330, 350] (SSE=800)</td>
                <td className="py-2 px-3 text-emerald-300 font-bold text-sm">1,600</td>
                <td className="py-2 px-3 text-emerald-300 font-sans font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Best Split Selected
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-cyan-300">Size &lt; 1900</td>
                <td className="py-2 px-3 text-slate-400">[180, 200, 220, 310] (SSE=9,875)</td>
                <td className="py-2 px-3 text-slate-400">[330, 350] (SSE=200)</td>
                <td className="py-2 px-3 text-amber-400 font-bold">10,075</td>
                <td className="py-2 px-3 text-slate-400 font-sans">Sub-optimal</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-cyan-300">Size &lt; 2100</td>
                <td className="py-2 px-3 text-slate-400">[180, 200, 220, 310, 330] (SSE=18,280)</td>
                <td className="py-2 px-3 text-slate-400">[350] (SSE=0)</td>
                <td className="py-2 px-3 text-amber-400 font-bold">18,280</td>
                <td className="py-2 px-3 text-slate-400 font-sans">Sub-optimal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Part 7: CART Algorithm for Regression ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Split className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The CART Algorithm for Regression</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          CART (<strong>Classification and Regression Trees</strong>) constructs binary decision trees through top-down <strong>greedy recursive partitioning</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">7-Step Recursive Splitting Workflow</span>
            <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px]">
              <li>Ingest all training samples into the root node.</li>
              <li>Compute current regional mean prediction <MathText text="$\bar{y}$" />.</li>
              <li>Generate candidate feature-threshold midpoints across all continuous inputs.</li>
              <li>Evaluate total child error <MathText text="$\text{SSE}_{\text{left}} + \text{SSE}_{\text{right}}$" /> for every candidate.</li>
              <li>Commit the split delivering minimum total child SSE.</li>
              <li>Recursively execute steps 2-5 on each resulting child subset.</li>
              <li>Terminate branch growth when a predefined stopping threshold is hit.</li>
            </ol>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">Standard Stopping Conditions</span>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-300 text-[11px]">
              <li><strong>Maximum Tree Depth (<MathText text="$\text{max\_depth}$" />):</strong> Halts growth after <MathText text="$d$" /> decision levels.</li>
              <li><strong>Minimum Leaf Size (<MathText text="$\text{min\_samples\_leaf}$" />):</strong> Prevents creation of partitions with fewer than <MathText text="$n$" /> points.</li>
              <li><strong>Minimum Split Impurity (<MathText text="$\text{min\_impurity\_decrease}$" />):</strong> Halts when SSE reduction falls below threshold <MathText text="$\epsilon$" />.</li>
              <li><strong>Zero Node Error:</strong> All samples in leaf share identical target value (<MathText text="$\text{SSE} = 0$" />).</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
          <strong>Why Must We Stop or Prune?</strong> If unrestricted, a regression tree will grow until every training observation occupies its own leaf (<MathText text="$\text{SSE}_{\text{train}} = 0$" />).
          Such a tree perfectly memorizes sample noise, leading to catastrophic <strong>overfitting</strong> and wild test-set errors!
        </div>

        {/* Integrated Cost-Complexity Pruning Simulator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-cyan-400" />
              Advanced CART Regularization: Minimal Cost-Complexity Pruning (<MathText text="$\alpha$" />)
            </span>
            <span className="text-[10px] text-slate-400">Regularization Parameter α</span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            CART regularizes large trees via cost-complexity pruning: <MathText text="$$R_\alpha(T) = \text{SSE}(T) + \alpha |T|$$" /> where <MathText text="$|T|$" /> is leaf count:
          </p>

          <div className="space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Complexity Penalty (<MathText text="$\alpha$" />):</span>
              <span className="font-mono text-cyan-300 font-bold">{alpha.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] font-sans text-slate-400 block">Leaves (|T|)</span>
              <span className="text-cyan-300 text-sm font-bold">{leafCount}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] font-sans text-slate-400 block">Train MSE</span>
              <span className="text-amber-300 text-sm font-bold">{trainMse.toFixed(1)}</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] font-sans text-slate-400 block">Test MSE</span>
              <span className="text-emerald-300 text-sm font-bold">{testMse.toFixed(1)}</span>
            </div>
            <div className={`p-2.5 rounded border ${badgeColor} flex flex-col justify-center`}>
              <span className="text-[10px] font-sans font-bold block">{statusText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 8: Complete Apple-Weight Lecture Example ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Apple className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Complete Apple-Weight Lecture Example</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Worked Step-by-Step
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In this canonical exam exercise, we are given six apple weights (in grams):
          <span className="font-mono text-cyan-300 ml-1.5 font-bold">[100, 102, 98, 200, 198, 202]</span>
        </p>

        {/* Step 1 */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Step 1 — Baseline Unsplit Parent Node
          </span>
          <p className="text-slate-300">
            All 6 apples reside in the root partition. The baseline mean prediction is:
          </p>
          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$\bar{y} = \frac{100 + 102 + 98 + 200 + 198 + 202}{6} = \frac{900}{6} = 150.0\text{ g}$$" displayMode={true} />
          </div>
          <p className="text-slate-300">
            Parent Sum of Squared Errors:
          </p>
          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-rose-300">
            <MathText text="$$\text{SSE}_{\text{parent}} = (100-150)^2 + (102-150)^2 + (98-150)^2 + (200-150)^2 + (198-150)^2 + (202-150)^2$$" displayMode={true} />
            <MathText text="$$= 2500 + 2304 + 2704 + 2500 + 2304 + 2704 = 15,016$$" displayMode={true} />
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Step 2 — Partitioning at Threshold 150 grams
          </span>
          <p className="text-slate-300">
            Split into small apples (<MathText text="$< 150\text{g}$" />) and large apples (<MathText text="$\ge 150\text{g}$" />):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-cyan-300 font-sans font-bold block">Left Child: [100, 102, 98]</span>
              <div className="text-slate-300 text-[11px]"><MathText text="$\bar{y}_{\text{left}} = \frac{300}{3} = 100.0\text{ g}$" /></div>
              <div className="text-emerald-300 text-xs font-bold pt-1">
                <MathText text="$$\text{SSE}_{\text{left}} = 0^2 + 2^2 + (-2)^2 = 8$$" />
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-center">
              <span className="text-[10px] text-indigo-300 font-sans font-bold block">Right Child: [200, 198, 202]</span>
              <div className="text-slate-300 text-[11px]"><MathText text="$\bar{y}_{\text{right}} = \frac{600}{3} = 200.0\text{ g}$" /></div>
              <div className="text-emerald-300 text-xs font-bold pt-1">
                <MathText text="$$\text{SSE}_{\text{right}} = 0^2 + (-2)^2 + 2^2 = 8$$" />
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$\text{SSE}_{\text{children}} = 8 + 8 = 16$$" displayMode={true} />
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2 text-xs">
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Step 3 — Residual Reduction Evaluation
          </span>
          <p className="text-slate-300">
            The total error reduction delivered by the split:
          </p>
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 font-mono text-center text-emerald-300">
            <MathText text="$$\Delta = \text{SSE}_{\text{parent}} - \text{SSE}_{\text{children}} = 15,016 - 16 = 15,000 \quad (99.89\% \text{ Error Elimination!})$$" displayMode={true} />
          </div>
          <p className="text-slate-300 leading-relaxed text-[11px]">
            <strong>Physical Interpretation:</strong> The single global prediction of 150g was terrible for all apples.
            Splitting into two clusters of 100g and 200g isolates items tightly around their local means, reducing total squared error from 15,016 down to just 16!
          </p>
        </div>
      </div>

      {/* ── Final Recap Table ───────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          Final Recap: Regression Trees & CART Foundations
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-cyan-300">Core Concept</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Role in Regression Trees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Regression Tree</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Predicts continuous numerical target by adaptively carving input space into orthogonal hyper-rectangles.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Leaf Prediction</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Arithmetic sample mean (<MathText text="$\bar{y}$" />) of training points residing inside that leaf region.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Candidate Split</td>
                <td className="py-2 px-3 text-slate-300 font-sans">A feature-threshold rule <MathText text="$x_j < t$" /> evaluated at consecutive numerical midpoints.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Sum of Squared Errors (SSE)</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Total squared Euclidean distance from observations to regional mean: <MathText text="$\sum (y_i - \bar{y})^2$" />.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Optimal Split Choice</td>
                <td className="py-2 px-3 text-slate-300 font-sans">The candidate producing the lowest total child SSE: <MathText text="$\min (\text{SSE}_{\text{left}} + \text{SSE}_{\text{right}})$" />.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">CART Algorithm</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Top-down greedy binary recursive partitioning halted by stopping thresholds or cost-complexity pruning.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 text-center font-medium">
          Golden Rule: Candidate Split <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> Compute Child Means <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> Compute Child SSEs <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> Sum Left + Right <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> Pick Smallest!
        </div>
      </div>
    </div>
  );
};
