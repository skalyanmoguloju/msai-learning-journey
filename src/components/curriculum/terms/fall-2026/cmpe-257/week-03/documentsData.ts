import { CourseDocumentItem } from '../../../../common';

export const ML_WEEK3_DOCUMENTS: CourseDocumentItem[] = [
  {
    id: 'cmpe257-w3-session3',
    title: 'Session 3: Advanced Supervised Learning Techniques — Decision Trees & Ensembles',
    fileUrl: 'documents/cmpe-257/week-03/session3.pdf',
    fileName: 'CMPE257_Session_3.pdf',
    fileSize: '6.4 MB',
    pageCount: 90,
    category: 'Lecture Slides',
    topics: [
      'Recap: Logistic Regression & GLM Construction',
      'Limitations of Linear Regression (Outliers, Multicollinearity, Heteroscedasticity)',
      'Limitations of Logistic Regression (Linear Log-Odds & Boundary)',
      'Decision Trees: Recursive Space Partitioning & Split Functions',
      'Splitting Criteria: Misclassification Error, Shannon Entropy & Gini Index',
      'Information Gain & 400-Point 3-Cluster Lecture Example',
      'Regression Trees: Continuous Response & Adaptive Binning (Equal-width, Quantiles, Supervised)',
      'CART Algorithm: SSE Minimization & Apple Weights 6-Sample Walkthrough',
      'Transition to Ensembles: Bagging, Bootstrap Resampling & Variance Reduction',
      'Random Forests: Feature Subsampling Decorrelation',
      'Gradient Boosting: Sequential Residual Fitting, Learning Rate & House Price Case Study'
    ]
  },
  {
    id: 'cmpe257-w3-recitation1',
    title: 'Recitation 1: Decision Trees, Information Theory & High-Dimensional kNNs',
    fileUrl: 'documents/cmpe-257/week-03/recitation1.pdf',
    fileName: '10701_Recitation_1.pdf',
    fileSize: '1.2 MB',
    pageCount: 7,
    category: 'Recitation & Exercises',
    topics: [
      'Entropy Maximization: Proof that Uniform Distribution Maximizes Entropy via Lagrange Multipliers',
      'KL Divergence: Mathematical Proof of Gibbs\' Inequality D(p||q) >= 0 using x - 1 >= ln(x)',
      'Decision Tree Boundaries: Why Axis-Aligned Cuts Cannot Perfectly Learn Circular Boundaries',
      'Mutual Information & Information Gain: 400-Point 3-Cluster Worked Derivation',
      'Tree Architecture Construction for Exact Axis-Aligned Multiclass Partitioning',
      'Curse of Dimensionality in kNN: Proof of Expected Pairwise Distance lim d_q = sqrt(q/6) -> inf'
    ]
  }
];
