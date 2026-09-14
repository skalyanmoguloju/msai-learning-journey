import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  FileText,
  HelpCircle,
  Award,
  ArrowRight
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
import { ML_WEEK2_MODULES } from './types';
import { ML_WEEK2_FLASHCARDS } from './flashcards';
import { ML_WEEK2_DOCUMENTS } from './documentsData';
import { ML_WEEK2_QUIZ_QUESTIONS } from './quizData';
import { Week2QuizView } from './modules/Week2QuizView';
import {
  Module1WhyLogistic,
  Module2Sigmoid,
  Module3BernoulliLikelihood,
  Module4DatasetLikelihood,
  Module5GradientAscent,
  Module6GLM,
  Module7ExponentialFamily,
  Module8ConstructingGLM,
  Module9NaiveBayes,
  Module10MLEvsMAP
} from './modules';

const STORAGE_KEY_COMPLETED = 'cmpe257_week02_completed_modules';
const WEEK_KEY = 'cmpe-257_week-02';

export interface Week02MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week02ML: React.FC<Week02MLProps> = ({ course, module }) => {
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

  // All 10 modules start as "yet to complete reading" (empty completed array)
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
      const targetMod = ML_WEEK2_MODULES.find(m => m.id === id);
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
      localStorage.removeItem('cmpe257_week02_quiz_answers');
      localStorage.removeItem('cmpe257_week02_flashcards_mastered');
    } catch {}
    showToast('All Week 02 modules marked as yet to complete.');
  }, [showToast]);

  const currentMod = ML_WEEK2_MODULES.find(m => m.id === activeModuleId) || ML_WEEK2_MODULES[0];
  const currentModIdx = ML_WEEK2_MODULES.findIndex(m => m.id === activeModuleId);
  const prevMod = currentModIdx > 0 ? ML_WEEK2_MODULES[currentModIdx - 1] : null;
  const nextMod = currentModIdx < ML_WEEK2_MODULES.length - 1 ? ML_WEEK2_MODULES[currentModIdx + 1] : null;
  const progressPct = Math.round((completedModules.length / ML_WEEK2_MODULES.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Reusable Header Banner */}
      <WeeklyHeaderBanner
        week={module?.week || 'Week 02'}
        courseCode={course?.code || 'CMPE-257'}
        courseName={course?.name || 'Machine Learning'}
        title="Logistic Regression, GLMs & Probabilistic Models"
        description="Logistic classification, sigmoid functions, Bernoulli maximum likelihood, generalized linear models (GLMs), exponential families, Naive Bayes, and MLE vs MAP estimation."
        reading="CS229 Notes Chapter 1 & Chapter 2"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Why logistic regression is needed',
          'Sigmoid function',
          'Bernoulli probability and one-example likelihood',
          'Dataset likelihood and log-likelihood',
          'Gradient derivation and gradient ascent',
          'Generalized Linear Models',
          'Exponential family',
          'Constructing GLMs',
          'Naive Bayes',
          'MLE versus MAP'
        ]}
      />

      {/* Main Grid: Sidebar + Body */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Reusable Left Sidebar with 10 Modules */}
        <ModuleAndToolSidebar
          modules={ML_WEEK2_MODULES.map(mod => ({
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
          totalCount={ML_WEEK2_MODULES.length}
          tools={[
            {
              id: 'documents-tool',
              title: 'Documents',
              icon: FileText,
              onClick: () => setActiveMainTab('documents'),
              isActive: activeMainTab === 'documents',
              badge: `${ML_WEEK2_DOCUMENTS.length} File${ML_WEEK2_DOCUMENTS.length === 1 ? '' : 's'}`
            },
            {
              id: 'flashcards-tool',
              title: 'Flashcards',
              icon: Sparkles,
              onClick: () => setShowFlashcards(true),
              badge: `${ML_WEEK2_FLASHCARDS.length} Cards`
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
              badge: `${ML_WEEK2_QUIZ_QUESTIONS.length} Questions`
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
              totalModules={ML_WEEK2_MODULES.length}
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
              {activeModuleId === 'm1' && <Module1WhyLogistic />}
              {activeModuleId === 'm2' && <Module2Sigmoid />}
              {activeModuleId === 'm3' && <Module3BernoulliLikelihood />}
              {activeModuleId === 'm4' && <Module4DatasetLikelihood />}
              {activeModuleId === 'm5' && <Module5GradientAscent />}
              {activeModuleId === 'm6' && <Module6GLM />}
              {activeModuleId === 'm7' && <Module7ExponentialFamily />}
              {activeModuleId === 'm8' && <Module8ConstructingGLM />}
              {activeModuleId === 'm9' && <Module9NaiveBayes />}
              {activeModuleId === 'm10' && <Module10MLEvsMAP />}

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
            <Week2QuizView
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

          {activeMainTab === 'documents' && (
            <DocumentsTemplate
              documents={ML_WEEK2_DOCUMENTS}
              onBackToStudy={() => setActiveMainTab('study')}
            />
          )}
        </main>
      </div>

      {/* Universal Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={ML_WEEK2_FLASHCARDS}
        activeModuleId={activeModuleId}
        title="CMPE-257 Week 02 — Flashcards & Formulas"
        subtitle="Master logistic regression derivations, GLM link functions, exponential family canon, and Bayesian MAP estimation"
        storageKey="cmpe257_week02_flashcards_mastered"
      />

      {/* Reusable Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Week02ML;
