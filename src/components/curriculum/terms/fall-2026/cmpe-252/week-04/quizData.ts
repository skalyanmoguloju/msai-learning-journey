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
    questions: []
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
