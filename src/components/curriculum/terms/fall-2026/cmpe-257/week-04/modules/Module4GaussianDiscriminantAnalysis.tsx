import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
  Table
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module4GaussianDiscriminantAnalysis: React.FC = () => {
  const [modelType, setModelType] = useState<'lda' | 'qda'>('lda');
  const [mu0, setMu0] = useState<number>(-1.5);
  const [mu1, setMu1] = useState<number>(1.5);
  const [sigma0, setSigma0] = useState<number>(1.0);
  const [sigma1, setSigma1] = useState<number>(1.5);

  // If LDA, sigma is pooled average
  const pooledSigma = Math.sqrt((Math.pow(sigma0, 2) + Math.pow(sigma1, 2)) / 2);
  const effectiveSigma0 = modelType === 'lda' ? pooledSigma : sigma0;
  const effectiveSigma1 = modelType === 'lda' ? pooledSigma : sigma1;

  // Midpoint calculation where densities are equal (assuming equal priors phi=0.5)
  // For LDA: threshold is simply (mu0 + mu1) / 2
  const ldaThreshold = (mu0 + mu1) / 2;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Model Formulation ──────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Gaussian Discriminant Analysis (GDA)</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Gaussian Discriminant Analysis is a continuous generative classification model. We assume features <MathText text="$X \in \mathbb{R}^d$" /> follow a multivariate Gaussian distribution conditional on the discrete class label <MathText text="$Y \in \{0, 1\}$" />:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-slate-400 font-sans block mb-1">Class Prior:</span>
            <MathText text="$$Y \sim \text{Bernoulli}(\phi)$$" displayMode={true} />
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-slate-400 font-sans block mb-1">Class 0 Likelihood:</span>
            <MathText text="$$X \mid Y=0 \sim \mathcal{N}(\mu_0, \Sigma_0)$$" displayMode={true} />
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono">
            <span className="text-slate-400 font-sans block mb-1">Class 1 Likelihood:</span>
            <MathText text="$$X \mid Y=1 \sim \mathcal{N}(\mu_1, \Sigma_1)$$" displayMode={true} />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$p(x \mid \mu, \Sigma) = \frac{1}{(2\pi)^{d/2} |\Sigma|^{1/2}} \exp\left( -\frac{1}{2} (x - \mu)^T \Sigma^{-1} (x - \mu) \right)$$" displayMode={true} />
        </div>
      </div>

      {/* ── LDA vs QDA: Why Shared Covariance Linearizes the Boundary ──── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">LDA vs. QDA: The Algebraic Cancellation</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The decision boundary is the set of points where the posterior log-odds ratio is zero (<MathText text="$\log \frac{P(Y=1 \mid x)}{P(Y=0 \mid x)} = 0$" />). Expanding this ratio:
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-2 text-cyan-300">
          <MathText text="$$\log \frac{P(Y=1 \mid x)}{P(Y=0 \mid x)} = -\frac{1}{2}(x - \mu_1)^T \Sigma_1^{-1} (x - \mu_1) + \frac{1}{2}(x - \mu_0)^T \Sigma_0^{-1} (x - \mu_0) + \log \frac{|\Sigma_0|^{1/2}}{|\Sigma_1|^{1/2}} + \log \frac{\phi}{1-\phi}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-400">Linear Discriminant Analysis (LDA)</span>
            <p className="text-slate-300">
              Assumes shared covariance: <MathText text="$\Sigma_0 = \Sigma_1 = \Sigma$" />.
            </p>
            <p className="text-slate-400">
              The quadratic terms <MathText text="$x^T \Sigma^{-1} x$" /> exactly cancel out! The boundary reduces strictly to a linear hyperplane:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-emerald-300 font-mono">
              <MathText text="$$w^T x + b = 0, \quad w = \Sigma^{-1}(\mu_1 - \mu_0)$$" displayMode={true} />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-purple-400">Quadratic Discriminant Analysis (QDA)</span>
            <p className="text-slate-300">
              Allows class-specific covariance: <MathText text="$\Sigma_0 \ne \Sigma_1$" />.
            </p>
            <p className="text-slate-400">
              Quadratic terms do not cancel, yielding a quadratic decision boundary (paraboloid, hyperbola, or ellipse):
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-purple-300 font-mono">
              <MathText text="$$x^T A x + b^T x + c = 0, \quad A = \frac{1}{2}(\Sigma_0^{-1} - \Sigma_1^{-1})$$" displayMode={true} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive: Boundary Geometry Explorer ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Boundary Curvature Simulator</h3>
          </div>
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setModelType('lda')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                modelType === 'lda' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              LDA (Shared Covariance)
            </button>
            <button
              onClick={() => setModelType('qda')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                modelType === 'qda' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              QDA (Class Covariance)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="space-y-1">
            <label className="text-slate-400 flex justify-between">
              <span>Class 0 Std Dev (<MathText text="$\sigma_0$" />):</span>
              <span className="font-mono text-cyan-300">{sigma0.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={sigma0}
              onChange={(e) => setSigma0(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 flex justify-between">
              <span>Class 1 Std Dev (<MathText text="$\sigma_1$" />):</span>
              <span className="font-mono text-purple-300">{sigma1.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={sigma1}
              onChange={(e) => setSigma1(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
          <span className="font-semibold text-slate-200">Resulting Decision Surface Property:</span>
          {modelType === 'lda' ? (
            <p className="text-emerald-300 leading-relaxed">
              <strong>Strictly Linear Hyperplane:</strong> Because pooled variance <MathText text={`$\\sigma_{\\text{pooled}} = ${pooledSigma.toFixed(2)}$`} /> is shared by both classes, the decision boundary is linear and intersects at <MathText text={`$x^* = ${ldaThreshold.toFixed(2)}$`} />.
            </p>
          ) : (
            <p className="text-purple-300 leading-relaxed">
              <strong>Quadratic Curved Boundary:</strong> Because <MathText text={`$\\sigma_0 (${sigma0.toFixed(1)}) \\ne \\sigma_1 (${sigma1.toFixed(1)})$`} />, the variance ratio <MathText text={`$(\\sigma_0/\\sigma_1 = ${(sigma0/sigma1).toFixed(2)})$`} /> curves the decision surface toward the class with higher variance.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
