import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
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
import { ML_WEEK2_MODULES } from './types';
import { ML_WEEK2_FLASHCARDS } from './flashcards';
import { ML_WEEK2_DOCUMENTS } from './documentsData';
import { ModuleReadingView } from './modules/ModuleReadingView';

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
  const [activeMainTab, setActiveMainTabState] = useState<'study' | 'documents'>(() =>
    curriculumNavStore.getMainTabForWeek<'study' | 'documents'>(WEEK_KEY, 'study')
  );

  const setActiveModuleId = useCallback((id: string) => {
    curriculumNavStore.setModuleForWeek(WEEK_KEY, id);
    setActiveModuleIdState(id);
  }, []);

  const setActiveMainTab = useCallback((tab: 'study' | 'documents') => {
    curriculumNavStore.setMainTabForWeek(WEEK_KEY, tab);
    setActiveMainTabState(tab);
  }, []);

  const [showFlashcards, setShowFlashcards] = useState(false);
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
        ? `Marked "${targetMod?.shortTitle || id}" as yet to complete reading`
        : `Completed reading "${targetMod?.shortTitle || id}"! 🎉`
      );
      return next;
    });
  }, [showToast]);

  const handleResetAll = useCallback(() => {
    setCompletedModules([]);
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem('cmpe257_week02_flashcards_mastered');
    } catch {}
    showToast('All Week 02 modules marked as yet to complete reading.');
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
            title: `${mod.stepNumber}. ${mod.shortTitle}`,
            badge: completedModules.includes(mod.id) ? 'Completed' : 'Yet to Read',
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
              badge={`${currentMod.category} • Module ${currentMod.stepNumber} of ${ML_WEEK2_MODULES.length}`}
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
              <ModuleReadingView
                module={currentMod}
                isCompleted={completedModules.includes(currentMod.id)}
                onToggleComplete={() => toggleModuleComplete(currentMod.id)}
                onOpenFlashcards={() => setShowFlashcards(true)}
              />
            </ModuleTemplate>
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
