import React, { useState, useMemo } from 'react';
import {
  Sliders,
  CheckCircle2,
  Calculator,
  BarChart2,
  Table,
  Scale,
  Activity,
  Split,
  Layers,
  ArrowRight,
  TrendingDown,
  Award,
  AlertCircle,
  Sigma,
  Shuffle,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3ClassificationSplit: React.FC = () => {
  // ── Interactive Impurity Calculator State ─────────────────────────────
  const [class0Count, setClass0Count] = useState<number>(2);
  const [class1Count, setClass1Count] = useState<number>(4);

  const { p0, p1, misclass, gini, entropy, total } = useMemo(() => {
    const c0 = Math.max(0, class0Count);
    const c1 = Math.max(0, class1Count);
    const n = c0 + c1;
    if (n === 0) return { p0: 0, p1: 0, misclass: 0, gini: 0, entropy: 0, total: 0 };
    const prop0 = c0 / n;
    const prop1 = c1 / n;
    const m = 1 - Math.max(prop0, prop1);
    const g = 1 - (prop0 * prop0 + prop1 * prop1);
    let h = 0;
    if (prop0 > 0) h -= prop0 * Math.log2(prop0);
    if (prop1 > 0) h -= prop1 * Math.log2(prop1);

    return {
      p0: prop0,
      p1: prop1,
      misclass: m,
      gini: g,
      entropy: h,
      total: n
    };
  }, [class0Count, class1Count]);

  // ── Split Duel State (Part 7) ─────────────────────────────────────────
  const [selectedSplit, setSelectedSplit] = useState<'splitA' | 'splitB'>('splitA');

  // ── Interactive KL Divergence State (Part 9) ──────────────────────────
  const [klP0, setKlP0] = useState<number>(0.50);
  const [klQ0, setKlQ0] = useState<number>(0.75);

  const { klP, klQ, dKl_PQ, dKl_QP } = useMemo(() => {
    const p1 = Math.max(0.001, Math.min(0.999, klP0));
    const p2 = 1 - p1;
    const q1 = Math.max(0.001, Math.min(0.999, klQ0));
    const q2 = 1 - q1;

    // Natural log (nats)
    const pq = p1 * Math.log(p1 / q1) + p2 * Math.log(p2 / q2);
    const qp = q1 * Math.log(q1 / p1) + q2 * Math.log(q2 / p2);

    return {
      klP: [p1, p2],
      klQ: [q1, q2],
      dKl_PQ: Math.max(0, pq),
      dKl_QP: Math.max(0, qp)
    };
  }, [klP0, klQ0]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Why Do We Need a Splitting Criterion? ──────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why Do We Need a Splitting Criterion?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          At every node, a decision tree must evaluate competing questions: for instance, should it split on <MathText text="$x_1 < 5$" /> or on <MathText text="$x_2 < 80$" />?
          A high-quality split produces child partitions that are noticeably more <strong>homogeneous (pure)</strong> than the parent node.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">The Weighted Child Impurity Formula</span>
          <p className="text-slate-300">
            Because candidate splits often partition data unevenly, children must be weighted by the proportion of parent data they inherit:
          </p>
          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$L_{\text{children}} = \left(\frac{n_1}{n_p}\right) L(R_1) + \left(\frac{n_2}{n_p}\right) L(R_2)$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            The tree algorithm exhaustively checks all feature-threshold pairs and chooses the one achieving:
          </p>
          <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300">
            <MathText text="$$\max_{j, t} \Big[ L(R_p) - L_{\text{children}}(j, t) \Big]$$" displayMode={true} />
          </div>
        </div>
      </div>

      {/* ── Part 2: Misclassification Error ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Misclassification Error</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Misclassification error asks: <em>If we assign every point in the region to the majority class, what fraction will be predicted incorrectly?</em>
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-amber-300">
          <MathText text="$$L_{\text{misclass}}(R) = 1 - \max_c(\hat{p}_c)$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">Mixed Node (3 Class 0, 7 Class 1)</span>
            <div className="font-mono text-amber-300 mt-1">
              <MathText text="$$L = 1 - \max(0.3, 0.7) = 0.30$$" />
            </div>
            <p className="text-[11px] text-slate-400">30% of samples are incorrectly assigned.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">Pure Node (0 Class 0, 10 Class 1)</span>
            <div className="font-mono text-emerald-300 mt-1">
              <MathText text="$$L = 1 - \max(0, 1) = 0.00$$" />
            </div>
            <p className="text-[11px] text-slate-400">Perfect zero error for homogeneous leaf.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">50/50 Even Split</span>
            <div className="font-mono text-rose-300 mt-1">
              <MathText text="$$L = 1 - \max(0.5, 0.5) = 0.50$$" />
            </div>
            <p className="text-[11px] text-slate-400">Maximum possible error under binary target.</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
          <strong>The Coarseness Limitation:</strong> While intuitive, misclassification error is piecewise linear and insensitive to probability shifts among non-majority classes. A split that concentrates classes without altering the majority fraction yields zero gain, making it unhelpful for tree growth!
        </div>
      </div>

      {/* ── Part 3 & 4: Entropy & Information Gain ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Shannon Entropy & Information Gain</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          From information theory, <strong>Shannon Entropy</strong> quantifies the average uncertainty or disorder in a categorical distribution:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="$$H(R) = -\sum_{c=1}^K \hat{p}_c \log_2(\hat{p}_c)$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">Entropy Extremes</span>
            <ul className="space-y-1 text-slate-300 list-disc pl-4">
              <li><strong>Pure Node:</strong> <MathText text="$H = -[1\log_2(1) + 0\log_2(0)] = 0.0\text{ bits}$" /> (Certainty).</li>
              <li><strong>50/50 Node:</strong> <MathText text="$H = -[0.5\log_2(0.5) + 0.5\log_2(0.5)] = 1.0\text{ bit}$" /> (Max disorder).</li>
              <li><strong>Parent (2 Fail, 4 Pass):</strong> <MathText text="$H = -[(1/3)\log_2(1/3) + (2/3)\log_2(2/3)] \approx 0.918\text{ bits}$" />.</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">Information Gain (Mutual Information)</span>
            <p className="text-slate-300 leading-relaxed">
              Information Gain measures the net reduction in uncertainty achieved by the split:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300">
              <MathText text="$$\text{IG} = H(R_p) - H_{\text{children}} = H(Y) - H(Y \mid X)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              If a split creates completely pure children (<MathText text="$H_{\text{children}} = 0$" />), Information Gain reaches its maximum possible value: <MathText text="$\text{IG} = H(R_p)$" />!
            </p>
          </div>
        </div>
      </div>

      {/* ── Part 5: Gini Impurity ──────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Gini Impurity Formulation & Derivation</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Gini impurity measures the expected error rate if a randomly chosen observation from the partition were assigned a class label chosen randomly according to the partition's class distribution:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-emerald-300">
          <MathText text="$$G(R) = \sum_{c=1}^K \hat{p}_c (1 - \hat{p}_c) = 1 - \sum_{c=1}^K \hat{p}_c^2$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">Algebraic Proof of the Equivalent Form:</span>
          <div className="p-2 bg-slate-900 rounded font-mono text-slate-300 space-y-1">
            <div><MathText text="$$G(R) = \sum_c \hat{p}_c (1 - \hat{p}_c) = \sum_c \hat{p}_c - \sum_c \hat{p}_c^2$$" /></div>
            <div>Since probabilities sum to 1 (<MathText text="$\sum_c \hat{p}_c = 1$" />), this simplifies directly to:</div>
            <div className="text-emerald-300 font-bold"><MathText text="$$G(R) = 1 - \sum_{c=1}^K \hat{p}_c^2$$" /></div>
          </div>
          <p className="text-slate-400 text-[11px] pt-1">
            For the parent with <MathText text="$p_{\text{fail}} = 1/3, p_{\text{pass}} = 2/3$" />:
            <MathText text="$\; G_{\text{parent}} = (1/3)(2/3) + (2/3)(1/3) = 2/9 + 2/9 = 4/9 \approx 0.444$" />.
          </p>
        </div>
      </div>

      {/* ── Interactive Impurity Calculator Widget ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Calculator className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive Split Metric Calculator</h3>
          </div>
          <span className="text-[11px] text-slate-400">Live multi-metric benchmarking</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Enter custom counts for Class 0 and Class 1 to inspect all 3 metrics simultaneously:
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">Class 0:</span>
            <input
              type="number"
              min="0"
              value={class0Count}
              onChange={(e) => setClass0Count(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-20 px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">Class 1:</span>
            <input
              type="number"
              min="0"
              value={class1Count}
              onChange={(e) => setClass1Count(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-20 px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-emerald-300"
            />
          </label>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => { setClass0Count(2); setClass1Count(4); }}
              className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
            >
              Lecture (2, 4)
            </button>
            <button
              onClick={() => { setClass0Count(3); setClass1Count(7); }}
              className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
            >
              (3, 7)
            </button>
            <button
              onClick={() => { setClass0Count(0); setClass1Count(10); }}
              className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
            >
              Pure (0, 10)
            </button>
            <button
              onClick={() => { setClass0Count(5); setClass1Count(5); }}
              className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
            >
              Even (5, 5)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400">Proportions</span>
            <div className="font-mono text-cyan-300 mt-1">
              <MathText text={`$p_0 = ${p0.toFixed(3)}$`} />
              <div className="text-emerald-300"><MathText text={`$p_1 = ${p1.toFixed(3)}$`} /></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">N = {total}</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-400">Misclass Error</span>
            <div className="font-mono text-base text-amber-300 mt-1">{misclass.toFixed(3)}</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-amber-500 h-full" style={{ width: `${misclass * 200}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Range [0, 0.5]</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Gini Impurity</span>
            <div className="font-mono text-base text-emerald-300 mt-1">{gini.toFixed(3)}</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-emerald-500 h-full" style={{ width: `${gini * 200}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Range [0, 0.5]</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] uppercase font-bold text-indigo-400">Shannon Entropy</span>
            <div className="font-mono text-base text-indigo-300 mt-1">{entropy.toFixed(3)} bits</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-indigo-500 h-full" style={{ width: `${entropy * 100}%` }} />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Range [0, 1.0]</p>
          </div>
        </div>
      </div>

      {/* ── Part 6: Comparing the Criteria ─────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Table className="w-4 h-4 text-purple-400" />
          Direct Numerical Comparison of Split Criteria
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-purple-300">Class Proportions (p₀ / p₁)</th>
                <th className="py-2.5 px-3 font-semibold text-amber-300">Misclassification Error</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-300">Gini Impurity</th>
                <th className="py-2.5 px-3 font-semibold text-indigo-300">Shannon Entropy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 text-slate-300 font-sans">50 / 50 (Maximum Disorder)</td>
                <td className="py-2 px-3 text-amber-300">0.500</td>
                <td className="py-2 px-3 text-emerald-300">0.500</td>
                <td className="py-2 px-3 text-indigo-300 font-bold">1.000 bits</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-300 font-sans">60 / 40</td>
                <td className="py-2 px-3 text-amber-300">0.400</td>
                <td className="py-2 px-3 text-emerald-300">0.480</td>
                <td className="py-2 px-3 text-indigo-300">0.971 bits</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-300 font-sans">70 / 30</td>
                <td className="py-2 px-3 text-amber-300">0.300</td>
                <td className="py-2 px-3 text-emerald-300">0.420</td>
                <td className="py-2 px-3 text-indigo-300">0.881 bits</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-300 font-sans">90 / 10</td>
                <td className="py-2 px-3 text-amber-300">0.100</td>
                <td className="py-2 px-3 text-emerald-300">0.180</td>
                <td className="py-2 px-3 text-indigo-300">0.469 bits</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-300 font-sans">100 / 0 (Completely Pure)</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">0.000</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">0.000</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">0.000 bits</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Part 7: Complete Split-Selection Example (Split A vs B) ─────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Award className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Complete Split-Selection Example (6 Students)</h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedSplit('splitA')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedSplit === 'splitA'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Split A: x₁ &lt; 5 (Winner)
            </button>
            <button
              onClick={() => setSelectedSplit('splitB')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedSplit === 'splitB'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Split B: x₂ &lt; 80 (Zero Gain)
            </button>
          </div>
        </div>

        {/* 6-Student Dataset Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3 font-sans">Student</th>
                <th className="py-2 px-3 text-cyan-300">Study Hours (x₁)</th>
                <th className="py-2 px-3 text-indigo-300">Attendance (x₂)</th>
                <th className="py-2 px-3 text-emerald-300">Outcome Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-1.5 px-3">Student A</td><td className="py-1.5 px-3">2 hrs</td><td className="py-1.5 px-3">90%</td><td className="py-1.5 px-3 text-rose-300">Fail</td></tr>
              <tr><td className="py-1.5 px-3">Student B</td><td className="py-1.5 px-3">3 hrs</td><td className="py-1.5 px-3">70%</td><td className="py-1.5 px-3 text-rose-300">Fail</td></tr>
              <tr><td className="py-1.5 px-3">Student C</td><td className="py-1.5 px-3">4 hrs</td><td className="py-1.5 px-3">85%</td><td className="py-1.5 px-3 text-emerald-300">Pass</td></tr>
              <tr><td className="py-1.5 px-3">Student D</td><td className="py-1.5 px-3">6 hrs</td><td className="py-1.5 px-3">60%</td><td className="py-1.5 px-3 text-emerald-300">Pass</td></tr>
              <tr><td className="py-1.5 px-3">Student E</td><td className="py-1.5 px-3">8 hrs</td><td className="py-1.5 px-3">75%</td><td className="py-1.5 px-3 text-emerald-300">Pass</td></tr>
              <tr><td className="py-1.5 px-3">Student F</td><td className="py-1.5 px-3">10 hrs</td><td className="py-1.5 px-3">95%</td><td className="py-1.5 px-3 text-emerald-300">Pass</td></tr>
            </tbody>
          </table>
        </div>

        {/* Selected Split Breakdown */}
        {selectedSplit === 'splitA' ? (
          <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/40 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Evaluation for Split A: (Study Hours x₁ &lt; 5)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px]">Optimal Split</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans font-bold">Left Child (x₁ &lt; 5): Students A, B, C</span>
                <p className="text-slate-300">2 Fail, 1 Pass <ArrowRight className="w-3 h-3 inline mx-1" /> <MathText text="$G_{\text{left}} = 0.444, \; H_{\text{left}} = 0.918$" /></p>
              </div>

              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans font-bold">Right Child (x₁ ≥ 5): Students D, E, F</span>
                <p className="text-emerald-300">0 Fail, 3 Pass (Pure!) <ArrowRight className="w-3 h-3 inline mx-1" /> <MathText text="$G_{\text{right}} = 0.000, \; H_{\text{right}} = 0.000$" /></p>
              </div>
            </div>

            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded font-mono text-center text-cyan-300 space-y-1">
              <div>Gini Gain: <MathText text="$$G_{\text{gain}} = 0.444 - \left[\frac{1}{2}(0.444) + \frac{1}{2}(0)\right] = 0.444 - 0.222 = \mathbf{0.222}$$" /></div>
              <div>Information Gain: <MathText text="$$\text{IG} = 0.918 - \left[\frac{1}{2}(0.918) + \frac{1}{2}(0)\right] = 0.918 - 0.459 = \mathbf{0.459}$$" /></div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/40 space-y-3 text-xs animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">Evaluation for Split B: (Attendance x₂ &lt; 80%)</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-[10px]">Zero Impurity Gain</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans font-bold">Left Child (x₂ &lt; 80%): Students B, D, E</span>
                <p className="text-slate-300">1 Fail, 2 Pass <ArrowRight className="w-3 h-3 inline mx-1" /> <MathText text="$G_{\text{left}} = 0.444, \; H_{\text{left}} = 0.918$" /></p>
              </div>

              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans font-bold">Right Child (x₂ ≥ 80%): Students A, C, F</span>
                <p className="text-slate-300">1 Fail, 2 Pass <ArrowRight className="w-3 h-3 inline mx-1" /> <MathText text="$G_{\text{right}} = 0.444, \; H_{\text{right}} = 0.918$" /></p>
              </div>
            </div>

            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded font-mono text-center text-rose-300 space-y-1">
              <div>Gini Gain: <MathText text="$$G_{\text{gain}} = 0.444 - 0.444 = \mathbf{0.000}$$" /></div>
              <div>Information Gain: <MathText text="$$\text{IG} = 0.918 - 0.918 = \mathbf{0.000}$$" /></div>
            </div>
            <p className="text-slate-400 text-[11px]">
              Because the class proportions in both children (1/3 Fail, 2/3 Pass) are identical to the parent, this split does zero work to separate classes!
            </p>
          </div>
        )}
      </div>

      {/* ── Part 8: 400-Point Lecture Case Study ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Lecture Information-Gain Example (400 Points)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In this classic lecture benchmark, a dataset contains <strong>400 total observations (136 Red, 264 Blue)</strong> with baseline entropy:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-xs text-indigo-300">
          <MathText text="$$H(Y) = -\left[\left(\frac{136}{400}\right)\log_2\left(\frac{136}{400}\right) + \left(\frac{264}{400}\right)\log_2\left(\frac{264}{400}\right)\right] \approx 0.925\text{ bits}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] font-sans">First Split: (X₁ &lt; 3)</span>
            <ul className="space-y-1 text-slate-300 list-disc pl-4 text-[11px] font-sans">
              <li>Left (120 pts: 36R, 84B): <span className="font-mono text-cyan-300">H = 0.881</span></li>
              <li>Right (280 pts: 100R, 180B): <span className="font-mono text-cyan-300">H = 0.940</span></li>
            </ul>
            <div className="p-2 bg-slate-900 rounded text-center text-amber-300">
              <MathText text="$$H(Y \mid X_1) = \frac{120}{400}(0.881) + \frac{280}{400}(0.940) = 0.9223$$" />
              <div className="text-rose-400 font-bold mt-1 font-sans">Information Gain = 0.925 - 0.9223 = 0.0027 bits (Very Weak!)</div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] font-sans">Second Split inside (X₁ &lt; 3): (X₂ &lt; 3)</span>
            <p className="text-slate-300 font-sans">
              This vertical split perfectly isolates the classes in the left sub-partition, creating <strong>two 100% pure children</strong>:
            </p>
            <div className="p-2 bg-slate-900 rounded text-center text-emerald-300">
              <MathText text="$$H_{\text{children}} = 0.000\text{ bits}$$" />
              <div className="text-emerald-400 font-bold mt-1 font-sans">Information Gain = 0.881 - 0 = 0.881 bits (Decisive Split!)</div>
            </div>
            <p className="text-slate-400 text-[10px] font-sans">
              Because the boundary is axis-aligned, sequential greedy splits rapidly converge on the exact partition!
            </p>
          </div>
        </div>
      </div>

      {/* ── Part 9: KL Divergence: Comparing Two Distributions ─────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-indigo-400">
            <Shuffle className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">KL Divergence: Comparing Two Distributions</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Relative Entropy
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          While <strong>Shannon Entropy</strong> measures internal uncertainty within a single distribution, <strong>Kullback-Leibler (KL) Divergence</strong> (or <em>Relative Entropy</em>)
          quantifies how much extra information or coding penalty is incurred when an approximate distribution <MathText text="$q$" /> is used to model the true distribution <MathText text="$p$" />:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-cyan-300">
          <MathText text="$$D_{\text{KL}}(p \parallel q) = \sum_i p(i) \ln\left(\frac{p(i)}{q(i)}\right)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Here, <MathText text="$i$" /> labels each discrete event outcome. The ratio <MathText text="$\frac{p(i)}{q(i)}$" /> compares the true underlying probability against the model's assigned probability.
        </p>

        {/* Numerical Example from Notes */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            Concrete Numerical Calculation from Lecture
          </span>

          <p className="text-slate-300 leading-relaxed">
            Suppose true distribution <MathText text="$p = (0.50, 0.50)$" /> and approximate candidate distribution <MathText text="$q = (0.75, 0.25)$" />:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans font-bold block">Outcome 1 (<MathText text="$i=1$" />):</span>
              <div className="text-cyan-300 mt-1"><MathText text="$$0.5 \ln\left(\frac{0.50}{0.75}\right) = 0.5 \ln\left(\frac{2}{3}\right) \approx -0.2027$$" /></div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 font-sans font-bold block">Outcome 2 (<MathText text="$i=2$" />):</span>
              <div className="text-emerald-300 mt-1"><MathText text="$$0.5 \ln\left(\frac{0.50}{0.25}\right) = 0.5 \ln(2) \approx +0.3466$$" /></div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-indigo-300">
            <MathText text="$$D_{\text{KL}}(p \parallel q) = 0.5 \ln\left(\frac{2}{3}\right) + 0.5 \ln(2) = 0.5 \ln\left(\frac{4}{3}\right) \approx 0.144\text{ nats} \quad (0.208\text{ bits})$$" displayMode={true} />
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            The divergence is strictly positive because <MathText text="$q$" /> deviates from truth <MathText text="$p$" />. If <MathText text="$p = q$" />, every ratio <MathText text="$\frac{p(i)}{q(i)} = 1$" />, yielding <MathText text="$\ln(1) = 0$" /> and <MathText text="$D_{\text{KL}} = 0$" />.
          </p>
        </div>

        {/* Asymmetry Callout */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Critical Property (Asymmetry):</strong> KL divergence is <em>not</em> a mathematical distance metric in the Euclidean sense because it is asymmetric:
            <span className="font-mono text-amber-300 ml-1.5 font-bold"><MathText text="$$D_{\text{KL}}(p \parallel q) \ne D_{\text{KL}}(q \parallel p)$$" /></span>
          </div>
        </div>

        {/* Interactive KL Divergence Playground */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              Interactive KL Divergence Playground: Observe Asymmetry
            </span>
            <span className="text-[10px] text-slate-400">Two-Outcome Bernoulli System</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">True Distribution <MathText text="$p(1)$" />:</span>
                <span className="font-mono text-cyan-300">{klP0.toFixed(2)} / {(1 - klP0).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                value={klP0}
                onChange={(e) => setKlP0(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Model Distribution <MathText text="$q(1)$" />:</span>
                <span className="font-mono text-indigo-300">{klQ0.toFixed(2)} / {(1 - klQ0).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                value={klQ0}
                onChange={(e) => setKlQ0(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Forward Divergence: D_KL(p ∥ q)</span>
              <div className="text-lg font-bold text-cyan-300 mt-1">{dKl_PQ.toFixed(3)} nats</div>
              <p className="text-[10px] font-sans text-slate-500 mt-0.5">Penalty of approximating true p by model q</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Reverse Divergence: D_KL(q ∥ p)</span>
              <div className="text-lg font-bold text-indigo-300 mt-1">{dKl_QP.toFixed(3)} nats</div>
              <p className="text-[10px] font-sans text-slate-500 mt-0.5">Penalty of approximating true q by model p</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 10: Why KL Divergence Cannot Be Negative (Gibbs' Inequality) ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Mathematical Proof: Why KL Divergence Cannot Be Negative</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Gibbs' Inequality Proof
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          We want to rigorously establish that <MathText text="$D_{\text{KL}}(p \parallel q) \ge 0$" /> for any two valid discrete probability distributions.
          The proof relies on the fundamental logarithm inequality:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-xs">
          <MathText text="$$\ln(x) \le x - 1 \quad \text{for every } x > 0, \quad \text{with equality iff } x = 1$$" displayMode={true} />
        </div>

        {/* Step-by-Step Proof Cards */}
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200">Step 1 — Substitute Outcome Ratio:</span>
            <p className="text-slate-300">
              For each outcome <MathText text="$i$" />, choose <MathText text="$x = \frac{q(i)}{p(i)}$" />. Substituting into the inequality gives:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$\ln\left(\frac{q(i)}{p(i)}\right) \le \frac{q(i)}{p(i)} - 1$$" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200">Step 2 — Multiply by Non-Negative Probability <MathText text="$p(i)$" />:</span>
            <p className="text-slate-300">
              Since <MathText text="$p(i) \ge 0$" />, multiplying both sides preserves the direction of the inequality:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$p(i) \ln\left(\frac{q(i)}{p(i)}\right) \le p(i)\left[\frac{q(i)}{p(i)} - 1\right] = q(i) - p(i)$$" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200">Step 3 — Sum Across All Outcomes:</span>
            <p className="text-slate-300">
              Summing both sides across all possible discrete outcomes <MathText text="$i$" />:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$\sum_i p(i) \ln\left(\frac{q(i)}{p(i)}\right) \le \sum_i q(i) - \sum_i p(i)$$" />
            </div>
            <p className="text-slate-300">
              Because both <MathText text="$p$" /> and <MathText text="$q$" /> are normalized probability distributions, <MathText text="$\sum q(i) = 1$" /> and <MathText text="$\sum p(i) = 1$" />:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-amber-300">
              <MathText text="$$\sum_i q(i) - \sum_i p(i) = 1 - 1 = 0 \implies \sum_i p(i) \ln\left(\frac{q(i)}{p(i)}\right) \le 0$$" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-200">Step 4 — Invert the Logarithm to Arrive at KL Divergence:</span>
            <p className="text-slate-300">
              Using the logarithm property <MathText text="$\ln\left(\frac{q(i)}{p(i)}\right) = -\ln\left(\frac{p(i)}{q(i)}\right)$" />:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300">
              <MathText text="$$-\sum_i p(i) \ln\left(\frac{p(i)}{q(i)}\right) \le 0 \implies \sum_i p(i) \ln\left(\frac{p(i)}{q(i)}\right) \ge 0$$" />
            </div>
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded font-mono text-center text-emerald-300 font-bold">
              <MathText text="$$D_{\text{KL}}(p \parallel q) \ge 0 \quad \text{Q.E.D.}$$" displayMode={true} />
            </div>
            <p className="text-[11px] text-slate-400 text-center font-sans mt-1">
              Equality <MathText text="$D_{\text{KL}}(p \parallel q) = 0$" /> holds if and only if <MathText text="$x = \frac{q(i)}{p(i)} = 1 \implies p(i) = q(i)$" /> for all outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Part 11: Why Uniform Probabilities Maximize Entropy (Lagrange) ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-purple-400">
            <Compass className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Why Uniform Probabilities Maximize Entropy</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Lagrange Multiplier Derivation
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose an event has <MathText text="$K$" /> possible discrete outcomes. Intuitively, a deterministic distribution like <MathText text="$(1, 0, 0)$" /> has zero uncertainty (<MathText text="$H=0$" />),
          whereas a uniform distribution <MathText text="$(1/K, \dots, 1/K)$" /> gives no outcome an advantage, producing maximum disorder. Here is the formal calculus proof:
        </p>

        {/* Step-by-step Lagrange derivation */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="space-y-1.5">
            <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">1. Optimization Formulation</span>
            <p className="text-slate-300">
              We maximize entropy <MathText text="$H(p) = -\sum_{i=1}^K p(i) \ln p(i)$" /> subject to the constraint that probabilities sum to one: <MathText text="$\sum_{i=1}^K p(i) = 1$" />.
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-purple-300">
              <MathText text="$$\mathcal{L}(p_1, \dots, p_K, \lambda) = -\sum_{i=1}^K p(i) \ln p(i) + \lambda \left(\sum_{i=1}^K p(i) - 1\right)$$" displayMode={true} />
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">2. Partial Differentiation</span>
            <p className="text-slate-300">
              Differentiating with respect to a single arbitrary probability <MathText text="$p(i)$" /> using the product rule:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$\frac{\partial}{\partial p(i)} [-p(i)\ln p(i)] = -[\ln p(i) + 1] = -\ln p(i) - 1$$" />
            </div>
            <p className="text-slate-300">
              For the constraint term, only <MathText text="$p(i)$" /> varies while other terms remain constant: <MathText text="$\frac{\partial}{\partial p(i)} [\lambda(\sum p(i) - 1)] = \lambda$" />. Hence:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$\frac{\partial \mathcal{L}}{\partial p(i)} = -\ln p(i) - 1 + \lambda$$" />
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">3. Setting Gradient to Zero</span>
            <p className="text-slate-300">
              At the stationary maximum point, setting <MathText text="$\frac{\partial \mathcal{L}}{\partial p(i)} = 0$" />:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-emerald-300">
              <MathText text="$$-\ln p(i) - 1 + \lambda = 0 \implies \ln p(i) = \lambda - 1 \implies p(i) = e^{\lambda - 1}$$" displayMode={true} />
            </div>
            <p className="text-slate-300">
              Crucially, the right-hand side <MathText text="$e^{\lambda - 1}$" /> is a constant that <strong>does not depend on index <MathText text="$i$" /></strong>!
              Therefore, every outcome must have the identical probability:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-amber-300">
              <MathText text="$$p(1) = p(2) = \cdots = p(K) = c$$" />
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">4. Solving Normalization & Maximal Value</span>
            <p className="text-slate-300">
              Applying the probability normalization constraint:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-purple-300">
              <MathText text="$$K \cdot c = 1 \implies c = \frac{1}{K} \implies p(i) = \frac{1}{K} \quad \forall i$$" />
            </div>
            <p className="text-slate-300">
              Plugging this uniform probability back into the Shannon entropy formula gives the theoretical maximum:
            </p>
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded font-mono text-center text-emerald-300 font-bold">
              <MathText text="$$H_{\max} = -\sum_{i=1}^K \left(\frac{1}{K}\right) \ln\left(\frac{1}{K}\right) = \ln(K) \quad \text{or in bits: } \log_2(K)$$" displayMode={true} />
            </div>
          </div>
        </div>

        {/* Connection to Trees Callout */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong>Direct Connection to Decision Trees:</strong> Entropy is at its absolute maximum when classes are evenly mixed (<MathText text="$p_c = 1/K$" />), representing total confusion.
            It collapses to zero when a leaf is pure. A decision-tree split is mathematically useful precisely because it shatters uniform disorder into low-entropy, high-certainty partitions!
          </div>
        </div>
      </div>

      {/* ── Final Recap Comparison Table ───────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          Final Recap: Summary of Classification Splitting Criteria
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Criterion</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Formula</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-indigo-300">Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Misclassification</td>
                <td className="py-2 px-3 text-amber-300"><MathText text="$1 - \max_c(\hat{p}_c)$" /></td>
                <td className="py-2 px-3 text-slate-300 font-sans">Fraction of incorrect majority-class mistakes.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Shannon Entropy</td>
                <td className="py-2 px-3 text-indigo-300"><MathText text="$-\sum \hat{p}_c \log_2(\hat{p}_c)$" /></td>
                <td className="py-2 px-3 text-slate-300 font-sans">Information-theoretic disorder/uncertainty.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Gini Impurity</td>
                <td className="py-2 px-3 text-emerald-300"><MathText text="$\sum \hat{p}_c (1 - \hat{p}_c) = 1 - \sum \hat{p}_c^2$" /></td>
                <td className="py-2 px-3 text-slate-300 font-sans">Probability of random paired classification error.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Information Gain</td>
                <td className="py-2 px-3 text-cyan-300"><MathText text="$H(R_p) - H_{\text{children}}$" /></td>
                <td className="py-2 px-3 text-slate-300 font-sans">Reduction in uncertainty delivered by split.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200 text-center font-medium">
          Workflow: Try candidate split <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> calculate child impurities <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> weight by sample size <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> subtract from parent <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> choose highest improvement!
        </div>
      </div>
    </div>
  );
};
