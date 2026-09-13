import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  HelpCircle,
  ListChecks,
  FileText
} from 'lucide-react';
import { Course, SyllabusModule } from '../../../../../../types/course';
import {
  ModuleTemplate,
  WeeklyHeaderBanner,
  ModuleAndToolSidebar,
  Toast,
  UniversalFlashcardsModal,
  DocumentsTemplate,
  curriculumNavStore
} from '../../../../common';
import { StepId, STEPS } from './types';
import { AI_WEEK2_FLASHCARDS } from './flashcards';
import { AI_WEEK2_QUIZ } from './quizData';
import { AI_WEEK2_DOCUMENTS } from './documentsData';
import { Module1LinearAlgebra } from './modules/Module1LinearAlgebra';
import { Module2MultivariableCalculus } from './modules/Module2MultivariableCalculus';
import { Module3Probability } from './modules/Module3Probability';
import { Module4FirstOrderOpt } from './modules/Module4FirstOrderOpt';
import { Module5SecondOrderOpt } from './modules/Module5SecondOrderOpt';
import { Week2QuizView } from './modules/Week2QuizView';

const STORAGE_KEY_COMPLETED = 'cmpe252_week02_completed';
const WEEK_KEY = 'cmpe-252_week-02';

export interface Week02AIProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week02AI: React.FC<Week02AIProps> = ({ course, module }) => {
  const [activeStep, setActiveStepState] = useState<StepId>(() =>
    curriculumNavStore.getModuleForWeek<StepId>(WEEK_KEY, 1)
  );
  const [activeQuizStepKey, setActiveQuizStepKeyState] = useState<string>(() =>
    curriculumNavStore.getModuleForWeek<string>(`${WEEK_KEY}_quiz`, 's1')
  );
  const [activeMainTab, setActiveMainTabState] = useState<'study' | 'quiz' | 'documents'>(() =>
    curriculumNavStore.getMainTabForWeek<'study' | 'quiz' | 'documents'>(WEEK_KEY, 'study')
  );

  const setActiveStep = useCallback((step: StepId) => {
    curriculumNavStore.setModuleForWeek(WEEK_KEY, step);
    setActiveStepState(step);
  }, []);

  const setActiveQuizStepKey = useCallback((key: string) => {
    curriculumNavStore.setModuleForWeek(`${WEEK_KEY}_quiz`, key);
    setActiveQuizStepKeyState(key);
  }, []);

