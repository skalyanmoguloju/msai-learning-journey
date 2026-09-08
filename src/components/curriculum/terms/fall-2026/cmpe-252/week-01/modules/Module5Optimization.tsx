import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Play } from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';

export const Module5Optimization: React.FC = () => {
  const [gdW, setGdW] = useState<number>(0.0);
  const [gdB, setGdB] = useState<number>(0.0);
  const [gdLr, setGdLr] = useState<number>(0.05);
  const [gdLossHistory, setGdLossHistory] = useState<number[]>([12.5]);
  const gdCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = gdCanvasRef.current;
    const res = setupCanvas(canvas, 500, 220);
    if (!canvas || !res) return;
    const { ctx, width: w, height: h } = res;

    const pad = 40;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const maxLoss = Math.max(14, ...gdLossHistory);
    const n = Math.max(5, gdLossHistory.length);

    // Draw Loss curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    gdLossHistory.forEach((loss, idx) => {
      const px = pad + (idx / (n - 1)) * chartW;
      const py = h - pad - (loss / maxLoss) * chartH;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Fill under curve
    const lastX = pad + ((gdLossHistory.length - 1) / (n - 1)) * chartW;
    ctx.lineTo(lastX, h - pad);
    ctx.lineTo(pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.fill();

    // Data points
    gdLossHistory.forEach((loss, idx) => {
      const px = pad + (idx / (n - 1)) * chartW;
      const py = h - pad - (loss / maxLoss) * chartH;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Text info
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Loss Convergence Curve (Step ${gdLossHistory.length - 1}): ${gdLossHistory[gdLossHistory.length - 1].toFixed(3)}`, pad + 10, pad + 15);
  }, [gdLossHistory]);

  const runGDStep = () => {
    const targetW = 2.0;
    const targetB = 1.0;
    const gradW = -2 * (targetW - gdW);
    const gradB = -2 * (targetB - gdB);
    const nextW = gdW - gdLr * gradW;
    const nextB = gdB - gdLr * gradB;
    const nextLoss = Math.pow(targetW - nextW, 2) + Math.pow(targetB - nextB, 2);
    setGdW(nextW);
    setGdB(nextB);
    setGdLossHistory(prev => [...prev, nextLoss]);
  };

  const resetGD = () => {
    setGdW(0.0);
    setGdB(0.0);
    setGdLossHistory([12.5]);
  };

  return (
    <div className="space-y-6">
      {/* Gradient Descent Core Definitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
          <span className="font-bold text-amber-400 text-sm">Gradient (<MathText text="$\nabla L$" />)</span>
          <p className="text-slate-300">
            <strong>Definition:</strong> A vector of partial derivatives of the Loss Function with respect to all model parameters (<MathText text="$W, b$" />). Points in the direction of steepest loss increase.
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
          <span className="font-bold text-sky-400 text-sm">Learning Rate (<MathText text="$\alpha$" />)</span>
          <p className="text-slate-300">
            <strong>Definition:</strong> A hyperparameter controlling the step size taken in the negative gradient direction toward the loss minimum during each optimization step.
          </p>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
          <span className="font-bold text-emerald-400 text-sm">Convergence</span>
          <p className="text-slate-300">
            <strong>Definition:</strong> The state reached when the optimization algorithm stabilizes and parameter updates no longer significantly decrease the loss value.
          </p>
        </div>
      </div>

      {/* Math Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-white font-sans">Linear Model Hypothesis &amp; MSE Loss</h4>
          <p className="text-slate-300"><MathText text="$\hat{y} = W \cdot x + b$" /></p>
          <p className="text-slate-300"><MathText text="$L(W, b) = \frac{1}{N} \sum_{i=1}^N (y_i - (W \cdot x_i + b))^2$" /></p>
        </div>
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-white font-sans">Gradient Step Parameter Updates</h4>
          <p className="text-slate-300"><MathText text="$W_{\text{new}} = W_{\text{old}} - \alpha \cdot \frac{\partial L}{\partial W}$" /></p>
          <p className="text-slate-300"><MathText text="$b_{\text{new}} = b_{\text{old}} - \alpha \cdot \frac{\partial L}{\partial b}$" /></p>
        </div>
      </div>

      {/* Interactive Gradient Descent Playground */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Gradient Descent Optimizer Simulator
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={runGDStep}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 active:scale-95"
            >
              <Play className="w-3.5 h-3.5" /> Run 1 Gradient Step
            </button>
            <button
              onClick={resetGD}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
            >
              Reset Parameters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">
              Learning Rate (<MathText text="$\alpha$" />): <span className="text-amber-400 font-bold font-mono">{gdLr.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.01"
              max="0.3"
              step="0.01"
              value={gdLr}
              onChange={e => setGdLr(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">
              Current Weight (<MathText text="$W$" />): <span className="text-sky-400 font-bold font-mono">{gdW.toFixed(2)}</span>
            </label>
            <span className="text-[10px] text-slate-500 block">Target <MathText text="$W^* \approx 2.0$" /></span>
          </div>
          <div>
            <label className="block text-slate-400 mb-1">
              Current Bias (<MathText text="$b$" />): <span className="text-emerald-400 font-bold font-mono">{gdB.toFixed(2)}</span>
            </label>
            <span className="text-[10px] text-slate-500 block">Target <MathText text="$b^* \approx 1.0$" /></span>
          </div>
        </div>

        <div className="w-full h-60 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <canvas ref={gdCanvasRef} className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
};
export default Module5Optimization;
