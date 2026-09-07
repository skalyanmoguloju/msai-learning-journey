import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import katex from 'katex';
import { Check, Code2, ChevronDown, Activity, Dice5, RotateCcw } from 'lucide-react';
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

const clusterColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export const Module3Unsupervised: React.FC = () => {
  const mod = ML_MODULES.find(m => m.id === 'm3')!;

  const [kmeansK, setKmeansK] = useState<number>(3);
  const [kmeansPoints, setKmeansPoints] = useState<{ x: number; y: number }[]>([]);
  const [kmeansCentroids, setKmeansCentroids] = useState<{ x: number; y: number; color: string }[]>([]);
  const [kmeansAssignments, setKmeansAssignments] = useState<number[]>([]);
  const [kmeansState, setKmeansState] = useState<string>('Uninitialized');
  const kmeansCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateRandomPoints = useCallback(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < 40; i++) {
      pts.push({ x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1 });
    }
    setKmeansPoints(pts);
    const cents: { x: number; y: number; color: string }[] = [];
    for (let k = 0; k < kmeansK; k++) {
      cents.push({ x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, color: clusterColors[k] || '#38bdf8' });
    }
    setKmeansCentroids(cents);
    setKmeansAssignments(new Array(pts.length).fill(-1));
    setKmeansState('Centroids Initialized');
  }, [kmeansK]);

  const resetKmeans = () => {
    const cents: { x: number; y: number; color: string }[] = [];
    for (let k = 0; k < kmeansK; k++) {
      cents.push({ x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, color: clusterColors[k] || '#38bdf8' });
    }
    setKmeansCentroids(cents);
    setKmeansAssignments(new Array(kmeansPoints.length).fill(-1));
    setKmeansState('Centroids Initialized');
  };

  const addKmeansPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = kmeansCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setKmeansPoints(prev => [...prev, { x, y }]);
    setKmeansAssignments(prev => [...prev, -1]);
  };

  const stepKmeans = () => {
    if (kmeansPoints.length === 0 || kmeansCentroids.length === 0) return;
    if (kmeansState.includes('Initialized') || kmeansState.includes('Updated')) {
      const nextAssignments = kmeansPoints.map(pt => {
        let minDist = Infinity, bestK = 0;
        kmeansCentroids.forEach((c, k) => {
          const dist = Math.hypot(pt.x - c.x, pt.y - c.y);
          if (dist < minDist) { minDist = dist; bestK = k; }
        });
        return bestK;
      });
      setKmeansAssignments(nextAssignments);
      setKmeansState('Points Assigned');
    } else {
      const nextCentroids = kmeansCentroids.map((c, k) => {
        const assigned = kmeansPoints.filter((_, idx) => kmeansAssignments[idx] === k);
        if (assigned.length > 0) {
          return { ...c, x: assigned.reduce((s, p) => s + p.x, 0) / assigned.length, y: assigned.reduce((s, p) => s + p.y, 0) / assigned.length };
        }
        return c;
      });
      setKmeansCentroids(nextCentroids);
      setKmeansState('Centroids Updated');
    }
  };

  const drawKmeansCanvas = useCallback(() => {
    const canvas = kmeansCanvasRef.current;
    const res = setupCanvas(canvas);
    if (!res) return;
    const { ctx, width: w, height: h } = res;
    ctx.clearRect(0, 0, w, h);
    kmeansPoints.forEach((pt, idx) => {
      ctx.beginPath();
      ctx.arc(pt.x * w, pt.y * h, 5, 0, Math.PI * 2);
      const k = kmeansAssignments[idx];
      ctx.fillStyle = k >= 0 && kmeansCentroids[k] ? kmeansCentroids[k].color : '#94a3b8';
      ctx.fill();
    });
    kmeansCentroids.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x * w, c.y * h, 10, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  }, [kmeansPoints, kmeansCentroids, kmeansAssignments]);

  useEffect(() => {
    if (kmeansPoints.length === 0) {
      generateRandomPoints();
    } else {
      drawKmeansCanvas();
    }
  }, [drawKmeansCanvas, generateRandomPoints, kmeansPoints.length]);

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
            {concept.code && (
              <div className="pt-2 border-t border-slate-800/80">
                <details className="group">
                  <summary className="text-xs font-semibold text-slate-400 hover:text-cyan-400 cursor-pointer flex items-center justify-between list-none">
                    <span className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-cyan-400" /> Python / NumPy Implementation</span>
                    <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <pre className="mt-2 p-3 bg-slate-950 text-slate-300 rounded-xl text-[11px] font-mono overflow-x-auto border border-slate-800">
                    {concept.code}
                  </pre>
                </details>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* k-Means Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Interactive k-Means Clustering Workbench</span>
        </div>
        <p className="text-xs text-slate-300">
          Click on the canvas to add custom 2D data points, configure K, and step through iterative centroid assignments.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Clusters (K):</span>
                <span className="text-cyan-400 font-mono">{kmeansK}</span>
              </label>
              <input type="range" min="2" max="5" step="1" value={kmeansK}
                onChange={(e) => { setKmeansK(parseInt(e.target.value, 10)); resetKmeans(); }}
                className="w-full accent-cyan-500" />
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={stepKmeans}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs py-2 rounded-xl font-semibold transition shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Step k-Means Iteration
              </button>
              <button onClick={generateRandomPoints}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl font-semibold transition border border-slate-700 flex items-center justify-center gap-1.5">
                <Dice5 className="w-3.5 h-3.5 text-cyan-400" /> Randomize Points
              </button>
              <button onClick={resetKmeans}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl font-semibold transition border border-slate-700">
                Reset Centroids
              </button>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
              <div>Data Points: <span className="text-white font-bold">{kmeansPoints.length}</span></div>
              <div>State: <span className="text-cyan-400">{kmeansState}</span></div>
            </div>
          </div>
          <div className="md:col-span-2 relative h-64 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden cursor-crosshair">
            <canvas ref={kmeansCanvasRef} onClick={addKmeansPoint} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
