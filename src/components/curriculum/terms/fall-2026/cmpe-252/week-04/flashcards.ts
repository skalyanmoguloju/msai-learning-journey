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
  },
  {
    id: 'ai-w4-m2-fc-1',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Tensor Channel Depth (C)',
    frontPrompt: 'What does a channel represent in an image or intermediate feature tensor?',
    backFormula: 'X \\in \\mathbb{R}^{H \\times W \\times C}',
    backExplanation: 'A channel is one 2D spatial slice of a tensor. In input data, channels correspond to color components (such as Red, Green, Blue). In intermediate layers, each channel is a feature map representing the spatial activations of one learned filter.',
    useCase: 'Tensor indexing and filter dimension specifications in CNN forward passes.',
    remark: 'Convolutions aggregate across all C_in input channels to produce each output channel.'
  },
  {
    id: 'ai-w4-m2-fc-2',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Convolutional Filter / Kernel',
    frontPrompt: 'What is a convolutional filter, and what are its dimensions relative to the input tensor?',
    backFormula: 'K \\in \\mathbb{R}^{K_h \\times K_w \\times C_{\\text{in}}}',
    backExplanation: 'A filter (or kernel) is a small, 3D block of trainable weights that scans local spatial neighborhoods. It has spatial dimensions K_h x K_w and matches the exact channel depth C_in of the input.',
    useCase: 'Feature extraction via discrete cross-correlation in convolutional layers.',
    remark: 'A layer with C_out filters comprises a 4D weight tensor: K_h x K_w x C_in x C_out.'
  },
  {
    id: 'ai-w4-m2-fc-3',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Feature Map (Activation Map)',
    frontPrompt: 'What is a feature map, and how is it generated by a convolutional layer?',
    backFormula: 'Z_{r, c} = \\sum_{u=1}^{K_h} \\sum_{v=1}^{K_w} \\sum_{d=1}^{C_{\\text{in}}} K_{u,v,d} X_{r+u-1, c+v-1, d} + b',
    backExplanation: 'A feature map is a 2D spatial grid of scalar activations produced by convolving a single filter across every sliding window position of the input tensor.',
    useCase: 'Visualizing intermediate representations (e.g. edge maps, texture maps) in CNNs.',
    remark: 'C_out filters produce C_out distinct 2D feature maps stacked along the channel axis.'
  },
  {
    id: 'ai-w4-m2-fc-4',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Local Connectivity & Receptive Field',
    frontPrompt: 'How does local connectivity contrast with fully connected layers, and what is a receptive field?',
    backFormula: '\\text{Local Connections: } K_h \\times K_w \\times C_{\\text{in}} \\ll H_{\\text{in}} \\times W_{\\text{in}} \\times C_{\\text{in}}',
    backExplanation: 'Instead of connecting each neuron to all input pixels, local connectivity restricts connections to a small spatial patch (receptive field). This reflects the physical prior that adjacent pixels have high mutual information.',
    useCase: 'Drastically reducing parameter footprint while respecting spatial 2D image topology.',
    remark: 'Stacking successive layers causes the effective receptive field to expand hierarchically.'
  },
  {
    id: 'ai-w4-m2-fc-5',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Parameter Sharing (Weight Tying)',
    frontPrompt: 'What is parameter sharing in CNNs, and what key symmetry does it introduce?',
    backFormula: 'K(x, y) = \\text{const } \\forall \\text{ spatial positions } (r, c)',
    backExplanation: 'The exact same set of filter weights is reused across every spatial location of the input. This introduces translation equivariance: if a visual feature moves in the input, its activation moves identically in the feature map.',
    useCase: 'Preventing parameter explosion and enabling location-invariant pattern detection.',
    remark: 'A 3x3 filter has only 9 weights per channel regardless of whether the image is 32x32 or 4K resolution.'
  },
  {
    id: 'ai-w4-m2-fc-6',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Spatial Dimension Formula (Padding & Stride)',
    frontPrompt: 'What formula computes the output spatial dimensions (H_out, W_out) given input size, filter size, padding P, and stride S?',
    backFormula: 'H_{\\text{out}} = \\left\\lfloor \\frac{H_{\\text{in}} + 2P - K_h}{S} \\right\\rfloor + 1, \\quad W_{\\text{out}} = \\left\\lfloor \\frac{W_{\\text{in}} + 2P - K_w}{S} \\right\\rfloor + 1',
    backExplanation: 'Padding P adds zero-borders to preserve boundary resolution, while stride S dictates the step size between filter applications. The floor function accounts for non-divisible window steps.',
    useCase: 'Dimension tracking and tensor shape matching across deep CNN backbones.',
    remark: 'For "Same" convolution with stride 1 and odd kernel size K: P = (K - 1) / 2 preserves spatial dimensions.'
  },
  {
    id: 'ai-w4-m2-fc-7',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Convolutional Layer Parameter Count',
    frontPrompt: 'How do you calculate the total number of trainable parameters in a standard 2D convolutional layer?',
    backFormula: '\\text{Parameters} = (K_h \\times K_w \\times C_{\\text{in}} + 1) \\times C_{\\text{out}}',
    backExplanation: 'Each of the C_out filters contains K_h * K_w * C_in weights plus 1 scalar bias. Crucially, this count is completely independent of the input spatial resolution H_in x W_in.',
    useCase: 'Model sizing, memory budgeting, and parameter comparison against fully connected layers.',
    remark: 'Contrast with a fully connected layer: (H_in * W_in * C_in + 1) * N parameters.'
  },
  {
    id: 'ai-w4-m2-fc-8',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'FLOPs & Multiply-Accumulate Operations (MACs)',
    frontPrompt: 'How many multiply-accumulate operations (MACs) are required for a convolutional layer forward pass?',
    backFormula: '\\text{MACs} = H_{\\text{out}} \\times W_{\\text{out}} \\times C_{\\text{out}} \\times (K_h \\times K_w \\times C_{\\text{in}})',
    backExplanation: 'For every output activation in the H_out x W_out x C_out tensor, the network computes a dot product over a K_h x K_w x C_in volume, requiring that many multiplications and additions.',
    useCase: 'Hardware latency estimation, mobile deployment profiling, and compute budgeting.',
    remark: 'FLOPs is approximately 2 * MACs (one multiply and one accumulate per weight).'
  },
  {
    id: 'ai-w4-m2-fc-9',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Spatial Pooling (Max / Average)',
    frontPrompt: 'What is pooling, and how does standard 2x2 pooling with stride 2 affect spatial and channel dimensions?',
    backFormula: '(H \\times W \\times C) \\xrightarrow{2 \\times 2 \\text{ pool, } S=2} \\left(\\frac{H}{2} \\times \\frac{W}{2} \\times C\\right)',
    backExplanation: 'Pooling applies a fixed non-linear summary (such as max or average) over local windows without trainable parameters. It reduces spatial area by 75% (factor of 4) while leaving channel depth C unchanged.',
    useCase: 'Downsampling feature maps, reducing computation in deeper layers, and conferring local translation invariance.',
    remark: 'Max pooling preserves the strongest feature activation regardless of small spatial jitter.'
  },
  {
    id: 'ai-w4-m2-fc-10',
    category: 'Module 2: Why convolutional neural networks?',
    title: 'Canonical CNN Layer Pipeline',
    frontPrompt: 'What is the standard sequence of operations in a convolutional processing block?',
    backFormula: 'x \\xrightarrow{\\text{Conv}} \\text{Linear Feature Maps} \\xrightarrow{\\text{ReLU}} \\text{Nonlinear Maps} \\xrightarrow{\\text{Pool}} \\text{Downsampled Maps}',
    backExplanation: 'A standard CNN block cascades convolution (linear pattern matching and cross-channel mixing), ReLU (elementwise non-linear thresholding), and pooling (spatial summarization and downsampling).',
    useCase: 'Backbone architecture of VGG, AlexNet, and classical convolutional networks.',
    remark: 'Modern architectures frequently replace pooling with strided convolutions and insert Batch Normalization.'
  },
  {
    id: 'ai-w4-m3-fc-1',
    category: 'Module 3: Important CNN architectures',
    title: 'Network Architecture & Design Patterns',
    frontPrompt: 'What is a neural network architecture, and what trade-offs govern its design?',
    backFormula: '\\hat{y} = f_L \\circ f_{L-1} \\circ \\dots \\circ f_1(x)',
    backExplanation: 'An architecture defines the topological arrangement of operations (convolutions, activations, residual highways, downsamplers) balancing representation capacity, parameter efficiency, latency, and gradient trainability.',
    useCase: 'Selecting models tailored for cloud inference (e.g. ResNet/VGG) vs edge deployment (e.g. MobileNet).',
    remark: 'Modern designs favor modular, repeating block motifs over ad-hoc layer configurations.'
  },
  {
    id: 'ai-w4-m3-fc-2',
    category: 'Module 3: Important CNN architectures',
    title: 'Residual Function F(x)',
    frontPrompt: 'In a ResNet residual block, what is the mathematical definition and role of the residual function F(x)?',
    backFormula: 'F(x) = \\mathcal{H}(x) - x \\implies y = F(x) + x',
    backExplanation: 'Rather than forcing stacked layers to fit the full underlying mapping H(x), ResNet trains layers to fit a residual mapping F(x). If an identity mapping is optimal, weights can easily be driven toward zero.',
    useCase: 'Enabling stable optimization of ultra-deep networks (50, 101, 152+ layers).',
    remark: 'Residual learning avoids the degradation problem where deeper un-shunted networks exhibit higher training error.'
  },
  {
    id: 'ai-w4-m3-fc-3',
    category: 'Module 3: Important CNN architectures',
    title: 'Residual Skip Connection Gradient Highway',
    frontPrompt: 'Why does adding a skip connection y = F(x) + x prevent the vanishing gradient problem in deep networks?',
    backFormula: '\\frac{\\partial y}{\\partial x} = \\frac{\\partial F(x)}{\\partial x} + I',
    backExplanation: 'The derivative contains an additive identity term (+I) that allows gradient signals from higher layers to propagate backward directly to early layers without being repeatedly attenuated by matrix multiplications.',
    useCase: 'Training networks exceeding 1,000 layers without optimization stagnation.',
    remark: 'Even if the Jacobian dF/dx is small or unstable, the +I term guarantees clean gradient flow.'
  },
  {
    id: 'ai-w4-m3-fc-4',
    category: 'Module 3: Important CNN architectures',
    title: 'Projection Shortcut S(x)',
    frontPrompt: 'When is a projection shortcut required in a residual network, and how is it implemented?',
    backFormula: 'y = F(x) + S(x), \\quad S(x) = W_s x \\text{ with } 1 \\times 1 \\text{ conv, stride } S',
    backExplanation: 'When a residual block performs spatial downsampling (stride > 1) or expands channel depth (C_out > C_in), x and F(x) cannot be added directly. A 1x1 convolution with matching stride aligns their dimensions.',
    useCase: 'Transition blocks between ResNet stages (e.g. ResNet-50 conv3_1, conv4_1, conv5_1).',
    remark: 'Identity shortcuts are used when shapes match; projection shortcuts are used only when shapes change.'
  },
  {
    id: 'ai-w4-m3-fc-5',
    category: 'Module 3: Important CNN architectures',
    title: 'Small Convolutions Principle (VGG Stack)',
    frontPrompt: 'Why is stacking two 3x3 convolutions superior to using a single 5x5 convolution?',
    backFormula: '2 \\times (3 \\times 3) = 18 \\text{ weights} < 1 \\times (5 \\times 5) = 25 \\text{ weights}',
    backExplanation: 'Two stacked 3x3 convolutions have the exact same effective receptive field (5x5) as a single 5x5 convolution, but require 28% fewer parameters and incorporate two non-linear activations instead of one, increasing discriminative capacity.',
    useCase: 'Architectural design principle established by VGG and adopted by all modern vision backbones.',
    remark: 'Three stacked 3x3 convolutions cover a 7x7 receptive field with 27 weights vs 49 weights (45% reduction).'
  },
  {
    id: 'ai-w4-m3-fc-6',
    category: 'Module 3: Important CNN architectures',
    title: 'Depthwise Convolution',
    frontPrompt: 'How does depthwise convolution differ from standard 2D convolution?',
    backFormula: '\\text{Weights}_{\\text{DW}} = K^2 \\times C_{\\text{in}} \\quad (\\text{vs. } K^2 \\times C_{\\text{in}} \\times C_{\\text{out}})',
    backExplanation: 'Depthwise convolution applies a single spatial filter per input channel independently without performing any cross-channel summation. It performs spatial feature extraction while keeping channels segregated.',
    useCase: 'MobileNet, Xception, and EfficientNet lightweight mobile backbones.',
    remark: 'Depthwise convolution alone cannot capture cross-channel interactions; it must be paired with pointwise convolution.'
  },
  {
    id: 'ai-w4-m3-fc-7',
    category: 'Module 3: Important CNN architectures',
    title: 'Pointwise (1x1) Convolution',
    frontPrompt: 'What is a pointwise convolution, and how does it complement depthwise convolution?',
    backFormula: '\\text{Weights}_{\\text{PW}} = 1 \\times 1 \\times C_{\\text{in}} \\times C_{\\text{out}} = C_{\\text{in}} \\times C_{\\text{out}}',
    backExplanation: 'Pointwise convolution is a 1x1 filter that computes linear combinations across all channels at each individual spatial pixel, handling channel projection and mixing with zero spatial receptive field.',
    useCase: 'Second phase of depthwise-separable convolution, Bottleneck blocks, and Inception dimensionality reduction.',
    remark: 'Depthwise (spatial) + Pointwise (channel) factorizes standard convolution into two decoupled steps.'
  },
  {
    id: 'ai-w4-m3-fc-8',
    category: 'Module 3: Important CNN architectures',
    title: 'Depthwise-Separable Efficiency Ratio',
    frontPrompt: 'What is the theoretical parameter and computation reduction ratio of depthwise-separable convolution compared to standard convolution?',
    backFormula: '\\frac{K^2 C_{\\text{in}} + C_{\\text{in}} C_{\\text{out}}}{K^2 C_{\\text{in}} C_{\\text{out}}} = \\frac{1}{C_{\\text{out}}} + \\frac{1}{K^2}',
    backExplanation: 'For a 3x3 kernel (K=3) and typical channel depth (e.g. C_out >= 64), the computational cost drops to approximately 1/9 to 1/8 of standard convolution (an 88-90% reduction in FLOPs and parameters).',
    useCase: 'Designing real-time computer vision models on mobile devices and edge microcontrollers.',
    remark: 'Enables AlexNet/VGG-level accuracy at a fraction of the compute and memory footprint.'
  },
  {
    id: 'ai-w4-m3-fc-9',
    category: 'Module 3: Important CNN architectures',
    title: 'MobileNet Multipliers (Width alpha and Resolution rho)',
    frontPrompt: 'How do the width multiplier (alpha) and resolution multiplier (rho) scale model complexity?',
    backFormula: 'C\' = \\alpha C, \\quad (H\', W\') = (\\rho H, \\rho W), \\quad \\text{Cost} \\propto \\alpha^2 \\rho^2',
    backExplanation: 'Width multiplier alpha thins channel depth, while resolution multiplier rho scales spatial input size. Because parameters scale with alpha^2 and MACs scale with alpha^2 * rho^2, practitioners can seamlessly trade off latency and accuracy.',
    useCase: 'Generating a scalable family of models from a single architecture (e.g., MobileNet 0.5x 160).',
    remark: 'Typically alpha in (0, 1] and rho in (0, 1].'
  },
  {
    id: 'ai-w4-m3-fc-10',
    category: 'Module 3: Important CNN architectures',
    title: 'Fully Convolutional Networks (FCN) & Semantic Segmentation',
    frontPrompt: 'How does a Fully Convolutional Network convert an image classifier into a dense per-pixel segmentation engine?',
    backFormula: 'X \\in \\mathbb{R}^{H \\times W \\times 3} \\xrightarrow{\\text{All Conv/Deconv}} Y \\in \\mathbb{R}^{H \\times W \\times K}',
    backExplanation: 'FCN replaces dense fully connected layers with 1x1 convolutions and incorporates upsampling/transposed convolutions. Instead of a single class vector, it outputs an H x W x K tensor providing K class logits for every individual pixel.',
    useCase: 'Autonomous driving road segmentation, medical image lesion segmentation, and scene parsing.',
    remark: 'Skip connections from early high-resolution layers recover fine spatial boundaries lost in pooling.'
  }
];

