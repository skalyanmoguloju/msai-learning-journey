import { CourseDocumentItem } from '../../../../common';

export const ML_WEEK4_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'cmpe257-w4-session4',
    title: 'Session 4: Instance-Based Learning, Generative Classifiers, K-Means & GMM',
    fileUrl: 'documents/cmpe-257/week-04/session4.pdf',
    fileName: 'CMPE257_Session_4.pdf',
    fileSize: '5.8 MB',
    pageCount: 82,
    category: 'Lecture Slides',
    topics: [
      'Instance-Based Learning vs. Eager Learning',
      'K-Nearest Neighbors: Voronoi Cells & Asymptotic Cover-Hart Bound',
      'Distance Metrics (Minkowski, Mahalanobis) & Feature Normalization',
      'Distance-Weighted KNN (Inverse Distance & Gaussian RBF)',
      'Generative vs. Discriminative Paradigms & Ng-Jordan Convergence Analysis',
      'Gaussian Discriminant Analysis (GDA) & Connection to Logistic Regression',
      'Linear Discriminant Analysis (LDA) vs. Quadratic Discriminant Analysis (QDA)',
      'Naive Bayes Classifier & Laplace Additive Smoothing',
      'Unsupervised Clustering & Lloyd K-Means Coordinate Descent',
      'K-Means++ Smart Probabilistic Seeding',
      'Gaussian Mixture Models (GMM) & Soft Responsibilities',
      'Expectation-Maximization (EM) Algorithm Derivation',
      'Jensen’s Inequality & Evidence Lower Bound (ELBO) Monotonic Ascent'
    ]
  },
  {
    id: 'cmpe257-w4-recitation2',
    title: 'Recitation 2: Generative Classifiers, EM Derivations & Jensen’s Inequality',
    fileUrl: 'documents/cmpe-257/week-04/recitation2.pdf',
    fileName: '10701_Recitation_2.pdf',
    fileSize: '1.4 MB',
    pageCount: 8,
    category: 'Recitation & Exercises',
    topics: [
      'Derivation of Bayes Error Rate for Gaussian Class Conditionals',
      'Algebraic Cancellation of Quadratic Terms in LDA',
      'Derivation of Laplace Smoothing using Dirichlet Prior over Multinomial Likelihood',
      'Proof of Monotonic Inertia Decline in Lloyd K-Means Algorithm',
      'Complete Derivation of GMM Responsibilities and M-step Updates',
      'Proof that D_KL(Q || P) = 0 Maximizes the ELBO in the E-step',
      'Jensen’s Inequality Proof of Non-Decreasing Likelihood in EM'
    ]
  }
];
