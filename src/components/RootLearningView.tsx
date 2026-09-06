import React, { useState } from 'react';
import {
  Calculator
} from 'lucide-react';
import { FundamentalTopic, CustomUserNote } from '../types/course';
import { CalculusMasteryHub } from './calculus/CalculusMasteryHub';

interface RootLearningViewProps {
  fundamentals?: FundamentalTopic[];
  toggleFundamentalMastery?: (id: string) => void;
  customNotes?: CustomUserNote[];
  addCustomNote?: (note: Omit<CustomUserNote, 'id' | 'createdAt'>) => void;
  searchQuery?: string;
}

export const RootLearningView: React.FC<RootLearningViewProps> = () => {
  const [activeSubtab, setActiveSubtab] = useState<string>('calculus-mastery');
  const [subtabs] = useState([
    { id: 'calculus-mastery', label: 'Calculus Mastery Hub', icon: Calculator },
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-6 max-w-6xl mx-auto w-full">

      {/* Header Banner for Root My Learning */}
      <div className="relative rounded-2xl p-6 lg:p-7 bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold border border-indigo-500/30 uppercase tracking-wider">
                Degree Foundation
              </span>
              <span className="text-xs text-slate-400">Root Knowledge Base</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              My Learning
            </h2>
            <p className="text-slate-400 text-xs max-w-xl">
              Foundational degree learning hubs, mathematical mastery, and core computational theory.
            </p>
          </div>
        </div>
      </div>

      {/* Subtabs Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1 overflow-x-auto">
        {subtabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubtab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubtab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${isActive
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtab Workspace Content - Clean & Empty */}
      <div className="flex-1 min-h-[420px] rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/30 flex flex-col items-center justify-center p-8 text-center transition-all">
        <div style={{ width: '100%' }}>
          <CalculusMasteryHub />
        </div>
      </div>

    </div>
  );
};