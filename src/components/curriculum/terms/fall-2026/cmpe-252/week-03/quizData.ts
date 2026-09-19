export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModule {
  title: string;
  stepNumber: number;
  badge: string;
  sub: string;
  questions: QuestionItem[];
}

export const AI_WEEK3_QUIZ: Record<string, QuizModule> = {
  s1: {
    title: 'Module 1: Perceptrons and linear classifiers',
    stepNumber: 1,
    badge: 'Classifiers',
    sub: 'Artificial Neurons & Linear Separability',
    questions: []
  },
  s2: {
    title: 'Module 2: Perceptron training',
    stepNumber: 2,
    badge: 'Learning Rule',
    sub: 'Rosenblatt Convergence & Update Rules',
    questions: []
  },
  s3: {
    title: 'Module 3: From perceptrons to neural networks',
    stepNumber: 3,
    badge: 'Architectures',
    sub: 'MLPs & Non-linear Decision Boundaries',
    questions: []
  },
  s4: {
    title: 'Module 4: Activation functions',
    stepNumber: 4,
    badge: 'Non-Linearity',
    sub: 'Sigmoid, Tanh, ReLU & Softmax',
    questions: []
  },
  s5: {
    title: 'Module 5: Training a multilayer neural network',
    stepNumber: 5,
    badge: 'Optimization',
    sub: 'Loss Functions & Optimization Landscapes',
    questions: []
  },
  s6: {
    title: 'Module 6: Forward propagation and backpropagation',
    stepNumber: 6,
    badge: 'Gradients',
    sub: 'Chain Rule & Error Propagation',
    questions: []
  },
  s7: {
    title: 'Module 7: Universal approximation',
    stepNumber: 7,
    badge: 'Theorem',
    sub: 'Expressive Capacity of Neural Networks',
    questions: []
  },
  s8: {
    title: 'Module 8: Weight initialization',
    stepNumber: 8,
    badge: 'Initialization',
    sub: 'Xavier & He Normal/Uniform Methods',
    questions: []
  },
  s9: {
    title: 'Module 9: Monitoring neural-network training',
    stepNumber: 9,
    badge: 'Diagnostics',
    sub: 'Learning Curves, Generalization & Early Stopping',
    questions: []
  },
  s10: {
    title: 'Module 10: Learning settings beyond ordinary supervised learning',
    stepNumber: 10,
    badge: 'Paradigms',
    sub: 'Self-Supervised & Semi-Supervised Learning',
    questions: []
  },
  s11: {
    title: 'Module 11: Few-shot and transfer learning',
    stepNumber: 11,
    badge: 'Transfer',
    sub: 'Domain Adaptation & Fine-Tuning',
    questions: []
  },
  s12: {
    title: 'Module 12: Contrastive learning and SimCLR',
    stepNumber: 12,
    badge: 'Self-Supervised',
    sub: 'InfoNCE Loss & Visual Representation Learning',
    questions: []
  }
};
