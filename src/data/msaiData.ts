import { Semester } from '../types/course';

export const INITIAL_SEMESTERS: Semester[] = [
  {
    id: 'sem-1-fall-26',
    name: 'Sem 1 - Fall 26',
    isCurrent: true,
    courses: [
      {
        id: 'cmpe-252-sec-01',
        code: 'CMPE-252',
        section: 'Sec 01',
        name: 'Artificial Intelligence and Data Engineering',
        canvasUrl: 'https://sjsu.instructure.com/courses/1635708',
        instructor: {
          name: 'Dr. Gautam Krishna',
          email: 'gautam.krishna@sjsu.edu',
          officeHours: 'Wed 8:45 PM onwards (After class / ENG 339 or by Appt)'
        },
        schedule: 'Wed 6:00 PM - 8:45 PM (In-Person / ENG 339)',
        credits: 3,
        grading: [
          { item: 'In-Class Paper Presentation & Reviews (Group of 3)', weight: 50 },
          { item: 'Final Project (30% Oral Exam + 20% Project Deliverables)', weight: 50 }
        ],
        textbooks: [
          {
            title: 'Machine Learning',
            author: 'Tom Mitchell',
            link: 'https://www.cs.cmu.edu/~tom/mlbook.html'
          },
          {
            title: 'Artificial Intelligence: A Modern Approach',
            author: 'Stuart Russell & Peter Norvig',
            link: 'https://aima.cs.berkeley.edu/'
          },
          {
            title: 'Deep Learning',
            author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
            link: 'https://www.deeplearningbook.org/'
          }
        ],
        modules: [
          {
            id: 'm252-1',
            week: 'Week 01',
            title: 'Machine Learning or AI Basics',
            description: 'Introduction to foundational AI concepts, agent interactions, and machine learning paradigms.',
            topics: ['AI Foundations', 'Supervised vs Unsupervised Learning', 'Data Representation'],
            status: 'completed',
            reading: 'Mitchell Ch. 1 / Russell & Norvig Ch. 1-2'
          },
          {
            id: 'm252-2',
            week: 'Week 02',
            title: 'Machine Learning or AI Basics Continued',
            description: 'Deep dive into hypothesis spaces, loss functions, optimization, and probabilistic foundations.',
            topics: ['Probability & Linear Algebra for AI', 'Model Evaluation', 'Overfitting & Generalization'],
            status: 'completed',
            reading: 'Mitchell Ch. 2'
          },
          {
            id: 'm252-3',
            week: 'Week 03',
            title: 'Neural Networks & Back-propagation',
            description: 'Perceptrons, activation functions, dynamic gradient computation, and loss surface traversal.',
            topics: ['Perceptrons', 'Multilayer Perceptrons (MLPs)', 'Back-propagation Derivation', 'Gradient Descent'],
            status: 'in-progress',
            reading: 'Goodfellow Ch. 6'
          },
          {
            id: 'm252-4',
            week: 'Week 04',
            title: 'Deep Neural Networks, Sequence & Spatial Models',
            description: 'Advanced deep learning architectures for structured spatial and sequential signal data.',
            topics: ['Convolutional Neural Networks (CNNs)', 'Recurrent Neural Networks (RNNs)', 'Transformers & Conformers'],
            status: 'upcoming',
            reading: 'Goodfellow Ch. 9 & 10'
          },
          {
            id: 'm252-5',
            week: 'Week 05',
            title: 'GANs & Auto-encoders',
            description: 'Unsupervised generative representations, latent variable space mapping, and adversarial training loops.',
            topics: ['Generative Adversarial Networks (GANs)', 'Auto-encoders', 'Variational Autoencoders (VAEs)'],
            status: 'upcoming',
            reading: 'Goodfellow Ch. 14 & 20'
          },
          {
            id: 'm252-6',
            week: 'Week 06',
            title: 'SVMs, Decision Trees & Feature Engineering',
            description: 'Classical machine learning techniques, maximum margin hyperplanes, and feature space design.',
            topics: ['Support Vector Machines (SVMs)', 'Decision Trees', 'Kernel Methods', 'Feature Engineering'],
            status: 'upcoming',
            reading: 'Mitchell Ch. 3 & Bishop Ch. 7'
          },
          {
            id: 'm252-7',
            week: 'Week 07',
            title: 'Clustering',
            description: 'Unsupervised pattern discovery, distance metrics, and partitioning complex data spaces.',
            topics: ['K-Means Clustering', 'Hierarchical Clustering', 'DBSCAN', 'Evaluation Metrics'],
            status: 'upcoming',
            reading: 'Bishop Ch. 9'
          },
          {
            id: 'm252-8',
            week: 'Week 08',
            title: 'Dimensionality Reduction: PCA, ICA & LDA',
            description: 'Linear projections, latent component extraction, variance maximization, and class separability.',
            topics: ['Principal Component Analysis (PCA)', 'Independent Component Analysis (ICA)', 'Linear Discriminant Analysis (LDA)'],
            status: 'upcoming',
            reading: 'Goodfellow Ch. 2 & Bishop Ch. 12'
          },
          {
            id: 'm252-9',
            week: 'Week 09',
            title: 'Speech Data Processing',
            description: 'Acoustic feature extraction, signal transformations, spectral representations, and speech models.',
            topics: ['Spectrogram Analysis', 'MFCC Extraction', 'Audio Transformers / Conformers'],
            status: 'upcoming',
            reading: 'Selected Speech Processing Papers'
          },
          {
            id: 'm252-10',
            week: 'Week 10',
            title: 'Image & Video Data Processing',
            description: 'Computer vision pipelines, spatial-temporal feature extraction, and video sequence modeling.',
            topics: ['2D/3D Convolutional Networks', 'Frame Feature Extraction', 'Video Action Recognition'],
            status: 'upcoming',
            reading: 'Selected Computer Vision Papers'
          },
          {
            id: 'm252-11',
            week: 'Week 11',
            title: 'Brain Signal Data Processing',
            description: 'Biomedical data representations, EEG/fNIRS signal filtering, and neural decoding models.',
            topics: ['EEG Signal Normalization', 'Spectral Decomposition', 'Neural Signal Decoding Architecture'],
            status: 'upcoming',
            reading: 'Selected Biosignal AI Research Papers'
          },
          {
            id: 'm252-12',
            week: 'Week 12',
            title: 'Multi-Modal Networks & Learning Algorithms',
            description: 'Joint representation learning across heterogeneous modalities (speech, vision, text, biosignals).',
            topics: ['Cross-Modal Attention', 'Late & Early Fusion', 'Multi-Modal Embeddings'],
            status: 'upcoming',
            reading: 'Recent Multi-Modal Foundation Research'
          },
          {
            id: 'm252-13',
            week: 'Week 13',
            title: 'Reinforcement Learning Basics & Foundation Models',
            description: 'Agent-environment interaction loops, reward maximization, value functions, and foundation model fine-tuning.',
            topics: ['RL Framework', 'Q-Learning & Policy Gradients', 'Large Language & Vision Foundation Models'],
            status: 'upcoming',
            reading: 'Sutton & Barto / Selected Papers'
          },
          {
            id: 'm252-14',
            week: 'Week 14',
            title: 'Markov Decision Process & Final Project Progress Discussion',
            description: 'Formal MDP formulations, state transitions, dynamic programming, and project milestone reviews.',
            topics: ['Markov Decision Processes (MDP)', 'Bellman Equations', 'Final Project Progress Check'],
            status: 'upcoming',
            reading: 'Sutton & Barto Ch. 3'
          }
        ],
        concepts: [
          {
            id: 'c252-1',
            name: 'Back-propagation Computational Graphs',
            category: 'Deep Learning',
            mastered: true,
            description: 'Application of multivariate calculus chain rule over computational execution graphs for neural gradient updates.'
          },
          {
            id: 'c252-2',
            name: 'Transformers & Conformers',
            category: 'Sequence Models',
            mastered: false,
            description: 'Self-attention mechanisms combined with convolution units for processing sequential, speech, and spatial inputs.'
          },
          {
            id: 'c252-3',
            name: 'Generative Adversarial Networks (GANs)',
            category: 'Generative Models',
            mastered: false,
            description: 'Minimax zero-sum game played between a generator network and a discriminator network.'
          },
          {
            id: 'c252-4',
            name: 'Dimensionality Reduction (PCA / ICA / LDA)',
            category: 'Data Engineering',
            mastered: false,
            description: 'Linear transformations for variance maximization (PCA), statistical independence (ICA), or class separation (LDA).'
          },
          {
            id: 'c252-5',
            name: 'Multi-Modal Signal Processing',
            category: 'AI Engineering',
            mastered: false,
            description: 'Fusing heterogeneous raw signal domains (Speech, Vision, Brain EEG) into unified latent embeddings.'
          }
        ],
        notes: [
          {
            id: 'n252-1',
            title: 'Neural Networks & Back-propagation Derivation',
            week: 'Week 03',
            date: '2026-09-02',
            summary: 'Mathematical formulation of multi-layer perceptron forward passes and weight update derivations via partial derivatives.',
            keyPoints: [
              'Gradient of loss function w.r.t weights computed backward using chain rule.',
              'Vanishing/exploding gradient problems mitigated through normalized activations and initialization strategies.',
              'Stochastic gradient updates computed across mini-batches for numerical stability.'
            ],
            mathFormulas: [
              {
                title: 'Weight Update Rule',
                latex: 'W^{(l)} := W^{(l)} - \\alpha \\frac{\\partial L}{\\partial W^{(l)}}',
                explanation: 'Gradient descent optimization parameter update step with learning rate alpha.'
              }
            ],
            codeSnippets: [],
            tags: ['Neural Networks', 'Backpropagation', 'Calculus', 'Optimization']
          }
        ],
        project: {
          title: 'Multi-Modal Signal Processing & Generative AI Representation Engine',
          subtitle: 'In-Class Presentation & Final Project Capstone (Group of 3)',
          abstract: 'An end-to-end multi-modal data processing and AI architecture project exploring cross-modal representation learning across speech, image, and tabular/biosignal datasets.',
          problemStatement: 'Designing scalable representations for heterogeneous raw signals while maintaining low processing latency and robust multi-modal feature fusion.',
          pipelineSteps: [
            {
              step: 1,
              title: 'Project Proposal & Literature Review',
              description: 'Formulation of research goals, dataset acquisition, and initial presentation planning.',
              tool: 'In-Class Proposal Review'
            },
            {
              step: 2,
              title: 'Data Preprocessing & Feature Extraction',
              description: 'Extracting clean spatial, spectral, or temporal features from raw datasets.',
              tool: 'Python, Librosa, PyTorch, OpenCV'
            },
            {
              step: 3,
              title: 'Model Architecture Implementation',
              description: 'Building deep neural architectures (CNN, Transformer, or Generative Autoencoders) for signal decoding.',
              tool: 'PyTorch / TensorFlow'
            },
            {
              step: 4,
              title: 'In-Class Paper Presentation',
              description: 'Delivering group paper review and architectural critique during scheduled course sessions.',
              tool: 'Group Slide Presentation'
            },
            {
              step: 5,
              title: 'Oral Examination & System Demonstration',
              description: 'Comprehensive 30% oral defense on course material and final project technical execution.',
              tool: 'Final Report & Oral Exam'
            }
          ],
          techStack: ['Python', 'PyTorch', 'TorchAudio', 'TorchVision', 'NumPy', 'Scikit-Learn', 'SciPy'],
          metrics: [
            { label: 'Paper Presentation', value: '50% Weight', baseline: 'Group of 3', change: 'Mandatory' },
            { label: 'Oral Examination', value: '30% Weight', baseline: 'Individual/Group', change: 'Mandatory' },
            { label: 'Final Report', value: '20% Weight', baseline: 'Group Deliverable', change: 'Mandatory' }
          ],
          githubUrl: 'https://github.com/sjsu-msai/cmpe252-ai-data-engineering',
          demoUrl: 'https://cmpe252-demo.sjsu-ai.internal',
          datasetInfo: 'Multi-Modal Benchmarks (Speech Spectrograms, Computer Vision Corpora, EEG Brain Signals)',
          deliverables: [
            { id: 'd1', title: 'Final Project Proposal Submission', completed: false, dueDate: '2026-10-14' },
            { id: 'd2', title: 'In-Class Paper Presentation & Review', completed: false, dueDate: '2026-11-18' },
            { id: 'd3', title: 'Final Project Presentation & Oral Exam', completed: false, dueDate: '2026-12-09' },
            { id: 'd4', title: 'Final Project Written Report Submission', completed: false, dueDate: '2026-12-16' }
          ]
        },
        presentation: {
          title: 'CMPE-252 Final Project & Oral Defense Presentation',
          slidesCount: 5,
          videoUrl: 'https://www.youtube.com/watch?v=sample-cmpe252-krishna-presentation',
          executiveSummary: 'Presentation covering paper reviews, multi-modal machine learning methodologies, and final project outcomes for Dr. Gautam Krishna.',
          keyFindings: [
            'Effective feature representation across complex speech, image, or signal data drastically reduces model parameter requirements.',
            'Multi-modal fusion architectures outperform single-modality baselines across complex classification tasks.',
            'Comprehensive oral defense demonstrated mastery over neural backpropagation, spectral signal processing, and decision algorithms.'
          ],
          qaChecklist: [
            {
              question: 'How does your model handle signal noise across different modalities?',
              answer: 'We applied pre-processing transformations such as spectral gating for audio signals and spatial filtering for image vectors prior to model ingestion.'
            }
          ],
          slides: [
            {
              slideNumber: 1,
              title: 'Project Objectives & Research Focus',
              subtitle: 'Artificial Intelligence and Data Engineering (CMPE-252)',
              bulletPoints: [
                'Problem definition and dataset selection.',
                'Methodology and theoretical background.',
                'Implementation strategy in Python / PyTorch.'
              ],
              callout: 'Syllabus Objective: Finding a good representation of complex data.',
              speakerNotes: 'Good evening Professor Krishna and classmates. Today we are presenting our final project for CMPE-252.'
            }
          ]
        }
      },
      {
        id: 'cmpe-257-sec-02',
        code: 'CMPE-257',
        section: 'Sec 02',
        name: 'Machine Learning',
        canvasUrl: 'https://sjsu.instructure.com/courses/1635708',
        instructor: {
          name: 'Dr. Zara Hajihashemi',
          email: 'zara.hajihashemi@sjsu.edu',
          officeHours: 'Fri 8:30 AM - 9:30 AM & 3:30 PM - 5:00 PM (By Appt / ENG 281)'
        },
        schedule: 'In-Person (ENG 337) | RSA: Aditya Hegde (aditya.hegde@sjsu.edu)',
        credits: 3,
        grading: [
          { item: 'Midterm Examination', weight: 25 },
          { item: 'Homework Assignments (4 HWs)', weight: 25 },
          { item: 'Final Examination', weight: 25 },
          { item: 'Final Project & Presentation', weight: 25 }
        ],
        textbooks: [
          {
            title: "Andrew Ng's CS229 Lecture Notes & Cheatsheets",
            author: 'Andrew Ng / Shervine Amidi',
            link: 'https://cs229.stanford.edu/main_notes.pdf'
          },
          {
            title: 'Pattern Recognition and Machine Learning',
            author: 'Christopher Bishop',
            link: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/'
          },
          {
            title: 'The Elements of Statistical Learning',
            author: 'Trevor Hastie, Robert Tibshirani, Jerome Friedman',
            link: 'https://hastie.su.domains/ElemStatLearn/'
          },
          {
            title: 'Understanding Machine Learning: From Theory to Algorithms',
            author: 'Shai Shalev-Shwartz & Shai Ben-David',
            link: 'https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/'
          },
          {
            title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
            author: 'Aurélien Géron',
            link: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/'
          }
        ],
        modules: [
          {
            id: 'm257-1',
            week: 'Session 01',
            title: 'Introduction to Machine Learning',
            description: 'Fundamental principles, algorithms, applications, mathematical modeling, and learning feasibility.',
            topics: ['Supervised vs Unsupervised Learning', 'Feasibility of Learning', 'Generalization Principles', 'Linear Algebra & Calculus Foundations'],
            status: 'completed',
            reading: 'CS229 Notes Section 1 & Syllabus'
          },
          {
            id: 'm257-2',
            week: 'Session 02',
            title: 'Supervised Learning',
            description: 'Linear models for regression and classification, loss functions, empirical risk minimization, and optimization.',
            topics: ['Linear Regression', 'Logistic Regression', 'Cost Functions (MSE, Binary Cross-Entropy)', 'Gradient Descent'],
            status: 'completed',
            reading: 'CS229 Notes Chapter 1'
          },
          {
            id: 'm257-3',
            week: 'Session 03',
            title: 'Advanced Supervised Learning',
            description: 'Generalization theory, bias and variance tradeoff, cross-validation, and nonlinear transformations.',
            topics: ['Theory of Generalization', 'Bias and Variance Decomposition', 'Cross-Validation & Hyperparameter Tuning', 'Generative vs Discriminative Models'],
            status: 'in-progress',
            reading: 'CS229 Notes Chapter 2'
          },
          {
            id: 'm257-4',
            week: 'Session 04',
            title: 'Unsupervised Learning, PCA',
            description: 'Dimensionality reduction, clustering, and feature extraction. Homework 1 due.',
            topics: ['Principal Component Analysis (PCA)', 'Eigenvalue Decomposition & SVD', 'K-Means Clustering', 'HW1 Due: Supervised Learning'],
            status: 'upcoming',
            reading: 'CS229 Notes Chapter 8 & Bishop Ch. 12'
          },
          {
            id: 'm257-5',
            week: 'Session 05',
            title: 'SVM, Trees, Feature Engineering',
            description: 'Kernel methods, maximum margin hyperplanes, radial basis functions, decision trees, and feature representation.',
            topics: ['Support Vector Machines (Hard/Soft Margin)', 'Kernel Trick & RBF', 'Decision Trees (CART)', 'Feature Engineering & Selection'],
            status: 'upcoming',
            reading: 'CS229 Notes Chapter 3 & Géron Ch. 5, 6'
          },
          {
            id: 'm257-6',
            week: 'Session 06',
            title: 'Regularization Techniques, Midterm Exam Review',
            description: 'Controlling model complexity, L1/L2 penalties, sparsity, and preparation for the midterm examination.',
            topics: ['L1 (Lasso) vs L2 (Ridge) Regularization', 'ElasticNet Formulation', 'Overfitting Mitigation', 'Midterm Examination Review'],
            status: 'upcoming',
            reading: 'Hastie et al. Ch. 3 & Course Lecture Notes'
          },
          {
            id: 'm257-7',
            week: 'Session 07',
            title: 'Mid Term Exam',
            description: 'In-class midterm assessment covering Sessions 1-6. Homework 2 due.',
            topics: ['Midterm Examination', 'HW2 Due: Unsupervised Learning'],
            status: 'upcoming',
            reading: 'Review Sessions 1-6 Notes'
          },
          {
            id: 'm257-8',
            week: 'Session 08',
            title: 'Introduction to Neural Networks',
            description: 'Biological inspiration, perceptrons, multilayer perceptron architectures, and activation functions.',
            topics: ['Perceptron Learning Rule', 'Multilayer Perceptrons (MLPs)', 'Activation Functions (ReLU, Sigmoid, Softmax)', 'Forward Propagation'],
            status: 'upcoming',
            reading: 'Bishop Ch. 5 & CS229 Neural Network Notes'
          },
          {
            id: 'm257-9',
            week: 'Session 09',
            title: 'Back Propagation Algorithm - Part I',
            description: 'Mathematical derivation of backpropagation using the multivariate chain rule and computational graphs.',
            topics: ['Computational Graphs', 'Gradient Derivation via Chain Rule', 'Error Vector Propagation', 'Matrix Calculus for NN Updates'],
            status: 'upcoming',
            reading: 'CS229 Deep Learning Section'
          },
          {
            id: 'm257-10',
            week: 'Session 10',
            title: 'Back Propagation Algorithm - Part II',
            description: 'Advanced optimization algorithms, gradient challenges, and training dynamics. Homework 3 due.',
            topics: ['SGD, Adam, and RMSprop Optimizers', 'Exploding & Vanishing Gradients', 'HW3 Due: Back-propagation Algorithm'],
            status: 'upcoming',
            reading: 'Géron Ch. 11'
          },
          {
            id: 'm257-11',
            week: 'Session 11',
            title: 'Speech Recognition and Recommendation Systems',
            description: 'Applied machine learning architectures for sequential speech inputs and collaborative filtering systems.',
            topics: ['Acoustic & Speech Modeling Principles', 'Collaborative Filtering & Matrix Factorization', 'Content-Based Recommendation Engines'],
            status: 'upcoming',
            reading: 'Selected Industry Papers & Notes'
          },
          {
            id: 'm257-12',
            week: 'Session 12',
            title: 'Introduction to Deep Learning - Part 1',
            description: 'Deep neural network architectures, spatial features, and convolutional representation learning.',
            topics: ['Convolutional Neural Networks (CNNs)', 'Pooling & Feature Maps', 'Batch Normalization', 'Transfer Learning'],
            status: 'upcoming',
            reading: 'Géron Ch. 14'
          },
          {
            id: 'm257-13',
            week: 'Session 13',
            title: 'Introduction to Deep Learning - Part 2',
            description: 'Recurrent structures, sequence modeling, attention, and deep regularization. Homework 4 due.',
            topics: ['Recurrent Structures & Transformers', 'Regularization in Deep Networks (Dropout)', 'HW4 Due: Neural Networks'],
            status: 'upcoming',
            reading: 'Géron Ch. 15, 16'
          },
          {
            id: 'm257-14',
            week: 'Session 14',
            title: 'Project Presentation',
            description: 'Student research group presentations showcasing hands-on final machine learning projects.',
            topics: ['Applied ML Final Presentations', 'System Demos', 'Model Evaluation Reviews'],
            status: 'upcoming',
            reading: 'Final Project Submission Guidelines'
          },
          {
            id: 'm257-15',
            week: 'Session 15',
            title: 'Final Exam Prep',
            description: 'Comprehensive course review, theoretical synthesis, and final examination preparation.',
            topics: ['Comprehensive Algorithm Review', 'Mathematical Proof Synthesis', 'Final Exam Sample Problems'],
            status: 'upcoming',
            reading: 'Course Review Materials'
          }
        ],
        concepts: [
          {
            id: 'c257-1',
            name: 'Theory of Generalization & Bias-Variance Tradeoff',
            category: 'ML Theory',
            mastered: true,
            description: 'Decomposing expected prediction error into intrinsic noise, bias, and variance components.'
          },
          {
            id: 'c257-2',
            name: 'Support Vector Machines & Kernel Trick',
            category: 'Supervised Learning',
            mastered: false,
            description: 'Maximum margin hyperplanes with implicit high-dimensional inner product evaluation via kernels.'
          },
          {
            id: 'c257-3',
            name: 'Backpropagation Vector Calculus',
            category: 'Neural Networks',
            mastered: false,
            description: 'Differentiating complex loss functions w.r.t neural weights using multivariable chain rule matrix operations.'
          },
          {
            id: 'c257-4',
            name: 'Principal Component Analysis (PCA)',
            category: 'Unsupervised Learning',
            mastered: false,
            description: 'Orthogonal linear transformation converting data to a new coordinate system of maximum variance.'
          },
          {
            id: 'c257-5',
            name: 'Regularization Methods (L1 / L2)',
            category: 'Optimization',
            mastered: false,
            description: 'Penalizing model complexity through parameter magnitude constraints (Lasso sparsity or Ridge shrinkage).'
          }
        ],
        notes: [
          {
            id: 'n257-1',
            title: 'Supervised Learning & Generalized Linear Models',
            week: 'Session 02',
            date: '2026-08-28',
            summary: 'Formulating regression and classification tasks, empirical risk minimization, loss functions, and optimization.',
            keyPoints: [
              'Mean Squared Error (MSE) minimization corresponds to Maximum Likelihood Estimation under Gaussian noise.',
              'Logistic regression applies the sigmoid link function to bound linear outputs to [0, 1] probability spaces.',
              'Gradient descent updates weights iteratively along the negative gradient vector of the loss function.'
            ],
            mathFormulas: [
              {
                title: 'Sigmoid Activation Function',
                latex: 'g(z) = \\frac{1}{1 + e^{-z}}',
                explanation: 'Maps real-valued scalar z to a continuous probability estimate between 0 and 1.'
              },
              {
                title: 'Binary Cross-Entropy Loss',
                latex: 'J(\\theta) = -\\frac{1}{m} \\sum_{i=1}^{m} \\left[ y^{(i)} \\log(h_\\theta(x^{(i)})) + (1 - y^{(i)}) \\log(1 - h_\\theta(x^{(i)})) \\right]',
                explanation: 'Negative log-likelihood function minimized during binary classification model optimization.'
              }
            ],
            codeSnippets: [],
            tags: ['Supervised Learning', 'Logistic Regression', 'Gradient Descent', 'Loss Functions']
          }
        ],
        project: {
          title: 'Applied Machine Learning System & Empirical Model Benchmark',
          subtitle: 'Hands-On Applied ML Project & Final Report Defense',
          abstract: 'A end-to-end machine learning system exploring algorithm implementation, hyperparameter tuning, empirical risk evaluation, and ethical fairness considerations across real-world datasets.',
          problemStatement: 'Formulating a novel domain problem, curating datasets, selecting optimal model architectures (classical vs deep learning), and rigorously benchmarking performance.',
          pipelineSteps: [
            {
              step: 1,
              title: 'Problem Formulation & Dataset Acquisition',
              description: 'Defining target outcome metrics, exploratory data analysis, and checking data balance.',
              tool: 'Python, Pandas, NumPy'
            },
            {
              step: 2,
              title: 'Feature Engineering & Baseline Modeling',
              description: 'Scaling features, handling missing values, applying PCA, and fitting baseline linear/tree models.',
              tool: 'Scikit-Learn, SciPy'
            },
            {
              step: 3,
              title: 'Advanced Model Training & Hyperparameter Tuning',
              description: 'Training Support Vector Machines, Neural Networks, or Ensemble models with cross-validation.',
              tool: 'PyTorch, Keras, Scikit-Learn'
            },
            {
              step: 4,
              title: 'In-Class Project Presentation',
              description: 'Presenting technical methodologies, complexity trade-offs, and experimental findings in Session 14.',
              tool: 'Session 14 Presentation'
            },
            {
              step: 5,
              title: 'Final Written Project Report Submission',
              description: 'Submitting original comprehensive report detailing theoretical underpinnings, evaluation, and code.',
              tool: 'Final Written Report'
            }
          ],
          techStack: ['Python', 'Scikit-Learn', 'PyTorch', 'TensorFlow / Keras', 'Pandas', 'NumPy', 'Matplotlib'],
          metrics: [
            { label: 'Midterm Exam', value: '25% Weight', baseline: 'Session 07 (10/02)', change: 'In-Class' },
            { label: 'Homeworks (4 HWs)', value: '25% Weight', baseline: 'Sessions 04, 07, 10, 13', change: 'Mandatory' },
            { label: 'Final Exam', value: '25% Weight', baseline: '12/09 (8:30-10:30 AM)', change: 'In-Class' },
            { label: 'Final Project', value: '25% Weight', baseline: 'Report Due 12/14', change: 'Mandatory' }
          ],
          githubUrl: 'https://github.com/sjsu-msai/cmpe257-machine-learning',
          demoUrl: 'https://cmpe257-ml-demo.sjsu-ai.internal',
          datasetInfo: 'Real-world benchmark datasets (UCI Machine Learning Repository / Kaggle / Domain Corpora)',
          deliverables: [
            { id: 'd1', title: 'Homework 1: Supervised Learning Due', completed: false, dueDate: '2026-09-11' },
            { id: 'd2', title: 'Homework 2: Unsupervised Learning Due', completed: false, dueDate: '2026-10-02' },
            { id: 'd3', title: 'In-Class Midterm Examination', completed: false, dueDate: '2026-10-02' },
            { id: 'd4', title: 'Homework 3: Back-propagation Algorithm Due', completed: false, dueDate: '2026-10-23' },
            { id: 'd5', title: 'Homework 4: Neural Networks Due', completed: false, dueDate: '2026-11-13' },
            { id: 'd6', title: 'In-Class Project Presentation (Session 14)', completed: false, dueDate: '2026-11-20' },
            { id: 'd7', title: 'In-Class Final Examination (8:30 AM - 10:30 AM)', completed: false, dueDate: '2026-12-09' },
            { id: 'd8', title: 'Final Project Written Report Due', completed: false, dueDate: '2026-12-14' }
          ]
        },
        presentation: {
          title: 'CMPE-257 Final Project Presentation',
          slidesCount: 5,
          videoUrl: 'https://www.youtube.com/watch?v=sample-cmpe257-hajihashemi-presentation',
          executiveSummary: 'Applied machine learning final presentation detailing problem formulation, empirical evaluation, and theoretical analysis for Dr. Zara Hajihashemi.',
          keyFindings: [
            'Regularization (L1/L2) reduced out-of-sample generalization error by 18% compared to unconstrained decision tree baselines.',
            'Support Vector Machines with RBF kernels achieved superior classification performance on non-linearly separable benchmark features.',
            'Strict adherence to original implementation rules ensured zero reliance on copied/generated external code artifacts.'
          ],
          qaChecklist: [
            {
              question: 'How did you handle hyperparameter tuning to prevent data leakage?',
              answer: 'All scaling transformations and PCA projections were fit exclusively on the training folds inside nested cross-validation pipelines.'
            }
          ],
          slides: [
            {
              slideNumber: 1,
              title: 'Problem Formulation & Theoretical Motivation',
              subtitle: 'Machine Learning (CMPE-257)',
              bulletPoints: [
                'Problem selection and real-world domain significance.',
                'Mathematical formulation of the learning task.',
                'Dataset pre-processing and exploratory analysis.'
              ],
              callout: 'Goal: Evaluate mathematical underpinnings and empirical performance.',
              speakerNotes: 'Good morning Dr. Hajihashemi and classmates. Today we are presenting our applied machine learning final project for CMPE-257.'
            }
          ]
        }
      }
    ]
  }
];