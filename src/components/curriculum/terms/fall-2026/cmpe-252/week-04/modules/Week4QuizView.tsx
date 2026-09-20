import React, { useMemo } from 'react';
import { QuizTemplate, QuizModuleItem } from '../../../../../common';
import { AI_WEEK4_QUIZ } from '../quizData';

interface Week4QuizViewProps {
  initialStepKey?: string;
  onSelectModule?: (moduleId: string) => void;
  onBackToStudy: (stepId: number) => void;
  showSolutions?: boolean;
  onToggleSolutions?: (show: boolean) => void;
}

const STORAGE_KEY_QUIZ_ANSWERS = 'cmpe252_week4_quiz_answers';

export const Week4QuizView: React.FC<Week4QuizViewProps> = ({
  initialStepKey = 's1',
  onSelectModule,
  onBackToStudy,
  showSolutions,
  onToggleSolutions
}) => {
  const modules: QuizModuleItem[] = useMemo(() => {
    return Object.keys(AI_WEEK4_QUIZ).map((key) => {
      const mod = AI_WEEK4_QUIZ[key];
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
      title="Deep Neural Networks, Sequence & Spatial Models Assessment"
      subtitle="Modules 1–10 Interactive Evaluation"
      description="Problem sets covering feature representations, CNN building blocks, modern vision architectures, self-attention mechanisms, and recurrent architectures (RNN, GRU, LSTM, BiRNN)."
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

export default Week4QuizView;
