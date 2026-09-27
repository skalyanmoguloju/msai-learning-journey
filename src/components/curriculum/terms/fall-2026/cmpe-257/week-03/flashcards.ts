import { UniversalFlashcard } from '../../../../common';

export const ML_WEEK3_FLASHCARDS: UniversalFlashcard[] = [
  {
    id: 'w3-fc-1',
    category: 'Module 1: Why Decision Trees?',
    title: 'Interpretability & Rule Induction',
    frontPrompt: 'Why are decision trees considered white-box models compared to neural networks or linear models?',
    backFormula: '\\text{Path: } (x_1 > s_1) \\land (x_2 \\le s_2) \\implies \\hat{y} = k',
    backExplanation: 'Decision trees partition the input space using explicit if-then rules that trace a direct path from root to leaf, providing instant auditability and explainability.',
    useCase: 'Clinical diagnostics, credit underwriting, and compliance auditing.',
    remark: 'No linear or normality assumptions are required.'
  },
  {
    id: 'w3-fc-2',
    category: 'Module 1: Why Decision Trees?',
    title: 'Monotonic Scale Invariance',
    frontPrompt: 'Why do decision tree splits remain completely unchanged under monotonic transformations (e.g. log, standard scaling)?',
    backFormula: 'x_j > s \\iff f(x_j) > f(s) \\quad (\\text{for strictly monotonic } f)',
    backExplanation: 'Split decisions depend strictly on the rank ordering of samples. Since monotonic scaling preserves order, feature normalization or standardization is unnecessary.',
    useCase: 'Eliminating the need for feature scaling or outlier clipping during preprocessing.',
    remark: 'Unlike kNN, SVM, or gradient descent which are sensitive to scale.'
  },
  {
    id: 'w3-fc-3',
    category: 'Module 2: Fundamentals',
    title: 'Greedy Top-Down Recursive Splitting',
    frontPrompt: 'Why do decision tree induction algorithms (ID3, C4.5, CART) use greedy heuristics instead of global optimization?',
    backFormula: '\\max_{j, s} \\Delta I(D, j, s) = I(D) - \\left( \\frac{|D_L|}{|D|} I(D_L) + \\frac{|D_R|}{|D|} I(D_R) \\right)',
    backExplanation: 'Finding the globally optimal decision tree is NP-complete. Algorithms greedily pick the feature j and threshold s that maximize immediate impurity drop without lookahead.',
    useCase: 'Fast polynomial-time tree training.',
    remark: 'Greedy choices can miss deeper multi-variable XOR-like interactions.'
  },
  {
    id: 'w3-fc-4',
    category: 'Module 3: Classification Trees',
    title: 'Entropy vs. Gini Impurity',
    frontPrompt: 'What is the mathematical difference between Shannon Entropy and Gini Impurity?',
    backFormula: 'H(p) = -\\sum_{k=1}^K p_k \\log_2 p_k, \\quad Gini(p) = 1 - \\sum_{k=1}^K p_k^2',
    backExplanation: 'Both reach 0 for pure nodes and peak at uniform distributions. Gini measures misclassification probability of random paired draws, avoiding costly logarithm computations.',
    useCase: 'CART default split criterion.',
    remark: 'In practice, Gini and Entropy yield identical tree structures 98% of the time.'
  },
  {
    id: 'w3-fc-5',
    category: 'Module 3: Classification Trees',
    title: 'Misclassification Error Failure',
    frontPrompt: 'Why is Misclassification Error E(p) = 1 - max(p_k) not recommended for tree splitting?',
    backFormula: 'E(p) \\text{ is piecewise linear and not strictly concave}',
    backExplanation: 'A split that increases class concentration in child nodes can yield zero gain under misclassification error, failing to reward progressive purification.',
    useCase: 'Understanding why strictly concave metrics (Gini, Entropy) are required.',
    remark: 'Information gain and Gini drop strictly reward concentration.'
  },
  {
    id: 'w3-fc-6',
    category: 'Module 4: Regression Trees & CART',
    title: 'Cost-Complexity Pruning',
    frontPrompt: 'What is the Cost-Complexity Pruning objective and what does alpha control?',
    backFormula: 'R_\\alpha(T) = R(T) + \\alpha |T|',
    backExplanation: 'R(T) is training error (MSE or misclassification rate), |T| is number of leaf nodes, and alpha >= 0 penalizes tree complexity. As alpha increases, smaller subtrees are preferred.',
    useCase: 'Controlling overfitting and selecting optimal tree size via cross-validation.',
    remark: 'Growing full tree T_0 first captures high-order interactions before pruning back.'
  },
  {
    id: 'w3-fc-7',
    category: 'Module 5: Bagging & Random Forests',
    title: 'Ensemble Variance Reduction Formula',
    frontPrompt: 'How does Bagging reduce ensemble variance, and what role does tree correlation rho play?',
    backFormula: '\\text{Var}(\\bar{X}) = \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2',
    backExplanation: 'As number of trees B -> infinity, the second term vanishes. Total variance is bounded below by rho * sigma^2. Decorrelating trees (reducing rho) is required to lower variance further.',
    useCase: 'The foundational motivation for Random Forests.',
    remark: 'Random Forests use random feature subsampling (mtry) specifically to lower rho.'
  },
  {
    id: 'w3-fc-8',
    category: 'Module 5: Bagging & Random Forests',
    title: 'Out-of-Bag (OOB) Error',
    frontPrompt: 'What is Out-Of-Bag (OOB) error and what fraction of training data is left out in bootstrap sampling?',
    backFormula: 'P(\\text{not selected}) = \\left(1 - \\frac{1}{N}\\right)^N \\approx \\frac{1}{e} \\approx 36.8\\%',
    backExplanation: 'Each bootstrap resample with replacement contains ~63.2% unique training samples. The remaining ~36.8% samples serve as a built-in validation test set for each tree.',
    useCase: 'Cross-validation for free without needing a separate held-out validation set.',
    remark: 'Proven asymptotically for large N.'
  },
  {
    id: 'w3-fc-9',
    category: 'Module 6: Gradient Boosting',
    title: 'Gradient Boosting Residual Fitting',
    frontPrompt: 'How does Gradient Boosting sequentially train trees compared to Random Forests?',
    backFormula: 'F_m(x) = F_{m-1}(x) + \\nu \\cdot h_m(x), \\quad r_{im} = -\\left[\\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)}\\right]_{F=F_{m-1}}',
    backExplanation: 'Rather than training independent trees in parallel, each new tree h_m(x) is trained sequentially to predict the negative gradient (pseudo-residuals) of the previous ensemble loss.',
    useCase: 'Tabular machine learning competitions and high-performance predictive modeling.',
    remark: 'Shrinkage nu in (0, 0.1] prevents greedy overfitting of early residuals.'
  },
  {
    id: 'w3-fc-10',
    category: 'Module 6: Gradient Boosting',
    title: 'Model Comparison Matrix',
    frontPrompt: 'When should you choose a Single Decision Tree vs. Random Forest vs. Gradient Boosting?',
    backFormula: '\\text{Interpretability: Tree} > \\text{RF} > \\text{GBDT}; \\quad \\text{Accuracy: GBDT} \\ge \\text{RF} > \\text{Tree}',
    backExplanation: 'Single Tree for human explanation and rapid baseline; Random Forest for plug-and-play robustness without hyperparameter tuning; Gradient Boosting for maximum predictive accuracy on complex tabular data.',
    useCase: 'Architectural selection in industrial machine learning systems.',
    remark: 'Random Forest reduces variance; Boosting reduces both bias and variance.'
  },
  {
    id: 'w3-fc-11',
    category: 'Module 6: KNN & Curse of Dimensionality',
    title: 'K-Nearest Neighbors (KNN) Decision Rules',
    frontPrompt: 'How does K-Nearest Neighbors compute predictions and why is feature scaling critical?',
    backFormula: 'd(x, z) = \\sqrt{\\sum_{j=1}^p (x_j - z_j)^2}, \\quad \\hat{y}_{\\text{class}} = \\text{mode}(y_{N_k(x)}), \\quad \\hat{y}_{\\text{reg}} = \\frac{1}{K}\\sum y_{N_k(x)}',
    backExplanation: 'KNN relies directly on Euclidean distance to query the K closest training points. Unscaled features with large numerical ranges dominate distance calculations, distorting neighbor selection.',
    useCase: 'Instance-based classification and collaborative filtering.',
    remark: 'KNN has zero training time (lazy learner) but high inference cost O(N·p).'
  },
  {
    id: 'w3-fc-12',
    category: 'Module 6: KNN & Curse of Dimensionality',
    title: 'Curse of Dimensionality in Unit Hypercube',
    frontPrompt: 'Why does Euclidean distance break down in high-dimensional spaces as q approaches infinity?',
    backFormula: 'E[D^2] = \\frac{q}{6}, \\quad \\text{Typical Distance } \\approx \\sqrt{\\frac{q}{6}} \\xrightarrow{q \\to \\infty} \\infty',
    backExplanation: 'As dimensions grow, space volume explodes exponentially (10^q) and data becomes hyper-sparse. The distance between any two random points diverges to infinity, making all points roughly equidistant and rendering distance metrics uninformative.',
    useCase: 'Theoretical justification for feature selection, dimensionality reduction (PCA), and tree-based coordinate partitioning.',
    remark: 'Decision trees are immune because they partition one axis at a time, ignoring uninformative dimensions.'
  }
];
