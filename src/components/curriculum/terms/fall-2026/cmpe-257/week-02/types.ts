import React from 'react';
import {
  HelpCircle,
  Activity,
  Binary,
  Database,
  TrendingUp,
  Layers,
  Sigma,
  Wrench,
  GitBranch,
  Scale
} from 'lucide-react';

export interface ConceptItem {
  title: string;
  badge?: string;
  summary: string;
  bullets: string[];
  formula?: string;
  code?: string;
}

export interface MLWeek2Module {
  id: string;
  stepNumber: number;
  shortTitle: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  readingStatus: 'yet_to_complete';
  keyQuestions: string[];
  coreTheorems: { name: string; formula: string; explanation: string }[];
  concepts: ConceptItem[];
}

export const ML_WEEK2_MODULES: MLWeek2Module[] = [
  {
    id: 'm1',
    stepNumber: 1,
    shortTitle: 'Why Logistic Regression',
    title: 'Why logistic regression is needed',
    category: 'Classification Foundations',
    icon: HelpCircle,
    readingStatus: 'yet_to_complete',
    description: 'Limitations of standard Ordinary Least Squares (OLS) linear regression for discrete classification, bounded outputs, and the transition to probabilistic odds.',
    keyQuestions: [
      'Why does linear regression fail when predicting discrete binary targets y in {0, 1}?',
      'How do distant extreme outliers distort the decision boundary in linear models?',
      'What are odds and log-odds (logit), and why do they map probabilities to the entire real line (-inf, +inf)?'
    ],
    coreTheorems: [
      {
        name: 'Failure of Boundedness in Linear Models',
        formula: 'h_\\theta(x) = \\theta^T x \\implies h_\\theta(x) \\in (-\\infty, +\\infty)',
        explanation: 'Linear regression produces predictions outside [0, 1], invalidating direct interpretation as probabilities.'
      },
      {
        name: 'Logit Transformation & Odds',
        formula: '\\text{Odds} = \\frac{p}{1 - p} \\in [0, \\infty), \\quad \\text{Logit}(p) = \\ln\\left(\\frac{p}{1 - p}\\right) = \\theta^T x',
        explanation: 'The logit link maps bounded probability p in (0, 1) to the unbounded real space (-inf, +inf) spanned by theta^T x.'
      }
    ],
    concepts: [
      {
        title: 'Classification vs Regression Pitfalls',
        badge: 'Boundary Sensitivity',
        summary: 'Applying linear regression to binary labels y in {0, 1} introduces major statistical violations.',
        bullets: [
          'Predictions can be negative (< 0) or exceed 1 (> 1), violating the Kolmogorov probability axioms.',
          'Sensitivity to outliers: Extreme positive examples with very large x pull the decision threshold to the right, misclassifying valid positive points.',
          'Heteroscedasticity: The error variance Var(y|x) = p(x)(1 - p(x)) depends on x, violating the homoscedasticity assumption of ordinary least squares.'
        ]
      },
      {
        title: 'From Odds to Probabilities',
        badge: 'Log-Odds Formulation',
        summary: 'Inverting the logit relationship directly produces the logistic probability model.',
        formula: 'p = \\frac{1}{1 + e^{-\\theta^T x}}',
        bullets: [
          'If theta^T x = 0, odds = 1:1, corresponding to probability p = 0.5 (the natural decision threshold).',
          'As theta^T x increases to +infinity, p approaches 1 asymptotically.',
          'As theta^T x decreases to -infinity, p approaches 0 asymptotically.'
        ]
      }
    ]
  },
  {
    id: 'm2',
    stepNumber: 2,
    shortTitle: 'Sigmoid Function',
    title: 'Sigmoid function',
    category: 'Activation & Mapping',
    icon: Activity,
    readingStatus: 'yet_to_complete',
    description: 'Mathematical formulation, geometric characteristics, saturation properties, and derivative elegance of the standard logistic sigmoid.',
    keyQuestions: [
      'What are the mathematical symmetries of the logistic sigmoid function?',
      'Why is the derivative sigma prime(z) = sigma(z)(1 - sigma(z)) so computationally efficient?',
      'What is the vanishing gradient problem in the saturation regions of the sigmoid?'
    ],
    coreTheorems: [
      {
        name: 'Sigmoid Definition & Symmetry',
        formula: '\\sigma(z) = \\frac{1}{1 + e^{-z}} = \\frac{e^z}{1 + e^z}, \\quad 1 - \\sigma(z) = \\sigma(-z)',
        explanation: 'Monotonically strictly increasing function mapping (-inf, +inf) smoothly into (0, 1).'
      },
      {
        name: 'First Derivative of Sigmoid',
        formula: '\\frac{d}{dz}\\sigma(z) = \\sigma(z)(1 - \\sigma(z))',
        explanation: 'The derivative can be computed entirely in terms of the function value itself without re-evaluating exp(-z).'
      }
    ],
    concepts: [
      {
        title: 'Mathematical Characteristics',
        badge: 'Analytical Properties',
        summary: 'Smooth S-shaped curve bridging linear activations with probabilistic outputs.',
        bullets: [
          'Domain: (-infinity, +infinity); Range: (0, 1).',
          'Symmetry around inflection point: sigma(0) = 0.5, sigma(-z) = 1 - sigma(z).',
          'Peak derivative: Maximum slope occurs at z = 0 with value sigma prime(0) = 0.5 * 0.5 = 0.25.'
        ]
      },
      {
        title: 'Derivative Derivation Walkthrough',
        badge: 'Calculus Step-by-Step',
        summary: 'Applying the quotient and chain rules to the sigmoid formulation.',
        formula: '\\frac{d}{dz}(1 + e^{-z})^{-1} = -(1 + e^{-z})^{-2}(-e^{-z}) = \\frac{e^{-z}}{(1 + e^{-z})^2} = \\sigma(z)(1 - \\sigma(z))',
        bullets: [
          'Notice how 1 - sigma(z) = 1 - 1/(1 + e^{-z}) = e^{-z}/(1 + e^{-z}).',
          'Multiplication: [1/(1 + e^{-z})] * [e^{-z}/(1 + e^{-z})] = sigma(z) * (1 - sigma(z)).'
        ]
      }
    ]
  },
  {
    id: 'm3',
    stepNumber: 3,
    shortTitle: 'Maximum Likelihood',
    title: 'Logistic Regression & Maximum Likelihood',
    category: 'Likelihood Modeling',
    icon: Binary,
    readingStatus: 'yet_to_complete',
    description: 'Learn what likelihood means, why logistic regression uses the Bernoulli distribution, how p^y(1-p)^(1-y) works, dataset likelihood, and why we maximize the log-likelihood.',
    keyQuestions: [
      'How does binary classification map to a conditional Bernoulli distribution?',
      'How can P(y=1|x) and P(y=0|x) be written as a single unified algebraic expression?',
      'Why does the exponentiation trick y and (1-y) act as a mathematical conditional switch?',
      'Why is maximizing log-likelihood preferred over raw likelihood products?',
      'How does Maximum Likelihood Estimation select optimal parameter weights?'
    ],
    coreTheorems: [
      {
        name: 'Conditional Bernoulli Distribution',
        formula: 'P(y = 1 | x; \\theta) = h_\\theta(x), \\quad P(y = 0 | x; \\theta) = 1 - h_\\theta(x)',
        explanation: 'We treat the target y given x as a Bernoulli random variable with parameter phi = h_theta(x).'
      },
      {
        name: 'Single-Example Likelihood (Compact Form)',
        formula: 'p(y | x; \\theta) = \\left(h_\\theta(x)\\right)^y \\left(1 - h_\\theta(x)\\right)^{1 - y}',
        explanation: 'When y = 1, the second term evaluates to 1; when y = 0, the first term evaluates to 1.'
      },
      {
        name: 'Dataset Likelihood & Log-Likelihood',
        formula: 'L(\\theta) = \\prod_{i=1}^m p(y^{(i)} | x^{(i)}; \\theta), \\quad \\ell(\\theta) = \\sum_{i=1}^m \\left[ y^{(i)} \\ln h_\\theta(x^{(i)}) + (1 - y^{(i)}) \\ln(1 - h_\\theta(x^{(i)})) \\right]',
        explanation: 'Joint probability of observed labels assuming samples are independent and identically distributed, converted to summations via logarithm.'
      }
    ],
    concepts: [
      {
        title: 'The Conditional Switch Formulation',
        badge: 'Compact PMF',
        summary: 'Expressing piecewise probabilities without requiring discontinuous piecewise case notation.',
        bullets: [
          'If y = 1: p(1 | x; theta) = (h_theta(x))^1 * (1 - h_theta(x))^0 = h_theta(x).',
          'If y = 0: p(0 | x; theta) = (h_theta(x))^0 * (1 - h_theta(x))^1 = 1 - h_theta(x).',
          'This single expression is continuous and differentiable with respect to theta, enabling gradient calculus.'
        ]
      },
      {
        title: 'Maximum Likelihood Estimation & Log Transform',
        badge: 'Optimization Objective',
        summary: 'Choosing weights theta that maximize the probability assigned to actually observed outcomes.',
        bullets: [
          'Monotonicity: argmax L(theta) = argmax ln L(theta).',
          'Numerical Stability: Avoids multiplying thousands of probabilities < 1 which cause floating point underflow.',
          'Loss Equivalence: Maximizing log-likelihood is mathematically identical to minimizing Binary Cross-Entropy loss.'
        ]
      }
    ]
  },
  {
    id: 'm5',
    stepNumber: 4,
    shortTitle: 'Gradient Ascent Derivation',
    title: 'Gradient derivation and gradient ascent',
    category: 'Optimization & Calculus',
    icon: TrendingUp,
    readingStatus: 'yet_to_complete',
    description: 'Rigorous step-by-step calculus derivation of the gradient of log-likelihood, comparison with linear regression update rules, and iterative gradient ascent.',
    keyQuestions: [
      'How does the chain rule expand the partial derivative of log-likelihood with respect to weight theta_j?',
      'Why does the gradient formula (y - h_theta(x)) * x_j share the exact same algebraic form as linear regression LMS?',
      'How does gradient ascent (maximizing likelihood) differ in sign from gradient descent (minimizing loss)?'
    ],
    coreTheorems: [
      {
        name: 'Gradient of the Log-Likelihood',
        formula: '\\frac{\\partial \\ell(\\theta)}{\\partial \\theta_j} = \\sum_{i=1}^m \\left( y^{(i)} - h_\\theta(x^{(i)}) \\right) x_j^{(i)}',
        explanation: 'The gradient direction is simply the error (y - prediction) scaled by the input feature value.'
      },
      {
        name: 'Batch Gradient Ascent Parameter Update Rule',
        formula: '\\theta_j := \\theta_j + \\alpha \\sum_{i=1}^m \\left( y^{(i)} - h_\\theta(x^{(i)}) \\right) x_j^{(i)}',
        explanation: 'We add the gradient step because we are maximizing the objective function ell(theta).'
      }
    ],
    concepts: [
      {
        title: 'Step-by-Step Chain Rule Derivation',
        badge: 'Calculus Proof',
        summary: 'Differentiating a single example log-likelihood term with respect to weight theta_j.',
        formula: '\\frac{\\partial}{\\partial \\theta_j} \\ell^{(i)}(\\theta) = \\left( \\frac{y}{h} - \\frac{1-y}{1-h} \\right) \\frac{\\partial h}{\\partial z} \\frac{\\partial z}{\\partial \\theta_j}',
        bullets: [
          'Step 1: Derivative of log-likelihood w.r.t h: y/h - (1-y)/(1-h) = (y - h) / [h(1 - h)].',
          'Step 2: Derivative of sigmoid h = sigma(z) w.r.t z: dh/dz = h(1 - h).',
          'Step 3: Derivative of linear combination z = theta^T x w.r.t theta_j: dz/dtheta_j = x_j.',
          'Result: The h(1 - h) in numerator and denominator cancel out completely, yielding (y - h) * x_j!'
        ]
      }
    ]
  },
  {
    id: 'm6',
    stepNumber: 5,
    shortTitle: 'Generalized Linear Models',
    title: 'Generalized Linear Models',
    category: 'Unified Statistical Framework',
    icon: Layers,
    readingStatus: 'yet_to_complete',
    description: 'The broader theoretical framework uniting Linear Regression (Gaussian), Logistic Regression (Bernoulli), and count regression (Poisson) under one umbrella.',
    keyQuestions: [
      'What limitation of traditional regression led to the development of Generalized Linear Models (Nelder & Wedderburn, 1972)?',
      'What are the three essential components that define every GLM?',
      'Why are GLMs considered "linear" even when their predictions are distinctly non-linear?'
    ],
    coreTheorems: [
      {
        name: 'The Three Components of a GLM',
        formula: '\\text{Random Component: } y \\sim \\text{ExpFamily}(\\eta), \\quad \\text{Systematic Component: } \\eta = \\theta^T x, \\quad \\text{Link Function: } g(\\mu) = \\eta',
        explanation: 'Any distribution from the Exponential Family can be combined with a linear predictor via an appropriate link function.'
      }
    ],
    concepts: [
      {
        title: 'Why Generalized Linear Models?',
        badge: 'Architectural Unification',
        summary: 'Real-world target variables often violate Gaussian normality and homoscedasticity.',
        bullets: [
          'Binary responses (Success/Failure) follow Bernoulli distributions.',
          'Count data (Arrivals per hour, website hits) follow Poisson distributions.',
          'Positive continuous data (Wait times, service durations) follow Gamma or Exponential distributions.',
          'GLMs provide a unified method to estimate parameters for all these targets using identical optimization algorithms.'
        ]
      }
    ]
  },
  {
    id: 'm7',
    stepNumber: 6,
    shortTitle: 'Exponential Family',
    title: 'Exponential family',
    category: 'Distribution Theory',
    icon: Sigma,
    readingStatus: 'yet_to_complete',
    description: 'Canonical representation of distributions, natural parameters, sufficient statistics, log-partition functions, and proofs for Bernoulli and Gaussian.',
    keyQuestions: [
      'What is the standard canonical mathematical formula for an exponential family distribution?',
      'What is the role of the log-partition function a(eta) in determining mean and variance?',
      'How can a Bernoulli distribution with parameter phi be rewritten into canonical exponential family form?'
    ],
    coreTheorems: [
      {
        name: 'Standard Exponential Family Canonical Form',
        formula: 'p(y; \\eta) = b(y) \\exp\\left( \\eta^T T(y) - a(\\eta) \\right)',
        explanation: 'eta: natural parameter; T(y): sufficient statistic; a(eta): log-partition function; b(y): base measure.'
      },
      {
        name: 'Moments from Log-Partition Function',
        formula: '\\mathbb{E}[T(y)] = \\nabla_\\eta a(\\eta), \\quad \\text{Var}(T(y)) = \\nabla_\\eta^2 a(\\eta)',
        explanation: 'Differentiating the log-partition function a(eta) directly yields the mean and covariance of the sufficient statistic.'
      }
    ],
    concepts: [
      {
        title: 'Bernoulli as an Exponential Family',
        badge: 'Canonical Derivation',
        summary: 'Expressing p(y; phi) = phi^y (1-phi)^(1-y) in exponential format.',
        formula: 'p(y) = \\exp\\left( y \\ln\\left(\\frac{\\phi}{1-\\phi}\\right) + \\ln(1-\\phi) \\right)',
        bullets: [
          'Natural parameter: eta = ln(phi / (1 - phi)), which is the log-odds (logit)!',
          'Sufficient statistic: T(y) = y.',
          'Log-partition function: a(eta) = -ln(1 - phi) = ln(1 + e^eta).',
          'Base measure: b(y) = 1.'
        ]
      },
      {
        title: 'Gaussian as an Exponential Family',
        badge: 'Gaussian Proof',
        summary: 'Rewriting standard Gaussian N(mu, 1) into canonical exponential family form.',
        formula: 'p(y; \\mu) = \\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{1}{2}(y-\\mu)^2} = \\frac{1}{\\sqrt{2\\pi}}e^{-\\frac{y^2}{2}} \\exp\\left( \\mu y - \\frac{\\mu^2}{2} \\right)',
        bullets: [
          'Natural parameter: eta = mu.',
          'Sufficient statistic: T(y) = y.',
          'Log-partition: a(eta) = eta^2 / 2.',
          'Base measure: b(y) = (1 / sqrt(2*pi)) * exp(-y^2 / 2).'
        ]
      }
    ]
  },
  {
    id: 'm8',
    stepNumber: 7,
    shortTitle: 'Constructing GLMs',
    title: 'Constructing GLMs',
    category: 'Design & Link Functions',
    icon: Wrench,
    readingStatus: 'yet_to_complete',
    description: 'Systematic recipe for deriving machine learning hypotheses from exponential family distributions, canonical response functions, and softmax regression.',
    keyQuestions: [
      'What are the 3 foundational assumptions needed to construct a GLM for a new problem?',
      'Why does the canonical response function for Bernoulli naturally produce the sigmoid function?',
      'How does extending the GLM recipe to the Multinomial distribution derive Softmax Regression?'
    ],
    coreTheorems: [
      {
        name: 'The 3 GLM Construction Postulates',
        formula: '1) \\; y|x;\\theta \\sim \\text{ExpFamily}(\\eta) \\quad 2) \\; h(x) = \\mathbb{E}[y|x] \\quad 3) \\; \\eta = \\theta^T x',
        explanation: 'Linear combination theta^T x sets natural parameter eta, and hypothesis h(x) equals the expected response.'
      },
      {
        name: 'Canonical Response vs Link Function',
        formula: 'g(\\eta) = \\mathbb{E}[y; \\eta] = h_\\theta(x), \\quad g^{-1}(\\mu) = \\theta^T x',
        explanation: 'The response function g maps eta to the mean mu; its inverse g^{-1} is the canonical link function.'
      }
    ],
    concepts: [
      {
        title: 'Deriving Logistic Regression from the GLM Recipe',
        badge: 'Formal Justification',
        summary: 'Why does logistic regression use the sigmoid? Because of the GLM construction postulates!',
        bullets: [
          'Postulate 1: Model y|x as Bernoulli(phi). We showed eta = ln(phi / (1 - phi)).',
          'Solving for phi: phi = 1 / (1 + e^(-eta)).',
          'Postulate 2: h_theta(x) = E[y|x] = phi.',
          'Postulate 3: eta = theta^T x.',
          'Conclusion: h_theta(x) = 1 / (1 + e^(-theta^T x)). The sigmoid is not an arbitrary choice; it is mathematically forced by the Bernoulli GLM!'
        ]
      },
      {
        title: 'Multinomial GLM (Softmax Regression)',
        badge: 'Multi-Class Extension',
        summary: 'When y takes one of K discrete classes, the GLM yields the softmax activation.',
        formula: 'P(y = k | x; \\theta) = \\frac{e^{\\theta_k^T x}}{\\sum_{j=1}^K e^{\\theta_j^T x}}',
        bullets: [
          'Generalizes binary logistic regression to multi-class classification.',
          'Also known as Multinomial Logistic Regression or Maximum Entropy classifier.'
        ]
      }
    ]
  },
  {
    id: 'm9',
    stepNumber: 8,
    shortTitle: 'Naive Bayes',
    title: 'Naive Bayes',
    category: 'Generative Classifiers',
    icon: GitBranch,
    readingStatus: 'yet_to_complete',
    description: 'Generative vs. discriminative learning paradigms, Bayes rule application, the conditional independence assumption, text classification, and Laplace smoothing.',
    keyQuestions: [
      'What is the fundamental difference between discriminative models P(y|x) and generative models P(x|y)P(y)?',
      'What conditional independence assumption does Naive Bayes make about feature inputs?',
      'Why is Laplace smoothing (add-one smoothing) essential to prevent zero-probability traps?'
    ],
    coreTheorems: [
      {
        name: 'Generative Bayes Decision Rule',
        formula: 'P(y | x) = \\frac{P(x | y) P(y)}{P(x)} = \\frac{P(x | y) P(y)}{\\sum_{y\'} P(x | y\') P(y\')}',
        explanation: 'We select the class that maximizes the joint numerator P(x | y) * P(y).'
      },
      {
        name: 'Naive Conditional Independence Assumption',
        formula: 'P(x_1, x_2, \\dots, x_n | y) = \\prod_{j=1}^n P(x_j | y)',
        explanation: 'Drastically reduces required model parameters from exponential 2^n to linear n.'
      },
      {
        name: 'Laplace Smoothing (Add-1 Smoothing)',
        formula: '\\phi_{j|y=1} = \\frac{\\sum_{i=1}^m \\mathbf{1}\\{x_j^{(i)} = 1 \\land y^{(i)} = 1\\} + 1}{\\sum_{i=1}^m \\mathbf{1}\\{y^{(i)} = 1\\} + 2}',
        explanation: 'Prevents multiplying by 0 when evaluating an unseen word or feature at test time.'
      }
    ],
    concepts: [
      {
        title: 'Generative vs Discriminative Paradigm',
        badge: 'Core Philosophy',
        summary: 'Two fundamentally distinct philosophical approaches to classification.',
        bullets: [
          'Discriminative (Logistic Regression, SVM, Perceptron): Directly learns the decision boundary P(y|x). Focuses only on discriminating classes.',
          'Generative (Naive Bayes, GDA, HMMs): Learns how each class generates features via P(x|y) and class prevalence P(y). Can generate synthetic data.'
        ]
      },
      {
        title: 'The Zero-Probability Trap & Laplace Smoothing',
        badge: 'Engineering Safeguard',
        summary: 'If a test sample contains an unfamiliar token, the entire product collapses to 0 without smoothing.',
        bullets: [
          'Suppose word "cryptocurrency" never appeared in training spam emails: P("cryptocurrency" | spam) = 0.',
          'Because of the product rule, the whole posterior becomes 0 regardless of all other spam indicators!',
          'Laplace smoothing adds a virtual observation to every category to ensure non-zero probability.'
        ]
      }
    ]
  },
  {
    id: 'm10',
    stepNumber: 9,
    shortTitle: 'MLE vs MAP',
    title: 'MLE versus MAP',
    category: 'Statistical Estimation',
    icon: Scale,
    readingStatus: 'yet_to_complete',
    description: 'Frequentist Maximum Likelihood Estimation vs Bayesian Maximum A Posteriori, prior distributions, conjugate priors, and their exact equivalence to L1/L2 regularization.',
    keyQuestions: [
      'What is the conceptual difference between treating theta as an unknown fixed constant vs a random variable?',
      'How does MAP estimation incorporate prior domain knowledge P(theta)?',
      'Why is MAP with a zero-mean Gaussian prior mathematically identical to Ridge Regularization (L2)?'
    ],
    coreTheorems: [
      {
        name: 'Maximum Likelihood Estimation (MLE)',
        formula: '\\theta_{\\text{MLE}} = \\arg\\max_\\theta P(\\mathcal{D} | \\theta) = \\arg\\max_\\theta \\sum_{i=1}^m \\ln P(y^{(i)} | x^{(i)}; \\theta)',
        explanation: 'Selects the parameter vector under which the observed dataset has the highest probability.'
      },
      {
        name: 'Maximum A Posteriori Estimation (MAP)',
        formula: '\\theta_{\\text{MAP}} = \\arg\\max_\\theta P(\\theta | \\mathcal{D}) = \\arg\\max_\\theta \\left[ \\sum_{i=1}^m \\ln P(y^{(i)} | x^{(i)}; \\theta) + \\ln P(\\theta) \\right]',
        explanation: 'Balances fit to the training data against agreement with a prior distribution P(theta).'
      }
    ],
    concepts: [
      {
        title: 'Frequentist vs Bayesian Worldview',
        badge: 'Philosophical Divide',
        summary: 'The interpretation of model weights theta distinguishes the two schools of statistics.',
        bullets: [
          'MLE (Frequentist): theta is an objective, true constant of nature. We only evaluate data likelihood P(D|theta). In small datasets, MLE overfits severely.',
          'MAP (Bayesian): theta is a random variable characterized by a prior belief P(theta). The data D updates this belief to posterior P(theta|D).'
        ]
      },
      {
        title: 'MAP and Regularization Duality',
        badge: 'Mathematical Equivalence',
        summary: 'Classic regularization penalties are exact MAP estimators under specific parameter priors.',
        formula: '\\theta_{\\text{MAP}} = \\arg\\min_\\theta \\left[ J(\\theta) + \\lambda \\Omega(\\theta) \\right]',
        bullets: [
          'Gaussian Prior: P(theta) ~ N(0, sigma^2 I) ==> log P(theta) ~ - ||theta||_2^2 ==> L2 Regularization (Ridge Regression / Weight Decay).',
          'Laplace Prior: P(theta) ~ Laplace(0, b) ==> log P(theta) ~ - ||theta||_1 ==> L1 Regularization (Lasso / Sparsity Promotion).'
        ]
      }
    ]
  }
];

