import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Check, Activity, Footprints, Zap } from 'lucide-react';
import { MathText, setupCanvas } from '../../../../../common';
import { ML_MODULES } from '../types';


export const Module4Reinforcement: React.FC = () => {
  const mod = ML_MODULES.find(m => m.id === 'm4')!;

  const [rlEpsilon, setRlEpsilon] = useState<number>(0.2);
  const [rlEpisodes, setRlEpisodes] = useState<number>(0);
  const [rlTotalReward, setRlTotalReward] = useState<number>(0);
  const [rlAgentPos, setRlAgentPos] = useState<{ r: number; c: number }>({ r: 0, c: 0 });
  const rlQTableRef = useRef<Record<string, number[]>>({});
  const rlCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const initRlQTable = () => {
    const table: Record<string, number[]> = {};
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        table[`${r},${c}`] = [0, 0, 0, 0];
      }
    }
    rlQTableRef.current = table;
  };

  const resetRl = () => {
    setRlEpisodes(0);
    setRlTotalReward(0);
    setRlAgentPos({ r: 0, c: 0 });
    initRlQTable();
  };

  const stepRl = useCallback(() => {
    const { r, c } = rlAgentPos;
    const stateKey = `${r},${c}`;
    const qVals = rlQTableRef.current[stateKey] || [0, 0, 0, 0];
    let action = Math.random() < rlEpsilon ? Math.floor(Math.random() * 4) : qVals.indexOf(Math.max(...qVals));

    let nr = r, nc = c;
    if (action === 0 && r > 0) nr--;
    if (action === 1 && c < 3) nc++;
    if (action === 2 && r < 3) nr++;
    if (action === 3 && c > 0) nc--;

    let reward = -1, isTerminal = false;
    if (nr === 3 && nc === 3) { reward = 100; isTerminal = true; }
    if (nr === 1 && nc === 1) { reward = -100; isTerminal = true; }

    const nextKey = `${nr},${nc}`;
    const nextQVals = rlQTableRef.current[nextKey] || [0, 0, 0, 0];
    rlQTableRef.current[stateKey][action] += 0.2 * (reward + 0.9 * Math.max(...nextQVals) - rlQTableRef.current[stateKey][action]);
    setRlTotalReward(prev => prev + reward);
    if (isTerminal) {
      setRlAgentPos({ r: 0, c: 0 });
      setRlEpisodes(prev => prev + 1);
    } else {
      setRlAgentPos({ r: nr, c: nc });
    }
  }, [rlAgentPos, rlEpsilon]);

  const trainRlEpisodes = (count: number) => {
    let currentR = rlAgentPos.r, currentC = rlAgentPos.c, rewardAcc = 0, epCount = 0;
    for (let i = 0; i < count * 15; i++) {
      const stateKey = `${currentR},${currentC}`;
      const qVals = rlQTableRef.current[stateKey] || [0, 0, 0, 0];
      let action = Math.random() < rlEpsilon ? Math.floor(Math.random() * 4) : qVals.indexOf(Math.max(...qVals));
      let nr = currentR, nc = currentC;
      if (action === 0 && currentR > 0) nr--;
      if (action === 1 && currentC < 3) nc++;
      if (action === 2 && currentR < 3) nr++;
      if (action === 3 && currentC > 0) nc--;
      let reward = -1, isTerminal = false;
      if (nr === 3 && nc === 3) { reward = 100; isTerminal = true; }
      if (nr === 1 && nc === 1) { reward = -100; isTerminal = true; }
      const nextKey = `${nr},${nc}`;
      const nextQVals = rlQTableRef.current[nextKey] || [0, 0, 0, 0];
      rlQTableRef.current[stateKey][action] += 0.2 * (reward + 0.9 * Math.max(...nextQVals) - rlQTableRef.current[stateKey][action]);
      rewardAcc += reward;
      if (isTerminal) { currentR = 0; currentC = 0; epCount++; }
      else { currentR = nr; currentC = nc; }
    }
    setRlAgentPos({ r: currentR, c: currentC });
    setRlTotalReward(prev => prev + rewardAcc);
    setRlEpisodes(prev => prev + epCount);
  };

  const drawRlCanvas = useCallback(() => {
    const canvas = rlCanvasRef.current;
    const res = setupCanvas(canvas);
    if (!res) return;
    const { ctx, width: w, height: h } = res;
    ctx.clearRect(0, 0, w, h);
    const cellSize = Math.min(w, h) / 4;
    const offsetX = (w - cellSize * 4) / 2;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const x = offsetX + c * cellSize, y = r * cellSize;
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, cellSize, cellSize);
        if (r === 3 && c === 3) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
          ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
          ctx.strokeStyle = '#10b981'; ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
          ctx.fillStyle = '#10b981'; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('GOAL (+100)', x + 8, y + cellSize / 2 + 4);
        } else if (r === 1 && c === 1) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
          ctx.strokeStyle = '#ef4444'; ctx.strokeRect(x + 2, y + 2, cellSize - 4, cellSize - 4);
          ctx.fillStyle = '#ef4444'; ctx.font = 'bold 11px sans-serif';
          ctx.fillText('TRAP (-100)', x + 8, y + cellSize / 2 + 4);
        }
      }
    }
    const ax = offsetX + rlAgentPos.c * cellSize + cellSize / 2;
    const ay = rlAgentPos.r * cellSize + cellSize / 2;
    ctx.beginPath(); ctx.arc(ax, ay, cellSize / 4, 0, Math.PI * 2);
    ctx.fillStyle = '#38bdf8'; ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5; ctx.stroke();
  }, [rlAgentPos]);

  useEffect(() => {
    if (Object.keys(rlQTableRef.current).length === 0) initRlQTable();
    drawRlCanvas();
  }, [drawRlCanvas]);

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
                  <MathText text={concept.formula} displayMode={true} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RL GridWorld Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Interactive GridWorld Q-Learning Agent</span>
        </div>
        <p className="text-xs text-slate-300">
          Simulate a tabular Q-Learning agent navigating to Goal (+100 reward) while avoiding Traps (-100).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Exploration Rate (ε):</span>
                <span className="text-cyan-400 font-mono">{rlEpsilon.toFixed(2)}</span>
              </label>
              <input type="range" min="0" max="1" step="0.05" value={rlEpsilon}
                onChange={(e) => setRlEpsilon(parseFloat(e.target.value))}
                className="w-full accent-cyan-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={stepRl}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs py-2 rounded-xl font-semibold transition shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5">
                <Footprints className="w-3.5 h-3.5" /> Step Agent
              </button>
              <button onClick={() => trainRlEpisodes(50)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs py-2 rounded-xl font-semibold transition shadow-md shadow-cyan-600/30 flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> Train 50 Ep
              </button>
            </div>
            <button onClick={resetRl}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-xl font-semibold transition border border-slate-700">
              Reset Grid &amp; Q-Table
            </button>
            <div className="text-xs text-slate-400 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
              <div>Episodes Trained: <span className="text-white font-bold">{rlEpisodes}</span></div>
              <div>Total Reward: <span className="text-emerald-400 font-bold">{rlTotalReward}</span></div>
            </div>
          </div>
          <div className="md:col-span-2 relative h-64 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center p-2">
            <canvas ref={rlCanvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
