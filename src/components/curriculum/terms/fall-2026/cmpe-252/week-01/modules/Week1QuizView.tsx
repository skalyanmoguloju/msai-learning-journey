import React, { useMemo } from 'react';
import { QuizTemplate, QuizModuleItem } from '../../../../../common';
import { AI_WEEK1_QUIZ } from '../quizData';

interface Week1QuizViewProps {
  initialStepKey?: string;
  onSelectModule?: (moduleId: string) => void;
  onBackToStudy: (stepId: number) => void;
  showSolutions?: boolean;
  onToggleSolutions?: (show: boolean) => void;
}

const STORAGE_KEY_QUIZ_ANSWERS = 'ml_week1_quiz_answers';

export const Week1QuizView: React.FC<Week1QuizViewProps> = ({
  initialStepKey = 's1',
  onSelectModule,
  onBackToStudy,
  showSolutions,
  onToggleSolutions
}) => {
  const modules: QuizModuleItem[] = useMemo(() => {
    return Object.keys(AI_WEEK1_QUIZ).map((key) => {
      const mod = AI_WEEK1_QUIZ[key];
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
      title="AI & ML Concept Practice Quizzes"
      subtitle="Modules 1–6 Comprehensive Assessment"
      description="Interactive multi-choice evaluation with detailed LaTeX step-by-step solutions and derivations."
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

export default Week1QuizView;
