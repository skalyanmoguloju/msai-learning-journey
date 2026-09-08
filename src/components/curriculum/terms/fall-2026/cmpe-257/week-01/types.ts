import React from 'react';
import {
  Compass,
  TrendingUp,
  Network,
  Bot,
  Sliders,
  Layers
} from 'lucide-react';

export interface ConceptItem {
  title: string;
  badge?: string;
  summary: string;
  bullets: string[];
  formula?: string;
  code?: string;
}

export interface MLModule {
  id: string;
  stepNumber: number;
  shortTitle: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  simulatorTitle?: string;
  description: string;
  concepts: ConceptItem[];
}

export const ML_MODULES: MLModule[] = [
  {
    id: 'm1',
    stepNumber: 1,
    shortTitle: 'ML Fundamentals',
    title: 'Machine Learning Fundamentals & Definitions',
    category: 'Foundations & Paradigms',
    icon: Compass,
    description: 'Foundational definitions, historical perspectives, and high-level categorization into Supervised, Unsupervised, and Reinforcement paradigms.',
    concepts: [
      {
        title: "Arthur Samuel's Definition (1959)",
        badge: "Historical Core",
        summary: "Field of study that gives computers the ability to learn without being explicitly programmed.",
        bullets: [
          "Pioneered machine learning via checkers-playing programs that improved through self-play.",
          "Shifted paradigm from hardcoded rules to learning patterns from empirical data."
        ]
      },
      {
        title: "Herbert Simon's Perspective (1983)",
        badge: "System Optimization",
        summary: "Learning denotes changes in a system that enable it to do the same task more efficiently next time.",
        bullets: [
          "Focuses on algorithmic self-improvement, adaptability, and execution efficiency.",
          "Links machine learning closely to cognitive science and automated decision systems."
        ]
      },
      {
        title: "Tom Mitchell's Formal Definition (1997)",
        badge: "Engineering Standard",
        summary: "A computer program is said to learn from Experience E with respect to Task T and Performance measure P if its performance at tasks in T, as measured by P, improves with experience E.",
        formula: "\\text{Learning Criteria: } P(T) \\text{ increases as } E \\text{ grows}",
        bullets: [
          "Task (T): Classifying spam emails, predicting house prices, driving autonomously.",
          "Experience (E): Historical database of labeled emails, previous market transactions, driving logs.",
          "Performance (P): Accuracy percentage, Mean Squared Error (MSE), collision-free mileage."
        ]
      },
      {
        title: "Taxonomy of Machine Learning",
        badge: "Paradigm Overview",
        summary: "Classification of ML algorithms based on the type of feedback and dataset structure provided during training.",
        bullets: [
          "Supervised Learning: Learning mapping function $f: X \\to Y$ from labeled data $(x^{(i)}, y^{(i)})$.",
          "Unsupervised Learning: Discovering hidden structures, clusters, or lower-dimensional representations in unlabeled data $\\{x^{(i)}\\}$.",
          "Reinforcement Learning: Learning action policies $\\pi(a|s)$ via trial-and-error interactions to maximize cumulative reward."
        ]
      }
    ]
  },
  {
    id: 'm2',
    stepNumber: 2,
    shortTitle: 'Supervised & Linear',
    title: 'Supervised Learning & Linear Models',
    category: 'Regression & Optimization',
    icon: TrendingUp,
    simulatorTitle: 'Interactive Gradient Descent Visualizer',
    description: 'Formal formulation of supervised learning, hypothesis functions, cost function optimization via Gradient Descent, analytic solutions, and second-order methods.',
    concepts: [
      {
        title: "Supervised Learning Setup",
        badge: "Formal Framework",
        summary: "Mapping input features $x \\in \\mathbb{R}^d$ to target outputs $y$ via hypothesis function $h_\\theta(x)$.",
        formula: "\\mathcal{D} = \\{(x^{(1)}, y^{(1)}), \\dots, (x^{(m)}, y^{(m)})\\}",
        bullets: [
          "Regression: Target variable $y$ is continuous (e.g., predicting real-estate pricing).",
          "Classification: Target variable $y$ is discrete class labels (e.g., Spam vs. Non-Spam).",
          "Computer Vision & NLP: Object detection, semantic segmentation, automated machine translation."
        ]
      },
      {
        title: "Linear Regression & Mean Squared Error",
        badge: "Core Model",
        summary: "Modeling relationship using linear combination of input features parameterized by weight vector $\\theta$.",
        formula: "h_\\theta(x) = \\theta^T x = \\sum_{j=0}^d \\theta_j x_j \\quad (x_0 = 1), \\quad J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^m \\left(h_\\theta(x^{(i)}) - y^{(i)}\\right)^2",
        bullets: [
          "Cost Function $J(\\theta)$: Measures average squared deviation over $m$ training samples.",
          "Convex parabolic loss surface guarantees that any local minimum is a global minimum."
        ],
        code: `import numpy as np

def compute_cost(X, y, theta):
    m = len(y)
    predictions = X.dot(theta)
    cost = (1 / (2 * m)) * np.sum((predictions - y) ** 2)
    return cost`
      },
      {
        title: "Gradient Descent Variants",
        badge: "Optimization Algorithms",
        summary: "Iterative optimization techniques for updating parameters in the direction of steepest loss decrease.",
        bullets: [
          "Least Mean Squares (LMS) / Widrow-Hoff: Derivative-based update rule $\\theta_j := \\theta_j + \\alpha (y^{(i)} - h_\\theta(x^{(i)})) x_j^{(i)}$.",
          "Batch Gradient Descent (BGD): Computes exact gradient over all $m$ examples per step. Stable but computationally heavy for large datasets.",
          "Stochastic Gradient Descent (SGD): Updates parameters based on 1 sample at a time. Faster, escapes local minima, but noisy gradient trajectory.",
          "Mini-Batch Gradient Descent (MBGD): Balances speed and convergence stability using small batches (e.g., 32, 64, 128 samples)."
        ],
        code: `def mini_batch_gd(X, y, theta, lr=0.01, batch_size=32, epochs=100):
    m = len(y)
    for epoch in range(epochs):
        indices = np.random.permutation(m)
        X_shuffled, y_shuffled = X[indices], y[indices]
        for i in range(0, m, batch_size):
            X_i = X_shuffled[i:i+batch_size]
            y_i = y_shuffled[i:i+batch_size]
            gradients = (1 / len(y_i)) * X_i.T.dot(X_i.dot(theta) - y_i)
            theta -= lr * gradients
    return theta`
      },
      {
        title: "Analytic Solution & Newton's Method",
        badge: "Direct Solutions",
        summary: "Closed-form algebraic parameter calculation and second-order optimization methods.",
        formula: "\\text{Normal Equation: } \\theta = (X^T X)^{-1} X^T y",
        bullets: [
          "Normal Equations: Sets $\\nabla_\\theta J(\\theta) = 0$ to solve $\\theta$ directly without iterative hyperparameter tuning.",
          "Newton's Method: Second-order optimization using Hessian matrix $H$: $\\theta := \\theta - H^{-1} \\nabla_\\theta J(\\theta)$. Converges quadratic-fast but requires computing $O(n^3)$ Hessian inverse."
        ]
      }
    ]
  },
  {
    id: 'm3',
    stepNumber: 3,
    shortTitle: 'Unsupervised',
    title: 'Unsupervised Learning Concepts',
    category: 'Clustering & Density',
    icon: Network,
    simulatorTitle: 'Interactive K-Means Step Visualizer',
    description: 'Discovering hidden geometric structures, clustering data partitions, and projecting continuous high-dimensional manifolds without supervision signals.',
    concepts: [
      {
        title: "K-Means Clustering Formulation",
        badge: "Centroid Partitioning",
        summary: "Partitioning $m$ unlabeled observations into $K$ clusters such that each observation belongs to the cluster with the nearest centroid.",
        formula: "J(c, \\mu) = \\sum_{i=1}^m \\|x^{(i)} - \\mu_{c^{(i)}}\\|^2",
        bullets: [
          "Coordinates step between assignment: $c^{(i)} := \\arg\\min_j \\|x^{(i)} - \\mu_j\\|^2$.",
          "Centroid relocation step: $\\mu_j := \\frac{1}{|C_j|} \\sum_{i \\in C_j} x^{(i)}$.",
          "Guaranteed to monotonically decrease objective $J$ until local convergence."
        ]
      },
      {
        title: "Principal Component Analysis (PCA)",
        badge: "Dimensionality Reduction",
        summary: "Orthogonal linear transformation projecting data onto principal axes of maximal variance.",
        formula: "\\Sigma = \\frac{1}{m} X^T X, \\quad \\Sigma v_i = \\lambda_i v_i",
        bullets: [
          "Projects $d$-dimensional feature vectors onto top $k$ eigenvectors corresponding to largest eigenvalues $\\lambda$.",
          "Minimizes reconstruction projection error while maximizing preserved variance."
        ]
      },
      {
        title: "Autoencoders & Latent Embeddings",
        badge: "Neural Compression",
        summary: "Neural network architectures trained to reconstruct input features through an informational bottleneck.",
        formula: "\\mathcal{L}_{AE}(x, \\hat{x}) = \\|x - g(f(x))\\|^2",
        bullets: [
          "Encoder $z = f(x)$ maps high-dimensional input into compressed low-dimensional latent space.",
          "Decoder $\\hat{x} = g(z)$ reconstructs original input from latent embedding."
        ]
      }
    ]
  },
  {
    id: 'm4',
    stepNumber: 4,
    shortTitle: 'Reinforcement & Control',
    title: 'Reinforcement Learning & Agent Control',
    category: 'Dynamic Control',
    icon: Bot,
    simulatorTitle: 'Interactive GridWorld Agent Simulator',
    description: 'Markov Decision Processes (MDP), policy optimization, reward signals, and tabular Q-learning dynamics.',
    concepts: [
      {
        title: "Markov Decision Process (MDP)",
        badge: "Formal Environment",
        summary: "Mathematical framework for modeling decision making where outcomes are partly random and partly under the control of an agent.",
        formula: "\\mathcal{M} = \\langle \\mathcal{S}, \\mathcal{A}, \\mathcal{P}, \\mathcal{R}, \\gamma \\rangle",
        bullets: [
          "Markov Property: Future states depend only upon current state $s_t$ and action $a_t$, not previous history.",
          "Discount factor $\\gamma \\in [0, 1)$ balances immediate versus future rewards."
        ]
      },
      {
        title: "Bellman Optimality Equation & Q-Learning",
        badge: "Value Iteration",
        summary: "Decomposing value function into immediate reward plus discounted expected future values.",
        formula: "Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ r + \\gamma \\max_{a'} Q(s', a') - Q(s, a) \\right]",
        bullets: [
          "Temporal Difference error $[r + \\gamma \\max_{a'} Q(s', a') - Q(s, a)]$ guides model-free learning.",
          "$\\epsilon$-greedy exploration balances exploring new state-action pairs versus exploiting best known actions."
        ]
      }
    ]
  },
  {
    id: 'm5',
    stepNumber: 5,
    shortTitle: 'Generalization & Bounds',
    title: 'Generalization, Overfitting & Model Selection',
    category: 'Statistical Learning Theory',
    icon: Sliders,
    simulatorTitle: 'Interactive Polynomial Overfitting Sandbox',
    description: 'Bias-Variance decomposition, Hoeffding bounds, PAC learning, regularization techniques (L1/L2), and validation splits.',
    concepts: [
      {
        title: "Bias-Variance Decomposition",
        badge: "Error Analysis",
        summary: "Decomposition of expected generalization error into three fundamental sources.",
        formula: "\\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2",
        bullets: [
          "Bias Error: Assumptions made by the model to make target function easier to learn (underfitting).",
          "Variance Error: Sensitivity to small fluctuations in training set (overfitting).",
          "Irreducible Noise $\\sigma^2$: Inherent variance in target distribution."
        ]
      },
      {
        title: "Regularization: Ridge (L2) vs Lasso (L1)",
        badge: "Capacity Control",
        summary: "Adding penalty terms to loss function to suppress parameter magnitude and prevent overfitting.",
        formula: "J_{\\text{Ridge}}(\\theta) = J(\\theta) + \\lambda \\|\\theta\\|_2^2, \\quad J_{\\text{Lasso}}(\\theta) = J(\\theta) + \\lambda \\|\\theta\\|_1",
        bullets: [
          "Ridge (L2): Shrinks weights toward zero continuously, stabilizing multicollinearity.",
          "Lasso (L1): Generates sparse solutions by driving non-critical feature coefficients exactly to zero."
        ]
      }
    ]
  },
  {
    id: 'm6',
    stepNumber: 6,
    shortTitle: 'Modern Paradigms',
    title: 'Modern ML Paradigms & Software 2.0',
    category: 'Systems & Deep Learning',
    icon: Layers,
    description: 'Karpathy Software 2.0 paradigm analysis, Reverse-Mode Automatic Differentiation, Deep Learning pipelines, and responsible ML ethics.',
    concepts: [
      {
        title: "Software 2.0 (Andrej Karpathy)",
        badge: "Paradigm Shift",
        summary: "Shift from explicit human-coded logic to optimization over dataset neural network weight spaces.",
        bullets: [
          "Software 1.0: Explicit logic written in languages like C++, Python, or Java.",
          "Software 2.0: Program written as neural network weight configurations learned via gradient descent optimization.",
          "Key advantages include uniform computational graph execution and constant runtime memory profiles."
        ]
      },
      {
        title: "Deep Learning vs Traditional Pipelines",
        badge: "Architectural Comparison",
        summary: "End-to-end automatic feature learning vs. manual feature engineering workflows.",
        bullets: [
          "Traditional ML: Requires manual domain-specific feature extraction (e.g. SIFT, HOG, TF-IDF) before feeding simple classifiers.",
          "Deep Learning: Automatic hierarchical representation learning directly from raw inputs (pixels, audio waveforms)."
        ]
      },
      {
        title: "Feature Selection & Ethics / Fairness",
        badge: "Responsible AI",
        summary: "Selecting impactful features and mitigating algorithmic bias.",
        bullets: [
          "Feature Selection: Filter methods, Wrapper methods, and Lasso L1 Regularization for sparsity.",
          "Ethics & Fairness: Preventing historical dataset bias propagation and ensuring demographic parity."
        ]
      }
    ]
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
