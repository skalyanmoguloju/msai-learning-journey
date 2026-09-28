import React, { useState } from 'react';
import {
  Cpu,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  Sliders,
  Table,
  BarChart2,
  Maximize2,
  GitBranch
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module8JensensELBO: React.FC = () => {
  // Interactive 1: Jensen Inequality Demo
  const [valA, setValA] = useState<number>(2.0);
  const [valB, setValB] = useState<number>(8.0);
  const [weightQ1, setWeightQ1] = useState<number>(0.5);

  const weightQ2 = 1 - weightQ1;
  const weightedAvg = weightQ1 * valA + weightQ2 * valB;
  const logOfAvg = Math.log(weightedAvg);
  const avgOfLogs = weightQ1 * Math.log(valA) + weightQ2 * Math.log(valB);
  const jensenGap = logOfAvg - avgOfLogs;

  // Interactive 2: ELBO & KL Decomposition for x = 120
  // True values from Module 7: p(120) = 0.002921 => log p(120) = log(0.002921) ≈ -5.8357 nats
  // True posterior: p(z=1 | 120) = 0.924, p(z=2 | 120) = 0.076
  const trueLogLikelihood = Math.log(0.002921); // ≈ -5.8357
  const truePost1 = 0.924;
  const truePost2 = 0.076;

  const [q1, setQ1] = useState<number>(0.5); // User's variational belief for component 1
  const q2 = 1 - q1;

  // KL Divergence: D_KL(q || p) = q1 * log(q1 / p1) + q2 * log(q2 / p2)
  const klDivergence =
    q1 > 0 && q2 > 0
      ? q1 * Math.log(q1 / truePost1) + q2 * Math.log(q2 / truePost2)
      : 0;

  // ELBO = log p(x) - D_KL(q || p)
  const currentELBO = trueLogLikelihood - klDivergence;

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* ── 1. Why a Lower Bound is Needed ──────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Why a Lower Bound is Needed</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In a Gaussian Mixture Model, the marginal probability of observing a data point <MathText text="$x$" /> is computed by summing the contributions across all <MathText text="$K$" /> mixture components:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-sm">
          <MathText text="$$p(x) = \sum_{k=1}^K \phi_k p(x \mid z=k)$$" displayMode={true} />
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          For a two-component model, this marginal density is <MathText text="$p(x) = \phi_1 p(x \mid z=1) + \phi_2 p(x \mid z=2)$" />. When we compute the log-likelihood of this observation, we encounter:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-rose-300 text-sm">
          <MathText text="$$\log p(x) = \log\left[ \phi_1 p(x \mid z=1) + \phi_2 p(x \mid z=2) \right]$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> The Fundamental Mathematical Obstacle: The Logarithm of a Sum
          </span>
          <p className="text-slate-300 leading-relaxed">
            In standard maximum likelihood estimation, logarithms simplify calculations because the log of a product splits cleanly into a sum: <MathText text="$\log(ab) = \log a + \log b$" />. However, <strong>there is no algebraic identity to split the logarithm of a sum: <MathText text="$\log(a + b)$" /></strong>!
          </p>
          <p className="text-slate-400 leading-relaxed">
            Because the hidden component identity <MathText text="$z$" /> is trapped inside the summation, taking derivatives with respect to parameters (<MathText text="$\phi_k, \mu_k, \Sigma_k$" />) couples all parameters together, preventing closed-form solutions.
          </p>
          <div className="pt-2 text-emerald-300 font-semibold">
            &rarr; The Strategy: Construct a tractable, easily factorized lower bound that is always less than or equal to <MathText text="$\log p(x)$" />—the Evidence Lower Bound (ELBO)—and maximize that bound instead!
          </div>
        </div>
      </section>

      {/* ── 2. Jensen's Inequality ──────────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Jensen's Inequality & Concavity</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A function <MathText text="$f(t)$" /> is <strong>concave</strong> if any secant line segment connecting two points on its curve lies on or below the graph. Because the second derivative of the natural logarithm is strictly negative for all <MathText text="$t > 0$" /> (<MathText text="$f''(t) = -1/t^2 < 0$" />), the logarithmic function is strictly concave.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          For any two values <MathText text="$a, b > 0$" /> with equal weights (<MathText text="$q_1 = q_2 = 1/2$" />), <strong>Jensen's inequality</strong> states:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-amber-300 text-sm">
          <MathText text="$$\log\left(\frac{a + b}{2}\right) \ge \frac{\log(a) + \log(b)}{2}$$" displayMode={true} />
          <span className="text-xs text-slate-400 font-sans block pt-1">
            "The log of the average is always greater than or equal to the average of the logs."
          </span>
        </div>

        {/* Concrete Numerical Example */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 font-sans block text-sm">Left Side: Log of the Average (a=2, b=8)</span>
            <div className="space-y-1 text-slate-300">
              <div>Average: <MathText text="$(2 + 8) / 2 = 5$" /></div>
              <div className="text-cyan-300 font-bold pt-1">
                <MathText text="$$\log(5) \approx \mathbf{1.6094}$$" displayMode={true} />
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 font-sans block text-sm">Right Side: Average of the Logs (a=2, b=8)</span>
            <div className="space-y-1 text-slate-300">
              <div>Logs: <MathText text="$\log(2) \approx 0.6931, \; \log(8) \approx 2.0794$" /></div>
              <div className="text-amber-300 font-bold pt-1">
                <MathText text="$$\frac{0.6931 + 2.0794}{2} \approx \mathbf{1.3863}$$" displayMode={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300">
          <strong>Direct Verification:</strong> <MathText text="$1.6094 \ge 1.3863$" />. The inequality holds with a positive gap of <MathText text="$+0.2231$" />!
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The general weighted form of Jensen's inequality for arbitrary positive weights <MathText text="$q_k \ge 0$" /> such that <MathText text="$\sum_k q_k = 1$" /> is:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-emerald-300 text-sm">
          <MathText text="$$\log\left( \sum_{k=1}^K q_k y_k \right) \ge \sum_{k=1}^K q_k \log(y_k)$$" displayMode={true} />
        </div>
      </section>

      {/* ── Interactive 1: Jensen Inequality Live Calculator ────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-100">Interactive: Jensen's Inequality Concavity Visualizer</h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
            Jensen Gap &Delta; = {jensenGap.toFixed(4)} &ge; 0
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Adjust values <MathText text="$a$" /> and <MathText text="$b$" /> and the mixing weight <MathText text="$q_1$" /> to observe that <MathText text="$\log(\text{Weighted Avg})$" /> is strictly greater than or equal to <MathText text="$\text{Weighted Avg of Logs}$" />:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Value a:</span>
                <span className="font-mono text-cyan-300 font-bold">{valA.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12.0"
                step="0.5"
                value={valA}
                onChange={(e) => setValA(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Value b:</span>
                <span className="font-mono text-purple-300 font-bold">{valB.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12.0"
                step="0.5"
                value={valB}
                onChange={(e) => setValB(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Weight q1:</span>
                <span className="font-mono text-emerald-300 font-bold">{weightQ1.toFixed(2)} (q2 = {weightQ2.toFixed(2)})</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.95"
                step="0.05"
                value={weightQ1}
                onChange={(e) => setWeightQ1(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono pt-2">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px] font-sans">Log of Weighted Average:</span>
              <div className="text-cyan-300 text-sm font-bold">
                <MathText text={`$\\log(${weightedAvg.toFixed(3)}) = ${logOfAvg.toFixed(4)}$`} />
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px] font-sans">Weighted Average of Logs:</span>
              <div className="text-purple-300 text-sm font-bold">
                <MathText text={`$${weightQ1.toFixed(2)}\\log(${valA.toFixed(1)}) + ${weightQ2.toFixed(2)}\\log(${valB.toFixed(1)}) = ${avgOfLogs.toFixed(4)}$`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 & 4. Applying Jensen to GMM & Deriving ELBO ────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-400">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <GitBranch className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Applying Jensen to GMM & Deriving the ELBO</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          To apply Jensen's inequality to the intractable mixture log-likelihood, we introduce an arbitrary probability distribution <MathText text="$q(z=k)$" /> representing our subjective belief about which component generated observation <MathText text="$x$" />:
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-slate-400 font-sans block text-[11px]">Step 1: Importance Weighting Identity (Multiply and Divide by q)</span>
            <div className="text-slate-200">
              <MathText text="$$p(x) = \sum_{k=1}^K q(z=k) \left[ \frac{\phi_k p(x \mid z=k)}{q(z=k)} \right]$$" displayMode={true} />
            </div>
            <span className="text-slate-500 text-[10px] font-sans block">Valid because <MathText text="$\frac{q(z=k)}{q(z=k)} = 1$" />.</span>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <span className="text-slate-400 font-sans block text-[11px]">Step 2: Apply Jensen's Inequality with weights <MathText text="$q(z=k)$" /></span>
            <div className="text-emerald-300">
              <MathText text="$$\log p(x) \ge \sum_{k=1}^K q(z=k) \log\left[ \frac{\phi_k p(x \mid z=k)}{q(z=k)} \right] \triangleq \mathcal{L}(q, \theta)$$" displayMode={true} />
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The right-hand side is denoted <MathText text="$\mathcal{L}(q, \theta)$" />: the <strong>Evidence Lower Bound (ELBO)</strong>. Expanding the logarithm reveals three clear constituent terms:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$\mathcal{L}(q, \theta) = \sum_{k=1}^K q(z=k) \log \phi_k + \sum_{k=1}^K q(z=k) \log p(x \mid z=k) - \sum_{k=1}^K q(z=k) \log q(z=k)$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-cyan-400 font-bold block text-sm">&sum; q log &phi;k</span>
            <p className="text-slate-400 leading-relaxed">
              <strong>Prior Compatibility:</strong> Rewards mixture components with higher plausible baseline prior probabilities.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-emerald-400 font-bold block text-sm">&sum; q log p(x|z)</span>
            <p className="text-slate-400 leading-relaxed">
              <strong>Data Fit:</strong> Rewards component distributions whose mean and spread accurately describe the observed data point <MathText text="$x$" />.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-mono text-purple-400 font-bold block text-sm">&minus;&sum; q log q</span>
            <p className="text-slate-400 leading-relaxed">
              <strong>Variational Entropy <MathText text="$H(q)$" />:</strong> Encourages soft uncertainty in assignment, preventing premature collapse.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. KL Divergence and the ELBO Gap ───────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-purple-400">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Kullback-Leibler (KL) Divergence and the Gap</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          How much smaller is the ELBO than the true log-likelihood? The mathematical gap between <MathText text="$\log p(x)$" /> and <MathText text="$\mathcal{L}(q, \theta)$" /> is exactly the <strong>Kullback-Leibler (KL) divergence</strong> between the distribution <MathText text="$q(z)$" /> and the true posterior <MathText text="$p(z \mid x, \theta)$" />:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-purple-300 text-sm">
          <MathText text="$$D_{\text{KL}}(q \parallel p) = \sum_{k=1}^K q(z=k) \log\left[ \frac{q(z=k)}{p(z=k \mid x, \theta)} \right]$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-bold text-emerald-300 text-sm">The Fundamental Master Decomposition:</span>
          <div className="bg-slate-900 p-3 rounded-lg text-center font-mono text-emerald-400 text-sm border border-slate-800">
            <MathText text="$$\log p(x) = \mathcal{L}(q, \theta) + D_{\text{KL}}(q(z) \parallel p(z \mid x, \theta))$$" displayMode={true} />
          </div>
          <p className="text-slate-300 text-center font-sans font-medium pt-1">
            <strong className="text-cyan-300">True Log-Likelihood</strong> = <strong className="text-emerald-300">ELBO</strong> + <strong className="text-purple-300">Non-negative KL Gap</strong>
          </p>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2 text-slate-300">
          <strong className="text-cyan-300">Concrete Example from Module 7 (<MathText text="$x = 120$" />):</strong>
          <p>
            In Module 7, the true posterior responsibilities were computed as:
          </p>
          <div className="font-mono text-cyan-200 pl-2">
            <MathText text="$$p(z=1 \mid x=120) = 0.924, \qquad p(z=2 \mid x=120) = 0.076$$" displayMode={true} />
          </div>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
            <li>
              If we choose our variational belief to exactly match: <MathText text="$q = [0.924, 0.076]$" />, then <MathText text="$\frac{q_k}{p_k} = 1 \implies \log(1) = 0$" />, so <MathText text="$D_{\text{KL}} = \mathbf{0.000}$" />. The gap disappears, and the ELBO touches the true log-evidence!
            </li>
            <li>
              If we choose an arbitrary guess like <MathText text="$q = [0.5, 0.5]$" />, then <MathText text="$D_{\text{KL}} > 0$" />, meaning the ELBO is strictly lower than the true log-likelihood.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Interactive 2: ELBO & KL Gap Explorer ───────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-bold text-slate-100">Interactive: ELBO & KL Divergence Decomposition</h2>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            True &log; p(120) = {trueLogLikelihood.toFixed(4)}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Slide your variational belief <MathText text="$q(z=1)$" /> to see how setting <MathText text="$q$" /> equal to the true posterior (<MathText text="$0.924$" />) eliminates the KL gap and makes the ELBO tight:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Variational Component 1 Belief <MathText text="$q(z=1)$" />:</span>
              <span className="font-mono text-cyan-300 font-bold text-sm">{q1.toFixed(3)} (q2 = {q2.toFixed(3)})</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.01"
              value={q1}
              onChange={(e) => setQ1(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>q1 = 0.05 (Far from posterior)</span>
              <button
                onClick={() => setQ1(0.924)}
                className="text-emerald-400 hover:underline font-mono"
              >
                Set q1 = 0.924 (Optimal E-step)
              </button>
              <span>q1 = 0.95</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center font-mono">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans mb-1">Evidence Lower Bound (ELBO)</span>
              <span className="text-lg font-bold text-emerald-400">{currentELBO.toFixed(4)}</span>
              <span className="text-[10px] text-slate-500 block pt-1 font-sans">
                {klDivergence < 0.001 ? '★ Exact match to log p(x)!' : 'Lower than log p(x)'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[11px] font-sans mb-1">KL Divergence Gap <MathText text="$D_{\text{KL}}$" /></span>
              <span className="text-lg font-bold text-purple-400">{klDivergence.toFixed(4)}</span>
              <span className="text-[10px] text-slate-500 block pt-1 font-sans">
                {klDivergence < 0.001 ? 'Zero gap (Tight Bound)' : 'Non-negative penalty'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. How EM Uses the ELBO ─────────────────────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-emerald-400">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Maximize2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">How EM Exploits the ELBO (Coordinate Ascent)</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The Expectation-Maximization algorithm is coordinate ascent on the joint objective <MathText text="$\mathcal{L}(q, \theta)$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl border border-sky-900/50 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">1</span>
              The E-Step: Tighten the Bound
            </div>
            <p className="text-slate-300 leading-relaxed">
              Hold the parameters <MathText text="$\theta$" /> fixed. Update the distribution <MathText text="$q$" /> by setting it equal to the true posterior responsibilities:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-sky-300 font-mono">
              <MathText text="$$q(z=k) \leftarrow p(z=k \mid x, \theta) = \frac{\phi_k p(x \mid z=k)}{\sum_j \phi_j p(x \mid z=j)}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Because <MathText text="$q = p$" />, the KL divergence becomes zero: <MathText text="$D_{\text{KL}} = 0$" />. The ELBO rises until it touches the true log-likelihood function.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/50 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">2</span>
              The M-Step: Maximize the Bound
            </div>
            <p className="text-slate-300 leading-relaxed">
              Hold the responsibilities <MathText text="$q$" /> fixed. Maximize <MathText text="$\mathcal{L}(q, \theta)$" /> with respect to model parameters <MathText text="$\theta = \{\phi_k, \mu_k, \Sigma_k\}$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono space-y-1">
              <div><MathText text="$$\phi_k \leftarrow \frac{N_k}{N}, \qquad \mu_k \leftarrow \frac{\sum_i q_i(k) x_i}{N_k}$$" displayMode={true} /></div>
              <div><MathText text="$$\Sigma_k \leftarrow \frac{\sum_i q_i(k) (x_i - \mu_k)(x_i - \mu_k)^T}{N_k}$$" displayMode={true} /></div>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Where <MathText text="$N_k = \sum_i q_i(z=k)$" /> are the soft responsibility counts.
            </p>
          </div>
        </div>

        <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            <strong>Monotonic Ascent Guarantee:</strong> Because <MathText text="$\log p(X \mid \theta^{(t+1)}) \ge \mathcal{L}(q^{(t+1)}, \theta^{(t+1)}) \ge \mathcal{L}(q^{(t+1)}, \theta^{(t)}) = \log p(X \mid \theta^{(t)})$" />, the true marginal data log-likelihood can <em>never decrease</em> from one EM iteration to the next!
          </span>
        </div>
      </section>

      {/* ── 7. Mixture Extensions: Multi-D & Covariance Choices ──────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-cyan-400">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Mixture Extensions: Multi-D & Covariance Structures</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The 1D principles generalize immediately to arbitrary <MathText text="$K$" /> components and <MathText text="$d$" />-dimensional feature vectors:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-300 font-sans block text-sm">Arbitrary K Components</span>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200">
              <MathText text="$$p(x) = \sum_{k=1}^K \phi_k \mathcal{N}(x \mid \mu_k, \Sigma_k), \quad \sum_{k=1}^K \phi_k = 1$$" displayMode={true} />
            </div>
            <p className="text-slate-400 font-sans text-[11px]">
              Weights <MathText text="$\phi_k$" /> lie on the probability simplex.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-indigo-300 font-sans block text-sm">Multivariate Gaussian Density</span>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200">
              <MathText text="$$\mathcal{N}(x \mid \mu_k, \Sigma_k) = \frac{\exp\left(-\frac{1}{2}(x - \mu_k)^T \Sigma_k^{-1} (x - \mu_k)\right)}{(2\pi)^{d/2} |\Sigma_k|^{1/2}}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 font-sans text-[11px]">
              Mean is a vector <MathText text="$\mu_k \in \mathbb{R}^d$" />, dispersion is a covariance matrix <MathText text="$\Sigma_k \in \mathbb{R}^{d \times d}$" />.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950 font-sans">
                <th className="p-3">Covariance Type</th>
                <th className="p-3">Matrix Structure</th>
                <th className="p-3">Number of Parameters</th>
                <th className="p-3">Geometric Shape & Capability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-cyan-300">Full</td>
                <td className="p-3 text-slate-200">Arbitrary symmetric positive definite <MathText text="$\Sigma_k$" /></td>
                <td className="p-3 text-slate-300"><MathText text="$\mathcal{O}(K \cdot d^2)$" /></td>
                <td className="p-3 font-sans text-slate-300">Rotated ellipsoids; models arbitrary correlations between features.</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-indigo-300">Diagonal</td>
                <td className="p-3 text-slate-200"><MathText text="$\text{diag}(\sigma_{k1}^2, \dots, \sigma_{kd}^2)$" /></td>
                <td className="p-3 text-slate-300"><MathText text="$\mathcal{O}(K \cdot d)$" /></td>
                <td className="p-3 font-sans text-slate-300">Axis-aligned ellipsoids; assumes features are conditionally independent given cluster.</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="p-3 font-sans font-bold text-emerald-300">Spherical</td>
                <td className="p-3 text-slate-200"><MathText text="$\sigma_k^2 I$" /></td>
                <td className="p-3 text-slate-300"><MathText text="$\mathcal{O}(K)$" /></td>
                <td className="p-3 font-sans text-slate-300">Equal spread in every direction; circular/spherical contours (most like K-Means).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8. Complete Grand Unification Connection ────────────────── */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> The Complete Mathematical Arc
        </h2>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300 leading-relaxed">
          Hidden Labels <span className="text-slate-500">&rarr;</span> Log of a Sum <span className="text-slate-500">&rarr;</span> Jensen's Inequality <span className="text-slate-500">&rarr;</span> ELBO Lower Bound <span className="text-slate-500">&rarr;</span> Non-negative KL Gap <span className="text-slate-500">&rarr;</span> Alternating E-Step &amp; M-Step
        </div>

        <p className="text-xs text-slate-300 leading-relaxed text-center">
          <strong>Final Takeaway:</strong> EM learns the parameters of a probabilistic mixture model when component labels are hidden. Jensen's inequality makes the ELBO possible; the ELBO makes the alternating EM updates manageable and monotonically guaranteed.
        </p>
      </section>
    </div>
  );
};
