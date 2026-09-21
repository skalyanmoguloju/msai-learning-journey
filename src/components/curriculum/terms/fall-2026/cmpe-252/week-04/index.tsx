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
import { AI_WEEK4_FLASHCARDS } from './flashcards';
import { AI_WEEK4_QUIZ } from './quizData';
import { AI_WEEK4_DOCUMENTS } from './documentsData';
import {
  Module1DeepLearningFeatureLearning,
  Module2WhyCNNs,
  Module3ImportantCNNArchitectures,
  Module4TransformersSelfAttention,
  Module5BasicRNNs,
  Module6RNNLossTraining,
  Module7GRU,
  Module8LSTM,
  Module9BiRNNs,
  Week4QuizView
} from './modules';

const STORAGE_KEY_COMPLETED = 'cmpe252_week04_completed';
const WEEK_KEY = 'cmpe-252_week-04';

export interface Week04AIProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week04AI: React.FC<Week04AIProps> = ({ course, module }) => {
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
    return Object.values(AI_WEEK4_QUIZ).reduce((acc, curr) => acc + curr.questions.length, 0);
  }, []);

  const handleResetProgress = useCallback(() => {
    setCompletedSteps([]);
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem('cmpe252_week4_quiz_answers');
      localStorage.removeItem('cmpe252_week4_flashcards_mastered');
    } catch {}
    showToast('Reset Week 04 completion progress.');
  }, [showToast]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 04'}
        courseCode={course?.code || 'CMPE-252'}
        courseName={course?.name || 'Artificial Intelligence and Data Engineering'}
        title="Deep Neural Networks, Sequence & Spatial Models"
        description="Convolutional Neural Networks, receptive fields, modern vision backbones, self-attention mechanisms, and recurrent architectures (RNN, GRU, LSTM, BiRNN)."
        reading="Goodfellow Ch. 9 & 10 / Session 4 Lectures"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetProgress}
        topics={[
          'Deep Learning & Feature Learning',
          'Why Convolutional Neural Networks?',
          'CNN Building Blocks',
          'Important CNN Architectures',
          'Transformers & Self-Attention',
          'Basic Recurrent Neural Networks',
          'RNN Loss & Training (BPTT)',
          'Gated Recurrent Unit (GRU)',
          'Long Short-Term Memory (LSTM)',
          'Bidirectional RNNs'
        ]}
      />

      {/* Main Grid: Sidebar + Body */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Sidebar with 10 Modules & Tools */}
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
              badge: `${AI_WEEK4_DOCUMENTS.length} File${AI_WEEK4_DOCUMENTS.length === 1 ? '' : 's'}`
            },
            {
              id: 'flashcards-tool',
              title: 'Flashcards',
              icon: Sparkles,
              onClick: () => setShowFlashcards(true),
              badge: `${AI_WEEK4_FLASHCARDS.length} Cards`
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
              {activeStep === 1 && <Module1DeepLearningFeatureLearning />}
              {activeStep === 2 && <Module2WhyCNNs />}
              {activeStep === 3 && <Module3ImportantCNNArchitectures />}
              {activeStep === 4 && <Module4TransformersSelfAttention />}
              {activeStep === 5 && <Module5BasicRNNs />}
              {activeStep === 6 && <Module6RNNLossTraining />}
              {activeStep === 7 && <Module7GRU />}
              {activeStep === 8 && <Module8LSTM />}
              {activeStep === 9 && <Module9BiRNNs />}

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
            <Week4QuizView
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
              documents={AI_WEEK4_DOCUMENTS}
              onBackToStudy={() => setActiveMainTab('study')}
            />
          )}
        </main>
      </div>

      {/* Universal Flashcards Modal */}
      {showFlashcards && (
        <UniversalFlashcardsModal
          cards={AI_WEEK4_FLASHCARDS}
          isOpen={showFlashcards}
          onClose={() => setShowFlashcards(false)}
          storageKey="cmpe252_week4_flashcards_mastered"
          title="CMPE-252 Week 04 Mastery Flashcards"
          subtitle="Deep Neural Networks, Sequence & Spatial Models"
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

export default Week04AI;
