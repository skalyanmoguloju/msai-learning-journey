import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Course, SyllabusModule } from '../../../../../../types/course';
import {
  ModuleTemplate,
  WeeklyHeaderBanner,
  ModuleAndToolSidebar,
  Toast,
  UniversalFlashcardsModal,
  curriculumNavStore
} from '../../../../common';
import { ML_MODULES } from './types';
import { ML_WEEK1_FLASHCARDS } from './flashcards';
import { Module1Fundamentals } from './modules/Module1Fundamentals';
import { Module2SupervisedLinear } from './modules/Module2SupervisedLinear';
import { Module3Unsupervised } from './modules/Module3Unsupervised';
import { Module4Reinforcement } from './modules/Module4Reinforcement';
import { Module5ModelAssessment } from './modules/Module5ModelAssessment';
import { Module6ModernParadigms } from './modules/Module6ModernParadigms';
import { Week1QuizView } from './modules/Week1QuizView';
import { ML_QUIZ_QUESTIONS } from './quizData';

const STORAGE_KEY_COMPLETED = 'cmpe257_week01_completed_modules';
const WEEK_KEY = 'cmpe-257_week-01';

export interface Week01MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week01ML: React.FC<Week01MLProps> = ({ course, module }) => {
  const [activeModuleId, setActiveModuleIdState] = useState<string>(() =>
    curriculumNavStore.getModuleForWeek<string>(WEEK_KEY, 'm1')
  );
  const [activeQuizModuleId, setActiveQuizModuleIdState] = useState<string>(() =>
    curriculumNavStore.getModuleForWeek<string>(`${WEEK_KEY}_quiz`, 'm1')
  );
  const [activeMainTab, setActiveMainTabState] = useState<'study' | 'quiz'>(() =>
    curriculumNavStore.getMainTabForWeek(WEEK_KEY, 'study')
  );

  const setActiveModuleId = useCallback((id: string) => {
    curriculumNavStore.setModuleForWeek(WEEK_KEY, id);
    setActiveModuleIdState(id);
  }, []);

  const setActiveQuizModuleId = useCallback((id: string) => {
    curriculumNavStore.setModuleForWeek(`${WEEK_KEY}_quiz`, id);
    setActiveQuizModuleIdState(id);
  }, []);

