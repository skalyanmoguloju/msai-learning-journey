export interface CalculusFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  remark?: string;
  useCase?: string;
}

export const CALCULUS_FLASHCARDS: CalculusFlashcard[] = [
  // ================= Module 1: Limits & Continuity =================
  {
    id: 'calc-fc-1',
    category: 'Module 1: Limits & Continuity',
    title: 'Intuitive Limit Definition',
    frontPrompt: 'What is the conceptual definition of a two-sided limit $\\lim_{x \\to c} f(x) = L$?',
    backFormula: '\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L',
    backExplanation: 'The output $f(x)$ becomes arbitrarily close to target $L$ as $x$ approaches $c$ from both left and right directions. The value $f(c)$ does NOT need to exist or equal $L$ for the limit to exist.',
    remark: 'If left and right limits disagree, the two-sided limit Does Not Exist (DNE).',
    useCase: 'Defining instantaneous rates of change and examining activation behavior at step points.'
  },
  {
    id: 'calc-fc-2',
    category: 'Module 1: Limits & Continuity',
    title: 'Formal Epsilon-Delta Definition',
    frontPrompt: 'State the precise Cauchy $\\epsilon$-$\\delta$ definition of a limit $\\lim_{x \\to c} f(x) = L$.',
    backFormula: '\\forall \\epsilon > 0, \\; \\exists \\delta > 0 \\text{ s.t. } 0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon',
    backExplanation: 'For any error tolerance $\\epsilon > 0$ around output $L$, there exists a corresponding input radius $\\delta > 0$ around $c$ such that any input $x$ within that neighborhood yields an output within tolerance.',
    remark: '$0 < |x - c|$ ensures we examine inputs approaching $c$, but not the exact point $x = c$ itself.',
    useCase: 'Rigorous convergence proofs in numerical analysis and machine learning stability guarantees.'
  },
  {
    id: 'calc-fc-3',
    category: 'Module 1: Limits & Continuity',
    title: 'Three Criteria for Continuity',
    frontPrompt: 'State the 3 formal conditions required for a function $f(x)$ to be continuous at point $x = c$.',
    backFormula: '(1) \\; f(c) \\text{ is defined}, \\quad (2) \\; \\lim_{x \\to c} f(x) \\text{ exists}, \\quad (3) \\; \\lim_{x \\to c} f(x) = f(c)',
    backExplanation: 'A function is continuous at a point if there are no holes, jumps, or vertical asymptotes: the limit equals the exact function value evaluated at the point.',
    remark: 'If any of the 3 conditions fails, $f$ has a discontinuity (removable, jump, or essential/infinite).',
    useCase: 'Smoothness criteria for optimization objectives and gradient descent descent guarantees.'
  },
  {
    id: 'calc-fc-4',
    category: 'Module 1: Limits & Continuity',
    title: 'Intermediate Value Theorem (IVT)',
    frontPrompt: 'State the Intermediate Value Theorem and its primary prerequisite condition.',
    backFormula: 'f \\in C[a, b], \\; f(a) < k < f(b) \\implies \\exists c \\in (a, b) \\text{ s.t. } f(c) = k',
    backExplanation: 'If $f$ is continuous on closed interval $[a, b]$, it must take on every intermediate value $k$ between $f(a)$ and $f(b)$ at least once.',
    remark: 'Direct application: If $f(a)$ and $f(b)$ have opposite signs, $f(c) = 0$ for some $c \\in (a, b)$ (Bolzano’s Root Existence Theorem).',
    useCase: 'Bisection search root-finding algorithms and proving loss function level sets exist.'
  },
  {
    id: 'calc-fc-5',
    category: 'Module 1: Limits & Continuity',
    title: 'The Squeeze (Sandwich) Theorem',
    frontPrompt: 'State the Squeeze Theorem for bounding limits of complex or oscillating functions.',
    backFormula: 'g(x) \\le f(x) \\le h(x) \\text{ near } c, \\; \\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L \\implies \\lim_{x \\to c} f(x) = L',
    backExplanation: 'If $f(x)$ is trapped between lower bound $g(x)$ and upper bound $h(x)$ near $c$, and both bounds converge to the same limit $L$, $f(x)$ must also converge to $L$.',
    remark: 'Essential for proving $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ and $\\lim_{x \\to 0} x^2 \\sin(1/x) = 0$.',
    useCase: 'Bounding algorithmic convergence rates and generalization error margins.'
  },

  // ================= Module 2: The Derivative & Rules =================
  {
    id: 'calc-fc-6',
    category: 'Module 2: The Derivative & Rules',
    title: 'Definition of the Derivative',
    frontPrompt: 'State the limit definition of the derivative $f\'(x)$ as an instantaneous rate of change.',
    backFormula: 'f\'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h} = \\lim_{z \\to x} \\frac{f(z) - f(x)}{z - x}',
    backExplanation: 'The derivative is the limit of average rates of change (difference quotient secant slopes) as the interval $h$ shrinks to zero, giving the exact tangent slope.',
    remark: 'Differentiability implies continuity, but continuity does NOT imply differentiability (e.g. $f(x) = |x|$ at $x = 0$).',
    useCase: 'Foundation of all gradient-based optimization in machine learning.'
  },
  {
    id: 'calc-fc-7',
    category: 'Module 2: The Derivative & Rules',
    title: 'The Power Rule',
    frontPrompt: 'State the Power Rule for differentiating power functions $f(x) = x^n$ for any real $n \\in \\mathbb{R}$.',
    backFormula: '\\frac{d}{dx}[x^n] = n x^{n - 1}',
    backExplanation: 'Multiply by the existing exponent, then reduce the power by 1. Applies to positive, negative, and fractional rational exponents.',
    remark: 'Special cases: $\\frac{d}{dx}[x] = 1$, $\\frac{d}{dx}[c] = 0$, $\\frac{d}{dx}[\\sqrt{x}] = \\frac{1}{2\\sqrt{x}}$, $\\frac{d}{dx}[1/x] = -1/x^2$.',
    useCase: 'Differentiating polynomial loss terms such as Mean Squared Error $(y - \\hat{y})^2$.'
  },
  {
    id: 'calc-fc-8',
    category: 'Module 2: The Derivative & Rules',
    title: 'Linear Approximation (Tangent Line)',
    frontPrompt: 'What is the Linear Approximation (Taylor 1st order) $L(x)$ of function $f(x)$ at base point $a$?',
    backFormula: 'L(x) = f(a) + f\'(a)(x - a)',
    backExplanation: 'Approximates a non-linear curve locally using the tangent line passing through $(a, f(a))$. For $x \\approx a$, $f(x) \\approx L(x)$.',
    remark: 'The error $|f(x) - L(x)|$ is bounded by $\\frac{1}{2} M (x - a)^2$ where $M$ bounds $|f\'\'(t)|$.',
    useCase: 'First-order gradient descent updates: $f(x - \\alpha g) \\approx f(x) - \\alpha \\|g\\|^2$.'
  },

  // ================= Module 3: Transcendental Functions =================
  {
    id: 'calc-fc-9',
    category: 'Module 3: Transcendental Functions',
    title: 'Natural Exponential Derivative',
    frontPrompt: 'What is the derivative of the natural exponential function $f(x) = e^x$ and general base $a^x$?',
    backFormula: '\\frac{d}{dx}[e^x] = e^x, \\quad \\frac{d}{dx}[a^x] = a^x \\ln(a)',
    backExplanation: '$e^x$ is the unique non-trivial mathematical function that is its own derivative everywhere, reflecting rate of growth proportional to current size.',
    remark: 'With chain rule: $\\frac{d}{dx}[e^{u(x)}] = e^{u(x)} \\cdot u\'(x)$.',
    useCase: 'Softmax activation gradients and Gaussian probability density calculations.'
  },
  {
    id: 'calc-fc-10',
    category: 'Module 3: Transcendental Functions',
    title: 'Natural Logarithm Derivative',
    frontPrompt: 'State the derivative of $\\ln(x)$ and general base logarithm $\\log_a(x)$.',
    backFormula: '\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x} \\; (x > 0), \\quad \\frac{d}{dx}[\\log_a(x)] = \\frac{1}{x \\ln(a)}',
    backExplanation: 'Differentiating the natural logarithm produces the inverse function $1/x$. With chain rule: $\\frac{d}{dx}[\\ln(u(x))] = \\frac{u\'(x)}{u(x)}$ (Logarithmic Derivative).',
    remark: '$\\frac{d}{dx}[\\ln|x|] = \\frac{1}{x}$ holds for all non-zero $x \\neq 0$.',
    useCase: 'Cross-entropy loss differentiation: $\\frac{\\partial}{\\partial p}[-\\log p] = -1/p$.'
  },
  {
    id: 'calc-fc-11',
    category: 'Module 3: Transcendental Functions',
    title: 'Trigonometric Derivatives',
    frontPrompt: 'State the derivatives of the core trigonometric functions: $\\sin x, \\cos x$, and $\\tan x$.',
    backFormula: '\\frac{d}{dx}[\\sin x] = \\cos x, \\quad \\frac{d}{dx}[\\cos x] = -\\sin x, \\quad \\frac{d}{dx}[\\tan x] = \\sec^2 x',
    backExplanation: 'Cyclic differentiation properties: Differentiating sine gives cosine; differentiating cosine yields negative sine. Tangent derivative follows from quotient rule.',
    remark: 'Notice: all co-functions ($\\cos, \\cot, \\csc$) have a negative sign in their derivatives.',
    useCase: 'Fourier analysis, positional embeddings in Transformers (RoPE), and periodic activation modeling.'
  },

  // ================= Module 4: Product, Quotient & Chain Rules =================
  {
    id: 'calc-fc-12',
    category: 'Module 4: Product, Quotient & Chain Rules',
    title: 'The Product Rule',
    frontPrompt: 'State the Product Rule for differentiating $f(x) = u(x) v(x)$ and explain why it is NOT $u\'(x) v\'(x)$.',
    backFormula: '\\frac{d}{dx}[u \\cdot v] = u\' v + u v\'',
    backExplanation: 'As area of rectangle $u \\times v$ expands, width increases by $\\Delta u$ and height increases by $\\Delta v$. The net expansion rate contains both $u \\Delta v$ and $v \\Delta u$.',
    remark: 'Extended product rule: $(u v w)\' = u\' v w + u v\' w + u v w\'$.',
    useCase: 'Differentiating weighted likelihood expressions: $L(\\theta) = p(x) q(x)$.'
  },
  {
    id: 'calc-fc-13',
    category: 'Module 4: Product, Quotient & Chain Rules',
    title: 'The Quotient Rule',
    frontPrompt: 'State the Quotient Rule for differentiating ratio $f(x) = \\frac{u(x)}{v(x)}$ with $v(x) \\neq 0$.',
    backFormula: '\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u\' v - u v\'}{v^2}',
    backExplanation: 'Mnemonic: "Low d-High minus High d-Low, over the square of what\'s below". Derived by rewriting $\\frac{u}{v} = u \\cdot v^{-1}$ and applying Product + Chain rules.',
    remark: 'The order in the numerator is strict: $u\' v - u v\' \\neq u v\' - u\' v$.',
    useCase: 'Sigmoid activation derivative: $\\sigma(z) = \\frac{1}{1 + e^{-z}} \\implies \\sigma\'(z) = \\sigma(z)(1 - \\sigma(z))$.'
  },
  {
    id: 'calc-fc-14',
    category: 'Module 4: Product, Quotient & Chain Rules',
    title: 'The Chain Rule',
    frontPrompt: 'State the Chain Rule for composite function $f(g(x))$ in both function and Leibniz notation.',
    backFormula: '\\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x), \\quad \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}',
    backExplanation: 'Differentiate outer function evaluated at inner unchanged, then multiply by the derivative of the inner function. Propagates instantaneous sensitivity.',
    remark: 'The Chain Rule is the single mathematical engine of backpropagation in deep learning.',
    useCase: 'Backpropagation error gradient propagation across neural network layers.'
  },

  // ================= Module 5: Implicit Differentiation & Related Rates =================
  {
    id: 'calc-fc-15',
    category: 'Module 5: Implicit Differentiation & Related Rates',
    title: 'Implicit Differentiation Technique',
    frontPrompt: 'How do you find $\\frac{dy}{dx}$ when an equation defines $y$ implicitly in terms of $x$ (e.g. $x^2 + y^2 = r^2$)?',
    backFormula: '\\frac{d}{dx}[x^2 + y^2] = 2x + 2y \\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx} = -\\frac{x}{y}',
    backExplanation: 'Differentiate both sides of the equation with respect to $x$, applying the Chain Rule whenever differentiating a term involving $y$ (treating $y$ as $y(x)$), then solve algebraically for $\\frac{dy}{dx}$.',
    remark: 'Alternative via partial derivatives: $\\frac{dy}{dx} = -\\frac{F_x}{F_y}$ for level curve $F(x, y) = 0$.',
    useCase: 'Implicit neural representation layers and constrained optimization manifolds.'
  },
  {
    id: 'calc-fc-16',
    category: 'Module 5: Implicit Differentiation & Related Rates',
    title: 'Related Rates Problem Framework',
    frontPrompt: 'What are the core steps to solving Related Rates problems where multiple variables change with respect to time $t$?',
    backFormula: '\\frac{d}{dt}[F(x, y)] = \\frac{\\partial F}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial F}{\\partial y}\\frac{dy}{dt} = 0',
    backExplanation: '(1) Draw a diagram & assign variables. (2) Formulate a geometric constraint equation linking variables. (3) Differentiate both sides with respect to time $t$ using Chain Rule. (4) Substitute known numerical values at the instant of interest and solve for unknown rate.',
    remark: 'Never substitute instantaneous constants BEFORE differentiating—only after!',
    useCase: 'Dynamic physical tracking and real-time state estimation in robotics.'
  },
  {
    id: 'calc-fc-17',
    category: 'Module 5: Implicit Differentiation & Related Rates',
    title: 'Sliding Ladder Instantaneous Rate',
    frontPrompt: 'For a ladder of length $L$ sliding down a vertical wall ($x^2 + y^2 = L^2$), express $\\frac{dy}{dt}$ in terms of $\\frac{dx}{dt}$.',
    backFormula: '2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} = 0 \\implies \\frac{dy}{dt} = -\\frac{x}{y} \\frac{dx}{dt}',
    backExplanation: 'As the base moves away from the wall ($dx/dt > 0$), the top descends down the wall ($dy/dt < 0$). As height $y \\to 0$, downward velocity $|dy/dt| \\to \\infty$.',
    remark: 'Shows how non-linear geometric relationships produce non-linear rate accelerations.',
    useCase: 'Inverse kinematics for robotic arms and linkage motion planning.'
  }
];
