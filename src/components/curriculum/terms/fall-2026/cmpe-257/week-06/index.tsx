import React, { useState, useEffect, useCallback } from 'react';
import { Course, SyllabusModule } from '../../../../../../types/course';
import {
  WeeklyHeaderBanner,
  ModuleAndToolSidebar,
  ModuleTemplate,
  DocumentsTemplate,
  curriculumNavStore
} from '../../../../common';
import { ML_WEEK6_MODULES } from './types';
import { ML_WEEK6_DOCUMENTS } from './documentsData';
import { Module1MidtermPrep } from './modules';
import { FileText } from 'lucide-react';

const STORAGE_KEY_COMPLETED = 'cmpe257_week06_completed_modules';
const WEEK_KEY = 'cmpe-257_week-06';

export interface Week06MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week06ML: React.FC<Week06MLProps> = ({ course, module }) => {
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
      const targetMod = ML_WEEK6_MODULES.find(m => m.id === id);
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
    } catch {}
    showToast('Week 06 progress reset.');
  }, [showToast]);

  const currentMod = ML_WEEK6_MODULES[0];
  const progressPct = completedModules.length > 0 ? 100 : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <WeeklyHeaderBanner
        week={module?.week || 'Week 06'}
        courseCode={course?.code || 'CMPE-257'}
        courseName={course?.name || 'Machine Learning'}
        title="MidTerm Exam Prep"
        description="Comprehensive midterm preparation: official exam format & rules, review of supervised learning theory, and worked practice problems."
        reading="Midterm Exam Prep Slides & CS229 Cheatsheet"
        status={progressPct === 100 ? 'completed' : 'in-progress'}
        progressPct={progressPct}
        onResetProgress={handleResetAll}
        topics={[
          'Exam Logistics (ENG 337, 120 mins, 25%)',
          'Cheatsheet & Calculator Rules',
          'Decision Trees & Split Criteria Review',
          'Linear vs Kernel SVM & Outlier Sensitivity',
          'Generative vs Discriminative Classifiers',
          'Chi-Square Independence Test',
          'Covariance Matrix Derivation'
        ]}
      />

      {/* Main Layout: Sidebar Navigation + Content Workspace */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Module Sidebar */}
        <ModuleAndToolSidebar
          modules={ML_WEEK6_MODULES.map(m => ({
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
          totalCount={ML_WEEK6_MODULES.length}
          tools={[
            {
              id: 'documents',
              title: 'Documents',
              icon: FileText,
              onClick: () => setActiveMainTab('documents'),
              isActive: activeMainTab === 'documents',
              badge: `${ML_WEEK6_DOCUMENTS.length} Files`
            }
          ]}
        />

        {/* Content Workspace */}
        <main className="flex-1 min-w-0 space-y-6 w-full">
          {activeMainTab === 'study' && (
            <ModuleTemplate
              moduleId={currentMod.stepNumber}
              moduleIndex={currentMod.stepNumber}
              totalModules={ML_WEEK6_MODULES.length}
              badge={currentMod.category}
              title={currentMod.title}
              subtitle={currentMod.description}
              isCompleted={completedModules.includes(currentMod.id)}
              onToggleComplete={() => toggleModuleComplete(currentMod.id)}
              hasPrev={false}
              hasNext={false}
            >
              <Module1MidtermPrep onGoToDocuments={() => setActiveMainTab('documents')} />
            </ModuleTemplate>
          )}

          {activeMainTab === 'documents' && (
            <DocumentsTemplate
              documents={ML_WEEK6_DOCUMENTS}
              title="Week 06 Midterm Prep Documents & Resources"
              subtitle="Reference slide decks, official sample questions with worked solutions, and exam cheatsheets."
            />
          )}
        </main>
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-medium">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white transition text-xs font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
