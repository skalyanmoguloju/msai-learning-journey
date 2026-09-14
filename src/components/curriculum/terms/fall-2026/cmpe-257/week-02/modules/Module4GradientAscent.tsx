import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Check,
  Sliders,
  Calculator,
  TrendingUp,
  ArrowRight,
  GitCommit,
  Layers,
  HelpCircle,
  Activity
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module4GradientAscent: React.FC = () => {
  // Interactive A State: See the update direction
  const [actYA, setActYA] = useState<0 | 1>(1);
  const [probHA, setProbHA] = useState<number>(0.30);
  const [featXA, setFeatXA] = useState<number>(2.0);
  const [lrA, setLrA] = useState<number>(0.10);

  const gradA = (actYA - probHA) * featXA;
  const deltaA = lrA * gradA;
  const dirTextA =
    gradA > 0.001
      ? 'Increase the weight (moves parameter uphill)'
      : gradA < -0.001
      ? 'Decrease the weight (moves parameter downhill)'
      : 'Leave weight nearly unchanged (near optimum)';

  // Interactive B State: Follow one complete example
  const [wB, setWB] = useState<number>(1.0);
  const [biasB, setBiasB] = useState<number>(-3.0);
  const [inXB, setInXB] = useState<number>(2.0);
  const [actYB, setActYB] = useState<0 | 1>(1);

  const zB = wB * inXB + biasB;
  const hB = 1 / (1 + Math.exp(-zB));
  const alphaB = 0.10;
  const errorB = actYB - hB;
  const newWB = wB + alphaB * errorB * inXB;
  const newBiasB = biasB + alphaB * errorB;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          We already know how logistic regression produces a probability. Now we learn how it optimizes and changes its weights and bias so those probabilities become calibrated and accurate.
        </p>
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium leading-relaxed">
          <strong>Training idea in one sentence:</strong> Calculate a prediction <MathText text="$(h)$" />, compare it with the actual ground-truth label <MathText text="$(y)$" />, determine which direction improves the log-likelihood, and take a small learning step in that direction.
        </div>
      </div>

      {/* ── Why Do We Need a Derivative? ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Why Do We Need a Derivative?</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Imagine the log-likelihood as a high dimensional hill. A higher location on the hill means the model explains the observed data better. The model parameters (weights <MathText text="$\theta_j$" /> and bias <MathText text="$b$" />) are the knobs that determine our exact coordinate on the hill.
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          At the current weight value, we ask a fundamental question: <em>“If I increase this weight slightly, does the log-likelihood go up or down?”</em>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400">Positive Slope <MathText text="($\partial\ell/\partial\theta_j > 0$)" /></span>
            <p className="text-xs text-slate-300">
              Increasing the weight improves log-likelihood. Move the weight upward.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-rose-400">Negative Slope <MathText text="($\partial\ell/\partial\theta_j < 0$)" /></span>
            <p className="text-xs text-slate-300">
              Increasing the weight makes log-likelihood worse. Move the weight downward.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400">Zero Slope <MathText text="($\partial\ell/\partial\theta_j = 0$)" /></span>
            <p className="text-xs text-slate-300">
              A small movement has no local improvement. We have reached the local peak (optimum).
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          The partial derivative is the rigorous mathematical formulation of this slope:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\frac{\partial \ell}{\partial \theta_j}$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-400 text-center">
          Read it as: <em>“How much does the log-likelihood <MathText text="$\ell$" /> change when parameter <MathText text="$\theta_j$" /> changes by a tiny amount?”</em>
        </p>
      </div>

      {/* ── The Dependency Chain ──────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">The Dependency Chain</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          A parameter does not change the log-likelihood directly in one instantaneous jump. Instead, it propagates through a structured sequence of three intermediate quantities:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-xs text-emerald-400 overflow-x-auto">
          Parameter <MathText text="$\theta_j$" /> &rarr; Linear Score <MathText text="$(z)$" /> &rarr; Sigmoid Probability <MathText text="$(h)$" /> &rarr; Log-Likelihood <MathText text="$(\ell)$" />
        </div>

        <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
          <li><strong>First transition:</strong> The weight <MathText text="$\theta_j$" /> changes the weighted linear combination score <MathText text="$z = \theta^T x$" />.</li>
          <li><strong>Second transition:</strong> The score <MathText text="$z$" /> changes the sigmoid probability output <MathText text="$h = \sigma(z)$" />.</li>
          <li><strong>Third transition:</strong> The probability <MathText text="$h$" /> changes the sample log-likelihood <MathText text="$\ell$" />.</li>
        </ol>

        <p className="text-xs text-slate-300 leading-relaxed">
          Therefore, to evaluate the total net effect of <MathText text="$\theta_j$" /> on <MathText text="$\ell$" />, we calculate each small rate of change and multiply them together. This is the <strong>Chain Rule of Calculus</strong>:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\frac{\partial \ell}{\partial \theta_j} = \left( \frac{\partial \ell}{\partial h} \right) \left( \frac{\partial h}{\partial z} \right) \left( \frac{\partial z}{\partial \theta_j} \right)$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Important distinction:</strong> The chain-rule expression is not a vector dot product. It is a sequence of scalar rates of change multiplied together.
          </div>
        </div>
      </div>

      {/* ── First Link: How ℓ Changes When h Changes ──────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">First Link: How <MathText text="$\ell$" /> Changes When <MathText text="$h$" /> Changes</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For one observation, the log-likelihood is:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$\ell = y \ln(h) + (1 - y) \ln(1 - h)$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          We temporarily treat <MathText text="$h$" /> as the active independent variable, asking how the likelihood reacts when the predicted probability shifts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400">Differentiate the First Term</span>
            <p className="text-slate-400">The derivative of <MathText text="$\ln(h)$" /> is <MathText text="$1/h$" />. The actual label <MathText text="$y$" /> is a fixed constant:</p>
            <div className="font-mono text-cyan-300 pt-1">
              <MathText text="$$\frac{\partial}{\partial h} [y \ln(h)] = \frac{y}{h}$$" displayMode={true} />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">Differentiate the Second Term</span>
            <p className="text-slate-400">By chain rule, the derivative of <MathText text="$\ln(1-h)$" /> is <MathText text="$\frac{1}{1-h} \cdot (-1)$" />:</p>
            <div className="font-mono text-cyan-300 pt-1">
              <MathText text="$$\frac{\partial}{\partial h} [(1 - y) \ln(1 - h)] = -\frac{1 - y}{1 - h}$$" displayMode={true} />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 pt-1">
          Combining both pieces yields the first link:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-indigo-300">
          <MathText text="$$\frac{\partial \ell}{\partial h} = \frac{y}{h} - \frac{1 - y}{1 - h} = \frac{y(1 - h) - h(1 - y)}{h(1 - h)} = \frac{y - h}{h(1 - h)}$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
          <strong>Intuition check:</strong> If <MathText text="$(y = 1)$" />, this term is strictly positive, so increasing <MathText text="$(h)$" /> improves likelihood. If <MathText text="$(y = 0)$" />, this term is negative, so increasing <MathText text="$(h)$" /> hurts likelihood.
        </div>
      </div>

      {/* ── Second and Third Links ────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Second and Third Links</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Link 2 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400">Second Link: How <MathText text="$h$" /> Changes With <MathText text="$z$" /></span>
            <p className="text-xs text-slate-300 leading-relaxed">
              The probability <MathText text="$h$" /> is the sigmoid of score <MathText text="$z$" />: <MathText text="$h = \sigma(z)$" />. We already proved its derivative:
            </p>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded border border-slate-800 text-center">
              <MathText text="$$\frac{\partial h}{\partial z} = h(1 - h)$$" displayMode={true} />
            </div>
            <p className="text-[11px] text-slate-400">
              Notice how this term is largest near <MathText text="$h = 0.5$" /> (<MathText text="$0.25$" />), where the sigmoid is steepest.
            </p>
          </div>

          {/* Link 3 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400">Third Link: How <MathText text="$z$" /> Changes With <MathText text="$\theta_j$" /></span>
            <p className="text-xs text-slate-300 leading-relaxed">
              The score <MathText text="$z$" /> is a linear weighted sum:
            </p>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900/90 p-2.5 rounded border border-slate-800 text-center">
              <MathText text="$$z = \theta_0 x_0 + \cdots + \theta_j x_j + \cdots$$" displayMode={true} />
            </div>
            <p className="text-xs text-slate-300">
              Only a single term contains <MathText text="$\theta_j$" />, namely <MathText text="$\theta_j x_j$" />:
            </p>
            <div className="font-mono text-xs text-emerald-400 text-center font-bold">
              <MathText text="$$\frac{\partial z}{\partial \theta_j} = x_j$$" displayMode={true} />
            </div>
            <p className="text-[11px] text-slate-400">
              If feature <MathText text="$x_j = 0$" />, changing its weight has zero effect on this sample. If <MathText text="$x_j$" /> is large, the score reacts strongly.
            </p>
          </div>
        </div>
      </div>

      {/* ── Combine the Chain Rule: The Magic Cancellation ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Combine the Chain Rule: The Magic Cancellation</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Now multiply all three links together:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$\frac{\partial \ell}{\partial \theta_j} = \left( \frac{\partial \ell}{\partial h} \right) \left( \frac{\partial h}{\partial z} \right) \left( \frac{\partial z}{\partial \theta_j} \right)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300">Substitute the three expressions we derived:</p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$\frac{\partial \ell}{\partial \theta_j} = \left[ \frac{y - h}{h(1 - h)} \right] \cdot [h(1 - h)] \cdot x_j$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1.5">
          <strong className="block text-emerald-300">The denominator cancels out completely!</strong>
          <p>
            The <MathText text="$h(1 - h)$" /> in the denominator from the log-likelihood derivative cancels identically with the <MathText text="$h(1 - h)$" /> in the numerator from the sigmoid derivative:
          </p>
          <div className="font-mono text-sm text-center font-bold text-emerald-400 py-1">
            <MathText text="$$\frac{\partial \ell}{\partial \theta_j} = (y - h) x_j$$" displayMode={true} />
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong>Key Interpretation:</strong> The derivative of log-likelihood for parameter <MathText text="$\theta_j$" /> is simply the <strong>prediction error</strong> <MathText text="$(y - h)$" /> multiplied by the <strong>feature value</strong> <MathText text="$x_j$" />.
        </p>
      </div>

      {/* ── Gradient Ascent (Merged with Interactive A) ──────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Gradient Ascent</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Because we want to <strong>maximize</strong> the log-likelihood objective function, we move in the direction of its positive gradient:
        </p>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-sm text-emerald-400">
          <MathText text="$$\theta_j \leftarrow \theta_j + \alpha (y - h) x_j$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Here <MathText text="$\alpha > 0$" /> is the <strong>learning rate</strong> (step size). It controls how far we step along the gradient.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400">If <MathText text="$y - h > 0$" /> (underpredicted)</span>
            <p className="text-slate-300">
              The true label is 1, but model predicted a lower probability. If <MathText text="$x_j > 0$" />, <strong>increase the weight</strong> to push future score higher.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-400">If <MathText text="$y - h < 0$" /> (overpredicted)</span>
            <p className="text-slate-300">
              The true label is 0, but model predicted too much probability for class 1. If <MathText text="$x_j > 0$" />, <strong>decrease the weight</strong> to push future score lower.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400">If <MathText text="$y - h \approx 0$" /> (accurate)</span>
            <p className="text-slate-300">
              The prediction is already close to the true label. The gradient is nearly zero, so the parameter barely changes.
            </p>
          </div>
        </div>

        {/* ── Embedded Interactive A: See the Update Direction ─────────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sliders className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: See the Update Direction</h4>
          </div>
          <p className="text-xs text-slate-400">
            Choose the actual label, predicted probability, feature value, and learning rate. The calculator dynamically computes the gradient and step size:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Actual y toggle */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-300 block">Actual Label <MathText text="$(y)$" />:</span>
                <div className="flex gap-1.5 pt-0.5">
                  <button
                    onClick={() => setActYA(1)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      actYA === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    y = 1
                  </button>
                  <button
                    onClick={() => setActYA(0)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      actYA === 0 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    y = 0
                  </button>
                </div>
              </div>

              {/* Predicted h slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Predicted <MathText text="$(h)$" />:</span>
                  <span className="text-cyan-400 font-mono">{probHA.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.99"
                  step="0.01"
                  value={probHA}
                  onChange={e => setProbHA(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Feature xj slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Feature <MathText text="$(x_j)$" />:</span>
                  <span className="text-indigo-400 font-mono">{featXA.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={featXA}
                  onChange={e => setFeatXA(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Learning rate alpha slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Rate <MathText text="$(\alpha)$" />:</span>
                  <span className="text-amber-400 font-mono">{lrA.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={lrA}
                  onChange={e => setLrA(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400">Gradient <MathText text="$g = (y - h)x_j$" />:</span>
                <div className={`text-lg font-mono font-bold mt-1 ${
                  gradA > 0 ? 'text-emerald-400' : gradA < 0 ? 'text-rose-400' : 'text-slate-300'
                }`}>
                  {gradA >= 0 ? `+${gradA.toFixed(3)}` : gradA.toFixed(3)}
                </div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400">Step <MathText text="$\Delta \theta = \alpha g$" />:</span>
                <div className="text-lg font-mono font-bold text-cyan-400 mt-1">
                  {deltaA >= 0 ? `+${deltaA.toFixed(3)}` : deltaA.toFixed(3)}
                </div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400">Parameter Decision:</span>
                <div className="text-xs font-bold text-slate-100 mt-1.5">
                  {dirTextA}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bias Update (Merged with Interactive B) ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Bias Update</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          When the model includes an explicit bias intercept <MathText text="$b$" />:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$z = \theta x + b$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The bias <MathText text="$b$" /> is mathematically treated as a weight whose associated feature is always fixed to 1 (<MathText text="$x_0 = 1$" />, so <MathText text="$\partial z / \partial b = 1$" />). Therefore, its gradient ascent update is:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-emerald-400">
          <MathText text="$$b \leftarrow b + \alpha (y - h)$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-400">
          The feature weight <MathText text="$\theta$" /> scales with its feature value <MathText text="$x$" />, but the bias does not need a feature multiplier because its feature is identically 1.
        </p>

        {/* ── Embedded Interactive B: Follow One Complete Example ───────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Activity className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: Full Step-by-Step Parameter Update</h4>
          </div>
          <p className="text-xs text-slate-400">
            Simulate a complete training iteration for a single-feature model (<MathText text="$z = \theta x + b$" />) with learning rate <MathText text="$\alpha = 0.10$" />:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current <MathText text="$\theta$" />:</span>
                  <span className="font-mono text-cyan-300">{wB.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={wB}
                  onChange={e => setWB(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Current <MathText text="$b$" />:</span>
                  <span className="font-mono text-purple-300">{biasB.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="1"
                  step="0.1"
                  value={biasB}
                  onChange={e => setBiasB(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Input <MathText text="$x$" />:</span>
                  <span className="font-mono text-indigo-300">{inXB.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.1"
                  value={inXB}
                  onChange={e => setInXB(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-300 block">Actual Label <MathText text="$(y)$" />:</span>
                <div className="flex gap-1.5 pt-0.5">
                  <button
                    onClick={() => setActYB(1)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition ${
                      actYB === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    y = 1
                  </button>
                  <button
                    onClick={() => setActYB(0)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition ${
                      actYB === 0 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    y = 0
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Score <MathText text="$z = \theta x + b$" /></span>
                <div className="text-sm font-mono font-bold text-cyan-300">{zB.toFixed(3)}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Probability <MathText text="$h = \sigma(z)$" /></span>
                <div className="text-sm font-mono font-bold text-indigo-300">{hB.toFixed(3)}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Updated Weight <MathText text="$\theta_{\text{new}}$" /></span>
                <div className="text-sm font-mono font-bold text-emerald-400">{newWB.toFixed(3)}</div>
              </div>

              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-0.5">
                <span className="text-slate-400 text-[11px]">Updated Bias <MathText text="$b_{\text{new}}$" /></span>
                <div className="text-sm font-mono font-bold text-emerald-400">{newBiasB.toFixed(3)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Worked Examples ───────────────────────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-emerald-400">
          <Calculator className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">Step-by-Step Worked Examples</h3>
        </div>

        {/* Worked Example 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 1: Increasing a Weight</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose a training observation has:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$y = 1, \quad h = 0.3, \quad x_j = 2, \quad \alpha = 0.1$$" displayMode={true} />
          </div>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Find the probability error:</strong> <MathText text="$$y - h = 1 - 0.3 = 0.7$$" displayMode={true} /></li>
            <li><strong>Multiply by the feature:</strong> <MathText text="$$(y - h)x_j = 0.7 \times 2 = 1.4$$" displayMode={true} /></li>
            <li><strong>Multiply by the learning rate:</strong> <MathText text="$$\alpha \cdot 1.4 = 0.1 \times 1.4 = 0.14$$" displayMode={true} /></li>
            <li><strong>Apply update:</strong> <MathText text="$$\theta_j \leftarrow \theta_j + 0.14$$" displayMode={true} /></li>
          </ol>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
            <strong>Conclusion:</strong> The weight increases by +0.14 because the true class was 1 but the predicted probability was only 0.3 (underpredicted).
          </div>
        </div>

        {/* Worked Example 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 2: Decreasing a Weight</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose another training observation has:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$y = 0, \quad h = 0.8, \quad x_j = 2, \quad \alpha = 0.1$$" displayMode={true} />
          </div>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Find the probability error:</strong> <MathText text="$$y - h = 0 - 0.8 = -0.8$$" displayMode={true} /></li>
            <li><strong>Compute gradient:</strong> <MathText text="$$(y - h)x_j = (-0.8)(2) = -1.6$$" displayMode={true} /></li>
            <li><strong>Scale by learning rate:</strong> <MathText text="$$\alpha(-1.6) = 0.1 \times (-1.6) = -0.16$$" displayMode={true} /></li>
            <li><strong>Apply update:</strong> <MathText text="$$\theta_j \leftarrow \theta_j - 0.16$$" displayMode={true} /></li>
          </ol>

          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-medium">
            <strong>Conclusion:</strong> The weight decreases by -0.16 because the model overconfidently assigned 80% probability to class 1 when the true label was actually 0.
          </div>
        </div>

        {/* Worked Example 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 3: Why Feature Size Matters</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose the probability error is fixed at <MathText text="$(y - h = 0.5)$" />. Look at how different feature magnitudes affect the parameter update:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Feature Value <MathText text="$(x_j)$" /></th>
                  <th className="pb-2 font-semibold">Gradient <MathText text="$(y - h)x_j$" /></th>
                  <th className="pb-2 font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 font-mono text-cyan-300">x<sub>j</sub> = 0</td>
                  <td className="py-2.5 font-mono font-bold text-slate-400">0.0</td>
                  <td className="py-2.5 text-slate-400">Zero activation: This feature cannot affect this example.</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-cyan-300">x<sub>j</sub> = 1</td>
                  <td className="py-2.5 font-mono font-bold text-amber-400">0.5</td>
                  <td className="py-2.5 text-amber-300">Unit activation: Moderate parameter update.</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-cyan-300">x<sub>j</sub> = 4</td>
                  <td className="py-2.5 font-mono font-bold text-emerald-400">2.0</td>
                  <td className="py-2.5 text-emerald-300">Strong activation: Large update for this feature.</td>
                </tr>
              </tbody>
            </table>
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
                <td className="py-2.5 font-bold text-indigo-300">Derivative</td>
                <td className="py-2.5">A measure of how much a mathematical function changes when its input changes slightly.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Gradient</td>
                <td className="py-2.5">The vector collection of partial derivatives with respect to all model parameters.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Chain rule</td>
                <td className="py-2.5">A calculus rule for finding the derivative through linked stages: <MathText text="$\theta \to z \to h \to \ell$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Gradient ascent</td>
                <td className="py-2.5">Iteratively updating parameters in the positive slope direction that increases an objective.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Learning rate <MathText text="$\alpha$" /></td>
                <td className="py-2.5">A positive scalar hyperparameter controlling the step size of each parameter update.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Bias / intercept <MathText text="$b$" /></td>
                <td className="py-2.5">A parameter that shifts the score independently of features; its associated feature is always 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Gradient contribution</td>
                <td className="py-2.5">The parameter update signal <MathText text="$(y - h)x_j$" /> generated by one training example.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
