import { UniversalFlashcard } from '../../../../common';

export const ML_WEEK2_FLASHCARDS: UniversalFlashcard[] = [
  {
    id: 'w2-fc-1',
    category: 'Module 1: Why Logistic Regression',
    title: 'OLS Failure for Binary Classification',
    frontPrompt: 'Why is Ordinary Least Squares (OLS) linear regression unsuitable for binary classification?',
    backFormula: 'h_\\theta(x) = \\theta^T x \\implies h_\\theta(x) \\in (-\\infty, +\\infty)',
    backExplanation: 'Linear regression predictions can produce values < 0 or > 1, which cannot represent probabilities. Furthermore, extreme positive outliers drastically tilt the linear decision line, causing valid positive samples to be misclassified.',
    useCase: 'Distinguishing binary classification from continuous regression.',
    remark: 'Also violates homoscedasticity because error variance Var(y|x) = p(1-p) depends on x.'
  },
  {
    id: 'w2-fc-2',
    category: 'Module 1: Why Logistic Regression',
    title: 'Odds and Logit Transformation',
    frontPrompt: 'What are odds and log-odds (logit), and why are they used in logistic regression?',
    backFormula: '\\text{Odds} = \\frac{p}{1-p} \\in [0, \\infty), \\quad \\text{Logit}(p) = \\ln\\left(\\frac{p}{1-p}\\right) = \\theta^T x',
    backExplanation: 'The logit link function maps a bounded probability p in (0, 1) onto the unbounded real line (-inf, +inf) matched by the linear combination theta^T x.',
    useCase: 'Interpreting logistic regression coefficients as changes in log-odds.',
    remark: 'A unit increase in x_j multiplies odds by e^(theta_j).'
  },
  {
    id: 'w2-fc-2b',
    category: 'Module 1: Why Logistic Regression',
    title: 'Logistic Regression Pipeline & Hypothesis',
    frontPrompt: 'What is the full logistic regression pipeline and hypothesis formula h_theta(x)?',
    backFormula: 'h_\\theta(x) = \\sigma(\\theta^T x) = \\frac{1}{1 + e^{-\\theta^T x}} = P(y=1 \\mid x; \\theta)',
    backExplanation: 'Features x are first multiplied by weights into linear score z = theta^T x, then passed into the sigmoid function to produce a valid calibrated probability for class 1.',
    useCase: 'Core predictive model for binary classification.',
    remark: 'Linear score z in (-inf, +inf) is mapped to bounded probability in (0, 1).'
  },
  {
    id: 'w2-fc-2c',
    category: 'Module 1: Why Logistic Regression',
    title: 'Decision Boundary Condition',
    frontPrompt: 'What is the mathematical condition for the logistic regression decision boundary with threshold 0.5?',
    backFormula: '\\hat{y} = 1 \\iff h_\\theta(x) \\geq 0.5 \\iff \\theta^T x \\geq 0',
    backExplanation: 'Since sigma(z) = 0.5 when z = 0, the decision boundary separating class 1 and class 0 is the linear hyperplane theta^T x = 0.',
    useCase: 'Plotting decision hyperplanes and determining class separation.',
    remark: 'For one feature with z = -4 + x, the boundary is at x = 4.'
  },
  {
    id: 'w2-fc-3',
    category: 'Module 2: Sigmoid Function',
    title: 'Logistic Sigmoid Definition & Symmetry',
    frontPrompt: 'What is the formula and symmetry property of the logistic sigmoid function?',
    backFormula: '\\sigma(z) = \\frac{1}{1 + e^{-z}} = \\frac{e^z}{1 + e^z}, \\quad 1 - \\sigma(z) = \\sigma(-z)',
    backExplanation: 'The sigmoid smoothly squashes any real value z into (0, 1), with sigma(0) = 0.5. Its reflection symmetry ensures complementary probability calculation.',
    useCase: 'Converting unbounded linear scores into calibrated probability estimates.',
    remark: 'Commonly used as the output activation for binary classification neural nets.'
  },
  {
    id: 'w2-fc-4',
    category: 'Module 2: Sigmoid Function',
    title: 'Derivative of the Sigmoid Function',
    frontPrompt: 'What is the first derivative of the sigmoid function with respect to z?',
    backFormula: '\\frac{d}{dz}\\sigma(z) = \\sigma(z)(1 - \\sigma(z))',
    backExplanation: 'The derivative can be computed directly from the function output itself without re-evaluating exp(-z), dramatically accelerating gradient computations.',
    useCase: 'Backpropagation and gradient ascent optimization.',
    remark: 'Maximum derivative is 0.25 at z = 0, which can lead to vanishing gradients in deep networks.'
  },
  {
    id: 'w2-fc-5',
    category: 'Module 3: Bernoulli Likelihood',
    title: 'Compact Single-Example Likelihood',
    frontPrompt: 'How is the likelihood of a single binary training observation written in compact algebraic form?',
    backFormula: 'P(y \\mid x; \\theta) = p^y (1 - p)^{1-y} = \\left(h_\\theta(x)\\right)^y \\left(1 - h_\\theta(x)\\right)^{1-y}',
    backExplanation: 'When y = 1, the (1-h)^0 term becomes 1 and yields h_theta(x). When y = 0, the (h)^0 term becomes 1 and yields 1 - h_theta(x).',
    useCase: 'Unified mathematical formulation of the Bernoulli probability mass function.',
    remark: 'Continuous and differentiable with respect to theta.'
  },
  {
    id: 'w2-fc-5b',
    category: 'Module 3: Bernoulli Likelihood',
    title: 'Maximum Likelihood Estimation (MLE) Principle',
    frontPrompt: 'What is the objective of Maximum Likelihood Estimation (MLE) for a dataset of independent observations?',
    backFormula: 'L(\\theta) = \\prod_{i=1}^n P(y^{(i)} \\mid x^{(i)}; \\theta), \\quad \\hat{\\theta} = \\arg\\max_\\theta L(\\theta)',
    backExplanation: 'MLE searches for parameters theta that maximize the joint probability assigned to the actually observed outcomes across the entire training dataset.',
    useCase: 'Standard parameter estimation technique for statistical learning models.',
    remark: 'Assumes observations are independent and identically distributed (i.i.d.).'
  },
  {
    id: 'w2-fc-6',
    category: 'Module 3: Maximum Likelihood',
    title: 'Dataset Log-Likelihood & Cross-Entropy',
    frontPrompt: 'Why do we maximize log-likelihood ln L(theta) rather than the raw likelihood product L(theta)?',
    backFormula: '\\ell(\\theta) = \\sum_{i=1}^m \\left[ y^{(i)} \\ln h_\\theta(x^{(i)}) + (1 - y^{(i)}) \\ln(1 - h_\\theta(x^{(i)})) \\right]',
    backExplanation: 'Monotonicity guarantees the maximum is identical. Converting products to sums prevents numerical underflow of probabilities and simplifies differentiation.',
    useCase: 'Equivalent to minimizing Binary Cross-Entropy loss J(theta) = -(1/m) * ell(theta).',
    remark: 'Core objective function optimized by logistic regression.'
  },
  {
    id: 'w2-fc-7',
    category: 'Module 4: Gradient Ascent Derivation',
    title: 'Gradient Ascent Parameter Update',
    frontPrompt: 'What is the gradient of the log-likelihood with respect to parameter weight theta_j?',
    backFormula: '\\frac{\\partial \\ell(\\theta)}{\\partial \\theta_j} = \\sum_{i=1}^m \\left( y^{(i)} - h_\\theta(x^{(i)}) \\right) x_j^{(i)}',
    backExplanation: 'The gradient direction is simply the prediction error (y - prediction) multiplied by feature x_j. In gradient ascent we add the gradient to maximize likelihood.',
    useCase: 'Updating weights in batch or stochastic gradient ascent.',
    remark: 'Notice it shares the exact algebraic form as LMS linear regression, but with nonlinear sigmoid h.'
  },
  {
    id: 'w2-fc-7b',
    category: 'Module 4: Gradient Ascent Derivation',
    title: 'Chain Rule Decomposition & Bias Update',
    frontPrompt: 'How does the chain rule decompose the derivative of log-likelihood, and how is the bias term b updated?',
    backFormula: '\\frac{\\partial \\ell}{\\partial \\theta_j} = \\left(\\frac{\\partial \\ell}{\\partial h}\\right) \\left(\\frac{\\partial h}{\\partial z}\\right) \\left(\\frac{\\partial z}{\\partial \\theta_j}\\right) = (y - h)x_j, \\quad b \\gets b + \\alpha(y - h)',
    backExplanation: 'The factor h(1-h) in the denominator of d(ell)/dh cancels identically with dh/dz = h(1-h) from the sigmoid. Because bias b has an implicit input feature of 1 (dz/db = 1), its update rule is simply b + alpha*(y - h).',
    useCase: 'Step-by-step calculus derivation and implementation of bias update.',
    remark: 'Prevents numerical instability and reveals the error-driven learning dynamics.'
  },
  {
    id: 'w2-fc-8',
    category: 'Module 5: Generalized Linear Models',
    title: 'The Three Components of a GLM',
    frontPrompt: 'What are the 3 structural components that define every Generalized Linear Model?',
    backFormula: '1) \\; y \\sim \\text{ExpFamily}(\\eta), \\quad 2) \\; \\eta = \\theta^T x, \\quad 3) \\; g(\\mu) = \\eta',
    backExplanation: '1) Random component: target y follows an exponential family distribution. 2) Systematic component: linear predictor eta = theta^T x. 3) Link function g: connects mean mu = E[y|x] to eta.',
    useCase: 'Unifying linear regression (Gaussian), logistic regression (Bernoulli), and Poisson count models.',
    remark: 'Introduced by Nelder & Wedderburn (1972).'
  },
  {
    id: 'w2-fc-8b',
    category: 'Module 5: Generalized Linear Models',
    title: 'Link Functions and Inverse Links (Identity vs. Logit)',
    frontPrompt: 'What link functions connect the mean μ to the linear predictor η in Linear and Logistic regression?',
    backFormula: '\\text{Linear: } g(\\mu) = \\mu = \\eta \\implies \\mu = \\eta; \\quad \\text{Logistic: } g(\\mu) = \\ln\\left(\\frac{\\mu}{1-\\mu}\\right) = \\eta \\implies \\mu = \\sigma(\\eta)',
    backExplanation: 'The link function g(mu) = eta maps the conditional expectation to the unbounded linear predictor. The inverse link (mean function) mu = g^{-1}(eta) maps scores back to valid predictions: identity leaves values unchanged, while sigmoid restricts outputs to (0, 1).',
    useCase: 'Understanding the architectural difference between Gaussian squared error and Bernoulli cross-entropy training.',
    remark: 'The loss function is dictated by the assumed exponential family distribution.'
  },
  {
    id: 'w2-fc-9',
    category: 'Module 6: Exponential Family',
    title: 'Canonical Exponential Family Formulation',
    frontPrompt: 'What is the canonical representation of an Exponential Family distribution?',
    backFormula: 'p(y; \\eta) = b(y) \\exp\\left( \\eta^T T(y) - a(\\eta) \\right)',
    backExplanation: 'eta is the natural parameter; T(y) is the sufficient statistic; a(eta) is the log-partition function; and b(y) is the base measure.',
    useCase: 'Characterizing probability distributions in GLM modeling.',
    remark: 'The gradient of a(eta) gives the expected value E[T(y)].'
  },
  {
    id: 'w2-fc-10',
    category: 'Module 7: Constructing GLMs',
    title: 'GLM Derivation of Logistic Regression',
    frontPrompt: 'Why does Logistic Regression naturally use the sigmoid function?',
    backFormula: '\\eta = \\ln\\left(\\frac{\\phi}{1-\\phi}\\right) \\implies \\phi = \\frac{1}{1 + e^{-\\eta}} = \\frac{1}{1 + e^{-\\theta^T x}}',
    backExplanation: 'Setting up Bernoulli as an exponential family sets eta = log-odds. Since GLMs postulate h(x) = E[y|x] = phi and eta = theta^T x, the sigmoid response function is mathematically required.',
    useCase: 'Formal justification that sigmoid is not an arbitrary heuristic.',
    remark: 'Extending to Multinomial distributions similarly derives the Softmax activation.'
  },
  {
    id: 'w2-fc-11',
    category: 'Module 8: Naive Bayes',
    title: 'Naive Conditional Independence Assumption',
    frontPrompt: 'What assumption does Naive Bayes make, and how does it reduce model complexity?',
    backFormula: 'P(x_1, \\dots, x_n | y) = \\prod_{j=1}^n P(x_j | y)',
    backExplanation: 'Assumes all input features are conditionally independent given the class label y. This collapses parameter requirements from 2^n down to 2n for binary features.',
    useCase: 'Fast text classification, spam filtering, and sentiment analysis.',
    remark: 'Laplace smoothing (add-1) is used to avoid zero probabilities on unseen words.'
  },
  {
    id: 'w2-fc-12',
    category: 'Module 9: MLE vs MAP',
    title: 'MLE vs MAP & Regularization Equivalence',
    frontPrompt: 'How are MAP estimation and Ridge/Lasso regularization mathematically equivalent?',
    backFormula: '\\theta_{\\text{MAP}} = \\arg\\max_\\theta \\left[ \\ln P(\\mathcal{D}|\\theta) + \\ln P(\\theta) \\right]',
    backExplanation: 'MAP adds a prior distribution over weights. A Gaussian prior P(theta) ~ N(0, sigma^2 I) corresponds exactly to L2 Ridge penalty ||theta||_2^2. A Laplace prior corresponds to L1 Lasso penalty ||theta||_1.',
    useCase: 'Bayesian interpretation of weight decay and feature selection.',
    remark: 'MLE is a special case of MAP with a uniform flat prior P(theta) = constant.'
  }
];
