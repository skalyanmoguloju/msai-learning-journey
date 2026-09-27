import React, { useState, useMemo } from 'react';
import {
  Layers,
  Sliders,
  CheckCircle2,
  Calculator,
  TreeDeciduous,
  Shuffle,
  BarChart2,
  Table,
  Dices,
  Vote,
  Split,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module5BaggingRandomForests: React.FC = () => {
  // ── Interactive Bootstrap Sampler State (Part 3) ─────────────────────
  const originalItems = ['A', 'B', 'C', 'D', 'E'];
  const [bootstrapSample, setBootstrapSample] = useState<string[]>(['C', 'A', 'C', 'E', 'B']);

  const { counts, inBagCount, oobItems } = useMemo(() => {
    const tally: { [key: string]: number } = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    bootstrapSample.forEach(item => {
      if (tally[item] !== undefined) tally[item]++;
    });
    const oob = originalItems.filter(item => tally[item] === 0);
    const uniqueInBag = originalItems.filter(item => tally[item] > 0).length;

    return {
      counts: tally,
      inBagCount: uniqueInBag,
      oobItems: oob
    };
  }, [bootstrapSample]);

  const drawBootstrapSample = () => {
    const drawn: string[] = [];
    for (let i = 0; i < originalItems.length; i++) {
      const randIdx = Math.floor(Math.random() * originalItems.length);
      drawn.push(originalItems[randIdx]);
    }
    setBootstrapSample(drawn);
  };

  // ── Interactive Prediction Combiner State (Part 5) ───────────────────
  const [t1, setT1] = useState<number>(190);
  const [t2, setT2] = useState<number>(220);
  const [t3, setT3] = useState<number>(205);
  const [t4, setT4] = useState<number>(210);

  const regressionAvg = (t1 + t2 + t3 + t4) / 4;

  const [catVotes, setCatVotes] = useState<number>(6);
  const [dogVotes, setDogVotes] = useState<number>(3);
  const [rabbitVotes, setRabbitVotes] = useState<number>(1);

  const voteResult = useMemo(() => {
    const c = Math.max(0, catVotes);
    const d = Math.max(0, dogVotes);
    const r = Math.max(0, rabbitVotes);
    const total = c + d + r;
    if (total === 0) return { winner: 'None', winnerPct: 0, total: 0 };

    const arr = [
      { name: 'Cat', count: c, pct: (c / total) * 100 },
      { name: 'Dog', count: d, pct: (d / total) * 100 },
      { name: 'Rabbit', count: r, pct: (r / total) * 100 }
    ].sort((a, b) => b.count - a.count);

    return {
      winner: arr[0].name,
      winnerPct: arr[0].pct,
      total,
      breakdown: arr
    };
  }, [catVotes, dogVotes, rabbitVotes]);

  // ── Interactive Ensemble Variance Law State (Part 7) ─────────────────
  const [numTrees, setNumTrees] = useState<number>(50);
  const [rho, setRho] = useState<number>(0.25); // Pairwise correlation
  const baseVar = 10.0; // Individual tree variance sigma^2

  const ensembleVar = rho * baseVar + ((1 - rho) / numTrees) * baseVar;
  const asymptoticVar = rho * baseVar;
  const varianceReductionPct = ((baseVar - ensembleVar) / baseVar) * 100;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Why Use Ensemble Models? ───────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why Use Ensemble Models?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          An ensemble model combines predictions from multiple individual base learners into a single composite prediction. For decision-tree ensembles:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-xs">
          <MathText text="$$\text{Many Individual Decision Trees } \{T_1, T_2, \dots, T_B\} \longrightarrow \text{One Robust Combined Prediction } \hat{f}(x)$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">The Problem of Solo Trees</span>
            <p className="text-slate-300 leading-relaxed">
              A single standalone tree is susceptible to idiosyncratic noise in the training set. If a few unusual samples happen to dominate the initial split,
              the entire downstream tree architecture will skew wildly, yielding erroneous predictions for test cases.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">The Wisdom of Crowds (Error Cancellation)</span>
            <p className="text-slate-300 leading-relaxed">
              If multiple diverse trees make <em>different, uncorrelated errors</em>, averaging or voting causes individual errors to cancel out.
              The composite consensus prediction is far more stable, robust, and accurate than any individual constituent tree.
            </p>
          </div>
        </div>

        {/* Concrete Regression Example */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            Simple Regression Example
          </span>
          <p className="text-slate-300">
            Suppose four separate decision trees trained on perturbed data predict the continuous price of an asset:
          </p>
          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$T_1 = 190, \quad T_2 = 210, \quad T_3 = 205, \quad T_4 = 220$$" />
          </div>
          <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-emerald-300">
            <MathText text="$$\hat{y}_{\text{ensemble}} = \frac{190 + 210 + 205 + 220}{4} = \frac{825}{4} = 206.25$$" />
          </div>
          <p className="text-slate-400 text-[11px]">
            The ensemble average of <strong>206.25</strong> buffers against the extreme individual calls of 190 or 220.
          </p>
        </div>
      </div>

      {/* ── Part 2: Why a Single Deep Tree Can Be Unstable ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why a Single Deep Tree Can Be Unstable (High Variance)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A machine learning model is <strong>unstable</strong> if a minor modification to the training dataset (such as removing just one or two points) triggers a drastic change in the final learned model.
          Decision trees are inherently unstable because of their <strong>hierarchical top-down nature</strong>:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1.5">
          <div className="text-amber-300 font-semibold">The Cascading Split Effect:</div>
          <p>
            Altering a couple of data points can cause a different feature or threshold to be chosen at the <em>root node</em>.
            Because all subsequent child partitions depend entirely on the root division, every subsequent internal branch and leaf partition is altered, producing a completely different tree!
          </p>
        </div>

        {/* Bias-Variance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-cyan-300">Tree Depth / Size</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Bias (Underfitting Risk)</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-rose-300">Variance (Overfitting Risk)</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-indigo-300">Behavioral Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-sans font-semibold text-slate-200">Very Shallow (Stump)</td>
                <td className="py-2 px-3 text-rose-300 font-bold">High Bias</td>
                <td className="py-2 px-3 text-emerald-300 font-bold">Low Variance</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Oversimplified boundary; fails to capture non-linear patterns.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-sans font-semibold text-slate-200">Medium Depth</td>
                <td className="py-2 px-3 text-amber-300 font-bold">Moderate</td>
                <td className="py-2 px-3 text-amber-300 font-bold">Moderate</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Reasonable fit, but still sensitive to specific training split.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-sans font-semibold text-slate-200">Very Deep (Unpruned)</td>
                <td className="py-2 px-3 text-emerald-300 font-bold">Very Low Bias</td>
                <td className="py-2 px-3 text-rose-300 font-bold">Very High Variance</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Memorizes sample noise; near-zero train error but poor generalization.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
          <strong>The Ensemble Solution:</strong> Bagging and Random Forests take <em>deep, low-bias, high-variance trees</em> and ensemble them.
          Averaging retains the low bias of deep trees while mathematically crushing the high variance!
        </div>
      </div>

      {/* ── Part 3: Bootstrap Samples ──────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Dices className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Bootstrap Samples</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose our training dataset contains <MathText text="$N$" /> observations. A <strong>bootstrap sample</strong> is formed by drawing <MathText text="$N$" /> observations <strong>with replacement</strong> from the original dataset.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">Original Dataset (<MathText text="$N=5$" />)</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300 text-sm">
              [ A, B, C, D, E ]
            </div>
            <p className="text-slate-400 text-[11px]">
              Every observation appears exactly once in the ground-truth training set.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">Example Bootstrap Draw (<MathText text="$N=5$" /> with replacement)</span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-emerald-300 text-sm">
              [ C, A, C, E, B ]
            </div>
            <p className="text-slate-400 text-[11px]">
              Observation <strong className="text-emerald-300">C</strong> appears twice, while observation <strong className="text-rose-300">D</strong> was left out entirely!
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-slate-200">The 63.2% Rule & Out-Of-Bag (OOB) Samples:</span>
          <p className="text-slate-300 leading-relaxed">
            For a dataset of size <MathText text="$N$" />, the probability of an item <em>not</em> being selected in one draw is <MathText text="$1 - \frac{1}{N}$" />.
            Across <MathText text="$N$" /> independent draws with replacement:
          </p>
          <div className="p-2 bg-slate-900 rounded font-mono text-center text-purple-300">
            <MathText text="$$P(\text{Not Selected in } N \text{ draws}) = \left(1 - \frac{1}{N}\right)^N \xrightarrow[N \to \infty]{} e^{-1} \approx 0.368 \quad (36.8\%)$$" displayMode={true} />
          </div>
          <p className="text-slate-300 text-[11px]">
            Thus, each bootstrap dataset contains approximately <strong>63.2% unique observations</strong>, leaving <strong>36.8% Out-of-Bag (OOB)</strong>.
            These unselected OOB samples serve as a built-in validation test set for free without needing explicit cross-validation!
          </p>
        </div>

        {/* Interactive Bootstrap Sampler */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Dices className="w-3.5 h-3.5 text-cyan-400" />
              Interactive Bootstrap Sample Generator
            </span>
            <button
              onClick={drawBootstrapSample}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5 text-xs shadow"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Draw New Bootstrap Sample
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center font-mono space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Generated Sample (N=5):</span>
            <div className="text-lg font-bold text-emerald-300 tracking-wider">
              [ {bootstrapSample.join(', ')} ]
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-center">
            {originalItems.map(item => {
              const count = counts[item] || 0;
              return (
                <div key={item} className={`p-2 rounded border ${count > 0 ? 'bg-slate-900 border-slate-800' : 'bg-rose-500/10 border-rose-500/30'}`}>
                  <span className="text-slate-300 font-bold block text-sm">{item}</span>
                  <span className={`text-[11px] ${count === 0 ? 'text-rose-400 font-bold' : count > 1 ? 'text-emerald-300 font-bold' : 'text-slate-400'}`}>
                    {count === 0 ? 'OOB (0)' : `${count}× in bag`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>In-Bag Unique: <strong className="text-emerald-300 font-mono">{inBagCount}/5</strong></span>
            <span>Out-Of-Bag (OOB): <strong className="text-rose-300 font-mono">{oobItems.length > 0 ? oobItems.join(', ') : 'None'}</strong></span>
          </div>
        </div>
      </div>

      {/* ── Part 4: Bagging (Bootstrap Aggregation) ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Bagging (Bootstrap Aggregating)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Bagging</strong> is an acronym for <em>Bootstrap Aggregating</em> (Leo Breiman, 1996). It executes a straightforward 4-step parallel training protocol:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          {[
            { step: '1', title: 'Bootstrap Resampling', desc: 'Generate B independent bootstrap datasets D(1), D(2), ..., D(B) by sampling N points with replacement.' },
            { step: '2', title: 'Parallel Training', desc: 'Fit a deep, fully grown, unpruned decision tree Tb independently on each bootstrap dataset D(b).' },
            { step: '3', title: 'Collect Predictions', desc: 'Feed a new test observation x into all B individual trees to gather their distinct predictions Tb(x).' },
            { step: '4', title: 'Aggregate Consensus', desc: 'Average outputs for regression or conduct a majority vote across all classes for classification.' }
          ].map(s => (
            <div key={s.step} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-[10px] font-bold">
                {s.step}
              </span>
              <span className="font-bold text-slate-200 block text-[11px]">{s.title}</span>
              <p className="text-slate-400 text-[10px] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200">
          <strong>Key Statistical Fact:</strong> Bagging works primarily by <strong>reducing variance</strong>. It does not reduce bias: if individual trees are systematically biased (e.g. all stumps that underfit), bagging them will not eliminate that bias!
        </div>
      </div>

      {/* ── Part 5: How Bagging Combines Predictions ────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Vote className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">How Bagging Combines Predictions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Regression Aggregation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">1. Regression: Arithmetic Average</span>
            <p className="text-slate-300">
              For continuous targets, the ensemble prediction is the sample mean of the <MathText text="$B$" /> tree outputs:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-cyan-300">
              <MathText text="$$\hat{f}_{\text{bag}}(x) = \frac{1}{B} \sum_{b=1}^B T_b(x)$$" displayMode={true} />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="font-medium text-slate-300">Live Regression Aggregator:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={t1}
                  onChange={(e) => setT1(parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
                />
                <input
                  type="number"
                  value={t2}
                  onChange={(e) => setT2(parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
                />
                <input
                  type="number"
                  value={t3}
                  onChange={(e) => setT3(parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
                />
                <input
                  type="number"
                  value={t4}
                  onChange={(e) => setT4(parseFloat(e.target.value) || 0)}
                  className="px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
                />
              </div>
              <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300 font-bold">
                Average Output: {regressionAvg.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Classification Aggregation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">2. Classification: Majority Vote</span>
            <p className="text-slate-300">
              For discrete classes, each tree casts a single categorical vote. The class with the highest total vote count wins:
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-emerald-300">
              <MathText text="$$\hat{C}_{\text{bag}}(x) = \operatorname*{argmax}_c \sum_{b=1}^B \mathbb{I}(T_b(x) = c)$$" displayMode={true} />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="font-medium text-slate-300">Live Multi-Class Vote Counter:</span>
              <div className="grid grid-cols-3 gap-2">
                <label className="space-y-1">
                  <span className="text-[10px] text-slate-400">Cat Votes:</span>
                  <input
                    type="number"
                    min="0"
                    value={catVotes}
                    onChange={(e) => setCatVotes(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-emerald-300"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[10px] text-slate-400">Dog Votes:</span>
                  <input
                    type="number"
                    min="0"
                    value={dogVotes}
                    onChange={(e) => setDogVotes(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-cyan-300"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[10px] text-slate-400">Rabbit Votes:</span>
                  <input
                    type="number"
                    min="0"
                    value={rabbitVotes}
                    onChange={(e) => setRabbitVotes(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-purple-300"
                  />
                </label>
              </div>

              <div className="p-2 bg-slate-900 rounded font-mono text-center text-emerald-300 font-bold">
                {voteResult.winner} wins with {voteResult.winnerPct.toFixed(1)}% of total votes!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 6: Random Forests ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <TreeDeciduous className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Random Forests: Breaking Tree Correlation</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A <strong>Random Forest</strong> (Leo Breiman, 2001) elevates bagging by adding a crucial second layer of randomness: <strong>random feature subsampling at every split</strong>.
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-emerald-300 text-sm">
          <MathText text="$$\text{Random Forest} = \text{Bagging (Bootstrap Rows)} + \text{Random Feature Subsampling (Columns)}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">The Correlation Bottleneck in Bagging</span>
            <p className="text-slate-300 leading-relaxed">
              If a dataset contains one overwhelmingly strong predictor (e.g. tumor size for cancer, or sq ft for home prices),
              <strong>almost every bagged tree will select that same feature for its root split</strong>.
              Consequently, all trees look very similar and their prediction errors become strongly correlated (<MathText text="$\rho$" /> is high).
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">How Random Forests Decorrelate Trees</span>
            <p className="text-slate-300 leading-relaxed">
              At each candidate split, the tree is only permitted to consider a randomly selected subset of <MathText text="$m$" /> features out of the total <MathText text="$p$" />:
              typically <MathText text="$m \approx \sqrt{p}$" /> for classification and <MathText text="$m \approx p/3$" /> for regression.
              This gives secondary features a fair chance to shine, creating truly diverse, uncorrelated trees!
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-cyan-300">Ensemble Algorithm</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-indigo-300">Bootstrap Observation Sampling?</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Random Feature Subsetting?</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-amber-300">Pairwise Tree Correlation (<MathText text="$\rho$" />)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 font-sans font-semibold text-slate-200">Standard Bagging</td>
                <td className="py-2 px-3 text-emerald-400 font-sans font-bold">Yes (N with replacement)</td>
                <td className="py-2 px-3 text-rose-400 font-sans font-bold">No (All p features available)</td>
                <td className="py-2 px-3 text-amber-400">High (Trees share dominant root splits)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-sans font-semibold text-emerald-300">Random Forest</td>
                <td className="py-2 px-3 text-emerald-400 font-sans font-bold">Yes (N with replacement)</td>
                <td className="py-2 px-3 text-emerald-400 font-sans font-bold">Yes (m &lt; p at each split)</td>
                <td className="py-2 px-3 text-emerald-400 font-bold">Low (Trees are deeply decorrelated)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Part 7: Complete Random-Forest Algorithm & Variance Law ─────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <BarChart2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete Random Forest Algorithm & The Variance Law</h3>
        </div>

        {/* 7-Step Algorithm */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">The 7-Step Random Forest Algorithm</span>
          <ol className="list-decimal pl-4 space-y-1 text-slate-300 text-[11px]">
            <li>For each tree <MathText text="$b = 1, \dots, B$" />, draw a bootstrap sample <MathText text="$D^{(b)}$" /> of size <MathText text="$N$" /> from the training data.</li>
            <li>Grow an unpruned tree on <MathText text="$D^{(b)}$" /> starting at the root node.</li>
            <li>At each node, randomly select a subset of <MathText text="$m$" /> features out of the total <MathText text="$p$" /> available features.</li>
            <li>Evaluate candidate split thresholds using <em>only</em> those <MathText text="$m$" /> selected features.</li>
            <li>Commit the split that maximizes impurity drop (classification) or minimizes child SSE (regression).</li>
            <li>Recursively split child nodes, drawing a <em>fresh random feature subset</em> at every single split.</li>
            <li>Grow trees to maximum depth (no pruning) and aggregate outputs via majority vote or sample mean.</li>
          </ol>
        </div>

        {/* Mathematical Variance Law */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
          <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">
            The Mathematical Law of Ensemble Variance
          </span>
          <p className="text-slate-300 leading-relaxed">
            Let <MathText text="$B$" /> identically distributed (but correlated) random variables have pairwise correlation <MathText text="$\rho$" /> and individual variance <MathText text="$\sigma^2$" />.
            The variance of their ensemble average is:
          </p>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-sm">
            <MathText text="$$\text{Var}(\bar{X}) = \rho \sigma^2 + \frac{1 - \rho}{B} \sigma^2$$" displayMode={true} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-[11px]">
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <strong className="text-amber-300 block">Term 1: <MathText text="$\rho \sigma^2$" /> (The Unbreakable Floor)</strong>
              As we add more trees (<MathText text="$B \to \infty$" />), the second term vanishes, leaving <MathText text="$\rho \sigma^2$" /> as the absolute variance floor.
              The only way to push ensemble variance lower is to reduce correlation <MathText text="$\rho$" />!
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800">
              <strong className="text-emerald-300 block">Term 2: <MathText text="$\frac{1-\rho}{B}\sigma^2$" /> (Diminishing Returns)</strong>
              Increasing the number of trees <MathText text="$B$" /> eliminates the independent portion of variance.
              Beyond 100-200 trees, variance reduction flattens out, meaning adding more trees does not overfit, but yields diminishing returns.
            </div>
          </div>
        </div>

        {/* Interactive Ensemble Variance & Decorrelation Explorer */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              Interactive Variance & Decorrelation Explorer
            </span>
            <span className="text-[10px] text-slate-400">Single Tree Variance σ² = 10.0</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Number of Trees (<MathText text="$B$" />):</span>
                <span className="font-mono text-purple-300 font-bold">{numTrees} trees</span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="5"
                value={numTrees}
                onChange={(e) => setNumTrees(parseInt(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-300 font-medium">Pairwise Tree Correlation (<MathText text="$\rho$" />):</span>
                <span className="font-mono text-cyan-300 font-bold">{rho.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                value={rho}
                onChange={(e) => setRho(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Total Ensemble Variance</span>
              <div className="text-xl font-bold text-emerald-300 mt-1">{ensembleVar.toFixed(3)}</div>
              <p className="text-[10px] font-sans text-slate-500 mt-0.5">Down from initial 10.000</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Variance Reduction</span>
              <div className="text-xl font-bold text-cyan-300 mt-1">-{varianceReductionPct.toFixed(1)}%</div>
              <p className="text-[10px] font-sans text-slate-500 mt-0.5">Relative to a single standalone tree</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[10px] font-sans uppercase font-bold text-slate-400 block">Asymptotic Floor (B → ∞)</span>
              <div className="text-xl font-bold text-purple-300 mt-1">{asymptoticVar.toFixed(3)}</div>
              <p className="text-[10px] font-sans text-slate-500 mt-0.5">Lowered exclusively by reducing ρ</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Final Recap Comparison Table ───────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          Final Recap: Bagging and Random Forests
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-sans font-semibold text-cyan-300">Ensemble Concept</th>
                <th className="py-2.5 px-3 font-sans font-semibold text-emerald-300">Core Definition & Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Ensemble Model</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Combines predictions from multiple individual models to improve accuracy and stabilize variance.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Bootstrap Sample</td>
                <td className="py-2 px-3 text-slate-300 font-sans">A sample of size N drawn with replacement from N training points (~63.2% unique, ~36.8% out-of-bag).</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Bagging</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Trains deep trees independently on bootstrap samples and aggregates via averaging (regression) or voting (classification).</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Random Forest</td>
                <td className="py-2 px-3 text-slate-300 font-sans">Bagging plus random feature subsampling (<MathText text="$m \approx \sqrt{p}$" />) at each split to break pairwise tree correlation.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-200 font-sans font-semibold">Variance Reduction Law</td>
                <td className="py-2 px-3 text-slate-300 font-sans"><MathText text="$\text{Var}(\bar{X}) = \rho \sigma^2 + \frac{1-\rho}{B}\sigma^2$" />. Reducing pairwise correlation <MathText text="$\rho$" /> lowers the asymptotic variance floor!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 text-center font-medium">
          Summary: Different bootstrap data + different feature subsets + many trees <ArrowRight className="w-3.5 h-3.5 inline mx-1" /> stable, low-variance consensus prediction!
        </div>
      </div>
    </div>
  );
};
