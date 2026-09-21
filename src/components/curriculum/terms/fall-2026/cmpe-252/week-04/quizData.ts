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
    questions: [
      {
        id: 'ai-w4-m2-q1',
        question: 'What dictates the channel depth (C_out) of the output tensor produced by a standard 2D convolutional layer?',
        options: [
          'The number of filters (kernels) in the layer\'s filter bank',
          'The spatial height and width of the input image',
          'The pooling window size and stride',
          'The amount of zero padding P applied to the borders'
        ],
        correct: 0,
        explanation: 'Each distinct filter in the filter bank scans the multi-channel input and produces exactly one 2D feature map. Stacking these maps yields an output tensor depth equal to C_out.'
      },
      {
        id: 'ai-w4-m2-q2',
        question: 'What is the full parameter tensor shape of a single convolutional filter operating on an input with C_in channels?',
        options: [
          'H_in x W_in x C_out',
          'K_h x K_w x C_in',
          'H_out x W_out x C_in',
          'K_h x K_w x C_out'
        ],
        correct: 1,
        explanation: 'A filter spans a local spatial area (K_h x K_w) and must extend across all C_in channels of the input feature tensor.'
      },
      {
        id: 'ai-w4-m2-q3',
        question: 'What does the principle of parameter sharing (weight tying) establish in convolutional neural networks?',
        options: [
          'Every spatial pixel location maintains a unique set of trainable weights',
          'The exact same filter weights are reused across every spatial patch of the input tensor',
          'Weights are tied directly between the first convolutional layer and the final classifier',
          'Only biases are shared, while weights vary across image coordinates'
        ],
        correct: 1,
        explanation: 'Parameter sharing applies the same localized filter across the entire image grid. This enforces translation equivariance and prevents parameter explosion as image resolution increases.'
      },
      {
        id: 'ai-w4-m2-q4',
        question: 'What operation does a standard max-pooling layer perform on an input feature map?',
        options: [
          'It computes a weighted linear combination using learned backpropagated weights',
          'It selects the maximum activation value within each local spatial window',
          'It calculates the dot product between adjacent channel vectors',
          'It normalizes each feature map to zero mean and unit variance'
        ],
        correct: 1,
        explanation: 'Max pooling is a fixed, parameter-free downsampling operation that retains only the dominant activation in each local window, conferring local translation tolerance.'
      },
      {
        id: 'ai-w4-m2-q5',
        question: 'When a feature map is downsampled using a 2x2 pooling operation with stride S=2, what fraction of the spatial locations remain?',
        options: [
          'One-half (50% of the locations)',
          'One-fourth (25% of the locations)',
          'One-eighth (12.5% of the locations)',
          'The number of locations remains unchanged while channels double'
        ],
        correct: 1,
        explanation: 'Because both spatial height and width are halved (H/2 and W/2), the total spatial positions become (H/2) * (W/2) = (H * W) / 4, reducing the spatial footprint by a factor of 4 (75% reduction).'
      }
    ]
  },
  s3: {
    title: 'Module 3: Important CNN architectures',
    stepNumber: 3,
    badge: 'Architectures',
    sub: 'LeNet, AlexNet, VGG, ResNet Residual Highways & MobileNet',
    questions: [
      {
        id: 'ai-w4-m3-q1',
        question: 'In LeNet-5, what does the value 400 represent after flattening the S4 pooling layer output (5×5×16)?',
        options: [
          'The original number of raw input pixels',
          'The learned feature activations entering the first fully connected dense layer',
          'The total number of filters in the entire network',
          'The number of output digit classification classes'
        ],
        correct: 1,
        explanation: 'The 400 scalar values come directly from flattening the final pooling feature maps (5 * 5 * 16 = 400), serving as the learned spatial representation fed to the dense classifier.'
      },
      {
        id: 'ai-w4-m3-q2',
        question: 'What is the primary architectural purpose of a residual shortcut (skip connection) in ResNet?',
        options: [
          'To provide an identity pathway allowing representations and gradients to flow unimpeded without attenuation',
          'To eliminate all non-linear activation functions from the network',
          'To constrain all intermediate feature maps to a 1x1 spatial resolution',
          'To convert convolutional operations into dense matrix multiplications'
        ],
        correct: 0,
        explanation: 'Residual connections establish an identity highway y = F(x) + x. In the backward pass, dy/dx = dF/dx + 1, ensuring gradients can travel directly through the identity term (+1) even through hundreds of layers.'
      },
      {
        id: 'ai-w4-m3-q3',
        question: 'What dimension constraint must strictly hold before performing the elementwise residual addition y = F(x) + x?',
        options: [
          'The tensor shapes of F(x) and x must be strictly identical across height, width, and channels',
          'The input x must have double the spatial resolution of F(x)',
          'The shortcut tensor must be all zeros prior to addition',
          'F(x) must be a 1D vector while x is a 2D matrix'
        ],
        correct: 0,
        explanation: 'Because tensor addition is elementwise, F(x) and x must match in dimensions. When spatial downsampling or channel expansion occurs, a 1x1 projection shortcut S(x) is applied so that y = F(x) + S(x).'
      },
      {
        id: 'ai-w4-m3-q4',
        question: 'What is the primary role of a pointwise (1×1) convolution in modern architectures like MobileNet and Inception?',
        options: [
          'To mix, project, and linearly combine channels at each spatial pixel location without spatial filtering',
          'To filter a 3x3 local neighborhood across the image grid',
          'To downsample spatial resolution via max-pooling',
          'To normalize tensor activations across batch instances'
        ],
        correct: 0,
        explanation: 'A 1x1 convolution has a spatial receptive field of 1x1, meaning it computes a linear combination across all channels at each specific coordinate, allowing channel expansion or reduction independently of spatial filtering.'
      },
      {
        id: 'ai-w4-m3-q5',
        question: 'In MobileNet models, what effect does the width multiplier alpha (0 < alpha <= 1) have on the network architecture?',
        options: [
          'It uniformly scales the number of channels across all layers, reducing parameters and computation quadratically by alpha^2',
          'It scales the input image height and width resolution',
          'It controls the learning rate decay schedule during training',
          'It specifies the spatial kernel size for depthwise convolutions'
        ],
        correct: 0,
        explanation: 'The width multiplier alpha thins the channel dimension of each layer (C_in\' = alpha * C_in, C_out\' = alpha * C_out). Since convolution computation scales with C_in * C_out, both parameters and FLOPs scale approximately by alpha^2.'
      }
    ]
  },
  s4: {
    title: 'Module 4: Transformers and self-attention',
    stepNumber: 4,
    badge: 'Attention',
    sub: 'Scaled Dot-Product Attention & QKV Projections',
    questions: []
  },
  s5: {
    title: 'Module 5: Basic recurrent neural networks',
    stepNumber: 5,
    badge: 'Recurrence',
    sub: 'Hidden State Transitions & Temporal Unfolding',
    questions: []
  },
  s6: {
    title: 'Module 6: RNN loss and training',
    stepNumber: 6,
    badge: 'BPTT',
    sub: 'Backpropagation Through Time & Gradient Stability',
    questions: []
  },
  s7: {
    title: 'Module 7: Gated Recurrent Unit (GRU)',
    stepNumber: 7,
    badge: 'GRU',
    sub: 'Update & Reset Gates for Memory Retention',
    questions: []
  },
  s8: {
    title: 'Module 8: Long Short-Term Memory (LSTM)',
    stepNumber: 8,
    badge: 'LSTM',
    sub: 'Cell State Highway, Forget, Input & Output Gates',
    questions: []
  },
  s9: {
    title: 'Module 9: Bidirectional RNNs',
    stepNumber: 9,
    badge: 'Bidirectional',
    sub: 'Dual-Directional Context & Sequence Modeling',
    questions: []
  }
};
