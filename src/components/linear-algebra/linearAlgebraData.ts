export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModule {
  title: string;
  badge: string;
  questions: Question[];
}

export interface DefinitionItem {
  term: string;
  def: string;
}

export interface FormulaItem {
  label: string;
  tex: string;
}

export interface ModuleContentSection {
  title: string;
  iconName: string;
  lead?: string;
  cards?: {
    title: string;
    subtitle?: string;
    text: string;
    latex?: string;
    note?: string;
  }[];
  bullets?: string[];
  callout?: {
    title: string;
    text: string;
    latex?: string;
  };
}

export interface StudyModule {
  id: number;
  key: string;
  title: string;
  badge: string;
  summary: string;
  iconName: string;
  hasVisualizer?: boolean;
  definitions: DefinitionItem[];
  formulas: FormulaItem[];
  sections: ModuleContentSection[];
}

export const LA_MODULES_DATA: StudyModule[] = [
  {
    id: 1,
    key: 'mod1',
    title: 'Basic Notation & Matrix Products',
    badge: 'Matrix Operations',
    summary: 'Matrix dimensions, row/column vectors, inner vs outer products, and the four fundamental views of matrix multiplication.',
    iconName: 'Layers',
    hasVisualizer: false,
    definitions: [
      {
        term: 'Matrix Dimension (m × n)',
        def: 'A rectangular array with m rows and n columns. An entry at row i, column j is denoted A_ij or a_ij.'
      },
      {
        term: 'Column vs Row Vectors',
        def: 'In ML conventions, x in R^n defaults to an n × 1 column vector. Transpose x^T in R^(1 × n) produces a row vector.'
      },
      {
        term: 'Inner Product (x^T y)',
        def: 'Computes sum of elementwise products, mapping two vectors in R^n to a scalar scalar in R. Also called dot product.'
      },
      {
        term: 'Outer Product (x y^T)',
        def: 'Given x in R^m and y in R^n, forms an m × n matrix of rank at most 1, where (x y^T)_ij = x_i * y_j.'
      }
    ],
    formulas: [
      { label: 'Inner (Dot) Product', tex: 'x^T y = \\sum_{i=1}^n x_i y_i \\in \\mathbb{R}' },
      { label: 'Outer Product (Rank ≤ 1)', tex: 'x y^T \\in \\mathbb{R}^{m \\times n}, \\quad (x y^T)_{ij} = x_i y_j' },
      { label: 'Matrix Product Entry C_ij', tex: 'C_{ij} = \\sum_{k=1}^n A_{ik} B_{kj} = a_{i,:}^T b_{:,j}' },
      { label: 'Sum of Outer Products', tex: 'C = AB = \\sum_{k=1}^n a_{:,k} b_{k,:}^T' }
    ],
    sections: [
      {
        title: 'Vector and Matrix Notation in Machine Learning',
        iconName: 'PenTool',
        lead: 'Linear algebra provides a compact notation for expressing and manipulating systems of linear equations and massive multi-dimensional parameter weights in modern neural networks.',
        cards: [
          {
            title: 'Matrix Notation (A ∈ R^(m × n))',
            subtitle: 'Rows and Columns',
            text: 'We denote a matrix with m rows and n columns by A in R^(m × n). The (i,j)-th entry is denoted A_ij. The i-th row is denoted a_i^T or A_{i,:}, and the j-th column is a_j or A_{:,j}.',
            latex: 'A = \\begin{bmatrix} a_{11} & a_{12} & \\dots & a_{1n} \\\\ a_{21} & a_{22} & \\dots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\dots & a_{mn} \\end{bmatrix}'
          },
          {
            title: 'Column Vector Convention',
            subtitle: 'Standard Defaults',
            text: 'Unless otherwise specified, all vectors are column vectors. Transposing a column vector produces a row vector.',
            latex: 'x = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{bmatrix} \\in \\mathbb{R}^n, \\quad x^T = \\begin{bmatrix} x_1 & x_2 & \\dots & x_n \\end{bmatrix} \\in \\mathbb{R}^{1 \\times n}'
          }
        ]
      },
      {
        title: 'The Four Views of Matrix Multiplication (C = AB)',
        iconName: 'Grid',
        lead: 'For C = AB where A in R^(m × n) and B in R^(n × p), C in R^(m × p). Viewing C from four mathematical angles builds critical intuition for deep learning backpropagation and optimization.',
        cards: [
          {
            title: 'View 1: Inner Products of Rows & Columns',
            text: 'Entry C_ij is computed as the inner product of the i-th row of A and the j-th column of B.',
            latex: 'C_{ij} = a_{i,:}^T b_{:,j}'
          },
          {
            title: 'View 2: Sum of Outer Products',
            text: 'Matrix C is the sum of n rank-1 outer products between the k-th column of A and k-th row of B.',
            latex: 'C = \\sum_{k=1}^n a_{:,k} b_{k,:}^T'
          },
          {
            title: 'View 3: Columns as Linear Combinations',
            text: 'Each column c_j of C is a linear combination of the columns of A, weighted by the entries of column j in B.',
            latex: 'c_j = A b_j'
          },
          {
            title: 'View 4: Rows as Linear Combinations',
            text: 'Each row c_i^T of C is a linear combination of the rows of B, weighted by the entries of row i in A.',
            latex: 'c_i^T = a_{i,:}^T B'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    key: 'mod2',
    title: 'Operations, Trace & Matrix Norms',
    badge: 'Matrix Operations & Norms',
    summary: 'Identity matrices, transposes, symmetric decompositions, cyclic trace operator properties, and vector/matrix norms.',
    iconName: 'Sliders',
    hasVisualizer: false,
    definitions: [
      {
        term: 'Identity Matrix (I)',
        def: 'A square matrix with ones on the main diagonal and zeros elsewhere. For any compatible matrix A, AI = A and IA = A.'
      },
      {
        term: 'Symmetric & Anti-Symmetric',
        def: 'A matrix A is symmetric if A = A^T. It is anti-symmetric (skew-symmetric) if A = -A^T.'
      },
      {
        term: 'Trace Operator tr(A)',
        def: 'The sum of the diagonal elements of a square matrix. It is linear and invariant under cyclic permutations: tr(ABC) = tr(BCA) = tr(CAB).'
      },
      {
        term: 'Vector & Matrix Norms',
        def: 'Functions measuring magnitude. Vector p-norms include l1 (Manhattan), l2 (Euclidean), and l_inf. The Frobenius norm is ||A||_F = sqrt(tr(A^T A)).'
      }
    ],
    formulas: [
      { label: 'Transpose Product Rule', tex: '(AB)^T = B^T A^T' },
      { label: 'Symmetric Decomposition', tex: 'A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)' },
      { label: 'Trace Definition', tex: '\\text{tr}(A) = \\sum_{i=1}^n A_{ii}' },
      { label: 'Frobenius Matrix Norm', tex: '\\|A\\|_F = \\sqrt{\\sum_{i=1}^m \\sum_{j=1}^n A_{ij}^2} = \\sqrt{\\text{tr}(A^T A)}' }
    ],
    sections: [
      {
        title: 'Identity, Transpose & Matrix Symmetry',
        iconName: 'RotateCw',
        lead: 'Transpose operations swap row and column coordinates. Squeezing symmetric and skew-symmetric components yields clean analytical forms in quadratic optimization.',
        cards: [
          {
            title: 'Transpose Properties',
            text: 'Key algebraic rules that govern transposes across matrix additions and multiplications:',
            latex: '(A^T)^T = A, \\quad (AB)^T = B^T A^T, \\quad (A + B)^T = A^T + B^T'
          },
          {
            title: 'Symmetric & Anti-Symmetric Split',
            text: 'Every square matrix A can be uniquely written as the sum of a symmetric matrix S and a skew-symmetric matrix K:',
            latex: 'S = \\frac{1}{2}(A + A^T) = S^T, \\quad K = \\frac{1}{2}(A - A^T) = -K^T'
          }
        ]
      },
      {
        title: 'The Trace Operator & Cyclic Permutations',
        iconName: 'Calculator',
        lead: 'The trace tr(A) provides an elegant mechanism for rewriting quadratic and matrix norms without explicit summation indices.',
        cards: [
          {
            title: 'Cyclic Permutation Invariance',
            text: 'The trace of a product is invariant under cyclic shifts of its matrix arguments:',
            latex: '\\text{tr}(ABCD) = \\text{tr}(DABC) = \\text{tr}(CDAB) = \\text{tr}(BCDA)'
          },
          {
            title: 'Inner Product of Matrices',
            text: 'The Frobenius inner product of matrices A and B is given by tr(A^T B), inducing the Frobenius norm:',
            latex: '\\langle A, B \\rangle_F = \\text{tr}(A^T B) = \\sum_{i,j} A_{ij} B_{ij}, \\quad \\|A\\|_F = \\sqrt{\\text{tr}(A^T A)}'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    key: 'mod3',
    title: 'Vector Spaces, Rank & Orthogonality',
    badge: 'Subspaces & Geometry',
    summary: 'Linear independence, column/row rank, matrix inverses, range, nullspace, and norm-preserving orthogonal matrices.',
    iconName: 'Network',
    hasVisualizer: true,
    definitions: [
      {
        term: 'Linear Independence',
        def: 'A set of vectors {x1, ..., xn} is linearly independent if no vector is a linear combination of the others (sum a_i x_i = 0 implies all a_i = 0).'
      },
      {
        term: 'Matrix Rank',
        def: 'The maximum number of linearly independent columns or rows. Column rank equals row rank: rank(A) <= min(m, n).'
      },
      {
        term: 'Orthogonal Matrix (U)',
        def: 'A square matrix with orthonormal columns: U^T U = I, which implies U^(-1) = U^T. Multiplication preserves Euclidean distance: ||Ux||_2 = ||x||_2.'
      },
      {
        term: 'Range & Nullspace',
        def: 'Range R(A) is the span of the columns of A. Nullspace N(A) is {x : Ax = 0}. By Rank-Nullity: dim(R(A)) + dim(N(A)) = n.'
      }
    ],
    formulas: [
      { label: 'Rank-Nullity Theorem', tex: '\\text{rank}(A) + \\text{dim}(\\mathcal{N}(A)) = n \\quad \\text{for } A \\in \\mathbb{R}^{m \\times n}' },
      { label: 'Inverse of Product', tex: '(AB)^{-1} = B^{-1} A^{-1}' },
      { label: 'Orthogonal Matrix Property', tex: 'U^T U = I = U U^T \\iff U^{-1} = U^T' },
      { label: 'Length Preservation (Isometry)', tex: '\\|U x\\|_2 = \\sqrt{(Ux)^T (Ux)} = \\sqrt{x^T U^T U x} = \\|x\\|_2' }
    ],
    sections: [
      {
        title: 'Subspaces: Range, Nullspace and Projections',
        iconName: 'Compass',
        lead: 'Understanding how a matrix compresses or transforms high-dimensional space into subspaces is the foundation of linear dimension reduction.',
        cards: [
          {
            title: 'Range / Columnspace R(A)',
            text: 'The subspace of all vectors achievable as outputs of the linear transformation Ax:',
            latex: '\\mathcal{R}(A) = \\{v \\in \\mathbb{R}^m : v = A x, x \\in \\mathbb{R}^n\\}'
          },
          {
            title: 'Nullspace / Kernel N(A)',
            text: 'The subspace of all input vectors mapped to the zero vector by matrix A:',
            latex: '\\mathcal{N}(A) = \\{x \\in \\mathbb{R}^n : A x = 0\\}'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    key: 'mod4',
    title: 'Determinants & Quadratic Forms',
    badge: 'Volume & Definiteness',
    summary: 'Determinants as volume scaling factors, quadratic forms x^T A x, positive definiteness (PD/PSD), and Gram matrices.',
    iconName: 'Box',
    hasVisualizer: false,
    definitions: [
      {
        term: 'Determinant det(A)',
        def: 'The signed volume scale factor of the parallelotope formed by matrix columns. det(A) != 0 iff A is invertible.'
      },
      {
        term: 'Quadratic Form (x^T A x)',
        def: 'A scalar polynomial of degree 2 in vector x defined by a symmetric matrix A: sum_i sum_j A_ij x_i x_j.'
      },
      {
        term: 'Positive Definite (A > 0)',
        def: 'A symmetric matrix where x^T A x > 0 for all x != 0. All eigenvalues are strictly positive. Guarantees convex objective functions.'
      },
      {
        term: 'Gram Matrix (A^T A)',
        def: 'For ANY arbitrary matrix A in R^(m × n), the product A^T A is always symmetric and positive semidefinite (PSD).'
      }
    ],
    formulas: [
      { label: 'Determinant of Scaled Matrix', tex: '\\det(\\alpha A) = \\alpha^n \\det(A) \\quad \\text{for } A \\in \\mathbb{R}^{n \\times n}' },
      { label: 'Determinant of Product', tex: '\\det(AB) = \\det(A) \\det(B), \\quad \\det(A^{-1}) = \\frac{1}{\\det(A)}' },
      { label: 'Positive Definiteness (PD)', tex: 'A \\succ 0 \\iff x^T A x > 0 \\quad \\forall x \\in \\mathbb{R}^n \\setminus \\{0\\}' },
      { label: 'Gram Matrix PSD Proof', tex: 'x^T (A^T A) x = (Ax)^T (Ax) = \\|Ax\\|_2^2 \\ge 0 \\quad \\forall x' }
    ],
    sections: [
      {
        title: 'Determinants and Multi-Dimensional Volume',
        iconName: 'Maximize2',
        lead: 'The determinant measures how a linear transformation scales n-dimensional volumes. A zero determinant indicates dimension collapse.',
        cards: [
          {
            title: 'Volume Scaling Factor',
            text: 'If S is a region in R^n with volume V, the transformed region A(S) has volume |det(A)| * V.',
            latex: '\\text{Vol}(A(S)) = |\\det(A)| \\cdot \\text{Vol}(S)'
          },
          {
            title: 'Algebraic Determinant Identities',
            text: 'Multiplication rules and inverse relationships for square matrices:',
            latex: '\\det(A^T) = \\det(A), \\quad \\det(AB) = \\det(A)\\det(B), \\quad \\det(A^{-1}) = \\frac{1}{\\det(A)}'
          }
        ]
      },
      {
        title: 'Quadratic Forms and Matrix Definiteness',
        iconName: 'Activity',
        lead: 'Quadratic forms appear in multivariate Gaussians, loss functions (MSE), and second-order Taylor series expansions.',
        cards: [
          {
            title: 'Classification of Definiteness',
            text: 'Positive Definite: x^T A x > 0 for all x != 0 (lambda_i > 0).\nPositive Semidefinite: x^T A x >= 0 for all x (lambda_i >= 0).\nNegative Definite: x^T A x < 0 for all x != 0 (lambda_i < 0).\nIndefinite: takes both positive and negative values.',
            latex: 'x^T A x = \\sum_{i=1}^n \\sum_{j=1}^n A_{ij} x_i x_j'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    key: 'mod5',
    title: 'Eigenvalues & Spectral Theory',
    badge: 'Spectral Theory & PCA',
    summary: 'Eigenvectors, characteristic polynomials, trace/determinant eigenvalue identities, spectral theorem for symmetric matrices, and Rayleigh quotients.',
    iconName: 'Activity',
    hasVisualizer: false,
    definitions: [
      {
        term: 'Eigenvalue & Eigenvector',
        def: 'A scalar lambda and non-zero vector x such that Ax = lambda x. Geometrically, A scales vector x without changing its direction line.'
      },
      {
        term: 'Characteristic Polynomial',
        def: 'The polynomial p(lambda) = det(lambda I - A) = 0 whose roots are precisely the eigenvalues of matrix A.'
      },
      {
        term: 'Spectral Theorem',
        def: 'Every real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors: A = U Lambda U^T = sum lambda_i u_i u_i^T.'
      },
      {
        term: 'Rayleigh Quotient',
        def: 'R(x) = (x^T A x) / (x^T x). For symmetric A, its maximum over unit vectors is the top eigenvalue lambda_max, driving PCA.'
      }
    ],
    formulas: [
      { label: 'Eigenvalue Equation', tex: 'A x = \\lambda x \\iff (\\lambda I - A) x = 0' },
      { label: 'Trace & Determinant Identities', tex: '\\text{tr}(A) = \\sum_{i=1}^n \\lambda_i, \\quad \\det(A) = \\prod_{i=1}^n \\lambda_i' },
      { label: 'Spectral Decomposition', tex: 'A = U \\Lambda U^T = \\sum_{i=1}^n \\lambda_i u_i u_i^T \\quad \\text{where } U^T U = I' },
      { label: 'Rayleigh Quotient Optimization', tex: '\\max_{\\|x\\|_2 = 1} x^T A x = \\lambda_{\\max}(A), \\quad \\min_{\\|x\\|_2 = 1} x^T A x = \\lambda_{\\min}(A)' }
    ],
    sections: [
      {
        title: 'Spectral Theorem for Symmetric Matrices',
        iconName: 'Award',
        lead: 'The Spectral Theorem is the engine behind Principal Component Analysis (PCA), Singular Value Decomposition (SVD), and spectral graph theory.',
        cards: [
          {
            title: 'Orthonormal Diagonalization',
            text: 'If A = A^T in R^(n × n), all eigenvalues are real and its eigenvectors can be chosen to be mutually orthogonal unit vectors U:',
            latex: 'A = U \\Lambda U^T = \\begin{bmatrix} | & & | \\\\ u_1 & \\dots & u_n \\\\ | & & | \\end{bmatrix} \\begin{bmatrix} \\lambda_1 & & 0 \\\\ & \\ddots & \\\\ 0 & & \\lambda_n \\end{bmatrix} \\begin{bmatrix} - & u_1^T & - \\\\ & \\vdots & \\\\ - & u_n^T & - \\end{bmatrix}'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    key: 'mod6',
    title: 'Matrix Calculus & Least Squares',
    badge: 'Calculus & Optimization',
    summary: 'Gradients with respect to vectors and matrices, Hessians, and step-by-step mathematical derivation of the Least Squares normal equations.',
    iconName: 'Calculator',
    hasVisualizer: false,
    definitions: [
      {
        term: 'Vector Gradient (grad_x f)',
        def: 'The vector of partial derivatives [df/dx1, ..., df/dxn]^T. Represents the direction of steepest ascent.'
      },
      {
        term: 'Hessian Matrix (grad^2 f)',
        def: 'The symmetric n × n matrix of second partial derivatives H_ij = d^2 f / (dx_i dx_j). Positive definite Hessian indicates strict local minimum.'
      },
      {
        term: 'Normal Equations',
        def: 'The linear system A^T A x = A^T b obtained by setting the gradient of the squared residual loss to zero.'
      },
      {
        term: 'Least Squares Solution',
        def: 'The analytical parameter estimate x* = (A^T A)^(-1) A^T b that minimizes ||Ax - b||_2^2 in linear regression.'
      }
    ],
    formulas: [
      { label: 'Gradient of Linear Form', tex: '\\nabla_x (b^T x) = b, \\quad \\nabla_x (x^T b) = b' },
      { label: 'Gradient of Quadratic Form (Symmetric A)', tex: '\\nabla_x (x^T A x) = 2 A x \\quad (A = A^T)' },
      { label: 'Matrix Gradient of Log Determinant', tex: '\\nabla_A \\log |A| = A^{-1} \\quad (A \\succ 0)' },
      { label: 'Least Squares Normal Equation', tex: '\\nabla_x \\|Ax - b\\|_2^2 = 0 \\implies A^T A x^* = A^T b \\implies x^* = (A^T A)^{-1} A^T b' }
    ],
    sections: [
      {
        title: 'Step-by-Step Ordinary Least Squares (OLS) Derivation',
        iconName: 'FileText',
        lead: 'Deriving the closed-form normal equations by expanding the L2 Euclidean loss function and taking its vector derivative.',
        cards: [
          {
            title: 'Step 1: Expand Residual Loss J(x)',
            text: 'Expand the squared L2 norm into quadratic, linear, and constant terms:',
            latex: 'J(x) = \\|A x - b\\|_2^2 = (A x - b)^T (A x - b) = x^T A^T A x - 2 b^T A x + b^T b'
          },
          {
            title: 'Step 2: Take Vector Gradient w.r.t x',
            text: 'Apply gradient identities for quadratic and linear terms:',
            latex: '\\nabla_x J(x) = 2 (A^T A) x - 2 A^T b'
          },
          {
            title: 'Step 3: Set Gradient to Zero & Solve',
            text: 'Equating to zero yields the Normal Equations and optimal parameter vector x*:',
            latex: '2 A^T A x - 2 A^T b = 0 \\implies A^T A x = A^T b \\implies x^* = (A^T A)^{-1} A^T b'
          }
        ]
      }
    ]
  }
];

export const LA_QUIZ_MODULES: Record<string, QuizModule> = {
  m1: {
    title: 'Module 1: Basic Notation & Matrix Products',
    badge: 'Notation & Products',
    questions: [
      {
        id: 'q1-1',
        question: 'If $x \\in \\mathbb{R}^5$ and $y \\in \\mathbb{R}^3$, what are the dimensions of the outer product $xy^T$?',
        options: ['$1 \\times 1$', '$5 \\times 3$', '$3 \\times 5$', 'Undefined'],
        correct: 1,
        explanation: 'An outer product of an $m \\times 1$ column vector $x$ and $1 \\times n$ row vector $y^T$ creates an $m \\times n$ matrix. Here $m=5$ and $n=3$, so the resulting dimension is $5 \\times 3$.'
      },
      {
        id: 'q1-2',
        question: 'According to View 3 of Matrix Multiplication, column $j$ of matrix $C = AB$ is expressed as:',
        options: ['$a_j^T B$', '$A b_j$', '$a_j^T b_j$', '$B a_j$'],
        correct: 1,
        explanation: 'Column $j$ of matrix $C$ is the matrix-vector product of matrix $A$ and column $j$ of matrix $B$, written as $c_j = A b_j$. This proves that each column of $C$ is a linear combination of the columns of $A$.'
      },
      {
        id: 'q1-3',
        question: 'Which algebraic property does matrix multiplication NOT satisfy in general?',
        options: [
          'Associativity: $(AB)C = A(BC)$',
          'Distributivity: $A(B+C) = AB + AC$',
          'Commutativity: $AB = BA$',
          'Transpose Rule: $(AB)^T = B^T A^T$'
        ],
        correct: 2,
        explanation: 'Matrix multiplication is non-commutative in general ($AB \\neq BA$). In fact, if $A$ is $m \\times n$ and $B$ is $n \\times m$ where $m \\neq n$, $AB$ is $m \\times m$ while $BA$ is $n \\times n$, having completely different dimensions.'
      },
      {
        id: 'q1-4',
        question: 'What is the maximum possible rank of an outer product matrix $M = x y^T$ where $x, y \\neq 0$?',
        options: ['0', '1', '$\\min(m, n)$', '$\\max(m, n)$'],
        correct: 1,
        explanation: 'Every column of $x y^T$ is given by $y_j x$, which is simply a scalar multiple of vector $x$. Thus, all columns span a 1-dimensional subspace, guaranteeing that the rank is exactly 1.'
      }
    ]
  },
  m2: {
    title: 'Module 2: Operations, Trace & Matrix Norms',
    badge: 'Trace & Norms',
    questions: [
      {
        id: 'q2-1',
        question: 'What is the trace of the $4 \\times 4$ identity matrix $I_4$?',
        options: ['1', '4', '16', '0'],
        correct: 1,
        explanation: 'The trace $\\text{tr}(A)$ is the sum of the main diagonal entries $\\sum_{i=1}^n A_{ii}$. For $I_4$, there are four diagonal entries each equal to 1, so $\\text{tr}(I_4) = 1 + 1 + 1 + 1 = 4$.'
      },
      {
        id: 'q2-2',
        question: 'Which expression is NOT necessarily equal to $\\text{tr}(ABCD)$ for compatible square matrices?',
        options: ['$\\text{tr}(DABC)$', '$\\text{tr}(CDAB)$', '$\\text{tr}(BCDA)$', '$\\text{tr}(DCBA)$'],
        correct: 3,
        explanation: 'The trace is invariant under cyclic permutations ($ABCD \\to DABC \\to CDAB \\to BCDA$). However, reversing the multiplication order ($DCBA$) is a non-cyclic transposition and does not yield the same trace in general.'
      },
      {
        id: 'q2-3',
        question: 'If vector $x = [3, -4]^T$, what are its $\\ell_1$ and $\\ell_2$ norms respectively?',
        options: [
          '$\\Vert x \\Vert_1 = 7, \\Vert x \\Vert_2 = 5$',
          '$\\Vert x \\Vert_1 = 5, \\Vert x \\Vert_2 = 7$',
          '$\\Vert x \\Vert_1 = 1, \\Vert x \\Vert_2 = 25$',
          '$\\Vert x \\Vert_1 = 7, \\Vert x \\Vert_2 = 25$'
        ],
        correct: 0,
        explanation: 'The $\\ell_1$ norm is the Manhattan sum: $|3| + |-4| = 3 + 4 = 7$. The $\\ell_2$ norm is Euclidean length: $\\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.'
      },
      {
        id: 'q2-4',
        question: 'How can the Frobenius matrix norm $\\Vert A \\Vert_F$ be expressed using the trace operator?',
        options: ['$\\text{tr}(A^2)$', '$\\sqrt{\\text{tr}(A)}$', '$\\sqrt{\\text{tr}(A^T A)}$', '$\\text{tr}(A A^T)$'],
        correct: 2,
        explanation: 'By definition, the sum of all squared entries $\\sum_{i,j} A_{ij}^2$ equals the trace of $A^T A$. Therefore, the Frobenius norm is $\\Vert A \\Vert_F = \\sqrt{\\text{tr}(A^T A)}$.'
      }
    ]
  },
  m3: {
    title: 'Module 3: Vector Spaces, Rank & Orthogonality',
    badge: 'Rank & Orthogonality',
    questions: [
      {
        id: 'q3-1',
        question: 'If matrix $U$ is an orthogonal matrix, what is its matrix inverse $U^{-1}$?',
        options: ['$-U$', '$U^T$', '$I$', '$U^2$'],
        correct: 1,
        explanation: 'An orthogonal matrix has mutually orthonormal columns, satisfying $U^T U = I$. By definition of the matrix inverse, $U^{-1} = U^T$.'
      },
      {
        id: 'q3-2',
        question: 'For a matrix $A \\in \\mathbb{R}^{5 \\times 3}$, what is the maximum possible rank of $A$?',
        options: ['5', '3', '8', '15'],
        correct: 1,
        explanation: 'The rank of a matrix is bounded by the minimum of its dimensions: $\\text{rank}(A) \\le \\min(m, n)$. Here $\\min(5, 3) = 3$.'
      },
      {
        id: 'q3-3',
        question: 'If $A$ and $B$ are invertible $n \\times n$ matrices, what is $(AB)^{-1}$?',
        options: ['$A^{-1} B^{-1}$', '$B^{-1} A^{-1}$', '$(BA)^T$', '$A B^{-1}$'],
        correct: 1,
        explanation: 'The inverse of a product reverses order: $(AB)^{-1} = B^{-1} A^{-1}$. We verify: $(AB)(B^{-1} A^{-1}) = A(B B^{-1})A^{-1} = A I A^{-1} = I$.'
      },
      {
        id: 'q3-4',
        question: 'If $\\text{rank}(A) = 3$ for matrix $A \\in \\mathbb{R}^{4 \\times 5}$, what is the dimension of $A$\'s nullspace $\\mathcal{N}(A)$?',
        options: ['1', '2', '3', '4'],
        correct: 1,
        explanation: 'By the Rank-Nullity Theorem, $\\text{rank}(A) + \\text{dim}(\\mathcal{N}(A)) = n$, where $n$ is the number of columns. Here $3 + \\text{dim}(\\mathcal{N}(A)) = 5 \\implies \\text{dim}(\\mathcal{N}(A)) = 2$.'
      }
    ]
  },
  m4: {
    title: 'Module 4: Determinants & Quadratic Forms',
    badge: 'Determinants & Definiteness',
    questions: [
      {
        id: 'q4-1',
        question: 'If matrix $A \\in \\mathbb{R}^{3 \\times 3}$ has determinant $\\det(A) = 4$, what is $\\det(2A)$?',
        options: ['8', '16', '32', '24'],
        correct: 2,
        explanation: 'For an $n \\times n$ matrix, scaling by scalar $\\alpha$ scales every row by $\\alpha$, so $\\det(\\alpha A) = \\alpha^n \\det(A)$. Here $n=3$ and $\\alpha=2$, so $\\det(2A) = 2^3 \\times 4 = 8 \\times 4 = 32$.'
      },
      {
        id: 'q4-2',
        question: 'Which condition guarantees that symmetric matrix $A$ is Positive Definite ($A \\succ 0$)?',
        options: [
          '$\\det(A) = 0$',
          '$x^T A x > 0$ for all non-zero $x \\neq 0$',
          '$x^T A x \\ge 0$ for all $x$',
          'All entries $A_{ij} > 0$'
        ],
        correct: 1,
        explanation: 'A symmetric matrix is strictly Positive Definite if its quadratic form $x^T A x > 0$ for every non-zero vector $x \\neq 0$. This is also equivalent to all eigenvalues $\\lambda_i > 0$.'
      },
      {
        id: 'q4-3',
        question: 'For any real matrix $A \\in \\mathbb{R}^{m \\times n}$, what can be stated about the Gram matrix $G = A^T A$?',
        options: [
          'It is always Positive Semidefinite (PSD)',
          'It is always Negative Definite',
          'It is always Identity',
          'It is always skew-symmetric'
        ],
        correct: 0,
        explanation: 'For any vector $x$, $x^T (A^T A) x = (Ax)^T (Ax) = \\Vert Ax \\Vert_2^2 \\ge 0$. Since the quadratic form is always non-negative, $A^T A$ is always Positive Semidefinite (PSD).'
      },
      {
        id: 'q4-4',
        question: 'If $\\det(A) = 5$ and $\\det(B) = -3$, what is $\\det(A^{-1} B^T)$?',
        options: ['$-15$', '$-3/5$', '$-5/3$', '15'],
        correct: 1,
        explanation: 'Using determinant properties: $\\det(A^{-1} B^T) = \\det(A^{-1}) \\det(B^T) = \\frac{1}{\\det(A)} \\det(B) = \\frac{1}{5} \\times (-3) = -\\frac{3}{5}$.'
      }
    ]
  },
  m5: {
    title: 'Module 5: Eigenvalues & Spectral Theory',
    badge: 'Eigenvalues & Spectral',
    questions: [
      {
        id: 'q5-1',
        question: 'If a $3 \\times 3$ matrix has eigenvalues $\\lambda = 2, 5, -3$, what is its trace $\\text{tr}(A)$?',
        options: ['4', '10', '-30', '30'],
        correct: 0,
        explanation: 'The trace of any square matrix equals the sum of its eigenvalues: $\\text{tr}(A) = \\sum_{i=1}^n \\lambda_i = 2 + 5 + (-3) = 4$.'
      },
      {
        id: 'q5-2',
        question: 'What is the determinant $\\det(A)$ of the matrix with eigenvalues $\\lambda = 2, 5, -3$?',
        options: ['4', '-30', '30', '10'],
        correct: 1,
        explanation: 'The determinant of a matrix equals the product of its eigenvalues: $\\det(A) = \\prod_{i=1}^n \\lambda_i = 2 \\times 5 \\times (-3) = -30$.'
      },
      {
        id: 'q5-3',
        question: 'According to the Spectral Theorem, the eigenvectors of a real symmetric matrix $A = A^T$ can be chosen to be:',
        options: ['Complex numbers', 'Linearly dependent', 'Orthonormal', 'Zero vectors'],
        correct: 2,
        explanation: 'The Spectral Theorem proves that for any real symmetric matrix, all eigenvalues are real and the eigenvectors can always be selected to form an orthonormal basis ($U^T U = I$).'
      },
      {
        id: 'q5-4',
        question: 'What maximum value does $x^T A x$ attain over unit vectors $\\Vert x \\Vert_2 = 1$ for a symmetric matrix $A$?',
        options: ['$\\text{tr}(A)$', '$\\det(A)$', 'The maximum eigenvalue $\\lambda_{\\max}$', '1'],
        correct: 2,
        explanation: 'By Rayleigh Quotient theory, $\\max_{\\Vert x \\Vert_2 = 1} x^T A x = \\lambda_{\\max}(A)$, and the maximum is achieved precisely when $x$ is the primary eigenvector $u_1$.'
      }
    ]
  },
  m6: {
    title: 'Module 6: Matrix Calculus & Least Squares',
    badge: 'Calculus & Least Squares',
    questions: [
      {
        id: 'q6-1',
        question: 'What is the gradient $\\nabla_x (x^T A x)$ when $A$ is a symmetric matrix ($A = A^T$)?',
        options: ['$A x$', '$2 A x$', '$A^T x$', '$2 A$'],
        correct: 1,
        explanation: 'For any matrix $A$, $\\nabla_x (x^T A x) = (A + A^T)x$. When $A$ is symmetric ($A = A^T$), this simplifies directly to $2Ax$.'
      },
      {
        id: 'q6-2',
        question: 'What is the gradient of $\\log \\det(A)$ with respect to positive definite matrix $A$?',
        options: ['$\\frac{1}{|A|}$', '$A^{-1}$', '$A^T$', '$|A| A^{-1}$'],
        correct: 1,
        explanation: 'The derivative identity is $\\nabla_A \\log \\det(A) = A^{-T}$. Since $A$ is symmetric and positive definite ($A = A^T$), $A^{-T} = A^{-1}$.'
      },
      {
        id: 'q6-3',
        question: 'In the least squares normal equations $A^T A x = A^T b$, what matrix is inverted to solve for $x$?',
        options: ['$A$', '$A^T$', '$A^T A$', '$A A^T$'],
        correct: 2,
        explanation: 'Multiplying both sides by the inverse of the Gram matrix $(A^T A)^{-1}$ yields the closed-form normal equation solution $x^* = (A^T A)^{-1} A^T b$.'
      },
      {
        id: 'q6-4',
        question: 'What is the Hessian matrix $\\nabla_x^2 f(x)$ of the quadratic function $f(x) = \\frac{1}{2} x^T A x - b^T x$ where $A = A^T$?',
        options: ['$A x - b$', '$A$', '$2A$', '$0$'],
        correct: 1,
        explanation: 'The first derivative (gradient) is $\\nabla_x f(x) = A x - b$. Differentiating once more with respect to $x$ gives the Hessian matrix $H = A$.'
      }
    ]
  }
};
