import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Check,
  Sliders,
  Calculator,
  Layers,
  HelpCircle,
  Binary,
  Flame,
  CheckCircle2,
  XCircle,
  BarChart3
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module3BernoulliLikelihood: React.FC = () => {
  // Interactive A State: Bernoulli Selector
  const [probA, setProbA] = useState<number>(0.80);
  const [actualYA, setActualYA] = useState<0 | 1>(1);
  const assignedA = actualYA === 1 ? probA : 1 - probA;

  // Interactive B State: Dataset Likelihood (3 Examples with labels 1, 0, 1)
  const [dProb1, setDProb1] = useState<number>(0.80); // y=1 -> assigned dProb1
  const [dProb2, setDProb2] = useState<number>(0.70); // y=0 -> assigned (1 - dProb2)
  const [dProb3, setDProb3] = useState<number>(0.60); // y=1 -> assigned dProb3

  const assigned1 = dProb1;
  const assigned2 = 1 - dProb2;
  const assigned3 = dProb3;
  const datasetLikelihood = assigned1 * assigned2 * assigned3;

  // Interactive C State: Log Penalty (y = 1)
  const [logP, setLogP] = useState<number>(0.80);
  const logVal = Math.log(logP);
  const logPenaltyMsg =
    logP > 0.8
      ? 'Good: The model assigned high probability to what actually happened (minimal penalty, log near 0).'
      : logP > 0.3
      ? 'Moderate: The probability is middling, incurring a noticeable log penalty.'
      : 'Severe penalty: The model assigned a tiny probability to what actually happened! As p → 0, log(p) → −∞.';

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          At the end of this module, you should understand the entire statistical learning story of logistic regression—not just memorize the likelihood formula.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The story in four steps:</strong> The <em>sigmoid</em> produces a calibrated probability <MathText text="$(p)$" />; <em>Bernoulli</em> describes the 0/1 binary outcome; <em>likelihood</em> checks how much probability the model gave to what actually occurred; and <em>MLE</em> chooses weights that make all observed data most believable.
        </div>
      </div>

      {/* ── 1. What Does Logistic Regression Output? ──────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">What Does Logistic Regression Output?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For a single input feature vector <MathText text="$(x)$" />, logistic regression first computes a raw linear score:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$z = \theta^T x$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          It then passes that score into the sigmoid function:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$p = \sigma(z) = \frac{1}{1 + e^{-z}}$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          We interpret <MathText text="$(p)$" /> as the conditional probability that the example belongs to class 1:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-indigo-300">
          <MathText text="$$p = P(y = 1 \mid x; \theta)$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Because there are only two possible outcomes in binary classification, the probability of class 0 is simply the complement:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-slate-300">
          <MathText text="$$P(y = 0 \mid x; \theta) = 1 - p$$" displayMode={true} />
        </div>
      </div>

      {/* ── 2. Bernoulli: The Probability Model for One 0/1 Outcome ──────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Bernoulli: The Probability Model for One 0/1 Outcome</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The <strong>Bernoulli distribution</strong> is not a derivative and not the sigmoid. It is a fundamental probability distribution describing a single trial with exactly two possible outcomes (success/failure, 1/0).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">Outcome 1 (Success)</span>
            </div>
            <p className="text-xs text-slate-300">
              Assigned probability = <MathText text="$(p)$" />.
            </p>
            <p className="text-[11px] text-slate-400">
              Example: The incoming email is spam (<MathText text="$y=1$" />).
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-bold text-amber-400">Outcome 0 (Failure)</span>
            </div>
            <p className="text-xs text-slate-300">
              Assigned probability = <MathText text="$(1 - p)$" />.
            </p>
            <p className="text-[11px] text-slate-400">
              Example: The incoming email is legitimate (<MathText text="$y=0$" />).
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          Logistic regression naturally uses the Bernoulli distribution because every training label <MathText text="$y$" /> is either 0 or 1.
        </p>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Keep the jobs strictly separate:</strong> The <em>sigmoid</em> computes the numerical value <MathText text="$(p)$" />; the <em>Bernoulli distribution</em> specifies how to assign probability to the observed label <MathText text="$(y)$" />; and the <em>derivative</em> will later help update the weights.
          </div>
        </div>
      </div>

      {/* ── 3. Where Does p^y (1-p)^(1-y) Come From? ─────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Where Does <MathText text="$p^y(1-p)^{1-y}$" /> Come From?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Instead of using piecewise if-else branches, mathematicians combine both outcomes into one elegant algebraic expression that gives the correct probability whether the actual label <MathText text="$(y)$" /> is 1 or 0:
        </p>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$P(y \mid x; \theta) = p^y (1 - p)^{1 - y}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400">If the actual label is <MathText text="$y = 1$" />:</span>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded border border-slate-800">
              <MathText text="$$p^1 (1 - p)^0 = p \times 1 = p$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-400">
              The exponent 0 eliminates the <MathText text="$(1-p)$" /> term, retaining only the probability of class 1.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400">If the actual label is <MathText text="$y = 0$" />:</span>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded border border-slate-800">
              <MathText text="$$p^0 (1 - p)^1 = 1 \times (1 - p) = 1 - p$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-400">
              The exponent 0 eliminates the <MathText text="$(p)$" /> term, retaining only the probability of class 0.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
          <strong>The exponents act as algebraic switches:</strong> <MathText text="$(y = 1)$" /> automatically selects <MathText text="$(p)$" />, and <MathText text="$(y = 0)$" /> automatically selects <MathText text="$(1 - p)$" />.
        </div>
      </div>

      {/* ── 4. Likelihood for One Example (Merged with Interactive A) ────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Likelihood for One Example</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The concept of <strong>likelihood</strong> answers a simple question:
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 font-medium">
          “Given the model’s predicted probability, how much probability did it assign to the outcome that <em>actually happened</em>?”
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose the model outputs <MathText text="$p = 0.8$" />:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Actual Label <MathText text="$(y)$" /></th>
                <th className="pb-2 font-semibold">Probability Assigned to Actual Outcome</th>
                <th className="pb-2 font-semibold">Quality of Prediction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-mono text-emerald-400 font-bold">y = 1</td>
                <td className="py-2.5 font-mono text-emerald-400">p = 0.80</td>
                <td className="py-2.5 text-emerald-300">Good: High probability assigned to what happened.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-rose-400 font-bold">y = 0</td>
                <td className="py-2.5 font-mono text-rose-400">1 − p = 0.20</td>
                <td className="py-2.5 text-rose-300">Poor: Low probability assigned to what happened.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-300">
          Thus, the likelihood for one observation is:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$L_{\text{one example}} = p^y (1 - p)^{1 - y}$$" displayMode={true} />
        </div>

        {/* ── Embedded Interactive A: Bernoulli Selector ───────────────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: Bernoulli Selector</h4>
          </div>
          <p className="text-xs text-slate-400">
            Choose the model's predicted probability <MathText text="$(p)$" /> and click the toggle to set the actual ground truth label <MathText text="$(y)$" />:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Model Predicted <MathText text="$p = P(y=1|x)$" />:</span>
                  <span className="text-cyan-400 font-mono">{probA.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={probA}
                  onChange={e => setProbA(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 block">Actual Ground Truth Label <MathText text="$(y)$" />:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActualYA(1)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      actualYA === 1
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Actual y = 1
                  </button>
                  <button
                    onClick={() => setActualYA(0)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      actualYA === 0
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Actual y = 0
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-mono">
                  Likelihood <MathText text="$$p^y (1 - p)^{1-y}$$" /> =
                </span>
                <span className="text-xl font-mono font-bold text-emerald-400 ml-2">
                  {assignedA.toFixed(3)}
                </span>
              </div>
              <div className="text-slate-300 text-xs">
                {actualYA === 1 ? (
                  <span className="text-emerald-300 font-medium">Because <MathText text="$y=1$" />, the expression selects <MathText text="$p$" /> ({probA.toFixed(2)}).</span>
                ) : (
                  <span className="text-amber-300 font-medium">Because <MathText text="$y=0$" />, the expression selects <MathText text="$1-p$" /> ({(1 - probA).toFixed(2)}).</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Likelihood for the Whole Dataset (Merged with Interactive B) ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Likelihood for the Whole Dataset</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose we have a dataset of <MathText text="$(n)$" /> training examples:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-slate-300">
          <MathText text="$$\{(x^{(1)}, y^{(1)}), (x^{(2)}, y^{(2)}), \dots, (x^{(n)}, y^{(n)})\}$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Assuming each observation is sampled independently (the standard <strong>i.i.d.</strong> assumption), the joint probability of all observed outcomes occurring together is the <strong>product</strong> of their individual likelihoods:
        </p>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$L(\theta) = \prod_{i=1}^n \left[ p^{(i)} \right]^{y^{(i)}} \left[ 1 - p^{(i)} \right]^{1 - y^{(i)}}$$" displayMode={true} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-400 font-mono">i</span>
            <p className="text-slate-400">Identifies the specific training sample index from 1 to <MathText text="$n$" />.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-indigo-400 font-mono">p<sup>(i)</sup></span>
            <p className="text-slate-400">The model’s probability of class 1: <MathText text="$\sigma(\theta^T x^{(i)})$" />.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400 font-mono">y<sup>(i)</sup></span>
            <p className="text-slate-400">The actual ground-truth label observed for sample <MathText text="$i$" /> (0 or 1).</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 font-mono">&prod;</span>
            <p className="text-slate-400">Mathematical product operator multiplying across all <MathText text="$n$" /> examples.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          The parameter weights <MathText text="$\theta$" /> are embedded inside each <MathText text="$p^{(i)} = \sigma(\theta^T x^{(i)})$" />. Changing the weights alters the probabilities, which in turn alters the entire dataset likelihood.
        </p>

        {/* ── Embedded Interactive B: Dataset Likelihood ───────────────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <BarChart3 className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: Dataset Likelihood Calculator</h4>
          </div>
          <p className="text-xs text-slate-400">
            Consider a mini-dataset of 3 examples with actual labels <MathText text="$(y^{(1)}=1, y^{(2)}=0, y^{(3)}=1)$" />. Adjust the model’s predicted probability of class 1 for each:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Example 1 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-emerald-400">Ex 1 (Actual y = 1)</span>
                  <span className="font-mono text-cyan-300">{dProb1.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={dProb1}
                  onChange={e => setDProb1(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Assigned prob:</span>
                  <span className="font-mono font-bold text-emerald-400">{assigned1.toFixed(2)}</span>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-amber-400">Ex 2 (Actual y = 0)</span>
                  <span className="font-mono text-cyan-300">{dProb2.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={dProb2}
                  onChange={e => setDProb2(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Assigned (1−p):</span>
                  <span className="font-mono font-bold text-amber-400">{assigned2.toFixed(2)}</span>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-emerald-400">Ex 3 (Actual y = 1)</span>
                  <span className="font-mono text-cyan-300">{dProb3.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={dProb3}
                  onChange={e => setDProb3(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Assigned prob:</span>
                  <span className="font-mono font-bold text-emerald-400">{assigned3.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-400">Dataset Likelihood <MathText text="$$L(\theta) = p_1 \times (1 - p_2) \times p_3$$" />:</span>
                <div className="text-xl font-mono font-bold text-indigo-400 mt-0.5">
                  {datasetLikelihood.toFixed(4)}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 max-w-xs">
                It multiplies the probabilities assigned to the actual outcomes: <br />
                <span className="font-mono text-cyan-300">{assigned1.toFixed(2)} × {assigned2.toFixed(2)} × {assigned3.toFixed(2)} = {datasetLikelihood.toFixed(4)}</span>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. Maximum Likelihood Estimation (MLE) ────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Maximum Likelihood Estimation (MLE)</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Different parameter weight choices <MathText text="$\theta$" /> produce different probabilities <MathText text="$p^{(i)}$" />, and therefore produce different dataset likelihoods <MathText text="$L(\theta)$" />.
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Maximum Likelihood Estimation (MLE)</strong> means choosing the weights that give the largest possible likelihood for the data we actually observed:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\hat{\theta} = \arg\max_\theta L(\theta)$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
          <strong>Read this as:</strong> Choose <MathText text="$\hat{\theta}$" />, the estimated parameter weights, that make the observed labels most probable.
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          This does not mean the model must assign 100% probability to every example. It means we search for weights that systematically provide:
        </p>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>High probability</strong> to the correct ground-truth class.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Low probability</strong> to the incorrect class.</span>
          </li>
        </ul>
      </div>

      {/* ── 7. Why Use Log-Likelihood? ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Why Use Log-Likelihood?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The raw likelihood <MathText text="$L(\theta)$" /> is a product of probabilities. When we multiply thousands of numbers strictly less than 1, the result quickly plunges below computer floating-point precision (arithmetic underflow, e.g., <MathText text="$10^{-300} \to 0$" />).
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          The natural logarithm converts multiplication into convenient addition:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$\log(a \times b) = \log(a) + \log(b)$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          So we define the <strong>log-likelihood</strong> <MathText text="$\ell(\theta)$" />:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-indigo-300">
          <MathText text="$$\ell(\theta) = \log L(\theta) = \sum_{i=1}^n \left[ y^{(i)} \log p^{(i)} + (1 - y^{(i)}) \log(1 - p^{(i)}) \right]$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Because the logarithm is a strictly monotonically increasing function, taking the log <strong>does not change where the maximum occurs</strong>:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
          <MathText text="$$\arg\max_\theta L(\theta) = \arg\max_\theta \ell(\theta)$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Maximizing Likelihood = Maximizing Log-Likelihood:</strong> In practical machine learning libraries, algorithms often minimize the <em>negative log-likelihood</em> (also called <strong>Binary Cross-Entropy loss</strong> <MathText text="$J(\theta) = -\frac{1}{n} \ell(\theta)$" />). Maximizing reward and minimizing loss are the exact same goal written with opposite signs.
          </div>
        </div>
      </div>

      {/* ── 8. Why Confident Mistakes are Punished (Merged with Interactive C) ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Why Confident Mistakes are Punished</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose the true observed label is positive (<MathText text="$y = 1$" />):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400">Good Prediction</span>
            <div className="font-mono text-xs text-cyan-300">
              <MathText text="$p = 0.90 \implies \log(0.90) \approx -0.105$" />
            </div>
            <p className="text-xs text-slate-400">Log value is close to zero (almost no penalty).</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-rose-400">Confident Mistake</span>
            <div className="font-mono text-xs text-rose-400">
              <MathText text="$p = 0.01 \implies \log(0.01) \approx -4.605$" />
            </div>
            <p className="text-xs text-slate-400">Enormous negative penalty! As <MathText text="$p \to 0$" />, <MathText text="$\log(p) \to -\infty$" />.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          The log-likelihood brutally punishes confident incorrect predictions. This mathematical asymmetry forces logistic regression to become calibrated and avoid extreme overconfidence on wrong classes.
        </p>

        {/* ── Embedded Interactive C: Log Penalty Visualizer ───────────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <Flame className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: See the Log Penalty</h4>
          </div>
          <p className="text-xs text-slate-400">
            For an actual label <MathText text="$(y = 1)$" />, observe how the log-likelihood penalty accelerates toward negative infinity as the predicted probability approaches zero:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Predicted Probability <MathText text="$(p)$" /> for True Label <MathText text="$(y = 1)$" />:</span>
              <span className="text-cyan-400 font-mono text-sm">{logP.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.99"
              step="0.01"
              value={logP}
              onChange={e => setLogP(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />

            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-slate-400 font-mono">Log Contribution <MathText text="$\log(p)$" />:</span>
                <span className={`text-xl font-mono font-bold ml-2 ${
                  logP > 0.8 ? 'text-emerald-400' : logP > 0.3 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {logVal.toFixed(3)}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Penalty: <span className="font-mono text-rose-300">{(-logVal).toFixed(3)}</span> loss units
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs ${
              logP > 0.8
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : logP > 0.3
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {logPenaltyMsg}
            </div>
          </div>
        </div>
      </div>

      {/* ── Worked Examples ───────────────────────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-indigo-400">
          <Calculator className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">Step-by-Step Worked Examples</h3>
        </div>

        {/* Worked Example 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 1: One Email</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The model evaluates an email and predicts:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$p = P(y = 1 \mid x) = 0.75$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-300">
            The actual ground truth is <MathText text="$(y = 1)$" />, meaning the email really is spam (class 1).
          </p>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Select the probability assigned to what happened:</strong> Because <MathText text="$y = 1$" />, use <MathText text="$p = 0.75$" />.</li>
            <li><strong>Compute likelihood:</strong> <MathText text="$$L = (0.75)^1 (1 - 0.75)^0 = 0.75$$" displayMode={true} /></li>
            <li><strong>Evaluate:</strong> The model did well because it assigned a high probability (75%) to what actually occurred.</li>
          </ol>

          <p className="text-xs text-slate-400 pt-1">
            If the email had actually been legitimate (<MathText text="$y = 0$" />), the likelihood would instead have been:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-rose-300">
            <MathText text="$$1 - p = 1 - 0.75 = 0.25$$" displayMode={true} />
          </div>
        </div>

        {/* Worked Example 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 2: Three Examples</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Actual labels in the dataset are <MathText text="$(1, 0, 1)$" />. The model predicts class-1 probabilities of <MathText text="$(0.8, 0.7, 0.6)$" />.
          </p>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Example 1 is actually 1:</strong> Use <MathText text="$p_1 = 0.8$" />.</li>
            <li><strong>Example 2 is actually 0:</strong> Use <MathText text="$1 - p_2 = 1 - 0.7 = 0.3$" />.</li>
            <li><strong>Example 3 is actually 1:</strong> Use <MathText text="$p_3 = 0.6$" />.</li>
            <li>
              <strong>Multiply the independent probabilities:</strong>
              <div className="font-mono text-cyan-300 pt-1">
                <MathText text="$$L(\theta) = 0.8 \times 0.3 \times 0.6 = 0.144$$" displayMode={true} />
              </div>
            </li>
          </ol>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300">
            <strong>Diagnosis:</strong> The second prediction was poor—the model thought class 1 was likely (0.7), but class 0 actually occurred, contributing only 0.3 to the likelihood product.
          </div>
        </div>

        {/* Worked Example 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 3: Compare Two Models</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose two candidate models are evaluated on the exact same three examples with true labels <MathText text="$(1, 0, 1)$" />:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Model</th>
                  <th className="pb-2 font-semibold">Probabilities Assigned to Actual Outcomes</th>
                  <th className="pb-2 font-semibold">Dataset Likelihood <MathText text="$L(\theta)$" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 font-bold text-cyan-300">Model A</td>
                  <td className="py-2.5 font-mono">0.8, 0.3, 0.6</td>
                  <td className="py-2.5 font-mono font-bold text-cyan-300">0.144</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-emerald-400">Model B</td>
                  <td className="py-2.5 font-mono">0.6, 0.8, 0.4</td>
                  <td className="py-2.5 font-mono font-bold text-emerald-400">0.192</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-300 pt-1">
            For this dataset, Model B achieves the higher joint probability:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-emerald-400">
            <MathText text="$$0.192 > 0.144$$" displayMode={true} />
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
            <strong>MLE Conclusion:</strong> Maximum Likelihood Estimation prefers <strong>Model B</strong> because its parameter weights make the entire dataset more probable.
          </div>
        </div>
      </div>

      {/* ── Glossary Table Section ────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Glossary of Key Terms</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold w-1/3">Term</th>
                <th className="pb-2 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Bernoulli distribution</td>
                <td className="py-2.5">Probability model for one binary outcome with values 0 or 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Probability <MathText text="$(p)$" /></td>
                <td className="py-2.5">The model’s estimated chance that an input belongs to class 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Likelihood</td>
                <td className="py-2.5">The probability assigned by the model to the outcome that <em>actually occurred</em>.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Dataset likelihood <MathText text="$L(\theta)$" /></td>
                <td className="py-2.5">The product of the individual sample likelihoods across all training observations.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">MLE</td>
                <td className="py-2.5">Maximum Likelihood Estimation: Choosing model parameters <MathText text="$\theta$" /> that maximize <MathText text="$L(\theta)$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Log-likelihood <MathText text="$\ell(\theta)$" /></td>
                <td className="py-2.5">The logarithm of likelihood; converts products into sums to avoid arithmetic underflow.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">i.i.d.</td>
                <td className="py-2.5">Independent and Identically Distributed: A standard foundational assumption for training examples.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Derivative</td>
                <td className="py-2.5">A rate of change used to compute gradients to determine how weights should be adjusted during training.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
