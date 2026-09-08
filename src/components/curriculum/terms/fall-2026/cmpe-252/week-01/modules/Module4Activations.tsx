import React, { useState, useRef, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';

export const Module4Activations: React.FC = () => {
  const [actZ, setActZ] = useState<number>(1.0);
  const actCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const sigmoidVal = 1 / (1 + Math.exp(-actZ));
  const reluVal = Math.max(0, actZ);
  const tanhVal = Math.tanh(actZ);

  useEffect(() => {
    const canvas = actCanvasRef.current;
    const res = setupCanvas(canvas, 500, 240);
    if (!canvas || !res) return;
    const { ctx, width: w, height: h } = res;

    const pad = 40;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Center horizontal axis (y=0)
    const zeroY = h - pad - 0.5 * chartH;
    ctx.moveTo(pad, zeroY);
    ctx.lineTo(w - pad, zeroY);
    // Center vertical axis (x=0)
    const zeroX = pad + 0.5 * chartW;
    ctx.moveTo(zeroX, pad);
    ctx.lineTo(zeroX, h - pad);
    ctx.stroke();

    const minZ = -5;
    const maxZ = 5;

    // Helper to plot curve
    const plotCurve = (fn: (z: number) => number, color: string, minY = -1.2, maxY = 1.5) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let first = true;
      for (let z = minZ; z <= maxZ; z += 0.1) {
        const val = fn(z);
        const px = pad + ((z - minZ) / (maxZ - minZ)) * chartW;
        const py = h - pad - ((val - minY) / (maxY - minY)) * chartH;
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    };

    // Plot curves: Sigmoid (sky), ReLU (emerald), Tanh (amber)
    plotCurve(z => 1 / (1 + Math.exp(-z)), '#38bdf8'); // Sigmoid
    plotCurve(z => Math.max(0, z * 0.2), '#10b981');   // Scaled ReLU for viewing
    plotCurve(z => Math.tanh(z), '#f59e0b');           // Tanh

    // Vertical indicator for current z
    const curX = pad + ((actZ - minZ) / (maxZ - minZ)) * chartW;
    ctx.strokeStyle = '#c084fc';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(curX, pad);
    ctx.lineTo(curX, h - pad);
    ctx.stroke();
    ctx.setLineDash([]);

    // Legend
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Sigmoid', pad + 10, pad + 15);
    ctx.fillStyle = '#10b981';
    ctx.fillText('ReLU', pad + 80, pad + 15);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Tanh', pad + 130, pad + 15);
  }, [actZ]);

  return (
    <div className="space-y-6">
      {/* Activation Definition Card */}
      <div className="p-4 bg-slate-900 border border-purple-900/60 rounded-xl text-xs space-y-2">
        <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" /> What is an Activation Function?
        </h3>
        <p className="text-slate-300 leading-relaxed">
          <strong>Definition:</strong> A mathematical function applied to the weighted sum of inputs (<MathText text="$z = \mathbf{w}^T \mathbf{x} + b$" />) at each artificial neuron. Activation functions introduce <strong>non-linearity</strong> into neural networks, enabling them to learn complex non-linear decision boundaries and solve arbitrary mathematical approximations (Universal Approximation Theorem).
        </p>
      </div>

      {/* Interactive Activation Curve Plotter */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-purple-400 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Interactive Activation Curves &amp; Value Evaluator
          </h3>
          <div className="flex items-center space-x-2 text-xs">
            <label className="text-slate-400">Input <MathText text="$z$" /> value:</label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={actZ}
              onChange={e => setActZ(parseFloat(e.target.value))}
              className="w-32 accent-purple-500"
            />
            <span className="font-mono font-bold text-purple-300 w-10 text-right">{actZ.toFixed(1)}</span>
          </div>
        </div>

        <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <canvas ref={actCanvasRef} className="w-full h-full block" />
        </div>

        {/* Formula & Evaluated Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="text-sky-400 font-bold">1. Sigmoid <MathText text="$\sigma(z)$" /></div>
            <div className="text-[11px] text-slate-400"><MathText text="$\frac{1}{1 + e^{-z}}$" /></div>
            <p className="font-sans text-[10px] text-slate-400">Squashes into (0, 1). Ideal for binary probabilities.</p>
            <div className="text-white text-sm font-bold pt-1">
              f(z) = <span className="text-sky-400">{sigmoidVal.toFixed(3)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="text-emerald-400 font-bold">2. ReLU</div>
            <div className="text-[11px] text-slate-400"><MathText text="$\max(0, z)$" /></div>
            <p className="font-sans text-[10px] text-slate-400">Rectified Linear Unit. Default choice for hidden layers.</p>
            <div className="text-white text-sm font-bold pt-1">
              f(z) = <span className="text-emerald-400">{reluVal.toFixed(3)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="text-amber-400 font-bold">3. Tanh</div>
            <div className="text-[11px] text-slate-400"><MathText text="$\frac{e^z - e^{-z}}{e^z + e^{-z}}$" /></div>
            <p className="font-sans text-[10px] text-slate-400">Hyperbolic Tangent. Zero-centered range (-1, 1).</p>
            <div className="text-white text-sm font-bold pt-1">
              f(z) = <span className="text-amber-400">{tanhVal.toFixed(3)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <div className="text-purple-400 font-bold">4. Softmax</div>
            <div className="text-[11px] text-slate-400"><MathText text="$\frac{e^{z_i}}{\sum e^{z_j}}$" /></div>
            <p className="font-sans text-[10px] text-slate-400">Normalizes vector logits into multiclass probability sum of 1.0.</p>
            <div className="text-white text-xs pt-1">Multiclass prob sum = 1.0</div>
          </div>
        </div>
      </div>

      {/* Gradient Phenomenon Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="font-bold text-rose-400 text-sm">Vanishing Gradient Problem</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            <strong>Definition:</strong> Occurs during backpropagation in deep neural networks when activation derivatives (like Sigmoid or Tanh) are small (&lt;1). As gradients are multiplied backward across many layers (Chain Rule), they exponentially diminish toward zero, stalling weight updates in early layers.
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="font-bold text-amber-400 text-sm">Exploding Gradient Problem</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            <strong>Definition:</strong> The opposite of vanishing gradients; occurs when large weights or unscaled gradients multiply across many layers, causing error gradients to grow exponentially large (&gt;1), leading to unstable training or <code className="font-mono text-xs text-amber-300">NaN</code> model weights.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Module4Activations;
