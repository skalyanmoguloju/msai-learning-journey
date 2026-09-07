import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Database, CheckSquare, LineChart, Activity, TrendingDown, Layers,
  Sparkles, CreditCard, Award, NotebookPen, CheckCircle, ChevronRight,
  X, Trophy, RotateCcw, ChevronLeft, ArrowRight, Percent
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ScatterController, LineController
} from 'chart.js';
import { Scatter, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ScatterController, LineController
);

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type StepId = 1 | 2 | 3 | 4 | 5 | 6;

const STEPS: { id: StepId; title: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 1, title: 'Step 1: Foundational Concepts & Data', icon: Database },
  { id: 2, title: 'Step 2: Classification Metrics',       icon: CheckSquare },
  { id: 3, title: 'Step 3: Regression Metrics',          icon: LineChart },
  { id: 4, title: 'Step 4: Probability & Activation',    icon: Activity },
  { id: 5, title: 'Step 5: Linear Reg & Gradient Descent', icon: TrendingDown },
  { id: 6, title: 'Step 6: Neural Nets & CNN Sizing',    icon: Layers },
];

const STORAGE_KEY_COMPLETED = 'ml_week1_completed';
const STORAGE_KEY_NOTES     = 'ml_week1_notes';

// ─────────────────────────────────────────────
// Flashcard data
// ─────────────────────────────────────────────
const FLASHCARDS = [
  { category: 'Step 1: ML Paradigms', q: 'What distinguishes Supervised from Unsupervised Learning?', a: 'Supervised learning trains models on input-output pairs (labels), whereas Unsupervised learning extracts structure from unlabeled inputs.' },
  { category: 'Step 2: Classification Metrics', q: 'When is Recall preferred over Precision?', a: 'Recall is vital when missing positive cases is costly (e.g., medical diagnoses), where False Negatives must be minimized.' },
  { category: 'Step 3: Regression Metrics', q: 'Why does MSE penalize large errors more heavily than MAE?', a: 'MSE squares error residuals (y - ŷ)², magnifying larger deviations quadratically compared to MAE\'s linear absolute scaling.' },
  { category: 'Step 4: Activation Functions', q: 'What is the vanishing gradient problem?', a: 'Saturating functions like Sigmoid or Tanh have near-zero derivatives for large inputs, causing gradients to shrink exponentially during backprop.' },
  { category: 'Step 5: Gradient Descent', q: 'What happens if the Learning Rate α is set too high?', a: 'Gradient descent can overshoot the loss minimum, oscillate wildly, or completely diverge to infinity.' },
  { category: 'Step 6: CNN Architecture', q: 'What is the formula for CNN feature map output width?', a: 'O = floor((W - F + 2P) / S) + 1, where W is width, F is filter size, P is padding, and S is stride.' },
];

// ─────────────────────────────────────────────
// Quiz data
// ─────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { q: '1. What metric is computed as TP / (TP + FP)?', options: ['Recall', 'Precision', 'Accuracy', 'F1 Score'], correct: 1 },
  { q: '2. Given W=32, F=5, P=0, S=1, what is the output dimension O?', options: ['28', '29', '30', '32'], correct: 0 },
  { q: '3. Which activation function outputs values constrained between -1 and 1?', options: ['Sigmoid', 'ReLU', 'Tanh', 'Softmax'], correct: 2 },
  { q: '4. In Gradient Descent, what determines the step size along the negative gradient?', options: ['Batch Size', 'Learning Rate (α)', 'Loss Intercept', 'Feature Weight'], correct: 1 },
  { q: '5. Which metric expresses model fit as proportion of total target variance explained?', options: ['MSE', 'RMSE', 'MAE', 'R² Score'], correct: 3 },
];

// ─────────────────────────────────────────────
// Shared Components
// ─────────────────────────────────────────────
const StepBadge: React.FC<{ step: StepId; color?: string }> = ({ step, color = 'bg-indigo-600' }) => (
  <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${color} text-white`}>Step {step}</span>
);

const SectionCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 ${className}`}>{children}</div>
);

const MetricBox: React.FC<{ label: string; formula: string; value: string; color: string }> = ({ label, formula, value, color }) => (
  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
      <span>{label}</span><span className="font-mono text-slate-600">{formula}</span>
    </div>
    <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
  </div>
);

