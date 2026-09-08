import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Check, Code2, Copy, ChevronDown, Play, Activity } from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';
import { ML_MODULES } from '../types';


export const Module2SupervisedLinear: React.FC = () => {
  const mod = ML_MODULES.find(m => m.id === 'm2')!;
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Gradient Descent Simulator
  const [gdLr, setGdLr] = useState<number>(0.2);
  const [gdStartTheta, setGdStartTheta] = useState<number>(3.5);
  const [gdTheta, setGdTheta] = useState<number>(3.5);
  const [gdSteps, setGdSteps] = useState<number>(0);
  const gdCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const stepGd = () => {
    const grad = 2 * gdTheta;
    setGdTheta(prev => prev - gdLr * grad);
    setGdSteps(prev => prev + 1);
  };

  const resetGd = useCallback(() => {
    setGdTheta(gdStartTheta);
    setGdSteps(0);
  }, [gdStartTheta]);

  const drawGdCanvas = useCallback(() => {
    const canvas = gdCanvasRef.current;
    const res = setupCanvas(canvas);
    if (!res) return;
    const { ctx, width: w, height: h } = res;

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    for (let x = -5; x <= 5; x += 0.1) {
      const px = ((x + 5) / 10) * w;
      const py = h - ((x * x) / 20) * (h - 30) - 15;
      if (x === -5) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    const curPx = ((gdTheta + 5) / 10) * w;
    const curPy = h - ((gdTheta * gdTheta) / 20) * (h - 30) - 15;
    ctx.beginPath();
    ctx.arc(curPx, curPy, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(curPx, curPy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [gdTheta]);

  useEffect(() => { drawGdCanvas(); }, [drawGdCanvas]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mod.concepts.map((concept, cIdx) => (
          <div
            key={concept.title}
            className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 transition-all"
          >
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
              <div className="text-xs text-slate-300 leading-relaxed">
                <MathText text={concept.summary} />
              </div>
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
                  <MathText text={concept.formula} displayMode={true} />
                </div>
              )}
            </div>
            {concept.code && (
              <div className="pt-2 border-t border-slate-800/80">
                <details className="group">
                  <summary className="text-xs font-semibold text-slate-400 hover:text-cyan-400 cursor-pointer flex items-center justify-between list-none">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Python / NumPy Implementation
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="relative mt-2">
                    <pre className="p-3 bg-slate-950 text-slate-300 rounded-xl text-[11px] font-mono overflow-x-auto border border-slate-800">
                      {concept.code}
                    </pre>
                    <button
                      onClick={() => handleCopyCode(`code-${cIdx}`, concept.code!)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg text-xs transition"
                      title="Copy Code"
                    >
                      {copiedCodeId === `code-${cIdx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </details>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gradient Descent Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Interactive Gradient Descent Visualizer</span>
        </div>
        <p className="text-xs text-slate-300">
          Adjust the learning rate α and step through optimization to observe how gradient descent updates θ to minimize cost J(θ) = θ².
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Learning Rate (α):</span>
                <span className="text-cyan-400 font-mono">{gdLr}</span>
              </label>
              <input type="range" min="0.05" max="1.05" step="0.05" value={gdLr}
                onChange={(e) => setGdLr(parseFloat(e.target.value))}
                className="w-full accent-cyan-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Initial Position (θ₀):</span>
                <span className="text-cyan-400 font-mono">{gdStartTheta}</span>
              </label>
              <input type="range" min="-4" max="4" step="0.5" value={gdStartTheta}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setGdStartTheta(val);
                  setGdTheta(val);
                  setGdSteps(0);
                }}
                className="w-full accent-cyan-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={stepGd}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs py-2 rounded-xl font-semibold transition shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5">
                <Play className="w-3.5 h-3.5" /> Single Step
              </button>
              <button onClick={resetGd}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-xl font-semibold transition border border-slate-700">
                Reset
              </button>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
              <div>Step Count: <span className="text-white font-bold">{gdSteps}</span></div>
              <div>Current θ: <span className="text-cyan-400">{gdTheta.toFixed(4)}</span></div>
              <div>Gradient ∇J: <span className="text-amber-400">{(2 * gdTheta).toFixed(4)}</span></div>
              <div>Cost J(θ): <span className="text-emerald-400">{(gdTheta * gdTheta).toFixed(4)}</span></div>
            </div>
          </div>
          <div className="md:col-span-2 relative h-60 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <canvas ref={gdCanvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
