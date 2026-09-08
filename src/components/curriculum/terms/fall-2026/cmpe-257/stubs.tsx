/**
 * CMPE-257 Machine Learning
 * Weeks 02–16 — Placeholder stubs
 *
 * Each export is a lightweight "Under Construction" card.
 * When a week's curriculum is ready, replace its stub with a full implementation
 * imported from ./week-XX/index.tsx following the pattern of week-01.
 */
import React from 'react';
import { UnderConstructionWeek } from '../../../common';
import { Course, SyllabusModule } from '../../../../../types/course';

interface WeekProps { course?: Course; module?: SyllabusModule; }

// ── CMPE-257 syllabus topics per week (stub metadata) ───────────────────────

export const Week02ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 02" topicHint="Probabilistic Models & Naive Bayes"
    upcomingTopics={['Generative vs Discriminative', 'Naive Bayes Classifier', 'Gaussian Discriminant Analysis', 'MLE & MAP Estimation']}
  />
);

export const Week03ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 03" topicHint="Logistic Regression & Classification"
    upcomingTopics={['Sigmoid Function', 'Binary Cross-Entropy Loss', 'Softmax Regression', 'Newton-Raphson Method']}
  />
);

export const Week04ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 04" topicHint="Support Vector Machines"
    upcomingTopics={['Margin Maximization', 'Kernel Trick (RBF, Poly)', 'Soft-Margin SVM', 'SMO Algorithm']}
  />
);

export const Week05ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 05" topicHint="Neural Networks & Backpropagation"
    upcomingTopics={['Multi-Layer Perceptrons', 'Backpropagation Derivation', 'Vanishing Gradients', 'Weight Initialization']}
  />
);

export const Week06ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 06" topicHint="Decision Trees & Ensemble Methods"
    upcomingTopics={['CART & ID3 Algorithms', 'Entropy & Information Gain', 'Random Forests', 'Gradient Boosting (XGBoost)']}
  />
);

export const Week07ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 07" topicHint="K-Nearest Neighbors & Kernels"
    upcomingTopics={['kNN Classification & Regression', 'Distance Metrics', 'Curse of Dimensionality', 'Kernel Density Estimation']}
  />
);

export const Week08ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 08" topicHint="Dimensionality Reduction"
    upcomingTopics={['Principal Component Analysis (PCA)', 'SVD Decomposition', 't-SNE & UMAP', 'Linear Discriminant Analysis']}
  />
);

export const Week09ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 09" topicHint="Expectation-Maximization & GMMs"
    upcomingTopics={['EM Algorithm Derivation', 'Gaussian Mixture Models', 'Hidden Markov Models', 'Variational Inference']}
  />
);

export const Week10ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 10" topicHint="Convolutional Neural Networks"
    upcomingTopics={['Convolution Operation', 'Pooling & Stride', 'ResNet & VGG Architectures', 'Transfer Learning']}
  />
);

export const Week11ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 11" topicHint="Sequence Models & Attention"
    upcomingTopics={['RNN & LSTM Networks', 'Seq2Seq Architecture', 'Self-Attention Mechanism', 'Transformer Blocks']}
  />
);

export const Week12ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 12" topicHint="Generative Models"
    upcomingTopics={['Variational Autoencoders (VAE)', 'Generative Adversarial Networks (GAN)', 'Diffusion Models', 'Score Matching']}
  />
);

export const Week13ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 13" topicHint="Large Language Models & Fine-Tuning"
    upcomingTopics={['Pre-training Objectives', 'Instruction Tuning (RLHF)', 'LoRA & Parameter Efficient Fine-Tuning', 'Prompt Engineering']}
  />
);

export const Week14ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 14" topicHint="ML Systems & Production"
    upcomingTopics={['Feature Engineering at Scale', 'Model Monitoring', 'A/B Testing', 'ML Platform Design']}
  />
);

export const Week15ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 15" topicHint="Review & Exam Preparation"
    upcomingTopics={['Comprehensive Review', 'Algorithm Complexity Analysis', 'Practice Problems', 'Concept Synthesis']}
  />
);

export const Week16ML: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 16" topicHint="Final Project Presentations"
    upcomingTopics={['Project Demos', 'Peer Evaluation', 'Final Assessment', 'Lessons Learned']}
  />
);
