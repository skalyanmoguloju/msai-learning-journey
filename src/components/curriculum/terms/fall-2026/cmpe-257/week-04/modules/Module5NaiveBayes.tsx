import React, { useState } from 'react';
import {
  Compass,
  Mail,
  Zap,
  Activity,
  Sliders,
  CheckCircle2,
  Table,
  Layers,
  Sparkles,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module5NaiveBayes: React.FC = () => {
  // ── Interactive 1: 8-Email Dataset Live Classifier ───────────────────
  const [hasFree, setHasFree] = useState<boolean>(true);
  const [hasOffer, setHasOffer] = useState<boolean>(true);
  const [hasMeeting, setHasMeeting] = useState<boolean>(true);

  // Training statistics from the 8-email dataset (Session 4 Module 5 HTML)
  // Spam (5 emails): Free=4/5, Offer=3/5, Meeting=3/5, Prior=5/8
  const pSpam = 5 / 8;
  const pFreeGivenSpam = hasFree ? (4 / 5) : (1 - 4 / 5);
  const pOfferGivenSpam = hasOffer ? (3 / 5) : (1 - 3 / 5);
  const pMeetingGivenSpam = hasMeeting ? (3 / 5) : (1 - 3 / 5);
  const scoreSpam = pSpam * pFreeGivenSpam * pOfferGivenSpam * pMeetingGivenSpam;

  // Not spam (3 emails): Free=1/3, Offer=1/3, Meeting=2/3, Prior=3/8
  const pNot = 3 / 8;
  const pFreeGivenNot = hasFree ? (1 / 3) : (1 - 1 / 3);
  const pOfferGivenNot = hasOffer ? (1 / 3) : (1 - 1 / 3);
  const pMeetingGivenNot = hasMeeting ? (2 / 3) : (1 - 2 / 3);
  const scoreNot = pNot * pFreeGivenNot * pOfferGivenNot * pMeetingGivenNot;

  const totalEv = scoreSpam + scoreNot;
  const postSpam = totalEv > 0 ? (scoreSpam / totalEv) : 0;
  const postNot = totalEv > 0 ? (scoreNot / totalEv) : 0;

  // ── Interactive 2: Laplace Smoothing Demonstrator ────────────────────
  const [alphaVal, setAlphaVal] = useState<number>(1);
  const [includeUnseenDiscount, setIncludeUnseenDiscount] = useState<boolean>(true);

  // With feature "discount": Spam count=2/5, Not spam count=0/3
  // Unsmoothed:
  const pDiscountGivenNotUnsmooth = includeUnseenDiscount ? 0 : 1;
  const unsmoothedScoreNot = 0.375 * (1 / 3) * (1 / 3) * (2 / 3) * pDiscountGivenNotUnsmooth;

  // Smoothed: count + alpha / (total + 2*alpha)
  const pFreeSpamSm = (4 + alphaVal) / (5 + 2 * alphaVal);
  const pOfferSpamSm = (3 + alphaVal) / (5 + 2 * alphaVal);
  const pDiscSpamSm = includeUnseenDiscount ? (2 + alphaVal) / (5 + 2 * alphaVal) : 1;
  const smoothedScoreSpam = 0.625 * pFreeSpamSm * pOfferSpamSm * pDiscSpamSm;

  const pFreeNotSm = (1 + alphaVal) / (3 + 2 * alphaVal);
  const pOfferNotSm = (1 + alphaVal) / (3 + 2 * alphaVal);
  const pDiscNotSm = includeUnseenDiscount ? (0 + alphaVal) / (3 + 2 * alphaVal) : 1;
  const smoothedScoreNot = 0.375 * pFreeNotSm * pOfferNotSm * pDiscNotSm;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Module Roadmap ─────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Roadmap</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Master the mathematical and probabilistic principles of the Naive Bayes classifier: sparse text representations, conditional independence factorizations, MAP decision rules, Laplace smoothing, Bernoulli/Multinomial/Gaussian models, and log-space computation:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-1">
          {[
            { num: 1, title: 'Why Naive Bayes Is Needed' },
            { num: 2, title: 'Text & Categorical Representation' },
            { num: 3, title: 'Conditional Independence' },
            { num: 4, title: 'Bayes’ Theorem for Naive Bayes' },
            { num: 5, title: 'Complete 8-Email Calculation' },
            { num: 6, title: 'Zero Probabilities & Smoothing' },
            { num: 7, title: 'Model Types (Bernoulli/Multinomial)' },
            { num: 8, title: 'Log Probabilities & Underflow' }
          ].map(topic => (
            <div key={topic.num} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {topic.num}
              </span>
              <span className="text-slate-300 text-[11px] font-medium leading-tight">{topic.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Naive Bayes Is Needed ──────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Mail className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Why Naive Bayes Is Needed</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Naive Bayes</strong> is a generative classifier particularly well-suited for high-dimensional, sparse data such as text documents, word presence flags, discrete counts, and categorical indicators.
        </p>

        <p className="text-xs text-slate-300 leading-relaxed">
          For email classification, features typically indicate whether specific dictionary keywords are present:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$x = [\text{contains 'free'}, \; \text{contains 'offer'}]^T = [1, 1]^T$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Vocabulary sizes often exceed 50,000 words, yet individual emails contain only a tiny fraction of those terms, creating sparse binary vectors. Modeling continuous Gaussian joint clouds (like GDA) on arbitrary word indicators fails because words lack natural Euclidean distances.
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
          <strong className="text-amber-300">Core Strategy:</strong> Rather than estimating the exponential joint probability of every possible word combination (<MathText text="$\mathcal{O}(2^D)$" /> parameters), Naive Bayes estimates individual feature probabilities within each class and combines them through the <em>conditional-independence assumption</em>.
        </div>
      </div>

      {/* ── Representing Text and Categorical Data ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Representing Text and Categorical Data</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          First, we establish a predefined vocabulary index <MathText text="$V$" /> of tracked tokens:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$V = [\text{free}, \; \text{offer}, \; \text{meeting}, \; \text{project}]$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-300">1. Binary Representation (Bernoulli)</span>
            <p className="text-slate-300 leading-relaxed">
              Records presence (1) or absence (0) of each word. For an email containing "free offer":
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-cyan-300">
              <MathText text="$$x = [1, 1, 0, 0]^T$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Treats a word appearing once or ten times identically.</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-300">2. Count Representation (Multinomial)</span>
            <p className="text-slate-300 leading-relaxed">
              Records term frequency counts. For an email containing "free free offer project":
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-emerald-300">
              <MathText text="$$x = [2, 1, 0, 1]^T$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">Preserves repetition frequency to capture emphasis.</p>
          </div>
        </div>
      </div>

      {/* ── The Conditional-Independence Assumption ────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">The Conditional-Independence Assumption</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Two events <MathText text="$A$" /> and <MathText text="$B$" /> are independent if <MathText text="$P(A, B) = P(A)P(B)$" />. Naive Bayes asserts a <strong>conditional</strong> version: once the true class label <MathText text="$y$" /> is known, all individual feature dimensions are mutually independent:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$P(x_1, x_2, \dots, x_D \mid y) \approx \prod_{j=1}^D P(x_j \mid y) = P(x_1 \mid y) P(x_2 \mid y) \cdots P(x_D \mid y)$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">Concrete Numerical Example:</span>
          <p className="text-slate-300 leading-relaxed">
            Suppose empirical training frequencies give <MathText text="$P(\text{free} \mid \text{Spam}) = 0.80$" /> and <MathText text="$P(\text{offer} \mid \text{Spam}) = 0.70$" />. Under the conditional-independence assumption:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$P(\text{free}, \text{offer} \mid \text{Spam}) \approx 0.80 \times 0.70 = \mathbf{0.56}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            While words like "free" and "offer" often co-occur in real spam messages, factorizing the joint likelihood decouples parameters and allows instant linear-time estimation.
          </p>
        </div>
      </div>

      {/* ── Bayes’ Theorem for Naive Bayes ─────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Bayes’ Theorem for Naive Bayes</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Substituting the conditional-independence product into Bayes' theorem yields:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-cyan-300 text-xs">
          <MathText text="$$P(y \mid x) = \frac{P(y) \prod_{j=1}^D P(x_j \mid y)}{P(x)}$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-amber-300">The MAP Unnormalized Score Shortcut</span>
          <p className="text-slate-300 leading-relaxed">
            Because the evidence denominator <MathText text="$P(x)$" /> is identical across all candidate classes, we determine the winning class using only the numerator score:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$\hat{y}_{\text{MAP}} = \arg\max_{y} \left[ P(y) \prod_{j=1}^D P(x_j \mid y) \right]$$" displayMode={true} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1 text-center">
            <div className="p-2 bg-slate-900 rounded">
              <span className="text-slate-400 font-sans block text-[10px]">Spam Score</span>
              <MathText text="$$0.30 \times 0.80 \times 0.70 = \mathbf{0.168}$$" displayMode={true} />
            </div>
            <div className="p-2 bg-slate-900 rounded">
              <span className="text-slate-400 font-sans block text-[10px]">Not Spam Score</span>
              <MathText text="$$0.70 \times 0.10 \times 0.05 = \mathbf{0.0035}$$" displayMode={true} />
            </div>
          </div>
          <p className="text-cyan-300 text-center font-semibold pt-1">
            Because <MathText text="$0.168 \gg 0.0035$" />, the email is classified as Spam!
          </p>
        </div>
      </div>

      {/* ── Complete 8-Email Dataset Calculation ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete 8-Email Dataset Worked Calculation</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Consider an 8-email corpus with binary features <MathText text="$x_1$" /> ("free"), <MathText text="$x_2$" /> ("offer"), and <MathText text="$x_3$" /> ("meeting"):
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Email</th>
                <th className="py-2 px-3 text-slate-300">"free" (<MathText text="$x_1$" />)</th>
                <th className="py-2 px-3 text-slate-300">"offer" (<MathText text="$x_2$" />)</th>
                <th className="py-2 px-3 text-slate-300">"meeting" (<MathText text="$x_3$" />)</th>
                <th className="py-2 px-3 text-amber-300">Class Label</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr><td className="py-1 px-3 text-slate-400">S1</td><td className="py-1 px-3">1</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">S2</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">S3</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td><td className="py-1 px-3">1</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">S4</td><td className="py-1 px-3">1</td><td className="py-1 px-3">1</td><td className="py-1 px-3">1</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">S5</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td><td className="py-1 px-3">0</td><td className="py-1 px-3 text-rose-400 font-sans font-semibold">Spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">N1</td><td className="py-1 px-3">0</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Not spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">N2</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Not spam</td></tr>
              <tr><td className="py-1 px-3 text-slate-400">N3</td><td className="py-1 px-3">1</td><td className="py-1 px-3">0</td><td className="py-1 px-3">1</td><td className="py-1 px-3 text-emerald-400 font-sans font-semibold">Not spam</td></tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-rose-400 font-sans font-bold">Spam Frequencies (5 emails):</span>
            <div className="text-slate-300">Prior <MathText text="$P(\text{Spam}) = 5/8 = \mathbf{0.625}$" /></div>
            <div className="text-slate-300"><MathText text="$P(\text{free} \mid S) = 4/5 = 0.80$" /></div>
            <div className="text-slate-300"><MathText text="$P(\text{offer} \mid S) = 3/5 = 0.60$" /></div>
            <div className="text-slate-300"><MathText text="$P(\text{meeting} \mid S) = 3/5 = 0.60$" /></div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-sans font-bold">Not Spam Frequencies (3 emails):</span>
            <div className="text-slate-300">Prior <MathText text="$P(\text{Not}) = 3/8 = \mathbf{0.375}$" /></div>
            <div className="text-slate-300"><MathText text="$P(\text{free} \mid N) = 1/3 \approx 0.3333$" /></div>
            <div className="text-slate-300"><MathText text="$P(\text{offer} \mid N) = 1/3 \approx 0.3333$" /></div>
            <div className="text-slate-300"><MathText text="$P(\text{meeting} \mid N) = 2/3 \approx 0.6667$" /></div>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
          <span className="font-semibold text-slate-200 font-sans">Classification for New Email <MathText text="$x = [1, 1, 1]^T$" />:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center">
            <div className="p-2.5 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Score(Spam)</span>
              <MathText text="$$0.625 \times 0.8 \times 0.6 \times 0.6 = \mathbf{0.180}$$" displayMode={true} />
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">Score(Not spam)</span>
              <MathText text="$$0.375 \times \frac{1}{3} \times \frac{1}{3} \times \frac{2}{3} = \frac{1}{36} \approx \mathbf{0.02778}$$" displayMode={true} />
            </div>
          </div>

          <div className="text-center pt-1 text-slate-400 font-sans">
            Marginal Evidence: <MathText text="$P(x) = 0.180 + 0.02778 = \mathbf{0.20778}$" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 text-center">
            <div className="p-2.5 bg-rose-950/30 border border-rose-500/30 rounded-lg">
              <span className="text-[10px] text-rose-400 font-sans block font-semibold">P(Spam | x)</span>
              <span className="text-rose-300 font-bold text-sm">86.63%</span>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg">
              <span className="text-[10px] text-slate-500 font-sans block">P(Not spam | x)</span>
              <span className="text-cyan-300 font-bold text-sm">13.37%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive 1: 8-Email Dataset Live Classifier ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Live 8-Email Naive Bayes Classifier</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Dynamic Inference
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Toggle which keywords appear in the test email to see how the Bernoulli product updates the classification:
        </p>

        <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <button
            onClick={() => setHasFree(!hasFree)}
            className={`p-2.5 rounded-lg border font-mono font-medium transition-all ${
              hasFree
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            "free": {hasFree ? 'Present (1)' : 'Absent (0)'}
          </button>

          <button
            onClick={() => setHasOffer(!hasOffer)}
            className={`p-2.5 rounded-lg border font-mono font-medium transition-all ${
              hasOffer
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            "offer": {hasOffer ? 'Present (1)' : 'Absent (0)'}
          </button>

          <button
            onClick={() => setHasMeeting(!hasMeeting)}
            className={`p-2.5 rounded-lg border font-mono font-medium transition-all ${
              hasMeeting
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            "meeting": {hasMeeting ? 'Present (1)' : 'Absent (0)'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">P(Spam | x)</span>
            <span className="text-base font-bold text-rose-400">{(postSpam * 100).toFixed(2)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postSpam * 100}%` }} className="bg-rose-500 h-full" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">P(Not spam | x)</span>
            <span className="text-base font-bold text-emerald-400">{(postNot * 100).toFixed(2)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postNot * 100}%` }} className="bg-emerald-500 h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Zero Probabilities and Smoothing ───────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Zero Probabilities and Laplace Smoothing</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          If a keyword never appeared in class <MathText text="$y$" /> during training, its empirical frequency is zero (<MathText text="$P(\text{discount} \mid \text{Not}) = 0/3 = 0$" />). Because Naive Bayes multiplies feature probabilities, a single zero wipes out the entire score:
        </p>

        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-rose-400 text-xs">
          <MathText text="$$0.375 \times \frac{1}{3} \times \frac{1}{3} \times 0 = \mathbf{0.0}$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-emerald-300">Laplace (Additive) Smoothing Formula</span>
          <p className="text-slate-300 leading-relaxed">
            For binary features with two outcomes (present vs. absent), Laplace smoothing adds pseudo-counts (+1 to numerator, +2 to denominator):
          </p>
          <div className="bg-slate-900 p-2 rounded font-mono text-center text-cyan-300 text-xs">
            <MathText text="$$\hat{p} = \frac{\text{count present} + 1}{\text{number of examples} + 2}$$" displayMode={true} />
          </div>
          <p className="text-slate-300 leading-relaxed">
            If "discount" occurred 0 times in 3 Not spam emails, its smoothed estimate becomes:
          </p>
          <div className="bg-slate-900 p-2 rounded font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$\hat{p}(\text{discount} \mid \text{Not}) = \frac{0 + 1}{3 + 2} = \frac{1}{5} = \mathbf{0.20}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            Smoothed scores with "discount" (Spam counts 4, 3, 2; Not spam counts 1, 1, 0): <br />
            <MathText text="$\text{Score}(\text{Spam}) = 0.625(5/7)(4/7)(3/7) \approx \mathbf{0.1093}$" /> &nbsp;|&nbsp;
            <MathText text="$\text{Score}(\text{Not}) = 0.375(2/5)(2/5)(1/5) = \mathbf{0.0120}$" />
          </p>
        </div>
      </div>

      {/* ── Types of Naive Bayes ───────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Types of Naive Bayes Classifiers</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Model Variant</th>
                <th className="py-2.5 px-3 text-slate-300">Feature Data Type</th>
                <th className="py-2.5 px-3 text-emerald-300">Likelihood Mathematical Formulation</th>
                <th className="py-2.5 px-3 text-amber-300">Standard Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300 font-mono">Bernoulli</td>
                <td className="py-2 px-3 text-slate-300">Binary indicators <MathText text="$x_j \in \{0, 1\}$" /></td>
                <td className="py-2 px-3 text-emerald-300 font-mono text-xs">
                  <MathText text="$$P(x_j \mid y) = \theta_{jy}^{x_j} (1 - \theta_{jy})^{1 - x_j}$$" displayMode={true} />
                </td>
                <td className="py-2 px-3 text-slate-300">Short text flags, symptom checks</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300 font-mono">Multinomial</td>
                <td className="py-2 px-3 text-slate-300">Discrete non-negative integer counts</td>
                <td className="py-2 px-3 text-emerald-300 font-mono text-xs">
                  <MathText text="$$P(x \mid y) \propto \prod_{j=1}^D p_{jy}^{x_j}$$" displayMode={true} />
                </td>
                <td className="py-2 px-3 text-slate-300">Document word frequencies, TF counts</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300 font-mono">Gaussian</td>
                <td className="py-2 px-3 text-slate-300">Continuous numerical features</td>
                <td className="py-2 px-3 text-emerald-300 font-mono text-xs">
                  <MathText text="$$P(x_j \mid y) = \frac{1}{\sqrt{2\pi\sigma_{jy}^2}} e^{-\frac{(x_j - \mu_{jy})^2}{2\sigma_{jy}^2}}$$" displayMode={true} />
                </td>
                <td className="py-2 px-3 text-slate-300">Sensor measurements (assumes diagonal covariance)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Assumptions, Limitations, and Log Probabilities ────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Assumptions, Limitations, and Log Probabilities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-rose-300">1. Floating-Point Underflow</span>
            <p className="text-slate-300 leading-relaxed">
              Multiplying hundreds of fractional probabilities (<MathText text="$p_j < 1$" />) causes underflow to 0. We compute in log-space:
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-cyan-300 text-xs">
              <MathText text="$$\log \text{Score}(y) = \log P(y) + \sum_{j=1}^D \log P(x_j \mid y)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              Because <MathText text="$\log(ab) = \log a + \log b$" />, multiplication becomes addition while strictly preserving the argmax ordering.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-amber-300">2. Correlated Word Violations</span>
            <p className="text-slate-300 leading-relaxed">
              Words like "credit" and "card" appear together frequently. Naive Bayes double-counts this correlation as two independent pieces of evidence.
            </p>
            <p className="text-slate-400 text-[11px]">
              While this distorts posterior calibration (pushing probabilities artificially toward 0 or 1), it often preserves the correct ranking for classification!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-semibold">Key Strengths</span>
            <ul className="text-slate-300 space-y-0.5 list-disc list-inside text-[11px]">
              <li>Extremely fast linear training <MathText text="$\mathcal{O}(ND)$" /> and prediction.</li>
              <li>Robust on high-dimensional sparse text data.</li>
              <li>Naturally incremental: easily updated with new document counts.</li>
            </ul>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-rose-400 font-semibold">Key Limitations</span>
            <ul className="text-slate-300 space-y-0.5 list-disc list-inside text-[11px]">
              <li>Conditional independence rarely holds strictly in natural language.</li>
              <li>Estimated probabilities are overconfident and poorly calibrated.</li>
              <li>Requires Laplace smoothing to handle unseen tokens.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Final Module Recap ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Recap</h3>
        </div>
        <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
          <li>Represent text as binary presence indicators (<MathText text="$x_j \in \{0, 1\}$" />) or count vectors.</li>
          <li>Estimate class prior probabilities <MathText text="$P(y)$" /> directly from class frequencies.</li>
          <li>Estimate individual feature likelihoods <MathText text="$P(x_j \mid y)$" /> within each class.</li>
          <li>Factorize joint likelihood via the conditional-independence assumption: <MathText text="$\prod_j P(x_j \mid y)$" />.</li>
          <li>Multiply by class prior to obtain the unnormalized class score.</li>
          <li>Apply Laplace smoothing (<MathText text="$+1 / +2$" />) to prevent zero-probability product collapse.</li>
          <li>Select Bernoulli, Multinomial, or Gaussian Naive Bayes based on feature data modality.</li>
          <li>Perform summation in log-space (<MathText text="$\log P(y) + \sum \log P(x_j \mid y)$" />) to avoid floating-point underflow.</li>
        </ol>
      </div>
    </div>
  );
};
