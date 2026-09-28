import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Sliders,
  Scale,
  Cpu,
  Mail,
  HelpCircle
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3GenerativeVsDiscriminative: React.FC = () => {
  // ── Interactive 1: Bayes' Theorem & MAP Classifier Simulator ─────────
  const [priorSpam, setPriorSpam] = useState<number>(0.30);
  const [likSpam, setLikSpam] = useState<number>(0.60);
  const [likNotSpam, setLikNotSpam] = useState<number>(0.05);

  const priorNotSpam = Math.max(0, 1 - priorSpam);
  const unnormSpam = priorSpam * likSpam;
  const unnormNotSpam = priorNotSpam * likNotSpam;
  const totalEvidence = unnormSpam + unnormNotSpam;

  const postSpam = totalEvidence > 0 ? (unnormSpam / totalEvidence) : 0;
  const postNotSpam = totalEvidence > 0 ? (unnormNotSpam / totalEvidence) : 0;

  // ── Interactive 2: Logistic Regression Discriminative Scorer ──────────
  const [theta0, setTheta0] = useState<number>(-5.0);
  const [theta1, setTheta1] = useState<number>(0.8);
  const [theta2, setTheta2] = useState<number>(0.04);
  const [featX1, setFeatX1] = useState<number>(6);
  const [featX2, setFeatX2] = useState<number>(90);

  const linearScoreZ = theta0 + theta1 * featX1 + theta2 * featX2;
  const sigmoidProb = 1 / (1 + Math.exp(-linearScoreZ));

  // ── Interactive 3: Ng & Jordan (2001) Sample Complexity Explorer ──────
  const [sampleSizeN, setSampleSizeN] = useState<number>(60);
  // Generative: fast convergence (O(log d)), asymptotic ceiling due to assumption bias
  const genError = Math.round(15 + 45 / Math.pow(sampleSizeN, 0.45));
  // Discriminative: slower convergence (O(d)), achieves strictly lower asymptotic error
  const discError = Math.round(8 + 80 / Math.pow(sampleSizeN, 0.55));

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Module Roadmap ─────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Roadmap</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Explore the mathematical, probabilistic, and geometric distinctions between generative and discriminative classification:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
          {[
            { num: 1, title: 'What Supervised Learning Learns' },
            { num: 2, title: 'Discriminative Learning & Boundaries' },
            { num: 3, title: 'Generative Learning & Class Priors' },
            { num: 4, title: "Deriving Bayes' Theorem" },
            { num: 5, title: 'Complete Bayesian Classification & MAP' },
            { num: 6, title: 'Generative vs. Discriminative Comparison' },
            { num: 7, title: 'Connection to GDA & Naive Bayes' }
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

      {/* ── What Is Supervised Learning Trying to Learn? ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <HelpCircle className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">What Is Supervised Learning Trying to Learn?</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In supervised classification, every training observation consists of an input feature vector <MathText text="$x \in \mathbb{R}^d$" /> and a ground-truth label <MathText text="$y \in \{0, 1\}$" />:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs space-y-1">
          <div className="text-cyan-300">
            <MathText text="$$x = (\text{contains 'free'}, \text{contains 'offer'}) = (1, 1)$$" displayMode={true} />
          </div>
          <div className="text-slate-400 text-[11px] font-sans">
            Target Labels: <strong className="text-rose-400 font-mono">y = 1</strong> (Spam) &nbsp;|&nbsp; <strong className="text-emerald-400 font-mono">y = 0</strong> (Not spam)
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A training dataset of <MathText text="$N$" /> pairs is written <MathText text="$\mathcal{D} = \{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(N)}, y^{(N)})\}$" />. When presented with a novel, unlabeled input <MathText text="$x$" />, the learning paradigm hinges fundamentally on which conditional probability question it seeks to answer:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-indigo-400">1. The Discriminative Question: <MathText text="$P(y \mid x)$" /></span>
            <p className="text-slate-300 leading-relaxed">
              "Given these specific observed features <MathText text="$x$" />, what is the probability that the label is <MathText text="$y$" />?"
            </p>
            <span className="text-[11px] text-slate-500 block pt-1">Directly models the target class posterior.</span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-400">2. The Generative Question: <MathText text="$P(x \mid y)$" /></span>
            <p className="text-slate-300 leading-relaxed">
              "If the label were known to be <MathText text="$y$" />, how likely would it be to observe these features <MathText text="$x$" />?"
            </p>
            <span className="text-[11px] text-slate-500 block pt-1">Models the physical data-generation mechanism for each class.</span>
          </div>
        </div>
      </div>

      {/* ── Discriminative Learning ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400">
          <Zap className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Discriminative Learning</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A <strong>discriminative model</strong> directly estimates <MathText text="$P(y \mid x)$" /> without attempting to model the underlying distribution of features <MathText text="$P(x)$" />. For example, if a model evaluates <MathText text="$P(\text{Spam} \mid x) = 0.90$" /> and <MathText text="$P(\text{Not spam} \mid x) = 0.10$" />, it immediately decides Spam.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-indigo-300">Decision Boundaries & Logistic Regression</span>
          <p className="text-slate-300 leading-relaxed">
            For binary classification, the decision threshold occurs at the critical boundary where <MathText text="$P(y=1 \mid x) = 0.50$" />. Logistic regression computes a raw linear logit score <MathText text="$z$" /> and passes it through the sigmoid activation:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300">
            <MathText text="$$z = \theta_0 + \theta_1 x_1 + \theta_2 x_2, \qquad P(y=1 \mid x) = \sigma(z) = \frac{1}{1 + e^{-z}}$$" displayMode={true} />
          </div>
          <p className="text-slate-300 leading-relaxed">
            Consider weights <MathText text="$\theta_0 = -5.0, \theta_1 = 0.8, \theta_2 = 0.04$" /> with features <MathText text="$x_1 = 6$" /> (Study Hours) and <MathText text="$x_2 = 90$" /> (Attendance):
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$z = -5 + 0.8(6) + 0.04(90) = -5 + 4.8 + 3.6 = \mathbf{3.4} \implies \sigma(3.4) \approx \mathbf{0.9677}$$" displayMode={true} />
          </div>
          <p className="text-slate-400 text-[11px]">
            Since <MathText text="$0.9677 > 0.50$" />, the model predicts Class 1. Notice the discriminative model never had to describe how study hours or attendance were distributed across the population—it learned only the separating boundary.
          </p>
        </div>
      </div>

      {/* ── Interactive 1: Logistic Regression Discriminative Scorer ───── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Discriminative Logistic Scorer</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Linear Logit & Sigmoid
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Tweak weights <MathText text="$\theta$" /> and feature inputs <MathText text="$x$" /> to verify the linear logit <MathText text="$z$" /> and posterior probability <MathText text="$\sigma(z)$" />:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
          <div className="space-y-1">
            <label className="text-slate-400 font-sans">Bias (<MathText text="$\theta_0$" />):</label>
            <input
              type="number"
              step="0.5"
              value={theta0}
              onChange={(e) => setTheta0(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center text-cyan-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-sans">Weight (<MathText text="$\theta_1$" />):</label>
            <input
              type="number"
              step="0.1"
              value={theta1}
              onChange={(e) => setTheta1(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center text-cyan-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-sans">Weight (<MathText text="$\theta_2$" />):</label>
            <input
              type="number"
              step="0.01"
              value={theta2}
              onChange={(e) => setTheta2(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center text-cyan-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-sans">Feature (<MathText text="$x_1$" />):</label>
            <input
              type="number"
              value={featX1}
              onChange={(e) => setFeatX1(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center text-emerald-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-slate-400 font-sans">Feature (<MathText text="$x_2$" />):</label>
            <input
              type="number"
              value={featX2}
              onChange={(e) => setFeatX2(Number(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-center text-emerald-300"
            />
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-300">
            Logit score: <MathText text={`$z = ${linearScoreZ.toFixed(2)}$`} />
          </div>
          <div className="text-sm font-bold text-amber-300">
            <MathText text={`$P(y=1 \\mid x) = \\sigma(z) = ${(sigmoidProb * 100).toFixed(2)}\\%$`} /> &nbsp;
            <span className={`px-2 py-0.5 rounded text-xs ${sigmoidProb >= 0.5 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
              Predict: {sigmoidProb >= 0.5 ? 'Class 1' : 'Class 0'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Generative Learning ────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Generative Learning</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          A <strong>generative model</strong> learns how each class generates data by estimating the <em>class-conditional feature distribution</em> <MathText text="$P(x \mid y)$" /> along with the <em>class prior</em> <MathText text="$P(y)$" />.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-300">Class-Conditional Likelihood: <MathText text="$P(x \mid y)$" /></span>
            <p className="text-slate-300 leading-relaxed">
              Suppose 80 of 100 Spam emails contain the word "free", but only 10 of 100 Not spam emails contain it:
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-xs space-y-1">
              <div className="text-emerald-400"><MathText text="$$P(\text{'free'} \mid \text{Spam}) = 80/100 = \mathbf{0.80}$$" displayMode={true} /></div>
              <div className="text-slate-400"><MathText text="$$P(\text{'free'} \mid \text{Not spam}) = 10/100 = \mathbf{0.10}$$" displayMode={true} /></div>
            </div>
            <p className="text-slate-400 text-[11px]">The token "free" is 8 times more compatible with Spam generation.</p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-amber-300">Base Rate Class Prior: <MathText text="$P(y)$" /></span>
            <p className="text-slate-300 leading-relaxed">
              The prior represents the overall frequency of each class in the population before observing the input:
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-xs space-y-1">
              <div className="text-amber-300"><MathText text="$$P(\text{Spam}) = 300 / 1000 = \mathbf{0.30}$$" displayMode={true} /></div>
              <div className="text-slate-400"><MathText text="$$P(\text{Not spam}) = 700 / 1000 = \mathbf{0.70}$$" displayMode={true} /></div>
            </div>
            <p className="text-slate-400 text-[11px]">Enables data simulation: first sample <MathText text="$y \sim P(y)$" />, then sample <MathText text="$x \sim P(x \mid y)$" />.</p>
          </div>
        </div>
      </div>

      {/* ── Bayes’ Theorem from the Beginning ──────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scale className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Deriving Bayes’ Theorem from First Principles</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The definition of conditional probability states that <MathText text="$P(A \mid B) \ne P(B \mid A)$" />. For example, if 60 students passed an exam and 48 of them studied <MathText text="$>5$" /> hours, <MathText text="$P(\text{studied}>5 \mid \text{passed}) = 48/60 = 0.8$" />, whereas <MathText text="$P(\text{passed} \mid \text{studied}>5)$" /> evaluates a completely different denominator.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-200">The 3-Step Algebraic Derivation</span>
          <p className="text-slate-300 leading-relaxed">
            The joint probability of both events occurring <MathText text="$P(A \cap B)$" /> can be factorized in two symmetrically valid ways:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-cyan-300 space-y-1 text-xs">
            <div><MathText text="$$P(A \cap B) = P(A \mid B) P(B)$$" displayMode={true} /></div>
            <div><MathText text="$$P(A \cap B) = P(B \mid A) P(A)$$" displayMode={true} /></div>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Setting the right-hand sides equal and dividing through by <MathText text="$P(B)$" />:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-emerald-300 text-xs">
            <MathText text="$$P(A \mid B) P(B) = P(B \mid A) P(A) \implies P(A \mid B) = \frac{P(B \mid A) P(A)}{P(B)}$$" displayMode={true} />
          </div>
          <p className="text-slate-300 leading-relaxed">
            Substituting class label <MathText text="$y$" /> for <MathText text="$A$" /> and observed feature vector <MathText text="$x$" /> for <MathText text="$B$" /> yields the master engine of generative classification:
          </p>
          <div className="bg-slate-900 p-2.5 rounded-lg font-mono text-center text-amber-300 text-xs">
            <MathText text="$$P(y \mid x) = \frac{P(x \mid y) P(y)}{P(x)} = \frac{P(x \mid y) P(y)}{\sum_{c} P(x \mid c) P(c)}$$" displayMode={true} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Term</th>
                <th className="py-2 px-3 text-amber-300">Standard Name</th>
                <th className="py-2 px-3 text-slate-300">Machine Learning Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300 font-mono"><MathText text="$P(y \mid x)$" /></td>
                <td className="py-2 px-3 font-semibold text-cyan-300">Posterior</td>
                <td className="py-2 px-3 text-slate-300">Probability of the class <em>after</em> inspecting the evidence features.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300 font-mono"><MathText text="$P(x \mid y)$" /></td>
                <td className="py-2 px-3 font-semibold text-emerald-300">Likelihood</td>
                <td className="py-2 px-3 text-slate-300">How plausible the features are under the hypothesis that class <MathText text="$y$" /> produced them.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-amber-300 font-mono"><MathText text="$P(y)$" /></td>
                <td className="py-2 px-3 font-semibold text-amber-300">Prior</td>
                <td className="py-2 px-3 text-slate-300">Baseline prevalence of the class in the dataset <em>before</em> observing features.</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-purple-300 font-mono"><MathText text="$P(x)$" /></td>
                <td className="py-2 px-3 font-semibold text-purple-300">Evidence</td>
                <td className="py-2 px-3 text-slate-300">Total marginal probability of observing features <MathText text="$x$" /> across all possible classes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Complete Bayesian Classification Example ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400">
          <Mail className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Complete Bayesian Classification Worked Example</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose a new email contains both "free" and "offer" (<MathText text="$x$" />). Training statistics give:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block">Prior P(Spam)</span>
            <span className="text-cyan-300 font-bold">0.30</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block">Prior P(Not spam)</span>
            <span className="text-cyan-300 font-bold">0.70</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block">Likelihood P(x|Spam)</span>
            <span className="text-emerald-300 font-bold">0.60</span>
          </div>
          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block">Likelihood P(x|Not spam)</span>
            <span className="text-emerald-300 font-bold">0.05</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-900 rounded-lg space-y-1">
              <span className="text-rose-400 font-sans font-bold">1. Unnormalized Spam Score:</span>
              <div className="text-cyan-300">
                <MathText text="$$P(x \mid \text{Spam}) P(\text{Spam}) = 0.60 \times 0.30 = \mathbf{0.180}$$" displayMode={true} />
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg space-y-1">
              <span className="text-cyan-400 font-sans font-bold">2. Unnormalized Not-Spam Score:</span>
              <div className="text-cyan-300">
                <MathText text="$$P(x \mid \text{Not}) P(\text{Not}) = 0.05 \times 0.70 = \mathbf{0.035}$$" displayMode={true} />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg space-y-1">
            <span className="text-purple-400 font-sans font-bold">3. Marginal Evidence Denominator:</span>
            <div className="text-emerald-300">
              <MathText text="$$P(x) = 0.180 + 0.035 = \mathbf{0.215}$$" displayMode={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-center">
              <span className="text-emerald-400 font-sans font-bold block mb-1">Normalized Posterior P(Spam | x):</span>
              <MathText text="$$P(\text{Spam} \mid x) = \frac{0.180}{0.215} \approx \mathbf{83.72\%}$$" displayMode={true} />
            </div>
            <div className="p-3 bg-slate-900 rounded-lg text-center">
              <span className="text-slate-400 font-sans font-bold block mb-1">Normalized Posterior P(Not spam | x):</span>
              <MathText text="$$P(\text{Not} \mid x) = \frac{0.035}{0.215} \approx \mathbf{16.28\%}$$" displayMode={true} />
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
          <strong className="text-amber-300">The MAP Shortcut (Maximum A Posteriori):</strong> Notice that the evidence denominator <MathText text="$P(x) = 0.215$" /> is identical for both classes. To decide which label wins, we can skip the denominator and simply choose the larger numerator score:
          <div className="bg-slate-900 p-2 rounded text-center font-mono text-cyan-300 mt-1">
            <MathText text="$$\hat{y}_{\text{MAP}} = \arg\max_{y} P(x \mid y) P(y) \implies \arg\max(0.180, 0.035) = \mathbf{\text{Spam}}$$" displayMode={true} />
          </div>
        </div>
      </div>

      {/* ── Interactive 2: Bayes’ Theorem & MAP Classifier Simulator ───── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Bayesian Classifier Simulator</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Live MAP & Posterior
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Slide the prior prevalence and likelihoods to observe how the evidence denominator normalizes joint scores into valid posteriors:
        </p>

        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Spam Prior Prevalence (<MathText text="$P(\text{Spam})$" />):</span>
              <span className="font-mono text-cyan-300 font-bold">{(priorSpam * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={priorSpam}
              onChange={(e) => setPriorSpam(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Likelihood in Spam (<MathText text="$P(x \mid \text{Spam})$" />):</span>
                <span className="font-mono text-emerald-300 font-bold">{(likSpam * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.0"
                step="0.05"
                value={likSpam}
                onChange={(e) => setLikSpam(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Likelihood in Not-Spam (<MathText text="$P(x \mid \text{Not})$" />):</span>
                <span className="font-mono text-purple-300 font-bold">{(likNotSpam * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.0"
                step="0.05"
                value={likNotSpam}
                onChange={(e) => setLikNotSpam(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">Posterior P(Spam | x)</span>
            <span className="text-base font-bold text-rose-400">{(postSpam * 100).toFixed(2)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postSpam * 100}%` }} className="bg-rose-500 h-full" />
            </div>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 font-sans block mb-1">Posterior P(Not spam | x)</span>
            <span className="text-base font-bold text-cyan-400">{(postNotSpam * 100).toFixed(2)}%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div style={{ width: `${postNotSpam * 100}%` }} className="bg-cyan-500 h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Generative versus Discriminative Learning ──────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400">
          <Activity className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Generative versus Discriminative Learning</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2.5 px-3 text-cyan-300">Comparison Dimension</th>
                <th className="py-2.5 px-3 text-indigo-300">Discriminative Models</th>
                <th className="py-2.5 px-3 text-emerald-300">Generative Models</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Core Mathematical Target</td>
                <td className="py-2 px-3 text-indigo-300 font-mono"><MathText text="$P(y \mid x)$" /></td>
                <td className="py-2 px-3 text-emerald-300 font-mono"><MathText text="$P(x \mid y)$" /> and <MathText text="$P(y)$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Central Intuitive Question</td>
                <td className="py-2 px-3 text-slate-300">Which label best fits these observed features?</td>
                <td className="py-2 px-3 text-slate-300">Which class could have generated these features?</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Primary Optimization Focus</td>
                <td className="py-2 px-3 text-slate-300">Drawing an optimal decision boundary separating classes</td>
                <td className="py-2 px-3 text-slate-300">Describing the probability distribution of each class cloud</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Origin of Decision Boundary</td>
                <td className="py-2 px-3 text-slate-300">Learned directly or via parameterized score functions</td>
                <td className="py-2 px-3 text-slate-300">Derived indirectly where class posterior distributions intersect</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-slate-400">Data Simulation Capability</td>
                <td className="py-2 px-3 text-slate-400">Cannot sample synthetic feature vectors</td>
                <td className="py-2 px-3 text-emerald-300 font-medium">Can simulate realistic synthetic data instances</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-amber-300">The Geometric Point-Clouds Analogy</span>
          <p className="text-slate-300 leading-relaxed">
            Imagine two distinct clusters of points scattered across a 2D plane:
          </p>
          <ul className="text-slate-300 space-y-1 list-disc list-inside">
            <li>A <strong>discriminative model</strong> ignores the internal density of the clusters and focuses all of its parameter capacity solely on carving the separating border between them.</li>
            <li>A <strong>generative model</strong> carefully measures the centroid, variance, spread, and shape of each cluster cloud independently, then uses Bayes' theorem to ask which cloud most likely produced an incoming point.</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-indigo-400">Discriminative Strengths</span>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              <li>Directly optimizes classification accuracy and conditional likelihood.</li>
              <li>Capable of fitting complex non-linear boundaries without distributional priors.</li>
              <li>Lower asymptotic classification error on large sample sizes.</li>
            </ul>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-400">Generative Strengths</span>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              <li>Handles missing input values gracefully by marginalizing over missing dimensions.</li>
              <li>Approaches asymptotic performance rapidly on small datasets (<MathText text="$\mathcal{O}(\log d)$" /> sample complexity).</li>
              <li>Can naturally detect outliers and synthesize new data instances.</li>
            </ul>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200">
          <strong>Critical Warning:</strong> If the generative model's distributional assumptions (e.g. Gaussian bell shapes or feature independence) deviate heavily from reality, its predictions will remain systematically biased even with infinite training data!
        </div>
      </div>

      {/* ── Interactive 3: Ng & Jordan Sample Complexity Crossover ──────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <TrendingDown className="w-4 h-4" />
            <h3 className="text-base font-bold text-slate-100">Interactive — Training Sample Size vs. Error Rate</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            N = {sampleSizeN} samples
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Slide the training sample size <MathText text="$N$" /> to see the theoretical crossover proved by Ng & Jordan (2001) between Generative (Naive Bayes / GDA) and Discriminative (Logistic Regression):
        </p>

        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Training Samples (<MathText text="$N$" />):</span>
            <span className="font-mono text-cyan-300 font-bold">{sampleSizeN}</span>
          </div>
          <input
            type="range"
            min="5"
            max="300"
            step="5"
            value={sampleSizeN}
            onChange={(e) => setSampleSizeN(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>N = 5 (Small Data)</span>
            <span>N = 75 (Crossover Point)</span>
            <span>N = 300 (Large Data)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Generative Error Rate</span>
            <span className="text-base font-bold font-mono text-emerald-400">{genError}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {sampleSizeN < 70 ? 'Superior on small data' : 'Asymptotic ceiling hit'}
            </span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Discriminative Error Rate</span>
            <span className="text-base font-bold font-mono text-indigo-400">{discError}%</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {sampleSizeN >= 70 ? 'Superior on large data' : 'Needs more data to fit'}
            </span>
          </div>
        </div>
      </div>

      {/* ── Connection to GDA and Naive Bayes ───────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <Cpu className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Connection to GDA and Naive Bayes</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Both <strong>Gaussian Discriminant Analysis (GDA)</strong> and <strong>Naive Bayes</strong> are generative classifiers: both estimate class priors <MathText text="$P(y)$" /> and class-conditional likelihoods <MathText text="$P(x \mid y)$" />, using Bayes' theorem to infer <MathText text="$P(y \mid x)$" />. Their only difference is how they model the likelihood <MathText text="$P(x \mid y)$" />:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-cyan-300">1. Gaussian Discriminant Analysis (GDA)</span>
            <p className="text-slate-300 leading-relaxed">
              Designed for continuous numerical features (e.g. blood pressure, income, glucose). Models <MathText text="$P(x \mid y)$" /> as a multivariate Gaussian bell curve with class mean <MathText text="$\mu_k$" /> and covariance <MathText text="$\Sigma$" />:
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-cyan-300 text-[11px]">
              <MathText text="$$x \mid y=k \sim \mathcal{N}(\mu_k, \Sigma_k)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              Example: Healthy patients have blood pressure centered at 120; Sick patients at 158. A new measurement of 150 evaluates which Gaussian density is taller.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="font-semibold text-emerald-300">2. Naive Bayes</span>
            <p className="text-slate-300 leading-relaxed">
              Designed for text, word counts, and categorical indicators. Factors the joint likelihood into univariate products assuming conditional independence:
            </p>
            <div className="bg-slate-900 p-2 rounded font-mono text-center text-emerald-300 text-[11px]">
              <MathText text="$$P(x_1, x_2 \mid y) \approx P(x_1 \mid y) \cdot P(x_2 \mid y)$$" displayMode={true} />
            </div>
            <p className="text-slate-400 text-[11px]">
              Example: For "free" and "offer", <MathText text="$P(\text{free}, \text{offer} \mid \text{Spam}) = 0.8 \times 0.7 = 0.56$" />, while for Not spam it is <MathText text="$0.1 \times 0.05 = 0.005$" />.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden font-mono">
            <thead className="bg-slate-950 text-slate-200 border-b border-slate-800 font-sans">
              <tr>
                <th className="py-2 px-3 text-cyan-300">Method</th>
                <th className="py-2 px-3 text-amber-300">Natural Data Modality</th>
                <th className="py-2 px-3 text-emerald-300">Likelihood Model <MathText text="$P(x \mid y)$" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/50 font-sans">
              <tr>
                <td className="py-2 px-3 font-semibold text-cyan-300 font-mono">GDA (LDA / QDA)</td>
                <td className="py-2 px-3 text-slate-300">Continuous numerical features</td>
                <td className="py-2 px-3 text-emerald-300 font-mono">Gaussian density <MathText text="$\mathcal{N}(x \mid \mu_k, \Sigma_k)$" /></td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold text-emerald-300 font-mono">Naive Bayes</td>
                <td className="py-2 px-3 text-slate-300">Text words, binary flags, categorical counts</td>
                <td className="py-2 px-3 text-emerald-300 font-mono">Product of univariate likelihoods <MathText text="$\prod_j P(x_j \mid y)$" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Complete Module Recap ───────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-cyan-400">
          <CheckCircle2 className="w-4 h-4" />
          <h3 className="text-base font-bold text-slate-100">Module Recap</h3>
        </div>
        <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
          <li><strong>Supervised learning</strong> maps input feature vectors <MathText text="$x$" /> to known target labels <MathText text="$y$" />.</li>
          <li><strong>Discriminative learning</strong> directly estimates the posterior conditional probability <MathText text="$P(y \mid x)$" />.</li>
          <li><strong>Generative learning</strong> models the class-conditional density <MathText text="$P(x \mid y)$" /> and the class prior <MathText text="$P(y)$" />.</li>
          <li><strong>Bayes’ theorem</strong> connects them: <MathText text="$P(y \mid x) = \frac{P(x \mid y) P(y)}{P(x)}$" />.</li>
          <li><strong>MAP classification</strong> chooses the class maximizing <MathText text="$P(x \mid y)P(y)$" /> without needing evidence <MathText text="$P(x)$" />.</li>
          <li><strong>Gaussian Discriminant Analysis</strong> models continuous features with Gaussian distributions.</li>
          <li><strong>Naive Bayes</strong> models discrete/text features by assuming conditional independence among features given the class.</li>
        </ol>
      </div>
    </div>
  );
};
