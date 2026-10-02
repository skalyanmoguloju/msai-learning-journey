import React from 'react';
import { GraduationCap } from 'lucide-react';

export interface MLWeek6Module {
  id: string;
  stepNumber: number;
  shortTitle: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  readingStatus: 'in_progress' | 'completed' | 'yet_to_complete';
  description: string;
  keyQuestions: string[];
}

export const ML_WEEK6_MODULES: MLWeek6Module[] = [
  {
    id: 'm1',
    stepNumber: 1,
    shortTitle: 'Midterm Prep',
    title: 'Midterm Prep',
    category: 'Exam Review & Practice',
    icon: GraduationCap,
    readingStatus: 'yet_to_complete',
    description: 'Week 6 has no formal lecture class — it is reserved for Midterm Examination preparation. Review exam logistics, rules, key theoretical concepts, and worked sample questions in the Documents section.',
    keyQuestions: [
      'What are the official rules, time limits, and permitted materials (calculator, 1-page cheatsheet) for the Midterm Exam?',
      'How do different loss functions (Squared Loss vs. Hinge Loss) respond to distant outlier misclassifications?',
      'How do we derive covariance matrices and perform Chi-Square hypothesis tests of independence on contingency tables?',
      'Why do Entropy and Gini impurity smoothly capture node refinement in Decision Trees compared to coarse misclassification error?',
      'What are the closed-form MLE parameter estimators for Naive Bayes and why does conditional independence fail on XOR data?'
    ]
  }
];
