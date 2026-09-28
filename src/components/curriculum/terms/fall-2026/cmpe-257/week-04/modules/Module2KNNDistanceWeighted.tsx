import React, { useState } from 'react';
import {
  Compass,
  Binary,
  Layers,
  Scale,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Maximize2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2KNNDistanceWeighted: React.FC = () => {
  // ── Interactive 1: Euclidean Distance Calculator ──────────────────────
  const [x1, setX1] = useState<number>(3);
  const [x2, setX2] = useState<number>(4);
  const [z1, setZ1] = useState<number>(6);
  const [z2, setZ2] = useState<number>(8);

  const diff1 = x1 - z1;
  const diff2 = x2 - z2;
  const sqDiff1 = diff1 * diff1;
  const sqDiff2 = diff2 * diff2;
  const sumSq = sqDiff1 + sqDiff2;
  const eucDist = Math.sqrt(sumSq);

  // ── Interactive 2: Weighted KNN Regression Calculator ─────────────────
  const [wy1, setWy1] = useState<number>(100);
  const [ww1, setWw1] = useState<number>(1.0);
  const [wy2, setWy2] = useState<number>(200);
  const [ww2, setWw2] = useState<number>(0.5);
  const [wy3, setWy3] = useState<number>(300);
  const [ww3, setWw3] = useState<number>(0.25);

  const regNumerator = ww1 * wy1 + ww2 * wy2 + ww3 * wy3;
  const regDenominator = ww1 + ww2 + ww3;
  const regPrediction = regDenominator > 0 ? (regNumerator / regDenominator).toFixed(3) : 'Enter a positive total weight';

  // ── Interactive 3: Feature Scaling Comparison ─────────────────────────
  const [ageQ, setAgeQ] = useState<number>(30);
  const [incQ, setIncQ] = useState<number>(50000);
  const [ageA, setAgeA] = useState<number>(31);
  const [incA, setIncA] = useState<number>(70000);
  const [ageB, setAgeB] = useState<number>(50);
  const [incB, setIncB] = useState<number>(51000);

  // Training set statistics
  const meanAge = 40, stdAge = 10;
  const meanInc = 60000, stdInc = 20000;

  // Raw distances
  const rawDistA = Math.sqrt(Math.pow(ageQ - ageA, 2) + Math.pow(incQ - incA, 2));
  const rawDistB = Math.sqrt(Math.pow(ageQ - ageB, 2) + Math.pow(incQ - incB, 2));
  const rawWinner = rawDistA <= rawDistB ? 'Candidate A' : 'Candidate B';

  // Standardized coordinates
  const zAgeQ = (ageQ - meanAge) / stdAge;
  const zIncQ = (incQ - meanInc) / stdInc;
  const zAgeA = (ageA - meanAge) / stdAge;
  const zIncA = (incA - meanInc) / stdInc;
  const zAgeB = (ageB - meanAge) / stdAge;
  const zIncB = (incB - meanInc) / stdInc;

  // Standardized distances
  const stdDistA = Math.sqrt(Math.pow(zAgeQ - zAgeA, 2) + Math.pow(zIncQ - zIncA, 2));
  const stdDistB = Math.sqrt(Math.pow(zAgeQ - zAgeB, 2) + Math.pow(zIncQ - zIncB, 2));
  const stdWinner = stdDistA <= stdDistB ? 'Candidate A' : 'Candidate B';

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Module Roadmap ─────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Roadmap</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Master the mathematical and geometric foundations of K-Nearest Neighbors: feature space representation, Euclidean distance metrics, inductive bias, complete voting calculations, decision boundary morphology, weighted voting, and feature scaling:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
          {[
            { num: 1, title: 'Feature Vector Representation' },
            { num: 2, title: 'Euclidean Distance in D-Dimensions' },
            { num: 3, title: "KNN's Inductive Bias" },
            { num: 4, title: 'The KNN Prediction Algorithm' },
            { num: 5, title: 'Complete Classification Calculation' },
            { num: 6, title: 'The Effect of Hyperparameter K' },
            { num: 7, title: 'KNN Decision Boundaries' },
            { num: 8, title: 'Weighted KNN (Classification & Regression)' },
            { num: 9, title: 'Feature Scaling & Standardization' }
          ].map(topic => (
            <div key={topic.num} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {topic.num}
              </span>
              <span className="text-slate-300 text-[11px] font-medium leading-tight">{topic.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Representing an Observation as a Feature Vector ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Binary className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Representing Observations as Feature Vectors</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          An <strong>observation</strong> represents a single entity, transaction, or patient. A <strong>feature</strong> is an individual measurable property. To apply KNN, we collect numerical measurements into an ordered mathematical vector:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$x = (\text{Study Hours}, \text{Attendance}) = (6, 88)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          The order of elements is immutable: coordinate 1 always denotes Study Hours and coordinate 2 always denotes Attendance percentage.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Student</th>
                <th className="py-2 px-3 text-slate-300">Study Hours (<MathText text="$x_1$" />)</th>
                <th className="py-2 px-3 text-slate-300">Attendance (<MathText text="$x_2$" />)</th>
                <th className="py-2 px-3 text-emerald-300">Feature Vector (<MathText text="$x$" />)</th>
                <th className="py-2 px-3 text-amber-300">Exam Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">A</td>
                <td className="py-2 px-3 font-mono">2</td>
                <td className="py-2 px-3 font-mono">60%</td>
                <td className="py-2 px-3 font-mono text-cyan-300">(2, 60)</td>
                <td className="py-2 px-3 text-rose-400 font-semibold">Fail</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">B</td>
                <td className="py-2 px-3 font-mono">7</td>
                <td className="py-2 px-3 font-mono">90%</td>
                <td className="py-2 px-3 font-mono text-cyan-300">(7, 90)</td>
                <td className="py-2 px-3 text-emerald-400 font-semibold">Pass</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-amber-300">Categorical Features & The One-Hot Encoding Requirement</span>
          <p className="text-slate-300 leading-relaxed">
            KNN requires numerical distances. Unordered categorical variables cannot simply be assigned arbitrary integers (e.g. <MathText text="$\text{Red}=1, \text{Blue}=2, \text{Green}=3$" />), because arithmetic distance would erroneously imply that Green is three times Red and that Red is closer to Blue than Green!
          </p>
          <p className="text-slate-300 leading-relaxed">
            Instead, we use <strong>one-hot encoding</strong>, which places every category on an orthogonal unit axis equidistant from all others (<MathText text="$d = \sqrt{1^2 + 1^2} = \sqrt{2}$" />):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden font-mono">
              <thead className="bg-slate-900 text-slate-200 border-b border-slate-800 font-sans">
                <tr>
                  <th className="py-1.5 px-3">Color Category</th>
                  <th className="py-1.5 px-3 text-rose-300">Is_Red</th>
                  <th className="py-1.5 px-3 text-cyan-300">Is_Blue</th>
                  <th className="py-1.5 px-3 text-emerald-300">Is_Green</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 bg-slate-950">
                <tr><td className="py-1 px-3 font-sans text-rose-400 font-semibold">Red</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td><td className="py-1 px-3">0</td></tr>
                <tr><td className="py-1 px-3 font-sans text-cyan-400 font-semibold">Blue</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td></tr>
                <tr><td className="py-1 px-3 font-sans text-emerald-400 font-semibold">Green</td><td className="py-1 px-3">0</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Euclidean Distance ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Euclidean Distance in D-Dimensions</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Distance provides our quantitative definition of similarity. Euclidean distance represents the straight-line geometric distance between two coordinate vectors:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-cyan-300">1 Dimension (Scalar)</span>
            <div className="bg-slate-900 p-2 rounded text-center text-cyan-300 font-mono">
              <MathText text="$$d(x, z) = |x - z|$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Absolute numerical difference along a single line.</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-300">2 Dimensions (Plane)</span>
            <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono">
              <MathText text="$$d(x, z) = \sqrt{(x_1 - z_1)^2 + (x_2 - z_2)^2}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Direct Pythagorean hypotenuse on a 2D plane.</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-purple-300">D Dimensions (Hyper-space)</span>
            <div className="bg-slate-900 p-2 rounded text-center text-purple-300 font-mono">
              <MathText text="$$d(x, z) = \sqrt{\sum_{j=1}^D (x_j - z_j)^2}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Sum of squared differences across all <MathText text="$D$" /> feature axes.</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">Step-by-Step Worked Calculation: <MathText text="$x = (3, 4)$" /> and <MathText text="$z = (6, 8)$" /></span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
            <div className="p-2 bg-slate-900 rounded-lg text-slate-300">
              <span className="text-[10px] text-slate-500 font-sans block">1. Differences</span>
              <MathText text="$3 - 6 = -3$" /><br />
              <MathText text="$4 - 8 = -4$" />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg text-cyan-300">
              <span className="text-[10px] text-slate-500 font-sans block">2. Squares</span>
              <MathText text="$(-3)^2 = 9$" /><br />
              <MathText text="$(-4)^2 = 16$" />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg text-emerald-300">
              <span className="text-[10px] text-slate-500 font-sans block">3. Sum</span>
              <MathText text="$9 + 16 = 25$" />
            </div>
            <div className="p-2 bg-slate-900 rounded-lg text-amber-300 border border-amber-500/30">
              <span className="text-[10px] text-amber-400 font-sans block">4. Square Root</span>
              <MathText text="$\sqrt{25} = \mathbf{5.0}$" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive 1 — Euclidean Distance Calculator ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Euclidean Distance Calculator</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Live 2D Evaluation
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Enter coordinates for two 2D observations to observe the coordinate differences, squared sums, and square-root metric:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="space-y-1">
            <label className="text-slate-400">Point <MathText text="$x_1$" />:</label>
            <input
              type="number"
              value={x1}
              onChange={(e) => setX1(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center font-mono text-cyan-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400">Point <MathText text="$x_2$" />:</label>
            <input
              type="number"
              value={x2}
              onChange={(e) => setX2(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center font-mono text-cyan-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400">Point <MathText text="$z_1$" />:</label>
            <input
              type="number"
              value={z1}
              onChange={(e) => setZ1(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center font-mono text-emerald-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400">Point <MathText text="$z_2$" />:</label>
            <input
              type="number"
              value={z2}
              onChange={(e) => setZ2(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center font-mono text-emerald-300"
            />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
          <div>Coordinate deltas: <MathText text={`$\\Delta_1 = (${x1} - ${z1}) = ${diff1}$`} />, <MathText text={`$\\Delta_2 = (${x2} - ${z2}) = ${diff2}$`} /></div>
          <div>Squared terms: <MathText text={`$${diff1}^2 = ${sqDiff1}$`} />, <MathText text={`$${diff2}^2 = ${sqDiff2}$`} /> | Sum: <MathText text={`$\\sum = ${sumSq}$`} /></div>
          <div className="text-sm font-bold text-amber-300 pt-1">
            Euclidean Distance: <MathText text={`$d(x, z) = \\sqrt{${sumSq}} = ${eucDist.toFixed(3)}$`} />
          </div>
        </div>
      </div>

      {/* ── KNN's Inductive Bias ───────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">KNN's Inductive Bias</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          An <strong>inductive bias</strong> is the core set of assumptions an algorithm relies on to generalize from finite training data to unseen query instances:
        </p>

        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
          <strong>The Inductive Bias of KNN:</strong> Observations that reside close together in feature space tend to share identical or highly similar labels.
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-200">Failure Modes of This Assumption:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-rose-400 font-semibold">1. Irrelevant Features (Noise)</span>
              <p className="text-slate-400 text-[11px]">Uninformative features inflate distance computations without carrying predictive signal.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-rose-400 font-semibold">2. Incompatible Feature Scales</span>
              <p className="text-slate-400 text-[11px]">Features measured in large units (e.g. salary) completely drown out small-unit attributes (e.g. age).</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-rose-400 font-semibold">3. Class Overlap / Mislabeled Data</span>
              <p className="text-slate-400 text-[11px]">Identical feature vectors with opposite labels introduce irreducible Bayes error.</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
              <span className="text-rose-400 font-semibold">4. Curse of Dimensionality</span>
              <p className="text-slate-400 text-[11px]">In high dimensions, volume grows exponentially, making all data points equally distant.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Complete KNN Classification Example ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete KNN Classification Worked Example</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose our training set contains five 2D points labeled either <strong>Red</strong> or <strong>Blue</strong>. We seek to classify query point <MathText text="$q = (3, 3)$" /> using <MathText text="$K = 3$" />:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Point</th>
                <th className="py-2 px-3 text-slate-300">Coordinates</th>
                <th className="py-2 px-3 text-amber-300">Class Label</th>
                <th className="py-2 px-3 text-emerald-300">Distance to <MathText text="$q=(3,3)$" /></th>
                <th className="py-2 px-3 text-slate-300">Rank (Smallest to Largest)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr className="bg-emerald-950/20">
                <td className="py-1.5 px-3 font-semibold text-rose-400">R₁</td>
                <td className="py-1.5 px-3">(2, 2)</td>
                <td className="py-1.5 px-3 font-sans text-rose-300 font-medium">Red</td>
                <td className="py-1.5 px-3 font-bold text-emerald-400"><MathText text="$\sqrt{(3-2)^2 + (3-2)^2} = \sqrt{2} \approx \mathbf{1.414}$" /></td>
                <td className="py-1.5 px-3 font-sans text-emerald-300 font-bold">1 (Selected)</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-1.5 px-3 font-semibold text-rose-400">R₂</td>
                <td className="py-1.5 px-3">(4, 4)</td>
                <td className="py-1.5 px-3 font-sans text-rose-300 font-medium">Red</td>
                <td className="py-1.5 px-3 font-bold text-emerald-400"><MathText text="$\sqrt{(3-4)^2 + (3-4)^2} = \sqrt{2} \approx \mathbf{1.414}$" /></td>
                <td className="py-1.5 px-3 font-sans text-emerald-300 font-bold">2 (Selected)</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-1.5 px-3 font-semibold text-cyan-400">B₁</td>
                <td className="py-1.5 px-3">(3, 1)</td>
                <td className="py-1.5 px-3 font-sans text-cyan-300 font-medium">Blue</td>
                <td className="py-1.5 px-3 font-bold text-emerald-400"><MathText text="$\sqrt{(3-3)^2 + (3-1)^2} = \sqrt{4} = \mathbf{2.000}$" /></td>
                <td className="py-1.5 px-3 font-sans text-emerald-300 font-bold">3 (Selected)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-3 font-semibold text-cyan-400">B₂</td>
                <td className="py-1.5 px-3">(5, 3)</td>
                <td className="py-1.5 px-3 font-sans text-cyan-300 font-medium">Blue</td>
                <td className="py-1.5 px-3 text-slate-400"><MathText text="$\sqrt{(3-5)^2 + (3-3)^2} = \sqrt{4} = 2.000$" /></td>
                <td className="py-1.5 px-3 font-sans text-slate-500">4 (Excluded)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-3 font-semibold text-cyan-400">B₃</td>
                <td className="py-1.5 px-3">(1, 4)</td>
                <td className="py-1.5 px-3 font-sans text-cyan-300 font-medium">Blue</td>
                <td className="py-1.5 px-3 text-slate-400"><MathText text="$\sqrt{(3-1)^2 + (3-4)^2} = \sqrt{5} \approx 2.236$" /></td>
                <td className="py-1.5 px-3 font-sans text-slate-500">5 (Excluded)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">Majority Voting Outcome:</span>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-sm">
            <span className="text-rose-400 font-bold">Red Votes: 2</span> <span className="text-slate-500 mx-2">|</span> <span className="text-cyan-400 font-bold">Blue Votes: 1</span>
          </div>
          <p className="text-emerald-300 font-semibold text-center pt-1">
            Prediction: Red (The two closest Red neighbors outvote the one closest Blue neighbor).
          </p>
        </div>
      </div>

      {/* ── The Effect of the K Hyperparameter ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Effect of Hyperparameter K</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <MathText text="$K$" /> is a hyperparameter selected before model inference that controls the bias-variance tradeoff:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-400 text-sm">Small K (e.g. K = 1)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">High Variance</span>
            </div>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>Advantage:</strong> Captures intricate local non-linear boundaries.</li>
              <li><strong>Severe Risk:</strong> High sensitivity to noise; a single mislabeled outlier creates an isolated island.</li>
              <li><strong>Regime:</strong> Low structural bias, excessive variance (overfitting).</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cyan-400 text-sm">Large K (e.g. K = N)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">High Bias</span>
            </div>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>Advantage:</strong> Highly stable; averages away random sample fluctuations.</li>
              <li><strong>Severe Risk:</strong> Oversmooths genuine local patterns; predicts global majority class everywhere.</li>
              <li><strong>Regime:</strong> Low variance, excessive structural bias (underfitting).</li>
            </ul>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-amber-300">
          Heuristic Rule of Thumb: <MathText text="$$K \approx \sqrt{N}, \quad \text{Choose odd } K \text{ for binary classification to eliminate ties}$$" displayMode={true} />
        </div>
      </div>

      {/* ── KNN Decision Boundaries ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Maximize2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">KNN Decision Boundaries</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A <strong>decision boundary</strong> is the geometrical interface separating regions of different predicted classes. For a 1D feature with Fail at 2 hours and Pass at 6 hours, the boundary is simply the midpoint:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$\text{Boundary} = \frac{2 + 6}{2} = \mathbf{4.0 \text{ hours}}$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Because KNN builds predictions directly from neighbor interactions rather than fitting a single global formula, its boundaries can form complex, non-linear, and disjoint polygonal surfaces (Voronoi facets).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Choice of <MathText text="$K$" /></th>
                <th className="py-2 px-3 text-slate-300">Boundary Morphology</th>
                <th className="py-2 px-3 text-emerald-300">Generalization Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-rose-300 font-mono">K = 1</td>
                <td className="py-2 px-3 text-slate-300">Extremely jagged, fine-grained, with isolated island pockets</td>
                <td className="py-2 px-3 text-rose-300">High risk of overfitting to label noise</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300 font-mono">Moderate K</td>
                <td className="py-2 px-3 text-slate-300">Smooth, continuous piecewise boundaries</td>
                <td className="py-2 px-3 text-emerald-300">Optimal balance of local detail and noise immunity</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300 font-mono">Very Large K</td>
                <td className="py-2 px-3 text-slate-300">Nearly flat, flat hyperplanes driven by base rate prior</td>
                <td className="py-2 px-3 text-amber-300">Underfits; predicts majority class across the whole space</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Weighted KNN ───────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Weighted KNN</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Standard KNN assigns equal weight to every neighbor. <strong>Weighted KNN</strong> assigns higher weight to closer points, typically via inverse distance:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$w_i = \frac{1}{d(x, x^{(i)})}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-rose-300">Classification Calculation: Overriding Numbers</span>
            <p className="text-slate-300 leading-relaxed">
              Suppose Neighbor A (<MathText text="$d=1$" />, Red, <MathText text="$w=1$" />), Neighbor B (<MathText text="$d=2$" />, Blue, <MathText text="$w=0.5$" />), and Neighbor C (<MathText text="$d=10$" />, Blue, <MathText text="$w=0.1$" />):
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-xs">
              <span className="text-rose-400 font-bold">Red Score = 1.0</span> <br />
              <span className="text-cyan-400 font-bold">Blue Score = 0.5 + 0.1 = 0.6</span>
            </div>
            <p className="text-emerald-300 text-[11px]">
              Weighted KNN predicts <strong>Red</strong> (<MathText text="$1.0 > 0.6$" />), even though Blue has twice as many neighbors!
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-300">Regression Calculation: Normalized Average</span>
            <p className="text-slate-300 leading-relaxed">
              For continuous targets <MathText text="$y = (100, 200, 300)$" /> with weights <MathText text="$w = (1.0, 0.5, 0.25)$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-emerald-300 text-xs">
              <MathText text="$$\hat{y} = \frac{1(100) + 0.5(200) + 0.25(300)}{1 + 0.5 + 0.25} = \frac{275}{1.75} \approx \mathbf{157.14}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              Normalizing by the sum of weights ensures the prediction is a true convex weighted average.
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive 2 — Weighted KNN Regression Calculator ─────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Weighted KNN Regression</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Live Normalized Average
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the neighbor targets (<MathText text="$y_i$" />) and weights (<MathText text="$w_i$" />) to verify the weighted regression prediction:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="p-3 bg-slate-900/80 rounded-lg space-y-2 border border-slate-800">
            <span className="font-semibold text-emerald-400">Neighbor 1</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target <MathText text="$y_1$" />:</span>
              <input
                type="number"
                value={wy1}
                onChange={(e) => setWy1(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-cyan-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weight <MathText text="$w_1$" />:</span>
              <input
                type="number"
                step="0.1"
                value={ww1}
                onChange={(e) => setWw1(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-emerald-300"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg space-y-2 border border-slate-800">
            <span className="font-semibold text-cyan-400">Neighbor 2</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target <MathText text="$y_2$" />:</span>
              <input
                type="number"
                value={wy2}
                onChange={(e) => setWy2(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-cyan-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weight <MathText text="$w_2$" />:</span>
              <input
                type="number"
                step="0.1"
                value={ww2}
                onChange={(e) => setWw2(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-emerald-300"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg space-y-2 border border-slate-800">
            <span className="font-semibold text-purple-400">Neighbor 3</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target <MathText text="$y_3$" />:</span>
              <input
                type="number"
                value={wy3}
                onChange={(e) => setWy3(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-cyan-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weight <MathText text="$w_3$" />:</span>
              <input
                type="number"
                step="0.1"
                value={ww3}
                onChange={(e) => setWw3(Number(e.target.value) || 0)}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-right font-mono text-emerald-300"
              />
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400">
            Numerator: <span className="font-mono text-cyan-300 font-bold">{regNumerator.toFixed(2)}</span> |
            Denominator: <span className="font-mono text-emerald-300 font-bold">{regDenominator.toFixed(2)}</span>
          </div>
          <div className="text-sm font-bold font-mono text-amber-300">
            Weighted Prediction: <span className="text-cyan-400">{regPrediction}</span>
          </div>
        </div>
      </div>

      {/* ── Feature Scaling & Standardization ──────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Feature Scaling & Why It Matters</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Because Euclidean distance sums squared coordinate differences, any feature measured in large numbers will completely dominate the metric:
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <span className="font-semibold text-rose-300">The Scale Trap: Query Q vs. Candidates A and B</span>
          <p className="text-slate-300">
            Query <MathText text="$Q = (\text{Age } 30, \text{Income } \$50,000)$" />. Candidate A is <MathText text="$(31, \$70,000)$" /> and Candidate B is <MathText text="$(50, \$51,000)$" />.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3 bg-slate-900 rounded-lg space-y-1">
              <span className="text-rose-400 font-sans font-bold">Unscaled Distance to A:</span>
              <div className="text-xs text-slate-300">
                <MathText text="$$d(Q, A) = \sqrt{(30-31)^2 + (50000-70000)^2} \approx \mathbf{20,000}$$" displayMode={true} />
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg space-y-1">
              <span className="text-cyan-400 font-sans font-bold">Unscaled Distance to B:</span>
              <div className="text-xs text-slate-300">
                <MathText text="$$d(Q, B) = \sqrt{(30-50)^2 + (50000-51000)^2} \approx \mathbf{1,000.2}$$" displayMode={true} />
              </div>
            </div>
          </div>

          <p className="text-rose-300 text-[11px]">
            <strong>Raw KNN chooses B:</strong> Even though Candidate B is 20 years older (a massive demographic gap), the $1,000 salary difference completely overwhelms age!
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-200">Z-Score Standardization</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            We standardize every feature using its mean <MathText text="$\mu$" /> and standard deviation <MathText text="$\sigma$" /> computed from the <em>training set</em>:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
            <MathText text="$$z = \frac{x - \mu}{\sigma}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Assuming <MathText text="$\mu_{\text{age}} = 40, \sigma_{\text{age}} = 10$" /> and <MathText text="$\mu_{\text{inc}} = 60000, \sigma_{\text{inc}} = 20000$" />:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Observation</th>
                <th className="py-2 px-3 text-slate-300">Standardized Age (<MathText text="$z_{\text{age}}$" />)</th>
                <th className="py-2 px-3 text-slate-300">Standardized Income (<MathText text="$z_{\text{inc}}$" />)</th>
                <th className="py-2 px-3 text-emerald-300">Standardized Distance to Q</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-1.5 px-3 font-semibold text-slate-400 font-sans">Query Q (30, $50,000)</td>
                <td className="py-1.5 px-3">(30−40)/10 = −1.0</td>
                <td className="py-1.5 px-3">(50,000−60,000)/20,000 = −0.5</td>
                <td className="py-1.5 px-3 font-sans text-slate-500">Reference</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-1.5 px-3 font-semibold text-emerald-400 font-sans">Candidate A (31, $70,000)</td>
                <td className="py-1.5 px-3">(31−40)/10 = −0.9</td>
                <td className="py-1.5 px-3">(70,000−60,000)/20,000 = +0.5</td>
                <td className="py-1.5 px-3 font-bold text-emerald-400"><MathText text="$\sqrt{(-0.1)^2 + (-1.0)^2} = \sqrt{1.01} \approx \mathbf{1.005}$" /></td>
              </tr>
              <tr>
                <td className="py-1.5 px-3 font-semibold text-slate-400 font-sans">Candidate B (50, $51,000)</td>
                <td className="py-1.5 px-3">(50−40)/10 = +1.0</td>
                <td className="py-1.5 px-3">(51,000−60,000)/20,000 = −0.45</td>
                <td className="py-1.5 px-3 text-slate-400"><MathText text="$\sqrt{(-2.0)^2 + (-0.05)^2} = \sqrt{4.0025} \approx 2.001$" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
          <strong>After Standardization, Candidate A Is Chosen:</strong> Scaling does not alter the underlying points; it balances coordinates so that age and salary contribute fairly according to their dispersion.
        </div>
      </div>

      {/* ── Interactive 3 — Raw vs. Standardized Distance Comparison ─────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — See the Scaling Problem</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Raw vs. Standardized
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Compare the classification winner before and after standardizing features with mean <MathText text="$\mu$" /> and standard deviation <MathText text="$\sigma$" />:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-rose-400 text-sm">Raw (Unscaled) Distance</span>
            <div className="font-mono text-xs text-slate-300 space-y-1">
              <div>Candidate A: <span className="text-cyan-300">{rawDistA.toFixed(2)}</span></div>
              <div>Candidate B: <span className="text-cyan-300">{rawDistB.toFixed(2)}</span></div>
            </div>
            <div className="p-2 bg-slate-900 rounded font-bold text-rose-300 text-xs">
              Raw KNN selects: {rawWinner} (distorted by income)
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-400 text-sm">Standardized Distance</span>
            <div className="font-mono text-xs text-slate-300 space-y-1">
              <div>Candidate A: <span className="text-emerald-300">{stdDistA.toFixed(3)}</span></div>
              <div>Candidate B: <span className="text-purple-300">{stdDistB.toFixed(3)}</span></div>
            </div>
            <div className="p-2 bg-slate-900 rounded font-bold text-emerald-300 text-xs">
              Scaled KNN selects: {stdWinner} (fair balanced metric)
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
          <strong className="text-amber-300">Data Leakage Warning:</strong> Always estimate <MathText text="$\mu$" /> and <MathText text="$\sigma$" /> strictly on the training partition. Apply those exact saved statistics to scale validation and test queries. Never compute scaling statistics across the combined test set.
        </div>
      </div>

      {/* ── Complete Summary Table ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete Summary</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Core Concept</th>
                <th className="py-2.5 px-3 text-slate-300">Theoretical & Practical Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300 font-mono">Feature Vector</td>
                <td className="py-2 px-3 text-slate-300">Ordered numerical representation of an observation in <MathText text="$\mathbb{R}^D$" /> space.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300 font-mono">Euclidean Distance</td>
                <td className="py-2 px-3 text-slate-300">Straight-line Pythagorean distance between two vectors across all coordinates.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300 font-mono">Inductive Bias</td>
                <td className="py-2 px-3 text-slate-300">KNN assumes nearby instances in feature space share similar targets or labels.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300 font-mono">Hyperparameter K</td>
                <td className="py-2 px-3 text-slate-300">Controls the size of the voting neighborhood; balances bias vs. variance.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-rose-300 font-mono">Decision Boundary</td>
                <td className="py-2 px-3 text-slate-300">Geometric interface separating class predictions (piecewise Voronoi facets).</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-indigo-300 font-mono">Weighted KNN</td>
                <td className="py-2 px-3 text-slate-300">Assigns weight inversely proportional to distance (<MathText text="$w_i = 1/d_i$" />), giving closer points more influence.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-teal-300 font-mono">Feature Scaling</td>
                <td className="py-2 px-3 text-slate-300">Standardizes features (<MathText text="$z = (x - \mu)/\sigma$" />) so high-magnitude features do not dominate distance.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
