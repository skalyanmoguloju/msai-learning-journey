import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  HelpCircle,
  Calculator,
  X
} from 'lucide-react';
import { Course, SyllabusModule } from '../../../../../types/course';
import {
  ModuleTemplate,
  WeeklyHeaderBanner,
  WeeklySidebar,
  Toast,
  UniversalFlashcardsModal
} from '../../../../common';
import { ML_MODULES, CHEATSHEET_FORMULAS } from './types';
import { ML_WEEK1_FLASHCARDS } from './flashcards';
import { Module1Fundamentals } from './modules/Module1Fundamentals';
import { Module2SupervisedLinear } from './modules/Module2SupervisedLinear';
import { Module3Unsupervised } from './modules/Module3Unsupervised';
import { Module4Reinforcement } from './modules/Module4Reinforcement';
import { Module5ModelAssessment } from './modules/Module5ModelAssessment';
import { Module6ModernParadigms } from './modules/Module6ModernParadigms';
import { Week1QuizView } from './modules/Week1QuizView';
import katex from 'katex';

const MathText: React.FC<{ text: string }> = ({ text }) => {
  const html = useMemo(() => {
    if (!text) return '';
    if (text.includes('$')) {
      let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => {
        try { return katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false }); }
        catch { return latex; }
      });
      res = res.replace(/\$([^\$\n]+?)\$/g, (_, latex) => {
        try { return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false }); }
        catch { return latex; }
      });
      return res;
    }
    return text;
  }, [text]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

const STORAGE_KEY_COMPLETED = 'cmpe257_week01_completed_modules';

export interface Week01MLProps {
  course?: Course;
  module?: SyllabusModule;
}

export const Week01ML: React.FC<Week01MLProps> = ({ course, module }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('m1');
  const [activeMainTab, setActiveMainTab] = useState<'study' | 'quiz'>('study');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
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
        <WeeklySidebar
          modules={ML_MODULES.map(mod => ({
            id: mod.id,
            title: mod.shortTitle,
            badge: mod.category,
            icon: mod.icon,
            isDone: completedModules.includes(mod.id)
          }))}
          activeModuleId={activeMainTab === 'study' ? activeModuleId : ML_MODULES[0].id}
          onSelectModule={(id) => {
            setActiveMainTab('study');
            setActiveModuleId(id as string);
          }}
          completedCount={completedModules.length}
          totalCount={ML_MODULES.length}
          tools={[
            {
              id: 'flashcards-tool',
              title: 'VIP Flashcards',
              icon: Sparkles,
              onClick: () => setShowFlashcards(true),
              badge: `${ML_WEEK1_FLASHCARDS.length} Cards`
            },
            {
              id: 'cheatsheet-tool',
              title: 'Formula Sheet',
              icon: Calculator,
              onClick: () => setShowCheatSheet(true),
              badge: 'LaTeX'
            },
            {
              id: 'quiz-hub',
              title: 'Practice Quiz',
              icon: HelpCircle,
              onClick: () => setActiveMainTab('quiz'),
              isActive: activeMainTab === 'quiz',
              badge: `${8} Questions`
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
                  onClick={() => setActiveMainTab('quiz')}
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
              initialModuleId={activeModuleId}
              onBackToStudy={(moduleId) => {
                setActiveMainTab('study');
                setActiveModuleId(moduleId);
              }}
            />
          )}
        </main>
      </div>

      {/* Formula Cheatsheet Modal */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Master Machine Learning Formula Reference Sheet</span>
              </h3>
              <button onClick={() => setShowCheatSheet(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {CHEATSHEET_FORMULAS.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h4 className="font-bold text-cyan-400 text-xs">{item.title}</h4>
                  {item.formulas.map((f, fIdx) => (
                    <div key={fIdx} className="font-mono text-slate-200 overflow-x-auto py-0.5">
                      <MathText text={`$$${f}$$`} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reusable Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={ML_WEEK1_FLASHCARDS}
        title="CMPE-257 Week 01 — VIP Flashcards"
        subtitle="Master foundational machine learning theories, generalization bounds, PAC learnability, and matrix calculus"
        storageKey="cmpe257_week01_flashcards_mastered"
      />

      {/* Reusable Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Week01ML;
