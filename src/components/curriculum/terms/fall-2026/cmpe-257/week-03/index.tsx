import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  FileText,
  HelpCircle,
  Award,
  ArrowRight,
  TreeDeciduous
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
import { ML_WEEK3_MODULES } from './types';
import { ML_WEEK3_FLASHCARDS } from './flashcards';
import { ML_WEEK3_DOCUMENTS } from './documentsData';
import { ML_WEEK3_QUIZ_QUESTIONS } from './quizData';
import {
  Module1WhyDecisionTrees,
  Module2Fundamentals,
  Module3ClassificationSplit,
  Module4RegressionCART,
  Module5BaggingRandomForests,
  Module6GradientBoosting,
  Week3QuizView
} from './modules';

const STORAGE_KEY_COMPLETED = 'cmpe257_week03_completed_modules_v2';
const WEEK_KEY = 'cmpe-257_week-03';

export interface Week03MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week03ML: React.FC<Week03MLProps> = ({ course, module }) => {
  const [activeModuleId, setActiveModuleIdState] = useState<string>(() =>
    curriculumNavStore.getModuleForWeek<string>(WEEK_KEY, 'm1')
  );
  const [activeQuizModuleId, setActiveQuizModuleIdState] = useState<string>(() =>
    curriculumNavStore.getModuleForWeek<string>(`${WEEK_KEY}_quiz`, 'm1')
  );
  const [activeMainTab, setActiveMainTabState] = useState<'study' | 'quiz' | 'documents'>(() =>
    curriculumNavStore.getMainTabForWeek<'study' | 'quiz' | 'documents'>(WEEK_KEY, 'study')
  );

  const setActiveModuleId = useCallback((id: string) => {
    curriculumNavStore.setModuleForWeek(WEEK_KEY, id);
    setActiveModuleIdState(id);
  }, []);

  const setActiveQuizModuleId = useCallback((id: string) => {
    curriculumNavStore.setModuleForWeek(`${WEEK_KEY}_quiz`, id);
    setActiveQuizModuleIdState(id);
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

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return ML_WEEK3_MODULES.map(m => m.id);
    } catch {
      return ML_WEEK3_MODULES.map(m => m.id);
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
      const targetMod = ML_WEEK3_MODULES.find(m => m.id === id);
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
      localStorage.removeItem('cmpe257_week03_quiz_answers');
      localStorage.removeItem('cmpe257_week03_flashcards_mastered');
    } catch {}
    showToast('All Week 03 modules marked as in progress.');
  }, [showToast]);

  const currentMod = ML_WEEK3_MODULES.find(m => m.id === activeModuleId) || ML_WEEK3_MODULES[0];
  const currentModIdx = ML_WEEK3_MODULES.findIndex(m => m.id === activeModuleId);
  const prevMod = currentModIdx > 0 ? ML_WEEK3_MODULES[currentModIdx - 1] : null;
  const nextMod = currentModIdx < ML_WEEK3_MODULES.length - 1 ? ML_WEEK3_MODULES[currentModIdx + 1] : null;
  const progressPct = Math.round((completedModules.length / ML_WEEK3_MODULES.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header Banner */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 03'}
        courseCode={course?.code || 'CMPE-257'}
        courseName={course?.name || 'Machine Learning'}
        title="Decision Trees & Ensemble Methods"
        description="Recursive axis-aligned partitioning, entropy, Gini impurity, CART regression trees, cost-complexity pruning, bagging, Random Forests, and Gradient Boosting (GBDT)."
        reading="Breiman et al. (1984), Breiman (2001), Friedman (2001)"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Why Decision Trees?',
          'Tree Fundamentals & Node Induction',
          'Entropy, Information Gain & Gini Impurity',
          'Regression Trees & Cost-Complexity Pruning',
          'Bagging & Random Forest Decorrelation',
          'Gradient Boosting Residuals & Model Comparison'
        ]}
      />

      {/* Main Layout: Sidebar Navigation + Content Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Module Sidebar */}
        <ModuleAndToolSidebar
          modules={ML_WEEK3_MODULES.map(m => ({
            id: m.id,
            title: m.shortTitle,
            subtitle: m.category,
            badge: `M${m.stepNumber}`,
            icon: m.icon,
            isDone: completedModules.includes(m.id)
          }))}
          activeModuleId={activeMainTab === 'study' ? activeModuleId : ''}
          onSelectModule={(id) => {
            setActiveMainTab('study');
            setActiveModuleId(id as string);
          }}
          completedCount={completedModules.length}
          totalCount={ML_WEEK3_MODULES.length}
          tools={[
            {
              id: 'flashcards',
              title: 'Study Flashcards',
              icon: Award,
              onClick: () => setShowFlashcards(true),
              badge: `${ML_WEEK3_FLASHCARDS.length} Cards`
            },
            {
              id: 'quiz',
              title: 'Practice Quizzes',
              icon: HelpCircle,
              onClick: () => {
                setActiveMainTab('quiz');
                setShowQuizSolutions(false);
              },
              isActive: activeMainTab === 'quiz' && !showQuizSolutions,
              badge: `${ML_WEEK3_QUIZ_QUESTIONS.length} Questions`
            },
            {
              id: 'documents',
              title: 'Lecture Documents',
              icon: FileText,
              onClick: () => setActiveMainTab('documents'),
              isActive: activeMainTab === 'documents',
              badge: 'PDF Slides'
            },
            {
              id: 'solutions',
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
              totalModules={ML_WEEK3_MODULES.length}
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
              {activeModuleId === 'm1' && <Module1WhyDecisionTrees />}
              {activeModuleId === 'm2' && <Module2Fundamentals />}
              {activeModuleId === 'm3' && <Module3ClassificationSplit />}
              {activeModuleId === 'm4' && <Module4RegressionCART />}
              {activeModuleId === 'm5' && <Module5BaggingRandomForests />}
              {activeModuleId === 'm6' && <Module6GradientBoosting />}
            </ModuleTemplate>
          )}

          {activeMainTab === 'quiz' && (
            <Week3QuizView
              initialModuleId={activeQuizModuleId}
              onSelectModule={(modId) => setActiveQuizModuleId(modId)}
              onBackToStudy={(modId) => {
                setActiveMainTab('study');
                setActiveModuleId(modId);
              }}
              showSolutions={showQuizSolutions}
              onToggleSolutions={setShowQuizSolutions}
            />
          )}

          {activeMainTab === 'documents' && (
            <DocumentsTemplate
              documents={ML_WEEK3_DOCUMENTS}
              title="Week 03 Lecture Documents & Resources"
              subtitle="Reference slide decks and materials covering Decision Trees and Ensemble Methods."
            />
          )}
        </main>
      </div>

      {/* Universal Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={ML_WEEK3_FLASHCARDS}
        activeModuleId={activeModuleId}
        title="CMPE-257 Week 03 — Flashcards & Formulas"
        subtitle="Master decision trees, CART, impurity metrics (Entropy, Gini), Bagging, Random Forests, and Gradient Boosting"
        storageKey="cmpe257_week03_flashcards_mastered"
      />

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
