import React, { useState } from 'react';
import {
  GitFork,
  Activity,
  Sliders,
  CheckCircle2,
  Table,
  Layers,
  ArrowRight,
  TrendingDown,
  Info,
  RotateCcw,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module7GMMandEM: React.FC = () => {
  // Interactive 1: Query point for 1D GMM
  const [queryX, setQueryX] = useState<number>(120);

  // Interactive 2: Toggle between Initial and Updated EM parameters
  const [emIteration, setEmIteration] = useState<number>(0);

  // Parameters for Iteration 0 (Initial)
  const initialParams = {
    mu1: 100,
    sigma1: 10,
    phi1: 0.5,
    mu2: 150,
    sigma2: 10,
    phi2: 0.5
  };

  // Parameters for Iteration 1 (Updated after 1 full EM step)
  const updatedParams = {
    mu1: 109.61,
    sigma1: 10.00,
    phi1: 0.4811,
    mu2: 144.09,
    sigma2: 6.79,
    phi2: 0.5189
  };

  const activeParams = emIteration === 0 ? initialParams : updatedParams;

  // Gaussian 1D PDF helper
  const gaussianPdf = (x: number, mu: number, sigma: number) => {
    const factor = 1 / (sigma * Math.sqrt(2 * Math.PI));
    const exponent = -Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2));
    return factor * Math.exp(exponent);
  };

  // Live calculations for Interactive 1
  const dens1 = gaussianPdf(queryX, activeParams.mu1, activeParams.sigma1);
  const dens2 = gaussianPdf(queryX, activeParams.mu2, activeParams.sigma2);
  const contrib1 = activeParams.phi1 * dens1;
  const contrib2 = activeParams.phi2 * dens2;
  const totalDens = contrib1 + contrib2;
  const resp1 = totalDens > 0 ? contrib1 / totalDens : 0.5;
  const resp2 = totalDens > 0 ? contrib2 / totalDens : 0.5;

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── 1. Why GMM? ─────────────────────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <GitFork className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Why Gaussian Mixture Models?</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Standard K-Means forces <strong>hard, binary assignments</strong>: every observation is assigned 100% to exactly one cluster centroid, completely discarding uncertainty. Furthermore, K-Means inherently assumes isotropic (spherical) clusters with identical variances.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          A <strong>Gaussian Mixture Model (GMM)</strong> overcomes these limitations through two core advantages:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 1. Soft Probabilistic Membership
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instead of forcing a hard 0 or 1 decision, GMM assigns <strong>posterior responsibilities</strong>. For example, an observation lying between two groups can be recognized as 92.4% associated with Component 1 and 7.6% with Component 2.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> 2. Flexible Spread & Shape Modeling
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Each component models its own distinct center (mean <MathText text="$\mu_k$" />) and dispersion (variance <MathText text="$\sigma_k^2$" /> in 1D, or full covariance matrix <MathText text="$\Sigma_k$" /> in multi-D), allowing clusters to be narrow, wide, or tilted.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-amber-950/30 border border-amber-800/40 rounded-xl text-xs text-amber-300 space-y-1">
          <strong>Pedagogical Note:</strong> In the following step-by-step walkthrough, the initial parameter values (<MathText text="$\mu, \sigma, \phi$" />) are chosen as concrete pedagogical assumptions so you can trace the exact arithmetic. In real applications, EM initializes them and optimizes them automatically.
        </div>
      </section>

      {/* ── 2. The Latent Source Variable ───────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-400">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The Latent Component Variable</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In an unsupervised mixture setting, we observe data points <MathText text="$x$" />, but we do <strong>not</strong> observe which mixture component actually generated each point. We denote this hidden generator by the discrete latent variable <MathText text="$z$" />:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-sans">Observed Data</span>
            <span className="text-cyan-300 font-bold text-sm">x</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-sans">Component 1 Generated It</span>
            <span className="text-sky-300 font-bold text-sm">z = 1</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-sans">Component 2 Generated It</span>
            <span className="text-purple-300 font-bold text-sm">z = 2</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-indigo-300">Why Direct Maximum Likelihood Fails (Why We Need EM):</span>
          <p className="text-slate-300 leading-relaxed">
            The marginal probability of an observation <MathText text="$x$" /> is obtained by summing over all unobserved components:
          </p>
          <div className="font-mono text-center text-indigo-200 py-1 bg-slate-900 rounded border border-slate-800">
            <MathText text="$$p(x) = \sum_{k=1}^K p(z=k) p(x \mid z=k) = \sum_{k=1}^K \phi_k \mathcal{N}(x \mid \mu_k, \Sigma_k)$$" displayMode={true} />
          </div>
          <p className="text-slate-400 leading-relaxed">
            When we take the log-likelihood of the dataset <MathText text="$\sum_i \log \left(\sum_k \phi_k \mathcal{N}(x_i \mid \mu_k, \Sigma_k)\right)$" />, the summation inside the logarithm prevents setting the derivatives to zero to obtain closed-form solutions. The <strong>Expectation-Maximization (EM)</strong> algorithm decouples this problem into an elegant two-step iterative cycle:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-2">
            <li><strong>E-Step:</strong> Infer the soft posterior responsibilities <MathText text="$r_{ik} = P(z_i = k \mid x_i)$" /> using current parameters.</li>
            <li><strong>M-Step:</strong> Recompute the parameters (<MathText text="$\phi_k, \mu_k, \sigma_k^2$" />) using responsibility-weighted closed-form formulas.</li>
          </ol>
        </div>
      </section>

      {/* ── 3. Problem Setup & Initial Assumptions ──────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-emerald-400">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Table className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Worked Setup & Initial Assumptions</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Consider a one-dimensional dataset with four observations: <MathText text="$\mathcal{D} = \{100, 120, 140, 150\}$" /> and <MathText text="$K=2$" /> Gaussian components with initial parameters:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-sans">
                <th className="p-3">Parameter</th>
                <th className="p-3">Component 1 (<MathText text="$z=1$" />)</th>
                <th className="p-3">Component 2 (<MathText text="$z=2$" />)</th>
                <th className="p-3">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans text-slate-300">Mean Center</td>
                <td className="p-3 text-sky-400 font-bold">&mu;1 = 100</td>
                <td className="p-3 text-purple-400 font-bold">&mu;2 = 150</td>
                <td className="p-3 font-sans text-slate-400">Center location of the Gaussian bell curve</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans text-slate-300">Standard Deviation</td>
                <td className="p-3 text-sky-400 font-bold">&sigma;1 = 10</td>
                <td className="p-3 text-purple-400 font-bold">&sigma;2 = 10</td>
                <td className="p-3 font-sans text-slate-400">Spread of distribution (variance <MathText text="$\sigma^2 = 100$" />)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans text-slate-300">Mixture Weight (Prior)</td>
                <td className="p-3 text-sky-400 font-bold">&phi;1 = 0.50</td>
                <td className="p-3 text-purple-400 font-bold">&phi;2 = 0.50</td>
                <td className="p-3 font-sans text-slate-400">Prior probability that a random point comes from component <MathText text="$k$" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4 & 5. Gaussian Likelihood Walkthrough for x = 120 ────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-sky-400">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Gaussian Density & Detailed Calculation for x = 120</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The 1D univariate Gaussian probability density function measures how compatible an observation <MathText text="$x$" /> is with component <MathText text="$k$" />:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-sm">
          <MathText text="$$p(x \mid z=k) = \frac{1}{\sqrt{2\pi}\sigma_k} \exp\left(-\frac{(x - \mu_k)^2}{2\sigma_k^2}\right)$$" displayMode={true} />
          <span className="text-xs text-slate-400 font-sans block pt-1">
            For <MathText text="$\sigma = 10$" />, the leading normalizer is <MathText text="$\frac{1}{10\sqrt{2\pi}} \approx 0.039894$" />.
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Let's trace the exact arithmetic for query point <MathText text="$x = 120$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
            <span className="font-bold text-sky-400 text-sm font-sans block">Component 1 (&mu;1 = 100, &sigma;1 = 10)</span>
            <div className="space-y-1 text-slate-300">
              <div>Deviation: <MathText text="$120 - 100 = 20$" /></div>
              <div>Squared: <MathText text="$20^2 = 400$" /></div>
              <div>Denominator: <MathText text="$2(10^2) = 200$" /></div>
              <div>Exponent: <MathText text="$-\frac{400}{200} = -2.0$" /></div>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-sky-200">
              <MathText text="$$p(120 \mid z=1) = 0.039894 \times e^{-2} = 0.039894 \times 0.135335 \approx \mathbf{0.005399}$$" displayMode={true} />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-purple-900/50 space-y-2">
            <span className="font-bold text-purple-400 text-sm font-sans block">Component 2 (&mu;2 = 150, &sigma;2 = 10)</span>
            <div className="space-y-1 text-slate-300">
              <div>Deviation: <MathText text="$120 - 150 = -30$" /></div>
              <div>Squared: <MathText text="$(-30)^2 = 900$" /></div>
              <div>Denominator: <MathText text="$2(10^2) = 200$" /></div>
              <div>Exponent: <MathText text="$-\frac{900}{200} = -4.5$" /></div>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-purple-200">
              <MathText text="$$p(120 \mid z=2) = 0.039894 \times e^{-4.5} = 0.039894 \times 0.011109 \approx \mathbf{0.000443}$$" displayMode={true} />
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300">
          <strong>Geometric Intuition:</strong> Because <MathText text="$x = 120$" /> is 20 units away from <MathText text="$\mu_1 = 100$" /> but 30 units away from <MathText text="$\mu_2 = 150$" />, Component 1 gives it a likelihood that is over <strong>12 times larger</strong> (<MathText text="$0.005399$" /> vs. <MathText text="$0.000443$" />).
        </div>
      </section>

      {/* ── 6. E-Step: Responsibilities ─────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <ArrowRight className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The E-Step: Computing Soft Responsibilities</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Raw Gaussian likelihood densities are not percentages. To calculate posterior probabilities, we weight each density by its prior mixture weight <MathText text="$\phi_k$" /> and normalize:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 font-sans block text-sm">Weighted Component Contributions</span>
            <div className="space-y-1 text-slate-300">
              <div>Comp 1: <MathText text="$\phi_1 \times p(120 \mid z=1) = 0.5 \times 0.005399 = \mathbf{0.0026995}$" /></div>
              <div>Comp 2: <MathText text="$\phi_2 \times p(120 \mid z=2) = 0.5 \times 0.000443 = \mathbf{0.0002215}$" /></div>
            </div>
            <div className="pt-2 border-t border-slate-800 text-cyan-300">
              Total Evidence: <MathText text="$p(120) = 0.0026995 + 0.0002215 = \mathbf{0.002921}$" />
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 font-sans block text-sm">Posterior Responsibilities (<MathText text="$r_{ik}$" />)</span>
            <div className="space-y-1 text-slate-300">
              <div><MathText text="$$r_{i1} = \frac{0.0026995}{0.002921} \approx \mathbf{0.924} \; (92.4\%)$$" displayMode={true} /></div>
              <div><MathText text="$$r_{i2} = \frac{0.0002215}{0.002921} \approx \mathbf{0.076} \; (7.6\%)$$" displayMode={true} /></div>
            </div>
            <div className="pt-1 text-emerald-400 font-sans">
              Sum Check: <MathText text="$0.924 + 0.076 = 1.000$" /> (100% total soft assignment).
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Responsibilities Table for All 4 Points ──────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-400">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Table className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Complete E-Step Responsibilities for All Observations</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Repeating the identical E-step process for all four observations in <MathText text="$\mathcal{D} = \{100, 120, 140, 150\}$" /> yields:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-sans">
                <th className="p-3">Observation (<MathText text="$x_i$" />)</th>
                <th className="p-3">Comp 1 Responsibility (<MathText text="$r_{i1}$" />)</th>
                <th className="p-3">Comp 2 Responsibility (<MathText text="$r_{i2}$" />)</th>
                <th className="p-3">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-cyan-300">100</td>
                <td className="p-3 text-sky-400 font-bold">0.999996 (99.99%)</td>
                <td className="p-3 text-slate-400">0.000004 (0.01%)</td>
                <td className="p-3 font-sans text-slate-400">Coincides exactly with <MathText text="$\mu_1 = 100$" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-cyan-300">120</td>
                <td className="p-3 text-sky-400 font-bold">0.924000 (92.40%)</td>
                <td className="p-3 text-purple-400 font-bold">0.076000 (7.60%)</td>
                <td className="p-3 font-sans text-slate-400">Between centers, heavily skewed toward Comp 1</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-cyan-300">140</td>
                <td className="p-3 text-slate-400">0.000553 (0.06%)</td>
                <td className="p-3 text-purple-400 font-bold">0.999447 (99.94%)</td>
                <td className="p-3 font-sans text-slate-400">Close to <MathText text="$\mu_2 = 150$" />, Comp 2 dominates</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-bold text-cyan-300">150</td>
                <td className="p-3 text-slate-400">0.000004 (0.01%)</td>
                <td className="p-3 text-purple-400 font-bold">0.999996 (99.99%)</td>
                <td className="p-3 font-sans text-slate-400">Coincides exactly with <MathText text="$\mu_2 = 150$" /></td>
              </tr>
              <tr className="bg-slate-950 font-bold border-t border-slate-700">
                <td className="p-3 text-emerald-400 font-sans">Soft Count (<MathText text="$N_k = \sum_i r_{ik}$" />)</td>
                <td className="p-3 text-sky-300">N1 &approx; 1.924553</td>
                <td className="p-3 text-purple-300">N2 &approx; 2.075447</td>
                <td className="p-3 font-sans text-slate-300">Total: <MathText text="$N_1 + N_2 = 4.000$" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8, 9, 10. M-Step: Closed-Form Parameter Updates ─────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-rose-400">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <Sliders className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">The M-Step: Updating Weights, Means, and Variances</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Using the soft responsibility counts <MathText text="$N_1 \approx 1.9246$" /> and <MathText text="$N_2 \approx 2.0754$" />, the M-step maximizes the expected complete data log-likelihood in closed form:
        </p>

        {/* Mixture Weights */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-amber-300 text-sm font-sans block">1. Update Mixture Weights (&phi;k)</span>
          <p className="text-slate-300">
            Fraction of total data points effectively owned by each component:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
            <div className="p-2.5 rounded bg-slate-900 text-sky-300 border border-slate-800">
              <MathText text="$$\phi_1^{\text{new}} = \frac{N_1}{N} = \frac{1.924553}{4} \approx \mathbf{0.4811}$$" displayMode={true} />
            </div>
            <div className="p-2.5 rounded bg-slate-900 text-purple-300 border border-slate-800">
              <MathText text="$$\phi_2^{\text{new}} = \frac{N_2}{N} = \frac{2.075447}{4} \approx \mathbf{0.5189}$$" displayMode={true} />
            </div>
          </div>
        </div>

        {/* Means */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-sky-300 text-sm font-sans block">2. Update Means (&mu;k)</span>
          <p className="text-slate-300">
            Responsibility-weighted average of data point coordinates:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">Component 1:</span>
              <div className="text-[11px] text-slate-400">
                Numerator: <MathText text="$(1.0 \times 100) + (0.924 \times 120) + (0.0006 \times 140) + \dots = 210.9576$" />
              </div>
              <div className="text-sky-300 font-bold pt-1">
                <MathText text="$$\mu_1^{\text{new}} = \frac{210.957575}{1.924553} \approx \mathbf{109.61}$$" displayMode={true} />
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-purple-400 font-bold">Component 2:</span>
              <div className="text-[11px] text-slate-400">
                Numerator: <MathText text="$(0.000004 \times 100) + (0.076 \times 120) + (0.9994 \times 140) + \dots = 299.0424$" />
              </div>
              <div className="text-purple-300 font-bold pt-1">
                <MathText text="$$\mu_2^{\text{new}} = \frac{299.04235}{2.075447} \approx \mathbf{144.09}$$" displayMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Variances */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-emerald-300 text-sm font-sans block">3. Update Variances (&sigma;k&sup2;)</span>
          <p className="text-slate-300">
            Responsibility-weighted average squared deviation from the new means:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold">Component 1 (new &mu;1 = 109.61):</span>
              <div className="text-[11px] text-slate-400">
                Weighted sum: <MathText text="$92.425 + 99.674 + 0.511 + 0.006 = 192.616$" />
              </div>
              <div className="text-sky-300 font-bold pt-1">
                <MathText text="$$\sigma_1^{2(\text{new})} = \frac{192.616}{1.924553} \approx 100.08 \implies \sigma_1^{\text{new}} \approx \mathbf{10.00}$$" displayMode={true} />
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-purple-400 font-bold">Component 2 (new &mu;2 = 144.09):</span>
              <div className="text-[11px] text-slate-400">
                Weighted sum: <MathText text="$0.007 + 44.089 + 16.684 + 34.978 = 95.758$" />
              </div>
              <div className="text-purple-300 font-bold pt-1">
                <MathText text="$$\sigma_2^{2(\text{new})} = \frac{95.758}{2.075447} \approx 46.14 \implies \sigma_2^{\text{new}} \approx \mathbf{6.79}$$" displayMode={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Complete EM Iteration Summary Table ──────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-emerald-400">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Evolution of Parameters After One Full EM Step</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-sans">
                <th className="p-3">Parameter</th>
                <th className="p-3">Initial Comp 1</th>
                <th className="p-3">Updated Comp 1</th>
                <th className="p-3">Initial Comp 2</th>
                <th className="p-3">Updated Comp 2</th>
                <th className="p-3">Observed Shift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Weight &phi;</td>
                <td className="p-3 text-slate-400">0.5000</td>
                <td className="p-3 text-sky-400 font-bold">0.4811</td>
                <td className="p-3 text-slate-400">0.5000</td>
                <td className="p-3 text-purple-400 font-bold">0.5189</td>
                <td className="p-3 font-sans text-slate-400">Slightly more weight pulled to Comp 2</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Mean &mu;</td>
                <td className="p-3 text-slate-400">100.00</td>
                <td className="p-3 text-sky-400 font-bold">109.61</td>
                <td className="p-3 text-slate-400">150.00</td>
                <td className="p-3 text-purple-400 font-bold">144.09</td>
                <td className="p-3 font-sans text-emerald-400">Centers pulled inward toward points 120 &amp; 140</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Std Dev &sigma;</td>
                <td className="p-3 text-slate-400">10.00</td>
                <td className="p-3 text-sky-400 font-bold">10.00</td>
                <td className="p-3 text-slate-400">10.00</td>
                <td className="p-3 text-purple-400 font-bold">6.79</td>
                <td className="p-3 font-sans text-cyan-400">Comp 2 standard deviation tightened significantly!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          In subsequent iterations, EM feeds these updated parameters back into the E-step to re-estimate responsibilities, repeating until the parameters converge (change <MathText text="$< \epsilon$" />).
        </p>
      </section>

      {/* ── Interactive 1 & 2: Live GMM Explorer & EM Stepper ───────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-100">Interactive: GMM E-Step & EM Parameter Evolution</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setEmIteration(0)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                emIteration === 0 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Iteration 0 (Initial)
            </button>
            <button
              onClick={() => setEmIteration(1)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                emIteration === 1 ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Iteration 1 (Updated)
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Test any observation value <MathText text="$x$" /> under either the initial assumptions or the M-step updated parameters to see live Gaussian densities and soft posterior responsibilities:
        </p>

        {/* Input slider & preset pills */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Observation Location (<MathText text="$x$" />):</span>
            <span className="font-mono text-cyan-300 font-bold text-sm">{queryX.toFixed(1)}</span>
          </div>

          <input
            type="range"
            min="80"
            max="170"
            step="1"
            value={queryX}
            onChange={(e) => setQueryX(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">Dataset Presets:</span>
            {[100, 120, 140, 150].map((val) => (
              <button
                key={val}
                onClick={() => setQueryX(val)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                  queryX === val
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                x = {val}
              </button>
            ))}
          </div>
        </div>

        {/* Output metrics & Progress bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-400 font-sans text-sm">Component 1 (&mu; = {activeParams.mu1.toFixed(1)}, &sigma; = {activeParams.sigma1.toFixed(1)})</span>
              <span className="text-xs text-sky-300 font-bold">{(resp1 * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div style={{ width: `${resp1 * 100}%` }} className="bg-sky-500 h-full transition-all duration-300" />
            </div>
            <div className="pt-2 text-slate-400 space-y-0.5 text-[11px]">
              <div>Likelihood <MathText text="$p(x \mid z=1)$" />: <span className="text-slate-200">{dens1.toFixed(6)}</span></div>
              <div>Weighted Prior: <span className="text-slate-200">{contrib1.toFixed(7)}</span></div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-purple-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 font-sans text-sm">Component 2 (&mu; = {activeParams.mu2.toFixed(1)}, &sigma; = {activeParams.sigma2.toFixed(1)})</span>
              <span className="text-xs text-purple-300 font-bold">{(resp2 * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div style={{ width: `${resp2 * 100}%` }} className="bg-purple-500 h-full transition-all duration-300" />
            </div>
            <div className="pt-2 text-slate-400 space-y-0.5 text-[11px]">
              <div>Likelihood <MathText text="$p(x \mid z=2)$" />: <span className="text-slate-200">{dens2.toFixed(6)}</span></div>
              <div>Weighted Prior: <span className="text-slate-200">{contrib2.toFixed(7)}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. K-Means vs. GMM + EM ─────────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Table className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">K-Means vs. GMM + EM Comprehensive Comparison</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-sans">
                <th className="p-3">Dimension</th>
                <th className="p-3">K-Means</th>
                <th className="p-3">GMM + EM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Cluster Membership</td>
                <td className="p-3 text-rose-300 font-sans">Hard: binary 0 or 1 assignment</td>
                <td className="p-3 text-emerald-300 font-sans">Soft: continuous posterior probabilities <MathText text="$r_{ik} \in [0, 1]$" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">For Observation x = 120</td>
                <td className="p-3 text-slate-300 font-sans">Cluster 1: 100%, Cluster 2: 0%</td>
                <td className="p-3 text-cyan-300 font-sans">Component 1: 92.4%, Component 2: 7.6%</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Primary Core Calculation</td>
                <td className="p-3 text-slate-400 font-sans">Squared Euclidean distance to center <MathText text="$\|x - \mu_k\|^2$" /></td>
                <td className="p-3 text-slate-400 font-sans">Gaussian probability density likelihood <MathText text="$\mathcal{N}(x \mid \mu_k, \Sigma_k)$" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Cluster Spread &amp; Shape</td>
                <td className="p-3 text-amber-300 font-sans">No spread modeling; assumes spherical isotropic variance</td>
                <td className="p-3 text-emerald-300 font-sans">Models variance <MathText text="$\sigma_k^2$" /> or full covariance matrix <MathText text="$\Sigma_k$" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-slate-300">Handling Overlapping Clusters</td>
                <td className="p-3 text-rose-400 font-sans">Poor; draws arbitrary rigid voronoi boundaries</td>
                <td className="p-3 text-emerald-400 font-sans">Natural; models mixed probabilistic density overlaps</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
          <strong className="text-cyan-300">Core Intuitive Summary:</strong>
          <p className="text-slate-400 leading-relaxed">
            Where <strong>K-Means</strong> asks <em>"Which center is geographically closest?"</em>, <strong>GMM</strong> asks <em>"How responsible is each full probability distribution for generating this observation, considering its center of mass, dispersion/spread, and overall component population weight?"</em>
          </p>
        </div>
      </section>
    </div>
  );
};
