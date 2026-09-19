import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  Sliders,
  Scale,
  GitBranch,
  Split,
  Layers,
  CheckCircle2,
  Table as TableIcon
} from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module1Perceptrons: React.FC = () => {
  // Interactive Demo State: Move the boundary and classify a point
  const [w1, setW1] = useState<number>(2.0);
  const [w2, setW2] = useState<number>(1.0);
  const [bias, setBias] = useState<number>(-4.0);
  const [x1, setX1] = useState<number>(2.0);
  const [x2, setX2] = useState<number>(2.0);

  // Compute Perceptron Score and Prediction
  const scoreZ = w1 * x1 + w2 * x2 + bias;
  const prediction = scoreZ >= 0 ? '+1' : '−1';
  const isPositive = scoreZ >= 0;

  // SVG coordinate transformation constants
  const W = 600;
  const H = 420;
  const pad = 48;
  const xmin = -5;
  const xmax = 5;
  const ymin = -5;
  const ymax = 5;

  const sx = (x: number) => pad + ((x - xmin) / (xmax - xmin)) * (W - 2 * pad);
  const sy = (y: number) => H - pad - ((y - ymin) / (ymax - ymin)) * (H - 2 * pad);

  // Calculate boundary line coordinates across the plot
  let lineX1 = sx(-5);
  let lineY1 = sy(0);
  let lineX2 = sx(5);
  let lineY2 = sy(0);

  if (Math.abs(w2) > 0.001) {
    const ya = (-w1 * (-5) - bias) / w2;
    const yb = (-w1 * 5 - bias) / w2;
    lineX1 = sx(-5);
    lineY1 = sy(ya);
    lineX2 = sx(5);
    lineY2 = sy(yb);
  } else if (Math.abs(w1) > 0.001) {
    const xx = -bias / w1;
    lineX1 = sx(xx);
    lineY1 = sy(-5);
    lineX2 = sx(xx);
    lineY2 = sy(5);
  }

  // Grid tick lines from -5 to +5
  const gridTicks = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* ── Learning Goal Callout ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Learning Goal</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Understand how the foundational perceptron algorithm combines input features, parameter weights, and an intercept bias to draw a linear decision boundary that separates data into two distinct categories.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 font-medium leading-relaxed">
          <strong>The core intuition:</strong> Input features provide evidence, weights determine each feature's contribution, and the bias shifts the threshold—drawing a straight hyperplane that partitions the feature space into positive and negative decision regions.
        </div>
      </div>

      {/* ── What Problem Does a Perceptron Solve? ─────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>What Problem Does a Perceptron Solve?</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          A perceptron is a fundamental <strong>binary linear classifier</strong>. Given numerical features describing an observation, it computes a linear combination of those features to assign the instance to one of two mutually exclusive classes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Canonical Binary Tasks</span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span><strong>Spam detection:</strong> Spam vs. Not Spam</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span><strong>Financial security:</strong> Fraudulent vs. Legitimate transaction</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span><strong>Medical diagnostics:</strong> Disease positive vs. Disease negative</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Geometric Decision Rule</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Find a single straight boundary that places class <MathText text="$+1$" /> on one side and class <MathText text="$-1$" /> on the opposing side:
            </p>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• In <strong>2 dimensions</strong> (<MathText text="$x_1, x_2$" />): The boundary is a <strong>straight line</strong>.</li>
              <li>• In <strong>3 dimensions</strong> (<MathText text="$x_1, x_2, x_3$" />): The boundary is a <strong>flat plane</strong>.</li>
              <li>• In <strong><MathText text="$n$" /> dimensions</strong>: The boundary is an <MathText text="$(n-1)$" />-dimensional <strong>hyperplane</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── The Perceptron Calculation ────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Scale className="w-4 h-4 text-cyan-400" />
          <span>The Perceptron Calculation</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The perceptron evaluates a query instance in two sequential phases: first computing an affine linear score <MathText text="$z$" />, then passing that score through a step threshold function to generate the discrete class label <MathText text="$\hat{y}$" />.
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-sm text-cyan-300">
          <MathText text="$$z = \mathbf{w}^T \mathbf{x} + b = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b$$" displayMode={true} />
        </div>

        {/* Symbol Explanation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Symbol</th>
                <th className="pb-2 font-semibold">Formal Meaning</th>
                <th className="pb-2 font-semibold">Geometric &amp; Physical Intuition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold font-mono text-indigo-300"><MathText text="$\mathbf{x}$" /></td>
                <td className="py-2.5 font-medium">Input Feature Vector</td>
                <td className="py-2.5 text-slate-400">Quantitative coordinates describing the observed example</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-cyan-300"><MathText text="$\mathbf{w}$" /></td>
                <td className="py-2.5 font-medium">Weight Vector</td>
                <td className="py-2.5 text-slate-400">Normal vector orthogonal to the decision boundary; controls slope and orientation</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-amber-300"><MathText text="$b$" /></td>
                <td className="py-2.5 font-medium">Scalar Bias (Intercept)</td>
                <td className="py-2.5 text-slate-400">Translates the boundary away from the origin; shifts the activation threshold</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold font-mono text-emerald-300"><MathText text="$z$" /></td>
                <td className="py-2.5 font-medium">Raw Linear Score (Pre-activation)</td>
                <td className="py-2.5 text-slate-400">Signed proportional distance indicating which side of the boundary the point occupies</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed pt-1">
          Once the raw score <MathText text="$z$" /> is computed, the perceptron applies the signum activation function <MathText text="$\text{sgn}(z)$" />:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-xs text-emerald-400">
          <MathText text="$$\hat{y} = \text{sgn}(z) = \begin{cases} +1 & \text{if } z \ge 0 \\ -1 & \text{if } z < 0 \end{cases}$$" displayMode={true} />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Comparison with Logistic Regression:</strong> Whereas the classical perceptron applies a discontinuous step function producing hard <MathText text="$\{-1, +1\}$" /> outputs, logistic regression swaps the signum with a smooth sigmoid activation <MathText text="$\sigma(z) = 1/(1+e^{-z})$" /> to yield differentiable continuous probabilities <MathText text="$P(y=1 \mid \mathbf{x}) \in (0, 1)$" />.
        </div>
      </div>

      {/* ── How the Decision Boundary Works ──────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Split className="w-4 h-4 text-emerald-400" />
          <span>How the Decision Boundary Works</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          The decision boundary is the geometric locus of points where the perceptron is completely undecided—where the score equals exactly zero:
        </p>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center text-sm text-indigo-300">
          <MathText text="$$w_1 x_1 + w_2 x_2 + b = 0$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-semibold text-slate-200">Worked Algebraic Example:</div>
          <p>
            Suppose the model parameters are <MathText text="$w_1 = 2, \; w_2 = 1, \; b = -4$" />:
          </p>
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300">
            <MathText text="$$2x_1 + x_2 - 4 = 0 \implies x_2 = -2x_1 + 4$$" displayMode={true} />
          </div>
          <p className="text-slate-400">
            This forms a straight line with slope <MathText text="$m = -w_1 / w_2 = -2 / 1 = -2$" /> and vertical intercept <MathText text="$y_0 = -b / w_2 = -(-4)/1 = 4$" />.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-400">Weights Control Orientation (Slope)</span>
            <p className="text-xs text-slate-300">
              Modifying <MathText text="$w_1$" /> or <MathText text="$w_2$" /> changes the angle of the boundary. For two features, the boundary slope is:
            </p>
            <div className="p-2 bg-slate-900 rounded-lg font-mono text-xs text-cyan-300 text-center">
              <MathText text="$\text{slope} = -\frac{w_1}{w_2}$" />
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400">Bias Controls Position (Offset)</span>
            <p className="text-xs text-slate-300">
              Changing the scalar bias <MathText text="$b$" /> translates the boundary line across the plane without altering its angle or slope.
            </p>
            <div className="p-2 bg-slate-900 rounded-lg font-mono text-xs text-amber-300 text-center">
              <MathText text="$\text{intercept} = -\frac{b}{w_2}$" />
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
          <strong>Geometric Ruler Analogy:</strong> The weights rotate the ruler to find the correct separation angle; the bias slides the ruler to find the exact boundary threshold.
        </div>
      </div>

      {/* ── Contextual Interactive Demo: Move the Boundary & Classify ──────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Interactive Demo: Move the Boundary and Classify a Point</span>
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Live 2D Space
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Adjust the weights <MathText text="$w_1, w_2$" /> and bias <MathText text="$b$" /> to reposition the decision boundary line. Then adjust the coordinate values <MathText text="$x_1, x_2$" /> to inspect the resulting score <MathText text="$z$" /> and class prediction:
        </p>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Weight <MathText text="$w_1$" />:</span>
              <span className="text-cyan-300 font-bold">{w1.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={w1}
              onChange={(e) => setW1(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Weight <MathText text="$w_2$" />:</span>
              <span className="text-cyan-300 font-bold">{w2.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={w2}
              onChange={(e) => setW2(Number(e.target.value))}
              className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Bias <MathText text="$b$" />:</span>
              <span className="text-amber-300 font-bold">{bias.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-8"
              max="8"
              step="0.5"
              value={bias}
              onChange={(e) => setBias(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Point <MathText text="$x_1$" />:</span>
              <span className="text-emerald-300 font-bold">{x1.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={x1}
              onChange={(e) => setX1(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Point <MathText text="$x_2$" />:</span>
              <span className="text-emerald-300 font-bold">{x2.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.5"
              value={x2}
              onChange={(e) => setX2(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* SVG Visualization Canvas */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col items-center">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full max-w-[650px] h-auto select-none rounded-lg bg-slate-900 border border-slate-800"
            role="img"
            aria-label="Perceptron decision boundary plot"
          >
            {/* Background grid lines */}
            {gridTicks.map((t) => (
              <React.Fragment key={`grid-${t}`}>
                <line
                  x1={sx(t)}
                  y1={sy(-5)}
                  x2={sx(t)}
                  y2={sy(5)}
                  stroke="#334155"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />
                <line
                  x1={sx(-5)}
                  y1={sy(t)}
                  x2={sx(5)}
                  y2={sy(t)}
                  stroke="#334155"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />
              </React.Fragment>
            ))}

            {/* Principal axes */}
            <line x1={sx(0)} y1={sy(-5)} x2={sx(0)} y2={sy(5)} stroke="#64748b" strokeWidth="1.5" />
            <line x1={sx(-5)} y1={sy(0)} x2={sx(5)} y2={sy(0)} stroke="#64748b" strokeWidth="1.5" />

            {/* Axis labels */}
            <text x={W - 40} y={sy(0) - 8} fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="monospace">
              x₁
            </text>
            <text x={sx(0) + 8} y={32} fill="#94a3b8" fontSize="13" fontWeight="bold" fontFamily="monospace">
              x₂
            </text>

            {/* The Perceptron Decision Boundary Line */}
            <line
              x1={lineX1}
              y1={lineY1}
              x2={lineX2}
              y2={lineY2}
              stroke="#818cf8"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Sample Query Point (x1, x2) */}
            <circle
              cx={sx(x1)}
              cy={sy(x2)}
              r="8"
              fill={isPositive ? '#34d399' : '#f87171'}
              stroke="#ffffff"
              strokeWidth="2.5"
              className="drop-shadow-lg"
            />

            {/* Point coordinate text label */}
            <text
              x={sx(x1) + 12}
              y={sy(x2) - 8}
              fill="#f8fafc"
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              ({x1.toFixed(1)}, {x2.toFixed(1)})
            </text>
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mt-3 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span>Positive Region (<MathText text="$z \ge 0 \implies \hat{y} = +1$" />)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <span>Negative Region (<MathText text="$z < 0 \implies \hat{y} = -1$" />)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-indigo-400 rounded-full" />
              <span>Boundary (<MathText text="$w_1 x_1 + w_2 x_2 + b = 0$" />)</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-300 font-mono">
            Score Calculation:
          </div>
          <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-xs text-slate-300">
            <MathText text={`$z = (${w1.toFixed(1)})(${x1.toFixed(1)}) + (${w2.toFixed(1)})(${x2.toFixed(1)}) + (${bias.toFixed(1)}) = $`} />{' '}
            <strong className={isPositive ? 'text-emerald-400 text-sm' : 'text-rose-400 text-sm'}>
              {scoreZ.toFixed(2)}
            </strong>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Final Classification Output:</span>
            <span
              className={`px-2.5 py-1 rounded-lg font-bold font-mono text-xs ${
                isPositive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              ŷ = {prediction} ({isPositive ? 'Positive Class' : 'Negative Class'})
            </span>
          </div>
        </div>
      </div>

      {/* ── Linear Separability ──────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-purple-400" />
          <span>Linear Separability</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          A dataset is defined as <strong>linearly separable</strong> if and only if there exists at least one linear hyperplane that completely segregates all training examples of class <MathText text="$+1$" /> from class <MathText text="$-1$" /> without any classification errors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Linearly Separable Problems (e.g. AND, OR)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              The positive examples and negative examples form clusters on opposing sides of a divider. A single-layer perceptron is guaranteed to converge and find a valid boundary.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full border border-rose-400 text-rose-400 flex items-center justify-center font-bold text-[10px]">✕</span>
              Non-Linearly Separable Problems (e.g. XOR)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In the classic XOR problem, positive labels occupy diagonal opposite corners <MathText text="$(0,1)$" /> and <MathText text="$(1,0)$" />, while negative labels occupy <MathText text="$(0,0)$" /> and <MathText text="$(1,1)$" />. No single straight line can separate them without error!
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
            Mathematical Separability Condition
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            For ground-truth target labels <MathText text="$y_i \in \{-1, +1\}$" />, every correctly classified data point must satisfy the positive margin condition:
          </p>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-center text-xs text-cyan-300">
            <MathText text="$$y_i (\mathbf{w}^T \mathbf{x}_i + b) > 0 \quad \forall \; i \in \{1, \dots, N\}$$" displayMode={true} />
          </div>
          <p className="text-xs text-slate-400">
            <strong>Why this formula works:</strong> When <MathText text="$y_i = +1$" />, the score <MathText text="$\mathbf{w}^T \mathbf{x}_i + b$" /> must be positive; when <MathText text="$y_i = -1$" />, the score must be negative. Multiplying by <MathText text="$y_i$" /> ensures that any correct prediction yields a strictly positive scalar product!
          </p>
        </div>
      </div>

      {/* ── Putting the Bias Inside the Vector (The Bias Trick) ──────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>The Bias Trick: Homogeneous Vector Representation</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          In practical software implementations and matrix derivations, handling the scalar bias <MathText text="$b$" /> as a separate term is cumbersome. Instead, machine learning engineers use the <strong>bias trick</strong>: augmenting the feature vector with an extra constant feature <MathText text="$x_0 = 1$" />.
        </p>

        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-center text-xs text-amber-300">
          <MathText text="$$\tilde{\mathbf{x}} = \begin{bmatrix} 1 \\ x_1 \\ x_2 \end{bmatrix}, \quad \tilde{\mathbf{w}} = \begin{bmatrix} b \\ w_1 \\ w_2 \end{bmatrix} \implies z = \tilde{\mathbf{w}}^T \tilde{\mathbf{x}}$$" displayMode={true} />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
          <span className="font-semibold text-slate-200">Concrete Numerical Equivalence:</span>
          <p>
            For the score expression <MathText text="$z = 2x_1 + 3x_2 - 4$" />, we set:
          </p>
          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300">
            <MathText text="$$\tilde{\mathbf{w}} = [-4, \; 2, \; 3]^T, \quad \tilde{\mathbf{x}} = [1, \; x_1, \; x_2]^T$$" displayMode={true} />
            <MathText text="$$\tilde{\mathbf{w}}^T \tilde{\mathbf{x}} = (-4)(1) + (2)(x_1) + (3)(x_2) = 2x_1 + 3x_2 - 4$$" displayMode={true} />
          </div>
          <p className="text-slate-400">
            The mathematical computation is 100% identical, but converts the affine expression <MathText text="$\mathbf{w}^T \mathbf{x} + b$" /> into a pure linear inner product <MathText text="$\tilde{\mathbf{w}}^T \tilde{\mathbf{x}}$" />, vastly simplifying vectorization on GPUs and CPUs.
          </p>
        </div>
      </div>

      {/* ── Key Concept Checklist ─────────────────────────────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Module 1 Mastery Checklist</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Before advancing to Module 2 (Perceptron Training), ensure you can confidently explain:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
            <span>How inputs <MathText text="$\mathbf{x}$" />, weights <MathText text="$\mathbf{w}$" />, and bias <MathText text="$b$" /> combine to create linear score <MathText text="$z$" /></span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
            <span>Why the decision boundary occurs at <MathText text="$\mathbf{w}^T \mathbf{x} + b = 0$" /> (zero score undecided line)</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
            <span>How weights rotate the decision ruler while bias slides the ruler</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span>What linear separability means and why the XOR function cannot be solved by a single perceptron</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2 sm:col-span-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
            <span>How the bias trick packs the intercept into homogeneous coordinates: <MathText text="$\tilde{\mathbf{w}}^T \tilde{\mathbf{x}}$" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};
