export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  moduleId: string;
}

export const ML_WEEK4_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Module 1: Instance-based learning and KNN foundations
  {
    moduleId: 'm1',
    question: 'What happens to the bias and variance of a K-Nearest Neighbors classifier as K increases from 1 to N (sample size)?',
    options: [
      'Bias decreases, variance increases',
      'Bias increases, variance decreases',
      'Both bias and variance increase',
      'Both bias and variance decrease'
    ],
    correct: 1,
    explanation: 'Small K fits training data tightly with high variance and low bias. Larger K averages over more neighbors, reducing variance at the cost of increasing structural bias toward the majority class.'
  },
  {
    moduleId: 'm1',
    question: 'According to the Cover-Hart bound, how does the asymptotic error of the 1-NN classifier compare to the Bayes optimal error P* as N -> infinity?',
    options: [
      'It is strictly equal to the Bayes optimal error P*',
      'It is upper-bounded by at most 2 * P*',
      'It approaches zero regardless of noise',
      'It is completely unbounded'
    ],
    correct: 1,
    explanation: 'The Cover-Hart Theorem (1967) proves P* <= R_{1-NN} <= 2 P* (1 - P*) <= 2 P*, meaning 1-NN captures at least half the information of an infinite training set.'
  },

  // Module 2: KNN representation, distance, weighted KNN
  {
    moduleId: 'm2',
    question: 'Why is feature standardization essential before calculating Euclidean distances in KNN?',
    options: [
      'KNN requires all inputs to be strictly positive numbers',
      'Features with large numeric scales overpower distance computations, rendering smaller features negligible',
      'It prevents the covariance matrix from becoming singular',
      'It guarantees that the decision boundary is strictly linear'
    ],
    correct: 1,
    explanation: 'Euclidean distance sums squared coordinate differences. An unscaled feature ranging from 0 to 100,000 completely dominates features ranging from 0 to 1.'
  },
  {
    moduleId: 'm2',
    question: 'How does Gaussian kernel weighting w_i = exp(-d^2 / (2 * sigma^2)) affect KNN voting?',
    options: [
      'It treats all K neighbors identically regardless of distance',
      'It assigns exponentially diminishing weight to distant neighbors, allowing closer neighbors to dominate the vote',
      'It turns KNN into a linear discriminant classifier',
      'It forces K to be equal to 1'
    ],
    correct: 1,
    explanation: 'Gaussian weighting applies a continuous distance decay, ensuring nearby points exert far greater influence than neighbors on the periphery.'
  },

  // Module 3: Generative versus discriminative learning
  {
    moduleId: 'm3',
    question: 'What is the fundamental mathematical difference between generative and discriminative classifiers?',
    options: [
      'Generative models learn P(Y|X) directly, whereas discriminative models learn P(X, Y)',
      'Generative models model joint probability P(X, Y) = P(X|Y)P(Y), while discriminative models model conditional probability P(Y|X) directly',
      'Discriminative models can generate synthetic data while generative models cannot',
      'Generative models only work with discrete features'
    ],
    correct: 1,
    explanation: 'Generative classifiers learn how data in each class was produced (joint distribution P(X, Y)), whereas discriminative classifiers focus solely on drawing the separating decision boundary (P(Y|X)).'
  },
  {
    moduleId: 'm3',
    question: 'What did Ng & Jordan (2002) demonstrate regarding generative vs discriminative sample complexity?',
    options: [
      'Discriminative models always outperform generative models regardless of dataset size',
      'Generative models approach their asymptotic error rate faster with fewer samples (O(log d)), but discriminative models achieve lower asymptotic error on large datasets',
      'Both paradigms converge at identical sample rates O(d^2)',
      'Generative models require exponentially more data than discriminative models'
    ],
    correct: 1,
    explanation: 'Generative models have stronger inductive bias that acts as regularization on small samples, while discriminative models optimize conditional likelihood directly and reach lower asymptotic error as N grows large.'
  },

  // Module 4: Gaussian Discriminant Analysis
  {
    moduleId: 'm4',
    question: 'Under what mathematical condition does Gaussian Discriminant Analysis (GDA) yield a strictly linear decision boundary (LDA)?',
    options: [
      'When all classes have identical mean vectors',
      'When all classes share a common covariance matrix Sigma_0 = Sigma_1 = Sigma',
      'When the feature dimensions are completely independent',
      'When the class priors are equal'
    ],
    correct: 1,
    explanation: 'When Sigma_0 = Sigma_1 = Sigma, the quadratic x^T Sigma^{-1} x terms cancel out in the log posterior ratio, reducing the decision boundary strictly to a linear hyperplane w^T x + b = 0.'
  },
  {
    moduleId: 'm4',
    question: 'How is Linear Discriminant Analysis (LDA) mathematically connected to Logistic Regression?',
    options: [
      'LDA minimizes cross-entropy loss using stochastic gradient descent',
      'The posterior probability P(Y=1|X) in LDA exactly follows the logistic sigmoid function sigma(w^T x + b)',
      'LDA cannot be evaluated probabilistically',
      'Logistic regression requires Gaussian feature distributions'
    ],
    correct: 1,
    explanation: 'Under shared Gaussian class conditionals, the posterior P(Y=1|X) takes the exact form of the logistic sigmoid, with weight vector w = Sigma^{-1} (mu_1 - mu_0).'
  },

  // Module 5: Naive Bayes
  {
    moduleId: 'm5',
    question: 'What is the core Naive Bayes conditional independence assumption?',
    options: [
      'Features are mutually independent of the class label',
      'Features are conditionally independent of each other given the class label: P(X_1, ..., X_d | Y) = prod P(X_j | Y)',
      'The class prior probabilities must all be equal',
      'Features must follow a uniform distribution'
    ],
    correct: 1,
    explanation: 'Naive Bayes assumes that given the class label Y, attributes X_j provide no information about each other, factorizing the joint likelihood into univariate products.'
  },
  {
    moduleId: 'm5',
    question: 'Why is Laplace (additive) smoothing essential in Naive Bayes text classification?',
    options: [
      'To prevent floating point underflow',
      'To prevent an unobserved word from forcing P(x_j | Y) = 0 and wiping out the entire posterior probability product',
      'To speed up training runtime',
      'To diagonalize the covariance matrix'
    ],
    correct: 1,
    explanation: 'Because Naive Bayes multiplies feature likelihoods, a single zero likelihood forces the entire joint product to zero. Adding pseudo-count alpha prevents this collapse.'
  },

  // Module 6: Unsupervised learning and K-means
  {
    moduleId: 'm6',
    question: 'Which statement accurately describes the convergence of Lloyd’s alternating K-Means algorithm?',
    options: [
      'It is guaranteed to converge to the global minimum of within-cluster sum of squares',
      'It strictly decreases or maintains inertia at each step and terminates in finite iterations at a local minimum',
      'It may oscillate indefinitely between clusterings',
      'It only converges if the learning rate is sufficiently small'
    ],
    correct: 1,
    explanation: 'Each alternating assignment and update step strictly decreases or keeps constant the inertia J. Since there are finitely many (K^N) partitions, it must converge in finite steps to a local optimum.'
  },
  {
    moduleId: 'm6',
    question: 'How does K-Means++ improve upon random centroid initialization?',
    options: [
      'It places all initial centroids at the origin',
      'It chooses initial centroids with probability proportional to their squared distance D(x)^2 to the nearest existing centroid',
      'It runs hierarchical clustering first',
      'It computes the principal components of the dataset'
    ],
    correct: 1,
    explanation: 'K-Means++ spaces initial centroids out across the data distribution, guaranteeing an O(log K) competitive bound against the globally optimal clustering.'
  },

  // Module 7: Gaussian Mixture Models and EM
  {
    moduleId: 'm7',
    question: 'In Gaussian Mixture Models, what is the meaning of the posterior responsibility gamma_{ik}?',
    options: [
      'The distance from centroid k to the origin',
      'The posterior probability P(z_i = k | x_i) that Gaussian component k generated data point x_i',
      'The prior mixing weight pi_k',
      'The eigenvalue of covariance matrix Sigma_k'
    ],
    correct: 1,
    explanation: 'Responsibility gamma_{ik} represents the soft probabilistic assignment of point x_i to component k, computed in the E-step using Bayes theorem.'
  },
  {
    moduleId: 'm7',
    question: 'Why is direct Maximum Likelihood estimation intractable for Gaussian Mixture Models without EM?',
    options: [
      'Because Gaussian densities cannot be integrated',
      'Because marginalizing the unobserved latent cluster indicators z forces a sum inside the logarithm: sum_i log(sum_k pi_k N(x_i))',
      'Because covariance matrices cannot be inverted',
      'Because GMMs have no parameters'
    ],
    correct: 1,
    explanation: 'The summation over latent states inside the log prevents taking derivatives that isolate parameters into decoupled closed-form equations.'
  },

  // Module 8: Jensen’s inequality, ELBO, and mixture extensions
  {
    moduleId: 'm8',
    question: 'How does Jensen’s inequality justify the Evidence Lower Bound (ELBO) in the EM algorithm?',
    options: [
      'Because log is a concave function, log(E[T]) >= E[log(T)], ensuring ELBO(Q) <= log P(X)',
      'Because log is convex, log(E[T]) <= E[log(T)]',
      'It guarantees that the variance of the estimator is minimized',
      'It eliminates the need for computing KL divergence'
    ],
    correct: 0,
    explanation: 'By concavity of log, log sum_z Q(z) [P(X,z)/Q(z)] >= sum_z Q(z) log [P(X,z)/Q(z)] = ELBO(Q). The difference between log P(X) and ELBO is exactly the non-negative KL divergence D_KL(Q || P).'
  },
  {
    moduleId: 'm8',
    question: 'Why is the EM algorithm guaranteed to monotonically increase (or maintain) the true marginal log-likelihood log P(X)?',
    options: [
      'The E-step drives D_KL(Q || P) to 0 so ELBO touches log P(X), and the M-step maximizes the ELBO',
      'The loss function is strictly convex',
      'Because Newton-Raphson optimization is used in the M-step',
      'Because latent variables are permanently discarded'
    ],
    correct: 0,
    explanation: 'In the E-step, setting Q(Z) = P(Z|X, theta^{(t)}) makes KL = 0, so ELBO = log P(X). In the M-step, optimizing theta elevates ELBO, pulling the true log-likelihood uphill.'
  }
];
