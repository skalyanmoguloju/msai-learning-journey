import { CourseDocumentItem } from '../../../../common';

export const ML_WEEK6_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'cmpe257-w6-midterm-slides',
    title: 'MidTerm Exam Prep: Review & 10 Worked Sample Questions',
    fileUrl: 'documents/cmpe-257/week-06/midterm-prep-slides.pdf',
    fileName: 'CMPE257_MidTerm_Exam_Prep.pdf',
    fileSize: '1.5 MB',
    pageCount: 47,
    category: 'Exam Prep Slides',
    topics: [
      'Midterm Exam Logistics: 120 mins, 25% of Grade, Oct 2, 2026 in ENG 337',
      'Rules: 1-Page Cheatsheet (Front & Back), Calculator Allowed, No Electronic Devices / LLMs',
      'Question 1: Short T/F on Naive Bayes Zero Error, Multiclass Logistic, SVM Margin, Linearity in Log-Odds',
      'Question 2: Linear Separability along Diagonals (SVM vs KNN with small k)',
      'Question 3: Non-linear Circular Datasets (Kernel SVM vs Linear Classifiers)',
      'Question 4: Outlier Robustness — Squared Loss L1 vs Hinge Loss L2',
      'Question 5: Exponential Loss vs Logistic Loss with 10% Mistaken Labels',
      'Question 6: 3D Covariance Matrix Derivation for Linearly Correlated Columns',
      'Question 7: Chi-Square Test of Independence (Usage Frequency vs Device Type, χ² ≈ 33.28, df=6)',
      'Question 8: Naive Bayes MLE Breakdown on 4-Point XOR Toy Dataset',
      'Question 9: Decision Tree Split Impurity: Misclassification (0.40), Gini (0.48), Entropy (0.971 bits)',
      'Question 10: 1D Linear Regression Batch Gradient Descent Step at w=0, b=0'
    ]
  },
  {
    id: 'cmpe257-w6-cs229-cheatsheet',
    title: 'CS229 Supervised Learning VIP Cheatsheet (Stanford University)',
    fileUrl: 'documents/cmpe-257/week-06/cs229-cheatsheet.pdf',
    fileName: 'CS229_Supervised_Learning_Cheatsheet.pdf',
    fileSize: '656 KB',
    pageCount: 4,
    category: 'Cheatsheet',
    topics: [
      'Linear Regression, Normal Equations & LMS (Widrow-Hoff) Rule',
      'Classification & Logistic Regression, Softmax Multinomial Formulation',
      'Generalized Linear Models (GLM) & Exponential Family Canonical Parameters',
      'Support Vector Machines, Optimal Margin Classifier & Gaussian Kernel Trick',
      'Generative Learning: Gaussian Discriminant Analysis (GDA) & Naive Bayes',
      'Tree-based Methods: CART, Random Forest, AdaBoost & Gradient Boosting',
      'Learning Theory: PAC Learning, VC Dimension, Hoeffding & Vapnik Bounds'
    ]
  },
  {
    id: 'cmpe257-w6-cracking-ml',
    title: 'Cracking the Machine Learning Interview (225 Questions & Solutions)',
    fileUrl: 'documents/cmpe-257/week-06/cracking-ml-interview.pdf',
    fileName: 'Cracking_the_ML_Interview_Nitin_Suri.pdf',
    fileSize: '2.4 MB',
    pageCount: 135,
    category: 'Interview & Question Bank',
    topics: [
      'Machine Learning Workflow: Data Gathering, Cleaning, Feature Engineering & Training',
      'Supervised Learning: Classification, Regression, and Regularization (L1 vs L2)',
      'Decision Trees, Pruning, Bagging vs. Boosting, and Random Forests vs. SVMs',
      'K-Nearest Neighbors Algorithm, Distance Metrics & Kd-Trees',
      'Logistic Regression Training, Deviance, AIC, and Link Functions',
      'Unsupervised Learning: K-Means Clustering, Jaccard Quality & Dimensionality Reduction (PCA, SVD)',
      'Data Preprocessing: Variance Threshold, Feature Selection & Multicollinearity Handling',
      'Model Evaluation: Confusion Matrix, ROC/AUC Curves, PR Curves, Type I/II Errors & F-test'
    ]
  }
];
