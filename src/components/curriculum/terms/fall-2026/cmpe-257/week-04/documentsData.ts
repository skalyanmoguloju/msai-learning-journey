import { CourseDocumentItem } from '../../../../common';

export const ML_WEEK4_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'cmpe257-w4-session4',
    title: 'Session 4: Instance-Based Learning, Generative Classifiers, K-Means & GMM',
    fileUrl: 'documents/cmpe-257/week-04/session4.pdf',
    fileName: 'CMPE257_Session_4.pdf',
    fileSize: '6.9 MB',
    pageCount: 106,
    category: 'Lecture Slides',
    topics: [
      'Instance-Based Learning vs. Eager Learning',
      'K-Nearest Neighbors: Voronoi Tessellations & Distance Metrics',
      'Distance-Weighted KNN Formulation',
      'Generative vs. Discriminative Paradigms (Joint vs. Conditional)',
      'Gaussian Discriminant Analysis (GDA) & Covariance Structures',
      'Naive Bayes Classifier (Gaussian, Multinomial, Bernoulli)',
      'Unsupervised Clustering: K-Means Algorithm & Coordinate Descent',
      'Distortion Function Monotonic Convergence Proof',
      'Expectation-Maximization (EM) Algorithm for GMMs',
      'Jensen’s Inequality & Evidence Lower Bound (ELBO)',
      'Mixtures Beyond Gaussian (Bernoulli, Multinomial/LDA, Poisson, DPMM)'
    ]
  },
  {
    id: 'cmpe257-w4-cs229-em',
    title: 'CS229 Part IX: The EM Algorithm & Variational Inference (Stanford)',
    fileUrl: 'documents/cmpe-257/week-04/cs229-em.pdf',
    fileName: 'CS229_EM_Algorithm.pdf',
    fileSize: '141 KB',
    pageCount: 14,
    category: 'Lecture Notes',
    topics: [
      'Jensen’s Inequality for Convex/Concave Expectations',
      'Latent Variable Estimation & Marginal Likelihood',
      'Derivation of the Evidence Lower Bound (ELBO)',
      'E-Step & M-Step Optimization for Mixture of Gaussians',
      'Monotonic Convergence Proof of the EM Algorithm',
      'Variational Inference & Variational Auto-encoders (VAE)',
      'Reparameterization Trick for Continuous Latent Variables'
    ]
  }
];
