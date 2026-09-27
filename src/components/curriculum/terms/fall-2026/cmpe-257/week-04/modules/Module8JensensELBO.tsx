import React, { useState } from 'react';
import {
  Cpu,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module8JensensELBO: React.FC = () => {
  const [klDivergence, setKlDivergence] = useState<number>(1.8);
  const logEvidence = 5.0; // Fixed marginal log likelihood log P(X)
  const elbo = Math.max(0, Number((logEvidence - klDivergence).toFixed(2)));

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Jensen’s Inequality Formulation ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Cpu className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Jensen’s Inequality & Concave Geometry</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Let <MathText text="$f: \mathbb{R} \to \mathbb{R}$" /> be a concave function (such as <MathText text="$f(t) = \log(t)$" /> where <MathText text="$f''(t) = -1/t^2 < 0$" />), and let <MathText text="$T$" /> be a random variable. <strong>Jensen’s inequality</strong> states:
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-amber-300 text-xs">
          <MathText text="$$f(\mathbb{E}[T]) \ge \mathbb{E}[f(T)] \quad \implies \quad \log\left( \sum_i w_i t_i \right) \ge \sum_i w_i \log(t_i)$$" displayMode={true} />
          <span className="text-[11px] text-slate-400 font-sans block pt-1">
            Where weights <MathText text="$w_i \ge 0$" /> and <MathText text="$\sum w_i = 1$" /> form a convex combination.
          </span>
        </div>
      </div>

      {/* ── Derivation of the Evidence Lower Bound (ELBO) ──────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Derivation of the Evidence Lower Bound (ELBO)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Let <MathText text="$X$" /> denote observed variables, <MathText text="$Z$" /> denote latent variables, and <MathText text="$Q(Z)$" /> be any arbitrary valid probability distribution over <MathText text="$Z$" />:
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-cyan-300">
          <div className="space-y-2 text-center">
            <MathText text="$$\log P(X) = \log \sum_Z P(X, Z) = \log \sum_Z Q(Z) \frac{P(X, Z)}{Q(Z)}$$" displayMode={true} />
            <MathText text="$$= \log \mathbb{E}_{Z \sim Q} \left[ \frac{P(X, Z)}{Q(Z)} \right] \ge \mathbb{E}_{Z \sim Q} \left[ \log \frac{P(X, Z)}{Q(Z)} \right] \quad (\text{by Jensen's})$$" displayMode={true} />
            <MathText text="$$\text{ELBO}(Q) \triangleq \sum_Z Q(Z) \log \frac{P(X, Z)}{Q(Z)}$$" displayMode={true} />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-2">
          <span className="font-semibold text-emerald-400">The Exact KL Divergence Decomposition:</span>
          <p className="text-slate-300 leading-relaxed">
            By expanding the terms, we discover that the gap between the true marginal evidence <MathText text="$\log P(X)$" /> and the <MathText text="$\text{ELBO}(Q)$" /> is exactly the Kullback-Leibler divergence between <MathText text="$Q(Z)$" /> and the true posterior <MathText text="$P(Z \mid X)$" />:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg text-center font-mono text-emerald-300">
            <MathText text="$$\log P(X) = \text{ELBO}(Q) + D_{\text{KL}}(Q(Z) \parallel P(Z \mid X))$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            Because Gibbs’ inequality guarantees <MathText text="$D_{\text{KL}} \ge 0$" />, <MathText text="$\text{ELBO}(Q)$" /> is always a rigorous mathematical lower bound on <MathText text="$\log P(X)$" />!
          </p>
        </div>
      </div>

      {/* ── Why EM Works: The Ascent Guarantee ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <TrendingUp className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why EM Guarantees Monotonic Likelihood Ascent</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-cyan-300">In the E-Step (Tighten the Gap):</span>
            <p className="text-slate-300">
              We set <MathText text="$Q(Z) = P(Z \mid X, \theta^{(t)})$" />. This drives the KL divergence to zero:
            </p>
            <div className="bg-slate-900 p-1.5 rounded text-center text-cyan-300 font-mono text-[11px]">
              <MathText text="$$D_{\text{KL}}(Q \parallel P) = 0 \implies \text{ELBO}(Q; \theta^{(t)}) = \log P(X; \theta^{(t)})$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              The lower bound touches the true log-likelihood function at the current parameter value.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-300">In the M-Step (Maximize the Bound):</span>
            <p className="text-slate-300">
              We maximize <MathText text="$\text{ELBO}(Q; \theta)$" /> with respect to <MathText text="$\theta$" /> to obtain <MathText text="$\theta^{(t+1)}$" />:
            </p>
            <div className="bg-slate-900 p-1.5 rounded text-center text-emerald-300 font-mono text-[11px]">
              <MathText text="$$\log P(X; \theta^{(t+1)}) \ge \text{ELBO}(Q; \theta^{(t+1)}) \ge \text{ELBO}(Q; \theta^{(t)}) = \log P(X; \theta^{(t)})$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              This guarantees that the marginal likelihood can NEVER decrease from one EM iteration to the next!
            </p>
          </div>
        </div>
      </div>

      {/* ── Interactive: ELBO & KL Divergence Gap Visualizer ───────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: ELBO vs. KL Divergence Tradeoff</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Total Log Evidence = {logEvidence.toFixed(1)} nats
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Slide the KL divergence gap <MathText text="$D_{\text{KL}}(Q \parallel P)$" /> to simulate how the E-step closes the gap, allowing the ELBO to touch the true log-likelihood:
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">KL Divergence Gap (<MathText text="$D_{\text{KL}}$" />):</span>
            <span className="font-mono text-purple-400 font-bold">{klDivergence.toFixed(2)} nats</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="4.0"
            step="0.1"
            value={klDivergence}
            onChange={(e) => setKlDivergence(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>D_KL = 0 (E-Step: Bound is tight!)</span>
            <span>D_KL = 4 (Loose bound)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Evidence Lower Bound (ELBO)</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{elbo} nats</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${(elbo / logEvidence) * 100}%` }} className="bg-emerald-500 h-full" />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">KL Gap (<MathText text="$D_{\text{KL}}$" />)</span>
            <span className="text-lg font-bold font-mono text-purple-400">{klDivergence.toFixed(2)} nats</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${(klDivergence / logEvidence) * 100}%` }} className="bg-purple-500 h-full" />
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <strong>Modern Relevance:</strong> This exact ELBO decomposition serves as the core foundational loss function for modern deep generative models, including <strong>Variational Autoencoders (VAEs)</strong> and <strong>Diffusion Probabilistic Models</strong>.
        </div>
      </div>
    </div>
  );
};
