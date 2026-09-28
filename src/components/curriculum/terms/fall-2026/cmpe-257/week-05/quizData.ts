export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  moduleId: string;
}

export const ML_WEEK5_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Module 1: Hyperplanes and linear classification
  {
    moduleId: 'm1',
    question: "What is the geometric orientation of the weight vector w relative to the decision boundary hyperplane w^T x + b = 0?",
    options: [
      "Vector w is parallel to the hyperplane",
      "Vector w is the normal vector, strictly orthogonal (perpendicular) to the hyperplane",
      "Vector w points at a 45-degree angle to the coordinate axes",
      "Vector w connects the origin directly to the centroid of class +1"
    ],
    correct: 1,
    explanation: "For any two points x_1, x_2 on the hyperplane, w^T(x_1 - x_2) = 0, proving that w is perpendicular to every vector lying within the hyperplane."
  },
  {
    moduleId: 'm1',
    question: "How is the Euclidean distance from an arbitrary point x to the hyperplane w^T x + b = 0 calculated?",
    options: [
      "|w^T x + b|",
      "|w^T x + b| / ||w||",
      "(w^T x + b)^2 / 2",
      "||x - w||"
    ],
    correct: 1,
    explanation: "The scalar algebraic value w^T x + b must be normalized by the Euclidean norm of the normal vector ||w|| to obtain true perpendicular geometric distance."
  },
  {
    moduleId: 'm1',
    question: "If training data is linearly separable in p dimensions, how many valid separating hyperplanes exist?",
    options: [
      "Exactly one unique hyperplane",
      "Infinitely many separating hyperplanes",
      "Exactly p hyperplanes",
      "No hyperplanes can exist without kernels"
    ],
    correct: 1,
    explanation: "Any dataset that is linearly separable can be separated by an infinite continuum of distinct hyperplanes with varying margins and orientations."
  },
  {
    moduleId: 'm1',
    question: "For a linear classifier with weight vector w = (3, 2), bias b = -10, and input x = (2, 1), what is the linear score f(x) and predicted class?",
    options: [
      "Score = -2, predicted class -1",
      "Score = +2, predicted class +1",
      "Score = 0, on boundary",
      "Score = -6, predicted class -1"
    ],
    correct: 0,
    explanation: "f(x) = w^T x + b = 3(2) + 2(1) - 10 = 6 + 2 - 10 = -2. Because f(x) < 0, the prediction is class -1."
  },
  {
    moduleId: 'm1',
    question: "Given the decision boundary f(x) = x_1 + 2x_2 - 6 = 0, where does the observation point (2, 2) lie?",
    options: [
      "In the positive half-space (class +1)",
      "In the negative half-space (class -1)",
      "Directly on the decision boundary (f(x) = 0)",
      "At the origin"
    ],
    correct: 2,
    explanation: "Evaluating f(2, 2) = 2 + 2(2) - 6 = 2 + 4 - 6 = 0. A score of zero designates that the point lies directly on the separating hyperplane."
  },

  // Module 2: Maximal-margin classifier
  {
    moduleId: 'm2',
    question: "Why is maximizing the geometric margin M = 1 / ||w|| equivalent to minimizing (1/2) ||w||^2 in SVM?",
    options: [
      "Because squaring ||w|| turns the non-convex margin maximization into a strictly convex quadratic programming problem with a unique global minimum",
      "Because derivatives cannot be taken without the factor 1/2",
      "Because margin M is always negative",
      "Because ||w|| is constrained to equal zero"
    ],
    correct: 0,
    explanation: "Maximizing 1/||w|| is equivalent to minimizing ||w||, which is monotonically equivalent to minimizing (1/2)||w||^2. The quadratic form is smooth, strictly convex, and easily optimized via QP."
  },
  {
    moduleId: 'm2',
    question: "What defines a Support Vector in the maximal-margin classifier?",
    options: [
      "Points that have the largest Euclidean distance from the decision boundary",
      "Data points that lie directly on the canonical margin boundaries: y_i (w^T x_i + b) = 1",
      "The arithmetic mean of each individual class",
      "Points with negative Lagrange multipliers"
    ],
    correct: 1,
    explanation: "Support vectors are the critical edge points fulfilling the equality constraint y_i (w^T x_i + b) = 1. They are the only points with strictly positive dual multipliers alpha_i > 0."
  },
  {
    moduleId: 'm2',
    question: "If you remove a training point that is NOT a support vector (a point lying strictly outside the margin), what happens to the maximal-margin hyperplane?",
    options: [
      "The hyperplane shifts toward the removed point",
      "The margin becomes significantly wider",
      "The hyperplane and margin remain completely unchanged",
      "The classifier collapses and requires regularization"
    ],
    correct: 2,
    explanation: "Because w = sum alpha_i y_i x_i and alpha_i = 0 for all non-support vectors, points outside the margin exert zero influence on the decision boundary."
  },
  {
    moduleId: 'm2',
    question: "For hyperplane 2x_1 + x_2 - 7 = 0 with weight vector w = (2, 1), what is the perpendicular distance from point x_0 = (4, 2) to the line?",
    options: [
      "3 / sqrt(5) ≈ 1.342",
      "3",
      "sqrt(5) ≈ 2.236",
      "0 (lies on line)"
    ],
    correct: 0,
    explanation: "distance = |w^T x_0 + b| / ||w|| = |2(4) + 1(2) - 7| / sqrt(2^2 + 1^2) = |3| / sqrt(5) ≈ 1.342."
  },
  {
    moduleId: 'm2',
    question: "In 1D with negative points {1, 2} and positive points {6, 7}, which boundary maximizes the safety margin?",
    options: [
      "x = 4 with margin = 2",
      "x = 3 with margin = 1",
      "x = 5 with margin = 1",
      "x = 2 with margin = 0"
    ],
    correct: 0,
    explanation: "At x = 4, distance to closest negative point (2) is 2, and distance to closest positive point (6) is 2. The minimum distance min(2, 2) = 2 is maximal."
  },

  // Module 3: Support vector classifier and soft margins
  {
    moduleId: 'm3',
    question: "In soft-margin SVM, what does a slack variable value of xi_i > 1 indicate about training point x_i?",
    options: [
      "The point lies on the margin boundary",
      "The point is on the correct side of the boundary and outside the margin",
      "The point is on the wrong side of the decision boundary (misclassified)",
      "The point has zero dual multiplier alpha_i = 0"
    ],
    correct: 2,
    explanation: "xi_i = 0 means on/outside margin; 0 < xi_i <= 1 means between boundary and margin on the correct side; xi_i > 1 means the point crossed the decision boundary and is misclassified."
  },
  {
    moduleId: 'm3',
    question: "What is the effect of setting the regularization parameter C to an extremely large value (C -> infinity)?",
    options: [
      "The margin becomes very wide and tolerates many training errors",
      "The classifier approaches the hard-margin SVM, heavily penalizing any margin violation (low bias, high variance)",
      "All slack variables xi_i become infinite",
      "The model ignores the training data"
    ],
    correct: 1,
    explanation: "As C -> infinity, any non-zero slack variable incurs a massive penalty in the objective, forcing the optimizer to allow zero margin violations (hard margin)."
  },
  {
    moduleId: 'm3',
    question: "How is soft-margin SVM mathematically formulated as Regularized Empirical Risk Minimization?",
    options: [
      "L2 regularization + Mean Squared Error loss",
      "L1 regularization + Cross-Entropy loss",
      "(1/2)||w||^2 regularization + Hinge Loss max(0, 1 - y_i f(x_i))",
      "L2 regularization + Zero-One loss"
    ],
    correct: 2,
    explanation: "Soft-margin SVM minimizes (1/2)||w||^2 + C sum max(0, 1 - y_i(w^T x_i + b)), which is exactly L2 weight decay regularizing the convex surrogate Hinge loss."
  },
  {
    moduleId: 'm3',
    question: "In the lecture candidate comparison (Candidate A: J_A = 0.125 + 2.25C vs Candidate B: J_B = 0.03125 + 3.125C), which model is preferred when C = 0.1?",
    options: [
      "Candidate B (J_B = 0.34375 vs J_A = 0.350)",
      "Candidate A (J_A = 0.350 vs J_B = 0.34375)",
      "Both models achieve identical objective values",
      "Neither model is valid because violations exist"
    ],
    correct: 0,
    explanation: "At C = 0.1, J_A = 0.125 + 0.225 = 0.350, while J_B = 0.03125 + 0.3125 = 0.34375. Because J_B < J_A, Candidate B is preferred due to its wider margin."
  },
  {
    moduleId: 'm3',
    question: "If an observation has a signed margin of m_i = y_i f(x_i) = 0.25, what is its required slack variable xi_i and classification status?",
    options: [
      "xi_i = 0.75, correctly classified but violating the margin cushion",
      "xi_i = 0, correctly classified outside the margin",
      "xi_i = 1.25, misclassified on the wrong side",
      "xi_i = 0.25, on the central decision boundary"
    ],
    correct: 0,
    explanation: "xi_i = max(0, 1 - m_i) = 1 - 0.25 = 0.75. Because m_i > 0, the sign is correct, but since m_i < 1, the point penetrates the margin band."
  },

  // Module 4: Feature expansion and nonlinear boundaries
  {
    moduleId: 'm4',
    question: "What is the primary motivation for mapping input features x to a higher-dimensional feature space phi(x)?",
    options: [
      "To speed up the training computation time",
      "To transform a linearly non-separable dataset into a space where it becomes linearly separable by a hyperplane",
      "To reduce the number of support vectors to zero",
      "To force all data points to have unit norm"
    ],
    correct: 1,
    explanation: "By Cover's Theorem, casting non-separable data nonlinearly into a higher dimension increases the probability that a linear hyperplane can achieve clean separation."
  },
  {
    moduleId: 'm4',
    question: "What is a major practical drawback of performing explicit polynomial feature expansion (e.g. mapping R^d to all degree-p monomials)?",
    options: [
      "The decision boundary can only remain linear in the original space",
      "Combinatorial explosion in dimensionality (O(d^p)), leading to severe computational and memory bottlenecks",
      "The loss function becomes non-convex",
      "Slack variables can no longer be used"
    ],
    correct: 1,
    explanation: "Explicitly constructing all degree-p polynomial interaction terms causes feature dimension to explode combinatorially, making dot products intractable for large p and d."
  },
  {
    moduleId: 'm4',
    question: "For the circular classifier f(x) = x_1^2 + x_2^2 - 4, what is the classification score and location for point (1, 1)?",
    options: [
      "Score = -2, classified as negative (-1) inside the circle",
      "Score = +2, classified as positive (+1) outside the circle",
      "Score = 0, lying on the circle boundary",
      "Score = -4, located at the origin"
    ],
    correct: 0,
    explanation: "f(1, 1) = 1^2 + 1^2 - 4 = 1 + 1 - 4 = -2 < 0. Because the score is negative, the point lies inside the circle of radius 2."
  },
  {
    moduleId: 'm4',
    question: "For an input feature vector with p = 100 dimensions, how many terms does an explicit polynomial expansion of degree d = 2 create?",
    options: [
      "5,151 terms (C(102, 2) = (102 * 101) / 2)",
      "200 terms (100 * 2)",
      "10,000 terms (100^2)",
      "176,851 terms (C(103, 3))"
    ],
    correct: 0,
    explanation: "The combinatorial expansion formula gives C(p + d, d) = C(102, 2) = (102 * 101) / 2 = 5,151 distinct terms."
  },

  // Module 5: SVMs and kernel functions
  {
    moduleId: 'm5',
    question: "What is the essence of the 'Kernel Trick' in Support Vector Machines?",
    options: [
      "Computing inner products <phi(x), phi(z)> directly via a kernel function K(x, z) without ever explicitly evaluating coordinates in high-dimensional space",
      "Approximating nonlinear boundaries with piecewise constant decision trees",
      "Inverting the covariance matrix in O(1) time",
      "Replacing quadratic programming with simple gradient descent"
    ],
    correct: 0,
    explanation: "Because the dual SVM formulation depends only on pairwise dot products, kernel function K(x, z) evaluates the inner product in implicit Hilbert space in O(d) input time."
  },
  {
    moduleId: 'm5',
    question: "What happens to the decision boundary of an SVM with a Gaussian RBF kernel when gamma is set to a very large value?",
    options: [
      "The decision boundary becomes a flat linear hyperplane",
      "The boundary creates tight, isolated, high-variance decision bubbles around individual training points (overfitting)",
      "The margin expands to infinity",
      "All points are classified into a single class"
    ],
    correct: 1,
    explanation: "High gamma means 1/(2 sigma^2) is large, so Gaussian similarity drops off sharply with distance, causing support vectors to have very narrow radii of influence and overfitting the training set."
  },
  {
    moduleId: 'm5',
    question: "According to Mercer’s Theorem, what condition must a continuous function K(x, z) satisfy to be a valid Mercer kernel?",
    options: [
      "Its determinant must equal 1",
      "It must be symmetric and its Gram matrix must be positive semi-definite for any finite set of points",
      "It must be monotonically increasing",
      "Its derivative must be strictly positive"
    ],
    correct: 1,
    explanation: "Mercer's condition requires symmetry K(x, z) = K(z, x) and positive semi-definiteness (c^T K c >= 0 for all c), guaranteeing that K corresponds to an inner product in some Hilbert space."
  },
  {
    moduleId: 'm5',
    question: "For a polynomial kernel K(x_i, x_j) = (x_i^T x_j + c)^d with x_i = (2, 3), x_j = (1, 4), c = 1, and d = 2, what is the kernel value?",
    options: [
      "225 ((14 + 1)^2 = 15^2)",
      "196 (14^2)",
      "15 (14 + 1)",
      "29 ((2^2 + 3^2) + (1^2 + 4^2))"
    ],
    correct: 0,
    explanation: "x_i^T x_j = (2)(1) + (3)(4) = 2 + 12 = 14. Adding c = 1 gives 15. Squaring gives 15^2 = 225."
  },
  {
    moduleId: 'm5',
    question: "In the lecture RBF model (SV 1: x_1 = 2, y_1 = -1, alpha_1 = 0.2; SV 2: x_2 = 5, y_2 = +1, alpha_2 = 0.3; gamma = 0.5, b = 0.1), what is the score f(3) and predicted class?",
    options: [
      "f(3) ≈ +0.0193, predicted class +1",
      "f(3) ≈ -0.1213, predicted class -1",
      "f(3) ≈ +0.0406, predicted class +1",
      "f(3) = 0.0000, on decision boundary"
    ],
    correct: 0,
    explanation: "K(2, 3) = e^(-0.5) ≈ 0.6065, K(5, 3) = e^(-2) ≈ 0.1353. Contributions: -0.1213 and +0.0406. Adding b = 0.1 gives f(3) ≈ +0.0193 > 0, predicting class +1."
  },

  // Module 6: Multiclass SVM and confidence
  {
    moduleId: 'm6',
    question: "In the One-versus-Rest (OvR) multiclass scheme for K classes, how many binary classifiers must be trained?",
    options: [
      "K(K - 1) / 2",
      "K",
      "2^K",
      "K - 1"
    ],
    correct: 1,
    explanation: "One-vs-Rest trains exactly K binary classifiers, each distinguishing class k from all other K-1 classes pooled together."
  },
  {
    moduleId: 'm6',
    question: "Why are raw SVM decision scores f(x) = w^T phi(x) + b not valid probabilities?",
    options: [
      "They can be negative and are not constrained to the interval [0, 1] or normalized to sum to 1",
      "They do not depend on the support vectors",
      "They are always integer values",
      "They are only defined for binary inputs"
    ],
    correct: 0,
    explanation: "Raw scores represent unnormalized geometric signed distances in (-infinity, +infinity). Platt scaling fits a logistic sigmoid to calibrate them into well-calibrated probabilities in [0, 1]."
  },

  // Module 7: Regularization and bias–variance
  {
    moduleId: 'm7',
    question: "Why does L1 regularization (Lasso) yield sparse weight vectors (many weights set exactly to zero) while L2 (Ridge) does not?",
    options: [
      "Because L1 regularization uses an exponential prior",
      "Because the L1 constraint region is a diamond with sharp vertices positioned along the coordinate axes where contours typically intersect",
      "Because L1 regularization cannot be solved with quadratic programming",
      "Because L2 regularization only applies to continuous features"
    ],
    correct: 1,
    explanation: "The geometry of the L1 ball ||w||_1 <= t has sharp corners on the coordinate axes. The elliptical loss contours touch these corners first, driving irrelevant coefficients to exact zeros."
  },
  {
    moduleId: 'm7',
    question: "According to Vapnik’s Structural Risk Minimization (SRM) principle, how should a model be chosen?",
    options: [
      "Choose the model with zero training error regardless of complexity",
      "Choose the model that minimizes the sum of empirical training risk and a capacity (VC dimension) complexity penalty",
      "Always pick the simplest linear model",
      "Choose the model with the largest number of parameters"
    ],
    correct: 1,
    explanation: "SRM balances empirical fit against model capacity (VC dimension), providing generalization error guarantees that prevent overfitting."
  },

  // Module 8: Optimization methods
  {
    moduleId: 'm8',
    question: "In the Karush-Kuhn-Tucker (KKT) conditions for soft-margin SVM, what does the complementary slackness condition alpha_i [y_i(w^T x_i + b) - 1 + xi_i] = 0 imply?",
    options: [
      "If a point lies strictly inside the margin (y_i f(x_i) > 1 and xi_i = 0), its dual multiplier alpha_i must be exactly 0",
      "All Lagrange multipliers alpha_i must equal C",
      "The bias b must equal 0",
      "The training loss must equal 1"
    ],
    correct: 0,
    explanation: "If the bracketed term is strictly positive (point is strictly outside the margin), alpha_i must be 0 for the product to equal 0. Only margin-boundary or margin-violating points can have alpha_i > 0."
  },
  {
    moduleId: 'm8',
    question: "Why does Platt’s Sequential Minimal Optimization (SMO) algorithm update two Lagrange multipliers (alpha_1, alpha_2) at a time rather than one?",
    options: [
      "Because single-variable quadratic programs have no solution",
      "Because the dual problem has a linear equality constraint sum alpha_i y_i = 0; changing one alpha would violate the constraint",
      "Because modern GPUs can only process numbers in pairs",
      "Because it halves the number of iterations required"
    ],
    correct: 1,
    explanation: "Due to the linear constraint sum alpha_i y_i = 0, updating a single multiplier alpha_1 while keeping others fixed is impossible without violating the constraint. Two multipliers must be updated simultaneously."
  }
];
