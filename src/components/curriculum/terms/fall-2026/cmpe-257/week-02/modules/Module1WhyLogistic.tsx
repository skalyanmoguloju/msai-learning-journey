import React, { useState } from 'react';
import {
  BookOpen,
  Sliders,
  Calculator,
  HelpCircle,
  FileText,
  AlertTriangle,
  Check,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { MathText } from '../../../../../common';

type SubTab = 'lesson' | 'interact' | 'worked' | 'quiz' | 'glossary';

export const Module1WhyLogistic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('lesson');

  // Interactive A State: Move linear score
  const [zSlide, setZSlide] = useState<number>(0.0);
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const pA = sigmoid(zSlide);
  const classA = pA >= 0.5 ? 'Class 1' : 'Class 0';

  // Interactive B State: Line vs Probability
  const [xSlide, setXSlide] = useState<number>(4.0);
  const linearOut = -0.5 + 0.2 * xSlide;
  const sigOut = sigmoid(-4.0 + xSlide);
  const isLinearInvalid = linearOut < 0 || linearOut > 1;

  // Interactive C State: Threshold comparison
  const [pSlide, setPSlide] = useState<number>(0.62);
  const [tSlide, setTSlide] = useState<number>(0.50);
  const predC = pSlide >= tSlide ? 'Class 1' : 'Class 0';

  // Interactive D State: Odds & Logit
  const [oddsProb, setOddsProb] = useState<number>(0.75);
  const oddsVal = oddsProb / (1 - oddsProb);
  const logitVal = Math.log(oddsVal);

  // Worked Example Understanding State
  const [showWorkedAns, setShowWorkedAns] = useState(false);

  // Quiz State
  const [q1Selected, setQ1Selected] = useState<string | null>(null);
  const [showQ1Expl, setShowQ1Expl] = useState(false);

  const [q2Selected, setQ2Selected] = useState<string | null>(null);
  const [showQ2Expl, setShowQ2Expl] = useState(false);

  const [q3Selected, setQ3Selected] = useState<string | null>(null);
  const [showQ3Expl, setShowQ3Expl] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Sub-navigation Bar ────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 flex flex-wrap gap-1 shadow-sm">
        <button
          onClick={() => setActiveTab('lesson')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'lesson'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Lesson</span>
        </button>

        <button
          onClick={() => setActiveTab('interact')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'interact'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Sandboxes</span>
        </button>

        <button
          onClick={() => setActiveTab('worked')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'worked'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Worked Examples</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Quick Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('glossary')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            activeTab === 'glossary'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Glossary &amp; Formulas</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── TAB 1: LESSON ────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'lesson' && (
        <div className="space-y-6">
          {/* Learning Goal Callout */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Learning Goal</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              By the end of this module, you will be able to explain—not just repeat—how logistic regression takes an unrestricted linear score and converts it into a calibrated probability between 0 and 1 for optimal binary decision-making.
            </p>
            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
              <strong>The story in one sentence:</strong> Linear regression gives an unrestricted score; logistic regression adds the sigmoid so that score becomes a valid probability between 0 and 1.
            </div>
          </div>

          {/* Section 1: What is binary classification? */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100">1. What is Binary Classification?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In supervised learning, the model receives input features and learns to predict an answer. In <strong>binary classification</strong>, the answer has only two possible category outcomes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-cyan-400">Input <MathText text="$(x)$" /></span>
                <p className="text-xs text-slate-400">The information given to the model. Example: hours studied.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-amber-400">Label <MathText text="$(y)$" /></span>
                <p className="text-xs text-slate-400">The correct category: <MathText text="$y=1$" /> means pass and <MathText text="$y=0$" /> means fail.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400">Prediction <MathText text="$\hat{y}$" /></span>
                <p className="text-xs text-slate-400">The discrete class predicted by the trained model: 0 or 1.</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              Everyday machine learning examples include: <em>spam vs. not spam</em>, <em>disease vs. no disease</em>, <em>fraud vs. legitimate transaction</em>, and <em>pass vs. fail</em>.
            </p>
          </div>

          {/* Section 2: Why not use linear regression? */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100">2. Why Not Use Linear Regression?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Linear regression produces a straight weighted sum:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
              <MathText text="$$\hat{y} = \theta_0 + \theta_1 x$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose <MathText text="$x$" /> represents hours studied, and the trained linear model learned the parameters <MathText text="$\hat{y} = -0.5 + 0.2x$" />:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-400 font-sans">For studying 2 hours (<MathText text="$x=2$" />):</span>
                <div className="text-rose-400 text-sm font-bold">
                  <MathText text="$\hat{y} = -0.5 + 0.2(2) = -0.1$" />
                </div>
                <span className="text-[11px] text-rose-400 font-sans">Negative probability! Impossible.</span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1 font-mono">
                <span className="text-slate-400 font-sans">For studying 10 hours (<MathText text="$x=10$" />):</span>
                <div className="text-rose-400 text-sm font-bold">
                  <MathText text="$\hat{y} = -0.5 + 0.2(10) = 1.5$" />
                </div>
                <span className="text-[11px] text-rose-400 font-sans">150% probability! Impossible.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300">
              <strong>The Problem:</strong> If <MathText text="$\hat{y}$" /> is treated as a probability, <MathText text="$-0.1$" /> is a negative probability and <MathText text="$1.5$" /> is a 150% probability. Both violate Kolmogorov's probability axioms. Linear regression is useful for continuous numeric targets (real estate pricing, temperature), but its unbounded output fails for classification.
            </div>
          </div>

          {/* Section 3: What should a classification model output? */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100">3. What Should a Classification Model Output?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A useful model should first report how confident it is as a calibrated probability:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2 font-semibold">Model Output</th>
                    <th className="pb-2 font-semibold">Meaning</th>
                    <th className="pb-2 font-semibold">Class Decision (Threshold 0.5)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-300">0.20</td>
                    <td className="py-2.5">20% chance of class 1</td>
                    <td className="py-2.5 font-semibold text-slate-400">Class 0</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-300">0.50</td>
                    <td className="py-2.5">Uncertain / tie</td>
                    <td className="py-2.5 font-semibold text-amber-300">Class 1 by convention</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-cyan-300">0.90</td>
                    <td className="py-2.5">90% chance of class 1</td>
                    <td className="py-2.5 font-semibold text-emerald-400">Class 1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Notice that <strong>probability</strong> and the final <strong>class</strong> are distinct concepts:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Probability:</strong> a continuous number such as 0.82.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Class:</strong> a discrete decision such as 1.</span>
              </li>
            </ul>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300">
              <strong>Threshold is a decision choice:</strong> The standard threshold is 0.5, but a medical diagnostic model might select a lower threshold (e.g. 0.2) to minimize dangerous false negatives (missing sick patients).
            </div>
          </div>

          {/* Section 4: The logistic-regression pipeline */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100">4. The Logistic-Regression Pipeline</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Logistic regression keeps the weighted-sum concept from linear regression, but inserts a smooth sigmoid conversion step:
            </p>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-cyan-300 overflow-x-auto">
              Features <MathText text="$(x)$" /> &rarr; Weighted Score <MathText text="$(z = \theta^T x)$" /> &rarr; Sigmoid &rarr; Probability <MathText text="$(p)$" /> &rarr; Class Decision
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-indigo-400">Step A: Weighted Linear Score</span>
                <div className="font-mono text-xs text-cyan-300">
                  <MathText text="$$z = \theta_0 + \theta_1 x_1 + \cdots + \theta_d x_d = \theta^T x$$" displayMode={true} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A positive <MathText text="$z$" /> is evidence toward class 1. A negative <MathText text="$z$" /> is evidence toward class 0. However, <MathText text="$z$" /> itself is unbounded on <MathText text="$(-\infty, +\infty)$" />.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400">Step B: Sigmoid Conversion</span>
                <div className="font-mono text-xs text-cyan-300">
                  <MathText text="$$\sigma(z) = \frac{1}{1 + e^{-z}}$$" displayMode={true} />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Logistic regression defines its hypothesis as:
                  <br />
                  <MathText text="$$h_\theta(x) = \sigma(\theta^T x) = P(y=1 \mid x; \theta)$$" displayMode={true} />
                  Read this as: <em>"The model's output is the estimated probability that input x belongs to class 1."</em>
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: The decision boundary */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100">5. The Decision Boundary</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              With a threshold of 0.5, the model predicts class 1 when:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
              <MathText text="$$h_\theta(x) \geq 0.5$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The sigmoid equals 0.5 precisely when its input <MathText text="$z$" /> equals 0. Therefore, the decision boundary is the hyperplane:
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
              <MathText text="$$\theta^T x = 0$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              For one feature, suppose <MathText text="$z = -4 + x$" />. The boundary occurs when <MathText text="$-4 + x = 0 \implies x = 4$" />. The model flips its class decision at 4 hours studied!
            </p>
          </div>

          {/* Section 6: Why the name logistic regression? */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-100">6. Why the Name "Logistic Regression"?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              It is used for classification, but internally it predicts a continuous probability before applying a threshold for the discrete class decision. The word <strong>regression</strong> refers to estimating that continuous conditional probability distribution from features.
            </p>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
              <strong>Do not memorize the name as a contradiction:</strong> It is a classification algorithm whose mathematical engine predicts a continuous probability.
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── TAB 2: INTERACTIVE SANDBOXES ─────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'interact' && (
        <div className="space-y-6">
          {/* Interactive A: Move the Linear Score */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Sandbox A</span>
              <h4 className="text-sm font-bold text-slate-100">Move the Linear Score (Raw Score &rarr; Probability)</h4>
              <p className="text-xs text-slate-400 mt-1">
                Use the slider to see how the raw score <MathText text="$z$" /> becomes a probability. Notice that <MathText text="$z$" /> can be negative or large, but the sigmoid output stays strictly between 0 and 1.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Raw score <MathText text="$(z)$" />:</span>
                <span className="text-cyan-400 font-mono text-sm">{zSlide >= 0 ? `+${zSlide.toFixed(1)}` : zSlide.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="0.1"
                value={zSlide}
                onChange={e => setZSlide(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="text-slate-400">Sigmoid Probability <MathText text="$p = \sigma(z)$" />:</span>
                  <div className="text-lg font-mono font-bold text-cyan-400">{pA.toFixed(3)}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="text-slate-400">Prediction (Threshold 0.5):</span>
                  <div className={`text-lg font-mono font-bold ${pA >= 0.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {classA}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Class 0 evidence (<MathText text="$p \to 0$" />)</span>
                  <span>50/50 (<MathText text="$z=0$" />)</span>
                  <span>Class 1 evidence (<MathText text="$p \to 1$" />)</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 transition-all"
                    style={{ width: `${pA * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive B: See Why a Line is Not a Probability */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Sandbox B</span>
              <h4 className="text-sm font-bold text-slate-100">See Why a Line is Not a Probability</h4>
              <p className="text-xs text-slate-400 mt-1">
                Compare linear regression output <MathText text="$\hat{y} = -0.5 + 0.2x$" /> with sigmoid output <MathText text="$\sigma(-4+x)$" />. Notice how the line escapes the probability range.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Input hours studied <MathText text="$(x)$" />:</span>
                <span className="text-amber-400 font-mono text-sm">{xSlide.toFixed(1)} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="0.1"
                value={xSlide}
                onChange={e => setXSlide(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className={`p-3.5 rounded-lg border text-xs ${
                  isLinearInvalid ? 'bg-rose-950/20 border-rose-500/40' : 'bg-slate-900/90 border-slate-800'
                }`}>
                  <span className="text-slate-400">Linear Regression Output <MathText text="$\hat{y} = -0.5 + 0.2x$" />:</span>
                  <div className={`text-xl font-mono font-bold mt-1 ${isLinearInvalid ? 'text-rose-400' : 'text-cyan-300'}`}>
                    {linearOut.toFixed(2)}
                  </div>
                  {isLinearInvalid && (
                    <span className="text-[10px] text-rose-400 font-medium">Invalid Probability (&lt;0 or &gt;1)</span>
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <span className="text-slate-400">Sigmoid Output <MathText text="$\sigma(-4 + x)$" />:</span>
                  <div className="text-xl font-mono font-bold text-emerald-400 mt-1">
                    {sigOut.toFixed(3)}
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium">Always Bounded in (0, 1)</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${
                isLinearInvalid
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}>
                {isLinearInvalid
                  ? '⚠️ The linear output is outside the valid probability range. The sigmoid remains strictly valid.'
                  : '✓ Both are currently inside [0, 1], but linear regression can leave it as x continues to decrease or increase.'}
              </div>
            </div>
          </div>

          {/* Interactive C: Change the Classification Threshold */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Sandbox C</span>
              <h4 className="text-sm font-bold text-slate-100">Change the Classification Threshold</h4>
              <p className="text-xs text-slate-400 mt-1">
                The threshold converts a probability into a discrete class. A lower threshold makes the model more sensitive to predicting class 1.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Estimated Probability <MathText text="$(p)$" />:</span>
                    <span className="text-cyan-400 font-mono">{pSlide.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={pSlide}
                    onChange={e => setPSlide(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Decision Threshold <MathText text="$(t)$" />:</span>
                    <span className="text-purple-400 font-mono">{tSlide.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.01"
                    value={tSlide}
                    onChange={e => setTSlide(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400">Final Decision:</span>
                  <div className="text-base font-bold text-slate-100">
                    Predict <span className={predC === 'Class 1' ? 'text-emerald-400' : 'text-amber-400'}>{predC}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 text-right">
                  Because <MathText text={`$p=${pSlide.toFixed(2)}$`} /> is {pSlide >= tSlide ? '≥' : '<'} threshold <MathText text={`$t=${tSlide.toFixed(2)}$`} />.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive D: Probability vs Odds vs Logit */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Sandbox D</span>
              <h4 className="text-sm font-bold text-slate-100">Probability &harr; Odds &harr; Log-Odds (Logit) Visualizer</h4>
              <p className="text-xs text-slate-400 mt-1">
                See how bounded probabilities in (0, 1) map into unbounded log-odds in <MathText text="$(-\infty, +\infty)$" />.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Probability <MathText text="$(p)$" />:</span>
                <span className="text-emerald-400 font-mono">{oddsProb.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.99"
                step="0.01"
                value={oddsProb}
                onChange={e => setOddsProb(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400">Probability <MathText text="$p$" />:</span>
                  <div className="text-base font-mono font-bold text-cyan-400 mt-1">{oddsProb.toFixed(2)}</div>
                  <span className="text-[10px] text-slate-500">Range: (0, 1)</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400">Odds <MathText text="$\frac{p}{1-p}$" />:</span>
                  <div className="text-base font-mono font-bold text-amber-400 mt-1">{oddsVal.toFixed(3)} : 1</div>
                  <span className="text-[10px] text-slate-500">Range: [0, &infin;)</span>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                  <span className="text-slate-400">Logit <MathText text="$\ln\left(\frac{p}{1-p}\right)$" />:</span>
                  <div className="text-base font-mono font-bold text-indigo-400 mt-1">
                    {logitVal >= 0 ? `+${logitVal.toFixed(3)}` : logitVal.toFixed(3)}
                  </div>
                  <span className="text-[10px] text-slate-500">Range: (-&infin;, +&infin;)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── TAB 3: WORKED EXAMPLES ───────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'worked' && (
        <div className="space-y-6">
          {/* Worked Example 1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-100">Worked Example 1: One Feature</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose a student classifier uses hours studied <MathText text="$(x)$" /> with learned model:
            </p>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
              <MathText text="$$z = -4 + x$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-300">A student studies <strong>6 hours</strong> (<MathText text="$x=6$" />). Walkthrough:</p>

            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
              <li><strong>Calculate the raw score:</strong> <MathText text="$z = -4 + 6 = 2$" />.</li>
              <li><strong>Convert using sigmoid:</strong> <MathText text="$$p = \sigma(2) = \frac{1}{1 + e^{-2}} \approx 0.881$$" displayMode={true} /></li>
              <li><strong>Interpret:</strong> There is approximately an <strong>88.1%</strong> estimated probability of passing.</li>
              <li><strong>Apply decision threshold 0.5:</strong> Since <MathText text="$0.881 \geq 0.5$" />, predict <strong>Class 1 (Pass)</strong>.</li>
            </ol>

            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
              Final Answer: Probability &approx; 0.881; Predicted class = 1.
            </div>
          </div>

          {/* Worked Example 2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-100">Worked Example 2: Two Features</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose <MathText text="$x_1$" /> is hours studied and <MathText text="$x_2$" /> is attendance percentage:
            </p>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
              <MathText text="$$z = -8 + 1.2x_1 + 0.05x_2$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-300">For a student with <MathText text="$x_1 = 5$" /> hours and <MathText text="$x_2 = 80\%$" /> attendance:</p>

            <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
              <li><strong>Hours contribution:</strong> <MathText text="$1.2(5) = 6$" />.</li>
              <li><strong>Attendance contribution:</strong> <MathText text="$0.05(80) = 4$" />.</li>
              <li><strong>Sum with intercept:</strong> <MathText text="$z = -8 + 6 + 4 = 2$" />.</li>
              <li><strong>Sigmoid conversion:</strong> <MathText text="$p = \sigma(2) \approx 0.881$" />.</li>
              <li><strong>Decision:</strong> Predict <strong>Class 1</strong> using standard threshold 0.5.</li>
            </ol>

            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 space-y-1">
              <strong>The 2D Decision Boundary line is:</strong>
              <div className="font-mono text-cyan-300 pt-0.5">
                <MathText text="$$-8 + 1.2x_1 + 0.05x_2 = 0$$" displayMode={true} />
              </div>
            </div>
          </div>

          {/* Check Your Understanding */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-100">Check Your Understanding</h3>
            <p className="text-xs text-slate-300">
              If <MathText text="$p = 0.25$" /> (probability of class 1), what is the probability of class 0?
            </p>
            <button
              onClick={() => setShowWorkedAns(!showWorkedAns)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {showWorkedAns ? 'Hide Explanation' : 'Show Answer'}
            </button>

            {showWorkedAns && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 animate-fade-in">
                <strong>Correct: 0.75</strong>
                <p>
                  <MathText text="$$P(y=0) = 1 - p = 1 - 0.25 = 0.75$$" displayMode={true} />
                  The two complementary class probabilities must always sum to 1.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── TAB 4: QUICK QUIZ ────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {/* Question 1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
            <h4 className="text-sm font-bold text-slate-100">
              1. Why is ordinary linear regression unsuitable as a probability model?
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'a', text: 'It cannot use multi-dimensional features.' },
                { id: 'b', text: 'Its output can be below 0 or above 1.' },
                { id: 'c', text: 'It always predicts class 1 regardless of weights.' }
              ].map(opt => (
                <label
                  key={opt.id}
                  onClick={() => setQ1Selected(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    q1Selected === opt.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="q1"
                    checked={q1Selected === opt.id}
                    onChange={() => setQ1Selected(opt.id)}
                    className="accent-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowQ1Expl(!showQ1Expl)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {showQ1Expl ? 'Hide Explanation' : 'Check Explanation'}
            </button>

            {showQ1Expl && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 animate-fade-in space-y-1">
                <strong>Correct Option: b.</strong>
                <p>
                  A probability must be strictly between 0 and 1, but a linear output <MathText text="$\theta^T x$" /> is unbounded on <MathText text="$(-\infty, +\infty)$" />.
                </p>
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
            <h4 className="text-sm font-bold text-slate-100">
              2. What does the sigmoid receive as input?
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'a', text: 'The raw feature vector x only.' },
                { id: 'b', text: 'The weighted linear score z = θ^T x.' },
                { id: 'c', text: 'The discrete final class label.' }
              ].map(opt => (
                <label
                  key={opt.id}
                  onClick={() => setQ2Selected(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    q2Selected === opt.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="q2"
                    checked={q2Selected === opt.id}
                    onChange={() => setQ2Selected(opt.id)}
                    className="accent-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowQ2Expl(!showQ2Expl)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {showQ2Expl ? 'Hide Explanation' : 'Check Explanation'}
            </button>

            {showQ2Expl && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 animate-fade-in space-y-1">
                <strong>Correct Option: b.</strong>
                <p>
                  Logistic regression first computes the dot product <MathText text="$z = \theta^T x$" />, then evaluates the sigmoid function <MathText text="$\sigma(z)$" />.
                </p>
              </div>
            )}
          </div>

          {/* Question 3 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
            <h4 className="text-sm font-bold text-slate-100">
              3. If the sigmoid output is 0.90, what does it mean?
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { id: 'a', text: 'The model predicts class 1 with estimated probability 0.90.' },
                { id: 'b', text: 'The raw linear score z equals 0.90.' },
                { id: 'c', text: 'The model is 90% wrong.' }
              ].map(opt => (
                <label
                  key={opt.id}
                  onClick={() => setQ3Selected(opt.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    q3Selected === opt.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <input
                    type="radio"
                    name="q3"
                    checked={q3Selected === opt.id}
                    onChange={() => setQ3Selected(opt.id)}
                    className="accent-indigo-500"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowQ3Expl(!showQ3Expl)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {showQ3Expl ? 'Hide Explanation' : 'Check Explanation'}
            </button>

            {showQ3Expl && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 animate-fade-in space-y-1">
                <strong>Correct Option: a.</strong>
                <p>
                  The sigmoid output is explicitly interpreted as <MathText text="$P(y=1 \mid x; \theta)$" />, representing a 90% confidence in class 1.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ── TAB 5: GLOSSARY & FORMULAS ───────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          {/* Formula Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold">Linear Weighted Score:</span>
              <div className="font-mono text-cyan-300 text-sm">
                <MathText text="$$z = \theta^T x = \sum_{j=0}^d \theta_j x_j$$" displayMode={true} />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold">Logistic Sigmoid Function:</span>
              <div className="font-mono text-cyan-300 text-sm">
                <MathText text="$$\sigma(z) = \frac{1}{1 + e^{-z}}$$" displayMode={true} />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold">Hypothesis / Posterior Probability:</span>
              <div className="font-mono text-cyan-300 text-sm">
                <MathText text="$$h_\theta(x) = \sigma(\theta^T x) = P(y=1 \mid x; \theta)$$" displayMode={true} />
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold">Decision Rule (Threshold 0.5):</span>
              <div className="font-mono text-cyan-300 text-sm">
                <MathText text="$$\hat{y} = 1 \text{ if } h_\theta(x) \geq 0.5 \iff \theta^T x \geq 0$$" displayMode={true} />
              </div>
            </div>
          </div>

          {/* Glossary Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-100">Glossary of Terms</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2 font-semibold w-1/3">Term</th>
                    <th className="pb-2 font-semibold">Beginner Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Feature <MathText text="$(x)$" /></td>
                    <td className="py-2.5">Input information used to make a prediction (e.g. hours studied).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Label <MathText text="$(y)$" /></td>
                    <td className="py-2.5">The ground-truth answer or category in training data (0 or 1).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Binary Classification</td>
                    <td className="py-2.5">Classification with exactly two discrete classes (e.g. pass/fail).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Weight <MathText text="$\theta_j$" /></td>
                    <td className="py-2.5">A learned parameter controlling how strongly feature <MathText text="$x_j$" /> influences the score.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Linear Score <MathText text="$(z)$" /></td>
                    <td className="py-2.5">The weighted sum <MathText text="$\theta^T x$" />, before probability conversion.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Sigmoid <MathText text="$\sigma(z)$" /></td>
                    <td className="py-2.5">An S-shaped mathematical function that maps any real number to (0, 1).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Probability <MathText text="$(p)$" /></td>
                    <td className="py-2.5">The model’s estimated continuous likelihood of class 1.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Threshold</td>
                    <td className="py-2.5">A cutoff cutoff (usually 0.5) used to convert a probability into a discrete class decision.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-indigo-300">Decision Boundary</td>
                    <td className="py-2.5">The surface where the model transitions between classes; with threshold 0.5, <MathText text="$\theta^T x = 0$" />.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
