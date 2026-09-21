import React from 'react';
import {
  Sparkles,
  Eye,
  Cpu,
  Zap,
  RotateCcw,
  TrendingDown,
  GitBranch,
  Repeat,
  ArrowLeftRight
} from 'lucide-react';

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
    title: 'Deep learning and feature learning',
    badge: 'Representations',
    subtitle: 'Hierarchical abstractions, automated feature engineering, and depth efficiency',
    icon: Sparkles
  },
  {
    id: 2,
    title: 'Why convolutional neural networks?',
    badge: 'Spatial Invariance',
    subtitle: 'Parameter explosion in MLPs, translation equivariance, and local receptive fields',
    icon: Eye
  },
  {
    id: 3,
    title: 'Important CNN architectures',
    badge: 'Model Evolution',
    subtitle: 'LeNet, AlexNet, VGG, GoogLeNet/Inception, and ResNet skip connections',
    icon: Cpu
  },
  {
    id: 4,
    title: 'Transformers and self-attention',
    badge: 'Attention Mechanism',
    subtitle: 'Scaled dot-product attention, multi-head projection, and sequence-to-sequence modeling',
    icon: Zap
  },
  {
    id: 5,
    title: 'Basic recurrent neural networks',
    badge: 'Sequential Memory',
    subtitle: 'Recurrent transitions, hidden state propagation, and unfolding across time',
    icon: RotateCcw
  },
  {
    id: 6,
    title: 'RNN loss and training',
    badge: 'BPTT Optimization',
    subtitle: 'Backpropagation Through Time (BPTT), exploding gradients, and vanishing signals',
    icon: TrendingDown
  },
  {
    id: 7,
    title: 'Gated Recurrent Unit (GRU)',
    badge: 'Gated Control',
    subtitle: 'Update gates, reset gates, and parameter-efficient memory preservation',
    icon: GitBranch
  },
  {
    id: 8,
    title: 'Long Short-Term Memory (LSTM)',
    badge: 'Cell State',
    subtitle: 'Forget, input, and output gates, cell state highways, and additive gradient flow',
    icon: Repeat
  },
  {
    id: 9,
    title: 'Bidirectional RNNs',
    badge: 'Bidirectional Context',
    subtitle: 'Forward and backward temporal representations, concatenation, and sequence tagging',
    icon: ArrowLeftRight
  }
];
