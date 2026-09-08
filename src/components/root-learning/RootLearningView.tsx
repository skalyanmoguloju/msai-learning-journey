import React, { useState } from 'react';
import {
  Calculator,
  BarChart3,
  Grid3X3
} from 'lucide-react';
import { CalculusMasteryHub } from './calculus/CalculusMasteryHub';
import { StatisticsMasteryHub } from './statistics/StatisticsMasteryHub';
import { LinearAlgebraMasteryHub } from './linear-algebra/LinearAlgebraMasteryHub';
import { curriculumNavStore } from '../curriculum/navigationStore';

export const RootLearningView: React.FC = () => {
  const [activeSubtab, setActiveSubtabState] = useState<string>(() =>
    curriculumNavStore.getRootLearningTab()
  );

  const setActiveSubtab = (tabId: string) => {
    curriculumNavStore.setRootLearningTab(tabId);
    setActiveSubtabState(tabId);
  };
  const [subtabs] = useState([
    { id: 'calculus-mastery', label: 'Calculus Mastery Hub', icon: Calculator },
    { id: 'statistics-mastery', label: 'Statistics & Probability Hub', icon: BarChart3 },
    { id: 'linear-algebra-mastery', label: 'Linear Algebra Hub', icon: Grid3X3 },
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 lg:p-8 flex flex-col gap-4 sm:gap-6 max-w-6xl mx-auto w-full">

      {/* Subtabs Navigation Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-800 pb-1 overflow-x-auto no-scrollbar">
        {subtabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubtab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubtab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative shrink-0 ${isActive
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
        {activeSubtab === 'calculus-mastery' && <CalculusMasteryHub />}
        {activeSubtab === 'statistics-mastery' && <StatisticsMasteryHub />}
        {activeSubtab === 'linear-algebra-mastery' && <LinearAlgebraMasteryHub />}
      </div>

    </div>
  );
};