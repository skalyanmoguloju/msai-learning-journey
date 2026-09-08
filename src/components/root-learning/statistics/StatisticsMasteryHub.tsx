import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  BarChart3,
  BookOpen,
  Calculator,
  RotateCcw,
  Sparkles,
  Activity,
  Layers,
  Zap,
  Sliders,
  Play,
  CheckCircle2,
  CheckCircle,
  XCircle,
  X,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ListChecks,
  Award,
  TrendingUp,
  Percent,
  HelpCircle,
  Shuffle
} from 'lucide-react';
import katex from 'katex';
import { STAT_QUIZ_MODULES } from './statisticsQuizData';
import { CS229_STATS_FLASHCARDS, StatsFlashcard } from './statisticsFlashcardsData';
import { RootHeaderBanner, ModuleAndToolSidebar, ModuleSidebarItem, ToolSidebarItem, ModuleTemplate, QuizTemplate, QuizModuleItem } from '../common';
import { UniversalFlashcardsModal } from '../../common/UniversalFlashcardsModal';

// Dedicated Flashcard KaTeX Formula Renderer (Display Mode)
const FlashcardFormula: React.FC<{ tex: string; className?: string }> = ({ tex, className = '' }) => {
  const html = useMemo(() => {
    if (!tex) return '';
    // Strip accidental surrounding $$ or $ if present
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

// KaTeX Math Rendering Helper (Handles text with embedded $...$ / $$...$$, and raw TeX formulas)
const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
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

    // If text has no $ but contains LaTeX commands (e.g. \frac, \sum, \int, \begin), render with KaTeX
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

// Math Rendering Component with KaTeX
const MathView: React.FC<{ tex: string; display?: boolean; enabled?: boolean }> = ({
  tex,
  display = true,
  enabled = true
}) => {
  const html = useMemo(() => {
    if (!enabled) return '';
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false
      });
    } catch {
      return '';
    }
  }, [tex, display, enabled]);

  if (!enabled) {
    return <span className="font-mono text-xs text-cyan-300 break-words">{tex}</span>;
  }

  return (
    <div
      className="katex-display text-cyan-300 font-medium overflow-x-auto py-1"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Types & Data
interface Definition {
  term: string;
  def: string;
}

interface Formula {
  label: string;
  tex: string;
}

interface StatModule {
  id: number;
  title: string;
  badge: string;
  description: string;
  definitions: Definition[];
  formulas: Formula[];
  interactiveType:
    | 'pmf-cdf'
    | 'distribution-lab'
    | 'covariance-lab'
    | 'joint-matrix'
    | 'clt-simulator'
    | 'mle-map-lab'
    | 'naive-bayes-masterclass'
    | 'conjugate-priors'
    | 'gmm-em'
    | 'mcmc-vi';
}

const MODULES_DATA: StatModule[] = [
  {
    id: 1,
    title: 'Probability Space & Random Variables',
    badge: 'Foundations',
    description: 'Formal probability spaces (Ω, F, P), discrete/continuous random variables, PMFs, and CDFs.',
    definitions: [
      { term: 'Sample Space (Ω)', def: 'The set of all possible outcomes resulting from a random statistical experiment.' },
      { term: 'Event Space (F)', def: 'A collection of subsets of Ω (events) to which valid probabilities can be assigned.' },
      { term: 'Probability Measure (P)', def: "A function mapping events to [0, 1] obeying Kolmogorov's Axioms: P(Ω)=1, non-negativity, and countable additivity." },
      { term: 'Random Variable (X)', def: 'A measurable function X: Ω → ℝ that maps abstract sample outcomes to concrete numerical values.' },
      { term: 'Probability Mass Function (PMF)', def: 'P(X = x), gives the exact point probability that a discrete random variable equals x.' },
      { term: 'Cumulative Distribution Function (CDF)', def: 'F(x) = P(X ≤ x), measures the total accumulated probability up to value x for any random variable.' }
    ],
    formulas: [
      { label: 'Kolmogorov Axioms', tex: 'P(\\Omega) = 1, \\quad P(A) \\ge 0, \\quad P(\\bigcup_i A_i) = \\sum_i P(A_i)' },
      { label: 'CDF Definition', tex: 'F_X(x) = P(X \\le x) = \\int_{-\\infty}^x f_X(t)\\,dt' }
    ],
    interactiveType: 'pmf-cdf'
  },
  {
    id: 2,
    title: 'Probability Distributions',
    badge: 'Distributions',
    description: 'Discrete distributions (Bernoulli, Binomial) and Continuous distributions (Gaussian PDF).',
    definitions: [
      { term: 'Bernoulli Distribution', def: 'A discrete distribution modeling a single trial with binary outcomes: Success (1) with probability p, Failure (0) with probability 1-p.' },
      { term: 'Binomial Distribution', def: 'Models the number of successes k in n independent, identical Bernoulli trials with success probability p.' },
      { term: 'Continuous Random Variable', def: 'A variable taking values in a continuous numerical range where the probability at any exact single point is zero P(X=x)=0.' },
      { term: 'Probability Density Function (PDF)', def: 'A continuous function f(x) where the area under the curve over interval [a, b] equals the probability P(a ≤ X ≤ b).' },
      { term: 'Gaussian (Normal) Distribution', def: 'A symmetric bell-shaped continuous distribution fully specified by mean μ (center) and variance σ² (spread).' }
    ],
    formulas: [
      { label: 'Binomial PMF', tex: 'P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}' },
      { label: 'Gaussian PDF', tex: 'f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)' }
    ],
    interactiveType: 'distribution-lab'
  },
  {
    id: 3,
    title: 'Expectation, Variance & Covariance',
    badge: 'Moments',
    description: 'Probability-weighted averages, dispersion around the mean, and joint linear variability.',
    definitions: [
      { term: 'Expected Value E[X]', def: 'The probability-weighted average or long-run theoretical mean of a random variable.' },
      { term: 'Linearity of Expectation', def: 'The property E[aX + bY] = aE[X] + bE[Y], which always holds regardless of whether X and Y are independent.' },
      { term: 'Variance Var(X)', def: 'The expected squared deviation from the mean, E[(X - μ)²], quantifying the statistical dispersion or spread.' },
      { term: 'Covariance Cov(X, Y)', def: 'A metric measuring joint linear variability between two variables: positive if they grow together, negative if inversely related.' },
      { term: 'Correlation (ρ)', def: 'Covariance normalized by standard deviations into the scale [-1, +1] to evaluate linear dependence strength.' }
    ],
    formulas: [
      { label: 'Variance Shortcut', tex: '\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2' },
      { label: 'Covariance Formula', tex: '\\text{Cov}(X, Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]' }
    ],
    interactiveType: 'covariance-lab'
  },
  {
    id: 4,
    title: 'Joint, Marginal & Conditional Distributions',
    badge: 'Multivariate',
    description: 'Handling multiple random variables, marginalizing out dimensions, and conditional slices.',
    definitions: [
      { term: 'Joint Distribution P(X, Y)', def: 'The simultaneous probability density of two or more random variables occurring at specific values together.' },
      { term: 'Marginal Distribution P(X)', def: 'The probability distribution of one variable isolated by integrating or summing out all other variables.' },
      { term: 'Conditional Distribution P(X | Y)', def: 'The probability distribution of X evaluated specifically given that variable Y is observed at value y.' },
      { term: 'Statistical Independence', def: 'Two variables X and Y are independent if and only if their joint distribution factors into their marginals: P(X,Y) = P(X)P(Y).' }
    ],
    formulas: [
      { label: 'Marginalization', tex: 'f_X(x) = \\int_{-\\infty}^{\\infty} f_{X,Y}(x, y)\\,dy' },
      { label: 'Conditional Density', tex: 'f_{X|Y}(x \\mid y) = \\frac{f_{X,Y}(x, y)}{f_Y(y)}' }
    ],
    interactiveType: 'joint-matrix'
  },
  {
    id: 5,
    title: 'Central Limit Theorem & Testing',
    badge: 'Inference',
    description: 'Law of Large Numbers, Central Limit Theorem (CLT), Null Hypotheses, and p-values.',
    definitions: [
      { term: 'Law of Large Numbers (LLN)', def: 'States that the empirical sample mean X̄_n converges to the true population mean μ as sample size n → ∞.' },
      { term: 'Central Limit Theorem (CLT)', def: 'Proves that the sum or average of n independent random variables approaches a Normal distribution as n grows, regardless of initial shape.' },
      { term: 'Standard Error (SE)', def: 'The standard deviation of the sample mean distribution, equal to σ / √n, shrinking as sample size increases.' },
      { term: 'Null Hypothesis (H₀)', def: 'The baseline assumption that there is no true effect, no difference, or no relationship in the population.' },
      { term: 'p-value', def: 'The probability of observing a test result at least as extreme as the current sample, assuming H₀ is true.' }
    ],
    formulas: [
      { label: 'CLT Standard Error', tex: '\\bar{X}_n \\sim \\mathcal{N}\\left(\\mu, \\frac{\\sigma^2}{n}\\right)' }
    ],
    interactiveType: 'clt-simulator'
  },
  {
    id: 6,
    title: 'MLE, MAP & Regularization',
    badge: 'Optimization',
    description: 'Maximum Likelihood Estimation, Bayesian MAP estimation, and structural equivalence to L1/L2 penalties.',
    definitions: [
      { term: 'Likelihood P(D | θ)', def: 'The probability of observing the dataset D under candidate parameters θ.' },
      { term: 'Maximum Likelihood Estimation (MLE)', def: 'Parameter estimation method that maximizes log-likelihood log P(D|θ) based purely on observed data.' },
      { term: 'Prior Distribution P(θ)', def: 'A probability distribution expressing prior domain knowledge or beliefs about parameters before observing current data.' },
      { term: 'Maximum A Posteriori (MAP)', def: 'Bayesian estimation that maximizes Posterior ∝ Likelihood × Prior: θ_MAP = argmax [log P(D|θ) + log P(θ)].' },
      { term: 'L2 Regularization (Ridge Equivalence)', def: 'Adding a squared weight penalty λ||w||₂², mathematically identical to MAP estimation with a Gaussian prior w ~ N(0, τ²).' },
      { term: 'L1 Regularization (Lasso Equivalence)', def: 'Adding an absolute weight penalty λ||w||₁, mathematically identical to MAP estimation with a Laplace prior.' }
    ],
    formulas: [
      { label: 'MAP Objective', tex: '\\hat{\\theta}_{MAP} = \\arg\\max_\\theta \\left[ \\sum_{i=1}^n \\log P(x_i \\mid \\theta) + \\log P(\\theta) \\right]' },
      { label: 'L2 / Gaussian Equivalence', tex: '\\text{Loss}_{L2} = \\sum (y_i - w^T x_i)^2 + \\lambda ||w||_2^2 \\iff w \\sim \\mathcal{N}(0, \\tau^2)' }
    ],
    interactiveType: 'mle-map-lab'
  },
  {
    id: 7,
    title: 'Naive Bayes Classification Masterclass',
    badge: 'Core Masterclass',
    description: 'Full probabilistic decision engine: Naive Assumption, Derivation, Laplace Smoothing, and Gaussian Naive Bayes.',
    definitions: [
      { term: "Bayes' Theorem", def: 'Inverts conditional probability to compute Posterior = (Likelihood × Prior) / Evidence: P(C|X) = P(X|C)P(C) / P(X).' },
      { term: 'Naive Conditional Independence Assumption', def: 'Assumes features X₁, ..., X_d are mutually independent given class C, simplifying likelihood to a product: P(X|C) = ∏ P(X_i|C).' },
      { term: 'Zero-Frequency Problem', def: 'When an unseen feature has count 0 in training data, producing likelihood P(X_i|C)=0 and wiping out the entire posterior product.' },
      { term: 'Laplace (Additive) Smoothing (+α)', def: 'Adds pseudo-counts α (typically 1) to counts to prevent zero likelihoods for unseen terms in text classification.' },
      { term: 'Gaussian Naive Bayes (GNB)', def: 'Adaptation for continuous features where class likelihoods P(X_i|C) are computed using Gaussian PDFs parameterized by class mean μ_c and variance σ²_c.' }
    ],
    formulas: [
      { label: "Bayes' Rule", tex: 'P(C \\mid X) = \\frac{P(X \\mid C) \\cdot P(C)}{P(X)}' },
      { label: 'Naive Likelihood Product', tex: 'P(X_1, \\dots, X_d \\mid C) = \\prod_{i=1}^d P(X_i \\mid C)' },
      { label: 'Laplace Smoothed Likelihood', tex: 'P(X_i = k \\mid C) = \\frac{\\text{Count}(X_i = k, C) + \\alpha}{\\text{Count}(C) + \\alpha |V|}' }
    ],
    interactiveType: 'naive-bayes-masterclass'
  },
  {
    id: 8,
    title: 'Conjugate Priors & Bayesian Inference',
    badge: 'Bayesian ML',
    description: 'Analytical Bayesian updating, Beta-Binomial conjugate pairs, prior strength, and posterior predictive distributions.',
    definitions: [
      { term: 'Conjugate Prior', def: 'A prior distribution P(θ) is conjugate to a likelihood P(D|θ) if the resulting posterior P(θ|D) belongs to the exact same algebraic parametric family.' },
      { term: 'Beta-Binomial Conjugacy', def: 'The canonical conjugate pair for binary coin flipping/conversion rates. A Beta(α, β) prior + Binomial(k, n) data yields a closed-form Beta(α + k, β + n - k) posterior.' },
      { term: 'Pseudo-Counts (α, β)', def: "Hyperparameters in Beta distributions acting as 'virtual prior observations' of successes (α) and failures (β) before observing real-world data." },
      { term: 'Posterior Predictive Distribution', def: 'Predicts future unobserved data points y* by integrating over all plausible values of parameter θ: P(y* | D) = ∫ P(y* | θ) P(θ | D) dθ.' }
    ],
    formulas: [
      { label: 'Beta-Binomial Posterior', tex: '\\text{Beta}(\\alpha_{\\text{post}}, \\beta_{\\text{post}}) = \\text{Beta}(\\alpha_0 + k, \\beta_0 + n - k)' },
      { label: 'Posterior Mean', tex: '\\mathbb{E}[\\theta \\mid D] = \\frac{\\alpha_0 + k}{\\alpha_0 + \\beta_0 + n}' }
    ],
    interactiveType: 'conjugate-priors'
  },
  {
    id: 9,
    title: 'Latent Variables & The EM Algorithm',
    badge: 'Unsupervised',
    description: "Gaussian Mixture Models (GMM), unobserved hidden states, Jensen's inequality, and E-step / M-step optimization.",
    definitions: [
      { term: 'Latent (Hidden) Variable (Z)', def: 'An unobserved random variable indicating hidden cluster membership or state behind observed data points X.' },
      { term: 'Gaussian Mixture Model (GMM)', def: 'A soft clustering probabilistic model representing the overall population distribution as a weighted sum of K distinct Gaussian components.' },
      { term: 'Expectation-Maximization (EM)', def: 'An iterative 2-step algorithm used to find Maximum Likelihood estimates in models with latent variables or missing data.' },
      { term: 'E-Step (Expectation)', def: 'Computes soft assignment responsibilities γ_ik = P(z_i = k | x_i, θ) of cluster k generating point x_i using current parameters.' },
      { term: 'M-Step (Maximization)', def: 'Updates model parameters (means μ, variances σ², mixing weights π) by maximizing expected log-likelihood given responsibility weights.' }
    ],
    formulas: [
      { label: 'Responsibility (E-Step)', tex: '\\gamma_{ik} = \\frac{\\pi_k \\mathcal{N}(x_i \\mid \\mu_k, \\sigma_k^2)}{\\sum_{j=1}^K \\pi_j \\mathcal{N}(x_i \\mid \\mu_j, \\sigma_j^2)}' },
      { label: 'M-Step Mean Update', tex: '\\mu_k^{\\text{new}} = \\frac{\\sum_{i=1}^N \\gamma_{ik} x_i}{\\sum_{i=1}^N \\gamma_{ik}}' }
    ],
    interactiveType: 'gmm-em'
  },
  {
    id: 10,
    title: 'Approximate Inference (MCMC & VI)',
    badge: 'Sampling',
    description: 'Tackling intractable posterior integrals via Markov Chain Monte Carlo (Metropolis-Hastings) & Variational Inference (ELBO).',
    definitions: [
      { term: 'Intractable Evidence P(D)', def: 'The denominator marginal likelihood integral ∫ P(D|θ)P(θ)dθ that becomes mathematically impossible to calculate in high dimensions.' },
      { term: 'Markov Chain Monte Carlo (MCMC)', def: 'Sampling family that constructs a random walk Markov chain whose long-run stationary distribution converges to the exact target posterior.' },
      { term: 'Metropolis-Hastings Algorithm', def: 'Proposes candidate transitions θ* and accepts them with probability α = min(1, [P(θ*)P(D|θ*)] / [P(θ)P(D|θ)]), eliminating P(D).' },
      { term: 'Variational Inference (VI)', def: 'Frames posterior estimation as an optimization problem: selects an easy family q(θ) and optimizes its parameters to minimize KL divergence to P(θ|D).' },
      { term: 'Evidence Lower Bound (ELBO)', def: 'The surrogate objective function optimized in VI; maximizing ELBO directly minimizes KL(q || P) without knowing P(D).' }
    ],
    formulas: [
      { label: 'Metropolis Acceptance', tex: '\\alpha = \\min\\left(1, \\frac{P(\\theta^*) P(D \\mid \\theta^*)}{P(\\theta) P(D \\mid \\theta)}\\right)' },
      { label: 'ELBO Objective', tex: '\\text{ELBO}(q) = \\mathbb{E}_{q}[\\log P(D, \\theta)] - \\mathbb{E}_{q}[\\log q(\\theta)]' }
    ],
    interactiveType: 'mcmc-vi'
  }
];

// Helper Math: Combinations
function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return res;
}

// Helper Math: Lanczos Gamma Approximation
function logGamma(z: number): number {
  const c = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.001208650973866179,
    -0.000005395239384953
  ];
  let x = z;
  let y = z;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log((2.5066282746310005 * ser) / x);
}

