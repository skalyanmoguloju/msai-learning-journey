import React from 'react';

export interface UniversalFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  useCase?: string;
  remark?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModuleData {
  title: string;
  moduleNumber: number;
  stepNumber?: number; // legacy alias
  badge: string;
  sub: string;
  questions: QuizQuestion[];
}

export interface CurriculumModule {
  id: number;
  title: string;
  badge: string;
  subtitle: string;
  icon?: React.ComponentType<{ className?: string }>;
  summary?: string;
  keyTakeaways?: string[];
  formulas?: Array<{
    label: string;
    tex: string;
    explanation?: string;
  }>;
  deepDive?: {
    title: string;
    content: string;
    bullets?: string[];
  };
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
    explanation?: string;
  };
  interactiveWidget?: React.ReactNode;
  customContent?: React.ReactNode;
}

// Type alias for backwards compatibility
export type CurriculumStep = CurriculumModule;

export interface WeekCurriculumData {
  courseId: string;
  weekId: string;
  weekNumber: number;
  weekTitle: string;
  weekSubtitle: string;
  reading?: string;
  status?: 'completed' | 'in-progress' | 'upcoming';
  topics: string[];
  modules: CurriculumModule[];
  steps?: CurriculumModule[]; // legacy alias
  flashcards: UniversalFlashcard[];
  quizzes: Record<string, QuizModuleData>;
}

