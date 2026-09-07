export interface StatQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface StatQuizModuleData {
  id: string;
  moduleNumber: number;
  title: string;
  badge: string;
  sub: string;
  questions: StatQuizQuestion[];
}

export const STAT_QUIZ_MODULES: Record<string, StatQuizModuleData> = {
  m1: {
    id: 'm1',
    moduleNumber: 1,
    title: 'Module 1: Probability Space & Random Variables',
    badge: 'Probability Space',
    sub: 'Sample Space, CDF Properties & Measurability',
    questions: [
      {
        id: 'm1_1',
        question: 'Define a formal probability space $(\\Omega, \\mathcal{F}, P)$ for flipping a fair coin indefinitely until the first "Heads" appears. What is $P(X \\text{ is even})$, where $X$ is the total number of flips?',
        options: [
          '$\\frac{1}{2}$',
          '$\\frac{1}{3}$',
          '$\\frac{1}{4}$',
          '$\\frac{2}{3}$'
        ],
        correct: 1,
        explanation: 'Sample space: $\\Omega = \\{H, TH, TTH, TTTH, \\dots\\} = \\{T^{k-1}H \\mid k \\in \\mathbb{N}^+\\}$.\\\\Event space $\\mathcal{F} = \\mathcal{P}(\\Omega)$ (power set of $\\Omega$).\\\\Since the coin is fair, $P(X = k) = \\left(\\frac{1}{2}\\right)^k$.\\\\To find $P(X \\text{ is even})$, sum over even $k = 2, 4, 6, \\dots$:\\\\$$P(X \\text{ is even}) = \\sum_{m=1}^{\\infty} P(X = 2m) = \\sum_{m=1}^{\\infty} \\left(\\frac{1}{2}\\right)^{2m} = \\sum_{m=1}^{\\infty} \\left(\\frac{1}{4}\\right)^m$$\\\\Applying the geometric series formula $\\frac{a}{1 - r}$ with $a = \\frac{1}{4}$ and $r = \\frac{1}{4}$:\\\\$$P(X \\text{ is even}) = \\frac{\\frac{1}{4}}{1 - \\frac{1}{4}} = \\frac{\\frac{1}{4}}{\\frac{3}{4}} = \\mathbf{\\frac{1}{3}}$$'
      },
      {
        id: 'm1_2',
        question: 'Which property holds for any cumulative distribution function $F_X(x) = P(X \\le x)$ when computing the probability interval $P(a < X \\le b)$?',
        options: [
          '$F_X(b) - F_X(a)$',
          '$F_X(b) + F_X(a)$',
          '$1 - F_X(b) + F_X(a)$',
          '$F_X(b) - F_X(a) + P(X = a)$'
        ],
        correct: 0,
        explanation: 'The event $(X \\le b)$ can be decomposed into two disjoint sets: $(X \\le a)$ and $(a < X \\le b)$.\\\\By countable additivity (Kolmogorov\'s 3rd Axiom):\\\\$$P(X \\le b) = P(X \\le a) + P(a < X \\le b)$$\\\\Rearranging terms and applying the formal definition $F_X(x) = P(X \\le x)$:\\\\$$P(a < X \\le b) = P(X \\le b) - P(X \\le a) = \\mathbf{F_X(b) - F_X(a)}$$'
      },
      {
        id: 'm1_3',
        question: 'Let $X$ be a continuous random variable with a PDF symmetric about zero ($f_X(x) = f_X(-x)$). Which identity does its CDF $F_X(x)$ satisfy for all $x$?',
        options: [
          '$F_X(-x) = -F_X(x)$',
          '$F_X(-x) = 1 - F_X(x)$',
          '$F_X(-x) = F_X(x) - 1$',
          '$F_X(-x) = \\frac{1}{2} F_X(x)$'
        ],
        correct: 1,
        explanation: 'By definition: $F_X(-x) = \\int_{-\\infty}^{-x} f_X(t) \\, dt$.\\\\Substitute $u = -t \\implies du = -dt$. The integral limits change from $(-\\infty, -x)$ to $(\\infty, x)$:\\\\$$F_X(-x) = \\int_{\\infty}^{x} f_X(-u) \\, (-du) = \\int_{x}^{\\infty} f_X(-u) \\, du$$\\\\By symmetry, $f_X(-u) = f_X(u)$:\\\\$$F_X(-x) = \\int_{x}^{\\infty} f_X(u) \\, du$$\\\\Since total probability integrates to $1$, $\\int_{x}^{\\infty} f_X(u) \\, du = 1 - \\int_{-\\infty}^{x} f_X(u) \\, du = \\mathbf{1 - F_X(x)}$.'
      },
      {
        id: 'm1_4',
        question: 'Let $X: \\Omega \\to \\mathbb{R}$ be a formal random variable. What mathematical condition must the pre-image $X^{-1}(B)$ satisfy for any Borel set $B \\subseteq \\mathbb{R}$?',
        options: [
          '$X^{-1}(B)$ must be an open subset of $\\mathbb{R}$',
          '$X^{-1}(B) \\in \\mathcal{F}$ (it must be a measurable event in event space $\\mathcal{F}$)',
          '$X^{-1}(B)$ must have strictly non-zero probability measure $P(X^{-1}(B)) > 0$',
          '$X^{-1}(B)$ must contain only countably many sample outcomes'
        ],
        correct: 1,
        explanation: 'The pre-image $X^{-1}(B) = \\{\\omega \\in \\Omega \\mid X(\\omega) \\in B\\}$ must be a measurable event in the event space $\\mathcal{F}$ (i.e., $X^{-1}(B) \\in \\mathcal{F}$).\\\\If this condition were violated, the probability measure $P$ could not evaluate $P(X \\in B) = P(X^{-1}(B))$, failing the formal definition of a random variable.'
      },
      {
        id: 'm1_5',
        question: 'Let $X$ be a continuous random variable with PDF $f_X(x)$, and let $Y = X^2$. What is the derived PDF $f_Y(y)$ for $y > 0$?',
        options: [
          '$f_Y(y) = 2\\sqrt{y} f_X(\\sqrt{y})$',
          '$f_Y(y) = \\frac{f_X(\\sqrt{y}) + f_X(-\\sqrt{y})}{2\\sqrt{y}}$',
          '$f_Y(y) = \\frac{f_X(\\sqrt{y}) - f_X(-\\sqrt{y})}{2\\sqrt{y}}$',
          '$f_Y(y) = \\frac{f_X(y^2)}{2y}$'
        ],
        correct: 1,
        explanation: 'Express the CDF of $Y$:\\\\$$F_Y(y) = P(Y \\le y) = P(X^2 \\le y) = P(-\\sqrt{y} \\le X \\le \\sqrt{y}) = F_X(\\sqrt{y}) - F_X(-\\sqrt{y})$$\\\\Differentiate $F_Y(y)$ with respect to $y$ using the chain rule to obtain $f_Y(y)$:\\\\$$f_Y(y) = \\frac{d}{dy} \\left[ F_X(\\sqrt{y}) - F_X(-\\sqrt{y}) \\right] = f_X(\\sqrt{y}) \\cdot \\frac{1}{2\\sqrt{y}} - f_X(-\\sqrt{y}) \\cdot \\left(-\\frac{1}{2\\sqrt{y}}\\right)$$$$\\mathbf{f_Y(y) = \\frac{f_X(\\sqrt{y}) + f_X(-\\sqrt{y})}{2\\sqrt{y}} \\quad \\text{for } y > 0}$$'
      }
    ]
  },

  m2: {
    id: 'm2',
    moduleNumber: 2,
    title: 'Module 2: Probability Distributions',
    badge: 'Distributions',
    sub: 'Binomial, Gaussian, Poisson Limit & Memoryless',
    questions: [
      {
        id: 'm2_1',
        question: 'Derive the expectation $\\mathbb{E}[X]$ of a Binomial random variable $X \\sim \\text{Binomial}(n, p)$ directly using indicator variables.',
        options: [
          '$np(1 - p)$',
          '$np$',
          '$\\frac{p}{n}$',
          '$\\sqrt{np}$'
        ],
        correct: 1,
        explanation: 'Express $X$ as the sum of $n$ independent Bernoulli trials: $X = \\sum_{i=1}^n Y_i$, where $Y_i \\sim \\text{Bernoulli}(p)$.\\\\Compute the expectation of a single indicator $Y_i$:\\\\$$\\mathbb{E}[Y_i] = (1 \\cdot p) + (0 \\cdot (1-p)) = p$$\\\\By Linearity of Expectation:\\\\$$\\mathbb{E}[X] = \\mathbb{E}\\left[ \\sum_{i=1}^n Y_i \\right] = \\sum_{i=1}^n \\mathbb{E}[Y_i] = \\sum_{i=1}^n p = \\mathbf{n p}$$'
      },
      {
        id: 'm2_2',
        question: 'Evaluate the normalizing constant $C$ for $f(x) = C \\exp\\left(-\\frac{x^2}{2\\sigma^2}\\right)$ over $x \\in (-\\infty, \\infty)$ using polar coordinates.',
        options: [
          '$C = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}$',
          '$C = \\frac{1}{2\\pi\\sigma^2}$',
          '$C = \\frac{\\sqrt{2\\pi}}{\\sigma}$',
          '$C = \\frac{1}{\\sqrt{\\pi}\\sigma^2}$'
        ],
        correct: 0,
        explanation: 'Set $I = \\int_{-\\infty}^{\\infty} e^{-x^2 / (2\\sigma^2)} \\, dx$. Consider $I^2$:\\\\$$I^2 = \\left( \\int_{-\\infty}^{\\infty} e^{-x^2 / (2\\sigma^2)} dx \\right) \\left( \\int_{-\\infty}^{\\infty} e^{-y^2 / (2\\sigma^2)} dy \\right) = \\int_{-\\infty}^{\\infty} \\int_{-\\infty}^{\\infty} e^{-\\frac{x^2+y^2}{2\\sigma^2}} dx \\, dy$$\\\\Convert to polar coordinates ($x = r\\cos\\theta, y = r\\sin\\theta, dx\\,dy = r\\,dr\\,d\\theta$):\\\\$$I^2 = \\int_0^{2\\pi} d\\theta \\int_0^{\\infty} r e^{-\\frac{r^2}{2\\sigma^2}} dr = 2\\pi \\left[ -\\sigma^2 e^{-\\frac{r^2}{2\\sigma^2}} \\right]_0^{\\infty} = 2\\pi \\sigma^2$$\\\\Thus $I = \\sqrt{2\\pi\\sigma^2}$. Since $\\int f(x) dx = 1 \\implies C \\cdot I = 1$, we get $\\mathbf{C = \\frac{1}{\\sqrt{2\\pi\\sigma^2}}}$.'
      },
      {
        id: 'm2_3',
        question: 'Under the Poisson Limit Theorem, what does the Binomial PMF converge to as $n \\to \\infty$ and $p \\to 0$ with $\\lambda = np$ held constant?',
        options: [
          '$\\frac{\\lambda^k e^{-\\lambda}}{k!}$',
          '$\\frac{1}{\\sqrt{2\\pi\\lambda}} e^{-\\frac{(k-\\lambda)^2}{2\\lambda}}$',
          '$\\lambda e^{-\\lambda k}$',
          '$\\binom{n}{k} \\lambda^k (1-\\lambda)^{n-k}$'
        ],
        correct: 0,
        explanation: 'Substitute $p = \\frac{\\lambda}{n}$ into the Binomial PMF:\\\\$$P(X = k) = \\frac{n!}{k!(n-k)!} \\left(\\frac{\\lambda}{n}\\right)^k \\left(1 - \\frac{\\lambda}{n}\\right)^{n-k} = \\frac{\\lambda^k}{k!} \\left[ \\frac{n(n-1)\\dots(n-k+1)}{n^k} \\right] \\left(1 - \\frac{\\lambda}{n}\\right)^n \\left(1 - \\frac{\\lambda}{n}\\right)^{-k}$$\\\\Take the limit as $n \\to \\infty$:\\\\$\\lim_{n \\to \\infty} \\frac{n(n-1)\\dots(n-k+1)}{n^k} = 1$\\\\$\\lim_{n \\to \\infty} \\left(1 - \\frac{\\lambda}{n}\\right)^n = e^{-\\lambda}$\\\\$\\lim_{n \\to \\infty} \\left(1 - \\frac{\\lambda}{n}\\right)^{-k} = 1$\\\\Multiplying limits yields: $\\mathbf{P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}}$.'
      },
      {
        id: 'm2_4',
        question: 'For an Exponentially distributed random variable $X \\sim \\text{Exp}(\\lambda)$, which identity demonstrates its memoryless property?',
        options: [
          '$P(X > s + t \\mid X > s) = P(X > t)$',
          '$P(X > s + t \\mid X > s) = P(X > s) P(X > t)$',
          '$P(X > s + t \\mid X > s) = P(X > s + t)$',
          '$P(X > s + t \\mid X > s) = 1 - e^{-\\lambda(s+t)}$'
        ],
        correct: 0,
        explanation: 'For $X \\sim \\text{Exp}(\\lambda)$, $P(X > x) = \\int_{x}^{\\infty} \\lambda e^{-\\lambda u} du = e^{-\\lambda x}$.\\\\Apply conditional probability:\\\\$$P(X > s + t \\mid X > s) = \\frac{P(X > s + t \\cap X > s)}{P(X > s)} = \\frac{P(X > s + t)}{P(X > s)}$$\\\\Substitute $e^{-\\lambda x}$:\\\\$$P(X > s + t \\mid X > s) = \\frac{e^{-\\lambda(s+t)}}{e^{-\\lambda s}} = e^{-\\lambda t} = \\mathbf{P(X > t)}$$'
      },
      {
        id: 'm2_5',
        question: 'Compute $\\text{Var}(X)$ for a continuous uniform distribution $X \\sim \\text{Uniform}(a, b)$.',
        options: [
          '$\\frac{(b-a)^2}{12}$',
          '$\\frac{(b-a)^2}{6}$',
          '$\\frac{b^2 - a^2}{12}$',
          '$\\frac{a+b}{2}$'
        ],
        correct: 0,
        explanation: '$\\mathbb{E}[X] = \\int_{a}^{b} \\frac{x}{b-a} dx = \\frac{b^2 - a^2}{2(b-a)} = \\frac{a+b}{2}$.\\\\$\\mathbb{E}[X^2] = \\int_{a}^{b} \\frac{x^2}{b-a} dx = \\frac{b^3 - a^3}{3(b-a)} = \\frac{a^2 + ab + b^2}{3}$.\\\\Calculate variance:\\\\$$\\text{Var}(X) = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2 = \\frac{a^2 + ab + b^2}{3} - \\frac{a^2 + 2ab + b^2}{4} = \\mathbf{\\frac{(b-a)^2}{12}}$$'
      }
    ]
  },

  m3: {
    id: 'm3',
    moduleNumber: 3,
    title: 'Module 3: Expectation, Variance & Covariance',
    badge: 'Moments & Variance',
    sub: 'Uncorrelated vs Independent, Bilinearity & Cauchy-Schwarz',
    questions: [
      {
        id: 'm3_1',
        question: 'Which explicit example demonstrates that zero covariance ($\\text{Cov}(X,Y) = 0$) does not imply independence?',
        options: [
          '$X \\sim \\text{Bernoulli}(0.5)$ and $Y = 1 - X$',
          '$X \\sim \\text{Uniform}(-1, 1)$ and $Y = X^2$',
          '$X \\sim \\mathcal{N}(0, 1)$ and $Y = 2X$',
          '$X, Y \\stackrel{iid}{\\sim} \\text{Exp}(1)$'
        ],
        correct: 1,
        explanation: 'Let $X \\sim \\text{Uniform}(-1, 1)$, so $\\mathbb{E}[X] = 0$. Let $Y = X^2$.\\\\$Y$ is completely deterministic and dependent on $X$.\\\\Compute covariance: $\\text{Cov}(X, Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y]$.\\\\$\\mathbb{E}[XY] = \\mathbb{E}[X \\cdot X^2] = \\mathbb{E}[X^3] = \\int_{-1}^1 \\frac{x^3}{2} dx = 0$.\\\\Thus $\\text{Cov}(X, Y) = 0 - (0)\\mathbb{E}[Y] = \\mathbf{0}$. Zero linear dependence does not imply independence.'
      },
      {
        id: 'm3_2',
        question: 'Derive the formula for $\\text{Var}(X + Y)$ when $X$ and $Y$ are correlated random variables.',
        options: [
          '$\\text{Var}(X) + \\text{Var}(Y)$',
          '$\\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X, Y)$',
          '$\\text{Var}(X) + \\text{Var}(Y) - 2\\text{Cov}(X, Y)$',
          '$(\\text{Var}(X) + \\text{Var}(Y))^2 + \\text{Cov}(X, Y)$'
        ],
        correct: 1,
        explanation: 'Let $\\mu_x = \\mathbb{E}[X]$ and $\\mu_y = \\mathbb{E}[Y]$.\\\\$$\\text{Var}(X+Y) = \\mathbb{E}\\left[ ((X+Y) - (\\mu_x + \\mu_y))^2 \\right] = \\mathbb{E}\\left[ ((X-\\mu_x) + (Y-\\mu_y))^2 \\right]$$\\\\Expand the quadratic term:\\\\$$\\text{Var}(X+Y) = \\mathbb{E}\\left[ (X-\\mu_x)^2 + (Y-\\mu_y)^2 + 2(X-\\mu_x)(Y-\\mu_y) \\right]$$\\\\Apply Linearity of Expectation:\\\\$$\\text{Var}(X+Y) = \\mathbb{E}[(X-\\mu_x)^2] + \\mathbb{E}[(Y-\\mu_y)^2] + 2\\mathbb{E}[(X-\\mu_x)(Y-\\mu_y)]$$$$\\mathbf{\\text{Var}(X+Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X, Y)}$$'
      },
      {
        id: 'm3_3',
        question: 'By the bilinear property of covariance, what does $\\text{Cov}(aX + bY, Z)$ expand to?',
        options: [
          '$a\\text{Cov}(X, Z) + b\\text{Cov}(Y, Z)$',
          '$ab\\text{Cov}(X + Y, Z)$',
          '$a^2\\text{Cov}(X, Z) + b^2\\text{Cov}(Y, Z)$',
          '$\\text{Cov}(X, Z) + \\text{Cov}(Y, Z)$'
        ],
        correct: 0,
        explanation: 'Apply covariance expansion $\\text{Cov}(U, Z) = \\mathbb{E}[UZ] - \\mathbb{E}[U]\\mathbb{E}[Z]$:\\\\$$\\text{Cov}(aX + bY, Z) = \\mathbb{E}[(aX + bY)Z] - \\mathbb{E}[aX + bY]\\mathbb{E}[Z]$$\\\\Distribute terms using linearity of expectation:\\\\$$\\mathbb{E}[aXZ + bYZ] - (a\\mathbb{E}[X] + b\\mathbb{E}[Y])\\mathbb{E}[Z] = a\\mathbb{E}[XZ] + b\\mathbb{E}[YZ] - a\\mathbb{E}[X]\\mathbb{E}[Z] - b\\mathbb{E}[Y]\\mathbb{E}[Z]$$\\\\Group terms by coefficients $a$ and $b$:\\\\$$a(\\mathbb{E}[XZ] - \\mathbb{E}[X]\\mathbb{E}[Z]) + b(\\mathbb{E}[YZ] - \\mathbb{E}[Y]\\mathbb{E}[Z]) = \\mathbf{a\\text{Cov}(X, Z) + b\\text{Cov}(Y, Z)}$$'
      },
      {
        id: 'm3_4',
        question: 'Prove that the Pearson correlation coefficient is strictly bounded: $-1 \\le \\rho_{X,Y} \\le 1$. What fundamental property guarantees this?',
        options: [
          'Because the sum of variances of standardized variables equals 1.',
          'Because the variance of any linear combination is non-negative: $\\text{Var}(Z_X \\pm Z_Y) \\ge 0 \\implies 1 + 1 \\pm 2\\rho_{X,Y} \\ge 0$.',
          'Because probability measure is bounded on $[0, 1]$.',
          'Because the determinant of covariance matrices is always strictly negative.'
        ],
        correct: 1,
        explanation: 'Let $Z_X = \\frac{X - \\mu_X}{\\sigma_X}$ and $Z_Y = \\frac{Y - \\mu_Y}{\\sigma_Y}$ be standardized variables with $\\rho_{X,Y} = \\mathbb{E}[Z_X Z_Y]$.\\\\Since variance is always non-negative:\\\\$$\\text{Var}(Z_X + Z_Y) \\ge 0 \\implies \\text{Var}(Z_X) + \\text{Var}(Z_Y) + 2\\text{Cov}(Z_X, Z_Y) \\ge 0 \\implies 1 + 1 + 2\\rho_{X,Y} \\ge 0 \\implies \\rho_{X,Y} \\ge -1$$\\\\Similarly, for $Z_X - Z_Y$:\\\\$$\\text{Var}(Z_X - Z_Y) \\ge 0 \\implies 1 + 1 - 2\\rho_{X,Y} \\ge 0 \\implies \\rho_{X,Y} \\le 1$$\\\\Combining bounds yields $\\mathbf{-1 \\le \\rho_{X,Y} \\le 1}$.'
      },
      {
        id: 'm3_5',
        question: 'Which equation correctly states the Law of Total Variance decomposing $\\text{Var}(X)$ using conditional expectation given $Y$?',
        options: [
          '$\\text{Var}(X) = \\mathbb{E}[\\text{Var}(X \\mid Y)] + \\text{Var}(\\mathbb{E}[X \\mid Y])$',
          '$\\text{Var}(X) = \\text{Var}(\\text{Var}(X \\mid Y)) + \\mathbb{E}[\\mathbb{E}[X \\mid Y]]$',
          '$\\text{Var}(X) = \\mathbb{E}[\\text{Var}(X \\mid Y)] - \\text{Var}(\\mathbb{E}[X \\mid Y])$',
          '$\\text{Var}(X) = \\text{Var}(X \\mid Y) + \\mathbb{E}[X \\mid Y]$'
        ],
        correct: 0,
        explanation: '$$\\mathbf{\\text{Var}(X) = \\mathbb{E}[\\text{Var}(X \\mid Y)] + \\text{Var}(\\mathbb{E}[X \\mid Y])}$$\\\\Interpretation: Total variance equals the average within-group variance plus the variance between group means (Eve\'s Law).'
      }
    ]
  },

  m4: {
    id: 'm4',
    moduleNumber: 4,
    title: 'Module 4: Joint, Marginal & Conditional Distributions',
    badge: 'Multivariate',
    sub: 'Joint Density, Conditioning, Bivariate Normal & Jacobians',
    questions: [
      {
        id: 'm4_1',
        question: 'Given the joint density $f_{X,Y}(x, y) = c(x + y)$ over the unit square $0 \\le x \\le 1, 0 \\le y \\le 1$, evaluate the normalizing constant $c$.',
        options: [
          '$c = 2$',
          '$c = 1$',
          '$c = \\frac{1}{2}$',
          '$c = \\frac{3}{2}$'
        ],
        correct: 1,
        explanation: 'Integrate over the unit square and set total probability to $1$:\\\\$$\\int_0^1 \\int_0^1 c(x+y) \\, dx \\, dy = c \\int_0^1 \\left[ \\frac{x^2}{2} + xy \\right]_0^1 dy = c \\int_0^1 \\left( \\frac{1}{2} + y \\right) dy = c \\left[ \\frac{y}{2} + \\frac{y^2}{2} \\right]_0^1 = c(1) = 1$$\\\\Thus, $\\mathbf{c = 1}$.'
      },
      {
        id: 'm4_2',
        question: 'Using $f_{X,Y}(x, y) = x + y$ over $[0, 1]^2$, compute the marginal $f_X(x)$ and determine if $X$ and $Y$ are independent.',
        options: [
          '$f_X(x) = x + \\frac{1}{2}$; $X$ and $Y$ are independent',
          '$f_X(x) = x + \\frac{1}{2}$; $X$ and $Y$ are dependent',
          '$f_X(x) = 2x$; $X$ and $Y$ are dependent',
          '$f_X(x) = 1$; $X$ and $Y$ are independent'
        ],
        correct: 1,
        explanation: 'Integrate out $y$:\\\\$$f_X(x) = \\int_0^1 (x + y) \\, dy = \\left[ xy + \\frac{y^2}{2} \\right]_0^1 = \\mathbf{x + \\frac{1}{2}} \\quad \\text{for } 0 \\le x \\le 1$$\\\\By symmetry, $f_Y(y) = y + \\frac{1}{2}$.\\\\Check independence: $f_X(x) f_Y(y) = (x + 1/2)(y + 1/2) = xy + 0.5x + 0.5y + 0.25 \\neq x + y$.\\\\Since $f_{X,Y}(x, y) \\neq f_X(x) f_Y(y)$, $X$ and $Y$ are dependent.'
      },
      {
        id: 'm4_3',
        question: 'Compute $\\mathbb{E}[Y \\mid X = x]$ using the joint density $f_{X,Y}(x, y) = x + y$ for $x \\in [0, 1]$.',
        options: [
          '$\\frac{3x + 2}{6x + 3}$',
          '$\\frac{x + 1}{2x + 1}$',
          '$\\frac{2x + 1}{4x + 2}$',
          '$\\frac{x^2 + 1}{3x + 1}$'
        ],
        correct: 0,
        explanation: 'Find conditional PDF: $f_{Y\\mid X}(y \\mid x) = \\frac{f_{X,Y}(x,y)}{f_X(x)} = \\frac{x + y}{x + 1/2}$.\\\\Integrate $y \\cdot f_{Y\\mid X}(y \\mid x)$ over $y \\in [0, 1]$:\\\\$$\\mathbb{E}[Y \\mid X = x] = \\int_0^1 y \\left( \\frac{x + y}{x + 1/2} \\right) dy = \\frac{1}{x + 1/2} \\int_0^1 (xy + y^2) \\, dy = \\frac{1}{x + 1/2} \\left[ \\frac{xy^2}{2} + \\frac{y^3}{3} \\right]_0^1$$$$\\mathbf{\\mathbb{E}[Y \\mid X = x] = \\frac{\\frac{x}{2} + \\frac{1}{3}}{x + \\frac{1}{2}} = \\frac{3x + 2}{6x + 3}}$$'
      },
      {
        id: 'm4_4',
        question: 'Given a zero-mean Bivariate Normal vector $\\begin{bmatrix}X \\\\ Y\\end{bmatrix} \\sim \\mathcal{N}\\left(\\begin{bmatrix}0\\\\0\\end{bmatrix}, \\begin{bmatrix}\\sigma_x^2 & \\rho\\sigma_x\\sigma_y \\\\ \\rho\\sigma_x\\sigma_y & \\sigma_y^2\\end{bmatrix}\\right)$, what is the conditional distribution of $Y \\mid X = x$?',
        options: [
          '$\\mathcal{N}\\left(\\rho \\frac{\\sigma_y}{\\sigma_x} x, \\, \\sigma_y^2(1 - \\rho^2)\\right)$',
          '$\\mathcal{N}\\left(\\rho x, \\, \\sigma_y^2\\right)$',
          '$\\mathcal{N}\\left(\\frac{\\sigma_x}{\\sigma_y} x, \\, \\sigma_x^2(1 - \\rho^2)\\right)$',
          '$\\mathcal{N}\\left(0, \\, \\sigma_y^2(1 - \\rho)\\right)$'
        ],
        correct: 0,
        explanation: '$Y \\mid X = x$ is Gaussian with conditional mean and variance:\\\\$$\\mu_{Y\\mid X} = \\mu_Y + \\rho \\frac{\\sigma_y}{\\sigma_x}(x - \\mu_X) = \\mathbf{\\rho \\frac{\\sigma_y}{\\sigma_x} x}$$$$\\sigma_{Y\\mid X}^2 = \\sigma_y^2 (1 - \\rho^2) = \\mathbf{\\sigma_y^2 (1 - \\rho^2)}$$\\\\So $(Y \\mid X = x) \\sim \\mathbf{\\mathcal{N}\\left(\\rho \\frac{\\sigma_y}{\\sigma_x} x, \\, \\sigma_y^2(1 - \\rho^2)\\right)}$.'
      },
      {
        id: 'm4_5',
        question: 'Let $X, Y \\stackrel{iid}{\\sim} \\text{Exp}(1)$ and let $U = X + Y, V = X / Y$. What is the absolute Jacobian determinant $|J|$ used to convert $f_{X,Y}(x,y)$ to $f_{U,V}(u,v)$?',
        options: [
          '$|J| = \\frac{u}{(v+1)^2}$',
          '$|J| = \\frac{v}{(u+1)^2}$',
          '$|J| = \\frac{1}{(v+1)^2}$',
          '$|J| = \\frac{uv}{v+1}$'
        ],
        correct: 0,
        explanation: 'Express $X, Y$ in terms of $U, V$: $V = \\frac{X}{Y} \\implies X = VY$. Since $U = X + Y = VY + Y = Y(V + 1)$, we get:\\\\$$Y = \\frac{U}{V+1}, \\quad X = \\frac{UV}{V+1}$$\\\\Compute the Jacobian matrix $J = \\begin{bmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{bmatrix}$:\\\\$$\\frac{\\partial x}{\\partial u} = \\frac{v}{v+1}, \\quad \\frac{\\partial x}{\\partial v} = \\frac{u(v+1) - uv}{(v+1)^2} = \\frac{u}{(v+1)^2}$$$$\\frac{\\partial y}{\\partial u} = \\frac{1}{v+1}, \\quad \\frac{\\partial y}{\\partial v} = -\\frac{u}{(v+1)^2}$$\\\\Calculate determinant $|J|$:\\\\$$|J| = \\left| \\left(\\frac{v}{v+1}\\right)\\left(-\\frac{u}{(v+1)^2}\\right) - \\left(\\frac{u}{(v+1)^2}\\right)\\left(\\frac{1}{v+1}\\right) \\right| = \\left| -\\frac{uv + u}{(v+1)^3} \\right| = \\mathbf{\\frac{u}{(v+1)^2}}$$'
      }
    ]
  },

  m5: {
    id: 'm5',
    moduleNumber: 5,
    title: 'Module 5: Central Limit Theorem & Hypothesis Testing',
    badge: 'Inference',
    sub: 'CLT Convergence, Delta Method, Sample Size & p-values',
    questions: [
      {
        id: 'm5_1',
        question: 'State the formal convergence in distribution statement for the Central Limit Theorem.',
        options: [
          '$\\bar{X}_n \\xrightarrow{p} \\mu$',
          '$\\lim_{n \\to \\infty} P\\left(\\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\le z\\right) = \\Phi(z) = \\int_{-\\infty}^z \\frac{1}{\\sqrt{2\\pi}} e^{-t^2/2} dt$',
          '$\\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\text{Uniform}(0, 1)$',
          '$P(|X_n - \\mu| \\ge \\epsilon) \\to 0$'
        ],
        correct: 1,
        explanation: 'For i.i.d. random variables $X_1, \\dots, X_n$ with mean $\\mu$ and variance $\\sigma^2 < \\infty$, define $Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}}$.\\\\Then as $n \\to \\infty$, $Z_n$ converges in distribution to a standard Normal distribution $\\mathcal{N}(0, 1)$:\\\\$$\\mathbf{\\lim_{n \\to \\infty} P(Z_n \\le z) = \\Phi(z) = \\int_{-\\infty}^z \\frac{1}{\\sqrt{2\\pi}} e^{-t^2/2} dt}$$'
      },
      {
        id: 'm5_2',
        question: 'Given $\\sqrt{n}(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2)$, state the asymptotic distribution of a smooth transformation $g(\\bar{X}_n)$ using the Delta Method.',
        options: [
          '$\\sqrt{n}\\left(g(\\bar{X}_n) - g(\\mu)\\right) \\xrightarrow{d} \\mathcal{N}\\left(0, \\, \\sigma^2 [g\'(\\mu)]^2\\right)$',
          '$\\sqrt{n}\\left(g(\\bar{X}_n) - g(\\mu)\\right) \\xrightarrow{d} \\mathcal{N}\\left(0, \\, \\frac{\\sigma^2}{[g\'(\\mu)]^2}\\right)$',
          '$g(\\bar{X}_n) \\xrightarrow{d} \\mathcal{N}(g(\\mu), \\sigma^2)$',
          '$\\sqrt{n}\\left(g(\\bar{X}_n) - g(\\mu)\\right) \\xrightarrow{d} \\mathcal{N}\\left(g\'(\\mu), \\, \\sigma^2\\right)$'
        ],
        correct: 0,
        explanation: 'By first-order Taylor expansion around $\\mu$: $g(\\bar{X}_n) \\approx g(\\mu) + g\'(\\mu)(\\bar{X}_n - \\mu)$.\\\\Multiplying by $\\sqrt{n}$ and taking variance:\\\\$$\\mathbf{\\sqrt{n}\\left(g(\\bar{X}_n) - g(\\mu)\\right) \\xrightarrow{d} \\mathcal{N}\\left(0, \\, \\sigma^2 [g\'(\\mu)]^2\\right)}$$'
      },
      {
        id: 'm5_3',
        question: 'In hypothesis testing, how are Type I error ($\\alpha$), Type II error ($\\beta$), and Statistical Power formally defined?',
        options: [
          '$\\alpha = P(\\text{Reject } H_0 \\mid H_0 \\text{ False})$; $\\beta = P(\\text{Fail to Reject } H_0 \\mid H_0 \\text{ True})$; $\\text{Power} = \\alpha + \\beta$',
          '$\\alpha = P(\\text{Reject } H_0 \\mid H_0 \\text{ True})$; $\\beta = P(\\text{Fail to Reject } H_0 \\mid H_0 \\text{ False})$; $\\text{Power} = 1 - \\beta$',
          '$\\alpha = P(\\text{Fail to Reject } H_0 \\mid H_0 \\text{ True})$; $\\beta = P(\\text{Reject } H_0 \\mid H_0 \\text{ False})$; $\\text{Power} = 1 - \\alpha$',
          '$\\alpha = \\text{Precision}$; $\\beta = \\text{Recall}$; $\\text{Power} = F_1$'
        ],
        correct: 1,
        explanation: 'Type I Error ($\\alpha$): $P(\\text{Reject } H_0 \\mid H_0 \\text{ is True})$ (False Positive).\\\\Type II Error ($\\beta$): $P(\\text{Fail to Reject } H_0 \\mid H_0 \\text{ is False})$ (False Negative).\\\\Statistical Power: $1 - \\beta = P(\\text{Reject } H_0 \\mid H_0 \\text{ is False})$ (True Positive Rate).'
      },
      {
        id: 'm5_4',
        question: 'Derive the minimum sample size $n$ required to achieve significance level $\\alpha$ and power $1 - \\beta$ for a one-sided $Z$-test of $H_0: \\mu = \\mu_0$ vs $H_1: \\mu = \\mu_1 > \\mu_0$.',
        options: [
          '$n = \\frac{(z_\\alpha + z_\\beta)^2 \\sigma^2}{(\\mu_1 - \\mu_0)^2}$',
          '$n = \\frac{(z_\\alpha - z_\\beta)^2 \\sigma^2}{(\\mu_1 - \\mu_0)}$',
          '$n = \\frac{z_\\alpha^2 \\sigma^2}{(\\mu_1 - \\mu_0)^2}$',
          '$n = \\frac{2(z_\\alpha + z_\\beta) \\sigma}{\\mu_1 - \\mu_0}$'
        ],
        correct: 0,
        explanation: 'Rejection region under $H_0$: $\\bar{X} > \\mu_0 + z_{\\alpha} \\frac{\\sigma}{\\sqrt{n}}$.\\\\Power requirement under $H_1$: $P\\left(\\bar{X} > \\mu_0 + z_{\\alpha} \\frac{\\sigma}{\\sqrt{n}} \\;\\middle|\\; \\mu = \\mu_1\\right) = 1 - \\beta$.\\\\Standardize under $H_1$: $P\\left(Z > \\frac{\\mu_0 - \\mu_1}{\\sigma/\\sqrt{n}} + z_{\\alpha}\\right) = 1 - \\beta \\implies \\frac{\\mu_0 - \\mu_1}{\\sigma/\\sqrt{n}} + z_{\\alpha} = -z_{\\beta}$.\\\\Solve for $\\sqrt{n}$: $\\frac{\\mu_1 - \\mu_0}{\\sigma/\\sqrt{n}} = z_{\\alpha} + z_{\\beta} \\implies \\sqrt{n} = \\frac{(z_\\alpha + z_\\beta)\\sigma}{\\mu_1 - \\mu_0}$.\\\\Square both sides: $\\mathbf{n = \\frac{(z_\\alpha + z_\\beta)^2 \\sigma^2}{(\\mu_1 - \\mu_0)^2}}$.'
      },
      {
        id: 'm5_5',
        question: 'Prove that under $H_0$, the $p$-value $P = 1 - F_0(T)$ is uniformly distributed over $[0, 1]$, where $T$ is a continuous test statistic with CDF $F_0$.',
        options: [
          'Standard Normal $\\mathcal{N}(0, 1)$',
          'Standard Uniform $\\text{Uniform}(0, 1)$',
          'Chi-Square with 1 degree of freedom $\\chi^2(1)$',
          'Exponential with rate 1 $\\text{Exp}(1)$'
        ],
        correct: 1,
        explanation: 'Compute the CDF of $P$:\\\\$$F_P(p) = P(P \\le p) = P(1 - F_0(T) \\le p) = P(F_0(T) \\ge 1 - p)$$\\\\Apply $F_0^{-1}$ to both sides (since $F_0$ is monotonically increasing):\\\\$$F_P(p) = P(T \\ge F_0^{-1}(1 - p)) = 1 - P(T \\le F_0^{-1}(1 - p)) = 1 - F_0(F_0^{-1}(1 - p))$$\\\\Simplifying yields $F_P(p) = 1 - (1 - p) = p$.\\\\Since the CDF of $P$ is $F_P(p) = p$ for $p \\in [0, 1]$, $\\mathbf{P \\sim \\text{Uniform}(0, 1)}$.'
      }
    ]
  },

  m6: {
    id: 'm6',
    moduleNumber: 6,
    title: 'Module 6: MLE, MAP & Regularization',
    badge: 'Estimation & MAP',
    sub: 'Gaussian MLE, Prior Regularization, L1 vs L2 & Bias',
    questions: [
      {
        id: 'm6_1',
        question: 'Derive the Maximum Likelihood Estimator for $\\sigma^2$ given $n$ i.i.d. samples $x_i \\sim \\mathcal{N}(\\mu, \\sigma^2)$.',
        options: [
          '$\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n-1}\\sum_{i=1}^n (x_i - \\bar{x})^2$',
          '$\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2$',
          '$\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum_{i=1}^n |x_i - \\bar{x}|$',
          '$\\hat{\\sigma}^2_{\\text{MLE}} = \\sqrt{\\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2}$'
        ],
        correct: 1,
        explanation: 'Write the log-likelihood function:\\\\$$\\log L(\\mu, \\sigma^2) = -\\frac{n}{2}\\log(2\\pi) - \\frac{n}{2}\\log(\\sigma^2) - \\frac{1}{2\\sigma^2}\\sum_{i=1}^n (x_i - \\mu)^2$$\\\\Differentiate with respect to $\\sigma^2$ and set to $0$:\\\\$$\\frac{\\partial \\log L}{\\partial (\\sigma^2)} = -\\frac{n}{2\\sigma^2} + \\frac{1}{2(\\sigma^2)^2}\\sum_{i=1}^n (x_i - \\mu)^2 = 0$$\\\\Multiply by $2(\\sigma^2)^2$: $-n\\sigma^2 + \\sum_{i=1}^n (x_i - \\mu)^2 = 0$.\\\\Solving for $\\sigma^2$ (and substituting $\\hat{\\mu}_{\\text{MLE}} = \\bar{x}$): $\\mathbf{\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2}$.'
      },
      {
        id: 'm6_2',
        question: 'Derive the MAP update for parameter $w$ given likelihood $y_i \\sim \\mathcal{N}(w x_i, \\sigma^2)$ and prior $w \\sim \\mathcal{N}(0, \\tau^2)$.',
        options: [
          '$\\hat{w}_{\\text{MAP}} = \\frac{\\sum x_i y_i}{\\sum x_i^2}$',
          '$\\hat{w}_{\\text{MAP}} = \\frac{\\sum_{i=1}^n x_i y_i}{\\sum_{i=1}^n x_i^2 + \\frac{\\sigma^2}{\\tau^2}}$',
          '$\\hat{w}_{\\text{MAP}} = \\frac{\\sum x_i y_i - \\frac{\\sigma^2}{\\tau^2}}{\\sum x_i^2}$',
          '$\\hat{w}_{\\text{MAP}} = \\frac{\\sum x_i y_i}{\\sum x_i^2 + \\frac{\\tau^2}{\\sigma^2}}$'
        ],
        correct: 1,
        explanation: 'MAP objective: $\\arg\\max_w [\\log P(Y \\mid X, w) + \\log P(w)]$.\\\\$$\\arg\\max_w \\left[ -\\frac{1}{2\\sigma^2}\\sum_{i=1}^n (y_i - w x_i)^2 - \\frac{w^2}{2\\tau^2} \\right]$$\\\\Differentiate with respect to $w$ and set to $0$:\\\\$$\\frac{1}{\\sigma^2}\\sum_{i=1}^n x_i(y_i - w x_i) - \\frac{w}{\\tau^2} = 0 \\implies \\frac{\\sum x_i y_i}{\\sigma^2} - w \\left( \\frac{\\sum x_i^2}{\\sigma^2} + \\frac{1}{\\tau^2} \\right) = 0$$\\\\Solving for $w$:\\\\$$\\mathbf{\\hat{w}_{\\text{MAP}} = \\frac{\\sum_{i=1}^n x_i y_i}{\\sum_{i=1}^n x_i^2 + \\frac{\\sigma^2}{\\tau^2}}}$$\\\\(Notice the regularization parameter $\\lambda = \\frac{\\sigma^2}{\\tau^2}$ naturally emerges).'
      },
      {
        id: 'm6_3',
        question: 'Explain mathematically why $L_1$ regularization induces parameter sparsity whereas $L_2$ does not.',
        options: [
          'The $L_1$ ball is a cross-polytope with non-differentiable sharp corners on the coordinate axes ($w_i = 0$), where loss contours touch at exact zeros, while $L_2$ is a smooth sphere.',
          '$L_1$ regularization forces the Hessian matrix to be strictly negative definite.',
          '$L_2$ regularization operates only on discrete integers.',
          '$L_1$ adds quadratic penalties that extinguish small coefficients.'
        ],
        correct: 0,
        explanation: 'Constrained optimization views $L_1$ and $L_2$ as minimizing loss $L(w)$ subject to $\\|w\\|_1 \\le C$ or $\\|w\\|_2^2 \\le C$.\\\\The $L_2$ ball ($\\sum w_i^2 \\le C$) is a smooth hypersphere with continuous gradients. The loss contours touch the smooth surface at arbitrary non-zero coordinates.\\\\The $L_1$ ball ($\\sum |w_i| \\le C$) is a cross-polytope (diamond) with non-differentiable sharp corners located precisely on the coordinate axes ($w_i = 0$).\\\\Loss contours hitting an axis corner set uninformative dimensions to exact zero.'
      },
      {
        id: 'm6_4',
        question: 'State the Functional Invariance Property of Maximum Likelihood Estimators.',
        options: [
          'If $\\hat{\\theta}_{\\text{MLE}}$ is the MLE of $\\theta$, then for any function $g(\\theta)$, $\\widehat{g(\\theta)}_{\\text{MLE}} = g(\\hat{\\theta}_{\\text{MLE}})$',
          '$\\widehat{g(\\theta)}_{\\text{MLE}} = g\'(\\hat{\\theta}_{\\text{MLE}})$',
          '$\\widehat{g(\\theta)}_{\\text{MLE}} = \\frac{1}{g(\\hat{\\theta}_{\\text{MLE}})}$',
          '$\\widehat{g(\\theta)}_{\\text{MLE}} = g(\\mathbb{E}[\\theta])$'
        ],
        correct: 0,
        explanation: 'If $\\hat{\\theta}_{\\text{MLE}}$ is the MLE of parameter $\\theta$, then for any function $g(\\theta)$, the MLE of $g(\\theta)$ is $\\mathbf{\\widehat{g(\\theta)}_{\\text{MLE}} = g(\\hat{\\theta}_{\\text{MLE}})}$.\\\\Example: If $\\hat{\\sigma}^2$ is the MLE of variance, then $\\hat{\\sigma} = \\sqrt{\\hat{\\sigma}^2}$ is the MLE of standard deviation.'
      },
      {
        id: 'm6_5',
        question: 'Show that $\\hat{\\sigma}^2_{\\text{MLE}} = \\frac{1}{n}\\sum_{i=1}^n (x_i - \\bar{x})^2$ is a biased estimator of $\\sigma^2$.',
        options: [
          '$\\mathbb{E}[\\hat{\\sigma}^2_{\\text{MLE}}] = \\sigma^2$ (Unbiased)',
          '$\\mathbb{E}[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{n-1}{n}\\sigma^2 \\neq \\sigma^2$ (Underestimates true variance)',
          '$\\mathbb{E}[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{n+1}{n}\\sigma^2$ (Overestimates true variance)',
          '$\\mathbb{E}[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{\\sigma^2}{n}$'
        ],
        correct: 1,
        explanation: 'Express $\\sum (x_i - \\bar{x})^2 = \\sum (x_i - \\mu)^2 - n(\\bar{x} - \\mu)^2$.\\\\Take expectations:\\\\$$\\mathbb{E}\\left[\\sum_{i=1}^n (x_i - \\bar{x})^2\\right] = \\sum_{i=1}^n \\mathbb{E}[(x_i - \\mu)^2] - n\\mathbb{E}[(\\bar{x} - \\mu)^2] = n\\sigma^2 - n\\left(\\frac{\\sigma^2}{n}\\right) = (n-1)\\sigma^2$$\\\\Therefore: $\\mathbb{E}[\\hat{\\sigma}^2_{\\text{MLE}}] = \\frac{1}{n} (n-1)\\sigma^2 = \\mathbf{\\frac{n-1}{n}\\sigma^2 \\neq \\sigma^2}$. It systematically underestimates true variance.'
      }
    ]
  },

  m7: {
    id: 'm7',
    moduleNumber: 7,
    title: 'Module 7: Naive Bayes Classification',
    badge: 'Bayesian Classifiers',
    sub: 'Evidence Normalizer, Log-Posterior, Smoothing & Linear Boundary',
    questions: [
      {
        id: 'm7_1',
        question: 'Express the marginal likelihood (evidence) $P(X)$ in Naive Bayes using the Law of Total Probability over classes $C_k \\in \\{1, \\dots, K\\}$.',
        options: [
          '$P(X) = \\sum_{k=1}^K \\left[ P(C_k) \\prod_{i=1}^d P(X_i \\mid C_k) \\right]$',
          '$P(X) = \\prod_{k=1}^K P(C_k) \\sum_{i=1}^d P(X_i \\mid C_k)$',
          '$P(X) = \\frac{1}{K} \\sum_{k=1}^K P(X \\mid C_k)$',
          '$P(X) = \\sum_{k=1}^K P(C_k) + \\sum_{i=1}^d P(X_i)$'
        ],
        correct: 0,
        explanation: '$$P(X) = \\sum_{k=1}^K P(X \\mid C_k) P(C_k) = \\mathbf{\\sum_{k=1}^K \\left[ P(C_k) \\prod_{i=1}^d P(X_i \\mid C_k) \\right]}$$'
      },
      {
        id: 'm7_2',
        question: 'Write the log-posterior classification decision rule for Naive Bayes to avoid numerical floating-point underflow.',
        options: [
          '$\\hat{y} = \\arg\\max_{c \\in \\{1,\\dots,K\\}} \\left[ \\log P(c) + \\sum_{i=1}^d \\log P(X_i \\mid c) \\right]$',
          '$\\hat{y} = \\arg\\min_{c} [\\log P(c) \\cdot \\prod \\log P(X_i \\mid c)]$',
          '$\\hat{y} = \\arg\\max_c \\frac{\\log P(c)}{\\sum \\log P(X_i \\mid c)}$',
          '$\\hat{y} = -\\sum_{i=1}^d \\log P(X_i \\mid c)$'
        ],
        correct: 0,
        explanation: 'Predict class $\\hat{y}$ that maximizes posterior probability, dropping the constant denominator $P(X)$:\\\\$$\\hat{y} = \\arg\\max_{c \\in \\{1,\\dots,K\\}} \\left[ \\log P(c) + \\log P(X \\mid c) \\right]$$\\\\Applying the Naive independence assumption:\\\\$$\\mathbf{\\hat{y} = \\arg\\max_{c \\in \\{1,\\dots,K\\}} \\left[ \\log P(c) + \\sum_{i=1}^d \\log P(X_i \\mid c) \\right]}$$'
      },
      {
        id: 'm7_3',
        question: 'Derive the general formula for Laplace ($m$-estimate) smoothing parameter estimation $P(X_i = k \\mid C = c)$ given vocabulary size $|V|$.',
        options: [
          '$P(X_i = k \\mid C = c) = \\frac{N_{i,k,c} + \\alpha}{N_c + \\alpha |V|}$',
          '$P(X_i = k \\mid C = c) = \\frac{N_{i,k,c} + \\alpha}{N_c + \\alpha}$',
          '$P(X_i = k \\mid C = c) = \\frac{N_{i,k,c}}{|V| + \\alpha}$',
          '$P(X_i = k \\mid C = c) = \\frac{N_{i,k,c} \\cdot \\alpha}{N_c}$'
        ],
        correct: 0,
        explanation: '$$\\mathbf{P(X_i = k \\mid C = c) = \\frac{N_{i,k,c} + \\alpha}{N_c + \\alpha |V|}}$$\\\\Where $N_{i,k,c}$ is the count of feature $i$ taking value $k$ in class $c$, $N_c$ is the total count of all features in class $c$, and $\\alpha > 0$ is the smoothing parameter ($\\alpha = 1$ gives standard Laplace add-1 smoothing).'
      },
      {
        id: 'm7_4',
        question: 'For a dataset with $d$ continuous features and $K$ discrete classes, how many total independent parameters must be learned for Gaussian Naive Bayes?',
        options: [
          '$2dK + K - 1$',
          '$d^2 K + K$',
          '$dK + 1$',
          '$2d + K$'
        ],
        correct: 0,
        explanation: 'Class Priors $P(C)$: $K - 1$ independent parameters (since probabilities sum to 1).\\\\Means $\\mu_{i,c}$: 1 per feature per class $\\implies d \\cdot K$.\\\\Variances $\\sigma_{i,c}^2$: 1 per feature per class $\\implies d \\cdot K$.\\\\Total parameters = $(K - 1) + 2dK = \\mathbf{2dK + K - 1}$.'
      },
      {
        id: 'm7_5',
        question: 'Prove that Gaussian Naive Bayes produces a linear decision boundary when class-conditional variances are equal ($\\sigma_{i,c}^2 = \\sigma_i^2$ for all classes $c$).',
        options: [
          'Equal priors cancel out the exponential normalizers.',
          'The quadratic terms $x_i^2$ in the log-likelihood ratio cancel out identically, leaving a linear function $\\mathbf{w^T x + b = 0}$.',
          'Because covariance matrices with identical variances are diagonal unit matrices.',
          'Because the Mahalanobis distance reduces to Manhattan distance.'
        ],
        correct: 1,
        explanation: 'Compare log-posterior ratio for two classes $c_1$ and $c_2$:\\\\$$\\log \\frac{P(C=c_1 \\mid X)}{P(C=c_2 \\mid X)} = \\log \\frac{P(C=c_1)}{P(C=c_2)} + \\sum_{i=1}^d \\log \\frac{P(X_i \\mid C=c_1)}{P(X_i \\mid C=c_2)}$$\\\\Substitute Gaussian densities with shared variance $\\sigma_i^2$:\\\\$$\\sum_{i=1}^d \\left( -\\frac{(x_i - \\mu_{i,c1})^2 - (x_i - \\mu_{i,c2})^2}{2\\sigma_i^2} \\right)$$\\\\Expand the numerator quadratic terms:\\\\$$(x_i - \\mu_{i,c1})^2 - (x_i - \\mu_{i,c2})^2 = (x_i^2 - 2x_i\\mu_{i,c1} + \\mu_{i,c1}^2) - (x_i^2 - 2x_i\\mu_{i,c2} + \\mu_{i,c2}^2) = 2x_i(\\mu_{i,c2} - \\mu_{i,c1}) + \\mu_{i,c1}^2 - \\mu_{i,c2}^2$$\\\\Notice $x_i^2$ cancels out completely. The log-ratio simplifies to:\\\\$$\\sum_{i=1}^d \\left( \\frac{\\mu_{i,c1} - \\mu_{i,c2}}{\\sigma_i^2} \\right) x_i + C_{\\text{constant}}$$\\\\This is a linear function of $x$ ($\\mathbf{w^T x + b = 0}$), proving that equal variance GNB produces a linear decision surface.'
      }
    ]
  }
};
