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

export const AI_WEEK3_FLASHCARDS: AIFlashcard[] = [
  {
    id: 'ai-w3-m1-fc-1',
    category: 'Module 1: Perceptrons and linear classifiers',
    title: 'Perceptron Scoring & Decision Rule',
    frontPrompt: 'What is the decision rule for a binary Rosenblatt perceptron?',
    backFormula: 'z = \\mathbf{w}^T \\mathbf{x} + b, \\quad \\hat{y} = \\text{sgn}(z) = \\begin{cases} +1 & \\text{if } z \\ge 0 \\\\ -1 & \\text{if } z < 0 \\end{cases}',
    backExplanation: 'The perceptron calculates the affine score z as a weighted sum of inputs plus bias, then applies the hard signum function to yield a discrete binary prediction.',
    useCase: 'Fundamental forward-pass calculation of a single artificial neuron.',
    remark: 'Contrast with logistic regression, which uses a smooth sigmoid activation sigma(z).'
  },
  {
    id: 'ai-w3-m1-fc-2',
    category: 'Module 1: Perceptrons and linear classifiers',
    title: 'Linear Decision Boundary Equation',
    frontPrompt: 'What algebraic equation defines the decision boundary of a perceptron, and how do weights and bias affect it?',
    backFormula: '\\mathbf{w}^T \\mathbf{x} + b = 0 \\implies x_2 = -\\frac{w_1}{w_2} x_1 - \\frac{b}{w_2}',
    backExplanation: 'The boundary is the locus where the perceptron is undecided (score z = 0). The weight vector w controls the boundary orientation (slope m = -w1/w2), while bias b controls the translation/offset from the origin.',
    useCase: 'Visualizing and engineering hyperplanes in 2D and high-dimensional feature spaces.',
    remark: 'Intuition: Weights rotate the ruler; bias slides the ruler.'
  },
  {
    id: 'ai-w3-m1-fc-3',
    category: 'Module 1: Perceptrons and linear classifiers',
    title: 'Linear Separability Condition',
    frontPrompt: 'What mathematical condition guarantees that an example (x_i, y_i) with y_i in {-1, +1} is correctly classified?',
    backFormula: 'y_i (\\mathbf{w}^T \\mathbf{x}_i + b) > 0',
    backExplanation: 'When y_i = +1, the score must be > 0. When y_i = -1, the score must be < 0. Multiplying the score by the true label y_i guarantees that all correct predictions result in a positive scalar product.',
    useCase: 'Evaluating zero classification loss and verifying the Perceptron Convergence Theorem.',
    remark: 'A dataset is linearly separable if this holds simultaneously for all N training points.'
  },
  {
    id: 'ai-w3-m1-fc-4',
    category: 'Module 1: Perceptrons and linear classifiers',
    title: 'The Bias Trick (Homogeneous Vector Representation)',
    frontPrompt: 'How does the bias trick absorb the scalar bias into the weight vector?',
    backFormula: '\\tilde{\\mathbf{x}} = [1, x_1, \\dots, x_n]^T, \\quad \\tilde{\\mathbf{w}} = [b, w_1, \\dots, w_n]^T \\implies z = \\tilde{\\mathbf{w}}^T \\tilde{\\mathbf{x}}',
    backExplanation: 'By setting an augmented input coordinate x_0 = 1, the affine operation w^T x + b is unified into a single linear inner product, streamlining vectorized linear algebra implementations.',
    useCase: 'Efficient matrix-vector multiplication in deep learning frameworks (PyTorch/TensorFlow).',
    remark: 'Standardized representation across neural networks, SVMs, and logistic regression.'
  }
];
