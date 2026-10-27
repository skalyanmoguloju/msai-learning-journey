import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  Layers,
  ShieldAlert,
  Flame,
  Check,
  GraduationCap,
  CalendarDays,
  Cpu
} from 'lucide-react';
import {
  AURORA_WEEKS,
  DECEMBER_AURORA_DELIVERABLES,
  SIX_HOUR_AURORA_WRITING_SCHEDULE,
  TOTAL_AURORA_SESSIONS_COUNT,
  AuroraWeek,
  AuroraSession,
} from '../../../data/auroraProjectData';

interface AuroraExecutionTrackerProps {
  onToggleCourseDeliverable?: (deliverableId: string) => void;
}

const STORAGE_KEY_ARRAY = 'aurora-plan';
const STORAGE_KEY_MAP = 'msai_aurora_plan_v1';

export const AuroraExecutionTracker: React.FC<AuroraExecutionTrackerProps> = ({
  onToggleCourseDeliverable,
}) => {
  // All 36 sessions flattened in order
  const allSessions: { session: AuroraSession; week: AuroraWeek; index: number }[] = useMemo(() => {
    const list: { session: AuroraSession; week: AuroraWeek; index: number }[] = [];
    let idx = 0;
    AURORA_WEEKS.forEach(w => {
      w.sessions.forEach(s => {
        list.push({ session: s, week: w, index: idx });
        idx++;
      });
    });
    return list;
  }, []);

  // Checked state map: sessionId -> boolean
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>(() => {
    try {
      const savedMap = localStorage.getItem(STORAGE_KEY_MAP);
      if (savedMap) {
        return JSON.parse(savedMap);
      }
      const savedArray = localStorage.getItem(STORAGE_KEY_ARRAY);
      if (savedArray) {
        const arr: boolean[] = JSON.parse(savedArray);
        const map: Record<string, boolean> = {};
        allSessions.forEach(({ session, index }) => {
          map[session.id] = !!arr[index];
        });
        return map;
      }
    } catch (e) {
      console.warn('Failed to parse aurora plan from localStorage:', e);
    }
    return {};
  });

  // Selected week in left menu: 'week-1' | 'week-2' | 'week-3' | 'week-4' | 'week-5' | 'week-freeze' | 'all' | 'docs'
  const [activeMenuTab, setActiveMenuTab] = useState<string>('week-1');

  // Filter category: 'all' | 'build' | 'docs'
  const [activeCategory, setActiveCategory] = useState<'all' | 'build' | 'docs'>('all');

  // Search keyword for tasks
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist checked state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MAP, JSON.stringify(checkedMap));
      const arr = allSessions.map(({ session }) => !!checkedMap[session.id]);
      localStorage.setItem(STORAGE_KEY_ARRAY, JSON.stringify(arr));
    } catch (e) {
      console.warn('Failed to save aurora plan to localStorage:', e);
    }
  }, [checkedMap, allSessions]);

  // Toggle single session
  const toggleSession = (sessionId: string, deliverableId?: string) => {
    setCheckedMap(prev => {
      const next = { ...prev, [sessionId]: !prev[sessionId] };
      return next;
    });

    if (deliverableId && onToggleCourseDeliverable) {
      // Trigger course deliverable if needed
    }
  };

  // Toggle all sessions in a specific week
  const toggleEntireWeek = (week: AuroraWeek, targetState: boolean) => {
    setCheckedMap(prev => {
      const next = { ...prev };
      week.sessions.forEach(s => {
        next[s.id] = targetState;
      });
      return next;
    });
  };

  // Reset all checkboxes
  const handleReset = () => {
    if (window.confirm('Reset all 36 session checkboxes back to incomplete?')) {
      setCheckedMap({});
    }
  };

  // Stats calculation
  const completedCount = useMemo(() => {
    return allSessions.filter(item => !!checkedMap[item.session.id]).length;
  }, [allSessions, checkedMap]);

  const percent = Math.round((completedCount / TOTAL_AURORA_SESSIONS_COUNT) * 100);

  // Helper: completion stats for a week
  const getWeekStats = (week: AuroraWeek) => {
    const total = week.sessions.length;
    const done = week.sessions.filter(s => !!checkedMap[s.id]).length;
    return { done, total, isComplete: done === total && total > 0 };
  };

  // Filtered weeks to display in the main content area
  const displayedWeeks = useMemo(() => {
    if (activeCategory === 'docs' || activeMenuTab === 'docs') {
      return [];
    }

    let weeks = AURORA_WEEKS;

    if (activeMenuTab !== 'all') {
      weeks = weeks.filter(w => w.id === activeMenuTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return weeks.filter(w =>
        w.title.toLowerCase().includes(q) ||
        w.deliverable.toLowerCase().includes(q) ||
        w.sessions.some(s => s.task.toLowerCase().includes(q) || s.date.toLowerCase().includes(q))
      );
    }

    return weeks;
  }, [activeMenuTab, activeCategory, searchQuery]);

  const showDocsSection =
    activeCategory === 'docs' ||
    activeMenuTab === 'docs' ||
    (activeMenuTab === 'all' && activeCategory === 'all' && !searchQuery);

  // Current active week index for next/prev navigation
  const currentWeekIndex = AURORA_WEEKS.findIndex(w => w.id === activeMenuTab);

  const handleNextWeek = () => {
    if (currentWeekIndex >= 0 && currentWeekIndex < AURORA_WEEKS.length - 1) {
      setActiveMenuTab(AURORA_WEEKS[currentWeekIndex + 1].id);
    } else if (currentWeekIndex === AURORA_WEEKS.length - 1) {
      setActiveMenuTab('docs');
    }
  };

  const handlePrevWeek = () => {
    if (activeMenuTab === 'docs') {
      setActiveMenuTab(AURORA_WEEKS[AURORA_WEEKS.length - 1].id);
    } else if (currentWeekIndex > 0) {
      setActiveMenuTab(AURORA_WEEKS[currentWeekIndex - 1].id);
    }
  };

  return (
    <div className="space-y-6">

      {/* ── 1. Hero Header Banner ───────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 border border-indigo-500/30 p-6 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 shadow-sm">
              CMPE ML Project
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Solo Developer: Sai Kalyan Moguloju
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
              Oct 26 – Nov 30 (Starts Next Week)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Evaluation of AuroRA: Nonlinear Low-Rank Adaptation for PEFT
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100 max-w-3xl leading-relaxed">
            A practical execution tracker for building, experimenting with, and evaluating the AuroRA parameter-efficient fine-tuning project on roberta-base and GLUE SST-2.
          </p>

          <div className="pt-1 flex items-center gap-2 text-xs text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-xl w-fit">
            <BookmarkCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Rule:</strong> You write the code and documentation yourself. All adapter implementations (LoRA & AuroRA) must be evaluated from scratch.
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Top Stats & PEFT Alerts ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">roberta-base</div>
            <div className="text-[11px] text-slate-400">Backbone Model (125M params)</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">GLUE SST-2</div>
            <div className="text-[11px] text-slate-400">~68k train / 900 validation</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xl font-black text-white font-mono">PEFT Benchmark</div>
            <div className="text-[11px] text-slate-400">LoRA vs AuroRA vs Full FT</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-950/20 border-y border-r border-amber-900/30 p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Important PEFT Design Rule
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Baseline LoRA parametrizes weight updates via strictly linear matrices (ΔW = B · A). AuroRA introduces non-linear mapping functions without linearly inflating rank r. Maintain strict parameter isolation.
          </p>
        </div>

        <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-950/20 border-y border-r border-emerald-900/30 p-3.5 space-y-1">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Documentation Checkpoint
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            After every major experiment, save training loss curves, peak VRAM (GB), validation accuracy/F1, and parameter counts for December.
          </p>
        </div>
      </div>

      {/* ── 3. Main Workspace: LEFT-ALIGNED WEEKS MENU + CONTENT ─────────── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ── LEFT COLUMN: Left-Aligned Weeks Menu Sidebar ───────────────── */}
        <aside className="w-full lg:w-80 xl:w-84 shrink-0 lg:sticky lg:top-4 space-y-4">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
            
            {/* Sidebar Title & Dates Starting Next Week Header */}
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white tracking-tight">Weeks Menu</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-700/70 transition-all"
                  title="Reset all checkboxes"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
              <p className="text-[11px] text-indigo-300 mt-1 font-mono">
                Dates starting next week: Oct 26
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Overall Progress</span>
                <span className="font-mono font-bold text-emerald-400">{percent}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{completedCount} / {TOTAL_AURORA_SESSIONS_COUNT} sessions</span>
                <span>{TOTAL_AURORA_SESSIONS_COUNT - completedCount} hrs left</span>
              </div>
            </div>

            {/* Quick Filter Mode Pills */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  if (activeMenuTab === 'docs') setActiveMenuTab('week-1');
                }}
                className={`flex-1 py-1 text-center rounded-lg font-semibold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setActiveCategory('build');
                  if (activeMenuTab === 'docs') setActiveMenuTab('week-1');
                }}
                className={`flex-1 py-1 text-center rounded-lg font-semibold transition-all ${
                  activeCategory === 'build'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Build
              </button>
              <button
                onClick={() => {
                  setActiveCategory('docs');
                  setActiveMenuTab('docs');
                }}
                className={`flex-1 py-1 text-center rounded-lg font-semibold transition-all ${
                  activeCategory === 'docs'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Docs
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sessions or tasks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* ── Left-Aligned Vertical Weeks Menu List ────────────────── */}
            <div className="space-y-1.5 pt-1">
              {/* "All Weeks Overview" Menu Item */}
              {activeCategory !== 'docs' && (
                <button
                  onClick={() => setActiveMenuTab('all')}
                  className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between gap-3 ${
                    activeMenuTab === 'all'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className={`w-4 h-4 ${activeMenuTab === 'all' ? 'text-white' : 'text-indigo-400'}`} />
                    <div>
                      <div className="text-xs font-bold leading-tight">All Weeks Overview</div>
                      <div className={`text-[10px] ${activeMenuTab === 'all' ? 'text-indigo-100' : 'text-slate-500'}`}>
                        All 36 one-hour sessions
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    activeMenuTab === 'all' ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {completedCount}/{TOTAL_AURORA_SESSIONS_COUNT}
                  </span>
                </button>
              )}

              {/* Individual Weeks (Week 1 to Freeze) */}
              {activeCategory !== 'docs' &&
                AURORA_WEEKS.map(w => {
                  const isSelected = activeMenuTab === w.id;
                  const stats = getWeekStats(w);

                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        setActiveMenuTab(w.id);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between gap-3 relative ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-300/40'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                            {w.label}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-indigo-300'
                          }`}>
                            {w.dateRange}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 ${
                          isSelected ? 'text-indigo-100 font-medium' : 'text-slate-400'
                        }`}>
                          {w.title}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {stats.isComplete ? (
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-white text-indigo-600' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {stats.done}/{stats.total}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}

              {/* December Documentation Plan Menu Item */}
              <button
                onClick={() => {
                  setActiveMenuTab('docs');
                  setActiveCategory('docs');
                }}
                className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between gap-3 ${
                  activeMenuTab === 'docs'
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className={`w-4 h-4 ${activeMenuTab === 'docs' ? 'text-white' : 'text-purple-400'}`} />
                  <div>
                    <div className="text-xs font-bold leading-tight">December Documentation</div>
                    <div className={`text-[10px] ${activeMenuTab === 'docs' ? 'text-purple-100' : 'text-slate-500'}`}>
                      6-Hour Schedule · 8 Deliverables
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  activeMenuTab === 'docs' ? 'bg-black/30 text-white' : 'bg-slate-800 text-purple-300'
                }`}>
                  Phase 2
                </span>
              </button>
            </div>

          </div>
        </aside>

        {/* ── RIGHT COLUMN: Selected Week Daily Sessions & Work Area ─────── */}
        <main className="flex-1 min-w-0 w-full space-y-6">

          {/* Quick Sub-navigation bar when viewing an individual week */}
          {activeMenuTab !== 'all' && activeMenuTab !== 'docs' && currentWeekIndex >= 0 && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={handlePrevWeek}
                disabled={currentWeekIndex === 0}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                  currentWeekIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-transparent text-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Week</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/50">
                  {AURORA_WEEKS[currentWeekIndex].label}
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  {AURORA_WEEKS[currentWeekIndex].dateRange}
                </span>
              </div>

              <button
                onClick={handleNextWeek}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 font-semibold transition-all"
              >
                <span>{currentWeekIndex === AURORA_WEEKS.length - 1 ? 'December Docs' : 'Next Week'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ── Sessions List for Selected Week(s) ─────────────────────────── */}
          {displayedWeeks.length > 0 && (
            <div className="space-y-6">
              {displayedWeeks.map(week => {
                const stats = getWeekStats(week);

                return (
                  <article
                    key={week.id}
                    className={`rounded-2xl border transition-all overflow-hidden bg-slate-900/90 shadow-md ${
                      stats.isComplete
                        ? 'border-emerald-800/60 shadow-emerald-950/20'
                        : 'border-slate-800'
                    }`}
                  >
                    {/* Week Header */}
                    <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-600/30 text-indigo-300 border border-indigo-500/30">
                            {week.label}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {week.title}
                          </h3>
                          <span className="text-xs font-mono text-slate-400">
                            · {week.dateRange}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-amber-300/90">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Deliverable: <strong>{week.deliverable}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                          {stats.done}/{stats.total} sessions
                        </span>

                        <button
                          onClick={() => toggleEntireWeek(week, !stats.isComplete)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                            stats.isComplete
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                              : 'bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-300 border-emerald-800/60'
                          }`}
                        >
                          {stats.isComplete ? 'Uncheck week' : 'Mark week done'}
                        </button>
                      </div>
                    </div>

                    {/* Week Sessions Grid */}
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {week.sessions.map(s => {
                          const isDone = !!checkedMap[s.id];

                          return (
                            <div
                              key={s.id}
                              onClick={() => toggleSession(s.id, week.deliverableId)}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                                isDone
                                  ? 'bg-emerald-950/25 border-emerald-700/50 shadow-sm'
                                  : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/30'
                              }`}
                            >
                              {/* Checkbox Icon */}
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-slate-950 shadow-sm">
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-md border border-slate-600 bg-slate-900/60 hover:border-indigo-400 transition-colors" />
                                )}
                              </div>

                              {/* Date Monospace Badge */}
                              <div className="shrink-0 font-mono text-xs font-bold text-indigo-400 min-w-[54px] pt-0.5">
                                {s.date}
                              </div>

                              {/* Task Description */}
                              <div className="flex-1 text-xs">
                                <span className={isDone ? 'line-through text-slate-500' : 'text-slate-100 font-medium'}>
                                  {s.task}
                                </span>
                              </div>

                              {/* 1h Duration Badge */}
                              <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/40">
                                1 hr
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Save for December Checkpoint Output Card */}
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs text-slate-300 flex items-start gap-2.5">
                        <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Save for December:</strong>{' '}
                          <span className="text-slate-300">{week.saveForDecember}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* ── December Documentation Plan Section ────────────────────────── */}
          {showDocsSection && (
            <section className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 lg:p-7 space-y-6 shadow-xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Phase 2
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    December Documentation Plan
                  </h2>
                </div>
                <p className="text-xs text-slate-400">
                  No new experiments. Write everything from the November notes and saved results.
                </p>
              </div>

              {/* 8 Deliverables Matrix */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  8 Core Report Deliverables (To Draft in December)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DECEMBER_AURORA_DELIVERABLES.map((d, idx) => (
                    <div
                      key={d.id}
                      className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3 hover:border-purple-500/40 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-lg bg-purple-950/80 text-purple-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-purple-700/40">
                        {idx + 1}
                      </span>
                      <div className="text-xs">
                        <strong className="text-white block font-semibold">{d.section}:</strong>
                        <span className="text-slate-400">{d.details}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Six-Hour Writing Schedule Card */}
              <div className="rounded-xl p-5 bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/30 border border-slate-800/90 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">Six-Hour Writing Schedule</h4>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950/50 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                    Structured 60-Min Blocks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SIX_HOUR_AURORA_WRITING_SCHEDULE.map(step => (
                    <div
                      key={step.step}
                      className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-300">
                          Step {step.step}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium leading-snug">
                        {step.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <footer className="text-center text-xs text-slate-500 py-3 border-t border-slate-800/80">
            Project rule: build and experiment in November; write and present in December.
          </footer>

        </main>
      </div>

    </div>
  );
};
