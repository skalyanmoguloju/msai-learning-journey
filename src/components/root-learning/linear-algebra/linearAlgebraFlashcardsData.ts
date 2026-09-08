export interface LAFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  remark?: string;
  useCase?: string;
}

export const LA_FLASHCARDS: LAFlashcard[] = [
  // ================= Module 1: Basic Notation & Operations =================
  {
    id: 'la-fc-1',
    category: 'Module 1: Basic Notation & Operations',
    title: 'Vector Definition & Notation',
    frontPrompt: 'How is a vector $x \\in \\mathbb{R}^n$ formally defined and represented in ML?',
    backFormula: 'x = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix} \\in \\mathbb{R}^n, \\quad x_i \\in \\mathbb{R}',
    backExplanation: 'A vector with $n$ real entries where $x_i$ denotes the $i$-th entry. By default in CS229 and ML conventions, all vectors are column-vectors (size $n \\times 1$).',
    remark: 'A column-vector can be viewed as an $n \\times 1$ matrix. Its transpose $x^T \\in \\mathbb{R}^{1 \\times n}$ is a row-vector.',
    useCase: 'Feature representations, weights vectors, and prediction outputs.'
  },
  {
    id: 'la-fc-2',
    category: 'Module 1: Basic Notation & Operations',
    title: 'Matrix Definition & Entry Indexing',
    frontPrompt: 'What is the formal notation for a matrix $A \\in \\mathbb{R}^{m \\times n}$ and its individual entry indexing?',
    backFormula: 'A = \\begin{pmatrix} A_{1,1} & \\cdots & A_{1,n} \\\\ \\vdots & \\ddots & \\vdots \\\\ A_{m,1} & \\cdots & A_{m,n} \\end{pmatrix} \\in \\mathbb{R}^{m \\times n}',
    backExplanation: '$A$ has $m$ rows and $n$ columns. The entry located in row $i$ and column $j$ is denoted $A_{i,j} \\in \\mathbb{R}$ or $a_{ij}$. Row $i$ is denoted $a_{r,i}^T$ and column $j$ is denoted $a_{c,j}$.',
    remark: 'A matrix maps an input space $\\mathbb{R}^n$ to an output space $\\mathbb{R}^m$ via linear map $y = Ax$.',
    useCase: 'Batch feature matrices $X \\in \\mathbb{R}^{m \\times d}$ and layer transformation weights.'
  },
  {
    id: 'la-fc-3',
    category: 'Module 1: Basic Notation & Operations',
    title: 'Identity Matrix & Invariance',
    frontPrompt: 'How is the Identity Matrix $I \\in \\mathbb{R}^{n \\times n}$ defined, and what is its multiplication property?',
    backFormula: 'I = \\begin{pmatrix} 1 & 0 & \\cdots & 0 \\\\ 0 & 1 & \\cdots & 0 \\\\ \\vdots & & \\ddots & \\vdots \\\\ 0 & 0 & \\cdots & 1 \\end{pmatrix} \\in \\mathbb{R}^{n \\times n}',
    backExplanation: 'A square matrix with ones on its main diagonal ($I_{ii} = 1$) and zero everywhere else ($I_{ij} = 0$ for $i \\neq j$).',
    remark: 'For all compatible matrices $A \\in \\mathbb{R}^{n \\times n}$, we have $A \\times I = I \\times A = A$.',
    useCase: 'Tikhonov/Ridge regularization $(X^T X + \\lambda I)^{-1} X^T y$.'
  },
  {
    id: 'la-fc-4',
    category: 'Module 1: Basic Notation & Operations',
    title: 'Diagonal Matrix Scaling',
    frontPrompt: 'What is a diagonal matrix $D \\in \\mathbb{R}^{n \\times n}$, and how does it scale feature axes?',
    backFormula: 'D = \\text{diag}(d_1, \\dots, d_n) = \\begin{pmatrix} d_1 & 0 & \\cdots & 0 \\\\ 0 & d_2 & \\cdots & 0 \\\\ \\vdots & & \\ddots & \\vdots \\\\ 0 & 0 & \\cdots & d_n \\end{pmatrix}',
    backExplanation: 'A square matrix with nonzero values strictly along its main diagonal ($D_{ii} = d_i$) and zero off-diagonal entries ($D_{ij} = 0$ for $i \\neq j$).',
    remark: 'Multiplying vector $x$ by $D$ scales the $i$-th component by $d_i$: $(Dx)_i = d_i x_i$.',
    useCase: 'Eigenvalue matrices $\\Lambda$, singular value matrices $\\Sigma$, and Mahalanobis scaling.'
  },

  // ================= Module 2: Operations, Trace & Norms =================
  {
    id: 'la-fc-5',
    category: 'Module 2: Operations, Trace & Norms',
    title: 'Vector Inner Product (Dot Product)',
    frontPrompt: 'State the formula and output domain for the Inner Product of vectors $x, y \\in \\mathbb{R}^n$.',
    backFormula: 'x^T y = \\sum_{i=1}^n x_i y_i \\in \\mathbb{R}',
    backExplanation: 'The inner product maps two vectors of equal dimension $n$ to a real scalar value. It satisfies commutativity: $x^T y = y^T x$.',
    remark: 'Geometrically, $x^T y = \\|x\\|_2 \\|y\\|_2 \\cos(\\theta)$. When $x^T y = 0$, $x$ and $y$ are orthogonal.',
    useCase: 'Dot-product attention, cosine similarity, and projection onto sub-spaces.'
  },
  {
    id: 'la-fc-6',
    category: 'Module 2: Operations, Trace & Norms',
    title: 'Vector Outer Product',
    frontPrompt: 'State the formula, dimensions, and rank for the Outer Product of $x \\in \\mathbb{R}^m$ and $y \\in \\mathbb{R}^n$.',
    backFormula: 'x y^T = \\begin{pmatrix} x_1 y_1 & \\cdots & x_1 y_n \\\\ \\vdots & \\ddots & \\vdots \\\\ x_m y_1 & \\cdots & x_m y_n \\end{pmatrix} \\in \\mathbb{R}^{m \\times n}',
    backExplanation: 'Outer product produces an $m \\times n$ matrix with $(x y^T)_{ij} = x_i y_j$. Every column is a scalar multiple of $x$, and every row is a scalar multiple of $y^T$.',
    remark: 'The outer product always has rank at most 1 (rank $\\le 1$).',
    useCase: 'Covariance matrix updates: $\\Sigma = \\frac{1}{m} \\sum x^{(i)} (x^{(i)})^T$.'
  },
  {
    id: 'la-fc-7',
    category: 'Module 2: Operations, Trace & Norms',
    title: 'Matrix Multiplication Dimensions & Views',
    frontPrompt: 'Given $A \\in \\mathbb{R}^{m \\times n}$ and $B \\in \\mathbb{R}^{n \\times p}$, state entry formula and dimensions of $C = AB$.',
    backFormula: 'C_{ij} = \\sum_{k=1}^n A_{ik} B_{kj}, \\quad C \\in \\mathbb{R}^{m \\times p}',
    backExplanation: 'Matrix multiplication is associative $(AB)C = A(BC)$ and distributive $A(B + C) = AB + AC$, but generally non-commutative: $AB \\neq BA$.',
    remark: 'Can be viewed as sum of outer products of columns of $A$ and rows of $B$: $C = \\sum_{k=1}^n a_{c,k} b_{r,k}^T$.',
    useCase: 'Feed-forward forward pass $H = X W + b$.'
  },
  {
    id: 'la-fc-8',
    category: 'Module 2: Operations, Trace & Norms',
    title: 'Matrix Transpose & Product Rule',
    frontPrompt: 'Define matrix transpose $A^T$ and express $(AB)^T$ in terms of $A^T$ and $B^T$.',
    backFormula: '(A^T)_{ij} = A_{ji}, \\quad (AB)^T = B^T A^T',
    backExplanation: 'Transposition swaps row and column indices. The transpose of a product reverses the multiplication order of the transposed operands.',
    remark: 'Generalizes to multiple matrices: $(A_1 A_2 \\dots A_k)^T = A_k^T \\dots A_2^T A_1^T$.',
    useCase: 'Backpropagation error gradient propagation $dX = dY W^T$.'
  },
  {
    id: 'la-fc-9',
    category: 'Module 2: Operations, Trace & Norms',
    title: 'Matrix Trace & Cyclic Property',
    frontPrompt: 'State the definition of the matrix trace $\\text{tr}(A)$ and its cyclic permutation property.',
    backFormula: '\\text{tr}(A) = \\sum_{i=1}^n A_{ii}, \\quad \\text{tr}(ABC) = \\text{tr}(CAB) = \\text{tr}(BCA)',
    backExplanation: 'The trace is the sum of main diagonal elements of a square matrix $A \\in \\mathbb{R}^{n \\times n}$. Cyclic permutations preserve trace value: $\\text{tr}(AB) = \\text{tr}(BA)$.',
    remark: 'Trace equals the sum of all eigenvalues: $\\text{tr}(A) = \\sum_{i=1}^n \\lambda_i$.',
    useCase: 'Computing Frobenius norm $\\|A\\|_F^2 = \\text{tr}(A^T A)$ and invariant loss formulations.'
  },

  // ================= Module 3: Vector Spaces, Rank & Orthogonality =================
  {
    id: 'la-fc-10',
    category: 'Module 3: Vector Spaces, Rank & Orthogonality',
    title: 'Vector Norms: $\\ell_1, \\ell_2, \\ell_\\infty$',
    frontPrompt: 'State the mathematical formulas for the $\\ell_1, \\ell_2$, and $\\ell_\\infty$ norms of vector $x \\in \\mathbb{R}^n$.',
    backFormula: '\\|x\\|_1 = \\sum_{i=1}^n |x_i|, \\quad \\|x\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}, \\quad \\|x\\|_\\infty = \\max_{i} |x_i|',
    backExplanation: 'Norms measure vector length and distance. Must satisfy: (1) Non-negativity, (2) Definiteness ($\\|x\\| = 0 \\iff x = 0$), (3) Absolute scalability, (4) Triangle inequality.',
    remark: '$\\ell_1$ norm promotes parameter sparsity (Lasso), whereas $\\ell_2$ shrinks parameters smoothly (Ridge).',
    useCase: 'Regularization penalties in linear models and deep neural nets.'
  },
  {
    id: 'la-fc-11',
    category: 'Module 3: Vector Spaces, Rank & Orthogonality',
    title: 'Frobenius Matrix Norm',
    frontPrompt: 'State the definition and trace equivalence of the Frobenius norm $\\|A\\|_F$ for $A \\in \\mathbb{R}^{m \\times n}$.',
    backFormula: '\\|A\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n A_{ij}^2} = \\sqrt{\\text{tr}(A^T A)}',
    backExplanation: 'The Frobenius norm treats the matrix as an unrolled flat vector of length $mn$ and takes its Euclidean $\\ell_2$ norm.',
    remark: 'It also equals the square root of sum of squared singular values: $\\|A\\|_F = \\sqrt{\\sum_i \\sigma_i^2}$.',
    useCase: 'Matrix factorization reconstruction error $\\|X - U V^T\\|_F^2$.'
  },
  {
    id: 'la-fc-12',
    category: 'Module 3: Vector Spaces, Rank & Orthogonality',
    title: 'Linear Independence & Span',
    frontPrompt: 'When is a set of vectors $\{x_1, \\dots, x_k\}$ linearly independent, and what is their span?',
    backFormula: '\\sum_{i=1}^k \\alpha_i x_i = 0 \\implies \\alpha_1 = \\dots = \\alpha_k = 0, \\quad \\text{span}(\\{x_i\\}) = \\left\\{ \\sum_{i=1}^k \\alpha_i x_i : \\alpha_i \\in \\mathbb{R} \\right\\}',
    backExplanation: 'Vectors are linearly independent if none can be written as a linear combination of the others. Span is the subspace of all possible linear combinations.',
    remark: 'A basis of a subspace is a set of linearly independent vectors that span the entire subspace.',
    useCase: 'Dimensionality reduction and verifying full rank in regression designs.'
  },
  {
    id: 'la-fc-13',
    category: 'Module 3: Vector Spaces, Rank & Orthogonality',
    title: 'Matrix Column Space & Rank',
    frontPrompt: 'Define Column Space $\\mathcal{R}(A)$, Row Space $\\mathcal{R}(A^T)$, and Matrix Rank $\\text{rank}(A)$.',
    backFormula: '\\text{rank}(A) = \\dim(\\mathcal{R}(A)) = \\dim(\\mathcal{R}(A^T)) \\le \\min(m, n)',
    backExplanation: 'The column space $\\mathcal{R}(A)$ is the subspace spanned by columns of $A$. Rank is the maximal number of linearly independent columns (or rows).',
    remark: 'Full column rank means $\\text{rank}(A) = n$; full row rank means $\\text{rank}(A) = m$.',
    useCase: 'Ensuring $(X^T X)$ is invertible in OLS regression (requires full column rank).'
  },
  {
    id: 'la-fc-14',
    category: 'Module 3: Vector Spaces, Rank & Orthogonality',
    title: 'Orthogonal & Orthonormal Matrices',
    frontPrompt: 'Define an orthogonal matrix $U \\in \\mathbb{R}^{n \\times n}$ and state its norm-preserving property.',
    backFormula: 'U^T U = U U^T = I \\iff U^{-1} = U^T, \\quad \\|U x\\|_2 = \\|x\\|_2',
    backExplanation: 'A square matrix whose columns (and rows) form an orthonormal basis: $u_i^T u_j = 1$ if $i=j$, $0$ otherwise. Multiplying by $U$ preserves Euclidean lengths and angles (isometric rotation/reflection).',
    remark: 'For any orthogonal matrix, $|\\det(U)| = 1$.',
    useCase: 'PCA orthogonal projection matrices, SVD basis vectors, and QR decomposition.'
  },

  // ================= Module 4: Determinants & Quadratic Forms =================
  {
    id: 'la-fc-15',
    category: 'Module 4: Determinants & Quadratic Forms',
    title: 'Matrix Inverse Conditions',
    frontPrompt: 'When is a square matrix $A \\in \\mathbb{R}^{n \\times n}$ invertible, and what is the property of $A^{-1}$?',
    backFormula: 'A A^{-1} = A^{-1} A = I \\iff \\det(A) \\neq 0 \\iff \\text{rank}(A) = n',
    backExplanation: 'An inverse exists if and only if $A$ is full rank (non-singular). If $\\det(A) = 0$, $A$ is singular and has no inverse.',
    remark: '$(AB)^{-1} = B^{-1} A^{-1}$ and $(A^{-1})^T = (A^T)^{-1} = A^{-T}$.',
    useCase: 'Solving linear systems $A x = b \\implies x = A^{-1} b$ and Kalman filters.'
  },
  {
    id: 'la-fc-16',
    category: 'Module 4: Determinants & Quadratic Forms',
    title: 'Determinant Definition & Geometric Meaning',
    frontPrompt: 'What is the geometric meaning of the determinant $\\det(A)$ for $A \\in \\mathbb{R}^{n \\times n}$?',
    backFormula: '\\det(A) = \\prod_{i=1}^n \\lambda_i, \\quad |\\det(A)| = \\text{Volume}(A([0,1]^n))',
    backExplanation: '$\\det(A)$ measures the signed volume scaling factor when unit hypercube $[0,1]^n$ is transformed by $A$. Negative sign means orientation reversed.',
    remark: 'Key properties: $\\det(AB) = \\det(A)\\det(B)$, $\\det(A^T) = \\det(A)$, $\\det(A^{-1}) = 1/\\det(A)$.',
    useCase: 'Normalizing constant in Multivariate Normal distribution: $(2\\pi)^{-d/2} |\\Sigma|^{-1/2}$.'
  },
  {
    id: 'la-fc-17',
    category: 'Module 4: Determinants & Quadratic Forms',
    title: 'Quadratic Forms',
    frontPrompt: 'Define the quadratic form of a vector $x \\in \\mathbb{R}^n$ with matrix $A \\in \\mathbb{R}^{n \\times n}$.',
    backFormula: 'x^T A x = \\sum_{i=1}^n \\sum_{j=1}^n A_{ij} x_i x_j = x^T \\left(\\frac{A + A^T}{2}\\right) x',
    backExplanation: 'A scalar quadratic function of vector $x$. Because $x^T A x = (x^T A x)^T = x^T A^T x$, only the symmetric part of $A$ contributes to the value.',
    remark: 'We universally assume $A$ is symmetric when discussing quadratic forms in machine learning.',
    useCase: 'Mahalanobis distance $(x - \\mu)^T \\Sigma^{-1} (x - \\mu)$ and Taylor second-order error terms.'
  },
  {
    id: 'la-fc-18',
    category: 'Module 4: Determinants & Quadratic Forms',
    title: 'Positive Definite (PD) & PSD Matrices',
    frontPrompt: 'State the definitions of Positive Definite ($A \\succ 0$) and Positive Semi-Definite ($A \\succeq 0$) matrices.',
    backFormula: 'A \\succ 0 \\iff x^T A x > 0 \\; \\forall x \\neq 0, \\quad A \\succeq 0 \\iff x^T A x \\ge 0 \\; \\forall x',
    backExplanation: 'For symmetric $A$: $A \\succ 0 \\iff$ all eigenvalues $\\lambda_i > 0$. $A \\succeq 0 \\iff$ all eigenvalues $\\lambda_i \\ge 0$.',
    remark: 'A positive definite matrix defines a strictly convex quadratic bowl with a unique minimum.',
    useCase: 'Hessian matrix for convexity testing in optimization, covariance matrices $\\Sigma \\succeq 0$.'
  },

  // ================= Module 5: Eigenvalues & Spectral Theory =================
  {
    id: 'la-fc-19',
    category: 'Module 5: Eigenvalues & Spectral Theory',
    title: 'Eigenvalues & Eigenvectors',
    frontPrompt: 'State the characteristic equation and definition of an eigenvalue $\\lambda$ and eigenvector $x$.',
    backFormula: 'A x = \\lambda x \\iff (A - \\lambda I) x = 0 \\iff \\det(A - \\lambda I) = 0',
    backExplanation: 'An eigenvector $x \\neq 0$ is a direction along which transformation $A$ acts strictly as scalar multiplication by factor $\\lambda$, without altering direction.',
    remark: 'Trace equals sum of eigenvalues: $\\text{tr}(A) = \\sum \\lambda_i$. Determinant equals product: $\\det(A) = \\prod \\lambda_i$.',
    useCase: 'Principal Component Analysis (PCA) finding directions of maximal variance.'
  },
  {
    id: 'la-fc-20',
    category: 'Module 5: Eigenvalues & Spectral Theory',
    title: 'Spectral Theorem (Symmetric Eigendecomposition)',
    frontPrompt: 'State the Spectral Theorem for a real symmetric matrix $A = A^T \\in \\mathbb{R}^{n \\times n}$.',
    backFormula: 'A = Q \\Lambda Q^T = \\sum_{i=1}^n \\lambda_i q_i q_i^T, \\quad Q^T Q = I',
    backExplanation: 'Every real symmetric matrix can be diagonalized by an orthogonal matrix $Q$ whose columns are orthonormal eigenvectors, and $\\Lambda = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)$ holds real eigenvalues.',
    remark: 'Guarantees that symmetric matrices have purely real eigenvalues and orthogonal eigenvectors.',
    useCase: 'Kernel PCA, spectral clustering, and decorrelation of feature covariance.'
  },
  {
    id: 'la-fc-21',
    category: 'Module 5: Eigenvalues & Spectral Theory',
    title: 'Singular Value Decomposition (SVD)',
    frontPrompt: 'State the SVD theorem for any rectangular matrix $A \\in \\mathbb{R}^{m \\times n}$.',
    backFormula: 'A = U \\Sigma V^T = \\sum_{i=1}^r \\sigma_i u_i v_i^T, \\quad \\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0',
    backExplanation: 'Decomposes any $m \\times n$ matrix into orthogonal matrices $U \\in \\mathbb{R}^{m \\times m}$, $V \\in \\mathbb{R}^{n \\times n}$, and rectangular diagonal $\\Sigma \\in \\mathbb{R}^{m \\times n}$ containing singular values $\\sigma_i = \\sqrt{\\lambda_i(A^T A)}$.',
    remark: 'Columns of $U$ are left singular vectors; columns of $V$ are right singular vectors.',
    useCase: 'Latent Semantic Analysis (LSA), low-rank matrix approximation (Eckart-Young Theorem).'
  },

  // ================= Module 6: Matrix Calculus & Optimization =================
  {
    id: 'la-fc-22',
    category: 'Module 6: Matrix Calculus & Optimization',
    title: 'Vector-Valued Gradient Definition',
    frontPrompt: 'Define the gradient $\\nabla_x f(x)$ for scalar function $f: \\mathbb{R}^n \\to \\mathbb{R}$.',
    backFormula: '\\nabla_x f(x) = \\begin{pmatrix} \\frac{\\partial f}{\\partial x_1} \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_n} \\end{pmatrix} \\in \\mathbb{R}^n',
    backExplanation: 'The gradient vector contains all first-order partial derivatives and points in the direction of steepest ascent. Its negative $-\\nabla_x f(x)$ points towards steepest descent.',
    remark: 'Gradient of a linear function $\\nabla_x (b^T x) = b$.',
    useCase: 'Gradient Descent parameter updates $\\theta \\leftarrow \\theta - \\alpha \\nabla_\\theta J(\\theta)$.'
  },
  {
    id: 'la-fc-23',
    category: 'Module 6: Matrix Calculus & Optimization',
    title: 'Quadratic Form Gradient',
    frontPrompt: 'State the gradient of quadratic form $f(x) = x^T A x$ for general $A$ and symmetric $A$.',
    backFormula: '\\nabla_x (x^T A x) = (A + A^T) x \\stackrel{A = A^T}{=} 2 A x',
    backExplanation: 'Differentiating with product rule gives $A^T x + A x$. When $A$ is symmetric, this reduces to $2 A x$.',
    remark: 'Second derivative gives the Hessian: $\\nabla_x^2 (x^T A x) = 2 A$.',
    useCase: 'Deriving Normal Equations in OLS Regression: $\\nabla_\\theta \\|X\\theta - y\\|_2^2 = 2 X^T(X\\theta - y) = 0$.'
  },
  {
    id: 'la-fc-24',
    category: 'Module 6: Matrix Calculus & Optimization',
    title: 'Hessian Matrix & Curvature',
    frontPrompt: 'Define the Hessian matrix $\\nabla_x^2 f(x)$ and its role in local extremum classification.',
    backFormula: 'H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j} \\in \\mathbb{R}^{n \\times n}, \\quad H \\succ 0 \\implies \\text{local minimum}',
    backExplanation: 'The Hessian captures second-order partial derivatives. If $\\nabla f(x^*) = 0$: $H \\succ 0$ is a strict local minimum, $H \\prec 0$ is a local maximum, and indefinite $H$ is a saddle point.',
    remark: 'By Clairaut-Schwarz theorem, $H$ is symmetric for twice continuously differentiable functions.',
    useCase: "Newton-Raphson second-order optimization step $\\Delta x = -H^{-1} \\nabla f$."
  },
  {
    id: 'la-fc-25',
    category: 'Module 6: Matrix Calculus & Optimization',
    title: 'Four Essential Matrix Gradient Identities',
    frontPrompt: 'What are the 4 essential matrix trace and determinant gradient identities from Stanford CS229?',
    backFormula: '\\begin{aligned} 1.& \\ \\nabla_A \\text{tr}(AB) = B^T \\\\ 2.& \\ \\nabla_{A^T} f(A) = (\\nabla_A f(A))^T \\\\ 3.& \\ \\nabla_A \\text{tr}(A B A^T C) = C A B + C^T A B^T \\\\ 4.& \\ \\nabla_A |A| = |A| A^{-T} \\end{aligned}',
    backExplanation: 'These 4 identities eliminate component-wise scalar differentiation, allowing analytical derivation of loss gradients directly in matrix form.',
    remark: 'Derivative of log-determinant: $\\nabla_A \\log|A| = A^{-T} = A^{-1}$ for symmetric $A$.',
    useCase: 'Deriving MLE parameters for Gaussian Discriminant Analysis and factor models.'
  }
];
