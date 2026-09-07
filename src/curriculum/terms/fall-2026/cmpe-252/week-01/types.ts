import React from 'react';
import {
  BrainCircuit,
  Grid,
  TrendingUp,
  Activity,
  Sliders,
  Calculator
} from 'lucide-react';

export type StepId = 1 | 2 | 3 | 4 | 5 | 6;

export interface StepMeta {
  id: StepId;
  title: string;
  badge: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const STEPS: StepMeta[] = [
  {
    id: 1,
    title: 'Foundational Concepts',
    badge: 'AI / ML / DL',
    subtitle: 'Symbolic vs Statistical AI, Learning Paradigms & Dataset Partitioning',
    icon: BrainCircuit
  },
  {
    id: 2,
    title: 'Classification Metrics',
    badge: 'Evaluation',
    subtitle: 'Confusion Matrix, Accuracy, Precision, Recall, F1-Score & Trade-offs',
    icon: Grid
  },
  {
    id: 3,
    title: 'Regression Metrics',
    badge: 'Residuals',
    subtitle: 'MSE, RMSE, MAE, R² Score & Outlier Sensitivity Analysis',
    icon: TrendingUp
  },
  {
    id: 4,
    title: 'Activation Functions',
    badge: 'Non-Linearity',
    subtitle: 'Sigmoid, ReLU, Tanh, Softmax & Vanishing / Exploding Gradients',
    icon: Activity
  },
  {
    id: 5,
    title: 'Gradient Descent',
    badge: 'Optimization',
    subtitle: 'Loss Formulation, Learning Rate, Partial Derivatives & Convergence',
    icon: Sliders
  },
  {
    id: 6,
    title: 'Neural Nets & CNN Sizing',
    badge: 'Architectures',
    subtitle: 'Artificial Neurons, Convolutions, Kernel Stride, Padding & Spatial Dimensions',
    icon: Calculator
  }
];

export const PARADIGM_QUESTIONS = [
  { q: 'Predicting continuous house prices based on square footage and location.', answer: 'Supervised (Regression)' },
  { q: 'Grouping online retail customers into 5 target market segments based on purchasing habits.', answer: 'Unsupervised (Clustering)' },
  { q: 'Training a digital agent to play Chess by giving positive points for wins and negative points for losses.', answer: 'Reinforcement Learning' },
  { q: 'Classifying incoming emails as "Spam" or "Not Spam" based on labeled training data.', answer: 'Supervised (Classification)' }
];
