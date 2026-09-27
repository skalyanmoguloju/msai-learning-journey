import React, { useState } from 'react';
import {
  Activity,
  Zap,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module5NaiveBayes: React.FC = () => {
  const [alphaSmoothing, setAlphaSmoothing] = useState<number>(1);
  const [testWordObserved, setTestWordObserved] = useState<boolean>(false);

  // Suppose vocab size |V| = 1000
  const vocabSize = 1000;
  // Class Spam count = 200 occurrences of all words, word "free" count = 15
  // Word "unseen_token" count = 0
  const countWordInSpam = testWordObserved ? 15 : 0;
  const totalSpamWords = 200;

  // Likelihood with smoothing: (count + alpha) / (total + alpha * |V|)
  const unsmoothedProb = countWordInSpam / totalSpamWords;
  const smoothedProb = (countWordInSpam + alphaSmoothing) / (totalSpamWords + alphaSmoothing * vocabSize);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Conditional Independence Assumption ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Naive Bayes Classifier</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Estimating the full joint conditional distribution <MathText text="$P(X_1, \dots, X_d \mid Y)$" /> for high-dimensional text or categorical data requires estimating <MathText text="$\mathcal{O}(2^d)$" /> parameters—impossible even with millions of training examples.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-emerald-400">The Naive Independence Assumption:</span>
          <p className="text-slate-300 leading-relaxed">
            All feature attributes <MathText text="$X_j$" /> are mutually conditionally independent given the class label <MathText text="$Y$" />:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300">
            <MathText text="$$P(X_1, X_2, \dots, X_d \mid Y=k) = \prod_{j=1}^d P(X_j \mid Y=k)$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            This reduces the parameter count from exponential <MathText text="$\mathcal{O}(2^d)$" /> down to linear <MathText text="$\mathcal{O}(K \cdot d)$" />.
          </p>
        </div>
      </div>

      {/* ── Log-Space Inference & Laplace Smoothing ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Log-Space Inference & The Zero-Probability Trap</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-300">1. Log-Space Computation</span>
            <p className="text-slate-300 leading-relaxed">
              Multiplying hundreds of probabilities <MathText text="$p_j \in [0, 1]$" /> causes catastrophic floating-point underflow. We compute in log-space:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-cyan-300 font-mono">
              <MathText text="$$\log P(Y=k \mid X) \propto \log P(Y=k) + \sum_{j=1}^d \log P(X_j \mid Y=k)$$" displayMode={true} />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-rose-300">2. Laplace (Additive) Smoothing</span>
            <p className="text-slate-300 leading-relaxed">
              If an unseen test token never occurred in training class <MathText text="$k$" />, <MathText text="$P(x_j \mid y_k) = 0$" />. A single zero wipes out the entire joint probability product! Laplace smoothing adds a uniform pseudo-count <MathText text="$\alpha$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded text-center text-rose-300 font-mono">
              <MathText text="$$\hat{\theta}_{jk} = \frac{\text{count}(x_j, y_k) + \alpha}{\text{count}(y_k) + \alpha |V|}$$" displayMode={true} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive: Zero-Probability & Laplace Smoothing Demo ──────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-indigo-400">
            <Mail className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive: Laplace Smoothing in Spam Filtering</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Vocabulary |V| = {vocabSize}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Toggle whether a test token was observed during training to see how Laplace smoothing (<MathText text="$\alpha$" />) prevents complete model collapse:
        </p>

        <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setTestWordObserved(!testWordObserved)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              testWordObserved
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            {testWordObserved ? 'Token Seen in Training (Count = 15)' : 'Unseen Test Token (Count = 0)'}
          </button>

          <div className="flex-1 min-w-[200px] flex items-center gap-2">
            <span className="text-slate-400">Smoothing <MathText text="$\alpha$" />:</span>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={alphaSmoothing}
              onChange={(e) => setAlphaSmoothing(Number(e.target.value))}
              className="flex-1 accent-indigo-500 cursor-pointer"
            />
            <span className="font-mono text-cyan-300 font-bold">{alphaSmoothing}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Without Smoothing (<MathText text="$\alpha = 0$" />):</span>
            <div className={`text-base font-bold font-mono ${unsmoothedProb === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              <MathText text={`$P(\\text{token} \\mid \\text{Spam}) = ${unsmoothedProb.toFixed(5)}$`} />
            </div>
            <p className="text-[11px] text-slate-500">
              {unsmoothedProb === 0
                ? 'CRITICAL FAILURE: Entire email posterior collapses to 0!'
                : 'Empirical frequency estimate.'}
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">With Laplace Smoothing (<MathText text={`$\\alpha = ${alphaSmoothing}$`} />):</span>
            <div className="text-base font-bold font-mono text-cyan-300">
              <MathText text={`$P(\\text{token} \\mid \\text{Spam}) = ${smoothedProb.toFixed(6)}$`} />
            </div>
            <p className="text-[11px] text-slate-500">
              {alphaSmoothing > 0
                ? 'Non-zero probability allocated safely via Bayesian uniform Dirichlet prior.'
                : 'Smoothing disabled.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
