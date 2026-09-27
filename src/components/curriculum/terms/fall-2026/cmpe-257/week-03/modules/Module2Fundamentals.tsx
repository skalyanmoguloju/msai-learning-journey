import React, { useState, useMemo } from 'react';
import {
  TreeDeciduous,
  CheckCircle2,
  Sliders,
  Calculator,
  Network,
  Split,
  Table,
  Layers,
  ArrowRight,
  Maximize2,
  TrendingDown,
  Activity,
  CircleDot,
  Zap,
  Target
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2Fundamentals: React.FC = () => {
  // ── Interactive Impurity Calculator State ─────────────────────────────
  const [count0, setCount0] = useState<number>(2);
  const [count1, setCount1] = useState<number>(4);

  const { p0, p1, gini, entropy, totalCount } = useMemo(() => {
    const c0 = Math.max(0, count0);
    const c1 = Math.max(0, count1);
    const total = c0 + c1;
    if (total === 0) {
      return { p0: 0, p1: 0, gini: 0, entropy: 0, totalCount: 0 };
    }
    const prop0 = c0 / total;
    const prop1 = c1 / total;
    const g = 1 - (prop0 * prop0 + prop1 * prop1);
    let h = 0;
    if (prop0 > 0) h -= prop0 * Math.log2(prop0);
    if (prop1 > 0) h -= prop1 * Math.log2(prop1);

    return {
      p0: prop0,
      p1: prop1,
      gini: g,
      entropy: h,
      totalCount: total
    };
  }, [count0, count1]);

  // ── Interactive Prediction Traversal Walkthrough State ────────────────
  const [studyHours, setStudyHours] = useState<number>(4);
  const [attendance, setAttendance] = useState<number>(90);

  // Tree routing:
  // Root: x1 < 5?
  // If YES: x2 < 80? -> YES: Fail Leaf, NO: Pass Leaf
  // If NO: Pass Leaf (High Study Time)
  const isStudyLow = studyHours < 5;
  const isAttendanceLow = attendance < 80;

  let activeLeaf: 'fail_low_att' | 'pass_high_att' | 'pass_high_study';
  let prediction: string;
  let predictionBadge: string;

  if (isStudyLow) {
    if (isAttendanceLow) {
      activeLeaf = 'fail_low_att';
      prediction = 'Fail (At Risk)';
      predictionBadge = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    } else {
      activeLeaf = 'pass_high_att';
      prediction = 'Pass (Good Attendance Compensates)';
      predictionBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  } else {
    activeLeaf = 'pass_high_study';
    prediction = 'Pass (Strong Study Time)';
    predictionBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  }

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Decision-Tree Intuition ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <TreeDeciduous className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Decision-Tree Intuition</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A decision tree is a supervised machine learning model that asks a sequential series of binary test questions about input features to arrive at a prediction. It seamlessly performs both <strong>classification</strong> (predicting categories) and <strong>regression</strong> (predicting continuous real values).
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="font-semibold text-slate-200">Example: Student Exam Performance Prediction</div>
          <ol className="list-decimal pl-4 space-y-1 text-slate-300">
            <li>Is weekly study time <MathText text="$x_1 < 5$" /> hours?</li>
            <li>If yes, is class lecture attendance <MathText text="$x_2 < 80\%$" />?</li>
            <li>Follow the answers down the branching path to a final prediction: <strong>Pass</strong> or <strong>Fail</strong>.</li>
          </ol>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Unlike global regression models, the decision tree does not attempt to fit one rigid formula across all observations. It divides the feature space into localized groups and makes a simple, tailored prediction inside each group.
        </p>
      </div>

      {/* ── Part 2: Parts of a Tree ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-teal-400">
          <Network className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Architectural Anatomy of a Tree</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-teal-300">Component</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Architectural Role</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-300">Concrete Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Root Node</td>
                <td className="py-2.5 px-3 text-slate-300">The first test question; initially contains 100% of all observations.</td>
                <td className="py-2.5 px-3 text-cyan-300 font-mono"><MathText text="$x_1 < 5$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Internal Node</td>
                <td className="py-2.5 px-3 text-slate-300">A downstream decision gate testing a sub-region after a previous split.</td>
                <td className="py-2.5 px-3 text-cyan-300 font-mono"><MathText text="$x_2 < 80$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Branch</td>
                <td className="py-2.5 px-3 text-slate-300">A directed path corresponding to the binary test answer.</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono">Yes (True) or No (False)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Leaf (Terminal Node)</td>
                <td className="py-2.5 px-3 text-slate-300">The final sub-region containing the resulting output prediction.</td>
                <td className="py-2.5 px-3 text-emerald-300 font-mono">"Pass" (class) or 72.5 (value)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Parent Region (<MathText text="$R_p$" />)</td>
                <td className="py-2.5 px-3 text-slate-300">The region of data points immediately before a split occurs.</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono"><MathText text="$R_p$" /> (e.g. 6 total samples)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-200">Child Regions (<MathText text="$R_1, R_2$" />)</td>
                <td className="py-2.5 px-3 text-slate-300">The two disjoint sub-partitions created by the binary split.</td>
                <td className="py-2.5 px-3 text-slate-400 font-mono"><MathText text="$R_1 = \{x : x_j < t\}, R_2 = \{x : x_j \ge t\}$" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
          <span>
            <strong>Child Proportional Weight:</strong> If parent region <MathText text="$R_p$" /> contains 6 samples and splits into two groups of 3:
          </span>
          <span className="font-mono text-cyan-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            <MathText text="$\text{Child Weight} = \frac{|R_c|}{|R_p|} = \frac{3}{6} = \frac{1}{2}$" />
          </span>
        </div>
      </div>

      {/* ── Part 3 & 4: Splits, Thresholds & Space Partitioning ────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Split className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Splits, Thresholds & Axis-Aligned Partitioning</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Every binary split chooses exactly two parameters: <strong>(1) a feature <MathText text="$x_j$" /></strong> and <strong>(2) a numerical threshold <MathText text="$t$" /></strong>.
          The formal splitting function divides region <MathText text="$R_p$" /> into:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$s_p(j, t) = \Big( \{x \in R_p : x_j < t\}, \; \{x \in R_p : x_j \ge t\} \Big)$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">Axis-Aligned Geometry</span>
            <p className="text-slate-300 leading-relaxed">
              In a 2D feature space <MathText text="$(x_1, x_2)$" />:
            </p>
            <ul className="space-y-1 text-slate-400 list-disc pl-4">
              <li>A split on <MathText text="$x_1 < 5$" /> cuts a straight <strong>vertical boundary</strong>.</li>
              <li>A subsequent split on <MathText text="$x_2 < 80$" /> cuts a <strong>horizontal boundary</strong>.</li>
              <li>Combined, they carve space into rectangular bounding boxes parallel to coordinate axes.</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">Region Representation</span>
            <p className="text-slate-300 leading-relaxed">
              A single leaf node corresponds to the logical conjunction of all decisions leading to it:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300">
              <MathText text="$$\text{Region } R_m = \{x : x_1 < 5 \;\land\; x_2 \ge 80\}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              Every point falling inside region <MathText text="$R_m$" /> shares the identical prediction.
            </p>
          </div>
        </div>

        {/* 2D Partitioning Visual Diagram */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="font-semibold text-slate-200 text-xs flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            2D Axis-Aligned Partition Space Diagram
          </span>

          <div className="flex justify-center py-2 overflow-x-auto">
            <svg viewBox="0 0 320 180" className="w-full max-w-md h-44 bg-slate-900 rounded-xl border border-slate-800">
              {/* Region 3: x1 >= 5 (Pass) */}
              <rect x="160" y="20" width="140" height="140" fill="#059669" fillOpacity="0.2" stroke="#10b981" strokeDasharray="2 2" />
              <text x="230" y="95" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Region 3 (Pass)</text>
              <text x="230" y="112" fill="#a7f3d0" fontSize="8" textAnchor="middle">x₁ ≥ 5 (Study ≥ 5 hrs)</text>

              {/* Region 2: x1 < 5 and x2 >= 80 (Pass) */}
              <rect x="20" y="20" width="140" height="60" fill="#3b82f6" fillOpacity="0.2" stroke="#60a5fa" strokeDasharray="2 2" />
              <text x="90" y="48" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Region 2 (Pass)</text>
              <text x="90" y="64" fill="#bfdbfe" fontSize="8" textAnchor="middle">x₁ &lt; 5 &amp; x₂ ≥ 80%</text>

              {/* Region 1: x1 < 5 and x2 < 80 (Fail) */}
              <rect x="20" y="80" width="140" height="80" fill="#e11d48" fillOpacity="0.2" stroke="#f43f5e" strokeDasharray="2 2" />
              <text x="90" y="118" fill="#fda4af" fontSize="10" fontWeight="bold" textAnchor="middle">Region 1 (Fail)</text>
              <text x="90" y="134" fill="#fecdd3" fontSize="8" textAnchor="middle">x₁ &lt; 5 &amp; x₂ &lt; 80%</text>

              {/* Axis Dividers */}
              <line x1="160" y1="20" x2="160" y2="160" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="20" y1="80" x2="160" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

              {/* Axis Labels */}
              <text x="160" y="172" fill="#38bdf8" fontSize="8" textAnchor="middle">Split 1: x₁ = 5 hrs</text>
              <text x="14" y="83" fill="#f59e0b" fontSize="8" textAnchor="end">x₂ = 80%</text>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Parts 5 & 6: Classification vs Regression Leaf Predictions ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Part 5: Classification */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Classification Leaves</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            A classification leaf tabulates training instances across each discrete class.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="font-semibold text-slate-200">Example Leaf Sample Distribution:</span>
            <div className="flex justify-around font-mono text-center">
              <span className="text-emerald-300">8 Pass Examples</span>
              <span className="text-rose-300">2 Fail Examples</span>
            </div>
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <div className="text-slate-400 text-[11px] font-mono"><MathText text="$$P(\text{Pass}\mid\text{leaf}) = \frac{8}{10} = 0.80, \quad P(\text{Fail}\mid\text{leaf}) = \frac{2}{10} = 0.20$$" /></div>
              <div className="text-center font-bold text-emerald-300 font-sans mt-1">Predicted Class = Majority Vote: "Pass"</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            These proportions serve directly as calibrated class probability estimates <MathText text="$\hat{p}_k$" />.
          </p>
        </div>

        {/* Part 6: Regression */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-amber-400">
            <Calculator className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Regression Leaves</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            A regression leaf holds numerical continuous responses. The prediction is their arithmetic mean.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
            <span className="font-semibold text-slate-200">Example Leaf Target Values:</span>
            <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$y = [100, \; 120, \; 110, \; 130]$$" />
            </div>
            <div className="pt-2 border-t border-slate-800 space-y-1 font-mono text-center">
              <MathText text="$$\hat{y} = \frac{100 + 120 + 110 + 130}{4} = \frac{460}{4} = 115.0$$" />
              <div className="text-xs font-bold text-amber-300 font-sans mt-1">Regional Prediction = 115.0</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Under squared error loss, the sample mean is the unique constant that mathematically minimizes regional SSE!
          </p>
        </div>
      </div>

      {/* ── Part 7: Choosing a Partition Using Impurity ────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Choosing Splits Using Impurity (Classification)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Trees do not split randomly. They iterate through candidate feature-threshold pairs <MathText text="$(j, t)$" /> and choose the split that maximizes the purity gain from parent to children.
        </p>

        {/* Worked Gini & Entropy Calculation */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">
            Worked Example: Evaluating Candidate Split (<MathText text="$x_1 < 5$" />)
          </div>

          <div className="space-y-1.5 text-slate-300">
            <span className="font-semibold text-slate-200">1. Parent Region (6 examples: 2 Fail, 4 Pass):</span>
            <div className="p-2 bg-slate-900 rounded font-mono text-cyan-300 text-center">
              <MathText text="$$p_{\text{fail}} = \frac{2}{6} = \frac{1}{3}, \quad p_{\text{pass}} = \frac{4}{6} = \frac{2}{3}$$" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
              <div className="p-2 bg-slate-900 rounded text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Parent Gini</span>
                <MathText text="$$G_{\text{parent}} = 1 - \left[\left(\frac{1}{3}\right)^2 + \left(\frac{2}{3}\right)^2\right] = \frac{4}{9} \approx 0.444$$" />
              </div>
              <div className="p-2 bg-slate-900 rounded text-center">
                <span className="text-[10px] text-slate-400 uppercase block font-sans">Parent Entropy</span>
                <MathText text="$$H_{\text{parent}} = -\left[\frac{1}{3}\log_2\frac{1}{3} + \frac{2}{3}\log_2\frac{2}{3}\right] \approx 0.918 \text{ bits}$$" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-slate-300 pt-2 border-t border-slate-800">
            <span className="font-semibold text-slate-200">2. Split Results into Children:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-400">
              <li><strong>Left Child (3 samples):</strong> 2 Fail, 1 Pass <ArrowRight className="w-3 h-3 inline mx-1" /> <MathText text="$G_{\text{left}} = 1 - [ (2/3)^2 + (1/3)^2 ] = \frac{4}{9} \approx 0.444$" /></li>
              <li><strong>Right Child (3 samples):</strong> 0 Fail, 3 Pass (Pure!) <ArrowRight className="w-3 h-3 inline mx-1" /> <MathText text="$G_{\text{right}} = 1 - [ 0^2 + 1^2 ] = 0.000$" /></li>
            </ul>

            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-emerald-300 space-y-1">
              <div><MathText text="$$G_{\text{children}} = \left(\frac{3}{6}\right)\left(\frac{4}{9}\right) + \left(\frac{3}{6}\right)(0) = \frac{2}{9} \approx 0.222$$" /></div>
              <div className="text-emerald-400 font-bold font-sans">
                Gini Impurity Drop = <MathText text="$G_{\text{parent}} - G_{\text{children}} = \frac{4}{9} - \frac{2}{9} = \frac{2}{9} \approx 0.222$" />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Impurity Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              Interactive Node Impurity Calculator
            </div>
            <span className="text-[11px] text-slate-400">Enter custom class counts</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <label className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">Class 0 Count:</span>
              <input
                type="number"
                min="0"
                value={count0}
                onChange={(e) => setCount0(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
              />
            </label>

            <label className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">Class 1 Count:</span>
              <input
                type="number"
                min="0"
                value={count1}
                onChange={(e) => setCount1(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-20 px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-emerald-300"
              />
            </label>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={() => { setCount0(2); setCount1(4); }}
                className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
              >
                Lecture (2, 4)
              </button>
              <button
                onClick={() => { setCount0(0); setCount1(6); }}
                className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
              >
                Pure (0, 6)
              </button>
              <button
                onClick={() => { setCount0(5); setCount1(5); }}
                className="px-2 py-1 text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800"
              >
                Even (5, 5)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Class Proportions</span>
              <div className="font-mono text-sm text-cyan-300 mt-1">
                <MathText text={`$p_0 = ${p0.toFixed(3)}, \\; p_1 = ${p1.toFixed(3)}$`} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Total samples: {totalCount}</p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Gini Impurity</span>
              <div className="font-mono text-base text-emerald-300 mt-1">{gini.toFixed(3)}</div>
              <p className="text-[10px] text-slate-500 mt-1">0 = Pure; 0.5 = Max mixed</p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-purple-400">Entropy</span>
              <div className="font-mono text-base text-purple-300 mt-1">{entropy.toFixed(3)} bits</div>
              <p className="text-[10px] text-slate-500 mt-1">0 = Pure; 1.0 = Max uncertainty</p>
            </div>
          </div>
        </div>

        {/* Regression SSE Partitioning Example */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5" />
            Regression Partitioning: Sum of Squared Errors (SSE)
          </div>
          <p className="text-slate-300">
            For regression, trees minimize the sum of squared deviations from the regional mean: <MathText text="$\text{SSE}(R) = \sum_{i \in R} (y_i - \bar{y}_R)^2$" />.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans font-bold">Parent: [10, 12, 50, 52], Mean = 31</span>
              <p className="text-rose-300"><MathText text="$$\text{SSE}_{\text{parent}} = 21^2 + 19^2 + 19^2 + 21^2 = 1604$$" /></p>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-sans font-bold">Split into [10, 12] and [50, 52]</span>
              <p className="text-emerald-300"><MathText text="$$\text{SSE}_{\text{left}} = 2, \quad \text{SSE}_{\text{right}} = 2 \implies \text{Total} = 4$$" /></p>
            </div>
          </div>

          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded font-mono text-center text-emerald-300">
            SSE Improvement: <MathText text="$$1604 - 4 = 1600 \quad (\text{Massive error reduction!})$$" />
          </div>
        </div>
      </div>

      {/* ── Part 8: Complete Interactive Prediction Walkthrough ────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <TreeDeciduous className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Complete Interactive Prediction Traversal</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Live Traversal
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Follow a new test sample as it is evaluated through the sequential decision gates down to its final leaf:
        </p>

        {/* Sliders for test point */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Study Hours (<MathText text="$x_1$" />):</span>
              <span className="font-mono text-cyan-300">{studyHours} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={studyHours}
              onChange={(e) => setStudyHours(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-300 font-medium">Class Attendance (<MathText text="$x_2$" />):</span>
              <span className="font-mono text-emerald-300">{attendance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={attendance}
              onChange={(e) => setAttendance(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Step by step route cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className={`p-3.5 rounded-xl border ${isStudyLow ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'}`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Root Gate (x₁ &lt; 5?)</span>
            <div className="text-xs mt-1 font-sans">
              Study = {studyHours} hrs <ArrowRight className="w-3 h-3 inline mx-1" /> {isStudyLow ? 'YES (< 5)' : 'NO (≥ 5)'}
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              {isStudyLow ? 'Proceeds to attendance test.' : 'Directly routes to Pass Leaf!'}
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${!isStudyLow ? 'bg-slate-950 border-slate-800 text-slate-600' : isAttendanceLow ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'}`}>
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Internal Gate (x₂ &lt; 80%?)</span>
            <div className="text-xs mt-1 font-sans">
              {!isStudyLow ? 'Bypassed (Not evaluated)' : `Attendance = ${attendance}% → ${isAttendanceLow ? 'YES (< 80%)' : 'NO (≥ 80%)'}`}
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-1">
              {!isStudyLow ? 'Already satisfied root branch.' : isAttendanceLow ? 'Routes to Fail Leaf.' : 'Routes to Pass Leaf.'}
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${predictionBadge}`}>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider font-sans">Terminal Leaf Output</span>
              <div className="text-sm font-bold mt-1 font-sans">{prediction}</div>
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-1">New x → Root → Gate → Leaf</div>
          </div>
        </div>
      </div>

      {/* ── Part 9: Decision-Boundary Exercises from Solution Document ─ */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-indigo-400">
            <Target className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Decision-Boundary Exercises & Information Gain Proofs</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            From Exam & Solution Guide
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          These canonical exercises from the course solution document connect space partitioning directly to <strong>Shannon Entropy</strong>, 
          <strong>Conditional Entropy</strong>, and <strong>Information Gain (<MathText text="$IG$" />)</strong>, showing why axis-aligned boundary geometry determines classification capabilities.
        </p>

        {/* Exercise 1 & 4 Grid: Geometric Nature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Exercise 1: Circular Boundary */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CircleDot className="w-3.5 h-3.5 text-indigo-400" />
                Exercise 1: Circular Boundary (<MathText text="$x_1^2 + x_2^2 = r^2$" />)
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[10px] border border-rose-500/20">Non-Axis Aligned</span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Consider a true circular decision boundary: <MathText text="$$x_1^2 + x_2^2 = r^2$$" />
            </p>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-center py-1">
                <svg viewBox="0 0 200 120" className="w-48 h-28 bg-slate-950 rounded border border-slate-800">
                  {/* Circle */}
                  <circle cx="100" cy="60" r="45" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />
                  {/* Staircase approximations */}
                  <path d="M 55 60 L 55 35 L 75 35 L 75 20 L 100 20 L 125 20 L 125 35 L 145 35 L 145 60 L 145 85 L 125 85 L 125 100 L 100 100 L 75 100 L 75 85 L 55 85 Z" fill="#3b82f6" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="100" y="63" fill="#818cf8" fontSize="8" textAnchor="middle" fontWeight="bold">Circle: x₁²+x₂²=r²</text>
                  <text x="100" y="114" fill="#38bdf8" fontSize="7" textAnchor="middle">Staircase orthogonal cuts</text>
                </svg>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                A standard decision tree uses threshold rules <MathText text="$x_1 < t$" /> or <MathText text="$x_2 < t$" />, cutting exclusively <strong>vertical and horizontal lines</strong>.
                It can only <em>approximate</em> a smooth circle as a stepped staircase using numerous small rectangular leaves, but <strong>cannot represent the smooth circle exactly</strong> with any single or small set of splits.
              </p>
            </div>
          </div>

          {/* Exercise 4: Why Can the Tree Classify Exactly? */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Exercise 4: Why Can the Tree Classify Exactly?
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] border border-emerald-500/20">Exact Representation</span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              When the dataset features ground-truth boundaries that are orthogonal to feature coordinates:
            </p>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <div className="p-2.5 bg-slate-950 rounded text-center font-mono text-emerald-300 border border-slate-800">
                <MathText text="$$X_1 < 3 \quad \text{and} \quad X_2 < 3$$" />
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Because the decision boundaries in this problem are parallel to the axes, axis-aligned recursive splits align <strong>identically</strong> with the true partitions.
              </p>
              <p className="text-[11px] text-emerald-300 leading-relaxed font-semibold">
                The resulting terminal leaves are 100% pure (<MathText text="$H = 0$" />), achieving <strong>perfect zero-training-error classification</strong> with minimal tree depth.
              </p>
            </div>
          </div>
        </div>

        {/* Exercise 2 & 3: Detailed Step-by-Step Information Gain Proofs */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              Exercises 2 & 3 — Complete Worked Entropy & Information Gain Derivations
            </span>
            <span className="text-[10px] font-mono text-slate-400">Total N = 400 points (136 Red, 264 Blue)</span>
          </div>

          {/* Exercise 2: First Split (X1 < 3) */}
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-xs">
                Exercise 2: First Split (<MathText text="$X_1 < 3$" />)
              </span>
              <span className="font-mono text-cyan-300 text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Minimal Gain: <MathText text="$IG \approx 0.0027 \text{ bits}$" />
              </span>
            </div>

            <p className="text-slate-300">
              <strong>Step 1: Unconditional Parent Entropy <MathText text="$H(Y)$" />:</strong>
            </p>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-center text-cyan-300">
              <MathText text="$$H(Y) = -\left[ \frac{136}{400}\log_2\left(\frac{136}{400}\right) + \frac{264}{400}\log_2\left(\frac{264}{400}\right) \right] \approx 0.925 \text{ bits}$$" displayMode={true} />
            </div>

            <p className="text-slate-300">
              <strong>Step 2: Sub-partition Child Entropies for split <MathText text="$X_1 < 3$" />:</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans font-bold">Left Child (<MathText text="$X_1 < 3$" />): 36 Red, 84 Blue (N=120)</span>
                <div className="text-xs text-slate-300">
                  <MathText text="$$H_{\text{left}} = -\left[\frac{36}{120}\log_2\frac{36}{120} + \frac{84}{120}\log_2\frac{84}{120}\right] \approx 0.881$$" />
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 font-sans font-bold">Right Child (<MathText text="$X_1 \ge 3$" />): 100 Red, 180 Blue (N=280)</span>
                <div className="text-xs text-slate-300">
                  <MathText text="$$H_{\text{right}} = -\left[\frac{100}{280}\log_2\frac{100}{280} + \frac{180}{280}\log_2\frac{180}{280}\right] \approx 0.940$$" />
                </div>
              </div>
            </div>

            <p className="text-slate-300">
              <strong>Step 3: Weighted Conditional Entropy & Information Gain:</strong>
            </p>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-center text-slate-200 space-y-1">
              <div className="text-cyan-300">
                <MathText text="$$H(Y \mid X_1) = \left(\frac{120}{400}\right)(0.881) + \left(\frac{280}{400}\right)(0.940) \approx 0.2643 + 0.6580 = 0.9223 \text{ bits}$$" displayMode={true} />
              </div>
              <div className="text-amber-300 font-bold font-sans text-xs pt-1 border-t border-slate-800">
                <MathText text="$$IG(Y; X_1) = H(Y) - H(Y \mid X_1) = 0.925 - 0.9223 \approx 0.0027 \text{ bits}$$" />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Observation: The first split alone produces an almost negligible reduction in uncertainty because both children remain heavily mixed!
            </p>
          </div>

          {/* Exercise 3: Second Split (X2 < 3) */}
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200 text-xs">
                Exercise 3: Second Split (<MathText text="$X_2 < 3$" /> inside left branch <MathText text="$X_1 < 3$" />)
              </span>
              <span className="font-mono text-emerald-300 text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                Massive Gain: <MathText text="$IG = 0.881 \text{ bits}$" />
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Now evaluate only within the subspace <MathText text="$X_1 < 3$" />, whose prior regional entropy is <MathText text="$H_{\text{parent}} \approx 0.881$" />.
              Applying the second split threshold <MathText text="$X_2 < 3$" /> isolates the data into perfectly pure partitions:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              <div className="p-2 bg-slate-950 rounded border border-emerald-500/30 text-center">
                <span className="text-[10px] text-emerald-400 font-sans font-bold block">Sub-leaf 1: 100% Pure Blue</span>
                <span className="text-xs text-emerald-300"><MathText text="$H_1 = 0.000 \text{ bits}$" /></span>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-emerald-500/30 text-center">
                <span className="text-[10px] text-emerald-400 font-sans font-bold block">Sub-leaf 2: 100% Pure Red</span>
                <span className="text-xs text-emerald-300"><MathText text="$H_2 = 0.000 \text{ bits}$" /></span>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded font-mono text-center text-emerald-300 space-y-1">
              <div><MathText text="$$H_{\text{children}} = 0 \text{ bits}$$" /></div>
              <div className="text-xs font-bold font-sans text-emerald-200">
                <MathText text="$$IG = H_{\text{parent}} - H_{\text{children}} = 0.881 - 0 = 0.881 \text{ bits}$$" />
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>Key Machine Learning Takeaway:</strong> Even if a greedy first split produces minimal initial information gain (<MathText text="$0.0027$" /> bits), subsequent conditional splits can unlock 100% pure sub-regions (<MathText text="$IG = 0.881$" /> bits), completely resolving remaining disorder!
            </p>
          </div>
        </div>

        {/* Highlight Callout */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong>Module Lesson:</strong> A decision tree can learn an exact decision boundary with zero training error when the true boundary is constructed from orthogonal, axis-aligned feature thresholds.
          </div>
        </div>
      </div>

      {/* ── Final Recap Comparison Table ───────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          Final Recap: Classification Trees vs. Regression Trees
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-emerald-300">Dimension</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Classification Tree</th>
                <th className="py-2.5 px-3 font-semibold text-amber-300">Regression Tree</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Target Type</td>
                <td className="py-2.5 px-3 text-slate-200">Categorical discrete class label</td>
                <td className="py-2.5 px-3 text-slate-200">Continuous real-valued number</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Leaf Prediction</td>
                <td className="py-2.5 px-3 font-medium text-cyan-300">Majority vote class / class proportions <MathText text="$\hat{p}_k$" /></td>
                <td className="py-2.5 px-3 font-medium text-amber-300">Regional arithmetic mean target value <MathText text="$\bar{y}_R$" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Split Evaluation Metric</td>
                <td className="py-2.5 px-3 text-emerald-300 font-semibold">Impurity reduction (Gini drop or Entropy gain)</td>
                <td className="py-2.5 px-3 text-emerald-300 font-semibold">Variance reduction / SSE drop</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-300">Partitioning Objective</td>
                <td className="py-2.5 px-3 text-slate-400">Create regions with homogeneous class labels</td>
                <td className="py-2.5 px-3 text-slate-400">Create regions with tightly clustered numerical values</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 text-center font-medium">
          Core Principle: The tree chooses feature-threshold questions that make the resulting child regions as homogeneous as possible.
        </div>
      </div>
    </div>
  );
};
