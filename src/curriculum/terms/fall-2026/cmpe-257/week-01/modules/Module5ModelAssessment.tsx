import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import katex from 'katex';
import { Check, Activity, RotateCcw } from 'lucide-react';
import { ML_MODULES } from '../types';

const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const html = useMemo(() => {
    if (!text) return '';
    if (text.includes('$')) {
      let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => {
        try { return katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false }); }
        catch { return latex; }
      });
      res = res.replace(/\$([^\$\n]+?)\$/g, (_, latex) => {
        try { return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false }); }
        catch { return latex; }
      });
      return res;
    }
    return text;
  }, [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

const setupCanvas = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = rect.width || 400;
  const h = rect.height || 200;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);
  return { ctx, width: w, height: h };
};

export const Module5ModelAssessment: React.FC = () => {
  const mod = ML_MODULES.find(m => m.id === 'm5')!;

  const [polyDegree, setPolyDegree] = useState<number>(1);
  const [polyPoints, setPolyPoints] = useState<{ x: number; y: number }[]>([]);
  const polyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const generatePolyData = useCallback(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < 15; i++) {
      const x = (i / 14) * 2 - 1;
      const y = Math.sin(x * Math.PI) + (Math.random() - 0.5) * 0.5;
      pts.push({ x, y });
    }
    setPolyPoints(pts);
  }, []);

  const drawPolyCanvas = useCallback(() => {
    const canvas = polyCanvasRef.current;
    const res = setupCanvas(canvas);
    if (!res) return;
    const { ctx, width: w, height: h } = res;
    ctx.clearRect(0, 0, w, h);
    polyPoints.forEach(pt => {
      const px = ((pt.x + 1) / 2) * (w - 40) + 20;
      const py = h / 2 - pt.y * (h / 3);
      ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8'; ctx.fill();
      ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5; ctx.stroke();
    });
    ctx.beginPath();
    ctx.strokeStyle = polyDegree === 1 ? '#f59e0b' : (polyDegree > 5 ? '#f43f5e' : '#10b981');
    ctx.lineWidth = 3;
    for (let px = 20; px <= w - 20; px += 2) {
      const x = ((px - 20) / (w - 40)) * 2 - 1;
      let y = 0;
      if (polyDegree === 1) y = 0.8 * x;
      else if (polyDegree <= 5) y = Math.sin(x * Math.PI);
      else y = Math.sin(x * Math.PI) + Math.sin(x * Math.PI * polyDegree) * 0.4;
      const py = h / 2 - y * (h / 3);
      if (px === 20) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [polyDegree, polyPoints]);

  useEffect(() => {
    if (polyPoints.length === 0) generatePolyData();
    else drawPolyCanvas();
  }, [drawPolyCanvas, generatePolyData, polyPoints.length]);

  return (
    <div className="space-y-6">
      {/* Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept) => (
          <div key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-sm flex flex-col space-y-4 transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                  <span>{concept.title}</span>
                </h4>
                {concept.badge && (
                  <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded shrink-0">
                    {concept.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed"><MathText text={concept.summary} /></div>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                {concept.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div><MathText text={b} /></div>
                  </li>
                ))}
              </ul>
              {concept.formula && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Key Formulation:</div>
                  <MathText text={concept.formula} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Polynomial Fit Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Interactive Polynomial Overfitting Sandbox</span>
        </div>
        <p className="text-xs text-slate-300">
          Slide polynomial degree to see how <strong>Underfitting</strong> (Low Degree / High Bias) transforms into <strong>Overfitting</strong> (High Degree / High Variance).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Polynomial Degree (d):</span>
                <span className="text-cyan-400 font-mono">{polyDegree}</span>
              </label>
              <input type="range" min="1" max="9" step="1" value={polyDegree}
                onChange={(e) => setPolyDegree(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500" />
            </div>
            <div className={`p-3 rounded-xl text-xs border ${
              polyDegree === 1 ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : polyDegree > 5 ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            }`}>
              <div className="font-bold uppercase tracking-wider mb-1">
                {polyDegree === 1 ? 'Underfitting (High Bias)' : polyDegree > 5 ? 'Overfitting (High Variance)' : 'Optimal Fit (Balanced)'}
              </div>
              <div className="text-[11px] leading-relaxed">
                {polyDegree === 1 ? 'Model is too simple to capture true underlying nonlinear relationship.'
                  : polyDegree > 5 ? 'Model memorizes noise points, degrading generalizability on unseen data.'
                  : 'Model captures genuine structure without overfitting to sample noise.'}
              </div>
            </div>
            <button onClick={generatePolyData}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl font-semibold transition border border-slate-700 flex items-center justify-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Resample Data Noise
            </button>
          </div>
          <div className="md:col-span-2 relative h-64 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <canvas ref={polyCanvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
