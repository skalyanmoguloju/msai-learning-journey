import { CourseDocumentItem } from '../../../../common';

export const AI_WEEK2_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'w2-doc-ai-basics',
    title: 'Machine Learning or AI Basics Continued',
    fileUrl: 'documents/cmpe-252/week-02/lecture-02-ai-basics-continued.pdf',
    fileName: 'Machine_Learning_or_AI_Basics_Continued.pdf',
    fileSize: '1.4 MB',
    pageCount: 11,
    category: 'Lecture Slides',
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
    title: 'Optimization Techniques',
    fileUrl: 'documents/cmpe-252/week-02/lecture-02-optimization-techniques.pdf',
    fileName: 'Optimization_Techniques.pdf',
    fileSize: '1.7 MB',
    pageCount: 7,
    category: 'Lecture Slides',
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
