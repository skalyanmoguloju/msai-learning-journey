import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import katex from 'katex';
import {
  Brain,
  BrainCircuit,
  Cpu,
  Layers,
  Activity,
  TrendingUp,
  Calculator,
  Sliders,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  CheckCircle,
  XCircle,
  X,
  Search,
  BookOpen,
  CreditCard,
  Award,
  Trophy,
  Play,
  HelpCircle,
  Grid,
  Split,
  GitCompare,
  Book,
  StickyNote,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  ListChecks
} from 'lucide-react';

// ─────────────────────────────────────────────
// KaTeX Math Rendering Helper
// ─────────────────────────────────────────────
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

// Canvas High-DPI helper
const setupCanvas = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = rect.width || 400;
  const h = rect.height || 200;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.resetTransform?.();
  ctx.scale(dpr, dpr);
  return ctx;
};

// ─────────────────────────────────────────────
// Types & Static Data
// ─────────────────────────────────────────────
type StepId = 1 | 2 | 3 | 4 | 5 | 6;

interface StepMeta {
  id: StepId;
  title: string;
  badge: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepMeta[] = [
  {
    id: 1,
    title: 'Foundational Concepts',
    badge: 'AI / ML / DL',
    subtitle: 'Symbolic vs Statistical AI, Learning Paradigms & Dataset Partitioning',
    icon: BrainCircuit
  },
  {
    id: 2,
    title: 'Classification Metrics',
    badge: 'Evaluation',
    subtitle: 'Confusion Matrix, Accuracy, Precision, Recall, F1-Score & Trade-offs',
    icon: Grid
  },
  {
    id: 3,
    title: 'Regression Metrics',
    badge: 'Residuals',
    subtitle: 'MSE, RMSE, MAE, R² Score & Outlier Sensitivity Analysis',
    icon: TrendingUp
  },
  {
    id: 4,
    title: 'Activation Functions',
    badge: 'Non-Linearity',
    subtitle: 'Sigmoid, ReLU, Tanh, Softmax & Vanishing / Exploding Gradients',
    icon: Activity
  },
  {
    id: 5,
    title: 'Gradient Descent',
    badge: 'Optimization',
    subtitle: 'Loss Formulation, Learning Rate, Partial Derivatives & Convergence',
    icon: Sliders
  },
  {
    id: 6,
    title: 'Neural Nets & CNN Sizing',
    badge: 'Architectures',
    subtitle: 'Artificial Neurons, Convolutions, Kernel Stride, Padding & Spatial Dimensions',
    icon: Calculator
  }
];

const MASTER_GLOSSARY = [
  { term: 'Artificial Intelligence (AI)', step: 'Step 1', def: 'The overarching field of computer science aimed at building intelligent systems capable of performing tasks requiring human cognition.' },
  { term: 'Machine Learning (ML)', step: 'Step 1', def: 'A subfield of AI where computer algorithms learn patterns and rules directly from data rather than relying on hardcoded manual instructions.' },
  { term: 'Deep Learning (DL)', step: 'Step 1', def: 'A specialized branch of ML utilizing multi-layered artificial neural networks to automatically extract feature hierarchies from complex raw data.' },
  { term: 'Supervised Learning', step: 'Step 1', def: 'An ML approach where models are trained on labeled datasets containing pairs of input features (X) and explicit target outputs (y).' },
  { term: 'Unsupervised Learning', step: 'Step 1', def: 'An ML approach where models analyze unlabeled datasets (X only) to discover inherent groupings, clusters, or lower-dimensional structures.' },
  { term: 'Reinforcement Learning', step: 'Step 1', def: 'A learning paradigm where an autonomous agent learns to take optimal actions in an environment to maximize total cumulative rewards.' },
  { term: 'Accuracy', step: 'Step 2', def: 'The proportion of total correct predictions (TP + TN) relative to total evaluations. Formula: (TP + TN) / Total.' },
  { term: 'Precision', step: 'Step 2', def: 'The proportion of true positive predictions out of all predicted positive cases (TP / (TP + FP)). Reflects prediction quality.' },
  { term: 'Recall (Sensitivity)', step: 'Step 2', def: 'The proportion of actual positive cases that the model successfully identified (TP / (TP + FN)). Reflects detection coverage.' },
  { term: 'F1-Score', step: 'Step 2', def: 'The harmonic mean of Precision and Recall, providing a single balanced evaluation metric for imbalanced data.' },
  { term: 'True Positive (TP)', step: 'Step 2', def: 'Correctly identifying a positive target case.' },
  { term: 'False Positive (FP)', step: 'Step 2', def: 'Type I Error: Falsely predicting a negative target as positive (False Alarm).' },
  { term: 'False Negative (FN)', step: 'Step 2', def: 'Type II Error: Missing a positive case by falsely predicting it as negative.' },
  { term: 'Mean Squared Error (MSE)', step: 'Step 3', def: 'The average of squared residuals (y - y_hat)^2. Strongly penalizes large outlier errors.' },
  { term: 'Root Mean Squared Error (RMSE)', step: 'Step 3', def: 'The square root of MSE, returning the metric to the original target variable measurement units.' },
  { term: 'Mean Absolute Error (MAE)', step: 'Step 3', def: 'The average of absolute error magnitudes |y - y_hat|. Robust against extreme dataset outliers.' },
  { term: 'R² Score (Coefficient of Determination)', step: 'Step 3', def: 'The proportion of total target variance explained by the regression model (1.0 = Perfect, 0.0 = Baseline Mean).' },
  { term: 'Residual', step: 'Step 3', def: 'The vertical difference between an observed target value and the model prediction (e_i = y_i - y_hat_i).' },
  { term: 'Activation Function', step: 'Step 4', def: 'A mathematical non-linear function applied to a neuron weighted sum to enable learning of non-linear decision boundaries.' },
  { term: 'Sigmoid', step: 'Step 4', def: 'S-shaped function squashing values into range (0, 1). Used in binary classification.' },
  { term: 'ReLU (Rectified Linear Unit)', step: 'Step 4', def: 'Activation function returning max(0, z). Fast to compute, default choice for deep hidden layers.' },
  { term: 'Softmax', step: 'Step 4', def: 'Function normalizing a vector of unnormalized logits into a multi-class probability distribution summing to 1.0.' },
  { term: 'Vanishing Gradient', step: 'Step 4', def: 'Phenomenon during backpropagation where small gradients shrink exponentially in early layers, stalling training.' },
  { term: 'Gradient', step: 'Step 5', def: 'Vector of partial derivatives pointing in the direction of steepest loss increase.' },
  { term: 'Gradient Descent', step: 'Step 5', def: 'An optimization algorithm that iteratively updates model parameters in the opposite direction of the gradient to minimize loss.' },
  { term: 'Learning Rate (alpha)', step: 'Step 5', def: 'A scalar hyperparameter that scales the magnitude of parameter updates taken during optimization.' },
  { term: 'Convergence', step: 'Step 5', def: 'The state where parameter updates stabilize near minimal loss.' },
  { term: 'Perceptron', step: 'Step 6', def: 'The basic artificial neuron unit computing a weighted sum of inputs plus bias passed through an activation function.' },
  { term: 'Convolutional Neural Network (CNN)', step: 'Step 6', def: 'A neural network architecture specialized for grid inputs using learnable 2D filters/kernels to extract local features.' },
  { term: 'Filter / Kernel', step: 'Step 6', def: 'A small matrix of learnable weights slid across image inputs to extract feature representations.' },
  { term: 'Stride (S)', step: 'Step 6', def: 'The pixel step displacement of the filter during spatial convolution.' },
  { term: 'Padding (P)', step: 'Step 6', def: 'Zero-valued border pixels added around input matrices to maintain spatial dimensions.' }
];

const FLASHCARDS = [
  { category: 'Step 1: Foundations', q: 'What is the key difference in traditional programming vs Machine Learning?', a: 'Traditional: Data + Rules -> Answers.\nMachine Learning: Data + Answers -> Rules/Model.' },
  { category: 'Step 2: Classification', q: 'When should Precision be prioritized over Recall?', a: 'When False Positives are very costly (e.g., Spam Filters—blocking an important email is worse than missing spam).' },
  { category: 'Step 2: Classification', q: 'When should Recall be prioritized over Precision?', a: 'When False Negatives are critical (e.g., Cancer Screening—missing a sick patient is catastrophic).' },
  { category: 'Step 3: Regression', q: 'Why does MSE penalize large errors more heavily than MAE?', a: 'MSE squares individual error terms (y - y_hat)^2, inflating large outliers quadratically.' },
  { category: 'Step 4: Activations', q: 'What is the main limitation of the Sigmoid function in deep hidden layers?', a: 'Suffers from vanishing gradients at extreme positive or negative inputs.' },
  { category: 'Step 4: Activations', q: 'How does Softmax differ from Sigmoid?', a: 'Softmax converts an unnormalized vector of logits into a multi-class probability distribution summing to 1.0.' },
  { category: 'Step 5: Gradient Descent', q: 'What happens if the Learning Rate (alpha) is too large?', a: 'The optimization overshoots the minimum and diverges, failing to converge.' },
  { category: 'Step 6: CNN Sizing', q: 'What is the output dimension formula for a 2D Feature Map?', a: 'O = floor((W - F + 2P) / S) + 1.' }
];

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizModuleData {
  title: string;
  stepNumber: number;
  badge: string;
  sub: string;
  questions: QuizQuestion[];
}

const AI_WEEK1_QUIZ: Record<string, QuizModuleData> = {
  s1: {
    title: 'Step 1: Foundational Concepts & Data-Driven Methods',
    stepNumber: 1,
    badge: 'Foundations & Paradigms',
    sub: 'Data + Answers vs Rules, Unsupervised Clustering',
    questions: [
      {
        id: 's1_q1',
        question: 'What is the fundamental difference between traditional programming and Machine Learning?',
        options: [
          'Traditional programming requires continuous targets; ML requires discrete classes.',
          'Traditional programming takes Data + Rules to generate Answers; ML takes Data + Answers to learn Rules.',
          'Traditional programming cannot run on GPUs; ML runs exclusively on GPUs.',
          'Traditional programming relies on neural networks; ML relies on decision trees.'
        ],
        correct: 1,
        explanation: 'In traditional software programming, developers write explicit **Rules** applied to **Data** to produce **Answers**. In Machine Learning, the system ingests **Data** alongside known ground-truth **Answers** to automatically induce and train the predictive **Rules** ($f(X) \\approx Y$).'
      },
      {
        id: 's1_q2',
        question: 'An algorithm that groups customers by purchasing behavior without any prior labels is an example of:',
        options: [
          'Supervised Regression',
          'Supervised Classification',
          'Unsupervised Clustering',
          'Reinforcement Learning'
        ],
        correct: 2,
        explanation: '**Unsupervised Clustering** (e.g. K-Means, DBSCAN) partitions unlabeled feature data into natural clusters based on geometric or statistical distance without any pre-existing class labels. Supervised learning requires labeled outcomes, and Reinforcement Learning relies on sequential agent rewards.'
      }
    ]
  },
  s2: {
    title: 'Step 2: Classification Metrics & Evaluation',
    stepNumber: 2,
    badge: 'Classification & Confusion Matrix',
    sub: 'Type II Errors, Spam Filter Precision vs Recall',
    questions: [
      {
        id: 's2_q3',
        question: 'If a medical screening test misses a patient who actually has a disease, what type of error has occurred?',
        options: [
          'False Positive (Type I Error)',
          'False Negative (Type II Error)',
          'True Negative',
          'Precision Error'
        ],
        correct: 1,
        explanation: 'A **False Negative (Type II Error)** occurs when the true ground condition is positive ($Y = 1$, diseased) but the model falsely predicts negative ($\\hat{Y} = 0$). In diagnostic screening, minimizing False Negatives (maximizing Recall / Sensitivity $\\frac{\\text{TP}}{\\text{TP} + \\text{FN}}$) is paramount.'
      },
      {
        id: 's2_q4',
        question: 'Which evaluation metric should you prioritize for a spam detection filter where blocking a legitimate, critical email is considered catastrophic?',
        options: [
          'Recall',
          'Accuracy',
          'Precision',
          'MSE'
        ],
        correct: 2,
        explanation: '$\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}$. In spam classification, mislabeling a crucial legitimate email as spam is a False Positive. Maximizing Precision directly suppresses False Positives toward zero, guaranteeing that flagged emails are genuine spam.'
      }
    ]
  },
  s3: {
    title: 'Step 3: Regression Metrics',
    stepNumber: 3,
    badge: 'Continuous Error & R²',
    sub: 'Physical RMSE Units & R² Baseline Significance',
    questions: [
      {
        id: 's3_q5',
        question: 'Why would an engineer choose Root Mean Squared Error (RMSE) over Mean Squared Error (MSE) when presenting results to stakeholders?',
        options: [
          'RMSE eliminates the effect of all outliers.',
          'RMSE converts the error metric back into the original units of the target variable.',
          'RMSE is bounded strictly between $0.0$ and $1.0$.',
          'RMSE does not require computing actual values.'
        ],
        correct: 1,
        explanation: '$\\text{MSE} = \\frac{1}{n}\\sum (y_i - \\hat{y}_i)^2$ yields squared physical units (e.g., $\\text{dollars}^2$ or $\\text{meters}^2$). Taking the square root $\\text{RMSE} = \\sqrt{\\text{MSE}}$ restores the metric into the original physical unit scale of the dependent variable, making it immediately interpretable to non-technical stakeholders.'
      },
      {
        id: 's3_q6',
        question: 'What does an $R^2$ score of $0.0$ indicate about a regression model?',
        options: [
          'The model makes perfect predictions.',
          'The model performs no better than simply predicting the mean of the target variable.',
          'The model has infinite error.',
          'The model is suffering from severe underfitting.'
        ],
        correct: 1,
        explanation: 'Because $R^2 = 1 - \\frac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}}$, an $R^2 = 0.0$ implies $\\text{SS}_{\\text{res}} = \\text{SS}_{\\text{tot}}$. The fitted regression model accounts for $0\\%$ of target variance and performs exactly equivalent to the naive baseline prediction $\\hat{y} = \\bar{y}$ (the sample mean).'
      }
    ]
  },
  s4: {
    title: 'Step 4: Probability & Activation Functions',
    stepNumber: 4,
    badge: 'Non-Linearities & Activations',
    sub: 'Softmax Distribution & Vanishing Gradient Relief',
    questions: [
      {
        id: 's4_q7',
        question: 'Which activation function is most suitable for the output layer of a multi-class classification problem where class probabilities must sum to 1.0?',
        options: [
          'ReLU',
          'Sigmoid',
          'Softmax',
          'Tanh'
        ],
        correct: 2,
        explanation: 'The **Softmax** function $\\sigma(z)_i = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}$ normalizes arbitrary unconstrained logit vectors into a valid categorical probability distribution where $0 \\le P_i \\le 1$ and $\\sum_{i=1}^K P_i = 1.0$. Sigmoid produces independent Bernoulli probabilities.'
      },
      {
        id: 's4_q8',
        question: 'What is a primary advantage of using ReLU over Sigmoid in hidden layers of deep neural networks?',
        options: [
          'ReLU bounds outputs strictly between $-1$ and $+1$.',
          'ReLU mitigates the vanishing gradient problem for positive inputs.',
          'ReLU transforms input vectors into valid probability distributions.',
          'ReLU is a smooth, continuously differentiable curve everywhere.'
        ],
        correct: 1,
        explanation: 'Sigmoid saturates for large $|z|$ with a maximum derivative of $\\sigma\'(0) = 0.25$, causing gradients to vanish exponentially through multiple layers during backpropagation. **ReLU** ($f(z) = \\max(0, z)$) has a constant gradient $\\frac{df}{dz} = 1.0$ for all $z > 0$, preventing vanishing gradients.'
      }
    ]
  },
  s5: {
    title: 'Step 5: Linear Regression & Gradient Descent',
    stepNumber: 5,
    badge: 'Optimization & Gradients',
    sub: 'Learning Rate Divergence & Steepest Ascent Vectors',
    questions: [
      {
        id: 's5_q9',
        question: 'If the learning rate ($\\alpha$) in Gradient Descent is set far too high, what will happen during optimization?',
        options: [
          'The model will converge to the global minimum almost instantaneously.',
          'The parameters will stop updating completely.',
          'The loss may overshoot the minimum and diverge.',
          'The gradient vector will drop to zero immediately.'
        ],
        correct: 2,
        explanation: 'When step size $\\alpha$ is excessively large, parameter updates $W \\leftarrow W - \\alpha \\nabla L$ overshoot the loss surface valley, creating growing oscillations that cause the loss to explode towards infinity (numerical divergence).'
      },
      {
        id: 's5_q10',
        question: 'In the parameter update formula $W_{\\text{new}} = W_{\\text{old}} - \\alpha \\cdot \\frac{\\partial L}{\\partial W}$, what does $\\frac{\\partial L}{\\partial W}$ represent?',
        options: [
          'The step size multiplier',
          'The magnitude and direction of steepest increase in loss relative to weight $W$',
          'The predicted continuous target value',
          'The total number of training samples'
        ],
        correct: 1,
        explanation: 'The partial derivative $\\frac{\\partial L}{\\partial W}$ points along the direction of **steepest increase (ascent)** of the objective loss function. Subtracting this gradient ($-\\alpha \\nabla L$) forces parameters to update in the direction of **steepest descent**.'
      }
    ]
  },
  s6: {
    title: 'Step 6: Neural Networks & CNN Sizing',
    stepNumber: 6,
    badge: 'Deep Learning & CNNs',
    sub: 'Spatial Dimensionality Formula & Padding Benefits',
    questions: [
      {
        id: 's6_q11',
        question: 'Given an input feature map of size $W = 32 \\times 32$, a filter size $F = 5 \\times 5$, padding $P = 1$, and stride $S = 2$, what is the output feature map dimension $O$?',
        options: [
          '$14 \\times 14$',
          '$15 \\times 15$',
          '$16 \\times 16$',
          '$28 \\times 28$'
        ],
        correct: 1,
        explanation: 'Using the spatial formula:\\\\\n$$O = \\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1$$\\\\\nSubstitute $W=32, F=5, P=1, S=2$:\\\\\n$$O = \\left\\lfloor \\frac{32 - 5 + 2(1)}{2} \\right\\rfloor + 1 = \\left\\lfloor \\frac{29}{2} \\right\\rfloor + 1 = 14 + 1 = 15$$\\\\\nThus, the resulting feature map is $15 \\times 15$.'
      },
      {
        id: 's6_q12',
        question: 'What is the primary purpose of applying zero-padding ($P$) to an image before passing it through a convolutional layer?',
        options: [
          'To speed up matrix multiplication.',
          'To preserve spatial dimensions and prevent edge pixels from losing information rapidly.',
          'To force all output feature values to be non-negative.',
          'To convert 2D images into 1D vectors.'
        ],
        correct: 1,
        explanation: 'Without zero-padding, every convolution shaves off borders and samples edge pixels fewer times than interior pixels. Padding preserves spatial height/width and prevents premature loss of perimeter pixel information through deep convolutional stacks.'
      }
    ]
  }
};

const PARADIGM_QUESTIONS = [
  { q: 'Predicting continuous house prices based on square footage and location.', answer: 'Supervised (Regression)' },
  { q: 'Grouping online retail customers into 5 target market segments based on purchasing habits.', answer: 'Unsupervised (Clustering)' },
  { q: 'Training a digital agent to play Chess by giving positive points for wins and negative points for losses.', answer: 'Reinforcement Learning' },
  { q: 'Classifying incoming emails as "Spam" or "Not Spam" based on labeled training data.', answer: 'Supervised (Classification)' }
];

const STORAGE_KEY_COMPLETED = 'ml_core_completed';
const STORAGE_KEY_NOTES = 'ml_core_notes';
const STORAGE_KEY_QUIZ_ANSWERS = 'ml_week1_quiz_answers';

// ─────────────────────────────────────────────
// Main Week 1 Component
// ─────────────────────────────────────────────
export const Week1AIBasics: React.FC = () => {
  const [activeStep, setActiveStep] = useState<StepId>(1);
  const [completedSteps, setCompletedSteps] = useState<StepId[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED) || '[]');
    } catch {
      return [];
    }
  });

  // Quiz Mode & Assessment State (Calculus Quiz Experience)
  const [activeMainTab, setActiveMainTab] = useState<'study' | 'quiz'>('study');
  const [quizStepKey, setQuizStepKey] = useState<string>('s1');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [showSolutionsGuide, setShowSolutionsGuide] = useState(false);
  const [quizUserAnswers, setQuizUserAnswers] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_QUIZ_ANSWERS) || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUIZ_ANSWERS, JSON.stringify(quizUserAnswers));
    } catch {
      // ignore
    }
  }, [quizUserAnswers]);

  // Modal States
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(() => localStorage.getItem(STORAGE_KEY_NOTES) || '');
  const [toast, setToast] = useState<string | null>(null);

  // Step 1: Paradigm Game State
  const [paradigmIdx, setParadigmIdx] = useState(0);
  const [paradigmScore, setParadigmScore] = useState(0);

  // Step 2: Confusion Matrix State
  const [cmTP, setCmTP] = useState(45);
  const [cmFP, setCmFP] = useState(10);
  const [cmFN, setCmFN] = useState(5);
  const [cmTN, setCmTN] = useState(140);

  // Step 3: Regression Residuals State
  const [regPoints, setRegPoints] = useState<Array<{ x: number; y: number; pred: number }>>([
    { x: 1, y: 2.2, pred: 2.0 },
    { x: 2, y: 3.9, pred: 4.0 },
    { x: 3, y: 6.1, pred: 6.0 },
    { x: 4, y: 8.2, pred: 8.0 },
    { x: 5, y: 9.8, pred: 10.0 }
  ]);
  const regCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Step 4: Activation State
  const [actZ, setActZ] = useState<number>(1.0);
  const actCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Step 5: Gradient Descent State
  const [gdW, setGdW] = useState<number>(0.0);
  const [gdB, setGdB] = useState<number>(0.0);
  const [gdLr, setGdLr] = useState<number>(0.05);
  const [gdLossHistory, setGdLossHistory] = useState<number[]>([12.5]);
  const gdCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Step 6: CNN Sizing State
  const [cnnW, setCnnW] = useState<number>(32);
  const [cnnF, setCnnF] = useState<number>(5);
  const [cnnP, setCnnP] = useState<number>(1);
  const [cnnS, setCnnS] = useState<number>(2);

  // Toast Helper
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Completion Toggle
  const toggleStepComplete = useCallback((id: StepId) => {
    setCompletedSteps(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(s => s !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(next));
      showToast(exists ? `Step ${id} uncompleted.` : `Step ${id} marked complete! ✅`);
      return next;
    });
  }, [showToast]);

  const resetAllProgress = useCallback(() => {
    setCompletedSteps([]);
    localStorage.removeItem(STORAGE_KEY_COMPLETED);
    setQuizUserAnswers({});
    localStorage.removeItem(STORAGE_KEY_QUIZ_ANSWERS);
    showToast('All progress & quiz answers reset.');
  }, [showToast]);

  // Quiz Module & Question Computations (Calculus experience)
  const currentQuizMod = AI_WEEK1_QUIZ[quizStepKey] || AI_WEEK1_QUIZ.s1;
  const currentQ = currentQuizMod.questions[currentQuestionIdx] || currentQuizMod.questions[0];
  const currentAnswerKey = `${quizStepKey}_${currentQuestionIdx}`;
  const selectedOption = quizUserAnswers[currentAnswerKey];

  const handleSelectQuizOption = (idx: number) => {
    setQuizUserAnswers(prev => ({
      ...prev,
      [currentAnswerKey]: idx
    }));
  };

  const handleNextQuizQuestion = () => {
    if (currentQuestionIdx < currentQuizMod.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleResetCurrentQuiz = () => {
    setQuizUserAnswers(prev => {
      const next = { ...prev };
      currentQuizMod.questions.forEach((_, idx) => {
        delete next[`${quizStepKey}_${idx}`];
      });
      return next;
    });
    setCurrentQuestionIdx(0);
  };

  // Notes persistence
  const handleNotesChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(STORAGE_KEY_NOTES, val);
  };

  // ─────────────────────────────────────────────
  // Canvas: Step 3 Regression Chart
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (activeStep !== 3) return;
    const canvas = regCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width || 500;
    const h = canvas.getBoundingClientRect().height || 240;
    const pad = 40;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    // Grid & Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const maxX = Math.max(7, ...regPoints.map(p => p.x + 1));
    const maxY = Math.max(15, ...regPoints.map(p => Math.max(p.y, p.pred) + 3));

    // Draw Line: Model Prediction
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const px0 = pad + (0 / maxX) * chartW;
    const py0 = h - pad - (0 / maxY) * chartH;
    const pxMax = pad + (maxX / maxX) * chartW;
    const pyMax = h - pad - ((2.0 * maxX) / maxY) * chartH;
    ctx.moveTo(px0, py0);
    ctx.lineTo(pxMax, pyMax);
    ctx.stroke();

    // Draw Points & Residual Lines
    regPoints.forEach(p => {
      const px = pad + (p.x / maxX) * chartW;
      const py = h - pad - (p.y / maxY) * chartH;
      const predY = h - pad - (p.pred / maxY) * chartH;

      // Residual dashed line
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(px, predY);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point circle
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Legend
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('● Ground Truth (y)', pad + 10, pad + 15);
    ctx.fillStyle = '#818cf8';
    ctx.fillText('— Model Line (ŷ)', pad + 130, pad + 15);
  }, [activeStep, regPoints]);

  // ─────────────────────────────────────────────
  // Canvas: Step 4 Activation Chart
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (activeStep !== 4) return;
    const canvas = actCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width || 500;
    const h = canvas.getBoundingClientRect().height || 240;
    const pad = 40;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Center horizontal axis (y=0)
    const zeroY = h - pad - 0.5 * chartH;
    ctx.moveTo(pad, zeroY);
    ctx.lineTo(w - pad, zeroY);
    // Center vertical axis (x=0)
    const zeroX = pad + 0.5 * chartW;
    ctx.moveTo(zeroX, pad);
    ctx.lineTo(zeroX, h - pad);
    ctx.stroke();

    const minZ = -5;
    const maxZ = 5;

    // Helper to plot curve
    const plotCurve = (fn: (z: number) => number, color: string, minY = -1.2, maxY = 1.5) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let first = true;
      for (let z = minZ; z <= maxZ; z += 0.1) {
        const val = fn(z);
        const px = pad + ((z - minZ) / (maxZ - minZ)) * chartW;
        const py = h - pad - ((val - minY) / (maxY - minY)) * chartH;
        if (first) {
          ctx.moveTo(px, py);
          first = false;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    };

    // Plot curves: Sigmoid (sky), ReLU (emerald), Tanh (amber)
    plotCurve(z => 1 / (1 + Math.exp(-z)), '#38bdf8'); // Sigmoid
    plotCurve(z => Math.max(0, z * 0.2), '#10b981');   // Scaled ReLU for viewing
    plotCurve(z => Math.tanh(z), '#f59e0b');           // Tanh

    // Vertical indicator for current z
    const curX = pad + ((actZ - minZ) / (maxZ - minZ)) * chartW;
    ctx.strokeStyle = '#c084fc';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(curX, pad);
    ctx.lineTo(curX, h - pad);
    ctx.stroke();
    ctx.setLineDash([]);

    // Legend
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Sigmoid', pad + 10, pad + 15);
    ctx.fillStyle = '#10b981';
    ctx.fillText('ReLU', pad + 80, pad + 15);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Tanh', pad + 130, pad + 15);
    ctx.fillStyle = '#c084fc';
    ctx.fillText(`Current z = ${actZ.toFixed(1)}`, pad + 180, pad + 15);
  }, [activeStep, actZ]);

  // ─────────────────────────────────────────────
  // Canvas: Step 5 Gradient Descent Chart
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (activeStep !== 5) return;
    const canvas = gdCanvasRef.current;
    const ctx = setupCanvas(canvas);
    if (!canvas || !ctx) return;

    const w = canvas.getBoundingClientRect().width || 500;
    const h = canvas.getBoundingClientRect().height || 220;
    const pad = 40;
    const chartW = w - pad * 2;
    const chartH = h - pad * 2;

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.stroke();

    const maxLoss = Math.max(14, ...gdLossHistory);
    const n = Math.max(5, gdLossHistory.length);

    // Draw Loss curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    gdLossHistory.forEach((loss, idx) => {
      const px = pad + (idx / (n - 1)) * chartW;
      const py = h - pad - (loss / maxLoss) * chartH;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Fill under curve
    const lastX = pad + ((gdLossHistory.length - 1) / (n - 1)) * chartW;
    ctx.lineTo(lastX, h - pad);
    ctx.lineTo(pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.fill();

    // Data points
    gdLossHistory.forEach((loss, idx) => {
      const px = pad + (idx / (n - 1)) * chartW;
      const py = h - pad - (loss / maxLoss) * chartH;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Text info
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Loss Convergence Curve (Step ${gdLossHistory.length - 1}): ${gdLossHistory[gdLossHistory.length - 1].toFixed(3)}`, pad + 10, pad + 15);
  }, [activeStep, gdLossHistory]);

  // Step 5 Actions
  const runGDStep = () => {
    const targetW = 2.0;
    const targetB = 1.0;
    const gradW = -2 * (targetW - gdW);
    const gradB = -2 * (targetB - gdB);
    const nextW = gdW - gdLr * gradW;
    const nextB = gdB - gdLr * gradB;
    const nextLoss = Math.pow(targetW - nextW, 2) + Math.pow(targetB - nextB, 2);
    setGdW(nextW);
    setGdB(nextB);
    setGdLossHistory(prev => [...prev, nextLoss]);
  };

  const resetGD = () => {
    setGdW(0.0);
    setGdB(0.0);
    setGdLossHistory([12.5]);
  };

  // Step 2 Calculations
  const cmTotal = cmTP + cmFP + cmFN + cmTN;
  const cmAcc = cmTotal ? (cmTP + cmTN) / cmTotal : 0;
  const cmPrec = (cmTP + cmFP) ? cmTP / (cmTP + cmFP) : 0;
  const cmRec = (cmTP + cmFN) ? cmTP / (cmTP + cmFN) : 0;
  const cmF1 = (cmPrec + cmRec) ? (2 * cmPrec * cmRec) / (cmPrec + cmRec) : 0;

  // Step 3 Calculations
  const regMetrics = useMemo(() => {
    let sumSq = 0;
    let sumAbs = 0;
    let sumY = 0;
    regPoints.forEach(p => {
      const err = p.y - p.pred;
      sumSq += err * err;
      sumAbs += Math.abs(err);
      sumY += p.y;
    });
    const n = regPoints.length;
    const mse = sumSq / n;
    const rmse = Math.sqrt(mse);
    const mae = sumAbs / n;
    const meanY = sumY / n;
    let ssTot = 0;
    regPoints.forEach(p => {
      ssTot += Math.pow(p.y - meanY, 2);
    });
    const r2 = 1 - (sumSq / (ssTot || 1));
    return { mse, rmse, mae, r2 };
  }, [regPoints]);

  // Step 4 Values
  const sigmoidVal = 1 / (1 + Math.exp(-actZ));
  const reluVal = Math.max(0, actZ);
  const tanhVal = Math.tanh(actZ);

  // Step 6 CNN Calculations
  const cnnStep1 = cnnW - cnnF + 2 * cnnP;
  const cnnStep2 = cnnStep1 / (cnnS || 1);
  const cnnO = Math.max(0, Math.floor(cnnStep2) + 1);

  // Glossary Filtered
  const filteredGlossary = useMemo(() => {
    const q = glossarySearch.toLowerCase();
    return MASTER_GLOSSARY.filter(item =>
      item.term.toLowerCase().includes(q) ||
      item.def.toLowerCase().includes(q) ||
      item.step.toLowerCase().includes(q)
    );
  }, [glossarySearch]);

  const activeStepMeta = STEPS.find(s => s.id === activeStep) || STEPS[0];
  const isCurrentStepDone = completedSteps.includes(activeStep);
  const pct = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <div className="space-y-6 text-slate-100 animate-fade-in">

      {/* Floating Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="bg-gradient-to-tr from-indigo-600 via-brand-600 to-sky-500 p-3 rounded-2xl shadow-lg shadow-indigo-500/20 text-white shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                Week 01 Curriculum
              </span>
              <span className="text-xs text-slate-400">Core Machine Learning</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              AI &amp; ML Core Masterclass
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Steps 1–6: Comprehensive Foundations, Interactive Simulators &amp; Concept Reference
            </p>
          </div>
        </div>

        {/* Global Progress Bar & Reset */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <div className="flex items-center space-x-3 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
            <span className="text-xs font-semibold text-slate-300">Progress:</span>
            <div className="w-24 sm:w-28 bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-indigo-400">{pct}%</span>
          </div>

          <button
            onClick={resetAllProgress}
            title="Reset All Progress"
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-950/30 border border-slate-800 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">

        {/* Mobile Horizontal Navigation (strictly lg:hidden) */}
        <div className="lg:hidden w-full space-y-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {STEPS.map(s => {
              const Icon = s.icon;
              const isActive = activeMainTab === 'study' && activeStep === s.id;
              const isDone = completedSteps.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStep(s.id);
                    setActiveMainTab('study');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>Step {s.id}</span>
                  {isDone && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Mobile Study Hub Extras */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            <button
              onClick={() => setShowFlashcards(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition text-xs text-slate-300 shrink-0 font-medium active:scale-95"
            >
              <CreditCard className="w-3.5 h-3.5 text-sky-400" /> Flashcards
            </button>
            <button
              onClick={() => {
                setActiveMainTab('quiz');
                setQuizStepKey(`s${activeStep}`);
                setCurrentQuestionIdx(0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition text-xs shrink-0 font-medium active:scale-95 border ${
                activeMainTab === 'quiz'
                  ? 'bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-sm ring-1 ring-amber-400/40'
                  : 'bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" /> Quiz Test
            </button>
            <button
              onClick={() => setShowGlossary(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition text-xs text-slate-300 shrink-0 font-medium active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Glossary
            </button>
            <button
              onClick={() => setShowNotes(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition text-xs font-medium shrink-0 border active:scale-95 ${
                showNotes
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-300'
              }`}
            >
              <StickyNote className="w-3.5 h-3.5 text-amber-400" /> Notes
            </button>
          </div>
        </div>

        {/* Desktop Sidebar (hidden on mobile, lg:block on desktop) */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-3 sticky top-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Curriculum Steps
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                {completedSteps.length}/6 Done
              </span>
            </div>

            <nav className="space-y-1.5">
              {STEPS.map(s => {
                const Icon = s.icon;
                const isActive = activeMainTab === 'study' && activeStep === s.id;
                const isDone = completedSteps.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveStep(s.id);
                      setActiveMainTab('study');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">Step {s.id}: {s.title}</span>
                    </div>
                    {isDone && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Interactive Study Tools Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md space-y-3">
            <div className="flex items-center space-x-2 text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="font-bold text-xs uppercase tracking-wider">Interactive Study Tools</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setShowFlashcards(true)}
                className="flex items-center justify-center space-x-1.5 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition text-slate-200 font-medium"
              >
                <CreditCard className="w-3.5 h-3.5 text-sky-400" />
                <span>Flashcards</span>
              </button>
              <button
                onClick={() => {
                  setActiveMainTab('quiz');
                  setQuizStepKey(`s${activeStep}`);
                  setCurrentQuestionIdx(0);
                }}
                className={`flex items-center justify-center space-x-1.5 p-2 rounded-xl transition font-medium border ${
                  activeMainTab === 'quiz'
                    ? 'bg-amber-500/25 border-amber-500/60 text-amber-200 shadow-sm ring-1 ring-amber-400/40'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-transparent'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Quiz Test</span>
              </button>
            </div>
            <button
              onClick={() => setShowGlossary(true)}
              className="w-full flex items-center justify-between p-2.5 bg-sky-600/30 hover:bg-sky-600/50 rounded-xl transition text-xs font-medium text-sky-200 border border-sky-500/30"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Global Term Glossary
              </span>
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowNotes(prev => !prev)}
              className="w-full flex items-center justify-between p-2.5 bg-indigo-600/40 hover:bg-indigo-600/60 rounded-xl transition text-xs font-medium text-indigo-200 border border-indigo-500/30"
            >
              <span className="flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-amber-400" /> Notes &amp; Scratchpad
              </span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showNotes ? 'rotate-90' : ''}`} />
            </button>
          </div>

          {/* Quick Reading Mode Info Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/80 to-indigo-950/40 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Quick Reading Mode</span>
              <span className="font-bold text-indigo-400">Active</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full transition-all duration-300"
                style={{ width: `${(activeStep / 6) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>Step {activeStep} of 6</span>
              <span className="text-slate-300 font-medium">{activeStepMeta.badge}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 space-y-6 w-full">

          {/* Notes Collapsible Panel */}
          {showNotes && (
            <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-5 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-amber-300 flex items-center gap-2 text-sm">
                  <StickyNote className="w-4 h-4 text-amber-400" /> Personal Notes &amp; Summary Scratchpad
                </h4>
                <span className="text-xs text-slate-400 font-mono">Auto-saved to browser</span>
              </div>
              <textarea
                value={notes}
                onChange={e => handleNotesChange(e.target.value)}
                className="w-full h-28 p-3 text-xs rounded-xl border border-slate-700 bg-slate-950 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                placeholder="Write key takeaways, mathematical observations, and formula notes here..."
              />
            </div>
          )}

          {/* Active Step Content (Study Mode) */}
          {activeMainTab === 'study' && (
            <div className="space-y-6">
              {/* Active Step Header Banner with Prev/Next Navigation */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                  Step {activeStep}
                </span>
                <span className="text-xs text-slate-400">{activeStepMeta.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {activeStepMeta.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {activeStepMeta.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 flex-wrap">
              <button
                onClick={() => toggleStepComplete(activeStep)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition active:scale-95 ${
                  isCurrentStepDone
                    ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isCurrentStepDone ? 'Completed ✅' : 'Mark Complete'}</span>
              </button>

              <button
                disabled={activeStep <= 1}
                onClick={() => {
                  if (activeStep > 1) setActiveStep((activeStep - 1) as StepId);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  activeStep > 1
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-95'
                    : 'bg-slate-900/50 text-slate-600 border-slate-800/50 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <button
                disabled={activeStep >= 6}
                onClick={() => {
                  if (activeStep < 6) setActiveStep((activeStep + 1) as StepId);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                  activeStep < 6
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-95'
                    : 'bg-slate-900/50 text-slate-600 border-slate-800/50 cursor-not-allowed'
                }`}
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ==================== STEP 1 CONTENT ==================== */}
          {activeStep === 1 && (
            <div className="space-y-6">
              {/* Essential Concept Definitions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Book className="w-4 h-4 text-indigo-400" /> Essential Concept Definitions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
                    <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                      <BrainCircuit className="w-4 h-4" />
                      <span>Artificial Intelligence (AI)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Definition:</strong> The broad field of computer science focused on creating systems capable of executing tasks that typically require human intelligence, such as visual perception, decision-making, natural language translation, and problem solving.
                    </p>
                    <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                      <strong>Key Distinction:</strong> Includes both symbolic/rule-based systems (expert systems with explicit hardcoded logic) and statistical data-driven learning models.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                      <Cpu className="w-4 h-4" />
                      <span>Machine Learning (ML)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Definition:</strong> A specialized branch of AI wherein algorithms automatically analyze data, recognize complex underlying patterns, and improve their decision-making accuracy over time without being explicitly programmed with manual rules.
                    </p>
                    <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                      <strong>Paradigm Shift:</strong> Traditional Programming: <MathText text="$\text{Data} + \text{Rules} \rightarrow \text{Answers}$" />. Machine Learning: <MathText text="$\text{Data} + \text{Answers} \rightarrow \text{Model Rules}$" />.
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm">
                    <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                      <Layers className="w-4 h-4" />
                      <span>Deep Learning (DL)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Definition:</strong> A subset of ML utilizing multi-layered Artificial Neural Networks (ANNs) to automatically extract hierarchical representations from raw unstructured data (such as images, video, audio, and text).
                    </p>
                    <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                      <strong>Key Advantage:</strong> Eliminates manual feature engineering by learning low-level (edges), mid-level (shapes), and high-level (object parts) features end-to-end.
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Paradigms Reference */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-sky-400 flex items-center gap-2">
                  <GitCompare className="w-4 h-4" /> Supervised vs Unsupervised vs Reinforcement Learning
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-sky-300 text-sm">Supervised Learning</div>
                    <p className="text-slate-300">
                      <strong>Definition:</strong> Models trained on a dataset containing input features (<MathText text="$X$" />) paired with explicit target labels (<MathText text="$y$" />). The objective is to learn a mapping function <MathText text="$f(X) \approx y$" />.
                    </p>
                    <div className="text-slate-400 space-y-1 text-[11px]">
                      <div>• <strong>Classification:</strong> Predicting discrete categorical labels (e.g. Spam vs Not Spam, Tumor vs Benign).</div>
                      <div>• <strong>Regression:</strong> Predicting continuous numerical outputs (e.g. House Price, Temperature).</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-300 text-sm">Unsupervised Learning</div>
                    <p className="text-slate-300">
                      <strong>Definition:</strong> Models given input data (<MathText text="$X$" />) without target labels (<MathText text="$y$" />). The objective is to independently discover natural groupings, hidden structures, or dimensionality reductions.
                    </p>
                    <div className="text-slate-400 space-y-1 text-[11px]">
                      <div>• <strong>Clustering:</strong> Grouping similar data points (<MathText text="$K$" />-Means, DBSCAN).</div>
                      <div>• <strong>Dimensionality Reduction:</strong> Compressing feature spaces (PCA, t-SNE).</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 text-sm">Reinforcement Learning</div>
                    <p className="text-slate-300">
                      <strong>Definition:</strong> An autonomous agent learns optimal behavior through trial-and-error interactions with a dynamic environment to maximize total cumulative reward.
                    </p>
                    <div className="text-slate-400 space-y-1 text-[11px]">
                      <div>• <strong>Key Elements:</strong> Agent, State (<MathText text="$S$" />), Action (<MathText text="$A$" />), Reward (<MathText text="$R$" />), Environment.</div>
                      <div>• <strong>Applications:</strong> Game AI (AlphaGo, Chess), Autonomous Driving, Robotics.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dataset Partitioning & Generalization Concepts */}
              <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Split className="w-4 h-4 text-indigo-400" /> Dataset Partitioning &amp; Generalization Concepts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-indigo-400 block">Training Set</span>
                    <p className="text-slate-400 text-[11px]">
                      The subset of data used directly to optimize model weights and learn relationships (60% – 80% of total data).
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-400 block">Validation Set</span>
                    <p className="text-slate-400 text-[11px]">
                      The subset used during training to tune hyperparameters and prevent overfitting (10% – 20%).
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-purple-400 block">Test Set</span>
                    <p className="text-slate-400 text-[11px]">
                      An unseen dataset reserved exclusively for final unbiased evaluation of model performance (10% – 20%).
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400 block">Generalization</span>
                    <p className="text-slate-400 text-[11px]">
                      The ultimate goal: A model's ability to make accurate predictions on new, previously unseen data samples.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Paradigm Sorting Game */}
              <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl border border-slate-800 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> Interactive Check: Test Your Understanding
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Score: {paradigmScore}/{paradigmIdx}
                  </span>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-3">
                  <p className="font-medium text-slate-200">
                    Scenario: &ldquo;{PARADIGM_QUESTIONS[paradigmIdx % PARADIGM_QUESTIONS.length].q}&rdquo;
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      'Supervised (Regression)',
                      'Supervised (Classification)',
                      'Unsupervised (Clustering)',
                      'Reinforcement Learning'
                    ].map(choice => (
                      <button
                        key={choice}
                        onClick={() => {
                          const currentQ = PARADIGM_QUESTIONS[paradigmIdx % PARADIGM_QUESTIONS.length];
                          if (choice === currentQ.answer) {
                            setParadigmScore(s => s + 1);
                            showToast('Correct Paradigm! 🎉');
                          } else {
                            showToast(`Incorrect! Answer was: ${currentQ.answer}`);
                          }
                          setParadigmIdx(i => i + 1);
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-medium border border-slate-700 active:scale-95 transition"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 2 CONTENT ==================== */}
          {activeStep === 2 && (
            <div className="space-y-6">
              {/* Key Classification Definitions Grid */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" /> Classification Terms &amp; Definitions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 bg-slate-900 border border-emerald-900/50 rounded-xl space-y-1">
                    <span className="font-bold text-emerald-400">True Positive (TP)</span>
                    <p className="text-slate-300 text-[11px]">
                      <strong>Definition:</strong> Cases where the ground truth is positive and the model correctly predicted positive (e.g. Sick patient correctly flagged as sick).
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-900 border border-amber-900/50 rounded-xl space-y-1">
                    <span className="font-bold text-amber-400">False Negative (FN)</span>
                    <p className="text-slate-300 text-[11px]">
                      <strong>Definition:</strong> Type II Error. Cases where the actual class is positive, but the model incorrectly predicted negative (e.g. Sick patient missed and marked healthy).
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-900 border border-rose-900/50 rounded-xl space-y-1">
                    <span className="font-bold text-rose-400">False Positive (FP)</span>
                    <p className="text-slate-300 text-[11px]">
                      <strong>Definition:</strong> Type I Error. Cases where the actual class is negative, but the model falsely predicted positive (e.g. Healthy patient misdiagnosed with disease).
                    </p>
                  </div>
                  <div className="p-3.5 bg-slate-900 border border-sky-900/50 rounded-xl space-y-1">
                    <span className="font-bold text-sky-400">True Negative (TN)</span>
                    <p className="text-slate-300 text-[11px]">
                      <strong>Definition:</strong> Cases where the ground truth is negative and the model correctly predicted negative (e.g. Healthy patient correctly flagged healthy).
                    </p>
                  </div>
                </div>
              </div>

              {/* Formula Definitions Table */}
              <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="font-sans font-bold text-sky-400 text-sm">
                  Classification Performance Formulas &amp; Meanings
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-sky-300 font-bold block">
                      <MathText text="$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{Total}}$" />
                    </span>
                    <p className="font-sans text-[11px] text-slate-400">
                      Proportion of all correct predictions. Can be highly misleading on imbalanced datasets!
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-emerald-300 font-bold block">
                      <MathText text="$\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}$" />
                    </span>
                    <p className="font-sans text-[11px] text-slate-400">
                      Positive Predictive Value. Out of all positive predictions, how many were actually correct?
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-amber-300 font-bold block">
                      <MathText text="$\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}$" />
                    </span>
                    <p className="font-sans text-[11px] text-slate-400">
                      True Positive Rate (Sensitivity). Out of all actual positive cases, how many did the model catch?
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-purple-300 font-bold block">
                      <MathText text="$\text{F1} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$" />
                    </span>
                    <p className="font-sans text-[11px] text-slate-400">
                      Harmonic mean balancing Precision and Recall into a single metric for imbalanced data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confusion Matrix Interactive Calculator */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                    <Grid className="w-4 h-4" /> Interactive Confusion Matrix &amp; Metrics Simulator
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-400">Presets:</span>
                    <button
                      onClick={() => { setCmTP(45); setCmFP(10); setCmFN(5); setCmTN(140); }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-slate-200 font-medium"
                    >
                      Balanced
                    </button>
                    <button
                      onClick={() => { setCmTP(90); setCmFP(50); setCmFN(10); setCmTN(850); }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] text-slate-200 font-medium"
                    >
                      Imbalanced (Spam)
                    </button>
                    <button
                      onClick={() => { setCmTP(20); setCmFP(5); setCmFN(80); setCmTN(500); }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-[11px] font-medium text-amber-300"
                    >
                      High FN (Medical Risk)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2x2 Matrix Input Grid */}
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide text-center">
                      Actual vs Predicted Matrix
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 text-center space-y-1">
                        <span className="text-emerald-300 text-[10px] block font-bold">True Positive (TP)</span>
                        <input
                          type="number"
                          value={cmTP}
                          min={0}
                          onChange={e => setCmTP(Number(e.target.value) || 0)}
                          className="w-full bg-emerald-900/50 text-center font-bold text-white text-lg rounded-lg border border-emerald-700 p-1"
                        />
                        <span className="text-[10px] text-slate-400 block">Correctly identified positive</span>
                      </div>
                      <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-800 text-center space-y-1">
                        <span className="text-amber-300 text-[10px] block font-bold">False Negative (FN)</span>
                        <input
                          type="number"
                          value={cmFN}
                          min={0}
                          onChange={e => setCmFN(Number(e.target.value) || 0)}
                          className="w-full bg-amber-900/50 text-center font-bold text-white text-lg rounded-lg border border-amber-700 p-1"
                        />
                        <span className="text-[10px] text-slate-400 block">Type II Error (Missed)</span>
                      </div>
                      <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-800 text-center space-y-1">
                        <span className="text-rose-300 text-[10px] block font-bold">False Positive (FP)</span>
                        <input
                          type="number"
                          value={cmFP}
                          min={0}
                          onChange={e => setCmFP(Number(e.target.value) || 0)}
                          className="w-full bg-rose-900/50 text-center font-bold text-white text-lg rounded-lg border border-rose-700 p-1"
                        />
                        <span className="text-[10px] text-slate-400 block">Type I Error (False Alarm)</span>
                      </div>
                      <div className="bg-sky-950/60 p-3 rounded-xl border border-sky-800 text-center space-y-1">
                        <span className="text-sky-300 text-[10px] block font-bold">True Negative (TN)</span>
                        <input
                          type="number"
                          value={cmTN}
                          min={0}
                          onChange={e => setCmTN(Number(e.target.value) || 0)}
                          className="w-full bg-sky-900/50 text-center font-bold text-white text-lg rounded-lg border border-sky-700 p-1"
                        />
                        <span className="text-[10px] text-slate-400 block">Correctly identified negative</span>
                      </div>
                    </div>
                  </div>

                  {/* Calculated Metrics Dashboard */}
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide text-center">
                      Calculated Metrics
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Accuracy</span>
                          <span className="text-sky-400 font-bold">{(cmAcc * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-sky-500 h-full rounded-full transition-all" style={{ width: `${cmAcc * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans"><MathText text="$\frac{\text{TP}+\text{TN}}{\text{Total}}$" /></p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Precision</span>
                          <span className="text-emerald-400 font-bold">{(cmPrec * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${cmPrec * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans"><MathText text="$\frac{\text{TP}}{\text{TP}+\text{FP}}$ (Quality)" /></p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>Recall</span>
                          <span className="text-amber-400 font-bold">{(cmRec * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${cmRec * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans"><MathText text="$\frac{\text{TP}}{\text{TP}+\text{FN}}$ (Coverage)" /></p>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between text-[11px] text-slate-400">
                          <span>F1-Score</span>
                          <span className="text-purple-400 font-bold">{cmF1.toFixed(3)}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: `${cmF1 * 100}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-500 font-sans">Harmonic Mean</p>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                      {cmFN > cmTP * 2 ? (
                        <span>⚠️ <strong className="text-amber-400">High False Negative Rate:</strong> Recall is low ({(cmRec * 100).toFixed(1)}%). Dangerous for medical diagnoses or critical security alerts.</span>
                      ) : cmFP > cmTP * 2 ? (
                        <span>⚠️ <strong className="text-rose-400">High False Positive Rate:</strong> Precision is low ({(cmPrec * 100).toFixed(1)}%). Causes user fatigue in spam filters or false alarms.</span>
                      ) : (
                        <span>✅ Balanced metrics. F1-Score ({cmF1.toFixed(3)}) reflects harmonic equilibrium.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 3 CONTENT ==================== */}
          {activeStep === 3 && (
            <div className="space-y-6">
              {/* 4 Formula Cards with In-depth Definitions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-sky-400 uppercase">1. Mean Squared Error (MSE)</h4>
                  <div className="font-mono text-slate-200 text-sm">
                    <MathText text="$\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> Calculates the average of squared differences (residuals) between predicted values (<MathText text="$\hat{y}_i$" />) and ground truth targets (<MathText text="$y_i$" />).
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Key Characteristic:</strong> Heavy penalty on large outliers due to the squaring operation.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400 uppercase">2. Root Mean Squared Error (RMSE)</h4>
                  <div className="font-mono text-slate-200 text-sm">
                    <MathText text="$\text{RMSE} = \sqrt{\text{MSE}}$" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> The square root of MSE, returning the error metric back to the original units of the target variable.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Key Characteristic:</strong> Easily interpretable in real-world business units (e.g. dollars, meters, degrees).
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-amber-400 uppercase">3. Mean Absolute Error (MAE)</h4>
                  <div className="font-mono text-slate-200 text-sm">
                    <MathText text="$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> The average of absolute magnitude differences between predictions and actual values without regard to error direction.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Key Characteristic:</strong> Treats all errors linearly; highly robust against extreme dataset outliers.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-purple-400 uppercase">4. Coefficient of Determination (<MathText text="$R^2$" />)</h4>
                  <div className="font-mono text-slate-200 text-sm">
                    <MathText text="$R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}}$" />
                  </div>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> Measures the proportion of variance in the target variable (<MathText text="$y$" />) that is predictable from the input features (<MathText text="$X$" />).
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    <strong>Interpretation:</strong> 1.0 = Perfect Fit, 0.0 = Equivalent to Predicting Mean Baseline.
                  </p>
                </div>
              </div>

              {/* Residual Definition Banner */}
              <div className="p-4 bg-slate-900 border border-sky-800/60 rounded-xl text-xs space-y-2">
                <span className="font-bold text-sky-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-sky-400" /> Definition: Residual (<MathText text="$e_i$" />)
                </span>
                <p className="text-slate-300">
                  A <strong>residual</strong> is the vertical distance/difference between an observed actual value (<MathText text="$y_i$" />) and the model's predicted value (<MathText text="$\hat{y}_i$" />): <MathText text="$e_i = y_i - \hat{y}_i$" />. Analyzing residual scatter plots helps identify non-linear trends or unequal variance (heteroscedasticity).
                </p>
              </div>

              {/* Interactive Residual Scatter & Metric Playground */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-sky-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Interactive Residual &amp; Outlier Error Simulator
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setRegPoints(prev => [...prev, { x: 6, y: 25.0, pred: 12.0 }]);
                        showToast('Injected large outlier error! (x=6, y=25)');
                      }}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition"
                    >
                      Inject Large Outlier Error
                    </button>
                    <button
                      onClick={() => {
                        setRegPoints([
                          { x: 1, y: 2.2, pred: 2.0 },
                          { x: 2, y: 3.9, pred: 4.0 },
                          { x: 3, y: 6.1, pred: 6.0 },
                          { x: 4, y: 8.2, pred: 8.0 },
                          { x: 5, y: 9.8, pred: 10.0 }
                        ]);
                        showToast('Reset data points.');
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                    >
                      Reset Data
                    </button>
                  </div>
                </div>

                <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative">
                  <canvas ref={regCanvasRef} className="w-full h-full block" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">MSE</span>
                    <span className="text-sky-400 text-base font-bold">{regMetrics.mse.toFixed(2)}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">RMSE</span>
                    <span className="text-emerald-400 text-base font-bold">{regMetrics.rmse.toFixed(2)}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">MAE</span>
                    <span className="text-amber-400 text-base font-bold">{regMetrics.mae.toFixed(2)}</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">R² Score</span>
                    <span className="text-purple-400 text-base font-bold">{regMetrics.r2.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 4 CONTENT ==================== */}
          {activeStep === 4 && (
            <div className="space-y-6">
              {/* Activation Definition Card */}
              <div className="p-4 bg-slate-900 border border-purple-900/60 rounded-xl text-xs space-y-2">
                <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" /> What is an Activation Function?
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Definition:</strong> A mathematical function applied to the weighted sum of inputs (<MathText text="$z = \mathbf{w}^T \mathbf{x} + b$" />) at each artificial neuron. Activation functions introduce <strong>non-linearity</strong> into neural networks, enabling them to learn complex non-linear decision boundaries and solve arbitrary mathematical approximations (Universal Approximation Theorem).
                </p>
              </div>

              {/* Interactive Activation Curve Plotter */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-purple-400 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Interactive Activation Curves &amp; Value Evaluator
                  </h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <label className="text-slate-400">Input <MathText text="$z$" /> value:</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={actZ}
                      onChange={e => setActZ(parseFloat(e.target.value))}
                      className="w-32 accent-purple-500"
                    />
                    <span className="font-mono font-bold text-purple-300 w-10 text-right">{actZ.toFixed(1)}</span>
                  </div>
                </div>

                <div className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <canvas ref={actCanvasRef} className="w-full h-full block" />
                </div>

                {/* Formula & Evaluated Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-sky-400 font-bold">1. Sigmoid <MathText text="$\sigma(z)$" /></div>
                    <div className="text-[11px] text-slate-400"><MathText text="$\frac{1}{1 + e^{-z}}$" /></div>
                    <p className="font-sans text-[10px] text-slate-400">Squashes into (0, 1). Ideal for binary probabilities.</p>
                    <div className="text-white text-sm font-bold pt-1">
                      f(z) = <span className="text-sky-400">{sigmoidVal.toFixed(3)}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold">2. ReLU</div>
                    <div className="text-[11px] text-slate-400"><MathText text="$\max(0, z)$" /></div>
                    <p className="font-sans text-[10px] text-slate-400">Rectified Linear Unit. Default choice for hidden layers.</p>
                    <div className="text-white text-sm font-bold pt-1">
                      f(z) = <span className="text-emerald-400">{reluVal.toFixed(3)}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-amber-400 font-bold">3. Tanh</div>
                    <div className="text-[11px] text-slate-400"><MathText text="$\frac{e^z - e^{-z}}{e^z + e^{-z}}$" /></div>
                    <p className="font-sans text-[10px] text-slate-400">Hyperbolic Tangent. Zero-centered range (-1, 1).</p>
                    <div className="text-white text-sm font-bold pt-1">
                      f(z) = <span className="text-amber-400">{tanhVal.toFixed(3)}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-purple-400 font-bold">4. Softmax</div>
                    <div className="text-[11px] text-slate-400"><MathText text="$\frac{e^{z_i}}{\sum e^{z_j}}$" /></div>
                    <p className="font-sans text-[10px] text-slate-400">Normalizes vector logits into multiclass probability sum of 1.0.</p>
                    <div className="text-white text-xs pt-1">Multiclass prob sum = 1.0</div>
                  </div>
                </div>
              </div>

              {/* Gradient Phenomenon Definitions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-rose-400 text-sm">Vanishing Gradient Problem</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Definition:</strong> Occurs during backpropagation in deep neural networks when activation derivatives (like Sigmoid or Tanh) are small (&lt;1). As gradients are multiplied backward across many layers (Chain Rule), they exponentially diminish toward zero, stalling weight updates in early layers.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 text-sm">Exploding Gradient Problem</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong>Definition:</strong> The opposite of vanishing gradients; occurs when large weights or unscaled gradients multiply across many layers, causing error gradients to grow exponentially large (&gt;1), leading to unstable training or <code className="font-mono text-xs text-amber-300">NaN</code> model weights.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 5 CONTENT ==================== */}
          {activeStep === 5 && (
            <div className="space-y-6">
              {/* Gradient Descent Core Definitions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-400 text-sm">Gradient (<MathText text="$\nabla L$" />)</span>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> A vector of partial derivatives of the Loss Function with respect to all model parameters (<MathText text="$W, b$" />). Points in the direction of steepest loss increase.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-sky-400 text-sm">Learning Rate (<MathText text="$\alpha$" />)</span>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> A hyperparameter controlling the step size taken in the negative gradient direction toward the loss minimum during each optimization step.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-emerald-400 text-sm">Convergence</span>
                  <p className="text-slate-300">
                    <strong>Definition:</strong> The state reached when the optimization algorithm stabilizes and parameter updates no longer significantly decrease the loss value.
                  </p>
                </div>
              </div>

              {/* Math Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-sans">Linear Model Hypothesis &amp; MSE Loss</h4>
                  <p className="text-slate-300"><MathText text="$\hat{y} = W \cdot x + b$" /></p>
                  <p className="text-slate-300"><MathText text="$L(W, b) = \frac{1}{N} \sum_{i=1}^N (y_i - (W \cdot x_i + b))^2$" /></p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white font-sans">Gradient Step Parameter Updates</h4>
                  <p className="text-slate-300"><MathText text="$W_{\text{new}} = W_{\text{old}} - \alpha \cdot \frac{\partial L}{\partial W}$" /></p>
                  <p className="text-slate-300"><MathText text="$b_{\text{new}} = b_{\text{old}} - \alpha \cdot \frac{\partial L}{\partial b}$" /></p>
                </div>
              </div>

              {/* Interactive Gradient Descent Playground */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> Gradient Descent Optimizer Simulator
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={runGDStep}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5" /> Run 1 Gradient Step
                    </button>
                    <button
                      onClick={resetGD}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
                    >
                      Reset Parameters
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Learning Rate (<MathText text="$\alpha$" />): <span className="text-amber-400 font-bold font-mono">{gdLr.toFixed(2)}</span>
                    </label>
                    <input
                      type="range"
                      min="0.01"
                      max="0.3"
                      step="0.01"
                      value={gdLr}
                      onChange={e => setGdLr(parseFloat(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Current Weight (<MathText text="$W$" />): <span className="text-sky-400 font-bold font-mono">{gdW.toFixed(2)}</span>
                    </label>
                    <span className="text-[10px] text-slate-500 block">Target <MathText text="$W^* \approx 2.0$" /></span>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">
                      Current Bias (<MathText text="$b$" />): <span className="text-emerald-400 font-bold font-mono">{gdB.toFixed(2)}</span>
                    </label>
                    <span className="text-[10px] text-slate-500 block">Target <MathText text="$b^* \approx 1.0$" /></span>
                  </div>
                </div>

                <div className="w-full h-60 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                  <canvas ref={gdCanvasRef} className="w-full h-full block" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 6 CONTENT ==================== */}
          {activeStep === 6 && (
            <div className="space-y-6">
              {/* Neural & CNN Definitions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-rose-400 uppercase flex items-center gap-1.5 text-sm">
                    <Cpu className="w-4 h-4" /> 1. The Perceptron / Artificial Neuron
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Definition:</strong> The fundamental building block of neural networks. Receives multiple input signals (<MathText text="$x_i$" />), multiplies each by a weight (<MathText text="$w_i$" />), adds a scalar bias (<MathText text="$b$" />), and evaluates the total sum through an activation function <MathText text="$a = f(\sum w_i x_i + b)$" />.
                  </p>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-rose-400 uppercase flex items-center gap-1.5 text-sm">
                    <Layers className="w-4 h-4" /> 2. Convolutional Layer (CNN)
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>Definition:</strong> A specialized deep learning layer designed for grid data (like images) that slides small learnable 2D matrices (kernels/filters) across inputs to detect local spatial patterns (edges, textures).
                  </p>
                </div>
              </div>

              {/* CNN Spatial Parameters Glossary */}
              <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-rose-400 text-sm flex items-center gap-2 font-mono">
                  <Book className="w-4 h-4" /> CNN Spatial Parameter Definitions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-300 block">Input Size (<MathText text="$W$" />)</span>
                    <p className="text-slate-400 text-[11px]">
                      The spatial height/width dimension (in pixels) of the incoming input image or feature matrix.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-emerald-300 block">Filter Size (<MathText text="$F$" />)</span>
                    <p className="text-slate-400 text-[11px]">
                      The receptive spatial width/height of the convolution kernel matrix (typically 3×3 or 5×5).
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-300 block">Padding (<MathText text="$P$" />)</span>
                    <p className="text-slate-400 text-[11px]">
                      Extra zero-valued border pixels added around the input grid to prevent spatial size degradation at edges.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-purple-300 block">Stride (<MathText text="$S$" />)</span>
                    <p className="text-slate-400 text-[11px]">
                      The step size (number of pixels) the filter shifts across the input matrix during convolution.
                    </p>
                  </div>
                </div>
              </div>

              {/* CNN Spatial Dimension Formula Card */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                <h4 className="font-bold text-white uppercase font-mono text-sm">CNN Output Dimension Formula</h4>
                <div className="font-mono text-base text-indigo-400">
                  <MathText text="$$O = \left\lfloor \frac{W - F + 2P}{S} \right\rfloor + 1$$" />
                </div>
                <p className="text-slate-400 text-[11px]">
                  Where <MathText text="$O$" /> is the output spatial feature map width/height, and <MathText text="$\lfloor \cdot \rfloor$" /> is the floor function rounding down to the nearest integer.
                </p>
              </div>

              {/* Interactive CNN Sizing Calculator */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Interactive CNN Feature Map Output Calculator
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Live Step-by-Step Evaluation</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Input Size (<MathText text="$W$" />):</label>
                    <input
                      type="number"
                      value={cnnW}
                      min={1}
                      onChange={e => setCnnW(Number(e.target.value) || 1)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Filter Size (<MathText text="$F$" />):</label>
                    <input
                      type="number"
                      value={cnnF}
                      min={1}
                      onChange={e => setCnnF(Number(e.target.value) || 1)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Padding (<MathText text="$P$" />):</label>
                    <input
                      type="number"
                      value={cnnP}
                      min={0}
                      onChange={e => setCnnP(Number(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Stride (<MathText text="$S$" />):</label>
                    <input
                      type="number"
                      value={cnnS}
                      min={1}
                      onChange={e => setCnnS(Number(e.target.value) || 1)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-white text-center font-bold"
                    />
                  </div>
                </div>

                {/* Calculation Steps Output Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="text-slate-400">
                      Step 1: <MathText text={`$W - F + 2P = ${cnnW} - ${cnnF} + 2(${cnnP}) =$`} /> <span className="text-sky-400 font-bold">{cnnStep1}</span>
                    </div>
                    <div className="text-slate-400">
                      Step 2: Divide by Stride <MathText text={`$S = ${cnnS}$:`} /> <span className="text-amber-400 font-bold">{cnnStep2.toFixed(1)}</span>
                    </div>
                    <div className="text-slate-400">
                      Step 3: Floor <MathText text={`$\\lfloor ${cnnStep2.toFixed(1)} \\rfloor + 1 =$`} /> <span className="text-emerald-400 font-bold">{cnnO}</span>
                    </div>
                  </div>
                  <div className="text-center bg-slate-900 px-6 py-3 rounded-xl border border-slate-800 min-w-[160px]">
                    <span className="text-slate-400 text-[10px] block uppercase tracking-wider">Output Dimension</span>
                    <div className="text-2xl font-extrabold text-rose-400 mt-0.5">{cnnO} × {cnnO}</div>
                  </div>
                </div>

                {/* Visual Feature Grid Preview */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-semibold">Visual Output Feature Grid Matrix:</div>
                  <div className="flex flex-wrap gap-1 max-w-xs mx-auto p-2 bg-slate-950 rounded-lg border border-slate-800 justify-center">
                    {Array.from({ length: Math.min(cnnO * cnnO, 36) }).map((_, idx) => (
                      <div key={idx} className="w-3.5 h-3.5 bg-rose-500/80 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

              {/* Step Knowledge Check Banner to Jump to Quiz */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">Step {activeStep} Concept Knowledge Check</h4>
                    <p className="text-xs text-slate-400">Ready to test your mastery of these concepts? Take the step-specific interactive quiz.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveMainTab('quiz');
                    setQuizStepKey(`s${activeStep}`);
                    setCurrentQuestionIdx(0);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition shrink-0"
                >
                  <span>Take Step {activeStep} Quiz</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== QUIZ ASSESSMENT HUB (Calculus Experience) ==================== */}
          {activeMainTab === 'quiz' && (
            <div className="space-y-6 animate-fade-in">
              {/* Quiz Navigation & Return Banner */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                      Practice Quizzes
                    </span>
                    <span className="text-xs text-slate-400">Steps 1–6 Comprehensive Assessment</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
                    <span>AI &amp; ML Concept Practice Quizzes</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                      Step {currentQuizMod.stepNumber} Active
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Interactive multi-choice evaluation with detailed LaTeX step-by-step solutions and derivations.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto flex-wrap">
                  <button
                    onClick={() => setShowSolutionsGuide(prev => !prev)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                  >
                    <ListChecks className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showSolutionsGuide ? 'Hide Solutions' : 'Solution Guide'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveMainTab('study');
                      setActiveStep(currentQuizMod.stepNumber as StepId);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Study Guide</span>
                  </button>
                </div>
              </div>

              {/* Step Selector Header Grid (Matches Calculus Module Switcher) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {Object.keys(AI_WEEK1_QUIZ).map((sKey) => {
                  const mod = AI_WEEK1_QUIZ[sKey];
                  const isSelected = quizStepKey === sKey;
                  const answeredCount = mod.questions.filter((_, idx) => quizUserAnswers[`${sKey}_${idx}`] !== undefined).length;
                  const isComplete = answeredCount === mod.questions.length;
                  return (
                    <button
                      key={sKey}
                      onClick={() => {
                        setQuizStepKey(sKey);
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
                          Step {mod.stepNumber}
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

              {/* Quiz Card Area (Exact Calculus Component Experience) */}
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
                    ></div>
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
                        onClick={() => handleSelectQuizOption(idx)}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between group ${btnStyle}`}
                      >
                        <div className="pr-4 leading-relaxed">
                          <MathText text={optText} />
                        </div>
                        <div className="shrink-0 ml-2">
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
                  <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl text-sm space-y-2">
                    <div className={`flex items-center gap-2 font-bold ${selectedOption === currentQ.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
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
                    <div className="text-slate-300 leading-relaxed">
                      <MathText text={currentQ.explanation} />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={handlePrevQuizQuestion}
                    disabled={currentQuestionIdx === 0}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white transition text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 border border-slate-700/60"
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={handleResetCurrentQuiz}
                      className="px-4 py-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition text-xs font-medium flex items-center gap-1.5 border border-slate-700/60"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Step Quiz
                    </button>
                    <button
                      onClick={handleNextQuizQuestion}
                      disabled={currentQuestionIdx === currentQuizMod.questions.length - 1}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white transition text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comprehensive Solution Guide & Derivations (Matching Calculus Section 4) */}
              {showSolutionsGuide && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 mb-1 flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-amber-400" /> Comprehensive Solution Guide &amp; Derivations
                    </h3>
                    <p className="text-xs text-slate-400">
                      Complete step-by-step mathematical solutions for all 12 questions across Steps 1 through 6.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {Object.keys(AI_WEEK1_QUIZ).map((stepKey) => {
                      const mod = AI_WEEK1_QUIZ[stepKey];
                      return (
                        <div key={stepKey} className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5 space-y-4">
                          <h4 className="text-sm font-bold text-indigo-400 border-b border-slate-800 pb-2 flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-indigo-500" /> {mod.title}
                          </h4>
                          <div className="space-y-3">
                            {mod.questions.map((q, idx) => (
                              <div key={q.id} className="space-y-2 text-xs border-b border-slate-900 pb-3 last:border-0">
                                <div className="font-semibold text-slate-200">
                                  <span className="text-indigo-400 mr-1.5 font-bold">Q{idx + 1}:</span>
                                  <MathText text={q.question} />
                                </div>
                                <div className="text-emerald-400 font-mono flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Answer:</span> <MathText text={q.options[q.correct]} />
                                </div>
                                <div className="text-slate-400 bg-slate-900/80 p-3 rounded-lg leading-relaxed border border-slate-800/60">
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
        </main>
      </div>

      {/* ==================== GLOBAL GLOSSARY MODAL ==================== */}
      {showGlossary && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-slate-800 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <BookOpen className="w-5 h-5 text-sky-400" /> Global AI &amp; ML Term Dictionary
              </h3>
              <button
                onClick={() => setShowGlossary(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative flex-shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={glossarySearch}
                onChange={e => setGlossarySearch(e.target.value)}
                placeholder="Search any term (e.g. Recall, Gradient, Softmax, CNN, Residual)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 rounded-xl text-xs border border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-100"
              />
            </div>

            {/* Glossary List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {filteredGlossary.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No matching terms found. Try another keyword search!
                </div>
              ) : (
                filteredGlossary.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">{item.term}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-sky-950 text-sky-400 rounded-full border border-sky-800">
                        {item.step}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{item.def}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== FLASHCARDS MODAL ==================== */}
      {showFlashcards && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white flex items-center gap-2 text-sm">
                <CreditCard className="w-5 h-5 text-sky-400" /> Steps 1–6 Concept Flashcards
              </h3>
              <button
                onClick={() => setShowFlashcards(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              onClick={() => setFcFlipped(prev => !prev)}
              className="h-60 w-full cursor-pointer select-none"
            >
              <div
                className={`relative w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-lg transition-all duration-300 ${
                  fcFlipped
                    ? 'bg-slate-950 border border-slate-700 text-slate-100'
                    : 'bg-gradient-to-br from-indigo-600 to-brand-700 text-white'
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-bold opacity-80">
                  {fcFlipped ? 'Answer & Key Takeaway' : FLASHCARDS[currentFcIndex].category}
                </span>
                <div className="text-sm font-medium text-center leading-relaxed font-mono">
                  {fcFlipped ? FLASHCARDS[currentFcIndex].a : FLASHCARDS[currentFcIndex].q}
                </div>
                <span className="text-xs text-center opacity-70">
                  Click card to {fcFlipped ? 'flip back 🔄' : 'flip answer 🔄'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setFcFlipped(false);
                  setCurrentFcIndex(i => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length);
                }}
                className="px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold hover:bg-slate-800"
              >
                Previous
              </button>
              <span className="text-xs font-bold text-slate-400">
                {currentFcIndex + 1} / {FLASHCARDS.length}
              </span>
              <button
                onClick={() => {
                  setFcFlipped(false);
                  setCurrentFcIndex(i => (i + 1) % FLASHCARDS.length);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
              >
                Next Card
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};