// ─────────────────────────────────────────────
// Step 1 – Foundational Concepts
// ─────────────────────────────────────────────
const Step1: React.FC = () => {
  const [train, setTrain] = useState(70);
  const [val,   setVal]   = useState(15);
  const test = Math.max(0, 100 - train - val);

  const clampVal = (newTrain: number, newVal: number) => {
    const t = Math.min(85, Math.max(50, newTrain));
    const v = Math.min(30, Math.max(5, Math.min(newVal, 100 - t)));
    setTrain(t); setVal(v);
  };

  let advice = '';
  if (train >= 80) advice = `High Train Split (${train}%): Great for smaller datasets, but leaves fewer samples for unbiased hyperparameter tuning.`;
  else if (val < 10) advice = `Low Validation Split (${val}%): May lead to high variance when selecting model parameters.`;
  else advice = `Standard Split Ratio: Well-balanced for evaluating training performance without data leakage.`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '🏷️', label: 'Supervised Learning', color: 'border-blue-700/60 bg-blue-950/20', desc: 'Learns from labeled pairs (X, y). Includes Classification (discrete) and Regression (continuous).' },
          { icon: '🔷', label: 'Unsupervised Learning', color: 'border-emerald-700/60 bg-emerald-950/20', desc: 'Finds inherent patterns in unlabeled data X. Includes Clustering, PCA, Anomaly Detection.' },
          { icon: '🎮', label: 'Reinforcement Learning', color: 'border-purple-700/60 bg-purple-950/20', desc: 'An agent learns policy actions in an environment to maximize cumulative reward via feedback.' },
        ].map(c => (
          <div key={c.label} className={`p-4 rounded-xl border ${c.color}`}>
            <div className="text-2xl mb-2">{c.icon}</div>
            <h4 className="font-semibold text-sm text-white mb-1">{c.label}</h4>
            <p className="text-xs text-slate-400">{c.desc}</p>
          </div>
        ))}
      </div>

      <SectionCard>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-indigo-400 flex items-center gap-2">
            <span>⚡</span> Dataset Partitioning Simulator
          </h3>
          <span className="text-xs text-slate-500">Train / Validation / Test Splits</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono">
            <span>Training: <strong className="text-blue-400">{train}%</strong></span>
            <span>Validation: <strong className="text-emerald-400">{val}%</strong></span>
            <span>Test: <strong className="text-amber-400">{test}%</strong></span>
          </div>
          <div className="flex h-7 rounded-xl overflow-hidden border border-slate-700">
            <div className="bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white transition-all" style={{ width: `${train}%` }}>Train</div>
            <div className="bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white transition-all" style={{ width: `${val}%` }}>Val</div>
            <div className="bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white transition-all" style={{ width: `${test}%` }}>Test</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Train Ratio: <strong className="text-blue-400">{train}%</strong></label>
              <input type="range" min={50} max={85} value={train}
                onChange={e => clampVal(Number(e.target.value), val)}
                className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Validation Ratio: <strong className="text-emerald-400">{val}%</strong></label>
              <input type="range" min={5} max={30} value={val}
                onChange={e => clampVal(train, Number(e.target.value))}
                className="w-full accent-emerald-500" />
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-lg text-xs text-slate-300 border border-slate-700">
            {advice}
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

// ─────────────────────────────────────────────
// Step 2 – Classification Metrics
// ─────────────────────────────────────────────
const MATRIX_PRESETS = [
  { label: 'Medical (High Recall)', tp: 90, fp: 5,  fn: 2,  tn: 800 },
  { label: 'Spam (High Precision)', tp: 40, fp: 1,  fn: 30, tn: 500 },
  { label: 'Random Guess',          tp: 50, fp: 50, fn: 50, tn: 50  },
];

