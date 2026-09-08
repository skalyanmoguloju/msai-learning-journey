export interface AIFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  useCase?: string;
  remark?: string;
}

export const AI_WEEK1_FLASHCARDS: AIFlashcard[] = [
  // Module 1: Foundations
  {
    id: 'ai-fc-1',
    category: 'Module 1: Foundations',
    title: 'Traditional Programming vs Machine Learning',
    frontPrompt: 'What is the fundamental inversion in data and logic between classical programming and machine learning?',
    backFormula: '\\text{Traditional: } \\text{Data} + \\text{Rules} \\to \\text{Answers} \\quad \\Longleftrightarrow \\quad \\text{ML: } \\text{Data} + \\text{Answers} \\to \\text{Rules (Model)}',
    backExplanation: 'In classical computing, software engineers manually write business logic algorithms that operate on data to output answers. Machine learning flips this: input data alongside observed ground-truth answers are fed to learning algorithms to induce predictive rules ($f(X) \\approx Y$).',
    useCase: 'Predictive modeling when rules are too complex or high-dimensional for human engineering (e.g. computer vision, speech recognition).',
    remark: 'Machine learning fundamentally relies on inductive generalization rather than deductive logic.'
  },
  {
    id: 'ai-fc-2',
    category: 'Module 1: Foundations',
    title: 'Supervised vs Unsupervised vs Reinforcement Learning',
    frontPrompt: 'How are the three primary paradigms of Machine Learning distinguished by supervision signal?',
    backFormula: '\\mathcal{D}_{\\text{sup}} = \\{(x_i, y_i)\\}, \\quad \\mathcal{D}_{\\text{unsup}} = \\{x_i\\}, \\quad \\text{RL: } (s_t, a_t, r_t, s_{t+1})',
    backExplanation: 'Supervised learning pairs each feature vector with a supervisor ground-truth label ($y$). Unsupervised learning discovers hidden geometric structures, clusters, or probability densities without labels. Reinforcement Learning trains an agent taking actions in an environment to maximize cumulative scalar reward signals.',
    useCase: 'Supervised: Spam classification. Unsupervised: Customer segmentation (K-Means). RL: Robot locomotion & game playing.',
    remark: 'Semi-supervised and self-supervised learning bridge the gap by generating surrogate supervisory signals from unlabeled data.'
  },
  {
    id: 'ai-fc-3',
    category: 'Module 1: Foundations',
    title: 'Bias-Variance Decomposition of Generalization Error',
    frontPrompt: 'What are the constituent components of expected test prediction error on unseen data?',
    backFormula: '\\mathbb{E}\\left[(y - \\hat{f}(x))^2\\right] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma_{\\epsilon}^2',
    backExplanation: 'Expected generalization error decomposes into: (1) Squared Bias (underfitting error from overly simplistic model assumptions), (2) Variance (overfitting error from sensitivity to training set fluctuations), and (3) Irreducible Error $\\sigma_\\epsilon^2$ (inherent noise in the data).',
    useCase: 'Diagnosing model health: High training error signifies high bias (increase model capacity); high validation-training gap signifies high variance (regularize or add data).',
    remark: 'Modern deep learning exhibits "double descent" where overparameterized models can achieve both low bias and low test variance.'
  },
  {
    id: 'ai-fc-4',
    category: 'Module 1: Foundations',
    title: 'Inductive Bias & No Free Lunch Theorem',
    frontPrompt: 'Why must every machine learning model possess an inductive bias to generalize?',
    backFormula: '\\forall A_1, A_2: \\sum_{f \\in \\mathcal{F}} P(A_1(f) \\text{ error}) = \\sum_{f \\in \\mathcal{F}} P(A_2(f) \\text{ error})',
    backExplanation: 'The No Free Lunch Theorem proves that averaged over all possible data distributions, no learning algorithm outperforms random guessing. An inductive bias is the set of prior assumptions a model makes about the target function (e.g. linearity in linear regression, translation invariance in CNNs) that enables generalization.',
    useCase: 'Selecting CNNs for images rather than dense MLPs because spatial locality matches image statistics.',
    remark: 'Without inductive bias, an algorithm can merely memorize training instances without any predictive power on unseen data.'
  },

  // Module 2: Classification
  {
    id: 'ai-fc-5',
    category: 'Module 2: Classification',
    title: 'Confusion Matrix Anatomy & Error Typology',
    frontPrompt: 'What are True Positives, False Positives, False Negatives, and True Negatives in binary classification?',
    backFormula: '\\text{Confusion Matrix} = \\begin{bmatrix} \\text{TP} & \\text{FP (Type I Error)} \\\\ \\text{FN (Type II Error)} & \\text{TN} \\end{bmatrix}',
    backExplanation: 'TP: Ground truth positive correctly predicted positive. FP (Type I Error): Ground truth negative incorrectly predicted positive (false alarm). FN (Type II Error): Ground truth positive incorrectly predicted negative (missed event). TN: Ground truth negative correctly identified.',
    useCase: 'Evaluating safety-critical and asymmetric cost classifiers beyond raw accuracy.',
    remark: 'When classes are heavily imbalanced (e.g., 99.9% negative), raw accuracy is a misleading metric.'
  },
  {
    id: 'ai-fc-6',
    category: 'Module 2: Classification',
    title: 'Precision (Positive Predictive Value)',
    frontPrompt: 'What is Precision, its mathematical formula, and when is maximizing Precision the primary objective?',
    backFormula: '\\text{Precision} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP}} = \\frac{\\text{True Positives}}{\\text{Total Predicted Positives}}',
    backExplanation: 'Precision answers: "Of all instances the model predicted as positive, what proportion was actually positive?" It penalizes False Positives (Type I errors). Maximize Precision when the cost of a false alarm is unacceptable.',
    useCase: 'Email spam filters (flagging a critical personal email as spam is costly) and automated criminal indictment.',
    remark: 'Setting an aggressive, high decision threshold increases precision at the expense of recall.'
  },
  {
    id: 'ai-fc-7',
    category: 'Module 2: Classification',
    title: 'Recall (Sensitivity / True Positive Rate)',
    frontPrompt: 'What is Recall, its mathematical formula, and when is maximizing Recall critical?',
    backFormula: '\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}} = \\frac{\\text{True Positives}}{\\text{Total Actual Positives}}',
    backExplanation: 'Recall answers: "Of all real positive instances in the world, what percentage did the model successfully capture?" It penalizes False Negatives (Type II errors / misses). Maximize Recall when failing to detect a positive case has catastrophic consequences.',
    useCase: 'Cancer diagnosis, airport explosive detection, and defect detection in aerospace manufacturing.',
    remark: 'Lowering the classifier decision threshold ensures more actual positives are caught, boosting recall.'
  },
  {
    id: 'ai-fc-8',
    category: 'Module 2: Classification',
    title: 'F1-Score (Harmonic Mean of Precision & Recall)',
    frontPrompt: 'Why does the F1-Score use the harmonic mean rather than the arithmetic mean of Precision and Recall?',
    backFormula: 'F_1 = 2 \\cdot \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}} = \\frac{2\\text{TP}}{2\\text{TP} + \\text{FP} + \\text{FN}}',
    backExplanation: 'The arithmetic mean gives equal weight regardless of balance (e.g. Precision=1.0, Recall=0.0 yields arithmetic mean 0.50). The harmonic mean severely penalizes extreme disparities; if either precision or recall approaches zero, $F_1$ crashes to zero. It balances both metrics on skewed datasets.',
    useCase: 'Fraud detection and search engine query retrieval where both false alerts and missed positives are problematic.',
    remark: 'Generalizes to $F_\\beta = (1+\\beta^2) \\frac{P \\cdot R}{\\beta^2 P + R}$ where $\\beta=2$ weights recall higher, and $\\beta=0.5$ weights precision higher.'
  },

  // Module 3: Regression
  {
    id: 'ai-fc-9',
    category: 'Module 3: Regression',
    title: 'Mean Squared Error (MSE / L2 Loss)',
    frontPrompt: 'What is Mean Squared Error, and what is its sensitivity characteristic with respect to outliers?',
    backFormula: '\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 = \\frac{1}{n} \\sum_{i=1}^n e_i^2',
    backExplanation: 'MSE averages the squared differences between true targets $y_i$ and predictions $\\hat{y}_i$. Because errors are squared, large residuals are penalized quadratically (an error of 10 costs 100, while an error of 1 costs 1). Consequently, MSE is highly sensitive to anomalous outliers.',
    useCase: 'Linear regression, standard neural net regression when Gaussian noise is assumed around target labels.',
    remark: 'Minimizing MSE corresponds to Maximum Likelihood Estimation under a Gaussian residual error assumption $\\epsilon \\sim \\mathcal{N}(0, \\sigma^2)$.'
  },
  {
    id: 'ai-fc-10',
    category: 'Module 3: Regression',
    title: 'Mean Absolute Error (MAE / L1 Loss)',
    frontPrompt: 'How does Mean Absolute Error differ from MSE in its response to dataset outliers?',
    backFormula: '\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^{n} |y_i - \\hat{y}_i|',
    backExplanation: 'MAE averages the absolute magnitude of residuals. Because it penalizes deviations linearly rather than quadratically, it is substantially more robust to extreme anomalies and rogue sensor spikes than MSE. Its gradient magnitude is constant ($\\pm 1$), requiring care near zero.',
    useCase: 'Financial asset pricing and real estate valuation with heavy-tailed, non-Gaussian outliers.',
    remark: 'Minimizing MAE estimates the conditional median of the target distribution, whereas MSE estimates the conditional mean.'
  },
  {
    id: 'ai-fc-11',
    category: 'Module 3: Regression',
    title: 'Huber Loss (Smooth L1 Loss)',
    frontPrompt: 'What is Huber Loss and how does it bridge the advantages of both MSE and MAE?',
    backFormula: 'L_\\delta(e) = \\begin{cases} \\frac{1}{2}e^2 & \\text{for } |e| \\le \\delta \\\\ \\delta (|e| - \\frac{1}{2}\\delta) & \\text{otherwise} \\end{cases}',
    backExplanation: 'Huber loss is piecewise: it behaves quadratically (like MSE) for small residuals $|e| \\le \\delta$, providing smooth, differentiable convergence near the minimum; for large errors $|e| > \\delta$, it transitions to linear penalties (like MAE), dampening the destabilizing impact of extreme outliers.',
    useCase: 'Object detection bounding box regression (Fast/Faster R-CNN) and robust reinforcement learning value estimation.',
    remark: 'The parameter $\\delta$ controls the threshold between Gaussian-like core residuals and Laplace-like tail robustness.'
  },
  {
    id: 'ai-fc-12',
    category: 'Module 3: Regression',
    title: 'R-Squared (Coefficient of Determination)',
    frontPrompt: 'What does the R-Squared metric quantify in regression analysis?',
    backFormula: 'R^2 = 1 - \\frac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}} = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}',
    backExplanation: '$R^2$ represents the proportion of variance in the dependent variable that is predictable from the independent features. $R^2=1.0$ indicates perfect prediction; $R^2=0.0$ means the model performs no better than predicting the baseline mean $\\bar{y}$; negative values indicate performance worse than the mean.',
    useCase: 'Benchmarking regression models against a naive baseline across differing target scales.',
    remark: 'Always inspect Adjusted $R^2$ in multiple regression to penalize the addition of irrelevant predictor variables.'
  },

  // Module 4: Activations
  {
    id: 'ai-fc-13',
    category: 'Module 4: Activations',
    title: 'Sigmoid Activation Function & Vanishing Gradient',
    frontPrompt: 'What is the Sigmoid formula, its range, and why does it induce vanishing gradients in deep networks?',
    backFormula: '\\sigma(z) = \\frac{1}{1 + e^{-z}}, \\quad \\sigma\'(z) = \\sigma(z)(1 - \\sigma(z)) \\le 0.25',
    backExplanation: 'Sigmoid squashes inputs into the $(0, 1)$ interval, mimicking probability. However, its derivative peaks at $\\sigma\'(0) = 0.25$ and decays rapidly to $0$ as $|z|$ grows. In deep networks, backpropagating gradients through chains of $\\le 0.25$ multipliers causes gradients to exponentially vanish in early layers.',
    useCase: 'Binary classification output layer $P(y=1|x)$, gating mechanisms in LSTMs and GRUs.',
    remark: 'Outputs are not zero-centered, which can cause zig-zagging gradient descent parameter updates.'
  },
  {
    id: 'ai-fc-14',
    category: 'Module 4: Activations',
    title: 'Hyperbolic Tangent (Tanh) Activation',
    frontPrompt: 'What is the Tanh formula, and what advantage does it offer over the Sigmoid function?',
    backFormula: '\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\\sigma(2z) - 1, \\quad \\tanh\'(z) = 1 - \\tanh^2(z) \\le 1.0',
    backExplanation: 'Tanh squashes values into the $(-1, 1)$ range. Its critical advantage over Sigmoid is that outputs are zero-centered: negative inputs produce negative activations, preventing directional bias in gradient updates for downstream layers. However, it still saturates for large $|z|$, suffering from vanishing gradients.',
    useCase: 'Hidden layer activations in shallow neural nets and recurrent neural network (RNN) cell states.',
    remark: 'Its peak derivative is $1.0$ (at $z=0$), which is $4\\times$ higher than Sigmoid, alleviating gradient attenuation near zero.'
  },
  {
    id: 'ai-fc-15',
    category: 'Module 4: Activations',
    title: 'Rectified Linear Unit (ReLU) & Dying ReLU',
    frontPrompt: 'What is the ReLU activation function, why is it computationally efficient, and what is "Dying ReLU"?',
    backFormula: 'f(z) = \\max(0, z), \\quad f\'(z) = \\begin{cases} 1 & \\text{if } z > 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}',
    backExplanation: 'ReLU computes a simple max threshold, saving huge CPU/GPU cycles compared to exponentials. For positive inputs, its derivative is exactly 1, completely preventing gradient vanishing. The "Dying ReLU" problem occurs when a large gradient pushes weights such that $z \\le 0$ for all training inputs, permanently zeroing its gradient.',
    useCase: 'Default activation function for feedforward deep networks and Convolutional Neural Networks.',
    remark: 'Sparse activation: ReLU naturally outputs true zeros, yielding biologically inspired sparse representations.'
  },
  {
    id: 'ai-fc-16',
    category: 'Module 4: Activations',
    title: 'Leaky ReLU & Parametric ReLU (PReLU)',
    frontPrompt: 'How does Leaky ReLU resolve the Dying ReLU pathology in deep neural networks?',
    backFormula: 'f(z) = \\max(\\alpha z, z) = \\begin{cases} z & \\text{if } z > 0 \\\\ \\alpha z & \\text{if } z \\le 0 \\end{cases} \\quad (\\alpha \\approx 0.01)',
    backExplanation: 'By introducing a small constant positive slope $\\alpha$ (typically $0.01$) for $z \\le 0$, Leaky ReLU ensures that negative inputs retain a non-zero gradient ($f\'(z) = \\alpha$). This allows inactive neurons to receive gradient updates during backpropagation and recover.',
    useCase: 'Generative Adversarial Networks (GANs, especially Discriminators) and very deep neural networks prone to dying units.',
    remark: 'In PReLU, $\\alpha$ is treated as a learnable parameter optimized via standard backpropagation.'
  },
  {
    id: 'ai-fc-17',
    category: 'Module 4: Activations',
    title: 'Softmax Multi-Class Activation',
    frontPrompt: 'What is the Softmax function and how does it convert unnormalized logits into class probabilities?',
    backFormula: '\\text{Softmax}(z_i) = \\frac{e^{z_i}}{\\sum_{j=1}^{K} e^{z_j}}, \\quad \\sum_{i=1}^{K} \\text{Softmax}(z_i) = 1.0',
    backExplanation: 'Softmax exponentiates each raw class logit $z_i$ (ensuring strictly positive values) and divides by the sum of all exponentiated logits. This normalizes arbitrary real-valued vectors into a valid categorical probability distribution over $K$ mutually exclusive classes.',
    useCase: 'Output layer for multi-class classification networks paired with Categorical Cross-Entropy loss.',
    remark: 'Numerically stable implementation subtracts $\\max(z)$ from all logits prior to exponentiation: $e^{z_i - \\max(z)} / \\sum e^{z_j - \\max(z)}$.'
  },

  // Module 5: Optimization
  {
    id: 'ai-fc-18',
    category: 'Module 5: Gradient Descent',
    title: 'Gradient Descent Parameter Update Rule',
    frontPrompt: 'What is the fundamental parameter update equation in Gradient Descent optimization?',
    backFormula: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla_\\theta J(\\theta_t) = \\theta_t - \\alpha \\left[ \\frac{\\partial J}{\\partial \\theta_1}, \\dots, \\frac{\\partial J}{\\partial \\theta_d} \\right]^T',
    backExplanation: 'Parameters $\\theta$ are iteratively updated in the direction of steepest descent, which is the negative gradient $-\\nabla_\\theta J(\\theta)$ of the objective cost function. The scalar learning rate $\\alpha > 0$ controls the step size taken along the negative gradient vector.',
    useCase: 'Universal optimization paradigm for training linear models, logistic regression, and deep neural networks.',
    remark: 'The gradient vector points in the direction of greatest instantaneous increase of the loss function.'
  },
  {
    id: 'ai-fc-19',
    category: 'Module 5: Gradient Descent',
    title: 'Learning Rate Dynamics: Undershooting vs Overshooting',
    frontPrompt: 'What happens to the convergence behavior of Gradient Descent when learning rate alpha is too small vs too large?',
    backFormula: '\\alpha \\ll \\alpha^* \\implies \\text{Slow / Local Minima}; \\quad \\alpha \\gg \\alpha^* \\implies \\text{Oscillation / Divergence } (J \\to \\infty)',
    backExplanation: 'If $\\alpha$ is too small, convergence requires prohibitive numbers of training epochs and easily traps the model in poor local plateaus. If $\\alpha$ is too large, the parameter updates overshoot the local valley minimum, causing wild oscillations and numeric divergence ($NaN$ loss).',
    useCase: 'Learning rate schedules, warmup periods, and adaptive optimizers (Adam, Cosine Annealing).',
    remark: 'Learning rate is universally considered the single most important hyperparameter in deep learning.'
  },
  {
    id: 'ai-fc-20',
    category: 'Module 5: Gradient Descent',
    title: 'Momentum-Based Optimization',
    frontPrompt: 'How does Momentum accelerate gradient descent and suppress high-curvature oscillations?',
    backFormula: 'v_{t} = \\beta v_{t-1} + (1 - \\beta) \\nabla_\\theta J(\\theta_t), \\quad \\theta_{t+1} = \\theta_t - \\alpha v_t',
    backExplanation: 'Momentum mimics a physical ball rolling down a loss hill by tracking an exponential moving average $v_t$ of past gradient vectors (with decay factor $\\beta \\approx 0.9$). In dimensions with fluctuating gradient signs, oscillations cancel out; in persistent slope directions, velocity accumulates and accelerates.',
    useCase: 'Navigating narrow loss ravines, saddle points, and escaping shallow local minima in SGD training.',
    remark: 'Nesterov Accelerated Gradient (NAG) looks ahead by computing gradients at the projected future position $\\theta_t - \\alpha \\beta v_{t-1}$.'
  },
  {
    id: 'ai-fc-21',
    category: 'Module 5: Gradient Descent',
    title: 'Adam (Adaptive Moment Estimation) Optimizer',
    frontPrompt: 'How does the Adam optimizer combine both first and second moment statistics of the gradients?',
    backFormula: 'm_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2, \\quad \\theta_{t+1} = \\theta_t - \\frac{\\alpha}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t',
    backExplanation: 'Adam maintains both an exponentially decaying average of past gradients ($m_t$, first raw moment / Momentum) and past squared gradients ($v_t$, second uncentered moment / RMSprop adaptive scaling). With bias corrections $\\hat{m}_t = m_t / (1-\\beta_1^t)$ and $\\hat{v}_t = v_t / (1-\\beta_2^t)$, it dynamically scales individual coordinate step sizes.',
    useCase: 'Standard default optimizer across Transformer architectures, LLMs, and computer vision models.',
    remark: 'Standard default hyperparameters: $\\alpha=0.001$, $\\beta_1=0.9$, $\\beta_2=0.999$, $\\epsilon=10^{-8}$.'
  },

  // Module 6: CNN Architecture
  {
    id: 'ai-fc-22',
    category: 'Module 6: CNN Architecture',
    title: '2D Convolution Feature Map Spatial Dimension Formula',
    frontPrompt: 'Given input size W, kernel filter size K, padding P, and stride S, what is the output dimension O?',
    backFormula: 'O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1',
    backExplanation: 'Each step slides kernel $K$ across spatial input width $W$ extended by zero-padding $P$ on both borders, moving in increments of stride $S$. Floor division ensures integer pixel coordinates. This formula applies independently to both spatial width $W$ and height $H$.',
    useCase: 'Designing CNN layer pipelines (e.g. ResNet, VGG, ConvNeXt) to prevent dimensional collapse.',
    remark: 'If $(W - K + 2P)$ is not evenly divisible by $S$, edge pixels are discarded or require asymmetric padding.'
  },
  {
    id: 'ai-fc-23',
    category: 'Module 6: CNN Architecture',
    title: 'Valid vs Same Zero-Padding in Convolutions',
    frontPrompt: 'What is the distinction between Valid padding and Same padding in convolutional layers?',
    backFormula: '\\text{Valid: } P = 0 \\implies O = \\frac{W - K}{S} + 1; \\quad \\text{Same: } P = \\frac{K - 1}{2} \\implies O = W \\quad (\\text{for } S=1)',
    backExplanation: 'Valid padding applies zero additional padding ($P=0$), shrinking the spatial dimensions by $K-1$ pixels per layer. Same padding appends enough zeros around input borders ($P = (K-1)/2$ for odd filter sizes) so that when stride $S=1$, the output spatial dimensions exactly match the input dimensions.',
    useCase: 'Deep networks like ResNet preserve spatial resolution across residual blocks using Same padding ($3\\times 3$ kernel, $P=1$).',
    remark: 'Same padding enables stacking dozens of convolutional layers without prematurely shrinking image resolution.'
  },
  {
    id: 'ai-fc-24',
    category: 'Module 6: CNN Architecture',
    title: 'Pooling Layers: Max Pooling vs Average Pooling',
    frontPrompt: 'What is the primary function of Pooling layers and how do Max and Average pooling differ?',
    backFormula: '\\text{Max: } y = \\max_{(i, j) \\in \\Omega} x_{i,j}, \\quad \\text{Average: } y = \\frac{1}{|\\Omega|} \\sum_{(i, j) \\in \\Omega} x_{i,j}',
    backExplanation: 'Pooling downsamples spatial feature maps, reducing parameter count, computational complexity, and memory footprint while inducing translation invariance. Max pooling captures the strongest prominent feature within the window (e.g. edge or texture); Average pooling computes a smoothed spatial summary.',
    useCase: 'Spatial downsampling in early CNNs (VGG, AlexNet) and Global Average Pooling (GAP) prior to classification heads.',
    remark: 'Pooling layers contain zero learnable weights; they operate purely as fixed non-parametric subsamplers.'
  }
];
