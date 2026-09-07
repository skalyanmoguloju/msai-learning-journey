import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Brain, BarChart2, TrendingUp, Sigma, Zap, Layers, ClipboardCheck,
  ChevronRight, CheckCircle2, XCircle, RefreshCw
} from 'lucide-react';

type Section = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 'quiz';

const SECTIONS: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 's1',   label: 'S1: Foundational Concepts',     icon: Brain          },
  { id: 's2',   label: 'S2: Classification Metrics',    icon: BarChart2      },
  { id: 's3',   label: 'S3: Regression Metrics',        icon: TrendingUp     },
  { id: 's4',   label: 'S4: Probability & Activations', icon: Sigma          },
  { id: 's5',   label: 'S5: Linear Regression & GD',    icon: Zap            },
  { id: 's6',   label: 'S6: Neural Nets & CNN Sizing',  icon: Layers         },
  { id: 'quiz', label: 'Self-Assessment Quiz',           icon: ClipboardCheck },
];

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 ${className}`}>
    {title && <h3 className="text-sm font-bold text-sky-400">{title}</h3>}
    {children}
  </div>
);

const ResultBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-3 p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 leading-relaxed">
    {children}
  </div>
);

const ExampleBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-950 border-l-4 border-sky-500 pl-4 pr-3 py-3 rounded-r-xl text-xs text-slate-300 space-y-1 leading-relaxed">
    {children}
  </div>
);

const ActionBtn: React.FC<{ onClick: () => void; children: React.ReactNode; secondary?: boolean }> = ({ onClick, children, secondary }) => (
  <button onClick={onClick}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
      secondary
        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        : 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/20'
    }`}>
    {children}
  </button>
);

// ── S1 ──────────────────────────────────────────────────────
const S1: React.FC = () => {
  const [train, setTrain] = useState(70);
  const remaining = 100 - train;
  const val  = Math.floor(remaining / 2);
  const test = remaining - val;

  return (
    <div className="space-y-4">
      <Card title="Explicit Programming vs. Machine Learning">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <p className="font-bold text-amber-400 mb-1">Traditional Programming</p>
            <p className="font-mono">Rules + Data → Answers</p>
          </div>
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <p className="font-bold text-emerald-400 mb-1">Machine Learning</p>
            <p className="font-mono">Data + Answers → Rules</p>
          </div>
        </div>
      </Card>
      <Card title="Worked Example: Spam Filtering">
        <ExampleBox>
          <p><strong className="text-amber-300">Explicit:</strong> Hardcoded IF-ELSE for words like "FREE". Fails when spammers write "F.R.E.E".</p>
          <p><strong className="text-emerald-300">ML Approach:</strong> Train on 10,000 labeled emails — model learns word frequency distributions automatically.</p>
        </ExampleBox>
      </Card>
      <Card title="Interactive Data Splitter">
        <p className="text-xs text-slate-400">Adjust to simulate Train / Val / Test partition ratios:</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-300">
            <label>Train Ratio</label>
            <span className="font-mono font-bold text-sky-400">{train}%</span>
          </div>
          <input type="range" min={50} max={90} value={train}
            onChange={e => setTrain(Number(e.target.value))}
            className="w-full accent-sky-500" />
        </div>
        <ResultBox>
          Train: <span className="text-emerald-400">{train}%</span>{' | '}
          Validation: <span className="text-blue-400">{val}%</span>{' | '}
          Test: <span className="text-amber-400">{test}%</span>
        </ResultBox>
      </Card>
    </div>
  );
};

