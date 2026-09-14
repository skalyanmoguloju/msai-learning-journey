import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Sliders,
  Calculator,
  Activity,
  Check,
  HelpCircle,
  BarChart2,
  Table,
  Scale
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module5GLM: React.FC = () => {
  // Interactive A State: Same score, two models
  const [etaA, setEtaA] = useState<number>(1.8);
  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const linMeanA = etaA;
  const logProbA = sigmoid(etaA);

  // Interactive B State: Probability to logit and back
  const [muB, setMuB] = useState<number>(0.80);
  const oddsB = muB / (1 - muB);
  const logitScoreB = Math.log(oddsB);
  const backMuB = sigmoid(logitScoreB);

  // Interactive C State: Gaussian error penalty
  const [predMeanC, setPredMeanC] = useState<number>(50);
  const [actualYC, setActualYC] = useState<number>(60);
  const errorC = actualYC - predMeanC;
  const sqErrorC = errorC * errorC;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Understand how linear regression and logistic regression fit inside one unified theoretical framework called a <strong>Generalized Linear Model (GLM)</strong>.
        </p>
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-medium leading-relaxed">
          <strong>Main idea in one sentence:</strong> Both models first combine input features into a weighted linear score <MathText text="($\eta$)" />. They differ only in how they interpret that score because they model fundamentally different kinds of response outputs (continuous values vs. discrete probabilities).
        </div>
      </div>

      {/* ── The Common First Step ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>The Common First Step: The Linear Predictor</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Suppose our input features are hours studied (<MathText text="$x_1$" />) and lecture attendance (<MathText text="$x_2$" />). The model assigns a parameter weight to each feature and combines them with an intercept bias:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\eta = \theta_0 + \theta_1 x_1 + \theta_2 x_2 = \theta^T x + b$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          This weighted score <MathText text="$\eta$" /> is called the <strong>linear predictor</strong>. It represents the raw evidence produced by the linear combination of inputs and weights.
        </p>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-slate-200">Concrete Numerical Calculation:</div>
          <p className="font-mono text-cyan-300">
            Suppose <MathText text="$\theta_0 = -2, \; \theta_1 = 0.8, \; \theta_2 = 0.02, \; x_1 = 3, \; x_2 = 70$" />:
          </p>
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
            <MathText text="$\eta = -2 + 0.8(3) + 0.02(70) = -2 + 2.4 + 1.4 = 1.8$" />
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 leading-relaxed">
          <strong>Important Takeaway:</strong> <MathText text="$\eta = 1.8$" /> is strictly an unbounded raw score (<MathText text="$\eta \in \mathbb{R}$" />). Whether it becomes a predicted house price, a probability of passing an exam, or an event count depends entirely on which GLM family and link function we apply.
        </div>
      </div>

      {/* ── What Does the Mean μ Mean? ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Scale className="w-4 h-4 text-indigo-400" />
          <span>What Does the Mean <MathText text="$\mu$" /> Mean?</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          In statistics and GLMs, <MathText text="$\mu$" /> represents the <strong>conditional expectation (mean)</strong> of the target output <MathText text="$y$" /> given the input features <MathText text="$x$" />: <MathText text="$\mu = \mathbb{E}[y \mid x]$" />.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              For Continuous Targets (Linear Regression)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If we are predicting a house price, <MathText text="$\mu$" /> is the expected sales price. Individual houses with identical square footage may sell for slightly different amounts due to market noise, but <MathText text="$\mu$" /> is the theoretical center of that distribution.
            </p>
            <div className="p-2 bg-slate-900 rounded-lg text-xs font-mono text-indigo-300 text-center">
              <MathText text="$\mu = \mathbb{E}[\text{price} \mid x] \in \mathbb{R}$" />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              For Binary Targets (Logistic Regression)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If <MathText text="$y \in \{0, 1\}$" />, the expectation is the expected fraction of positive occurrences. For any Bernoulli variable, <MathText text="$\mathbb{E}[y \mid x] = 1 \cdot P(y=1\mid x) + 0 \cdot P(y=0\mid x) = P(y=1\mid x)$" />.
            </p>
            <div className="p-2 bg-slate-900 rounded-lg text-xs font-mono text-cyan-300 text-center">
              <MathText text="$\mu = \mathbb{E}[y \mid x] = P(y=1 \mid x) \in [0, 1]$" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Do We Need a Link Function? ───────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Why Do We Need a Link Function?</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The linear predictor <MathText text="$\eta = \theta^T x + b$" /> can evaluate to <em>any real number</em> from <MathText text="$-\infty$" /> to <MathText text="$+\infty$" />. However, the expected output <MathText text="$\mu$" /> often has strict mathematical domain constraints:
        </p>

        <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
          <li>A continuous price or temperature can be any real number: <MathText text="$\mu \in \mathbb{R}$" />.</li>
          <li>A probability must strictly lie between zero and one: <MathText text="$\mu \in (0, 1)$" />.</li>
          <li>A count of events (e.g., website visitors) must be strictly non-negative: <MathText text="$\mu \in (0, \infty)$" />.</li>
        </ul>

        <p className="text-xs text-slate-300 leading-relaxed">
          The <strong>link function</strong> <MathText text="$g(\cdot)$" /> is the formal mathematical rule connecting the expected output <MathText text="$\mu$" /> to the unrestricted linear predictor <MathText text="$\eta$" />:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-emerald-400">
          <MathText text="$$g(\mu) = \eta$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
          <span className="font-semibold text-slate-200">Conceptual distinction to remember:</span>
          <p>
            The link function <MathText text="$g(\cdot)$" /> is the conversion operator. The linear predictor <MathText text="$\eta$" /> is the resulting linear score. Its inverse, <MathText text="$g^{-1}(\eta) = \mu$" /> (often called the <em>mean function</em> or <em>response function</em>), computes model predictions from raw scores.
          </p>
        </div>
      </div>

      {/* ── Linear Regression Inside GLM ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          <span>Linear Regression Inside the GLM Framework</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For standard linear regression, the response target <MathText text="$y$" /> is continuous. We assume the actual values are normally distributed around the conditional mean:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-indigo-300">
          <MathText text="$$y \mid x \sim \mathcal{N}(\mu, \sigma^2)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Because both <MathText text="$\eta$" /> and <MathText text="$\mu$" /> span the entire real line <MathText text="$\mathbb{R}$" />, linear regression uses the <strong>identity link function</strong> (<MathText text="$g(\mu) = \mu$" />):
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-indigo-400">
          <MathText text="$$g(\mu) = \mu = \eta \implies \mu = \theta^T x + b$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>Linear-Regression Pipeline:</strong> Features <MathText text="$x$" /> <ArrowRight className="inline w-3 h-3 mx-1" /> Weighted Score <MathText text="$\eta$" /> <ArrowRight className="inline w-3 h-3 mx-1" /> Identity Link (<MathText text="$\mu = \eta$" />) <ArrowRight className="inline w-3 h-3 mx-1" /> Gaussian Likelihood <ArrowRight className="inline w-3 h-3 mx-1" /> Ordinary Least Squares (MSE) Training.
        </div>
      </div>

      {/* ── Why Gaussian Leads to Squared Error & Interactive C ──────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Why the Gaussian Assumption Leads to Squared Error</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The Gaussian probability density function contains an exponential quadratic penalty:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
          <MathText text="$$p(y \mid x; \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(y - \mu)^2}{2\sigma^2} \right)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          When we compute the log-likelihood of this Gaussian distribution, the exponent comes down:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-400">
          <MathText text="$$\log p(y \mid x) = -\frac{1}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}(y - \mu)^2$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Maximizing this log-likelihood with respect to parameters <MathText text="$\theta$" /> is mathematically identical to <strong>minimizing the sum of squared errors</strong> <MathText text="$(y - \mu)^2$" />!
        </p>

        {/* ── Interactive C Widget ───────────────────────────────────────── */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Interactive: Gaussian Error Penalty Demonstration
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Error = {errorC >= 0 ? `+${errorC}` : errorC}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Adjust the predicted mean <MathText text="$\mu$" /> and the observed ground truth <MathText text="$y$" /> to observe how the quadratic loss penalizes larger deviations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Predicted Mean <MathText text="($\mu$)" />:</span>
                <span className="font-bold text-amber-300">{predMeanC}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={predMeanC}
                onChange={(e) => setPredMeanC(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Actual Observed <MathText text="($y$)" />:</span>
                <span className="font-bold text-amber-300">{actualYC}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={actualYC}
                onChange={(e) => setActualYC(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Residual Error <MathText text="$(y - \mu)$" /></div>
              <div className="text-xl font-extrabold text-slate-200 mt-0.5">
                {errorC > 0 ? `+${errorC}` : errorC}
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/30 text-center">
              <div className="text-[10px] text-amber-400 uppercase font-bold">Squared Penalty <MathText text="$(y - \mu)^2$" /></div>
              <div className="text-xl font-extrabold text-amber-300 mt-0.5">
                {sqErrorC}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logistic Regression Inside GLM & Interactive A ───────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Logistic Regression Inside the GLM Framework</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For classification, the response is binary: <MathText text="$y \in \{0, 1\}$" />. We model this using a Bernoulli distribution whose parameter is the probability of class 1:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$y \mid x \sim \text{Bernoulli}(\mu), \quad \text{where } \mu = P(y=1 \mid x)$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The score <MathText text="$\eta = \theta^T x + b$" /> is unbounded, but <MathText text="$\mu$" /> must stay within <MathText text="$(0, 1)$" />. The canonical link function for Bernoulli is the <strong>logit function</strong> (log-odds):
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-400">
          <MathText text="$$g(\mu) = \ln\left( \frac{\mu}{1 - \mu} \right) = \eta$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Solving this equation algebraically for the mean <MathText text="$\mu$" /> in terms of <MathText text="$\eta$" /> mathematically yields the <strong>sigmoid function</strong>:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-emerald-300">
          <MathText text="$$\mu = g^{-1}(\eta) = \frac{1}{1 + e^{-\eta}} = \sigma(\eta)$$" displayMode={true} />
        </div>

        {/* ── Interactive A Widget ───────────────────────────────────────── */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Interactive: Same Linear Score <MathText text="$\eta$" />, Two Different GLMs
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              <MathText text="$\eta = $" /> {etaA.toFixed(1)}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Slide <MathText text="$\eta$" /> to witness how the identity link preserves the raw value while the sigmoid link compresses it into a valid probability:
          </p>

          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={etaA}
            onChange={(e) => setEtaA(Number(e.target.value))}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30 text-center">
              <div className="text-[10px] text-indigo-400 uppercase font-bold">Linear Regression (<MathText text="$\mu = \eta$" />)</div>
              <div className="text-2xl font-extrabold text-indigo-300 mt-1">
                {linMeanA.toFixed(3)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Expected continuous output</div>
            </div>

            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30 text-center">
              <div className="text-[10px] text-cyan-400 uppercase font-bold">Logistic Regression (<MathText text="$\mu = \sigma(\eta)$" />)</div>
              <div className="text-2xl font-extrabold text-cyan-300 mt-1">
                {logProbA.toFixed(3)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Calibrated probability <MathText text="$P(y=1\mid x)$" /></div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
            <strong>Interpretation:</strong>{' '}
            {etaA > 0 ? (
              <span className="text-emerald-300">
                Score <MathText text="$\eta > 0$" /> favors class 1; the sigmoid compresses it to probability &gt; 0.50.
              </span>
            ) : etaA < 0 ? (
              <span className="text-rose-300">
                Score <MathText text="$\eta < 0$" /> favors class 0; the sigmoid compresses it to probability &lt; 0.50.
              </span>
            ) : (
              <span className="text-amber-300">
                Score <MathText text="$\eta = 0$" /> represents maximum ambiguity; probability is exactly 0.50.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Logit and Sigmoid Reverse Directions & Interactive B ─────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-emerald-400" />
          <span>Logit and Sigmoid: Two Directions of the Same Bridge</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The logit and sigmoid are exact mathematical inverses of one another:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400">Logit Link Function: <MathText text="$\mu \to \eta$" /></span>
            <p className="text-xs text-slate-400">Starts with a probability and maps it to an unbounded linear score:</p>
            <div className="font-mono text-xs text-emerald-300 pt-1">
              <MathText text="$$\text{logit}(\mu) = \ln\left(\frac{\mu}{1 - \mu}\right) = \eta$$" displayMode={true} />
            </div>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-cyan-400">Sigmoid Mean Function: <MathText text="$\eta \to \mu$" /></span>
            <p className="text-xs text-slate-400">Starts with an unbounded score and maps it to a valid probability:</p>
            <div className="font-mono text-xs text-cyan-300 pt-1">
              <MathText text="$$\sigma(\eta) = \frac{1}{1 + e^{-\eta}} = \mu$$" displayMode={true} />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          During practical model deployment and prediction, we always compute <MathText text="$\eta = \theta^T x + b$" /> first and then evaluate the sigmoid <MathText text="$\sigma(\eta)$" /> to obtain class probabilities.
        </p>

        {/* ── Interactive B Widget ───────────────────────────────────────── */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Interactive: Probability <MathText text="$\to$" /> Odds <MathText text="$\to$" /> Logit <MathText text="$\to$" /> Sigmoid
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              <MathText text="$\mu = $" /> {muB.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Slide the target probability <MathText text="$\mu$" /> to follow the two-way round trip between probability space and log-odds score space:
          </p>

          <input
            type="range"
            min="0.01"
            max="0.99"
            step="0.01"
            value={muB}
            onChange={(e) => setMuB(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold">1. Odds <MathText text="$\frac{\mu}{1-\mu}$" /></div>
              <div className="text-lg font-bold text-slate-200 mt-1">
                {oddsB.toFixed(3)}
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 text-center">
              <div className="text-[10px] text-emerald-400 uppercase font-bold">2. Logit Score <MathText text="$\ln(\text{Odds})$" /></div>
              <div className="text-lg font-bold text-emerald-300 mt-1">
                {logitScoreB.toFixed(3)}
              </div>
            </div>

            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30 text-center">
              <div className="text-[10px] text-cyan-400 uppercase font-bold">3. Sigmoid(Logit)</div>
              <div className="text-lg font-bold text-cyan-300 mt-1">
                {backMuB.toFixed(3)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Training Objectives Differ ───────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Table className="w-4 h-4 text-purple-400" />
          <span>Why the Training Objectives Differ</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The loss function is never picked arbitrarily. It is a direct mathematical consequence of the probability distribution assumed for the target <MathText text="$y$" />:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Model</th>
                <th className="pb-2 font-semibold">Assumed Distribution</th>
                <th className="pb-2 font-semibold">Canonical Link <MathText text="$g(\mu)$" /></th>
                <th className="pb-2 font-semibold">Likelihood-Based Training Objective</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Linear Regression</td>
                <td className="py-2.5 font-mono">Gaussian <MathText text="$\mathcal{N}(\mu, \sigma^2)$" /></td>
                <td className="py-2.5 font-mono text-emerald-300">Identity: <MathText text="$\mu = \eta$" /></td>
                <td className="py-2.5 text-amber-300">Minimize Mean Squared Error (MSE)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300">Logistic Regression</td>
                <td className="py-2.5 font-mono">Bernoulli <MathText text="$\text{Bern}(\mu)$" /></td>
                <td className="py-2.5 font-mono text-emerald-300">Logit: <MathText text="$\ln\left(\frac{\mu}{1-\mu}\right) = \eta$" /></td>
                <td className="py-2.5 text-emerald-300">Maximize Log-Likelihood / Minimize Binary Cross-Entropy</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300">Poisson Regression</td>
                <td className="py-2.5 font-mono">Poisson <MathText text="$\text{Pois}(\lambda)$" /></td>
                <td className="py-2.5 font-mono text-emerald-300">Log Link: <MathText text="$\ln(\mu) = \eta$" /></td>
                <td className="py-2.5 text-rose-300">Poisson Deviance Loss</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Step-by-Step Worked Examples ─────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>Step-by-Step Worked Examples</span>
        </h3>

        <div className="space-y-4">
          {/* Worked Example 1 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Worked Example 1: Linear Regression
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose the feature combination produces linear predictor <MathText text="$\eta = \theta^T x + b = 400{,}000$" />.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-indigo-300 space-y-1">
              <div>Because linear regression uses the identity link: <MathText text="$\mu = g^{-1}(\eta) = \eta = 400{,}000$" />.</div>
            </div>
            <p className="text-xs text-slate-400">
              The model expects the house price to be around $400,000. The Gaussian distribution describes how individual observed houses vary symmetrically around that expected mean due to independent Gaussian noise.
            </p>
          </div>

          {/* Worked Example 2 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Worked Example 2: Logistic Regression
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suppose feature combination produces the identical raw linear predictor <MathText text="$\eta = 1.8$" />.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-cyan-300 space-y-1">
              <div>Because probability cannot be 1.8, apply the inverse logit (sigmoid):</div>
              <div className="text-emerald-300">
                <MathText text="$\mu = \sigma(\eta) = \frac{1}{1 + e^{-1.8}} \approx \frac{1}{1 + 0.1653} \approx 0.858$" />
              </div>
            </div>
            <p className="text-xs text-slate-400">
              The model evaluates the raw score and outputs an 85.8% probability of class 1.
            </p>
          </div>

          {/* Worked Example 3 */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Worked Example 3: Side-by-Side Architectural Comparison
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-1.5 font-semibold">Stage</th>
                    <th className="pb-1.5 font-semibold">Linear Regression</th>
                    <th className="pb-1.5 font-semibold">Logistic Regression</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2 font-semibold text-slate-400">Features to Score</td>
                    <td className="py-2 font-mono text-indigo-300"><MathText text="$\eta = \theta^T x + b$" /></td>
                    <td className="py-2 font-mono text-cyan-300"><MathText text="$\eta = \theta^T x + b$" /></td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-slate-400">Output Meaning</td>
                    <td className="py-2">Expected numerical value <MathText text="($\mu \in \mathbb{R}$)" /></td>
                    <td className="py-2">Probability of class 1 <MathText text="($\mu \in [0, 1]$)" /></td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-slate-400">Conversion Function</td>
                    <td className="py-2 font-mono text-emerald-300">Identity: no change</td>
                    <td className="py-2 font-mono text-emerald-300">Sigmoid: <MathText text="$\sigma(\eta)$" /></td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-slate-400">Distribution</td>
                    <td className="py-2 font-mono">Gaussian <MathText text="$\mathcal{N}(\mu, \sigma^2)$" /></td>
                    <td className="py-2 font-mono">Bernoulli <MathText text="$\text{Bern}(\mu)$" /></td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold text-slate-400">Training Objective</td>
                    <td className="py-2 text-amber-300">Squared Error (MSE)</td>
                    <td className="py-2 text-emerald-300">Log-Likelihood / Binary Cross-Entropy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ── Glossary ──────────────────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>GLM Technical Glossary</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Term</th>
                <th className="pb-2 font-semibold">Core Definition & Role in GLM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">GLM</td>
                <td className="py-2.5">Generalized Linear Model: a framework uniting a target distribution from the exponential family, a linear predictor, and a link function.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300">Linear Predictor <MathText text="$\eta$" /></td>
                <td className="py-2.5">The weighted linear score <MathText text="$\theta^T x + b$" /> aggregating feature evidence before link conversion.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-300">Mean <MathText text="$\mu$" /></td>
                <td className="py-2.5">The expected conditional target value <MathText text="$\mathbb{E}[y \mid x]$" />; for binary targets, this is exactly the probability <MathText text="$P(y=1 \mid x)$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300">Link Function <MathText text="$g(\mu)$" /></td>
                <td className="py-2.5">The mathematical bridge mapping the constrained mean <MathText text="$\mu$" /> to the unconstrained linear predictor <MathText text="$\eta$" />: <MathText text="$g(\mu) = \eta$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-purple-300">Inverse Link / Response Function</td>
                <td className="py-2.5">The inverse mapping <MathText text="$\mu = g^{-1}(\eta)$" /> used during prediction (e.g., the Sigmoid for logistic regression).</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Identity Link</td>
                <td className="py-2.5"><MathText text="$g(\mu) = \mu$" />; leaves the value unchanged, enabling linear regression to predict real numbers directly.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-cyan-300">Logit Link</td>
                <td className="py-2.5"><MathText text="$\ln(\mu / (1 - \mu))$" />; converts a bounded probability into an unbounded real score.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-300">Gaussian Distribution</td>
                <td className="py-2.5">The continuous normal distribution; its log-likelihood mathematically yields the squared error loss.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300">Bernoulli Distribution</td>
                <td className="py-2.5">The discrete probability distribution for binary trials; its log-likelihood derives binary cross-entropy.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
