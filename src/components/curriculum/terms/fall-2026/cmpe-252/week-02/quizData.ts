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
        question: 'What is the length (norm) of the vector v = [3, 4]?',
        options: ['3', '4', '5', '7'],
        correct: 2,
        explanation: 'The Euclidean length, or norm, of a vector is $\\|v\\| = \\sqrt{x_1^2 + x_2^2}$. Therefore: $\\|v\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.'
      },
      {
        id: 'w2_s1_q2',
        question: 'What is the dot product of [1, 2] and [3, 4]?',
        options: ['7', '10', '11', '24'],
        correct: 2,
        explanation: 'Multiply corresponding elements and add: $[1, 2] \\cdot [3, 4] = (1)(3) + (2)(4) = 3 + 8 = 11$.'
      },
      {
        id: 'w2_s1_q3',
        question: 'What does a dot product of zero (u · v = 0) usually indicate for non-zero vectors?',
        options: [
          'The vectors have the same length',
          'The vectors are parallel',
          'The vectors are orthogonal (perpendicular)',
          'The vectors are identical'
        ],
        correct: 2,
        explanation: 'The dot product is related to the angle between two vectors: $u \\cdot v = \\|u\\|\\|v\\|\\cos(\\theta)$. For perpendicular vectors, the angle is $90^\\circ$, and $\\cos(90^\\circ) = 0$. Therefore: $u \\cdot v = 0$.'
      },
      {
        id: 'w2_s1_q4',
        question: 'What is the shape of the matrix product Ax if A is 3 × 2 and x is 2 × 1?',
        options: ['3 × 1', '2 × 3', '3 × 2', '2 × 1'],
        correct: 0,
        explanation: 'For matrix multiplication, the inner dimensions must match: $(3 \\times 2)(2 \\times 1)$. The inner numbers are both 2, so multiplication is compatible. The outer dimensions determine the result shape: $3 \\times 1$.'
      },
      {
        id: 'w2_s1_q5',
        question: 'Calculate Ax for A = [[1, 2], [3, 4]] and x = [5, 6]^T. What is Ax?',
        options: [
          '[11, 39]^T',
          '[17, 39]^T',
          '[16, 24]^T',
          '[5, 6]^T'
        ],
        correct: 1,
        explanation: 'Multiply each row of $A$ by vector $x$:\nFirst row: $(1)(5) + (2)(6) = 5 + 12 = 17$.\nSecond row: $(3)(5) + (4)(6) = 15 + 24 = 39$.\nTherefore: $Ax = \\begin{bmatrix} 17 \\\\ 39 \\end{bmatrix}$.'
      },
      {
        id: 'w2_s1_q6',
        question: 'Let u = [1, 0] and v = [3, 4]. What is the orthogonal projection of v onto u?',
        options: ['[0, 4]', '[3, 0]', '[1, 0]', '[3, 4]'],
        correct: 1,
        explanation: 'Vector $u = [1, 0]$ points horizontally. Projecting $v = [3, 4]$ onto $u$ preserves the horizontal component (3) and eliminates the vertical component (4), yielding $\\text{proj}_u(v) = [3, 0]$. Mathematically: $\\text{proj}_u(v) = \\left(\\frac{u \\cdot v}{u \\cdot u}\\right)u = \\left(\\frac{3}{1}\\right)[1, 0] = [3, 0]$. The projection is the "shadow" of one vector onto another direction.'
      },
      {
        id: 'w2_s1_q7',
        question: 'Which pair of vectors is orthogonal?',
        options: [
          '[1, 2] and [2, 4]',
          '[1, 1] and [1, 1]',
          '[2, -1] and [1, 2]',
          '[3, 3] and [6, 6]'
        ],
        correct: 2,
        explanation: 'Calculate the dot product: $[2, -1] \\cdot [1, 2] = (2)(1) + (-1)(2) = 2 - 2 = 0$. Because the dot product is exactly zero, the vectors are orthogonal.'
      },
      {
        id: 'w2_s1_q8',
        question: 'In the Gram–Schmidt process, what is the geometric purpose of subtracting a projection?',
        options: [
          'To make vectors longer',
          'To remove the part pointing in an earlier vector’s direction',
          'To turn every vector into zero',
          'To change vectors into matrices'
        ],
        correct: 1,
        explanation: 'Gram–Schmidt constructs an orthogonal basis. For the second vector, we compute $u_2 = v_2 - \\text{proj}_{u_1}(v_2)$, which removes the component of $v_2$ that aligns with $u_1$, leaving a remainder that is strictly perpendicular to $u_1$.'
      },
      {
        id: 'w2_s1_q9',
        question: 'Suppose v₁ = [1, 0] and v₂ = [1, 1]. After applying Gram–Schmidt, what is the second orthogonal vector u₂?',
        options: ['[1, 1]', '[1, 0]', '[0, 1]', '[2, 1]'],
        correct: 2,
        explanation: 'The first orthogonal vector is $u_1 = v_1 = [1, 0]$. The projection of $v_2$ onto $u_1$ is $\\text{proj}_{u_1}(v_2) = [1, 0]$. Subtracting yields $u_2 = v_2 - \\text{proj}_{u_1}(v_2) = [1, 1] - [1, 0] = [0, 1]$. The vectors $[1, 0]$ and $[0, 1]$ are mutually orthogonal.'
      },
      {
        id: 'w2_s1_q10',
        question: 'In an LU decomposition (A = LU), what do L and U represent?',
        options: [
          'Left and right vectors',
          'Lower-triangular and upper-triangular matrices',
          'Length and unit matrices',
          'Linear and uniform matrices'
        ],
        correct: 1,
        explanation: 'LU decomposition factors a matrix as $A = LU$, where $L$ is a lower-triangular matrix (zeros above the main diagonal) and $U$ is an upper-triangular matrix (zeros below the main diagonal).'
      },
      {
        id: 'w2_s1_q11',
        question: 'Which equation represents Singular Value Decomposition (SVD)?',
        options: [
          'A = U + Σ + V',
          'A = LU',
          'A = UΣV^T',
          'A = UV + Σ'
        ],
        correct: 2,
        explanation: 'Singular value decomposition factors any real matrix into $A = U\\Sigma V^T$, where $U$ contains orthonormal left singular vectors (output directions), $\\Sigma$ is a diagonal matrix of non-negative singular values (scaling factors), and $V^T$ contains orthonormal right singular vectors (input directions).'
      },
      {
        id: 'w2_s1_q12',
        question: 'Where are the singular values stored in Singular Value Decomposition (SVD)?',
        options: [
          'In U',
          'In V',
          'In A^T',
          'On the diagonal of Σ'
        ],
        correct: 3,
        explanation: 'In $A = U\\Sigma V^T$, the matrix $\\Sigma$ is diagonal: $\\Sigma = \\begin{bmatrix} \\sigma_1 & 0 \\\\ 0 & \\sigma_2 \\end{bmatrix}$. The sorted diagonal entries $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$ are the singular values, indicating the variance/energy along principal transformed directions.'
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