// ── S2 ──────────────────────────────────────────────────────
const S2: React.FC = () => {
  const [tp, setTp] = useState(45);
  const [fp, setFp] = useState(10);
  const [fn, setFn] = useState(5);
  const [tn, setTn] = useState(140);

  const total = tp + fp + fn + tn;
  const acc  = total > 0 ? (tp + tn) / total : 0;
  const prec = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const rec  = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const f1   = (prec + rec) > 0 ? 2 * prec * rec / (prec + rec) : 0;

  const Inp: React.FC<{ label: string; val: number; set: (n: number) => void }> = ({ label, val, set }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] text-slate-400">{label}</label>
      <input type="number" min={0} value={val}
        onChange={e => set(Math.max(0, Number(e.target.value)))}
        className="bg-slate-950 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-sky-500" />
    </div>
  );

  return (
    <div className="space-y-4">
      <Card title="Worked Example: Medical Diagnosis">
        <ExampleBox>
          <p>100 patients (10 Positive, 90 Negative): <strong className="text-sky-300">TP=8, FP=2, FN=2, TN=88</strong></p>
          <p>Precision = 8/10 = <strong className="text-emerald-300">80%</strong> | Recall = 8/10 = <strong className="text-emerald-300">80%</strong></p>
        </ExampleBox>
      </Card>
      <Card title="Interactive Confusion Matrix Calculator">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Inp label="True Positives (TP)"  val={tp} set={setTp} />
          <Inp label="False Positives (FP)" val={fp} set={setFp} />
          <Inp label="False Negatives (FN)" val={fn} set={setFn} />
          <Inp label="True Negatives (TN)"  val={tn} set={setTn} />
        </div>
        <ResultBox>
          Accuracy: <span className="text-sky-300">{acc.toFixed(4)}</span>{'  |  '}
          Precision: <span className="text-emerald-300">{prec.toFixed(4)}</span>{'  |  '}
          Recall: <span className="text-amber-300">{rec.toFixed(4)}</span>{'  |  '}
          F1: <span className="text-purple-300">{f1.toFixed(4)}</span>
        </ResultBox>
      </Card>
    </div>
  );
};

