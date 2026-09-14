export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  moduleId: string;
}

export const ML_WEEK2_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Module 1: Why logistic regression is needed
  {
    moduleId: 'm1',
    question: "Why is ordinary linear regression unsuitable as a probability model?",
    options: [
      "It cannot use features.",
      "Its output can be below 0 or above 1.",
      "It always predicts class 1.",
      "It requires non-convex optimization."
    ],
    correct: 1,
    explanation: "A probability must be strictly between 0 and 1, but a straight linear regression output h(x) = θ^T x is unrestricted on (-∞, +∞)."
  },
  {
    moduleId: 'm1',
    question: "What does the sigmoid receive as input in logistic regression?",
    options: [
      "The raw feature vector x only.",
      "The weighted linear score z = θ^T x.",
      "The final discrete class label.",
      "The dataset loss value."
    ],
    correct: 1,
    explanation: "Logistic regression first calculates the linear combination z = θ^T x, then passes that scalar score z into the sigmoid function σ(z)."
  },
  {
    moduleId: 'm1',
    question: "If the sigmoid output is 0.90 for a given input x, what does it mean?",
    options: [
      "The model predicts class 1 with estimated probability 0.90.",
      "The raw score z equals 0.90.",
      "The model is 90% wrong.",
      "The decision threshold has been shifted by 0.90."
    ],
    correct: 0,
    explanation: "The sigmoid output is interpreted as the conditional probability P(y=1 | x; θ) = 0.90."
  },

  // Module 2: Sigmoid function
  {
    moduleId: 'm2',
    question: "What is the primary purpose of the sigmoid function in logistic regression?",
    options: [
      "To calculate the linear dot product between weights and features.",
      "To convert any unrestricted real-valued score into a valid probability between 0 and 1.",
      "To make discrete target labels continuous.",
      "To regularize parameters and prevent overfitting."
    ],
    correct: 1,
    explanation: "The sigmoid converts the unrestricted score z ∈ (-∞, +∞) into a calibrated probability value between 0 and 1."
  },
  {
    moduleId: 'm2',
    question: "If the linear score is z = 0, what is the output of the sigmoid function σ(0)?",
    options: [
      "0",
      "0.5",
      "1",
      "-1"
    ],
    correct: 1,
    explanation: "σ(0) = 1 / (1 + e^0) = 1 / (1 + 1) = 0.5. This represents maximum uncertainty and the exact decision boundary."
  },
  {
    moduleId: 'm2',
    question: "What does the quantity z represent in logistic regression?",
    options: [
      "The final discrete class label (0 or 1).",
      "The raw weighted linear score (θ^T x) before sigmoid probability conversion.",
      "The derivative of the loss function.",
      "The classification threshold cutoff."
    ],
    correct: 1,
    explanation: "z = θ^T x is the raw weighted sum of features. The sigmoid transforms this score into an estimated probability."
  },
  {
    moduleId: 'm2',
    question: "What is the derivative of the sigmoid function σ(z), and at what point is it at its maximum?",
    options: [
      "σ'(z) = σ(z)(1 - σ(z)), and it reaches its maximum (0.25) at z = 0 (probability 0.5).",
      "σ'(z) = 1 - σ(z), and it reaches its maximum at z = -∞.",
      "σ'(z) = e^(-z) / (1 + e^(-z)), and it reaches its maximum at z = +∞.",
      "σ'(z) = 2 * σ(z), and it is constant everywhere."
    ],
    correct: 0,
    explanation: "Using the quotient rule, σ'(z) = σ(z)(1 - σ(z)). At p = 0.5 (z = 0), the derivative evaluates to 0.5 * (1 - 0.5) = 0.25, which is its peak rate of change."
  },

  // Module 3: Bernoulli probability and one-example likelihood
  {
    moduleId: 'm3',
    question: "What does the Bernoulli distribution describe in the context of logistic regression?",
    options: [
      "The derivative of the sigmoid function with respect to weights.",
      "A probability model for one trial with a single binary outcome that is either 0 or 1.",
      "The dot product between feature vectors.",
      "A technique for inverting non-singular matrices."
    ],
    correct: 1,
    explanation: "Bernoulli models a single binary outcome (0 or 1). It assigns probability p to outcome 1 and (1-p) to outcome 0. It is a probability distribution, not a derivative."
  },
  {
    moduleId: 'm3',
    question: "If a logistic regression model predicts probability p = 0.8 for class 1, but the ground-truth label is y = 0, what likelihood value does the model assign to the actual outcome?",
    options: [
      "0.8",
      "0.2",
      "1.8",
      "-0.8"
    ],
    correct: 1,
    explanation: "Because the actual label is y = 0, the probability assigned to what really occurred is 1 - p = 1 - 0.8 = 0.2."
  },
  {
    moduleId: 'm3',
    question: "Why can the single-example Bernoulli likelihood be written compactly as P(y | x; θ) = p^y * (1 - p)^(1 - y)?",
    options: [
      "Because y and (1 - y) act as exponent switches: y = 1 selects p, and y = 0 selects (1 - p).",
      "Because probabilities must always be multiplied by the label value.",
      "Because it forces the likelihood to be negative.",
      "Because it eliminates the need for calculating weights."
    ],
    correct: 0,
    explanation: "When y = 1, p^1 * (1 - p)^0 = p * 1 = p. When y = 0, p^0 * (1 - p)^1 = 1 * (1 - p) = 1 - p. This provides a single unified algebraic expression."
  },
  {
    moduleId: 'm3',
    question: "What is the primary objective of Maximum Likelihood Estimation (MLE)?",
    options: [
      "To select parameters θ that make the actually observed training data labels most probable.",
      "To find the smallest possible number of training examples.",
      "To force the gradient to zero without changing parameter values.",
      "To set all feature weights to 1."
    ],
    correct: 0,
    explanation: "MLE chooses parameter values θ̂ that maximize the joint probability (likelihood) assigned to the labels that actually occurred in the dataset."
  },

  {
    moduleId: 'm3',
    question: "Why is log-likelihood used instead of raw likelihood when training logistic regression?",
    options: [
      "Taking the log prevents floating-point underflow and converts products into sums without altering the argmax.",
      "The logarithm changes a non-convex objective into a convex one.",
      "The raw likelihood cannot be computed on modern CPUs.",
      "Log-likelihood guarantees a 100% accuracy rate."
    ],
    correct: 0,
    explanation: "Multiplying thousands of probabilities in (0, 1) causes numerical underflow to zero. Monotonic log transform turns products to sums and preserves the optimal parameter vector."
  },

  // Module 4: Gradient derivation and gradient ascent
  {
    moduleId: 'm4',
    question: "What does a positive gradient mean during gradient ascent in logistic regression?",
    options: [
      "Increasing the parameter weight will locally increase the log-likelihood objective.",
      "The model must decrease the parameter weight.",
      "The training feature value is missing or zero.",
      "The optimization has reached a global minimum."
    ],
    correct: 0,
    explanation: "In gradient ascent we seek to maximize the objective function. A positive gradient indicates that increasing the parameter moves the model uphill toward higher likelihood."
  },
  {
    moduleId: 'm4',
    question: "In the logistic regression gradient formula (y - h) * x_j, what does the factor (y - h) represent?",
    options: [
      "The probability prediction error direction and magnitude.",
      "The learning rate hyperparameter.",
      "The intercept bias term.",
      "The variance of the training dataset."
    ],
    correct: 0,
    explanation: "(y - h) compares the actual ground-truth label (1 or 0) with the model's predicted probability h. Its sign determines whether to increase or decrease the weight."
  },
  {
    moduleId: 'm4',
    question: "If true label y = 0 and predicted probability h = 0.8, should the weight update increase or decrease when feature x_j > 0?",
    options: [
      "Increase the weight",
      "Decrease the weight",
      "The weight cannot be updated",
      "Set the weight to 0"
    ],
    correct: 1,
    explanation: "The error y - h = 0 - 0.8 = -0.8 is negative. Because x_j is positive, the gradient (y - h)x_j is negative. In gradient ascent, adding a negative quantity decreases the weight."
  },
  {
    moduleId: 'm4',
    question: "What does the learning rate hyperparameter α control in gradient ascent?",
    options: [
      "The step size taken in the direction of the gradient at each parameter update.",
      "Whether the target label is 0 or 1.",
      "The number of feature dimensions in the dataset.",
      "The threshold cutoff for final class prediction."
    ],
    correct: 0,
    explanation: "The learning rate α scales the gradient vector, controlling how far parameter weights move in parameter space during each iteration."
  },

  // Module 5: Generalized Linear Models
  {
    moduleId: 'm5',
    question: "Which distribution from the exponential family corresponds to ordinary linear regression in the GLM framework?",
    options: [
      "Bernoulli distribution",
      "Gaussian (Normal) distribution",
      "Poisson distribution",
      "Multinomial distribution"
    ],
    correct: 1,
    explanation: "Ordinary linear regression is a GLM where the target y is assumed to follow a Gaussian distribution with identity link function."
  },

  // Module 6: Exponential family
  {
    moduleId: 'm6',
    question: "In the canonical exponential family form p(y; η) = b(y) exp(η^T T(y) - a(η)), what does a(η) represent?",
    options: [
      "The base measure",
      "The sufficient statistic",
      "The log-partition function (cumulant function)",
      "The natural parameter"
    ],
    correct: 2,
    explanation: "a(η) is the log-partition function that ensures the distribution integrates to 1. Its derivative ∇a(η) equals the expected value E[T(y)]."
  },

  // Module 7: Constructing GLMs
  {
    moduleId: 'm7',
    question: "Why does Logistic Regression specifically use the sigmoid link function according to GLM derivation?",
    options: [
      "It is an arbitrary empirical choice that happened to work well.",
      "Solving for the mean parameter in Bernoulli canonical exponential family form mathematically yields the sigmoid.",
      "Because sigmoid is the only function bounded between 0 and 1.",
      "Because John Nelder proved no other function can be differentiated."
    ],
    correct: 1,
    explanation: "For Bernoulli(ϕ), the natural parameter is η = ln(ϕ / (1 - ϕ)). Solving for E[y|x] = ϕ gives ϕ = 1 / (1 + e^(-η)) = 1 / (1 + e^(-θ^T x)), which is precisely the sigmoid function."
  },

  // Module 8: Naive Bayes
  {
    moduleId: 'm8',
    question: "What is the core 'naive' assumption in the Naive Bayes classifier?",
    options: [
      "That class priors P(y) are always equal to 0.5.",
      "That features x_1, ..., x_n are conditionally independent given the class label y.",
      "That all features follow a Gaussian distribution.",
      "That the decision boundary is always non-linear."
    ],
    correct: 1,
    explanation: "Naive Bayes assumes P(x_1, ..., x_n | y) = ∏ P(x_j | y), meaning features are conditionally independent given class y."
  },

  // Module 9: MLE versus MAP
  {
    moduleId: 'm9',
    question: "Assuming a zero-mean Gaussian prior P(θ) ~ N(0, σ^2 I) in MAP estimation is mathematically equivalent to which regularizer?",
    options: [
      "L1 (Lasso) Regularization",
      "L2 (Ridge) Regularization",
      "ElasticNet Regularization",
      "Dropout"
    ],
    correct: 1,
    explanation: "ln P(θ) for a zero-mean Gaussian prior introduces a penalty proportional to -||θ||_2^2, which corresponds directly to L2 Ridge weight decay."
  }
];
