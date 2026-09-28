import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  FileText,
  HelpCircle,
  Award,
  ArrowRight,
  Binary
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
import { ML_WEEK4_MODULES } from './types';
import { ML_WEEK4_FLASHCARDS } from './flashcards';
import { ML_WEEK4_DOCUMENTS } from './documentsData';
import { ML_WEEK4_QUIZ_QUESTIONS } from './quizData';
import {
  Module1InstanceBasedKNN,
  Module2KNNDistanceWeighted,
  Module3GenerativeVsDiscriminative,
  Module4GaussianDiscriminantAnalysis,
  Module5NaiveBayes,
  Module6KMeansClustering,
  Module7GMMandEM,
  Module8JensensELBO,
  Week4QuizView
} from './modules';

const STORAGE_KEY_COMPLETED = 'cmpe257_week04_completed_modules_v2';
const WEEK_KEY = 'cmpe-257_week-04';

export interface Week04MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week04ML: React.FC<Week04MLProps> = ({ course, module }) => {
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
      return ML_WEEK4_MODULES.map(m => m.id);
    } catch {
      return ML_WEEK4_MODULES.map(m => m.id);
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
      const targetMod = ML_WEEK4_MODULES.find(m => m.id === id);
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
      localStorage.removeItem('cmpe257_week04_quiz_answers');
      localStorage.removeItem('cmpe257_week04_flashcards_mastered');
    } catch {}
    showToast('All Week 04 modules marked as in progress.');
  }, [showToast]);

  const currentMod = ML_WEEK4_MODULES.find(m => m.id === activeModuleId) || ML_WEEK4_MODULES[0];
  const currentModIdx = ML_WEEK4_MODULES.findIndex(m => m.id === activeModuleId);
  const prevMod = currentModIdx > 0 ? ML_WEEK4_MODULES[currentModIdx - 1] : null;
  const nextMod = currentModIdx < ML_WEEK4_MODULES.length - 1 ? ML_WEEK4_MODULES[currentModIdx + 1] : null;
  const progressPct = Math.round((completedModules.length / ML_WEEK4_MODULES.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header Banner */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 04'}
        courseCode={course?.code || 'CMPE-257'}
        courseName={course?.name || 'Machine Learning'}
        title="Instance-Based Learning, Generative Classifiers, K-Means & GMM"
        description="KNN distance metrics, weighted voting, Generative vs. Discriminative models, Gaussian Discriminant Analysis, Naive Bayes, K-Means clustering, Gaussian Mixture Models, and the Expectation-Maximization (EM) algorithm."
        reading="Cover & Hart (1967), Ng & Jordan (2001), Dempster et al. (1977)"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Instance-Based Learning & KNN Foundations',
          'KNN Representation, Distance Metrics & Weighting',
          'Generative vs. Discriminative Learning',
          'Gaussian Discriminant Analysis (LDA & QDA)',
          'Naive Bayes & Laplace Smoothing',
          'Unsupervised Learning & K-Means (Lloyd)',
          'Gaussian Mixture Models & EM Algorithm',
          'Jensen’s Inequality, ELBO & Mixture Extensions'
        ]}
      />

      {/* Main Layout: Sidebar Navigation + Content Workspace */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Module Sidebar */}
        <ModuleAndToolSidebar
          modules={ML_WEEK4_MODULES.map(m => ({
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
          totalCount={ML_WEEK4_MODULES.length}
          tools={[
            {
              id: 'flashcards',
              title: 'Study Flashcards',
              icon: Award,
              onClick: () => setShowFlashcards(true),
              badge: `${ML_WEEK4_FLASHCARDS.length} Cards`
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
              badge: `${ML_WEEK4_QUIZ_QUESTIONS.length} Questions`
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
              totalModules={ML_WEEK4_MODULES.length}
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
              {activeModuleId === 'm1' && <Module1InstanceBasedKNN />}
              {activeModuleId === 'm2' && <Module2KNNDistanceWeighted />}
              {activeModuleId === 'm3' && <Module3GenerativeVsDiscriminative />}
              {activeModuleId === 'm4' && <Module4GaussianDiscriminantAnalysis />}
              {activeModuleId === 'm5' && <Module5NaiveBayes />}
              {activeModuleId === 'm6' && <Module6KMeansClustering />}
              {activeModuleId === 'm7' && <Module7GMMandEM />}
              {activeModuleId === 'm8' && <Module8JensensELBO />}
            </ModuleTemplate>
          )}

          {activeMainTab === 'quiz' && (
            <Week4QuizView
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
              documents={ML_WEEK4_DOCUMENTS}
              title="Week 04 Lecture Documents & Resources"
              subtitle="Reference slide decks and materials covering Instance-Based Learning, Generative Classifiers, K-Means & GMM/EM."
            />
          )}
        </main>
      </div>

      {/* Universal Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={ML_WEEK4_FLASHCARDS}
        activeModuleId={activeModuleId}
        title="CMPE-257 Week 04 — Flashcards & Formulas"
        subtitle="Master KNN, Mahalanobis distance, GDA, Naive Bayes, Lloyd K-Means, GMM, EM, and Jensen's ELBO"
        storageKey="cmpe257_week04_flashcards_mastered"
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
