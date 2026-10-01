import React, { useState } from 'react';
import {
  Layers,
  Scale,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Activity,
  Target,
  Vote,
  Compass,
  TrendingUp,
  Hash
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module6MulticlassSVMConfidence: React.FC = () => {
  // ── Interactive 1: Multiclass Worked Example Workbench (Section 5) ──
  const [x1, setX1] = useState<number>(2.0);
  const [x2, setX2] = useState<number>(1.0);

  // One-versus-All Models
  const fCat = x1 + x2 - 4;
  const fDog = 2 * x1 - x2 - 1;
  const fBird = -x1 + 2 * x2 - 2;

  const maxScore = Math.max(fCat, fDog, fBird);
  const ovaWinner = maxScore === fDog ? 'Dog' : maxScore === fCat ? 'Cat' : 'Bird';

  // One-versus-One Models
  // Cat vs Dog: g = x2 - x1 (if > 0 Cat, else Dog)
  const gCatDog = x2 - x1;
  const winnerCatDog = gCatDog > 0 ? 'Cat' : 'Dog';

  // Cat vs Bird: g = x1 - x2 - 0.5 (if > 0 Cat, else Bird)
  const gCatBird = x1 - x2 - 0.5;
  const winnerCatBird = gCatBird > 0 ? 'Cat' : 'Bird';

  // Dog vs Bird: g = x1 - x2 - 0.5 (if > 0 Dog, else Bird)
  const gDogBird = x1 - x2 - 0.5;
  const winnerDogBird = gDogBird > 0 ? 'Dog' : 'Bird';

  // Vote counting
  let votesCat = 0;
  let votesDog = 0;
  let votesBird = 0;

  if (winnerCatDog === 'Cat') votesCat++; else votesDog++;
  if (winnerCatBird === 'Cat') votesCat++; else votesBird++;
  if (winnerDogBird === 'Dog') votesDog++; else votesBird++;

  const maxVotes = Math.max(votesCat, votesDog, votesBird);
  const ovoWinner = maxVotes === votesDog ? 'Dog' : maxVotes === votesCat ? 'Cat' : 'Bird';

  // ── Interactive 2: Score vs Distance Calculator (Section 4) ──
  // f(x) = 3x1 + 4x2 - 10, w = (3, 4), ||w|| = 5
  const [distX1, setDistX1] = useState<number>(2);
  const [distX2, setDistX2] = useState<number>(2);
  const rawScore = 3 * distX1 + 4 * distX2 - 10;
  const wNorm = 5; // sqrt(3^2 + 4^2) = 5
  const geomDist = Math.abs(rawScore) / wNorm;

  // ── Interactive 3: K-Classes Model Scaler ──
  const [kClasses, setKClasses] = useState<number>(4);
  const ovaModelCount = kClasses;
  const ovoModelCount = (kClasses * (kClasses - 1)) / 2;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Learning Goal & Core Intuition */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>Learning Goal &amp; Core Intuition</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Understand why binary SVMs cannot directly classify 3+ categories, how One-versus-All (OvA) and One-versus-One (OvO) decompose multiclass tasks, how to distinguish raw decision scores from geometric distances, and how to execute full multiclass predictions.
        </p>
        <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 flex items-start gap-2.5 text-xs text-blue-200 leading-relaxed">
          <Compass className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Key Intuition:</strong> A binary SVM answers a two-way question (+1 vs -1). For multiclass tasks, we train an ensemble of binary SVMs and resolve predictions either by highest decision score (OvA) or majority voting (OvO).
          </span>
        </div>
      </div>

      {/* Section 1: Why Multiclass SVM Needs Several Models */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Why Multiclass SVM Needs Several Models</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Standard SVM formulation is fundamentally binary: it positions a single hyperplane separating two classes (<MathText text="$y \in \{-1, +1\}$" />). When categorizing between three or more classes (such as <strong className="text-amber-300">Cat</strong>, <strong className="text-cyan-300">Dog</strong>, and <strong className="text-purple-300">Bird</strong>), a single straight hyperplane cannot directly partition three distinct clusters.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          Instead, we decompose the multiclass problem into multiple binary sub-problems:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Individual Binary SVM</th>
                <th className="py-2.5 px-4 font-sans">Binary Question Asked</th>
                <th className="py-2.5 px-4 font-sans">Role in Ensemble</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">Cat vs. Dog</td>
                <td className="py-2.5 px-4 font-sans text-cyan-300">Is this observation a Cat or a Dog?</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Pairwise binary boundary</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">Cat vs. Bird</td>
                <td className="py-2.5 px-4 font-sans text-indigo-300">Is this observation a Cat or a Bird?</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Pairwise binary boundary</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">Dog vs. Bird</td>
                <td className="py-2.5 px-4 font-sans text-purple-300">Is this observation a Dog or a Bird?</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Pairwise binary boundary</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 italic">
          Each individual SVM remains purely binary; the multiclass strategy aggregates their collective answers.
        </p>
      </section>

      {/* Section 2: One-Versus-All (OvA / OvR) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">One-Versus-All (OvA / One-vs-Rest)</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In <strong>One-versus-All</strong>, for a dataset with <MathText text="$K$" /> classes, we train exactly <MathText text="$K$" /> separate binary SVMs. For each model <MathText text="$k$" />, samples from class <MathText text="$k$" /> receive label <span className="text-emerald-400 font-bold">+1</span>, and all samples belonging to any other class receive label <span className="text-rose-400 font-bold">-1</span>.
        </p>

        {/* Training Label Mapping Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold font-mono">
                <th className="py-2.5 px-4 font-sans">Ground Truth Class</th>
                <th className="py-2.5 px-4">Cat-vs-All Model</th>
                <th className="py-2.5 px-4">Dog-vs-All Model</th>
                <th className="py-2.5 px-4">Bird-vs-All Model</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold font-sans">Cat Instance</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">+1</td>
                <td className="py-2.5 px-4 text-rose-400">-1</td>
                <td className="py-2.5 px-4 text-rose-400">-1</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold font-sans">Dog Instance</td>
                <td className="py-2.5 px-4 text-rose-400">-1</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">+1</td>
                <td className="py-2.5 px-4 text-rose-400">-1</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold font-sans">Bird Instance</td>
                <td className="py-2.5 px-4 text-rose-400">-1</td>
                <td className="py-2.5 px-4 text-rose-400">-1</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">+1</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Prediction Rule */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">Decision Rule for New Points</span>
          <p className="text-xs text-slate-300">
            Compute the linear score <MathText text="$f_k(\mathbf{x}) = \mathbf{w}_k^T\mathbf{x} + b_k$" /> from every model <MathText text="$k$" />. Assign the instance to the class with the <strong>largest raw decision score</strong>:
          </p>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-cyan-300 text-sm text-center">
            <MathText text="$$\hat{y} = \arg\max_{k \in \{1, \dots, K\}} f_k(\mathbf{x})$$" />
          </div>
          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-900/50 text-xs text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Distinction:</strong> The score is not automatically a probability; it is an unbounded signed decision-function value. A positive value means the positive side; the largest algebraic value yields the OvA decision.
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: One-Versus-One (OvO) */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Vote className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">One-Versus-One (OvO)</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In <strong>One-versus-One</strong>, we train a distinct binary model for <em>every unique pair</em> of classes. When training the pair <span className="font-mono text-cyan-300">(Cat, Dog)</span>, data points from all other classes (<span className="font-mono text-slate-400">Bird</span>) are completely excluded from that optimization problem.
        </p>

        {/* Combinatorial Formula */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-base text-purple-300 space-y-1">
          <span className="text-xs font-sans text-slate-400 block uppercase">Total Models Required for K Classes</span>
          <MathText text="$$\text{Number of OvO Models} = \frac{K(K - 1)}{2} = \binom{K}{2}$$" />
        </div>

        <p className="text-xs text-slate-300">
          At prediction time, each of the <MathText text="$\frac{K(K-1)}{2}$" /> pairwise SVMs evaluates the instance and casts one vote for its winning class. The class with the <strong>most votes</strong> wins the final prediction.
        </p>

        {/* Interactive K-Model Scaler */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> Model Count Scaler (OvA vs OvO)
            </span>
            <span className="font-mono text-purple-300 font-bold">K = {kClasses} Classes</span>
          </div>

          <input
            type="range"
            min={3}
            max={15}
            step={1}
            value={kClasses}
            onChange={(e) => setKClasses(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />

          <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">One-vs-All (OvA) Models</span>
              <span className="text-cyan-400 text-base font-bold">{ovaModelCount} models</span>
              <span className="text-[10px] text-slate-500 block font-sans">Linear complexity O(K)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">One-vs-One (OvO) Models</span>
              <span className="text-purple-400 text-base font-bold">{ovoModelCount} models</span>
              <span className="text-[10px] text-slate-500 block font-sans">Quadratic complexity O(K²)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Score Versus Distance */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Score Versus Distance</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Suppose a trained decision boundary is given by:
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-sm text-amber-300">
          <MathText text="$$f(\mathbf{x}) = 3x_1 + 4x_2 - 10 = 0 \implies \mathbf{w} = (3, 4), \quad b = -10$$" />
          <div className="text-xs text-slate-400 mt-1">
            Weight Vector Norm: <MathText text="$\|\mathbf{w}\| = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$" />
          </div>
        </div>

        {/* Lecture Worked Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold font-mono">
                <th className="py-2.5 px-4 font-sans">Point</th>
                <th className="py-2.5 px-4">Score f(x)</th>
                <th className="py-2.5 px-4 font-sans">Side of Boundary</th>
                <th className="py-2.5 px-4">Geometric Distance |f(x)| / ||w||</th>
                <th className="py-2.5 px-4 font-sans">Confidence Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">A = (2, 2)</td>
                <td className="py-2.5 px-4 text-cyan-300">3(2) + 4(2) - 10 = +4</td>
                <td className="py-2.5 px-4 font-sans text-emerald-400 font-semibold">Positive (+1)</td>
                <td className="py-2.5 px-4 text-emerald-400 font-bold">|4| / 5 = 0.8</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Farther from boundary (higher margin)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold">B = (1, 2)</td>
                <td className="py-2.5 px-4 text-cyan-300">3(1) + 4(2) - 10 = +1</td>
                <td className="py-2.5 px-4 font-sans text-emerald-400 font-semibold">Positive (+1)</td>
                <td className="py-2.5 px-4 text-amber-400 font-bold">|1| / 5 = 0.2</td>
                <td className="py-2.5 px-4 font-sans text-slate-400">Closer to boundary (lower margin)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live Distance Sandbox */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> Interactive Distance Tester
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => { setDistX1(2); setDistX2(2); }}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[11px] border border-slate-700"
              >
                Point A (2, 2)
              </button>
              <button
                onClick={() => { setDistX1(1); setDistX2(2); }}
                className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[11px] border border-slate-700"
              >
                Point B (1, 2)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">x₁</span>
                <span className="text-white font-bold">{distX1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={5}
                step={0.5}
                value={distX1}
                onChange={(e) => setDistX1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">x₂</span>
                <span className="text-white font-bold">{distX2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-2}
                max={5}
                step={0.5}
                value={distX2}
                onChange={(e) => setDistX2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Raw Score f(x)</span>
              <span className={`font-bold ${rawScore >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {rawScore.toFixed(2)}
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Side</span>
              <span className="text-white font-bold font-sans">
                {rawScore > 0 ? 'Positive (+1)' : rawScore < 0 ? 'Negative (-1)' : 'Boundary'}
              </span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans">Perpendicular Distance</span>
              <span className="text-amber-300 font-bold">{geomDist.toFixed(2)} units</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Complete Worked Example & Interactive Simulator */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Complete Worked Example: OvA vs. OvO</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Evaluate new observation <MathText text="$\mathbf{x} = (x_1, x_2) = (2, 1)$" /> across both multiclass paradigms using the lecture trained models:
        </p>

        {/* Dual Method Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* One-versus-All Card */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" /> One-versus-All (OvA)
              </span>
              <span className="text-[11px] font-mono text-slate-400">Largest Score Wins</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className={`p-2.5 rounded-lg border ${fCat === maxScore ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                <div className="flex justify-between">
                  <span>f_cat = x₁ + x₂ - 4</span>
                  <span className="font-bold">{x1} + {x2} - 4 = {fCat.toFixed(1)}</span>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg border ${fDog === maxScore ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                <div className="flex justify-between">
                  <span>f_dog = 2x₁ - x₂ - 1</span>
                  <span className="font-bold">2({x1}) - {x2} - 1 = {fDog.toFixed(1)}</span>
                </div>
              </div>

              <div className={`p-2.5 rounded-lg border ${fBird === maxScore ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                <div className="flex justify-between">
                  <span>f_bird = -x₁ + 2x₂ - 2</span>
                  <span className="font-bold">-({x1}) + 2({x2}) - 2 = {fBird.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">OvA Prediction</span>
              <span className="text-base font-bold text-emerald-300 font-sans">{ovaWinner}</span>
              <span className="text-[11px] text-slate-400 block">(Max Score: {maxScore.toFixed(1)})</span>
            </div>
          </div>

          {/* One-versus-One Card */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Vote className="w-4 h-4" /> One-versus-One (OvO)
              </span>
              <span className="text-[11px] font-mono text-slate-400">Majority Vote Wins</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Cat vs. Dog: g = x₂ - x₁</span>
                  <span className="text-slate-300">{x2} - {x1} = {gCatDog.toFixed(1)}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-sans font-bold">
                  {winnerCatDog} Wins
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Cat vs. Bird: g = x₁ - x₂ - 0.5</span>
                  <span className="text-slate-300">{x1} - {x2} - 0.5 = {gCatBird.toFixed(1)}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-sans font-bold">
                  {winnerCatBird} Wins
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-400 block text-[10px] font-sans">Dog vs. Bird: g = x₁ - x₂ - 0.5</span>
                  <span className="text-slate-300">{x1} - {x2} - 0.5 = {gDogBird.toFixed(1)}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-sans font-bold">
                  {winnerDogBird} Wins
                </span>
              </div>
            </div>

            {/* Vote Tally */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Cat</span>
                <span className="font-bold text-white">{votesCat} vote{votesCat === 1 ? '' : 's'}</span>
              </div>
              <div className={`p-2 rounded border ${votesDog === maxVotes ? 'bg-purple-950/40 border-purple-600 text-purple-200' : 'bg-slate-900 border-slate-800'}`}>
                <span className="text-[10px] text-slate-400 block font-sans">Dog</span>
                <span className="font-bold text-purple-300">{votesDog} vote{votesDog === 1 ? '' : 's'}</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">Bird</span>
                <span className="font-bold text-white">{votesBird} votes</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">OvO Prediction</span>
              <span className="text-base font-bold text-emerald-300 font-sans">{ovoWinner}</span>
              <span className="text-[11px] text-slate-400 block">(Plurality of Votes: {maxVotes})</span>
            </div>
          </div>
        </div>

        {/* Live Interactive Sliders for Custom Query Point */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Test Any Coordinate (x₁, x₂)
            </span>
            <button
              onClick={() => { setX1(2); setX2(1); }}
              className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white text-[11px] border border-slate-700"
            >
              Reset to Lecture Point (2, 1)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Coordinate x₁</span>
                <span className="text-white font-bold">{x1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-3}
                max={5}
                step={0.5}
                value={x1}
                onChange={(e) => setX1(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Coordinate x₂</span>
                <span className="text-white font-bold">{x2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-3}
                max={5}
                step={0.5}
                value={x2}
                onChange={(e) => setX2(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Final Takeaway Answer Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3 mt-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
            <strong>Module Summary:</strong> Binary SVMs naturally separate two classes. One-versus-All uses <MathText text="$K$" /> models and selects the maximum decision score; One-versus-One uses <MathText text="$\frac{K(K-1)}{2}$" /> pairwise models and selects the class with the most votes. Neither raw scores nor geometric distances (<MathText text="$|f(\mathbf{x})|/\|\mathbf{w}\|$" />) are probabilities.
          </p>
        </div>
      </section>
    </div>
  );
};
