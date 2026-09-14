import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, Activity, TrendingUp } from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';
import { ML_WEEK2_MODULES } from '../types';

export const Module2Sigmoid: React.FC = () => {
  const mod = ML_WEEK2_MODULES.find(m => m.id === 'm2')!;
  const [zVal, setZVal] = useState<number>(0.0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
  const sigmoidDeriv = (z: number) => {
    const s = sigmoid(z);
    return s * (1 - s);
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const res = setupCanvas(canvas);
    if (!res) return;
    const { ctx, width: w, height: h } = res;

    ctx.clearRect(0, 0, w, h);

    // Grid lines & Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    const midY = h / 2;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    const midX = w / 2;
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, h);
    ctx.stroke();

    // Plot sigmoid curve (cyan)
    ctx.beginPath();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    for (let x = -6; x <= 6; x += 0.1) {
      const px = ((x + 6) / 12) * w;
      const s = sigmoid(x);
      const py = h - (s * (h - 40) + 20);
      if (x === -6) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Plot derivative curve (amber dashed)
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.8;
    ctx.setLineDash([4, 4]);
    for (let x = -6; x <= 6; x += 0.1) {
      const px = ((x + 6) / 12) * w;
      const d = sigmoidDeriv(x) * 3; // scaled for visibility
      const py = h - (d * (h - 40) + 20);
      if (x === -6) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Current point
    const curPx = ((zVal + 6) / 12) * w;
    const curPy = h - (sigmoid(zVal) * (h - 40) + 20);

    ctx.beginPath();
    ctx.arc(curPx, curPy, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(curPx, curPy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d4';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [zVal]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  return (
    <div className="space-y-6">
      {/* ── Interactive Sigmoid & Derivative Visualizer ───────────────────── */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity className="w-4 h-4" />
            <h4 className="text-sm font-bold text-slate-100">Sigmoid &amp; Derivative Interactive Canvas</h4>
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

        <div className="relative w-full h-48 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Input <MathText text="$z$" /></span>
              <span className="text-cyan-400 font-mono">{zVal >= 0 ? `+${zVal.toFixed(2)}` : zVal.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-6"
              max="6"
              step="0.1"
              value={zVal}
              onChange={e => setZVal(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Output <MathText text="$\sigma(z)$" /></span>
            <div className="text-base font-mono font-bold text-cyan-400">
              {sigmoid(zVal).toFixed(4)}
            </div>
            <span className="text-[10px] text-slate-500">Squashed to (0, 1)</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-xs font-semibold text-slate-400">Derivative <MathText text="$\sigma'(z)$" /></span>
            <div className="text-base font-mono font-bold text-amber-400">
              {sigmoidDeriv(zVal).toFixed(4)}
            </div>
            <span className="text-[10px] text-slate-500">Max at z = 0 (0.25)</span>
          </div>
        </div>
      </div>

      {/* ── Concepts Grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded shrink-0">
                    {concept.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathText text={concept.summary} />
              </div>

              <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                {concept.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <MathText text={b} />
                    </div>
                  </li>
                ))}
              </ul>

              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Key Formulation:</div>
                  <MathText text={concept.formula} displayMode={true} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
