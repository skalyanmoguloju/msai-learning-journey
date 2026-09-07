import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Course, SyllabusModule } from '../../../../../types/course';
import {
  ModuleTemplate,
  WeeklyHeaderBanner,
  WeeklySidebar,
  Toast,
  UniversalFlashcardsModal
} from '../../../../common';
import { StepId, STEPS } from './types';
import { AI_WEEK1_FLASHCARDS } from './flashcards';
import { Module1Foundations } from './modules/Module1Foundations';
import { Module2Metrics } from './modules/Module2Metrics';
import { Module3RegressionLoss } from './modules/Module3RegressionLoss';
import { Module4Activations } from './modules/Module4Activations';
import { Module5Optimization } from './modules/Module5Optimization';
import { Module6HardwareTensors } from './modules/Module6HardwareTensors';
import { Week1QuizView } from './modules/Week1QuizView';

const STORAGE_KEY_COMPLETED = 'ml_core_completed';

export interface Week01AIProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week01AI: React.FC<Week01AIProps> = ({ course, module }) => {
  const [activeStep, setActiveStep] = useState<StepId>(1);
  const [activeMainTab, setActiveMainTab] = useState<'study' | 'quiz'>('study');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

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
      localStorage.removeItem('ml_week1_quiz_answers');
    } catch {
      // ignore
    }
    showToast('All Week 01 progress & quiz answers have been reset.');
  }, [showToast]);

  const currentStepMeta = STEPS.find(s => s.id === activeStep) || STEPS[0];
  const prevStep = activeStep > 1 ? STEPS.find(s => s.id === activeStep - 1) : null;
  const nextStep = activeStep < STEPS.length ? STEPS.find(s => s.id === activeStep + 1) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header Banner with built-in reset dialog & toast */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 01'}
        courseCode={course?.code || 'CMPE-252'}
        courseName={course?.name || 'Artificial Intelligence & Data Engineering'}
        title="Foundations of AI & ML Systems"
        description="AI vs ML vs DL, Loss Formulations, Gradient Descent & CNN Sizing"
        progressPct={Math.round((completedSteps.length / STEPS.length) * 100)}
        onResetProgress={handleResetAll}
      />

      {/* Main Layout: Sidebar + Dynamic Body */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Reusable Left Sidebar Navigation */}
        <WeeklySidebar
            modules={STEPS.map(s => ({
              id: s.id,
              title: s.title,
              badge: s.badge,
              icon: s.icon,
              isDone: completedSteps.includes(s.id)
            }))}
            activeModuleId={activeMainTab === 'study' ? activeStep : STEPS[0].id}
            onSelectModule={(id) => {
              setActiveMainTab('study');
              setActiveStep(id as StepId);
            }}
            completedCount={completedSteps.length}
            totalCount={STEPS.length}
            tools={[
              {
                id: 'flashcards-tool',
                title: 'Flashcards',
                icon: Sparkles,
                onClick: () => setShowFlashcards(true),
                badge: `${AI_WEEK1_FLASHCARDS.length} Cards`
              },
              {
                id: 'quiz-hub',
                title: 'Practice Quizzes',
                icon: HelpCircle,
                onClick: () => setActiveMainTab('quiz'),
                isActive: activeMainTab === 'quiz',
                badge: '12 Questions'
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
              extraActions={
                <button
                  onClick={() => setShowFlashcards(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition active:scale-95"
                  title="Open Weekly Concept Flashcards"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Flashcards</span>
                </button>
              }
              hasPrev={Boolean(prevStep)}
              hasNext={Boolean(nextStep)}
              onPrevModule={() => prevStep && setActiveStep(prevStep.id)}
              onNextModule={() => nextStep && setActiveStep(nextStep.id)}
              prevLabel={prevStep ? `Module ${prevStep.id}` : undefined}
              nextLabel={nextStep ? `Module ${nextStep.id}` : undefined}
            >
              {/* Render Specific Module Component */}
              {activeStep === 1 && <Module1Foundations showToast={showToast} />}
              {activeStep === 2 && <Module2Metrics />}
              {activeStep === 3 && <Module3RegressionLoss showToast={showToast} />}
              {activeStep === 4 && <Module4Activations />}
              {activeStep === 5 && <Module5Optimization />}
              {activeStep === 6 && <Module6HardwareTensors />}

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
                  onClick={() => setActiveMainTab('quiz')}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
                >
                  <span>Take Module {activeStep} Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ModuleTemplate>
          )}

          {activeMainTab === 'quiz' && (
            <Week1QuizView
              initialStepKey={`s${activeStep}`}
              onBackToStudy={(stepId) => {
                setActiveMainTab('study');
                setActiveStep(stepId as StepId);
              }}
            />
          )}
        </main>
      </div>

      {/* Reusable Universal Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={AI_WEEK1_FLASHCARDS}
        title="CMPE-252 Week 01 — VIP Flashcards"
        subtitle="Master foundational AI paradigms, classification metrics, regression loss, activations, and CNN architectures"
        storageKey="cmpe252_week01_flashcards_mastered"
      />

      {/* Reusable Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default Week01AI;
