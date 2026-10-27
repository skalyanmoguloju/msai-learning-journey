import React, { useMemo } from 'react';
import {
  Rocket,
  GitBranch,
  ExternalLink,
  Database,
  CheckCircle2,
  Circle,
  ArrowRight,
  BarChart3,
  Calendar,
  Layers,
  Cpu,
  FileText,
  BookOpen,
  FlaskConical,
  Presentation,
  FileCheck2,
  GraduationCap,
  Clock3,
} from 'lucide-react';
import { Course, DeliverableItem } from '../../../types/course';
import { resolveAssetUrl } from '../../common/DocumentsTemplate';
import { UpliftExecutionTracker } from './UpliftExecutionTracker';
import { AuroraExecutionTracker } from './AuroraExecutionTracker';
import { AlertTriangle, UserCheck } from 'lucide-react';

interface ProjectTabProps {
  course: Course;
  toggleDeliverable: (courseId: string, deliverableId: string) => void;
}

// ── Category helpers ─────────────────────────────────────────────────────────
type DeliverableCategory = NonNullable<DeliverableItem['category']>;

const CATEGORY_META: Record<
  DeliverableCategory,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }
> = {
  Homework:     { icon: BookOpen,      color: 'text-blue-300',   bg: 'bg-blue-900/40',    border: 'border-blue-700/50' },
  Exam:         { icon: GraduationCap, color: 'text-red-300',    bg: 'bg-red-900/40',     border: 'border-red-700/50' },
  Proposal:     { icon: FileText,      color: 'text-amber-300',  bg: 'bg-amber-900/40',   border: 'border-amber-700/50' },
  Presentation: { icon: Presentation,  color: 'text-purple-300', bg: 'bg-purple-900/40',  border: 'border-purple-700/50' },
  Report:       { icon: FileCheck2,    color: 'text-emerald-300',bg: 'bg-emerald-900/40', border: 'border-emerald-700/50' },
  Milestone:    { icon: FlaskConical,  color: 'text-cyan-300',   bg: 'bg-cyan-900/40',    border: 'border-cyan-700/50' },
};

function getCategoryMeta(cat?: DeliverableCategory) {
  return cat ? CATEGORY_META[cat] : CATEGORY_META['Milestone'];
}

// ── Weekly tracker ───────────────────────────────────────────────────────────
// ── Semester calendar helpers ────────────────────────────────────────────────
// Fall 2026: Week 1 starts Aug 25 (Monday)
const SEMESTER_START = new Date('2026-08-25T00:00:00');

function getAcademicWeekNum(date: Date): number {
  const diff = date.getTime() - SEMESTER_START.getTime();
  return Math.max(1, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)));
}

function getWeekStartDate(weekNum: number): Date {
  const d = new Date(SEMESTER_START);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d;
}

function getWeekEndDate(weekNum: number): Date {
  const d = getWeekStartDate(weekNum);
  d.setDate(d.getDate() + 6);
  return d;
}