  const setActiveMainTab = useCallback((tab: 'study' | 'quiz') => {
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

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedModules));
    } catch {}
  }, [completedModules]);

  const showToast = useCallback((msg: string) => setToastMessage(msg), []);

  const toggleModuleComplete = useCallback((id: string) => {
    setCompletedModules(prev => {
      const isDone = prev.includes(id);
      const next = isDone ? prev.filter(x => x !== id) : [...prev, id];
      const targetMod = ML_MODULES.find(m => m.id === id);
      showToast(isDone
        ? `Marked "${targetMod?.shortTitle || id}" as incomplete`
        : `Completed "${targetMod?.shortTitle || id}"! 🎉`
      );
      return next;
    });
  }, [showToast]);

  const handleResetAll = useCallback(() => {
    setCompletedModules([]);
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem('cmpe257_week01_quiz_answers');
      localStorage.removeItem('cmpe257_week01_flashcards_mastered');
    } catch {}
    showToast('All Week 01 progress & quiz answers have been reset.');
  }, [showToast]);

  const currentMod = ML_MODULES.find(m => m.id === activeModuleId) || ML_MODULES[0];
  const currentModIdx = ML_MODULES.findIndex(m => m.id === activeModuleId);
  const prevMod = currentModIdx > 0 ? ML_MODULES[currentModIdx - 1] : null;
  const nextMod = currentModIdx < ML_MODULES.length - 1 ? ML_MODULES[currentModIdx + 1] : null;
  const progressPct = Math.round((completedModules.length / ML_MODULES.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header Banner */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 01'}
        courseCode={course?.code || 'CMPE-257'}
        courseName={course?.name || 'Machine Learning'}
        title="Introduction to Machine Learning"
        description="Fundamental principles, algorithms, applications, mathematical modeling, and learning feasibility."
        reading="CS229 Notes Section 1 & Syllabus"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Supervised vs Unsupervised Learning',
          'Feasibility of Learning',
          'Generalization Principles',
          'Linear Algebra & Calculus Foundations',
          'Gradient Descent & Normal Equations',
          'Modern ML Paradigms (Software 2.0)'
        ]}
      />

      {/* Main Grid: Sidebar + Body */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Reusable Left Sidebar */}
        <ModuleAndToolSidebar
          modules={ML_MODULES.map(mod => ({
            id: mod.id,
            title: mod.shortTitle,
            badge: mod.category,
            icon: mod.icon,
            isDone: completedModules.includes(mod.id)
          }))}
          activeModuleId={activeMainTab === 'study' ? activeModuleId : ''}
          onSelectModule={(id) => {
            setActiveMainTab('study');
            setActiveModuleId(id as string);
          }}
          completedCount={completedModules.length}
          totalCount={ML_MODULES.length}
          tools={[
            {
              id: 'flashcards-tool',
              title: 'Flashcards',
              icon: Sparkles,
              onClick: () => setShowFlashcards(true),
              badge: `${ML_WEEK1_FLASHCARDS.length} Cards`
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
              badge: `${ML_QUIZ_QUESTIONS.length} Questions`
            },
            {
              id: 'solutions-tool',
              title: 'Full Solution Guide',
              icon: HelpCircle,
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
              moduleId={currentMod.stepNumber}
              moduleIndex={currentMod.stepNumber}
              totalModules={ML_MODULES.length}
              badge={currentMod.category}
              title={currentMod.title}
              subtitle={currentMod.description}
              isCompleted={completedModules.includes(currentMod.id)}
              onToggleComplete={() => toggleModuleComplete(currentMod.id)}
              hasPrev={Boolean(prevMod)}
              hasNext={Boolean(nextMod)}
              onPrevModule={() => prevMod && setActiveModuleId(prevMod.id)}
              onNextModule={() => nextMod && setActiveModuleId(nextMod.id)}
              prevLabel={prevMod ? `Module ${prevMod.stepNumber}` : undefined}
              nextLabel={nextMod ? `Module ${nextMod.stepNumber}` : undefined}
            >
              {/* Render specific module component */}
              {activeModuleId === 'm1' && <Module1Fundamentals />}
              {activeModuleId === 'm2' && <Module2SupervisedLinear />}
              {activeModuleId === 'm3' && <Module3Unsupervised />}
              {activeModuleId === 'm4' && <Module4Reinforcement />}
              {activeModuleId === 'm5' && <Module5ModelAssessment />}
              {activeModuleId === 'm6' && <Module6ModernParadigms />}

              {/* Knowledge Check Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Module {currentMod.stepNumber} Knowledge Check</h4>
                    <p className="text-xs text-slate-400">Ready to test mastery of this module's concepts?</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveQuizModuleId(currentMod.id);
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
            <Week1QuizView
              initialModuleId={activeQuizModuleId}
              onSelectModule={setActiveQuizModuleId}
              showSolutions={showQuizSolutions}
              onToggleSolutions={setShowQuizSolutions}
              onBackToStudy={(moduleId) => {
                setActiveMainTab('study');
                setActiveModuleId(moduleId);
              }}
            />
          )}
        </main>
      </div>

      {/* Reusable Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={ML_WEEK1_FLASHCARDS}
        activeModuleId={activeModuleId}
        title="CMPE-257 Week 01 — Flashcards &amp; Formulas"
        subtitle="Master foundational machine learning theories, generalization bounds, regression formulas, and optimization"
        storageKey="cmpe257_week01_flashcards_mastered"
      />

      {/* Reusable Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Week01ML;
