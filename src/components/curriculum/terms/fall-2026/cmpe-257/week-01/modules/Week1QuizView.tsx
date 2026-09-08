import React, { useMemo } from 'react';
import { QuizTemplate, QuizModuleItem } from '../../../../../common';
import { ML_QUIZ_QUESTIONS } from '../quizData';
import { ML_MODULES } from '../types';

const STORAGE_KEY = 'cmpe257_week01_quiz_answers';

interface Props {
  initialModuleId?: string;
  onSelectModule?: (moduleId: string) => void;
  onBackToStudy?: (moduleId: string) => void;
  showSolutions?: boolean;
  onToggleSolutions?: (show: boolean) => void;
}

export const Week1QuizView: React.FC<Props> = ({
  initialModuleId = 'm1',
  onSelectModule,
  onBackToStudy,
  showSolutions,
  onToggleSolutions
}) => {
  const modules: QuizModuleItem[] = useMemo(() => {
    return ML_MODULES.map((mod) => {
      const questions = ML_QUIZ_QUESTIONS.filter((q) => q.moduleId === mod.id).map((q, idx) => ({
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
      subtitle="Modules 1–6 Comprehensive Assessment"
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

export default Week1QuizView;
