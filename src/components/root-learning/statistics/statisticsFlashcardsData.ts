export interface StatsFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  remark?: string;
  useCase?: string;
}

export const CS229_STATS_FLASHCARDS: StatsFlashcard[] = [
  // ================= Module 1: Probability Space & Random Variables =================
  {
    id: 'sfc-1',
    category: 'Module 1: Probability Space & Random Variables',
    title: 'Sample Space & Event Definition',
    frontPrompt: 'How are the sample space $S$ and an event $E$ formally defined in probability theory?',
    backFormula: 'S = \\{ \\omega : \\omega \\text{ is an experimental outcome} \\}, \\quad E \\subseteq S',
    backExplanation: 'The sample space $S$ is the set of all possible outcomes of an experiment. An event $E$ is any subset of $S$. If the observed outcome $\\omega \\in E$, we say event $E$ has occurred.',
    remark: 'The empty set $\\emptyset$ is the impossible event ($P(\\emptyset) = 0$), and $S$ is the certain event ($P(S) = 1$).',
    useCase: 'Used in binary and multiclass classification to define output label spaces $\\mathcal{Y} = \\{1, \\dots, K\\}$.'
  },
  {
    id: 'sfc-2',
    category: 'Module 1: Probability Space & Random Variables',
    title: 'Kolmogorov Axioms of Probability',
    frontPrompt: 'State the three fundamental Kolmogorov axioms that define any probability measure $P$.',
    backFormula: '(1) \\; 0 \\le P(E) \\le 1, \\quad (2) \\; P(S) = 1, \\quad (3) \\; P\\left(\\bigcup_{i=1}^n E_i\\right) = \\sum_{i=1}^n P(E_i) \\text{ for pairwise disjoint } E_i',
    backExplanation: 'A valid probability measure assigns non-negative numbers no greater than 1, normalizes the entire sample space to probability 1, and is countably additive for mutually exclusive events ($E_i \\cap E_j = \\emptyset$).',
    remark: 'From these 3 axioms, we derive $P(E^c) = 1 - P(E)$ and the union bound $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    useCase: 'Guarantees that softmax probabilities $\\sum_{k} \\frac{e^{z_k}}{\\sum_j e^{z_j}} = 1$ form a mathematically valid probability distribution.'
  },
  {
    id: 'sfc-3',
    category: 'Module 1: Probability Space & Random Variables',
    title: 'Permutations Formula',
    frontPrompt: 'What is the formula for the number of permutations $P(n, r)$ when selecting $r$ ordered objects from $n$ items?',
    backFormula: 'P(n, r) = \\frac{n!}{(n - r)!}',
    backExplanation: 'A permutation is an ordered arrangement of $r$ objects chosen from a pool of $n$ distinct objects without replacement. Order matters: $(A, B) \\ne (B, A)$.',
    remark: 'When $r = n$, $P(n, n) = n!$, which is the number of total ways to arrange $n$ unique items.',
    useCase: 'Feature ranking and permutation feature importance evaluation in random forests and gradient boosted trees.'
  },
  {
    id: 'sfc-4',
    category: 'Module 1: Probability Space & Random Variables',
    title: 'Combinations Formula',
    frontPrompt: 'What is the formula for combinations $C(n, r)$ where order does not matter, and how does it relate to permutations?',
    backFormula: 'C(n, r) = \\binom{n}{r} = \\frac{P(n, r)}{r!} = \\frac{n!}{r!(n - r)!}',
    backExplanation: 'A combination counts arrangements of $r$ objects from $n$ where selection order does NOT matter. We divide $P(n, r)$ by $r!$ to eliminate redundant permutations of the chosen subset.',
    remark: 'For all $0 \\le r \\le n$, we have $P(n, r) \\ge C(n, r)$. Also $\\binom{n}{r} = \\binom{n}{n - r}$.',
    useCase: 'Subsetting features in feature selection and computing binomial coefficients in hyperparameter search combinations.'
  },

  // ================= Module 2: Probability Distributions =================
  {
    id: 'sfc-5',
    category: 'Module 2: Probability Distributions',
    title: 'Random Variable Definition',
    frontPrompt: 'What is the formal mathematical definition of a Random Variable $X$?',
    backFormula: 'X : S \\to \\mathbb{R}, \\quad \\omega \\mapsto X(\\omega)',
    backExplanation: 'A random variable is not a variable in the traditional sense, but a deterministic function that maps outcomes from the sample space $S$ to real numerical values.',
    remark: 'Discrete if its image is countable (e.g., coin flips); continuous if its range is uncountably infinite (e.g., temperature).',
    useCase: 'Mapping raw image pixels or sensor readings into feature vectors in $\\mathbb{R}^d$.'
  },
  {
    id: 'sfc-6',
    category: 'Module 2: Probability Distributions',
    title: 'Cumulative Distribution Function (CDF)',
    frontPrompt: 'Define the Cumulative Distribution Function $F_X(x)$ and state its 3 core properties.',
    backFormula: 'F_X(x) = P(X \\le x) = \\begin{cases} \\sum_{k \\le x} p_X(k) & \\text{discrete} \\\\ \\int_{-\\infty}^x f_X(t) dt & \\text{continuous} \\end{cases}',
    backExplanation: 'Quantifies the total probability accumulated by $X$ up to threshold $x$. Properties: (1) Non-decreasing: $x_1 < x_2 \\implies F(x_1) \\le F(x_2)$, (2) Normalized: $\\lim_{x \\to -\\infty} F(x) = 0$ and $\\lim_{x \\to \\infty} F(x) = 1$, (3) Right-continuous.',
    remark: 'For continuous variables: $P(a < X \\le b) = F(b) - F(a)$.',
    useCase: 'Receiver Operating Characteristic (ROC) curve analysis, quantile regression, and generating synthetic data via Inverse Transform Sampling.'
  },
  {
    id: 'sfc-7',
    category: 'Module 2: Probability Distributions',
    title: 'Gaussian (Normal) Distribution PDF',
    frontPrompt: 'State the probability density function (PDF) for a univariate Gaussian random variable $X \\sim \\mathcal{N}(\\mu, \\sigma^2)$.',
    backFormula: 'f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left( -\\frac{(x - \\mu)^2}{2\\sigma^2} \\right)',
    backExplanation: 'The symmetric, bell-shaped distribution centered at mean $\\mu$ with spread governed by variance $\\sigma^2$. The inflection points occur exactly at $\\mu \\pm \\sigma$.',
    remark: '68-95-99.7 Rule: Approximately 68.2% of probability mass lies within $\\mu \\pm 1\\sigma$, 95.4% within $\\mu \\pm 2\\sigma$, and 99.7% within $\\mu \\pm 3\\sigma$.',
    useCase: 'Assumption of observation noise in ordinary least squares regression (justifying MSE loss via Gaussian MLE).'
  },

  // ================= Module 3: Expectation, Variance & Covariance =================
  {
    id: 'sfc-8',
    category: 'Module 3: Expectation, Variance & Covariance',
    title: 'Expected Value & Linearity',
    frontPrompt: 'State the formula for $\\mathbb{E}[X]$ and state the general Linearity of Expectation property.',
    backFormula: '\\mathbb{E}[X] = \\int_{-\\infty}^\\infty x f(x) dx, \\quad \\mathbb{E}[aX + bY + c] = a\\mathbb{E}[X] + b\\mathbb{E}[Y] + c',
    backExplanation: 'Expected value is the probability-weighted average outcome. Linearity of expectation ALWAYS holds for any arbitrary random variables, regardless of whether they are independent or correlated.',
    remark: 'For discrete $X$: $\\mathbb{E}[X] = \\sum_i x_i P(X = x_i)$. LOTUS theorem: $\\mathbb{E}[g(X)] = \\int g(x) f(x) dx$.',
    useCase: 'Calculating expected prediction loss in risk minimization $\\mathbb{E}_{(x,y)}[L(f(x), y)]$.'
  },
  {
    id: 'sfc-9',
    category: 'Module 3: Expectation, Variance & Covariance',
    title: 'Variance & Computational Shortcut',
    frontPrompt: 'Define Variance $\\text{Var}(X)$ and state its standard computational expansion formula.',
    backFormula: '\\text{Var}(X) = \\mathbb{E}\\left[(X - \\mathbb{E}[X])^2\\right] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2',
    backExplanation: 'Variance measures the expected squared deviation of $X$ from its mean, quantifying dispersion. Scaling property: $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$.',
    remark: 'Standard deviation is $\\sigma = \\sqrt{\\text{Var}(X)}$, which retains the original units of $X$.',
    useCase: 'Bias-Variance decomposition of generalization error in supervised learning.'
  },
  {
    id: 'sfc-10',
    category: 'Module 3: Expectation, Variance & Covariance',
    title: 'Covariance & Correlation Coefficient',
    frontPrompt: 'Define Covariance $\\text{Cov}(X, Y)$ and the Pearson Correlation coefficient $\\rho(X, Y)$.',
    backFormula: '\\text{Cov}(X, Y) = \\mathbb{E}[XY] - \\mathbb{E}[X]\\mathbb{E}[Y], \\quad \\rho(X, Y) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y} \\in [-1, 1]',
    backExplanation: 'Covariance indicates joint linear direction. Pearson correlation normalizes covariance into $[-1, 1]$, where $\\pm 1$ indicates exact positive/negative linear relationships.',
    remark: 'Independence implies $\\text{Cov}(X, Y) = 0$, but zero covariance does NOT imply independence (uncorrelated does not mean independent).',
    useCase: 'Feature redundancy filtering and Principal Component Analysis covariance matrix decomposition.'
  },

  // ================= Module 4: Joint, Marginal & Conditional Distributions =================
  {
    id: 'sfc-11',
    category: 'Module 4: Joint Distributions & Correlation',
    title: 'Conditional Probability & Multiplication Rule',
    frontPrompt: 'Define conditional probability $P(A|B)$ and state the general multiplication rule.',
    backFormula: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\; (P(B) > 0) \\implies P(A \\cap B) = P(A|B) P(B)',
    backExplanation: 'The probability that event $A$ occurs given that event $B$ has already definitively occurred. Re-normalizes the sample space strictly to outcomes within $B$.',
    remark: 'If $A$ and $B$ are independent, $P(A|B) = P(A)$ and $P(A \\cap B) = P(A)P(B)$.',
    useCase: 'Sequential token generation in autoregressive language models: $P(w_1, \\dots, w_T) = \\prod_t P(w_t | w_{<t})$.'
  },
  {
    id: 'sfc-12',
    category: 'Module 4: Joint Distributions & Correlation',
    title: 'Law of Total Probability',
    frontPrompt: 'State the Law of Total Probability for a partition $\{B_1, \\dots, B_k\}$ of the sample space.',
    backFormula: 'P(A) = \\sum_{i=1}^k P(A|B_i) P(B_i) \\quad \\left(\\bigcup_i B_i = S, \\; B_i \\cap B_j = \\emptyset\\right)',
    backExplanation: 'Expresses the marginal probability of event $A$ as a weighted average of conditional probabilities across mutually exclusive, exhaustive scenarios $B_i$.',
    remark: 'For continuous variables: $f_X(x) = \\int_{-\\infty}^\\infty f_{X,Y}(x, y) dy$ (marginalization).',
    useCase: 'Computing the evidence denominator $P(x) = \\sum_y P(x|y) P(y)$ in Bayes’ rule.'
  },
  {
    id: 'sfc-13',
    category: 'Module 4: Joint Distributions & Correlation',
    title: 'Bayes’ Theorem (Formula & Roles)',
    frontPrompt: 'State Bayes’ Theorem formula and identify the names of all four terms in the equation.',
    backFormula: 'P(Y|X) = \\frac{P(X|Y) P(Y)}{P(X)} = \\frac{P(X|Y) P(Y)}{\\sum_{y\'} P(X|y\') P(y\')}',
    backExplanation: 'Updates prior belief $P(Y)$ in hypothesis $Y$ in light of observed evidence $X$. Four terms: (1) Posterior $P(Y|X)$, (2) Likelihood $P(X|Y)$, (3) Prior $P(Y)$, (4) Marginal Evidence $P(X)$.',
    remark: 'Posterior is proportional to Likelihood times Prior: $P(Y|X) \\propto P(X|Y) P(Y)$.',
    useCase: 'Generative classification models, Kalman filters, Bayesian optimization, and probabilistic inference.'
  },

  // ================= Module 5: Central Limit Theorem & Testing =================
  {
    id: 'sfc-14',
    category: 'Module 5: Central Limit Theorem & Testing',
    title: 'Law of Large Numbers (LLN)',
    frontPrompt: 'State the Weak Law of Large Numbers (WLLN) for i.i.d. samples $X_1, \\dots, X_n$.',
    backFormula: '\\lim_{n \\to \\infty} P\\left( \\left| \\bar{X}_n - \\mu \\right| \\ge \\epsilon \\right) = 0, \\quad \\bar{X}_n = \\frac{1}{n} \\sum_{i=1}^n X_i',
    backExplanation: 'As the sample size $n$ grows to infinity, the sample mean $\\bar{X}_n$ converges in probability to the true population mean $\\mu$.',
    remark: 'Guarantees that empirical risk minimization (training loss) converges to theoretical true risk (test loss).',
    useCase: 'Monte Carlo approximation of complex expectations and integrals.'
  },
  {
    id: 'sfc-15',
    category: 'Module 5: Central Limit Theorem & Testing',
    title: 'Central Limit Theorem (CLT)',
    frontPrompt: 'State the Central Limit Theorem and the asymptotic distribution of the standardized sample mean.',
    backFormula: 'Z_n = \\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} \\mathcal{N}(0, 1) \\quad \\text{as } n \\to \\infty',
    backExplanation: 'The sum (or mean) of $n$ independent, identically distributed random variables with mean $\\mu$ and finite variance $\\sigma^2$ approaches a Gaussian distribution, regardless of the underlying population distribution shape.',
    remark: 'Requires $n \\ge 30$ in practical rule-of-thumb applications for moderate skewness.',
    useCase: 'Constructing asymptotic confidence intervals and hypothesis testing for model benchmark comparison.'
  },

  // ================= Module 6: Estimation & Hypothesis Testing =================
  {
    id: 'sfc-16',
    category: 'Module 6: Estimation & Hypothesis Testing',
    title: 'Maximum Likelihood Estimation (MLE)',
    frontPrompt: 'What is the objective function and formulation for Maximum Likelihood Estimation (MLE)?',
    backFormula: '\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta \\log L(\\theta; \\mathcal{D}) = \\arg\\max_\\theta \\sum_{i=1}^m \\log p(x^{(i)}; \\theta)',
    backExplanation: 'Finds the parameter values $\\theta$ that maximize the likelihood of having observed the training sample data $\\mathcal{D}$. We take the logarithm to turn products of probabilities into tractable sums.',
    remark: 'MLE estimators are asymptotically unbiased, consistent, and asymptotically efficient (reach the Cramér-Rao lower bound).',
    useCase: 'Deriving loss functions in logistic regression (Binary Cross-Entropy) and linear regression (MSE).'
  },
  {
    id: 'sfc-17',
    category: 'Module 6: Estimation & Hypothesis Testing',
    title: 'Maximum A Posteriori (MAP) Estimation',
    frontPrompt: 'How does MAP estimation differ from MLE, and how does it relate to regularization?',
    backFormula: '\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta \\left[ \\sum_{i=1}^m \\log p(x^{(i)} | \\theta) + \\log p(\\theta) \\right]',
    backExplanation: 'MAP incorporates a prior distribution $p(\\theta)$ over the parameters. A Gaussian prior $\\mathcal{N}(0, \\tau^2)$ corresponds exactly to L2 (Ridge) regularization; a Laplace prior corresponds to L1 (Lasso).',
    remark: 'As sample size $m \\to \\infty$, the likelihood dominates the prior, and $\\hat{\\theta}_{\\text{MAP}} \\to \\hat{\\theta}_{\\text{MLE}}$.',
    useCase: 'Weight decay and Bayesian neural network parameter shrinkage.'
  },

  // ================= Module 7: Naive Bayes Classification =================
  {
    id: 'sfc-18',
    category: 'Module 7: Naive Bayes Classification',
    title: 'Naive Bayes Conditional Independence Assumption',
    frontPrompt: 'State the core conditional independence assumption that characterizes the Naive Bayes model.',
    backFormula: 'P(x_1, \\dots, x_d | y) = \\prod_{j=1}^d P(x_j | y)',
    backExplanation: 'Assumes all input features $x_j$ are conditionally independent of each other given the target class $y$. This dramatically reduces parameter count from $\\mathcal{O}(2^d)$ to $\\mathcal{O}(d)$.',
    remark: 'Decision rule: $\\hat{y} = \\arg\\max_y P(y) \\prod_{j=1}^d P(x_j | y)$.',
    useCase: 'Spam filtering (Bernoulli/Multinomial NB) and high-dimensional document text classification.'
  },
  {
    id: 'sfc-19',
    category: 'Module 7: Naive Bayes Classification',
    title: 'Laplace (Additive) Smoothing',
    frontPrompt: 'Why is Laplace smoothing required in Naive Bayes, and what is its formula for words with vocabulary $V$?',
    backFormula: 'P(x_j = 1 | y) = \\frac{N_{y, x_j} + 1}{N_y + |V|}',
    backExplanation: 'Prevents the "zero probability problem" where an unseen feature value in a new sample causes the entire product of probabilities to collapse to zero: $\\prod P(x_j | y) = 0$.',
    remark: 'Equivalent to placing a uniform Dirichlet prior $\\text{Dir}(1, \\dots, 1)$ over the categorical parameters.',
    useCase: 'Robust text classification and n-gram language model vocabulary smoothing.'
  },

  // ================= Module 8: Conjugate Priors & Bayesian Inference =================
  {
    id: 'sfc-20',
    category: 'Module 8: Conjugate Priors & Bayesian Inference',
    title: 'Conjugate Prior Definition & Beta-Binomial Example',
    frontPrompt: 'Define a Conjugate Prior and state the Beta-Binomial conjugate update rule for $k$ heads in $n$ flips.',
    backFormula: '\\theta \\sim \\text{Beta}(\\alpha, \\beta), \\; X \\sim \\text{Bin}(n, \\theta) \\implies \\theta | X \\sim \\text{Beta}(\\alpha + k, \\; \\beta + n - k)',
    backExplanation: 'A prior $p(\\theta)$ is conjugate to likelihood $p(x|\\theta)$ if the resulting posterior $p(\\theta|x)$ belongs to the exact same parametric probability family as the prior, allowing closed-form updates without numerical integration.',
    remark: 'Hyperparameters $\\alpha, \\beta$ act as pseudo-counts of prior observed successes and failures.',
    useCase: 'Online Bayesian updating in multi-armed bandits (Thompson Sampling).'
  },

  // ================= Module 9: Latent Variables & EM Algorithm =================
  {
    id: 'sfc-21',
    category: 'Module 9: Latent Variables & EM Algorithm',
    title: 'Expectation-Maximization (EM) Algorithm',
    frontPrompt: 'State the E-step and M-step formulas in the Expectation-Maximization (EM) algorithm.',
    backFormula: '\\text{E-step: } Q(\\theta | \\theta^{(t)}) = \\mathbb{E}_{Z | X, \\theta^{(t)}} [\\log p(X, Z | \\theta)], \\quad \\text{M-step: } \\theta^{(t+1)} = \\arg\\max_\\theta Q(\\theta | \\theta^{(t)})',
    backExplanation: 'Maximizes the marginal likelihood in models with unobserved latent variables $Z$. The E-step calculates posterior responsibilities of latent states; the M-step maximizes the expected complete log-likelihood.',
    remark: 'Guaranteed to monotonically increase the observed data log-likelihood $\\log p(X; \\theta)$ at every iteration until convergence.',
    useCase: 'Gaussian Mixture Models (GMM) clustering and Hidden Markov Model (HMM) Baum-Welch training.'
  },

  // ================= Module 10: Approximate Inference (MCMC & VI) =================
  {
    id: 'sfc-22',
    category: 'Module 10: Approximate Inference (MCMC & VI)',
    title: 'Metropolis-Hastings Acceptance Ratio',
    frontPrompt: 'State the Metropolis-Hastings acceptance probability $\\alpha(x, x\')$ for proposal distribution $q(x\' | x)$.',
    backFormula: '\\alpha(x, x\') = \\min\\left( 1, \\; \\frac{p(x\') q(x | x\')}{p(x) q(x\' | x)} \\right)',
    backExplanation: 'Allows sampling from an unnormalized target density $p(x) = \\tilde{p}(x)/Z$ without knowing the intractable normalizing evidence constant $Z = \\int \\tilde{p}(x) dx$, because $Z$ cancels out in the ratio.',
    remark: 'For symmetric proposals ($q(x\'|x) = q(x|x\')$), reduces to the standard Metropolis ratio $\\min(1, p(x\')/p(x))$.',
    useCase: 'Markov Chain Monte Carlo (MCMC) posterior sampling in complex hierarchical Bayesian models.'
  },
  {
    id: 'sfc-23',
    category: 'Module 10: Approximate Inference (MCMC & VI)',
    title: 'Evidence Lower Bound (ELBO)',
    frontPrompt: 'State the Evidence Lower Bound (ELBO) decomposition used in Variational Inference.',
    backFormula: '\\log p(x) = \\text{ELBO}(q) + D_{\\text{KL}}(q(z) \\parallel p(z|x)), \\quad \\text{ELBO}(q) = \\mathbb{E}_q[\\log p(x, z)] - \\mathbb{E}_q[\\log q(z)]',
    backExplanation: 'Because KL divergence is non-negative ($D_{\\text{KL}} \\ge 0$), maximizing $\\text{ELBO}(q)$ with respect to variational family $q(z)$ directly minimizes the divergence to the true intractable posterior $p(z|x)$.',
    remark: 'Can be rewritten as: $\\text{ELBO} = \\mathbb{E}_{q(z)}[\\log p(x|z)] - D_{\\text{KL}}(q(z) \\parallel p(z))$ (Reconstruction minus Prior regularization).',
    useCase: 'Variational Autoencoders (VAEs) and Bayesian deep learning optimization.'
  }
];
