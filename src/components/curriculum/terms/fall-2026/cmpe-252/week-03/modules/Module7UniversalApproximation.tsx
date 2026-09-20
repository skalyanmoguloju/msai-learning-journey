import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Target,
  Layers,
  Calculator,
  Activity,
  Maximize2,
  TrendingDown
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module7UniversalApproximation: React.FC = () => {
  // --- Playground 1: Interactive Tolerance Calculator State ---
  const [trueVal, setTrueVal] = useState<number>(10.0);
  const [predVal, setPredVal] = useState<number>(9.7);
  const [epsVal, setEpsVal] = useState<number>(0.5);

  const absError = Math.abs(trueVal - predVal);
  const isAccepted = absError < epsVal;

  // --- Playground 2: ReLU Absolute Value Synthesizer State ---
  const [xVal, setXVal] = useState<number>(-3.0);
  const h1 = Math.max(0, xVal);
  const h2 = Math.max(0, -xVal);
  const yReLUSum = h1 + h2;

  // --- Playground 3: Piecewise Curve Approximation Visualizer State ---
  const [pieces, setPieces] = useState<number>(4);

  // Target function: f(x) = 0.35 * x^2 + 0.45 * sin(2.3 * x) + 1.5 over [-3, 3]
  const targetFunc = (x: number) => 0.35 * x * x + 0.45 * Math.sin(2.3 * x) + 1.5;

  const { targetPath, approxPath, knots, meanError } = useMemo(() => {
    const xMin = -3.0;
    const xMax = 3.0;
    const yMin = 0.0;
    const yMax = 6.0;

    const width = 800;
    const height = 260;

    const toSvgX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toSvgY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Build smooth target path
    const targetPoints: string[] = [];
    const sampleCount = 200;
    for (let i = 0; i <= sampleCount; i++) {
      const x = xMin + ((xMax - xMin) * i) / sampleCount;
      const y = targetFunc(x);
      const px = toSvgX(x);
      const py = toSvgY(y);
      targetPoints.push(`${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${py.toFixed(2)}`);
    }

    // Build piecewise linear approximation knots
    const knotList: { x: number; y: number; px: number; py: number }[] = [];
    for (let i = 0; i <= pieces; i++) {
      const x = xMin + ((xMax - xMin) * i) / pieces;
      const y = targetFunc(x);
      knotList.push({ x, y, px: toSvgX(x), py: toSvgY(y) });
    }

    const approxPoints: string[] = [];
    knotList.forEach((k, idx) => {
      approxPoints.push(`${idx === 0 ? 'M' : 'L'} ${k.px.toFixed(2)} ${k.py.toFixed(2)}`);
    });

    // Compute Mean Absolute Error
    let sumErr = 0;
    const evalSteps = 240;
    for (let i = 0; i <= evalSteps; i++) {
      const x = xMin + ((xMax - xMin) * i) / evalSteps;
      const trueY = targetFunc(x);

      // Find active segment
      const seg = Math.min(pieces - 1, Math.floor(((x - xMin) / (xMax - xMin)) * pieces));
      const left = knotList[seg];
      const right = knotList[seg + 1];
      const t = (x - left.x) / (right.x - left.x);
      const approxY = left.y + t * (right.y - left.y);

      sumErr += Math.abs(trueY - approxY);
    }
    const avgErr = sumErr / (evalSteps + 1);

    return {
      targetPath: targetPoints.join(' '),
      approxPath: approxPoints.join(' '),
      knots: knotList,
      meanError: avgErr
    };
  }, [pieces]);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200">
      {/* 1. CONCEPTUAL FOUNDATION: What Does Approximate Mean? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">1. What Does &ldquo;Approximate&rdquo; Mean?</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Mathematical Precision
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In machine learning, the <strong className="text-slate-100">target function</strong>{' '}
          <MathText text="f(x)" /> is the true ground-truth relationship governing the phenomenon. A neural network produces its own
          predictive function <MathText text="f_\theta(x)" /> parameterized by weights and biases <MathText text="\theta" />.
          To <em>approximate</em> does not demand exact point-by-point identity; rather, it requires that the prediction error
          remains strictly smaller than an allowed tolerance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Target Function</span>
            <div className="font-mono text-base text-slate-100">
              <MathText text="f(x)" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The underlying true mathematical rule or real-world relationship we desire the model to replicate.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Network Prediction Function</span>
            <div className="font-mono text-base text-slate-100">
              <MathText text="f_\theta(x)" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The surrogate function evaluated by forward propagating inputs through weights and activation functions.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-indigo-300">
          <MathText text="\text{Approximation Error: } \quad \mathcal{E}(x) = \left| f(x) - f_\theta(x) \right| < \varepsilon" />
        </div>
      </div>

      {/* 2. INTERACTIVE DEMO: Epsilon Tolerance Calculator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive Tolerance Calculator</h3>
          </div>
          <span className="text-xs text-slate-400">
            Evaluating Acceptable Error Bounds
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the target value, network prediction, and allowed error tolerance <MathText text="\varepsilon" />. Observe whether the
          prediction qualifies as an acceptable approximation:
        </p>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Target Value <MathText text="f(x)" />:</span>
              <span className="font-mono text-sm text-indigo-400">{trueVal.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={trueVal}
              onChange={(e) => setTrueVal(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">True observable coordinate</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Network Prediction <MathText text="f_\theta(x)" />:</span>
              <span className="font-mono text-sm text-cyan-400">{predVal.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={predVal}
              onChange={(e) => setPredVal(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <span className="text-[10px] text-slate-500 block">Current model output</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Error Tolerance <MathText text="\varepsilon" />:</span>
              <span className="font-mono text-sm text-amber-400">{epsVal.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={epsVal}
              onChange={(e) => setEpsVal(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] text-slate-500 block">Maximum permissible error margin</span>
          </div>
        </div>

        {/* Calculation Result Box */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-sm text-slate-200">
              <span className="text-slate-400">Absolute Deviation: </span>
              <MathText text={`|${trueVal.toFixed(1)} - ${predVal.toFixed(1)}| = `} />
              <strong className="text-indigo-300 font-bold">{absError.toFixed(2)}</strong>
            </div>
            <div className="text-xs text-slate-400">
              Acceptance Threshold: <span className="font-mono text-amber-300">{epsVal.toFixed(1)}</span> units
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAccepted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Accepted: Deviation {absError.toFixed(2)} &lt; &epsilon; ({epsVal.toFixed(1)})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Rejected: Deviation {absError.toFixed(2)} &ge; &epsilon; ({epsVal.toFixed(1)})
              </span>
            )}
            <button
              onClick={() => {
                setTrueVal(10.0);
                setPredVal(9.7);
                setEpsVal(0.5);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
              title="Reset values"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. THE UNIVERSAL APPROXIMATION THEOREM */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">2. The Universal Approximation Theorem</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            Cybenko (1989) &amp; Hornik (1991)
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The theorem establishes the fundamental mathematical representational capacity of artificial neural networks.
          Under mild conditions, a standard feed-forward network with <strong className="text-slate-100">a single hidden layer</strong>,
          non-linear activation functions, and sufficiently many hidden units can approximate any continuous function on a
          compact domain to arbitrary accuracy:
        </p>

        {/* Central Mathematical Formula */}
        <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-base text-cyan-300 overflow-x-auto">
          <MathText text="\forall \varepsilon > 0, \quad \exists \theta : \quad \sup_{x \in K} \left| f(x) - f_\theta(x) \right| < \varepsilon" />
        </div>

        {/* Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/4">Symbol / Condition</th>
                <th className="pb-2.5 w-3/4">Rigorous Mathematical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold font-mono text-indigo-300"><MathText text="\forall \varepsilon > 0" /></td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  For every strictly positive error tolerance, no matter how microscopically small.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-indigo-300"><MathText text="\exists \theta" /></td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  There exists some configuration of internal weights and biases <MathText text="\mathbf{W}, \mathbf{b}" />.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-indigo-300"><MathText text="\left| f(x) - f_\theta(x) \right|" /></td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  The uniform absolute difference between the true target function and the model&apos;s output.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-indigo-300"><MathText text="\forall x \in K" /></td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  The error bound holds uniformly across every point inside the compact (closed and bounded) domain <MathText text="K" />.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Continuous Function</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A target function with no abrupt asymptotic discontinuities or undefined infinite jumps over <MathText text="K" />.
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-indigo-300">Compact / Bounded Region</td>
                <td className="py-2.5 text-slate-400 leading-relaxed">
                  A finite bounded region (e.g. <MathText text="x \in [-2, 2]" />). Approximation is not guaranteed to hold as <MathText text="x \to \pm\infty" />.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300">Crucial Quantifier Order:</strong> Notice the sequence of quantifiers:
            for each target function <MathText text="f" /> and desired tolerance <MathText text="\varepsilon" />, there exists a
            <em> tailored</em> set of weights <MathText text="\theta" />. The theorem does <strong className="text-slate-100">not</strong> claim
            that a single static parameter set can simultaneously approximate every target function!
          </p>
        </div>
      </div>

      {/* 4. HOW SIMPLE NEURONS BUILD COMPLEX FUNCTIONS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">3. How Simple Neurons Build Complex Functions</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
            ReLU Basis Construction
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Each hidden unit computes a basic non-linear basis transformation. The output layer then aggregates these local
          features via linear superposition:
        </p>

        {/* Conceptual Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-semibold py-2">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
            1. Raw Input <MathText text="x" />
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-300">
            2. Hidden Responses <MathText text="h_i(x) = g(\mathbf{w}_i^T x + b_i)" />
          </div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-300">
            3. Linear Readout <MathText text="\sum w_i h_i(x) + c" />
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">
            4. Complex Target Output <MathText text="\hat{y}" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Example: Absolute Value Function Synthesis via 2 ReLUs</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Consider synthesizing the non-linear absolute value function <MathText text="f(x) = |x|" /> using two standard ReLU units:
          </p>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-indigo-200 space-y-1">
            <div><MathText text="h_1(x) = \text{ReLU}(x) = \max(0, x), \qquad h_2(x) = \text{ReLU}(-x) = \max(0, -x)" /></div>
            <div><MathText text="\hat{y} = h_1(x) + h_2(x) = \max(0, x) + \max(0, -x) = |x|" /></div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Neuron 1 handles positive coordinates with unit slope; Neuron 2 handles negative coordinates with unit slope.
            Their linear sum forms the sharp V-shaped corner at <MathText text="x = 0" />!
          </p>
        </div>

        {/* Interactive ReLU Synthesizer Slider */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Test Input Coordinate <MathText text="x" />:</span>
            <span className="font-mono text-sm text-indigo-400 font-bold">{xVal.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={xVal}
            onChange={(e) => setXVal(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-1">Neuron 1: ReLU(x)</span>
              <span className="text-emerald-400 font-bold text-sm">{h1.toFixed(2)}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px] mb-1">Neuron 2: ReLU(-x)</span>
              <span className="text-cyan-400 font-bold text-sm">{h2.toFixed(2)}</span>
            </div>
            <div className="p-3 rounded-lg bg-indigo-950/50 border border-indigo-500/30">
              <span className="text-indigo-300 block text-[11px] mb-1">Output: h1 + h2 = |x|</span>
              <span className="text-indigo-200 font-bold text-sm">{yReLUSum.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
          <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-indigo-300">Why Non-linearity Is Indispensable:</strong> Without non-linear activations
            (e.g., if <MathText text="g(z) = z" />), any sequence of matrix multiplications collapses mathematically to a single
            affine transformation <MathText text="\mathbf{W}' \mathbf{x} + \mathbf{b}'" />. Non-linearities introduce &ldquo;bends&rdquo; and
            threshold facets, permitting piecewise linear or smooth curve approximation.
          </p>
        </div>
      </div>

      {/* 5. INTERACTIVE VISUALIZATION: Piecewise Curve Approximation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-100">Interactive Visual Curve Approximation</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
            Piecewise Linear Synthesis
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          This visualizer illustrates how increasing the number of hidden linear segments (basis neurons) allows a network
          to track an intricate non-linear curve <MathText text="f(x) = 0.35x^2 + 0.45\sin(2.3x) + 1.5" /> with diminishing error:
        </p>

        {/* Piece slider */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Number of Hidden Linear Segments (Pieces / Neurons):</span>
            <span className="font-mono text-sm text-amber-400 font-bold">{pieces} segments</span>
          </div>
          <input
            type="range"
            min="2"
            max="20"
            step="1"
            value={pieces}
            onChange={(e) => setPieces(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>2 pieces (Coarse)</span>
            <span>10 pieces (Moderate)</span>
            <span>20 pieces (Fine)</span>
          </div>
        </div>

        {/* SVG Curve Plot */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-900">
            <svg viewBox="0 0 800 260" className="w-full h-auto block select-none">
              {/* Grid Lines */}
              <line x1="0" y1="52" x2="800" y2="52" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="104" x2="800" y2="104" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="156" x2="800" y2="156" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="208" x2="800" y2="208" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="400" y1="0" x2="400" y2="260" stroke="#334155" strokeWidth="1.5" />

              {/* Smooth Target Curve (Blue/Indigo) */}
              <path d={targetPath} fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

              {/* Piecewise Approximation (Amber/Orange) */}
              <path d={approxPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Knot circles */}
              {knots.map((k, i) => (
                <circle key={i} cx={k.px} cy={k.py} r="4" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
              ))}
            </svg>
          </div>

          {/* Legend and Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-indigo-300 font-medium">
                <span className="w-3 h-1 bg-indigo-500 rounded-full inline-block"></span>
                Target Function <MathText text="f(x)" />
              </span>
              <span className="flex items-center gap-1.5 text-amber-300 font-medium">
                <span className="w-3 h-1 bg-amber-500 rounded-full inline-block"></span>
                Piecewise Approximation <MathText text="f_\theta(x)" />
              </span>
            </div>

            <div className="font-mono text-slate-300">
              Mean Vertical Error: <strong className="text-cyan-300 font-bold">{meanError.toFixed(4)}</strong>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
          <strong className="text-slate-200">Takeaway:</strong> As the number of segments <MathText text="n" /> grows,
          the piecewise linear chords conform more tightly to the underlying continuous curvature, driving the approximation
          bound <MathText text="\varepsilon \to 0" />.
        </div>
      </div>

      {/* 6. WHAT THE THEOREM DOES NOT GUARANTEE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-slate-100">4. What the Theorem Does NOT Guarantee</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
            Crucial Limitations
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          The Universal Approximation Theorem is strictly a statement of <strong className="text-slate-100">representational existence</strong>.
          It proves that a suitable network configuration exists in theory, but offers <strong className="text-rose-400">no algorithmic guarantee</strong> that
          practical machine learning procedures will discover it.
        </p>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center font-mono text-sm text-rose-400">
          <MathText text="\text{Can Represent a Function} \quad \centernot\implies \quad \text{Can Easily Learn It via Gradient Descent}" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Optimization Non-Guarantees
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-slate-300">Non-convex Landscapes:</strong> Gradient descent may get trapped in suboptimal local minima, saddle points, or flat plateaus.
              </li>
              <li>
                <strong className="text-slate-300">Vanishing/Exploding Gradients:</strong> Numerical updates may attenuate to zero or destabilize during backpropagation.
              </li>
              <li>
                <strong className="text-slate-300">No Weight Formula:</strong> The theorem is non-constructive; it doesn&apos;t provide an analytical formula to set weights directly.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Practical &amp; Data Non-Guarantees
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-slate-300">Exponential Width:</strong> In high dimensions, a single hidden layer may require an astronomical number of neurons <MathText text="\mathcal{O}((1/\varepsilon)^d)" />.
              </li>
              <li>
                <strong className="text-slate-300">Finite Sample Data:</strong> Having capacity does not protect against overfitting or poor sampling coverage.
              </li>
              <li>
                <strong className="text-slate-300">Out-of-Distribution Behavior:</strong> Beyond the bounded compact set <MathText text="K" />, network behavior can diverge wildly.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7. EXPRESSIVE POWER VERSUS LEARNABILITY */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-slate-100">5. Expressive Power vs. Learnability</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
            The 4 Pillars
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          To reason clearly about neural network behavior, keep these four distinct questions cleanly separated:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                <th className="pb-2.5 w-1/3">Core Question</th>
                <th className="pb-2.5 w-1/4">Underlying Concept</th>
                <th className="pb-2.5 w-5/12">Architectural Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 text-slate-200">Can the model architecture represent the target function?</td>
                <td className="py-2.5 font-bold text-indigo-300">Expressive Power</td>
                <td className="py-2.5 text-slate-400">Network depth, width, non-linear activation type</td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-200">Can training efficiently find high-quality weights?</td>
                <td className="py-2.5 font-bold text-cyan-300">Optimization</td>
                <td className="py-2.5 text-slate-400">Optimizer (SGD, Adam), learning rate, loss landscape</td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-200">Does the dataset carry enough informative signal?</td>
                <td className="py-2.5 font-bold text-amber-300">Data Coverage</td>
                <td className="py-2.5 text-slate-400">Sample size <MathText text="N" />, label quality, signal-to-noise ratio</td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-200">Will the model accurately predict new unseen examples?</td>
                <td className="py-2.5 font-bold text-emerald-300">Generalization</td>
                <td className="py-2.5 text-slate-400">Regularization, weight decay, inductive bias, validation loss</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-200">The Optimization Step:</h4>
          <div className="p-2.5 rounded bg-slate-900 text-center font-mono text-xs text-indigo-300">
            <MathText text="\theta_{t+1} = \theta_t - \alpha \nabla_\theta \mathcal{L}(\theta_t)" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Even if a mathematically ideal configuration <MathText text="\theta^*" /> exists, gradient descent updates
            only have access to local first-order slope information computed on finite mini-batches.
          </p>
        </div>
      </div>
    </div>
  );
};

