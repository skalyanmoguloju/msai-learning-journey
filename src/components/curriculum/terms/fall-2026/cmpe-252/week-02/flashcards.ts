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
  // Module 1: Linear Algebra & Matrix Factorizations
  {
    id: 'ai-w2-fc-1',
    category: 'Module 1: Linear Algebra & Matrix Factorizations',
    title: 'LU Decomposition for Solving Linear Systems',
    frontPrompt: 'How does LU Decomposition factor a square matrix A to solve Ax = b efficiently?',
    backFormula: 'A = LU, \\quad Ly = b, \\quad Ux = y',
    backExplanation: 'A is factored into a lower triangular matrix L (with 1s on the diagonal) and an upper triangular matrix U. Once factored in O(n³) time, any system Ax = b can be solved in O(n²) time using forward substitution followed by back substitution.',
    useCase: 'Solving multiple linear systems with the identical coefficient matrix A but differing observation vectors b.',
    remark: 'Gaussian elimination with partial pivoting yields PA = LU where P is a permutation matrix.'
  },
  {
    id: 'ai-w2-fc-2',
    category: 'Module 1: Linear Algebra & Matrix Factorizations',
    title: 'Singular Value Decomposition (SVD)',
    frontPrompt: 'What is the full SVD factorization of an m × n real matrix A, and what do its components represent?',
    backFormula: 'A = U \\Sigma V^T = \\sum_{i=1}^r \\sigma_i u_i v_i^T',
    backExplanation: 'U (m × m) contains left-singular orthonormal eigenvectors of AAᵀ. Σ (m × n) contains non-negative singular values σ₁ ≥ σ₂ ≥ ... ≥ 0. V (n × n) contains right-singular orthonormal eigenvectors of AᵀA.',
    useCase: 'Low-rank matrix approximation (Eckart-Young Theorem), dimensionality reduction (PCA), image compression, and pseudo-inverses.',
    remark: 'Truncating Σ to rank k minimizes reconstruction Frobenius error ||A - A_k||_F.'
  },

  // Module 2: Multivariable Calculus & Gradients
  {
    id: 'ai-w2-fc-3',
    category: 'Module 2: Multivariable Calculus & Gradients',
    title: 'Gradient Vector (∇f) Definition & Properties',
    frontPrompt: 'What is the gradient vector ∇f(x), and in which geometric direction does it point?',
    backFormula: '\\nabla f(\\mathbf{x}) = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1} & \\frac{\\partial f}{\\partial x_2} & \\dots & \\frac{\\partial f}{\\partial x_n} \\end{bmatrix}^T',
    backExplanation: 'The gradient is the vector of all first-order partial derivatives. Geometrically, ∇f points in the direction of steepest ascent of the scalar field f at x, with magnitude equal to the rate of increase. Gradient descent moves opposite (-∇f) toward steepest descent.',
    useCase: 'Parameter updates in neural backpropagation and linear regression optimization.',
    remark: 'The gradient vector is always strictly orthogonal to the level curve or contour surface f(x) = c.'
  },
  {
    id: 'ai-w2-fc-4',
    category: 'Module 2: Multivariable Calculus & Gradients',
    title: 'Multivariable Chain Rule for Backpropagation',
    frontPrompt: 'How does the multivariable chain rule propagate loss gradients through intermediate nodes?',
    backFormula: '\\frac{\\partial L}{\\partial x} = \\sum_{j} \\frac{\\partial L}{\\partial z_j} \\frac{\\partial z_j}{\\partial x}',
    backExplanation: 'When a scalar loss L depends on x through multiple intermediate activation pathways z_j, the total derivative is the sum of partial derivatives along all causal computational graph paths.',
    useCase: 'Backpropagation in multi-layer deep neural networks and recurrent computation graphs.',
    remark: 'Matrix form: ∂L/∂X = (∂L/∂Y) · (∂Y/∂X) using Jacobian compositions.'
  },

  // Module 3: Probabilistic Foundations
  {
    id: 'ai-w2-fc-5',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Expectation and Variance of Random Variables',
    frontPrompt: 'What are the formal definitions of mathematical Expectation E[X] and Variance Var(X)?',
    backFormula: '\\mathbb{E}[X] = \\int x p(x) dx, \\quad \\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2',
    backExplanation: 'Expectation measures the probability-weighted center of mass of a distribution. Variance measures dispersion or expected squared deviation around the mean.',
    useCase: 'Computing loss expectations over empirical training distributions and batch normalization statistics.',
    remark: 'For independent random variables X and Y: Var(X + Y) = Var(X) + Var(Y).'
  },
  {
    id: 'ai-w2-fc-6',
    category: 'Module 3: Probabilistic Foundations',
    title: 'Multivariate Gaussian (Normal) Distribution',
    frontPrompt: 'What is the probability density function (PDF) of a d-dimensional multivariate Gaussian?',
    backFormula: 'p(\\mathbf{x}; \\boldsymbol{\\mu}, \\boldsymbol{\\Sigma}) = \\frac{1}{(2\\pi)^{d/2}|\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\left( -\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^T \\boldsymbol{\\Sigma}^{-1}(\\mathbf{x}-\\boldsymbol{\\mu}) \\right)',
    backExplanation: 'Parametrized by mean vector μ ∈ ℝᵈ and symmetric positive semi-definite covariance matrix Σ ∈ ℝᵈˣᵈ. The quadratic form (x - μ)ᵀ Σ⁻¹ (x - μ) is the squared Mahalanobis distance.',
    useCase: 'Gaussian Mixture Models (GMM), Linear Discriminant Analysis (LDA), and Bayesian Neural Networks.',
    remark: 'Diagonal Σ implies mutually independent features; spherical Σ = σ²I implies isotropic variance.'
  },

  // Module 4: First-Order Optimization
  {
    id: 'ai-w2-fc-7',
    category: 'Module 4: First-Order Optimization',
    title: 'Stochastic Gradient Descent (SGD) with Momentum',
    frontPrompt: 'How does Classical Momentum improve vanilla SGD in ravines with high curvature oscillations?',
    backFormula: '\\mathbf{v}_t = \\gamma \\mathbf{v}_{t-1} + \\eta \\nabla L(\\boldsymbol{\\theta}_t), \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\mathbf{v}_t',
    backExplanation: 'Momentum accumulates an exponentially decaying moving average of past gradients (velocity vector v). Persistent directions compound velocity, while alternating high-frequency oscillations cancel out, damping oscillations and speeding through flat ravines.',
    useCase: 'Accelerating convergence in deep CNNs and overcoming shallow saddle points.',
    remark: 'Typically γ ≈ 0.9. Nesterov Accelerated Gradient (NAG) evaluates the gradient after a lookahead momentum step.'
  },
  {
    id: 'ai-w2-fc-8',
    category: 'Module 4: First-Order Optimization',
    title: 'Adam Optimizer (Adaptive Moment Estimation)',
    frontPrompt: 'How does Adam combine first-moment (momentum) and second-moment (RMSProp) estimates?',
    backFormula: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2, \\quad \\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t',
    backExplanation: 'Adam maintains running estimates of both the mean (m_t) and uncentered variance (v_t) of gradients. Bias correction (m̂ = m/(1-β₁ᵗ), v̂ = v/(1-β₂ᵗ)) offsets initial zero-bias. Each coordinate receives an adaptive learning rate inversely proportional to the gradient scale.',
    useCase: 'Standard default optimizer for Transformers, LLMs, and computer vision models.',
    remark: 'Standard hyperparameter defaults: β₁ = 0.9, β₂ = 0.999, ε = 1e-8.'
  },

  // Module 5: Second-Order Optimization
  {
    id: 'ai-w2-fc-9',
    category: 'Module 5: Second-Order Optimization',
    title: "Newton's Optimization Method in Multiple Dimensions",
    frontPrompt: "What is the update rule of Newton's Method, and what role does the Hessian Matrix play?",
    backFormula: '\\boldsymbol{\\theta}_{t+1} = \\boldsymbol{\\theta}_t - \\mathbf{H}^{-1} \\nabla f(\\boldsymbol{\\theta}_t), \\quad \\mathbf{H}_{ij} = \\frac{\\partial^2 f}{\\partial \\theta_i \\partial \\theta_j}',
    backExplanation: "Newton's method fits a local quadratic Taylor approximation and jumps directly to the vertex stationary point. It incorporates local curvature (Hessian H), achieving quadratic convergence near a minimum without requiring a tuned learning rate.",
    useCase: 'Logistic regression and GLMs (Iteratively Reweighted Least Squares / IRLS) with small parameter counts.',
    remark: 'Inverting the n × n Hessian costs O(n³), which is intractable for modern deep neural networks with millions of parameters.'
  },
  {
    id: 'ai-w2-fc-10',
    category: 'Module 5: Second-Order Optimization',
    title: 'Quasi-Newton Methods & BFGS / L-BFGS',
    frontPrompt: 'How does BFGS and Limited-Memory BFGS (L-BFGS) approximate Newton steps without storing the full Hessian?',
    backFormula: '\\mathbf{B}_{k+1} = \\mathbf{B}_k + \\frac{\\mathbf{y}_k \\mathbf{y}_k^T}{\\mathbf{y}_k^T \\mathbf{s}_k} - \\frac{\\mathbf{B}_k \\mathbf{s}_k \\mathbf{s}_k^T \\mathbf{B}_k}{\\mathbf{s}_k^T \\mathbf{B}_k \\mathbf{s}_k}',
    backExplanation: 'BFGS iteratively constructs an approximation B_k ≈ H (or its inverse H⁻¹) using successive gradient differences y_k and position steps s_k. L-BFGS only stores the last m (typically 5–20) step vectors, reducing memory complexity from O(n²) to O(mn).',
    useCase: 'Large-scale convex optimization, style transfer, and training CRF sequence models on CPU clusters.',
    remark: 'Natural Gradient replaces the Hessian with the Fisher Information Matrix F, maintaining invariance to parameter coordinate reparameterization.'
  }
];
