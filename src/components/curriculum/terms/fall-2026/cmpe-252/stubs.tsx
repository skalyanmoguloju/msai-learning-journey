/**
 * CMPE-252 Artificial Intelligence & Data Engineering
 * Weeks 02–16 — Placeholder stubs
 *
 * Each export is a lightweight "Under Construction" card.
 * When a week's curriculum is ready, replace its stub here with a full implementation
 * imported from ./week-XX/index.tsx following the pattern of week-01.
 */
import React from 'react';
import { UnderConstructionWeek } from '../../../common';
import { Course, SyllabusModule } from '../../../../../types/course';

interface WeekProps { course?: Course; module?: SyllabusModule; }

// ── CMPE-252 syllabus topics per week (stub metadata) ───────────────────────

export const Week02AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 02" topicHint="Search & Adversarial Games"
    upcomingTopics={['Uninformed Search (BFS/DFS)', 'A* Heuristic Search', 'Minimax & Alpha-Beta Pruning', 'Game Trees']}
  />
);

export const Week03AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 03" topicHint="Constraint Satisfaction & Logic"
    upcomingTopics={['CSP Backtracking', 'Arc Consistency (AC-3)', 'Propositional Logic', 'Resolution Inference']}
  />
);

export const Week04AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 04" topicHint="Probabilistic Reasoning"
    upcomingTopics={["Bayesian Networks", "Conditional Independence", "Variable Elimination", "Inference by Enumeration"]}
  />
);

export const Week05AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 05" topicHint="Decision Theory & MDPs"
    upcomingTopics={['Markov Decision Processes', 'Value Iteration', 'Policy Iteration', 'Expected Utility']}
  />
);

export const Week06AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 06" topicHint="Reinforcement Learning"
    upcomingTopics={['Q-Learning', 'SARSA', 'Deep Q-Networks', 'Policy Gradients']}
  />
);

export const Week07AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 07" topicHint="Natural Language Processing"
    upcomingTopics={['Tokenization & N-Grams', 'Sentiment Analysis', 'Named Entity Recognition', 'Seq2Seq Models']}
  />
);

export const Week08AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 08" topicHint="Deep Learning Architectures"
    upcomingTopics={['Convolutional Neural Networks', 'Recurrent Networks (LSTM)', 'Attention Mechanisms', 'Transfer Learning']}
  />
);

export const Week09AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 09" topicHint="Computer Vision"
    upcomingTopics={['Image Classification', 'Object Detection (YOLO)', 'Semantic Segmentation', 'Feature Pyramids']}
  />
);

export const Week10AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 10" topicHint="Transformer Models & LLMs"
    upcomingTopics={['Self-Attention', 'BERT & GPT Architectures', 'Fine-Tuning', 'Prompt Engineering']}
  />
);

export const Week11AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 11" topicHint="Data Engineering Pipelines"
    upcomingTopics={['ETL Design Patterns', 'Stream Processing (Kafka)', 'Data Warehousing', 'Feature Stores']}
  />
);

export const Week12AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 12" topicHint="MLOps & Model Deployment"
    upcomingTopics={['CI/CD for ML', 'Containerization (Docker)', 'Model Serving (FastAPI)', 'Monitoring & Drift Detection']}
  />
);

export const Week13AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 13" topicHint="AI Ethics & Responsible AI"
    upcomingTopics={['Algorithmic Bias', 'Fairness Metrics', 'Explainability (LIME/SHAP)', 'Regulatory Landscape']}
  />
);

export const Week14AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 14" topicHint="Capstone Project Guidance"
    upcomingTopics={['Problem Framing', 'Baseline Model Selection', 'Evaluation Strategy', 'Presentation Techniques']}
  />
);

export const Week15AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 15" topicHint="Review & Exam Preparation"
    upcomingTopics={['Comprehensive Review', 'Past Exam Analysis', 'Practice Problems', 'Q&A Session']}
  />
);

export const Week16AI: React.FC<WeekProps> = ({ course, module }) => (
  <UnderConstructionWeek
    course={course} module={module}
    weekLabel="Week 16" topicHint="Final Presentations"
    upcomingTopics={['Project Demonstrations', 'Peer Review', 'Final Assessment', 'Course Retrospective']}
  />
);
