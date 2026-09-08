import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import katex from 'katex';
import {
  BookOpen,
  GraduationCap,
  HelpCircle,
  Ruler,
  Filter,
  ListChecks,
  CheckCircle2,
  CheckCircle,
  XCircle,
  X,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Calculator,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Shuffle,
  Award
} from 'lucide-react';
import { CALCULUS_FLASHCARDS } from './calculusFlashcardsData';
import { UniversalFlashcardsModal } from '../../common/UniversalFlashcardsModal';
import { ModuleTemplate } from '../../common/ModuleTemplate';
import { RootHeaderBanner, ModuleAndToolSidebar, ModuleSidebarItem, ToolSidebarItem, QuizTemplate, QuizModuleItem } from '../common';
import { curriculumNavStore } from '../../curriculum/navigationStore';

// Dedicated Flashcard KaTeX Formula Renderer (Display Mode)
export const FlashcardFormula: React.FC<{ tex: string; className?: string }> = ({ tex, className = '' }) => {
  const html = useMemo(() => {
    if (!tex) return '';
    const cleanTex = tex.trim().replace(/^\$\$([\s\S]*)\$\$$/, '$1').replace(/^\$([\s\S]*)\$$/, '$1');
    try {
      return katex.renderToString(cleanTex, {
        displayMode: true,
        throwOnError: false
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return `<span class="text-rose-400 font-mono text-sm">${tex}</span>`;
    }
  }, [tex]);

  return (
    <div
      className={`katex-display overflow-x-auto py-1 text-center select-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Math rendering helper component (handles mixed text with $...$/$$...$$, and raw TeX)
export const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const html = useMemo(() => {
    if (!text) return '';

    // If text contains $ delimiters, parse $$...$$ and $...$
    if (text.includes('$')) {
      let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => {
        try {
          return katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false });
        } catch {
          return latex;
        }
      });
      res = res.replace(/\$([^\$\n]+?)\$/g, (_, latex) => {
        try {
          return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false });
        } catch {
          return latex;
        }
      });
      return res;
    }

    // If text has no $ but contains LaTeX commands, render with KaTeX
    if (text.includes('\\') || /^[a-zA-Z0-9_^{}()[\]\s=+\-*/|<>]+$/.test(text)) {
      try {
        return katex.renderToString(text.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return text;
      }
    }

    return text;
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface ModuleData {
  title: string;
  questions: Question[];
}

export const QUIZ_MODULES: Record<string, ModuleData> = {
  m1: {
    title: "Module 1: Limits & Continuity",
    questions: [
      {
        id: "m1_1",
        question: "Evaluate the limit: $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$.",
        options: [
          "$4$",
          "$2$",
          "$0$",
          "Does not exist"
        ],
        correct: 0,
        explanation: "Factor the numerator: $\\frac{x^2 - 4}{x - 2} = \\frac{(x - 2)(x + 2)}{x - 2} = x + 2$ (for $x \\neq 2$).\\\\\nNow substitute $x = 2$: $2 + 2 = 4$."
      },
      {
        id: "m1_2",
        question: "What is $\\lim_{x \\to 0} \\frac{\\sin(x)}{x}$?",
        options: [
          "$1$",
          "$0$",
          "$\\infty$",
          "Undefined"
        ],
        correct: 0,
        explanation: "This is a fundamental trigonometric limit: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$."
      },
      {
        id: "m1_3",
        question: "Which condition MUST be satisfied for a function $f(x)$ to be continuous at $x = c$?",
        options: [
          "$\\lim_{x \\to c} f(x) = f(c)$",
          "$f'(c)$ must exist",
          "$\\lim_{x \\to c} f(x) = 0$",
          "$f(c) > 0$"
        ],
        correct: 0,
        explanation: "By definition, continuity at $x = c$ requires $f(c)$ to be defined, $\\lim_{x \\to c} f(x)$ to exist, and $\\lim_{x \\to c} f(x) = f(c)$."
      },
      {
        id: "m1_4",
        question: "Evaluate the limit at infinity: $\\lim_{x \\to \\infty} \\frac{3x^2 + 5x}{2x^2 - 1}$.",
        options: [
          "$\\frac{3}{2}$",
          "$\\infty$",
          "$0$",
          "$\\frac{5}{2}$"
        ],
        correct: 0,
        explanation: "Divide numerator and denominator by $x^2$: $\\lim_{x \\to \\infty} \\frac{3 + 5/x}{2 - 1/x^2} = \\frac{3 + 0}{2 - 0} = \\frac{3}{2}$."
      }
    ]
  },
  m2: {
    title: "Module 2: Basic Derivative Rules",
    questions: [
      {
        id: "m2_1",
        question: "Which limit defines the derivative $f'(x)$?",
        options: [
          "$\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$",
          "$\\lim_{h \\to \\infty} \\frac{f(x+h) - f(x)}{h}$",
          "$\\lim_{x \\to 0} \\frac{f(x+h)}{h}$",
          "$\\lim_{h \\to 0} \\frac{f(x) - f(h)}{x}$"
        ],
        correct: 0,
        explanation: "The formal definition of derivative as the limit of the difference quotient is $\\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$."
      },
      {
        id: "m2_2",
        question: "What is the derivative of $f(x) = 4x^5 - 3x^3 + 7x - 12$?",
        options: [
          "$20x^4 - 9x^2 + 7$",
          "$20x^4 - 9x^2 + 7x$",
          "$4x^4 - 3x^2 + 7$",
          "$20x^5 - 9x^3 + 7$"
        ],
        correct: 0,
        explanation: "Apply the Power Rule $\\frac{d}{dx}[x^n] = n x^{n-1}$ term-by-term:\\\\\n$\\frac{d}{dx}[4x^5] = 20x^4$, $\\frac{d}{dx}[-3x^3] = -9x^2$, $\\frac{d}{dx}[7x] = 7$, constant $-12 \\to 0$.\\\\\nResult: $20x^4 - 9x^2 + 7$."
      },
      {
        id: "m2_3",
        question: "Find the second derivative $f''(x)$ if $f(x) = x^4 - 2x^3 + 5x$.",
        options: [
          "$12x^2 - 12x$",
          "$4x^3 - 6x^2 + 5$",
          "$12x^2 - 6x$",
          "$24x - 12$"
        ],
        correct: 0,
        explanation: "First derivative: $f'(x) = 4x^3 - 6x^2 + 5$.\\\\\nSecond derivative: $f''(x) = \\frac{d}{dx}[4x^3 - 6x^2 + 5] = 12x^2 - 12x$."
      }
    ]
  },
  m3: {
    title: "Module 3: Transcendental Functions",
    questions: [
      {
        id: "m3_1",
        question: "What is the derivative of $f(x) = 3e^x - 2\\ln(x)$?",
        options: [
          "$3e^x - \\frac{2}{x}$",
          "$3e^x - 2x$",
          "$e^x - \\frac{2}{x}$",
          "$3xe^{x-1} - \\frac{2}{x}$"
        ],
        correct: 0,
        explanation: "Recall that $\\frac{d}{dx}[e^x] = e^x$ and $\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}$.\\\\\nCombining with constants yields $3e^x - \\frac{2}{x}$."
      },
      {
        id: "m3_2",
        question: "What is the derivative of $f(x) = 5\\sin(x) + 4\\cos(x) - \\tan(x)$?",
        options: [
          "$5\\cos(x) - 4\\sin(x) - \\sec^2(x)$",
          "$5\\cos(x) + 4\\sin(x) - \\sec^2(x)$",
          "$-5\\cos(x) - 4\\sin(x) + \\csc^2(x)$",
          "$5\\cos(x) - 4\\sin(x) - \\sec(x)\\tan(x)$"
        ],
        correct: 0,
        explanation: "Trig derivatives:\\\\\n$\\frac{d}{dx}[\\sin(x)] = \\cos(x)$, $\\frac{d}{dx}[\\cos(x)] = -\\sin(x)$, $\\frac{d}{dx}[\\tan(x)] = \\sec^2(x)$.\\\\\n$f'(x) = 5\\cos(x) - 4\\sin(x) - \\sec^2(x)$."
      },
      {
        id: "m3_3",
        question: "What is the derivative of $f(x) = 2^x + \\log_{10}(x)$?",
        options: [
          "$2^x \\ln(2) + \\frac{1}{x \\ln(10)}$",
          "$x 2^{x-1} + \\frac{1}{x}$",
          "$2^x + \\frac{1}{x \\ln(10)}$",
          "$2^x \\ln(2) + \\frac{\\ln(10)}{x}$"
        ],
        correct: 0,
        explanation: "General base formulas: $\\frac{d}{dx}[a^x] = a^x \\ln(a)$ and $\\frac{d}{dx}[\\log_a(x)] = \\frac{1}{x \\ln(a)}$.\\\\\nTherefore, $f'(x) = 2^x \\ln(2) + \\frac{1}{x \\ln(10)}$."
      },
      {
        id: "m3_4",
        question: "What is the derivative of $f(x) = \\arctan(x) + \\arcsin(x)$?",
        options: [
          "$\\frac{1}{1 + x^2} + \\frac{1}{\\sqrt{1 - x^2}}$",
          "$\\frac{1}{1 + x^2} + \\frac{1}{1 - x^2}$",
          "$\\frac{1}{\\sqrt{1+x^2}} + \\frac{1}{\\sqrt{1-x^2}}$",
          "$\\sec^2(x) + \\frac{1}{\\sqrt{1-x^2}}$"
        ],
        correct: 0,
        explanation: "Inverse trig rules:\\\\\n$\\frac{d}{dx}[\\arctan(x)] = \\frac{1}{1+x^2}$ and $\\frac{d}{dx}[\\arcsin(x)] = \\frac{1}{\\sqrt{1-x^2}}$.\\\\\nSum = $\\frac{1}{1 + x^2} + \\frac{1}{\\sqrt{1 - x^2}}$."
      }
    ]
  },
  m4: {
    title: "Module 4: Product, Quotient & Chain Rules",
    questions: [
      {
        id: "m4_1",
        question: "What is the derivative of $f(x) = x^4 \\cdot \\cos(x)$?",
        options: [
          "$4x^3 \\cos(x) - x^4 \\sin(x)$",
          "$4x^3 \\cos(x) + x^4 \\sin(x)$",
          "$-4x^3 \\sin(x)$",
          "$4x^3 - \\sin(x)$"
        ],
        correct: 0,
        explanation: "Apply Product Rule $(u v)' = u'v + uv'$:\\\\\nLet $u = x^4 \\implies u' = 4x^3$, and $v = \\cos(x) \\implies v' = -\\sin(x)$.\\\\\n$f'(x) = 4x^3 \\cos(x) + x^4(-\\sin(x)) = 4x^3 \\cos(x) - x^4 \\sin(x)$."
      },
      {
        id: "m4_2",
        question: "What is the derivative of $f(x) = \\frac{e^x}{x^3 + 1}$?",
        options: [
          "$\\frac{e^x(x^3 - 3x^2 + 1)}{(x^3 + 1)^2}$",
          "$\\frac{e^x(x^3 + 3x^2 + 1)}{(x^3 + 1)^2}$",
          "$\\frac{e^x}{3x^2}$",
          "$\\frac{e^x(3x^2 - x^3 - 1)}{(x^3 + 1)^2}$"
        ],
        correct: 0,
        explanation: "Apply Quotient Rule $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$:\\\\\n$u = e^x, u' = e^x$; $v = x^3+1, v' = 3x^2$.\\\\\n$f'(x) = \\frac{e^x(x^3+1) - e^x(3x^2)}{(x^3+1)^2} = \\frac{e^x(x^3 - 3x^2 + 1)}{(x^3 + 1)^2}$."
      },
      {
        id: "m4_3",
        question: "What is the derivative of $f(x) = \\ln(5x^3 + 2)$?",
        options: [
          "$\\frac{15x^2}{5x^3 + 2}$",
          "$\\frac{1}{5x^3 + 2}$",
          "$\\frac{15x^2}{x}$",
          "$\\frac{5x^3 + 2}{15x^2}$"
        ],
        correct: 0,
        explanation: "Apply Chain Rule for logarithm $\\frac{d}{dx}[\\ln(g(x))] = \\frac{g'(x)}{g(x)}$:\\\\\nHere $g(x) = 5x^3 + 2 \\implies g'(x) = 15x^2$.\\\\\nResult: $\\frac{15x^2}{5x^3 + 2}$."
      },
      {
        id: "m4_4",
        question: "What is the derivative of $f(x) = (3x^2 + 1)^4 \\cdot e^{2x}$?",
        options: [
          "$2(3x^2 + 1)^3 e^{2x} (12x + 3x^2 + 1)$",
          "$24x(3x^2 + 1)^3 e^{2x}$",
          "$4(3x^2 + 1)^3 \\cdot 2e^{2x}$",
          "$2(3x^2 + 1)^4 e^{2x} + 24x e^{2x}$"
        ],
        correct: 0,
        explanation: "Combine Product Rule & Chain Rule:\\\\\n$u = (3x^2+1)^4 \\implies u' = 4(3x^2+1)^3(6x) = 24x(3x^2+1)^3$.\\\\\n$v = e^{2x} \\implies v' = 2e^{2x}$.\\\\\n$f'(x) = 24x(3x^2+1)^3 e^{2x} + (3x^2+1)^4 (2e^{2x}) = 2(3x^2 + 1)^3 e^{2x} (12x + 3x^2 + 1)$."
      }
    ]
  },
  m5: {
    title: "Module 5: Implicit Differentiation & Related Rates",
    questions: [
      {
        id: "m5_1",
        question: "Find $\\frac{dy}{dx}$ for the curve defined implicitly by $x^3 + y^3 = 6xy$.",
        options: [
          "$\\frac{2y - x^2}{y^2 - 2x}$",
          "$\\frac{x^2 - 2y}{2x - y^2}$",
          "$\\frac{3x^2 - 6y}{6x - 3y^2}$",
          "$\\frac{2x - y^2}{x^2 - 2y}$"
        ],
        correct: 0,
        explanation: "Differentiate both sides with respect to $x$:\\\\\n$3x^2 + 3y^2 \\frac{dy}{dx} = 6y + 6x \\frac{dy}{dx}$\\\\\n$3y^2 \\frac{dy}{dx} - 6x \\frac{dy}{dx} = 6y - 3x^2 \\implies \\frac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2$\\\\\n$\\frac{dy}{dx} = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}$."
      },
      {
        id: "m5_2",
        question: "Find the slope of the tangent line to the ellipse $x^2 + 4y^2 = 25$ at $(3, 2)$.",
        options: [
          "$-\\frac{3}{8}$",
          "$-\\frac{3}{4}$",
          "$\\frac{3}{8}$",
          "$-\\frac{8}{3}$"
        ],
        correct: 0,
        explanation: "Differentiate implicitly: $2x + 8y \\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{2x}{8y} = -\\frac{x}{4y}$.\\\\\nAt point $(3, 2)$: $\\frac{dy}{dx} = -\\frac{3}{4(2)} = -\\frac{3}{8}$."
      },
      {
        id: "m5_3",
        question: "A $13\\text{ ft}$ ladder leans against a wall sliding away at $0.5\\text{ ft/s}$. How fast is the top sliding down when bottom is $5\\text{ ft}$ from wall?",
        options: [
          "$-\\frac{5}{24}\\text{ ft/s}$",
          "$-\\frac{5}{12}\\text{ ft/s}$",
          "$-\\frac{1}{12}\\text{ ft/s}$",
          "$-\\frac{12}{5}\\text{ ft/s}$"
        ],
        correct: 0,
        explanation: "Equation: $x^2 + y^2 = 13^2$.\\\\\nWhen $x = 5$, $y = \\sqrt{169 - 25} = 12\\text{ ft}$.\\\\\nDifferentiating: $2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\implies 5(0.5) + 12 \\frac{dy}{dt} = 0$.\\\\\n$2.5 + 12 \\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{2.5}{12} = -\\frac{5}{24}\\text{ ft/s}$."
      },
      {
        id: "m5_4",
        question: "Water pours into a conical tank ($h=10\\text{m}, r=5\\text{m}$) at $3\\text{ m}^3\\text{/min}$. How fast is water level rising when depth is $4\\text{ m}$?",
        options: [
          "$\\frac{3}{4\\pi}\\text{ m/min}$",
          "$\\frac{3}{16\\pi}\\text{ m/min}$",
          "$\\frac{3}{8\\pi}\\text{ m/min}$",
          "$\\frac{4}{3\\pi}\\text{ m/min}$"
        ],
        correct: 0,
        explanation: "Similar triangles give $r/h = 5/10 = 1/2 \\implies r = h/2$.\\\\\nVolume $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi (h/2)^2 h = \\frac{\\pi}{12} h^3$.\\\\\nDifferentiating: $\\frac{dV}{dt} = \\frac{\\pi}{4} h^2 \\frac{dh}{dt}$.\\\\\nGiven $\\frac{dV}{dt} = 3$ and $h = 4$: $3 = \\frac{\\pi}{4}(16)\\frac{dh}{dt} \\implies 3 = 4\\pi \\frac{dh}{dt} \\implies \\frac{dh}{dt} = \\frac{3}{4\\pi}\\text{ m/min}$."
      }
    ]
  }
};

const CALCULUS_MODULES = [
  {
    id: 'm1' as const,
    num: 1,
    title: 'Limits & Continuity',
    subtitle: 'Limits, One-Sided Limits, Algebraic Techniques, Continuity & Intermediate Value Theorem'
  },
  {
    id: 'm2' as const,
    num: 2,
    title: 'The Derivative & Rules',
    subtitle: 'Limit Definition of Derivative, Power Rule, Linearity & Geometric Slopes'
  },
  {
    id: 'm3' as const,
    num: 3,
    title: 'Transcendental Functions',
    subtitle: 'Exponential Functions, Natural Logarithms, Trigonometric & Inverse Trig Rules'
  },
  {
    id: 'm4' as const,
    num: 4,
    title: 'Product, Quotient & Chain',
    subtitle: 'Product & Quotient Rules, Composite Chain Rule, Leibniz Formulation & Higher-Order'
  },
  {
    id: 'm5' as const,
    num: 5,
    title: 'Implicit Diff & Related Rates',
    subtitle: 'Implicit Differentiation Step-by-Step, 5-Step Related Rates Blueprint & Geometric Modeling'
  },
];

const CALCULUS_EXTRAS = [
  { id: 'flashcards' as const, title: 'Flashcards', icon: Sparkles, badge: '28 Cards' },
  { id: 'quiz' as const, title: 'Practice Quizzes', icon: HelpCircle, badge: '5 Quizzes' },
  { id: 'ladder' as const, title: 'Ladder Simulation', icon: Ruler, badge: 'Interactive' },
  { id: 'cone' as const, title: 'Conical Tank Lab', icon: Filter, badge: 'Simulation' },
  { id: 'cheatsheet' as const, title: 'Full Solution Guide', icon: HelpCircle, badge: 'Cheat Sheet' },
];

const HUB_KEY = 'calculus-mastery';

export const CalculusMasteryHub: React.FC = () => {
  const [activeTab, setActiveTabState] = useState<'study' | 'quiz' | 'ladder' | 'cone' | 'cheatsheet' | 'flashcards'>(() =>
    curriculumNavStore.getTabForRootHub(HUB_KEY, 'study') as any
  );
  const setActiveTab = useCallback((tab: 'study' | 'quiz' | 'ladder' | 'cone' | 'cheatsheet' | 'flashcards') => {
    curriculumNavStore.setTabForRootHub(HUB_KEY, tab);
    setActiveTabState(tab);
  }, []);

  const [activeStudyModule, setActiveStudyModuleState] = useState<'m1' | 'm2' | 'm3' | 'm4' | 'm5'>(() =>
    curriculumNavStore.getModuleForRootHub<'m1' | 'm2' | 'm3' | 'm4' | 'm5'>(HUB_KEY, 'm1')
  );
  const setActiveStudyModule = useCallback((mod: 'm1' | 'm2' | 'm3' | 'm4' | 'm5') => {
    curriculumNavStore.setModuleForRootHub(HUB_KEY, mod);
    setActiveStudyModuleState(mod);
  }, []);

  const [showFlashcardsModal, setShowFlashcardsModal] = useState<boolean>(false);

  // Flashcards State (CS229 VIP Formula Flashcards)
  const [cardCategory, setCardCategory] = useState<string>('All');
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardViewMode, setFlashcardViewMode] = useState<'deck' | 'grid'>('deck');
  const [masteredCards, setMasteredCards] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('calculus_flashcards_mastered') || '[]');
    } catch {
      return [];
    }
  });

  const toggleCardMastered = (cardId: string) => {
    setMasteredCards((prev) => {
      const next = prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId];
      try {
        localStorage.setItem('calculus_flashcards_mastered', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const filteredCards = useMemo(() => {
    if (cardCategory === 'All') return CALCULUS_FLASHCARDS;
    return CALCULUS_FLASHCARDS.filter((c) => c.category === cardCategory);
  }, [cardCategory]);

  const activeCard = filteredCards[currentCardIdx] || filteredCards[0];

  useEffect(() => {
    if (activeTab !== 'flashcards' && !showFlashcardsModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape' && showFlashcardsModal) {
        setShowFlashcardsModal(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentCardIdx((prev) => (prev + 1) % filteredCards.length);
        setIsCardFlipped(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentCardIdx((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
        setIsCardFlipped(false);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsCardFlipped((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, showFlashcardsModal, filteredCards.length]);

  // Completion State & Progress
  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('calculus_completed_modules') || '[]');
    } catch {
      return [];
    }
  });

  const toggleModuleComplete = (modId: string) => {
    setCompletedModules((prev) => {
      const next = prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId];
      localStorage.setItem('calculus_completed_modules', JSON.stringify(next));
      return next;
    });
  };

  const resetAllProgress = () => {
    setCompletedModules([]);
    localStorage.removeItem('calculus_completed_modules');
  };

  const pct = Math.round((completedModules.length / CALCULUS_MODULES.length) * 100);

  // Quiz State
  const [currentModuleKey, setCurrentModuleKeyState] = useState<string>(() =>
    curriculumNavStore.getQuizModuleForRootHub(HUB_KEY, 'm1')
  );
  const setCurrentModuleKey = useCallback((key: string) => {
    curriculumNavStore.setQuizModuleForRootHub(HUB_KEY, key);
    setCurrentModuleKeyState(key);
  }, []);

  const [showQuizSolutions, setShowQuizSolutionsState] = useState<boolean>(() =>
    curriculumNavStore.getSolutionsModeForRootHub(HUB_KEY)
  );
  const setShowQuizSolutions = useCallback((show: boolean) => {
    curriculumNavStore.setSolutionsModeForRootHub(HUB_KEY, show);
    setShowQuizSolutionsState(show);
  }, []);

  // Ladder Simulation State
  const [ladderX, setLadderX] = useState<number>(5.0);
  const [ladderDxdt, setLadderDxdt] = useState<number>(0.5);
  const ladderCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cone Simulation State
  const [coneH, setConeH] = useState<number>(4.0);
  const [coneDvdt, setConeDvdt] = useState<number>(3.0);
  const coneCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Ladder calculations
  const ladderL = 13.0;
  const ladderY = Math.sqrt(Math.max(0.1, ladderL * ladderL - ladderX * ladderX));
  const ladderDydt = -(ladderX * ladderDxdt) / (ladderY || 1);

  // Cone calculations
  const coneR = coneH / 2.0;
  const coneV = (Math.PI / 12.0) * Math.pow(coneH, 3);
  const coneDhdt = coneDvdt / ((Math.PI / 4.0) * Math.pow(coneH, 2));


  // Render Ladder Canvas
  useEffect(() => {
    const canvas = ladderCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const originX = 80;
    const originY = 280;
    const scale = 18; // pixels per foot

    const wallHeightPx = ladderY * scale;
    const groundWidthPx = ladderX * scale;

    // Draw Wall and Ground
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;

    // Vertical Wall
    ctx.beginPath();
    ctx.moveTo(originX, originY - 250);
    ctx.lineTo(originX, originY);
    ctx.stroke();

    // Horizontal Ground
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 380, originY);
    ctx.stroke();

    // Triangle fill
    ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - wallHeightPx);
    ctx.lineTo(originX + groundWidthPx, originY);
    ctx.closePath();
    ctx.fill();

    // Ladder
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(originX, originY - wallHeightPx);
    ctx.lineTo(originX + groundWidthPx, originY);
    ctx.stroke();

    // Bottom vector (dx/dt)
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX + groundWidthPx, originY);
    ctx.lineTo(originX + groundWidthPx + 40, originY);
    ctx.stroke();

    // Top vector (dy/dt)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY - wallHeightPx);
    ctx.lineTo(originX, originY - wallHeightPx + 40);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px monospace';
    ctx.fillText('Ladder L = 13 ft', originX + groundWidthPx / 2 - 30, originY - wallHeightPx / 2 - 10);
    ctx.fillText(`y = ${ladderY.toFixed(2)} ft`, originX - 68, originY - wallHeightPx / 2);
    ctx.fillText(`x = ${ladderX.toFixed(1)} ft`, originX + groundWidthPx / 2 - 20, originY + 25);
  }, [ladderX, ladderDxdt, ladderY, activeTab]);

  // Render Cone Canvas
  useEffect(() => {
    const canvas = coneCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 250;
    const topY = 50;
    const apexY = 290;
    const coneHeightPx = apexY - topY; // 240px representing 10m
    const maxRadiusPx = 120; // representing 5m

    // Draw Cone Outer Outline
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(centerX - maxRadiusPx, topY);
    ctx.lineTo(centerX + maxRadiusPx, topY);
    ctx.lineTo(centerX, apexY);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]);

    // Water height calculation
    const waterHeightPx = (coneH / 10.0) * coneHeightPx;
    const waterRadiusPx = (coneR / 5.0) * maxRadiusPx;
    const waterTopY = apexY - waterHeightPx;

    // Draw Water Body
    ctx.fillStyle = 'rgba(2, 132, 199, 0.5)';
    ctx.beginPath();
    ctx.moveTo(centerX - waterRadiusPx, waterTopY);
    ctx.lineTo(centerX + waterRadiusPx, waterTopY);
    ctx.lineTo(centerX, apexY);
    ctx.closePath();
    ctx.fill();

    // Water Top Ellipse Surface
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(centerX, waterTopY, waterRadiusPx, 10, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Labels
    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px monospace';
    ctx.fillText(`Water Depth h = ${coneH.toFixed(1)} m`, centerX + waterRadiusPx + 15, waterTopY + 5);
    ctx.fillText(`Water Radius r = ${coneR.toFixed(2)} m`, centerX - 45, waterTopY - 15);
  }, [coneH, coneDvdt, coneR, activeTab]);

  const calculusQuizModules: QuizModuleItem[] = useMemo(() => {
    return CALCULUS_MODULES.map((cm) => ({
      id: cm.id,
      stepNumber: cm.num,
      title: cm.title,
      badge: cm.title,
      sub: cm.subtitle,
      questions: QUIZ_MODULES[cm.id]?.questions || []
    }));
  }, []);

  const calculusModules: ModuleSidebarItem[] = useMemo(() => {
    return CALCULUS_MODULES.map((mod) => ({
      id: mod.id,
      title: mod.title,
      isDone: completedModules.includes(mod.id),
    }));
  }, [completedModules]);

  const calculusTools: ToolSidebarItem[] = useMemo(() => {
    return CALCULUS_EXTRAS.map((extra) => ({
      id: extra.id,
      title: extra.title,
      icon: extra.icon,
      badge: extra.badge,
      isActive:
        extra.id === 'flashcards'
          ? showFlashcardsModal
          : extra.id === 'cheatsheet'
          ? activeTab === 'quiz' && showQuizSolutions
          : extra.id === 'quiz'
          ? activeTab === 'quiz' && !showQuizSolutions
          : activeTab === extra.id,
      onClick: () => {
        if (extra.id === 'flashcards') {
          setShowFlashcardsModal(true);
        } else if (extra.id === 'cheatsheet') {
          setActiveTab('quiz');
          setShowQuizSolutions(true);
        } else if (extra.id === 'quiz') {
          setActiveTab('quiz');
          setShowQuizSolutions(false);
        } else {
          setActiveTab(extra.id);
        }
      },
    }));
  }, [showFlashcardsModal, activeTab, showQuizSolutions]);

  return (
    <div className="space-y-6">
      
      {/* Top Navigation & Stats Bar */}
      <RootHeaderBanner
        title="Calculus Mastery Hub"
        icon={<span className="font-bold text-lg">∫</span>}
        iconGradient="from-indigo-600 via-blue-600 to-cyan-400"
        progress={{
          label: 'Progress:',
          pct: pct,
          colorGradient: 'from-blue-500 to-indigo-500',
          textColor: 'text-indigo-400',
        }}
        onResetProgress={resetAllProgress}
        resetTitle="Reset All Calculus Progress"
        confirmTitle="Reset Calculus Progress?"
        confirmMessage="Are you sure you want to reset all completed modules and quiz answers in Calculus Mastery Hub? This action cannot be undone."
        topics={[
          'Limits & Continuity',
          'The Derivative & Rules',
          'Transcendental Functions',
          'Product, Quotient & Chain Rules',
          'Implicit Differentiation & Related Rates'
        ]}
      />

      {/* Main Layout: Vertical Calculus Menu (Desktop) + Mobile Horizontal Pills */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">

        {/* Reusable Module & Tool Sidebar */}
        <ModuleAndToolSidebar
          modules={calculusModules}
          activeModuleId={activeTab === 'study' ? activeStudyModule : ''}
          onSelectModule={(id) => {
            setActiveTab('study');
            setActiveStudyModule(id);
          }}
          completedCount={completedModules.length}
          totalCount={CALCULUS_MODULES.length}
          tools={calculusTools}
          currentModuleIndex={CALCULUS_MODULES.findIndex((m) => m.id === activeStudyModule) + 1}
          totalModulesCount={CALCULUS_MODULES.length}
          activeModuleBadge="Foundation"
        />

        {/* Main Content Pane */}
        <div className="flex-1 min-w-0 space-y-6 w-full">


      {/* ==================== SECTION 0: DETAILED STUDY NOTES ==================== */}
      {activeTab === 'study' && (() => {
        const currentMod = CALCULUS_MODULES.find((m) => m.id === activeStudyModule) || CALCULUS_MODULES[0];
        const currentIdx = CALCULUS_MODULES.findIndex((m) => m.id === activeStudyModule);
        const isDone = completedModules.includes(currentMod.id);

        return (
          <ModuleTemplate
            moduleId={currentMod.num}
            moduleIndex={currentIdx + 1}
            totalModules={CALCULUS_MODULES.length}
            badge="Calculus Foundation"
            title={currentMod.title}
            subtitle={currentMod.subtitle}
            isCompleted={isDone}
            onToggleComplete={() => toggleModuleComplete(currentMod.id)}
            hasPrev={currentIdx > 0}
            hasNext={currentIdx < CALCULUS_MODULES.length - 1}
            onPrevModule={() => {
              if (currentIdx > 0) setActiveStudyModule(CALCULUS_MODULES[currentIdx - 1].id);
            }}
            onNextModule={() => {
              if (currentIdx < CALCULUS_MODULES.length - 1) setActiveStudyModule(CALCULUS_MODULES[currentIdx + 1].id);
            }}
            prevLabel={currentIdx > 0 ? `Module ${CALCULUS_MODULES[currentIdx - 1].num}` : undefined}
            nextLabel={currentIdx < CALCULUS_MODULES.length - 1 ? `Module ${CALCULUS_MODULES[currentIdx + 1].num}` : undefined}
          >

          {/* Module 1 Material */}
          {activeStudyModule === 'm1' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Definition of a Limit */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <TrendingUp className="w-4 h-4" /> Definition of a Limit
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Intuitive Explanation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="The limit $\lim_{x \to c} f(x) = L$ describes the target value that the output $f(x)$ approaches as the input $x$ gets arbitrarily close to $c$ (from both left and right sides), without requiring $f(c)$ to actually exist at $x = c$." />
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Formal $\epsilon$-$\delta$ Definition</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="For every real number $\epsilon > 0$ (error tolerance on the $y$-axis), there exists a corresponding $\delta > 0$ (distance tolerance on the $x$-axis) such that whenever $0 < |x - c| < \delta$, it guarantees $|f(x) - L| < \epsilon$." />
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                  <MathText text="$\lim_{x \to c} f(x) = L \iff \forall \epsilon > 0, \exists \delta > 0 : 0 < |x-c| < \delta \implies |f(x)-L| < \epsilon$" />
                </div>
              </div>

              {/* One-Sided Limits & Existence */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <ArrowRight className="w-4 h-4" /> One-Sided Limits & Existence
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Left-Hand & Right-Hand Limits</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="<strong>Left-Hand Limit ($\lim_{x \to c^-} f(x)$):</strong> The value $f(x)$ approaches as $x$ approaches $c$ strictly from values smaller than $c$.<br><strong>Right-Hand Limit ($\lim_{x \to c^+} f(x)$):</strong> The value $f(x)$ approaches as $x$ approaches $c$ strictly from values larger than $c$." />
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Limit Existence Theorem</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    The general two-sided limit exists if and only if both one-sided limits exist and are equal:
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 mt-1">
                    <MathText text="$\lim_{x \to c} f(x) = L \iff \lim_{x \to c^-} f(x) = L = \lim_{x \to c^+} f(x)$" />
                  </div>
                </div>
              </div>

              {/* Continuity & Discontinuity */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <Sparkles className="w-4 h-4" /> Continuity & Discontinuity
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">3-Part Continuity Condition</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="A function $f(x)$ is continuous at a point $x = c$ if its graph can be drawn without lifting the pen:" />
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1 mt-1">
                    <p className="text-emerald-400">1. $f(c)$ is defined (Point exists)</p>
                    <p className="text-emerald-400"><MathText text="2. $\lim_{x \to c} f(x)$ exists ($\lim_{x \to c^-} = \lim_{x \to c^+}$)" /></p>
                    <p className="text-emerald-400"><MathText text="3. $\lim_{x \to c} f(x) = f(c)$ (Limit equals function value)" /></p>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Discontinuity Classifications</h4>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-1">
                    <li><strong>Removable (Hole):</strong> Limit exists, but $f(c)$ is missing or redefined.</li>
                    <li><strong>Jump:</strong> Left and right limits both exist, but are not equal.</li>
                    <li><strong>Infinite:</strong> One or both one-sided limits approach $\pm\infty$ (Vertical Asymptote).</li>
                  </ul>
                </div>
              </div>

              {/* Limits at Infinity & Special Limit Laws */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <Calculator className="w-4 h-4" /> Limits at Infinity & Asymptotes
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Horizontal Asymptotes</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="If $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$, the horizontal line $y = L$ is a horizontal asymptote describing the end-behavior of the function." />
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between items-center"><span className="text-slate-400">Trig Limit 1:</span> <span className="text-cyan-400"><MathText text="$\lim_{x \to 0} \frac{\sin x}{x} = 1$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Trig Limit 2:</span> <span className="text-cyan-400"><MathText text="$\lim_{x \to 0} \frac{1 - \cos x}{x} = 0$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Euler Base:</span> <span className="text-amber-400"><MathText text="$\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e$" /></span></div>
                </div>
              </div>

              {/* Core Limit Theorems Explained */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 lg:col-span-2 shadow-md">
                <div className="flex items-center gap-2 text-purple-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <Lightbulb className="w-4 h-4" /> Core Limit Theorems Explained
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <h4 className="text-xs font-bold text-amber-300 uppercase">Squeeze (Sandwich) Theorem</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <MathText text="If $g(x) \leq f(x) \leq h(x)$ for all $x$ near $c$, and both outer functions share the exact same limit $\lim_{x \to c} g(x) = \lim_{x \to c} h(x) = L$, then the trapped inner function $f(x)$ is forced ('squeezed') to have the same limit: $\lim_{x \to c} f(x) = L$." />
                    </p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <h4 className="text-xs font-bold text-emerald-300 uppercase">Intermediate Value Theorem (IVT)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <MathText text="If $f(x)$ is continuous on the closed interval $[a, b]$, it must attain every intermediate value $N$ between $f(a)$ and $f(b)$ at least once. Consequence: If $f(a)$ and $f(b)$ have opposite signs, $f(x) = 0$ must have at least one real root in $(a, b)$." />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module 2 Material */}
          {activeStudyModule === 'm2' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Definition of Derivative */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-blue-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <TrendingUp className="w-4 h-4" /> Definition of the Derivative
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Conceptual Rate of Change</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="The derivative $f'(x)$ represents the instantaneous rate of change of $f(x)$ with respect to $x$. Geometrically, it is the slope of the line tangent to $y = f(x)$ at $x$." />
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Difference Quotient Limit</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    Formed by taking the limit of the average rate of change (secant line slope) over an interval $h$ as $h$ shrinks to zero:
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Difference Quotient Form:</span>
                    <span className="text-blue-400 font-bold"><MathText text="$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$" /></span>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Point Form at $x = a$:</span>
                    <span className="text-cyan-400 font-bold"><MathText text="$f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}$" /></span>
                  </div>
                </div>
              </div>

              {/* Differentiability */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-amber-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <AlertTriangle className="w-4 h-4" /> Differentiability
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Differentiability Implies Continuity</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="If $f(x)$ is differentiable at $x = c$, then $f(x)$ MUST be continuous at $c$. However, the converse is FALSE: a continuous function is not necessarily differentiable." />
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">When Does a Derivative Fail to Exist?</h4>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-1">
                    <li><MathText text="<strong>Corner / Sharp Turn:</strong> e.g., $f(x) = |x|$ at $x=0$ (left limit $\neq$ right limit)." /></li>
                    <li><strong>Cusp:</strong> Sharp point where slope approaches $+\infty$ on one side and $-\infty$ on the other.</li>
                    <li><MathText text="<strong>Vertical Tangent:</strong> Slope becomes infinite ($\lim |f'(x)| = \infty$)." /></li>
                    <li><strong>Discontinuity:</strong> Any point where $f(x)$ is not continuous.</li>
                  </ul>
                </div>
              </div>

              {/* Power Rule & Basic Rules */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <Calculator className="w-4 h-4" /> Power Rule & Basic Rules
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Power Rule Explanation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    For any real exponent $n$, bring the exponent $n$ to the front as a factor and subtract 1 from the exponent.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
                  <div className="flex justify-between items-center"><span className="text-slate-400">Power Rule:</span> <span className="text-emerald-400"><MathText text="$\frac{d}{dx}[x^n] = n x^{n-1}$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Constant:</span> <span className="text-slate-300"><MathText text="$\frac{d}{dx}[c] = 0$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Constant Multiple:</span> <span className="text-indigo-400"><MathText text="$\frac{d}{dx}[c f(x)] = c f'(x)$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Sum/Diff:</span> <span className="text-amber-400"><MathText text="$\frac{d}{dx}[f \pm g] = f' \pm g'$" /></span></div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Tangent & Normal Lines</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="<strong>Tangent Line:</strong> $y - f(a) = f'(a)(x - a)$<br><strong>Normal Line (Perpendicular):</strong> $y - f(a) = -\frac{1}{f'(a)}(x - a)$" />
                  </p>
                </div>
              </div>

              {/* Kinematics */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 lg:col-span-3 shadow-md">
                <div className="flex items-center gap-2 text-violet-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <TrendingUp className="w-4 h-4" /> Kinematics & Physical Interpretation of Derivatives
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-slate-400 block uppercase"><MathText text="Position $s(t)$" /></span>
                    <p className="text-xs text-slate-300">The location of an object along a coordinate line relative to origin at time $t$.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-blue-400 block uppercase"><MathText text="Velocity $v(t) = s'(t)$" /></span>
                    <p className="text-xs text-slate-300"><MathText text="Instantaneous rate of change of position. Sign indicates direction ($v > 0$ right/up, $v < 0$ left/down)." /></p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-emerald-400 block uppercase"><MathText text="Speed $|v(t)|$" /></span>
                    <p className="text-xs text-slate-300"><MathText text="Magnitude of velocity. Object speeds up when $v(t)$ and $a(t)$ share the same sign!" /></p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-xs font-bold text-amber-400 block uppercase"><MathText text="Acceleration $a(t) = v'(t)$" /></span>
                    <p className="text-xs text-slate-300"><MathText text="Instantaneous rate of change of velocity. Jerk $j(t) = a'(t)$ is rate of change of acceleration." /></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Module 3 Material */}
          {activeStudyModule === 'm3' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exponential & Logarithmic */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-indigo-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <Calculator className="w-4 h-4" /> Exponential & Logarithmic Rules
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200"><MathText text="The Natural Exponential $e^x$" /></h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="$e^x$ is the unique function whose slope at any point equals its height value ($y$-value). Thus $\frac{d}{dx}[e^x] = e^x$." />
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
                  <div className="flex justify-between items-center"><span className="text-slate-400">Natural Exp:</span> <span className="text-emerald-400"><MathText text="$\frac{d}{dx}[e^x] = e^x$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">General Base:</span> <span className="text-indigo-400"><MathText text="$\frac{d}{dx}[a^x] = a^x \ln(a)$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">Natural Log:</span> <span className="text-emerald-400"><MathText text="$\frac{d}{dx}[\ln x] = \frac{1}{x}$" /></span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400">General Log:</span> <span className="text-indigo-400"><MathText text="$\frac{d}{dx}[\log_a x] = \frac{1}{x \ln a}$" /></span></div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Logarithmic Differentiation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="Used for functions of the form $y = f(x)^{g(x)}$. Take $\ln$ of both sides: $\ln y = g(x) \ln f(x)$, then differentiate implicitly!" />
                  </p>
                </div>
              </div>

              {/* Six Trigonometric Derivatives */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-violet-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <TrendingUp className="w-4 h-4" /> Six Trigonometric Derivatives
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Co-Function Sign Rule</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="Every trigonometric function starting with 'co-' ($\cos, \csc, \cot$) has a <strong>negative</strong> derivative!" />
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\sin x]=$" /></span> <span className="text-emerald-400"><MathText text="$\cos x$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\cos x]=$" /></span> <span className="text-rose-400"><MathText text="$-\sin x$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\tan x]=$" /></span> <span className="text-cyan-400"><MathText text="$\sec^2 x$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\sec x]=$" /></span> <span className="text-indigo-400"><MathText text="$\sec x \tan x$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\csc x]=$" /></span> <span className="text-rose-400"><MathText text="$-\csc x \cot x$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\cot x]=$" /></span> <span className="text-rose-400"><MathText text="$-\csc^2 x$" /></span></div>
                </div>
              </div>

              {/* Inverse Trigonometric Derivatives */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2 text-xs">
                  <RotateCcw className="w-4 h-4" /> Inverse Trigonometric Derivatives
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Derivation via Implicit Method</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    <MathText text="Derived by rewriting $y = \arcsin x$ as $\sin y = x$, differentiating implicitly ($\cos y \frac{dy}{dx} = 1$), and substituting $\cos y = \sqrt{1 - x^2}$." />
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\arcsin x]=$" /></span> <span className="text-emerald-400"><MathText text="$\frac{1}{\sqrt{1-x^2}}$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\arccos x]=$" /></span> <span className="text-rose-400"><MathText text="$-\frac{1}{\sqrt{1-x^2}}$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\arctan x]=$" /></span> <span className="text-cyan-400"><MathText text="$\frac{1}{1+x^2}$" /></span></div>
                  <div className="flex justify-between"><span className="text-slate-400"><MathText text="$\frac{d}{dx}[\operatorname{arcsec} x]=$" /></span> <span className="text-indigo-400"><MathText text="$\frac{1}{|x|\sqrt{x^2-1}}$" /></span></div>
                </div>
              </div>
            </div>
          )}

          {/* Module 4 Material */}
          {activeStudyModule === 'm4' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
              <h4 className="text-base font-bold text-indigo-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Calculator className="w-5 h-5" /> Module 4: Product, Quotient & Chain Rules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Product Rule */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300 uppercase">Product Rule</span>
                    <span className="text-[10px] text-slate-500 font-mono"><MathText text="$\frac{d}{dx}[u \cdot v]$" /></span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <MathText text="<strong>Why not just $u'v'$?</strong> The derivative of a product is NOT the product of derivatives! Geometrically, area increases by both $u \Delta v$ and $v \Delta u$." />
                  </p>
                  <div className="text-sm font-mono text-emerald-400"><MathText text="$(u \cdot v)' = u'v + uv'$" /></div>
                  <div className="text-[11px] bg-slate-900 p-2 rounded text-slate-300 font-mono">
                    <MathText text="Example: $\frac{d}{dx}[x^4 \cos x] = 4x^3 \cos x - x^4 \sin x$" />
                  </div>
                </div>

                {/* Quotient Rule */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300 uppercase">Quotient Rule</span>
                    <span className="text-[10px] text-slate-500 font-mono"><MathText text="$\frac{d}{dx}[\frac{u}{v}]$" /></span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Derived by applying the Product Rule to $u \cdot v^{-1}$. Mnemonic: "Low d-High minus High d-Low, over Low squared".
                  </p>
                  <div className="text-sm font-mono text-indigo-400"><MathText text="$\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$" /></div>
                  <div className="text-[11px] bg-slate-900 p-2 rounded text-slate-300 font-mono">
                    <MathText text="Example: $\frac{d}{dx}\left[\frac{e^x}{x^3+1}\right] = \frac{e^x(x^3 - 3x^2 + 1)}{(x^3+1)^2}$" />
                  </div>
                </div>

                {/* Chain Rule */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300 uppercase">Chain Rule</span>
                    <span className="text-[10px] text-slate-500 font-mono"><MathText text="$\frac{d}{dx}[f(g(x))]$" /></span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Used for composite functions. Differentiate outer evaluating inner unchanged, then multiply by derivative of inner!
                  </p>
                  <div className="text-sm font-mono text-amber-400"><MathText text="$(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$" /></div>
                  <div className="text-[11px] bg-slate-900 p-2 rounded text-slate-300 font-mono">
                    <MathText text="Leibniz: $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$" />
                  </div>
                </div>
              </div>

              {/* Extended Combinations */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Generalized Power Rule & Chain Combinations:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                  <div><MathText text="$\frac{d}{dx}\left[ [g(x)]^n \right] = n [g(x)]^{n-1} \cdot g'(x)$" /></div>
                  <div><MathText text="$\frac{d}{dx}\left[ e^{g(x)} \right] = e^{g(x)} \cdot g'(x)$" /></div>
                  <div><MathText text="$\frac{d}{dx}\left[ \sin(g(x)) \right] = \cos(g(x)) \cdot g'(x)$" /></div>
                  <div><MathText text="$\frac{d}{dx}\left[ \arctan(g(x)) \right] = \frac{g'(x)}{1 + [g(x)]^2}$" /></div>
                </div>
              </div>
            </div>
          )}

          {/* Module 5 Material */}
          {activeStudyModule === 'm5' && (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl">
              <h4 className="text-base font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-5 h-5" /> Module 5: Implicit Differentiation & Related Rates Guide
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Implicit Differentiation */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold uppercase text-slate-300 tracking-wider">Implicit Differentiation Step-By-Step</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <MathText text="When $y$ cannot be isolated explicitly as $y = f(x)$, treat $y$ as an implicit function $y(x)$ and apply the Chain Rule whenever differentiating terms containing $y$." />
                  </p>
                  <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li><MathText text="<strong>Differentiate both sides:</strong> Take $\frac{d}{dx}$ on both sides of the equation." /></li>
                    <li><MathText text="<strong>Apply Chain Rule for $y$:</strong> Remember $\frac{d}{dx}[y^n] = n y^{n-1} \frac{dy}{dx}$." /></li>
                    <li><MathText text="<strong>Isolate $\frac{dy}{dx}$ terms:</strong> Group all terms containing $\frac{dy}{dx}$ on one side, move others to opposite side." /></li>
                    <li><MathText text="<strong>Factor & Solve:</strong> Factor out $\frac{dy}{dx}$ and divide to express $\frac{dy}{dx}$ explicitly." /></li>
                  </ol>
                </div>

                {/* Related Rates Strategy */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold uppercase text-slate-300 tracking-wider">Related Rates 5-Step Blueprint</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <MathText text="All changing physical quantities are functions of continuous time $t$. Derivatives express rates of change with respect to time ($\frac{dx}{dt}, \frac{dh}{dt}, \frac{dV}{dt}$)." />
                  </p>
                  <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
                    <li><strong>Diagram & Variables:</strong> Draw picture, label constants and time-varying variables ($x, y, h, V$).</li>
                    <li><MathText text="<strong>Given & Required Rates:</strong> Write given rates and target unknown rate as time derivatives (e.g. given $\frac{dx}{dt}$, find $\frac{dy}{dt}$)." /></li>
                    <li><MathText text="<strong>Relating Equation:</strong> Connect variables using geometric formulas ($x^2 + y^2 = L^2$, $V = \frac{1}{3}\pi r^2 h$)." /></li>
                    <li><MathText text="<strong>Differentiate W.R.T. Time $t$:</strong> Take $\frac{d}{dt}$ across the equation using Chain Rule." /></li>
                    <li><strong>Substitute & Solve:</strong> Substitute instantaneous snapshot values and solve for target rate.</li>
                  </ol>
                </div>
              </div>

              {/* Geometric Formulas Reference */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-300 uppercase block">Essential Geometric Formulas for Related Rates</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono text-slate-300">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-cyan-400 block text-[10px]">Pythagorean Theorem:</span>
                    <MathText text="$x^2 + y^2 = L^2$" />
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-cyan-400 block text-[10px]">Right Cone Volume:</span>
                    <MathText text="$V = \frac{1}{3}\pi r^2 h$" />
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-cyan-400 block text-[10px]">Sphere Volume & Area:</span>
                    <MathText text="$V = \frac{4}{3}\pi r^3, A = 4\pi r^2$" />
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-cyan-400 block text-[10px]">Cylinder Volume:</span>
                    <MathText text="$V = \pi r^2 h$" />
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
                <h4 className="text-sm font-bold text-slate-100">Module {currentMod.num} Knowledge Check</h4>
                <p className="text-xs text-slate-400">Ready to test mastery of this module's concepts?</p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('quiz');
                setCurrentModuleKey(currentMod.id);
                setShowQuizSolutions(false);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
            >
              <span>Take Module {currentMod.num} Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ModuleTemplate>
      );
      })()}

      {/* ==================== SECTION 1: PRACTICE QUIZZES ==================== */}
      {activeTab === 'quiz' && (
        <QuizTemplate
          title="Calculus Concept Practice Quizzes"
          subtitle="Interactive Assessment with Step-by-Step Derivations"
          modules={calculusQuizModules}
          initialModuleId={currentModuleKey}
          onSelectModule={setCurrentModuleKey}
          onBackToStudy={(modId) => {
            setActiveTab('study');
            const validKeys: ('m1' | 'm2' | 'm3' | 'm4' | 'm5')[] = ['m1', 'm2', 'm3', 'm4', 'm5'];
            const targetKey = validKeys.find((k) => k === String(modId)) || 'm1';
            setActiveStudyModule(targetKey);
          }}
          showSolutions={showQuizSolutions}
          onToggleSolutions={setShowQuizSolutions}
          storageKey="calculus_quiz_answers"
        />
      )}

      {/* ==================== SECTION 2: LADDER SIMULATION ==================== */}
      {activeTab === 'ladder' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Ruler className="w-5 h-5 text-indigo-400" /> Sliding Ladder Related Rates Lab
              </h3>
              <p className="text-xs text-slate-400 mt-1">Simulates Module 5, Problem 3: A 13 ft ladder sliding away at 0.5 ft/s.</p>
            </div>
            <div className="bg-indigo-950/40 border border-indigo-800/60 px-4 py-2 rounded-xl text-right">
              <span className="text-xs text-indigo-300 font-bold block uppercase tracking-wider">
                <MathText text="Top Sliding Rate ($\frac{dy}{dt}$)" />
              </span>
              <span className="text-xl font-mono font-bold text-emerald-400">
                {ladderDydt.toFixed(4)} ft/s
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <div className="space-y-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800/80">
              <h4 className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">Interactive Parameters</h4>
              
              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                  <span><MathText text="Bottom Distance ($x$):" /></span>
                  <span className="text-indigo-400 font-mono font-bold">{ladderX.toFixed(1)} ft</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12.5"
                  step="0.1"
                  value={ladderX}
                  onChange={(e) => setLadderX(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                  <span><MathText text="Bottom Speed ($\frac{dx}{dt}$):" /></span>
                  <span className="text-indigo-400 font-mono font-bold">{ladderDxdt.toFixed(2)} ft/s</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={ladderDxdt}
                  onChange={(e) => setLadderDxdt(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-900 p-4 rounded-lg space-y-2 text-xs border border-slate-800 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400"><MathText text="Ladder Length ($L$):" /></span>
                  <span className="text-slate-200 font-bold">13 ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400"><MathText text="Height on Wall ($y$):" /></span>
                  <span className="text-blue-400 font-bold">{ladderY.toFixed(2)} ft</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Pythagorean:</span>
                  <span className="text-amber-400 font-bold"><MathText text="$x^2 + y^2 = 13^2$" /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Differentiated:</span>
                  <span className="text-amber-400 font-bold"><MathText text="$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$" /></span>
                </div>
              </div>

              <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-lg text-xs text-indigo-300 leading-relaxed flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <MathText text="<strong>Math Insight:</strong> Notice as $x$ approaches 13 ft ($y$ approaches 0), the speed at which the top falls ($\frac{dy}{dt}$) approaches infinity!" />
                </p>
              </div>
            </div>

            {/* Canvas Animation Area */}
            <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center relative min-h-[350px]">
              <canvas
                ref={ladderCanvasRef}
                width={500}
                height={350}
                className="w-full h-auto max-w-[500px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================== SECTION 3: CONICAL TANK LAB ==================== */}
      {activeTab === 'cone' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-400" /> Conical Tank Related Rates Simulation
              </h3>
              <p className="text-xs text-slate-400 mt-1">Simulates Module 5, Problem 4: Tank height 10m, radius 5m, inflow 3 m³/min.</p>
            </div>
            <div className="bg-emerald-950/60 border border-emerald-800/80 px-4 py-2 rounded-xl text-right">
              <span className="text-xs text-emerald-300 font-bold block uppercase tracking-wider">
                <MathText text="Water Rising Speed ($\frac{dh}{dt}$)" />
              </span>
              <span className="text-xl font-mono font-bold text-emerald-400">
                {coneDhdt.toFixed(4)} m/min
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls Panel */}
            <div className="space-y-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800/80">
              <h4 className="font-semibold text-slate-200 text-sm border-b border-slate-800 pb-2">Simulation Parameters</h4>
              
              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                  <span><MathText text="Current Water Depth ($h$):" /></span>
                  <span className="text-emerald-400 font-mono font-bold">{coneH.toFixed(1)} m</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="9.5"
                  step="0.1"
                  value={coneH}
                  onChange={(e) => setConeH(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                  <span><MathText text="Inflow Rate ($\frac{dV}{dt}$):" /></span>
                  <span className="text-indigo-400 font-mono font-bold">{coneDvdt.toFixed(1)} m³/min</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.5"
                  value={coneDvdt}
                  onChange={(e) => setConeDvdt(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-900 p-4 rounded-lg space-y-2 text-xs border border-slate-800 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400"><MathText text="Radius ($r = \frac{1}{2}h$):" /></span>
                  <span className="text-slate-200 font-bold">{coneR.toFixed(2)} m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400"><MathText text="Water Volume ($V$):" /></span>
                  <span className="text-indigo-400 font-bold">{coneV.toFixed(2)} m³</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Volume Formula:</span>
                  <span className="text-amber-400 font-bold"><MathText text="$V = \frac{\pi}{12}h^3$" /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rate Formula:</span>
                  <span className="text-amber-400 font-bold"><MathText text="$\frac{dh}{dt} = \frac{3}{\pi r^2}$" /></span>
                </div>
              </div>
            </div>

            {/* Graphic Render Area */}
            <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center relative min-h-[350px]">
              <canvas
                ref={coneCanvasRef}
                width={500}
                height={350}
                className="w-full h-auto max-w-[500px]"
              />
            </div>
          </div>
        </div>
      )}


              </div>
      </div>

      {/* Universal VIP Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcardsModal}
        onClose={() => setShowFlashcardsModal(false)}
        title="Calculus Foundation Flashcards"
        subtitle="Key Theorems, Derivative Formulas & Related Rates — Modules 1–5"
        cards={CALCULUS_FLASHCARDS}
        activeModuleId={activeStudyModule}
        storageKey="calculus_flashcards_mastered"
      />

    </div>
  );
};
