import React, { useState } from 'react';
import { BookOpen, Grid } from 'lucide-react';
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