  const setActiveMainTab = useCallback((tab: 'study' | 'quiz' | 'documents') => {
    curriculumNavStore.setMainTabForWeek(WEEK_KEY, tab);
    setActiveMainTabState(tab);
  }, []);

  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showQuizSolutions, setShowQuizSolutionsState] = useState<boolean>(() =>
    curriculumNavStore.getSolutionsModeForWeek(WEEK_KEY)
  );
  const setShowQuizSolutions = useCallback((show: boolean) => {
    curriculumNavStore.setSolutionsModeForWeek(WEEK_KEY, show);
    setShowQuizSolutionsState(show);
  }, []);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  const [completedSteps, setCompletedSteps] = useState<StepId[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedSteps));
    } catch {
      // ignore
    }
  }, [completedSteps]);

  const toggleStepComplete = useCallback((id: StepId) => {
    setCompletedSteps(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(s => s !== id) : [...prev, id];
      showToast(exists ? `Marked Step ${id} as Incomplete` : `Completed Step ${id}! 🎉`);
      return next;
    });
  }, [showToast]);

  const handleResetAll = useCallback(() => {
    setCompletedSteps([]);
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem('cmpe252_week2_quiz_answers');
    } catch {
      // ignore
    }
    showToast('All Week 02 progress & quiz answers have been reset.');
  }, [showToast]);

  const currentStepMeta = STEPS.find(s => s.id === activeStep) || STEPS[0];
  const prevStep = activeStep > 1 ? STEPS.find(s => s.id === (activeStep - 1) as StepId) : null;
  const nextStep = activeStep < STEPS.length ? STEPS.find(s => s.id === (activeStep + 1) as StepId) : null;
  const progressPct = Math.round((completedSteps.length / STEPS.length) * 100);

  const totalQuestions = useMemo(() => {
    return Object.values(AI_WEEK2_QUIZ).reduce((acc, m) => acc + m.questions.length, 0);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header Banner with built-in reset dialog & toast */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 02'}
        courseCode={course?.code || 'CMPE-252'}
        courseName={course?.name || 'Artificial Intelligence & Data Engineering'}
        title="Mathematics & Optimization for AI"
        description="Linear algebra matrix factorizations (LU, SVD), multivariable gradients (∇f), probability distributions, and 1st & 2nd order optimization algorithms."
        reading={module?.reading || 'Mitchell Ch. 2 / Goodfellow Deep Learning Ch. 2–4'}
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Linear Algebra & Matrix Factorizations (LU, SVD)',
          'Multivariable Calculus & Gradient Vectors (∇f)',
          'Probabilistic Foundations & Distributions (Gaussian)',
          'First-Order Optimization (SGD, Momentum, Adam)',
          'Second-Order Optimization (Newton, Hessian, L-BFGS)'
        ]}
      />

      {/* Main Layout: Sidebar + Dynamic Body */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Reusable Left Sidebar Navigation */}
        <ModuleAndToolSidebar
          modules={STEPS.map(s => ({
            id: s.id,
            title: s.title,
            badge: s.badge,
            icon: s.icon,
            isDone: completedSteps.includes(s.id)
          }))}
          activeModuleId={activeMainTab === 'study' ? activeStep : ''}
          onSelectModule={(id) => {
            setActiveMainTab('study');
            setActiveStep(id as StepId);
          }}
          completedCount={completedSteps.length}
          totalCount={STEPS.length}
          tools={[
            {
              id: 'documents-tool',
              title: 'Documents',
              icon: FileText,
              onClick: () => {
                setActiveMainTab('documents');
              },
              isActive: activeMainTab === 'documents',
              badge: `${AI_WEEK2_DOCUMENTS.length} Files`
            },
            {
              id: 'flashcards-tool',
              title: 'Flashcards',
              icon: Sparkles,
              onClick: () => setShowFlashcards(true),
              badge: `${AI_WEEK2_FLASHCARDS.length} Cards`
            },
            {
              id: 'quiz-hub',
              title: 'Practice Quizzes',
              icon: HelpCircle,
              onClick: () => {
                setActiveMainTab('quiz');
                setShowQuizSolutions(false);
              },
              isActive: activeMainTab === 'quiz' && !showQuizSolutions,
              badge: `${totalQuestions} Questions`
            },
            {
              id: 'solutions-tool',
              title: 'Full Solution Guide',
              icon: ListChecks,
              onClick: () => {
                setActiveMainTab('quiz');
                setShowQuizSolutions(true);
              },
              isActive: activeMainTab === 'quiz' && showQuizSolutions,
              badge: 'All Steps'
            }
          ]}
        />

        {/* Center / Right Module Content Workspace */}
        <main className="flex-1 min-w-0 space-y-6">
          {activeMainTab === 'study' && (
            <ModuleTemplate
              moduleId={currentStepMeta.id}
              moduleIndex={currentStepMeta.id}
              totalModules={STEPS.length}
              title={currentStepMeta.title}
              badge={currentStepMeta.badge}
              subtitle={currentStepMeta.subtitle}
              isCompleted={completedSteps.includes(activeStep)}
              onToggleComplete={() => toggleStepComplete(activeStep)}
              hasPrev={Boolean(prevStep)}
              hasNext={Boolean(nextStep)}
              onPrevModule={() => prevStep && setActiveStep(prevStep.id)}
              onNextModule={() => nextStep && setActiveStep(nextStep.id)}
              prevLabel={prevStep ? `Module ${prevStep.id}` : undefined}
              nextLabel={nextStep ? `Module ${nextStep.id}` : undefined}
            >
              {/* Render Specific Module Component */}
              {activeStep === 1 && (
                <Module1LinearAlgebra
                  onGoToQuiz={() => {
                    setActiveQuizStepKey('s1');
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  onOpenFlashcards={() => setShowFlashcards(true)}
                />
              )}
              {activeStep === 2 && (
                <Module2MultivariableCalculus
                  onGoToQuiz={() => {
                    setActiveQuizStepKey('s2');
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  onOpenFlashcards={() => setShowFlashcards(true)}
                />
              )}
              {activeStep === 3 && (
                <Module3Probability
                  onGoToQuiz={() => {
                    setActiveQuizStepKey('s3');
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  onOpenFlashcards={() => setShowFlashcards(true)}
                />
              )}
              {activeStep === 4 && (
                <Module4FirstOrderOpt
                  onGoToQuiz={() => {
                    setActiveQuizStepKey('s4');
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  onOpenFlashcards={() => setShowFlashcards(true)}
                />
              )}
              {activeStep === 5 && (
                <Module5SecondOrderOpt
                  onGoToQuiz={() => {
                    setActiveQuizStepKey('s5');
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  onOpenFlashcards={() => setShowFlashcards(true)}
                />
              )}

              {/* Step Knowledge Check Banner to Jump to Quiz */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Module {activeStep} Concept Knowledge Check</h4>
                    <p className="text-xs text-slate-400">Ready to test your mastery of these concepts? Take the step-specific interactive quiz.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveQuizStepKey(`s${activeStep}`);
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
                >
                  <span>Take Module {activeStep} Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ModuleTemplate>
          )}

          {activeMainTab === 'quiz' && (
            <Week2QuizView
              initialStepKey={activeQuizStepKey}
              onSelectModule={setActiveQuizStepKey}
              showSolutions={showQuizSolutions}
              onToggleSolutions={setShowQuizSolutions}
              onBackToStudy={(stepId) => {
                setActiveMainTab('study');
                setActiveStep(stepId as StepId);
              }}
            />
          )}

          {activeMainTab === 'documents' && (
            <DocumentsTemplate
              title="CMPE-252 Week 02 — Study Documents & Lecture Slides"
              subtitle="Master linear algebra factorizations, multivariable calculus, probabilistic foundations, and 1st & 2nd order optimization with official lecture slides"
              documents={AI_WEEK2_DOCUMENTS}
              onBackToStudy={() => setActiveMainTab('study')}
            />
          )}
        </main>
      </div>

      {/* Reusable Universal Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={AI_WEEK2_FLASHCARDS}
        activeModuleId={activeStep}
        title="CMPE-252 Week 02 — VIP Flashcards"
        subtitle="Master linear algebra factorizations, multivariable calculus, probabilistic foundations, and 1st & 2nd order optimization"
        storageKey="cmpe252_week02_flashcards_mastered"
      />

      {/* Reusable Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default Week02AI;
