import React, { useState } from 'react';
import {
  GitFork,
  Activity,
  Zap,
  Sliders,
  CheckCircle2,
  Table
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module7GMMandEM: React.FC = () => {
  const [pointX, setPointX] = useState<number>(1.2);
  const [mu1, setMu1] = useState<number>(0.0);
  const [sigma1, setSigma1] = useState<number>(1.0);
  const [mu2, setMu2] = useState<number>(2.5);
  const [sigma2, setSigma2] = useState<number>(1.2);
  const [pi1, setPi1] = useState<number>(0.5);

  // Gaussian 1D density
  const normPdf = (x: number, mu: number, sigma: number) => {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)));
  };

  const p1 = normPdf(pointX, mu1, sigma1);
  const p2 = normPdf(pointX, mu2, sigma2);
  const pi2 = 1 - pi1;

  const joint1 = pi1 * p1;
  const joint2 = pi2 * p2;
  const totalDensity = joint1 + joint2;

  const gamma1 = totalDensity > 0 ? joint1 / totalDensity : 0.5;
  const gamma2 = totalDensity > 0 ? joint2 / totalDensity : 0.5;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Model Definition ───────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <GitFork className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Gaussian Mixture Models (GMM)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          K-Means forces hard, spherical cluster boundaries. <strong>Gaussian Mixture Models</strong> generalize clustering by treating clusters as flexible, overlapping multivariate Gaussians with arbitrary covariance shapes:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$p(x) = \sum_{k=1}^K \pi_k \mathcal{N}(x \mid \mu_k, \Sigma_k), \quad \text{where } \sum_{k=1}^K \pi_k = 1, \; \pi_k \ge 0$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Here <MathText text="$\pi_k = P(z = k)$" /> represents the prior mixture weight of component <MathText text="$k$" />. Because the latent cluster identity <MathText text="$z$" /> is unobserved, maximizing log-likelihood directly contains a <em>sum inside the logarithm</em> (<MathText text="$\sum_i \log \sum_k$" />), preventing closed-form solutions.
        </p>
      </div>

      {/* ── Expectation-Maximization Algorithm ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Expectation-Maximization (EM) Algorithm</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The EM algorithm solves this latent variable problem by alternating between computing posterior probabilities (responsibilities) and updating model parameters:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-400">1. E-Step (Expectation / Responsibilities)</span>
            <p className="text-slate-300">
              Calculate the posterior probability <MathText text="$\gamma_{ik}$" /> that point <MathText text="$x_i$" /> belongs to component <MathText text="$k$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono">
              <MathText text="$$\gamma_{ik} = P(z_i = k \mid x_i) = \frac{\pi_k \mathcal{N}(x_i \mid \mu_k, \Sigma_k)}{\sum_{j=1}^K \pi_j \mathcal{N}(x_i \mid \mu_j, \Sigma_j)}$$" displayMode={true} />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-indigo-400">2. M-Step (Maximization / Parameter Updates)</span>
            <p className="text-slate-300">
              Update parameters in closed-form using effective cluster sample size <MathText text="$N_k = \sum_{i=1}^N \gamma_{ik}$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-indigo-300 font-mono space-y-1">
              <MathText text="$$\mu_k^{\text{new}} = \frac{1}{N_k} \sum_{i=1}^N \gamma_{ik} x_i, \quad \pi_k^{\text{new}} = \frac{N_k}{N}$$" displayMode={true} />
              <MathText text="$$\Sigma_k^{\text{new}} = \frac{1}{N_k} \sum_{i=1}^N \gamma_{ik} (x_i - \mu_k)(x_i - \mu_k)^T$$" displayMode={true} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive: Soft Responsibilities Calculator ──────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Soft Cluster Responsibility</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Query Point x = {pointX.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Move the query point <MathText text="$x$" /> between Component 1 (<MathText text="$\mu_1 = 0.0$" />) and Component 2 (<MathText text="$\mu_2 = 2.5$" />) to observe soft probabilistic responsibilities:
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Observation Location (<MathText text="$x$" />):</span>
            <span className="font-mono text-cyan-300 font-bold">{pointX.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="-1.5"
            max="4.0"
            step="0.05"
            value={pointX}
            onChange={(e) => setPointX(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Responsibility <MathText text="$\gamma_{i1}$" /> (Comp 1)</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{(gamma1 * 100).toFixed(1)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${gamma1 * 100}%` }} className="bg-cyan-500 h-full" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Responsibility <MathText text="$\gamma_{i2}$" /> (Comp 2)</span>
            <span className="text-lg font-bold font-mono text-purple-400">{(gamma2 * 100).toFixed(1)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${gamma2 * 100}%` }} className="bg-purple-500 h-full" />
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <strong>Key Insight:</strong> Unlike K-Means which assigns 100% membership to one cluster, GMM captures ambiguity in overlap zones (e.g. 50%/50% membership) while simultaneously modeling component variances and covariances.
        </div>
      </div>
    </div>
  );
};
