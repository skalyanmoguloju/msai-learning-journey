import React, { useMemo } from 'react';
import { QuizTemplate, QuizModuleItem } from '../../../../../common';
import { ML_WEEK2_QUIZ_QUESTIONS } from '../quizData';
import { ML_WEEK2_MODULES } from '../types';

const STORAGE_KEY = 'cmpe257_week02_quiz_answers';

interface Props {
  initialModuleId?: string;
  onSelectModule?: (moduleId: string) => void;
  onBackToStudy?: (moduleId: string) => void;
  showSolutions?: boolean;
  onToggleSolutions?: (show: boolean) => void;
}

export const Week2QuizView: React.FC<Props> = ({
  initialModuleId = 'm1',
  onSelectModule,
  onBackToStudy,
  showSolutions,
  onToggleSolutions
}) => {
  const modules: QuizModuleItem[] = useMemo(() => {
    return ML_WEEK2_MODULES.map((mod) => {
      const questions = ML_WEEK2_QUIZ_QUESTIONS.filter((q) => q.moduleId === mod.id).map((q, idx) => ({
        id: `${mod.id}_q${idx + 1}`,
        question: q.question,
        options: q.options,
        correct: q.correct,
        explanation: q.explanation
      }));

      return {
        id: mod.id,
        stepNumber: mod.stepNumber,
        title: mod.title,
        badge: mod.category || mod.shortTitle,
        sub: mod.shortTitle,
        questions
      };
    });
  }, []);

  return (
    <QuizTemplate
      title="Machine Learning Concept Practice Quizzes"
      subtitle="Week 02: Logistic Regression, GLMs & Probabilistic Models"
      description="Interactive multi-choice evaluation with detailed step-by-step solutions, mathematical proofs, and derivations."
      modules={modules}
      initialModuleId={initialModuleId}
      onSelectModule={onSelectModule}
      onBackToStudy={(modId) => {
        onBackToStudy?.(String(modId));
      }}
      showSolutions={showSolutions}
      onToggleSolutions={onToggleSolutions}
      storageKey={STORAGE_KEY}
    />
  );
};
