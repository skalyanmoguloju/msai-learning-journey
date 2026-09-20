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
  },
  {
    id: 'ai-w3-m4-fc-1',
    category: 'Module 4: Activation functions',
    title: 'Logistic Sigmoid Function & Derivative',
    frontPrompt: 'What is the mathematical definition and derivative of the logistic sigmoid activation function?',
    backFormula: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\qquad \\sigma\'(z) = \\sigma(z)\\bigl(1 - \\sigma(z)\\bigr) \\le 0.25',
    backExplanation: 'Sigmoid maps real inputs to (0, 1), making it ideal for modeling class posterior probabilities P(y = 1 | x). Its derivative reaches a peak of 0.25 at z = 0 and decays to 0 at the tails, precipitating vanishing gradients in deep networks.',
    useCase: 'Output layer activation for binary classification tasks and gating mechanisms in LSTMs.',
    remark: 'Vanishing gradient bound: Product of L derivatives scales as O(0.25^L).'
  },
  {
    id: 'ai-w3-m4-fc-2',
    category: 'Module 4: Activation functions',
    title: 'Hyperbolic Tangent (Tanh) Properties',
    frontPrompt: 'What is the definition, range, and derivative of the Tanh activation function, and why is it preferred over Sigmoid in shallow networks?',
    backFormula: '\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\\sigma(2z) - 1, \\qquad \\tanh\'(z) = 1 - \\tanh^2(z)',
    backExplanation: 'Tanh maps to (-1, +1) and is zero-centered with tanh(0) = 0. Its peak derivative is 1.0 at the origin (4x higher than sigmoid). Zero-centering avoids systematic directional bias in weight gradient descent updates.',
    useCase: 'Hidden layers in recurrent neural networks (RNNs) and shallow feedforward networks.',
    remark: 'Still suffers from gradient saturation as |z| exceeds ~3.0.'
  },
  {
    id: 'ai-w3-m4-fc-3',
    category: 'Module 4: Activation functions',
    title: 'The Dying ReLU Problem & Leaky ReLU',
    frontPrompt: 'Why do ordinary ReLU neurons die, and how does Leaky ReLU resolve this failure mode?',
    backFormula: '\\text{LeakyReLU}(z) = \\max(\\alpha z, z) = \\begin{cases} z & \\text{if } z \\ge 0 \\\\ \\alpha z & \\text{if } z < 0 \\end{cases} \\quad (\\alpha \\approx 0.01)',
    backExplanation: 'For z < 0, standard ReLU outputs 0 with 0 derivative. If an aggressive weight update causes z < 0 for all training data, the neuron permanently dies. Leaky ReLU preserves a slight gradient alpha > 0 on the negative side, enabling neuron revival.',
    useCase: 'Robust replacement for standard ReLU to prevent dead neuron capacity loss.',
    remark: 'Parametric ReLU (PReLU) treats alpha as a learnable parameter updated by backpropagation.'
  },
  {
    id: 'ai-w3-m4-fc-4',
    category: 'Module 4: Activation functions',
    title: 'Softplus Function & Analytic Derivative',
    frontPrompt: 'What is the Softplus activation function, and what elegant relationship connects its derivative to Sigmoid?',
    backFormula: '\\text{Softplus}(z) = \\ln\\left(1 + e^z\\right), \\qquad \\frac{d}{dz}\\text{Softplus}(z) = \\frac{e^z}{1 + e^z} = \\sigma(z)',
    backExplanation: 'Softplus is a smooth, everywhere-differentiable approximation of ReLU (max(0, z)). Its derivative is exactly the logistic sigmoid function, providing continuous, smooth gradient transitions without the non-differentiable kink at z = 0.',
    useCase: 'Variational autoencoders (VAEs) to enforce smooth, strictly positive variance parameters sigma^2.',
    remark: 'Softplus operates on scalars, whereas Softmax normalizes entire vectors of logits to sum to 1.'
  },
  {
    id: 'ai-w3-m5-fc-1',
    category: 'Module 5: Training a multilayer neural network',
    title: 'Sum of Squared Errors & Mean Squared Error',
    frontPrompt: 'What are the formulas for total sum of squared errors E(w) and Mean Squared Error (MSE), and why do they share identical minima?',
    backFormula: 'E(\\mathbf{w}) = \\sum_{j=1}^N \\left(y_j - f_\\mathbf{w}(\\mathbf{x}_j)\\right)^2, \\qquad \\text{MSE}(\\mathbf{w}) = \\frac{1}{N} \\sum_{j=1}^N \\left(y_j - f_\\mathbf{w}(\\mathbf{x}_j)\\right)^2',
    backExplanation: 'Both metrics aggregate squared residual errors across all N observations. Because N > 0 is a fixed positive constant, scaling by 1/N does not change the sign of derivatives or the location of critical points and global minima.',
    useCase: 'Standard regression objective functions in statistical learning and neural networks.',
    remark: 'MSE is preferred in practice because its magnitude is invariant to dataset sample size.'
  },
  {
    id: 'ai-w3-m5-fc-2',
    category: 'Module 5: Training a multilayer neural network',
    title: 'Gradient Descent Optimization Rule',
    frontPrompt: 'What is the mathematical formulation of the gradient descent parameter update rule?',
    backFormula: '\\theta \\longleftarrow \\theta - \\alpha \\nabla_\\theta E(\\theta) = \\theta - \\alpha \\left[ \\frac{\\partial E}{\\partial \\theta_1}, \\dots, \\frac{\\partial E}{\\partial \\theta_P} \\right]^T',
    backExplanation: 'The multi-variable gradient nabla_theta E points in the direction of steepest rate of loss increase. Moving in the negative gradient direction (-alpha * grad) descends the loss landscape toward local or global error minima.',
    useCase: 'Foundational iterative optimization algorithm for training deep neural network parameters.',
    remark: 'Alpha is the learning rate hyperparameter controlling physical step length per iteration.'
  },
  {
    id: 'ai-w3-m5-fc-3',
    category: 'Module 5: Training a multilayer neural network',
    title: 'Network Parameter Accounting Formula',
    frontPrompt: 'How do you calculate the total number of learnable parameters P in a fully connected feedforward network?',
    backFormula: 'P = \\sum_{l=1}^L \\left( n_{l-1} \\cdot n_l + n_l \\right)',
    backExplanation: 'For each layer l with n_l neurons receiving inputs from layer l-1 with n_(l-1) units, there are (n_(l-1) * n_l) synaptic weights plus n_l neuron biases. For example, a 3-4-1 network has (3*4 + 4) + (4*1 + 1) = 16 + 5 = 21 parameters.',
    useCase: 'Calculating model parameter footprint and estimating GPU memory requirements.',
    remark: 'Does not include hyperparameter counts such as learning rates or batch sizes.'
  },
  {
    id: 'ai-w3-m5-fc-4',
    category: 'Module 5: Training a multilayer neural network',
    title: 'The 5-Stage Neural Network Training Loop',
    frontPrompt: 'What are the five canonical sequential stages of the neural network training loop?',
    backFormula: '\\text{Initialize}(\\theta) \\longrightarrow \\text{Forward}(\\hat{y}) \\longrightarrow \\text{Loss}(E) \\longrightarrow \\text{Gradients}(\\nabla_\\theta E) \\longrightarrow \\text{Update}(\\theta \\leftarrow \\theta - \\alpha\\nabla E)',
    backExplanation: '1. Initialize weights/biases; 2. Forward pass computes intermediate activations and prediction; 3. Loss evaluates penalty; 4. Backpropagation applies chain rule to compute gradients; 5. Gradient descent updates parameters. Repeated for multiple epochs.',
    useCase: 'The foundational architectural loop implemented by PyTorch, TensorFlow, and JAX training scripts.',
    remark: 'Epoch represents one complete traversal across all N training samples.'
  },
  {
    id: 'ai-w3-m6-fc-1',
    category: 'Module 6: Forward propagation and backpropagation',
    title: 'The Multilayer Chain Rule',
    frontPrompt: 'How does the multivariate chain rule decompose the gradient of the loss with respect to an early hidden weight?',
    backFormula: '\\frac{\\partial \\mathcal{L}}{\\partial w^{(1)}} = \\left(\\frac{\\partial \\mathcal{L}}{\\partial a^{(2)}}\\right) \\cdot \\left(\\frac{\\partial a^{(2)}}{\\partial z^{(2)}}\\right) \\cdot \\left(\\frac{\\partial z^{(2)}}{\\partial a^{(1)}}\\right) \\cdot \\left(\\frac{\\partial a^{(1)}}{\\partial z^{(1)}}\\right) \\cdot \\left(\\frac{\\partial z^{(1)}}{\\partial w^{(1)}}\\right)',
    backExplanation: 'The total derivative equals the sequential product of local sensitivities along the computational path. If any intermediate derivative is zero (e.g. saturated sigmoid tail or dead ReLU), the entire gradient becomes zero.',
    useCase: 'Reverse automatic differentiation and gradient propagation through deep networks.',
    remark: 'Backpropagation computes these factors efficiently via reverse-mode accumulation.'
  },
  {
    id: 'ai-w3-m6-fc-2',
    category: 'Module 6: Forward propagation and backpropagation',
    title: 'Vectorized Backpropagation Error Recurrence',
    frontPrompt: 'What is the recurrence relation for the error signal delta^(l) across hidden layers in a neural network?',
    backFormula: '\\boldsymbol{\\delta}^{(l)} = \\left(\\mathbf{W}^{(l+1)}\\right)^T \\boldsymbol{\\delta}^{(l+1)} \\odot g^{(l)\\prime}\\left(\\mathbf{z}^{(l)}\\right)',
    backExplanation: 'The error sensitivity delta^(l) = dL/dz^(l) is computed by projecting downstream error signals delta^(l+1) backward through transposed weight matrix (W^(l+1))^T and gating them via elementwise Hadamard product with the local derivative g\'(z^(l)).',
    useCase: 'Core vectorized backward pass implemented in deep learning framework autograd engines.',
    remark: 'Convention: Output layer base case is delta^(L) = (dL/da^(L)) odot g\'(z^(L)).'
  },
  {
    id: 'ai-w3-m6-fc-3',
    category: 'Module 6: Forward propagation and backpropagation',
    title: 'Parameter Gradients from Error Signals',
    frontPrompt: 'How are weight and bias gradients computed from the layer error signal delta^(l) and activations a^(l-1)?',
    backFormula: '\\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{W}^{(l)}} = \\boldsymbol{\\delta}^{(l)} \\left(\\mathbf{a}^{(l-1)}\\right)^T, \\qquad \\frac{\\partial \\mathcal{L}}{\\partial \\mathbf{b}^{(l)}} = \\boldsymbol{\\delta}^{(l)}',
    backExplanation: 'The gradient of the weight matrix is the outer product of the current layer\'s error vector delta^(l) and the transposed activation vector from the previous layer. The bias gradient is directly the error vector itself.',
    useCase: 'Computing exact parameter updates for stochastic gradient descent and Adam optimizers.',
    remark: 'For mini-batch training with B samples, gradients are averaged over B outer products.'
  },
  {
    id: 'ai-w3-m6-fc-4',
    category: 'Module 6: Forward propagation and backpropagation',
    title: 'Backpropagation vs. Gradient Descent',
    frontPrompt: 'What is the precise conceptual difference between Backpropagation and Gradient Descent?',
    backFormula: '\\text{Backprop}: \\theta \\mapsto \\nabla_\\theta \\mathcal{L} \\qquad \\text{vs.} \\qquad \\text{Gradient Descent}: \\theta \\longleftarrow \\theta - \\alpha \\nabla_\\theta \\mathcal{L}',
    backExplanation: 'Backpropagation is an analytical gradient evaluation algorithm that computes partial derivatives dL/dtheta via dynamic programming. Gradient descent is an optimization rule that takes those computed derivatives and updates parameter values downhill.',
    useCase: 'Distinguishing between the derivative calculation phase and the optimization step in deep learning.',
    remark: 'They are complementary: backpropagation provides the compass; gradient descent takes the step.'
  }
];
