import React, { useState } from 'react';
import {
  Binary,
  Layers,
  Zap,
  Scale,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2KNNDistanceWeighted: React.FC = () => {
  const [metric, setMetric] = useState<'euclidean' | 'manhattan' | 'chebyshev'>('euclidean');
  const [useDistanceWeighting, setUseDistanceWeighting] = useState<boolean>(true);
  const [sigmaBandwidth, setSigmaBandwidth] = useState<number>(1.0);

  // Toy 3-nearest neighbors setup
  // Neighbor 1: dist=0.8, class=A
  // Neighbor 2: dist=2.4, class=B
  // Neighbor 3: dist=2.5, class=B
  const neighbors = [
    { id: 1, class: 'A', dist: 0.8 },
    { id: 2, class: 'B', dist: 2.4 },
    { id: 3, class: 'B', dist: 2.5 }
  ];

  // Standard unweighted vote: Class B wins (2 vs 1)
  const unweightedWinner = 'Class B (2 votes vs 1)';

  // Weighted calculation using Gaussian RBF: exp(-d^2 / (2 * sigma^2))
  const weightA = Math.exp(-Math.pow(0.8, 2) / (2 * Math.pow(sigmaBandwidth, 2)));
  const weightB = Math.exp(-Math.pow(2.4, 2) / (2 * Math.pow(sigmaBandwidth, 2))) +
                  Math.exp(-Math.pow(2.5, 2) / (2 * Math.pow(sigmaBandwidth, 2)));

  const weightedWinner = weightA > weightB
    ? `Class A (${weightA.toFixed(2)} vs ${weightB.toFixed(2)})`
    : `Class B (${weightB.toFixed(2)} vs ${weightA.toFixed(2)})`;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Metric Spaces & Formulas ───────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Binary className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Distance Metrics & Metric Spaces</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The definition of "nearness" is completely dictated by the choice of distance function <MathText text="$d(x, z)$" />. A valid metric must satisfy non-negativity, identity of indiscernibles, symmetry, and the triangle inequality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-400">Minkowski Distance (<MathText text="$L_p$" /> Norm)</span>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300">
              <MathText text="$$D_p(x, z) = \left( \sum_{j=1}^d |x_j - z_j|^p \right)^{1/p}$$" displayMode={true} />
            </div>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li><MathText text="$p=1$" />: Manhattan distance (<MathText text="$L_1$" /> norm, city block grid).</li>
              <li><MathText text="$p=2$" />: Euclidean distance (<MathText text="$L_2$" /> norm, straight-line distance).</li>
              <li><MathText text="$p \to \infty$" />: Chebyshev distance (<MathText text="$L_\infty = \max_j |x_j - z_j|$" />).</li>
            </ul>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-amber-400">Mahalanobis Distance</span>
            <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-amber-300">
              <MathText text="$$D_M(x, z) = \sqrt{(x - z)^T \Sigma^{-1} (x - z)}$$" displayMode={true} />
            </div>
            <ul className="text-slate-400 space-y-1 list-disc list-inside">
              <li>Normalizes coordinates by covariance matrix <MathText text="$\Sigma$" />.</li>
              <li>Inverts correlated axes to measure statistical distance.</li>
              <li>Reduces to standardized Euclidean when features are uncorrelated.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Feature Standardization ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why Feature Normalization Is Non-Negotiable</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Because Euclidean distance sums squared differences across all coordinates, any feature with a large numerical scale will completely dominate the distance computation, rendering all other features invisible.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-rose-300">Concrete Example: Income vs Age</span>
          <p className="text-slate-300 leading-relaxed">
            Consider Person A (Age = 25, Income = $80,000) and Person B (Age = 60, Income = $80,050):
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-rose-300 text-xs">
            <MathText text="$$d(A, B) = \sqrt{(25 - 60)^2 + (80000 - 80050)^2} = \sqrt{1225 + 2500} \approx 61.03$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            A 35-year age gap (a huge demographic difference) contributes only 1,225 to the squared sum, while a trivial $50 salary difference contributes 2,500. Standardizing features to zero mean and unit variance (<MathText text="$z = (x - \mu)/\sigma$" />) solves this completely.
          </p>
        </div>
      </div>

      {/* ── Distance-Weighted KNN ───────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Distance-Weighted Voting & Regression</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Standard KNN gives equal weight to all <MathText text="$K$" /> neighbors regardless of how far away they are. <strong>Weighted KNN</strong> assigns higher weight to closer neighbors using a decaying weight function <MathText text="$w_i = W(d(x, x^{(i)}))$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-cyan-300">
            <span className="text-slate-400 font-sans block mb-1">Inverse Distance Weighting:</span>
            <MathText text="$$w_i = \frac{1}{d(x, x^{(i)}) + \epsilon}$$" displayMode={true} />
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-purple-300">
            <span className="text-slate-400 font-sans block mb-1">Gaussian Kernel Weighting:</span>
            <MathText text="$$w_i = \exp\left( -\frac{d(x, x^{(i)})^2}{2 \sigma^2} \right)$$" displayMode={true} />
          </div>
        </div>
      </div>

      {/* ── Interactive: Unweighted vs Weighted Voting Comparison ───────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Unweighted vs Weighted Vote</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Bandwidth <MathText text="$\sigma$" /> = {sigmaBandwidth}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose a query has 3 neighbors: <strong>Neighbor 1 (Class A)</strong> at distance <MathText text="$d=0.8$" />, and <strong>Neighbors 2 & 3 (Class B)</strong> at distance <MathText text="$d=2.4$" /> and <MathText text="$d=2.5$" />.
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Gaussian Kernel Bandwidth (<MathText text="$\sigma$" />):</span>
            <span className="font-mono text-emerald-300 font-bold">{sigmaBandwidth}</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="3.0"
            step="0.1"
            value={sigmaBandwidth}
            onChange={(e) => setSigmaBandwidth(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Standard Uniform KNN:</span>
            <div className="text-sm font-bold text-cyan-300">{unweightedWinner}</div>
            <p className="text-[11px] text-slate-500">
              Class B wins 2 to 1 because distance differences are ignored.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Gaussian Weighted KNN:</span>
            <div className="text-sm font-bold text-emerald-300">{weightedWinner}</div>
            <p className="text-[11px] text-slate-500">
              Closer neighbor A dominates because distant neighbors receive exponentially attenuated weights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
