import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Check,
  Sliders,
  Calculator,
  Activity,
  Split,
  Layers
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1WhyLogistic: React.FC = () => {
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

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── 1. Learning Goal Callout ──────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          By the end of this module, you will be able to explain—not just repeat—how logistic regression takes an unrestricted linear score and converts it into a calibrated probability between 0 and 1 for a binary decision.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
          <strong>The story in one sentence:</strong> Linear regression gives an unrestricted score; logistic regression adds the sigmoid so that score becomes a valid probability between 0 and 1.
        </div>
      </div>

      {/* ── 2. What is Binary Classification? ─────────────────────────────── */}
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

      {/* ── 3. Why Not Use Linear Regression? ─────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100">2. Why Not Use Linear Regression?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Linear regression creates a weighted sum:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\hat{y} = \theta_0 + \theta_1 x$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose <MathText text="$x$" /> is hours studied and the learned model is <MathText text="$\hat{y} = -0.5 + 0.2x$" />:
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
          <strong>The Problem:</strong> If <MathText text="$\hat{y}$" /> is treated as a probability, <MathText text="$-0.1$" /> is a negative probability and <MathText text="$1.5$" /> is a 150% probability. Both are impossible. Linear regression is useful for numerical outputs like price or temperature, but its output is not automatically limited to the probability range.
        </div>
      </div>

      {/* ── 4. What Should a Classification Model Output? ─────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100">3. What Should a Classification Model Output?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          A useful model should first report how confident it is as a continuous probability:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Model Output</th>
                <th className="pb-2 font-semibold">Meaning</th>
                <th className="pb-2 font-semibold">Class Using Threshold 0.5</th>
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
                <td className="py-2.5 font-semibold text-amber-300">Class 1 by the usual rule</td>
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
          The probability and the final class are not identical:
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
          <strong>Threshold is a decision choice:</strong> The common threshold is 0.5, but a medical model might use a lower threshold (such as 0.2) to avoid missing sick patients (false negatives).
        </div>
      </div>

      {/* ── 5. The Logistic-Regression Pipeline ────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100">4. The Logistic-Regression Pipeline</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Logistic regression keeps the weighted-sum idea from linear regression, but adds one conversion step:
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
              A positive <MathText text="$z$" /> is evidence toward class 1. A negative <MathText text="$z$" /> is evidence toward class 0. But <MathText text="$z$" /> itself is not a probability.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400">Step B: Sigmoid Conversion</span>
            <div className="font-mono text-xs text-cyan-300">
              <MathText text="$$\sigma(z) = \frac{1}{1 + e^{-z}}$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Logistic regression defines:
              <br />
              <MathText text="$$h_\theta(x) = \sigma(\theta^T x) = P(y=1 \mid x; \theta)$$" displayMode={true} />
              Read this as: <em>"The model’s output is the estimated probability that this input belongs to class 1."</em>
            </p>
          </div>
        </div>
      </div>

      {/* ── 6. The Decision Boundary ───────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-100">5. The Decision Boundary</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          With a threshold of 0.5, the model predicts class 1 when:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$h_\theta(x) \geq 0.5$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The sigmoid equals 0.5 when its input <MathText text="$z$" /> equals 0. Therefore the boundary is:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
          <MathText text="$$\theta^T x = 0$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          For one feature, suppose <MathText text="$z = -4 + x$" />. The boundary occurs when <MathText text="$-4 + x = 0 \implies x = 4$" />. So the model changes its decision around 4 hours studied.
        </p>
      </div>

      {/* ── 7. Why the Name "Logistic Regression"? ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-base font-bold text-slate-100">6. Why the Name "Logistic Regression"?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          It is used for classification, but it predicts a continuous probability before making the final class decision. The word “regression” refers to estimating that probability from the features.
        </p>
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
          <strong>Do not memorize the name as a contradiction:</strong> It is a classification method whose internal output is a probability.
        </div>
      </div>

      {/* ── 8. Interactive Sandboxes Section ──────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sliders className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">Interactive Exploration Sandboxes</h3>
        </div>

        {/* Sandbox A: Move the Linear Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Interactive A</span>
            <h4 className="text-sm font-bold text-slate-100">Move the Linear Score</h4>
            <p className="text-xs text-slate-400 mt-1">
              Use the slider to see how the raw score <MathText text="$(z)$" /> becomes a probability. Notice that <MathText text="$(z)$" /> can be negative or greater than 1, but the sigmoid output stays between 0 and 1.
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
                <span className="text-slate-400">Prediction with Threshold 0.5:</span>
                <div className={`text-lg font-mono font-bold ${pA >= 0.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {classA}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Class 0 evidence (negative score)</span>
                <span>50/50 (zero)</span>
                <span>Class 1 evidence (positive score)</span>
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

        {/* Sandbox B: Line vs Probability */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Interactive B</span>
            <h4 className="text-sm font-bold text-slate-100">See Why a Line is Not a Probability</h4>
            <p className="text-xs text-slate-400 mt-1">
              Compare a linear output with the sigmoid output. The linear output can leave the valid probability range.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Input <MathText text="$(x)$" />:</span>
              <span className="text-amber-400 font-mono text-sm">{xSlide.toFixed(1)}</span>
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
                ? '⚠️ The linear output is outside the valid probability range. The sigmoid remains valid.'
                : '✓ Both are currently inside the range, but linear regression can leave it as x changes.'}
            </div>
          </div>
        </div>

        {/* Sandbox C: Change Classification Threshold */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Interactive C</span>
            <h4 className="text-sm font-bold text-slate-100">Change the Classification Threshold</h4>
            <p className="text-xs text-slate-400 mt-1">
              The threshold converts a probability into a class. A lower threshold makes the model more willing to predict class 1.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Probability <MathText text="$(p)$" />:</span>
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
                  <span>Threshold:</span>
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
                <span className="text-slate-400">Prediction:</span>
                <div className="text-base font-bold text-slate-100">
                  <span className={predC === 'Class 1' ? 'text-emerald-400' : 'text-amber-400'}>{predC}</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 text-right">
                Because <MathText text={`$(p=${pSlide.toFixed(2)})$`} /> is {pSlide >= tSlide ? 'at least' : 'below'} the threshold <MathText text={`$(${tSlide.toFixed(2)})$`} />.
              </div>
            </div>
          </div>
        </div>

        {/* Sandbox D: Odds and Logit */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Interactive D</span>
            <h4 className="text-sm font-bold text-slate-100">Probability &harr; Odds &harr; Log-Odds (Logit) Converter</h4>
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

      {/* ── 9. Worked Examples Section ───────────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-cyan-400">
          <Calculator className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">Step-by-Step Worked Examples</h3>
        </div>

        {/* Worked Example 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 1: One Feature</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose the model uses hours studied <MathText text="$(x)$" /> and has:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$(z = -4 + x)$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-300">A student studies 6 hours:</p>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Calculate the score:</strong> <MathText text="$z = -4 + 6 = 2$" />.</li>
            <li><strong>Convert the score using the sigmoid:</strong> <MathText text="$$p = \sigma(2) \approx 0.881$$" displayMode={true} /></li>
            <li><strong>Interpret it:</strong> about an 88.1% estimated chance of class 1.</li>
            <li><strong>Apply the 0.5 threshold:</strong> <MathText text="$0.881 \geq 0.5$" />, so predict <strong>Class 1</strong>.</li>
          </ol>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
            Final Answer: Probability &approx; 0.881; Predicted class = 1.
          </div>
        </div>

        {/* Worked Example 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 2: Two Features</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose <MathText text="$(x_1)$" /> is hours studied and <MathText text="$(x_2)$" /> is attendance percentage:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$(z = -8 + 1.2x_1 + 0.05x_2)$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-300">For <MathText text="$x_1 = 5$" /> and <MathText text="$x_2 = 80$" />:</p>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Hours contribution:</strong> <MathText text="$1.2(5) = 6$" />.</li>
            <li><strong>Attendance contribution:</strong> <MathText text="$0.05(80) = 4$" />.</li>
            <li><strong>Add the intercept:</strong> <MathText text="$z = -8 + 6 + 4 = 2$" />.</li>
            <li><strong>Convert:</strong> <MathText text="$p = \sigma(2) \approx 0.881$" />.</li>
            <li><strong>Decision:</strong> Predict <strong>Class 1</strong> using threshold 0.5.</li>
          </ol>

          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 space-y-1">
            <strong>The decision boundary is the line:</strong>
            <div className="font-mono text-cyan-300 pt-0.5">
              <MathText text="$$-8 + 1.2x_1 + 0.05x_2 = 0$$" displayMode={true} />
            </div>
          </div>
        </div>

        {/* Check Your Understanding */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="text-sm font-bold text-slate-100">Check Your Understanding</h4>
          <p className="text-xs text-slate-300">
            If <MathText text="$(p = 0.25)$" />, what is the probability of class 0?
          </p>
          <button
            onClick={() => setShowWorkedAns(!showWorkedAns)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {showWorkedAns ? 'Hide Answer' : 'Show Answer'}
          </button>

          {showWorkedAns && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1 animate-fade-in">
              <strong>Answer:</strong>
              <div className="font-mono text-sm pt-0.5">
                <MathText text="$$P(y=0) = 1 - p = 1 - 0.25 = 0.75$$" displayMode={true} />
              </div>
              <p>The two class probabilities must always add to 1.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── 10. Glossary Table Section ───────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-base font-bold text-slate-100">Glossary of Key Terms</h3>

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
                <td className="py-2.5">Input information used to make a prediction. Example: hours studied.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Label <MathText text="$(y)$" /></td>
                <td className="py-2.5">The correct category in the training data (0 or 1).</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Binary Classification</td>
                <td className="py-2.5">Classification with two possible labels, usually 0 and 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Weight <MathText text="$\theta_j$" /></td>
                <td className="py-2.5">A learned number controlling how strongly feature <MathText text="$x_j$" /> influences the score.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Linear Score <MathText text="$(z)$" /></td>
                <td className="py-2.5">The weighted sum <MathText text="$\theta^T x$" />, before probability conversion.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Sigmoid</td>
                <td className="py-2.5">An S-shaped function that maps any score to a number between 0 and 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Probability <MathText text="$(p)$" /></td>
                <td className="py-2.5">The model’s estimated chance of class 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Threshold</td>
                <td className="py-2.5">A cutoff used to turn a continuous probability into a discrete class decision.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Decision Boundary</td>
                <td className="py-2.5">The point or surface where the model changes class; with threshold 0.5, <MathText text="$\theta^T x = 0$" />.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
