export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizSection {
  title: string;
  stepNumber: number;
  badge: string;
  sub: string;
  questions: QuizQuestion[];
}

export const AI_WEEK4_QUIZ: Record<string, QuizSection> = {
  s1: {
    title: 'Module 1: Deep learning and feature learning',
    stepNumber: 1,
    badge: 'Representations',
    sub: 'Hierarchical Abstractions & Depth Efficiency',
    questions: [
      {
        id: 'ai-w4-m1-q1',
        question: 'In traditional machine learning workflows, who or what designs the feature extraction function phi(x)?',
        options: [
          'A human domain expert or engineer crafting hand-designed descriptors',
          'The downstream classifier optimizing its decision weights',
          'The loss function via backpropagation',
          'The target output label distribution'
        ],
        correct: 0,
        explanation: 'Traditional machine learning relies on hand-crafted feature engineering (such as SIFT, HOG, or domain heuristics) designed manually by human experts before passing the fixed representations to a classifier.'
      },
      {
        id: 'ai-w4-m1-q2',
        question: 'What does a hidden-layer activation vector h^(l) represent inside a deep neural network?',
        options: [
          'A human-interpretable class name assigned by the supervisor',
          'A learned numerical response vector indicating the presence of intermediate patterns or features',
          'A static random number projection that remains frozen during training',
          'The final normalized probability distribution over classes'
        ],
        correct: 1,
        explanation: 'Hidden activations represent internal numerical feature representations learned directly from data through gradient descent, encoding patterns ranging from edges and textures to complex object parts.'
      },
      {
        id: 'ai-w4-m1-q3',
        question: 'Why are nonlinear activation functions (such as ReLU or Sigmoid) strictly essential when stacking multiple hidden layers?',
        options: [
          'They ensure all weights remain strictly positive during updates',
          'Without nonlinearities, any cascade of linear layers mathematically collapses into an equivalent single linear layer: W_2(W_1 x + b_1) + b_2 = W\'x + b\'',
          'They eliminate the need for computing parameter gradients during backpropagation',
          'They prevent the network from memorizing training data'
        ],
        correct: 1,
        explanation: 'Because matrix multiplication is associative, composing multiple linear transformations yields another affine transformation. Nonlinear activations break linearity, enabling hierarchical composition of complex decision surfaces.'
      },
      {
        id: 'ai-w4-m1-q4',
        question: 'What mechanism drives the training and feature discovery of internal hidden layers in an end-to-end deep network?',
        options: [
          'The task prediction loss propagated backward through the architecture via the multivariate chain rule (backpropagation)',
          'Independent unsupervised clustering applied separately to each layer prior to training',
          'Human operators labeling intermediate neurons with semantic attributes',
          'Random mutations in the weight tensors between training epochs'
        ],
        correct: 0,
        explanation: 'In end-to-end deep learning, the final loss error signal is backpropagated through all layers using the chain rule, adjusting all upstream weights so intermediate layers automatically discover features that minimize the task loss.'
      },
      {
        id: 'ai-w4-m1-q5',
        question: 'Which statement accurately describes the relationship between model representational capacity (expressive power) and learnability?',
        options: [
          'Expressive capacity guarantees that gradient descent will successfully find an optimal set of parameters',
          'Expressive capacity and learnability are distinct; a network may be theoretically capable of representing a function yet fail to learn it due to optimization, gradient, or data challenges',
          'Learnability depends solely on the number of parameters, independent of the loss landscape or initialization',
          'A network can only represent functions that are strictly linear or convex'
        ],
        correct: 1,
        explanation: 'The Universal Approximation Theorem proves that neural networks can approximate arbitrary continuous functions, but optimization difficulties (vanishing gradients, non-convex loss surfaces, poor initialization, or overfitting) can prevent practical training from reaching that solution.'
      }
    ]
  },
  s2: {
    title: 'Module 2: Why convolutional neural networks?',
    stepNumber: 2,
    badge: 'Spatial Invariance',
    sub: 'Parameter Efficiency & Translation Equivariance',
    questions: []
  },
  s3: {
    title: 'Module 3: CNN building blocks',
    stepNumber: 3,
    badge: 'Kernels & Pooling',
    sub: 'Padding, Stride, Receptive Fields & Spatial Math',
    questions: []
  },
  s4: {
    title: 'Module 4: Important CNN architectures',
    stepNumber: 4,
    badge: 'Architectures',
    sub: 'LeNet, AlexNet, VGG & ResNet Residual Highways',
    questions: []
  },
  s5: {
    title: 'Module 5: Transformers and self-attention',
    stepNumber: 5,
    badge: 'Attention',
    sub: 'Scaled Dot-Product Attention & QKV Projections',
    questions: []
  },
  s6: {
    title: 'Module 6: Basic recurrent neural networks',
    stepNumber: 6,
    badge: 'Recurrence',
    sub: 'Hidden State Transitions & Temporal Unfolding',
    questions: []
  },
  s7: {
    title: 'Module 7: RNN loss and training',
    stepNumber: 7,
    badge: 'BPTT',
    sub: 'Backpropagation Through Time & Gradient Stability',
    questions: []
  },
  s8: {
    title: 'Module 8: Gated Recurrent Unit (GRU)',
    stepNumber: 8,
    badge: 'GRU',
    sub: 'Update & Reset Gates for Memory Retention',
    questions: []
  },
  s9: {
    title: 'Module 9: Long Short-Term Memory (LSTM)',
    stepNumber: 9,
    badge: 'LSTM',
    sub: 'Cell State Highway, Forget, Input & Output Gates',
    questions: []
  },
  s10: {
    title: 'Module 10: Bidirectional RNNs',
    stepNumber: 10,
    badge: 'Bidirectional',
    sub: 'Dual-Directional Context & Sequence Modeling',
    questions: []
  }
};
