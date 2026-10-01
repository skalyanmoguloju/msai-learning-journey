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
    question: "With four distinct classes (K = 4), how many One-versus-One (OvO) binary SVMs must be trained?",
    options: [
      "6 models (K(K - 1) / 2 = 4(3) / 2)",
      "4 models (K)",
      "12 models (4 * 3)",
      "16 models (4^2)"
    ],
    correct: 0,
    explanation: "One-versus-One trains a unique binary model for every unique pair of classes: K(K - 1) / 2 = 4(3) / 2 = 6 distinct pairwise classifiers."
  },
  {
    moduleId: 'm6',
    question: "In a 3-class One-versus-All classifier, the evaluated scores for an observation are Cat = -0.4, Dog = +1.6, and Bird = +0.2. Which class is predicted?",
    options: [
      "Dog, because +1.6 is the highest algebraic decision score",
      "Bird, because it is positive but closest to zero",
      "Cat, because its negative score implies the least error",
      "No prediction can be made without converting to probabilities"
    ],
    correct: 0,
    explanation: "One-versus-All uses the argmax decision rule: y_hat = argmax_k f_k(x). Since Dog has the largest score (+1.6), Dog is selected."
  },
  {
    moduleId: 'm6',
    question: "Does an SVM decision score of f(x) = +0.8 indicate an 80% posterior probability of belonging to the positive class?",
    options: [
      "No, it is an uncalibrated geometric decision-function score, not a probability",
      "Yes, all positive scores between 0 and 1 represent exact posterior probabilities",
      "Yes, provided the data was normalized with MinMax scaling",
      "No, it indicates an 8% probability"
    ],
    correct: 0,
    explanation: "The score f(x) = w^T x + b is an unbounded real scalar measuring margin distance; it is not a probability."
  },
  {
    moduleId: 'm6',
    question: "In linear decision boundaries f(x) = 3x_1 + 4x_2 - 10 = 0 with ||w|| = 5, what is the geometric perpendicular distance from point A = (2, 2) to the boundary?",
    options: [
      "0.8 units (|4| / 5)",
      "4.0 units (raw score)",
      "1.25 units (5 / 4)",
      "0.2 units (|1| / 5)"
    ],
    correct: 0,
    explanation: "Raw score is 3(2) + 4(2) - 10 = 4. The perpendicular distance is |f(x)| / ||w|| = |4| / 5 = 0.8 units."
  },

  // Module 7: Regularization and bias–variance
  {
    moduleId: 'm7',
    question: "A model achieves very low training error but high validation error. What is the most likely diagnosis?",
    options: [
      "Overfitting: the model is memorizing training details and noise but generalizing poorly",
      "Underfitting: the model is too simple to capture underlying patterns",
      "High bias: the model has insufficient capacity for the task",
      "The regularization strength lambda is set excessively high"
    ],
    correct: 0,
    explanation: "When training error is low but validation error is high, the model has high variance and is overfitting the training sample."
  },
  {
    moduleId: 'm7',
    question: "Which regularization method can drive feature weights to become exactly zero, thereby performing automatic feature selection?",
    options: [
      "L1 regularization (Lasso), because the absolute-value function has a sharp corner at zero",
      "L2 regularization (Ridge), because quadratic decay forces small weights to zero",
      "Both L1 and L2 equally set weights to zero",
      "Neither method can produce weights of exactly zero"
    ],
    correct: 0,
    explanation: "L1 penalty |theta| has a sharp corner at zero where optimization gradients can stop, driving irrelevant feature weights to exactly 0."
  },
  {
    moduleId: 'm7',
    question: "If validation error is lowest at Epoch 6 (0.36) while training error keeps decreasing through Epoch 8 (0.08), which checkpoint should early stopping select?",
    options: [
      "Epoch 6, because model selection is strictly guided by validation performance",
      "Epoch 8, because lower training error always indicates a superior final model",
      "Epoch 7, as an average compromise between training and validation",
      "Epoch 1, to preserve maximum model simplicity"
    ],
    correct: 0,
    explanation: "Early stopping selects the epoch with the lowest validation error (Epoch 6); training beyond that point simply memorizes noise and degrades generalization."
  },
  {
    moduleId: 'm7',
    question: "In the regularized objective J(theta) = data loss + lambda * penalty, what does the hyperparameter lambda control?",
    options: [
      "The overall strength of regularization, balancing prediction accuracy with model complexity",
      "The optimizer learning rate for gradient updates",
      "The keep probability of dropout neurons",
      "The ratio of training samples to validation samples"
    ],
    correct: 0,
    explanation: "Lambda directly scales the magnitude of the complexity penalty relative to the data loss."
  },
  {
    moduleId: 'm7',
    question: "For a linear model with weights theta = (4, 1) and data loss = 10, what is the total L2 regularized objective J(theta) when lambda = 0.1?",
    options: [
      "11.7 (loss 10 + 0.1 * (4^2 + 1^2) = 10 + 1.7)",
      "10.5 (loss 10 + 0.1 * (4 + 1))",
      "11.3 (loss 10.5 + 0.1 * 8)",
      "27.0 (loss 10 + 17)"
    ],
    correct: 0,
    explanation: "L2 penalty = 4^2 + 1^2 = 16 + 1 = 17. The regularization contribution is 0.1 * 17 = 1.7. Total objective = 10 + 1.7 = 11.7."
  },

  // Module 8: Optimization methods
  {
    moduleId: 'm8',
    question: "What does the learning rate (eta) control in gradient descent optimization?",
    options: [
      "The size of each parameter update step along the negative gradient",
      "The ratio of training samples to test samples in each epoch",
      "The total number of parameters in the model",
      "The probability of neuron dropout during forward passes"
    ],
    correct: 0,
    explanation: "The learning rate eta scales the gradient, directly dictating how far parameters step in parameter space."
  },
  {
    moduleId: 'm8',
    question: "In momentum-based gradient descent, what does the velocity vector v_t remember?",
    options: [
      "The direction and velocity of previous gradients or parameter updates",
      "The exact second-order Hessian curvature matrix",
      "The global minimum loss value encountered so far",
      "The total number of epochs elapsed without validation improvement"
    ],
    correct: 0,
    explanation: "Momentum maintains an exponentially weighted accumulation of past gradients, preserving directional inertia through plateaus and ravines."
  },
  {
    moduleId: 'm8',
    question: "What statistical property does the adaptive optimizer RMSProp track to scale parameter step sizes?",
    options: [
      "An exponentially decaying running average of squared gradients (g_t^2)",
      "The raw algebraic sum of gradients without squaring",
      "The determinant of the parameter covariance matrix",
      "The ratio of validation loss to training loss"
    ],
    correct: 0,
    explanation: "RMSProp tracks s_t = beta * s_{t-1} + (1 - beta) * g_t^2 so that updates are scaled inversely by the root mean square of recent gradient magnitudes."
  },
  {
    moduleId: 'm8',
    question: "What core components does the Adam optimizer combine into a unified parameter update rule?",
    options: [
      "Momentum-like direction tracking (first moment), RMSProp-like magnitude scaling (second moment), and initialization bias correction",
      "Simulated annealing, genetic mutations, and random restarts",
      "L1 regularization, L2 regularization, and early stopping",
      "Line search, conjugate directions, and Newton-Raphson curvature"
    ],
    correct: 0,
    explanation: "Adam tracks m_t (first moment for direction), v_t (second moment for adaptive scaling), and applies analytical bias corrections (1 - beta^t) for initial steps."
  },
  {
    moduleId: 'm8',
    question: "What is the key mathematical difference between standard Adam and AdamW?",
    options: [
      "AdamW applies weight decay as a decoupled shrinkage step rather than folding it into the gradient update",
      "AdamW uses second-order Hessian matrices instead of gradients",
      "AdamW eliminates momentum and uses pure RMSProp",
      "AdamW computes gradients only on odd-numbered epochs"
    ],
    correct: 0,
    explanation: "AdamW decouples weight decay so theta_{t+1} shrinks directly by -eta * lambda * theta_t, avoiding distorted scaling by historical second moments (v_t)."
  },
  {
    moduleId: 'm8',
    question: "In AdamW, if parameter theta = 10, learning rate eta = 0.1, weight decay lambda = 0.01, and the Adam gradient update is 0.3, what is the new parameter value?",
    options: [
      "9.69 (10 - [0.3 + (0.1 * 0.01 * 10)] = 10 - 0.31)",
      "9.70 (10 - 0.3)",
      "9.00 (10 - 1.0)",
      "8.69 (10 - 1.31)"
    ],
    correct: 0,
    explanation: "The decoupled weight decay amount is eta * lambda * theta = 0.1 * 0.01 * 10 = 0.01. Adding the Adam update of 0.3 gives a total subtraction of 0.31, resulting in 10 - 0.31 = 9.69."
  }
];

