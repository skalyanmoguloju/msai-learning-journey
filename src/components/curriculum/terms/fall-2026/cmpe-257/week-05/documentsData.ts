import { CourseDocumentItem } from '../../../../common';

export const ML_WEEK5_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'cmpe257-w5-session5',
    title: 'Session 5: Support Vector Machines, Margins, Kernels & Optimization',
    fileUrl: 'documents/cmpe-257/week-05/session5.pdf',
    fileName: 'CMPE257_Session_5.pdf',
    fileSize: '6.2 MB',
    pageCount: 94,
    category: 'Lecture Slides',
    topics: [
      'Geometry of Hyperplanes in p Dimensions',
      'Signed Algebraic Distance and Decision Rules',
      'Maximal-Margin Hyperplane & Hard-Margin Quadratic Program',
      'Support Vectors & Invariance to Non-Support Data',
      'Soft-Margin Formulation: Slack Variables & Regularization Parameter C',
      'Hinge Loss & Empirical Risk Minimization',
      'Basis Feature Expansions & Cover’s Theorem on Separability',
      'The Kernel Trick & Dual Representation via Lagrange Multipliers',
      'Mercer’s Condition & Reproducing Kernel Hilbert Spaces (RKHS)',
      'Polynomial, Gaussian RBF, and Sigmoid Kernels',
      'Multiclass Strategies: One-vs-Rest (OvR) and One-vs-One (OvO)',
      'Margin Calibration via Platt Logistic Scaling',
      'L1 (Lasso) vs L2 (Ridge) Regularization Geometry',
      'Structural Risk Minimization & VC Dimension Bounds',
      'Karush-Kuhn-Tucker (KKT) Optimality Conditions',
      'Sequential Minimal Optimization (SMO) Algorithm'
    ]
  },
  {
    id: 'cmpe257-w5-recitation3',
    title: 'Recitation 3: Support Vector Dual Derivation, KKT Conditions & SMO',
    fileUrl: 'documents/cmpe-257/week-05/recitation3.pdf',
    fileName: '10701_Recitation_3.pdf',
    fileSize: '1.6 MB',
    pageCount: 10,
    category: 'Recitation & Exercises',
    topics: [
      'Lagrangian Formulation of Hard-Margin SVM',
      'Derivation of Dual Objective Function W(alpha)',
      'Proof that w = sum alpha_i y_i x_i is a Linear Combination of Support Vectors',
      'KKT Complementary Slackness Conditions for Soft-Margin SVM',
      'Geometric Interpretation of Slack Variable Regimes',
      'Mercer’s Theorem Eigenfunction Decomposition',
      'Infinite-Dimensional Taylor Series Expansion of Gaussian RBF Kernel',
      'Analytic Two-Variable Update Step in Platt’s SMO Algorithm',
      'Subgradient Derivation of Pegasos Stochastic Gradient Descent'
    ]
  }
];
