import React from 'react';
import {
  HelpCircle,
  Binary,
  Compass,
  Layers,
  Cpu,
  BarChart2,
  Activity,
  GitFork
} from 'lucide-react';

export interface ConceptItem {
  title: string;
  badge?: string;
  summary: string;
  bullets: string[];
  formula?: string;
  code?: string;
}

export interface MLWeek4Module {
  id: string;
  stepNumber: number;
  shortTitle: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  readingStatus: 'in_progress' | 'completed' | 'yet_to_complete';
  description: string;
  keyQuestions: string[];
  coreTheorems: { name: string; formula: string; explanation: string }[];
  concepts: ConceptItem[];
}

export const ML_WEEK4_MODULES: MLWeek4Module[] = [
  {
    id: 'm1',
    stepNumber: 1,
    shortTitle: 'KNN Foundations',
    title: 'Instance-based learning and KNN foundations',
    category: 'Instance-Based Learning',
    icon: HelpCircle,
    readingStatus: 'yet_to_complete',
    description: 'Lazy learning vs. eager learning, non-parametric memory-based prediction, inductive bias of local smoothness, decision boundaries, and Voronoi tessellations.',
    keyQuestions: [
      'Why is KNN classified as a lazy (instance-based) learner with zero explicit training time?',
      'How does the choice of K control the bias-variance tradeoff (K=1 vs K=N)?',
      'What are Voronoi cells and how do 1-NN boundaries partition the feature space?'
    ],
    coreTheorems: [
      {
        name: 'Cover-Hart Bound (1-NN Asymptotic Error)',
        formula: 'P^* \\le R_{1\\text{-NN}} \\le 2 P^* (1 - P^*) \\le 2 P^*',
        explanation: 'As N -> infinity, the asymptotic error rate of the 1-nearest neighbor classifier is upper-bounded by at most twice the optimal Bayes error rate.'
      }
    ],
    concepts: [
      {
        title: 'Lazy vs. Eager Learning',
        badge: 'Fundamental',
        summary: 'Eager learners build an explicit parametric model during training. Lazy learners defer all computation until query time.',
        bullets: [
          'Zero training phase: Simply stores training instances in memory O(1) or indexed structures O(N log N).',
          'Expensive inference: Query evaluation requires computing distances to all training points O(Nd).'
        ]
      }
    ]
  },
  {
    id: 'm2',
    stepNumber: 2,
    shortTitle: 'Distance & Weighted KNN',
    title: 'KNN representation, distance, weighted KNN',
    category: 'Distance Metrics & Weighting',
    icon: Binary,
    readingStatus: 'yet_to_complete',
    description: 'Metrics space metrics (Euclidean, Manhattan, Minkowski, Mahalanobis), feature standardization, distance-weighted voting/regression, and efficient spatial indexing (KD-trees, Ball trees).',
    keyQuestions: [
      'Why does unstandardized feature variance distort distance metrics in KNN?',
      'How does distance weighting (inverse-distance or Gaussian kernel) soften the boundary of K-nearest neighbors?',
      'When do spatial trees (KD-tree, Ball tree) break down and revert to O(N) linear scans?'
    ],
    coreTheorems: [
      {
        name: 'Minkowski & Mahalanobis Distances',
        formula: 'D_M(x, z) = \\sqrt{(x - z)^T \\Sigma^{-1} (x - z)}',
        explanation: 'Mahalanobis distance accounts for variance and covariance among features by transforming coordinates with the inverse covariance matrix.'
      }
    ],
    concepts: [
      {
        title: 'Distance Weighting Schemes',
        badge: 'Formulation',
        summary: 'Assign weights to neighbors inversely proportional to distance so closer neighbors exert greater influence on the vote or mean.',
        bullets: [
          'Inverse distance: w_i = 1 / (d(x, x_i) + eps).',
          'Gaussian RBF kernel: w_i = exp(-d(x, x_i)^2 / (2 sigma^2)).'
        ]
      }
    ]
  },
  {
    id: 'm3',
    stepNumber: 3,
    shortTitle: 'Generative vs. Discriminative',
    title: 'Generative versus discriminative learning',
    category: 'Probabilistic Paradigms',
    icon: Compass,
    readingStatus: 'yet_to_complete',
    description: 'Modeling joint probability P(X, Y) vs. conditional probability P(Y | X), Bayes decision rule, asymptotic error rates, and handling missing data.',
    keyQuestions: [
      'What is the fundamental mathematical difference between modeling P(X, Y) and modeling P(Y | X)?',
      'Why can generative models naturally generate synthetic data samples and handle missing features?',
      'Why do discriminative models typically achieve lower asymptotic classification error when modeling assumptions are violated?'
    ],
    coreTheorems: [
      {
        name: 'Bayes Theorem for Classification',
        formula: 'P(Y=k \\mid X=x) = \\frac{P(X=x \\mid Y=k) P(Y=k)}{\\sum_{c} P(X=x \\mid Y=c) P(Y=c)}',
        explanation: 'Posterior probability of class k given observation x derived via generative class likelihood and class prior.'
      }
    ],
    concepts: [
      {
        title: 'Comparison of Paradigms',
        badge: 'Core Concept',
        summary: 'Generative models understand how the data was produced. Discriminative models focus purely on drawing the separating boundary.',
        bullets: [
          'Generative: Gaussian Discriminant Analysis, Naive Bayes, GMM, HMM.',
          'Discriminative: Logistic Regression, SVM, Decision Trees, Neural Networks.'
        ]
      }
    ]
  },
  {
    id: 'm4',
    stepNumber: 4,
    shortTitle: 'Gaussian Discriminant Analysis',
    title: 'Gaussian Discriminant Analysis',
    category: 'Generative Classifiers',
    icon: Layers,
    readingStatus: 'yet_to_complete',
    description: 'Multivariate Gaussian distribution, Linear Discriminant Analysis (LDA with shared covariance), Quadratic Discriminant Analysis (QDA with class-specific covariance), and connection to logistic regression.',
    keyQuestions: [
      'Why does shared covariance between classes yield linear decision boundaries in LDA?',
      'Under what conditions does QDA produce curved (quadratic) decision boundaries?',
      'How does the posterior P(Y=1|X) of GDA exactly match the logistic sigmoid function?'
    ],
    coreTheorems: [
      {
        name: 'LDA Decision Boundary Linearity',
        formula: 'w^T x + b = 0, \\quad w = \\Sigma^{-1} (\\mu_1 - \\mu_0)',
        explanation: 'When both classes share covariance matrix Sigma, the quadratic x^T Sigma^{-1} x terms cancel out, leaving a strictly linear hyperplane.'
      }
    ],
    concepts: [
      {
        title: 'LDA vs QDA',
        badge: 'Comparison',
        summary: 'LDA assumes Sigma_0 = Sigma_1 = Sigma, reducing parameter count to O(K d + d^2). QDA estimates Sigma_k per class, scaling as O(K d^2).',
        bullets: [
          'LDA: Lower variance, linear hyperplanes, robust to small training sample sizes.',
          'QDA: Lower bias, quadratic surfaces, requires sufficient samples per class to invert Sigma_k.'
        ]
      }
    ]
  },
  {
    id: 'm5',
    stepNumber: 5,
    shortTitle: 'Naive Bayes',
    title: 'Naive Bayes',
    category: 'Probabilistic Classifiers',
    icon: Activity,
    readingStatus: 'yet_to_complete',
    description: 'Conditional independence assumption, Bernoulli NB (binary text features), Multinomial NB (word count histograms), Gaussian NB, and Laplace (additive) smoothing.',
    keyQuestions: [
      'What is the Naive Bayes conditional independence assumption and how does it reduce parameter complexity from O(2^d) to O(d)?',
      'Why is Laplace smoothing essential to prevent the zero-probability product trap?',
      'Why does Naive Bayes often perform well in practice despite its independence assumption being heavily violated?'
    ],
    coreTheorems: [
      {
        name: 'Naive Bayes Factorization',
        formula: 'P(X_1, \\dots, X_d \\mid Y=k) = \\prod_{j=1}^d P(X_j \\mid Y=k)',
        explanation: 'Features are assumed mutually conditionally independent given the class label, factorizing the joint likelihood into univariate products.'
      }
    ],
    concepts: [
      {
        title: 'Laplace / Additive Smoothing',
        badge: 'Robustness',
        summary: 'Prevents unseen feature values from zeroing out the entire posterior probability product.',
        bullets: [
          'Smoothing formula: theta_jk = (count(x_j, y_k) + alpha) / (count(y_k) + alpha * |V|).',
          'With alpha = 1 (Laplace), acts as a uniform prior over unseen tokens.'
        ]
      }
    ]
  },
  {
    id: 'm6',
    stepNumber: 6,
    shortTitle: 'K-Means Clustering',
    title: 'Unsupervised learning and K-means',
    category: 'Unsupervised Learning',
    icon: BarChart2,
    readingStatus: 'yet_to_complete',
    description: 'Unsupervised clustering objective, Lloyd algorithm (alternating coordinate descent), inertia distortion function, K-means++ initialization, and elbow / silhouette methods.',
    keyQuestions: [
      'How does K-means formulate clustering as an optimization problem minimizing within-cluster sum of squares (WCSS)?',
      'Why is K-means guaranteed to converge, and why does it converge to a local rather than global optimum?',
      'How does K-means++ probabilistic seeding drastically improve convergence speed and cluster quality?'
    ],
    coreTheorems: [
      {
        name: 'K-Means Objective (Inertia)',
        formula: 'J(c, \\mu) = \\sum_{i=1}^N \\|x^{(i)} - \\mu_{c^{(i)}}\\|^2',
        explanation: 'Coordinate descent alternates between assigning points to nearest centroids c^{(i)} and updating centroid locations mu_k to cluster means.'
      }
    ],
    concepts: [
      {
        title: 'K-Means Alternating Optimization',
        badge: 'Algorithm',
        summary: 'Lloyd algorithm iterates between assignment and update steps, strictly monotonically decreasing inertia at every step.',
        bullets: [
          'Assignment step: c^{(i)} = argmin_k ||x^{(i)} - mu_k||^2.',
          'Update step: mu_k = (1 / |C_k|) sum_{i in C_k} x^{(i)}.'
        ]
      }
    ]
  },
  {
    id: 'm7',
    stepNumber: 7,
    shortTitle: 'GMM and EM Algorithm',
    title: 'Gaussian Mixture Models and EM',
    category: 'Latent Variable Models',
    icon: GitFork,
    readingStatus: 'yet_to_complete',
    description: 'Soft clustering with Gaussian components, latent categorical indicator z, Expectation step (responsibilities gamma_ik), and Maximization step (updating weights, means, and covariance matrices).',
    keyQuestions: [
      'How does GMM generalize K-means from hard spherical assignments to soft ellipsoidal probabilistic clusters?',
      'What are the posterior responsibilities gamma_ik calculated in the E-step?',
      'How does the M-step obtain closed-form updates for pi_k, mu_k, and Sigma_k?'
    ],
    coreTheorems: [
      {
        name: 'GMM Likelihood & Responsibility',
        formula: '\\gamma_{ik} = P(z_i = k \\mid x_i) = \\frac{\\pi_k \\mathcal{N}(x_i \\mid \\mu_k, \\Sigma_k)}{\\sum_{j=1}^K \\pi_j \\mathcal{N}(x_i \\mid \\mu_j, \\Sigma_j)}',
        explanation: 'Posterior probability (responsibility) that Gaussian component k generated data point x_i.'
      }
    ],
    concepts: [
      {
        title: 'Expectation-Maximization (EM)',
        badge: 'General Framework',
        summary: 'Iterative method for finding maximum likelihood estimates in statistical models with latent (unobserved) variables.',
        bullets: [
          'E-step: Compute expected value of log-likelihood with respect to conditional distribution of latent variables z given x.',
          'M-step: Maximize the expected complete-data log-likelihood with respect to parameters.'
        ]
      }
    ]
  },
  {
    id: 'm8',
    stepNumber: 8,
    shortTitle: 'Jensen, ELBO & Mixtures',
    title: 'Jensen’s inequality, ELBO, and mixture extensions',
    category: 'Theoretical Foundations',
    icon: Cpu,
    readingStatus: 'yet_to_complete',
    description: 'Concavity of logarithm, Jensen’s inequality derivation of the Evidence Lower Bound (ELBO), KL divergence gap, monotonic convergence proof of EM, and mixture model extensions.',
    keyQuestions: [
      'How does Jensen’s inequality establish that the ELBO is a rigorous lower bound on the marginal log-likelihood log P(X)?',
      'Why is the difference between log P(X) and ELBO exactly equal to the Kullback-Leibler divergence D_KL(Q(Z) || P(Z|X))?',
      'How does EM guarantee non-decreasing marginal log-likelihood at every iteration (Ascent Theorem)?'
    ],
    coreTheorems: [
      {
        name: 'Evidence Lower Bound (ELBO) Decomposition',
        formula: '\\log P(X) = \\text{ELBO}(Q) + D_{\\text{KL}}(Q(Z) \\parallel P(Z \\mid X))',
        explanation: 'Because KL divergence is non-negative (Gibbs inequality), maximizing ELBO(Q) directly tightens and elevates the log marginal evidence.'
      },
      {
        name: 'Jensen’s Inequality for Concave Functions',
        formula: 'f\\left(\\sum_i w_i t_i\\right) \\ge \\sum_i w_i f(t_i) \\quad \\text{for concave } f = \\log',
        explanation: 'The logarithm of an expectation is greater than or equal to the expectation of the logarithm.'
      }
    ],
    concepts: [
      {
        title: 'Monotonic Convergence of EM',
        badge: 'Convergence Proof',
        summary: 'In the E-step, setting Q(Z) = P(Z|X, theta^{(t)}) makes KL = 0, so ELBO matches log P(X). In the M-step, optimizing theta elevates ELBO, guaranteeing log P(X; theta^{(t+1)}) >= log P(X; theta^{(t)}).',
        bullets: [
          'E-step: Tightens lower bound to touch the true marginal log-likelihood.',
          'M-step: Maximizes the lower bound, pulling the marginal log-likelihood uphill.'
        ]
      }
    ]
  }
];
