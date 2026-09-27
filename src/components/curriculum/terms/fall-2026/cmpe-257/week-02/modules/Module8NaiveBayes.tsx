import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Sliders,
  Calculator,
  Activity,
  Check,
  CheckCircle2,
  HelpCircle,
  BarChart2,
  Table,
  Scale,
  GitBranch,
  BookOpen,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Split,
  FileText
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module8NaiveBayes: React.FC = () => {
  // ── Interactive Email Classifier State ──────────────────────────────
  const [hasFree, setHasFree] = useState<boolean>(true);
  const [hasLink, setHasLink] = useState<boolean>(true);
  const [hasCrypto, setHasCrypto] = useState<boolean>(false); // Zero-frequency demonstration
  const [useLaplace, setUseLaplace] = useState<boolean>(false);

  // Dataset parameters from HTML
  // Total emails: 10 (4 spam, 6 ham)
  // Spam: 4. free in 3, link in 2 (0.5), crypto in 0
  // Ham: 6. free in 1 (1/6 = 0.1667), link in 1.2 (0.2), crypto in 0
  const priorSpam = 4 / 10; // 0.4
  const priorHam = 6 / 10;  // 0.6

  // Feature probabilities without smoothing
  const pFreeGivenSpamRaw = 3 / 4; // 0.75
  const pFreeGivenHamRaw = 1 / 6;  // 0.1667
  const pLinkGivenSpamRaw = 0.50;  // 2 / 4
  const pLinkGivenHamRaw = 0.20;   // 0.20
  const pCryptoGivenSpamRaw = 0.0; // 0 / 4
  const pCryptoGivenHamRaw = 0.0;  // 0 / 6

  // Feature probabilities with Laplace smoothing (+1 / +2 for binary features)
  const pFreeGivenSpamLaplace = (3 + 1) / (4 + 2); // 4/6 = 0.667
  const pFreeGivenHamLaplace = (1 + 1) / (6 + 2);  // 2/8 = 0.25
  const pLinkGivenSpamLaplace = (2 + 1) / (4 + 2); // 3/6 = 0.50
  const pLinkGivenHamLaplace = (1.2 + 1) / (6 + 2); // ~2.2 / 8 = 0.275
  const pCryptoGivenSpamLaplace = (0 + 1) / (4 + 2); // 1/6 = 0.1667
  const pCryptoGivenHamLaplace = (0 + 1) / (6 + 2);  // 1/8 = 0.125

  const pFreeSpam = useLaplace ? pFreeGivenSpamLaplace : pFreeGivenSpamRaw;
  const pFreeHam = useLaplace ? pFreeGivenHamLaplace : pFreeGivenHamRaw;
  const pLinkSpam = useLaplace ? pLinkGivenSpamLaplace : pLinkGivenSpamRaw;
  const pLinkHam = useLaplace ? pLinkGivenHamLaplace : pLinkGivenHamRaw;
  const pCryptoSpam = useLaplace ? pCryptoGivenSpamLaplace : pCryptoGivenSpamRaw;
  const pCryptoHam = useLaplace ? pCryptoGivenHamLaplace : pCryptoGivenHamRaw;

  // Compute products
  const { spamScore, hamScore, postSpam, postHam, logSpam, logHam } = useMemo(() => {
    let sScore = priorSpam;
    let hScore = priorHam;

    if (hasFree) {
      sScore *= pFreeSpam;
      hScore *= pFreeHam;
    }
    if (hasLink) {
      sScore *= pLinkSpam;
      hScore *= pLinkHam;
    }
    if (hasCrypto) {
      sScore *= pCryptoSpam;
      hScore *= pCryptoHam;
    }

    const total = sScore + hScore;
    const pSpam = total > 0 ? (sScore / total) : 0;
    const pHam = total > 0 ? (hScore / total) : 0;

    const lSpam = sScore > 0 ? Math.log(sScore) : -999;
    const lHam = hScore > 0 ? Math.log(hScore) : -999;

    return {
      spamScore: sScore,
      hamScore: hScore,
      postSpam: pSpam,
      postHam: pHam,
      logSpam: lSpam,
      logHam: lHam
    };
  }, [hasFree, hasLink, hasCrypto, pFreeSpam, pFreeHam, pLinkSpam, pLinkHam, pCryptoSpam, pCryptoHam, priorSpam, priorHam]);

  // ── Interactive Quick Review Accordion State ─────────────────────────
  const [revealedAnswers, setRevealedAnswers] = useState<{ [key: string]: boolean }>({});
  const toggleAnswer = (id: string) => {
    setRevealedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Header Banner Card ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/70 border border-blue-800/40 rounded-2xl p-6 space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <GitBranch className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">Session 2 · Module 8</span>
              <h2 className="text-xl font-bold text-slate-100">
                Naive Bayes Classifier
              </h2>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
            Generative Learning · Worked Case Study
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Beginner-friendly notes with a complete worked email spam classification example. Learn how <strong>Bayes’ theorem</strong> combined with
          the <strong>conditional-independence assumption</strong> allows us to classify complex data quickly, safely avoid zero-probability traps via
          <strong>Laplace smoothing</strong>, and prevent underflow using <strong>log scores</strong>.
        </p>

        {/* Roadmap */}
        <div className="pt-2">
          <div className="text-[11px] uppercase font-bold text-blue-300 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Module Roadmap
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { num: '1-2', title: 'Problem & Bayes’ Theorem' },
              { num: '3', title: 'Why Called "Naive"?' },
              { num: '4-6', title: 'Worked Email Classification' },
              { num: '7-10', title: 'Laplace Smoothing & Log Scores' }
            ].map((step) => (
              <div key={step.num} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-center">
                <span className="text-[10px] text-blue-400 font-bold block">Sections {step.num}</span>
                <span className="text-slate-300 text-[11px] font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <strong>Core Idea:</strong> Predict the most likely class by combining how common each class is beforehand (prior) with how well the observed features match that class (likelihood).
          </div>
        </div>
      </div>

      {/* ── Section 1: What Problem Does Naive Bayes Solve? ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Mail className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">1. What Problem Does Naive Bayes Solve?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Naive Bayes is a <strong>generative classification method</strong>. Given an observed vector of input features <MathText text="$x$" /> (e.g. keywords in an email), it calculates the posterior probability for each possible target class <MathText text="$y$" />:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Class 1: Spam (<MathText text="$y = 1$" />)
            </span>
            <p className="text-slate-400 text-[11px]">Unsolicited promotional, phishing, or malicious email.</p>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Class 0: Not Spam / Ham (<MathText text="$y = 0$" />)
            </span>
            <p className="text-slate-400 text-[11px]">Legitimate personal or work communication.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The ultimate target of inference is the <strong>posterior probability</strong>:
        </p>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-sm">
          <MathText text="$$P(y \mid x)$$" displayMode={true} />
        </div>
        <p className="text-[11px] text-slate-400 text-center">
          Read this as: <em>“The probability of class <MathText text="$y$" /> given that we have observed feature set <MathText text="$x$" />.”</em>
        </p>
      </div>

      {/* ── Section 2: Bayes’ Theorem ───────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">2. Bayes’ Theorem Formulation</h3>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300 shadow-inner">
          <MathText text="$$P(y \mid x) = \frac{P(x \mid y) \, P(y)}{P(x)}$$" displayMode={true} />
        </div>

        {/* 4 Terms Breakdown */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Term</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Statistical Name</th>
                <th className="py-2.5 px-3 font-semibold text-cyan-300">Intuitive Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-mono text-emerald-300"><MathText text="$P(y \mid x)$" /></td>
                <td className="py-2.5 px-3 font-medium text-slate-200">Posterior Probability</td>
                <td className="py-2.5 px-3 text-slate-400">Class probability <em>after</em> inspecting the features of the new email.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-cyan-300"><MathText text="$P(x \mid y)$" /></td>
                <td className="py-2.5 px-3 font-medium text-slate-200">Class-Conditional Likelihood</td>
                <td className="py-2.5 px-3 text-slate-400">How likely these specific features are to appear if the class were already known.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-purple-300"><MathText text="$P(y)$" /></td>
                <td className="py-2.5 px-3 font-medium text-slate-200">Prior Probability</td>
                <td className="py-2.5 px-3 text-slate-400">How common this class is in the world <em>before</em> seeing any email contents.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono text-amber-300"><MathText text="$P(x)$" /></td>
                <td className="py-2.5 px-3 font-medium text-slate-200">Evidence / Normalizing Constant</td>
                <td className="py-2.5 px-3 text-slate-400">Overall probability of observing feature vector <MathText text="$x$" /> across all classes.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <span className="font-bold text-cyan-300 block">The Proportionality Shortcut:</span>
          <p>
            Notice that for any single incoming email, <MathText text="$P(x)$" /> is identical regardless of whether we test <MathText text="$y = \text{spam}$" /> or <MathText text="$y = \text{ham}$" />.
            When comparing classes to make a prediction, we can ignore the shared denominator <MathText text="$P(x)$" />:
          </p>
          <div className="p-2 bg-slate-900 rounded font-mono text-center text-cyan-300">
            <MathText text="$$P(y \mid x) \propto P(x \mid y) \, P(y)$$" displayMode={true} />
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            The symbol <MathText text="$\propto$" /> means <em>“proportional to.”</em>
          </p>
        </div>
      </div>

      {/* ── Section 3: Why Is It Called "Naive"? ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <HelpCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">3. Why Is It Called “Naive”?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose an email is inspected for three distinct binary features:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-amber-400 font-mono"><MathText text="$x_1$" /></span>: contains word <strong>“free”</strong>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-amber-400 font-mono"><MathText text="$x_2$" /></span>: contains a <strong>web link</strong>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-center">
            <span className="text-amber-400 font-mono"><MathText text="$x_3$" /></span>: excessive <strong>CAPITAL letters</strong>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The rigorous, exact joint likelihood is <MathText text="$P(x_1, x_2, x_3 \mid y)$" />. Estimating this directly from data requires counting every single permutation of feature combinations. With <MathText text="$d$" /> features, there are <MathText text="$2^d$" /> combinations—requiring unrealistic amounts of training data!
        </p>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
          <span className="font-bold text-amber-300 block">The Naive Conditional-Independence Assumption:</span>
          <p>
            Naive Bayes simplifies the problem by assuming that <strong>once the class is known, the features are conditionally independent</strong>:
          </p>
          <div className="p-2 bg-slate-950 rounded font-mono text-center text-amber-300">
            <MathText text="$$P(x_1, x_2, x_3 \mid y) = P(x_1 \mid y) \cdot P(x_2 \mid y) \cdot P(x_3 \mid y)$$" displayMode={true} />
          </div>
          <p className="text-[11px] text-amber-300/80">
            In general for <MathText text="$d$" /> features: <MathText text="$$P(x \mid y) = \prod_{j=1}^d P(x_j \mid y)$$" />
          </p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Substituting this into Bayes’ Theorem produces the complete Naive Bayes classification rule:
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center font-mono text-sm text-cyan-300">
          <MathText text="$$P(y \mid x) \propto P(y) \prod_{j=1}^d P(x_j \mid y)$$" displayMode={true} />
        </div>
      </div>

      {/* ── Section 4: Learning Probabilities by Counting ──────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Calculator className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">4. Learning Probabilities from Data: The Training Corpus</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Naive Bayes learns its parameters through simple counting of frequency statistics:
        </p>

        {/* Dataset Counts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3 font-semibold text-indigo-300">Email Quantity</th>
                  <th className="py-2 px-3 font-semibold text-indigo-300">Observed Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
                <tr><td className="py-2 px-3 text-slate-300">Total training emails</td><td className="py-2 px-3 font-mono text-slate-100">10</td></tr>
                <tr><td className="py-2 px-3 text-rose-300 font-medium">Spam emails (<MathText text="$y = 1$" />)</td><td className="py-2 px-3 font-mono text-rose-300">4</td></tr>
                <tr><td className="py-2 px-3 text-emerald-300 font-medium">Not-spam emails (<MathText text="$y = 0$" />)</td><td className="py-2 px-3 font-mono text-emerald-300">6</td></tr>
                <tr><td className="py-2 px-3 text-slate-300">Spam emails containing “free”</td><td className="py-2 px-3 font-mono text-cyan-300">3 of 4</td></tr>
                <tr><td className="py-2 px-3 text-slate-300">Not-spam emails containing “free”</td><td className="py-2 px-3 font-mono text-cyan-300">1 of 6</td></tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">Computed Prior Probabilities</span>
              <div className="font-mono text-xs text-slate-200 space-y-0.5">
                <div><MathText text="$$P(\text{spam}) = \frac{4}{10} = 0.40$$" /></div>
                <div><MathText text="$$P(\text{ham}) = \frac{6}{10} = 0.60$$" /></div>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">Computed Feature Likelihoods</span>
              <div className="font-mono text-xs text-slate-200 space-y-0.5">
                <div><MathText text="$$P(\text{free} \mid \text{spam}) = \frac{3}{4} = 0.75$$" /></div>
                <div><MathText text="$$P(\text{free} \mid \text{ham}) = \frac{1}{6} \approx 0.167$$" /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <strong className="text-amber-400">Important Distinction:</strong> Do not confuse <MathText text="$P(\text{free} \mid \text{spam}) = 0.75$" /> (likelihood: proportion of spam containing "free") with <MathText text="$P(\text{spam} \mid \text{free})$" /> (posterior: probability that an email with "free" is spam). They answer completely different questions!
        </div>
      </div>

      {/* ── Sections 5 & 6: Worked Classification Examples ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">5 & 6. Complete Worked Classification Walkthrough</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Example 1 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">Case 1: Single Feature ("free")</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">1 Feature</span>
            </div>

            <div className="space-y-1.5 font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-rose-300">
                <MathText text="$\text{Spam Score} = P(\text{spam}) P(\text{free}\mid\text{spam}) = (0.4)(0.75) = 0.30$" />
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-emerald-300">
                <MathText text="$\text{Ham Score} = P(\text{ham}) P(\text{free}\mid\text{ham}) = (0.6)(1/6) = 0.10$" />
              </div>
            </div>

            <div className="text-slate-300 space-y-1">
              <p className="font-semibold text-slate-200">Comparison: <span className="font-mono text-cyan-300">0.30 &gt; 0.10</span> <ArrowRight className="w-3 h-3 inline mx-1" /> Predict Spam!</p>
              <p className="text-slate-400 text-[11px]">Normalized Posterior Probabilities (Total = 0.40):</p>
              <div className="font-mono text-cyan-300 bg-slate-900/80 p-2 rounded border border-slate-800 text-center">
                <MathText text="$$P(\text{spam}\mid\text{free}) = \frac{0.30}{0.40} = 75\%, \quad P(\text{ham}\mid\text{free}) = 25\%$$" displayMode={true} />
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">Case 2: Multiple Features ("free" + "link")</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">2 Features</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Assume link probabilities: <MathText text="$P(\text{link}\mid\text{spam}) = 0.50$" />, <MathText text="$P(\text{link}\mid\text{ham}) = 0.20$" />.
            </p>

            <div className="space-y-1.5 font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-rose-300">
                <MathText text="$\text{Spam Score} = (0.4)(0.75)(0.50) = 0.150$" />
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800 text-emerald-300">
                <MathText text="$\text{Ham Score} = (0.6)(1/6)(0.20) = 0.020$" />
              </div>
            </div>

            <div className="text-slate-300 space-y-1">
              <p className="font-semibold text-slate-200">Comparison: <span className="font-mono text-purple-300">0.150 &gt; 0.020</span> <ArrowRight className="w-3 h-3 inline mx-1" /> Predict Spam!</p>
              <p className="text-slate-400 text-[11px]">Normalized Posterior Probabilities (Total = 0.170):</p>
              <div className="font-mono text-purple-300 bg-slate-900/80 p-2 rounded border border-slate-800 text-center">
                <MathText text="$$P(\text{spam}\mid x) = \frac{0.15}{0.17} \approx 88.2\%, \quad P(\text{ham}\mid x) \approx 11.8\%$$" displayMode={true} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-slate-200">
          General Bayes Decision Rule: <MathText text="$\hat{y} = \arg\max_y P(y) \prod_{j=1}^d P(x_j \mid y)$" />
        </div>
      </div>

      {/* ── Interactive Live Email Classifier Playground ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Live Naive Bayes Email Classifier Simulator</h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Interactive Tester
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Toggle email features and enable/disable Laplace smoothing to watch the Bayesian decision, normalized posterior probabilities, and log scores update in real time:
        </p>

        {/* Feature Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
            hasFree ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <span className="font-semibold flex items-center justify-between">
              Contains "free"
              <input type="checkbox" checked={hasFree} onChange={(e) => setHasFree(e.target.checked)} className="accent-cyan-500" />
            </span>
            <span className="text-[10px] text-slate-400 mt-2">P(free|spam)=0.75</span>
          </label>

          <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
            hasLink ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-200' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <span className="font-semibold flex items-center justify-between">
              Contains a Web Link
              <input type="checkbox" checked={hasLink} onChange={(e) => setHasLink(e.target.checked)} className="accent-indigo-500" />
            </span>
            <span className="text-[10px] text-slate-400 mt-2">P(link|spam)=0.50</span>
          </label>

          <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
            hasCrypto ? 'bg-rose-500/10 border-rose-500/40 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <span className="font-semibold flex items-center justify-between">
              Contains "crypto"
              <input type="checkbox" checked={hasCrypto} onChange={(e) => setHasCrypto(e.target.checked)} className="accent-rose-500" />
            </span>
            <span className="text-[10px] text-rose-400 mt-2">Unseen in spam (Count=0)</span>
          </label>

          <label className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
            useLaplace ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <span className="font-semibold flex items-center justify-between">
              Laplace Smoothing (+1)
              <input type="checkbox" checked={useLaplace} onChange={(e) => setUseLaplace(e.target.checked)} className="accent-emerald-500" />
            </span>
            <span className="text-[10px] text-emerald-400 mt-2">Prevents zero products</span>
          </label>
        </div>

        {/* Live Classifier Output Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">Spam Posterior P(Spam|x)</span>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-base text-rose-300 border border-slate-800">
              {(postSpam * 100).toFixed(1)}%
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${postSpam * 100}%` }} />
            </div>
            <div className="text-[10px] font-mono text-slate-400 text-center">Raw Score: {spamScore.toFixed(4)}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Ham Posterior P(Ham|x)</span>
            <div className="p-2.5 bg-slate-900 rounded-lg text-center font-mono text-base text-emerald-300 border border-slate-800">
              {(postHam * 100).toFixed(1)}%
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${postHam * 100}%` }} />
            </div>
            <div className="text-[10px] font-mono text-slate-400 text-center">Raw Score: {hamScore.toFixed(4)}</div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Predicted Label</span>
              <div className={`p-2.5 rounded-lg text-center font-bold text-sm border mt-1 ${
                postSpam > postHam
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {postSpam > postHam ? 'SPAM EMAIL ⚠️' : 'NOT SPAM (HAM) ✅'}
              </div>
            </div>
            <div className="p-2 bg-slate-900 rounded text-[11px] text-slate-400 font-mono text-center">
              Log Diff: {(logSpam - logHam).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Zero-probability trap warning when crypto is checked without Laplace */}
        {hasCrypto && !useLaplace && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2.5 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Zero-Probability Trap Triggered!</strong> Word “crypto” was never observed in training spam emails (<MathText text="$P(\text{crypto}\mid\text{spam}) = 0$" />).
              Multiplying this zero causes the entire spam score to immediately collapse to 0, even if the email contains all other strong spam signals!
              <em> Enable Laplace Smoothing above to fix this.</em>
            </div>
          </div>
        )}
      </div>

      {/* ── Section 7 & 8: Zero-Probability, Laplace Smoothing & Log Scores ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Section 7 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">7. The Zero-Probability Problem</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            If a feature was never observed for a class in training data, its empirical likelihood is zero:
          </p>
          <div className="p-2 bg-slate-950 rounded font-mono text-xs text-rose-400 text-center border border-slate-800">
            <MathText text="$$P(\text{link} \mid \text{spam}) = 0 \implies \text{Total Spam Score} = \cdots \times 0 = 0$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            This treats the class as completely impossible merely because of a finite sample size!
          </p>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">Laplace Smoothing (Add-1 Smoothing)</span>
            <p className="text-slate-300 leading-relaxed">
              Add 1 virtual observation to every feature numerator and 2 (for binary outcomes) to the denominator:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 text-center">
              <MathText text="$$P(x_j = 1 \mid y) = \frac{N_{jy} + 1}{N_y + 2}$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              If 0 of 4 spam emails contained a link: <MathText text="$$P(\text{link}\mid\text{spam}) = \frac{0 + 1}{4 + 2} = \frac{1}{6} \approx 0.167$$" />
            </p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-400">
            <Calculator className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">8. Why Use Log Scores?</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In documents with thousands of words, multiplying thousands of probabilities <MathText text="$p < 1$" /> results in microscopic numbers (e.g. <MathText text="$10^{-120}$" />). Computers round these to 0, causing fatal <strong>numerical floating-point underflow</strong>.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px]">Log Transformation Rule</span>
            <p className="text-slate-300 leading-relaxed">
              Because <MathText text="$\log(ab) = \log(a) + \log(b)$" />, taking logarithms converts products into sums:
            </p>
            <div className="p-2 bg-slate-900 rounded font-mono text-indigo-300 text-center">
              <MathText text="$$\text{log score}(y) = \log P(y) + \sum_{j=1}^d \log P(x_j \mid y)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              Since the logarithm is strictly monotonically increasing, <MathText text="$\arg\max$" /> is preserved with zero underflow risk!
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 9 & 10: Types, Strengths & Limitations ─────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-purple-400">
          <Table className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">9 & 10. Varieties, Strengths, and Limitations</h3>
        </div>

        {/* 3 Varieties */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold text-purple-300">Naive Bayes Type</th>
                <th className="py-2.5 px-3 font-semibold text-purple-300">Feature Values</th>
                <th className="py-2.5 px-3 font-semibold text-purple-300">Typical Real-World Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-cyan-300">Bernoulli Naive Bayes</td>
                <td className="py-2.5 px-3 text-slate-200">Binary boolean features (<MathText text="$x_j \in \{0, 1\}$" />)</td>
                <td className="py-2.5 px-3 text-slate-400">Word presence/absence in short messages or spam filtering.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-indigo-300">Multinomial Naive Bayes</td>
                <td className="py-2.5 px-3 text-slate-200">Discrete non-negative counts (<MathText text="$x_j \in \{0, 1, 2, \dots\}$" />)</td>
                <td className="py-2.5 px-3 text-slate-400">Document topic classification based on full word token frequencies.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-emerald-300">Gaussian Naive Bayes</td>
                <td className="py-2.5 px-3 text-slate-200">Continuous real values (<MathText text="$x_j \in \mathbb{R}$" />)</td>
                <td className="py-2.5 px-3 text-slate-400">Biometric signals, sensor measurements, financial ratios, temperature.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Strengths vs Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
              <Check className="w-3.5 h-3.5" />
              Core Strengths
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc pl-4">
              <li><strong>Extremely fast & lightweight:</strong> Training is purely closed-form counting, requires zero iterative gradient loops.</li>
              <li><strong>Scales gracefully:</strong> Handles thousands of vocabulary dimensions with minimal compute or memory overhead.</li>
              <li><strong>Robust with small data:</strong> Often outperforms complex deep networks on small sample text classification.</li>
              <li><strong>Interpretable probabilities:</strong> Every feature contribution can be directly inspected via its log likelihood ratio.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/20 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" />
              Limitations & Gotchas
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc pl-4">
              <li><strong>Unrealistic independence assumption:</strong> Correlated words (e.g. "San" and "Francisco") are treated as independent.</li>
              <li><strong>Zero-probability trap:</strong> Unseen tokens at test time require Laplace smoothing to avoid total collapse.</li>
              <li><strong>Poorly calibrated probabilities:</strong> While rank order for classification is often accurate, predicted raw probabilities tend to be overly confident near 0 or 1.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Quick Review Interactive Accordion ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-blue-400">
            <HelpCircle className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Quick Review: Check Your Knowledge</h3>
          </div>
          <span className="text-[11px] text-slate-400">Click to reveal explanations</span>
        </div>

        <div className="space-y-3">
          {/* Question 1 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q1')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold mt-0.5">Q1</span>
                <span>What is the prior probability <MathText text="$P(y)$" />?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q1');
                }}
              >
                {revealedAnswers['q1'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q1'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q1'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  <MathText text="$P(y)$" /> is the baseline probability indicating <strong>how common the class is in the world before observing any features</strong> of the new example (e.g. 40% of all incoming emails are spam).
                </p>
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q2')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold mt-0.5">Q2</span>
                <span>Why is the model called “naive”?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q2');
                }}
              >
                {revealedAnswers['q2'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q2'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q2'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  Because it makes the strong, often unrealistic assumption that <strong>all input features are mutually conditionally independent once the class is known</strong> (<MathText text="$P(x \mid y) = \prod_j P(x_j \mid y)$" />).
                </p>
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q3')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold mt-0.5">Q3</span>
                <span>Why is Laplace smoothing used?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q3');
                }}
              >
                {revealedAnswers['q3'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q3'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q3'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  To prevent an unseen feature from setting an entire class likelihood product to zero (<MathText text="$\dots \times 0 = 0$" />), which would inappropriately declare a class impossible due to sample sparsity.
                </p>
              </div>
            )}
          </div>

          {/* Question 4 */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 transition-all">
            <div className="flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleAnswer('q4')}>
              <div className="text-xs font-semibold text-slate-200 flex items-start gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold mt-0.5">Q4</span>
                <span>Why are log scores preferred in real implementations?</span>
              </div>
              <button
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 shrink-0 transition-colors flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAnswer('q4');
                }}
              >
                {revealedAnswers['q4'] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                <span>{revealedAnswers['q4'] ? 'Hide Answer' : 'Show Answer'}</span>
              </button>
            </div>

            {revealedAnswers['q4'] && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 animate-fade-in space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  Answer:
                </div>
                <p>
                  Multiplying dozens or hundreds of small probabilities creates numbers smaller than the machine epsilon, triggering numerical underflow to 0. Logarithms transform multiplication into addition (<MathText text="$\sum \log p_j$" />), preserving accuracy and order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