const Step2: React.FC = () => {
  const [tp, setTp] = useState(70);
  const [fp, setFp] = useState(10);
  const [fn, setFn] = useState(20);
  const [tn, setTn] = useState(100);

  const total = tp + fp + fn + tn;
  const acc  = total > 0 ? (tp + tn) / total : 0;
  const prec = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const rec  = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const f1   = (prec + rec) > 0 ? 2 * prec * rec / (prec + rec) : 0;

  let desc = '';
  if (rec > prec + 0.2)      desc = 'High Recall / Lower Precision: Model catches almost all positives but incurs more false alarms. Ideal for disease screening.';
  else if (prec > rec + 0.2) desc = 'High Precision / Lower Recall: Predictions are highly reliable when positive, but some actual positives are missed. Ideal for spam filters.';
  else                       desc = 'Balanced Precision & Recall: F1 score reflects harmonic balance between exactness and completeness.';

  const NumInput: React.FC<{ label: string; sublabel: string; val: number; set: (n: number) => void; color: string }> = ({ label, sublabel, val, set, color }) => (
    <div className={`p-3 rounded-xl border ${color} text-center`}>
      <span className="text-xs font-bold block mb-1">{label}</span>
      <input type="number" min={0} value={val}
        onChange={e => set(Math.max(0, Number(e.target.value)))}
        className="w-full text-center font-mono font-bold text-lg bg-slate-950 border border-slate-700 rounded py-1 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
      <span className="text-[10px] text-slate-500 block mt-1">{sublabel}</span>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-white text-sm">Interactive Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-3">
            <NumInput label="True Positive (TP)"  sublabel="Actual +, Predicted +" val={tp} set={setTp} color="border-emerald-700/60 bg-emerald-950/20" />
            <NumInput label="False Positive (FP)" sublabel="Type I Error"           val={fp} set={setFp} color="border-rose-700/60 bg-rose-950/20" />
            <NumInput label="False Negative (FN)" sublabel="Type II Error"          val={fn} set={setFn} color="border-amber-700/60 bg-amber-950/20" />
            <NumInput label="True Negative (TN)"  sublabel="Actual -, Predicted -"  val={tn} set={setTn} color="border-blue-700/60 bg-blue-950/20" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-500 self-center font-medium">Presets:</span>
            {MATRIX_PRESETS.map(p => (
              <button key={p.label}
                onClick={() => { setTp(p.tp); setFp(p.fp); setFn(p.fn); setTn(p.tn); }}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-300">{p.label}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-white text-sm">Calculated Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricBox label="Accuracy"          formula="(TP+TN)/Total" value={`${(acc * 100).toFixed(1)}%`}  color="text-white" />
            <MetricBox label="Precision"         formula="TP/(TP+FP)"   value={`${(prec * 100).toFixed(1)}%`} color="text-indigo-400" />
            <MetricBox label="Recall (Sens.)"    formula="TP/(TP+FN)"   value={`${(rec * 100).toFixed(1)}%`}  color="text-emerald-400" />
            <MetricBox label="F1 Score"          formula="2·P·R/(P+R)"  value={f1.toFixed(3)}                  color="text-purple-400" />
          </div>
          <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-indigo-300 block mb-1">Metric Interpretation:</span>
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Step 3 – Regression Metrics with Chart.js
// ─────────────────────────────────────────────
const DEFAULT_REG_DATA = [
  { x: 5, y: 15 }, { x: 10, y: 22 }, { x: 15, y: 28 },
  { x: 20, y: 35 }, { x: 25, y: 38 }, { x: 30, y: 48 },
];

const Step3: React.FC = () => {
  const [slope,     setSlope]     = useState(1.2);
  const [intercept, setIntercept] = useState(10);
  const [points,    setPoints]    = useState(DEFAULT_REG_DATA);

  const metrics = useCallback(() => {
    const N = points.length; if (!N) return { mse: 0, rmse: 0, mae: 0, r2: 0 };
    let sqErr = 0, absErr = 0, ySum = 0;
    points.forEach(p => {
      const yPred = slope * p.x + intercept;
      sqErr  += (p.y - yPred) ** 2;
      absErr += Math.abs(p.y - yPred);
      ySum   += p.y;
    });
    const mse = sqErr / N, rmse = Math.sqrt(mse), mae = absErr / N;
    const yMean = ySum / N;
    let tot = 0; points.forEach(p => { tot += (p.y - yMean) ** 2; });
    const r2 = tot > 0 ? 1 - sqErr / tot : 0;
    return { mse, rmse, mae, r2 };
  }, [points, slope, intercept]);

  const { mse, rmse, mae, r2 } = metrics();

  const scatterData = {
    datasets: [
      {
        label: 'Data Points (y)',
        data: points,
        backgroundColor: '#6366f1',
        pointRadius: 6,
      },
      {
        label: 'Predicted Line (ŷ = wx + b)',
        data: [{ x: 0, y: intercept }, { x: 35, y: slope * 35 + intercept }],
        type: 'line' as const,
        borderColor: '#f59e0b',
        borderWidth: 2,
        fill: false as const,
        pointRadius: 0,
      },
    ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
    scales: {
      x: { min: 0, max: 35, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
      y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b' } },
    },
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'MSE', formula: '(1/N)Σ(yᵢ−ŷᵢ)²', desc: 'Penalizes large outliers heavily.', color: 'text-indigo-400' },
          { label: 'RMSE', formula: '√MSE', desc: 'Interpretable in original units.', color: 'text-emerald-400' },
          { label: 'MAE', formula: '(1/N)Σ|yᵢ−ŷᵢ|', desc: 'Robust to extreme outliers.', color: 'text-amber-400' },
          { label: 'R²', formula: '1 - SSres/SStot', desc: 'Variance explained (1.0 = perfect).', color: 'text-purple-400' },
        ].map(m => (
          <div key={m.label} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className={`text-xs font-bold ${m.color}`}>{m.label}</span>
            <p className="font-mono text-[11px] text-slate-300 my-1">{m.formula}</p>
            <p className="text-[11px] text-slate-500">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-slate-300">Interactive Scatter Fitting</h4>
            <div className="flex gap-2">
              <button
                onClick={() => setPoints(p => [...p, { x: 18, y: 85 }])}
                className="text-xs px-2.5 py-1 bg-amber-600 text-white rounded hover:bg-amber-500 transition">Add Outlier</button>
              <button
                onClick={() => setPoints(DEFAULT_REG_DATA)}
                className="text-xs px-2.5 py-1 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition">Reset</button>
            </div>
          </div>
          <div className="h-56">
            <Scatter data={scatterData} options={chartOptions} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 flex justify-between mb-1">
                <span>Slope (w)</span><strong className="text-white font-mono">{slope.toFixed(1)}</strong>
              </label>
              <input type="range" min={-1} max={3} step={0.1} value={slope}
                onChange={e => setSlope(Number(e.target.value))}
                className="w-full accent-indigo-500" />
            </div>
            <div>
              <label className="text-xs text-slate-400 flex justify-between mb-1">
                <span>Intercept (b)</span><strong className="text-white font-mono">{intercept}</strong>
              </label>
              <input type="range" min={-10} max={30} step={1} value={intercept}
                onChange={e => setIntercept(Number(e.target.value))}
                className="w-full accent-indigo-500" />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2">
            <div className="text-slate-400 font-sans text-[11px] font-semibold border-b border-slate-800 pb-1">Live Metrics</div>
            <div className="flex justify-between"><span className="text-slate-400">MSE:</span><span className="text-indigo-400 font-bold">{mse.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">RMSE:</span><span className="text-emerald-400 font-bold">{rmse.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">MAE:</span><span className="text-amber-400 font-bold">{mae.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">R²:</span><span className="text-purple-400 font-bold">{r2.toFixed(3)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Step 4 – Activation Functions + Softmax
// ─────────────────────────────────────────────
type ActType4 = 'sigmoid' | 'relu' | 'tanh' | 'leaky';

const ACT_INFO: Record<ActType4, { title: string; desc: string; color: string }> = {
  sigmoid: { title: 'Sigmoid σ(x)', color: '#8b5cf6', desc: 'Maps outputs to (0,1). Used for binary classification output. Suffers from vanishing gradients at extreme values.' },
  relu:    { title: 'ReLU max(0,x)', color: '#f59e0b', desc: 'Output = max(0, x). Computationally efficient; avoids vanishing gradients for positives. Default for deep hidden layers.' },
  tanh:    { title: 'Tanh tanh(x)', color: '#22c55e', desc: 'Zero-centered output in (-1, 1). Often converges faster than Sigmoid for hidden layers.' },
  leaky:   { title: 'Leaky ReLU (α=0.1)', color: '#38bdf8', desc: 'Allows tiny gradient (0.1x) for negative inputs. Solves the "Dying ReLU" problem.' },
};

const buildActData = (type: ActType4) => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let x = -6; x <= 6; x += 0.2) {
    xs.push(parseFloat(x.toFixed(1)));
    let y = 0;
    if (type === 'sigmoid') y = 1 / (1 + Math.exp(-x));
    else if (type === 'relu')   y = Math.max(0, x);
    else if (type === 'tanh')   y = Math.tanh(x);
    else                        y = x > 0 ? x : 0.1 * x;
    ys.push(y);
  }
  return { xs, ys };
};

const Step4: React.FC = () => {
  const [act,    setAct]    = useState<ActType4>('sigmoid');
  const [logit1, setLogit1] = useState(2.5);
  const [logit2, setLogit2] = useState(1.0);
  const [logit3, setLogit3] = useState(0.2);

  const { xs, ys } = buildActData(act);
  const info       = ACT_INFO[act];

  const exp1 = Math.exp(logit1), exp2 = Math.exp(logit2), exp3 = Math.exp(logit3);
  const sum  = exp1 + exp2 + exp3;
  const p1   = (exp1 / sum) * 100, p2 = (exp2 / sum) * 100, p3 = (exp3 / sum) * 100;

  const actChartData = {
    labels: xs,
    datasets: [{ label: 'f(x)', data: ys, borderColor: info.color, borderWidth: 2.5, fill: false, pointRadius: 0 }],
  };

  const actChartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 9 } } },
      y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b', font: { size: 9 } } },
    },
  };

  const ProbBar: React.FC<{ label: string; pct: number; color: string; textColor: string }> = ({ label, pct, color, textColor }) => (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1">
        <span className="text-slate-400">{label}</span>
        <span className={`font-bold ${textColor}`}>{pct.toFixed(1)}%</span>
      </div>
      <div className="bg-slate-800 h-2.5 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-white">Non-Linear Activation Curves</h3>
            <select value={act} onChange={e => setAct(e.target.value as ActType4)}
              className="text-xs bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="sigmoid">Sigmoid σ(x)</option>
              <option value="relu">ReLU max(0,x)</option>
              <option value="tanh">Tanh tanh(x)</option>
              <option value="leaky">Leaky ReLU (0.1x)</option>
            </select>
          </div>
          <div className="h-52">
            <Line data={actChartData} options={actChartOptions} />
          </div>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="font-bold text-indigo-400 block mb-1">{info.title}</span>
            <p className="text-slate-400 leading-relaxed">{info.desc}</p>
          </div>
        </SectionCard>

        <SectionCard>
          <h3 className="font-semibold text-sm text-indigo-400 flex items-center gap-2">
            <Percent className="w-4 h-4" /> Multi-class Softmax Calculator
          </h3>
          <p className="text-xs text-slate-400">Raw logit scores z → probabilities where ΣP = 1.0</p>
          <p className="font-mono text-xs text-slate-300">P(zᵢ) = exp(zᵢ) / Σ exp(zⱼ)</p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Logit z₁ (Cat)', val: logit1, set: setLogit1 },
              { label: 'Logit z₂ (Dog)', val: logit2, set: setLogit2 },
              { label: 'Logit z₃ (Bird)', val: logit3, set: setLogit3 },
            ].map(({ label, val, set }) => (
              <div key={label}>
                <label className="block text-[10px] text-slate-500 mb-1">{label}</label>
                <input type="number" value={val} step={0.1}
                  onChange={e => set(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 font-mono text-center text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500" />
              </div>
            ))}
          </div>

          <div className="space-y-2.5 pt-1">
            <ProbBar label="P(Cat)"  pct={p1} color="bg-indigo-500"  textColor="text-indigo-400" />
            <ProbBar label="P(Dog)"  pct={p2} color="bg-emerald-500" textColor="text-emerald-400" />
            <ProbBar label="P(Bird)" pct={p3} color="bg-amber-500"   textColor="text-amber-400" />
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Step 5 – Gradient Descent Simulation
// ─────────────────────────────────────────────
const Step5: React.FC = () => {
  const [lr,       setLr]       = useState(0.10);
  const [w0,       setW0]       = useState(-3.8);
  const [currentW, setCurrentW] = useState(-3.8);
  const [step,     setStep]     = useState(0);
  const [playing,  setPlaying]  = useState(false);
  const intervalRef             = useRef<ReturnType<typeof setInterval> | null>(null);

  const curvePoints = [];
  for (let w = -5; w <= 5; w += 0.2) curvePoints.push({ x: parseFloat(w.toFixed(1)), y: w * w });

  const gdChartData = {
    datasets: [
      { label: 'Loss Surface J(w) = w²', data: curvePoints, type: 'line' as const, borderColor: '#e11d48', borderWidth: 2, pointRadius: 0, fill: false as const },
      { label: 'Current w', data: [{ x: currentW, y: currentW * currentW }], backgroundColor: '#6366f1', pointRadius: 9 },
    ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const gdChartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
    scales: {
      x: { min: -5, max: 5,  grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' } },
      y: { min: 0,  max: 25, grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#64748b' } },
    },
  };

  const doStep = useCallback((w: number) => {
    const grad = 2 * w;
    return w - lr * grad;
  }, [lr]);

  const stepOnce = () => {
    setCurrentW(w => doStep(w));
    setStep(s => s + 1);
  };

  const reset = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setPlaying(false);
    setCurrentW(w0);
    setStep(0);
  }, [w0]);

  useEffect(() => { reset(); }, [w0, reset]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setCurrentW(w => {
          const nw = doStep(w);
          setStep(s => {
            if (Math.abs(nw) < 0.01 || s + 1 > 50) {
              clearInterval(intervalRef.current!); intervalRef.current = null;
              setPlaying(false);
            }
            return s + 1;
          });
          return nw;
        });
      }, 300);
    } else {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, doStep]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          <SectionCard>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-rose-400 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" /> Loss Curve & Gradient Trajectory
              </h3>
              <div className="flex gap-2">
                <button onClick={() => setPlaying(p => !p)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-500 transition">
                  {playing ? 'Pause' : 'Play'}
                </button>
                <button onClick={stepOnce}
                  className="px-3 py-1 bg-slate-700 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-600 transition">Step</button>
                <button onClick={reset}
                  className="px-3 py-1 bg-slate-700 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-600 transition">Reset</button>
              </div>
            </div>
            <div className="h-56">
              <Scatter data={gdChartData} options={gdChartOptions} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div><span className="text-slate-400 block text-[10px]">Iteration</span><strong className="text-white">{step}</strong></div>
              <div><span className="text-slate-400 block text-[10px]">w</span><strong className="text-indigo-400">{currentW.toFixed(3)}</strong></div>
              <div><span className="text-slate-400 block text-[10px]">Loss J(w)</span><strong className="text-rose-400">{(currentW * currentW).toFixed(3)}</strong></div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard>
            <h4 className="font-semibold text-sm text-rose-400">Hyperparameter Controls</h4>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 flex justify-between mb-1">
                  <span>Learning Rate (α)</span><strong className="text-indigo-400 font-mono">{lr.toFixed(2)}</strong>
                </label>
                <input type="range" min={0.01} max={1.0} step={0.01} value={lr}
                  onChange={e => { setLr(Number(e.target.value)); reset(); }}
                  className="w-full accent-indigo-500" />
              </div>
              <div>
                <label className="text-xs text-slate-300 flex justify-between mb-1">
                  <span>Starting w₀</span><strong className="text-amber-400 font-mono">{w0.toFixed(1)}</strong>
                </label>
                <input type="range" min={-4.5} max={4.5} step={0.1} value={w0}
                  onChange={e => setW0(Number(e.target.value))}
                  className="w-full accent-amber-500" />
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-slate-200">Weight Update Rule:</div>
              <code className="text-slate-300 font-mono block">w⁽ᵗ⁺¹⁾ = w⁽ᵗ⁾ − α · ∂J/∂w</code>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                If α is too small, convergence is slow. If α is too high, gradient descent may overshoot or diverge!
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Step 6 – CNN Sizing
// ─────────────────────────────────────────────
const Step6: React.FC = () => {
  const [W, setW] = useState(28);
  const [F, setF] = useState(5);
  const [P, setP] = useState(2);
  const [S, setS] = useState(1);

  const rawVal = (W - F + 2 * P) / S;
  const O      = Math.floor(rawVal) + 1;
  const valid  = Number.isInteger(rawVal) && O > 0;

  const inputPx  = Math.max(30, Math.min(110, W * 2.8));
  const outputPx = Math.max(30, Math.min(110, O * 2.8));

  const Slider: React.FC<{ label: string; val: number; set: (n: number) => void; min: number; max: number; step?: number }> = ({ label, val, set, min, max, step = 1 }) => (
    <div>
      <div className="flex justify-between mb-1 text-xs font-medium text-slate-300">
        <span>{label}</span><span className="font-bold text-indigo-400">{val} px</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={e => set(Number(e.target.value))}
        className="w-full accent-indigo-500" />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">CNN Output Size Formula</span>
          <div className="text-xl font-mono font-bold mt-1 text-amber-300">O = ⌊(W − F + 2P) / S⌋ + 1</div>
        </div>
        <div className="text-xs text-blue-200 space-y-1">
          <div><strong>W:</strong> Input Width/Height | <strong>F:</strong> Filter/Kernel Size</div>
          <div><strong>P:</strong> Padding | <strong>S:</strong> Stride</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SectionCard>
          <h3 className="font-semibold text-sm text-white">Convolution Parameters</h3>
          <div className="space-y-3">
            <Slider label="Input Size (W)"  val={W} set={setW} min={8}  max={64} />
            <Slider label="Kernel Size (F)" val={F} set={setF} min={1}  max={11} step={2} />
            <Slider label="Padding (P)"     val={P} set={setP} min={0}  max={5}  />
            <Slider label="Stride (S)"      val={S} set={setS} min={1}  max={4}  />
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="font-semibold text-sm text-indigo-400">Step-by-Step Calculation</h4>
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${valid ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              {valid ? 'Valid Grid Fit' : 'Fractional Stride'}
            </span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
            <p className="text-slate-400">O = floor(({W} - {F} + 2·{P}) / {S}) + 1</p>
            <p className={`font-bold text-base ${O > 0 ? 'text-emerald-400' : 'text-red-400'}`}>Output: {O > 0 ? `${O} × ${O}` : 'Invalid'}</p>
          </div>

          <div className="flex items-center justify-center gap-8 p-5 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-center">
              <div className="bg-blue-600/30 border-2 border-blue-500 rounded flex items-center justify-center font-mono text-xs font-bold text-white transition-all mx-auto"
                style={{ width: `${inputPx}px`, height: `${inputPx}px` }}>{W}×{W}</div>
              <span className="text-[10px] text-slate-500 mt-1.5 block">Input W</span>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 shrink-0" />
            <div className="text-center">
              <div className="bg-emerald-600/30 border-2 border-emerald-500 rounded flex items-center justify-center font-mono text-xs font-bold text-white transition-all mx-auto"
                style={{ width: `${outputPx}px`, height: `${outputPx}px` }}>{O > 0 ? `${O}×${O}` : '?'}</div>
              <span className="text-[10px] text-slate-500 mt-1.5 block">Output O</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 border-t border-slate-800 pt-2">
            *Output must be integer &gt; 0. Non-integer stride ratios cause spatial clipping.
          </p>
        </SectionCard>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Flashcard Modal
// ─────────────────────────────────────────────
const FlashcardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [idx,     setIdx]     = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = FLASHCARDS[idx];

  const go = (dir: number) => {
    setFlipped(false);
    setTimeout(() => setIdx(i => (i + dir + FLASHCARDS.length) % FLASHCARDS.length), 150);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-800 space-y-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" /> Concept Flashcards
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {/* Flip card */}
        <div className="relative h-56 cursor-pointer select-none" style={{ perspective: '1000px' }} onClick={() => setFlipped(f => !f)}>
          <div className="absolute inset-0 transition-all duration-500" style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            {/* Front */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl p-6 flex flex-col justify-between"
              style={{ backfaceVisibility: 'hidden' }}>
              <span className="text-xs uppercase tracking-wider opacity-80 font-semibold">{card.category}</span>
              <p className="text-base font-medium text-center leading-relaxed">{card.q}</p>
              <span className="text-xs text-center opacity-70">Click to reveal answer 🔄</span>
            </div>
            {/* Back */}
            <div className="absolute inset-0 bg-slate-900 text-slate-100 rounded-xl p-6 flex flex-col justify-between border border-slate-700"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">Answer</span>
              <p className="text-sm leading-relaxed text-center">{card.a}</p>
              <span className="text-xs text-center text-slate-500">Click to flip back 🔄</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => go(-1)} className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-700 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="text-xs font-semibold text-slate-500">{idx + 1} / {FLASHCARDS.length}</span>
          <button onClick={() => go(1)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 flex items-center gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Quiz Modal
// ─────────────────────────────────────────────
const QuizModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [answers,  setAnswers]  = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score    = QUIZ_QUESTIONS.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const allDone  = Object.keys(answers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> Week 1 Mastery Knowledge Check
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, qi) => (
              <div key={qi} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <p className="font-medium text-sm text-white">{q.q}</p>
                <div className="space-y-1.5">
                  {q.options.map((opt, oi) => (
                    <label key={oi} className="flex items-center gap-2 text-xs p-2 rounded-lg hover:bg-slate-800 cursor-pointer">
                      <input type="radio" name={`q${qi}`} value={oi} checked={answers[qi] === oi}
                        onChange={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                        className="accent-indigo-500" />
                      <span className="text-slate-300">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              disabled={!allDone}
              onClick={() => setSubmitted(true)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${allDone ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>
              Submit Assessment
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <Trophy className="w-12 h-12 text-amber-400 mx-auto" />
            <h4 className="text-2xl font-extrabold text-white">{score}/{QUIZ_QUESTIONS.length}</h4>
            <p className="text-slate-300 text-sm">{score === QUIZ_QUESTIONS.length ? '🎉 Perfect Score!' : score >= 3 ? '✅ Great Work!' : '📚 Keep Reviewing!'}</p>
            <p className="text-xs text-slate-500">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}% correct</p>
            <button onClick={() => { setAnswers({}); setSubmitted(false); }}
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition flex items-center gap-2 mx-auto">
              <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export const Week1AIBasics: React.FC = () => {
  const [activeStep,     setActiveStep]     = useState<StepId>(1);
  const [completedSteps, setCompletedSteps] = useState<StepId[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED) || '[]'); } catch { return []; }
  });
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showQuiz,       setShowQuiz]       = useState(false);
  const [showNotes,      setShowNotes]      = useState(false);
  const [notes,          setNotes]          = useState(() => localStorage.getItem(STORAGE_KEY_NOTES) || '');
  const [toast,          setToast]          = useState<string | null>(null);

  const pct = Math.round((completedSteps.length / STEPS.length) * 100);

  const toggleComplete = (stepId: StepId) => {
    setCompletedSteps(prev => {
      const next = prev.includes(stepId) ? prev.filter(s => s !== stepId) : [...prev, stepId];
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(next));
      showToast(prev.includes(stepId) ? `Step ${stepId} reset.` : `Step ${stepId} marked complete! ✅`);
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const saveNotes = (val: string) => {
    setNotes(val);
    localStorage.setItem(STORAGE_KEY_NOTES, val);
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    localStorage.removeItem(STORAGE_KEY_COMPLETED);
    showToast('All progress reset.');
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      case 5: return <Step5 />;
      case 6: return <Step6 />;
    }
  };

  const STEP_COLORS: Record<StepId, string> = {
    1: 'bg-indigo-600', 2: 'bg-emerald-600', 3: 'bg-amber-600',
    4: 'bg-purple-600', 5: 'bg-rose-600',    6: 'bg-blue-600',
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Flashcards */}
      {showFlashcards && <FlashcardModal onClose={() => setShowFlashcards(false)} />}
      {showQuiz       && <QuizModal      onClose={() => setShowQuiz(false)} />}

      {/* Top banner — same gradient pattern as ClassTab/MyLearningTab */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Week 01</span>
            <span className="text-xs text-slate-400">Machine Learning & AI Basics</span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">Interactive Self-Study Hub</h3>
          <p className="text-xs text-slate-400">6-step curriculum with live calculators, visualizations &amp; assessments</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/60">
            <span className="text-xs text-slate-400 font-medium">Progress:</span>
            <div className="w-24 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-bold text-indigo-400">{pct}%</span>
          </div>
          <button onClick={resetProgress} title="Reset all step progress"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Sidebar nav */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">6-Step Curriculum</p>
            <nav className="space-y-1">
              {STEPS.map(s => {
                const Icon = s.icon;
                const isActive    = activeStep === s.id;
                const isCompleted = completedSteps.includes(s.id);
                return (
                  <button key={s.id} onClick={() => setActiveStep(s.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-[11px] font-semibold transition-all text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}>
                    <div className="flex items-center gap-2 truncate">
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{s.title}</span>
                    </div>
                    {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Study extras — matches sidebar card gradient from other tabs */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-indigo-950/40 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">Study Hub Extras</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setShowFlashcards(true)}
                className="flex items-center gap-1.5 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-xs text-slate-200">
                <CreditCard className="w-3.5 h-3.5 text-indigo-300" /> Flashcards
              </button>
              <button onClick={() => setShowQuiz(true)}
                className="flex items-center gap-1.5 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-xs text-slate-200">
                <Award className="w-3.5 h-3.5 text-amber-300" /> Final Test
              </button>
            </div>
            <button onClick={() => setShowNotes(n => !n)}
              className="w-full flex items-center justify-between p-2 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-lg transition text-xs font-medium text-indigo-100">
              <span className="flex items-center gap-1.5"><NotebookPen className="w-3.5 h-3.5" /> My Study Notes</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showNotes ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </aside>

        {/* Main workspace */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Notes panel — same amber accent pattern used in MyLearningTab */}
          {showNotes && (
            <div className="rounded-2xl p-4 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/10 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-amber-300 flex items-center gap-2 text-sm">
                  <NotebookPen className="w-4 h-4 text-amber-400" />
                  Personal Notes &amp; Reflection
                </h3>
                <span className="text-[11px] text-slate-500">Auto-saved to browser storage</span>
              </div>
              <textarea value={notes} onChange={e => saveNotes(e.target.value)}
                className="w-full h-28 p-3 text-xs rounded-xl border border-slate-700 bg-slate-950/80 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none resize-none transition-all"
                placeholder="Write down key insights, equations, or questions for revision..." />
            </div>
          )}

          {/* Step content card */}
          <div className="rounded-2xl border border-slate-800 shadow-md overflow-hidden">
            {/* Card header with gradient */}
            <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border-b border-slate-800 flex items-center gap-3">
              <StepBadge step={activeStep} color={STEP_COLORS[activeStep]} />
              <h2 className="text-xl font-bold text-white tracking-tight">
                {STEPS.find(s => s.id === activeStep)?.title.replace(/^Step \d+: /, '')}
              </h2>
            </div>
            {/* Step body */}
            <div className="p-5 bg-slate-950/30">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
