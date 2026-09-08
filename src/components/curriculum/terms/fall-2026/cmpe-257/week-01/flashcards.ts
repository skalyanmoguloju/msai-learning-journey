export interface MLFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  useCase?: string;
  remark?: string;
}

export const ML_WEEK1_FLASHCARDS: MLFlashcard[] = [
  // Module 1: ML Fundamentals & Definitions
  {
    id: 'ml-fc-1',
    category: 'Module 1: ML Fundamentals',
    title: "Tom Mitchell's Well-Posed Learning Definition (1997)",
    frontPrompt: 'What are the three core constituents (E, T, P) of Mitchell’s formal definition of machine learning?',
    backFormula: 'P(T) \\text{ improves with experience } E \\text{ as measured by performance } P',
    backExplanation: 'A computer program is said to learn from Experience E with respect to some class of Tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.',
    useCase: 'Formally defining ML problem statements (e.g. T = autonomous driving, P = miles without intervention, E = vehicle telemetry logs).',
    remark: 'Contrasts with Arthur Samuel (1959) who defined it colloquially as computers learning without explicit programming.'
  },
  {
    id: 'ml-fc-2',
    category: 'Module 1: ML Fundamentals',
    title: 'Supervised vs Unsupervised vs Reinforcement Learning',
    frontPrompt: 'How do the supervision targets differ across the three primary machine learning paradigms?',
    backFormula: '\\text{Supervised: } \\{(x^{(i)}, y^{(i)})\\}, \\quad \\text{Unsupervised: } \\{x^{(i)}\\}, \\quad \\text{RL: } (s, a, r, s\')',
    backExplanation: 'Supervised learning learns mapping $f: X \\to Y$ from labeled targets. Unsupervised discovers latent patterns, densities, or clusterings in unlabeled data. RL optimizes sequential policy $\\pi(a|s)$ via environmental reward feedback.',
    useCase: 'Supervised: Price forecasting. Unsupervised: Customer segmentation (PCA/K-Means). RL: AlphaGo and robot manipulation.',
    remark: 'Self-supervised learning constructs pseudo-labels from input data itself (e.g., masked language modeling).'
  },
  {
    id: 'ml-fc-3',
    category: 'Module 1: ML Fundamentals',
    title: 'Herbert Simon’s Adaptive Learning Definition (1983)',
    frontPrompt: 'How did Herbert Simon characterize learning from a cognitive systems perspective?',
    backFormula: '\\Delta \\text{Efficiency}(T) > 0 \\quad \\text{upon task repetition}',
    backExplanation: 'Simon defined learning as any process by which a system improves performance on subsequent repetitions of the same task, emphasizing computational efficiency, error reduction, and adaptive knowledge acquisition.',
    useCase: 'Rule compilation in expert systems, automated caching of heuristic search paths.',
    remark: 'Connects AI closely with cognitive science, cybernetics, and bounded rationality.'
  },
  {
    id: 'ml-fc-4',
    category: 'Module 1: ML Fundamentals',
    title: 'Inductive Learning Hypothesis',
    frontPrompt: 'What is the foundational premise of inductive machine learning regarding unseen instances?',
    backFormula: 'f(x) \\approx y \\text{ for all } (x,y) \\in \\mathcal{D}_{\\text{train}} \\implies f(x) \\approx y \\text{ for unseen } x \\sim \\mathcal{D}',
    backExplanation: 'Any hypothesis found to approximate the target function well over a sufficiently large set of training examples will also approximate the target function well over unobserved examples drawn from the same distribution.',
    useCase: 'Justifies training models on historical data to serve live future inference.',
    remark: 'Requires the i.i.d. assumption (independently and identically distributed data).'
  },

  // Module 2: The Learning Problem & Feasibility
  {
    id: 'ml-fc-5',
    category: 'Module 2: Feasibility of Learning',
    title: 'Hoeffding’s Inequality & In-Sample Error',
    frontPrompt: 'How does Hoeffding’s Inequality bound the difference between in-sample error $E_{in}$ and out-of-sample error $E_{out}$?',
    backFormula: 'P(|E_{in}(h) - E_{out}(h)| > \\epsilon) \\le 2\\exp(-2\\epsilon^2 N)',
    backExplanation: 'For a fixed hypothesis $h$, the probability that the empirical training error $E_{in}$ deviates from true risk $E_{out}$ by more than tolerance $\\epsilon$ decays exponentially with dataset sample size $N$.',
    useCase: 'Proving that empirical in-sample performance tracks out-of-sample population performance when $N$ is sufficiently large.',
    remark: 'Holds for any single fixed hypothesis before observing the training data.'
  },
  {
    id: 'ml-fc-6',
    category: 'Module 2: Feasibility of Learning',
    title: 'Union Bound over Finite Hypothesis Sets',
    frontPrompt: 'What happens to the generalization bound when choosing best $g \\in \\mathcal{H}$ across $|\mathcal{H}| = M$ hypotheses?',
    backFormula: 'P(|E_{in}(g) - E_{out}(g)| > \\epsilon) \\le 2M\\exp(-2\\epsilon^2 N)',
    backExplanation: 'When an algorithm searches through $M$ candidates to select the hypothesis with lowest training error, the probability of at least one candidate being a bad generalization grows by at most a factor of $M$.',
    useCase: 'Bounding generalization risk in model selection and hyperparameter grids.',
    remark: 'If $\\mathcal{H}$ is infinite, $M$ is replaced by the growth function $m_{\\mathcal{H}}(N)$ and VC-Dimension $d_{VC}$.'
  },
  {
    id: 'ml-fc-7',
    category: 'Module 2: Feasibility of Learning',
    title: 'Vapnik-Chervonenkis (VC) Generalization Bound',
    frontPrompt: 'What is the VC generalization bound connecting $E_{out}$ and $E_{in}$ with high probability $1 - \\delta$?',
    backFormula: 'E_{out}(g) \\le E_{in}(g) + \\sqrt{\\frac{8}{N} \\ln\\left( \\frac{4 m_{\\mathcal{H}}(2N)}{\\delta} \\right)}',
    backExplanation: 'True error $E_{out}$ is upper-bounded by empirical error $E_{in}$ plus an overfitting penalty term $\\Omega(N, \\mathcal{H}, \\delta)$ that scales roughly as $\\mathcal{O}(\\sqrt{d_{VC}/N})$.',
    useCase: 'Theoretical justification for Structural Risk Minimization (SRM) and regularization.',
    remark: 'Guarantees learning is feasible for infinite hypothesis spaces with finite VC dimension.'
  },
  {
    id: 'ml-fc-8',
    category: 'Module 2: Feasibility of Learning',
    title: 'Sample Complexity in PAC Learning',
    frontPrompt: 'How many samples $N$ are required to ensure $(\\epsilon, \\delta)$-PAC learnability for finite $\\mathcal{H}$?',
    backFormula: 'N \\ge \\frac{1}{2\\epsilon^2} \\left( \\ln |\\mathcal{H}| + \\ln\\frac{2}{\\delta} \\right)',
    backExplanation: 'To guarantee with probability at least $1 - \\delta$ that the chosen hypothesis has error within $\\epsilon$ of optimal, the required training instances grow logarithmically with hypothesis space size $|\\mathcal{H}|$ and inverse-quadratically with error tolerance $\\epsilon$.',
    useCase: 'Calculating minimum required dataset size before deploying safety-critical ML pipelines.',
    remark: 'PAC stands for Probably Approximately Correct.'
  },

  // Module 3: Types of Learning & Paradigms
  {
    id: 'ml-fc-9',
    category: 'Module 3: Supervised Paradigms',
    title: 'Parametric vs Non-Parametric Models',
    frontPrompt: 'What defines a parametric model versus a non-parametric learning algorithm?',
    backFormula: '\\text{Parametric: } f(x; \\theta) \\; (\\text{fixed } d) \\quad \\text{vs} \\quad \\text{Non-Parametric: } k(x, x_i) \\; (\\text{grows with } N)',
    backExplanation: 'Parametric models summarize data through a fixed-size parameter vector $\\theta \\in \\mathbb{R}^d$ independent of sample size $N$ (e.g. Linear Regression, Neural Nets). Non-parametric models grow capacity with data (e.g. k-NN, Kernel SVM, Decision Trees).',
    useCase: 'Choose parametric for fast $\\mathcal{O}(d)$ inference; non-parametric when data structure is complex and cannot be predefined.',
    remark: 'Non-parametric does not mean "zero parameters", but rather that parameters grow unbounded with $N$.'
  },
  {
    id: 'ml-fc-10',
    category: 'Module 3: Supervised Paradigms',
    title: 'Discriminative vs Generative Classifiers',
    frontPrompt: 'What is the fundamental modeling difference between Discriminative and Generative classifiers?',
    backFormula: '\\text{Discriminative: } P(Y|X) \\quad \\Longleftrightarrow \\quad \\text{Generative: } P(X, Y) = P(X|Y)P(Y)',
    backExplanation: 'Discriminative models learn the direct conditional distribution $P(Y|X)$ or decision boundary (e.g. Logistic Regression, SVM). Generative models learn the joint probability $P(X, Y)$ to model how data was generated (e.g. Naive Bayes, GDA, VAEs).',
    useCase: 'Generative models can synthesize novel data samples and handle missing features; discriminative models typically achieve higher accuracy with ample labels.',
    remark: 'Generative classifiers use Bayes rule $P(Y|X) = \\frac{P(X|Y)P(Y)}{P(X)}$ for inference.'
  },
  {
    id: 'ml-fc-11',
    category: 'Module 3: Supervised Paradigms',
    title: 'Inductive Bias in Model Architectures',
    frontPrompt: 'What specific inductive biases are encoded in Linear Models, Decision Trees, and CNNs?',
    backFormula: '\\text{Linear: } f(x) = w^T x, \\quad \\text{Trees: Axis-aligned splits}, \\quad \\text{CNN: Translation Invariance}',
    backExplanation: 'Linear models assume target relationships are additive and monotonic. Decision Trees assume feature space is separable by orthogonal axis-aligned hyperplanes. CNNs encode locality and spatial translation invariance via weight sharing.',
    useCase: 'Aligning model inductive bias with physical problem domain to maximize generalization efficiency.',
    remark: 'Stronger correct inductive biases require fewer training samples $N$ to achieve low test error.'
  },

  // Module 4: Mathematical Modeling & Optimization
  {
    id: 'ml-fc-12',
    category: 'Module 4: Optimization',
    title: 'Empirical Risk Minimization (ERM)',
    frontPrompt: 'What is the objective of Empirical Risk Minimization versus True Risk?',
    backFormula: '\\hat{\\theta}_{ERM} = \\arg\\min_\\theta \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(f_\\theta(x^{(i)}), y^{(i)})',
    backExplanation: 'True Risk $R(f) = \\mathbb{E}_{(x,y) \\sim \\mathcal{D}}[\\mathcal{L}(f(x), y)]$ cannot be evaluated directly without knowing the true data distribution $\\mathcal{D}$. ERM approximates True Risk by minimizing the average empirical loss over training set $\\mathcal{D}_{\\text{train}}$.',
    useCase: 'Standard training objective for supervised regressors and classifiers.',
    remark: 'Regularized ERM adds penalty $\\lambda R(\\theta)$ to prevent empirical over-fitting.'
  },
  {
    id: 'ml-fc-13',
    category: 'Module 4: Optimization',
    title: 'Convexity Criteria in Loss Functions',
    frontPrompt: 'What mathematical condition guarantees that any local minimum of loss $J(\\theta)$ is a global minimum?',
    backFormula: '\\nabla^2 J(\\theta) \\succeq 0 \\quad (\\text{Positive Semi-Definite Hessian})',
    backExplanation: 'A function $J(\\theta)$ is convex if its epigraph is a convex set, or equivalently if its Hessian matrix $\\nabla^2 J(\\theta)$ is positive semi-definite (all eigenvalues $\\lambda_i \\ge 0$) everywhere. For convex losses, local optimization guarantees global optimality.',
    useCase: 'Linear regression MSE and logistic regression cross-entropy are strictly convex; neural network losses are non-convex.',
    remark: 'First-order condition: $J(v) \\ge J(u) + \\nabla J(u)^T (v - u)$.'
  },
  {
    id: 'ml-fc-14',
    category: 'Module 4: Optimization',
    title: 'Batch vs Mini-Batch vs Stochastic Gradient Descent (SGD)',
    frontPrompt: 'How do Batch GD, Mini-Batch GD, and SGD differ in sample batch size and gradient variance?',
    backFormula: '\\theta_{t+1} = \\theta_t - \\alpha \\cdot \\frac{1}{|B|} \\sum_{i \\in B} \\nabla_\\theta \\mathcal{L}(x^{(i)}, y^{(i)})',
    backExplanation: 'Batch GD ($|B| = N$): exact gradient, deterministic, slow per epoch. SGD ($|B| = 1$): high variance, noisy trajectory, fast iteration, can escape shallow local minima. Mini-Batch ($|B| \\in [32, 512]$): balanced variance, enables GPU tensor parallelism.',
    useCase: 'Mini-batch GD is universal industry standard for modern deep learning models.',
    remark: 'Learning rate $\\alpha$ must decay or schedule when using SGD/mini-batch to converge.'
  },

  // Module 5: Linear Algebra & Calculus in ML
  {
    id: 'ml-fc-15',
    category: 'Module 5: Linear Algebra & Calculus',
    title: 'Closed-Form Normal Equation for Linear Regression',
    frontPrompt: 'What is the exact analytical normal equation solution minimizing least-squares cost $\\|X\\theta - y\\|^2$?',
    backFormula: '\\theta^* = (X^T X)^{-1} X^T y',
    backExplanation: 'Derived by setting matrix gradient $\\nabla_\\theta \\|X\\theta - y\\|^2 = 2X^T(X\\theta - y) = 0$. Solves the optimal linear parameters in closed form without iterative gradient descent.',
    useCase: 'Exact regression parameter estimation when feature dimension $d$ is modest ($d \\le 10,000$).',
    remark: 'Inversion of $X^T X$ costs $\\mathcal{O}(d^3)$. If $X^T X$ is singular, use Moore-Penrose pseudoinverse $X^+$.'
  },
  {
    id: 'ml-fc-16',
    category: 'Module 5: Linear Algebra & Calculus',
    title: 'Gradient of Linear & Quadratic Forms',
    frontPrompt: 'What are the matrix gradients of $a^T x$ and $x^T A x$ with respect to vector $x$?',
    backFormula: '\\nabla_x (a^T x) = a, \\qquad \\nabla_x (x^T A x) = (A + A^T)x \\;\\xrightarrow{A = A^T}\\; 2Ax',
    backExplanation: 'Fundamental vector calculus identities for machine learning optimization. The quadratic form $x^T A x$ represents error surfaces, kinetic energies, and curvature terms.',
    useCase: 'Deriving gradient descent update rules and Taylor expansions of multivariate loss functions.',
    remark: 'If $A$ is symmetric ($A = A^T$), then $\\nabla_x (x^T A x) = 2Ax$.'
  },
  {
    id: 'ml-fc-17',
    category: 'Module 5: Linear Algebra & Calculus',
    title: 'Positive Semi-Definite (PSD) Matrix Properties',
    frontPrompt: 'What are the defining characteristics of a symmetric Positive Semi-Definite matrix $A \\succeq 0$?',
    backFormula: 'x^T A x \\ge 0 \\quad \\forall x \\in \\mathbb{R}^n \\iff \\lambda_i(A) \\ge 0 \\; \\forall i',
    backExplanation: 'A matrix $A$ is PSD if the quadratic form $x^T A x$ is non-negative for every non-zero vector $x$. Equivalently, all eigenvalues are non-negative, and it can be factored as $A = B^T B$.',
    useCase: 'Covariance matrices $\\Sigma = \\frac{1}{N} X^T X$ and Gram kernel matrices $K_{ij} = k(x_i, x_j)$ are guaranteed to be PSD.',
    remark: 'Strict positive definiteness ($A \\succ 0$) implies $x^T A x > 0$ and non-zero determinant (invertible).'
  },
  {
    id: 'ml-fc-18',
    category: 'Module 5: Linear Algebra & Calculus',
    title: 'Eigenvalue Decomposition vs Singular Value Decomposition (SVD)',
    frontPrompt: 'How does SVD generalize eigendecomposition from square matrices to arbitrary $m \\times n$ matrices?',
    backFormula: 'A = U \\Sigma V^T, \\quad U \\in \\mathbb{R}^{m \\times m}, \\; \\Sigma \\in \\mathbb{R}^{m \\times n}, \\; V \\in \\mathbb{R}^{n \\times n}',
    backExplanation: 'Eigendecomposition $A = Q \\Lambda Q^{-1}$ only applies to square, diagonalizable matrices. SVD applies to any rectangular matrix $A$, factoring it into left singular vectors $U$, singular values $\\Sigma$, and right singular vectors $V^T$.',
    useCase: 'Principal Component Analysis (PCA), low-rank matrix approximation, and recommendation system factorization.',
    remark: 'Singular values $\\sigma_i$ are the square roots of the eigenvalues of $A^T A$.'
  },

  // Module 6: Modern ML Paradigms & Software 2.0
  {
    id: 'ml-fc-19',
    category: 'Module 6: Modern ML Paradigms',
    title: 'Software 1.0 vs Software 2.0 (Andrej Karpathy)',
    frontPrompt: 'How does the Software 2.0 paradigm redefine code authoring and execution?',
    backFormula: '\\text{Software 1.0: } \\text{C++/Python code written by humans} \\quad \\Longleftrightarrow \\quad \\text{Software 2.0: } \\text{Weights } \\theta \\text{ learned by optimization}',
    backExplanation: 'Software 1.0 consists of explicit code instructions authored line-by-line by human programmers. Software 2.0 represents programs as weights $\\theta$ inside neural architectures discovered automatically by searching program space via gradient descent.',
    useCase: 'Computer vision, speech synthesis, autonomous driving perception, and LLM reasoning.',
    remark: 'Software 2.0 code is computationally homogeneous (matrix multiplications) and hardware-accelerator friendly.'
  },
  {
    id: 'ml-fc-20',
    category: 'Module 6: Modern ML Paradigms',
    title: 'Automatic Differentiation (Reverse-Mode / Backpropagation)',
    frontPrompt: 'Why is Reverse-Mode AutoDiff preferred over Forward-Mode for training machine learning models?',
    backFormula: '\\text{Cost: } \\mathcal{O}(\\text{Inputs}) \\text{ for Reverse-Mode vs } \\mathcal{O}(\\text{Outputs}) \\text{ for Forward-Mode}',
    backExplanation: 'In supervised ML, the objective is a scalar loss $J: \\mathbb{R}^d \\to \\mathbb{R}$ with millions of parameter inputs ($d \\gg 1$) but only $1$ scalar output. Reverse-mode computes all $d$ partial derivatives $\\frac{\\partial J}{\\partial \\theta_i}$ in a single backward sweep.',
    useCase: 'Backpropagation in PyTorch, JAX, and TensorFlow.',
    remark: 'Forward-mode is advantageous when outputs exceed inputs ($f: \\mathbb{R} \\to \\mathbb{R}^m$).'
  },

  // Merged Formulas & Core Mathematical Reference
  {
    id: 'ml-fc-21',
    category: 'Formulas & Linear Models',
    title: 'Linear Regression Hypothesis & Mean Squared Error Cost',
    frontPrompt: 'What are the mathematical formulations for the linear regression hypothesis $h_\\theta(x)$ and the MSE cost function $J(\\theta)$?',
    backFormula: 'h_\\theta(x) = \\theta^T x = \\sum_{j=0}^d \\theta_j x_j, \\quad J(\\theta) = \\frac{1}{2m} \\sum_{i=1}^m \\left(h_\\theta(x^{(i)}) - y^{(i)}\\right)^2',
    backExplanation: 'The hypothesis $h_\\theta(x)$ computes a weighted linear combination of input features with parameters $\\theta$. The cost function $J(\\theta)$ computes half the mean squared residual error across all $m$ training instances, where the factor of $\\frac{1}{2}$ simplifies derivatives.',
    useCase: 'Foundational objective function for linear regression and least squares curve fitting.',
    remark: 'Can be written in matrix notation as $J(\\theta) = \\frac{1}{2m} \\|X\\theta - y\\|^2$.'
  },
  {
    id: 'ml-fc-22',
    category: 'Formulas & Optimization',
    title: 'Gradient Descent Parameter Update Rule',
    frontPrompt: 'What is the exact gradient descent parameter update rule for minimizing the linear regression MSE cost function?',
    backFormula: '\\theta_j := \\theta_j - \\alpha \\frac{\\partial}{\\partial \\theta_j} J(\\theta) = \\theta_j + \\frac{\\alpha}{m} \\sum_{i=1}^m \\left(y^{(i)} - h_\\theta(x^{(i)})\\right) x_j^{(i)}',
    backExplanation: 'Each parameter $\\theta_j$ is simultaneously updated by stepping in the negative gradient direction with learning rate $\\alpha$. The magnitude of the step is proportional to the prediction error $(y^{(i)} - h_\\theta(x^{(i)}))$ weighted by feature value $x_j^{(i)}$.',
    useCase: 'Iterative optimization when $d$ is very large and the normal equation matrix inversion is computationally prohibitive.',
    remark: 'Requires simultaneous update across all $j \\in \\{0, \\dots, d\\}$ at each iteration step.'
  },
  {
    id: 'ml-fc-23',
    category: 'Formulas & Model Assessment',
    title: 'Bias-Variance Decomposition of Expected Generalization Error',
    frontPrompt: 'How is the expected out-of-sample prediction error decomposed into bias, variance, and noise?',
    backFormula: '\\mathbb{E}\\left[(y - \\hat{f}(x))^2\\right] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2',
    backExplanation: 'Expected squared error breaks down into: (1) Squared Bias $(\\mathbb{E}[\\hat{f}(x)] - f(x))^2$ from erroneous model assumptions, (2) Model Variance $\\mathbb{E}[(\\hat{f}(x) - \\mathbb{E}[\\hat{f}(x)])^2]$ from sensitivity to training set fluctuations, and (3) Irreducible error $\\sigma^2$ from noise in data generation.',
    useCase: 'Analyzing trade-offs between underfitting (high bias) and overfitting (high variance) to tune model complexity and regularization.',
    remark: 'Adding regularization ($\lambda$) increases bias slightly while drastically reducing variance.'
  },
  {
    id: 'ml-fc-24',
    category: 'Formulas & Reinforcement Learning',
    title: 'Q-Learning Temporal-Difference Value Update Rule',
    frontPrompt: 'What is the Bellman temporal-difference update rule for estimating optimal action-values in Q-Learning?',
    backFormula: 'Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ R_{t+1} + \\gamma \\max_{a\'} Q(s\', a\') - Q(s, a) \\right]',
    backExplanation: 'Off-policy TD control algorithm that updates state-action utility $Q(s, a)$ toward the target $R_{t+1} + \\gamma \\max_{a\'} Q(s\', a\')$ with discount factor $\\gamma \\in [0, 1)$ and learning rate $\\alpha$. It directly approximates the optimal action-value function $Q^*$.',
    useCase: 'Model-free reinforcement learning where an agent learns optimal decision policies through environmental trial and error.',
    remark: 'Off-policy because it uses the greedy max action for the update target regardless of the exploratory action taken.'
  }
];
