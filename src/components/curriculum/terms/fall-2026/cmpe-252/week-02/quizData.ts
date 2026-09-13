export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModule {
  title: string;
  stepNumber: number;
  badge: string;
  sub: string;
  questions: QuestionItem[];
}

export const AI_WEEK2_QUIZ: Record<string, QuizModule> = {
  s1: {
    title: 'Module 1: Linear Algebra & Matrix Factorizations',
    stepNumber: 1,
    badge: 'LU & SVD Decomposition',
    sub: 'Solving Ax = b & Low-Rank Approximation',
    questions: [
      {
        id: 'w2_s1_q1',
        question: 'Why is LU Decomposition preferred over direct matrix inversion when solving Ax = b for multiple different vectors b?',
        options: [
          'LU decomposition does not require the matrix to be square.',
          'Once L and U are computed in O(n³), solving for each new b takes only O(n²) via forward and backward substitution, whereas multiplying by A⁻¹ introduces higher numerical instability.',
          'LU decomposition converts all non-zero eigenvalues to 1.',
          'LU decomposition eliminates the need for pivoting in all matrices.'
        ],
        correct: 1,
        explanation: 'Factoring $A = LU$ costs $O(n^3)$ once. For any subsequent vector $b$, solving $Ly = b$ (forward substitution) and $Ux = y$ (backward substitution) requires only $O(n^2)$ triangular solves. Direct inversion is more computationally prone to rounding error and numerical instability.'
      },
      {
        id: 'w2_s1_q2',
        question: 'According to the Eckart-Young-Mirsky Theorem, how do we construct the optimal rank-k approximation of a matrix A using SVD?',
        options: [
          'By setting the bottom-left block of U to zero.',
          'By retaining the top k singular values in Σ and truncating the remaining singular values to zero ($A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$).',
          'By computing the QR factorization of the right singular vectors V.',
          'By dividing each singular value by the trace of matrix A.'
        ],
        correct: 1,
        explanation: 'Truncating the SVD expansion to the first $k$ terms ($A_k = U_k \\Sigma_k V_k^T$) provides the closest rank-$k$ matrix to $A$ under both the Frobenius norm and spectral norm, forming the mathematical foundation for PCA and data compression.'
      }
    ]
  },
  s2: {
    title: 'Module 2: Multivariable Calculus & Gradients',
    stepNumber: 2,
    badge: 'Gradient Vector & Rates of Change',
    sub: 'Direction of Steepest Ascent & Multivariable Chain Rule',
    questions: [
      {
        id: 'w2_s2_q3',
        question: 'What is the geometric relationship between the gradient vector ∇f(x) and the level curve (contour) f(x) = c passing through point x?',
        options: [
          'The gradient vector is tangent (parallel) to the level curve.',
          'The gradient vector is orthogonal (perpendicular) to the level curve and points in the direction of steepest increase.',
          'The gradient vector always points toward the global coordinate origin (0, 0).',
          'The gradient vector magnitude equals the determinant of the Hessian.'
        ],
        correct: 1,
        explanation: 'Because the value of $f(\\mathbf{x})$ is constant along the level curve $f(\\mathbf{x}) = c$, the directional derivative along the tangent vector is zero: $\\nabla f \\cdot \\mathbf{v} = 0$. Hence, $\\nabla f$ is strictly normal (orthogonal) to the contour curve and points toward the steepest rate of increase.'
      },
      {
        id: 'w2_s2_q4',
        question: 'In computational backpropagation, if a loss L depends on x through two pathways y₁ and y₂, what is ∂L/∂x?',
        options: [
          '$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial y_1} \\times \\frac{\\partial L}{\\partial y_2}$',
          '$\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial y_1}\\frac{\\partial y_1}{\\partial x} + \\frac{\\partial L}{\\partial y_2}\\frac{\\partial y_2}{\\partial x}$',
          '$\\frac{\\partial L}{\\partial x} = \\max\\left(\\frac{\\partial y_1}{\\partial x}, \\frac{\\partial y_2}{\\partial x}\\right)$',
          '$\\frac{\\partial L}{\\partial x} = \\frac{\\partial y_1}{\\partial x} + \\frac{\\partial y_2}{\\partial x}$'
        ],
        correct: 1,
        explanation: 'By the multivariable chain rule, when variations in $x$ affect the final loss $L$ along multiple paths $y_1(x)$ and $y_2(x)$, the total derivative sums the contributions along all directed paths in the computational graph: $\\frac{\\partial L}{\\partial x} = \\sum_j \\frac{\\partial L}{\\partial y_j}\\frac{\\partial y_j}{\\partial x}$.'
      }
    ]
  },
  s3: {
    title: 'Module 3: Probabilistic Foundations',
    stepNumber: 3,
    badge: 'Random Variables & Distributions',
    sub: 'Expectation, Covariance & Gaussian Properties',
    questions: [
      {
        id: 'w2_s3_q5',
        question: 'What does a non-zero off-diagonal covariance entry Σ_{ij} indicate in a multivariate Gaussian distribution?',
        options: [
          'Variables X_i and X_j are statistically dependent and linearly correlated.',
          'The distribution has infinite variance along coordinate i.',
          'The mean of variable X_i is greater than that of X_j.',
          'The probability density function is non-integrable.'
        ],
        correct: 0,
        explanation: 'In the covariance matrix $\\boldsymbol{\\Sigma}$, off-diagonal elements $\\text{Cov}(X_i, X_j) = \\mathbb{E}[(X_i - \\mu_i)(X_j - \\mu_j)]$ reflect pairwise linear association. For Gaussian distributions, zero covariance uniquely implies statistical independence ($\\\\Sigma_{ij} = 0 \\iff X_i \\perp X_j$).'
      },
      {
        id: 'w2_s3_q6',
        question: 'For any constant c and random variable X, how do Expectation E[cX] and Variance Var(cX) scale?',
        options: [
          '$\\mathbb{E}[cX] = c\\mathbb{E}[X]$ and $\\text{Var}(cX) = c\\text{Var}(X)$',
          '$\\mathbb{E}[cX] = c\\mathbb{E}[X]$ and $\\text{Var}(cX) = c^2\\text{Var}(X)$',
          '$\\mathbb{E}[cX] = c^2\\mathbb{E}[X]$ and $\\text{Var}(cX) = c^2\\text{Var}(X)$',
          '$\\mathbb{E}[cX] = \\mathbb{E}[X] + c$ and $\\text{Var}(cX) = \\text{Var}(X)$'
        ],
        correct: 1,
        explanation: 'By linearity of expectation, $\\mathbb{E}[cX] = c\\mathbb{E}[X]$. Because variance measures squared deviations, constant factors pull out quadratically: $\\text{Var}(cX) = \\mathbb{E}[(cX - c\\mathbb{E}[X])^2] = c^2\\text{Var}(X)$.'
      }
    ]
  },
  s4: {
    title: 'Module 4: First-Order Optimization',
    stepNumber: 4,
    badge: 'SGD, Momentum & Adam',
    sub: 'Stochastic Convergence & Adaptive Moment Schedules',
    questions: [
      {
        id: 'w2_s4_q7',
        question: 'Why does Adam optimization include bias-correction terms m̂_t = m_t / (1 - β₁ᵗ) and v̂_t = v_t / (1 - β₂ᵗ)?',
        options: [
          'To prevent the learning rate from decaying to zero after many epochs.',
          'To correct for the initial zero-bias that occurs when moving averages are initialized at m₀ = 0 and v₀ = 0.',
          'To invert the second-order Hessian matrix implicitly.',
          'To enforce strict convexity of non-convex neural network losses.'
        ],
        correct: 1,
        explanation: 'Because running moment accumulators are initialized to $m_0 = 0$ and $v_0 = 0$, uncorrected estimates are strongly biased toward zero during the initial training iterations (especially with $\\beta_2 = 0.999$). Dividing by $1 - \\beta^t$ ensures unbiased estimators $\\mathbb{E}[\\hat{m}_t] = \\mathbb{E}[g_t]$ from the very first step.'
      },
      {
        id: 'w2_s4_q8',
        question: 'What is the principal advantage of Stochastic Gradient Descent (SGD) with Mini-Batches compared to Full Batch Gradient Descent (BGD)?',
        options: [
          'SGD computes the true analytical gradient with zero variance on every step.',
          'SGD updates parameters much faster per epoch, fits comfortably in GPU memory, and the stochastic noise helps escape shallow local minima.',
          'SGD guarantees monotonic decreasing loss at every individual step.',
          'SGD eliminates the necessity of tuning the learning rate.'
        ],
        correct: 1,
        explanation: 'Full BGD requires passing over the entire training set before executing a single update, which is slow and memory-prohibitive for large datasets. Mini-batch SGD provides frequent gradient updates with GPU parallelism, while stochastic noise acts as implicit regularization aiding escape from saddle points and poor local minima.'
      }
    ]
  },
  s5: {
    title: 'Module 5: Second-Order Optimization',
    stepNumber: 5,
    badge: 'Newton, Hessian & L-BFGS',
    sub: 'Curvature Acceleration & Memory Constraints',
    questions: [
      {
        id: 'w2_s5_q9',
        question: "Why is pure Newton's Method (θ_{t+1} = θ_t - H⁻¹∇f) rarely used directly for deep learning models with millions of parameters?",
        options: [
          "Newton's method only converges if the learning rate is smaller than 10⁻⁸.",
          "Computing and inverting the n × n Hessian matrix requires O(n²) memory and O(n³) compute per step, which is computationally intractable for millions of weights.",
          "Newton's method is only capable of finding maxima, never minima.",
          "The Hessian matrix of a neural network is always identically zero."
        ],
        correct: 1,
        explanation: 'For a network with $n = 10^7$ parameters, storing the $n \\times n$ Hessian requires over 400 Terabytes of memory, and inverting it ($O(n^3)$ operations) is impossible. Quasi-Newton methods like L-BFGS or first-order adaptive methods are used instead.'
      },
      {
        id: 'w2_s5_q10',
        question: 'What must be true about the Hessian matrix H at a stationary point (∇f = 0) for that point to be guaranteed a strict local minimum?',
        options: [
          'H must be negative definite (all eigenvalues negative).',
          'H must be symmetric positive definite (all eigenvalues strictly positive, vᵀ H v > 0 for all v ≠ 0).',
          'H must have a determinant of exactly 0.',
          'H must have trace equal to 1.'
        ],
        correct: 1,
        explanation: 'By the second-derivative test in multiple dimensions, if $\\nabla f(\\mathbf{x}^*) = 0$ and the Hessian $\\mathbf{H}(\\mathbf{x}^*)$ is symmetric positive definite (SPD), the local quadratic curvature curves upward in all directions, confirming a strict local minimum.'
      }
    ]
  }
};
