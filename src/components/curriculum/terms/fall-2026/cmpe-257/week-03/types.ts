import React from 'react';
import {
  HelpCircle,
  GitFork,
  Network,
  Binary,
  Layers,
  Zap,
  TrendingUp,
  BarChart2,
  TreeDeciduous,
  Cpu
} from 'lucide-react';

export interface ConceptItem {
  title: string;
  badge?: string;
  summary: string;
  bullets: string[];
  formula?: string;
  code?: string;
}

export interface MLWeek3Module {
  id: string;
  stepNumber: number;
  shortTitle: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  readingStatus: 'in_progress' | 'completed' | 'yet_to_complete';
  description: string;
  keyQuestions: string[];
  coreTheorems: { name: string; formula: string; explanation: string }[];
  concepts: ConceptItem[];
}

export const ML_WEEK3_MODULES: MLWeek3Module[] = [
  {
    id: 'm1',
    stepNumber: 1,
    shortTitle: 'Why Decision Trees?',
    title: 'Why decision trees?',
    category: 'Motivation & Intuition',
    icon: HelpCircle,
    readingStatus: 'completed',
    description: 'Human interpretability, white-box rules, overcoming linearity assumptions, handling mixed numerical and categorical features without scaling, and robustness to monotonic transformations.',
    keyQuestions: [
      'Why do complex non-linear relationships break standard linear and logistic classifiers without manual feature engineering?',
      'How do decision trees offer direct human interpretability through explicit if-then decision rules?',
      'Why are decision tree split decisions invariant to monotonic feature scaling (e.g. log transforms, standardization)?'
    ],
    coreTheorems: [
      {
        name: 'Recursive Axis-Aligned Partitioning',
        formula: 'R_m = \\{x \\mid x_j \\le s\\} \\cup \\{x \\mid x_j > s\\}',
        explanation: 'Trees partition feature space into high-dimensional hyper-rectangles using greedy axis-parallel cuts.'
      },
      {
        name: 'Scale Invariance of Rank Splits',
        formula: 'f(x_j) > f(s) \\iff x_j > s \\quad \\forall \\text{ monotonic strictly increasing } f',
        explanation: 'Any monotonic transformation preserves rank order, leaving optimal split thresholds mathematically identical.'
      }
    ],
    concepts: [
      {
        title: 'Interpretability & White-Box Decision Logic',
        badge: 'Rule Induction',
        summary: 'Unlike black-box models, a decision tree can be translated directly into a human-readable flowchart.',
        bullets: [
          'High auditability: Every prediction traces a clear path from root to leaf node.',
          'Critical for regulated industries (healthcare diagnosis, credit underwriting, legal risk).',
          'Feature interactions (e.g., "if Age > 50 AND Cholesterol > 240") are modeled automatically without polynomial expansions.'
        ]
      },
      {
        title: 'Non-Linear Boundaries via Step Functions',
        badge: 'Non-Parametric',
        summary: 'Approximating complex non-linear functions as piecewise constant functions across rectangular regions.',
        bullets: [
          'Requires no assumptions of normality, homoscedasticity, or linearity.',
          'Splits partition space into distinct decision regions with uniform predictions.',
          'Handles heterogeneous data (combining continuous, categorical, and ordinal features seamlessly).'
        ]
      }
    ]
  },
  {
    id: 'm2',
    stepNumber: 2,
    shortTitle: 'Decision-Tree Fundamentals',
    title: 'Decision-tree fundamentals',
    category: 'Tree Architecture',
    icon: TreeDeciduous,
    readingStatus: 'completed',
    description: 'Anatomy of trees (root, internal test nodes, branches, leaves), greedy top-down induction (ID3/C4.5/CART), recursive splitting, stop conditions, and controlling tree depth.',
    keyQuestions: [
      'What are the constituent components of a decision tree (root node, decision nodes, leaf nodes)?',
      'Why is global tree optimization NP-complete, requiring greedy top-down recursive splitting?',
      'What stopping criteria prevent infinite recursion and pathological memorization?'
    ],
    coreTheorems: [
      {
        name: 'Leaf Output Prediction Formulation',
        formula: '\\hat{y}_{R_m} = \\arg\\max_k \\sum_{i \\in R_m} \\mathbf{1}\\{y^{(i)} = k\\} \\quad \\text{or} \\quad \\hat{y}_{R_m} = \\frac{1}{|R_m|} \\sum_{i \\in R_m} y^{(i)}',
        explanation: 'Leaf nodes predict either majority class (classification) or sample mean of regional targets (regression).'
      },
      {
        name: 'Greedy Split Evaluation',
        formula: '\\max_{j, s} \\Delta I(D, j, s) = I(D) - \\left( \\frac{|D_L|}{|D|} I(D_L) + \\frac{|D_R|}{|D|} I(D_R) \\right)',
        explanation: 'At each node, the feature j and threshold s are chosen to maximize immediate impurity reduction.'
      }
    ],
    concepts: [
      {
        title: 'Tree Anatomy & Traversal',
        badge: 'Structural Components',
        summary: 'Hierarchical graph structure routing instances from top to bottom based on attribute predicates.',
        bullets: [
          'Root Node: Top-most node containing 100% of the training dataset.',
          'Internal Nodes: Decision gates evaluating a single predicate (e.g., $x_j \\le s$).',
          'Branches: Outgoing paths corresponding to predicate outcomes (True / False).',
          'Leaf Nodes (Terminal): End points containing regional target predictions.'
        ]
      },
      {
        title: 'Greedy Recursive Partitioning',
        badge: 'Induction Strategy',
        summary: 'Top-down divide-and-conquer strategy without backtracking.',
        bullets: [
          'Finding the optimal binary decision tree is an NP-complete search problem.',
          'Greedy heuristics search all features $j$ and candidate thresholds $s$ to maximize immediate impurity drop.',
          'Stopping criteria: Max depth reached, node sample size $< N_{\\min}$, or zero impurity.'
        ]
      }
    ]
  },
  {
    id: 'm3',
    stepNumber: 3,
    shortTitle: 'Classification Trees & Split Criteria',
    title: 'Classification trees and split criteria',
    category: 'Split Metrics',
    icon: Binary,
    readingStatus: 'completed',
    description: 'Measuring node impurity: Shannon Entropy, Information Gain, Information Gain Ratio, Gini Impurity, Misclassification Error, and comparing split objectives.',
    keyQuestions: [
      'What is Shannon Entropy, and how does Information Gain measure uncertainty reduction?',
      'How does Gini Impurity differ mathematically and computationally from Entropy?',
      'Why is Misclassification Error unsuitable as a splitting metric despite its intuitive appeal?'
    ],
    coreTheorems: [
      {
        name: 'Shannon Entropy & Gini Impurity',
        formula: 'H(D) = -\\sum_{k=1}^K p_k \\log_2 p_k, \\quad Gini(D) = 1 - \\sum_{k=1}^K p_k^2 = \\sum_{k=1}^K p_k(1 - p_k)',
        explanation: 'Both metrics reach 0 for perfectly pure nodes and peak at uniform distributions ($p_k = 1/K$).'
      },
      {
        name: 'Information Gain',
        formula: 'IG(D, A) = H(D) - \\sum_{v \\in \\text{Values}(A)} \\frac{|D_v|}{|D|} H(D_v)',
        explanation: 'Difference between parent entropy and weighted sum of child node entropies.'
      }
    ],
    concepts: [
      {
        title: 'Entropy vs. Gini Impurity',
        badge: 'Impurity Metrics',
        summary: 'Two distinct mathematical approaches to quantifying categorical disorder.',
        bullets: [
          'Entropy: Information-theoretic measure of bits needed to encode a class label.',
          'Gini Impurity: Probability that two randomly selected instances from the node belong to different classes.',
          'Computational difference: Gini avoids costly transcendental $\\log_2$ evaluations, making it preferred in CART.'
        ]
      },
      {
        title: 'Failure of Misclassification Error for Splitting',
        badge: 'Strict Convexity',
        summary: 'Why $E(p) = 1 - \\max(p_k)$ fails to differentiate good splits.',
        bullets: [
          'Misclassification error is piecewise linear and not strictly convex.',
          'A split that isolates a pure sub-node may leave overall error unchanged, hiding progress.',
          'Entropy and Gini are strictly concave, ensuring any purity concentration registers as a positive gain.'
        ]
      }
    ]
  },
  {
    id: 'm4',
    stepNumber: 4,
    shortTitle: 'Regression Trees & CART',
    title: 'Regression trees and CART',
    category: 'Continuous Targets',
    icon: TrendingUp,
    readingStatus: 'completed',
    description: 'Continuous target prediction, variance reduction splitting, Cost-Complexity Pruning (minimal cost-complexity pruning), the alpha parameter, and bias-variance tradeoff.',
    keyQuestions: [
      'How does split criteria change from classification (impurity) to regression (variance reduction / MSE)?',
      'What is Cost-Complexity Pruning, and how does the tuning parameter alpha trade off tree size against data fit?',
      'Why do unpruned decision trees suffer from notoriously high variance?'
    ],
    coreTheorems: [
      {
        name: 'Regression Tree Variance Split Criterion',
        formula: '\\min_{j, s} \\left[ \\sum_{i \\in R_1(j, s)} (y^{(i)} - \\bar{y}_{R_1})^2 + \\sum_{i \\in R_2(j, s)} (y^{(i)} - \\bar{y}_{R_2})^2 \\right]',
        explanation: 'Selects the feature and threshold that minimize total sum of squared residuals in child partitions.'
      },
      {
        name: 'Cost-Complexity Pruning Objective',
        formula: 'R_\\alpha(T) = R(T) + \\alpha |T| = \\sum_{m=1}^{|T|} N_m Q_m(T) + \\alpha |T|',
        explanation: 'Penalizes large trees with penalty parameter alpha proportional to the number of leaf nodes |T|.'
      }
    ],
    concepts: [
      {
        title: 'Piecewise Constant Regression Surfaces',
        badge: 'Regression Geometry',
        summary: 'Approximating real-valued response variables by averaging target values within localized partitions.',
        bullets: [
          'Leaf prediction is simply the regional arithmetic mean: $\\hat{y} = \\frac{1}{N_m} \\sum_{i \\in R_m} y_i$.',
          'Output resembles step-wise staircase functions.',
          'Cannot extrapolate trends beyond the minimum and maximum target bounds seen in training.'
        ]
      },
      {
        title: 'Cost-Complexity Pruning Algorithm',
        badge: 'Regularization',
        summary: 'Growing an oversized tree $T_0$ and collapsing weakest branches back up.',
        bullets: [
          'Growing deep captures subtle multi-way interactions that greedy heuristics might miss at early depths.',
          'Pruning systematically collapses subtrees with the lowest effective cost-complexity gain.',
          'Optimal parameter $\\alpha$ is selected via $K$-fold cross-validation.'
        ]
      }
    ]
  },
  {
    id: 'm5',
    stepNumber: 5,
    shortTitle: 'Bagging & Random Forests',
    title: 'Bagging and random forests',
    category: 'Ensemble Learning',
    icon: Layers,
    readingStatus: 'completed',
    description: 'Ensemble theory, Bootstrap Aggregation (Bagging), Out-of-Bag (OOB) validation error, Random Forest feature subsampling (mtry), tree decorrelation, and variance reduction.',
    keyQuestions: [
      'Why does averaging multiple high-variance estimators reduce total variance without increasing bias?',
      'How does Bootstrap Aggregation generate distinct pseudo-replicate training sets?',
      'Why does Random Forest randomly restrict feature choices at each split to decorrelate trees?'
    ],
    coreTheorems: [
      {
        name: 'Ensemble Variance Formula',
        formula: '\\text{Var}(\\bar{X}) = \\rho \\sigma^2 + \\frac{1 - \\rho}{B} \\sigma^2',
        explanation: 'As number of trees B increases, independent variance goes to 0, leaving average pairwise correlation rho * sigma^2.'
      },
      {
        name: 'Random Feature Subsampling Rule',
        formula: 'm \\approx \\sqrt{p} \\quad (\\text{Classification}), \\quad m \\approx \\frac{p}{3} \\quad (\\text{Regression})',
        explanation: 'At each split, only m randomly chosen features from the total p features are evaluated, forcing tree decorrelation.'
      }
    ],
    concepts: [
      {
        title: 'The Bagging Paradigm (Bootstrap Aggregation)',
        badge: 'Parallel Ensemble',
        summary: 'Breiman (1996): training independent base estimators on bootstrap resamples with replacement.',
        bullets: [
          'Each tree is trained on an $N$-sample dataset sampled with replacement (~63.2% unique instances).',
          'Remaining ~36.8% unselected instances form the Out-Of-Bag (OOB) set for free cross-validation.',
          'Averaging predictions cancels out individual model noise and wild variance swings.'
        ]
      },
      {
        title: 'Random Forests & Tree Decorrelation',
        badge: 'Breiman (2001)',
        summary: 'Injecting feature randomness to destroy structural similarity between individual trees.',
        bullets: [
          'Standard Bagging trees remain highly correlated if a single dominant feature always leads the root split.',
          'Restricting candidate features to $m < p$ forces trees to explore secondary features.',
          'Reduced correlation $\\rho$ directly slashes the ensemble variance floor.'
        ]
      }
    ]
  },
  {
    id: 'm6',
    stepNumber: 6,
    shortTitle: 'Gradient Boosting & Comparison',
    title: 'Gradient boosting and final comparison',
    category: 'Sequential Ensembles',
    icon: Zap,
    readingStatus: 'completed',
    description: 'Sequential boosting philosophy, AdaBoost vs Gradient Boosting, fitting negative pseudo-residuals, learning rate shrinkage, modern libraries (XGBoost, LightGBM, CatBoost), and master model comparison.',
    keyQuestions: [
      'How does boosting fundamentally differ from bagging in terms of sequential vs parallel training?',
      'Why are pseudo-residuals in gradient boosting equivalent to negative gradients in function space?',
      'When should a practitioner choose Decision Trees vs Random Forest vs Gradient Boosting?'
    ],
    coreTheorems: [
      {
        name: 'Gradient Boosting Additive Update',
        formula: 'F_m(x) = F_{m-1}(x) + \\nu \\cdot h_m(x), \\quad \\text{where } r_{im} = -\\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]_{F=F_{m-1}}',
        explanation: 'Each new tree h_m(x) is trained to fit the negative gradient (residuals) of the loss function, scaled by learning rate nu.'
      },
      {
        name: 'Shrinkage (Learning Rate)',
        formula: '0 < \\nu \\le 0.1 \\implies \\text{Trades training speed for robust generalization}',
        explanation: 'Slow learning prevents overfitting early residuals, allowing subsequent trees to contribute fine-grained corrections.'
      }
    ],
    concepts: [
      {
        title: 'Sequential Residual Fitting',
        badge: 'Gradient Descent in Function Space',
        summary: 'Each weak learner focuses exclusively on the mistakes made by all prior trees combined.',
        bullets: [
          'Step 1: Initialize with a constant baseline prediction (mean or log-odds).',
          'Step 2: Calculate residual errors for every training sample.',
          'Step 3: Fit a shallow tree (typically depth 2–6) to predict these residual errors.',
          'Step 4: Add the scaled tree to the ensemble and repeat.'
        ]
      },
      {
        title: 'Master Architecture Comparison',
        badge: 'Model Selection Matrix',
        summary: 'Comparing single Decision Trees, Random Forests, and Gradient Boosted Trees.',
        bullets: [
          'Single Tree: High variance, low bias, maximum interpretability, lightning-fast inference.',
          'Random Forest: Low variance, low bias, embarrassingly parallel, robust to noisy data and outliers.',
          'Gradient Boosting: State-of-the-art accuracy on tabular benchmarks, sequential training, sensitive to hyperparameter tuning.'
        ]
      }
    ]
  }
];
