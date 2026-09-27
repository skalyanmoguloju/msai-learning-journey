import React, { useState } from 'react';
import {
  BarChart2,
  Activity,
  Zap,
  TrendingDown,
  RotateCcw,
  Play,
  CheckCircle2
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module6KMeansClustering: React.FC = () => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [kChoice, setKChoice] = useState<number>(3);

  // Simulated inertia progression over Lloyd iterations
  const inertiaHistory = [1850, 920, 540, 390, 385, 385];
  const currentInertia = inertiaHistory[Math.min(stepIndex, inertiaHistory.length - 1)];

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Unsupervised Objective Formulation ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <BarChart2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">K-Means Clustering & Objective Function</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In unsupervised learning, we are given unlabeled instances <MathText text="$\mathcal{D} = \{x^{(1)}, \dots, x^{(N)}\}$" /> and seek to partition them into <MathText text="$K$" /> cohesive clusters. K-Means formulates this as minimizing the <strong>within-cluster sum of squares (WCSS)</strong>, or <em>inertia</em>:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$J(c, \mu) = \sum_{i=1}^N \|x^{(i)} - \mu_{c^{(i)}}\|^2$$" displayMode={true} />
          <span className="text-[11px] text-slate-400 font-sans block pt-1">
            Where <MathText text="$c^{(i)} \in \{1, \dots, K\}$" /> is the cluster index assigned to point <MathText text="$x^{(i)}$" />, and <MathText text="$\mu_k$" /> is the centroid of cluster <MathText text="$k$" />.
          </span>
        </div>
      </div>

      {/* ── Lloyd’s Algorithm: Alternating Optimization ────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Lloyd’s Algorithm (Coordinate Descent)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Minimizing <MathText text="$J(c, \mu)$" /> jointly is NP-hard. Lloyd's algorithm alternates between minimizing <MathText text="$J$" /> with respect to cluster assignments <MathText text="$c$" /> and with respect to centroids <MathText text="$\mu$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-400">Step 1: Assignment Step</span>
            <p className="text-slate-300">
              Hold centroids <MathText text="$\mu_k$" /> fixed. Assign each point <MathText text="$x^{(i)}$" /> to its nearest centroid:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono">
              <MathText text="$$c^{(i)} \leftarrow \arg\min_{k \in \{1, \dots, K\}} \|x^{(i)} - \mu_k\|^2$$" displayMode={true} />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-indigo-400">Step 2: Update Step</span>
            <p className="text-slate-300">
              Hold assignments <MathText text="$c^{(i)}$" /> fixed. Recompute centroids as cluster centers of mass:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-indigo-300 font-mono">
              <MathText text="$$\mu_k \leftarrow \frac{\sum_{i=1}^N \mathbb{I}(c^{(i)} = k) x^{(i)}}{\sum_{i=1}^N \mathbb{I}(c^{(i)} = k)}$$" displayMode={true} />
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1.5 text-slate-300">
          <strong className="text-amber-300">Convergence Guarantee:</strong> Because each alternating step strictly decreases or maintains <MathText text="$J(c, \mu)$" />, and there are only finitely many (<MathText text="$K^N$" />) possible cluster partitions, Lloyd’s algorithm is guaranteed to converge in a finite number of iterations to a local minimum.
        </div>
      </div>

      {/* ── K-Means++ Seeding ───────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">K-Means++ Smart Initialization</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Standard random initialization frequently traps K-Means in catastrophic local minima. <strong>K-Means++</strong> (Arthur & Vassilvitskii, 2007) seeds centroids probabilistically spread across the space:
        </p>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-indigo-300">
          <MathText text="$$P(x \text{ is chosen as next centroid}) = \frac{D(x)^2}{\sum_{x'} D(x')^2}$$" displayMode={true} />
          <span className="text-[11px] text-slate-400 font-sans block pt-1">
            Where <MathText text="$D(x)$" /> is the shortest distance from point <MathText text="$x$" /> to any already selected centroid.
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Guarantees an <MathText text="$\mathcal{O}(\log K)$" /> competitive approximation bound against the global optimum.
        </p>
      </div>

      {/* ── Interactive: Lloyd Iteration & Inertia Descent ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <TrendingDown className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Lloyd Alternating Descent</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Iteration: {stepIndex}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Step through the alternating iterations of Lloyd's algorithm to witness the strict monotonic decline of cluster inertia <MathText text="$J$" />:
        </p>

        <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setStepIndex((prev) => Math.min(prev + 1, inertiaHistory.length - 1))}
            disabled={stepIndex >= inertiaHistory.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5" /> Next Lloyd Step
          </button>

          <button
            onClick={() => setStepIndex(0)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Centroids
          </button>

          <div className="ml-auto font-mono text-xs">
            Current Inertia: <span className="text-emerald-400 font-bold">{currentInertia}</span>
            {stepIndex >= 4 && <span className="ml-2 text-cyan-300 font-sans text-[11px]">(Converged!)</span>}
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
          <div className="flex items-end gap-2 h-20 pt-2">
            {inertiaHistory.map((val, idx) => {
              const heightPercent = Math.max(15, (val / inertiaHistory[0]) * 100);
              const isActive = idx === stepIndex;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t transition-all ${
                      isActive ? 'bg-cyan-400' : 'bg-slate-700'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-slate-400">t={idx}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