function betaPdf(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  const logB = logGamma(a) + logGamma(b) - logGamma(a + b);
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logB);
}

import { curriculumNavStore } from '../../curriculum/navigationStore';

const HUB_KEY = 'statistics-mastery';

export const StatisticsMasteryHub: React.FC = () => {
  const [activeModuleId, setActiveModuleIdState] = useState<number>(() =>
    curriculumNavStore.getModuleForRootHub<number>(HUB_KEY, 7)
  );

  const setActiveModuleId = useCallback((idOrFn: number | ((prev: number) => number)) => {
    setActiveModuleIdState((prev) => {
      const next = typeof idOrFn === 'function' ? idOrFn(prev) : idOrFn;
      curriculumNavStore.setModuleForRootHub(HUB_KEY, next);
      return next;
    });
  }, []);

  // Completion State & Progress
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('statistics_completed_modules') || '[]');
    } catch {
      return [];
    }
  });

  const toggleModuleComplete = (modId: number) => {
    setCompletedModules((prev) => {
      const next = prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId];
      localStorage.setItem('statistics_completed_modules', JSON.stringify(next));
      return next;
    });
  };

  const resetAllProgress = () => {
    setCompletedModules([]);
    localStorage.removeItem('statistics_completed_modules');
    setQuizUserAnswers({});
    localStorage.removeItem('statistics_quiz_answers');
    setMasteredCards([]);
    localStorage.removeItem('statistics_flashcards_mastered');
  };

  const pct = Math.round((completedModules.length / MODULES_DATA.length) * 100);

  const activeModule = useMemo(() => {
    return MODULES_DATA.find((m) => m.id === activeModuleId) || MODULES_DATA[0];
  }, [activeModuleId]);

  // Tab State: Study Guide, Practice Quizzes, or VIP Formula Flashcards
  const [activeTab, setActiveTabState] = useState<'study' | 'quiz' | 'flashcards'>(() =>
    curriculumNavStore.getTabForRootHub(HUB_KEY, 'study') as any
  );
  const setActiveTab = useCallback((tab: 'study' | 'quiz' | 'flashcards') => {
    curriculumNavStore.setTabForRootHub(HUB_KEY, tab);
    setActiveTabState(tab);
  }, []);

  const [quizModuleKey, setQuizModuleKeyState] = useState<string>(() =>
    curriculumNavStore.getQuizModuleForRootHub(HUB_KEY, 'm1')
  );
  const setQuizModuleKey = useCallback((key: string) => {
    curriculumNavStore.setQuizModuleForRootHub(HUB_KEY, key);
    setQuizModuleKeyState(key);
  }, []);

  const [showSolutionsGuide, setShowSolutionsGuideState] = useState<boolean>(() =>
    curriculumNavStore.getSolutionsModeForRootHub(HUB_KEY)
  );
  const setShowSolutionsGuide = useCallback((show: boolean) => {
    curriculumNavStore.setSolutionsModeForRootHub(HUB_KEY, show);
    setShowSolutionsGuideState(show);
  }, []);

  const [showFlashcardsModal, setShowFlashcardsModal] = useState<boolean>(false);

  // VIP Formula Flashcards State (CS229 Refresher)
  const [cardCategory, setCardCategory] = useState<string>('All');
  const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [flashcardViewMode, setFlashcardViewMode] = useState<'deck' | 'grid'>('deck');
  const [masteredCards, setMasteredCards] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('statistics_flashcards_mastered') || '[]');
    } catch {
      return [];
    }
  });

  const toggleCardMastered = (id: string) => {
    setMasteredCards((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('statistics_flashcards_mastered', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const filteredFlashcards = useMemo(() => {
    if (cardCategory === 'All') return CS229_STATS_FLASHCARDS;
    return CS229_STATS_FLASHCARDS.filter((c) => c.category === cardCategory);
  }, [cardCategory]);

  const activeCard = filteredFlashcards[currentCardIdx] || filteredFlashcards[0] || CS229_STATS_FLASHCARDS[0];

  // Keyboard navigation for VIP Flashcards
  useEffect(() => {
    if (activeTab !== 'flashcards' && !showFlashcardsModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape' && showFlashcardsModal) {
        setShowFlashcardsModal(false);
      } else if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        setIsCardFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentCardIdx((prev) => (prev + 1) % filteredFlashcards.length);
        setIsCardFlipped(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentCardIdx((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
        setIsCardFlipped(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, showFlashcardsModal, filteredFlashcards.length]);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('statistics_quiz_answers') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('statistics_quiz_answers', JSON.stringify(quizUserAnswers));
    } catch {
      // ignore
    }
  }, [quizUserAnswers]);


  // ===================== INTERACTIVE STATES =====================

  // 1. PMF vs CDF
  const [pmfN, setPmfN] = useState<number>(10);
  const [pmfMode, setPmfMode] = useState<'pmf' | 'cdf'>('pmf');
  const pmfCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 2. Gaussian Distribution Lab
  const [gaussMu, setGaussMu] = useState<number>(0);
  const [gaussSd, setGaussSd] = useState<number>(1.0);
  const gaussCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3. Covariance Lab
  const [covRho, setCovRho] = useState<number>(0.75);
  const covCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 4. Joint Matrix State
  const [jp00, setJp00] = useState<number>(0.3);
  const [jp01, setJp01] = useState<number>(0.1);
  const [jp10, setJp10] = useState<number>(0.2);
  const [jp11, setJp11] = useState<number>(0.4);

  // 5. CLT Simulator
  const [cltN, setCltN] = useState<number>(30);
  const [cltMeans, setCltMeans] = useState<number[]>([]);
  const cltCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 6. MLE vs MAP Lab
  const [mapTau, setMapTau] = useState<number>(1.0);
  const mleMapCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 7. Naive Bayes Masterclass
  const [nbAlpha, setNbAlpha] = useState<number>(1.0);
  const [gnbHeight, setGnbHeight] = useState<number>(73);
  const gnbCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 8. Conjugate Priors
  const [betaA0, setBetaA0] = useState<number>(2.0);
  const [betaB0, setBetaB0] = useState<number>(2.0);
  const [conjHeads, setConjHeads] = useState<number>(0);
  const [conjTails, setConjTails] = useState<number>(0);
  const conjCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 9. GMM EM Algorithm
  const [emStep, setEmStep] = useState<number>(0);
  const [emMu1, setEmMu1] = useState<number>(-1.5);
  const [emSig1, setEmSig1] = useState<number>(1.2);
  const [emMu2, setEmMu2] = useState<number>(2.5);
  const [emSig2, setEmSig2] = useState<number>(1.2);
  const gmmCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const emDataRef = useRef<number[]>([]);

  // 10. MCMC Metropolis-Hastings
  const [mcmcStep, setMcmcStep] = useState<number>(0.8);
  const [mcmcSamples, setMcmcSamples] = useState<number[]>([]);
  const [mcmcAccepted, setMcmcAccepted] = useState<number>(0);
  const [mcmcTotal, setMcmcTotal] = useState<number>(0);
  const mcmcCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize GMM fixed sample dataset
  useEffect(() => {
    const data: number[] = [];
    for (let i = 0; i < 40; i++) data.push(-2 + (Math.random() + Math.random() - 1) * 1.5);
    for (let i = 0; i < 40; i++) data.push(2 + (Math.random() + Math.random() - 1) * 1.5);
    emDataRef.current = data;
  }, []);

  // Canvas Drawing Utilities
  const setupCanvas = (canvas: HTMLCanvasElement | null): CanvasRenderingContext2D | null => {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, rect.width, rect.height);
    }
    return ctx;
  };

  // 1. PMF / CDF Canvas Drawing
  useEffect(() => {
    if (activeModule.interactiveType !== 'pmf-cdf') return;
    const canvas = pmfCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    const labels: number[] = [];
    const data: number[] = [];
    let cum = 0;
    for (let k = 0; k <= pmfN; k++) {
      labels.push(k);
      const prob = nCr(pmfN, k) * Math.pow(0.5, pmfN);
      cum += prob;
      data.push(pmfMode === 'pmf' ? prob : cum);
    }

    const maxVal = pmfMode === 'pmf' ? Math.max(...data, 0.3) : 1.05;
    const barWidth = Math.max(4, chartW / (pmfN + 1) - 4);

    // Draw axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Draw bars
    data.forEach((val, i) => {
      const barH = (val / maxVal) * chartH;
      const x = pad + (i + 0.5) * (chartW / (pmfN + 1)) - barWidth / 2;
      const y = h - pad - barH;

      ctx.fillStyle = pmfMode === 'pmf' ? '#3b82f6' : '#06b6d4';
      ctx.fillRect(x, y, barWidth, barH);

      // Label X
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      if (pmfN <= 12 || i % 2 === 0) {
        ctx.fillText(String(i), x + barWidth / 2, h - pad + 14);
      }
    });

    // Label Y max
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(maxVal.toFixed(2), pad - 6, pad + 8);
    ctx.fillText('0.00', pad - 6, h - pad);
  }, [activeModule.interactiveType, pmfN, pmfMode]);

  // 2. Gaussian PDF Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'distribution-lab') return;
    const canvas = gaussCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    const minX = -6;
    const maxX = 6;
    const maxPdf = 0.5;

    // Background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    // Draw curve
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
      const pdf = (1 / (gaussSd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - gaussMu) / gaussSd, 2));
      const px = pad + ((x - minX) / (maxX - minX)) * chartW;
      const py = h - pad - (pdf / maxPdf) * chartH;
      if (x === minX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Shade area
    ctx.lineTo(w - pad, h - pad);
    ctx.lineTo(pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.fill();

    // Peak marker
    const peakX = pad + ((gaussMu - minX) / (maxX - minX)) * chartW;
    const peakVal = 1 / (gaussSd * Math.sqrt(2 * Math.PI));
    const peakY = h - pad - (peakVal / maxPdf) * chartH;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(peakX, peakY, 4, 0, 2 * Math.PI);
    ctx.fill();
  }, [activeModule.interactiveType, gaussMu, gaussSd]);

  // 3. Covariance Scatter Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'covariance-lab') return;
    const canvas = covCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, h / 2);
    ctx.lineTo(w - pad, h / 2);
    ctx.moveTo(w / 2, pad);
    ctx.lineTo(w / 2, h - pad);
    ctx.stroke();

    // Generate correlated points seeded by rho
    for (let i = 0; i < 100; i++) {
      // Deterministic quasi-random spread for stability
      const u1 = (Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      const u2 = (Math.cos(i * 93.9898 + 67.233) * 23758.5453) % 1;
      const x = u1 * 4 - 2;
      const y = covRho * x + Math.sqrt(1 - covRho * covRho) * (u2 * 4 - 2);

      const px = pad + ((x + 4) / 8) * chartW;
      const py = h - pad - ((y + 4) / 8) * chartH;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, [activeModule.interactiveType, covRho]);

  // 5. CLT Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'clt-simulator') return;
    const canvas = cltCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    if (cltMeans.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click "+100 Samples" or "+1000 Samples" to simulate', w / 2, h / 2);
      return;
    }

    const binCount = 20;
    const bins = new Array(binCount).fill(0);
    cltMeans.forEach((m) => {
      let b = Math.floor(m * binCount);
      if (b >= binCount) b = binCount - 1;
      if (b < 0) b = 0;
      bins[b]++;
    });

    const maxBin = Math.max(...bins, 1);
    const bW = chartW / binCount;

    bins.forEach((cnt, idx) => {
      const bH = (cnt / maxBin) * chartH;
      const x = pad + idx * bW;
      const y = h - pad - bH;
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(x + 1, y, bW - 2, bH);
    });
  }, [activeModule.interactiveType, cltMeans]);

  // 6. MLE vs MAP Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'mle-map-lab') return;
    const canvas = mleMapCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    const wMle = 4.2;

    // Draw Likelihood (amber)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let wv = 0; wv <= 5; wv += 0.1) {
      const lh = Math.exp(-0.5 * Math.pow(wv - wMle, 2));
      const px = pad + (wv / 5) * chartW;
      const py = h - pad - lh * chartH;
      if (wv === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Draw Prior P(w) (blue dashed)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let wv = 0; wv <= 5; wv += 0.1) {
      const pr = Math.exp(-0.5 * (wv * wv) / mapTau);
      const px = pad + (wv / 5) * chartW;
      const py = h - pad - pr * chartH;
      if (wv === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Posterior (cyan solid)
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let wv = 0; wv <= 5; wv += 0.1) {
      const lh = Math.exp(-0.5 * Math.pow(wv - wMle, 2));
      const pr = Math.exp(-0.5 * (wv * wv) / mapTau);
      const post = lh * pr;
      const px = pad + (wv / 5) * chartW;
      const py = h - pad - post * chartH;
      if (wv === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [activeModule.interactiveType, mapTau]);

  // 7. Gaussian Naive Bayes Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'naive-bayes-masterclass') return;
    const canvas = gnbCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    const minX = 55;
    const maxX = 80;
    const maxPdf = 0.2;

    // Female curve (rose)
    const muF = 65;
    const sdF = 2.5;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.5) {
      const pdf = (1 / (sdF * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - muF) / sdF, 2));
      const px = pad + ((x - minX) / (maxX - minX)) * chartW;
      const py = h - pad - (pdf / maxPdf) * chartH;
      if (x === minX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Male curve (blue)
    const muM = 70;
    const sdM = 3.0;
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.5) {
      const pdf = (1 / (sdM * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - muM) / sdM, 2));
      const px = pad + ((x - minX) / (maxX - minX)) * chartW;
      const py = h - pad - (pdf / maxPdf) * chartH;
      if (x === minX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Query Height Vertical Line
    const qX = pad + ((gnbHeight - minX) / (maxX - minX)) * chartW;
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(qX, pad);
    ctx.lineTo(qX, h - pad);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [activeModule.interactiveType, gnbHeight]);

  // 8. Conjugate Priors Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'conjugate-priors') return;
    const canvas = conjCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    const aPost = betaA0 + conjHeads;
    const bPost = betaB0 + conjTails;
    const maxPdf = Math.max(3.5, Math.sqrt(aPost + bPost));

    // Prior (blue dashed)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let p = 0.01; p <= 0.99; p += 0.02) {
      const val = betaPdf(p, betaA0, betaB0);
      const px = pad + p * chartW;
      const py = h - pad - Math.min(val / maxPdf, 1.0) * chartH;
      if (p === 0.01) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Posterior (cyan solid + filled)
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let p = 0.01; p <= 0.99; p += 0.02) {
      const val = betaPdf(p, aPost, bPost);
      const px = pad + p * chartW;
      const py = h - pad - Math.min(val / maxPdf, 1.0) * chartH;
      if (p === 0.01) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.lineTo(pad + chartW, h - pad);
    ctx.lineTo(pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.fill();
  }, [activeModule.interactiveType, betaA0, betaB0, conjHeads, conjTails]);

  // 9. GMM Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'gmm-em') return;
    const canvas = gmmCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    const minX = -5;
    const maxX = 5;
    const maxPdf = 0.5;

    // Component 1 (emerald)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
      const p1 = 0.5 * (1 / (emSig1 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - emMu1) / emSig1, 2));
      const px = pad + ((x - minX) / (maxX - minX)) * chartW;
      const py = h - pad - (p1 / maxPdf) * chartH;
      if (x === minX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Component 2 (purple)
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
      const p2 = 0.5 * (1 / (emSig2 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - emMu2) / emSig2, 2));
      const px = pad + ((x - minX) / (maxX - minX)) * chartW;
      const py = h - pad - (p2 / maxPdf) * chartH;
      if (x === minX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Combined GMM (blue)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = minX; x <= maxX; x += 0.1) {
      const p1 = 0.5 * (1 / (emSig1 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - emMu1) / emSig1, 2));
      const p2 = 0.5 * (1 / (emSig2 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - emMu2) / emSig2, 2));
      const comb = p1 + p2;
      const px = pad + ((x - minX) / (maxX - minX)) * chartW;
      const py = h - pad - (comb / maxPdf) * chartH;
      if (x === minX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }, [activeModule.interactiveType, emMu1, emSig1, emMu2, emSig2]);

  // 10. MCMC Canvas
  useEffect(() => {
    if (activeModule.interactiveType !== 'mcmc-vi') return;
    const canvas = mcmcCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;
    const pad = 36;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    if (mcmcSamples.length === 0) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click "+200" or "+1000" MCMC Samples to explore', w / 2, h / 2);
      return;
    }

    const binCount = 25;
    const bins = new Array(binCount).fill(0);
    const minX = -4;
    const maxX = 4;
    const binW = (maxX - minX) / binCount;

    mcmcSamples.forEach((s) => {
      let idx = Math.floor((s - minX) / binW);
      if (idx >= 0 && idx < binCount) bins[idx]++;
    });

    const maxBin = Math.max(...bins, 1);
    const bW = chartW / binCount;

    bins.forEach((cnt, idx) => {
      const bH = (cnt / maxBin) * chartH;
      const x = pad + idx * bW;
      const y = h - pad - bH;
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(x + 1, y, bW - 2, bH);
    });
  }, [activeModule.interactiveType, mcmcSamples]);

  // ===================== INTERACTIVE ACTIONS =====================

  // CLT Simulation Action
  const runCltSimulation = (count: number) => {
    const newMeans: number[] = [];
    for (let i = 0; i < count; i++) {
      let sum = 0;
      for (let j = 0; j < cltN; j++) {
        sum += Math.random();
      }
      newMeans.push(sum / cltN);
    }
    setCltMeans((prev) => [...prev, ...newMeans]);
  };

  const resetCltSimulation = () => setCltMeans([]);

  // GMM Step Action
  const stepEmAlgorithm = () => {
    const data = emDataRef.current;
    if (!data.length) return;

    let sumG1 = 0;
    let sumG2 = 0;
    const r1: number[] = [];
    const r2: number[] = [];

    data.forEach((x) => {
      const pdf1 = (1 / (emSig1 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - emMu1) / emSig1, 2));
      const pdf2 = (1 / (emSig2 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - emMu2) / emSig2, 2));
      const tot = pdf1 + pdf2 || 1e-10;
      const g1 = pdf1 / tot;
      const g2 = pdf2 / tot;
      r1.push(g1);
      r2.push(g2);
      sumG1 += g1;
      sumG2 += g2;
    });

    let newMu1 = 0;
    let newMu2 = 0;
    for (let i = 0; i < data.length; i++) {
      newMu1 += r1[i] * data[i];
      newMu2 += r2[i] * data[i];
    }
    newMu1 /= sumG1 || 1;
    newMu2 /= sumG2 || 1;

    let newVar1 = 0;
    let newVar2 = 0;
    for (let i = 0; i < data.length; i++) {
      newVar1 += r1[i] * Math.pow(data[i] - newMu1, 2);
      newVar2 += r2[i] * Math.pow(data[i] - newMu2, 2);
    }
    const newSig1 = Math.max(0.3, Math.sqrt(newVar1 / (sumG1 || 1)));
    const newSig2 = Math.max(0.3, Math.sqrt(newVar2 / (sumG2 || 1)));

    setEmStep((prev) => prev + 1);
    setEmMu1(newMu1);
    setEmMu2(newMu2);
    setEmSig1(newSig1);
    setEmSig2(newSig2);
  };

  const resetEmAlgorithm = () => {
    setEmStep(0);
    setEmMu1(-1.5);
    setEmSig1(1.2);
    setEmMu2(2.5);
    setEmSig2(1.2);
  };

  // MCMC Metropolis-Hastings Action
  const targetDensity = (x: number) => {
    const p1 = 0.6 * Math.exp(-0.5 * Math.pow((x + 1.5) / 0.6, 2));
    const p2 = 0.4 * Math.exp(-0.5 * Math.pow((x - 1.8) / 0.7, 2));
    return p1 + p2;
  };

  const runMcmcSimulation = (count: number) => {
    let curr = mcmcSamples.length > 0 ? mcmcSamples[mcmcSamples.length - 1] : 0;
    let acc = 0;
    const nextSamples: number[] = [];

    for (let i = 0; i < count; i++) {
      const u1 = Math.random() || 1e-10;
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const prop = curr + z * mcmcStep;

      const alpha = Math.min(1, targetDensity(prop) / (targetDensity(curr) || 1e-10));
      if (Math.random() < alpha) {
        curr = prop;
        acc++;
      }
      nextSamples.push(curr);
    }

    setMcmcSamples((prev) => [...prev, ...nextSamples]);
    setMcmcAccepted((prev) => prev + acc);
    setMcmcTotal((prev) => prev + count);
  };

  const resetMcmcSimulation = () => {
    setMcmcSamples([]);
    setMcmcAccepted(0);
    setMcmcTotal(0);
  };

  // Naive Bayes Calculations
  const nbCalculations = useMemo(() => {
    const spamTotal = 40;
    const hamTotal = 60;
    const vocabSize = 1000;

    const viagraSpam = 20;
    const viagraHam = 1;
    const winnerSpam = 10;
    const winnerHam = 3;
    const rolexSpam = 0;
    const rolexHam = 0;

    const pViagraSpam = (viagraSpam + nbAlpha) / (spamTotal + nbAlpha * vocabSize);
    const pWinnerSpam = (winnerSpam + nbAlpha) / (spamTotal + nbAlpha * vocabSize);
    const pRolexSpam = (rolexSpam + nbAlpha) / (spamTotal + nbAlpha * vocabSize);

    const pViagraHam = (viagraHam + nbAlpha) / (hamTotal + nbAlpha * vocabSize);
    const pWinnerHam = (winnerHam + nbAlpha) / (hamTotal + nbAlpha * vocabSize);
    const pRolexHam = (rolexHam + nbAlpha) / (hamTotal + nbAlpha * vocabSize);

    const priorSpam = 0.4;
    const priorHam = 0.6;

    const spamScore = priorSpam * pViagraSpam * pWinnerSpam * pRolexSpam;
    const hamScore = priorHam * pViagraHam * pWinnerHam * pRolexHam;

    const spamProb = spamScore + hamScore > 0 ? (spamScore / (spamScore + hamScore)) * 100 : 0;

    return {
      spamScore,
      hamScore,
      spamProb
    };
  }, [nbAlpha]);

  // Gaussian Naive Bayes Continuous Feature Calculations
  const gnbCalculations = useMemo(() => {
    const muF = 65;
    const sdF = 2.5;
    const muM = 70;
    const sdM = 3.0;

    const lhF = (1 / (sdF * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((gnbHeight - muF) / sdF, 2));
    const lhM = (1 / (sdM * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((gnbHeight - muM) / sdM, 2));

    const scoreF = 0.5 * lhF;
    const scoreM = 0.5 * lhM;
    const probM = scoreF + scoreM > 0 ? (scoreM / (scoreF + scoreM)) * 100 : 50;

    return {
      lhF,
      lhM,
      probM,
      isMale: scoreM > scoreF
    };
  }, [gnbHeight]);

  const statQuizModules: QuizModuleItem[] = useMemo(() => {
    return Object.keys(STAT_QUIZ_MODULES).map((key) => {
      const qMod = STAT_QUIZ_MODULES[key];
      return {
        id: key,
        stepNumber: qMod.moduleNumber,
        title: qMod.title,
        badge: qMod.badge,
        sub: qMod.sub,
        questions: qMod.questions
      };
    });
  }, []);

  const statsModules: ModuleSidebarItem[] = useMemo(() => {
    return MODULES_DATA.map((mod) => ({
      id: mod.id,
      title: mod.title,
      isDone: completedModules.includes(mod.id),
    }));
  }, [completedModules]);

  const statsTools: ToolSidebarItem[] = useMemo(() => {
    return [
      {
        id: 'flashcards',
        title: 'Flashcards',
        icon: Sparkles,
        badge: '34 Cards',
        isActive: showFlashcardsModal || activeTab === 'flashcards',
        onClick: () => setShowFlashcardsModal(true),
      },
      {
        id: 'quiz',
        title: 'Practice Quizzes',
        icon: HelpCircle,
        badge: '35 Qs',
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
        badge: 'All Steps',
        isActive: activeTab === 'quiz' && showSolutionsGuide,
        onClick: () => {
          setActiveTab('quiz');
          setShowSolutionsGuide(true);
        },
      },
    ];
  }, [showFlashcardsModal, activeTab, showSolutionsGuide]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">

      {/* Top Banner with Math Toggle & Status */}
      <RootHeaderBanner
        title="Statistics & Probability Hub"
        subtitle="Probabilistic Machine Learning & Naive Bayes Masterclass"
        icon={<BarChart3 className="w-6 h-6" />}
        iconGradient="from-blue-600 to-cyan-500"
        progress={{
          label: 'Progress:',
          pct: pct,
          colorGradient: 'from-blue-500 to-cyan-400',
          textColor: 'text-cyan-400',
        }}
        onResetProgress={resetAllProgress}
        resetTitle="Reset All Statistics Progress"
        confirmTitle="Reset Statistics Progress?"
        confirmMessage="Are you sure you want to reset all completed modules and quiz answers in Statistics & Probability Hub? This action cannot be undone."
        topics={[
          'Probability Space & Random Variables',
          'Probability Distributions',
          'Expectation, Variance & Covariance',
          'Joint, Marginal & Conditional Distributions',
          'Central Limit Theorem & Testing',
          'MLE, MAP & Regularization',
          'Naive Bayes Classification',
          'Conjugate Priors & Bayesian Inference',
          'Latent Variables & EM Algorithm',
          'Approximate Inference (MCMC & VI)'
        ]}
      />

      {/* Main Layout: Vertical Module Menu (Desktop) + Mobile Horizontal Pills */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">

        {/* Reusable Module & Tool Sidebar */}
        <ModuleAndToolSidebar
          modules={statsModules}
          activeModuleId={activeTab === 'study' ? activeModuleId : ''}
          onSelectModule={(id) => {
            setActiveTab('study');
            setShowSolutionsGuide(false);
            setActiveModuleId(id);
          }}
          completedCount={completedModules.length}
          totalCount={MODULES_DATA.length}
          tools={statsTools}
          currentModuleIndex={activeModuleId}
          totalModulesCount={MODULES_DATA.length}
          activeModuleBadge={activeModule.badge}
        />

        {/* Main Content Pane */}
        <div className="flex-1 min-w-0 space-y-6 w-full">

          {/* ==================== STUDY GUIDE VIEW ==================== */}
          {activeTab === 'study' && (
            <ModuleTemplate
              moduleId={activeModule.id}
              moduleIndex={activeModuleId}
              totalModules={MODULES_DATA.length}
              badge={activeModule.badge}
              title={activeModule.title}
              subtitle={activeModule.description}
              isCompleted={completedModules.includes(activeModule.id)}
              onToggleComplete={() => toggleModuleComplete(activeModule.id)}
              hasPrev={activeModuleId > 1}
              hasNext={activeModuleId < MODULES_DATA.length}
              onPrevModule={() => setActiveModuleId((prev) => Math.max(1, prev - 1))}
              onNextModule={() => setActiveModuleId((prev) => Math.min(MODULES_DATA.length, prev + 1))}
              prevLabel={activeModuleId > 1 ? `Module ${activeModuleId - 1}` : undefined}
              nextLabel={activeModuleId < MODULES_DATA.length ? `Module ${activeModuleId + 1}` : undefined}
            >

      {/* Concept Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left 2 Cols: Core Readable Definitions */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h4 className="text-xs uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            Core Definitions (Quick Reading)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeModule.definitions.map((d, i) => (
              <div
                key={i}
                className="text-sm bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <span className="text-cyan-300 font-bold text-xs block mb-1">{d.term}</span>
                <span className="text-slate-400 text-xs leading-relaxed">{d.def}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Formula Cheat Sheet */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-400" />
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

      {/* Interactive Simulation & Lab Workspace */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              Interactive Simulation &amp; Playground
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">Explore parameters live to build direct mathematical intuition.</p>
          </div>
        </div>

        {/* Lab 1: PMF vs CDF */}
        {activeModule.interactiveType === 'pmf-cdf' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-slate-200">PMF vs. CDF Coin Toss Experiment</h5>
                <p className="text-xs text-slate-400 mt-1">
                  Select number of fair coin tosses (n) to view discrete PMF point values P(X=k) versus accumulated CDF F(k).
                </p>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Number of Tosses (n):</span>
                  <span className="text-cyan-400 font-bold">{pmfN}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={pmfN}
                  onChange={(e) => setPmfN(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPmfMode('pmf')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    pmfMode === 'pmf' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  PMF View P(X=k)
                </button>
                <button
                  onClick={() => setPmfMode('cdf')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                    pmfMode === 'cdf' ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  CDF View P(X≤k)
                </button>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={pmfCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 2: Distribution Lab */}
        {activeModule.interactiveType === 'distribution-lab' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">Gaussian (Normal) Curve Configurator</h5>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Mean (μ):</span>
                  <span className="text-cyan-400 font-bold">{gaussMu}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={gaussMu}
                  onChange={(e) => setGaussMu(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Standard Deviation (σ):</span>
                  <span className="text-cyan-400 font-bold">{gaussSd.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="3.0"
                  step="0.1"
                  value={gaussSd}
                  onChange={(e) => setGaussSd(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <p>
                  Peak Height at μ:{' '}
                  <strong className="text-cyan-300">{(1 / (gaussSd * Math.sqrt(2 * Math.PI))).toFixed(3)}</strong>
                </p>
                <p>
                  68% Area Interval [μ - σ, μ + σ]:{' '}
                  <strong className="text-cyan-300">
                    [{(gaussMu - gaussSd).toFixed(1)}, {(gaussMu + gaussSd).toFixed(1)}]
                  </strong>
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={gaussCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 3: Covariance Lab */}
        {activeModule.interactiveType === 'covariance-lab' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">Joint Covariance &amp; Linear Relationship</h5>
              <p className="text-xs text-slate-400">
                Adjust correlation (ρ) to see generated bivariate points and examine positive/negative linear dependence.
              </p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Correlation (ρ):</span>
                  <span className="text-cyan-400 font-bold">{covRho.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-0.95"
                  max="0.95"
                  step="0.05"
                  value={covRho}
                  onChange={(e) => setCovRho(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-400">
                  Target Covariance Cov(X,Y): <strong className="text-cyan-300">{covRho.toFixed(2)}</strong>
                </p>
                <p className="text-slate-400">
                  Theoretical Linear Spread: <strong className="text-slate-200">{covRho > 0 ? 'Positive Slope' : covRho < 0 ? 'Negative Slope' : 'Orthogonal'}</strong>
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={covCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 4: Joint Probability Matrix */}
        {activeModule.interactiveType === 'joint-matrix' && (
          <div className="space-y-4">
            <h5 className="text-sm font-semibold text-slate-200">Interactive 2×2 Joint Probability Matrix</h5>
            <p className="text-xs text-slate-400">
              Modify joint probabilities P(X, Y) to inspect automatic marginals P(X), P(Y) and conditional slices P(X|Y).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-center text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800">
                      <th className="p-2" />
                      <th className="p-2 text-cyan-400 font-bold">Y = 0</th>
                      <th className="p-2 text-cyan-400 font-bold">Y = 1</th>
                      <th className="p-2 text-amber-400 font-bold border-l border-slate-800">Marginal P(X)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    <tr>
                      <td className="p-2 font-bold text-blue-400">X = 0</td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={jp00}
                          step="0.05"
                          min="0"
                          max="1"
                          onChange={(e) => setJp00(parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-900 text-center rounded p-1 text-slate-200 border border-slate-700"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={jp01}
                          step="0.05"
                          min="0"
                          max="1"
                          onChange={(e) => setJp01(parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-900 text-center rounded p-1 text-slate-200 border border-slate-700"
                        />
                      </td>
                      <td className="p-2 font-bold text-amber-300 border-l border-slate-800">
                        {(jp00 + jp01).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-blue-400">X = 1</td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={jp10}
                          step="0.05"
                          min="0"
                          max="1"
                          onChange={(e) => setJp10(parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-900 text-center rounded p-1 text-slate-200 border border-slate-700"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={jp11}
                          step="0.05"
                          min="0"
                          max="1"
                          onChange={(e) => setJp11(parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-900 text-center rounded p-1 text-slate-200 border border-slate-700"
                        />
                      </td>
                      <td className="p-2 font-bold text-amber-300 border-l border-slate-800">
                        {(jp10 + jp11).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-t border-slate-800 font-bold">
                      <td className="p-2 text-amber-400">Marginal P(Y)</td>
                      <td className="p-2 text-amber-300">{(jp00 + jp10).toFixed(2)}</td>
                      <td className="p-2 text-amber-300">{(jp01 + jp11).toFixed(2)}</td>
                      <td className="p-2 text-emerald-400 border-l border-slate-800">
                        {(jp00 + jp01 + jp10 + jp11).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                <h6 className="font-bold text-slate-300 border-b border-slate-800 pb-1">Conditional Probabilities</h6>
                <p>
                  P(X = 1 | Y = 1) ={' '}
                  <strong className="text-cyan-300">
                    {jp01 + jp11 > 0 ? (jp11 / (jp01 + jp11)).toFixed(2) : 'N/A'}
                  </strong>
                </p>
                <p>
                  P(X = 0 | Y = 1) ={' '}
                  <strong className="text-cyan-300">
                    {jp01 + jp11 > 0 ? (jp01 / (jp01 + jp11)).toFixed(2) : 'N/A'}
                  </strong>
                </p>
                <p>
                  P(Y = 1 | X = 1) ={' '}
                  <strong className="text-emerald-300">
                    {jp10 + jp11 > 0 ? (jp11 / (jp10 + jp11)).toFixed(2) : 'N/A'}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Lab 5: Central Limit Theorem */}
        {activeModule.interactiveType === 'clt-simulator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">Central Limit Theorem Live Sampling</h5>
              <p className="text-xs text-slate-400">
                Draw random samples from a Uniform [0, 1] distribution and average them. Watch the distribution of sample means become bell-shaped Gaussian!
              </p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Sample Size (n per mean):</span>
                  <span className="text-cyan-400 font-bold">{cltN}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={cltN}
                  onChange={(e) => setCltN(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => runCltSimulation(100)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md"
                >
                  +100 Samples
                </button>
                <button
                  onClick={() => runCltSimulation(1000)}
                  className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition shadow-md"
                >
                  +1000 Samples
                </button>
                <button
                  onClick={resetCltSimulation}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-medium transition"
                >
                  Reset
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-400">
                  Total Sample Means Generated: <strong className="text-cyan-300">{cltMeans.length}</strong>
                </p>
                <p className="text-slate-400">
                  Mean of Means:{' '}
                  <strong className="text-slate-200">
                    {cltMeans.length > 0 ? (cltMeans.reduce((a, b) => a + b, 0) / cltMeans.length).toFixed(3) : '-'}
                  </strong>{' '}
                  | Theoretical Standard Error: <strong className="text-slate-200">{(0.288 / Math.sqrt(cltN)).toFixed(3)}</strong>
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={cltCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 6: MLE vs MAP */}
        {activeModule.interactiveType === 'mle-map-lab' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">MLE vs. MAP Regularization Shrinkage</h5>
              <p className="text-xs text-slate-400">
                Adjust Gaussian Prior variance (τ²) to see how Bayesian MAP pulls estimates toward zero compared to pure unregularized MLE.
              </p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Prior Variance (τ²):</span>
                  <span className="text-cyan-400 font-bold">{mapTau.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="5.0"
                  step="0.1"
                  value={mapTau}
                  onChange={(e) => setMapTau(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <p className="text-slate-400">
                  Unregularized MLE Estimate w_MLE: <strong className="text-amber-400">4.20</strong>
                </p>
                <p className="text-slate-400">
                  Regularized MAP Estimate w_MAP:{' '}
                  <strong className="text-cyan-300">{((4.2 * mapTau) / (mapTau + 0.5)).toFixed(2)}</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Smaller prior variance τ² imposes stronger shrinkage toward 0, mathematically identical to L2 Ridge Regularization (λ = σ²/τ²).
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={mleMapCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 7: Naive Bayes Masterclass */}
        {activeModule.interactiveType === 'naive-bayes-masterclass' && (
          <div className="space-y-6">

            {/* Sub-lab 1: Discrete Spam Classifier */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <h5 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Lab 1: Discrete Naive Bayes &amp; Laplace Smoothing (α)
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  Test email tokens: <code className="text-cyan-300 font-mono font-bold">"Viagra Winner Rolex"</code>. Notice what happens when "Rolex" (0 previous observations) is tested with α = 0 vs α = 1!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Laplace Smoothing (α):</span>
                      <span className="text-cyan-400 font-bold">{nbAlpha.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={nbAlpha}
                      onChange={(e) => setNbAlpha(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  {nbAlpha === 0 && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                      ⚠️ <strong>Zero-Frequency Triggered!</strong> With α = 0, P("Rolex"|Spam) = 0, wiping out the entire Spam Score to 0!
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <p className="text-xs text-slate-400">Spam Score</p>
                    <p className="text-lg font-mono font-bold text-rose-400 mt-1">
                      {nbCalculations.spamScore.toExponential(4)}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <p className="text-xs text-slate-400">Ham Score</p>
                    <p className="text-lg font-mono font-bold text-emerald-400 mt-1">
                      {nbCalculations.hamScore.toExponential(4)}
                    </p>
                  </div>
                  <div className="col-span-2 p-3 rounded-xl bg-blue-600/15 border border-blue-500/25 text-center">
                    <p className="text-xs text-slate-300">Final Posterior Probability of Spam:</p>
                    <p className="text-xl sm:text-2xl font-extrabold text-cyan-300 mt-0.5">
                      {nbCalculations.spamProb.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-lab 2: Continuous Gaussian Naive Bayes */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <h5 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Lab 2: Gaussian Naive Bayes (Continuous Features)
                </h5>
                <p className="text-xs text-slate-400 mt-0.5">
                  Classify gender based on continuous Height. Drag query marker to evaluate likelihood on female vs male PDF curves.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Query Height:</span>
                      <span className="text-cyan-400 font-bold">
                        {gnbHeight}" ({Math.floor(gnbHeight / 12)}'{Math.round(gnbHeight % 12)}")
                      </span>
                    </div>
                    <input
                      type="range"
                      min="58"
                      max="78"
                      step="0.5"
                      value={gnbHeight}
                      onChange={(e) => setGnbHeight(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <p className="text-rose-400 font-medium">
                      Female (μ=65", σ=2.5"): <span className="font-mono text-slate-200">{gnbCalculations.lhF.toFixed(5)}</span>
                    </p>
                    <p className="text-blue-400 font-medium">
                      Male (μ=70", σ=3.0"): <span className="font-mono text-slate-200">{gnbCalculations.lhM.toFixed(5)}</span>
                    </p>
                  </div>

                  <div className="p-3 bg-blue-600/10 border border-blue-500/20 rounded-xl text-center">
                    <p className="text-xs text-slate-400">Predicted Class:</p>
                    <p
                      className={`text-base font-bold mt-0.5 ${
                        gnbCalculations.isMale ? 'text-blue-400' : 'text-rose-400'
                      }`}
                    >
                      {gnbCalculations.isMale ? 'Male' : 'Female'} (
                      {(gnbCalculations.isMale ? gnbCalculations.probM : 100 - gnbCalculations.probM).toFixed(1)}% Confidence)
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 h-64 bg-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
                  <canvas ref={gnbCanvasRef} className="w-full h-full" />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Lab 8: Conjugate Priors */}
        {activeModule.interactiveType === 'conjugate-priors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">Beta-Binomial Bayesian Updater</h5>
              <p className="text-xs text-slate-400">
                Observe how prior beliefs Beta(α₀, β₀) update in closed form into posterior Beta(α₀+k, β₀+n-k) as heads/tails arrive.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Prior Alpha (α₀):</span>
                    <span className="text-cyan-400 font-bold">{betaA0.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={betaA0}
                    onChange={(e) => setBetaA0(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Prior Beta (β₀):</span>
                    <span className="text-cyan-400 font-bold">{betaB0.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={betaB0}
                    onChange={(e) => setBetaB0(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setConjHeads((k) => k + 1)}
                  className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold transition"
                >
                  +1 Heads
                </button>
                <button
                  onClick={() => setConjTails((f) => f + 1)}
                  className="flex-1 py-2 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-bold transition"
                >
                  +1 Tails
                </button>
                <button
                  onClick={() => {
                    setConjHeads(0);
                    setConjTails(0);
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-medium transition"
                >
                  Reset
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-400">
                  Observed: Heads = <strong className="text-emerald-400">{conjHeads}</strong> | Tails ={' '}
                  <strong className="text-rose-400">{conjTails}</strong>
                </p>
                <p className="text-slate-400">
                  Posterior Expected Mean θ:{' '}
                  <strong className="text-cyan-300">
                    {((betaA0 + conjHeads) / (betaA0 + conjHeads + betaB0 + conjTails)).toFixed(3)}
                  </strong>
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={conjCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 9: GMM EM */}
        {activeModule.interactiveType === 'gmm-em' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">EM Algorithm for 2-Component GMM</h5>
              <p className="text-xs text-slate-400">
                Fit a Gaussian Mixture Model to bimodal data. Watch the E-step calculate soft responsibilities and M-step relocate means μ₁ and μ₂.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={stepEmAlgorithm}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-500/20"
                >
                  ▶ Run 1 EM Step
                </button>
                <button
                  onClick={resetEmAlgorithm}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-medium transition"
                >
                  Reset Model
                </button>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <p className="text-slate-400">
                  EM Iteration Step: <strong className="text-cyan-400">{emStep}</strong>
                </p>
                <p className="text-emerald-400">
                  Component 1: μ₁ = <span className="font-mono text-slate-200">{emMu1.toFixed(2)}</span> | σ₁ ={' '}
                  <span className="font-mono text-slate-200">{emSig1.toFixed(2)}</span>
                </p>
                <p className="text-purple-400">
                  Component 2: μ₂ = <span className="font-mono text-slate-200">{emMu2.toFixed(2)}</span> | σ₂ ={' '}
                  <span className="font-mono text-slate-200">{emSig2.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={gmmCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Lab 10: MCMC Sampler */}
        {activeModule.interactiveType === 'mcmc-vi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h5 className="text-sm font-semibold text-slate-200">Metropolis-Hastings MCMC Sampler</h5>
              <p className="text-xs text-slate-400">
                Sample from an intractable bimodal target posterior. Random walk proposals are accepted or rejected based on ratio α.
              </p>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Proposal Step Size (σ_prop):</span>
                  <span className="text-cyan-400 font-bold">{mcmcStep.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.5"
                  step="0.1"
                  value={mcmcStep}
                  onChange={(e) => setMcmcStep(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => runMcmcSimulation(200)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-md"
                >
                  +200 MCMC Samples
                </button>
                <button
                  onClick={() => runMcmcSimulation(1000)}
                  className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition shadow-md"
                >
                  +1000 Samples
                </button>
                <button
                  onClick={resetMcmcSimulation}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-medium transition"
                >
                  Reset
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <p className="text-slate-400">
                  Total Samples: <strong className="text-cyan-300">{mcmcSamples.length}</strong>
                </p>
                <p className="text-slate-400">
                  Acceptance Rate:{' '}
                  <strong className="text-emerald-400">
                    {mcmcTotal > 0 ? ((mcmcAccepted / mcmcTotal) * 100).toFixed(1) : '0.0'}%
                  </strong>
                </p>
              </div>
            </div>
            <div className="h-64 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-center">
              <canvas ref={mcmcCanvasRef} className="w-full h-full" />
            </div>
          </div>
        )}

      </div>

        {/* Knowledge Check Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">Module {activeModule.id} Knowledge Check</h4>
              <p className="text-xs text-slate-400">Ready to test mastery of this module's concepts?</p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveTab('quiz');
              setQuizModuleKey(`m${Math.min(activeModule.id, 7)}`);
              setShowSolutionsGuide(false);
            }}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
          >
            <span>Take Module {Math.min(activeModule.id, 7)} Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </ModuleTemplate>
          )}

          {/* ==================== PRACTICE QUIZZES & SOLUTIONS SECTION ==================== */}
          {activeTab === 'quiz' && (
            <QuizTemplate
              title="Statistics Mastery Assessment & Derivations"
              subtitle="CS229 Probability & Statistics Interactive Assessment"
              modules={statQuizModules}
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
              storageKey="statistics_quiz_answers"
              onAnswersChange={setQuizUserAnswers}
            />
          )}

          {/* ==================== SECTION: CS229 VIP PROBABILITY & STATISTICS FLASHCARDS ==================== */}
          {activeTab === 'flashcards' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                      Stanford CS229 VIP Refresher
                    </span>
                    <span className="text-xs text-slate-400">34 Essential Formulas</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Probability &amp; Statistics Formula Flashcards
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Master probability axioms, Bayes’ rule, CDF/PDFs, moments, characteristic functions, variable transformations, joint distributions, 5 core distributions, and CLT parameter estimation.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  {/* Mastery Counter */}
                  <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">Mastered:</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {masteredCards.length}/{CS229_STATS_FLASHCARDS.length}
                    </span>
                  </div>

                  {/* View Mode Switcher (Deck vs Grid) */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setFlashcardViewMode('deck')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        flashcardViewMode === 'deck'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Deck View
                    </button>
                    <button
                      onClick={() => setFlashcardViewMode('grid')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        flashcardViewMode === 'grid'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Grid View
                    </button>
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  'All',
                  'Probability & Combinatorics',
                  'Random Variables & Properties',
                  'Moments & Transformations',
                  'Joint Distributions & Correlation',
                  'Key Distributions',
                  'Estimation & CLT'
                ].map((cat) => {
                  const isSelected = cardCategory === cat;
                  const count =
                    cat === 'All'
                      ? CS229_STATS_FLASHCARDS.length
                      : CS229_STATS_FLASHCARDS.filter((c) => c.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setCardCategory(cat);
                        setCurrentCardIdx(0);
                        setIsCardFlipped(false);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition border flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                          : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* DECK VIEW: Interactive Flippable Card */}
              {flashcardViewMode === 'deck' && (
                <div className="space-y-4">
                  {/* Progress and Card Counter */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>
                      Card <strong className="text-white">{currentCardIdx + 1}</strong> of {filteredFlashcards.length}
                    </span>
                    <span className="text-indigo-400 font-semibold">{activeCard.category}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${((currentCardIdx + 1) / filteredFlashcards.length) * 100}%` }}
                    />
                  </div>

                  {/* The Interactive Flipping Card Container */}
                  <div
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className="cursor-pointer min-h-[340px] sm:min-h-[380px] bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 sm:p-8 shadow-xl transition-all relative flex flex-col justify-between group select-none"
                  >
                    {/* Top card header */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {activeCard.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCardMastered(activeCard.id);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                          masteredCards.includes(activeCard.id)
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{masteredCards.includes(activeCard.id) ? 'Mastered' : 'Mark Mastered'}</span>
                      </button>
                    </div>

                    {/* Card Content (Front vs Back) */}
                    <div className="my-6 space-y-4 text-center">
                      {!isCardFlipped ? (
                        /* FRONT: Question / Concept Prompt */
                        <div className="space-y-4 animate-fade-in">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Question / Concept Prompt
                          </span>
                          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            <MathText text={activeCard.title} />
                          </h4>
                          <div className="text-base sm:text-lg text-slate-200 font-medium max-w-xl mx-auto leading-relaxed">
                            <MathText text={activeCard.frontPrompt} />
                          </div>
                          <p className="text-xs text-indigo-400/80 italic pt-2">
                            (Click card or press Space to reveal formula &amp; derivation)
                          </p>
                        </div>
                      ) : (
                        /* BACK: Formula & Derivation */
                        <div className="space-y-4 animate-fade-in">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                            Formula &amp; Mathematical Derivation
                          </span>
                          <h4 className="text-lg font-bold text-indigo-300">
                            <MathText text={activeCard.title} />
                          </h4>
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-100 text-base sm:text-lg overflow-x-auto shadow-inner max-w-2xl mx-auto">
                            <FlashcardFormula tex={activeCard.backFormula} />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                            <MathText text={activeCard.backExplanation} />
                          </p>
                          {activeCard.useCase && (
                            <div className="inline-block bg-blue-950/40 text-blue-300 border border-blue-800/60 px-3 py-1 rounded-lg text-xs font-semibold">
                              💡 <strong>ML Use Case:</strong> {activeCard.useCase}
                            </div>
                          )}
                          {activeCard.remark && (
                            <p className="text-[11px] text-slate-400 italic max-w-lg mx-auto">
                              Remark: <MathText text={activeCard.remark} />
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom hint bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
                      <span>Press Space / Enter to Flip</span>
                      <span>Use ← → Arrow Keys to Navigate</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentCardIdx((prev) => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
                        setIsCardFlipped(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-2 border border-slate-700/60 shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{isCardFlipped ? 'Show Front' : 'Flip to Formula'}</span>
                      </button>
                      <button
                        onClick={() => {
                          const rand = Math.floor(Math.random() * filteredFlashcards.length);
                          setCurrentCardIdx(rand);
                          setIsCardFlipped(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700/60"
                        title="Shuffle Cards"
                      >
                        <Shuffle className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentCardIdx((prev) => (prev + 1) % filteredFlashcards.length);
                        setIsCardFlipped(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-600/30"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* GRID VIEW: Browse All Flashcards */}
              {flashcardViewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFlashcards.map((card) => {
                    const isMastered = masteredCards.includes(card.id);
                    return (
                      <div
                        key={card.id}
                        className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-sm space-y-3.5 flex flex-col justify-between transition-all"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {card.category}
                            </span>
                            <button
                              onClick={() => toggleCardMastered(card.id)}
                              className={`p-1.5 rounded-lg text-xs transition ${
                                isMastered ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                              }`}
                              title={isMastered ? 'Marked Mastered' : 'Mark as Mastered'}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          </div>
                          <h4 className="font-bold text-white text-sm">
                            <MathText text={card.title} />
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <MathText text={card.frontPrompt} />
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-800/80">
                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs overflow-x-auto text-indigo-200 font-mono">
                            <FlashcardFormula tex={card.backFormula} />
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            <MathText text={card.backExplanation} />
                          </p>
                          {card.useCase && (
                            <p className="text-[11px] text-blue-300 font-medium">
                              💡 {card.useCase}
                            </p>
                          )}
                          {card.remark && (
                            <p className="text-[10px] text-slate-500 italic">
                              Remark: <MathText text={card.remark} />
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

            {/* Universal VIP Flashcards Modal */}
      <UniversalFlashcardsModal
        isOpen={showFlashcardsModal}
        onClose={() => setShowFlashcardsModal(false)}
        title="Probability & Statistics Flashcards"
        subtitle="Stanford CS229 VIP Formula Refresher — Modules 1–10"
        cards={CS229_STATS_FLASHCARDS}
        activeModuleId={activeModuleId}
        storageKey="statistics_flashcards_mastered"
      />
    </div>
  );
};
