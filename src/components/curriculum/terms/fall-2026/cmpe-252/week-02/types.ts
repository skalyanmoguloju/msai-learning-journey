import React from 'react';
import {
  Boxes,
  TrendingUp,
  Dices,
  Zap,
  Microscope
} from 'lucide-react';

export type StepId = 1 | 2 | 3 | 4 | 5;

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
    title: 'Linear Algebra & Matrix Factorizations',
    badge: 'Decompositions',
    subtitle: 'Matrix operations, solving Ax=b via LU Decomposition, and data compression via Singular Value Decomposition (SVD)',
    icon: Boxes
  },
  {
    id: 2,
    title: 'Multivariable Calculus & Gradients',
    badge: 'Gradients & ∇f',
    subtitle: 'Partial derivatives, gradient vectors (∇f), and how rates of change guide neural network training',
    icon: TrendingUp
  },
  {
    id: 3,
    title: 'Probabilistic Foundations',
    badge: 'Distributions',
    subtitle: 'Random variables, probability distributions (Bernoulli, Gaussian), expectation, and variance',
    icon: Dices
  },
  {
    id: 4,
    title: 'First-Order Optimization',
    badge: 'SGD & Momentum',
    subtitle: 'Gradient Descent variants: Batch (BGD), Stochastic (SGD), Momentum, NAG, Adagrad, RMSProp, and Adam',
    icon: Zap
  },
  {
    id: 5,
    title: 'Second-Order Optimization',
    badge: 'Curvature & Hessian',
    subtitle: "Advanced optimization using curvature: Newton's Method, the Hessian Matrix, BFGS/L-BFGS, and Natural Gradient Descent",
    icon: Microscope
  }
];
