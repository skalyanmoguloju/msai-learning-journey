export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModuleData {
  title: string;
  stepNumber: number;
  badge: string;
  sub: string;
  questions: QuizQuestion[];
}

export const AI_WEEK1_QUIZ: Record<string, QuizModuleData> = {
  s1: {
    title: 'Module 1: Foundational Concepts & Data-Driven Methods',
    stepNumber: 1,
    badge: 'Foundations & Paradigms',
    sub: 'Data + Answers vs Rules, Unsupervised Clustering',
    questions: [
      {
        id: 's1_q1',
        question: 'What is the fundamental difference between traditional programming and Machine Learning?',
        options: [
          'Traditional programming requires continuous targets; ML requires discrete classes.',
          'Traditional programming takes Data + Rules to generate Answers; ML takes Data + Answers to learn Rules.',
          'Traditional programming cannot run on GPUs; ML runs exclusively on GPUs.',
          'Traditional programming relies on neural networks; ML relies on decision trees.'
        ],
        correct: 1,
        explanation: 'In traditional software programming, developers write explicit **Rules** applied to **Data** to produce **Answers**. In Machine Learning, the system ingests **Data** alongside known ground-truth **Answers** to automatically induce and train the predictive **Rules** ($f(X) \\approx Y$).'
      },
      {
        id: 's1_q2',
        question: 'An algorithm that groups customers by purchasing behavior without any prior labels is an example of:',
        options: [
          'Supervised Regression',
          'Supervised Classification',
          'Unsupervised Clustering',
          'Reinforcement Learning'
        ],
        correct: 2,
        explanation: '**Unsupervised Clustering** (e.g. K-Means, DBSCAN) partitions unlabeled feature data into natural clusters based on geometric or statistical distance without any pre-existing class labels. Supervised learning requires labeled outcomes, and Reinforcement Learning relies on sequential agent rewards.'
      }
    ]
  },
  s2: {
    title: 'Module 2: Classification Metrics & Evaluation',
    stepNumber: 2,
    badge: 'Classification & Confusion Matrix',
    sub: 'Type II Errors, Spam Filter Precision vs Recall',
    questions: [
      {
        id: 's2_q3',
        question: 'If a medical screening test misses a patient who actually has a disease, what type of error has occurred?',
        options: [
          'False Positive (Type I Error)',
          'False Negative (Type II Error)',
          'True Negative',
          'Precision Error'
        ],
        correct: 1,
        explanation: 'A **False Negative (Type II Error)** occurs when the true ground condition is positive ($Y = 1$, diseased) but the model falsely predicts negative ($\\hat{Y} = 0$). In diagnostic screening, minimizing False Negatives (maximizing Recall / Sensitivity $\\frac{\\text{TP}}{\\text{TP} + \\text{FN}}$) is paramount.'
      },
      {
        id: 's2_q4',
        question: 'Which evaluation metric should you prioritize for a spam detection filter where blocking a legitimate, critical email is considered catastrophic?',
        options: [
          'Recall',
          'Accuracy',
          'Precision',
          'MSE'
        ],
        correct: 2,
        explanation: '$\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}}$. In spam classification, mislabeling a crucial legitimate email as spam is a False Positive. Maximizing Precision directly suppresses False Positives toward zero, guaranteeing that flagged emails are genuine spam.'
      }
    ]
  },
  s3: {
    title: 'Module 3: Regression Metrics',
    stepNumber: 3,
    badge: 'Continuous Error & R²',
    sub: 'Physical RMSE Units & R² Baseline Significance',
    questions: [
      {
        id: 's3_q5',
        question: 'Why would an engineer choose Root Mean Squared Error (RMSE) over Mean Squared Error (MSE) when presenting results to stakeholders?',
        options: [
          'RMSE eliminates the effect of all outliers.',
          'RMSE converts the error metric back into the original units of the target variable.',
          'RMSE is bounded strictly between $0.0$ and $1.0$.',
          'RMSE does not require computing actual values.'
        ],
        correct: 1,
        explanation: '$\\text{MSE} = \\frac{1}{n}\\sum (y_i - \\hat{y}_i)^2$ yields squared physical units (e.g., $\\text{dollars}^2$ or $\\text{meters}^2$). Taking the square root $\\text{RMSE} = \\sqrt{\\text{MSE}}$ restores the metric into the original physical unit scale of the dependent variable, making it immediately interpretable to non-technical stakeholders.'
      },
      {
        id: 's3_q6',
        question: 'What does an $R^2$ score of $0.0$ indicate about a regression model?',
        options: [
          'The model makes perfect predictions.',
          'The model performs no better than simply predicting the mean of the target variable.',
          'The model has infinite error.',
          'The model is suffering from severe underfitting.'
        ],
        correct: 1,
        explanation: 'Because $R^2 = 1 - \\frac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}}$, an $R^2 = 0.0$ implies $\\text{SS}_{\\text{res}} = \\text{SS}_{\\text{tot}}$. The fitted regression model accounts for $0\\%$ of target variance and performs exactly equivalent to the naive baseline prediction $\\hat{y} = \\bar{y}$ (the sample mean).'
      }
    ]
  },
  s4: {
    title: 'Module 4: Probability & Activation Functions',
    stepNumber: 4,
    badge: 'Non-Linearities & Activations',
    sub: 'Softmax Distribution & Vanishing Gradient Relief',
    questions: [
      {
        id: 's4_q7',
        question: 'Which activation function is most suitable for the output layer of a multi-class classification problem where class probabilities must sum to 1.0?',
        options: [
          'ReLU',
          'Sigmoid',
          'Softmax',
          'Tanh'
        ],
        correct: 2,
        explanation: 'The **Softmax** function $\\sigma(z)_i = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}$ normalizes arbitrary unconstrained logit vectors into a valid categorical probability distribution where $0 \\le P_i \\le 1$ and $\\sum_{i=1}^K P_i = 1.0$. Sigmoid produces independent Bernoulli probabilities.'
      },
      {
        id: 's4_q8',
        question: 'What is a primary advantage of using ReLU over Sigmoid in hidden layers of deep neural networks?',
        options: [
          'ReLU bounds outputs strictly between $-1$ and $+1$.',
          'ReLU mitigates the vanishing gradient problem for positive inputs.',
          'ReLU transforms input vectors into valid probability distributions.',
          'ReLU is a smooth, continuously differentiable curve everywhere.'
        ],
        correct: 1,
        explanation: 'Sigmoid saturates for large $|z|$ with a maximum derivative of $\\sigma\'(0) = 0.25$, causing gradients to vanish exponentially through multiple layers during backpropagation. **ReLU** ($f(z) = \\max(0, z)$) has a constant gradient $\\frac{df}{dz} = 1.0$ for all $z > 0$, preventing vanishing gradients.'
      }
    ]
  },
  s5: {
    title: 'Module 5: Linear Regression & Gradient Descent',
    stepNumber: 5,
    badge: 'Optimization & Gradients',
    sub: 'Learning Rate Divergence & Steepest Ascent Vectors',
    questions: [
      {
        id: 's5_q9',
        question: 'If the learning rate ($\\alpha$) in Gradient Descent is set far too high, what will happen during optimization?',
        options: [
          'The model will converge to the global minimum almost instantaneously.',
          'The parameters will stop updating completely.',
          'The loss may overshoot the minimum and diverge.',
          'The gradient vector will drop to zero immediately.'
        ],
        correct: 2,
        explanation: 'When step size $\\alpha$ is excessively large, parameter updates $W \\leftarrow W - \\alpha \\nabla L$ overshoot the loss surface valley, creating growing oscillations that cause the loss to explode towards infinity (numerical divergence).'
      },
      {
        id: 's5_q10',
        question: 'In the parameter update formula $W_{\\text{new}} = W_{\\text{old}} - \\alpha \\cdot \\frac{\\partial L}{\\partial W}$, what does $\\frac{\\partial L}{\\partial W}$ represent?',
        options: [
          'The step size multiplier',
          'The magnitude and direction of steepest increase in loss relative to weight $W$',
          'The predicted continuous target value',
          'The total number of training samples'
        ],
        correct: 1,
        explanation: 'The partial derivative $\\frac{\\partial L}{\\partial W}$ points along the direction of **steepest increase (ascent)** of the objective loss function. Subtracting this gradient ($-\\alpha \\nabla L$) forces parameters to update in the direction of **steepest descent**.'
      }
    ]
  },
  s6: {
    title: 'Module 6: Neural Networks & CNN Sizing',
    stepNumber: 6,
    badge: 'Deep Learning & CNNs',
    sub: 'Spatial Dimensionality Formula & Padding Benefits',
    questions: [
      {
        id: 's6_q11',
        question: 'Given an input feature map of size $W = 32 \\times 32$, a filter size $F = 5 \\times 5$, padding $P = 1$, and stride $S = 2$, what is the output feature map dimension $O$?',
        options: [
          '$14 \\times 14$',
          '$15 \\times 15$',
          '$16 \\times 16$',
          '$28 \\times 28$'
        ],
        correct: 1,
        explanation: 'Using the spatial formula:\\\\\n$$O = \\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1$$\\\\\nSubstitute $W=32, F=5, P=1, S=2$:\\\\\n$$O = \\left\\lfloor \\frac{32 - 5 + 2(1)}{2} \\right\\rfloor + 1 = \\left\\lfloor \\frac{29}{2} \\right\\rfloor + 1 = 14 + 1 = 15$$\\\\\nThus, the resulting feature map is $15 \\times 15$.'
      },
      {
        id: 's6_q12',
        question: 'What is the primary purpose of applying zero-padding ($P$) to an image before passing it through a convolutional layer?',
        options: [
          'To speed up matrix multiplication.',
          'To preserve spatial dimensions and prevent edge pixels from losing information rapidly.',
          'To force all output feature values to be non-negative.',
          'To convert 2D images into 1D vectors.'
        ],
        correct: 1,
        explanation: 'Without zero-padding, every convolution shaves off borders and samples edge pixels fewer times than interior pixels. Padding preserves spatial height/width and prevents premature loss of perimeter pixel information through deep convolutional stacks.'
      }
    ]
  }
};
