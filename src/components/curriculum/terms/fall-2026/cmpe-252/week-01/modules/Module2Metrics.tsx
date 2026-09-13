import React, { useState, useMemo } from 'react';
import { BookOpen, Grid, TrendingUp, Sliders, Sparkles, Activity } from 'lucide-react';
import { MathText } from '../../../../../common';

export const Module2Metrics: React.FC = () => {
  const [cmTP, setCmTP] = useState(45);
  const [cmFP, setCmFP] = useState(10);
  const [cmFN, setCmFN] = useState(5);
  const [cmTN, setCmTN] = useState(140);

  const cmTotal = cmTP + cmFP + cmFN + cmTN || 1;
  const cmAcc = (cmTP + cmTN) / cmTotal;
  const cmPrec = cmTP + cmFP > 0 ? cmTP / (cmTP + cmFP) : 0;
  const cmRec = cmTP + cmFN > 0 ? cmTP / (cmTP + cmFN) : 0;
  const cmF1 = cmPrec + cmRec > 0 ? (2 * cmPrec * cmRec) / (cmPrec + cmRec) : 0;

  // ROC Curve & AUC threshold simulation state
  const [rocThreshold, setRocThreshold] = useState<number>(0.50);

  // Model ROC curve parametrization (simulating a high-performing model with AUC ≈ 0.91)
  const rocPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60; // 0 to 1
      const fpr = Math.pow(t, 2.8);
      const tpr = Math.pow(t, 0.28);
      pts.push({ x: fpr, y: tpr });
    }
    return pts;
  }, []);

  const rocPath = useMemo(() => {
    return rocPoints.reduce((acc, pt, idx) => {
      const px = 45 + pt.x * 250;
      const py = 275 - pt.y * 250;
      return idx === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)}` : `${acc} L ${px.toFixed(1)} ${py.toFixed(1)}`;
    }, '');
  }, [rocPoints]);

  const rocAreaPath = useMemo(() => {
    const start = `M 45 275`;
    const curve = rocPoints.map(pt => `L ${(45 + pt.x * 250).toFixed(1)} ${(275 - pt.y * 250).toFixed(1)}`).join(' ');
    const close = `L 295 275 Z`;
    return `${start} ${curve} ${close}`;
  }, [rocPoints]);

  // Current operating point at given threshold
  const curFpr = useMemo(() => Math.max(0, Math.min(1, Math.pow(1 - rocThreshold, 2.8))), [rocThreshold]);
  const curTpr = useMemo(() => Math.max(0, Math.min(1, Math.pow(1 - rocThreshold, 0.28))), [rocThreshold]);
  const curPx = 45 + curFpr * 250;
  const curPy = 275 - curTpr * 250;

  return (
    <div className="space-y-6">
      {/* Key Classification Definitions Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" /> Classification Terms &amp; Definitions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-slate-900 border border-emerald-900/50 rounded-xl space-y-1">
            <span className="font-bold text-emerald-400">True Positive (TP)</span>
            <p className="text-slate-300 text-[11px]">
              <strong>Definition:</strong> Cases where the ground truth is positive and the model correctly predicted positive (e.g. Sick patient correctly flagged as sick).
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 border border-amber-900/50 rounded-xl space-y-1">
            <span className="font-bold text-amber-400">False Negative (FN)</span>
            <p className="text-slate-300 text-[11px]">
              <strong>Definition:</strong> Type II Error. Cases where the actual class is positive, but the model incorrectly predicted negative (e.g. Sick patient missed and marked healthy).
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 border border-rose-900/50 rounded-xl space-y-1">
            <span className="font-bold text-rose-400">False Positive (FP)</span>
            <p className="text-slate-300 text-[11px]">
              <strong>Definition:</strong> Type I Error. Cases where the actual class is negative, but the model falsely predicted positive (e.g. Healthy patient misdiagnosed with disease).
            </p>
          </div>
          <div className="p-3.5 bg-slate-900 border border-sky-900/50 rounded-xl space-y-1">
            <span className="font-bold text-sky-400">True Negative (TN)</span>
            <p className="text-slate-300 text-[11px]">
              <strong>Definition:</strong> Cases where the ground truth is negative and the model correctly predicted negative (e.g. Healthy patient correctly flagged healthy).
            </p>
          </div>
        </div>
      </div>

      {/* Formula Definitions Table */}
      <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
        <div className="font-sans font-bold text-sky-400 text-sm">
          Classification Performance Formulas &amp; Meanings
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-sky-300 font-bold block">
              <MathText text="$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{Total}}$" />
            </span>
            <p className="font-sans text-[11px] text-slate-400">
              Proportion of all correct predictions. Can be highly misleading on imbalanced datasets!
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-emerald-300 font-bold block">
              <MathText text="$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$" />
            </span>
            <p className="font-sans text-[11px] text-slate-400">
              Positive Predictive Value. Out of all positive predictions, how many were actually correct?
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-amber-300 font-bold block">
              <MathText text="$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}$" />
            </span>
            <p className="font-sans text-[11px] text-slate-400">
              True Positive Rate (Sensitivity). Out of all actual positive cases, how many did the model catch?
            </p>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <span className="text-purple-300 font-bold block">
              <MathText text="$\text{F1} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$" />
            </span>
            <p className="font-sans text-[11px] text-slate-400">
              Harmonic mean balancing Precision and Recall into a single metric for imbalanced data.
            </p>
          </div>
        </div>
      </div>

      {/* ROC Curve & AUC: Evaluating Across All Thresholds */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
              ROC Curve &amp; AUC: Evaluating Across All Thresholds 📈
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            Threshold Independence
          </span>
        </div>

        {/* Motivational Context */}
        <div className="p-3.5 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 rounded-xl border border-indigo-500/30 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong className="text-indigo-300 font-semibold">Decision Threshold Concept:</strong>{' '}
            Most classifiers output a probability score between <MathText text="$0$" /> and <MathText text="$1$" />. By default, if the probability is <MathText text="$\ge 0.5$" />, we classify it as positive. But what if we change that threshold to <MathText text="$0.2$" /> or <MathText text="$0.8$" />?
          </p>
        </div>

        {/* Core Definitions Grid: ROC Curve & AUC */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          {/* ROC Curve Definition Card */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>ROC Curve (Receiver Operating Characteristic)</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong>Definition:</strong> A graph that plots the <strong>True Positive Rate (Recall)</strong> on the y-axis against the <strong>False Positive Rate (FPR)</strong> on the x-axis across every possible decision threshold.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80">
                <span className="text-[11px] text-emerald-400 font-bold block mb-0.5">True Positive Rate (TPR / Recall / Sensitivity):</span>
                <span className="font-mono text-xs text-slate-200 block">
                  <MathText text="$\text{True Positive Rate (TPR)} = \frac{\text{TP}}{\text{TP} + \text{FN}}$" />
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Proportion of actual positive cases that were correctly caught.
                </span>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80">
                <span className="text-[11px] text-rose-400 font-bold block mb-0.5">False Positive Rate (FPR / Fall-out):</span>
                <span className="font-mono text-xs text-slate-200 block">
                  <MathText text="$\text{False Positive Rate (FPR)} = \frac{\text{FP}}{\text{TN} + \text{FP}}$" />
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Proportion of actual negative cases that were falsely flagged as positive.
                </span>
              </div>
            </div>
          </div>

          {/* AUC Definition Card */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-amber-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AUC (Area Under the Curve)</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                <strong>Definition:</strong> The single number measuring the total 2D area underneath the entire ROC curve, ranging from <MathText text="$0$" /> to <MathText text="$1$" />:
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-emerald-500/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-400 text-xs">
                    <MathText text="$\text{AUC} = 1.0$" />
                  </span>
                  <span className="text-xs">🌟</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong>A perfect model with no mistakes 🌟:</strong> Reaches 100% TPR at 0% FPR. Separates positive and negative instances completely with zero overlap.
                </p>
              </div>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-amber-500/20 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400 text-xs">
                    <MathText text="$\text{AUC} = 0.5$" />
                  </span>
                  <span className="text-xs">🎲</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  <strong>A model that is completely guessing randomly 🎲:</strong> Represented by the diagonal dashed line on the plot. Has zero discriminative ability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive ROC Curve & Threshold Exploration Lab */}
        <div className="p-4 sm:p-5 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Interactive ROC Operating Point &amp; Threshold Simulator
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Slide the classification threshold <MathText text="$\tau$" /> to see how operating points move along the ROC curve.
              </p>
            </div>

            {/* Threshold Quick Presets */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 text-[10px]">Presets:</span>
              <button
                onClick={() => setRocThreshold(0.20)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${rocThreshold === 0.20
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                title="Low threshold = High Recall"
              >
                τ = 0.2 (High Recall)
              </button>
              <button
                onClick={() => setRocThreshold(0.50)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${rocThreshold === 0.50
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                title="Default threshold = Balanced"
              >
                τ = 0.5 (Default)
              </button>
              <button
                onClick={() => setRocThreshold(0.80)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition ${rocThreshold === 0.80
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                title="High threshold = High Precision"
              >
                τ = 0.8 (High Precision)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG ROC Plot */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-[320px] aspect-square bg-slate-900/90 rounded-2xl border border-slate-800/80 p-2 shadow-inner">
                <svg viewBox="0 0 320 320" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="rocAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <line x1="45" y1="212.5" x2="295" y2="212.5" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="45" y1="150" x2="295" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="45" y1="87.5" x2="295" y2="87.5" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="107.5" y1="25" x2="107.5" y2="275" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="170" y1="25" x2="170" y2="275" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="232.5" y1="25" x2="232.5" y2="275" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Axes */}
                  <line x1="45" y1="275" x2="295" y2="275" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="45" y1="25" x2="45" y2="275" stroke="#94a3b8" strokeWidth="1.5" />

                  {/* Shaded Area Under Curve (AUC) */}
                  <path d={rocAreaPath} fill="url(#rocAreaGrad)" />

                  {/* Random Guess Diagonal (AUC = 0.5) */}
                  <line x1="45" y1="275" x2="295" y2="25" stroke="#64748b" strokeWidth="1.5" strokeDasharray="5 4" />

                  {/* ROC Curve */}
                  <path d={rocPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Droplines for operating point */}
                  <line x1={curPx} y1={curPy} x2={curPx} y2="275" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                  <line x1="45" y1={curPy} x2={curPx} y2={curPy} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />

                  {/* Current Operating Point Circle */}
                  <circle cx={curPx} cy={curPy} r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" className="animate-pulse" />
                  <circle cx={curPx} cy={curPy} r="2" fill="#ffffff" />

                  {/* Axis numerical tick labels */}
                  <text x="45" y="292" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">0.0</text>
                  <text x="170" y="292" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">0.5</text>
                  <text x="295" y="292" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">1.0</text>

                  <text x="35" y="278" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">0.0</text>
                  <text x="35" y="153" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">0.5</text>
                  <text x="35" y="28" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">1.0</text>

                  {/* Axis Title Labels */}
                  <text x="170" y="312" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                    False Positive Rate (FPR)
                  </text>
                  <text x="-150" y="14" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold" transform="rotate(-90)">
                    True Positive Rate (TPR / Recall)
                  </text>

                  {/* Chart Annotations */}
                  <text x="220" y="170" fill="#94a3b8" fontSize="9" opacity="0.8" fontStyle="italic">Random (AUC=0.5 🎲)</text>
                  <text x="110" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold">Model (AUC ≈ 0.91 🌟)</text>
                </svg>
              </div>
            </div>

            {/* Threshold Controls & Dynamic Metrics Readout */}
            <div className="md:col-span-6 space-y-4">
              {/* Threshold Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">
                    Decision Threshold (<MathText text="$\tau$" />):
                  </span>
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 text-xs">
                    {rocThreshold.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.95"
                  step="0.01"
                  value={rocThreshold}
                  onChange={(e) => setRocThreshold(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0.05 (Flag Almost All Positive)</span>
                  <span>0.95 (Flag Only Extreme Certainty)</span>
                </div>
              </div>

              {/* Dynamic Metrics Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 rounded-xl border border-emerald-900/50 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-sans font-medium">True Positive Rate (TPR)</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-400 block">
                    {(curTpr * 100).toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans block">Recall / Sensitivity</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/50 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-sans font-medium">False Positive Rate (FPR)</span>
                  <span className="text-base sm:text-lg font-bold text-rose-400 block">
                    {(curFpr * 100).toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans block">Fall-out (False Alarms)</span>
                </div>
              </div>

              {/* Dynamic Operational Interpretation */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                {rocThreshold < 0.35 ? (
                  <p>
                    🏥 <strong className="text-amber-400">High-Recall / Medical Mode (τ = {rocThreshold.toFixed(2)}):</strong>{' '}
                    Catches <strong className="text-emerald-300">{(curTpr * 100).toFixed(1)}%</strong> of positives! However, False Positive rate increases to <strong className="text-rose-300">{(curFpr * 100).toFixed(1)}%</strong>. Ideal when missing a sick patient (False Negative) is unacceptable.
                  </p>
                ) : rocThreshold > 0.65 ? (
                  <p>
                    🛡️ <strong className="text-emerald-400">High-Precision / Spam Filter Mode (τ = {rocThreshold.toFixed(2)}):</strong>{' '}
                    Suppresses false alarms down to <strong className="text-rose-300">{(curFpr * 100).toFixed(1)}%</strong>. However, sensitivity drops to <strong className="text-amber-300">{(curTpr * 100).toFixed(1)}%</strong>. Ideal when flagging an innocent email as spam (False Positive) is costly.
                  </p>
                ) : (
                  <p>
                    ⚖️ <strong className="text-indigo-400">Balanced Operating Point (τ = {rocThreshold.toFixed(2)}):</strong>{' '}
                    Default balanced threshold. Catches <strong className="text-emerald-300">{(curTpr * 100).toFixed(1)}%</strong> of positive events with <strong className="text-slate-300">{(curFpr * 100).toFixed(1)}%</strong> false alarms.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confusion Matrix Interactive Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
            <Grid className="w-4 h-4" /> Interactive Confusion Matrix &amp; Metrics Simulator
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Presets:</span>
            <button
              onClick={() => { setCmTP(45); setCmFP(10); setCmFN(5); setCmTN(140); }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-slate-200 font-medium"
            >
              Balanced
            </button>
            <button
              onClick={() => { setCmTP(90); setCmFP(50); setCmFN(10); setCmTN(850); }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-slate-200 font-medium"
            >
              Imbalanced (Spam)
            </button>
            <button
              onClick={() => { setCmTP(20); setCmFP(5); setCmFN(80); setCmTN(500); }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] font-medium text-amber-300"
            >
              High FN (Medical Risk)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2x2 Matrix Input Grid */}
          <div className="space-y-3">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide text-center">
              Actual vs Predicted Matrix
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 text-center space-y-1">
                <span className="text-emerald-300 text-[10px] block font-bold">True Positive (TP)</span>
                <input
                  type="number"
                  value={cmTP}
                  min={0}
                  onChange={e => setCmTP(Number(e.target.value) || 0)}
                  className="w-full bg-emerald-900/50 text-center font-bold text-white text-lg rounded-lg border border-emerald-700 p-1"
                />
                <span className="text-[10px] text-slate-400 block">Correctly identified positive</span>
              </div>
              <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-800 text-center space-y-1">
                <span className="text-amber-300 text-[10px] block font-bold">False Negative (FN)</span>
                <input
                  type="number"
                  value={cmFN}
                  min={0}
                  onChange={e => setCmFN(Number(e.target.value) || 0)}
                  className="w-full bg-amber-900/50 text-center font-bold text-white text-lg rounded-lg border border-amber-700 p-1"
                />
                <span className="text-[10px] text-slate-400 block">Type II Error (Missed)</span>
              </div>
              <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-800 text-center space-y-1">
                <span className="text-rose-300 text-[10px] block font-bold">False Positive (FP)</span>
                <input
                  type="number"
                  value={cmFP}
                  min={0}
                  onChange={e => setCmFP(Number(e.target.value) || 0)}
                  className="w-full bg-rose-900/50 text-center font-bold text-white text-lg rounded-lg border border-rose-700 p-1"
                />
                <span className="text-[10px] text-slate-400 block">Type I Error (False Alarm)</span>
              </div>
              <div className="bg-sky-950/60 p-3 rounded-xl border border-sky-800 text-center space-y-1">
                <span className="text-sky-300 text-[10px] block font-bold">True Negative (TN)</span>
                <input
                  type="number"
                  value={cmTN}
                  min={0}
                  onChange={e => setCmTN(Number(e.target.value) || 0)}
                  className="w-full bg-sky-900/50 text-center font-bold text-white text-lg rounded-lg border border-sky-700 p-1"
                />
                <span className="text-[10px] text-slate-400 block">Correctly identified negative</span>
              </div>
            </div>
          </div>

          {/* Calculated Metrics Dashboard */}
          <div className="space-y-3">
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide text-center">
              Calculated Metrics
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Accuracy</span>
                  <span className="text-sky-400 font-bold">{(cmAcc * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full transition-all" style={{ width: `${cmAcc * 100}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 font-sans"><MathText text="$\frac{\text{TP}+\text{TN}}{\text{Total}}$" /></p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Precision</span>
                  <span className="text-emerald-400 font-bold">{(cmPrec * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${cmPrec * 100}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 font-sans"><MathText text="$\frac{\text{TP}}{\text{TP}+\text{FP}}$ (Quality)" /></p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Recall</span>
                  <span className="text-amber-400 font-bold">{(cmRec * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${cmRec * 100}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 font-sans"><MathText text="$\frac{\text{TP}}{\text{TP}+\text{FN}}$ (Coverage)" /></p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>F1-Score</span>
                  <span className="text-purple-400 font-bold">{cmF1.toFixed(3)}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${cmF1 * 100}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 font-sans">Harmonic Mean</p>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
              {cmFN > cmTP * 2 ? (
                <span>⚠️ <strong className="text-amber-400">High False Negative Rate:</strong> Recall is low ({(cmRec * 100).toFixed(1)}%). Dangerous for medical diagnoses or critical security alerts.</span>
              ) : cmFP > cmTP * 2 ? (
                <span>⚠️ <strong className="text-rose-400">High False Positive Rate:</strong> Precision is low ({(cmPrec * 100).toFixed(1)}%). Causes user fatigue in spam filters or false alarms.</span>
              ) : (
                <span>✅ Balanced metrics. F1-Score ({cmF1.toFixed(3)}) reflects harmonic equilibrium.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Module2Metrics;
