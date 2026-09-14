import React, { useState } from 'react';
import { Brain, CheckCircle, Sparkles, HelpCircle, FileText, LayoutGrid, StretchHorizontal } from 'lucide-react';

export interface ModuleSidebarItem {
  id: number | string;
  title: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isDone?: boolean;
}

export interface ToolSidebarItem {
  id: string;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  isActive?: boolean;
  onClick: () => void;
}

export const resolveToolItem = (extra: ToolSidebarItem) => {
  const idLower = extra.id.toLowerCase();
  const titleLower = (extra.title || '').toLowerCase();
  let resolvedIcon = extra.icon;
  let resolvedTitle = extra.title;

  if (idLower.includes('flashcard') || titleLower.includes('flashcard')) {
    resolvedIcon = Sparkles;
    resolvedTitle = 'Flashcards';
  } else if (idLower.includes('quiz') || titleLower.includes('quiz')) {
    resolvedIcon = HelpCircle;
    resolvedTitle = 'Practice Quizzes';
  } else if (idLower.includes('solution') || titleLower.includes('solution')) {
    resolvedIcon = HelpCircle; // Hardcoded same icon as quizzes
    resolvedTitle = 'Full Solution Guide';
  } else if (idLower.includes('document') || titleLower.includes('document')) {
    resolvedIcon = resolvedIcon || FileText;
    resolvedTitle = extra.title || 'Documents';
  }

  return {
    ...extra,
    icon: resolvedIcon || FileText,
    title: resolvedTitle
  };
};

// Backward compatibility type aliases
export type WeeklySidebarModuleItem = ModuleSidebarItem;
export type WeeklySidebarToolItem = ToolSidebarItem;

export interface ModuleAndToolSidebarProps {
  modules: ModuleSidebarItem[];
  activeModuleId?: number | string;
  onSelectModule: (id: any) => void;
  completedCount?: number;
  totalCount?: number;

  // Tools configuration
  tools?: ToolSidebarItem[];

  // Reading / Progress card configuration
  showReadingProgress?: boolean;
  activeModuleBadge?: string;
  currentModuleIndex?: number;
  totalModulesCount?: number;
  className?: string;
}

export type WeeklySidebarProps = ModuleAndToolSidebarProps;

export const ModuleAndToolSidebar: React.FC<ModuleAndToolSidebarProps> = ({
  modules,
  activeModuleId,
  onSelectModule,
  completedCount,
  totalCount,
  tools = [],
  showReadingProgress = true,
  activeModuleBadge,
  currentModuleIndex,
  totalModulesCount,
  className = '',
}) => {
  const [mobileLayoutMode, setMobileLayoutMode] = useState<'tiles' | 'pills'>('tiles');
  const resolvedTotal = totalCount ?? modules.length;
  const resolvedDone = completedCount ?? modules.filter((m) => m.isDone).length;

  // Calculate index for Reading Mode
  const isModuleActive = Boolean(activeModuleId);
  const activeIdx =
    currentModuleIndex ??
    (typeof activeModuleId === 'number'
      ? activeModuleId
      : modules.findIndex((m) => m.id === activeModuleId) + 1);
  const totalSteps = totalModulesCount ?? resolvedTotal;
  const progressPercent =
    totalSteps > 0 && isModuleActive ? Math.min(100, Math.max(0, (activeIdx / totalSteps) * 100)) : 0;

  const activeItem = modules.find((m) => m.id === activeModuleId) || modules[0];
  const badgeLabel = activeModuleBadge ?? activeItem?.badge ?? (isModuleActive ? `Module ${activeIdx}` : '');


  return (
    <>
      {/* Mobile / Foldable Navigation (lg:hidden) */}
      <div className={`lg:hidden w-full space-y-3 ${className}`}>
        {/* Mobile Header: Curriculum count & view toggle */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Curriculum Modules
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
              {resolvedDone}/{resolvedTotal} Done
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setMobileLayoutMode('tiles')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition ${
                mobileLayoutMode === 'tiles'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Tiles View (Optimized for Pixel Fold & Mobile)"
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Tiles</span>
            </button>
            <button
              onClick={() => setMobileLayoutMode('pills')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition ${
                mobileLayoutMode === 'pills'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Compact Horizontal Tabs"
            >
              <StretchHorizontal className="w-3 h-3" />
              <span>Tabs</span>
            </button>
          </div>
        </div>

        {/* 1. Tiles Layout (Default for Pixel Fold and Mobile Touch) */}
        {mobileLayoutMode === 'tiles' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {modules.map((m, idx) => {
              const Icon = m.icon || Brain;
              const isActive = activeModuleId === m.id;
              const isDone = m.isDone;
              const displayNum = typeof m.id === 'number' ? m.id : idx + 1;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className={`flex flex-col justify-between p-2.5 rounded-xl text-left transition-all border relative overflow-hidden group active:scale-[0.98] ${
                    isActive
                      ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white border-indigo-500 shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/50'
                      : 'bg-slate-900/90 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight ${
                        isActive
                          ? 'bg-indigo-500/40 text-indigo-200 border border-indigo-400/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Mod {displayNum}
                    </span>
                    <div className="flex items-center gap-1">
                      {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-300' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  <div className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-200'}`}>
                    {m.title}
                  </div>

                  {m.badge && (
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1.5 font-mono truncate">
                      {m.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* 2. Compact Horizontal Tab Pills Layout */
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {modules.map((m, idx) => {
              const Icon = m.icon || Brain;
              const isActive = activeModuleId === m.id;
              const isDone = m.isDone;
              const displayNum = typeof m.id === 'number' ? m.id : idx + 1;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectModule(m.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>Mod {displayNum}</span>
                  {isDone && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile Interactive Tools Tiles */}
        {tools && tools.length > 0 && (
          <div className="pt-1 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Interactive Tools &amp; Labs
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tools.map((rawTool) => {
                const extra = resolveToolItem(rawTool);
                const Icon = extra.icon;
                return (
                  <button
                    key={extra.id}
                    onClick={extra.onClick}
                    className={`flex items-center justify-between p-2 rounded-xl transition text-xs font-medium border active:scale-95 ${
                      extra.isActive
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-100 font-semibold shadow-sm'
                        : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{extra.title}</span>
                    </div>
                    {extra.badge && (
                      <span className="text-[9px] text-slate-400 font-mono px-1 py-0.5 rounded bg-slate-800 shrink-0">
                        {extra.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar (hidden on mobile, lg:block) */}
      <aside className={`hidden lg:block w-72 flex-shrink-0 space-y-3 sticky top-4 ${className}`}>
        {/* 1. Modules Card */}
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
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {displayIndex}
                    </span>
                    <span className="truncate">{m.title}</span>
                  </div>
                  {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
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
              <span className="font-semibold text-xs">Interactive Labs &amp; Tools</span>
            </div>
            <nav className="space-y-1">
              {tools.map((rawTool) => {
                const extra = resolveToolItem(rawTool);
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

        {/* 3. Quick Reading Mode Progress Card */}
        {showReadingProgress && isModuleActive && (
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
              <span>
                Module {activeIdx} of {totalSteps}
              </span>
              <span className="text-slate-300 font-medium truncate max-w-[140px] text-right">
                {badgeLabel}
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

// Backward compatible export
export const WeeklySidebar = ModuleAndToolSidebar;
