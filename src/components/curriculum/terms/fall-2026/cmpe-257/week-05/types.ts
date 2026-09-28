import React from 'react';
import {
  Split,
  Maximize2,
  ShieldAlert,
  Sparkles,
  Cpu,
  Layers,
  Sliders,
  Zap
} from 'lucide-react';

export interface ConceptItem {
  title: string;
  badge?: string;
  summary: string;
  bullets: string[];
  formula?: string;
  code?: string;
}

export interface MLWeek5Module {
  id: string;
  stepNumber: number;
  shortTitle: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  readingStatus: 'in_progress' | 'completed' | 'yet_to_complete';
  description: string;
  estimatedTime: string;
  keyQuestions: string[];
  coreTheorems: { name: string; formula: string; explanation: string }[];
  concepts: ConceptItem[];
}

export const ML_WEEK5_MODULES: MLWeek5Module[] = [
  {
    id: 'm1',
    stepNumber: 1,
    shortTitle: 'Hyperplanes & Linear',
    title: 'Hyperplanes and linear classification',
    category: 'Linear Foundations',
    icon: Split,
    readingStatus: 'yet_to_complete',
    estimatedTime: '1.5–2 hours',
    description: 'Understand how a linear classifier uses features, weights, and a bias to separate two classes.',
    keyQuestions: [
      'What is the algebraic definition of a hyperplane in p dimensions?',
      'How does the linear score f(x) = w^T x + b determine class membership?',
      'Why is the linear score not a probability, and what does f(x) = 0 represent?'
    ],
    coreTheorems: [
      {
        name: 'Hyperplane Equation',
        formula: 'w^T x + b = 0',
        explanation: 'Defines a (p - 1)-dimensional flat affine subspace separating p-dimensional feature space into two distinct half-spaces.'
      },
      {
        name: 'Linear Decision Rule',
        formula: '\\hat{y} = \\text{sgn}(w^T x + b)',
        explanation: 'Classifies points into y in {-1, +1} according to the algebraic sign of the linear score.'
      }
    ],
    concepts: [
      {
        title: 'Binary Classification Encoding',
        badge: 'Target Spaces',
        summary: 'Target labels conventionally encoded as y in {-1, +1} rather than {0, 1}.',
        bullets: [
          'Enables concise margin representation: y_i(w^T x_i + b) >= 0 for correct classification.',
          'Arbitrary class assignment convention that must remain consistent across optimization.'
        ],
        formula: 'y \\in \\{-1, +1\\}'
      },
      {
        title: 'Linear Score vs Probability',
        badge: 'Scoring Mechanics',
        summary: 'The linear score is an unbounded real scalar f(x) in (-inf, +inf).',
        bullets: [
          'Positive scores map to class +1, negative scores map to class -1.',
          'A score of exactly zero indicates a point lying directly on the decision boundary.'
        ],
        formula: 'f(x) = \\sum_{j=1}^p w_j x_j + b'
      }
    ]
  },
  {
    id: 'm2',
    stepNumber: 2,
    shortTitle: 'Maximal-Margin',
    title: 'Maximal-margin classifier',
    category: 'Margin Optimization',
    icon: Maximize2,
    readingStatus: 'yet_to_complete',
    estimatedTime: '2–2.5 hours',
    description: 'Understand why SVM chooses the maximum margin, how distance is measured, support vectors, and hard-margin optimization.',
    keyQuestions: [
      'Why is an arbitrary separating hyperplane insufficient for generalization?',
      'How is the perpendicular geometric distance from a point to a hyperplane calculated?',
      'Why is maximizing the margin 2/||w|| equivalent to minimizing (1/2)||w||^2?'
    ],
    coreTheorems: [
      {
        name: 'Point-to-Hyperplane Perpendicular Distance',
        formula: '\\text{dist}(x_0, \\mathcal{H}) = \\frac{|w^T x_0 + b|}{\\|w\\|}',
        explanation: 'Computes true orthogonal Euclidean distance by dividing the absolute algebraic score by the L2 norm of the normal vector w.'
      },
      {
        name: 'Hard-Margin Quadratic Program',
        formula: '\\min_{w, b} \\frac{1}{2}\\|w\\|^2 \\quad \\text{s.t.} \\quad y_i(w^T x_i + b) \\ge 1, \\; \\forall i',
        explanation: 'Minimizes weight magnitude squared to maximize margin width 2/||w|| while constraining all training samples outside the margin band.'
      }
    ],
    concepts: [
      {
        title: 'Support Vectors',
        badge: 'Critical Geometry',
        summary: 'The closest observations to the decision boundary that sit directly on the margin boundaries w^T x + b = +/-1.',
        bullets: [
          'They uniquely dictate the orientation and width of the separating margin.',
          'Moving or deleting non-support vectors leaves the decision boundary completely unchanged.'
        ],
        formula: 'y_i(w^T x_i + b) = 1'
      },
      {
        title: 'Geometric Margin vs Algebraic Score',
        badge: 'Scale Invariance',
        summary: 'Dividing the score by ||w|| eliminates arbitrary scaling of the hyperplane parameters.',
        bullets: [
          'One-sided margin from boundary to support vectors is M = 1 / ||w||.',
          'Full collision-free margin band width spanning both classes is 2 / ||w||.'
        ],
        formula: '\\text{Margin Width} = \\frac{2}{\\|w\\|}'
      }
    ]
  },
  {
    id: 'm3',
    stepNumber: 3,
    shortTitle: 'Soft Margins',
    title: 'Support vector classifier and soft margins',
    category: 'Soft Margins',
    icon: ShieldAlert,
    readingStatus: 'yet_to_complete',
    estimatedTime: '2.5–3 hours',
    description: 'Understand how SVM handles overlapping data by introducing slack variables and balancing margin width against violation costs.',
    keyQuestions: [
      'Why does hard-margin classification fail on real-world datasets with overlap or noise?',
      'How does the slack variable xi_i relate to the signed margin m_i = y_i(w^T x_i + b)?',
      'What is the role of hyperparameter C in trading off margin width (||w||^2 / 2) vs cumulative violations (C sum xi_i)?'
    ],
    coreTheorems: [
      {
        name: 'Soft-Margin Optimization Problem',
        formula: '\\min_{w, b, \\xi} \\frac{1}{2}\\|w\\|^2 + C\\sum_{i=1}^n \\xi_i \\quad \\text{s.t.} \\quad y_i(w^T x_i + b) \\ge 1 - \\xi_i, \\; \\xi_i \\ge 0',
        explanation: 'Balances margin maximization against a linear penalty on slack violations weighted by global hyperparameter C.'
      },
      {
        name: 'Hinge Loss Slack Formulation',
        formula: '\\xi_i = \\max(0, 1 - y_i(w^T x_i + b))',
        explanation: 'Defines the minimal non-negative slack required to satisfy the margin constraint for instance i.'
      }
    ],
    concepts: [
      {
        title: 'Violation Categorization',
        badge: 'Slack Dynamics',
        summary: 'Classification threshold is 0; margin threshold is 1.',
        bullets: [
          'xi_i = 0: Correctly classified and outside or on the margin boundary.',
          '0 < xi_i < 1: Correctly classified, but violates the margin cushion (inside margin band).',
          'xi_i >= 1: Misclassified or situated on the central decision boundary.'
        ],
        formula: 'm_i = y_i f(x_i), \\quad \\xi_i = \\max(0, 1 - m_i)'
      },
      {
        title: 'Regularization Parameter C',
        badge: 'Bias-Variance Balance',
        summary: 'C determines the relative penalty cost per unit of slack violation.',
        bullets: [
          'Small C: Violations are cheap, leading to wider margins, higher tolerance of training errors, and lower variance.',
          'Large C: Violations are expensive, forcing narrower margins, strict fitting of training data, and higher risk of overfitting.'
        ],
        formula: 'J(w, b, \\xi) = \\frac{1}{2}\\|w\\|^2 + C\\sum_{i=1}^n \\xi_i'
      }
    ]
  },
  {
    id: 'm4',
    stepNumber: 4,
    shortTitle: 'Feature Expansion',
    title: 'Feature expansion and nonlinear boundaries',
    category: 'Nonlinear Geometry',
    icon: Sparkles,
    readingStatus: 'yet_to_complete',
    estimatedTime: '1.5–2 hours',
    description: 'Understand how a linear classifier in an expanded feature space produces nonlinear decision boundaries in the original feature space.',
    keyQuestions: [
      'Why do datasets like the XOR pattern fail under standard linear classification?',
      'How does explicit feature mapping phi(x) transform a straight hyperplane into a curved boundary?',
      'Why does explicit polynomial feature expansion suffer from combinatorial explosion C(p+d, d)?'
    ],
    coreTheorems: [
      {
        name: 'Dual-Space Decision Equivalence',
        formula: 'f(\\mathbf{z}) = \\mathbf{w}^T \\mathbf{z} + b = 0 \\iff f(\\mathbf{x}) = \\mathbf{w}^T \\phi(\\mathbf{x}) + b = 0',
        explanation: 'A decision surface that is strictly linear in transformed coordinates z = phi(x) forms an arbitrary curved nonlinear boundary when viewed in original coordinates x.'
      },
      {
        name: 'Combinatorial Expansion Complexity',
        formula: '\\dim(\\phi(\\mathbf{x})) = \\binom{p + d}{d} = \\frac{(p + d)!}{p! \\, d!}',
        explanation: 'The dimensional size of polynomial feature expansion scales combinatorially with input dimensionality p and degree d, necessitating kernel methods.'
      }
    ],
    concepts: [
      {
        title: 'Polynomial Feature Mapping',
        badge: 'Transformation',
        summary: 'Augmenting linear features with squares and cross-products.',
        bullets: [
          'Maps 2D inputs x = [x_1, x_2]^T to 5D space phi(x) = [x_1, x_2, x_1^2, x_2^2, x_1 x_2]^T.',
          'Enables separation of concentric circles, ellipses, and XOR configurations.'
        ],
        formula: '\\phi(x) = [x_1, x_2, x_1^2, x_2^2, x_1 x_2]^T'
      },
      {
        title: 'Linearity in Transformed Coordinates',
        badge: 'Geometric Invariance',
        summary: 'The machine learning model remains strictly linear in the inputs it receives.',
        bullets: [
          'All linear optimization techniques, convex quadratic formulations, and margins apply directly.',
          'Nonlinearity is entirely a property of the coordinate mapping phi, not the classifier algorithm.'
        ],
        formula: 'z_1 + z_2 - 4 = 0 \\iff x_1^2 + x_2^2 = 4'
      }
    ]
  },
  {
    id: 'm5',
    stepNumber: 5,
    shortTitle: 'SVMs & Kernels',
    title: 'SVMs and kernel functions',
    category: 'Kernel Methods',
    icon: Cpu,
    readingStatus: 'yet_to_complete',
    estimatedTime: '3–3.5 hours',
    description: 'Understand how kernel functions calculate high-dimensional inner products directly from original inputs, enabling nonlinear SVMs.',
    keyQuestions: [
      'Why does the Kernel Trick eliminate the need to explicitly build expanded feature spaces?',
      'How do Linear, Polynomial, and RBF (Gaussian) kernels differ in mathematical formulation and boundary flexibility?',
      'How does the dual kernel SVM prediction score f(x) = sum alpha_i y_i K(x_i, x) + b aggregate support vector contributions?'
    ],
    coreTheorems: [
      {
        name: 'The Kernel Trick Identity',
        formula: 'K(\\mathbf{x}_i, \\mathbf{x}_j) = \\phi(\\mathbf{x}_i)^T \\phi(\\mathbf{x}_j)',
        explanation: 'Computes the inner product between high-dimensional feature vectors directly in low-dimensional space via an algebraic shortcut.'
      },
      {
        name: 'Dual Kernel Prediction Form',
        formula: 'f(\\mathbf{x}) = \\sum_{i=1}^n \\alpha_i y_i K(\\mathbf{x}_i, \\mathbf{x}) + b',
        explanation: 'Evaluates test instance x against all support vectors (alpha_i > 0) weighted by dual multipliers and class labels.'
      }
    ],
    concepts: [
      {
        title: 'Radial Basis Function (RBF) Kernel',
        badge: 'Infinite Dimensions',
        summary: 'Decays exponentially with squared Euclidean distance.',
        bullets: [
          'K(x_i, x_j) = exp(-gamma ||x_i - x_j||^2), bounded in [0, 1].',
          'Small gamma produces broad, smooth boundaries; large gamma produces tight, highly localized decision boundaries.'
        ],
        formula: 'K(x_i, x_j) = \\exp(-\\gamma \\|x_i - x_j\\|^2)'
      },
      {
        title: 'Polynomial Kernel Mechanics',
        badge: 'Degree Scaling',
        summary: 'Simulates all monomial and cross-term interactions up to degree d.',
        bullets: [
          'K(x_i, x_j) = (x_i^T x_j + c)^d with trade-off parameter c >= 0.',
          'Provides flexible polynomial separation without combinatorial memory overhead.'
        ],
        formula: 'K(x_i, x_j) = (\\mathbf{x}_i^T \\mathbf{x}_j + c)^d'
      }
    ]
  },
  {
    id: 'm6',
    stepNumber: 6,
    shortTitle: 'Multiclass SVM',
    title: 'Multiclass SVM and confidence',
    category: 'Module 6',
    icon: Layers,
    readingStatus: 'yet_to_complete',
    estimatedTime: '1–1.5 hours',
    description: 'Awaiting course material for Module 6: Multiclass SVM and confidence.',
    keyQuestions: [],
    coreTheorems: [],
    concepts: []
  },
  {
    id: 'm7',
    stepNumber: 7,
    shortTitle: 'Regularization',
    title: 'Regularization and bias–variance',
    category: 'Module 7',
    icon: Sliders,
    readingStatus: 'yet_to_complete',
    estimatedTime: '3.5–4.5 hours',
    description: 'Awaiting course material for Module 7: Regularization and bias–variance.',
    keyQuestions: [],
    coreTheorems: [],
    concepts: []
  },
  {
    id: 'm8',
    stepNumber: 8,
    shortTitle: 'Optimization Methods',
    title: 'Optimization methods',
    category: 'Module 8',
    icon: Zap,
    readingStatus: 'yet_to_complete',
    estimatedTime: '3–4 hours',
    description: 'Awaiting course material for Module 8: Optimization methods.',
    keyQuestions: [],
    coreTheorems: [],
    concepts: []
  }
];
