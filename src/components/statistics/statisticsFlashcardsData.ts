export interface StatsFlashcard {
  id: string;
  category:
    | 'Probability & Combinatorics'
    | 'Random Variables & Properties'
    | 'Moments & Transformations'
    | 'Joint Distributions & Correlation'
    | 'Key Distributions'
    | 'Estimation & CLT';
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  remark?: string;
  useCase?: string;
}

export const CS229_STATS_FLASHCARDS: StatsFlashcard[] = [
  // ================= 1. Probability & Combinatorics =================
  {
    id: 'sfc-1',
    category: 'Probability & Combinatorics',
    title: 'Sample Space & Event Definition',
    frontPrompt: 'How are the sample space $S$ and an event $E$ formally defined in probability theory?',
    backFormula: 'S = \\{ \\omega : \\omega \\text{ is an experimental outcome} \\}, \\quad E \\subseteq S',
    backExplanation: 'The sample space $S$ is the set of all possible outcomes of an experiment. An event $E$ is any subset of $S$. If the observed outcome $\\omega \\in E$, we say event $E$ has occurred.',
    remark: 'The empty set $\\emptyset$ is the impossible event ($P(\\emptyset) = 0$), and $S$ is the certain event ($P(S) = 1$).',
    useCase: 'Used in binary and multiclass classification to define output label spaces $\\mathcal{Y} = \\{1, \\dots, K\\}$.'
  },
  {
    id: 'sfc-2',
    category: 'Probability & Combinatorics',
    title: 'Kolmogorov Axioms of Probability',
    frontPrompt: 'State the three fundamental Kolmogorov axioms that define any probability measure $P$.',
    backFormula: '(1) \\; 0 \\le P(E) \\le 1, \\quad (2) \\; P(S) = 1, \\quad (3) \\; P\\left(\\bigcup_{i=1}^n E_i\\right) = \\sum_{i=1}^n P(E_i) \\text{ for pairwise disjoint } E_i',
    backExplanation: 'A valid probability measure assigns non-negative numbers no greater than 1, normalizes the entire sample space to probability 1, and is countably additive for mutually exclusive events ($E_i \\cap E_j = \\emptyset$).',
    remark: 'From these 3 axioms, we derive $P(E^c) = 1 - P(E)$ and the union bound $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    useCase: 'Guarantees that softmax probabilities $\\sum_{k} \\frac{e^{z_k}}{\\sum_j e^{z_j}} = 1$ form a mathematically valid probability distribution.'
  },
  {
    id: 'sfc-3',
    category: 'Probability & Combinatorics',
    title: 'Permutations Formula',
    frontPrompt: 'What is the formula for the number of permutations $P(n, r)$ when selecting $r$ ordered objects from $n$ items?',
    backFormula: 'P(n, r) = \\frac{n!}{(n - r)!}',
    backExplanation: 'A permutation is an ordered arrangement of $r$ objects chosen from a pool of $n$ distinct objects without replacement. Order matters: $(A, B) \\ne (B, A)$.',
    remark: 'When $r = n$, $P(n, n) = n!$, which is the number of total ways to arrange $n$ unique items.',
    useCase: 'Feature ranking and permutation feature importance evaluation in random forests and gradient boosted trees.'
  },
  {
    id: 'sfc-4',
    category: 'Probability & Combinatorics',
    title: 'Combinations Formula',
    frontPrompt: 'What is the formula for combinations $C(n, r)$ where order does not matter, and how does it relate to permutations?',
    backFormula: 'C(n, r) = \\binom{n}{r} = \\frac{P(n, r)}{r!} = \\frac{n!}{r!(n - r)!}',
    backExplanation: 'A combination counts arrangements of $r$ objects from $n$ where selection order does NOT matter. We divide $P(n, r)$ by $r!$ to eliminate redundant permutations of the chosen subset.',
    remark: 'For all $0 \\le r \\le n$, we have $P(n, r) \\ge C(n, r)$. Also $\\binom{n}{r} = \\binom{n}{n - r}$.',
    useCase: 'Subsetting features in feature selection and computing binomial coefficients in hyperparameter search combinations.'
  },
  {
    id: 'sfc-5',
    category: 'Probability & Combinatorics',
    title: 'Bayes’ Rule & Chain Rule',
    frontPrompt: 'State Bayes’ Rule for updating conditional probabilities and its related joint probability chain rule.',
    backFormula: 'P(A \\mid B) = \\frac{P(B \\mid A)P(A)}{P(B)}, \\quad \\text{with } P(A \\cap B) = P(A)P(B \\mid A) = P(B)P(A \\mid B)',
    backExplanation: 'Bayes’ Rule calculates the posterior probability $P(A|B)$ using the likelihood $P(B|A)$, prior $P(A)$, and marginal evidence $P(B) > 0$.',
    remark: 'Posterior $\\propto$ Likelihood $\\times$ Prior. Normalizer is $P(B) = \\int P(B|A) dP(A)$.',
    useCase: 'Foundational equation for Naive Bayes classification, Bayesian inference, Kalman filters, and MAP parameter estimation.'
  },
  {
    id: 'sfc-6',
    category: 'Probability & Combinatorics',
    title: 'Partition & Extended Bayes’ Rule',
    frontPrompt: 'Define a partition of the sample space and state the Extended Form of Bayes’ Rule using the Law of Total Probability.',
    backFormula: 'P(A_k \\mid B) = \\frac{P(B \\mid A_k)P(A_k)}{\\sum_{i=1}^n P(B \\mid A_i)P(A_i)}, \\quad \\text{where } \\bigcup_{i=1}^n A_i = S \\text{ and } A_i \\cap A_j = \\emptyset',
    backExplanation: 'When events $\{A_1, \\dots, A_n\}$ form a partition (mutually exclusive and collectively exhaustive), the total probability $P(B) = \\sum_{i=1}^n P(B|A_i)P(A_i)$ decomposes the denominator across all possible causes.',
    remark: 'This replaces the unknown marginal $P(B)$ with observable conditional likelihoods and priors.',
    useCase: 'Multiclass classification probability calibration and Gaussian Mixture Models (GMM) posterior responsibility calculation.'
  },

  // ================= 2. Random Variables & Properties =================
  {
    id: 'sfc-7',
    category: 'Random Variables & Properties',
    title: 'Event Independence Criterion',
    frontPrompt: 'What is the necessary and sufficient condition for two events $A$ and $B$ to be statistically independent?',
    backFormula: 'P(A \\cap B) = P(A) \\cdot P(B) \\iff P(A \\mid B) = P(A) \\quad (\\text{if } P(B) > 0)',
    backExplanation: 'Two events are independent if the occurrence of one provides zero information about the occurrence of the other. The joint probability factors cleanly into the product of marginals.',
    remark: 'Independence is NOT mutual exclusivity: if $A$ and $B$ are mutually exclusive with $P(A), P(B) > 0$, then $P(A \\cap B) = 0 \\ne P(A)P(B)$, so they are strongly dependent!',
    useCase: 'Feature conditional independence assumption in Naive Bayes: $P(x_1, \\dots, x_d | y) = \\prod_{j=1}^d P(x_j | y)$.'
  },
  {
    id: 'sfc-8',
    category: 'Random Variables & Properties',
    title: 'Random Variable Formal Definition',
    frontPrompt: 'What is a random variable $X$ mathematically, and what does it map?',
    backFormula: 'X : S \\to \\mathbb{R}, \\quad \\omega \\mapsto X(\\omega)',
    backExplanation: 'A random variable is not a single number, but a measurable function mapping every element $\\omega$ in the sample space $S$ to a real number on the real line $\\mathbb{R}$.',
    remark: 'A discrete RV takes values in a countable set, while a continuous RV takes values in an uncountable continuum/interval.',
    useCase: 'Assigning real-valued numbers to categorical outcomes, loss values, activations, and observed data features.'
  },
  {
    id: 'sfc-9',
    category: 'Random Variables & Properties',
    title: 'Cumulative Distribution Function (CDF)',
    frontPrompt: 'Define the Cumulative Distribution Function (CDF) $F(x)$, its limits, and the interval probability formula.',
    backFormula: 'F(x) = P(X \\le x), \\quad \\lim_{x \\to -\\infty} F(x) = 0, \\quad \\lim_{x \\to +\\infty} F(x) = 1, \\quad P(a < X \\le b) = F(b) - F(a)',
    backExplanation: 'The CDF is monotonically non-decreasing ($x_1 \\le x_2 \\implies F(x_1) \\le F(x_2)$) and right-continuous. It gives the accumulated probability up to threshold $x$.',
    remark: 'For continuous variables, $P(X = x) = 0$, so $P(a < X \\le b) = P(a \\le X \\le b) = F(b) - F(a)$.',
    useCase: 'Inverse transform sampling: $X = F^{-1}(U)$ where $U \\sim \\mathcal{U}(0, 1)$ generates samples for arbitrary continuous distributions.'
  },
  {
    id: 'sfc-10',
    category: 'Random Variables & Properties',
    title: 'Probability Density Function (PDF) vs PMF',
    frontPrompt: 'Compare the defining properties of the PMF in the discrete case and PDF in the continuous case.',
    backFormula: '\\text{Discrete: } f(x_j) = P(X = x_j), \\sum_j f(x_j) = 1; \\quad \\text{Continuous: } f(x) = \\frac{dF}{dx}, \\int_{-\\infty}^{+\\infty} f(x)dx = 1, f(x) \\ge 0',
    backExplanation: 'For discrete RVs, $f(x)$ is a probability $\\in [0, 1]$. For continuous RVs, $f(x)$ is a probability density (can exceed 1!), and probabilities are obtained via integrals $P(a \\le X \\le b) = \\int_a^b f(x) dx$.',
    remark: 'Notice $f(x)$ in continuous space has units of $1 / \\text{units of } x$. Only integrated areas represent unitless probabilities.',
    useCase: 'Continuous likelihood evaluation in Maximum Likelihood Estimation (MLE) for neural network loss functions.'
  },
  {
    id: 'sfc-11',
    category: 'Random Variables & Properties',
    title: 'Variance & Standard Deviation',
    frontPrompt: 'State the definition, computational formula, and units of Variance $\\text{Var}(X)$ and Standard Deviation $\\sigma$.',
    backFormula: '\\text{Var}(X) = \\sigma^2 = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2, \\quad \\sigma = \\sqrt{\\text{Var}(X)}',
    backExplanation: 'Variance measures the expected squared deviation of a random variable from its mean. Standard deviation $\\sigma$ is the non-negative square root and shares the exact same physical units as $X$.',
    remark: 'Key scaling property: $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$. The constant shift $b$ does not change the spread.',
    useCase: 'Feature scaling (StandardScaler: $z = \\frac{x - \\mu}{\\sigma}$), batch normalization, and weight initialization heuristics.'
  },

  // ================= 3. Moments & Transformations =================
  {
    id: 'sfc-12',
    category: 'Moments & Transformations',
    title: 'Expected Value: Discrete vs Continuous',
    frontPrompt: 'State the mathematical formulation of the expected value $\\mathbb{E}[X]$ for discrete and continuous random variables.',
    backFormula: '\\text{Discrete: } \\mathbb{E}[X] = \\sum_{i=1}^n x_i f(x_i), \\quad \\text{Continuous: } \\mathbb{E}[X] = \\int_{-\\infty}^{+\\infty} x f(x) dx',
    backExplanation: 'Expectation is the probability-weighted average (center of mass) of the distribution. It is a linear operator: $\\mathbb{E}[aX + bY] = a\\mathbb{E}[X] + b\\mathbb{E}[Y]$.',
    remark: 'Expectation exists only when the sum/integral converges absolutely (i.e., $\\mathbb{E}[|X|] < \\infty$).',
    useCase: 'Loss function expected risk minimization: $\\mathcal{R}(f) = \\mathbb{E}_{(x, y) \\sim \\mathcal{D}}[L(f(x), y)]$.'
  },
  {
    id: 'sfc-13',
    category: 'Moments & Transformations',
    title: 'LOTUS (Law of the Unconscious Statistician)',
    frontPrompt: 'State the formula for the generalized expected value $\\mathbb{E}[g(X)]$ without knowing the distribution of $g(X)$.',
    backFormula: '\\text{Discrete: } \\mathbb{E}[g(X)] = \\sum_{i=1}^n g(x_i) f(x_i), \\quad \\text{Continuous: } \\mathbb{E}[g(X)] = \\int_{-\\infty}^{+\\infty} g(x) f(x) dx',
    backExplanation: 'LOTUS allows computing the expected value of a transformed variable $Y = g(X)$ directly using the original PDF/PMF of $X$, without first deriving the distribution of $Y$.',
    remark: 'The $k$-th raw moment $\\mathbb{E}[X^k]$ is simply LOTUS with $g(X) = X^k$.',
    useCase: 'Monte Carlo approximation of complex expectations $\\mathbb{E}[g(X)] \\approx \\frac{1}{N} \\sum_{i=1}^N g(x_i)$ in reinforcement learning.'
  },
  {
    id: 'sfc-14',
    category: 'Moments & Transformations',
    title: 'Characteristic Function $\\psi(\\omega)$',
    frontPrompt: 'Define the characteristic function $\\psi(\\omega)$ of a random variable $X$, and state Euler’s expansion.',
    backFormula: '\\psi(\\omega) = \\mathbb{E}[e^{i\\omega X}] = \\int_{-\\infty}^{+\\infty} f(x) e^{i\\omega x} dx, \\quad \\text{where } e^{i\\omega x} = \\cos(\\omega x) + i\\sin(\\omega x)',
    backExplanation: 'The characteristic function is the Fourier transform of the probability density function (with sign convention). Unlike the Moment Generating Function (MGF), $\\psi(\\omega)$ is guaranteed to exist for all real $\\omega$ for ANY random variable.',
    remark: '$\\psi(0) = 1$ and $|\\psi(\\omega)| \\le 1$ for all $\\omega \\in \\mathbb{R}$.',
    useCase: 'Proving the Central Limit Theorem and determining the distribution of sums of independent variables.'
  },
  {
    id: 'sfc-15',
    category: 'Moments & Transformations',
    title: '$k$-th Moment Derivation from $\\psi(\\omega)$',
    frontPrompt: 'How can the $k$-th moment $\\mathbb{E}[X^k]$ be computed using the characteristic function $\\psi(\\omega)$?',
    backFormula: '\\mathbb{E}[X^k] = \\frac{1}{i^k} \\left. \\frac{\\partial^k \\psi}{\\partial \\omega^k} \\right|_{\\omega = 0}',
    backExplanation: 'Differentiating $\\psi(\\omega) = \\mathbb{E}[e^{i\\omega X}]$ brings down factors of $i X$: $\\frac{d^k}{d\\omega^k} \\psi(\\omega) = \\mathbb{E}[i^k X^k e^{i\\omega X}]$. Evaluating at $\\omega = 0$ leaves $i^k \\mathbb{E}[X^k]$.',
    remark: 'Dividing by $i^k$ extracts the exact $k$-th raw moment without doing complicated integration.',
    useCase: 'Analytical derivation of skewness ($k=3$) and kurtosis ($k=4$) for complex parametric models.'
  },
  {
    id: 'sfc-16',
    category: 'Moments & Transformations',
    title: 'Transformation of Random Variables (1D Jacobian)',
    frontPrompt: 'If $Y = g(X)$ is a monotonic differentiable transformation of RV $X$, what is the PDF of $Y$?',
    backFormula: 'f_Y(y) = f_X(x) \\left| \\frac{dx}{dy} \\right| = f_X\\left(g^{-1}(y)\\right) \\cdot \\left| \\frac{d}{dy} g^{-1}(y) \\right|',
    backExplanation: 'Conservation of probability mass requires $P(y \\le Y \\le y + dy) = P(x \\le X \\le x + dx)$. The change-of-variables formula scales the density by the absolute value of the derivative $|dx/dy|$.',
    remark: 'In multiple dimensions, $|dx/dy|$ generalizes to the absolute determinant of the Jacobian matrix $|\\det(J_{g^{-1}}(y))|$.',
    useCase: 'Core foundation of Normalizing Flows (RealNVP, Glow) and continuous latent variable generation in generative AI.'
  },
  {
    id: 'sfc-17',
    category: 'Moments & Transformations',
    title: 'Leibniz Integral Rule',
    frontPrompt: 'State the Leibniz rule for differentiating an integral whose integrand and boundary limits depend on parameter $c$.',
    backFormula: '\\frac{\\partial}{\\partial c} \\left( \\int_a^b g(x) dx \\right) = \\frac{\\partial b}{\\partial c} g(b) - \\frac{\\partial a}{\\partial c} g(a) + \\int_a^b \\frac{\\partial g}{\\partial c}(x) dx',
    backExplanation: 'Combines the fundamental theorem of calculus with differentiation under the integral sign. The first two terms capture the moving boundaries $b(c)$ and $a(c)$, while the integral captures the interior rate of change.',
    remark: 'If $a$ and $b$ are fixed constants, only the interior integral term $\\int_a^b \\frac{\\partial g}{\\partial c}(x)dx$ remains.',
    useCase: 'Differentiating expected losses with respect to model parameters: $\\nabla_\\theta \\mathbb{E}_{p_\\theta}[f(x)]$ (REINFORCE algorithm).'
  },
  {
    id: 'sfc-18',
    category: 'Moments & Transformations',
    title: 'Chebyshev’s Inequality',
    frontPrompt: 'State Chebyshev’s inequality for any distribution with mean $\\mu$ and standard deviation $\\sigma$.',
    backFormula: 'P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}, \\quad \\text{for any } k > 0, \\sigma > 0',
    backExplanation: 'Provides a distribution-free upper bound on the probability that a random variable deviates by more than $k$ standard deviations from its mean. For example, at most $1/4 = 25\\%$ of values can be $\\ge 2\\sigma$ away.',
    remark: 'Requires only finite mean and finite variance; does NOT assume normality.',
    useCase: 'Proving the Weak Law of Large Numbers (WLLN) and establishing statistical sample complexity bounds.'
  },

  // ================= 4. Joint Distributions & Correlation =================
  {
    id: 'sfc-19',
    category: 'Joint Distributions & Correlation',
    title: 'Joint Conditional Density & Independence',
    frontPrompt: 'What is the conditional density $f_{X|Y}(x|y)$, and what is the exact criterion for independence of RVs $X$ and $Y$?',
    backFormula: 'f_{X \\mid Y}(x \\mid y) = \\frac{f_{XY}(x, y)}{f_Y(y)}, \\quad \\text{Independence: } f_{XY}(x, y) = f_X(x) f_Y(y) \\; \\forall x, y',
    backExplanation: 'The conditional density describes the distribution of $X$ given that $Y$ is fixed at $y$. $X$ and $Y$ are independent if and only if their joint density factors into the product of their marginals everywhere.',
    remark: 'If $X$ and $Y$ are independent, then $f_{X|Y}(x|y) = f_X(x)$ for all $y$.',
    useCase: 'Conditional random fields, variational autoencoder latent factorization $q(z|x) = \\prod_i q(z_i|x)$.'
  },
  {
    id: 'sfc-20',
    category: 'Joint Distributions & Correlation',
    title: 'Joint Marginal Density & Joint CDF',
    frontPrompt: 'How do you obtain the marginal density $f_X(x)$ and joint CDF $F_{XY}(x, y)$ from a joint density $f_{XY}$?',
    backFormula: 'f_X(x) = \\int_{-\\infty}^{+\\infty} f_{XY}(x, y) dy, \\quad F_{XY}(x, y) = \\int_{-\\infty}^x \\int_{-\\infty}^y f_{XY}(x\', y\') dx\' dy\'',
    backExplanation: 'Marginalization "integrates out" the nuisance variable $Y$ over its entire domain $(-\\infty, +\\infty)$ to obtain the isolated distribution of $X$. In discrete systems, integrals are replaced by sums.',
    remark: 'Notice $\\lim_{y \\to \\infty} F_{XY}(x, y) = F_X(x)$ gives back the marginal CDF of $X$.',
    useCase: 'Latent variable marginalization in EM algorithm: $p(x) = \\int p(x, z) dz$.'
  },
  {
    id: 'sfc-21',
    category: 'Joint Distributions & Correlation',
    title: 'Distribution of Sum of Independent RVs',
    frontPrompt: 'If $Y = X_1 + \\dots + X_n$ where $X_i$ are mutually independent, how is the characteristic function $\\psi_Y(\\omega)$ computed?',
    backFormula: '\\psi_Y(\\omega) = \\prod_{k=1}^n \\psi_{X_k}(\\omega)',
    backExplanation: 'The characteristic function of the sum of independent random variables is the product of their individual characteristic functions. This converts complex spatial convolutions into simple scalar multiplications.',
    remark: 'In the spatial domain, $f_Y = f_{X_1} * f_{X_2} * \\dots * f_{X_n}$ (convolutions). In Fourier space, it becomes an algebraic product.',
    useCase: 'Deriving Gaussian reproductive property (sum of normals is normal) and establishing Central Limit Theorem convergence.'
  },
  {
    id: 'sfc-22',
    category: 'Joint Distributions & Correlation',
    title: 'Covariance Formula & Expansion',
    frontPrompt: 'Define Covariance $\\text{Cov}(X, Y)$ and state its computational formula in terms of expected values.',
    backFormula: '\\text{Cov}(X, Y) = \\sigma^2_{XY} = \\mathbb{E}[(X - \\mu_X)(Y - \\mu_Y)] = \\mathbb{E}[XY] - \\mu_X \\mu_Y',
    backExplanation: 'Covariance measures the joint variability and directional linear relationship between two random variables. If high values of $X$ pair with high values of $Y$, covariance is positive.',
    remark: 'Note that $\\text{Cov}(X, X) = \\text{Var}(X)$. Also, covariance is bilinear and symmetric: $\\text{Cov}(X, Y) = \\text{Cov}(Y, X)$.',
    useCase: 'Constructing empirical covariance matrices $\\Sigma = \\frac{1}{n} X^T X$ in PCA (Principal Component Analysis).'
  },
  {
    id: 'sfc-23',
    category: 'Joint Distributions & Correlation',
    title: 'Pearson Correlation Coefficient $\\rho_{XY}$',
    frontPrompt: 'Define the Pearson correlation coefficient $\\rho_{XY}$, its bounds, and its value when variables are independent.',
    backFormula: '\\rho_{XY} = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y} \\in [-1, 1], \\quad X, Y \\text{ independent} \\implies \\rho_{XY} = 0',
    backExplanation: 'Correlation is the dimensionless, scale-invariant normalization of covariance. $\\rho = +1$ indicates a perfect positive linear relationship, $\\rho = -1$ a perfect negative linear relationship, and $\\rho = 0$ indicates no linear correlation.',
    remark: 'Independence implies $\\rho = 0$, but $\\rho = 0$ does NOT imply independence (unless $X, Y$ are jointly Gaussian)!',
    useCase: 'Feature colinearity diagnostics and correlation matrix filtering during exploratory data analysis.'
  },
  {
    id: 'sfc-24',
    category: 'Joint Distributions & Correlation',
    title: 'Variance of a Sum of Correlated Variables',
    frontPrompt: 'What is the formula for $\\text{Var}(X + Y)$ and more generally $\\text{Var}(aX + bY)$?',
    backFormula: '\\text{Var}(aX + bY) = a^2 \\text{Var}(X) + b^2 \\text{Var}(Y) + 2ab\\,\\text{Cov}(X, Y)',
    backExplanation: 'When variables are correlated, the variance of their sum includes the cross-covariance term $2ab\\,\\text{Cov}(X, Y)$. If they are independent or uncorrelated ($\\text{Cov}=0$), the cross-term vanishes.',
    remark: 'For $n$ variables, $\\text{Var}\\left(\\sum_{i=1}^n X_i\\right) = \\sum_{i=1}^n \\text{Var}(X_i) + 2\\sum_{i < j} \\text{Cov}(X_i, X_j) = \\mathbf{1}^T \\Sigma \\mathbf{1}$.',
    useCase: 'Modern Portfolio Theory (Markowitz mean-variance optimization) and ensemble variance reduction analysis.'
  },

  // ================= 5. Key Probability Distributions =================
  {
    id: 'sfc-25',
    category: 'Key Distributions',
    title: 'Binomial Distribution: $X \\sim B(n, p)$',
    frontPrompt: 'State the PMF, characteristic function $\\psi(\\omega)$, mean, and variance of a Binomial random variable.',
    backFormula: 'P(X = x) = \\binom{n}{x} p^x q^{n-x}, \\quad \\psi(\\omega) = (p e^{i\\omega} + q)^n, \\quad \\mathbb{E}[X] = np, \\quad \\text{Var}(X) = npq',
    backExplanation: 'Models the number of successes in $n$ independent Bernoulli trials with success probability $p$ and failure probability $q = 1 - p$. Domain is $x \\in \\{0, 1, \\dots, n\\}$.',
    remark: 'When $n = 1$, the Binomial reduces to the Bernoulli distribution with mean $p$ and variance $p(1-p)$.',
    useCase: 'Binary classification evaluation, click-through rate modeling, and A/B testing statistical hypothesis tests.'
  },
  {
    id: 'sfc-26',
    category: 'Key Distributions',
    title: 'Poisson Distribution: $X \\sim \\text{Po}(\\mu)$',
    frontPrompt: 'State the PMF, characteristic function $\\psi(\\omega)$, mean, and variance of a Poisson random variable.',
    backFormula: 'P(X = x) = \\frac{\\mu^x}{x!} e^{-\\mu}, \\quad \\psi(\\omega) = e^{\\mu(e^{i\\omega} - 1)}, \\quad \\mathbb{E}[X] = \\mu, \\quad \\text{Var}(X) = \\mu',
    backExplanation: 'Models the count of rare events occurring in a fixed interval of time or space with average rate $\\mu > 0$. Notice that the mean and variance are uniquely equal: $\\mathbb{E}[X] = \\text{Var}(X) = \\mu$.',
    remark: 'The Poisson is the limit of the Binomial $B(n, p)$ as $n \\to \\infty$ and $p \\to 0$ with $np = \\mu$ held constant.',
    useCase: 'Poisson regression for count data (e.g., website visit counts, server requests per minute, defect rates).'
  },
  {
    id: 'sfc-27',
    category: 'Key Distributions',
    title: 'Continuous Uniform Distribution: $X \\sim \\mathcal{U}(a, b)$',
    frontPrompt: 'State the PDF, characteristic function $\\psi(\\omega)$, mean, and variance of a continuous Uniform distribution on $[a, b]$.',
    backFormula: 'f(x) = \\frac{1}{b - a}, \\; x \\in [a, b]; \\quad \\psi(\\omega) = \\frac{e^{i\\omega b} - e^{i\\omega a}}{(b - a)i\\omega}; \\quad \\mathbb{E}[X] = \\frac{a + b}{2}; \\quad \\text{Var}(X) = \\frac{(b - a)^2}{12}',
    backExplanation: 'Every real value within interval $[a, b]$ has equal probability density. The density is constant $\\frac{1}{b-a}$ and integrates to 1 across the interval.',
    remark: 'The standard uniform $\\mathcal{U}(0, 1)$ has mean $1/2$ and variance $1/12$.',
    useCase: 'Random search for hyperparameter optimization and continuous pseudo-random number generator outputs.'
  },
  {
    id: 'sfc-28',
    category: 'Key Distributions',
    title: 'Gaussian (Normal) Distribution: $X \\sim \\mathcal{N}(\\mu, \\sigma)$',
    frontPrompt: 'State the PDF, characteristic function $\\psi(\\omega)$, mean, and variance of the 1D Gaussian distribution.',
    backFormula: 'f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{1}{2}\\left(\\frac{x - \\mu}{\\sigma}\\right)^2}, \\quad \\psi(\\omega) = e^{i\\omega\\mu - \\frac{1}{2}\\omega^2\\sigma^2}, \\quad \\mathbb{E}[X] = \\mu, \\quad \\text{Var}(X) = \\sigma^2',
    backExplanation: 'The ubiquitous bell curve. Symmetrical about mean $\\mu$ with spread dictated by $\\sigma$. Satisfies the 68-95-99.7 empirical rule for intervals $[\\mu \\pm \\sigma, \\mu \\pm 2\\sigma, \\mu \\pm 3\\sigma]$.',
    remark: 'Maximizes entropy among all continuous distributions on $\\mathbb{R}$ with fixed mean and variance.',
    useCase: 'Gaussian noise in linear regression $y = w^Tx + \\epsilon$, Gaussian Naive Bayes, VAE prior $p(z) = \\mathcal{N}(0, I)$.'
  },
  {
    id: 'sfc-29',
    category: 'Key Distributions',
    title: 'Exponential Distribution: $X \\sim \\text{Exp}(\\lambda)$',
    frontPrompt: 'State the PDF, characteristic function $\\psi(\\omega)$, mean, and variance of an Exponential distribution with rate $\\lambda$.',
    backFormula: 'f(x) = \\lambda e^{-\\lambda x}, \\; x \\in \\mathbb{R}^+; \\quad \\psi(\\omega) = \\frac{1}{1 - \\frac{i\\omega}{\\lambda}}; \\quad \\mathbb{E}[X] = \\frac{1}{\\lambda}; \\quad \\text{Var}(X) = \\frac{1}{\\lambda^2}',
    backExplanation: 'Models continuous waiting times between Poisson point events with rate $\\lambda > 0$. Exhibits the unique memoryless property: $P(X > s + t \\mid X > s) = P(X > t)$.',
    remark: 'Standard deviation equals the mean: $\\sigma = \\sqrt{1/\\lambda^2} = 1/\\lambda$.',
    useCase: 'Survival analysis, customer churn modeling, time-to-failure in reliability engineering.'
  },

  // ================= 6. Parameter Estimation & CLT =================
  {
    id: 'sfc-30',
    category: 'Estimation & CLT',
    title: 'Random Sample & Estimator Definition',
    frontPrompt: 'Define what constitutes a random sample and an estimator $\\hat{\\theta}$ of an unknown parameter $\\theta$.',
    backFormula: 'X_1, \\dots, X_n \\stackrel{i.i.d.}{\\sim} X, \\quad \\hat{\\theta} = g(X_1, \\dots, X_n)',
    backExplanation: 'A random sample is a collection of $n$ independent and identically distributed (i.i.d.) random variables sharing the parent distribution $X$. An estimator $\\hat{\\theta}$ is a statistic (a deterministic function of observed data) used to infer the true value of unknown parameter $\\theta$.',
    remark: 'Because $\\hat{\\theta}$ is a function of random data, $\\hat{\\theta}$ is ITSELF a random variable with its own sampling distribution.',
    useCase: 'Model training: learned weights $\\hat{w} = \\arg\\min_w \\mathcal{L}(w; \\mathcal{D})$ are estimators of optimal parameters.'
  },
  {
    id: 'sfc-31',
    category: 'Estimation & CLT',
    title: 'Bias of an Estimator & Unbiasedness',
    frontPrompt: 'How is the bias of an estimator $\\hat{\\theta}$ defined, and when is an estimator declared unbiased?',
    backFormula: '\\text{Bias}(\\hat{\\theta}) = \\mathbb{E}[\\hat{\\theta}] - \\theta, \\quad \\text{Unbiased } \\iff \\text{Bias}(\\hat{\\theta}) = 0 \\iff \\mathbb{E}[\\hat{\\theta}] = \\theta',
    backExplanation: 'Bias is the difference between the expected value of the estimator’s sampling distribution and the true ground-truth parameter $\\theta$. An estimator is unbiased if its average over infinitely many random samples converges to the exact truth.',
    remark: 'Mean Squared Error (MSE) decomposes as $\\text{MSE}(\\hat{\\theta}) = \\mathbb{E}[(\\hat{\\theta} - \\theta)^2] = \\text{Var}(\\hat{\\theta}) + \\left(\\text{Bias}(\\hat{\\theta})\\right)^2$.',
    useCase: 'Fundamental Bias-Variance tradeoff in supervised learning, Ridge/Lasso regularization.'
  },
  {
    id: 'sfc-32',
    category: 'Estimation & CLT',
    title: 'Sample Mean $\\bar{X}$ Properties',
    frontPrompt: 'Define the sample mean $\\bar{X}$, its expected value, and its sampling variance.',
    backFormula: '\\bar{X} = \\frac{1}{n} \\sum_{i=1}^n X_i, \\quad \\mathbb{E}[\\bar{X}] = \\mu, \\quad \\text{Var}(\\bar{X}) = \\frac{\\sigma^2}{n}',
    backExplanation: 'The sample mean is an unbiased estimator of the population mean $\\mu$. Because individual variances sum independently, its variance scales down by sample size $n$, yielding standard error $\\text{SE} = \\sigma / \\sqrt{n}$.',
    remark: 'As $n \\to \\infty$, $\\text{Var}(\\bar{X}) \\to 0$, which proves the Weak Law of Large Numbers (WLLN).',
    useCase: 'Empirical risk calculation, stochastic mini-batch gradient estimations: $\\hat{g} = \\frac{1}{B} \\sum_{i=1}^B \\nabla L_i$.'
  },
  {
    id: 'sfc-33',
    category: 'Estimation & CLT',
    title: 'Sample Variance $s^2$ & Bessel’s Correction',
    frontPrompt: 'Why does sample variance $s^2$ divide by $n - 1$ instead of $n$, and what is its formal formula?',
    backFormula: 's^2 = \\hat{\\sigma}^2 = \\frac{1}{n - 1} \\sum_{i=1}^n (X_i - \\bar{X})^2, \\quad \\text{so that } \\mathbb{E}[s^2] = \\sigma^2',
    backExplanation: 'Dividing by $n$ produces a biased underestimate because deviations are measured from the sample mean $\\bar{X}$ rather than the true mean $\\mu$ (consuming 1 degree of freedom). Dividing by $n - 1$ (Bessel’s correction) makes $s^2$ strictly unbiased.',
    remark: 'Without Bessel\'s correction, $\\mathbb{E}\\left[\\frac{1}{n}\\sum (X_i - \\bar{X})^2\\right] = \\frac{n-1}{n}\\sigma^2 < \\sigma^2$.',
    useCase: 'Unbiased sample variance in small-batch analytics, Student’s $t$-test calculations, and data normalization.'
  },
  {
    id: 'sfc-34',
    category: 'Estimation & CLT',
    title: 'Central Limit Theorem (CLT)',
    frontPrompt: 'State the Central Limit Theorem (CLT) for the sample mean $\\bar{X}$ of $n$ i.i.d. random variables.',
    backFormula: '\\bar{X} \\xrightarrow[n \\to +\\infty]{d} \\mathcal{N}\\left(\\mu, \\frac{\\sigma}{\\sqrt{n}}\\right) \\iff \\frac{\\bar{X} - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1)',
    backExplanation: 'Regardless of the underlying parent distribution of $X$ (as long as mean $\\mu$ and variance $\\sigma^2$ are finite), the standardized sample mean converges in distribution to a standard normal distribution as $n \\to \\infty$.',
    remark: 'Explains why normal distributions appear everywhere in nature and why sums of numerous independent errors behave normally.',
    useCase: 'Confidence intervals, $Z$-tests, hypothesis testing, asymptotic normality of MLE estimators in deep learning.'
  }
];
