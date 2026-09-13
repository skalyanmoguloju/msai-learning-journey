import { CourseDocumentItem } from '../../../../common';

export const AI_WEEK2_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'w2-doc-ai-basics',
    title: 'Lecture 2: Machine Learning or AI Basics Continued',
    subtitle: 'Linear Algebra, Matrix Factorizations, Calculus & Probability Theory',
    description:
      'Foundational lecture slides covering vectors, matrices, determinants, solving linear systems Ax = b, LU decomposition, eigenvalues & eigenvectors, SVD, differential calculus, gradient vectors, and probability distributions (Bernoulli & Gaussian).',
    fileUrl: 'documents/cmpe-252/week-02/lecture-02-ai-basics-continued.pdf',
    fileName: 'Lecture_2_Machine_Learning_or_AI_Basics_Continued.pdf',
    fileSize: '1.4 MB',
    pageCount: 11,
    category: 'Lecture Slides',
    badge: 'Week 2 Core',
    topics: [
      'Vectors & Matrices',
      'Matrix Operations',
      'LU Decomposition',
      'Eigenvalues & SVD',
      'Differential Calculus',
      'Gradient Vectors',
      'Gaussian & Bernoulli'
    ]
  },
  {
    id: 'w2-doc-optimization',
    title: 'Lecture 2: Optimization Techniques',
    subtitle: 'First-Order, Second-Order & Natural Gradient Optimization',
    description:
      'In-depth slides on Gradient Descent, Mini-batch SGD, Momentum, Nesterov Accelerated Gradient (NAG), Adagrad, RMSProp, Adam with bias correction, Newton’s Method, Quasi-Newton (BFGS & L-BFGS), and Natural Gradient Descent using the Fisher Information Matrix (FIM).',
    fileUrl: 'documents/cmpe-252/week-02/lecture-02-optimization-techniques.pdf',
    fileName: 'Lecture_2_Optimization_Techniques.pdf',
    fileSize: '1.7 MB',
    pageCount: 7,
    category: 'Lecture Slides',
    badge: 'Optimization Core',
    topics: [
      'Gradient Descent & SGD',
      'Momentum & NAG',
      'Adagrad & RMSProp',
      'Adam Optimizer',
      "Newton's Method",
      'BFGS & L-BFGS',
      'Natural Gradient (FIM)'
    ]
  }
];
