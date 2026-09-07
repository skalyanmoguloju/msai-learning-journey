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
  Search,
  Compass,
  Move
} from 'lucide-react';
import katex from 'katex';
import {
  LA_MODULES_DATA,
  LA_QUIZ_MODULES,
  StudyModule
} from './linearAlgebraData';
import { ModuleTemplate } from '../common/ModuleTemplate';

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

export const LinearAlgebraMasteryHub: React.FC = () => {
  // Navigation & View States
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');
  const [showSolutionsGuide, setShowSolutionsGuide] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [globalMathEnabled, setGlobalMathEnabled] = useState<boolean>(true);

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

  // Quiz State
  const [quizModuleKey, setQuizModuleKey] = useState<string>('m1');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
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

  // Quiz computations
  const currentQuizMod = LA_QUIZ_MODULES[quizModuleKey] || LA_QUIZ_MODULES.m1;
  const currentQ = currentQuizMod.questions[currentQuestionIdx] || currentQuizMod.questions[0];
  const currentAnswerKey = `${quizModuleKey}_${currentQuestionIdx}`;
  const selectedOption = quizUserAnswers[currentAnswerKey];

  const handleSelectQuizOption = (idx: number) => {
    setQuizUserAnswers((prev) => ({
      ...prev,
      [currentAnswerKey]: idx
    }));
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx < currentQuizMod.questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleResetCurrentQuiz = () => {
    setQuizUserAnswers((prev) => {
      const next = { ...prev };
      currentQuizMod.questions.forEach((_, idx) => {
        delete next[`${quizModuleKey}_${idx}`];
      });
      return next;
    });
    setCurrentQuestionIdx(0);
  };

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

  // Search filter jump
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) return;

    const lower = query.toLowerCase();
    const match = LA_MODULES_DATA.find(
      (m) =>
        m.title.toLowerCase().includes(lower) ||
        m.summary.toLowerCase().includes(lower) ||
        m.definitions.some((d) => d.term.toLowerCase().includes(lower) || d.def.toLowerCase().includes(lower))
    );
    if (match && match.id !== activeModuleId) {
      setActiveModuleId(match.id);
      setActiveTab('study');
    }
  };

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

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Top Banner with Math Toggle & Status */}
      <div className="rounded-2xl p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20 text-white shrink-0">
            <Grid3X3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                Degree Foundation · Long-Term Mastery
              </span>
              <span className="text-xs text-slate-400">Stanford CS229 Companion</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              CS229 Linear Algebra &amp; Matrix Calculus Masterclass
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Modules 1–6 Interactive Matrix Playground, Spectral Theory, Norms &amp; Least Squares
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto flex-wrap">
          {/* Global Score Meter */}
          <div className="flex items-center space-x-3 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
            <span className="text-xs font-semibold text-slate-300">Mastery:</span>
            <div className="w-24 sm:w-28 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-blue-400">{completionPct}%</span>
            <span className="text-[10px] font-mono text-slate-400 pl-1 border-l border-slate-700">
              {totalCorrect}/{totalQuestions} Qs
            </span>
          </div>

          {/* Reset Progress Button */}
          <button
            onClick={resetAllProgress}
            title="Reset All Linear Algebra Progress"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 border border-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Math Toggle */}
          <button
            onClick={() => setGlobalMathEnabled((prev) => !prev)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all shadow-sm"
          >
            Math Notation: <strong className={globalMathEnabled ? 'text-blue-400' : 'text-slate-400'}>{globalMathEnabled ? 'On' : 'Off'}</strong>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search concepts, formulas (e.g. Eigenvalue, Gradient, Norm, Spectral, Trace)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
        />
      </div>

      {/* Main Layout: Vertical Module Menu (Desktop) + Mobile Horizontal Pills */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
        {/* Mobile Module Selector (strictly lg:hidden) */}
        <div className="lg:hidden w-full space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('study');
                setShowSolutionsGuide(false);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'study'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Study Guide</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                setShowSolutionsGuide(false);
                setQuizModuleKey(`m${activeModuleId}`);
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz' && !showSolutionsGuide
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Practice Quizzes</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                setShowSolutionsGuide(true);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'quiz' && showSolutionsGuide
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5" />
              <span>Solutions</span>
            </button>
          </div>

          {activeTab === 'study' && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {LA_MODULES_DATA.map((mod) => {
                const isActive = mod.id === activeModuleId;
                const isDone = completedModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleId(mod.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                        : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mod.id}
                    </span>
                    <span>Mod {mod.id}</span>
                    {isDone && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                    {mod.hasVisualizer && (
                      <span className="px-1 py-0.2 rounded text-[9px] bg-cyan-400/20 text-cyan-300 font-bold">
                        2D Lab
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Sidebar Navigation (Vertical Menu, lg:block) */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-3 sticky top-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between px-1 mb-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Course Modules</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                {completedModules.length}/6 Done
              </span>
            </div>
            <nav className="space-y-1">
              {LA_MODULES_DATA.map((mod) => {
                const isActive = activeTab === 'study' && mod.id === activeModuleId;
                const isDone = completedModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setActiveTab('study');
                      setShowSolutionsGuide(false);
                      setActiveModuleId(mod.id);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {mod.id}
                      </span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      {mod.hasVisualizer && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-400/20 text-cyan-300 font-bold">
                          Lab
                        </span>
                      )}
                      {isDone && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Practice Quizzes & Solutions Guide Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Assessments &amp; Guides
            </p>
            <button
              onClick={() => {
                setActiveTab('quiz');
                setShowSolutionsGuide(false);
                setQuizModuleKey(`m${activeModuleId}`);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeTab === 'quiz' && !showSolutionsGuide
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>Practice Quizzes</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-400/20 text-blue-300">
                24 Qs
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab('quiz');
                setShowSolutionsGuide(true);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeTab === 'quiz' && showSolutionsGuide
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ListChecks className="w-4 h-4 text-emerald-400" />
                <span>Full Solutions Guide</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Quick Reading Mode Info Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-indigo-950/40 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Quick Reading Mode</span>
              <span className="font-bold text-blue-400">Active</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full transition-all duration-300"
                style={{ width: `${(activeModule.id / 6) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>Module {activeModule.id} of 6</span>
              <span className="text-slate-300 font-medium">{activeModule.badge}</span>
            </div>
          </div>
        </aside>

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
                          <MathView tex={f.tex} display={true} enabled={globalMathEnabled} />
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
                                <MathView tex={c.latex} display={true} enabled={globalMathEnabled} />
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

              </ModuleTemplate>

                {/* Callout Banner to Practice Quiz */}
                <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-blue-950/60 border border-indigo-800/40 rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Ready to test your mastery?
                      </span>
                      <span className="text-xs text-slate-400">24 Rigorous Problems across Modules 1–6</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Practice Module {activeModuleId}: {LA_QUIZ_MODULES[`m${activeModuleId}`]?.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Validate inner/outer products, trace identities, rank-nullity, spectral theorem, and least squares derivations.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('quiz');
                      setQuizModuleKey(`m${activeModuleId}`);
                      setCurrentQuestionIdx(0);
                      setShowSolutionsGuide(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-blue-500/20 flex items-center gap-2 shrink-0"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Take Module {activeModuleId} Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
          )}

          {/* ==================== PRACTICE QUIZZES & SOLUTIONS SECTION ==================== */}
          {activeTab === 'quiz' && (
            <div className="space-y-6">
              {/* Header Controls: Back to Study Guide & Solutions Guide Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                      Interactive Assessment
                    </span>
                    <span className="text-xs text-slate-400">24 Rigorous Problems</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {showSolutionsGuide
                      ? 'Comprehensive Linear Algebra Solutions Guide'
                      : 'Linear Algebra Assessment & Derivations'}
                  </h3>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setShowSolutionsGuide(!showSolutionsGuide)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                      showSolutionsGuide
                        ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                    }`}
                  >
                    <ListChecks className="w-4 h-4" />
                    <span>{showSolutionsGuide ? 'Practice Quiz Mode' : 'View Full Solutions'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('study')}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Study Guide</span>
                  </button>
                </div>
              </div>

              {/* Module Selector Grid (Modules 1 to 6) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
                {[
                  { id: 'm1', label: 'Mod 1', title: 'Notation & Products', sub: 'Inner, Outer & 4 Views' },
                  { id: 'm2', label: 'Mod 2', title: 'Trace & Norms', sub: 'Cyclic Trace, Frobenius' },
                  { id: 'm3', label: 'Mod 3', title: 'Rank & Spaces', sub: 'Rank-Nullity, Orthogonal' },
                  { id: 'm4', label: 'Mod 4', title: 'Determinants', sub: 'Volume, Definiteness' },
                  { id: 'm5', label: 'Mod 5', title: 'Eigenvalues', sub: 'Spectral Theory, PCA' },
                  { id: 'm6', label: 'Mod 6', title: 'Matrix Calculus', sub: 'Gradients, Least Squares' }
                ].map((m) => {
                  const isSelected = quizModuleKey === m.id;
                  const qMod = LA_QUIZ_MODULES[m.id];
                  const answeredInMod = qMod.questions.filter(
                    (_, qIdx) => quizUserAnswers[`${m.id}_${qIdx}`] !== undefined
                  ).length;
                  const isCompleted = answeredInMod === qMod.questions.length;

                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setQuizModuleKey(m.id);
                        setCurrentQuestionIdx(0);
                        setShowSolutionsGuide(false);
                      }}
                      className={`border-2 p-3 rounded-xl text-left transition relative overflow-hidden group shadow-md flex flex-col justify-between ${
                        isSelected && !showSolutionsGuide
                          ? 'border-blue-500 bg-slate-900 shadow-blue-500/10 ring-1 ring-blue-500/30'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            {m.label}
                          </span>
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : answeredInMod > 0 ? (
                            <span className="text-[9px] font-mono text-blue-300 bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-800">
                              {answeredInMod}/{qMod.questions.length}
                            </span>
                          ) : null}
                        </div>
                        <h4 className="font-semibold text-slate-100 text-xs line-clamp-2 leading-tight">
                          {m.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{m.sub}</p>
                    </button>
                  );
                })}
              </div>

              {/* If NOT showing solutions guide: Interactive Practice Quiz */}
              {!showSolutionsGuide ? (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md relative space-y-6">
                  {/* Progress Bar & Header */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                      <span>
                        Question <strong className="text-white">{currentQuestionIdx + 1}</strong> of{' '}
                        {currentQuizMod.questions.length}
                      </span>
                      <span className="text-blue-400 font-semibold">{currentQuizMod.title}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentQuestionIdx + 1) / currentQuizMod.questions.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Question Statement */}
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 shadow-inner">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Problem Statement
                    </span>
                    <div className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                      <MathText text={currentQ.question} />
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQ.options.map((optText, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentQ.correct;
                      const hasAnswered = selectedOption !== undefined;

                      let btnStyle =
                        'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/50';
                      if (hasAnswered) {
                        if (isCorrect) {
                          btnStyle =
                            'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-medium shadow-sm shadow-emerald-500/10';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-950/60 border-rose-500/80 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between group ${btnStyle}`}
                        >
                          <div className="pr-4">
                            <MathText text={optText} />
                          </div>
                          <div className="shrink-0">
                            {hasAnswered ? (
                              isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : isSelected ? (
                                <XCircle className="w-5 h-5 text-rose-400" />
                              ) : (
                                <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                              )
                            ) : (
                              <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400 group-hover:border-slate-500">
                                {String.fromCharCode(65 + idx)}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box */}
                  {selectedOption !== undefined && (
                    <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-xl text-sm space-y-2.5 animate-fade-in shadow-md">
                      <div
                        className={`flex items-center gap-2 font-bold ${
                          selectedOption === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {selectedOption === currentQ.correct ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Correct Solution!
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4" /> Incorrect Solution
                          </>
                        )}
                      </div>
                      <div className="text-slate-300 leading-relaxed space-y-2">
                        <MathText text={currentQ.explanation} />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                    <button
                      onClick={handlePrevQuizQuestion}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white transition text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 border border-slate-700/60"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={handleResetCurrentQuiz}
                        className="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition text-xs font-medium flex items-center gap-1.5 border border-slate-700/60"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset Module Quiz
                      </button>
                      <button
                        onClick={handleNextQuizQuestion}
                        disabled={currentQuestionIdx === currentQuizMod.questions.length - 1}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ==================== SOLUTIONS GUIDE VIEW ==================== */
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 mb-1 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-emerald-400" /> Comprehensive Solution Guide &amp; Derivations
                      </h3>
                      <p className="text-xs text-slate-400">
                        Complete step-by-step mathematical solutions for all 24 questions across Modules 1 through 6.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSolutionsGuide(false)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-md"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Practice Quiz
                    </button>
                  </div>

                  <div className="space-y-6">
                    {Object.keys(LA_QUIZ_MODULES).map((mKey) => {
                      const mod = LA_QUIZ_MODULES[mKey];
                      return (
                        <div key={mKey} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-blue-500" /> {mod.title}
                            </h4>
                            <button
                              onClick={() => {
                                setQuizModuleKey(mKey);
                                setCurrentQuestionIdx(0);
                                setShowSolutionsGuide(false);
                              }}
                              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
                            >
                              Take Quiz <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="space-y-4">
                            {mod.questions.map((q, idx) => (
                              <div key={q.id} className="space-y-2 text-xs border-b border-slate-900 pb-4 last:border-0">
                                <div className="font-semibold text-slate-200">
                                  <span className="text-blue-400 mr-1.5 font-bold">Q{idx + 1}:</span>
                                  <MathText text={q.question} />
                                </div>
                                <div className="text-emerald-400 font-mono flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                  <span>Answer:</span>
                                  <MathText text={q.options[q.correct]} />
                                </div>
                                <div className="text-slate-300 bg-slate-900/90 p-3.5 rounded-lg leading-relaxed border border-slate-800/60 font-sans">
                                  <MathText text={q.explanation} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
