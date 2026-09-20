import React from 'react';
import { Cpu, Layers } from 'lucide-react';

export const Module4ImportantCNNArchitectures: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span>Module 4: Important CNN architectures</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Historical breakthroughs: LeNet-5, AlexNet, VGG-16, GoogLeNet inception modules, and ResNet residual skip connections.
        </p>
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Ready to receive lesson materials, interactive calculators, and visual demonstrations.</span>
        </div>
      </div>
    </div>
  );
};
