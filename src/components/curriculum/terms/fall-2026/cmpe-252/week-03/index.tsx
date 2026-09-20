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
import { AI_WEEK3_FLASHCARDS } from './flashcards';
import { AI_WEEK3_QUIZ } from './quizData';
import { AI_WEEK3_DOCUMENTS } from './documentsData';
import {
  Module1Perceptrons,
  Module2PerceptronTraining,
  Module3PerceptronsToNN,
  Module4ActivationFunctions,
  Module5TrainingMultilayerNN,
  Module6ForwardBackprop,
  Module7UniversalApproximation,
  Module8WeightInit,
  Module9MonitoringTraining,
  Module10BeyondSupervised,
  Module11FewShotTransfer,
  Module12ContrastiveSimCLR,
  Week3QuizView
} from './modules';

const STORAGE_KEY_COMPLETED = 'cmpe252_week03_completed_v2';
const WEEK_KEY = 'cmpe-252_week-03';

export interface Week03AIProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week03AI: React.FC<Week03AIProps> = ({ course, module }) => {
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
      const savedV2 = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (savedV2) return JSON.parse(savedV2);

      // Clean up legacy storage if it only has the accidentally injected [3]
      const legacy = localStorage.getItem('cmpe252_week03_completed');
      if (legacy) {
        localStorage.removeItem('cmpe252_week03_completed');
        const parsed = JSON.parse(legacy);
        if (Array.isArray(parsed)) {
          // Exclude the injected 3
          return parsed.filter((s: number) => s !== 3) as StepId[];
        }
      }
      return [];
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
      showToast(exists ? `Marked Module ${id} as Incomplete` : `Completed Module ${id}! 🎉`);
      return next;
    });
  }, [showToast]);

  const currentStepMeta = useMemo(() => {
    return STEPS.find(s => s.id === activeStep) || STEPS[0];
  }, [activeStep]);

  const currentIdx = STEPS.findIndex(s => s.id === activeStep);
  const prevStep = currentIdx > 0 ? STEPS[currentIdx - 1] : null;
  const nextStep = currentIdx < STEPS.length - 1 ? STEPS[currentIdx + 1] : null;

  const progressPct = Math.round((completedSteps.length / STEPS.length) * 100);

  const totalQuestions = useMemo(() => {
    return Object.values(AI_WEEK3_QUIZ).reduce((acc, curr) => acc + curr.questions.length, 0);
  }, []);

  const handleResetProgress = useCallback(() => {
    setCompletedSteps([]);
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem('cmpe252_week3_quiz_answers');
      localStorage.removeItem('cmpe252_week3_flashcards_mastered');
    } catch {}
    showToast('Reset Week 03 completion progress.');
  }, [showToast]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 03'}
        courseCode={course?.code || 'CMPE-252'}
        courseName={course?.name || 'Artificial Intelligence and Data Engineering'}
        title="Neural Networks & Back-propagation"
        description="Perceptrons, activation functions, multilayer perceptrons, dynamic gradient computation, universal approximation, weight initialization, training monitoring, and transfer / contrastive learning."
        reading="Goodfellow Ch. 6 / Session 3 Lectures"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetProgress}
        topics={[
          'Perceptrons & Linear Classifiers',
          'Perceptron Training',
          'Perceptrons to Neural Networks',
          'Activation Functions',
          'Training Multilayer Neural Networks',
          'Forward & Backpropagation',
          'Universal Approximation',
          'Weight Initialization',
          'Monitoring Training',
          'Beyond Supervised Learning',
          'Few-Shot & Transfer Learning',
          'Contrastive Learning & SimCLR'
        ]}
      />

      {/* Main Grid: Sidebar + Body */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Sidebar with 12 Modules & Tools (Responsive Tiles for Foldables/Mobile) */}
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
            setActiveStep(Number(id) as StepId);
          }}
          completedCount={completedSteps.length}
          totalCount={STEPS.length}
          tools={[
            {
              id: 'documents-tool',
              title: 'Documents',
              icon: FileText,
              onClick: () => setActiveMainTab('documents'),
              isActive: activeMainTab === 'documents',
              badge: `${AI_WEEK3_DOCUMENTS.length} File${AI_WEEK3_DOCUMENTS.length === 1 ? '' : 's'}`
            },
            {
              id: 'flashcards-tool',
              title: 'Flashcards',
              icon: Sparkles,
              onClick: () => setShowFlashcards(true),
              badge: `${AI_WEEK3_FLASHCARDS.length} Cards`
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

        {/* Content Workspace */}
        <main className="flex-1 min-w-0 space-y-6 w-full">
          {activeMainTab === 'study' && (
            <ModuleTemplate
              moduleId={currentStepMeta.id}
              moduleIndex={currentStepMeta.id}
              totalModules={STEPS.length}
              badge={currentStepMeta.badge}
              title={currentStepMeta.title}
              subtitle={currentStepMeta.subtitle}
              isCompleted={completedSteps.includes(currentStepMeta.id)}
              onToggleComplete={() => toggleStepComplete(currentStepMeta.id)}
              hasPrev={Boolean(prevStep)}
              hasNext={Boolean(nextStep)}
              onPrevModule={() => prevStep && setActiveStep(prevStep.id)}
              onNextModule={() => nextStep && setActiveStep(nextStep.id)}
              prevLabel={prevStep ? `Module ${prevStep.id}` : undefined}
              nextLabel={nextStep ? `Module ${nextStep.id}` : undefined}
            >
              {/* Dynamic Module Component Render */}
              {activeStep === 1 && <Module1Perceptrons />}
              {activeStep === 2 && <Module2PerceptronTraining />}
              {activeStep === 3 && <Module3PerceptronsToNN />}
              {activeStep === 4 && <Module4ActivationFunctions />}
              {activeStep === 5 && <Module5TrainingMultilayerNN />}
              {activeStep === 6 && <Module6ForwardBackprop />}
              {activeStep === 7 && <Module7UniversalApproximation />}
              {activeStep === 8 && <Module8WeightInit />}
              {activeStep === 9 && <Module9MonitoringTraining />}
              {activeStep === 10 && <Module10BeyondSupervised />}
              {activeStep === 11 && <Module11FewShotTransfer />}
              {activeStep === 12 && <Module12ContrastiveSimCLR />}

              {/* Assessment Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Module {currentStepMeta.id} Knowledge Check</h4>
                    <p className="text-xs text-slate-400">Ready to test mastery of this module's concepts?</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveQuizStepKey(`s${currentStepMeta.id}`);
                    setActiveMainTab('quiz');
                    setShowQuizSolutions(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
                >
                  <span>Take Module Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ModuleTemplate>
          )}

          {activeMainTab === 'quiz' && (
            <Week3QuizView
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
              documents={AI_WEEK3_DOCUMENTS}
              onBackToStudy={() => setActiveMainTab('study')}
            />
          )}
        </main>
      </div>

      {/* Universal Flashcards Modal */}
      {showFlashcards && (
        <UniversalFlashcardsModal
          cards={AI_WEEK3_FLASHCARDS}
          isOpen={showFlashcards}
          onClose={() => setShowFlashcards(false)}
          storageKey="cmpe252_week3_flashcards_mastered"
          title="CMPE-252 Week 03 Mastery Flashcards"
          subtitle="Neural Networks & Back-propagation Concepts"
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default Week03AI;
