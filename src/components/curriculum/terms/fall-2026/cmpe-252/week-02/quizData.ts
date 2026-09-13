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
        id: 'w2_s2_q1',
        question: 'What is a partial derivative?',
        options: [
          'Derivative with respect to every variable at the same time',
          'Derivative with respect to one variable while keeping other variables constant',
          'The average of all derivatives',
          'The derivative of a matrix only'
        ],
        correct: 1,
        explanation: 'For a multivariable function such as $f(x, y) = x^2 + 3y$, the partial derivative with respect to $x$ treats $y$ as a constant: $\\frac{\\partial f}{\\partial x} = 2x$. The partial derivative with respect to $y$ treats $x$ as constant: $\\frac{\\partial f}{\\partial y} = 3$.'
      },
      {
        id: 'w2_s2_q2',
        question: 'Let $f(x, y) = x^2 + 3y$. What is $\\frac{\\partial f}{\\partial x}$?',
        options: ['$x^2$', '$2x$', '$3$', '$2x + 3$'],
        correct: 1,
        explanation: 'When differentiating with respect to $x$, treat $3y$ as a constant: $\\frac{\\partial}{\\partial x}(x^2) = 2x$ and $\\frac{\\partial}{\\partial x}(3y) = 0$. Therefore, $\\frac{\\partial f}{\\partial x} = 2x$.'
      },
      {
        id: 'w2_s2_q3',
        question: 'Let $f(x, y) = x^2 + 3y$. What is $\\frac{\\partial f}{\\partial y}$?',
        options: ['$2x$', '$3y$', '$3$', '$x^2 + 3$'],
        correct: 2,
        explanation: 'When differentiating with respect to $y$, treat $x^2$ as a constant: $\\frac{\\partial}{\\partial y}(x^2) = 0$ and $\\frac{\\partial}{\\partial y}(3y) = 3$. Therefore, $\\frac{\\partial f}{\\partial y} = 3$.'
      },
      {
        id: 'w2_s2_q4',
        question: 'For $f(x, y) = x^2 + 3y$, what is the gradient at the point (2, 5)?',
        options: ['[2, 3]', '[4, 3]', '[4, 5]', '[2, 5]'],
        correct: 1,
        explanation: 'The gradient vector is $\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x} \\\\ \\frac{\\partial f}{\\partial y} \\end{bmatrix} = \\begin{bmatrix} 2x \\\\ 3 \\end{bmatrix}$. At $(x=2, y=5)$: $\\nabla f(2, 5) = \\begin{bmatrix} 2(2) \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 3 \\end{bmatrix}$.'
      },
      {
        id: 'w2_s2_q5',
        question: 'What does the gradient vector $\\nabla f$ point toward?',
        options: [
          'The direction of steepest decrease',
          'The direction of steepest increase',
          'Always the origin',
          'A random direction'
        ],
        correct: 1,
        explanation: 'The gradient points in the direction where the function increases most rapidly (steepest uphill slope). For a loss function, we want to decrease error, so gradient descent moves in the opposite direction: $-\\nabla L$.'
      },
      {
        id: 'w2_s2_q6',
        question: 'What is the gradient descent parameter update rule?',
        options: [
          '$\\theta_{\\text{new}} = \\theta + \\eta \\nabla L$',
          '$\\theta_{\\text{new}} = \\theta - \\eta \\nabla L$',
          '$\\theta_{\\text{new}} = \\nabla L - \\theta$',
          '$\\theta_{\\text{new}} = \\theta \\eta \\nabla L$'
        ],
        correct: 1,
        explanation: 'In the update rule $\\theta_{\\text{new}} = \\theta - \\eta \\nabla L$, $\\theta$ represents model parameters, $\\eta$ is the learning rate, and $\\nabla L$ is the gradient of the loss. We subtract $\\eta \\nabla L$ to step downhill against the direction of increasing loss.'
      },
      {
        id: 'w2_s2_q7',
        question: 'Suppose current parameter $\\theta = 5$, gradient is $2$, and learning rate $\\eta = 0.1$. What is the updated parameter?',
        options: ['5.2', '4.8', '2.0', '0.5'],
        correct: 1,
        explanation: 'Using $\\theta_{\\text{new}} = \\theta - \\eta \\nabla L$: $\\theta_{\\text{new}} = 5 - (0.1)(2) = 5 - 0.2 = 4.8$. The parameter shifts downhill in the opposite direction of the positive slope.'
      },
      {
        id: 'w2_s2_q8',
        question: 'What happens if the learning rate $\\eta$ is set too large?',
        options: [
          'Training may overshoot the minimum and diverge',
          'The gradient becomes zero automatically',
          'The model always converges instantly to the global optimum',
          'The loss function disappears'
        ],
        correct: 0,
        explanation: 'The learning rate controls the descent step size. If it is too large, the optimizer can overshoot the valley minimum, oscillate erratically, or even diverge with escalating loss.'
      },
      {
        id: 'w2_s2_q9',
        question: 'Let $y = (3x + 1)^2$. What is $\\frac{dy}{dx}$ at $x = 1$?',
        options: ['6', '8', '18', '24'],
        correct: 3,
        explanation: 'By the chain rule, $\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}$. For outer function $y = u^2$, derivative is $2u$. For inner function $u = 3x + 1$, derivative is $3$. Thus $\\frac{dy}{dx} = 2(3x + 1)(3) = 6(3x + 1)$. At $x = 1$: $6(3(1) + 1) = 6(4) = 24$.'
      },
      {
        id: 'w2_s2_q10',
        question: 'What is a directional derivative $D_{\\mathbf{u}} f$?',
        options: [
          'The rate of change of a function along one chosen direction',
          'The derivative of every output with respect to every input',
          'The average value of a function across the domain',
          'The Euclidean length of a vector'
        ],
        correct: 0,
        explanation: 'A directional derivative measures how rapidly a scalar function changes when moving along a specific direction vector: $D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$, where $\\mathbf{u}$ is normalized to unit length ($\\|\\mathbf{u}\\| = 1$).'
      },
      {
        id: 'w2_s2_q11',
        question: 'Let $f(x, y) = x^2 + y^2$. What is the gradient $\\nabla f$ at $(1, 2)$?',
        options: ['[1, 2]', '[2, 2]', '[2, 4]', '[1, 4]'],
        correct: 2,
        explanation: 'The partial derivatives are $\\frac{\\partial f}{\\partial x} = 2x$ and $\\frac{\\partial f}{\\partial y} = 2y$. Thus $\\nabla f = [2x, 2y]^T$. At $(1, 2)$: $\\nabla f(1, 2) = [2(1), 2(2)]^T = [2, 4]^T$.'
      },
      {
        id: 'w2_s2_q12',
        question: 'What is the primary difference between a directional derivative and a Jacobian matrix?',
        options: [
          'They are identical mathematical representations',
          'A directional derivative gives rate of change in one chosen direction, while a Jacobian stores all partial derivatives of a vector-valued function',
          'A Jacobian only applies to scalar input functions',
          'A directional derivative always outputs a multi-row matrix'
        ],
        correct: 1,
        explanation: 'A directional derivative evaluates scalar rate of change along one single trajectory vector ($D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$). A Jacobian matrix $\\mathbf{J} \\in \\mathbb{R}^{m \\times n}$ organizes the partial derivatives of all $m$ outputs with respect to all $n$ inputs for a vector-valued map $\\mathbf{F}: \\mathbb{R}^n \\to \\mathbb{R}^m$.'
      },
      {
        id: 'w2_s2_q13',
        question: 'If a vector-valued function has 3 inputs and 2 outputs, what is the dimension (shape) of its Jacobian matrix?',
        options: ['3 × 3', '2 × 2', '3 × 2', '2 × 3'],
        correct: 3,
        explanation: 'The Jacobian matrix has one row for each output and one column for each input: $\\text{Shape} = \\text{outputs} \\times \\text{inputs}$. With 2 outputs and 3 inputs, $\\mathbf{J}$ is a $2 \\times 3$ matrix.'
      },
      {
        id: 'w2_s2_q14',
        question: 'Consider the hyperbolic function $f(x, y) = x^2 - y^2$. What type of critical point is $(0, 0)$?',
        options: ['A global minimum', 'A global maximum', 'A saddle point', 'A degenerate flat plateau only'],
        correct: 2,
        explanation: 'Along the $x$-axis, $f(x, 0) = x^2$ curves upward (local minimum). Along the $y$-axis, $f(0, y) = -y^2$ curves downward (local maximum). Because the surface curves up in one direction and down in another, $(0, 0)$ is a saddle point.'
      },
      {
        id: 'w2_s2_q15',
        question: 'What characterizes a flat plateau region on a loss surface?',
        options: [
          'A region where the gradient magnitude is extremely large',
          'A region where the gradient is near zero (∇L ≈ 0), causing descent steps to stall',
          'A region where loss values are strictly negative',
          'A parameter space with no active weights'
        ],
        correct: 1,
        explanation: 'In a flat plateau region, the slope is nearly zero: $\\nabla L \\approx 0$. Standard gradient descent steps $\\Delta \\theta = -\\eta \\nabla L$ become vanishingly small, causing optimization to stall or progress agonizingly slowly without necessarily being at a true minimum.'
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
