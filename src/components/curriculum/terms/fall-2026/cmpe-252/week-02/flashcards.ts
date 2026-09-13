export interface AIFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  useCase?: string;
  remark?: string;
}

export const AI_WEEK2_FLASHCARDS: AIFlashcard[] = [
  // ==========================================
  // MODULE 1: LINEAR ALGEBRA
  // ==========================================
  {
    id: 'ai-w2-m1-fc-1',
    category: 'Module 1: Linear Algebra',
    title: 'Vector Definition & Representation',
    frontPrompt: 'What is a vector?',
    backFormula: '\\mathbf{v} = [x_1, x_2, \\dots, x_n]^T \\in \\mathbb{R}^n',
    backExplanation: 'A vector is an ordered list of numbers. Example: $v=[3,4]$. It can represent a direction, magnitude, or features of an object in high-dimensional feature space.',
    useCase: 'Feature representations (embeddings, inputs, weights) in machine learning models.'
  },
  {
    id: 'ai-w2-m1-fc-2',
    category: 'Module 1: Linear Algebra',
    title: 'Scalar vs. Vector',
    frontPrompt: 'What is the difference between a scalar and a vector?',
    backFormula: 'c \\in \\mathbb{R} \\quad \\text{vs.} \\quad \\mathbf{v} \\in \\mathbb{R}^n',
    backExplanation: 'A scalar is a single real number, such as $5$. A vector contains multiple ordered numbers, such as $[2,4,6]$.',
    useCase: 'Learning rate $\\eta$ and loss $L$ are scalars; parameter updates $\\boldsymbol{\\theta}$ and gradients $\\nabla L$ are vectors.'
  },
  {
    id: 'ai-w2-m1-fc-3',
    category: 'Module 1: Linear Algebra',
    title: 'Vector Length / Euclidean Norm',
    frontPrompt: 'How do you calculate the length of a vector?',
    backFormula: '\\|\\mathbf{v}\\| = \\sqrt{x_1^2 + x_2^2 + \\dots + x_n^2}',
    backExplanation: 'For $v=[x_1,x_2]$: $\\|v\\|=\\sqrt{x_1^2+x_2^2}$. For $[3,4]$: $\\sqrt{3^2+4^2}=\\sqrt{25}=5$.',
    useCase: 'L2 regularization (weight decay) and measuring distance between embeddings.'
  },
  {
    id: 'ai-w2-m1-fc-4',
    category: 'Module 1: Linear Algebra',
    title: 'Dot Product (Inner Product)',
    frontPrompt: 'What is the dot product?',
    backFormula: '\\mathbf{u} \\cdot \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\|\\|\\mathbf{v}\\|\\cos(\\theta)',
    backExplanation: 'Multiply corresponding components and add them: $[a,b]\\cdot[c,d]=ac+bd$. Example: $[1,2]\\cdot[3,4]=1(3)+2(4)=3+8=11$.',
    useCase: 'Computing linear projections, artificial neuron activations ($w^T x + b$), and cosine similarity.'
  },
  {
    id: 'ai-w2-m1-fc-5',
    category: 'Module 1: Linear Algebra',
    title: 'Orthogonal Vectors (Dot Product = 0)',
    frontPrompt: 'What does a dot product of zero mean?',
    backFormula: '\\mathbf{u} \\cdot \\mathbf{v} = 0 \\iff \\mathbf{u} \\perp \\mathbf{v} \\quad (\\theta = 90^\\circ)',
    backExplanation: 'The vectors are orthogonal, meaning mutually perpendicular. Their geometric angle is $90^\\circ$, so $\\cos(90^\\circ)=0$.',
    useCase: 'Orthonormal bases, PCA uncorrelated principal axes, and Gram-Schmidt orthogonalization.'
  },
  {
    id: 'ai-w2-m1-fc-6',
    category: 'Module 1: Linear Algebra',
    title: 'Matrix Definition',
    frontPrompt: 'What is a matrix?',
    backFormula: '\\mathbf{A} = \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} \\in \\mathbb{R}^{m \\times n}',
    backExplanation: 'A matrix is a rectangular arrangement of numbers in rows and columns. Example: $\\begin{bmatrix}1&2\\\\3&4\\end{bmatrix}$.',
    useCase: 'Organizing tabular datasets ($N$ samples × $D$ features) and linear transformations in neural network layers.'
  },
  {
    id: 'ai-w2-m1-fc-7',
    category: 'Module 1: Linear Algebra',
    title: 'Matrix Dimensions / Shape',
    frontPrompt: 'What does a matrix shape mean?',
    backFormula: '\\text{Shape} = \\text{rows} \\times \\text{columns} = m \\times n',
    backExplanation: 'A $3\\times2$ matrix has 3 rows and 2 columns. The first number represents rows; the second represents columns.',
    useCase: 'Determining valid matrix multiplications (inner dimensions must match: $(m \\times k) \\times (k \\times n) = (m \\times n)$).'
  },
  {
    id: 'ai-w2-m1-fc-8',
    category: 'Module 1: Linear Algebra',
    title: 'Vector Projection',
    frontPrompt: 'What is a vector projection?',
    backFormula: '\\text{proj}_{\\mathbf{u}}(\\mathbf{v}) = \\frac{\\mathbf{v} \\cdot \\mathbf{u}}{\\|\\mathbf{u}\\|^2} \\mathbf{u}',
    backExplanation: 'A projection is the “shadow” of one vector onto another vector’s direction. It tells us how much of one vector points along another direction.',
    useCase: 'Orthogonal decomposition, linear regression least squares derivation, and dimensionality reduction.'
  },
  {
    id: 'ai-w2-m1-fc-9',
    category: 'Module 1: Linear Algebra',
    title: 'Gram–Schmidt Orthogonalization Process',
    frontPrompt: 'What is Gram–Schmidt used for?',
    backFormula: '\\mathbf{u}_k = \\mathbf{v}_k - \\sum_{j=1}^{k-1} \\text{proj}_{\\mathbf{u}_j}(\\mathbf{v}_k)',
    backExplanation: 'Gram–Schmidt converts a set of linearly independent vectors into mutually orthogonal vectors by successively subtracting projection shadows.',
    useCase: 'Constructing orthonormal bases for QR factorization and subspace projections.'
  },
  {
    id: 'ai-w2-m1-fc-10',
    category: 'Module 1: Linear Algebra',
    title: 'LU Decomposition',
    frontPrompt: 'What is LU decomposition?',
    backFormula: '\\mathbf{A} = \\mathbf{L}\\mathbf{U}, \\quad \\mathbf{L}\\mathbf{y} = \\mathbf{b}, \\quad \\mathbf{U}\\mathbf{x} = \\mathbf{y}',
    backExplanation: 'LU decomposition factors a square matrix as $A=LU$, where $L$ is a lower-triangular matrix (zeros above the diagonal) and $U$ is an upper-triangular matrix (zeros below the diagonal).',
    useCase: 'Solving linear systems $Ax = b$ efficiently with forward substitution followed by back substitution in $O(n^2)$ time.'
  },
  {
    id: 'ai-w2-m1-fc-11',
    category: 'Module 1: Linear Algebra',
    title: 'Singular Value Decomposition (SVD)',
    frontPrompt: 'What is SVD?',
    backFormula: '\\mathbf{A} = \\mathbf{U} \\boldsymbol{\\Sigma} \\mathbf{V}^T',
    backExplanation: 'Singular Value Decomposition writes any matrix as $A=U\\Sigma V^T$. It decomposes the linear map into rotation/reflection ($U$), coordinate scaling ($\\Sigma$), and rotation/reflection ($V^T$).',
    useCase: 'Low-rank approximation, data compression, pseudo-inverses, and Principal Component Analysis (PCA).'
  },
  {
    id: 'ai-w2-m1-fc-12',
    category: 'Module 1: Linear Algebra',
    title: 'Singular Values in SVD',
    frontPrompt: 'Where are the singular values stored?',
    backFormula: '\\boldsymbol{\\Sigma} = \\text{diag}(\\sigma_1, \\sigma_2, \\dots, \\sigma_r), \\quad \\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0',
    backExplanation: 'The singular values are stored on the main diagonal of $\\Sigma$ in $A=U\\Sigma V^T$. They show how strongly different orthogonal directions are stretched.',
    useCase: 'Assessing energy distribution and determining the optimal rank $k$ for truncated low-rank approximation.'
  },

  // ==========================================
  // MODULE 2: CALCULUS FOR MACHINE LEARNING
  // ==========================================
  {
    id: 'ai-w2-m2-fc-1',
    category: 'Module 2: Multivariable Calculus',
    title: 'Partial Derivative Definition',
    frontPrompt: 'What is a partial derivative?',
    backFormula: '\\frac{\\partial f}{\\partial x_i} = \\lim_{h \\to 0} \\frac{f(\\dots, x_i + h, \\dots) - f(\\dots, x_i, \\dots)}{h}',
    backExplanation: 'It measures how a multivariable function changes with respect to one chosen variable while holding all other variables strictly constant.',
    useCase: 'Calculating the sensitivity of neural network loss with respect to an individual weight parameter.'
  },
  {
    id: 'ai-w2-m2-fc-2',
    category: 'Module 2: Multivariable Calculus',
    title: 'Partial Derivative Example',
    frontPrompt: 'For f(x, y) = x² + 3y, what is ∂f/∂x?',
    backFormula: '\\frac{\\partial}{\\partial x}(x^2 + 3y) = 2x + 0 = 2x',
    backExplanation: 'When differentiating with respect to $x$, treat $3y$ as a constant: $\\frac{\\partial}{\\partial x}(x^2) = 2x$ and $\\frac{\\partial}{\\partial x}(3y) = 0$. Therefore, $\\frac{\\partial f}{\\partial x}=2x$.',
    useCase: 'Isolating gradient components in loss functions.'
  },
  {
    id: 'ai-w2-m2-fc-3',
    category: 'Module 2: Multivariable Calculus',
    title: 'The Gradient Vector (∇f)',
    frontPrompt: 'What is the gradient?',
    backFormula: '\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix} \\in \\mathbb{R}^n',
    backExplanation: 'The gradient is a column vector containing all first-order partial derivatives of a scalar field $f$ with respect to every input variable.',
    useCase: 'Direction vector guiding parameter optimization in deep learning models.'
  },
  {
    id: 'ai-w2-m2-fc-4',
    category: 'Module 2: Multivariable Calculus',
    title: 'Direction of the Gradient',
    frontPrompt: 'What direction does the gradient point toward?',
    backFormula: '\\mathbf{u}^* = \\arg\\max_{\\|\\mathbf{u}\\|=1} D_{\\mathbf{u}} f = \\frac{\\nabla f}{\\|\\nabla f\\|}',
    backExplanation: 'The gradient vector always points in the direction of steepest increase (steepest uphill climb) of the function.',
    useCase: 'Ascending toward maxima or descending toward minima by reversing direction.'
  },
  {
    id: 'ai-w2-m2-fc-5',
    category: 'Module 2: Multivariable Calculus',
    title: 'Gradient Descent Downhill Step',
    frontPrompt: 'Why does gradient descent subtract the gradient?',
    backFormula: '\\Delta \\boldsymbol{\\theta} = -\\eta \\nabla L',
    backExplanation: 'The gradient points uphill toward higher loss. To minimize error and reduce loss, we must step in the opposite direction: $-\\nabla L$.',
    useCase: 'Iterative loss minimization in machine learning.'
  },
  {
    id: 'ai-w2-m2-fc-6',
    category: 'Module 2: Multivariable Calculus',
    title: 'Gradient Descent Parameter Update Rule',
    frontPrompt: 'What is the gradient descent update rule?',
    backFormula: '\\theta_{\\text{new}} = \\theta - \\eta \\nabla L',
    backExplanation: '$\\theta$ represents model parameters, $\\eta$ is the learning rate, and $\\nabla L$ is the gradient of the loss function.',
    useCase: 'Core iterative parameter update in linear regression, logistic regression, and deep neural nets.'
  },
  {
    id: 'ai-w2-m2-fc-7',
    category: 'Module 2: Multivariable Calculus',
    title: 'Learning Rate Role & Dynamics',
    frontPrompt: 'What does the learning rate control?',
    backFormula: '\\eta > 0 \\quad (\\text{Step Size Magnitude})',
    backExplanation: 'It controls the size of each update step. A very large learning rate may overshoot the minimum and diverge; a very small learning rate makes training painfully slow.',
    useCase: 'Learning rate schedules, warmups, and adaptive optimizer tuning.'
  },
  {
    id: 'ai-w2-m2-fc-8',
    category: 'Module 2: Multivariable Calculus',
    title: 'The Chain Rule of Calculus',
    frontPrompt: 'What is the chain rule?',
    backFormula: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}',
    backExplanation: 'The chain rule computes the derivative of a composite function by multiplying the derivatives of the outer and inner functions.',
    useCase: 'Differentiating nested layers $f(g(h(x)))$ in neural networks.'
  },
  {
    id: 'ai-w2-m2-fc-9',
    category: 'Module 2: Multivariable Calculus',
    title: 'Backpropagation Algorithm',
    frontPrompt: 'What is backpropagation?',
    backFormula: '\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial z_j} \\cdot \\frac{\\partial z_j}{\\partial w_{ij}}',
    backExplanation: 'Backpropagation applies the multivariable chain rule recursively in reverse topological order to compute loss gradients with respect to every weight in a neural network.',
    useCase: 'Training all modern deep learning architectures (MLP, CNN, Transformers).'
  },
  {
    id: 'ai-w2-m2-fc-10',
    category: 'Module 2: Multivariable Calculus',
    title: 'Directional Derivative',
    frontPrompt: 'What is a directional derivative?',
    backFormula: 'D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}, \\quad \\|\\mathbf{u}\\| = 1',
    backExplanation: 'It measures how a scalar function changes when moving along one specific unit direction vector $\\mathbf{u}$.',
    useCase: 'Line search methods and analyzing curvature along optimizer trajectory vectors.'
  },
  {
    id: 'ai-w2-m2-fc-11',
    category: 'Module 2: Multivariable Calculus',
    title: 'The Jacobian Matrix',
    frontPrompt: 'What is a Jacobian?',
    backFormula: '\\mathbf{J} = \\begin{bmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\dots & \\frac{\\partial f_1}{\\partial x_n} \\\\ \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial f_m}{\\partial x_1} & \\dots & \\frac{\\partial f_m}{\\partial x_n} \\end{bmatrix} \\in \\mathbb{R}^{m \\times n}',
    backExplanation: 'A Jacobian matrix stores all first-order partial derivatives of a vector-valued function with multiple outputs with respect to multiple inputs. Rows represent outputs; columns represent inputs.',
    useCase: 'Vector backpropagation and layer-to-layer tensor derivative transformations.'
  },
  {
    id: 'ai-w2-m2-fc-12',
    category: 'Module 2: Multivariable Calculus',
    title: 'Saddle Points and Flat Plateaus',
    frontPrompt: 'What are saddle points and flat regions?',
    backFormula: '\\nabla L \\approx 0, \\quad \\lambda_1 > 0, \\lambda_2 < 0 \\quad (\\text{Indefinite Curvature})',
    backExplanation: 'A saddle point curves upward in one direction and downward in another. A flat plateau has near-zero gradient ($\\nabla L \\approx 0$), causing standard gradient descent to stall.',
    useCase: 'Why momentum and adaptive optimizers (Adam) are crucial to escape saddles and plateaus.'
  },

  // ==========================================
  // MODULE 3: PROBABILITY AND STATISTICS
  // ==========================================
  {
    id: 'ai-w2-m3-fc-1',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Random Variable Definition',
    frontPrompt: 'What is a random variable?',
    backFormula: 'X: \\Omega \\to \\mathbb{R}',
    backExplanation: 'A random variable is a numerical value determined by chance or random experiment outcomes. Example: $X=1$ for heads and $X=0$ for tails.',
    useCase: 'Modeling labels, predictions, noisy sensors, and stochastic mini-batch sampling.'
  },
  {
    id: 'ai-w2-m3-fc-2',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Discrete vs. Continuous Random Variables',
    frontPrompt: 'What is the difference between discrete and continuous variables?',
    backFormula: 'X \\in \\{x_1, x_2, \\dots\\} \\quad \\text{vs.} \\quad X \\in [a, b] \\subseteq \\mathbb{R}',
    backExplanation: 'Discrete variables take on isolated, countable values (e.g., dice rolls, class counts). Continuous variables take on uncountably infinite values within an interval (e.g., height, temperature, weights).',
    useCase: 'Choosing between classification loss (cross-entropy) and regression loss (MSE).'
  },
  {
    id: 'ai-w2-m3-fc-3',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Probability Mass Function (PMF)',
    frontPrompt: 'What is a PMF?',
    backFormula: 'p(x) = P(X = x), \\quad \\sum_x p(x) = 1, \\quad p(x) \\ge 0',
    backExplanation: 'A Probability Mass Function gives the exact probability for each discrete value of a random variable: $P(X=x)$.',
    useCase: 'Categorical cross-entropy and classification class probabilities.'
  },
  {
    id: 'ai-w2-m3-fc-4',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Probability Density Function (PDF)',
    frontPrompt: 'What is a PDF?',
    backFormula: 'P(a < X < b) = \\int_a^b f(x)\\,dx, \\quad \\int_{-\\infty}^\\infty f(x)\\,dx = 1',
    backExplanation: 'A Probability Density Function describes a continuous random variable. The probability of any single exact point is zero; probability is calculated from the area under the curve over an interval.',
    useCase: 'Gaussian continuous modeling, VAEs, and diffusion generative models.'
  },
  {
    id: 'ai-w2-m3-fc-5',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Cumulative Distribution Function (CDF)',
    frontPrompt: 'What is a CDF?',
    backFormula: 'F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt',
    backExplanation: 'A Cumulative Distribution Function gives the accumulated probability that $X$ is less than or equal to a specified value $x$: $F(x) = P(X \\le x)$.',
    useCase: 'Confidence intervals, quantile regression, and hypothesis testing p-values.'
  },
  {
    id: 'ai-w2-m3-fc-6',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Bernoulli Distribution',
    frontPrompt: 'What is a Bernoulli distribution?',
    backFormula: 'P(X=1) = p, \\quad P(X=0) = 1-p, \\quad X \\in \\{0, 1\\}',
    backExplanation: 'It describes a single experiment trial with exactly two binary outcomes: success ($X=1$) with probability $p$, and failure ($X=0$) with probability $1-p$.',
    useCase: 'Binary classification (e.g., spam vs. not spam, fraud detection).'
  },
  {
    id: 'ai-w2-m3-fc-7',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Mean and Variance of a Bernoulli Variable',
    frontPrompt: 'What are the mean and variance of a Bernoulli variable?',
    backFormula: '\\mathbb{E}[X] = p, \\quad \\operatorname{Var}(X) = p(1-p)',
    backExplanation: 'If $X \\sim \\text{Bernoulli}(p)$, then its expected value is $\\mathbb{E}[X]=p$ and its variance is $\\operatorname{Var}(X)=p(1-p)$.',
    useCase: 'Binary cross-entropy loss derivation and coin toss simulations.'
  },
  {
    id: 'ai-w2-m3-fc-8',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Expected Value (Mathematical Expectation)',
    frontPrompt: 'What is expected value?',
    backFormula: '\\mathbb{E}[X] = \\sum x P(X=x) \\quad \\text{or} \\quad \\int x f(x)\\,dx',
    backExplanation: 'Expected value is the probability-weighted long-run average outcome of a random variable: $\\mathbb{E}[X] = \\sum x P(X=x)$.',
    useCase: 'Empirical risk minimization (ERM) and average loss computation.'
  },
  {
    id: 'ai-w2-m3-fc-9',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Variance Definition & Computation',
    frontPrompt: 'What is variance?',
    backFormula: '\\operatorname{Var}(X) = \\mathbb{E}[(X - \\mu)^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2',
    backExplanation: 'Variance measures the average squared distance of outcomes from the distribution mean $\\mu$, quantifying spread and dispersion.',
    useCase: 'Feature scaling, batch normalization, and bias-variance tradeoff.'
  },
  {
    id: 'ai-w2-m3-fc-10',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Gaussian (Normal) Distribution',
    frontPrompt: 'What is a Gaussian distribution?',
    backFormula: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\left( -\\frac{(x-\\mu)^2}{2\\sigma^2} \\right)',
    backExplanation: 'A Gaussian, or normal, distribution is a symmetric bell-shaped continuous distribution completely described by its mean $\\mu$ (center) and standard deviation $\\sigma$ (spread).',
    useCase: 'Weight initialization, measurement noise modeling, and Central Limit Theorem.'
  },
  {
    id: 'ai-w2-m3-fc-11',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Standard Normal Distribution & Z-Score',
    frontPrompt: 'What is a standard normal distribution and z-score?',
    backFormula: 'Z \\sim \\mathcal{N}(0, 1), \\quad z = \\frac{x - \\mu}{\\sigma}',
    backExplanation: 'A standard normal variable has zero mean and unit variance: $Z \\sim \\mathcal{N}(0,1)$. A z-score measures how many standard deviations an observation $x$ lies above or below the mean.',
    useCase: 'Feature standardization ($z$-score normalization) before training gradient-based models.'
  },
  {
    id: 'ai-w2-m3-fc-12',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Covariance and Correlation',
    frontPrompt: 'What are covariance and correlation?',
    backFormula: '\\operatorname{Corr}(X, Y) = \\frac{\\operatorname{Cov}(X, Y)}{\\sigma_X \\sigma_Y} \\in [-1, 1]',
    backExplanation: 'Covariance measures whether two variables tend to increase or decrease together. Correlation is standardized covariance, strictly bounded in $[-1, 1]$ ($+1$ = perfect linear positive, $-1$ = perfect linear negative).',
    useCase: 'Feature selection, multi-collinearity checks, and covariance matrices in PCA.'
  },
  {
    id: 'ai-w2-m3-fc-13',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Conditional Probability',
    frontPrompt: 'What is conditional probability?',
    backFormula: 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0',
    backExplanation: 'It measures the updated probability of event $A$ occurring given the factual knowledge that event $B$ has already occurred.',
    useCase: 'Markov chains, language models $P(w_t \\mid w_{t-1}, \\dots)$, and Bayes decision theory.'
  },
  {
    id: 'ai-w2-m3-fc-14',
    category: 'Module 3: Probabilistic Foundations',
    title: "Bayes' Theorem",
    frontPrompt: 'What is Bayes’ theorem?',
    backFormula: 'P(A \\mid B) = \\frac{P(B \\mid A)P(A)}{P(B)} = \\frac{P(B \\mid A)P(A)}{P(B \\mid A)P(A) + P(B \\mid \\neg A)P(\\neg A)}',
    backExplanation: 'Bayes’ theorem updates prior probabilities using observed likelihood evidence to produce a posterior probability: $P(A \\mid B) = \\frac{P(B \\mid A)P(A)}{P(B)}$.',
    useCase: 'Naive Bayes classifiers, Bayesian optimization, and medical diagnostic test interpretation.'
  },

  // ==========================================
  // MODULE 4: FIRST-ORDER OPTIMIZATION
  // ==========================================
  {
    id: 'ai-w2-m4-fc-1',
    category: 'Module 4: First-Order Optimization',
    title: 'Stochastic Gradient Descent (SGD) with Momentum',
    frontPrompt: 'How does Classical Momentum improve vanilla SGD in ravines with high curvature oscillations?',
    backFormula: '\\mathbf{v}_t = \\gamma \\mathbf{v}_{t-1} + \\eta \\nabla L(\\boldsymbol{\\theta}_t), \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\mathbf{v}_t',
    backExplanation: 'Momentum accumulates an exponentially decaying moving average of past gradients (velocity vector v). Persistent directions compound velocity, while alternating high-frequency oscillations cancel out, damping oscillations and speeding through flat ravines.',
    useCase: 'Accelerating convergence in deep CNNs and overcoming shallow saddle points.',
    remark: 'Typically γ ≈ 0.9. Nesterov Accelerated Gradient (NAG) evaluates the gradient after a lookahead momentum step.'
  },
  {
    id: 'ai-w2-m4-fc-2',
    category: 'Module 4: First-Order Optimization',
    title: 'Adam Optimizer (Adaptive Moment Estimation)',
    frontPrompt: 'How does Adam combine first-moment (momentum) and second-moment (RMSProp) estimates?',
    backFormula: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2, \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t',
    backExplanation: 'Adam maintains running estimates of both the mean (m_t) and uncentered variance (v_t) of gradients. Bias correction (m̂ = m/(1-β₁ᵗ), v̂ = v/(1-β₂ᵗ)) offsets initial zero-bias. Each coordinate receives an adaptive learning rate inversely proportional to the gradient scale.',
    useCase: 'Standard default optimizer for Transformers, LLMs, and computer vision models.',
    remark: 'Standard hyperparameter defaults: β₁ = 0.9, β₂ = 0.999, ε = 1e-8.'
  },

  // ==========================================
  // MODULE 5: SECOND-ORDER OPTIMIZATION
  // ==========================================
  {
    id: 'ai-w2-m5-fc-1',
    category: 'Module 5: Second-Order Optimization',
    title: "Newton's Optimization Method in Multiple Dimensions",
    frontPrompt: "What is the update rule of Newton's Method, and what role does the Hessian Matrix play?",
    backFormula: '\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\mathbf{H}^{-1} \\nabla f(\\boldsymbol{\\theta}_t), \\quad \\mathbf{H}_{ij} = \\frac{\\partial^2 f}{\\partial \\theta_i \\partial \\theta_j}',
    backExplanation: "Newton's method fits a local quadratic Taylor approximation and jumps directly to the vertex stationary point. It incorporates local curvature (Hessian H), achieving quadratic convergence near a minimum without requiring a tuned learning rate.",
    useCase: 'Logistic regression and GLMs (Iteratively Reweighted Least Squares / IRLS) with small parameter counts.',
    remark: 'Inverting the n × n Hessian costs O(n³), which is intractable for modern deep neural networks with millions of parameters.'
  },
  {
    id: 'ai-w2-m5-fc-2',
    category: 'Module 5: Second-Order Optimization',
    title: 'Quasi-Newton Methods & BFGS / L-BFGS',
    frontPrompt: 'How does BFGS and Limited-Memory BFGS (L-BFGS) approximate Newton steps without storing the full Hessian?',
    backFormula: '\\mathbf{B}_{k+1} = \\mathbf{B}_k + \\frac{\\mathbf{y}_k \\mathbf{y}_k^T}{\\mathbf{y}_k^T \\mathbf{s}_k} - \\frac{\\mathbf{B}_k \\mathbf{s}_k \\mathbf{s}_k^T \\mathbf{B}_k}{\\mathbf{s}_k^T \\mathbf{B}_k \\mathbf{s}_k}',
    backExplanation: 'BFGS iteratively constructs an approximation B_k ≈ H (or its inverse H⁻¹) using successive gradient differences y_k and position steps s_k. L-BFGS only stores the last m (typically 5–20) step vectors, reducing memory complexity from O(n²) to O(mn).',
    useCase: 'Large-scale convex optimization, style transfer, and training CRF sequence models on CPU clusters.',
    remark: 'Natural Gradient replaces the Hessian with the Fisher Information Matrix F, maintaining invariance to parameter coordinate reparameterization.'
  }
];
