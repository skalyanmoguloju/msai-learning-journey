import React from 'react';
import {
  Construction,
  CalendarClock,
  BookOpen,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Course, SyllabusModule } from '../../types/course';

export interface UnderConstructionWeekProps {
  course?: Course;
  module?: SyllabusModule;
  /** Override the week label, e.g. "Week 03" */
  weekLabel?: string;
  /** Override the topic / title to hint at what's coming */
  topicHint?: string;
  /** Optional list of topics that will be covered */
  upcomingTopics?: string[];
  /** Optional estimated availability message */
  eta?: string;
}

/**
 * UnderConstructionWeek
 *
 * A rich, visually premium placeholder rendered for any week whose
 * curriculum content has not yet been authored. Drop it into the
 * package's index.tsx instead of a full week implementation.
 *
 * Usage:
 *   export const Week02AI: React.FC = () => (
 *     <UnderConstructionWeek weekLabel="Week 02" topicHint="Neural Networks" />
 *   );
 */
export const UnderConstructionWeek: React.FC<UnderConstructionWeekProps> = ({
  course,
  module,
  weekLabel,
  topicHint,
  upcomingTopics,
  eta,
}) => {
  const label = weekLabel || module?.week || 'This Week';
  const hint = topicHint || module?.title || 'Content Coming Soon';
  const courseCode = course?.code || module?.id?.split('-')[0]?.toUpperCase() || '';
  const courseName = course?.name || '';

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-2xl space-y-6">

        {/* ── Main card ── */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/30 shadow-2xl">

          {/* Decorative glow blobs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-cyan-600/10 blur-3xl" />

          <div className="relative p-8 sm:p-10 space-y-7">

            {/* Course / Week badge row */}
            <div className="flex flex-wrap items-center gap-2">
              {courseCode && (
                <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                  {courseCode}
                </span>
              )}
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {label}
              </span>
              {courseName && (
                <span className="text-xs text-slate-500 ml-1">{courseName}</span>
              )}
            </div>

            {/* Icon + headline */}
            <div className="flex items-start gap-5">
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/25 flex items-center justify-center shadow-lg shadow-amber-500/5">
                <Construction className="w-8 h-8 text-amber-400" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {hint}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  This week's interactive curriculum is currently being crafted and will be
                  available soon. Check back later for the full learning experience.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            {/* Upcoming topics (if provided) */}
            {upcomingTopics && upcomingTopics.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Topics That Will Be Covered</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {upcomingTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300"
                    >
                      <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
                <CalendarClock className="w-3.5 h-3.5" />
                <span>{eta || 'Content in progress — coming soon'}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-xs">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Study materials will include modules, flashcards &amp; quizzes</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── What to expect card ── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>When ready, this week will include:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Concept Modules', sub: 'Rich interactive concept breakdowns with LaTeX formulas', color: 'indigo' },
              { label: 'Live Simulators', sub: 'Hands-on visual labs and interactive algorithm demos', color: 'cyan' },
              { label: 'Quizzes & Flashcards', sub: 'Self-assessment quizzes and spaced-repetition flashcards', color: 'emerald' },
            ].map(({ label, sub, color }) => (
              <div
                key={label}
                className={`p-4 rounded-xl bg-${color}-500/5 border border-${color}-500/15 space-y-1`}
              >
                <div className={`text-xs font-bold text-${color}-400`}>{label}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
