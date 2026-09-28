import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  FileText,
  HelpCircle,
  Award,
  ArrowRight,
  Split
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
import { ML_WEEK5_MODULES } from './types';
import { ML_WEEK5_FLASHCARDS } from './flashcards';
import { ML_WEEK5_DOCUMENTS } from './documentsData';
import { ML_WEEK5_QUIZ_QUESTIONS } from './quizData';
import {
  Module1HyperplanesLinear,
  Module2MaximalMargin,
  Module3SupportVectorSoftMargin,
  Module4FeatureExpansionNonlinear,
  Module5SVMKernelFunctions,
  Module6MulticlassSVMConfidence,
  Module7RegularizationBiasVariance,
  Module8OptimizationMethods,
  Week5QuizView
} from './modules';

const STORAGE_KEY_COMPLETED = 'cmpe257_week05_completed_modules';
const WEEK_KEY = 'cmpe-257_week-05';

export interface Week05MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week05ML: React.FC<Week05MLProps> = ({ course, module }) => {
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
      return stored ? JSON.parse(stored) : [];
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
      const targetMod = ML_WEEK5_MODULES.find(m => m.id === id);
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
      localStorage.removeItem('cmpe257_week05_quiz_answers');
      localStorage.removeItem('cmpe257_week05_flashcards_mastered');
    } catch {}
    showToast('All Week 05 modules reset.');
  }, [showToast]);

  const currentMod = ML_WEEK5_MODULES.find(m => m.id === activeModuleId) || ML_WEEK5_MODULES[0];
  const currentModIdx = ML_WEEK5_MODULES.findIndex(m => m.id === activeModuleId);
  const prevMod = currentModIdx > 0 ? ML_WEEK5_MODULES[currentModIdx - 1] : null;
  const nextMod = currentModIdx < ML_WEEK5_MODULES.length - 1 ? ML_WEEK5_MODULES[currentModIdx + 1] : null;
  const progressPct = Math.round((completedModules.length / ML_WEEK5_MODULES.length) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <WeeklyHeaderBanner
        week={module?.week || 'Week 05'}
        courseCode={course?.code || 'CMPE-257'}
        courseName={course?.name || 'Machine Learning'}
        title="Support Vector Machines, Margins, Kernels & Optimization"
        description="Hyperplanes, maximal-margin classification, soft margins and slack variables, feature expansion, the Kernel trick, multiclass SVM, regularization, and optimization algorithms."
        reading="Cortes & Vapnik (1995), Mercer (1909), Platt (1998)"
        status={progressPct === 100 ? 'completed' : progressPct > 0 ? 'in-progress' : 'upcoming'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Hyperplanes & Linear Classification',
          'Maximal-Margin Classifier',
          'Soft Margins & Slack Variables',
          'Feature Expansion & Nonlinear Boundaries',
          'SVMs & Kernel Functions (RBF, Poly)',
          'Multiclass SVM & Platt Calibration',
          'Regularization & Bias-Variance',
          'Optimization Methods (SMO, KKT)'
        ]}
      />

      {/* Main Tab Navigation */}
      <div className="flex border-b border-slate-700/60 pb-1 gap-2">
        <button
          onClick={() => {
            setActiveMainTab('study');
            setShowQuizSolutions(false);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition-colors ${
            activeMainTab === 'study' && !showQuizSolutions
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Split className="w-4 h-4" /> Study Modules
        </button>

        <button
          onClick={() => {
            setActiveMainTab('quiz');
            setShowQuizSolutions(false);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition-colors ${
            activeMainTab === 'quiz' && !showQuizSolutions
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Practice Quizzes
        </button>

        <button
          onClick={() => {
            setActiveMainTab('documents');
            setShowQuizSolutions(false);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition-colors ${
            activeMainTab === 'documents' && !showQuizSolutions
              ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Documents
        </button>

        <button
          onClick={() => setShowFlashcards(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold text-slate-400 hover:text-amber-300 transition-colors ml-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> Flashcards
        </button>

        <button
          onClick={() => {
            setActiveMainTab('quiz');
            setShowQuizSolutions(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition-colors ${
            showQuizSolutions
              ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400 font-bold'
              : 'text-slate-400 hover:text-emerald-300'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" /> Full Solution Guide
        </button>
      </div>

      {/* Main Tab Content */}
      {activeMainTab === 'study' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ModuleAndToolSidebar
              modules={ML_WEEK5_MODULES.map(m => ({
                id: m.id,
                title: m.title,
                shortTitle: m.shortTitle,
                stepNumber: m.stepNumber,
                isCompleted: completedModules.includes(m.id)
              }))}
              activeModuleId={activeModuleId}
              onSelectModule={setActiveModuleId}
            />
          </div>

          <div className="lg:col-span-3">
            <ModuleTemplate
              moduleId={currentMod.stepNumber}
              moduleIndex={currentMod.stepNumber}
              totalModules={ML_WEEK5_MODULES.length}
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
              {activeModuleId === 'm1' && <Module1HyperplanesLinear />}
              {activeModuleId === 'm2' && <Module2MaximalMargin />}
              {activeModuleId === 'm3' && <Module3SupportVectorSoftMargin />}
              {activeModuleId === 'm4' && <Module4FeatureExpansionNonlinear />}
              {activeModuleId === 'm5' && <Module5SVMKernelFunctions />}
              {activeModuleId === 'm6' && <Module6MulticlassSVMConfidence />}
              {activeModuleId === 'm7' && <Module7RegularizationBiasVariance />}
              {activeModuleId === 'm8' && <Module8OptimizationMethods />}
            </ModuleTemplate>
          </div>
        </div>
      )}

      {activeMainTab === 'quiz' && (
        <Week5QuizView
          initialModuleId={activeQuizModuleId}
          onSelectModule={setActiveQuizModuleId}
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
          documents={ML_WEEK5_DOCUMENTS}
          title="CMPE-257 Week 05 Course Materials"
          subtitle="Lecture slides, recitations, and supplementary readings for Support Vector Machines."
        />
      )}

      {/* Universal Flashcards Modal */}
      {showFlashcards && (
        <UniversalFlashcardsModal
          isOpen={showFlashcards}
          onClose={() => setShowFlashcards(false)}
          flashcards={ML_WEEK5_FLASHCARDS}
          storageKey="cmpe257_week05_flashcards_mastered"
          title="CMPE-257 Week 05 Flashcards"
          subtitle="Support Vector Machines, Margins, Kernels & Optimization"
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};
