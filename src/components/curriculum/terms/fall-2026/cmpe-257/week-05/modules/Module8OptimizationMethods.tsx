import React, { useState } from 'react';
import {
  Zap,
  TrendingDown,
  Activity,
  Sliders,
  Scale,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Compass,
  Gauge
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module8OptimizationMethods: React.FC = () => {
  // ── Interactive 1: Gradient Descent & Momentum Step Simulator ──
  // Objective: J(theta) = (theta - 3)^2 => dJ/dtheta = 2*(theta - 3)
  const [initTheta, setInitTheta] = useState<number>(0.0);
  const [lrEta, setLrEta] = useState<number>(0.1);
  const [betaMom, setBetaMom] = useState<number>(0.5);

  // Compute 3 steps of SGD vs Momentum vs Nesterov
  const runSim = () => {
    // SGD
    let tSgd = initTheta;
    const sgdSteps = [tSgd];
    for (let i = 0; i < 3; i++) {
      const g = 2 * (tSgd - 3);
      tSgd = tSgd - lrEta * g;
      sgdSteps.push(tSgd);
    }

    // Momentum: v_t = beta * v_{t-1} + g_t; theta_{t+1} = theta_t - eta * v_t
    let tMom = initTheta;
    let vMom = 0;
    const momSteps: { step: number; grad: number; v: number; theta: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const g = 2 * (tMom - 3);
      vMom = betaMom * vMom + g;
      tMom = tMom - lrEta * vMom;
      momSteps.push({ step: i + 1, grad: g, v: vMom, theta: tMom });
    }

    // Nesterov: lookahead = theta_t - eta * beta * v_{t-1}
    let tNes = initTheta;
    let vNes = 0;
    const nesSteps: { step: number; lookahead: number; grad: number; v: number; theta: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const lookahead = tNes - lrEta * betaMom * vNes;
      const g = 2 * (lookahead - 3);
      vNes = betaMom * vNes + g;
      tNes = tNes - lrEta * vNes;
      nesSteps.push({ step: i + 1, lookahead, grad: g, v: vNes, theta: tNes });
    }

    return { sgdSteps, momSteps, nesSteps };
  };

  const simData = runSim();

  // ── Interactive 2: Adam & RMSProp Step Calculator ──
  const [adamTheta0, setAdamTheta0] = useState<number>(5.0);
  const [adamEta, setAdamEta] = useState<number>(0.1);
  const [adamB1, setAdamB1] = useState<number>(0.9);
  const [adamB2, setAdamB2] = useState<number>(0.999);
  const [grad1, setGrad1] = useState<number>(4.0);
  const [grad2, setGrad2] = useState<number>(2.0);

  // Step 1 Adam
  const m1 = (1 - adamB1) * grad1;
  const v1 = (1 - adamB2) * (grad1 * grad1);
  const m1Hat = m1 / (1 - Math.pow(adamB1, 1));
  const v1Hat = v1 / (1 - Math.pow(adamB2, 1));
  const theta1 = adamTheta0 - adamEta * (m1Hat / (Math.sqrt(v1Hat) + 1e-8));

  // Step 2 Adam
  const m2 = adamB1 * m1 + (1 - adamB1) * grad2;
  const v2 = adamB2 * v1 + (1 - adamB2) * (grad2 * grad2);
  const m2Hat = m2 / (1 - Math.pow(adamB1, 2));
  const v2Hat = v2 / (1 - Math.pow(adamB2, 2));
  const theta2 = theta1 - adamEta * (m2Hat / (Math.sqrt(v2Hat) + 1e-8));

  // RMSProp Comparison Step 1 & 2
  const s1 = (1 - 0.9) * (grad1 * grad1);
  const rmsTheta1 = adamTheta0 - adamEta * (grad1 / Math.sqrt(s1 + 1e-8));
  const s2 = 0.9 * s1 + 0.1 * (grad2 * grad2);
  const rmsTheta2 = rmsTheta1 - adamEta * (grad2 / Math.sqrt(s2 + 1e-8));

  // ── Interactive 3: AdamW Decoupled Decay Calculator ──
  const [wTheta, setWTheta] = useState<number>(10.0);
  const [wEta, setWEta] = useState<number>(0.1);
  const [wLambda, setWLambda] = useState<number>(0.01);
  const [wAdamUpdate, setWAdamUpdate] = useState<number>(0.3);

  const decayAmount = wEta * wLambda * wTheta;
  const totalWSub = wAdamUpdate + decayAmount;
  const newWTheta = wTheta - totalWSub;

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Learning Goal & Core Intuition */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Learning Goals
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Understand the objective, gradient, and learning rate.</li>
              <li>Understand momentum and Nesterov momentum.</li>
              <li>Understand adaptive learning rates and RMSProp.</li>
              <li>Understand Adam’s first moment, second moment, and bias correction.</li>
              <li>Understand AdamW and decoupled weight decay.</li>
              <li>Compare the main optimization methods.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-cyan-400" />
              Core Principle
            </div>
            <p className="text-xs sm:text-sm text-cyan-200 leading-relaxed">
              Optimization is the search for parameter values that minimize the loss objective. Different optimizers manage step size, directional persistence, and adaptive scaling to navigate loss landscapes efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Why Optimization Matters */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <TrendingDown className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white">Why Optimization Matters</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          A model has parameters such as weights. Training means finding parameter values that make the objective or loss small.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-cyan-300 overflow-x-auto">
          <MathText text="J(\theta) = (\theta - 3)^2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block mb-1">For <MathText text="\theta = 0" />:</span>
            <span className="text-rose-400 font-bold"><MathText text="J(0) = (0 - 3)^2 = 9" /></span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block mb-1">For <MathText text="\theta = 3" />:</span>
            <span className="text-emerald-400 font-bold"><MathText text="J(3) = (3 - 3)^2 = 0" /> (Minimum)</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Optimization searches systematically through the parameter space to find values that reduce <MathText text="J(\theta)" />.
        </p>

        {/* Gradient Descent */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            Gradient Descent
          </h3>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-blue-300 overflow-x-auto">
            <MathText text="\theta_{\text{new}} = \theta_{\text{old}} - \eta \frac{dJ}{d\theta}" />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            For our quadratic objective <MathText text="J(\theta) = (\theta - 3)^2" />, the derivative is:
          </p>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-blue-200">
            <MathText text="\frac{dJ}{d\theta} = 2(\theta - 3)" />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Starting with <MathText text="\theta = 0" /> and learning rate <MathText text="\eta = 0.1" />:
          </p>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
            <div><MathText text="\text{gradient} = 2(0 - 3) = -6" /></div>
            <div><MathText text="\theta_{\text{new}} = 0 - (0.1)(-6) = 0.6" /></div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/60 flex items-start gap-2.5 text-xs text-blue-200">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              The <strong>negative sign</strong> ensures the update always moves in the direction opposite to the gradient, descending toward the minimum.
            </span>
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Learning Rate (<MathText text="\eta" />)</th>
                  <th className="py-2.5 px-4 font-sans">Observed Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-amber-300">Too small</td>
                  <td className="py-2.5 px-4 text-slate-300">Safe and monotonically stable, but painfully slow to converge.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-emerald-400">Reasonable</td>
                  <td className="py-2.5 px-4 text-slate-300">Steady, rapid progress toward the optimal parameter values.</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-rose-400">Too large</td>
                  <td className="py-2.5 px-4 text-slate-300">May overshoot the minimum, oscillate wildly, or diverge numerically.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Momentum */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Gauge className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Momentum</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Ordinary gradient descent uses only the instantaneous gradient at the current position. <strong>Momentum</strong> also remembers previous velocity, like a physical heavy ball accumulating speed rolling down a hill.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-indigo-300 overflow-x-auto space-y-2">
          <div><MathText text="v_t = \beta v_{t-1} + \nabla J(\theta_t)" /></div>
          <div><MathText text="\theta_{t+1} = \theta_t - \eta v_t" /></div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Here, <MathText text="\beta" /> controls how much of the previous velocity direction is retained. Setting <MathText text="\beta = 0" /> completely removes velocity memory and recovers standard gradient descent.
        </p>

        {/* Worked Example Table */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-bold text-white">Worked Example (<MathText text="J(\theta) = (\theta - 3)^2, \eta = 0.1, \beta = 0.5, \theta_0 = 0, v_0 = 0" />)</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Step (<MathText text="t" />)</th>
                  <th className="py-2.5 px-4 font-sans">Gradient (<MathText text="\nabla J" />)</th>
                  <th className="py-2.5 px-4 font-sans">Velocity Calculation (<MathText text="v_t" />)</th>
                  <th className="py-2.5 px-4 font-sans">New Position (<MathText text="\theta_{t+1}" />)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-white font-sans">1</td>
                  <td className="py-2.5 px-4 text-cyan-300">-6</td>
                  <td className="py-2.5 px-4">v₁ = 0.5(0) - 6 = -6</td>
                  <td className="py-2.5 px-4 text-emerald-400">0 - 0.1(-6) = 0.6</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-white font-sans">2</td>
                  <td className="py-2.5 px-4 text-cyan-300">-4.8</td>
                  <td className="py-2.5 px-4">v₂ = 0.5(-6) - 4.8 = -7.8</td>
                  <td className="py-2.5 px-4 text-emerald-400">0.6 - 0.1(-7.8) = 1.38</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-white font-sans">3</td>
                  <td className="py-2.5 px-4 text-cyan-300">-3.24</td>
                  <td className="py-2.5 px-4">v₃ = 0.5(-7.8) - 3.24 = -7.14</td>
                  <td className="py-2.5 px-4 text-emerald-400">1.38 - 0.1(-7.14) = 2.094</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Notice how momentum accelerates steps along persistent gradients (<MathText text="\theta" /> advanced from 0 to 0.6, then 1.38, then 2.094, outpacing SGD). This dampens ravines and reduces zigzagging, though excessive momentum can overshoot.
          </p>
        </div>
      </section>

      {/* Nesterov Momentum */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Compass className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Nesterov Momentum</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Ordinary momentum computes the gradient at the current position. <strong>Nesterov Accelerated Gradient (NAG)</strong> first estimates where the current momentum vector will take the parameter, and computes the gradient at that future <em>look-ahead</em> location.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-xs sm:text-sm text-purple-300 overflow-x-auto space-y-1.5">
          <div><MathText text="\text{lookahead} = \theta_t - \eta \beta v_{t-1}" /></div>
          <div><MathText text="g_t = \nabla J(\text{lookahead})" /></div>
          <div><MathText text="v_t = \beta v_{t-1} + g_t" /></div>
          <div><MathText text="\theta_{t+1} = \theta_t - \eta v_t" /></div>
        </div>

        {/* Step 2 Calculation */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-white">Step 2 Calculation Walkthrough</h3>
          <p className="text-xs text-slate-400">
            Following step 1 (<MathText text="\theta_1 = 0.6, v_1 = -6" />):
          </p>
          <div className="space-y-1 font-mono text-xs text-purple-200">
            <div><MathText text="\text{lookahead} = 0.6 - (0.1)(0.5)(-6) = 0.9" /></div>
            <div><MathText text="\text{gradient at lookahead} = 2(0.9 - 3) = -4.2" /></div>
            <div><MathText text="v_2 = 0.5(-6) - 4.2 = -7.2" /></div>
            <div className="text-emerald-300 font-bold"><MathText text="\theta_2 = 0.6 - (0.1)(-7.2) = 1.32" /></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Method</th>
                <th className="py-2.5 px-4 font-sans">Where Gradient is Evaluated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-indigo-300 font-mono">Standard Momentum</td>
                <td className="py-2.5 px-4 text-slate-300">At the current position <MathText text="\theta_t" /></td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-purple-300 font-mono">Nesterov Momentum</td>
                <td className="py-2.5 px-4 text-emerald-300 font-medium">At the projected look-ahead position <MathText text="\theta_t - \eta \beta v_{t-1}" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Adaptive Learning Rates */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Scale className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Adaptive Learning Rates</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Different parameters may have vastly different gradient magnitudes. A single fixed learning rate may cause one parameter to take enormous, unstable leaps while another parameter barely updates.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Parameter</th>
                <th className="py-2.5 px-4 font-sans">Gradient Magnitude</th>
                <th className="py-2.5 px-4 font-sans"><MathText text="\eta = 0.1" /> Update Step</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold"><MathText text="\theta_1" /></td>
                <td className="py-2.5 px-4 text-rose-400">10</td>
                <td className="py-2.5 px-4 text-amber-300">0.1(10) = 1.0 (huge jump)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 text-white font-bold"><MathText text="\theta_2" /></td>
                <td className="py-2.5 px-4 text-cyan-300">0.1</td>
                <td className="py-2.5 px-4 text-slate-400">0.1(0.1) = 0.01 (too slow)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm text-slate-300">
          <p>
            <strong>Adaptive methods</strong> assign each parameter its own dynamic effective step size by accumulating recent squared gradients. Squaring guarantees that positive and negative updates don't cancel out:
          </p>
          <div className="font-mono text-xs text-amber-300 space-y-1">
            <div>&bull; Large recent gradients &rarr; smaller effective step size</div>
            <div>&bull; Small recent gradients &rarr; relatively larger effective step size</div>
          </div>
        </div>
      </section>

      {/* RMSProp */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Zap className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">RMSProp</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          RMSProp maintains an exponentially decaying running average of squared gradients, preventing historical sums from growing infinitely:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-xs sm:text-sm text-emerald-300 overflow-x-auto space-y-2">
          <div><MathText text="s_t = \beta s_{t-1} + (1 - \beta) g_t^2" /></div>
          <div><MathText text="\theta_{t+1} = \theta_t - \eta \frac{g_t}{\sqrt{s_t} + \varepsilon}" /></div>
        </div>

        <p className="text-xs text-slate-400">
          Where <MathText text="\varepsilon" /> is a tiny smoothing constant (e.g. <MathText text="10^{-8}" />) preventing division by zero.
        </p>

        {/* Worked Example */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">
            Worked Numerical Example (<MathText text="\theta_0 = 5, \eta = 0.1, \beta = 0.9, s_0 = 0" />)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-emerald-400 font-bold block mb-1">Step 1: <MathText text="g_1 = 4" /></span>
              <p className="text-slate-300"><MathText text="g_1^2 = 16" /></p>
              <p className="text-slate-300"><MathText text="s_1 = 0.9(0) + 0.1(16) = 1.6" /></p>
              <p className="text-slate-300"><MathText text="\sqrt{s_1} = \sqrt{1.6} \approx 1.2649" /></p>
              <p className="text-slate-300"><MathText text="\text{update} = -0.1 \left(\frac{4}{1.2649}\right) \approx -0.3162" /></p>
              <p className="text-emerald-300 font-bold"><MathText text="\theta_1 = 5 - 0.3162 = 4.6838" /></p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono">
              <span className="text-cyan-400 font-bold block mb-1">Step 2: <MathText text="g_2 = 2" /></span>
              <p className="text-slate-300"><MathText text="g_2^2 = 4" /></p>
              <p className="text-slate-300"><MathText text="s_2 = 0.9(1.6) + 0.1(4) = 1.44 + 0.4 = 1.84" /></p>
              <p className="text-slate-300"><MathText text="\sqrt{s_2} \approx 1.3565" /></p>
              <p className="text-slate-300"><MathText text="\text{update} = -0.1 \left(\frac{2}{1.3565}\right) \approx -0.1473" /></p>
              <p className="text-cyan-300 font-bold"><MathText text="\theta_2 \approx 4.6838 - 0.1473 = 4.5365" /></p>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic">
            RMSProp remembers the prior large gradient (<MathText text="g_1 = 4" />), so step 2 is appropriately scaled down by the recent accumulated variance.
          </p>
        </div>
      </section>

      {/* Adam */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">Adam (Adaptive Moment Estimation)</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          <strong>Adam</strong> combines momentum-like directional tracking (first moment) with RMSProp-like magnitude tracking (second moment), augmented with bias correction for initial iterations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider">First Moment (Direction)</h3>
            <div className="font-mono text-xs sm:text-sm text-blue-200">
              <MathText text="m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t" />
            </div>
            <p className="text-xs text-slate-400">
              Exponential moving average of gradients (conventionally <MathText text="\beta_1 = 0.9" />).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Second Moment (Magnitude)</h3>
            <div className="font-mono text-xs sm:text-sm text-emerald-200">
              <MathText text="v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2" />
            </div>
            <p className="text-xs text-slate-400">
              Exponential moving average of squared gradients (conventionally <MathText text="\beta_2 = 0.999" />).
            </p>
          </div>
        </div>

        {/* Bias Correction & Update */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Bias Correction &amp; Final Parameter Update</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-center">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-blue-300">
              <MathText text="\hat{m}_t = \frac{m_t}{1 - \beta_1^t}" />
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-300">
              <MathText text="\hat{v}_t = \frac{v_t}{1 - \beta_2^t}" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-sm text-cyan-300">
            <MathText text="\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \varepsilon}" />
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Because <MathText text="m_0 = 0" /> and <MathText text="v_0 = 0" />, early estimates are biased toward zero. Dividing by <MathText text="1 - \beta^t" /> counteracts this bias in early epochs when <MathText text="t" /> is small.
          </p>
        </div>

        {/* Numerical Walkthrough */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-blue-900/40 space-y-4">
          <h3 className="text-sm font-bold text-blue-300">
            Numerical Walkthrough (<MathText text="\theta_0 = 5, \eta = 0.1, \beta_1 = 0.9, \beta_2 = 0.999, m_0 = 0, v_0 = 0" />)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-blue-400 font-bold block mb-1">Step 1: <MathText text="g_1 = 4" /></span>
              <p className="text-slate-300"><MathText text="m_1 = 0.9(0) + 0.1(4) = 0.4" /></p>
              <p className="text-slate-300"><MathText text="v_1 = 0.999(0) + 0.001(16) = 0.016" /></p>
              <p className="text-slate-300"><MathText text="\hat{m}_1 = \frac{0.4}{1 - 0.9} = 4" /></p>
              <p className="text-slate-300"><MathText text="\hat{v}_1 = \frac{0.016}{1 - 0.999} = 16" /></p>
              <p className="text-emerald-400 font-bold"><MathText text="\theta_1 = 5 - 0.1\left(\frac{4}{\sqrt{16}}\right) = 5 - 0.1 = 4.9" /></p>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-bold block mb-1">Step 2: <MathText text="g_2 = 2" /></span>
              <p className="text-slate-300"><MathText text="m_2 = 0.9(0.4) + 0.1(2) = 0.56" /></p>
              <p className="text-slate-300"><MathText text="v_2 = 0.999(0.016) + 0.001(4) = 0.019984" /></p>
              <p className="text-slate-300"><MathText text="\hat{m}_2 = \frac{0.56}{1 - 0.9^2} \approx 2.9474" /></p>
              <p className="text-slate-300"><MathText text="\hat{v}_2 = \frac{0.019984}{1 - 0.999^2} \approx 9.998" /></p>
              <p className="text-cyan-300 font-bold"><MathText text="\theta_2 \approx 4.9 - 0.1\left(\frac{2.9474}{\sqrt{9.998}}\right) \approx 4.8068" /></p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                <th className="py-2.5 px-4 font-sans">Adam Component</th>
                <th className="py-2.5 px-4 font-sans">Primary Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-blue-300 font-mono"><MathText text="m_t" /></td>
                <td className="py-2.5 px-4 text-slate-300">Remembers exponential moving direction of past gradients</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-emerald-300 font-mono"><MathText text="v_t" /></td>
                <td className="py-2.5 px-4 text-slate-300">Tracks squared-gradient magnitude for parameter-specific scaling</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-4 font-bold text-amber-300 font-mono">Bias Correction</td>
                <td className="py-2.5 px-4 text-slate-300">Compensates for initial zero-initialization in early iterations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* AdamW and Comparison */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">AdamW and Comparison</h2>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Standard Adam incorporates L2 weight decay into the gradient itself, causing adaptive second moments (<MathText text="v_t" />) to divide the decay penalty. <strong>AdamW</strong> decouples weight decay so it directly shrinks weights independently of the adaptive gradients:
        </p>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-xs sm:text-sm text-indigo-300 overflow-x-auto">
          <MathText text="\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \varepsilon} - \eta \lambda \theta_t" />
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm">
          <h3 className="font-bold text-white">Worked AdamW Decay Calculation</h3>
          <p className="text-slate-300">
            Suppose <MathText text="\theta = 10, \eta = 0.1, \lambda = 0.01" />, and the Adam gradient update is <MathText text="0.3" />:
          </p>
          <div className="font-mono text-xs text-indigo-200 space-y-1">
            <div><MathText text="\text{weight decay amount} = \eta \lambda \theta = (0.1)(0.01)(10) = 0.01" /></div>
            <div><MathText text="\text{total subtraction} = 0.3 + 0.01 = 0.31" /></div>
            <div className="text-emerald-300 font-bold"><MathText text="\text{new } \theta = 10 - 0.31 = 9.69" /></div>
          </div>
          <p className="text-slate-400 text-xs">
            Decoupling keeps weight decay cleanly proportional to the weight magnitude, avoiding improper scaling by historical gradient second moments.
          </p>
        </div>

        {/* Master Optimizer Comparison Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-white">Comprehensive Optimizer Comparison</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-300 font-semibold">
                  <th className="py-2.5 px-4 font-sans">Optimizer</th>
                  <th className="py-2.5 px-4 font-sans">Core Mathematical Mechanism</th>
                  <th className="py-2.5 px-4 font-sans">Key Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans text-xs text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-cyan-300 font-mono">Gradient Descent</td>
                  <td className="py-2.5 px-4">Instantaneous gradient with a single shared learning rate <MathText text="\eta" /></td>
                  <td className="py-2.5 px-4 text-slate-400">Simplest baseline formulation</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-indigo-300 font-mono">Momentum</td>
                  <td className="py-2.5 px-4">Accumulates velocity along consistent historical directions</td>
                  <td className="py-2.5 px-4 text-slate-400">Dampens oscillations and speeds through plateaus</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-purple-300 font-mono">Nesterov Momentum</td>
                  <td className="py-2.5 px-4">Computes gradient at prospective look-ahead position</td>
                  <td className="py-2.5 px-4 text-slate-400">Anticipatory braking prevents overshooting</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-emerald-300 font-mono">RMSProp</td>
                  <td className="py-2.5 px-4">Scales step by square root of exponential moving average of squared gradients</td>
                  <td className="py-2.5 px-4 text-slate-400">Handles non-stationary objectives and varied feature scales</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-blue-300 font-mono">Adam</td>
                  <td className="py-2.5 px-4">Momentum direction + RMSProp magnitude scaling + bias correction</td>
                  <td className="py-2.5 px-4 text-slate-400">Robust standard optimizer for deep neural networks</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-4 font-bold text-amber-300 font-mono">AdamW</td>
                  <td className="py-2.5 px-4">Adam adaptive updates with strictly decoupled weight decay</td>
                  <td className="py-2.5 px-4 text-slate-400">Superior generalization in modern Transformers and LLMs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final Module Recap */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-3">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Final Module Recap</h2>
        </div>

        <ul className="text-xs sm:text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong>Optimization:</strong> Searches for parameter values that minimize the loss objective.</li>
          <li><strong>Gradient Descent:</strong> Steps in the direction opposite to the gradient scaled by learning rate <MathText text="\eta" />.</li>
          <li><strong>Momentum:</strong> Adds velocity memory of previous directions to accelerate convergence and reduce oscillation.</li>
          <li><strong>Nesterov Momentum:</strong> Evaluates the gradient at a prospective look-ahead position for anticipatory corrections.</li>
          <li><strong>RMSProp:</strong> Adapts per-parameter step sizes using an exponential moving average of squared gradients.</li>
          <li><strong>Adam:</strong> Combines direction memory (1st moment), adaptive scaling (2nd moment), and bias correction.</li>
          <li><strong>AdamW:</strong> Decouples weight decay from Adam&apos;s adaptive gradient update for cleaner parameter shrinkage.</li>
        </ul>
      </section>
    </div>
  );
};
