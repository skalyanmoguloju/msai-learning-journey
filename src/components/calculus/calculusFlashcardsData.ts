export interface Flashcard {
  id: string;
  category: 'General Notations' | 'Matrix Operations' | 'Matrix Properties & Norms' | 'Definiteness & Subspaces' | 'Eigenvalues & SVD' | 'Matrix Calculus';
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  remark?: string;
  useCase?: string;
}

export const CS229_FLASHCARDS: Flashcard[] = [
  // ================= 1. General Notations =================
  {
    id: 'fc-1',
    category: 'General Notations',
    title: 'Vector Definition & Notation',
    frontPrompt: 'How is a vector $x \\in \\mathbb{R}^n$ formally defined and represented in ML?',
    backFormula: 'x = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix} \\in \\mathbb{R}^n, \\quad x_i \\in \\mathbb{R}',
    backExplanation: 'A vector with $n$ real entries where $x_i$ denotes the $i$-th entry. By default in CS229 and ML conventions, all vectors are column-vectors (size $n \\times 1$).',
    remark: 'A column-vector can be viewed as an $n \\times 1$ matrix. Its transpose $x^T \\in \\mathbb{R}^{1 \\times n}$ is a row-vector.'
  },
  {
    id: 'fc-2',
    category: 'General Notations',
    title: 'Matrix Definition & Indices',
    frontPrompt: 'What is the formal notation for a matrix $A \\in \\mathbb{R}^{m \\times n}$ and its individual entry indexing?',
    backFormula: 'A = \\begin{pmatrix} A_{1,1} & \\cdots & A_{1,n} \\\\ \\vdots & \\ddots & \\vdots \\\\ A_{m,1} & \\cdots & A_{m,n} \\end{pmatrix} \\in \\mathbb{R}^{m \\times n}',
    backExplanation: '$A$ has $m$ rows and $n$ columns. The entry located in row $i$ and column $j$ is denoted $A_{i,j} \\in \\mathbb{R}$ or $a_{ij}$. Row $i$ is denoted $a_{r,i}^T$ and column $j$ is denoted $a_{c,j}$.',
    remark: 'A matrix maps an input space $\\mathbb{R}^n$ to an output space $\\mathbb{R}^m$ via transformation $y = Ax$.'
  },
  {
    id: 'fc-3',
    category: 'General Notations',
    title: 'Identity Matrix & Multiplicative Invariance',
    frontPrompt: 'How is the Identity Matrix $I \\in \\mathbb{R}^{n \\times n}$ defined, and what is its multiplication property?',
    backFormula: 'I = \\begin{pmatrix} 1 & 0 & \\cdots & 0 \\\\ 0 & 1 & \\cdots & 0 \\\\ \\vdots & & \\ddots & \\vdots \\\\ 0 & 0 & \\cdots & 1 \\end{pmatrix} \\in \\mathbb{R}^{n \\times n}',
    backExplanation: 'A square matrix with ones on its main diagonal ($I_{ii} = 1$) and zero everywhere else ($I_{ij} = 0$ for $i \\neq j$).',
    remark: 'For all compatible matrices $A \\in \\mathbb{R}^{n \\times n}$, we have $A \\times I = I \\times A = A$.'
  },
  {
    id: 'fc-4',
    category: 'General Notations',
    title: 'Diagonal Matrix',
    frontPrompt: 'What is a diagonal matrix $D \\in \\mathbb{R}^{n \\times n}$, and how is it compactly noted?',
    backFormula: 'D = \\text{diag}(d_1, \\dots, d_n) = \\begin{pmatrix} d_1 & 0 & \\cdots & 0 \\\\ 0 & d_2 & \\cdots & 0 \\\\ \\vdots & & \\ddots & \\vdots \\\\ 0 & 0 & \\cdots & d_n \\end{pmatrix}',
    backExplanation: 'A square matrix with nonzero values strictly along its main diagonal ($D_{ii} = d_i$) and zero everywhere off-diagonal ($D_{ij} = 0$ for $i \\neq j$).',
    remark: 'Multiplying by a diagonal matrix scales individual feature axes independently.'
  },

  // ================= 2. Matrix Operations =================
  {
    id: 'fc-5',
    category: 'Matrix Operations',
    title: 'Vector-Vector: Inner Product (Dot Product)',
    frontPrompt: 'State the formula and output domain for the Inner Product of vectors $x, y \\in \\mathbb{R}^n$.',
    backFormula: 'x^T y = \\sum_{i=1}^n x_i y_i \\in \\mathbb{R}',
    backExplanation: 'The inner product maps two vectors of equal dimension $n$ to a real scalar value. It satisfies commutativity: $x^T y = y^T x$.',
    remark: 'Geometrically, $x^T y = \\|x\\|_2 \\|y\\|_2 \\cos(\\theta)$. When $x^T y = 0$, $x$ and $y$ are orthogonal.'
  },
  {
    id: 'fc-6',
    category: 'Matrix Operations',
    title: 'Vector-Vector: Outer Product',
    frontPrompt: 'State the formula, output dimension, and rank of the Outer Product $x y^T$ for $x \\in \\mathbb{R}^m, y \\in \\mathbb{R}^n$.',
    backFormula: 'x y^T = \\begin{pmatrix} x_1 y_1 & \\cdots & x_1 y_n \\\\ \\vdots & \\ddots & \\vdots \\\\ x_m y_1 & \\cdots & x_m y_n \\end{pmatrix} \\in \\mathbb{R}^{m \\times n}, \\quad (x y^T)_{i,j} = x_i y_j',
    backExplanation: 'Maps vectors $x$ and $y$ to an $m \\times n$ rank-1 matrix. Every column of $x y^T$ is a scalar multiple of vector $x$.',
    remark: 'Outer products are fundamental building blocks for low-rank matrix approximations and covariance matrices.'
  },
  {
    id: 'fc-7',
    category: 'Matrix Operations',
    title: 'Matrix-Vector Multiplication',
    frontPrompt: 'Express $A x$ for $A \\in \\mathbb{R}^{m \\times n}$ and $x \\in \\mathbb{R}^n$ both as row inner products and as a linear combination of columns.',
    backFormula: 'A x = \\begin{pmatrix} a_{r,1}^T x \\\\ \\vdots \\\\ a_{r,m}^T x \\end{pmatrix} = \\sum_{i=1}^n a_{c,i} x_i \\in \\mathbb{R}^m',
    backExplanation: 'Where $a_{r,i}^T$ are the rows of $A$ and $a_{c,i}$ are the columns of $A$. The resulting vector is size $\\mathbb{R}^m$.',
    remark: 'Crucial insight: $Ax$ is literally a linear combination of the columns of $A$ weighted by scalar entries $x_i$.'
  },
  {
    id: 'fc-8',
    category: 'Matrix Operations',
    title: 'Matrix-Matrix Multiplication',
    frontPrompt: 'Express matrix product $A B$ ($A \\in \\mathbb{R}^{m \\times n}, B \\in \\mathbb{R}^{n \\times p}$) using row-column products and outer products.',
    backFormula: 'A B = \\begin{pmatrix} a_{r,1}^T b_{c,1} & \\cdots & a_{r,1}^T b_{c,p} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{r,m}^T b_{c,1} & \\cdots & a_{r,m}^T b_{c,p} \\end{pmatrix} = \\sum_{i=1}^n a_{c,i} b_{r,i}^T \\in \\mathbb{R}^{m \\times p}',
    backExplanation: 'Requires the inner dimensions to match ($n$). Entry $(AB)_{ij} = a_{r,i}^T b_{c,j} = \\sum_{k=1}^n A_{ik} B_{kj}$. Also equals the sum of $n$ outer products.',
    remark: 'Associative $(AB)C = A(BC)$, but non-commutative ($AB \\neq BA$) in general.'
  },
  {
    id: 'fc-9',
    category: 'Matrix Operations',
    title: 'Matrix Transpose & Product Rule',
    frontPrompt: 'What is the definition of the matrix transpose $A^T$, and what is the rule for $(AB)^T$?',
    backFormula: '\\forall i, j, \\quad (A^T)_{i,j} = A_{j,i}, \\qquad (A B)^T = B^T A^T',
    backExplanation: 'The transpose flips a matrix over its diagonal, swapping row indices with column indices. For products, the transpose reverses the factor order.',
    remark: 'Double transpose returns the original: $(A^T)^T = A$, and $(A + B)^T = A^T + B^T$.'
  },
  {
    id: 'fc-10',
    category: 'Matrix Operations',
    title: 'Matrix Inverse & Product Rule',
    frontPrompt: 'Define the inverse $A^{-1}$ of an invertible square matrix, and state the rule for $(AB)^{-1}$.',
    backFormula: 'A A^{-1} = A^{-1} A = I, \\qquad (A B)^{-1} = B^{-1} A^{-1}',
    backExplanation: 'The inverse $A^{-1}$ exists if and only if $A$ is square and non-singular ($\\det(A) \\neq 0$, full rank $n$). The inverse of a product reverses order.',
    remark: 'Not all square matrices are invertible. $(A^{-1})^T = (A^T)^{-1}$, often denoted $A^{-T}$.'
  },
  {
    id: 'fc-11',
    category: 'Matrix Operations',
    title: 'Trace Operator & Invariance Properties',
    frontPrompt: 'Define the trace $\\text{tr}(A)$ of square matrix $A$, and state its transpose and cyclic permutation rules.',
    backFormula: '\\text{tr}(A) = \\sum_{i=1}^n A_{i,i}, \\quad \\text{tr}(A^T) = \\text{tr}(A), \\quad \\text{tr}(AB) = \\text{tr}(BA)',
    backExplanation: 'The trace is the sum of main diagonal entries. It is linear: $\\text{tr}(A+B) = \\text{tr}(A) + \\text{tr}(B)$, and cyclic: $\\text{tr}(ABC) = \\text{tr}(BCA) = \\text{tr}(CAB)$.',
    remark: 'Also equals the sum of eigenvalues: $\\text{tr}(A) = \\sum_{i=1}^n \\lambda_i$.'
  },
  {
    id: 'fc-12',
    category: 'Matrix Operations',
    title: 'Determinant & Multiplicative Rule',
    frontPrompt: 'State the recursive Laplace expansion for $\\det(A)$ and the rule for $\\det(AB)$ and $\\det(A^T)$.',
    backFormula: '\\det(A) = |A| = \\sum_{j=1}^n (-1)^{i+j} A_{i,j} |A_{\\backslash i, \\backslash j}|, \\quad |AB| = |A||B|, \\quad |A^T| = |A|',
    backExplanation: '$A_{\\backslash i, \\backslash j}$ denotes the submatrix without row $i$ and column $j$. A matrix is invertible if and only if $|A| \\neq 0$. Invertibility rule: $|A^{-1}| = 1 / |A|$.',
    remark: 'Geometrically, $|A|$ represents the signed volume distortion factor of space transformed by $A$.'
  },

  // ================= 3. Matrix Properties & Norms =================
  {
    id: 'fc-13',
    category: 'Matrix Properties & Norms',
    title: 'Symmetric & Antisymmetric Decomposition',
    frontPrompt: 'How can any square matrix $A$ be decomposed into symmetric and antisymmetric components?',
    backFormula: 'A = \\underbrace{\\frac{A + A^T}{2}}_{\\text{Symmetric}} + \\underbrace{\\frac{A - A^T}{2}}_{\\text{Antisymmetric}}',
    backExplanation: 'The symmetric part satisfies $S^T = S$, and the antisymmetric (skew-symmetric) part satisfies $K^T = -K$.',
    remark: 'For any vector $x$, the quadratic form of the antisymmetric part vanishes: $x^T (A - A^T) x = 0$. Thus $x^T A x = x^T (\\frac{A+A^T}{2}) x$.'
  },
  {
    id: 'fc-14',
    category: 'Matrix Properties & Norms',
    title: 'Formal Norm Axioms',
    frontPrompt: 'What three formal axioms must a norm function $N(x) = \\|x\\|$ satisfy on a vector space $V$?',
    backFormula: '\\begin{aligned} 1.& \\ N(x + y) \\le N(x) + N(y) \\quad \\text{(Triangle Inequality)} \\\\ 2.& \\ N(a x) = |a| N(x) \\quad \\text{(Absolute Homogeneity)} \\\\ 3.& \\ N(x) \\ge 0 \\text{ and } N(x) = 0 \\iff x = 0 \\quad \\text{(Positive Definiteness)} \\end{aligned}',
    backExplanation: 'A norm maps vectors in $V \\to [0, +\\infty[$, quantifying length, distance, and size in optimization.',
    remark: 'Norms induce distance metrics $d(x, y) = \\|x - y\\|$ used in KNN and clustering.'
  },
  {
    id: 'fc-15',
    category: 'Matrix Properties & Norms',
    title: 'Manhattan Norm ($L^1$)',
    frontPrompt: 'State the formula and primary machine learning use case for the Manhattan $L^1$ norm.',
    backFormula: '\\|x\\|_1 = \\sum_{i=1}^n |x_i|',
    backExplanation: 'Sum of absolute coordinate values. Geometrically corresponds to grid-aligned distance.',
    useCase: 'LASSO Regularization: Induces sparsity by driving irrelevant feature weights to exact zero.',
    remark: 'The $L^1$ ball has sharp corners on coordinate axes where loss contours naturally intersect.'
  },
  {
    id: 'fc-16',
    category: 'Matrix Properties & Norms',
    title: 'Euclidean Norm ($L^2$)',
    frontPrompt: 'State the formula and primary machine learning use case for the Euclidean $L^2$ norm.',
    backFormula: '\\|x\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2} = \\sqrt{x^T x}',
    backExplanation: 'Standard geometric Euclidean length of a vector from the origin. Smooth and differentiable everywhere except at $x=0$.',
    useCase: 'Ridge Regularization (Weight Decay): Prevents overfitting by shrinking weights smoothly toward zero.',
    remark: 'Preserved under orthogonal matrix multiplication: $\\|Ux\\|_2 = \\|x\\|_2$.'
  },
  {
    id: 'fc-17',
    category: 'Matrix Properties & Norms',
    title: '$p$-Norm ($L^p$)',
    frontPrompt: 'State the general formula and mathematical inequality associated with the $p$-norm $L^p$.',
    backFormula: '\\|x\\|_p = \\left( \\sum_{i=1}^n |x_i|^p \\right)^{1/p} \\quad \\text{for } p \\ge 1',
    backExplanation: 'Generalizes $L^1$ and $L^2$. Requires $p \\ge 1$ to preserve the convex triangle inequality axiom.',
    useCase: 'Hölder\'s Inequality: $|x^T y| \\le \\|x\\|_p \\|y\\|_q$ where $\\frac{1}{p} + \\frac{1}{q} = 1$.',
    remark: 'Cauchy-Schwarz is the special case $p = q = 2$.'
  },
  {
    id: 'fc-18',
    category: 'Matrix Properties & Norms',
    title: 'Infinity Norm ($L^\\infty$)',
    frontPrompt: 'State the formula and machine learning application for the Chebyshev Infinity norm $L^\\infty$.',
    backFormula: '\\|x\\|_\\infty = \\max_i |x_i|',
    backExplanation: 'Takes the maximum absolute value among all coordinate components. Corresponds to a hypercube unit ball.',
    useCase: 'Uniform Convergence & Adversarial Machine Learning: Constraining pixel noise in FGSM attacks ($x_{\\text{adv}} = x + \\epsilon \\text{sign}(\\nabla_x J)$).',
    remark: 'Represents the limit $\\lim_{p \\to \\infty} \\|x\\|_p$.'
  },

  // ================= 4. Definiteness & Subspaces =================
  {
    id: 'fc-19',
    category: 'Definiteness & Subspaces',
    title: 'Linear Dependence & Independence',
    frontPrompt: 'Formally define linear dependence vs linear independence for a set of vectors.',
    backFormula: '\\sum_{i=1}^k \\alpha_i x_i = 0 \\implies \\alpha_1 = \\dots = \\alpha_k = 0 \\iff \\text{Linearly Independent}',
    backExplanation: 'A set is linearly dependent if one vector can be written as a linear combination of the others (non-trivial scalars $\\alpha_i$ exist). Otherwise, it is linearly independent.',
    remark: 'If a set of $n$ vectors in $\\mathbb{R}^n$ is linearly independent, the matrix $[x_1 \\dots x_n]$ is invertible.'
  },
  {
    id: 'fc-20',
    category: 'Definiteness & Subspaces',
    title: 'Matrix Rank & Dimension Bounds',
    frontPrompt: 'Define matrix rank $\\text{rank}(A)$ and state its fundamental dimension equality.',
    backFormula: '\\text{rank}(A) = \\text{Column Rank} = \\text{Row Rank} \\le \\min(m, n)',
    backExplanation: 'The rank of matrix $A$ is the dimension of the vector space spanned by its columns. Column rank always equals row rank.',
    remark: 'Full rank means $\\text{rank}(A) = \\min(m, n)$. Rank-Nullity theorem: $\\text{rank}(A) + \\text{dim}(\\mathcal{N}(A)) = n$.'
  },
  {
    id: 'fc-21',
    category: 'Definiteness & Subspaces',
    title: 'Positive Semi-Definite Matrix (PSD)',
    frontPrompt: 'State the algebraic condition and notation for a Positive Semi-Definite (PSD) matrix $A \\succeq 0$.',
    backFormula: 'A = A^T \\quad \\text{and} \\quad \\forall x \\in \\mathbb{R}^n, \\ x^T A x \\ge 0 \\iff A \\succeq 0',
    backExplanation: 'A symmetric matrix where the quadratic form is non-negative for every vector $x$. Equivalently, all eigenvalues satisfy $\\lambda_i \\ge 0$.',
    remark: 'The Gram matrix $A^T A$ is always PSD for ANY matrix $A$, because $x^T (A^T A) x = \\|Ax\\|_2^2 \\ge 0$.'
  },
  {
    id: 'fc-22',
    category: 'Definiteness & Subspaces',
    title: 'Positive Definite Matrix (PD)',
    frontPrompt: 'State the strict condition and notation for a Positive Definite (PD) matrix $A \\succ 0$.',
    backFormula: 'A = A^T \\quad \\text{and} \\quad \\forall x \\in \\mathbb{R}^n \\setminus \\{0\\}, \\ x^T A x > 0 \\iff A \\succ 0',
    backExplanation: 'A symmetric matrix where the quadratic form is strictly positive for all non-zero vectors. Equivalently, all eigenvalues satisfy $\\lambda_i > 0$.',
    remark: 'Guarantees strictly convex bowl-shaped quadratic loss surfaces with a unique global minimum.'
  },

  // ================= 5. Eigenvalues & SVD =================
  {
    id: 'fc-23',
    category: 'Eigenvalues & SVD',
    title: 'Eigenvalue & Eigenvector Equation',
    frontPrompt: 'Write the fundamental eigenvalue-eigenvector equation for square matrix $A \\in \\mathbb{R}^{n \\times n}$.',
    backFormula: 'A z = \\lambda z \\iff (\\lambda I - A) z = 0, \\quad z \\in \\mathbb{R}^n \\setminus \\{0\\}',
    backExplanation: 'An eigenvector $z$ is scaled by factor $\\lambda$ without changing its directional line. $\\lambda$ is a root of the characteristic polynomial $\\det(\\lambda I - A) = 0$.',
    remark: 'Eigenvalue properties: $\\sum \\lambda_i = \\text{tr}(A)$ and $\\prod \\lambda_i = \\det(A)$.'
  },
  {
    id: 'fc-24',
    category: 'Eigenvalues & SVD',
    title: 'Spectral Theorem for Symmetric Matrices',
    frontPrompt: 'State the Spectral Theorem for a real symmetric matrix $A = A^T \\in \\mathbb{R}^{n \\times n}$.',
    backFormula: 'A = U \\Lambda U^T = \\sum_{i=1}^n \\lambda_i u_i u_i^T, \\quad \\text{where } U^T U = I, \\ \\Lambda = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)',
    backExplanation: 'Every real symmetric matrix has strictly real eigenvalues $\\lambda_i \\in \\mathbb{R}$ and is diagonalizable by an orthonormal matrix $U$ of eigenvectors.',
    remark: 'Forms the mathematical foundation of Principal Component Analysis (PCA) and Rayleigh Quotient optimization.'
  },
  {
    id: 'fc-25',
    category: 'Eigenvalues & SVD',
    title: 'Singular-Value Decomposition (SVD)',
    frontPrompt: 'State the Singular-Value Decomposition (SVD) formula and dimensions for any matrix $A \\in \\mathbb{R}^{m \\times n}$.',
    backFormula: 'A = U \\Sigma V^T, \\quad U \\in \\mathbb{R}^{m \\times m}, \\ \\Sigma \\in \\mathbb{R}^{m \\times n}, \\ V \\in \\mathbb{R}^{n \\times n}',
    backExplanation: 'Guarantees existence of orthogonal/unitary $U$ (left singular vectors), diagonal $\\Sigma$ (non-negative singular values $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$), and orthogonal/unitary $V$ (right singular vectors).',
    remark: 'Unlike eigendecomposition, SVD exists for ANY matrix, even rectangular or singular matrices!'
  },

  // ================= 6. Matrix Calculus =================
  {
    id: 'fc-26',
    category: 'Matrix Calculus',
    title: 'Matrix Gradient Definition',
    frontPrompt: 'Define the gradient of scalar function $f: \\mathbb{R}^{m \\times n} \\to \\mathbb{R}$ with respect to matrix $A$.',
    backFormula: '\\left( \\nabla_A f(A) \\right)_{i,j} = \\frac{\\partial f(A)}{\\partial A_{i,j}} \\in \\mathbb{R}^{m \\times n}',
    backExplanation: 'The matrix gradient has the exact same dimensions ($m \\times n$) as input matrix $A$. Entry $(i,j)$ contains the partial derivative with respect to $A_{ij}$.',
    remark: 'Note: The gradient is only defined when $f$ returns a scalar output.'
  },
  {
    id: 'fc-27',
    category: 'Matrix Calculus',
    title: 'Hessian Matrix Definition',
    frontPrompt: 'Define the Hessian matrix $\\nabla_x^2 f(x)$ for scalar function $f: \\mathbb{R}^n \\to \\mathbb{R}$.',
    backFormula: '\\left( \\nabla_x^2 f(x) \\right)_{i,j} = \\frac{\\partial^2 f(x)}{\\partial x_i \\partial x_j} \\in \\mathbb{R}^{n \\times n}',
    backExplanation: 'An $n \\times n$ symmetric matrix containing all second-order partial derivatives. Represents curvature.',
    remark: 'By Schwarz\'s theorem on smooth functions, $\\frac{\\partial^2 f}{\\partial x_i \\partial x_j} = \\frac{\\partial^2 f}{\\partial x_j \\partial x_i}$, guaranteeing the Hessian is symmetric.'
  },
  {
    id: 'fc-28',
    category: 'Matrix Calculus',
    title: 'Four Essential Matrix Gradient Identities',
    frontPrompt: 'What are the 4 fundamental matrix gradient properties highlighted in Stanford CS229?',
    backFormula: '\\begin{aligned} 1.& \\ \\nabla_A \\text{tr}(AB) = B^T \\\\ 2.& \\ \\nabla_{A^T} f(A) = (\\nabla_A f(A))^T \\\\ 3.& \\ \\nabla_A \\text{tr}(A B A^T C) = C A B + C^T A B^T \\\\ 4.& \\ \\nabla_A |A| = |A| (A^{-1})^T = |A| A^{-T} \\end{aligned}',
    backExplanation: 'These 4 identities allow fast analytical derivation of loss gradients in Linear Regression, Multivariate Gaussian MLE, and Neural Network parameter optimization.',
    remark: 'Bonus: For quadratic form with symmetric $A$, $\\nabla_x (x^T A x) = 2 A x$, and $\\nabla_A \\log |A| = A^{-T} = A^{-1}$.'
  }
];
