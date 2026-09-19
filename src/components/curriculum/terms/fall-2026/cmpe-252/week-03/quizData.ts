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
    questions: [
      {
        id: 'w3_m1_q1',
        question: 'What does the scalar bias parameter b primarily control in a perceptron?',
        options: [
          'It shifts (translates) the decision boundary without altering its orientation or slope.',
          'It counts the total number of input features in the observation.',
          'It converts the straight linear decision boundary into a non-linear polynomial curve.',
          'It scales the learning rate during stochastic gradient descent.'
        ],
        correct: 0,
        explanation: 'The weights w determine the orientation (slope) of the decision boundary, while the bias b translates (shifts) the boundary relative to the coordinate origin.'
      },
      {
        id: 'w3_m1_q2',
        question: 'Under what condition can a single-layer perceptron achieve 100% classification accuracy on a dataset?',
        options: [
          'When the dataset classes are linearly separable by a single straight hyperplane.',
          'When the dataset classes are arranged in concentric circular rings.',
          'When there are no input features provided to the model.',
          'When all input feature values are strictly positive integers.'
        ],
        correct: 0,
        explanation: 'A single perceptron computes a linear decision boundary (w^T x + b = 0). It can separate data cleanly if and only if the data is linearly separable.'
      },
      {
        id: 'w3_m1_q3',
        question: 'For binary labels y_i ∈ {-1, +1}, what mathematical condition signifies that training example (x_i, y_i) is correctly classified by the perceptron?',
        options: [
          'y_i * (w^T x_i + b) > 0',
          'y_i * (w^T x_i + b) < 0',
          'w^T x_i + b = 0',
          'y_i + w^T x_i + b = 0'
        ],
        correct: 0,
        explanation: 'When y_i = +1, the score must be positive (> 0), yielding (+1)(>0) > 0. When y_i = -1, the score must be negative (< 0), yielding (-1)(<0) > 0. Thus y_i * (w^T x_i + b) > 0 represents correct classification.'
      },
      {
        id: 'w3_m1_q4',
        question: "What is the primary architectural purpose of the 'bias trick' (homogeneous coordinates)?",
        options: [
          'It absorbs the bias b into an augmented weight vector, expressing the affine score as a single inner product: w̃^T x̃.',
          'It eliminates the need for computing parameter updates during training.',
          'It enables a single perceptron to solve the non-linear XOR problem.',
          'It forces all weights to sum to 1.'
        ],
        correct: 0,
        explanation: 'By setting x̃ = [1, x_1, ..., x_n]^T and w̃ = [b, w_1, ..., w_n]^T, the affine equation w^T x + b becomes a single unified dot product w̃^T x̃, simplifying vectorization.'
      }
    ]
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
