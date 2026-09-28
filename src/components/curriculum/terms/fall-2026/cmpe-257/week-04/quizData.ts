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
    question: "What is the primary inductive bias (core assumption) of K-Nearest Neighbors?",
    options: [
      "Features are statistically independent given the class label",
      "Similar inputs (instances close in feature space) tend to have similar output values or classes",
      "The true underlying decision boundary is strictly linear",
      "The training data follows a multivariate Gaussian distribution"
    ],
    correct: 1,
    explanation: "KNN assumes local smoothness in feature space: instances that reside close together under the chosen distance metric will have identical or similar target labels."
  },
  {
    moduleId: 'm1',
    question: "In Self-Organizing Maps (SOM), what is the Best Matching Unit (BMU)?",
    options: [
      "The unit with the highest learning rate",
      "The map unit whose internal weight vector has the minimum Euclidean distance to the current input vector",
      "The centroid of the entire topological grid",
      "The unit that has been updated the fewest number of times"
    ],
    correct: 1,
    explanation: "During SOM training, the input vector x is compared against all grid nodes w_j; the node with the closest weight vector (minimum ||x - w_j||) is designated as the BMU and pulled toward x."
  },
  {
    moduleId: 'm1',
    question: "What does Learning Vector Quantization (LVQ) learn during training?",
    options: [
      "A global hyperplane separating classes",
      "A compact set of class-labeled representative prototype vectors in feature space",
      "A multi-layer feedforward weight matrix",
      "A decision tree threshold hierarchy"
    ],
    correct: 1,
    explanation: "LVQ learns a small set of representative prototype vectors with class labels, moving prototypes toward matching training instances and repelling them from mismatched instances."
  },
  {
    moduleId: 'm1',
    question: "What are the four sequential steps in the Case-Based Reasoning (CBR) lifecycle?",
    options: [
      "Sample, Split, Train, Test",
      "Retrieve, Reuse, Revise, and Retain",
      "Forward, Backward, Gradient, Update",
      "Assign, Centroid, Inertia, Stop"
    ],
    correct: 1,
    explanation: "The classic CBR cycle consists of: 1) Retrieve similar past cases, 2) Reuse the previous solution, 3) Revise/adapt the solution to fit the new context, and 4) Retain the newly confirmed solution in the case library."
  },
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
    question: "Why does K-Nearest Neighbors require observations to be represented as numerical feature vectors?",
    options: [
      "Because KNN uses matrix inversion to solve linear equations",
      "Because KNN needs numerical coordinates in feature space to calculate distances and determine neighbor proximity",
      "Because categorical variables cannot be saved in memory",
      "Because trees only split on numerical data"
    ],
    correct: 1,
    explanation: "KNN does not understand semantic meaning directly; it relies exclusively on spatial coordinates to compute geometric distances between data points."
  },
  {
    moduleId: 'm2',
    question: "What fundamental model behavior does the hyperparameter K govern in KNN?",
    options: [
      "The number of feature dimensions to project onto",
      "How many nearby observations contribute their outcomes to each query prediction",
      "The maximum depth of the spatial tree",
      "The gradient descent learning rate"
    ],
    correct: 1,
    explanation: "K determines the size of the local neighborhood. Small K relies on a tiny local sample, whereas large K averages across a wider neighborhood."
  },
  {
    moduleId: 'm2',
    question: "Why does setting a very small K (such as K=1) carry a severe risk of overfitting?",
    options: [
      "The algorithm fails to converge within finite iterations",
      "A single noisy, anomalous, or mislabeled training instance can completely determine the prediction for surrounding points",
      "The decision boundary becomes an inflexible global straight line",
      "The computation time grows exponentially with dataset size"
    ],
    correct: 1,
    explanation: "With K=1, every individual training point carves its own isolated Voronoi polygon. Noise, outliers, and mislabeled points create jagged islands of misclassification."
  },
  {
    moduleId: 'm2',
    question: "Why is feature scaling (standardization or min-max normalization) critical prior to computing Euclidean distances in KNN?",
    options: [
      "It ensures all features have positive non-zero values",
      "Without scaling, features measured in large numerical units (e.g. income in $50,000s) overpower small-unit features (e.g. age in 10s) in Euclidean distance",
      "It converts non-linear decision boundaries into linear hyperplanes",
      "It prevents matrix singularity during covariance estimation"
    ],
    correct: 1,
    explanation: "Because Euclidean distance sums squared coordinate differences, unscaled attributes with large numeric scales dominate the metric, rendering small-scale attributes invisible."
  },
  {
    moduleId: 'm2',
    question: 'How does distance weighting (such as w_i = 1/d_i or Gaussian RBF) modify standard KNN voting and regression?',
    options: [
      'It treats all K neighbors identically regardless of distance',
      'It assigns higher influence to closer neighbors, preventing distant borderline neighbors from overriding nearby evidence',
      'It eliminates the need to specify K',
      'It forces the predicted target to be an integer'
    ],
    correct: 1,
    explanation: 'Weighted KNN weights neighbor contributions inversely proportional to distance (or via a Gaussian decay kernel), allowing closer neighbors to carry greater weight than distant ones.'
  },

  // Module 3: Generative versus discriminative learning
  {
    moduleId: 'm3',
    question: "What does the conditional probability distribution P(y | x) represent in supervised classification?",
    options: [
      "The likelihood of observing feature vector x if class label y is given",
      "The posterior probability of class label y after observing feature vector x",
      "The unconditional frequency of class y across the population",
      "The joint density of x and y occurring simultaneously"
    ],
    correct: 1,
    explanation: "P(y | x) is the posterior probability: the probability of class label y given that input features x have been observed."
  },
  {
    moduleId: 'm3',
    question: "What does the class-conditional probability distribution P(x | y) represent in generative models?",
    options: [
      "The probability of the class label given the observed features",
      "How likely the observed features x are assuming the observation originates from class y (Likelihood)",
      "The marginal evidence of the feature vector P(x)",
      "The correlation between input features"
    ],
    correct: 1,
    explanation: "P(x | y) is the generative likelihood: it measures the probability or density of observing feature vector x under the generative process of class y."
  },
  {
    moduleId: 'm3',
    question: "In Maximum A Posteriori (MAP) classification, why can we determine the predicted class by comparing P(x | y)P(y) without calculating the evidence denominator P(x)?",
    options: [
      "Because P(x) is always equal to 1.0",
      "Because for any fixed query point x, P(x) is an identical positive constant shared across all class posteriors, preserving their relative ranking",
      "Because generative models do not have an evidence term",
      "Because P(x) is eliminated by taking the derivative"
    ],
    correct: 1,
    explanation: "In Bayes' rule P(y | x) = P(x | y)P(y) / P(x), the denominator P(x) is strictly positive and identical for all candidate classes y, so argmax_y P(y | x) = argmax_y P(x | y)P(y)."
  },
  {
    moduleId: 'm3',
    question: "Why is the Naive Bayes classification algorithm described as 'naive'?",
    options: [
      "Because it does not require any training data",
      "Because it makes the radical simplifying assumption that all feature dimensions are mutually conditionally independent given the class label",
      "Because it only works on binary classification problems",
      "Because it assumes all classes have equal prior probabilities"
    ],
    correct: 1,
    explanation: "It is called 'naive' because real-world features (such as adjacent words in text) are rarely truly independent. However, this assumption drastically reduces parameter complexity."
  },
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
    question: "In Gaussian Discriminant Analysis (GDA), what does the mean vector mu_k represent geometrically?",
    options: [
      "The spread of the class along the principal diagonal",
      "The center of mass (centroid) of class k in multidimensional feature space",
      "The decision threshold separating two classes",
      "The prior probability of observing class k"
    ],
    correct: 1,
    explanation: "The mean vector mu_k contains the arithmetic average of each feature for class k, locating the center of the multidimensional Gaussian bell curve in feature space."
  },
  {
    moduleId: 'm4',
    question: "What values appear on the main diagonal of a covariance matrix Sigma?",
    options: [
      "The correlations between distinct features",
      "The individual variances of each feature dimension (sigma_j^2)",
      "The mean coordinates of the training points",
      "The eigenvalues of the projection matrix"
    ],
    correct: 1,
    explanation: "The diagonal entries Sigma_{jj} = Cov(x_j, x_j) = Var(x_j) = sigma_j^2 describe the dispersion or spread along each individual coordinate axis."
  },
  {
    moduleId: 'm4',
    question: "What do the off-diagonal entries Sigma_{jk} (where j != k) in a covariance matrix signify?",
    options: [
      "The individual variances of the features",
      "The pairwise covariances between features j and k, indicating whether they move together positively or negatively",
      "The distance between class centroids",
      "The classification error rate"
    ],
    correct: 1,
    explanation: "The off-diagonal entries represent pairwise covariances Cov(x_j, x_k), describing whether features vary together and tilting the ellipsoidal contours of the multivariate Gaussian."
  },
  {
    moduleId: 'm4',
    question: "When evaluating an unseen query point x in GDA, what two quantities are multiplied to compute the class score?",
    options: [
      "The Euclidean distance and the feature variance",
      "The class-conditional Gaussian likelihood P(x | y) and the baseline class prior P(y)",
      "The mean vector and the inverse determinant",
      "The sigmoid logit and the regularization penalty"
    ],
    correct: 1,
    explanation: "By Bayes' theorem, GDA computes the unnormalized posterior score for each candidate class as the product of the class-conditional Gaussian density P(x | y) and the class prior P(y)."
  },
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
    question: "What does the 'naive' assumption in Naive Bayes mean mathematically?",
    options: [
      "Features are unconditionally independent across the entire dataset",
      "Features are treated as conditionally independent of one another once the class label is known: P(x_1, ..., x_d | y) = prod P(x_j | y)",
      "The class prior distribution must be uniform",
      "All words in a document appear with equal frequency"
    ],
    correct: 1,
    explanation: "The naive assumption asserts that knowing the class label completely decouples the feature attributes, allowing the joint likelihood to factorize into univariate products."
  },
  {
    moduleId: 'm5',
    question: "Why is a single zero probability P(x_j | y) = 0 catastrophic in standard Naive Bayes without smoothing?",
    options: [
      "It causes division by zero when calculating the mean",
      "Because Naive Bayes multiplies feature probabilities together, a single zero forces the entire class product to zero regardless of all other evidence",
      "It makes the covariance matrix non-invertible",
      "It prevents gradient descent from calculating a derivative"
    ],
    correct: 1,
    explanation: "Because the joint likelihood is a product prod P(x_j | y), one unseen word with count 0 causes the entire likelihood product to collapse to zero."
  },
  {
    moduleId: 'm5',
    question: "When is the Bernoulli Naive Bayes model formulation appropriately applied?",
    options: [
      "When features represent continuous physical measurements",
      "When features are binary indicators (0 or 1), recording whether a word or attribute is present or absent",
      "When features represent unbounded integer counts",
      "When the covariance between features is non-zero"
    ],
    correct: 1,
    explanation: "Bernoulli Naive Bayes models each dimension as a binary indicator x_j in {0, 1} using theta_{jy}^{x_j} (1 - theta_{jy})^{1 - x_j}."
  },
  {
    moduleId: 'm5',
    question: "Why is inference in Naive Bayes computed in log-space (log P(y) + sum log P(x_j | y)) rather than raw probability products?",
    options: [
      "Because logarithms convert non-linear boundaries into linear hyperplanes",
      "To prevent floating-point arithmetic underflow when multiplying hundreds of small fractional probabilities (p_j < 1)",
      "Because probabilities must always sum to zero",
      "To eliminate the need for training priors"
    ],
    correct: 1,
    explanation: "Multiplying dozens or hundreds of small probabilities (e.g. 0.01^50) underflows standard floating-point registers to 0. Logarithms transform multiplication into numerically stable addition."
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
    question: "What does the parameter K represent in K-means clustering?",
    options: [
      "The number of features in each observation vector",
      "The number of clusters K-means is asked to create",
      "The maximum number of coordinate descent iterations",
      "The Euclidean distance threshold for outlier pruning"
    ],
    correct: 1,
    explanation: "K represents the predetermined number of clusters requested by the user, each represented by a prototype centroid mu_k."
  },
  {
    moduleId: 'm6',
    question: "How is a cluster centroid updated in the K-means algorithm?",
    options: [
      "By selecting the median observation along each coordinate axis",
      "Each coordinate is averaged over the observations currently assigned to that cluster",
      "By calculating the convex hull vertices",
      "By taking a gradient descent step along the negative loss surface"
    ],
    correct: 1,
    explanation: "In the update step, mu_k is recomputed as the arithmetic mean of all data points currently assigned to cluster k: mu_k = (1 / |C_k|) sum_{i in C_k} x^{(i)}."
  },
  {
    moduleId: 'm6',
    question: "What does the K-means objective function (inertia or distortion) measure?",
    options: [
      "The maximum margin between distinct cluster boundaries",
      "The total sum of squared Euclidean distances from each observation to its assigned cluster centroid",
      "The covariance between independent feature dimensions",
      "The ratio of inter-cluster variance to intra-cluster variance"
    ],
    correct: 1,
    explanation: "The objective function J = sum_i ||x^{(i)} - mu_{c^{(i)}}||^2 measures the within-cluster sum of squares (WCSS), evaluating intra-cluster compactness."
  },
  {
    moduleId: 'm6',
    question: "Why does initialization matter significantly in K-means?",
    options: [
      "Because poor initialization causes the objective function to oscillate indefinitely",
      "Different starting centroids can trap the algorithm in different suboptimal local minima and yield distinct final clusterings",
      "Because centroids cannot be moved once initialized",
      "Because K-means requires all initial centroids to be orthogonal"
    ],
    correct: 1,
    explanation: "Because Lloyd's algorithm converges to a local minimum of non-convex objective J, initial placements strongly dictate which basin of attraction the centroids settle into."
  },
  {
    moduleId: 'm6',
    question: "Which statement accurately describes the convergence guarantee of Lloyd's alternating K-means algorithm?",
    options: [
      "It is guaranteed to converge to the global minimum of within-cluster sum of squares",
      "It strictly decreases or maintains inertia at each step and terminates in finite iterations at a local minimum",
      "It may oscillate indefinitely between clusterings",
      "It only converges if the learning rate is sufficiently small"
    ],
    correct: 1,
    explanation: "Each alternating assignment and update step strictly decreases or keeps constant the inertia J. Since there are finitely many (K^N) partitions, it must converge in finite steps to a local optimum."
  },
  {
    moduleId: 'm6',
    question: "How does K-Means++ improve upon naive uniform random centroid initialization?",
    options: [
      "It places all initial centroids at the origin",
      "It chooses subsequent initial centroids with probability proportional to their squared distance D(x)^2 to the nearest existing centroid",
      "It runs hierarchical agglomerative clustering first",
      "It computes the principal components of the dataset"
    ],
    correct: 1,
    explanation: "K-Means++ spaces initial centroids out across the data distribution, guaranteeing an O(log K) competitive bound against the globally optimal clustering."
  },

  // Module 7: Gaussian Mixture Models and EM
  {
    moduleId: 'm7',
    question: "In the 2-component GMM worked example, why did Component 2 receive almost all responsibility (99.94%) for observation x = 140?",
    options: [
      "Because 140 is much closer to Component 2's mean of 150 (dist = 10) than to Component 1's mean of 100 (dist = 40), making the Gaussian likelihood for Component 2 exponentially larger",
      "Because Component 2 was initialized with a higher mixture weight",
      "Because K-means pre-assigned x = 140 to Component 2",
      "Because the variance of Component 1 was constrained to zero"
    ],
    correct: 0,
    explanation: "Because 140 is only 1 standard deviation from mu_2 = 150, but 4 standard deviations from mu_1 = 100, the exponential decay exp(-4^2/2) = exp(-8) makes Component 1's likelihood virtually zero (0.000553) compared to Component 2 (0.999447)."
  },
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
