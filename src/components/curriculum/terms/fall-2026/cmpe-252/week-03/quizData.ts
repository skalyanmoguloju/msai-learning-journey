export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizModule {
  title: string;
  stepNumber: number;
  badge: string;
  sub: string;
  questions: QuestionItem[];
}

export const AI_WEEK3_QUIZ: Record<string, QuizModule> = {
  s1: {
    title: 'Module 1: Perceptrons and linear classifiers',
    stepNumber: 1,
    badge: 'Classifiers',
    sub: 'Artificial Neurons & Linear Separability',
    questions: [
      {
        id: 'w3_m1_q1',
        question: 'What does the scalar bias parameter b primarily control in a perceptron?',
        options: [
          'It shifts (translates) the decision boundary without altering its orientation or slope.',
          'It counts the total number of input features in the observation.',
          'It converts the straight linear decision boundary into a non-linear polynomial curve.',
          'It scales the learning rate during stochastic gradient descent.'
        ],
        correct: 0,
        explanation: 'The weights w determine the orientation (slope) of the decision boundary, while the bias b translates (shifts) the boundary relative to the coordinate origin.'
      },
      {
        id: 'w3_m1_q2',
        question: 'Under what condition can a single-layer perceptron achieve 100% classification accuracy on a dataset?',
        options: [
          'When the dataset classes are linearly separable by a single straight hyperplane.',
          'When the dataset classes are arranged in concentric circular rings.',
          'When there are no input features provided to the model.',
          'When all input feature values are strictly positive integers.'
        ],
        correct: 0,
        explanation: 'A single perceptron computes a linear decision boundary (w^T x + b = 0). It can separate data cleanly if and only if the data is linearly separable.'
      },
      {
        id: 'w3_m1_q3',
        question: 'For binary labels y_i ∈ {-1, +1}, what mathematical condition signifies that training example (x_i, y_i) is correctly classified by the perceptron?',
        options: [
          'y_i * (w^T x_i + b) > 0',
          'y_i * (w^T x_i + b) < 0',
          'w^T x_i + b = 0',
          'y_i + w^T x_i + b = 0'
        ],
        correct: 0,
        explanation: 'When y_i = +1, the score must be positive (> 0), yielding (+1)(>0) > 0. When y_i = -1, the score must be negative (< 0), yielding (-1)(<0) > 0. Thus y_i * (w^T x_i + b) > 0 represents correct classification.'
      },
      {
        id: 'w3_m1_q4',
        question: "What is the primary architectural purpose of the 'bias trick' (homogeneous coordinates)?",
        options: [
          'It absorbs the bias b into an augmented weight vector, expressing the affine score as a single inner product: w̃^T x̃.',
          'It eliminates the need for computing parameter updates during training.',
          'It enables a single perceptron to solve the non-linear XOR problem.',
          'It forces all weights to sum to 1.'
        ],
        correct: 0,
        explanation: 'By setting x̃ = [1, x_1, ..., x_n]^T and w̃ = [b, w_1, ..., w_n]^T, the affine equation w^T x + b becomes a single unified dot product w̃^T x̃, simplifying vectorization.'
      }
    ]
  },
  s2: {
    title: 'Module 2: Perceptron training',
    stepNumber: 2,
    badge: 'Learning Rule',
    sub: 'Rosenblatt Convergence & Update Rules',
    questions: [
      {
        id: 'w3_m2_q1',
        question: 'When a true positive example (y = +1) is incorrectly predicted as negative (ŷ = -1), how must the perceptron score z change to fix this error?',
        options: [
          'The score z must increase, shifting the point toward or into the positive decision region.',
          'The score z must decrease, making the prediction more firmly negative.',
          'The score z must remain exactly 0 to satisfy the convergence criterion.',
          'The score z must invert its sign without changing the decision boundary.'
        ],
        correct: 0,
        explanation: 'For a positive mistake (y = +1, ŷ = -1), the error term is y - ŷ = 1 - (-1) = +2. The updates Δw = α(+2)x and Δb = α(+2) raise the score z_new = z_old + α(+2)(||x||^2 + 1) > z_old, pushing the point toward the positive side of the boundary.'
      },
      {
        id: 'w3_m2_q2',
        question: 'What is the primary role of the learning rate hyperparameter α in the perceptron update rule?',
        options: [
          'It scales the magnitude (step size) of the parameter corrections made upon encountering an error.',
          'It dictates whether the true label y is treated as -1 or +1.',
          'It sets the maximum allowable number of features in the input vector x.',
          'It automatically eliminates non-linearly separable outliers from the training set.'
        ],
        correct: 0,
        explanation: 'The learning rate α directly scales the correction vector: w_new = w_old + α(y - ŷ)x and b_new = b_old + α(y - ŷ). A small α makes conservative adjustments, while a larger α takes more aggressive steps.'
      },
      {
        id: 'w3_m2_q3',
        question: 'What happens to the perceptron weights w and bias b when an incoming training example is classified correctly (ŷ = y)?',
        options: [
          'No update occurs: the error term (y - ŷ) is 0, leaving weights and bias completely unchanged.',
          'The weights are halved to prevent numerical overflow.',
          'The bias is increased by α while the weights stay constant.',
          'The weights rotate 90 degrees to search for alternative margins.'
        ],
        correct: 0,
        explanation: 'The perceptron is an error-driven algorithm. When ŷ = y, the error factor (y - ŷ) equals 0, resulting in Δw = 0 and Δb = 0.'
      },
      {
        id: 'w3_m2_q4',
        question: 'What is the behavior of the perceptron learning algorithm when trained on data that is NOT linearly separable (such as the XOR problem)?',
        options: [
          'The algorithm fails to converge and oscillates indefinitely, repeatedly fixing one mistake while creating others.',
          'The algorithm automatically converges to a non-linear quadratic decision boundary.',
          'The algorithm terminates after exactly one epoch with an error exception.',
          'The algorithm shrinks all weights to zero to minimize total loss.'
        ],
        correct: 0,
        explanation: 'By Novikoff’s Convergence Theorem, convergence is guaranteed if and only if the data is linearly separable. On non-separable datasets like XOR, the boundary continuously shifts and oscillates, requiring practical stopping rules (max epochs or patience).'
      }
    ]
  },
  s3: {
    title: 'Module 3: From perceptrons to neural networks',
    stepNumber: 3,
    badge: 'Architectures',
    sub: 'MLPs & Non-linear Decision Boundaries',
    questions: [
      {
        id: 'w3_m3_q1',
        question: 'What is the primary computational function of a hidden neuron in a multilayer neural network?',
        options: [
          'It extracts and constructs an intermediate feature representation from previous layer outputs.',
          'It always directly outputs the final model classification prediction.',
          'It resets all weights to zero when errors occur.',
          'It enforces that all training data points are strictly positive.'
        ],
        correct: 0,
        explanation: 'Hidden neurons transform the input into an internal latent representation, projecting data into a new feature space where non-linear boundaries can be decomposed into linearly separable regions.'
      },
      {
        id: 'w3_m3_q2',
        question: 'Why are non-linear activation functions strictly required between successive layers of a deep neural network?',
        options: [
          'Without non-linearities, any stack of linear layers collapses algebraically into a single equivalent affine linear layer: W\'x + b\'.',
          'Non-linearities guarantee that the loss function is convex with a single global minimum.',
          'Non-linearities eliminate the need for training biases in each neuron.',
          'They prevent the learning rate from decaying over training epochs.'
        ],
        correct: 0,
        explanation: 'Because the composition of linear functions is itself purely linear: W_2(W_1 x + b_1) + b_2 = (W_2 W_1)x + (W_2 b_1 + b_2). Non-linear activations break this affine collapse, allowing networks to compute curved decision boundaries.'
      },
      {
        id: 'w3_m3_q3',
        question: 'Geometrically, why is a single Rosenblatt perceptron fundamentally incapable of classifying the XOR logic function?',
        options: [
          'The positive and negative classes lie on opposing diagonals of the unit square, making them linearly non-separable by any single straight line.',
          'XOR has more input dimensions than the perceptron weight vector can accommodate.',
          'Perceptrons can only process continuous real numbers and cannot accept binary 0/1 inputs.',
          'The learning rate α converges to zero before the XOR truth table can be evaluated.'
        ],
        correct: 0,
        explanation: 'In 2D space, XOR positive points (0,1) and (1,0) and negative points (0,0) and (1,1) cross diagonally. No single linear hyperplane (straight line) can isolate one pair from the other.'
      },
      {
        id: 'w3_m3_q4',
        question: 'How does an MLP solve XOR using a two-neuron hidden layer?',
        options: [
          'Neuron 1 computes an OR gate, Neuron 2 computes an AND gate, and the output neuron evaluates OR AND NOT(AND).',
          'Both hidden neurons compute identical linear averages of the input features.',
          'Neuron 1 inverts the input signs while Neuron 2 scales the inputs to infinity.',
          'It bypasses the hidden layer using skip connections directly to a quadratic kernel.'
        ],
        correct: 0,
        explanation: 'By decomposing XOR into XOR(x_1, x_2) = (x_1 OR x_2) AND NOT(x_1 AND x_2), the hidden units compute the linearly separable OR and AND primitives, which the output neuron cleanly combines.'
      }
    ]
  },
  s4: {
    title: 'Module 4: Activation functions',
    stepNumber: 4,
    badge: 'Non-Linearity',
    sub: 'Sigmoid, Tanh, ReLU & Softmax',
    questions: [
      {
        id: 'w3_m4_q1',
        question: 'Which activation function is most standardly employed at the output neuron of a binary classification network to model class posterior probabilities?',
        options: [
          'Sigmoid (logistic function)',
          'Standard ReLU',
          'Linear / Identity',
          'Softmax with 10 classes'
        ],
        correct: 0,
        explanation: 'The sigmoid function σ(z) = 1 / (1 + e^-z) maps any real-valued input score into the open interval (0, 1), providing a natural model for the Bernoulli posterior probability P(y = 1 | x).'
      },
      {
        id: 'w3_m4_q2',
        question: 'What mathematical property distinguishes the hyperbolic tangent (tanh) activation function from the standard sigmoid function?',
        options: [
          'Tanh is zero-centered with outputs bounded in (-1, +1), preventing directional zig-zagging in weight gradient updates.',
          'Tanh derivative is strictly constant and equals 1 everywhere.',
          'Tanh outputs probabilities that sum to 1 across classes.',
          'Tanh is non-differentiable at the origin z = 0.'
        ],
        correct: 0,
        explanation: 'Because tanh(z) maps to (-1, +1) with tanh(0) = 0, its output distribution is centered around zero. This avoids the systematic positive bias of sigmoid activations that slows down gradient descent.'
      },
      {
        id: 'w3_m4_q3',
        question: 'What is the "Dying ReLU" problem and how does Leaky ReLU mitigate it?',
        options: [
          'Neurons receiving negative scores output 0 with 0 derivative, permanently halting gradient updates; Leaky ReLU maintains a small negative slope αz to keep gradients flowing.',
          'ReLU neurons explode to infinity for negative scores; Leaky ReLU truncates positive activations.',
          'ReLU activations consume exponential GPU memory; Leaky ReLU compresses tensors into 8-bit integers.',
          'ReLU cannot be computed in parallel; Leaky ReLU permits vectorized matrix operations.'
        ],
        correct: 0,
        explanation: 'When z < 0, ReLU(z) = 0 and ReLU\'(z) = 0. If a weight update drives z negative across all inputs, the neuron dies. Leaky ReLU sets a small slope (e.g., α = 0.01) for z < 0, guaranteeing a non-zero gradient flows through.'
      },
      {
        id: 'w3_m4_q4',
        question: 'Why does using sigmoid activations in hidden layers of deep neural networks cause the vanishing gradient problem?',
        options: [
          'The maximum derivative of sigmoid is only 0.25 at z = 0; multiplying these small derivatives across multiple layers shrinks backpropagated gradients exponentially.',
          'The derivative of sigmoid approaches infinity at the saturation tails.',
          'Sigmoid is discontinuous and cannot be differentiated by backpropagation.',
          'Sigmoid outputs negative values that cancel out positive gradients.'
        ],
        correct: 0,
        explanation: 'Since σ\'(z) = σ(z)(1 - σ(z)) <= 0.25, the chain rule multiplies terms <= 0.25 at every layer. In an L-layer network, gradients shrink by at least (0.25)^L, effectively freezing early layers.'
      }
    ]
  },
  s5: {
    title: 'Module 5: Training a multilayer neural network',
    stepNumber: 5,
    badge: 'Optimization',
    sub: 'Loss Functions & Optimization Landscapes',
    questions: [
      {
        id: 'w3_m5_q1',
        question: 'What is the fundamental purpose of a loss function L(y, ŷ) in training neural networks?',
        options: [
          'It provides a quantitative scalar metric evaluating the magnitude of the model’s prediction error.',
          'It determines the number of hidden layers in the network.',
          'It resets all weights to zero at the end of each epoch.',
          'It counts the total number of input features in the observation.'
        ],
        correct: 0,
        explanation: 'A loss function converts prediction errors into a single scalar penalty value, creating a differentiable objective surface that optimization algorithms like gradient descent can minimize.'
      },
      {
        id: 'w3_m5_q2',
        question: 'In the gradient descent update rule θ ← θ - α ∇_θ E(θ), what is the effect on parameter θ when the local gradient ∇_θ E is negative?',
        options: [
          'The parameter θ increases in value because subtracting a negative scalar yields an addition: θ - α(-|g|) = θ + α|g|.',
          'The parameter θ is immediately reset to 0.',
          'The parameter θ decreases toward negative infinity.',
          'The learning rate α is inverted to -α.'
        ],
        correct: 0,
        explanation: 'The negative sign ensures movement opposite to the gradient. When the gradient is negative (loss decreases as θ increases), subtracting the negative gradient raises θ to move downhill toward lower loss.'
      },
      {
        id: 'w3_m5_q3',
        question: 'How many total learnable parameters (weights + biases) exist in a fully connected network with 3 input features, 4 hidden neurons, and 1 output neuron?',
        options: [
          '21 parameters (16 weights and 5 biases)',
          '12 parameters (only the first layer weights)',
          '7 parameters (3 inputs + 4 hidden neurons)',
          '48 parameters (3 × 4 × 4 × 1)'
        ],
        correct: 0,
        explanation: 'Input-to-hidden: (3 inputs × 4 neurons) + 4 biases = 16 parameters. Hidden-to-output: (4 neurons × 1 output) + 1 bias = 5 parameters. Total = 16 + 5 = 21 parameters.'
      },
      {
        id: 'w3_m5_q4',
        question: 'Why do the total sum of squared errors E(w) and Mean Squared Error (MSE) yield identical optimal parameter solutions θ*?',
        options: [
          'They differ only by a constant positive scale factor (1/N), preserving the locations of all critical points, slopes, and global minima.',
          'They have completely different derivative equations that coincidentally cross at zero.',
          'MSE is only used for classification, while sum of squared errors is for regression.',
          'The learning rate α automatically cancels out the division by N.'
        ],
        correct: 0,
        explanation: 'Since MSE = (1/N) E(w) and N > 0 is a fixed constant, ∇ MSE = (1/N) ∇ E(w). Setting both gradients to zero produces the exact same optimal stationary point θ*.'
      }
    ]
  },
  s6: {
    title: 'Module 6: Forward propagation and backpropagation',
    stepNumber: 6,
    badge: 'Gradients',
    sub: 'Chain Rule & Error Propagation',
    questions: [
      {
        id: 'w3_m6_q1',
        question: 'What is the correct mathematical dependency path for backward error propagation in a two-layer network?',
        options: [
          'L → a^(2) → z^(2) → a^(1) → z^(1) → W^(1), b^(1)',
          'L → z^(2) → W^(1) → a^(1) → x',
          'x → z^(1) → a^(1) → z^(2) → L',
          'L → W^(1) → b^(1) → W^(2) → b^(2)'
        ],
        correct: 0,
        explanation: 'Because loss depends directly on output activations a^(2), error flows: Loss L → output activation a^(2) → output pre-activation z^(2) → hidden activation a^(1) → hidden pre-activation z^(1) → input-layer parameters W^(1), b^(1).'
      },
      {
        id: 'w3_m6_q2',
        question: 'What is the exact distinction between backpropagation and gradient descent?',
        options: [
          'Backpropagation calculates the analytical gradient vector ∇_θ L; gradient descent consumes those gradients to execute the parameter update step θ ← θ - α ∇_θ L.',
          'Backpropagation updates the weights; gradient descent computes the forward predictions.',
          'Backpropagation is only used for convolutional networks, while gradient descent is for MLPs.',
          'Gradient descent operates backward, while backpropagation operates forward.'
        ],
        correct: 0,
        explanation: 'Backpropagation is an efficient dynamic programming algorithm that evaluates partial derivatives ∂L/∂θ via the chain rule. Gradient descent is an optimization rule that uses those derivatives to iteratively adjust parameter values.'
      },
      {
        id: 'w3_m6_q3',
        question: 'Why does an inactive ReLU neuron with pre-activation z^(1) < 0 prevent gradient flow to its incoming weights?',
        options: [
          'The local activation derivative is ReLU\'(z^(1)) = 0; because the chain rule multiplies derivatives along the path, the entire product becomes zero.',
          'Negative pre-activations cause a divide-by-zero error in the loss function.',
          'The learning rate α automatically jumps to zero for negative activations.',
          'The incoming weights are immediately deleted from memory.'
        ],
        correct: 0,
        explanation: 'Since δ^(1) = (W^(2))^T δ^(2) ⊙ ReLU\'(z^(1)) and ReLU\'(z^(1)) = 0 for z^(1) < 0, the error signal δ^(1) collapses to 0, yielding ∂L/∂W^(1) = 0.'
      },
      {
        id: 'w3_m6_q4',
        question: 'In backpropagation, how is the error signal δ^(l) defined, and how is it used to compute the weight gradient ∂L/∂W^(l)?',
        options: [
          'δ^(l) ≡ ∂L/∂z^(l), and the weight gradient is computed as the outer product ∂L/∂W^(l) = δ^(l) (a^(l-1))^T.',
          'δ^(l) ≡ ∂L/∂W^(l), and the gradient is computed by adding the bias vector b^(l).',
          'δ^(l) is the network prediction error (y - ŷ) divided by total epochs.',
          'δ^(l) is the inverse of the learning rate α.'
        ],
        correct: 0,
        explanation: 'By defining the error sensitivity δ^(l) = ∂L/∂z^(l), the multivariate chain rule neatly factorizes the parameter gradient into the outer product of the current layer\'s error signal and the transposed activation vector from the preceding layer: δ^(l) (a^(l-1))^T.'
      }
    ]
  },
  s7: {
    title: 'Module 7: Universal approximation',
    stepNumber: 7,
    badge: 'Theorem',
    sub: 'Expressive Capacity of Neural Networks',
    questions: []
  },
  s8: {
    title: 'Module 8: Weight initialization',
    stepNumber: 8,
    badge: 'Initialization',
    sub: 'Xavier & He Normal/Uniform Methods',
    questions: []
  },
  s9: {
    title: 'Module 9: Monitoring neural-network training',
    stepNumber: 9,
    badge: 'Diagnostics',
    sub: 'Learning Curves, Generalization & Early Stopping',
    questions: []
  },
  s10: {
    title: 'Module 10: Learning settings beyond ordinary supervised learning',
    stepNumber: 10,
    badge: 'Paradigms',
    sub: 'Self-Supervised & Semi-Supervised Learning',
    questions: []
  },
  s11: {
    title: 'Module 11: Few-shot and transfer learning',
    stepNumber: 11,
    badge: 'Transfer',
    sub: 'Domain Adaptation & Fine-Tuning',
    questions: []
  },
  s12: {
    title: 'Module 12: Contrastive learning and SimCLR',
    stepNumber: 12,
    badge: 'Self-Supervised',
    sub: 'InfoNCE Loss & Visual Representation Learning',
    questions: []
  }
};
