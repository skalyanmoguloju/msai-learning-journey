import React from 'react';
import { Brain, CheckCircle, Sparkles } from 'lucide-react';

export interface WeeklySidebarModuleItem {
  id: number | string;
  title: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isDone?: boolean;
}

export interface WeeklySidebarToolItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isActive?: boolean;
  onClick: () => void;
}

export interface WeeklySidebarProps {
  modules: WeeklySidebarModuleItem[];
  activeModuleId: number | string;
  onSelectModule: (id: any) => void;
  completedCount?: number;
  totalCount?: number;
  tools?: WeeklySidebarToolItem[];
  toolsTitle?: string;
  activeModuleBadge?: string;
  currentModuleIndex?: number;
  totalModulesCount?: number;
}

export const WeeklySidebar: React.FC<WeeklySidebarProps> = ({
  modules,
  activeModuleId,
  onSelectModule,
  completedCount,
  totalCount,
  tools = [],
  toolsTitle = 'Interactive Labs & Tools',
  activeModuleBadge,
  currentModuleIndex,
  totalModulesCount
}) => {
  const resolvedTotal = totalCount ?? modules.length;
  const resolvedDone = completedCount ?? modules.filter(m => m.isDone).length;
  
  // Calculate index for Reading Mode
  const activeIdx = currentModuleIndex ?? (
    typeof activeModuleId === 'number'
      ? activeModuleId
      : modules.findIndex(m => m.id === activeModuleId) + 1
  );
  const totalSteps = totalModulesCount ?? resolvedTotal;
  const progressPercent = totalSteps > 0 ? Math.min(100, Math.max(0, (activeIdx / totalSteps) * 100)) : 0;

  const activeItem = modules.find(m => m.id === activeModuleId) || modules[0];
  const badgeLabel = activeModuleBadge ?? activeItem?.badge ?? `Module ${activeIdx}`;

  return (
    <>
      {/* Mobile Horizontal Navigation (lg:hidden) */}
      <div className="lg:hidden w-full space-y-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {modules.map((m, idx) => {
            const Icon = m.icon || Brain;
            const isActive = activeModuleId === m.id;
            const isDone = m.isDone;
            return (
              <button
                key={m.id}
                onClick={() => onSelectModule(m.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>Module {typeof m.id === 'number' ? m.id : idx + 1}</span>
                {isDone && <CheckCircle className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Mobile Interactive Tools */}
        {tools && tools.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {tools.map((extra) => {
              const Icon = extra.icon;
              return (
                <button
                  key={extra.id}
                  onClick={extra.onClick}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition text-xs font-medium shrink-0 border active:scale-95 ${
                    extra.isActive
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                      : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{extra.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar (hidden on mobile, lg:block) */}
      <aside className="hidden lg:block w-72 flex-shrink-0 space-y-3 sticky top-4">
        {/* 1. Curriculum Modules Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Curriculum Modules
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              {resolvedDone}/{resolvedTotal} Done
            </span>
          </div>

          <nav className="space-y-1.5">
            {modules.map((m, idx) => {
              const Icon = m.icon || Brain;
              const isActive = activeModuleId === m.id;
              const isDone = m.isDone;
              const displayIndex = typeof m.id === 'number' ? m.id : idx + 1;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">Module {displayIndex}: {m.title}</span>
                  </div>
                  {isDone && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 2. Interactive Labs & Study Tools Card */}
        {tools && tools.length > 0 && (
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-indigo-950/40 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-2.5">
            <div className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-xs">{toolsTitle}</span>
            </div>
            <nav className="space-y-1">
              {tools.map((extra) => {
                const Icon = extra.icon;
                return (
                  <button
                    key={extra.id}
                    onClick={extra.onClick}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all text-left ${
                      extra.isActive
                        ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-100 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{extra.title}</span>
                    </div>
                    {extra.badge && (
                      <span className="text-[10px] text-slate-400 font-mono px-1.5 py-0.5 rounded bg-slate-800/60">
                        {extra.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* 3. Quick Reading Mode Info Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-indigo-950/40 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Quick Reading Mode</span>
            <span className="font-bold text-indigo-400">Active</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
            <span>Module {activeIdx} of {totalSteps}</span>
            <span className="text-slate-300 font-medium truncate max-w-[140px] text-right">{badgeLabel}</span>
          </div>
        </div>
      </aside>
    </>
  );
};