function formatShort(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ── WeeklyTracker ────────────────────────────────────────────────────────────
function WeeklyTracker({
  course,
  toggleDeliverable,
}: {
  course: Course;
  toggleDeliverable: (courseId: string, deliverableId: string) => void;
}) {
  const { project, modules } = course;

  const deliverablesByWeek = useMemo(() => {
    const map = new Map<number, DeliverableItem[]>();
    project.deliverables.forEach(d => {
      const wk = d.weekNumber;
      if (wk == null) return;
      if (!map.has(wk)) map.set(wk, []);
      map.get(wk)!.push(d);
    });
    return map;
  }, [project.deliverables]);

  const moduleByWeek = useMemo(() => {
    const map = new Map<number, (typeof modules)[number]>();
    modules.forEach(mod => {
      const match = (mod.week || '').match(/\d+/);
      if (match) map.set(parseInt(match[0], 10), mod);
    });
    return map;
  }, [modules]);

  // Week range: next week → end of November
  const today = new Date();
  const currentWeek = getAcademicWeekNum(today);
  const firstWeek = currentWeek + 1;                           // next week
  const endOfNovWeek = getAcademicWeekNum(new Date('2026-11-30T00:00:00'));
  const sidebarWeeks = Array.from(
    { length: Math.max(0, endOfNovWeek - firstWeek + 1) },
    (_, i) => firstWeek + i
  );

  const [selectedWeek, setSelectedWeek] = React.useState<number>(
    sidebarWeeks.find(w => deliverablesByWeek.has(w)) ?? sidebarWeeks[0] ?? firstWeek
  );

  const completed = project.deliverables.filter(d => d.completed).length;
  const total = project.deliverables.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const selectedDelivs = deliverablesByWeek.get(selectedWeek) ?? [];
  const selectedMod = moduleByWeek.get(selectedWeek);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md overflow-hidden">

      {/* ── Card header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-indigo-400" />
            Weekly Progress Tracker
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Now → End of November · click any deliverable to mark complete
          </p>
        </div>

        {/* Circular progress */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Overall</div>
            <div className="text-sm font-bold text-white">{completed} / {total}</div>
          </div>
          <div className="relative w-11 h-11 shrink-0">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgb(30 41 59)" strokeWidth="4" />
              <circle
                cx="22" cy="22" r="18"
                fill="none"
                stroke={pct === 100 ? 'rgb(52 211 153)' : 'rgb(99 102 241)'}
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 18}`}
                strokeDashoffset={`${2 * Math.PI * 18 * (1 - pct / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* ── Two-panel body ────────────────────────────────────────────────── */}
      <div className="flex min-h-[320px]">

        {/* LEFT: week sidebar */}
        <div className="w-28 sm:w-36 shrink-0 border-r border-slate-800 overflow-y-auto">
          {sidebarWeeks.length === 0 && (
            <p className="text-[11px] text-slate-500 text-center py-6 px-2">No weeks in range</p>
          )}
          {sidebarWeeks.map(wk => {
            const delivs = deliverablesByWeek.get(wk) ?? [];
            const hasDelivs = delivs.length > 0;
            const allDone = hasDelivs && delivs.every(d => d.completed);
            const someDone = hasDelivs && delivs.some(d => d.completed) && !allDone;
            const isSelected = wk === selectedWeek;
            const weekStart = getWeekStartDate(wk);
            const weekEnd = getWeekEndDate(wk);

            return (
              <button
                key={wk}
                onClick={() => setSelectedWeek(wk)}
                className={`w-full text-left px-3 py-3 border-b border-slate-800/60 transition-all relative ${
                  isSelected
                    ? 'bg-indigo-600/20 border-l-2 border-l-indigo-500'
                    : 'hover:bg-slate-800/40 border-l-2 border-l-transparent'
                }`}
              >
                {/* Week number */}
                <div className={`text-xs font-bold font-mono ${
                  isSelected ? 'text-indigo-300' : 'text-slate-300'
                }`}>
                  Week {wk}
                </div>

                {/* Date range */}
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  {formatShort(weekStart)} – {formatShort(weekEnd)}
                </div>

                {/* Deliverable indicator */}
                {hasDelivs && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      allDone ? 'bg-emerald-400' : someDone ? 'bg-indigo-400' : 'bg-amber-400'
                    }`} />
                    <span className={`text-[9px] font-semibold ${
                      allDone ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {allDone ? 'done' : `${delivs.length} due`}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT: week detail */}
        <div className="flex-1 overflow-y-auto">
          {/* Week header */}
          <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold font-mono bg-slate-800 text-indigo-300 px-2.5 py-0.5 rounded">
                Week {selectedWeek}
              </span>
              <span className="text-xs text-slate-500">
                {formatShort(getWeekStartDate(selectedWeek))} – {formatShort(getWeekEndDate(selectedWeek))}
              </span>
            </div>
            {selectedMod ? (
              <>
                <h5 className="text-sm font-bold text-white">{selectedMod.title}</h5>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{selectedMod.description}</p>
                {selectedMod.topics && selectedMod.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedMod.topics.slice(0, 5).map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {t}
                      </span>
                    ))}
                    {selectedMod.topics.length > 5 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/40 text-slate-500">
                        +{selectedMod.topics.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-500 italic">No module data for this week.</p>
            )}
          </div>

          {/* Deliverables */}
          <div className="px-5 py-4 space-y-2">
            {selectedDelivs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center gap-2 text-slate-600">
                <CheckCircle2 className="w-8 h-8 opacity-30" />
                <p className="text-xs">No deliverables due this week.</p>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Deliverables Due
                </p>
                {selectedDelivs.map(deliv => {
                  const meta = getCategoryMeta(deliv.category);
                  const Icon = meta.icon;
                  return (
                    <div
                      key={deliv.id}
                      onClick={() => toggleDeliverable(course.id, deliv.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all group ${
                        deliv.completed
                          ? 'bg-emerald-950/20 border-emerald-800/50'
                          : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/30'
                      }`}
                    >
                      {/* Toggle */}
                      <div className="shrink-0">
                        {deliv.completed
                          ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          : <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                        }
                      </div>

                      {/* Category badge */}
                      <span className={`shrink-0 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${meta.bg} ${meta.color} ${meta.border} border`}>
                        <Icon className="w-3 h-3" />
                        {deliv.category ?? 'Milestone'}
                      </span>

                      {/* Title */}
                      <span className={`flex-1 text-xs font-semibold ${
                        deliv.completed ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}>
                        {deliv.title}
                      </span>

                      {/* Due date */}
                      <span className="shrink-0 flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                        <Calendar className="w-3 h-3" />
                        {new Date(deliv.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Main ProjectTab ───────────────────────────────────────────────────────────
export const ProjectTab: React.FC<ProjectTabProps> = ({ course, toggleDeliverable }) => {
  const { project } = course;

  const isUpliftProject =
    course.code === 'CMPE-252' ||
    course.id.includes('252') ||
    project.title.toLowerCase().includes('uplift');

  const isAuroraProject =
    course.code === 'CMPE-257' ||
    course.id.includes('257') ||
    project.title.toLowerCase().includes('aurora');

  const hasExecutionPlan = isUpliftProject || isAuroraProject;

  const [projectSubView, setProjectSubView] = React.useState<'tracker' | 'architecture' | 'all'>('tracker');

  return (
    <div className="space-y-6">

      {/* ── Top View Switcher for Capstone Project ───────────────────────── */}
      {hasExecutionPlan && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setProjectSubView('tracker')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                projectSubView === 'tracker'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>Weekly Execution Tracker</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-700/70 text-blue-100">
                Oct 26 – Nov 30
              </span>
            </button>

            <button
              onClick={() => setProjectSubView('architecture')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                projectSubView === 'architecture'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Rocket className="w-4 h-4 text-amber-300" />
              <span>Architecture & Specs</span>
            </button>

            <button
              onClick={() => setProjectSubView('all')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                projectSubView === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-300" />
              <span>Combined View</span>
            </button>
          </div>

          {project.proposalUrl && (
            <a
              href={resolveAssetUrl(project.proposalUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all shrink-0 self-end sm:self-auto"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Proposal PDF</span>
              <ExternalLink className="w-3 h-3 text-amber-300/70" />
            </a>
          )}
        </div>
      )}

      {/* ── 1. Weekly Execution Tracker (Rendered when tracker or all is selected) */}
      {(projectSubView === 'tracker' || projectSubView === 'all') && (
        <>
          {isUpliftProject && (
            <UpliftExecutionTracker
              onToggleCourseDeliverable={(delivId) => toggleDeliverable(course.id, delivId)}
            />
          )}
          {isAuroraProject && (
            <AuroraExecutionTracker
              onToggleCourseDeliverable={(delivId) => toggleDeliverable(course.id, delivId)}
            />
          )}
        </>
      )}

      {/* ── 2. Project Architecture & Blueprint (Rendered when architecture, all, or non-plan) */}
      {(!hasExecutionPlan || projectSubView === 'architecture' || projectSubView === 'all') && (
        <>
          {/* ── Project Overview Card ──────────────────────────────────────────── */}
          <div className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
                  <Rocket className="w-3.5 h-3.5 text-blue-400" />
                  Course Capstone Project
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs text-indigo-300 font-medium">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {project.proposalUrl && (
                  <a
                    href={resolveAssetUrl(project.proposalUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Project Proposal</span>
                    <ExternalLink className="w-3 h-3 text-amber-300/70" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
                  >
                    <GitBranch className="w-4 h-4 text-emerald-400" />
                    <span>Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 text-indigo-200" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed pt-2">
              {project.abstract}
            </p>

            {/* Problem Statement */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Problem Formulation & Engineering Challenge
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-slate-500" /> Stack:
              </span>
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-blue-200 border border-slate-700/60 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── Benchmark Metrics ─────────────────────────────────────────────── */}
          {project.metrics.length > 0 && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Empirical Benchmark Performance & Evaluation
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-2 shadow-md">
                    <span className="text-xs text-slate-400">{metric.label}</span>
                    <div>
                      <div className="text-xl font-extrabold text-white font-mono">{metric.value}</div>
                      {metric.baseline && (
                        <div className="text-[10px] text-slate-400 mt-0.5">Baseline: {metric.baseline}</div>
                      )}
                    </div>
                    {metric.change && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/60 w-fit">
                        {metric.change}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Pipeline / Architecture ───────────────────────────────────────── */}
          {project.pipelineSteps.length > 0 && (
            <div className="rounded-2xl p-5 lg:p-6 bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">System Architecture & Pipeline Stages</h4>
                  <p className="text-xs text-slate-400">Sequential end-to-end data and model processing workflow</p>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  {project.pipelineSteps.length} Stages
                </span>
              </div>
              <div className={`grid grid-cols-1 gap-3 ${
                project.pipelineSteps.length <= 3 ? 'md:grid-cols-3' :
                project.pipelineSteps.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-5'
              }`}>
                {project.pipelineSteps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between gap-3 relative group hover:border-blue-500/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-6 h-6 rounded-full bg-blue-900/60 text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-600/40">
                          {step.step}
                        </span>
                        {idx < project.pipelineSteps.length - 1 && (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden md:block" />
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-white mb-1">{step.title}</h5>
                      <p className="text-[11px] text-slate-300 leading-snug">{step.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] text-indigo-300 font-mono block truncate">{step.tool}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Fallback Weekly Progress Tracker for courses without a dedicated execution plan ──── */}
          {!hasExecutionPlan && (
            <WeeklyTracker course={course} toggleDeliverable={toggleDeliverable} />
          )}

          {/* ── Dataset Info ─────────────────────────────────────────────────── */}
          {project.datasetInfo && (
            <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" /> Corpus & Data Provenance
              </span>
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <h6 className="text-xs font-bold text-white">Dataset Description</h6>
                <p className="text-xs text-slate-300 leading-relaxed">{project.datasetInfo}</p>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <p>• Data splits: 70% Train, 15% Validation, 15% Test</p>
                <p>• Evaluated with nested 5-Fold Stratified Cross-Validation</p>
                <p>• Reproducibility seed: 42</p>
              </div>
            </div>
          )}

          {/* ── Expected Challenges & Team Roles (for AuroRA PEFT project) ──── */}
          {isAuroraProject && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Expected Engineering Challenges
                </span>
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <strong className="text-white block font-semibold">1. Training Instability:</strong>
                    <p className="text-slate-300">
                      Inclusion of the nonlinear layer can make gradient updates unstable during backpropagation. Mitigated by using stable bounded activation functions and layer normalization.
                    </p>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <strong className="text-white block font-semibold">2. Hardware Compatibility:</strong>
                    <p className="text-slate-300">
                      Non-linear functions can introduce GPU kernel execution overhead. Mitigated using PyTorch JIT / fused kernels and hardware optimizers on consumer hardware.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" /> Team Roles & Project Ownership
                </span>
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white">Sai Kalyan Moguloju</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-semibold border border-indigo-500/30">
                      Solo Developer
                    </span>
                  </div>
                  <div className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                    <p>• <strong>Data & Setup:</strong> Prepare SST-2 dataset and configure baseline evaluation protocols.</p>
                    <p>• <strong>Model & Benchmarking:</strong> Build LoRA and AuroRA adapters, train locally on consumer GPU, and measure memory/speed.</p>
                    <p>• <strong>Documentation:</strong> Author the final project report, summarize experimental findings, and deliver presentation defense.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};