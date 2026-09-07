import React from 'react';
import { Course, SyllabusModule } from '../types/course';
import { UnderConstructionWeek } from './common';

// ── Completed week implementations ──────────────────────────────────────────
import { Week01AI } from './terms/fall-2026/cmpe-252/week-01';
import { Week01ML } from './terms/fall-2026/cmpe-257/week-01';

// ── CMPE-252 stub weeks (2–16) ───────────────────────────────────────────────
import {
  Week02AI, Week03AI, Week04AI, Week05AI, Week06AI, Week07AI, Week08AI,
  Week09AI, Week10AI, Week11AI, Week12AI, Week13AI, Week14AI, Week15AI, Week16AI,
} from './terms/fall-2026/cmpe-252/stubs';

// ── CMPE-257 stub weeks (2–16) ───────────────────────────────────────────────
import {
  Week02ML, Week03ML, Week04ML, Week05ML, Week06ML, Week07ML, Week08ML,
  Week09ML, Week10ML, Week11ML, Week12ML, Week13ML, Week14ML, Week15ML, Week16ML,
} from './terms/fall-2026/cmpe-257/stubs';

export interface WeekViewComponentProps {
  course: Course;
  module: SyllabusModule;
}

export type WeekViewComponent = React.FC<WeekViewComponentProps>;

// ── Utility: normalise week number from label ────────────────────────────────
function extractWeekNumber(module: SyllabusModule): number {
  const raw = (module.week || '').replace(/^Session\s*/i, 'Week ').trim();
  const match = raw.match(/\d+/);
  if (match) return parseInt(match[0], 10);
  // Fall back to module id suffix (e.g. "m252-3" → 3)
  const idMatch = (module.id || '').match(/(\d+)$/);
  return idMatch ? parseInt(idMatch[1], 10) : 1;
}

// ── CMPE-252 week map ────────────────────────────────────────────────────────
const CMPE252_WEEKS: Record<number, WeekViewComponent> = {
  1:  Week01AI as WeekViewComponent,
  2:  Week02AI as WeekViewComponent,
  3:  Week03AI as WeekViewComponent,
  4:  Week04AI as WeekViewComponent,
  5:  Week05AI as WeekViewComponent,
  6:  Week06AI as WeekViewComponent,
  7:  Week07AI as WeekViewComponent,
  8:  Week08AI as WeekViewComponent,
  9:  Week09AI as WeekViewComponent,
  10: Week10AI as WeekViewComponent,
  11: Week11AI as WeekViewComponent,
  12: Week12AI as WeekViewComponent,
  13: Week13AI as WeekViewComponent,
  14: Week14AI as WeekViewComponent,
  15: Week15AI as WeekViewComponent,
  16: Week16AI as WeekViewComponent,
};

// ── CMPE-257 week map ────────────────────────────────────────────────────────
const CMPE257_WEEKS: Record<number, WeekViewComponent> = {
  1:  Week01ML as WeekViewComponent,
  2:  Week02ML as WeekViewComponent,
  3:  Week03ML as WeekViewComponent,
  4:  Week04ML as WeekViewComponent,
  5:  Week05ML as WeekViewComponent,
  6:  Week06ML as WeekViewComponent,
  7:  Week07ML as WeekViewComponent,
  8:  Week08ML as WeekViewComponent,
  9:  Week09ML as WeekViewComponent,
  10: Week10ML as WeekViewComponent,
  11: Week11ML as WeekViewComponent,
  12: Week12ML as WeekViewComponent,
  13: Week13ML as WeekViewComponent,
  14: Week14ML as WeekViewComponent,
  15: Week15ML as WeekViewComponent,
  16: Week16ML as WeekViewComponent,
};

/**
 * Normalised Week Resolution Registry
 * Resolves Term → Class → Week (#) → Module Hub
 *
 * Returns the fully-implemented component if the week has been authored,
 * or the UnderConstructionWeek card if it's still a stub.
 */
export function getWeekComponent(
  course: Course,
  module: SyllabusModule
): WeekViewComponent {
  const isCmpe252 = course.id === 'cmpe-252-sec-01' || course.code === 'CMPE-252';
  const isCmpe257 = course.id === 'cmpe-257-sec-01' || course.code === 'CMPE-257';
  const weekNum = extractWeekNumber(module);

  if (isCmpe252) {
    return CMPE252_WEEKS[weekNum] ?? (UnderConstructionWeek as WeekViewComponent);
  }

  if (isCmpe257) {
    return CMPE257_WEEKS[weekNum] ?? (UnderConstructionWeek as WeekViewComponent);
  }

  // Generic fallback for any unknown course/week
  return UnderConstructionWeek as WeekViewComponent;
}

/**
 * Set of fully-implemented week numbers per course.
 * Add a week number here once its curriculum package is complete.
 * Stubs (UnderConstructionWeek wrappers) must NOT appear here.
 */
const CMPE252_AVAILABLE_WEEKS = new Set([1]);
const CMPE257_AVAILABLE_WEEKS = new Set([1]);

/**
 * Returns true if the given week for this course has a real implementation
 * (i.e. is NOT an UnderConstructionWeek stub).
 *
 * Use this in ClassTab to decide whether to show a "completed" status badge.
 */
export function isWeekAvailable(course: Course, module: SyllabusModule): boolean {
  const isCmpe252 = course.id === 'cmpe-252-sec-01' || course.code === 'CMPE-252';
  const isCmpe257 = course.id === 'cmpe-257-sec-01' || course.code === 'CMPE-257';
  const weekNum = extractWeekNumber(module);

  if (isCmpe252) return CMPE252_AVAILABLE_WEEKS.has(weekNum);
  if (isCmpe257) return CMPE257_AVAILABLE_WEEKS.has(weekNum);
  return false;
}

