import { UniversalFlashcard } from '../../../../common';

export const ML_WEEK4_FLASHCARDS: UniversalFlashcard[] = [
  {
    id: 'w4-fc-1',
    category: 'Module 1: KNN Foundations',
    title: 'Lazy vs. Eager Learning',
    frontPrompt: 'Why is K-Nearest Neighbors (KNN) designated as a "lazy" learner?',
    backFormula: '\\text{Training: } \\mathcal{O}(1), \\quad \\text{Inference: } \\mathcal{O}(N d)',
    backExplanation: 'KNN performs no explicit training phase to learn a parameterized function. It merely stores training instances in memory and defers all computations until query time.',
    useCase: 'Fast streaming data where retraining is prohibitive and dataset size N is moderate.',
    remark: 'Contrast with eager learners (e.g. SVM, Logistic Regression) that spend compute upfront.'
  },
  {
    id: 'w4-fc-2',
    category: 'Module 1: KNN Foundations',
    title: 'Cover-Hart Bound',
    frontPrompt: 'What does the Cover-Hart Theorem prove regarding the asymptotic error rate of 1-NN?',
    backFormula: 'P^* \\le R_{1\\text{-NN}} \\le 2 P^*(1 - P^*) \\le 2 P^*',
    backExplanation: 'As sample size N -> infinity, the probability of error of 1-NN is bounded by at most twice the Bayes optimal error rate P*, capturing at least half the information in the infinite sample.',
    useCase: 'Theoretical guarantee justifying non-parametric instance-based classifiers.',
    remark: 'Proved by Thomas Cover and Peter Hart in 1967.'
  },
  {
    id: 'w4-fc-3',
    category: 'Module 2: Distance Metrics',
    title: 'Feature Standardization',
    frontPrompt: 'Why does unstandardized feature variance distort Euclidean distance in KNN?',
    backFormula: 'd(x, z) = \\sqrt{\\sum_{j=1}^d (x_j - z_j)^2}',
    backExplanation: 'Euclidean distance weights coordinate differences equally. If one feature spans [0, 100,000] and another spans [0, 1], the high-variance feature completely overpowers the distance.',
    useCase: 'Always apply Z-score (x - mu)/sigma or Min-Max scaling prior to distance calculation.',
    remark: 'Failure to scale is one of the most common causes of poor KNN performance.'
  },
  {
    id: 'w4-fc-4',
    category: 'Module 2: Distance Metrics',
    title: 'Mahalanobis Distance',
    frontPrompt: 'What is Mahalanobis distance and when is it preferred over Euclidean distance?',
    backFormula: 'D_M(x, z) = \\sqrt{(x - z)^T \\Sigma^{-1} (x - z)}',
    backExplanation: 'Mahalanobis distance normalizes coordinates by their variance and accounts for feature correlations using the inverse covariance matrix Sigma^{-1}.',
    useCase: 'Ellipsoidal data clusters and correlated multivariate distributions.',
    remark: 'Reduces to standard Euclidean distance when Sigma is the identity matrix I.'
  },
  {
    id: 'w4-fc-5',
    category: 'Module 3: Generative vs. Discriminative',
    title: 'Generative vs. Discriminative',
    frontPrompt: 'What is the defining distinction between Generative and Discriminative classifiers?',
    backFormula: '\\text{Generative: } P(X, Y) = P(X|Y)P(Y), \\quad \\text{Discriminative: } P(Y|X)',
    backExplanation: 'Generative models learn how data in each class was produced and use Bayes theorem to compute posteriors. Discriminative models learn the separating decision boundary directly.',
    useCase: 'Use generative when data is scarce or has missing values; use discriminative for lower asymptotic error on large datasets.',
    remark: 'Formalized by Ng & Jordan (NeurIPS 2001).'
  },
  {
    id: 'w4-fc-6',
    category: 'Module 4: GDA & LDA',
    title: 'LDA Linear Cancellation',
    frontPrompt: 'Why does Linear Discriminant Analysis (LDA) yield linear boundaries while QDA yields quadratic surfaces?',
    backFormula: '\\Sigma_0 = \\Sigma_1 = \\Sigma \\implies x^T \\Sigma^{-1} x \\text{ cancels out}',
    backExplanation: 'When both classes share the identical covariance matrix, the quadratic x^T Sigma^{-1} x terms cancel out in the log-odds ratio, leaving a strictly linear hyperplane w^T x + b = 0.',
    useCase: 'When sample size per class is insufficient to reliably estimate class-specific covariance matrices.',
    remark: 'QDA requires estimating K separate covariance matrices (O(K d^2) parameters).'
  },
  {
    id: 'w4-fc-7',
    category: 'Module 5: Naive Bayes',
    title: 'Naive Conditional Independence',
    frontPrompt: 'What is the core Naive Bayes conditional independence assumption?',
    backFormula: 'P(X_1, \\dots, X_d \\mid Y) = \\prod_{j=1}^d P(X_j \\mid Y)',
    backExplanation: 'Assumes that given class label Y, individual feature dimensions X_j are mutually independent, reducing parameter complexity from O(2^d) to O(Kd).',
    useCase: 'High-dimensional text categorization, spam filtering, and sentiment analysis.',
    remark: 'Often performs surprisingly well even when the independence assumption is violated.'
  },
  {
    id: 'w4-fc-8',
    category: 'Module 5: Naive Bayes',
    title: 'Laplace Additive Smoothing',
    frontPrompt: 'Why is Laplace smoothing necessary in Naive Bayes and how is it formulated?',
    backFormula: '\\hat{\\theta}_{jk} = \\frac{\\text{count}(x_j, y_k) + \\alpha}{\\text{count}(y_k) + \\alpha |V|}',
    backExplanation: 'If an unseen word never occurred in class k during training, P(x_j | y_k) = 0. Multiplying feature likelihoods causes the entire joint posterior to collapse to zero without smoothing.',
    useCase: 'Preventing zero-probability failure on out-of-vocabulary test tokens.',
    remark: 'Setting alpha = 1 corresponds to a uniform Dirichlet prior.'
  },
  {
    id: 'w4-fc-9',
    category: 'Module 6: K-Means Clustering',
    title: 'Lloyd Coordinate Descent',
    frontPrompt: 'How does Lloyd’s algorithm optimize the K-Means clustering inertia J(c, mu)?',
    backFormula: 'J(c, \\mu) = \\sum_{i=1}^N \\|x^{(i)} - \\mu_{c^{(i)}}\\|^2',
    backExplanation: 'Alternates between assigning points to nearest centroids (c_i = argmin ||x_i - mu_k||^2) and updating centroids to cluster means. Strictly decreases inertia until reaching a local optimum.',
    useCase: 'Unsupervised partitioning, vector quantization, and customer segmentation.',
    remark: 'Guaranteed to terminate in finite iterations because the number of partitions K^N is finite.'
  },
  {
    id: 'w4-fc-10',
    category: 'Module 6: K-Means Clustering',
    title: 'K-Means++ Initialization',
    frontPrompt: 'How does K-Means++ select initial centroids and what theoretical bound does it provide?',
    backFormula: 'P(x) = \\frac{D(x)^2}{\\sum_{x\'} D(x\')^2}',
    backExplanation: 'Chooses the first centroid uniformly at random, then chooses subsequent centroids with probability proportional to the squared distance D(x)^2 to the closest existing centroid.',
    useCase: 'Preventing poor local minima and catastrophic cluster collapse.',
    remark: 'Guarantees an O(log K) expected approximation ratio against the global optimum.'
  },
  {
    id: 'w4-fc-11',
    category: 'Module 7: GMM & EM',
    title: 'GMM Responsibilities',
    frontPrompt: 'What are posterior responsibilities gamma_{ik} in Gaussian Mixture Models?',
    backFormula: '\\gamma_{ik} = P(z_i = k \\mid x_i) = \\frac{\\pi_k \\mathcal{N}(x_i \\mid \\mu_k, \\Sigma_k)}{\\sum_{j=1}^K \\pi_j \\mathcal{N}(x_i \\mid \\mu_j, \\Sigma_j)}',
    backExplanation: 'Posterior responsibility gamma_{ik} is the soft probabilistic assignment that Gaussian component k generated observed data point x_i, computed via Bayes theorem in the E-step.',
    useCase: 'Soft clustering and density estimation for overlapping non-spherical distributions.',
    remark: 'M-step updates parameters using gamma_{ik} as sample weights.'
  },
  {
    id: 'w4-fc-12',
    category: 'Module 8: Jensen & ELBO',
    title: 'Jensen’s Inequality & ELBO',
    frontPrompt: 'How does Jensen’s inequality establish the Evidence Lower Bound (ELBO)?',
    backFormula: '\\log P(X) = \\text{ELBO}(Q) + D_{\\text{KL}}(Q(Z) \\parallel P(Z \\mid X)) \\ge \\text{ELBO}(Q)',
    backExplanation: 'Because log is concave, log E_Q[P(X,Z)/Q(Z)] >= E_Q[log P(X,Z)/Q(Z)] = ELBO(Q). Since KL divergence is non-negative, ELBO is a rigorous lower bound that touches log P(X) when Q(Z) = P(Z|X).',
    useCase: 'Guarantees monotonic likelihood ascent in EM and forms the objective for VAEs.',
    remark: 'Proved via Gibbs inequality D_KL >= 0.'
  }
];
