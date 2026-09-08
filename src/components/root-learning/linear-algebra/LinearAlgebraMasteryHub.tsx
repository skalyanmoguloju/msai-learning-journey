import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Grid3X3,
  BookOpen,
  Calculator,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  Play,
  CheckCircle2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ListChecks,
  Award,
  HelpCircle,
  Compass,
  Move
} from 'lucide-react';
import katex from 'katex';
import {
  LA_MODULES_DATA,
  LA_QUIZ_MODULES,
  StudyModule
} from './linearAlgebraData';
import { ModuleTemplate } from '../../common/ModuleTemplate';
import { RootHeaderBanner, ModuleAndToolSidebar, ModuleSidebarItem, ToolSidebarItem, QuizTemplate, QuizModuleItem } from '../common';
import { UniversalFlashcardsModal } from '../../common/UniversalFlashcardsModal';
import { LA_FLASHCARDS } from './linearAlgebraFlashcardsData';

// KaTeX Math Rendering Helper Component
const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const html = useMemo(() => {
    let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => {
      try {
        return katex.renderToString(latex, { displayMode: true, throwOnError: false });
      } catch {
        return latex;
      }
    });
    res = res.replace(/\$([^\$\n]+?)\$/g, (_, latex) => {
      try {
        return katex.renderToString(latex, { displayMode: false, throwOnError: false });
      } catch {
        return latex;
      }
    });
    res = res.replace(/\\\\/g, '<br/>');
    return res;
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

const MathView: React.FC<{ tex: string; display?: boolean; enabled?: boolean }> = ({
  tex,
  display = false,
  enabled = true
}) => {
  const html = useMemo(() => {
    if (!enabled) return tex;
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false
      });
    } catch {
      return tex;
    }
  }, [tex, display, enabled]);

  if (!enabled) {
    return (
      <code className="font-mono text-xs text-indigo-300 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
        {tex}
      </code>
    );
  }

  return (
    <div
      className={`overflow-x-auto no-scrollbar ${display ? 'py-1 text-center' : 'inline-block'}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

import { curriculumNavStore } from '../../curriculum/navigationStore';

const HUB_KEY = 'linear-algebra-mastery';

export const LinearAlgebraMasteryHub: React.FC = () => {
  // Navigation & View States with in-memory persistence (curriculumNavStore)
  const [activeModuleId, setActiveModuleIdState] = useState<number>(() =>
    curriculumNavStore.getModuleForRootHub<number>(HUB_KEY, 1)
  );
  const [activeTab, setActiveTabState] = useState<'study' | 'quiz'>(() =>
    curriculumNavStore.getTabForRootHub(HUB_KEY, 'study') as 'study' | 'quiz'
  );
  const [showSolutionsGuide, setShowSolutionsGuideState] = useState<boolean>(() =>
    curriculumNavStore.getSolutionsModeForRootHub(HUB_KEY)
  );
  const [quizModuleKey, setQuizModuleKeyState] = useState<string>(() =>
    curriculumNavStore.getQuizModuleForRootHub(HUB_KEY, 'm1')
  );
  const [showFlashcardsModal, setShowFlashcardsModal] = useState<boolean>(false);

  const setActiveModuleId = useCallback((idOrFn: number | ((prev: number) => number)) => {
    setActiveModuleIdState((prev) => {
      const next = typeof idOrFn === 'function' ? idOrFn(prev) : idOrFn;
      curriculumNavStore.setModuleForRootHub(HUB_KEY, next);
      return next;
    });
  }, []);

  const setActiveTab = useCallback((tab: 'study' | 'quiz') => {
    curriculumNavStore.setTabForRootHub(HUB_KEY, tab);
    setActiveTabState(tab);
  }, []);

  const setShowSolutionsGuide = useCallback((show: boolean) => {
    curriculumNavStore.setSolutionsModeForRootHub(HUB_KEY, show);
    setShowSolutionsGuideState(show);
  }, []);

  const setQuizModuleKey = useCallback((key: string) => {
    curriculumNavStore.setQuizModuleForRootHub(HUB_KEY, key);
    setQuizModuleKeyState(key);
  }, []);

  // Completed Modules State
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('linear_algebra_completed_modules') || '[]');
    } catch {
      return [];
    }
  });

  const toggleModuleComplete = (modId: number) => {
    setCompletedModules((prev) => {
      const next = prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId];
      localStorage.setItem('linear_algebra_completed_modules', JSON.stringify(next));
      return next;
    });
  };

  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('linear_algebra_quiz_answers') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('linear_algebra_quiz_answers', JSON.stringify(quizUserAnswers));
    } catch {
      // ignore
    }
  }, [quizUserAnswers]);

  const resetAllProgress = () => {
    setCompletedModules([]);
    localStorage.removeItem('linear_algebra_completed_modules');
    setQuizUserAnswers({});
    localStorage.removeItem('linear_algebra_quiz_answers');
  };

  // Active module computation
  const activeModule: StudyModule = useMemo(() => {
    return LA_MODULES_DATA.find((m) => m.id === activeModuleId) || LA_MODULES_DATA[0];
  }, [activeModuleId]);


  // Total correct answers calculation
  const totalCorrect = useMemo(() => {
    let correctCount = 0;
    Object.keys(LA_QUIZ_MODULES).forEach((mKey) => {
      const mod = LA_QUIZ_MODULES[mKey];
      mod.questions.forEach((q, qIdx) => {
        if (quizUserAnswers[`${mKey}_${qIdx}`] === q.correct) {
          correctCount++;
        }
      });
    });
    return correctCount;
  }, [quizUserAnswers]);

  const totalQuestions = 24;
  const completionPct = Math.round(
    ((completedModules.length / LA_MODULES_DATA.length) * 0.5 + (totalCorrect / totalQuestions) * 0.5) * 100
  );


  // ===================== INTERACTIVE 2D TRANSFORMATION VISUALIZER =====================
  const [m11, setM11] = useState<number>(1.5);
  const [m12, setM12] = useState<number>(0.5);
  const [m21, setM21] = useState<number>(0.0);
  const [m22, setM22] = useState<number>(1.2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const determinant = useMemo(() => {
    return m11 * m22 - m12 * m21;
  }, [m11, m12, m21, m22]);

  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const originX = width / 2;
    const originY = height / 2;
    const scale = 36; // 36px per coordinate unit

    ctx.clearRect(0, 0, width, height);

    // Helper to transform point (x, y) by matrix [[m11, m12], [m21, m22]]
    const transformPoint = (x: number, y: number) => {
      const tx = m11 * x + m12 * y;
      const ty = m21 * x + m22 * y;
      return {
        px: originX + tx * scale,
        py: originY - ty * scale // Inverted canvas y-axis
      };
    };

    // Helper to draw clean directional arrows
    const drawArrow = (fromX: number, fromY: number, toX: number, toY: number, color: string, lineWidth = 2.5) => {
      const headlen = 9;
      const angle = Math.atan2(toY - fromY, toX - fromX);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = lineWidth;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();
    };

    // 1. Draw Transformed Coordinate Grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.18)';
    for (let i = -5; i <= 5; i++) {
      // Vertical grid lines
      const topP = transformPoint(i, 5);
      const botP = transformPoint(i, -5);
      ctx.beginPath();
      ctx.moveTo(topP.px, topP.py);
      ctx.lineTo(botP.px, botP.py);
      ctx.stroke();

      // Horizontal grid lines
      const leftP = transformPoint(-5, i);
      const rightP = transformPoint(5, i);
      ctx.beginPath();
      ctx.moveTo(leftP.px, leftP.py);
      ctx.lineTo(rightP.px, rightP.py);
      ctx.stroke();
    }

    // 2. Main Un-transformed Reference Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // 3. Transformed Basis Unit Square (Span)
    const o = transformPoint(0, 0);
    const e1 = transformPoint(1, 0);
    const e2 = transformPoint(0, 1);
    const sum = transformPoint(1, 1);

    ctx.fillStyle = 'rgba(59, 130, 246, 0.28)';
    ctx.beginPath();
    ctx.moveTo(o.px, o.py);
    ctx.lineTo(e1.px, e1.py);
    ctx.lineTo(sum.px, sum.py);
    ctx.lineTo(e2.px, e2.py);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(96, 165, 250, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 4. Draw Basis Vectors e1 (Red) and e2 (Emerald Green)
    drawArrow(o.px, o.py, e1.px, e1.py, '#ef4444', 3.5); // T(e1)
    drawArrow(o.px, o.py, e2.px, e2.py, '#10b981', 3.5); // T(e2)

    // 5. Origin Dot
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(originX, originY, 3.5, 0, 2 * Math.PI);
    ctx.fill();
  }, [m11, m12, m21, m22]);

  useEffect(() => {
    drawVisualizer();
  }, [drawVisualizer]);

  const applyPreset = (preset: 'rotation' | 'shear' | 'reflection' | 'singular' | 'identity') => {
    switch (preset) {
      case 'rotation': // 45 deg
        setM11(0.71);
        setM12(-0.71);
        setM21(0.71);
        setM22(0.71);
        break;
      case 'shear': // Horizontal Shear
        setM11(1.0);
        setM12(1.2);
        setM21(0.0);
        setM22(1.0);
        break;
      case 'reflection': // Reflection across y-axis
        setM11(-1.0);
        setM12(0.0);
        setM21(0.0);
        setM22(1.0);
        break;
      case 'singular': // Projection (Rank 1 / Collapses volume to 0)
        setM11(1.0);
        setM12(1.0);
        setM21(1.0);
        setM22(1.0);
        break;
      case 'identity': // Identity matrix
      default:
        setM11(1.0);
        setM12(0.0);
        setM21(0.0);
        setM22(1.0);
        break;
    }
  };

  const laQuizModules: QuizModuleItem[] = useMemo(() => {
    return Object.keys(LA_QUIZ_MODULES).map((key, idx) => {
      const qMod = LA_QUIZ_MODULES[key];
      return {
        id: key,
        stepNumber: idx + 1,
        title: qMod.title,
        badge: qMod.badge,
        sub: `Module ${idx + 1} Assessment`,
        questions: qMod.questions
      };
    });
  }, []);

  const laModules: ModuleSidebarItem[] = useMemo(() => {
    return LA_MODULES_DATA.map((mod) => ({
      id: mod.id,
      title: mod.title,
      isDone: completedModules.includes(mod.id),
    }));
  }, [completedModules]);

  const laTools: ToolSidebarItem[] = useMemo(() => {
    return [
      {
        id: 'flashcards',
        title: 'Flashcards',
        icon: Sparkles,
        badge: `${LA_FLASHCARDS.length} Cards`,
        isActive: showFlashcardsModal,
        onClick: () => {
          setShowFlashcardsModal(true);
        },
      },
      {
        id: 'quiz',
        title: 'Practice Quizzes',
        icon: HelpCircle,
        badge: '24 Qs',
        isActive: activeTab === 'quiz' && !showSolutionsGuide,
        onClick: () => {
          setActiveTab('quiz');
          setShowSolutionsGuide(false);
        },
      },
      {
        id: 'solutions',
        title: 'Full Solution Guide',
        icon: HelpCircle,
        badge: 'All Qs',
        isActive: activeTab === 'quiz' && showSolutionsGuide,
        onClick: () => {
          setActiveTab('quiz');
          setShowSolutionsGuide(true);
        },
      },
    ];
  }, [showFlashcardsModal, activeTab, showSolutionsGuide, setActiveTab, setShowSolutionsGuide]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Top Banner with Math Toggle & Status */}
      <RootHeaderBanner
        title="Linear Algebra Hub"
        subtitle="CS229 Linear Algebra & Matrix Calculus Masterclass"
        icon={<Grid3X3 className="w-6 h-6" />}
        iconGradient="from-blue-600 to-indigo-600"
        progress={{
          label: 'Mastery:',
          pct: completionPct,
          extraInfo: `${totalCorrect}/${totalQuestions} Qs`,
          colorGradient: 'from-blue-500 to-indigo-400',
          textColor: 'text-blue-400',
        }}
        onResetProgress={resetAllProgress}
        resetTitle="Reset All Linear Algebra Progress"
        confirmTitle="Reset Linear Algebra Progress?"
        confirmMessage="Are you sure you want to reset all completed modules and quiz answers in CS229 Linear Algebra? This action cannot be undone."
        topics={[
          'Basic Notation & Matrix Products',
          'Operations, Trace & Matrix Norms',
          'Vector Spaces, Rank & Orthogonality',
          'Determinants & Quadratic Forms',
          'Eigenvalues & Spectral Theory',
          'Matrix Calculus & Least Squares'
        ]}
      />

      {/* Main Layout: Vertical Module Menu (Desktop) + Mobile Horizontal Pills */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">

        {/* Reusable Module & Tool Sidebar */}
        <ModuleAndToolSidebar
          modules={laModules}
          activeModuleId={activeTab === 'study' ? activeModuleId : ''}
          onSelectModule={(id) => {
            setActiveTab('study');
            setShowSolutionsGuide(false);
            setActiveModuleId(id);
          }}
          completedCount={completedModules.length}
          totalCount={LA_MODULES_DATA.length}
          tools={laTools}
          currentModuleIndex={activeModuleId}
          totalModulesCount={LA_MODULES_DATA.length}
          activeModuleBadge={activeModule.badge}
        />

        {/* Main Content Pane */}
        <div className="flex-1 min-w-0 space-y-6 w-full">
          {/* ==================== STUDY GUIDE VIEW ==================== */}
          {activeTab === 'study' && (
            <div className="space-y-6">
              <ModuleTemplate
                moduleId={activeModule.id}
                moduleIndex={activeModuleId}
                totalModules={6}
                badge={activeModule.badge}
                title={activeModule.title}
                subtitle={activeModule.summary}
                isCompleted={completedModules.includes(activeModuleId)}
                onToggleComplete={() => toggleModuleComplete(activeModuleId)}
                hasPrev={activeModuleId > 1}
                hasNext={activeModuleId < 6}
                onPrevModule={() => setActiveModuleId((prev) => Math.max(1, prev - 1))}
                onNextModule={() => setActiveModuleId((prev) => Math.min(6, prev + 1))}
                prevLabel={activeModuleId > 1 ? `Module ${activeModuleId - 1}` : undefined}
                nextLabel={activeModuleId < 6 ? `Module ${activeModuleId + 1}` : undefined}
                extraActions={
                  activeModule.hasVisualizer ? (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" /> 2D Visualizer
                    </span>
                  ) : undefined
                }
              >

              {/* Concept Breakdown Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Core Readable Definitions */}
                <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                  <h4 className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    Core Definitions (Quick Reading)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeModule.definitions.map((d, i) => (
                      <div
                        key={i}
                        className="text-sm bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
                      >
                        <span className="text-blue-300 font-bold text-xs block mb-1">{d.term}</span>
                        <span className="text-slate-400 text-xs leading-relaxed">{d.def}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 1 Col: Formula Cheat Sheet */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-indigo-400 font-bold mb-4 flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-indigo-400" />
                      Mathematical Cheat Sheet
                    </h4>
                    <div className="space-y-3.5">
                      {activeModule.formulas.map((f, i) => (
                        <div key={i} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                          <p className="text-[11px] font-semibold text-slate-400 mb-1">{f.label}</p>
                          <MathView tex={f.tex} display={true} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Module Sections */}
              <div className="space-y-6">
                {activeModule.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4"
                  >
                    <div className="border-b border-slate-800 pb-3">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        {section.title}
                      </h4>
                      {section.lead && <p className="text-xs text-slate-400 mt-1">{section.lead}</p>}
                    </div>

                    {section.cards && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.cards.map((c, cIdx) => (
                          <div
                            key={cIdx}
                            className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2.5 flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="text-xs font-bold text-blue-300">{c.title}</h5>
                                {c.subtitle && (
                                  <span className="text-[10px] text-slate-500 font-medium">{c.subtitle}</span>
                                )}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{c.text}</p>
                            </div>
                            {c.latex && (
                              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-center">
                                <MathView tex={c.latex} display={true} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive 2D Linear Transformation Visualizer (Module 3 or General Lab) */}
              {activeModule.hasVisualizer && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Compass className="w-5 h-5 text-blue-400 animate-pulse" />
                        Interactive 2D Linear Transformation Visualizer
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Inspect how the matrix transformation <MathText text="$T(\mathbf{x}) = A \mathbf{x}$" /> distorts 2D space, the unit square, and basis vectors <MathText text="$\mathbf{e}_1, \mathbf{e}_2$" />.
                      </p>
                    </div>
                    <button
                      onClick={() => applyPreset('identity')}
                      className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition self-start sm:self-center"
                    >
                      Reset Identity $I$
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    {/* HTML5 Canvas */}
                    <div className="lg:col-span-2 flex justify-center bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-inner">
                      <canvas
                        ref={canvasRef}
                        width={360}
                        height={360}
                        className="rounded-xl max-w-full h-auto cursor-crosshair"
                      />
                    </div>

                    {/* Matrix Controls & Presets */}
                    <div className="space-y-4">
                      <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Matrix Parameters $A$
                          </span>
                          <span className="text-[10px] font-mono text-blue-400">2 × 2 Matrix</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">a11 ($x$-scale)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={m11}
                              onChange={(e) => setM11(parseFloat(e.target.value) || 0)}
                              className="w-full text-center py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-bold focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">a12 ($x$-shear)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={m12}
                              onChange={(e) => setM12(parseFloat(e.target.value) || 0)}
                              className="w-full text-center py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-bold focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">a21 ($y$-shear)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={m21}
                              onChange={(e) => setM21(parseFloat(e.target.value) || 0)}
                              className="w-full text-center py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-bold focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-1">a22 ($y$-scale)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={m22}
                              onChange={(e) => setM22(parseFloat(e.target.value) || 0)}
                              className="w-full text-center py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-white font-bold focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Presets */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-400 block">Quick Presets:</span>
                        <div className="grid grid-cols-2 gap-1.5 text-xs">
                          <button
                            onClick={() => applyPreset('rotation')}
                            className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-700/80 transition text-left"
                          >
                            45° Rotation
                          </button>
                          <button
                            onClick={() => applyPreset('shear')}
                            className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-700/80 transition text-left"
                          >
                            Horizontal Shear
                          </button>
                          <button
                            onClick={() => applyPreset('reflection')}
                            className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-700/80 transition text-left"
                          >
                            Reflection
                          </button>
                          <button
                            onClick={() => applyPreset('singular')}
                            className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-700/80 transition text-left"
                          >
                            Projection (Rank 1)
                          </button>
                        </div>
                      </div>

                      {/* Live Computed Metrics */}
                      <div className="text-xs bg-blue-950/40 p-3 rounded-xl border border-blue-900/50 space-y-1.5 text-blue-200">
                        <div className="flex justify-between items-center">
                          <span>Determinant $\det(A)$:</span>
                          <strong className="text-blue-400 font-mono text-sm">{determinant.toFixed(2)}</strong>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Area Scale Factor:</span>
                          <strong className="text-emerald-400 font-mono text-sm">
                            {Math.abs(determinant).toFixed(2)}x
                          </strong>
                        </div>
                        <div className="text-[10px] text-slate-400 pt-1 border-t border-blue-900/40">
                          {Math.abs(determinant) < 0.001
                            ? '⚠️ Singular Matrix (Rank < 2): 2D space collapsed to a 1D line!'
                            : determinant < 0
                            ? 'Orientation reversed (negative determinant reflection).'
                            : 'Orientation preserved.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                {/* Knowledge Check Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">Module {activeModuleId} Knowledge Check</h4>
                      <p className="text-xs text-slate-400">Ready to test mastery of this module's concepts?</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('quiz');
                      setQuizModuleKey(`m${activeModuleId}`);
                      setShowSolutionsGuide(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
                  >
                    <span>Take Module {activeModuleId} Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ModuleTemplate>
            </div>
          )}

          {/* ==================== PRACTICE QUIZZES & SOLUTIONS SECTION ==================== */}
          {activeTab === 'quiz' && (
            <QuizTemplate
              title="Linear Algebra Assessment & Derivations"
              subtitle="CS229 Linear Algebra Rigorous Assessment & Solutions"
              modules={laQuizModules}
              initialModuleId={quizModuleKey}
              onSelectModule={setQuizModuleKey}
              onBackToStudy={(modId) => {
                setActiveTab('study');
                setShowSolutionsGuide(false);
                const num = typeof modId === 'number' ? modId : parseInt(String(modId).replace(/\D/g, ''), 10) || 1;
                setActiveModuleId(num);
              }}
              showSolutions={showSolutionsGuide}
              onToggleSolutions={setShowSolutionsGuide}
              storageKey="linear_algebra_quiz_answers"
              onAnswersChange={setQuizUserAnswers}
            />
          )}
        </div>
      </div>

      {/* Universal VIP Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcardsModal}
        onClose={() => setShowFlashcardsModal(false)}
        title="Linear Algebra Flashcards"
        subtitle="Stanford CS229 VIP Formula Refresher — Modules 1–6"
        cards={LA_FLASHCARDS}
        activeModuleId={activeModuleId}
        storageKey="linear_algebra_flashcards_mastered"
      />
    </div>
  );
};
