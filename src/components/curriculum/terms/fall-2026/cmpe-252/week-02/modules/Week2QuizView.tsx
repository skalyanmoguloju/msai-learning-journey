import React, { useMemo } from 'react';
import { QuizTemplate, QuizModuleItem } from '../../../../../common';
import { AI_WEEK2_QUIZ } from '../quizData';

interface Week2QuizViewProps {
  initialStepKey?: string;
  onSelectModule?: (moduleId: string) => void;
  onBackToStudy: (stepId: number) => void;
  showSolutions?: boolean;
  onToggleSolutions?: (show: boolean) => void;
}

const STORAGE_KEY_QUIZ_ANSWERS = 'cmpe252_week2_quiz_answers';

export const Week2QuizView: React.FC<Week2QuizViewProps> = ({
  initialStepKey = 's1',
  onSelectModule,
  onBackToStudy,
  showSolutions,
  onToggleSolutions
}) => {
  const modules: QuizModuleItem[] = useMemo(() => {
    return Object.keys(AI_WEEK2_QUIZ).map((key) => {
      const mod = AI_WEEK2_QUIZ[key];
      return {
        id: key,
        stepNumber: mod.stepNumber,
        title: mod.title,
        badge: mod.badge,
        sub: mod.sub,
        questions: mod.questions
      };
    });
  }, []);

  return (
    <QuizTemplate
      title="Mathematics & Optimization for AI Assessment"
      subtitle="Modules 1–5 Interactive Evaluation"
      description="Rigorous multi-choice problem sets covering LU, SVD, Gradients, Multivariate Normal Distributions, SGD, Adam, Newton, and Hessian Curvature."
      modules={modules}
      initialModuleId={initialStepKey}
      onSelectModule={onSelectModule}
      onBackToStudy={(modId) => {
        const num = typeof modId === 'number' ? modId : parseInt(String(modId).replace(/\D/g, ''), 10) || 1;
        onBackToStudy(num);
      }}
      showSolutions={showSolutions}
      onToggleSolutions={onToggleSolutions}
      storageKey={STORAGE_KEY_QUIZ_ANSWERS}
    />
  );
};

export default Week2QuizView;
