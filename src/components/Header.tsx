import React from 'react';
import { 
  GraduationCap, 
  Menu
} from 'lucide-react';

interface HeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onReset?: () => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand and Degree Title + Mobile Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/60 active:scale-95 transition-all flex items-center justify-center shrink-0"
              aria-label="Open course navigation"
              title="Courses & Semesters Navigation"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            </button>
          )}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold ring-2 ring-indigo-400/30 shrink-0">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                MSAI Learning Hub
              </h1>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                SJSU
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-400">Master of Science in Artificial Intelligence</p>
          </div>
        </div>

      </div>
    </header>
  );
};