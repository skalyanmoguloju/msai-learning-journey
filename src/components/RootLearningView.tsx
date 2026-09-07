import React, { useState } from 'react';
import {
  Calculator,
  Brain,
  ArrowRight
} from 'lucide-react';
import { FundamentalTopic, CustomUserNote } from '../types/course';
import { CalculusMasteryHub } from './calculus/CalculusMasteryHub';

interface RootLearningViewProps {
  fundamentals?: FundamentalTopic[];
  toggleFundamentalMastery?: (id: string) => void;
  customNotes?: CustomUserNote[];
  addCustomNote?: (note: Omit<CustomUserNote, 'id' | 'createdAt'>) => void;
  searchQuery?: string;
  onNavigateToWeek1?: () => void;
}

export const RootLearningView: React.FC<RootLearningViewProps> = ({ onNavigateToWeek1 }) => {
  const [activeSubtab, setActiveSubtab] = useState<string>('calculus-mastery');
  const [subtabs] = useState([
    { id: 'calculus-mastery', label: 'Calculus Mastery Hub', icon: Calculator },
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col gap-6 max-w-6xl mx-auto w-full">

      {/* Header Banner for Root My Learning */}
      <div className="rounded-2xl p-6 lg:p-7 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
              Foundational degree learning hubs, mathematical mastery, and core computational theory powering Machine Learning.
            </p>
          </div>

          {onNavigateToWeek1 && (
            <button
              onClick={onNavigateToWeek1}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all group shrink-0"
              title="Navigate to Week 1 of AI Course (CMPE-252)"
            >
              <Brain className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
              <span>Go to Week 1: AI Basics</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-200 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
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

      {/* Subtab Workspace Content */}
      <div className="flex-1 w-full">
        <CalculusMasteryHub onNavigateToWeek1={onNavigateToWeek1} />
      </div>

    </div>
  );
};