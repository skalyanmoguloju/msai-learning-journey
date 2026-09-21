import { UniversalFlashcard } from '../../../../common';

export const AI_WEEK4_FLASHCARDS: UniversalFlashcard[] = [
  {
    id: 'ai-w4-m1-fc-1',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Raw Input Tensor (x)',
    frontPrompt: 'How is raw visual input represented mathematically for neural networks, and why is it challenging?',
    backFormula: 'x \\in \\mathbb{R}^{H \\times W \\times C}',
    backExplanation: 'Visual input is an unorganized numerical tensor of pixel intensity values across height (H), width (W), and color channels (C=3 for RGB). The computer receives raw numbers without human semantic labels.',
    useCase: 'Initial state of computer vision pipelines before any feature extraction or spatial convolution.',
    remark: 'A high-resolution image (e.g. 224x224x3) yields 150,528 raw input dimensions with massive pixel redundancy and sensitivity to illumination.'
  },
  {
    id: 'ai-w4-m1-fc-2',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Feature & Numerical Activation',
    frontPrompt: 'What is a feature in a deep neural network, and how is it represented?',
    backFormula: 'h^{(l)} = g(a^{(l)}) = g(W^{(l)}h^{(l-1)} + b^{(l)})',
    backExplanation: 'A feature is a measurable numerical activation of a neuron indicating the degree of presence of a specific learned pattern (such as an edge, texture, or semantic part).',
    useCase: 'Intermediate representations throughout hidden layers of deep networks.',
    remark: 'Individual neurons do not necessarily correlate to single human words; they often capture entangled combinations of visual cues.'
  },
  {
    id: 'ai-w4-m1-fc-3',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Handcrafted Feature Extractor Limitation',
    frontPrompt: 'What is the primary architectural drawback of the traditional machine learning pipeline?',
    backFormula: 'x \\xrightarrow{\\text{fixed } \\phi} r = \\phi(x) \\xrightarrow{w^T r + b} \\hat{y}',
    backExplanation: 'In traditional ML, the feature extractor phi(x) is manually designed by humans and frozen during training. The downstream classifier cannot recover or optimize for information that phi discarded.',
    useCase: 'Classical computer vision pipelines utilizing SIFT, HOG, or SURF descriptors coupled to SVMs.',
    remark: 'Deep learning replaces fixed phi(x) with end-to-end differentiable layers optimized jointly with the classifier.'
  },
  {
    id: 'ai-w4-m1-fc-4',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Hidden Layer Transformation',
    frontPrompt: 'What mathematical operation defines the transformation performed by a standard feedforward hidden layer?',
    backFormula: 'h^{(l)} = g^{(l)}\\left(W^{(l)}h^{(l-1)} + b^{(l)}\\right)',
    backExplanation: 'A hidden layer computes an affine projection of the preceding layer activations (W h + b) followed by an elementwise nonlinear activation function g (such as ReLU or GELU).',
    useCase: 'Foundational computation block of multi-layer perceptrons (MLPs) and feedforward sublayers.',
    remark: 'Setting h^{(0)} = x anchors the recurrence at the raw input.'
  },
  {
    id: 'ai-w4-m1-fc-5',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Representation & Embedding Vector',
    frontPrompt: 'What is an embedding or latent representation vector in deep learning?',
    backFormula: 'z = h^{(L-1)} \\in \\mathbb{R}^{d}',
    backExplanation: 'An embedding is a dense, continuous vector representation extracted from a deep hidden layer (typically the penultimate layer) that captures the high-level semantic essence of the input.',
    useCase: 'Metric learning, semantic similarity search, transfer learning, and feature visualization (e.g. t-SNE / UMAP).',
    remark: 'Inputs belonging to similar semantic classes cluster close together in the embedding space.'
  },
  {
    id: 'ai-w4-m1-fc-6',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Logit (z)',
    frontPrompt: 'What is a logit in classification networks, and how does it relate to probabilities?',
    backFormula: 'z = w^T h + b, \\quad \\hat{p} = \\sigma(z) = \\frac{1}{1 + e^{-z}}',
    backExplanation: 'A logit is the unbounded raw real-valued score output by the final linear layer prior to applying a normalization or probability mapping like Sigmoid (binary) or Softmax (multiclass).',
    useCase: 'Numerically stable cross-entropy loss computation with LogSumExp.',
    remark: 'z > 0 implies p > 0.5; z = 0 implies maximum uncertainty (p = 0.5); z < 0 implies p < 0.5.'
  },
  {
    id: 'ai-w4-m1-fc-7',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Composition of Linear Layers (Collapse)',
    frontPrompt: 'Why does stacking multiple purely linear layers fail to increase representational capacity?',
    backFormula: 'W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2) = W\'x + b\'',
    backExplanation: 'The composition of any number of affine transformations is strictly another affine transformation. Without nonlinear activation functions, deep networks collapse into a single shallow linear model.',
    useCase: 'Theoretical justification for activation functions (ReLU, Sigmoid, Tanh).',
    remark: 'Nonlinearities curve and partition the space, enabling the network to learn non-convex decision boundaries.'
  },
  {
    id: 'ai-w4-m1-fc-8',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Binary Cross-Entropy & Output Error',
    frontPrompt: 'What is the output gradient of binary cross-entropy loss with respect to the pre-activation logit z?',
    backFormula: '\\frac{\\partial L}{\\partial z} = \\hat{p} - y, \\quad L = -[y\\ln \\hat{p} + (1-y)\\ln(1-\\hat{p})]',
    backExplanation: 'The derivative of the combined Sigmoid and BCE loss neatly reduces to the prediction residual (predicted probability minus the true binary ground truth y).',
    useCase: 'Calculating the starting gradient for backpropagation in binary classification networks.',
    remark: 'When p_hat = y, error is 0. If y=1 and p_hat=0.1, the error is -0.9, exerting a strong gradient push to increase weights.'
  },
  {
    id: 'ai-w4-m1-fc-9',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Backpropagation Parameter Gradient',
    frontPrompt: 'How does backpropagation compute the parameter update for a weight connecting hidden neuron j to output logit z?',
    backFormula: '\\frac{\\partial L}{\\partial w_j} = \\frac{\\partial L}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_j} = (\\hat{p} - y) h_j',
    backExplanation: 'By the multivariate chain rule, the gradient is the product of the incoming output error delta and the upstream activation h_j from the hidden layer.',
    useCase: 'Gradient descent weight update: w_new = w_old - eta * grad.',
    remark: 'The error signal propagates backward layer-by-layer to update all upstream feature extractors simultaneously.'
  },
  {
    id: 'ai-w4-m1-fc-10',
    category: 'Module 1: Deep learning and feature learning',
    title: 'Expressivity vs. Learnability',
    frontPrompt: 'What is the fundamental difference between representational expressivity and learnability?',
    backFormula: '\\text{Expressive Capacity} \\neq \\text{Optimization Trajectory}',
    backExplanation: 'A network architecture may possess the mathematical capacity to approximate any continuous function (Universal Approximation Theorem), yet fail to learn it in practice due to poor optimization, vanishing/exploding gradients, inadequate data, bad initialization, or non-convex loss surfaces.',
    useCase: 'Debugging neural network training failures and architectural selection.',
    remark: 'Expressivity asks "Does a solution exist in the hypothesis space?", whereas learnability asks "Can gradient descent find it with finite data and compute?".'
  }
];

