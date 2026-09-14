import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Check,
  Sliders,
  Calculator,
  Activity,
  TrendingUp,
  Layers,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';

export const Module2Sigmoid: React.FC = () => {
  // Interactive A State: Score to Probability
  const [zA, setZA] = useState<number>(0.0);
  const sigA = 1 / (1 + Math.exp(-zA));
  const decA = sigA > 0.5 ? 'Class 1' : sigA < 0.5 ? 'Class 0' : 'Uncertain (50/50)';

  // Interactive B State: Canvas & Derivative Visualizer
  const [zB, setZB] = useState<number>(0.0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const sigmoidDeriv = (z: number) => {
    const s = sigmoid(z);
    return s * (1 - s);
  };

  const pB = sigmoid(zB);
  const dB = sigmoidDeriv(zB);
  const derivMsg =
    dB > 0.2
      ? 'The curve is changing fastest around the middle (maximum responsiveness: 0.25 at z = 0).'
      : dB > 0.08
      ? 'The curve is changing, but with decreasing slope as predictions become confident.'
      : 'The curve is nearly flat here (saturation / vanishing gradient zone).';

  // Interactive C State: Threshold Choice
  const [pC, setPC] = useState<number>(0.62);
  const [tC, setTC] = useState<number>(0.50);
  const predC = pC >= tC ? 'Class 1' : 'Class 0';

  // Interactive Step-by-Step Calculator State
  const [stepZ, setStepZ] = useState<number>(2.0);
  const expVal = Math.exp(-stepZ);
  const denomVal = 1 + expVal;
  const sigStepVal = 1 / denomVal;

  // Canvas Drawing for Sigmoid and Derivative curves
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const res = setupCanvas(canvas);
    if (!res) return;
    const { ctx, width: w, height: h } = res;

    ctx.clearRect(0, 0, w, h);

    // Padding
    const padX = 35;
    const padY = 25;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const zMin = -6;
    const zMax = 6;

    const toPx = (zVal: number) => padX + ((zVal - zMin) / (zMax - zMin)) * plotW;
    const toPySig = (val: number) => padY + (1 - val) * plotH;
    // Scale derivative (max 0.25) so 0.25 reaches ~80% of graph height for clarity
    const toPyDeriv = (val: number) => padY + (1 - (val / 0.28)) * plotH;

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // Horizontal grid lines (0, 0.5, 1.0 for sigmoid)
    [0, 0.5, 1.0].forEach(p => {
      const y = toPySig(p);
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(padX + plotW, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(p.toFixed(1), padX - 8, y + 3);
    });

    // Vertical line at z = 0
    const zeroX = toPx(0);
    ctx.beginPath();
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([3, 3]);
    ctx.moveTo(zeroX, padY);
    ctx.lineTo(zeroX, padY + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Derivative Curve (Amber dashed)
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    for (let x = zMin; x <= zMax; x += 0.1) {
      const px = toPx(x);
      const d = sigmoidDeriv(x);
      const py = toPyDeriv(d);
      if (x === zMin) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Sigmoid Curve (Cyan solid)
    ctx.beginPath();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    for (let x = zMin; x <= zMax; x += 0.1) {
      const px = toPx(x);
      const s = sigmoid(x);
      const py = toPySig(s);
      if (x === zMin) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Current point on Sigmoid
    const curPx = toPx(zB);
    const curPySig = toPySig(pB);
    const curPyDeriv = toPyDeriv(dB);

    // Vertical indicator at current z
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    ctx.moveTo(curPx, padY);
    ctx.lineTo(curPx, padY + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sigmoid point
    ctx.beginPath();
    ctx.arc(curPx, curPySig, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(curPx, curPySig, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d4';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Derivative point
    ctx.beginPath();
    ctx.arc(curPx, curPyDeriv, 7, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(curPx, curPyDeriv, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [zB, pB, dB]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          By the end of this module, you should be able to explain what happens when a raw linear score goes through the sigmoid function, why its output is guaranteed to be a calibrated probability, how to evaluate it by hand, and why its derivative has that elegant self-referential property.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
          <strong>Big idea:</strong> The linear score <MathText text="$(z)$" /> can be any real number from <MathText text="$(-\infty)$" /> to <MathText text="$(+\infty)$" />. The sigmoid “squashes” that unrestricted score into a strictly bounded value between 0 and 1, which we interpret as a probability.
        </div>
      </div>

      {/* ── 1. The Raw Score is Not a Probability ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">The Raw Score is Not a Probability</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Logistic regression first calculates a weighted linear score:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$z = \theta^T x$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          For a single feature model, this is simply:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$z = \theta_0 + \theta_1 x$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The linear score <MathText text="$(z)$" /> could be <MathText text="$-5$" />, <MathText text="$0$" />, <MathText text="$2$" />, or <MathText text="$100$" />. It represents the accumulated evidence for a class:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold w-1/3">Linear Score <MathText text="$(z)$" /></th>
                <th className="pb-2 font-semibold">What It Suggests</th>
                <th className="pb-2 font-semibold">Intuition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-mono text-rose-400">Large negative <MathText text="$(z \ll 0)$" /></td>
                <td className="py-2.5">Strong evidence for <strong>Class 0</strong></td>
                <td className="py-2.5 text-slate-400">Features strongly point away from target label</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-amber-300">Near zero <MathText text="$(z \approx 0)$" /></td>
                <td className="py-2.5 font-semibold text-amber-300">The model is uncertain (50/50)</td>
                <td className="py-2.5 text-slate-400">Right on the decision boundary</td>
              </tr>
              <tr>
                <td className="py-2.5 font-mono text-emerald-400">Large positive <MathText text="$(z \gg 0)$" /></td>
                <td className="py-2.5">Strong evidence for <strong>Class 1</strong></td>
                <td className="py-2.5 text-slate-400">Features strongly support the target label</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Important distinction:</strong> <MathText text="$(z)$" /> is a continuous score, not a probability. A score of 2 does <em>not</em> mean a probability of 2.
          </div>
        </div>
      </div>

      {/* ── 2. The Sigmoid Formula ────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">The Sigmoid Formula</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The sigmoid function (also known as the <em>logistic function</em>) is defined as:
        </p>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\sigma(z) = \frac{1}{1 + e^{-z}}$$" displayMode={true} />
        </div>

        <p className="text-xs text-slate-400">Each mathematical component plays a distinct role:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 font-mono"><MathText text="$\sigma(z)$" /></span>
            <p className="text-xs text-slate-300">“The sigmoid of <MathText text="$z$" />”. This is the output probability in <MathText text="$(0, 1)$" />.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-indigo-400 font-mono"><MathText text="$z$" /></span>
            <p className="text-xs text-slate-300">The raw linear score produced by the weighted features <MathText text="$\theta^T x$" />.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 font-mono"><MathText text="$e$" /></span>
            <p className="text-xs text-slate-300">Euler’s number, approximately <MathText text="$2.71828$" />, mathematical constant.</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 font-mono"><MathText text="$-z$" /></span>
            <p className="text-xs text-slate-300">The negative of the score. Controls how large or small the denominator becomes.</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          In logistic regression, the hypothesis model is defined as:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$h_\theta(x) = \sigma(\theta^T x) = P(y = 1 \mid x; \theta)$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-400">
          That expression translates directly to: <em>“the model’s estimated conditional probability that the ground-truth label is 1, given the feature inputs <MathText text="$x$" /> parameterized by weights <MathText text="$\theta$" />.”</em>
        </p>
      </div>

      {/* ── 3. Why the Output is Always Between 0 and 1 (Merged with Interactive A) ── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Why the Output is Always Between 0 and 1</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Examine the denominator of the sigmoid:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$1 + e^{-z}$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Because the natural exponential <MathText text="$e^{-z} > 0$" /> for every real number <MathText text="$z$" />, the denominator is <strong>strictly greater than 1</strong>. The numerator is 1, so the fraction is always positive and strictly less than 1:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-emerald-400">
          <MathText text="$$0 < \frac{1}{1 + e^{-z}} < 1 \quad \forall z \in \mathbb{R}$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-400">
          This mathematical bound is precisely why the sigmoid is uniquely suitable for outputting valid probabilities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400">When <MathText text="$z$" /> is very positive <MathText text="$(z \to +\infty)$" /></span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <MathText text="$e^{-z} \to 0$" />. The denominator approaches <MathText text="$1 + 0 = 1$" />, so the fraction approaches <MathText text="$\frac{1}{1} = 1$" /> from below.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-rose-400">When <MathText text="$z$" /> is very negative <MathText text="$(z \to -\infty)$" /></span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <MathText text="$e^{-z} \to +\infty$" />. The denominator explodes to infinity, so the fraction approaches <MathText text="$\frac{1}{\infty} = 0$" /> from above.
            </p>
          </div>
        </div>

        {/* ── Embedded Interactive A: Score to Probability ─────────────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Sliders className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: Score to Probability</h4>
          </div>
          <p className="text-xs text-slate-400">
            Move the slider across large negative and positive linear scores. Watch how the raw score converts into a bounded probability and class decision:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Linear Score <MathText text="$(z)$" />:</span>
              <span className="text-cyan-400 font-mono text-sm">{zA >= 0 ? `+${zA.toFixed(1)}` : zA.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-8"
              max="8"
              step="0.1"
              value={zA}
              onChange={e => setZA(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-slate-400">Estimated Probability <MathText text="$p = \sigma(z)$" />:</span>
                <div className="text-xl font-mono font-bold text-cyan-400 mt-1">{sigA.toFixed(3)}</div>
                <span className="text-[10px] text-slate-500">Always inside (0, 1)</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-slate-400">Decision with Threshold 0.5:</span>
                <div className={`text-xl font-mono font-bold mt-1 ${
                  sigA > 0.5 ? 'text-emerald-400' : sigA < 0.5 ? 'text-amber-400' : 'text-slate-300'
                }`}>
                  {decA}
                </div>
                <span className="text-[10px] text-slate-500">Boundary occurs at z = 0</span>
              </div>
            </div>

            {/* Visual squashed progress bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>0.0 (Class 0)</span>
                <span>0.5 (Uncertain)</span>
                <span>1.0 (Class 1)</span>
              </div>
              <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-150"
                  style={{ width: `${sigA * 100}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              <em>Notice:</em> the score <MathText text="$(z)$" /> can be <MathText text="$-8$" /> or <MathText text="$+8$" />, but the probability never drops below 0 nor exceeds 1.
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. Calculating the Sigmoid Step by Step ───────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">Calculating the Sigmoid Step by Step</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Let’s walk through the exact numerical arithmetic for evaluating the sigmoid function manually.
        </p>

        {/* Hand calculation for z = 2 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Example A: When Score <MathText text="$z = 2$" /></span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30 font-mono">Positive Score</span>
          </div>

          <div className="font-mono text-center text-xs text-slate-300">
            <MathText text="$$\sigma(2) = \frac{1}{1 + e^{-2}}$$" displayMode={true} />
          </div>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-900/90 p-3.5 rounded-lg border border-slate-800/80">
            <li>
              <strong>Step 1: Calculate the exponent.</strong> Since <MathText text="$e^{-2} \approx 0.1353$" />:
              <div className="font-mono text-cyan-300 pl-4 pt-1">
                <MathText text="$$\sigma(2) = \frac{1}{1 + 0.1353}$$" displayMode={true} />
              </div>
            </li>
            <li>
              <strong>Step 2: Add inside the denominator:</strong>
              <div className="font-mono text-cyan-300 pl-4 pt-1">
                <MathText text="$$\sigma(2) = \frac{1}{1.1353}$$" displayMode={true} />
              </div>
            </li>
            <li>
              <strong>Step 3: Divide:</strong>
              <div className="font-mono text-cyan-300 pl-4 pt-1">
                <MathText text="$$\sigma(2) \approx 0.881$$" displayMode={true} />
              </div>
            </li>
          </ol>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
            <strong>Conclusion:</strong> A linear score of <MathText text="$(z = 2)$" /> becomes an estimated class-1 probability of approximately <strong>88.1%</strong>.
          </div>
        </div>

        {/* Hand calculation for z = -2 */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Example B: When Score <MathText text="$z = -2$" /></span>
            <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 font-mono">Negative Score</span>
          </div>

          <div className="font-mono text-center text-xs text-slate-300">
            <MathText text="$$\sigma(-2) = \frac{1}{1 + e^{-(-2)}} = \frac{1}{1 + e^{2}} = \frac{1}{1 + 7.389} \approx 0.119$$" displayMode={true} />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            A negative score produces a low estimated probability of class 1 (<strong>11.9%</strong>), which is equivalent to an <strong>88.1%</strong> probability of class 0. Notice the beautiful complement symmetry: <MathText text="$\sigma(-z) = 1 - \sigma(z)$" />!
          </p>
        </div>

        {/* Live Step-by-Step Evaluator */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" />
              Live 3-Step Evaluator for Any Score
            </span>
            <span className="text-xs font-mono text-amber-400">z = {stepZ.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.5"
            value={stepZ}
            onChange={e => setStepZ(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[11px]">1. Exponent <MathText text="$e^{-z}$" /></span>
              <div className="font-mono font-bold text-cyan-300 text-sm">{expVal.toFixed(4)}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[11px]">2. Denom <MathText text="$1 + e^{-z}$" /></span>
              <div className="font-mono font-bold text-indigo-300 text-sm">{denomVal.toFixed(4)}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-0.5">
              <span className="text-slate-400 text-[11px]">3. Output <MathText text="$\sigma(z)$" /></span>
              <div className="font-mono font-bold text-emerald-400 text-sm">{sigStepVal.toFixed(4)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. What the S-Shape Means ─────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">What the S-Shape Means</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The sigmoid is <strong>not a parabola</strong>. A parabola is bowl-shaped, such as <MathText text="$y = x^2$" />. The sigmoid is S-shaped (sigmoidal) because it exhibits three distinct operational regions:
        </p>

        <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-3.5 rounded-xl border border-slate-800">
          <li><strong>Lower tail:</strong> It is nearly flat near 0.</li>
          <li><strong>Active middle:</strong> It rises steeply around probability 0.5.</li>
          <li><strong>Upper tail:</strong> It is nearly flat near 1.</li>
        </ol>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold w-1/3">Region</th>
                <th className="pb-2 font-semibold">Model Behavior</th>
                <th className="pb-2 font-semibold">Sensitivity to Weight Changes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-semibold text-rose-400">Probability near 0</td>
                <td className="py-2.5">Small score changes barely affect the output.</td>
                <td className="py-2.5 text-slate-400">Saturated / confident class 0</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-amber-300">Probability near 0.5</td>
                <td className="py-2.5 font-semibold text-amber-300">The model is uncertain and responds strongly to score changes.</td>
                <td className="py-2.5 text-emerald-400">Maximum responsiveness</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-emerald-400">Probability near 1</td>
                <td className="py-2.5">Small score changes barely affect the output.</td>
                <td className="py-2.5 text-slate-400">Saturated / confident class 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 6. The Derivative of the Sigmoid (Merged with Interactive B) ──── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">The Derivative of the Sigmoid</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The derivative tells us how quickly the sigmoid output changes when the score <MathText text="$(z)$" /> changes:
        </p>
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$\sigma'(z) = \frac{d\sigma(z)}{dz} = \sigma(z) \times (1 - \sigma(z))$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          This formula is remarkably convenient: <strong>once we know the sigmoid output, we can calculate its exact derivative through a single multiplication without starting over!</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono">
            <span className="text-slate-400 font-sans">If <MathText text="$\sigma(z) = 0.8$" />:</span>
            <div className="text-amber-400 text-sm font-bold">
              <MathText text="$\sigma'(z) = 0.8 \times (1 - 0.8) = 0.8 \times 0.2 = 0.16$" />
            </div>
            <span className="text-[11px] text-slate-400 font-sans">Moderate response</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono">
            <span className="text-slate-400 font-sans">If <MathText text="$\sigma(z) = 0.5$" /> (at <MathText text="$z=0$" />):</span>
            <div className="text-emerald-400 text-sm font-bold">
              <MathText text="$\sigma'(z) = 0.5 \times 0.5 = 0.25$" />
            </div>
            <span className="text-[11px] text-emerald-400 font-sans">Peak maximum derivative (0.25)</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Do not confuse the jobs:</strong> The sigmoid <MathText text="$\sigma(z)$" /> produces the hypothesis probability for inference; its derivative <MathText text="$\sigma'(z)$" /> helps calculate the gradient to adjust the model's weights during training.
          </div>
        </div>

        {/* ── Embedded Interactive B: See the Derivative Canvas & Curve ─── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400">
              <Activity className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: See the Derivative on the S-Curve</h4>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
                <MathText text="$\sigma(z)$" />
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" />
                <MathText text="$\sigma'(z)$" />
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Slide <MathText text="$(z)$" /> to observe both the sigmoid output point and the derivative value on the plot:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
            {/* Canvas Plot */}
            <div className="relative w-full h-52 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Input score <MathText text="$(z)$" />:</span>
                <span className="text-amber-400 font-mono text-sm">{zB >= 0 ? `+${zB.toFixed(1)}` : zB.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="0.1"
                value={zB}
                onChange={e => setZB(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-slate-400">Sigmoid Output <MathText text="$\sigma(z)$" />:</span>
                <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5">{pB.toFixed(3)}</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                <span className="text-slate-400">Derivative <MathText text="$\sigma'(z) = \sigma(1-\sigma)$" />:</span>
                <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">{dB.toFixed(3)}</div>
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs ${
              dB > 0.2
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : dB > 0.08
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <strong>Model responsiveness:</strong> {derivMsg}
            </div>
          </div>
        </div>
      </div>

      {/* ── 7. From Probability to Class (Merged with Interactive C) ─────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100">From Probability to Class</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          After calculating <MathText text="$p = \sigma(z)$" />, we apply a decision threshold to yield the discrete prediction:
        </p>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
          <MathText text="$$\text{If } p \geq 0.5 \implies \hat{y} = 1, \quad \text{otherwise } \hat{y} = 0$$" displayMode={true} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Because <MathText text="$\sigma(0) = 0.5$" />, the probability threshold <MathText text="$p = 0.5$" /> corresponds exactly to the score <MathText text="$z = 0$" />:
        </p>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
          <MathText text="$$p \geq 0.5 \iff z = \theta^T x \geq 0$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
          <strong>Full Logistic Pipeline:</strong> Features <MathText text="$(x)$" /> &rarr; Weighted Score <MathText text="$(z = \theta^T x)$" /> &rarr; Sigmoid Probability <MathText text="$(p = \sigma(z))$" /> &rarr; Threshold &rarr; Predicted Class <MathText text="$(\hat{y})$" />.
        </div>

        {/* ── Embedded Interactive C: Threshold Choice ─────────────────── */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Sliders className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Try it Live: Threshold Choice</h4>
          </div>
          <p className="text-xs text-slate-400">
            Keep the model probability fixed and change the threshold. This illustrates that the final class decision depends on your chosen decision cutoff:
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Probability <MathText text="$(p)$" />:</span>
                  <span className="text-cyan-400 font-mono">{pC.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={pC}
                  onChange={e => setPC(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Threshold:</span>
                  <span className="text-purple-400 font-mono">{tC.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.01"
                  value={tC}
                  onChange={e => setTC(parseFloat(e.target.value))}
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
                Because <MathText text={`$(p=${pC.toFixed(2)})$`} /> is {pC >= tC ? 'at least' : 'below'} the threshold <MathText text={`$(${tC.toFixed(2)})$`} />.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Worked Examples ───────────────────────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-cyan-400">
          <Calculator className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-100">Worked Examples</h3>
        </div>

        {/* Worked Example 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 1: Student Classification</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suppose the logistic regression model uses hours studied <MathText text="$(x)$" />:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$z = -4 + x$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-300">A student studied <MathText text="$(x = 6)$" /> hours:</p>

          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li><strong>Find the score:</strong> <MathText text="$z = -4 + 6 = 2$" />.</li>
            <li><strong>Apply sigmoid:</strong> <MathText text="$$p = \sigma(2) = \frac{1}{1 + e^{-2}} \approx 0.881$$" displayMode={true} /></li>
            <li><strong>Interpret:</strong> The estimated probability of class 1 is <strong>88.1%</strong>.</li>
            <li><strong>Use threshold 0.5:</strong> <MathText text="$0.881 \geq 0.5$" />, so predict <strong>Class 1</strong>.</li>
          </ol>
        </div>

        {/* Worked Example 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 2: What If the Score is Zero?</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            If the score is exactly <MathText text="$(z = 0)$" />:
          </p>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$\sigma(0) = \frac{1}{1 + e^{0}} = \frac{1}{1 + 1} = 0.5$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The model is exactly on the <strong>decision boundary</strong>. It has no preference between class 0 and class 1.
          </p>
        </div>

        {/* Worked Example 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
          <h4 className="text-sm font-bold text-slate-100">Worked Example 3: Derivative Interpretation</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Compare three points on the sigmoid curve:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Probability <MathText text="$p = \sigma(z)$" /></th>
                  <th className="pb-2 font-semibold">Derivative <MathText text="$\sigma'(z) = p(1-p)$" /></th>
                  <th className="pb-2 font-semibold">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2.5 font-mono text-emerald-400">0.50</td>
                  <td className="py-2.5 font-mono font-bold text-amber-400">0.2500</td>
                  <td className="py-2.5 font-semibold text-emerald-300">Most responsive (maximum rate of change)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-cyan-300">0.90</td>
                  <td className="py-2.5 font-mono font-bold text-amber-400">0.0900</td>
                  <td className="py-2.5 text-slate-400">Less responsive (confident prediction)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-cyan-300">0.99</td>
                  <td className="py-2.5 font-mono font-bold text-amber-400">0.0099</td>
                  <td className="py-2.5 text-rose-400">Almost flat (gradient saturation)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
            <strong>Key takeaway:</strong> The model changes most rapidly during learning when it is <em>uncertain</em> (<MathText text="$p \approx 0.5$" />), not when it is already extremely confident.
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
                <td className="py-2.5 font-bold text-indigo-300">Raw score <MathText text="$(z)$" /></td>
                <td className="py-2.5">The weighted sum <MathText text="$z = \theta^T x$" />, before probability conversion.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Sigmoid <MathText text="$\sigma(z)$" /></td>
                <td className="py-2.5">An S-shaped function mapping a real-valued score to a number between 0 and 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Euler’s number <MathText text="$(e)$" /></td>
                <td className="py-2.5">A mathematical constant approximately equal to <MathText text="$2.71828$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Probability <MathText text="$(p)$" /></td>
                <td className="py-2.5">The model’s estimated chance of class 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Threshold</td>
                <td className="py-2.5">A cutoff used to turn a probability into a discrete class decision.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Derivative <MathText text="$\sigma'(z)$" /></td>
                <td className="py-2.5">The rate at which the sigmoid output changes as the score changes: <MathText text="$\sigma(1-\sigma)$" />.</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Asymptote</td>
                <td className="py-2.5">A value that a function approaches without reaching; the sigmoid asymptotically approaches 0 and 1.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
