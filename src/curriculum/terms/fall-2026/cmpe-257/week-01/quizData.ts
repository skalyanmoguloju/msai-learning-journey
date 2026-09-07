export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  moduleId: string;
}

export const ML_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    moduleId: 'm1',
    question: "According to Tom Mitchell, how is a computer program said to learn?",
    options: [
      "By being explicitly programmed with thousands of nested if-else rules.",
      "From Experience E with respect to Task T and Performance measure P.",
      "By minimizing training error to exactly zero on large image datasets.",
      "By automatically writing C++ source code using random search."
    ],
    correct: 1,
    explanation: "Tom Mitchell's formal definition specifies that learning occurs if performance at Task T, as measured by P, improves with Experience E."
  },
  {
    moduleId: 'm1',
    question: "Which of the following best describes Unsupervised Learning?",
    options: [
      "Learning from labeled training data to predict class labels.",
      "Discovering hidden structures and patterns in unlabeled data.",
      "An agent learning optimal actions by receiving reward signals.",
      "A model memorizing the training set with zero error."
    ],
    correct: 1,
    explanation: "Unsupervised Learning discovers latent structure such as clusters or low-dimensional representations in data without target labels."
  },
  {
    moduleId: 'm2',
    question: "When computing parameter updates using Normal Equations θ = (X^T X)^(-1) X^T y, what is a potential computational limitation?",
    options: [
      "It requires setting an extremely tuning-sensitive learning rate hyperparameter α.",
      "It only works if target outputs y are discrete category labels.",
      "Matrix inversion (X^T X)^(-1) has a computational complexity of ~O(n^3), making it slow for large numbers of features n.",
      "It requires iterating through 1,000s of epochs before convergence."
    ],
    correct: 2,
    explanation: "Computing the inverse of an (n+1) x (n+1) feature matrix requires O(n^3) time, making BGD or SGD preferable when n is very large."
  },
  {
    moduleId: 'm2',
    question: "What key advantage does Mini-Batch Gradient Descent (MBGD) offer over standard Stochastic Gradient Descent (SGD)?",
    options: [
      "It guarantees finding the global optimum for non-convex loss functions.",
      "It utilizes vectorization to speed up GPU hardware computing while reducing gradient variance.",
      "It completely eliminates the need for data preprocessing and scaling.",
      "It calculates exact analytic matrix derivatives without backpropagation."
    ],
    correct: 1,
    explanation: "MBGD balances SGD's fast updates with vectorized hardware parallelization and lower update variance than single-example updates."
  },
  {
    moduleId: 'm3',
    question: "In k-Means clustering, what does the centroid relocation step compute?",
    options: [
      "The distance between each pair of data points.",
      "The mean position of all points assigned to each cluster.",
      "The maximum variance direction via eigenvector decomposition.",
      "The probability that a point belongs to a Gaussian distribution."
    ],
    correct: 1,
    explanation: "After each assignment step, centroids are moved to the mean of all data points currently assigned to that cluster."
  },
  {
    moduleId: 'm4',
    question: "In the Bellman Q-Learning update, what does the discount factor γ control?",
    options: [
      "The learning rate of gradient descent optimization.",
      "The number of episodes the agent is trained for.",
      "The balance between valuing immediate rewards vs. future expected rewards.",
      "The size of the epsilon-greedy exploration probability."
    ],
    correct: 2,
    explanation: "γ ∈ [0, 1) discounts future rewards — a γ close to 0 makes the agent short-sighted while γ close to 1 makes it value long-term rewards."
  },
  {
    moduleId: 'm5',
    question: "In the Bias-Variance tradeoff, what symptom characterizes Overfitting (High Variance)?",
    options: [
      "Low training error, but high testing/validation error.",
      "High training error, and high testing/validation error.",
      "Low training error, and low testing/validation error.",
      "Inability to fit even simple linear trends in the data."
    ],
    correct: 0,
    explanation: "High Variance models over-memorize training set noise, performing exceptionally well on train data but failing to generalize to unseen test data."
  },
  {
    moduleId: 'm5',
    question: "Which regularization technique generates sparse solutions by driving non-critical feature coefficients exactly to zero?",
    options: [
      "Ridge (L2) regularization",
      "Dropout regularization",
      "Batch normalization",
      "Lasso (L1) regularization"
    ],
    correct: 3,
    explanation: "Lasso (L1) regularization's non-differentiable penalty at zero creates sparsity, effectively performing automatic feature selection."
  }
];

export const CHEATSHEET_FORMULAS = [
  {
    title: 'Linear Regression Hypothesis & Cost',
    formulas: [
      'h_\\theta(x) = \\theta^T x = \\sum_{j=0}^d \\theta_j x_j',
      'J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^m \\left(h_\\theta(x^{(i)}) - y^{(i)}\\right)^2'
    ]
  },
  {
    title: 'Gradient Descent Parameter Update Rule',
    formulas: [
      '\\theta_j := \\theta_j - \\alpha \\frac{\\partial}{\\partial \\theta_j} J(\\theta) = \\theta_j + \\alpha \\frac{1}{m} \\sum_{i=1}^m \\left(y^{(i)} - h_\\theta(x^{(i)})\\right) x_j^{(i)}'
    ]
  },
  {
    title: 'Normal Equation (Analytic Solution)',
    formulas: [
      '\\theta = (X^T X)^{-1} X^T y'
    ]
  },
  {
    title: 'Bias-Variance Decomposition of Error',
    formulas: [
      '\\mathbb{E}\\left[(y - \\hat{f}(x))^2\\right] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2'
    ]
  },
  {
    title: 'Q-Learning Value Update Rule',
    formulas: [
      'Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ R + \\gamma \\max_{a\'} Q(s\', a\') - Q(s, a) \\right]'
    ]
  }
];