export const ML_WEEK2_CHEATSHEET_FORMULAS = [
  {
    title: 'Logistic Hypothesis & Odds',
    formulas: [
      'h_\\theta(x) = \\sigma(\\theta^T x) = \\frac{1}{1 + e^{-\\theta^T x}}',
      '\\ln\\left(\\frac{h_\\theta(x)}{1 - h_\\theta(x)}\\right) = \\theta^T x'
    ]
  },
  {
    title: 'Sigmoid Derivative',
    formulas: [
      '\\sigma\'(z) = \\sigma(z)(1 - \\sigma(z))'
    ]
  },
  {
    title: 'Log-Likelihood & Gradient Ascent',
    formulas: [
      '\\ell(\\theta) = \\sum_{i=1}^m \\left[ y^{(i)} \\ln h_\\theta(x^{(i)}) + (1 - y^{(i)}) \\ln(1 - h_\\theta(x^{(i)})) \\right]',
      '\\theta_j := \\theta_j + \\alpha \\sum_{i=1}^m \\left( y^{(i)} - h_\\theta(x^{(i)}) \\right) x_j^{(i)}'
    ]
  },
  {
    title: 'Exponential Family Canonical Form',
    formulas: [
      'p(y; \\eta) = b(y) \\exp\\left( \\eta^T T(y) - a(\\eta) \\right)',
      '\\mathbb{E}[y|x] = \\nabla_\\eta a(\\eta)'
    ]
  },
  {
    title: 'Naive Bayes Product Rule',
    formulas: [
      'P(y = 1 | x) = \\frac{P(y=1) \\prod_{j=1}^n P(x_j | y=1)}{P(x)}'
    ]
  },
  {
    title: 'MLE vs MAP Objective',
    formulas: [
      '\\theta_{\\text{MLE}} = \\arg\\max_\\theta \\ln P(\\mathcal{D} | \\theta)',
      '\\theta_{\\text{MAP}} = \\arg\\max_\\theta \\left[ \\ln P(\\mathcal{D} | \\theta) + \\ln P(\\theta) \\right]'
    ]
  }
];
