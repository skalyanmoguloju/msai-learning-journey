import React from 'react';
import {
  Cpu,
  Sliders,
  Network,
  Activity,
  TrendingUp,
  GitBranch,
  ShieldCheck,
  Wrench,
  BarChart2,
  Layers,
  Zap,
  RefreshCw
} from 'lucide-react';

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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
    title: 'Perceptrons and linear classifiers',
    badge: 'Classifiers',
    subtitle: 'Biological inspiration, artificial neurons, hyperplanes, and linear separability',
    icon: Cpu
  },
  {
    id: 2,
    title: 'Perceptron training',
    badge: 'Learning Rule',
    subtitle: 'The Rosenblatt perceptron update rule, convergence theorem, and decision boundaries',
    icon: Sliders
  },
  {
    id: 3,
    title: 'From perceptrons to neural networks',
    badge: 'Architectures',
    subtitle: 'Overcoming the XOR problem, stacking layers, hidden units, and multilayer perceptrons (MLPs)',
    icon: Network
  },
  {
    id: 4,
    title: 'Activation functions',
    badge: 'Non-Linearity',
    subtitle: 'Sigmoid, Tanh, ReLU, Leaky ReLU, Softmax, and vanishing gradient dynamics',
    icon: Activity
  },
  {
    id: 5,
    title: 'Training a multilayer neural network',
    badge: 'Optimization',
    subtitle: 'Loss formulations, gradient descent on non-convex surfaces, and learning schedules',
    icon: TrendingUp
  },
  {
    id: 6,
    title: 'Forward propagation and backpropagation',
    badge: 'Gradients',
    subtitle: 'Computational graphs, chain rule across layers, and backward delta derivations',
    icon: GitBranch
  },
  {
    id: 7,
    title: 'Universal approximation',
    badge: 'Theorem',
    subtitle: 'Cybenko & Hornik theorems: representational capacity of feedforward networks',
    icon: ShieldCheck
  },
  {
    id: 8,
    title: 'Weight initialization',
    badge: 'Initialization',
    subtitle: 'Symmetry breaking, Xavier/Glorot initialization, He/Kaiming initialization',
    icon: Wrench
  },
  {
    id: 9,
    title: 'Monitoring neural-network training',
    badge: 'Diagnostics',
    subtitle: 'Loss curves, overfitting, underfitting, early stopping, and gradient explosion/decay checks',
    icon: BarChart2
  },
  {
    id: 10,
    title: 'Learning settings beyond ordinary supervised learning',
    badge: 'Paradigms',
    subtitle: 'Self-supervised, semi-supervised, unsupervised pre-training, and weak supervision',
    icon: Layers
  },
  {
    id: 11,
    title: 'Few-shot and transfer learning',
    badge: 'Transfer',
    subtitle: 'Fine-tuning, feature extraction, domain adaptation, and meta-learning principles',
    icon: Zap
  },
  {
    id: 12,
    title: 'Contrastive learning and SimCLR',
    badge: 'Self-Supervised',
    subtitle: 'Data augmentations, InfoNCE loss, projection heads, and representation learning',
    icon: RefreshCw
  }
];
