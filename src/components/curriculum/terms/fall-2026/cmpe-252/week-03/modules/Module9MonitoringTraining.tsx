import React from 'react';
import { BarChart2, Sparkles } from 'lucide-react';

export const Module9MonitoringTraining: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-400" />
          <span>Module 9: Monitoring neural-network training</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Content for this module will be added as we progress through Session 3.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Ready to receive lesson materials, interactive calculators, and visual demonstrations.</span>
        </div>
      </div>
    </div>
  );
};
