export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  moduleId: string;
}

export const ML_WEEK3_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Module 1: Why decision trees?
  {
    moduleId: 'm1',
    question: "Why are decision trees considered 'white-box' models compared to deep neural networks?",
    options: [
      "Because they use white canvas graphics to visualize outputs.",
      "Because every prediction can be explicitly traced through human-interpretable if-then decision rules.",
      "Because their internal weights are all normalized to 1.",
      "Because they only work on continuous numerical features."
    ],
    correct: 1,
    explanation: "Decision trees partition feature space using straightforward conditional predicates that follow direct, transparent paths from root to leaf, providing instant auditability."
  },
  {
    moduleId: 'm1',
    question: "Why do decision tree splits remain invariant to strictly monotonic feature scaling?",
    options: [
      "Splits rely solely on relative rank order, which monotonic transformations preserve.",
      "Trees convert all continuous variables into standardized z-scores first.",
      "Gradient descent steps automatically adapt to the scale.",
      "Tree split algorithms only examine binary indicators."
    ],
    correct: 0,
    explanation: "Because an axis-aligned split tests 'x_j > s', any strictly monotonic transform f preserves 'f(x_j) > f(s)', keeping the exact same partition of points intact."
  },

  // Module 2: Decision-tree fundamentals
  {
    moduleId: 'm2',
    question: "Why do standard decision tree induction algorithms (like CART and C4.5) use greedy heuristics?",
    options: [
      "Finding the globally optimal decision tree is NP-complete.",
      "Greedy search is guaranteed to always find the global minimum loss.",
      "Trees cannot compute probabilities without greedy choices.",
      "Greedy splitting avoids creating any leaf nodes."
    ],
    correct: 0,
    explanation: "Searching all possible combinations of recursive splits is an intractable NP-complete combinatorial problem. Greedy search optimizes impurity reduction locally at each step."
  },
  {
    moduleId: 'm2',
    question: "What is a major risk of letting a decision tree grow without depth limits or stopping criteria?",
    options: [
      "The tree will underfit the training data.",
      "The tree will memorize noisy sample variations and severely overfit.",
      "The leaf nodes will all have identical predictions.",
      "The algorithm will fail to converge."
    ],
    correct: 1,
    explanation: "An unconstrained tree will continue splitting until every leaf contains only 1 sample, leading to 100% training accuracy but disastrous generalization error (high variance)."
  },

  // Module 3: Classification trees and split criteria
  {
    moduleId: 'm3',
    question: "What is the Gini impurity of a perfectly pure node (where 100% of samples belong to class 1)?",
    options: [
      "1.0",
      "0.5",
      "0.0",
      "-1.0"
    ],
    correct: 2,
    explanation: "For a pure node, p_1 = 1 and all other p_k = 0. Gini = 1 - sum(p_k^2) = 1 - (1^2) = 0."
  },
  {
    moduleId: 'm3',
    question: "Why is Misclassification Error E(p) = 1 - max(p_k) generally avoided for evaluating candidate splits?",
    options: [
      "It is too computationally expensive to compute.",
      "It is piecewise linear and not strictly concave, so it can fail to reward splits that isolate pure subsets.",
      "It requires logarithms which trigger floating-point underflow.",
      "It cannot handle more than two classes."
    ],
    correct: 1,
    explanation: "Misclassification error does not reward progressive class concentration when the majority class fraction does not immediately change, unlike strictly concave metrics like Entropy and Gini."
  },

  // Module 4: Regression trees and CART
  {
    moduleId: 'm4',
    question: "How does a regression tree leaf make a numerical prediction for a test sample?",
    options: [
      "By computing the arithmetic mean of target values in that leaf's partition.",
      "By taking a weighted vote among class categories.",
      "By fitting a full polynomial regression inside the leaf.",
      "By taking the maximum observed training target."
    ],
    correct: 0,
    explanation: "Under squared-error loss, the optimal constant prediction for region R_m is the sample mean of the target values of training points falling into that leaf."
  },
  {
    moduleId: 'm4',
    question: "In Cost-Complexity Pruning R_alpha(T) = R(T) + alpha * |T|, what happens as alpha approaches infinity?",
    options: [
      "The tree grows to maximum possible depth.",
      "The tree is pruned down to just the single root node.",
      "The training error approaches zero.",
      "The number of leaves |T| doubles."
    ],
    correct: 1,
    explanation: "As the penalty alpha increases, larger trees are heavily penalized, collapsing all subtrees until only the root node remains."
  },

  // Module 5: Bagging and random forests
  {
    moduleId: 'm5',
    question: "What fraction of training instances are left out on average in a single bootstrap resample (Out-of-Bag)?",
    options: [
      "Approximately 50%",
      "Approximately 36.8% (1/e)",
      "Approximately 10%",
      "Zero, all samples are always selected."
    ],
    correct: 1,
    explanation: "The probability of not selecting an instance across N draws with replacement is (1 - 1/N)^N, which approaches 1/e ≈ 36.8% as N grows."
  },
  {
    moduleId: 'm5',
    question: "Why does Random Forest randomly restrict feature selection to m < p candidate features at each split?",
    options: [
      "To speed up memory caching only.",
      "To decorrelate individual trees and reduce the ensemble variance floor.",
      "To guarantee that every tree is identical.",
      "To convert decision trees into linear models."
    ],
    correct: 1,
    explanation: "If strong features dominate, standard bagging trees look very similar (high correlation rho). Restricting candidate features forces trees to explore alternative pathways, reducing correlation and slashing ensemble variance."
  },

  // Module 6: Gradient boosting and final comparison
  {
    moduleId: 'm6',
    question: "What is the main fundamental difference between bagging and boosting?",
    options: [
      "Bagging is for regression while boosting is only for classification.",
      "Bagging trains independent trees in parallel to reduce variance; boosting builds sequential trees that correct earlier errors to reduce bias.",
      "Bagging uses neural networks while boosting uses decision trees.",
      "Bagging requires normalized data while boosting requires categorical data."
    ],
    correct: 1,
    explanation: "Bagging combines independent models trained in parallel to reduce variance. Boosting builds sequential models where each tree fits the leftover errors (residuals) of previous models."
  },
  {
    moduleId: 'm6',
    question: "What does an individual tree in a regression boosting ensemble learn?",
    options: [
      "The full final continuous response variable directly.",
      "An incremental correction fitting the current ensemble's residuals (negative gradient).",
      "The probability of the majority class.",
      "The principal components of the feature matrix."
    ],
    correct: 1,
    explanation: "In gradient boosting for regression, each new tree fits the residual errors r_i = y_i - F_{m-1}(x_i), serving as a localized correction."
  },
  {
    moduleId: 'm6',
    question: "How does K-Nearest Neighbors (KNN) predict the class of a new query point?",
    options: [
      "By calculating the optimal hyperplane that separates the classes.",
      "By identifying the K nearest training points in feature space and taking a majority vote.",
      "By computing the arithmetic mean of all training points across the dataset.",
      "By building a sequential decision tree from root to leaf."
    ],
    correct: 1,
    explanation: "KNN computes pairwise Euclidean distances from the query sample to all training instances, selects the K closest neighbors, and assigns the most frequent class (majority vote)."
  },
  {
    moduleId: 'm6',
    question: "What is the curse of dimensionality and why does it degrade KNN performance?",
    options: [
      "Computers cannot store matrices with more than 3 dimensions.",
      "As dimensions increase, space volume expands exponentially, data becomes sparse, and points become roughly equidistant.",
      "High-dimensional models always underfit the training data.",
      "Distance calculations always evaluate to negative values in high dimensions."
    ],
    correct: 1,
    explanation: "In high dimensions, the volume grows exponentially (10^q) and pairwise distances between random points grow as sqrt(q/6) -> inf, making nearest neighbors far away and equidistant."
  },
  {
    moduleId: 'm6',
    question: "What role does the learning rate (shrinkage) nu play in Gradient Boosting?",
    options: [
      "It determines the maximum depth of each individual tree.",
      "It scales down each tree's contribution to prevent overfitting early residuals.",
      "It eliminates the need for calculating residuals.",
      "It forces the ensemble to train in parallel."
    ],
    correct: 1,
    explanation: "Shrinkage nu (typically 0.01 to 0.1) moderates the impact of each tree, trading off training speed for dramatically improved out-of-sample generalization."
  }
];
