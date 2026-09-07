import React, { useState, useEffect, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  Brain,
  BrainCircuit,
  CheckCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  RotateCcw,
  Sliders,
  Layers,
  Code2,
  Copy,
  Check,
  GraduationCap,
  ListChecks
} from 'lucide-react';
import { Course, SyllabusModule } from '../../types/course';
import {
  CurriculumModule,
  WeekCurriculumData
} from '../../types/weeklyCurriculum';
import { getWeeklyCurriculum } from '../../data/weeklyCurriculumRegistry';
import { UniversalFlashcardsModal } from '../common/UniversalFlashcardsModal';
import { WeeklyHeaderBanner } from '../common/WeeklyHeaderBanner';
import { WeeklySidebar } from '../common/WeeklySidebar';
import { ModuleTemplate } from '../common/ModuleTemplate';

// KaTeX Inline Renderer
const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts = useMemo(() => {
    if (!text) return [];
    // Split on LaTeX equations: $$...$$ (display) or $...$ (inline)
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
    return text.split(regex);
  }, [text]);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return <span key={i} className="my-2 block overflow-x-auto" dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <code key={i} className="text-amber-400 font-mono text-xs">{part}</code>;
          }
        } else if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const math = part.slice(1, -1).trim();
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <code key={i} className="text-amber-400 font-mono text-xs">{part}</code>;
          }
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};

// KaTeX Block Math Renderer
const KaTeXBlock: React.FC<{ tex: string; className?: string }> = ({ tex, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false
      });
    } catch {
      return `<span class="text-rose-400 font-mono text-sm">${tex}</span>`;
    }
  }, [tex]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export interface WeeklyLearningHubProps {
  course: Course;
  module: SyllabusModule;
  customCurriculum?: WeekCurriculumData;
  activeModuleWidget?: React.ReactNode;
  activeStepWidget?: React.ReactNode; // legacy fallback
}

