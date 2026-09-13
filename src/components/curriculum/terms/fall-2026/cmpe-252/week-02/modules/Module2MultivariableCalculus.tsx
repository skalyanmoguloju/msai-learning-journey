import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Activity,
  Compass,
  Layers,
  GitBranch,
  Grid,
  RotateCcw,
  AlertTriangle,
  Play,
  Gauge
} from 'lucide-react';
import { MathText } from '../../../../../common';

interface ModuleProps {
  onGoToQuiz?: () => void;
  onOpenFlashcards?: () => void;
}

export const Module2MultivariableCalculus: React.FC<ModuleProps> = ({
  onGoToQuiz,
  onOpenFlashcards
}) => {
  // --- 1. Partial Derivatives State ---
  const [partialX, setPartialX] = useState<number>(2);
  const [partialY, setPartialY] = useState<number>(5);

  const partialStats = useMemo(() => {
    const fVal = 3 * partialX * partialX + 4 * partialY;
    const dfDx = 6 * partialX;
    const dfDy = 4;
    return { fVal, dfDx, dfDy };
  }, [partialX, partialY]);

  // --- 2. Gradient Vector State ---
  const [gradientX, setGradientX] = useState<number>(2);
  const [gradientY, setGradientY] = useState<number>(1);

  const gradientStats = useMemo(() => {
    const gx = 6 * gradientX;
    const gy = 4;
    const magnitude = Math.sqrt(gx * gx + gy * gy);
    const deg = (Math.atan2(gy, gx) * 180) / Math.PI;
    return { gx, gy, magnitude, deg };
  }, [gradientX, gradientY]);

  // --- 3. Gradient Descent State ---
  const [descentX, setDescentX] = useState<number>(0);
  const [descentY, setDescentY] = useState<number>(0);
  const [learningRate, setLearningRate] = useState<number>(0.1);

  const descentStats = useMemo(() => {
    // Loss L(x, y) = (x - 2)^2 + (y + 1)^2
    const loss = Math.pow(descentX - 2, 2) + Math.pow(descentY + 1, 2);
    const gx = 2 * (descentX - 2);
    const gy = 2 * (descentY + 1);
    const nextX = descentX - learningRate * gx;
    const nextY = descentY - learningRate * gy;
    const gradNorm = Math.sqrt(gx * gx + gy * gy);
    return { loss, gx, gy, nextX, nextY, gradNorm };
  }, [descentX, descentY, learningRate]);

  const handleTakeDescentStep = () => {
    setDescentX(prev => Number(Math.max(-4, Math.min(4, prev - learningRate * 2 * (prev - 2))).toFixed(2)));
    setDescentY(prev => Number(Math.max(-4, Math.min(4, prev - learningRate * 2 * (prev + 1))).toFixed(2)));
  };

  const handleResetDescent = () => {
    setDescentX(0);
    setDescentY(0);
    setLearningRate(0.1);
  };

  // --- 4. Chain Rule State ---
  const [chainA, setChainA] = useState<number>(3); // dL/dy_hat
  const [chainB, setChainB] = useState<number>(0.5); // dy_hat/du
  const [chainC, setChainC] = useState<number>(2); // du/dw

  const chainResult = useMemo(() => {
    return chainA * chainB * chainC;
  }, [chainA, chainB, chainC]);

  // --- 5. Directional Derivative State ---
  const [dirG1, setDirG1] = useState<number>(6);
  const [dirG2, setDirG2] = useState<number>(4);
  const [dirV1, setDirV1] = useState<number>(3);
  const [dirV2, setDirV2] = useState<number>(4);

  const dirStats = useMemo(() => {
    const vLen = Math.sqrt(dirV1 * dirV1 + dirV2 * dirV2);
    const isZeroV = vLen < 0.00001;
    const u1 = isZeroV ? 0 : dirV1 / vLen;
    const u2 = isZeroV ? 0 : dirV2 / vLen;
    const dirDeriv = dirG1 * u1 + dirG2 * u2;
    return { vLen, isZeroV, u1, u2, dirDeriv };
  }, [dirG1, dirG2, dirV1, dirV2]);

  // --- 6. Jacobian Matrix State ---
  const [jacX, setJacX] = useState<number>(1);
  const [jacY, setJacY] = useState<number>(2);
  const [deltaX, setDeltaX] = useState<number>(0.1);
  const [deltaY, setDeltaY] = useState<number>(-0.05);

  const jacStats = useMemo(() => {
    // f1(x, y) = x^2 + 3y => df1/dx = 2x, df1/dy = 3
    // f2(x, y) = 2x - y^2 => df2/dx = 2,  df2/dy = -2y
    const j11 = 2 * jacX;
    const j12 = 3;
    const j21 = 2;
    const j22 = -2 * jacY;

    const outChange1 = j11 * deltaX + j12 * deltaY;
    const outChange2 = j21 * deltaX + j22 * deltaY;

    return { j11, j12, j21, j22, outChange1, outChange2 };
  }, [jacX, jacY, deltaX, deltaY]);

  // --- 7. Loss Surface & Contours State ---
  const [surfW1, setSurfW1] = useState<number>(0);
  const [surfW2, setSurfW2] = useState<number>(0);

  const surfStats = useMemo(() => {
    const loss = Math.pow(surfW1 - 2, 2) + Math.pow(surfW2 + 1, 2);
    const g1 = 2 * (surfW1 - 2);
    const g2 = 2 * (surfW2 + 1);
    const gradMag = Math.sqrt(g1 * g1 + g2 * g2);
    return { loss, g1, g2, gradMag };
  }, [surfW1, surfW2]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Module Overview Banner */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Calculus powers neural network training. By evaluating partial derivatives, constructing gradient vectors (<MathText text="$\nabla f$" />), backpropagating errors across deep computational graphs via the chain rule, and computing Jacobian matrices, machine learning models navigate complex loss landscapes to minimize error.
        </p>

        <div className="p-3.5 bg-purple-950/40 border border-purple-800/40 rounded-xl text-xs text-purple-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">How to use this guide:</strong> Explore each section below, adjust the inputs to observe how partial derivatives, gradients, descent steps, and loss contours respond interactively in real time.
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PARTIAL DERIVATIVES */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Partial Derivatives</h4>
          </div>
          <span className="text-xs text-slate-400">Axis-Aligned Rates of Change</span>
        </div>

        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A partial derivative measures how a multivariable function changes with respect to one single input variable while holding all other variables strictly constant.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                Worked Function Example
              </span>
              <div className="font-mono text-xs text-slate-200">
                <MathText text="$f(x, y) = 3x^2 + 4y$" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                When differentiating with respect to <MathText text="$x$" />, treat <MathText text="$y$" /> as a fixed constant. When differentiating with respect to <MathText text="$y$" />, treat <MathText text="$x$" /> as constant:
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-purple-300">
                <MathText text="$\frac{\partial f}{\partial x} = 6x, \quad \frac{\partial f}{\partial y} = 4$" />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                Formal Limit Definition
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                The formal limit as perturbation <MathText text="$h \to 0$" /> along the chosen axis:
              </p>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-slate-200">
                <MathText text="$\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x + h, y) - f(x, y)}{h}$" />
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                Tip: Freezes all axes except the direction of active variation.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Partial Derivatives Lab */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" /> Interactive Partial Derivative Calculator
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 block">Choose Coordinates:</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-purple-400 block mb-1">Variable x:</label>
                  <input
                    type="number"
                    value={partialX}
                    onChange={e => setPartialX(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-indigo-400 block mb-1">Variable y:</label>
                  <input
                    type="number"
                    value={partialY}
                    onChange={e => setPartialY(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Readout */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400">
                <MathText text={`$f(${partialX}, ${partialY}) = 3(${partialX})^2 + 4(${partialY}) = $`} />
                <strong className="text-white text-sm ml-1">{partialStats.fVal.toFixed(2)}</strong>
              </div>
              <div className="text-purple-300 font-bold pt-1 border-t border-slate-800">
                <MathText text={`$\\frac{\\partial f}{\\partial x} = 6x = 6(${partialX}) = $`} />
                <span className="text-base text-purple-400 ml-1">{partialStats.dfDx.toFixed(2)}</span>
              </div>
              <div className="text-indigo-300 font-bold">
                <MathText text={`$\\frac{\\partial f}{\\partial y} = 4$`} />
                <span className="text-xs text-slate-400 font-normal ml-2">(constant rate of change)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE GRADIENT VECTOR */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">The Gradient Vector</h4>
          </div>
          <span className="text-xs text-slate-400">Direction of Steepest Ascent</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The gradient <MathText text="$\nabla f$" /> packs all partial derivatives of a scalar-valued function into a single vector. It provides two foundational geometric properties:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
              1. Direction
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Points directly along the orientation in input space where the function values increase most rapidly (steepest uphill slope).
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              2. Magnitude (Steepness)
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Euclidean norm <MathText text="$\|\nabla f\|$" /> measures the instantaneous rate of increase along that steepest direction.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
          <span className="text-purple-400 font-bold block mb-1">Vector Formulation:</span>
          <MathText text="$\nabla f(x, y) = \begin{bmatrix} \frac{\partial f}{\partial x} \\ \frac{\partial f}{\partial y} \end{bmatrix} = [6x, 4]^T$" />
        </div>

        {/* Interactive Gradient Vector Lab */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-orange-400" /> Interactive Gradient Vector Visualizer
          </h5>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 block">Evaluate Gradient at Point (x, y):</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-purple-400 block mb-1">x coordinate:</label>
                  <input
                    type="number"
                    value={gradientX}
                    onChange={e => setGradientX(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-indigo-400 block mb-1">y coordinate:</label>
                  <input
                    type="number"
                    value={gradientY}
                    onChange={e => setGradientY(Number(e.target.value))}
                    className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
                <div>
                  <MathText text={`$\\nabla f(${gradientX}, ${gradientY}) = [${gradientStats.gx.toFixed(1)}, ${gradientStats.gy.toFixed(1)}]^T$`} />
                </div>
                <div>
                  <MathText text={`$\\|\\nabla f\\| = \\sqrt{(${gradientStats.gx.toFixed(1)})^2 + (${gradientStats.gy.toFixed(1)})^2} = ${gradientStats.magnitude.toFixed(3)}$`} />
                </div>
                <div className="text-orange-400 font-sans font-semibold text-[11px] pt-1 border-t border-slate-800">
                  Orientation: {gradientStats.deg.toFixed(1)}° (pointing uphill toward increasing values)
                </div>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="lg:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 self-start">
                2D Gradient Direction (Origin at Center)
              </span>
              <div className="w-full max-w-[320px] aspect-square bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="-15 -15 30 30" className="w-full h-full">
                  <defs>
                    <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#ea580c" />
                    </marker>
                  </defs>

                  {/* Grid Lines */}
                  {[-10, -5, 5, 10].map(v => (
                    <g key={v}>
                      <line x1={v} y1="-14" x2={v} y2="14" stroke="#1e293b" strokeWidth="0.15" />
                      <line x1="-14" y1={v} x2="14" y2={v} stroke="#1e293b" strokeWidth="0.15" />
                    </g>
                  ))}

                  {/* Axes */}
                  <line x1="-14" y1="0" x2="14" y2="0" stroke="#475569" strokeWidth="0.3" />
                  <line x1="0" y1="-14" x2="0" y2="14" stroke="#475569" strokeWidth="0.3" />

                  {/* Gradient Vector Line */}
                  <line
                    x1="0"
                    y1="0"
                    x2={gradientStats.gx}
                    y2={-gradientStats.gy}
                    stroke="#ea580c"
                    strokeWidth="0.7"
                    markerEnd="url(#arrow-orange)"
                  />
                  <text
                    x={gradientStats.gx + 0.8}
                    y={-gradientStats.gy - 0.8}
                    fill="#ea580c"
                    fontSize="2"
                    fontWeight="bold"
                  >
                    ∇f
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. GRADIENT DESCENT */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Play className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Gradient Descent</h4>
          </div>
          <span className="text-xs text-slate-400">Iterative Loss Minimization</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Because the gradient points in the direction of steepest increase (uphill), optimization algorithms move in the exact <strong>opposite</strong> direction (<MathText text="$-\nabla L$" />) to decrease error:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$\mathbf{w}_{\text{new}} = \mathbf{w}_{\text{old}} - \eta \nabla L(\mathbf{w}_{\text{old}})$" />
        </div>

        {/* Interactive Loss Bowl & Descent Stepper */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400" />
              Interactive Loss Surface Stepper: <MathText text="$L(x, y) = (x - 2)^2 + (y + 1)^2$" />
            </h5>
            <span className="text-xs text-emerald-400 font-mono">Global Min at (2, -1)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Sliders & Controls */}
            <div className="lg:col-span-6 space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Position x:</span>
                  <span className="font-mono text-purple-400 font-bold">{descentX.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.1"
                  value={descentX}
                  onChange={e => setDescentX(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Position y:</span>
                  <span className="font-mono text-indigo-400 font-bold">{descentY.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.1"
                  value={descentY}
                  onChange={e => setDescentY(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Learning Rate (η):</span>
                  <span className="font-mono text-emerald-400 font-bold">{learningRate.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={e => setLearningRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleTakeDescentStep}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Take One Downhill Step
                </button>
                <button
                  onClick={handleResetDescent}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* SVG Visualizer & Contours */}
            <div className="lg:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full max-w-[320px] aspect-square bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="-5 -5 10 10" className="w-full h-full">
                  {/* Concentric Contours centered at (2, -1) */}
                  {[1, 2, 3, 4.5].map((r, i) => (
                    <circle
                      key={i}
                      cx={2}
                      cy={1} // Inverted Y for SVG coordinates (-1 => +1)
                      r={r}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="0.08"
                      strokeDasharray="0.3,0.3"
                      opacity={0.35 + i * 0.15}
                    />
                  ))}

                  {/* Minimum target dot (2, -1) */}
                  <circle cx={2} cy={1} r={0.3} fill="#10b981" />
                  <text x={2.5} y={1.2} fill="#10b981" fontSize="0.6" fontWeight="bold">Min (2, -1)</text>

                  {/* Step line from current point to next step */}
                  <line
                    x1={descentX}
                    y1={-descentY}
                    x2={descentStats.nextX}
                    y2={-descentStats.nextY}
                    stroke="#10b981"
                    strokeWidth="0.15"
                  />

                  {/* Current Position Point */}
                  <circle cx={descentX} cy={-descentY} r={0.35} fill="#f97316" stroke="#ffffff" strokeWidth="0.08" />
                  <text x={descentX + 0.5} y={-descentY - 0.5} fill="#f97316" fontSize="0.6" fontWeight="bold">Current</text>
                </svg>
              </div>

              {/* Status Readout */}
              <div className="w-full p-2.5 mt-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span>Current Loss: <strong className="text-white">{descentStats.loss.toFixed(4)}</strong></span>
                  <span>Gradient Norm: <strong className="text-orange-400">{descentStats.gradNorm.toFixed(3)}</strong></span>
                </div>
                <div className="text-emerald-400">
                  Step Vector: <MathText text={`$[-\\eta \\nabla_x, -\\eta \\nabla_y] = [${(-learningRate * descentStats.gx).toFixed(3)}, ${(-learningRate * descentStats.gy).toFixed(3)}]$`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CHAIN RULE & BACKPROPAGATION */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <GitBranch className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Chain Rule &amp; Backpropagation</h4>
          </div>
          <span className="text-xs text-slate-400">Error Gradient Propagation</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The chain rule determines how the final scalar loss function <MathText text="$L$" /> varies with respect to an early weight parameter <MathText text="$w$" /> by chaining together intermediate rates of change:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial u} \cdot \frac{\partial u}{\partial w}$" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              Forward Pass
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inputs flow forward through weights <MathText text="$w$" />, affine activations <MathText text="$u = wx + b$" />, and nonlinearities to predict <MathText text="$\hat{y}$" /> and calculate loss <MathText text="$L$" />.
            </p>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Backward Pass
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Error gradients flow backward from the loss via chain rule multiplication, providing exact partial derivatives <MathText text="$\frac{\partial L}{\partial w}$" /> for parameter optimization.
            </p>
          </div>
        </div>

        {/* Interactive Chain Rule Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-blue-400" /> Interactive Computational Chain Lab
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <label className="text-xs font-bold text-rose-400 block">
                <MathText text="$\frac{\partial L}{\partial \hat{y}}$" /> (Loss Sensitivity):
              </label>
              <input
                type="number"
                value={chainA}
                onChange={e => setChainA(Number(e.target.value))}
                className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
              />
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <label className="text-xs font-bold text-amber-400 block">
                <MathText text="$\frac{\partial \hat{y}}{\partial u}$" /> (Activation Gradient):
              </label>
              <input
                type="number"
                value={chainB}
                onChange={e => setChainB(Number(e.target.value))}
                className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
              />
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <label className="text-xs font-bold text-blue-400 block">
                <MathText text="$\frac{\partial u}{\partial w}$" /> (Local Input Derivative):
              </label>
              <input
                type="number"
                value={chainC}
                onChange={e => setChainC(Number(e.target.value))}
                className="w-full p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-300">
              <MathText text={`$\\frac{\\partial L}{\\partial w} = (${chainA}) \\times (${chainB}) \\times (${chainC}) = $`} />
              <strong className="text-emerald-400 text-base ml-1">{chainResult.toFixed(4)}</strong>
            </div>
            <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
              A 1-unit increase in weight <MathText text="$w$" /> will alter the total loss by approximately <strong>{chainResult.toFixed(4)}</strong> units in this operating neighborhood.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. DIRECTIONAL DERIVATIVES */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Directional Derivatives</h4>
          </div>
          <span className="text-xs text-slate-400">Arbitrary Direction Rate of Change</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          While standard partial derivatives measure rate of change strictly aligned with coordinate axes, a <strong>directional derivative</strong> evaluates the instantaneous rate of change along any arbitrary normalized unit direction vector <MathText text="$\mathbf{u}$" />:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u} = \|\nabla f\| \|\mathbf{u}\| \cos(\theta) = \|\nabla f\| \cos(\theta)$" />
        </div>

        {/* Interactive Directional Derivative Calculator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" /> Interactive Directional Rate Lab
          </h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div>
                <label className="text-xs font-bold text-orange-400 block mb-1">Gradient Vector ∇f: [g₁, g₂]</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={dirG1}
                    onChange={e => setDirG1(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                  <input
                    type="number"
                    value={dirG2}
                    onChange={e => setDirG2(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-teal-400 block mb-1">Target Direction Vector v: [v₁, v₂]</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={dirV1}
                    onChange={e => setDirV1(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                  <input
                    type="number"
                    value={dirV2}
                    onChange={e => setDirV2(Number(e.target.value))}
                    className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Readout */}
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400">
                Vector Norm: <MathText text={`$\\|\\mathbf{v}\\| = ${dirStats.vLen.toFixed(3)}$`} />
              </div>
              <div className="text-slate-300">
                Normalized Unit Direction:
                <div className="text-teal-400 font-bold">
                  <MathText text={`$\\mathbf{u} = [${dirStats.u1.toFixed(4)}, ${dirStats.u2.toFixed(4)}]^T$`} />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-300">
                <MathText text={`$D_{\\mathbf{u}} f = (${dirG1})(${dirStats.u1.toFixed(3)}) + (${dirG2})(${dirStats.u2.toFixed(3)}) = $`} />
                <strong className="text-emerald-400 text-base ml-1">{dirStats.dirDeriv.toFixed(4)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. JACOBIAN MATRIX */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-blue-500/30">
              <Grid className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Jacobian Matrix</h4>
          </div>
          <span className="text-xs text-slate-400">Vector-Valued Function Transformations</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          When a function produces multiple outputs (<MathText text="$\mathbf{F}: \mathbb{R}^n \to \mathbb{R}^m$" />), its first-order derivatives form the <strong>Jacobian matrix</strong>, where rows represent outputs and columns represent inputs:
        </p>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-white">
          <MathText text="$\mathbf{J} = \begin{bmatrix} \frac{\partial f_1}{\partial x_1} & \dots & \frac{\partial f_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_m}{\partial x_1} & \dots & \frac{\partial f_m}{\partial x_n} \end{bmatrix} \in \mathbb{R}^{m \times n}, \quad \Delta \mathbf{F} \approx \mathbf{J} \cdot \Delta \mathbf{x}$" />
        </div>

        {/* Interactive Jacobian Lab */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-400" />
              Interactive Jacobian for <MathText text="$\mathbf{F}(x, y) = [x^2 + 3y, 2x - y^2]^T$" />
            </h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-300 block">Operating Coordinates:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={jacX}
                  onChange={e => setJacX(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="x"
                />
                <input
                  type="number"
                  value={jacY}
                  onChange={e => setJacY(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="y"
                />
              </div>

              <span className="text-xs font-bold text-slate-300 block pt-1 border-t border-slate-800">
                Input Perturbations (Δx, Δy):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={deltaX}
                  step="0.01"
                  onChange={e => setDeltaX(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="Δx"
                />
                <input
                  type="number"
                  value={deltaY}
                  step="0.01"
                  onChange={e => setDeltaY(Number(e.target.value))}
                  className="p-2 bg-slate-950 text-center font-mono text-sm text-white rounded border border-slate-700"
                  title="Δy"
                />
              </div>
            </div>

            {/* Jacobian Matrix & Linearized Change */}
            <div className="md:col-span-7 p-3.5 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block">Evaluated Jacobian J (2×2):</span>
                <div>[ 2x, 3 ] → [ {jacStats.j11.toFixed(2)}, {jacStats.j12.toFixed(2)} ]</div>
                <div>[ 2, -2y ] → [ {jacStats.j21.toFixed(2)}, {jacStats.j22.toFixed(2)} ]</div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Predicted Output Variation (ΔF = J · Δx):</span>
                <div>Δf₁ ≈ ({jacStats.j11.toFixed(1)})({deltaX}) + ({jacStats.j12})({deltaY}) = <strong className="text-white">{jacStats.outChange1.toFixed(4)}</strong></div>
                <div>Δf₂ ≈ ({jacStats.j21})({deltaX}) + ({jacStats.j22.toFixed(1)})({deltaY}) = <strong className="text-white">{jacStats.outChange2.toFixed(4)}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. LOSS SURFACES AND CONTOURS */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">Loss Surfaces and Contours</h4>
          </div>
          <span className="text-xs text-slate-400">Landscape Topography &amp; Critical Points</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In high-dimensional parameter spaces, loss functions form topographic landscapes. Contour lines map slices of equal loss elevation. Understanding these geometries is essential for diagnosing optimization failures:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-emerald-400 block">Local/Global Minimum</span>
            <p className="text-xs text-slate-300">
              Loss rises in every neighboring direction. Gradient <MathText text="$\nabla L = \mathbf{0}$" /> and Hessian is positive definite.
            </p>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 block">Saddle Point</span>
            <p className="text-xs text-slate-300">
              Surface curves up in some directions and down in others. Zero gradient causes naive gradient descent to stall.
            </p>
          </div>
          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-rose-400 block">Plateau / Flat Region</span>
            <p className="text-xs text-slate-300">
              Gradient magnitude <MathText text="$\|\nabla L\| \approx 0$" /> is vanishingly small, causing slow, agonizingly sluggish learning.
            </p>
          </div>
        </div>

        {/* Interactive Contour Map Simulator */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-pink-400" /> Interactive Topographic Contour Explorer
          </h5>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Sliders */}
            <div className="lg:col-span-6 space-y-3 p-3.5 bg-slate-900 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Weight w₁:</span>
                  <span className="font-mono text-pink-400 font-bold">{surfW1.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.1"
                  value={surfW1}
                  onChange={e => setSurfW1(Number(e.target.value))}
                  className="w-full accent-pink-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Weight w₂:</span>
                  <span className="font-mono text-purple-400 font-bold">{surfW2.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.1"
                  value={surfW2}
                  onChange={e => setSurfW2(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5">
                <div>Loss Elevation: <strong className="text-white">{surfStats.loss.toFixed(3)}</strong></div>
                <div>Gradient: <MathText text={`$\\nabla L = [${surfStats.g1.toFixed(2)}, ${surfStats.g2.toFixed(2)}]^T$`} /></div>
                <div className="flex items-center gap-1.5 text-[11px] pt-1 border-t border-slate-800">
                  <Gauge className="w-3.5 h-3.5 text-pink-400" />
                  <span>Gradient Magnitude: <strong className="text-pink-400">{surfStats.gradMag.toFixed(3)}</strong></span>
                </div>
              </div>
            </div>

            {/* Visualizer */}
            <div className="lg:col-span-6 p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full max-w-[320px] aspect-square bg-slate-950 rounded-xl border border-slate-800 p-2 relative overflow-hidden flex items-center justify-center">
                <svg viewBox="-5 -5 10 10" className="w-full h-full">
                  {/* Contours */}
                  {[1, 2, 3, 4.5].map((r, idx) => (
                    <circle
                      key={idx}
                      cx={2}
                      cy={1}
                      r={r}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="0.08"
                      strokeDasharray="0.3,0.3"
                      opacity={0.3 + idx * 0.18}
                    />
                  ))}

                  {/* Target minimum */}
                  <circle cx={2} cy={1} r={0.3} fill="#10b981" />
                  <text x={2.4} y={1.2} fill="#10b981" fontSize="0.55" fontWeight="bold">Min (2, -1)</text>

                  {/* Current point */}
                  <circle cx={surfW1} cy={-surfW2} r={0.35} fill="#ec4899" stroke="#ffffff" strokeWidth="0.08" />
                  <text x={surfW1 + 0.4} y={-surfW2 - 0.4} fill="#ec4899" fontSize="0.6" fontWeight="bold">w</text>
                </svg>
              </div>

              {surfStats.gradMag < 0.2 ? (
                <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  Near minimum: Gradient is nearly vanishing!
                </div>
              ) : (
                <div className="mt-2 text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  Gradient indicates steep uphill ascent.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Module2MultivariableCalculus;
