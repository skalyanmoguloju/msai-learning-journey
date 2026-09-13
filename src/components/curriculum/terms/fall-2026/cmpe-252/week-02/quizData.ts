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
    badge: 'Random Variables & Probability Distributions',
    sub: 'Expectation, Variance, Covariance & Bayes Rule',
    questions: [
      {
        id: 'w2_s3_q1',
        question: 'What is a random variable?',
        options: [
          'A number that never changes',
          'A numerical outcome determined by chance',
          'A variable that must always be zero',
          'A type of graph'
        ],
        correct: 1,
        explanation: 'A random variable is usually represented by a letter such as $X$. It stores the numerical result of a random event. For a coin toss: $X = \\begin{cases} 1 & \\text{if heads} \\\\ 0 & \\text{if tails} \\end{cases}$. The result is uncertain before the toss, so $X$ is a random variable.'
      },
      {
        id: 'w2_s3_q2',
        question: 'Which is an example of a discrete random variable?',
        options: [
          "A person's height",
          'The exact temperature',
          'The number shown when rolling a die',
          'The time needed to finish a race'
        ],
        correct: 2,
        explanation: 'A discrete random variable has countable values. A die can show only $1, 2, 3, 4, 5, 6$. Height, temperature, and time can take continuous decimal values inside a continuum.'
      },
      {
        id: 'w2_s3_q3',
        question: 'Which is an example of a continuous random variable?',
        options: [
          'Number of students in a class',
          'Number of heads in five coin tosses',
          'Number of emails received',
          'The weight of a person'
        ],
        correct: 3,
        explanation: 'Weight can take any real value inside an interval ($70\\text{ kg}, 70.5\\text{ kg}, 70.52\\text{ kg}, \\dots$), so it is continuous. Countable quantities like student counts or coin tosses are discrete.'
      },
      {
        id: 'w2_s3_q4',
        question: 'What does a PMF (Probability Mass Function) describe?',
        options: [
          'The probability of values for a discrete random variable',
          'The slope of a function',
          'The distance between two vectors',
          'The average of a dataset only'
        ],
        correct: 0,
        explanation: 'PMF stands for Probability Mass Function. It assigns probabilities to each exact discrete value: $P(X = x)$. For example, for a fair die: $P(X = 4) = \\frac{1}{6}$.'
      },
      {
        id: 'w2_s3_q5',
        question: 'What does a PDF (Probability Density Function) describe?',
        options: [
          'The exact probability of every continuous value',
          'Probability density for a continuous random variable',
          'A matrix decomposition',
          'A vector’s direction'
        ],
        correct: 1,
        explanation: 'PDF stands for Probability Density Function. For a continuous variable, the probability of any exact single point is zero: $P(X = c) = 0$. Instead, probabilities are calculated over intervals via integration: $P(a < X < b) = \\int_a^b f(x)\\,dx$.'
      },
      {
        id: 'w2_s3_q6',
        question: 'What does a CDF (Cumulative Distribution Function) represent?',
        options: [
          '$P(X = x)$ only',
          '$P(X \\ge x)$ only',
          '$P(X \\le x)$',
          'The variance of $X$'
        ],
        correct: 2,
        explanation: 'CDF stands for Cumulative Distribution Function. It accumulates probability from negative infinity up to a chosen threshold: $F(x) = P(X \\le x)$.'
      },
      {
        id: 'w2_s3_q7',
        question: 'A Bernoulli random variable has what possible values?',
        options: [
          'Any real number',
          'Only 0 and 1',
          'Only −1 and 1',
          'Only values greater than 1'
        ],
        correct: 1,
        explanation: 'A Bernoulli experiment has exactly two mutually exclusive outcomes: $X = 1$ for success and $X = 0$ for failure (e.g., click/no-click, pass/fail, disease/healthy).'
      },
      {
        id: 'w2_s3_q8',
        question: 'If $X \\sim \\text{Bernoulli}(0.7)$, what is $P(X = 0)$?',
        options: ['0.7', '1.7', '0.3', '0'],
        correct: 2,
        explanation: 'For a Bernoulli variable with success parameter $p = 0.7$, the probability of failure ($X = 0$) is $P(X = 0) = 1 - p = 1 - 0.7 = 0.3$.'
      },
      {
        id: 'w2_s3_q9',
        question: 'If $X \\sim \\text{Bernoulli}(0.7)$, what is $\\mathbb{E}[X]$?',
        options: ['0.3', '0.49', '0.7', '1.7'],
        correct: 2,
        explanation: 'For a Bernoulli random variable, $\\mathbb{E}[X] = p = 0.7$. This follows directly from definition: $\\mathbb{E}[X] = (0)(1 - p) + (1)(p) = 0 + 0.7 = 0.7$.'
      },
      {
        id: 'w2_s3_q10',
        question: 'If $X \\sim \\text{Bernoulli}(0.7)$, what is $\\operatorname{Var}(X)$?',
        options: ['0.7', '0.49', '0.21', '1.4'],
        correct: 2,
        explanation: 'The variance of a Bernoulli variable is $\\operatorname{Var}(X) = p(1 - p) = (0.7)(1 - 0.7) = (0.7)(0.3) = 0.21$.'
      },
      {
        id: 'w2_s3_q11',
        question: 'A random variable has the distribution $P(X = 0) = 0.5$ and $P(X = 2) = 0.5$. What is $\\mathbb{E}[X]$?',
        options: ['0', '1', '2', '2.5'],
        correct: 1,
        explanation: 'For a discrete random variable, $\\mathbb{E}[X] = \\sum x P(X = x) = (0)(0.5) + (2)(0.5) = 0 + 1 = 1$. The expected value is the probability-weighted average.'
      },
      {
        id: 'w2_s3_q12',
        question: 'For the distribution where $P(X = 0) = 0.5$ and $P(X = 2) = 0.5$, what is the variance $\\operatorname{Var}(X)$?',
        options: ['0', '0.5', '1', '2'],
        correct: 2,
        explanation: 'With mean $\\mu = \\mathbb{E}[X] = 1$: $\\operatorname{Var}(X) = \\mathbb{E}[(X - \\mu)^2] = (0 - 1)^2(0.5) + (2 - 1)^2(0.5) = (1)(0.5) + (1)(0.5) = 1$.'
      },
      {
        id: 'w2_s3_q13',
        question: 'In a Gaussian distribution $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, what does $\\mu$ represent?',
        options: [
          'The variance',
          'The center or mean',
          'The probability of success',
          'The correlation'
        ],
        correct: 1,
        explanation: 'In $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$, the parameter $\\mu$ represents the mean or expected value. Changing $\\mu$ shifts the bell curve horizontally. The parameter $\\sigma^2$ represents the variance.'
      },
      {
        id: 'w2_s3_q14',
        question: 'What is true about the standard normal distribution?',
        options: [
          'Its mean is 1 and standard deviation is 0',
          'Its mean is 0 and standard deviation is 1',
          'Its mean is 0 and variance is 0',
          'Its mean is always the dataset average'
        ],
        correct: 1,
        explanation: 'The standard normal distribution is written as $Z \\sim \\mathcal{N}(0, 1)$, which means $\\mu = 0$ and $\\sigma = 1$ (and $\\sigma^2 = 1$). It is the distribution of standardized $z$-scores.'
      },
      {
        id: 'w2_s3_q15',
        question: 'A student scores 80 on a test with mean 70 and standard deviation 10. What is the student’s z-score?',
        options: ['0', '0.5', '1', '10'],
        correct: 2,
        explanation: 'Using the $z$-score formula $z = \\frac{x - \\mu}{\\sigma} = \\frac{80 - 70}{10} = \\frac{10}{10} = 1$. The score is exactly one standard deviation above the mean.'
      },
      {
        id: 'w2_s3_q16',
        question: 'Approximately what is $P(Z < 1)$ for a standard normal random variable?',
        options: ['0.1587', '0.5000', '0.8413', '0.9772'],
        correct: 2,
        explanation: 'The area under the standard normal curve to the left of $z = 1$ is $P(Z < 1) = \\int_{-\\infty}^1 \\frac{1}{\\sqrt{2\\pi}} e^{-z^2/2}\\,dz \\approx 0.8413$. This means approximately 84.13% of standard normal values are less than 1.'
      },
      {
        id: 'w2_s3_q17',
        question: 'What does positive covariance usually mean?',
        options: [
          'The variables tend to increase together',
          'One variable must always be zero',
          'The variables are always unrelated',
          'Both variables must have the same units'
        ],
        correct: 0,
        explanation: 'Covariance measures how two variables co-vary. Positive covariance means when $X$ is above its mean, $Y$ tends to be above its mean as well. Negative covariance means one tends to increase while the other decreases.'
      },
      {
        id: 'w2_s3_q18',
        question: 'What is the possible range of correlation $\\operatorname{Corr}(X, Y)$?',
        options: ['0 to 1 only', '−1 to 1', '−∞ to ∞', '1 to 100'],
        correct: 1,
        explanation: 'Correlation is standardized covariance: $\\operatorname{Corr}(X, Y) = \\frac{\\operatorname{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$. Its range is strictly $[-1, 1]$, where $+1$ is perfect positive linear relationship, $0$ is no linear relationship, and $-1$ is perfect negative linear relationship.'
      },
      {
        id: 'w2_s3_q19',
        question: 'What does $P(A \\mid B)$ mean?',
        options: [
          'Probability of B without knowing anything about A',
          'Probability of A given that B has happened',
          'Probability of A and B added together',
          'Probability that A is impossible'
        ],
        correct: 1,
        explanation: 'The notation $P(A \\mid B)$ represents conditional probability: the probability of event $A$ given that event $B$ has already occurred: $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$.'
      },
      {
        id: 'w2_s3_q20',
        question: 'A disease affects 1% of people. A test has 95% sensitivity and 90% specificity. If a person tests positive, approximately what is the probability that they actually have the disease?',
        options: ['1%', '9.5%', '50%', '95%'],
        correct: 1,
        explanation: 'Given $P(D) = 0.01$, $P(+\\mid D) = 0.95$, and $P(+\\mid \\text{not } D) = 1 - 0.90 = 0.10$. Total positive probability is $P(+) = P(+\\mid D)P(D) + P(+\\mid\\text{not } D)P(\\text{not } D) = (0.95)(0.01) + (0.10)(0.99) = 0.0095 + 0.099 = 0.1085$. By Bayes theorem: $P(D\\mid+) = \\frac{P(+\\mid D)P(D)}{P(+)} = \\frac{0.0095}{0.1085} \\approx 0.0876 = 8.76\\%$ (closest to $9.5\\%$). This demonstrates the base rate fallacy.'
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
