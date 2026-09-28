import { UniversalFlashcard } from '../../../../common';

export const ML_WEEK5_FLASHCARDS: UniversalFlashcard[] = [
  {
    id: 'w5-fc-1',
    category: 'Module 1: Hyperplanes',
    title: 'Hyperplane Equation & Normal Vector',
    frontPrompt: 'What is the mathematical definition of an affine hyperplane in p dimensions and what role does vector w play?',
    backFormula: 'w^T x + b = 0, \\quad w \\perp \\text{Hyperplane}',
    backExplanation: 'A hyperplane is a flat affine subspace of dimension p-1. The weight vector w is the normal vector orthogonal to every vector lying within the hyperplane.',
    useCase: 'Defines the decision boundary for all linear classifiers including Perceptron, Logistic Regression, and Linear SVM.',
    remark: 'The scalar bias b shifts the hyperplane away from the origin along normal direction w.'
  },
  {
    id: 'w5-fc-2',
    category: 'Module 1: Hyperplanes',
    title: 'Signed Distance to Hyperplane',
    frontPrompt: 'How is the geometric perpendicular distance from an arbitrary point x to a hyperplane w^T x + b = 0 computed?',
    backFormula: '\\text{dist}(x, H) = \\frac{|w^T x + b|}{\\|w\\|}',
    backExplanation: 'Projecting vector (x - x_0) onto the unit normal w / ||w|| gives the exact perpendicular distance. The sign of (w^T x + b) indicates which half-space x occupies.',
    useCase: 'Determining prediction margin and confidence in linear decision rules f(x) = sign(w^T x + b).',
    remark: 'If ||w|| = 1 (normalized), the algebraic value w^T x + b equals the exact geometric distance.'
  },
  {
    id: 'w5-fc-3',
    category: 'Module 2: Maximal-Margin',
    title: 'Hard-Margin Quadratic Program',
    frontPrompt: 'How is the search for the maximal-margin hyperplane framed as a convex quadratic optimization problem?',
    backFormula: '\\min_{w, b} \\frac{1}{2}\\|w\\|^2 \\quad \\text{s.t.} \\quad y_i(w^T x_i + b) \\ge 1, \\; \\forall i',
    backExplanation: 'The geometric margin is M = 1 / ||w||. Maximizing M is mathematically equivalent to minimizing (1/2)||w||^2 subject to all points satisfying the canonical margin constraints.',
    useCase: 'Used for strictly linearly separable training data to find the unique optimal separating boundary.',
    remark: 'Convex quadratic objective with linear inequality constraints guarantees a unique global minimum.'
  },
  {
    id: 'w5-fc-4',
    category: 'Module 2: Maximal-Margin',
    title: 'Support Vectors & Sparsity',
    frontPrompt: 'Which data points are classified as Support Vectors in hard-margin SVM, and how do non-support points affect the boundary?',
    backFormula: 'y_i (w^T x_i + b) = 1 \\implies \\alpha_i > 0',
    backExplanation: 'Support vectors are the critical points lying exactly on the margin boundaries. The optimal weight vector w = sum alpha_i y_i x_i depends exclusively on them; points with y_i f(x_i) > 1 have alpha_i = 0 and zero influence.',
    useCase: 'Enables sparse solutions and memory-efficient storage during inference.',
    remark: 'Moving or deleting non-support vectors leaves the decision boundary completely unchanged.'
  },
  {
    id: 'w5-fc-5',
    category: 'Module 3: Soft Margins',
    title: 'Soft-Margin Optimization & Slack',
    frontPrompt: 'How does soft-margin SVM accommodate noisy or non-linearly separable data?',
    backFormula: '\\min_{w, b, \\xi} \\frac{1}{2}\\|w\\|^2 + C \\sum_{i=1}^N \\xi_i \\quad \\text{s.t.} \\quad y_i(w^T x_i + b) \\ge 1 - \\xi_i, \\; \\xi_i \\ge 0',
    backExplanation: 'Slack variables xi_i allow points to violate the margin: xi_i = 0 means on or outside margin; 0 < xi_i <= 1 means inside margin but correctly classified; xi_i > 1 means misclassified.',
    useCase: 'Real-world noisy classification datasets where strict linear separation is impossible.',
    remark: 'Penalizing the sum of slack variables bounds the total training margin violation.'
  },
  {
    id: 'w5-fc-6',
    category: 'Module 3: Soft Margins',
    title: 'Role of Regularization Parameter C',
    frontPrompt: 'What is the effect of tuning the soft-margin penalty parameter C on the bias-variance trade-off?',
    backFormula: 'C \\to \\infty \\implies \\text{Hard Margin (Low Bias, High Variance)}',
    backExplanation: 'Large C penalizes slack violations severely, producing a narrow margin that fits training data closely (risk of overfitting). Small C allows more violations, creating a wider, smoother margin with higher bias and lower variance.',
    useCase: 'Hyperparameter tuned via cross-validation to maximize out-of-sample generalization.',
    remark: 'Acts inversely to standard L2 regularization parameter lambda (C ~ 1 / lambda).'
  },
  {
    id: 'w5-fc-7',
    category: 'Module 4: Feature Expansion',
    title: 'Cover’s Theorem on Separability',
    frontPrompt: 'What does Cover’s Theorem state regarding pattern classification in transformed high-dimensional spaces?',
    backFormula: 'P(\\text{separable}) = \\left(\\frac{1}{2}\\right)^{N-1} \\sum_{m=0}^{d-1} \\binom{N-1}{m}',
    backExplanation: 'A complex pattern classification problem cast in a high-dimensional space non-linearly is more likely to be linearly separable than in a low-dimensional space.',
    useCase: 'Theoretical justification for mapping input features x to phi(x) prior to linear classification.',
    remark: 'Forms the foundational motivation for explicit polynomial expansions and the Kernel Trick.'
  },
  {
    id: 'w5-fc-8',
    category: 'Module 5: Kernel Trick',
    title: 'The Kernel Trick',
    frontPrompt: 'What is the Kernel Trick and how does it bypass the curse of dimensionality in high-dimensional feature spaces?',
    backFormula: 'K(x, z) = \\langle \\phi(x), \\phi(z) \\rangle',
    backExplanation: 'Because dual SVM algorithms depend only on inner products between pairs of observations, a kernel function computes <phi(x), phi(z)> directly in input space without ever explicitly computing high- or infinite-dimensional coordinates phi(x).',
    useCase: 'Allows nonlinear classification with polynomial and infinite-dimensional RBF feature spaces in O(d) time.',
    remark: 'Discovered by Aizerman, Braverman, and Rozonoer (1964) and applied to SVM by Boser, Guyon, and Vapnik (1992).'
  },
  {
    id: 'w5-fc-9',
    category: 'Module 5: Kernel Trick',
    title: 'Gaussian Radial Basis Function (RBF)',
    frontPrompt: 'What is the Gaussian RBF kernel and what is the role of parameter gamma?',
    backFormula: 'K(x, z) = \\exp\\left(-\\gamma \\|x - z\\|^2\\right) = \\exp\\left(-\\frac{\\|x - z\\|^2}{2\\sigma^2}\\right)',
    backExplanation: 'Measures similarity between points using Gaussian distance. Gamma controls the influence radius of support vectors: large gamma creates tight, complex boundary bubbles (overfitting); small gamma creates smooth, broad boundaries (underfitting).',
    useCase: 'The most popular general-purpose non-linear kernel; corresponds to an infinite-dimensional feature space.',
    remark: 'A Mercer kernel whose Gram matrix is always positive semi-definite.'
  },
  {
    id: 'w5-fc-10',
    category: 'Module 6: Multiclass & Calibration',
    title: 'Platt Scaling (Margin Calibration)',
    frontPrompt: 'Why are raw SVM output scores f(x) not probabilities, and how does Platt Scaling calibrate them?',
    backFormula: 'P(y=1 \\mid x) = \\frac{1}{1 + \\exp(A \\cdot f(x) + B)}',
    backExplanation: 'Raw SVM margins f(x) = w^T phi(x) + b represent uncalibrated geometric distances, not probabilities. Platt scaling fits a two-parameter logistic sigmoid on validation margins via maximum likelihood.',
    useCase: 'Producing calibrated class posterior probabilities P(Y=k|x) required for risk-sensitive decision making.',
    remark: 'Implemented in popular libraries (e.g. scikit-learn SVC(probability=True)).'
  },
  {
    id: 'w5-fc-11',
    category: 'Module 7: Regularization',
    title: 'L1 vs. L2 Regularization Geometry',
    frontPrompt: 'Why does L1 regularization (Lasso) encourage sparse weight vectors while L2 (Ridge) shrinks weights smoothly?',
    backFormula: '\\|w\\|_1 = \\sum_j |w_j| \\quad \\text{vs.} \\quad \\|w\\|_2^2 = \\sum_j w_j^2',
    backExplanation: 'The L1 constraint region is a diamond with sharp corners situated directly on the coordinate axes, where loss contours frequently make first contact (setting w_j = 0). The L2 ball is smooth and spherical, shrinking weights without zeroing them.',
    useCase: 'Use L1 when feature selection and interpretability are paramount; use L2 for numerical stability with correlated features.',
    remark: 'Standard SVM uses L2 regularization on weights: (1/2)||w||^2.'
  },
  {
    id: 'w5-fc-12',
    category: 'Module 8: Optimization',
    title: 'Sequential Minimal Optimization (SMO)',
    frontPrompt: 'How does Platt’s SMO algorithm solve the dual SVM quadratic program efficiently?',
    backFormula: '\\sum_{i=1}^N \\alpha_i y_i = 0 \\implies \\alpha_1 y_1 + \\alpha_2 y_2 = -\\sum_{i=3}^N \\alpha_i y_i = \\text{const}',
    backExplanation: 'Because the linear equality constraint requires at least two multipliers to be adjusted simultaneously, SMO iteratively selects two Lagrange multipliers alpha_1 and alpha_2, optimizes them analytically in closed form, and repeats.',
    useCase: 'Solves large-scale SVM training without storing the N x N kernel matrix in memory.',
    remark: 'Transforms an O(N^3) general quadratic programming solver into an O(N) to O(N^2) fast heuristic.'
  }
];