// ── S3 ──────────────────────────────────────────────────────
const S3: React.FC = () => {
  const [yRaw,    setYRaw]    = useState('3.0, -0.5, 2.0, 7.0');
  const [yHatRaw, setYHatRaw] = useState('2.5, 0.0, 2.1, 7.8');
  const [result,  setResult]  = useState<string | null>(null);

  const calc = () => {
    const y    = yRaw.split(',').map(s => parseFloat(s.trim()));
    const yHat = yHatRaw.split(',').map(s => parseFloat(s.trim()));
    if (y.length !== yHat.length || y.some(isNaN) || yHat.some(isNaN)) {
      setResult('Error: Arrays must be equal length with valid numbers.'); return;
    }
    const n = y.length;
    let mae = 0, mse = 0, ySum = 0;
    for (let i = 0; i < n; i++) { mae += Math.abs(yHat[i]-y[i]); mse += (yHat[i]-y[i])**2; ySum += y[i]; }
    mae /= n; mse /= n;
    const yMean = ySum / n;
    let ssTot = 0, ssRes = 0;
    for (let i = 0; i < n; i++) { ssTot += (y[i]-yMean)**2; ssRes += (y[i]-yHat[i])**2; }
    const r2 = ssTot === 0 ? 1 : 1 - ssRes/ssTot;
    setResult(`MAE: ${mae.toFixed(4)}  |  MSE: ${mse.toFixed(4)}  |  RMSE: ${Math.sqrt(mse).toFixed(4)}  |  R²: ${r2.toFixed(4)}`);
  };

  return (
    <div className="space-y-4">
      <Card title="Worked Example: House Price Prediction">
        <ExampleBox>
          <p>y = [300k, 400k] | ŷ = [310k, 380k] → errors = [-10k, +20k]</p>
          <p><strong className="text-sky-300">MAE = 15k</strong> | <strong className="text-sky-300">MSE = 250M</strong></p>
        </ExampleBox>
      </Card>
      <Card title="Regression Metrics Calculator">
        <div className="space-y-2">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Actual targets (y), comma-separated</label>
            <input value={yRaw} onChange={e => setYRaw(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500" />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Predicted values (ŷ), comma-separated</label>
            <input value={yHatRaw} onChange={e => setYHatRaw(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500" />
          </div>
        </div>
        <ActionBtn onClick={calc}>Compute Metrics</ActionBtn>
        {result && <ResultBox>{result}</ResultBox>}
      </Card>
    </div>
  );
};

// ── S4 ──────────────────────────────────────────────────────
type ActType = 'sigmoid' | 'relu' | 'tanh';

const S4: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [act, setAct] = useState<ActType>('sigmoid');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H/2); ctx.lineTo(W, H/2);
    ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H);
    ctx.stroke();
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let px = 0; px < W; px++) {
      const x = (px - W/2) / 35;
      let y = 0;
      if (act === 'sigmoid') y = 1 / (1 + Math.exp(-x));
      else if (act === 'relu') y = Math.max(0, x);
      else y = Math.tanh(x);
      const py = H/2 - y * 55;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '10px monospace';
    ctx.fillText(act === 'relu' ? 'y = max(0, x)' : act === 'sigmoid' ? 'y = 1/(1+e⁻ˣ)' : 'y = tanh(x)', 10, 18);
  }, [act]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <div className="space-y-4">
      <Card title="Interactive Activation Visualizer">
        <p className="text-xs text-slate-400">Select a function to see its output curve:</p>
        <div className="flex gap-2 flex-wrap">
          {(['sigmoid', 'relu', 'tanh'] as ActType[]).map(a => (
            <button key={a} onClick={() => setAct(a)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${act === a ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'}`}>
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
        <canvas ref={canvasRef} className="w-full h-52 bg-slate-950 border border-slate-800 rounded-xl" />
      </Card>
      <Card title="Activation Reference">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { name: 'Sigmoid', formula: 'σ(x) = 1/(1+e⁻ˣ)', range: '(0, 1)',  use: 'Binary output layer' },
            { name: 'ReLU',    formula: 'f(x) = max(0, x)',  range: '[0, ∞)',  use: 'Hidden layers (default)' },
            { name: 'Tanh',    formula: 'f(x) = tanh(x)',   range: '(-1, 1)', use: 'Zero-centered hidden layers' },
          ].map(fn => (
            <div key={fn.name} className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1">
              <p className="font-bold text-sky-400">{fn.name}</p>
              <p className="font-mono text-slate-300">{fn.formula}</p>
              <p className="text-slate-400">Range: <span className="text-emerald-300">{fn.range}</span></p>
              <p className="text-slate-500 italic">{fn.use}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ── S5 ──────────────────────────────────────────────────────
const GD_DATA = [{ x: 1, y: 2 }, { x: 2, y: 2.8 }, { x: 3, y: 3.6 }, { x: 4, y: 4.5 }];

const S5: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [w, setW] = useState(0);
  const [b, setB] = useState(0);
  const [loss, setLoss] = useState<number | null>(null);
  const [steps, setSteps] = useState(0);

  const render = useCallback((wv: number, bv: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);
    const sx = W / 6, sy = H / 8;
    ctx.fillStyle = '#ef4444';
    GD_DATA.forEach(p => { ctx.beginPath(); ctx.arc(p.x * sx, H - p.y * sy, 5, 0, Math.PI*2); ctx.fill(); });
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, H - bv * sy);
    ctx.lineTo(W, H - (wv * 6 + bv) * sy);
    ctx.stroke();
  }, []);

  useEffect(() => { render(w, b); }, [render, w, b]);

  const step = () => {
    const lr = 0.05;
    let dw = 0, db = 0, l = 0;
    GD_DATA.forEach(p => { const err = (w * p.x + b) - p.y; dw += err * p.x; db += err; l += err**2; });
    dw /= GD_DATA.length; db /= GD_DATA.length; l /= GD_DATA.length;
    const nw = w - lr * dw, nb = b - lr * db;
    setW(nw); setB(nb); setLoss(l); setSteps(s => s + 1);
  };

  const reset = () => { setW(0); setB(0); setLoss(null); setSteps(0); };

  return (
    <div className="space-y-4">
      <Card title="Gradient Descent Visualizer">
        <p className="text-xs text-slate-400">Red dots = data points. Blue line = current regression line. Click Step to minimize MSE loss.</p>
        <div className="flex gap-2 flex-wrap">
          <ActionBtn onClick={step}>Step GD ({steps})</ActionBtn>
          <ActionBtn onClick={reset} secondary><RefreshCw className="w-3 h-3 inline mr-1" />Reset</ActionBtn>
        </div>
        <canvas ref={canvasRef} className="w-full h-52 bg-slate-950 border border-slate-800 rounded-xl" />
        <ResultBox>
          w: <span className="text-sky-300">{w.toFixed(4)}</span>{'  |  '}
          b: <span className="text-emerald-300">{b.toFixed(4)}</span>{'  |  '}
          Loss (MSE): <span className="text-amber-300">{loss !== null ? loss.toFixed(4) : '--'}</span>
        </ResultBox>
      </Card>
      <Card title="Weight Update Rule">
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-cyan-300 space-y-1">
          <p>w ← w − α · (1/n) Σ (ŷᵢ − yᵢ) · xᵢ</p>
          <p>b ← b − α · (1/n) Σ (ŷᵢ − yᵢ)</p>
          <p className="text-slate-400 mt-1 not-italic">α = 0.05 (learning rate)</p>
        </div>
      </Card>
    </div>
  );
};

// ── S6 ──────────────────────────────────────────────────────
const S6: React.FC = () => {
  const [W, setW] = useState(32);
  const [F, setF] = useState(5);
  const [P, setP] = useState(2);
  const [S, setS] = useState(1);
  const out = S > 0 ? Math.floor((W - F + 2*P) / S) + 1 : null;

  const Nf: React.FC<{ label: string; val: number; set: (n: number) => void }> = ({ label, val, set }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] text-slate-400">{label}</label>
      <input type="number" value={val} onChange={e => set(Number(e.target.value))}
        className="bg-slate-950 border border-slate-700 text-slate-100 text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 w-full" />
    </div>
  );

  return (
    <div className="space-y-4">
      <Card title="Worked Example: Feature Map Calculation">
        <ExampleBox>
          <p>Input (W=32), Filter (F=5), Padding (P=2), Stride (S=1):</p>
          <p className="font-mono text-sky-300">O = ⌊(32 − 5 + 2×2) / 1⌋ + 1 = 32</p>
        </ExampleBox>
      </Card>
      <Card title="Interactive CNN Sizing Calculator">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Nf label="Input Size (W)" val={W} set={setW} />
          <Nf label="Filter Size (F)" val={F} set={setF} />
          <Nf label="Padding (P)"     val={P} set={setP} />
          <Nf label="Stride (S)"      val={S} set={setS} />
        </div>
        <ResultBox>
          {out !== null && out > 0
            ? <>Output: <span className="text-emerald-400">{out} × {out}</span></>
            : <span className="text-red-400">Invalid parameters (output ≤ 0)</span>}
        </ResultBox>
        <p className="text-[11px] text-slate-500 font-mono">Formula: O = ⌊(W − F + 2P) / S⌋ + 1</p>
      </Card>
      <Card title="Key Formulas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { label: 'Conv Layer Parameters', formula: 'F × F × C_in × C_out + C_out', color: 'text-sky-300' },
            { label: 'Receptive Field',        formula: 'r_l = r_{l-1} + (k−1)·∏sᵢ',  color: 'text-purple-300' },
            { label: 'Max-Pool Output',        formula: 'O = ⌊(W − k) / S⌋ + 1',       color: 'text-amber-300' },
          ].map(r => (
            <div key={r.label} className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
              <p className="text-slate-400 text-[11px] mb-1">{r.label}</p>
              <p className={`font-mono font-bold ${r.color}`}>{r.formula}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ── Quiz ─────────────────────────────────────────────────────
const QUIZ = [
  { q: 'An input of 64×64 with a 3×3 filter, stride 1, no padding. Output size?', options: ['62×62', '64×64', '60×60', '32×32'], correct: 0, explain: 'O = ⌊(64−3+0)/1⌋+1 = 62.' },
  { q: 'Which metric is most robust to extreme regression outliers?', options: ['MSE', 'MAE', 'RMSE', 'R²'], correct: 1, explain: 'MAE uses absolute differences — outlier errors are not squared.' },
  { q: 'Which activation outputs values in zero-centered range (−1, 1)?', options: ['Sigmoid', 'ReLU', 'Tanh', 'Softmax'], correct: 2, explain: 'Tanh maps inputs to (−1,1), aiding zero-centering in hidden layers.' },
  { q: 'In gradient descent, the weight update subtracts α multiplied by:', options: ['Loss value', '∂L/∂w (gradient of loss)', 'Learning rate squared', 'Input feature value'], correct: 1, explain: 'w ← w − α·∂L/∂w. We move in the negative gradient direction.' },
  { q: 'Traditional spam filters fail because:', options: ['Overfitting to training data', 'Brittleness to distribution shift (new spam patterns)', 'High variance', 'Underfitting'], correct: 1, explain: 'Rule-based systems fail when patterns shift (e.g. "F.R.E.E"). ML adapts via retraining.' },
];

const QuizSection: React.FC = () => {
  const [idx,      setIdx]      = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score,    setScore]    = useState(0);
  const [done,     setDone]     = useState(false);

  const q = QUIZ[idx];
  const choose = (i: number) => { if (selected !== null) return; setSelected(i); if (i === q.correct) setScore(s => s+1); };
  const next   = () => { if (idx+1 >= QUIZ.length) { setDone(true); return; } setIdx(i => i+1); setSelected(null); };
  const restart = () => { setIdx(0); setSelected(null); setScore(0); setDone(false); };

  if (done) return (
    <Card>
      <div className="text-center space-y-4 py-6">
        <p className="text-5xl font-extrabold text-sky-400">{score}/{QUIZ.length}</p>
        <p className="text-sm font-semibold text-white">{score === QUIZ.length ? '🎉 Perfect score!' : score >= 3 ? '✅ Good work!' : '📚 Keep reviewing!'}</p>
        <p className="text-xs text-slate-400">{Math.round((score/QUIZ.length)*100)}% correct</p>
        <ActionBtn onClick={restart}><RefreshCw className="w-3 h-3 inline mr-1" />Restart Quiz</ActionBtn>
      </div>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>Question {idx+1} of {QUIZ.length}</span>
        <span>Score: <strong className="text-emerald-400">{score}</strong></span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-sky-500 rounded-full transition-all" style={{ width: `${(idx/QUIZ.length)*100}%` }} />
      </div>
      <Card>
        <p className="text-sm font-semibold text-white leading-relaxed">{q.q}</p>
        <div className="space-y-2 mt-2">
          {q.options.map((opt, i) => {
            const isCorrect  = i === q.correct;
            const isSelected = i === selected;
            let cls = 'bg-slate-950 border border-slate-800 hover:border-sky-500 cursor-pointer';
            if (selected !== null) {
              if (isCorrect)       cls = 'bg-emerald-950/40 border border-emerald-500 cursor-default';
              else if (isSelected) cls = 'bg-red-950/40 border border-red-500 cursor-default';
              else                 cls = 'bg-slate-950 border border-slate-800 opacity-40 cursor-default';
            }
            return (
              <button key={i} onClick={() => choose(i)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs text-slate-200 transition-all flex items-center gap-2 ${cls}`}>
                {selected !== null && isCorrect  && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {selected !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                {(selected === null || (!isCorrect && !isSelected)) && <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />}
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${selected === q.correct ? 'bg-emerald-950/30 border border-emerald-800 text-emerald-200' : 'bg-red-950/30 border border-red-800 text-red-200'}`}>
            <strong>{selected === q.correct ? '✓ Correct! ' : '✗ Incorrect. '}</strong>{q.explain}
          </div>
        )}
        {selected !== null && (
          <div className="flex justify-end mt-2">
            <ActionBtn onClick={next}>{idx+1 < QUIZ.length ? 'Next →' : 'View Results'}</ActionBtn>
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Main export ───────────────────────────────────────────────
export const Week1AIBasics: React.FC = () => {
  const [active, setActive] = useState<Section>('s1');

  const renderSection = () => {
    switch (active) {
      case 's1':   return <S1 />;
      case 's2':   return <S2 />;
      case 's3':   return <S3 />;
      case 's4':   return <S4 />;
      case 's5':   return <S5 />;
      case 's6':   return <S6 />;
      case 'quiz': return <QuizSection />;
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl p-5 bg-gradient-to-r from-slate-900 via-sky-950/20 to-slate-900 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">Week 01</span>
          <span className="text-xs text-slate-400">Machine Learning or AI Basics</span>
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">Interactive Study Lab</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Hands-on widgets covering foundational concepts, classification & regression metrics, activation functions, gradient descent, and CNN sizing.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {SECTIONS.map(sec => {
          const Icon = sec.icon;
          const isActive = active === sec.id;
          return (
            <button key={sec.id} onClick={() => setActive(sec.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                isActive
                  ? sec.id === 'quiz'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      <div key={active}>{renderSection()}</div>
    </div>
  );
};
