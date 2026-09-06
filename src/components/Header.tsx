import React from 'react';
import { 
  GraduationCap, 
  Brain, 
  BookOpen, 
  RotateCcw, 
  Award,
  Sparkles,
  Search
} from 'lucide-react';
import { ActiveView } from '../types/course';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  fundamentalsMasteredCount: number;
  totalFundamentals: number;
  currentSemesterName: string;
  totalCoursesCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  fundamentalsMasteredCount,
  totalFundamentals,
  currentSemesterName,
  totalCoursesCount,
  searchQuery,
  setSearchQuery,
  onReset,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand and Degree Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold ring-2 ring-indigo-400/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  MSAI Learning Hub
                </h1>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SJSU Graduate
                </span>
              </div>
              <p className="text-xs text-slate-400">Master of Science in Artificial Intelligence</p>
            </div>
          </div>

          {/* Mobile view switcher indicator */}
          <div className="flex md:hidden items-center gap-1.5 bg-slate-800/80 p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setActiveView('fundamentals')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'fundamentals'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Root Fundamentals"
            >
              <Brain className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveView('course')}
              className={`p-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'course'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Semesters & Courses"
            >
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Navigation: Root Fundamentals vs Semester Courses */}
        <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/70 shadow-inner">
          <button
            onClick={() => setActiveView('fundamentals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeView === 'fundamentals'
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Brain className="w-4 h-4 text-indigo-300" />
            <span>My Learning (Fundamentals)</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-200 border border-indigo-400/30">
              Root
            </span>
          </button>

          <button
            onClick={() => setActiveView('course')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              activeView === 'course'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-300" />
            <span>Semesters & Courses</span>
            <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-blue-900/60 text-blue-200 border border-blue-400/30">
              {currentSemesterName}
            </span>
          </button>
        </div>

        {/* Right Stats & Utility Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Quick Search */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Program Stats Pills */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>
                Fundamentals:{' '}
                <strong className="text-white">
                  {fundamentalsMasteredCount}/{totalFundamentals}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                Courses: <strong className="text-white">{totalCoursesCount}</strong>
              </span>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={onReset}
            title="Reset data to defaults"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};