export const WeeklyLearningHub: React.FC<WeeklyLearningHubProps> = ({
  course,
  module,
  customCurriculum,
  activeModuleWidget,
  activeStepWidget
}) => {
  // Load curriculum data from custom prop or registry
  const curriculum: WeekCurriculumData = useMemo(() => {
    if (customCurriculum) return customCurriculum;
    return getWeeklyCurriculum(course, module);
  }, [course, module, customCurriculum]);

  const modules: CurriculumModule[] = curriculum.modules || curriculum.steps || [];
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeMainTab, setActiveMainTab] = useState<'study' | 'quiz'>('study');
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);

  // Storage keys partitioned by course and module
  const storageKeyCompleted = `curriculum_${course.id}_${module.id}_completed_modules`;
  const legacyStorageKeyCompleted = `curriculum_${course.id}_${module.id}_completed_steps`;
  const storageKeyQuizAnswers = `curriculum_${course.id}_${module.id}_quiz_answers`;
  const storageKeyFlashcards = `curriculum_${course.id}_${module.id}_flashcards_mastered`;

  // Completed Modules State
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      // Backwards-compatible check for Week 1 AI
      const isWeek1AI = course.code === 'CMPE-252' && module.week === 'Week 01';
      if (isWeek1AI && localStorage.getItem('ml_core_completed')) {
        return JSON.parse(localStorage.getItem('ml_core_completed') || '[]');
      }
      const val = localStorage.getItem(storageKeyCompleted) || localStorage.getItem(legacyStorageKeyCompleted);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKeyCompleted, JSON.stringify(completedModules));
      if (course.code === 'CMPE-252' && module.week === 'Week 01') {
        localStorage.setItem('ml_core_completed', JSON.stringify(completedModules));
      }
    } catch {}
  }, [completedModules, storageKeyCompleted, course.code, module.week]);

  const toggleModuleComplete = (id: number) => {
    setCompletedModules(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const resetAllProgress = () => {
    setCompletedModules([]);
    setQuizUserAnswers({});
    localStorage.removeItem(storageKeyCompleted);
    localStorage.removeItem(legacyStorageKeyCompleted);
    localStorage.removeItem(storageKeyQuizAnswers);
    if (course.code === 'CMPE-252' && module.week === 'Week 01') {
      localStorage.removeItem('ml_core_completed');
      localStorage.removeItem('ml_week1_quiz_answers');
    }
  };

  // Distinct Quiz Keys (prefers m1..m6 over legacy s1..s6)
  const quizModuleKeys = useMemo(() => {
    const keys = Object.keys(curriculum.quizzes);
    const mKeys = keys.filter(k => k.startsWith('m'));
    if (mKeys.length > 0) return mKeys;
    return keys;
  }, [curriculum.quizzes]);

  // Quiz State
  const [quizModuleKey, setQuizModuleKey] = useState<string>(() => quizModuleKeys[0] || 'm1');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [showSolutionsGuide, setShowSolutionsGuide] = useState<boolean>(false);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>(() => {
    try {
      const isWeek1AI = course.code === 'CMPE-252' && module.week === 'Week 01';
      if (isWeek1AI && localStorage.getItem('ml_week1_quiz_answers')) {
        return JSON.parse(localStorage.getItem('ml_week1_quiz_answers') || '{}');
      }
      return JSON.parse(localStorage.getItem(storageKeyQuizAnswers) || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKeyQuizAnswers, JSON.stringify(quizUserAnswers));
      if (course.code === 'CMPE-252' && module.week === 'Week 01') {
        localStorage.setItem('ml_week1_quiz_answers', JSON.stringify(quizUserAnswers));
      }
    } catch {}
  }, [quizUserAnswers, storageKeyQuizAnswers, course.code, module.week]);

  // Flashcards Modal State
  const [showFlashcards, setShowFlashcards] = useState<boolean>(false);

  // Active Module Meta
  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0] || {
    id: 1,
    title: module.title,
    badge: 'Module 1',
    subtitle: module.description
  };
  const isCurrentModuleDone = completedModules.includes(activeModule.id);
  const completionPct = modules.length > 0 ? Math.round((completedModules.length / modules.length) * 100) : 0;

  // Active Quiz Module
  const currentQuizMod = curriculum.quizzes[quizModuleKey] || Object.values(curriculum.quizzes)[0] || {
    title: 'Assessment',
    moduleNumber: 1,
    badge: 'Quiz',
    sub: 'Practice',
    questions: []
  };

  const currentQ = currentQuizMod.questions[currentQuestionIdx] || currentQuizMod.questions[0];
  const selectedOption = currentQ ? quizUserAnswers[`${quizModuleKey}_${currentQuestionIdx}`] : undefined;

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== undefined) return; // Locked once answered
    setQuizUserAnswers(prev => ({
      ...prev,
      [`${quizModuleKey}_${currentQuestionIdx}`]: idx
    }));
  };

  const clearCurrentAnswer = () => {
    setQuizUserAnswers(prev => {
      const next = { ...prev };
      delete next[`${quizModuleKey}_${currentQuestionIdx}`];
      return next;
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeSnippet(code);
    setTimeout(() => setCopiedCodeSnippet(null), 2000);
  };

  // Study Hub Extras
  const studyExtras = [
    {
      id: 'flashcards',
      title: 'VIP Flashcards',
      icon: Sparkles,
      badge: `${curriculum.flashcards.length} Cards`,
      onClick: () => setShowFlashcards(true)
    },
    {
      id: 'quiz',
      title: 'Practice Quizzes',
      icon: GraduationCap,
      badge: `${quizModuleKeys.length} Quizzes`,
      onClick: () => {
        setActiveMainTab('quiz');
        setQuizModuleKey(`m${activeModuleId}`);
        setCurrentQuestionIdx(0);
      }
    }
  ];

  return (
    <div className="space-y-6 text-slate-100 animate-fade-in">

      {/* Standardized Reusable Weekly Header Banner across all weeks */}
      <WeeklyHeaderBanner
        week={module.week.replace(/^Session\s*/i, 'Week ')}
        courseCode={course.code}
        courseName={course.name}
        title={module.title}
        description={module.description}
        reading={module.reading}
        status={completionPct === 100 ? 'completed' : (module.status === 'upcoming' ? 'upcoming' : 'in-progress')}
        progressPct={completionPct}
        onResetProgress={resetAllProgress}
        topics={curriculum.topics}
      />


      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">

        {/* Reusable Weekly Sidebar (Mobile + Desktop Sticky) */}
        <WeeklySidebar
          modules={modules.map(m => ({
            id: m.id,
            title: m.title,
            badge: m.badge,
            icon: m.icon,
            isDone: completedModules.includes(m.id)
          }))}
          activeModuleId={activeModuleId}
          onSelectModule={(id) => {
            setActiveModuleId(id);
            setActiveMainTab('study');
          }}
          completedCount={completedModules.length}
          totalCount={modules.length}
          tools={studyExtras.map(extra => ({
            id: extra.id,
            title: extra.title,
            icon: extra.icon,
            badge: extra.badge,
            isActive: extra.id === 'quiz' && activeMainTab === 'quiz',
            onClick: extra.onClick
          }))}
          activeModuleBadge={activeModule.badge}
          currentModuleIndex={activeModuleId}
          totalModulesCount={modules.length}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 space-y-6 w-full">

          {/* ==================== STUDY MODE ==================== */}
          {activeMainTab === 'study' && (
            <ModuleTemplate
              moduleId={activeModule.id}
              moduleIndex={activeModuleId}
              totalModules={modules.length}
              badge={activeModule.badge}
              title={activeModule.title}
              subtitle={activeModule.subtitle}
              isCompleted={isCurrentModuleDone}
              onToggleComplete={() => toggleModuleComplete(activeModule.id)}
              onPrevModule={() => {
                setActiveModuleId(prev => Math.max(1, prev - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNextModule={() => {
                setActiveModuleId(prev => Math.min(modules.length, prev + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              hasPrev={activeModuleId > 1}
              hasNext={activeModuleId < modules.length}
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
            >

              {/* Custom Interactive Widget (e.g. for Week 1 AI Canvas Widgets) */}
              {activeModuleWidget || activeStepWidget}

              {/* Custom Content slot if provided */}
              {activeModule.customContent}

              {/* Standard Module Content: Structured Knowledge Cards */}
              {!activeModule.customContent && (
                <div className="space-y-6">

                  {/* Summary & Overview Card */}
                  {activeModule.summary && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-3">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Brain className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Concept Overview</h4>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        <MathText text={activeModule.summary} />
                      </p>
                    </div>
                  )}

                  {/* Key Takeaways & Competencies */}
                  {activeModule.keyTakeaways && activeModule.keyTakeaways.length > 0 && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Key Takeaways &amp; Principles</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        {activeModule.keyTakeaways.map((point, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                            <div><MathText text={point} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mathematical Formulations (KaTeX) */}
                  {activeModule.formulas && activeModule.formulas.length > 0 && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-400">
                          <Sliders className="w-4 h-4" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">Theoretical Formulations</h4>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">LaTeX Rendered</span>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {activeModule.formulas.map((f, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-2 shadow-inner"
                          >
                            <div className="flex items-center justify-between text-xs font-semibold text-indigo-300">
                              <span>{f.label}</span>
                            </div>
                            <div className="py-2 overflow-x-auto text-center">
                              <KaTeXBlock tex={f.tex} />
                            </div>
                            {f.explanation && (
                              <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-900">
                                <MathText text={f.explanation} />
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Deep Dive & Architecture */}
                  {activeModule.deepDive && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-3">
                      <div className="flex items-center gap-2 text-purple-400">
                        <Layers className="w-4 h-4" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">{activeModule.deepDive.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <MathText text={activeModule.deepDive.content} />
                      </p>
                      {activeModule.deepDive.bullets && (
                        <ul className="space-y-1.5 pt-2 border-t border-slate-800/80">
                          {activeModule.deepDive.bullets.map((b, bidx) => (
                            <li key={bidx} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-purple-400">•</span>
                              <div><MathText text={b} /></div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Vectorized Implementation Workbench */}
                  {activeModule.codeSnippet && (
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Code2 className="w-4 h-4" />
                          <h4 className="text-xs font-bold uppercase tracking-wider">
                            Vectorized Implementation ({activeModule.codeSnippet.filename || 'algorithm.py'})
                          </h4>
                        </div>
                        <button
                          onClick={() => handleCopyCode(activeModule.codeSnippet!.code)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition"
                        >
                          {copiedCodeSnippet === activeModule.codeSnippet.code ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="relative">
                        <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 overflow-x-auto font-mono text-xs leading-relaxed">
                          <code>{activeModule.codeSnippet.code}</code>
                        </pre>
                      </div>

                      {activeModule.codeSnippet.explanation && (
                        <p className="text-xs text-slate-400 leading-relaxed">
                          <MathText text={activeModule.codeSnippet.explanation} />
                        </p>
                      )}
                    </div>
                  )}

                </div>
              )}
            </ModuleTemplate>
          )}

          {/* ==================== QUIZ MODE ==================== */}
          {activeMainTab === 'quiz' && (
            <div className="space-y-6 animate-fade-in">
              {/* Quiz Header Bar */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                      Active Recall Assessment
                    </span>
                    <span className="text-xs text-slate-400">{course.code}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {module.week}: Practice Quizzes &amp; Solutions
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Select any curriculum module below to test your conceptual and mathematical recall.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setShowSolutionsGuide(prev => !prev)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
                  >
                    <ListChecks className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showSolutionsGuide ? 'Hide Solutions Guide' : 'Solutions Guide'}</span>
                  </button>
                  <button
                    onClick={() => setActiveMainTab('study')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>Back to Study Mode</span>
                  </button>
                </div>
              </div>

              {/* Module Selector Header Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {quizModuleKeys.map((mKey) => {
                  const mod = curriculum.quizzes[mKey];
                  const isSelected = quizModuleKey === mKey;
                  const answeredCount = mod.questions.filter((_, idx) => quizUserAnswers[`${mKey}_${idx}`] !== undefined).length;
                  const isComplete = answeredCount === mod.questions.length && mod.questions.length > 0;
                  return (
                    <button
                      key={mKey}
                      onClick={() => {
                        setQuizModuleKey(mKey);
                        setCurrentQuestionIdx(0);
                      }}
                      className={`border-2 p-3.5 rounded-xl text-left transition relative overflow-hidden group shadow-md ${
                        isSelected
                          ? 'border-indigo-500 bg-slate-900/90 shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                          Module {mod.moduleNumber || mod.stepNumber}
                        </span>
                        {isComplete && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <h4 className="font-semibold text-slate-100 text-xs sm:text-sm line-clamp-1">{mod.badge}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{mod.sub}</p>
                      <div className="mt-2 text-[10px] font-mono text-slate-500">
                        {answeredCount}/{mod.questions.length} Answered
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quiz Card Area */}
              {currentQ && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md relative space-y-6">
                  {/* Progress Bar & Header */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>Question <strong className="text-white">{currentQuestionIdx + 1}</strong> of {currentQuizMod.questions.length}</span>
                      <span className="text-indigo-400 font-semibold">{currentQuizMod.title}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIdx + 1) / currentQuizMod.questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Statement */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 shadow-inner">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Problem Statement</span>
                    <div className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                      <MathText text={currentQ.question} />
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 gap-3">
                    {currentQ.options.map((optText, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQ.correct;
                      const hasAnswered = selectedOption !== undefined;

                      let btnStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50";
                      if (hasAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-medium";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-950/60 border-rose-500/80 text-rose-200";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={hasAnswered}
                          onClick={() => handleSelectOption(idx)}
                          className={`p-4 rounded-xl border text-left transition flex items-start gap-3.5 group relative ${btnStyle}`}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold transition ${
                            isSelected
                              ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300'
                              : 'border-slate-700 bg-slate-900 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <div className="flex-1 text-sm leading-relaxed">
                            <MathText text={optText} />
                          </div>
                          {hasAnswered && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {hasAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box when Answered */}
                  {selectedOption !== undefined && (
                    <div className={`p-5 rounded-xl border animate-fade-in space-y-2 ${
                      selectedOption === currentQ.correct
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {selectedOption === currentQ.correct ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Correct! Excellent derivation.</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Incorrect. Review mathematical derivation below:</span>
                          </>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <MathText text={currentQ.explanation} />
                      </div>
                    </div>
                  )}

                  {/* Question Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-semibold flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Prev Problem
                    </button>

                    <div className="flex items-center gap-2">
                      {selectedOption !== undefined && (
                        <button
                          onClick={clearCurrentAnswer}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
                        >
                          Try Again
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setCurrentQuestionIdx(prev => Math.min(currentQuizMod.questions.length - 1, prev + 1))}
                      disabled={currentQuestionIdx === currentQuizMod.questions.length - 1}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-semibold flex items-center gap-1.5"
                    >
                      Next Problem <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Solutions Guide Accordion */}
              {showSolutionsGuide && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ListChecks className="w-4 h-4 text-amber-400" />
                      {currentQuizMod.title} — Detailed Solutions Guide
                    </h3>
                    <button
                      onClick={() => setShowSolutionsGuide(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Close Guide
                    </button>
                  </div>

                  <div className="space-y-4">
                    {currentQuizMod.questions.map((q, qidx) => (
                      <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-indigo-400">Problem {qidx + 1}</span>
                          <span className="font-mono text-emerald-400">
                            Correct: ({String.fromCharCode(65 + q.correct)}) {q.options[q.correct]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-medium"><MathText text={q.question} /></p>
                        <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-900 leading-relaxed">
                          <strong>Derivation:</strong> <MathText text={q.explanation} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* Standalone VIP Flashcards Popup Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcards}
        onClose={() => setShowFlashcards(false)}
        flashcards={curriculum.flashcards}
        title={`${course.code} ${module.week} — VIP Flashcards`}
        storageKey={storageKeyFlashcards}
      />

    </div>
  );
};
