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
  },
  {
    id: 'ai-w3-m2-fc-1',
    category: 'Module 2: Perceptron training',
    title: 'Perceptron Parameter Update Rules',
    frontPrompt: 'What are the formal parameter update rules for weights and bias when a perceptron misclassifies an example?',
    backFormula: '\\mathbf{w} \\leftarrow \\mathbf{w} + \\alpha(y - \\hat{y})\\mathbf{x}, \\qquad b \\leftarrow b + \\alpha(y - \\hat{y})',
    backExplanation: 'When prediction y_hat differs from true label y, the model applies additive corrections scaled by the learning rate alpha. The error term (y - y_hat) dictates both direction and magnitude of the correction.',
    useCase: 'Stochastic online learning updates after observing each misclassified sample.',
    remark: 'If y_hat = y, the error factor is 0 and no parameter adjustment occurs.'
  },
  {
    id: 'ai-w3-m2-fc-2',
    category: 'Module 2: Perceptron training',
    title: 'Perceptron Error Term Dynamics',
    frontPrompt: 'What values can the error term (y - y_hat) assume for binary labels y in {-1, +1}, and what do they mean?',
    backFormula: 'e = y - \\hat{y} \\in \\{-2, 0, +2\\}',
    backExplanation: 'e = +2 occurs when true y=+1 but y_hat=-1 (positive mistake; pushes score higher). e = -2 occurs when true y=-1 but y_hat=+1 (negative mistake; pushes score lower). e = 0 occurs on correct classification (zero update).',
    useCase: 'Directional correction analysis in discrete binary classification.',
    remark: 'In the simplified unit-step formulation without factor of 2, updates are written w <- w + y*x.'
  },
  {
    id: 'ai-w3-m2-fc-3',
    category: 'Module 2: Perceptron training',
    title: 'Novikoff’s Convergence Theorem',
    frontPrompt: 'What upper bound does Novikoff’s Theorem place on the maximum number of mistakes k made by the perceptron?',
    backFormula: 'k \\le \\left( \\frac{R}{\\gamma} \\right)^2',
    backExplanation: 'Where R = max ||x_i|| is the maximum radius of the data distribution, and gamma > 0 is the geometric margin of the optimal separating hyperplane. The theorem guarantees finite convergence on any linearly separable dataset.',
    useCase: 'Theoretical guarantee of convergence for Rosenblatt’s perceptron algorithm.',
    remark: 'If gamma is small (classes lie very close), or R is large, convergence requires more updates.'
  },
  {
    id: 'ai-w3-m2-fc-4',
    category: 'Module 2: Perceptron training',
    title: 'Learning Rate Time-Decay Schedule',
    frontPrompt: 'How does time-based learning rate decay balance early exploration with late fine-tuning?',
    backFormula: '\\alpha_t = \\frac{\\alpha_0}{1 + \\frac{t}{\\tau}} \\quad \\text{or} \\quad \\alpha_t = \\frac{\\tau}{\\tau + t}',
    backExplanation: 'A large initial alpha_0 allows rapid progress and coarse boundary alignment during early epochs, while gradual hyperbolic decay as t -> infinity prevents late-stage boundary oscillation near decision borders.',
    useCase: 'Stabilizing stochastic gradient updates and perceptron training over thousands of steps.',
    remark: 'Common setting: tau = 1000, causing alpha to drop from 1.0 to 0.5 at step 1000, and 0.1 at step 9000.'
  },
  {
    id: 'ai-w3-m3-fc-1',
    category: 'Module 3: From perceptrons to neural networks',
    title: 'XOR Boolean Decomposition & Linear Inseparability',
    frontPrompt: 'Why does a single perceptron fail on XOR, and how does a 2-neuron hidden layer resolve it?',
    backFormula: '\\text{XOR}(x_1, x_2) = (x_1 \\lor x_2) \\land \\neg(x_1 \\land x_2) = h_{\\text{OR}} \\land \\neg h_{\\text{AND}}',
    backExplanation: 'XOR outputs +1 on opposing diagonals (0,1) and (1,0) and 0 on (0,0) and (1,1), which cannot be separated by a single straight line in R^2. A hidden layer maps inputs to [h_OR, h_AND]^T, where the classes become linearly separable.',
    useCase: 'Foundational motivation for multilayer neural network architectures.',
    remark: 'Proven by Marvin Minsky and Seymour Papert in their seminal 1969 monograph Perceptrons.'
  },
  {
    id: 'ai-w3-m3-fc-2',
    category: 'Module 3: From perceptrons to neural networks',
    title: 'The Linear Collapse Theorem',
    frontPrompt: 'What happens mathematically when deep neural networks are built without non-linear activation functions?',
    backFormula: '\\mathbf{y} = \\mathbf{W}^{(2)}(\\mathbf{W}^{(1)}\\mathbf{x} + \\mathbf{b}^{(1)}) + \\mathbf{b}^{(2)} = (\\mathbf{W}^{(2)}\\mathbf{W}^{(1)})\\mathbf{x} + (\\mathbf{W}^{(2)}\\mathbf{b}^{(1)} + \\mathbf{b}^{(2)}) = \\mathbf{W}\'\\mathbf{x} + \\mathbf{b}\'',
    backExplanation: 'Any sequence of matrix-vector affine transformations is closed under composition. Without non-linear activations g(z), a 100-layer network computes only a single flat hyperplane and cannot model non-linear boundaries.',
    useCase: 'Theoretical justification for inserting activation functions between consecutive neural network layers.',
    remark: 'Depth alone is futile without non-linearity.'
  },
  {
    id: 'ai-w3-m3-fc-3',
    category: 'Module 3: From perceptrons to neural networks',
    title: 'Forward Propagation Layer Vectorization',
    frontPrompt: 'What are the canonical vectorized matrix equations for forward propagation through layer l?',
    backFormula: '\\mathbf{z}^{(l)} = \\mathbf{W}^{(l)} \\mathbf{a}^{(l-1)} + \\mathbf{b}^{(l)}, \\qquad \\mathbf{a}^{(l)} = g\\left(\\mathbf{z}^{(l)}\\right)',
    backExplanation: 'Pre-activation vector z^(l) is computed by multiplying weight matrix W^(l) with the previous layer activations a^(l-1) and adding bias vector b^(l). The activation function g(.) is then applied elementwise.',
    useCase: 'Efficient batch computation and tensor operations in modern deep learning accelerators (GPUs/TPUs).',
    remark: 'Convention: a^(0) = x represents the input feature vector.'
  },
  {
    id: 'ai-w3-m3-fc-4',
    category: 'Module 3: From perceptrons to neural networks',
    title: 'Rectified Linear Unit (ReLU)',
    frontPrompt: 'How is the Rectified Linear Unit (ReLU) activation defined, and why is it preferred over Sigmoid in hidden layers?',
    backFormula: 'g(z) = \\text{ReLU}(z) = \\max(0, z) = \\begin{cases} z & \\text{if } z \\ge 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}',
    backExplanation: 'ReLU provides non-linear piecewise rectification while maintaining a constant derivative of 1 for all positive inputs. This solves the vanishing gradient saturation problem that plagues sigmoid and tanh activations.',
    useCase: 'Standard default activation function for hidden layers in modern deep feedforward and convolutional networks.',
    remark: 'Derivative is 1 for z > 0, 0 for z < 0, and non-differentiable at z = 0 (subgradient 0 or 1 is used).'
  }
];
